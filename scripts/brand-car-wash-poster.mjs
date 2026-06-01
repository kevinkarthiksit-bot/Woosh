/**
 * Composite Woosh branding + key values onto car wash photo (4:5).
 * Usage: node scripts/brand-car-wash-poster.mjs [input.png]
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { GENERATED_ROOT } from "./media-paths.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const W = 1200;
const H = 1500;

const DEFAULT_INPUT = path.join(
  GENERATED_ROOT,
  "car-wash-options",
  "option-a-foam-wash.png",
);

const OUTPUT = path.join(GENERATED_ROOT, "car-wash-options", "car-wash-branded.jpg");

const LOGO = path.join(ROOT, "public/assets/brand/logo-full.jpeg");

function brandingSvg() {
  const pills = [
    "We Come To You",
    "Trained Professionals",
    "Saves Water, Saves Planet",
    "Premium Products",
  ];

  const pillY = 1280;
  const pillW = 270;
  const pillH = 44;
  const gap = 16;
  const startX = (W - (2 * pillW + gap)) / 2;

  const pillRects = pills
    .map((label, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = startX + col * (pillW + gap);
      const y = pillY + row * (pillH + gap);
      return `
        <rect x="${x}" y="${y}" width="${pillW}" height="${pillH}" rx="22"
          fill="rgba(10,22,40,0.85)" stroke="#00BFFF" stroke-width="1.5"/>
        <text x="${x + pillW / 2}" y="${y + 28}" text-anchor="middle"
          font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="15" font-weight="600"
          fill="#FFFFFF">${escapeXml(label)}</text>`;
    })
    .join("");

  return Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="vignette" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#050A18" stop-opacity="0.55"/>
      <stop offset="18%" stop-color="#050A18" stop-opacity="0"/>
      <stop offset="52%" stop-color="#050A18" stop-opacity="0"/>
      <stop offset="72%" stop-color="#050A18" stop-opacity="0.82"/>
      <stop offset="100%" stop-color="#050A18" stop-opacity="0.96"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#00BFFF"/>
      <stop offset="100%" stop-color="#0070FF"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#vignette)"/>
  <text x="600" y="1080" text-anchor="middle"
    font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="22" font-weight="600"
    letter-spacing="6" fill="url(#accent)">DOORSTEP VEHICLE CARE</text>
  <text x="600" y="1155" text-anchor="middle"
    font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="56" font-weight="700"
    fill="#FFFFFF">Car Wash &amp; Care</text>
  <rect x="420" y="1175" width="360" height="4" rx="2" fill="url(#accent)"/>
  <text x="600" y="1225" text-anchor="middle"
    font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="26" font-weight="500"
    fill="rgba(255,255,255,0.88)">Pristine Shine. Every Drive.</text>
  ${pillRects}
  <text x="600" y="1465" text-anchor="middle"
    font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="20" font-weight="600"
    letter-spacing="3" fill="#00BFFF">Clean. Fast. Smart.</text>
</svg>`);
}

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}

async function main() {
  const input = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_INPUT;
  await fs.mkdir(path.dirname(OUTPUT), { recursive: true });

  const photo = await sharp(input)
    .resize(W, H, { fit: "cover", position: "centre" })
    .toBuffer();

  const logo = await sharp(LOGO)
    .resize(220, null, { fit: "inside" })
    .png()
    .toBuffer();

  const logoMeta = await sharp(logo).metadata();
  const logoLeft = Math.round((W - logoMeta.width) / 2);

  await sharp(photo)
    .composite([
      { input: brandingSvg(), top: 0, left: 0 },
      { input: logo, top: 48, left: logoLeft },
    ])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(OUTPUT);

  console.log(`Branded poster → ${OUTPUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
