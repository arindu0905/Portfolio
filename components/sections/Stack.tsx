"use client";
import { useState } from "react";
import SectionHead from "@/components/hud/SectionHead";
import Reveal from "@/components/hud/Reveal";
import TechGlobe from "@/components/stack/TechGlobe";
import { skills } from "@/lib/data";
import { techLogos } from "@/lib/tech";
import type { Skill } from "@/types";
import { cn } from "@/lib/utils";

type Filter = Skill["category"] | "all";

const FILTERS: { label: string; value: Filter }[] = [
  { label: "ALL", value: "all" },
  { label: "LANGUAGES", value: "language" },
  { label: "FRONTEND", value: "frontend" },
  { label: "BACKEND", value: "backend" },
  { label: "DATA", value: "database" },
  { label: "TOOLS", value: "tool" },
];

const tech = skills.filter((s) => s.category !== "soft");
const traits = skills.filter((s) => s.category === "soft");

export default function Stack() {
  const [active, setActive] = useState<Filter>("all");

  return (
    <section id="stack" className="pt-[110px] pb-10">
      <SectionHead index="02" title="TECH STACK" />
      <div className="grid grid-cols-1 min-[950px]:grid-cols-[minmax(0,.95fr)_minmax(0,1.05fr)] gap-12 items-center">
        <Reveal className="grid">
          <TechGlobe items={tech} activeCategory={active} />
        </Reveal>

        <div>
          <Reveal className="flex gap-2 flex-wrap mb-7">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setActive(f.value)}
                aria-pressed={active === f.value}
                className={cn(
                  "font-mono text-xs px-3.5 py-2 border border-[var(--line)] transition-all",
                  active === f.value
                    ? "bg-cyan-hud text-[#021018] shadow-[0_0_18px_rgba(34,211,238,.5)]"
                    : "text-muted-hud hover:text-[#021018] hover:bg-cyan-hud"
                )}
              >
                {f.label}
              </button>
            ))}
          </Reveal>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(98px,1fr))] gap-3.5">
            {tech.map((s) => {
              const logo = techLogos[s.name];
              const Icon = logo?.icon;
              return (
                <div
                  key={s.name}
                  className="hex"
                  style={{ "--c": logo?.color ?? "var(--cyan)" } as React.CSSProperties}
                  data-dim={active !== "all" && s.category !== active}
                >
                  {Icon && <Icon aria-hidden />}
                  <span>{s.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Reveal className="flex flex-wrap gap-2.5 mt-10 items-center">
        <span className="tag mr-2">{"// traits"}</span>
        {traits.map((t) => (
          <span key={t.name} className="font-mono text-xs text-muted-hud border border-dashed border-[var(--line)] px-3 py-[7px]">
            <span className="text-cyan-hud">◇ </span>
            {t.name.toLowerCase()}
          </span>
        ))}
      </Reveal>
    </section>
  );
}
