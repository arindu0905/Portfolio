"use client";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { personalInfo, projects, skills, socialLinks } from "@/lib/data";

type Line = { id: number; kind: "out" | "cmd" | "dim" | "ok"; text: ReactNode };

const SECTIONS: Record<string, string> = {
  home: "home", projects: "projects", modules: "projects", stack: "stack", skills: "stack",
  log: "log", experience: "log", contact: "contact", uplink: "contact",
};

/** Event other components dispatch to open the terminal (e.g. the hero hint). */
export const OPEN_TERMINAL_EVENT = "hud:open-terminal";

/** Hidden command prompt — press "/" or "`" anywhere to open. */
export default function Terminal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const outRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  const print = useCallback((text: ReactNode, kind: Line["kind"] = "out") => {
    setLines((l) => [...l, { id: nextId.current++, kind, text }]);
  }, []);

  const show = useCallback(() => {
    setOpen(true);
    setLines((l) => (l.length ? l : [{ id: nextId.current++, kind: "dim", text: 'ARINDU.OS terminal — type "help" to list commands' }]));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = /INPUT|TEXTAREA|SELECT/.test((document.activeElement as HTMLElement | null)?.tagName ?? "");
      if ((e.key === "/" || e.key === "`") && !typing) {
        e.preventDefault();
        show();
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_TERMINAL_EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_TERMINAL_EVENT, show);
    };
  }, [show]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
  }, [open]);

  useEffect(() => {
    outRef.current?.scrollTo({ top: outRef.current.scrollHeight });
  }, [lines]);

  const goToSection = (id: string) => {
    setOpen(false);
    if (window.location.pathname === "/") document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    else router.push(`/#${id}`);
  };

  const run = (raw: string) => {
    const cmd = raw.trim();
    print(cmd, "cmd");
    if (!cmd) return;
    setHistory((h) => [cmd, ...h]);
    setHistIdx(-1);
    const [name, ...args] = cmd.split(/\s+/);
    const arg = args.join(" ").toLowerCase();

    switch (name.toLowerCase()) {
      case "help":
        print("whoami · projects · open <project> · stack · contact · cv · goto <section> · clear · exit · sudo hire-me", "dim");
        break;
      case "whoami":
        print(`${personalInfo.name} — ${personalInfo.roles.slice(0, 3).join(", ")}. ${personalInfo.location}.`);
        break;
      case "projects":
      case "ls":
        print(projects.map((p) => `${p.id}/`).join("  "));
        print('tip: "open lmms" to view a project', "dim");
        break;
      case "open": {
        const p = projects.find((x) => x.id === arg || x.code.toLowerCase() === arg || x.id.startsWith(arg));
        if (!arg || !p) {
          print(`no such project: ${arg || "(none)"} — try "projects"`, "dim");
          break;
        }
        print(`opening ${p.id}…`, "ok");
        setOpen(false);
        router.push(`/projects/${p.id}`);
        break;
      }
      case "stack":
        print(skills.filter((s) => s.category !== "soft").map((s) => s.name.toLowerCase()).join(" · "));
        break;
      case "contact":
        socialLinks.forEach((s) => print(`${s.label.padEnd(9)} ${s.href.replace(/^mailto:|^https:\/\//, "")}`));
        break;
      case "cv":
        print("downloading cv… ✓", "ok");
        window.open(personalInfo.cv, "_blank", "noopener");
        break;
      case "goto": {
        const id = SECTIONS[arg];
        if (id) goToSection(id);
        else print(`unknown section — try: ${Object.keys(SECTIONS).slice(0, 6).join(", ")}`, "dim");
        break;
      }
      case "clear":
        setLines([]);
        break;
      case "exit":
        setOpen(false);
        break;
      case "sudo":
        if (arg === "hire-me") {
          print("[sudo] access granted ✓ — opening uplink…", "ok");
          setTimeout(() => goToSection("contact"), 700);
        } else print("sudo: permission denied 😉", "dim");
        break;
      default:
        print(`command not found: ${name} — try "help"`, "dim");
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[250] flex items-center justify-center p-5 bg-[rgba(0,3,8,.7)] backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Terminal"
    >
      <div className="hud flex flex-col !p-0 w-[min(760px,100%)] h-[min(460px,80vh)]">
        <div className="flex justify-between px-4 py-2.5 border-b border-[var(--line)] font-mono text-[11px] text-muted-hud">
          <span>arindu@portfolio: ~</span>
          <button onClick={() => setOpen(false)} className="hover:text-cyan-hud">esc to close ✕</button>
        </div>
        <div ref={outRef} className="flex-1 overflow-auto p-4 font-mono text-[13px] leading-[1.7] text-[#b9f3ff] whitespace-pre-wrap">
          {lines.map((l) => (
            <div key={l.id} className={l.kind === "dim" ? "text-muted-hud" : l.kind === "ok" ? "text-green-hud" : ""}>
              {l.kind === "cmd" && <span className="text-green-hud">arindu@lk:~$ </span>}
              {l.text}
            </div>
          ))}
        </div>
        <form
          className="flex gap-2 px-4 py-3 border-t border-[var(--line)] font-mono text-[13px]"
          onSubmit={(e) => {
            e.preventDefault();
            run(value);
            setValue("");
          }}
        >
          <label htmlFor="term-input" className="text-green-hud">arindu@lk:~$</label>
          <input
            id="term-input"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp" && history.length) {
                e.preventDefault();
                const i = Math.min(histIdx + 1, history.length - 1);
                setHistIdx(i);
                setValue(history[i]);
              } else if (e.key === "ArrowDown") {
                e.preventDefault();
                const i = histIdx - 1;
                setHistIdx(Math.max(i, -1));
                setValue(i >= 0 ? history[i] : "");
              }
            }}
            autoComplete="off"
            spellCheck={false}
            className="flex-1 bg-transparent outline-none text-white caret-[var(--cyan)]"
          />
        </form>
      </div>
    </div>
  );
}
