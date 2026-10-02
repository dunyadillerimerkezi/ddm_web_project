import { LANGUAGE_PAGES } from "@/data/languages";
import { EXAMS, EXAM_GROUPS } from "@/data/exams";
import { ENGLISH_PROGRAMS, ENGLISH_PROGRAM_PATHS } from "@/data/englishPrograms";
import { OTHER_PROGRAM_PAGES } from "@/data/otherPrograms";
import { ABROAD_HUB, CORPORATE_HUB, PRIVATE_HUB } from "@/data/hubs";
import { ONLINE_HUB } from "@/data/onlineLessons";
import { examHref } from "@/lib/examContent";
import { isProducedPage } from "@/lib/pageRegistry";

/**
 * PF (2026-09-29) — İletişim formunun "Kurs tercihi" listesi.
 *
 * Elle yazılmaz: her seçenek sitede YAYINDA olan bir sayfadan türetilir, değeri o sayfanın adresidir
 * (form bir sayfaya konunca kendi adresini `course` olarak verir → o kurs hazır seçili gelir).
 * Eski sitenin formundaki 23 kalemlik liste (şube iletişim kayıtlarının gövdesi) başlangıç noktasıydı;
 * kullanıcı kararıyla (2026-09-29) sitede sayfası olup eski listede olmayanlar da eklendi (PTE, YÖKDİL,
 * TOEFL Essentials / Primary, TestDaF, İngiltere Vize, Fransızca Aile Birleşimi, İngilizce programları,
 * Online / Kurumsal). Tercüme ve Pegasus kurs değil, listede yok.
 *
 * YALNIZ SUNUCUDA import edilir — dil / sınav veri dosyaları büyük, istemci paketine girmemeli.
 * `ContactForm` listeyi burada hazırlayıp istemci parçasına küçük bir dizi olarak geçirir.
 */

export type CourseOption = { value: string; label: string };
export type CourseGroup = { label: string; options: CourseOption[] };

/**
 * Formdaki arayüz etiketi dilin veri adından farklıysa. "Türkçe" tek başına yabancılar için olduğunu
 * söylemiyor (eski form: "Yabancılar İçin Türkçe"); "Felemenkçe" kaynak başlıkların ve eski formun yazımı
 * (veri adı "Flemenkçe" — site geneli düzeltme kullanıcıya soruldu, bekleyen-sorular.md).
 */
const LANGUAGE_LABELS: Record<string, string> = {
  tr: "Yabancılar İçin Türkçe",
  nl: "Felemenkçe",
};

function pageLabel(path: string): string {
  const page = OTHER_PROGRAM_PAGES.find((p) => p.path === path);
  if (!page) throw new Error(`courseOptions: ${path} için Diğer Program sayfası bulunamadı`);
  return page.label;
}

function build(): CourseGroup[] {
  const languages = LANGUAGE_PAGES.map((l) => ({
    value: `/yabanci-dil-egitimleri/${l.slug}`,
    label: LANGUAGE_LABELS[l.key] ?? l.name,
  }));

  // "Diğer sınavlar" dizinindeki grup sırası — ilgili sınavlar yan yana dursun.
  const exams = EXAM_GROUPS.flatMap((g) => g.slugs).map((slug) => {
    const exam = EXAMS.find((e) => e.slug === slug);
    if (!exam) throw new Error(`courseOptions: EXAM_GROUPS'taki ${slug} EXAMS'ta yok`);
    return { value: examHref(slug), label: exam.name };
  });

  const kids = "/diger-program/cocuklar-icin-ingilizce-kursu";
  const business = "/diger-program/business-english";
  const english = [
    ...ENGLISH_PROGRAMS.map((p, i) => ({ value: ENGLISH_PROGRAM_PATHS[i], label: p.label })),
    { value: kids, label: pageLabel(kids) },
    { value: business, label: pageLabel(business) },
  ];

  const other = [PRIVATE_HUB, ONLINE_HUB, CORPORATE_HUB, ABROAD_HUB].map((h) => ({ value: h.path, label: h.label }));

  const groups = [
    { label: "Yabancı dil", options: languages },
    { label: "Sınav hazırlık", options: exams },
    { label: "İngilizce programları", options: english },
    { label: "Diğer programlar", options: other },
  ];
  // Listede yalnız yayında olan sayfalar — sayfası kalkan kurs formda kalmasın (build düşer).
  const missing = groups.flatMap((g) => g.options).filter((o) => !isProducedPage(o.value));
  if (missing.length) throw new Error(`courseOptions: sayfası üretilmeyen seçenek: ${missing.map((o) => o.value).join(", ")}`);
  return groups;
}

export const COURSE_GROUPS: CourseGroup[] = build();

/**
 * Listede karşılığı olmayan ama bir kursa ait sayfa kümesinin kökü → o kurs. İngilizce seviye sayfaları
 * (`/ingilizce-kurslari/...`) İngilizce Kursu'na aittir.
 */
const COURSE_ALIASES: Record<string, string> = {
  "/ingilizce-kurslari": "/yabanci-dil-egitimleri/ingilizce-kursu",
};

/** Seçenek adresi → etiket. */
const LABELS = new Map(COURSE_GROUPS.flatMap((g) => g.options.map((o) => [o.value, o.label] as const)));
for (const [from, to] of Object.entries(COURSE_ALIASES)) {
  if (!LABELS.has(to)) throw new Error(`courseOptions: ${from} takma adının hedefi listede yok: ${to}`);
}

/**
 * Ön seçim: sayfanın kendi adresi listede yoksa üst adreslere çıkılır — Almanca özel ders
 * (`/diger-program/ozel-dersler/...`) → Özel Dersler, Boğaziçi (`.../proficiency-kursu/...`) → Proficiency,
 * Kanada (`/yurtdisi-egitim/...`) → Yurtdışı Eğitim. Hiçbiri tutmazsa `null` (kurs seçili gelmez).
 */
export function courseOption(path: string | undefined): string | null {
  if (!path) return null;
  const parts = path.split("#")[0].split("?")[0].split("/").filter(Boolean);
  for (let n = parts.length; n > 0; n--) {
    const at = `/${parts.slice(0, n).join("/")}`;
    if (LABELS.has(at)) return at;
    if (COURSE_ALIASES[at]) return COURSE_ALIASES[at];
  }
  return null;
}

/** Seçeneğin etiketi ("IELTS", "Almanca") — formun varsayılan başlığı için. */
export function courseLabel(value: string): string | undefined {
  return LABELS.get(value);
}
