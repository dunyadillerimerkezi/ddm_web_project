"use client";

import { useEffect, useState } from "react";

import styles from "@/styles/GuideToc.module.css";

/**
 * P4 nedir — soru listesi. Linkler JS'siz de çalışır (düz çapa); JS yalnız
 * okunan soruyu işaretler (`aria-current="location"`). Masaüstünde sol kolonda
 * yapışkan, ≤999px'te gövdenin üstünde düz liste.
 */
export function GuideToc({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const targets = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0 || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav className={styles.toc} aria-labelledby="bu-sayfada">
      <p id="bu-sayfada" className={styles.label}>
        Bu sayfada
      </p>
      <ul className={styles.list}>
        {items.map((i) => (
          <li key={i.id}>
            <a href={`#${i.id}`} className={styles.link} aria-current={active === i.id ? "location" : undefined}>
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
