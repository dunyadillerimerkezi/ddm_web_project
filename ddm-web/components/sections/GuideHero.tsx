import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ButtonLink } from "@/components/ui";
import type { GuidePage } from "@/lib/guideContent";
import styles from "@/styles/GuideHero.module.css";

/**
 * P4 — "{Sınav} Nedir?" hero'su (kullanıcı, 2026-09-26: sınav ana sayfalarından
 * AYRI tasarım). Açık zemin, önce cevap: H1'in hemen altında büyük puntolu kısa
 * tanım; sağda lacivert "bir bakışta" kartı (`<dl>` — arama motorları ve yapay
 * zekâ aramaları etiket/değer ilişkisini doğrudan okur). Fotoğraf yok, hareket yok.
 */
export function GuideHero({ page, contactHref }: { page: GuidePage; contactHref: string }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.copy}>
          <Breadcrumb items={page.crumbs} tone="onLight" />
          <h1 className={styles.title}>{page.h1}</h1>
          <p className={styles.answer}>{page.hero.answer}</p>
          <div className={styles.actions}>
            <ButtonLink href={page.course.href} variant="primary" size="lg" arrow>
              {page.course.label}
            </ButtonLink>
            <ButtonLink href={contactHref} variant="outlineLight" size="lg">
              Bilgi Al
            </ButtonLink>
          </div>
        </div>

        <aside className={styles.card} aria-labelledby="bir-bakista">
          <h2 id="bir-bakista" className={styles.cardTitle}>
            {page.exam} bir bakışta
          </h2>
          <dl className={styles.facts}>
            {page.hero.facts.map((f) => (
              <div key={f.label} className={styles.fact}>
                <dt className={styles.factLabel}>{f.label}</dt>
                <dd className={styles.factValue}>{f.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
