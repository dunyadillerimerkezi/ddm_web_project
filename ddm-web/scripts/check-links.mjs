#!/usr/bin/env node
/**
 * Ölü iç link denetimi (P0, docs/remaining-pages-plan.md §5).
 *
 * `npm run build` çıktısındaki (`.next/server/app/**\/*.html`) her prerender
 * edilmiş sayfadan kök-göreli `href`'leri toplar ve şunlarla karşılaştırır:
 *   - üretilen sayfalar (o klasördeki .html dosyaları),
 *   - `.next/routes-manifest.json` içindeki redirect kaynakları (link 301'e
 *     çarpsa da ölü sayılmaz — hedefi ayrıca kontrol edilir).
 *
 * Kullanım:
 *   npm run build && npm run check-links
 *   node scripts/check-links.mjs --strict   # ölü link varsa exit 1
 *   node scripts/check-links.mjs --list     # hedef başına kaynak sayfaları da yaz
 *
 * Varsayılan çıkış kodu 0: şu an bilinçli ölü linkler var (henüz üretilmemiş
 * sayfalar). Amaç sayıyı takip etmek — her faz ölü hedef sayısını DÜŞÜRMELİ.
 */

import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const APP_DIR = join(ROOT, ".next", "server", "app");
const MANIFEST = join(ROOT, ".next", "routes-manifest.json");

const args = new Set(process.argv.slice(2));
const STRICT = args.has("--strict");
const LIST = args.has("--list");

if (!existsSync(APP_DIR)) {
  console.error("`.next/server/app` yok — önce `npm run build` çalıştır.");
  process.exit(2);
}

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

/** `.next/server/app/a/b.html` -> `/a/b`; `index.html` -> `/` */
function routeOf(file) {
  const rel = relative(APP_DIR, file).split(sep).join("/").replace(/\.html$/, "");
  if (rel === "index") return "/";
  return "/" + rel.replace(/\/index$/, "");
}

const pages = walk(APP_DIR)
  .map((file) => ({ file, route: routeOf(file) }))
  .filter((p) => !p.route.startsWith("/_"));

const known = new Set(pages.map((p) => p.route));

// Redirect kaynakları: yalnız değişkensiz (literal) olanlar. `:path` içerenler
// (Next'in kendi `/:path+/` slash kuralı gibi) linki "var" saymaz.
const redirectSources = new Set();
const redirectDest = new Map();
if (existsSync(MANIFEST)) {
  const { redirects = [] } = JSON.parse(readFileSync(MANIFEST, "utf8"));
  for (const r of redirects) {
    if (/[:*(]/.test(r.source)) continue;
    redirectSources.add(r.source);
    redirectDest.set(r.source, r.destination);
  }
}

const HREF = /<a\b[^>]*?\shref="([^"]+)"/g;
const IGNORE_PREFIX = ["/_next", "/assets", "/favicon"];

/** target -> Set(kaynak route) */
const dead = new Map();
let total = 0;

for (const { file, route } of pages) {
  const html = readFileSync(file, "utf8");
  for (const m of html.matchAll(HREF)) {
    let href = m[1].replace(/&amp;/g, "&");
    if (!href.startsWith("/") || href.startsWith("//")) continue; // dış link, mailto, tel, #hash
    if (IGNORE_PREFIX.some((p) => href.startsWith(p))) continue;

    href = href.split("#")[0].split("?")[0];
    if (href.length > 1) href = href.replace(/\/$/, "");
    try {
      href = decodeURI(href);
    } catch {
      /* olduğu gibi bırak */
    }
    if (href === "") continue; // saf `#hash` linki
    total++;

    if (known.has(href)) continue;
    if (redirectSources.has(href)) {
      const dest = redirectDest.get(href);
      if (!known.has(dest)) {
        const key = `${href} → ${dest} (redirect hedefi yok)`;
        if (!dead.has(key)) dead.set(key, new Set());
        dead.get(key).add(route);
      }
      continue;
    }
    if (!dead.has(href)) dead.set(href, new Set());
    dead.get(href).add(route);
  }
}

const sorted = [...dead.entries()].sort((a, b) => b[1].size - a[1].size || a[0].localeCompare(b[0], "tr"));
const deadOccurrences = sorted.reduce((n, [, s]) => n + s.size, 0);

console.log(`Taranan sayfa: ${pages.length} · iç link: ${total}`);
console.log(`ÖLÜ HEDEF: ${sorted.length} benzersiz · ${deadOccurrences} (sayfa→hedef) çifti\n`);
for (const [target, sources] of sorted) {
  console.log(`${String(sources.size).padStart(4)}×  ${target}`);
  if (LIST) for (const s of [...sources].sort()) console.log(`        ← ${s}`);
}

process.exit(STRICT && sorted.length > 0 ? 1 : 0);
