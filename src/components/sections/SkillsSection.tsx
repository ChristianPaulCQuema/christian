import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillsCategories } from "@/data/skills";
import type { SkillCategory, SkillTechnology } from "@/data/skills";

export function SkillsSection() {
  return (
    <section id="skills" className="section skills-section ambient-section bg-white dark:bg-slate-950">
      <div className="skills-container mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Skills"
          title="Skills & Technologies"
          description="A practical toolkit for building, deploying, and supporting modern applications."
        />

        <div className="skills-category-grid">
          {skillsCategories.map((category, index) => (
            <Reveal
              key={category.title}
              className="h-full"
              delay={index * 0.045}
              variant={index % 2 === 0 ? "mask" : "fade"}
            >
              <SkillCategoryCard category={category} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCategoryCard({ category }: { category: SkillCategory }) {
  const CategoryIcon = category.icon;

  return (
    <article className="skill-category-card premium-surface interactive-card">
      <header className="skill-category-header">
        <span className="icon-tile flex h-11 w-11 flex-none items-center justify-center rounded-xl">
          <CategoryIcon className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold leading-tight text-slate-950 dark:text-white">{category.title}</h3>
          <p className="mt-1.5 text-sm leading-5 text-slate-500 dark:text-slate-400">{category.description}</p>
        </div>
      </header>

      <ul className="skill-items" aria-label={`${category.title} technologies`}>
        {category.skills.map((skill, index) => (
          <TechnologyItem key={skill.name} skill={skill} index={index} />
        ))}
      </ul>
    </article>
  );
}

function TechnologyItem({ skill, index }: { skill: SkillTechnology; index: number }) {
  const Icon = skill.icon;
  const style = {
    "--skill-color": skill.color,
    "--skill-motion-duration": `${22 + (index % 3) * 2}s`
  } as CSSProperties;
  const directionClass = index % 3 === 1 ? "skill-motion-down" : "skill-motion-up";

  return (
    <li className="tech-item" style={style} title={skill.name}>
      <span className={`skill-motion ${directionClass}`}>
        <span className="tech-icon-box">
          <Icon className="tech-logo" style={{ color: skill.color }} aria-hidden />
        </span>
        <span className="tech-name">{skill.name}</span>
      </span>
    </li>
  );
}
