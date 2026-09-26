/**
 * Paylaşılan tipler — Faz 5 tasarım şablonlarının veri sözleşmesi.
 *
 * Kaynak şablonlar: ../docs/design-refs/DDM_Tasarım_Sistemi_faz5/*.dc.html
 *
 * TASARIM KURALI (CLAUDE.md §5): eksik veri UYDURULMAZ. Kaynak içerikte
 * olmayan alan `null` olur ve arayüzde "bekleniyor / VERİ EKSİK" olarak
 * gösterilir. Bu yüzden pek çok alan `string | null`.
 */

import type { IconName } from "@/components/graphics/icons";
import type { DayKey } from "@/components/ui/Primitives";

/* ---------------------------------------------------------------
 * Navigasyon
 * ------------------------------------------------------------- */

/**
 * `href: null` → eski sitede de karşılığı olmayan menü kalemi. Link değil,
 * düz metin render edilir. Uydurma URL üretmeyin.
 *
 * `soon: true` → hedef eski sitede VAR ama bizde henüz ÜRETİLMEDİ (P4/P5).
 * `lib/navTree.ts` bu kalemleri düz metne indirir ya da hiç basmaz; hangisi
 * olduğu `NavRenderMode`'a bağlı. Bayrağın doğruluğunu `lib/navAudit.ts`
 * build sırasında `lib/pageRegistry.ts`'e karşı doğrular — elle tutulan bir
 * bayrak ama sapması build'i düşürür.
 */
export type NavLink = {
  label: string;
  href: string | null;
  soon?: true;
};

/**
 * Menünün 3. katı — bir kursun alt sayfaları, öbeklenmiş hâlde
 * ("PROGRAM" / "ŞUBE KURS TARİHLERİ"). `title: null` → öbek başlığı basılmaz.
 */
export type NavChildGroup = {
  title: string | null;
  items: NavLink[];
};

/** Menünün 2. katı. `children` varsa altında 3. kat açılır. */
export type NavNode = NavLink & {
  children?: NavChildGroup[];
};

export type NavColumn = {
  title: string;
  items: NavNode[];
};

export type NavItem = {
  key: string;
  /** Header'daki kısa etiket */
  short: string;
  /** Mega menü panelindeki büyük etiket */
  label: string;
  /**
   * Masaüstü panelinin düzeni:
   *   "rail"    → iki bölme (solda kurs listesi, sağda seçili kursun alt sayfaları).
   *               10 dil × ~9 ve 16 sınav × ~8 kalem tek panele sığmadığı için.
   *   "columns" → klasik kolonlu liste; az kalemli sekmeler.
   * Mobil çekmece her iki düzende de aynı 3 katlı akordeonu kullanır.
   */
  layout: "rail" | "columns";
  promoTitle: string;
  promoLink: NavLink;
  columns: NavColumn[];
};

export type FooterColumn = {
  title: string;
  items: NavLink[];
};

/** `href` yoksa bu kırıntı aktif sayfadır (`aria-current="page"`). */
export type Crumb = {
  label: string;
  href?: string;
};

/* ---------------------------------------------------------------
 * Kurum verisi
 * ------------------------------------------------------------- */

export type BranchSlug = "kadikoy" | "bagdat" | "etiler" | "atasehir" | "umraniye";

export type Branch = {
  slug: BranchSlug;
  /** "Kadıköy" */
  name: string;
  /** Kicker formu: "KADIKÖY MERKEZ" */
  kicker: string;
  /** Şube iletişim sayfası — eski sitedeki gerçek URL */
  href: string;
  /** null → "adres bekleniyor" */
  address: string | null;
  /** null → "telefon bekleniyor" */
  phone: string | null;
  mail: string;
  /** WhatsApp numarası, ülke kodu dahil rakam: "902163301217". null → WhatsApp yok */
  wa: string | null;
};

/* ---------------------------------------------------------------
 * Tekrar eden içerik parçaları
 * ------------------------------------------------------------- */

export type QuickFact = {
  icon: string;
  value: string;
  label: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

/** Bölüm 11 SSS — soru kaynak başlığın birebir kendisi, cevap kaynak
 *  paragraflarının/maddelerinin listesi (bkz. plan §3 "E+H'den SSS"). */
export type Faq = {
  question: string;
  answer: string[];
  /** "prose" (varsayılan) → ayrı `<p>` paragrafları. "list" → `<ul><li>` madde listesi (H). */
  format?: "prose" | "list";
  /** UI turu (2026-09-25): sorunun solunda ikon kutusu — verilmezse basılmaz. */
  icon?: IconName;
};

/** Kurs takvimi satırı — tarih/gün/saat kaynak içerikte YOK, hepsi null gelir. */
export type ScheduleRow = {
  branch: string;
  note: string;
  date: string | null;
  days: string | null;
  hours: string | null;
};

/** Gerçek görsel gelene kadar duran yuva. */
export type ImageSlotData = {
  src: string | null;
  alt: string;
  ratio: "16/9" | "4/3" | "1/1" | "4/5";
  width: number;
  height: number;
  /** Yuvada gösterilecek açıklama: "Çok dilli grup dersi / konuşan öğrenciler" */
  hint: string;
};

/* ---------------------------------------------------------------
 * Faz 6.4 — İçerik boru hattı (site_content.json → sayfa modeli)
 *
 * Bu bölüm dile özgü değil: `lib/contentSections.ts` (jenerik parser) ve
 * `lib/languageContent.ts` (Dil Kursu sözleşmesi) burayı paylaşır; Faz 6.5/6.6
 * aynı `SectionRef` dilini kullanacak.
 * ------------------------------------------------------------- */

/**
 * Bir içerik slotunun kaynak metindeki yeri. Yalnız `headings[]` içinde
 * BİREBİR eşleşen bir başlık bölüm sınırı sayılır (bkz. CLAUDE.md §5 —
 * uydurma yok, kaynağa sadık kal). `heading: null` → ilk başlıktan önceki
 * giriş bloğu.
 */
export type SectionRef = {
  heading: string | null;
  /** Hangi paragraflar alınacak — varsayılan "all". */
  take?: "all" | "first" | "rest" | number[];
  /** false (varsayılan) → 0 paragraf çözerse build DÜŞER. true → dilde o
   *  bölümün hiç olmadığı bilinçli durumlarda `null` döner, bölüm düşer. */
  allowEmpty?: boolean;
};

/* ---------------------------------------------------------------
 * Hero / güven şeridi
 * ------------------------------------------------------------- */

/** Güven şeridi öğesi — `data/home.ts`'teki `HomeStat` bunun alias'ıdır. */
export type Stat = {
  icon: IconName;
  value: string;
  label: string;
};

/* ---------------------------------------------------------------
 * Tablo (ScheduleTable) — Faz 6.5/6.6 aynı şemayı yeniden kullanacak
 * ------------------------------------------------------------- */

export type ScheduleColumn = {
  key: string;
  /** Masaüstü başlık hücresi metni. "" → görsel başlık yok (CTA kolonu). */
  head: string;
  /** ≤759px kart görünümünde satır içi etiket. null → etiket basılmaz
   *  (ör. şube adı sütunu zaten kendini anlatıyor). */
  rowLabel: string | null;
};

export type ScheduleCell =
  | { kind: "title"; title: string; note: string | null }
  | { kind: "text"; value: string | null; pending: string }
  | { kind: "link"; label: string; href: string | null }
  | { kind: "cta"; label: string; href: string };

export type ScheduleTableRow = {
  key: string;
  /** FilterPills eşleşme anahtarı (şube adı). null → filtreden muaf, hep görünür. */
  group: string | null;
  /** `columns` ile aynı uzunlukta olmalı — build-time assert edilir. */
  cells: ScheduleCell[];
};

/* ---------------------------------------------------------------
 * İç link ağı (LinkRow)
 * ------------------------------------------------------------- */

export type LinkRowItem = {
  label: string;
  sub?: string | null;
  /** null → §4: link üretilmez, düz metin gösterilir. */
  href: string | null;
  flag?: string | null;
  icon?: string | null;
  /** true → aktif sayfa vurgusu (açık mavi zemin, aria-current). */
  current?: boolean;
};

/* ---------------------------------------------------------------
 * Faz 6.4 — Dil Kursu içerik blokları (10 dilin de ortak şablonu — 2026-09
 * yeniden yazımından sonra tekdüze bir bölüm iskeletine oturdu, bkz. plan §1).
 * ------------------------------------------------------------- */

/** Madde listeli, opsiyonel giriş cümleli bir metin bloğu (F/H bölümleri). */
export type BulletBlock = {
  title: string;
  intro: string | null;
  items: string[];
};

/** Seviye grubu: CEFR aralığı + giriş + madde listesi (G bölümü — 6 dilde
 *  3 grup: Beginner/Intermediate/Advanced tarzı, her biri 2 CEFR seviyesini
 *  kapsıyor; 4 dilde bölümün kendisi yok). */
export type LevelGroup = {
  name: string;
  /** "A1 – A2" */
  range: string;
  intro: string;
  items: string[];
};

export type PricingPlan = {
  /** "1 Kur 2,5 Ay 60 Saat 8 Kişilik Sınıflarda İngilizce Kursu" */
  label: string;
  /** "25.000 TL'dir." — birebir kaynaktan, para birimi/biçim UYDURULMAZ. */
  price: string;
};

export type PricingBlock = {
  title: string;
  plans: PricingPlan[];
  /** KDV/şube notu gibi tek satırlık ek bilgiler. */
  notes: string[];
};

/* ---------------------------------------------------------------
 * Faz 6.6 — Şube Kurs Tarihi içerik blokları
 *
 * Kaynak: `DDM Şube Kurs Tarihi Sayfası.dc.html` `pageData()`/`branchData()`.
 * Kritik değişkenlik: program blokları SAYISI 1-3 arası değişir (0 da olabilir,
 * "VERİ EKSİK" varyantı) — bu yüzden ayrı alan değil, `ProgramBlock[]` dizisi.
 * ------------------------------------------------------------- */

export type ProgramKind = "haftaici" | "haftasonu" | "birebir";

/** "Sabah Programı 10:00 / 13:00" satırının bir slotu. */
export type TimeSlot = {
  /** "Sabah Programı" — kaynaktan birebir. */
  name: string;
  /** "10:00" */
  start: string;
  end: string;
};

/** `Program Detayları:` satırının bir parçası — rozet olarak basılır. */
export type ProgramSpec = {
  key: "grupBuyuklugu" | "programSuresi" | "toplamSaat" | "yogunluk" | "diger";
  /** Rozet metni — kaynaktaki parçanın BİREBİR kendisi ("6 Kişilik Özel Gruplar"). */
  text: string;
  icon: IconName;
};

export type ProgramBlock = {
  kind: ProgramKind;
  /** "HAFTA İÇİ" — `kind`'dan türeyen etiket, bileşene sabitlenmez. */
  kicker: string;
  /** Kaynaktaki BAŞLIK, birebir (headings[1..3]). */
  title: string;
  icon: IconName;
  /** Kaynakta gün adı geçmiyorsa boş dizi → gün rozeti şeridi hiç basılmaz. */
  days: DayKey[];
  /** Kaynakta saat aralığı yoksa boş dizi. */
  slots: TimeSlot[];
  /** Birebir blokta gün/saat serbest metin. null → basılmaz. */
  hoursNote: string | null;
  specs: ProgramSpec[];
  /** Etütler: "Speaking", "Listening & Writing"... Boş → bölüm basılmaz. */
  study: string[];
  /** CEFR seviye sistemi / "kur hediye" gibi kapalı etiket kümesine girmeyen
   *  ama gerçek bir ek cümle. null → basılmaz. Kaynaktan birebir. */
  note: string | null;
  /** Yalnız 13 satırda var (84 kayıtta). null → satır basılmaz, UYDURULMAZ. */
  startDate: string | null;
  /** Kayıt CTA etiketi — veriden, şablona sabitlenmez. */
  ctaLabel: string;
  /* KARAR (kullanıcı onayı): fiyat tamamen kaldırılır, "bilgi alın" CTA'sı da
   * yok — price/priceRaw/priceNote alanları modelde bilinçli olarak YOK. */
};

/** Haftalık ders programı ızgarasının bir satırı — `WeekGrid` girdisi. */
export type WeekGridRow = {
  name: string;
  range: string;
  kind: ProgramKind;
  days: DayKey[];
};

/** schema.org hazırlığı — bu fazda JSON-LD basılmaz, alanlar Faz 8 için durur. */
export type CourseSchemaFields = {
  courseName: string;
  courseCode: string | null;
  branchName: string;
  /** null → 84 kaydın büyük kısmında dönem başlangıç tarihi yok. */
  startDates: string[];
};

export type ContentDiagnostic = {
  kind: "h1-fallback";
  detail: string;
};

export type CourseDatePage = {
  /* --- kimlik --- */
  branch: BranchSlug;
  /** Kaynak başlıkta geçen şube adı, birebir ("Etiler" / "Beşiktaş"). */
  branchLabel: string;
  courseSlug: string;
  /** "PROFICIENCY" — kaynaktaki yazımıyla. */
  courseName: string;
  category: "yabanci-dil-egitimleri" | "sinav-hazirlik-egitimleri";
  pageSlug: string;
  href: string;

  /* --- metadata (CLAUDE.md §6) --- */
  title: string;
  metaDescription: string;
  h1: string;
  h1Fallback: boolean;

  /* --- gövde --- */
  crumbs: Crumb[];
  intro: string[];
  programsTitle: string;
  programs: ProgramBlock[];
  /** Hero groupBadge + hızlı bakış şeridi kaynağı — kaynaktan ELLE çıkarılmış
   *  sayısal olgular. Çelişkili/parçalı kaynakta (ör. Aile Birleşimi'nin
   *  giriş metninde "4", program bloğunda "6" demesi) null — UYDURULMAZ. */
  groupSize: number | null;
  months: number | null;
  hours: number | null;
  quickFacts: Stat[];

  /* --- çapraz linkler --- */
  otherBranches: LinkRowItem[];
  otherCourses: LinkRowItem[];

  /* --- SEO yardımcı alanları --- */
  schema: CourseSchemaFields;

  /* --- denetim --- */
  diagnostics: ContentDiagnostic[];
};
