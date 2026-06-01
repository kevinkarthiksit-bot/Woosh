# Media incoming (drop zone)

Place new assets here for the other agent or manual ingest. This folder is gitignored.

## Structure

```text
media-incoming/
  posters/          # 16:9 JPG — hero & transformations
  portraits/        # 4:5 — service card images
  videos/hero/      # Short loops (<15s), 1080p max
  videos/detail/    # Service detail page clips
  illustrations/    # SVG or PNG motifs
```

## After adding files

```bash
pnpm process:posters   # if portraits/posters need processing
pnpm sync:media        # copy into public/assets/
```

## Slot specs

| Use | Aspect | Notes |
|-----|--------|--------|
| Service card | 4:5 | Bottom 45% vignette in process script |
| Hero poster | 16:9 | LCP image — must match service slug |
| Hero video | 16:9 | H.264 MP4, ≤15s loop, target ~1.5 Mbps |

Source of truth for existing brand files: `C:\Users\kevin\Desktop\Woosh`
