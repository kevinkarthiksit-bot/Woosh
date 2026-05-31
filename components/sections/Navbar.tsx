"use client";

import { Button } from "@/components/ui/Button";
import { useAuthModal } from "@/components/providers/AuthModalProvider";
import { navLinks } from "@/lib/brand";
import { cn, scrollToSection } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
  const { openAuthModal } = useAuthModal();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      scrollToSection(href);
    }
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass-panel border-b border-white/10 py-3 shadow-lg" : "bg-transparent py-5",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/#home"
          className="focus-ring flex items-center gap-3 rounded-lg"
          onClick={() => handleNavClick("#home")}
        >
          <Image
            src="/assets/brand/logo.jpeg"
            alt="Woosh logo"
            width={44}
            height={44}
            className="rounded-xl xl:hidden"
          />
          <Image
            src="/assets/brand/logo-full.jpeg"
            alt="Woosh"
            width={160}
            height={48}
            className="hidden h-10 w-auto rounded-lg xl:block"
          />
          <div className="hidden sm:block xl:hidden">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-white">Woosh</p>
            <p className="text-xs text-cyan">Doorstep Vehicle Care</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => handleNavClick(link.href)}
              className="focus-ring text-sm font-medium text-white/75 transition hover:text-cyan"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button onClick={openAuthModal} className="hidden sm:inline-flex">
            Login / Sign Up
          </Button>
          <button
            type="button"
            className="focus-ring rounded-full border border-white/10 p-2 text-white xl:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="glass-panel border-t border-white/10 xl:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6" aria-label="Mobile">
            {navLinks.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => handleNavClick(link.href)}
                className="focus-ring rounded-xl px-3 py-3 text-left text-sm font-medium text-white/80 hover:bg-white/5 hover:text-cyan"
              >
                {link.label}
              </button>
            ))}
            <Button onClick={openAuthModal} className="mt-2 w-full sm:hidden">
              Login / Sign Up
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
