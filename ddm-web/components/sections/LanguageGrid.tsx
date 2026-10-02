"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { Kicker } from "@/components/ui";
import { UiIcon } from "@/components/graphics/Icon";
import { LanguageGlobe } from "@/components/graphics/LanguageGlobe";
import { LanguagePanel, LanguageTile } from "@/components/cards/LanguageCard";
import { LANGUAGE_SECTION } from "@/data/home";
import styles from "@/styles/LanguageGrid.module.css";

/** Izgaranın kolon sayıları — `LanguageGrid.module.css` breakpoint'leriyle birebir. */
const COLUMNS = { sm: 2, md: 3, lg: 5 } as const;

/**
 * Detay paneli seçili kutunun bulunduğu SATIRIN hemen altına oturur.
 * Kutular çift `order` (0, 2, 4…) alır; panelin `order`'ı o satırın son
 * kutusunun bir fazlası (tek sayı). Kolon sayısı breakpoint'e göre değiştiği
 * için üç değer de CSS değişkeni olarak verilir, CSS doğru olanı seçer —
 * JS ölçümü yok, sunucu çıktısıyla ilk boyama aynı (yerleşim kayması yok).
 */
function panelOrder(index: number, cols: number, total: number) {
  const rowEnd = Math.min(Math.floor(index / cols) * cols + cols - 1, total - 1);
  return rowEnd * 2 + 1;
}

/**
 * Bölüm 5 · Dil kursları — 10 dil tek bakışta (5×2), tıklanan dilin
 * "Program detayları" bağlantıları altta tek panelde.
 *
 * UI turu (2026-09-24, kullanıcı seçimi "4A"). Eski `<details>` kartlarında
 * bir kart açılınca satırdaki diğer kartlar da boyuna uzuyordu; tek panel
 * bunu yapısal olarak ortadan kaldırıyor. Kaynak: `DDM Ana Sayfa.dc.html` bölüm 5.
 */
export function LanguageGrid() {
  const { kicker, title, lead, cta, cards } = LANGUAGE_SECTION;
  const [active, setActive] = useState<number | null>(0);

  const panelStyle =
    active === null
      ? undefined
      : ({
          "--order-sm": panelOrder(active, COLUMNS.sm, cards.length),
          "--order-md": panelOrder(active, COLUMNS.md, cards.length),
          "--order-lg": panelOrder(active, COLUMNS.lg, cards.length),
        } as CSSProperties);

  return (
    <section id="dil-kurslari" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <div className={styles.copy}>
            <Kicker>{kicker}</Kicker>
            <h2 className={styles.title}>{title}</h2>
            {lead.map((p) => (
              <p key={p} className={styles.lead}>
                {p}
              </p>
            ))}
          </div>
          <LanguageGlobe />
        </div>

        <div className={styles.grid}>
          {cards.map((card, i) => (
            <LanguageTile
              key={card.key}
              card={card}
              panelId={`dil-panel-${card.key}`}
              active={active === i}
              onSelect={() => setActive((cur) => (cur === i ? null : i))}
              order={i * 2}
            />
          ))}
          <div className={styles.panelSlot} style={panelStyle} hidden={active === null}>
            {cards.map((card, i) => (
              <LanguagePanel
                key={active === i ? `${card.key}-open` : card.key}
                card={card}
                id={`dil-panel-${card.key}`}
                active={active === i}
              />
            ))}
          </div>
        </div>

        <div className={styles.footer}>
          <Link href={cta.href} className={styles.cta}>
            {cta.label}
            <UiIcon name="arrowRight" size={15} strokeWidth={1.7} />
          </Link>
        </div>
      </div>
    </section>
  );
}
