"use client";

import { Carousel } from "@/components/ui/Carousel";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { transformationVideos } from "@/lib/services";
import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

function TransformationCard({
  title,
  video,
  poster,
}: {
  title: string;
  video: string;
  poster: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="overflow-hidden rounded-3xl border border-black/8 bg-white shadow-card">
      <div className="relative aspect-video">
        {playing ? (
          <video src={video} controls autoPlay className="h-full w-full object-cover" />
        ) : (
          <>
            <Image src={poster} alt={title} fill className="object-cover" sizes="500px" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1d1d1f]/60 via-transparent to-transparent" />
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="focus-ring absolute left-1/2 top-1/2 flex h-14 w-14 min-h-[44px] min-w-[44px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cyan text-white shadow-accent transition hover:scale-105"
              aria-label={`Play ${title}`}
            >
              <Play className="ml-1 h-6 w-6 fill-current" />
            </button>
          </>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
    </div>
  );
}

export function TransformationsSection() {
  return (
    <section id="transformations" className="section-padding bg-background-muted">
      <Container>
        <SectionHeading
          eyebrow="See the Transformations"
          title="Watch Woosh in action"
          highlight="action"
          subtitle="Premium service videos showcasing the care, precision, and results Woosh delivers at your doorstep."
        />
      </Container>

      <div className="relative mt-2">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background-muted to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background-muted to-transparent sm:w-24" />

        <Container className="px-0 sm:px-6 lg:px-8">
          <Carousel slideClassName="basis-full sm:basis-1/2 lg:basis-1/3 px-3">
            {transformationVideos.map((item) => (
              <TransformationCard
                key={item.id}
                title={item.title}
                video={item.video}
                poster={item.poster}
              />
            ))}
          </Carousel>
        </Container>
      </div>
    </section>
  );
}
