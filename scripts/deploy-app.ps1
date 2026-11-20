# One-click: Next.js app only (port 3000)
$ErrorActionPreference = "Stop"
Set-Location (Split-Path $PSScriptRoot -Parent)

if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Error "Docker is not installed or not on PATH."
}

Write-Host "Building and starting Bilwa app (no nginx)..." -ForegroundColor Cyan
docker compose -f docker-compose.app.yml up -d --build

Write-Host ""
Write-Host "App:   http://localhost:3000" -ForegroundColor Green
Write-Host "Stop:  docker compose -f docker-compose.app.yml down" -ForegroundColor DarkGray