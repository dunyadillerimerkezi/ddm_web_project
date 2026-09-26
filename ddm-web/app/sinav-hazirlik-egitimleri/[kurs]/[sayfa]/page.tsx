import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CourseDatePage } from "@/components/sections/CourseDatePage";
import { RichContentPage } from "@/components/sections/RichContentPage";
import { COURSE_DATES, findCourseDateEntry } from "@/data/courseDates";
import { getCourseDatePage } from "@/lib/courseDateContent";
import { assertNoSlugCollision, getRichPage, richMetadata, richPathsUnder } from "@/lib/richPages";
import { absoluteUrl } from "@/lib/site";

/**
 * DAĞITICI route — `/sinav-hazirlik-egitimleri/{kurs}/{sayfa}` altında iki tip
 * (proficiency kendi statik klasöründeki dağıtıcıdan):
 *   - Faz 6.6 Şube Kurs Tarihi (`data/courseDates.ts`) → `CourseDatePage`
 *   - P4 Zengin İçerik (özel ders, online…; `lib/richPages.ts`) → `RichContentPage`
 * İki listenin slug'ları çakışmaz (build'de denetlenir, aşağıda).
 */

const CATEGORY = "sinav-hazirlik-egitimleri";
/** `proficiency-kursu` statik klasör — alt sayfaları oradaki dağıtıcıda. */
const OWN_FOLDER = "proficiency-kursu";
const PREFIX = `/${CATEGORY}/`;

const courseDateParams = COURSE_DATES.filter((e) => e.category === CATEGORY && e.courseSlug !== OWN_FOLDER).map((e) => ({
  kurs: e.courseSlug,
  sayfa: e.pageSlug,
}));

const richParams = richPathsUnder(PREFIX, OWN_FOLDER).map(([kurs, sayfa]) => ({ kurs, sayfa }));

assertNoSlugCollision(
  "sınav dağıtıcı",
  richParams.map((r) => `${r.kurs}/${r.sayfa}`),
  courseDateParams.map((c) => `${c.kurs}/${c.sayfa}`),
);

export const dynamicParams = false;

export function generateStaticParams() {
  return [...courseDateParams, ...richParams];
}

type Params = { kurs: string; sayfa: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { kurs, sayfa } = await params;

  const entry = findCourseDateEntry(CATEGORY, kurs, sayfa);
  if (entry) {
    const page = getCourseDatePage(entry);
    return {
      title: page.title,
      description: page.metaDescription,
      alternates: { canonical: absoluteUrl(page.href) },
    };
  }

  const rich = getRichPage(`${PREFIX}${kurs}/${sayfa}`);
  if (rich) return richMetadata(rich);

  return {};
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { kurs, sayfa } = await params;

  const entry = findCourseDateEntry(CATEGORY, kurs, sayfa);
  if (entry) return <CourseDatePage page={getCourseDatePage(entry)} />;

  const rich = getRichPage(`${PREFIX}${kurs}/${sayfa}`);
  if (rich) return <RichContentPage page={rich} />;

  notFound();
}
