import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "center",
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
        <span className="text-gradient">{highlight}</span>
        {after}
      </>
    );
  };

  return (
    <div
      className={cn(
        "mb-12 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
      {...props}
    >
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {renderTitle()}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">{subtitle}</p>
      ) : null}
    </div>
  );
}
