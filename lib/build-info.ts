/** Build-time site version and deploy metadata (inlined via NEXT_PUBLIC_* at build). */

export const siteVersion =
  process.env.NEXT_PUBLIC_SITE_VERSION ?? "0.1.0-dev";

export const buildRef = (() => {
  const sha = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
  if (sha && sha.length >= 7) return sha.slice(0, 7);
  return "local";
})();

/** When false, site is treated as preview/staging (noindex, preview banner). */
export const isSiteLive = process.env.NEXT_PUBLIC_SITE_LIVE === "true";

export function formatBuildLabel(): string {
  return `Site v${siteVersion} · ${buildRef}`;
}
