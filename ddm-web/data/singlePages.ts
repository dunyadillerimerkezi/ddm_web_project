/**
 * P4 — Tekil içerik sayfaları (Zengin İçerik alt türü 4, 2026-09-26).
 *
 * Her sayfa tek bir somut şeyi anlatır (bir ders programı, bir kur sırası, bir sınav
 * görevi, bir dosya listesi). Tasarım (kullanıcı, 2026-09-26 — "A · program panosu"):
 * açık hero, sağda sayfanın asıl bilgisi görsel olarak (`board`: haftalık takvim, kur
 * basamakları, ders akışı, sınav kâğıdı, dosya rafı, kolay/zor terazisi); gövdede soru →
 * kalın cevap → tablo / kart satırları; gri bantta şubeler.
 *
 * İçerik kuralı: FİRMA metni (DDM'in cümleleri, gün/saat, sınıf, sertifika, kur anlatımı)
 * kaynaktan birebir gelir — yalnız bariz yazım ve bayat şube adı `edits` ile düzeltilir.
 * GENEL bilgi (CEFR tanımları, sınav formatı, dilin yapısı, mevzuat) resmi kaynaktan
 * doğrulanır; eskimiş ya da yanlışsa `edits` ile düzeltilir, eklenen metin `added`; kaynak
 * URL yorumda, kaynak adı `sources`ta. Gövde metni burada TAŞINMAZ: kaynak satırlar
 * `{ heading, take }` ile çağrılır (`lib/singleContent.ts` → `assertCoverage`).
 *
 * Kapsam kararları (kullanıcı, 2026-09-26): `proficiency-sinavi` yayınlanmaz (21 üniversite
 * listesi Proficiency Kursu'nda zaten var → 301); Joomla "Almanca Eğitim Seviyeleri"
 * (`?id=67`, iki URL) yeni temiz adreste yayınlanır, "kaset / DVD" cümleleri çıkarılır;
 * İngilizce Eğitim Sistemi'nin kanonik adresi `/yabanci-dil-egitimleri/…` (öteki 301);
 * örnek sınav dosyaları eski siteden indirilip aynı yollarla `public/`e kondu.
 */

import type { IconName } from "@/components/graphics/icons";
import type { GuideBlock, GuideSection, GuideText } from "@/data/examGuides";
import { CEFR_CAN } from "@/data/privateLessonsShared";
import type { SlotRef } from "@/data/privateLessonsShared";
import type { BranchSlug } from "@/lib/types";

const YD = "/yabanci-dil-egitimleri";
const SH = "/sinav-hazirlik-egitimleri";

/* ---------------------------------------------------------------
 * Tipler
 * ------------------------------------------------------------- */

/** Haftalık takvim: gün 0 = Pazartesi. Aynı sayfada iki seçenek varsa `tone` ile ayrılır. */
export type WeekSlot = { days: number[]; from: string; to: string; tone: "a" | "b"; label: string };

/** Hero'nun sağındaki pano — sayfanın asıl bilgisi. Metinler arayüz kısaltması, dayandığı cümle yorumda. */
export type SingleBoard =
  | { kind: "week"; title: string; sub: string; slots: WeekSlot[]; facts: { value: string; label: string }[] }
  /** Kur basamakları (alttan üste); `id` gövdedeki bölümün çapası. */
  | { kind: "ladder"; title: string; sub: string; steps: { code: string; name: string; id: string }[] }
  /** Sıralı ders akışı. */
  | { kind: "steps"; title: string; sub: string; steps: { name: string; text: string }[] }
  /** Sınav kâğıdı özeti: bölümler + süre; `highlight` bu sayfanın örneklediği bölüm. */
  | {
      kind: "sheet";
      title: string;
      sub: string;
      rows: { name: string; local: string; time: string; highlight?: string }[];
      facts: { value: string; label: string }[];
    }
  /** Dosya rafı — içerik sayfanın `files` bloğundan hesaplanır. */
  | { kind: "files"; title: string; sub: string }
  /** Kolay / zor yanlar. */
  | { kind: "scale"; title: string; sub: string; easy: string[]; hard: string[] }
  /**
   * Yurtdışı (kullanıcı, 2026-09-26 — "A · biniş kartı"): İstanbul → gidilecek yer, dört alan ve
   * koçan. Kodlar arayüz etiketi (havalimanı / ülke kısaltması); alanlar kaynak ya da doğrulanmış
   * genel bilgi cümlesinin kısaltması, dayandığı cümle yorumda.
   */
  | {
      kind: "pass";
      title: string;
      tag: string;
      from: { code: string; name: string };
      to: { code: string; name: string };
      fields: { label: string; value: string }[];
      stub: { label: string; value: string };
    }
  /** Konu / dil etiketleri (iş İngilizcesi modülleri, çeviri dilleri). */
  | { kind: "chips"; title: string; sub: string; items: string[]; facts: { value: string; label: string }[] }
  /** Yan yana iki program seçeneği (grup / özel ders). */
  | { kind: "compare"; title: string; sub: string; cols: { name: string; note: string; facts: { value: string; label: string }[] }[] };

export type FileUniversity = {
  key: string;
  name: string;
  /** Sitedeki üniversite proficiency sayfası. */
  slug: string;
  /** Sınavın güncel adı (resmi sayfadan, 2026-09-26). */
  exam: string;
  /** Üniversitenin güncel resmi örnek sınav sayfası (yoksa null). */
  official: string | null;
  note?: string;
};

/** Tekil sayfalara özgü bloklar (nedir blokları `GuideBlock` da kullanılır). */
export type SingleBlock =
  | GuideBlock
  /** Kaynaktaki bir alt başlık (h3) — bölüm içinde küçük başlık olarak. */
  | { kind: "subhead"; source: string }
  /** Kısa başlıklı kartlar; başlık arayüz etiketi, metin kaynak ya da eklenen. */
  | { kind: "cards"; items: { title: string; text: GuideText }[] }
  /**
   * Kaynak metnin kartlara ayrılmış hali (kullanıcı, 2026-09-26: "düz yazı değil, kart / tablo"):
   * kartlar metnin arayüz kısaltması — her kartın `match`'i (yoksa `text`'in virgülle ayrılmış
   * parçaları) `from` metninde geçmek zorunda (build denetler); metnin kendisi kartların altında
   * açılır "Ayrıntılı bilgi" kutusunda birebir durur (sayfadan kaybolmaz).
   */
  | { kind: "facets"; from: GuideText; items: FacetItem[] }
  /**
   * Konu kartları: her kart bir kaynak başlığı (`source`) + arayüz özeti (`summary`, dayandığı cümle
   * yorumda); başlığın altındaki kaynak paragrafları kartın açılır "Ayrıntılı bilgi"sinde birebir.
   */
  | { kind: "topics"; items: { source: string; summary: string; icon?: IconName }[] }
  /**
   * Sınav görevleri. Her metin kaynaktan gelir: `{ h }` kaynak başlığı (`headingEdits`), `{ l }`
   * kaynak satırı (`edits`), `{ l, part }` iki görevin birleştiği satırın parçası (`splits`).
   * `from` satırları tüketir; kullanılmayan satır ya da parça build'i düşürür.
   */
  | { kind: "tasks"; from: SlotRef[]; items: { label: TaskRef; prompt: TaskRef; tr: string; points: TaskRef[] }[] }
  /**
   * Örnek sınav dosyaları: kaynaktaki her link satırı (`src`) → üniversite + hedef.
   * `dup`: aynı dosyanın ikinci bağlantısı (gösterilmez, gerekçe yorumda).
   */
  | {
      kind: "files";
      src: SlotRef;
      files: Record<string, { uni: string; href: string } | { dup: string }>;
      universities: FileUniversity[];
    };

/** Kart: başlık + kısa metin (+ ikon). `match`: kaynakta aranacak ifade (`text` kaynaktan farklı yazıldıysa). */
export type FacetItem = { title: string; text: string; icon?: IconName; match?: string };

/** Görev metni referansı — kaynak başlığı, kaynak satırı ya da bölünmüş satırın parçası. */
export type TaskRef = { h: string } | { l: string; part?: number };

export type SingleSection = Omit<GuideSection, "blocks"> & { blocks: SingleBlock[] };

export type SinglePageDef = {
  path: string;
  /** Eski kayıt query'li bir Joomla adresiyse (`….html?view=article&id=…`). */
  source?: string;
  /** Kırıntı etiketi. */
  label: string;
  /**
   * Üst sayfa (kırıntı + ikincil buton). Verilmezse yolun ikinci parçası dil / sınav kursu
   * sayılır (`parentCourse`); yurtdışı ve diğer program sayfalarında kategori ya da üst program.
   */
  parent?: { label: string; href: string };
  /** Sayfa gövdesinin dili Türkçe değilse (Pegasus pilotları: İngilizce). */
  lang?: "en";
  /** Kaynakta h1 yoksa H1'e yükseltilen kaynak başlığı (gerekçe yorumda). */
  h1Heading?: string;
  meta: { title?: string; description?: string; reasons: string[] };
  hero: { lead: GuideText; board: SingleBoard };
  sections: SingleSection[];
  /** Gri bant: "Nerede katılabilirsiniz?" — şube kartları `data/branches.ts`ten, etiketler kaynak satırı. */
  branches: {
    title: GuideSection["title"];
    answer: GuideText;
    /** Kaynaktaki şube kurs tarihi satırları, `branches` sırasıyla. */
    links: SlotRef;
    branches: BranchSlug[];
    /** Şube kurs tarihi sayfaları bu kursunkiler (`data/courseDates.ts`). */
    course: string;
  } | null;
  related: { title: string; links: { label: string; href: string }[] }[];
  /** CTA bandının başlığı (sayfanın konusuna göre). */
  cta: { title: string; sub: string };
  /** Resmi kaynaklar (düz metin). */
  sources: string[];
  /** Genel bilginin son gözden geçirildiği gün (sayfada gösterilir). */
  updated: string;
  edits?: Record<string, string>;
  /** Kaynakta iki içeriğin birleştiği satır → düzeltilmiş parçaları (`tasks` bloğu `{ l, part }` ile çağırır). */
  splits?: Record<string, string[]>;
  headingEdits?: Record<string, string>;
  ignored: { line: string; reason: string }[];
};

/* ---------------------------------------------------------------
 * Ortak parçalar
 * ------------------------------------------------------------- */

const UPDATED = "2026-09-26";

const PROGRAM_CTA = { title: "Size uygun programı birlikte seçelim", sub: "Gün, saat ve seviyenizi size en yakın şubemizle konuşun." };
const LEVEL_CTA = { title: "Hangi kurdan başlayacağınızı birlikte belirleyelim", sub: "Seviye tespit sınavı ve kur tarihleri için size en yakın şubemizle konuşun." };

const ALMANCA_RELATED = {
  title: "Almanca eğitimleri",
  links: [
    { label: "Almanca Kursu", href: `${YD}/almanca-kursu` },
    { label: "Hızlandırılmış Almanca Kursu", href: `${YD}/almanca-kursu/hizlandirilmis-almanca-kursu` },
    { label: "Almanca Konuşma Kursları", href: `${YD}/almanca-kursu/almanca-konusma-kurslari` },
    { label: "Almanca Eğitim Seviyeleri", href: `${YD}/almanca-kursu/almanca-egitim-seviyeleri` },
    { label: "Almanca Özel Ders", href: `${YD}/almanca-kursu/almanca-ozel-ders` },
    { label: "Online Almanca Eğitimi", href: `${YD}/almanca-kursu/online-almanca-egitimi` },
    { label: "Aile Birleşimi Almanca Kursu", href: `${SH}/aile-birlesimi-egitimi` },
  ],
};

/** Almanca program sayfalarında kaynaktaki şube kurs tarihi satırı (Beşiktaş → bugünkü adı, data/branches.ts). */
const ALMANCA_BRANCH_EDITS = {
  "Beşiktaş Şubesi Almanca Eğitim Plan Tablosu ve Kurs Tarihi": "Etiler Şubesi Almanca Eğitim Plan Tablosu ve Kurs Tarihi",
};

/** Almanca program sayfalarının "Plan Tablosu" bölümündeki üç program bağlantısı. */
const ALMANCA_PROGRAM_HREFS = {
  "Hızlandırılmış Almanca Kursu": `${YD}/almanca-kursu/hizlandirilmis-almanca-kursu`,
  "Almanca Konuşma Kursları": `${YD}/almanca-kursu/almanca-konusma-kurslari`,
  "Almanca Kursu": `${YD}/almanca-kursu`,
  "Dünya Dilleri Merkezi Almanca Eğitim Seviyeleri": `${YD}/almanca-kursu/almanca-egitim-seviyeleri`,
};

/**
 * Üç Almanca programının karşılaştırması — hücreler firma cümlelerinin arayüz kısaltması:
 * hızlandırılmış ← hizlandirilmis-almanca-kursu ("Pazartesi … 10:00/14:00", "maksimum 6 kişi", "200 saat olup 3 ay");
 * konuşma ← almanca-konusma-kurslari ("Salı ve Perşembe … 19:00-21:30 … Cumartesi ve Pazar … 14:00-17:00",
 * "60 ders saati olup 2,5 ay", "maksimum 6 kişi", "minimum B1"); Almanca Kursu ← almanca-kursu
 * ("toplam 6 kurdan", "Her bir kur 2 ay olup 40 saat", "Her kur sonunda … kur bitirme sınavı").
 */
const ALMANCA_PROGRAMS_SECTION: SingleSection = {
  id: "programlar",
  title: { added: "Üç Almanca programı arasındaki fark ne?" },
  answer: { added: "Fark, haftalık ders yoğunluğunda ve toplam sürede." },
  blocks: [
    {
      kind: "table",
      head: ["Program", "Gün ve saat", "Süre", "Not"],
      rows: [
        ["Hızlandırılmış Almanca", "Pazartesi – Perşembe, 10:00 – 14:00", "200 saat, 3 ay", "Sınıf en fazla 6 kişi"],
        ["Almanca Konuşma", "Salı ve Perşembe 19:00 – 21:30 ya da Cumartesi ve Pazar 14:00 – 17:00", "60 saat, 2,5 ay", "En az B1 seviyesi, sınıf en fazla 6 kişi"],
        ["Almanca Kursu", "Hafta içi sabah, hafta içi akşam ya da hafta sonu", "6 kur; her kur 40 saat, 2 ay", "Her kur sonunda kur bitirme sınavı"],
      ],
      note: null,
    },
  ],
};

/**
 * Almanca belgeleri — GENEL bilgi (doğrulandı 2026-09-26):
 * Goethe A1–C2: https://www.goethe.de/pro/relaunch/prf/de/Pruefungsordnung.pdf
 * telc A1–C2, C1 Hochschule: https://www.telc.net/sprachpruefungen/deutsch/
 * ÖSD A1–C2: https://osd.at/oesd-pruefungen/
 * TestDaF TDN 3–5 (B2–C1), tüm Alman üniversiteleri: https://www.testdaf.de/de/teilnehmende/warum-testdaf/vorteile-des-testdaf/
 * Türkiye'de aile birleşimi: yalnız Goethe Start Deutsch 1 ve ÖSD A1, belge ≤12 ay: https://tuerkei.diplo.de/tr-tr/service/05-visaeinreise/2769600-2769600
 */
const GERMAN_CERTS_SECTION: SingleSection = {
  id: "sertifikalar",
  title: { added: "Almanca seviyenizi hangi sınavla belgelersiniz?" },
  answer: { added: "Uluslararası geçerli Almanca belgeleri Goethe-Institut, telc, ÖSD ve TestDaF sınavlarıyla alınır." },
  blocks: [
    {
      kind: "table",
      head: ["Sınav", "Seviye", "Nerede işe yarar"],
      rows: [
        ["Goethe-Zertifikat", "A1 – C2", "Genel dil belgesi; A1 (Start Deutsch 1) aile birleşimi vizesinde kabul edilir"],
        ["telc Deutsch", "A1 – C2", "Genel ve mesleki belge; C1 Hochschule üniversite başvurusu için"],
        ["ÖSD", "A1 – C2", "Avusturya merkezli belge; A1 aile birleşimi vizesinde kabul edilir"],
        ["TestDaF", "B2 – C1", "Almanya'da üniversiteye kabul; tüm Alman üniversiteleri tanır"],
      ],
      note: "Türkiye'den yapılan aile birleşimi başvurularında yalnız Goethe (Start Deutsch 1) ve ÖSD A1 belgesi kabul edilir; belge 12 aydan eski olmamalıdır.",
    },
  ],
};

const GERMAN_CERT_SOURCES = [
  "Goethe-Institut — Prüfungsordnung (1 Eylül 2025)",
  "telc — Deutsch-Prüfungen (telc.net)",
  "ÖSD — Prüfungen (osd.at)",
  "TestDaF — Vorteile des TestDaF (testdaf.de)",
  "Almanya'nın Türkiye temsilcilikleri — Aile birleşimi bilgi notu (turkei.diplo.de)",
];

/* ---------------------------------------------------------------
 * 1 · Hızlandırılmış Almanca Kursu
 * ------------------------------------------------------------- */

const HIZLANDIRILMIS: SinglePageDef = {
  path: `${YD}/almanca-kursu/hizlandirilmis-almanca-kursu`,
  label: "Hızlandırılmış Almanca",
  meta: { reasons: [] },
  hero: {
    lead: { src: { heading: "Hızlandırılmış Almanca Dil Kursu", take: [0] }, sentence: 0 },
    board: {
      kind: "week",
      title: "Haftalık ders programı",
      sub: "Hafta içi dört gün, sabah seansı",
      // "Pazartesi / Salı / Çarşamba / Perşembe Günü / Saat 10:00/14:00"
      slots: [{ days: [0, 1, 2, 3], from: "10:00", to: "14:00", tone: "a", label: "Hafta içi" }],
      // "Program toplam 200 saat olup 3 ay sürmektedir." · "maksimum 6 kişiden oluşmaktadır"
      facts: [
        { value: "200 saat", label: "toplam ders" },
        { value: "3 ay", label: "program süresi" },
        { value: "En fazla 6", label: "kişilik sınıf" },
      ],
    },
  },
  sections: [
    {
      id: "gun-ve-saatler",
      title: { source: "Yoğun Almanca Eğitim Programı Gün ve Saatleri" },
      answer: { src: { heading: "Yoğun Almanca Eğitim Programı Gün ve Saatleri", take: [4] } },
      blocks: [
        {
          kind: "table",
          head: ["Gün", "Saat"],
          rows: { src: { heading: "Yoğun Almanca Eğitim Programı Gün ve Saatleri", take: [0, 1, 2, 3] } },
          note: null,
        },
        { kind: "text", text: { src: { heading: "Hızlandırılmış Almanca Dil Kursu", take: [0] }, sentence: 1 } },
      ],
    },
    {
      id: "beceriler",
      title: { added: "Program hangi becerileri geliştirir?" },
      answer: { src: { heading: "Hızlandırılmış Almanca Dil Kursu", take: [1] }, sentence: 0 },
      blocks: [
        {
          kind: "parts",
          items: [
            { icon: "okuma", name: "Okuma", text: "Yazılı metni anlamak ve ana fikri bulmak", meta: "" },
            { icon: "yazma", name: "Yazma", text: "Düşünceyi doğru yapılarla yazıya dökmek", meta: "" },
            { icon: "konusma", name: "Konuşma", text: "Günlük hayatta kendini ifade etmek", meta: "" },
            { icon: "dinleme", name: "Dinleme", text: "Konuşulanı duyarak anlamak", meta: "" },
          ],
          note: null,
        },
        { kind: "text", text: { src: { heading: "Hızlandırılmış Almanca Dil Kursu", take: [1] }, sentence: 1 } },
      ],
    },
    ALMANCA_PROGRAMS_SECTION,
    GERMAN_CERTS_SECTION,
    {
      id: "kurs-tarihleri",
      title: { source: "Almanca Eğitim Plan Tablosu ve Kurs Tarihleri" },
      answer: { src: { heading: "Yoğun Almanca Eğitim Programı Gün ve Saatleri", take: [5] } },
      blocks: [
        { kind: "srcLinks", src: { heading: "Almanca Eğitim Plan Tablosu ve Kurs Tarihleri", take: [0, 1, 2] }, hrefs: ALMANCA_PROGRAM_HREFS },
      ],
    },
  ],
  branches: {
    title: { source: "Hızlandırılmış Almanca Kurslarına Nerede Katılabilirsiniz" },
    answer: { src: { heading: "Hızlandırılmış Almanca Kurslarına Nerede Katılabilirsiniz", take: [0] } },
    links: { heading: "Almanca Eğitim Plan Tablosu ve Kurs Tarihleri", take: [3, 4, 5, 6] },
    branches: ["kadikoy", "bagdat", "etiler", "atasehir"],
    course: "almanca-kursu",
  },
  related: [ALMANCA_RELATED],
  cta: PROGRAM_CTA,
  sources: GERMAN_CERT_SOURCES,
  updated: UPDATED,
  edits: {
    // Tablo biçimi — olgu aynı ("Günü / Saat 10:00/14:00" → iki hücre).
    "Pazartesi Günü / Saat 10:00/14:00": "Pazartesi | 10:00 – 14:00",
    "Salı Günü / Saat 10:00/14:00": "Salı | 10:00 – 14:00",
    "Çarşamba Günü / Saat 10:00/14:00": "Çarşamba | 10:00 – 14:00",
    "Perşembe Günü / Saat 10:00/14:00": "Perşembe | 10:00 – 14:00",
    // Yazım: cümle ortasında büyük harf ("Formasyonlu hocalar").
    "Hızlı bir şekilde Almanca öğrenmek istiyorsunuz, işte tam bu noktada Dünya Dilleri Merkezi size özel bir program hazırladı. DDM şubelerinde hafta içi pazartesi, salı, çarşamba ve perşembe günleri sabah 10:00/14:00 saatleri arasında Formasyonlu hocalar tarafından düzenlenen Hızlandırılmış Almanca kursu programları ile sizlere kısa sürede Almanca konuşma fırsatı sunuyoruz.":
      "Hızlı bir şekilde Almanca öğrenmek istiyorsunuz, işte tam bu noktada Dünya Dilleri Merkezi size özel bir program hazırladı. DDM şubelerinde hafta içi pazartesi, salı, çarşamba ve perşembe günleri sabah 10:00/14:00 saatleri arasında formasyonlu hocalar tarafından düzenlenen Hızlandırılmış Almanca kursu programları ile sizlere kısa sürede Almanca konuşma fırsatı sunuyoruz.",
    // Bayat şube adı: Beşiktaş → Etiler (data/branches.ts). Ümraniye'de Almanca kurs tarihi yok, eklenmedi.
    "Hızlandırılmış Almanca kurslarına İstanbul’da Kadıköy, Bağdat Caddesi, Beşiktaş ve Ataşehir şubelerimizde katılabilirsiniz. Program hakkında daha detaylı bilgi almak için şubelerimizi arayabilir ya da ziyaret edebilirsiniz.":
      "Hızlandırılmış Almanca kurslarına İstanbul’da Kadıköy, Bağdat Caddesi, Etiler ve Ataşehir şubelerimizde katılabilirsiniz. Program hakkında daha detaylı bilgi almak için şubelerimizi arayabilir ya da ziyaret edebilirsiniz.",
    ...ALMANCA_BRANCH_EDITS,
  },
  ignored: [{ line: "almanca kursu", reason: "Joomla etiket bağlantısı (/component/tags/…), içerik değil." }],
};

/* ---------------------------------------------------------------
 * 2 · Almanca Konuşma Kursları
 * ------------------------------------------------------------- */

const KONUSMA_H1 = "Almanca Konuşma Kursu Ders Programı";

const KONUSMA: SinglePageDef = {
  path: `${YD}/almanca-kursu/almanca-konusma-kurslari`,
  label: "Almanca Konuşma Kursları",
  meta: { reasons: [] },
  hero: {
    lead: { src: { heading: KONUSMA_H1, take: [0] }, sentence: 0 },
    board: {
      kind: "week",
      title: "Haftalık ders programı",
      sub: "İki seçenekten birine katılırsınız",
      // "hafta içi akşam Salı ve Perşembe günleri 19:00-21:30 … veya hafta sonu Cumartesi ve Pazar günleri 14:00-17:00"
      slots: [
        { days: [1, 3], from: "19:00", to: "21:30", tone: "a", label: "Hafta içi akşam" },
        { days: [5, 6], from: "14:00", to: "17:00", tone: "b", label: "Hafta sonu" },
      ],
      // "Program toplam 60 ders saati olup 2,5 ay sürmektedir." · "Sınıflar maksimum 6 kişiyle sınırlıdır"
      facts: [
        { value: "60 saat", label: "toplam ders" },
        { value: "2,5 ay", label: "program süresi" },
        { value: "En fazla 6", label: "kişilik sınıf" },
      ],
    },
  },
  sections: [
    {
      id: "gun-ve-saatler",
      title: { added: "Dersler hangi gün ve saatlerde?" },
      answer: { src: { heading: KONUSMA_H1, take: [0] }, sentence: 1 },
      blocks: [
        { kind: "text", text: { src: { heading: KONUSMA_H1, take: [0] }, sentence: 2 } },
        { kind: "points", items: { src: { heading: KONUSMA_H1, take: [1, 2] } } },
      ],
    },
    {
      id: "katilim",
      title: { source: "Almanca Konuşma Kursu Katılım Koşulları" },
      answer: { src: { heading: "Almanca Konuşma Kursu Katılım Koşulları", take: [1] } },
      blocks: [
        { kind: "points", items: { src: { heading: "Almanca Konuşma Kursu Katılım Koşulları", take: [0, 2] } } },
        // CEFR küresel ölçeği B1 — privateLessonsShared.ts CEFR_CAN (Council of Europe, CEFR Companion Volume 2020).
        { kind: "text", text: { added: `B1 seviyesi (Avrupa Ortak Dil Çerçevesi): ${CEFR_CAN.B1}` } },
      ],
    },
    {
      id: "materyaller",
      title: { source: "Almanca Konuşma Kursu Materyalleri" },
      answer: { src: { heading: "Almanca Konuşma Kursu Materyalleri", take: [0] }, sentence: 0 },
      blocks: [{ kind: "text", text: { src: { heading: "Almanca Konuşma Kursu Materyalleri", take: [0] }, sentence: 1 } }],
    },
    ALMANCA_PROGRAMS_SECTION,
    GERMAN_CERTS_SECTION,
    {
      id: "kurs-tarihleri",
      title: { source: "Almanca Konuşma Kursları Eğitim Plan Tablosu ve Kurs Tarihleri" },
      answer: { src: { heading: KONUSMA_H1, take: [3] } },
      blocks: [
        {
          kind: "srcLinks",
          src: { heading: "Almanca Konuşma Kursları Eğitim Plan Tablosu ve Kurs Tarihleri", take: [0, 1, 2] },
          hrefs: ALMANCA_PROGRAM_HREFS,
        },
      ],
    },
  ],
  branches: {
    title: { source: "Almanca Konuşma Kurslarına Nerede Katılabilirsiniz?" },
    answer: { src: { heading: "Almanca Konuşma Kurslarına Nerede Katılabilirsiniz?", take: [0] } },
    links: { heading: "Almanca Konuşma Kursları Eğitim Plan Tablosu ve Kurs Tarihleri", take: [3, 4, 5, 6] },
    branches: ["kadikoy", "bagdat", "etiler", "atasehir"],
    course: "almanca-kursu",
  },
  related: [ALMANCA_RELATED],
  cta: PROGRAM_CTA,
  sources: ["Council of Europe — CEFR Companion Volume (2020), küresel ölçek", ...GERMAN_CERT_SOURCES],
  updated: UPDATED,
  edits: {
    // Yazım: "Ccumartesi".
    "Almanca konuşma becerilerinizi Drama Yöntemi metodu kullanarak geliştirme fırsatı sunuyoruz. Almanca konuşma kursları hafta içi akşam Salı ve Perşembe günleri 19:00-21:30 saatleri arasında veya hafta sonu Ccumartesi ve Pazar günleri 14:00-17:00 saatleri arasında düzenlenmektedir. Program toplam 60 ders saati olup 2,5 ay sürmektedir.":
      "Almanca konuşma becerilerinizi Drama Yöntemi metodu kullanarak geliştirme fırsatı sunuyoruz. Almanca konuşma kursları hafta içi akşam Salı ve Perşembe günleri 19:00-21:30 saatleri arasında veya hafta sonu Cumartesi ve Pazar günleri 14:00-17:00 saatleri arasında düzenlenmektedir. Program toplam 60 ders saati olup 2,5 ay sürmektedir.",
    // Yazım: "Formasyonu olan" cümle ortasında büyük harf.
    "Eğitimler en az beş yıllık deneyim ve tecrübeye sahip Formasyonu olan Alman öğretim görevlileri tarafından verilmektedir.":
      "Eğitimler en az beş yıllık deneyim ve tecrübeye sahip formasyonu olan Alman öğretim görevlileri tarafından verilmektedir.",
    // Yazım: "gerekçeri" → "gereçleri".
    "Ders esnasında kullanılacak olan tüm ders materyalleri öğretim görevlilerimiz tarafından özel olarak hazırlanmaktadır. Tüm eğitim araç gerekçeri DDM tarafından öğrencilerine ücretsiz olarak verilmektedir.":
      "Ders esnasında kullanılacak olan tüm ders materyalleri öğretim görevlilerimiz tarafından özel olarak hazırlanmaktadır. Tüm eğitim araç gereçleri DDM tarafından öğrencilerine ücretsiz olarak verilmektedir.",
    // Bayat şube adı: Beşiktaş → Etiler.
    "Almanca konuşma kurslarına İstanbul’da Kadıköy, Bağdat Caddesi, Beşiktaş ve Ataşehir şubelerimizde katılabilirsiniz. Program hakkında daha detaylı bilgi almak için şubelerimizi arayabilir ya da ziyaret edebilirsiniz.":
      "Almanca konuşma kurslarına İstanbul’da Kadıköy, Bağdat Caddesi, Etiler ve Ataşehir şubelerimizde katılabilirsiniz. Program hakkında daha detaylı bilgi almak için şubelerimizi arayabilir ya da ziyaret edebilirsiniz.",
    ...ALMANCA_BRANCH_EDITS,
  },
  ignored: [],
};

/* ---------------------------------------------------------------
 * 3 · Almanca Eğitim Seviyeleri (Joomla ?id=67 → yeni temiz adres)
 * ------------------------------------------------------------- */

const DE_LEVELS = [
  { id: "grundstufe-1", heading: "Grundstufe I / Başlangıç Seviyesi", code: "Grundstufe I", name: "Başlangıç" },
  { id: "grundstufe-2", heading: "Grundstufe II / Başlangıç Üzeri Seviye", code: "Grundstufe II", name: "Başlangıç üzeri" },
  { id: "grundstufe-3", heading: "Grundstufe III / Orta Öncesi Seviye", code: "Grundstufe III", name: "Orta öncesi" },
  { id: "mittelstufe-1", heading: "Mittelstufe I / Orta Seviye", code: "Mittelstufe I", name: "Orta" },
  { id: "mittelstufe-2", heading: "Mittelstufe II / Orta Üzeri Seviye", code: "Mittelstufe II", name: "Orta üzeri" },
  { id: "oberstufe", heading: "Oberstufe / İleri seviye", code: "Oberstufe", name: "İleri" },
];

/** Her kurun paragraf sayısı (kaynak) — ilk cümle kalın cevap, kalanı metin. Grundstufe III'ün 5. satırı (kaset) çıkarıldı. */
const DE_LEVEL_PARAS: Record<string, number[]> = {
  "grundstufe-1": [0],
  "grundstufe-2": [0, 1, 2, 3],
  "grundstufe-3": [0, 1, 2, 3, 5],
  "mittelstufe-1": [0, 1, 2, 3, 4],
  "mittelstufe-2": [0, 1],
  oberstufe: [0, 1],
};

const ALMANCA_SEVIYELER: SinglePageDef = {
  path: `${YD}/almanca-kursu/almanca-egitim-seviyeleri`,
  source: `${YD}/almanca-kursu/hizlandirilmis-almanca-kursu.html?view=article&id=67:almanca-egitim-seviyeleri&catid=18`,
  label: "Almanca Eğitim Seviyeleri",
  // Kaynakta h1 yok; sayfanın tek başlığı h2 "Almanca Eğitim Seviyeleri" H1'e yükseltildi.
  h1Heading: "Almanca Eğitim Seviyeleri",
  meta: {
    title: "Almanca Eğitim Seviyeleri | Dünya Dilleri Merkezi",
    description:
      "Almanca kurslarımızın altı seviyesi: Grundstufe I'den Oberstufe'ye her kurda işlenen konular, kullanılan kitap ve derslerin nasıl işlendiği.",
    reasons: [
      "title: kaynakta marka yok, diğer sayfalarla aynı biçim.",
      "description: kaynak 202 karakter ve bayat şube listesi (Levent–Etiler, Ümraniye yok) — ≤155 ve konuya göre yeniden.",
    ],
  },
  hero: {
    // almanca-kursu kaynağı: "Almanca eğitimlerimiz toplam 6 kurdan oluşmaktadır." — arayüz özeti.
    lead: { added: "Almanca eğitimlerimiz altı kurdan oluşur. Her kur bir öncekinin üzerine kurulur: temel yapılardan başlar, serbest konuşma ve resmi yazışmaya kadar ilerler." },
    board: {
      kind: "ladder",
      title: "Altı kur, altı basamak",
      sub: "Bir basamağa dokunun, o kurun ayrıntısına gidin.",
      steps: DE_LEVELS.map(({ code, name, id }) => ({ code, name, id })),
    },
  },
  sections: [
    ...DE_LEVELS.map((l): SingleSection => {
      const paras = DE_LEVEL_PARAS[l.id];
      return {
        id: l.id,
        title: { source: l.heading },
        answer: { src: { heading: l.heading, take: [0] }, sentence: 0 },
        blocks: [
          { kind: "text", text: { src: { heading: l.heading, take: [0] }, sentence: [1, -1] } },
          ...paras.slice(1).map((i): SingleBlock => ({ kind: "text", text: { src: { heading: l.heading, take: [i] } } })),
        ],
      };
    }),
    ALMANCA_PROGRAMS_SECTION,
    GERMAN_CERTS_SECTION,
  ],
  branches: null,
  related: [ALMANCA_RELATED],
  cta: LEVEL_CTA,
  sources: GERMAN_CERT_SOURCES,
  updated: UPDATED,
  edits: {
    // Yazım: "Arkitel’lere" → "Artikel’lere".
    "Bu kurda Almanca’ya genel bir giriş yapılmaktadır. Kişilere Temel Almanca ile tanışma Arkitel’lere yoğunlaşma ve temel yapılar öğretilmektedir. İsmin halleri ve kullanımları 1. kur kitabımız Schritte ile birlikte Türk öğretmen eşliğinde, modern eğitim yöntemleri ve araçları ile işlenmekte. Geniş zaman kalıbını kullanarak basit cümleler ve kalıplarla kendini ifade etme seviyesine gelinir.":
      "Bu kurda Almanca’ya genel bir giriş yapılmaktadır. Kişilere Temel Almanca ile tanışma Artikel’lere yoğunlaşma ve temel yapılar öğretilmektedir. İsmin halleri ve kullanımları 1. kur kitabımız Schritte ile birlikte Türk öğretmen eşliğinde, modern eğitim yöntemleri ve araçları ile işlenmekte. Geniş zaman kalıbını kullanarak basit cümleler ve kalıplarla kendini ifade etme seviyesine gelinir.",
    // Yazım: "dialoglara" → "diyaloglara".
    "1. kurda edinilmiş olan Almanca bilgisini zamanlarla ve yeni gramer yapıları ile güçlendirerek öğrenci günlük Almanca’yı akıcı hale getirme becerisini edinir. Yurt dışına çıktığında yabancı biri ile basit dialoglara girebilir ve anlaşabilir.":
      "1. kurda edinilmiş olan Almanca bilgisini zamanlarla ve yeni gramer yapıları ile güçlendirerek öğrenci günlük Almanca’yı akıcı hale getirme becerisini edinir. Yurt dışına çıktığında yabancı biri ile basit diyaloglara girebilir ve anlaşabilir.",
    // Yazım: "soru- cevap".
    "Anlatılan konu Türk öğretmen tarafından Schritte kitabı ile ve konulara uygun çalışma kağıtları ile desteklenmektedir. Basit hikayelerin okunmaya başlandığı ve karşılıklı bu hikayeler üzerinde tartışmalar soru- cevap verilerek öğrenilmiş olan tüm yapılar kullanılarak pekiştirilir.":
      "Anlatılan konu Türk öğretmen tarafından Schritte kitabı ile ve konulara uygun çalışma kağıtları ile desteklenmektedir. Basit hikayelerin okunmaya başlandığı ve karşılıklı bu hikayeler üzerinde tartışmalar soru-cevap verilerek öğrenilmiş olan tüm yapılar kullanılarak pekiştirilir.",
    // Yazım: "yetiği herşeyi", "herşeyide", cümle sınırı ("anlar bu seviyede").
    "Kelime hazinesinin yetiği herşeyi çok rahat bir şekilde anlatır durumdadır. Karşısındaki kişinin konuştuğu herşeyide anlar bu seviyede amaç sadece konuşmaya yöneliktir. Tabi geride bırakılan grameri de zaman zaman hatırlatarak.":
      "Kelime hazinesinin yettiği her şeyi çok rahat bir şekilde anlatır durumdadır. Karşısındaki kişinin konuştuğu her şeyi de anlar. Bu seviyede amaç sadece konuşmaya yöneliktir. Tabi geride bırakılan grameri de zaman zaman hatırlatarak.",
    // Yazım: "çalışmalarını düzenlendiği" → "çalışmalarının düzenlendiği".
    "Bu seviyede belirli bir kitap işlenmez. Tamamen kitap dışı uygulamaların yapıldığı, çeşitli grup çalışmalarını düzenlendiği, günlük konuların sosyal, spor, politika gibi güncel olmuş olayların tartışıldığı yorumlandığı, karşıt fikirlerin ortaya konulduğu kurdur.":
      "Bu seviyede belirli bir kitap işlenmez. Tamamen kitap dışı uygulamaların yapıldığı, çeşitli grup çalışmalarının düzenlendiği, günlük konuların sosyal, spor, politika gibi güncel olmuş olayların tartışıldığı yorumlandığı, karşıt fikirlerin ortaya konulduğu kurdur.",
    // Eskimiş ifade çıkarıldı (kullanıcı kararı 2026-09-26: "kaset / DVD" cümleleri gizlenir).
    "Bunun için daha önce size konuyla ilgili kelimeler verilmektedir ve hazırlıklı bir şekilde karşılıklı sohbet niteliğinde geçer. DVD ile ilgili almanca film izleme alt yazılı ve yorumlama. Sosyal faaliyetlerin yoğun olduğu ve tartışılan her konunun kompozisyon şeklinde yazıya döküldüğü kurdur.":
      "Bunun için daha önce size konuyla ilgili kelimeler verilmektedir ve hazırlıklı bir şekilde karşılıklı sohbet niteliğinde geçer. Sosyal faaliyetlerin yoğun olduğu ve tartışılan her konunun kompozisyon şeklinde yazıya döküldüğü kurdur.",
    // Yazım: "yönelinilir", "uygulanıldığı".
    "Bu seviyede sınıfın genel olarak Almanca öğrenme amacına yönelinilir. Resmi yazı şekillerinin, formatlarının gösterildiği ve uygulanıldığı kurdur. Sınıf içerisindeki her bireyin amacı göz önünde bulundurulup onların ihtiyaçları doğrultusunda bir plan geliştirilir ve uygulamaya alınır.":
      "Bu seviyede sınıfın genel olarak Almanca öğrenme amacına yönelinir. Resmi yazı şekillerinin, formatlarının gösterildiği ve uygulandığı kurdur. Sınıf içerisindeki her bireyin amacı göz önünde bulundurulup onların ihtiyaçları doğrultusunda bir plan geliştirilir ve uygulamaya alınır.",
    // Yazım: "öğrencileride" → "öğrencileri de".
    "Genel kültür konularının ele alındığı ve yorumlandığı kurdur. Dil eğitiminde profesyonelliği ilke edinmiş olan kurumumuz, kurumumuzdan mezun olan öğrencileride profesyonel eğitim ya da iş hayatına giden yolda yönlendirerek hedeflerine ulaştırılmaları amaçlanır.":
      "Genel kültür konularının ele alındığı ve yorumlandığı kurdur. Dil eğitiminde profesyonelliği ilke edinmiş olan kurumumuz, kurumumuzdan mezun olan öğrencileri de profesyonel eğitim ya da iş hayatına giden yolda yönlendirerek hedeflerine ulaştırılmaları amaçlanır.",
  },
  ignored: [
    {
      line: "Duyma becerisini geliştirmek için hikayelerin kasetten dinletildiği ve üzerinde konuşulduğu resimlerden oluşan bir hikayenin yazıya ve söze döküldüğü ve akıcılığın sağlandığı seviyedir.",
      reason: "Eskimiş ifade (kaset) — kullanıcı kararı 2026-09-26.",
    },
  ],
};

/* ---------------------------------------------------------------
 * 4 · Türkçe Eğitim Seviyeleri
 * ------------------------------------------------------------- */

const TR_LEVELS = [
  { id: "a1", heading: "Başlangıç Seviyesi A1", code: "A1", name: "Başlangıç" },
  { id: "a2", heading: "Başlangıç Üzeri A2", code: "A2", name: "Başlangıç üzeri" },
  { id: "b1", heading: "Orta Seviye B1", code: "B1", name: "Orta" },
  { id: "b2", heading: "Orta Üzeri B2", code: "B2", name: "Orta üzeri" },
  { id: "c1", heading: "İleri Seviye C1", code: "C1", name: "İleri" },
  { id: "c2", heading: "İleri Seviye C2", code: "C2", name: "İleri" },
];

const TURKCE_SEVIYELER: SinglePageDef = {
  path: `${YD}/yabancila-icin-turkce-kurs/turkce-egitim-seviyeleri`,
  label: "Türkçe Eğitim Seviyeleri",
  meta: {
    description:
      "Yabancılar için Türkçe kurslarımızın A1'den C2'ye altı seviyesi: her seviyede neleri anlayıp ifade edebildiğiniz ve Türkçe yeterlik belgesi.",
    reasons: ["description: kaynak 169 karakter ve bayat şube listesi (Ümraniye yok) — ≤155 ve konuya göre yeniden."],
  },
  hero: {
    // Kaynak: "Türkçe düzeyi kur programı toplam 6 kur sisteminden oluşmaktadır. Başlangıç A1 … İleri Seviye C2" — arayüz özeti.
    lead: { added: "Yabancılar için Türkçe kurslarımız, Avrupa Ortak Dil Çerçevesi'nin (CEFR) A1'den C2'ye altı seviyesine göre ilerler." },
    board: {
      kind: "ladder",
      title: "Altı kur, altı basamak",
      sub: "Bir basamağa dokunun, o seviyede neler yapabildiğinizi görün.",
      steps: TR_LEVELS.map(({ code, name, id }) => ({ code, name, id })),
    },
  },
  sections: [
    {
      id: "kur-sistemi",
      title: { source: "Türkçe Kur Sistemi" },
      answer: { src: { heading: "Türkçe Kur Sistemi", take: [0] }, sentence: 0 },
      blocks: [
        { kind: "text", text: { src: { heading: "Türkçe Kur Sistemi", take: [0] }, sentence: 1 } },
        // MEB çevirisi "Diller için Avrupa Ortak Başvuru Metni — Tamamlayıcı Cilt", Ek 1 küresel ölçek:
        // https://ttkb.meb.gov.tr/meb_iys_dosyalar/2022_01/04144518_CEFR_TR.pdf
        { kind: "text", text: { added: "Aşağıdaki tanımlar Avrupa Ortak Dil Çerçevesi'nin küresel ölçeğine dayanır; her seviye bir öncekinin becerilerini de kapsar." } },
      ],
    },
    ...TR_LEVELS.map(
      (l): SingleSection => ({
        id: l.id,
        title: { source: l.heading },
        answer: { src: { heading: l.heading, take: [0] }, sentence: 0 },
        blocks: [{ kind: "text", text: { src: { heading: l.heading, take: [0] }, sentence: [1, -1] } }],
      }),
    ),
    {
      // Yunus Emre Enstitüsü TYS — https://tys.yee.org.tr/index.php?option=com_content&view=article&id=61&Itemid=478
      // (15.01.2022'den beri yalnız B2 ve C1; okuma 60 + dinleme 45 + yazma 60 + konuşma 15 = 180 dk; belge 2 yıl).
      // Üniversite şartı ulusal değil, senato belirler (ör. Yalova Üni. lisansüstü: en az C1) — mevzuat.gov.tr.
      id: "yeterlik",
      title: { added: "Türkçe seviyenizi hangi sınavla belgelersiniz?" },
      answer: { added: "Yunus Emre Enstitüsü'nün Türkçe Yeterlik Sınavı (TYS), B2 ve C1 düzeyinde belge verir." },
      blocks: [
        {
          kind: "points",
          items: {
            added: [
              "Sınav dört beceriyi ölçer: okuma (60 dk), dinleme (45 dk), yazma (60 dk) ve konuşma (15 dk).",
              "15 Ocak 2022'den bu yana yalnız B2 ve C1 belgesi verilir; belge 2 yıl geçerlidir.",
              "Türkiye'deki üniversitelerin Türkçe yeterlik şartını her üniversite kendisi belirler; başvurmadan önce bölümünüzün koşullarını kontrol edin.",
            ],
          },
        },
      ],
    },
  ],
  branches: null,
  related: [
    {
      title: "Türkçe eğitimleri",
      links: [
        { label: "Türkçe Kursu", href: `${YD}/yabancila-icin-turkce-kurs` },
        { label: "Türkçe Özel Ders", href: `${YD}/yabancila-icin-turkce-kurs/turkce-ozel-ders` },
        { label: "Online Türkçe Eğitimi", href: `${YD}/yabancila-icin-turkce-kurs/online-turkce-egitimi` },
      ],
    },
  ],
  cta: LEVEL_CTA,
  sources: [
    "MEB — Diller için Avrupa Ortak Başvuru Metni, Tamamlayıcı Cilt (Türkçe çeviri), küresel ölçek",
    "Yunus Emre Enstitüsü — Türkçe Yeterlik Sınavı (tys.yee.org.tr)",
  ],
  updated: UPDATED,
  edits: {
    // Yazım: "sistemiden", çift boşluk, eksik nokta.
    "Türkçe düzeyi kur programı toplam 6 kur sistemiden oluşmaktadır. Başlangıç A1, Başlangıç Üzeri A2, Orta Seviye B1, Orta Üzeri Seviye B2, İleri Seviye C1 ve İleri Seviye C2 şeklindedir":
      "Türkçe düzeyi kur programı toplam 6 kur sisteminden oluşmaktadır. Başlangıç A1, Başlangıç Üzeri A2, Orta Seviye B1, Orta Üzeri Seviye B2, İleri Seviye C1 ve İleri Seviye C2 şeklindedir.",
    // CEFR A2 — yazım: "alış veriş".
    "Cümleleri ve kendisiyle çok ilgili alanlarda sıklıkla kullanılan ifadeleri anlayabilir (ör. çok temel kişisel ve aile bilgileri, alış veriş, yerel coğrafya, istihdam gibi). Bildik ve rutin konularda basit ve doğrudan bilgi takası gerektiren rutin ve basit görevlerde iletişim kurabilir. Geçmişi hakkında, yakın çevresi ve acil ihtiyacı olan alanlardaki konularda basit terimlerle ifade edebilir.":
      "Cümleleri ve kendisiyle çok ilgili alanlarda sıklıkla kullanılan ifadeleri anlayabilir (ör. çok temel kişisel ve aile bilgileri, alışveriş, yerel coğrafya, istihdam gibi). Bildik ve rutin konularda basit ve doğrudan bilgi takası gerektiren rutin ve basit görevlerde iletişim kurabilir. Geçmişi hakkında, yakın çevresi ve acil ihtiyacı olan alanlardaki konularda basit terimlerle ifade edebilir.",
    // CEFR B2 — "alanda ki" yazımı; ikinci cümle CEFR'e göre düzeltildi ("…with a degree of fluency and
    // spontaneity that makes regular interaction with native speakers quite possible without strain for either party").
    "Uzman olduğu alanda ki teknik tartışmalar dahil hem somut hem de özet konularda karmaşık metinlerin ana fikirlerini anlayabilir. Her iki tarafı germeden ana dili olarak konuşanlarla normal iletişim kuran akıcı ve spontane derecede iletişim kurmak gayet mümkündür. Geniş yelpazedeki konularda açık, detaylı metinler oluşturabilir ve çeşitli opsiyonların avantajlarını ve dezavantajlarını vererek bir konuda görüş açısını açıklayabilir.":
      "Uzman olduğu alandaki teknik tartışmalar dahil hem somut hem de soyut konulardaki karmaşık metinlerin ana fikirlerini anlayabilir. Ana dili Türkçe olanlarla iki taraf için de zorlanmadan düzenli iletişim kurmayı mümkün kılan bir akıcılık ve doğallıkla etkileşime girebilir. Geniş yelpazedeki konularda açık, detaylı metinler oluşturabilir ve çeşitli opsiyonların avantajlarını ve dezavantajlarını vererek bir konuda görüş açısını açıklayabilir.",
    // CEFR C1 — "without much obvious searching for expressions"; "connectors and cohesive devices".
    "Geniş bir yelpazede iddialı, uzun metinleri anlayabilir ve ima edilen anlamlarını fark edebilir. İfadelerini açıkça araştırmadan akıcı ve kendiliğinden olarak fikirlerini ifade edebilir. Sosyal, akademik ve profesyonel amaçlar için dili esnek ve etkin bir şekilde kullanabilir. Karmaşık konularda net, iyi yapılandırılmış, detaylı metinler üretebilir, yapısal kalıpların, bağlaçların ve birleşik gereçlerin kontrollü kullanımını gösterebilir.":
      "Geniş bir yelpazede zorlayıcı, uzun metinleri anlayabilir ve ima edilen anlamlarını fark edebilir. İfade aramak için belirgin biçimde duraksamadan, akıcı ve kendiliğinden fikirlerini ifade edebilir. Sosyal, akademik ve profesyonel amaçlar için dili esnek ve etkin bir şekilde kullanabilir. Karmaşık konularda net, iyi yapılandırılmış, detaylı metinler üretebilir; düzenleme kalıplarını, bağlaçları ve bağdaşıklık araçlarını kontrollü biçimde kullanır.",
  },
  ignored: [],
};

/* ---------------------------------------------------------------
 * 5 · İngilizce Eğitim Sistemi (kanonik: /yabanci-dil-egitimleri/…; /ingilizce-kurslari/… 301)
 * ------------------------------------------------------------- */

const EN_H1 = "Dünya Dilleri Merkezi İngilizce Eğitim Sistemi";
const EN_STEPS = "İngilizce Eğitim Sisteminde Uygulama Şekli Nedir?";
const EN_HOW = "İngilizce eğitim sistemi dinleme, tekrar etme, okuma, konuşma, test ve yazma kapsayacak şekilde uygulanır.";
const EN_LEARN = "İngilizce Eğitim Sisteminde Öğrenirken Uygulananlar";

const INGILIZCE_SISTEM: SinglePageDef = {
  path: `${YD}/ingilizce-kursu/ingilizce-egitim-sistemi`,
  label: "İngilizce Eğitim Sistemi",
  meta: {
    description:
      "Dünya Dilleri Merkezi İngilizce eğitim sistemi: dinleme, tekrar, okuma-yazma, konuşma ve test adımlarıyla öğrenci merkezli, konuşma ağırlıklı dersler.",
    reasons: ["description: kaynak 207 karakter ve bayat şube listesi — ≤155 ve konuya göre yeniden."],
  },
  hero: {
    lead: { src: { heading: EN_H1, take: [0] }, sentence: 0 },
    board: {
      kind: "steps",
      title: "Derslerin akışı",
      sub: "Dinlemeden teste dört adım",
      // Adım adları arayüz kısaltması; açıklamalar kaynağın "Uygulama Şekli Nedir?" satırları (birebir).
      steps: [
        { name: "Dinleme", text: "İngilizce sesli dinleme" },
        { name: "Tekrar", text: "İngilizce tekrar etme" },
        { name: "Okuma ve yazma", text: "İngilizce okuma yazma" },
        { name: "Konuşma ve test", text: "İngilizce konuşma ve İngilizce Test" },
      ],
    },
  },
  sections: [
    {
      id: "neden-unutuluyor",
      title: { added: "İngilizce neden unutuluyor?" },
      answer: { src: { heading: EN_H1, take: [0] }, sentence: 1 },
      blocks: [{ kind: "text", text: { src: { heading: EN_H1, take: [0] }, sentence: [2, -1] } }],
    },
    {
      id: "dogru-ogrenim",
      title: { added: "Doğru İngilizce öğrenimi nasıl olmalı?" },
      answer: { src: { heading: EN_H1, take: [1] }, sentence: 2 },
      blocks: [
        { kind: "text", text: { src: { heading: EN_H1, take: [1] }, sentence: [0, 1] } },
        { kind: "text", text: { src: { heading: EN_H1, take: [1] }, sentence: 3 } },
        { kind: "text", text: { src: { heading: EN_H1, take: [2] } } },
      ],
    },
    {
      id: "uygulama",
      title: { source: EN_STEPS },
      answer: { added: "Dört adımda: dinleme, tekrar, okuma-yazma, konuşma ve test." },
      blocks: [
        { kind: "points", items: { src: { heading: EN_STEPS, take: [0, 1, 2, 3] } } },
        { kind: "subhead", source: EN_HOW },
        { kind: "text", text: { src: { heading: EN_HOW, take: [0] } } },
      ],
    },
    {
      id: "beceri",
      title: { source: "İngilizce Öğrenme Sürecinde Beceri Geliştirme" },
      answer: { added: "Öğrenci merkezli dersler, doğru seviyeden başlangıç ve bol konuşma pratiği." },
      blocks: [
        { kind: "subhead", source: EN_LEARN },
        {
          kind: "cards",
          items: [
            { title: "Öğretmen ve öğrenci birlikte", text: { src: { heading: EN_LEARN, take: [0] } } },
            { title: "Doğru seviyeden başlangıç", text: { src: { heading: EN_LEARN, take: [1] } } },
            { title: "Konuşma pratiği", text: { src: { heading: EN_LEARN, take: [2] } } },
            { title: "Duy, oku, yaz", text: { src: { heading: EN_LEARN, take: [3] } } },
            { title: "Yazmanın yeri", text: { src: { heading: EN_LEARN, take: [4] } } },
          ],
        },
      ],
    },
    {
      id: "sinavlar",
      title: { added: "İngilizce seviyenizi hangi sınavla belgelersiniz?" },
      // Sıralama/yaygınlık iddiası yok: hangi belgenin istendiği kuruma bağlı; olgular bağlanan rehberlerde (kaynaklı).
      answer: { added: "Hangi belgenin istendiği başvurduğunuz kuruma bağlıdır; yaygın sınavları aşağıdaki rehberlerde karşılaştırabilirsiniz." },
      blocks: [
        {
          kind: "links",
          items: [
            { label: "TOEFL Nedir?", href: `${SH}/toefl-kursu/toefl-nedir` },
            { label: "IELTS Nedir?", href: `${SH}/ielts-kursu/ielts-nedir` },
            { label: "TOEIC Nedir?", href: `${SH}/toeic-kursu/toeic-nedir` },
            { label: "YDS Nedir?", href: `${SH}/yds-kursu/yds-nedir` },
            { label: "Proficiency Nedir?", href: `${SH}/proficiency-kursu/proficiency-nedir` },
          ],
        },
      ],
    },
  ],
  branches: {
    title: { source: "İngilizce Eğitim Plan Tablosu ve Kurs Tarihleri" },
    answer: { src: { heading: EN_LEARN, take: [5] } },
    links: { heading: EN_H1, take: [3, 4, 5, 6] },
    branches: ["kadikoy", "bagdat", "etiler", "atasehir"],
    course: "ingilizce-kursu",
  },
  related: [
    {
      title: "İngilizce eğitimleri",
      links: [
        { label: "İngilizce Kursu", href: `${YD}/ingilizce-kursu` },
        { label: "İngilizce Kursları", href: "/ingilizce-kurslari" },
        { label: "İngilizce Özel Ders", href: `${YD}/ingilizce-kursu/ingilizce-ozel-ders` },
        { label: "İngilizce Konuşma Kursu", href: `${YD}/ingilizce-konusma-kursu` },
        { label: "Online İngilizce Eğitimi", href: `${YD}/ingilizce-kursu/online-ingilizce-egitimi` },
      ],
    },
  ],
  cta: LEVEL_CTA,
  sources: [],
  updated: UPDATED,
  edits: {
    // Yazım: "kazanmasını sağlanır" → "kazanmasını sağlar".
    "Önce duyarak, ardından okuyarak ve son olarak yazarak tamamlanan bu süreç İngilizce eğitiminde öğrencinin her tür meziyeti kazanmasını sağlanır. Bu şekilde bir eğitim, İngilizce konuşmaktan çekinmeyen, okuduğunu anlayan ve yazabilen öğrencilerin yetişmesini sağlıyoruz.":
      "Önce duyarak, ardından okuyarak ve son olarak yazarak tamamlanan bu süreç İngilizce eğitiminde öğrencinin her tür meziyeti kazanmasını sağlar. Bu şekilde bir eğitim, İngilizce konuşmaktan çekinmeyen, okuduğunu anlayan ve yazabilen öğrencilerin yetişmesini sağlıyoruz.",
    // Bayat şube adı: Beşiktaş → Etiler (hedef sayfa aynı: besiktas-subesi-kurs-tarihi).
    "Beşiktaş Şubesi İngilizce Kurs Tarihleri": "Etiler Şubesi İngilizce Kurs Tarihleri",
  },
  ignored: [
    { line: "Dünya Dilleri Merkezi Kadıköy şubesi", reason: "Şube iletişim bağlantısı — gri banttaki şube kartları ve 'Şubelerimiz' aynı hedefleri taşır." },
    { line: "Dünya Dilleri Merkezi Bağdat Caddesi şubesi", reason: "Şube iletişim bağlantısı (aynı gerekçe)." },
    { line: "Dünya Dilleri Merkezi Beşiktaş Levent şubesi", reason: "Şube iletişim bağlantısı (aynı gerekçe)." },
    { line: "Dünya Dilleri Merkezi Ataşehir şubesi", reason: "Şube iletişim bağlantısı (aynı gerekçe)." },
  ],
};

/* ---------------------------------------------------------------
 * 6 · Çince Öğrenmek Zor mu?
 * ------------------------------------------------------------- */

const ZH_WHY = "Neden Çince Öğrenmelisiniz?";
const ZH_HARD = "Çince Öğrenmek Zor mu?";

const CINCE_ZOR_MU: SinglePageDef = {
  path: `${YD}/cince-kursu/cince-ogrenmek-zor-mu`,
  label: "Çince Öğrenmek Zor mu?",
  meta: {
    title: "Çince Öğrenmek Zor mu? Neden Çince Öğrenmelisiniz?",
    description:
      "Çince öğrenmek zor mu? Karakterler, tonlar ve sade dilbilgisi; öğrenme süresi, HSK seviyeleri ve Çince öğrenmenin avantajları.",
    reasons: [
      "title: adres 'zor mu' sorusunu taşıyor, kaynak başlık yalnız 'Neden…' — iki soru birlikte.",
      "description: kaynak 168 karakter ve bayat şube listesi — ≤155 ve konuya göre yeniden.",
    ],
  },
  hero: {
    lead: { src: { heading: ZH_HARD, take: [0] } },
    board: {
      kind: "scale",
      title: "Kolay yanı, zor yanı",
      sub: "Dilbilgisi sade; yazı ve ses emek ister",
      // "gramerin İngilizce'deki gibi istisnaları yoktur" · "Fiillerinin çekimleri olmadığından … düzenli veya düzensiz … ayrımı da yoktur"
      // · "karakterleri gördüğünüzde tanımanız … yazmaktan daha kolaydır"
      easy: ["Fiiller çekilmez", "Düzenli / düzensiz fiil ayrımı yok", "İngilizcedeki gibi istisnalar yok", "Karakterleri tanımak, yazmaktan kolay"],
      // "Çince karakterleri öğrenmek zor gibi görünebilir" · "telaffuz ve doğru ton kullanımı çok önemlidir"
      hard: ["Karakterleri ezberleyip yazmak", "Doğru ton ve telaffuz"],
    },
  },
  sections: [
    {
      id: "zor-mu",
      title: { source: ZH_HARD },
      answer: { added: "Karakterler ve tonlar emek ister; dilbilgisi ise sanıldığından sadedir." },
      blocks: [
        { kind: "text", text: { src: { heading: ZH_HARD, take: [1] } } },
        {
          kind: "points",
          items: {
            // Tonlar ve pinyin: Çin Eğitim Bakanlığı Pinyin şeması (hafif ton işaretlenmez) —
            // http://www.moe.gov.cn/jyb_sjzl/ziliao/A19/195802/t19580201_186000.html ; Ulusal Ortak Dil ve Yazı Yasası (2025) md. 20
            // Zaman / kişi eki yok: WALS 66A, 102A (Mandarin) — https://wals.info/valuesets/66A-mnd
            added: [
              "Mandarin Çincesinde dört ton ve bir hafif ton vardır; aynı hece tonuna göre farklı anlam taşır.",
              "Pinyin, Çincenin Latin harfleriyle yazılan resmi sesletim sistemidir; başlangıçta okumayı ve telaffuzu kolaylaştırır.",
              "Fiiller kişiye ve zamana göre ek almaz; zaman \"dün, yarın\" gibi sözcüklerle ve görünüş ekleriyle anlatılır.",
            ],
          },
        },
      ],
    },
    {
      // FSI — https://www.state.gov/foreign-language-training/ ("Category IV Languages: 88 weeks (2200 class hours)")
      // HSK 3 bant / 9 seviye (GF0025-2021) — http://www.moe.gov.cn/jyb_xwfb/gzdt_gzdt/s5987/202103/t20210329_523304.html
      // 2026 takvimi: HSK 1–6 her ay, 7–9 yalnız bilgisayarda — https://www.chinesetest.cn/notice
      id: "sure",
      title: { added: "Çince öğrenmek ne kadar sürer?" },
      answer: {
        added:
          "ABD Dışişleri Bakanlığı'nın dil okulu (FSI), ana dili İngilizce olanlar için Mandarin'i en uzun süren IV. kategoride sayar: yaklaşık 88 hafta, 2.200 ders saati.",
      },
      blocks: [
        {
          kind: "table",
          title: "Çince yeterlik seviyeleri (HSK)",
          head: ["Bant", "Seviyeler"],
          rows: [
            ["Başlangıç", "HSK 1 – 3"],
            ["Orta", "HSK 4 – 6"],
            ["İleri", "HSK 7 – 9"],
          ],
          note: "Çin'in 2021 standardı dokuz seviye tanımlar. 2026 takviminde HSK 1–6 sınavları her ay, 7–9 yalnız bilgisayarda yılda iki kez yapılır.",
        },
      ],
    },
    {
      id: "neden",
      title: { added: "Neden Çince öğrenmelisiniz?" },
      answer: { added: "Ana dili olarak en çok konuşulan dil olması, Türkiye ile Çin arasındaki ilişkiler ve iş dünyasında artan talep." },
      blocks: [
        { kind: "text", text: { src: { heading: ZH_WHY, take: [0] } } },
        { kind: "text", text: { src: { heading: ZH_WHY, take: [1] } } },
        { kind: "text", text: { src: { heading: ZH_WHY, take: [2] } } },
      ],
    },
  ],
  branches: null,
  related: [
    {
      title: "Çince eğitimleri",
      links: [
        { label: "Çince Kursu", href: `${YD}/cince-kursu` },
        { label: "Çince Özel Ders", href: `${YD}/cince-kursu/cince-ozel-ders` },
        { label: "Online Çince Eğitimi", href: `${YD}/cince-kursu/online-cince-egitimi` },
      ],
    },
  ],
  cta: { title: "Çince öğrenmeye birlikte başlayalım", sub: "Seviyenizi ve size uygun programı en yakın şubemizle konuşun." },
  sources: [
    "Ethnologue — What is the most spoken language?",
    "British Council — Languages for the Future (2017)",
    "Çin Eğitim Bakanlığı — Hanyu Pinyin şeması; Ulusal Ortak Dil ve Yazı Yasası",
    "WALS — Mandarin, özellik 66A ve 102A",
    "ABD Dışişleri Bakanlığı — Foreign Service Institute dil kategorileri",
    "Çin Eğitim Bakanlığı — GF0025-2021 standardı; chinesetest.cn 2026 sınav takvimi",
  ],
  updated: UPDATED,
  headingEdits: {
    // H1: adres "zor mu" sorusunu taşıyor — iki soru birlikte (başlık silinmedi, genişletildi).
    [ZH_WHY]: "Çince Öğrenmek Zor mu? Neden Öğrenmelisiniz?",
  },
  edits: {
    // Genel bilgi yanlışı (Çince Kursu sayfasındaki düzeltmeyle aynı, kullanıcı onayı 2026-09-26):
    // Ethnologue — ana dilde 1. Mandarin, toplamda 1. İngilizce; "iki milyar" doğrulanamadı → çıkarıldı.
    "Dünya üzerinde en çok konuşulan dil Çince'dir. Dünya'da iki milyar insan Çince konuşmaktadır. Çinli'ler 5 bin yıllık tarihleri boyunca eski Türk devletleri ile komşu olarak yaşamış ve yakın temasta bulunmuşlardır. Dönemin Çinli gezginleri, tarihçileri ve yazarları Hun, Yüsün, Uygur gibi Türk boyları hakkında pek çok kitap yazmışlardır. Bugün, eski Türk tarihini incelerken Çince kaynakların ne kadar önemli olduğu anlaşılmaktadır.":
      "Ana dili olarak en çok konuşulan dil Mandarin Çincesidir; ikinci dil olarak konuşanlar da sayıldığında İngilizceden sonra ikinci sıradadır. Çinliler 5 bin yıllık tarihleri boyunca eski Türk devletleri ile komşu olarak yaşamış ve yakın temasta bulunmuşlardır. Dönemin Çinli gezginleri, tarihçileri ve yazarları Hun, Yüsün, Uygur gibi Türk boyları hakkında pek çok kitap yazmışlardır. Bugün, eski Türk tarihini incelerken Çince kaynakların ne kadar önemli olduğu anlaşılmaktadır.",
    // "İngiltere ve ABD'de en çok talep edilen dil" yanlış (MLA 2021, gov.uk GCSE 2025) → British Council "Languages for the Future".
    "İngiltere ve ABD'de, Çince en çok talep edilen yabancı dil olduğu bilinmektedir. Bu doğrultuda Türkiye'de de talep hızla artıyor. Yakın gelecekte daha da önemli hale gelecek olan Çince'yi öğrenmenin gençler için çok önemli bir yatırım olduğu birçok önemli iş adamları tarafından belirtiliyor.":
      "British Council'ın \"Languages for the Future\" raporu, Mandarin Çincesini İngiltere'nin gelecekte en çok ihtiyaç duyacağı beş dil arasında sayar. Bu doğrultuda Türkiye'de de talep hızla artıyor. Yakın gelecekte daha da önemli hale gelecek olan Çince'yi öğrenmenin gençler için çok önemli bir yatırım olduğu birçok önemli iş adamları tarafından belirtiliyor.",
  },
  ignored: [],
};

/* ---------------------------------------------------------------
 * 7 · A1 Aile Birleşimi Sınav Örneği
 * ------------------------------------------------------------- */

const A1_H1 = "A1 AİLE BİRLEŞİMİ SINAV ÖRNEĞİ (Deneme Sınavı)";
const A1_LETTERS = "AİLE BİRLEŞİMİ MEKTUP ÖRNEKLERİ";
const A1_T1 = "Sie wollen im Juli nach Kaernten fahren. Schreiben Sie eine E-mail an die Touristeninformation in Kaernten:";
const A1_T2 = "Sie wollen Ihre Freundin Monika am Wochenende besuchen. Schreiben Sie an Monika:";
const A1_T3 = "Ihre Freundin Renate hat Sie am Mittwoch zum Essen eingeladen. Schreiben Sie eine E-mail an Renate:";
const A1_EX1 = "Almanca Sınavı Mektup Örnekleri: Örnek 1";
const A1_EX2 = "Almanca Sınavı Mektup Örnekleri: Örnek 2";
/** Kaynakta görevlerin birleştiği satırlar: Örnek 2'nin son maddesi + "Örnek 3:" etiketi; Örnek 3'ün son maddesi + Örnek 4; Örnek 4'ün son maddesi + Örnek 5. */
const A1_L_EX3 = "Bitten Sie um einen Antwort Örnek 3:";
const A1_L_EX4 =
  "Fragen Sie: am Freitag zusammen essen Sie müssen zum Zahnarzt gehen weil Sie Zahnschmerzen haben. Aber können Sie heute nicht zum Arzt. Sie haben einen wichtigen Termin. Rufen Sie den Arzt an:";
const A1_L_EX5 =
  "Einen Termin für Morgen machen. Ihr Sohn Hans kann heute nicht in die Schule gehen weil er karank ist. Schreiben Sie eine E-mail an die Schuldirektorin Frau Gruber:";

const A1_ORNEK: SinglePageDef = {
  path: `${SH}/aile-birlesimi-egitimi/a1-sinav-ornegi`,
  label: "A1 Sınav Örneği",
  // Kaynakta h1 yok; ilk başlık (h2) H1'e yükseltildi, büyük harf yazımı `headingEdits` ile düzeltildi.
  h1Heading: A1_H1,
  meta: {
    title: "Aile Birleşimi A1 Sınav Örneği: Almanca Mektup Örnekleri",
    description:
      "Aile birleşimi A1 (Start Deutsch 1) sınavının yazma bölümü için Almanca mektup örnekleri, sınavın bölümleri ve kabul edilen belgeler.",
    reasons: [
      "title: kaynak 189 karakter, anahtar kelime yığını — ≤60.",
      "description: kaynak 180 karakter, sonda fazladan tırnak ve bayat şube listesi — ≤155.",
    ],
  },
  hero: {
    lead: { src: { heading: A1_H1, take: [0] } },
    board: {
      // Goethe-Zertifikat A1: Start Deutsch 1 — Durchführungsbestimmungen (1.9.2025):
      // https://www.goethe.de/pro/relaunch/prf/fr/Durchfuehrungsbestimmungen_A1_Start_Deutsch_1.pdf
      // Hören ~20, Lesen 25, Schreiben 20 dk (yazılı 65 dk); Sprechen en fazla 4 kişilik grup ~15 dk; 100 puan, geçme 60.
      kind: "sheet",
      title: "Goethe-Zertifikat A1: Start Deutsch 1",
      sub: "Sınavın dört bölümü",
      rows: [
        { name: "Dinleme", local: "Hören", time: "yaklaşık 20 dk" },
        { name: "Okuma", local: "Lesen", time: "25 dk" },
        { name: "Yazma", local: "Schreiben", time: "20 dk", highlight: "Bu sayfadaki örnekler" },
        { name: "Konuşma", local: "Sprechen", time: "yaklaşık 15 dk, grupla" },
      ],
      facts: [
        { value: "100", label: "toplam puan" },
        { value: "60", label: "geçme puanı" },
        { value: "65 dk", label: "yazılı bölüm" },
      ],
    },
  },
  sections: [
    {
      // Goethe — https://bfu.goethe.de/a1_sd1/schreiben.php (Teil 1: form, 5 bilgi, 5 puan; Teil 2: ca. 30 Wörter, 3 nokta, 10 puan)
      id: "yazma",
      title: { added: "Yazma bölümünde ne istenir?" },
      answer: { added: "İki görev var: bir forma beş bilgi yazmak ve üç maddeye cevap veren, yaklaşık 30 kelimelik kısa bir mesaj." },
      blocks: [
        {
          kind: "points",
          items: {
            added: [
              "Birinci görevde bir formdaki beş boşluğu doldurursunuz (5 puan).",
              "İkinci görevde yaklaşık 30 kelimelik kısa bir mesaj ya da e-posta yazarsınız; hitap ve kapanış buna dahildir (10 puan).",
              "Mesajda üç maddenin her birine değinin; eksik kalan madde puan kaybettirir.",
              "Hitabı (Liebe Monika, / Sehr geehrte Frau Gruber,) ve kapanışı (Viele Grüße) unutmayın.",
            ],
          },
        },
      ],
    },
    {
      id: "mektup-ornekleri",
      title: { source: A1_LETTERS },
      answer: { src: { heading: A1_LETTERS, take: [0] } },
      blocks: [
        {
          kind: "tasks",
          from: [{ heading: A1_T1, take: "all" }, { heading: A1_T2, take: "all" }, { heading: A1_T3, take: "all" }],
          items: [
            {
              label: { h: A1_EX1 },
              prompt: { h: A1_T1 },
              tr: "Temmuzda Kärnten'e gideceksiniz. Turizm danışma bürosuna e-posta yazın.",
              points: [{ l: "Hotel Adressen brauchen" }, { l: "Bitten Sie um Informationen über die Sehenswürdigkeiten" }, { l: "Bitten Sie um einen Antwort" }],
            },
            {
              label: { h: A1_EX2 },
              prompt: { h: A1_T2 },
              tr: "Hafta sonu arkadaşınız Monika'yı ziyaret edeceksiniz. Monika'ya yazın.",
              points: [{ l: "Ankunft: Samstag, 10:30 Uhr" }, { l: "Bitten Sie Monika: Sie soll Sie vom Bahnhof abholen" }, { l: A1_L_EX3, part: 0 }],
            },
            {
              label: { l: A1_L_EX3, part: 1 },
              prompt: { h: A1_T3 },
              tr: "Arkadaşınız Renate sizi çarşamba yemeğe davet etti. Renate'ye e-posta yazın.",
              points: [{ l: "Bedanken Sie sich" }, { l: "Am Mittwoch sind Sie in einer anderen Stadt. Sie können nicht kommen." }, { l: A1_L_EX4, part: 0 }],
            },
            {
              label: { l: A1_L_EX4, part: 1 },
              prompt: { l: A1_L_EX4, part: 2 },
              tr: "Dişiniz ağrıyor ama bugün önemli bir randevunuz var. Diş hekimini arayın.",
              points: [{ l: "Seit wann Sie schmerzen haben" }, { l: "Was Sie im moment machen müssen?" }, { l: A1_L_EX5, part: 0 }],
            },
            {
              label: { l: A1_L_EX5, part: 1 },
              prompt: { l: A1_L_EX5, part: 2 },
              tr: "Oğlunuz Hans hasta ve bugün okula gidemiyor. Okul müdürü Bayan Gruber'e e-posta yazın.",
              points: [{ l: "Er kann nicht in die Schule gehen, warum?" }, { l: "Sie kommen Morgen wegen seine Hausaufgaben." }],
            },
          ],
        },
      ],
    },
    {
      // AufenthG §30 — https://www.gesetze-im-internet.de/aufenthg_2004/__30.html
      // Türkiye: Goethe Start Deutsch 1 + ÖSD A1, telc değil, ≤12 ay — https://tuerkei.diplo.de/tr-tr/service/05-visaeinreise/2769600-2769600
      id: "belge",
      title: { added: "Aile birleşiminde hangi belge geçerli?" },
      answer: { added: "Türkiye'den yapılan başvurularda Goethe-Zertifikat A1: Start Deutsch 1 ya da ÖSD A1 belgesi kabul edilir; telc belgesi kabul edilmez." },
      blocks: [
        {
          kind: "points",
          items: {
            added: [
              "Belge, vize başvurusu sırasında 12 aydan eski olmamalıdır.",
              "Şartın dayanağı Almanya İkamet Yasası'nın (AufenthG) 30. maddesidir: eşin en azından basit düzeyde Almanca anlaşabilmesi.",
              "Hastalık ya da engel gibi durumlarda muafiyet mümkündür; güncel koşulları Almanya'nın Türkiye temsilciliklerinden kontrol edin.",
            ],
          },
        },
        { kind: "links", items: [{ label: "Aile Birleşimi Almanca Kursu", href: `${SH}/aile-birlesimi-egitimi` }] },
      ],
    },
  ],
  branches: null,
  related: [ALMANCA_RELATED],
  cta: { title: "Aile birleşimi sınavına birlikte hazırlanalım", sub: "Kurs tarihleri ve deneme sınavları için size en yakın şubemizle konuşun." },
  sources: [
    "Goethe-Institut — Durchführungsbestimmungen A1: Start Deutsch 1 (1 Eylül 2025)",
    "Goethe-Institut — Start Deutsch 1, Schreiben (bfu.goethe.de)",
    "Almanya İkamet Yasası (AufenthG) § 30",
    "Almanya'nın Türkiye temsilcilikleri — Aile birleşimi bilgi notu (turkei.diplo.de)",
  ],
  updated: UPDATED,
  headingEdits: {
    // Büyük harf yazımı.
    [A1_H1]: "A1 Aile Birleşimi Sınav Örneği (Deneme Sınavı)",
    [A1_LETTERS]: "Aile Birleşimi Mektup Örnekleri",
    // Görev kartı etiketi — bölüm başlığı "Aile Birleşimi Mektup Örnekleri" hemen üstte.
    [A1_EX1]: "Örnek 1",
    [A1_EX2]: "Örnek 2",
    // Almanca yazım: "Kaernten" → "Kärnten", "E-mail" → "E-Mail".
    [A1_T1]: "Sie wollen im Juli nach Kärnten fahren. Schreiben Sie eine E-Mail an die Touristeninformation in Kärnten:",
    [A1_T3]: "Ihre Freundin Renate hat Sie am Mittwoch zum Essen eingeladen. Schreiben Sie eine E-Mail an Renate:",
  },
  edits: {
    // Eksik cümle + sınav adı (Goethe'nin resmi adı "Goethe-Zertifikat A1: Start Deutsch 1").
    "Aile Birleşimi için A1 Almanca Sınavı’na (Goethe Sertifikat - Start Deutsch A1)":
      "Aile Birleşimi için A1 Almanca Sınavı’na (Goethe-Zertifikat A1: Start Deutsch 1) hazırlanırken aşağıdaki mektup görevleriyle çalışabilirsiniz.",
    // Almanca yazım (görev maddeleri): bitişik yazım, "einen Antwort" → "eine Antwort", büyük harfli
    // ad ("Schmerzen", "Moment"), küçük harfli zarf ("morgen"), "wegen seine" → "wegen seiner", noktalama.
    "Hotel Adressen brauchen": "Hoteladressen brauchen",
    "Bitten Sie um Informationen über die Sehenswürdigkeiten": "Bitten Sie um Informationen über die Sehenswürdigkeiten.",
    "Bitten Sie um einen Antwort": "Bitten Sie um eine Antwort.",
    "Bitten Sie Monika: Sie soll Sie vom Bahnhof abholen": "Bitten Sie Monika: Sie soll Sie vom Bahnhof abholen.",
    "Bedanken Sie sich": "Bedanken Sie sich.",
    "Seit wann Sie schmerzen haben": "Seit wann Sie Schmerzen haben",
    "Was Sie im moment machen müssen?": "Was Sie im Moment machen müssen",
    "Er kann nicht in die Schule gehen, warum?": "Er kann nicht in die Schule gehen – warum?",
    "Sie kommen Morgen wegen seine Hausaufgaben.": "Sie kommen morgen wegen seiner Hausaufgaben.",
  },
  splits: {
    // Örnek 2'nin son maddesi + Örnek 3 etiketi ("einen Antwort" düzeltildi).
    [A1_L_EX3]: ["Bitten Sie um eine Antwort.", "Örnek 3"],
    // Örnek 3'ün son maddesi + Örnek 4 (etiket + görev; "weil" öncesi virgül, "Aber Sie können" söz dizimi).
    [A1_L_EX4]: [
      "Fragen Sie: am Freitag zusammen essen?",
      "Örnek 4",
      "Sie müssen zum Zahnarzt gehen, weil Sie Zahnschmerzen haben. Aber Sie können heute nicht zum Arzt, Sie haben einen wichtigen Termin. Rufen Sie den Arzt an:",
    ],
    // Örnek 4'ün son maddesi + Örnek 5 ("Morgen" → "morgen", "karank" → "krank", "E-mail" → "E-Mail", virgül).
    [A1_L_EX5]: [
      "Einen Termin für morgen machen",
      "Örnek 5",
      "Ihr Sohn Hans kann heute nicht in die Schule gehen, weil er krank ist. Schreiben Sie eine E-Mail an die Schuldirektorin Frau Gruber:",
    ],
  },
  ignored: [],
};

/* ---------------------------------------------------------------
 * 8 · Proficiency Örnek Sınav Soruları
 * ------------------------------------------------------------- */

/**
 * Güncel sınav adları ve resmi örnek sayfaları — üniversitelerin kendi siteleri, 2026-09-26 (curl ile açıldı):
 * BAU https://bau.edu.tr/icerik/4188-hazirlik-okulu-ornek-sinavlar · Bilgi https://www.bilgi.edu.tr/tr/bilgiyehosgeldiniz/ingilizce-dil-sinavi/
 * Boğaziçi https://yadyok.bogazici.edu.tr/en/pages/buept-sample/2449 · Doğuş https://ydb.dogus.edu.tr/…/sinav-ornekleri/duiyes
 * Işık https://www.isikun.edu.tr/akademik/sfl/exam-samples · İTÜ https://ydy.itu.edu.tr/sinav-ornegi-ve-analizi
 * Kadir Has (KHAS-LPPE, örnek bulunamadı) · Kocaeli https://yabancidiller.kocaeli.edu.tr/sayfalar/ingilizce-yeterlik-sinav-ornekleri-519
 * Koç (KUEPE, ELC resmi olarak örnek vermiyor) https://www.ku.edu.tr/en/academics/english-language-center/
 * Marmara (MÜYYES) https://ydil.marmara.edu.tr/ogrenci/sikca-sorulan-sorular/yeterlilik-sinav-ornekleri
 * ODTÜ (METU EPE; resmi örnek linki kırık) · Özyeğin https://www.ozyegin.edu.tr/en/preparatory-english-program/trace/practice-trace-example
 * Sabancı https://sl.sabanciuniv.edu/en/more-elae-practice-sets · Yeditepe https://yabancidiller.yeditepe.edu.tr/…/files/exam.pdf
 * YTÜ https://ybd.yildiz.edu.tr/ogrenci/sinav-ornekleri
 */
/** Üniversite Proficiency hero'su da sınavın güncel adını buradan okur (UI turu 2026-09-28). */
export const PROF_UNIVERSITIES: FileUniversity[] = [
  { key: "bau", name: "Bahçeşehir Üniversitesi", slug: "bahcesehir-universitesi", exam: "BAU İngilizce Yeterlik Sınavı", official: "https://bau.edu.tr/icerik/4188-hazirlik-okulu-ornek-sinavlar" },
  { key: "bilgi", name: "Bilgi Üniversitesi", slug: "bilgi-universitesi", exam: "BİLET", official: "https://www.bilgi.edu.tr/tr/bilgiyehosgeldiniz/ingilizce-dil-sinavi/" },
  { key: "boun", name: "Boğaziçi Üniversitesi", slug: "bogazici-universitesi", exam: "BUEPT (BÜYES)", official: "https://yadyok.bogazici.edu.tr/en/pages/buept-sample/2449" },
  { key: "dogus", name: "Doğuş Üniversitesi", slug: "dogus-universitesi", exam: "DÜİYES", official: "https://ydb.dogus.edu.tr/yabanci-diller/ingilizce-hazirlik-programi/ogrenciler-icin-bilgiler/sinav-ornekleri/duiyes" },
  { key: "isik", name: "Işık Üniversitesi", slug: "isik-universitesi", exam: "Işık English Proficiency Exam", official: "https://www.isikun.edu.tr/akademik/sfl/exam-samples" },
  { key: "itu", name: "İstanbul Teknik Üniversitesi", slug: "istanbul-teknik-universitesi", exam: "İTÜ İngilizce Yeterlik Sınavı", official: "https://ydy.itu.edu.tr/sinav-ornegi-ve-analizi" },
  // 2026-09-28: resmi örnekler artık KHAS YDY sayfasında (dateModified 2026-09-16).
  { key: "khas", name: "Kadir Has Üniversitesi", slug: "kadirhas-universitesi-hazirlik", exam: "KHAS-LPPE", official: "https://www.khas.edu.tr/ydy-khas-ingilizce-seviye-tespit-ve-yeterlilik-sinavi/" },
  { key: "kocaeli", name: "Kocaeli Üniversitesi", slug: "kocaeli-universitesi-hazirlik", exam: "İngilizce Yeterlik Sınavı (İYS)", official: "https://yabancidiller.kocaeli.edu.tr/sayfalar/ingilizce-yeterlik-sinav-ornekleri-519" },
  { key: "koc", name: "Koç Üniversitesi", slug: "koc-universitesi", exam: "KUEPE", official: null, note: "Koç Üniversitesi KUEPE için resmi örnek sınav yayımlamıyor." },
  { key: "marmara", name: "Marmara Üniversitesi", slug: "marmara-universitesi", exam: "MÜYYES", official: "https://ydil.marmara.edu.tr/ogrenci/sikca-sorulan-sorular/yeterlilik-sinav-ornekleri" },
  // 2026-09-28: epe.metu.edu.tr belge listesinde kitapçık ve örnek sınav dosyaları var.
  { key: "odtu", name: "Orta Doğu Teknik Üniversitesi", slug: "ortadogu-teknik-universitesi", exam: "METU EPE (İYS)", official: "https://epe.metu.edu.tr" },
  { key: "ozu", name: "Özyeğin Üniversitesi", slug: "ozyegin-universitesi", exam: "TRACE", official: "https://www.ozyegin.edu.tr/en/preparatory-english-program/trace/practice-trace-example" },
  { key: "sabanci", name: "Sabancı Üniversitesi", slug: "sabanci-universitesi", exam: "ELAE", official: "https://sl.sabanciuniv.edu/en/more-elae-practice-sets" },
  { key: "yeditepe", name: "Yeditepe Üniversitesi", slug: "yeditepe-universitesi", exam: "Yeditepe İngilizce Yeterlik Sınavı", official: "https://yabancidiller.yeditepe.edu.tr/sites/yabancidiller.yeditepe.edu.tr/files/exam.pdf" },
  { key: "ytu", name: "Yıldız Teknik Üniversitesi", slug: "yildiz-teknik-universitesi", exam: "İYS (EPE)", official: "https://ybd.yildiz.edu.tr/ogrenci/sinav-ornekleri" },
];

const INDIR = "/ddm/indir";
const IMG = "/images";
const INDIR_ITU = `${INDIR}/istanbul_teknik_universitesi_itu_proficiency_muafiyet_ingilizce_hazirlik_sinifi_sinif_atlama_sinavi_exam_ornek_ornegi`;

const PROF_H1 = "Proficiency Örnek Sınav Soruları";

const PROFICIENCY_ORNEK: SinglePageDef = {
  path: `${SH}/proficiency-kursu/proficiency-ornek-sinav-sorulari`,
  label: "Örnek Sınav Soruları",
  meta: { reasons: [] },
  hero: {
    lead: {
      added:
        "İstanbul'daki üniversitelerin İngilizce yeterlik (proficiency) sınavlarına ait örnekler: DDM arşivindeki sınav dosyaları ve üniversitelerin güncel resmi örnek sayfaları.",
    },
    board: { kind: "files", title: "Örnek sınav arşivi", sub: "Üniversiteye göre dosyalar" },
  },
  sections: [
    {
      id: "dosyalar",
      title: { added: "Hangi üniversitenin örnek sınavı var?" },
      answer: { added: "Aşağıda her üniversitenin arşiv dosyaları, sınavın güncel adı ve varsa resmi örnek sayfası yer alıyor." },
      blocks: [
        {
          kind: "files",
          src: { heading: PROF_H1, take: "all" },
          files: {
            "Bahçeşehir Üniversitesi Proficiency Test": { uni: "bau", href: `${IMG}/Bahçeşehir_Üniversitesi_Proficiency_Test.pdf` },
            "Bilgi Üniversitesi Bilet 2. Aşama Test": { uni: "bilgi", href: `${IMG}/Bilet_2._Aşama_Listening.pdf` },
            // Eski dış link (yadyok.boun.edu.tr/buept) ölü → Boğaziçi'nin güncel resmi örnek sayfası.
            "Boğaziçi Üniversitesi Proficiency BUEPT Test 1": { uni: "boun", href: "https://yadyok.bogazici.edu.tr/en/pages/buept-sample/2449" },
            "Boğaziçi Üniversitesi Proficiency BUEPT Test 2": {
              uni: "boun",
              href: `${INDIR}/bogazici_buept_universitesi_proficiency_muafiyet_ingilizce_hazirlik_sinifi_sinif_atlama_sinavi_exam_ornek_ornegi_sorular.pdf`,
            },
            "Doğuş Üniversitesi DUİYES 1": { uni: "dogus", href: `${IMG}/DUIYES_1_Proficiency_Test_DDM.pdf` },
            // Kaynakta iki kez (aynı dosya) — tek gösterilir.
            "Doğuş Üniversitesi DÜİYES 2 Bölüm 1": { uni: "dogus", href: `${IMG}/DUIYES_2_Bölüm_1_Proficiency_Test_DDM.pdf` },
            "Doğuş Üniversitesi DÜİYES 2 Çizelge": { uni: "dogus", href: `${IMG}/DUIYES_2_Çizelge.pdf` },
            "Işık Üniversitesi Proficiency Test": {
              uni: "isik",
              href: `${INDIR}/isik_universitesi_proficiency_muafiyet_ingilizce_hazirlik_sinifi_sinif_atlama_sinavi_exam_ornek_ornegi_sorular.pdf`,
            },
            "İTÜ Proficiency Test 1": { uni: "itu", href: `${INDIR_ITU}1_sorular.doc` },
            "İTÜ Proficiency Test 2": { uni: "itu", href: `${INDIR_ITU}2_sorular.doc` },
            "İTÜ Test Cevapları": { uni: "itu", href: `${INDIR_ITU}_cevaplar.doc` },
            "Kadir Has Proficiency Test": {
              uni: "khas",
              href: `${INDIR}/kadir_has_universitesi_proficiency_muafiyet_ingilizce_hazirlik_sinifi_sinif_atlama_sinavi_exam_ornek_ornegi_sorular.doc`,
            },
            "Kocaeli Üniversitesi Proficiency Test 1": {
              uni: "kocaeli",
              href: `${INDIR}/kocaeli_universitesi_proficiency_muafiyet_ingilizce_hazirlik_sinifi_sinif_atlama_sinavi_exam_ornek_ornegi_sorular.pdf`,
            },
            "Koç Üniversitesi KUEPE Test": { uni: "koc", href: `${IMG}/Koç_Üniversitesi_KUEPE_Test_DDM.pdf` },
            // Kaynakta iki kez (aynı dosya) — tek gösterilir.
            "Marmara Üniversitesi Proficiency Test 1": {
              uni: "marmara",
              href: `${INDIR}/marmara_universitesi_proficiency_muafiyet_ingilizce_hazirlik_sinifi_sinif_atlama_sinavi_exam_2006_ornek_ornegi_sorular.pdf`,
            },
            "ODTU Proficiency Test": {
              uni: "odtu",
              href: `${INDIR}/ortadogu_teknik_universitesi_odtu_proficiency_muafiyet_ingilizce_hazirlik_sinifi_sinif_atlama_sinavi_exam_ornek_ornegi_sorular.pdf`,
            },
            "Özyeğin TRACE Introduction": { dup: "Kaynakta 'Reading' ile aynı dosyaya (sample-trace-part-2_reading.pdf) bağlı." },
            "Özyeğin TRACE Lecture": { uni: "ozu", href: `${IMG}/Sample_TRACE_PART_3_Listening_Section_1_Lecture_questions.pdf` },
            "Özyeğin TRACE Reading": { uni: "ozu", href: `${IMG}/sample-trace-part-2_reading.pdf` },
            "Özyeğin TRACE Note Taking": { uni: "ozu", href: `${IMG}/Sample_TRACE_PART_3_Listening_Section_1_Note_taking_sheet.pdf` },
            "Özyeğin TRACE Conversation": { uni: "ozu", href: `${IMG}/Sample_TRACE_PART_3_Listening_Section_2_conversation_questions.pdf` },
            "Özyeğin TRACE Writing": { uni: "ozu", href: `${IMG}/sample-trace-part-4_writing.pdf` },
            // Eski dış link (sabanciuniv.edu/…/ela.html) 404 → Sabancı'nın güncel ELAE örnek sayfası.
            "Sabancı Üniversitesi ELAE Test": { uni: "sabanci", href: "https://sl.sabanciuniv.edu/en/english-language-assessment-exam-elae" },
            "Yeditepe Üniversitesi Proficiency Test": { uni: "yeditepe", href: `${IMG}/Yeditepe_Proficiency_Test_Örneği_-_DDM.pdf` },
            "Yıldız Teknik Üniversitesi İYS Proficiency Test": { uni: "ytu", href: `${IMG}/Yıldız_Teknik_Proficiency.pdf` },
          },
          universities: PROF_UNIVERSITIES,
        },
      ],
    },
    {
      id: "nasil-calisilir",
      title: { added: "Örnek sınavlarla nasıl çalışmalısınız?" },
      answer: { added: "Gerçek sınav koşullarında, süre tutarak çözün ve formatı üniversitenin güncel resmi sayfasıyla karşılaştırın." },
      blocks: [
        {
          kind: "points",
          items: {
            added: [
              "Her bölümü sınavdaki süreyle, ara vermeden çözün.",
              "Cevap anahtarı olan örneklerde (ör. İTÜ) yanlışlarınızı konu konu not edin.",
              "Arşiv dosyalarının bir kısmı geçmiş yıllara aittir (ör. Marmara 2006); sınav formatı değişmiş olabilir.",
              "Güncel format ve yeni örnekler için üniversitenin resmi örnek sayfasına bakın.",
            ],
          },
        },
      ],
    },
    {
      id: "proficiency",
      title: { added: "Proficiency sınavı nedir?" },
      answer: { added: "Üniversitelerin İngilizce hazırlık sınıfından muafiyet için yaptığı yeterlik sınavıdır; adı ve formatı üniversiteye göre değişir." },
      blocks: [
        {
          kind: "links",
          items: [
            { label: "Proficiency Nedir?", href: `${SH}/proficiency-kursu/proficiency-nedir` },
            { label: "Proficiency Kursu", href: `${SH}/proficiency-kursu` },
            { label: "Proficiency Özel Ders", href: `${SH}/proficiency-kursu/proficiency-ozel-ders` },
          ],
        },
      ],
    },
  ],
  branches: null,
  related: [],
  cta: { title: "Proficiency hazırlığınızı birlikte planlayalım", sub: "Hedef üniversitenizi ve sınav tarihinizi size en yakın şubemizle konuşun." },
  sources: ["Üniversitelerin yabancı diller yüksekokulu / hazırlık okulu resmi sayfaları (26 Eylül 2026)"],
  updated: UPDATED,
  edits: {
    // Dosya etiketlerinde yazım: "Bilet" → "BİLET", "DUİYES" → "DÜİYES", "ODTU" → "ODTÜ".
    "Bilgi Üniversitesi Bilet 2. Aşama Test": "Bilgi Üniversitesi BİLET 2. Aşama Test",
    "Doğuş Üniversitesi DUİYES 1": "Doğuş Üniversitesi DÜİYES 1",
    "ODTU Proficiency Test": "ODTÜ Proficiency Test",
  },
  ignored: [],
};

export const SINGLE_PAGES: SinglePageDef[] = [
  HIZLANDIRILMIS,
  KONUSMA,
  ALMANCA_SEVIYELER,
  TURKCE_SEVIYELER,
  INGILIZCE_SISTEM,
  CINCE_ZOR_MU,
  A1_ORNEK,
  PROFICIENCY_ORNEK,
];
