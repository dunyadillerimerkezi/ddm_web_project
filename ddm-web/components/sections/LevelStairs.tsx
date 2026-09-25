"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";

import type { LevelItem } from "@/data/privateLessonsShared";
import styles from "@/styles/LevelStairs.module.css";

/**
 * P4 — "Hedefiniz hangi basamakta?" seviye merdiveni (sayfanın baskın bölümü).
 *
 * Erişilebilir sekme deseni: basamaklar `tab`, detaylar `tabpanel`; ok tuşları
 * / Home / End ile gezilir. Altı panelin HEPSİ HTML'de (arama motoru ve yapay
 * zekâ aramaları her seviyeyi okur); seçili olmayanlar `hidden`.
 *
 * Basamak sayısı veriden (CEFR 6, HSK 6…); yükseklikler sayıya göre eşit adımlı.
 *
 * Tek hareket: bölüm görünür alana ilk girdiğinde basamaklar sırayla yükselir
 * (yalnız transform/opacity). JS yoksa, reduced-motion açıksa ya da bölüm
 * ilk açılışta zaten ekrandaysa hiç gizlenmez.
 */
export function LevelStairs({
  id,
  title,
  lead,
  levels,
  defaultKey,
}: {
  id: string;
  title: string;
  lead: string;
  levels: LevelItem[];
  defaultKey: string;
}) {
  const [active, setActive] = useState<string>(defaultKey);
  const [motion, setMotion] = useState<"idle" | "pending" | "shown">("idle");
  const stairsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();
  // Anahtar boşluk içerebilir ("HSK 4") — id/aria başvurusu için güvenli hâle getirilir.
  const idOf = (key: string) => key.replace(/\s+/g, "-");

  useEffect(() => {
    const el = stairsRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    setMotion("pending");
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        setMotion("shown");
        io.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = levels.findIndex((l) => l.key === active);
    const next =
      e.key === "ArrowRight" || e.key === "ArrowUp"
        ? (i + 1) % levels.length
        : e.key === "ArrowLeft" || e.key === "ArrowDown"
          ? (i - 1 + levels.length) % levels.length
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? levels.length - 1
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(levels[next].key);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-baslik`}>
      <div className={styles.container}>
        <h2 id={`${id}-baslik`} className={styles.title}>
          {title}
        </h2>
        <p className={styles.lead}>{lead}</p>

        <div className={styles.stage}>
          <div
            ref={stairsRef}
            className={styles.stairs}
            role="tablist"
            aria-label="Dil seviyeleri"
            data-motion={motion}
            data-long={levels.some((l) => l.key.length > 2) || undefined}
            style={{ "--count": levels.length } as CSSProperties}
            onKeyDown={onKeyDown}
          >
            {levels.map((l, i) => {
              const selected = l.key === active;
              return (
                <button
                  key={l.key}
                  ref={(node) => {
                    tabRefs.current[i] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`${uid}-tab-${idOf(l.key)}`}
                  aria-selected={selected}
                  aria-controls={`${uid}-panel-${idOf(l.key)}`}
                  tabIndex={selected ? 0 : -1}
                  className={styles.step}
                  style={{ "--step": i } as CSSProperties}
                  onClick={() => setActive(l.key)}
                >
                  <span className={styles.key}>{l.key}</span>
                  <span className={styles.name}>{l.name}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.panels}>
            {levels.map((l) => (
              <div
                key={l.key}
                role="tabpanel"
                id={`${uid}-panel-${idOf(l.key)}`}
                aria-labelledby={`${uid}-tab-${idOf(l.key)}`}
                hidden={l.key !== active}
                className={styles.panel}
              >
                <h3 className={styles.panelTitle}>
                  <span className={styles.panelKey}>{l.key}</span> {l.name}
                </h3>
                <dl className={styles.facts}>
                  <div>
                    <dt>Bu seviyede</dt>
                    <dd>{l.can}</dd>
                  </div>
                  <div>
                    <dt>Belgelendiği sınavlar</dt>
                    <dd>{l.exams}</dd>
                  </div>
                  <div>
                    <dt>Kimin işine yarar</dt>
                    <dd>{l.who}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
