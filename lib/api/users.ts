import { apiFetch } from "@/lib/api/client";
import type { ApiReferralInfo, ApiResponse, ApiVehicle, ApiWallet } from "@/lib/api/types";

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

export async function getUserReferralInfo(
  phone: string,
  token: string,
): Promise<ApiReferralInfo | null> {
  const response = await apiFetch<ApiResponse<ApiReferralInfo>>(`/users/${phone}/referral-info`, {
    token,
  });
  return response.data ?? null;
}
