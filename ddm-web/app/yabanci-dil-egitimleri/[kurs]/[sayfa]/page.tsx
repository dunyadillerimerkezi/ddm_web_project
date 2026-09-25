import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CourseDatePage } from "@/components/sections/CourseDatePage";
import { RichContentPage } from "@/components/sections/RichContentPage";
import { COURSE_DATES, findCourseDateEntry } from "@/data/courseDates";
import { getPrivateLessonDef } from "@/data/privateLessons";
import { getCourseDatePage } from "@/lib/courseDateContent";
import { assertNoSlugCollision, getPrivateLessonPage, richMetadata, richPathsUnder } from "@/lib/richContent";
import { absoluteUrl } from "@/lib/site";

/**
 * DAĞITICI route — `/yabanci-dil-egitimleri/{kurs}/{sayfa}` altında iki tip:
 *   - Faz 6.6 Şube Kurs Tarihi (`data/courseDates.ts`) → `CourseDatePage`
 *   - P4 Zengin İçerik / özel ders (`data/privateLessons.ts`) → `RichContentPage`
 * İki listenin slug'ları çakışmaz (build'de denetlenir, aşağıda).
 */

const CATEGORY = "yabanci-dil-egitimleri";
const PREFIX = `/${CATEGORY}/`;

const courseDateParams = COURSE_DATES.filter((e) => e.category === CATEGORY).map((e) => ({
  kurs: e.courseSlug,
  sayfa: e.pageSlug,
}));

const richParams = richPathsUnder(PREFIX).map(([kurs, sayfa]) => ({ kurs, sayfa }));

assertNoSlugCollision(
  "yabanci-dil dağıtıcı",
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

  const def = getPrivateLessonDef(`${PREFIX}${kurs}/${sayfa}`);
  if (def) return richMetadata(def);

  return {};
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { kurs, sayfa } = await params;

  const entry = findCourseDateEntry(CATEGORY, kurs, sayfa);
  if (entry) return <CourseDatePage page={getCourseDatePage(entry)} />;

  const def = getPrivateLessonDef(`${PREFIX}${kurs}/${sayfa}`);
  if (def) return <RichContentPage page={getPrivateLessonPage(def)} />;

  notFound();
}
