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
import type { CSSProperties, ComponentType } from "react";
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

export type SkillIcon = ComponentType<{
  className?: string;
  style?: CSSProperties;
  "aria-hidden"?: boolean;
}>;

export type SkillTechnology = {
  name: string;
  icon: SkillIcon;
  color: string;
};

export type SkillCategory = {
  title: string;
  description: string;
  icon: SkillIcon;
  skills: SkillTechnology[];
};

export const skillsCategories: SkillCategory[] = [
  {
    title: "Frontend",
    description: "Modern interfaces and client-side technologies",
    icon: Code2,
    skills: [
      { name: "HTML5", icon: SiHtml5, color: "#e34f26" },
      { name: "CSS3", icon: SiCss, color: "#663399" },
      { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
      { name: "React", icon: SiReact, color: "#61dafb" },
      { name: "Next.js", icon: SiNextdotjs, color: "#111827" },
      { name: "Vue.js", icon: SiVuedotjs, color: "#42b883" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06b6d4" },
      { name: "Bootstrap", icon: SiBootstrap, color: "#7952b3" }
    ]
  },
  {
    title: "Backend",
    description: "Server-side development and application architecture",
    icon: ServerCog,
    skills: [
      { name: "PHP", icon: SiPhp, color: "#777bb4" },
      { name: "Laravel", icon: SiLaravel, color: "#ff2d20" },
      { name: "C#", icon: SiDotnet, color: "#512bd4" },
      { name: "ASP.NET Core", icon: SiDotnet, color: "#512bd4" },
      { name: "Node.js", icon: SiNodedotjs, color: "#5fa04e" },
      { name: "Express.js", icon: SiExpress, color: "#111827" }
    ]
  },
  {
    title: "Mobile",
    description: "Cross-platform and native mobile technologies",
    icon: Smartphone,
    skills: [
      { name: "Flutter", icon: SiFlutter, color: "#02569b" },
      { name: "Dart", icon: SiDart, color: "#0175c2" },
      { name: "React Native", icon: SiReact, color: "#61dafb" },
      { name: "Kotlin", icon: SiKotlin, color: "#7f52ff" },
      { name: "Android", icon: SiAndroid, color: "#3ddc84" },
      { name: "Responsive UI", icon: Smartphone, color: "#0ea5e9" },
      { name: "State Management", icon: GitBranch, color: "#10b981" }
    ]
  },
  {
    title: "Database",
    description: "Relational, document, and embedded data storage",
    icon: Database,
    skills: [
      { name: "MySQL", icon: SiMysql, color: "#4479a1" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169e1" },
      { name: "SQL Server", icon: Database, color: "#cc2927" },
      { name: "SQLite", icon: SiSqlite, color: "#003b57" },
      { name: "MongoDB", icon: SiMongodb, color: "#47a248" }
    ]
  },
  {
    title: "APIs & Services",
    description: "Integrations, authentication, services, and automation",
    icon: PlugZap,
    skills: [
      { name: "REST APIs", icon: Network, color: "#0f766e" },
      { name: "WebSocket", icon: Cable, color: "#2563eb" },
      { name: "Webhooks", icon: Webhook, color: "#0ea5e9" },
      { name: "JWT", icon: SiJsonwebtokens, color: "#d63aff" },
      { name: "OAuth 2.0", icon: SiAuth0, color: "#eb5424" },
      { name: "Supabase", icon: SiSupabase, color: "#3ecf8e" },
      { name: "Firebase", icon: SiFirebase, color: "#ffca28" },
      { name: "AI APIs", icon: Bot, color: "#10a37f" },
      { name: "LLM Integration", icon: BrainCircuit, color: "#7c3aed" },
      { name: "n8n", icon: SiN8N, color: "#ea4b71" },
      { name: "API Automation", icon: Workflow, color: "#0ea5e9" }
    ]
  },
  {
    title: "Tools & Platforms",
    description: "Development workflow, delivery, and testing tools",
    icon: Wrench,
    skills: [
      { name: "Git", icon: SiGit, color: "#f05032" },
      { name: "GitHub", icon: SiGithub, color: "#181717" },
      { name: "Docker", icon: SiDocker, color: "#2496ed" },
      { name: "Postman", icon: SiPostman, color: "#ff6c37" },
      { name: "CI/CD", icon: SiGithubactions, color: "#2088ff" }
    ]
  },
  {
    title: "IT Technical Support",
    description: "Troubleshooting, user support, and system handling",
    icon: Headphones,
    skills: [
      { name: "Troubleshooting", icon: MonitorCog, color: "#0f766e" },
      { name: "Problem Solving", icon: BrainCircuit, color: "#7c3aed" },
      { name: "System Support", icon: LifeBuoy, color: "#0284c7" },
      { name: "User Support", icon: Users, color: "#059669" },
      { name: "Hardware & Software", icon: HardDrive, color: "#475569" }
    ]
  }
];
