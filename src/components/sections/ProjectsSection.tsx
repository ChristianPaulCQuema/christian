import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  return (
    <section id="projects" className="section ambient-section bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Compact project previews with full details"
          description="Filter the work, then hover a card on desktop or tap it on mobile to view the description, problem, solution, and customization options."
        />

        <ProjectsGrid projects={projects} />
      </div>
    </section>
  );
}
