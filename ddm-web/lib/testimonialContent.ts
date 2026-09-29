/**
 * P7 — öğrenci yorumlarını `data/site_content.json`'dan çözer (yalnız SUNUCU; JSON istemci paketine girmez).
 *
 * Metin TAŞINIR, üretilmez (CLAUDE.md §5): kaynak kaydın ilk satırı başlık (ad) olarak atılır, son `signLines`
 * satır imza olur, gerisi yorumdur. Tek dokunuş `edits` (eski sitenin HTML'inden kalan kelime ortası kırılması).
 * Satır sonları eski HTML'in `<br>`'larından geldiği için cümle ortasında bitmiş satır bir sonrakiyle birleştirilir
 * (yalnız görüntü — kelime eklenmez / silinmez).
 *
 * Build'i düşüren denetimler: kaynakta tanımsız yorum ya da tanımı olmayan kayıt · aynı yorumun iki adresinde farklı
 * metin · ilk satırın başlıkla uyuşmaması · kullanılmayan `edits` · imzada bulunmayan `affiliation` · diskte olmayan
 * fotoğraf · boş yorum.
 */

import { existsSync } from "node:fs";
import { join } from "node:path";

import siteContent from "@/data/site_content.json";
import { TESTIMONIALS, TESTIMONIAL_FILTERS, type TestimonialDef } from "@/data/testimonials";
import { ContentSectionsError, type SiteContentRecord } from "@/lib/contentSections";
import type { StudentTestimonial } from "@/lib/types";

/** Tekil yorum adresi — `next.config.ts` `TESTIMONIAL_URL_RE` ile AYNI desen (config `@/` çözemediği için orada kopya). */
const RECORD_RE = /^\/ogrenci-yorumlari\/(\d+)-[^/?]+\.html$/;
const PHOTO_DIR = "/assets/testimonials";

function fail(message: string): never {
  throw new ContentSectionsError(`P7 öğrenci yorumları: ${message}`);
}

/** Kaynaktaki tüm tekil yorum kayıtları, id'ye göre (aynı yorumun ikinci adresi dahil). */
function sourceRecords(): Map<number, SiteContentRecord[]> {
  const byId = new Map<number, SiteContentRecord[]>();
  for (const record of siteContent as SiteContentRecord[]) {
    const m = RECORD_RE.exec(record.url.replace(/^https?:\/\/[^/]+/, ""));
    if (!m) continue;
    const id = Number(m[1]);
    byId.set(id, [...(byId.get(id) ?? []), record]);
  }
  return byId;
}

/** Cümle sonu noktalamasıyla bitmeyen satır bir sonraki satırla aynı paragrafta devam eder. */
function reflow(lines: string[]): string[] {
  const out: string[] = [];
  for (const line of lines) {
    const prev = out[out.length - 1];
    if (prev !== undefined && !/[.!?:…”")]$/.test(prev)) out[out.length - 1] = `${prev} ${line}`;
    else out.push(line);
  }
  return out;
}

function initialsOf(name: string): string {
  const words = name.split(/\s+/).filter(Boolean);
  return (words[0][0] + (words.length > 1 ? words[words.length - 1][0] : "")).toLocaleUpperCase("tr");
}

function resolve(def: TestimonialDef, records: SiteContentRecord[] | undefined): StudentTestimonial {
  if (!records) fail(`#${def.id} kaynakta yok.`);
  const [record, ...aliases] = records;
  for (const alias of aliases) {
    if (alias.text !== record.text) fail(`#${def.id} iki adresinde metin farklı: ${alias.url}`);
  }

  let text = record.text.replace(/ /g, " ");
  for (const [from, to] of Object.entries(def.edits ?? {})) {
    const count = text.split(from).length - 1;
    if (count !== 1) fail(`#${def.id} edits anahtarı kaynakta ${count} kez geçiyor: ${JSON.stringify(from)}`);
    text = text.replace(from, to);
  }

  const lines = text.split("\n").map((l) => l.replace(/\s+/g, " ").trim()).filter(Boolean);
  const name = record.title.trim();
  if (lines[0] !== name) fail(`#${def.id} ilk satır başlıkla uyuşmuyor: "${lines[0]}" ≠ "${name}"`);

  const body = lines.slice(1, lines.length - def.signLines);
  const sign = lines.slice(lines.length - def.signLines);
  if (body.length === 0) fail(`#${def.id} imza satırı sayısı yorumu yuttu (signLines: ${def.signLines}).`);
  if (def.affiliation && !sign.some((l) => l.includes(def.affiliation!))) {
    fail(`#${def.id} affiliation imzada yok: "${def.affiliation}" — imza: ${JSON.stringify(sign)}`);
  }

  let photo: StudentTestimonial["photo"];
  if (def.photo) {
    const src = `${PHOTO_DIR}/${def.photo.file}.jpg`;
    if (!existsSync(join(process.cwd(), "public", src))) fail(`#${def.id} fotoğraf yok: public${src}`);
    photo = { src, focus: def.photo.focus };
  }

  const paragraphs = reflow(body);
  return {
    id: def.id,
    name,
    initials: initialsOf(name),
    role: def.affiliation ?? def.tags.join(" · "),
    quote: paragraphs.join(" "),
    paragraphs,
    sign,
    tags: def.tags,
    filters: TESTIMONIAL_FILTERS.filter((f) => f.tags.some((t) => def.tags.includes(t))).map((f) => f.key),
    photo,
    lang: def.lang,
  };
}

type Resolved = { item: StudentTestimonial; published: boolean; home?: number };
let cache: Resolved[] | null = null;

/** Tanımlı 43 yorumun hepsi, `data/testimonials.ts` sırasıyla — bir kez çözülür (kaynak kapsaması burada denetlenir). */
function allTestimonials(): Resolved[] {
  if (!cache) cache = resolveAll();
  return cache;
}

function resolveAll(): Resolved[] {
  const byId = sourceRecords();
  const defined = new Set<number>();
  for (const def of TESTIMONIALS) {
    if (defined.has(def.id)) fail(`#${def.id} iki kez tanımlı.`);
    defined.add(def.id);
  }
  const missing = [...byId.keys()].filter((id) => !defined.has(id));
  if (missing.length) fail(`kaynakta olup data/testimonials.ts'te tanımı olmayan yorum: ${missing.join(", ")}`);
  const homes = TESTIMONIALS.filter((d) => d.home !== undefined);
  for (const def of homes) {
    if (!def.published) fail(`#${def.id} Ana Sayfa'da ama yayında değil.`);
    if (homes.filter((d) => d.home === def.home).length > 1) fail(`Ana Sayfa sırası ${def.home} iki kez kullanılmış.`);
  }
  return TESTIMONIALS.map((def) => ({ item: resolve(def, byId.get(def.id)), published: def.published, home: def.home }));
}

/** Yayındaki yorumlar (sayfa + Ana Sayfa). */
export function getPublishedTestimonials(): StudentTestimonial[] {
  return allTestimonials().filter((t) => t.published).map((t) => t.item);
}

/** Ana Sayfa kaydırıcısı — `home` sırasıyla. */
export function getHomeTestimonials(): StudentTestimonial[] {
  const items = allTestimonials()
    .filter((t) => t.home !== undefined)
    .sort((a, b) => a.home! - b.home!)
    .map((t) => t.item);
  if (items.length === 0) fail("Ana Sayfa için işaretli yorum yok (`home`).");
  return items;
}

/** Süzgeç düğmeleri — yalnız en az bir yayındaki yoruma karşılık gelenler, sayılarıyla. */
export function getTestimonialFilters(): { key: string; label: string; count: number }[] {
  const items = getPublishedTestimonials();
  return TESTIMONIAL_FILTERS.map((f) => ({
    key: f.key,
    label: f.label,
    count: items.filter((t) => t.filters.includes(f.key)).length,
  })).filter((f) => f.count > 0);
}
