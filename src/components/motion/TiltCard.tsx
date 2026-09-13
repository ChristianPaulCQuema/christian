"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Maximum tilt in degrees. */
  max?: number;
  glare?: boolean;
};

const tiltSpring = { stiffness: 260, damping: 22, mass: 0.5 };

/**
 * 3D pointer tilt with a moving glare. Only reacts to a mouse, so touch
 * scrolling is never hijacked. Motion values update the DOM directly,
 * which means no React re-render happens while the pointer moves.
 */
export function TiltCard({ children, className = "", max = 7, glare = true }: TiltCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, tiltSpring);
  const smoothRotateY = useSpring(rotateY, tiltSpring);
  const smoothGlare = useSpring(glareOpacity, { stiffness: 200, damping: 30 });
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgb(255 255 255 / 0.3), transparent 58%)`;

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion || event.pointerType !== "mouse") {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    rotateY.set((px - 0.5) * max * 2);
    rotateX.set((0.5 - py) * max * 2);
    glareX.set(px * 100);
    glareY.set(py * 100);
    glareOpacity.set(1);
  }

  function handlePointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
    glareOpacity.set(0);
  }

  return (
    <motion.div
      className={`tilt-card ${className}`}
      style={{ rotateX: smoothRotateX, rotateY: smoothRotateY, transformPerspective: 1000 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
      {glare ? (
        <motion.span className="tilt-glare" style={{ background: glareBackground, opacity: smoothGlare }} aria-hidden="true" />
      ) : null}
    </motion.div>
  );
}
