#!/usr/bin/env bash
set -euo pipefail

pullup_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
pullup_uv_cache="${PULLUP_UV_CACHE_DIR:-${TMPDIR:-/tmp}/pullup-uv-cache}"

for command_name in node npm uv; do
  if ! command -v "$command_name" >/dev/null 2>&1; then
    echo "Missing required command: $command_name" >&2
    exit 1
  fi
done

node -e 'const [major, minor] = process.versions.node.split(".").map(Number); if (major < 22 || (major === 22 && minor < 13)) { console.error("PullUp requires Node.js 22.13 or newer."); process.exit(1); }'

cd "$pullup_root"
npm ci
UV_CACHE_DIR="$pullup_uv_cache" uv sync --project apps/api --all-groups --frozen

echo "PullUp is ready."
echo "  Web: npm run dev"
echo "  Full stack: npm run dev:all"
echo "  Checks: npm test"
