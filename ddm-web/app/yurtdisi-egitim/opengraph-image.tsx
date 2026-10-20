import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/ogImage";

/**
 * P9 — Yurtdışı Eğitim paylaşım görseli: hub + tüm alt sayfalar. Sayfa başına görsel olmuyor — Next catch-all
 * (`[...sayfa]`) segmentinin altında `opengraph-image` dosyasına izin vermiyor.
 */
export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({ kicker: null, title: "Yurtdışı Eğitim" });
}
