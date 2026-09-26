import type { CSSProperties } from "react";
import styles from "@/styles/HeroBackdrop.module.css";

/**
 * Ana Sayfa hero zemini (2026-09-26) — düz lacivert yerine derinlik:
 * yavaş kayan ışık lekeleri, farklı alfabelerden yüzen harfler, sağda nokta
 * dokusu. Saf CSS, dekoratif → `aria-hidden`. Header payı dahil tüm hero'yu
 * kaplar; içerik üstte kalır (HomeHero `.inner` z-index).
 */
const GLYPHS = ["A", "Ä", "Ç", "Ñ", "Ж", "Ω", "字", "あ"];

export function HeroBackdrop() {
  return (
    <div className={styles.backdrop} aria-hidden="true">
      <span className={`${styles.glow} ${styles.glowSky}`} />
      <span className={`${styles.glow} ${styles.glowViolet}`} />
      <span className={`${styles.glow} ${styles.glowLow}`} />
      <span className={styles.dots} />
      {GLYPHS.map((g, i) => (
        <span key={g} className={styles.glyph} style={{ "--i": i } as CSSProperties}>
          {g}
        </span>
      ))}
    </div>
  );
}
