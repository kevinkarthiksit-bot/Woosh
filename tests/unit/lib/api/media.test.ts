import { describe, expect, it, vi, beforeEach } from "vitest";
import { getPublicMedia, resolveMediaUrl } from "@/lib/api/media";
import { apiFetch } from "@/lib/api/client";

vi.mock("@/lib/api/client", () => ({
  apiFetch: vi.fn(),
}));

describe("media API", () => {
  beforeEach(() => {
    vi.mocked(apiFetch).mockReset();
  });

  it("getPublicMedia returns data object", async () => {
    vi.mocked(apiFetch).mockResolvedValue({ success: true, data: { hero: "url" } });
    const media = await getPublicMedia();
    expect(media).toEqual({ hero: "url" });
  });

  it("resolveMediaUrl returns fallback when missing", () => {
    expect(resolveMediaUrl(undefined, "/fallback.jpg")).toBe("/fallback.jpg");
  });

  it("resolveMediaUrl keeps absolute and relative URLs", () => {
    expect(resolveMediaUrl("https://cdn.test/a.jpg", "/f.jpg")).toBe("https://cdn.test/a.jpg");
    expect(resolveMediaUrl("/assets/a.jpg", "/f.jpg")).toBe("/assets/a.jpg");
  });

  it("resolveMediaUrl uses fallback for bare paths", () => {
    expect(resolveMediaUrl("relative.jpg", "/f.jpg")).toBe("/f.jpg");
  });
});
