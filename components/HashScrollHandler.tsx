"use client";

import { scrollToSection } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Scroll to hash target after client navigation to the home page. */
export function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const hash = window.location.hash;
    if (!hash) return;

    const scroll = () => {
      if (!scrollToSection(hash)) {
        window.setTimeout(() => scrollToSection(hash), 50);
      }
    };

    requestAnimationFrame(scroll);
  }, [pathname]);

  return null;
}
