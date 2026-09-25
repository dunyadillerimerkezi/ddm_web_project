/**
 * P4 — Özel Ders sayfaları eşleme tablosu (Zengin İçerik alt türü) — ORTAK tipler
 * ve yardımcılar. Birleşik liste: `data/privateLessons.ts`.
 * Sayfa tanımları: `data/privateLessonsLanguage.ts` (dil, seviye merdiveni) ve
 * `data/privateLessonsExam.ts` (sınav, sınav formatı kartları).
 *
 * `data/hubs.ts` / `data/exams.ts` deseni: gövde metni burada TAŞINMAZ, yalnız
 * kaynak başlık referansları. İki tür bilgi AYRI durur (kullanıcı kararı, P4):
 *   - FİRMAYA AİT metin (DDM'in kendi cümleleri) kaynaktan birebir gelir. Yeri
 *     değişebilir, silinmez; yalnız bariz yazım/kopyala-yapıştır hataları
 *     `edits` / `headingEdits` ile düzeltilir (kaynakta karşılığı kalmazsa build düşer).
 *   - GENEL BİLGİ (sınav formatı, CEFR seviyeleri, dilin yapısı) kaynakta yoktur;
 *     `feature` ve `faq[].answer.added` alanlarında durur. Sayısal/kurumsal olgular
 *     resmi kaynaktan doğrulanır, kaynak yanındaki yorumda.
 *
 * Kanonik adres her sayfanın kendi yolu. Aynı gövdeli Joomla `?id=` kopyaları
 * `next.config.ts`'te (`JOOMLA_PRIVATE_LESSONS`) 301 ile buraya gelir.
 */

import type { IconName } from "@/components/graphics/icons";
import type { SectionRef } from "@/lib/types";

export type Take = SectionRef["take"];
export type SlotRef = { heading: string | null; take?: Take };
export type Photo = { src: string; alt: string; width: number; height: number };

/**
 * "Hakkımızda" bölümünün parçaları — kaynak sırası serbest (yer değişebilir),
 * ama her satır bir parçaya ya da `ignored`e düşmek zorunda.
 */
export type AboutPart =
  /** Hero giriş paragrafının ilk cümlesinden sonraki kısmı (`hero.split`). */
  | { kind: "introRest" }
  /** Düz paragraflar. */
  | { kind: "text"; ref: SlotRef }
  /** Kaynak başlığı h3 olarak + altındaki paragraflar. */
  | { kind: "section"; heading: string; take?: Take }
  /** İkonlu alan kartları — kaynak satırları birebir, ikonlar sırayla. */
  | { kind: "areas"; ref: SlotRef; icons: IconName[] }
  /** Tek alan kartı: kaynak BAŞLIĞI etiket, altındaki satırlar alt madde (Fransızca okul dersleri). */
  | { kind: "areaGroup"; heading: string; icon: IconName };

export type LevelItem = { key: string; name: string; can: string; exams: string; who: string };

/** `detail`: süre / soru sayısı — resmi olarak verilmiyorsa yazılmaz (null). */
export type FormatPart = { icon: IconName; name: string; measures: string; detail: string | null };

/** Sayfanın baskın bölümü: dillerde seviye merdiveni, sınavlarda sınav formatı kartları. */
export type Feature =
  | { kind: "levels"; title: string; lead: string; items: LevelItem[]; defaultKey: string }
  | {
      kind: "format";
      title: string;
      lead: string;
      parts: FormatPart[];
      facts: { label: string; value: string }[];
      note?: string;
    };

export type LessonFaq = {
  question: string;
  /** `added`: kaynakta olmayan genel bilgi. `source`: firma cümlesi, birebir. */
  answer: { added: string[] } | { source: SlotRef };
};

export type PrivateLessonDef = {
  /** Eski sitedeki yol, birebir (CLAUDE.md §3) — kayıt bundan bulunur; yeni sayfanın da yolu. */
  path: string;
  /** Kırıntı etiketi. */
  label: string;
  meta: { title?: string; description?: string; h1?: string; reasons: string[] };
  hero: {
    photo: Photo;
    intro: SlotRef;
    /** true → ilk cümle hero'ya, kalanı `introRest` parçasına. */
    split: boolean;
    /** Firma cümlelerinin kısa ARAYÜZ etiketleri; dayandığı kaynak cümle yorumda. */
    facts: { icon: IconName; label: string }[];
  };
  feature: Feature;
  about: {
    /** Kaynak başlığı (birebir) ya da eklenen başlık. */
    title: { source: string } | { added: string };
    photo: Photo;
    parts: AboutPart[];
  };
  /** Özel ders / grup kursu tablosu. `omitRows`: sayfanın kendi metniyle çelişen satırlar. */
  compare: { omitRows: string[] } | null;
  faq: LessonFaq[];
  /** Genel bilgi bölümlerinin son gözden geçirildiği gün (sayfada gösterilir). */
  updated: string;
  edits?: Record<string, string>;
  headingEdits?: Record<string, string>;
  ignored: { line: string; reason: string }[];
};

/* ---------------------------------------------------------------
 * CEFR — Avrupa Ortak Dil Çerçevesi küresel ölçeğinin (Council of Europe,
 * CEFR Companion Volume 2020, "Global scale") özet Türkçe karşılığı.
 * Dilden bağımsızdır; her dilin sınavı sayfa tanımında.
 * ------------------------------------------------------------- */
export type CefrKey = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

const CEFR_NAMES: Record<CefrKey, string> = {
  A1: "Başlangıç",
  A2: "Temel",
  B1: "Orta",
  B2: "İyi orta",
  C1: "İleri",
  C2: "Ustalık",
};

const CEFR_CAN: Record<CefrKey, string> = {
  A1: "Kendinizi tanıtır, günlük hayattaki çok temel ifadeleri anlar ve kullanırsınız.",
  A2: "Alışveriş, iş ve yakın çevre gibi rutin konularda basit ve doğrudan iletişim kurarsınız.",
  B1: "İşte, okulda ve seyahatte karşılaşılan durumların çoğunda kendinizi ifade edersiniz.",
  B2: "Teknik konulardaki metinlerin ana fikrini anlar, akıcı ve doğal biçimde konuşursunuz.",
  C1: "Uzun ve zor metinleri anlar, dili akademik ve mesleki ortamda esnek biçimde kullanırsınız.",
  C2: "Duyduğunuz ve okuduğunuz hemen her şeyi zahmetsizce anlar, ince anlam farklarını ifade edersiniz.",
};

/** CEFR merdiveni: ortak "ne yapabilirsiniz" + dile özgü sınav ve kullanım. */
export function cefrLevels(info: Record<CefrKey, { exams: string; who: string }>): LevelItem[] {
  return (Object.keys(CEFR_NAMES) as CefrKey[]).map((key) => ({
    key,
    name: CEFR_NAMES[key],
    can: CEFR_CAN[key],
    ...info[key],
  }));
}

/** Merdiven bölümünün ortak giriş cümlesi. */
export function cefrLead(language: string): string {
  return `${language} seviyeleri Avrupa Ortak Dil Çerçevesi'ne (CEFR) göre A1'den C2'ye altı basamakta tanımlanır. Bir basamak seçin: o seviyede neler yapabildiğinizi, hangi sınavla belgelendiğini ve kimin işine yaradığını görün.`;
}

export const PRIVATE_LESSON_PHOTO: Photo = {
  src: "/assets/home_page_images/ozel-ders.jpg",
  alt: "Birebir yabancı dil dersi",
  width: 5964,
  height: 3976,
};
