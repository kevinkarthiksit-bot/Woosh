"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  label: string;
  className?: string;
}

export function BeforeAfterSlider({ before, after, label, className }: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);

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

  return (
    <div className={cn("space-y-4", className)}>
      <div
        ref={containerRef}
        className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 select-none"
      >
        <Image src={after} alt={`${label} after`} fill className="object-cover" sizes="900px" draggable={false} />

        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image src={before} alt={`${label} before`} fill className="object-cover" sizes="900px" draggable={false} />
        </div>

        <div
          className="absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_20px_rgba(0,191,255,0.8)]"
          style={{ left: `${position}%` }}
        />

        <button
          type="button"
          className="focus-ring absolute top-1/2 z-20 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border-2 border-white bg-cyan text-lg font-bold text-charcoal shadow-lg"
          style={{ left: `${position}%` }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onKeyDown={onKeyDown}
          aria-label={`Compare before and after for ${label}. Use arrow keys to adjust.`}
        >
          ↔
        </button>

        <span className="absolute left-4 top-4 rounded-full bg-charcoal/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/80">
          Before
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-cyan px-3 py-1 text-xs font-semibold uppercase tracking-wide text-charcoal">
          After
        </span>
      </div>
      <p className="text-center text-lg font-medium text-white/80">{label}</p>
    </div>
  );
}
