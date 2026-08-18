"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Images, Sparkles, X } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { ProjectPreviewButton } from "@/components/projects/ProjectPreviewButton";
import type { Project } from "@/types/portfolio";

const MIN_IMAGES_FOR_UI_PREVIEW = 10;
type OpenMode = "hover" | "click" | null;

export function ProjectShowcaseCard({ project }: { project: Project }) {
  const [openMode, setOpenMode] = useState<OpenMode>(null);
  const prefersReducedMotion = useReducedMotion();
  const image = project.images[0] ?? null;
  const canPreviewUi = project.images.length >= MIN_IMAGES_FOR_UI_PREVIEW;
  const isOpen = openMode !== null;
  const isClickOpen = openMode === "click";

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMode(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const modal = useMemo(
    () => (
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className={`fixed inset-0 z-[100] p-3 sm:p-5 ${
              isClickOpen ? "bg-slate-950/82 backdrop-blur-sm" : "bg-slate-950/42"
            }`}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} project details`}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setOpenMode(null);
              }
            }}
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: isClickOpen ? 0.14 : 0.08 }}
          >
            <motion.div
              onPointerLeave={(event) => {
                if (!isClickOpen && event.pointerType === "mouse") {
                  setOpenMode(null);
                }
              }}
              className={`mx-auto grid overflow-y-auto rounded-xl border border-white/10 bg-white shadow-2xl dark:bg-slate-950 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] ${
                isClickOpen
                  ? "max-h-[calc(100dvh-2rem)] max-w-5xl overflow-y-auto"
                  : "max-h-[calc(100dvh-2rem)] max-w-4xl"
              }`}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10, scale: 0.99 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: 8, scale: 0.995 }}
              transition={{ duration: isClickOpen ? 0.16 : 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bg-slate-950 p-3">
                {image ? (
                  <div className="image-frame">
                    <div className="relative aspect-[16/9] w-full bg-slate-950">
                      <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-contain object-top" />
                    </div>
                  </div>
                ) : (
                  <div className="grid aspect-[16/10] place-items-center rounded-lg border border-white/10 bg-slate-900 text-sm text-slate-400">
                    Project details
                  </div>
                )}
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-semibold text-slate-300">
                  <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                    <span className="block text-slate-500">Screens</span>
                    <span className="mt-1 block text-base text-white">{project.images.length}</span>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                    <span className="block text-slate-500">Preview</span>
                    <span className="mt-1 block text-base text-white">{canPreviewUi ? "Full UI" : "Demo link"}</span>
                  </div>
                </div>
              </div>

              <div className="min-w-0 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">{project.category}</p>
                    <h3 className="mt-2 text-2xl font-semibold leading-tight text-slate-950 dark:text-white">{project.title}</h3>
                  </div>
                  {isClickOpen ? (
                    <button
                      type="button"
                      onClick={() => setOpenMode(null)}
                      className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
                      aria-label="Close project details"
                    >
                      <X size={19} aria-hidden="true" />
                    </button>
                  ) : null}
                </div>

                <div className="mt-5 grid gap-3">
                  <DetailBlock title="Description" text={project.description} compact={!isClickOpen} />
                  <DetailBlock title="Problem" text={project.problem} compact={!isClickOpen} />
                  <DetailBlock title="How the system solves it" text={project.solution} compact={!isClickOpen} />
                  <DetailBlock title="Can be customized" text={project.customizable} compact={!isClickOpen} icon={<Sparkles size={16} aria-hidden="true" />} />
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.focus.map((item) => (
                    <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                      {item}
                    </span>
                  ))}
                </div>

                {isClickOpen ? (
                <div className="mt-6 flex flex-wrap gap-3">
                  {canPreviewUi ? <ProjectPreviewButton title={project.title} images={project.images} variant="dark" /> : null}
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-emerald-300 hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 dark:border-slate-700 dark:text-slate-100 dark:hover:border-emerald-600 dark:hover:bg-emerald-950/40"
                    >
                      Demo Link
                      <ExternalLink size={16} aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
                ) : (
                  <p className="mt-5 text-xs font-semibold text-slate-500 dark:text-slate-400">Click the project to keep this open.</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    ),
    [canPreviewUi, image, isClickOpen, isOpen, prefersReducedMotion, project]
  );

  return (
    <>
      <article
        className="interactive-card premium-surface group flex h-full min-w-0 cursor-pointer flex-col rounded-[1.1rem] p-2.5 transition-transform duration-150 hover:-translate-y-0.5"
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") {
            setOpenMode("hover");
          }
        }}
      >
        {image ? (
          <div className="image-frame">
            <div className="relative aspect-[16/8.5] w-full bg-slate-950">
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 100vw" className="object-contain object-top transition-transform duration-300 group-hover:scale-[1.012]" />
            </div>
          </div>
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col p-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="line-clamp-1 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-300">{project.category}</p>
              <h3 className="mt-2 text-lg font-semibold leading-tight text-slate-950 dark:text-white">{project.title}</h3>
            </div>
            <ArrowUpRight className="mt-1 h-5 w-5 flex-none text-slate-400 transition group-hover:text-emerald-700" aria-hidden="true" />
          </div>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{project.summary}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {project.focus.slice(0, 2).map((item) => (
              <span key={item} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                {item}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap gap-2 pt-4">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setOpenMode("click");
              }}
              className="btn-dark inline-flex min-h-10 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950"
            >
              Details
              <Images size={15} aria-hidden="true" />
            </button>
            {canPreviewUi ? (
              <span className="inline-flex min-h-10 items-center rounded-full border border-slate-200 px-3 py-2 text-xs font-bold text-slate-500 dark:border-slate-700 dark:text-slate-400">
                UI modal available
              </span>
            ) : project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800 transition hover:border-emerald-300 hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 dark:border-slate-700 dark:text-slate-100 dark:hover:border-emerald-600 dark:hover:bg-emerald-950/40"
              >
                Demo
                <ExternalLink size={15} aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>
      </article>

      {typeof document === "undefined" ? null : createPortal(modal, document.body)}
    </>
  );
}

function DetailBlock({ title, text, icon, compact = false }: { title: string; text: string; icon?: ReactNode; compact?: boolean }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/70">
      <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.13em] text-slate-500 dark:text-slate-400">
        {icon}
        {title}
      </h4>
      <p className={`mt-1.5 text-sm leading-6 text-slate-700 dark:text-slate-200 ${compact ? "line-clamp-2" : ""}`}>{text}</p>
    </section>
  );
}
