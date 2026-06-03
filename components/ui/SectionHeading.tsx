import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "left" | "center";
  /** Use on dark image overlays (hero tiles) */
  onDark?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "center",
  onDark = false,
  className,
  ...props
}: SectionHeadingProps) {
  const renderTitle = () => {
    if (!highlight || !title.includes(highlight)) {
      return title;
    }

    const [before, after] = title.split(highlight);
    return (
      <>
        {before}
        <span className={onDark ? "text-cyan" : "text-gradient"}>{highlight}</span>
        {after}
      </>
    );
  };

  return (
    <div
      className={cn(
        "mb-12 max-w-3xl",
        align === "center" && "mx-auto text-center",
        align === "left" && "text-left",
        className,
      )}
      {...props}
    >
      {eyebrow ? (
        <p className={cn("mb-3 text-eyebrow", onDark ? "text-cyan" : "text-cyan")}>{eyebrow}</p>
      ) : null}
      <h2
        className={cn(
          "font-display text-h2",
          onDark ? "text-white" : "text-foreground",
        )}
      >
        {renderTitle()}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-4 max-w-prose text-body-lg",
            onDark ? "text-white/80" : "text-muted",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
