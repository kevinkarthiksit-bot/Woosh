# Release process

Woosh uses [Semantic Versioning](https://semver.org/) on [`package.json`](../package.json) and [Keep a Changelog](https://keepachangelog.com/) in [`CHANGELOG.md`](../CHANGELOG.md).

## When to release

| Bump | Examples |
|------|----------|
| **PATCH** | Copy edits, asset swaps, small UI fixes |
| **MINOR** | New sections, service page updates, upgrade-plan milestones |
| **MAJOR** | Public launch, breaking URL or IA changes |

You can merge to `main` continuously without tagging; create a **named release** when stakeholders need a version number (demos, sign-off, launch).

## Checklist

1. **Media** — If assets changed: `pnpm sync:media` (and `process:posters` / `generate:videos` if needed). Commit under `public/assets/` only, not `out/`.
2. **Verify locally**
   ```bash
   pnpm lint
   pnpm build
   ```
3. **Merge** — All changes on `main` via PR (Vercel production deploys automatically).
4. **Version** — Bump `version` in `package.json`.
5. **Changelog** — Move entries from `## [Unreleased]` to `## [X.Y.Z] - YYYY-MM-DD` in `CHANGELOG.md`.
6. **Commit** — `chore(release): vX.Y.Z` on `main`.
7. **Tag**
   ```bash
   git tag vX.Y.Z
   git push origin vX.Y.Z
   ```
8. **Smoke test** — Production URL + preview domain; footer shows `Site vX.Y.Z · <short-sha>`; meta tags `site-version` / `build-ref` in page source.

## Build metadata

- **Version** — Read from `package.json` at build time (`NEXT_PUBLIC_SITE_VERSION` in [`next.config.ts`](../next.config.ts)).
- **Commit** — Vercel sets `VERCEL_GIT_COMMIT_SHA`; exposed as short hash in footer (`lib/build-info.ts`).
- **Live vs preview** — `NEXT_PUBLIC_SITE_LIVE=true` only on Production when publicly launched.

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs `pnpm lint` and `pnpm build` on every PR and push to `main`. Vercel still performs the actual deploy.
