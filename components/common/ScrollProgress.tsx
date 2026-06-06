"use client";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-transparent">
      <div
        className="h-full transition-all duration-75 ease-out"
        style={{ width: `${progress}%`, background: "var(--accent)" }}
      />
    </div>
  );
}
