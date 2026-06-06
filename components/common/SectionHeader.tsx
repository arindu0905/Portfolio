"use client";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

interface SectionHeaderProps {
  tag: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeader({
  tag,
  title,
  subtitle,
  centered = true,
}: SectionHeaderProps) {
  const { ref, isInView } = useInView();

  return (
    <div ref={ref} className={`mb-16 ${centered ? "text-center" : ""}`}>
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-[0.15em] uppercase theme-card text-theme-muted mb-5"
      >
        {tag}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-black text-theme-primary mb-4 leading-tight tracking-tight"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-theme-secondary text-base max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`mt-6 h-[3px] w-16 rounded-full accent-line ${centered ? "mx-auto" : ""}`}
      />
    </div>
  );
}
