/**
 * P4 — Sınav özel ders sayfaları (9). Baskın bölüm: sınav formatı kartları
 * (kullanıcı kararı, 2026-09-25). Ortak kurallar: `data/privateLessonsShared.ts`.
 *
 * Sınav olguları resmi kaynaklardan doğrulandı (2026-09-25); her sınavın
 * kaynağı yanındaki yorumda ve sayfadaki `note`ta. Firma metni kaynaktan
 * birebir; yazım düzeltmeleri `edits`te (orijinal → yeni).
 */

import { PRIVATE_LESSON_PHOTO, type PrivateLessonDef } from "@/data/privateLessonsShared";

const SH = "/sinav-hazirlik-egitimleri";
const UPDATED = "2026-09-25";

/** Sınav başına hero fotoğrafı — sınavın hedef kitlesine göre (kullanıcının eklediği görseller, 2026-09-25).
 * study_exam.jpg ve study_exam_university.jpg kullanılmadı: kırpılınca "GIVE UP." / bozuk diploma yazısı görünüyor. */
const A = "/assets";
const EXAM_PHOTOS = {
  toefl: { src: `${A}/study_exam2.jpg`, alt: "Kütüphanede kitap ve dizüstü bilgisayarla çalışan öğrenci", width: 736, height: 981 },
  ielts: { src: `${A}/university1.jpg`, alt: "Yurt dışında bir üniversite kampüsünde ders çalışma masası", width: 900, height: 1200 },
  toeic: { src: `${A}/office_photo.jpg`, alt: "Açık ofiste bilgisayar başında çalışan ekip", width: 700, height: 700 },
  pte: { src: `${A}/home_page_images/yurtdisi-dil-egitimi2.jpg`, alt: "Yurt dışında tarihi bir kampüs binasının önünde öğrenciler", width: 6000, height: 4000 },
  yds: { src: `${A}/home_page_images/exam_preparation.jpg`, alt: "Notlarıyla sınava çalışan öğrenci", width: 736, height: 1104 },
  proficiency: { src: `${A}/university2.jpg`, alt: "Üniversite amfisinde derse katılan öğrenciler", width: 713, height: 713 },
  gre: { src: `${A}/home_page_images/yurtdisi-egitim.jpg`, alt: "Yurt dışında bir üniversite kampüsünde yürüyen öğrenciler", width: 6000, height: 4000 },
  gmat: { src: `${A}/home_page_images/is-ingilizcesi.jpg`, alt: "Toplantı masasında görüşen iş insanları", width: 6720, height: 4480 },
  sat: { src: `${A}/university3.jpg`, alt: "Kampüs çimlerinde sohbet eden üniversite öğrencileri", width: 1024, height: 1024 },
};

/** `DDM'de X özel ders` — kaynakta başlığı olmayan firma paragraflarının bölüm başlığı. */
const aboutTitle = (exam: string) => ({ added: `DDM'de ${exam} özel ders` });

/* ---------------------------------------------------------------
 * TOEFL — ETS: ets.org/toefl/test-takers/ibt/about/content.html,
 * …/scores/understand-scores.html, …/institutions/ibt/score-scale-update.html
 * (Ocak 2026 formatı; süre ve madde sayıları ETS'e göre yaklaşık).
 * ------------------------------------------------------------- */
const TOEFL_H1 = "TOEFL Özel Ders Birebir Kurs Programları";

const TOEFL: PrivateLessonDef = {
  path: `${SH}/toefl-kursu/toefl-ozel-ders`,
  label: "TOEFL Özel Ders",
  meta: {
    title: "TOEFL Özel Ders Birebir Programlar | Dünya Dilleri Merkezi",
    reasons: ["title: kaynak 64 karakter (≤60) — 'Kurs Programları' → 'Programlar'"],
  },
  hero: {
    photo: EXAM_PHOTOS.toefl,
    intro: { heading: TOEFL_H1, take: [0] },
    split: true,
    facts: [
      // ← "seviye belirleme sınavının yapılması ve öngörüşme ile…"
      { icon: "belge", label: "Seviye belirleme sınavı ve öngörüşme" },
      // ← "Türk ve yabancı öğretmenlerden oluşan uzman kadromuz…"
      { icon: "sohbet", label: "Türk ve yabancı öğretmenler" },
    ],
  },
  feature: {
    kind: "format",
    title: "TOEFL iBT nasıl bir sınav?",
    lead:
      "TOEFL iBT, ETS'nin hazırladığı ve üniversitelerin akademik İngilizce yeterliği için kabul ettiği bir sınavdır. Ocak 2026'da yenilenen formatta dört bölüm vardır ve puan 1–6 arası bantlarla verilir.",
    parts: [
      { icon: "okuma", name: "Okuma", measures: "Eksik kelimeyi tamamlama, günlük hayattan metinler ve akademik paragraflar", detail: "Yaklaşık 30 dk, 50 madde" },
      { icon: "dinleme", name: "Dinleme", measures: "Kısa yanıtlar, konuşmalar, duyurular ve akademik anlatımlar", detail: "Yaklaşık 29 dk, 47 madde" },
      { icon: "yazma", name: "Yazma", measures: "Cümle kurma, e-posta yazma ve akademik bir tartışmaya katılma", detail: "Yaklaşık 23 dk, 12 madde" },
      { icon: "konusma", name: "Konuşma", measures: "Dinleyip tekrar etme ve sözlü mülakat", detail: "Yaklaşık 8 dk, 11 madde" },
    ],
    facts: [
      { label: "Toplam süre", value: "Yaklaşık 2 saat" },
      { label: "Puan", value: "1–6 bant, yarım bant aralıklarla" },
      { label: "Geçiş dönemi", value: "Ocak 2028'e kadar 0–120 karşılığı da raporlanır" },
      { label: "Geçerlilik", value: "Sınav tarihinden itibaren 2 yıl" },
      { label: "Sınav şekli", value: "Bilgisayarda; test merkezinde ya da evde" },
    ],
    note: "Kaynak: ETS (ets.org), Eylül 2026. Süre ve madde sayıları ETS'nin verdiği yaklaşık değerlerdir; okuma ve dinleme bölümleri adaya göre uyarlandığı için değişebilir.",
  },
  about: {
    title: aboutTitle("TOEFL"),
    photo: PRIVATE_LESSON_PHOTO,
    parts: [
      { kind: "introRest" },
      { kind: "text", ref: { heading: TOEFL_H1, take: [1] } },
      { kind: "section", heading: "Kullandığımız TOEFL Eğitim Materyalleri" },
      { kind: "section", heading: "TOEFL Özel Ders Öğretmenlerimiz" },
      { kind: "section", heading: "Kimler TOEFL Özel Ders Almalı?" },
    ],
  },
  compare: { omitRows: [] },
  faq: [
    {
      question: "TOEFL iBT nedir?",
      answer: {
        added: [
          "TOEFL iBT, ETS'nin yaptığı ve İngilizcenin akademik ortamda kullanımını okuma, dinleme, yazma ve konuşma bölümleriyle ölçen bir sınavdır. Yurtdışındaki üniversitelerin başvurularında İngilizce yeterlik belgesi olarak istenir.",
        ],
      },
    },
    {
      question: "TOEFL'ın yeni 1–6 puanı eski 0–120 puanına nasıl karşılık gelir?",
      answer: {
        added: [
          "Ocak 2026'dan bu yana her bölüm ve genel puan 1–6 arası, yarım bant aralıklarla verilir; bantlar CEFR seviyeleriyle eşleşir (4 ≈ B2, 5 ≈ C1). Ocak 2028'e kadar sonuç belgesinde karşılaştırılabilir 0–120 puanı da yer alır.",
        ],
      },
    },
    {
      question: "TOEFL puanı kaç yıl geçerlidir?",
      answer: { added: ["TOEFL puanları sınav tarihinden itibaren 2 yıl geçerlidir; ETS bu süreden sonra puan raporu göndermez."] },
    },
  ],
  updated: UPDATED,
  edits: {
    "TOEFL özel ders alacak öğrencimizin seviye belirleme sınavının yapılması ve öngörüşme ile eksik görülen alanların belirlenmesi sonrasında hedeflediği puana göre kişisel programlar hazırlıyoruz. Eğitim sistemimiz TOEFL da istenilen skora odaklıdır. Intermediate düzey olan öğrenciden 2 aylık eğitim sürecinin sonunda 80-90 aralığı puan alması beklenir.":
      "TOEFL özel ders alacak öğrencimizin seviye belirleme sınavının yapılması ve öngörüşme ile eksik görülen alanların belirlenmesi sonrasında hedeflediği puana göre kişisel programlar hazırlıyoruz. Eğitim sistemimiz TOEFL'da istenilen skora odaklıdır. Intermediate düzey olan öğrenciden 2 aylık eğitim sürecinin sonunda 80-90 aralığı puan alması beklenir.",
    "Öğrencinin dil bilgisi ve kullanım seviyesini maksimum düzeye taşıyacak yoğun ders işleyişi, deneme testleri, ödev ve takip süreciyle öğrencimizide bu hedefe odaklıyoruz.":
      "Öğrencinin dil bilgisi ve kullanım seviyesini maksimum düzeye taşıyacak yoğun ders işleyişi, deneme testleri, ödev ve takip süreciyle öğrencimizi de bu hedefe odaklıyoruz.",
    "TOEFL özel derslerimizde dünya genelinde en çok tercih edilen kitapları kullanmaktayız. Ayrıca DDM'in özel olarak hazırladığı TOEFL materyal arşivi ve bilgisayar odalarımızıda etüt dersleri için ögrencilerimizin kullanımına sunuyoruz.":
      "TOEFL özel derslerimizde dünya genelinde en çok tercih edilen kitapları kullanmaktayız. Ayrıca DDM'in özel olarak hazırladığı TOEFL materyal arşivi ve bilgisayar odalarımızı da etüt dersleri için öğrencilerimizin kullanımına sunuyoruz.",
    "TOEFL sınavına hazırlıkta bilgi birikimi ve deneyimi olan sınav formatı ve tekniklerine hakim Türk ve Yabancı öğretmenlerden oluşan uzman kadromuz ile eğitim veriyoruz.":
      "TOEFL sınavına hazırlıkta bilgi birikimi ve deneyimi olan sınav formatı ve tekniklerine hakim Türk ve yabancı öğretmenlerden oluşan uzman kadromuz ile eğitim veriyoruz.",
    "Daha önce TOEFL sınavına girmiş, belli bir puanı olan ve bu puanı yükseltmeyi amaçlayan kişiler, yoğun iş ve eğitim temposu olan Üniversite öğrencileri, Kamu kurum, kuruluş ve özel sektör çalışanları istenilen gün ve saatlerde hazırlanabilen TOEFL özel ders programlarına katılabilir.":
      "Daha önce TOEFL sınavına girmiş, belli bir puanı olan ve bu puanı yükseltmeyi amaçlayan kişiler, yoğun iş ve eğitim temposu olan üniversite öğrencileri, kamu kurum, kuruluş ve özel sektör çalışanları istenilen gün ve saatlerde hazırlanabilen TOEFL özel ders programlarına katılabilir.",
  },
  ignored: [],
};

/* ---------------------------------------------------------------
 * IELTS — ielts.org (Academic / General Training format sayfaları,
 * "IELTS scoring in detail", "Updates to IELTS test delivery" 05.03.2026).
 * ------------------------------------------------------------- */
const IELTS_H1 = "IELTS Özel Ders Birebir Kurs Programları";

const IELTS: PrivateLessonDef = {
  path: `${SH}/ielts-kursu/ielts-ozel-ders`,
  label: "IELTS Özel Ders",
  meta: {
    title: "IELTS Özel Ders Birebir Programlar | Dünya Dilleri Merkezi",
    reasons: ["title: kaynak 64 karakter (≤60) — 'Kurs Programları' → 'Programlar'"],
  },
  hero: {
    photo: EXAM_PHOTOS.ielts,
    intro: { heading: IELTS_H1, take: [0] },
    split: false,
    facts: [
      // ← "Eğitimler STS ve öngörüşme sonrasında…"
      { icon: "belge", label: "Seviye tespit sınavı ve öngörüşme" },
      // ← "…uygun gün ve saatine göre haftalık ders programları…"
      { icon: "takvim", label: "Haftalık, esnek ders programı" },
    ],
  },
  feature: {
    kind: "format",
    title: "IELTS nasıl bir sınav?",
    lead:
      "IELTS; dinleme, okuma, yazma ve konuşma becerilerini ölçen bir İngilizce yeterlik sınavıdır. Üniversite başvuruları için Academic, göç ve iş için çoğunlukla General Training modülü kullanılır. Dinleme ve konuşma iki modülde aynıdır.",
    parts: [
      { icon: "dinleme", name: "Dinleme", measures: "Dört bölümde konuşma ve anlatımları dinleyip soruları yanıtlama", detail: "Yaklaşık 30 dk, 40 soru" },
      { icon: "okuma", name: "Okuma", measures: "Academic'te akademik metinler, General Training'de günlük hayat ve iş metinleri", detail: "60 dk, 40 soru" },
      { icon: "yazma", name: "Yazma", measures: "Grafik ya da diyagram yorumu (Academic) veya mektup (General Training) ve bir deneme", detail: "60 dk, 2 görev" },
      { icon: "konusma", name: "Konuşma", measures: "Sınav görevlisiyle yüz yüze, üç bölümlük görüşme", detail: "11–14 dk" },
    ],
    facts: [
      { label: "Toplam süre", value: "2 saat 45 dk" },
      { label: "Puan", value: "0–9 bant, yarım bant aralıklarla" },
      { label: "Geçerlilik", value: "Genellikle 2 yıl kabul edilir" },
      { label: "Sınav şekli", value: "Test merkezinde; kâğıt sınav 2026'dan itibaren aşamalı olarak kalkıyor" },
    ],
    note: "Kaynak: IELTS (ielts.org), Eylül 2026. Konuşma bölümü diğer bölümlerden bir hafta önce ya da sonra da yapılabilir.",
  },
  about: {
    title: aboutTitle("IELTS"),
    photo: PRIVATE_LESSON_PHOTO,
    parts: [
      { kind: "text", ref: { heading: IELTS_H1, take: [1] } },
      { kind: "section", heading: "DDM'de Esnek Ders Programları" },
      { kind: "section", heading: "DDM'de IELTS Özel Ders" },
      { kind: "section", heading: "IELTS Sınavına Hazırmısınız?" },
    ],
  },
  compare: { omitRows: [] },
  faq: [
    {
      question: "IELTS Academic ile General Training arasındaki fark nedir?",
      answer: {
        added: [
          "Dinleme ve konuşma bölümleri iki modülde aynıdır. Okuma ve yazma farklıdır: Academic'te akademik metinler ve grafik yorumu, General Training'de günlük hayat ve iş metinleri ile mektup yazma vardır. Üniversite başvuruları genellikle Academic modülünü ister.",
        ],
      },
    },
    {
      question: "IELTS puanı kaç yıl geçerlidir?",
      answer: { added: ["IELTS sonuçları genellikle iki yıl geçerli kabul edilir; bazı kurumlar daha eski sonuçları da kabul edebilir."] },
    },
  ],
  updated: UPDATED,
  edits: {
    "Öğretmenlerimizin herbiri IELTS'de uzmanlaşmış skor belgeleri olan akademisyenlerden oluşmaktadır.":
      "Öğretmenlerimizin her biri IELTS'de uzmanlaşmış skor belgeleri olan akademisyenlerden oluşmaktadır.",
  },
  headingEdits: {
    // Yazım: "Hazırmısınız" → "Hazır mısınız".
    "IELTS Sınavına Hazırmısınız?": "IELTS Sınavına Hazır mısınız?",
  },
  ignored: [],
};

/* ---------------------------------------------------------------
 * TOEIC — ETS Europe: eu.ets.org/toeic/about/listening-reading.html,
 * …/toeic-4-skills-test.html.
 * ------------------------------------------------------------- */
const TOEIC_H1 = "TOEIC Özel Ders Birebir Kurs Programları";

const TOEIC: PrivateLessonDef = {
  path: `${SH}/toeic-kursu/toeic-ozel-ders`,
  label: "TOEIC Özel Ders",
  meta: {
    title: "TOEIC Özel Ders Birebir Programlar | Dünya Dilleri Merkezi",
    reasons: ["title: kaynak 64 karakter (≤60) — 'Kurs Programları' → 'Programlar'"],
  },
  hero: {
    photo: EXAM_PHOTOS.toeic,
    intro: { heading: TOEIC_H1, take: [0] },
    split: true,
    facts: [
      // ← "TOEIC özel ders birebir yüz yüze veya online olarak…"
      { icon: "ozelders", label: "Yüz yüze ya da online birebir" },
      // ← "Türk ve yabancı öğretmenlerden oluşan uzman kadromuz…"
      { icon: "sohbet", label: "Türk ve yabancı öğretmenler" },
    ],
  },
  feature: {
    kind: "format",
    title: "TOEIC nasıl bir sınav?",
    lead:
      "TOEIC Listening & Reading, iş hayatında kullanılan İngilizceyi ölçen bir ETS sınavıdır. 200 çoktan seçmeli sorudan oluşur; geçti-kaldı yoktur, puan 10–990 arasında verilir. Konuşma ve yazma ayrı bir testle ölçülür.",
    parts: [
      { icon: "dinleme", name: "Dinleme", measures: "Fotoğraflar, soru-cevap, diyaloglar ve kısa konuşmalar (4 bölüm)", detail: "100 soru, 45 dk" },
      { icon: "okuma", name: "Okuma", measures: "Cümle tamamlama, metin tamamlama ve okuduğunu anlama (3 bölüm)", detail: "100 soru, 75 dk" },
      { icon: "konusma", name: "Konuşma ve yazma", measures: "Ayrı bir test: TOEIC Speaking & Writing; her beceri 0–200 puan", detail: "Konuşma 20 dk, yazma 60 dk" },
    ],
    facts: [
      { label: "Toplam süre", value: "2 saat (dinleme ve okuma)" },
      { label: "Puan", value: "10–990; her bölüm 5–495" },
      { label: "Geçerlilik", value: "2 yıl" },
      { label: "Sınav şekli", value: "Kâğıt ya da bilgisayar" },
    ],
    note: "Kaynak: ETS Europe (eu.ets.org), Eylül 2026.",
  },
  about: {
    title: aboutTitle("TOEIC"),
    photo: PRIVATE_LESSON_PHOTO,
    parts: [
      { kind: "introRest" },
      { kind: "text", ref: { heading: TOEIC_H1, take: [1] } },
      { kind: "section", heading: "Kullandığımız TOEIC Eğitim Materyalleri" },
      { kind: "section", heading: "TOEIC Özel Ders Öğretmenlerimiz" },
      { kind: "section", heading: "Kimler TOEIC Özel Ders Almalı" },
    ],
  },
  compare: { omitRows: [] },
  faq: [
    {
      question: "TOEIC nedir?",
      answer: {
        added: [
          "TOEIC, iş ve günlük çalışma hayatında kullanılan İngilizceyi ölçen bir ETS sınavıdır. En yaygın sürümü dinleme ve okumadan oluşan TOEIC Listening & Reading'dir; şirketler işe alım ve terfide, bazı kurumlar da dil yeterliği için kullanır.",
        ],
      },
    },
    { question: "TOEIC puanı kaç yıl geçerlidir?", answer: { added: ["TOEIC sonuçları 2 yıl geçerlidir."] } },
  ],
  updated: UPDATED,
  edits: {
    "TOEIC özel ders birebir yüzeyüze veya online olarak eğitim alacak öğrencimizin seviye belirleme sınavının yapılması ve öngörüşme ile eksik görülen alanların belirlenmesi sonrasında hedeflediği puana göre kişisel programlar hazırlıyoruz. Eğitim sistemimiz TOEIC'de istenilen skora odaklıdır. Intermediate düzey olan öğrenciden 2 aylık eğitim sürecinin sonunda 600-800 aralığı puan alması beklenir.":
      "TOEIC özel ders birebir yüz yüze veya online olarak eğitim alacak öğrencimizin seviye belirleme sınavının yapılması ve öngörüşme ile eksik görülen alanların belirlenmesi sonrasında hedeflediği puana göre kişisel programlar hazırlıyoruz. Eğitim sistemimiz TOEIC'de istenilen skora odaklıdır. Intermediate düzey olan öğrenciden 2 aylık eğitim sürecinin sonunda 600-800 aralığı puan alması beklenir.",
    "Öğrencinin dil bilgisi ve kullanım seviyesini maksimum düzeye taşıyacak yoğun ders işleyişi, deneme testleri, ödev ve takip süreciyle öğrencimizide bu hedefe odaklıyoruz.":
      "Öğrencinin dil bilgisi ve kullanım seviyesini maksimum düzeye taşıyacak yoğun ders işleyişi, deneme testleri, ödev ve takip süreciyle öğrencimizi de bu hedefe odaklıyoruz.",
    "TOEIC özel derslerimizde dünya genelinde en çok tercih edilen kitapları kullanmaktayız. Ayrıca DDM'in özel olarak hazırladığı TOEIC materyal arşivini etüt dersleri için ögrencilerimizin kullanımına sunuyoruz.":
      "TOEIC özel derslerimizde dünya genelinde en çok tercih edilen kitapları kullanmaktayız. Ayrıca DDM'in özel olarak hazırladığı TOEIC materyal arşivini etüt dersleri için öğrencilerimizin kullanımına sunuyoruz.",
    "TOEIC sınavına hazırlıkta bilgi birikimi ve deneyimi olan sınav formatı ve tekniklerine hakim Türk ve Yabancı öğretmenlerden oluşan uzman kadromuz ile eğitim veriyoruz.":
      "TOEIC sınavına hazırlıkta bilgi birikimi ve deneyimi olan sınav formatı ve tekniklerine hakim Türk ve yabancı öğretmenlerden oluşan uzman kadromuz ile eğitim veriyoruz.",
    "Daha önce TOEIC sınavına girmiş, belli bir puanı olan ve bu puanı yükseltmeyi amaçlayan kişiler, yoğun iş ve eğitim temposu olan Üniversite öğrencileri, Kamu kurum, kuruluş ve özel sektör çalışanları istenilen gün ve saatlerde hazırlanabilen TOEIC özel ders programlarına katılabilir.":
      "Daha önce TOEIC sınavına girmiş, belli bir puanı olan ve bu puanı yükseltmeyi amaçlayan kişiler, yoğun iş ve eğitim temposu olan üniversite öğrencileri, kamu kurum, kuruluş ve özel sektör çalışanları istenilen gün ve saatlerde hazırlanabilen TOEIC özel ders programlarına katılabilir.",
  },
  ignored: [],
};

/* ---------------------------------------------------------------
 * PTE Academic — pearsonpte.com (test-format sayfaları, pte-updates-2025,
 * scoring/understand-your-score). "80-90" → "60-70": kullanıcı onayı (P4,
 * 2026-09-24) — firmanın TOEFL iddiasıyla (80-90 ≈ B2, ETS) aynı seviyenin
 * PTE karşılığı: Pearson B2 = 59–75; Pearson eşdeğerliği PTE 65 ≈ TOEFL 82–85.
 * ------------------------------------------------------------- */
const PTE_H1 = "PTE Akademik Özel Ders";

const PTE: PrivateLessonDef = {
  path: `${SH}/academic-pte/pte-akademik-ozel-ders`,
  label: "PTE Akademik Özel Ders",
  meta: { reasons: [] },
  hero: {
    photo: EXAM_PHOTOS.pte,
    intro: { heading: PTE_H1, take: [0] },
    split: true,
    facts: [
      { icon: "belge", label: "Seviye belirleme sınavı ve öngörüşme" },
      { icon: "sohbet", label: "Türk ve yabancı öğretmenler" },
    ],
  },
  feature: {
    kind: "format",
    title: "PTE Academic nasıl bir sınav?",
    lead:
      "PTE Academic, Pearson'ın bilgisayar üzerinden yaptığı bir İngilizce yeterlik sınavıdır. Konuşma ve yazma, okuma ve dinleme olmak üzere üç bölümden oluşur; puan 10–90 arasında verilir.",
    parts: [
      { icon: "konusma", name: "Konuşma ve yazma", measures: "Sesli okuma, cümle tekrarı, görsel betimleme, grup tartışması özetleme, metin özeti ve deneme", detail: "76–84 dk" },
      { icon: "okuma", name: "Okuma", measures: "Boşluk doldurma, çoktan seçmeli sorular ve paragraf sıralama", detail: "23–30 dk" },
      { icon: "dinleme", name: "Dinleme", measures: "Konuşma özeti, boşluk doldurma, eksik kelimeyi seçme ve dikte", detail: "31–39 dk" },
    ],
    facts: [
      { label: "Toplam süre", value: "Yaklaşık 2 saat" },
      { label: "Puan", value: "10–90" },
      { label: "Geçerlilik", value: "Sınav tarihinden itibaren 2 yıl" },
      { label: "Sınav şekli", value: "Test merkezinde, bilgisayarda" },
    ],
    note: "Kaynak: Pearson (pearsonpte.com), Eylül 2026. Ağustos 2025'ten bu yana konuşma ve yazma bölümünde iki yeni görev var.",
  },
  about: {
    title: aboutTitle("PTE Akademik"),
    photo: PRIVATE_LESSON_PHOTO,
    parts: [
      { kind: "introRest" },
      { kind: "text", ref: { heading: PTE_H1, take: [1] } },
      { kind: "section", heading: "Kullandığımız PTE Akademik Eğitim Materyalleri" },
      { kind: "section", heading: "PTE Akademik Özel Ders Öğretmenlerimiz" },
      { kind: "section", heading: "Kimler PTE Akademik Özel Ders Almalı" },
    ],
  },
  compare: { omitRows: [] },
  faq: [
    {
      question: "PTE puanı CEFR seviyelerinde neye karşılık gelir?",
      answer: { added: ["Pearson'ın eşlemesine göre 43–58 B1, 59–75 B2, 76–84 C1, 85–90 C2 seviyesine karşılık gelir."] },
    },
    { question: "PTE puanı kaç yıl geçerlidir?", answer: { added: ["PTE Academic sonuç belgesi sınav tarihinden itibaren 2 yıl geçerlidir."] } },
  ],
  updated: UPDATED,
  edits: {
    "PEARSON PTE Akademik özel ders alacak öğrencimizin seviye belirleme sınavının yapılması ve öngörüşme ile eksik görülen alanların belirlenmesi sonrasında hedeflediği puana göre kişisel programlar hazırlıyoruz. Eğitim sistemimiz Pearson PTE'de istenilen skora odaklıdır. Intermediate düzey olan öğrenciden 2 aylık eğitim sürecinin sonunda 80-90 aralığı puan alması beklenir.":
      "Pearson PTE Akademik özel ders alacak öğrencimizin seviye belirleme sınavının yapılması ve öngörüşme ile eksik görülen alanların belirlenmesi sonrasında hedeflediği puana göre kişisel programlar hazırlıyoruz. Eğitim sistemimiz Pearson PTE'de istenilen skora odaklıdır. Intermediate düzey olan öğrenciden 2 aylık eğitim sürecinin sonunda 60-70 aralığı puan alması beklenir.",
    "Öğrencinin dil bilgisi ve kullanım seviyesini maksimum düzeye taşıyacak yoğun ders işleyişi, deneme testleri, ödev ve takip süreciyle öğrencimizide bu hedefe odaklıyoruz.":
      "Öğrencinin dil bilgisi ve kullanım seviyesini maksimum düzeye taşıyacak yoğun ders işleyişi, deneme testleri, ödev ve takip süreciyle öğrencimizi de bu hedefe odaklıyoruz.",
    "PTE Akademik özel derslerimizde dünya genelinde en çok tercih edilen kitapları kullanmaktayız. Ayrıca DDM'in özel olarak hazırladığı materyal arşivi ve bilgisayar odalarımızıda etüt dersleri için ögrencilerimizin kullanımına sunuyoruz.":
      "PTE Akademik özel derslerimizde dünya genelinde en çok tercih edilen kitapları kullanmaktayız. Ayrıca DDM'in özel olarak hazırladığı materyal arşivi ve bilgisayar odalarımızı da etüt dersleri için öğrencilerimizin kullanımına sunuyoruz.",
    "PTE Akademik sınavına hazırlıkta bilgi birikimi ve deneyimi olan sınav formatı ve tekniklerine hakim Türk ve Yabancı öğretmenlerden oluşan uzman kadromuz ile eğitim veriyoruz.":
      "PTE Akademik sınavına hazırlıkta bilgi birikimi ve deneyimi olan sınav formatı ve tekniklerine hakim Türk ve yabancı öğretmenlerden oluşan uzman kadromuz ile eğitim veriyoruz.",
    "Daha önce PTE Akademik sınavına girmiş, belli bir puanı olan ve bu puanı yükseltmeyi amaçlayan kişiler, yoğun iş ve eğitim temposu olan Üniversite öğrencileri, Kamu kurum, kuruluş ve özel sektör çalışanları istenilen gün ve saatlerde hazırlanabilen PTE Akademik özel ders programlarına katılabilir.":
      "Daha önce PTE Akademik sınavına girmiş, belli bir puanı olan ve bu puanı yükseltmeyi amaçlayan kişiler, yoğun iş ve eğitim temposu olan üniversite öğrencileri, kamu kurum, kuruluş ve özel sektör çalışanları istenilen gün ve saatlerde hazırlanabilen PTE Akademik özel ders programlarına katılabilir.",
  },
  ignored: [],
};

/* ---------------------------------------------------------------
 * YDS — ÖSYM 2026 e-YDS Kılavuzu (md. 1.2, 1.5, 1.6, bölüm 3) ve 2025 YDS/2
 * Kılavuzu (md. 1.15: geçerlilik kurumların kendi mevzuatına göre; TUS/DUS/EUS
 * ve yabancı dil tazminatında 5 yıl). Soru başına süre/soru dağılımı resmi
 * olarak verilmediği için kartlarda süre yok.
 * ------------------------------------------------------------- */
const YDS_H1 = "YDS Özel Ders Birebir Kurs Programları";

const YDS: PrivateLessonDef = {
  path: `${SH}/yds-kursu/yds-ozel-ders`,
  label: "YDS Özel Ders",
  meta: {
    title: "YDS Özel Ders Birebir Programlar | Dünya Dilleri Merkezi",
    reasons: ["title: kaynak 62 karakter (≤60) — 'Kurs Programları' → 'Programlar'"],
  },
  hero: {
    photo: EXAM_PHOTOS.yds,
    intro: { heading: YDS_H1, take: [0] },
    split: true,
    facts: [
      // ← "…hedeflenen skora uygun materyaller ile…"
      { icon: "puan", label: "Hedef skora uygun materyal" },
      // ← "…normalden daha hızlı yoğun bir program ile…"
      { icon: "takvim", label: "Yoğun ve hızlı program" },
    ],
  },
  feature: {
    kind: "format",
    title: "YDS nasıl bir sınav?",
    lead:
      "YDS (Yabancı Dil Bilgisi Seviye Tespit Sınavı), ÖSYM'nin yaptığı çoktan seçmeli bir yabancı dil sınavıdır. Kâğıt üzerinde yapılan YDS ile bilgisayarda yapılan e-YDS eşdeğerdir ve aynı hakları verir.",
    parts: [
      { icon: "kelime", name: "Sözcük bilgisi", measures: "Cümlenin anlamına uygun kelimeyi ve kalıbı seçme", detail: null },
      { icon: "dilbilgisi", name: "Dil bilgisi", measures: "Zaman, yapı ve bağlaçları doğru kullanma", detail: null },
      { icon: "kullanim", name: "Çeviri", measures: "Yabancı dil ile Türkçe arasında cümle çevirisi", detail: null },
      { icon: "okuma", name: "Okuduğunu anlama", measures: "Paragrafı anlama ve metinden çıkarım yapma", detail: null },
    ],
    facts: [
      { label: "Soru sayısı", value: "80 soru, 5 seçenekli" },
      { label: "Süre", value: "180 dakika" },
      { label: "Puan", value: "100 üzerinden; yanlış doğruyu götürmez" },
      { label: "Geçerlilik", value: "Kurumun kendi mevzuatına göre" },
      { label: "Sınav şekli", value: "Kâğıt (YDS) ya da bilgisayar (e-YDS)" },
    ],
    note: "Kaynak: ÖSYM 2026 e-YDS ve 2025 YDS kılavuzları. Sözlük kullanılamaz.",
  },
  about: {
    title: aboutTitle("YDS"),
    photo: PRIVATE_LESSON_PHOTO,
    parts: [{ kind: "introRest" }, { kind: "text", ref: { heading: YDS_H1, take: [1, 2, 3] } }],
  },
  compare: { omitRows: [] },
  faq: [
    {
      question: "YDS ile e-YDS arasında fark var mı?",
      answer: {
        added: [
          "İki sınav eşdeğerdir ve aynı hakları verir. e-YDS bilgisayarda, ÖSYM'nin Adana, Ankara, İstanbul ve İzmir'deki elektronik sınav merkezlerinde, yıl içinde birçok oturumda yapılır.",
        ],
      },
    },
    {
      question: "YDS puanı kaç yıl geçerlidir?",
      answer: {
        added: [
          "ÖSYM'ye göre geçerlilik süresi, puanı kullanacak kurumun kendi mevzuatında belirlenir. Örneğin tıpta uzmanlık (TUS, DUS, EUS) başvurularında ve yabancı dil tazminatında sınav tarihinden itibaren 5 yıl geçerlidir.",
        ],
      },
    },
    {
      question: "YDS puanı hangi seviyeye karşılık gelir?",
      answer: { added: ["ÖSYM'nin seviye aralıkları: A 90–100, B 80–89, C 70–79, D 60–69, E 50–59."] },
    },
  ],
  updated: UPDATED,
  edits: {
    "YDS Özel Dersler rutin olarak grup eğitimleri ile zamanı uyuşmayan adayların ya da normalden daha hızlı yoğun bir program ile ilerlemek isteyen kişilerin sıklıkla tercih ettiği bir eğitim modelidir. Dünya Dilleri Merkezi yoğun temposu olan YDS adayları için birebir özel ders programları ile öncelikle hedeflenen skora uygun materyaller ile İngilizce kelime ve dil bilgisi seviyesinin aşamalı bir şekilde ilerletilmesi amaçlamaktadır.":
      "YDS Özel Dersler rutin olarak grup eğitimleri ile zamanı uyuşmayan adayların ya da normalden daha hızlı yoğun bir program ile ilerlemek isteyen kişilerin sıklıkla tercih ettiği bir eğitim modelidir. Dünya Dilleri Merkezi yoğun temposu olan YDS adayları için birebir özel ders programları ile öncelikle hedeflenen skora uygun materyaller ile İngilizce kelime ve dil bilgisi seviyesinin aşamalı bir şekilde ilerletilmesini amaçlamaktadır.",
    "Derslerde yaptığımız çalışmalara ek olarak zengin içerikli kaynak paylaşımları ile eğitimler desteklenmekte ve düzenli bir program içersinde adayların YDS sınavına yönelik çalışmaları sağlanmaktadır.":
      "Derslerde yaptığımız çalışmalara ek olarak zengin içerikli kaynak paylaşımları ile eğitimler desteklenmekte ve düzenli bir program içerisinde adayların YDS sınavına yönelik çalışmaları sağlanmaktadır.",
  },
  ignored: [],
};

/* ---------------------------------------------------------------
 * Proficiency (üniversite hazırlık atlama) — tek bir format YOK; her üniversite
 * kendi sınavını belirler. Örnekler resmi sayfalardan: Boğaziçi BUEPT
 * (yadyok.bogazici.edu.tr: "Listening, Reading, and Writing"), İTÜ Yeterlik
 * (ydy.itu.edu.tr: 1. oturum Language Comprehension + Reading, 2. oturum
 * Writing + Listening). Süre/puan yazılmaz (çelişkili ve üniversiteye özgü).
 * ------------------------------------------------------------- */
const PROF_H1 = "Proficiency Özel Ders Birebir Kurs Programları";

const PROFICIENCY: PrivateLessonDef = {
  path: `${SH}/proficiency-kursu/proficiency-ozel-ders`,
  label: "Proficiency Özel Ders",
  meta: { reasons: [] },
  hero: {
    photo: EXAM_PHOTOS.proficiency,
    intro: { heading: PROF_H1, take: [0] },
    split: true,
    facts: [
      { icon: "belge", label: "Seviye tespit sınavı ve öngörüşme" },
      { icon: "takvim", label: "Haftalık, esnek ders programı" },
    ],
  },
  feature: {
    kind: "format",
    title: "Hazırlık atlama sınavları nasıl?",
    lead:
      "Proficiency, üniversitelerin İngilizce hazırlık programından muafiyet için yaptığı yeterlik sınavıdır. Her üniversite kendi formatını, puanlamasını ve geçme notunu belirler; bu yüzden hazırlık hedeflenen üniversitenin sınavına göre planlanır.",
    parts: [
      { icon: "okuma", name: "Okuma", measures: "Akademik metinleri dikkatli okuyup anlama", detail: null },
      { icon: "dinleme", name: "Dinleme", measures: "Ders anlatımı ve konuşmaları çoğunlukla not alarak dinleme", detail: null },
      { icon: "yazma", name: "Yazma", measures: "Verilen bir konuda deneme (essay) yazma", detail: null },
      { icon: "konusma", name: "Dil kullanımı ve konuşma", measures: "Bazı üniversitelerde dil bilgisi-kelime bölümü ya da sözlü sınav", detail: null },
    ],
    facts: [
      { label: "Format", value: "Üniversiteye göre değişir" },
      { label: "Boğaziçi (BUEPT)", value: "Dinleme, okuma ve yazma" },
      { label: "İTÜ Yeterlik", value: "İki oturum: dil kullanımı ve okuma; yazma ve dinleme" },
    ],
    note: "Kaynak: Boğaziçi Üniversitesi YADYOK ve İTÜ YDY resmi sayfaları, Eylül 2026. Güncel format ve tarihler için hedeflediğiniz üniversitenin yabancı diller okulunun duyurularına bakın.",
  },
  about: {
    title: aboutTitle("Proficiency"),
    photo: PRIVATE_LESSON_PHOTO,
    parts: [
      { kind: "introRest" },
      { kind: "section", heading: "PROFICIENCY Sınavına Hazır mısınız?" },
      { kind: "section", heading: "DDM'de Esnek Ders Programları" },
      { kind: "section", heading: "DDM'de PROFICIENCY Özel Derse Hazırlık" },
    ],
  },
  compare: { omitRows: [] },
  faq: [
    {
      question: "Proficiency sınavı nedir?",
      answer: {
        added: [
          "Proficiency, İngilizce eğitim veren ya da hazırlık sınıfı olan üniversitelerin, öğrencinin hazırlık programını atlayıp doğrudan bölüme başlayabilecek İngilizce seviyesinde olup olmadığını ölçtüğü yeterlik sınavıdır.",
        ],
      },
    },
    {
      question: "Her üniversitenin proficiency sınavı aynı mı?",
      answer: {
        added: [
          "Hayır. Sınavın bölümleri, süresi ve geçme notu üniversiteden üniversiteye değişir. Çoğunda okuma, dinleme ve yazma bulunur; bazılarında dil kullanımı ya da konuşma bölümü de vardır.",
        ],
      },
    },
    {
      question: "Proficiency sınavını geçemezsem ne olur?",
      answer: {
        added: [
          "Sınavı geçemeyen öğrenci, üniversitenin İngilizce hazırlık programına devam eder. Hazırlık süresince ve sonunda sınava yeniden girme hakları, dönemleri ve koşulları her üniversitenin kendi yönergesinde belirlenir.",
        ],
      },
    },
  ],
  updated: UPDATED,
  edits: {
    "PROFICIENCY özel ders programlarımızın amacı, öğrencilerimizin hızlı ve etkili bir şekilde dil kullanım becerilerini geliştirerek, üniversite'nin hazırlık atlama sınavı formatına uygun teknik ve taktikleri aktarıp hedefledikleri puana ulaşmalarını sağlamaktır. PROFICIENCY sınavlarına yönelik özel ders eğitimlerimiz, eksiklerinizi tamamlamak için DDM'in kanıtlanmış bir eğitim modelidir.":
      "PROFICIENCY özel ders programlarımızın amacı, öğrencilerimizin hızlı ve etkili bir şekilde dil kullanım becerilerini geliştirerek, üniversitenin hazırlık atlama sınavı formatına uygun teknik ve taktikleri aktarıp hedefledikleri puana ulaşmalarını sağlamaktır. PROFICIENCY sınavlarına yönelik özel ders eğitimlerimiz, eksiklerinizi tamamlamak için DDM'in kanıtlanmış bir eğitim modelidir.",
    "Öğretmenlerimizin herbiri PROFICIENCY'de uzmanlaşmış üniversitelerde görev almış akademisyenlerden oluşmaktadır.":
      "Öğretmenlerimizin her biri PROFICIENCY'de uzmanlaşmış üniversitelerde görev almış akademisyenlerden oluşmaktadır.",
  },
  ignored: [],
};

/* ---------------------------------------------------------------
 * GRE — ETS: ets.org/gre/test-takers/general-test/prepare/test-structure.html,
 * …/scores/understand-scores.html, …/scores/get-scores.html (Eylül 2023 kısa format).
 * ------------------------------------------------------------- */
const GRE_H1 = "GRE Özel Ders Birebir Kurs Programları";

/** GRE ve GMAT sayfaları "maksimum iki veya üç kişilik özel gruplar" diyor; P3 tablosunun
 *  "en fazla 2 kişi" satırı bu sayfalarda çelişir → gösterilmez (kullanıcıya soruldu). */
const GROUP_SIZE_ROW = "Kişi sayısı";

const GRE: PrivateLessonDef = {
  path: `${SH}/gre-kursu/gre-ozel-ders`,
  label: "GRE Özel Ders",
  meta: { reasons: [] },
  hero: {
    photo: EXAM_PHOTOS.gre,
    intro: { heading: GRE_H1, take: [0] },
    split: true,
    facts: [
      // ← "…bire bir özel ders ve talep edildiğinde maksimum iki veya üç kişilik özel gruplar…"
      { icon: "grup", label: "Birebir ya da 2–3 kişilik gruplar" },
      { icon: "belge", label: "Seviye testi ve öngörüşme" },
    ],
  },
  feature: {
    kind: "format",
    title: "GRE nasıl bir sınav?",
    lead:
      "GRE General Test, yüksek lisans ve doktora başvurularında istenen, ETS'nin bilgisayar üzerinden yaptığı bir sınavdır. Eylül 2023'ten bu yana kısaltılmış formatta yaklaşık 1 saat 58 dakika sürer.",
    parts: [
      { icon: "yazma", name: "Analitik yazma", measures: "Bir görüş hakkında gerekçeli yazı; her zaman ilk bölüm", detail: "1 görev, 30 dk" },
      { icon: "okuma", name: "Sözel akıl yürütme", measures: "Okuduğunu anlama ve bağlam içinde kelime bilgisi", detail: "27 soru, 41 dk (2 bölüm)" },
      { icon: "puan", name: "Sayısal akıl yürütme", measures: "Aritmetik, cebir, geometri ve veri analizi", detail: "27 soru, 47 dk (2 bölüm)" },
    ],
    facts: [
      { label: "Toplam süre", value: "Yaklaşık 1 saat 58 dk, molasız" },
      { label: "Puan", value: "Sözel ve sayısal 130–170; yazma 0–6" },
      { label: "Geçerlilik", value: "5 yıl raporlanabilir" },
      { label: "Sınav şekli", value: "Bilgisayarda; test merkezinde ya da evde" },
    ],
    note: "Kaynak: ETS (ets.org/gre), Eylül 2026. Sözel ve sayısal bölümler bölüm düzeyinde uyarlanır: ikinci bölümün zorluğu ilk bölümdeki performansa göre belirlenir.",
  },
  about: {
    title: aboutTitle("GRE"),
    photo: PRIVATE_LESSON_PHOTO,
    parts: [{ kind: "introRest" }, { kind: "text", ref: { heading: GRE_H1, take: [1, 2, 3] } }],
  },
  compare: { omitRows: [GROUP_SIZE_ROW] },
  faq: [
    {
      question: "GRE nedir?",
      answer: {
        added: [
          "GRE General Test, başta ABD olmak üzere birçok ülkede yüksek lisans ve doktora programlarının istediği, sözel, sayısal ve analitik yazma becerilerini ölçen bir ETS sınavıdır.",
        ],
      },
    },
    {
      question: "GRE mi, GMAT mı?",
      answer: {
        added: [
          "Pek çok işletme okulu iki sınavı da kabul eder; hangisinin istendiği başvurulacak programın koşullarında yazar. İki sınavın puanı da 5 yıl geçerlidir.",
        ],
      },
    },
  ],
  updated: UPDATED,
  ignored: [],
};

/* ---------------------------------------------------------------
 * GMAT — GMAC: gmac.com (exam-scores, new-gmat-exam-details, gmat-exam-online,
 * gmat-vs-gre). mba.com bot koruması nedeniyle açılamadı.
 * ------------------------------------------------------------- */
const GMAT_H = "GMAT Özel Ders Birebir Kurs Programları";

const GMAT: PrivateLessonDef = {
  path: `${SH}/gmat-kursu/gmat-ozel-ders`,
  label: "GMAT Özel Ders",
  meta: {
    h1: GMAT_H,
    reasons: ["h1: kaynakta h1 yok (en üst başlık h2) — aynı metin H1'e yükseltildi"],
  },
  hero: {
    photo: EXAM_PHOTOS.gmat,
    intro: { heading: GMAT_H, take: [0] },
    split: true,
    facts: [
      { icon: "grup", label: "Birebir ya da 2–3 kişilik gruplar" },
      { icon: "belge", label: "Seviye testi ve öngörüşme" },
    ],
  },
  feature: {
    kind: "format",
    title: "GMAT nasıl bir sınav?",
    lead:
      "GMAT, işletme yüksek lisansı (MBA ve benzeri) başvurularında kullanılan, GMAC'ın bilgisayar üzerinden yaptığı bir sınavdır. Üç bölümün her biri 45 dakika sürer ve bölümlerin hepsi adayın cevaplarına göre uyarlanır.",
    parts: [
      { icon: "puan", name: "Sayısal akıl yürütme", measures: "Problem çözme; hesap makinesi kullanılmaz", detail: "21 soru, 45 dk" },
      { icon: "okuma", name: "Sözel akıl yürütme", measures: "Okuduğunu anlama ve eleştirel akıl yürütme", detail: "23 soru, 45 dk" },
      { icon: "kullanim", name: "Veri analizi (Data Insights)", measures: "Tablo, grafik ve birden çok kaynaktan gelen veriyi yorumlama", detail: "20 soru, 45 dk" },
    ],
    facts: [
      { label: "Toplam süre", value: "2 saat 15 dk; isteğe bağlı 10 dk mola" },
      { label: "Puan", value: "205–805; her bölüm 60–90" },
      { label: "Geçerlilik", value: "5 yıl" },
      { label: "Sınav şekli", value: "Test merkezinde ya da online" },
    ],
    note: "Kaynak: GMAC (gmac.com), Eylül 2026. Bölümlerin sırasını aday seçer; her bölümde en fazla 3 cevap değiştirilebilir.",
  },
  about: {
    title: aboutTitle("GMAT"),
    photo: PRIVATE_LESSON_PHOTO,
    parts: [{ kind: "introRest" }, { kind: "text", ref: { heading: GMAT_H, take: [1, 2, 3] } }],
  },
  compare: { omitRows: [GROUP_SIZE_ROW] },
  faq: [
    {
      question: "GMAT nedir?",
      answer: {
        added: [
          "GMAT, işletme okullarının yüksek lisans başvurularında adayın sayısal, sözel ve veri yorumlama becerilerini ölçmek için kullandığı, GMAC'ın yaptığı bir sınavdır.",
        ],
      },
    },
    { question: "GMAT puanı kaç yıl geçerlidir?", answer: { added: ["GMAT puanları 5 yıl geçerlidir."] } },
    {
      question: "GMAT'te bölümlerin sırasını seçebilir miyim?",
      answer: {
        added: [
          "Evet. Sayısal, sözel ve veri analizi bölümlerinin sırasını aday belirler. Her bölümde sınav sonunda en fazla üç cevabı gözden geçirip değiştirebilirsiniz.",
        ],
      },
    },
  ],
  updated: UPDATED,
  edits: {
    "Öğrencinin hedeflediği skora yönelik kaç saat eğitim alması gerektiği öğrenci ile paylaşılır. Öğrencinin seviyesi GMAT sınavı hazırlık eğitimi için yetersiz görüldüğünde, öğrenci öncelikle bir ön hazırlık sürecinden geçirilir. Bu süreçte öğrencinin seviyesinin GRE hazırlık eğitimi seviyesine ulaşması hedeflenir.":
      "Öğrencinin hedeflediği skora yönelik kaç saat eğitim alması gerektiği öğrenci ile paylaşılır. Öğrencinin seviyesi GMAT sınavı hazırlık eğitimi için yetersiz görüldüğünde, öğrenci öncelikle bir ön hazırlık sürecinden geçirilir. Bu süreçte öğrencinin seviyesinin GMAT hazırlık eğitimi seviyesine ulaşması hedeflenir.",
  },
  ignored: [],
};

/* ---------------------------------------------------------------
 * SAT — College Board: satsuite.collegeboard.org/sat/whats-on-the-test/structure,
 * international.collegeboard.org (dijital format). Resmi geçerlilik süresi yok.
 * ------------------------------------------------------------- */
const SAT_H1 = "SAT Özel Ders Birebir Kurs Programları";

const SAT: PrivateLessonDef = {
  path: `${SH}/sat-kursu/sat-ozel-ders`,
  label: "SAT Özel Ders",
  meta: { reasons: [] },
  hero: {
    photo: EXAM_PHOTOS.sat,
    intro: { heading: SAT_H1, take: [0] },
    split: true,
    facts: [
      { icon: "belge", label: "Seviye testi ve öngörüşme" },
      // ← "…SAT başvurusu gibi konularda danışmanlarımız öğrencilerimize rehberlik etmektedir."
      { icon: "mezuniyet", label: "Başvuru sürecinde rehberlik" },
    ],
  },
  feature: {
    kind: "format",
    title: "SAT nasıl bir sınav?",
    lead:
      "SAT, başta ABD olmak üzere birçok ülkede lisans başvurularında kullanılan, College Board'un dijital olarak yaptığı bir sınavdır. İki bölümden oluşur; her bölümün ikinci modülü, ilk modüldeki performansa göre zorlaşır ya da kolaylaşır.",
    parts: [
      { icon: "okuma", name: "Okuma ve yazma", measures: "Anlatım ve yapı, bilgi ve fikirler, standart İngilizce kuralları ve ifade", detail: "54 soru, 64 dk (2 modül)" },
      { icon: "puan", name: "Matematik", measures: "Cebir, ileri matematik, problem çözme ve veri analizi, geometri ve trigonometri", detail: "44 soru, 70 dk (2 modül)" },
    ],
    facts: [
      { label: "Toplam süre", value: "2 saat 14 dk; arada 10 dk mola" },
      { label: "Puan", value: "400–1600; her bölüm 200–800" },
      { label: "Sınav şekli", value: "Dijital, Bluebook uygulamasıyla" },
      { label: "Geçerlilik", value: "Resmi süre yok; üniversiteye göre değişir" },
    ],
    note: "Kaynak: College Board (collegeboard.org), Eylül 2026.",
  },
  about: {
    title: aboutTitle("SAT"),
    photo: PRIVATE_LESSON_PHOTO,
    parts: [{ kind: "introRest" }, { kind: "text", ref: { heading: SAT_H1, take: [1, 2, 3, 4, 5] } }],
  },
  compare: { omitRows: [] },
  faq: [
    {
      question: "SAT nedir?",
      answer: {
        added: [
          "SAT, lisans başvurularında adayın okuma, yazma ve matematik becerilerini ölçen, College Board'un yaptığı bir sınavdır. Bugün dijital olarak, iki bölüm ve dört modül hâlinde yapılır.",
        ],
      },
    },
    {
      question: "SAT puanı kaç yıl geçerlidir?",
      answer: { added: ["College Board resmi bir geçerlilik süresi belirlemez; kaç yıllık puanın kabul edildiğini başvurulacak üniversite belirler."] },
    },
  ],
  updated: UPDATED,
  edits: {
    "SAT sınavına girecek kişilerin pratik, hazırlık ve ciddi bir çalışma yapması gerekir. SAT sınavında uzmanlaşmış bir dil okulu olarak öğrencimizi hem bilgi olarak hemde sınav psikolojisini yönetmek açısından geliştirmekteyiz. Öğretmenlerimiz öğrencinin gelişimini sürekli gözlemleyerek ödev takibi ile sık sık kontrol etmektedir. Amacımız öğrencinin sınavda hedeflenen en yüksek başarı puanını yakalamasını sağlamaktır. Bu sebeple SAT sınavından yüksek skor hedefleyen kişiler için SAT Özel ders programlarına katlmalarını tavsiye ediyoruz.":
      "SAT sınavına girecek kişilerin pratik, hazırlık ve ciddi bir çalışma yapması gerekir. SAT sınavında uzmanlaşmış bir dil okulu olarak öğrencimizi hem bilgi olarak hem de sınav psikolojisini yönetmek açısından geliştirmekteyiz. Öğretmenlerimiz öğrencinin gelişimini sürekli gözlemleyerek ödev takibi ile sık sık kontrol etmektedir. Amacımız öğrencinin sınavda hedeflenen en yüksek başarı puanını yakalamasını sağlamaktır. Bu sebeple SAT sınavından yüksek skor hedefleyen kişiler için SAT Özel ders programlarına katılmalarını tavsiye ediyoruz.",
  },
  ignored: [],
};

export const EXAM_PRIVATE_LESSONS: PrivateLessonDef[] = [TOEFL, IELTS, TOEIC, PTE, YDS, PROFICIENCY, GRE, GMAT, SAT];
