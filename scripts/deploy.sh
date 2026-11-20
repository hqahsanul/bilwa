#!/usr/bin/env sh
set -eu
cd "$(dirname "$0")/.."

command -v docker >/dev/null 2>&1 || {
  echo "Docker is not installed or not on PATH." >&2
  exit 1
}

sh "$(dirname "$0")/ops.sh" build-all

echo ""
echo "Site:  http://localhost"
echo "Logs:  docker compose logs -f"
echo "Stop:  docker compose down"