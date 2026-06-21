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
    <section id="why-woosh" className="section-padding bg-white">
      <Container>
        <SectionHeading
          eyebrow="Why Choose Woosh"
          title="Built for premium doorstep vehicle care"
          subtitle="Every detail is designed to deliver trust, convenience, and a consistently exceptional experience."
        />

        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="relative overflow-hidden rounded-3xl border border-black/8 bg-white shadow-card">
            <div className="relative aspect-[16/10] min-h-[240px] w-full lg:sticky lg:top-28 lg:aspect-[4/3] lg:min-h-[320px]">
              <Image
                src="/assets/services/power-clean-car.jpg"
                alt="Professional Woosh car cleaning"
                fill
                className="object-cover object-[50%_42%]"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1d1d1f]/50 via-transparent to-transparent" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {whyWooshCards.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap];
              const isEco = item.accent === "eco";

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-black/8 bg-white p-5 shadow-card transition hover:border-cyan/25 hover:shadow-accent"
                >
                  <div
                    className={cn(
                      "mb-3 inline-flex rounded-xl p-2.5",
                      isEco ? "bg-eco/10 text-eco" : "bg-cyan/10 text-cyan",
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 text-h3 text-foreground">{item.title}</h3>
                  <p className="text-body leading-relaxed text-muted">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
