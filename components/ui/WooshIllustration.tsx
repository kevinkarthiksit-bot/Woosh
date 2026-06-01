import { cn } from "@/lib/utils";
import Image from "next/image";

const illustrations = {
  "water-ripple": "/assets/illustrations/water-ripple.svg",
  "doorstep-pin": "/assets/illustrations/doorstep-pin.svg",
} as const;

export type WooshIllustrationName = keyof typeof illustrations;

interface WooshIllustrationProps {
  name: WooshIllustrationName;
  className?: string;
  width?: number;
  height?: number;
}

export function WooshIllustration({
  name,
  className,
  width = 120,
  height = 40,
}: WooshIllustrationProps) {
  return (
    <Image
      src={illustrations[name]}
      alt=""
      width={width}
      height={height}
      className={cn("pointer-events-none select-none opacity-80", className)}
      aria-hidden
    />
  );
}
