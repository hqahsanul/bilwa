# One-click: app + nginx (http://localhost by default)
$ErrorActionPreference = "Stop"
Set-Location (Split-Path $PSScriptRoot -Parent)

if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Error "Docker is not installed or not on PATH."
}

Write-Host "Building and starting Bilwa landing (app + nginx)..." -ForegroundColor Cyan
& "$PSScriptRoot\ops.ps1" build-all

Write-Host ""
Write-Host "Site:  http://localhost" -ForegroundColor Green
Write-Host "Logs:  docker compose logs -f" -ForegroundColor DarkGray
Write-Host "Stop:  docker compose down" -ForegroundColor DarkGray