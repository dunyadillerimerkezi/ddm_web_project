/**
 * P3 — Kategori hub sayfaları içerik sözleşmesi.
 *
 * `lib/examContent.ts` ile aynı çekirdek (`SectionResolver` + `assertCoverage`):
 * kaynağın HER satırı ya bir slota tüketilir ya `ignored`de gerekçeyle durur.
 * `edits` / `headingEdits` girdisinin kaynakta karşılığı kalmazsa build düşer —
 * düzenlemeler izlenebilir kalır (bkz. `data/hubs.ts` başlığı).
 *
 * Metadata kuralı (CLAUDE.md §6) + P3 sınırları: title ≤60, description ≤155
 * karakter. Aşılırsa build düşer (sessizce kesilmez).
 */

import siteContent from "@/data/site_content.json";
import {
  ContentSectionsError,
  SectionResolver,
  parseRecord,
  type SiteContentRecord,
} from "@/lib/contentSections";
import type { HubDef } from "@/data/hubs";

export type HubFeature = { title: string; body: string };
export type HubSourceLink = { label: string; href: string };

export type CategoryHubPage = {
  def: HubDef;
  /** Kaynak başlığı → basılacak metin (`headingEdits` uygulanmış, ok işareti atılmış). */
  heading: (source: string) => string;
  title: string;
  description: string;
  h1: string;
  slots: Record<string, string[]>;
  features: HubFeature[];
  sourceLinks: HubSourceLink[];
};

const TITLE_MAX = 60;
const DESCRIPTION_MAX = 155;

function norm(s: string): string {
  return s.replace(/ /g, " ").replace(/\s+/g, " ").trim();
}

/** Şablon bloğunun ok işareti ("→ Esnek öğrenme") arayüz süsü, başlık metni değil. */
export function stripArrow(s: string): string {
  return s.replace(/^→\s*/, "");
}

function findRecord(path: string): SiteContentRecord {
  const url = `https://www.dunyadillerimerkezi.com${path}.html`;
  const record = (siteContent as SiteContentRecord[]).find((r) => r.url === url);
  if (!record) throw new ContentSectionsError(`data/site_content.json içinde "${url}" kaydı yok.`);
  return record;
}

const cache = new Map<string, CategoryHubPage>();

export function getCategoryHubPage(def: HubDef): CategoryHubPage {
  // Geliştirmede önbellek kullanılmaz: `data/hubs.ts` değişince bu modül yeniden yüklenmez, eski metin kalırdı.
  const hit = process.env.NODE_ENV === "production" ? cache.get(def.path) : undefined;
  if (hit) return hit;

  const context = `hub${def.path}`;
  const record = findRecord(def.path);
  const sections = parseRecord(record);
  const resolver = new SectionResolver(sections);

  const edits = new Map(Object.entries(def.edits ?? {}));
  const usedEdits = new Set<string>();
  const headingEdits = new Map(Object.entries(def.headingEdits ?? {}));

  /** Boş string'e düzenlenen satır bir önceki satıra BİRLEŞTİRİLMİŞTİR
   *  (kaynakta ortadan bölünmüş cümle) — çıktıdan düşer, kapsamada sayılır. */
  const applyEdits = (lines: string[]) =>
    lines
      .map((l) => {
        const edited = edits.get(l);
        if (edited === undefined) return l;
        usedEdits.add(l);
        return edited;
      })
      .filter((l) => l !== "");

  const headingText = (h: string) => headingEdits.get(h) ?? stripArrow(h);

  // 1) Adlandırılmış slotlar
  const slots: Record<string, string[]> = {};
  for (const [name, ref] of Object.entries(def.slots)) {
    // `take: []` → yalnız BAŞLIK tüketilir (başlık basılır, gövdesi başka slotta).
    const headingOnly = Array.isArray(ref.take) && ref.take.length === 0;
    slots[name] = applyEdits(
      resolver.take({ heading: ref.heading, take: ref.take, allowEmpty: headingOnly }, `${context}/slots.${name}`) ?? [],
    );
  }

  // 2) Şablon özellik bloğu — başlık ayrı, gövde (bir önceki başlığın satırı) ayrı
  const features: HubFeature[] = (def.features ?? []).map((f, i) => {
    resolver.take({ heading: f.heading, take: [], allowEmpty: true }, `${context}/features[${i}]/başlık`);
    const body = applyEdits(resolver.take({ heading: f.body.heading, take: f.body.take }, `${context}/features[${i}]/gövde`) ?? []);
    return { title: headingText(f.heading), body: body.join(" ") };
  });

  // 3) Kaynaktaki link etiketleri — etiket birebir, hedef eşlemeden
  const sourceLinks: HubSourceLink[] = [];
  if (def.sourceLinks) {
    const { heading, links } = def.sourceLinks;
    const paragraphs = sections.filter((s) => s.heading === heading).flatMap((s) => s.paragraphs);
    const indices = Object.keys(links).map((label) => {
      const at = paragraphs.indexOf(label);
      if (at < 0) throw new ContentSectionsError(`${context}/sourceLinks: etiket kaynakta yok — "${label}"`);
      return at;
    });
    resolver.take({ heading, take: indices }, `${context}/sourceLinks`);
    for (const [label, href] of Object.entries(links)) sourceLinks.push({ label, href });
  }

  // 4) Kaynaktaki diğer satırlar — gerekçeli `ignored` ya da kapsama hatası
  for (const key of edits.keys()) {
    if (!usedEdits.has(key)) throw new ContentSectionsError(`${context}: kullanılmayan edits girdisi — "${key}"`);
  }
  // headingEdits sayfa render'ında da okunur; bu yüzden "kullanıldı mı" değil,
  // "anahtar kaynakta gerçekten bir başlık mı" denetlenir (çürümüş eşleme build'i düşürür).
  const sourceHeadings = new Set(record.headings.map((h) => norm(h.text)));
  for (const key of headingEdits.keys()) {
    if (!sourceHeadings.has(key)) throw new ContentSectionsError(`${context}: headingEdits anahtarı kaynakta başlık değil — "${key}"`);
  }
  resolver.assertCoverage(def.ignored.map((i) => i.line), context);

  // Metadata (CLAUDE.md §6) — kaynak, yoksa gerekçeli düzeltme
  const title = norm(def.meta.title ?? record.title);
  const description = norm(def.meta.description ?? record.meta_description);
  if (title.length > TITLE_MAX) throw new ContentSectionsError(`${context}: title ${title.length} karakter (≤${TITLE_MAX}).`);
  if (description.length > DESCRIPTION_MAX) {
    throw new ContentSectionsError(`${context}: description ${description.length} karakter (≤${DESCRIPTION_MAX}).`);
  }
  const sourceH1 = record.headings.find((h) => h.level === "h1");
  let h1 = def.meta.h1 ?? (sourceH1 ? norm(sourceH1.text) : null);
  if (!h1) {
    h1 = norm(record.headings[0]?.text ?? record.title);
    console.warn(`[hubContent] ${def.path}: kaynakta h1 yok — ilk başlığa düşüldü ("${h1}").`);
  }

  const page: CategoryHubPage = { def, heading: headingText, title, description, h1, slots, features, sourceLinks };
  cache.set(def.path, page);
  return page;
}
