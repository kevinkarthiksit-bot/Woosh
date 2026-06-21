import { describe, expect, it, vi, beforeEach } from "vitest";
import { getServiceById, getServices } from "@/lib/api/services";
import { apiFetch } from "@/lib/api/client";

vi.mock("@/lib/api/client", () => ({
  apiFetch: vi.fn(),
}));

describe("services API", () => {
  beforeEach(() => {
    vi.mocked(apiFetch).mockReset();
  });

  it("getServices filters by category when provided", async () => {
    vi.mocked(apiFetch).mockResolvedValue({ success: true, data: [] });
    await getServices("CarWash");
    expect(apiFetch).toHaveBeenCalledWith(expect.stringContaining("category=CarWash"));
    expect(apiFetch).toHaveBeenCalledWith(expect.stringContaining("isActive=true"));
  });

  it("getServiceById fetches single service", async () => {
    vi.mocked(apiFetch).mockResolvedValue({
      success: true,
      data: { _id: "s1", name: "Wash", category: "CarWash", basePrice: 499 },
    });
    const service = await getServiceById("s1");
    expect(service?.name).toBe("Wash");
  });
});
