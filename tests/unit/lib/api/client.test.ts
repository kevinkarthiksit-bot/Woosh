import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { apiFetch, ApiError, getApiBaseUrl } from "@/lib/api/client";

describe("apiFetch", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        status: 200,
        json: async () => ({ success: true, data: { ok: true } }),
      })),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.NEXT_PUBLIC_API_BASE_URL;
  });

  it("returns parsed JSON on success", async () => {
    const result = await apiFetch<{ success: boolean; data: { ok: boolean } }>("/services");
    expect(result.data?.ok).toBe(true);
  });

  it("throws ApiError when success is false", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        status: 200,
        json: async () => ({ success: false, message: "Bad request" }),
      })),
    );
    await expect(apiFetch("/services")).rejects.toThrow(ApiError);
  });

  it("throws ApiError on non-ok HTTP status", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: false,
        status: 500,
        json: async () => ({ success: false, message: "Server error" }),
      })),
    );
    await expect(apiFetch("/services")).rejects.toMatchObject({ status: 500 });
  });

  it("throws ApiError on invalid JSON", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        status: 200,
        json: async () => {
          throw new Error("invalid json");
        },
      })),
    );
    await expect(apiFetch("/services")).rejects.toThrow("Invalid response from server");
  });

  it("sends Authorization header when token is provided", async () => {
    const fetchMock = vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    }));
    vi.stubGlobal("fetch", fetchMock);

    await apiFetch("/orders", { token: "secret-token" });

    const [, options] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(new Headers(options.headers).get("Authorization")).toBe("Bearer secret-token");
  });

  it("uses configured base URL default", () => {
    expect(getApiBaseUrl()).toContain("onrender.com");
  });

  it("respects NEXT_PUBLIC_API_BASE_URL override", () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = "https://example.test/api";
    expect(getApiBaseUrl()).toBe("https://example.test/api");
  });
});
