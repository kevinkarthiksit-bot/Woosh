import { twMerge } from "tailwind-merge";

export function cn(...classes: Array<string | false | null | undefined>) {
  return twMerge(classes.filter(Boolean).join(" "));
}

export function scrollToSection(id: string): boolean {
  const element = document.getElementById(id.replace(/^#/, ""));
  if (!element) return false;

  const behavior = prefersReducedMotion() ? "auto" : "smooth";
  element.scrollIntoView({ behavior, block: "start" });
  return true;
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
