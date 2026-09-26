/**
 * P4 — "{Sınav} Nedir?" rehber sayfaları (Zengin İçerik alt türü 3, 2026-09-26).
 *
 * İçerik kuralı (kullanıcı, 2026-09-26): bu sayfaların metni FİRMA bilgisi değil,
 * sınav hakkında GENEL bilgidir → P2 kuralı: kaynak başlıkları silinmez, eskimiş
 * olgular resmi kaynaktan düzeltilir, her düzeltme `edits` (orijinal satır → yeni)
 * olarak izlenir. Firmaya ait cümle varsa DOKUNULMAZ (yalnız yazım).
 * Tasarım (kullanıcı, 2026-09-26): sınav ana sayfalarından ayrı, göz gezdirilerek
 * okunur — kısa cevap + "bir bakışta" kartı, soru başlıklı bölümler, madde ve tablo.
 *
 * Gövde metni burada TAŞINMAZ: kaynak paragraflar `{ heading, take }` ile
 * çağrılır (`lib/guideContent.ts` → `SectionResolver` + `assertCoverage`).
 */

import type { IconName } from "@/components/graphics/icons";
import type { SlotRef } from "@/data/privateLessonsShared";
import { UNIVERSITY_INDEX } from "@/data/universities";

const SH = "/sinav-hazirlik-egitimleri";

/**
 * Kaynak paragraf(lar), kaynak paragrafın tek cümlesi ya da cümle aralığı (`sentence`: 0'dan;
 * `[a, b]` a..b dahil, `b` < 0 sondan sayar; `edits` bölmeden önce uygulanır) ya da eklenen metin.
 */
export type GuideText = { src: SlotRef } | { src: SlotRef; sentence: number | [number, number] } | { added: string };

export type GuideBlock =
  /** Kısa paragraf(lar). */
  | { kind: "text"; text: GuideText }
  /** Madde listesi — kaynak satırları ya da eklenen maddeler. */
  | { kind: "points"; items: { src: SlotRef } | { added: string[] } }
  /** Sınav bölümleri: ikon + ad + ne ölçer + süre/madde. */
  | { kind: "parts"; items: { icon: IconName; name: string; text: string; meta: string }[]; note: string | null }
  /**
   * Küçük tablo (karşılaştırma, puan eşlemesi); `title` tablonun üstünde küçük başlık.
   * `rows: { src }` → satırlar kaynak satırlarından gelir (`edits` sonrası " | " ile hücrelere bölünür).
   * `rows: { src, cells }` → kaynakta her hücre ayrı satırsa (eski HTML tablosu), ardışık `cells` satır bir tablo satırı.
   */
  | { kind: "table"; title?: string; head: string[]; rows: string[][] | { src: SlotRef; cells?: number }; note: string | null }
  /** İç bağlantı çipleri — üretilmemiş hedef düz metin kalır (`linkIfProduced`, GuidePage). */
  | { kind: "links"; items: { label: string; href: string }[] }
  /** Kaynaktaki link satırları: etiket kaynak satırı (`edits` sonrası), hedef orijinal satıra göre `hrefs`ten. */
  | { kind: "srcLinks"; src: SlotRef; hrefs: Record<string, string> };

export type GuideSection = {
  id: string;
  /** Kaynak başlığı (birebir, `headingEdits` uygulanır) ya da eklenen soru başlığı. */
  title: { source: string } | { added: string };
  /** Bölümün tek cümlelik cevabı — göz gezdiren okur için kalın, üstte. */
  answer: GuideText;
  blocks: GuideBlock[];
};

export type ExamGuideDef = {
  path: string;
  /** Kırıntı etiketi. */
  label: string;
  /** Sınavın kısa adı ("TOEFL") — CTA ve ilgili sayfa etiketleri. */
  exam: string;
  meta: { title?: string; description?: string; reasons: string[] };
  hero: {
    /** Kısa cevap: sınavın tanımı (kaynak giriş paragrafı). */
    answer: SlotRef;
    /** "Bir bakışta" — genel bilgi, kaynağı `sources`ta. */
    facts: { label: string; value: string }[];
  };
  sections: GuideSection[];
  /** Resmi kaynaklar (düz metin; dış link basılmaz). */
  sources: string[];
  /** Genel bilginin son gözden geçirildiği gün (sayfada gösterilir). */
  updated: string;
  edits?: Record<string, string>;
  headingEdits?: Record<string, string>;
  ignored: { line: string; reason: string }[];
};

/** TOEFL / IELTS / PTE karşılaştırma satırları — üç İngilizce rehberde ortak (doğrulanmış olgular). */
const EN_COMPARE_ROWS = {
  owner: ["ETS", "British Council, IDP, Cambridge", "Pearson"],
  parts: ["4 bölüm", "4 bölüm; konuşma yüz yüze", "3 bölüm"],
  time: ["Yaklaşık 2 saat", "2 saat 45 dk", "Yaklaşık 2 saat"],
  score: ["1–6 bant", "0–9 bant", "10–90"],
  validity: ["2 yıl", "2 yıl (önerilen)", "2 yıl"],
  home: ["Var (Home Edition)", "Yalnız Academic (IELTS Online)", "Yok"],
};
const EN_COMPARE_LABELS = [
  ["Düzenleyen", "owner"],
  ["Bölümler", "parts"],
  ["Süre", "time"],
  ["Puan", "score"],
  ["Geçerlilik", "validity"],
  ["Evden sınav", "home"],
] as const;

/* ---------------------------------------------------------------
 * TOEFL — ETS: ets.org/toefl/test-takers/ibt/about/content.html,
 * …/scores/understand-scores.html, …/scores/get-scores.html, …/scores/send-scores.html,
 * …/institutions/ibt/score-scale-update.html (bant ↔ CEFR tablosu, 0–120 Ocak 2028'e kadar),
 * ets.org/toefl.html (13.500+ kurum, 160+ ülke, 40M+ aday), 2026-27 TOEFL iBT Bulletin
 * (MyBest, 3 günde bir sınav). Doğrulama 2026-09-26. IELTS ve PTE satırları:
 * `data/privateLessonsExam.ts`teki doğrulanmış olgularla aynı.
 * ------------------------------------------------------------- */
const TOEFL_H1 = "TOEFL Nedir?‏";
const TOEFL_WHO = "TOEFL Sınavına Kimler Girmelidir?";

const TOEFL: ExamGuideDef = {
  path: `${SH}/toefl-kursu/toefl-nedir`,
  label: "TOEFL Nedir?",
  exam: "TOEFL",
  meta: {
    description:
      "TOEFL nedir, hangi bölümlerden oluşur, puanı nasıl verilir, kaç yıl geçerlidir? Ocak 2026 formatıyla TOEFL iBT için kısa ve güncel rehber.",
    reasons: ["description: kaynak 163 karakter ve bayat şube listesi (4 şube) — içeriği özetleyen yeni açıklama"],
  },
  hero: {
    answer: { heading: TOEFL_H1, take: [0] },
    facts: [
      { label: "Düzenleyen", value: "ETS (Educational Testing Service)" },
      { label: "Bölümler", value: "Okuma, dinleme, yazma, konuşma" },
      { label: "Süre", value: "Yaklaşık 2 saat" },
      { label: "Puan", value: "1–6 bant (eski ölçekte 0–120)" },
      { label: "Geçerlilik", value: "2 yıl" },
      { label: "Nerede", value: "Test merkezinde ya da evden" },
    ],
  },
  sections: [
    {
      id: "neyi-olcer",
      title: { added: "TOEFL'ı kim düzenler, neyi ölçer?" },
      answer: { src: { heading: TOEFL_H1, take: [1] } },
      blocks: [
        { kind: "text", text: { src: { heading: TOEFL_H1, take: [2] } } },
        { kind: "text", text: { src: { heading: TOEFL_H1, take: [3] } } },
        { kind: "points", items: { added: ["ETS'ye göre TOEFL'ı 160'tan fazla ülkede 13.500'den fazla kurum kabul ediyor."] } },
      ],
    },
    {
      id: "bolumler",
      title: { added: "TOEFL iBT hangi bölümlerden oluşur?" },
      answer: {
        added: "Dört bölüm var. ETS sınav için yaklaşık 2 saat ayırmanızı öneriyor; bölümlerin net süresi yaklaşık 90 dakika, yönergeler buna dahil değil.",
      },
      blocks: [
        {
          kind: "parts",
          items: [
            { icon: "okuma", name: "Okuma", text: "Eksik kelimeyi tamamlama, günlük hayattan metinler, akademik paragraflar", meta: "Yaklaşık 30 dk, 50 madde" },
            { icon: "dinleme", name: "Dinleme", text: "Kısa yanıtlar, konuşmalar, duyurular, akademik anlatımlar", meta: "Yaklaşık 29 dk, 47 madde" },
            { icon: "yazma", name: "Yazma", text: "Cümle kurma, e-posta yazma, akademik tartışmaya katılma", meta: "Yaklaşık 23 dk, 12 madde" },
            { icon: "konusma", name: "Konuşma", text: "Dinleyip tekrar etme ve sözlü mülakat", meta: "Yaklaşık 8 dk, 11 madde" },
          ],
          note: "Okuma ve dinleme bölümleri adayın cevaplarına göre uyarlandığı için süre ve madde sayısı biraz değişebilir.",
        },
      ],
    },
    {
      id: "puan",
      title: { added: "TOEFL puanı nasıl verilir?" },
      answer: {
        added:
          "21 Ocak 2026'dan beri puan 1–6 arası bantla, yarım bant aralıklarla verilir; eski 0–120 ölçeğindeki karşılığı da sonuç belgesinde yazar.",
      },
      blocks: [
        {
          kind: "table",
          // ETS "Comparing TOEFL Scores Across the 1 – 6 and 0 – 120 Scales" (score-scale-update.html):
          // ETS alt sınırı verir ("95+"), üst sınır bir sonraki bandın bir altıdır ("5 = 95 … 106").
          title: "Yeni puan (1–6) ve CEFR",
          head: ["Yeni puan", "CEFR seviyesi"],
          rows: [
            ["6", "C2"],
            ["5 – 5,5", "C1"],
            ["4 – 4,5", "B2"],
            ["3 – 3,5", "B1"],
            ["2 – 2,5", "A2"],
            ["1 – 1,5", "A1"],
          ],
          note: "Aynı eşleme hem toplam puan hem her bölüm için geçerlidir.",
        },
        {
          kind: "table",
          title: "Eski puan (0–120) karşılıkları",
          head: ["Yeni puan", "Eski toplam (0–120)", "Okuma (0–30)", "Dinleme (0–30)", "Yazma (0–30)", "Konuşma (0–30)"],
          rows: [
            ["6", "114–120", "29–30", "28–30", "29–30", "28–30"],
            ["5,5", "107–113", "27–28", "26–27", "27–28", "27"],
            ["5", "95–106", "24–26", "22–25", "24–26", "25–26"],
            ["4,5", "86–94", "22–23", "20–21", "21–23", "23–24"],
            ["4", "72–85", "18–21", "17–19", "17–20", "20–22"],
            ["3,5", "58–71", "12–17", "13–16", "15–16", "18–19"],
            ["3", "44–57", "6–11", "9–12", "13–14", "16–17"],
            ["2,5", "34–43", "4–5", "6–8", "11–12", "13–15"],
            ["2", "24–33", "3", "4–5", "7–10", "10–12"],
            ["1,5", "12–23", "2", "2–3", "3–6", "5–9"],
            ["1", "0–11", "0–1", "0–1", "0–2", "0–4"],
          ],
          note: "Eski toplam, dört bölüm puanının toplamıdır; aynı toplam farklı bölüm puanlarıyla oluşabilir (ETS).",
        },
        {
          kind: "points",
          items: {
            added: [
              "Ocak 2028'e kadar sonuç belgesinde eski 0–120 ölçeğindeki karşılığı da yer alır.",
              "Kurumunuz puanı eski ölçekle istiyorsa ETS'nin önerdiği karşılıklar: 100 → 5, 90 → 4,5, 80 → 4, 70 → 3,5.",
              "Geçme ya da kalma yoktur; her üniversite ya da kurum kendi alt puanını belirler.",
              "Son 2 yıldaki sınavlarınızdan her bölümün en iyi puanı “MyBest” olarak ayrıca raporlanır.",
            ],
          },
        },
      ],
    },
    {
      id: "nerede",
      title: { added: "TOEFL'a nerede ve nasıl girilir?" },
      answer: { added: "Test merkezinde bilgisayarla ya da canlı gözetmen eşliğinde evden (TOEFL iBT Home Edition)." },
      blocks: [
        {
          kind: "points",
          items: {
            added: [
              "Kayıt ve tarih seçimi ETS'nin sitesinde (ets.org/toefl) açtığınız hesaptan yapılır.",
              "Evdeki sınav, merkezdekiyle aynı sınavdır ve aynı şekilde puanlanır.",
              "Evden sınav için ETS'nin donanım ve oda şartlarını karşılamanız gerekir: kamera, mikrofon ve tek başınıza olduğunuz bir oda.",
              "Sonuçlar sınavdan yaklaşık 3 gün sonra ETS hesabınızda görünür.",
              "Sınava girme sayısında sınır yok; ancak 3 gün içinde bir kereden fazla girilemez.",
            ],
          },
        },
      ],
    },
    {
      id: "gecerlilik",
      title: { added: "TOEFL sonucu kaç yıl geçerli?" },
      answer: { added: "Sınav tarihinden itibaren 2 yıl." },
      blocks: [
        {
          kind: "points",
          items: {
            added: [
              "Sınav ücretine 4 kuruma ücretsiz sonuç gönderimi dahildir.",
              "Başvurduğunuz kurum daha yeni tarihli bir sonuç isteyebilir; sınav tarihinizi son başvuru gününe göre planlayın.",
            ],
          },
        },
      ],
    },
    {
      id: "kimler",
      title: { source: TOEFL_WHO },
      answer: { added: "Akademik ya da resmî bir İngilizce belgesine ihtiyaç duyan herkes. En sık girenler:" },
      blocks: [{ kind: "points", items: { src: { heading: TOEFL_WHO } } }],
    },
    {
      id: "karsilastirma",
      title: { added: "TOEFL mı, IELTS mi, PTE mi?" },
      answer: { added: "Üçü de İngilizce yeterliğini belgeler; hangisine gireceğinizi başvurduğunuz kurumun kabul ettiği sınav belirler." },
      blocks: [
        {
          kind: "table",
          head: ["", "TOEFL iBT", "IELTS", "PTE Academic"],
          rows: EN_COMPARE_LABELS.map(([label, key]) => [label, ...EN_COMPARE_ROWS[key]]),
          note: null,
        },
      ],
    },
  ],
  sources: [
    "ETS — TOEFL iBT resmi sayfaları (ets.org/toefl)",
    "IELTS resmi sayfası (ielts.org)",
    "Pearson — PTE Academic (pearsonpte.com)",
  ],
  updated: "2026-09-26",
  edits: {
    "Merkezi Amerika'da bulanan ETS tarafından düzenli bir şekilde dünyanın pek çok ülkesinde gerçekleştirilir. TOEFL iBT sınavı, İngilizce'yi üniversite seviyesinde kullanma ve anlama yeteneğinizi ölçer.":
      "TOEFL, merkezi ABD'de bulunan ETS tarafından dünyanın pek çok ülkesinde düzenli olarak yapılır. TOEFL iBT, İngilizceyi üniversite düzeyinde kullanma ve anlama becerinizi ölçer.",
    "Okuma, Yazma, Konuşma ve Dinleme becerilerinizi akademik görevleri yerine getirirken ne kadar iyi bir şekilde birleştirdiğinizi de değerlendirir.":
      "Okuma, yazma, konuşma ve dinleme becerilerinizi akademik görevlerde ne kadar iyi birleştirdiğinizi de değerlendirir.",
    // ETS: "English-language learning program admissions and exit" — yanlış çeviri düzeltildi.
    // ETS (ets.org/toefl.html): "40M+ test takers" — kaynaktaki 30 milyon eskimiş.
    "Dünya çapında 30 milyondan fazla kişi, İngilizce dil yeterliğini göstermek için TOEFL sınavına girmiştir. Ortalama İngilizce beceri seviyesi Orta ile İleri arasında değişir.":
      "Dünya çapında 40 milyondan fazla kişi, İngilizce yeterliğini göstermek için TOEFL sınavına girmiştir.",
    "İngilizce dili öğrenim programına kabul edilenler ve edilmeyenler":
      "İngilizce dil programlarına kabul ya da bu programlardan çıkış için yeterlik belgeleyecek olanlar",
    "İlerlemelerini izlemek isteyen İngilizce dili öğrencileri": "İlerlemesini ölçmek isteyen İngilizce öğrencileri",
    "Vize başvurusu yapan öğrenciler ve işçiler": "Vize başvurusu yapan öğrenciler ve çalışanlar",
  },
  headingEdits: {
    // Kaynak h1'in sonunda görünmez sağdan-sola işareti (U+200F) var.
    [TOEFL_H1]: "TOEFL Nedir?",
  },
  ignored: [],
};


/* ---------------------------------------------------------------
 * IELTS — ielts.org: why-choose-ielts (13.500+ kurum), why-accept-ielts (yılda 3M+ sınav),
 * your-results/fast-test-results-and-sharing (sonuç süreleri), news "updates-to-ielts-test-delivery"
 * (05.03.2026: kâğıt sınav 2026 ortasından itibaren kalkıyor), updates-to-ielts-writing-test-delivery-mode
 * (Writing on Paper), booking-your-test/one-skill-retake, ielts-and-the-cefr (grafik; 5, 6,5, 8 sınır
 * bant), ielts-scoring-in-detail (bant adları, 2 yıl önerisi), test-types (UKVI, Life Skills).
 * Doğrulama 2026-09-26. Format kartları `data/privateLessonsExam.ts` ile aynı.
 * ------------------------------------------------------------- */
const IELTS_H1 = "IELTS Nedir?";
const IELTS_CENTERS = "IELTS Sınav Merkezleri";
const IELTS_TYPES = "İki Sınav Seçeneği";
const IELTS_SCALE = "IELTS 9 Puan Ölçeği";

const IELTS: ExamGuideDef = {
  path: `${SH}/ielts-kursu/ielts-nedir`,
  label: "IELTS Nedir?",
  exam: "IELTS",
  meta: {
    description:
      "IELTS nedir, Academic ile General Training farkı ne, puan nasıl verilir, sonuç kaç yıl geçerli? 2026 değişiklikleriyle kısa ve güncel IELTS rehberi.",
    reasons: ["description: kaynak 167 karakter ve bayat şube listesi (4 şube) — içeriği özetleyen yeni açıklama"],
  },
  hero: {
    answer: { heading: IELTS_H1, take: [0] },
    facts: [
      { label: "Düzenleyen", value: "British Council, IDP, Cambridge" },
      { label: "Modüller", value: "Academic ve General Training" },
      { label: "Bölümler", value: "Dinleme, okuma, yazma, konuşma" },
      { label: "Süre", value: "2 saat 45 dk" },
      { label: "Puan", value: "0–9 bant" },
      { label: "Geçerlilik", value: "2 yıl (önerilen)" },
    ],
  },
  sections: [
    {
      id: "neyi-olcer",
      title: { added: "IELTS neyi ölçer?" },
      answer: { src: { heading: IELTS_H1, take: [1] } },
      blocks: [
        {
          kind: "points",
          items: {
            added: [
              "IELTS'i dünyada 13.500'den fazla kurum kabul ediyor.",
              "Her yıl 3 milyondan fazla IELTS sınavı yapılıyor.",
            ],
          },
        },
      ],
    },
    {
      id: "moduller",
      title: { source: IELTS_TYPES },
      answer: { src: { heading: IELTS_TYPES, take: [0] } },
      blocks: [
        {
          kind: "table",
          head: ["", "Academic", "General Training"],
          rows: [
            ["Kimler için", "Üniversite başvurusu, mesleki kayıt", "Göç ve iş başvuruları"],
            ["Okuma", "Akademik metinler", "Günlük hayat ve iş metinleri"],
            ["Yazma", "Grafik ya da diyagram yorumu + deneme", "Mektup + deneme"],
            ["Dinleme ve konuşma", "İki modülde aynı", "İki modülde aynı"],
          ],
          note: null,
        },
        {
          kind: "points",
          items: {
            added: [
              "IELTS for UKVI: İngiltere'de yaşamak, çalışmak ya da okumak için vize başvurusunda kabul edilen sürüm.",
              "IELTS for UKVI Life Skills: yalnız konuşma ve dinlemeyi ölçen, A1, A2 ve B1 düzeyinde yapılan vize sınavı.",
            ],
          },
        },
      ],
    },
    {
      id: "bolumler",
      title: { added: "IELTS hangi bölümlerden oluşur?" },
      answer: { src: { heading: IELTS_TYPES, take: [1] } },
      blocks: [
        {
          kind: "parts",
          items: [
            { icon: "dinleme", name: "Dinleme", text: "Dört bölümde konuşma ve anlatımları dinleyip soruları yanıtlama", meta: "Yaklaşık 30 dk, 40 soru" },
            { icon: "okuma", name: "Okuma", text: "Academic'te akademik metinler, General Training'de günlük hayat ve iş metinleri", meta: "60 dk, 40 soru" },
            { icon: "yazma", name: "Yazma", text: "Grafik ya da diyagram yorumu veya mektup, ardından bir deneme", meta: "60 dk, 2 görev" },
            { icon: "konusma", name: "Konuşma", text: "Sınav görevlisiyle yüz yüze, üç bölümlük görüşme", meta: "11–14 dk" },
          ],
          note: "Konuşma bölümü diğer bölümlerden bir hafta önce ya da sonra da yapılabilir.",
        },
      ],
    },
    {
      id: "puan",
      title: { source: IELTS_SCALE },
      answer: { src: { heading: IELTS_SCALE, take: [0] } },
      blocks: [
        { kind: "text", text: { src: { heading: IELTS_SCALE, take: [1] } } },
        { kind: "text", text: { src: { heading: IELTS_TYPES, take: [4] } } },
        {
          kind: "table",
          title: "Bantlar ve CEFR karşılıkları",
          head: ["Bant", "Beceri düzeyi", "CEFR"],
          rows: [
            ["9", "Uzman", "C2"],
            ["8", "Çok iyi", "C1 (8,5 ve üzeri C2)"],
            ["7", "İyi", "C1"],
            ["6", "Yeterli", "B2 (6,5 C1 sınırında)"],
            ["5", "Orta", "B1 (B2 sınırında)"],
            ["4", "Sınırlı", "B1"],
            ["3 – 1", "Çok sınırlı, kesintili, dil kullanıcısı değil", "—"],
            ["0", "Sınava girmedi", "—"],
          ],
          note: "Beceri düzeyi adları ve CEFR eşlemesi IELTS'in resmi sayfalarından; 5, 6,5 ve 8 iki seviyenin sınırındaki bantlardır.",
        },
      ],
    },
    {
      id: "nerede",
      title: { source: IELTS_CENTERS },
      answer: { src: { heading: IELTS_CENTERS, take: [0] } },
      blocks: [
        {
          kind: "points",
          items: {
            added: [
              "Sınav bilgisayarda yapılır. Kâğıt sınav 2026 ortasından itibaren kaldırılıyor; takvim ülkeye göre değişiyor.",
              "Yazmayı elle yapmak isteyenler için “Writing on Paper” seçeneği var: diğer bölümler bilgisayarda, yazma kâğıtta (UKVI için sunulmuyor).",
              "Academic modülü evden, canlı gözetmenli “IELTS Online” olarak da alınabilir.",
              "Sonuçlar bilgisayarlı sınavda genellikle 1–2 günde, Writing on Paper'da 5 gün içinde, IELTS Online'da 6–8 günde açıklanır.",
              "One Skill Retake: bilgisayarlı sınava girdiyseniz tek bir bölümü 60 gün içinde bir kez yeniden alabilirsiniz.",
            ],
          },
        },
      ],
    },
    {
      id: "gecerlilik",
      title: { added: "IELTS sonucu kaç yıl geçerli?" },
      answer: { added: "IELTS, sonuçların sınavdan sonra 2 yıl geçerli sayılmasını öneriyor; bazı kurumlar daha uzun süre kabul edebilir." },
      blocks: [],
    },
    {
      id: "karsilastirma",
      title: { added: "IELTS mi, TOEFL mı, PTE mi?" },
      answer: { added: "Üçü de İngilizce yeterliğini belgeler; hangisine gireceğinizi başvurduğunuz kurumun kabul ettiği sınav belirler." },
      blocks: [
        {
          kind: "table",
          head: ["", "IELTS", "TOEFL iBT", "PTE Academic"],
          rows: EN_COMPARE_LABELS.map(([label, key]) => {
            const [toefl, ielts, pte] = EN_COMPARE_ROWS[key];
            return [label, ielts, toefl, pte];
          }),
          note: null,
        },
      ],
    },
  ],
  sources: [
    "IELTS resmi sayfaları (ielts.org): test türleri, sonuçlar, CEFR, 2026 sınav şekli duyurusu",
    "ETS — TOEFL iBT (ets.org/toefl)",
    "Pearson — PTE Academic (pearsonpte.com)",
  ],
  updated: "2026-09-26",
  edits: {
    "IELTS, İngilizce’nin kullanıldığı ülkelerde eğitim almak ya da çalışmak isteyenlerin İngilizce dil seviyelerini değerlendirmek için yapılan bir sınavdır.":
      "IELTS, İngilizcenin kullanıldığı ülkelerde eğitim almak ya da çalışmak isteyenlerin İngilizce seviyesini ölçen bir sınavdır.",
    "Dil becerilerini adil, doğru ve amaca uygun bir şekilde, dünya çapında kabul edilmiş standartlar çerçevesinde değerlendirir ve başlangıç seviyesinden en ileri seviyeye kadar tüm seviyelerini kapsar.":
      "Dinleme, okuma, yazma ve konuşma becerilerini dünya çapında kabul edilmiş standartlara göre değerlendirir; başlangıçtan en ileri düzeye kadar tüm seviyeleri kapsar.",
    // Kâğıt sınav 2026'da kalkıyor, kayıt merkezlerin sitesinden: "online kayıt" doğru, tarih bilgisi korunur.
    "IELTS sınavına Türkiye'de British Council ve IDP sınav merkezlerine online kayıt başvurusu yaparak açıklanan tarihler içerisinde girebilirsiniz. Sınav düzenleyen merkezlerin hangi illerde ve hangi aralıklarda sınav düzenlediğini takip edebilirsiniz.":
      "Türkiye'de IELTS'e British Council ve IDP sınav merkezlerine online kayıt yaptırarak, merkezlerin açıkladığı tarihlerde girebilirsiniz. Hangi ilde hangi tarihlerde sınav olduğunu merkezlerin sitelerinden takip edebilirsiniz.",
    "IELTS, Akademik ve Genel olarak iki çeşit sınav formatındadır. Adaylar, eğitim ve profesyonel hedeflerine ve kendilerinden istenilen vize taleplerine göre hangi sınava gireceklerine karar verirler.":
      "IELTS'in iki modülü var: Academic ve General Training. Hangisine gireceğinize eğitim ya da iş hedefiniz ve vize başvurunuzun şartları karar verir.",
    "Her iki sınav da konuşma, okuma, yazma ve dinleme becerilerini değerlendiren dört bölümden oluşur.":
      "Her iki modül de dinleme, okuma, yazma ve konuşma olmak üzere dört bölümden oluşur; sınav toplam 2 saat 45 dakika sürer.",
    "IELTS sınavında kalma ya da geçme yoktur. Bunun yerine tüm sonuçlar, karşı taraftaki tabloda gösterildiği gibi 9 puan ölçeğinde değerlendirilir. Bu değerlendirmede 1 en düşük ve 9 en yüksek puandır.":
      "IELTS'te geçme ya da kalma yoktur; sonuçlar 0–9 arası bantlarla, yarım bant aralıklarla verilir. 9 en yüksek banttır.",
    "Adaylara genel bir not verilmesinin yanı sıra, girdikleri Dinleme, Okuma, Yazma ve Konuşma bölümlerinin her biri için not verilecektir.":
      "Adaylar genel bandın yanında dinleme, okuma, yazma ve konuşma bölümlerinin her biri için ayrı bant alır.",
    "Bu notların ortalaması genel sınav notunu oluşturur. Bileşenlerin her biri, belirli bir beceri üzerine yoğunlaşmak için özenle tasarlanmıştır.":
      "Genel bant, dört bölüm bandının ortalamasıdır.",
  },
  ignored: [
    { line: "Dört Dil Becerisini Değerlendiren Bir Sınav", reason: "kaynakta kalın ara başlık (headings'te yok); içeriği \"IELTS 9 Puan Ölçeği\" bölümüne taşındı" },
    {
      line: "IELTS, dört dil becerisini (dinleme, okuma, yazma ve konuşma) kapsayan görev tabanlı bir sınavdır. IELTS adayları, sınavın dört bileşeni için ayrı not alırlar.",
      reason: "aynı bilgi \"Adaylar genel bandın yanında…\" satırında (kaynaktaki tekrar)",
    },
  ],
};

/* ---------------------------------------------------------------
 * TOEIC — ETS: TOEIC L&R Examinee Handbook (©2025; bölüm/soru dağılımı, 7 milyon sınav,
 * 14.000+ kurum 160+ ülke, sonuç belgesi 7–21 gün, 2 yıl), ets.org/toeic.html,
 * eu.ets.org "mapping-cefr-toeic-listening-reading-test.pdf" (CEFR alt puanları),
 * etsglobal.org score-validity. Doğrulama 2026-09-26.
 * ------------------------------------------------------------- */
const TOEIC_H1 = "TOEIC Nedir?";
const TOEIC_COUNT = "TOEIC Sınavı Kaç Sorudan Oluşur?";
const TOEIC_PARTS = "TOEIC Sınavı Hangi Bölümlerden Oluşur?";
const TOEIC_TIME = "TOEIC Sınavı Kaç Saat Sürmektedir?";
const TOEIC_VALID = "TOEIC Sınavının Geçerlilik Süresi Nedir?";

const TOEIC: ExamGuideDef = {
  path: `${SH}/toeic-kursu/toeic-nedir`,
  label: "TOEIC Nedir?",
  exam: "TOEIC",
  meta: {
    description:
      "TOEIC nedir, kaç soru ve bölümden oluşur, kaç saat sürer, puanı ve geçerlilik süresi nedir? İş İngilizcesi sınavı TOEIC için kısa ve güncel rehber.",
    reasons: ["description: kaynak 170 karakter ve bayat şube listesi — içeriği özetleyen yeni açıklama"],
  },
  hero: {
    answer: { heading: TOEIC_H1, take: [0] },
    facts: [
      { label: "Düzenleyen", value: "ETS" },
      { label: "Bölümler", value: "Dinleme ve okuma" },
      { label: "Soru", value: "200, çoktan seçmeli" },
      { label: "Süre", value: "2 saat" },
      { label: "Puan", value: "10–990" },
      { label: "Geçerlilik", value: "2 yıl" },
    ],
  },
  sections: [
    {
      id: "soru",
      title: { source: TOEIC_COUNT },
      answer: { src: { heading: TOEIC_COUNT, take: [0] } },
      blocks: [
        {
          kind: "points",
          items: { added: ["Konuşma ve yazma ayrı bir sınavla ölçülür: TOEIC Speaking & Writing (her beceri 0–200 puan)."] },
        },
      ],
    },
    {
      id: "bolumler",
      title: { source: TOEIC_PARTS },
      answer: { src: { heading: TOEIC_PARTS, take: [0] } },
      blocks: [
        { kind: "text", text: { src: { heading: TOEIC_PARTS, take: [1] } } },
        { kind: "points", items: { src: { heading: TOEIC_PARTS, take: [2, 3, 4, 5] } } },
        { kind: "text", text: { src: { heading: TOEIC_PARTS, take: [6] } } },
        { kind: "points", items: { src: { heading: TOEIC_PARTS, take: [7, 8, 9] } } },
      ],
    },
    {
      id: "sure",
      title: { source: TOEIC_TIME },
      answer: { src: { heading: TOEIC_TIME, take: [0] } },
      blocks: [],
    },
    {
      id: "puan",
      title: { added: "TOEIC puanı nasıl verilir?" },
      answer: { added: "Toplam puan 10–990 arasındadır; dinleme ve okuma ayrı ayrı 5–495 puan üzerinden değerlendirilir." },
      blocks: [
        {
          kind: "table",
          title: "CEFR seviyeleri için en düşük puanlar",
          head: ["CEFR", "Dinleme", "Okuma", "Toplam"],
          rows: [
            ["C1", "490", "455", "945"],
            ["B2", "400", "385", "785"],
            ["B1", "275", "275", "550"],
            ["A2", "110", "115", "225"],
            ["A1", "60", "60", "120"],
          ],
          note: "ETS'nin CEFR eşlemesi; C2 karşılığı yoktur. ETS bu puanların katı sınır olarak kullanılmamasını öneriyor.",
        },
        {
          kind: "points",
          items: {
            added: [
              "Geçme ya da kalma yoktur; kurumlar kendi alt puanını belirler.",
              "Sonuç belgesi sınavdan 7–21 gün sonra gelir.",
            ],
          },
        },
      ],
    },
    {
      id: "gecerlilik",
      title: { source: TOEIC_VALID },
      answer: { src: { heading: TOEIC_VALID, take: [0] } },
      blocks: [],
    },
    {
      id: "testler",
      title: { added: "TOEIC'in başka testleri var mı?" },
      answer: { added: "Evet. Dinleme ve okuma testinin yanında konuşma ve yazmayı ölçen ayrı bir test var; kurumlar ikisini birlikte isteyebilir." },
      blocks: [
        {
          kind: "parts",
          items: [
            { icon: "dinleme", name: "Listening & Reading", text: "İş hayatından dinleme ve okuma soruları; 200 çoktan seçmeli soru", meta: "2 saat, 10–990 puan" },
            { icon: "konusma", name: "Speaking & Writing", text: "Konuşma ve yazma görevleri; her beceri ayrı puanlanır", meta: "Konuşma 20 dk, yazma 60 dk, 0–200" },
            { icon: "kelime", name: "TOEIC Bridge", text: "Başlangıç ve orta seviyedeki öğrenciler için dört beceriyi ölçen testler", meta: "Dinleme, okuma, konuşma, yazma" },
          ],
          note: null,
        },
      ],
    },
    {
      id: "nerede",
      title: { added: "TOEIC'e Türkiye'de nasıl girilir?" },
      answer: {
        added:
          "İki yol var: ETS Global'in Türkiye sitesinden halka açık bir oturuma kaydolmak ya da işvereninizin veya dil okulunuzun düzenlediği kurumsal oturuma girmek.",
      },
      blocks: [
        {
          kind: "points",
          items: { added: ["Halka açık oturumların tarih ve yerleri ETS Global'in oturum arama sayfasında (etsglobal.org/tr) listelenir."] },
        },
      ],
    },
    {
      id: "karsilastirma",
      title: { added: "TOEIC mi, TOEFL mı, IELTS mi?" },
      answer: { added: "TOEIC iş hayatındaki İngilizceyi ölçer; üniversite başvurularında çoğunlukla TOEFL ya da IELTS istenir." },
      blocks: [
        {
          kind: "table",
          head: ["", "TOEIC L&R", "TOEFL iBT", "IELTS"],
          rows: [
            ["Amaç", "İş hayatında İngilizce", "Akademik İngilizce", "Akademik ya da göç ve iş"],
            ["Düzenleyen", "ETS", "ETS", "British Council, IDP, Cambridge"],
            ["Bölümler", "Dinleme ve okuma", "4 bölüm", "4 bölüm"],
            ["Süre", "2 saat", "Yaklaşık 2 saat", "2 saat 45 dk"],
            ["Puan", "10–990", "1–6 bant", "0–9 bant"],
            ["Geçerlilik", "2 yıl", "2 yıl", "2 yıl (önerilen)"],
          ],
          note: null,
        },
      ],
    },
  ],
  sources: [
    "ETS — TOEIC Listening & Reading Examinee Handbook",
    "ETS Europe — TOEIC L&R CEFR eşlemesi (eu.ets.org)",
    "ETS Global — puan geçerliliği ve Türkiye oturumları (etsglobal.org)",
    "ETS — TOEIC Bridge (ets.org/toeic)",
  ],
  updated: "2026-09-26",
  edits: {
    "TOEIC®, Test Of English for International Communication, TOEFL sınavını da geliştiren Amerikan menşeli ETS'nin (Educational Testing Service) İş İngilizcesine yönelik olarak hazırladığı sınavdır. Türkiye'de de bir çok saygın firmanın kullandığı bu sınava her yıl yaklaşık 6 milyon kişi girmektedir.":
      "TOEIC® (Test of English for International Communication), TOEFL'ı da geliştiren ABD merkezli ETS'nin (Educational Testing Service) iş İngilizcesini ölçmek için hazırladığı sınavdır. Türkiye'de de birçok saygın firmanın kullandığı sınav, ETS'ye göre her yıl yaklaşık 7 milyon kez yapılıyor ve 160'tan fazla ülkede 14.000'den fazla kurum tarafından kullanılıyor.",
    "TOEIC Sınavı 200 sorudan oluşmaktadır ve bu sorular çoktan seçmelidirler.":
      "TOEIC Listening & Reading 200 çoktan seçmeli sorudan oluşur: 100 dinleme, 100 okuma.",
    "TOEIC Sınavı dinleme ve okuduğunu anlama olmak üzere iki ana bölümden oluşmaktadır. Sorulan sorular, gündelik iş yaşamlarından alınan örnekler baz alınarak hazırlanmaktadır. Sınavda iş yazışmaları, e-mailler, sipariş formları, telefon konuşmaları gibi iş yaşamlarında en sık kullanılan alanlardan sorular gelmektedir.":
      "Dinleme ve okuma olmak üzere iki bölüm vardır. Sorular iş hayatından alınır: yazışmalar, e-postalar, sipariş formları, telefon konuşmaları gibi.",
    "1. Dinleme bölümü, 100 soru içermektedir. Sesli olarak dinlenen kısa cümleler ve konuşmalar hakkında soruların olduğu 4 kısımdan oluşur.":
      "Dinleme bölümü (100 soru, yaklaşık 45 dakika) dört kısımdan oluşur:",
    // Soru dağılımları 2006 öncesi formattı — ETS Examinee Handbook'taki güncel dağılım.
    "Fotoğraflar: 20 soru (4 şıklı)": "Fotoğraflar: 6 soru",
    "Soru-Cevap: 30 soru (3 şıklı)": "Soru-cevap: 25 soru",
    "Kısa konuşmalar: 30 soru (4 şıklı)": "Karşılıklı konuşmalar: 39 soru",
    "Uzun konuşmalar: 20 soru (4 şıklı)": "Kısa konuşmalar (tek kişi): 30 soru",
    "2. Okuduğunu anlama bölümü, 100 sorudan oluşmaktadır. Bu bölümde yazılı olarak verilen metinler üzerinden sorular yöneltilmektedir.":
      "Okuma bölümü (100 soru, 75 dakika) üç kısımdan oluşur:",
    "Eksik Cümleler: 40 soru (4 şıklı)": "Eksik cümleler: 30 soru",
    "Hatayı Bulma: 20 soru (4 şıklı)": "Metin tamamlama: 16 soru",
    "Okuduğunu Anlama: 40 soru (4 şıklı)": "Okuduğunu anlama: 54 soru (29 tek metin, 25 çoklu metin)",
    "Toplamda 200 sorunun yöneltildiği bu sınav, 120 dakika sürmektedir. Sınavın 45 dakikası dinleme, 75 dakikası ise okuduğunu anlama bölümünden oluşmaktadır. İşlemlerin de sürmesiyle birlikte yaklaşık olarak 2,5 saatte ihtiyacınız olacaktır.":
      "Sınav 2 saat sürer: yaklaşık 45 dakika dinleme, 75 dakika okuma. Kimlik kontrolü ve yönergelerle birlikte yaklaşık 2,5 saat ayırmanız gerekir.",
    "TOEIC sınavı’nın uluslararası geçerlilik süresi 2 yıldır.":
      "TOEIC sonucu 2 yıl geçerlidir: sınavdan 2 yıl sonra sonuç belgesi yeniden düzenlenmez ve doğrulanmaz.",
  },
  ignored: [],
};

/* ---------------------------------------------------------------
 * YDS — ÖSYM 2026-YDS/1 Kılavuzu (§1.3 KPDS/ÜDS 2013, §1.10 diller, §1.11 tarihler,
 * §1.12 180 dk, §1.15 geçerlilik kurumun mevzuatı, §1.16 ve §3 80 soru, §3.8 seviye
 * tablosu, yanlış doğruyu götürmez), 2026 e-YDS Kılavuzu (12 oturum, 180 dk, 80 soru),
 * 375 sayılı KHK md. 2 (tazminat göstergeleri 1500/600/300, 5 yıl), ÖSYM Uluslararası
 * Yabancı Dil Sınavları Eşdeğerlikleri (11.03.2025; IELTS yok). Doğrulama 2026-09-26.
 * ------------------------------------------------------------- */
const YDS_H1 = "YDS Nedir?";
const YDS_TABLE = "YDS Puan Tablosu";
const YDS_ROWS = "YDS Puan Seviyesi Memur Dil Tazminatı";

const YDS: ExamGuideDef = {
  path: `${SH}/yds-kursu/yds-nedir`,
  label: "YDS Nedir?",
  exam: "YDS",
  meta: {
    description:
      "YDS nedir, kaç soru ve kaç dakika, puan seviyeleri ve memur dil tazminatı nasıl hesaplanır, sonuç kaç yıl geçerli? ÖSYM'nin 2026 kılavuzlarına göre rehber.",
    reasons: ["description: kaynak anlamsız ('…online YDS Nedir?') ve bayat şube listesi — içeriği özetleyen yeni açıklama"],
  },
  hero: {
    answer: { heading: YDS_H1, take: [0] },
    facts: [
      { label: "Düzenleyen", value: "ÖSYM" },
      { label: "Soru", value: "80 (çoğu dilde çoktan seçmeli)" },
      { label: "Süre", value: "180 dakika" },
      { label: "Puan", value: "100 üzerinden" },
      { label: "Sınav şekli", value: "Kâğıt (YDS) ya da bilgisayar (e-YDS)" },
      { label: "Geçerlilik", value: "Kuruma göre; dil tazminatında 5 yıl" },
    ],
  },
  sections: [
    {
      id: "nasil",
      title: { added: "YDS nasıl bir sınav?" },
      answer: { src: { heading: YDS_H1, take: [1] } },
      blocks: [
        { kind: "points", items: { src: { heading: YDS_H1, take: [2] } } },
        {
          kind: "parts",
          items: [
            { icon: "kelime", name: "Sözcük bilgisi", text: "Cümlenin anlamına uygun kelimeyi ve kalıbı seçme", meta: "Soru türü" },
            { icon: "dilbilgisi", name: "Dil bilgisi", text: "Zaman, yapı ve bağlaçları doğru kullanma", meta: "Soru türü" },
            { icon: "kullanim", name: "Çeviri", text: "Yabancı dil ile Türkçe arasında cümle çevirisi", meta: "Soru türü" },
            { icon: "okuma", name: "Okuduğunu anlama", text: "Paragrafı anlama ve metinden çıkarım yapma", meta: "Soru türü" },
          ],
          note: "Sınavda sözlük kullanılamaz.",
        },
      ],
    },
    {
      id: "diller",
      title: { added: "YDS hangi dillerde, yılda kaç kez yapılır?" },
      answer: {
        added:
          "Kâğıt üzerindeki YDS yılda iki kez (YDS/1 ve YDS/2) yapılır; ayrıca ÖSYM'nin elektronik sınav merkezlerinde yıl boyunca e-YDS oturumları vardır.",
      },
      blocks: [
        {
          kind: "points",
          items: {
            added: [
              "YDS/1: Almanca, Arapça, Arnavutça, Boşnakça, Çince, Danimarkaca, Ermenice, Fransızca, Gürcüce, Hollandaca, İngilizce, Japonca, Korece, Lehçe, Macarca, Portekizce, Rumence, Rusça, Sırpça ve Ukraynaca.",
              "YDS/2: Almanca, Arapça, Fransızca, İngilizce ve Rusça.",
              "Farsça, Yunanca, Bulgarca, İspanyolca ve İtalyanca yalnız e-YDS olarak yapılır.",
              "Bazı dillerde (ör. Arnavutça, Çince, Japonca) sınav çoktan seçmeli değil, yazılı çeviri şeklindedir.",
            ],
          },
        },
        {
          kind: "table",
          title: "YDS ve e-YDS",
          head: ["", "YDS", "e-YDS"],
          rows: [
            ["Nasıl", "Kâğıt kitapçıkla", "ÖSYM elektronik sınav merkezinde bilgisayarla"],
            ["Ne sıklıkla", "Yılda 2 kez (YDS/1, YDS/2)", "Yıl boyunca oturumlar (2026'da 12)"],
            ["Soru ve süre", "80 soru, 180 dakika", "80 soru, 180 dakika"],
            ["Sonucun değeri", "Eşdeğer", "Eşdeğer; aynı hakları verir"],
          ],
          note: null,
        },
      ],
    },
    {
      id: "puan",
      title: { source: YDS_TABLE },
      answer: { src: { heading: YDS_TABLE } },
      blocks: [],
    },
    {
      id: "tazminat",
      title: { source: YDS_ROWS },
      answer: { added: "Dil tazminatı A, B ve C seviyelerinde ödenir. Tablodaki rakamlar TL değil, gösterge rakamıdır." },
      blocks: [
        { kind: "table", head: ["Puan", "Seviye", "Tazminat göstergesi"], rows: { src: { heading: YDS_ROWS } }, note: null },
        {
          kind: "points",
          items: {
            added: [
              "Aylık tutar, gösterge rakamının memur aylık katsayısıyla çarpımını geçmemek üzere Cumhurbaşkanı kararıyla belirlenir (375 sayılı KHK, madde 2).",
              "Tazminat için sınav sonucu 5 yıl geçerlidir; süre bitince seviye bir alt düzeye inmiş sayılır.",
            ],
          },
        },
      ],
    },
    {
      id: "basvuru",
      title: { added: "YDS'ye nasıl başvurulur?" },
      answer: { added: "Başvurular ÖSYM Aday İşlemleri Sistemi'nden (ais.osym.gov.tr) ya da ÖSYM başvuru merkezlerinden yapılır." },
      blocks: [
        {
          kind: "points",
          items: {
            added: [
              "Sınav tarihleri ve başvuru dönemleri ÖSYM'nin yıllık sınav takviminde yayımlanır.",
              "Sınava sınav giriş belgesi ve geçerli bir kimlik belgesiyle girilir.",
              "Sonuçlar ÖSYM'nin sonuç sisteminden açıklanır.",
            ],
          },
        },
      ],
    },
    {
      id: "gecerlilik",
      title: { added: "YDS sonucu kaç yıl geçerli?" },
      answer: {
        added: "ÖSYM genel bir süre belirlemez; geçerlilik süresini sonucu isteyen kurum kendi mevzuatına göre belirler. Dil tazminatı için süre 5 yıldır.",
      },
      blocks: [
        {
          kind: "points",
          items: {
            added: [
              "ÖSYM'nin eşdeğerlik tablosuna göre TOEFL iBT, PTE Academic, Cambridge C1 Advanced ve C2 Proficiency, Linguaskill ve Oxford Test of English sonuçları YDS puanına çevrilebilir; IELTS bu tabloda yok.",
            ],
          },
        },
      ],
    },
  ],
  sources: [
    "ÖSYM — 2026-YDS/1 Kılavuzu ve 2026 e-YDS Kılavuzu (osym.gov.tr)",
    "375 sayılı Kanun Hükmünde Kararname, madde 2 (mevzuat.gov.tr)",
    "ÖSYM — Uluslararası Yabancı Dil Sınavları Eşdeğerlikleri (11.03.2025)",
  ],
  updated: "2026-09-26",
  edits: {
    "ÖSYM tarafından gerçekleştirilen (YDS) ve açılımı Yabancı Dil Bilgisi Seviye Tespit Sınavı olan merkezi bir yabancı dil sınavıdır. Daha önceleri uygulanan ÜDS ve KPDS sınavlarının da bu sınava dahil edilmesi ile birlikte kamu kurum ve kuruluşları başta olmak üzere üniversiteler ve özel sektörlerde geçerliliği olan yabancı dil sınavıdır.":
      "YDS (Yabancı Dil Bilgisi Seviye Tespit Sınavı), ÖSYM'nin yaptığı merkezi yabancı dil sınavıdır. 2013'ten beri ÜDS ve KPDS'nin yerine yapılır; kamu kurumlarında, üniversitelerde ve özel sektörde geçerlidir.",
    // ÖSYM 2026 kılavuzu: 180 dakika (kaynaktaki 150 eskimiş).
    "Sınav 80 sorudan oluşur. Yanlışlar doğruları götürmez ve soruları cevaplandırmanız için size tanınan süre 150 dakikadır.":
      "Sınav 80 çoktan seçmeli sorudan oluşur ve 180 dakika sürer. Yanlış cevaplar doğruları götürmez.",
    "Her doğru cevap 1.25’lik bir puan seviyesine karşılık gelmektedir. Sınava herkes başvurabilir.":
      "Puan, doğru cevap sayısından 100 üzerinden hesaplanır; her doğru cevap 1,25 puandır. Sınava herkes başvurabilir.",
    "YDS'den alınan puanların seviye olarak karşılıkları ve memurlar için ödenen yıllık dil tazminatı tutarı aşağıdaki tabloda gösterilmiştir.":
      "YDS puanı beş seviyeye karşılık gelir: 90–100 A, 80–89 B, 70–79 C, 60–69 D, 50–59 E. Memurlara ödenen yabancı dil tazminatı bu seviyeye göre belirlenir.",
    "90-100 A 1500": "90–100 | A | 1500",
    "80-89 B 600": "80–89 | B | 600",
    "70-79 C 300": "70–79 | C | 300",
    "60-69 D X": "60–69 | D | Ödenmez",
    "50-59 E X": "50–59 | E | Ödenmez",
  },
  headingEdits: {
    [YDS_ROWS]: "YDS seviyesi ve memur dil tazminatı",
  },
  ignored: [],
};

/* ---------------------------------------------------------------
 * PROFICIENCY — kaynak metin DDM'in kendi tavsiyeleri (firma sesi: "en akıllıca iş…",
 * "ciddi bir kursa yazılmak şart") → yalnız yazım ve eskimiş olgu düzeltilir.
 * Olgular: Boğaziçi YADYOK (BUEPT), İTÜ YDY (iki oturum, dinleme dahil),
 * Atılım YDYO Muafiyet ve Eşdeğerlik Yönergesi (22.09.2025, Tablo 5, Puan Grubu 4),
 * YÖK Yabancı Dil Öğretimi Yönetmeliği (RG 23.03.2016/29662) md. 6/3-b.
 * Doğrulama 2026-09-26.
 * ------------------------------------------------------------- */
const PROF_H1 = "Proficiency Nedir?";

const PROFICIENCY: ExamGuideDef = {
  path: `${SH}/proficiency-kursu/proficiency-nedir`,
  label: "Proficiency Nedir?",
  exam: "Proficiency",
  meta: {
    title: "Proficiency Nedir? | Dünya Dilleri Merkezi",
    description:
      "Proficiency nedir, üniversitelerin hazırlık atlama sınavları nasıl farklılaşır, nasıl hazırlanılır, TOEFL ya da PTE ile muafiyet mümkün mü? Kısa rehber.",
    reasons: [
      "title: kaynak 'Proficiency Nedir ?' — boşluk ve marka eki",
      "description: kaynak 163 karakter ve bayat şube listesi — içeriği özetleyen yeni açıklama",
    ],
  },
  hero: {
    answer: { heading: PROF_H1, take: [0] },
    facts: [
      { label: "Hazırlayan", value: "Her üniversite kendisi" },
      { label: "Amaç", value: "İngilizce hazırlıktan muafiyet" },
      { label: "Format", value: "Üniversiteye göre değişir" },
      { label: "Geçme puanı", value: "Üniversite senatosu belirler" },
      { label: "Alternatif", value: "TOEFL iBT, PTE, Cambridge gibi sınavlar" },
    ],
  },
  sections: [
    {
      id: "standart-mi",
      title: { added: "Proficiency standart bir sınav mı?" },
      answer: { src: { heading: PROF_H1, take: [2] } },
      blocks: [],
    },
    {
      id: "bolumler",
      title: { added: "Proficiency'de hangi bölümler olur?" },
      answer: { added: "Çoğu sınavda okuma, dinleme ve yazma vardır; bazı üniversiteler dil kullanımı ya da konuşma bölümü ekler." },
      blocks: [
        {
          kind: "parts",
          items: [
            { icon: "okuma", name: "Okuma", text: "Akademik metinleri dikkatli okuyup anlama", meta: "Çoğu sınavda" },
            { icon: "dinleme", name: "Dinleme", text: "Ders anlatımı ve konuşmaları çoğunlukla not alarak dinleme", meta: "Çoğu sınavda" },
            { icon: "yazma", name: "Yazma", text: "Verilen bir konuda deneme (essay) yazma", meta: "Çoğu sınavda" },
            { icon: "konusma", name: "Dil kullanımı, konuşma", text: "Dil bilgisi-kelime bölümü ya da sözlü sınav", meta: "Bazı üniversitelerde" },
          ],
          note: null,
        },
      ],
    },
    {
      id: "farklar",
      title: { added: "Üniversitelerin sınavları nasıl farklılaşıyor?" },
      answer: { added: "Bölümler, soru tipleri ve geçme puanı üniversiteden üniversiteye değişir. İki örnek:" },
      blocks: [
        {
          kind: "table",
          head: ["Üniversite", "Sınav", "Bölümler"],
          rows: [
            ["Boğaziçi", "BUEPT", "Dinleme, okuma ve yazma"],
            ["İTÜ", "İTÜ Yeterlik", "İki oturum: dil kullanımı ve okuma; yazma ve dinleme"],
          ],
          note: "Güncel format ve tarihler için hedeflediğiniz üniversitenin yabancı diller okulunun duyurularına bakın.",
        },
      ],
    },
    {
      id: "hazirlik",
      title: { added: "Proficiency'ye nasıl hazırlanılır?" },
      answer: { src: { heading: PROF_H1, take: [1] } },
      blocks: [{ kind: "text", text: { src: { heading: PROF_H1, take: [3] } } }],
    },
    {
      id: "muafiyet",
      title: { added: "Proficiency yerine uluslararası sınav sonucu kullanılabilir mi?" },
      answer: {
        added:
          "Evet. YÖK yönetmeliğine göre, kabul edilen merkezi ya da uluslararası yabancı dil sınavlarında üniversite senatosunun belirlediği puanı alanlar hazırlıktan muaf olur.",
      },
      blocks: [
        {
          kind: "table",
          title: "Örnek: Atılım Üniversitesi, İngilizce eğitim veren lisans programları",
          head: ["Sınav", "Muafiyet için en düşük sonuç"],
          rows: [
            ["TOEFL iBT", "78 (yazma en az 20)"],
            ["PTE Academic", "67"],
            ["Cambridge C1 Advanced", "C"],
            ["Cambridge C2 Proficiency", "C"],
          ],
          note: "Atılım YDYO Muafiyet ve Eşdeğerlik Yönergesi (2025). TOEFL iBT Home Edition sonuçları muafiyet için kabul edilmiyor; lisans programlarında YDS kabul edilmiyor.",
        },
      ],
    },
    {
      id: "universiteler",
      title: { added: "Hangi üniversitenin sınavı nasıl?" },
      answer: { added: "Her üniversitenin hazırlık atlama sınavını ayrı sayfada anlattık:" },
      blocks: [
        {
          kind: "links",
          items: UNIVERSITY_INDEX.map((u) => ({
            label: u.examCode ? `${u.name} (${u.examCode})` : u.name,
            href: `${SH}/proficiency-kursu/${u.slug}`,
          })),
        },
      ],
    },
  ],
  sources: [
    "YÖK — Yabancı Dil Öğretimi Yönetmeliği, madde 6 (Resmî Gazete, 23.03.2016)",
    "Atılım Üniversitesi — YDYO Muafiyet ve Eşdeğerlik Yönergesi (2025)",
    "Boğaziçi Üniversitesi YADYOK ve İTÜ Yabancı Diller Yüksekokulu resmi sayfaları",
  ],
  updated: "2026-09-26",
  edits: {
    // İTÜ Yeterlik artık dinleme bölümü içeriyor (İTÜ YDY) — eskimiş örnek düzeltildi.
    "Proficiency (Yeterlik) sınavı, üniversitelerin kendi ihtiyaçları doğrultusunda kendi bünyelerinde hazırladıkları yabancı dil seviye tespit sınavıdır. Bazı üniversiteler (Boğaziçi gibi), dinleme yetisini test ederken bazı üniversiteler (İTÜ gibi) bu bölümü sınavlarına dâhil etmeyebiliyorlar.":
      "Proficiency (yeterlik) sınavı, üniversitelerin İngilizce hazırlık programından muafiyet için kendi hazırladıkları yabancı dil sınavıdır. Her üniversitenin formatı farklıdır; bölümler, soru tipleri ve geçme puanı değişir.",
    "Yapılacak en akıllıca işlerden birisi, başvurulan üniversitenin Proficiency sınav örneklerini önceden edinip sınav öncesinde EN AZ 10 deneme sınavı çözmektir.":
      "Yapılacak en akıllıca işlerden birisi, başvurulan üniversitenin Proficiency sınav örneklerini önceden edinip sınav öncesinde en az 10 deneme sınavı çözmektir.",
    "Proficiency, TOEFL gibi standardize edilmiş bir sınav değil; aksine, kurumsal bir sınav olduğundan her üniversite kendine göre bir yeterlik ister. İTÜ Yeterlik sınavına hazırlanmak Boğaziçi’nin sınavına hazırlanmakla eş değildir ya da YTÜ’ye hazırlandığınız tekniklerle İTÜ’ye hazırlanamazsınız. Yani, hazırlanırsınız da, sonuç sizi memnun etmeyebilir.!":
      "Proficiency, TOEFL gibi standartlaştırılmış bir sınav değil; kurumsal bir sınav olduğundan her üniversite kendine göre bir yeterlik ister. İTÜ Yeterlik sınavına hazırlanmak Boğaziçi’nin sınavına hazırlanmakla eş değildir ya da YTÜ’ye hazırlandığınız tekniklerle İTÜ’ye hazırlanamazsınız. Yani hazırlanırsınız da, sonuç sizi memnun etmeyebilir.",
    // TOEFL CBT 2006'da kalktı; Atılım'ın güncel yönergesinde IELTS ve FCE yok → eskimiş puanlar çıkarıldı,
    // güncel eşikler "muafiyet" bölümünde tabloda.
    "Mesela Atılım ve Bilkent Üniversitesi için orta seviye bir temelle kendi kendine çalışmak yetersiz olabiliyor. Ciddi bir kursa yazılmak şart oluyor. Hatta bazıları bu kadar uğraşacağıma diğer sınavlara hazırlanıp Mesela Atılım için biraz speaking çalışıp TOEFL sınavından 71 (IBT), 173 (CBT), IELTS sınavından 6.0, ya da 6.5, FCE sınavında C alarak bağlı oldukları fakültelere geçerler.":
      "Mesela Atılım ve Bilkent Üniversitesi için orta seviye bir temelle kendi kendine çalışmak yetersiz olabiliyor. Ciddi bir kursa yazılmak şart oluyor. Hatta bazıları bu kadar uğraşacağıma diğer sınavlara hazırlanıp, mesela Atılım için biraz speaking çalışıp TOEFL iBT ya da PTE Academic gibi sınavlardan üniversitenin istediği puanı alarak bağlı oldukları fakültelere geçerler.",
  },
  ignored: [],
};

/** GRE / GMAT karşılaştırması — iki rehberde ortak (ETS ve GMAC'ten doğrulanmış olgular). */
const GRE_GMAT_TABLE: GuideBlock = {
  kind: "table",
  head: ["", "GRE General Test", "GMAT"],
  rows: [
    ["Kimler için", "Birçok alanda yüksek lisans ve doktora", "İşletme ve yönetimde yüksek lisans (MBA vb.)"],
    ["Düzenleyen", "ETS", "GMAC"],
    ["Bölümler", "Analitik yazma, sözel, sayısal", "Sayısal, sözel, veri analizi"],
    ["Süre", "Yaklaşık 1 saat 58 dk", "2 saat 15 dk"],
    ["Puan", "130–170 (sözel, sayısal), 0–6 (yazma)", "205–805"],
    ["Geçerlilik", "5 yıl", "5 yıl"],
    ["Evden sınav", "Var", "Var (online)"],
    ["Tekrar", "21 günde bir, 12 ayda en fazla 5", "16 günde bir, 12 ayda 5, ömür boyu 8"],
  ],
  note: null,
};

/* ---------------------------------------------------------------
 * GRE — ETS: gre/test-takers/general-test/prepare/test-structure.html (Eylül 2023 kısa format,
 * 5 bölüm, ~1 sa 58 dk, mola/deneysel bölüm yok), …/register.html (21 günde bir, 12 ayda 5),
 * …/at-home-testing.html (7/24), …/scores/get-scores.html (8–10 gün), …/scores/send-scores.html
 * (4 ücretsiz, ek gönderim 40 $, ScoreSelect), subject-tests/about.html (matematik, fizik,
 * psikoloji). Format kartları `data/privateLessonsExam.ts` ile aynı. Doğrulama 2026-09-26.
 * ------------------------------------------------------------- */
const GRE_H1 = "GRE Nedir?";
const GRE_INFO = "GRE Sınavının İçeriği Hakkında Bilgi";
const GRE_GENERAL = "1) General Test";
const GRE_VERBAL = "Sözel Bölüm (GRE Verbal)";
const GRE_QUANT = "Sayısal Bölüm (GRE Quantitative)";
const GRE_AW = "Analitik Yazma Bölümü (GRE Analytical Writing)";
/** Kaynaktaki 2023 öncesi format tablosunun hücreleri (bölüm başına 20 soru, 30/35 dk). */
const GRE_OLD_TABLE = [
  "Alanlar",
  "Soru Sayısı",
  "Süre",
  "Analitik yazma; Bu alan 2 alt bölümden oluşur",
  "Her bölümde 1 soru vardır 1A Konu Analizi 1B Tartışma Analizi",
  "Her bölüm için 30 dakika olmak üzere toplam 1 saat",
  "Sözel Analiz Bu alan 2 alt bölümden oluşur",
  "Her Bir Bölümde 20 Soru Vardır.",
  "Sayısal Analiz Bu alan 2 alt bölümden oluşur",
  "Her bölüm için 35 dakika olmak üzere toplam 70 dakika",
];

const GRE: ExamGuideDef = {
  path: `${SH}/gre-kursu/gre-nedir`,
  label: "GRE Nedir?",
  exam: "GRE",
  meta: {
    title: "GRE Nedir? | Dünya Dilleri Merkezi",
    description:
      "GRE nedir, General Test hangi bölümlerden oluşur, kaç dakika sürer, puan nasıl verilir ve okullara nasıl gönderilir? 2023 sonrası kısa formatla rehber.",
    reasons: ["title: marka eki (diğer rehberlerle tutarlı)", "description: kaynak 159 karakter ve bayat şube listesi"],
  },
  hero: {
    answer: { heading: GRE_H1, take: [0] },
    facts: [
      { label: "Düzenleyen", value: "ETS" },
      { label: "Bölümler", value: "Analitik yazma, sözel, sayısal" },
      { label: "Süre", value: "Yaklaşık 1 saat 58 dk" },
      { label: "Puan", value: "130–170 (sözel, sayısal), 0–6 (yazma)" },
      { label: "Geçerlilik", value: "5 yıl" },
      { label: "Nerede", value: "Test merkezinde ya da evden" },
    ],
  },
  sections: [
    {
      id: "turler",
      title: { source: GRE_INFO },
      answer: { src: { heading: GRE_H1, take: [1] } },
      blocks: [
        {
          kind: "points",
          items: { added: ["Subject Test yalnız matematik, fizik ve psikoloji alanlarında; eylül, ekim ve nisan aylarında yapılır."] },
        },
      ],
    },
    {
      id: "bolumler",
      title: { source: GRE_GENERAL },
      answer: { src: { heading: GRE_GENERAL } },
      blocks: [
        {
          kind: "parts",
          items: [
            { icon: "yazma", name: "Analitik yazma", text: "Bir görüş hakkında gerekçeli yazı; her zaman ilk bölüm", meta: "1 görev, 30 dk" },
            { icon: "okuma", name: "Sözel akıl yürütme", text: "Okuduğunu anlama ve bağlam içinde kelime bilgisi", meta: "27 soru, 41 dk" },
            { icon: "puan", name: "Sayısal akıl yürütme", text: "Aritmetik, cebir, geometri ve veri analizi", meta: "27 soru, 47 dk" },
          ],
          note: null,
        },
      ],
    },
    { id: "sozel", title: { source: GRE_VERBAL }, answer: { src: { heading: GRE_VERBAL, take: [0] } }, blocks: [] },
    { id: "sayisal", title: { source: GRE_QUANT }, answer: { src: { heading: GRE_QUANT } }, blocks: [] },
    { id: "yazma", title: { source: GRE_AW }, answer: { src: { heading: GRE_AW, take: [0] } }, blocks: [] },
    {
      id: "nerede",
      title: { added: "GRE'ye nerede ve ne sıklıkla girilir?" },
      answer: { src: { heading: GRE_AW, take: [2] } },
      blocks: [{ kind: "points", items: { src: { heading: GRE_AW, take: [14] } } }],
    },
    {
      id: "puan",
      title: { added: "GRE puanı nasıl verilir?" },
      answer: { src: { heading: GRE_AW, take: [10] } },
      blocks: [
        { kind: "points", items: { src: { heading: GRE_AW, take: [11, 12, 13, 3] } } },
        { kind: "points", items: { added: ["GRE puanları sınav tarihinden itibaren 5 yıl boyunca okullara gönderilebilir."] } },
      ],
    },
    {
      id: "gonderim",
      title: { added: "GRE sonucu okullara nasıl gönderilir?" },
      answer: { src: { heading: GRE_AW, take: [7] } },
      blocks: [{ kind: "points", items: { src: { heading: GRE_AW, take: [6, 9] } } }],
    },
    {
      id: "karsilastirma",
      title: { added: "GRE mi, GMAT mı?" },
      answer: { added: "İşletme okulları çoğunlukla GMAT ister; diğer alanlarda GRE yaygındır. Hangisini kabul ettiğini başvuracağınız programa sorun." },
      blocks: [GRE_GMAT_TABLE],
    },
  ],
  sources: ["ETS — GRE General Test ve Subject Test resmi sayfaları (ets.org/gre)"],
  updated: "2026-09-26",
  edits: {
    "GRE, Amerika Birleşik Devletleri’nde lisansüstü / master veya doktora eğitimi görmek isteyen öğrencilerin alması gereken bir sınavdır. Bu sınav ETS (Educational Testing Service) tarafından yapılır.":
      "GRE, başta ABD olmak üzere yüksek lisans ve doktora başvurularında istenen bir sınavdır. ETS (Educational Testing Service) tarafından yapılır.",
    "GRE, General Test ve Subject Test olmak üzere ikiye ayrılır. Genellikle, okul başvurularında General Test sonucu istenmektedir. Bazı programlara yapılan başvurularda ise Subject Test istenebilmektedir.":
      "GRE'nin iki türü var: General Test ve Subject Test. Başvurularda çoğunlukla General Test istenir; bazı programlar ayrıca Subject Test sonucu isteyebilir.",
    // Eylül 2023 kısa format: deneysel bölüm ve mola kalktı.
    "GRE General testi sözel, sayısal, analitik yazma (kompozisyon) olmak üzere 3 bölümden oluşmaktadır. Bu bölümlere ek olarak deneysel olan ancak puan hesaplamasına katılmayan bir bölüm daha bulunur.":
      "GRE General Test analitik yazma, sözel ve sayısal akıl yürütme olmak üzere 3 bölümden oluşur. Eylül 2023'ten beri sınav yaklaşık 1 saat 58 dakika sürer; deneysel bölüm ve mola yoktur.",
    "2 kısımdan oluşur. Her bölüm için 20 soru olmak üzere toplam 40 soru olup, her bölüm için 30 dakika olmak üzere toplam süre 60 dakikadır. Analiz ve sonuç çıkarma, metinde bulunan önemli noktaların seçimi ve kelime, cümle ve metinlerin anlamlarını kavrama gibi özellikleri ölçer.":
      "İki kısımdan oluşur: toplam 27 soru, 41 dakika. Metni analiz edip sonuç çıkarma, önemli noktaları seçme ve kelime ile cümlelerin anlamını bağlam içinde kavramayı ölçer.",
    "2 kısımdan oluşur. Her bölüm için 20 soru olmak üzere toplam soru sayısı 40 olup, her bölüm için 35 dakika olmak üzere toplam süre 70 dakikadır. Temel matematik,aritmetik,geometri ve veri yorumlama, sayısal bilgilerin anlaşılması, bu bilgilerin yorumlanması ve matematiksel modeller kullanarak çözümü gibi özellikleri ölçer.":
      "İki kısımdan oluşur: toplam 27 soru, 47 dakika. Aritmetik, cebir, geometri ve veri analizi; sayısal bilgiyi yorumlama ve matematiksel modellerle problem çözmeyi ölçer.",
    "Konu Analizi ve Tartışma Analizi olmak üzere 2 kısımdan oluşur. Toplam süre, her bir bölüm için 30 dk. olmak üzere 60 dk.’dır. İfadelerin açık bir biçimde belirtilmesi, bunları nedenler ve örneklerle desteklerken İngilizce kurallarının kullanımını ölçer.":
      "Tek görevden oluşur: bir görüşü değerlendiren gerekçeli bir yazı (Analyze an Issue), 30 dakika. Her zaman sınavın ilk bölümüdür. Fikirleri açıkça ifade etmeyi, gerekçe ve örneklerle desteklemeyi ve İngilizceyi doğru kullanmayı ölçer.",
    "GRE General Test genel kapsamlı bir sınav olup GRE sınavını şart koşan tüm yüksek lisans ve doktora programlarına başvuranlar tarafından alınmalıdır. Sınav merkezlerinde yıl boyunca bilgisayar ortamında sınava girilebilmektedir. Bu test 21 günde en fazla bir kere, 1 yıl içinde en fazla 5 defa alınabilmektedir.":
      "GRE General Test yıl boyunca test merkezinde bilgisayarla ya da haftanın her günü, günün her saatinde evden alınabilir. 21 günde bir, 12 ay içinde en fazla 5 kez girilebilir.",
    "GRE testinin zorluk derecesi öğrencinin sorulara verdiği doğru veya yanlış cevaplara göre değişir. Alınan puanlar, sınav bitiminden itibaren 10-15 gün içinde gönderilir. Test yerlerini,tarihlerini görmek ve kayıt yaptırmak için":
      "Sözel ve sayısal bölümler uyarlamalıdır: ikinci kısmın zorluğu ilk kısımdaki performansınıza göre belirlenir. Resmi puanlar sınavdan 8–10 gün sonra ETS hesabınızda görünür.",
    "GRE General Test almak için online olarak www.ets.org/gre adresinden kayıt olup, bir hesap oluşturmanız gerekmektedir. Aynı işlemi telefon, faks veya mektup vasıtasıyla da gerçekleştirebilirsiniz. Test ücretini kredi kartı ile ödeyebilirsiniz.":
      "Kayıt, sınav yeri ve tarih seçimi ETS'nin sitesinde (ets.org/gre) açtığınız hesaptan yapılır; ücret kredi kartıyla ödenebilir.",
    "Sözel ve sayısal bölümler için 130 ila 170 arasında bir puanlama sistemi mevcuttur.":
      "Sözel ve sayısal bölümler 130–170, analitik yazma 0–6 arasında puanlanır.",
    "Sözel Analiz (Verbal Reasoning) puanlama: 130-170.": "Sözel akıl yürütme (Verbal Reasoning): 130–170, 1 puan aralıklarla.",
    "Sayısal Analiz (Quantitative Reasoning) puanlama : 130-170 En düşük puan 130, en yüksek puan 170’dir.":
      "Sayısal akıl yürütme (Quantitative Reasoning): 130–170, 1 puan aralıklarla.",
    "Hiçbir soru cevaplanmasa bile 130 puan alınır. Analitik yazma bölümünde ise puan 0,5'lik artışlar halinde 0 ile 6,0 arasındadır.":
      "Analitik yazma (Analytical Writing): 0–6, yarım puan aralıklarla.",
    "Testin yapıldığı gün, Sözel Analiz ve Sayısal Analiz bölümlerinin bitiminde, resmi olmayan GRE sonucunuzu gördükten sonra size bu skoru göndermek istediğiniz okullar sorulacaktır. 4 okula kadar ek bir ücret ödemeden skorunuzu gönderebilrsiniz.":
      "Sınav günü, resmi olmayan sözel ve sayısal puanlarınızı gördükten sonra en fazla 4 okulu seçip sonucunuzu ücretsiz gönderebilirsiniz.",
    "GRE General Test Skorlarınızı istediğiniz okullara online olarak göndermeniz mümkündür. Eğer istediğiniz puanı alamadıysanız, göndermiş olduğunuz okullardan sınav skorunu geri alabilrsiniz.":
      "ScoreSelect ile hangi sınav tarihlerinin puanlarının gönderileceğine siz karar verirsiniz.",
    "Aksi takdirde, formunuz kabul edilmeyecektir. Test gününden sonra, gönderim başına 25 $ üzere skorunuzu okullara online olarak göndermeniz mümkündür.":
      "Sınav gününden sonra her ek okul için gönderim ücreti 40 dolardır.",
  },
  headingEdits: {
    [GRE_GENERAL]: "GRE General Test hangi bölümlerden oluşur?",
  },
  ignored: [
    { line: "GRE sınavına girmeden önce katılımcıların sınav hakkında bilmesi gereken önemli hatırlatmalar ve sınav sistemiyle ilgili detaylı bilgilendirme.", reason: "içeriksiz giriş cümlesi" },
    ...GRE_OLD_TABLE.map((line) => ({ line, reason: "2023 öncesi format tablosu (bölüm başına 20 soru, 30/35 dk) — güncel format bölüm kartlarında" })),
    { line: "Her bölüm kendi içinde ikiye ayrılır yani toplam 6 aşamada tamamlanmakta olan sınavın, 3.kısım tamamlandığında 10 dk.’lık ara verilir.", reason: "Eylül 2023'ten beri mola yok (ETS)" },
    { line: "www.ets.org/gre", reason: "bölünmüş kayıt cümlesinin parçası — kayıt bilgisi tek maddede" },
    { line: "adresi üzerinden bir hesap oluşturmanız gerekmektedir.", reason: "bölünmüş kayıt cümlesinin parçası — kayıt bilgisi tek maddede" },
    { line: "Eğer istenilen okul listede yoksa bu skorun liste dışı okullara gönderim formunun doldurulması için test merkez yöneticisine danışın. Formu test merkezinden ayrılmadan önce teslim etmelisiniz.", reason: "eski kâğıt form uygulaması; gönderim artık ETS hesabından" },
  ],
};

/* ---------------------------------------------------------------
 * SAT — College Board: satsuite.collegeboard.org (yapı: okuma-yazma 54 soru/64 dk, matematik
 * 44 soru/70 dk, 400–1600; score-release-dates 2–4 hafta; dates-deadlines yılda 8 tarih;
 * how-many-times sınırsız; score-choice), allaccess.collegeboard.org (Subject Test ve Essay
 * Haziran 2021'de kaldırıldı), bluebook.collegeboard.org (test merkezinde Bluebook).
 * Doğrulama 2026-09-26.
 * ------------------------------------------------------------- */
const SAT_H1 = "SAT Nedir?";
const SAT_INFO = "SAT Sınavı Hakkında Bilgi";
const SAT_APPLY = "Sınav Başvuru Merkezi:";

const SAT: ExamGuideDef = {
  path: `${SH}/sat-kursu/sat-nedir`,
  label: "SAT Nedir?",
  exam: "SAT",
  meta: {
    title: "SAT Nedir? | Dünya Dilleri Merkezi",
    description:
      "SAT nedir, dijital SAT hangi bölümlerden oluşur, kaç dakika sürer, puan nasıl verilir, yılda kaç kez yapılır? Güncel formatla kısa rehber.",
    reasons: ["title: marka eki", "description: kaynak 159 karakter ve bayat şube listesi"],
  },
  hero: {
    answer: { heading: SAT_H1 },
    facts: [
      { label: "Düzenleyen", value: "College Board" },
      { label: "Bölümler", value: "Okuma ve yazma, matematik" },
      { label: "Süre", value: "2 saat 14 dk" },
      { label: "Puan", value: "400–1600" },
      { label: "Sınav şekli", value: "Dijital, test merkezinde" },
      { label: "Geçerlilik", value: "Resmi süre yok" },
    ],
  },
  sections: [
    {
      id: "bolumler",
      title: { source: SAT_INFO },
      answer: { src: { heading: SAT_INFO, take: [0] } },
      blocks: [
        { kind: "points", items: { src: { heading: SAT_INFO, take: [6, 7] } } },
        {
          kind: "table",
          title: "Bölümlerin konu alanları",
          head: ["Bölüm", "Konu alanları"],
          rows: [
            ["Okuma ve yazma", "Anlatım ve yapı; bilgi ve fikirler; standart İngilizce kuralları; ifade"],
            ["Matematik", "Cebir; ileri matematik; problem çözme ve veri analizi; geometri ve trigonometri"],
          ],
          note: "Matematik bölümünün tamamında hesap makinesi kullanılabilir; Bluebook uygulamasında yerleşik bir hesap makinesi vardır.",
        },
      ],
    },
    {
      id: "puan",
      title: { added: "SAT puanı nasıl verilir?" },
      answer: { src: { heading: SAT_INFO, take: [5] } },
      blocks: [
        {
          kind: "points",
          items: {
            added: [
              "Geçme ya da kalma yoktur; üniversiteler kendi beklentilerini belirler.",
              "Hafta sonu sınavlarının puanları çoğunlukla 2–4 hafta içinde açıklanır.",
              "Score Choice ile hangi sınav tarihinin puanlarını göndereceğinizi siz seçersiniz; bazı üniversiteler farklı tarihlerdeki en iyi bölüm puanlarını birleştirir (superscore).",
              "SAT puanının resmi bir geçerlilik süresi yoktur; kabul süresini üniversite belirler.",
              "Sınavdan sonraki 9 gün içinde istenen ilk 4 sonuç gönderimi ücretsizdir; sonraki her gönderim 15 dolardır.",
            ],
          },
        },
      ],
    },
    {
      id: "basvuru",
      title: { source: SAT_APPLY },
      answer: { src: { heading: SAT_INFO, take: [1] } },
      blocks: [
        {
          kind: "points",
          items: {
            added: [
              "Kayıt College Board hesabınızdan yapılır; sınav test merkezinde Bluebook uygulamasıyla dijital olarak alınır.",
              "SAT yılda 8 kez yapılır ve tarihler ABD dışındaki adaylar için de aynıdır.",
              "Sınava girme sayısında sınır yoktur.",
            ],
          },
        },
      ],
    },
    {
      id: "sinav-gunu",
      title: { added: "SAT sınav gününe ne götürülür?" },
      answer: { added: "Bluebook yüklü ve şarjı dolu bir cihaz, sınav giriş belgesi ve fotoğraflı kimlik." },
      blocks: [
        {
          kind: "points",
          items: {
            added: [
              "Giriş belgesi Bluebook uygulamasından alınır; basılı getirmek tercih edilir.",
              "Kimlik fiziksel bir belge olmalı; telefondaki kimlik kabul edilmez.",
              "Cihazınız yoksa College Board'dan ödünç isteyebilirsiniz; talep sınavdan en az 30 gün önce yapılmalı.",
              "Bluebook'ta ücretsiz, tam uzunlukta resmi deneme sınavları var.",
            ],
          },
        },
      ],
    },
    {
      id: "sat-ii",
      title: { added: "SAT II (Subject Test) ne oldu?" },
      answer: { src: { heading: SAT_INFO, take: [4] } },
      blocks: [],
    },
  ],
  sources: ["College Board — SAT Suite resmi sayfaları (satsuite.collegeboard.org): yapı, puan, tarihler, ücretler, sınav günü"],
  updated: "2026-09-26",
  edits: {
    // "her ABD vatandaşından talep edilmekte" artık doğru değil (birçok üniversite test-optional) — genelleştirildi.
    "SAT, A.B.D'de üniversitelerin lisans programlarına başvuru yapmak için gerekli olan ve The College Board tarafından düzenlenen bir sınavdır. Bu sınav lisans eğitimi almak isteyen her ABD vatandaşından talep edilmekte ve bazı üniversiteler tarafından yabancı uyruklu öğrencilerden de istenmektedir.":
      "SAT, başta ABD olmak üzere birçok ülkede üniversitelerin lisans başvurularında kullanılan, College Board'un düzenlediği bir sınavdır. Bazı üniversiteler yabancı uyruklu öğrencilerden de SAT puanı ister.",
    "Her biri 1 saat 15 dakika olan cebir, aritmetik ve geometri bilgilerinin test edildiği Math (Sayısal) bölümü ile okuma-anlama, gramer ve analitik değerlendirme bilgi ve becerilerini ölçmeyi amaçlayan Verbal (Sözel) bölümlerinden oluşmaktadır.":
      "Dijital SAT iki bölümden oluşur: okuma ve yazma ile matematik. Her bölüm iki modüldür; ikinci modülün zorluğu ilk modüldeki performansınıza göre belirlenir. Sınav 2 saat 14 dakika sürer; iki bölüm arasında 10 dakikalık mola vardır.",
    "Sınav ve kayıt işlemleri hakkında daha fazla bilgi edinmek için SAT resmi sitesine":
      "Başvuru ve sınav tarihleri için College Board'un resmi sitesi kullanılır: satsuite.collegeboard.org.",
    "SAT niteliklerine göre ikiye ayrılmaktadır. SAT I ve SAT II 2005 itibariyle teste kompozisyon, kısa okumalar eklenmiş, matematik sorularında düzenlemeler yapılmış ve analoji ile sözel kavrama soruları testten çıkartılmıştır.":
      "SAT Subject Test'ler (eski adıyla SAT II) ve isteğe bağlı SAT Essay Haziran 2021'den sonra kaldırıldı. Bugün tek bir SAT var.",
    "SAT I: 2,5 saat süren ve öğrencilerin matematiksel ve sözel yeteneklerini ölçen bir sınavdır. Test skoru 200 ile 800 arasında değişmektedir.":
      "Her bölüm 200–800 arasında puanlanır; toplam puan 400–1600'dür.",
    "Sözel: 78 Soru – 75 Dakika": "Okuma ve yazma: 54 soru, 64 dakika",
    "Sayısal: 60 Soru – 75 Dakika": "Matematik: 44 soru, 70 dakika",
  },
  headingEdits: {
    [SAT_APPLY]: "SAT'e nasıl ve ne zaman başvurulur?",
  },
  ignored: [
    { line: "www.sat.org", reason: "bölünmüş cümlenin parçası; güncel adres tek satırda (satsuite.collegeboard.org)" },
    { line: "adresinden ulaşabilirsiniz.", reason: "bölünmüş cümlenin parçası" },
    { line: "SAT I için alınan ortalama skor 500'dür.", reason: "eski (1600 öncesi) ölçeğe ait, doğrulanamayan ortalama" },
    {
      line: "SAT II: 1 saat süren bu test öğrencilerin spesifik olarak bir akademik konu üzerindeki bilgilerini ölçmeyi amaçlar. Test skoru 200 ile 800 arasında değişmektedir. Toplamda 22 başlık olan bu testin başlıca konuları:",
      reason: "SAT Subject Test'ler 2021'de kaldırıldı (College Board)",
    },
    { line: "Yazma, Edebiyat, Dünya, Matematik, Biyoloji, Kimya, Fizik, Fransızca, Almanca, İspanyolca, İtalyanca, Latince, Japonca, Çince.", reason: "kaldırılan SAT Subject Test konuları" },
    { line: "College Board SAT Program,", reason: "eski posta adresi — başvuru College Board hesabından (kullanıcı onayı 2026-09-26)" },
    { line: "P.O. Box 6200 Princeton,", reason: "eski posta adresi" },
    { line: "NJ 08541-6200, U.S.A.", reason: "eski posta adresi" },
    { line: "Tel: 609-771-7600, Fax: 609-771-7681", reason: "eski telefon/faks" },
  ],
};

/* ---------------------------------------------------------------
 * GMAT — GMAC: gmac.com about-the-gmat-exam (5 yıl geçerli), who-uses-the-gmat (7.700+
 * program), gmat-focus-edition, gmat-exam-online (Pearson VUE ile online), GMAT Policies
 * and Procedures (Ağu 2024: 16 gün, 12 ayda 5, ömür boyu 8); mba.com (arama kaydı):
 * resmi sonuç 3–5 gün, 48 saat içinde 5 programa ücretsiz. Format `data/privateLessonsExam.ts`
 * ile aynı. Kaynaktaki "ETS tarafından gerçekleştirilen" ve "131 okul" eskimiş. Doğrulama 2026-09-26.
 * ------------------------------------------------------------- */
const GMAT_H1 = "GMAT Nedir ?";

const GMAT: ExamGuideDef = {
  path: `${SH}/gmat-kursu/gmat-nedir`,
  label: "GMAT Nedir?",
  exam: "GMAT",
  meta: {
    title: "GMAT Nedir? | Dünya Dilleri Merkezi",
    description:
      "GMAT nedir, kim düzenler, hangi bölümlerden oluşur, puan ve geçerlilik süresi nedir, kaç kez girilir? GMAT Focus Edition formatıyla kısa ve güncel rehber.",
    reasons: ["title: kaynak 'GMAT Nedir ?' — boşluk ve marka eki", "description: kaynak 160 karakter ve bayat şube listesi"],
  },
  hero: {
    answer: { heading: GMAT_H1, take: [1] },
    facts: [
      { label: "Düzenleyen", value: "GMAC" },
      { label: "Bölümler", value: "Sayısal, sözel, veri analizi" },
      { label: "Süre", value: "2 saat 15 dk" },
      { label: "Puan", value: "205–805" },
      { label: "Geçerlilik", value: "5 yıl" },
      { label: "Nerede", value: "Test merkezinde ya da online" },
    ],
  },
  sections: [
    {
      id: "neyi-olcer",
      title: { added: "GMAT neyi ölçer?" },
      answer: { src: { heading: GMAT_H1, take: [3] } },
      blocks: [
        { kind: "text", text: { src: { heading: GMAT_H1, take: [5] } } },
        { kind: "points", items: { added: ["GMAC'e göre dünyada 7.700'den fazla yüksek lisans programı GMAT kullanıyor."] } },
      ],
    },
    {
      id: "kimler",
      title: { added: "Kimler GMAT'e girer?" },
      answer: { src: { heading: GMAT_H1, take: [11] } },
      blocks: [],
    },
    {
      id: "bolumler",
      title: { added: "GMAT hangi bölümlerden oluşur?" },
      answer: { src: { heading: GMAT_H1, take: [13] } },
      blocks: [
        { kind: "points", items: { src: { heading: GMAT_H1, take: [14, 15] } } },
        { kind: "points", items: { added: ["Veri analizi (Data Insights): 20 soru, 45 dakika"] } },
        {
          kind: "text",
          text: { added: "Bölümlerin sırasını aday seçer; isteğe bağlı 10 dakikalık bir mola vardır ve her bölümde en fazla 3 cevap değiştirilebilir." },
        },
        {
          kind: "points",
          items: {
            added: [
              "Ekranda hesap makinesi yalnız veri analizi bölümünde verilir; sayısal bölümde hesap makinesi yoktur.",
              "mba.com'da iki tam uzunlukta resmi deneme sınavı ücretsizdir (GMAT Official Starter Kit).",
            ],
          },
        },
      ],
    },
    {
      id: "puan",
      title: { added: "GMAT puanı nasıl verilir?" },
      answer: { added: "Toplam puan 205–805 arasındadır; her bölüm 60–90 arasında puanlanır." },
      blocks: [
        {
          kind: "points",
          items: {
            added: [
              "Resmi sonuç 3–5 gün içinde mba.com hesabınızda görünür.",
              "Sınavdan sonraki 48 saat içinde 5 programa ücretsiz sonuç gönderebilirsiniz.",
              "GMAT puanları 5 yıl geçerlidir.",
            ],
          },
        },
      ],
    },
    {
      id: "nerede",
      title: { added: "GMAT'e nerede ve kaç kez girilir?" },
      answer: { added: "Pearson VUE test merkezlerinde ya da evden online girilebilir." },
      blocks: [
        {
          kind: "points",
          items: {
            added: [
              "İki sınav arasında en az 16 gün olmalı; 12 ayda en fazla 5, ömür boyu en fazla 8 kez girilebilir.",
            ],
          },
        },
        { kind: "points", items: { src: { heading: GMAT_H1, take: [7] } } },
      ],
    },
    {
      id: "karsilastirma",
      title: { added: "GMAT mı, GRE mi?" },
      answer: { added: "İşletme okulları çoğunlukla GMAT ister; bazı programlar GRE'yi de kabul eder. Hangisini kabul ettiğini başvuracağınız programa sorun." },
      blocks: [GRE_GMAT_TABLE],
    },
  ],
  sources: ["GMAC — GMAT resmi sayfaları (gmac.com, mba.com)", "GMAT Policies and Procedures (GMAC, 2024)"],
  updated: "2026-09-26",
  edits: {
    // GMAT'i ETS yapmıyor (GMAC; merkezlerde Pearson VUE); "131 okul" eskimiş.
    "İşletme dalında Master Programı (MBA) olan 131 okulun oluşturduğu Graduate Management Admission Council (GMAC) tarafından yönlendirilen ve Educational Testing Service (ETS) tarafından gerçekleştirilen bir sınavdır.":
      "GMAT, işletme yüksek lisansı (MBA ve benzeri) başvurularında kullanılan ve Graduate Management Admission Council'ın (GMAC) sahibi olduğu bir sınavdır.",
    "sözel, sayısal ve analitik yetenekleri ölçmeyi amaçlayan bir sınavdır ve okullara başvuran öğrencilerin işletme ve ilgili diğer alanlar üzerine Yüksek Lisans Eğitimi alma yeterliklerini belirlemede yardımcı olmak için tasarlanmıştır.":
      "GMAT sayısal ve sözel akıl yürütme ile veri analizi becerilerini ölçer; okulların, adayın işletme ve ilgili alanlarda yüksek lisansa hazır olup olmadığını değerlendirmesine yardım eder.",
    "işletme ve ilgili alanlardaki bilgi yeterliği, lisans eğitiminde belirli bir alanda edinilen bilgileri, motivasyon, yaratıcılık insan ilişkileri gibi karakter özelliklerini veya diğer bir alandaki yeterliliği ölçmeyi amaçlayan bir sınav değildir.":
      "GMAT işletme bilgisi, lisansta öğrenilen alan bilgisi ya da motivasyon, yaratıcılık, insan ilişkileri gibi kişisel özellikleri ölçmez.",
    "Amerika'daki Yüksek Lisans ve Doktora Programlarının İşletme, Yönetim bölümlerine başvuracak öğrencilerin girmesi gereken bir sınavdır.":
      "İşletme, yönetim ve ilgili alanlarda yüksek lisans (MBA, işletme master'ı) ve doktora programlarına başvuranlar; başta ABD olmak üzere birçok ülkedeki programlar GMAT ister.",
    "çoktan seçmeli (Sözel, Sayısal) ve Kompozisyon (Analytical Writing Asessment) olmak üzere 2 bölümden oluşmaktadır.":
      "GMAT (Focus Edition) üç bölümden oluşur; her bölüm 45 dakika sürer ve adayın cevaplarına göre uyarlanır. Eski formattaki kompozisyon bölümü kaldırıldı.",
    "Sayısal: 37 soru Süre: 75 Dakika": "Sayısal akıl yürütme (Quantitative Reasoning): 21 soru, 45 dakika",
    "Sözel: 41 Soru Süre: 75 Dakika": "Sözel akıl yürütme (Verbal Reasoning): 23 soru, 45 dakika",
    "broşürlerine ve örnek sorularına": "Resmi bilgi, kayıt ve örnek sorular: mba.com",
  },
  headingEdits: {
    [GMAT_H1]: "GMAT Nedir?",
  },
  ignored: [
    { line: "GMAT", reason: "kaynakta kalın yazılmış özne — sonraki cümleye katıldı" },
    { line: "GMAT Sınavı", reason: "kaynakta kalın yazılmış özne — sonraki cümleye katıldı" },
    { line: "www.gmat.org", reason: "bölünmüş cümlenin parçası; güncel adres tek satırda (mba.com)" },
    { line: "adresinden ulaşabilirsiniz.", reason: "bölünmüş cümlenin parçası" },
    { line: "Sınav Başvuru Merkezi:", reason: "eski posta adresi bloğu başlığı (kullanıcı onayı 2026-09-26)" },
    { line: "Educational Testing Service,", reason: "eski posta adresi; GMAT'i artık ETS yapmıyor" },
    { line: "P.O. Box 6103 Princeton,", reason: "eski posta adresi" },
    { line: "NJ 08541-6103, U.S.A. Tel: 609-771-7330,", reason: "eski posta adresi ve telefon" },
    { line: "Fax: 609-883-4349", reason: "eski faks" },
  ],
};

export const EXAM_GUIDES: ExamGuideDef[] = [TOEFL, IELTS, TOEIC, YDS, PROFICIENCY, GRE, SAT, GMAT];
