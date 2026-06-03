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
      <div className="relative overflow-hidden rounded-3xl border border-black/8 shadow-card">
        <div className="absolute left-4 top-4 z-10 rounded-full bg-[#1d1d1f]/75 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/90">
          Before
        </div>
        <div className="relative aspect-[4/3]">
          <Image src={before} alt={`${label} before`} fill className="object-cover" sizes="600px" />
        </div>
      </div>
      <div className="relative overflow-hidden rounded-3xl border border-cyan/30 shadow-accent">
        <div className="absolute left-4 top-4 z-10 rounded-full bg-cyan px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          After
        </div>
        <div className="relative aspect-[4/3]">
          <Image src={after} alt={`${label} after`} fill className="object-cover" sizes="600px" />
        </div>
      </div>
      <p className="text-center text-lg font-medium text-foreground md:col-span-2">{label}</p>
    </div>
  );
}
