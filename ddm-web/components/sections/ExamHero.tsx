import type { CSSProperties } from "react";
import Link from "next/link";

import { Breadcrumb } from "@/components/layout";
import { ButtonLink } from "@/components/ui";
import { UiIcon } from "@/components/graphics/Icon";
import type { ExamGlance } from "@/data/examGlance";
import type { Crumb, NavLink } from "@/lib/types";
import hero from "@/styles/PageHero.module.css";
import styles from "@/styles/ExamHero.module.css";

/**
 * Sınav Hazırlık hero'su (UI turu 2026-09-28, kullanıcı: "A · optik form").
 * Solda kırıntı, sınav kodu, H1, lead, butonlar (`PageHero` sınıfları, `BranchHero`
 * ile aynı dil); sağda cevap kâğıdı: balonlar açılışta bir kez sırayla dolar,
 * altında sınavın üç temel bilgisi. Bilgiler resmi kaynaktan (`data/examGlance.ts`);
 * kaydı olmayan sınavda kâğıt yalnız balonlarla durur. Mobilde (≤999) balonlar
 * gizlenir, kâğıt metnin altında düz bir bilgi kartıdır.
 */

/** Her satırda işaretli şık (0 = A). Süsleme; bir sınavın gerçek cevabı değil. */
const MARKED = [2, 0, 3, 1, 4];
const CHOICES = ["A", "B", "C", "D", "E"];

function AnswerSheet({
  code,
  glance,
  guide,
}: {
  code: string;
  glance: ExamGlance | null;
  guide: NavLink | null;
}) {
  return (
    <aside className={styles.sheet} aria-label={`${code} bir bakışta`}>
      <div className={styles.sheetHead}>
        <span className={styles.sheetCode}>{code}</span>
        {glance && <span className={styles.sheetIssuer}>{glance.issuer}</span>}
      </div>

      <div className={styles.bubbles} aria-hidden="true">
        {MARKED.map((pick, row) => (
          <div key={row} className={styles.bubbleRow}>
            <span className={styles.rowNum}>{row + 1}</span>
            {CHOICES.map((c, k) => (
              <span
                key={c}
                className={k === pick ? `${styles.bubble} ${styles.bubbleOn}` : styles.bubble}
                style={k === pick ? ({ "--i": row } as CSSProperties) : undefined}
              >
                {c}
              </span>
            ))}
          </div>
        ))}
      </div>

      {glance && (
        <dl className={styles.facts}>
          {glance.facts.map((f) => (
            <div key={f.label} className={styles.fact}>
              <dt className={styles.factLabel}>{f.label}</dt>
              <dd className={styles.factValue}>{f.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {(glance || guide?.href) && (
        <div className={styles.sheetFoot}>
          {glance && (
            <span className={styles.source}>
              Kaynak: {glance.source} · {glance.checked}
            </span>
          )}
          {guide?.href && (
            <Link href={guide.href} className={styles.guide}>
              {guide.label}
              <UiIcon name="arrowRight" size={12} />
            </Link>
          )}
        </div>
      )}
    </aside>
  );
}

export function ExamHero({
  crumbs,
  code,
  h1,
  lead,
  primary,
  secondary,
  glance,
  guide,
}: {
  crumbs: Crumb[];
  /** Rozet ve kâğıt başlığı: "TOEFL iBT". */
  code: string;
  h1: string;
  lead: string | null;
  primary: NavLink;
  secondary?: NavLink;
  glance: ExamGlance | null;
  /** Sınavın "Nedir?" rehberi varsa kâğıdın altından bağlantı. */
  guide: NavLink | null;
}) {
  return (
    <section className={`${hero.section} ${styles.section}`}>
      <div className={hero.glow} aria-hidden="true" />

      <div className={hero.crumbWrap}>
        <Breadcrumb items={crumbs} />
      </div>

      <div className={`${hero.grid} ${styles.grid}`}>
        <div className={hero.intro}>
          <div className={hero.badgeRow}>
            <span className={hero.codePill}>{code}</span>
          </div>
          <h1 className={hero.titleSube}>{h1}</h1>
          {lead && <p className={hero.lead}>{lead}</p>}
          <div className={hero.actions}>
            {primary.href && (
              <ButtonLink href={primary.href} variant="onDark" size="lg" arrow>
                {primary.label}
              </ButtonLink>
            )}
            {secondary?.href && (
              <ButtonLink href={secondary.href} variant="outlineDark" size="lg">
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        </div>

        <AnswerSheet code={code} glance={glance} guide={guide} />
      </div>
    </section>
  );
}
