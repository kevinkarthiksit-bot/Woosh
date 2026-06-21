# Development workflow

Trunk-based development for the Woosh marketing site: short-lived feature branches, pull requests, Vercel previews, merge to `main` for production.

**Repo:** [github.com/kevinkarthiksit-bot/Woosh](https://github.com/kevinkarthiksit-bot/Woosh)

## Branch model

| Branch | Purpose | Deploys to |
|--------|---------|------------|
| **`main`** | Always shippable; merge only via PR | **Production** (Vercel) |
| **`feature/…`** | New UI, sections, copy, media | **Preview** (per PR) |
| **`fix/…`** | Bug fixes, hotfixes | **Preview** → merge to `main` |

**Naming examples:** `feature/hero-video`, `fix/mobile-nav`, `feature/trust-strip`.

**No `develop` branch** — for a solo/small-team marketing site, feature branches off `main` are simpler. Add a long-lived `develop` branch only if the team grows and you need batched releases.

## Day-to-day loop

```bash
git checkout main
git pull origin main
git checkout -b feature/short-description

pnpm dev          # http://localhost:3000
# … make changes …
pnpm verify       # lint + unit tests + build before push

git add -A
git commit -m "feat: describe change"
git push -u origin feature/short-description
```

1. Open a **Pull Request** to `main` on GitHub.
2. Wait for **GitHub CI** (`unit`, `build`; optional `integration` / `e2e` when secrets are set) and **Vercel Preview** (bot comment with URL).
3. Share the preview URL for review (see environments below).
4. **Merge** when approved → production redeploys automatically.
5. **Delete** the feature branch on GitHub after merge.

## Environments

| Environment | Trigger | URL | `NEXT_PUBLIC_SITE_LIVE` |
|-------------|---------|-----|-------------------------|
| **Local** | `pnpm dev` | http://localhost:3000 | unset / false |
| **Preview** | PR or push to non-`main` branch | `*.vercel.app` or `preview.getwoosh.com` | `false` |
| **Production** | Merge to `main` | https://woosh-website-two.vercel.app (later `www.getwoosh.com`) | `false` until launch, then `true` |

Preview builds show the amber “Preview — not the live site” banner and use `noindex` robots. See [`lib/build-info.ts`](../lib/build-info.ts).

## Media changes

When adding or updating assets:

1. Process/sync as needed: `pnpm sync:media`, `pnpm process:posters`, `pnpm generate:videos`
2. Commit files under **`public/assets/`** only — never `out/` or `.next/`
3. Check the media box in the PR template

## Releases vs continuous deploy

- **Most merges:** ship to production without a version tag (copy tweaks, small UI fixes).
- **Named milestone:** bump semver, update `CHANGELOG.md`, tag `vX.Y.Z` — see [`docs/RELEASE.md`](RELEASE.md).

## GitHub branch protection (one-time, manual)

GitHub → **Woosh** → **Settings** → **Branches** → **Add branch protection rule** for `main`:

- [ ] Require a pull request before merging
- [ ] Require status checks to pass: **`unit`**, **`build`**
- [ ] (Optional) Do not allow bypassing the above settings

Direct pushes to `main` should be avoided even before protection is enabled.

## Vercel settings checklist (manual)

Vercel → **woosh-website** → **Settings**:

| Setting | Value |
|---------|--------|
| **Git → Production Branch** | `main` |
| **Git → Preview deploys** | Enabled for PRs / non-production branches |
| **Build Command** | `pnpm build` |
| **Output Directory** | `out` |
| **Install Command** | `pnpm install` |
| **Node.js** | 22.x |

Also in [`vercel.json`](../vercel.json). If the dashboard disagrees with `vercel.json`, fix the dashboard — wrong output directory causes 404 / missing assets.

### Environment variables

| Variable | Preview | Production (pre-launch) |
|----------|---------|-------------------------|
| `NEXT_PUBLIC_SITE_LIVE` | `false` | `false` |

Set Production to `true` only at public launch. Details: [`docs/DEPLOYMENT.md`](DEPLOYMENT.md).

### Preview domain

- **Domain:** `preview.getwoosh.com` → assign to **Preview** deployments
- **GoDaddy DNS:** A record `preview` → `76.76.21.21`

## Related docs

- [`docs/TESTING.md`](TESTING.md) — unit, integration, and E2E test suites
- [`docs/DEPLOYMENT.md`](DEPLOYMENT.md) — domains, rollback, emergency CLI deploy
- [`docs/RELEASE.md`](RELEASE.md) — semver, changelog, git tags
- [`.github/pull_request_template.md`](../.github/pull_request_template.md) — PR checklist
