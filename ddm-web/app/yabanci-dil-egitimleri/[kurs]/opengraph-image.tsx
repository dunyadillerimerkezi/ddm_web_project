import { getLanguageDef } from "@/data/languages";
import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/ogImage";

/** P9 — dil kursu paylaşım görseli (alt sayfalar — şube kurs tarihleri — da bunu alır). Başlık kırıntıdaki ad. */
// Build anında üretilsin (sayfayla aynı parametre listesi) — yoksa görsel ilk istekte sunucuda çizilir.
export { generateStaticParams } from "./page";
export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ kurs: string }> }) {
  const { kurs } = await params;
  return ogImage({ kicker: "Yabancı Dil Kursları", title: getLanguageDef(kurs)?.label ?? "Yabancı Dil Kursları" });
}
