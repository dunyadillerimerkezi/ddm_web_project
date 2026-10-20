import { getExamDef } from "@/data/exams";
import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/ogImage";

/** P9 — sınav kursu paylaşım görseli (alt sayfalar — nedir, özel ders, şube kurs tarihleri — da bunu alır). */
// Build anında üretilsin (sayfayla aynı parametre listesi) — yoksa görsel ilk istekte sunucuda çizilir.
export { generateStaticParams } from "./page";
export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ kurs: string }> }) {
  const { kurs } = await params;
  return ogImage({ kicker: "Sınav Hazırlık", title: getExamDef(kurs)?.label ?? "Sınav Hazırlık" });
}
