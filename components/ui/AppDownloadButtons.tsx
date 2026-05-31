import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

interface AppDownloadButtonsProps {
  className?: string;
  size?: "sm" | "md";
  layout?: "row" | "column";
}

export function AppDownloadButtons({
  className,
  size = "md",
  layout = "row",
}: AppDownloadButtonsProps) {
  const sizeClasses = size === "sm" ? "min-w-[140px] px-3 py-2" : "min-w-[160px] px-4 py-2.5";

  return (
    <div
      className={cn(
        "flex gap-3",
        layout === "column" ? "flex-col items-stretch" : "flex-row flex-wrap items-center",
        className,
      )}
    >
      <a
        href={brand.appLinks.ios}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "focus-ring inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 transition hover:border-cyan/40 hover:bg-cyan/10",
          sizeClasses,
        )}
        aria-label="Download on the App Store"
      >
        <AppleIcon className="h-6 w-6 shrink-0 text-white" />
        <span className="text-left leading-tight">
          <span className="block text-[10px] text-white/60">Download on the</span>
          <span className="block text-sm font-semibold text-white">App Store</span>
        </span>
      </a>
      <a
        href={brand.appLinks.android}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "focus-ring inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 transition hover:border-cyan/40 hover:bg-cyan/10",
          sizeClasses,
        )}
        aria-label="Get it on Google Play"
      >
        <PlayIcon className="h-6 w-6 shrink-0 text-white" />
        <span className="text-left leading-tight">
          <span className="block text-[10px] text-white/60">Get it on</span>
          <span className="block text-sm font-semibold text-white">Google Play</span>
        </span>
      </a>
    </div>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.365 1.43c0 1.14-.417 2.063-1.249 2.772-.832.709-1.893 1.064-3.183 1.064-.09-1.17.395-2.126 1.456-2.866.564-.37 1.214-.648 1.95-.833.735-.186 1.42-.233 2.026-.137zM20.5 17.063c-.48 1.104-1.053 2.126-1.72 3.066-.888 1.245-1.614 2.106-2.178 2.583-.871.802-1.804 1.213-2.799 1.233-1.146 0-2.005-.327-2.576-.98-.571-.653-1.248-.98-2.032-.98-.816 0-1.51.327-2.083.98-.572.653-1.24.985-2.005.995-1.005.02-1.958-.4-2.86-1.26-.608-.53-1.365-1.416-2.27-2.658-.973-1.344-1.773-2.902-2.4-4.674C1.302 10.608 1 8.995 1 7.447c0-1.662.359-3.082 1.077-4.26.718-1.178 1.677-1.767 2.877-1.767 1.133 0 2.008.327 2.626.98.617.653 1.134.98 1.55.98.397 0 1.062-.347 1.995-1.04.934-.693 1.933-1.04 2.997-1.01 1.248.04 2.303.515 3.165 1.426-1.063.644-1.574 1.544-1.533 2.7.04 1.085.404 1.985 1.093 2.7.688.715 1.533 1.133 2.535 1.252-.212.644-.437 1.24-.675 1.787z" />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M3.609 1.814L13.792 12 3.61 22.186a1.003 1.003 0 01-1.417-.013 1.003 1.003 0 01-.287-.716V2.543c0-.28.107-.536.287-.716a1.003 1.003 0 011.417-.013zm14.073 10.664l-2.406 2.406 2.406 2.406 2.813-2.813a1 1 0 000-1.414l-2.813-2.813z" />
    </svg>
  );
}
