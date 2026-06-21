import type { ApiResponse } from "@/lib/api/types";

const DEFAULT_BASE = "https://car-wash-vbry.onrender.com/api";

export function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_BASE;
}

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type ApiFetchOptions = RequestInit & {
  token?: string;
  skipAuthHeader?: boolean;
};

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const { token, skipAuthHeader, headers: initHeaders, ...init } = options;
  const headers = new Headers(initHeaders);

  if (!skipAuthHeader && !headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    headers,
  });

  let json: ApiResponse<unknown> & Record<string, unknown>;
  try {
    json = (await response.json()) as ApiResponse<unknown> & Record<string, unknown>;
  } catch {
    throw new ApiError(response.status, "Invalid response from server");
  }

  if (!response.ok || json.success === false) {
    const message =
      typeof json.message === "string" ? json.message : `Request failed (${response.status})`;
    throw new ApiError(response.status, message);
  }

  return json as T;
}
