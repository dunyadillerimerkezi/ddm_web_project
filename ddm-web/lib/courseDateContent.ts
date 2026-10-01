/**
 * Faz 6.6 — Şube Kurs Tarihi içerik çözücüsü.
 *
 * `lib/contentSections.ts`in jenerik `SectionResolver`ini bu sayfa tipinin
 * kendi sözleşmesiyle kullanır (dosya başlığı satır 5-7'nin öngördüğü gibi —
 * `lib/languageContent.ts` ve `lib/universityContent.ts` ile aynı desen).
 *
 * KARAR (kullanıcı onayı, plan §3): program bloklarının GÜN/SAAT/SPEC/ETÜT
 * içeriği `data/courseDates.ts`de ELLE yazılır (universityContent.ts'teki
 * `ExamSection` emsali — serbest metnin "Program Detayları:" gibi tek
 * satırlık, dash-ayraçlı grameri kayıttan kayda tutarsız olduğu için
 * (bkz. plan Aşama 0 denetimi: aynı kaydın hafta içi/sonu bloklarında bile
 * "Yoğun Program Speaking" / "Yoğun Program - Speaking" farkı var) güvenilir
 * bir otomatik ayrıştırıcı yazılamaz). Bu dosya SADECE şunu garanti eder:
 * her bloğun `rawLines`i kaynaktaki paragraflarla BİREBİR eşleşiyor mu —
 * eşleşmiyorsa (kaynak metni değiştiyse) build DÜŞER. Elle yazılan
 * specs/study/days/slots bu round-trip doğrulamasının ARKASINDA durur.
 *
 * `kicker` / `icon` / `ctaLabel` / bloğun `title`'ı şablonda HER ZAMAN
 * `kind`e (ve `heading`e) bağlı sabitler — kayıttan kayda değişmiyor
 * (`DDM Şube Kurs Tarihi Sayfası.dc.html` `pageData()`'daki 3 örnek bunu
 * doğruluyor). Bu yüzden `data/courseDates.ts`de tekrar tekrar YAZILMAZ,
 * burada `kind`den türetilir — 72 kayıt × 3 blokta yazım hatası riski kalkar.
 */

import { BRANCHES, currentBranchName } from "@/data/branches";
import siteContent from "@/data/site_content.json";
import { parseRecord, SectionResolver, ContentSectionsError, type SiteContentRecord } from "./contentSections";
import type {
  CourseDatePage,
  ContentDiagnostic,
  Crumb,
  ProgramBlock,
  ProgramKind,
  Stat,
  WeekGridRow,
} from "./types";

const RECORDS = siteContent as SiteContentRecord[];

const KIND_KICKER: Record<ProgramKind, string> = {
  haftaici: "HAFTA İÇİ",
  haftasonu: "HAFTA SONU",
  birebir: "BİREBİR ÖZEL DERS",
};

const KIND_ICON: Record<ProgramKind, ProgramBlock["icon"]> = {
  haftaici: "takvim",
  haftasonu: "takvim",
  birebir: "ozelders",
};

const KIND_CTA: Record<ProgramKind, string> = {
  haftaici: "Hafta İçi Grubu İçin Bilgi Al",
  haftasonu: "Hafta Sonu Grubu İçin Bilgi Al",
  birebir: "Özel Ders İçin Bilgi Al",
};

/** Elle yazılan blok girdisi — `kicker`/`icon`/`ctaLabel`/`title` burada YOK,
 *  `kind`den ve `heading`den türetilir (bkz. dosya başlığı). */
export type ProgramBlockEntry = {
  kind: ProgramKind;
  /** Kaynaktaki BAŞLIK — hem `resolver.take()`in anahtarı hem `block.title`. */
  heading: string;
  /** Bu başlık altındaki paragrafların BİREBİR beklenen hâli (round-trip). */
  rawLines: string[];
  days: ProgramBlock["days"];
  slots: ProgramBlock["slots"];
  hoursNote: ProgramBlock["hoursNote"];
  specs: ProgramBlock["specs"];
  study: ProgramBlock["study"];
  note: ProgramBlock["note"];
  startDate: ProgramBlock["startDate"];
};

export type CourseDateEntry = {
  branch: CourseDatePage["branch"];
  courseSlug: string;
  courseName: string;
  category: CourseDatePage["category"];
  pageSlug: string;
  /** `site_content.json`daki eski TAM path (domain hariç), kaydı bulmak için. */
  sourcePath: string;
  crumbRoot: string;
  crumbRootHref: string;
  crumbCourse: string;
  crumbCourseHref: string;
  /** Hero groupBadge + hızlı bakış şeridi — elle çıkarılmış, bkz. types.ts. */
  groupSize: number | null;
  months: number | null;
  hours: number | null;
  programs: ProgramBlockEntry[];
};

function findRecord(sourcePath: string): SiteContentRecord {
  const rec = RECORDS.find((r) => r.url.endsWith(sourcePath));
  if (!rec) {
    throw new ContentSectionsError(`courseDateContent: kayıt bulunamadı — "${sourcePath}"`);
  }
  return rec;
}

function toWeekGridRows(programs: ProgramBlock[]): WeekGridRow[] {
  const rows: WeekGridRow[] = [];
  for (const p of programs) {
    for (const s of p.slots) {
      rows.push({ name: s.name, range: `${s.start} – ${s.end}`, kind: p.kind, days: p.days });
    }
  }
  return rows;
}

/** Yalnız GERÇEKTEN çözülmüş olgular çipe döner — 6.5'teki `trustStats` deseni.
 *  `groupSize`/`months`/`hours` entry'den (elle çıkarılmış, bkz. types.ts). */
function quickFacts(
  programs: ProgramBlock[],
  groupSize: number | null,
  months: number | null,
  hours: number | null,
): Stat[] {
  const facts: Stat[] = [];
  if (groupSize) facts.push({ icon: "grup", value: String(groupSize), label: "kişilik grup" });
  if (months) facts.push({ icon: "sure", value: String(months).replace(".", ","), label: "ay program süresi" });
  if (hours) facts.push({ icon: "saat", value: String(hours), label: "saat toplam ders" });
  if (programs.length > 0) {
    facts.push({ icon: "takvim", value: String(programs.length), label: "program seçeneği" });
  }
  return facts;
}

export function getCourseDatePage(entry: CourseDateEntry): CourseDatePage {
  const context = `courseDateContent[${entry.pageSlug}]`;
  const record = findRecord(entry.sourcePath);
  const sections = parseRecord(record);
  const resolver = new SectionResolver(sections);

  const titleHeading = record.headings[0]?.text;
  if (!titleHeading) {
    throw new ContentSectionsError(`${context}: kayıtta hiç başlık yok`);
  }
  const h1Fallback = record.headings[0].level !== "h1";
  if (h1Fallback) {
    console.warn(`[h1-fallback] ${context}: h1 yok, ilk başlığa (${record.headings[0].level}) düşüldü`);
  }

  const introParas = resolver.take({ heading: titleHeading, take: "all" }, `${context}: giriş`) ?? [];

  const programs: ProgramBlock[] = entry.programs.map((p) => {
    const paras = resolver.take({ heading: p.heading, take: "all" }, `${context}: ${p.kind}`) ?? [];
    if (paras.length !== p.rawLines.length || paras.some((line, i) => line !== p.rawLines[i])) {
      throw new ContentSectionsError(
        `${context}: "${p.heading}" bloğunun rawLines'ı kaynaktaki paragraflarla eşleşmiyor ` +
          `(kaynak metni değişmiş olabilir — data/courseDates.ts'i güncelleyin).\n` +
          `  beklenen: ${JSON.stringify(p.rawLines)}\n` +
          `  kaynak:   ${JSON.stringify(paras)}`,
      );
    }
    const block: ProgramBlock = {
      kind: p.kind,
      kicker: KIND_KICKER[p.kind],
      title: currentBranchName(p.heading),
      icon: KIND_ICON[p.kind],
      days: p.days,
      slots: p.slots,
      hoursNote: p.hoursNote,
      specs: p.specs,
      study: p.study,
      note: p.note,
      startDate: p.startDate,
      ctaLabel: KIND_CTA[p.kind],
    };
    return block;
  });

  resolver.assertCoverage([], context);

  const category = entry.category;
  const href = `/${category}/${entry.courseSlug}/${entry.pageSlug}`;

  // Şube adı tek kaynaktan (`data/branches.ts`): kaynak başlıklardaki bayat "Beşiktaş" → "Etiler" (müşteri kararı 2026-09-30).
  const branchLabel = BRANCHES[entry.branch].name;

  const crumbs: Crumb[] = [
    { label: "Anasayfa", href: "/" },
    { label: entry.crumbRoot, href: entry.crumbRootHref },
    { label: entry.crumbCourse, href: entry.crumbCourseHref },
    { label: `${branchLabel} Şubesi` },
  ];

  const diagnostics: ContentDiagnostic[] = h1Fallback
    ? [{ kind: "h1-fallback", detail: `${context}: title="${record.title}"` }]
    : [];

  return {
    branch: entry.branch,
    courseSlug: entry.courseSlug,
    courseName: entry.courseName,
    category,
    pageSlug: entry.pageSlug,
    href,
    title: currentBranchName(record.title),
    metaDescription: currentBranchName(record.meta_description),
    h1: currentBranchName(titleHeading),
    h1Fallback,
    crumbs,
    intro: introParas,
    programsTitle: `${entry.courseName} Kursu ${branchLabel} Ders Programı Seçenekleri`,
    programs,
    groupSize: entry.groupSize,
    months: entry.months,
    hours: entry.hours,
    quickFacts: quickFacts(programs, entry.groupSize, entry.months, entry.hours),
    otherBranches: [],
    otherCourses: [],
    schema: {
      courseName: entry.courseName,
      courseCode: null,
      branchName: branchLabel,
      startDates: programs.map((p) => p.startDate).filter((d): d is string => d !== null),
    },
    diagnostics,
  };
}

export function weekGridRows(page: CourseDatePage): WeekGridRow[] {
  return toWeekGridRows(page.programs);
}
