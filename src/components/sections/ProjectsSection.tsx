import { projects } from "@/data/projects";
import { ProjectShowcaseCard } from "@/components/projects/ProjectShowcaseCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProjectsSection() {
  return (
    <section id="projects" className="section ambient-section bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Compact project previews with full details"
          description="Hover a project on desktop or tap Details on mobile to view the description, problem, solution, and customization options."
        />

        <div className="grid min-w-0 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {projects.map((project) => (
            <Reveal key={project.slug} className="h-full">
              <ProjectShowcaseCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
