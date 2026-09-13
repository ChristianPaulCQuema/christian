"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { TiltCard } from "@/components/motion/TiltCard";
import { MIN_IMAGES_FOR_UI_PREVIEW, ProjectShowcaseCard } from "@/components/projects/ProjectShowcaseCard";
import { Reveal } from "@/components/ui/Reveal";
import { easeOutQuart } from "@/lib/motion";
import type { Project } from "@/types/portfolio";

type FilterKey = "all" | "live" | "gallery";

const filters: { key: FilterKey; label: string; matches: (project: Project) => boolean }[] = [
  { key: "all", label: "All projects", matches: () => true },
  { key: "live", label: "Live demos", matches: (project) => Boolean(project.liveUrl) },
  { key: "gallery", label: "Full UI galleries", matches: (project) => project.images.length >= MIN_IMAGES_FOR_UI_PREVIEW }
];

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const counts = useMemo(() => {
    const result = { all: 0, live: 0, gallery: 0 } as Record<FilterKey, number>;
    for (const filter of filters) {
      result[filter.key] = projects.filter(filter.matches).length;
    }
    return result;
  }, [projects]);

  const visibleProjects = useMemo(() => {
    const filter = filters.find((item) => item.key === activeFilter) ?? filters[0];
    return projects.filter(filter.matches);
  }, [activeFilter, projects]);

  return (
    <>
      <Reveal variant="fade" className="mb-7 flex justify-center">
        <div role="group" aria-label="Filter projects" className="project-filters">
          {filters.map((filter) => {
            const selected = filter.key === activeFilter;

            return (
              <button
                key={filter.key}
                type="button"
                aria-pressed={selected}
                onClick={() => setActiveFilter(filter.key)}
                className={`project-filter${selected ? " is-active" : ""}`}
              >
                {selected ? (
                  <motion.span
                    layoutId="project-filter-pill"
                    className="project-filter-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span>{filter.label}</span>
                <span className="project-filter-count">{counts[filter.key]}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <motion.div layout className="grid min-w-0 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {visibleProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              transition={{ duration: 0.4, ease: easeOutQuart }}
              className="h-full min-w-0"
            >
              <Reveal className="h-full" delay={index * 0.06} variant="fade">
                <TiltCard className="h-full rounded-[1.1rem]" max={6}>
                  <ProjectShowcaseCard project={project} />
                </TiltCard>
              </Reveal>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
