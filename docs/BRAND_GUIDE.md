# Woosh Brand Guide (v2 — Light theme)

> Apple-inspired light UI with Woosh cyan/blue accents. Default theme for web v2.

## Brand Voice

- Premium, trustworthy, energetic
- Doorstep convenience with professional results
- Taglines: **Doorstep Vehicle Care**, **Clean. Fast. Smart.**

## Colors (light theme)

| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#FFFFFF` | Primary page surface |
| Background Muted | `#F5F5F7` | Alternating sections (Apple gray) |
| Background Warm | `#FAF8F0` | Woosh Prime band |
| Foreground | `#1D1D1F` | Primary text |
| Muted | `#6E6E73` | Secondary text, captions |
| Cyan | `#00BFFF` | Primary accent, CTAs, links |
| Blue | `#0070FF` | Gradient accents on buttons |
| Gold | `#D4AF37` | Woosh Prime / premium messaging |
| Eco Green | `#22C55E` | Sustainability messaging |
| Border | `rgba(0,0,0,0.08)` | Hairline dividers and cards |

## Typography

- **Body font:** DM Sans
- **Display font:** Outfit (headings, hero, section titles)
- **Logo:** Image assets — icon (`logo.jpeg`) on mobile, full wordmark (`logo-full.jpeg`) on desktop navbar
- **Headings:** Bold display font with optional gradient keyword via `.text-gradient`
- **Body:** Regular/medium weight, foreground at full or muted opacity

## Buttons

- **Primary:** Cyan-to-blue gradient, rounded-full, subtle shadow (no neon glow)
- **Secondary:** Transparent with gray/cyan border, light hover fill
- **Ghost:** Minimal, for tertiary actions

## Cards

- **Service tiles:** Full-bleed image, bottom dark scrim for title on light pages
- **Benefit panels:** White cards, hairline border, soft shadow
- **Glass panels:** Frosted white navbar on scroll
- Rounded corners (`rounded-2xl` / `rounded-3xl`)

## Carousel Styling

- Full-width hero with video backgrounds
- Light bottom scrim for hero text legibility
- Dot indicators: cyan active state
- Arrow controls: white circles with dark icons

## Modal Styling

- White panel with hairline border and soft shadow
- Backdrop `black/40`
- Phone/email toggle with cyan active pill

## Image & Video Treatment

- Real Woosh photography and service videos
- Hero: bottom light gradient scrim for dark typography
- Service tiles: bottom dark scrim on images
- Videos muted/autoplay in hero

## Motion Style

- 200–400ms ease transitions
- Subtle hover scale and shadow
- Framer Motion for section entrance
- Disabled when `prefers-reduced-motion: reduce`

## Responsive

- Breakpoints: mobile 390px, tablet 768px, laptop 1024px, desktop 1280px+
- Touch targets minimum 44px
- Safe area padding on mobile book bar
