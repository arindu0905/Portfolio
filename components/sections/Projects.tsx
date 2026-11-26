import SectionHead from "@/components/hud/SectionHead";
import Reveal from "@/components/hud/Reveal";
import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="pt-[110px] pb-10">
      <SectionHead index="01" title="MODULES" />
      <div className="grid grid-cols-1 min-[700px]:grid-cols-2 min-[1000px]:grid-cols-3 gap-5">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={(i % 3) * 100} className="[perspective:1200px]">
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
