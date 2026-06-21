import { apiFetch } from "@/lib/api/client";
import type { ApiResponse, ApiVehicle, ApiWallet } from "@/lib/api/types";

export async function getUserVehicles(phone: string, token: string): Promise<ApiVehicle[]> {
  const response = await apiFetch<ApiResponse<ApiVehicle[]>>(`/users/${phone}/vehicles`, { token });
  return response.data ?? [];
}

export interface AddVehicleInput {
  vehicleType: string;
  vehicleModel: string;
}

export async function addUserVehicle(
  phone: string,
  body: AddVehicleInput,
  token: string,
): Promise<ApiVehicle> {
  const response = await apiFetch<ApiResponse<ApiVehicle>>(`/users/${phone}/vehicles`, {
    method: "POST",
    token,
    body: JSON.stringify(body),
  });
  if (!response.data) {
    throw new Error("Vehicle saved but no data returned");
  }
  return response.data;
}

export async function getUserWallet(phone: string, token: string): Promise<ApiWallet> {
  const response = await apiFetch<ApiResponse<ApiWallet>>(`/users/${phone}/wallet`, { token });
  return response.data ?? { walletBalance: 0, transactions: [] };
}
