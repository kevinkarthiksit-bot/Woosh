import { getFlowSteps, getStepLabel, type BookingFlowStep } from "@/lib/booking/steps";
import type { ServiceSlug } from "@/lib/services";
import { cn } from "@/lib/utils";

interface BookingStepperProps {
  slug: ServiceSlug;
  currentStep: BookingFlowStep;
}

export function BookingStepper({ slug, currentStep }: BookingStepperProps) {
  const steps = getFlowSteps(slug);
  const currentIndex = steps.indexOf(currentStep);

  return (
    <nav aria-label="Booking progress" className="overflow-x-auto pb-1">
      <ol className="flex min-w-max gap-2">
        {steps.map((step, index) => {
          const isActive = step === currentStep;
          const isComplete = index < currentIndex;
          return (
            <li
              key={step}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                isActive && "bg-cyan text-white",
                isComplete && !isActive && "bg-cyan/15 text-cyan",
                !isActive && !isComplete && "bg-black/5 text-muted",
              )}
            >
              {index + 1}. {getStepLabel(step)}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
