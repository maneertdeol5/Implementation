import { cn } from "@/lib/utils";
import { HEALTH_STATUS } from "@/lib/constants";
import type { HealthStatus } from "@/types";

interface HealthBadgeProps {
  status: HealthStatus;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function HealthBadge({
  status,
  size = "md",
  showLabel = true,
  className,
}: HealthBadgeProps) {
  const config = HEALTH_STATUS[status];

  const sizes = {
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-4 w-4",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <span
        className={cn("rounded-full", config.color, sizes[size])}
        aria-hidden="true"
      />
      {showLabel && (
        <span className={cn("font-medium", config.textColor, textSizes[size])}>
          {config.label}
        </span>
      )}
    </div>
  );
}

interface HealthIndicatorProps {
  status: HealthStatus;
  isStale?: boolean;
  className?: string;
}

export function HealthIndicator({ status, isStale, className }: HealthIndicatorProps) {
  const config = HEALTH_STATUS[status];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-md border px-2.5 py-1",
        config.bgLight,
        config.borderColor,
        className
      )}
    >
      <span className={cn("h-2 w-2 rounded-full", config.color)} />
      <span className={cn("text-sm font-medium", config.textColor)}>
        {config.label}
      </span>
      {isStale && (
        <span className="ml-1 text-xs text-orange-600" title="Stale (>7 days)">
          ⚠
        </span>
      )}
    </div>
  );
}
