"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "fade" | "mask" | "blur" | "slide";
  as?: "div" | "section" | "article" | "li";
};

const variants = {
  fade: {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0 }
  },
  mask: {
    hidden: { opacity: 0, y: 22, clipPath: "inset(0 0 100% 0 round 20px)" },
    show: { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0 round 20px)" }
  },
  blur: {
    hidden: { opacity: 0, y: 14, filter: "blur(8px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" }
  },
  slide: {
    hidden: { opacity: 0, x: -24 },
    show: { opacity: 1, x: 0 }
  }
} as const;

const MotionTag = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  li: motion.li
} as const;

export function Reveal({ children, className, delay = 0, variant = "fade", as = "div" }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const Component = MotionTag[as];

  if (prefersReducedMotion) {
    const Static = as;
    return <Static className={["min-w-0", className].filter(Boolean).join(" ")}>{children}</Static>;
  }

  return (
    <Component
      className={["min-w-0", className].filter(Boolean).join(" ")}
      initial="hidden"
      animate="show"
      variants={variants[variant]}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
