"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { UiIcon } from "@/components/graphics/Icon";
import styles from "@/styles/StickyToc.module.css";

export type TocItem = { id: string; label: string };

/**
 * Sticky içindekiler — masaüstünde (≥1000px) `position: sticky` ve daima
 * açık; altında akordeona döner (dönen caret + max-height geçişi).
 *
 * Kaynak: `DDM Üniversite Proficiency Sayfası.dc.html` bölüm 7 sağ aside.
 * Orijinalde `syncToc()` yazılmış ama hiç çağrılmıyordu (aktif öğe hiçbir
 * zaman vurgulanmıyordu) ve genişlik JS'te sabit 1280 kaldığı için `wide`
 * sürekli `true` idi — burada scroll-spy gerçekten çalışıyor
 * (`IntersectionObserver`, eşik tasarımdaki "top < 180px" ile eşdeğer) ve
 * masaüstü/mobil ayrımı gerçek CSS media query'sine taşındı (bkz.
 * `StickyToc.module.css`, eşik 1000px — plan §2 "implementation cautions").
 */
export function StickyToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const els = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-110px 0px -70% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // items sayfa ömrü boyunca sabit — yalnız ilk mount'ta bağlanır.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (items.length === 0) return null;

  return (
    <aside className={styles.aside}>
      <button
        type="button"
        className={styles.header}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className={styles.label}>İÇİNDEKİLER</span>
        <span className={`${styles.caret} ${open ? styles.caretOpen : ""}`}>
          <UiIcon name="caretDown" size={12} strokeWidth={1.8} />
        </span>
      </button>
      <div className={`${styles.body} ${open ? styles.bodyOpen : ""}`}>
        <nav className={styles.list} aria-label="Bölüm içindekiler">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className={item.id === active ? styles.linkActive : styles.link}
              aria-current={item.id === active ? "true" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
