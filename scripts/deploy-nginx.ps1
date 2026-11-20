# One-click: reload nginx container only (after editing ./nginx)
$ErrorActionPreference = "Stop"
Set-Location (Split-Path $PSScriptRoot -Parent)

docker compose up -d nginx
docker compose exec nginx nginx -t
docker compose exec nginx nginx -s reload

Write-Host "Nginx config validated and reloaded." -ForegroundColor Green