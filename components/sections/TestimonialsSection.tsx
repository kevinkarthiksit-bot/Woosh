"use client";

import { Carousel } from "@/components/ui/Carousel";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoCard } from "@/components/ui/VideoCard";
import { resolveMediaUrl } from "@/lib/api/media";
import { usePublicMedia } from "@/hooks/usePublicMedia";
import { testimonials } from "@/lib/services";
import { useMemo } from "react";

export function TestimonialsSection() {
  const { media } = usePublicMedia();

  const items = useMemo(() => {
    const apiItems = media?.testimonials;
    if (apiItems?.length) {
      return apiItems.map((item, index) => ({
        id: item._id ?? String(index),
        name: item.name ?? item.title ?? "Woosh customer",
        vehicle: item.label ?? "Verified customer",
        quote: item.quote ?? "",
        poster: resolveMediaUrl(item.image ?? item.url, testimonials[0]?.poster ?? ""),
      }));
    }
    return testimonials;
  }, [media]);

  return (
    <section id="testimonials" className="section-padding bg-background-muted">
      <Container>
        <SectionHeading
          eyebrow="Customer Testimonials"
          title="Loved by vehicle owners"
          subtitle="Hear from vehicle owners who trust Woosh for doorstep care — real results, real convenience."
        />

        <Carousel slideClassName="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 px-3">
          {items.map((testimonial) => (
            <VideoCard
              key={testimonial.id}
              title={testimonial.name}
              subtitle={testimonial.vehicle}
              quote={testimonial.quote}
              poster={testimonial.poster}
            />
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
