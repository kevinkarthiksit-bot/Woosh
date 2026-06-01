/**
 * Apply brand vignette + bottom gradient for card edge blending.
 * Usage: node scripts/process-posters.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { ensureGeneratedDirs, GENERATED_ROOT, STAGING_DIR, syncToPublic } from "./media-paths.mjs";
const CHARCOAL = { r: 5, g: 10, b: 24 };
const NAVY = { r: 10, g: 22, b: 40 };

const PORTRAIT = [
  { in: "car-wash-portrait.png", out: "services/car-wash.jpg", w: 1200, h: 1500, bottomFade: 0.45 },
  { in: "bike-wash-portrait.png", out: "services/bike-wash.jpg", w: 1200, h: 1500, bottomFade: 0.45 },
  { in: "auto-wash-portrait.png", out: "services/auto-wash.jpg", w: 1200, h: 1500, bottomFade: 0.45 },
  {
    in: "monthly-packages-portrait.png",
    out: "services/monthly-packages.jpg",
    w: 1200,
    h: 1500,
    bottomFade: 0.45,
  },
  {
    in: "daily-cleaning-portrait.png",
    out: "services/daily-cleaning.jpg",
    w: 1200,
    h: 1500,
    bottomFade: 0.45,
  },
];

const LANDSCAPE = [
  { in: "car-wash-landscape.png", out: "posters/car-wash-16x9.jpg", w: 1920, h: 1080, bottomFade: 0.25 },
  { in: "bike-wash-landscape.png", out: "posters/bike-wash-16x9.jpg", w: 1920, h: 1080, bottomFade: 0.25 },
  { in: "auto-wash-landscape.png", out: "posters/auto-wash-16x9.jpg", w: 1920, h: 1080, bottomFade: 0.25 },
  {
    in: "monthly-packages-landscape.png",
    out: "posters/monthly-packages-16x9.jpg",
    w: 1920,
    h: 1080,
    bottomFade: 0.25,
  },
  {
    in: "daily-cleaning-landscape.png",
    out: "posters/daily-cleaning-16x9.jpg",
    w: 1920,
    h: 1080,
    bottomFade: 0.25,
  },
];

async function radialVignette(width, height, edgeColor, strength = 0.55) {
  const cx = width / 2;
  const cy = height / 2;
  const maxR = Math.sqrt(cx * cx + cy * cy);
  const pixels = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const dx = x - cx;
      const dy = y - cy;
      const t = Math.min(1, Math.sqrt(dx * dx + dy * dy) / maxR);
      const alpha = Math.round(255 * strength * t * t);
      const i = (y * width + x) * 4;
      pixels[i] = edgeColor.r;
      pixels[i + 1] = edgeColor.g;
      pixels[i + 2] = edgeColor.b;
      pixels[i + 3] = alpha;
    }
  }

  return sharp(pixels, { raw: { width, height, channels: 4 } }).png();
}

async function bottomGradient(width, height, color, ratio) {
  const fadeH = Math.round(height * ratio);
  const pixels = Buffer.alloc(width * fadeH * 4);

  for (let y = 0; y < fadeH; y++) {
    const t = y / fadeH;
    const alpha = Math.round(255 * (1 - t) * 0.85);
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      pixels[i] = color.r;
      pixels[i + 1] = color.g;
      pixels[i + 2] = color.b;
      pixels[i + 3] = alpha;
    }
  }

  return sharp(pixels, { raw: { width, height: fadeH, channels: 4 } }).png();
}

async function processOne({ in: inputName, out: outputRel, w, h, bottomFade }) {
  const inputPath = path.join(STAGING_DIR, inputName);
  const outputPath = path.join(GENERATED_ROOT, outputRel);

  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  let base = sharp(inputPath).resize(w, h, { fit: "cover", position: "centre" });

  const edgeColor = outputRel.startsWith("posters/") ? NAVY : CHARCOAL;
  const vignette = await radialVignette(w, h, edgeColor, outputRel.startsWith("posters/") ? 0.5 : 0.42);
  const gradient = await bottomGradient(w, h, CHARCOAL, bottomFade);

  await base
    .composite([
      { input: await vignette.toBuffer(), left: 0, top: 0, blend: "over" },
      {
        input: await gradient.toBuffer(),
        left: 0,
        top: h - Math.round(h * bottomFade),
        blend: "over",
      },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(outputPath);

  console.log(`Processed ${outputRel}`);
}

async function main() {
  await ensureGeneratedDirs();

  for (const item of [...PORTRAIT, ...LANDSCAPE]) {
    const inputPath = path.join(STAGING_DIR, item.in);
    try {
      await fs.access(inputPath);
    } catch {
      console.warn(`Skip (missing): ${item.in}`);
      continue;
    }
    await processOne(item);
  }

  await syncToPublic();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
