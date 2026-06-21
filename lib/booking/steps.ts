import { getSlugBookingConfig } from "@/lib/api/mappers";
import type { ServiceSlug } from "@/lib/services";

export type BookingFlowStep =
  | "service"
  | "addons"
  | "vehicle"
  | "address"
  | "schedule"
  | "review";

export type BookingWizardStep = BookingFlowStep | "loading" | "success" | "error";

export function getFlowSteps(slug: ServiceSlug): BookingFlowStep[] {
  const config = getSlugBookingConfig(slug);
  if (config.packageType === "Membership") {
    return ["service", "vehicle", "address", "review"];
  }
  return ["service", "addons", "vehicle", "address", "schedule", "review"];
}

export function getStepLabel(step: BookingFlowStep): string {
  const labels: Record<BookingFlowStep, string> = {
    service: "Service",
    addons: "Add-ons",
    vehicle: "Vehicle",
    address: "Address",
    schedule: "Schedule",
    review: "Review",
  };
  return labels[step];
}

export function getNextStep(slug: ServiceSlug, current: BookingFlowStep): BookingFlowStep | "success" {
  const steps = getFlowSteps(slug);
  const index = steps.indexOf(current);
  if (index < 0 || index >= steps.length - 1) return "success";
  return steps[index + 1];
}

export function getPreviousStep(slug: ServiceSlug, current: BookingFlowStep): BookingFlowStep | null {
  const steps = getFlowSteps(slug);
  const index = steps.indexOf(current);
  if (index <= 0) return null;
  return steps[index - 1];
}
