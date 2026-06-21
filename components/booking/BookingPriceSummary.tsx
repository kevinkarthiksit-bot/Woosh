import { formatInr } from "@/lib/api/mappers";

interface BookingPriceSummaryProps {
  subtotal: number;
  couponDiscount?: number | null;
  walletDeduction?: number;
  label?: string;
}

export function BookingPriceSummary({
  subtotal,
  couponDiscount,
  walletDeduction = 0,
  label = "Estimated total",
}: BookingPriceSummaryProps) {
  const afterCoupon = Math.max(0, subtotal - (couponDiscount ?? 0));
  const total = Math.max(0, afterCoupon - walletDeduction);

  return (
    <div
      className="sticky bottom-0 z-10 -mx-6 border-t border-black/8 bg-white/95 px-6 py-4 backdrop-blur"
      data-testid="booking-price-summary"
    >
      <div className="flex items-end justify-between gap-4">
        <div className="text-sm text-muted">
          <p>{label}</p>
          {couponDiscount ? (
            <p className="text-eco">Coupon −{formatInr(couponDiscount)}</p>
          ) : null}
          {walletDeduction > 0 ? (
            <p className="text-eco">Woosh Coins −{formatInr(walletDeduction)}</p>
          ) : null}
        </div>
        <p className="font-display text-h3 text-foreground">{formatInr(total)}</p>
      </div>
    </div>
  );
}
