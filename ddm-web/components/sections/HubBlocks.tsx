import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Reveal } from "@/components/ui";
import { PageSection } from "./PageSection";
import styles from "@/styles/HubBlocks.module.css";

/**
 * P3 — hub'lara özgü küçük bloklar. Hepsi sunucu bileşeni; link verilen her
 * hedef çağıran tarafta `isProducedPage()` süzgecinden geçmiş olmalı
 * (`href: null` → soluk düz metin, ölü link yok).
 */

/* ---------------------------------------------------------------
 * SplitColumns — iki kolon (Özel Dersler: dil / sınav)
 * ------------------------------------------------------------- */

export type SplitItem = {
  label: string;
  href: string | null;
  /** Hedef henüz yoksa okuru götürecek ÜRETİLMİŞ ana sayfa (ör. kurs sayfası). */
  parent?: { label: string; href: string } | null;
};

export function SplitColumns({
  id,
  title,
  lead,
  columns,
  ground = "light",
}: {
  id: string;
  title: string;
  lead?: string | null;
  columns: { title: string; intro: string; items: SplitItem[] }[];
  ground?: "light" | "gray";
}) {
  return (
    <PageSection id={id} ground={ground} title={title} lead={lead}>
      <div className={styles.split}>
        {columns.map((c) => (
          <div key={c.title} className={styles.splitCol}>
            <h3 className={styles.splitTitle}>
              {c.title}
              <span className={styles.splitCount}>{c.items.length}</span>
            </h3>
            <p className={styles.splitIntro}>{c.intro}</p>
            <Reveal>
              <ul className={styles.splitList}>
                {c.items.map((it) => (
                  <li key={it.label} className={it.href ? styles.splitRow : styles.splitRowSoon} data-reveal>
                    {it.href ? (
                      <Link href={it.href} className={styles.splitLink}>
                        {it.label}
                      </Link>
                    ) : (
                      <span className={styles.splitLabel}>{it.label}</span>
                    )}
                    {!it.href && it.parent && (
                      <Link href={it.parent.href} className={styles.splitParent}>
                        {it.parent.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        ))}
      </div>
    </PageSection>
  );
}

/* ---------------------------------------------------------------
 * LevelRail — seviye rayı (İngilizce Kursları: A1 → C2)
 * ------------------------------------------------------------- */

export type RailGroup = {
  label: string;
  range: string;
  levels: { title: string; text: string; href: string | null }[];
};

export function LevelRail({
  id,
  title,
  lead,
  groups,
}: {
  id: string;
  title: string;
  lead?: string | null;
  groups: RailGroup[];
}) {
  return (
    <PageSection id={id} title={title} lead={lead}>
      <ol className={styles.rail}>
        {groups.map((g) => (
          <li key={g.label} className={styles.railGroup}>
            <div className={styles.railHead}>
              <span className={styles.railDot} aria-hidden="true" />
              <span className={styles.railRange}>{g.range}</span>
              <span className={styles.railLabel}>{g.label}</span>
            </div>
            <ul className={styles.railLevels}>
              {g.levels.map((l) => (
                <li key={l.title} className={l.href ? styles.railLevel : styles.railLevelSoon}>
                  <h3 className={styles.railTitle}>
                    {l.href ? (
                      <Link href={l.href} className={styles.railLink}>
                        {l.title}
                      </Link>
                    ) : (
                      l.title
                    )}
                  </h3>
                  <p className={styles.railText}>{l.text}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </PageSection>
  );
}

/* ---------------------------------------------------------------
 * StatementRow — yan yana kısa kaynak bölümleri (başlık + paragraf)
 * ------------------------------------------------------------- */

export function StatementRow({
  items,
  tone = "light",
  headingLevel = "h2",
}: {
  items: { title: string; text: string }[];
  tone?: "light" | "gray";
  headingLevel?: "h2" | "h3";
}) {
  const H = headingLevel;
  return (
    <section className={tone === "gray" ? styles.statementsGray : styles.statements}>
      <div className={styles.statementsInner} style={{ ["--cols" as string]: items.length }}>
        {items.map((it) => (
          <div key={it.title} className={styles.statement}>
            <H className={styles.statementTitle}>{it.title}</H>
            <p className={styles.statementText}>{it.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
 * CheckList — işaretli madde listesi (Kurumsal hizmet maddeleri)
 * ------------------------------------------------------------- */

export function CheckList({ items, columns = 1 }: { items: string[]; columns?: 1 | 2 }) {
  return (
    <ul className={columns === 2 ? styles.checks2 : styles.checks}>
      {items.map((it) => (
        <li key={it} className={styles.check}>
          {it}
        </li>
      ))}
    </ul>
  );
}

/* ---------------------------------------------------------------
 * PartnerLogos — resmi kayıt ofisi olunan okulların logoları
 * ------------------------------------------------------------- */

export function PartnerLogos({
  logos,
  note,
}: {
  logos: { src: string; alt: string; width: number; height: number }[];
  note: string;
}) {
  return (
    <div className={styles.partners}>
      <ul className={styles.partnerList}>
        {logos.map((l) => (
          <li key={l.src} className={styles.partnerItem}>
            <Image src={l.src} alt={l.alt} width={l.width} height={l.height} className={styles.partnerImg} />
          </li>
        ))}
      </ul>
      <span className={styles.partnerNote}>{note}</span>
    </div>
  );
}

/* ---------------------------------------------------------------
 * AttributedFacts — başka bir kuruma ait rakamlar, kaynağıyla birlikte
 * (Yurtdışı: Kaplan International — kullanıcı kararı 2026-09-23)
 * ------------------------------------------------------------- */

export function AttributedFacts({ source, facts }: { source: ReactNode; facts: string[] }) {
  return (
    <figure className={styles.facts}>
      <ul className={styles.factList}>
        {facts.map((f) => (
          <li key={f} className={styles.fact}>
            {f}
          </li>
        ))}
      </ul>
      <figcaption className={styles.factSource}>{source}</figcaption>
    </figure>
  );
}

/* ---------------------------------------------------------------
 * IndexCard — hero'da görsel yerine program dizini (Diğer Programlar)
 * ------------------------------------------------------------- */

export function IndexCard({ title, items }: { title: string; items: { label: string; href: string | null }[] }) {
  return (
    <nav className={styles.index} aria-label={title}>
      <p className={styles.indexTitle}>{title}</p>
      <ul className={styles.indexList}>
        {items.map((it) => (
          <li key={it.label}>
            {it.href ? (
              <Link href={it.href} className={styles.indexLink}>
                {it.label}
              </Link>
            ) : (
              <span className={styles.indexSoon}>{it.label}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Alt başlık + işaretli liste (Yurtdışı: "Yetişkinler için Almanca kurslarımız"). */
export function SubList({
  title,
  items,
  as: H = "h4",
  columns = 1,
}: {
  title: string;
  items: string[];
  as?: "h3" | "h4";
  columns?: 1 | 2;
}) {
  return (
    <>
      <H className={styles.subTitle}>{title}</H>
      <CheckList items={items} columns={columns} />
    </>
  );
}
