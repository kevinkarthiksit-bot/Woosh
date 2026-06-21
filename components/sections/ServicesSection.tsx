"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { ServiceTile } from "@/components/ui/ServiceTile";
import { formatInr } from "@/lib/api/mappers";
import { getServices } from "@/lib/api/services";
import { services } from "@/lib/services";
import { useEffect, useState } from "react";

export function ServicesSection() {
  const [mergedServices, setMergedServices] = useState(services);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const live = await getServices();
        if (cancelled) return;
        setMergedServices(
          services.map((s) => {
            const category = s.slug.includes("bike")
              ? "BikeWash"
              : s.slug.includes("monthly")
                ? "Membership"
                : "CarWash";
            const match = live.find(
              (item) =>
                item.category === category &&
                item.name.toLowerCase().includes(s.shortTitle.toLowerCase().split(" ")[0] ?? ""),
            );
            if (match?.basePrice) {
              return { ...s, tilePricing: formatInr(match.basePrice) };
            }
            return s;
          }),
        );
      } catch {
        // keep static
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const featured = mergedServices.find((service) => service.featured);
  const rest = mergedServices.filter((service) => !service.featured);

  return (
    <section id="services" className="section-padding bg-background-muted">
      <Container>
        <SectionHeading
          eyebrow="Our Services"
          title="Premium care for every vehicle"
          highlight="Premium"
          subtitle="Choose the Woosh service that fits your lifestyle — each delivered with trained professionals and transparent pricing."
        />

        <SectionReveal>
          <div className="grid gap-5 lg:grid-cols-2 lg:items-stretch lg:gap-6">
            {featured ? (
              <ServiceTile
                service={featured}
                className="lg:row-span-2 lg:h-full [&>div]:lg:h-full [&>div]:lg:min-h-full [&>div]:lg:aspect-auto"
              />
            ) : null}

            <div className="grid gap-5 sm:grid-cols-2 lg:col-start-2 lg:grid-cols-2 lg:gap-6">
              {rest.map((service) => (
                <ServiceTile key={service.slug} service={service} />
              ))}
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
