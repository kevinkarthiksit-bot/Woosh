import { describe, expect, it, vi, beforeEach } from "vitest";
import { getMyMembership } from "@/lib/api/memberships";
import { apiFetch } from "@/lib/api/client";

vi.mock("@/lib/api/client", () => ({
  apiFetch: vi.fn(),
}));

describe("memberships API", () => {
  beforeEach(() => {
    vi.mocked(apiFetch).mockReset();
  });

  it("getMyMembership fetches active membership", async () => {
    vi.mocked(apiFetch).mockResolvedValue({
      success: true,
      data: { planName: "Woosh Green", status: "active" },
    });
    const membership = await getMyMembership("token");
    expect(membership?.planName).toBe("Woosh Green");
    expect(apiFetch).toHaveBeenCalledWith("/memberships/me", { token: "token" });
  });
});
