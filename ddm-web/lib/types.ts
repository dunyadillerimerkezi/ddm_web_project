/**
 * Paylaşılan tipler — Faz 5 tasarım şablonlarının veri sözleşmesi.
 *
 * Kaynak şablonlar: ../docs/design-refs/DDM_Tasarım_Sistemi_faz5/*.dc.html
 *
 * TASARIM KURALI (CLAUDE.md §5): eksik veri UYDURULMAZ. Kaynak içerikte
 * olmayan alan `null` olur ve arayüzde "bekleniyor / VERİ EKSİK" olarak
 * gösterilir. Bu yüzden pek çok alan `string | null`.
 */

/* ---------------------------------------------------------------
 * Navigasyon
 * ------------------------------------------------------------- */

/**
 * `href: null` → eski sitede karşılığı OLMAYAN menü başlığı.
 * Link olarak değil, düz metin olarak render edilir. Uydurma URL üretmeyin.
 */
export type NavLink = {
  label: string;
  href: string | null;
};

export type NavColumn = {
  title: string;
  items: NavLink[];
};

export type NavItem = {
  key: string;
  /** Header'daki kısa etiket */
  short: string;
  /** Mega menü panelindeki büyük etiket */
  label: string;
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

export type Faq = {
  question: string;
  answer: string;
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
