import { formatInr } from "@/lib/api/mappers";
import type { ApiOrder } from "@/lib/api/types";
import { formatOrderDate, getScheduleLabel } from "@/lib/account/orders";
import { StatusBadge } from "@/components/account/StatusBadge";

interface OrderCardProps {
  order: ApiOrder;
  onSelect: (order: ApiOrder) => void;
}

export function OrderCard({ order, onSelect }: OrderCardProps) {
  const schedule = getScheduleLabel(order);
  const placedOn = formatOrderDate(order.createdAt);
  const packageType = order.items?.[0]?.packageType;

  return (
    <button
      type="button"
      onClick={() => onSelect(order)}
      className="focus-ring w-full rounded-2xl border border-black/8 bg-white p-5 text-left shadow-card transition hover:border-cyan/40"
      data-testid={`order-${order._id}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-foreground">{order.orderNumber ?? order._id}</p>
          {placedOn ? <p className="text-xs text-muted">Placed {placedOn}</p> : null}
        </div>
        <StatusBadge status={order.status} />
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
        {order.finalAmount != null ? (
          <div>
            <dt className="font-medium text-foreground">Total</dt>
            <dd>{formatInr(order.finalAmount)}</dd>
          </div>
        ) : null}
      </dl>
      <p className="mt-3 text-sm font-medium text-cyan">View details →</p>
    </button>
  );
}
