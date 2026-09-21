/**
 * Faz 6.5 — Üniversite Proficiency sayfası içerik sözleşmesi.
 *
 * `lib/contentSections.ts`in jenerik ayrıştırıcısını `data/universities.ts`teki
 * başlık eşlemesine uygulayıp sayfanın render edeceği `UniversityPage`
 * modelini üretir — `lib/languageContent.ts` (Faz 6.4) ile aynı çekirdek,
 * kendi sözleşmesiyle (bkz. plan §5).
 *
 * KRİTİK FARK (dil kursundan): sınav bölümü SAYISI ve ADLARI üniversiteye
 * göre değişiyor (Boğaziçi 3, Özyeğin 4, Yıldız Teknik 6, Koç/Acıbadem/
 * Süleyman Şah 0). Bu yüzden bölümler `data/universities.ts`te ELLE
 * yazılan bir dizi (`ExamSection[]`) — dil kursundaki gibi tek bir sabit
 * `SectionRef` alanı değil. Bölüm kartlarındaki sayısal olgular (süre/soru/
 * puan) kaynak metinden gözle doğrulanıp birebir kopyalanır; asıl kapsama
 * garantisi (her satırın tüketildiği) `details[]` üzerinden `SectionResolver`
 * ile sağlanır — kartlar bu zaten-tüketilmiş metnin ikinci bir GÖRÜNÜMÜdür,
 * ikinci bir veri kaynağı değil.
 *
 * TASARIM KURALI (CLAUDE.md §5): her `getUniversityPage()` çağrısı build
 * zamanında çalışır; eşleme çürümüşse veya bir satır sessizce kayboluyorsa
 * `throw` ile build'i düşürür (bkz. `SectionResolver.assertCoverage`).
 */

import siteContent from "@/data/site_content.json";
import {
  SectionResolver,
  ContentSectionsError,
  parseRecord,
  type SiteContentRecord,
} from "@/lib/contentSections";
import type { SectionRef } from "@/lib/types";
import type { IconName } from "@/components/graphics/icons";
import type { IllustrationName } from "@/components/graphics/Illustration";
import type { ExamSection } from "@/components/cards/ExamSectionCard";

/* ---------------------------------------------------------------
 * Üniversite sözleşmesi
 * ------------------------------------------------------------- */

export const UNIVERSITY_SLUGS = [
  "bogazici-universitesi",
  "sabanci-universitesi",
  "ozyegin-universitesi",
  "istanbul-sehir-universitesi",
  "istanbul-teknik-universitesi",
  "yeditepe-universitesi",
  "isik-universitesi",
  "kocaeli-universitesi-hazirlik",
  "dogus-universitesi",
  "koc-universitesi",
  "acibadem-universitesi",
  "marmara-universitesi",
  "kadirhas-universitesi-hazirlik",
  "yildiz-teknik-universitesi",
  "bilgi-universitesi",
  "suleymansah-universitesi",
  "ortadogu-teknik-universitesi",
  "bahcesehir-universitesi",
  "okan-universitesi",
  "maltepe-universitesi",
  "beykent-universitesi",
] as const;

export type UniversitySlug = (typeof UNIVERSITY_SLUGS)[number];

/** 3 adımlı "PROGRAMIN İŞLEYİŞİ" şeridinin sabit başlıkları — tüm
 *  üniversitelerde aynı (kaynağın 3 boilerplate paragrafının tematik
 *  karşılığı, bkz. plan §7 "Giriş paragraflarının dağılımı" kararı). */
export const STEP_TITLES = [
  "Seviye belirleme sınavı",
  "Kişiye özel program",
  "Uzman akademik kadro",
] as const;

/**
 * BÖLÜM DETAYLARI'nda render edilecek (veya yalnız kapsama için tüketilecek)
 * bir kaynak başlığı. `hidden: true` → içerik `assertCoverage` için
 * tüketilir ama sayfada AYRICA basılmaz (ör. Boğaziçi'nin gövdesiz
 * "...İçeriği:" başlığı veya yalnız kart verisine kaynaklık eden bir bölüm
 * sayacı cümlesi).
 */
export type DetailRef = {
  id: string;
  /** Sticky içindekiler etiketi + blok başlığı — hidden ise kullanılmaz. */
  label: string;
  icon: IconName;
  heading: string;
  take?: SectionRef["take"];
  allowEmpty?: boolean;
  hidden?: boolean;
};

export type UniversityContentMap = {
  /** Sayfanın kendi başlık satırı — giriş paragrafları bunun gövdesinde. */
  titleHeading: string;
  /** 3 sabit adımın her biri, giriş bloğundaki hangi paragraf indekslerini
   *  aldığını belirtir (3 veya 4 kaynak paragrafı 3 sabit temaya gruplar). */
  steps: [number[], number[], number[]];
  /** Tüm gerçek başlıkların (title hariç) kapsama + render sözleşmesi. */
  details: DetailRef[];
  /** SINAV YAPISI h2 başlığı — kaynaktaki "...İçeriği:" başlığından sondaki
   *  iki nokta düşürülerek elle yazılır. null → SINAV YAPISI hiç render
   *  edilmez (Koç, Acıbadem, Süleyman Şah — kaynakta bölüm ayrımı yok). */
  structureTitle: string | null;
  /** Kaynakta birebir geçen özet cümle — yoksa null, uydurulmaz. */
  structureLead: string | null;
  /** Kart verisi — kaynaktaki rakamlarla elle doğrulanmış (bkz. yukarı not).
   *  [] → SINAV YAPISI ızgarası boş render edilir (structureTitle varsa). */
  sections: ExamSection[];
  /** `sections` ile AYNI uzunlukta — her kartın "Bölüm detayını oku" linki
   *  hangi `details[].id`e gideceği. null → o kart #iletişim'e düşer. */
  sectionDetailIds: (string | null)[];
  /** Kapsama iddiası için bilinçli dışarıda bırakılan satırlar + gerekçe. */
  ignored: string[];
};

export type UniversityDef = {
  slug: UniversitySlug;
  /** "Boğaziçi Üniversitesi" — breadcrumb/kart/ızgara etiketi. */
  name: string;
  /** Izgara rozetindeki baş harfler — TÜRETİLMEZ, elle atanır (İ/ı ve çok
   *  kelimeli adlarda otomatik türetme bozulur). */
  initials: string;
  /** null → kaynakta sınav kodu yok (13/21) — hero rozeti render edilmez. */
  examCode: string | null;
  /** "BÜYES/BUEPT" gibi metin-içi etiket; examCode'dan farklıysa. examCode
   *  ile aynıysa da elle yazılır (drift'e karşı tek kaynak değil, iki ayrı
   *  editoryal alan — bkz. Boğaziçi). */
  examLabel: string | null;
  illo: IllustrationName;
  illoChip1: string;
  illoChip2: string;
  content: UniversityContentMap;
};

/* ---------------------------------------------------------------
 * Sayfa modeli (parse edilmiş hali)
 * ------------------------------------------------------------- */

export type UniversityPageDiagnostic = { kind: "h1-fallback"; detail: string };

export type ProcessStepResolved = { title: string; body: string };
export type DetailSectionResolved = { id: string; icon: IconName; title: string; paragraphs: string[] };

export type UniversityPage = {
  def: UniversityDef;
  record: SiteContentRecord;
  h1: string;
  metaDescription: string;
  steps: ProcessStepResolved[];
  structureTitle: string | null;
  structureLead: string | null;
  sections: ExamSection[];
  sectionDetailIds: (string | null)[];
  details: DetailSectionResolved[];
  diagnostics: UniversityPageDiagnostic[];
};

/* ---------------------------------------------------------------
 * Yardımcılar
 * ------------------------------------------------------------- */

function findRecord(slug: UniversitySlug): SiteContentRecord {
  const url = `https://www.dunyadillerimerkezi.com/sinav-hazirlik-egitimleri/proficiency-kursu/${slug}.html`;
  const record = (siteContent as SiteContentRecord[]).find((r) => r.url === url);
  if (!record) {
    throw new ContentSectionsError(`data/site_content.json içinde "${url}" kaydı bulunamadı.`);
  }
  return record;
}

/* ---------------------------------------------------------------
 * Ana giriş noktası
 * ------------------------------------------------------------- */

export function getUniversityPage(def: UniversityDef): UniversityPage {
  const record = findRecord(def.slug);
  const context = def.slug;
  const parsed = parseRecord(record);
  const resolver = new SectionResolver(parsed);
  const c = def.content;

  const diagnostics: UniversityPageDiagnostic[] = [];

  // H1 — CLAUDE.md §6 + plan §9: kaynakta h1 olan yalnız 4/21 üniversite.
  // Yoksa `title`e değil, kaydın İLK başlığına düşülür — title SEO alanı,
  // sayfa başlığı çoğu kayıtta ondan farklı (bkz. plan §9 SEO maddesi).
  const h1Heading = record.headings.find((h) => h.level === "h1");
  let h1: string;
  if (h1Heading) {
    h1 = h1Heading.text;
  } else {
    const first = record.headings[0];
    h1 = first ? first.text : record.title;
    diagnostics.push({ kind: "h1-fallback", detail: `${def.slug}: h1 kaynakta yok, ilk başlığa düşüldü` });
    console.warn(`[Faz 6.5] ${def.slug}: H1 eksik — ilk başlığa düşüldü.`);
  }

  // Giriş paragrafları (titleHeading'in gövdesi) → 3 sabit adım.
  const introLines = resolver.take({ heading: c.titleHeading }, `${context}/titleHeading`) ?? [];
  const steps: ProcessStepResolved[] = c.steps.map((idxs, i) => {
    const body = idxs.map((idx) => introLines[idx]).filter((p): p is string => p !== undefined);
    if (body.length === 0) {
      throw new ContentSectionsError(
        `${context}/steps[${i}]: paragraf indeksleri (${idxs.join(",")}) giriş bloğunda (${introLines.length} satır) karşılık bulamadı.`,
      );
    }
    return { title: STEP_TITLES[i], body: body.join(" ") };
  });

  // Detay blokları — kapsama garantisi + BÖLÜM DETAYLARI render'ı.
  const details: DetailSectionResolved[] = [];
  for (const d of c.details) {
    const lines = resolver.take(
      { heading: d.heading, take: d.take ?? "all", allowEmpty: d.allowEmpty ?? false },
      `${context}/details[${d.id}]`,
    );
    if (!d.hidden) {
      details.push({ id: d.id, icon: d.icon, title: d.label, paragraphs: lines ?? [] });
    }
  }

  resolver.assertCoverage(c.ignored, context);

  return {
    def,
    record,
    h1,
    metaDescription: record.meta_description,
    steps,
    structureTitle: c.structureTitle,
    structureLead: c.structureLead,
    sections: c.sections,
    sectionDetailIds: c.sectionDetailIds,
    details,
    diagnostics,
  };
}
