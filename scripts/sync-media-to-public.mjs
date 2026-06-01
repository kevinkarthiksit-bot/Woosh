import { ensureGeneratedDirs, syncToPublic } from "./media-paths.mjs";

await ensureGeneratedDirs();
await syncToPublic();
