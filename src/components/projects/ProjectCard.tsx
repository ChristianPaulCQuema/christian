import { ArrowUpRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import { ProjectPreviewButton } from "@/components/projects/ProjectPreviewButton";
import type { Project } from "@/types/portfolio";

export function ProjectCard({ project }: { project: Project }) {
  const image = project.images[0] ?? null;
  const hasImages = image !== null;

  return (
    <article className="interactive-card premium-surface group flex h-full min-w-0 flex-col rounded-[1.25rem] p-2 transition-transform duration-150 hover:-translate-y-0.5 active:scale-[0.998] sm:rounded-[1.35rem] sm:p-3">
      {hasImages ? (
        <div className="image-frame">
          <div className="relative aspect-[16/10] w-full bg-slate-950">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-contain object-top transition-transform duration-300 group-hover:scale-[1.015]"
            />
          </div>
        </div>
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">{project.category}</p>
            <h3 className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">{project.title}</h3>
          </div>
          <ArrowUpRight className="mt-1 h-5 w-5 flex-none text-slate-400 transition group-hover:text-emerald-700" aria-hidden="true" />
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{project.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.focus.slice(0, 4).map((item) => (
            <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-900 dark:text-slate-300">
              {item}
            </span>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap gap-3 pt-5">
          {hasImages ? <ProjectPreviewButton title={project.title} images={project.images} /> : null}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800 transition duration-150 hover:border-emerald-300 hover:bg-emerald-50 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 dark:border-slate-700 dark:text-slate-100 dark:hover:border-emerald-600 dark:hover:bg-emerald-950/40"
            >
              Live Site
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
