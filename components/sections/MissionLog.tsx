"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import SectionHead from "@/components/hud/SectionHead";
import Reveal from "@/components/hud/Reveal";
import { certifications, experience, personalInfo } from "@/lib/data";
import type { Certification } from "@/types";

function CertificateViewer({ cert, onClose }: { cert: Certification; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[260] flex items-center justify-center p-4 bg-[rgba(0,3,8,.85)] backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={cert.title}
    >
      <div className="hud w-full max-w-4xl !p-0" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-[var(--line)]">
          <div>
            <div className="tag">{"// credential"}</div>
            <h3 className="font-display text-base mt-1">{cert.title}</h3>
            <p className="font-mono text-[11px] text-muted-hud mt-1">{cert.issuer} · {cert.year}</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-cyan-hud p-1 hover:text-white"><X size={20} /></button>
        </div>
        <div className="relative h-[70vh] bg-black">
          <Image src={cert.image!} alt={cert.title} fill sizes="(max-width: 900px) 100vw, 900px" className="object-contain p-3" />
        </div>
      </div>
    </div>
  );
}

export default function MissionLog() {
  const [open, setOpen] = useState<Certification | null>(null);

  return (
    <section id="log" className="pt-[110px] pb-10">
      <SectionHead index="03" title="MISSION LOG" />
      <div className="grid grid-cols-1 min-[900px]:grid-cols-[1.4fr_1fr] gap-5">
        <div className="log-line">
          {experience.map((e, i) => (
            <Reveal key={e.title} delay={i * 80} className="log-entry">
              <div className="hud" data-work={e.type === "work"}>
                <div className="tag">{e.period} · {e.type === "work" ? "industry" : "education"}</div>
                <h3 className="font-display text-[17px] mt-1.5 mb-0.5">{e.title}</h3>
                <div className="text-cyan-hud text-sm">
                  {e.organization === "University" ? personalInfo.studyYear : e.organization}
                </div>
                {e.responsibilities && (
                  <ul className="mt-2.5 pl-[18px] list-disc text-muted-hud text-sm leading-[1.8] marker:text-cyan-hud">
                    {e.responsibilities.map((r) => <li key={r}>{r}</li>)}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="hud self-start">
          <div className="tag">{"// credentials"}</div>
          <ul className="mt-2.5">
            {certifications.map((c) => (
              <li key={c.title} className="flex justify-between items-start gap-3 py-3 border-b border-dashed border-[var(--line)] last:border-0 text-sm">
                <div>
                  <div>{c.title}</div>
                  <div className="font-mono text-[11px] text-muted-hud mt-0.5">{c.issuer}</div>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0 font-mono text-[11px]">
                  {c.image ? (
                    <button onClick={() => setOpen(c)} className="text-cyan-hud hover:text-white">view ▸</button>
                  ) : (
                    <span className="text-muted-hud">{c.year}</span>
                  )}
                  {c.credential && (
                    <a href={c.credential} target="_blank" rel="noopener noreferrer" className="text-green-hud hover:[text-shadow:0_0_10px_var(--green)]">
                      ✓ verify
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
      {open && <CertificateViewer cert={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
