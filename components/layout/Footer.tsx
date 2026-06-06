"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Heart, ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { personalInfo } from "@/lib/data";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/", icon: FaGithub },
  { label: "LinkedIn", href: "https://linkedin.com/in/", icon: FaLinkedin },
  { label: "Email", href: `mailto:${personalInfo.email}`, icon: Mail },
];

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="relative section-bg"
      style={{ borderTop: "1px solid var(--border-color)" }}
    >
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <p className="text-theme-secondary text-sm leading-relaxed mb-4">
              Information Systems Engineering Undergraduate & aspiring Software
              Engineer based in {personalInfo.location}.
            </p>
            <div className="flex items-center gap-2 text-theme-muted text-sm">
              <MapPin size={12} />
              {personalInfo.location}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] font-bold text-theme-muted uppercase tracking-[0.15em] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-theme-secondary hover:text-theme-primary text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-bold text-theme-muted uppercase tracking-[0.15em] mb-4">
              Get In Touch
            </h4>
            <div className="space-y-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 text-theme-secondary hover:text-theme-primary text-sm transition-colors duration-200"
              >
                <Mail size={13} />
                {personalInfo.email}
              </a>
              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center gap-2 text-theme-secondary hover:text-theme-primary text-sm transition-colors duration-200"
              >
                <Phone size={13} />
                {personalInfo.phone}
              </a>
            </div>
            <div className="flex gap-2.5 mt-5">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="btn-icon w-9 h-9 rounded-lg flex items-center justify-center"
                >
                  <link.icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid var(--border-color)" }}
        >
          <p className="text-theme-muted text-sm flex items-center gap-1.5">
            © {new Date().getFullYear()} {personalInfo.name}. Made with{" "}
            <Heart size={12} className="inline" style={{ color: "var(--text-primary)" }} />{" "}
            using Next.js & TypeScript.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="btn-icon w-9 h-9 rounded-lg flex items-center justify-center"
            aria-label="Back to top"
          >
            <ArrowUp size={14} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
