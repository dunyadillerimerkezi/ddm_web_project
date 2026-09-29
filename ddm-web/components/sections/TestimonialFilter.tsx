"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "@/styles/TestimonialsPage.module.css";

/**
 * P7 — yorum ızgarasının program süzgeci. Kartlar sunucuda basılır (tamamı HTML'de, arama motoru hepsini görür);
 * burada yalnız `data-filters` taşıyan kartlara `hidden` verilir. Düğmeler sunucuda basılır (sonradan belirip ızgarayı
 * aşağı itmesin — CLS); JS yoksa düğmeler işlemez, 25 kart açık kalır.
 *
 * Portre duvarından gizli bir karta (`#yorum-…`) gidilirse süzgeç "Tümü"ne döner ve sayfa karta kayar — kişi kartını
 * hep bulur.
 */
export function TestimonialFilter({
  filters,
  total,
  children,
}: {
  filters: { key: string; label: string; count: number }[];
  total: number;
  children: ReactNode;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  /** Süzgeç yüzünden gizli bir karta gidilmek istendi: süzgeç sıfırlanınca oraya kaydırılır. */
  const pendingRef = useRef<string | null>(null);

  useEffect(() => {
    const cards = listRef.current?.querySelectorAll<HTMLElement>("[data-filters]") ?? [];
    cards.forEach((card) => {
      card.hidden = active !== null && !(card.dataset.filters ?? "").split(" ").includes(active);
    });
    const id = pendingRef.current;
    if (id === null) return;
    pendingRef.current = null;
    // Hash'i şimdi (kart görünürken) vermek tarayıcının kendi kaydırmasını ve `:target` vurgusunu çalıştırır.
    if (location.hash === `#${id}`) document.getElementById(id)?.scrollIntoView();
    else location.hash = id;
  }, [active]);

  useEffect(() => {
    /** Kart gizliyse süzgeci sıfırlar ve kaydırmayı erteler; gizli değilse tarayıcıya bırakır. */
    const reveal = (id: string): boolean => {
      if (!document.getElementById(id)?.hidden) return false;
      pendingRef.current = id;
      setActive(null);
      return true;
    };
    // Portre bağlantısı: gizli karta tarayıcı kaydıramaz, hash aynıysa hashchange de gelmez — tıklamada yakala.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href^="#yorum-"]');
      if (link && reveal(link.getAttribute("href")!.slice(1))) e.preventDefault();
    };
    // Geri / ileri ya da elle yazılan hash.
    const onHash = () => {
      let id: string;
      try {
        id = decodeURIComponent(location.hash.slice(1));
      } catch {
        return; // bozuk yüzde kodu (#%E0) — yok say
      }
      if (id) reveal(id);
    };
    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHash);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  const shown = active === null ? total : (filters.find((f) => f.key === active)?.count ?? total);
  const options = [{ key: null, label: "Tümü", count: total }, ...filters];

  return (
    <>
      <div className={styles.filterBar} role="group" aria-label="Programa göre süz">
        <div className={styles.chips}>
          {options.map((f) => (
            <button
              key={f.key ?? "all"}
              type="button"
              className={styles.chip}
              aria-pressed={active === f.key}
              onClick={() => setActive(f.key)}
            >
              {f.label}
              <span className={styles.chipCount}>{f.count}</span>
            </button>
          ))}
        </div>
        <p className={styles.srOnly} aria-live="polite">
          {shown} yorum gösteriliyor
        </p>
      </div>
      <div ref={listRef} className={styles.grid}>
        {children}
      </div>
    </>
  );
}
