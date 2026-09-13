"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

const INTERACTIVE_SELECTOR = "a, button, [role='tab'], input, textarea, select, label, .tilt-card";

/**
 * A soft ring that trails the mouse and grows over interactive elements.
 * It is hidden by CSS on touch devices and for reduced-motion users, and
 * the native cursor is never replaced.
 */
export function CursorFollower() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const scale = useMotionValue(1);
  const opacity = useMotionValue(0);
  const ringX = useSpring(x, { stiffness: 420, damping: 34, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 420, damping: 34, mass: 0.4 });
  const ringScale = useSpring(scale, { stiffness: 320, damping: 24 });
  const smoothOpacity = useSpring(opacity, { stiffness: 220, damping: 30 });

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!finePointer || reducedMotion) {
      return;
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        return;
      }

      x.set(event.clientX);
      y.set(event.clientY);
      opacity.set(1);

      const target = event.target instanceof Element ? event.target.closest(INTERACTIVE_SELECTOR) : null;
      scale.set(target ? 1.75 : 1);
    };

    const onPointerDown = () => scale.set(scale.get() * 0.8);
    const onLeaveWindow = () => opacity.set(0);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeaveWindow);
    window.addEventListener("blur", onLeaveWindow);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
      window.removeEventListener("blur", onLeaveWindow);
    };
  }, [opacity, scale, x, y]);

  return (
    <>
      <motion.div className="cursor-ring" style={{ x: ringX, y: ringY, scale: ringScale, opacity: smoothOpacity }} aria-hidden="true" />
      <motion.div className="cursor-dot" style={{ x, y, opacity: smoothOpacity }} aria-hidden="true" />
    </>
  );
}
