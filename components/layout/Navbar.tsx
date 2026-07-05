"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, Terminal } from "lucide-react";
import { navItems } from "@/lib/data";
import ThemeToggle from "@/components/common/ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [cursorVisible, setCursorVisible] = useState(true);

  /* blinking cursor */
  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const sections = navItems.map((item) => item.href.replace("#", ""));
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-4 left-0 right-0 z-50 mx-auto max-w-5xl px-4"
      >
        <div
          className="relative flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500"
          style={
            isScrolled
              ? {
                  background: "var(--nav-bg)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid var(--border-color)",
                  boxShadow:
                    "0 0 0 1px var(--border-color), 0 8px 40px var(--shadow-md), 0 0 24px var(--accent-glow)",
                }
              : {
                  background: "transparent",
                  border: "1px solid transparent",
                }
          }
        >
          {/* Top accent scan line */}
          {isScrolled && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute top-0 left-6 right-6 h-[1.5px] rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--accent), var(--accent2), transparent)",
                opacity: 0.8,
              }}
            />
          )}

          {/* ── Logo ── */}
          <button
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-2 group"
            aria-label="Go to home"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{
                background: "var(--accent-subtle)",
                border: "1px solid var(--border-color)",
                boxShadow: "0 0 12px var(--accent-glow)",
              }}
            >
              <Terminal size={14} style={{ color: "var(--accent)" }} />
            </div>
            <span className="text-sm font-mono font-bold" style={{ color: "var(--text-primary)" }}>
              arindu
              <span style={{ color: "var(--accent)" }}>
                .dev
              </span>
              <span
                className="ml-0.5 inline-block w-[6px] h-[13px] align-middle rounded-sm"
                style={{
                  background: "var(--accent)",
                  opacity: cursorVisible ? 1 : 0,
                  transition: "opacity 0.1s",
                }}
              />
            </span>
          </button>

          {/* ── Desktop Nav ── */}
          <ul className="hidden md:flex items-center gap-1 rounded-xl px-2 py-1.5"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
            }}
          >
            {navItems.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={item.href}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="relative px-3 py-1.5 text-xs font-mono font-semibold rounded-lg transition-all duration-200 group"
                    style={{ color: isActive ? "var(--accent)" : "var(--text-muted)" }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNavBg"
                        className="absolute inset-0 rounded-lg"
                        style={{
                          background: "var(--accent-subtle)",
                          border: "1px solid var(--border-color)",
                          boxShadow: "0 0 10px var(--accent-glow)",
                        }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1">
                      {isActive && (
                        <span style={{ color: "var(--accent)", opacity: 0.6 }} className="font-mono">
                          ./
                        </span>
                      )}
                      {item.label}
                    </span>
                    {/* hover glow underline */}
                    {!isActive && (
                      <span
                        className="absolute bottom-0.5 left-3 right-3 h-px rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
                        style={{ background: "var(--accent)", opacity: 0.5 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* ── Actions ── */}
          <div className="flex items-center gap-2.5">
            <ThemeToggle />

            {/* Resume button */}
            <a
              href="/Arindu_Mandinu_CV.pdf"
              download="Arindu_Mandinu_CV.pdf"
              className="relative hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold overflow-hidden group transition-all duration-300"
              style={{
                background: "var(--accent)",
                color: "#fff",
                boxShadow: "0 0 16px var(--accent-glow)",
                border: "1px solid var(--accent2)",
              }}
            >
              {/* shimmer sweep */}
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                }}
              />
              <Download size={13} />
              <span className="relative">Resume</span>
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                color: "var(--text-muted)",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {isOpen ? <X size={17} /> : <Menu size={17} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="md:hidden mt-2 rounded-2xl overflow-hidden"
              style={{
                background: "var(--nav-bg)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid var(--border-color)",
                boxShadow: "0 8px 40px var(--shadow-md), 0 0 20px var(--accent-glow)",
              }}
            >
              {/* top glow line */}
              <div
                className="h-[1.5px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--accent), var(--accent2), transparent)",
                }}
              />
              <ul className="p-3 flex flex-col gap-0.5">
                {navItems.map((item, i) => {
                  const id = item.href.replace("#", "");
                  const isActive = activeSection === id;
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <button
                        onClick={() => handleNavClick(item.href)}
                        className="w-full text-left px-4 py-3 rounded-xl text-sm font-mono font-medium transition-all duration-200 flex items-center gap-2"
                        style={{
                          color: isActive ? "var(--accent)" : "var(--text-muted)",
                          background: isActive ? "var(--accent-subtle)" : "transparent",
                          border: isActive ? "1px solid var(--border-color)" : "1px solid transparent",
                        }}
                      >
                        <span style={{ color: "var(--accent)", opacity: isActive ? 1 : 0.4 }} className="text-xs">
                          {String(i + 1).padStart(2, "0")}.
                        </span>
                        {item.label}
                      </button>
                    </motion.li>
                  );
                })}
                <li className="pt-2 mt-1" style={{ borderTop: "1px solid var(--border-color)" }}>
                  <a
                    href="/Arindu_Mandinu_CV.pdf"
                    download="Arindu_Mandinu_CV.pdf"
                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-mono font-bold transition-all duration-200"
                    style={{
                      color: "#fff",
                      background: "var(--accent)",
                      boxShadow: "0 0 12px var(--accent-glow)",
                    }}
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
