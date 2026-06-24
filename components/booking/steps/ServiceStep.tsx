import { Button } from "@/components/ui/Button";
import { formatInr } from "@/lib/api/mappers";
import type { ApiService } from "@/lib/api/types";
import { cn } from "@/lib/utils";

interface ServiceStepProps {
  services: ApiService[];
  selectedId: string | null;
  onSelect: (service: ApiService) => void;
  onContinue: () => void;
  error?: string;
  loading?: boolean;
}

export function ServiceStep({
  services,
  selectedId,
  onSelect,
  onContinue,
  error,
  loading,
}: ServiceStepProps) {
  if (loading) {
    return <p className="text-muted">Loading services…</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="font-display text-h3 text-foreground">Choose your service</h2>
      <p className="text-sm text-muted">
        Prices are shown upfront. You can review add-ons, wallet deductions, and the final total before confirming.
      </p>
      <ul className="grid gap-3">
        {services.map((service) => {
          const selected = selectedId === service._id;
          return (
            <li key={service._id}>
              <button
                type="button"
                data-testid={`booking-service-${service._id}`}
                onClick={() => onSelect(service)}
                className={cn(
                  "focus-ring w-full rounded-2xl border p-4 text-left transition-colors",
                  selected
                    ? "border-cyan bg-cyan/5 ring-2 ring-cyan/30"
                    : "border-black/12 bg-white hover:border-cyan/40",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground">{service.name}</p>
                    {service.description ? (
                      <p className="mt-1 text-sm text-muted line-clamp-2">{service.description}</p>
                    ) : null}
                    {service.duration ? (
                      <p className="mt-2 text-xs text-muted">~{service.duration} min</p>
                    ) : null}
                  </div>
                  <p className="shrink-0 font-semibold text-cyan">{formatInr(service.basePrice)}</p>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <Button
        onClick={onContinue}
        className="w-full"
        disabled={!selectedId}
        data-testid="booking-service-continue"
      >
        Continue
      </Button>
    </div>
  );
}
