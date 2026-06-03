"use client";

import { useAuthModal } from "@/components/providers/AuthModalProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WooshIllustration } from "@/components/ui/WooshIllustration";
import { Crown } from "lucide-react";
import Image from "next/image";

export function WooshPrimeSection() {
  const { openAuthModal } = useAuthModal();

  return (
    <section className="relative overflow-hidden border-y border-gold/20 bg-background-warm">
      <Container className="relative section-padding">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm font-semibold text-gold">
              <Crown className="h-4 w-4" aria-hidden />
              Woosh Prime
              <WooshIllustration name="doorstep-pin" width={24} height={32} className="opacity-70" />
            </div>
            <h2 className="font-display text-h2 text-foreground sm:text-4xl lg:text-5xl">
              Luxury care at your <span className="text-gold">doorstep</span>
            </h2>
            <p className="max-w-xl text-body-lg text-muted">
              Priority booking, premium products, and showroom finishes — reserved for members who
              expect the best every time.
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                "Priority booking slots",
                "Showroom finish every visit",
                "Premium product line",
                "Dedicated priority support",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-foreground/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
            <Button
              onClick={openAuthModal}
              className="bg-gradient-to-r from-gold to-yellow-300 text-foreground hover:scale-[1.02]"
            >
              Book Prime Experience
            </Button>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-gold/20 bg-white shadow-card">
            <div className="relative aspect-[16/10] w-full sm:aspect-[3/2]">
              <Image
                src="/assets/testimonials/prime-poster.jpg"
                alt="Woosh Prime premium vehicle care"
                fill
                className="object-contain object-center p-1 sm:object-cover sm:object-[center_45%] sm:p-0"
                sizes="(max-width: 1024px) 100vw, 520px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1d1d1f]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                  Priority Service
                </p>
                <p className="mt-2 text-xl font-bold text-white sm:text-2xl">Just for you</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
