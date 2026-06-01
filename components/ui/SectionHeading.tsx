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
        align === "left" && "text-left",
        className,
      )}
      {...props}
    >
      {eyebrow ? <p className="mb-3 text-eyebrow text-cyan">{eyebrow}</p> : null}
      <h2 className="font-display text-h2 text-white">{renderTitle()}</h2>
      {subtitle ? (
        <p className={cn("mt-4 max-w-prose text-body-lg text-white/75", align === "center" && "mx-auto")}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
