import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Reveal } from "@/components/ui";
import { HubToc } from "./HubToc";
import styles from "@/styles/HubGuide.module.css";

/**
 * P3 — hub gövdesi: solda yapışkan dizin, sağda gruplar hâlinde editoryal
 * liste (onaylanan "C" yönü). Her grup: başlık + kısa açıklama + satırlar.
 *
 * Satırın `href`i null ise hedef sayfa henüz üretilmemiştir → link basılmaz,
 * satır soluk durur ("yakında" — menüdeki `soon` deseniyle aynı, CLAUDE.md §10).
 */

export type HubGuideItem = {
  title: string;
  href: string | null;
  /** Logo varsa o, yoksa kod rozeti. */
  mark: { code: string; logo: string | null };
  text: string;
  side?: { value: string; label: string };
  badge?: string;
};

export type HubGuideGroup = {
  id: string;
  label: string;
  /** Dizinde gösterilecek kısa ad (yoksa `label`). */
  tocLabel?: string;
  intro: string | string[];
  items?: HubGuideItem[];
  /** Satır listesi yerine/yanında serbest içerik (ör. Yurtdışı dil blokları). */
  body?: ReactNode;
  footer?: ReactNode;
};

export function HubGuide({
  id,
  title,
  lead,
  tocLabel,
  groups,
  tocExtra = [],
}: {
  id: string;
  title: string;
  lead: string[];
  tocLabel: string;
  groups: HubGuideGroup[];
  /** Dizinin sonuna eklenen sayfa içi çapalar (karşılaştırma, SSS…). */
  tocExtra?: { id: string; label: string }[];
}) {
  const tocItems = [
    ...groups.map((g) => ({ id: g.id, label: g.tocLabel ?? g.label, count: g.items?.length })),
    ...tocExtra,
  ];

  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-baslik`}>
      <div className={styles.container}>
        <HubToc label={tocLabel} items={tocItems} />

        <div className={styles.body}>
          <header className={styles.head}>
            <h2 id={`${id}-baslik`} className={styles.title}>
              {title}
            </h2>
            {lead.map((p) => (
              <p key={p} className={styles.lead}>
                {p}
              </p>
            ))}
          </header>

          <Reveal>
            {groups.map((g) => (
              <section key={g.id} id={g.id} className={styles.group} aria-labelledby={`${g.id}-baslik`}>
                <h3 id={`${g.id}-baslik`} className={styles.groupTitle}>
                  {g.label}
                </h3>
                {(Array.isArray(g.intro) ? g.intro : [g.intro]).map((p) => (
                  <p key={p} className={styles.groupIntro}>
                    {p}
                  </p>
                ))}
                {g.body}
                {g.items && g.items.length > 0 && (
                  <ul className={styles.rows}>
                    {g.items.map((it) => (
                      <li key={it.title} className={it.href ? styles.row : styles.rowSoon} data-reveal>
                        <span className={styles.mark}>
                          {it.mark.logo ? (
                            <Image src={it.mark.logo} alt="" width={110} height={36} className={styles.logo} />
                          ) : (
                            <span className={styles.code}>{it.mark.code}</span>
                          )}
                        </span>
                        <span className={styles.rowBody}>
                          <span className={styles.rowTitle}>
                            {it.href ? (
                              <Link href={it.href} className={styles.rowLink}>
                                {it.title}
                              </Link>
                            ) : (
                              it.title
                            )}
                          </span>
                          <span className={styles.rowText}>{it.text}</span>
                        </span>
                        {(it.side || it.badge) && (
                          <span className={styles.side}>
                            {it.side && (
                              <>
                                <span className={styles.sideValue}>{it.side.value}</span>
                                <span className={styles.sideLabel}>{it.side.label}</span>
                              </>
                            )}
                            {it.badge && <span className={styles.badge}>{it.badge}</span>}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
                {g.footer}
              </section>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
