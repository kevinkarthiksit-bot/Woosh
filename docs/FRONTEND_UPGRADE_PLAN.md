# Woosh Frontend Upgrade Plan (10 Points)

**Timeline:** Fast track (~2 weeks) — ship polish + performance first; defer heavy scroll narrative to Phase 2.  
**Target:** Move from ~6/10 → ~7.5–8/10 vs. world-class marketing sites (frontend only).

## Your choices (locked in)

| Decision | Choice |
|----------|--------|
| Timeline | Fast track (~2 weeks) |
| App links | Not live — official badge artwork, `#` links until URLs provided |
| Media | Desktop **Woosh** folder + new assets from parallel agent in project |
| Testimonials | No fake names/stats — honest placeholders until real content |
| Typography | Agent picks a free distinctive pairing |
| Visual identity | Custom illustration / icon set (water, vehicle, doorstep) |

---

## Phase map (fast track)

| Phase | Days | Points | Outcome |
|-------|------|--------|---------|
| **0 — Foundation** | 1–2 | All | Tokens, fonts, motion spec, media pipeline, folder conventions |
| **1 — Performance** | 2–4 | #1 | Fast LCP, one hero video strategy, lazy media |
| **2 — Type + mobile** | 4–6 | #2, #10 | Distinctive fonts, type scale, sticky mobile CTA |
| **3 — Illustrations** | 5–8 | #3, #6 (partial) | Woosh motif system + consistent image slots |
| **4 — Motion** | 6–8 | #4 | Shared motion utilities, section reveals |
| **5 — Trust UI** | 7–9 | #7, #8 | Official store badges, placeholder social proof (no fake data) |
| **6 — A11y** | 8–10 | #9 | Skip link, contrast, keyboard, video captions |
| **7 — Deferred** | Week 3+ | #5, #6 (full) | Scroll storytelling + full photo grade when new media lands |

---

## Point 1 — Performance & media delivery

### Goals
- LCP driven by **poster image**, not video
- **One** active hero stream; others lazy
- No 416/range issues in dev; smaller payloads on mobile

### Implementation
1. **Hero media policy** (`lib/services.ts`, `HeroSection.tsx`)
   - Default slide: poster + optional video only when active
   - `preload="none"` on inactive slides; `metadata` on active
   - Add WebM variants where ffmpeg pipeline supports it (`scripts/`)

2. **Media manifest** (`lib/media.ts`)
   - Centralize paths, poster fallbacks, `sizes` hints per breakpoint

3. **Build pipeline** (`scripts/sync-media-to-public.mjs`, `process-posters.mjs`)
   - Export hero loops at 720p + 1080p; cap bitrate (~1.5 Mbps)
   - Generate blur placeholders (LQIP) for posters

4. **Static export QA**
   - Document `robocopy public → out` step in `README.md`
   - Optional: `pnpm postbuild` script to copy `public/assets`

### Files
- `components/sections/HeroSection.tsx`
- `lib/services.ts`, new `lib/media.ts`
- `scripts/*`, `next.config.ts`

### Success metrics
- Lighthouse Performance ≥ 85 (mobile, simulated)
- LCP element = hero poster, not `<video>`

---

## Point 2 — Typography & hierarchy

### Goals
- Distinctive but free; tighter scale; better readability

### Proposed pairing (no license cost)
- **Display:** [Outfit](https://fonts.google.com/specimen/Outfit) or [Sora](https://fonts.google.com/specimen/Sora) — geometric, modern, not overused
- **Body:** [DM Sans](https://fonts.google.com/specimen/DM+Sans) — clean complement to Outfit

*(Final pick at Phase 0 after quick hero mock — swap in `app/layout.tsx`.)*

### Implementation
1. **`lib/typography.ts`** — type scale tokens:
   - `eyebrow`, `h1`, `h2`, `body`, `caption` with `clamp()` sizes
2. **`SectionHeading.tsx`** — use tokens only
3. **Max line length** — `prose-width` utility (~65ch) on long copy
4. **Reduce size sprawl** — audit and remove one-off `text-4xl` / `text-5xl` jumps

### Files
- `app/layout.tsx`, `app/globals.css`
- `components/ui/SectionHeading.tsx`, section components

---

## Point 3 — Visual differentiation (illustrations)

### Goals
- Ownable Woosh motif usable in hero, services, empty states, Prime

### Implementation
1. **Illustration brief** (`docs/ILLUSTRATION_BRIEF.md`)
   - Motifs: water ripple, foam, doorstep pin, vehicle silhouettes (car/bike/auto)
   - Palette: charcoal, cyan, gold accents only
   - Style: flat + subtle gradient (not cartoon-heavy)

2. **Asset delivery options** (pick one with you)
   - SVG set in `public/assets/illustrations/` (preferred)
   - Or AI-generated PNG → traced SVG cleanup

3. **Integration points**
   - Hero: subtle illustration layer behind gradient (low opacity)
   - Services: small corner motif per service slug
   - Woosh Prime: crown + gold wave pattern
   - Why Woosh: icon cards → custom SVGs replace generic Lucide where it matters

4. **`components/ui/WooshIllustration.tsx`** — `name` prop maps to SVG sprite or individual files

### Files
- New `public/assets/illustrations/*`
- `components/ui/WooshIllustration.tsx`
- Section updates: `HeroSection`, `ServicesSection`, `WooshPrimeSection`

---

## Point 4 — Motion design system

### Goals
- Consistent enter/exit; respect `prefers-reduced-motion`

### Implementation
1. **`lib/motion.ts`** — shared variants:
   - `fadeUp`, `fadeIn`, `staggerChildren`, `slideIn`
   - Durations: 0.35s UI, 0.5s section, 0.7s hero
2. **`hooks/useReducedMotion.ts`** — wrap Framer usage
3. **Apply across** hero, section headings, service tiles, modal
4. **Document** in `docs/BRAND_GUIDE.md` → Motion section

### Files
- `lib/motion.ts`, `hooks/useReducedMotion.ts`
- Refactor `HeroSection`, `ServiceTile`, `Modal`, `WhyWooshSection`

---

## Point 5 — Scroll storytelling *(deferred — fast track)*

### Goals (Phase 2)
- One pinned narrative: **Book → Wash → Shine** (3 steps)

### Implementation (when ready)
1. New `HowItWorksSection.tsx` with scroll-driven steps (CSS `scroll-timeline` or Framer `useScroll`)
2. Insert after hero or after services
3. Mobile: horizontal swipe steps instead of pin

### Dependency
- Final copy from you + optional step video loops

---

## Point 6 — Photography & video consistency

### Goals
- Same aspect ratios and grade across tiles, hero, detail pages

### Implementation
1. **Slot standards** (document in `docs/AI_MEDIA_PROMPTS.md`)
   - Service card: 4:5, bottom 45% vignette
   - Hero poster: 16:9
   - Detail: 16:9 video + poster

2. **Ingest folder for parallel agent**
   - `media-incoming/` at repo root (gitignored)
   - `pnpm sync:media` copies processed files → `public/assets/`

3. **When new media arrives**
   - Run `process:posters` + re-encode videos
   - Remove per-service `imageObjectPosition` hacks where crop is fixed in source

### Files
- `scripts/sync-media-to-public.mjs`, `media-incoming/README.md`
- `lib/services.ts` image paths

---

## Point 7 — App store & trust assets

### Goals
- Official badges; no custom SVG approximations

### Implementation
1. Download Apple + Google badge PNGs → `public/assets/badges/`
2. Update `AppDownloadButtons.tsx` to use `<Image>` badges
3. `lib/brand.ts` — `appLinks` stay `#` with `comingSoon: true` flag
4. UI: subtle “Coming soon” label under badges (honest, not clickable fraud)

### Files
- `components/ui/AppDownloadButtons.tsx`
- `lib/brand.ts`, hero + footer + `AppDownloadSection`

---

## Point 8 — Social proof depth *(honest placeholders)*

### Goals
- Structure ready for real content; **no fabricated stats or names**

### Implementation
1. **`TrustStrip.tsx`** — slots for metrics with `enabled: false` until you provide numbers
2. **Testimonials** — redesign cards as “Your story here” / upload-ready frames with play icon disabled + copy: “Video testimonials coming soon”
3. **`lib/trust.ts`** — data shape:
   ```ts
   { metrics: [], testimonials: [], logos: [] }
   ```
4. When you supply content → flip flags, no layout rewrite

### Files
- `components/sections/TestimonialsSection.tsx`
- New `components/sections/TrustStrip.tsx`, `lib/trust.ts`

---

## Point 9 — Accessibility & inclusive UX

### Goals
- WCAG 2.2 AA-oriented pass on marketing page

### Implementation
1. Skip link → `#main` in `layout.tsx`
2. Modal: focus trap audit, `Escape`, return focus to trigger
3. Hero video: `aria-hidden` + poster; optional captions file slot (`/assets/captions/`)
4. Contrast: bump `text-white/50` → `/70` where needed; gold on charcoal check
5. Carousel: keyboard nav on hero pills (arrow keys)
6. Before/after slider: verify roving tabindex + instructions
7. **Manual checklist** in `docs/A11Y_CHECKLIST.md`

### Files
- `app/layout.tsx`, `components/ui/Modal.tsx`, `HeroSection.tsx`, `BeforeAfterSlider.tsx`

---

## Point 10 — Mobile-first interaction & density

### Goals
- Thumb-zone CTAs; less clutter above fold on small screens

### Implementation
1. **`MobileBookBar.tsx`** — sticky bottom bar: “Book a Wash” (visible `< lg`, hides near footer)
2. Hero: shorter copy on `sm` (truncate subtext via CSS or shorter `heroSlides` mobile strings)
3. Services: single column default; reduce `min-h` on tiles for mobile
4. Navbar: ensure touch targets ≥ 44px
5. Test on 390×844 and 360×800 viewports

### Files
- New `components/layout/MobileBookBar.tsx`
- `app/layout.tsx`, `HeroSection.tsx`, `ServiceTile.tsx`, `Navbar.tsx`

---

## What we need from you

### Required soon (Phase 0–1)

| Item | Purpose |
|------|---------|
| **Confirm Woosh assets path** | e.g. `C:\Users\kevin\Desktop\Woosh` — source of truth for sync |
| **`media-incoming/` workflow** | Confirm other agent will drop files there (or alternate path you prefer) |
| **Illustration taste** | 2–3 reference sites or images (“more minimal” vs “more playful”) |

### When available (no blocker for fast track)

| Item | Purpose |
|------|---------|
| App Store + Play Store URLs | Wire `lib/brand.ts`, remove “coming soon” |
| Real metrics | Enable TrustStrip slots |
| Customer videos / quotes | Fill `lib/trust.ts` |
| Partner logos | Footer / trust row |
| Brand font files | Only if you reject Google font pairing |

### Optional but helpful

- Favicon + OG image (1200×630) for social share
- Preferred cities / service areas for localized copy
- Legal: privacy policy URL for footer

---

## Parallel work: other agent (media)

```text
media-incoming/
  posters/          # 16:9 per service
  portraits/        # 4:5 service cards
  videos/hero/      # short loops, <15s, 1080p max
  videos/detail/    # longer detail page clips
  illustrations/    # SVG or PNG for motif system
```

After drop: run `pnpm process:posters && pnpm sync:media` (document exact commands in `media-incoming/README.md`).

---

## Week-by-week (fast track)

### Week 1
- [ ] Phase 0: fonts, tokens, motion lib, media manifest
- [ ] Phase 1: hero performance, encode pipeline, LCP poster
- [ ] Phase 2: type scale + mobile book bar
- [ ] Phase 7: official app badges + coming soon state

### Week 2
- [ ] Phase 3: illustration system (v1 SVG set)
- [ ] Phase 4: motion applied to all major sections
- [ ] Phase 5: trust placeholders (no fake data)
- [ ] Phase 6: a11y pass + checklist
- [ ] QA: Lighthouse, responsive, static export to `out/`

### Week 3+ (Phase 2)
- [ ] Scroll storytelling section
- [ ] Full photo grade when new media ingested
- [ ] Real testimonials + metrics when you provide them

---

## Risk register

| Risk | Mitigation |
|------|------------|
| Illustrations delay Week 2 | Ship with Lucide fallback; swap SVGs when ready |
| New media inconsistent | Enforce slot specs in `media-incoming/README.md` |
| Static export missing assets | Add `postbuild` copy script |
| Scope creep on scroll narrative | Explicitly deferred per fast track |

---

## Approval

Reply with:
1. Confirmed **Woosh folder path** on your machine  
2. **Illustration vibe** (minimal / energetic / luxury)  
3. **`media-incoming/`** — OK to create at repo root?  
4. Go-ahead to start **Week 1 Phase 0**
