import { Button } from "@/components/ui/Button";
import type { ApiVehicle } from "@/lib/api/types";
import { cn } from "@/lib/utils";

interface VehicleStepProps {
  vehicles: ApiVehicle[];
  selectedVehicleId: string | null;
  newVehicleModel: string;
  vehicleType: string;
  onSelectVehicle: (vehicle: ApiVehicle) => void;
  onNewVehicleModelChange: (value: string) => void;
  onAddVehicle: () => void;
  onBack: () => void;
  onContinue: () => void;
  error?: string;
  loading?: boolean;
  saving?: boolean;
}

export function VehicleStep({
  vehicles,
  selectedVehicleId,
  newVehicleModel,
  vehicleType,
  onSelectVehicle,
  onNewVehicleModelChange,
  onAddVehicle,
  onBack,
  onContinue,
  error,
  loading,
  saving,
}: VehicleStepProps) {
  if (loading) {
    return <p className="text-muted">Loading your vehicles…</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="font-display text-h3 text-foreground">Select vehicle</h2>
      {vehicles.length > 0 ? (
        <ul className="space-y-2">
          {vehicles.map((vehicle) => {
            const selected = selectedVehicleId === vehicle._id;
            return (
              <li key={vehicle._id}>
                <button
                  type="button"
                  data-testid={`booking-vehicle-${vehicle._id}`}
                  onClick={() => onSelectVehicle(vehicle)}
                  className={cn(
                    "focus-ring w-full rounded-2xl border px-4 py-3 text-left",
                    selected
                      ? "border-cyan bg-cyan/5 ring-2 ring-cyan/30"
                      : "border-black/12 hover:border-cyan/40",
                  )}
                >
                  <p className="font-medium text-foreground">{vehicle.vehicleModel}</p>
                  <p className="text-xs text-muted">{vehicle.vehicleType}</p>
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-sm text-muted">No saved vehicles yet. Add one below.</p>
      )}

      <div className="rounded-2xl border border-black/8 bg-background-muted p-4">
        <p className="mb-2 text-sm font-medium text-foreground">Add {vehicleType.toLowerCase()}</p>
        <div className="flex gap-2">
          <input
            data-testid="booking-vehicle-new"
            value={newVehicleModel}
            onChange={(e) => onNewVehicleModelChange(e.target.value)}
            className="focus-ring flex-1 rounded-2xl border border-black/12 px-4 py-3"
            placeholder="e.g. Swift, Activa"
          />
          <Button variant="secondary" onClick={onAddVehicle} disabled={saving}>
            {saving ? "Saving…" : "Add"}
          </Button>
        </div>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <div className="flex gap-3">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={onContinue}
          className="flex-1"
          data-testid="booking-vehicle-continue"
          disabled={!selectedVehicleId && !newVehicleModel.trim()}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
