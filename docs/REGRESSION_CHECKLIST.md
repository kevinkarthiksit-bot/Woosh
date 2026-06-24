# Manual regression checklist (Phase 3)

Run at **390px**, **768px**, and **1280px** before merging to `main`.

## Visual (Phase 1)

- [ ] Hero carousel video/photo is vivid (no milky full-slide wash)
- [ ] Hero text readable inside frosted panel
- [ ] Typography feels one step larger (headings + body)
- [ ] Service detail hero uses text panel, not full-image white wash
- [ ] Difference section compact (~720px) and centered

## Auth & booking (Phase 2–3)

- [ ] OTP login: request code → verify → navbar shows user
- [ ] Logout clears session
- [ ] Book **Car Wash** end-to-end (service → add-ons → vehicle → address → slot → confirm)
- [ ] Book **Bike Wash** end-to-end
- [ ] Book **Auto Wash** end-to-end (AutoWash category services)
- [ ] Book **Monthly / Membership** (no add-ons or slot step)
- [ ] Book **Daily cleaning** end-to-end
- [ ] My orders page lists placed test orders with status badge and schedule
- [ ] Unauthenticated book CTA opens OTP modal, then continues to wizard

## Account dashboard

- [ ] `/account` overview shows order count, Woosh Coins balance, referral teaser
- [ ] Orders tab filters (All / Active / Completed) and order detail drawer
- [ ] Woosh Coins tab shows balance and transaction list
- [ ] Referral tab shows code with copy button
- [ ] `/orders` redirects to `/account?tab=orders`
- [ ] Navbar **My account** link works when logged in

## AI assistant

- [ ] Floating launcher visible above mobile book bar (390px)
- [ ] Guest can ask FAQ (e.g. “How do I book?”) and get a reply
- [ ] Guest order-status question prompts login (`requires_login`)
- [ ] Logged-in user can ask “Where is my order?” and get status (live assistant + API)
- [ ] Suggested actions: **Book car wash**, **My account**, **Contact support**
- [ ] `NEXT_PUBLIC_ASSISTANT_API_URL` points to deployed assistant in preview/prod

## Mobile app video parity (car wash)

Side-by-side with `Booking flow.mp4` on your machine while running `pnpm dev:clean`:

- [ ] Service picker shows live API packages with price and duration
- [ ] Add-on prices appear in sticky total and review summary
- [ ] Saved vehicles list + add-new vehicle flow works
- [ ] Schedule step shows only **available** slots from `/slots/available` (unavailable hidden)
- [ ] Coupon discount and Woosh Coins (wallet) math matches app on review step
- [ ] Success screen → **My orders** shows matching status and scheduled slot

## API media (Phase 3)

- [ ] Landing loads with static fallback when API offline
- [ ] When API online: testimonials / difference / transformations use live media if present

## Automated

See [`docs/TESTING.md`](./TESTING.md) for the full test suite.

```bash
pnpm verify           # lint + unit + build (PR gate)
pnpm test:integration # live API (needs WOOSH_TEST_* secrets)
pnpm test:e2e         # Playwright (build + serve out/)
```

Playwright E2E specs mirror this checklist: landing, navigation, auth, five booking flows, account dashboard, orders redirect, **assistant widget**.

**Account routes:** `/account` is the primary hub; `/orders` redirects to `/account?tab=orders`.

## Deploy smoke

- [ ] Preview URL loads all sections
- [ ] CORS allows API calls from preview domain (confirm with app developer)
- [ ] Assistant service health (`GET /health`) returns `backend_mode: live` when configured
- [ ] `NEXT_PUBLIC_ASSISTANT_API_URL` on Vercel points to deployed assistant; chat widget loads on preview
