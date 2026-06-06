"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronRight, X } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import SectionHeader from "@/components/common/SectionHeader";
import { projects } from "@/lib/data";
import { Project } from "@/types";
import { cn } from "@/lib/utils";

type Category = "all" | Project["category"];

const filters: { label: string; value: Category; emoji: string }[] = [
  { label: "All", value: "all", emoji: "✦" },
  { label: "Web", value: "web", emoji: "🌐" },
  { label: "AI / ML", value: "ai-ml", emoji: "🧠" },
  { label: "Hardware", value: "hardware", emoji: "🔧" },
];

const categoryLabels: Record<Project["category"], string> = {
  web: "Web",
  "ai-ml": "AI / ML",
  hardware: "Hardware",
  other: "Other",
};

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-3xl p-6 shadow-2xl"
        style={{
          background: "var(--bg-primary)",
          border: "1px solid var(--border-color)",
        }}
      >
        <button
          onClick={onClose}
          className="btn-icon absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center"
        >
          <X size={14} />
        </button>

        <div className="mb-4 flex items-center gap-3">
          <span
            className="text-xs px-2.5 py-1 rounded-full font-semibold theme-card text-theme-muted"
          >
            {categoryLabels[project.category]}
          </span>
          <span className="text-xs text-theme-muted">{project.year}</span>
          {project.featured && (
            <span className="text-xs px-2 py-0.5 rounded-full theme-card text-theme-muted font-semibold">
              ★ Featured
            </span>
          )}
        </div>

        <h3 className="text-xl font-black text-theme-primary mb-3 tracking-tight">{project.title}</h3>
        <p className="text-theme-secondary text-sm leading-relaxed mb-5">{project.description}</p>

        <div className="mb-5">
          <h4 className="text-[10px] font-bold text-theme-muted uppercase tracking-[0.15em] mb-3">Key Features</h4>
          <ul className="space-y-1.5">
            {project.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-theme-secondary">
                <ChevronRight size={12} className="text-theme-muted flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="text-[10px] font-bold text-theme-muted uppercase tracking-[0.15em] mb-3">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="px-2.5 py-1 rounded-lg theme-card text-xs text-theme-secondary font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
            >
              <FaGithub size={14} />
              View Code
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.28, delay: index * 0.05 }}
        whileHover={{ y: -5 }}
        onClick={() => setShowModal(true)}
        className="group relative cursor-pointer rounded-2xl theme-card overflow-hidden"
      >
        {/* Top bar — appears on hover */}
        <div
          className="h-[3px] w-full accent-line transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
        />

        {project.featured && (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold theme-card text-theme-muted">
            ★ Featured
          </div>
        )}

        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] px-2.5 py-1 rounded-full theme-card font-semibold text-theme-muted tracking-wide uppercase">
              {categoryLabels[project.category]}
            </span>
            <span className="text-xs text-theme-muted">{project.year}</span>
          </div>

          <h3 className="font-black text-theme-primary text-lg mb-2 leading-snug tracking-tight group-hover:opacity-80 transition-opacity">
            {project.title}
          </h3>
          <p className="text-theme-secondary text-sm leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.slice(0, 4).map((tech) => (
              <span key={tech} className="px-2 py-0.5 rounded-md theme-card text-xs text-theme-muted">
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-0.5 rounded-md theme-card text-xs text-theme-muted">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all duration-200" style={{ color: "var(--accent)" }}>
            View Details <ChevronRight size={11} />
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <ProjectModal project={project} onClose={() => setShowModal(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<Category>("all");

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 px-4 section-bg relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          tag="Projects"
          title="Featured Work"
          subtitle="A selection of projects I've built — from web apps to AI/ML systems."
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-1.5",
                activeFilter === f.value ? "btn-accent" : "btn-outline"
              )}
            >
              <span>{f.emoji}</span>
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
