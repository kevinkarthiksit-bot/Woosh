import type { Transition, Variants } from "framer-motion";

export const motionDurations = {
  fast: 0.25,
  base: 0.35,
  section: 0.5,
  hero: 0.55,
} as const;

export const motionEase = [0.22, 1, 0.36, 1] as const;

export const defaultTransition: Transition = {
  duration: motionDurations.base,
  ease: motionEase,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionDurations.base, ease: motionEase },
  },
};

export const heroText: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionDurations.hero, ease: motionEase },
  },
  exit: { opacity: 0, y: -12, transition: { duration: motionDurations.fast } },
};
