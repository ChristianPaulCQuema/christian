"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { easeOutQuart } from "@/lib/motion";

type RotatingRoleProps = {
  roles: string[];
  interval?: number;
};

export function RotatingRole({ roles, interval = 3200 }: RotatingRoleProps) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || roles.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % roles.length);
    }, interval);

    return () => window.clearInterval(timer);
  }, [interval, prefersReducedMotion, roles.length]);

  const role = roles[index] ?? roles[0];

  return (
    <p className="rotating-role text-[clamp(0.9rem,4.2vw,1.25rem)] font-semibold text-emerald-800 dark:text-emerald-300">
      <span className="sr-only">{roles.join(", ")}</span>
      <span className="rotating-role-window" aria-hidden="true">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={role}
            className="block whitespace-nowrap"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-110%", opacity: 0 }}
            transition={{ duration: 0.45, ease: easeOutQuart }}
          >
            {role}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="rotating-role-caret" aria-hidden="true" />
    </p>
  );
}
