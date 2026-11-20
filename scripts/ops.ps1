# Bilwa landing — Docker ops (app + nginx)
# Usage: .\scripts\ops.ps1 <command>
#   start-all | restart-all | stop-all
#   start-app | restart-app | stop-app
#   start-nginx | restart-nginx | stop-nginx
#   build-all | logs

param(
    [Parameter(Position = 0)]
    [ValidateSet(
        "start-all", "restart-all", "stop-all", "build-all",
        "start-app", "restart-app", "stop-app", "build-app",
        "start-nginx", "restart-nginx", "stop-nginx",
        "logs", "help"
    )]
    [string]$Command = "help"
)

$ErrorActionPreference = "Stop"
$Root = Split-Path $PSScriptRoot -Parent
Set-Location $Root

if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Error "Docker is not installed or not on PATH."
}

$SslPem = Join-Path $Root "nginx\ssl\origin.pem"
$SslKey = Join-Path $Root "nginx\ssl\origin.key"
$UseSsl = (Test-Path $SslPem) -and (Test-Path $SslKey)

$ComposeArgs = @("compose")
if ($UseSsl) {
    $ComposeArgs += @("-f", "docker-compose.yml", "-f", "docker-compose.ssl.yml")
    Write-Host "TLS: Cloudflare origin certs detected (HTTPS :${env:HTTPS_PORT:-443})" -ForegroundColor DarkCyan
} else {
    $ComposeArgs += @("-f", "docker-compose.yml")
}

function Invoke-Compose {
    param([string[]]$Args)
    & docker @ComposeArgs @Args
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}

function Reload-Nginx {
    Invoke-Compose @("exec", "nginx", "nginx", "-t")
    Invoke-Compose @("exec", "nginx", "nginx", "-s", "reload")
}

switch ($Command) {
    "start-all" {
        Invoke-Compose @("up", "-d")
        $domain = if ($env:DOMAIN) { $env:DOMAIN } else { "postpuls.com" }
        if ($UseSsl) {
            Write-Host "Site:  https://$domain" -ForegroundColor Green
            Write-Host "       https://www.$domain" -ForegroundColor Green
        } else {
            Write-Host "Site:  http://$domain (port ${env:HTTP_PORT:-80} locally)" -ForegroundColor Green
        }
    }
    "build-all" {
        Invoke-Compose @("up", "-d", "--build")
    }
    "restart-all" {
        Invoke-Compose @("restart")
    }
    "stop-all" {
        Invoke-Compose @("down")
    }
    "start-app" {
        Invoke-Compose @("up", "-d", "app")
    }
    "build-app" {
        Invoke-Compose @("up", "-d", "--build", "app")
    }
    "restart-app" {
        Invoke-Compose @("restart", "app")
    }
    "stop-app" {
        Invoke-Compose @("stop", "app")
    }
    "start-nginx" {
        Invoke-Compose @("up", "-d", "nginx")
    }
    "restart-nginx" {
        $running = docker ps --format "{{.Names}}" | Select-String -Pattern "^bilwa-landing-nginx$" -Quiet
        if ($running) {
            Reload-Nginx
        } else {
            Invoke-Compose @("up", "-d", "nginx")
        }
    }
    "stop-nginx" {
        Invoke-Compose @("stop", "nginx")
    }
    "logs" {
        Invoke-Compose @("logs", "-f", "--tail=100")
    }
    default {
        Write-Host @"

Commands:
  start-all     Start app + nginx
  restart-all   Restart app + nginx
  stop-all      Stop and remove containers
  build-all     Rebuild images and start (full deploy)

  start-app     Start Next.js container only
  restart-app   Restart Next.js container
  stop-app      Stop Next.js container
  build-app     Rebuild and start app only

  start-nginx   Start nginx container
  restart-nginx Test config and reload (or start if down)
  stop-nginx    Stop nginx container

  logs          Follow compose logs

Cloudflare SSL: put origin.pem + origin.key in nginx/ssl/ then start-all.

"@ -ForegroundColor Gray
    }
}