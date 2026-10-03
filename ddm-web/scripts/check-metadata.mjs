#!/usr/bin/env node
/**
 * Metadata denetimi (P8, CLAUDE.md §6) — yalnız ÖLÇER, hiçbir şeyi değiştirmez.
 *
 * `npm run build` çıktısındaki her sayfanın (`.next/server/app/**\/*.html`) `<head>`'ini ve H1'lerini okur:
 *   başlık (title) · açıklama (description) · asıl adres (canonical) · H1 sayısı ve metni · robots meta
 * ve `sitemap.xml` + `robots.txt` gövdelerini. Sorunları SAYFA TÜRÜNE göre gruplar.
 *
 * Eşikler: başlık 30–60 karakter · açıklama 70–160 (proje kuralı ≤155, CLAUDE.md §5 / `checkMeta`) ·
 * H1 ↔ başlık "kopuk" = H1'in anlamlı sözcüklerinin yarısından azı başlıkta geçiyor.
 *
 * Kullanım:
 *   npm run build && node scripts/check-metadata.mjs [--out ../docs/metadata-raporu-<tarih>.md]
 */

import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const APP_DIR = join(ROOT, ".next", "server", "app");
const TODAY = new Date().toISOString().slice(0, 10);
const argv = process.argv.slice(2);
const OUT = argv.includes("--out") ? argv[argv.indexOf("--out") + 1] : join(ROOT, "..", "docs", `metadata-raporu-${TODAY}.md`);

const TITLE_MIN = 30;
const TITLE_MAX = 60;
const DESC_MIN = 70;
const DESC_MAX = 160;
const DESC_PROJECT_MAX = 155;

if (!existsSync(APP_DIR)) {
  console.error("`.next/server/app` yok — önce `npm run build` çalıştır.");
  process.exit(2);
}

// ---------------------------------------------------------------- okuma

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
const text = (html) => decodeHtml(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const len = (s) => [...s].length;

function readPage(file) {
  const html = readFileSync(file, "utf8");
  const head = html.slice(0, html.indexOf("</head>") + 1 || undefined);
  const attr = (re) => {
    const m = head.match(re);
    return m ? decodeHtml(m[1]) : null;
  };
  const titles = [...head.matchAll(/<title>([\s\S]*?)<\/title>/g)].map((m) => text(m[1]));
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => text(m[1]));
  return {
    route: routeOf(file),
    titles,
    title: titles[0] ?? null,
    description: attr(/<meta name="description" content="([^"]*)"/),
    descriptionCount: (head.match(/<meta name="description"/g) ?? []).length,
    canonical: attr(/<link rel="canonical" href="([^"]*)"/),
    canonicalCount: (head.match(/<link rel="canonical"/g) ?? []).length,
    robots: attr(/<meta name="robots" content="([^"]*)"/),
    h1s,
  };
}

// ---------------------------------------------------------------- sayfa türü

const LANGS =
  /^\/yabanci-dil-egitimleri\/(ingilizce-kursu|almanca-kursu|fransizca-kursu|ispanyolca-kursu|italyanca-kursu|rusca-kursu|cince-kursu|yabancila-icin-turkce-kurs|flemenkce-kursu|ingilizce-konusma-kursu|[a-z]+-kursu)$/;
const HUBS = new Set(["/yabanci-dil", "/sinav-hazirlik-egitimleri", "/ingilizce-kurslari", "/yurtdisi-egitim", "/diger-program", "/kurumsal-dil-egitim"]);

/** Sayfa türü — `lib/pageRegistry.ts` `PageKind` ile aynı aileler; "rich" alt türlerine ayrılmış. */
function kindOf(route) {
  if (route === "/") return "Ana Sayfa";
  if (HUBS.has(route)) return "Kategori hub'ı";
  if (route === "/ogrenci-yorumlari") return "Öğrenci Yorumları";
  if (/kurs-tarihi$/.test(route)) return "Şube kurs tarihi";
  if (route.startsWith("/ddm-iletisim")) return "Şube iletişim";
  if (/-tanitim-sayfasi$/.test(route)) return "Şube tanıtım";
  if (/^\/sinav-hazirlik-egitimleri\/proficiency-kursu\/[a-z-]+-universitesi(-hazirlik)?$/.test(route)) return "Üniversite proficiency";
  if (/ozel-ders$/.test(route)) return "Özel ders";
  if (/^\/yabanci-dil-egitimleri\/[^/]+\/online-[a-z]+-egitimi$/.test(route) || route === "/diger-program/online-dil-egitimi") return "Online eğitim";
  if (/-nedir$/.test(route)) return "Nedir rehberi";
  if (/^\/sinav-hazirlik-egitimleri\/[^/]+$/.test(route)) return "Sınav hazırlık";
  if (LANGS.test(route)) return "Dil kursu";
  if (route.startsWith("/ingilizce-kurslari/")) return "İngilizce kursları";
  if (route.startsWith("/yurtdisi-egitim/")) return "Yurtdışı";
  if (route.startsWith("/diger-program/") || route.startsWith("/kurumsal-dil-egitim/")) return "Diğer program / kurumsal";
  return "Tekil sayfa";
}

// ---------------------------------------------------------------- ölçüm

const BRAND_RE = /\s*[|–-]\s*(DDM\s*\/\s*)?Dünya Dilleri Merkezi.*$/i;
const STOP = new Set(
  "ve ile için icin bir bu da de mi ne nedir nasıl en çok daha olan gibi | – - dünya dilleri merkezi ddm".split(" "),
);
const words = (s) =>
  s
    .toLocaleLowerCase("tr")
    .replace(BRAND_RE, "")
    .split(/[^\p{L}\p{N}]+/u)
    .filter((w) => w.length > 1 && !STOP.has(w));
/** Kök karşılaştırması: Türkçe ekler yüzünden ilk 4 harf ("kurs" ↔ "kursu" ↔ "kursları"). */
const stem = (w) => w.slice(0, 4);

function h1TitleOverlap(h1, title) {
  const h = [...new Set(words(h1).map(stem))];
  const t = new Set(words(title).map(stem));
  if (h.length === 0) return 1;
  return h.filter((w) => t.has(w)).length / h.length;
}

const pages = walk(APP_DIR)
  .filter((f) => !routeOf(f).startsWith("/_"))
  .map(readPage)
  .map((p) => ({ ...p, kind: kindOf(p.route) }))
  .sort((a, b) => a.route.localeCompare(b.route));

const sitemapBody = readFileSync(join(APP_DIR, "sitemap.xml.body"), "utf8");
const sitemapLocs = [...sitemapBody.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const robotsBody = readFileSync(join(APP_DIR, "robots.txt.body"), "utf8");
const hiddenSlugs = [
  ...readFileSync(join(ROOT, "data", "hiddenPages.ts"), "utf8")
    .replace(/\/\/.*$/gm, "")
    .match(/HIDDEN_EXAM_SLUGS[^=]*=\s*\[([\s\S]*?)\]/)[1]
    .matchAll(/"([^"]+)"/g),
].map((m) => m[1]);

// Build anındaki alan adı: canonical'ların ortak kökü.
const origins = new Set(pages.map((p) => p.canonical && new URL(p.canonical).origin).filter(Boolean));
const ORIGIN = origins.size === 1 ? [...origins][0] : null;

const issues = []; // { key, label, route, detail }
const add = (key, p, detail = "") => issues.push({ key, route: p.route, kind: p.kind, detail });

for (const p of pages) {
  if (!p.title) add("title-missing", p);
  else {
    if (p.titles.length > 1) add("title-multi", p, `${p.titles.length} adet`);
    if (len(p.title) > TITLE_MAX) add("title-long", p, `${len(p.title)} kr · ${p.title}`);
    if (len(p.title) < TITLE_MIN) add("title-short", p, `${len(p.title)} kr · ${p.title}`);
    if (/fiyat|ücret/i.test(p.title)) add("title-price", p, p.title);
  }
  if (!p.description) add("desc-missing", p);
  else {
    if (p.descriptionCount > 1) add("desc-multi", p, `${p.descriptionCount} adet`);
    if (len(p.description) > DESC_MAX) add("desc-long", p, `${len(p.description)} kr`);
    else if (len(p.description) > DESC_PROJECT_MAX) add("desc-project", p, `${len(p.description)} kr`);
    if (len(p.description) < DESC_MIN) add("desc-short", p, `${len(p.description)} kr · ${p.description}`);
  }
  if (!p.canonical) add("canon-missing", p);
  else {
    const u = new URL(p.canonical);
    if (p.canonicalCount > 1) add("canon-multi", p);
    if (decodeURIComponent(u.pathname) !== p.route) add("canon-wrong", p, `${u.pathname} (sayfa ${p.route})`);
    if (u.search || u.hash) add("canon-wrong", p, `sorgu/çapa: ${u.search}${u.hash}`);
    if (u.pathname !== "/" && u.pathname.endsWith("/")) add("canon-wrong", p, "sonda /");
  }
  if (p.h1s.length === 0) add("h1-none", p);
  if (p.h1s.length > 1) add("h1-multi", p, p.h1s.join(" ‖ "));
  for (const h of p.h1s) if (/fiyat|ücret/i.test(h)) add("h1-price", p, h);
  if (p.title && p.h1s.length === 1) {
    const r = h1TitleOverlap(p.h1s[0], p.title);
    if (r < 0.5) add("h1-gap", p, `%${Math.round(r * 100)} ortak · H1: ${p.h1s[0]} ‖ title: ${p.title}`);
  }
  if (p.robots && /noindex/i.test(p.robots)) add("noindex", p, p.robots);
}

/** Aynı değeri paylaşan sayfa kümeleri. */
function duplicates(field) {
  const by = new Map();
  for (const p of pages) {
    const v = p[field];
    if (!v) continue;
    by.set(v, [...(by.get(v) ?? []), p]);
  }
  return [...by].filter(([, ps]) => ps.length > 1).sort((a, b) => b[1].length - a[1].length);
}
const dupTitles = duplicates("title");
const dupDescs = duplicates("description");

// Sitemap ↔ sayfalar
const sitemapPaths = new Set(sitemapLocs.map((l) => decodeURIComponent(new URL(l).pathname)));
const pageRoutes = new Set(pages.map((p) => p.route).filter((r) => r !== "/_not-found"));
const notInSitemap = [...pageRoutes].filter((r) => !sitemapPaths.has(r));
const sitemapNoPage = [...sitemapPaths].filter((r) => !pageRoutes.has(r));
const hiddenInSitemap = [...sitemapPaths].filter((r) => hiddenSlugs.some((s) => r.startsWith(`/sinav-hazirlik-egitimleri/${s}`)));

// ---------------------------------------------------------------- rapor

const LABELS = {
  "title-missing": "Başlık yok",
  "title-multi": "Birden fazla `<title>`",
  "title-long": `Başlık çok uzun (>${TITLE_MAX} karakter)`,
  "title-short": `Başlık çok kısa (<${TITLE_MIN} karakter)`,
  "title-price": "Başlıkta \"fiyat / ücret\" sözü",
  "desc-missing": "Açıklama yok",
  "desc-multi": "Birden fazla açıklama",
  "desc-long": `Açıklama çok uzun (>${DESC_MAX})`,
  "desc-project": `Açıklama ${DESC_PROJECT_MAX + 1}–${DESC_MAX} (Google'a göre sınırda, proje kuralı ≤${DESC_PROJECT_MAX})`,
  "desc-short": `Açıklama çok kısa (<${DESC_MIN})`,
  "canon-missing": "Asıl adres (canonical) yok",
  "canon-multi": "Birden fazla canonical",
  "canon-wrong": "Canonical sayfanın kendi adresi değil",
  "h1-none": "H1 yok",
  "h1-multi": "Birden fazla H1",
  "h1-price": "H1'de \"fiyat / ücret\" sözü",
  "h1-gap": "H1 ile başlık kopuk (H1'in sözcüklerinin yarısından azı başlıkta)",
  noindex: "Sayfada `noindex`",
};

const esc = (s) => String(s).replace(/\|/g, "\\|");
const kinds = [...new Set(pages.map((p) => p.kind))].sort();
const kindCount = Object.fromEntries(kinds.map((k) => [k, pages.filter((p) => p.kind === k).length]));

const L = [];
L.push(`# Metadata denetimi — ${TODAY}`);
L.push("");
L.push(`> \`node scripts/check-metadata.mjs\` çıktısı — yalnız ölçüm. \`.next\` build çıktısındaki **${pages.length} HTML sayfa** okundu`);
L.push(`> (build'in saydığı 209 = bu sayfalar + 404 sayfası + sitemap.xml + robots.txt + 3 simge + iç kayıtlar).`);
L.push(`> Eşikler: başlık ${TITLE_MIN}–${TITLE_MAX} · açıklama ${DESC_MIN}–${DESC_MAX} (proje kuralı ≤${DESC_PROJECT_MAX}).`);
L.push("");
L.push("## Sayfa türleri");
L.push("");
L.push("| Tür | Sayfa |");
L.push("|---|---:|");
for (const k of kinds) L.push(`| ${k} | ${kindCount[k]} |`);
L.push("");

L.push("## Özet — sorun × tür");
L.push("");
const keys = Object.keys(LABELS).filter((k) => issues.some((i) => i.key === k));
L.push("| Sorun | Toplam | Türlere göre |");
L.push("|---|---:|---|");
for (const k of keys) {
  const list = issues.filter((i) => i.key === k);
  const routes = new Set(list.map((i) => i.route));
  const per = kinds
    .map((kd) => [kd, new Set(list.filter((i) => i.kind === kd).map((i) => i.route)).size])
    .filter(([, n]) => n)
    .map(([kd, n]) => `${kd} ${n}/${kindCount[kd]}`)
    .join(" · ");
  L.push(`| ${LABELS[k]} | ${routes.size} | ${per} |`);
}
L.push(`| Aynı başlığı paylaşan küme | ${dupTitles.length} küme / ${dupTitles.reduce((n, [, ps]) => n + ps.length, 0)} sayfa | |`);
L.push(`| Aynı açıklamayı paylaşan küme | ${dupDescs.length} küme / ${dupDescs.reduce((n, [, ps]) => n + ps.length, 0)} sayfa | |`);
L.push("");

L.push("## Asıl adres, sitemap, robots");
L.push("");
L.push(`- Canonical kökü: ${ORIGIN ? `\`${ORIGIN}\`` : `birden fazla: ${[...origins].join(", ")}`} — \`NEXT_PUBLIC_SITE_URL\` build anındaki değer.`);
L.push(`- Sitemap: ${sitemapLocs.length} adres · sayfası olmayan: ${sitemapNoPage.length} · sitemap'te olmayan sayfa: ${notInSitemap.length}${notInSitemap.length ? ` (${notInSitemap.map((r) => `\`${r}\``).join(", ")})` : ""} · gizli sınav: ${hiddenInSitemap.length}`);
L.push(`- robots.txt: \`${robotsBody.trim().replace(/\n/g, " · ")}\``);
L.push("");

const section = (title, list) => {
  L.push(`## ${title}`);
  L.push("");
  for (const kd of kinds) {
    const items = list.filter((i) => i.kind === kd);
    if (!items.length) continue;
    L.push(`**${kd}** (${new Set(items.map((i) => i.route)).size}/${kindCount[kd]})`);
    L.push("");
    for (const i of items) L.push(`- \`${i.route}\`${i.detail ? ` — ${esc(i.detail)}` : ""}`);
    L.push("");
  }
};
for (const k of keys) section(LABELS[k], issues.filter((i) => i.key === k));

const dupSection = (title, groups) => {
  L.push(`## ${title} (${groups.length} küme)`);
  L.push("");
  for (const [v, ps] of groups) {
    L.push(`- **${ps.length} sayfa** · ${[...new Set(ps.map((p) => p.kind))].join(", ")} · «${esc(v)}»`);
    for (const p of ps) L.push(`  - \`${p.route}\``);
  }
  L.push("");
};
dupSection("Aynı başlık", dupTitles);
dupSection("Aynı açıklama", dupDescs);

L.push(`## Tüm sayfalar (${pages.length})`);
L.push("");
L.push("| Adres | Tür | Başlık (kr) | Açıklama (kr) | H1 |");
L.push("|---|---|---:|---:|---:|");
for (const p of pages) L.push(`| \`${p.route}\` | ${p.kind} | ${p.title ? len(p.title) : "—"} | ${p.description ? len(p.description) : "—"} | ${p.h1s.length} |`);
L.push("");

writeFileSync(OUT, L.join("\n"));
console.log(`Sayfa: ${pages.length} · tür: ${kinds.length} · canonical kökü: ${ORIGIN}`);
for (const k of keys) console.log(`  ${new Set(issues.filter((i) => i.key === k).map((i) => i.route)).size} × ${LABELS[k]}`);
console.log(`  ${dupTitles.length} aynı-başlık kümesi · ${dupDescs.length} aynı-açıklama kümesi`);
console.log(`  sitemap ${sitemapLocs.length} · sitemap'te olmayan ${notInSitemap.length} · sayfasız ${sitemapNoPage.length} · gizli ${hiddenInSitemap.length}`);
console.log(`Rapor: ${relative(process.cwd(), OUT)}`);
