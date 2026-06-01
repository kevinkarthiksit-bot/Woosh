/** Trust content — enable slots only when real data is provided (no fake stats). */

export interface TrustMetric {
  id: string;
  label: string;
  value: string;
  enabled: boolean;
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
  { id: "washes", label: "Washes completed", value: "—", enabled: false },
  { id: "cities", label: "Cities served", value: "—", enabled: false },
  { id: "rating", label: "Average rating", value: "—", enabled: false },
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
