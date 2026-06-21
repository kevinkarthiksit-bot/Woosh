import { apiFetch } from "@/lib/api/client";
import type { ApiAvailableSlot, ApiAvailableSlotsData, ApiResponse, ApiTimeSlot } from "@/lib/api/types";

export async function getSlotTimes(): Promise<ApiTimeSlot[]> {
  const response = await apiFetch<ApiResponse<ApiTimeSlot[]>>("/slots/times");
  return response.data ?? [];
}

/** Format a local date as ISO start-of-day UTC for the slots API. */
export function toSlotRangeIso(date: Date): string {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d.toISOString();
}

export function buildSlotRange(startDate: Date, dayCount = 7): { startDate: string; endDate: string } {
  const start = new Date(startDate);
  start.setUTCHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + dayCount);
  return { startDate: start.toISOString(), endDate: end.toISOString() };
}

export async function getAvailableSlots(
  startDate: string,
  endDate: string,
): Promise<ApiAvailableSlotsData> {
  const params = new URLSearchParams({ startDate, endDate });
  const response = await apiFetch<ApiResponse<ApiAvailableSlotsData>>(
    `/slots/available?${params.toString()}`,
  );
  return response.data ?? { slotsByDate: {} };
}

/** Normalize date input to YYYY-MM-DD for slotsByDate keys. */
export function dateToSlotKey(date: string | Date): string {
  if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date;
  }
  const d = typeof date === "string" ? new Date(`${date}T00:00:00`) : date;
  return d.toISOString().slice(0, 10);
}

export function getAvailableTimesForDate(
  date: string,
  rangeData: ApiAvailableSlotsData | null | undefined,
): ApiAvailableSlot[] {
  if (!rangeData?.slotsByDate) return [];
  const key = dateToSlotKey(date);
  return rangeData.slotsByDate[key] ?? [];
}
