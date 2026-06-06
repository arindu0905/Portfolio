"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/common/SectionHeader";
import { skills } from "@/lib/data";
import { Skill } from "@/types";
import { cn } from "@/lib/utils";

type FilterCategory = "all" | Skill["category"];

const filters: { label: string; value: FilterCategory }[] = [
  { label: "All", value: "all" },
  { label: "Languages", value: "language" },
  { label: "Frontend", value: "frontend" },
  { label: "Backend", value: "backend" },
  { label: "Databases", value: "database" },
  { label: "Tools", value: "tool" },
  { label: "Soft Skills", value: "soft" },
];

const categoryIcons: Record<Skill["category"], string> = {
  language: "⚡",
  frontend: "🎨",
  backend: "⚙️",
  database: "🗄️",
  tool: "🛠️",
  soft: "🤝",
};

export default function Skills() {
  const [active, setActive] = useState<FilterCategory>("all");

  const filtered =
    active === "all" ? skills : skills.filter((s) => s.category === active);

  return (
    <section id="skills" className="py-24 px-4 relative overflow-hidden section-bg-alt">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          tag="Skills"
          title="My Tech Stack"
          subtitle="Technologies and tools I use to build modern, scalable applications."
        />

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                active === f.value
                  ? "btn-accent"
                  : "btn-outline"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Skill grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.22 }}
                whileHover={{ y: -4 }}
                className="theme-card flex flex-col items-center gap-2.5 p-4 rounded-2xl cursor-default"
              >
                <span className="text-2xl">{categoryIcons[skill.category]}</span>
                <span className="text-xs font-semibold text-center leading-tight text-theme-secondary">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
