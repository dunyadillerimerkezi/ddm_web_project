"use client";

import { useState } from "react";
import Link from "next/link";
import { Kicker } from "@/components/ui";
import { UiIcon } from "@/components/graphics/Icon";
import { LanguageGlobe } from "@/components/graphics/LanguageGlobe";
import { LanguageCard } from "@/components/cards/LanguageCard";
import { LANGUAGE_SECTION } from "@/data/home";
import styles from "@/styles/LanguageGrid.module.css";

/**
 * Bölüm 5 · Dil kursları ızgarası — 10 kart, ilk 6 her zaman görünür, kalan
 * 4'ü "Tüm dilleri göster" ile açılır (tek client state, şablondaki
 * `showAllLangs`'in karşılığı).
 *
 * Kaynak: `DDM Ana Sayfa.dc.html` bölüm 5.
 */
export function LanguageGrid() {
  const [showAll, setShowAll] = useState(false);
  const { kicker, title, lead, cta, showAllLabel, showLessLabel, alwaysVisibleCount, cards } =
    LANGUAGE_SECTION;

  const visibleCards = showAll ? cards : cards.slice(0, alwaysVisibleCount);

  return (
    <section id="dil-kurslari" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <div className={styles.copy}>
            <Kicker>{kicker}</Kicker>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.lead}>{lead}</p>
          </div>
          <LanguageGlobe />
        </div>

        <div className={styles.grid}>
          {visibleCards.map((card) => (
            <LanguageCard card={card} key={card.key} />
          ))}
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
          >
            {showAll ? showLessLabel : showAllLabel}
            <UiIcon
              name="caretDown"
              size={12}
              strokeWidth={1.7}
              className={showAll ? styles.caretOpen : undefined}
            />
          </button>
          <Link href={cta.href} className={styles.cta}>
            {cta.label}
            <UiIcon name="arrowRight" size={15} strokeWidth={1.7} />
          </Link>
        </div>
      </div>
    </section>
  );
}
