import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CourseDatePage } from "@/components/sections/CourseDatePage";
import { COURSE_DATES, findCourseDateEntry } from "@/data/courseDates";
import { getCourseDatePage } from "@/lib/courseDateContent";
import { absoluteUrl } from "@/lib/site";

/** Faz 6.6 — Şube Kurs Tarihi (dil kursları). Gövde `CourseDatePage`te. */

const CATEGORY = "yabanci-dil-egitimleri";

export const dynamicParams = false;

export function generateStaticParams() {
  return COURSE_DATES.filter((e) => e.category === CATEGORY).map((e) => ({
    kurs: e.courseSlug,
    sayfa: e.pageSlug,
  }));
}

type Params = { kurs: string; sayfa: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { kurs, sayfa } = await params;
  const entry = findCourseDateEntry(CATEGORY, kurs, sayfa);
  if (!entry) return {};
  const page = getCourseDatePage(entry);
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: absoluteUrl(page.href) },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { kurs, sayfa } = await params;
  const entry = findCourseDateEntry(CATEGORY, kurs, sayfa);
  if (!entry) notFound();
  return <CourseDatePage page={getCourseDatePage(entry)} />;
}
