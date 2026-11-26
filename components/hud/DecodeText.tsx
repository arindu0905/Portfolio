"use client";
import { useEffect, useRef } from "react";
import { decodeInto } from "@/lib/decode";

/** Text that scrambles into place when scrolled into view, and again on hover. */
export default function DecodeText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const run = () => decodeInto(el, text);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    el.addEventListener("mouseenter", run);
    return () => {
      io.disconnect();
      el.removeEventListener("mouseenter", run);
      el.textContent = text;
    };
  }, [text]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text}
    </span>
  );
}
