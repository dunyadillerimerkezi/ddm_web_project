import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteChrome } from "@/components/layout";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { UniversityHero } from "@/components/sections/UniversityHero";
import { UniversityBody } from "@/components/sections/UniversityBody";
import { UniversityGrid } from "@/components/sections/UniversityGrid";
import { LinkRow } from "@/components/sections/LinkRow";
import { CtaBand } from "@/components/sections/CtaBand";
import { CourseDatePage } from "@/components/sections/CourseDatePage";
import { RichRoute } from "@/components/sections/RichRoute";
import { assertNoSlugCollision, getRichPage, richMetadata, richPathsUnder } from "@/lib/richPages";
import { UNIVERSITIES, UNIVERSITY_INDEX, getUniversityDef } from "@/data/universities";
import { getUniversityExam } from "@/data/universityExams";
import { PROF_UNIVERSITIES } from "@/data/singlePages";
import { DEFAULT_BRANCH } from "@/data/branches";
import { getUniversityPage, type UniversityPage, type UniversityDef } from "@/lib/universityContent";
import { universityFlow } from "@/lib/universityFlow";
import { getCourseDatePage } from "@/lib/courseDateContent";
import { COURSE_DATES, findCourseDateEntry } from "@/data/courseDates";
import { absoluteUrl } from "@/lib/site";
import type { Crumb, LinkRowItem } from "@/lib/types";

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

/** Izgaradaki rozet: doğrulanmış güncel kısa ad (OPAE, MÜYYES, ACUPEP PPT…) kaynaktaki eski kodun
 *  (Acıbadem "AYES") önüne geçer; uzun adlar rozete sığmadığı için kaynak kodu / "Proficiency" kalır. */
const GRID_ITEMS = UNIVERSITY_INDEX.map((u) => {
  const exam = getUniversityExam(u.slug)?.exam;
  return exam && exam.length <= 10 ? { ...u, examCode: exam } : u;
});

const ORNEK_SORULAR = "/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-ornek-sinav-sorulari";

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

/**
 * UI turu (2026-09-28, kullanıcı: "A · sınav akışı"): degrade hero + sağda sınav akışı
 * (`UniversityHero`), satır gövdesi (`UniversityBody`: sınav yapısı → doğrulanmış sık sorulanlar →
 * kaynak metnin bölümleri → şubeler). "Tarih bekleniyor" takvim tablosu ve gönderilemeyen form
 * kaldırıldı; "Ücretsiz Seviye Tespit Sınavı" butonu dil kursundaki kararla kalktı.
 */
function UniversityPageBody({ def, page }: { def: UniversityDef; page: UniversityPage }) {
  const crumbs: Crumb[] = [
    { label: "Anasayfa", href: "/" },
    { label: "Sınav Hazırlık", href: "/sinav-hazirlik-egitimleri" },
    { label: "Proficiency Kursu", href: "/sinav-hazirlik-egitimleri/proficiency-kursu" },
    { label: def.name },
  ];
  const info = getUniversityExam(def.slug);
  // Sınavın güncel adı: doğrulanmış kayıt → P4 örnek sorular listesi → kaynak kodu.
  const examName =
    info?.exam ?? PROF_UNIVERSITIES.find((u) => u.slug === def.slug)?.exam ?? def.examCode ?? "İngilizce Yeterlik Sınavı";
  const flow = universityFlow(examName, page.sections, info);

  return (
    <SiteChrome ctaLabel="İletişime Geçin" ctaHref="#iletisim">
      <UniversityHero
        crumbs={crumbs}
        code={info?.exam ?? def.examCode}
        h1={page.h1}
        lead={page.metaDescription}
        primary={{ label: "Bilgi Al", href: "#iletisim" }}
        secondary={{ label: "Kurs takvimi", href: "#kurs-takvimi" }}
        flow={flow}
        guide={{ label: "Örnek sınav soruları", href: ORNEK_SORULAR }}
      />

      <ProcessSteps steps={page.steps} />

      <UniversityBody def={def} page={page} info={info} />

      <UniversityGrid items={GRID_ITEMS} current={def.slug} />

      <LinkRow
        ground="gray"
        kicker="İLGİLİ SAYFALAR"
        title="Proficiency hakkında diğer sayfalar"
        items={RELATED_PAGES}
        density="cards"
      />

      <CtaBand
        id="iletisim"
        ground="gray"
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
