"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { ReactNode } from "react";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export function Magnetic({ children, className, strength = 0.18 }: MagneticProps) {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 });

  return (
    <motion.span
      className={className}
      style={{ x: springX, y: springY }}
      onPointerMove={(event) => {
        if (prefersReducedMotion || event.pointerType !== "mouse") {
          return;
        }
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * strength);
        y.set((event.clientY - rect.top - rect.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}
