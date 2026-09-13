import { AnimatedWords } from "@/components/motion/AnimatedWords";
import { Reveal } from "@/components/ui/Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  inverted?: boolean;
  index?: string;
  align?: "center" | "left";
};

export function SectionHeading({ eyebrow, title, description, inverted = false, index, align = "center" }: SectionHeadingProps) {
  void index;
  const centered = align === "center";

  return (
    <div className={`mb-8 max-w-3xl md:mb-10 ${centered ? "mx-auto text-center" : "text-left"}`}>
      <Reveal variant="fade" className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
        <span className="section-eyebrow-line" aria-hidden="true" />
        <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${inverted ? "text-emerald-300" : "text-emerald-700 dark:text-emerald-300"}`}>
          {eyebrow}
        </p>
        {centered ? <span className="section-eyebrow-line is-reverse" aria-hidden="true" /> : null}
      </Reveal>
      <AnimatedWords
        as="h2"
        text={title}
        className={`mt-3 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl ${inverted ? "text-white" : "text-slate-950 dark:text-white"}`}
      />
      {description ? (
        <Reveal variant="fade" delay={0.15}>
          <p className={`mt-4 text-base leading-7 ${inverted ? "text-slate-300" : "text-slate-600 dark:text-slate-300"}`}>{description}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
