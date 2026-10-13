# PullUp API

This service is the read-only public Place slice of PullUp's planned FastAPI modular
monolith. It persists the canonical fictional Cedar Commons fixture in normalized
SQLAlchemy models, validates every cost rollup and source reference, and exposes only:

- `GET /health`
- `GET /v1/places`
- `GET /v1/places/{slug}`

The API deliberately contains no application, allocation, ranking, payment, or public
write route. Discovery criteria are explanatory only, and every Place response carries
the fixture's synthetic-data notice. Both Place routes emit strong ETags.

The service also contains the first delivery-spine boundary: a transactional outbox and
separate worker process. Domain code can add an event with `enqueue_event` inside the
same database transaction as its source change. The worker provides at-least-once
delivery, durable retry state, and explicit topic handlers; handlers must deduplicate by
event ID. Redis may support later queue acceleration, but it is never the legal record.

## Local SQLite run

Python 3.13+ and `uv` are required.

```bash
cd apps/api
uv sync
uv run alembic upgrade head
uv run python -m pullup_api.seed
PULLUP_AUTO_CREATE_SCHEMA=false PULLUP_SEED_SYNTHETIC=false uv run uvicorn pullup_api.main:app --reload
```

For a quick local-only start, `uv run uvicorn pullup_api.main:app --reload` creates the
SQLite schema and idempotently loads the fixture at startup. The default database is the
file `apps/api/pullup.db`; override it with `PULLUP_DATABASE_URL`.

## PostgreSQL Compose run

From the repository root:

```bash
docker compose -f infra/compose/compose.yaml up --build
```

This starts PostGIS-backed PostgreSQL and the API, runs Alembic, and idempotently seeds
the same read-only fixture. It also starts the worker and the other local service-spine
dependencies described in the root README. The Compose credentials are intentionally
local-only and must never be reused in a deployed environment.

To process a single outbox batch during development:

```bash
uv run pullup-worker --once
```

## Verification

```bash
cd apps/api
uv run ruff check .
uv run pytest
```

Deployed environments should run `alembic upgrade head` as a release step and set both
`PULLUP_AUTO_CREATE_SCHEMA=false` and `PULLUP_SEED_SYNTHETIC=false` for the serving
process. The seed command still validates the canonical source fixture before writing.
