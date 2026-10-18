import { personalInfo } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative z-[2] text-center font-mono text-[11px] text-muted-hud pt-16 pb-10 px-4">
      © {new Date().getFullYear()} {personalInfo.name.toUpperCase()} — built with Next.js ·{" "}
      <span className="text-green-hud">all systems nominal</span>
    </footer>
  );
}
