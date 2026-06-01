/**
 * Static export does not copy public/ into out/ in all setups — ensure assets exist.
 */
import { cpSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const outDir = join(root, "out");
const publicDir = join(root, "public");
const dest = join(outDir, "assets");

if (!existsSync(outDir)) {
  console.warn("postbuild-copy-public: out/ not found, skipping");
  process.exit(0);
}

if (!existsSync(join(publicDir, "assets"))) {
  console.warn("postbuild-copy-public: public/assets not found, skipping");
  process.exit(0);
}

cpSync(join(publicDir, "assets"), dest, { recursive: true });
console.log("postbuild-copy-public: copied public/assets → out/assets");
