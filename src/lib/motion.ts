const easeOutQuart = [0.22, 1, 0.36, 1] as [number, number, number, number];

export const transitions = {
  smooth: {
    duration: 0.62,
    ease: easeOutQuart
  },
  quick: {
    duration: 0.24,
    ease: easeOutQuart
  },
  spring: {
    type: "spring",
    stiffness: 260,
    damping: 24,
    mass: 0.8
  }
} as const;

export const viewport = {
  once: true,
  amount: 0.24
} as const;
