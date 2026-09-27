# ADR-0001: Build the production spine incrementally

- **Status:** Accepted for the pre-T0 technical proof
- **Date:** 2026-09-26

## Decision

Use an npm-workspace monorepo with a standard Next.js web app, a FastAPI modular monolith, versioned shared contracts, Alembic migrations, and PostgreSQL/PostGIS for deployed environments. SQLite is allowed only for fast local development and tests. Keep native mobile parked until the accessible responsive web path is proven.

## Why

This matches the target architecture while keeping one small vertical slice easy to understand, test, and replace. It avoids committing PullUp to preview-hosting infrastructure, a second data model, or premature microservices.

## Boundary

The current synthetic slice validates structure and contracts only. Authentication, tenant isolation, consent, audit, recovery, observability, and Canadian-region deployment remain roadmap work and must pass their own gates before live data.
