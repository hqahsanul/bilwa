#!/usr/bin/env sh
set -eu
cd "$(dirname "$0")/.."

docker compose -f docker-compose.app.yml up -d --build
echo "App: http://localhost:3000"