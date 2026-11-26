import type { IconType } from "react-icons";
import { FaJava } from "react-icons/fa";
import {
  SiPython, SiJavascript, SiR, SiReact, SiNextdotjs, SiHtml5, SiCss, SiTailwindcss,
  SiSpringboot, SiFlask, SiNodedotjs, SiMongodb, SiSupabase, SiIntellijidea,
  SiGooglecolab, SiGit, SiGithub, SiTypescript, SiExpress, SiPostgresql,
} from "react-icons/si";
import { TbSql, TbDatabase } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";

export interface TechLogo {
  icon: IconType;
  /** Brand color, tuned to stay visible on the dark HUD background */
  color: string;
}

/** Keyed by Skill.name in lib/data.ts */
export const techLogos: Record<string, TechLogo> = {
  Java: { icon: FaJava, color: "#f89820" },
  Python: { icon: SiPython, color: "#5a9fd4" },
  JavaScript: { icon: SiJavascript, color: "#f7df1e" },
  SQL: { icon: TbSql, color: "#22d3ee" },
  R: { icon: SiR, color: "#4a8fe0" },
  React: { icon: SiReact, color: "#61dafb" },
  "Next.js": { icon: SiNextdotjs, color: "#ffffff" },
  HTML5: { icon: SiHtml5, color: "#e34f26" },
  CSS3: { icon: SiCss, color: "#3b82f6" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#38bdf8" },
  "Spring Boot": { icon: SiSpringboot, color: "#6db33f" },
  Flask: { icon: SiFlask, color: "#ffffff" },
  "Node.js": { icon: SiNodedotjs, color: "#5fa04e" },
  MongoDB: { icon: SiMongodb, color: "#47a248" },
  Supabase: { icon: SiSupabase, color: "#3fcf8e" },
  "SQL Databases": { icon: TbDatabase, color: "#f29111" },
  "IntelliJ IDEA": { icon: SiIntellijidea, color: "#fe315d" },
  "VS Code": { icon: VscVscode, color: "#22a6f2" },
  "Google Colab": { icon: SiGooglecolab, color: "#f9ab00" },
  Git: { icon: SiGit, color: "#f05032" },
  GitHub: { icon: SiGithub, color: "#ffffff" },
  TypeScript: { icon: SiTypescript, color: "#3178c6" },
  Express: { icon: SiExpress, color: "#ffffff" },
  PostgreSQL: { icon: SiPostgresql, color: "#699ecf" },
};
