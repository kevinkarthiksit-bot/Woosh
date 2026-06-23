"use client";

import { StatusBadge } from "@/components/account/StatusBadge";
import { Button } from "@/components/ui/Button";
import { formatInr } from "@/lib/api/mappers";
import { getOrder, rateOrder } from "@/lib/api/orders";
import type { ApiOrder } from "@/lib/api/types";
import { formatOrderDate, getScheduleLabel } from "@/lib/account/orders";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface OrderDetailDrawerProps {
  orderId: string | null;
  token: string;
  onClose: () => void;
}

export function OrderDetailDrawer({ orderId, token, onClose }: OrderDetailDrawerProps) {
  const [order, setOrder] = useState<ApiOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [submittingRating, setSubmittingRating] = useState(false);
  const [rated, setRated] = useState(false);

  useEffect(() => {
    if (!orderId) {
      setOrder(null);
      setError("");
      return;
    }

    let cancelled = false;
    const id = orderId;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await getOrder(id, token);
        if (!cancelled) setOrder(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Could not load order details.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [orderId, token]);

  useEffect(() => {
    if (!orderId) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [orderId, onClose]);

  if (!orderId) return null;

  const schedule = order ? getScheduleLabel(order) : null;
  const placedOn = order ? formatOrderDate(order.createdAt) : null;

  const handleRate = async () => {
    if (!order) return;
    setSubmittingRating(true);
    setError("");
    try {
      await rateOrder(order._id, { rating, review: review.trim() || undefined }, token);
      setRated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit rating.");
    } finally {
      setSubmittingRating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close order details"
        onClick={onClose}
      />
      <div
        className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
        data-testid="order-detail-drawer"
      >
        <div className="flex items-center justify-between border-b border-black/8 px-5 py-4">
          <h2 className="font-display text-h3 text-foreground">Order details</h2>
          <button
            type="button"
            onClick={onClose}
            className="focus-ring rounded-full p-2 text-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {loading ? (
            <p className="text-muted">Loading order…</p>
          ) : error && !order ? (
            <p className="text-red-600">{error}</p>
          ) : order ? (
            <div className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-foreground">{order.orderNumber ?? order._id}</p>
                  {placedOn ? <p className="text-sm text-muted">Placed {placedOn}</p> : null}
                </div>
                <StatusBadge status={order.status} />
              </div>

              <dl className="space-y-3 text-sm text-foreground/80">
                {schedule ? (
                  <div>
                    <dt className="font-medium text-foreground">Scheduled</dt>
                    <dd>{schedule}</dd>
                  </div>
                ) : null}
                {order.customer?.address ? (
                  <div>
                    <dt className="font-medium text-foreground">Address</dt>
                    <dd>{order.customer.address}</dd>
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
                {order.items?.[0]?.packageType ? (
                  <div>
                    <dt className="font-medium text-foreground">Package</dt>
                    <dd>{order.items[0].packageType}</dd>
                  </div>
                ) : null}
                {order.totalAmount != null ? (
                  <div>
                    <dt className="font-medium text-foreground">Subtotal</dt>
                    <dd>{formatInr(order.totalAmount)}</dd>
                  </div>
                ) : null}
                {order.couponCode ? (
                  <div>
                    <dt className="font-medium text-foreground">Coupon</dt>
                    <dd>{order.couponCode}</dd>
                  </div>
                ) : null}
                {order.walletUsedAmount ? (
                  <div>
                    <dt className="font-medium text-foreground">Woosh Coins used</dt>
                    <dd>{formatInr(order.walletUsedAmount)}</dd>
                  </div>
                ) : null}
                {order.finalAmount != null ? (
                  <div>
                    <dt className="font-medium text-foreground">Total paid</dt>
                    <dd className="font-semibold text-foreground">{formatInr(order.finalAmount)}</dd>
                  </div>
                ) : null}
              </dl>

              {order.status === "Completed" && !rated ? (
                <div className="rounded-2xl border border-black/8 bg-background-muted p-4">
                  <p className="font-medium text-foreground">Rate this wash</p>
                  <div className="mt-3 flex gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setRating(value)}
                        className={cn(
                          "focus-ring rounded-full px-3 py-1 text-sm font-semibold",
                          rating === value
                            ? "bg-cyan text-white"
                            : "bg-white text-muted ring-1 ring-black/10",
                        )}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    rows={2}
                    placeholder="Optional review"
                    className="focus-ring mt-3 w-full rounded-2xl border border-black/12 px-4 py-3 text-sm"
                  />
                  <Button
                    onClick={handleRate}
                    disabled={submittingRating}
                    className="mt-3 w-full"
                    variant="secondary"
                  >
                    {submittingRating ? "Submitting…" : "Submit rating"}
                  </Button>
                </div>
              ) : null}

              {rated ? (
                <p className="text-sm text-eco">Thanks for your feedback!</p>
              ) : null}

              {error ? <p className="text-sm text-red-600">{error}</p> : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
