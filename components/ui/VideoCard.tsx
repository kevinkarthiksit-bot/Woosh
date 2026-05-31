"use client";

import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface VideoCardProps {
  title: string;
  subtitle?: string;
  quote?: string;
  poster: string;
  videoSrc?: string;
  className?: string;
}

export function VideoCard({
  title,
  subtitle,
  quote,
  poster,
  videoSrc,
  className,
}: VideoCardProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/10 bg-navy/80",
        className,
      )}
    >
      <div className="relative aspect-[4/5] sm:aspect-video">
        {playing && videoSrc ? (
          <video
            src={videoSrc}
            controls
            autoPlay
            className="h-full w-full object-cover"
            poster={poster}
          />
        ) : (
          <>
            <Image src={poster} alt={title} fill className="object-cover" sizes="400px" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
            <button
              type="button"
              onClick={() => videoSrc && setPlaying(true)}
              className="focus-ring absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cyan/90 text-charcoal transition group-hover:scale-110"
              aria-label={`Play ${title} video`}
            >
              <Play className="ml-1 h-7 w-7 fill-current" />
            </button>
          </>
        )}
      </div>
      <div className="space-y-2 p-5">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {subtitle ? <p className="text-sm text-cyan">{subtitle}</p> : null}
        {quote ? <p className="text-sm leading-relaxed text-white/70">&ldquo;{quote}&rdquo;</p> : null}
      </div>
    </div>
  );
}
