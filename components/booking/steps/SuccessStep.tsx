import { Button } from "@/components/ui/Button";

interface SuccessStepProps {
  serviceTitle: string;
  orderNumber: string;
  onViewOrders: () => void;
  onGoHome: () => void;
}

export function SuccessStep({
  serviceTitle,
  orderNumber,
  onViewOrders,
  onGoHome,
}: SuccessStepProps) {
  return (
    <div
      className="space-y-4 rounded-2xl border border-black/8 bg-white p-6 shadow-card"
      data-testid="booking-success"
    >
      <h2 className="font-display text-h2 text-foreground">Booking received</h2>
      <p className="text-body-lg text-muted">
        Your {serviceTitle} request is in. Order ref:{" "}
        <span className="font-semibold text-foreground">{orderNumber}</span>
      </p>
      <div className="flex flex-wrap gap-3">
        <Button onClick={onViewOrders}>Go to my account</Button>
        <Button variant="secondary" onClick={onGoHome}>
          Back home
        </Button>
      </div>
    </div>
  );
}
