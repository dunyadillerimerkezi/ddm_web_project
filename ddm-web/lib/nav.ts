import type { FooterColumn, NavItem } from "@/lib/types";
import { BRANCH_LIST } from "@/data/branches";

/**
 * Mega menü + footer link ağacı — TEK KAYNAK.
 *
 * Tasarımda bu ağaç dört şablonun her birinde ayrı ayrı kopyalanmıştı
 * (`menus()` / `footerCols`); burada bir kez duruyor.
 *
 * URL'ler `data/urls.csv`'deki gerçek eski site adreslerinden türetildi
 * (CLAUDE.md §3: slug birebir korunur, yalnız `.html` düşer).
 *
 * `href: null` olan başlıkların eski sitede karşılığı YOK. Link
 * üretilmez, düz metin gösterilir. Bu bilinçli — uydurma URL yazmayın.
 */

const YD = "/yabanci-dil-egitimleri";
const SH = "/sinav-hazirlik-egitimleri";
const YE = "/yurtdisi-egitim";
const DP = "/diger-program";

export const NAV_ITEMS: NavItem[] = [
  {
    key: "dil",
    short: "Yabancı Dil",
    label: "YABANCI DİL KURSLARI",
    promoTitle: "Türkiye’de 19 farklı dil eğitimi veren tek dil okuluyuz.",
    promoLink: { label: "Sana Uygun Yabancı Dil Kursunu Keşfet", href: `${YD}/ingilizce-kursu` },
    columns: [
      {
        title: "DİLLER",
        items: [
          { label: "İngilizce Kursu", href: `${YD}/ingilizce-kursu` },
          { label: "Almanca Kursu", href: `${YD}/almanca-kursu` },
          { label: "Fransızca Kursu", href: `${YD}/fransizca-kursu` },
          { label: "Rusça Kursu", href: `${YD}/rusca-kursu` },
          { label: "İspanyolca Kursu", href: `${YD}/ispanyolca-kursu` },
        ],
      },
      {
        title: "DİĞER DİLLER",
        items: [
          { label: "İtalyanca Kursu", href: `${YD}/italyanca-kursu` },
          { label: "Çince Kursu", href: `${YD}/cince-kursu` },
          { label: "Türkçe Kursu", href: `${YD}/yabancila-icin-turkce-kurs` },
          { label: "Flemenkçe Kursu", href: `${YD}/flemenkce-kursu` },
          { label: "İngilizce Konuşma", href: `${YD}/ingilizce-konusma-kursu` },
        ],
      },
      {
        title: "KURS BİLGİLERİ",
        items: [
          // Bu dördü ayrı sayfa DEĞİL — dil kursu sayfasının bölümleri.
          { label: "Eğitim Programı Seviyeleri", href: `${YD}/ingilizce-kursu#seviyeler` },
          { label: "Programı Gün ve Saatleri", href: `${YD}/ingilizce-kursu#kurs-takvimi` },
          { label: "Kur Sınavları", href: `${YD}/ingilizce-kursu#kur-sinavi` },
          { label: "Dil Seviyeleri", href: "/ingilizce-kurslari" },
          { label: "Sertifikalar ve Uluslararası Sınavlar", href: `${YD}/ingilizce-kursu#sertifika` },
        ],
      },
    ],
  },
  {
    key: "ing",
    short: "İngilizce",
    label: "İNGİLİZCE KURSLARI",
    promoTitle: "Yurt dışı eğitimden iş İngilizcesine, çocuklara ve çevrim içi programlar",
    promoLink: { label: "Diğer Eğitim Programlarını Keşfet", href: DP },
    columns: [
      {
        title: "PROGRAM",
        items: [
          { label: "İngilizce Eğitim Programı Seviyeleri", href: "/ingilizce-kurslari/ingilizce-egitim-sistemi" },
          { label: "İngilizce Programı Gün ve Saatleri", href: `${YD}/ingilizce-kursu#kurs-takvimi` },
          { label: "İngilizce Kur Sınavları", href: `${YD}/ingilizce-kursu#kur-sinavi` },
          { label: "İngilizce Dil Seviyeleri", href: "/ingilizce-kurslari" },
        ],
      },
      {
        title: "ÖZEL PROGRAMLAR",
        items: [
          { label: "İngilizce Konuşma", href: `${YD}/ingilizce-konusma-kursu` },
          { label: "Business English", href: `${DP}/business-english` },
          // Tasarımdaki "DDM Kids" etiketi; eski sitedeki karşılığı bu sayfa.
          { label: "DDM Kids", href: `${DP}/cocuklar-icin-ingilizce-kursu` },
          { label: "Online Dil Eğitimi", href: `${DP}/online-dil-egitimi` },
          { label: "Özel Dersler", href: `${DP}/ozel-dersler` },
        ],
      },
    ],
  },
  {
    key: "sinav",
    short: "Sınav Hazırlık",
    label: "SINAV HAZIRLIK",
    promoTitle:
      "TOEFL, IELTS, YDS, GRE, SAT, GMAT, TESTDAF/DNDS ve Proficiency programlarımızla öğrencilerimize kapsamlı destek sunuyoruz.",
    promoLink: { label: "Sana Uygun Sınav Hazırlık Programını Keşfet", href: SH },
    columns: [
      {
        title: "SINAV HAZIRLIK PROGRAMLARI",
        items: [
          { label: "TOEFL Kursu", href: `${SH}/toefl-kursu` },
          { label: "IELTS Kursu", href: `${SH}/ielts-kursu` },
          { label: "Proficiency Kursu", href: `${SH}/proficiency-kursu` },
          { label: "TESTDAF Kursu", href: `${SH}/testdaf-kursu` },
          { label: "YDS Kursu", href: `${SH}/yds-kursu` },
          { label: "GRE Kursu", href: `${SH}/gre-kursu` },
          { label: "SAT Kursu", href: `${SH}/sat-kursu` },
          { label: "GMAT Kursu", href: `${SH}/gmat-kursu` },
        ],
      },
      {
        title: "PROFICIENCY",
        items: [
          { label: "Proficiency Nedir", href: `${SH}/proficiency-kursu/proficiency-nedir` },
          { label: "Proficiency Sınavı", href: `${SH}/proficiency-kursu` },
          { label: "Örnek Sınav Soruları", href: `${SH}/proficiency-kursu/proficiency-ornek-sinav-sorulari` },
          { label: "Üniversite Hazırlık Atlama", href: `${SH}/proficiency-kursu/bogazici-universitesi` },
        ],
      },
    ],
  },
  {
    key: "yurtdisi",
    short: "Yurtdışı Eğitim",
    label: "YURTDIŞI EĞİTİM",
    promoTitle:
      "Dünya Dilleri Merkezi, KAPLAN INTERNATIONAL ve ILSC dil okullarının resmi kayıt ofisidir.",
    promoLink: { label: "Sana Uygun Yurtdışı Eğitimini Keşfet", href: YE },
    columns: [
      {
        title: "PROGRAMLAR",
        items: [
          { label: "Yurtdışı İngilizce", href: `${YE}/yurtdisi-ingilizce-egitimi` },
          { label: "Sınav Hazırlık", href: `${YE}/sinav-hazirlik` },
          { label: "Pathway Programı", href: `${YE}/pathway-programi` },
          { label: "Yüksek Öğrenim", href: `${YE}/yuksek-ogrenim` },
          { label: "Yaz Okulları", href: `${YE}/yaz-okullari` },
        ],
      },
    ],
  },
  {
    key: "diger",
    short: "Diğer Programlar",
    label: "DİĞER PROGRAMLAR",
    promoTitle: "Yurt dışı eğitimden iş İngilizcesine, çocuklara ve çevrim içi programlar",
    promoLink: { label: "Diğer Eğitim Programlarını Keşfet", href: DP },
    columns: [
      {
        title: "PROGRAMLAR",
        items: [
          { label: "Özel Dersler", href: `${DP}/ozel-dersler` },
          { label: "Business English", href: `${DP}/business-english` },
          { label: "DDM Kids", href: `${DP}/cocuklar-icin-ingilizce-kursu` },
          { label: "Yurtdışı Dil Eğitimi", href: `${YE}/yurtdisi-dil-egitimi` },
        ],
      },
    ],
  },
  {
    key: "yorum",
    short: "Öğrenci Yorumları",
    label: "ÖĞRENCİ YORUMLARI",
    promoTitle: "Sitemizde yayınlanması için bir yorum veya bir fikriniz mi var?",
    promoLink: { label: "Öğrenci Yorumlarını Oku", href: "/ogrenci-yorumlari" },
    columns: [
      {
        title: "İÇERİKLER",
        items: [
          // "Mektuplar" eski sitede ayrı sayfa DEĞİL — link üretilmiyor.
          { label: "Mektuplar", href: null },
          { label: "Aktiviteler", href: "/aktivite-aktiviteler" },
          { label: "Duyurular", href: "/duyurular" },
        ],
      },
    ],
  },
  {
    key: "subeler",
    short: "Şubeler",
    label: "ŞUBELERİMİZ",
    promoTitle: "Kadıköy Merkez · Mühürdar Cad. Akmar Çarşısı No:70 Kat:3 · 0216 330 12 17",
    promoLink: { label: "Kadıköy Şubemizi Keşfet", href: "/ddm-iletisim/1-kadikoy" },
    columns: [
      {
        title: "ŞUBELER",
        items: BRANCH_LIST.map((b) => ({
          label: b.slug === "kadikoy" ? "Kadıköy Merkez" : b.name,
          href: b.href,
        })),
      },
    ],
  },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "SINAV HAZIRLIK",
    items: [
      { label: "TOEFL Kursu", href: `${SH}/toefl-kursu` },
      { label: "IELTS Kursu", href: `${SH}/ielts-kursu` },
      { label: "Proficiency Kursu", href: `${SH}/proficiency-kursu` },
      { label: "TESTDAF Kursu", href: `${SH}/testdaf-kursu` },
      { label: "YDS Kursu", href: `${SH}/yds-kursu` },
      { label: "GRE Kursu", href: `${SH}/gre-kursu` },
      { label: "SAT Kursu", href: `${SH}/sat-kursu` },
      { label: "GMAT Kursu", href: `${SH}/gmat-kursu` },
    ],
  },
  {
    title: "YABANCI DİL KURSLARI",
    items: [
      { label: "İngilizce Kursu", href: `${YD}/ingilizce-kursu` },
      { label: "Almanca Kursu", href: `${YD}/almanca-kursu` },
      { label: "Fransızca Kursu", href: `${YD}/fransizca-kursu` },
      { label: "Rusça Kursu", href: `${YD}/rusca-kursu` },
      { label: "İspanyolca Kursu", href: `${YD}/ispanyolca-kursu` },
      { label: "İtalyanca Kursu", href: `${YD}/italyanca-kursu` },
    ],
  },
  {
    title: "ŞUBELER",
    items: BRANCH_LIST.map((b) => ({
      label: b.slug === "kadikoy" ? "Kadıköy Merkez" : b.name,
      href: b.href,
    })),
  },
  {
    title: "DİĞER PROGRAMLAR",
    items: [
      { label: "Özel Dersler", href: `${DP}/ozel-dersler` },
      { label: "Business English", href: `${DP}/business-english` },
      { label: "DDM Kids", href: `${DP}/cocuklar-icin-ingilizce-kursu` },
      { label: "Online Dil Eğitimi", href: `${DP}/online-dil-egitimi` },
      { label: "Tercüme Hizmetleri", href: `${DP}/tercume-hizmetleri` },
      { label: "Öğrenci Yorumları", href: "/ogrenci-yorumlari" },
    ],
  },
];

/** Üst barda ve footer'da geçen sabit marka satırı. */
export const BRAND_TAGLINE = "19 dilde eğitim · 2003’ten bugüne · İstanbul’da 5 şube";

export const BRAND_BLURB =
  "Türkiye’de 19 farklı dil eğitimi veren tek dil okuluyuz. 2003 yılından bugüne İstanbul’daki 5 şubemizde yabancı dil, sınav hazırlık ve yurtdışı eğitim programları.";

export const FOOTER_LEGAL_LEFT =
  "Dünya Dilleri Merkezi · Kadıköy · Bağdat Caddesi · Levent / Etiler · Ataşehir · Ümraniye";

export const FOOTER_LEGAL_RIGHT = "KAPLAN INTERNATIONAL ve ILSC resmi kayıt ofisi";
