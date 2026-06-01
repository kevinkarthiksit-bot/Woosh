/**
 * Build hero loops and detail clips from 16:9 posters (Ken Burns + crossfade).
 * Usage: node scripts/generate-videos.mjs
 */
import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import ffmpegPath from "ffmpeg-static";
import { ensureGeneratedDirs, GENERATED_ROOT, syncToPublic } from "./media-paths.mjs";

const FFMPEG = ffmpegPath;

const HERO = [
  { poster: "posters/car-wash-16x9.jpg", out: "videos/hero/car-wash-action.mp4", seconds: 10 },
  { poster: "posters/bike-wash-16x9.jpg", out: "videos/hero/bike-wash-action.mp4", seconds: 10 },
  { poster: "posters/auto-wash-16x9.jpg", out: "videos/hero/auto-wash-action.mp4", seconds: 10 },
  { poster: "posters/monthly-packages-16x9.jpg", out: "videos/hero/monthly-hero-action.mp4", seconds: 10 },
];

const DETAIL = [
  { poster: "posters/car-wash-16x9.jpg", out: "videos/car-wash-and-care.mp4", seconds: 28 },
  { poster: "posters/bike-wash-16x9.jpg", out: "videos/bike-wash-and-care.mp4", seconds: 28 },
  { poster: "posters/auto-wash-16x9.jpg", out: "videos/auto-wash-and-care.mp4", seconds: 28 },
  { poster: "posters/monthly-packages-16x9.jpg", out: "videos/monthly-packages.mp4", seconds: 28 },
  { poster: "posters/daily-cleaning-16x9.jpg", out: "videos/daily-cleaning-services.mp4", seconds: 28 },
];

function runFfmpeg(args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(FFMPEG, args, { stdio: ["ignore", "pipe", "pipe"] });
    let stderr = "";
    proc.stderr.on("data", (d) => {
      stderr += d.toString();
    });
    proc.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exit ${code}\n${stderr}`));
    });
  });
}

async function heroLoop(posterRel, outRel, seconds) {
  const input = path.join(GENERATED_ROOT, posterRel);
  const output = path.join(GENERATED_ROOT, outRel);
  await fs.mkdir(path.dirname(output), { recursive: true });

  const frames = seconds * 30;
  const vf = [
    "scale=1920:1080:force_original_aspect_ratio=increase",
    "crop=1920:1080",
    `zoompan=z='min(zoom+0.0008,1.12)':d=${frames}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080:fps=30`,
  ].join(",");

  await runFfmpeg([
    "-y",
    "-loop",
    "1",
    "-i",
    input,
    "-vf",
    vf,
    "-t",
    String(seconds),
    "-c:v",
    "libx264",
    "-crf",
    "23",
    "-preset",
    "medium",
    "-pix_fmt",
    "yuv420p",
    "-an",
    "-movflags",
    "+faststart",
    output,
  ]);
  console.log(`Hero: ${outRel}`);
}

async function detailClip(posterRel, outRel, seconds) {
  const input = path.join(GENERATED_ROOT, posterRel);
  const output = path.join(GENERATED_ROOT, outRel);
  await fs.mkdir(path.dirname(output), { recursive: true });

  const frames = seconds * 24;
  const vf = [
    "scale=1920:1080:force_original_aspect_ratio=increase",
    "crop=1920:1080",
    `zoompan=z='if(lte(zoom,1.0),1.02,max(1.001,zoom-0.0005))':d=${frames}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080:fps=24`,
  ].join(",");

  await runFfmpeg([
    "-y",
    "-loop",
    "1",
    "-i",
    input,
    "-vf",
    vf,
    "-t",
    String(seconds),
    "-c:v",
    "libx264",
    "-crf",
    "24",
    "-preset",
    "medium",
    "-pix_fmt",
    "yuv420p",
    "-an",
    "-movflags",
    "+faststart",
    output,
  ]);
  console.log(`Detail: ${outRel}`);
}

async function main() {
  if (!FFMPEG) {
    throw new Error("ffmpeg-static binary not found. Run: node node_modules/ffmpeg-static/install.js");
  }

  await ensureGeneratedDirs();

  for (const item of HERO) {
    await heroLoop(item.poster, item.out, item.seconds);
  }
  for (const item of DETAIL) {
    await detailClip(item.poster, item.out, item.seconds);
  }

  await syncToPublic();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
