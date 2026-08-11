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

  return (
    <div className={`mb-10 max-w-3xl md:mb-14 ${align === "center" ? "mx-auto text-center" : "text-left"}`}>
      <div className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
        <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${inverted ? "text-emerald-300" : "text-emerald-700"}`}>
          {eyebrow}
        </p>
      </div>
      <h2 className={`mt-3 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl ${inverted ? "text-white" : "text-slate-950 dark:text-white"}`}>{title}</h2>
      {description ? <p className={`mt-4 text-base leading-7 ${inverted ? "text-slate-300" : "text-slate-600 dark:text-slate-300"}`}>{description}</p> : null}
    </div>
  );
}
