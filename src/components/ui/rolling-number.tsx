"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type RollingNumberProps = {
  value: number;
  /** Number of decimal places (e.g. 0 for integers, 1 for 98.5) */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  /** Roll duration in seconds — lower = faster */
  duration?: number;
  /**
   * Increment / change this to replay the count-up (e.g. on hover).
   * Appear animation still runs once via in-view.
   */
  replayKey?: number | string;
};

/**
 * Counts up from 0 when scrolled into view.
 * Pass a changing `replayKey` to roll again (hover). Respects reduced motion.
 */
export function RollingNumber({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  duration = 0.55,
  replayKey = 0,
}: RollingNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const format = (n: number) =>
      decimals > 0
        ? n.toFixed(decimals)
        : Math.round(n).toLocaleString("en-US");

    if (reduce) {
      setDisplay(format(value));
      return;
    }
    if (!inView) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(format(latest)),
    });

    return () => controls.stop();
  }, [inView, value, decimals, duration, reduce, replayKey]);

  const label = `${prefix}${
    decimals > 0 ? value.toFixed(decimals) : value.toLocaleString("en-US")
  }${suffix}`;

  return (
    <span ref={ref} className={cn("inline-flex tabular-nums", className)}>
      <span aria-hidden="true">
        {prefix}
        {display}
        {suffix}
      </span>
      <span className="sr-only">{label}</span>
    </span>
  );
}
