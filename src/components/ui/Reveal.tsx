"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode, RefObject } from "react";
import { useRef } from "react";
import { easeOutQuart } from "@/lib/motion";
import { useRevealOnce } from "@/lib/useRevealOnce";

type RevealVariant = "fade" | "mask" | "blur" | "slide" | "right" | "scale";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  as?: "div" | "section" | "article" | "li";
};

const variants = {
  fade: {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0 }
  },
  mask: {
    hidden: { opacity: 0, y: 36, scale: 0.97 },
    show: { opacity: 1, y: 0, scale: 1 }
  },
  blur: {
    hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" }
  },
  slide: {
    hidden: { opacity: 0, x: -36 },
    show: { opacity: 1, x: 0 }
  },
  right: {
    hidden: { opacity: 0, x: 36 },
    show: { opacity: 1, x: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 }
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
  const ref = useRef<HTMLDivElement>(null);
  const revealed = useRevealOnce(ref);
  const classes = ["min-w-0", className].filter(Boolean).join(" ");
  const Component = MotionTag[as] as typeof motion.div;

  // Always render the same motion element on the server and in the browser.
  // Swapping to a plain element for reduced-motion visitors caused a hydration
  // mismatch that kept the server's opacity: 0 forever, hiding the content.
  const visible = revealed || Boolean(prefersReducedMotion);

  return (
    <Component
      ref={ref as RefObject<HTMLDivElement>}
      className={classes}
      initial="hidden"
      animate={visible ? "show" : "hidden"}
      variants={variants[variant]}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.7, delay, ease: easeOutQuart }}
    >
      {children}
    </Component>
  );
}
