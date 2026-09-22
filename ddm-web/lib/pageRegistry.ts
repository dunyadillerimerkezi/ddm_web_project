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

export type PageKind = "home" | "language" | "university" | "course-date";

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

/** Üretilen tüm sayfaların düz listesi (şu an 1 + 10 + 21 + 72 = 104). */
export function getPageRegistry(): PageRecord[] {
  return [...homePages(), ...languagePages(), ...universityPages(), ...courseDatePages()];
}
