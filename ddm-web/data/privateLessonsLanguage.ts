/**
 * P4 — Dil özel ders sayfaları (8). Baskın bölüm: seviye merdiveni (onaylanan
 * "B" yönü). Ortak kurallar: `data/privateLessonsShared.ts`.
 *
 * Sınav ve seviye olguları resmi kaynaklardan doğrulandı; her dilin kaynağı
 * yanındaki yorumda. Firma metni kaynaktan birebir; yazım düzeltmeleri
 * `edits`te (orijinal → yeni, kullanıcı onayı P4).
 */

import { BRAND_SUFFIX_REASON } from "@/data/company";
import {
  PRIVATE_LESSON_PHOTO,
  cefrLead,
  cefrLevels,
  type LessonFaq,
  type LevelItem,
  type PrivateLessonDef,
} from "@/data/privateLessonsShared";

const YD = "/yabanci-dil-egitimleri";

/**
 * Hero fotoğrafları — birebir ders sahneleri (kullanıcının eklediği 3 görsel,
 * 2026-09-25; dil kursu sayfası şehir fotoğraflarını kullandığı için özel ders
 * hero'su onlardan ayrıldı). Sayfalara sırayla dağıtılır.
 */
const HERO_PHOTOS = [
  { src: "/assets/private_lesson.jpg", alt: "Kütüphanede kitap üzerinde birlikte çalışan iki öğrenci", width: 640, height: 480 },
  { src: "/assets/private_lesson2.jpg", alt: "Kitaplık önünde birebir derste kitap okuyan iki kişi", width: 735, height: 490 },
  { src: "/assets/private_lesson3.jpg", alt: "Öğretmeniyle masada birebir ders yapan öğrenci", width: 620, height: 348 },
] as const;

/** "Evinizde, ofisinizde, ya da DDM şubelerinde…" cümlesinin arayüz etiketi. */
const WHERE = { icon: "konum", label: "Evinizde, ofisinizde ya da şubede" } as const;

/** "X özel ders nedir?" — tanım cümlesi (yapay zekâ aramalarında alıntılanabilir). */
function definition(lang: string): LessonFaq {
  return {
    question: `${lang} özel ders nedir?`,
    answer: {
      added: [
        `${lang} özel ders, programın tek bir öğrencinin seviyesine, hedefine ve takvimine göre kurulduğu birebir ${lang} eğitimidir. Grup kursundan farkı, ders temposunun ve içeriğin sınıfa değil kişiye göre ayarlanmasıdır.`,
      ],
    },
  };
}

const LEVELS_TITLE = "Hedefiniz hangi basamakta?";

/* ---------------------------------------------------------------
 * ALMANCA (pilot, onaylandı 2026-09-24)
 *  - TestDaF: 4 bölüm, her bölüm ayrı TDN 3/4/5; TDN 3–5 = B2–C1; dört bölümde
 *    TDN 4 → neredeyse tüm bölümlere kabul (testdaf.de).
 *  - Aile birleşimi: A1, ör. Goethe-Zertifikat A1: Start Deutsch 1 (Auswärtiges Amt, BAMF).
 *  - Vatandaşlık: B1 (BAMF; StAG §10).
 * ------------------------------------------------------------- */
const DE_H1 = "Almanca Özel Ders Birebir Kurs Programları";
const DE_AREAS = "Almanca Özel Ders Verdiğimiz Alanlar";

const ALMANCA: PrivateLessonDef = {
  path: `${YD}/almanca-kursu/almanca-ozel-ders`,
  label: "Almanca Özel Ders",
  meta: {
    title: "Almanca Özel Ders Birebir Programlar | Dünya Dilleri Merkezi",
    reasons: ["title: kaynak 65 karakter (≤60) ve '|' öncesi boşluk eksik — 'Kurs Programları' → 'Programlar', ayraç düzeltildi"],
  },
  hero: {
    photo: HERO_PHOTOS[0],
    intro: { heading: DE_H1, take: [0] },
    split: true,
    facts: [WHERE, { icon: "sohbet", label: "Türk ve Alman öğretmenler" }],
  },
  feature: {
    kind: "levels",
    title: LEVELS_TITLE,
    lead: cefrLead("Almanca"),
    defaultKey: "C1",
    items: cefrLevels({
      A1: {
        exams: "Goethe-Zertifikat A1: Start Deutsch 1, telc Deutsch A1",
        who: "Almanya'daki eşinin yanına aile birleşimi vizesiyle gidecekler. Vize başvurusunda A1 düzeyinde dil belgesi istenir.",
      },
      A2: { exams: "Goethe-Zertifikat A2, telc Deutsch A2", who: "Almancayı günlük yaşamda kullanmaya başlayacaklar." },
      B1: {
        exams: "Goethe-Zertifikat B1, telc Deutsch B1",
        who: "Alman vatandaşlığına başvuracaklar. Vatandaşlık başvurusunda B1 düzeyi aranır.",
      },
      B2: { exams: "Goethe-Zertifikat B2, telc Deutsch B2, TestDaF (TDN 3)", who: "Almanca konuşulan bir iş ortamına hazırlananlar." },
      C1: {
        exams: "TestDaF (TDN 4 ve 5), telc Deutsch C1 Hochschule, Goethe-Zertifikat C1",
        who: "Almanya'da üniversiteye başvuracaklar. TestDaF'ın dört bölümünün hepsinde TDN 4 almak, bölümlerin neredeyse tamamına kabul için yeterlidir.",
      },
      C2: {
        exams: "Goethe-Zertifikat C2: Großes Deutsches Sprachdiplom, telc Deutsch C2",
        who: "Almancayı meslek dili olarak kullanacaklar.",
      },
    }),
  },
  about: {
    title: { source: DE_AREAS },
    photo: PRIVATE_LESSON_PHOTO,
    parts: [
      { kind: "introRest" },
      { kind: "text", ref: { heading: DE_H1, take: [1, 2] } },
      { kind: "areas", ref: { heading: DE_AREAS, take: "all" }, icons: ["belge", "kullanim", "dunya", "grup", "ulasim", "mezuniyet"] },
    ],
  },
  compare: { omitRows: [] },
  faq: [
    definition("Almanca"),
    { question: "Almanca özel ders nerede yapılıyor?", answer: { source: { heading: DE_H1, take: [3] } } },
    {
      question: "Almanca öğrenmek zor mu?",
      answer: {
        added: [
          "Almancada isimlerin üç artikeli (der, die, das) ve dört hâli vardır; başlangıçta en çok zorlayan konu budur. Buna karşılık Latin alfabesiyle yazılır ve kelimeler büyük ölçüde yazıldığı gibi okunur.",
        ],
      },
    },
    {
      question: "Almanya'da üniversite için hangi Almanca seviyesi gerekir?",
      answer: {
        added: [
          "Almanca eğitim veren bölümler genellikle C1 düzeyinde dil belgesi ister. TestDaF'ta dört bölümün hepsinden TDN 4 almak, bölümlerin neredeyse tamamına kabul için yeterlidir; telc Deutsch C1 Hochschule da bu amaçla kullanılır.",
        ],
      },
    },
  ],
  updated: "2026-09-24",
  edits: {
    // Yazım: "yanısıra" → "yanı sıra", "eğitimleride" → "eğitimleri de", "içinde" → "için de".
    "Gününü, saatini ve süresini siz belirleyin, DDM'in butik eğitim anlayışıyla hazırladığı Almanca özel ders programları ile kısa sürede Almanca dilini kalıcı yöntemlerle öğrenin. 2003 yılından itibaren profesyonel anlamda Almanca özel ders veren dil okulumuzda, özel şirket ve kamu çalışanlarının yanısıra, okul müfredatına uygun olarak Almanca eğitimleride verilmektedir.":
      "Gününü, saatini ve süresini siz belirleyin, DDM'in butik eğitim anlayışıyla hazırladığı Almanca özel ders programları ile kısa sürede Almanca dilini kalıcı yöntemlerle öğrenin. 2003 yılından itibaren profesyonel anlamda Almanca özel ders veren dil okulumuzda, özel şirket ve kamu çalışanlarının yanı sıra, okul müfredatına uygun olarak Almanca eğitimleri de verilmektedir.",
    "TESTDAF, TELC gibi uluslararası geçerliliğe sahip Almanca dil sınavlarına hazırlanan öğrenciler içinde her seviyede birebir Almanca özel ders programları hazırlamaktayız.":
      "TESTDAF, TELC gibi uluslararası geçerliliğe sahip Almanca dil sınavlarına hazırlanan öğrenciler için de her seviyede birebir Almanca özel ders programları hazırlamaktayız.",
  },
  ignored: [],
};

/* ---------------------------------------------------------------
 * İNGİLİZCE — Cambridge English (cambridgeenglish.org/exams-and-tests/qualifications),
 * IELTS ↔ CEFR (ielts.org "IELTS and the CEFR": 5.5–6.5 B2, 7–8 C1, 8.5+ C2),
 * TOEFL iBT 1–6 ↔ CEFR (ets.org score-scale-update: 1 A1 … 6 C2).
 * IELTS'in B1 aralığı resmi metinde yok → yazılmadı.
 * İngilizce Konuşma sayfası aynı merdiveni kullanır.
 * ------------------------------------------------------------- */
const LEVELS_EN: LevelItem[] = cefrLevels({
  A1: { exams: "TOEFL iBT 1–1,5 bant", who: "İngilizceye sıfırdan başlayanlar." },
  A2: { exams: "Cambridge A2 Key, TOEFL iBT 2–2,5 bant", who: "Günlük hayatta temel iletişim kurmak isteyenler." },
  B1: { exams: "Cambridge B1 Preliminary, TOEFL iBT 3–3,5 bant", who: "İşte ve seyahatte bağımsız iletişim kurmak isteyenler." },
  B2: {
    exams: "Cambridge B2 First, IELTS 5,5–6,5, TOEFL iBT 4–4,5 bant",
    who: "Yurtdışında lisans ya da yüksek lisansa başvuracaklar. İstenen puan programa göre değişir.",
  },
  C1: { exams: "Cambridge C1 Advanced, IELTS 7–8, TOEFL iBT 5–5,5 bant", who: "İngilizceyi akademik ve mesleki ortamda kullanacaklar." },
  C2: { exams: "Cambridge C2 Proficiency, IELTS 8,5 ve üzeri, TOEFL iBT 6 bant", who: "İngilizceyi meslek dili olarak kullanacaklar." },
});

const EN_EASY: LessonFaq = {
  question: "İngilizce öğrenmek zor mu?",
  answer: {
    added: [
      "İngilizcenin dil bilgisi, çekim ekleri ve isim cinsiyeti bakımından birçok dile göre sadedir; en çok zorlayan yanı yazılış ile okunuşun sık sık farklı olmasıdır. Günlük hayatta ve internette çok karşılaşıldığı için dinleme pratiği bulmak kolaydır.",
    ],
  },
};

const EN_H1 = "İngilizce Özel Ders Birebir Kurs Programları";
const EN_AREAS = "İngilizce Özel Ders Verdiğimiz Alanlar";

const INGILIZCE: PrivateLessonDef = {
  path: `${YD}/ingilizce-kursu/ingilizce-ozel-ders`,
  label: "İngilizce Özel Ders",
  meta: {
    title: "Birebir İngilizce Özel Ders | Dünya Dilleri Merkezi",
    reasons: ["title: kaynak 68 karakter (≤60) — 'Birebir İngilizce Özel Ders' olarak kısaltıldı"],
  },
  hero: {
    photo: HERO_PHOTOS[1],
    intro: { heading: EN_H1, take: [0] },
    split: true,
    // ← "Her yaş grubu için ayrı ayrı uygulanan… birebir özel ders sistemi…"
    facts: [WHERE, { icon: "ozelders", label: "Her yaş grubu için birebir" }],
  },
  feature: { kind: "levels", title: LEVELS_TITLE, lead: cefrLead("İngilizce"), defaultKey: "B2", items: LEVELS_EN },
  about: {
    title: { source: EN_AREAS },
    photo: PRIVATE_LESSON_PHOTO,
    parts: [
      { kind: "introRest" },
      { kind: "text", ref: { heading: EN_H1, take: [1] } },
      {
        kind: "areas",
        ref: { heading: EN_AREAS, take: "all" },
        icons: ["belge", "ucret", "dunya", "grup", "okuma", "ulasim", "konusma", "mezuniyet"],
      },
    ],
  },
  compare: { omitRows: [] },
  faq: [
    definition("İngilizce"),
    { question: "İngilizce özel ders nerede yapılıyor?", answer: { source: { heading: EN_H1, take: [2] } } },
    EN_EASY,
    {
      question: "IELTS ve TOEFL puanları hangi seviyeye karşılık gelir?",
      answer: {
        added: [
          "IELTS'e göre 5,5–6,5 bant B2, 7–8 bant C1, 8,5 ve üzeri C2 düzeyindedir. TOEFL iBT'nin Ocak 2026'da başlayan 1–6 puanı doğrudan CEFR ile eşleşir: 4 bant B2, 5 bant C1, 6 bant C2.",
        ],
      },
    },
  ],
  updated: "2026-09-25",
  ignored: [],
};

/* ---------------------------------------------------------------
 * FRANSIZCA — DELF A1–B2, DALF C1–C2 (France Éducation international;
 * erişim engelli, Campus France üzerinden): diplomalar süresiz geçerli;
 * DELF B2 / DALF C1-C2 üniversite başvurusunda dil belgesi olarak kabul edilir,
 * kurum ayrıca kendi şartını koyabilir (campusfrance.org "dispenses").
 * ------------------------------------------------------------- */
const FR_H1 = "Fransızca Özel Ders Birebir Kurs Programları";
const FR_AREAS = "Fransızca Özel Ders Verdiğimiz Alanlar";
const FR_SCHOOL = "Fransız Ortaokul Lise ve Üniversite Öğrencilerinin Okul Müfredatına Yönelik Fransızca Özel Ders Programları";

const FRANSIZCA: PrivateLessonDef = {
  path: `${YD}/fransizca-kursu/fransizca-ozel-ders`,
  label: "Fransızca Özel Ders",
  meta: {
    title: "Birebir Fransızca Özel Ders | Dünya Dilleri Merkezi",
    reasons: ["title: kaynak 67 karakter (≤60) — 'Birebir Fransızca Özel Ders' olarak kısaltıldı"],
  },
  hero: {
    photo: HERO_PHOTOS[2],
    intro: { heading: FR_H1, take: [0] },
    split: true,
    // ← "Fransız lisesinden mezun Türk ve Fransız öğretmenlerden oluşan öğretim kadromuz…"
    facts: [WHERE, { icon: "sohbet", label: "Türk ve Fransız öğretmenler" }],
  },
  feature: {
    kind: "levels",
    title: LEVELS_TITLE,
    lead: cefrLead("Fransızca"),
    defaultKey: "B2",
    items: cefrLevels({
      A1: { exams: "DELF A1", who: "Fransızcaya yeni başlayanlar." },
      A2: { exams: "DELF A2", who: "Günlük hayatta temel iletişim kuracaklar." },
      B1: { exams: "DELF B1", who: "Fransızca konuşulan bir ülkede bağımsız iletişim kuracaklar." },
      B2: {
        exams: "DELF B2",
        who: "Fransa'da üniversiteye başvuracaklar. DELF B2, başvuruda Fransızca yeterlik belgesi olarak kabul edilir; kurumlar ayrıca kendi şartını koyabilir.",
      },
      C1: { exams: "DALF C1", who: "Fransızcayı akademik ve mesleki ortamda kullanacaklar." },
      C2: { exams: "DALF C2", who: "Fransızcayı meslek dili olarak kullanacaklar." },
    }),
  },
  about: {
    title: { source: FR_AREAS },
    photo: PRIVATE_LESSON_PHOTO,
    parts: [
      { kind: "introRest" },
      { kind: "text", ref: { heading: FR_H1, take: [1, 2, 3, 4] } },
      { kind: "areas", ref: { heading: FR_AREAS, take: "all" }, icons: ["belge", "dunya", "grup", "ulasim"] },
      { kind: "areaGroup", heading: FR_SCHOOL, icon: "mezuniyet" },
    ],
  },
  compare: { omitRows: [] },
  faq: [
    definition("Fransızca"),
    { question: "Fransızca özel ders nerede yapılıyor?", answer: { source: { heading: FR_H1, take: [5] } } },
    {
      question: "Fransızca öğrenmek zor mu?",
      answer: {
        added: [
          "Fransızcada isimlerin iki cinsiyeti (le, la) vardır, fiil çekimleri zengindir ve yazılan harflerin bir kısmı okunmaz. Buna karşılık Latin alfabesiyle yazılır ve Türkçeye geçmiş birçok kelime (kuaför, pantolon gibi) tanıdık gelir.",
        ],
      },
    },
    {
      question: "Fransa'da üniversite için hangi belge gerekir?",
      answer: {
        added: [
          "Fransızca eğitim veren programlar genellikle B2 düzeyi bekler. DELF B2 ya da DALF C1/C2 sahipleri başvuruda ayrıca TCF sınavına girmek zorunda kalmaz; ancak her kurum kendi şartını koyabilir. DELF ve DALF diplomaları süresiz geçerlidir.",
        ],
      },
    },
  ],
  updated: "2026-09-25",
  edits: {
    "Gününü, saatini ve program süresini siz belirleyin, DDM'in butik eğitim anlayışıyla hazırladığı Fransızca özel ders programları ile kısa sürede Fransızca dilini kalıcı yöntemlerle öğrenin. 2003 yılından itibaren profesyonel anlamda Fransızca özel ders veren dil okulumuzda, özel şirket ve kamu çalışanlarının yanısıra, okul müfredatına uygun olarak Fransızca eğitimleride verilmektedir.":
      "Gününü, saatini ve program süresini siz belirleyin, DDM'in butik eğitim anlayışıyla hazırladığı Fransızca özel ders programları ile kısa sürede Fransızca dilini kalıcı yöntemlerle öğrenin. 2003 yılından itibaren profesyonel anlamda Fransızca özel ders veren dil okulumuzda, özel şirket ve kamu çalışanlarının yanı sıra, okul müfredatına uygun olarak Fransızca eğitimleri de verilmektedir.",
    "Uluslararası geçerliliğe sahip Fransızca DELF sınavına hazırlanan öğrenciler içinde her seviyede birebir Fransızca özel ders programları hazırlamaktayız.":
      "Uluslararası geçerliliğe sahip Fransızca DELF sınavına hazırlanan öğrenciler için de her seviyede birebir Fransızca özel ders programları hazırlamaktayız.",
    "Fransıza özel ders eğitim sistemimiz, kişiye özgü dinamikleri ve özellikleri olan bir eğitim sistemidir. Öğrencilerimizin aldıkları derslerle başarıya ulaşmalarındaki en büyük etken özel ders eğitim sisteminin gerekli materyallerini aktif bir şekilde kullanmak ile mümkün olmaktadır.":
      "Fransızca özel ders eğitim sistemimiz, kişiye özgü dinamikleri ve özellikleri olan bir eğitim sistemidir. Öğrencilerimizin aldıkları derslerle başarıya ulaşmalarındaki en büyük etken özel ders eğitim sisteminin gerekli materyallerini aktif bir şekilde kullanmak ile mümkün olmaktadır.",
  },
  ignored: [],
};

/* ---------------------------------------------------------------
 * İSPANYOLCA — DELE A1–C2 (examenes.cervantes.es/es/dele/que-es): süresiz
 * geçerli. Vatandaşlık: DELE A2 veya üstü + CCSE (examenes.cervantes.es/es/presentacion/nacionalidad).
 * ------------------------------------------------------------- */
const ES_H1 = "İspanyolca Özel Ders Birebir Kurs Programları";
const ES_AREAS = "İspanyolca Özel Ders Verdiğimiz Alanlar";

const ISPANYOLCA: PrivateLessonDef = {
  path: `${YD}/ispanyolca-kursu/ispanyolca-ozel-ders`,
  label: "İspanyolca Özel Ders",
  meta: { reasons: [] },
  hero: {
    photo: HERO_PHOTOS[0],
    intro: { heading: ES_H1, take: [0] },
    split: true,
    facts: [WHERE, { icon: "sohbet", label: "İspanyol öğretmenler" }],
  },
  feature: {
    kind: "levels",
    title: LEVELS_TITLE,
    lead: cefrLead("İspanyolca"),
    defaultKey: "B2",
    items: cefrLevels({
      A1: { exams: "DELE A1", who: "İspanyolcaya yeni başlayanlar." },
      A2: {
        exams: "DELE A2",
        who: "İspanyol vatandaşlığına başvuracaklar. Başvuruda DELE A2 ya da üstü diploma ve CCSE sınavı istenir.",
      },
      B1: { exams: "DELE B1", who: "İspanyolca konuşulan bir ülkede okuyacak ya da çalışacaklar." },
      B2: { exams: "DELE B2", who: "İspanyolca eğitim veren bir programa başvuracaklar. İstenen seviye kuruma göre değişir." },
      C1: { exams: "DELE C1", who: "İspanyolcayı akademik ve mesleki ortamda kullanacaklar." },
      C2: { exams: "DELE C2", who: "İspanyolcayı meslek dili olarak kullanacaklar." },
    }),
  },
  about: {
    title: { source: ES_AREAS },
    photo: PRIVATE_LESSON_PHOTO,
    parts: [
      { kind: "introRest" },
      { kind: "text", ref: { heading: ES_H1, take: [1, 2] } },
      {
        kind: "areas",
        ref: { heading: ES_AREAS, take: "all" },
        icons: ["belge", "mezuniyet", "kullanim", "dunya", "grup", "ulasim", "okuma"],
      },
    ],
  },
  compare: { omitRows: [] },
  faq: [
    definition("İspanyolca"),
    { question: "İspanyolca özel ders nerede yapılıyor?", answer: { source: { heading: ES_H1, take: [3] } } },
    {
      question: "İspanyolca öğrenmek zor mu?",
      answer: {
        added: [
          "İspanyolcada kelimeler büyük ölçüde yazıldığı gibi okunur; bu yüzden telaffuz kısa sürede oturur. En çok zaman isteyen konular fiil çekimleri ve iki ayrı \"olmak\" fiilidir (ser ve estar).",
        ],
      },
    },
    {
      question: "İspanyol vatandaşlığı için hangi sınav gerekir?",
      answer: {
        added: [
          "İspanyol vatandaşlığı başvurusunda Instituto Cervantes'in DELE A2 ya da daha üst düzey diploması ve İspanya'nın anayasası ile toplumu hakkındaki CCSE sınavı istenir. DELE diplomaları süresiz geçerlidir.",
        ],
      },
    },
  ],
  updated: "2026-09-25",
  edits: {
    "Gününü, saatini ve süresini siz belirleyin, DDM'in butik eğitim anlayışıyla hazırladığı İspanyolca özel ders programları ile kısa sürede İspanyolca dilini kalıcı yöntemlerle öğrenmeye başlayın. 2003 yılından itibaren profesyonel anlamda İspanyolca özel ders veren dil okulumuzda, özel şirket ve kamu çalışanlarının yanısıra, okul müfredatına uygun olarak İspanyolca eğitimleride verilmektedir.":
      "Gününü, saatini ve süresini siz belirleyin, DDM'in butik eğitim anlayışıyla hazırladığı İspanyolca özel ders programları ile kısa sürede İspanyolca dilini kalıcı yöntemlerle öğrenmeye başlayın. 2003 yılından itibaren profesyonel anlamda İspanyolca özel ders veren dil okulumuzda, özel şirket ve kamu çalışanlarının yanı sıra, okul müfredatına uygun olarak İspanyolca eğitimleri de verilmektedir.",
    "Uluslararası geçerliliğe sahip İspanyolca DELE sınavına hazırlanan ve Erasmus programına katılacak olan öğrenciler içinde her seviyede birebir İspanyolca özel ders programları hazırlamaktayız.":
      "Uluslararası geçerliliğe sahip İspanyolca DELE sınavına hazırlanan ve Erasmus programına katılacak olan öğrenciler için de her seviyede birebir İspanyolca özel ders programları hazırlamaktayız.",
  },
  ignored: [],
};

/* ---------------------------------------------------------------
 * İTALYANCA — CELI (cvcl.unistrapg.it: Impatto A1, 1 A2 … 5 C2), CILS
 * (cils.unistrasi.it: A1, A2, UNO-B1, DUE-B2, TRE-C1, QUATTRO-C2).
 * Vatandaşlık: en az B1 (L. 91/1992 md. 9.1, DL 113/2018). Üniversite: MUR
 * 2026-27 yabancı öğrenci genelgesi §6 — İtalyanca programlar en az B2.
 * ------------------------------------------------------------- */
const IT_H1 = "İtalyanca Özel Ders Birebir Kurs Programları";
const IT_AREAS = "İtalyanca Özel Ders Verdiğimiz Alanlar";

const ITALYANCA: PrivateLessonDef = {
  path: `${YD}/italyanca-kursu/italyanca-ozel-ders`,
  label: "İtalyanca Özel Ders",
  meta: {
    title: "Birebir İtalyanca Özel Ders | Dünya Dilleri Merkezi",
    reasons: ["title: kaynak 67 karakter (≤60) — 'Birebir İtalyanca Özel Ders' olarak kısaltıldı"],
  },
  hero: {
    photo: HERO_PHOTOS[1],
    intro: { heading: IT_H1, take: [0] },
    split: true,
    facts: [WHERE, { icon: "sohbet", label: "İtalyan öğretmenler" }],
  },
  feature: {
    kind: "levels",
    title: LEVELS_TITLE,
    lead: cefrLead("İtalyanca"),
    defaultKey: "B2",
    items: cefrLevels({
      A1: { exams: "CELI Impatto, CILS A1", who: "İtalyancaya yeni başlayanlar." },
      A2: { exams: "CELI 1, CILS A2", who: "Günlük hayatta temel iletişim kuracaklar." },
      B1: { exams: "CELI 2, CILS UNO-B1", who: "İtalyan vatandaşlığına başvuracaklar. Başvuruda en az B1 İtalyanca şartı vardır." },
      B2: {
        exams: "CELI 3, CILS DUE-B2",
        who: "İtalya'da İtalyanca eğitim veren bir lisans ya da yüksek lisans programına başvuracaklar. Bu programlar en az B2 düzeyi ister.",
      },
      C1: { exams: "CELI 4, CILS TRE-C1", who: "İtalyancayı akademik ve mesleki ortamda kullanacaklar." },
      C2: { exams: "CELI 5, CILS QUATTRO-C2", who: "İtalyancayı meslek dili olarak kullanacaklar." },
    }),
  },
  about: {
    title: { source: IT_AREAS },
    photo: PRIVATE_LESSON_PHOTO,
    parts: [
      { kind: "introRest" },
      { kind: "text", ref: { heading: IT_H1, take: [1, 2] } },
      { kind: "areas", ref: { heading: IT_AREAS, take: "all" }, icons: ["belge", "dunya", "grup", "ulasim", "mezuniyet"] },
    ],
  },
  compare: { omitRows: [] },
  faq: [
    definition("İtalyanca"),
    { question: "İtalyanca özel ders nerede yapılıyor?", answer: { source: { heading: IT_H1, take: [3] } } },
    {
      question: "İtalyanca öğrenmek zor mu?",
      answer: {
        added: [
          "İtalyanca büyük ölçüde yazıldığı gibi okunur ve ünlüyle biten kelimeleri Türkçe konuşanlar için telaffuzu kolaylaştırır. İsimlerin iki cinsiyeti vardır; en çok zaman isteyen konu fiil çekimleridir.",
        ],
      },
    },
    {
      question: "İtalya'da üniversite için hangi İtalyanca seviyesi gerekir?",
      answer: {
        added: [
          "İtalya Üniversite ve Araştırma Bakanlığı'nın yabancı öğrenci genelgesine göre İtalyanca eğitim veren lisans ve yüksek lisans programları en az B2 düzeyi ister. Her üniversite kendi dil sınavını yapar; tanınmış bir kurumdan B2 ya da üstü sertifikası olanlar bu sınavdan muaf tutulabilir.",
        ],
      },
    },
  ],
  updated: "2026-09-25",
  edits: {
    "Gününü, saatini ve süresini siz belirleyin, DDM'in butik eğitim anlayışıyla hazırladığı İtalyanca özel ders programları ile kısa sürede İtalyanca dilini kalıcı yöntemlerle öğrenmeye başlayın. 2003 yılından itibaren profesyonel anlamda İtalyanca özel ders veren dil okulumuzda, özel şirket ve kamu çalışanlarının yanısıra, okul müfredatına uygun olarak İtalyanca eğitimleride verilmektedir.":
      "Gününü, saatini ve süresini siz belirleyin, DDM'in butik eğitim anlayışıyla hazırladığı İtalyanca özel ders programları ile kısa sürede İtalyanca dilini kalıcı yöntemlerle öğrenmeye başlayın. 2003 yılından itibaren profesyonel anlamda İtalyanca özel ders veren dil okulumuzda, özel şirket ve kamu çalışanlarının yanı sıra, okul müfredatına uygun olarak İtalyanca eğitimleri de verilmektedir.",
    "Uluslararası geçerliliğe sahip İtalyanca CELI ve CILS sınavına hazırlanan ve öğrenciler için her seviyede birebir İtalyanlca özel ders programları hazırlamaktayız.":
      "Uluslararası geçerliliğe sahip İtalyanca CELI ve CILS sınavına hazırlanan öğrenciler için her seviyede birebir İtalyanca özel ders programları hazırlamaktayız.",
  },
  ignored: [],
};

/* ---------------------------------------------------------------
 * RUSÇA — TORFL/ТРКИ (testingcenter.spbu.ru; testrf.rudn.ru): ТЭУ A1, ТБУ A2,
 * ТРКИ-1 B1 … ТРКИ-4 C2. ТРКИ-1 resmi test merkezlerine göre Rusça eğitim için
 * gerekli; bakanlık düzeyinde genel zorunluluk doğrulanamadı → "kuruma göre değişebilir".
 * ------------------------------------------------------------- */
const RU_H1 = "Rusça Özel Ders Birebir Kurs Programları";
const RU_AREAS = "Rusça Özel Ders Verdiğimiz Alanlar";

const RUSCA: PrivateLessonDef = {
  path: `${YD}/rusca-kursu/rusca-ozel-ders`,
  label: "Rusça Özel Ders",
  meta: {
    title: "Rusça Özel Ders Birebir Programlar | Dünya Dilleri Merkezi",
    reasons: ["title: kaynak 63 karakter (≤60) — 'Kurs Programları' → 'Programlar', ayraç düzeltildi"],
  },
  hero: {
    photo: HERO_PHOTOS[2],
    intro: { heading: RU_H1, take: [0] },
    split: true,
    facts: [WHERE, { icon: "sohbet", label: "Rus öğretmenler" }],
  },
  feature: {
    kind: "levels",
    title: LEVELS_TITLE,
    lead: cefrLead("Rusça"),
    defaultKey: "B1",
    items: cefrLevels({
      A1: { exams: "TORFL temel öncesi seviye (ТЭУ)", who: "Rusçaya yeni başlayanlar." },
      A2: { exams: "TORFL temel seviye (ТБУ)", who: "Günlük hayatta temel iletişim kuracaklar." },
      B1: {
        exams: "TORFL-1 (ТРКИ-1)",
        who: "Rusya'da Rusça eğitim veren bir üniversitede okuyacaklar. Resmi test merkezlerine göre bunun için TORFL-1 gerekir.",
      },
      B2: { exams: "TORFL-2 (ТРКИ-2)", who: "Rusya'da lisans ya da yüksek lisans diploması alacaklar." },
      C1: { exams: "TORFL-3 (ТРКИ-3)", who: "Filoloji, çeviri ve gazetecilik gibi dil ağırlıklı bölümlerde okuyacaklar." },
      C2: { exams: "TORFL-4 (ТРКИ-4)", who: "Rusçayı meslek dili olarak kullanacaklar." },
    }),
  },
  about: {
    title: { source: RU_AREAS },
    photo: PRIVATE_LESSON_PHOTO,
    parts: [
      { kind: "introRest" },
      { kind: "text", ref: { heading: RU_H1, take: [1] } },
      { kind: "areas", ref: { heading: RU_AREAS, take: "all" }, icons: ["belge", "kullanim", "dunya", "grup", "ulasim", "mezuniyet"] },
    ],
  },
  compare: { omitRows: [] },
  faq: [
    definition("Rusça"),
    { question: "Rusça özel ders nerede yapılıyor?", answer: { source: { heading: RU_H1, take: [2] } } },
    {
      question: "Rusça öğrenmek zor mu?",
      answer: {
        added: [
          "Rusça Kiril alfabesiyle yazılır; alfabe birkaç haftada öğrenilir. Asıl zaman isteyen konular altı hâlli isim çekimi ve fiillerdeki bitmiş-bitmemiş eylem ayrımıdır.",
        ],
      },
    },
    {
      question: "Rusya'da üniversite için hangi Rusça seviyesi gerekir?",
      answer: {
        added: [
          "Resmi test merkezlerine (St. Petersburg Devlet Üniversitesi, RUDN) göre Rusça eğitim için TORFL-1 (B1) sertifikası gerekir; diploma alabilmek için TORFL-2 (B2) istenir. Şartlar kuruma göre değişebilir.",
        ],
      },
    },
  ],
  updated: "2026-09-25",
  edits: {
    "Gününü, saatini, süresini siz belirleyin, DDM'in butik eğitim anlayışıyla hazırladığı Rusça özel ders programları ile kısa sürede Rusça dilini kalıcı yöntemlerle öğrenin. 2003 yılından bugüne profesyonel anlamda Rusça özel ders veren dil okulumuz, özel şirket ve kamu çalışanlarının yanısıra, okul müfredatına yönelik sınavlara hazırlanan öğrenciler içinde her seviyede birebir Rusça ders programları hazırlamaktadır.":
      "Gününü, saatini, süresini siz belirleyin, DDM'in butik eğitim anlayışıyla hazırladığı Rusça özel ders programları ile kısa sürede Rusça dilini kalıcı yöntemlerle öğrenin. 2003 yılından bugüne profesyonel anlamda Rusça özel ders veren dil okulumuz, özel şirket ve kamu çalışanlarının yanı sıra, okul müfredatına yönelik sınavlara hazırlanan öğrenciler için de her seviyede birebir Rusça ders programları hazırlamaktadır.",
  },
  ignored: [],
};

/* ---------------------------------------------------------------
 * ÇİNCE — HSK (chinesetest.cn/hsk): yaygın sürüm 6 seviye; yeni standartta
 * 1–3 başlangıç, 4–6 orta, 7–9 ileri. RESMİ CEFR EŞLEŞMESİ YOK → merdiven CEFR
 * değil HSK. Seviye tanımları HSK'nın kendi seviye açıklamalarının özeti.
 * Çin Hükümeti Bursu 2026/27 (id.china-embassy.gov.cn): Çince yüksek lisans ve
 * doktora HSK 4, misafir öğrenci programları HSK 3. Lisans için "genellikle HSK 4"
 * (MOE 2018 kalite normu yorumu) → "genellikle".
 * ------------------------------------------------------------- */
const ZH_H1 = "Çince Özel Ders Birebir Kurs Programları";
const ZH_AREAS = "Çince Özel Ders Verdiğimiz Alanlar";

const LEVELS_ZH: LevelItem[] = [
  { key: "HSK 1", name: "Başlangıç", can: "Çok basit Çince kelime ve kalıpları anlar ve kullanırsınız.", exams: "HSK 1", who: "Çinceye yeni başlayanlar." },
  { key: "HSK 2", name: "Başlangıç", can: "Günlük hayattaki basit ve rutin konularda kısa iletişim kurarsınız.", exams: "HSK 2", who: "Günlük hayatta temel Çince kullanacaklar." },
  {
    key: "HSK 3",
    name: "Başlangıç",
    can: "Günlük, okul ve iş hayatında temel düzeyde iletişim kurar, Çin'deki bir seyahatte karşılaşılan durumların çoğunu idare edersiniz.",
    exams: "HSK 3",
    who: "Çince eğitimli burs programlarına başvuracaklar. Çin Hükümeti Bursu'nun misafir öğrenci programları HSK 3 ister.",
  },
  {
    key: "HSK 4",
    name: "Orta",
    can: "Geniş bir konu yelpazesinde Çince konuşur, anadili Çince olanlarla akıcı iletişim kurarsınız.",
    exams: "HSK 4",
    who: "Çince eğitim veren bir programa başvuracaklar. Lisans programları genellikle, Çin Hükümeti Bursu'nun Çince yüksek lisans ve doktora programları ise açıkça HSK 4 ister.",
  },
  { key: "HSK 5", name: "Orta", can: "Çince gazete ve dergi okur, film izler, bir konuşmayı baştan sona yapabilirsiniz.", exams: "HSK 5", who: "Çince konuşulan bir iş ortamında çalışacaklar." },
  { key: "HSK 6", name: "Orta", can: "Çince yazılı ve sözlü bilgiyi kolayca anlar, kendinizi etkili biçimde ifade edersiniz.", exams: "HSK 6", who: "Çinceyi meslek dili olarak kullanacaklar." },
];

const CINCE: PrivateLessonDef = {
  path: `${YD}/cince-kursu/cince-ozel-ders`,
  label: "Çince Özel Ders",
  meta: {
    title: "Çince Özel Ders Birebir Programlar | Dünya Dilleri Merkezi",
    reasons: ["title: kaynak 63 karakter (≤60) — 'Kurs Programları' → 'Programlar', ayraç düzeltildi"],
  },
  hero: {
    photo: HERO_PHOTOS[0],
    intro: { heading: ZH_H1, take: [0] },
    split: true,
    facts: [WHERE, { icon: "sohbet", label: "Çinli öğretmenler" }],
  },
  feature: {
    kind: "levels",
    title: LEVELS_TITLE,
    lead:
      "Çince yeterliği Çin'in uluslararası sınavı HSK ile ölçülür. Yaygın kullanılan sürüm altı seviyelidir; yeni standartta ileri düzey için HSK 7–9 da vardır. HSK seviyelerinin CEFR ile resmi bir karşılığı yoktur. Bir seviye seçin: neler yapabildiğinizi ve kimin işine yaradığını görün.",
    defaultKey: "HSK 4",
    items: LEVELS_ZH,
  },
  about: {
    title: { source: ZH_AREAS },
    photo: PRIVATE_LESSON_PHOTO,
    parts: [
      { kind: "introRest" },
      { kind: "text", ref: { heading: ZH_H1, take: [1] } },
      { kind: "areas", ref: { heading: ZH_AREAS, take: "all" }, icons: ["dunya", "grup", "ulasim", "mezuniyet"] },
    ],
  },
  compare: { omitRows: [] },
  faq: [
    definition("Çince"),
    { question: "Çince özel ders nerede yapılıyor?", answer: { source: { heading: ZH_H1, take: [2] } } },
    {
      question: "Çince öğrenmek zor mu?",
      answer: {
        added: [
          "Standart Çince (Mandarin) tonlu bir dildir: aynı hece farklı tonla farklı anlam taşır. Yazıda alfabe yerine karakterler kullanılır; okunuş, pinyin denen Latin harfli sistemle öğretilir. Buna karşılık fiiller çekimlenmez, zaman ve kişi ekleri yoktur.",
        ],
      },
    },
    {
      question: "HSK nedir?",
      answer: {
        added: [
          "HSK, Çin'in uluslararası Çince yeterlik sınavıdır. Yaygın kullanılan sürümü altı seviyelidir; yeni standartta seviyeler 1–3 başlangıç, 4–6 orta ve 7–9 ileri olarak gruplanır. HSK seviyelerinin CEFR ile resmi bir karşılığı yoktur.",
        ],
      },
    },
  ],
  updated: "2026-09-25",
  edits: {
    "Gününü, saatini ve süresini siz belirleyin, DDM'in butik eğitim anlayışıyla hazırladığı Çince özel ders programları ile kısa sürede Çince dilini kalıcı yöntemlerle öğrenmeye başlayın. 2003 yılından itibaren profesyonel anlamda Çince özel ders veren dil okulumuzda, özel şirket ve kamu çalışanlarının yanısıra, okul müfredatına uygun olarak Çince eğitimleride verilmektedir.":
      "Gününü, saatini ve süresini siz belirleyin, DDM'in butik eğitim anlayışıyla hazırladığı Çince özel ders programları ile kısa sürede Çince dilini kalıcı yöntemlerle öğrenmeye başlayın. 2003 yılından itibaren profesyonel anlamda Çince özel ders veren dil okulumuzda, özel şirket ve kamu çalışanlarının yanı sıra, okul müfredatına uygun olarak Çince eğitimleri de verilmektedir.",
  },
  ignored: [],
};

/* ---------------------------------------------------------------
 * TÜRKÇE (yabancılar için) — Yunus Emre Enstitüsü TYS (tys.yee.org.tr): CEFR
 * tanımlarına göre; belge YALNIZ B2 ve C1. YÖK dil şartını üniversitelere bırakır;
 * örnekler: Dokuz Eylül (C1 yeterli, B1/B2 hazırlık), İstanbul Ü. (B2 ile başlar,
 * 3. yıla kadar C1) → "çoğunlukla C1; bazıları B2 ile şartlı".
 * ------------------------------------------------------------- */
const TR_H1 = "Yabancılar İçin Türkçe Özel Ders";
const TYS_NONE = "Yunus Emre Enstitüsü TYS bu seviyede belge vermez";

const TURKCE: PrivateLessonDef = {
  path: `${YD}/yabancila-icin-turkce-kurs/turkce-ozel-ders`,
  label: "Yabancılar İçin Türkçe Özel Ders",
  meta: { brandSuffix: true, reasons: [BRAND_SUFFIX_REASON] },
  hero: {
    photo: HERO_PHOTOS[1],
    intro: { heading: TR_H1, take: [0] },
    split: true,
    facts: [WHERE, { icon: "sohbet", label: "Türk öğretmenler" }],
  },
  feature: {
    kind: "levels",
    title: LEVELS_TITLE,
    lead: cefrLead("Türkçe"),
    defaultKey: "C1",
    items: cefrLevels({
      A1: { exams: TYS_NONE, who: "Türkiye'ye yeni taşınanlar." },
      A2: { exams: TYS_NONE, who: "Türkçeyi günlük yaşamda kullanmaya başlayacaklar." },
      B1: { exams: TYS_NONE, who: "Türkiye'de çalışacak ya da iş hayatına katılacaklar." },
      B2: {
        exams: "Yunus Emre Enstitüsü TYS (B2 belgesi)",
        who: "Türkçe eğitim veren bir üniversiteye başlayacaklar. Bazı üniversiteler B2 ile bölüme başlatıp belirli bir süre içinde C1 belgesi bekler.",
      },
      C1: { exams: "Yunus Emre Enstitüsü TYS (C1 belgesi)", who: "Türkçe eğitim veren üniversite programlarına başvuracaklar. Bu programlar çoğunlukla C1 ister." },
      C2: { exams: "TYS en fazla C1 belgesi verir", who: "Türkçeyi meslek dili olarak kullanacaklar." },
    }),
  },
  about: {
    title: { added: "Yabancılar için Türkçe özel ders programı" },
    photo: PRIVATE_LESSON_PHOTO,
    parts: [{ kind: "introRest" }, { kind: "text", ref: { heading: TR_H1, take: [1] } }],
  },
  compare: { omitRows: [] },
  faq: [
    definition("Türkçe"),
    { question: "Türkçe özel ders nerede yapılıyor?", answer: { source: { heading: TR_H1, take: [2] } } },
    {
      question: "Türkçe öğrenmek zor mu?",
      answer: {
        added: [
          "Türkçe sondan eklemeli bir dildir: anlam köke eklenen eklerle kurulur ve ünlü uyumu bu eklerin biçimini belirler. Buna karşılık Latin alfabesiyle yazılır, kelimeler yazıldığı gibi okunur ve isimlerde cinsiyet yoktur.",
        ],
      },
    },
    {
      question: "Türk üniversitelerinde okumak için hangi Türkçe seviyesi gerekir?",
      answer: {
        added: [
          "YÖK bu şartı üniversitelere bırakır. Türkçe eğitim veren programlar çoğunlukla C1 ister; bazı üniversiteler öğrenciyi B2 ile bölüme başlatıp belirli bir süre içinde C1 belgesi bekler. Yunus Emre Enstitüsü'nün TYS sınavı B2 ve C1 seviyelerinde belge verir.",
        ],
      },
    },
  ],
  updated: "2026-09-25",
  edits: {
    "Türkiye'de yaşayan, Türkçe dilini akıcı yöntemlerle öğrenmeyi hedefleyen yabancılar için özel bir program hazırldık. Gününü, saatini ve süresini siz belirleyin, DDM'in butik eğitim anlayışıyla hazırladığı Türkçe özel ders programları ile kısa sürede Türkçe dilini kalıcı yöntemlerle öğrenmeye başlayın. 2003 yılından itibaren profesyonel anlamda Türkçe özel ders veren dil okulumuzda, özel şirket çalışanlarının yanısıra, okul müfredatına uygun olarak Türkçe eğitimleride verilmektedir.":
      "Türkiye'de yaşayan, Türkçe dilini akıcı yöntemlerle öğrenmeyi hedefleyen yabancılar için özel bir program hazırladık. Gününü, saatini ve süresini siz belirleyin, DDM'in butik eğitim anlayışıyla hazırladığı Türkçe özel ders programları ile kısa sürede Türkçe dilini kalıcı yöntemlerle öğrenmeye başlayın. 2003 yılından itibaren profesyonel anlamda Türkçe özel ders veren dil okulumuzda, özel şirket çalışanlarının yanı sıra, okul müfredatına uygun olarak Türkçe eğitimleri de verilmektedir.",
  },
  ignored: [],
};

/* ---------------------------------------------------------------
 * İNGİLİZCE KONUŞMA — İngilizce merdiveni. Kaynak meta description başka bir
 * sayfanın (Ataşehir ön kayıt formu) kopyası → bariz hata, düzeltildi.
 * ------------------------------------------------------------- */
const SPEAK_H1 = "İngilizce Konuşma Bire Bir Özel Ders Eğitimi";

const INGILIZCE_KONUSMA: PrivateLessonDef = {
  path: `${YD}/ingilizce-konusma-kursu/ingilizce-konusma-ozel-ders`,
  label: "İngilizce Konuşma Özel Ders",
  meta: {
    title: "İngilizce Konuşma Özel Ders | Dünya Dilleri Merkezi",
    description:
      "İngilizce konuşma bire bir özel ders: yabancı öğretim üyelerinin kişiye özel hazırladığı telaffuz, akıcı konuşma ve pratik konuşma programı.",
    reasons: [
      "title: kaynak 68 karakter (≤60) — 'İngilizce Konuşma Özel Ders' olarak kısaltıldı",
      "description: kaynak Ataşehir şubesi ön kayıt formunun açıklamasıydı (kopyala-yapıştır hatası) — sayfanın kendi içeriğinden yazıldı",
    ],
  },
  hero: {
    photo: HERO_PHOTOS[2],
    intro: { heading: SPEAK_H1, take: [0] },
    split: true,
    facts: [
      // ← "…Yabancı öğretim üyelerinin kişiye özel olarak hazırladığı bir program ile…"
      { icon: "sohbet", label: "Yabancı öğretim üyelerinin hazırladığı program" },
      // ← "…istediğiniz gün ve saatlerde katılabilirsiniz."
      { icon: "takvim", label: "İstediğiniz gün ve saatlerde" },
    ],
  },
  feature: { kind: "levels", title: LEVELS_TITLE, lead: cefrLead("İngilizce"), defaultKey: "B1", items: LEVELS_EN },
  about: {
    title: { added: "İngilizce konuşma özel ders programı" },
    photo: PRIVATE_LESSON_PHOTO,
    parts: [
      { kind: "introRest" },
      { kind: "text", ref: { heading: SPEAK_H1, take: [1] } },
      {
        kind: "areas",
        ref: { heading: SPEAK_H1, take: [2, 3, 4, 5, 6, 7] },
        icons: ["dinleme", "konusma", "kelime", "sohbet", "aktivite", "grup"],
      },
    ],
  },
  compare: { omitRows: [] },
  faq: [
    definition("İngilizce konuşma"),
    { question: "İngilizce konuşma özel dersine kimler katılabilir?", answer: { source: { heading: SPEAK_H1, take: [8] } } },
    EN_EASY,
  ],
  updated: "2026-09-25",
  edits: {
    "Türkiye'de genel olarak Türk hocalardan alınan İngilizce konuşma dersleriyle, İngilizce konuşma becerisinin geliştirilemeyeceği kanısı yaygındır. Karşınızda İngilizce'yi iyi derecede konuşan bir Türk bile olsa, Malesef İngilizceyi Türkçe düşünerek konuşmaya yönelirsiniz. Yani İngilizce öğrenmek isteyen birinin en çok zorlandığı andır o an.":
      "Türkiye'de genel olarak Türk hocalardan alınan İngilizce konuşma dersleriyle, İngilizce konuşma becerisinin geliştirilemeyeceği kanısı yaygındır. Karşınızda İngilizceyi iyi derecede konuşan bir Türk bile olsa, maalesef İngilizceyi Türkçe düşünerek konuşmaya yönelirsiniz. Yani İngilizce öğrenmek isteyen birinin en çok zorlandığı andır o an.",
    "Bu nedenden dolayı Dünya Dilleri Merkezi İngilizce konuşma derslerini, Yabancı öğretim üyelerinin kişiye özel olarak hazırladığı bir program ile yürütmektedir.":
      "Bu nedenden dolayı Dünya Dilleri Merkezi İngilizce konuşma derslerini, yabancı öğretim üyelerinin kişiye özel olarak hazırladığı bir program ile yürütmektedir.",
  },
  ignored: [],
};

export const LANGUAGE_PRIVATE_LESSONS: PrivateLessonDef[] = [
  INGILIZCE,
  ALMANCA,
  FRANSIZCA,
  ISPANYOLCA,
  ITALYANCA,
  RUSCA,
  CINCE,
  TURKCE,
  INGILIZCE_KONUSMA,
];
