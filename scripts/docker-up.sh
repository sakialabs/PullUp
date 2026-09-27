#!/usr/bin/env bash
set -euo pipefail

pullup_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$pullup_root"

exec docker compose -f infra/compose/compose.yaml up --build "$@"
