"use client";



import { useAuthModal } from "@/components/providers/AuthModalProvider";

import { useAuth } from "@/components/providers/AuthProvider";

import { Button } from "@/components/ui/Button";

import { Carousel } from "@/components/ui/Carousel";

import { Container } from "@/components/ui/Container";

import { useReducedMotion } from "@/hooks/useReducedMotion";

import { brand } from "@/lib/brand";

import { heroText } from "@/lib/motion";

import { mediaPolicy } from "@/lib/media";

import { heroSlides } from "@/lib/services";

import { cn, scrollToSection } from "@/lib/utils";

import type { EmblaCarouselType } from "embla-carousel";

import { AnimatePresence, motion } from "framer-motion";

import Image from "next/image";

import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";



const HERO_HEIGHT = "min(78vh, 720px)";



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



function HeroScrim({ overlay }: { overlay: string }) {

  return (

    <>

      <div

        className={cn("absolute inset-0 bg-gradient-to-r to-transparent", overlay)}

        aria-hidden

      />

      <div

        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent md:from-transparent md:via-transparent"

        aria-hidden

      />

    </>

  );

}



export function HeroSection() {

  const router = useRouter();

  const { openAuthModal } = useAuthModal();

  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const [activeIndex, setActiveIndex] = useState(0);

  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | null>(null);

  const activeSlide = heroSlides[activeIndex];



  const handleBook = () => {
    if (authLoading) return;
    const bookPath = `/services/${activeSlide.id}/book`;
    if (!isAuthenticated) {
      openAuthModal(bookPath);
      return;
    }
    router.push(bookPath);
  };



  return (

    <section

      id="home"

      className="relative overflow-hidden bg-charcoal pt-24"

      style={{ minHeight: HERO_HEIGHT }}

      aria-roledescription="carousel"

      aria-label="Featured services"

    >

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

              <HeroScrim overlay={slide.overlay} />

            </div>

          </div>

        ))}

      </Carousel>



      <Container

        className="pointer-events-none absolute inset-x-0 top-24 z-10 flex items-end pb-20 pt-6 md:items-center md:pb-24 md:pt-4"

        style={{ minHeight: HERO_HEIGHT }}

      >

        <AnimatePresence mode="wait">

          <motion.div

            key={activeSlide.id}

            variants={heroText}

            initial="hidden"

            animate="visible"

            exit="exit"

            className="pointer-events-auto max-w-xl space-y-5"

          >

            <p className="text-eyebrow text-cyan">

              {brand.tagline} · {brand.motto}

            </p>

            <h1 className="font-display text-h1 text-white">{activeSlide.headline}</h1>

            <p className="max-w-prose text-body-lg text-white/85 line-clamp-2 sm:line-clamp-none">

              {activeSlide.subtext}

            </p>

            <div className="flex flex-wrap gap-3 pt-1">

              <Button onClick={handleBook} className="min-h-[48px]">

                Book a Wash

              </Button>

              <Button

                variant="secondary"

                className="min-h-[48px] border-white/30 bg-transparent text-white hover:border-white/50 hover:bg-white/10 hover:text-white"

                onClick={() => scrollToSection("#services")}

              >

                Explore Services

              </Button>

            </div>

          </motion.div>

        </AnimatePresence>

      </Container>



      <div

        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center justify-center gap-2 px-4"

        role="tablist"

        aria-label="Hero slides"

      >

        {heroSlides.map((slide, index) => (

          <button

            key={slide.id}

            type="button"

            role="tab"

            onClick={() => emblaApi?.scrollTo(index)}

            className={cn(

              "focus-ring flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full transition-all",

            )}

            aria-label={`Go to ${slide.slideLabel}`}

            aria-selected={index === activeIndex}

          >

            <span

              className={cn(

                "block rounded-full transition-all",

                index === activeIndex ? "h-2.5 w-8 bg-cyan" : "h-2.5 w-2.5 bg-white/40 hover:bg-white/60",

              )}

            />

          </button>

        ))}

      </div>

    </section>

  );

}


