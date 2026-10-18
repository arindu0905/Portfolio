import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HoloShot from "@/components/projects/HoloShot";
import DecodeText from "@/components/hud/DecodeText";
import Reveal from "@/components/hud/Reveal";
import { categoryLabels, projects } from "@/lib/data";
import { techLogos } from "@/lib/tech";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return {};
  return { title: project.title, description: project.description };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.id === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const gallery = project.screenshots?.slice(1) ?? [];

  return (
    <main className="relative z-[2] max-w-[1100px] mx-auto px-6 pt-32 pb-10">
      <Link href="/#projects" className="font-mono text-xs text-muted-hud hover:text-cyan-hud">
        ← cd ../modules
      </Link>

      <header className="mt-6 mb-8">
        <div className="tag">
          MODULE {String(index + 1).padStart(2, "0")} · {project.year} · {categoryLabels[project.category]}
          {project.live && <span className="status-on ml-3">LIVE</span>}
        </div>
        <h1 className="font-display font-black text-[clamp(28px,5vw,56px)] leading-[1.05] tracking-[.02em] mt-3">
          <DecodeText text={project.title} />
        </h1>
        <p className="text-muted-hud text-lg leading-relaxed max-w-[720px] mt-4">{project.description}</p>
        <div className="flex gap-3 flex-wrap mt-6">
          {project.live && (
            <a className="btn btn-primary" href={project.live} target="_blank" rel="noopener noreferrer">▶ Launch demo</a>
          )}
          {project.github && (
            <a className={project.live ? "btn btn-ghost" : "btn btn-primary"} href={project.github} target="_blank" rel="noopener noreferrer">
              Source on GitHub ↗
            </a>
          )}
        </div>
      </header>

      <Reveal className="hud holo-hover !p-0 mb-10">
        <HoloShot project={project} className="aspect-[16/9]" sizes="(max-width: 1100px) 100vw, 1100px" />
      </Reveal>

      <div className="grid grid-cols-1 min-[850px]:grid-cols-[1.5fr_1fr] gap-5">
        <Reveal className="hud">
          <div className="tag">{"// overview"}</div>
          <p className="text-[15px] leading-[1.8] mt-3 text-[#c9d8ec]">{project.overview ?? project.description}</p>
          <div className="tag mt-7">{"// key features"}</div>
          <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {project.features.map((f) => (
              <li key={f} className="font-mono text-[13px] text-muted-hud border border-[var(--line)] px-3 py-2">
                <span className="text-cyan-hud">▸ </span>{f}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="hud self-start" delay={100}>
          <div className="tag">{"// tech stack"}</div>
          <ul className="mt-3 space-y-2.5">
            {project.technologies.map((t) => {
              const logo = techLogos[t];
              const Icon = logo?.icon;
              return (
                <li key={t} className="flex items-center gap-3 font-mono text-[13px]">
                  <span className="w-8 h-8 grid place-items-center border border-[var(--line)]" style={{ color: logo?.color ?? "var(--cyan)" }}>
                    {Icon ? <Icon size={16} aria-hidden /> : <span aria-hidden>◇</span>}
                  </span>
                  {t}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>

      {gallery.length > 0 && (
        <section className="mt-10">
          <div className="tag mb-4">{"// screens"}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {gallery.map((src) => (
              <Reveal key={src} className="hud holo-hover !p-0">
                <HoloShot project={project} src={src} label={false} className="aspect-[16/10]" sizes="(max-width: 640px) 100vw, 550px" />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <Link href={`/projects/${next.id}`} className="hud block mt-12 group">
        <div className="tag">next module →</div>
        <div className="font-display text-xl mt-2 group-hover:text-cyan-hud transition-colors">{next.title}</div>
      </Link>
    </main>
  );
}
