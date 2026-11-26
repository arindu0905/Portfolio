"use client";
import { useEffect, useRef } from "react";
import { techLogos } from "@/lib/tech";
import type { Skill } from "@/types";

/**
 * Logos laid out on a Fibonacci sphere and rotated with plain JS — no 3D library.
 * Drag to spin; it eases back to a slow auto-rotation when released.
 */
export default function TechGlobe({ items, activeCategory }: { items: Skill[]; activeCategory: Skill["category"] | "all" }) {
  const wrap = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const n = items.length;
    const points = items.map((_, i) => {
      const y = 1 - ((i + 0.5) / n) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = i * 2.39996;
      return { x: Math.cos(t) * r, y, z: Math.sin(t) * r };
    });
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const idle = still ? 0 : 0.004;
    let ax = -0.25, ay = 0, vx = 0, vy = idle, drag = false, lx = 0, ly = 0, raf = 0;

    const down = (e: PointerEvent) => {
      drag = true; lx = e.clientX; ly = e.clientY;
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      vy = (e.clientX - lx) * 0.006; vx = (e.clientY - ly) * 0.006;
      lx = e.clientX; ly = e.clientY;
    };
    const up = () => (drag = false);

    const frame = () => {
      if (!drag) { vy += (idle - vy) * 0.02; vx *= 0.94; }
      ay += vy;
      ax = Math.max(-1.1, Math.min(1.1, ax + vx));
      const radius = el.clientWidth * 0.4;
      const cy = Math.cos(ay), sy = Math.sin(ay), cx = Math.cos(ax), sx = Math.sin(ax);
      points.forEach((p, i) => {
        const node = nodes.current[i];
        if (!node) return;
        const x = p.x * cy - p.z * sy;
        const z1 = p.x * sy + p.z * cy;
        const y = p.y * cx - z1 * sx;
        const z = p.y * sx + z1 * cx;
        const depth = (z + 2) / 3;
        node.style.transform = `translate(${x * radius}px, ${y * radius}px) scale(${0.5 + depth * 0.6})`;
        node.style.opacity = String(0.2 + depth * 0.8);
        node.style.zIndex = String(Math.round(depth * 100));
      });
      raf = requestAnimationFrame(frame);
    };

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    frame();
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [items]);

  return (
    <div ref={wrap} className="globe" aria-label="Rotating globe of technologies — drag to spin" role="img">
      <div className="globe-core" />
      <div className="globe-wire" aria-hidden><i /><i /><i /><i /></div>
      {items.map((s, i) => {
        const logo = techLogos[s.name];
        if (!logo) return null;
        const Icon = logo.icon;
        return (
          <div
            key={s.name}
            ref={(node) => { nodes.current[i] = node; }}
            className="globe-node"
            style={{ "--c": logo.color, opacity: 0 } as React.CSSProperties}
            data-dim={activeCategory !== "all" && s.category !== activeCategory}
          >
            <Icon aria-hidden />
            <b>{s.name}</b>
          </div>
        );
      })}
      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 font-mono text-[10px] text-muted-hud tracking-[.25em]">DRAG TO ROTATE</span>
    </div>
  );
}
