"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

type CountUpProps = {
  value: number;
  suffix?: string;
  duration?: number;
};

/**
 * Server-renders the final number (never blank), then counts up from zero
 * the first time it scrolls into view. Text is written straight to the DOM
 * node, so the animation causes no React re-renders.
 */
export function CountUp({ value, suffix = "", duration = 1.8 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: "some" });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;

    if (!node || !inView || prefersReducedMotion) {
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = `${Math.round(latest)}${suffix}`;
      }
    });

    return () => controls.stop();
  }, [duration, inView, prefersReducedMotion, suffix, value]);

  return <span ref={ref}>{`${value}${suffix}`}</span>;
}
