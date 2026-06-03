"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  label: string;
  className?: string;
  size?: "default" | "compact";
}

export function BeforeAfterSlider({
  before,
  after,
  label,
  className,
  size = "default",
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const isCompact = size === "compact";

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    updatePosition(event.clientX);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    updatePosition(event.clientX);
  };

  const onPointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowLeft") setPosition((value) => Math.max(0, value - 5));
    if (event.key === "ArrowRight") setPosition((value) => Math.min(100, value + 5));
  };

  const imageSizes = isCompact ? "720px" : "900px";

  return (
    <div className={cn("space-y-4", className)}>
      <div
        ref={containerRef}
        className={cn(
          "relative overflow-hidden border border-black/8 shadow-card select-none",
          isCompact ? "aspect-video rounded-2xl" : "aspect-[16/10] rounded-3xl",
        )}
      >
        <Image src={after} alt={`${label} after`} fill className="object-cover" sizes={imageSizes} draggable={false} />

        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image src={before} alt={`${label} before`} fill className="object-cover" sizes={imageSizes} draggable={false} />
        </div>

        <div
          className="absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_12px_rgba(0,0,0,0.3)]"
          style={{ left: `${position}%` }}
        />

        <button
          type="button"
          className={cn(
            "focus-ring absolute top-1/2 z-20 flex min-h-[44px] min-w-[44px] -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border-2 border-white bg-cyan font-bold text-white shadow-accent",
            isCompact ? "h-10 w-10 text-base" : "h-12 w-12 text-lg",
          )}
          style={{ left: `${position}%` }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onKeyDown={onKeyDown}
          aria-label={`Compare before and after for ${label}. Use arrow keys to adjust.`}
        >
          ↔
        </button>

        <span className="absolute left-4 top-4 rounded-full bg-[#1d1d1f]/75 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/90">
          Before
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-cyan px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          After
        </span>
      </div>
      <p className={cn("text-center font-medium text-foreground", isCompact ? "text-base" : "text-lg")}>
        {label}
      </p>
    </div>
  );
}
