import { assertJsonLd, type JsonLdNode } from "@/lib/jsonLd";

/**
 * P9 — tek JSON-LD basıcısı. Düğümler `lib/jsonLd.ts` üreticilerinden gelir, burada denetlenir (`assertJsonLd`:
 * zorunlu alan, fiyat / puan, gizli sayfa → build düşer) ve `<` kaçışıyla basılır (Next JSON-LD rehberi, XSS).
 * Sayfada görünmeyen bilgi EKLENMEZ — build sonrası `scripts/check-jsonld.mjs` metinle karşılaştırır.
 *
 * KONUM: daima ebeveynin SONUNA koyun. <main>'in ilk çocuğu olursa globals.css'in "header'ın arkası" kuralı
 * (`main > :first-child`) script'e uygulanır, hero aşağıda kalır ve header'ın arkası beyaz şerit olur (P9'da 46 sayfa).
 */
export function JsonLd({ data, where }: { data: JsonLdNode; where: string }) {
  assertJsonLd(data, where);
  const json = JSON.stringify({ "@context": "https://schema.org", ...data }).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
