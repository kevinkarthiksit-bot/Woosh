# Woosh Website

Premium doorstep vehicle care marketing website for Woosh — built with Next.js, TypeScript, and Tailwind CSS.

## Getting Started

### Prerequisites

- Node.js 18+ (Node 22 recommended)
- pnpm (via corepack: `corepack enable`)

### Install & Run

```bash
cd woosh-website
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
pnpm build
pnpm start
```

### Deploy

All changes merge to `main` via pull request. Vercel deploys **Preview** for PRs and **Production** on merge. See [`docs/WORKFLOW.md`](docs/WORKFLOW.md), [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md), and [`docs/RELEASE.md`](docs/RELEASE.md).

## Project Structure

- `app/` — Next.js App Router pages
- `components/ui/` — Reusable UI components
- `components/sections/` — Landing page sections
- `lib/` — Shared data and utilities
- `public/assets/` — Brand images, videos, and icons
- `docs/` — Project documentation

## Assets

Brand and service assets were copied from `Desktop/Woosh` into `public/assets/`. See `docs/BRAND_GUIDE.md` for color and styling guidance.

## Scope

This is a **frontend-only v1**. Authentication, booking, payments, and backend APIs are intentionally deferred. See `docs/FEATURE_SCOPE.md` for details.

## Documentation

| File | Description |
|------|-------------|
| `docs/PROJECT_BRIEF.md` | Business and website goals |
| `docs/BRAND_GUIDE.md` | Colors, typography, component styles |
| `docs/FEATURE_SCOPE.md` | What's included and deferred |
| `docs/DECISIONS.md` | Key project decisions |
| `docs/API_ASSUMPTIONS.md` | Future backend API plans |
| `docs/TODO.md` | Task list and blockers |
| `docs/WORKFLOW.md` | Branch model, PR loop, preview vs production |
| `docs/DEPLOYMENT.md` | Vercel + GitHub deploys, env vars, rollback |
| `docs/RELEASE.md` | Semver, changelog, git tags |
| `CHANGELOG.md` | Release history |
| `AGENTS.md` | Instructions for Cursor agents |
