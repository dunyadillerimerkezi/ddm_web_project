"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "@/styles/Reveal.module.css";

/**
 * P3 — kademeli görünme. İçindeki `[data-reveal]` öğelerinden YALNIZ ekranın
 * altında kalanları gizler ve görünür alana girince bir kez açar.
 *
 * - JS yoksa / reduced-motion varsa hiçbir şey gizlenmez.
 * - İlk açılışta ekranda olan öğeye dokunulmaz → LCP gecikmez, parlama olmaz.
 * - Yalnız opacity + transform → yerleşim kaymaz (CLS yok).
 * Stil: `styles/Reveal.module.css`.
 */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fold = window.innerHeight;
    const pending = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]")).filter(
      (el) => el.getBoundingClientRect().top > fold,
    );
    pending.forEach((el, i) => {
      el.dataset.reveal = "pending";
      // Yan yana gelen öğeler küçük gecikmeyle (kademeli), en fazla 6 adım.
      el.style.setProperty("--reveal-delay", `${(i % 6) * 45}ms`);
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.reveal = "shown";
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    pending.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className ? `${styles.root} ${className}` : styles.root}>
      {children}
    </div>
  );
}
