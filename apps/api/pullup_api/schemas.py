from __future__ import annotations

from datetime import date
from typing import Annotated, Literal, Self

from pydantic import (
    BaseModel,
    ConfigDict,
    Field,
    StrictInt,
    StringConstraints,
    model_validator,
)
from pydantic.alias_generators import to_camel

StableId = Annotated[
    str,
    StringConstraints(
        min_length=1,
        pattern=r"^[a-z0-9][a-z0-9-]*$",
    ),
]
NonEmpty = Annotated[str, StringConstraints(min_length=1)]
Currency = Annotated[str, StringConstraints(pattern=r"^[A-Z]{3}$")]
MinorUnits = Annotated[StrictInt, Field(ge=0)]


class ContractModel(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        extra="forbid",
    )


class SourceContract(ContractModel):
    id: StableId
    title: NonEmpty
    kind: Literal[
        "provider-record",
        "cost-sheet",
        "accessibility-walkthrough",
        "building-log",
        "public-record",
        "representative-media",
    ]
    publisher: NonEmpty
    source_date: date
    checked_at: date
    status: Literal["synthetic", "reviewed", "verified", "stale", "conflict"]
    note: NonEmpty


class ProviderContract(ContractModel):
    id: StableId
    display_name: NonEmpty
    legal_form: NonEmpty
    ownership_model: NonEmpty
    service_commitment: NonEmpty
    identity_status: Literal["synthetic-not-verified"]
    checked_at: date
    source_id: StableId


class BuildingContract(ContractModel):
    id: StableId
    provider_id: StableId
    name: NonEmpty
    neighbourhood: NonEmpty
    municipality: NonEmpty
    province: Annotated[str, StringConstraints(min_length=2, max_length=2)]
    country_code: Annotated[str, StringConstraints(min_length=2, max_length=2)]
    location_precision: Literal["neighbourhood-only"]
    source_id: StableId


class ImageContract(ContractModel):
    src: Annotated[str, StringConstraints(pattern=r"^/")]
    alt: NonEmpty
    caption: NonEmpty
    evidence_status: Literal["representative-only"]
    source_id: StableId


class AvailabilityContract(ContractModel):
    status: Literal["available-from", "available-now", "waitlist", "unavailable"]
    available_from: date | None
    units_available: Annotated[StrictInt, Field(ge=0)]
    checked_at: date
    source_id: StableId


class TenureContract(ContractModel):
    type: NonEmpty
    initial_term: NonEmpty
    ongoing_security: NonEmpty
    rights_summary: NonEmpty
    allocation_summary: NonEmpty
    checked_at: date
    source_id: StableId


class AccessibilityFactContract(ContractModel):
    id: StableId
    category: Literal[
        "arrival",
        "entrance",
        "circulation",
        "bathroom",
        "kitchen",
        "controls",
        "sensory",
        "parking",
        "evacuation",
    ]
    feature: NonEmpty
    status: Literal["confirmed-in-fixture", "not-available", "needs-review"]
    detail: NonEmpty
    source_id: StableId
    checked_at: date


class CostItemContract(ContractModel):
    id: StableId
    label: NonEmpty
    category: Literal[
        "housing-charge",
        "utilities",
        "connectivity",
        "insurance",
        "member-share",
        "deposit",
        "parking",
        "other",
    ]
    amount_min_minor: MinorUnits
    amount_max_minor: MinorUnits
    frequency: Literal["monthly", "one-time"]
    certainty: Literal["known", "estimated"]
    optional: bool
    refundable: bool
    recipient: NonEmpty
    purpose: NonEmpty
    change_rule: NonEmpty
    source_id: StableId

    @model_validator(mode="after")
    def amount_range_is_ordered(self) -> Self:
        if self.amount_max_minor < self.amount_min_minor:
            raise ValueError("amountMaxMinor must be at least amountMinMinor")
        return self


class TotalDamageTotalsContract(ContractModel):
    known_monthly_minor: MinorUnits
    estimated_monthly_min_minor: MinorUnits
    estimated_monthly_max_minor: MinorUnits
    required_monthly_min_minor: MinorUnits
    required_monthly_max_minor: MinorUnits
    optional_monthly_min_minor: MinorUnits
    optional_monthly_max_minor: MinorUnits
    move_in_required_minor: MinorUnits
    move_in_refundable_minor: MinorUnits

    @model_validator(mode="after")
    def ranges_are_ordered(self) -> Self:
        ranges = (
            (self.estimated_monthly_min_minor, self.estimated_monthly_max_minor),
            (self.required_monthly_min_minor, self.required_monthly_max_minor),
            (self.optional_monthly_min_minor, self.optional_monthly_max_minor),
        )
        if any(maximum < minimum for minimum, maximum in ranges):
            raise ValueError("Total Damage maximums must be at least their minimums")
        if self.move_in_refundable_minor > self.move_in_required_minor:
            raise ValueError("moveInRefundableMinor cannot exceed moveInRequiredMinor")
        return self


def calculate_total_damage(items: list[CostItemContract]) -> dict[str, int]:
    required_monthly = [
        item for item in items if item.frequency == "monthly" and not item.optional
    ]
    optional_monthly = [
        item for item in items if item.frequency == "monthly" and item.optional
    ]
    known_monthly = [item for item in required_monthly if item.certainty == "known"]
    estimated_monthly = [
        item for item in required_monthly if item.certainty == "estimated"
    ]
    required_move_in = [
        item for item in items if item.frequency == "one-time" and not item.optional
    ]

    def total(records: list[CostItemContract], field: str) -> int:
        return sum(int(getattr(record, field)) for record in records)

    return {
        "known_monthly_minor": total(known_monthly, "amount_min_minor"),
        "estimated_monthly_min_minor": total(
            estimated_monthly, "amount_min_minor"
        ),
        "estimated_monthly_max_minor": total(
            estimated_monthly, "amount_max_minor"
        ),
        "required_monthly_min_minor": total(
            required_monthly, "amount_min_minor"
        ),
        "required_monthly_max_minor": total(
            required_monthly, "amount_max_minor"
        ),
        "optional_monthly_min_minor": total(
            optional_monthly, "amount_min_minor"
        ),
        "optional_monthly_max_minor": total(
            optional_monthly, "amount_max_minor"
        ),
        "move_in_required_minor": total(required_move_in, "amount_max_minor"),
        "move_in_refundable_minor": total(
            [item for item in required_move_in if item.refundable],
            "amount_max_minor",
        ),
    }


class TotalDamageVersionContract(ContractModel):
    id: StableId
    version: NonEmpty
    currency: Currency
    period: Literal["monthly"]
    effective_from: date
    reviewed_at: date
    next_review_at: date
    source_ids: Annotated[list[StableId], Field(min_length=1)]
    totals: TotalDamageTotalsContract
    items: Annotated[list[CostItemContract], Field(min_length=1)]
    note: NonEmpty

    @model_validator(mode="after")
    def totals_are_derived_from_items(self) -> Self:
        item_ids = [item.id for item in self.items]
        if len(item_ids) != len(set(item_ids)):
            raise ValueError("Total Damage item IDs must be unique")

        calculated = calculate_total_damage(self.items)
        for field, expected in calculated.items():
            actual = getattr(self.totals, field)
            if actual != expected:
                alias = TotalDamageTotalsContract.model_fields[field].alias or to_camel(field)
                raise ValueError(
                    f"{alias} must equal the sum of its cost items ({expected})"
                )
        return self


class DiscoveryCriterionContract(ContractModel):
    id: StableId
    label: NonEmpty
    matched: bool
    explanation: NonEmpty


class DiscoveryContract(ContractModel):
    matched_count: Annotated[StrictInt, Field(ge=0)]
    total_priorities: Annotated[StrictInt, Field(gt=0)]
    criteria: Annotated[list[DiscoveryCriterionContract], Field(min_length=1)]
    allocation_firewall: NonEmpty

    @model_validator(mode="after")
    def counts_are_derived(self) -> Self:
        matched = sum(criterion.matched for criterion in self.criteria)
        if self.matched_count != matched:
            raise ValueError("matchedCount must equal the matched criteria count")
        if self.total_priorities != len(self.criteria):
            raise ValueError("totalPriorities must equal the criteria count")
        return self


class HeadsUpContract(ContractModel):
    id: StableId
    title: NonEmpty
    detail: NonEmpty
    source_id: StableId
    checked_at: date


class BackstoryContract(ContractModel):
    date: date
    title: NonEmpty
    detail: NonEmpty
    source_id: StableId


class AroundHereContract(ContractModel):
    kind: Literal["transit", "food", "health", "library", "park", "cycling"]
    label: NonEmpty
    detail: NonEmpty
    source_id: StableId


class FinePrintContract(ContractModel):
    title: NonEmpty
    jurisdiction: NonEmpty
    plain_language_summary: NonEmpty
    resident_rights: Annotated[list[NonEmpty], Field(min_length=1)]
    resident_responsibilities: Annotated[list[NonEmpty], Field(min_length=1)]
    human_help: NonEmpty
    source_id: StableId


class CorrectionsContract(ContractModel):
    route: NonEmpty
    explanation: NonEmpty


class FreshnessContract(ContractModel):
    published_at: date
    checked_at: date
    next_review_at: date


class PublicPlaceContract(ContractModel):
    schema_version: Literal["place-public.v1"]
    id: StableId
    slug: StableId
    publication_status: Literal["synthetic-review-fixture"]
    synthetic_data_notice: NonEmpty
    provider: ProviderContract
    building: BuildingContract
    name: NonEmpty
    unit_label: NonEmpty
    place_type: NonEmpty
    household_type: NonEmpty
    bedrooms: Annotated[StrictInt, Field(ge=0)]
    summary: NonEmpty
    image: ImageContract
    availability: AvailabilityContract
    tenure: TenureContract
    accessibility_facts: Annotated[list[AccessibilityFactContract], Field(min_length=1)]
    total_damage: TotalDamageVersionContract
    discovery: DiscoveryContract
    heads_up: Annotated[list[HeadsUpContract], Field(min_length=1)]
    vibe: Annotated[list[NonEmpty], Field(min_length=1)]
    backstory: list[BackstoryContract]
    around_here: list[AroundHereContract]
    fine_print: FinePrintContract
    corrections: CorrectionsContract
    sources: Annotated[list[SourceContract], Field(min_length=1)]
    freshness: FreshnessContract

    @model_validator(mode="after")
    def relationships_and_provenance_are_valid(self) -> Self:
        if self.building.provider_id != self.provider.id:
            raise ValueError("building.providerId must match provider.id")

        source_ids = [source.id for source in self.sources]
        if len(source_ids) != len(set(source_ids)):
            raise ValueError("Source IDs must be unique")

        referenced_source_ids = [
            self.provider.source_id,
            self.building.source_id,
            self.image.source_id,
            self.availability.source_id,
            self.tenure.source_id,
            self.fine_print.source_id,
            *self.total_damage.source_ids,
            *(item.source_id for item in self.total_damage.items),
            *(fact.source_id for fact in self.accessibility_facts),
            *(item.source_id for item in self.heads_up),
            *(item.source_id for item in self.backstory),
            *(item.source_id for item in self.around_here),
        ]
        unknown = sorted(set(referenced_source_ids).difference(source_ids))
        if unknown:
            raise ValueError(f"Unknown source references: {', '.join(unknown)}")

        collection_ids = [
            *(fact.id for fact in self.accessibility_facts),
            *(item.id for item in self.heads_up),
            *(criterion.id for criterion in self.discovery.criteria),
        ]
        if len(collection_ids) != len(set(collection_ids)):
            raise ValueError("Published child record IDs must be unique")
        return self


class PublicPlacesEnvelope(ContractModel):
    schema_version: Literal["place-collection.v1"] = "place-collection.v1"
    data_status: Literal["synthetic", "live"]
    places: list[PublicPlaceContract]


class HealthResponse(ContractModel):
    status: Literal["ok"] = "ok"
    service: str
    database: Literal["reachable"] = "reachable"
