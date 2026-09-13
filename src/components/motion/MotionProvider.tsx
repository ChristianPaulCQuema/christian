"use client";

import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import type { ReactNode } from "react";
import { useEffect } from "react";

/**
 * Global motion setup:
 * - Lenis inertial smooth scrolling for mouse wheels. Touch keeps native scrolling.
 * - Anchor links (#projects, #contact...) glide and respect scroll-margin-top.
 * - Dialogs and anything marked data-lenis-prevent keep native scrolling,
 *   so modals and the mobile menu never scroll the page behind them.
 * - Framer Motion follows the visitor's reduced-motion setting.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      lerp: 0.11,
      smoothWheel: true,
      prevent: (node) =>
        typeof node.closest === "function" && node.closest('[role="dialog"], [data-lenis-prevent]') !== null
    });

    return () => lenis.destroy();
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
