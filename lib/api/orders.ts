import { apiFetch } from "@/lib/api/client";
import type { ApiOrder, ApiResponse, CouponValidation, CreateOrderPayload } from "@/lib/api/types";

export async function createOrder(
  payload: CreateOrderPayload,
  token: string,
): Promise<ApiOrder> {
  const response = await apiFetch<ApiResponse<ApiOrder>>("/orders", {
    method: "POST",
    token,
    body: JSON.stringify(payload),
  });

  if (!response.data) {
    throw new Error("Order created but no data returned");
  }
  return response.data;
}

export async function listOrders(token: string, status?: string): Promise<ApiOrder[]> {
  const query = status ? `?status=${encodeURIComponent(status)}` : "";
  const response = await apiFetch<ApiResponse<ApiOrder[]>>(`/orders${query}`, { token });
  return response.data ?? [];
}

export async function getOrder(id: string, token: string): Promise<ApiOrder | null> {
  const response = await apiFetch<ApiResponse<ApiOrder>>(`/orders/${id}`, { token });
  return response.data ?? null;
}

export async function validateCoupon(
  code: string,
  orderAmount: number,
  phone: string,
  token: string,
): Promise<CouponValidation> {
  const response = await apiFetch<ApiResponse<CouponValidation>>("/coupons/validate", {
    method: "POST",
    token,
    body: JSON.stringify({ code, orderAmount, phone }),
  });
  return response.data ?? { valid: false, message: "Invalid coupon" };
}
