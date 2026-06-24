import { Button } from "@/components/ui/Button";
import type { ApiAvailableSlot } from "@/lib/api/types";
import { cn } from "@/lib/utils";

interface ScheduleStepProps {
  scheduledDate: string;
  scheduledTimeSlot: string;
  availableSlots: ApiAvailableSlot[];
  fallbackToAllTimes: boolean;
  onDateChange: (value: string) => void;
  onSlotChange: (time: string) => void;
  onBack: () => void;
  onContinue: () => void;
  error?: string;
  loading?: boolean;
}

export function ScheduleStep({
  scheduledDate,
  scheduledTimeSlot,
  availableSlots,
  fallbackToAllTimes,
  onDateChange,
  onSlotChange,
  onBack,
  onContinue,
  error,
  loading,
}: ScheduleStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-h3 text-foreground">Pick a slot</h2>
      <p className="text-sm text-muted">
        Choose an available visit window. Your booking is placed only after the review step.
      </p>
      {fallbackToAllTimes ? (
        <p className="rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800">
          Showing all time slots — live availability could not be loaded.
        </p>
      ) : null}
      <label className="block">
        <span className="mb-2 block text-sm font-medium">Date</span>
        <input
          type="date"
          data-testid="booking-schedule-date"
          value={scheduledDate}
          min={new Date().toISOString().slice(0, 10)}
          onChange={(e) => onDateChange(e.target.value)}
          className="focus-ring w-full rounded-2xl border border-black/12 px-4 py-3"
        />
      </label>
      {loading ? (
        <p className="text-sm text-muted">Loading available slots…</p>
      ) : scheduledDate ? (
        <div>
          <span className="mb-2 block text-sm font-medium">Available times</span>
          {availableSlots.length === 0 ? (
            <p className="text-sm text-muted">No slots available for this date. Try another day.</p>
          ) : (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {availableSlots.map((slot) => {
                const selected = scheduledTimeSlot === slot.time;
                return (
                  <button
                    key={slot.id + slot.time}
                    type="button"
                    data-testid={`booking-slot-${slot.order ?? slot.time}`}
                    onClick={() => onSlotChange(slot.time)}
                    className={cn(
                      "focus-ring rounded-xl border px-3 py-2 text-sm font-medium",
                      selected
                        ? "border-cyan bg-cyan text-white"
                        : "border-black/12 hover:border-cyan/40",
                    )}
                  >
                    {slot.time}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ) : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <div className="flex gap-3">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={onContinue}
          className="flex-1"
          data-testid="booking-schedule-continue"
          disabled={!scheduledDate || !scheduledTimeSlot}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
