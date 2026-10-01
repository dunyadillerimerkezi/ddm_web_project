/**
 * P5 — İngilizce seviye kursları (`/ingilizce-kurslari/*`, CEFR A1 → C1).
 *
 * İki tür bilgi AYRI durur (CLAUDE.md §5, P4 kuralı):
 * - **Firma metni** (DDM'in cümleleri: giriş paragrafı, "Çalışma Teknikleri", "Nedir?", öğretmen
 *   cümlesi, şube satırları) `site_content.json`'dan gelir; yalnız yazım / makine çevirisi / bayat
 *   şube adı `edits` ile düzeltilir. Çözücü: `lib/englishLevelContent.ts` (`createGuideResolver`).
 * - **Genel bilgi** (CEFR tanımları, IELTS / Cambridge karşılıkları, ders saatleri) aşağıdaki
 *   `CEFR_EN` tablosunda; her olgu resmi kaynaktan doğrulandı (2026-09-27), kaynak yorumda.
 *   Emin olunmayan rakam yazılmadı (A1 ders saati, A1/A2 IELTS karşılığı).
 *
 * Tasarım: kullanıcı, 2026-09-27 — "B · seviye kartı" (açık hero + sağda seviye kartı, gövdede
 * solda yapışkan seviye merdiveni).
 */

import type { GuideText } from "@/data/examGuides";
import type { IconName } from "@/components/graphics/icons";
import type { Faq } from "@/lib/types";

export const IK = "/ingilizce-kurslari";
const YD = "/yabanci-dil-egitimleri";

export type EnLevelCode = "A1" | "A2" | "B1" | "B2" | "C1";
export type SkillKey = "dinleme" | "okuma" | "konusma" | "yazma";

/* ---------------------------------------------------------------
 * Genel bilgi — CEFR (doğrulama: 2026-09-27)
 *
 * - Seviye grupları ve İngilizce adlar: Avrupa Konseyi, "Level descriptions"
 *   https://www.coe.int/en/web/common-european-framework-reference-languages/level-descriptions
 *   ve MEB Türkçe çevirisi (D-AOBM Tamamlayıcı Cilt, s.40, Ek 1)
 *   https://ttkb.meb.gov.tr/meb_iys_dosyalar/2022_01/04144518_cefr_tr.pdf
 * - Beceri cümleleri: CEFR öz değerlendirme tablosu (Table 2, self-assessment grid) — Türkçe özet
 *   https://www.coe.int/en/web/common-european-framework-reference-languages/table-2-cefr-3.3-common-reference-levels-self-assessment-grid
 * - IELTS: https://ielts.org/organisations/ielts-for-organisations/compare-ielts/ielts-and-the-cefr
 *   (B1 4–5, B2 5.5–6.5, C1 7–8; A1 / A2 için resmi eşleme YOK)
 * - Cambridge sınav adları: https://www.cambridgeenglish.org/in/exams-and-tests/qualifications/new-exam-names/
 * - Rehberli ders saatleri (kümülatif, "yalnız rehber"; A1 doğrulanamadı → yazılmadı):
 *   https://support.cambridgeenglish.org/hc/en-gb/articles/202838506-Guided-learning-hours
 * ------------------------------------------------------------- */

export type CefrInfo = {
  /** Resmi İngilizce ad (Avrupa Konseyi). */
  name: string;
  group: "Temel kullanıcı" | "Bağımsız kullanıcı" | "Yetkin kullanıcı";
  /** Küresel ölçeğin tek cümlelik özü. */
  summary: string;
  skills: Record<SkillKey, string>;
  ielts: string | null;
  cambridge: string | null;
  /** Başlangıçtan toplam rehberli ders saati (Cambridge). */
  hours: string | null;
};

export const CEFR_EN: Record<EnLevelCode, CefrInfo> = {
  A1: {
    name: "Breakthrough",
    group: "Temel kullanıcı",
    summary: "Tanıdık günlük ifadeleri anlar, kendinizi tanıtır ve basit sorular sorup yanıtlarsınız.",
    skills: {
      dinleme: "Karşınızdaki yavaş ve açık konuştuğunda kendiniz, aileniz ve yakın çevrenizle ilgili tanıdık kelimeleri tanırsınız.",
      okuma: "Duyuru, afiş ve kataloglardaki tanıdık adları, kelimeleri ve çok basit cümleleri anlarsınız.",
      konusma: "Karşınızdaki yardımcı olursa basit sorular sorup yanıtlar; yaşadığınız yeri ve tanıdığınız insanları anlatırsınız.",
      yazma: "Kısa, basit bir kartpostal yazar; bir forma adınızı, uyruğunuzu ve adresinizi yazarsınız.",
    },
    ielts: null,
    cambridge: null,
    hours: null,
  },
  A2: {
    name: "Waystage",
    group: "Temel kullanıcı",
    summary: "Alışveriş, yakın çevre ve iş gibi rutin konularda basit ve doğrudan bilgi alışverişi yaparsınız.",
    skills: {
      dinleme: "Çok tanıdık konulardaki sık kullanılan ifadeleri; kısa, açık mesaj ve anonsların ana fikrini anlarsınız.",
      okuma: "Kısa, basit metinleri okur; ilan, menü, tarife gibi günlük belgelerde aradığınız bilgiyi bulursunuz.",
      konusma: "Rutin konularda kısa sohbetlere katılır; ailenizi, yaşam koşullarınızı ve işinizi basit ifadelerle anlatırsınız.",
      yazma: "Kısa, basit not ve mesajlar; teşekkür gibi çok basit kişisel mektuplar yazarsınız.",
    },
    ielts: null,
    cambridge: "A2 Key",
    hours: "180 – 200",
  },
  B1: {
    name: "Threshold",
    group: "Bağımsız kullanıcı",
    summary: "İş, okul ve seyahatte karşılaşılan tanıdık durumları yardımsız idare edersiniz.",
    skills: {
      dinleme: "İş, okul ve boş zaman gibi tanıdık konularda açık, standart konuşmanın ana noktalarını anlarsınız.",
      okuma: "Günlük ya da işle ilgili metinleri, bir mektupta anlatılan olayları, duyguları ve istekleri anlarsınız.",
      konusma: "Seyahatte karşılaşılan çoğu durumu idare eder; deneyimlerinizi, planlarınızı anlatıp kısaca gerekçelendirirsiniz.",
      yazma: "Tanıdık ya da ilgi alanınızdaki konularda basit, bağlantılı metinler ve kişisel mektuplar yazarsınız.",
    },
    ielts: "4.0 – 5.0",
    cambridge: "B1 Preliminary",
    hours: "350 – 400",
  },
  B2: {
    name: "Vantage",
    group: "Bağımsız kullanıcı",
    summary: "Akıcı ve doğal etkileşim kurar, bir konunun artılarını ve eksilerini açıklayarak görüşünüzü savunursunuz.",
    skills: {
      dinleme: "Uzun konuşmaları ve dersleri izler; haberlerin ve standart dildeki filmlerin çoğunu anlarsınız.",
      okuma: "Yazarın bir görüş savunduğu güncel makale ve raporları, çağdaş edebi düzyazıyı anlarsınız.",
      konusma: "Anadili İngilizce olanlarla akıcı ve doğal etkileşime girer; tartışmada görüşünüzü açıklayıp savunursunuz.",
      yazma: "İlgi alanınızdaki pek çok konuda ayrıntılı metin; lehte ve aleyhte gerekçeler sunan deneme ve raporlar yazarsınız.",
    },
    ielts: "5.5 – 6.5",
    cambridge: "B2 First",
    hours: "500 – 600",
  },
  C1: {
    name: "Effective Operational Proficiency",
    group: "Yetkin kullanıcı",
    summary: "Uzun ve zor metinleri örtük anlamlarıyla anlar, dili sosyal, akademik ve mesleki amaçlarla esnek kullanırsınız.",
    skills: {
      dinleme: "Yapısı açıkça belli olmayan uzun konuşmaları, televizyon programlarını ve filmleri fazla zorlanmadan anlarsınız.",
      okuma: "Uzun ve karmaşık olgusal ve edebi metinleri, üslup farklarını ayırt ederek anlarsınız.",
      konusma: "İfade aramak için belirgin biçimde duraksamadan akıcı konuşur; dili sosyal ve mesleki amaçlarla esnek kullanırsınız.",
      yazma: "Karmaşık konularda açık, iyi yapılandırılmış metinler yazar; üslubu okura göre seçersiniz.",
    },
    ielts: "7.0 – 8.0",
    cambridge: "C1 Advanced",
    hours: "700 – 800",
  },
};

/** Ders saati çubuğunun tam boyu: Cambridge C2 Proficiency üst sınırı (1.000–1.200 saat). */
export const HOURS_SCALE = 1200;
/** C2'ye başlangıçtan toplam rehberli ders saati (Cambridge C2 Proficiency) — yalnız C1 SSS'sinde. */
export const C2_HOURS = "1.000 – 1.200";

export const SKILLS: { key: SkillKey; label: string; icon: IconName; photo: { src: string; alt: string; width: number; height: number } }[] = [
  { key: "dinleme", label: "Dinleme", icon: "dinleme", photo: { src: "/assets/online_education6.jpg", alt: "Kulaklıkla İngilizce dinleyen öğrenci", width: 1000, height: 562 } },
  { key: "okuma", label: "Okuma", icon: "okuma", photo: { src: "/assets/private_lesson.jpg", alt: "Kitap okuyan iki öğrenci", width: 640, height: 480 } },
  { key: "konusma", label: "Konuşma", icon: "konusma", photo: { src: "/assets/home_page_images/ingilizce-konusma.jpg", alt: "Grup hâlinde İngilizce konuşan yetişkinler", width: 5184, height: 3888 } },
  { key: "yazma", label: "Yazma", icon: "yazma", photo: { src: "/assets/home_page_images/exam_preparation.jpg", alt: "Not alarak çalışan öğrenci", width: 736, height: 1104 } },
];

/** Genel bilginin sayfadaki kaynak listesi (düz metin). */
export const LEVEL_SOURCES = [
  "Avrupa Konseyi — CEFR küresel ölçek ve öz değerlendirme tablosu (MEB Türkçe çevirisi, D-AOBM Tamamlayıcı Cilt)",
  "IELTS — IELTS and the CEFR (ielts.org)",
  "Cambridge English — Guided learning hours ve sınav adları (cambridgeenglish.org)",
];

export const LEVEL_UPDATED = "2026-09-27";

/** Kaynakta karşılığı olmayan arayüz / bölüm metinleri (JSX'e gövde metni yazılmaz — CLAUDE.md §5). */
export const LEVEL_COPY = {
  canDoTitle: (code: EnLevelCode) => `${code} seviyesinde neler yapabilirsiniz?`,
  ladderTitle: "İngilizce seviyeleri",
  /** DDM İngilizce Kursu sayfası: "Advanced (C1 – C2)" — C2 ayrı kur değil (kullanıcı kararı, 2026-09-27: C2 sayfası açılmaz). */
  c2: "Advanced kapsamında",
  compareCaption: "Komşu seviyelerle karşılaştırma",
  compareRows: { group: "CEFR grubu", summary: "Genel olarak", ielts: "IELTS karşılığı", cambridge: "Cambridge sınavı", hours: "Toplam ders saati*" },
  noIelts: "Resmi karşılık yok",
  compareNote: "*Cambridge English'in başlangıçtan itibaren toplam rehberli ders saati; yalnız yol göstericidir.",
  faqTitle: "Sık sorulanlar",
  moreLabel: "Ayrıntılı bilgi",
  levelsGroup: "Seviyeler",
  programsGroup: "Hedefinize göre programlar",
  cta: {
    title: "Hangi kurdan başlayacağınızı birlikte belirleyelim",
    sub: "Seviye tespit sınavı ve kur tarihleri için size en yakın şubemizle konuşun.",
  },
  /** Şablon cümlesi olmayan sayfada (A2) şube bandının kısa cevabı. */
  branchesAnswer: "Size en yakın şubenin İngilizce kurs tarihlerini inceleyin; sorularınız için şubemize yazabilirsiniz.",
  /** Firma panelinin fotoğrafı — DDM sınıfı (gerçek). */
  panelPhoto: { src: "/assets/foto-7.jpg", alt: "Dünya Dilleri Merkezi'nde bir İngilizce sınıfı", width: 1080, height: 810 },
};

/* ---------------------------------------------------------------
 * Firma bilgisi — DDM'in İngilizce Kursu sayfasından (hero kartı + SSS)
 *
 * Seviye sayfalarında olmayan ama DDM'in kendi İngilizce Kursu sayfasında yazan olgular
 * ("1 kur 10 Hafta 2,5 ay olup 60 saat", "başarı notunun en az 60", "Advanced (C1 – C2)",
 * "ücretsiz seviye tespit sınavı"). Çözücü rakamları o kaydın metninde arar (uydurma yok).
 * ------------------------------------------------------------- */

export const COURSE_RECORD = `${YD}/ingilizce-kursu`;

/* ---------------------------------------------------------------
 * Şablon satırları — 9 sayfada birebir tekrarlanan eski site şablonu
 * ------------------------------------------------------------- */

export const TEMPLATE = {
  plan: "İngilizce Kursu Eğitim Plan Tablosu ve Dünya Dilleri Merkezi Şubeleri Kurs Tarihleri",
  programs: "İngilizce Eğitim Programları ve İngilizce Eğitim Seviyeleri",
  cta: "Dünya Dilleri Merkezi Şubelerinin detaylı kurs tarihlerini inceleyin ve size uygun olan şubenin Ön Bilgi Formundan ve şubelerin iletişim bölümünden Şubelerimizden birine yazın sorularınızı cevaplayalım.",
  system: "Dünya Dilleri Merkezi İngilizce Eğitim Sistemi",
};

/** Şablondaki şube satırları (sıra kaynaktaki gibi) → şube + İngilizce kurs tarihi sayfası. */
export const TEMPLATE_BRANCHES = [
  { line: "Kadıköy Şubesi İngilizce Eğitim Plan Tablosu ve Kurs Tarihi", branch: "kadikoy" },
  { line: "Bağdat Caddesi Şubesi İngilizce Eğitim Plan Tablosu ve Kurs Tarihi", branch: "bagdat" },
  { line: "Beşiktaş Şubesi İngilizce Eğitim Plan Tablosu ve Kurs Tarihi", branch: "etiler" },
  { line: "Ataşehir Şubesi İngilizce Eğitim Plan Tablosu ve Kurs Tarihi", branch: "atasehir" },
] as const;

/** Program listesi satırı → hedef (kaynak sırası: seviyeler C1 → A1, sonra programlar). Konuşma kursu: kullanıcı kararı (2026-09-27) → Dil Kursu sayfası (IK adresi 301). */
export const TEMPLATE_PROGRAMS: { line: string; href: string; group: "level" | "program" }[] = [
  { line: "Advanced İngilizce C1 Kursu | İleri Seviye C1 İngilizce", href: `${IK}/advanced-ingilizce-kursu`, group: "level" },
  { line: "Upper-Intermediate İngilizce Kursu | İleri Seviye İngilizce", href: `${IK}/upper-intermediate-ingilizce-kursu`, group: "level" },
  { line: "Intermediate İngilizce Kursu | Orta Seviye İngilizce", href: `${IK}/intermediate-ingilizce-kursu`, group: "level" },
  { line: "Pre-Intermediate İngilizce Kursu | Orta Alt Seviye İngilizce Eğitimi", href: `${IK}/pre-intermediate-ingilizce-kursu`, group: "level" },
  { line: "Elementary İngilizce Kursu | Beginner Yeni Başlayanlar İçin İngilizce Kursu", href: `${IK}/elementary-ingilizce-kursu`, group: "level" },
  { line: "Üniversite Hazırlık İngilizcesi", href: `${IK}/universite-ingilizce-kursu`, group: "program" },
  { line: "YKS Dil İngilizce", href: `${IK}/yks-dil-ingilizce`, group: "program" },
  { line: "İlköğretim İngilizcesi", href: `${IK}/ilkogretim-ingilizce-kursu`, group: "program" },
  { line: "Yaz Okulu İngilizce Programları", href: `${IK}/yaz-okulu-ingilizce-kursu`, group: "program" },
  {
    line: "İngilizce Konuşma Kursu | Eğitim Programı İngilizce Konuşma Öğrenme English Speaking",
    href: `${YD}/ingilizce-konusma-kursu`,
    group: "program",
  },
];

export const SYSTEM_HREF = `${YD}/ingilizce-kursu/ingilizce-egitim-sistemi`;

/** Şablon satırlarının 9 sayfada ortak düzeltmeleri (her sayfanın `edits`ine eklenir). */
export const TEMPLATE_EDITS: Record<string, string> = {
  // Bayat şube adı → data/branches.ts.
  "Beşiktaş Şubesi İngilizce Eğitim Plan Tablosu ve Kurs Tarihi": "Etiler Şubesi İngilizce Eğitim Plan Tablosu ve Kurs Tarihi",
  // Kullanıcı kararı (2026-09-27): B2 "Orta İleri Seviye" (gövde ve CEFR ile uyumlu; "İleri Seviye" C1'in adı).
  "Upper-Intermediate İngilizce Kursu | İleri Seviye İngilizce": "Upper-Intermediate İngilizce Kursu | Orta İleri Seviye İngilizce",
};

/* ---------------------------------------------------------------
 * Seviye sayfaları
 * ------------------------------------------------------------- */

/**
 * Kart bilgisi. "page" → rakamlar bu sayfanın kaynak metninde geçmeli · "course" → DDM İngilizce Kursu
 * kaydında geçmeli · "cefr" → değer `CEFR_EN[kod][field]`i içermeli (genel bilgi, kaynak yukarıda).
 */
export type HeroFact =
  | { label: string; value: string; basis: "page" | "course" }
  | { label: string; value: string; basis: "cefr"; field: "group" | "ielts" | "cambridge" | "hours" };

export type EnglishLevelDef = {
  slug: string;
  code: EnLevelCode;
  /** Merdiven / kart etiketi (arayüz). */
  name: string;
  /** Kaynak H1'deki Türkçe seviye adı (kartta). */
  trName: string;
  /** Kırıntı etiketi. */
  label: string;
  meta: { title?: string; description?: string; reasons?: string[] };
  hero: {
    /** Kartın üst satırı — giriş paragrafının başlık gibi ilk cümlesi. */
    caption: GuideText;
    lead: GuideText;
    facts: HeroFact[];
  };
  /** "Neler yapabilirsiniz" bölümünün kalın cevabı (genel bilgi). */
  canDoAnswer: string;
  /** Kaynaktaki "Neden B2 / C1 Seviyesi…" bölümü (yalnız B2, C1): satırlar sırayla ikonlu kartlara. */
  why?: { heading: string; answer: string; icons: IconName[] };
  techniques: {
    heading: string;
    answer: string;
    /** Sağdaki "Dünya Dilleri Merkezi'nde B1" paneli — firma cümleleri, ikonlu. */
    highlights: { icon: IconName; text: GuideText }[];
  };
  about: {
    heading: string;
    answer: string;
    /** Kaynak cümleleri sırayla kartlara (başlık arayüz etiketi); kalan cümleler madde listesi. */
    cards: { title: string; icon: IconName }[];
    /** Kartlardan sonra kalan cümlelerin listesinin başlığı (arayüz). */
    pointsTitle?: string;
  };
  /** Firma panelinin fotoğrafı (DDM sınıfı); verilmezse `LEVEL_COPY.panelPhoto`. */
  panelPhoto?: { src: string; alt: string; width: number; height: number };
  faq: Faq[];
  edits?: Record<string, string>;
  headingEdits?: Record<string, string>;
  ignored: { line: string; reason: string }[];
};

/* ---- Ortak SSS (firma olguları DDM İngilizce Kursu sayfasından; çözücü rakamları o metinde arar) ---- */

const FAQ_NEXT_LEVEL: Faq = {
  question: "Bir üst seviyeye nasıl geçerim?",
  icon: "kupa",
  answer: ["Her kurun sonunda kur bitirme sınavı yapılır; bir sonraki kura devam için başarı notunun en az 60 olması gerekir."],
};

const FAQ_START: Faq = {
  question: "Hangi kurdan başlayacağımı nasıl bilirim?",
  icon: "soru",
  answer: ["Ücretsiz seviye tespit sınavıyla. Sınav için size en yakın şubemizle görüşebilirsiniz."],
};

const FAQ_CERTIFICATE: Faq = {
  question: "Kur sonunda sertifika veriliyor mu?",
  icon: "mezuniyet",
  answer: ["Evet. Kur bitirme sınavında başarılı olan öğrencilere ulaştıkları İngilizce seviyesini belirten, Milli Eğitim Bakanlığı onaylı sertifika verilir."],
};

const COURSE_FACT: HeroFact = { label: "Bir kur", value: "10 hafta · 60 saat", basis: "course" };
const CLASS_PHOTO_ALT = "Dünya Dilleri Merkezi'nde bir İngilizce sınıfı";

/* ---- A1 · Elementary ---- */

const A1_H1 = "Elementary İngilizce Kursu | Beginner Yeni Başlayanlar İçin İngilizce";

const ELEMENTARY: EnglishLevelDef = {
  slug: "elementary-ingilizce-kursu",
  code: "A1",
  name: "Elementary",
  trName: "Başlangıç",
  label: "Elementary İngilizce Kursu",
  meta: {},
  hero: {
    caption: { src: { heading: A1_H1, take: [0] }, sentence: 0 },
    lead: { src: { heading: A1_H1, take: [0] }, sentence: 1 },
    facts: [
      { label: "CEFR grubu", value: "Temel kullanıcı", basis: "cefr", field: "group" },
      { label: "Program", value: "Toplam 5 kur", basis: "course" },
      COURSE_FACT,
      { label: "Kur geçme notu", value: "En az 60", basis: "course" },
    ],
  },
  canDoAnswer: "İlk adım: kendinizi tanıtır, günlük ifadeleri anlar ve karşınızdaki yardımcı olduğunda basit sorular sorup yanıtlarsınız.",
  techniques: {
    heading: "İngilizce A1 Seviyesi Çalışma Teknikleri",
    answer: "Kursta temel fiiller, günlük rutin ve kişisel bilgiler gibi ilk ihtiyaçlara odaklanılır.",
    highlights: [
      { icon: "belge", text: { src: { heading: A1_H1, take: [0] }, sentence: 2 } },
      { icon: "sohbet", text: { src: { heading: A1_H1, take: [0] }, sentence: 3 } },
    ],
  },
  about: {
    heading: "Elementary İngilizce Kursu | Beginner Yeni Başlayanlar İçin İngilizce Nedir?",
    answer: "A1, CEFR'in altı seviyesinin ilkidir (Breakthrough): temel kullanıcılığın başlangıcı.",
    cards: [
      { title: "Kalıplar", icon: "dilbilgisi" },
      { title: "Kelime ve anlama", icon: "kelime" },
    ],
  },
  panelPhoto: { src: "/assets/foto-5.jpg", alt: CLASS_PHOTO_ALT, width: 1080, height: 810 },
  faq: [
    {
      question: "Hiç İngilizce bilmiyorum, bu kurs bana uygun mu?",
      icon: "soru",
      answer: ["Evet. A1 kursu yeni başlayanlar ve çok sınırlı İngilizce bilenler içindir."],
    },
    {
      question: "A1'den A2'ye geçmek ne kadar sürer?",
      icon: "sure",
      answer: [
        "Cambridge English'in rehber rakamlarına göre sıfırdan A2'ye toplam yaklaşık 180–200 rehberli ders saatinde ulaşılır. Süre, ders dışı çalışmaya göre kişiden kişiye değişir.",
        "Dünya Dilleri Merkezi'nde bir kur 10 hafta ve 60 saattir.",
      ],
    },
    FAQ_NEXT_LEVEL,
    FAQ_START,
  ],
  edits: {
    // Yazım: "ingilizce" küçük harf.
    "Beginner seviyesinin bir üst seviyesi olan Elementary seviyesinde olan kişiler basit ingilizce kalıplarını bilmektedir.":
      "Beginner seviyesinin bir üst seviyesi olan Elementary seviyesinde olan kişiler basit İngilizce kalıplarını bilmektedir.",
  },
  ignored: [],
};

/* ---- A2 · Pre-Intermediate ---- */

const A2_H1 = "Pre-Intermediate İngilizce Kursu | Başlangıç Üzeri İngilizce Eğitimi";
const A2_INTRO =
  "Dünya Dilleri Merkezi’nde Pre- Intermediate İngilizce kursu A2 seviyesi İngilizce Eğitimi. A2 seviyesi, İngilizce'deki en önemli gramer alanları üzerine çalışma ve kelime bilginizi yaklaşık 1.000 kelimeye kadar yükseltebileceğiniz bir düzeydir. Bunun yanı sıra IELTS puanınızı 4.0'e yükselterek belirli bir skor elde etmeye çalışabilirsiniz.";

const PRE_INTERMEDIATE: EnglishLevelDef = {
  slug: "pre-intermediate-ingilizce-kursu",
  code: "A2",
  name: "Pre-Intermediate",
  trName: "Başlangıç üzeri",
  label: "Pre-Intermediate İngilizce Kursu",
  meta: {},
  hero: {
    caption: { src: { heading: A2_H1, take: [0] }, sentence: 0 },
    lead: { src: { heading: A2_H1, take: [0] }, sentence: 1 },
    facts: [
      { label: "Kelime hazinesi", value: "yaklaşık 1.000", basis: "page" },
      { label: "Cambridge sınavı", value: "A2 Key", basis: "cefr", field: "cambridge" },
      { label: "Toplam ders saati", value: "yaklaşık 180 – 200", basis: "cefr", field: "hours" },
      COURSE_FACT,
    ],
  },
  canDoAnswer: "Rutin konularda basit bilgi alışverişi yapar; kendinizi, ailenizi ve işinizi kısa cümlelerle anlatırsınız.",
  techniques: {
    heading: "İngilizce A2 Seviyesi Çalışma Teknikleri",
    answer: "Kursta ana fiil zamanları ve günlük konularda kendinizi anlatmaya odaklanılır.",
    highlights: [{ icon: "puan", text: { src: { heading: A2_H1, take: [0] }, sentence: 2 } }],
  },
  about: {
    heading: "Pre-Intermediate İngilizce Kursu | Orta Alt Seviye İngilizce Nedir?",
    answer: "A2, CEFR'in ikinci seviyesidir (Waystage): temel kullanıcılığın üst basamağı.",
    cards: [
      { title: "Kelime ve kalıplar", icon: "kelime" },
      { title: "Anlama ve yanıt", icon: "konusma" },
    ],
  },
  panelPhoto: { src: "/assets/foto-8.jpg", alt: CLASS_PHOTO_ALT, width: 898, height: 810 },
  faq: [
    {
      question: "A2'den B1'e geçmek ne kadar sürer?",
      icon: "sure",
      answer: [
        "Cambridge English'in rehber rakamlarına göre A2'ye başlangıçtan toplam yaklaşık 180–200, B1'e 350–400 rehberli ders saatinde ulaşılır; iki seviye arası yaklaşık 200 saattir. Süre, ders dışı çalışmaya göre kişiden kişiye değişir.",
        "Dünya Dilleri Merkezi'nde bir kur 10 hafta ve 60 saattir.",
      ],
    },
    {
      question: "A2 seviyesi hangi sınavla belgelenir?",
      icon: "belge",
      answer: ["Cambridge A2 Key doğrudan A2'yi ölçer. IELTS'in A2 için resmi bir karşılığı yoktur; IELTS'in resmi CEFR eşlemesi B1'den (4.0) başlar."],
    },
    FAQ_NEXT_LEVEL,
    FAQ_START,
  ],
  edits: {
    // Yazım: "Pre- Intermediate" (boşluk).
    [A2_INTRO]: A2_INTRO.replace("Pre- Intermediate", "Pre-Intermediate"),
    // İki madde tek satıra yapışmış (boşluk yok).
    "Alışveriş ve yerel coğrafya gibi konuları tanımlayın.İş ve iş tecrübenizi iletin.":
      "Alışveriş ve yerel coğrafya gibi konuları tanımlayın. İş ve iş tecrübenizi iletin.",
    // Yazım: "ingilizce", yapışık cümle, "bir çok".
    "Pre-Intermediate Seviyesi: Bu grupta bulunan kişiler daha fazla kelime bilgisi ve daha fazla ingilizce kalıbına hakimdir.Karşısında tane tane konuşan kişiler olması durumunda konuşulan bir çok konuyu rahatlıkla anlayabilir ve zorlanmalarına rağmen yanıt verebilirler.":
      "Pre-Intermediate Seviyesi: Bu grupta bulunan kişiler daha fazla kelime bilgisi ve daha fazla İngilizce kalıbına hakimdir. Karşısında tane tane konuşan kişiler olması durumunda konuşulan birçok konuyu rahatlıkla anlayabilir ve zorlanmalarına rağmen yanıt verebilirler.",
  },
  ignored: [],
};

/* ---- B1 · Intermediate (pilot) ---- */

const B1_H1 = "Intermediate İngilizce Kursu | Orta Seviye İngilizce B1";
const B1_INTRO =
  "İntermediate İngilizce B1 Seviyesi İngilizce Eğitimi. Okul veya Üniversite için İngilizce öğreniyorsanız, iş için İngilizce öğreniyorsanız, seyahat için veya sadece İngilizce öğrenmek istediğiniz için B1 seviyesi ideal bir seviyedir. B1 seviyesine ulaşarak kelime bilginizi yaklaşık 2.000 kelimeye kadar yükselterek İngilizce konuşma becerilerinizi belirli kalıplarda geliştirebilirsiniz. Bunun yanı sıra bu eğitim IELTS puanınızı 5.0'e yükseltmek için tasarlanmıştır.";

const INTERMEDIATE: EnglishLevelDef = {
  slug: "intermediate-ingilizce-kursu",
  code: "B1",
  name: "Intermediate",
  trName: "Orta seviye",
  label: "Intermediate İngilizce Kursu",
  meta: {},
  hero: {
    caption: { src: { heading: B1_H1, take: [0] }, sentence: 0 },
    lead: { src: { heading: B1_H1, take: [0] }, sentence: 1 },
    facts: [
      { label: "Kelime hazinesi", value: "yaklaşık 2.000", basis: "page" },
      { label: "IELTS karşılığı", value: "4.0 – 5.0", basis: "cefr", field: "ielts" },
      { label: "Cambridge sınavı", value: "B1 Preliminary", basis: "cefr", field: "cambridge" },
      { label: "Bir kur", value: "10 hafta · 60 saat", basis: "course" },
    ],
  },
  canDoAnswer: "Tanıdık durumları yardımsız idare edersiniz: iş, okul ve seyahatte konuşur, anlar, kısa metinler yazarsınız.",
  techniques: {
    heading: "İngilizce B1 Seviyesi Çalışma Teknikleri",
    answer: "Kursta dilbilgisini sağlamlaştırıp deneyim, plan ve görüşleri anlatmaya odaklanılır.",
    highlights: [
      { icon: "kelime", text: { src: { heading: B1_H1, take: [0] }, sentence: 2 } },
      { icon: "puan", text: { src: { heading: B1_H1, take: [0] }, sentence: 3 } },
      { icon: "sohbet", text: { src: { heading: B1_H1, take: [1] } } },
    ],
  },
  about: {
    heading: "Intermediate İngilizce | Orta Seviye İngilizce Nedir?",
    answer: "B1, CEFR'in altı seviyesinin üçüncüsü ve bağımsız kullanıcılığın ilk basamağıdır (Threshold, “eşik”).",
    cards: [
      { title: "Seviye grubu", icon: "grup" },
      { title: "Anlama", icon: "dinleme" },
      { title: "Konuşma", icon: "konusma" },
    ],
  },
  faq: [
    {
      question: "B1'den B2'ye geçmek ne kadar sürer?",
      icon: "sure",
      answer: [
        "Cambridge English'in rehber rakamlarına göre B1'e başlangıçtan toplam yaklaşık 350–400, B2'ye 500–600 rehberli ders saatinde ulaşılır; iki seviye arası yaklaşık 200 saattir. Süre, ders dışı çalışmaya göre kişiden kişiye değişir.",
        "Dünya Dilleri Merkezi'nde bir kur 10 hafta ve 60 saattir.",
      ],
    },
    {
      question: "B1 seviyesi hangi sınavlarla belgelenir?",
      icon: "belge",
      answer: ["Cambridge B1 Preliminary doğrudan B1'i ölçer. IELTS'te 4.0–5.0 bantları B1'e karşılık gelir."],
    },
    FAQ_NEXT_LEVEL,
    FAQ_START,
  ],
  edits: {
    // Yazım: "İntermediate" (Türkçe büyük İ).
    [B1_INTRO]: B1_INTRO.replace("İntermediate", "Intermediate"),
    // Makine çevirisi: "Şimdiki mükemmel basit ve koşullu" = present perfect simple + conditionals (kullanıcı onayı, 2026-09-27).
    "Şimdiki mükemmel basit ve koşullu gibi daha sofistike alanlar da dahil olmak üzere İngilizce gramerinin kontrolünü geliştirin.":
      "Present perfect simple ve koşul cümleleri (conditionals) gibi daha sofistike alanlar da dahil olmak üzere İngilizce gramerinin kontrolünü geliştirin.",
    // İki madde tek satıra yapışmış (boşluk yok); "veriniz" → listenin emir kipi, ikinci maddeye fiil.
    "Görüş ve planlar için sebep ve açıklamalar veriniz.Kişisel ilgi alanlarına bağlı metin oluşturma alıştırması.":
      "Görüş ve planlar için sebep ve açıklamalar verin. Kişisel ilgi alanlarına bağlı metin oluşturma alıştırması yapın.",
    // Yazım: "ingilizce" küçük harf.
    "Daha fazla kelimeye ve daha fazla ingilizce kalıbına hakim olduklarında anlama konusunda pre-intermediate seviyesindeki kişiler gibi rahattırlar.":
      "Daha fazla kelimeye ve daha fazla İngilizce kalıbına hakim olduklarında anlama konusunda pre-intermediate seviyesindeki kişiler gibi rahattırlar.",
  },
  ignored: [],
};

/* ---- B2 · Upper-Intermediate ---- */

const B2_H1 = "Upper-Intermediate İngilizce Kursu | İleri Seviye B2";

const UPPER_INTERMEDIATE: EnglishLevelDef = {
  slug: "upper-intermediate-ingilizce-kursu",
  code: "B2",
  name: "Upper-Intermediate",
  trName: "Orta ileri seviye",
  label: "Upper-Intermediate İngilizce Kursu",
  meta: {},
  hero: {
    caption: { src: { heading: B2_H1, take: [0] }, sentence: 0 },
    lead: { src: { heading: B2_H1, take: [0] }, sentence: 1 },
    facts: [
      { label: "Kelime hazinesi", value: "yaklaşık 3.000", basis: "page" },
      { label: "IELTS karşılığı", value: "5.5 – 6.5", basis: "cefr", field: "ielts" },
      { label: "Cambridge sınavı", value: "B2 First", basis: "cefr", field: "cambridge" },
      COURSE_FACT,
    ],
  },
  canDoAnswer: "Akıcı ve doğal konuşur, bir konunun artılarını ve eksilerini tartışır; İngilizce konuşulan bir ülkede okuyup çalışabilirsiniz.",
  why: {
    heading: "Neden B2 Seviyesi İngilizce Eğitimi",
    answer: "B2 kursu akıcılığı, kelime hazinesini ve sınav hedeflerini bir üst basamağa taşır.",
    icons: ["kelime", "puan", "kupa"],
  },
  techniques: {
    heading: "İngilizce B2 Seviyesi Çalışma Teknikleri Nasıl?",
    answer: "Kursta doğruluk, karmaşık dilbilgisi yapıları ve güncel konularda görüş bildirmeye odaklanılır.",
    highlights: [
      { icon: "sohbet", text: { src: { heading: B2_H1, take: [0] }, sentence: 2 } },
      { icon: "konusma", text: { src: { heading: B2_H1, take: [0] }, sentence: 3 } },
      { icon: "dinleme", text: { src: { heading: B2_H1, take: [1] } } },
    ],
  },
  about: {
    heading: "Upper-İntermediate | Orta İleri Seviye İngilizce nedir?",
    answer: "B2, CEFR'in dördüncü seviyesidir (Vantage): bağımsız kullanıcılığın üst basamağı.",
    cards: [
      { title: "Kimler için", icon: "grup" },
      { title: "Kur sonunda", icon: "konusma" },
    ],
    pointsTitle: "Bu seviyede neler yapılır?",
  },
  panelPhoto: { src: "/assets/foto-4.jpg", alt: CLASS_PHOTO_ALT, width: 960, height: 960 },
  faq: [
    {
      question: "B2'den C1'e geçmek ne kadar sürer?",
      icon: "sure",
      answer: [
        "Cambridge English'in rehber rakamlarına göre B2'ye başlangıçtan toplam yaklaşık 500–600, C1'e 700–800 rehberli ders saatinde ulaşılır; iki seviye arası yaklaşık 200 saattir. Süre, ders dışı çalışmaya göre kişiden kişiye değişir.",
        "Dünya Dilleri Merkezi'nde bir kur 10 hafta ve 60 saattir.",
      ],
    },
    {
      question: "B2 seviyesi hangi sınavlarla belgelenir?",
      icon: "belge",
      answer: ["Cambridge B2 First doğrudan B2'yi ölçer. IELTS'te 5.5–6.5 bantları B2'ye karşılık gelir."],
    },
    FAQ_NEXT_LEVEL,
    FAQ_START,
  ],
  headingEdits: {
    // Kullanıcı kararı (2026-09-27): B2 "Orta İleri Seviye" — gövde ve CEFR ile uyumlu; "İleri Seviye" C1'in adı.
    "Upper-Intermediate İngilizce Kursu | İleri Seviye B2": "Upper-Intermediate İngilizce Kursu | Orta İleri Seviye B2",
    // Yazım: "İntermediate" (Türkçe büyük İ), "nedir" küçük harf.
    "Upper-İntermediate | Orta İleri Seviye İngilizce nedir?": "Upper-Intermediate | Orta İleri Seviye İngilizce Nedir?",
  },
  edits: {
    // Kullanıcı kararı (2026-09-27): IELTS 7.0 C1'e denk (ielts.org: B2 = 5.5–6.5) → B2 üst sınırı; FCE'nin güncel adı "B2 First".
    "Bunun yanısıra IELTS puanınızı 7.0'ye yükseltmenize veya Cambridge English First (FCE) derslerine hazırlanmanıza yardımcı olacaktır.":
      "Bunun yanı sıra IELTS puanınızı 6.5'e yükseltmenize veya Cambridge B2 First (eski adıyla FCE) sınavına hazırlanmanıza yardımcı olacaktır.",
    // Makine çevirisi: "Pasif zaman ve mod kipi" = passive voice + modal verbs (kullanıcı onayı, 2026-09-27).
    "Pasif zaman ve mod kipi gibi daha karmaşık gramer kullanma kapasitesi oluşturun.":
      "Edilgen yapı (passive voice) ve modal fiiller gibi daha karmaşık gramer yapılarını kullanma kapasitesi oluşturun.",
    // Yazım: ",." satır sonu.
    "Bir filmin bir sahnesinde geçen konuşmayı anlayıp devamını hayal edebilme, bir şarkının neden bahsettiğini anlayabilme,.":
      "Bir filmin bir sahnesinde geçen konuşmayı anlayıp devamını hayal edebilme, bir şarkının neden bahsettiğini anlayabilme.",
  },
  ignored: [],
};

/* ---- C1 · Advanced ---- */

const C1_H1 = "Advanced İngilizce C1 Kursu | İleri Seviye C1";

const ADVANCED: EnglishLevelDef = {
  slug: "advanced-ingilizce-kursu",
  code: "C1",
  name: "Advanced",
  trName: "İleri seviye",
  label: "Advanced İngilizce Kursu",
  meta: {
    title: "Advanced İngilizce C1 Kursu | İleri Seviye C1",
    reasons: ["title: kaynak 67 karakter (≤60) — site adı eki çıkarıldı, metin H1 ile aynı."],
  },
  hero: {
    caption: { src: { heading: C1_H1, take: [0] }, sentence: 0 },
    lead: { src: { heading: C1_H1, take: [0] }, sentence: 1 },
    facts: [
      { label: "Kelime hazinesi", value: "yaklaşık 6.000", basis: "page" },
      { label: "IELTS karşılığı", value: "7.0 – 8.0", basis: "cefr", field: "ielts" },
      { label: "Cambridge sınavı", value: "C1 Advanced", basis: "cefr", field: "cambridge" },
      COURSE_FACT,
    ],
  },
  canDoAnswer: "Uzun ve zor metinleri örtük anlamlarıyla anlar; İngilizceyi akademik ve mesleki ortamda esnek biçimde kullanırsınız.",
  why: {
    heading: "Neden C1 Seviyesi İngilizce Eğitimi?",
    answer: "C1 kursu akıcılığı ve kelime hazinesini genişletir, akademik sınavlara hazırlar.",
    icons: ["kelime", "puan", "ekran"],
  },
  techniques: {
    heading: "İngilizce C1 Seviyesi Çalışma Teknikleri Nedir?",
    answer: "Kursta zorlu metinler, akıcı ve kendiliğinden anlatım ve ayrıntılı yazma üzerinde çalışılır.",
    highlights: [
      { icon: "okuma", text: { src: { heading: C1_H1, take: [0] }, sentence: 2 } },
      { icon: "sohbet", text: { src: { heading: C1_H1, take: [1] } } },
    ],
  },
  about: {
    heading: "Advanced İngilizce C1 | İleri Seviye İngilizce C1 Nedir?",
    answer: "C1, CEFR'in beşinci seviyesidir (Effective Operational Proficiency): yetkin kullanıcılığın ilk basamağı.",
    cards: [
      { title: "Seviye", icon: "kupa" },
      { title: "Kullanım", icon: "konusma" },
    ],
    pointsTitle: "Bu seviyedeki öğrenciler",
  },
  panelPhoto: { src: "/assets/foto-9.jpg", alt: CLASS_PHOTO_ALT, width: 960, height: 960 },
  faq: [
    {
      question: "C1'den sonra ne var?",
      icon: "sure",
      answer: [
        "CEFR'in son seviyesi C2'dir (Mastery). Dünya Dilleri Merkezi'nin İngilizce programında C2, Advanced (C1 – C2) grubunda yer alır.",
        "Cambridge English'in rehber rakamlarına göre C2'ye başlangıçtan toplam yaklaşık 1.000–1.200 rehberli ders saatinde ulaşılır.",
      ],
    },
    {
      question: "C1 seviyesi hangi sınavlarla belgelenir?",
      icon: "belge",
      answer: ["Cambridge C1 Advanced doğrudan C1'i ölçer. IELTS'te 7.0–8.0 bantları C1'e karşılık gelir."],
    },
    FAQ_CERTIFICATE,
    FAQ_START,
  ],
  edits: {
    // Cambridge sınavının güncel adı "C1 Advanced" (kullanıcı onayı, 2026-09-27); IELTS 8.0 C1 aralığında (7–8), dokunulmadı.
    "Bunun yanısıra bu eğitim IELTS puanınızı 8.0'e yükseltmenize veya Cambridge English Advanced (CAE) için hazırlanmanıza yardımcı olacaktır.":
      "Bunun yanı sıra bu eğitim IELTS puanınızı 8.0'e yükseltmenize veya Cambridge C1 Advanced (eski adıyla CAE) sınavına hazırlanmanıza yardımcı olacaktır.",
  },
  ignored: [],
};

export const ENGLISH_LEVELS: EnglishLevelDef[] = [ELEMENTARY, PRE_INTERMEDIATE, INTERMEDIATE, UPPER_INTERMEDIATE, ADVANCED];

export const levelHref = (slug: string) => `${IK}/${slug}`;

/**
 * Üretilen seviye sayfalarının adresleri (`lib/pageRegistry.ts`). Veri dosyasında durur:
 * çözücü `lib/hubLinks` → `pageRegistry` zincirini içe aktardığı için oradan alınırsa döngü olur.
 */
export const ENGLISH_LEVEL_PATHS: string[] = ENGLISH_LEVELS.map((d) => levelHref(d.slug));

/** Merdivenin sırası (A1 → C1) — üretilmemiş seviye düz metin görünür. */
export const LEVEL_LADDER: { code: EnLevelCode; name: string; slug: string }[] = [
  { code: "A1", name: "Elementary", slug: "elementary-ingilizce-kursu" },
  { code: "A2", name: "Pre-Intermediate", slug: "pre-intermediate-ingilizce-kursu" },
  { code: "B1", name: "Intermediate", slug: "intermediate-ingilizce-kursu" },
  { code: "B2", name: "Upper-Intermediate", slug: "upper-intermediate-ingilizce-kursu" },
  { code: "C1", name: "Advanced", slug: "advanced-ingilizce-kursu" },
];
