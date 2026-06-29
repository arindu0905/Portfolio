"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { navItems } from "@/lib/data";
import ThemeToggle from "@/components/common/ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const sections = navItems.map((item) => item.href.replace("#", ""));
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-3 left-0 right-0 z-50 mx-auto max-w-6xl px-4"
      >
        <div
          className="flex items-center justify-between rounded-2xl px-6 py-3.5 transition-all duration-300"
          style={
            isScrolled
              ? {
                  background: "var(--nav-bg)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid var(--border-color)",
                  boxShadow: "0 8px 32px var(--shadow)",
                }
              : {}
          }
        >
          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={item.href}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={`relative px-3.5 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isActive ? "nav-active" : "nav-inactive hover:text-theme-primary"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-lg"
                        style={{ background: "var(--accent-subtle)" }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <a
              href="/Arindu_Mandinu_CV.pdf"
              download="Arindu_Mandinu_CV.pdf"
              className="btn-accent hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
            >
              <Download size={14} />
              Resume
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="btn-icon md:hidden w-9 h-9 rounded-lg flex items-center justify-center"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              className="md:hidden mt-2 rounded-2xl overflow-hidden"
              style={{
                background: "var(--nav-bg)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid var(--border-color)",
                boxShadow: "0 8px 32px var(--shadow)",
              }}
            >
              <ul className="p-3 flex flex-col gap-0.5">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium nav-inactive hover:text-theme-primary hover:bg-[var(--bg-card-hover)] transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
                <li className="pt-2 mt-1" style={{ borderTop: "1px solid var(--border-color)" }}>
                  <a
                    href="/Arindu_Mandinu_CV.pdf"
                    download="Arindu_Mandinu_CV.pdf"
                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-theme-primary hover:bg-[var(--bg-card-hover)] transition-colors"
                  >
                    <Download size={14} />
                    Download Resume
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
