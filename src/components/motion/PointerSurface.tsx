"use client";

import { useEffect } from "react";

export function PointerSurface() {
  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canHover || reducedMotion) {
      return;
    }

    const onPointerMove = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>(".interactive-card") : null;

      if (!target) {
        return;
      }

      const rect = target.getBoundingClientRect();
      target.style.setProperty("--x", `${event.clientX - rect.left}px`);
      target.style.setProperty("--y", `${event.clientY - rect.top}px`);
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => document.removeEventListener("pointermove", onPointerMove);
  }, []);

  return null;
}
