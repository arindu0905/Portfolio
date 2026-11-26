"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { personalInfo } from "@/lib/data";
import { OPEN_TERMINAL_EVENT } from "@/components/hud/Terminal";

const ROLES = ["full stack developer", "information systems engineer", "ai / ml enthusiast", "problem solver"];

/** 72 tick marks around the reactor; rounded so server and client markup match. */
const TICKS = Array.from({ length: 72 }, (_, i) => {
  const a = (i * 5 * Math.PI) / 180;
  const major = i % 6 === 0;
  const r1 = major ? 130 : 138;
  const p = (r: number, f: (x: number) => number) => Math.round((200 + r * f(a)) * 100) / 100;
  return { x1: p(r1, Math.cos), y1: p(r1, Math.sin), x2: p(144, Math.cos), y2: p(144, Math.sin), major };
});

function useTypedRoles() {
  const [text, setText] = useState("> ");
  useEffect(() => {
    let i = 0, j = 2, deleting = false;
    let t: ReturnType<typeof setTimeout>;
    const step = () => {
      const word = `> ${ROLES[i]}`;
      setText(word.slice(0, j));
      if (!deleting && j === word.length) {
        deleting = true;
        t = setTimeout(step, 1600);
        return;
      }
      if (deleting && j === 2) {
        deleting = false;
        i = (i + 1) % ROLES.length;
      }
      j += deleting ? -1 : 1;
      t = setTimeout(step, deleting ? 28 : 55);
    };
    step();
    return () => clearTimeout(t);
  }, []);
  return text;
}

function Reactor() {
  return (
    <div className="relative aspect-square w-[min(420px,80vw)] justify-self-center">
      <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id="reactor-arc" x1="0" x2="1">
            <stop offset="0" stopColor="#22d3ee" />
            <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className="spin"><circle cx="200" cy="200" r="190" fill="none" stroke="#22d3ee" strokeOpacity=".35" strokeDasharray="2 8" /></g>
        <g className="spin spin-rev"><circle cx="200" cy="200" r="172" fill="none" stroke="#22d3ee" strokeWidth="2" strokeDasharray="120 40 20 40" strokeOpacity=".8" /></g>
        <g className="spin spin-fast"><circle cx="200" cy="200" r="156" fill="none" stroke="url(#reactor-arc)" strokeWidth="3" strokeDasharray="180 800" /></g>
        <g className="spin spin-slow">
          {TICKS.map((t, i) => (
            <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="#22d3ee" strokeOpacity={t.major ? 0.9 : 0.35} />
          ))}
        </g>
        <circle cx="200" cy="200" r="104" fill="none" stroke="#10b981" strokeOpacity=".5" strokeDasharray="1 5" />
      </svg>
      <div className="reactor-photo">
        <Image src="/profile.jpg" alt={personalInfo.name} fill priority sizes="220px" className="object-cover saturate-[.85]" />
      </div>
      <span className="orb-label top-[8%] -left-[2%]">JAVA · SPRING</span>
      <span className="orb-label top-[46%] -right-[6%]">REACT · NEXT</span>
      <span className="orb-label bottom-[6%] left-[8%]">PYTHON · ML</span>
      <span className="absolute -top-[4%] right-0 text-right font-mono text-[10px] text-muted-hud leading-relaxed">LAT 6.84°N<br />LON 80.00°E</span>
      <span className="absolute -bottom-[4%] right-[4%] text-right font-mono text-[10px] text-muted-hud leading-relaxed">SIGNAL 98%<br />ID AMW-0905</span>
    </div>
  );
}

export default function Hero() {
  const role = useTypedRoles();
  const [first, ...rest] = personalInfo.name.split(" ");
  const last = rest[rest.length - 1];

  return (
    <section id="home" className="min-h-screen grid grid-cols-1 min-[900px]:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)] items-center gap-10 pt-32 pb-10">
      <div>
        <div className="tag">
          <span className="status-on">SYS.OPERATOR // ONLINE</span> &nbsp;·&nbsp; open to internships
        </div>
        <h1 className="font-display font-black text-[clamp(34px,5.6vw,74px)] leading-[.98] tracking-[.02em] mt-[22px] mb-[18px]">
          <span className="glitch" data-text={first.toUpperCase()}>{first.toUpperCase()}</span>
          <br />
          <span className="outline-text">{last.toUpperCase()}</span>
        </h1>
        <div className="caret font-mono text-[clamp(14px,1.6vw,18px)] text-cyan-hud min-h-[1.6em]" aria-label={ROLES[0]}>
          {role}
        </div>
        <p className="text-muted-hud text-base leading-[1.75] max-w-[540px] mt-5 mb-[30px]">{personalInfo.tagline}</p>
        <div className="flex gap-3 flex-wrap">
          <a className="btn btn-primary" href="#projects">▶ Launch projects</a>
          <a className="btn btn-ghost" href="#contact">Open uplink</a>
        </div>
        <button
          onClick={() => window.dispatchEvent(new Event(OPEN_TERMINAL_EVENT))}
          className="mt-[26px] font-mono text-[11px] text-muted-hud hover:text-cyan-hud hidden min-[900px]:block"
        >
          tip: press <kbd className="key">/</kbd> to open the terminal
        </button>
      </div>
      <Reactor />
    </section>
  );
}
