"use client";
import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/decode";

const LINES: [string, string][] = [
  ["ARINDU.OS v2.6 — secure boot", ""],
  ["> loading kernel modules ............ ", "[ OK ]"],
  ["> mounting /projects ................ ", "[ OK ]"],
  ["> calibrating neural interface ...... ", "[ OK ]"],
  ["> establishing uplink: Homagama, LK . ", "[ ONLINE ]"],
];
const SEEN_KEY = "hud-booted";

/** Short boot sequence shown on the first visit of a browser session. Click to skip. */
export default function BootScreen() {
  const [phase, setPhase] = useState<"pending" | "running" | "done">("pending");

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem(SEEN_KEY) === "1"; } catch {}
    const skip = seen || prefersReducedMotion();
    if (!skip) {
      try { sessionStorage.setItem(SEEN_KEY, "1"); } catch {}
    }
    // Start on the next frame so the lines' fade-in transition actually runs.
    let t: ReturnType<typeof setTimeout> | undefined;
    const raf = requestAnimationFrame(() => {
      setPhase(skip ? "done" : "running");
      if (!skip) t = setTimeout(() => setPhase("done"), 1750);
    });
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, []);

  if (phase === "done") return null;
  const running = phase === "running";

  return (
    <div
      onClick={() => setPhase("done")}
      className="fixed inset-0 z-[300] bg-black flex flex-col justify-center px-[10vw] font-mono text-[13px] text-cyan-hud"
      role="status"
      aria-label="Loading"
    >
      {LINES.map(([text, ok], i) => (
        <div
          key={text}
          className="whitespace-pre transition-opacity duration-150"
          style={{ opacity: running ? 1 : 0, transitionDelay: `${120 + i * 170}ms` }}
        >
          {text}
          <span className="text-green-hud">{ok}</span>
        </div>
      ))}
      <div className="mt-[18px] h-0.5 w-[min(420px,80vw)] bg-[rgba(34,211,238,.15)]">
        <i
          className="block h-full bg-cyan-hud shadow-[0_0_12px_var(--cyan)] transition-[width] duration-[1300ms] ease-[cubic-bezier(.7,0,.2,1)]"
          style={{ width: running ? "100%" : 0 }}
        />
      </div>
      <small className="mt-3.5 text-muted-hud text-[11px]">click anywhere to skip</small>
    </div>
  );
}
