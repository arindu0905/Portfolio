"use client";
import { useEffect, useRef, useSyncExternalStore } from "react";

const HOT = "a,button,input,textarea,.hex,.globe-node,.card-3d";
const FINE_POINTER = "(pointer: fine)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(FINE_POINTER);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** Crosshair cursor with a trailing ring. Only enabled for mouse/trackpad users. */
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const enabled = useSyncExternalStore(subscribe, () => window.matchMedia(FINE_POINTER).matches, () => false);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");

    let mx = -100, my = -100, rx = mx, ry = my, raf = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    };
    const onOver = (e: MouseEvent) => {
      const hot = !!(e.target as Element | null)?.closest?.(HOT);
      ring.current?.setAttribute("data-hot", String(hot));
    };
    const loop = () => {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="fixed left-0 top-0 z-[400] pointer-events-none rounded-full border border-[var(--cyan)] mix-blend-screen transition-[width,height,background] duration-200 w-[34px] h-[34px] data-[hot=true]:w-14 data-[hot=true]:h-14 data-[hot=true]:bg-[var(--cyan-soft)]"
      />
      <div
        ref={dot}
        aria-hidden
        className="fixed left-0 top-0 z-[401] pointer-events-none w-1 h-1 rounded-full bg-[var(--cyan)] shadow-[0_0_8px_var(--cyan)]"
      />
    </>
  );
}
