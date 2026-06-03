"use client";

import { AppDownloadButtons } from "@/components/ui/AppDownloadButtons";
import { brand } from "@/lib/brand";
import { formatBuildLabel } from "@/lib/build-info";
import { useSectionNav } from "@/hooks/useSectionNav";
import { Facebook, Instagram } from "lucide-react";
import Image from "next/image";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Footer() {
  const { goToSection } = useSectionNav();

  return (
    <footer className="border-t border-black/8 bg-background-muted py-12">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4 lg:col-span-2">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/brand/logo.jpeg"
              alt="Woosh logo"
              width={48}
              height={48}
              className="rounded-xl"
            />
            <div>
              <p className="font-bold text-foreground">{brand.name}</p>
              <p className="text-sm text-cyan">{brand.tagline}</p>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            {brand.motto} Premium doorstep vehicle care for cars, bikes, autos, and more.
          </p>
          <AppDownloadButtons size="sm" />
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-foreground/80">
            Quick Links
          </h3>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => goToSection("#contact")}
              className="focus-ring w-fit text-sm text-muted transition hover:text-cyan"
            >
              Contact Us
            </button>
            <button
              type="button"
              onClick={() => goToSection("#blogs")}
              className="focus-ring w-fit text-sm text-muted transition hover:text-cyan"
            >
              Blogs
            </button>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-foreground/80">
            Follow Woosh
          </h3>
          <div className="flex gap-3">
            {[
              { label: "X", href: "#", Icon: XIcon },
              { label: "Facebook", href: "#", Icon: Facebook },
              { label: "Instagram", href: "#", Icon: Instagram },
            ].map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="focus-ring inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-black/10 p-3 text-muted transition hover:border-cyan/40 hover:text-cyan"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-black/8 px-4 pt-6 text-center text-sm text-muted sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Woosh. All rights reserved.</p>
        <p className="mt-2 text-xs text-muted/70" aria-label="Site build version">
          {formatBuildLabel()}
        </p>
      </div>
    </footer>
  );
}
