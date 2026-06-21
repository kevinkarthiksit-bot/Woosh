import { Button } from "@/components/ui/Button";

interface AddressStepProps {
  address: string;
  onAddressChange: (value: string) => void;
  onBack: () => void;
  onContinue: () => void;
  error?: string;
}

export function AddressStep({
  address,
  onAddressChange,
  onBack,
  onContinue,
  error,
}: AddressStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-h3 text-foreground">Service address</h2>
      <label className="block">
        <span className="mb-2 block text-sm font-medium">Where should Woosh visit?</span>
        <textarea
          data-testid="booking-address"
          value={address}
          onChange={(e) => onAddressChange(e.target.value)}
          rows={3}
          className="focus-ring w-full rounded-2xl border border-black/12 px-4 py-3"
          placeholder="Full address where Woosh should visit"
        />
      </label>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <div className="flex gap-3">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onContinue} className="flex-1" data-testid="booking-address-continue">
          Continue
        </Button>
      </div>
    </div>
  );
}
