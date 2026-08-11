import {
  AppWindow,
  Code2,
  Database,
  Headphones,
  LayoutDashboard,
  ServerCog,
  Smartphone
} from "lucide-react";
import type { Service } from "@/types/portfolio";

export const services: Service[] = [
  {
    title: "Full-Stack Web Development",
    description:
      "Build complete web applications from clean interfaces to backend functionality and database integration.",
    icon: Code2
  },
  {
    title: "Mobile App Development",
    description:
      "Create practical mobile application experiences using Flutter, React Native, Kotlin, and Android tools.",
    icon: Smartphone
  },
  {
    title: "Backend & API Development",
    description:
      "Develop server-side features, REST APIs, authentication flows, and application logic for real workflows.",
    icon: ServerCog
  },
  {
    title: "Database Integration",
    description:
      "Connect applications to databases and structure data for booking, dashboard, portal, and management systems.",
    icon: Database
  },
  {
    title: "Web Application Development",
    description:
      "Design and build focused web systems such as booking platforms, portals, admin dashboards, and organization sites.",
    icon: AppWindow
  },
  {
    title: "System Development",
    description:
      "Plan and build multi-role systems that support everyday operations, records, schedules, requests, and reports.",
    icon: LayoutDashboard
  },
  {
    title: "IT Technical Support",
    description:
      "Help diagnose, troubleshoot, and resolve technical issues with a calm, practical support approach.",
    icon: Headphones
  }
];
