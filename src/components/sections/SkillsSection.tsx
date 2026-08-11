"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Bot,
  BrainCircuit,
  Cable,
  Code2,
  Database,
  GitBranch,
  HardDrive,
  Headphones,
  LifeBuoy,
  MonitorCog,
  Network,
  PlugZap,
  ServerCog,
  Smartphone,
  Users,
  Webhook,
  Workflow,
  Wrench
} from "lucide-react";
import type { ComponentType, CSSProperties } from "react";
import { useState } from "react";
import {
  SiAndroid,
  SiAuth0,
  SiBootstrap,
  SiCss,
  SiDart,
  SiDocker,
  SiDotnet,
  SiExpress,
  SiFirebase,
  SiFlutter,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiKotlin,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiN8N,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiReact,
  SiSqlite,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs
} from "react-icons/si";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups } from "@/data/skills";
import { transitions } from "@/lib/motion";

type SkillIcon = ComponentType<{ className?: string; style?: CSSProperties; "aria-hidden"?: boolean }>;

const categoryIcons = {
  Frontend: Code2,
  Backend: ServerCog,
  Mobile: Smartphone,
  Database: Database,
  "APIs & Services": PlugZap,
  "Tools & Platforms": Wrench,
  "IT Technical Support": Headphones
};

const categoryDescriptions: Record<string, string> = {
  Frontend: "Modern interfaces and client-side technologies",
  Backend: "Server-side development and application architecture",
  Mobile: "Cross-platform and native mobile technologies",
  Database: "Data storage and backend services",
  "APIs & Services": "Integrations, authentication, backend services, and automation",
  "Tools & Platforms": "Development workflow and delivery tools",
  "IT Technical Support": "Troubleshooting, user support, and real-world system handling"
};

const skillIcons: Record<string, SkillIcon> = {
  "HTML / HTML5": SiHtml5,
  "CSS / CSS3": SiCss,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  "React / React.js": SiReact,
  "Next.js": SiNextdotjs,
  "Vue.js": SiVuedotjs,
  "Tailwind CSS": SiTailwindcss,
  Bootstrap: SiBootstrap,
  PHP: SiPhp,
  Laravel: SiLaravel,
  "C#": SiDotnet,
  "ASP.NET Core": SiDotnet,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  Flutter: SiFlutter,
  Dart: SiDart,
  "React Native": SiReact,
  Kotlin: SiKotlin,
  Android: SiAndroid,
  "Android Development": SiAndroid,
  "Responsive Mobile UI": Smartphone,
  "State Management": GitBranch,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  "SQL Server": Database,
  SQLite: SiSqlite,
  MongoDB: SiMongodb,
  "REST API": Network,
  WebSocket: Cable,
  Webhooks: Webhook,
  JWT: SiJsonwebtokens,
  "OAuth 2.0": SiAuth0,
  Supabase: SiSupabase,
  Firebase: SiFirebase,
  Git: SiGit,
  GitHub: SiGithub,
  Docker: SiDocker,
  Postman: SiPostman,
  "CI/CD": SiGithubactions,
  Troubleshooting: MonitorCog,
  "Problem solving": BrainCircuit,
  "System support": LifeBuoy,
  "User support": Users,
  "Hardware and software support": HardDrive,
  "AI API Integration": Bot,
  "LLM Integration": BrainCircuit,
  n8n: SiN8N,
  "API Automation": Workflow
};

const skillColors: Record<string, string> = {
  "HTML / HTML5": "#e34f26",
  "CSS / CSS3": "#663399",
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  "React / React.js": "#61dafb",
  "Next.js": "#111827",
  "Vue.js": "#42b883",
  "Tailwind CSS": "#06b6d4",
  Bootstrap: "#7952b3",
  PHP: "#777bb4",
  Laravel: "#ff2d20",
  "C#": "#512bd4",
  "ASP.NET Core": "#512bd4",
  "Node.js": "#5fa04e",
  "Express.js": "#111827",
  Flutter: "#02569b",
  Dart: "#0175c2",
  "React Native": "#61dafb",
  Kotlin: "#7f52ff",
  Android: "#3ddc84",
  "Android Development": "#3ddc84",
  "Responsive Mobile UI": "#0ea5e9",
  "State Management": "#10b981",
  MySQL: "#4479a1",
  PostgreSQL: "#4169e1",
  "SQL Server": "#cc2927",
  SQLite: "#003b57",
  MongoDB: "#47a248",
  "REST API": "#0f766e",
  WebSocket: "#2563eb",
  Webhooks: "#0ea5e9",
  JWT: "#d63aff",
  "OAuth 2.0": "#eb5424",
  Supabase: "#3ecf8e",
  Firebase: "#ffca28",
  Git: "#f05032",
  GitHub: "#181717",
  Docker: "#2496ed",
  Postman: "#ff6c37",
  "CI/CD": "#2088ff",
  Troubleshooting: "#0f766e",
  "Problem solving": "#7c3aed",
  "System support": "#0284c7",
  "User support": "#059669",
  "Hardware and software support": "#475569",
  "AI API Integration": "#10a37f",
  "LLM Integration": "#7c3aed",
  n8n: "#ea4b71",
  "API Automation": "#0ea5e9"
};

export function SkillsSection() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="skills" className="section ambient-section bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Skills" title="Skills & Technologies" />

        <div className="space-y-6">
          {skillGroups.map((group, groupIndex) => (
            <Reveal key={group.category} delay={groupIndex * 0.06} variant={groupIndex % 2 === 0 ? "mask" : "slide"}>
              <SkillCategory
                group={group}
                index={groupIndex}
                selectedSkill={selectedSkill}
                reducedMotion={Boolean(prefersReducedMotion)}
                onSelect={setSelectedSkill}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCategory({
  group,
  index,
  selectedSkill,
  reducedMotion,
  onSelect
}: {
  group: (typeof skillGroups)[number];
  index: number;
  selectedSkill: string | null;
  reducedMotion: boolean;
  onSelect: (skill: string) => void;
}) {
  const CategoryIcon = categoryIcons[group.category as keyof typeof categoryIcons] ?? Code2;
  const direction = index % 2 === 0 ? "normal" : "reverse";
  const duration = `${Math.max(16, group.skills.length * 2.8)}s`;
  const marqueeStyle = {
    "--marquee-duration": duration,
    "--marquee-direction": direction
  } as CSSProperties;

  return (
    <article className="premium-surface interactive-card overflow-hidden rounded-[1.35rem] p-4 sm:p-5 lg:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="icon-tile flex h-11 w-11 flex-none items-center justify-center rounded-2xl">
            <CategoryIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{group.category}</h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              {categoryDescriptions[group.category] ?? "Technologies and practical tools"}
            </p>
          </div>
        </div>
      </div>

      <div className="tech-marquee" style={marqueeStyle}>
        <div className="tech-marquee-track">
          <div className="tech-marquee-set">
            {group.skills.map((skill) => (
              <TechItem key={skill} skill={skill} active={selectedSkill === skill} onSelect={() => onSelect(skill)} />
            ))}
          </div>
          <div className="tech-marquee-set" aria-hidden="true">
            {group.skills.map((skill) => (
              <TechItem key={`${skill}-duplicate`} skill={skill} active={false} onSelect={() => onSelect(skill)} inert />
            ))}
          </div>
        </div>
      </div>

      {reducedMotion ? null : <span className="sr-only">This technology row moves horizontally and pauses on hover.</span>}
    </article>
  );
}

function TechItem({ skill, active, onSelect, inert = false }: { skill: string; active: boolean; onSelect: () => void; inert?: boolean }) {
  const Icon = skillIcons[skill] ?? Code2;
  const iconColor = skillColors[skill] ?? "#059669";
  const iconStyle = { "--skill-color": iconColor } as CSSProperties;

  return (
    <motion.button
      type="button"
      aria-label={inert ? undefined : skill}
      title={skill}
      tabIndex={inert ? -1 : 0}
      whileHover={inert ? undefined : { y: -4 }}
      whileTap={inert ? undefined : { scale: 0.97 }}
      transition={transitions.quick}
      onClick={inert ? undefined : onSelect}
      style={iconStyle}
      className={`tech-item group ${active ? "is-active" : ""}`}
    >
      <span className="tech-icon-box">
        <Icon className="tech-logo" style={{ color: iconColor }} aria-hidden />
      </span>
      <span className="tech-name">{skill}</span>
    </motion.button>
  );
}
