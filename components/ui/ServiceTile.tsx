"use client";

import type { Service } from "@/lib/services";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface ServiceTileProps {
  service: Service;
  className?: string;
}

export function ServiceTile({ service, className }: ServiceTileProps) {
  const objectPosition = service.imageObjectPosition ?? "50% 50%";

  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-3xl shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-accent",
        service.goldAccent && "ring-1 ring-gold/40 hover:ring-gold/70",
        className,
      )}
    >
      <div className="relative aspect-[4/5] min-h-[260px] sm:min-h-[300px] lg:min-h-[320px]">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          style={{ objectPosition }}
          sizes="(max-width:768px) 100vw, 400px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1d1d1f] via-[#1d1d1f]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-cyan/10 opacity-0 transition duration-500 group-hover:opacity-100" />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <Image
            src={service.icon}
            alt=""
            width={36}
            height={36}
            className="rounded-lg shadow-lg shadow-black/40"
          />
          {service.goldAccent ? (
            <span className="rounded-full bg-gold/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-charcoal">
              Best Value
            </span>
          ) : null}
        </div>

        {service.tilePricing ? (
          <span className="absolute right-4 top-4 max-w-[calc(100%-5rem)] whitespace-nowrap rounded-full bg-[#1d1d1f]/75 px-3 py-1.5 text-xs font-semibold text-cyan backdrop-blur-sm sm:text-sm">
            {service.tilePricing}
          </span>
        ) : null}

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-cyan">
            {service.shortTitle}
          </p>
          <h3 className="text-xl font-bold text-white sm:text-2xl">{service.title}</h3>
          <p className="mt-2 line-clamp-2 text-base leading-relaxed text-white/85">
            {service.cardDescription}
          </p>
          <span className="mt-4 inline-flex items-center text-sm font-semibold text-white transition group-hover:text-cyan">
            View details
            <span className="ml-2 transition group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
