from __future__ import annotations

from pathlib import Path

import pytest
from fastapi import HTTPException, Response
from sqlalchemy import func, select
from starlette.requests import Request

from pullup_api.config import Settings
from pullup_api.health import health
from pullup_api.main import create_app
from pullup_api.models import Place
from pullup_api.modules.places.repository import (
    get_published_place,
    list_published_places,
)
from pullup_api.modules.places.router import get_place, list_places
from pullup_api.seed import seed_synthetic_place

REPOSITORY_ROOT = Path(__file__).resolve().parents[3]
FIXTURE_PATH = (
    REPOSITORY_ROOT
    / "packages"
    / "contracts"
    / "fixtures"
    / "cedar-commons.synthetic.v1.json"
)


def app_for_database(database_path: Path):
    app = create_app(
        Settings(
            database_url=f"sqlite+pysqlite:///{database_path}",
            fixture_path=FIXTURE_PATH,
            auto_create_schema=False,
            seed_synthetic=False,
        )
    )
    app.state.database.create_schema()
    with app.state.database.session_factory.begin() as session:
        seed_synthetic_place(session, FIXTURE_PATH)
    return app


def request_for_app(app) -> Request:
    return Request(
        {
            "type": "http",
            "app": app,
            "method": "GET",
            "path": "/health",
            "headers": [],
            "query_string": b"",
            "server": ("pullup.test", 80),
            "client": ("test", 1),
            "scheme": "http",
        }
    )


def test_public_place_contracts_are_read_only_and_cacheable(tmp_path: Path) -> None:
    app = app_for_database(tmp_path / "api.db")
    try:
        with app.state.database.session_factory() as session:
            health_contract = health(request_for_app(app), session)
            assert health_contract.model_dump() == {
                "status": "ok",
                "service": "pullup-api",
                "database": "reachable",
            }

            response = Response()
            collection = list_places(session, response, None)
            collection_body = collection.model_dump(mode="json", by_alias=True)
            assert collection_body["dataStatus"] == "synthetic"
            assert len(collection_body["places"]) == 1
            assert response.headers["cache-control"].startswith("public")
            collection_etag = response.headers["etag"]

            unchanged = list_places(session, Response(), collection_etag)
            assert isinstance(unchanged, Response)
            assert unchanged.status_code == 304
            assert unchanged.headers["etag"] == collection_etag

            place_response = Response()
            place = get_place("cedar-commons-g2", session, place_response, None)
            body = place.model_dump(mode="json", by_alias=True)
            assert body["publicationStatus"] == "synthetic-review-fixture"
            assert body["totalDamage"]["currency"] == "CAD"
            assert "never affect eligibility" in body["discovery"][
                "allocationFirewall"
            ].lower()

            with pytest.raises(HTTPException) as missing:
                get_place("not-published", session, Response(), None)
            assert missing.value.status_code == 404
            assert missing.value.detail["code"] == "place_not_found"

        place_operations = app.openapi()["paths"]["/v1/places"]
        assert set(place_operations) == {"get"}
    finally:
        app.state.database.dispose()


def test_synthetic_seed_is_idempotent(tmp_path: Path) -> None:
    app = app_for_database(tmp_path / "seed.db")
    try:
        with app.state.database.session_factory.begin() as session:
            seed_synthetic_place(session, FIXTURE_PATH)
            seed_synthetic_place(session, FIXTURE_PATH)

        with app.state.database.session_factory() as session:
            assert session.scalar(select(func.count()).select_from(Place)) == 1
            assert len(list_published_places(session)) == 1
            assert get_published_place(session, "cedar-commons-g2") is not None
    finally:
        app.state.database.dispose()
