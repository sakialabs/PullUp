#!/usr/bin/env bash
set -euo pipefail

pullup_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
pullup_uv_cache="${PULLUP_UV_CACHE_DIR:-${TMPDIR:-/tmp}/pullup-uv-cache}"
pullup_web_pid=""
pullup_api_pid=""

cleanup() {
  if [[ -n "$pullup_web_pid" ]]; then kill "$pullup_web_pid" 2>/dev/null || true; fi
  if [[ -n "$pullup_api_pid" ]]; then kill "$pullup_api_pid" 2>/dev/null || true; fi
}
trap cleanup EXIT INT TERM

cd "$pullup_root"
npm run dev:web &
pullup_web_pid=$!

(
  cd "$pullup_root/apps/api"
  UV_CACHE_DIR="$pullup_uv_cache" uv run uvicorn pullup_api.main:app --reload --host 127.0.0.1 --port 8000
) &
pullup_api_pid=$!

echo "PullUp web: http://localhost:3000"
echo "PullUp API: http://localhost:8000"

wait -n "$pullup_web_pid" "$pullup_api_pid"
