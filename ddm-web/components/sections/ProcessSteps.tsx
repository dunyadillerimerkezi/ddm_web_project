"use client";

import { useEffect, useRef, useState } from "react";
import { PageSection } from "./PageSection";
import styles from "@/styles/ProcessSteps.module.css";

export type ProcessStep = { title: string; body: string };

/**
 * Bölüm "PROGRAMIN İŞLEYİŞİ" — 3 adımlı şerit, ekrana girince dolan çizgi.
 *
 * Kaynak: `DDM Üniversite Proficiency Sayfası.dc.html` bölüm 5
 * (`data-step-track/-fill/-dot`). Orijinalde `fillSteps()` bir `scroll`
 * dinleyicisiyle tetikleniyordu ama asla temizlenmiyordu; burada tek seferlik
 * `IntersectionObserver` kullanılıyor — aynı görsel sonuç, temiz kaldırma.
 *
 * Adımlar her zaman TAM 3 — üniversite verisinde giriş paragrafı sayısı
 * (3 veya 4) fark etmeksizin `lib/universityContent.ts` bunları 3 sabit
 * başlığa gruplar (bkz. plan §7 "Giriş paragraflarının dağılımı").
 */
export function ProcessSteps({
  steps,
  id = "isleyis",
  kicker = "PROGRAMIN İŞLEYİŞİ",
  title = "Seviye tespitinden sınav tekniğine üç adım",
  lead,
  ground = "light",
}: {
  steps: ProcessStep[];
  /** P3: hub'lar kendi başlığını/çapasını verir; varsayılanlar 6.5 üniversite şablonu. */
  id?: string;
  kicker?: string;
  title?: string;
  lead?: string;
  ground?: "light" | "gray";
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFilled(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <PageSection id={id} ground={ground} kicker={kicker} title={title} lead={lead}>
      <div className={styles.track} ref={trackRef}>
        <div className={styles.rail} />
        <div className={styles.fill} style={{ width: filled ? "100%" : "0%" }} />
        <div className={styles.grid}>
          {steps.map((step, i) => (
            <div className={styles.item} key={step.title}>
              <span
                className={`${styles.dot} ${filled ? styles.dotFilled : ""}`}
                style={{ transitionDelay: `${i * 160}ms` }}
              >
                {i + 1}
              </span>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.body}>{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </PageSection>
  );
}
