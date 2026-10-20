import { BRANCH_LIST } from "@/data/branches";
import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/ogImage";

/** P9 — şube iletişim sayfası: "{Şube} Şubesi" (Etiler; asla Beşiktaş — `branch.name`). */
// Build anında üretilsin (sayfayla aynı parametre listesi) — yoksa görsel ilk istekte sunucuda çizilir.
export { generateStaticParams } from "./page";
export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ sube: string }> }) {
  const { sube } = await params;
  const branch = BRANCH_LIST.find((b) => b.href.split("/").pop() === sube);
  return ogImage({ kicker: "Şubelerimiz", title: branch ? `${branch.name} Şubesi` : "Şubelerimiz" });
}
