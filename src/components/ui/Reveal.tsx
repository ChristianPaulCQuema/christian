import { createElement } from "react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "fade" | "mask" | "blur" | "slide";
  as?: "div" | "section" | "article" | "li";
};

export function Reveal({ children, className, as = "div" }: RevealProps) {
  return createElement(as, { className: ["min-w-0", className].filter(Boolean).join(" ") }, children);
}
