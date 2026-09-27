from __future__ import annotations

import json
from pathlib import Path

from pullup_api.schemas import PublicPlaceContract


def load_place_fixture(path: Path) -> PublicPlaceContract:
    with path.open(encoding="utf-8") as fixture_file:
        payload = json.load(fixture_file)
    return PublicPlaceContract.model_validate(payload)
