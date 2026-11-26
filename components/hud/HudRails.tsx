"use client";
import { useEffect, useRef } from "react";
import { decodeInto } from "@/lib/decode";

const SECTORS: [id: string, label: string][] = [
  ["home", "00 // BASE"],
  ["projects", "01 // MODULES"],
  ["stack", "02 // STACK"],
  ["log", "03 // LOG"],
  ["contact", "04 // UPLINK"],
];

/** Cockpit-style frame on the screen edges: scroll progress, current sector, cursor coordinates. */
export default function HudRails() {
  const ind = useRef<HTMLDivElement>(null);
  const pct = useRef<HTMLDivElement>(null);
  const sector = useRef<HTMLDivElement>(null);
  const xy = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let last = "";
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const k = max > 0 ? window.scrollY / max : 0;
      const track = (ind.current?.parentElement?.clientHeight ?? 0) - 44;
      if (ind.current) ind.current.style.top = `${22 + k * track}px`;
      if (pct.current) pct.current.textContent = `${String(Math.round(k * 100)).padStart(3, "0")}%`;

      let active = SECTORS[0];
      for (const s of SECTORS) {
        const el = document.getElementById(s[0]);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) active = s;
      }
      if (active[0] !== last && sector.current) {
        last = active[0];
        decodeInto(sector.current, `SECTOR ${active[1]}`);
      }
    };
    const onMove = (e: MouseEvent) => {
      if (xy.current)
        xy.current.innerHTML = `X${String(e.clientX).padStart(4, "0")}<br>Y${String(e.clientY + Math.round(window.scrollY)).padStart(4, "0")}`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div aria-hidden className="hidden min-[1320px]:block">
      <div className="rail left-[18px]">
        <div className="absolute inset-x-0 top-0 text-center">000</div>
        <div className="rail-track" />
        <div ref={ind} className="rail-ind" style={{ top: 22 }} />
        <div className="absolute inset-x-0 bottom-0 text-center">100</div>
      </div>
      <div className="rail right-[18px]">
        <div ref={pct} className="absolute inset-x-0 top-0 text-center">000%</div>
        <div ref={sector} className="rail-vert">SECTOR 00 // BASE</div>
        <div ref={xy} className="absolute inset-x-0 bottom-0 text-center leading-normal">X0000<br />Y0000</div>
      </div>
      <div className="corner bottom-3 left-3 border-b-2 border-l-2" />
      <div className="corner bottom-3 right-3 border-b-2 border-r-2" />
    </div>
  );
}
