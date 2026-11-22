Cloudflare Origin Certificate (SSL/TLS → Origin Server → Create Certificate)

Place these files here (do not commit them):

  origin.pem   — Origin Certificate (PEM)
  origin.key   — Private key (PEM)

Then run:  ./scripts/ops.ps1 start-all   (or ops.sh)
Ops auto-enables HTTPS when both files are present.

Cloudflare dashboard:
  - DNS: sribilva.com and www → your server IP (proxied orange cloud)
  - SSL/TLS mode = Full (strict) for origin
  - Origin cert hostnames should include sribilva.com and *.sribilva.com (or www)
