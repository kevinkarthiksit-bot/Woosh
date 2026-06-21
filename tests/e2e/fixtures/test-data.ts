import type { ServiceSlug } from "@/lib/services";

export const serviceSlugs: ServiceSlug[] = [
  "car-wash-and-care",
  "bike-wash-and-care",
  "auto-wash-and-care",
  "monthly-packages",
  "daily-cleaning-services",
];

export const CI_TEST_ADDRESS = "WOOSH_CI_TEST e2e booking address";

export function tomorrowDateString(): string {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString().slice(0, 10);
}
