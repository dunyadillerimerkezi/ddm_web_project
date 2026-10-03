import type { Metadata } from "next";

import { SiteChrome } from "@/components/layout";
import { Reveal } from "@/components/ui";
import { ExamHero } from "./ExamHero";
import { ExamRow } from "./ExamRows";
import { ExamDirectory } from "./ExamDirectory";
import { UniversityGrid } from "./UniversityGrid";
import { ContactForm } from "@/components/sections/ContactForm";
import { FORM_HREF } from "@/lib/formAnchor";
import { UNIVERSITY_INDEX } from "@/data/universities";
import { EXAM_GUIDES } from "@/data/examGuides";
import { getExamGlance } from "@/data/examGlance";
import { examHref, getExamPage, type ExamDef } from "@/lib/examContent";
import { absoluteUrl } from "@/lib/site";
import { checkMeta, metaTitle } from "@/lib/richContent";
import type { Crumb, NavLink } from "@/lib/types";
import styles from "@/styles/ExamRows.module.css";

/**
 * P2 — Sınav Hazırlık Kursu Ana sayfası (16 sınav). İki route bunu çağırır:
 * `app/sinav-hazirlik-egitimleri/[kurs]/page.tsx` (15 sınav) ve statik
 * `app/sinav-hazirlik-egitimleri/proficiency-kursu/page.tsx` (statik klasör
 * dinamik segmenti ezdiği için ayrı dosya — plan §3).
 *
 * UI turu (2026-09-28, kullanıcı: "A · optik form"): degrade hero + sağda cevap
 * kâğıdı (`ExamHero`, bilgiler `data/examGlance.ts`); gövde tek beyaz zeminde
 * satırlar (`ExamRows`: solda yapışkan başlık, sağda kısa cevap + kartlar);
 * sonda tek gri bant (gruplu "diğer sınavlar" dizini `ExamDirectory` + iletişim). Bölüm sırası `data/exams.ts`teki
 * blok sırasıdır. CTA'lar 6.6 kararı: fiyat CTA'sı yok, "Bilgi Al" → `/ddm-iletisim`.
 */


export function examMetadata(def: ExamDef): Metadata {
  const page = getExamPage(def);
  const context = `exam/${def.slug}`;
  const title = metaTitle(def.meta, page.record.title, context);
  // Yeniden yazılan başlık / açıklama (gerekçe `data/exams.ts` `meta.reasons`) — yalnız yeniden yazılan alan denetlenir.
  const rewrittenTitle = def.meta?.title || def.meta?.brandSuffix ? title : "";
  if (def.meta) checkMeta(rewrittenTitle, def.meta.description ?? "", context);
  return {
    title,
    description: def.meta?.description ?? page.record.meta_description,
    alternates: { canonical: absoluteUrl(examHref(def.slug)) },
  };
}

/** Sınavın "Nedir?" rehberi (P4) — kâğıdın altından bağlantı. */
function guideLink(def: ExamDef): NavLink | null {
  const guide = EXAM_GUIDES.find((g) => g.path.startsWith(`${examHref(def.slug)}/`));
  return guide ? { label: `${def.name} nedir?`, href: guide.path } : null;
}

export function ExamCoursePage({ def }: { def: ExamDef }) {
  const page = getExamPage(def);
  const hasDates = page.blocks.some((b) => b.kind === "branchLinks");
  const hasUniversities = page.blocks.some((b) => b.kind === "universities");

  const crumbs: Crumb[] = [
    { label: "Anasayfa", href: "/" },
    { label: "Sınav Hazırlık", href: "/sinav-hazirlik-egitimleri" },
    { label: def.label },
  ];

  const guide = guideLink(def);

  return (
    <SiteChrome ctaLabel="Bilgi Al">
      <ExamHero
        crumbs={crumbs}
        code={def.code ?? def.name}
        h1={page.h1}
        lead={page.heroLead}
        primary={{ label: "Bilgi Al", href: FORM_HREF }}
        secondary={hasDates ? { label: "Kurs tarihleri", href: "#kurs-tarihleri" } : undefined}
        glance={getExamGlance(def.slug)}
        guide={guide}
        language={def.language ?? null}
      />

      <Reveal className={styles.body}>
        {page.blocks.map((b, i) => (
          <ExamRow key={b.kind === "drop" ? `drop-${i}` : b.id} block={b} />
        ))}
      </Reveal>

      {/* Proficiency: üniversite ızgarası (arama kutulu) satır düzenine sığmaz, tam genişlik. */}
      {hasUniversities && <UniversityGrid items={UNIVERSITY_INDEX} current="" />}

      <ExamDirectory current={def.slug} />

      <ContactForm title={`${def.name} kursu hakkında bilgi alın`} course={examHref(def.slug)} />
    </SiteChrome>
  );
}
