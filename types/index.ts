export interface NavItem {
  label: string;
  href: string;
}

export interface Skill {
  name: string;
  category: "language" | "frontend" | "backend" | "database" | "tool" | "soft";
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  year: number;
  description: string;
  technologies: string[];
  features: string[];
  category: "web" | "ai-ml" | "hardware" | "other";
  github?: string;
  live?: string;
  featured?: boolean;
  /** Short code shown on the holo screenshot, e.g. "LMMS" */
  code: string;
  /** Accent used by the placeholder screenshot until real images exist */
  accent: string;
  /** Paths under /public, e.g. "/projects/lmms/dashboard.png" — first is the cover */
  screenshots?: string[];
  /** Longer write-up for the project page; falls back to description */
  overview?: string;
}

export interface ExperienceItem {
  type: "work" | "education";
  title: string;
  organization: string;
  location?: string;
  period: string;
  description?: string;
  responsibilities?: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  year: number;
  credential?: string;
  image?: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface Stat {
  tag: string;
  label: string;
  value: number;
  suffix?: string;
}
