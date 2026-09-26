"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Fareye hafif tepki — içindeki katmanlar `--px` / `--py` (-1…1) değişkenleriyle
 * kendi kaymalarını hesaplar (bkz. `HeroLanguageArt.module.css`).
 *
 * - Yalnız fareli masaüstünde (`hover: hover` + `pointer: fine`) ve
 *   reduced-motion kapalıyken çalışır; aksi hâlde değişkenler 0 kalır.
 * - Görünür alanda değilken dinlemez; rAF ile kare başına bir yazım.
 * - Sunucu HTML'i değişmez → LCP ve yerleşim etkilenmez.
 */
export function Parallax({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ok = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!ok.matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    const write = () => {
      frame = 0;
      el.style.setProperty("--px", x.toFixed(3));
      el.style.setProperty("--py", y.toFixed(3));
    };
    const onMove = (e: PointerEvent) => {
      x = (e.clientX / window.innerWidth) * 2 - 1;
      y = (e.clientY / window.innerHeight) * 2 - 1;
      if (!frame) frame = requestAnimationFrame(write);
    };

    let listening = false;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !listening) window.addEventListener("pointermove", onMove, { passive: true });
      if (!entry.isIntersecting && listening) window.removeEventListener("pointermove", onMove);
      listening = entry.isIntersecting;
    });
    io.observe(el);

    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {children}
    </div>
  );
}
