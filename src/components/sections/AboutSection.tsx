import { CheckCircle2 } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal } from "@/components/ui/Reveal";

export function AboutSection() {
  return (
    <section id="about" className="section ambient-section bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <Reveal variant="slide">
            <div className="lg:sticky lg:top-24">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">About Me</p>
              <h2 className="mt-4 max-w-md text-[clamp(2.4rem,6vw,5.2rem)] font-semibold leading-[0.95] text-slate-950 dark:text-white">
                Practical developer, support-minded thinker.
              </h2>
              <div className="mt-7 h-px w-28 bg-gradient-to-r from-emerald-700 to-transparent" />
              <p className="mt-5 max-w-sm text-sm leading-7 text-slate-500 dark:text-slate-400">
                I build with the realities of users, systems, support, and maintenance in mind.
              </p>
            </div>
          </Reveal>

          <div>
            <Reveal variant="mask">
              <div className="premium-surface rounded-[1.35rem] p-6 sm:p-8">
                <div className="space-y-6 text-lg leading-9 text-slate-600 dark:text-slate-300">
                  {profile.about.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {profile.highlights.map((highlight, index) => (
                <Reveal key={highlight} delay={index * 0.05} variant="blur">
                  <div className="interactive-card premium-surface group rounded-2xl p-4 transition hover:-translate-y-1">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 transition group-hover:scale-105 dark:bg-emerald-950 dark:text-emerald-300">
                        <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="font-semibold text-slate-950 dark:text-white">{highlight}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
