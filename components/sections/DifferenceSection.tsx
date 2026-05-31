"use client";

import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { Carousel } from "@/components/ui/Carousel";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { beforeAfterPairs } from "@/lib/services";

export function DifferenceSection() {
  return (
    <section id="difference" className="section-padding">
      <Container>
        <SectionHeading
          eyebrow="See the Difference"
          title="Visible results you can trust"
          highlight="trust"
          subtitle="Drag the handle to compare before and after — real Woosh service imagery showing the premium clean."
        />

        <Carousel autoplay autoplayDelay={4500}>
          {beforeAfterPairs.map((pair) => (
            <BeforeAfterSlider
              key={pair.id}
              label={pair.label}
              before={pair.before}
              after={pair.after}
            />
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
