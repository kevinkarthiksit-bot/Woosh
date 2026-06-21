import type { CreateOrderPayload, ApiOrderItem } from "@/lib/api/types";
import type { ServiceSlug } from "@/lib/services";

export interface SlugBookingConfig {
  category: string;
  vehicleType: string;
  packageType: ApiOrderItem["packageType"];
  packageTimes: number;
  /** Optional keyword to pick the right service when multiple match category */
  nameIncludes?: string;
}

export const SLUG_BOOKING_CONFIG: Record<ServiceSlug, SlugBookingConfig> = {
  "car-wash-and-care": {
    category: "CarWash",
    vehicleType: "Car",
    packageType: "OneTime",
    packageTimes: 1,
  },
  "bike-wash-and-care": {
    category: "BikeWash",
    vehicleType: "Bike",
    packageType: "OneTime",
    packageTimes: 1,
  },
  "auto-wash-and-care": {
    category: "AutoWash",
    vehicleType: "Auto",
    packageType: "OneTime",
    packageTimes: 1,
  },
  "monthly-packages": {
    category: "Membership",
    vehicleType: "Car",
    packageType: "Membership",
    packageTimes: 1,
  },
  "daily-cleaning-services": {
    category: "CarWash",
    vehicleType: "Car",
    packageType: "OneTime",
    packageTimes: 1,
    nameIncludes: "daily",
  },
};

export function getSlugBookingConfig(slug: ServiceSlug): SlugBookingConfig {
  return SLUG_BOOKING_CONFIG[slug];
}

export function slugToApiCategory(slug: ServiceSlug): string {
  return SLUG_BOOKING_CONFIG[slug].category;
}

export function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export interface BuildOrderInput {
  slug: ServiceSlug;
  serviceId: string;
  address: string;
  vehicleModel: string;
  phone: string;
  name?: string;
  scheduledDate?: string;
  scheduledTimeSlot?: string;
  couponCode?: string;
  addOnIds?: string[];
  walletUsedAmount?: number;
}

export function computeSubtotal(
  service: { basePrice: number },
  addOns: Array<{ basePrice: number }>,
): number {
  return service.basePrice + addOns.reduce((sum, addOn) => sum + addOn.basePrice, 0);
}

export function computeWalletDeduction(
  walletBalance: number,
  amountAfterCoupon: number,
  useWallet: boolean,
): number {
  if (!useWallet || walletBalance <= 0 || amountAfterCoupon <= 0) return 0;
  return Math.min(walletBalance, amountAfterCoupon);
}

export function buildOneTimeOrderPayload(input: BuildOrderInput): CreateOrderPayload {
  const config = getSlugBookingConfig(input.slug);

  const item: ApiOrderItem = {
    serviceId: input.serviceId,
    addOnIds: input.addOnIds ?? [],
    packageType: config.packageType,
    packageTimes: config.packageTimes,
  };

  if (config.packageType === "OneTime") {
    item.scheduledDate = input.scheduledDate;
    item.scheduledTimeSlot = input.scheduledTimeSlot;
  }

  return {
    items: [item],
    customer: {
      name: input.name,
      phone: input.phone,
      address: input.address,
      vehicleType: config.vehicleType,
      vehicleModel: input.vehicleModel,
    },
    couponCode: input.couponCode || undefined,
    walletUsedAmount: input.walletUsedAmount ?? 0,
  };
}

export function buildMembershipOrderPayload(input: BuildOrderInput): CreateOrderPayload {
  const config = getSlugBookingConfig(input.slug);
  return {
    items: [
      {
        serviceId: input.serviceId,
        addOnIds: input.addOnIds ?? [],
        packageType: "Membership",
        packageTimes: 1,
      },
    ],
    customer: {
      name: input.name,
      phone: input.phone,
      address: input.address,
      vehicleType: config.vehicleType,
      vehicleModel: input.vehicleModel,
    },
    walletUsedAmount: input.walletUsedAmount ?? 0,
  };
}

export function buildOrderPayload(input: BuildOrderInput): CreateOrderPayload {
  const config = getSlugBookingConfig(input.slug);
  if (config.packageType === "Membership") {
    return buildMembershipOrderPayload(input);
  }
  return buildOneTimeOrderPayload(input);
}

export function pickServiceForSlug<
  T extends { _id: string; name: string; category: string; basePrice: number },
>(slug: ServiceSlug, services: T[]): T | undefined {
  const config = getSlugBookingConfig(slug);
  const inCategory = services.filter((s) => s.category === config.category);
  if (config.nameIncludes) {
    const match = inCategory.find((s) =>
      s.name.toLowerCase().includes(config.nameIncludes!.toLowerCase()),
    );
    if (match) return match;
  }
  return inCategory[0] ?? services[0];
}
