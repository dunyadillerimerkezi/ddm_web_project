#!/usr/bin/env node
/**
 * ddmcadde.com'daki dil kursu sayfalarının gövde metnini çekip
 * `data/site_content.json`deki karşılık gelen kaydı günceller.
 *
 * Kullanım:
 *   node scripts/pull-ddmcadde.mjs               # 9 dilin hepsi, yazar
 *   node scripts/pull-ddmcadde.mjs --dry-run      # 9 dilin hepsi, sadece diff basar
 *   node scripts/pull-ddmcadde.mjs almanca-kursu  # tek dil
 *   node scripts/pull-ddmcadde.mjs --new          # eski sitede olmayan 5 dil + 6 sınav → data/ddmcadde_content.json
 *
 * Bkz. plan: docs/faz6.4-dil-kursu-prompt.md ve oturum planı
 * (~/.claude/plans/imdi-ben-nceden-yabanc-transient-sunset.md).
 *
 * TASARIM KURALI (CLAUDE.md §5): gövde metni asla yeniden yazılmaz, kaynaktan
 * birebir taşınır. Bu script SADECE http çeker + HTML etiketlerini soyar —
 * hiçbir cümleyi değiştirmez/özetlemez.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_CONTENT_PATH = path.join(__dirname, "..", "data", "site_content.json");

/** ddmcadde.com kaynak slug'ı → proje slug'ı + eski link bölümünün başlığı. */
const LANGUAGES = [
  { src: "almanca", slug: "almanca-kursu", linkHeading: "Almanca Eğitim Programı ve Kurs Tarihleri" },
  { src: "fransizca", slug: "fransizca-kursu", linkHeading: "Fransızca Eğitim Plan Tablosu ve Kurs Tarihleri" },
  { src: "italyanca", slug: "italyanca-kursu", linkHeading: "İtalyanca Eğitim Plan Tablosu ve Kurs Tarihleri" },
  { src: "ispanyolca", slug: "ispanyolca-kursu", linkHeading: "İspanyolca Eğitim Plan Tablosu ve Kurs Tarihleri" },
  { src: "rusca", slug: "rusca-kursu", linkHeading: "Rusça Eğitim Plan Tablosu ve Kurs Tarihleri" },
  { src: "cince", slug: "cince-kursu", linkHeading: "Çince Eğitim Plan Tablosu ve Kurs Tarihleri" },
  { src: "flemenkce", slug: "flemenkce-kursu", linkHeading: null }, // child URL yok
  { src: "turkce", slug: "yabancila-icin-turkce-kurs", linkHeading: "Türkçe Eğitim Plan Tablosu ve Kurs Tarihleri" },
  { src: "konusma", slug: "ingilizce-konusma-kursu", linkHeading: "İngilizce Konuşma Eğitim Plan Tablosu ve Kurs Tarihleri" },
];

/**
 * Eski sitede (dunyadillerimerkezi.com) sayfası OLMAYAN 5 dil (kullanıcı isteği, 2026-10-01). Kaynakları
 * `site_content.json`a değil ayrı `data/ddmcadde_content.json`a yazılır — eski sitenin crawl'ı ile karışmasın
 * (301 / sayım betikleri o dosyayı eski sitenin envanteri sayar). `--new` ile çalışır.
 * Fiyat bölümü ("… Fiyatları") dosyaya HİÇ alınmaz (kullanıcı kararı: sitede fiyat yok).
 */
const NEW_LANGUAGES = [
  { src: "dil/japonca-kursu", slug: "japonca-kursu" },
  { src: "dil/korece-kursu", slug: "korece-kursu" },
  { src: "dil/yunanca-kursu", slug: "yunanca-kursu" },
  { src: "dil/bulgarca-kursu", slug: "bulgarca-kursu" },
  { src: "dil/isveccekursu", slug: "isvecce-kursu" },
  // Sınavlar (2026-10-01) — aynı kural: fiyat / ücret satırı ve kurs başlangıç tarihi alınmaz.
  { src: "sinav/almanca-telc-kursu", slug: "telc-kursu" },
  { src: "sinav/delf-kursu", slug: "delf-dalf-kursu" },
  { src: "sinav/delesinavikursu", slug: "dele-kursu" },
  { src: "sinav/cils-celi-sinav-kurslari", slug: "cils-celi-kursu" },
  { src: "sinav/e-tep-kursu", slug: "e-tep-kursu" },
  { src: "sinav/oet-kursu", slug: "oet-kursu" },
  // Eski sitede sayfası OLAN ama metni çok kısa sınav (kullanıcı, 2026-10-01: "testdaf sayfasının yazısı çok az,
  // ddmcadde'den bilgi alarak eklemeler yapabilirsin"). Ana kaynak site_content.json kalır; bu kayıt EK kaynaktır.
  { src: "sinav/testdaf", slug: "testdaf-kursu" },
  // 2026-10-02 (kullanıcı): ÖSD — aynı şubenin Almanca sitesinden (aynı Joomla şablonu, aynı kurallar).
  { src: "sinav/osd-kursu", slug: "osd-kursu", origin: "https://almancakurslari.com" },
];
const DDMCADDE = "https://www.ddmcadde.com";
const NEW_CONTENT_PATH = path.join(__dirname, "..", "data", "ddmcadde_content.json");

const MARK = '<div class="com-content-article__body">';

function normalize(s) {
  return s.replace(/ /g, " ").replace(/\s+/g, " ").trim();
}

/** `MARK`den başlayarak div derinliğini sayıp gövde HTML'ini izole eder. */
function extractArticleBody(html) {
  const i = html.indexOf(MARK);
  if (i < 0) throw new Error("com-content-article__body bulunamadı");
  let depth = 1;
  const re = /<div\b|<\/div>/gi;
  re.lastIndex = i + MARK.length;
  let m;
  while ((m = re.exec(html))) {
    depth += m[0].toLowerCase() === "</div>" ? -1 : 1;
    if (depth === 0) return html.slice(i + MARK.length, m.index);
  }
  throw new Error("div derinliği dengelenmedi");
}

function decodeEntities(s) {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&rsquo;/g, "’")
    .replace(/&lsquo;/g, "‘")
    .replace(/&rdquo;/g, "”")
    .replace(/&ldquo;/g, "“")
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)));
}

const CEFR_RE = /\((A|B|C)[12]\s*[–-]\s*(A|B|C)[12]\)/;

/**
 * Gövde HTML'ini (h1-h6|p|li) satırlarına indirger ve İngilizce kaydında
 * doğrulanan seviye normalizasyonunu uygular:
 *  - kaynaktaki h3 → h2 (ör. "Kurs ve Özel Ders Fiyatları")
 *  - "… İçeriği Nedir?" başlığının altındaki CEFR aralıklı <p> satırı → h3
 *    (levelGroups eşlemesi başlık bazlı çalıştığı için gerekli)
 */
function extractLines(articleHtml) {
  let body = articleHtml.replace(/<img[^>]*>/gi, "");
  body = body.replace(/<br\s*\/?>/gi, "\n");

  const raw = [];
  const tagRe = /<(h[1-6]|p|li)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let m;
  while ((m = tagRe.exec(body))) {
    const tag = m[1].toLowerCase();
    const inner = decodeEntities(m[2].replace(/<[^>]+>/g, ""));
    for (const part of inner.split("\n")) {
      const text = normalize(part);
      if (text) raw.push({ tag, text });
    }
  }

  let inLevelSection = false;
  const out = [];
  for (const { tag, text } of raw) {
    let level = tag;
    if (tag === "h3") level = "h2";

    if (/İçeriği Nedir\?$/.test(text) && tag === "h2") inLevelSection = true;
    else if (level === "h2") inLevelSection = false;

    if (inLevelSection && tag === "p" && CEFR_RE.test(text)) {
      level = "h3";
    }
    out.push({ level, text });
  }
  return out;
}

async function fetchLines(src, origin = DDMCADDE) {
  const res = await fetch(`${origin}/${src.includes("/") ? src : `dil/${src}`}`, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; ddm-web-content-sync/1.0)" },
  });
  if (!res.ok) throw new Error(`${src}: HTTP ${res.status}`);
  const html = await res.text();
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  return {
    lines: extractLines(extractArticleBody(html)),
    sourceTitle: titleMatch ? normalize(decodeEntities(titleMatch[1])) : null,
  };
}

/** Kayıttaki mevcut link bölümünün (başlık + paragraflar) TAM halini döner. */
function findExistingLinkSection(record, linkHeading) {
  if (!linkHeading) return null;
  const headingSet = new Set(record.headings.map((h) => normalize(h.text)));
  const lines = record.text.split("\n").map(normalize).filter(Boolean);
  const sections = [{ heading: null, paragraphs: [] }];
  for (const line of lines) {
    if (headingSet.has(line)) sections.push({ heading: line, paragraphs: [] });
    else sections[sections.length - 1].paragraphs.push(line);
  }
  const target = normalize(linkHeading);
  const found = sections.find((s) => s.heading === target);
  if (!found) throw new Error(`Mevcut kayıtta link başlığı bulunamadı: "${linkHeading}"`);
  return found;
}

/** İngilizce kaydından türetilen kural: title = H1 + " | Dünya Dilleri Merkezi". */
function buildTitle(h1) {
  return `${h1} | Dünya Dilleri Merkezi`;
}

/** Gövdenin ilk 1-2 paragrafından ~155-160 karakterlik bir özet üretir. */
function buildMetaDescription(paragraphs) {
  const joined = paragraphs.join(" ");
  if (joined.length <= 160) return joined;
  const cut = joined.slice(0, 157);
  const lastSpace = cut.lastIndexOf(" ");
  return cut.slice(0, lastSpace > 100 ? lastSpace : 157).trim() + "...";
}

function buildRecord(record, lines, existingLinkSection) {
  const h1Line = lines.find((l) => l.level === "h1");
  if (!h1Line) throw new Error("h1 bulunamadı");

  const headings = lines
    .filter((l) => l.level.startsWith("h"))
    .map((l) => ({ level: l.level, text: l.text }));

  const bodyParagraphs = lines.filter((l) => l.level === "p").map((l) => l.text);

  let textLines = lines.map((l) => l.text);
  if (existingLinkSection) {
    headings.push({ level: "h2", text: existingLinkSection.heading });
    textLines = [...textLines, existingLinkSection.heading, ...existingLinkSection.paragraphs];
  }

  const text = textLines.join("\n");
  const wordCount = text.split(/\s+/).filter(Boolean).length;

  return {
    ...record,
    title: buildTitle(h1Line.text),
    meta_description: buildMetaDescription(bodyParagraphs.slice(0, 2)),
    headings,
    text,
    word_count: wordCount,
  };
}

function diffLines(oldText, newText, label) {
  const a = oldText.split("\n").filter(Boolean);
  const b = newText.split("\n").filter(Boolean);
  const max = Math.max(a.length, b.length);
  let changed = 0;
  const preview = [];
  for (let i = 0; i < max; i++) {
    if (a[i] !== b[i]) {
      changed++;
      if (preview.length < 6) {
        preview.push(`  - ${(a[i] ?? "(yok)").slice(0, 90)}`);
        preview.push(`  + ${(b[i] ?? "(yok)").slice(0, 90)}`);
      }
    }
  }
  console.log(`  [${label}] eski ${a.length} satır → yeni ${b.length} satır, ${changed} fark`);
  for (const p of preview) console.log(p);
  if (changed > preview.length / 2) console.log("  ...");
}

/**
 * Fiyat bölümünü (başlık + altındaki satırlar, bir sonraki h2'ye kadar) ve tek tek fiyat satırlarını ("Eğitim
 * Ücreti: 30.000 TL") atar. Kurs başlangıç tarihi ("Kurs Başlama: …") da alınmaz — dönemlik, eskir.
 * H1'deki "… ve Ders Fiyatları" kalır; sayfada `h1Edit` ile izlenebilir biçimde çıkarılır.
 */
function dropPricing(lines) {
  const out = [];
  let skipping = false;
  for (const l of lines) {
    if (l.level === "h2") skipping = /Fiyat/i.test(l.text);
    if (skipping) continue;
    if (!l.level.startsWith("h") && (/Ücreti\s*:|Fiyat|\d[\d.]*\s*TL\b/i.test(l.text) || /Kurs Başlama/i.test(l.text))) continue;
    out.push(l);
  }
  return out;
}

async function pullNew(dryRun, requested) {
  const targets = requested.length ? NEW_LANGUAGES.filter((l) => requested.includes(l.slug)) : NEW_LANGUAGES;
  const records = [];
  for (const { src, slug, origin = DDMCADDE } of targets) {
    const { lines: all, sourceTitle } = await fetchLines(src, origin);
    // Satır başındaki süs işareti ("✅ Kurs Günleri: …") metin değil — "Etiket: değer" kartına temiz düşsün.
    const lines = dropPricing(all).map((l) => ({ ...l, text: l.text.replace(/^✅\s*/u, "") }));
    const h1 = lines.find((l) => l.level === "h1");
    if (!h1) throw new Error(`${slug}: h1 bulunamadı`);
    const text = lines.map((l) => l.text).join("\n");
    records.push({
      url: `${origin}/${src}`,
      slug,
      status: 200,
      // title / description sayfada `data/languages.ts` `meta` ile yeniden yazılır; burada kaynağın kendi başlığı durur.
      title: sourceTitle ?? h1.text,
      meta_description: "",
      canonical: "",
      headings: lines.filter((l) => l.level.startsWith("h")).map((l) => ({ level: l.level, text: l.text })),
      text,
      word_count: text.split(/\s+/).filter(Boolean).length,
    });
    console.log(`== ${slug} (kaynak: /${src}) — ${all.length - lines.length} fiyat / tarih satırı atıldı, ${lines.length} satır`);
  }
  if (dryRun) {
    console.log("\n--dry-run: dosya yazılmadı.");
    return;
  }
  // Yalnız "dosya yok" boş sayılır; bozuk JSON'da durulur (aksi halde diğer kayıtlar sessizce silinirdi).
  let existing = [];
  try {
    existing = JSON.parse(readFileSync(NEW_CONTENT_PATH, "utf-8"));
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }
  const merged = [...existing.filter((r) => !records.some((n) => n.slug === r.slug)), ...records].sort(
    (a, b) => NEW_LANGUAGES.findIndex((l) => l.slug === a.slug) - NEW_LANGUAGES.findIndex((l) => l.slug === b.slug),
  );
  writeFileSync(NEW_CONTENT_PATH, JSON.stringify(merged, null, 2) + "\n", "utf-8");
  console.log(`\n${NEW_CONTENT_PATH} güncellendi.`);
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  if (args.includes("--new")) {
    await pullNew(
      dryRun,
      args.filter((a) => !a.startsWith("--")),
    );
    return;
  }
  const requested = args.filter((a) => !a.startsWith("--"));
  const targets = requested.length ? LANGUAGES.filter((l) => requested.includes(l.slug)) : LANGUAGES;

  if (targets.length === 0) {
    console.error("Eşleşen dil bulunamadı:", requested.join(", "));
    process.exit(1);
  }

  const siteContent = JSON.parse(readFileSync(SITE_CONTENT_PATH, "utf-8"));

  for (const { src, slug, linkHeading } of targets) {
    const idx = siteContent.findIndex((r) => r.url.endsWith(`/yabanci-dil-egitimleri/${slug}.html`));
    if (idx === -1) {
      console.error(`!! ${slug}: site_content.json'da kayıt bulunamadı, atlanıyor`);
      continue;
    }
    const record = siteContent[idx];

    console.log(`== ${slug} (kaynak: /dil/${src})`);
    const { lines } = await fetchLines(src);
    const existingLinkSection = findExistingLinkSection(record, linkHeading);
    const updated = buildRecord(record, lines, existingLinkSection);

    diffLines(record.text, updated.text, slug);
    console.log(`  title: "${record.title}" → "${updated.title}"`);
    console.log(`  meta : "${updated.meta_description}"`);

    if (!dryRun) siteContent[idx] = updated;
  }

  if (dryRun) {
    console.log("\n--dry-run: dosya yazılmadı.");
    return;
  }

  writeFileSync(SITE_CONTENT_PATH, JSON.stringify(siteContent, null, 2) + "\n", "utf-8");
  console.log(`\n${SITE_CONTENT_PATH} güncellendi.`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
