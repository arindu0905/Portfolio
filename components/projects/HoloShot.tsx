import Image from "next/image";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

const BARS = [35, 60, 45, 80, 55, 90, 70, 40, 65];

/** Placeholder dashboard drawn in CSS, used until a real screenshot exists. */
function MockUi({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-[18px_18px_0] grid grid-cols-[42px_1fr] gap-1.5 p-[7px] bg-[#0f172a] border border-b-0 border-white/10">
      <div className="bg-[#1e293b] rounded-[3px]" />
      <div className="grid grid-rows-[9px_28px_1fr] gap-1.5">
        <div className="bg-[#334155] rounded-sm w-[55%]" />
        <div className="grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => (
            <i key={i} className="bg-[#1e293b] rounded-[3px] border-t-2" style={{ borderColor: accent }} />
          ))}
        </div>
        <div className="flex items-end gap-1 bg-[#1e293b] rounded-[3px] px-1.5 pt-1.5">
          {BARS.map((h, i) => (
            <i key={i} className="flex-1 rounded-t-sm opacity-85" style={{ height: `${h}%`, background: accent }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Project image with a cyan hologram treatment. The parent needs the `holo-hover`
 * class for the hover glitch to trigger.
 */
export default function HoloShot({
  project,
  src,
  className,
  label = true,
  sizes = "(max-width: 950px) 100vw, 400px",
}: {
  project: Project;
  src?: string;
  className?: string;
  label?: boolean;
  sizes?: string;
}) {
  const image = src ?? project.screenshots?.[0];
  return (
    <div className={cn("holo", className)}>
      <div className="holo-media">
        {image ? (
          <Image src={image} alt={`${project.title} screenshot`} fill sizes={sizes} className="object-cover object-top" />
        ) : (
          <MockUi accent={project.accent} />
        )}
      </div>
      {label && (
        <span className="absolute left-3.5 bottom-3 z-[3] font-display text-sm font-bold tracking-[.12em] text-white bg-[rgba(3,6,13,.85)] border border-[var(--line)] px-2.5 py-1 [text-shadow:0_0_12px_var(--cyan)]">
          {project.code}
        </span>
      )}
    </div>
  );
}
