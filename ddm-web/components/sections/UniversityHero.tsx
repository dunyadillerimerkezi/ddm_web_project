import type { CSSProperties } from "react";
import Link from "next/link";

import { Breadcrumb } from "@/components/layout";
import { Badge, ButtonLink } from "@/components/ui";
import { UiIcon } from "@/components/graphics/Icon";
import type { UniversityFlow } from "@/lib/universityFlow";
import type { Crumb, NavLink } from "@/lib/types";
import hero from "@/styles/PageHero.module.css";
import examHero from "@/styles/ExamHero.module.css";
import styles from "@/styles/UniversityHero.module.css";

/**
 * Proficiency üniversite hero'su (UI turu 2026-09-28, kullanıcı: "A · sınav akışı").
 * Solda kırıntı, rozetler, H1, lead, butonlar (`PageHero` sınıfları); sağda o
 * üniversitenin sınavı: bölümler sırayla, oranı biliniyorsa çubukla (açılışta bir
 * kez dolar), altında doğrulanmış üç bilgi. Akış yoksa (bölümü bilinmeyen sınav)
 * kart basılmaz, metin tek kolon kalır. Mobilde kart metnin altında.
 */

function FlowCard({ flow, guide }: { flow: UniversityFlow; guide: NavLink }) {
  const bars = flow.steps.some((s) => s.share !== null);
  return (
    <aside className={examHero.sheet} aria-label={`${flow.exam} sınav akışı`}>
      <div className={examHero.sheetHead}>
        <span className={examHero.sheetCode}>{flow.exam}</span>
        <span className={examHero.sheetIssuer}>SINAV AKIŞI</span>
      </div>

      <ol className={styles.steps}>
        {flow.steps.map((s, i) => (
          <li key={s.name} className={styles.step} style={{ "--i": i } as CSSProperties}>
            <span className={styles.num} aria-hidden="true">
              {i + 1}
            </span>
            <span className={styles.text}>
              <span className={styles.name}>{s.name}</span>
              {s.note && <span className={styles.note}>{s.note}</span>}
            </span>
            {s.label && <span className={styles.label}>{s.label}</span>}
            {bars && (
              <span className={styles.track} aria-hidden="true">
                <span className={styles.fill} style={{ "--share": s.share ?? 0 } as CSSProperties} />
              </span>
            )}
          </li>
        ))}
      </ol>

      {flow.facts && (
        <dl className={examHero.facts}>
          {flow.facts.map((f) => (
            <div key={f.label} className={examHero.fact}>
              <dt className={examHero.factLabel}>{f.label}</dt>
              <dd className={examHero.factValue}>{f.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className={examHero.sheetFoot}>
        {flow.source && (
          <span className={examHero.source}>
            Kaynak: {flow.source} · {flow.checked}
          </span>
        )}
        {guide.href && (
          <Link href={guide.href} className={examHero.guide}>
            {guide.label}
            <UiIcon name="arrowRight" size={12} />
          </Link>
        )}
      </div>
    </aside>
  );
}

export function UniversityHero({
  crumbs,
  code,
  h1,
  lead,
  primary,
  secondary,
  flow,
  guide,
}: {
  crumbs: Crumb[];
  /** Sınav adı rozeti — güncel ad biliniyorsa o; yoksa null. */
  code: string | null;
  h1: string;
  lead: string | null;
  primary: NavLink;
  secondary: NavLink;
  flow: UniversityFlow | null;
  guide: NavLink;
}) {
  return (
    <section className={`${hero.section} ${examHero.section}`}>
      <div className={hero.glow} aria-hidden="true" />

      <div className={hero.crumbWrap}>
        <Breadcrumb items={crumbs} />
      </div>

      <div className={flow ? `${hero.grid} ${examHero.grid}` : `${hero.grid} ${styles.single}`}>
        <div className={hero.intro}>
          <div className={hero.badgeRow}>
            {code && <span className={hero.codePill}>{code}</span>}
            <Badge variant="accent">
              <span className={hero.dot} aria-hidden="true" />
              Hazırlık atlama · Proficiency
            </Badge>
            <Badge variant="outline">5 şubede</Badge>
          </div>
          <h1 className={hero.titleUni}>{h1}</h1>
          {lead && <p className={hero.lead}>{lead}</p>}
          <div className={hero.actions}>
            {primary.href && (
              <ButtonLink href={primary.href} variant="onDark" size="lg" arrow>
                {primary.label}
              </ButtonLink>
            )}
            {secondary.href && (
              <ButtonLink href={secondary.href} variant="outlineDark" size="lg">
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        </div>

        {flow && <FlowCard flow={flow} guide={guide} />}
      </div>
    </section>
  );
}
