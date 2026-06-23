"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Calendar, Building2, X, Eye } from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader";
import { useInView } from "@/hooks/useInView";
import { certifications } from "@/lib/data";
import { Certification } from "@/types";

export default function Certifications() {
  const { ref, isInView } = useInView();
  const [activeCert, setActiveCert] = useState<Certification | null>(null);

  // Close modal on escape key press & manage body overflow
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveCert(null);
      }
    };
    if (activeCert) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeCert]);

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
              onClick={() => {
                if (cert.image) {
                  setActiveCert(cert);
                }
              }}
              className={`relative group rounded-2xl theme-card p-6 overflow-hidden ${
                cert.image ? "cursor-pointer" : ""
              }`}
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

              {(cert.credential || cert.image) && (
                <div className="mt-4 pt-4 flex items-center justify-between gap-4" style={{ borderTop: "1px solid var(--border-color)" }}>
                  {cert.image ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveCert(cert);
                      }}
                      className="text-xs text-accent hover:text-theme-primary font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <Eye size={12} />
                      View Certificate
                    </button>
                  ) : (
                    <div />
                  )}
                  
                  {cert.credential && (
                    <a
                      href={cert.credential}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-theme-muted hover:text-theme-primary font-semibold transition-colors"
                    >
                      Verify Credential →
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Lightbox Modal */}
      <AnimatePresence>
        {activeCert && activeCert.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCert(null)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#121212] border border-[#232323] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b border-[#232323]">
                <div>
                  <h3 className="font-bold text-white text-base md:text-lg leading-tight">
                    {activeCert.title}
                  </h3>
                  <p className="text-xs text-[#888888] mt-1">
                    Issued by {activeCert.issuer} • {activeCert.year}
                  </p>
                </div>
                <button
                  onClick={() => setActiveCert(null)}
                  className="w-10 h-10 rounded-full bg-[#1c1c1c] text-white hover:bg-[#2c2c2c] transition-colors flex items-center justify-center"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Image Body */}
              <div className="relative overflow-auto max-h-[70vh] flex items-center justify-center bg-black p-2 md:p-4">
                <img
                  src={activeCert.image}
                  alt={`${activeCert.title} Certificate`}
                  className="max-w-full max-h-[65vh] object-contain rounded-lg shadow-lg border border-[#1a1a1a]"
                />
              </div>

              {/* Footer */}
              {activeCert.credential && (
                <div className="flex justify-end p-4 border-t border-[#232323] bg-[#161616]">
                  <a
                    href={activeCert.credential}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-white text-black hover:bg-white/90 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    Verify on Coursera
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
