"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { transitions, viewport } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "fade" | "mask" | "blur" | "slide";
  as?: "div" | "section" | "article" | "li";
};

const variants = {
  fade: {
    initial: { opacity: 0.94, y: 12 },
    animate: { opacity: 1, y: 0 }
  },
  mask: {
    initial: { opacity: 0.96, y: 18 },
    animate: { opacity: 1, y: 0 }
  },
  blur: {
    initial: { opacity: 0.94, y: 14, scale: 0.995 },
    animate: { opacity: 1, y: 0, scale: 1 }
  },
  slide: {
    initial: { opacity: 0.96, x: -12 },
    animate: { opacity: 1, x: 0 }
  }
};

export function Reveal({ children, className, delay = 0, variant = "fade", as = "div" }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as];
  const selected = variants[variant];

  return (
    <MotionTag
      className={["min-w-0", className].filter(Boolean).join(" ")}
      initial={prefersReducedMotion ? false : selected.initial}
      whileInView={prefersReducedMotion ? undefined : selected.animate}
      viewport={viewport}
      transition={{ ...transitions.smooth, delay }}
    >
      {children}
    </MotionTag>
  );
}
