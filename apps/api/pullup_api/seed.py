from __future__ import annotations

from collections.abc import Iterable
from pathlib import Path
from typing import Any

from sqlalchemy import select
from sqlalchemy.orm import Session

from pullup_api.config import Settings
from pullup_api.database import Database
from pullup_api.fixture import load_place_fixture
from pullup_api.models import (
    AccessibilityFact,
    Availability,
    Building,
    HeadsUp,
    Place,
    Provider,
    Source,
    Tenure,
    TotalDamageLineItem,
    TotalDamageVersion,
)
from pullup_api.schemas import PublicPlaceContract


def _upsert[ModelT](
    session: Session,
    model: type[ModelT],
    identifier: str,
    values: dict[str, Any],
) -> ModelT:
    record = session.get(model, identifier)
    if record is None:
        record = model(id=identifier, **values)  # type: ignore[call-arg]
        session.add(record)
    else:
        for field, value in values.items():
            setattr(record, field, value)
    return record


def _delete_missing(
    session: Session,
    records: Iterable[Any],
    expected_ids: set[str],
) -> None:
    for record in records:
        if record.id not in expected_ids:
            session.delete(record)


def seed_synthetic_place(
    session: Session,
    fixture_path: Path,
) -> PublicPlaceContract:
    """Validate and upsert the canonical fixture without duplicating versioned rows."""
    fixture = load_place_fixture(fixture_path)

    sources: dict[str, Source] = {}
    for position, source_data in enumerate(fixture.sources):
        source = _upsert(
            session,
            Source,
            source_data.id,
            {
                "title": source_data.title,
                "kind": source_data.kind,
                "publisher": source_data.publisher,
                "source_date": source_data.source_date,
                "checked_at": source_data.checked_at,
                "status": source_data.status,
                "note": source_data.note,
                "sort_order": position,
            },
        )
        sources[source.id] = source
    session.flush()

    provider_data = fixture.provider
    provider = _upsert(
        session,
        Provider,
        provider_data.id,
        {
            "display_name": provider_data.display_name,
            "legal_form": provider_data.legal_form,
            "ownership_model": provider_data.ownership_model,
            "service_commitment": provider_data.service_commitment,
            "identity_status": provider_data.identity_status,
            "checked_at": provider_data.checked_at,
            "source_id": provider_data.source_id,
        },
    )
    session.flush()

    building_data = fixture.building
    building = _upsert(
        session,
        Building,
        building_data.id,
        {
            "provider_id": provider.id,
            "name": building_data.name,
            "neighbourhood": building_data.neighbourhood,
            "municipality": building_data.municipality,
            "province": building_data.province,
            "country_code": building_data.country_code,
            "location_precision": building_data.location_precision,
            "source_id": building_data.source_id,
        },
    )
    session.flush()

    place = session.get(Place, fixture.id)
    place_values: dict[str, Any] = {
        "slug": fixture.slug,
        "building_id": building.id,
        "publication_status": fixture.publication_status,
        "synthetic_data_notice": fixture.synthetic_data_notice,
        "is_synthetic": True,
        "published_at": fixture.freshness.published_at,
        "checked_at": fixture.freshness.checked_at,
        "next_review_at": fixture.freshness.next_review_at,
        "record_version": 1,
        "name": fixture.name,
        "unit_label": fixture.unit_label,
        "place_type": fixture.place_type,
        "household_type": fixture.household_type,
        "bedrooms": fixture.bedrooms,
        "summary": fixture.summary,
        "image_src": fixture.image.src,
        "image_alt": fixture.image.alt,
        "image_caption": fixture.image.caption,
        "image_evidence_status": fixture.image.evidence_status,
        "image_source_id": fixture.image.source_id,
        "discovery": fixture.discovery.model_dump(mode="json", by_alias=True),
        "vibe": list(fixture.vibe),
        "backstory": [
            item.model_dump(mode="json", by_alias=True) for item in fixture.backstory
        ],
        "around_here": [
            item.model_dump(mode="json", by_alias=True) for item in fixture.around_here
        ],
        "fine_print": fixture.fine_print.model_dump(mode="json", by_alias=True),
        "corrections": fixture.corrections.model_dump(mode="json", by_alias=True),
    }
    if place is None:
        place = Place(id=fixture.id, **place_values)
        session.add(place)
    else:
        for field, value in place_values.items():
            setattr(place, field, value)
    place.sources = [sources[source.id] for source in fixture.sources]
    session.flush()

    availability_data = fixture.availability
    availability = session.get(Availability, place.id)
    availability_values = {
        "status": availability_data.status,
        "available_from": availability_data.available_from,
        "units_available": availability_data.units_available,
        "checked_at": availability_data.checked_at,
        "source_id": availability_data.source_id,
    }
    if availability is None:
        availability = Availability(place_id=place.id, **availability_values)
        session.add(availability)
    else:
        for field, value in availability_values.items():
            setattr(availability, field, value)

    tenure_data = fixture.tenure
    tenure = session.get(Tenure, place.id)
    tenure_values = {
        "type": tenure_data.type,
        "initial_term": tenure_data.initial_term,
        "ongoing_security": tenure_data.ongoing_security,
        "rights_summary": tenure_data.rights_summary,
        "allocation_summary": tenure_data.allocation_summary,
        "checked_at": tenure_data.checked_at,
        "source_id": tenure_data.source_id,
    }
    if tenure is None:
        tenure = Tenure(place_id=place.id, **tenure_values)
        session.add(tenure)
    else:
        for field, value in tenure_values.items():
            setattr(tenure, field, value)

    existing_facts = list(
        session.scalars(
            select(AccessibilityFact).where(AccessibilityFact.place_id == place.id)
        )
    )
    _delete_missing(
        session,
        existing_facts,
        {fact.id for fact in fixture.accessibility_facts},
    )
    for position, fact_data in enumerate(fixture.accessibility_facts):
        _upsert(
            session,
            AccessibilityFact,
            fact_data.id,
            {
                "place_id": place.id,
                "category": fact_data.category,
                "feature": fact_data.feature,
                "status": fact_data.status,
                "detail": fact_data.detail,
                "source_id": fact_data.source_id,
                "checked_at": fact_data.checked_at,
                "sort_order": position,
            },
        )

    existing_heads_up = list(
        session.scalars(select(HeadsUp).where(HeadsUp.place_id == place.id))
    )
    _delete_missing(
        session,
        existing_heads_up,
        {item.id for item in fixture.heads_up},
    )
    for position, heads_up_data in enumerate(fixture.heads_up):
        _upsert(
            session,
            HeadsUp,
            heads_up_data.id,
            {
                "place_id": place.id,
                "title": heads_up_data.title,
                "detail": heads_up_data.detail,
                "source_id": heads_up_data.source_id,
                "checked_at": heads_up_data.checked_at,
                "sort_order": position,
            },
        )

    for version in session.scalars(
        select(TotalDamageVersion).where(TotalDamageVersion.place_id == place.id)
    ):
        version.is_current = False

    damage_data = fixture.total_damage
    totals = damage_data.totals
    damage_version = _upsert(
        session,
        TotalDamageVersion,
        damage_data.id,
        {
            "place_id": place.id,
            "version": damage_data.version,
            "currency": damage_data.currency,
            "period": damage_data.period,
            "effective_from": damage_data.effective_from,
            "reviewed_at": damage_data.reviewed_at,
            "next_review_at": damage_data.next_review_at,
            "is_current": True,
            "known_monthly_minor": totals.known_monthly_minor,
            "estimated_monthly_min_minor": totals.estimated_monthly_min_minor,
            "estimated_monthly_max_minor": totals.estimated_monthly_max_minor,
            "required_monthly_min_minor": totals.required_monthly_min_minor,
            "required_monthly_max_minor": totals.required_monthly_max_minor,
            "optional_monthly_min_minor": totals.optional_monthly_min_minor,
            "optional_monthly_max_minor": totals.optional_monthly_max_minor,
            "move_in_required_minor": totals.move_in_required_minor,
            "move_in_refundable_minor": totals.move_in_refundable_minor,
            "note": damage_data.note,
        },
    )
    damage_version.sources = [sources[source_id] for source_id in damage_data.source_ids]
    session.flush()

    existing_items = list(
        session.scalars(
            select(TotalDamageLineItem).where(
                TotalDamageLineItem.total_damage_version_id == damage_version.id
            )
        )
    )
    _delete_missing(
        session,
        existing_items,
        {item.id for item in damage_data.items},
    )
    for position, item_data in enumerate(damage_data.items):
        _upsert(
            session,
            TotalDamageLineItem,
            item_data.id,
            {
                "total_damage_version_id": damage_version.id,
                "label": item_data.label,
                "category": item_data.category,
                "amount_min_minor": item_data.amount_min_minor,
                "amount_max_minor": item_data.amount_max_minor,
                "frequency": item_data.frequency,
                "certainty": item_data.certainty,
                "optional": item_data.optional,
                "refundable": item_data.refundable,
                "recipient": item_data.recipient,
                "purpose": item_data.purpose,
                "change_rule": item_data.change_rule,
                "source_id": item_data.source_id,
                "sort_order": position,
            },
        )

    session.flush()
    return fixture


def main() -> None:
    settings = Settings.from_env()
    database = Database(settings.database_url)
    if settings.auto_create_schema:
        database.create_schema()
    with database.session_factory.begin() as session:
        fixture = seed_synthetic_place(session, settings.fixture_path)
    print(f"Seeded synthetic Place: {fixture.slug}")
    database.dispose()


if __name__ == "__main__":
    main()
