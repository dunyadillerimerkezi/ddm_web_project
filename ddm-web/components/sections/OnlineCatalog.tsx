import Link from "next/link";

import { Flag, type FlagCode } from "@/components/graphics/Flag";
import { UiIcon } from "@/components/graphics/Icon";
import { Reveal } from "@/components/ui";
import styles from "@/styles/OnlineCatalog.module.css";

type Group = {
  title: string;
  lead: string;
  cards: { label: string; href: string | null; flag: FlagCode | null; greeting: string }[];
  chipsLabel: string | null;
  chips: { label: string; href: string | null }[];
};

/**
 * P4 — online çatı sayfasının baskın bölümü: kaynağın iki başlığı ve
 * cümlesi (birebir), altında dil kartları (online sayfasına) ve sınav
 * etiketleri (sınav hazırlık sayfasına). Üretilmemiş hedef düz metin kalır —
 * href'ler `RichContentPage`te `linkIfProduced`den geçmiş gelir.
 */
export function OnlineCatalog({ id, groups }: { id: string; groups: Group[] }) {
  return (
    <section id={id} className={styles.section}>
      <div className={styles.container}>
        {groups.map((g, gi) => (
          <div key={g.title} className={styles.group} aria-labelledby={`${id}-${gi}`} role="group">
            <h2 id={`${id}-${gi}`} className={styles.title}>
              {g.title}
            </h2>
            <p className={styles.lead}>{g.lead}</p>

            {g.cards.length > 0 && (
              <Reveal>
                <ul className={styles.cards}>
                  {g.cards.map((c) => {
                    const body = (
                      <>
                        {c.flag && <Flag code={c.flag} width={36} className={styles.flag} />}
                        <span className={styles.cardText}>
                          <span className={styles.cardLabel}>Online {c.label}</span>
                          <span className={styles.greeting}>
                            {c.greeting}
                          </span>
                        </span>
                        {c.href && <UiIcon name="arrowRight" size={12} className={styles.arrow} />}
                      </>
                    );
                    return (
                      <li key={c.label} data-reveal>
                        {c.href ? (
                          <Link href={c.href} className={styles.card}>
                            {body}
                          </Link>
                        ) : (
                          <span className={styles.card}>{body}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            )}

            {g.chips.length > 0 && (
              <div className={styles.chipRow}>
                {g.chipsLabel && <span className={styles.chipsLabel}>{g.chipsLabel}</span>}
                <ul className={styles.chips}>
                  {g.chips.map((c) => (
                    <li key={c.label}>
                      {c.href ? (
                        <Link href={c.href} className={styles.chipLink}>
                          {c.label}
                        </Link>
                      ) : (
                        <span className={styles.chip}>{c.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
