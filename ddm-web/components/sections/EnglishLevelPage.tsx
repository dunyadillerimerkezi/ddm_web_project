import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { SiteChrome } from "@/components/layout";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Icon } from "@/components/graphics/Icon";
import type { IconName } from "@/components/graphics/icons";
import { ContactForm } from "@/components/sections/ContactForm";
import { FORM_HREF } from "@/lib/formAnchor";
import { SourcesFooter } from "@/components/sections/SourcesFooter";
import { Accordion, ButtonLink } from "@/components/ui";
import { Reveal } from "@/components/ui/Reveal";
import { HOURS_SCALE, LEVEL_COPY as COPY } from "@/data/englishLevels";
import type { EnglishLevelPage as PageData, EnglishTemplate, LadderStep, ProgramLink } from "@/lib/englishLevelContent";
import styles from "@/styles/EnglishLevelPage.module.css";

const BRANCHES_ID = "kurs-tarihleri";

/**
 * P5 — İngilizce seviye sayfası (kullanıcı, 2026-09-27: "B · seviye kartı"). Açık hero + sağda
 * seviye kartı (CEFR kodu, kelime / IELTS / Cambridge / kur, önceki · sonraki seviye); gövdede solda
 * yapışkan seviye merdiveni (A1 altta → C1 üstte), sağda soru başlıklı bölümler; gri bantta şube
 * kartları ve program listesi. Tek hareket: kart açılışta bir kez yükselir; kartlar ekrana girince
 * bir kez belirir (reduced-motion'da ikisi de yok).
 */
export function EnglishLevelPage({ page }: { page: PageData }) {
  const { hero } = page;
  return (
    <SiteChrome ctaLabel="Bilgi Al">
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.copy}>
            <Breadcrumb items={page.crumbs} tone="onLight" />
            <h1 className={styles.title}>
              {page.h1.main}
              {page.h1.sub && <span className={styles.titleSub}>{page.h1.sub}</span>}
            </h1>
            <p className={styles.lead}>{hero.lead}</p>
            <div className={styles.actions}>
              <ButtonLink href={FORM_HREF} variant="primary" size="lg" arrow>
                Bilgi Al
              </ButtonLink>
              <ButtonLink href={`#${BRANCHES_ID}`} variant="outlineLight" size="lg">
                Kurs tarihleri
              </ButtonLink>
            </div>
          </div>

          <article className={styles.card} aria-label={`${page.code} seviye kartı`}>
            <div className={styles.cardTop}>
              <p className={styles.cardCaption}>{hero.caption}</p>
              <div className={styles.cardHead}>
                <span className={styles.code} aria-hidden="true">
                  {page.code[0]}
                  <span className={styles.codeNum}>{page.code[1]}</span>
                </span>
                <div>
                  <p className={styles.cardName}>
                    {hero.card.name} · {hero.card.trName}
                  </p>
                  <p className={styles.cardCefr}>
                    CEFR {page.code} · {hero.card.cefr.name} · {hero.card.cefr.group.toLocaleLowerCase("tr")}
                  </p>
                </div>
              </div>
            </div>
            <dl className={styles.facts}>
              {hero.card.facts.map((f) => (
                <div key={f.label} className={styles.fact}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
            <nav className={styles.cardNav} aria-label="Önceki ve sonraki seviye">
              <StepLink step={hero.prev} dir="prev" />
              <StepLink step={hero.next} dir="next" />
            </nav>
          </article>
        </div>
      </section>

      <div className={styles.body}>
        <nav className={styles.chips} aria-label="İngilizce seviyeleri">
          {page.ladder.map((s) => (
            <LadderItem key={s.code} step={s} variant="chip" />
          ))}
        </nav>

        <div className={styles.layout}>
          <nav className={styles.ladder} aria-label="İngilizce seviyeleri">
            <p className={styles.ladderTitle}>{COPY.ladderTitle}</p>
            <ol className={styles.ladderList}>
              <li>
                <span className={styles.stepC2}>
                  <span className={styles.stepCode}>C2</span>
                  {COPY.c2}
                </span>
              </li>
              {[...page.ladder].reverse().map((s) => (
                <li key={s.code}>
                  <LadderItem step={s} variant="step" />
                </li>
              ))}
            </ol>
          </nav>

          <div className={styles.main}>
            <section className={styles.row} aria-labelledby="neler-yapabilirsiniz-baslik">
              <h2 id="neler-yapabilirsiniz-baslik" className={styles.rowTitle}>
                {COPY.canDoTitle(page.code)}
              </h2>
              <p className={styles.answer}>{page.canDo.answer}</p>
              <Reveal className={styles.skills}>
                {page.canDo.skills.map((s) => (
                  <div key={s.label} className={styles.skill} data-reveal>
                    <Image
                      src={s.photo.src}
                      alt={s.photo.alt}
                      width={s.photo.width}
                      height={s.photo.height}
                      sizes="(max-width: 560px) 84px, 120px"
                      className={styles.skillPhoto}
                    />
                    <div>
                      <h3 className={styles.skillTitle}>
                        <Icon name={s.icon} size={18} />
                        {s.label}
                      </h3>
                      <p className={styles.skillText}>{s.text}</p>
                    </div>
                  </div>
                ))}
              </Reveal>
            </section>

            {page.why && (
              <section id={page.why.id} className={styles.row} aria-labelledby={`${page.why.id}-baslik`}>
                <h2 id={`${page.why.id}-baslik`} className={styles.rowTitle}>
                  {page.why.title}
                </h2>
                <p className={styles.answer}>{page.why.answer}</p>
                <Reveal className={styles.whyCards}>
                  {page.why.cards.map((c) => (
                    <div key={c.text} className={styles.whyCard} data-reveal>
                      <span className={styles.whyIcon} aria-hidden="true">
                        <Icon name={c.icon} size={22} />
                      </span>
                      <p className={styles.whyText}>{c.text}</p>
                    </div>
                  ))}
                </Reveal>
              </section>
            )}

            <section id={page.techniques.id} className={styles.row} aria-labelledby={`${page.techniques.id}-baslik`}>
              <h2 id={`${page.techniques.id}-baslik`} className={styles.rowTitle}>
                {page.techniques.title}
              </h2>
              <p className={styles.answer}>{page.techniques.answer}</p>
              <div className={styles.twoCol}>
                <ol className={styles.steps}>
                  {page.techniques.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
                <aside className={styles.panel}>
                  <Image
                    src={page.techniques.photo.src}
                    alt={page.techniques.photo.alt}
                    width={page.techniques.photo.width}
                    height={page.techniques.photo.height}
                    sizes="(max-width: 999px) 100vw, 360px"
                    className={styles.panelPhoto}
                  />
                  <h3 className={styles.panelTitle}>{page.techniques.highlightsTitle}</h3>
                  <ul className={styles.panelList}>
                    {page.techniques.highlights.map((h) => (
                      <li key={h.text}>
                        <span className={styles.panelIcon} aria-hidden="true">
                          <Icon name={h.icon} size={18} />
                        </span>
                        {h.text}
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>
            </section>

            <section id={page.about.id} className={styles.row} aria-labelledby={`${page.about.id}-baslik`}>
              <h2 id={`${page.about.id}-baslik`} className={styles.rowTitle}>
                {page.about.title}
              </h2>
              <p className={styles.answer}>{page.about.answer}</p>
              <Reveal className={styles.aboutCards}>
                {page.about.cards.map((c) => (
                  <div key={c.title} className={styles.aboutCard} data-reveal>
                    <span className={styles.aboutIcon} aria-hidden="true">
                      <Icon name={c.icon} size={20} />
                    </span>
                    <h3 className={styles.aboutTitle}>{c.title}</h3>
                    <p className={styles.aboutText}>{c.text}</p>
                  </div>
                ))}
              </Reveal>
              {page.about.points && (
                <div className={styles.points}>
                  <h3 className={styles.pointsTitle}>{page.about.points.title}</h3>
                  <ul className={styles.pointsList}>
                    {page.about.points.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              <CompareTable levels={page.about.compare} />
              <p className={styles.compareNote}>{COPY.compareNote}</p>
            </section>

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
        </div>
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

/** Gri bant: şube kurs tarihleri + Eğitim Sistemi linki + seviye / program listesi (seviye ve program sayfaları ortak). */
export function EnglishBand({ id, branches, programs }: { id: string } & EnglishTemplate) {
  return (
    <section id={id} className={styles.band} aria-labelledby={`${id}-baslik`}>
      <div className={styles.bandInner}>
        <h2 id={`${id}-baslik`} className={styles.bandTitle}>
          {branches.title}
        </h2>
        <p className={styles.bandAnswer}>{branches.answer}</p>
        <ul className={styles.branchGrid}>
          {branches.items.map((b) => (
            <li key={b.branch.slug}>
              <Link href={b.href} className={styles.branchCard}>
                <span className={styles.branchName}>{b.branch.name}</span>
                {b.branch.address && (
                  <span className={styles.branchAddress}>
                    <Icon name="konum" size={16} />
                    {b.branch.address}
                  </span>
                )}
                <span className={styles.branchLink}>{b.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href={branches.system.href} className={styles.systemLink}>
          <Icon name="calisma" size={18} />
          {branches.system.label}
        </Link>

        <h2 className={styles.programsTitle}>{programs.title}</h2>
        <div className={styles.programCols}>
          <ProgramList title={COPY.levelsGroup} links={programs.levels} />
          <ProgramList title={COPY.programsGroup} links={programs.programs} />
        </div>
      </div>
    </section>
  );
}

function StepLink({ step, dir }: { step: LadderStep | null; dir: "prev" | "next" }) {
  if (!step) return <span />;
  const label = dir === "prev" ? "Önceki seviye" : "Sonraki seviye";
  const body = (
    <>
      <small className={styles.cardNavLabel}>{label}</small>
      {step.code} · {step.name}
    </>
  );
  const cls = dir === "prev" ? styles.cardNavPrev : styles.cardNavNext;
  return step.href ? (
    <Link href={step.href} className={cls}>
      {body}
    </Link>
  ) : (
    <span className={`${cls} ${styles.cardNavSoon}`}>{body}</span>
  );
}

function LadderItem({ step, variant }: { step: LadderStep; variant: "step" | "chip" }) {
  const content =
    variant === "step" ? (
      <>
        <span className={styles.stepCode}>{step.code}</span>
        {step.name}
      </>
    ) : (
      <>
        {step.code}
        {step.current && ` · ${step.name}`}
      </>
    );
  const base = variant === "step" ? styles.step : styles.chip;
  if (step.current) {
    return (
      <span className={`${base} ${variant === "step" ? styles.stepCurrent : styles.chipCurrent}`} aria-current="page">
        {content}
      </span>
    );
  }
  return step.href ? (
    <Link href={step.href} className={base}>
      {content}
    </Link>
  ) : (
    <span className={`${base} ${variant === "step" ? styles.stepSoon : styles.chipSoon}`}>{content}</span>
  );
}

type CompareLevel = PageData["about"]["compare"][number];

const GROUP_CLASS: Record<CompareLevel["cefr"]["group"], string> = {
  "Temel kullanıcı": styles.groupBasic,
  "Bağımsız kullanıcı": styles.groupIndependent,
  "Yetkin kullanıcı": styles.groupProficient,
};

/** Önceki · bu · sonraki seviye — rozetli sütun başlıkları, ikonlu satırlar, ders saati çubuğu. */
function CompareTable({ levels }: { levels: CompareLevel[] }) {
  const rows: { icon: IconName; label: string; cell: (c: CompareLevel) => ReactNode }[] = [
    {
      icon: "grup",
      label: COPY.compareRows.group,
      cell: (c) => <span className={`${styles.pill} ${GROUP_CLASS[c.cefr.group]}`}>{c.cefr.group}</span>,
    },
    { icon: "sohbet", label: COPY.compareRows.summary, cell: (c) => c.cefr.summary },
    {
      icon: "puan",
      label: COPY.compareRows.ielts,
      cell: (c) => (c.cefr.ielts ? <span className={styles.score}>{c.cefr.ielts}</span> : <span className={styles.none}>{COPY.noIelts}</span>),
    },
    {
      icon: "belge",
      label: COPY.compareRows.cambridge,
      cell: (c) => (c.cefr.cambridge ? <span className={styles.exam}>{c.cefr.cambridge}</span> : <span className={styles.none}>—</span>),
    },
    {
      icon: "sure",
      label: COPY.compareRows.hours,
      cell: (c) =>
        c.cefr.hours ? (
          <span className={styles.hours}>
            yaklaşık {c.cefr.hours}
            <span className={styles.hoursBar} aria-hidden="true">
              <span style={{ "--w": `${(hoursUpper(c.cefr.hours) / HOURS_SCALE) * 100}%` } as CSSProperties} />
            </span>
          </span>
        ) : (
          <span className={styles.none}>—</span>
        ),
    },
  ];
  return (
    <div className={styles.compareWrap}>
      <table className={styles.compare}>
        <caption className={styles.compareCaption}>{COPY.compareCaption}</caption>
        <thead>
          <tr>
            <td />
            {levels.map((c) => (
              <th key={c.code} scope="col" className={c.current ? styles.me : undefined}>
                <span className={styles.badge}>
                  {c.code[0]}
                  <span className={styles.badgeNum}>{c.code[1]}</span>
                </span>
                <span className={styles.badgeName}>{c.name}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row">
                <span className={styles.rowIcon} aria-hidden="true">
                  <Icon name={row.icon} size={16} />
                </span>
                {row.label}
              </th>
              {levels.map((c) => (
                <td key={c.code} className={c.current ? styles.me : undefined} data-level={c.code}>
                  {row.cell(c)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** "350 – 400" → 400 · "1.000 – 1.200" → 1200 (Türkçe binlik ayracı; çubuk üst sınıra göre). */
function hoursUpper(range: string): number {
  return Number(range.split("–").pop()?.trim().replace(/\./g, ""));
}

function ProgramList({ title, links }: { title: string; links: ProgramLink[] }) {
  return (
    <div>
      <h3 className={styles.programGroup}>{title}</h3>
      <ul className={styles.programList}>
        {links.map((l) => (
          <li key={l.label}>
            {l.href ? (
              <Link href={l.href} className={styles.programLink}>
                {l.label}
              </Link>
            ) : (
              <span className={l.current ? styles.programCurrent : styles.programSoon} aria-current={l.current ? "page" : undefined}>
                {l.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
