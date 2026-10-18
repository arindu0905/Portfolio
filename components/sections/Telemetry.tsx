"use client";
import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/hud/Reveal";
import { stats } from "@/lib/data";

/** Fixed bar heights/delays so server and client render identically. */
const SPARK = Array.from({ length: 18 }, (_, i) => ({ h: 20 + ((i * 37) % 80), d: ((i * 0.53) % 1.8).toFixed(2) }));

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / 1200);
        setN(Math.round(value * (1 - Math.pow(1 - k, 3))));
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return <span ref={ref}>{n}</span>;
}

export default function Telemetry() {
  return (
    <div className="grid grid-cols-2 min-[800px]:grid-cols-4 gap-3.5">
      {stats.map((s, i) => (
        <Reveal key={s.tag} delay={i * 80} className="hud">
          <div className="tag">{`// ${s.tag}`}</div>
          <div className="font-display text-[42px] font-bold my-2 text-white [text-shadow:0_0_20px_rgba(34,211,238,.4)]">
            <Counter value={s.value} />
            {s.suffix && <small className="text-cyan-hud text-[22px]">{s.suffix}</small>}
          </div>
          <div className="text-muted-hud text-[13px]">{s.label}</div>
          <div className="spark" aria-hidden>
            {SPARK.map((b, j) => (
              <i key={j} style={{ height: `${b.h}%`, animationDelay: `${b.d}s` }} />
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
