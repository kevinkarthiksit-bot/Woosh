"use client";

import { OrderCard } from "@/components/account/OrderCard";
import { OrderDetailDrawer } from "@/components/account/OrderDetailDrawer";
import { Button } from "@/components/ui/Button";
import { getActiveOrderStatusQuery, sortOrdersNewestFirst, type OrderFilter } from "@/lib/account/orders";
import { listOrders } from "@/lib/api/orders";
import type { ApiOrder } from "@/lib/api/types";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const FILTERS: Array<{ id: OrderFilter; label: string }> = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "completed", label: "Completed" },
];

interface OrdersSectionProps {
  token: string;
}

export function OrdersSection({ token }: OrdersSectionProps) {
  const router = useRouter();
  const [filter, setFilter] = useState<OrderFilter>("all");
  const [orders, setOrders] = useState<ApiOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const statusQuery =
        filter === "active"
          ? getActiveOrderStatusQuery()
          : filter === "completed"
            ? "Completed"
            : undefined;
      const data = await listOrders(token, statusQuery);
      setOrders(sortOrdersNewestFirst(data));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load orders.");
    } finally {
      setLoading(false);
    }
  }, [token, filter]);

  useEffect(() => {
    void loadOrders();
  }, [loadOrders]);

  return (
    <div className="space-y-4" data-testid="account-orders-section">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              filter === item.id ? "bg-cyan text-white" : "bg-black/5 text-muted hover:text-foreground",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-muted">Loading orders…</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : orders.length === 0 ? (
        <div className="rounded-2xl border border-black/8 bg-white p-6 shadow-card">
          <p className="text-muted">No orders in this view.</p>
          <Button
            variant="secondary"
            className="mt-4"
            onClick={() => router.push("/#services")}
          >
            Browse services
          </Button>
        </div>
      ) : (
        <ul className="space-y-4" data-testid="orders-list">
          {orders.map((order) => (
            <li key={order._id}>
              <OrderCard order={order} onSelect={(selected) => setSelectedOrderId(selected._id)} />
            </li>
          ))}
        </ul>
      )}

      <OrderDetailDrawer
        orderId={selectedOrderId}
        token={token}
        onClose={() => setSelectedOrderId(null)}
      />
    </div>
  );
}
