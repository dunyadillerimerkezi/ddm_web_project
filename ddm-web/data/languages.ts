/**
 * Faz 6.4 — 10 dil sayfasının TEK kaynağı.
 *
 * Gövde metni burada YOKTUR (CLAUDE.md §5) — yalnız `site_content.json`daki
 * başlıklara giden referanslar, `urls.csv`den doğrulanmış href'ler ve kaynakta
 * birebir geçen sayısal olgular (kur/saat/grup). `lib/languageContent.ts`teki
 * `getLanguagePage()` bu eşlemeyi build zamanında gerçek metinle birleştirir;
 * bir satır kaybolursa veya bir başlık artık kaynakta yoksa `throw` ile build
 * düşer (bkz. `SectionResolver.assertCoverage`).
 *
 * Kaynak: `ddm-web/data/site_content.json` (2026-09 yeniden yazımı — 10 dilin
 * de metni ortak bir bölüm iskeletine oturdu, bkz. plan §1 roller A–K).
 * Href doğrulaması: `ddm-web/data/urls.csv`.
 *
 * BİLİNEN SAPMA — İngilizce kaydı: önceki bir içerik oturumundan "ara halde"
 * kaldı. Üç artık var: (1) gövdesiz bir "İngilizce Kursu" h2'si, (2) D
 * (sertifika) başlığının altında kullanılmayan 5 fazladan satır
 * ("Başlangıç Seviyesi İngilizce | Beginner" vb.) ve (3) K (şube plan
 * tablosu) bölümünün kendisi hiç yok. Gövde metnine dokunulmadı (§5); artıklar
 * `ignored[]`de gerekçeyle listeleniyor. Kayıt düzeltilirse bu blok
 * güncellenecek.
 */

import type { LanguageContentMap, LanguageDef } from "@/lib/languageContent";

const YD = "/yabanci-dil-egitimleri";

/* ---------------------------------------------------------------
 * İngilizce — ingilizce-kursu (K yok, D altında 5 artık satır, "İngilizce
 * Kursu" h2'si gövdesiz)
 * ------------------------------------------------------------- */
const en: LanguageContentMap = {
  heroLead: { heading: "İngilizce Kursu Eğitim Sistemi ve Ders Fiyatları" },
  about: { heading: "İngilizce Eğitim Programı Hakkında Bilgi" },
  programSchedule: { heading: "Size Uygun İngilizce Ders Programını Seçin" },
  certification: { heading: "İngilizce Kur Sınavları ve Uluslararası Sertifikalar", take: [0, 1] },
  whyLearn: { heading: "Neden İngilizce Öğrenmelisiniz?" },
  whyChooseDDM: { heading: "Neden Dünya Dilleri Merkezi'ni Tercih Etmelisiniz?" },
  levelGroups: [
    { name: "Beginner", range: "A1 – A2", heading: "Beginner (A1 – A2)" },
    { name: "Intermediate", range: "B1 – B2", heading: "Intermediate (B1 – B2)" },
    { name: "Advanced", range: "C1 – C2", heading: "Advanced (C1 – C2)" },
  ],
  levelGroupsHeading: "İngilizce Eğitim Seviyeleri Programı İçeriği Nedir?",
  whoCanJoin: { heading: "İngilizce Kurslarımıza Kimler Katılabilir?", introTake: null },
  teachingModel: { heading: "İngilizce Derslerinde Eğitim Modelimiz" },
  pricing: { heading: "İngilizce Kurs ve Özel Ders Fiyatları", planIndexes: [0, 1], noteIndexes: [2, 3] },
  branchLinks: null,
  ignored: [
    "İngilizce Kursu", // gövdesiz h2 — bir sonraki başlık hemen ardından geliyor
    // D başlığının altında kalan artık satırlar (eski oturumdan) — gövde
    // metnine dokunulmadı, yalnız hangi slota gideceği belirsiz kaldı.
    "Başlangıç Seviyesi İngilizce | Beginner",
    "Orta Altı Seviye İngilizce | Pre-İntermediate",
    "Orta İleri Seviye İngilizce | Upper-İntermediate",
    "Proficiency Seviyesi İngilizce | Yeterlik Sınavı",
    "Akademik İngilizce | IELTS ve TOEFL",
  ],
};

/* ---------------------------------------------------------------
 * Almanca — almanca-kursu
 * ------------------------------------------------------------- */
const de: LanguageContentMap = {
  heroLead: { heading: "Almanca Kursu Eğitim Sistemi ve Ders Fiyatları" },
  about: { heading: "Almanca Dil Eğitim Programı Hakkında Bilgi" },
  programSchedule: { heading: "Size Uygun Almanca Ders Programını Seçin" },
  certification: { heading: "Almanca Seviyesi Kur Sınavları ve Uluslararası Sertifikalar" },
  whyLearn: { heading: "Neden Almanca Öğrenmelisiniz?" },
  whyChooseDDM: { heading: "Neden Dünya Dilleri Merkezi'ni Tercih Etmelisiniz?" },
  levelGroups: [
    { name: "Anfängerniveau", range: "A1 – A2", heading: "Anfängerniveau (A1 – A2)" },
    { name: "Mittleres Niveau", range: "B1 – B2", heading: "Mittleres Niveau (B1 – B2)" },
    { name: "Fortgeschrittenes Niveau", range: "C1 – C2", heading: "Fortgeschrittenes Niveau (C1 – C2)" },
  ],
  levelGroupsHeading: "Almanca Eğitim Seviyeleri Kur Program İçeriği Nedir?",
  whoCanJoin: { heading: "Almanca Kurslarımıza Kimler Katılabilir?", introTake: null },
  teachingModel: { heading: "Almanca Derslerinde Eğitim Modelimiz" },
  pricing: { heading: "Almanca Kurs ve Özel Ders Fiyatları", planIndexes: [0, 1], noteIndexes: [2, 3] },
  branchLinks: {
    heading: "Almanca Eğitim Programı ve Kurs Tarihleri",
    extraLinks: [
      { label: "Hızlandırılmış Almanca Kursu", href: `${YD}/almanca-kursu/hizlandirilmis-almanca-kursu` },
      { label: "Almanca Konuşma Kursları", href: `${YD}/almanca-kursu/almanca-konusma-kurslari` },
      { label: "Almanca Özel Ders Birebir Kurs Programları", href: `${YD}/almanca-kursu/almanca-ozel-ders` },
    ],
    branchHrefs: [
      `${YD}/almanca-kursu/kadikoy-subesi-almanca-kurs-tarihi`,
      `${YD}/almanca-kursu/bagdat-caddesi-subesi-almanca-kurs-tarihi`,
      `${YD}/almanca-kursu/besiktas-subesi-almanca-kurs-tarihi`,
      `${YD}/almanca-kursu/atasehir-subesi-almanca-kurs-tarihi`,
    ],
  },
  ignored: [],
};

/* ---------------------------------------------------------------
 * Fransızca — fransizca-kursu
 * ------------------------------------------------------------- */
const fr: LanguageContentMap = {
  heroLead: { heading: "Fransızca Kursu Eğitim Sistemi ve Ders Fiyatları" },
  about: { heading: "Fransızca Eğitim Programı Hakkında Bilgi" },
  programSchedule: { heading: "Size Uygun Fransızca Ders Programını Seçin" },
  certification: { heading: "Fransızca Kur Sınavları ve Uluslararası Sınavlar" },
  whyLearn: { heading: "Neden Fransızca Öğrenmelisiniz?" },
  whyChooseDDM: { heading: "Neden Dünya Dilleri Merkezi'ni Tercih Etmelisiniz?" },
  levelGroups: [
    { name: "Niveau Débutant", range: "A1 – A2", heading: "Niveau Débutant (A1 – A2)" },
    { name: "Niveau İntermédiaire", range: "B1 – B2", heading: "Niveau İntermédiaire (B1 – B2)" },
    { name: "Niveau Avancé", range: "C1 – C2", heading: "Niveau Avancé (C1 – C2)" },
  ],
  levelGroupsHeading: "Fransızca Eğitimi Kur Programı İçeriği Nedir?",
  whoCanJoin: { heading: "Fransızca Kurslarımıza Kimler Katılabilir?", introTake: null },
  teachingModel: { heading: "Fransızca Derslerinde Eğitim Modelimiz" },
  pricing: { heading: "Fransızca Kurs ve Özel Ders Fiyatları", planIndexes: [0, 1], noteIndexes: [2, 3] },
  branchLinks: {
    heading: "Fransızca Eğitim Plan Tablosu ve Kurs Tarihleri",
    branchHrefs: [
      `${YD}/fransizca-kursu/kadikoy-subesi-fransizca-kurs-tarihi`,
      `${YD}/fransizca-kursu/bagdat-caddesi-subesi-fransizca-kurs-tarihi`,
      `${YD}/fransizca-kursu/besiktas-subesi-fransizca-kurs-tarihi`,
      `${YD}/fransizca-kursu/atasehir-subesi-fransizca-kurs-tarihi`,
    ],
  },
  ignored: [],
};

/* ---------------------------------------------------------------
 * İtalyanca — italyanca-kursu (pilot dil, plan §11)
 * ------------------------------------------------------------- */
const it: LanguageContentMap = {
  heroLead: { heading: "İtalyanca Kursu Eğitim Sistemi ve Ders Fiyatları" },
  about: { heading: "İtalyanca Eğitim Programı Hakkında Bilgi" },
  programSchedule: { heading: "Size Uygun İtalyanca Ders Programını Seçin" },
  certification: { heading: "İtalyanca Düzeyi Sertifikaları ve Uluslararası Sınavlar" },
  whyLearn: { heading: "Neden İtalyanca Öğrenmelisiniz?" },
  whyChooseDDM: { heading: "Neden Dünya Dilleri Merkezi'ni Tercih Etmelisiniz?" },
  levelGroups: [
    { name: "Livello Principiante", range: "A1 – A2", heading: "Livello Principiante (A1 – A2)" },
    { name: "Livello İntermedio", range: "B1 – B2", heading: "Livello İntermedio (B1 – B2)" },
    { name: "Livello Avanzato", range: "C1 – C2", heading: "Livello Avanzato (C1 – C2)" },
  ],
  levelGroupsHeading: "İtalyanca Eğitimi Kur Program İçeriği Nedir?",
  whoCanJoin: { heading: "İtalyanca Kurslarımıza Kimler Katılabilir?", introTake: null },
  teachingModel: { heading: "İtalyanca Derslerinde Eğitim Modelimiz" },
  pricing: { heading: "İtalyanca Kurs ve Özel Ders Fiyatları", planIndexes: [0, 1], noteIndexes: [2, 3] },
  branchLinks: {
    heading: "İtalyanca Eğitim Plan Tablosu ve Kurs Tarihleri",
    branchHrefs: [
      `${YD}/italyanca-kursu/kadikoy-subesi-italyanca-kurs-tarihi`,
      `${YD}/italyanca-kursu/bagdat-caddesi-subesi-italyanca-kurs-tarihi`,
      `${YD}/italyanca-kursu/besiktas-subesi-italyanca-kurs-tarihi`,
      `${YD}/italyanca-kursu/atasehir-subesi-italyanca-kurs-tarihi`,
    ],
  },
  ignored: [
    // Fiyatlandırma başlığının altındaki iç link etiket satırı — tek tek
    // sayfaları bu fazın kapsamında değil, ayrı bir link mekanizması yok.
    "İtalyanca Kursu | İtalyanca Özel Ders | Kampanyalı İtalyanca Kursları | Hızlandırılmış İtalyanca Eğitimi | Online İtalyanca Kursu | İtalyanca Eğitim Seviyeleri | İtalyanca Öğrenmek Zor Mu? | İtalyan Kültürü",
  ],
};

/* ---------------------------------------------------------------
 * İspanyolca — ispanyolca-kursu
 * ------------------------------------------------------------- */
const es: LanguageContentMap = {
  heroLead: { heading: "İspanyolca Kursu Eğitim Sistemi ve Ders Fiyatları" },
  about: { heading: "İspanyolca Eğitim Programı Hakkında Bilgi" },
  programSchedule: { heading: "Size Uygun İspanyolca Ders Programını Seçin" },
  certification: { heading: "İspanyolca Düzeyi Kur Sınav Sertifikaları ve Uluslararası Sınavlar" },
  whyLearn: { heading: "Neden İspanyolca Öğrenmelisiniz?" },
  whyChooseDDM: { heading: "Neden Dünya Dilleri Merkezi'ni Tercih Etmelisiniz?" },
  levelGroups: [
    { name: "Nivel Principiante", range: "A1 – A2", heading: "Nivel Principiante (A1 – A2)" },
    { name: "Nivel İntermedio", range: "B1 – B2", heading: "Nivel İntermedio (B1 – B2)" },
    { name: "Nivel Avanzado", range: "C1 – C2", heading: "Nivel Avanzado (C1 – C2)" },
  ],
  levelGroupsHeading: "İspanyolca Eğitimi Kur Programı İçeriği Nedir?",
  whoCanJoin: { heading: "İspanyolca Kurslarımıza Kimler Katılabilir?", introTake: null },
  teachingModel: { heading: "İspanyolca Derslerinde Eğitim Modelimiz" },
  pricing: { heading: "İspanyolca Kurs ve Özel Ders Fiyatları", planIndexes: [0, 1], noteIndexes: [2, 3] },
  branchLinks: {
    heading: "İspanyolca Eğitim Plan Tablosu ve Kurs Tarihleri",
    branchHrefs: [
      `${YD}/ispanyolca-kursu/kadikoy-subesi-ispanyolca-kurs-tarihi`,
      `${YD}/ispanyolca-kursu/bagdat-caddesi-subesi-ispanyolca-kurs-tarihi`,
      `${YD}/ispanyolca-kursu/besiktas-subesi-ispanyolca-kurs-tarihi`,
      `${YD}/ispanyolca-kursu/atasehir-subesi-ispanyolca-kurs-tarihi`,
    ],
  },
  ignored: [],
};

/* ---------------------------------------------------------------
 * Rusça — rusca-kursu
 * ------------------------------------------------------------- */
const ru: LanguageContentMap = {
  heroLead: { heading: "Rusça Kursu Eğitim Sistemi ve Ders Fiyatları" },
  about: { heading: "Rusça Eğitim Programı Hakkında Bilgi" },
  programSchedule: { heading: "Size Uygun Rusça Ders Programı Hangisi?" },
  certification: { heading: "Rusça Düzeyi Sertifikaları ve Uluslararası Sınavlar" },
  whyLearn: { heading: "Neden Rusça Öğrenmelisiniz?" },
  whyChooseDDM: { heading: "Neden Dünya Dilleri Merkezi'ni Tercih Etmelisiniz?" },
  levelGroups: [
    { name: "Начальный уровень", range: "A1 – A2", heading: "Начальный уровень (A1 – A2)" },
    { name: "Средний уровень", range: "B1 – B2", heading: "Средний уровень (B1 – B2)" },
    { name: "Продвинутый уровень", range: "C1 – C2", heading: "Продвинутый уровень (C1 – C2)" },
  ],
  levelGroupsHeading: "Rusça Eğitim Seviyeleri Kur Program İçeriği Nedir?",
  whoCanJoin: { heading: "Rusça Kurslarımıza Kimler Katılabilir?", introTake: null },
  teachingModel: { heading: "Rusça Derslerinde Eğitim Modelimiz" },
  pricing: { heading: "Rusça Kurs ve Özel Ders Fiyatları", planIndexes: [0, 1], noteIndexes: [2, 3] },
  branchLinks: {
    heading: "Rusça Eğitim Plan Tablosu ve Kurs Tarihleri",
    branchHrefs: [
      `${YD}/rusca-kursu/kadikoy-subesi-rusca-kurs-tarihi`,
      `${YD}/rusca-kursu/bagdat-caddesi-subesi-rusca-kurs-tarihi`,
      `${YD}/rusca-kursu/besiktas-subesi-rusca-kurs-tarihi`,
      `${YD}/rusca-kursu/atasehir-subesi-rusca-kurs-tarihi`,
    ],
  },
  ignored: [],
};

/* ---------------------------------------------------------------
 * Çince — cince-kursu (G yok — seviye grubu bölümü yok)
 * ------------------------------------------------------------- */
const zh: LanguageContentMap = {
  heroLead: { heading: "Çince Kursu Eğitim Sistemi ve Ders Fiyatları" },
  about: { heading: "Çince Eğitim Programı Hakkında Bilgi" },
  programSchedule: { heading: "Size Uygun Çince Ders Programını Seçin" },
  certification: { heading: "Çince Düzeyi Sertifikaları ve Uluslararası Sınavlar" },
  whyLearn: { heading: "Neden Çince Öğrenmelisiniz?" },
  whyChooseDDM: { heading: "Neden Dünya Dilleri Merkezi'ni Tercih Etmeliyim?" },
  levelGroups: [],
  levelGroupsHeading: null,
  whoCanJoin: { heading: "Çince Kurslarımıza Kimler Katılabilir?", introTake: null },
  teachingModel: { heading: "Çince Derslerinde Eğitim Modelimiz" },
  pricing: { heading: "Çince Kurs ve Özel Ders Fiyatları", planIndexes: [0, 1], noteIndexes: [2, 3] },
  branchLinks: {
    heading: "Çince Eğitim Plan Tablosu ve Kurs Tarihleri",
    extraLinks: [{ label: "Çince Öğrenmek Zor mu?", href: `${YD}/cince-kursu/cince-ogrenmek-zor-mu` }],
    branchHrefs: [
      `${YD}/cince-kursu/kadikoy-subesi-cince-kurs-tarihi`,
      `${YD}/cince-kursu/bagdat-caddesi-subesi-cince-kurs-tarihi`,
      `${YD}/cince-kursu/besiktas-subesi-cince-kurs-tarihi`,
      `${YD}/cince-kursu/atasehir-subesi-cince-kurs-tarihi`,
    ],
  },
  ignored: [],
  // Genel bilgi yanlışları (kullanıcı onayı, 2026-09-26) — aynı iki cümle `cince-ogrenmek-zor-mu`da da düzeltildi.
  // Ethnologue: ana dilde 1. Mandarin, ana + ikinci dilde 1. İngilizce — https://www.ethnologue.com/insights/most-spoken-language/
  // "İki milyar" doğrulanamadı → çıkarıldı. Özne düşük cümle ("Gelişmekte ve…") "Çin," ile tamamlandı.
  // "İngiltere ve ABD'de en çok talep edilen dil" yanlış (MLA 2021: ABD'de 6.; gov.uk GCSE 2025: İspanyolca/Fransızca önde)
  // → British Council "Languages for the Future" (2017): İngiltere'nin en çok ihtiyaç duyduğu 5 dilden biri
  // — https://www.britishcouncil.org/research-insight/languages-future-2017
  edits: {
    "Dünya üzerinde en çok konuşulan dil Çince'dir. Dünya'da iki milyar insan Çince konuşmaktadır. Gelişmekte ve ekonomisiyle dünyanın süper gücü olma yolunda emin adımlarla ilerlemektedir. Özellikle Türkiye ile Çin Halk Cumhuriyeti arasındaki siyasi, ekonomik ve kültürel ilişkiler gün geçtikçe daha da gelişmektedir. Çin ile ilişkilerde daha verimli sonuçlar alınabilmesi için mutlaka Çince öğrenilmelidir.":
      "Ana dili olarak en çok konuşulan dil Mandarin Çincesidir; ikinci dil olarak konuşanlar da sayıldığında İngilizceden sonra ikinci sıradadır. Çin, ekonomisiyle dünyanın süper gücü olma yolunda emin adımlarla ilerlemektedir. Özellikle Türkiye ile Çin Halk Cumhuriyeti arasındaki siyasi, ekonomik ve kültürel ilişkiler gün geçtikçe daha da gelişmektedir. Çin ile ilişkilerde daha verimli sonuçlar alınabilmesi için mutlaka Çince öğrenilmelidir.",
    "İngiltere ve ABD'de, Çince en çok talep edilen yabancı dil olduğu bilinmektedir. Bu doğrultuda Türkiye'de de talep hızla artıyor. Yakın gelecekte daha da önemli hale gelecek olan Çince'yi öğrenmenin gençler için çok önemli bir yatırım olduğu birçok önemli iş adamları tarafından belirtiliyor.":
      "British Council'ın \"Languages for the Future\" raporu, Mandarin Çincesini İngiltere'nin gelecekte en çok ihtiyaç duyacağı beş dil arasında sayar. Bu doğrultuda Türkiye'de de talep hızla artıyor. Yakın gelecekte daha da önemli hale gelecek olan Çince'yi öğrenmenin gençler için çok önemli bir yatırım olduğu birçok önemli iş adamları tarafından belirtiliyor.",
  },
};

/* ---------------------------------------------------------------
 * Flemenkçe — flemenkce-kursu (E, G, K yok — en kısa iskelet)
 * ------------------------------------------------------------- */
const nl: LanguageContentMap = {
  heroLead: { heading: "Hollandaca | Felemenkçe Kursu" },
  about: { heading: "Hollandaca | Felemenkçe Eğitim Programı Hakkında Bilgi" },
  programSchedule: { heading: "Size Uygun Hollandaca | Felemenkçe Ders Programını Seçin" },
  certification: { heading: "Hollandaca | Felemenkçe Düzeyi Kur Sertifikaları ve Uluslararası Sınavlar" },
  whyLearn: null,
  whyChooseDDM: { heading: "Neden Dünya Dilleri Merkezi'ni Tercih Etmelisiniz?" },
  levelGroups: [],
  levelGroupsHeading: null,
  whoCanJoin: { heading: "Hollandaca | Felemenkçe Kurslarımıza Kimler Katılabilir?", introTake: null },
  teachingModel: { heading: "Hollandaca | Felemenkçe Derslerinde Eğitim Modelimiz" },
  pricing: { heading: "Hollandaca - Flemenkçe Kurs ve Özel Ders Fiyatları", planIndexes: [0, 1], noteIndexes: [2, 3] },
  branchLinks: null,
  ignored: [],
};

/* ---------------------------------------------------------------
 * Türkçe (yabancılar için) — yabancila-icin-turkce-kurs (E, G yok)
 * ------------------------------------------------------------- */
const tr: LanguageContentMap = {
  heroLead: { heading: "Türkçe Kursu Eğitim Sistemi ve Ders Fiyatları" },
  about: { heading: "Türkçe Dil Eğitim Programı Hakkında Bilgi" },
  programSchedule: { heading: "Size Uygun Türkçe Ders Programını Seçin" },
  certification: { heading: "Türkçe Düzeyi Sertifikaları ve Uluslararası Sınavlar" },
  whyLearn: null,
  whyChooseDDM: { heading: "Neden Dünya Dilleri Merkezi'ni Tercih Etmeliyim?" },
  levelGroups: [],
  levelGroupsHeading: null,
  whoCanJoin: { heading: "Türkçe Kurslarımıza Kimler Katılabilir?", introTake: null },
  teachingModel: { heading: "Türkçe Derslerinde Eğitim Modelimiz" },
  pricing: { heading: "Türkçe Kurs ve Özel Ders Fiyatları", planIndexes: [0, 1], noteIndexes: [2, 3] },
  branchLinks: {
    heading: "Türkçe Eğitim Plan Tablosu ve Kurs Tarihleri",
    extraLinks: [{ label: "Türkçe Eğitim Seviyeleri", href: `${YD}/yabancila-icin-turkce-kurs/turkce-egitim-seviyeleri` }],
    branchHrefs: [
      `${YD}/yabancila-icin-turkce-kurs/kadikoy-subesi-turkce-kurs-tarihi`,
      `${YD}/yabancila-icin-turkce-kurs/bagdat-caddesi-subesi-turkce-kurs-tarihi`,
      `${YD}/yabancila-icin-turkce-kurs/besiktas-subesi-turkce-kurs-tarihi`,
      `${YD}/yabancila-icin-turkce-kurs/atasehir-subesi-turkce-kurs-tarihi`,
    ],
  },
  ignored: [
    "Türkçe Kursu | Türkçe Özel Ders | Türkçe Eğitim Seviyeleri | Türkçe Öğrenmek Zor mu? | Kampanyalı Türkçe Kursları",
  ],
  // Kaynakta kopyala-yapıştır hatası: Türkçe sayfasında "Korece" (kullanıcı onayı, 2026-09-25).
  edits: {
    "Yüz yüze Korece eğitimleri": "Yüz yüze Türkçe eğitimleri",
  },
};

/* ---------------------------------------------------------------
 * İngilizce Konuşma — ingilizce-konusma-kursu (D, E, G, H yok — en kısa dil)
 * ------------------------------------------------------------- */
const speak: LanguageContentMap = {
  heroLead: { heading: "İngilizce Konuşma Kursu İstanbul (Speaking Course)" },
  about: { heading: "İngilizce Konuşma Kursu Eğitim Programı Hakkında Bilgi" },
  programSchedule: { heading: "Size Uygun İngilizce Konuşma Ders Programını Seçin" },
  certification: null,
  whyLearn: null,
  whyChooseDDM: { heading: "Neden Dünya Dilleri Merkezi İngilizce Konuşma Kursu?" },
  levelGroups: [],
  levelGroupsHeading: null,
  whoCanJoin: null,
  teachingModel: { heading: "İngilizce Konuşma Derslerinde Eğitim Modelimiz" },
  pricing: { heading: "İngilizce Konuşma Kurs ve Özel Ders Fiyatları", planIndexes: [0, 1], noteIndexes: [2, 3] },
  branchLinks: {
    heading: "İngilizce Konuşma Eğitim Plan Tablosu ve Kurs Tarihleri",
    extraLinks: [
      { label: "Speaking İngilizce Konuşma Özel Ders", href: `${YD}/ingilizce-konusma-kursu/ingilizce-konusma-ozel-ders` },
    ],
    branchHrefs: [
      `${YD}/ingilizce-konusma-kursu/kadikoy-subesi-ingilizce-konusma-kurs-tarihi`,
      `${YD}/ingilizce-konusma-kursu/bagdat-caddesi-subesi-ingilizce-konusma-kurs-tarihi`,
      `${YD}/ingilizce-konusma-kursu/besiktas-subesi-ingilizce-konusma-kurs-tarihi`,
      `${YD}/ingilizce-konusma-kursu/atasehir-subesi-ingilizce-konusma-kurs-tarihi`,
    ],
  },
  ignored: [],
};

/* ---------------------------------------------------------------
 * 10 dilin tam kaydı — sıra `docs/faz6.4-dil-kursu-prompt.md` tablosuyla aynı
 * ------------------------------------------------------------- */

export const LANGUAGES: LanguageDef[] = [
  {
    slug: "ingilizce-kursu", key: "en", name: "İngilizce", label: "İngilizce Kursu",
    code: "EN", flag: "gb", greeting: "Hello", skill: "Speaking",
    scaleChip: "A1 → C2", kurCount: 5, kurHours: 60, groupSize: 8,
    content: en,
  },
  {
    slug: "almanca-kursu", key: "de", name: "Almanca", label: "Almanca Kursu",
    code: "DE", flag: "de", greeting: "Hallo", skill: "Sprechen",
    scaleChip: "A1 → C2", kurCount: 6, kurHours: 40, groupSize: 8,
    content: de,
  },
  {
    slug: "fransizca-kursu", key: "fr", name: "Fransızca", label: "Fransızca Kursu",
    code: "FR", flag: "fr", greeting: "Bonjour", skill: "Parler",
    scaleChip: "A1 → C2", kurCount: 6, kurHours: 40, groupSize: 8,
    content: fr,
  },
  {
    slug: "italyanca-kursu", key: "it", name: "İtalyanca", label: "İtalyanca Kursu",
    code: "IT", flag: "it", greeting: "Ciao!", skill: "Parlare",
    scaleChip: "A1 → C2", kurCount: 6, kurHours: 40, groupSize: 8,
    content: it,
  },
  {
    slug: "ispanyolca-kursu", key: "es", name: "İspanyolca", label: "İspanyolca Kursu",
    code: "ES", flag: "es", greeting: "¡Hola!", skill: "Hablar",
    scaleChip: "A1 → C2", kurCount: 6, kurHours: 40, groupSize: 8,
    content: es,
  },
  {
    slug: "rusca-kursu", key: "ru", name: "Rusça", label: "Rusça Kursu",
    code: "RU", flag: "ru", greeting: "Привет!", skill: "Говорить",
    scaleChip: "A1 → C2", kurCount: 6, kurHours: 60, groupSize: 8,
    content: ru,
  },
  {
    slug: "cince-kursu", key: "zh", name: "Çince", label: "Çince Kursu",
    code: "ZH", flag: "cn", greeting: "你好", skill: "说话",
    scaleChip: null, kurCount: 6, kurHours: 60, groupSize: 8,
    content: zh,
  },
  {
    slug: "flemenkce-kursu", key: "nl", name: "Flemenkçe", label: "Flemenkçe Kursu",
    code: "NL", flag: "nl", greeting: "Hallo!", skill: "Spreken",
    scaleChip: null, kurCount: 6, kurHours: 60, groupSize: null,
    content: nl,
  },
  {
    slug: "yabancila-icin-turkce-kurs", key: "tr", name: "Türkçe", label: "Türkçe Kursu",
    code: "TR", flag: "tr", greeting: "Merhaba!", skill: "Konuşma",
    scaleChip: null, kurCount: null, kurHours: null, groupSize: null,
    content: tr,
  },
  {
    slug: "ingilizce-konusma-kursu", key: "speak", name: "İngilizce Konuşma", label: "İngilizce Konuşma",
    code: "EN", flag: null, greeting: "Let’s talk!", skill: "Speaking",
    scaleChip: null, kurCount: null, kurHours: null, groupSize: null,
    content: speak,
  },
];

export function getLanguageDef(slug: string): LanguageDef | undefined {
  return LANGUAGES.find((l) => l.slug === slug);
}
