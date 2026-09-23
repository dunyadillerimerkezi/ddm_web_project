import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ExamCoursePage, examMetadata } from "@/components/sections/ExamCoursePage";
import { getExamDef } from "@/data/exams";

/**
 * P2 — Proficiency Kursu ana sayfası.
 *
 * Bu slug AYRI bir dosyada yaşamak zorunda: `proficiency-kursu/` statik klasörü
 * (21 üniversite + kurs tarihi dağıtıcısı `[sayfa]` burada) kardeş `[kurs]`
 * dinamik segmentini ezer, yani `/sinav-hazirlik-egitimleri/proficiency-kursu`
 * o route'a hiç düşmez (plan §3 madde 1). Gövde diğer 15 sınavla aynı bileşen.
 */

const SLUG = "proficiency-kursu";

export async function generateMetadata(): Promise<Metadata> {
  const def = getExamDef(SLUG);
  return def ? examMetadata(def) : {};
}

export default function ProficiencyKursuPage() {
  const def = getExamDef(SLUG);
  if (!def) notFound();
  return <ExamCoursePage def={def} />;
}
