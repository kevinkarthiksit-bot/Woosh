import { describe, expect, it, afterEach, vi } from "vitest";

describe("build-info", () => {
  afterEach(() => {
    vi.resetModules();
    delete process.env.NEXT_PUBLIC_SITE_LIVE;
    delete process.env.NEXT_PUBLIC_SITE_VERSION;
  });

  it("exposes site version", async () => {
    const { siteVersion } = await import("@/lib/build-info");
    expect(siteVersion).toBeTruthy();
  });

  it("isSiteLive is true only when env is true", async () => {
    process.env.NEXT_PUBLIC_SITE_LIVE = "true";
    const { isSiteLive } = await import("@/lib/build-info");
    expect(isSiteLive).toBe(true);
  });

  it("formatBuildLabel includes version", async () => {
    const { formatBuildLabel } = await import("@/lib/build-info");
    expect(formatBuildLabel()).toMatch(/Site v/);
  });
});
