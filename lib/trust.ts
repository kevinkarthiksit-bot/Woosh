/** Trust content — proof points only, no fabricated volume or rating claims. */

export interface TrustMetric {
  id: string;
  label: string;
  value: string;
  enabled: boolean;
  description?: string;
}

export interface TrustTestimonial {
  id: string;
  quote: string;
  name: string;
  vehicle: string;
  poster: string;
  enabled: boolean;
}

export const trustMetrics: TrustMetric[] = [
  {
    id: "doorstep",
    label: "Doorstep service",
    value: "No queues",
    description: "Choose a slot and Woosh comes to your parking spot.",
    enabled: true,
  },
  {
    id: "pricing",
    label: "Transparent pricing",
    value: "Upfront",
    description: "See services, add-ons, coupons, and Woosh Coins before you confirm.",
    enabled: true,
  },
  {
    id: "tracking",
    label: "Account-ready care",
    value: "Trackable",
    description: "Orders, vehicles, wallet, and referrals live in your Woosh account.",
    enabled: true,
  },
];

export const trustTestimonials: TrustTestimonial[] = [
  {
    id: "placeholder-1",
    quote: "Customer stories will appear here once video testimonials are ready.",
    name: "Coming soon",
    vehicle: "Woosh customer",
    poster: "/assets/testimonials/placeholder-1.jpg",
    enabled: false,
  },
];

export const hasLiveTrustContent =
  trustMetrics.some((m) => m.enabled) || trustTestimonials.some((t) => t.enabled);
