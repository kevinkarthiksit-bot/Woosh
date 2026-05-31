"use client";

import { Carousel } from "@/components/ui/Carousel";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoCard } from "@/components/ui/VideoCard";
import { testimonials } from "@/lib/services";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-padding bg-navy/40">
      <Container>
        <SectionHeading
          eyebrow="Customer Testimonials"
          title="Loved by vehicle owners"
          subtitle="Real stories from Woosh customers — video testimonials coming soon with polished placeholders ready for upload."
        />

        <Carousel slideClassName="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 px-3">
          {testimonials.map((testimonial) => (
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
