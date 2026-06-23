import { formatInr } from "@/lib/api/mappers";
import { MembershipBanner } from "@/components/account/MembershipBanner";
import { StatusBadge } from "@/components/account/StatusBadge";
import type { ApiMembership, ApiOrder, ApiReferralInfo, ApiVehicle } from "@/lib/api/types";
import { findNextActiveOrder, formatOrderDate, getScheduleLabel } from "@/lib/account/orders";
import Link from "next/link";

interface AccountOverviewProps {
  orders: ApiOrder[];
  walletBalance: number;
  referral: ApiReferralInfo | null;
  vehicles: ApiVehicle[];
  membership: ApiMembership | null;
  onViewOrders: () => void;
  onViewWallet: () => void;
  onViewReferral: () => void;
}

export function AccountOverview({
  orders,
  walletBalance,
  referral,
  vehicles,
  membership,
  onViewOrders,
  onViewWallet,
  onViewReferral,
}: AccountOverviewProps) {
  const nextOrder = findNextActiveOrder(orders);
  const referralCode = referral?.referralCode;

  return (
    <div className="space-y-4" data-testid="account-overview">
      <div className="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={onViewOrders}
          className="focus-ring rounded-2xl border border-black/8 bg-white p-5 text-left shadow-card transition hover:border-cyan/40"
          data-testid="account-overview-orders"
        >
          <p className="text-sm text-muted">Orders</p>
          <p className="mt-1 font-display text-h3 text-foreground">{orders.length}</p>
          {nextOrder ? (
            <p className="mt-2 text-sm text-foreground/80">
              Next: {nextOrder.orderNumber ?? nextOrder._id}
            </p>
          ) : (
            <p className="mt-2 text-sm text-muted">No active bookings</p>
          )}
        </button>

        <button
          type="button"
          onClick={onViewWallet}
          className="focus-ring rounded-2xl border border-black/8 bg-white p-5 text-left shadow-card transition hover:border-cyan/40"
          data-testid="account-overview-wallet"
        >
          <p className="text-sm text-muted">Woosh Coins</p>
          <p className="mt-1 font-display text-h3 text-cyan" data-testid="account-wallet-balance">
            {formatInr(walletBalance)}
          </p>
          <p className="mt-2 text-sm text-muted">Use at checkout</p>
        </button>
      </div>

      <MembershipBanner membership={membership} />

      {referralCode ? (
        <button
          type="button"
          onClick={onViewReferral}
          className="focus-ring w-full rounded-2xl border border-black/8 bg-white p-5 text-left shadow-card transition hover:border-cyan/40"
        >
          <p className="text-sm text-muted">Your referral code</p>
          <p className="mt-1 font-mono text-lg font-semibold text-foreground">{referralCode}</p>
          <p className="mt-2 text-sm text-cyan">Share and earn Woosh Coins →</p>
        </button>
      ) : null}

      {nextOrder ? (
        <div className="rounded-2xl border border-black/8 bg-white p-5 shadow-card">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm text-muted">Upcoming booking</p>
              <p className="font-semibold text-foreground">
                {nextOrder.orderNumber ?? nextOrder._id}
              </p>
              {formatOrderDate(nextOrder.createdAt) ? (
                <p className="text-xs text-muted">Placed {formatOrderDate(nextOrder.createdAt)}</p>
              ) : null}
            </div>
            <StatusBadge status={nextOrder.status} />
          </div>
          {getScheduleLabel(nextOrder) ? (
            <p className="mt-3 text-sm text-foreground/80">{getScheduleLabel(nextOrder)}</p>
          ) : null}
        </div>
      ) : null}

      {vehicles.length > 0 ? (
        <div className="rounded-2xl border border-black/8 bg-white p-5 shadow-card">
          <p className="font-semibold text-foreground">Saved vehicles</p>
          <ul className="mt-3 space-y-2">
            {vehicles.slice(0, 3).map((vehicle) => (
              <li key={vehicle._id} className="text-sm text-foreground/80">
                {vehicle.vehicleType} — {vehicle.vehicleModel}
              </li>
            ))}
          </ul>
          {vehicles.length > 3 ? (
            <p className="mt-2 text-xs text-muted">+{vehicles.length - 3} more</p>
          ) : null}
        </div>
      ) : (
        <div className="rounded-2xl border border-black/8 bg-white p-5 shadow-card">
          <p className="text-sm text-muted">No saved vehicles yet.</p>
          <Link href="/services/car-wash-and-care/book" className="mt-2 inline-block text-sm text-cyan hover:underline">
            Book a wash to add one
          </Link>
        </div>
      )}
    </div>
  );
}
