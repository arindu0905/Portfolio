"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navItems, personalInfo } from "@/lib/data";
import { cn } from "@/lib/utils";

function useColomboClock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Colombo", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Navbar() {
  const pathname = usePathname();
  const time = useColomboClock();
  const [active, setActive] = useState("/#home");
  const [menuOpen, setMenuOpen] = useState(false);

  const onHome = pathname === "/";

  useEffect(() => {
    if (!onHome) return;
    const onScroll = () => {
      let current = navItems[0].href;
      for (const item of navItems) {
        const el = document.getElementById(item.href.slice(2));
        if (el && el.getBoundingClientRect().top < 200) current = item.href;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onHome]);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[min(1200px,calc(100%-32px))]">
      <div className="hud flex items-center justify-between !py-3 !px-[18px] [--cut:10px]">
        <Link href="/#home" className="font-mono font-semibold text-sm">
          &gt;_ arindu<b className="text-cyan-hud">.dev</b>
          <i className="inline-block w-2 h-[15px] bg-cyan-hud align-[-2px] ml-0.5 animate-[blink_1s_steps(1)_infinite]" />
        </Link>

        <div className="hidden min-[900px]:flex gap-1 font-mono text-xs">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-[7px] transition-colors",
                onHome && active === item.href ? "text-cyan-hud bg-[var(--cyan-soft)]" : "text-muted-hud hover:text-cyan-hud hover:bg-[var(--cyan-soft)]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3.5 font-mono text-[11px] text-muted-hud">
          <span className="hidden min-[900px]:inline" aria-label="Local time in Sri Lanka">LK {time}</span>
          <a className="btn btn-primary !py-2 !px-4" href={personalInfo.cv} target="_blank" rel="noopener noreferrer">
            CV ↓
          </a>
          <button
            className="min-[900px]:hidden text-cyan-hud p-1"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="hud mt-2 flex flex-col font-mono text-sm min-[900px]:hidden">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="py-2.5 text-muted-hud hover:text-cyan-hud">
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
