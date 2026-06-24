# Woosh deployment (Vercel + GitHub)

Production deploys are driven by **Git**, not manual CLI uploads. Each push to `main` triggers a production build; each pull request gets a **Preview** deployment URL.

**Day-to-day development:** see [`docs/WORKFLOW.md`](WORKFLOW.md).

## One-time: connect GitHub to Vercel

1. Push this repo to GitHub (if not already): [kevinkarthiksit-bot/Woosh](https://github.com/kevinkarthiksit-bot/Woosh).
2. [Vercel Dashboard](https://vercel.com) → **woosh-website** → **Settings → Git** → connect the GitHub repository.
3. Set **Production Branch** to `main`.
4. Confirm project settings (also in [`vercel.json`](../vercel.json)) — see [Verify Vercel project settings](#verify-vercel-project-settings) below.
5. **Environment variables** (Vercel → Settings → Environment Variables):

   | Variable | Preview | Production | Notes |
   |----------|---------|------------|--------|
   | `NEXT_PUBLIC_SITE_LIVE` | `false` | `false` until public launch, then `true` | Controls noindex + preview banner |
   | `NEXT_PUBLIC_API_BASE_URL` | `https://car-wash-vbry.onrender.com/api` | `https://car-wash-vbry.onrender.com/api` | Render API root used by booking/account |
   | `NEXT_PUBLIC_ASSISTANT_API_URL` | Assistant preview URL | Assistant production URL | Required for chat widget; never an OpenAI key |
   | `NEXT_PUBLIC_SITE_VERSION` | *(optional)* | *(optional)* | Defaults from `package.json` via `next.config.ts` |
   | `VERCEL_GIT_COMMIT_SHA` | *(automatic)* | *(automatic)* | Mapped to footer label via `next.config.ts` |

6. **Domains:** add `preview.getwoosh.com` for Preview only; add `www.getwoosh.com` only when launch-ready (see below).

After Git is connected, **do not** use `vercel deploy --prod` for routine releases—merge to `main` instead.

## Verify Vercel project settings

Vercel → **woosh-website** → **Settings → General** (and **Build & Development Settings**):

| Dashboard field | Required value |
|-----------------|----------------|
| Production Branch | `main` |
| Framework Preset | Next.js (or Other with commands below) |
| Build Command | `pnpm build` |
| Output Directory | *(leave default — empty)* — Vercel auto-detects static export; do not set `out` manually |
| Install Command | `pnpm install` |
| Node.js Version | 22.x |

These match [`vercel.json`](../vercel.json). Static export writes to `out/`; if Output Directory is `public` or `.`, assets and pages will 404 on Vercel.

Locally after `pnpm build`, confirm `out/assets` exists (postbuild copies `public/assets`).

## Day-to-day workflow

1. Branch from `main` (`feature/…` or `fix/…`).
2. Open a PR → Vercel comments with a **Preview** URL; GitHub **CI** runs lint + build.
3. Share the preview URL for review.
4. Merge to `main` → Vercel deploys **Production** automatically.

Full loop: [`docs/WORKFLOW.md`](WORKFLOW.md).

Named releases (semver, changelog, git tags): see [`docs/RELEASE.md`](RELEASE.md).

## Client preview domain (getwoosh.com)

1. Vercel → **Settings → Domains** → add **`preview.getwoosh.com`** (assign to **Preview** deployments).
2. GoDaddy → **getwoosh.com** → **DNS** → add record:
   - **Type:** `A`
   - **Name:** `preview`
   - **Value:** `76.76.21.21`
   - **TTL:** 1 Hour (default)
3. Wait for Vercel to show **Valid Configuration** (often 5–30 minutes).
4. Share `https://preview.getwoosh.com` — do **not** point `www` at production until launch.

## Launch (go live)

1. Set `NEXT_PUBLIC_SITE_LIVE` = `true` on **Production** in Vercel.
2. Attach production domains (`www.getwoosh.com` and optionally `getwoosh.com`) in Vercel; follow DNS records Vercel shows for each.
3. Smoke-test: no preview banner, `robots` allows indexing, footer shows `Site vX.Y.Z · <sha>`.
4. Record the flip in [`docs/DECISIONS.md`](DECISIONS.md).

## Assistant deployment checklist

The AI assistant is a separate FastAPI service. Do not deploy OpenAI keys to Vercel or expose them through `NEXT_PUBLIC_*` variables.

Assistant host (Render/Railway/Fly):

| Variable | Preview | Production | Notes |
|----------|---------|------------|-------|
| `OPENAI_API_KEY` | Preview key | Production key | Secret server-side value only |
| `OPENAI_MODEL` | `gpt-4o-mini` or approved model | `gpt-4o-mini` or approved model | Enables LLM FAQ responses |
| `WOOSH_USE_MOCK_BACKEND` | `false` when testing live API | `false` | Use mock only for local development |
| `WOOSH_BACKEND_BASE_URL` | `https://car-wash-vbry.onrender.com/api` | `https://car-wash-vbry.onrender.com/api` | Live Render API root |
| `ALLOWED_ORIGINS` | Preview website origin | Production website origin | Include comma-separated preview/prod domains |

Smoke checks:

```powershell
Invoke-RestMethod https://<assistant-host>/health
```

- Confirm `llm_enabled: true` when OpenAI variables are configured.
- Confirm `backend_mode: live` before production launch.
- Confirm website `POST /chat` requests go only to `NEXT_PUBLIC_ASSISTANT_API_URL`.

## Emergency deploy (CLI fallback)

If Git deploy is unavailable, use **prebuilt** deploy (avoids empty 404 uploads):

```powershell
cd C:\Users\kevin\Projects\woosh-website
vercel login
pnpm deploy
```

Or: `vercel build --prod --yes` then `vercel deploy --prebuilt --prod --yes`.

## Rollback

- **Fast:** Vercel → **Deployments** → previous Production deployment → **Promote to Production**.
- **Git:** Revert the merge commit on `main` and push (triggers a new deploy).

## Troubleshooting

- **404 or missing assets on Vercel:** Confirm **Output Directory** is `out`. Locally after `pnpm build`, `out/assets` must exist (postbuild copies `public/assets`).
- **Upload / Internal Server Error:** Retry deploy; check [vercel-status.com](https://www.vercel-status.com).
- **Do not run `pnpm build` while `pnpm dev` is running** — can corrupt `.next`.
- **Preview indexed by Google:** Ensure `NEXT_PUBLIC_SITE_LIVE` is not `true` on Preview; preview builds use `noindex` when live flag is false.

## Related docs

- [`docs/WORKFLOW.md`](WORKFLOW.md) — branch model, PR loop, branch protection
- [`docs/RELEASE.md`](RELEASE.md) — version bumps, changelog, tags
- [`CHANGELOG.md`](../CHANGELOG.md) — release history
