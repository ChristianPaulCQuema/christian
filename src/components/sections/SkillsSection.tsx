"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Hand, MousePointerClick } from "lucide-react";
import type { CSSProperties, KeyboardEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SkillsGlobe } from "@/components/three/SkillsGlobe";
import type { GlobeSkill } from "@/components/three/SkillsGlobe";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillsCategories } from "@/data/skills";
import { easeOutQuart } from "@/lib/motion";

const globeSkills: GlobeSkill[] = (() => {
  const seen = new Set<string>();
  const list: GlobeSkill[] = [];

  for (const category of skillsCategories) {
    for (const skill of category.skills) {
      if (!seen.has(skill.name)) {
        seen.add(skill.name);
        list.push({ ...skill, category: category.title });
      }
    }
  }

  return list;
})();

const half = Math.ceil(globeSkills.length / 2);
const marqueeRows = [globeSkills.slice(0, half), globeSkills.slice(half)].map((row) => [...row, ...row]);

const tileVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: easeOutQuart } }
};

export function SkillsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const tabListRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const category = skillsCategories[activeIndex];
  const CategoryIcon = category.icon;

  // Clear the globe highlight after a moment.
  useEffect(() => {
    if (!highlighted) {
      return;
    }

    const timer = window.setTimeout(() => setHighlighted(null), 1800);
    return () => window.clearTimeout(timer);
  }, [highlighted]);

  // Keep the active tab visible when the tab row scrolls sideways (mobile).
  useEffect(() => {
    const container = tabListRef.current;
    const tab = tabRefs.current[activeIndex];

    if (!container || !tab || container.scrollWidth <= container.clientWidth) {
      return;
    }

    container.scrollTo({ left: tab.offsetLeft - (container.clientWidth - tab.offsetWidth) / 2, behavior: "smooth" });
  }, [activeIndex]);

  const selectFromGlobe = useCallback((skill: GlobeSkill) => {
    const nextIndex = skillsCategories.findIndex((item) => item.title === skill.category);

    if (nextIndex >= 0) {
      setActiveIndex(nextIndex);
    }

    setHighlighted(skill.name);
  }, []);

  function handleTabKeys(event: KeyboardEvent<HTMLDivElement>) {
    const last = skillsCategories.length - 1;
    let next: number | null = null;

    if (event.key === "ArrowRight") next = activeIndex === last ? 0 : activeIndex + 1;
    if (event.key === "ArrowLeft") next = activeIndex === 0 ? last : activeIndex - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;

    if (next === null) {
      return;
    }

    event.preventDefault();
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section id="skills" className="section skills-section ambient-section bg-white dark:bg-slate-950">
      <div className="skills-container mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Skills"
          title="Skills & Technologies"
          description="A practical toolkit for building, deploying, and supporting modern applications. Spin the globe or pick a category to explore."
        />

        <Reveal variant="fade" className="block">
          <SkillsMarquee />
        </Reveal>

        <div className="skills-stage">
          <Reveal variant="scale" className="relative">
            <SkillsGlobe skills={globeSkills} activeCategory={category.title} onSelect={selectFromGlobe} />
            <p className="skills-globe-hint" aria-live="polite">
              {highlighted ? (
                <>
                  <MousePointerClick size={14} aria-hidden="true" />
                  <span>
                    <strong className="text-slate-900 dark:text-white">{highlighted}</strong> in {category.title}
                  </span>
                </>
              ) : (
                <>
                  <Hand size={14} aria-hidden="true" />
                  <span>Drag to spin. Tap an icon to explore.</span>
                </>
              )}
            </p>
          </Reveal>

          <Reveal variant="right" delay={0.1}>
            <div className="skills-explorer premium-surface rounded-[1.5rem] p-4 sm:p-6">
              <div
                ref={tabListRef}
                role="tablist"
                aria-label="Skill categories"
                className="skills-tabs"
                onKeyDown={handleTabKeys}
              >
                {skillsCategories.map((item, index) => {
                  const Icon = item.icon;
                  const selected = index === activeIndex;

                  return (
                    <button
                      key={item.title}
                      ref={(node) => {
                        tabRefs.current[index] = node;
                      }}
                      id={`skills-tab-${index}`}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      aria-controls="skills-panel"
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setActiveIndex(index)}
                      className="skills-tab"
                    >
                      {selected ? (
                        <motion.span
                          layoutId="skills-tab-pill"
                          className="skills-tab-pill"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      ) : null}
                      <Icon className="h-4 w-4" aria-hidden />
                      {item.title}
                    </button>
                  );
                })}
              </div>

              <div id="skills-panel" role="tabpanel" aria-labelledby={`skills-tab-${activeIndex}`} className="mt-5">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.28, ease: easeOutQuart }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="icon-tile flex h-11 w-11 flex-none items-center justify-center rounded-xl">
                          <CategoryIcon className="h-5 w-5" aria-hidden />
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-lg font-semibold leading-tight text-slate-950 dark:text-white">{category.title}</h3>
                          <p className="mt-0.5 text-sm leading-5 text-slate-500 dark:text-slate-400">{category.description}</p>
                        </div>
                      </div>
                      <span className="hidden flex-none rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 sm:inline-flex">
                        {category.skills.length} tools
                      </span>
                    </div>

                    <motion.ul
                      className="skills-tile-grid mt-6"
                      aria-label={`${category.title} technologies`}
                      initial="hidden"
                      animate="show"
                      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045 } } }}
                    >
                      {category.skills.map((skill, index) => {
                        const Icon = skill.icon;
                        const style = {
                          "--skill-color": skill.color,
                          "--float-delay": `${(-index * 0.45).toFixed(2)}s`
                        } as CSSProperties;

                        return (
                          <motion.li
                            key={skill.name}
                            className={`skill-tile${highlighted === skill.name ? " is-highlighted" : ""}`}
                            style={style}
                            variants={tileVariants}
                          >
                            <div className="skill-tile-inner" title={skill.name}>
                              <span className="skill-tile-icon">
                                <Icon style={{ color: skill.color }} aria-hidden />
                              </span>
                              <span className="skill-tile-name">{skill.name}</span>
                            </div>
                          </motion.li>
                        );
                      })}
                    </motion.ul>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SkillsMarquee() {
  return (
    <div className="skills-marquee-stack" aria-hidden="true">
      {marqueeRows.map((row, rowIndex) => (
        <div className="skills-marquee" key={rowIndex}>
          <div className={`skills-marquee-track${rowIndex % 2 === 1 ? " is-reverse" : ""}`}>
            {row.map((skill, index) => {
              const Icon = skill.icon;
              const style = { "--skill-color": skill.color } as CSSProperties;

              return (
                <span className="skills-marquee-chip" style={style} key={`${skill.name}-${index}`}>
                  <span className="skills-marquee-chip-icon">
                    <Icon style={{ color: skill.color }} aria-hidden />
                  </span>
                  <span className="skills-marquee-chip-name">{skill.name}</span>
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
