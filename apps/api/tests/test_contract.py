from __future__ import annotations

import json
from copy import deepcopy
from pathlib import Path

import pytest
from pydantic import ValidationError

from pullup_api.schemas import PublicPlaceContract

REPOSITORY_ROOT = Path(__file__).resolve().parents[3]
FIXTURE_PATH = (
    REPOSITORY_ROOT
    / "packages"
    / "contracts"
    / "fixtures"
    / "cedar-commons.synthetic.v1.json"
)


@pytest.fixture
def fixture_payload() -> dict[str, object]:
    return json.loads(FIXTURE_PATH.read_text(encoding="utf-8"))


def test_canonical_fixture_validates(fixture_payload: dict[str, object]) -> None:
    place = PublicPlaceContract.model_validate(fixture_payload)

    assert place.schema_version == "place-public.v1"
    assert place.total_damage.currency == "CAD"
    assert place.discovery.matched_count == sum(
        criterion.matched for criterion in place.discovery.criteria
    )


def test_total_damage_cannot_drift_from_line_items(
    fixture_payload: dict[str, object],
) -> None:
    changed = deepcopy(fixture_payload)
    changed["totalDamage"]["totals"]["requiredMonthlyMinMinor"] += 1  # type: ignore[index,operator]

    with pytest.raises(ValidationError, match="requiredMonthlyMinMinor"):
        PublicPlaceContract.model_validate(changed)


def test_every_material_fact_must_reference_a_known_source(
    fixture_payload: dict[str, object],
) -> None:
    changed = deepcopy(fixture_payload)
    changed["availability"]["sourceId"] = "missing-source"  # type: ignore[index]

    with pytest.raises(ValidationError, match="Unknown source references"):
        PublicPlaceContract.model_validate(changed)
