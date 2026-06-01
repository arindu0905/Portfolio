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
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
}
