import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { ServiceTile } from "@/components/ui/ServiceTile";
import { services } from "@/lib/services";

export function ServicesSection() {
  const featured = services.find((service) => service.featured);
  const rest = services.filter((service) => !service.featured);

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
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {featured ? (
            <ServiceTile service={featured} className="lg:row-span-2 lg:min-h-full" />
          ) : null}

          <div className="grid gap-5 sm:grid-cols-2 lg:col-start-2 lg:grid-cols-2 lg:gap-6">
            {rest.map((service, index) => (
              <ServiceTile key={service.slug} service={service} stagger={index % 2 === 1} />
            ))}
          </div>
        </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
