import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ExamCoursePage, examMetadata } from "@/components/sections/ExamCoursePage";
import { EXAMS, getExamDef } from "@/data/exams";

/**
 * P2 — Sınav Hazırlık Kursu Ana sayfası (15 sınav; `proficiency-kursu` statik
 * klasörde ayrı dosyada, bkz. plan §3). Alt segment `[sayfa]` (kurs-tarihi)
 * kendi `generateStaticParams`ını taşıdığı için bu dosyadan etkilenmez.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return EXAMS.filter((e) => e.slug !== "proficiency-kursu").map((e) => ({ kurs: e.slug }));
}

type Params = { kurs: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { kurs } = await params;
  const def = getExamDef(kurs);
  return def ? examMetadata(def) : {};
}

export default async function SinavKursuPage({ params }: { params: Promise<Params> }) {
  const { kurs } = await params;
  const def = getExamDef(kurs);
  if (!def || def.slug === "proficiency-kursu") notFound();
  return <ExamCoursePage def={def} />;
}
