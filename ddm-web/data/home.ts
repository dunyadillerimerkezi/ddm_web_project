import type { FlagCode } from "@/components/graphics/Flag";
import type { IconName } from "@/components/graphics/icons";
import type { ImageSlotData, NavLink, Testimonial } from "@/lib/types";
import { DEFAULT_BRANCH, BRANCH_LIST } from "@/data/branches";

/**
 * Ana Sayfa içerik verisi — Faz 6.3.
 *
 * Kaynak: `docs/design-refs/DDM_Tasarım_Sistemi_faz5/DDM Ana Sayfa.dc.html`,
 * dosya sonundaki `<script data-dc-script>` bloğunun `renderVals()` metodu.
 * Metinler CLAUDE.md §5 gereği birebir taşındı — özetlenmedi, "iyileştirilmedi".
 *
 * Görsel yolları `/assets/home_page_images/` altında, dosya adları Faz 6.3
 * Aşama 0.1'de ASCII'ye çevrildi (`git mv`, orijinal Türkçe adlar artık yok).
 */

const IMG = "/assets/home_page_images";

/* ---------------------------------------------------------------
 * Bölüm 1 · Hero
 * ------------------------------------------------------------- */

export type HeroCard = {
  icon: IconName;
  title: string;
  text: string;
  cta: NavLink;
  slot: ImageSlotData;
};

export const HOME_HERO = {
  badge: "Sınav Hazırlık ve Yabancı Dil Eğitimleri",
  /** Sayfanın tek h1'i (Faz 6.3 H1 kararı — bkz. plan). Kaynakta h2 idi. */
  h1: "19 dilde eğitim, 2003’ten bugüne Dünya Dilleri Merkezi farkıyla yabancı dil eğitimleri",
  lead: "Türkiye’de 19 farklı dil eğitimi veren tek dil okuluyuz. Kadıköy, Bağdat Caddesi, Levent, Ataşehir ve Ümraniye şubelerimizde yabancı dil, sınav hazırlık ve yurtdışı eğitim programları.",
  primaryCard: {
    icon: "dunya",
    title: "Yabancı Dil Programları",
    text: "Dünya Dilleri Merkezi 2003 yılından bugüne öğrencilerine İngilizce, Almanca, Fransızca, İspanyolca, İtalyanca, Rusça, Çince, Japonca, Flemenkçe, Yunanca, Korece, İsveççe, Portekizce, Hırvatça, Boşnakça, Slovakça, Bulgarca, Arapça ve Farsça dil eğitimleri vermektedir.",
    cta: { label: "Sana Uygun Yabancı Dil Kursunu Keşfet", href: "#dil-kurslari" },
    slot: {
      src: `${IMG}/yabancı-dil2.jpg`,
      alt: "Masada bayraklarla çok dilli grup dersi yapan öğrenciler",
      ratio: "16/9",
      width: 735,
      height: 490,
      hint: "Çok dilli grup dersi / konuşan öğrenciler",
    },
  } satisfies HeroCard,
  featureCards: [
    {
      icon: "belge",
      title: "Sınav Hazırlık Kursları",
      text: "2003 yılından bugüne öğrencileri akademik sınavlara hazırlayan Dünya Dilleri Merkezi, İngilizce ve diğer yabancı dil sınav hazırlık kursları ile istediğiniz sonucu almanızda gerekli olan desteği size sağlayacaktır.",
      cta: { label: "Sana Uygun Sınav Hazırlık Programını Keşfet", href: "#sinav-hazirlik" },
      slot: {
        src: `${IMG}/exam_preparation.jpg`,
        alt: "Dizüstü bilgisayar ve notlarla sınava çalışan öğrenci",
        ratio: "1/1",
        width: 736,
        height: 1104,
        hint: "Sınav/çalışma masası",
      },
    },
    {
      icon: "dunya",
      title: "Yurtdışı Dil Eğitimi",
      text: "İngilizce konuşulan bir ülkede dil eğitimi alman isteyen öğrenciler için geniş çapta İngilizce dil kursları sunuyoruz. Uluslararası eğitim kurumları tarafından akredite edilmiş Genel İngilizce Kursları, Sınav Hazırlık Kursları, İş İngilizcesi Kursları veya Uzun Dönem kurslar arasından seçim yapabilirsiniz.",
      cta: { label: "Sana Uygun Yurtdışı Dil Eğitimini Keşfet", href: "#yurtdisi" },
      slot: {
        src: `${IMG}/yurtdısı_egitim.jpg`,
        alt: "Londra'da Big Ben önünde bir arada öğrenciler",
        ratio: "1/1",
        width: 736,
        height: 1104,
        hint: "Pasaport / kampüs",
      },
    },
  ] satisfies HeroCard[],
};

/* ---------------------------------------------------------------
 * Bölüm 2 · Sayaç şeridi
 * ------------------------------------------------------------- */

export type HomeStat = {
  icon: IconName;
  value: string;
  label: string;
};

/** Sayılar statik — `data-count` sayaç animasyonu tasarımda kaldırılmıştı. */
export const HOME_STATS: HomeStat[] = [
  { icon: "sohbet", value: "19", label: "farklı dilde eğitim" },
  { icon: "takvim", value: "2003", label: "yılından bugüne" },
  { icon: "konum", value: "5", label: "İstanbul şubesi" },
  { icon: "kupa", value: "8", label: "sınav hazırlık programı" },
];

/* ---------------------------------------------------------------
 * Bölüm 3 · Sınav hazırlık carousel'i
 * ------------------------------------------------------------- */

export type ExamCourse = {
  code: string;
  name: string;
  group: string;
  href: string;
  /** `home_page_images` altındaki logo dosyası; yoksa metin rozeti gösterilir. */
  logo: string | null;
};

const SH = "/sinav-hazirlik-egitimleri";

export const EXAM_SECTION = {
  kicker: "AKADEMİK DİL SINAVLARI",
  title: "Sınav Hazırlık ve Yabancı Dil Eğitimleri",
  lead: "TOEFL, IELTS, YDS, GRE, SAT, GMAT, TESTDAF/DNDS ve Proficiency programlarımızla öğrencilerimize kapsamlı destek sunuyoruz. DDM, sınav başarısını ve yurtdışı eğitim hedeflerini kültürel bir deneyime dönüştürür.",
  cta: { label: "Sana Uygun Sınav Hazırlık Programını Keşfet", href: SH },
  // UI turu (2026-09-24): TOEIC (eski dosyada dama deseni gömülüydü) ve GRE
  // logoları yenilendi; YDS ve YÖKDİL ÖSYM sınavı — ÖSYM logosu.
  courses: [
    { code: "TOEFL", name: "TOEFL Kursu", group: "Sınav Hazırlık Programları", href: `${SH}/toefl-kursu`, logo: "toefl-logo.png" },
    { code: "IELTS", name: "IELTS Kursu", group: "Sınav Hazırlık Programları", href: `${SH}/ielts-kursu`, logo: "IELTS_logo.png" },
    { code: "TOEIC", name: "TOEIC", group: "Dil Yeterliliği Çözümleri", href: `${SH}/toeic-kursu`, logo: "toeic_logo.jpg" },
    { code: "GRE", name: "GRE Kursu", group: "Sınav Hazırlık Programları", href: `${SH}/gre-kursu`, logo: "gre_logo.png" },
    { code: "SAT", name: "SAT Kursu", group: "Sınav Hazırlık Programları", href: `${SH}/sat-kursu`, logo: "SAT_logo.png" },
    { code: "GMAT", name: "GMAT Kursu", group: "Sınav Hazırlık Programları", href: `${SH}/gmat-kursu`, logo: "GMAT_logo.png" },
    { code: "PTE", name: "PTE Akademik", group: "Dil Yeterliliği Çözümleri", href: `${SH}/academic-pte`, logo: "pte-logo.png" },
    { code: "TESTDAF", name: "TESTDAF Kursu", group: "Sınav Hazırlık Programları", href: `${SH}/testdaf-kursu`, logo: "TestDaF-logo.png" },
    { code: "PROFICIENCY", name: "Proficiency Kursu", group: "Sınav Hazırlık Programları", href: `${SH}/proficiency-kursu`, logo: null },
    { code: "YDS", name: "YDS Kursu", group: "Sınav Hazırlık Programları", href: `${SH}/yds-kursu`, logo: "osym_logo.png" },
    { code: "YÖKDİL", name: "YÖKDİL", group: "Dil Yeterliliği Çözümleri", href: `${SH}/yokdil-sinavi-kursu`, logo: "osym_logo.png" },
    { code: "A1", name: "Aile Birleşimi (A1)", group: "Dil Yeterliliği Çözümleri", href: `${SH}/aile-birlesimi-egitimi`, logo: null },
  ] satisfies ExamCourse[],
};

/* ---------------------------------------------------------------
 * Bölüm 4 · Yurtdışı eğitim
 * ------------------------------------------------------------- */

const YE = "/yurtdisi-egitim";

export const ABROAD_SECTION = {
  kicker: "YURTDIŞI EĞİTİM",
  title: "Yurt dışı eğitim serüveninizin önemli bir parçası olmak istiyoruz",
  panelText:
    "Dünya Dilleri Merkezi, KAPLAN INTERNATIONAL ve ILSC dil okullarının resmi kayıt ofisidir. Yurtdışı eğitim sürecinizde size ücretsiz danışmanlık dahil, konaklama, vize, ulaşım gibi her konuda destek vermekteyiz.",
  /** UI turu (2026-09-24): metin rozetleri yerine partner logoları; `name` alt metni. */
  accreditations: [
    { name: "KAPLAN INTERNATIONAL", logo: "/assets/kaplan_int.jpg", width: 600, height: 400, crop: true },
    { name: "ILSC", logo: "/assets/ilsc_logo.jpg", width: 400, height: 250, crop: false },
  ],
  accreditationNote: "resmi kayıt ofisi",
  cta: { label: "Sana Uygun Yurtdışı Eğitimini Keşfet", href: YE },
  image: { src: `${IMG}/yurtdisi-egitim.jpg`, hint: "Yurtdışı kampüs / danışmanlık görüşmesi" },
  panelTitle: "PROGRAMLAR",
  items: [
    { label: "Yurtdışı İngilizce", href: `${YE}/yurtdisi-ingilizce-egitimi` },
    { label: "Sınav Hazırlık", href: `${YE}/sinav-hazirlik` },
    { label: "Pathway Programı", href: `${YE}/pathway-programi` },
    { label: "Yüksek Öğrenim", href: `${YE}/yuksek-ogrenim` },
    { label: "Yaz Okulları", href: `${YE}/yaz-okullari` },
    // P4 (kullanıcı, 2026-09-26): eski "Yurtdışı Dil Eğitimi" sayfası ana sayfanın kopyası → 301; bağlantı doğrudan ana sayfaya.
    { label: "Yurtdışı Dil Eğitimi", href: YE },
  ] satisfies NavLink[],
};

/* ---------------------------------------------------------------
 * Bölüm 5 · Dil kursları ızgarası
 * ------------------------------------------------------------- */

export type LanguageCard = {
  key: string;
  code: string;
  title: string;
  href: string;
  /** Bayraksız kart (İngilizce Konuşma) için null. */
  flag: FlagCode | null;
  image: { src: string; hint: string };
  links: NavLink[];
};

const YD = "/yabanci-dil-egitimleri";

// Not: her dilin "Program detayları" madde metni/sayısı şablonla birebir
// farklılaştığı için aşağıda tek tek yazıldı — otomatik üretim yerine
// kaynağa sadık kalındı.
export const LANGUAGE_SECTION = {
  kicker: "YABANCI DİL KURSLARI",
  title: "19 dilde eğitim, 2003’ten bugüne Dünya Dilleri Merkezi farkıyla yabancı dil eğitimleri",
  lead: "Türkiye’de 19 farklı dil eğitimi veren tek dil okuluyuz. Dünya Dilleri Merkezi 2003 yılından bugüne öğrencilerine İngilizce, Almanca, Fransızca, İspanyolca, İtalyanca, Rusça, Çince, Japonca, Flemenkçe, Yunanca, Korece, İsveççe, Portekizce, Hırvatça, Boşnakça, Slovakça, Bulgarca, Arapça ve Farsça dil eğitimleri vermektedir.",
  cta: { label: "Sana Uygun Yabancı Dil Kursunu Keşfet", href: "/yabanci-dil" },
  cards: [
    {
      key: "en", code: "EN", title: "İngilizce Kursu", href: `${YD}/ingilizce-kursu`, flag: "gb",
      image: { src: `${IMG}/dil-ingilizce.jpg`, hint: "Big Ben / Londra" },
      links: [
        { label: "İngilizce Eğitim Programı Seviyeleri", href: `${YD}/ingilizce-kursu#seviyeler` },
        { label: "İngilizce Programı Gün ve Saatleri", href: `${YD}/ingilizce-kursu#kurs-takvimi` },
        { label: "İngilizce Kur Sınavları", href: `${YD}/ingilizce-kursu#kur-sinavi` },
        { label: "İngilizce Dil Seviyeleri", href: "/ingilizce-kurslari" },
        { label: "İngilizce Sertifikaları ve Uluslararası Sınavlar", href: `${YD}/ingilizce-kursu#sertifika` },
      ],
    },
    {
      key: "de", code: "DE", title: "Almanca Kursu", href: `${YD}/almanca-kursu`, flag: "de",
      image: { src: `${IMG}/dil-almanca.jpg`, hint: "Brandenburg Kapısı / Berlin" },
      links: [
        { label: "Almanca Eğitim Programı Seviyeleri", href: `${YD}/almanca-kursu#seviyeler` },
        { label: "Almanca Programı Gün ve Saatleri", href: `${YD}/almanca-kursu#kurs-takvimi` },
        { label: "Almanca Kur Sınavları", href: `${YD}/almanca-kursu#kur-sinavi` },
        { label: "Almanca dil seviyeleri", href: `${YD}/almanca-kursu#seviyeler` },
        { label: "Almanca Sertifikaları ve Uluslararası Sınavlar", href: `${YD}/almanca-kursu#sertifika` },
      ],
    },
    {
      key: "fr", code: "FR", title: "Fransızca Kursu", href: `${YD}/fransizca-kursu`, flag: "fr",
      image: { src: `${IMG}/dil-fransizca.jpg`, hint: "Eiffel Kulesi / Paris" },
      links: [
        { label: "Fransızca Eğitim Programı Seviyeleri", href: `${YD}/fransizca-kursu#seviyeler` },
        { label: "Fransızca Programı Gün ve Saatleri", href: `${YD}/fransizca-kursu#kurs-takvimi` },
        { label: "Fransızca Kur Sınavları", href: `${YD}/fransizca-kursu#kur-sinavi` },
        { label: "Fransızca dil seviyeleri", href: `${YD}/fransizca-kursu#seviyeler` },
        { label: "Fransızca Sertifikaları ve Uluslararası Sınavlar", href: `${YD}/fransizca-kursu#sertifika` },
      ],
    },
    {
      key: "ru", code: "RU", title: "Rusça Kursu", href: `${YD}/rusca-kursu`, flag: "ru",
      image: { src: `${IMG}/dil-rusca.jpg`, hint: "Kızıl Meydan / Moskova" },
      links: [
        { label: "Rusça Eğitim Programı Seviyeleri", href: `${YD}/rusca-kursu#seviyeler` },
        { label: "Rusça Programı Gün ve Saatleri", href: `${YD}/rusca-kursu#kurs-takvimi` },
        { label: "Rusça Kur Sınavları", href: `${YD}/rusca-kursu#kur-sinavi` },
        { label: "Rusça dil seviyeleri", href: `${YD}/rusca-kursu#seviyeler` },
        { label: "Rusça Sertifikaları ve Uluslararası Sınavlar", href: `${YD}/rusca-kursu#sertifika` },
      ],
    },
    {
      key: "es", code: "ES", title: "İspanyolca Kursu", href: `${YD}/ispanyolca-kursu`, flag: "es",
      image: { src: `${IMG}/dil-ispanyolca.jpg`, hint: "Sagrada Família / Barcelona" },
      links: [
        { label: "İspanyolca Eğitim Programı Seviyeleri", href: `${YD}/ispanyolca-kursu#seviyeler` },
        { label: "İspanyolca Programı Gün ve Saatleri", href: `${YD}/ispanyolca-kursu#kurs-takvimi` },
        { label: "İspanyolca Kur Sınavları", href: `${YD}/ispanyolca-kursu#kur-sinavi` },
        { label: "İspanyolca dil seviyeleri", href: `${YD}/ispanyolca-kursu#seviyeler` },
        { label: "İspanyolca Sertifikaları ve Uluslararası Sınavlar", href: `${YD}/ispanyolca-kursu#sertifika` },
      ],
    },
    {
      key: "it", code: "IT", title: "İtalyanca Kursu", href: `${YD}/italyanca-kursu`, flag: "it",
      image: { src: `${IMG}/dil-italyanca.jpg`, hint: "Colosseo / Roma" },
      links: [
        { label: "İtalyanca Eğitim Programı Seviyeleri", href: `${YD}/italyanca-kursu#seviyeler` },
        { label: "İtalyanca Programı Gün ve Saatleri", href: `${YD}/italyanca-kursu#kurs-takvimi` },
        { label: "İtalyanca Kur Sınavları", href: `${YD}/italyanca-kursu#kur-sinavi` },
        { label: "İtalyanca dil seviyeleri", href: `${YD}/italyanca-kursu#seviyeler` },
        { label: "İtalyanca Sertifikaları ve Uluslararası Sınavlar", href: `${YD}/italyanca-kursu#sertifika` },
      ],
    },
    {
      key: "zh", code: "ZH", title: "Çince Kursu", href: `${YD}/cince-kursu`, flag: "cn",
      image: { src: `${IMG}/dil-cince.jpg`, hint: "Şanghay silueti" },
      links: [
        { label: "Çince Eğitim Programı Seviyeleri", href: `${YD}/cince-kursu#seviyeler` },
        { label: "Çince Programı Gün ve Saatleri", href: `${YD}/cince-kursu#kurs-takvimi` },
        { label: "Çince Kur Sınavları", href: `${YD}/cince-kursu#kur-sinavi` },
        { label: "Çince dil seviyeleri", href: `${YD}/cince-kursu#seviyeler` },
        { label: "Çince Sertifikaları ve Uluslararası Sınavlar", href: `${YD}/cince-kursu#sertifika` },
      ],
    },
    {
      // Canlı sitedeki slug birebir korunuyor (yazım hatası dahil, CLAUDE.md §3).
      key: "tr", code: "TR", title: "Türkçe Kursu", href: `${YD}/yabancila-icin-turkce-kurs`, flag: "tr",
      image: { src: `${IMG}/dil-turkce.jpg`, hint: "İstanbul silueti" },
      links: [
        { label: "Türkçe Eğitim Programı Seviyeleri", href: `${YD}/yabancila-icin-turkce-kurs#seviyeler` },
        { label: "Türkçe Programı Gün ve Saatleri", href: `${YD}/yabancila-icin-turkce-kurs#kurs-takvimi` },
        { label: "Türkçe Kur Sınavları", href: `${YD}/yabancila-icin-turkce-kurs#kur-sinavi` },
        { label: "Türkçe Sertifikaları ve Uluslararası Sınavlar", href: `${YD}/yabancila-icin-turkce-kurs#sertifika` },
      ],
    },
    {
      key: "konusma", code: "EN", title: "İngilizce Konuşma", href: `${YD}/ingilizce-konusma-kursu`, flag: null,
      image: { src: `${IMG}/ingilizce-konusma.jpg`, hint: "Konuşma kulübü / sohbet masası" },
      links: [
        { label: "İngilizce Konuşma Eğitim Programı Seviyeleri", href: `${YD}/ingilizce-konusma-kursu#seviyeler` },
        { label: "İngilizce Konuşma Programı Gün ve Saatleri", href: `${YD}/ingilizce-konusma-kursu#kurs-takvimi` },
        // Şablonda karşılıksız üçüncü madde — uydurma URL üretilmedi.
        { label: "İngilizce Konuşma güvenilir metod", href: null },
      ],
    },
    {
      key: "nl", code: "NL", title: "Flemenkçe Kursu", href: `${YD}/flemenkce-kursu`, flag: "nl",
      image: { src: `${IMG}/dil-felemenkce.jpg`, hint: "Amsterdam kanalları" },
      links: [
        { label: "Flemenkçe Eğitim Programı Seviyeleri", href: `${YD}/flemenkce-kursu#seviyeler` },
        { label: "Flemenkçe Programı Gün ve Saatleri", href: `${YD}/flemenkce-kursu#kurs-takvimi` },
        { label: "Flemenkçe Kur Sınavları", href: `${YD}/flemenkce-kursu#kur-sinavi` },
        { label: "Flemenkçe dil seviyeleri", href: `${YD}/flemenkce-kursu#seviyeler` },
      ],
    },
  ] satisfies LanguageCard[],
};

/* ---------------------------------------------------------------
 * Bölüm 6 · Şubeler
 * ------------------------------------------------------------- */

export type HomeBranchCard = {
  tag: string;
  title: string;
  short: string;
  cta: string;
  href: string;
  slot: ImageSlotData;
};

const BRANCH_PROMO = [
  {
    tag: "KADIKÖY MERKEZ",
    title: "Dünya Dilleri Merkezi Kadıköy Şubesi",
    short: "Yabancı dil eğitimi ve uluslararası sınav hazırlığında akademik kaliteyi esas alan seçkin bir kurumdur.",
    cta: "Kadıköy Şubemizi Keşfet",
    slotHint: "Kadıköy şube binası",
    photo: "/assets/kadıköy.jpg",
    photoAlt: "Kadıköy iskelesi ve vapur, gün batımı",
  },
  {
    tag: "BAĞDAT CADDESİ AKADEMİK",
    title: "Dünya Dilleri Merkezi Bağdat Caddesi Şubesi",
    short: "Geniş bir dil yelpazesi ve uluslararası sınavlara yönelik yoğun hazırlık programlarıyla öne çıkar.",
    cta: "Bağdat Caddesi Şubemizi Keşfet",
    slotHint: "Bağdat Caddesi şubesi",
    photo: "/assets/bağdat_caddesi.jpg",
    photoAlt: "Ağaçlı Bağdat Caddesi",
  },
  {
    // Kaynakta başlık "Beşiktaş Şubesi" ama slug/şube "levent" — birebir korundu (§5).
    tag: "LEVENT BEŞİKTAŞ",
    title: "Dünya Dilleri Merkezi Beşiktaş Şubesi",
    short: "25 yılı aşkın deneyimiyle bireysel ve kurumsal dil eğitimlerinde güvenilir bir adres.",
    cta: "Levent Şubemizi Keşfet",
    slotHint: "Levent / Etiler şubesi",
    photo: "/assets/levent.jpg",
    photoAlt: "Levent gökdelenleri",
  },
  {
    tag: "ATAŞEHİR",
    title: "Dünya Dilleri Merkezi Ataşehir Şubesi",
    short: "MEB onaylı yapısıyla birçok dilde eğitim sunan, deneyimli Türk ve yabancı eğitmen kadrosu.",
    cta: "Ataşehir Şubemizi Keşfet",
    slotHint: "Ataşehir şubesi",
    photo: "/assets/ataşehir.jpg",
    photoAlt: "Gece Ataşehir silueti",
  },
  {
    tag: "ÜMRANİYE",
    title: "Dünya Dilleri Merkezi Ümraniye şubesi",
    short: "15 yıllık tecrübe deneyimli eğitmen kadromuzla sizlere dünyanın kapılarını aralıyoruz.",
    cta: "Ümraniye Şubesi",
    slotHint: "Ümraniye şubesi",
    photo: "/assets/ümraniye.jpg",
    photoAlt: "Ümraniye saat kulesi",
  },
];

export const BRANCH_SECTION = {
  kicker: "ŞUBELERİMİZ",
  title: "Dünya Dilleri Merkezi Şubeler",
  /** `href` `data/branches.ts` `BRANCH_LIST`'ten — ikinci bir kaynak yok. */
  cards: BRANCH_LIST.map((branch, i) => {
    const promo = BRANCH_PROMO[i];
    return {
      tag: promo.tag,
      title: promo.title,
      short: promo.short,
      cta: promo.cta,
      href: branch.href,
      slot: {
        src: promo.photo,
        alt: promo.photoAlt,
        ratio: "4/5",
        width: 800,
        height: 1000,
        hint: promo.slotHint,
      },
    } satisfies HomeBranchCard;
  }),
};

/* ---------------------------------------------------------------
 * Bölüm 7 · Diğer programlar
 * ------------------------------------------------------------- */

export type OtherProgram = {
  num: string;
  title: string;
  sub: string;
  href: string;
  image: { src: string; hint: string };
};

const DP = "/diger-program";

export const OTHER_PROGRAMS_SECTION = {
  kicker: "DÜNYA DİLLERİ MERKEZİ ŞUBELERİMİZDE DİĞER EĞİTİM PROGRAMLARIMIZ",
  title: "Yurt dışı eğitimden iş İngilizcesine, çocuklara ve çevrim içi programlar",
  cta: { label: "Diğer Eğitim Programlarını Keşfet", href: DP },
  programs: [
    {
      num: "01", title: "Özel Dersler", sub: "Kişiye Özel Ders Programları",
      href: `${DP}/ozel-dersler`,
      image: { src: `${IMG}/ozel-ders.jpg`, hint: "Birebir ders masası" },
    },
    {
      num: "02", title: "Business English", sub: "İş Hayatına Özel Çözümler DDM'de",
      href: `${DP}/business-english`,
      image: { src: `${IMG}/is-ingilizcesi.jpg`, hint: "Ofis / toplantı ortamı" },
    },
    {
      num: "03", title: "DDM Kids", sub: "Çocuklarınızın Geleceğine Yer Ayırtın",
      href: `${DP}/cocuklar-icin-ingilizce-kursu`,
      image: { src: `${IMG}/ddm-kids.jpg`, hint: "Çocuk sınıfı" },
    },
    {
      num: "04", title: "Yurtdışı Dil Eğitimi", sub: "DDM farkıyla Yurtdışında Dil Eğitimi",
      href: YE,
      image: { src: `${IMG}/yurtdisi-dil-egitimi.jpg`, hint: "Kampüs / valiz" },
    },
  ] satisfies OtherProgram[],
};

/* ---------------------------------------------------------------
 * Bölüm 8 · Tanıtım videosu
 * ------------------------------------------------------------- */

export const VIDEO_SECTION = {
  kicker: "TANITIM VİDEOSU",
  title: "Keşif alanınızı genişletin, videomuzu izleyin",
  youtubeUrl: "https://www.youtube.com/watch?v=plKWRTzefC8",
  /** Sayfa içi oynatıcı — gizlilik modlu alan; iframe yalnız tıklanınca yüklenir. */
  embedUrl: "https://www.youtube-nocookie.com/embed/plKWRTzefC8?autoplay=1&rel=0",
  /**
   * Kapaktaki kayan "merhaba" şeridi — DEKORATİF (aria-hidden), sayfa içeriği
   * değil. UI turu (2026-09-24, "6A"): kapaktaki şube fotoğrafı kullanıcı
   * isteğiyle kaldırıldı, yerine DDM'nin dilleri.
   */
  greetings: [
    ["Hello", "Hallo", "Bonjour", "Hola", "Ciao", "Привет", "你好", "Merhaba", "Hej", "Olá"],
    ["Γειά σου", "안녕하세요", "مرحبا", "سلام", "Dobrý deň", "Здравей", "Bok", "こんにちは", "Hallo"],
  ],
  caption: "Dünya Dilleri Merkezi tanıtım filmi",
  sub: "YouTube’da izle · youtube.com/watch?v=plKWRTzefC8",
};

/* ---------------------------------------------------------------
 * Bölüm 9 · Öğrenci yorumları
 * ------------------------------------------------------------- */

export const TESTIMONIALS_SECTION = {
  kicker: "ÖĞRENCİ YORUMLARI",
  title: "Öğrenci Yorumları",
  cta: { label: "Öğrenci Yorumlarını Oku", href: "/ogrenci-yorumlari" },
  items: [
    {
      initials: "OS", name: "Onur Saygın", role: "IELTS Öğrencisi",
      quote:
        "İyi eğitimli, deneyimli ve güler yüzlü, Türk ve yabancı hocalarım ile çok kısa bir sürede eksiklerimi tespit edip, ve bu eksiklerimi tamamlayıp kısa sürede İngilizce seviyemi akademik düzeyde geliştirmeme...",
    },
    {
      initials: "HO", name: "Hülya Osmanoğlu", role: "İngilizce Öğrencisi",
      quote:
        "İngilizce öğrenmedeki zorlu mücadelem, dil seviyemin ölçüldüğü ilk sınavlardaki başarısızlığımdan sonra 5 yıl kadar uzunca bir süre âdeta küsmüştüm İngilizce'ye. Bu vazgeçiş dönemimden sonra...",
    },
    {
      initials: "ÇY", name: "Çağla Yorulmaz", role: "IELTS Öğrencisi",
      quote:
        "Arkadaşımın tavsiyesi üzerine Dünya Dilleri Merkezi’ne IELTS sınavına yönelik eğitim almak için görüşmeye gittiğimde IELTS sınavı hakkında detaylı bütün bilgileri benimle paylaştılar.",
    },
  ] satisfies Testimonial[],
};

/* ---------------------------------------------------------------
 * Bölüm 10 · Mektuplar / Aktiviteler / Duyurular
 * ------------------------------------------------------------- */

export type SimpleLinkCard = {
  icon: IconName;
  title: string;
  text: string;
  cta: string;
  href: string;
};

export const LETTERS_SECTION: SimpleLinkCard[] = [
  {
    icon: "mail",
    title: "Mektuplar",
    text: "Sitemizde yayınlanması için bir yorum veya bir fikriniz mi var?",
    cta: "Keşfet",
    // Eski sitede ayrı sayfa yok; canlı sitede bu kart fiilen buraya bağlanıyor.
    href: "/ogrenci-yorumlari",
  },
  {
    icon: "aktivite",
    title: "Aktiviteler",
    text: "Dünya Dilleri Merkezi Ders ve Sosyal Aktiviteleri",
    cta: "Keşfet",
    href: "/aktivite-aktiviteler",
  },
  {
    icon: "duyuru",
    title: "Duyurular",
    text: "Dünya Dilleri Merkezi Duyuru, Haber ve Kampanyaları",
    cta: "Keşfet",
    href: "/duyurular",
  },
];

/* ---------------------------------------------------------------
 * Bölüm 11 · Alt CTA şeridi
 * ------------------------------------------------------------- */

const ctaBranch = DEFAULT_BRANCH;

export const HOME_CTA_BAND = {
  title: ctaBranch.address ? `${ctaBranch.name} Merkez · ${ctaBranch.address}` : `${ctaBranch.name} Merkez`,
  sub: [ctaBranch.phone, ctaBranch.mail].filter(Boolean).join(" · "),
  primary: { label: "İletişim", href: "#iletisim" } satisfies NavLink,
  secondary: { label: "Şubelerimiz", href: "#subeler" } satisfies NavLink,
};
