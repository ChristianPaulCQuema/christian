import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { ProjectPreviewButton } from "@/components/projects/ProjectPreviewButton";
import type { Project } from "@/types/portfolio";

export function FeaturedProject({ project, reverse = false }: { project: Project; reverse?: boolean }) {
  const image = project.images[0] ?? null;
  const hasImages = image !== null;

  return (
    <article
      className={`interactive-card premium-surface group grid min-w-0 gap-0 rounded-[1.25rem] p-2 transition-transform duration-150 active:scale-[0.998] sm:rounded-[1.6rem] sm:p-3 md:p-4 ${
        hasImages ? "md:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]" : ""
      }`}
    >
      {hasImages ? (
        <div className={`image-frame ${reverse ? "md:order-2" : ""}`}>
          <div className="relative aspect-[16/10] w-full bg-slate-950">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 54vw, 100vw"
              className="object-contain object-top transition-transform duration-300 group-hover:scale-[1.015]"
              priority={project.slug === "ptc-workwise"}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/20 via-transparent to-emerald-400/10 opacity-70 transition-opacity duration-150 group-hover:opacity-40" />
          </div>
        </div>
      ) : null}
      <div className="flex min-w-0 flex-col justify-center p-4 sm:p-8">
        <div className="h-px w-24 bg-gradient-to-r from-emerald-600/45 to-transparent" />
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">{project.category}</p>
        <h3 className="mt-3 text-[clamp(1.75rem,8vw,2.4rem)] font-semibold leading-tight text-slate-950 dark:text-white sm:text-4xl">{project.title}</h3>
        <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">{project.description}</p>
        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          {project.focus.map((item) => (
            <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition group-hover:border-emerald-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
              {item}
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {hasImages ? <ProjectPreviewButton title={project.title} images={project.images} variant="dark" /> : null}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-800 transition duration-150 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 dark:border-slate-700 dark:text-slate-100 dark:hover:border-emerald-600 dark:hover:bg-emerald-950/40"
            >
              Visit Live Site
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
