# Project Decisions

## Frontend-First Build

The website is built as a standalone Next.js frontend. Backend, database, and CRM integration are deferred to a later phase per project requirements.

## Tech Stack

- **Next.js 15** App Router
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** for section animations
- **Embla Carousel** for all carousels
- **Lucide React** for icons

## Authentication

Login/Sign Up opens a modal collecting phone **or** email. No backend verification in v1 — form validates client-side and shows a success state.

## Booking CTAs

`Book a Wash` buttons open the Login/Sign Up modal rather than a real booking flow. No `/book` page in v1.

## Service Navigation

Service cards link to dedicated placeholder detail pages under `/services/[slug]`. Content is driven from `lib/services.ts`.

## Brand Colors

No official brand guidelines were found. Palette inferred from Desktop Woosh assets (cyan/blue primary, charcoal backgrounds, gold for premium, green for eco).

## Assets

Real assets copied from `C:\Users\kevin\Desktop\Woosh` into `public/assets/`. Before/after pairs use best available image pairings (not true before/after photography).

## Testimonials

No real testimonial videos available. Placeholder video cards with poster images and sample quotes are used; structure supports future `.mp4` paths.

## Social Links

Footer social icons use `#` placeholders until real profile URLs are provided.

## Package Manager

Project uses `pnpm` (via corepack) due to legacy global npm incompatibility with Node 22 in this environment.

## Visual Upgrade v2 (May 2026)

### Hero media split

Landing hero uses **action wash footage** from `public/assets/videos/hero/`. Flow/demo clips (`monthly-packages.mp4`, `daily-cleaning-services.mp4`, `app-layout.mp4`) are reserved for service detail pages and the Transformations carousel only. Daily cleaning hero uses a Ken Burns photo (`daily-cleaning.jpg`) instead of a flow video.

### Services tiles

Service cards use borderless immersive tiles (`ServiceTile`) with full-bleed imagery and bottom gradient scrims — no glass card border around poster art.

### App download links

App Store and Google Play buttons appear in the hero, mid-page strip, and footer. URLs are `#` placeholders in `lib/brand.ts` until the app is live.

### Typography

Plus Jakarta Sans is used for display headings; Inter remains the body font. Section titles support gradient keyword highlights via `SectionHeading`.

### Woosh Prime band

Dedicated gold-accent premium section between Services and App Download strip.

### Before/after

Interactive drag slider replaces static side-by-side panels in See the Difference.
