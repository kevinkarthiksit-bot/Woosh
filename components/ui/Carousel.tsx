"use client";

import { cn, prefersReducedMotion } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

interface CarouselProps {
  children: ReactNode[];
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  className?: string;
  slideClassName?: string;
  showDots?: boolean;
  showArrows?: boolean;
  loop?: boolean;
  onSlideChange?: (index: number) => void;
  onEmblaApi?: (api: EmblaCarouselType | null) => void;
}

export function Carousel({
  children,
  autoplay = false,
  autoplayDelay = 5000,
  pauseOnHover = true,
  className,
  slideClassName,
  showDots = true,
  showArrows = true,
  loop = true,
  onSlideChange,
  onEmblaApi,
}: CarouselProps) {
  const onSlideChangeRef = useRef(onSlideChange);
  onSlideChangeRef.current = onSlideChange;

  const shouldAutoplay = autoplay && !prefersReducedMotion();

  const plugins = shouldAutoplay
    ? [
        Autoplay({
          delay: autoplayDelay,
          stopOnInteraction: true,
          stopOnMouseEnter: pauseOnHover,
        }),
      ]
    : [];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop, align: "start" }, plugins);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    onEmblaApi?.(emblaApi ?? null);
    return () => onEmblaApi?.(null);
  }, [emblaApi, onEmblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      setSelectedIndex(index);
      onSlideChangeRef.current?.(index);
    };
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, shouldAutoplay, children.length]);

  return (
    <div className={cn("relative", className)}>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {children.map((child, index) => (
            <div
              key={index}
              className={cn("min-w-0 shrink-0 grow-0 basis-full", slideClassName)}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {showArrows && children.length > 1 ? (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            className="focus-ring absolute left-3 top-1/2 z-10 flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full border border-black/8 bg-white/90 p-2 text-foreground shadow-card backdrop-blur transition hover:border-cyan/40 hover:text-cyan"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="focus-ring absolute right-3 top-1/2 z-10 flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full border border-black/8 bg-white/90 p-2 text-foreground shadow-card backdrop-blur transition hover:border-cyan/40 hover:text-cyan"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      ) : null}

      {showDots && scrollSnaps.length > 1 ? (
        <div className="mt-6 flex items-center justify-center gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollTo(index)}
              className={cn(
                "focus-ring h-2.5 rounded-full transition-all",
                selectedIndex === index ? "w-8 bg-cyan" : "w-2.5 bg-black/15 hover:bg-black/25",
              )}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={selectedIndex === index}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
