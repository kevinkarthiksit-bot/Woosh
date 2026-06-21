import { Button } from "@/components/ui/Button";
import { formatInr } from "@/lib/api/mappers";
import type { ApiService } from "@/lib/api/types";
import { cn } from "@/lib/utils";

interface AddOnsStepProps {
  addOns: ApiService[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  onBack: () => void;
  onContinue: () => void;
  error?: string;
  loading?: boolean;
}

export function AddOnsStep({
  addOns,
  selectedIds,
  onToggle,
  onBack,
  onContinue,
  error,
  loading,
}: AddOnsStepProps) {
  if (loading) {
    return <p className="text-muted">Loading add-ons…</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="font-display text-h3 text-foreground">Add extras</h2>
      <p className="text-sm text-muted">Optional upgrades for your wash.</p>
      {addOns.length === 0 ? (
        <p className="text-sm text-muted">No add-ons available right now. You can continue.</p>
      ) : (
        <ul className="space-y-2">
          {addOns.map((addOn) => {
            const checked = selectedIds.includes(addOn._id);
            return (
              <li key={addOn._id}>
                <label
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3",
                    checked ? "border-cyan bg-cyan/5" : "border-black/12",
                  )}
                  data-testid={`booking-addon-${addOn._id}`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle(addOn._id)}
                    className="h-4 w-4 accent-cyan"
                  />
                  <span className="flex-1 text-sm font-medium text-foreground">{addOn.name}</span>
                  <span className="text-sm font-semibold text-cyan">+{formatInr(addOn.basePrice)}</span>
                </label>
              </li>
            );
          })}
        </ul>
      )}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <div className="flex gap-3">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onContinue} className="flex-1" data-testid="booking-addons-continue">
          Continue
        </Button>
      </div>
    </div>
  );
}
