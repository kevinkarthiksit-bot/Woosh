export const brand = {
  name: "Woosh",
  tagline: "Doorstep Vehicle Care",
  motto: "Clean. Fast. Smart.",
  colors: {
    background: "#FFFFFF",
    backgroundMuted: "#F5F5F7",
    backgroundWarm: "#FAF8F0",
    foreground: "#1D1D1F",
    muted: "#6E6E73",
    charcoal: "#1D1D1F",
    navy: "#F5F5F7",
    cyan: "#00BFFF",
    blue: "#0070FF",
    gold: "#D4AF37",
    eco: "#22C55E",
    surface: "#FFFFFF",
    white: "#FFFFFF",
  },
  appLinks: {
    ios: "#",
    android: "#",
  },
  /** When false, store badges show "Coming soon" and links are disabled */
  appsLive: false,
  badgeAssets: {
    appStore: "/assets/badges/app-store.svg",
    googlePlay: "/assets/badges/google-play.svg",
  },
} as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Why Woosh", href: "#why-woosh" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Difference", href: "#difference" },
  { label: "Transformations", href: "#transformations" },
  { label: "Contact", href: "#contact" },
  { label: "Blogs", href: "#blogs" },
] as const;
