import { HOME_META_TITLE } from "@/data/home";
import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/ogImage";

/** P9 — site geneli paylaşım görseli; kategori görseli olmayan her sayfa bunu alır. Başlık Ana Sayfa başlığından (marka eki logoda). */
export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({ kicker: null, title: HOME_META_TITLE.split(" | ")[0] });
}
