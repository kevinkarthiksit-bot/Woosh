export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function scrollToSection(id: string) {
  const element = document.getElementById(id.replace(/^#/, ""));
  element?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
