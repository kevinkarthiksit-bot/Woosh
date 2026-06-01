"use client";

import { scrollToSection } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

export function useSectionNav() {
  const pathname = usePathname();

  const goToSection = useCallback(
    (href: string) => {
      if (!href.startsWith("#")) return;

      if (pathname === "/") {
        scrollToSection(href);
        return;
      }

      // Full navigation — reliable with output: "export" and hash targets on the home page.
      const target = href === "#home" ? "/" : `/${href}`;
      window.location.assign(target);
    },
    [pathname],
  );

  return { goToSection, isHome: pathname === "/" };
}
