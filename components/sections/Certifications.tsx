"use client";
import { motion } from "framer-motion";
import { Award, Calendar, Building2 } from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader";
import { useInView } from "@/hooks/useInView";
import { certifications } from "@/lib/data";

export default function Certifications() {
  const { ref, isInView } = useInView();

  return (
    <section id="certifications" className="py-24 px-4 section-bg relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          tag="Credentials"
          title="Certifications"
          subtitle="Professional qualifications and credentials I've earned."
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative group rounded-2xl theme-card p-6 overflow-hidden"
            >
              {/* Top line on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] accent-line scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
              />

              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "var(--accent)", color: "var(--accent-inv)" }}
              >
                <Award size={20} />
              </div>

              <h3 className="font-black text-theme-primary text-sm leading-snug mb-3 tracking-tight group-hover:opacity-80 transition-opacity">
                {cert.title}
              </h3>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-theme-secondary">
                  <Building2 size={12} className="text-theme-muted flex-shrink-0" />
                  <span className="leading-tight">{cert.issuer}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-theme-muted">
                  <Calendar size={12} className="flex-shrink-0" />
                  {cert.year}
                </div>
              </div>

              {cert.credential && (
                <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--border-color)" }}>
                  <a
                    href={cert.credential}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-theme-muted hover:text-theme-primary font-semibold transition-colors"
                  >
                    View Credential →
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
