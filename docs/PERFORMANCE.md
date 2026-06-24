# Performance Notes

## Current Media Footprint

Measured locally from `public/assets` on June 24, 2026.

| Asset | Size | Notes |
|-------|------|-------|
| `public/assets/videos/app-layout.mp4` | 6.75 MB | Largest asset; avoid above-the-fold autoplay |
| `public/assets/videos/service-video-1.mp4` | 1.54 MB | Keep lazy or replace with compressed cut |
| `public/assets/videos/car-wash-and-care.mp4` | 1.30 MB | Hero/detail candidate; poster-first loading required |
| `public/assets/videos/auto-wash-and-care.mp4` | 1.18 MB | Hero/detail candidate |
| `public/assets/videos/monthly-packages.mp4` | 1.16 MB | Hero/detail candidate |
| `public/assets/videos/bike-wash-and-care.mp4` | 1.13 MB | Hero/detail candidate |
| `public/assets/videos/daily-cleaning-services.mp4` | 0.71 MB | Lightest service video |
| `public/assets/posters/*.jpg` | 137-308 KB | Acceptable, but hero posters should remain LCP target |

## Launch Targets

- Keep hero LCP on poster imagery, not video playback.
- Keep active hero video `preload="metadata"` and inactive videos unloaded.
- Compress any above-the-fold video variants below 1 MB where quality allows.
- Avoid loading `app-layout.mp4` before the app section enters the viewport.
- Re-run Lighthouse mobile before launch and after any media refresh.

## Implemented Safeguards

- `lib/media.ts` keeps hero video preload conservative.
- `hooks/usePublicMedia.ts` caches `/media/public` so landing proof sections share one request.
- `next.config.ts` uses static export with unoptimized images; image dimensions and file sizes must be managed at the asset level.
