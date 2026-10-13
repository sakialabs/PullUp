#!/usr/bin/env bash
set -euo pipefail

pullup_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$pullup_root"

npm run lint
npm run typecheck
npm run test:contracts
npm run test:api-client
npm run test:docs
npm run lint:api
npm run test:api
npm run build
npm run test:rendered
npm audit --omit=dev --audit-level=high

if command -v docker >/dev/null 2>&1; then
  docker compose -f infra/compose/compose.yaml config --quiet
fi
