/**
 * P4 — Online eğitim sayfaları (Zengin İçerik alt türü 2, 2026-09-25).
 *
 * Kaynağın 8 sayfası AYNI şablon: h1 + 3 paragraf (5 cümle), yalnız dil adı ve
 * öğretmenlerin uyruğu değişiyor. Çözücü (`lib/onlineContent.ts`) bu iskeleti
 * build'de doğrular ve 5 cümlenin HER birini bir yere koyar:
 *   P1.1 → hero girişi · P3 → adım 1 "Online başvuru" · P1.2 → adım 2 · P1.3 → adım 3 · P2 → adım 4.
 * Yani "Online ders nasıl işler?" akışı tamamen firma cümlelerinden kurulur
 * (kullanıcı: "içeriği biraz açabilirsin ama değiştirme", 2026-09-25).
 *
 * Firma metni burada TAŞINMAZ; yalnız yazım düzeltmeleri (`fixes`, kelime düzeyinde —
 * kaynakta geçmeyen düzeltme build'i düşürür). Genel bilgi (sınavlar, klavye notu,
 * SSS) `exams` / `keyboard` / `faq` alanlarında; resmi kaynağı yanındaki yorumda.
 * "Skype" kaynakta kalıyor (kullanıcı kararı, 2026-09-25).
 */

import type { IconName } from "@/components/graphics/icons";
import type { Photo } from "@/data/privateLessonsShared";

const YD = "/yabanci-dil-egitimleri";
const UPDATED = "2026-09-25";

/**
 * Hero fotoğrafı (kullanıcının eklediği online eğitim görselleri, 2026-09-25).
 * `online_education2/3` İngilizceye özgü (İngiliz bayrağı, "English Lesson")
 * → yalnız İngilizce sayfası ve çatı sayfasında; diğer diller bu genel görseli kullanır.
 */
const ONLINE_PHOTO: Photo = {
  src: "/assets/online_education.jpg",
  alt: "Dizüstü bilgisayarda online dil kursu seçen öğrenci",
  width: 800,
  height: 600,
};

/** "Evden" = sınav sahibinin resmi evden (uzaktan gözetimli) seçeneği var. */
export type ExamMode = "center" | "both";
export type OnlineExam = { name: string; owner: string; mode: ExamMode; text: string };

export type OnlineLessonDef = {
  /** Eski sitedeki yol, birebir (CLAUDE.md §3). */
  path: string;
  label: string;
  /** `data/languages.ts` slug'ı — bayrak, selamlama ve şube sınıf mevcudu oradan. */
  languageSlug: string;
  /** Tamlama eki: "İngilizce" → "İngilizceyi" gibi ek gerekmesin diye yalnız yalın ad kullanılır. */
  language: string;
  meta: { title?: string; description?: string; reasons: string[] };
  photo: Photo;
  /** Kelime düzeyinde yazım düzeltmesi [yanlış, doğru] — her biri kaynakta en az bir kez geçmeli. */
  fixes: [string, string][];
  /** Şubedeki grup sınıfının firma cümlesinden kısa hâli (karşılaştırma tablosu); kaynağı yorumda. */
  branchGroup: string;
  /** Dile özgü klavye notu (genel bilgi); İngilizcede yok. */
  keyboard: { label: string; text: string } | null;
  exams: { items: OnlineExam[]; note: string };
  faq: { question: string; answer: string[] }[];
  updated: string;
};

/** Üç sayfada yinelenen kaynak yazım hataları. */
const TYPO: [string, string][] = [
  ["Profosyonel", "Profesyonel"],
  // "…öğretim üyeleri tarafından … programları hazırlanmaktayız": edilgen yapı → "-dır" (çatı kaynağıyla aynı kalıp).
  ["programları hazırlanmaktayız", "programları hazırlanmaktadır"],
];
/** Rusça ve Türkçe sayfalarında "öğretmen üyelerimiz" (öğretim üyesi / öğretmen karışması). */
const TYPO_TEACHER: [string, string] = ["öğretmen üyelerimiz", "öğretmenlerimiz"];

/** Şube sınıf mevcudu — `data/languages.ts` `groupSize` (dil sayfalarının kendi metni). */
const GROUP_8 = "8 kişilik sınıflar";

/** Kaynak meta description kalıbı — 3 sayfada başka dilin adıyla kopyalanmıştı. */
const description = (language: string) =>
  `Online ${language} eğitimi; başlangıçtan ileri seviyeye, konuşma pratiği, sınav hazırlık ve özel ders seçenekleriyle esnek programlar.`;

/** Kaynak title'larda "Kursu| Dünya" boşluk hatası. */
const title = (language: string) => `Online ${language} Eğitimi Dil Kursu | Dünya Dilleri Merkezi`;
const TITLE_SPACE = "title: kaynakta 'Kursu| Dünya' — boşluk düzeltildi";

/* ---------------------------------------------------------------
 * Ortak SSS — firma olgularının aynı anlamda yeniden cümlelenmesi (1, 2, 5) +
 * genel bilgi (3). Dile özgü sınav sorusu (4) sayfa tanımında.
 * ------------------------------------------------------------- */
/** CEFR ölçeği cümlesi — Çince HSK ile anılır (bkz. özel ders sayfası). */
const CEFR_SCALE = "Seviyeler Avrupa Ortak Dil Çerçevesi'ne (CEFR) göre A1'den C2'ye altı basamakta tanımlanır.";

function commonFaq(
  language: string,
  examQuestion: { question: string; answer: string[] },
  scale: string = CEFR_SCALE,
) {
  return [
    {
      question: `Online ${language} dersleri nasıl yapılıyor?`,
      answer: [
        `Dersler Skype, Zoom, Livestorm gibi platformlarda yapılır: öğretmenleriniz birebir derslerle ya da en fazla 8 kişilik online gruplarla çalışır, siz derse evinizden veya ofisinizden katılırsınız.`,
      ],
    },
    {
      // Kaynak meta description'ının ("başlangıçtan ileri seviyeye, konuşma pratiği, sınav hazırlık
      // ve özel ders seçenekleriyle esnek programlar") cümleleştirilmesi + genel ölçek bilgisi.
      question: `Online ${language} eğitimi hangi seviyeler için?`,
      answer: [
        `Başlangıçtan ileri seviyeye kadar her seviye için; konuşma pratiği, sınav hazırlık ve özel ders seçenekleriyle esnek programlar hâlinde. ${scale}`,
      ],
    },
    {
      question: "Ders gün ve saatlerini kim belirliyor?",
      answer: [
        `Program size özel gün ve saatlere göre hazırlanır ve haftalık olarak yeniden düzenlenebilir. Birebir çalışmak istemezseniz talebiniz üzerine en fazla 8 kişilik özel bir gruba katılabilirsiniz.`,
      ],
    },
    {
      question: "Online derse katılmak için neye ihtiyacım var?",
      answer: [
        `Kesintisiz bir internet bağlantısı, kamerası olan bir bilgisayar ya da tablet ve mikrofonlu bir kulaklık yeterlidir. Dersten önce platformun uygulamasını kurup sesinizi ve görüntünüzü denemeniz, ilk dakikaların teknik ayarlarla geçmesini önler.`,
      ],
    },
    examQuestion,
    {
      question: `${language} sınavlarına da online hazırlanabilir miyim?`,
      answer: [
        `Evet. Online başvurunuzu yaparak hem genel ${language} eğitimlerine hem de ${language} dil sınavlarına hazırlık programlarına evinizden veya ofisinizden katılabilirsiniz.`,
      ],
    },
  ];
}

/* ---------------------------------------------------------------
 * İNGİLİZCE — sınav olguları: ETS (TOEFL iBT Home Edition), IELTS resmi
 * (IELTS Online), Pearson (PTE), Cambridge English, ÖSYM (e-YDS) — araştırma
 * 2026-09-25, kaynak URL'leri öğe yorumlarında.
 * ------------------------------------------------------------- */
const EN: OnlineLessonDef = {
  path: `${YD}/ingilizce-kursu/online-ingilizce-egitimi`,
  label: "Online İngilizce Eğitimi",
  languageSlug: "ingilizce-kursu",
  language: "İngilizce",
  meta: {
    title: "Online İngilizce Eğitimi Dil Kursu | Dünya Dilleri Merkezi",
    reasons: ["title: kaynak 'Online İngilizce Dil Eğitimi' — marka eki ve h1 ile aynı ad (diğer 7 sayfayla tutarlı)"],
  },
  photo: {
    src: "/assets/online_education2.jpg",
    alt: "Dizüstü bilgisayarda öğretmeniyle canlı İngilizce dersi yapan öğrenci",
    width: 1200,
    height: 800,
  },
  fixes: TYPO,
  branchGroup: GROUP_8,
  keyboard: null,
  exams: {
    items: [
      // ets.org/toefl/test-takers/ibt/about/testing-options.html (+ …/at-home.html)
      {
        name: "TOEFL iBT",
        owner: "ETS",
        mode: "both",
        text: "Test merkezinde bilgisayarla ya da canlı gözetmen eşliğinde evden (TOEFL iBT Home Edition) girilebilir.",
      },
      // ielts.org/take-a-test/why-choose-ielts/ways-to-take-ielts
      {
        name: "IELTS",
        owner: "British Council · IDP · Cambridge",
        mode: "both",
        text: "Academic modülü evden “IELTS Online” olarak alınabilir. General Training ve İngiltere vizesi (UKVI) sınavları için merkeze gidilir.",
      },
      // pearsonpte.com/pte-academic — "PTE Academic cannot be taken at home"
      {
        name: "PTE Academic",
        owner: "Pearson",
        mode: "center",
        text: "Yalnız yetkili test merkezinde, bilgisayarla yapılır; evden girilemez.",
      },
      // cambridgeenglish.org/exams-and-tests/qualifications/first/ · support.cambridgeenglish.org
      {
        name: "Cambridge B2 First · C1 Advanced · C2 Proficiency",
        owner: "Cambridge English",
        mode: "center",
        text: "Yetkili sınav merkezinde, kâğıt ya da bilgisayar üzerinden yapılır.",
      },
      // ÖSYM 2026 e-YDS Kılavuzu md. 1.5 · 2025 YDS/2 Kılavuzu
      {
        name: "YDS · e-YDS",
        owner: "ÖSYM",
        mode: "center",
        text: "YDS kâğıt kitapçıkla, e-YDS ÖSYM'nin elektronik sınav merkezlerinde bilgisayarla yapılır.",
      },
    ],
    note: "Kaynak: ETS, IELTS, Pearson, Cambridge English ve ÖSYM resmi sayfaları. Evden alınan sonucun geçerliliği başvurduğunuz kuruma göre değişir; sınava kaydolmadan önce kurumunuza danışın.",
  },
  faq: commonFaq("İngilizce", {
    question: "İngilizce sınavlarına evden girebilir miyim?",
    answer: [
      "TOEFL iBT (Home Edition) ve IELTS'in Academic modülü (IELTS Online) için canlı gözetmenli evden sınav seçeneği var. PTE Academic, Cambridge sınavları ve ÖSYM'nin YDS / e-YDS sınavları ise yalnız sınav merkezinde yapılır.",
    ],
  }),
  updated: UPDATED,
};

/* ---------------------------------------------------------------
 * ALMANCA — goethe.de/ins/tr/tr/spr/prf/ddp.html · testdaf.de/de/teilnehmende/
 * der-digitale-testdaf-ueberblick/ · telc.net/en/language-examinations/telc-remote-tests/
 * (uzaktan testler yalnız B2 GLOBAL / SCHOOL, Almanca yok) · osd.at/digitale-deutschpruefungen-oesd/
 * ------------------------------------------------------------- */
const DE: OnlineLessonDef = {
  path: `${YD}/almanca-kursu/online-almanca-egitimi`,
  label: "Online Almanca Eğitimi",
  languageSlug: "almanca-kursu",
  language: "Almanca",
  meta: { title: title("Almanca"), reasons: [TITLE_SPACE] },
  photo: ONLINE_PHOTO,
  fixes: TYPO,
  branchGroup: GROUP_8,
  keyboard: { label: "Almanca klavye", text: "ö ve ü Türkçe klavyede zaten var; ä ve ß için bilgisayarınıza Almanca klavye düzeni ekleyebilirsiniz." },
  exams: {
    items: [
      {
        name: "Goethe-Zertifikat",
        owner: "Goethe-Institut",
        mode: "center",
        text: "Sınav merkezinde, kâğıt üzerinde ya da bazı seviyelerde enstitünün bilgisayarında yapılır; online sınav yoktur.",
      },
      {
        name: "TestDaF",
        owner: "TestDaF-Institut",
        mode: "center",
        text: "Test merkezinde bilgisayarla (dijital TestDaF) ya da kâğıt üzerinde yapılır.",
      },
      {
        name: "telc Deutsch",
        owner: "telc",
        mode: "center",
        text: "Sınav merkezinde yapılır. telc'in uzaktan sınavları Almanca sınavlarını kapsamaz.",
      },
      { name: "ÖSD", owner: "Österreichisches Sprachdiplom", mode: "center", text: "Yalnız sınav merkezinde, kâğıt ya da bilgisayar üzerinden yapılır." },
    ],
    note: "Kaynak: Goethe-Institut, TestDaF-Institut, telc ve ÖSD resmi sayfaları.",
  },
  faq: commonFaq("Almanca", {
    question: "Almanca sınavlarına evden girebilir miyim?",
    answer: [
      "Hayır. Goethe-Zertifikat, TestDaF, telc ve ÖSD sınavları yalnız sınav merkezinde yapılır. Hazırlığınızı online sürdürüp sınava merkezde girersiniz.",
    ],
  }),
  updated: UPDATED,
};

/* ---------------------------------------------------------------
 * FRANSIZCA — france-education-international.fr (DELF-DALF pratik bilgiler,
 * "tcf-ordinateur": "pas un test en ligne") · lefrancaisdesaffaires.fr (TEF / TEF Canada)
 * ------------------------------------------------------------- */
const FR: OnlineLessonDef = {
  path: `${YD}/fransizca-kursu/online-fransizca-egitimi`,
  label: "Online Fransızca Eğitimi",
  languageSlug: "fransizca-kursu",
  language: "Fransızca",
  meta: { title: title("Fransızca"), reasons: [TITLE_SPACE] },
  photo: ONLINE_PHOTO,
  fixes: TYPO,
  branchGroup: GROUP_8,
  keyboard: { label: "Fransızca klavye", text: "ç Türkçe klavyede var; é, è, à, ê gibi aksanlı harfler için Fransızca klavye düzeni ekleyebilirsiniz." },
  exams: {
    items: [
      { name: "DELF · DALF", owner: "France Éducation international", mode: "center", text: "Onaylı sınav merkezinde yapılır." },
      {
        name: "TCF",
        owner: "France Éducation international",
        mode: "center",
        text: "Sınav merkezinin bilgisayarında yapılır; online bir test değildir. Sözlü bölüm yüz yüzedir.",
      },
      {
        name: "TEF · TEF Canada",
        owner: "CCI Paris Île-de-France",
        mode: "center",
        text: "Merkezde, gözetmen eşliğinde bilgisayarla yapılır; sözlü bölüm yüz yüzedir.",
      },
    ],
    note: "Kaynak: France Éducation international ve CCI Paris Île-de-France (Le français des affaires) resmi sayfaları.",
  },
  faq: commonFaq("Fransızca", {
    question: "Fransızca sınavlarına evden girebilir miyim?",
    answer: [
      "Hayır. DELF, DALF, TCF ve TEF sınavları sınav merkezinde yapılır; TCF ve TEF'te yazılı bölümler merkezin bilgisayarında, sözlü bölüm yüz yüzedir.",
    ],
  }),
  updated: UPDATED,
};

/* ---------------------------------------------------------------
 * İSPANYOLCA — examenes.cervantes.es/es/siele/preguntas-frecuentes (DELE: "en papel")
 * · siele.org/en/reservas ("SIELE en remoto"; Türkiye'de açık olduğu doğrulanmadı)
 * ------------------------------------------------------------- */
const ES: OnlineLessonDef = {
  path: `${YD}/ispanyolca-kursu/online-ispanyolca-egitimi`,
  label: "Online İspanyolca Eğitimi",
  languageSlug: "ispanyolca-kursu",
  language: "İspanyolca",
  meta: { title: title("İspanyolca"), reasons: ["title: kaynak 'Online İspanyolca Eğitimi' — h1 ve marka eki eklendi (diğer sayfalarla tutarlı)"] },
  photo: ONLINE_PHOTO,
  fixes: TYPO,
  branchGroup: GROUP_8,
  keyboard: { label: "İspanyolca klavye", text: "ñ, á, é, ó, ú ve ters soru-ünlem işaretleri (¿ ¡) için İspanyolca klavye düzeni ekleyebilirsiniz." },
  exams: {
    items: [
      { name: "DELE", owner: "Instituto Cervantes", mode: "center", text: "Sınav merkezinde, kâğıt üzerinde yapılır." },
      {
        name: "SIELE",
        owner: "Instituto Cervantes · UNAM · Salamanca · UBA",
        mode: "both",
        text: "Sınav merkezinde bilgisayarla ya da “SIELE en remoto” seçeneğiyle evden alınabilir; uzaktan seçenek rezervasyon sırasında seçilir.",
      },
    ],
    note: "Kaynak: Instituto Cervantes ve SIELE resmi sayfaları. SIELE'nin evden seçeneğinin Türkiye'den açık olup olmadığı rezervasyon ekranında görünür.",
  },
  faq: commonFaq("İspanyolca", {
    question: "İspanyolca sınavlarına evden girebilir miyim?",
    answer: [
      "SIELE için evden sınav seçeneği var (SIELE en remoto); DELE ise yalnız sınav merkezinde, kâğıt üzerinde yapılır. Evden seçeneğin bulunduğunuz ülkede açık olup olmadığını rezervasyon sırasında kontrol edin.",
    ],
  }),
  updated: UPDATED,
};

/* ---------------------------------------------------------------
 * İTALYANCA — cils.unistrasi.it (Le sedi di esami) · cvcl.unistrapg.it · plida.dante.global/it
 * Resmi sayfalarda evden seçenek YOK ama "yoktur" diye de yazmıyor → yalnız "merkezde".
 * CERT.IT doğrulanamadı, yazılmadı.
 * ------------------------------------------------------------- */
const IT: OnlineLessonDef = {
  path: `${YD}/italyanca-kursu/online-italyanca-egitimi`,
  label: "Online İtalyanca Eğitimi",
  languageSlug: "italyanca-kursu",
  language: "İtalyanca",
  meta: {
    title: title("İtalyanca"),
    description: description("İtalyanca"),
    reasons: [TITLE_SPACE, "description: kaynak 'Online Rusça eğitimi…' — Rusça sayfasından kopyalanmış, dil adı düzeltildi"],
  },
  photo: ONLINE_PHOTO,
  fixes: TYPO,
  branchGroup: GROUP_8,
  keyboard: { label: "İtalyanca klavye", text: "à, è, é, ì, ò, ù gibi vurgulu harfler için İtalyanca klavye düzeni ekleyebilirsiniz." },
  exams: {
    items: [
      { name: "CILS", owner: "Università per Stranieri di Siena", mode: "center", text: "Anlaşmalı sınav merkezlerinde yapılır." },
      { name: "CELI", owner: "Università per Stranieri di Perugia", mode: "center", text: "Anlaşmalı sınav merkezlerinde yapılır." },
      { name: "PLIDA", owner: "Società Dante Alighieri", mode: "center", text: "Yalnız sertifikalı sınav merkezlerinde yapılır." },
    ],
    note: "Kaynak: Siena ve Perugia Yabancılar Üniversiteleri ile Società Dante Alighieri resmi sayfaları; bu sayfalarda evden sınav seçeneği yer almıyor. Güncel durumu kaydolacağınız merkeze sorun.",
  },
  faq: commonFaq("İtalyanca", {
    question: "İtalyanca sınavlarına evden girebilir miyim?",
    answer: [
      "CILS, CELI ve PLIDA sınavları anlaşmalı sınav merkezlerinde yapılır; kurumların resmi sayfalarında evden sınav seçeneği yer almıyor. Hazırlığınızı online yapıp sınava merkezde girersiniz.",
    ],
  }),
  updated: UPDATED,
};

/* ---------------------------------------------------------------
 * RUSÇA — pushkin.institute/certificates/distant/ · testingcenter.spbu.ru/ru/ekzameny/russia/trki.html
 * (uzaktan format bazı yetkili merkezlerde; her merkez sunmuyor)
 * ------------------------------------------------------------- */
const RU: OnlineLessonDef = {
  path: `${YD}/rusca-kursu/online-rusca-egitimi`,
  label: "Online Rusça Eğitimi",
  languageSlug: "rusca-kursu",
  language: "Rusça",
  meta: {
    title: title("Rusça"),
    description: description("Rusça"),
    reasons: [TITLE_SPACE, "description: kaynak 'Online İspanyolca eğitimi…' — İspanyolca sayfasından kopyalanmış, dil adı düzeltildi"],
  },
  photo: ONLINE_PHOTO,
  fixes: [...TYPO, TYPO_TEACHER],
  branchGroup: GROUP_8,
  keyboard: { label: "Kiril klavye", text: "Rusça Kiril alfabesiyle yazılır; derste yazabilmek için bilgisayarınıza Rusça klavye düzeni ekleyin." },
  exams: {
    items: [
      {
        name: "TORFL (ТРКИ)",
        owner: "Rusya'nın yetkili test merkezleri",
        mode: "both",
        text: "Sınav merkezinde yüz yüze yapılır. Puşkin Enstitüsü gibi bazı yetkili merkezler video gözetimli uzaktan format da sunar; her merkez sunmaz.",
      },
    ],
    note: "Kaynak: Puşkin Rus Dili Enstitüsü ve St. Petersburg Devlet Üniversitesi test merkezi resmi sayfaları.",
  },
  faq: commonFaq("Rusça", {
    question: "Rusça sınavına evden girebilir miyim?",
    answer: [
      "TORFL (ТРКИ) sınavını bazı yetkili test merkezleri video gözetimli uzaktan formatta da yapıyor; ancak her merkez bu seçeneği sunmuyor. Kaydolacağınız merkeze sorun.",
    ],
  }),
  updated: UPDATED,
};

/* ---------------------------------------------------------------
 * ÇİNCE — chinesetest.cn/hsk ("Internet-based Test (at home)"; Türkiye'de açık olduğu doğrulanmadı)
 * ------------------------------------------------------------- */
const ZH: OnlineLessonDef = {
  path: `${YD}/cince-kursu/online-cince-egitimi`,
  label: "Online Çince Eğitimi",
  languageSlug: "cince-kursu",
  language: "Çince",
  meta: {
    title: title("Çince"),
    description: description("Çince"),
    reasons: [TITLE_SPACE, "description: kaynak 'Online İtalyanca eğitimi…' — İtalyanca sayfasından kopyalanmış, dil adı düzeltildi"],
  },
  photo: ONLINE_PHOTO,
  fixes: TYPO,
  branchGroup: GROUP_8,
  keyboard: { label: "Pinyin girişi", text: "Çince karakterler Latin harfleriyle pinyin yazılarak girilir; bilgisayarınıza Çince (pinyin) giriş yöntemi ekleyin." },
  exams: {
    items: [
      {
        name: "HSK",
        owner: "Chinese Testing International",
        mode: "both",
        text: "Kâğıt üzerinde, sınav merkezinde bilgisayarla ya da evden internet üzerinden (Internet-based Test at home) yapılır.",
      },
    ],
    note: "Kaynak: chinesetest.cn resmi HSK sayfası. Evden formatın Türkiye'de açık olup olmadığı sınav tarihi ve merkez aramasında görünür.",
  },
  faq: commonFaq(
    "Çince",
    {
      question: "Çince sınavına evden girebilir miyim?",
      answer: [
        "HSK'nın resmi formatları arasında evden internet üzerinden yapılan bir sürüm var; kâğıt ve merkezde bilgisayarlı formatlar da sürüyor. Evden formatın Türkiye'den açık olup olmadığını sınav tarihi ararken kontrol edin.",
      ],
    },
    "Çincede seviyeler çoğunlukla HSK sınavının basamaklarıyla ifade edilir.",
  ),
  updated: UPDATED,
};

/* ---------------------------------------------------------------
 * TÜRKÇE — tys.yee.org.tr (kâğıt tabanlı; sayfa JS ile yükleniyor, arama kaydından)
 * Şube cümlesi: Türkçe kurs sayfası "6 kişilik özel gruplar veya birebir özel ders".
 * ------------------------------------------------------------- */
const TR: OnlineLessonDef = {
  path: `${YD}/yabancila-icin-turkce-kurs/online-turkce-egitimi`,
  label: "Online Türkçe Eğitimi",
  languageSlug: "yabancila-icin-turkce-kurs",
  language: "Türkçe",
  meta: { reasons: [] },
  photo: ONLINE_PHOTO,
  fixes: [...TYPO, TYPO_TEACHER],
  branchGroup: "6 kişilik özel gruplar ya da birebir özel ders",
  keyboard: { label: "Türkçe klavye", text: "ç, ğ, ı, İ, ö, ş, ü harfleri için bilgisayarınıza Türkçe klavye düzeni ekleyebilirsiniz." },
  exams: {
    items: [
      {
        name: "TYS",
        owner: "Yunus Emre Enstitüsü",
        mode: "center",
        text: "Kâğıt tabanlı olarak Yunus Emre Enstitüsü merkezlerinde ve iş birliği yapılan kurumlarda yapılır.",
      },
    ],
    note: "Kaynak: Yunus Emre Enstitüsü Türkçe Yeterlik Sınavı (TYS) resmi sayfası.",
  },
  faq: commonFaq("Türkçe", {
    question: "Türkçe sınavına evden girebilir miyim?",
    answer: [
      // B2/C1 belge düzeyi: özel ders araştırması (tys.yee.org.tr, 2026-09-25).
      "Hayır. Yunus Emre Enstitüsü'nün Türkçe Yeterlik Sınavı (TYS) kâğıt tabanlıdır ve enstitünün merkezlerinde ya da iş birliği yaptığı kurumlarda yapılır. Sınavda başarılı olanlara B2 ya da C1 düzeyinde belge verilir.",
    ],
  }),
  updated: UPDATED,
};

export const ONLINE_LESSONS: OnlineLessonDef[] = [EN, DE, FR, ES, IT, RU, ZH, TR];

/** Derse hazırlık listesi — genel bilgi, tüm dillerde ortak (dile özgü klavye notu ayrıca eklenir). */
export const ONLINE_CHECKLIST: { icon: IconName; label: string; text: string }[] = [
  { icon: "wifi", label: "Kesintisiz internet", text: "Görüntülü derste ses ve görüntü donmasın diye kararlı bir bağlantı; mümkünse modeme yakın oturun." },
  { icon: "dinleme", label: "Mikrofonlu kulaklık", text: "Telaffuzunuzu öğretmeniniz net duyar, siz de onu; hoparlörün yaptığı yankı olmaz." },
  { icon: "kamera", label: "Açık kamera", text: "Konuşma pratiğinde yüz ifadesi ve ağız hareketleri de iletişimin parçasıdır." },
  { icon: "ekran", label: "Uygulama hazır", text: "Ders platformunu önceden kurun; sesinizi ve görüntünüzü birkaç dakika önce deneyin." },
  { icon: "belge", label: "Not defteri", text: "Yeni kelime ve kalıpları dersin içinde yazın; tekrar ederken en işe yarayan kaynak budur." },
];


/* ---------------------------------------------------------------
 * ÇATI SAYFASI — /diger-program/online-dil-egitimi (kaynak: h1 + 3 paragraf +
 * 2 h2, her biri tek cümle). Footer'da her sayfadan link alan ölü hedefti.
 * Dil kartları 8 online sayfaya gider; sayfası olmayan diller düz metin.
 * Sınav etiketleri üretilmiş sınav sayfasına gider, olmayan düz kalır.
 * ------------------------------------------------------------- */
export type OnlineHubDef = {
  path: string;
  label: string;
  meta: { title?: string; description?: string; reasons: string[] };
  photo: Photo;
  fixes: [string, string][];
  /** Kaynak cümlesindeki, online sayfası olmayan diller (sırası kaynaktaki gibi). */
  extraLanguages: string[];
  /** Kaynak cümlesindeki sınavlar; `slug` → sınav hazırlık sayfası (üretilmişse link). */
  exams: { label: string; slug: string | null }[];
  faq: { question: string; answer: string[] }[];
  updated: string;
};

export const ONLINE_HUB: OnlineHubDef = {
  path: "/diger-program/online-dil-egitimi",
  label: "Online Dil Eğitimi",
  meta: {
    title: "Online Dil Eğitimi ve Sınav Hazırlık | Dünya Dilleri Merkezi",
    reasons: ["title: kaynak 'Online Dil Eğitimi' (18 karakter) — h1 ve marka eki eklendi"],
  },
  photo: {
    src: "/assets/online_education3.jpg",
    alt: "Kulaklıklı öğretmen dizüstü bilgisayardan online dil dersi veriyor",
    width: 735,
    height: 490,
  },
  fixes: [["Profosyonel", "Profesyonel"]],
  extraLanguages: ["Japonca", "Korece", "Yunanca", "Bulgarca", "Hollandaca"],
  exams: [
    { label: "TOEFL", slug: "toefl-kursu" },
    { label: "IELTS", slug: "ielts-kursu" },
    { label: "PTE", slug: "academic-pte" },
    { label: "YDS", slug: "yds-kursu" },
    { label: "YÖKDİL", slug: "yokdil-sinavi-kursu" },
    { label: "TOEIC", slug: "toeic-kursu" },
    { label: "SAT", slug: "sat-kursu" },
    { label: "GMAT", slug: "gmat-kursu" },
    { label: "GRE", slug: "gre-kursu" },
    { label: "Proficiency hazırlık", slug: "proficiency-kursu" },
    { label: "ELAE", slug: null },
    { label: "TRACE", slug: null },
    { label: "TestDaF", slug: "testdaf-kursu" },
    { label: "DELE", slug: null },
    { label: "DELF", slug: null },
    { label: "CELI", slug: null },
    { label: "CILS", slug: null },
    { label: "Almanca Aile Birleşimi A1", slug: "aile-birlesimi-egitimi" },
    { label: "IELTS Life Skills", slug: null },
  ],
  faq: [
    {
      question: "Hangi dillerde online eğitim veriyorsunuz?",
      answer: [
        "İngilizce, Almanca, Fransızca, İspanyolca, İtalyanca, Rusça, Çince, Japonca, Korece, Yunanca, Bulgarca, Hollandaca ve yabancılar için Türkçe derslerini online olarak veriyoruz.",
      ],
    },
    {
      question: "Hangi sınavlara online hazırlanabilirim?",
      answer: [
        "TOEFL, IELTS, PTE, YDS, YÖKDİL, TOEIC, SAT, GMAT, GRE, Proficiency, TestDaF, DELE, DELF, CELI ve CILS gibi sınavların yanı sıra Almanca Aile Birleşimi A1 ve IELTS Life Skills programlarına online hazırlanabilirsiniz.",
      ],
    },
    {
      question: "Online dersler nasıl yapılıyor?",
      answer: [
        "Dersler Skype, Zoom, Livestorm gibi platformlarda yapılır: öğretmenleriniz birebir derslerle ya da en fazla 8 kişilik online gruplarla çalışır; program size özel gün ve saatlere göre kurulur ve haftalık olarak yeniden düzenlenebilir.",
      ],
    },
    {
      question: "Online derse katılmak için neye ihtiyacım var?",
      answer: [
        "Kesintisiz bir internet bağlantısı, kamerası olan bir bilgisayar ya da tablet ve mikrofonlu bir kulaklık yeterlidir. Dersten önce platformun uygulamasını kurup sesinizi ve görüntünüzü denemeniz, ilk dakikaların teknik ayarlarla geçmesini önler.",
      ],
    },
    {
      // Olgular dil sayfalarındaki `exams` alanlarıyla aynı kaynaklardan.
      question: "Dil sınavlarına evden girilebilir mi?",
      answer: [
        "Bazılarına evet: TOEFL iBT (Home Edition), IELTS Academic (IELTS Online), İspanyolcada SIELE ve Çincede HSK için resmi evden sınav seçeneği var; Rusçada TORFL'u bazı merkezler uzaktan yapıyor. PTE, Cambridge, ÖSYM sınavları, Goethe, TestDaF, DELF/DALF, TCF, TEF, DELE ve TYS ise sınav merkezinde yapılır.",
      ],
    },
  ],
  updated: UPDATED,
};
