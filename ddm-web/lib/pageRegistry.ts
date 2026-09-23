/**
 * Sayfa kaydı — üretilen TÜM statik sayfaların tek listesi (P0 madde 4,
 * `../docs/remaining-pages-plan.md` §3 ve §7 karar #7).
 *
 * AMAÇ: "sayfa var ama sitemap'te yok" / "link var ama sayfa yok" gibi
 * durumları yapısal olarak önlemek. `app/sitemap.ts` buradan besleniyor.
 *
 * KAPSAM (P0'da): mevcut 4 tip, salt-okunur türetme — hiçbir route dosyasının
 * `generateStaticParams`'ı buna bağlanmadı, davranış DEĞİŞMEDİ (build hâlâ
 * 106 sayfa). P2/P4'te yeni tipler eklenirken (nedir/özel ders/online/hub…)
 * o route'ların `generateStaticParams`'ı da BURAYA taşınıp tek kaynağa
 * indirgenmesi önerilir — plan §3 madde 3.
 *
 * Her href, ilgili route dosyasının/`lib/*Content.ts`'in kendi href
 * üretimiyle BİREBİR aynı desende türetilir (kopya değil, aynı formül):
 *   - dil kursu:   `lib/languageContent.ts`  → `/yabanci-dil-egitimleri/{slug}`
 *   - üniversite:  `lib/universityContent.ts`→ `/sinav-hazirlik-egitimleri/proficiency-kursu/{slug}`
 *   - kurs tarihi: `lib/courseDateContent.ts` satır ~178 → `/${category}/${courseSlug}/${pageSlug}`
 */

import { LANGUAGES } from "@/data/languages";
import { UNIVERSITY_INDEX } from "@/data/universities";
import { COURSE_DATES } from "@/data/courseDates";
import { BRANCH_LIST } from "@/data/branches";
import { EXAMS } from "@/data/exams";
import { examHref } from "@/lib/examContent";

export type PageKind = "home" | "language" | "university" | "course-date" | "branch-contact" | "exam";

export type PageRecord = {
  href: string;
  kind: PageKind;
};

function homePages(): PageRecord[] {
  return [{ href: "/", kind: "home" }];
}

function languagePages(): PageRecord[] {
  return LANGUAGES.map((l) => ({
    href: `/yabanci-dil-egitimleri/${l.slug}`,
    kind: "language",
  }));
}

function universityPages(): PageRecord[] {
  return UNIVERSITY_INDEX.map((u) => ({
    href: `/sinav-hazirlik-egitimleri/proficiency-kursu/${u.slug}`,
    kind: "university",
  }));
}

function courseDatePages(): PageRecord[] {
  return COURSE_DATES.map((e) => ({
    href: `/${e.category}/${e.courseSlug}/${e.pageSlug}`,
    kind: "course-date",
  }));
}

/** P1 (Faz 6.8) — `/ddm-iletisim` hub + 5 şube sayfası. */
function branchContactPages(): PageRecord[] {
  return [
    { href: "/ddm-iletisim", kind: "branch-contact" },
    ...BRANCH_LIST.map((b) => ({ href: b.href, kind: "branch-contact" as const })),
  ];
}

/** P2 — Sınav Hazırlık Kursu Ana sayfaları (`data/exams.ts`; proficiency dahil). */
function examPages(): PageRecord[] {
  return EXAMS.map((e) => ({ href: examHref(e.slug), kind: "exam" as const }));
}

/** Üretilen tüm sayfaların düz listesi (şu an 1 + 10 + 21 + 72 + 6 = 110). */
export function getPageRegistry(): PageRecord[] {
  return [
    ...homePages(),
    ...languagePages(),
    ...universityPages(),
    ...courseDatePages(),
    ...branchContactPages(),
    ...examPages(),
  ];
}

/**
 * Üretilmiş sayfaların href kümesi — menü süzgecinin (`lib/navTree.ts`)
 * kaynağı. Modül düzeyinde bir kez kurulur.
 *
 * DİKKAT: bu modül `data/courseDates.ts` (~320 KB) ve `data/exams.ts` gibi
 * ağır veri dosyalarını içe aktarır. Yalnız SUNUCU tarafında kullanın;
 * bir istemci bileşenine (`"use client"`) import edilirse tüm bu veri
 * tarayıcı paketine girer.
 */
const PRODUCED_HREFS: Set<string> = new Set(getPageRegistry().map((p) => p.href));

/**
 * `href` üretilmiş bir sayfaya mı gidiyor? Çapa (`#universiteler`) ve sorgu
 * kısmı atılır — hedef sayfa aynıdır.
 */
export function isProducedPage(href: string): boolean {
  const path = href.split("#")[0].split("?")[0];
  return PRODUCED_HREFS.has(path);
}
