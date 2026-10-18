"use client";
import { useRef } from "react";
import Link from "next/link";
import HoloShot from "@/components/projects/HoloShot";
import { categoryLabels } from "@/lib/data";
import type { Project } from "@/types";

/** Project "module" card that tilts toward the cursor in 3D. */
export default function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.transform = `rotateY(${(px - 0.5) * 14}deg) rotateX(${(0.5 - py) * 12}deg) translateZ(10px)`;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <article ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="hud card-3d holo-hover h-full flex flex-col">
      <div className="card-shine" />
      <Link href={`/projects/${project.id}`} aria-label={`${project.title} case study`}>
        <HoloShot project={project} className="h-[180px]" />
      </Link>
      <div className="px-[22px] pt-5 pb-[22px] flex flex-col flex-1">
        <div className="tag">
          {project.live && <span className="status-on">LIVE · </span>}
          {project.year} · {categoryLabels[project.category]}
        </div>
        <h3 className="font-display text-lg font-bold tracking-[.03em] mt-2 mb-2">
          <Link href={`/projects/${project.id}`} className="hover:text-cyan-hud transition-colors">
            {project.title}
          </Link>
        </h3>
        <p className="text-muted-hud text-sm leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-3.5 mb-4">
          {project.technologies.map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
        <div className="mt-auto flex justify-between font-mono text-xs">
          <Link href={`/projects/${project.id}`} className="text-cyan-hud hover:[text-shadow:0_0_10px_var(--cyan)]">
            case study →
          </Link>
          <span className="flex gap-4">
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-green-hud hover:[text-shadow:0_0_10px_var(--green)]">
                demo ↗
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-cyan-hud hover:[text-shadow:0_0_10px_var(--cyan)]">
                github ↗
              </a>
            )}
          </span>
        </div>
      </div>
    </article>
  );
}
