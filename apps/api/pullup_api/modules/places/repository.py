from __future__ import annotations

import hashlib
import json

from sqlalchemy import Select, select
from sqlalchemy.orm import Session, joinedload, selectinload

from pullup_api.models import Building, Place, TotalDamageVersion
from pullup_api.schemas import PublicPlaceContract, PublicPlacesEnvelope


def _published_places_statement() -> Select[tuple[Place]]:
    return (
        select(Place)
        .options(
            joinedload(Place.building).joinedload(Building.provider),
            joinedload(Place.availability),
            joinedload(Place.tenure),
            selectinload(Place.sources),
            selectinload(Place.accessibility_facts),
            selectinload(Place.heads_up),
            selectinload(Place.total_damage_versions).selectinload(
                TotalDamageVersion.sources
            ),
            selectinload(Place.total_damage_versions).selectinload(
                TotalDamageVersion.items
            ),
        )
        .where(Place.published_at.is_not(None))
        .where(Place.publication_status != "draft")
    )


def list_published_places(session: Session) -> list[Place]:
    statement = _published_places_statement().order_by(Place.slug)
    return list(session.scalars(statement))


def get_published_place(session: Session, slug: str) -> Place | None:
    statement = _published_places_statement().where(Place.slug == slug)
    return session.scalar(statement)


def _current_total_damage(place: Place) -> TotalDamageVersion:
    current = [version for version in place.total_damage_versions if version.is_current]
    if len(current) != 1:
        raise RuntimeError(
            f"Published Place {place.slug!r} must have exactly one current Total Damage version"
        )
    return current[0]


def serialize_place(place: Place) -> PublicPlaceContract:
    provider = place.building.provider
    damage = _current_total_damage(place)
    payload = {
        "schemaVersion": "place-public.v1",
        "id": place.id,
        "slug": place.slug,
        "publicationStatus": place.publication_status,
        "syntheticDataNotice": place.synthetic_data_notice,
        "provider": {
            "id": provider.id,
            "displayName": provider.display_name,
            "legalForm": provider.legal_form,
            "ownershipModel": provider.ownership_model,
            "serviceCommitment": provider.service_commitment,
            "identityStatus": provider.identity_status,
            "checkedAt": provider.checked_at,
            "sourceId": provider.source_id,
        },
        "building": {
            "id": place.building.id,
            "providerId": place.building.provider_id,
            "name": place.building.name,
            "neighbourhood": place.building.neighbourhood,
            "municipality": place.building.municipality,
            "province": place.building.province,
            "countryCode": place.building.country_code,
            "locationPrecision": place.building.location_precision,
            "sourceId": place.building.source_id,
        },
        "name": place.name,
        "unitLabel": place.unit_label,
        "placeType": place.place_type,
        "householdType": place.household_type,
        "bedrooms": place.bedrooms,
        "summary": place.summary,
        "image": {
            "src": place.image_src,
            "alt": place.image_alt,
            "caption": place.image_caption,
            "evidenceStatus": place.image_evidence_status,
            "sourceId": place.image_source_id,
        },
        "availability": {
            "status": place.availability.status,
            "availableFrom": place.availability.available_from,
            "unitsAvailable": place.availability.units_available,
            "checkedAt": place.availability.checked_at,
            "sourceId": place.availability.source_id,
        },
        "tenure": {
            "type": place.tenure.type,
            "initialTerm": place.tenure.initial_term,
            "ongoingSecurity": place.tenure.ongoing_security,
            "rightsSummary": place.tenure.rights_summary,
            "allocationSummary": place.tenure.allocation_summary,
            "checkedAt": place.tenure.checked_at,
            "sourceId": place.tenure.source_id,
        },
        "accessibilityFacts": [
            {
                "id": fact.id,
                "category": fact.category,
                "feature": fact.feature,
                "status": fact.status,
                "detail": fact.detail,
                "sourceId": fact.source_id,
                "checkedAt": fact.checked_at,
            }
            for fact in place.accessibility_facts
        ],
        "totalDamage": {
            "id": damage.id,
            "version": damage.version,
            "currency": damage.currency,
            "period": damage.period,
            "effectiveFrom": damage.effective_from,
            "reviewedAt": damage.reviewed_at,
            "nextReviewAt": damage.next_review_at,
            "sourceIds": [
                source.id for source in sorted(damage.sources, key=lambda item: item.sort_order)
            ],
            "totals": {
                "knownMonthlyMinor": damage.known_monthly_minor,
                "estimatedMonthlyMinMinor": damage.estimated_monthly_min_minor,
                "estimatedMonthlyMaxMinor": damage.estimated_monthly_max_minor,
                "requiredMonthlyMinMinor": damage.required_monthly_min_minor,
                "requiredMonthlyMaxMinor": damage.required_monthly_max_minor,
                "optionalMonthlyMinMinor": damage.optional_monthly_min_minor,
                "optionalMonthlyMaxMinor": damage.optional_monthly_max_minor,
                "moveInRequiredMinor": damage.move_in_required_minor,
                "moveInRefundableMinor": damage.move_in_refundable_minor,
            },
            "items": [
                {
                    "id": item.id,
                    "label": item.label,
                    "category": item.category,
                    "amountMinMinor": item.amount_min_minor,
                    "amountMaxMinor": item.amount_max_minor,
                    "frequency": item.frequency,
                    "certainty": item.certainty,
                    "optional": item.optional,
                    "refundable": item.refundable,
                    "recipient": item.recipient,
                    "purpose": item.purpose,
                    "changeRule": item.change_rule,
                    "sourceId": item.source_id,
                }
                for item in damage.items
            ],
            "note": damage.note,
        },
        "discovery": place.discovery,
        "headsUp": [
            {
                "id": item.id,
                "title": item.title,
                "detail": item.detail,
                "sourceId": item.source_id,
                "checkedAt": item.checked_at,
            }
            for item in place.heads_up
        ],
        "vibe": place.vibe,
        "backstory": place.backstory,
        "aroundHere": place.around_here,
        "finePrint": place.fine_print,
        "corrections": place.corrections,
        "sources": [
            {
                "id": source.id,
                "title": source.title,
                "kind": source.kind,
                "publisher": source.publisher,
                "sourceDate": source.source_date,
                "checkedAt": source.checked_at,
                "status": source.status,
                "note": source.note,
            }
            for source in sorted(place.sources, key=lambda item: item.sort_order)
        ],
        "freshness": {
            "publishedAt": place.published_at,
            "checkedAt": place.checked_at,
            "nextReviewAt": place.next_review_at,
        },
    }
    return PublicPlaceContract.model_validate(payload)


def serialize_collection(places: list[Place]) -> PublicPlacesEnvelope:
    serialized = [serialize_place(place) for place in places]
    data_status = "synthetic" if all(place.is_synthetic for place in places) else "live"
    return PublicPlacesEnvelope(data_status=data_status, places=serialized)


def etag_for_contract(contract: PublicPlaceContract | PublicPlacesEnvelope) -> str:
    canonical = json.dumps(
        contract.model_dump(mode="json", by_alias=True),
        sort_keys=True,
        separators=(",", ":"),
    ).encode("utf-8")
    digest = hashlib.sha256(canonical).hexdigest()
    return f'"{digest}"'
