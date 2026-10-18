"use client";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/decode";

/** Node network that drifts behind the page and links up to the cursor. */
function NetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const still = prefersReducedMotion();
    let w = 0, h = 0, raf = 0;
    let mouse = { x: -9999, y: -9999 };
    let nodes: { x: number; y: number; vx: number; vy: number }[] = [];

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      nodes = Array.from({ length: Math.min(90, Math.floor(w / 16)) }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      }));
    };
    const onMove = (e: MouseEvent) => (mouse = { x: e.clientX, y: e.clientY });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        if (!still) { n.x += n.vx; n.y += n.vy; }
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        ctx.fillStyle = dm < 160 ? "rgba(16,185,129,.9)" : "rgba(34,211,238,.55)";
        ctx.fillRect(a.x - 1, a.y - 1, 2, 2);
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) {
            ctx.strokeStyle = `rgba(34,211,238,${(1 - d / 130) * 0.22})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        if (dm < 160) {
          ctx.strokeStyle = `rgba(16,185,129,${(1 - dm / 160) * 0.5})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={ref} className="fixed inset-0 z-0 pointer-events-none" aria-hidden />;
}

export default function Background() {
  return (
    <div aria-hidden>
      <NetworkCanvas />
      <div className="bg-aurora" style={{ width: 520, height: 520, background: "#0891b2", top: -160, left: -120, opacity: 0.35 }} />
      <div className="bg-aurora" style={{ width: 420, height: 420, background: "#10b981", top: "40%", right: -160, opacity: 0.18 }} />
      <div className="bg-floor" />
      <div className="bg-vignette" />
      <div className="bg-scan" />
    </div>
  );
}
