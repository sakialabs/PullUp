from __future__ import annotations

from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import FastAPI

from pullup_api import __version__
from pullup_api.config import Settings
from pullup_api.database import Database
from pullup_api.health import router as health_router
from pullup_api.modules.places.router import router as places_router
from pullup_api.seed import seed_synthetic_place


def create_app(settings: Settings | None = None) -> FastAPI:
    resolved_settings = settings or Settings.from_env()
    database = Database(resolved_settings.database_url)

    @asynccontextmanager
    async def lifespan(app: FastAPI) -> AsyncIterator[None]:
        if resolved_settings.auto_create_schema:
            database.create_schema()
        if resolved_settings.seed_synthetic:
            with database.session_factory.begin() as session:
                seed_synthetic_place(session, resolved_settings.fixture_path)
        yield
        database.dispose()

    app = FastAPI(
        title="PullUp API",
        summary="Public-benefit housing service contracts",
        description=(
            "Read-only public Place discovery for the PullUp vertical slice. "
            "Discovery explanations are never housing allocation decisions."
        ),
        version=__version__,
        lifespan=lifespan,
    )
    app.state.settings = resolved_settings
    app.state.database = database
    app.include_router(health_router)
    app.include_router(places_router)
    return app


app = create_app()
