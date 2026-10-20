import { getExamDef } from "@/data/exams";
import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/ogImage";

/** P9 — Proficiency Kursu (statik klasör `[kurs]`u ezdiği için ayrı dosya). */
export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({ kicker: "Sınav Hazırlık", title: getExamDef("proficiency-kursu")?.label ?? "Proficiency Kursu" });
}
