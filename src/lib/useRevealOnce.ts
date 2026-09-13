import { useEffect, useState } from "react";
import type { RefObject } from "react";

type RevealCallback = () => void;

const callbacks = new WeakMap<Element, RevealCallback>();
let sharedObserver: IntersectionObserver | null = null;

function getObserver() {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const rootTop = entry.rootBounds ? entry.rootBounds.top : 0;
          const scrolledPast = entry.boundingClientRect.bottom <= rootTop;

          // Reveal when the element is on screen, and also when it is already above
          // the viewport. The second case covers content scrolled past before the
          // page finished loading, anchor jumps, and restored scroll positions, so
          // nothing can stay invisible.
          if (entry.isIntersecting || scrolledPast) {
            const reveal = callbacks.get(entry.target);
            if (reveal) {
              callbacks.delete(entry.target);
              sharedObserver?.unobserve(entry.target);
              reveal();
            }
          }
        }
      },
      { rootMargin: "0px 0px -48px 0px", threshold: 0 }
    );
  }

  return sharedObserver;
}

/** Returns true once the element has entered, or been scrolled past, the viewport. */
export function useRevealOnce<T extends Element>(ref: RefObject<T | null>, enabled = true) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!enabled || !element) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      const timer = window.setTimeout(() => setRevealed(true), 0);
      return () => window.clearTimeout(timer);
    }

    const observer = getObserver();
    callbacks.set(element, () => setRevealed(true));
    observer.observe(element);

    return () => {
      callbacks.delete(element);
      observer.unobserve(element);
    };
  }, [enabled, ref]);

  return revealed;
}
