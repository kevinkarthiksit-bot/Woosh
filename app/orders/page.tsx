"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { useAuthModal } from "@/components/providers/AuthModalProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { formatInr } from "@/lib/api/mappers";
import { listOrders } from "@/lib/api/orders";
import type { ApiOrder } from "@/lib/api/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const STATUS_STYLES: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-800",
  Paid: "bg-blue-100 text-blue-800",
  Scheduled: "bg-cyan/15 text-cyan",
  "In Progress": "bg-purple-100 text-purple-800",
  Completed: "bg-emerald-100 text-emerald-800",
  Cancelled: "bg-red-100 text-red-800",
};

function getStatusClass(status: string): string {
  return STATUS_STYLES[status] ?? "bg-black/5 text-muted";
}

function formatOrderDate(iso?: string): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getScheduleLabel(order: ApiOrder): string | null {
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

export default function OrdersPage() {
  const router = useRouter();
  const { token, isAuthenticated, isLoading } = useAuth();
  const { openAuthModal } = useAuthModal();
  const [orders, setOrders] = useState<ApiOrder[]>([]);
  const [error, setError] = useState("");
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated || !token) {
      setLoadingOrders(false);
      return;
    }

    const authToken = token;
    let cancelled = false;
    async function load() {
      try {
        const data = await listOrders(authToken);
        if (!cancelled) setOrders(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Could not load orders.");
        }
      } finally {
        if (!cancelled) setLoadingOrders(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, isLoading, token]);

  const sortedOrders = useMemo(
    () =>
      [...orders].sort((a, b) => {
        const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bTime - aTime;
      }),
    [orders],
  );

  return (
    <div className="section-padding bg-background-muted pt-28">
      <Container className="max-w-3xl">
        <h1 className="font-display text-h1 text-foreground">My orders</h1>
        <p className="mt-3 text-body-lg text-muted">Track your Woosh bookings and service status.</p>

        {isLoading || loadingOrders ? (
          <p className="mt-8 text-muted">Loading…</p>
        ) : !isAuthenticated ? (
          <div className="mt-8 space-y-4 rounded-2xl border border-black/8 bg-white p-6 shadow-card">
            <p className="text-muted">Log in to see your orders.</p>
            <Button onClick={() => openAuthModal("/orders")}>Login with OTP</Button>
          </div>
        ) : error ? (
          <p className="mt-8 text-red-600">{error}</p>
        ) : sortedOrders.length === 0 ? (
          <div className="mt-8 space-y-4 rounded-2xl border border-black/8 bg-white p-6 shadow-card">
            <p className="text-muted">No orders yet.</p>
            <Button onClick={() => router.push("/#services")} variant="secondary" className="inline-flex">
              Browse services
            </Button>
          </div>
        ) : (
          <ul className="mt-8 space-y-4" data-testid="orders-list">
            {sortedOrders.map((order) => {
              const schedule = getScheduleLabel(order);
              const placedOn = formatOrderDate(order.createdAt);
              const packageType = order.items?.[0]?.packageType;
              return (
                <li
                  key={order._id}
                  className="rounded-2xl border border-black/8 bg-white p-5 shadow-card"
                  data-testid={`order-${order._id}`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-foreground">
                        {order.orderNumber ?? order._id}
                      </p>
                      {placedOn ? <p className="text-xs text-muted">Placed {placedOn}</p> : null}
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-semibold",
                        getStatusClass(order.status),
                      )}
                      data-testid={`order-status-${order._id}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <dl className="mt-4 space-y-2 text-sm text-foreground/80">
                    {packageType ? (
                      <div>
                        <dt className="font-medium text-foreground">Service type</dt>
                        <dd>{packageType}</dd>
                      </div>
                    ) : null}
                    {schedule ? (
                      <div>
                        <dt className="font-medium text-foreground">Scheduled</dt>
                        <dd>{schedule}</dd>
                      </div>
                    ) : null}
                    {order.customer?.vehicleModel ? (
                      <div>
                        <dt className="font-medium text-foreground">Vehicle</dt>
                        <dd>
                          {order.customer.vehicleType} — {order.customer.vehicleModel}
                        </dd>
                      </div>
                    ) : null}
                    {order.customer?.address ? (
                      <div>
                        <dt className="font-medium text-foreground">Address</dt>
                        <dd>{order.customer.address}</dd>
                      </div>
                    ) : null}
                    {order.finalAmount != null ? (
                      <div>
                        <dt className="font-medium text-foreground">Total</dt>
                        <dd>{formatInr(order.finalAmount)}</dd>
                      </div>
                    ) : null}
                  </dl>
                </li>
              );
            })}
          </ul>
        )}

        <Link href="/" className="mt-8 inline-block text-sm text-cyan hover:underline">
          ← Back home
        </Link>
      </Container>
    </div>
  );
}
