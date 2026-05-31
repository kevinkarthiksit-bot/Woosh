# Woosh Brand Guide (v1 — Inferred)

> Official brand guidelines were not provided. This guide documents colors, typography, and component styles inferred from Desktop `Woosh` marketing assets.

## Brand Voice

- Premium, trustworthy, energetic
- Doorstep convenience with professional results
- Taglines: **Doorstep Vehicle Care**, **Clean. Fast. Smart.**

## Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Charcoal | `#050A18` | Primary background, authority |
| Navy | `#0A1628` | Section backgrounds, panels |
| Cyan | `#00BFFF` | Primary accent, CTAs, links, glow |
| Blue | `#0070FF` | Gradient accents, secondary highlights |
| Gold | `#D4AF37` | Woosh Prime / premium pricing accents |
| Eco Green | `#22C55E` | Sustainability messaging |
| Surface | `#F8FAFC` | Light contrast areas (if needed) |
| White | `#FFFFFF` | Primary text |

## Typography

- **Body font:** Inter (Google Fonts)
- **Display font:** Plus Jakarta Sans (headings, hero, section titles)
- **Logo:** Image assets — icon (`logo.jpeg`) on mobile, full wordmark (`logo-full.jpeg`) on desktop navbar
- **Headings:** Bold display font with optional gradient keyword via `.text-gradient`
- **Body:** Regular/medium weight, white at 70–80% opacity

## Buttons

- **Primary:** Cyan-to-blue gradient, rounded-full, subtle glow on hover
- **Secondary:** Transparent with cyan border, fills lightly on hover
- **Ghost:** Minimal, for tertiary actions

## Cards

- **Service tiles:** Full-bleed image, bottom gradient scrim, no outer border; hover glow on container
- **Benefit panels:** Subtle border on dark navy background (Why Woosh)
- **Glass panels:** Navbar and modals only
- Rounded corners (`rounded-2xl` / `rounded-3xl`)

## Carousel Styling

- Full-width hero with video backgrounds
- Dot indicators: cyan active state
- Arrow controls: dark glass circles with cyan hover
- Autoplay: 5s hero, 4.5s before/after (respects reduced motion)

## Modal Styling

- Dark navy panel with cyan border glow
- Rounded corners, backdrop blur overlay
- Phone/email toggle with cyan active pill

## Image & Video Treatment

- Real Woosh photography and service videos from Desktop assets
- Gradient overlays from charcoal for text legibility
- Videos muted/autoplay in hero; controls on detail and transformation sections

## Motion Style

- 200–400ms ease transitions
- Subtle hover scale and glow
- Framer Motion for section entrance (opacity + translateY)
- Disabled/reduced when `prefers-reduced-motion: reduce`

## Assumptions

1. Cyan/blue palette from logo and marketing posters is the primary web identity
2. Gold accent reserved for premium tier messaging (Woosh Prime)
3. Green accent used for eco/water-saving card only
4. INR pricing (₹) shown where visible in source assets
