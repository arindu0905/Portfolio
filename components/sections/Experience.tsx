"use client";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader";
import { useInView } from "@/hooks/useInView";
import { experience } from "@/lib/data";
import { ExperienceItem } from "@/types";
import { cn } from "@/lib/utils";

function TimelineItem({ item, index }: { item: ExperienceItem; index: number }) {
  const { ref, isInView } = useInView(0.1);
  const isWork = item.type === "work";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={cn(
        "relative flex gap-6 md:gap-8",
        "md:w-1/2",
        index % 2 === 0 ? "md:ml-auto md:pl-12" : "md:mr-auto md:pr-12 md:flex-row-reverse md:text-right"
      )}
    >
      {/* Connector dot (desktop) */}
      <div className={cn("absolute top-5 hidden md:block", index % 2 === 0 ? "-left-5" : "-right-5")}>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center z-10 relative"
          style={{
            background: "var(--accent)",
            border: "2px solid var(--bg-primary)",
          }}
        >
          {isWork
            ? <Briefcase size={16} style={{ color: "var(--accent-inv)" }} />
            : <GraduationCap size={16} style={{ color: "var(--accent-inv)" }} />}
        </div>
      </div>

      {/* Mobile icon */}
      <div
        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center md:hidden"
        style={{ background: "var(--accent)" }}
      >
        {isWork
          ? <Briefcase size={16} style={{ color: "var(--accent-inv)" }} />
          : <GraduationCap size={16} style={{ color: "var(--accent-inv)" }} />}
      </div>

      {/* Card */}
      <div className="flex-1 mb-8">
        <div className="p-5 rounded-2xl theme-card">
          <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
            <div>
              <h3 className="font-black text-theme-primary text-base leading-tight tracking-tight">{item.title}</h3>
              <p className="font-semibold text-sm mt-0.5 text-theme-secondary">{item.organization}</p>
            </div>
            <span
              className="px-3 py-1 rounded-full text-xs font-medium theme-card text-theme-muted whitespace-nowrap"
            >
              {item.period}
            </span>
          </div>

          {item.location && (
            <p className="text-theme-muted text-sm mb-3">{item.location}</p>
          )}

          {item.responsibilities && (
            <ul className={cn("space-y-1.5 text-sm text-theme-secondary", index % 2 !== 0 ? "md:text-right" : "")}>
              {item.responsibilities.map((r, i) => (
                <li
                  key={i}
                  className={cn("flex items-start gap-2", index % 2 !== 0 ? "md:flex-row-reverse" : "")}
                >
                  <span className="text-theme-muted mt-0.5 flex-shrink-0">▸</span>
                  {r}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-4 section-bg-alt relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          tag="Journey"
          title="Experience & Education"
          subtitle="My professional and academic milestones."
        />

        <div className="relative">
          {/* Center line (desktop) */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: "linear-gradient(to bottom, var(--accent), var(--border-color), transparent)" }}
          />
          {/* Left line (mobile) */}
          <div
            className="md:hidden absolute left-5 top-0 bottom-0 w-px"
            style={{ background: "var(--border-color)" }}
          />

          <div className="pl-16 md:pl-0 space-y-0">
            {experience.map((item, i) => (
              <TimelineItem key={`${item.title}-${i}`} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
