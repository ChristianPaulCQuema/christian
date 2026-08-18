"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import type { Project } from "@/types/portfolio";

type ProjectPreviewButtonProps = {
  title: string;
  images: Project["images"];
  variant?: "dark" | "light";
};

export function ProjectPreviewButton({ title, images, variant = "light" }: ProjectPreviewButtonProps) {
  const previewImages = useMemo(() => {
    const seen = new Set<string>();

    return images.filter((image) => {
      if (!image?.src || seen.has(image.src)) {
        return false;
      }

      seen.add(image.src);
      return true;
    });
  }, [images]);

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const safeActiveIndex = Math.min(activeIndex, Math.max(previewImages.length - 1, 0));
  const activeImage = previewImages[safeActiveIndex] ?? previewImages[0];
  const hasMultipleImages = previewImages.length > 1;

  useEffect(() => {
    if (!isOpen || previewImages.length === 0) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
      if (event.key === "ArrowRight" && hasMultipleImages) {
        setActiveIndex((index) => (index + 1) % previewImages.length);
      }
      if (event.key === "ArrowLeft" && hasMultipleImages) {
        setActiveIndex((index) => (index - 1 + previewImages.length) % previewImages.length);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [hasMultipleImages, isOpen, previewImages.length]);

  if (!activeImage || previewImages.length === 0) {
    return null;
  }

  const buttonClass =
    variant === "dark"
      ? "btn-dark inline-flex w-fit items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950"
      : "inline-flex items-center gap-2 rounded-full border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800 transition hover:border-emerald-300 hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 dark:border-slate-700 dark:text-slate-100 dark:hover:border-emerald-600 dark:hover:bg-emerald-950/40";

  const modal = (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[100] bg-slate-950/85 p-3 backdrop-blur-sm sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} UI screenshots`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsOpen(false);
            }
          }}
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0 }}
        >
          <motion.div
            className="mx-auto flex h-full max-h-full max-w-7xl flex-col overflow-hidden rounded-lg border border-white/10 bg-white shadow-2xl dark:bg-slate-950"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: 12, scale: 0.99 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <header className="flex items-center justify-between gap-4 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">{title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Screenshot {safeActiveIndex + 1} of {previewImages.length}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
                aria-label="Close preview"
              >
                <X size={19} aria-hidden="true" />
              </button>
            </header>

            <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(0,1fr)_220px]">
              <div className="relative min-h-0 bg-slate-100 dark:bg-slate-900">
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  sizes="(min-width: 1024px) calc(100vw - 280px), 100vw"
                  className="object-contain"
                />
                {hasMultipleImages ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setActiveIndex((index) => (index - 1 + previewImages.length) % previewImages.length)}
                      className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 dark:bg-slate-950/90 dark:text-white"
                      aria-label="Previous screenshot"
                    >
                      <ChevronLeft size={20} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveIndex((index) => (index + 1) % previewImages.length)}
                      className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 dark:bg-slate-950/90 dark:text-white"
                      aria-label="Next screenshot"
                    >
                      <ChevronRight size={20} aria-hidden="true" />
                    </button>
                  </>
                ) : null}
              </div>

              {hasMultipleImages ? (
                <div className="grid max-h-48 grid-cols-3 gap-2 overflow-auto border-t border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950 lg:max-h-none lg:grid-cols-1 lg:border-l lg:border-t-0">
                  {previewImages.map((image, index) => (
                    <button
                      key={image.src}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`relative aspect-[16/10] overflow-hidden rounded-md border bg-slate-100 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${
                        index === safeActiveIndex ? "border-emerald-600 ring-2 ring-emerald-200" : "border-slate-200 dark:border-slate-700"
                      }`}
                      aria-label={`Show screenshot ${index + 1}`}
                    >
                      <Image src={image.src} alt={image.alt} fill sizes="180px" className="object-cover object-top" />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setActiveIndex(0);
          setIsOpen(true);
        }}
        className={buttonClass}
      >
        Preview UI
        <Images size={variant === "dark" ? 16 : 15} aria-hidden="true" />
      </button>

      {typeof document === "undefined" ? null : createPortal(modal, document.body)}
    </>
  );
}
