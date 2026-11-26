"use client";
import { useEffect } from "react";

type Magnet = HTMLElement & { _tx?: number; _ty?: number };

/** Makes every `.btn` lean toward the cursor when it comes close. */
export default function MagneticField() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: MouseEvent) => {
      document.querySelectorAll<Magnet>(".btn").forEach((b) => {
        const r = b.getBoundingClientRect();
        const tx = b._tx ?? 0, ty = b._ty ?? 0;
        const dx = e.clientX - (r.left - tx + r.width / 2);
        const dy = e.clientY - (r.top - ty + r.height / 2);
        const near = Math.hypot(dx, dy) < Math.max(r.width, r.height) * 0.9;
        b._tx = near ? dx * 0.3 : 0;
        b._ty = near ? dy * 0.35 : 0;
        b.style.transform = near ? `translate(${b._tx}px, ${b._ty}px)` : "";
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return null;
}
