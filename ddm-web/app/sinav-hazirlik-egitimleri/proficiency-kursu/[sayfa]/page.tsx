import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteChrome } from "@/components/layout";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ExamStructure } from "@/components/sections/ExamStructure";
import { DetailSections } from "@/components/sections/DetailSections";
import { PageSection } from "@/components/sections/PageSection";
import { ScheduleTable } from "@/components/sections/ScheduleTable";
import { UniversityGrid } from "@/components/sections/UniversityGrid";
import { LinkRow } from "@/components/sections/LinkRow";
import { CtaBand } from "@/components/sections/CtaBand";
import { CourseDatePage } from "@/components/sections/CourseDatePage";
import { RichRoute } from "@/components/sections/RichRoute";
import { assertNoSlugCollision, getRichPage, richMetadata, richPathsUnder } from "@/lib/richPages";
import { UNIVERSITIES, UNIVERSITY_INDEX, getUniversityDef } from "@/data/universities";
import type { HomeStat } from "@/data/home";
import { BRANCH_LIST, DEFAULT_BRANCH } from "@/data/branches";
import { getUniversityPage, type UniversityPage, type UniversityDef } from "@/lib/universityContent";
import { getCourseDatePage } from "@/lib/courseDateContent";
import { COURSE_DATES, findCourseDateEntry } from "@/data/courseDates";
import { absoluteUrl } from "@/lib/site";
import type { Crumb, LinkRowItem, ScheduleColumn, ScheduleTableRow } from "@/lib/types";
import { DataMissingNotice } from "@/components/ui";

/**
 * Faz 6.5 (üniversite proficiency) + Faz 6.6 (Kadıköy Proficiency kurs
 * tarihi) aynı klasörü paylaşıyor — DAĞITICI route.
 *
 * NEDEN: Next.js statik segmenti dinamiğe tercih eder. `proficiency-kursu`
 * statik bir klasör olduğu için `/sinav-hazirlik-egitimleri/proficiency-kursu/*`
 * altındaki HER ŞEY buraya gelir; ayrı bir `[kurs]/[sayfa]` route'u bu 4
 * kurs-tarihi sayfasını (Kadıköy/Ataşehir/Bağdat/Etiler × Proficiency)
 * hiçbir zaman yakalayamaz (plan §4). Bu yüzden `[universite]` segmenti
 * `[sayfa]`ya genişletildi: slug bir üniversite ise ÜNİVERSİTE sayfası,
 * bir kurs-tarihi `pageSlug`ıysa ŞUBE KURS TARİHİ sayfası render edilir.
 * 21 üniversite sayfası ve 42 redirect'i BU DEĞİŞİKLİKTEN etkilenmedi.
 * P4: üçüncü tip — Zengin İçerik (`lib/richPages.ts`; burada özel ders ve Proficiency Nedir).
 */

const PROFICIENCY_PREFIX = "/sinav-hazirlik-egitimleri/proficiency-kursu/";
const richPage = (sayfa: string) => getRichPage(`${PROFICIENCY_PREFIX}${sayfa}`);

const SCHEDULE_COLUMNS: ScheduleColumn[] = [
  { key: "sube", head: "ŞUBE", rowLabel: null },
  { key: "tarih", head: "BAŞLANGIÇ TARİHİ", rowLabel: "BAŞLANGIÇ TARİHİ" },
  { key: "gunSaat", head: "GÜN VE SAAT", rowLabel: null },
  { key: "cta", head: "", rowLabel: null },
];

/** 21/21 üniversite kaydında tarih/saat verisi yok — hepsi "bekleniyor". */
function scheduleRows(examLabel: string | null): ScheduleTableRow[] {
  const note = examLabel ? `${examLabel} Proficiency hazırlık atlama` : "Proficiency hazırlık atlama";
  return BRANCH_LIST.map((branch) => ({
    key: branch.slug,
    group: null,
    cells: [
      { kind: "title", title: branch.name, note },
      { kind: "text", value: null, pending: "tarih bekleniyor" },
      { kind: "text", value: null, pending: "gün / saat bekleniyor" },
      { kind: "cta", label: "Ön Bilgi Formu", href: "#iletisim" },
    ],
  }));
}

/** Hızlı bakış şeridi — kaynakta olmayan olgu uydurulmaz, öğe düşer (§5). */
function trustStats(page: UniversityPage): HomeStat[] {
  const stats: HomeStat[] = [];
  if (page.sections.length > 0) {
    stats.push({ icon: "kullanim", value: String(page.sections.length), label: "sınav bölümü" });
  }
  stats.push({ icon: "konum", value: "5", label: "İstanbul şubesi" });
  stats.push({ icon: "takvim", value: "1", label: "seviye tespit sınavıyla başlangıç" });
  return stats;
}

const RELATED_PAGES: LinkRowItem[] = [
  { label: "Proficiency Nedir", href: "/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-nedir" },
  { label: "Proficiency Sınavı", href: "/sinav-hazirlik-egitimleri/proficiency-kursu" },
  {
    label: "Örnek Sınav Soruları",
    href: "/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-ornek-sinav-sorulari",
  },
  { label: "Proficiency Özel Ders", href: "/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-ozel-ders" },
];

export const dynamicParams = false;

export function generateStaticParams() {
  const universities = UNIVERSITIES.map((u) => ({ sayfa: u.slug }));
  const courseDates = COURSE_DATES.filter((e) => e.courseSlug === "proficiency-kursu").map((e) => ({
    sayfa: e.pageSlug,
  }));
  const rich = richPathsUnder(PROFICIENCY_PREFIX).map(([sayfa]) => ({ sayfa }));
  assertNoSlugCollision(
    "proficiency dağıtıcı",
    rich.map((r) => r.sayfa),
    [...universities, ...courseDates].map((p) => p.sayfa),
  );
  return [...universities, ...courseDates, ...rich];
}

type Params = { sayfa: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { sayfa } = await params;

  const def = getUniversityDef(sayfa);
  if (def) {
    const page = getUniversityPage(def);
    return {
      title: page.record.title,
      description: page.metaDescription,
      alternates: {
        canonical: absoluteUrl(`/sinav-hazirlik-egitimleri/proficiency-kursu/${sayfa}`),
      },
    };
  }

  const entry = findCourseDateEntry("sinav-hazirlik-egitimleri", "proficiency-kursu", sayfa);
  if (entry) {
    const page = getCourseDatePage(entry);
    return {
      title: page.title,
      description: page.metaDescription,
      alternates: { canonical: absoluteUrl(page.href) },
    };
  }

  const rich = richPage(sayfa);
  if (rich) return richMetadata(rich);

  return {};
}

function UniversityPageBody({ def, page }: { def: UniversityDef; page: UniversityPage }) {
  const crumbs: Crumb[] = [
    { label: "Anasayfa", href: "/" },
    { label: "Sınav Hazırlık", href: "/sinav-hazirlik-egitimleri" },
    { label: "Proficiency Kursu", href: "/sinav-hazirlik-egitimleri/proficiency-kursu" },
    { label: def.name },
  ];

  return (
    <SiteChrome ctaLabel="İletişime Geçin" ctaHref="#iletisim">
      <PageHero
        crumbs={crumbs}
        code={def.examCode}
        codeVariant="pill"
        branchBadge="Hazırlık atlama · Proficiency"
        showCertBadge={false}
        outlineBadge="5 şubede"
        titleSize="uni"
        h1={page.h1}
        lead={page.metaDescription}
        primary={{ label: "Ücretsiz Seviye Tespit Sınavı", href: "#iletisim" }}
        secondary={{ label: "Bilgi Al", href: "#kurs-takvimi" }}
        art={{ mode: "uni", name: def.illo, chip1: def.illoChip1, chip2: def.illoChip2 }}
        stats={trustStats(page)}
      />

      <ProcessSteps steps={page.steps} />

      {page.structureTitle && (
        <ExamStructure
          title={page.structureTitle}
          lead={page.structureLead}
          sections={page.sections}
          detailIds={page.sectionDetailIds}
        />
      )}

      {page.details.length > 0 && <DetailSections details={page.details} />}

      <PageSection
        id="kurs-takvimi"
        ground="gray"
        kicker="KURS TAKVİMİ"
        title={`${def.name} Proficiency Kursu Şube ve Takvimi`}
        lead="Bu eğitim aşağıdaki şubelerimizde sunulmaktadır. Size uygun olan şubenin ön bilgi formundan ve şubelerin iletişim bölümünden bize yazın sorularınızı cevaplayalım."
      >
        <ScheduleTable
          columns={SCHEDULE_COLUMNS}
          rows={scheduleRows(def.examLabel)}
          layout="uni4"
          missingNotice={
            <DataMissingNotice compact>
              Proficiency programı kişiye özel olduğu için kaynak içerikte tarih/saat verisi yok; şube bazlı
              takvim müşteriden bekleniyor.
            </DataMissingNotice>
          }
        />
      </PageSection>

      <UniversityGrid items={UNIVERSITY_INDEX} current={def.slug} />

      <LinkRow
        ground="gray"
        kicker="İLGİLİ SAYFALAR"
        title="Proficiency hakkında diğer sayfalar"
        items={RELATED_PAGES}
        density="cards"
      />

      <CtaBand
        id="iletisim"
        ground="light"
        title="Bizimle İletişime Geçin — seviye tespit sınavıyla programınızı belirleyelim."
        sub={[DEFAULT_BRANCH.phone, DEFAULT_BRANCH.mail].filter(Boolean).join(" · ")}
        primary={{ label: "Bizimle İletişime Geçin", href: DEFAULT_BRANCH.href }}
        secondary={{ label: "Şubelerimiz", href: "/ddm-iletisim" }}
      />
    </SiteChrome>
  );
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { sayfa } = await params;

  const def = getUniversityDef(sayfa);
  if (def) {
    const page = getUniversityPage(def);
    return <UniversityPageBody def={def} page={page} />;
  }

  const entry = findCourseDateEntry("sinav-hazirlik-egitimleri", "proficiency-kursu", sayfa);
  if (entry) {
    const page = getCourseDatePage(entry);
    return <CourseDatePage page={page} />;
  }

  const rich = richPage(sayfa);
  if (rich) return <RichRoute entry={rich} />;

  notFound();
}
