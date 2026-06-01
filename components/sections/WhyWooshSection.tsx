"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whyWooshCards } from "@/lib/services";
import { cn } from "@/lib/utils";
import {
  BadgeCheck,
  Headphones,
  Leaf,
  MapPin,
  Receipt,
  Sparkles,
  Users,
} from "lucide-react";
import Image from "next/image";

const iconMap = {
  users: Users,
  leaf: Leaf,
  "map-pin": MapPin,
  "badge-check": BadgeCheck,
  sparkles: Sparkles,
  receipt: Receipt,
  headphones: Headphones,
};

export function WhyWooshSection() {
  return (
    <section id="why-woosh" className="section-padding">
      <Container>
        <SectionHeading
          eyebrow="Why Choose Woosh"
          title="Built for premium doorstep vehicle care"
          highlight="premium"
          subtitle="Every detail is designed to deliver trust, convenience, and a consistently exceptional experience."
        />

        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-navy/30">
            <div className="relative aspect-[16/10] min-h-[240px] w-full lg:sticky lg:top-28 lg:aspect-[4/3] lg:min-h-[320px]">
              <Image
                src="/assets/services/power-clean-car.jpg"
                alt="Professional Woosh car cleaning"
                fill
                className="object-cover object-[50%_42%]"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/25 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan">
                  Trained Professionals
                </p>
                <p className="mt-2 text-xl font-bold text-white sm:text-2xl">
                  Premium care. Powerful clean.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {whyWooshCards.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap];
              const isEco = item.accent === "eco";

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/8 bg-navy/40 p-5 transition hover:border-cyan/25 hover:bg-navy/60"
                >
                  <div
                    className={cn(
                      "mb-3 inline-flex rounded-xl p-2.5",
                      isEco ? "bg-eco/15 text-eco" : "bg-cyan/15 text-cyan",
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-white/70">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
