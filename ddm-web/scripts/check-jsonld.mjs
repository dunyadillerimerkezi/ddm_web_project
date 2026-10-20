#!/usr/bin/env node
/**
 * P9 — JSON-LD denetimi (build sonrası; `npm run build`'in `postbuild` adımı — hata varsa build düşer).
 *
 * `.next/server/app/**\/*.html` içindeki her `<script type="application/ld+json">` için:
 *   1. JSON geçerli mi; zorunlu alanlar dolu mu (tür başına, `lib/jsonLd.ts` REQUIRED ile aynı).
 *   2. Fiyat / puan alanı var mı (`offers`, `price…`, `aggregateRating`, `review`) → hata.
 *   3. Gizli sayfaya (`data/hiddenPages.ts`) giden adres ya da gizli sayfanın kendisinde veri → hata.
 *   4. Sayfa başına en çok bir FAQPage / BreadcrumbList / Course / LocalBusiness; kurum düğümü her sayfada tam bir kez.
 *   0. <main>'in ilk çocuğu <script> olamaz (header'ın arkası kuralı — globals.css).
 *   5. GÖRÜNÜRLÜK: metin alanları (ad, açıklama, soru, cevap, adres, telefon, e-posta, kuruluş yılı) sayfanın görünen
 *      metninde (`<body>`, script / style hariç) birebir geçmeli — sayfada olmayan bilgi yapısal veriye giremez.
 *
 * Kullanım:
 *   node scripts/check-jsonld.mjs                 # denetim + tür başına özet
 *   node scripts/check-jsonld.mjs --dump /yol     # o sayfanın JSON-LD'sini yaz (pilot tablosu için)
 */

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const APP_DIR = join(ROOT, ".next", "server", "app");

if (!existsSync(APP_DIR)) {
  console.error("`.next/server/app` yok — önce `npm run build` çalıştır.");
  process.exit(2);
}

const argv = process.argv.slice(2);
const dumpAt = argv.indexOf("--dump");
const DUMP = dumpAt >= 0 ? argv.slice(dumpAt + 1).filter((a) => !a.startsWith("--")) : null;

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

/** check-links.mjs ile aynı: `.next/server/app/a/b.html` → `/a/b`. */
function routeOf(file) {
  const rel = relative(APP_DIR, file).split(sep).join("/").replace(/\.html$/, "");
  return rel === "index" ? "/" : "/" + rel.replace(/\/index$/, "");
}

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
const decodeHtml = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m);

/** Karşılaştırma biçimi: boşluk tek, tırnaklar düz, küçük harf (tr). */
const norm = (s) =>
  s
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase("tr");

function visibleText(html) {
  const body = html.slice(html.indexOf("<body"));
  return norm(
    decodeHtml(
      body
        .replace(/<script\b[\s\S]*?<\/script>/g, " ")
        .replace(/<style\b[\s\S]*?<\/style>/g, " ")
        .replace(/<[^>]+>/g, " "),
    ),
  );
}

const hiddenSlugs = [
  ...readFileSync(join(ROOT, "data", "hiddenPages.ts"), "utf8")
    .replace(/\/\/.*$/gm, "")
    .match(/HIDDEN_EXAM_SLUGS[^=]*=\s*\[([\s\S]*?)\]/)[1]
    .matchAll(/"([^"]+)"/g),
].map((m) => m[1]);
const isHidden = (path) =>
  hiddenSlugs.some((s) => path === `/sinav-hazirlik-egitimleri/${s}` || path.startsWith(`/sinav-hazirlik-egitimleri/${s}/`));

const FORBIDDEN = new Set(["offers", "price", "priceRange", "priceCurrency", "lowPrice", "highPrice", "aggregateRating", "review", "reviews"]);
const REQUIRED = {
  EducationalOrganization: ["name", "url"],
  WebSite: ["name", "url"],
  BreadcrumbList: ["itemListElement"],
  FAQPage: ["mainEntity"],
  Course: ["name", "description", "provider"],
  Article: ["headline", "dateModified", "author"],
  LocalBusiness: ["name", "address", "telephone", "url"],
};
/** Görünürlüğü denetlenen metin alanları. `url` / `@id` / `logo` / `image` / tür adları / dil kodu / ülke kodu hariç. */
const VISIBLE_KEYS = new Set(["name", "headline", "description", "text", "streetAddress", "postalCode", "addressLocality", "addressRegion", "email", "foundingDate", "dateModified"]);
/** Bunların dışındaki her alan hata — yeni alan (saat, koordinat, sosyal hesap…) görünürlük kuralı yazılmadan giremez. */
const ALLOWED_KEYS = new Set([
  ...VISIBLE_KEYS,
  ...["@context", "@type", "@id", "url", "logo", "image", "item", "position", "itemListElement", "mainEntity"],
  ...["acceptedAnswer", "address", "addressCountry", "telephone", "parentOrganization", "provider", "author", "publisher", "inLanguage"],
  ...["sameAs", "openingHoursSpecification", "dayOfWeek", "opens", "closes"],
]);
const ONCE = ["FAQPage", "BreadcrumbList", "Course", "LocalBusiness", "Article", "WebSite"];

const empty = (v) => v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0);
const typesOf = (node) => (Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]]);

const errors = [];
const summary = new Map(); // tür → sayfa sayısı
let origin = null;

for (const file of walk(APP_DIR)) {
  const route = routeOf(file);
  if (route.startsWith("/_")) continue;
  const html = readFileSync(file, "utf8");
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const err = (msg) => errors.push(`${route}: ${msg}`);

  if (isHidden(route) && blocks.length > 0) err("gizli sayfada JSON-LD var");

  // <main>'in ilk çocuğu script olamaz: globals.css "header'ın arkası" kuralı (`main > :first-child`) ilk bölüme uygulanır;
  // script öne geçerse hero aşağıda kalır, header'ın arkası beyaz şerit olur (P9'da 46 sayfa bozuldu). JSON-LD sona konur.
  const mainFirst = /<main\b[^>]*>\s*<([a-zA-Z][\w-]*)/.exec(html);
  if (mainFirst && mainFirst[1].toLowerCase() === "script") err("<main>'in ilk çocuğu <script> — JSON-LD'yi ebeveynin sonuna taşıyın");

  const nodes = [];
  for (const raw of blocks) {
    try {
      nodes.push(JSON.parse(raw));
    } catch (e) {
      err(`geçersiz JSON (${e.message})`);
    }
  }
  if (DUMP && DUMP.includes(route)) {
    console.log(`\n### ${route}\n${JSON.stringify(nodes, null, 2)}`);
  }

  const text = visibleText(html);
  const counts = new Map();
  for (const node of nodes) {
    const types = typesOf(node);
    for (const t of types) {
      counts.set(t, (counts.get(t) ?? 0) + 1);
      for (const key of REQUIRED[t] ?? []) if (empty(node[key])) err(`${t}.${key} boş`);
    }
    const label = types.join("+");
    const visit = (value, path, key) => {
      if (Array.isArray(value)) return value.forEach((v, i) => visit(v, `${path}[${i}]`, key));
      if (value && typeof value === "object") {
        for (const [k, v] of Object.entries(value)) {
          if (FORBIDDEN.has(k)) err(`${path}.${k}: yasak alan (fiyat / puan)`);
          else if (!ALLOWED_KEYS.has(k)) err(`${path}.${k}: tanımsız alan — önce görünürlük kuralı ekleyin`);
          visit(v, `${path}.${k}`, k);
        }
        return;
      }
      if (typeof value !== "string") return;
      if (key === "sameAs") {
        // Sosyal hesap — sayfada (footer) bağlantı olarak görünmeli.
        if (!html.includes(`href="${value}"`)) err(`${path}: sosyal hesap sayfada bağlantı olarak yok (${value})`);
        return;
      }
      if (key === "opens" || key === "closes") {
        if (!text.includes(value)) err(`${path}: saat sayfada görünmüyor (${value})`);
        return;
      }
      if (key === "dayOfWeek") return; // schema.org gün adı (İngilizce sabit); görünürlüğü saat satırıyla denetlenir
      if (/^https?:\/\//.test(value)) {
        const url = new URL(value);
        if (url.hostname !== "schema.org") {
          origin ??= url.origin;
          if (url.origin !== origin) err(`${path}: farklı alan adı (${url.origin})`);
          if (isHidden(url.pathname)) err(`${path}: gizli sayfa adresi (${url.pathname})`);
        }
        return;
      }
      if (key === "telephone") {
        // "+90 216 330 12 17" → sayfada "0216 330 12 17"
        const local = value.replace(/^\+90\s*/, "0");
        if (!text.includes(norm(local))) err(`${path}: telefon sayfada yok (${local})`);
        return;
      }
      if (key === "dateModified") {
        if (!html.includes(`dateTime="${value}"`)) err(`${path}: tarih sayfada <time> olarak yok (${value})`);
        return;
      }
      if (key === "name" && path.includes("mainEntity") && !/\?[\s\u200e\u200f]*$/u.test(value)) {
        // SSS yapısal verisine yalnız soru biçimindeki madde girer (SAT'ın başlık maddeleri — P9).
        err(`${path}: SSS maddesi soru biçiminde değil — "${value.slice(0, 90)}"`);
      }
      if (key === "text") {
        // Madde biçimli cevap "a; b; c" diye birleşir (`lib/jsonLd.ts` faqLd) — her madde ayrı aranır.
        for (const part of value.split("; ")) if (!text.includes(norm(part))) err(`${path}: cevap sayfada görünmüyor — "${part.slice(0, 90)}"`);
        return;
      }
      if (VISIBLE_KEYS.has(key) && !text.includes(norm(value))) {
        err(`${path}: sayfada görünmüyor — "${value.slice(0, 90)}${value.length > 90 ? "…" : ""}"`);
      }
    };
    visit(node, label, null);
  }
  for (const t of ONCE) if ((counts.get(t) ?? 0) > 1) err(`${t} ${counts.get(t)} kez (en çok 1)`);
  const orgs = nodes.filter((n) => typesOf(n).length === 1 && n["@type"] === "EducationalOrganization").length;
  if (orgs !== 1) err(`kurum düğümü ${orgs} kez (tam 1 olmalı)`);
  for (const t of counts.keys()) summary.set(t, (summary.get(t) ?? 0) + 1);
}

console.log("JSON-LD — türü taşıyan sayfa sayısı:");
for (const [t, n] of [...summary].sort((a, b) => b[1] - a[1])) console.log(`  ${t.padEnd(26)} ${n}`);

if (errors.length > 0) {
  console.error(`\n❌ ${errors.length} JSON-LD hatası:`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log("\n✅ JSON-LD denetimi temiz (zorunlu alan, fiyat / puan, gizli sayfa, tekrar, görünürlük).");
