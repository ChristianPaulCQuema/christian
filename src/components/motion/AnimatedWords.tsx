"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Fragment, useRef } from "react";
import { easeOutQuart } from "@/lib/motion";
import { useRevealOnce } from "@/lib/useRevealOnce";

type HeadingTag = "h1" | "h2" | "h3";

type AnimatedWordsProps = {
  text: string;
  as?: HeadingTag;
  className?: string;
  delay?: number;
};

const MotionHeading = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3
} as const;

const wordVariants = {
  hidden: { y: "105%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: 0.7, ease: easeOutQuart } }
};

const instantWordVariants = {
  hidden: { y: "105%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: 0 } }
};

export function AnimatedWords({ text, as = "h2", className, delay = 0 }: AnimatedWordsProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  const revealed = useRevealOnce(ref);
  const Component = MotionHeading[as] as typeof motion.h2;
  const words = text.split(" ");

  // Same markup on server and browser for every visitor (see Reveal for why).
  const visible = revealed || Boolean(prefersReducedMotion);

  return (
    <Component
      ref={ref}
      className={className}
      aria-label={text}
      initial="hidden"
      animate={visible ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: prefersReducedMotion ? { staggerChildren: 0 } : { staggerChildren: 0.055, delayChildren: delay } }
      }}
    >
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="animated-word" aria-hidden="true">
            <motion.span className="animated-word-inner" variants={prefersReducedMotion ? instantWordVariants : wordVariants}>
              {word}
            </motion.span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Component>
  );
}
