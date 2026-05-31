"use client";

import { useAuthModal } from "@/components/providers/AuthModalProvider";
import { AppDownloadButtons } from "@/components/ui/AppDownloadButtons";
import { Button } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { Container } from "@/components/ui/Container";
import { brand } from "@/lib/brand";
import { heroSlides } from "@/lib/services";
import { cn, scrollToSection } from "@/lib/utils";
import type { EmblaCarouselType } from "embla-carousel";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function HeroBackground({
  slide,
  isActive,
}: {
  slide: (typeof heroSlides)[number];
  isActive: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isActive]);

  if (slide.mediaType === "video" && slide.heroVideo) {
    return (
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload={isActive ? "auto" : "none"}
        poster={slide.poster}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={slide.heroVideo} type="video/mp4" />
      </video>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={slide.poster}
        alt=""
        fill
        priority={isActive}
        className={cn(
          "ken-burns object-cover",
          slide.id === "daily-cleaning-services" && "object-[75%_center]",
        )}
        sizes="100vw"
      />
    </div>
  );
}

export function HeroSection() {
  const { openAuthModal } = useAuthModal();
  const [activeIndex, setActiveIndex] = useState(0);
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | null>(null);
  const activeSlide = heroSlides[activeIndex];

  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-28">
      <Carousel
        autoplay
        autoplayDelay={5000}
        pauseOnHover={false}
        showArrows={false}
        showDots={false}
        onSlideChange={setActiveIndex}
        onEmblaApi={setEmblaApi}
        className="absolute inset-0 top-28"
      >
        {heroSlides.map((slide, index) => (
          <div key={slide.id} className="relative min-h-[calc(100vh-7rem)]">
            <HeroBackground slide={slide} isActive={index === activeIndex} />
            <div className={cn("absolute inset-0 bg-gradient-to-r", slide.overlay)} />
            {slide.id === "daily-cleaning-services" ? (
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-transparent" />
            ) : null}
          </div>
        ))}
      </Carousel>

      <Container className="pointer-events-none relative z-10 flex min-h-[calc(100vh-7rem)] items-center pb-24 pt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45 }}
            className="pointer-events-auto max-w-2xl space-y-6"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan">
              {brand.tagline}
            </p>
            <p className="text-sm font-medium text-white/70">{brand.motto}</p>
            <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              {activeSlide.headline}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-white/75">{activeSlide.subtext}</p>
            <p className="text-sm font-medium text-cyan/90">{activeSlide.serviceTitle}</p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={openAuthModal}>Book a Wash</Button>
              <Button variant="secondary" onClick={() => scrollToSection("#services")}>
                Explore Services
              </Button>
            </div>
            <div className="space-y-3 pt-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                Download the Woosh app
              </p>
              <AppDownloadButtons size="sm" />
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>

      <div className="absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 gap-2 sm:flex">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => emblaApi?.scrollTo(index)}
            className={cn(
              "focus-ring rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide transition",
              index === activeIndex
                ? "bg-cyan text-charcoal"
                : "bg-charcoal/60 text-white/60 backdrop-blur-sm hover:bg-charcoal/80 hover:text-white",
            )}
            aria-label={`Go to ${slide.slideLabel}`}
            aria-current={index === activeIndex}
          >
            {slide.slideLabel}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollToSection("#services")}
        className="focus-ring absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-sm text-white/70 transition hover:text-cyan"
        aria-label="Scroll to services section"
      >
        <span>Explore below</span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </button>
    </section>
  );
}
