import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface AppDownloadButtonsProps {
  className?: string;
  size?: "sm" | "md";
  layout?: "row" | "column";
  showComingSoon?: boolean;
}

function StoreBadge({
  src,
  width,
  height,
  label,
  href,
  live,
}: {
  src: string;
  width: number;
  height: number;
  label: string;
  href: string;
  live: boolean;
}) {
  const image = (
    <Image
      src={src}
      alt=""
      width={width}
      height={height}
      className="h-auto w-auto"
      style={{ height, width: "auto" }}
    />
  );

  if (!live) {
    return (
      <span
        className="inline-block cursor-default opacity-85"
        aria-label={`${label} — coming soon`}
        role="img"
      >
        {image}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="focus-ring inline-block rounded-md transition hover:opacity-90 hover:scale-[1.02]"
      aria-label={label}
    >
      {image}
    </a>
  );
}

export function AppDownloadButtons({
  className,
  size = "md",
  layout = "row",
  showComingSoon = !brand.appsLive,
}: AppDownloadButtonsProps) {
  const height = size === "sm" ? 40 : 48;
  const appStoreWidth = Math.round(height * 3);
  const playWidth = Math.round(height * 3.375);

  return (
    <div className={cn("space-y-2", className)}>
      <div
        className={cn(
          "flex gap-3",
          layout === "column" ? "flex-col items-stretch" : "flex-row flex-wrap items-center",
        )}
      >
        <StoreBadge
          src={brand.badgeAssets.appStore}
          width={appStoreWidth}
          height={height}
          label="Download on the App Store"
          href={brand.appLinks.ios}
          live={brand.appsLive}
        />
        <StoreBadge
          src={brand.badgeAssets.googlePlay}
          width={playWidth}
          height={height}
          label="Get it on Google Play"
          href={brand.appLinks.android}
          live={brand.appsLive}
        />
      </div>
      {showComingSoon && !brand.appsLive ? (
        <p className="text-caption text-muted">Mobile apps coming soon — badges shown for preview.</p>
      ) : null}
    </div>
  );
}
