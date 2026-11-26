const GLYPHS = "!<>-_/[]{}=+*^?#01ABCDEF";
const timers = new WeakMap<HTMLElement, ReturnType<typeof setTimeout>>();

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Scrambles an element's text and resolves it left-to-right into `final`. */
export function decodeInto(el: HTMLElement, final: string) {
  clearTimeout(timers.get(el));
  if (prefersReducedMotion()) {
    el.textContent = final;
    return;
  }
  const chars = [...final];
  // ~30 frames (~0.9s) regardless of length; characters lock in left to right.
  const total = 30;
  const lockAt = (i: number) => 6 + (i / Math.max(chars.length, 1)) * (total - 8);
  let frame = 0;
  const step = () => {
    el.textContent = chars
      .map((c, i) => (c === " " || frame > lockAt(i) ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
      .join("");
    if (++frame <= total) timers.set(el, setTimeout(step, 30));
    else el.textContent = final;
  };
  step();
}
