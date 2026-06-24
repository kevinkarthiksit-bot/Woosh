"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { useAuthModal } from "@/components/providers/AuthModalProvider";
import { Button } from "@/components/ui/Button";
import { useSectionNav } from "@/hooks/useSectionNav";
import { navLinks } from "@/lib/brand";
import { isSiteLive } from "@/lib/build-info";
import { cn } from "@/lib/utils";
import { LogOut, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Navbar() {
  const router = useRouter();
  const { openAuthModal } = useAuthModal();
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const { goToSection, isHome } = useSectionNav();
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
    goToSection(href);
  };

  const handleBook = () => {
    if (authLoading) return;
    setMobileOpen(false);
    const bookPath = "/services/car-wash-and-care/book";
    if (!isAuthenticated) {
      openAuthModal(bookPath);
      return;
    }
    router.push(bookPath);
  };

  const displayName = user?.name || (user?.phone ? `+91 ${user.phone}` : "Account");

  return (
    <header
      className={cn(
        "fixed inset-x-0 z-50 transition-all duration-300",
        isSiteLive ? "top-0" : "top-10",
        scrolled ? "glass-panel border-b border-black/8 py-2.5 shadow-card" : "bg-transparent py-4",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={isHome ? "#home" : "/#home"}
          className="focus-ring group flex items-center gap-3 rounded-xl"
          onClick={(event) => {
            event.preventDefault();
            handleNavClick("#home");
          }}
        >
          <span className="relative flex shrink-0 items-center justify-center rounded-2xl bg-white/80 p-1 ring-1 ring-black/8 transition group-hover:ring-cyan/40 group-hover:shadow-card xl:hidden">
            <Image
              src="/assets/brand/logo.jpeg"
              alt="Woosh logo"
              width={52}
              height={52}
              className="rounded-xl"
              priority
            />
          </span>
          <span className="relative hidden shrink-0 items-center justify-center rounded-2xl bg-white/80 p-1.5 ring-1 ring-black/8 transition group-hover:ring-cyan/30 group-hover:shadow-card xl:flex">
            <Image
              src="/assets/brand/logo-full.jpeg"
              alt="Woosh"
              width={188}
              height={56}
              className="h-12 w-auto max-w-[200px] rounded-lg object-contain"
              priority
            />
          </span>
          <div className="hidden sm:block xl:hidden">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-foreground">Woosh</p>
            <p className="text-caption font-medium text-cyan">Doorstep Vehicle Care</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={isHome ? link.href : link.href === "#home" ? "/" : `/${link.href}`}
              onClick={(event) => {
                event.preventDefault();
                handleNavClick(link.href);
              }}
              className="focus-ring text-sm font-medium text-foreground/75 transition hover:text-cyan"
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <Link href="/account" className="focus-ring text-sm font-medium text-foreground/75 hover:text-cyan">
              My account
            </Link>
          ) : null}
          <Button onClick={handleBook} className="min-h-[40px] px-5 py-2">
            Book a wash
          </Button>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {isAuthenticated ? (
            <>
              <span className="hidden max-w-[140px] truncate text-sm font-medium text-foreground/80 sm:inline">
                {displayName}
              </span>
              <button
                type="button"
                onClick={logout}
                className="focus-ring hidden min-h-[44px] items-center gap-1.5 rounded-full border border-black/10 px-3 text-sm text-muted hover:text-foreground sm:inline-flex"
                aria-label="Log out"
              >
                <LogOut className="h-4 w-4" />
                Log out
              </button>
            </>
          ) : (
            <Button onClick={() => openAuthModal()} className="hidden sm:inline-flex">
              Sign in / Sign up
            </Button>
          )}
          <button
            type="button"
            className="focus-ring flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-black/10 p-2 text-foreground xl:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="glass-panel border-t border-black/8 xl:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6" aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={isHome ? link.href : link.href === "#home" ? "/" : `/${link.href}`}
                onClick={(event) => {
                  event.preventDefault();
                  handleNavClick(link.href);
                }}
                className="focus-ring min-h-[44px] rounded-xl px-3 py-3 text-sm font-medium text-foreground/80 hover:bg-black/5 hover:text-cyan"
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link
                  href="/account"
                  onClick={() => setMobileOpen(false)}
                  className="focus-ring min-h-[44px] rounded-xl px-3 py-3 text-sm font-medium text-foreground/80 hover:bg-black/5 hover:text-cyan"
                >
                  My account
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="focus-ring min-h-[44px] rounded-xl px-3 py-3 text-left text-sm font-medium text-muted hover:bg-black/5"
                >
                  Log out
                </button>
              </>
            ) : (
              <Button onClick={() => openAuthModal()} className="mt-2 w-full sm:hidden">
                Sign in / Sign up
              </Button>
            )}
            <Button onClick={handleBook} className="mt-2 w-full">
              Book a wash
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
