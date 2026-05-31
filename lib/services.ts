export type ServiceSlug =
  | "car-wash-and-care"
  | "bike-wash-and-care"
  | "auto-wash-and-care"
  | "monthly-packages"
  | "daily-cleaning-services";

export type HeroMediaType = "video" | "image";

export interface Service {
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  description: string;
  cardDescription: string;
  image: string;
  icon: string;
  /** Service detail page + Transformations carousel */
  detailVideo: string;
  /** Landing hero background — action footage or null for photo */
  heroVideo: string | null;
  heroPoster: string;
  heroMediaType: HeroMediaType;
  heroOverlay: string;
  slideLabel: string;
  heroHeadline: string;
  heroSubtext: string;
  features: string[];
  pricing?: string;
  tilePricing?: string;
  detailDescription: string;
  featured?: boolean;
  goldAccent?: boolean;
}

export const services: Service[] = [
  {
    slug: "car-wash-and-care",
    title: "Car Wash and Care",
    shortTitle: "Car Wash",
    description: "Premium foam wash, pressure clean, and showroom finish at your doorstep.",
    cardDescription: "Thick foam pre-soak, deep clean, and long-lasting shine for your car.",
    image: "/assets/services/car-wash.jpg",
    icon: "/assets/icons/car-wash.png",
    detailVideo: "/assets/videos/car-wash-and-care.mp4",
    heroVideo: "/assets/videos/hero/car-wash-action.mp4",
    heroPoster: "/assets/services/car-wash.jpg",
    heroMediaType: "video",
    heroOverlay: "from-charcoal via-charcoal/85 to-charcoal/25",
    slideLabel: "01 Car Wash",
    heroHeadline: "Pristine Shine. Every Drive.",
    heroSubtext: "Powerful foam wash and premium care delivered to your driveway.",
    features: [
      "Thick foam pre-soak",
      "High pressure deep clean",
      "Removes dirt, oil and grime",
      "Safe for paint and parts",
      "Spotless shine and protection",
    ],
    detailDescription:
      "Our car wash and care service combines professional foam pre-soak, high-pressure cleaning, and meticulous detailing for a showroom finish without you leaving home.",
    featured: true,
  },
  {
    slug: "bike-wash-and-care",
    title: "Bike Wash and Care",
    shortTitle: "Bike Wash",
    description: "Expert bike cleaning with premium products for smooth, immaculate rides.",
    cardDescription: "Power clean and quick shine treatments tailored for two-wheelers.",
    image: "/assets/services/bike-wash.jpg",
    icon: "/assets/icons/bike-wash.png",
    detailVideo: "/assets/videos/bike-wash-and-care.mp4",
    heroVideo: "/assets/videos/hero/bike-wash-action.mp4",
    heroPoster: "/assets/services/bike-wash.jpg",
    heroMediaType: "video",
    heroOverlay: "from-charcoal via-charcoal/80 to-blue/20",
    slideLabel: "02 Bike Care",
    heroHeadline: "Smooth Rides. Immaculate Care.",
    heroSubtext: "Professional bike wash and detailing that keeps every ride looking its best.",
    features: [
      "Gentle yet thorough cleaning",
      "Premium microfiber finish",
      "Chain and wheel care",
      "Paint-safe products",
      "Quick turnaround at your location",
    ],
    detailDescription:
      "From daily commuters to premium sport bikes, Woosh delivers careful cleaning and protection so your two-wheeler always looks and rides its best.",
  },
  {
    slug: "auto-wash-and-care",
    title: "Auto Wash and Care",
    shortTitle: "Auto Wash",
    description: "Clean, comfortable, and reliable care for autos and three-wheelers.",
    cardDescription: "Doorstep auto cleaning with trained professionals and transparent pricing.",
    image: "/assets/services/auto-wash.jpg",
    icon: "/assets/icons/car-wash.png",
    detailVideo: "/assets/videos/auto-wash-and-care.mp4",
    heroVideo: "/assets/videos/hero/auto-wash-action.mp4",
    heroPoster: "/assets/services/auto-wash.jpg",
    heroMediaType: "video",
    heroOverlay: "from-charcoal via-charcoal/80 to-charcoal/30",
    slideLabel: "03 Auto Wash",
    heroHeadline: "Clean. Comfortable. Always Reliable.",
    heroSubtext: "Dedicated auto wash and care that keeps your vehicle ready for every trip.",
    features: [
      "Complete exterior wash",
      "Interior dusting and wipe-down",
      "Tough stain attention",
      "Eco-conscious water usage",
      "Flexible scheduling",
    ],
    detailDescription:
      "Woosh auto wash and care is built for everyday reliability — thorough cleaning, consistent quality, and service that comes to you.",
  },
  {
    slug: "monthly-packages",
    title: "Monthly Packages",
    shortTitle: "Monthly Plans",
    description: "Save more with flexible monthly wash plans for cars and bikes.",
    cardDescription: "Best-value plans with easy booking, pause, resume, or cancel anytime.",
    image: "/assets/services/monthly-packages.jpg",
    icon: "/assets/icons/monthly-packages.png",
    detailVideo: "/assets/videos/monthly-packages.mp4",
    heroVideo: "/assets/videos/hero/monthly-hero-action.mp4",
    heroPoster: "/assets/services/monthly-packages.jpg",
    heroMediaType: "video",
    heroOverlay: "from-charcoal via-navy/80 to-blue/25",
    slideLabel: "04 Monthly Plans",
    heroHeadline: "Save More With Monthly Plans",
    heroSubtext: "8 washes from ₹1199 — flexible plans designed for regular care.",
    features: [
      "Flexible monthly plans",
      "Easy booking",
      "Pause or resume anytime",
      "Cancel anytime",
      "Best value per wash",
    ],
    pricing: "₹1199 / month (8 washes)",
    tilePricing: "₹1199 / mo",
    detailDescription:
      "Keep your vehicle consistently clean with Woosh monthly packages. Flexible scheduling, transparent pricing, and premium care every visit.",
    goldAccent: true,
  },
  {
    slug: "daily-cleaning-services",
    title: "Daily Cleaning Services",
    shortTitle: "Daily Cleaning",
    description: "Keep your car fresh every single day with quick interior care.",
    cardDescription: "Starting at ₹49/day — interior dusting, dashboard clean, and more.",
    image: "/assets/services/daily-cleaning.jpg",
    icon: "/assets/icons/monthly-packages.png",
    detailVideo: "/assets/videos/daily-cleaning-services.mp4",
    heroVideo: null,
    heroPoster: "/assets/services/daily-cleaning.jpg",
    heroMediaType: "image",
    heroOverlay: "from-charcoal via-charcoal/75 to-eco/15",
    slideLabel: "05 Daily Cleaning",
    heroHeadline: "Fresh Every Day",
    heroSubtext: "Daily interior cleaning that keeps your cabin spotless without the hassle.",
    features: [
      "Interior dusting",
      "Dashboard cleaning",
      "Door and panel wipe",
      "Trash removal",
      "Monthly plan available at ₹999",
    ],
    pricing: "From ₹49/day",
    tilePricing: "From ₹49/day",
    detailDescription:
      "Woosh daily cleaning keeps your vehicle cabin fresh with quick, reliable interior care — perfect for busy owners who want a consistently clean drive.",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export const heroSlides = services.map((service) => ({
  id: service.slug,
  headline: service.heroHeadline,
  subtext: service.heroSubtext,
  heroVideo: service.heroVideo,
  poster: service.heroPoster,
  mediaType: service.heroMediaType,
  overlay: service.heroOverlay,
  slideLabel: service.slideLabel,
  serviceTitle: service.title,
}));

export const beforeAfterPairs = [
  {
    id: "auto",
    label: "Auto Transformation",
    before: "/assets/before-after/auto-before.jpg",
    after: "/assets/before-after/auto-after.jpg",
  },
  {
    id: "car",
    label: "Car Deep Clean",
    before: "/assets/before-after/car-before.jpg",
    after: "/assets/before-after/car-after.jpg",
  },
  {
    id: "bike",
    label: "Bike Power Shine",
    before: "/assets/before-after/bike-before.jpg",
    after: "/assets/before-after/bike-after.jpg",
  },
];

export const transformationVideos = [
  {
    id: "car-wash",
    title: "Car Wash and Care",
    video: "/assets/videos/car-wash-and-care.mp4",
    poster: "/assets/services/car-wash.jpg",
  },
  {
    id: "bike-wash",
    title: "Bike Wash and Care",
    video: "/assets/videos/bike-wash-and-care.mp4",
    poster: "/assets/services/bike-wash.jpg",
  },
  {
    id: "auto-wash",
    title: "Auto Wash and Care",
    video: "/assets/videos/auto-wash-and-care.mp4",
    poster: "/assets/services/auto-wash.jpg",
  },
  {
    id: "monthly",
    title: "Monthly Packages",
    video: "/assets/videos/monthly-packages.mp4",
    poster: "/assets/services/monthly-packages.jpg",
  },
  {
    id: "daily",
    title: "Daily Cleaning",
    video: "/assets/videos/daily-cleaning-services.mp4",
    poster: "/assets/services/daily-cleaning.jpg",
  },
  {
    id: "service-1",
    title: "Woosh in Action",
    video: "/assets/videos/service-video-1.mp4",
    poster: "/assets/testimonials/car-poster.jpg",
  },
  {
    id: "app-layout",
    title: "The Woosh Experience",
    video: "/assets/videos/app-layout.mp4",
    poster: "/assets/testimonials/prime-poster.jpg",
  },
];

export const testimonials = [
  {
    id: "1",
    name: "Rahul Mehta",
    vehicle: "SUV Owner",
    quote: "Woosh transformed how I maintain my car. Professional, punctual, and spotless every time.",
    poster: "/assets/testimonials/car-poster.jpg",
  },
  {
    id: "2",
    name: "Priya Sharma",
    vehicle: "Bike Enthusiast",
    quote: "The bike wash team is incredible. My ride looks brand new after every visit.",
    poster: "/assets/testimonials/bike-poster.jpg",
  },
  {
    id: "3",
    name: "Arjun Patel",
    vehicle: "Woosh Prime Member",
    quote: "Priority booking and premium care — Woosh Prime is worth every rupee.",
    poster: "/assets/testimonials/prime-poster.jpg",
  },
  {
    id: "4",
    name: "Sneha Reddy",
    vehicle: "Daily Commuter",
    quote: "Daily cleaning keeps my cabin fresh. I never worry about mess anymore.",
    poster: "/assets/services/daily-cleaning.jpg",
  },
];

export const whyWooshCards = [
  {
    title: "Trained Professionals",
    description: "Skilled technicians deliver consistent, premium results every visit.",
    icon: "users",
  },
  {
    title: "Saves Water, Saves Planet",
    description: "Eco-conscious methods that clean thoroughly while using less water.",
    icon: "leaf",
    accent: "eco",
  },
  {
    title: "We Come To You",
    description: "Doorstep service at home, office, or wherever your vehicle is parked.",
    icon: "map-pin",
  },
  {
    title: "Satisfaction Guaranteed",
    description: "We stand behind our work with a commitment to your complete satisfaction.",
    icon: "badge-check",
  },
  {
    title: "Premium Products",
    description: "Professional-grade products safe for paint, parts, and premium finishes.",
    icon: "sparkles",
  },
  {
    title: "Transparent Pricing",
    description: "Clear plans and honest pricing with no hidden surprises.",
    icon: "receipt",
  },
  {
    title: "Dedicated Support",
    description: "Responsive support ready to help with bookings, plans, and service questions.",
    icon: "headphones",
  },
];

export const blogPosts = [
  {
    id: "1",
    title: "Why Doorstep Vehicle Care Is the Future",
    excerpt: "Discover how Woosh is changing vehicle maintenance with convenience and premium quality.",
    image: "/assets/services/car-wash.jpg",
  },
  {
    id: "2",
    title: "5 Tips to Keep Your Car Showroom Fresh",
    excerpt: "Simple habits and professional care that extend the life of your vehicle's shine.",
    image: "/assets/services/bike-wash.jpg",
  },
  {
    id: "3",
    title: "Monthly Plans vs One-Time Washes",
    excerpt: "Find the right Woosh plan for your lifestyle and save more over time.",
    image: "/assets/services/monthly-packages.jpg",
  },
];
