import type { FooterColumn, NavItem } from "@/lib/types";
import { SERVING } from "@/data/company";

/**
 * Mega menü + footer link ağacı — TEK KAYNAK.
 *
 * Ağaç, canlı sitenin 2026-09-23'te çıkarılmış TAM mega menüsüdür
 * (`../docs/live-menu-2026-09-23.md`), üç kullanıcı düzeltmesiyle:
 *   1. 21 üniversite proficiency sayfası menüden çıktı; yerine tek giriş
 *      ("Üniversite Proficiency Kursları" → proficiency sayfasının
 *      `#universiteler` çapası). Üniversitelere yalnız o listeden gidilir.
 *   2. "Exclusive For Pegasus Pilots" ve `/kurumsal-dil-egitim` hub'ı ayrı
 *      sekme değil, Diğer Programlar altında.
 *   3. "Öğrenci Yorumları" sekmesi (Mektuplar/Aktiviteler/Duyurular dahil)
 *      menüden tamamen kalktı. Footer'daki link duruyor.
 *   4. (P4, 2026-09-26) "-2" "… Programı" kalemleri (18) kalktı: sayfalar
 *      yayınlanmıyor, eski adresler ana kurs sayfasına 301 (next.config.ts).
 *
 * BU DOSYA AĞACIN TAMAMINI TARİF EDER — henüz ÜRETİLMEMİŞ sayfalar dahil
 * (P4/P5: `-2`, `özel ders`, `nedir`, `online-*`, `/ingilizce-kurslari/*`,
 * `/yurtdisi-egitim/*`). Ölü link basılmaması `lib/navTree.ts`'in işi: orası
 * `lib/pageRegistry.ts`'e bakıp üretilmemiş hedeflerin href'ini düşürür.
 * Yeni faz bittiğinde menü kendiliğinden dolar — burada bir şey değişmez.
 *
 * URL'ler eski site adreslerinden türetildi (CLAUDE.md §3: slug birebir
 * korunur, yalnız `.html` düşer). Uydurma URL yazmayın.
 *
 * Şube kurs tarihi kalemlerinin etiketi menüde ŞUBE ADINA kısaltıldı
 * ("Kadıköy Şubesi TOEFL Kurs Tarihi" → "Kadıköy"); bağlamı öbek başlığı
 * ("ŞUBE KURS TARİHLERİ") veriyor, 390px'te satır taşmıyor. Sayfa içeriği
 * değil arayüz etiketi olduğu için CLAUDE.md §5 kapsamı dışında.
 */

const YD = "/yabanci-dil-egitimleri";
const SH = "/sinav-hazirlik-egitimleri";
const YE = "/yurtdisi-egitim";
const DP = "/diger-program";
const IK = "/ingilizce-kurslari";
const KD = "/kurumsal-dil-egitim";
const IL = "/ddm-iletisim";

export const NAV_ITEMS: NavItem[] = [
  {
    key: "dil",
    short: "Yabancı Dil",
    label: "YABANCI DİL KURSLARI",
    layout: "rail",
    promoTitle:
      "Türkiye’de 19 farklı dil eğitimi veren tek dil okuluyuz.",
    promoLink: { label: "Sana Uygun Yabancı Dil Kursunu Keşfet", href: "/yabanci-dil" },
    columns: [
      {
        title: "DİLLER",
        items: [
          {
            label: "İngilizce Kursu",
            href: `${YD}/ingilizce-kursu`,
            children: [
              {
                title: "PROGRAM",
                items: [
                  { label: "İngilizce Özel Ders", href: `${YD}/ingilizce-kursu/ingilizce-ozel-ders` },
                  { label: "İngilizce Eğitim Sistemi", href: `${YD}/ingilizce-kursu/ingilizce-egitim-sistemi` },
                  { label: "Online İngilizce Eğitimi", href: `${YD}/ingilizce-kursu/online-ingilizce-egitimi` },
                ],
              },
              {
                title: "ŞUBE KURS TARİHLERİ",
                items: [
                  { label: "Kadıköy", href: `${YD}/ingilizce-kursu/kadikoy-subesi-ingilizce-kurs-tarihi` },
                  { label: "Bağdat Caddesi", href: `${YD}/ingilizce-kursu/bagdat-caddesi-subesi-kurs-tarihi` },
                  { label: "Etiler", href: `${YD}/ingilizce-kursu/besiktas-subesi-kurs-tarihi` },
                  { label: "Ataşehir", href: `${YD}/ingilizce-kursu/atasehir-subesi-ingilizce-kurs-tarihi` },
                ],
              },
            ],
          },
          {
            label: "Almanca Kursu",
            href: `${YD}/almanca-kursu`,
            children: [
              {
                title: "PROGRAM",
                items: [
                  { label: "Hızlandırılmış Almanca Kursu", href: `${YD}/almanca-kursu/hizlandirilmis-almanca-kursu` },
                  { label: "Almanca Özel Ders", href: `${YD}/almanca-kursu/almanca-ozel-ders` },
                  { label: "Almanca Konuşma Kursları", href: `${YD}/almanca-kursu/almanca-konusma-kurslari` },
                  { label: "Almanca Eğitim Seviyeleri", href: `${YD}/almanca-kursu/almanca-egitim-seviyeleri` },
                  { label: "Online Almanca Eğitimi", href: `${YD}/almanca-kursu/online-almanca-egitimi` },
                ],
              },
              {
                title: "ŞUBE KURS TARİHLERİ",
                items: [
                  { label: "Kadıköy", href: `${YD}/almanca-kursu/kadikoy-subesi-almanca-kurs-tarihi` },
                  { label: "Bağdat Caddesi", href: `${YD}/almanca-kursu/bagdat-caddesi-subesi-almanca-kurs-tarihi` },
                  { label: "Etiler", href: `${YD}/almanca-kursu/besiktas-subesi-almanca-kurs-tarihi` },
                  { label: "Ataşehir", href: `${YD}/almanca-kursu/atasehir-subesi-almanca-kurs-tarihi` },
                ],
              },
            ],
          },
          {
            label: "Fransızca Kursu",
            href: `${YD}/fransizca-kursu`,
            children: [
              {
                title: "PROGRAM",
                items: [
                  { label: "Fransızca Özel Ders", href: `${YD}/fransizca-kursu/fransizca-ozel-ders` },
                  { label: "Online Fransızca Eğitimi", href: `${YD}/fransizca-kursu/online-fransizca-egitimi` },
                ],
              },
              {
                title: "ŞUBE KURS TARİHLERİ",
                items: [
                  { label: "Bağdat Caddesi", href: `${YD}/fransizca-kursu/bagdat-caddesi-subesi-fransizca-kurs-tarihi` },
                  { label: "Etiler", href: `${YD}/fransizca-kursu/besiktas-subesi-fransizca-kurs-tarihi` },
                  { label: "Ataşehir", href: `${YD}/fransizca-kursu/atasehir-subesi-fransizca-kurs-tarihi` },
                  { label: "Kadıköy", href: `${YD}/fransizca-kursu/kadikoy-subesi-fransizca-kurs-tarihi` },
                ],
              },
            ],
          },
          {
            label: "Rusça Kursu",
            href: `${YD}/rusca-kursu`,
            children: [
              {
                title: "PROGRAM",
                items: [
                  { label: "Rusça Özel Ders", href: `${YD}/rusca-kursu/rusca-ozel-ders` },
                  { label: "Online Rusça Eğitimi", href: `${YD}/rusca-kursu/online-rusca-egitimi` },
                ],
              },
              {
                title: "ŞUBE KURS TARİHLERİ",
                items: [
                  { label: "Kadıköy", href: `${YD}/rusca-kursu/kadikoy-subesi-rusca-kurs-tarihi` },
                  { label: "Bağdat Caddesi", href: `${YD}/rusca-kursu/bagdat-caddesi-subesi-rusca-kurs-tarihi` },
                  { label: "Etiler", href: `${YD}/rusca-kursu/besiktas-subesi-rusca-kurs-tarihi` },
                  { label: "Ataşehir", href: `${YD}/rusca-kursu/atasehir-subesi-rusca-kurs-tarihi` },
                ],
              },
            ],
          },
          {
            label: "İspanyolca Kursu",
            href: `${YD}/ispanyolca-kursu`,
            children: [
              {
                title: "PROGRAM",
                items: [
                  { label: "İspanyolca Özel Ders", href: `${YD}/ispanyolca-kursu/ispanyolca-ozel-ders` },
                  { label: "Online İspanyolca Eğitimi", href: `${YD}/ispanyolca-kursu/online-ispanyolca-egitimi` },
                ],
              },
              {
                title: "ŞUBE KURS TARİHLERİ",
                items: [
                  { label: "Kadıköy", href: `${YD}/ispanyolca-kursu/kadikoy-subesi-ispanyolca-kurs-tarihi` },
                  { label: "Bağdat Caddesi", href: `${YD}/ispanyolca-kursu/bagdat-caddesi-subesi-ispanyolca-kurs-tarihi` },
                  { label: "Etiler", href: `${YD}/ispanyolca-kursu/besiktas-subesi-ispanyolca-kurs-tarihi` },
                  { label: "Ataşehir", href: `${YD}/ispanyolca-kursu/atasehir-subesi-ispanyolca-kurs-tarihi` },
                ],
              },
            ],
          },
          {
            label: "İtalyanca Kursu",
            href: `${YD}/italyanca-kursu`,
            children: [
              {
                title: "PROGRAM",
                items: [
                  { label: "İtalyanca Özel Ders", href: `${YD}/italyanca-kursu/italyanca-ozel-ders` },
                  { label: "Online İtalyanca Eğitimi", href: `${YD}/italyanca-kursu/online-italyanca-egitimi` },
                ],
              },
              {
                title: "ŞUBE KURS TARİHLERİ",
                items: [
                  { label: "Kadıköy", href: `${YD}/italyanca-kursu/kadikoy-subesi-italyanca-kurs-tarihi` },
                  { label: "Bağdat Caddesi", href: `${YD}/italyanca-kursu/bagdat-caddesi-subesi-italyanca-kurs-tarihi` },
                  { label: "Etiler", href: `${YD}/italyanca-kursu/besiktas-subesi-italyanca-kurs-tarihi` },
                  { label: "Ataşehir", href: `${YD}/italyanca-kursu/atasehir-subesi-italyanca-kurs-tarihi` },
                ],
              },
            ],
          },
          {
            label: "Çince Kursu",
            href: `${YD}/cince-kursu`,
            children: [
              {
                title: "PROGRAM",
                items: [
                  { label: "Çince Özel Ders", href: `${YD}/cince-kursu/cince-ozel-ders` },
                  { label: "Çince Öğrenmek Zor mu?", href: `${YD}/cince-kursu/cince-ogrenmek-zor-mu` },
                  { label: "Online Çince Eğitimi", href: `${YD}/cince-kursu/online-cince-egitimi` },
                ],
              },
              {
                title: "ŞUBE KURS TARİHLERİ",
                items: [
                  { label: "Kadıköy", href: `${YD}/cince-kursu/kadikoy-subesi-cince-kurs-tarihi` },
                  { label: "Bağdat Caddesi", href: `${YD}/cince-kursu/bagdat-caddesi-subesi-cince-kurs-tarihi` },
                  { label: "Etiler", href: `${YD}/cince-kursu/besiktas-subesi-cince-kurs-tarihi` },
                  { label: "Ataşehir", href: `${YD}/cince-kursu/atasehir-subesi-cince-kurs-tarihi` },
                ],
              },
            ],
          },
          {
            label: "Türkçe Kursu",
            href: `${YD}/yabancila-icin-turkce-kurs`,
            children: [
              {
                title: "PROGRAM",
                items: [
                  { label: "Yabancılar İçin Türkçe Özel Ders", href: `${YD}/yabancila-icin-turkce-kurs/turkce-ozel-ders` },
                  { label: "Türkçe Eğitim Seviyeleri", href: `${YD}/yabancila-icin-turkce-kurs/turkce-egitim-seviyeleri` },
                  { label: "Online Türkçe Eğitimi", href: `${YD}/yabancila-icin-turkce-kurs/online-turkce-egitimi` },
                ],
              },
              {
                title: "ŞUBE KURS TARİHLERİ",
                items: [
                  { label: "Kadıköy", href: `${YD}/yabancila-icin-turkce-kurs/kadikoy-subesi-turkce-kurs-tarihi` },
                  { label: "Bağdat Caddesi", href: `${YD}/yabancila-icin-turkce-kurs/bagdat-caddesi-subesi-turkce-kurs-tarihi` },
                  { label: "Etiler", href: `${YD}/yabancila-icin-turkce-kurs/besiktas-subesi-turkce-kurs-tarihi` },
                  { label: "Ataşehir", href: `${YD}/yabancila-icin-turkce-kurs/atasehir-subesi-turkce-kurs-tarihi` },
                ],
              },
            ],
          },
          {
            label: "İngilizce Konuşma Kursu",
            href: `${YD}/ingilizce-konusma-kursu`,
            children: [
              {
                title: "PROGRAM",
                items: [
                  { label: "İngilizce Konuşma Özel Ders", href: `${YD}/ingilizce-konusma-kursu/ingilizce-konusma-ozel-ders` },
                ],
              },
              {
                title: "ŞUBE KURS TARİHLERİ",
                items: [
                  { label: "Kadıköy", href: `${YD}/ingilizce-konusma-kursu/kadikoy-subesi-ingilizce-konusma-kurs-tarihi` },
                  { label: "Bağdat Caddesi", href: `${YD}/ingilizce-konusma-kursu/bagdat-caddesi-subesi-ingilizce-konusma-kurs-tarihi` },
                  { label: "Etiler", href: `${YD}/ingilizce-konusma-kursu/besiktas-subesi-ingilizce-konusma-kurs-tarihi` },
                  { label: "Ataşehir", href: `${YD}/ingilizce-konusma-kursu/atasehir-subesi-ingilizce-konusma-kurs-tarihi` },
                ],
              },
            ],
          },
          { label: "Hollandaca | Flemenkçe Kursu", href: `${YD}/flemenkce-kursu` },
        ],
      },
    ],
  },
  {
    key: "ing",
    short: "İngilizce",
    label: "İNGİLİZCE KURSLARI",
    layout: "columns",
    promoTitle:
      "Başlangıçtan ileri seviyeye, sınıf seviyene göre İngilizce programları.",
    promoLink: { label: "İngilizce Kurslarını Keşfet", href: IK },
    columns: [
      {
        title: "SEVİYELER",
        items: [
          { label: "Advanced İngilizce Kursu", href: `${IK}/advanced-ingilizce-kursu` },
          { label: "Upper-Intermediate İngilizce Kursu", href: `${IK}/upper-intermediate-ingilizce-kursu` },
          { label: "Intermediate İngilizce Kursu", href: `${IK}/intermediate-ingilizce-kursu` },
          { label: "Pre-Intermediate İngilizce Kursu", href: `${IK}/pre-intermediate-ingilizce-kursu` },
          { label: "Elementary İngilizce Kursu", href: `${IK}/elementary-ingilizce-kursu` },
        ],
      },
      {
        title: "ÖZEL PROGRAMLAR",
        items: [
          { label: "Üniversite Hazırlık İngilizcesi", href: `${IK}/universite-ingilizce-kursu` },
          { label: "YKS Dil İngilizce", href: `${IK}/yks-dil-ingilizce` },
          { label: "İlköğretim İngilizcesi", href: `${IK}/ilkogretim-ingilizce-kursu` },
          { label: "Yaz Okulu İngilizce Programları", href: `${IK}/yaz-okulu-ingilizce-kursu` },
          // P5 (kullanıcı, 2026-09-27): içerik Dil Kursu sayfasıyla büyük ölçüde aynı → o sayfaya bağlanır, IK adresi 301.
          { label: "İngilizce Konuşma Kursu", href: `${YD}/ingilizce-konusma-kursu` },
          { label: "İngilizce Eğitim Sistemi", href: `${YD}/ingilizce-kursu/ingilizce-egitim-sistemi` }, // kanonik adres (P4, 2026-09-26)
        ],
      },
    ],
  },
  {
    key: "sinav",
    short: "Sınav Hazırlık",
    label: "SINAV HAZIRLIK",
    layout: "rail",
    promoTitle:
      "TOEFL, IELTS, YDS, GRE, SAT, GMAT, TESTDAF/DNDS ve Proficiency programlarımızla öğrencilerimize kapsamlı destek sunuyoruz.",
    promoLink: { label: "Sana Uygun Sınav Hazırlık Programını Keşfet", href: SH },
    columns: [
      {
        title: "SINAV PROGRAMLARI",
        items: [
          {
            label: "TOEFL Kursu",
            href: `${SH}/toefl-kursu`,
            children: [
              {
                title: "PROGRAM",
                items: [
                  { label: "TOEFL Özel Ders", href: `${SH}/toefl-kursu/toefl-ozel-ders` },
                  { label: "TOEFL Nedir?", href: `${SH}/toefl-kursu/toefl-nedir` },
                ],
              },
              {
                title: "ŞUBE KURS TARİHLERİ",
                items: [
                  { label: "Kadıköy", href: `${SH}/toefl-kursu/kadikoy-subesi-kurs-tarihi` },
                  { label: "Bağdat Caddesi", href: `${SH}/toefl-kursu/bagdat-caddesi-subesi-toefl-kurs-tarihi` },
                  { label: "Etiler", href: `${SH}/toefl-kursu/besiktas-subesi-toefl-kurs-tarihi` },
                  { label: "Ataşehir", href: `${SH}/toefl-kursu/atasehir-subesi-toefl-kurs-tarihi` },
                ],
              },
            ],
          },
          {
            label: "IELTS Kursu",
            href: `${SH}/ielts-kursu`,
            children: [
              {
                title: "PROGRAM",
                items: [
                  { label: "IELTS Özel Ders", href: `${SH}/ielts-kursu/ielts-ozel-ders` },
                  { label: "IELTS Nedir?", href: `${SH}/ielts-kursu/ielts-nedir` },
                ],
              },
              {
                title: "ŞUBE KURS TARİHLERİ",
                items: [
                  { label: "Kadıköy", href: `${SH}/ielts-kursu/kadikoy-subesi-kurs-tarihi` },
                  { label: "Bağdat Caddesi", href: `${SH}/ielts-kursu/bagdat-caddesi-subesi-kurs-tarihi` },
                  { label: "Etiler", href: `${SH}/ielts-kursu/besiktas-subesi-kurs-tarihi` },
                  { label: "Ataşehir", href: `${SH}/ielts-kursu/atasehir-subesi-kurs-tarihi` },
                ],
              },
            ],
          },
          {
            label: "TOEIC Kursu",
            href: `${SH}/toeic-kursu`,
            children: [
              {
                title: "PROGRAM",
                items: [
                  { label: "TOEIC Özel Ders", href: `${SH}/toeic-kursu/toeic-ozel-ders` },
                  { label: "TOEIC Nedir?", href: `${SH}/toeic-kursu/toeic-nedir` },
                ],
              },
              {
                title: "ŞUBE KURS TARİHLERİ",
                items: [
                  { label: "Kadıköy", href: `${SH}/toeic-kursu/kadikoy-subesi-toeic-kurs-tarihi` },
                  { label: "Bağdat Caddesi", href: `${SH}/toeic-kursu/bagdat-caddesi-subesi-toeic-kurs-tarihi` },
                  { label: "Etiler", href: `${SH}/toeic-kursu/besiktas-subesi-toeic-kurs-tarihi` },
                  { label: "Ataşehir", href: `${SH}/toeic-kursu/atasehir-subesi-toeic-kurs-tarihi` },
                ],
              },
            ],
          },
          {
            label: "YDS Kursu",
            href: `${SH}/yds-kursu`,
            children: [
              {
                title: "PROGRAM",
                items: [
                  { label: "YDS Nedir?", href: `${SH}/yds-kursu/yds-nedir` },
                  { label: "YDS Özel Ders", href: `${SH}/yds-kursu/yds-ozel-ders` },
                ],
              },
              {
                title: "ŞUBE KURS TARİHLERİ",
                items: [
                  { label: "Kadıköy", href: `${SH}/yds-kursu/kadikoy-subesi-kurs-tarihi` },
                  { label: "Bağdat Caddesi", href: `${SH}/yds-kursu/bagdat-caddesi-subesi-kurs-tarihi` },
                  { label: "Etiler", href: `${SH}/yds-kursu/besiktas-subesi-kurs-tarihi` },
                  { label: "Ataşehir", href: `${SH}/yds-kursu/atasehir-subesi-kurs-tarihi` },
                ],
              },
            ],
          },
          {
            label: "Proficiency Kursu",
            href: `${SH}/proficiency-kursu`,
            children: [
              {
                title: "PROGRAM",
                items: [
                  { label: "Proficiency Özel Ders", href: `${SH}/proficiency-kursu/proficiency-ozel-ders` },
                  { label: "Proficiency Nedir?", href: `${SH}/proficiency-kursu/proficiency-nedir` },
                  { label: "Proficiency Örnek Sınav Soruları", href: `${SH}/proficiency-kursu/proficiency-ornek-sinav-sorulari` },
                  { label: "Üniversite Proficiency Kursları", href: `${SH}/proficiency-kursu#universiteler` },
                ],
              },
              {
                title: "ŞUBE KURS TARİHLERİ",
                items: [
                  { label: "Kadıköy", href: `${SH}/proficiency-kursu/kadikoy-subesi-proficiency-kurs-tarihi` },
                  { label: "Bağdat Caddesi", href: `${SH}/proficiency-kursu/bagdat-caddesi-proficiency-subesi-kurs-tarihi` },
                  { label: "Etiler", href: `${SH}/proficiency-kursu/besiktas-subesi-proficiency-kurs-tarihi` },
                  { label: "Ataşehir", href: `${SH}/proficiency-kursu/atasehir-subesi-proficiency-kurs-tarihi` },
                ],
              },
            ],
          },
          {
            label: "GRE Kursu",
            href: `${SH}/gre-kursu`,
            children: [
              {
                title: "PROGRAM",
                items: [
                  { label: "GRE Özel Ders", href: `${SH}/gre-kursu/gre-ozel-ders` },
                  { label: "GRE Nedir?", href: `${SH}/gre-kursu/gre-nedir` },
                ],
              },
              {
                title: "ŞUBE KURS TARİHLERİ",
                items: [
                  { label: "Kadıköy", href: `${SH}/gre-kursu/kadikoy-subesi-kurs-tarihi` },
                  { label: "Bağdat Caddesi", href: `${SH}/gre-kursu/bagdat-caddesi-subesi-kurs-tarihi` },
                  { label: "Etiler", href: `${SH}/gre-kursu/besiktas-subesi-kurs-tarihi` },
                  { label: "Ataşehir", href: `${SH}/gre-kursu/atasehir-subesi-kurs-tarihi` },
                ],
              },
            ],
          },
          {
            label: "SAT Kursu",
            href: `${SH}/sat-kursu`,
            children: [
              {
                title: "PROGRAM",
                items: [
                  { label: "SAT Özel Ders", href: `${SH}/sat-kursu/sat-ozel-ders` },
                  { label: "SAT Nedir?", href: `${SH}/sat-kursu/sat-nedir` },
                ],
              },
              {
                title: "ŞUBE KURS TARİHLERİ",
                items: [
                  { label: "Kadıköy", href: `${SH}/sat-kursu/kadikoy-subesi-sat-kurs-tarihi` },
                  { label: "Bağdat Caddesi", href: `${SH}/sat-kursu/bagdat-caddesi-subesi-sat-kurs-tarihi` },
                  { label: "Etiler", href: `${SH}/sat-kursu/besiktas-subesi-sat-kurs-tarihi` },
                  { label: "Ataşehir", href: `${SH}/sat-kursu/atasehir-subesi-sat-kurs-tarihi` },
                ],
              },
            ],
          },
          {
            label: "GMAT Kursu",
            href: `${SH}/gmat-kursu`,
            children: [
              {
                title: "PROGRAM",
                items: [
                  { label: "GMAT Özel Ders", href: `${SH}/gmat-kursu/gmat-ozel-ders` },
                  { label: "GMAT Nedir?", href: `${SH}/gmat-kursu/gmat-nedir` },
                ],
              },
              {
                title: "ŞUBE KURS TARİHLERİ",
                items: [
                  { label: "Kadıköy", href: `${SH}/gmat-kursu/kadikoy-subesi-gmat-kurs-tarihi` },
                  { label: "Bağdat Caddesi", href: `${SH}/gmat-kursu/bagdat-caddesi-gmat-subesi-kurs-tarihi` },
                  { label: "Etiler", href: `${SH}/gmat-kursu/besiktas-subesi-gmat-kurs-tarihi` },
                  { label: "Ataşehir", href: `${SH}/gmat-kursu/atasehir-subesi-gmat-kurs-tarihi` },
                ],
              },
            ],
          },
          {
            label: "PTE Kursu",
            href: `${SH}/academic-pte`,
            children: [
              {
                title: "PROGRAM",
                items: [
                  { label: "PTE Akademik Özel Ders", href: `${SH}/academic-pte/pte-akademik-ozel-ders` },
                ],
              },
            ],
          },
          { label: "IELTS Life Skills A1", href: `${SH}/ingiltere-vize-sinavi-ingilizce-a1kursu` },
          {
            label: "Almanca Aile Birleşimi Kursu",
            href: `${SH}/aile-birlesimi-egitimi`,
            children: [
              {
                title: "PROGRAM",
                items: [
                  { label: "A1 Sınav Örneği", href: `${SH}/aile-birlesimi-egitimi/a1-sinav-ornegi` },
                ],
              },
              {
                title: "ŞUBE KURS TARİHLERİ",
                items: [
                  { label: "Kadıköy", href: `${SH}/aile-birlesimi-egitimi/kadikoy-subesi-aile-birlesimi-kurs-tarihi` },
                  { label: "Bağdat Caddesi", href: `${SH}/aile-birlesimi-egitimi/bagdat-caddesi-subesi-aile-birlesimi-kurs-tarihi` },
                  { label: "Etiler", href: `${SH}/aile-birlesimi-egitimi/besiktas-subesi-aile-birlesimi-kurs-tarihi` },
                  { label: "Ataşehir", href: `${SH}/aile-birlesimi-egitimi/atasehir-subesi-aile-birlesimi-kurs-tarihi` },
                ],
              },
            ],
          },
          { label: "YÖKDİL Kursu", href: `${SH}/yokdil-sinavi-kursu` },
          { label: "TOEFL Primary", href: `${SH}/cocuklar-icin-toefl-primary-egitimi` },
          { label: "TESTDAF Kursu", href: `${SH}/testdaf-kursu` },
          { label: "TOEFL Essentials Kursu", href: `${SH}/toefl-essentials-kursu` },
          { label: "Fransızca Aile Birleşimi Kursu", href: `${SH}/fransizca-aile-birlesimi-kursu` },
        ],
      },
    ],
  },
  {
    key: "yurtdisi",
    short: "Yurtdışı Eğitim",
    label: "YURTDIŞI EĞİTİM",
    layout: "columns",
    promoTitle:
      "Dünya Dilleri Merkezi, KAPLAN INTERNATIONAL ve ILSC dil okullarının resmi kayıt ofisidir.",
    promoLink: { label: "Sana Uygun Yurtdışı Eğitimini Keşfet", href: YE },
    columns: [
      {
        title: "EĞİTİM PROGRAMLARI",
        items: [
          {
            label: "Yurtdışı İngilizce Eğitimi",
            href: `${YE}/yurtdisi-ingilizce-egitimi`,
            children: [
              {
                title: null,
                items: [
                  { label: "Kanada Vancouver", href: `${YE}/yurtdisi-ingilizce-egitimi/kanada-vancouver` },
                  // P4 (kullanıcı, 2026-09-26): içerik "İngiltere'de Dil Okulları" — yanlış adres (…/kanada-vancouver-2) 301 ile buraya.
                  { label: "İngiltere", href: `${YE}/yurtdisi-ingilizce-egitimi/ingiltere` },
                ],
              },
            ],
          },
          { label: "Yüksek Öğrenim", href: `${YE}/yuksek-ogrenim` },
          { label: "Sınav Hazırlık", href: `${YE}/sinav-hazirlik` },
          { label: "Yaz Okulları", href: `${YE}/yaz-okullari` },
        ],
      },
      {
        title: "FIRSATLAR VE ÜLKELER",
        items: [
          { label: "Pathway Programı", href: `${YE}/pathway-programi` },
          // P4 (kullanıcı, 2026-09-26): içeriği Yurtdışı Eğitim ana sayfasında → eski adres 301.
          { label: "Yurtdışı Dil Eğitimi", href: YE },
          { label: "Work and Travel", href: `${YE}/work-and-travel` },
          {
            label: "Yurtdışı Tercih Edilen Ülkeler",
            // P4 (kullanıcı, 2026-09-26): ülke listesi ana sayfanın ülke tablosunda → eski adres 301.
            href: `${YE}#ulkeler`,
            children: [
              {
                title: null,
                items: [
                  { label: "İtalya'da Üniversite", href: `${YE}/tercih/italyadauniversite` },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: "diger",
    short: "Diğer Programlar",
    label: "DİĞER PROGRAMLAR",
    layout: "columns",
    promoTitle:
      "Yurt dışı eğitimden iş İngilizcesine, çocuklara ve çevrim içi programlar.",
    promoLink: { label: "Diğer Eğitim Programlarını Keşfet", href: DP },
    columns: [
      {
        title: "PROGRAMLAR",
        items: [
          // P4 (kullanıcı, 2026-09-26): eski sayfa Work and Travel'ın kopyası (301); kalem Yurtdışı Eğitim ana sayfasına.
          { label: "Yurtdışı Eğitim", href: YE },
          { label: "Business English", href: `${DP}/business-english` },
          { label: "Özel Dersler", href: `${DP}/ozel-dersler` },
          { label: "Çocuklar İçin İngilizce Kursu", href: `${DP}/cocuklar-icin-ingilizce-kursu` },
          { label: "Online Dil Eğitimi", href: `${DP}/online-dil-egitimi` },
          { label: "Tercüme Hizmetleri", href: `${DP}/tercume-hizmetleri` },
        ],
      },
      {
        title: "KURUMSAL",
        items: [
          {
            label: "Kurumsal Dil Eğitimi",
            href: KD,
            children: [
              {
                title: null,
                items: [
                  { label: "Exclusive For Pegasus Pilots", href: `${KD}/turkish-course-pegasus-pilots` },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: "iletisim",
    short: "İletişim",
    label: "İLETİŞİM",
    layout: "columns",
    // Kadıköy adresi / telefonu yazmaz (kullanıcı, 2026-10-01) — şube iletişimi şubelerin kendi sayfalarında.
    promoTitle: "İstanbul’daki 5 şubemizden size en yakın olanı seçin.",
    promoLink: { label: "Tüm Şubelerimizi Gör", href: IL },
    columns: [
      {
        title: "ŞUBELER",
        items: [
          { label: "Bağdat Caddesi Şubesi", href: `${IL}/iletisim-2-bagdat-caddesi` },
          { label: "Ataşehir Şubesi", href: `${IL}/4-atasehir` },
          { label: "Ümraniye Şubesi", href: `${IL}/umraniye` },
          { label: "Etiler Şubesi", href: `${IL}/3-levent` },
          { label: "Kadıköy Şubesi", href: `${IL}/1-kadikoy` },
        ],
      },
      {
        title: "KURUMSAL",
        items: [
          { label: "İş Başvurusu / Kariyer", href: `${IL}/is-basvurusu-kariyer`, soon: true },
        ],
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

export const BRAND_BLURB = `Türkiye’de 19 farklı dil eğitimi veren tek dil okuluyuz. ${SERVING} İstanbul’daki 5 şubemizde yabancı dil, sınav hazırlık ve yurtdışı eğitim programları.`;

/** Footer'daki tek iletişim: kurumsal mail (kullanıcı, 2026-10-01). */
export const CORPORATE_MAIL = "info@dunyadillerimerkezi.com";

/** Footer alt satırı (kullanıcı, 2026-10-01): şube adları ve "KAPLAN INTERNATIONAL ve ILSC resmi kayıt ofisi" kalktı. */
export const FOOTER_LEGAL = "Dünya Dilleri Merkezi Yabancı Dil Okulları. Tüm hakları saklıdır.";
