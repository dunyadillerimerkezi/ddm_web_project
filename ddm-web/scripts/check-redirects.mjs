#!/usr/bin/env node
/**
 * Eski adres taraması (P8, docs/remaining-pages-plan.md §5).
 *
 * `data/urls.csv`'deki eski sitenin her adresini çalışan siteye (`next start`) YÖNLENDİRME TAKİP ETMEDEN ister,
 * zinciri adım adım kendisi izler ve her satır için şunu yazar:
 *   eski adres · beklenen hedef · ilk durum kodu · gerçek hedef · adım sayısı · SONUÇ (✅ / ⚠ / ❌)
 *
 * Beklenen hedef (genel kuraldan bağımsız; ÖZEL kuralın niyeti):
 *   1. `.next/routes-manifest.json`'da bu adrese uyan ÖZEL bir kural varsa (genel `.html` kuralı ve Next'in iç
 *      kuralları hariç) → o kuralın hedefi.
 *   2. Adres gizli bir sınavın sayfası ya da alt sayfası (`data/hiddenPages.ts`) → bilinçli 404.
 *   3. Yoksa aynı adresin `.html`siz hâli, o sayfa üretilmişse.
 *   4. Hiçbiri değilse "—" (eşleme yok).
 *
 * Sonuç:
 *   ✅ tek adımda (301) beklenen hedefte 200 · gizli adres doğrudan ya da tek adımda 404
 *   ⏳ tek adımda beklenen hedefte 200 ama GEÇİCİ yönlendirme (302 / 307) — bilinçli, ayrı sayılır
 *   ⚠ açılıyor ama zincirli / beklenenden farklı hedef / eşlemesiz / 301 olmayan kalıcı kod · gizli bir sayfaya
 *     yönleniyor (karar gerekir)
 *   ❌ 404 / döngü / 5xx
 *
 * Kullanım:
 *   npm run build && node scripts/check-redirects.mjs
 *   node scripts/check-redirects.mjs --base http://localhost:3000   # zaten çalışan bir sunucuya karşı
 *   node scripts/check-redirects.mjs --out ../docs/redirect-raporu-2026-10-02.md --label "sonra"
 *   node scripts/check-redirects.mjs --strict                        # ❌ ya da ⚠ varsa exit 1 (⏳ sayılmaz)
 *
 * Varsayılan rapor: `../docs/redirect-raporu-<bugün>.md`. Ayrıca aynı adla `.json` özet yazılır.
 */

import { spawn } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const APP_DIR = join(ROOT, ".next", "server", "app");
const MANIFEST = join(ROOT, ".next", "routes-manifest.json");
const CSV = join(ROOT, "data", "urls.csv");
const HIDDEN_TS = join(ROOT, "data", "hiddenPages.ts");

const argv = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : fallback;
};
const TODAY = new Date().toISOString().slice(0, 10);
const BASE_ARG = opt("--base");
const PORT = Number(opt("--port", "3123"));
const OUT = opt("--out", join(ROOT, "..", "docs", `redirect-raporu-${TODAY}.md`));
const LABEL = opt("--label", "");
const STRICT = argv.includes("--strict");
const MAX_HOPS = 10;

if (!existsSync(APP_DIR) || !existsSync(MANIFEST)) {
  console.error("`.next` yok — önce `npm run build` çalıştır.");
  process.exit(2);
}

// ---------------------------------------------------------------- girdiler

/** RFC 4180 CSV: tırnaklı alan içinde virgül, çift tırnak ve satır sonu olabilir. */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  const endField = () => {
    row.push(field);
    field = "";
  };
  const endRow = () => {
    endField();
    rows.push(row);
    row = [];
  };
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") endField();
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      endRow();
    } else field += c;
  }
  if (field || row.length) endRow();
  const [header, ...body] = rows.filter((r) => r.some(Boolean));
  return body.map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ""])));
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

/** check-links.mjs ile aynı: `.next/server/app/a/b.html` → `/a/b`. */
function routeOf(file) {
  const rel = relative(APP_DIR, file).split(sep).join("/").replace(/\.html$/, "");
  return rel === "index" ? "/" : "/" + rel.replace(/\/index$/, "");
}

const PAGES = new Set(walk(APP_DIR).map(routeOf).filter((r) => !r.startsWith("/_")));

const HIDDEN_SLUGS = [...readFileSync(HIDDEN_TS, "utf8").replace(/\/\/.*$/gm, "").match(/HIDDEN_EXAM_SLUGS[^=]*=\s*\[([\s\S]*?)\]/)[1].matchAll(/"([^"]+)"/g)].map(
  (m) => m[1],
);
if (HIDDEN_SLUGS.length === 0) throw new Error("hiddenPages.ts içinde HIDDEN_EXAM_SLUGS okunamadı.");
const EXAM_ROOT = "/sinav-hazirlik-egitimleri/";
/** `data/hiddenPages.ts` `isHiddenPath` ile aynı mantık (TS dosyası .mjs'ten içe aktarılamıyor). */
function isHiddenPath(path) {
  if (!path.startsWith(EXAM_ROOT)) return false;
  return HIDDEN_SLUGS.includes(path.split("#")[0].split("?")[0].slice(EXAM_ROOT.length).split("/")[0]);
}

/**
 * Bilerek yönlendirilmeyen, 404 kalan eski adresler (kullanıcı kararı) — gizli sınavlar dışında. Karar kaydı burada;
 * `next.config.ts`'te bu adresler için kural YOK (yorumda yazar).
 */
const INTENTIONAL_404 = new Map([["/star-media", "başka firmanın web tasarım reklamı (kullanıcı kararı 2026-10-02)"]]);

/** Genel `.html` kuralı (`next.config.ts` `genericHtmlRedirect`) hedefi tek parametre olan tek kuraldır. */
const isGenericHtmlRule = (r) => r.destination === "/:path";
const SPECIFIC_RULES = JSON.parse(readFileSync(MANIFEST, "utf8"))
  .redirects.filter((r) => !r.internal && !isGenericHtmlRule(r))
  .map((r) => ({ ...r, re: new RegExp(r.regex) }));

/** Adrese uyan ilk özel kuralın hedefi (Next'in sırasıyla). Sorgu (`has: query`) da karşılaştırılır. */
function specificTarget(pathname, searchParams) {
  for (const r of SPECIFIC_RULES) {
    if (!r.re.test(pathname)) continue;
    const ok = (r.has ?? []).every((h) => {
      if (h.type !== "query") return false;
      const v = searchParams.get(h.key);
      return v !== null && (h.value === undefined || new RegExp(`^${h.value}$`).test(v));
    });
    if (ok) return r.destination;
  }
  return null;
}

const decode = (p) => {
  try {
    return decodeURIComponent(p);
  } catch {
    return p;
  }
};
const stripHash = (p) => p.split("#")[0];
const stripHtml = (p) => p.replace(/\.html$/, "");

// ---------------------------------------------------------------- sunucu

async function waitFor(base, ms = 30000) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    try {
      await fetch(base + "/", { redirect: "manual" });
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 300));
    }
  }
  throw new Error(`Sunucu ${ms / 1000} sn içinde açılmadı: ${base}`);
}

async function portBusy(base) {
  try {
    await fetch(base + "/", { redirect: "manual" });
    return true;
  } catch {
    return false;
  }
}

/** `next start`'ı açar. Port doluysa durur — eski bir sunucuyu (eski build'i) yanlışlıkla taramayalım. */
async function startServer() {
  const base = `http://localhost:${PORT}`;
  if (await portBusy(base)) throw new Error(`Port ${PORT} dolu — eski bir sunucu çalışıyor olabilir. Kapatın ya da --port verin.`);
  const child = spawn(process.execPath, [join(ROOT, "node_modules", "next", "dist", "bin", "next"), "start", "-p", String(PORT)], {
    cwd: ROOT,
    stdio: "ignore",
  });
  const stop = () => child.kill();
  const exited = new Promise((_, reject) => child.once("exit", (code) => reject(new Error(`next start kapandı (kod ${code}).`))));
  exited.catch(() => {}); // taramanın sonundaki normal kapanış işlenmemiş hata sayılmasın
  try {
    await Promise.race([waitFor(base), exited]);
  } catch (e) {
    stop();
    throw e;
  }
  return { base, stop };
}

// ---------------------------------------------------------------- tarama

/** Zinciri elle izler. `hops`: her yönlendirme adımı {status, to}. */
async function trace(base, pathAndQuery) {
  const hops = [];
  const seen = new Set();
  let current = pathAndQuery;
  for (;;) {
    const res = await fetch(base + current, { redirect: "manual" });
    if (res.status < 300 || res.status >= 400) return { hops, finalPath: current, finalStatus: res.status, loop: false };
    const loc = res.headers.get("location");
    const next = new URL(loc, base + current);
    // Çapa sunucuya gitmez; takipte atılır ama raporda gösterilir.
    const shown = next.pathname + next.search + next.hash;
    hops.push({ status: res.status, to: shown });
    const key = next.pathname + next.search;
    if (seen.has(key) || hops.length > MAX_HOPS) return { hops, finalPath: shown, finalStatus: res.status, loop: true };
    seen.add(key);
    current = key;
  }
}

function classify(row) {
  const { oldPath, expected, hops, finalPath, finalStatus, loop } = row;
  const finalNoHash = decode(stripHash(finalPath)).split("?")[0];
  const firstTarget = hops[0] ? decode(stripHash(hops[0].to)).split("?")[0] : null;
  if (loop) return ["❌", "döngü"];
  if (expected === "404 (gizli)") {
    if (finalStatus === 404 && hops.length <= 1) return ["✅", hops.length ? "gizli — tek adımda 404" : "gizli — bilinçli 404"];
    if (finalStatus === 200) return ["❌", "gizli adres canlı sayfaya gidiyor"];
    return ["⚠", `gizli — ${hops.length} adımda ${finalStatus}`];
  }
  if (finalStatus >= 500) return ["❌", `sunucu hatası ${finalStatus}`];
  const removed = INTENTIONAL_404.get(decode(stripHtml(oldPath)));
  if (removed && finalStatus === 404 && hops.length <= 1) return ["✅", `kaldırıldı — bilinçli 404: ${removed}`];
  if (finalStatus === 404) {
    if (firstTarget && isHiddenPath(firstTarget)) return ["⚠", "gizli bir sayfaya yönleniyor (404) — karar gerekir"];
    return ["❌", hops.length ? `${hops.length} adımda 404` : "404"];
  }
  if (finalStatus !== 200) return ["❌", `durum ${finalStatus}`];
  const notes = [];
  if (expected === "—") return ["⚠", "eşleme yok ama açılıyor"];
  if (finalNoHash !== decode(stripHash(expected)).split("?")[0]) notes.push("beklenenden farklı hedef");
  if (hops.length > 1) notes.push(`zincir (${hops.length} adım)`);
  if (notes.length) return ["⚠", notes.join(" · ")];
  const first = hops[0]?.status;
  if (first === 302 || first === 307) return ["⏳", `GEÇİCİ yönlendirme (${first}) — kalıcı değil, geri alınacak`];
  if (first && first !== 301) return ["⚠", `kalıcı yönlendirme ${first} (301 değil)`];
  if (finalNoHash === "/" && oldPath !== "/") return ["✅", "ana sayfa — onaylı karar (config yorumunda)"];
  return ["✅", ""];
}

async function pool(items, size, fn) {
  const out = new Array(items.length);
  let i = 0;
  await Promise.all(
    Array.from({ length: size }, async () => {
      while (i < items.length) {
        const k = i++;
        out[k] = await fn(items[k]);
      }
    }),
  );
  return out;
}

// ---------------------------------------------------------------- ek kontroller

/** Sondaki eğik çizgi, büyük harf ve yüzde kodlaması — csv'de olmayan ama gerçek hayatta gelen biçimler. */
function extraCases(rows) {
  const cases = [];
  const finals = [...new Set(rows.filter((r) => r.result === "✅" && r.finalStatus === 200).map((r) => stripHash(r.finalPath).split("?")[0]))]
    .filter((p) => p !== "/")
    .sort();
  for (const p of finals) cases.push({ kind: "sondaki /", path: p + "/", expected: p });
  const htmlRows = rows.filter((r) => r.result === "✅" && r.oldPath.endsWith(".html") && !r.query).slice(0, 15);
  for (const r of htmlRows) cases.push({ kind: "büyük harf", path: r.oldPath.toUpperCase(), expected: "(bilgi)" });
  const decodedPairs = rows.filter((r) => /%[0-9A-F]{2}/i.test(r.oldPath));
  for (const r of decodedPairs) cases.push({ kind: "küçük harf %-kodu", path: r.oldPath.replace(/%[0-9A-F]{2}/g, (m) => m.toLowerCase()), expected: stripHash(r.expected) });
  return cases;
}

// ---------------------------------------------------------------- rapor

const esc = (s) => String(s).replace(/\|/g, "\\|");
const code = (s) => (s ? "`" + esc(s) + "`" : "");

function report(rows, extras, base) {
  const count = (k) => rows.filter((r) => r.result === k).length;
  const ok = count("✅");
  const warn = count("⚠");
  const bad = count("❌");
  const temp = count("⏳");
  const byReason = {};
  for (const r of rows.filter((r) => r.result !== "✅" && r.result !== "⏳")) byReason[`${r.result} ${r.note}`] = (byReason[`${r.result} ${r.note}`] ?? 0) + 1;

  const L = [];
  L.push(`# Eski adres taraması — ${TODAY}${LABEL ? ` (${LABEL})` : ""}`);
  L.push("");
  L.push(`> \`node scripts/check-redirects.mjs\` çıktısı. Kaynak: \`data/urls.csv\` (${rows.length} adres) · sunucu: \`next start\` (${base}) ·`);
  L.push(`> üretilen sayfa: ${PAGES.size} HTML · gizli sınav: ${HIDDEN_SLUGS.length} (\`data/hiddenPages.ts\`). Yönlendirmeler takip edilmeden istendi;`);
  L.push("> zincir betik tarafından adım adım izlendi. Kurallar `statusCode: 301`; Next'in kendi sondaki-`/` kuralı 308 kalır.");
  L.push("");
  L.push("## Özet");
  L.push("");
  L.push("| Sonuç | Adet |");
  L.push("|---|---:|");
  const deliberate404 = rows.filter((r) => r.result === "✅" && r.finalStatus === 404).length;
  L.push(`| ✅ doğru (${ok - deliberate404} yeni adresinde açılıyor + ${deliberate404} bilinçli 404) | **${ok}** |`);
  L.push(`| ⏳ geçici yönlendirme (bilinçli, geri alınacak) | **${temp}** |`);
  L.push(`| ⚠ açılıyor ama bakılmalı | **${warn}** |`);
  L.push(`| ❌ kayıp (404 / döngü / hata) | **${bad}** |`);
  L.push(`| **Toplam** | **${rows.length}** |`);
  L.push("");
  const hopDist = {};
  for (const r of rows) hopDist[r.hops.length] = (hopDist[r.hops.length] ?? 0) + 1;
  L.push(`Adım dağılımı: ${Object.entries(hopDist).map(([h, n]) => `${h} adım → ${n}`).join(" · ")} · döngü: ${rows.filter((r) => r.loop).length}`);
  L.push("");
  if (Object.keys(byReason).length) {
    L.push("| Sorun türü | Adet |");
    L.push("|---|---:|");
    for (const [k, n] of Object.entries(byReason).sort((a, b) => b[1] - a[1])) L.push(`| ${esc(k)} | ${n} |`);
    L.push("");
  }

  const table = (list) => {
    L.push("| # | Eski adres | Beklenen hedef | İlk kod | Gerçek hedef | Adım | Sonuç |");
    L.push("|---:|---|---|---:|---|---:|---|");
    for (const r of list) {
      const first = r.hops[0]?.status ?? r.finalStatus;
      const real = r.hops.length ? `${code(r.finalPath)} → ${r.finalStatus}` : `(aynı adres) → ${r.finalStatus}`;
      L.push(`| ${r.n} | ${code(r.old)} | ${code(r.expected)} | ${first} | ${real} | ${r.hops.length} | ${r.result} ${esc(r.note)} |`);
    }
    L.push("");
  };

  const temporary = rows.filter((r) => r.result === "⏳");
  if (temporary.length) {
    L.push(`## ⏳ Geçici yönlendirmeler (${temporary.length})`);
    L.push("");
    L.push("> Kalıcı (301) DEĞİL. Kural `next.config.ts` `TEMPORARY_REDIRECTS`'te; hedef sayfa açılınca silinir.");
    L.push("");
    table(temporary);
  }

  const problems = rows.filter((r) => r.result !== "✅" && r.result !== "⏳");
  L.push(`## Sorunlu satırlar (${problems.length})`);
  L.push("");
  if (problems.length) table(problems);
  else L.push("Yok.\n");

  L.push("## Ek kontroller (csv'de olmayan biçimler)");
  L.push("");
  L.push("| Tür | İstenen | Durum | Hedef | Adım | Not |");
  L.push("|---|---|---:|---|---:|---|");
  for (const e of extras) {
    L.push(`| ${e.kind} | ${code(e.path)} | ${e.finalStatus} | ${code(e.hops.length ? e.finalPath : "")} | ${e.hops.length} | ${esc(e.note)} |`);
  }
  L.push("");

  L.push(`## Tam tablo (${rows.length})`);
  L.push("");
  table(rows);
  return { md: L.join("\n"), summary: { date: TODAY, label: LABEL, total: rows.length, ok, temp, warn, bad, byReason } };
}

// ---------------------------------------------------------------- ana akış

const csvRows = parseCsv(readFileSync(CSV, "utf8"));
const server = BASE_ARG ? { base: BASE_ARG, stop: () => {} } : await startServer();
try {
  const rows = await pool(
    csvRows.map((r, i) => ({ n: i + 1, url: new URL(r.url) })),
    8,
    async ({ n, url }) => {
      const oldPath = url.pathname;
      const query = url.search;
      const old = decode(oldPath) + query;
      const cleanDecoded = decode(stripHtml(oldPath));
      let expected;
      const specific = specificTarget(oldPath, url.searchParams);
      if (specific) expected = specific;
      else if (isHiddenPath(cleanDecoded)) expected = "404 (gizli)";
      else expected = PAGES.has(cleanDecoded) ? cleanDecoded : "—";
      const t = await trace(server.base, oldPath + query);
      const row = { n, old, oldPath, query, expected, ...t };
      [row.result, row.note] = classify(row);
      return row;
    },
  );

  const extras = await pool(extraCases(rows), 8, async (e) => {
    const t = await trace(server.base, e.path);
    const finalNoHash = decode(stripHash(t.finalPath)).split("?")[0];
    let note;
    if (e.kind === "sondaki /") note = t.finalStatus === 200 && t.hops.length === 1 && finalNoHash === e.expected ? "✅ tek adımda" : "⚠";
    else if (e.kind === "büyük harf") note = t.finalStatus === 200 ? "açılıyor" : "ℹ büyük harfli adres 404 (Next büyük/küçük harfe duyarlı)";
    else note = t.finalStatus === 200 && finalNoHash === decode(e.expected).split("?")[0] ? "✅" : "⚠";
    return { ...e, ...t, note };
  });

  const { md, summary } = report(rows, extras, server.base);
  writeFileSync(OUT, md + "\n");
  writeFileSync(OUT.replace(/\.md$/, ".json"), JSON.stringify(summary, null, 2) + "\n");
  console.log(`Taranan: ${summary.total} · ✅ ${summary.ok} · ⏳ ${summary.temp} · ⚠ ${summary.warn} · ❌ ${summary.bad}`);
  for (const [k, n] of Object.entries(summary.byReason)) console.log(`  ${n} × ${k}`);
  console.log(`Rapor: ${relative(process.cwd(), OUT)}`);
  if (STRICT && summary.warn + summary.bad > 0) process.exitCode = 1;
} finally {
  server.stop();
}
