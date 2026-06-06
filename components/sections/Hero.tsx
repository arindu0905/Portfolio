"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Download, ArrowDown, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { personalInfo } from "@/lib/data";

const PARTICLE_COUNT = 50;

function Particles() {
  const [particles, setParticles] = useState<
    { x: number; y: number; size: number; delay: number; duration: number }[]
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 8 + 5,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: "var(--particle)",
          }}
          animate={{ y: [0, -40, 0], opacity: [0, 1, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = personalInfo.roles;

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [roles.length]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden section-bg"
    >
      {/* Subtle blue grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--grid-line) 1px, transparent 1px),
                            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Blue glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -left-48 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse" style={{ background: "var(--accent)" }} />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full blur-3xl opacity-15 animate-pulse" style={{ background: "var(--accent)", animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-10" style={{ background: "var(--accent)" }} />
      </div>

      <Particles />

      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-28 pb-16 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">

          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full theme-card text-xs font-semibold tracking-widest uppercase mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
            <span className="text-accent">Available for opportunities</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-theme-primary mb-6 leading-[1.0] tracking-tight"
          >
            Hi, I&apos;m
            <br />
            <span className="text-theme-primary">Arindu</span>
          </motion.h1>

          {/* Animated role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="h-10 flex items-center justify-center lg:justify-start mb-4"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-xl md:text-2xl text-theme-secondary font-light"
              >
                {roles[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex items-center justify-center lg:justify-start gap-1.5 text-theme-muted text-sm mb-10"
          >
            <MapPin size={13} />
            {personalInfo.location}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10"
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="btn-accent px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide"
            >
              View My Work
            </button>
            <a
              href="/ArinduWanigasekara.pdf"
              download="ArinduWanigasekara.pdf"
              className="btn-outline px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide flex items-center gap-2"
            >
              <Download size={15} />
              Download CV
            </a>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex gap-2.5 justify-center lg:justify-start"
          >
            {[
              { icon: FaGithub, href: "https://github.com/", label: "GitHub" },
              { icon: FaLinkedin, href: "https://linkedin.com/in/", label: "LinkedIn" },
              { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="btn-icon w-11 h-11 rounded-xl flex items-center justify-center"
              >
                <Icon size={17} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25, type: "spring", stiffness: 90 }}
          className="relative flex-shrink-0"
        >
          <div className="relative w-60 h-60 md:w-72 md:h-72">
            {/* Spinning border ring */}
            <div
              className="absolute inset-0 rounded-full p-[2px] animate-spin-slow"
              style={{ background: "var(--ring)" }}
            >
              <div className="w-full h-full rounded-full section-bg" />
            </div>

            {/* Inner - Profile Photo */}
            <div
              className="absolute inset-[5px] rounded-full overflow-hidden"
              style={{ border: "1px solid var(--border-color)" }}
            >
              <img
                src="/profile.jpg"
                alt="Arindu Wanigasekara - AMW Full Stack Developer"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="theme-card absolute -top-4 -right-6 px-3 py-1.5 rounded-xl text-xs font-semibold"
              style={{ color: "var(--text-secondary)", boxShadow: `0 4px 16px var(--shadow)` }}
            >
              🚀 Open to Work
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="theme-card absolute -bottom-4 -left-6 px-3 py-1.5 rounded-xl text-xs font-semibold"
              style={{ color: "var(--text-secondary)", boxShadow: `0 4px 16px var(--shadow)` }}
            >
              💡 AI & ML
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.button
        onClick={() => scrollToSection("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-theme-muted hover:text-theme-primary transition-colors"
      >
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown size={14} />
        </motion.div>
      </motion.button>
    </section>
  );
}
