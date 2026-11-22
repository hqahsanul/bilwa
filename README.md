# Sri Bilva Jewels — marketing site

Next.js 15 frontend for Bilwa: home, gold/silver collection pages, and legal pages. Product data and checkout are illustrative until a commerce backend is connected.

## Development

Node.js 20+ and npm.

```sh
npm install
npm run dev
```

App: [http://localhost:3000](http://localhost:3000)

## Project layout

| Path | Role |
|------|------|
| `app/` | Next.js App Router routes |
| `src/routes/` | Page compositions |
| `src/components/bilva/` | Bilwa UI sections and chrome |
| `src/lib/bilva-site-shell.ts` | Shared content column class |
| `src/data/bilva/` | Marketing content & demo catalogues |
| `src/styles/bilva/` | Design tokens, layout, typography, shared chrome CSS |
| `public/images/bilva/` | Production image assets |
| `docs/design-reference/` | Static HTML mocks (not served) |
| `nginx/`, `docker-compose*.yml` | Optional production deploy |

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local Next.js server |
| `npm run build` / `npm start` | Production build & serve |
| `npm run typecheck` / `npm run lint` | Checks |
| `npm run prune-assets` | Delete unreferenced `public/images/bilva` files |
| `npm run start-all` | Docker app + nginx (see `scripts/ops.ps1`) |

## Routes

- `/` — Home
- `/gold-silver/gold-coins-and-bars`
- `/gold-silver/silver-coins-and-bars`
- `/privacy`, `/terms`, `/refund`
