/**
 * P3 — Kategori hub sayfaları eşleme tablosu.
 *
 * `data/exams.ts` deseni (P2): gövde metni burada TAŞINMAZ, yalnız başlık
 * referansları. İstisna (kullanıcı kararı, P2'de onaylanan sapma P3'e de
 * uygulanır — 2026-09-23): kaynak başlıkları silinmez; gövde konudan
 * sapmadan SEO için geliştirilebilir. Her değişiklik İZLENEBİLİR durur:
 *   - `edits`         orijinal satır → yeni satır (kaynakta karşılığı yoksa build düşer)
 *   - `headingEdits`  orijinal başlık → basılan başlık (başlık kaybolmaz, metni değişir)
 *   - `meta`          title/description/H1 düzeltmesi + gerekçe
 *   - `ignored`       basılmayan satır + gerekçe
 * Kaynakta hiç olmayan içerik (amaç grupları, karşılaştırma tablosu, SSS)
 * aşağıda `EXAM_HUB_ADDED` altında AYRI durur — hangi cümlenin eklendiği
 * tek bakışta görülsün diye.
 *
 * Sayısal olgular (geçerlilik süreleri) resmi kaynaktan doğrulandı; kaynak
 * her girdinin yanındaki yorumda. Şube adları yalnız `data/branches.ts`ten.
 */

import { BRANCH_LIST } from "@/data/branches";
import { isHiddenExam } from "@/data/hiddenPages";
import { LANGUAGE_SECTION } from "@/data/home";
import { EXTRA_LANGUAGES, OTHER_LANGUAGE_NAMES as OTHER_LANGUAGES } from "@/data/languages";
import { getLanguagePage } from "@/lib/languageContent";
import { courseFacts } from "@/lib/languageFaq";
import { UNIVERSITY_INDEX } from "@/data/universities";
import { joinTr } from "@/lib/listText";
import type { SectionRef } from "@/lib/types";

type Take = SectionRef["take"];

/** Kaynak kaydındaki bir başlığın (null → giriş bloğu) paragraf dilimi. */
export type HubSlotRef = { heading: string | null; take?: Take };

/**
 * Eski sitenin 6 hub'ında birebir tekrar eden "→ Deneyimli eğitmenler…"
 * şablon bloğu. Kaynakta her açıklama satırı KENDİ başlığından ÖNCE geliyor
 * (bir önceki başlığın gövdesine düşüyor) — bu yüzden başlık ve gövde ayrı
 * referanslarla eşlenir.
 */
export type HubFeatureRef = { heading: string; body: HubSlotRef };

export type HubDef = {
  /** Eski sitedeki yol, birebir (CLAUDE.md §3) — kayıt bundan bulunur. */
  path: string;
  /** Kırıntı etiketi. */
  label: string;
  meta: {
    /** Kaynak title bozuksa/uzunsa düzeltilmiş hali (≤60). Yoksa kaynak. */
    title?: string;
    /** Kaynak description bozuksa düzeltilmiş hali (≤155). Yoksa kaynak. */
    description?: string;
    /** Kaynakta h1 yoksa / yanlışsa. */
    h1?: string;
    /** Her düzeltmenin gerekçesi — kullanıcıya bildirildi. */
    reasons: string[];
  };
  /** Sayfanın kullandığı adlandırılmış kaynak dilimleri. */
  slots: Record<string, HubSlotRef>;
  features?: HubFeatureRef[];
  edits?: Record<string, string>;
  headingEdits?: Record<string, string>;
  /** Kaynaktaki link etiketi → hedef yol. Etiket birebir basılır. */
  sourceLinks?: { heading: string; links: Record<string, string> };
  ignored: { line: string; reason: string }[];
};

/** "Kadıköy, Bağdat Caddesi, Etiler, Ataşehir ve Ümraniye" */
const BRANCH_NAMES = joinTr(BRANCH_LIST.map((b) => b.name));

/** `firstBody`: ilk açıklama satırı ("Alanında uzman…") şablon bloğundan
 *  önceki son başlığın gövdesine düşüyor; konumu hub'a göre değişir. */
const FEATURES_STANDARD = (firstBody: HubSlotRef): HubFeatureRef[] => [
  { heading: "→ Deneyimli eğitmenler", body: firstBody },
  { heading: "→ Program çeşitliliği", body: { heading: "→ Deneyimli eğitmenler" } },
  { heading: "→ Başarı garantisi", body: { heading: "→ Program çeşitliliği" } },
  { heading: "→ Esnek öğrenme", body: { heading: "→ Başarı garantisi" } },
];

/* ---------------------------------------------------------------
 * /sinav-hazirlik-egitimleri (PİLOT)
 * ------------------------------------------------------------- */

export const EXAM_HUB: HubDef = {
  path: "/sinav-hazirlik-egitimleri",
  label: "Sınav Hazırlık Kursları",
  meta: {
    // Kaynakta iki boşluk vardı: "Kursları  | Dünya…".
    title: "Sınav Hazırlık Kursları | Dünya Dilleri Merkezi",
    // Kaynak bozuk: şube listesi iki kez + ortadan kesik kelime ("hazırlBağdat").
    description:
      "TOEFL, IELTS, YDS, Proficiency, GRE, GMAT ve 10 sınav daha: amacınıza uygun sınavı seçin, İstanbul'daki 5 şubemizde ya da online hazırlanın.",
    // Kaynakta h1 yok (en üst başlık h3) — aynı metin H1'e yükseltildi.
    h1: "Sınav Hazırlık Kursları",
    reasons: [
      "title: çift boşluk temizlendi",
      "description: tekrarlanan şube listesi ve kesik kelime ('hazırlBağdat') düzeltildi",
      "h1: kaynakta h1 yok; ilk başlık (h3) H1 yapıldı",
    ],
  },
  slots: {
    lead: { heading: "Sınav Hazırlık Kursları", take: [0] },
    programs: { heading: "Yabancı Dil Sınav Hazırlık Programları", take: [0, 1, 2, 3] },
    contact: { heading: "Yabancı Dil Sınav Hazırlık Programları", take: [4] },
  },
  features: FEATURES_STANDARD({ heading: "Yabancı Dil Sınav Hazırlık Programları", take: [5] }),
  sourceLinks: {
    heading: "Sınav Hazırlık Kursları",
    links: {
      "TOEFL Kursu": "/sinav-hazirlik-egitimleri/toefl-kursu",
      "IELTS Kursu": "/sinav-hazirlik-egitimleri/ielts-kursu",
      "Proficiency Kursu": "/sinav-hazirlik-egitimleri/proficiency-kursu",
      "TESTDAF Kursu": "/sinav-hazirlik-egitimleri/testdaf-kursu",
      "YDS Kursu": "/sinav-hazirlik-egitimleri/yds-kursu",
      "GRE Kursu": "/sinav-hazirlik-egitimleri/gre-kursu",
      "SAT Kursu": "/sinav-hazirlik-egitimleri/sat-kursu",
      "GMAT Kursu": "/sinav-hazirlik-egitimleri/gmat-kursu",
    },
  },
  edits: {
    // Tüketici hukuku riski (kullanıcı kararı: yumuşat) — "başarıyı garanti ediyoruz" çıktı.
    // 2026-10-02: TOEIC yayından kalktı (`data/hiddenPages.ts`) — listeden çıktı.
    "Dünya Dilleri Merkezi olarak uluslararası ve yerel yabancı dil sınavlarına yönelik, akademik başarısı tescilli, konusunda uzmanlaşmış öğretmen kadromuz ile TOEFL, IELTS, TOEIC, GRE, GMAT, SAT, YDS, DELE, DELF, TESTDAF, CELI, CILS ve Aile Birleşimi sınavlarına yönelik eğitimlerimizle sizlere başarıyı garanti ediyoruz.":
      "Dünya Dilleri Merkezi olarak uluslararası ve yerel yabancı dil sınavlarına yönelik, akademik başarısı tescilli, konusunda uzmanlaşmış öğretmen kadromuzla TOEFL, IELTS, GRE, GMAT, SAT, YDS, DELE, DELF, TESTDAF, CELI, CILS ve Aile Birleşimi sınavlarına yönelik eğitimler veriyoruz. Her programı sınavın bölümlerine, soru tiplerine ve hedeflediğiniz puana göre planlıyoruz.",
    // İstanbul Şehir Üniversitesi 2020'de kapatıldı — listeden çıkarıldı.
    "Özyeğin Üniversitesi TRACE Sınavı, KOÇ Üniversitesi KUEPE Sınavı, Sabancı Üniversitesi ELAE Sınavı, Boğaziçi Üniversitesi BUEPT Sınavı, Bilgi Üniversitesi BILET Sınavı, İstanbul Şehir Üniversitesi STEP ve DBS Sınavı, Doğuş Üniversitesi DÜYES Sınavı, Yeditepe Üniversitesi Proficiency Sınavı kurslarımıza başvuru yapabilirsiniz.":
      "Özyeğin Üniversitesi TRACE Sınavı, Koç Üniversitesi KUEPE Sınavı, Sabancı Üniversitesi ELAE Sınavı, Boğaziçi Üniversitesi BUEPT Sınavı, Bilgi Üniversitesi BILET Sınavı, Doğuş Üniversitesi DÜYES Sınavı ve Yeditepe Üniversitesi Proficiency Sınavı kurslarımıza başvuru yapabilirsiniz.",
    // Bayat şube listesi ("Beşiktaş", Ümraniye eksik) — data/branches.ts'ten.
    "İstanbul’ da Kadıköy, Bağdat Caddesi, Beşiktaş ve Ataşehir şubelerimizi arayabilir yabancı dil sınavlarına yönelik bilgi talebinde bulunabilirsiniz. DDM katılmış olacağınız yabancı dil yeterlilik sınavlarında sizlere başarılar diler.":
      `İstanbul’da ${BRANCH_NAMES} şubelerimizi arayarak yabancı dil sınavlarına yönelik bilgi talebinde bulunabilirsiniz. DDM, katılacağınız yabancı dil yeterlik sınavlarında başarılar diler.`,
    // "Başarı garantisi" ile aynı gerekçe: kanıtlanamayan başarı oranı iddiası.
    "Sınav hazırlıkta kanıtlanmış başarı oranları": "Sınav formatına ve hedef puanınıza göre planlanan hazırlık",
  },
  headingEdits: {
    "→ Başarı garantisi": "Başarıya odaklı hazırlık",
  },
  ignored: [],
};

/* ---------------------------------------------------------------
 * /sinav-hazirlik-egitimleri — KAYNAKTA OLMAYAN, EKLENEN içerik
 * ------------------------------------------------------------- */

export type ExamGoalKey = "yurtdisi" | "hazirlik" | "lisansustu" | "kamu" | "is" | "vize" | "cocuk";

export type ExamCatalogEntry = {
  /** `data/exams.ts` slug'ı — ad/kod oradan gelir. */
  slug: string;
  /** Birincil amaç grubu önce; diğerleri karşılaştırma tablosunda. */
  goals: ExamGoalKey[];
  /** "Ne için kullanılır" — sınav sayfasının kaynak metninden özetlendi. */
  use: string;
  measures: string;
  /** Resmi geçerlilik — kaynak yorumda. */
  validity: string;
  /** Kaynak sayfası online seçenek söylüyor mu? (uydurma yok) */
  online: boolean;
  logo: string | null;
};

export const EXAM_HUB_ADDED = {
  ctaSub: "Size en yakın şubemizi seçin; eğitim danışmanlarımız seviyenize ve hedefinize uygun sınavı birlikte belirlesin.",
  definition:
    "Sınav hazırlık kursu; TOEFL, IELTS, YDS gibi dil yeterlik sınavlarında hedef puana ulaşmanız için sınavın formatına, soru tiplerine ve zaman yönetimine odaklanan programdır.",
  guideTitle: "Amacınıza göre sınav seçin",
  guideLead:
    "Hangi sınava gireceğinizi, belgeyi nerede kullanacağınız belirler. Aşağıda sınav hazırlık programlarımızı kullanım amacına göre grupladık.",
  groups: [
    {
      key: "yurtdisi",
      label: "Yurtdışında eğitim",
      intro:
        "Yurtdışında lisans ya da dil okulu başvurusu için çoğu kurum TOEFL, IELTS veya PTE puanı ister; ABD'deki lisans programları buna ek olarak SAT sonucuna bakar. Almanya'da eğitim için TestDaF belgesi tüm üniversitelerde geçerlidir. İspanya, Fransa ve İtalya'da okumak için ülkenin dilinde resmî bir diploma istenir: DELE, DELF / DALF ya da CILS / CELI. Avusturya için ÖSD belgesi kullanılır.",
    },
    {
      key: "hazirlik",
      label: "Hazırlık atlama",
      intro:
        "Türkiye'deki pek çok üniversite, İngilizce hazırlık sınıfını atlamak için kendi yeterlik (proficiency) sınavını yapar. Sınavların biçimi üniversiteden üniversiteye değiştiği için hazırlık programı hedef üniversitenin sınavına göre kurulur.",
    },
    {
      key: "lisansustu",
      label: "Lisansüstü ve MBA",
      intro:
        "Yurtdışında yüksek lisans ve doktora başvurularında dil puanının yanında GRE, işletme programlarında ise GMAT sonucu istenir. Türkiye'deki lisansüstü programlar çoğunlukla YDS veya YÖKDİL puanına bakar.",
    },
    {
      key: "kamu",
      label: "Kamu ve akademik kariyer",
      intro:
        "Kamu kurumlarında, akademik atama ve yükseltmelerde ÖSYM'nin YDS, YÖKDİL ve e-TEP sınavları kullanılır.",
    },
    {
      key: "is",
      label: "Meslek ve iş hayatı",
      intro: "Bazı meslekleri yurtdışında yapmak için mesleğe özgü bir dil belgesi istenir; sağlık çalışanları için bu sınav OET'dir.",
    },
    {
      key: "vize",
      label: "Vize ve aile birleşimi",
      intro:
        "Almanya'ya aile birleşimi vizesiyle gitmek için başlangıç (A1) düzeyinde Almanca bildiğinizi resmî bir sınavla belgelemeniz gerekir.",
    },
    {
      key: "cocuk",
      label: "Çocuklar",
      intro: "İlkokul çağındaki çocuklar için tasarlanmış uluslararası testler, çocuğun İngilizce seviyesini yaşına uygun bir formatta ölçer.",
    },
  ] as { key: ExamGoalKey; label: string; intro: string }[],
  /**
   * Geçerlilik kaynakları (2026-09-23 kontrol edildi):
   *   TOEFL iBT 2 yıl · TOEIC 2 yıl · TestDaF süresiz — sınav sayfalarının kendi kaynak metni
   *   IELTS 2 yıl — ielts.org "Verifying IELTS results" (önerilen azami süre)
   *   PTE 2 yıl — pearsonpte.com Help Center / Scoring
   *   GRE 5 yıl — ets.org "Getting Your GRE General Test Scores"
   *   GMAT 5 yıl — mba.com "How Long Are My Scores Valid?"
   *   YDS / YÖKDİL 5 yıl — ÖSYM kuralı; kurumlar farklı süre belirleyebilir (dipnotta)
   *   Kaynağı olmayanlar "—" (uydurma yok).
   */
  catalog: [
    { slug: "toefl-kursu", goals: ["yurtdisi", "lisansustu"], use: "Yurtdışındaki ve Türkiye'deki üniversite başvuruları ile vize işlemleri; 160'tan fazla ülkede kabul edilir.", measures: "Akademik İngilizce, dört beceri", validity: "2 yıl", online: true, logo: "/assets/home_page_images/toefl-logo.png" },
    { slug: "ielts-kursu", goals: ["yurtdisi", "vize"], use: "İngilizce konuşulan ülkelerde eğitim, çalışma ve göç başvuruları; Akademik ve Genel modül.", measures: "Akademik / genel İngilizce, dört beceri", validity: "2 yıl", online: false, logo: "/assets/home_page_images/IELTS_logo.png" },
    { slug: "academic-pte", goals: ["yurtdisi", "lisansustu"], use: "Bilgisayar tabanlı akademik İngilizce sınavı; yurtdışı eğitim, yüksek lisans ve doktora başvuruları.", measures: "Akademik İngilizce, bilgisayarda", validity: "2 yıl", online: true, logo: "/assets/home_page_images/pte-logo.png" },
    { slug: "toefl-essentials-kursu", goals: ["yurtdisi", "is"], use: "Yarısı akademik, yarısı günlük hayatta kullanılan İngilizce üzerine kurulu, daha kısa bir TOEFL sınavı.", measures: "Akademik ve günlük İngilizce", validity: "—", online: true, logo: null },
    { slug: "sat-kursu", goals: ["yurtdisi"], use: "ABD başta olmak üzere yurtdışındaki lisans programlarına başvuru.", measures: "Okuma-yazma ve matematik", validity: "Kuruma göre", online: false, logo: "/assets/home_page_images/SAT_logo.png" },
    { slug: "testdaf-kursu", goals: ["yurtdisi"], use: "Almanya'daki tüm üniversitelerde geçerli sayılan Almanca yeterlik belgesi.", measures: "Akademik Almanca, dört beceri", validity: "Süresiz", online: true, logo: null },
    // 2026-10-02: ddmcadde kaynaklı sınavlar — kullanım / geçerlilik sınav sayfalarının resmi kaynaklı metninden (`data/exams.ts` yorumları).
    { slug: "telc-kursu", goals: ["yurtdisi", "is"], use: "Almanca seviyesini A1'den C2'ye belgeler; üniversiteye giriş (C1 Hochschule), iş hayatı ve sağlık meslekleri için ayrı sürümleri vardır.", measures: "Genel ve mesleki Almanca", validity: "Süre yazmaz", online: false, logo: null },
    { slug: "osd-kursu", goals: ["yurtdisi", "vize"], use: "Avusturya'nın devlet onaylı Almanca sınavı; Avusturya'da üniversite başvurusu, oturum öncesi A1 belgesi ve Almanya'da eş birleşiminde kullanılır.", measures: "Genel ve mesleki Almanca", validity: "Süresiz", online: true, logo: null },
    { slug: "delf-dalf-kursu", goals: ["yurtdisi"], use: "Fransa Milli Eğitim Bakanlığı'nın resmî Fransızca diplomaları; DELF B2 ve DALF C1 Fransızca eğitim veren üniversitelere başvuruda kullanılır.", measures: "Dört beceride Fransızca", validity: "Süresiz", online: false, logo: null },
    { slug: "dele-kursu", goals: ["yurtdisi"], use: "Instituto Cervantes'in verdiği resmî İspanyolca diploması; İspanya'da üniversite ve yüksek lisans başvurularında kullanılır.", measures: "Dört beceride İspanyolca", validity: "Süresiz", online: false, logo: null },
    { slug: "cils-celi-kursu", goals: ["yurtdisi"], use: "Siena ve Perugia Yabancılar Üniversitelerinin resmî İtalyanca sertifikaları; İtalya'da üniversiteye kayıtta B2 seviyesi kabul edilir.", measures: "Dört beceride İtalyanca", validity: "Süresiz", online: false, logo: null },
    { slug: "proficiency-kursu", goals: ["hazirlik"], use: "Üniversitelerin İngilizce hazırlık atlama, hazırlık bitirme ve yüksek lisans kabul sınavları.", measures: "Üniversitenin kendi sınavı", validity: "Üniversiteye göre", online: false, logo: null },
    { slug: "gre-kursu", goals: ["lisansustu"], use: "Yüksek lisans, doktora ve MBA başvurularında kabul heyetlerinin kullandığı sınav.", measures: "Sözel, sayısal, analitik yazma", validity: "5 yıl", online: false, logo: null },
    { slug: "gmat-kursu", goals: ["lisansustu"], use: "MBA, finans ve muhasebe yüksek lisansı gibi işletme programlarına kabul.", measures: "Nicel, sözel, veri analizi", validity: "5 yıl", online: false, logo: "/assets/home_page_images/GMAT_logo.png" },
    { slug: "yds-kursu", goals: ["kamu", "lisansustu"], use: "Kamu kurumları, üniversiteler ve özel sektörde geçerli ÖSYM sınavı; araştırma görevlisi atamaları.", measures: "Okuma, kelime, dil bilgisi", validity: "5 yıl*", online: false, logo: null },
    { slug: "yokdil-sinavi-kursu", goals: ["kamu", "lisansustu"], use: "Akademik personel ve lisansüstü öğrencilere yönelik; fen, sağlık ve sosyal alanlarda ayrı sınav.", measures: "Alan odaklı okuma", validity: "5 yıl*", online: true, logo: null },
    { slug: "e-tep-kursu", goals: ["kamu", "lisansustu"], use: "ÖSYM'nin dört beceriyi bilgisayarda ölçen İngilizce sınavı; akademik atama, doçentlik ve lisansüstü başvurularında YDS karşılığıyla kullanılır.", measures: "Dört beceride İngilizce", validity: "2 yıl*", online: false, logo: null },
    { slug: "toeic-kursu", goals: ["is"], use: "İş hayatında İngilizce; firmalar iş başvurularında ve personel seviye tespitinde kullanır.", measures: "İş İngilizcesi", validity: "2 yıl", online: false, logo: "/assets/home_page_images/toeic-logo.png" },
    { slug: "oet-kursu", goals: ["is", "yurtdisi"], use: "Doktor, hemşire, eczacı gibi sağlık çalışanlarının İngiltere, Avustralya, Yeni Zelanda ve İrlanda'da mesleki kayıt başvuruları.", measures: "Sağlık alanında İngilizce", validity: "—", online: false, logo: null },
    { slug: "ingiltere-vize-sinavi-ingilizce-a1kursu", goals: ["vize"], use: "İngiltere aile birleşimi vizesi için istenen A1 düzeyi İngilizce belgesi.", measures: "Konuşma ve dinleme, A1", validity: "—", online: false, logo: null },
    { slug: "aile-birlesimi-egitimi", goals: ["vize"], use: "Almanya'ya aile birleşimi vizesi için istenen A1 düzeyi Almanca belgesi.", measures: "Temel Almanca, A1", validity: "—", online: false, logo: null },
    { slug: "fransizca-aile-birlesimi-kursu", goals: ["vize"], use: "Fransa'ya aile birleşimi başvurusunda Fransızca ve Cumhuriyet değerleri değerlendirmesi.", measures: "Temel Fransızca, A1", validity: "—", online: false, logo: null },
    { slug: "cocuklar-icin-toefl-primary-egitimi", goals: ["cocuk"], use: "İlkokul öğrencileri için tasarlanmış, uluslararası geçerli İngilizce test sistemi.", measures: "Çocuklar için İngilizce", validity: "—", online: true, logo: null },
  ].filter((c) => !isHiddenExam(c.slug)) as ExamCatalogEntry[], // gizli sınavlar `data/hiddenPages.ts`
  /** Kaynak listesindeki üniversiteler (Şehir hariç) → mevcut sayfa slug'ı. */
  universities: ["ozyegin-universitesi", "koc-universitesi", "sabanci-universitesi", "bogazici-universitesi", "bilgi-universitesi", "dogus-universitesi", "yeditepe-universitesi"],
  tableTitle: "Hangi sınava girmelisiniz?",
  tableLead: "Sınavları kullanım amacı, ölçtüğü beceri ve sonuç belgesinin geçerlilik süresine göre karşılaştırın. Bir sınav birden çok amaç için kullanılabilir.",
  tableNote:
    "Geçerlilik süresi sınavı düzenleyen kurumun kuralıdır; başvuracağınız kurum daha kısa ya da uzun bir süre kabul edebilir. * ÖSYM sınavlarında süreyi kullanılan kurum belirler.",
  /** SSS — cevaplar sınav sayfalarının kaynak metninden (6 kişi, ücretsiz materyal, online program). */
  faq: [
    {
      question: "IELTS mi TOEFL mı almalıyım?",
      answer: [
        "İkisi de dört beceriyi ölçen ve dünya genelinde kabul gören sınavlardır. Seçimi başvuracağınız kurumun şartı belirler: önce hedef üniversitenin ya da vize makamının hangi sınavı ve hangi puanı istediğini kontrol edin, programınızı ona göre planlayalım.",
      ],
    },
    {
      question: "Online mı, yüz yüze mi hazırlanabilirim?",
      answer: [
        "Şubelerimizde yüz yüze ve çevrim içi seçeneklerimiz var. Online programlar belirleyeceğiniz gün ve saatlerde, haftalık olarak revize edilebilecek şekilde hazırlanır.",
      ],
    },
    {
      question: "Sınav hazırlık grupları kaç kişilik?",
      answer: [
        "Sınav hazırlık grup dersleri en fazla 6 katılımcıyla yapılır. Grup takvimi size uymuyorsa birebir özel ders programı hazırlanır.",
      ],
    },
    {
      question: "Ders materyalleri ücretli mi?",
      answer: ["Programda kullanılan tüm ders materyalleri DDM tarafından katılımcılara ücretsiz verilir."],
    },
    {
      question: "Sınav sonucum ne kadar süre geçerli?",
      answer: [
        "TOEFL iBT, IELTS ve PTE sonuçları genellikle 2 yıl, GRE ve GMAT 5 yıl, YDS ve YÖKDİL 5 yıl geçerlidir; TestDaF belgesinin süre sınırı yoktur. Başvuracağınız kurum farklı bir süre isteyebilir, bu yüzden son kararı kurumun ilanına göre verin.",
      ],
    },
    {
      question: "Proficiency kursu hangi üniversiteler için?",
      answer: [
        // Sayı `data/universities.ts`'ten (kapanmış iki üniversite kaldırıldı — müşteri kararı 2026-09-30: 21 → 19).
        `Üniversitelerin kendi hazırlık atlama sınavlarına yönelik programlarımız var; Boğaziçi BUEPT, Koç KUEPE, Sabancı ELAE ve Özyeğin TRACE başta olmak üzere ${UNIVERSITY_INDEX.length} üniversitenin sınavı için ayrı sayfa bulunuyor.`,
      ],
    },
  ],
  photo: {
    src: "/assets/foto-5.jpg",
    alt: "Dünya Dilleri Merkezi'nde küçük grup dersi",
    caption: "Dünya Dilleri Merkezi'nde küçük grup dersi",
  },
};

/* ---------------------------------------------------------------
 * Ortak kaynak artıkları (eski sitenin şablon blokları)
 * ------------------------------------------------------------- */

const ICON_ARTIFACT = { line: "fas fa-star", reason: "ikon fontu artığı (yıldız ikonlarının sınıf adı), metin değil" };

/** Şablon özellik bloğundaki "Başarı garantisi" — kullanıcı kararı: yumuşat (tüketici hukuku). */
const FEATURE_HEADING_EDITS = { "→ Başarı garantisi": "Başarıya odaklı hazırlık" };
const FEATURE_BODY_EDITS = {
  "Sınav hazırlıkta kanıtlanmış başarı oranları": "Sınav formatına ve hedef puanınıza göre planlanan hazırlık",
};

/**
 * Dil listesinden "Arapça" çıkarıldı (kullanıcı, 2026-09-30). Aynı cümle Yabancı Dil ve İngilizce Kursları
 * hub'larında birebir tekrar ediyor (Yurtdışı Eğitim'de de vardı; orada dil şeridi 2026-10-01'de kalktı). "19 farklı dil" rakamına dokunulmadı
 * (müşterinin onayladığı rakam) — listede 18 ad kaldı, `docs/bekleyen-sorular.md`.
 */
const LANGUAGE_LIST_EDITS = {
  "Türkiye’de 19 farklı dil eğitimi veren tek dil okuluyuz. Dünya Dilleri Merkezi 2003 yılından bugüne öğrencilerine İngilizce, Almanca, Fransızca, İspanyolca, İtalyanca, Rusça, Çince, Japonca, Flemenkçe, Yunanca, Korece, İsveççe, Portekizce, Hırvatça, Boşnakça, Slovakça, Bulgarca, Arapça ve Farsça dil eğitimleri vermektedir.":
    "Türkiye’de 19 farklı dil eğitimi veren tek dil okuluyuz. Dünya Dilleri Merkezi 2003 yılından bugüne öğrencilerine İngilizce, Almanca, Fransızca, İspanyolca, İtalyanca, Rusça, Çince, Japonca, Flemenkçe, Yunanca, Korece, İsveççe, Portekizce, Hırvatça, Boşnakça, Slovakça, Bulgarca ve Farsça dil eğitimleri vermektedir.",
};

/**
 * Eski sitenin 3 hub'ında (Yabancı Dil, İngilizce Kursları, Yurtdışı Eğitim)
 * birebir tekrar eden dil kartı bloğu: h5 kod ("EN") + h5 başlık + "- …" alt
 * satırları. Yeni sitede bu blok dil kartları / "19 dilde eğitim" şeridiyle
 * temsil edilir: kod ve etiket `data/languages.ts`ten, alt satırlar
 * `data/home.ts` LANGUAGE_SECTION'dan (aynı etiketler) gelir.
 */
const LANGUAGE_CARD_BOILERPLATE: { line: string; reason: string }[] = [
  ...["EN", "DE", "FR", "RU", "ES", "IT", "ZH", "TR", "NL"].map((line) => ({
    line,
    reason: "dil kartı kod rozeti — data/languages.ts'ten basılıyor",
  })),
  ...[
    "İngilizce Kursu",
    "Almanca Kursu",
    "Fransızca Kursu",
    "Rusça Kursu",
    "İspanyolca Kursu",
    "Çince Kursu",
    "Türkçe Kursu",
    "İngilizce Konuşma",
    "Flemenkçe Kursu",
  ].map((line) => ({
    line,
    reason: "dil kartı başlığı — data/languages.ts etiketiyle basılıyor (kaynakta IT kartı yanlışlıkla 'İspanyolca Kursu')",
  })),
  ...LANGUAGE_SECTION.cards.flatMap((c) =>
    c.links.map((l) => ({
      line: `- ${l.label}`,
      reason: "dil kartı alt satırı — data/home.ts LANGUAGE_SECTION'da aynı etiketle link",
    })),
  ),
];

const YD_PATH = "/yabanci-dil-egitimleri";
const H19 = "19 dilde eğitim, 2003’ten bugüne Dünya Dilleri Merkezi farkıyla yabancı dil eğitimleri";

/* ---------------------------------------------------------------
 * /yabanci-dil
 * ------------------------------------------------------------- */

export const LANGUAGE_HUB: HubDef = {
  path: "/yabanci-dil",
  label: "Yabancı Dil Programları",
  meta: {
    title: "Yabancı Dil Programları | Dünya Dilleri Merkezi",
    description:
      "Dünya Dilleri Merkezi yabancı dil kursları: 19 dilde grup, özel ders ve yurtdışı programları; İstanbul'daki 5 şubede online ve yüz yüze eğitim.",
    reasons: [
      "title: marka eki eklendi (diğer sayfalarla tutarlı)",
      "description: '4 şubede' → '5 şubede' (data/branches.ts); 155 karakter sınırı için kısaltıldı",
    ],
  },
  slots: {
    intro: { heading: "Yabancı Dil Programları", take: [0] },
    // Başlığın gövdesi `intro` ile birebir aynı paragraf — başlık tek başına basılır.
    gridTitle: { heading: H19, take: [] },
    contact: { heading: H19, take: [1] },
    otherTitle: { heading: "Dünya Dilleri Merkezi Yabancı Dil Kursları", take: [0] },
  },
  features: FEATURES_STANDARD({ heading: "Dünya Dilleri Merkezi Yabancı Dil Kursları", take: [1] }),
  headingEdits: FEATURE_HEADING_EDITS,
  edits: { ...FEATURE_BODY_EDITS, ...LANGUAGE_LIST_EDITS },
  ignored: [
    ICON_ARTIFACT,
    { line: "Yabancı Dil Kursları", reason: "şablon üst etiketi; kırıntı ve H1 aynı bilgiyi taşıyor" },
    ...["İtalyanca Kursu", "Yabancılar İçin Türkçe Kursu", "İngilizce Konuşma Kursu", "Hollandaca | Flemenkçe Kursu"].map(
      (line) => ({ line, reason: "kısa dil link listesi — dil kartlarıyla (data/languages.ts) temsil ediliyor" }),
    ),
    ...LANGUAGE_CARD_BOILERPLATE,
  ],
};

export const LANGUAGE_HUB_ADDED = {
  ctaSub: "Ücretsiz seviye tespit sınavı ve kurs tarihleri için size en yakın şubemizle görüşün.",
  gridLead:
    "Şubelerimizde düzenli program açtığımız 10 dil kursu. Her kartta seviyeler, gün ve saatler, kur sınavları ve sertifikalar için ilgili bölüme doğrudan gidebilirsiniz.",
  otherLanguages: OTHER_LANGUAGES,
  // 2026-10-01: sayfası açılan 5 dil (ddmcadde kaynaklı) bağlantılı, kalanlar şubeden.
  extraLanguages: EXTRA_LANGUAGES.map((l) => ({ label: l.label, href: `${YD_PATH}/${l.slug}` })),
  otherText: `${joinTr(EXTRA_LANGUAGES.map((l) => l.name))} kurslarımızın ayrıntıları kendi sayfalarında; ${joinTr(OTHER_LANGUAGES)} eğitimlerimizin program ve ders saatlerini şubelerimizden öğrenebilirsiniz.`,
  tableTitle: "Dil kurslarımız bir bakışta",
  tableLead:
    "Kur süresi, sınıf büyüklüğü ve kur sonunda girebileceğiniz uluslararası sınavlar — her dilin kendi kurs sayfasındaki bilgilerden derlendi.",
  /**
   * Kaynak: her dilin `/yabanci-dil-egitimleri/{slug}` kaydı ("1 Kur 2 Ay 40
   * Saat 8 Kişilik Sınıflarda…" satırı ve "…Sertifikaları ve Uluslararası
   * Sınavlar" bölümü). Aynı satırlardaki ÜCRETLER bilinçli olarak alınmadı
   * (kullanıcı kararı 2026-09-24: sitede fiyat yayınlanmıyor). Kaynakta yazmayan hücre "—".
   */
  table: [
    { slug: "ingilizce-kursu", duration: "2,5 ay · 60 saat", group: "8 kişi", exams: "TOEFL, IELTS, YDS, YÖKDİL, E-TEP" },
    { slug: "almanca-kursu", duration: "2 ay · 40 saat", group: "8 kişi", exams: "Goethe, TELC, TestDaF" },
    { slug: "fransizca-kursu", duration: "2 ay · 40 saat", group: "8 kişi", exams: "DELF, DALF" },
    { slug: "ispanyolca-kursu", duration: "2 ay · 40 saat", group: "8 kişi", exams: "DELE" },
    { slug: "italyanca-kursu", duration: "2 ay · 40 saat", group: "8 kişi", exams: "CELI, CILS" },
    { slug: "rusca-kursu", duration: "2,5 ay · 60 saat", group: "8 kişi", exams: "TORFL" },
    { slug: "cince-kursu", duration: "2,5 ay · 60 saat", group: "8 kişi", exams: "Çin Kültür Merkezi sınavları" },
    { slug: "flemenkce-kursu", duration: "2,5 ay · 60 saat", group: "—", exams: "—" },
    { slug: "yabancila-icin-turkce-kurs", duration: "Kurlara bölünmeden", group: "6 kişi ya da birebir", exams: "TÖMER sınavları" },
    // 2026-10-01 — süre dilin kendi kaynağından (`data/ddmcadde_content.json`, `courseFacts`: "1 kur 2,5 ay olup 60
    // saat"); grup büyüklüğü ve kur sonu uluslararası sınav kaynakta yazmıyor → "—" (dilin sınavı sayfasında genel bilgi).
    ...EXTRA_LANGUAGES.map((l) => {
      const facts = courseFacts(l, getLanguagePage(l));
      if (!facts.kurMonths || !facts.kurHours) throw new Error(`[hubs] ${l.slug}: kaynakta kur süresi / saati yok.`);
      return { slug: l.slug, duration: `${facts.kurMonths} ay · ${facts.kurHours} saat`, group: "—", exams: "—" };
    }),
  ],
  tableNote: "Uluslararası sınavlara kur bitiminde, sınavı düzenleyen kurumda ücret karşılığında girilir.",
  aboutParagraphs: [
    "Programlarımız Avrupa Ortak Dil Çerçevesi'nin (CEFR) A1–C2 seviyelerine göre kurlara ayrılır. Kursa ücretsiz seviye tespit sınavıyla başlar, her kurun sonunda yapılan kur bitirme sınavıyla bir sonraki seviyeye geçersiniz.",
    "Hafta içi sabah ve akşam, hafta sonu sabah ve öğleden sonra gruplarının yanı sıra birebir özel ders ve online eğitim seçenekleriyle programınızı kendi takviminize göre kurabilirsiniz.",
  ],
  faq: [
    {
      question: "Kaç farklı dilde eğitim veriyorsunuz?",
      answer: [
        "19 dilde: İngilizce, Almanca, Fransızca, İspanyolca, İtalyanca, Rusça, Çince, Japonca, Flemenkçe, Yunanca, Korece, İsveççe, Portekizce, Hırvatça, Boşnakça, Slovakça, Bulgarca ve Farsça. Bunlara yabancılar için Türkçe kursu da eklenir.",
      ],
    },
    {
      question: "Bir kur ne kadar sürer?",
      answer: [
        "Dile göre değişir. Almanca, Fransızca, İspanyolca ve İtalyanca'da bir kur 2 ay ve 40 saat; İngilizce, Rusça, Çince ve Felemenkçe'de 2,5 ay ve 60 saattir.",
      ],
    },
    {
      question: "Sınıflar kaç kişilik?",
      answer: [
        "Grup derslerimiz 8 kişilik sınıflarda yapılır. Yabancılar için Türkçe derslerini 6 kişilik özel gruplar ya da birebir özel ders olarak alabilirsiniz.",
      ],
    },
    {
      question: "Kur sonunda sertifika veriliyor mu?",
      answer: [
        "Her kur sonunda kur bitirme sınavı yapılır; bir sonraki kura geçmek için en az 60 puan gerekir. Başarılı olan öğrencilere ulaştıkları seviyeyi belirten sertifika verilir.",
      ],
    },
    {
      question: "Seviyemi nasıl öğrenebilirim?",
      answer: ["Kursa başlamadan önce ücretsiz seviye tespit sınavına girebilirsiniz; size uygun kur bu sınava göre belirlenir."],
    },
    {
      question: "Online ders seçeneği var mı?",
      answer: [
        "Evet. Şubelerimizdeki yüz yüze programların yanında online eğitim seçeneklerimiz de var; online derslerde birebir ya da 8 kişilik gruplar hâlinde çalışılır.",
      ],
    },
  ],
};

/* ---------------------------------------------------------------
 * /diger-program/ozel-dersler
 * ------------------------------------------------------------- */

const YD = "/yabanci-dil-egitimleri";
const SH = "/sinav-hazirlik-egitimleri";

export const PRIVATE_HUB: HubDef = {
  path: "/diger-program/ozel-dersler",
  label: "Özel Dersler",
  meta: {
    title: "Yabancı Dil Özel Ders Programları | Dünya Dilleri Merkezi",
    reasons: ["title: marka eki eklendi"],
  },
  slots: {
    intro: { heading: "Yabancı Dil Özel Ders Programları", take: [0] },
    teachers: { heading: "Yabancı Dil Özel Ders Programları", take: [1] },
    pairs: { heading: "Yabancı Dil Özel Ders Programları", take: [2] },
    before: { heading: "Yabancı Dil Özel Ders Programları", take: [3] },
    schedule: { heading: "Yabancı Dil Özel Ders Programları", take: [4] },
    method: { heading: "Özel Dil Eğitimi Yöntemi", take: "all" },
    listTitle: { heading: "Yabancı Dil Özel Dersler", take: [] },
  },
  // Etiketler kaynaktan birebir; hedefler lib/nav.ts'teki özel ders adresleri (P4).
  sourceLinks: {
    heading: "Yabancı Dil Özel Dersler",
    links: {
      "İngilizce Özel Ders Birebir Kurs Programları": `${YD}/ingilizce-kursu/ingilizce-ozel-ders`,
      "Almanca Özel Ders Birebir Kurs Programları": `${YD}/almanca-kursu/almanca-ozel-ders`,
      "Fransızca Özel Ders Birebir Kurs Programları": `${YD}/fransizca-kursu/fransizca-ozel-ders`,
      "İspanyolca Özel Ders Birebir Kurs Programları": `${YD}/ispanyolca-kursu/ispanyolca-ozel-ders`,
      "İtalyanca Özel Ders Birebir Kurs Programları": `${YD}/italyanca-kursu/italyanca-ozel-ders`,
      "Rusça Özel Ders Birebir Kurs Programları": `${YD}/rusca-kursu/rusca-ozel-ders`,
      "Çince Özel Ders Birebir Kurs Programları": `${YD}/cince-kursu/cince-ozel-ders`,
      "Yabancılar İçin Türkçe Özel Ders": `${YD}/yabancila-icin-turkce-kurs/turkce-ozel-ders`,
      "TOEFL Özel Ders Birebir Kurs Programları": `${SH}/toefl-kursu/toefl-ozel-ders`,
      "IELTS Özel Ders Birebir Kurs Programları": `${SH}/ielts-kursu/ielts-ozel-ders`,
      "TOEIC Özel Ders Birebir Kurs Programları": `${SH}/toeic-kursu/toeic-ozel-ders`,
      "PTE Akademik Özel Ders": `${SH}/academic-pte/pte-akademik-ozel-ders`,
      "Proficiency Özel Ders Birebir Kurs Programları": `${SH}/proficiency-kursu/proficiency-ozel-ders`,
      "SAT Özel Ders Birebir Kurs Programları": `${SH}/sat-kursu/sat-ozel-ders`,
      "GRE Özel Ders Birebir Kurs Programları": `${SH}/gre-kursu/gre-ozel-ders`,
      "GMAT Özel Ders Birebir Kurs Programları": `${SH}/gmat-kursu/gmat-ozel-ders`,
      "YDS Özel Ders Birebir Kurs Programları": `${SH}/yds-kursu/yds-ozel-ders`,
    },
  },
  edits: {
    // Dil bilgisi: "okul veya ve iş", büyük harfli "Amaç Bireylerin", soru-cevap satır içinde.
    "Dünya Dilleri Merkezi'nde Özel dersler farklı sebeplerden dolayı grup eğitimlerine katılamayan kişiler için dil eğitimi ve sınav programlarına yönelik eğitimler şeklinde kişiye özel olarak hazırlanır. Amaç Bireylerin öğrenme alışkanlıklarını, ihtiyaç ve beklentilerini belirleyerek, kişiye özel yabancı dil eğitimi vermek. Kimler Katılabilir? Kendi zaman, okul veya ve iş programına uygun ders almak isteyen tüm kişiler.":
      "Dünya Dilleri Merkezi'nde özel dersler, farklı sebeplerle grup eğitimlerine katılamayanlar için dil eğitimi ve sınav programlarına yönelik, kişiye özel olarak hazırlanır. Amacımız öğrenme alışkanlıklarınızı, ihtiyaç ve beklentilerinizi belirleyerek size özel yabancı dil eğitimi vermek. Kendi zaman, okul ya da iş programına uygun ders almak isteyen herkes katılabilir.",
    // Büyük harf vurguları ("TÜRK veya YABANCI") ve "bire-bir" yazımı.
    "Eğitim Detayları: Eğitim; öğrenci adayının seviyesi, ihtiyaç ve beklentilerine göre formasyon sahibi TÜRK veya YABANCI öğretmenler tarafından verilir. Dersler, bire-bir eğitim düzeninde olmaktadır.":
      "Dersler; öğrencinin seviyesi, ihtiyaç ve beklentilerine göre formasyon sahibi Türk veya yabancı öğretmenler tarafından, birebir eğitim düzeninde verilir.",
    "Bire-bir dersleri en fazla 2 kişi paylaşabilir. Daha fazla kişilerin bir araya gelip grup oluşturdukları durumlar için ayrıca görüşülür.":
      "Birebir dersleri en fazla 2 kişi paylaşabilir. Daha fazla kişinin bir araya gelip grup oluşturduğu durumlar için ayrıca görüşülür.",
    // Büyük harfli vurgular ("ÖĞRETME", "MORAL ve MOTİVASYON") normal yazıma çevrildi; anlam aynı.
    "Dil öğreten bir kurum olarak, öğrenim sürecine bakış açımız, sektörün şu anki \"ÖĞRETME\" merkezli yaklaşımının aksine \"ÖĞRENME\" merkezlidir. Öğrencilerimizin bu süreçte pasif değil, aktif olmalarını destekleyen bir eğitim modeli uygulamaktayız. Dil öğrenmede MORAL ve MOTİVASYON unsurlarının oynadığı rolün önemini biliyoruz.":
      "Dil öğreten bir kurum olarak öğrenim sürecine bakış açımız, sektördeki \"öğretme\" merkezli yaklaşımın aksine \"öğrenme\" merkezlidir. Öğrencilerimizin bu süreçte pasif değil aktif olmalarını destekleyen bir eğitim modeli uyguluyoruz. Dil öğrenmede moral ve motivasyonun oynadığı rolün önemini biliyoruz.",
    "İnsanların farklı öğrenme alışkanlıklarına sahip olduklarının ve dolayısıyla farklı şekillerde öğrendiklerinin bilincindeyiz. Bu nedenle eğitimlerimizi DİNLEME, GÖRME, YAZMA, HİSSETME ve KONUŞMA aktivitelerini, kişiye veya gruba özel bir biçimde öğrencilerin beklentileri doğrultusunda hazırlamaktayız.":
      "İnsanların farklı öğrenme alışkanlıklarına sahip olduğunun ve dolayısıyla farklı şekillerde öğrendiğinin bilincindeyiz. Bu nedenle eğitimlerimizi dinleme, görme, yazma, hissetme ve konuşma etkinliklerini kişiye ya da gruba özel biçimde birleştirerek, öğrencilerin beklentileri doğrultusunda hazırlıyoruz.",
  },
  ignored: [],
};

export const PRIVATE_HUB_ADDED = {
  ctaTitle: "Size özel ders programını birlikte planlayalım",
  ctaSub: "Seviyenizi, hedefinizi ve uygun gün-saatleri konuşmak için size en yakın şubemizle görüşün.",
  steps: [
    { title: "Seviye ve ihtiyaç analizi", slot: "before" },
    { title: "Size özel program ve öğretmen", slot: "teachers" },
    { title: "Gün, saat ve yeri siz seçersiniz", slot: "schedule" },
  ],
  stepsTitle: "Özel ders nasıl başlar?",
  columnsLead:
    "Dil ve sınav hazırlık özel derslerimiz. Özel ders sayfası henüz yayında olmayan programlarda ilgili kursun ana sayfasına gidebilirsiniz.",
  languageColumn: {
    title: "Dil özel dersleri",
    intro: "Günlük iletişimden iş hayatına, sıfırdan başlayanlardan seviyesini ilerletmek isteyenlere, programı tamamen size göre kurulan dil dersleri.",
  },
  examColumn: {
    title: "Sınav özel dersleri",
    intro: "Sınav tarihinize ve hedef puanınıza göre planlanan, sınavın bölümlerine ve soru tiplerine odaklanan birebir hazırlık.",
  },
  compareTitle: "Özel ders mi, grup dersi mi?",
  compareLead: "İki formatı kişi sayısı, takvim, program ve ders yeri açısından karşılaştırın.",
  /** Hücreler kaynaktan: özel ders (bu sayfa), grup (dil ve sınav sayfaları). */
  compare: [
    { row: "Kişi sayısı", ozel: "1 kişi; en fazla 2 kişi paylaşabilir", grup: "Dil kurslarında 8 kişilik, sınav hazırlıkta en fazla 6 kişilik sınıflar" },
    { row: "Gün ve saat", ozel: "Sizin belirlediğiniz gün ve saatler", grup: "Kurs takvimindeki hafta içi ve hafta sonu grupları" },
    { row: "Program", ozel: "Seviyenize, öğrenme alışkanlığınıza ve hedefinize göre kişiye özel", grup: "Seviyeye göre kur programı" },
    { row: "Ders yeri", ozel: "Tercihinize göre iş yeri ya da ev", grup: "Şube" },
  ],
  faq: [
    {
      question: "Özel ders kimler için uygun?",
      answer: [
        "Farklı sebeplerle grup eğitimlerine katılamayan, kendi zaman, okul ya da iş programına uygun ders almak isteyen herkes için. Sınav tarihi yaklaşanlar ve belirli bir beceriye (ör. konuşma) odaklanmak isteyenler de özel dersi tercih eder.",
      ],
    },
    {
      question: "Dersler nerede yapılır?",
      answer: ["Dersler tercihinize göre iş yerinizde ya da evinizde verilir; eğitmenlerimiz bu konuda esnektir."],
    },
    {
      question: "Özel derse kaç kişi katılabilir?",
      answer: [
        "Birebir dersleri en fazla 2 kişi paylaşabilir. Daha kalabalık bir grup oluşturmak isterseniz ayrıca görüşülür.",
      ],
    },
    {
      question: "Özel dersleri kimler veriyor?",
      answer: ["Seviyenize, ihtiyaç ve beklentilerinize göre formasyon sahibi Türk ya da yabancı öğretmenler."],
    },
    {
      question: "Özel derse başlamadan önce ne yapılıyor?",
      answer: [
        "Öğretmenimiz sizinle görüşerek seviyenizi, öğrenme alışkanlıklarınızı, ihtiyaç ve beklentilerinizi belirler. Bu bilgilere göre size en uygun yöntem, kaynak ve program hazırlanır.",
      ],
    },
  ],
  photo: { src: "/assets/home_page_images/ozel-ders.jpg", alt: "Birebir yabancı dil dersi", width: 5964, height: 3976 },
};

/* ---------------------------------------------------------------
 * /diger-program
 * ------------------------------------------------------------- */

const DP_YD = "Yurt Dışı Eğitim";

export const OTHER_PROGRAMS_HUB: HubDef = {
  path: "/diger-program",
  label: "Diğer Eğitim Programları",
  meta: {
    title: "Diğer Eğitim Programları | Dünya Dilleri Merkezi",
    description:
      "Business English, özel dersler, çocuklar için İngilizce, online dil eğitimi, yurtdışı eğitim danışmanlığı ve tercüme: İstanbul'daki 5 şubemizde.",
    h1: "Diğer Eğitim Programları",
    reasons: [
      "title: 'Diğer Programlar' → programı anlatan başlık + marka eki",
      "description: sondaki başıboş ” işareti ve 155 karakter sınırı; bayat şube listesi yerine 5 şube",
      "h1: kaynakta h1 yok; kaynaktaki 'Diğer Eğitim Programları' satırı H1 yapıldı, ilk başlık (h3) bölüm başlığı olarak duruyor",
    ],
  },
  slots: {
    intro: { heading: "Dünya Dilleri Merkezi Şubelerimizde Diğer Eğitim Programalrımız", take: [0] },
    // "Yurt Dışı Eğitim" başlığı kaynakta iki kez geçiyor; gövdeleri birleşik sırada:
    // 0-4 kısa link listesi · 5 iletişim · 6-13 program adı/açıklama · 14 "Diğer Eğitim Programları"
    // · 15 yurtdışı açıklaması · 16 özellik bloğu gövdesi.
    shortList: { heading: DP_YD, take: [0, 1, 2, 3, 4] },
    contact: { heading: DP_YD, take: [5] },
    business: { heading: DP_YD, take: [7] },
    private: { heading: DP_YD, take: [9] },
    kids: { heading: DP_YD, take: [11] },
    online: { heading: DP_YD, take: [13] },
    h1Line: { heading: DP_YD, take: [14] },
    abroad: { heading: DP_YD, take: [15] },
  },
  features: FEATURES_STANDARD({ heading: DP_YD, take: [16] }),
  headingEdits: {
    ...FEATURE_HEADING_EDITS,
    "Dünya Dilleri Merkezi Şubelerimizde Diğer Eğitim Programalrımız": "Dünya Dilleri Merkezi Şubelerimizde Diğer Eğitim Programlarımız",
  },
  edits: {
    ...FEATURE_BODY_EDITS,
    // Kaynakta cümle sonu noktası eksik.
    "Çocuklar için hazırladığımız İngilizce eğitim programlarımız ilkokul ve ortaokulda öğrenim gören öğrencilere yöneliktir. Öğrencilerimizin dört dil yetisi olan okuma, yazma, konuşma ve dinleme yeteneklerini geliştirecek yöntemleri kullanarak kısa sürede akıcı düzeyde İngilizce konuşmalarını hedeflemekteyiz":
      "Çocuklar için hazırladığımız İngilizce eğitim programlarımız ilkokul ve ortaokulda öğrenim gören öğrencilere yöneliktir. Öğrencilerimizin dört dil yetisi olan okuma, yazma, konuşma ve dinleme yeteneklerini geliştirecek yöntemleri kullanarak kısa sürede akıcı düzeyde İngilizce konuşmalarını hedefliyoruz.",
    // "%30'a varan indirim" güncelliği doğrulanamayan kampanya iddiası — çıkarıldı (kullanıcıya bildirildi).
    "Dünya Dilleri Merkezi farkıyla yurtdışında dil eğitimi alın. Yurtdışında mükemmel dil eğitimi fırsatlarından %30 a varan indirimlerden yararlanın. DDM, size yurtdışı eğitiminizle ilgili bir çok alanda güvenilir danışmanlık hizmeti sunuyor.":
      "Dünya Dilleri Merkezi farkıyla yurtdışında dil eğitimi alın. DDM, yurtdışı eğitiminizle ilgili birçok alanda güvenilir danışmanlık hizmeti sunuyor.",
  },
  ignored: [
    {
      line: "Business English",
      reason: "program adı — kartta başlık olarak basılıyor (kaynakta hem kısa listede hem açıklama üstünde)",
    },
    { line: "Özel Dersler", reason: "program adı — kartta başlık" },
    { line: "Çocuklar İçin Dil Eğitimi", reason: "program adı — kartta başlık" },
    { line: "Online Dil Eğitimi", reason: "program adı — kartta başlık" },
    { line: "Tercüme Hizmetleri", reason: "program adı — kartta başlık" },
  ],
};

export const OTHER_PROGRAMS_HUB_ADDED = {
  /** Kaynaktaki "Diğer Eğitim Programları" satırı H1 oldu; kurum bölümüne ayrı başlık. */
  aboutTitle: "Neden Dünya Dilleri Merkezi?",
  aboutParagraphs: [
    `2003 yılından bu yana İstanbul'daki ${BRANCH_LIST.length} şubemizde dil kurslarımızın yanında iş hayatına, çocuklara, yurtdışı eğitime ve tercümeye yönelik programlar sunuyoruz.`,
  ],
  ctaSub: "Hangi programın size uygun olduğunu birlikte belirlemek için size en yakın şubemizle görüşün.",
  /** Tercüme kaynakta açıklamasız; kendi sayfasının (tercume-hizmetleri) meta açıklamasından. */
  translationText: "Akademik metinler ve resmi belgeler için yazılı, sözlü ve noter onaylı tercüme hizmeti.",
  kurumsalText:
    "Şirket çalışanlarına ve yöneticilere özel, yönetici takip raporuyla izlenen kurumsal dil eğitimi programları.",
  tableTitle: "Hangi program size uygun?",
  tableLead: "Programları kimin için olduklarına ve nasıl işlediklerine göre karşılaştırın.",
  /** Hücreler her programın kendi kaynak metninden (bu sayfa + program sayfaları). */
  table: [
    { name: "Business English", who: "Üst düzey yöneticiler, müdürler, bölüm yöneticileri ve çalışanlar", how: "İş İngilizcesinin sözcükleri, dil yapısı ve şirketler arası yazışmalar; ihtiyaca göre şekillenir" },
    { name: "Özel Dersler", who: "Grup eğitimine katılamayan, kendi programına uygun ders isteyen herkes", how: "Birebir (en fazla 2 kişi); gün, saat ve yer sizin tercihiniz" },
    { name: "Çocuklar İçin Dil Eğitimi", who: "İlkokul ve ortaokul öğrencileri", how: "Okuma, yazma, konuşma ve dinlemeyi birlikte geliştiren İngilizce programı" },
    { name: "Online Dil Eğitimi", who: "Şubeye gelmeden ders almak isteyenler", how: "Birebir ya da 8 kişilik online gruplar; haftalık olarak revize edilebilen program" },
    { name: "Yurt Dışı Eğitim", who: "Yurtdışında dil eğitimi ya da yüksek öğrenim planlayanlar", how: "Okul seçimi, kayıt ve süreç boyunca danışmanlık" },
    { name: "Tercüme Hizmetleri", who: "Belge ve metin çevirisi ihtiyacı olanlar", how: "Yazılı, sözlü ve noter onaylı tercüme" },
  ],
  faq: [
    {
      question: "Business English kursu kimler için?",
      answer: [
        "Şirketlerin üst düzey yöneticileri, müdürleri, bölüm yöneticileri ve İngilizcesini iş hayatına göre geliştirmek isteyen tüm çalışanlar için. Program iş İngilizcesinin sözcüklerine, dil yapısına ve şirketler arası yazışmalara odaklanır.",
      ],
    },
    {
      question: "Çocuklar için İngilizce kursu hangi yaş grubuna yönelik?",
      answer: ["İlkokul ve ortaokulda öğrenim gören öğrencilere yönelik; dört dil becerisi birlikte geliştirilir."],
    },
    {
      question: "Online eğitimde ders gün ve saatlerini kim belirliyor?",
      answer: [
        "Siz. Online programlar size özel gün ve saatlerde, haftalık olarak revize edebileceğiniz şekilde hazırlanır; birebir ya da 8 kişilik online gruplar hâlinde yapılır.",
      ],
    },
    {
      question: "Yurtdışı eğitim danışmanlığı ücretli mi?",
      answer: [
        "Dünya Dilleri Merkezi, Kaplan International ve ILSC dil okullarının resmi kayıt ofisidir; yurtdışı eğitim sürecinizde ücretsiz danışmanlık dahil konaklama, vize ve ulaşım gibi konularda destek verir.",
      ],
    },
    {
      question: "Kurumumuz için dil eğitimi alabilir miyiz?",
      answer: ["Evet. Şirketlere özel kurumsal dil eğitimi programlarımız için Kurumsal Dil Eğitimi sayfamıza göz atın."],
    },
  ],
};

/* ---------------------------------------------------------------
 * /ingilizce-kurslari
 * ------------------------------------------------------------- */

/** Kaynakta yanlışlıkla H1 olan C1 başlığı — sayfada C1 seviye kartının başlığı. */
export const IK_H1 = "Advanced İngilizce C1 Kursu | İleri Seviye C1";
const IK_MAIN = "Dünya Dilleri Merkezi İngilizce Kursları";

export const ENGLISH_HUB: HubDef = {
  path: "/ingilizce-kurslari",
  label: "İngilizce Kursları",
  meta: {
    h1: "İngilizce Kursları",
    reasons: [
      "h1: kaynakta tek bir seviye kursunun başlığı ('Advanced İngilizce C1 Kursu | İleri Seviye C1') — hub'ın H1'i 'İngilizce Kursları' yapıldı; eski başlık C1 seviyesinin başlığı olarak duruyor",
    ],
  },
  slots: {
    lead: { heading: IK_H1, take: [0] },
    c1: { heading: IK_H1, take: [1, 2] },
    contact: { heading: IK_H1, take: [3] },
    // IK_MAIN gövdesi (kaynak sırası): 0 şube başlığı · 1 eğitim sistemi linki · 2-5 şube linkleri
    // · 6 seviye başlığı · 7-11 seviyeler · 12-16 hedef kitle/konuşma · 17 "İngilizce Kursu Eğitim"
    branchTitle: { heading: IK_MAIN, take: [0] },
    system: { heading: IK_MAIN, take: [1] },
    branches: { heading: IK_MAIN, take: [2, 3, 4, 5] },
    levelTitle: { heading: IK_MAIN, take: [6] },
    levels: { heading: IK_MAIN, take: [7, 8, 9, 10, 11] },
    programs: { heading: IK_MAIN, take: [12, 13, 14, 15, 16] },
    about: { heading: "Dünya Dilleri Merkezi İngilizce Kursu Eğitim Planı, Şubeler ve Eğitim Seviyeleri", take: [0] },
    otherLabel: { heading: "→ Esnek öğrenme", take: [0] },
    stripTitle: { heading: H19, take: [0] },
    stripCta: { heading: H19, take: [1] },
  },
  features: FEATURES_STANDARD({ heading: "Dünya Dilleri Merkezi İngilizce Kursu Eğitim Planı, Şubeler ve Eğitim Seviyeleri", take: [1] }),
  headingEdits: FEATURE_HEADING_EDITS,
  edits: {
    ...FEATURE_BODY_EDITS,
    ...LANGUAGE_LIST_EDITS,
    // "Türkiye'nin En Çok Tercih Edilen…" doğrulanamayan üstünlük iddiası + yarım cümle ("…Öğrenilir.").
    "Türkiye'nin En Çok Tercih Edilen Dil Okulunda Öğrenilir. Dünya Dilleri Merkezi farkıyla İngilizce öğrenin. Türk ve yabancı öğretmenler eşliğinde, grup veya özel ders programlarıyla İngilizce öğrenebilirsiniz.":
      "Dünya Dilleri Merkezi farkıyla İngilizce öğrenin. Türk ve yabancı öğretmenler eşliğinde, grup veya özel ders programlarıyla başlangıçtan ileri seviyeye kadar İngilizce öğrenebilirsiniz.",
    // Bayat şube: Beşiktaş → Etiler (data/branches.ts). Hedef sayfa aynı (besiktas-subesi-kurs-tarihi).
    "→ Beşiktaş Şubesi İngilizce Eğitim Plan Tablosu ve Kurs Tarihi":
      "→ Etiler Şubesi İngilizce Eğitim Plan Tablosu ve Kurs Tarihi",
    "İngilizce C1 seviyesi eğitmenlerimiz ve en deneyimli ve nitelikli İngilizce öğretmenlerimizden oluşan kadromuz ve bu kurs için özel bir program oluşturdu.":
      "C1 seviyesi için en deneyimli ve nitelikli İngilizce öğretmenlerimizden oluşan kadromuz özel bir program oluşturdu.",
  },
  ignored: [
    ICON_ARTIFACT,
    { line: "C1 Seviyesi İngilizce Eğitimi", reason: "C1 bölümünün üst etiketi — C1 seviye kartı başlığıyla temsil ediliyor" },
    { line: "İngilizce Kursu Eğitim", reason: "şablon üst etiketi (bir sonraki h2'nin kicker'ı)" },
    ...LANGUAGE_CARD_BOILERPLATE,
  ],
};

export const ENGLISH_HUB_ADDED = {
  ctaSub: "Ücretsiz seviye tespit sınavı ve size en yakın şubenin kurs tarihleri için bizimle görüşün.",
  /** Kaynak seviye satırı → CEFR grubu. Gruplar `data/languages.ts` İngilizce seviye grupları (6.4). */
  railGroups: [
    { label: "Beginner", range: "A1 – A2", levels: ["→ Elementary İngilizce Kursu | Beginner Yeni Başlayanlar İçin İngilizce Kursu", "→ Pre-Intermediate İngilizce Kursu | Orta Alt Seviye İngilizce Eğitimi"] },
    { label: "Intermediate", range: "B1 – B2", levels: ["→ Intermediate İngilizce Kursu | Orta Seviye İngilizce", "→ Upper-Intermediate İngilizce Kursu | İleri Seviye İngilizce"] },
    { label: "Advanced", range: "C1 – C2", levels: ["→ Advanced İngilizce C1 Kursu | İleri Seviye C1 İngilizce"] },
  ],
  /** Seviye kartı açıklamaları — CEFR tanımlarının kısa Türkçe özeti (genel bilgi, kuruma özel iddia yok). */
  levelTexts: {
    "→ Elementary İngilizce Kursu | Beginner Yeni Başlayanlar İçin İngilizce Kursu":
      "Sıfırdan başlayanlar için: kendinizi tanıtmak, günlük ihtiyaçları anlatmak ve basit soruları yanıtlamak.",
    "→ Pre-Intermediate İngilizce Kursu | Orta Alt Seviye İngilizce Eğitimi":
      "Tanıdık konularda kısa sohbetler, basit yazışmalar ve geçmiş/gelecek zamanla anlatım.",
    "→ Intermediate İngilizce Kursu | Orta Seviye İngilizce":
      "İş, okul ve seyahatte karşılaşılan durumları idare etmek; deneyim ve görüşleri anlatmak.",
    "→ Upper-Intermediate İngilizce Kursu | İleri Seviye İngilizce":
      "Anadili İngilizce olanlarla akıcı konuşmak, karmaşık metinlerin ana fikrini anlamak ve görüş savunmak.",
  } as Record<string, string>,
  levelsLead:
    "İngilizce programlarımız Avrupa Ortak Dil Çerçevesi'nin (CEFR) seviyelerine göre sıralanır. Kursa ücretsiz seviye tespit sınavıyla başlar, her kurun sonunda kur bitirme sınavıyla bir üst seviyeye geçersiniz.",
  programsTitle: "Hedefinize göre İngilizce programları",
  programsLead: "Okul, sınav ya da konuşma odaklı — yaşınıza ve amacınıza göre hazırlanan programlar.",
  programTexts: {
    "→ Üniversite Hazırlık İngilizcesi": "Üniversite hazırlık düzeyindeki öğrenciler için akademik İngilizce, essay yazımı ve konuşma pratiği.",
    "→ YKS Dil İngilizce": "Üniversite sınavının yabancı dil testine (YKS-YDT) hazırlık: sınav teknikleri ve deneme testleri.",
    "→ İlköğretim İngilizcesi": "İlköğretim çağındaki çocuklar için konuşma pratiği ve oyunlarla öğrenmeyi öne çıkaran temel İngilizce.",
    "→ Yaz Okulu İngilizce Programları": "Çocuklar için yurt içinde ve yurt dışında, İngilizceyi bilim, sanat ve kültür etkinlikleriyle birleştiren yaz programları.",
    "→ İngilizce Konuşma Kursu | Eğitim Programı İngilizce Konuşma Öğrenme English Speaking":
      "Konuşma pratiğine odaklanan, hafta içi akşam ve hafta sonu gruplarıyla İngilizce konuşma kursu.",
  } as Record<string, string>,
  /** Hedef sayfası henüz yoksa okuru götüren üretilmiş sayfa. */
  programAlt: {
    "→ İngilizce Konuşma Kursu | Eğitim Programı İngilizce Konuşma Öğrenme English Speaking": {
      label: "İngilizce Konuşma Kursu sayfası",
      href: "/yabanci-dil-egitimleri/ingilizce-konusma-kursu",
    },
  } as Record<string, { label: string; href: string }>,
  faq: [
    {
      question: "Hangi seviyeden başlamalıyım?",
      answer: ["Kursa başlamadan önce ücretsiz seviye tespit sınavına girersiniz; size uygun kur bu sınavın sonucuna göre belirlenir."],
    },
    {
      question: "Bir İngilizce kuru ne kadar sürer?",
      answer: ["Bir kur 2,5 ay ve 60 saattir; dersler 8 kişilik sınıflarda yapılır."],
    },
    {
      question: "Kur sonunda ne oluyor?",
      answer: [
        "Her kur sonunda kur bitirme sınavı yapılır; bir sonraki kura geçmek için en az 60 puan gerekir. Başarılı olan öğrencilere ulaştıkları seviyeyi belirten sertifika verilir.",
      ],
    },
    {
      question: "İngilizce kursunun ardından hangi sınavlara girebilirim?",
      answer: [
        "Seviyesini tamamlayan öğrencilerimiz uluslararası ve yerel geçerliliği olan TOEFL, IELTS, YDS, YÖKDİL ve E-TEP sınavlarına ücret karşılığında girebilir. İleri seviye programımız IELTS ve Cambridge English Advanced (CAE) sınavlarına hazırlık imkânı da sağlar.",
      ],
    },
    {
      question: "Online İngilizce kursu var mı?",
      answer: ["Evet. İngilizce kurslarımızı yüz yüze ya da online, grup veya birebir özel ders olarak alabilirsiniz."],
    },
    {
      question: "C1 seviyesinde neler yapabilirim?",
      answer: [
        "İngilizce konuşulan bir ülkede, eğitim hayatınızda ya da iş ortamında yardım almadan akıcı konuşabilir; konuşma ve metinlerdeki ince, ayrıntılı anlamları anlayıp kendinizi ayrıntılı biçimde ifade edebilirsiniz.",
      ],
    },
  ],
  photo: { src: "/assets/home_page_images/dil-ingilizce.jpg", alt: "Londra'da Big Ben ve kırmızı otobüs", width: 4000, height: 3000 },
};

/* ---------------------------------------------------------------
 * /yurtdisi-egitim  (kullanıcı kararı: "içerikli hub")
 * ------------------------------------------------------------- */

const YE_MAIN = "Dünya Dilleri Merkezi Yurtdışı Dil Eğitimi";
const YE_DE = "YETİŞKİNLER İÇİN ALMANCA KURSLARIMIZ";
const YE_FR = "YETİŞKİNLER İÇİN FRANSIZCA KURSLARIMIZ";
const YE_ES = "YETİŞKİNLER İÇİN İSPANYOLCA KURSLARI";
const YE_COUNTRIES = "Yurtdışı dil Eğitiminde en çok tercih edilen ülkeler Hangileri ?";

export const ABROAD_HUB: HubDef = {
  path: "/yurtdisi-egitim",
  label: "Yurtdışı Eğitim",
  meta: {
    title: "Yurtdışı Dil Eğitimi | İngilizce, Almanca, İspanyolca",
    description:
      "Kaplan International ve ILSC resmi kayıt ofisi DDM ile yurtdışında İngilizce, Almanca, Fransızca ve İspanyolca dil eğitimi; ülkeler, şehirler ve okullar.",
    reasons: [
      "title: kaynak 'Yurtdışında … Eğitimi' — hub'ın ana terimi 'Yurtdışı Dil Eğitimi' başa alındı",
      "description: bayat şube listesi yerine sayfanın asıl konusu (resmi kayıt ofisi, diller, ülkeler)",
    ],
  },
  slots: {
    langs: { heading: "Dil Kurslarımız", take: [0] },
    experience: { heading: "Uluslararası Deneyim", take: [0] },
    countriesIntro: { heading: "En Çok Tercih Edilen Ülkeler", take: [0] },
    contact: { heading: "En Çok Tercih Edilen Ülkeler", take: [1] },
    h1: { heading: "Yurtdışı Dil Eğitimi, Hangi Dili Öğrenmek İstersiniz?", take: [] },
    // YE_MAIN gövdesi: 0 danışmanlık etiketi · 1-6 program linkleri · 7 İngilizce başlığı · 8-11 İngilizce metni
    // · 12-15 Kaplan rakamları · 16 Almanca sorusu · 17 Almanca girişi
    consulting: { heading: YE_MAIN, take: [0] },
    programLinks: { heading: YE_MAIN, take: [1, 2, 3, 4, 5, 6] },
    enTitle: { heading: YE_MAIN, take: [7] },
    en: { heading: YE_MAIN, take: [8, 9, 10, 11] },
    kaplanFacts: { heading: YE_MAIN, take: [12, 13, 14, 15] },
    deTitle: { heading: YE_MAIN, take: [16] },
    deIntro: { heading: YE_MAIN, take: [17] },
    de: { heading: YE_DE, take: [0, 1, 2, 3, 4] },
    frTitle: { heading: YE_DE, take: [5] },
    frIntro: { heading: YE_DE, take: [6] },
    fr: { heading: YE_FR, take: [0, 1, 2, 3, 4] },
    esTitle: { heading: YE_FR, take: [5] },
    esIntro: { heading: YE_FR, take: [6] },
    es: { heading: YE_ES, take: [0, 1, 2, 3, 4] },
    // 0-5 kısa program listesi (ignored) · 6-29 ülke/şehir çiftleri · 30 özellik gövdesi
    countries: { heading: YE_COUNTRIES, take: Array.from({ length: 24 }, (_, i) => i + 6) },
  },
  features: FEATURES_STANDARD({ heading: YE_COUNTRIES, take: [30] }),
  headingEdits: {
    ...FEATURE_HEADING_EDITS,
    [YE_DE]: "Yetişkinler için Almanca kurslarımız",
    [YE_FR]: "Yetişkinler için Fransızca kurslarımız",
    [YE_ES]: "Yetişkinler için İspanyolca kursları",
    [YE_COUNTRIES]: "Yurtdışı dil eğitiminde en çok tercih edilen ülkeler hangileri?",
  },
  edits: {
    ...FEATURE_BODY_EDITS,
    // Kaynakta başlık iki kez yapışmış + "alman isteyen" yazım hatası.
    "Yetişkinler için İngilizce Dil KurslarıYetişkinler için İngilizce Dil Kurslarıİngilizce konuşulan bir ülkede dil eğitimi alman isteyen öğrenciler için geniş çapta İngilizce dil kursları sunuyoruz. Uluslararası eğitim kurumları tarafından akredite edilmiş Genel İngilizce Kursları, Sınav Hazırlık Kursları, İş İngilizcesi Kursları veya Uzun Dönem kurslar arasından seçim yapabilirsiniz.":
      "İngilizce konuşulan bir ülkede dil eğitimi almak isteyen öğrenciler için geniş çapta İngilizce dil kursları sunuyoruz. Uluslararası eğitim kurumları tarafından akredite edilmiş Genel İngilizce, Sınav Hazırlık, İş İngilizcesi ya da Uzun Dönem kurslar arasından seçim yapabilirsiniz.",
    // "37 dil okulumuz / geliştirdiğimiz K+" Kaplan'a ait — kullanıcı kararı: Kaplan adıyla atfet.
    "Londra, Sydney, New York veya Los Angeles gibi popüler şehirler de dahil olmak üzere, dünya çapına yayılmış 37 dil okulumuzdan birinde İngilizce öğrenin. Tüm kurslar farklı başlangıç tarihleri sunar ve eğitim amaçlarınıza göre farklı sürelerde ayarlanabilir. Özel olarak geliştirdiğimiz K+ eğitim methodu, teknolojiyi işin içine katarak ve birçok inovatif tekniği kullanarak İngilizce'de hızla ilerlemeniz için tasarlanmıştır.":
      "Londra, Sydney, New York ya da Los Angeles gibi popüler şehirler dahil, Kaplan International'ın dünyaya yayılmış 37 dil okulundan birinde İngilizce öğrenebilirsiniz. Kursların farklı başlangıç tarihleri vardır ve süresi eğitim amacınıza göre ayarlanabilir. Kaplan'ın K+ eğitim yöntemi, teknolojiyi ve yenilikçi teknikleri kullanarak İngilizce'de hızla ilerlemeniz için tasarlanmıştır.",
    "Yurtdışı Almanca Dil Eğitimi?": "Yurtdışı Almanca Dil Eğitimi",
    "Yurtdışı Fransızca Dil Eğitimi?": "Yurtdışı Fransızca Dil Eğitimi",
    "Yurtdışı İspanyolca Dil Eğitimi?": "Yurtdışı İspanyolca Dil Eğitimi",
  },
  ignored: [
    ICON_ARTIFACT,
    { line: "Yurtdışı Dil Eğitimi", reason: "şablon üst etiketi (hero ve kapanış); H1 aynı bilgiyi taşıyor" },
    // Ülke listesinin üstündeki kısa program menüsü — aynı programlar "Yurtdışı Eğitim
    // Danışmanlığı" kartlarında (programLinks) zaten basılıyor; ikinci kez basılmaz.
    ...["→ Yurtdışı İngilizce", "→ Yüksek Öğrenim", "→ Sınav Hazırlık", "→ Yaz Okulları", "→ Pathway Programı", "→ Yurtdışı Dil Eğitimi"].map(
      (line) => ({ line, reason: "program menüsünün tekrarı — Danışmanlık kartlarında basılıyor" }),
    ),
    // Sayfa sonundaki "19 dilde eğitim" dil şeridi kaldırıldı (kullanıcı, 2026-10-01: "Yurtdışı Eğitim'de en alttaki dil
    // kısmını kaldır"). Aynı içerik Yabancı Dil sayfasında duruyor.
    ...[H19, "Diğer Dil Eğitim Programları", "Türkiye’de 19 farklı dil eğitimi veren tek dil okuluyuz. Dünya Dilleri Merkezi 2003 yılından bugüne öğrencilerine İngilizce, Almanca, Fransızca, İspanyolca, İtalyanca, Rusça, Çince, Japonca, Flemenkçe, Yunanca, Korece, İsveççe, Portekizce, Hırvatça, Boşnakça, Slovakça, Bulgarca, Arapça ve Farsça dil eğitimleri vermektedir.", "Diğer Yabancı Dil Kursunu Keşfet"].map(
      (line) => ({ line, reason: "dil şeridi Yurtdışı Eğitim sayfasından kaldırıldı (kullanıcı, 2026-10-01)" }),
    ),
    ...LANGUAGE_CARD_BOILERPLATE,
  ],
};

export const ABROAD_HUB_ADDED = {
  factsSource: "Rakamlar Kaplan International'a aittir.",
  countriesLead: "Ülkelere göre dil okullarının yoğunlaştığı şehirler ve eğitim dili.",
  programsLead: "Dil eğitiminden yüksek öğrenime, yaz okullarından üniversiteye geçişe yurtdışı programlarımız.",
  aboutParagraphs: [
    "Okul ve şehir seçiminden kayda, konaklamadan vize ve ulaşıma kadar yurtdışı eğitim planınızı şubelerimizde birlikte hazırlıyoruz.",
  ],
  ctaSub: "Hangi ülke ve okulun size uygun olduğunu ücretsiz danışmanlık görüşmesinde birlikte belirleyelim.",
  /** Ana Sayfa kaynağından (ABROAD_SECTION.panelText) — DDM'nin resmi kayıt ofisi olduğu cümle. */
  leadSourceNote: "data/home.ts ABROAD_SECTION",
  /** Program linki etiketi → hedef (lib/nav.ts). "→" kaynakta, basılırken atılır. */
  programTargets: {
    "→ Yetişkinler için İngilizce Dil Kursları": "/yurtdisi-egitim/yurtdisi-ingilizce-egitimi",
    "→ Yüksek Öğrenim": "/yurtdisi-egitim/yuksek-ogrenim",
    "→ Yurtdışı Sınav Hazırlık": "/yurtdisi-egitim/sinav-hazirlik",
    "→ Yaz Okulları Gençler için Yurtdışı İngilizce Programları": "/yurtdisi-egitim/yaz-okullari",
    "→ Pathway Programı": "/yurtdisi-egitim/pathway-programi",
    "→ Kanada Vancouver’da yaşamak": "/yurtdisi-egitim/yurtdisi-ingilizce-egitimi/kanada-vancouver",
  } as Record<string, string>,
  /** Kısa program açıklamaları — alt sayfaların (P4) kaynak başlıklarından özetlendi. */
  programTexts: {
    "→ Yetişkinler için İngilizce Dil Kursları": "Genel İngilizce, sınav hazırlık, iş İngilizcesi ve uzun dönem kurslar.",
    "→ Yüksek Öğrenim": "Yurtdışında üniversite, lisans ve yüksek lisans seçenekleri için akademik danışmanlık.",
    "→ Yurtdışı Sınav Hazırlık": "Yurtdışında TOEFL, IELTS, SAT, GRE ve GMAT sınavlarına hazırlık kursları.",
    "→ Yaz Okulları Gençler için Yurtdışı İngilizce Programları": "12 yaş ve üzeri gençler için Kaplan Juniors yaz İngilizce kursları.",
    "→ Pathway Programı": "Lise sonrası yurtdışında üniversiteye geçiş için akademik İngilizce ve hazırlık programı.",
    "→ Kanada Vancouver’da yaşamak": "Vancouver'da dil eğitimi, konaklama ve şehir hayatı rehberi.",
  } as Record<string, string>,
  /** Ülke → eğitim dili (genel bilgi) — tablo sütunu. */
  countryLanguage: {
    Kanada: "İngilizce, Fransızca",
    Amerika: "İngilizce",
    İngiltere: "İngilizce",
    İrlanda: "İngilizce",
    Rusya: "Rusça",
    Avustralya: "İngilizce",
    Almanya: "Almanca",
    İspanya: "İspanyolca",
    İtalya: "İtalyanca",
    Fransa: "Fransızca",
    Çin: "Çince",
    "Güney Afrika": "İngilizce",
  } as Record<string, string>,
  guideTitle: "Hangi dili, nerede öğrenmek istersiniz?",
  guideLead: [
    "Yurtdışı dil eğitimi; bir dili o dilin konuşulduğu ülkede, uluslararası öğrencilerle birlikte, genellikle yoğun bir programla öğrenmektir. Aşağıda dile göre okul seçeneklerini, ardından en çok tercih edilen ülkeleri bulabilirsiniz.",
  ],
  faq: [
    {
      question: "Yurtdışı eğitim danışmanlığı ücretli mi?",
      answer: [
        "Hayır. Dünya Dilleri Merkezi, Kaplan International ve ILSC dil okullarının resmi kayıt ofisidir; yurtdışı eğitim sürecinizde ücretsiz danışmanlık dahil konaklama, vize ve ulaşım gibi her konuda destek verir.",
      ],
    },
    {
      question: "Hangi okullarla çalışıyorsunuz?",
      answer: [
        "Kaplan International ve ILSC'nin resmi kayıt ofisiyiz. Almanca ve Fransızca için Kaplan ailesinin bir parçası olan Alpadia, İspanyolca için Enforex okullarına kayıt yapıyoruz.",
      ],
    },
    {
      question: "Hangi ülkelerde dil eğitimi alabilirim?",
      answer: [
        "En çok tercih edilen ülkeler Almanya, İngiltere, Amerika, Kanada ve İrlanda; bunların yanında Malta, İspanya, Fransa, Avustralya, Rusya ve İtalya da sık tercih ediliyor.",
      ],
    },
    {
      question: "Yurtdışında hangi sınavlara hazırlanabilirim?",
      answer: [
        "Almanca'da Goethe-Institut, TELC ve TestDaF; Fransızca'da DELF/DALF ve TCF; İspanyolca'da DELE ve SIELE sınavlarına yurtdışındaki okullarda hazırlanabilirsiniz. İngilizce için okulların sınav hazırlık kursları var.",
      ],
    },
    {
      question: "18 yaş altı için program var mı?",
      answer: ["Evet. 12 yaş ve üzeri gençler için Kaplan Juniors yaz İngilizce kursları ve genç öğrencilere yönelik yurtdışı İngilizce programları bulunuyor."],
    },
  ],
  photo: { src: "/assets/home_page_images/yurtdisi-egitim.jpg", alt: "Yurtdışında kampüste öğrenciler", width: 6000, height: 4000 },
  logos: [
    { src: "/assets/kaplan_int.jpg", alt: "Kaplan International", width: 600, height: 400 },
    { src: "/assets/ilsc_logo.jpg", alt: "ILSC", width: 400, height: 250 },
  ],
};

/* ---------------------------------------------------------------
 * /kurumsal-dil-egitim  (B2B — diğerlerinden bilinçli farklı)
 * ------------------------------------------------------------- */

const KD_MAIN = "Dünya Dilleri Merkezi İ Kurumsal Dil Eğitimi";
const KD_H = "Kurumsal Dil Eğitimi";

export const CORPORATE_HUB: HubDef = {
  path: "/kurumsal-dil-egitim",
  label: "Kurumsal Dil Eğitimi",
  meta: {
    title: "Kurumsal Dil Eğitimi | Dünya Dilleri Merkezi",
    h1: "Kurumsal Dil Eğitimi",
    reasons: [
      "title: kaynak 140+ karakter (anahtar kelime yığını) → 44 karakter",
      "h1: kaynak yalnız 'Kurumsal' — 'Kurumsal Dil Eğitimi' yapıldı",
    ],
  },
  slots: {
    // "Kurumsal" (h1) gövdesiz — başlık metni H1'de düzeltilmiş hâliyle duruyor.
    h1: { heading: "Kurumsal", take: [] },
    // KD_H iki kez geçiyor: 0 giriş · 1 "Farkıyla…" · 2 özellik gövdesi
    lead: { heading: KD_H, take: [0] },
    closing: { heading: KD_H, take: [1] },
    functional: { heading: "İşlevsel Yabancı Dil Ustalığı", take: [0] },
    experience: { heading: "Deneyim ve Şubelerimiz", take: [0] },
    contact: { heading: "Deneyim ve Şubelerimiz", take: [1] },
    // KD_MAIN: 0 alt başlık · 1-7 hizmet maddeleri · 8 alt başlık · 9-13 fırsat maddeleri
    // · 14-16 raporlama · 17 felsefe · 18 "Kurumsal Eğitim"
    serviceTitle: { heading: KD_MAIN, take: [0] },
    services: { heading: KD_MAIN, take: [1, 2, 3, 4, 5, 6, 7] },
    oppTitle: { heading: KD_MAIN, take: [8] },
    opps: { heading: KD_MAIN, take: [9, 10, 11, 12, 13] },
    report: { heading: KD_MAIN, take: [14] },
    roi: { heading: KD_MAIN, take: [15] },
    support: { heading: KD_MAIN, take: [16] },
    philosophy: { heading: KD_MAIN, take: [17] },
  },
  features: FEATURES_STANDARD({ heading: KD_H, take: [2] }),
  headingEdits: { ...FEATURE_HEADING_EDITS, [KD_MAIN]: "Dünya Dilleri Merkezi Kurumsal Dil Eğitimi" },
  edits: {
    ...FEATURE_BODY_EDITS,
    // Bayat şubeler (Suadiye, Beşiktaş; Bağdat Caddesi/Levent/Ümraniye eksik) + "lider konum" iddiası.
    "2003 yılından bu yana İngilizce, Rusça, İspanyolca, Almanca, Fransızca, İtalyanca, Çince ve Türkçe dahil birçok dilde eğitim veriyoruz. İstanbul’da Kadıköy, Suadiye, Beşiktaş ve Ataşehir şubelerimizle kurumlara özel programlar hazırlıyor, lider konumumuzu her geçen gün güçlendiriyoruz.":
      `2003 yılından bu yana İngilizce, Rusça, İspanyolca, Almanca, Fransızca, İtalyanca, Çince ve Türkçe dahil birçok dilde eğitim veriyoruz. İstanbul’da ${BRANCH_NAMES} şubelerimizle kurumlara özel programlar hazırlıyoruz.`,
    // Kaynakta cümle iki satıra bölünmüş ("…ve takvim" / "Uygunluğuna…") — birleştirildi.
    "Her öğrencinin yabancı dil öğrenimindeki kişisel amacına ve takvim":
      "Her öğrencinin yabancı dil öğrenimindeki kişisel amacına ve takvim uygunluğuna önem vererek tasarlanmış Kişiye Özel Çalışma Planı",
    "Uygunluğuna önem vererek tasarlanmış Kişiye Özel Çalışma Planı": "",
    // 2026-10-02: TOEIC yayından kalktı (`data/hiddenPages.ts`).
    "Birebir gerçeğine yakın olarak hazırlanmış ve stratejik ipuçlarıyla birlikte sunulan TOEFL, IELTS, TOEIC, SAT, GRE, GMAT, PTE ve YDS testleri.":
      "Birebir gerçeğine yakın olarak hazırlanmış ve stratejik ipuçlarıyla birlikte sunulan TOEFL, IELTS, SAT, GRE, GMAT, PTE ve YDS testleri.",
    "Öğrencilerin yabancı dilde Yazma, Konuşma, Okuma ve Dinleme gibi becerilerini çok sayıda alıştırma yaparak geliştirebilecekleri beceri geliştirme merkezi .":
      "Öğrencilerin yabancı dilde yazma, konuşma, okuma ve dinleme becerilerini çok sayıda alıştırma yaparak geliştirebilecekleri beceri geliştirme merkezi.",
    // "Türkiye'nin En Çok Tercih Edilen Dil Okuluyuz" doğrulanamayan üstünlük iddiası.
    "Dünya Dilleri Merkezi Farkıyla Kurumsal Dil Eğitimi. Kurumsal Dil Eğitiminde Türkiye'nin En Çok Tercih Edilen Dil Okuluyuz Dil eğitiminde ihtiyaçlarınıza özel çözümler sunuyoruz.":
      "Dünya Dilleri Merkezi farkıyla kurumsal dil eğitimi: dil eğitiminde kurumunuzun ihtiyaçlarına özel çözümler sunuyoruz.",
    "Dünya Dilleri Merkezi, çalışanlarınızın yabancı dil öğrenimindeki kişisel gelişimlerini tüm ayrıntılarıyla görebileceğiniz Yönetici Takip Raporunu hiç bir ek ücret talep etmeksizin hizmetinize sunar. Kapsamlı veri analizi değerlendirme sistemiyle desteklenmiş olan bu rapor aracılığıyla çalışanlarınızın dil öğrenim sürecindeki kişisel raporlarını düzenli aralıklarla takip edebilirsiniz.":
      "Dünya Dilleri Merkezi, çalışanlarınızın yabancı dil öğrenimindeki gelişimini tüm ayrıntılarıyla görebileceğiniz Yönetici Takip Raporu'nu ek ücret talep etmeden sunar. Veri analizine dayanan bu raporla çalışanlarınızın dil öğrenim sürecini düzenli aralıklarla takip edebilirsiniz.",
  },
  ignored: [{ line: "Kurumsal Eğitim", reason: "şablon üst etiketi (bir sonraki başlığın kicker'ı)" }],
};

export const CORPORATE_HUB_ADDED = {
  steps: [
    {
      title: "İhtiyaç analizi",
      body: "Kurumunuzun hangi dilde, hangi iş görevleri için dil becerisine ihtiyaç duyduğunu birlikte belirliyoruz.",
    },
    {
      title: "Seviye tespiti",
      body: "Çalışanlarınızın mevcut dil seviyesini ölçüyor, grupları ve birebir programları buna göre planlıyoruz.",
    },
    {
      title: "Kişiye özel program",
      body: "Kurumunuzun hedeflerine ve çalışanlarınızın takvimine göre grup, birebir ya da online programı kuruyoruz.",
    },
    // Gövde kaynaktan: Yönetici Takip Raporu satırı (slots.report).
    { title: "Raporlama ve takip", slot: "report" },
  ],
  stepsTitle: "Kurumsal dil eğitimi nasıl işler?",
  stepsLead: "İlk görüşmeden düzenli raporlamaya, kurumunuza özel programın dört adımı.",
  programsTitle: "Kurumlara özel programlar",
  programsLead: "Kurumsal dil eğitiminin yanında şirketlerin sık tercih ettiği programlar.",
  /** Metinler ilgili sayfaların kaynağından (Business English: /diger-program kaydı). */
  programs: [
    { title: "Business English", href: "/diger-program/business-english", text: "İş İngilizcesinin sözcüklerine, dil yapısına ve şirketler arası yazışmalara odaklanan program." },
    { title: "Exclusive For Pegasus Pilots", href: "/kurumsal-dil-egitim/turkish-course-pegasus-pilots", text: "Pegasus pilotlarına özel Türkçe kursu." },
    { title: "Özel Dersler", href: "/diger-program/ozel-dersler", text: "Yöneticiler ve çalışanlar için, tercihe göre iş yerinde verilen birebir dersler." },
    { title: "Sınav Hazırlık Kursları", href: "/sinav-hazirlik-egitimleri", text: "TOEFL, IELTS, GRE, GMAT, PTE ve YDS sınavlarına hazırlık." },
  ],
  faq: [
    {
      question: "Hangi dillerde kurumsal eğitim veriyorsunuz?",
      answer: ["İngilizce, Rusça, İspanyolca, Almanca, Fransızca, İtalyanca, Çince ve Türkçe dahil birçok dilde."],
    },
    {
      question: "Eğitimler yüz yüze mi, online mı?",
      answer: [
        "İkisi de mümkün. Konuşma, yazma ve kelime becerisi geliştirme sınıfları yüz yüze ya da online yapılabilir; program kurumunuzun takvimine göre planlanır.",
      ],
    },
    {
      question: "Çalışanlarımızın gelişimini nasıl takip edebiliriz?",
      answer: [
        "Yönetici Takip Raporu ile çalışanlarınızın gelişimini ayrıntılı olarak, düzenli aralıklarla görebilirsiniz; bu rapor için ek ücret alınmaz. Ayrıca performans değerlendirme sistemi ve kişisel yönlendirme sistemi ile öğrencinin gelişimi öğretmenler tarafından izlenir.",
      ],
    },
    {
      question: "Destek süreci nasıl işliyor?",
      answer: [
        "Çözüm ortağınız olduğumuz ilk hafta tam zamanlı müşteri desteği veriyoruz; sonraki haftalarda ayda bir kurum ziyareti, iki haftada bir öğrenci-danışman telefon görüşmesi ve düzenli e-posta değerlendirme raporlarıyla süreci birlikte takip ediyoruz.",
      ],
    },
    {
      question: "Sınav hazırlığı da kurumsal programa dahil edilebilir mi?",
      answer: [
        "Evet. TOEFL, IELTS, SAT, GRE, GMAT, PTE ve YDS için gerçeğine yakın hazırlanmış deneme testleri ve strateji çalışmaları programa eklenebilir.",
      ],
    },
  ],
  photo: { src: "/assets/home_page_images/is-ingilizcesi.jpg", alt: "Toplantı odasında iş İngilizcesi eğitimi", width: 6720, height: 4480 },
};

/** Üretilen hub'lar — `lib/pageRegistry.ts` (sitemap + menü doğrulaması) buradan okur. */
export const HUBS: HubDef[] = [EXAM_HUB, LANGUAGE_HUB, PRIVATE_HUB, OTHER_PROGRAMS_HUB, ENGLISH_HUB, ABROAD_HUB, CORPORATE_HUB];

/**
 * 7 kategori hub'ının dizini — "İlgili sayfalar" bloğu kardeş hub'lara buradan
 * link verir. Üretilmemiş olanlar `isProducedPage()` süzgecinde düşer.
 */
export const HUB_DIRECTORY: { label: string; href: string }[] = [
  { label: "Sınav Hazırlık Kursları", href: "/sinav-hazirlik-egitimleri" },
  { label: "Yabancı Dil Kursları", href: "/yabanci-dil" },
  { label: "İngilizce Kursları", href: "/ingilizce-kurslari" },
  { label: "Özel Dersler", href: "/diger-program/ozel-dersler" },
  { label: "Diğer Programlar", href: "/diger-program" },
  { label: "Yurtdışı Eğitim", href: "/yurtdisi-egitim" },
  { label: "Kurumsal Dil Eğitimi", href: "/kurumsal-dil-egitim" },
];
