"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/styles/HubGuide.module.css";

/**
 * P3 — hub gövdesinin yapışkan dizini. Linkler JS'siz de çalışır (düz çapa);
 * JS yalnız okunan bölümü işaretler (`aria-current="location"`).
 * Masaüstünde sol kolonda dikey liste, ≤899px'te içerik üstünde yatay kayan şerit.
 */
export function HubToc({
  label,
  items,
}: {
  label: string;
  items: { id: string; label: string; count?: number }[];
}) {
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Mobilde dizin yatay kayan şerit: okunan bölümün çipi görünür alana kaysın.
  // Yalnız şeridin kendi yatay kaydırması değişir, sayfa kaymaz.
  useEffect(() => {
    const list = listRef.current;
    if (!list || !active || list.scrollWidth <= list.clientWidth) return;
    const link = list.querySelector<HTMLElement>(`a[href="#${active}"]`);
    if (!link) return;
    // offsetLeft yapışkan `nav`a göre; şeridin kendi başlangıcına çevrilir.
    const left = link.offsetLeft - list.offsetLeft - (list.clientWidth - link.offsetWidth) / 2;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left, behavior: smooth ? "smooth" : "auto" });
  }, [active]);

  useEffect(() => {
    const targets = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0 || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      // Ekranın üst üçte birine giren bölüm "okunan" sayılır.
      { rootMargin: "-30% 0px -60% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav className={styles.toc} aria-label={label}>
      <span className={styles.tocLabel}>{label}</span>
      <ul ref={listRef} className={styles.tocList}>
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              className={styles.tocLink}
              aria-current={active === i.id ? "location" : undefined}
            >
              {i.label}
              {i.count !== undefined && <span className={styles.tocCount}>{i.count}</span>}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
