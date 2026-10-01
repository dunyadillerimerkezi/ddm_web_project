import type { IconName } from "@/components/graphics/icons";
import type { Photo, SlotRef } from "@/data/privateLessonsShared";
import { EXPERIENCE, SERVING, yearsSinceFounding } from "@/data/company";
import { SYSTEM_HREF } from "@/data/englishLevels";
import { ALL_LANGUAGE_NAMES, LANGUAGE_COUNT } from "@/data/languages";
import { PROMO_PATHS } from "@/data/branchPromoPaths";
import { joinTr } from "@/lib/listText";
import type { BranchSlug } from "@/lib/types";

/**
 * P6 — Şube tanıtım sayfaları (`/kadikoy-tanitim-sayfasi` …). Çözücü: `lib/branchPromoContent.ts`.
 *
 * İÇERİK KURALI (CLAUDE.md §5, P4 "facets" deseni): şubenin firma metni kaynaktan BİREBİR gelir ve sayfanın
 * altındaki "Ayrıntılı bilgi" bölümünde (`details`) tam olarak durur — kaynağın her satırı ya orada ya da
 * gerekçeli `ignored` / `ignoredBlocks` içinde (`assertCoverage`). Sayfanın üstündeki kart, tablo ve künye
 * metinleri kaynağın KISA PARÇALARIDIR (`Excerpt.match`): her parça düzeltilmiş "Ayrıntılı bilgi" metninde birebir
 * aranır, bulunmazsa build düşer. Kart başlıkları ("Kişiye özel plan"), künye / sütun etiketleri arayüz etiketidir.
 *
 * AYRIŞMA: her şube kendi bloklarını (`blocks`) kendi sırasıyla dizer — Kadıköy tanıtım + programlar, Ataşehir
 * programlar önce, Bağdat Caddesi "dile göre sınavlar" paneli + kurumsal müşteriler, Etiler eğitim yapısı +
 * eğitim modeli + kurumsal alanlar. ORTAK (dört sayfada aynı): 19 dil + sınav hazırlık listesi ve 6 bağlantı başlığı
 * (`SHARED_LINKS`) — sayfanın sonundaki "Dünya Dilleri Merkezi'nde eğitim" bölümü.
 *
 * GENEL BİLGİ: ulaşım kaynakta yok — `data/branchTransit.ts` (resmi hat sayfaları + OSM, kaynaklar orada).
 *
 * AŞAMA 0 (2026-09-28): 4 kaydın ~%75 benzerliği form + KVKK bloğundan (1249 kelime, P1 kararıyla yayınlanmıyor);
 * gerçek tanıtım metinleri birbirine %3–10 benziyor.
 *
 * MÜŞTERİ KARARLARI (2026-09-30 — aşağıda "müşteri kararı" diye işaretli her `edits` bunlara dayanır):
 *   - "Hepsinde 19 dil ve sınava hazırlık kursları": şubeye özel dil / sınav etiket listeleri kalktı; dört sayfa aynı
 *     listeyi gösterir (`data/languages.ts` `ALL_LANGUAGE_NAMES`, `data/exams.ts` `EXAMS`). Kaynakta şubenin dillerini
 *     SAYARAK sınırlayan iki cümle (Kadıköy, Etiler) aynı listeye çevrildi; "başta olmak üzere" diyen cümleler aynen.
 *   - "2003'ten bugüne - 23 yıl" (+ kullanıcı 2026-10-01: tüm şubeler aynı kalıpla): "25 Yıllık", "25 yılı aşkın",
 *     Bağdat Caddesi "20 yıldır" → "2003’ten bu yana 23 yıllık / yıldır" (`data/company.ts`); Ataşehir'in "2003 yılından bu
 *     yana" cümlelerine "23 yıldır" eklendi.
 *   - Şubenin adı "Etiler" (adres Levent tarafında, Nispetiye Cad. — adres ve sayfa adresi değişmedi).
 *   - "Öğrenme Garantisi" bağlantısı kalktı, madde düz metin.
 *   - Ümraniye için tanıtım sayfası YAPILMAYACAK (yalnız iletişim sayfası) — bu dosya 4 şubeyle kapandı.
 * AÇIK: `sube-1..5` iç mekân fotoğraflarının şubesi (`docs/bekleyen-sorular.md`).
 */

/** Kaynak metinden birebir parça (edits uygulanmış "Ayrıntılı bilgi" metninde aranır). */
export type Excerpt = { match: string };

export type PromoTitle =
  | { source: string }
  /** Kaynakta başlık olarak işaretlenmemiş bir satır (ör. "Kurumsal Eğitimler"). */
  | { line: SlotRef }
  /**
   * Başlık olarak işaretlenmiş ama aslında "başlık + paragraf" olan kaynak satırı (h5 hatası):
   * `at`'ten önceki kısım başlık, sonrası ilk paragraf olur — metin korunur, yalnız düzeyi düzelir.
   */
  | { split: string; at: string }
  /** Yalnız "Ayrıntılı bilgi" bölüm adı için arayüz etiketi (kaynakta başlığı olmayan paragraf grubu). */
  | { added: string };

export type DetailPara =
  /** `join` → kaynakta kalın yazı yüzünden bölünmüş satırlar tek paragrafa. */
  | { src: SlotRef; join?: true }
  /** Başlık olarak işaretlenmiş ama cümle olan kaynak satırı (h5) — paragraf olarak gösterilir. */
  | { heading: string };
export type DetailSection = { title: PromoTitle; paras: DetailPara[] };

export type ProgramColumn = {
  /** Arayüz etiketi. */
  title: string;
  badge?: Excerpt;
  rows: { label: string; text: Excerpt }[];
  /** Sütunun altındaki bağlantının indiği ortak liste (sayfa sonu; liste şubeye özel DEĞİL — müşteri kararı 2026-09-30). */
  list: "languages" | "exams";
};

export type PromoBlock =
  /** Şubeyi tanıtan kısa kartlar (+ isteğe bağlı alıntı paneli). */
  | {
      kind: "intro";
      title: PromoTitle;
      sub?: Excerpt;
      points: { title: string; icon: IconName; text: Excerpt }[];
      quote?: { text: Excerpt; cite?: Excerpt; photo?: Photo };
    }
  /** İki program sütunu (genel dil / sınav). */
  | { kind: "programs"; title: PromoTitle; lead?: Excerpt; columns: ProgramColumn[]; approach?: { title?: Excerpt; text: Excerpt } }
  /** Madde paneli: açık (`sky`) iki sütunlu liste ya da lacivert (`navy`) kutucuklar + dile göre sınav satırları. */
  | {
      kind: "highlights";
      tone: "sky" | "navy";
      title: PromoTitle;
      lead?: Excerpt;
      items: Excerpt[];
      byLanguage?: { lang: string; exams: Excerpt }[];
    }
  /** Kurumsal eğitim: metin + alan etiketleri ve/veya müşteri listesi. */
  | { kind: "corporate"; title: PromoTitle; text: Excerpt; areas?: Excerpt[]; clients?: Excerpt }
  /** Ders fotoğrafı şeridi (`gallery`). */
  | { kind: "gallery" };

export type BranchPromoDef = {
  branch: BranchSlug;
  path: string;
  /** Kaynak kayıt yolu. */
  source: string;
  meta: { title: string; description: string; reasons: string[] };
  /** Kaynakta h1 yok — şubenin tam adını taşıyan başlık / satır H1'e yükseltilir (CLAUDE.md §6, loglanır). */
  h1: PromoTitle;
  /** Semt fotoğrafı `data/branchPhotos.ts`'ten. */
  hero: { lead: Excerpt; badge: { source: string } | Excerpt };
  /** Künye kartındaki şubeye özgü satırlar (adres / telefon `data/branches.ts`, ulaşım `data/branchTransit.ts`). */
  card: { label: string; text: Excerpt }[];
  blocks: PromoBlock[];
  /** Ders fotoğrafları (kullanıcı, 2026-09-28: "ders fotoğraflarını alttaki alanlarda kullanabilirsin"). Şubeye atfedilmez. */
  gallery: Photo[];
  /** Kaynaktaki konum metni; ulaşım listesi `data/branchTransit.ts`'ten (iletişim sayfasıyla ortak). */
  visit: { place?: { title?: PromoTitle; text: Excerpt } };
  details: DetailSection[];
  edits?: Record<string, string>;
  headingEdits?: Record<string, string>;
  ignored: { line: string; reason: string }[];
  /** `from` satırından `to` ile BAŞLAYAN satıra kadar (ikisi dahil) her satır — form + KVKK bloğu gibi. */
  ignoredBlocks: { from: string; to: string; reason: string }[];
  updated: string;
};

const A = "/assets";
const CLASS_ALT = "Dünya Dilleri Merkezi'nde bir ders";
const classPhoto = (n: number, width: number, height: number): Photo => ({ src: `${A}/foto-${n}.jpg`, alt: CLASS_ALT, width, height });
const UPDATED = "2026-09-28";
/** Birleşik bölümdeki satır aralığı [a, b] (kaynak sırası). */
const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

/**
 * Eski sitenin 4 tanıtım sayfasında da aynı olan 6 sekme başlığı. İçerikleri `tanitim-icerik/*` kayıtlarındaydı
 * (Faz 8 temizliğine bırakıldı); burada yalnız başlık + sitedeki ilgili sayfaya bağlantı — 5 sayfada metin tekrarı yok.
 * Müşteri kararı 2026-09-30: "Öğrenme Garantisi"nin ayrı sayfası yok → bağlantı kalktı, madde düz metin (`href` yok).
 * "8 Dilde Eğitim" etiketi müşterinin rakamıyla "19 Dilde Eğitim" (aynı bölümde 19 dilin listesi duruyor).
 */
export const SHARED_LINKS: { line: string; label: string; href?: string }[] = [
  { line: "Eğitim Sistemi", label: "Eğitim Sistemi", href: SYSTEM_HREF },
  { line: "Gündüz, Akşam ve Hafta Sonu Dersleri", label: "Gündüz, Akşam ve Hafta Sonu Dersleri", href: "/yabanci-dil" },
  { line: "Özel Dersler", label: "Özel Dersler", href: "/diger-program/ozel-dersler" },
  { line: "8 Dilde Eğitim", label: `${LANGUAGE_COUNT} Dilde Eğitim`, href: "/yabanci-dil" },
  { line: "Sınav Hazırlık Programları", label: "Sınav Hazırlık Programları", href: "/sinav-hazirlik-egitimleri" },
  { line: "Öğrenme Garantisi", label: "Öğrenme Garantisi" },
];

/** "İngilizce, Almanca, … ve Farsça" — 19 dilin tek listesi (`data/languages.ts`), cümle içinde. */
const LANGUAGES_TEXT = joinTr(ALL_LANGUAGE_NAMES);
// Yıl ifadeleri `data/company.ts`'ten: "2003’ten bu yana 23 yıllık / yıldır" — tüm şubelerde aynı kalıp.

const FORM_REASON = "İletişim formu alanları + KVKK aydınlatma metni — P1 kararıyla yayınlanmıyor (form işi #4 bekliyor)";
const NOISE = "eski sitenin ikon kodu (Font Awesome sınıf adı) metne karışmış — ekranda gösterilmez";
const KVKK_END = "Kişisel verilerin işlenmesine dair bilgilendirme metnini okudum onaylıyorum";
/** Tüm kayıtlarda aynı gürültü / düğme satırları. */
const COMMON_IGNORED = [
  { line: "Dünya Dilleri Merkezi", reason: "eski sitenin logo alt yazısı" },
  { line: "fas fa-star", reason: NOISE },
  { line: "fas fa-arrow-right-long", reason: NOISE },
  { line: "Bizimle İletişime Geçin", reason: "düğme etiketi — sayfanın kendi Bilgi Al / İletişim düğmeleri var" },
];
/** Bağdat Caddesi ve Levent sayfalarında bölüm üst yazısı olarak kalmış yanlış şube adı (h3). */
const WRONG_KICKER = "Dünya Dilleri Merkezi Kadıköy Şubesi";
const WRONG_KICKER_IGNORED = {
  line: WRONG_KICKER,
  reason: "kopyala-yapıştır artığı: bu şubenin sayfasında Kadıköy'ün adı (Aşama 0, kullanıcıya bildirildi) — gösterilmez",
};

/* =====================================================================
 * Kadıköy — merkez şube: tanıtım kartları + alıntı → iki program sütunu → fotoğraflar
 * ===================================================================== */

const KAD_INTRO = "Bireysel gelişim ve uluslararası kaliteyi esas alan kurum Kadıköy Şubesi";
const KAD_MAIN = "Dünya Dilleri Merkezi Kadıköy Şubesi";
const KAD_H5 =
  "Eğitim Yaklaşımımız, Dünya Dilleri Merkezi Kadıköy'de her eğitim programı, öğrencinin hedeflerine ulaşmasını sağlayacak şekilde titizlikle planlanır. Çünkü başarılı bir öğrenme sürecinin yalnızca kaliteli içerikle değil, doğru yöntem ve sürdürülebilir takip ile mümkün olduğuna inanıyoruz.";
const KAD_PROGRAMS = "Genel Dil Eğitimleri, Uluslararası Sınav Hazırlık Programları";

const KADIKOY: BranchPromoDef = {
  branch: "kadikoy",
  path: "/kadikoy-tanitim-sayfasi",
  source: "/kadikoy-tanitim-sayfasi",
  meta: {
    title: "Kadıköy Dil Kursu | Dünya Dilleri Merkezi Kadıköy",
    description:
      "Dünya Dilleri Merkezi Kadıköy Merkez Şube: A1'den C2'ye genel dil eğitimleri, IELTS, TOEFL, SAT gibi sınavlara özel ders formatında hazırlık.",
    reasons: [
      'title: kaynak "Kadıköy Merkez Tanıtım Sayfası" — yerel arama için şube + hizmet adı (kullanıcı onayı, 2026-09-28)',
      'description: kaynak yalnız "Dünya Dilleri Merkezi Kadıköy Merkez Şubesi" (43 karakter) — sayfanın kendi olgularıyla genişletildi',
    ],
  },
  h1: { source: KAD_MAIN },
  hero: {
    lead: {
      match:
        "Dünya Dilleri Merkezi Kadıköy, yabancı dil eğitimi ve uluslararası sınav hazırlığında akademik kaliteyi, bireysel gelişimi ve dünya standartlarını esas alan seçkin bir eğitim kurumudur.",
    },
    badge: { source: "Kadıköy Merkez Şube" },
  },
  card: [
    { label: "Genel dil", text: { match: "A1'den C2 seviyesine kadar" } },
    { label: "Sınavlar", text: { match: "özel ders formatında" } },
  ],
  blocks: [
    {
      kind: "intro",
      title: { line: { heading: KAD_INTRO, take: [9] } },
      sub: { match: "Uluslararası standartlarda eğitim. Akademik uzmanlık. Küresel vizyon." },
      points: [
        {
          title: "Kişiye özel plan",
          icon: "ozelders",
          text: { match: "her öğrencimizin hedeflerini dikkatle analiz ediyor, ihtiyaçlarına özel eğitim planları oluşturarak başarı yolculuklarına rehberlik ediyoruz" },
        },
        {
          title: "Yakın takip",
          icon: "calisma",
          text: {
            match:
              "eğitim sürecinin her aşamasında öğrencilerimizin gelişimlerini yakından takip eder, düzenli geri bildirim ve danışmanlık desteğiyle hedeflerine ulaşmalarını destekleriz",
          },
        },
        {
          title: "Geniş bir topluluk",
          icon: "grup",
          text: {
            match:
              "yurt dışında eğitim planlayan öğrencilerden uluslararası kariyer hedefleyen profesyonellere, yabancı dil öğrenmek isteyen bireylerden akademik sınavlara hazırlanan adaylara kadar geniş bir topluluğun güvenle tercih ettiği bir eğitim markasıdır",
          },
        },
      ],
      quote: {
        text: { match: "Dil eğitiminin yalnızca bir sertifikadan ibaret olmadığına inanıyoruz." },
        cite: { match: "Dünya Dilleri Merkezi Kadıköy" },
        photo: classPhoto(11, 768, 768),
      },
    },
    {
      kind: "programs",
      title: { source: KAD_PROGRAMS },
      lead: { match: "başarıya giden yolun, kişiye özel planlama ve akademik uzmanlığın birleşiminden geçtiğine inanıyoruz" },
      approach: {
        title: { match: "Eğitim Yaklaşımımız" },
        text: { match: "her eğitim programı, öğrencinin hedeflerine ulaşmasını sağlayacak şekilde titizlikle planlanır." },
      },
      columns: [
        {
          title: "Genel Dil Eğitimleri",
          rows: [
            { label: "Seviyeler", text: { match: "A1'den C2 seviyesine kadar" } },
            { label: "Ders saati", text: { match: "Her seviye 60 ders saatinden oluşmakta" } },
            { label: "Tempo", text: { match: "haftada iki gün, üçer saatlik derslerle yaklaşık 2,5 ayda" } },
            { label: "Sınıf", text: { match: "Küçük sınıf yapısı, etkileşim odaklı dersler ve düzenli gelişim takibi" } },
          ],
          list: "languages",
        },
        {
          title: "Uluslararası Sınav Hazırlık Programları",
          badge: { match: "özel ders formatında" },
          rows: [
            { label: "Plan", text: { match: "hedef puanları, sınava kalan süreleri ve bireysel ihtiyaçları doğrultusunda" } },
            { label: "Takip", text: { match: "Düzenli deneme sınavları, birebir geri bildirimler ve stratejik çalışma planlarıyla" } },
          ],
          list: "exams",
        },
      ],
    },
    { kind: "gallery" },
  ],
  gallery: [classPhoto(1, 769, 769), classPhoto(2, 960, 960), classPhoto(3, 968, 968)],
  visit: {},
  details: [
    {
      title: { source: KAD_INTRO },
      paras: [
        { src: { heading: KAD_INTRO, take: [0, 1, 2] }, join: true },
        { src: { heading: KAD_INTRO, take: [3, 4, 5, 6, 7] }, join: true },
      ],
    },
    { title: { line: { heading: KAD_INTRO, take: [9] } }, paras: range(0, 6).map((i) => ({ src: { heading: KAD_MAIN, take: [i] } })) },
    { title: { split: KAD_H5, at: ", " }, paras: [] },
    { title: { source: KAD_PROGRAMS }, paras: [{ src: { heading: KAD_PROGRAMS, take: [0, 1] }, join: true }] },
    {
      title: { line: { heading: KAD_PROGRAMS, take: [2] } },
      paras: [
        { src: { heading: KAD_MAIN, take: [7] } },
        { src: { heading: KAD_MAIN, take: range(8, 14) }, join: true },
        { src: { heading: KAD_MAIN, take: [15] } },
        { src: { heading: KAD_MAIN, take: [16] } },
      ],
    },
    {
      title: { line: { heading: KAD_MAIN, take: [17] } },
      paras: [
        { src: { heading: KAD_MAIN, take: [18, 19, 20] }, join: true },
        { src: { heading: KAD_MAIN, take: [21] } },
        { src: { heading: KAD_MAIN, take: [22] } },
        { src: { heading: KAD_MAIN, take: [23] } },
      ],
    },
  ],
  edits: {
    // Başlık satırında eski tasarımın ayırıcı çizgisi ("Dil | Eğitimi") metne karışmış.
    "Kadıköy’de Dil | Eğitimi. Biz Kimiz? Eğitim Felsefemiz?": "Kadıköy’de Dil Eğitimi. Biz Kimiz? Eğitim Felsefemiz?",
    // Müşteri kararı 2026-09-30 (19 dil, tüm şubelerde aynı liste): kaynak 9 dil sayıyordu.
    "Genel dil programlarımız; İngilizce, Almanca, Fransızca, İspanyolca, İtalyanca, Rusça, Çince, Japonca ve Korece dillerinde sunulmaktadır.":
      `Genel dil programlarımız; ${LANGUAGES_TEXT} dillerinde sunulmaktadır.`,
  },
  ignored: [
    ...COMMON_IGNORED,
    { line: "Dünya Dilleri Merkezi Kadıköy Merkez Şube", reason: "bölüm üst yazısı; aynı bilgi H1 ve künye kartında" },
  ],
  ignoredBlocks: [{ from: "Kadıköy Şubesi İletişim Formu", to: KVKK_END, reason: FORM_REASON }],
  updated: UPDATED,
};

/* =====================================================================
 * Ataşehir — MEB onaylı dil okulu: programlar önce → tanıtım kartları + alıntı → fotoğraflar
 * ===================================================================== */

const ATA_INTRO = "Bireysel gelişim ve uluslararası kaliteyi esas alan kurum Ataşehir Şubesi";
const ATA_H5 = "Dünya Dilleri Merkezi Ataşehirde'de her eğitim programı, öğrencinin hedeflerine ulaşmasını sağlayacak şekilde titizlikle planlanır.";
const ATA_PROGRAMS = "Ataşehir Şubesinde Dil ve Sınav Programları";

const ATASEHIR: BranchPromoDef = {
  branch: "atasehir",
  path: "/atasehir-tanitim-sayfasi",
  source: "/atasehir-tanitim-sayfasi",
  meta: {
    title: "Ataşehir Dil Kursu | Dünya Dilleri Merkezi Ataşehir",
    description:
      "Dünya Dilleri Merkezi Ataşehir Şubesi: MEB onaylı dil okulu. İngilizce, Almanca, Fransızca ve daha birçok dilde eğitim; IELTS, TOEFL, YDS hazırlık.",
    reasons: [
      'title: kaynak "Ataşehir Şubesi Tanıtım Sayfası" — yerel arama için şube + hizmet adı (kullanıcı onayı, 2026-09-28)',
      'description: kaynak yalnız "Dünya Dilleri Merkezi Ataşehir Şubesi" — sayfanın kendi olgularıyla genişletildi',
    ],
  },
  // Form bloğunun ardındaki bölüm üst yazısı — şubenin tam adı.
  h1: { line: { heading: ATA_H5, take: [104] } },
  hero: {
    lead: {
      match:
        `${SERVING} İstanbul Ataşehir'de yabancı dil eğitimi sunan Dünya Dilleri Merkezi (DDM) Ataşehir şubesi, Milli Eğitim Bakanlığı (MEB) onaylı bir dil okuludur.`,
    },
    badge: { match: "Milli Eğitim Bakanlığı (MEB) onaylı" },
  },
  card: [
    { label: "Eğitmenler", text: { match: "Türk ve yabancı eğitmenlerden oluşan kadrosu" } },
    { label: "Sınavlar", text: { match: "IELTS, TOEFL, YDS, Proficiency başta olmak üzere" } },
  ],
  blocks: [
    {
      kind: "programs",
      title: { source: ATA_PROGRAMS },
      lead: { match: "Kurum, hem genel dil eğitimleri hem de uluslararası akademik sınavlara hazırlık programları sunmaktadır." },
      approach: { text: { match: "her eğitim programı, öğrencinin hedeflerine ulaşmasını sağlayacak şekilde titizlikle planlanır." } },
      columns: [
        {
          title: "Genel dil eğitimleri",
          rows: [
            { label: "Beceriler", text: { match: "konuşma, dinleme, okuma ve yazma becerilerini 4 alanda geliştirmeye odaklanırken" } },
            { label: "Hedef", text: { match: "öğrencilerin dili günlük yaşamda ve iş hayatında etkin kullanabilmelerini sağlamaktadır" } },
            { label: "Seviye", text: { match: "her seviyeye uygun program seçenekleriyle" } },
          ],
          list: "languages",
        },
        {
          title: "Akademik sınav hazırlığı",
          rows: [
            { label: "Destek", text: { match: "çeşitli akademik sınavlara hazırlık programlarıyla da öğrencilerine kapsamlı destek sunulmaktadır" } },
            { label: "Plan", text: { match: "size özel programlar hazırlayarak öğrenci memnuniyetini ve başarıyı ön planda tutan kurum" } },
          ],
          list: "exams",
        },
      ],
    },
    {
      kind: "intro",
      title: { source: ATA_INTRO },
      sub: { match: "kaliteli eğitim anlayışı ve deneyimli kadrosuyla öğrencilerine uluslararası standartlarda dil eğitimi sunmaktadır" },
      points: [
        {
          title: "Uzman kadro",
          icon: "grup",
          text: {
            match:
              "Alanında uzman Türk ve yabancı eğitmenlerden oluşan kadrosu ile öğrencilerin dil becerilerini geliştirmeyi ve hedeflerine ulaşmalarını desteklemeyi amaçlamaktadır.",
          },
        },
        { title: "Modern yöntem", icon: "calisma", text: { match: "Modern eğitim yöntemleriyle hazırlanan programlar" } },
        {
          title: "Merkezi konum",
          icon: "konum",
          text: { match: "ulaşım kolaylığı ve modern eğitim ortamıyla öğrencilerine konforlu bir öğrenme deneyimi sunmaktadır" },
        },
      ],
      quote: {
        text: {
          match:
            `Dünya Dilleri Merkezi Ataşehir ${SERVING} yabancı dil öğrenmek, akademik hedeflerine ulaşmak veya kariyerinde yeni fırsatlar yakalamak isteyen herkes için güvenilir bir eğitim partneridir.`,
        },
      },
    },
    { kind: "gallery" },
  ],
  gallery: [classPhoto(4, 960, 960), classPhoto(5, 1080, 810), classPhoto(6, 960, 960)],
  visit: {},
  details: [
    { title: { source: ATA_INTRO }, paras: range(0, 2).map((i) => ({ src: { heading: ATA_INTRO, take: [i] } })) },
    { title: { added: "Eğitim yaklaşımı" }, paras: [{ heading: ATA_H5 }] },
    { title: { source: ATA_PROGRAMS }, paras: range(0, 6).map((i) => ({ src: { heading: ATA_PROGRAMS, take: [i] } })) },
  ],
  edits: {
    // Müşteri kararı 2026-09-30 + kullanıcı 2026-10-01: tüm şubeler "2003’ten bu yana 23 yıldır" (`data/company.ts`).
    "2003 yılından bu yana İstanbul Ataşehir'de yabancı dil eğitimi sunan Dünya Dilleri Merkezi (DDM) Ataşehir şubesi, Milli Eğitim Bakanlığı (MEB) onaylı bir dil okuludur.":
      `${SERVING} İstanbul Ataşehir'de yabancı dil eğitimi sunan Dünya Dilleri Merkezi (DDM) Ataşehir şubesi, Milli Eğitim Bakanlığı (MEB) onaylı bir dil okuludur.`,
    "2003 yılından bu yana faaliyet gösteren Dünya Dilleri Merkezi, İngilizce, Almanca, Fransızca, İspanyolca, Rusça, İtalyanca, Çince ve Yabancılar İçin Türkçe başta olmak üzere birçok dilde eğitim vermektedir.":
      `${SERVING} faaliyet gösteren Dünya Dilleri Merkezi, İngilizce, Almanca, Fransızca, İspanyolca, Rusça, İtalyanca, Çince ve Yabancılar İçin Türkçe başta olmak üzere birçok dilde eğitim vermektedir.`,
    "Dünya Dilleri Merkezi Ataşehir 2003 yılından bu yana yabancı dil öğrenmek, akademik hedeflerine ulaşmak veya kariyerinde yeni fırsatlar yakalamak isteyen herkes için güvenilir bir eğitim partneridir.":
      `Dünya Dilleri Merkezi Ataşehir ${SERVING} yabancı dil öğrenmek, akademik hedeflerine ulaşmak veya kariyerinde yeni fırsatlar yakalamak isteyen herkes için güvenilir bir eğitim partneridir.`,
    // Yazım: virgülden sonra boşluk yok.
    "Ayrıca IELTS, TOEFL,YDS, Proficiency başta olmak üzere çeşitli akademik sınavlara hazırlık programlarıyla da öğrencilerine kapsamlı destek sunulmaktadır.":
      "Ayrıca IELTS, TOEFL, YDS, Proficiency başta olmak üzere çeşitli akademik sınavlara hazırlık programlarıyla da öğrencilerine kapsamlı destek sunulmaktadır.",
  },
  headingEdits: {
    // Yazım hatası "Ataşehirde'de" (Aşama 0, kullanıcı bildirdi).
    [ATA_H5]: ATA_H5.replace("Ataşehirde'de", "Ataşehir'de"),
  },
  ignored: [...COMMON_IGNORED, { line: "Ataşehir Şubesi", reason: "şube adı etiketi (h6) — aynı bilgi H1 ve künyede" }],
  ignoredBlocks: [{ from: "Ataşehir Şubesi İletişim", to: KVKK_END, reason: FORM_REASON }],
  updated: UPDATED,
};

/* =====================================================================
 * Bağdat Caddesi — akademik şube: dile göre sınavlar paneli → tanıtım kartları → kurumsal müşteriler → fotoğraflar
 * ===================================================================== */

const CAD_INTRO = "25 Yıllık Güven, Akademik Başarı, Köklü Deneyim, Uluslararası Standartlar"; // kaynak başlık — `headingEdits` düzeltir
const CAD_H5 = "Online canlı ders altyapısı (Zoom, Skype vb.)";
const CAD_HIGHLIGHTS = "Öne Çıkan Sınav Odaklı Eğitim ve Yurtdışı Program";

const CADDE: BranchPromoDef = {
  branch: "bagdat",
  path: "/cadde-tanitim-sayfasi",
  source: "/cadde-tanitim-sayfasi",
  meta: {
    title: "Bağdat Caddesi Dil Kursu | Dünya Dilleri Merkezi Suadiye",
    description:
      "Dünya Dilleri Merkezi Bağdat Caddesi Akademik Şube, Suadiye: IELTS, TOEFL, YÖKDİL, TELC, TestDaF, CELI / CILS sınav hazırlığı ve kurumsal dil eğitimi.",
    reasons: [
      'title: kaynak "Bağdat Caddesi Şubesi Tanıtım Sayfası" — yerel arama için şube + semt + hizmet (kullanıcı onayı, 2026-09-28)',
      'description: kaynak yalnız "Dünya Dilleri Merkezi Bağdat Caddesi Şubesi" — sayfanın kendi olgularıyla genişletildi',
    ],
  },
  // Form bloğunun ardındaki bölüm üst yazısı — şubenin kaynaktaki tam adı ("Akademik Şube").
  h1: { line: { heading: CAD_H5, take: [104] } },
  hero: {
    lead: {
      match:
        "Dünya Dilleri Merkezi Bağdat Caddesi, İstanbul Anadolu Yakası’nda özellikle akademik yabancı dil eğitimleri ve sınav hazırlık programlarıyla öne çıkan köklü bir dil okuludur.",
    },
    badge: { source: "Bağdat Caddesi Akademik" },
  },
  card: [
    { label: "Konum", text: { match: "Suadiye / Şaşkınbakkal ışıklarda" } },
    { label: "Odak", text: { match: "Akademik sınav hazırlığında yoğun uzmanlaşma" } },
  ],
  blocks: [
    {
      kind: "highlights",
      tone: "navy",
      title: { source: CAD_HIGHLIGHTS },
      lead: { match: "özellikle IELTS, TOEFL, Üniversite Hazırlık Atlama ve TESTDAF, TELC, CELI / CILS hazırlık kurslarıyla tanınır" },
      items: [
        "Anadolu Yakası’nda merkezi Bağdat Caddesi lokasyonu",
        "Akademik sınav hazırlığında yoğun uzmanlaşma",
        "Üniversite hazırlık ve yurtdışı eğitim odaklı programlar",
        "Küçük grup sistemi sayesinde bireysel takip",
      ].map((match) => ({ match })),
      byLanguage: [
        { lang: "İngilizce", exams: { match: "IELTS, TOEFL, YÖKDİL" } },
        { lang: "Almanca", exams: { match: "TELC, TESTDAF" } },
        { lang: "İtalyanca", exams: { match: "CELI / CILS" } },
      ],
    },
    {
      kind: "intro",
      title: { source: CAD_INTRO },
      sub: {
        match:
          "Akademik sınav hazırlığına odaklanan yoğun programları ve profesyonel yurtdışı eğitim danışmanlığı sayesinde öğrencilerine güvenilir bir öğrenme ortamı sağlar",
      },
      points: [
        {
          title: "Esnek seçenekler",
          icon: "grup",
          text: {
            match:
              "Yüz yüze ve online seçenekler, Türk ve yabancı eğitmen kadrosu, küçük gruplar ve birebir özel ders imkânlarıyla öğrencilerin farklı ihtiyaçlarına yanıt verir.",
          },
        },
        { title: "Canlı ders altyapısı", icon: "kamera", text: { match: "Online canlı ders altyapısı (Zoom, Skype vb.)" } },
        { title: "23 yıldır hizmette", icon: "konum", text: { match: `Şube, Suadiye / Şaşkınbakkal ışıklarda ${SERVING} hizmet vermektedir.` } },
      ],
    },
    {
      kind: "corporate",
      title: { line: { heading: CAD_HIGHLIGHTS, take: [6] } },
      text: {
        match: "İş İngilizcesi, profesyonel iletişim ve çalışan performansına yönelik özelleştirilmiş programlar kurumun önemli hizmet alanlarındandır.",
      },
      clients: {
        match:
          "Chanel Lüx Moda, DigiTürk, STFA Group, Aromsa, Enerjisa, Norma Group, SSI Schafer, Still Arser, Mercedes-Benz, SETUR, TMSF, Türk Silahlı Kuvvetleri",
      },
    },
    { kind: "gallery" },
  ],
  gallery: [classPhoto(7, 1080, 810), classPhoto(8, 898, 810), classPhoto(9, 960, 960)],
  visit: {
    place: {
      title: { line: { heading: WRONG_KICKER, take: [1] } },
      text: {
        match: "Bağdat Caddesi üzerindeki Suadiye Zümrüt Apartmanı’nda bulunan merkez, modern sınıfları ve hijyen standartlarıyla rahat bir öğrenme ortamı sunar.",
      },
    },
  },
  details: [
    { title: { source: CAD_INTRO }, paras: range(0, 2).map((i) => ({ src: { heading: CAD_INTRO, take: [i] } })) },
    { title: { source: "Bağdat Caddesi Akademik" }, paras: [{ heading: CAD_H5 }] },
    { title: { source: CAD_HIGHLIGHTS }, paras: range(0, 5).map((i) => ({ src: { heading: CAD_HIGHLIGHTS, take: [i] } })) },
    { title: { line: { heading: CAD_HIGHLIGHTS, take: [6] } }, paras: [{ src: { heading: WRONG_KICKER, take: [0] } }] },
    { title: { line: { heading: WRONG_KICKER, take: [1] } }, paras: [{ src: { heading: WRONG_KICKER, take: [2] } }] },
  ],
  edits: {
    // Müşteri kararı 2026-09-30 + kullanıcı 2026-10-01: tüm şubeler "2003’ten bu yana 23 yıldır" (kaynak: "20 yıldır aynı adreste").
    "Dünya Dilleri Merkezi Bağdat Caddesi, İstanbul Anadolu Yakası’nda özellikle akademik yabancı dil eğitimleri ve sınav hazırlık programlarıyla öne çıkan köklü bir dil okuludur. Şube, Suadiye / Şaşkınbakkal ışıklarda 20 yıldır aynı adreste hizmet vermektedir.":
      `Dünya Dilleri Merkezi Bağdat Caddesi, İstanbul Anadolu Yakası’nda özellikle akademik yabancı dil eğitimleri ve sınav hazırlık programlarıyla öne çıkan köklü bir dil okuludur. Şube, Suadiye / Şaşkınbakkal ışıklarda ${SERVING} hizmet vermektedir.`,
    "2003 yılından bu yana faaliyet gösteren Dünya Dilleri Merkezi (DDM) zincirinin Bağdat Caddesi şubesidir ve özellikle IELTS, TOEFL, Üniversite Hazırlık Atlama ve TESTDAF, TELC, CELI / CILS hazırlık kurslarıyla tanınır. Modern öğretim yöntemleriyle bireysel ve kurumsal dil eğitimleri sunar.":
      `${SERVING} faaliyet gösteren Dünya Dilleri Merkezi (DDM) zincirinin Bağdat Caddesi şubesidir ve özellikle IELTS, TOEFL, Üniversite Hazırlık Atlama ve TESTDAF, TELC, CELI / CILS hazırlık kurslarıyla tanınır. Modern öğretim yöntemleriyle bireysel ve kurumsal dil eğitimleri sunar.`,
    // Müşteri kararı 2026-09-30 ("2003'ten bugüne - 23 yıl").
    "25 yılı aşkın deneyimiyle kurum, bireysel ve kurumsal dil eğitim programları sunar. Yüz yüze ve online seçenekler, Türk ve yabancı eğitmen kadrosu, küçük gruplar ve birebir özel ders imkânlarıyla öğrencilerin farklı ihtiyaçlarına yanıt verir.":
      `${EXPERIENCE} deneyimiyle kurum, bireysel ve kurumsal dil eğitim programları sunar. Yüz yüze ve online seçenekler, Türk ve yabancı eğitmen kadrosu, küçük gruplar ve birebir özel ders imkânlarıyla öğrencilerin farklı ihtiyaçlarına yanıt verir.`,
  },
  headingEdits: {
    // Müşteri kararı 2026-09-30 ("2003'ten bugüne - 23 yıl").
    [CAD_INTRO]: CAD_INTRO.replace("25 Yıllık", `${yearsSinceFounding()} Yıllık`),
  },
  ignored: [...COMMON_IGNORED, WRONG_KICKER_IGNORED],
  ignoredBlocks: [{ from: "Bağdat Caddesi Şubesi İletişim", to: KVKK_END, reason: FORM_REASON }],
  updated: UPDATED,
};

/* =====================================================================
 * Etiler (adres Levent tarafında; sayfa adresi `/levent-tanitim-sayfasi` değişmedi) — butik dil okulu: eğitim yapısı → programlar → eğitim modeli paneli → kurumsal alanlar → fotoğraflar
 * ===================================================================== */

const LEV_STRUCTURE = "Etiler Şubesi Eğitim Yapısı";
const LEV_H5 = KAD_H5; // Levent sayfasındaki h5, Kadıköy'ünkünün birebir kopyası ("Kadıköy'de" dahil) — headingEdits düzeltir.
const LEV_PROGRAMS = "Levent Şubesinde Dil ve Sınav Programları"; // kaynak başlık — `headingEdits` "Etiler" yapar

const LEVENT: BranchPromoDef = {
  branch: "etiler",
  path: "/levent-tanitim-sayfasi",
  source: "/levent-tanitim-sayfasi",
  meta: {
    title: "Etiler Dil Kursu | Dünya Dilleri Merkezi Etiler (Levent)",
    description:
      "Dünya Dilleri Merkezi Etiler Şubesi, Levent: en fazla 6–8 kişilik butik sınıflar, birebir ve kurumsal dil eğitimi, IELTS, TOEFL, GMAT, GRE hazırlık.",
    reasons: [
      'title: kaynak "Beşiktaş Şubesi Tanıtım Sayfası" — bayat şube adı (Beşiktaş şubesi yok); şubenin adı "Etiler" (müşteri kararı 2026-09-30). "Levent" yerel arama için kaldı: adres Levent tarafında',
      'description: kaynak "Dünya Dilleri Merkezi Beşiktaş Levent Şubesi" — bayat ad düzeltildi, sayfanın kendi olgularıyla genişletildi',
    ],
  },
  // Form bloğunun ardındaki bölüm üst yazısı ("… Etiler Şubesi") — şubenin adı kaynakta da "Etiler".
  h1: { line: { heading: LEV_H5, take: [103] } },
  hero: {
    lead: {
      match:
        "Dünya Dilleri Merkezi Etiler, İstanbul Avrupa Yakası’nın en merkezi noktalarından biri olan Etiler’de, bireysel ve kurumsal yabancı dil eğitimleri alanında hizmet veren butik bir dil okuludur.",
    },
    badge: { match: "butik bir dil okulu" },
  },
  card: [
    { label: "Sınıflar", text: { match: "Maksimum 6–8 kişilik butik sınıflar" } },
    { label: "Programlar", text: { match: "Bireysel ve kurumsal dil eğitimleri" } },
  ],
  blocks: [
    {
      kind: "highlights",
      tone: "sky",
      title: { source: LEV_STRUCTURE },
      lead: { match: "Dil öğrenmenin herkes için farklı bir yolculuk olduğuna inanıyoruz." },
      items: [
        `${EXPERIENCE} eğitim deneyimi`,
        "Bireysel ve kurumsal dil eğitimleri",
        "Yüz yüze ve online eğitim seçenekleri",
        "Türk ve yabancı eğitmenlerden oluşan uzman kadro",
        "Küçük gruplar ve birebir özel ders alternatifleri",
        "Yetişkinlere, çocuklara ve profesyonellere yönelik programlar",
        "Düzenli gelişim takibi ve geri bildirim sistemi",
        "Esnek ders planlaması ve kişiye özel eğitim programları",
      ].map((match) => ({ match })),
    },
    {
      kind: "programs",
      title: { source: LEV_PROGRAMS },
      lead: { match: "Etiler Şubemizde farklı yaş gruplarına ve hedeflere yönelik" },
      approach: {
        title: { match: "Eğitim Yaklaşımımız" },
        text: { match: "her eğitim programı, öğrencinin hedeflerine ulaşmasını sağlayacak şekilde titizlikle planlanır." },
      },
      columns: [
        {
          title: "Dil eğitimleri",
          rows: [{ label: "Biçim", text: { match: "Talebe göre birebir veya kurumsal programlar da planlanabilmektedir." } }],
          list: "languages",
        },
        {
          title: "Ulusal ve uluslararası sınavlar",
          rows: [{ label: "Biçim", text: { match: "küçük grup veya bireysel programlar" } }],
          list: "exams",
        },
      ],
    },
    {
      kind: "highlights",
      tone: "navy",
      title: { line: { heading: LEV_PROGRAMS, take: [2] } },
      lead: { match: "Dünya Dilleri Merkezi Etiler’de eğitim yalnızca ders saatlerinden ibaret değildir." },
      items: [
        "Maksimum 6–8 kişilik butik sınıflar",
        "Konuşma ve iletişim becerilerini merkeze alan eğitim modeli",
        "Kişiye özel birebir ders programları",
        "İş İngilizcesi ve profesyonel iletişim eğitimleri",
        "Çocuklar ve gençler için özel programlar",
        "Online canlı ders seçenekleri",
        "Düzenli ölçme, değerlendirme ve gelişim takibi",
        "Öğrenci odaklı, samimi ve destekleyici eğitim ortamı",
      ].map((match) => ({ match })),
    },
    {
      kind: "corporate",
      title: { line: { heading: WRONG_KICKER, take: [10] } },
      text: { match: "Kurumsal programlarımız, kurumların sektörlerine, çalışan profillerine ve hedeflerine göre özel olarak planlanmaktadır." },
      areas: [
        "Genel İngilizce",
        "İş İngilizcesi",
        "Profesyonel yazışma ve sunum becerileri",
        "Toplantı ve müzakere dili",
        "Yabancı çalışanlara Türkçe eğitimi",
        "Şirketlere özel raporlama ve seviye değerlendirme sistemleri",
      ].map((match) => ({ match })),
    },
    { kind: "gallery" },
  ],
  gallery: [classPhoto(10, 1080, 666), classPhoto(12, 960, 960)],
  visit: {
    place: {
      title: { line: { heading: WRONG_KICKER, take: [28] } },
      text: { match: "Merkezi konumu sayesinde Levent, Akatlar, Ulus, Beşiktaş, Gayrettepe, Maslak ve çevre bölgelerden kolay ulaşım imkânı sağlamaktadır." },
    },
  },
  details: [
    {
      title: { added: "Dünya Dilleri Merkezi Etiler" },
      paras: [{ src: { heading: null, take: [6, 7] }, join: true }, { src: { heading: null, take: [8] } }],
    },
    { title: { source: LEV_STRUCTURE }, paras: range(0, 7).map((i) => ({ src: { heading: LEV_STRUCTURE, take: [i] } })) },
    { title: { split: LEV_H5, at: ", " }, paras: [] },
    { title: { source: LEV_PROGRAMS }, paras: [0, 1].map((i) => ({ src: { heading: LEV_PROGRAMS, take: [i] } })) },
    { title: { line: { heading: LEV_PROGRAMS, take: [2] } }, paras: range(0, 9).map((i) => ({ src: { heading: WRONG_KICKER, take: [i] } })) },
    { title: { line: { heading: WRONG_KICKER, take: [10] } }, paras: range(11, 18).map((i) => ({ src: { heading: WRONG_KICKER, take: [i] } })) },
    { title: { line: { heading: WRONG_KICKER, take: [19] } }, paras: range(20, 27).map((i) => ({ src: { heading: WRONG_KICKER, take: [i] } })) },
    { title: { line: { heading: WRONG_KICKER, take: [28] } }, paras: [{ src: { heading: WRONG_KICKER, take: [29] } }] },
  ],
  edits: {
    // Başlık satırının sonunda kalmış kapanış tırnağı.
    "Etiler’de Konum ve Öğrenme Atmosferi”": "Etiler’de Konum ve Öğrenme Atmosferi",
    // Müşteri kararları 2026-09-30: şubenin adı "Etiler" + 19 dil, tüm şubelerde aynı liste (kaynak 15 dil sayıyordu;
    // "Arapça" ayrıca çıkarılmıştı).
    "Levent Şubemizde farklı yaş gruplarına ve hedeflere yönelik İngilizce, Almanca, Fransızca, İspanyolca, İtalyanca, Rusça, Çince, Arapça, yabancılar için Türkçe, Felemenkçe (Hollandaca), Japonca, Korece, Yunanca, İsveççe ve Bulgarca dil eğitimleri sunulmaktadır. Talebe göre birebir veya kurumsal programlar da planlanabilmektedir.":
      `Etiler Şubemizde farklı yaş gruplarına ve hedeflere yönelik ${LANGUAGES_TEXT} dil eğitimleri sunulmaktadır. Talebe göre birebir veya kurumsal programlar da planlanabilmektedir.`,
    // Müşteri kararı 2026-09-30 ("2003'ten bugüne - 23 yıl") — iki satır.
    "İstanbul Avrupa Yakası’nın en merkezi noktalarından biri olan Etiler’de, bireysel ve kurumsal yabancı dil eğitimleri alanında hizmet veren butik bir dil okuludur. 25 yılı aşkın eğitim deneyimine sahip Dünya Dilleri Merkezi çatısı altında faaliyet gösteren şubemiz, öğrenci odaklı yaklaşımı, deneyimli eğitmen kadrosu ve yüksek memnuniyet anlayışıyla dil eğitiminde kişiye özel çözümler sunmaktadır.":
      `İstanbul Avrupa Yakası’nın en merkezi noktalarından biri olan Etiler’de, bireysel ve kurumsal yabancı dil eğitimleri alanında hizmet veren butik bir dil okuludur. ${EXPERIENCE} eğitim deneyimine sahip Dünya Dilleri Merkezi çatısı altında faaliyet gösteren şubemiz, öğrenci odaklı yaklaşımı, deneyimli eğitmen kadrosu ve yüksek memnuniyet anlayışıyla dil eğitiminde kişiye özel çözümler sunmaktadır.`,
    "* 25 yılı aşkın eğitim deneyimi": `* ${EXPERIENCE} eğitim deneyimi`,
  },
  headingEdits: {
    // Kopyala-yapıştır artığı: Levent sayfasında "Kadıköy'de" (Aşama 0, kullanıcı bildirdi) → sayfanın kendi dili "Etiler'de".
    [LEV_H5]: LEV_H5.replace("Merkezi Kadıköy'de", "Merkezi Etiler'de"),
    // Müşteri kararı 2026-09-30: şubenin adı "Etiler".
    [LEV_PROGRAMS]: LEV_PROGRAMS.replace("Levent", "Etiler"),
  },
  ignored: [
    ...COMMON_IGNORED,
    WRONG_KICKER_IGNORED,
    { line: "Dünya Dilleri Merkezi Etiler", reason: "hero üst yazısı; aynı bilgi H1'de" },
    { line: "Etiler Şubesi", reason: "şube adı etiketi (h6) — aynı bilgi H1 ve künyede" },
  ],
  ignoredBlocks: [{ from: "Levent Şubesi İletişim", to: "Buna göre; Formu oldurmak", reason: FORM_REASON }],
  updated: UPDATED,
};

/** Menü / footer sırası (`data/branches.ts` `BRANCH_ORDER`). Ümraniye YOK: tanıtım sayfası yapılmayacak (müşteri kararı 2026-09-30). */
export const BRANCH_PROMOS: BranchPromoDef[] = [KADIKOY, CADDE, LEVENT, ATASEHIR];

export const BRANCH_PROMO_PATHS: string[] = BRANCH_PROMOS.map((p) => p.path);

// Hafif adres listesi (Ana Sayfa / iletişim bağlantıları) ile tanımlar birebir aynı olmalı.
for (const p of BRANCH_PROMOS) {
  if (PROMO_PATHS[p.branch] !== p.path) throw new Error(`data/branchPromoPaths.ts: ${p.branch} adresi "${p.path}" değil.`);
}
if (Object.keys(PROMO_PATHS).length !== BRANCH_PROMOS.length) throw new Error("data/branchPromoPaths.ts: tanımı olmayan adres var.");
