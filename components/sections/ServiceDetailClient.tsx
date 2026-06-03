"use client";

import { useAuthModal } from "@/components/providers/AuthModalProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { Service } from "@/lib/services";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ServiceDetailClient({ service }: { service: Service }) {
  const { openAuthModal } = useAuthModal();

  return (
    <div className="pt-28">
      <section className="relative min-h-[420px] overflow-hidden bg-white sm:min-h-[520px]">
        <div className="absolute inset-0 min-h-[420px] sm:min-h-[520px]">
          <Image src={service.image} alt={service.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-white/30" />
        </div>
        <Container className="relative py-20 sm:py-28">
          <Link href="/#services" className="focus-ring mb-6 inline-flex text-sm text-cyan hover:underline">
            ← Back to services
          </Link>
          <div className="max-w-2xl space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">
              Woosh Service
            </p>
            <h1 className="font-display text-h1 text-foreground">{service.title}</h1>
            <p className="text-body-lg text-muted">{service.detailDescription}</p>
            {service.pricing ? (
              <p className="inline-flex rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm font-semibold text-gold">
                {service.pricing}
              </p>
            ) : null}
            <Button onClick={openAuthModal}>Book a Wash</Button>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-background-muted">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <h2 className="mb-6 font-display text-h2 text-foreground">What&apos;s included</h2>
              <ul className="space-y-4">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-foreground/80">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="overflow-hidden rounded-3xl border border-black/8 bg-white shadow-card">
              <video controls poster={service.poster16x9} className="aspect-video w-full object-cover">
                <source src={service.detailVideo} type="video/mp4" />
              </video>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
