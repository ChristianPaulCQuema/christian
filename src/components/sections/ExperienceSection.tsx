"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { experienceItems } from "@/data/experience";
import { transitions } from "@/lib/motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ExperienceSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 70%", "end 35%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.5 });
  const railScale = useTransform(progress, [0, 1], [0.04, 1]);

  return (
    <section id="experience" className="section ambient-section bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="A timeline grounded in real project work"
          description="Development work, IT support experience, and BSIT education, presented only with the background provided."
        />

        <div ref={timelineRef} className="relative">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-slate-200 dark:bg-slate-800 sm:block" aria-hidden="true" />
          <motion.div
            className="absolute left-4 top-0 hidden h-full w-px origin-top bg-gradient-to-b from-emerald-600 via-cyan-600 to-emerald-600 sm:block"
            style={{ scaleY: prefersReducedMotion ? 1 : railScale }}
            aria-hidden="true"
          />
          <div className="space-y-7">
            {experienceItems.map((item, index) => (
              <Reveal key={item.role} delay={index * 0.06} variant={index % 2 === 0 ? "mask" : "slide"}>
                <article className="interactive-card premium-surface relative rounded-[1.35rem] p-6 shadow-sm sm:ml-12">
                  <span className="absolute -left-[43px] top-8 hidden h-5 w-5 rounded-full border-4 border-slate-50 bg-emerald-700 shadow-[0_0_0_7px_rgb(4_120_87_/_0.08)] dark:border-slate-950 sm:block" aria-hidden="true" />
                  <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
                        Experience
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">{item.role}</h3>
                      <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">{item.context}</p>
                    </div>
                    <div>
                      <p className="leading-7 text-slate-600 dark:text-slate-300">{item.summary}</p>
                      <ul className="mt-5 grid gap-3">
                        {item.responsibilities.map((responsibility) => (
                          <li key={responsibility} className="flex gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-emerald-700 dark:bg-emerald-300" aria-hidden="true" />
                            <span>{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                      {item.tools ? (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {item.tools.map((tool) => (
                            <motion.span
                              key={tool}
                              whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                              transition={transitions.quick}
                              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                            >
                              {tool}
                            </motion.span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
