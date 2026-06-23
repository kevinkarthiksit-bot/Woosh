import type { ApiOrder } from "@/lib/api/types";

export const ORDER_STATUS_STYLES: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-800",
  Paid: "bg-blue-100 text-blue-800",
  Scheduled: "bg-cyan/15 text-cyan",
  "In Progress": "bg-purple-100 text-purple-800",
  Completed: "bg-emerald-100 text-emerald-800",
  Cancelled: "bg-red-100 text-red-800",
};

export type OrderFilter = "all" | "active" | "completed";

export const ACTIVE_ORDER_STATUSES = ["Pending", "Paid", "Scheduled", "In Progress"] as const;

export function getStatusClass(status: string): string {
  return ORDER_STATUS_STYLES[status] ?? "bg-black/5 text-muted";
}

export function getActiveOrderStatusQuery(): string {
  return ACTIVE_ORDER_STATUSES.join(",");
}

export function sortOrdersNewestFirst(orders: ApiOrder[]): ApiOrder[] {
  return [...orders].sort((a, b) => {
    const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return bTime - aTime;
  });
}

export function formatOrderDate(iso?: string): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function getScheduleLabel(order: ApiOrder): string | null {
  const item = order.items?.[0];
  if (!item) return null;
  if (item.scheduledDate && item.scheduledTimeSlot) {
    return `${item.scheduledDate} · ${item.scheduledTimeSlot}`;
  }
  const slot = item.scheduledSlots?.[0];
  if (slot) {
    return `${slot.scheduledDate} · ${slot.scheduledTimeSlot}`;
  }
  return null;
}

export function isActiveOrder(order: ApiOrder): boolean {
  return ACTIVE_ORDER_STATUSES.includes(order.status as (typeof ACTIVE_ORDER_STATUSES)[number]);
}

export function findNextActiveOrder(orders: ApiOrder[]): ApiOrder | null {
  const active = sortOrdersNewestFirst(orders).filter(isActiveOrder);
  return active[0] ?? null;
}
