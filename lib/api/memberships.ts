import { apiFetch } from "@/lib/api/client";
import type { ApiMembership, ApiResponse } from "@/lib/api/types";

export async function getMyMembership(token: string): Promise<ApiMembership | null> {
  const response = await apiFetch<ApiResponse<ApiMembership | null>>("/memberships/me", { token });
  return response.data ?? null;
}
