import type { MetadataRoute } from "next";

import { getPageRegistry } from "@/lib/pageRegistry";
import { absoluteUrl } from "@/lib/site";

/**
 * P0 madde 5 — `lib/pageRegistry.ts`'ten üretilir (bkz. o dosyanın başlığı).
 * Yeni bir tip route'a eklendikçe registry'ye eklenmesi yeterli, bu dosya
 * değişmez.
 *
 * `lastModified` bilerek YOK — kaynakta gerçek bir düzenleme tarihi yok,
 * uydurma tarih yazılmaz (CLAUDE.md §5'in "uydurma değer yazma" ilkesiyle
 * aynı gerekçe).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return getPageRegistry().map((page) => ({
    url: absoluteUrl(page.href),
  }));
}
