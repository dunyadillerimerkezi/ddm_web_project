import Link from "next/link";

import { UiIcon } from "@/components/graphics/Icon";
import { PageSection } from "./PageSection";
import { EXAMS, EXAM_GROUPS } from "@/data/exams";
import { getExamGlance } from "@/data/examGlance";
import { ContentSectionsError } from "@/lib/contentSections";
import { examHref, type ExamDef } from "@/lib/examContent";
import styles from "@/styles/ExamDirectory.module.css";

/**
 * "Diğer sınavlar" dizini (UI turu 2026-09-28) — eski 7 sütunlu, aynı ikonlu
 * kutu ızgarasının yerine gruplu dizin: 4 grup (`EXAM_GROUPS`), her kartta sınav
 * adı, kodu + düzenleyen kurum (`data/examGlance.ts`) ve ok. Soldaki balon optik
 * formu anar: üzerine gelince / odakta "işaretlenir" (dolar). Bulunulan sınav listede yok.
 */

function checkGroups() {
  const listed = EXAM_GROUPS.flatMap((g) => g.slugs);
  const missing = EXAMS.filter((e) => !listed.includes(e.slug)).map((e) => e.slug);
  const unknown = listed.filter((slug) => !EXAMS.some((e) => e.slug === slug));
  if (missing.length > 0 || unknown.length > 0 || new Set(listed).size !== listed.length) {
    throw new ContentSectionsError(
      `EXAM_GROUPS eşlemesi bozuk — grupsuz: ${missing.join(", ") || "yok"} · bilinmeyen: ${unknown.join(", ") || "yok"}`,
    );
  }
}

function meta(def: ExamDef): string | null {
  const parts = [def.code && def.code !== def.name ? def.code : null, getExamGlance(def.slug)?.issuer ?? null];
  return parts.filter(Boolean).join(" · ") || null;
}

export function ExamDirectory({ current }: { current: string }) {
  checkGroups();
  const groups = EXAM_GROUPS.map((g) => ({
    title: g.title,
    exams: g.slugs.filter((slug) => slug !== current).map((slug) => EXAMS.find((e) => e.slug === slug)!),
  })).filter((g) => g.exams.length > 0);

  return (
    <PageSection id="diger-sinavlar" ground="gray" kicker="DİĞER SINAVLAR" title="Sınav hazırlık kursları">
      <div className={styles.groups}>
        {groups.map((g) => (
          <section key={g.title} className={styles.group} aria-label={g.title}>
            <h3 className={styles.groupTitle}>{g.title}</h3>
            <ul className={styles.list}>
              {g.exams.map((def) => {
                const sub = meta(def);
                return (
                  <li key={def.slug}>
                    <Link href={examHref(def.slug)} className={styles.card}>
                      <span className={styles.bubble} aria-hidden="true">
                        {def.name.charAt(0)}
                      </span>
                      <span className={styles.text}>
                        <span className={styles.name}>{def.label}</span>
                        {sub && <span className={styles.meta}>{sub}</span>}
                      </span>
                      <span className={styles.arrow} aria-hidden="true">
                        <UiIcon name="arrowRight" size={14} />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </PageSection>
  );
}
