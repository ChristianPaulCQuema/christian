import { services } from "@/data/services";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ServicesSection() {
  return (
    <section id="services" className="section ambient-section bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          title="Focused services for real applications"
          description="Clear, practical development and support services for projects, teams, and small business workflows."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={index * 0.04} variant={index % 2 === 0 ? "mask" : "blur"}>
                <article className="interactive-card premium-surface group relative h-full overflow-hidden rounded-[1.35rem] p-6 transition duration-300 hover:-translate-y-1">
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
                  <div className="flex items-start justify-between gap-5">
                    <div className="icon-tile flex h-12 w-12 items-center justify-center rounded-xl transition duration-300 group-hover:-translate-y-1">
                      <Icon size={22} aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="mt-7 text-xl font-semibold text-slate-950 dark:text-white">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{service.description}</p>
                  <div className="mt-7 flex items-center gap-3 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                    <span className="h-px w-8 bg-emerald-700 transition-[width] duration-200 group-hover:w-12 dark:bg-emerald-300" aria-hidden="true" />
                    <span>Available support</span>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
