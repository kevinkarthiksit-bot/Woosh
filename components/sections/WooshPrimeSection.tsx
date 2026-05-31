"use client";

import { useAuthModal } from "@/components/providers/AuthModalProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Crown } from "lucide-react";
import Image from "next/image";

export function WooshPrimeSection() {
  const { openAuthModal } = useAuthModal();

  return (
    <section className="relative overflow-hidden border-y border-gold/20">
      <div className="absolute inset-0">
        <Image
          src="/assets/testimonials/prime-poster.jpg"
          alt=""
          fill
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/95 to-charcoal/70" />
      </div>

      <Container className="relative section-padding">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm font-semibold text-gold">
              <Crown className="h-4 w-4" />
              Woosh Prime
            </div>
            <h2 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              Luxury care at your <span className="text-gold">doorstep</span>
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-white/75">
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
                <li key={item} className="flex items-center gap-2 text-sm text-white/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
            <Button onClick={openAuthModal} className="bg-gradient-to-r from-gold to-yellow-300 text-charcoal hover:scale-[1.02]">
              Book Prime Experience
            </Button>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-gold/25 shadow-[0_0_40px_rgba(212,175,55,0.15)]">
            <div className="relative aspect-[4/5] min-h-[360px]">
              <Image
                src="/assets/testimonials/prime-poster.jpg"
                alt="Woosh Prime premium vehicle care"
                fill
                className="object-cover"
                sizes="500px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                  Priority Service
                </p>
                <p className="mt-2 text-2xl font-bold text-white">Just for you</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
