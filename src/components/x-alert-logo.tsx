import * as React from "react";
import { cn } from "@/lib/utils";

export interface XAlertLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size in pixels (both width and height). Defaults to 38. */
  size?: number;
}

/**
 * NineBeamLogo / XAlertLogo - The NineBeam rounded-square N mark.
 */
export function XAlertLogo({
  size = 38,
  className,
  style,
  ...props
}: XAlertLogoProps) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 select-none items-center justify-center rounded-[28%] bg-black text-white shadow-lg shadow-black/20 transition-transform",
        className
      )}
      style={{
        width: size,
        height: size,
        ...style,
      }}
      aria-label="NineBeam Logo"
      {...props}
    >
      <span className="font-display font-bold leading-none tracking-tight" style={{ fontSize: Math.round(size * 0.54) }}>
        N
      </span>
    </div>
  );
}

export const NineBeamLogo = XAlertLogo;
export default XAlertLogo;
