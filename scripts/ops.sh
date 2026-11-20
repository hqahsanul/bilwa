#!/usr/bin/env sh
# Bilwa landing — Docker ops (app + nginx)
set -eu

ROOT="$(CDPATH= cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

command -v docker >/dev/null 2>&1 || {
  echo "Docker is not installed or not on PATH." >&2
  exit 1
}

CMD="${1:-help}"

USE_SSL=0
if [ -f nginx/ssl/origin.pem ] && [ -f nginx/ssl/origin.key ]; then
  USE_SSL=1
  echo "TLS: Cloudflare origin certs detected (HTTPS :${HTTPS_PORT:-443})"
fi

if [ "$USE_SSL" -eq 1 ]; then
  COMPOSE=(docker compose -f docker-compose.yml -f docker-compose.ssl.yml)
else
  COMPOSE=(docker compose -f docker-compose.yml)
fi

reload_nginx() {
  "${COMPOSE[@]}" exec nginx nginx -t
  "${COMPOSE[@]}" exec nginx nginx -s reload
}

case "$CMD" in
  start-all)
    "${COMPOSE[@]}" up -d
  DOMAIN="${DOMAIN:-postpuls.com}"
    if [ "$USE_SSL" -eq 1 ]; then
      echo "Site:  https://$DOMAIN"
      echo "       https://www.$DOMAIN"
    else
      echo "Site:  http://$DOMAIN (port ${HTTP_PORT:-80} locally)"
    fi
    ;;
  build-all)
    "${COMPOSE[@]}" up -d --build
    ;;
  restart-all)
    "${COMPOSE[@]}" restart
    ;;
  stop-all)
    "${COMPOSE[@]}" down
    ;;
  start-app)
    "${COMPOSE[@]}" up -d app
    ;;
  build-app)
    "${COMPOSE[@]}" up -d --build app
    ;;
  restart-app)
    "${COMPOSE[@]}" restart app
    ;;
  stop-app)
    "${COMPOSE[@]}" stop app
    ;;
  start-nginx)
    "${COMPOSE[@]}" up -d nginx
    ;;
  restart-nginx)
    if "${COMPOSE[@]}" ps --status running nginx 2>/dev/null | grep -q nginx; then
      reload_nginx
    else
      "${COMPOSE[@]}" up -d nginx
    fi
    ;;
  stop-nginx)
    "${COMPOSE[@]}" stop nginx
    ;;
  logs)
    "${COMPOSE[@]}" logs -f --tail=100
    ;;
  help|*)
    cat <<'EOF'
Commands: start-all | restart-all | stop-all | build-all
          start-app | restart-app | stop-app | build-app
          start-nginx | restart-nginx | stop-nginx | logs

Cloudflare SSL: origin.pem + origin.key in nginx/ssl/
EOF
    ;;
esac