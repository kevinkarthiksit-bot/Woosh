"use client";

import { useAuthModal } from "@/components/providers/AuthModalProvider";
import { AppDownloadButtons } from "@/components/ui/AppDownloadButtons";
import { Button } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { Container } from "@/components/ui/Container";
import { WooshIllustration } from "@/components/ui/WooshIllustration";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { brand } from "@/lib/brand";
import { heroText } from "@/lib/motion";
import { mediaPolicy } from "@/lib/media";
import { heroSlides } from "@/lib/services";
import { cn, scrollToSection } from "@/lib/utils";
import type { EmblaCarouselType } from "embla-carousel";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const HERO_HEIGHT = "min(72vh, 640px)";

function HeroBackground({
  slide,
  isActive,
  isFirstSlide,
}: {
  slide: (typeof heroSlides)[number];
  isActive: boolean;
  isFirstSlide: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const showVideo =
    isActive && !reducedMotion && slide.mediaType === "video" && Boolean(slide.heroVideo);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !showVideo) return;
    void video.play().catch(() => {});
    return () => {
      video.pause();
    };
  }, [showVideo]);

  return (
    <>
      <Image
        src={slide.poster}
        alt=""
        fill
        priority={isFirstSlide}
        fetchPriority={isFirstSlide ? "high" : "low"}
        className={cn("object-cover object-center", isActive && !reducedMotion && "ken-burns")}
        sizes={mediaPolicy.hero.posterSizes}
      />
      {showVideo ? (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload={mediaPolicy.hero.videoPreloadActive}
          poster={slide.poster}
          className="absolute inset-0 h-full w-full object-cover object-center"
        >
          <source src={slide.heroVideo!} type="video/mp4" />
        </video>
      ) : null}
    </>
  );
}

export function HeroSection() {
  const { openAuthModal } = useAuthModal();
  const [activeIndex, setActiveIndex] = useState(0);
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | null>(null);
  const activeSlide = heroSlides[activeIndex];

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white pt-24"
      style={{ minHeight: HERO_HEIGHT }}
      aria-roledescription="carousel"
      aria-label="Featured services"
    >
      <div className="pointer-events-none absolute right-4 top-28 z-[5] hidden opacity-50 md:block lg:right-12">
        <WooshIllustration name="water-ripple" width={160} height={48} />
      </div>

      <Carousel
        autoplay
        autoplayDelay={5000}
        pauseOnHover={false}
        showArrows={false}
        showDots={false}
        onSlideChange={setActiveIndex}
        onEmblaApi={setEmblaApi}
        className="absolute inset-x-0 top-24 bottom-0"
      >
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className="relative h-full min-h-[inherit]"
            style={{ minHeight: HERO_HEIGHT }}
            aria-hidden={index !== activeIndex}
          >
            <div className="absolute inset-0">
              <HeroBackground
                slide={slide}
                isActive={index === activeIndex}
                isFirstSlide={index === 0}
              />
            </div>
          </div>
        ))}
      </Carousel>

      <Container
        className="pointer-events-none absolute inset-x-0 top-24 z-10 flex items-center pb-14 pt-4"
        style={{ minHeight: HERO_HEIGHT }}
      >
        <div
          className="pointer-events-none absolute inset-y-4 left-0 w-[58%] max-w-3xl bg-gradient-to-r from-white/90 via-white/50 to-transparent"
          aria-hidden
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            variants={heroText}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="pointer-events-auto relative max-w-2xl space-y-4"
          >
            <p className="text-eyebrow text-cyan">{brand.tagline}</p>
            <p className="text-caption font-medium text-muted">{brand.motto}</p>
            <h1 className="font-display text-h1 text-foreground">{activeSlide.headline}</h1>
            <p className="max-w-prose text-body-lg text-foreground/80 line-clamp-3 sm:line-clamp-none">
              {activeSlide.subtext}
            </p>
            <p className="text-caption font-medium text-cyan">{activeSlide.serviceTitle}</p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Button onClick={openAuthModal} className="min-h-[48px]">
                Book a Wash
              </Button>
              <Button
                variant="secondary"
                className="min-h-[48px] bg-white/80 backdrop-blur-sm"
                onClick={() => scrollToSection("#services")}
              >
                Explore Services
              </Button>
            </div>
            <div className="space-y-2.5 pt-2">
              <p className="text-eyebrow text-muted">Download the Woosh app</p>
              <AppDownloadButtons size="sm" />
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>

      <div
        className="absolute bottom-16 left-1/2 z-10 hidden -translate-x-1/2 flex-wrap justify-center gap-2 px-4 sm:flex"
        role="tablist"
        aria-label="Hero slides"
      >
        {heroSlides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            role="tab"
            onClick={() => emblaApi?.scrollTo(index)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") {
                event.preventDefault();
                emblaApi?.scrollTo((index + 1) % heroSlides.length);
              }
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                emblaApi?.scrollTo((index - 1 + heroSlides.length) % heroSlides.length);
              }
            }}
            className={cn(
              "focus-ring min-h-[44px] rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-wide transition",
              index === activeIndex
                ? "bg-cyan text-white shadow-accent"
                : "bg-black/5 text-foreground/60 backdrop-blur-sm hover:bg-black/10 hover:text-foreground",
            )}
            aria-label={`Go to ${slide.slideLabel}`}
            aria-selected={index === activeIndex}
          >
            {slide.slideLabel}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollToSection("#services")}
        className="focus-ring absolute bottom-5 left-1/2 z-10 flex min-h-[44px] -translate-x-1/2 flex-col items-center justify-center gap-1 text-caption text-muted transition hover:text-cyan"
        aria-label="Scroll to services section"
      >
        <span>Explore below</span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </button>
    </section>
  );
}
