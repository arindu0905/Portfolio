"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader";
import { useInView } from "@/hooks/useInView";
import { personalInfo, stats } from "@/lib/data";

function StatCard({ value, label, suffix, delay }: { value: number; label: string; suffix?: string; delay: number }) {
  const { ref, isInView } = useInView();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const duration = 1500;
    const step = Math.ceil(duration / end);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="text-center p-6 rounded-2xl theme-card"
    >
      <div className="text-3xl md:text-4xl font-black text-theme-primary mb-1">
        {count}{suffix}
      </div>
      <div className="text-theme-muted text-sm font-medium">{label}</div>
    </motion.div>
  );
}

export default function About() {
  const { ref, isInView } = useInView();

  return (
    <section id="about" className="py-24 px-4 section-bg relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          tag="About Me"
          title="Passionate About Building"
          subtitle="Turning ideas into reality with code, creativity, and continuous learning."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-theme-secondary text-lg leading-relaxed mb-8">
              {personalInfo.about}
            </p>

            <div className="space-y-3">
              {[
                { icon: MapPin, value: personalInfo.location },
                { icon: Mail, value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                { icon: Phone, value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
              ].map(({ icon: Icon, value, href }) => (
                <div key={value} className="flex items-center gap-3 text-theme-secondary">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--accent-subtle)", border: "1px solid var(--border-color)" }}
                  >
                    <Icon size={14} style={{ color: "var(--accent)" }} />
                  </div>
                  {href ? (
                    <a href={href} className="hover:text-theme-primary transition-colors text-sm">{value}</a>
                  ) : (
                    <span className="text-sm">{value}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden theme-card p-8">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] accent-line" />

              <div className="space-y-5">
                {[
                  { label: "Degree", value: "BSc (Hons) Information Systems Engineering" },
                  { label: "University Year", value: "1st Year (2024–2028)" },
                  { label: "Status", value: "Open to Internships & Opportunities" },
                  { label: "Focus Areas", value: "Web Dev · AI/ML · System Design" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-1 pb-5 last:pb-0" style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <span className="text-[10px] text-theme-muted uppercase tracking-[0.15em] font-semibold">{label}</span>
                    <span className="text-theme-primary font-medium text-sm">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
