/** Media loading policy for performance (LCP = poster, not video). */

export const mediaPolicy = {
  hero: {
    posterSizes: "100vw",
    videoPreloadActive: "metadata" as const,
    videoPreloadInactive: "none" as const,
  },
  serviceCard: {
    sizes: "(max-width: 768px) 100vw, 400px",
  },
} as const;

export function isRealAppLink(url: string): boolean {
  return url !== "#" && url.startsWith("http");
}
