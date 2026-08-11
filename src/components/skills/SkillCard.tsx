import type { SkillGroup } from "@/types/portfolio";

export function SkillCard({ group }: { group: SkillGroup }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
      <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{group.category}</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </article>
  );
}
