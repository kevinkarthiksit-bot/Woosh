import { cn } from "@/lib/utils";
import { getStatusClass } from "@/lib/account/orders";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
        getStatusClass(status),
        className,
      )}
    >
      {status}
    </span>
  );
}
