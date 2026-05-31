"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface BeforeAfterSlideProps {
  label: string;
  before: string;
  after: string;
  className?: string;
}

export function BeforeAfterSlide({ label, before, after, className }: BeforeAfterSlideProps) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-2", className)}>
      <div className="relative overflow-hidden rounded-3xl border border-white/10">
        <div className="absolute left-4 top-4 z-10 rounded-full bg-charcoal/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/80">
          Before
        </div>
        <div className="relative aspect-[4/3]">
          <Image src={before} alt={`${label} before`} fill className="object-cover" sizes="600px" />
        </div>
      </div>
      <div className="relative overflow-hidden rounded-3xl border border-cyan/30 glow-cyan">
        <div className="absolute left-4 top-4 z-10 rounded-full bg-cyan px-3 py-1 text-xs font-semibold uppercase tracking-wide text-charcoal">
          After
        </div>
        <div className="relative aspect-[4/3]">
          <Image src={after} alt={`${label} after`} fill className="object-cover" sizes="600px" />
        </div>
      </div>
      <p className="md:col-span-2 text-center text-lg font-medium text-white/80">{label}</p>
    </div>
  );
}
