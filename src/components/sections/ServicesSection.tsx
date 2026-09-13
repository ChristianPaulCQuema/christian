import { ArrowRight } from "lucide-react";
import { TiltCard } from "@/components/motion/TiltCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";

export function ServicesSection() {
  return (
    <section id="services" className="section ambient-section bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          title="Focused services for real applications"
          description="Clear, practical development and support services for projects, teams, and small business workflows."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={index * 0.06} variant={index % 2 === 0 ? "mask" : "blur"} className="h-full">
                <TiltCard className="h-full rounded-[1.35rem]" max={8}>
                  <article className="interactive-card premium-surface group relative h-full overflow-hidden rounded-[1.35rem] p-5">
                    <div
                      className={`absolute inset-x-6 top-0 h-px bg-gradient-to-r ${
                        index % 3 === 0
                          ? "from-transparent via-emerald-500 to-transparent"
                          : index % 3 === 1
                            ? "from-transparent via-cyan-500 to-transparent"
                            : "from-transparent via-slate-400 to-transparent"
                      } opacity-60 transition group-hover:opacity-100`}
                      aria-hidden="true"
                    />
                    <span className="service-index absolute right-4 top-2" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="icon-tile flex h-11 w-11 items-center justify-center rounded-xl transition duration-500 group-hover:-translate-y-1 group-hover:-rotate-6 group-hover:scale-110">
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-slate-950 dark:text-white">{service.title}</h3>
                    <p className="mt-2.5 text-sm leading-6 text-slate-600 dark:text-slate-300">{service.description}</p>
                    <div className="mt-5 flex items-center gap-3 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                      <span className="h-px w-8 bg-emerald-700 transition-[width] duration-300 group-hover:w-12 dark:bg-emerald-300" aria-hidden="true" />
                      <span>Available support</span>
                      <ArrowRight
                        size={15}
                        className="-translate-x-1 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
