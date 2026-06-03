import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  variant?: "light" | "glass";
}

export function Card({
  className,
  glow = false,
  variant = "light",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 transition-all duration-300",
        variant === "glass" && "glass-panel",
        variant === "light" && "border border-black/8 bg-white shadow-card",
        glow && "hover:shadow-accent hover:-translate-y-1",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
