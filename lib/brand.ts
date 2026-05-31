export const brand = {
  name: "Woosh",
  tagline: "Doorstep Vehicle Care",
  motto: "Clean. Fast. Smart.",
  colors: {
    charcoal: "#050A18",
    navy: "#0A1628",
    cyan: "#00BFFF",
    blue: "#0070FF",
    gold: "#D4AF37",
    eco: "#22C55E",
    surface: "#F8FAFC",
    white: "#FFFFFF",
  },
  appLinks: {
    ios: "#",
    android: "#",
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
