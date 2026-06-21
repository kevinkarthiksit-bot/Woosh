import { describe, expect, it, beforeEach, vi } from "vitest";
import {
  clearAuth,
  getStoredToken,
  getStoredUser,
  isValidIndianPhone,
  normalizePhone,
  persistAuth,
  requestOtp,
  verifyOtp,
} from "@/lib/api/auth";
import { apiFetch } from "@/lib/api/client";

vi.mock("@/lib/api/client", () => ({
  apiFetch: vi.fn(),
}));

describe("auth helpers", () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.mocked(apiFetch).mockReset();
  });

  it("normalizes Indian phone numbers", () => {
    expect(normalizePhone("+91 9876543210")).toBe("9876543210");
    expect(normalizePhone("919876543210")).toBe("9876543210");
    expect(normalizePhone("9876543210")).toBe("9876543210");
  });

  it("validates 10-digit mobile numbers", () => {
    expect(isValidIndianPhone("9876543210")).toBe(true);
    expect(isValidIndianPhone("123")).toBe(false);
    expect(isValidIndianPhone("5876543210")).toBe(false);
  });

  it("persists and clears token in sessionStorage", () => {
    persistAuth("token-abc", { id: "1", phone: "9876543210", name: "Test" });
    expect(getStoredToken()).toBe("token-abc");
    expect(getStoredUser()?.name).toBe("Test");
    clearAuth();
    expect(getStoredToken()).toBeNull();
    expect(getStoredUser()).toBeNull();
  });

  it("returns null for corrupted stored user JSON", () => {
    sessionStorage.setItem("woosh_auth_user", "not-json");
    expect(getStoredUser()).toBeNull();
  });

  it("requestOtp calls API with normalized phone", async () => {
    vi.mocked(apiFetch).mockResolvedValue({ success: true });
    await requestOtp("+91 9876543210");
    expect(apiFetch).toHaveBeenCalledWith(
      "/auth/request-otp",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ phone: "9876543210" }),
      }),
    );
  });

  it("verifyOtp persists auth on success", async () => {
    vi.mocked(apiFetch).mockResolvedValue({
      success: true,
      token: "jwt-123",
      user: { id: "u1", phone: "9876543210", name: "Woosh" },
    });

    const result = await verifyOtp("9876543210", "123456", "Woosh");
    expect(result.token).toBe("jwt-123");
    expect(getStoredToken()).toBe("jwt-123");
  });

  it("verifyOtp throws when response missing token", async () => {
    vi.mocked(apiFetch).mockResolvedValue({ success: true });
    await expect(verifyOtp("9876543210", "123456")).rejects.toThrow(
      "Login response missing token or user",
    );
  });
});
