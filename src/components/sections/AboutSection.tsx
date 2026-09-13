import { CheckCircle2 } from "lucide-react";
import { AnimatedWords } from "@/components/motion/AnimatedWords";
import { CountUp } from "@/components/motion/CountUp";
import { TiltCard } from "@/components/motion/TiltCard";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillsCategories } from "@/data/skills";

const technologyCount = new Set(skillsCategories.flatMap((category) => category.skills.map((skill) => skill.name))).size;

const stats = [
  { value: projects.length, label: "Projects built" },
  { value: technologyCount, label: "Technologies" },
  { value: skillsCategories.length, label: "Skill areas" }
];

export function AboutSection() {
  return (
    <section id="about" className="section ambient-section bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <Reveal variant="slide">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">About Me</p>
            </Reveal>
            <AnimatedWords
              as="h2"
              text="Practical developer, support-minded thinker."
              className="mt-4 max-w-md text-[clamp(2.4rem,6vw,5.2rem)] font-semibold leading-[0.95] text-slate-950 dark:text-white"
            />
            <Reveal variant="slide" delay={0.15}>
              <div className="mt-7 h-px w-28 bg-gradient-to-r from-emerald-700 to-transparent" />
              <p className="mt-5 max-w-sm text-sm leading-7 text-slate-500 dark:text-slate-400">
                I build with the realities of users, systems, support, and maintenance in mind.
              </p>
            </Reveal>

            <div className="mt-7 grid max-w-md grid-cols-3 gap-3">
              {stats.map((stat, index) => (
                <Reveal key={stat.label} delay={0.1 + index * 0.08} variant="scale">
                  <div className="about-stat premium-surface rounded-2xl px-2 py-4 text-center">
                    <p className="text-3xl font-semibold text-slate-950 dark:text-white">
                      <CountUp value={stat.value} />
                    </p>
                    <p className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
                      {stat.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <Reveal variant="mask">
              <div className="premium-surface rounded-[1.35rem] p-6 sm:p-7">
                <div className="space-y-4 text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-8">
                  {profile.about.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {profile.highlights.map((highlight, index) => (
                <Reveal key={highlight} delay={index * 0.07} variant="blur">
                  <TiltCard className="rounded-2xl" max={10}>
                    <div className="interactive-card premium-surface group rounded-2xl p-3.5">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 transition duration-300 group-hover:rotate-12 group-hover:scale-110 dark:bg-emerald-950 dark:text-emerald-300">
                          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <p className="font-semibold text-slate-950 dark:text-white">{highlight}</p>
                      </div>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
