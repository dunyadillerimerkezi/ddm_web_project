import { BRAND_NAME, FOUNDED_YEAR } from "@/data/company";
import { OPENING_HOURS } from "@/data/branches";
import { isHiddenPath } from "@/data/hiddenPages";
import { CORPORATE_MAIL, SOCIAL_LINKS } from "@/lib/nav";
import { SITE_URL, absoluteUrl } from "@/lib/site";
import type { Branch, Crumb, Faq } from "@/lib/types";

/**
 * P9 — JSON-LD yapısal veri üreticileri (kullanıcı kuralları, 2026-10-05):
 * - Her bilgi sayfada GÖRÜNÜR olmalı; görünmeyen alan eklenmez (`scripts/check-jsonld.mjs` build sonrası metinde arar).
 * - Adresler yalnız `absoluteUrl()` ile; alan adı yazılmaz (CLAUDE.md §4).
 * - Gizli sayfaya (`data/hiddenPages.ts`) veri / bağlantı yok; FİYAT yok (`offers`, `price…`); öğrenci yorumundan PUAN yok
 *   (`aggregateRating`, `review` — Google'ın kendi-yorum kuralı). Çalışma saati, koordinat, sosyal hesap UYDURULMAZ.
 * `assertJsonLd` bu kuralları her düğümde denetler; ihlal build'i düşürür (sayfalar statik üretilir).
 *
 * Google notu (2026-10): FAQ zengin sonucu 7 Mayıs 2026'dan beri hiçbir sitede gösterilmiyor, Course info 2025'te
 * kaldırıldı — ikisi de yapay zekâ aramaları için eklenir, Google'da görünür sonuç beklenmez.
 */

export type JsonLdNode = { "@type": string | string[]; [key: string]: unknown };

const ORG_ID = absoluteUrl("/#organization");
const WEBSITE_ID = absoluteUrl("/#website");

/** Kuruma başvuru — her düğüm aynı kurumu `@id` ile gösterir. */
const ORG_REF = { "@id": ORG_ID };

const LOGO = absoluteUrl("/assets/ddm-logo-lacivert.png");

/** Site geneli kurum — ad / logo header'da, kurumsal mail ve "2003’ten bu yana" footer'da (her sayfada görünür). */
export function organizationLd(): JsonLdNode {
  return {
    "@type": "EducationalOrganization",
    "@id": ORG_ID,
    name: BRAND_NAME,
    url: absoluteUrl("/"),
    logo: LOGO,
    email: CORPORATE_MAIL,
    foundingDate: String(FOUNDED_YEAR),
    // Footer'daki sosyal hesaplar (her sayfada görünür) — liste `lib/nav.ts` SOCIAL_LINKS.
    sameAs: SOCIAL_LINKS.map((s) => s.href),
  };
}

/** Ana Sayfa — Google "site adı" için WebSite düğümü. */
export function websiteLd(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: BRAND_NAME,
    url: absoluteUrl("/"),
    publisher: ORG_REF,
    inLanguage: "tr",
  };
}

/** Kırıntı yolu — `Breadcrumb` bileşeninin kendi öğelerinden; son öğe (bulunulan sayfa) adressiz kalır (Google izinli). */
export function breadcrumbLd(items: Crumb[]): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href && i < items.length - 1 ? { item: absoluteUrl(item.href) } : {}),
    })),
  };
}

/** Sayfada görünen soru-cevaplar (akordiyon). Paragraflar boşlukla, madde listesi "; " ile birleşir (sayfadaki sırayla). */
/** SSS yapısal verisine yalnız soru biçimindeki madde girer (soru işaretiyle biten; görünmez yön işaretleri hariç). */
export function isQuestion(text: string): boolean {
  return /\?[\s\u200e\u200f]*$/u.test(text);
}

export function faqLd(items: Faq[]): JsonLdNode {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer.join(f.format === "list" ? "; " : " ") },
    })),
  };
}

/** Dil / sınav kursu — ad H1, açıklama hero'daki giriş metni. Fiyat ve tarih YOK. */
export function courseLd({ name, description, path }: { name: string; description: string; path: string }): JsonLdNode {
  return {
    "@type": "Course",
    name,
    description,
    url: absoluteUrl(path),
    provider: ORG_REF,
  };
}

/** "Nedir" rehberi — başlık H1, açıklama hero'daki kısa cevap, tarih sayfanın "Son güncelleme"si. */
export function articleLd({
  headline,
  description,
  path,
  dateModified,
}: {
  headline: string;
  description: string;
  path: string;
  dateModified: string;
}): JsonLdNode {
  return {
    "@type": "Article",
    headline,
    description,
    url: absoluteUrl(path),
    dateModified,
    author: ORG_REF,
    publisher: ORG_REF,
    inLanguage: "tr",
  };
}

/**
 * Şube adresi `data/branches.ts`'teki tek satırdan bölünür: "… Pk.34710 Kadıköy" → sokak / posta kodu / semt.
 * Posta kodu yoksa (Ümraniye) son sözcük semttir. Kalıp tutmazsa build düşer — elle alan yazılmaz.
 */
function postalAddress(branch: Branch) {
  const address = branch.address;
  if (!address) throw new Error(`jsonLd: ${branch.slug} şubesinin adresi yok.`);
  const withCode = /^(.+?)\s*Pk\.?\s*(\d{5})\s+(\S+)$/u.exec(address);
  const plain = /^(.+?)\s+(\S+)$/u.exec(address);
  const [street, postalCode, locality] = withCode
    ? [withCode[1], withCode[2], withCode[3]]
    : plain
      ? [plain[1], null, plain[2]]
      : [null, null, null];
  if (!street || !locality) throw new Error(`jsonLd: ${branch.slug} adresi bölünemedi — "${address}"`);
  return {
    "@type": "PostalAddress",
    streetAddress: street.replace(/[.\s]+$/u, ""),
    ...(postalCode ? { postalCode } : {}),
    addressLocality: locality,
    addressRegion: "İstanbul",
    addressCountry: "TR",
  };
}

/** "0216 330 12 17" → "+90 216 330 12 17" (aynı numara, uluslararası yazım). */
function intlPhone(phone: string): string {
  return `+90 ${phone.replace(/^0/, "")}`;
}

/**
 * Şube — yalnız `data/branches.ts`. Şube adı daima `branch.name` ("Etiler", asla "Beşiktaş"). Görsel LOGO: semt fotoğrafı
 * şubenin kendi fotoğrafı sanılmasın (kullanıcı, 2026-10-19) — şube iç mekân fotoğrafları eşleşince değiştirilebilir.
 * Yalnız şubenin İletişim sayfasında basılır; tanıtım sayfasında yok (aynı şube iki kez tanımlanmasın).
 */
export function localBusinessLd(branch: Branch): JsonLdNode {
  if (!branch.phone) throw new Error(`jsonLd: ${branch.slug} şubesinin telefonu yok.`);
  return {
    "@type": ["LocalBusiness", "EducationalOrganization"],
    "@id": absoluteUrl(`${branch.href}#sube`),
    name: `${BRAND_NAME} ${branch.name} Şubesi`,
    url: absoluteUrl(branch.href),
    image: LOGO,
    address: postalAddress(branch),
    telephone: intlPhone(branch.phone),
    email: branch.mail,
    // Şube iletişim sayfasındaki "Çalışma saatleri" kutusu (5 şubede aynı — `data/branches.ts` OPENING_HOURS).
    openingHoursSpecification: OPENING_HOURS.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...h.days],
      opens: h.opens,
      closes: h.closes,
    })),
    parentOrganization: ORG_REF,
  };
}

/* ---------------------------------------------------------------
 * Denetim — her düğüm basılmadan önce
 * ------------------------------------------------------------- */

const FORBIDDEN_KEYS = new Set([
  "offers",
  "price",
  "priceRange",
  "priceCurrency",
  "lowPrice",
  "highPrice",
  "aggregateRating",
  "review",
  "reviews",
]);

/** Zorunlu alanlar — tür başına bizim sözleşmemiz (Google'ın listesi + "görünür olanı söyle" kuralı). */
const REQUIRED: Record<string, string[]> = {
  EducationalOrganization: ["name", "url"],
  WebSite: ["name", "url"],
  BreadcrumbList: ["itemListElement"],
  FAQPage: ["mainEntity"],
  Course: ["name", "description", "provider"],
  Article: ["headline", "dateModified", "author"],
  LocalBusiness: ["name", "address", "telephone", "url"],
};

function isEmpty(value: unknown): boolean {
  return value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0);
}

function walk(value: unknown, where: string, visit: (key: string, value: unknown, where: string) => void) {
  if (Array.isArray(value)) {
    value.forEach((v, i) => walk(v, `${where}[${i}]`, visit));
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      visit(k, v, `${where}.${k}`);
      walk(v, `${where}.${k}`, visit);
    }
  }
}

export function assertJsonLd(node: JsonLdNode, where: string): void {
  const types = Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]];
  const problems: string[] = [];
  for (const type of types) {
    for (const key of REQUIRED[type] ?? []) {
      if (isEmpty(node[key])) problems.push(`${type}.${key} boş`);
    }
  }
  walk(node, types.join("+"), (key, value, path) => {
    if (FORBIDDEN_KEYS.has(key)) problems.push(`${path}: yasak alan (fiyat / puan)`);
    if (typeof value === "string" && value.startsWith(SITE_URL)) {
      const p = value.slice(SITE_URL.length) || "/";
      if (isHiddenPath(p)) problems.push(`${path}: gizli sayfa adresi (${p})`);
    }
    if (typeof value === "string" && value.trim() === "" && key !== "@id") problems.push(`${path}: boş metin`);
  });
  if (node["@type"] === "FAQPage") {
    for (const [i, q] of (node.mainEntity as { name?: string; acceptedAnswer?: { text?: string } }[]).entries()) {
      if (isEmpty(q.name) || isEmpty(q.acceptedAnswer?.text)) problems.push(`FAQPage.mainEntity[${i}]: soru ya da cevap boş`);
      else if (!isQuestion(q.name as string)) problems.push(`FAQPage.mainEntity[${i}]: soru biçiminde değil — "${q.name}"`);
    }
  }
  if (problems.length > 0) throw new Error(`JSON-LD denetimi (${where}):\n  - ${problems.join("\n  - ")}`);
}
