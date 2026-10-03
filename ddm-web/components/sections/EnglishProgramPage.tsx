import Image from "next/image";
import Link from "next/link";

import { SiteChrome } from "@/components/layout";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Icon } from "@/components/graphics/Icon";
import type { IconName } from "@/components/graphics/icons";
import { ContactForm } from "@/components/sections/ContactForm";
import { FORM_HREF } from "@/lib/formAnchor";
import { EnglishBand } from "@/components/sections/EnglishLevelPage";
import { SourcesFooter } from "@/components/sections/SourcesFooter";
import { Accordion, ButtonLink } from "@/components/ui";
import { Reveal } from "@/components/ui/Reveal";
import { LEVEL_COPY as COPY } from "@/data/englishLevels";
import type { EnglishProgramPage as PageData, ProgramResolvedBlock } from "@/lib/englishProgramContent";
import hero from "@/styles/RichHero.module.css";
import styles from "@/styles/EnglishProgramPage.module.css";

const BRANCHES_ID = "kurs-tarihleri";

/**
 * P5 — İngilizce hedef kitle programı (İlköğretim, Üniversite Hazırlık, YKS Dil, Yaz Okulu). Seviye
 * sayfalarından ayrı kart ailesi: lacivert fotoğraflı hero (P4 `RichHero` görünümü) + program şeridi;
 * ilk bölüm açık mavi panelde sayfanın baskın bloğu (kartlar / adımlar / soru dağılımı / rakamlar),
 * sonra 1–2 destek bölümü, SSS; gri bantta şubeler ve program listesi (seviye sayfalarıyla ortak).
 */
export function EnglishProgramPage({ page }: { page: PageData }) {
  return (
    <SiteChrome ctaLabel="Bilgi Al">
      <section className={hero.section}>
        <div className={hero.photo}>
          <Image
            src={page.hero.photo.src}
            alt={page.hero.photo.alt}
            width={page.hero.photo.width}
            height={page.hero.photo.height}
            preload
            sizes="(max-width: 999px) 100vw, 60vw"
            className={hero.img}
          />
        </div>
        <div className={hero.container}>
          <div className={hero.copy}>
            <Breadcrumb items={page.crumbs} tone="onDark" />
            <h1 className={hero.title}>{page.h1}</h1>
            <p className={hero.lead}>{page.hero.lead}</p>
            <div className={hero.actions}>
              <ButtonLink href={FORM_HREF} variant="onDark" size="lg" arrow>
                Bilgi Al
              </ButtonLink>
              <ButtonLink href={`#${BRANCHES_ID}`} variant="outlineDark" size="lg">
                Kurs tarihleri
              </ButtonLink>
            </div>
            <ul className={hero.facts}>
              {page.hero.facts.map((f) => (
                <li key={f.label} className={hero.fact}>
                  <Icon name={f.icon} size={20} className={hero.factIcon} />
                  {f.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <nav className={styles.strip} aria-label="Hedefinize göre İngilizce programları">
        <div className={styles.stripInner}>
          {page.strip.map((s) =>
            s.current ? (
              <span key={s.label} className={`${styles.stripItem} ${styles.stripCurrent}`} aria-current="page">
                {s.label}
              </span>
            ) : s.href ? (
              <Link key={s.label} href={s.href} className={styles.stripItem}>
                {s.label}
              </Link>
            ) : (
              <span key={s.label} className={`${styles.stripItem} ${styles.stripSoon}`}>
                {s.label}
              </span>
            ),
          )}
        </div>
      </nav>

      <div className={styles.body}>
        {page.sections.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            className={i === 0 ? styles.lead : styles.row}
            aria-labelledby={`${s.id}-baslik`}
          >
            <h2 id={`${s.id}-baslik`} className={styles.rowTitle}>
              {s.title}
            </h2>
            <p className={styles.answer}>{s.answer}</p>
            {s.blocks.map((b, j) => (
              <ProgramBlock key={j} block={b} />
            ))}
          </section>
        ))}

        <section id="sss" className={styles.row} aria-labelledby="sss-baslik">
          <h2 id="sss-baslik" className={styles.rowTitle}>
            {COPY.faqTitle}
          </h2>
          <div className={styles.faq}>
            <Accordion items={page.faq} name="sss" />
          </div>
          <SourcesFooter sources={page.sources} updated={page.updated} className={styles.footnote} />
        </section>
      </div>

      <EnglishBand id={BRANCHES_ID} branches={page.branches} programs={page.programs} />

      <ContactForm
        ground="white"
        title={COPY.cta.title}
        lead={COPY.cta.sub}
        course={page.href}
        link={{ label: "İngilizce Kursları", href: "/ingilizce-kurslari" }}
      />
    </SiteChrome>
  );
}

/** Firma cümlelerinden ilk üçü açık; kalanı "Ayrıntılı bilgi" altında (sayfada uzun madde yığını yok). */
const HIGHLIGHTS_VISIBLE = 3;

function HighlightList({ items }: { items: { icon: IconName; text: string }[] }) {
  return (
    <ul className={styles.highlightsList}>
      {items.map((h) => (
        <li key={h.text}>
          <span className={styles.highlightsIcon} aria-hidden="true">
            <Icon name={h.icon} size={18} />
          </span>
          {h.text}
        </li>
      ))}
    </ul>
  );
}

function ProgramBlock({ block }: { block: ProgramResolvedBlock }) {
  switch (block.kind) {
    case "cards":
      return (
        <Reveal className={styles.cards}>
          {block.items.map((c) => (
            <div key={c.title} className={styles.card} data-reveal>
              <span className={styles.cardIcon} aria-hidden="true">
                <Icon name={c.icon} size={20} />
              </span>
              <h3 className={styles.cardTitle}>{c.title}</h3>
              <p className={styles.cardText}>{c.text}</p>
            </div>
          ))}
        </Reveal>
      );
    case "steps":
      return (
        <Reveal className={styles.steps}>
          {block.items.map((s, i) => (
            <div key={s.title} className={styles.step} data-reveal>
              <span className={styles.stepNum} aria-hidden="true">
                {i + 1}
              </span>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardText}>{s.text}</p>
            </div>
          ))}
        </Reveal>
      );
    case "facts":
      return (
        <div className={styles.factsWrap}>
          <dl className={styles.facts}>
            {block.items.map((f) => (
              <div key={f.label} className={styles.factTile}>
                <dt className={styles.factLabel}>{f.label}</dt>
                <dd className={styles.factValue}>{f.value}</dd>
              </div>
            ))}
          </dl>
          <div className={styles.factNote}>
            {block.note.map((n) => (
              <p key={n}>{n}</p>
            ))}
          </div>
        </div>
      );
    case "distribution": {
      const max = Math.max(...block.items.map((x) => x.count));
      return (
        <div className={styles.dist}>
          <h3 className={styles.distTitle}>{block.heading}</h3>
          <ol className={styles.distList}>
            {block.items.map((x) => (
              <li key={x.label} className={styles.distRow}>
                <span className={styles.distLabel}>
                  {x.label}
                  {x.detail && <span className={styles.distDetail}>{x.detail}</span>}
                </span>
                <span className={styles.distBar} aria-hidden="true">
                  <span style={{ width: `${(x.count / max) * 100}%` }} />
                </span>
                <span className={styles.distCount}>{x.count} soru</span>
              </li>
            ))}
          </ol>
          <p className={styles.distTotal}>
            Toplam <strong>{block.total} soru</strong> · {block.note}
          </p>
        </div>
      );
    }
    case "table":
      return (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption className={styles.tableCaption}>{block.caption}</caption>
            <thead>
              <tr>
                {block.head.map((h) => (
                  <th key={h} scope="col">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, i) =>
                    i === 0 ? (
                      <th key={i} scope="row">
                        {cell}
                      </th>
                    ) : (
                      <td key={i}>{i === row.length - 1 ? <span className={styles.levelPill}>{cell}</span> : cell}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <p className={styles.tableNote}>{block.note}</p>
        </div>
      );
    case "highlights":
      return (
        <div className={block.photo ? styles.highlightsPhoto : styles.highlights}>
          {block.photo && (
            <Image
              src={block.photo.src}
              alt={block.photo.alt}
              width={block.photo.width}
              height={block.photo.height}
              sizes="(max-width: 999px) 100vw, 480px"
              className={styles.highlightsImg}
            />
          )}
          <div>
            <HighlightList items={block.items.slice(0, HIGHLIGHTS_VISIBLE)} />
            {block.items.length > HIGHLIGHTS_VISIBLE && (
              <details className={styles.more}>
                <summary className={styles.moreSummary}>{COPY.moreLabel}</summary>
                <HighlightList items={block.items.slice(HIGHLIGHTS_VISIBLE)} />
              </details>
            )}
          </div>
        </div>
      );
    case "chips":
      return (
        <div className={styles.chips}>
          <h3 className={styles.chipsTitle}>{block.title}</h3>
          <ul className={styles.chipList}>
            {block.items.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      );
    case "links":
      return (
        <ul className={styles.links}>
          {block.items.map((l) => (
            <li key={l.label}>
              {l.href ? (
                <Link href={l.href} className={styles.linkCard}>
                  <Icon name={l.icon} size={20} />
                  {l.label}
                </Link>
              ) : (
                <span className={`${styles.linkCard} ${styles.linkSoon}`}>
                  <Icon name={l.icon} size={20} />
                  {l.label}
                </span>
              )}
            </li>
          ))}
        </ul>
      );
  }
}
