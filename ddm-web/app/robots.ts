import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/site";

/**
 * P0 madde 5. Varsayılan: tüm botlara açık (`allow: "/"`).
 *
 * Staging'de arama motorlarına kapatmak için `DDM_DISALLOW_INDEXING=1` set
 * edilir (bkz. `.env.example`). Faz 9 QA'sının "noindex kaldırıldı mı"
 * maddesi TAM OLARAK bunu kontrol eder — yayına alırken bu değişkenin
 * PRODUCTION'da tanımlı OLMADIĞINDAN emin olun (PROGRESS.md Faz 9).
 */
export default function robots(): MetadataRoute.Robots {
  const disallowAll = process.env.DDM_DISALLOW_INDEXING === "1";

  return {
    rules: disallowAll ? { userAgent: "*", disallow: "/" } : { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
