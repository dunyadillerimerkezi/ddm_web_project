/**
 * Şube Kurs Tarihi sayfalarının title / description düzeltmeleri — P8 metadata denetimi (kullanıcı onayı, 2026-10-02).
 *
 * Kurs tarihi sayfasının title / description'ı kaynaktan gelir (`lib/courseDateContent.ts`, şube adı
 * `currentBranchName` ile çevrilmiş hâli). Burada yalnız TEKNİK hatası olan sayfalar düzeltilir; `from` sayfada o an
 * görünen değerle BİREBİR aynı olmalı — kaynak değişirse ya da satır başka sayfaya ait olursa build düşer
 * (`data/languages.ts` `h1Edit` deseni). Anahtar: sayfanın temiz adresi.
 */

import { COURSE_DATES } from "@/data/courseDates";

export type MetaEdit = { from: string; to: string };
export type CourseDateMetaEdit = { title?: MetaEdit; description?: MetaEdit; reason: string };

const STUFFED_TITLE_REASON =
  "title: ~200 karakterlik anahtar kelime yığını + \"A1 Sınavı Ücreti\" — ilk parça tutuldu (diğer kurs tarihi başlıklarıyla aynı kalıp)";
const SHARED_DESC_REASON =
  "description: 4 şube sayfasında aynıydı (5 şubenin listesi) — o sayfanın şubesi yazıldı; \"Türk ve Fransız öğretmenlerle\" aynen";

const AILE = "/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi";
const AILE_TAIL =
  " - Dünya Dilleri Merkezi, Aile Birleşimi Almanca Sınavı, Aile Birleşimi Vizesi Başvurusu, Almanca Aile Birleşimi Kursu, Aile Birleşimi A1 Sınavı Ücreti";
/** [sayfa, şube adı, kaynakta " - "den önce çift boşluk var mı] */
const AILE_PAGES: [string, string, boolean][] = [
  ["atasehir-subesi-aile-birlesimi-kurs-tarihi", "Ataşehir", false],
  ["bagdat-caddesi-subesi-aile-birlesimi-kurs-tarihi", "Bağdat Caddesi", true],
  ["besiktas-subesi-aile-birlesimi-kurs-tarihi", "Etiler", false],
  ["kadikoy-subesi-aile-birlesimi-kurs-tarihi", "Kadıköy", true],
];

const FR = "/yabanci-dil-egitimleri/fransizca-kursu";
const FR_SHARED_DESC =
  "Kadıköy, Etiler, Ataşehir, Bağdat Caddesi ve Ümraniye şubelerinde Türk ve Fransız öğretmenlerle yüz yüze ve online Fransızca Kurs Tarihi";
const FR_PAGES: [string, string][] = [
  ["atasehir-subesi-fransizca-kurs-tarihi", "Ataşehir"],
  ["bagdat-caddesi-subesi-fransizca-kurs-tarihi", "Bağdat Caddesi"],
  ["besiktas-subesi-fransizca-kurs-tarihi", "Etiler"],
  ["kadikoy-subesi-fransizca-kurs-tarihi", "Kadıköy"],
];

export const COURSE_DATE_META_EDITS: Record<string, CourseDateMetaEdit> = {
  ...Object.fromEntries(
    AILE_PAGES.map(([slug, branch, doubleSpace]) => {
      const head = `${branch} Şubesi Almanca Aile Birleşimi Kurs Tarihi`;
      const edit: CourseDateMetaEdit = {
        title: { from: `${head}${doubleSpace ? " " : ""}${AILE_TAIL}`, to: head },
        reason: STUFFED_TITLE_REASON,
      };
      return [`${AILE}/${slug}`, edit];
    }),
  ),
  ...Object.fromEntries(
    FR_PAGES.map(([slug, branch]) => {
      const edit: CourseDateMetaEdit = {
        description: {
          from: FR_SHARED_DESC,
          to: `${branch} şubesinde Türk ve Fransız öğretmenlerle yüz yüze ve online Fransızca kursu tarihleri`,
        },
        reason: SHARED_DESC_REASON,
      };
      return [`${FR}/${slug}`, edit];
    }),
  ),
  "/yabanci-dil-egitimleri/ingilizce-konusma-kursu/besiktas-subesi-ingilizce-konusma-kurs-tarihi": {
    description: {
      from: "Levent–Etiler İngilizce konuşma kursu tarihleri: güncel kurs başlangıç tarihleri, pratik konuşma odaklı eğitim programları, ders içerikleri ve kayıt koşulları hakkında detaylı bilgi",
      to: "Levent–Etiler İngilizce konuşma kursu tarihleri: güncel başlangıç tarihleri, pratik konuşma odaklı eğitim programları, ders içerikleri ve kayıt koşulları",
    },
    reason: "description: >155 karakter — \"hakkında detaylı bilgi\" ve tekrar eden \"kurs\" çıkarıldı, bilgi aynı",
  },
};

// Yayında olmayan (ya da adı değişmiş) sayfaya ait satır sessizce boşta kalmasın.
const LIVE_HREFS = new Set(COURSE_DATES.map((e) => `/${e.category}/${e.courseSlug}/${e.pageSlug}`));
for (const href of Object.keys(COURSE_DATE_META_EDITS)) {
  if (!LIVE_HREFS.has(href)) throw new Error(`data/courseDateMeta.ts: "${href}" yayındaki bir kurs tarihi sayfası değil.`);
}

