import { apiFetch } from "@/lib/api/client";
import type { ApiResponse, PublicMedia } from "@/lib/api/types";

export async function getPublicMedia(): Promise<PublicMedia> {
  const response = await apiFetch<ApiResponse<PublicMedia>>("/media/public");
  return response.data ?? {};
}

export function resolveMediaUrl(url: string | undefined, fallback: string): string {
  if (!url) return fallback;
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/")) {
    return url;
  }
  return fallback;
}
