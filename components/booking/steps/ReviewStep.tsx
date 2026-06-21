import { Button } from "@/components/ui/Button";
import { formatInr } from "@/lib/api/mappers";
import type { ApiService } from "@/lib/api/types";

interface ReviewStepProps {
  service: ApiService;
  addOns: ApiService[];
  address: string;
  vehicleLabel: string;
  scheduledDate?: string;
  scheduledTimeSlot?: string;
  subtotal: number;
  couponCode: string;
  couponDiscount: number | null;
  walletBalance: number;
  useWallet: boolean;
  walletDeduction: number;
  onCouponCodeChange: (value: string) => void;
  onApplyCoupon: () => void;
  onUseWalletChange: (value: boolean) => void;
  onBack: () => void;
  onConfirm: () => void;
  error?: string;
  submitting?: boolean;
}

export function ReviewStep({
  service,
  addOns,
  address,
  vehicleLabel,
  scheduledDate,
  scheduledTimeSlot,
  subtotal,
  couponCode,
  couponDiscount,
  walletBalance,
  useWallet,
  walletDeduction,
  onCouponCodeChange,
  onApplyCoupon,
  onUseWalletChange,
  onBack,
  onConfirm,
  error,
  submitting,
}: ReviewStepProps) {
  const afterCoupon = Math.max(0, subtotal - (couponDiscount ?? 0));
  const total = Math.max(0, afterCoupon - walletDeduction);

  return (
    <div className="space-y-4">
      <h2 className="font-display text-h3 text-foreground">Review & confirm</h2>
      <ul className="space-y-2 text-body text-foreground/80">
        <li>
          <strong>Service:</strong> {service.name} ({formatInr(service.basePrice)})
        </li>
        {addOns.length > 0 ? (
          <li>
            <strong>Add-ons:</strong>{" "}
            {addOns.map((a) => `${a.name} (${formatInr(a.basePrice)})`).join(", ")}
          </li>
        ) : null}
        <li>
          <strong>Address:</strong> {address}
        </li>
        <li>
          <strong>Vehicle:</strong> {vehicleLabel}
        </li>
        {scheduledDate && scheduledTimeSlot ? (
          <li>
            <strong>When:</strong> {scheduledDate} · {scheduledTimeSlot}
          </li>
        ) : null}
        <li>
          <strong>Subtotal:</strong> {formatInr(subtotal)}
          {couponDiscount ? (
            <span className="text-eco"> (−{formatInr(couponDiscount)} coupon)</span>
          ) : null}
          {walletDeduction > 0 ? (
            <span className="text-eco"> (−{formatInr(walletDeduction)} Woosh Coins)</span>
          ) : null}
        </li>
        <li className="font-semibold text-foreground">
          <strong>Total:</strong> {formatInr(total)}
        </li>
      </ul>

      <div className="flex gap-2">
        <input
          value={couponCode}
          onChange={(e) => onCouponCodeChange(e.target.value)}
          placeholder="Coupon code (optional)"
          className="focus-ring flex-1 rounded-2xl border border-black/12 px-4 py-3"
        />
        <Button variant="secondary" onClick={onApplyCoupon} disabled={submitting}>
          Apply
        </Button>
      </div>

      {walletBalance > 0 ? (
        <label
          className="flex cursor-pointer items-center gap-3 rounded-2xl border border-black/12 px-4 py-3"
          data-testid="booking-wallet-toggle"
        >
          <input
            type="checkbox"
            checked={useWallet}
            onChange={(e) => onUseWalletChange(e.target.checked)}
            className="h-4 w-4 accent-cyan"
          />
          <span className="text-sm">
            Use Woosh Coins ({formatInr(walletBalance)} available)
          </span>
        </label>
      ) : null}

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <div className="flex gap-3">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onConfirm} disabled={submitting} className="flex-1">
          {submitting ? "Placing order…" : "Confirm booking"}
        </Button>
      </div>
    </div>
  );
}
