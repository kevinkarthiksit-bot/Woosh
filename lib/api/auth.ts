import { apiFetch } from "@/lib/api/client";
import type { ApiResponse, ApiUser } from "@/lib/api/types";

const TOKEN_KEY = "woosh_auth_token";
const USER_KEY = "woosh_auth_user";

export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  return digits;
}

export function isValidIndianPhone(phone: string): boolean {
  const normalized = normalizePhone(phone);
  return normalized.length === 10 && /^[6-9]/.test(normalized);
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): ApiUser | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ApiUser;
  } catch {
    return null;
  }
}

export function persistAuth(token: string, user: ApiUser): void {
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAuth(): void {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
}

export async function requestOtp(phone: string): Promise<void> {
  await apiFetch<ApiResponse<null>>("/auth/request-otp", {
    method: "POST",
    body: JSON.stringify({ phone: normalizePhone(phone) }),
  });
}

export async function verifyOtp(
  phone: string,
  otp: string,
  name?: string,
): Promise<{ token: string; user: ApiUser }> {
  const body: Record<string, string> = {
    phone: normalizePhone(phone),
    otp: otp.trim(),
  };
  if (name?.trim()) body.name = name.trim();

  const response = await apiFetch<
    ApiResponse<null> & { token: string; user: ApiUser }
  >("/auth/verify-otp", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!response.token || !response.user) {
    throw new Error("Login response missing token or user");
  }

  persistAuth(response.token, response.user);
  return { token: response.token, user: response.user };
}
