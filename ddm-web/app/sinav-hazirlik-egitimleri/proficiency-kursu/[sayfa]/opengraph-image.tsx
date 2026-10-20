import { getExamDef } from "@/data/exams";
import { getUniversityDef } from "@/data/universities";
import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/ogImage";

/** P9 — üniversite proficiency sayfası: üniversitenin adı; aynı segmentteki kurs tarihi / rehber sayfaları Proficiency Kursu. */
// Build anında üretilsin (sayfayla aynı parametre listesi) — yoksa görsel ilk istekte sunucuda çizilir.
export { generateStaticParams } from "./page";
export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ sayfa: string }> }) {
  const { sayfa } = await params;
  const uni = getUniversityDef(sayfa);
  if (uni) return ogImage({ kicker: "Proficiency Sınavı", title: uni.name });
  return ogImage({ kicker: "Sınav Hazırlık", title: getExamDef("proficiency-kursu")?.label ?? "Proficiency Kursu" });
}
