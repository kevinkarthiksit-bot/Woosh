import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  variant?: "glass" | "dark";
}

export function Card({
  className,
  glow = false,
  variant = "glass",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 transition-all duration-300",
        variant === "glass" && "glass-panel",
        variant === "dark" && "border border-white/10 bg-navy/80",
        glow && "hover:glow-cyan hover:-translate-y-1",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
