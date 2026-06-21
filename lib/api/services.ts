import { apiFetch } from "@/lib/api/client";
import type { ApiResponse, ApiService } from "@/lib/api/types";

export async function getServices(category?: string): Promise<ApiService[]> {
  const params = new URLSearchParams({ isActive: "true" });
  if (category) params.set("category", category);

  const response = await apiFetch<ApiResponse<ApiService[]>>(`/services?${params.toString()}`);
  return response.data ?? [];
}

export async function getServiceById(id: string): Promise<ApiService | null> {
  const response = await apiFetch<ApiResponse<ApiService>>(`/services/${id}`);
  return response.data ?? null;
}
