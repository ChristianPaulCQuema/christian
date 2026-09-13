/**
 * Distinguishes a real mouse movement from the synthetic pointermove that
 * browsers dispatch when content scrolls underneath a still cursor.
 * Hover-intent features use it so scrolling never opens a hover preview.
 */
let lastX = Number.NaN;
let lastY = Number.NaN;
let lastRealMoveAt = 0;
let tracking = false;

export function ensurePointerTracking() {
  if (tracking || typeof window === "undefined") {
    return;
  }

  tracking = true;
  window.addEventListener(
    "pointermove",
    (event) => {
      if (event.pointerType !== "mouse") {
        return;
      }

      if (event.clientX !== lastX || event.clientY !== lastY) {
        lastX = event.clientX;
        lastY = event.clientY;
        lastRealMoveAt = performance.now();
      }
    },
    { capture: true, passive: true }
  );
}

export function pointerMovedRecently(windowMs = 80) {
  return performance.now() - lastRealMoveAt < windowMs;
}

// Start tracking as soon as this module loads in the browser, so the very
// first real movement over a card is already recorded.
ensurePointerTracking();
