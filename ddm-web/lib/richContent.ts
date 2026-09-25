/**
 * P4 — Zengin İçerik alt sayfaları içerik sözleşmesi (ilk alt tür: özel ders).
 *
 * `lib/hubContent.ts` ile aynı çekirdek (`SectionResolver` + `assertCoverage`):
 * kaynağın HER satırı ya bir slota tüketilir ya `ignored`de gerekçeyle durur.
 * Kaynakta karşılığı kalmayan `edits` / `headingEdits` girdisi build'i düşürür;
 * title >60 / description >155 karakter de (CLAUDE.md §6, sessizce kesilmez).
 *
 * Çıktı blok listesidir (`RichBlock`) — sonraki alt türler (online, nedir…)
 * aynı sayfa bileşenine yeni blok türleriyle eklenir.
 */

import type { Metadata } from "next";

import siteContent from "@/data/site_content.json";
import { EXAMS } from "@/data/exams";
import { PRIVATE_HUB_ADDED } from "@/data/hubs";
import { LANGUAGES } from "@/data/languages";
import { PRIVATE_LESSONS } from "@/data/privateLessons";
import type { FormatPart, LevelItem, Photo, PrivateLessonDef, SlotRef } from "@/data/privateLessonsShared";
import type { IconName } from "@/components/graphics/icons";
import {
  ContentSectionsError,
  SectionResolver,
  parseRecord,
  type SiteContentRecord,
} from "@/lib/contentSections";
import { absoluteUrl } from "@/lib/site";
import type { Crumb, Faq } from "@/lib/types";

const TITLE_MAX = 60;
const DESCRIPTION_MAX = 155;

export type RichAboutPart =
  | { kind: "p"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "areas"; items: { label: string; icon: IconName; children: string[] }[] };

export type RichBlock =
  | { kind: "levels"; id: string; title: string; lead: string; levels: LevelItem[]; defaultKey: string }
  | {
      kind: "format";
      id: string;
      title: string;
      lead: string;
      parts: FormatPart[];
      facts: { label: string; value: string }[];
      note: string | null;
    }
  | { kind: "about"; id: string; title: string; parts: RichAboutPart[]; photo: Photo }
  | { kind: "compare"; id: string; title: string; rows: { row: string; ozel: string; grup: string }[] }
  | { kind: "faq"; id: string; title: string; items: Faq[]; updated: string };

export type RichPage = {
  href: string;
  /** Kırıntı etiketi ("Almanca Özel Ders"). */
  label: string;
  title: string;
  description: string;
  h1: string;
  crumbs: Crumb[];
  parent: { label: string; href: string };
  hero: { lead: string; photo: Photo; facts: { icon: IconName; label: string }[]; secondary: { label: string; href: string } };
  blocks: RichBlock[];
};

function norm(s: string): string {
  return s.replace(/ /g, " ").replace(/\s+/g, " ").trim();
}

function findRecord(path: string): SiteContentRecord {
  const url = `https://www.dunyadillerimerkezi.com${path}.html`;
  const record = (siteContent as SiteContentRecord[]).find((r) => r.url === url);
  if (!record) throw new ContentSectionsError(`data/site_content.json içinde "${url}" kaydı yok.`);
  return record;
}

/** İlk cümle / kalan. Cümle sonu: ". " + büyük harf ya da rakam (ör. "öğrenin. 2003 yılından"). */
function splitFirstSentence(paragraph: string, context: string): [string, string] {
  const m = /^(.+?[.!?])\s+(?=[A-ZÇĞİÖŞÜ0-9])(.+)$/u.exec(paragraph);
  if (!m) throw new ContentSectionsError(`${context}: paragraf cümlelere bölünemedi — "${paragraph.slice(0, 60)}…"`);
  return [m[1], m[2]];
}

/** Kırıntının kategori halkası — yolun ilk parçasından. */
const CATEGORY_CRUMB: Record<string, Crumb> = {
  "yabanci-dil-egitimleri": { label: "Yabancı Dil", href: "/yabanci-dil" },
  "sinav-hazirlik-egitimleri": { label: "Sınav Hazırlık", href: "/sinav-hazirlik-egitimleri" },
};

/** Üst kurs: "/{kategori}/{kurs}/…" → dil ya da sınav kursunun etiketi. */
function parentCourse(path: string, context: string): { label: string; href: string } {
  const [, category, slug] = path.split("/");
  const label = LANGUAGES.find((l) => l.slug === slug)?.label ?? EXAMS.find((e) => e.slug === slug)?.label;
  if (!label) throw new ContentSectionsError(`${context}: üst kurs bulunamadı — "${slug}"`);
  return { label, href: `/${category}/${slug}` };
}

const cache = new Map<string, RichPage>();

export function getPrivateLessonPage(def: PrivateLessonDef): RichPage {
  const hit = cache.get(def.path);
  if (hit) return hit;

  const context = `ozel-ders${def.path}`;
  const record = findRecord(def.path);
  const resolver = new SectionResolver(parseRecord(record));
  const sourceHeadings = new Set(record.headings.map((h) => norm(h.text)));

  const edits = new Map(Object.entries(def.edits ?? {}));
  const usedEdits = new Set<string>();
  const headingEdits = new Map(Object.entries(def.headingEdits ?? {}));
  const headingText = (h: string) => headingEdits.get(h) ?? h;

  const take = (ref: SlotRef, slot: string): string[] =>
    (resolver.take({ heading: ref.heading, take: ref.take }, `${context}/${slot}`) ?? []).map((line) => {
      const edited = edits.get(line);
      if (edited === undefined) return line;
      usedEdits.add(line);
      return edited;
    });

  // Hero: giriş paragrafı — `split` ise ilk cümlesi, kalanı "introRest".
  const introParagraphs = take(def.hero.intro, "hero.intro");
  if (introParagraphs.length !== 1) throw new ContentSectionsError(`${context}/hero.intro: tek paragraf bekleniyordu.`);
  const [lead, introRest] = def.hero.split
    ? splitFirstSentence(introParagraphs[0], `${context}/hero.intro`)
    : [introParagraphs[0], null];

  // Hakkımızda — parçalar tanım sırasıyla.
  const aboutParts: RichAboutPart[] = [];
  const pushAreas = (items: { label: string; icon: IconName; children: string[] }[]) => {
    const last = aboutParts[aboutParts.length - 1];
    if (last?.kind === "areas") last.items.push(...items);
    else aboutParts.push({ kind: "areas", items });
  };
  def.about.parts.forEach((part, i) => {
    const slot = `about.parts[${i}]`;
    switch (part.kind) {
      case "introRest":
        if (introRest === null) throw new ContentSectionsError(`${context}/${slot}: introRest var ama hero.split kapalı.`);
        aboutParts.push({ kind: "p", text: introRest });
        break;
      case "text":
        for (const text of take(part.ref, slot)) aboutParts.push({ kind: "p", text });
        break;
      case "section":
        aboutParts.push({ kind: "h3", text: headingText(part.heading) });
        for (const text of take({ heading: part.heading, take: part.take }, slot)) aboutParts.push({ kind: "p", text });
        break;
      case "areas": {
        const lines = take(part.ref, slot);
        if (lines.length !== part.icons.length) {
          throw new ContentSectionsError(`${context}/${slot}: ${lines.length} alan, ${part.icons.length} ikon — eşleşmeli.`);
        }
        pushAreas(lines.map((label, j) => ({ label, icon: part.icons[j], children: [] })));
        break;
      }
      case "areaGroup":
        pushAreas([{ label: headingText(part.heading), icon: part.icon, children: take({ heading: part.heading }, slot) }]);
        break;
    }
  });

  let aboutTitle: string;
  if ("source" in def.about.title) {
    const h = def.about.title.source;
    if (!sourceHeadings.has(h)) throw new ContentSectionsError(`${context}: about.title kaynakta başlık değil — "${h}"`);
    aboutTitle = headingText(h);
  } else {
    aboutTitle = def.about.title.added;
  }

  const faqItems: Faq[] = def.faq.map((f, i) => ({
    question: f.question,
    answer: "added" in f.answer ? f.answer.added : take(f.answer.source, `faq[${i}]`),
  }));

  for (const key of edits.keys()) {
    if (!usedEdits.has(key)) throw new ContentSectionsError(`${context}: kullanılmayan edits girdisi — "${key}"`);
  }
  for (const key of headingEdits.keys()) {
    if (!sourceHeadings.has(key)) throw new ContentSectionsError(`${context}: headingEdits anahtarı kaynakta başlık değil — "${key}"`);
  }
  resolver.assertCoverage(def.ignored.map((i) => i.line), context);

  // Metadata (CLAUDE.md §6)
  const title = norm(def.meta.title ?? record.title);
  const description = norm(def.meta.description ?? record.meta_description);
  if (title.length > TITLE_MAX) throw new ContentSectionsError(`${context}: title ${title.length} karakter (≤${TITLE_MAX}).`);
  if (description.length > DESCRIPTION_MAX) {
    throw new ContentSectionsError(`${context}: description ${description.length} karakter (≤${DESCRIPTION_MAX}).`);
  }
  const sourceH1 = record.headings.find((h) => h.level === "h1");
  let h1 = def.meta.h1 ?? (sourceH1 ? headingText(norm(sourceH1.text)) : null);
  if (!h1) {
    h1 = norm(record.headings[0]?.text ?? record.title);
    console.warn(`[richContent] ${def.path}: kaynakta h1 yok — ilk başlığa düşüldü ("${h1}").`);
  }

  const categoryCrumb = CATEGORY_CRUMB[def.path.split("/")[1]];
  if (!categoryCrumb) throw new ContentSectionsError(`${context}: kategori kırıntısı tanımsız.`);
  const parent = parentCourse(def.path, context);

  const f = def.feature;
  const featureBlock: RichBlock =
    f.kind === "levels"
      ? { kind: "levels", id: "seviyeler", title: f.title, lead: f.lead, levels: f.items, defaultKey: f.defaultKey }
      : { kind: "format", id: "sinav-formati", title: f.title, lead: f.lead, parts: f.parts, facts: f.facts, note: f.note ?? null };
  if (featureBlock.kind === "levels" && !featureBlock.levels.some((l) => l.key === featureBlock.defaultKey)) {
    throw new ContentSectionsError(`${context}: feature.defaultKey seviyeler arasında yok — "${featureBlock.defaultKey}"`);
  }

  const blocks: RichBlock[] = [
    featureBlock,
    { kind: "about", id: "ozel-ders", title: aboutTitle, parts: aboutParts, photo: def.about.photo },
  ];
  if (def.compare) {
    const omit = new Set(def.compare.omitRows);
    const rows = PRIVATE_HUB_ADDED.compare.filter((r) => !omit.has(r.row));
    if (rows.length !== PRIVATE_HUB_ADDED.compare.length - omit.size) {
      throw new ContentSectionsError(`${context}: compare.omitRows tabloda olmayan satır içeriyor.`);
    }
    // P3'te onaylanan özel ders / grup karşılaştırması (hücreler firma sayfalarından, `data/hubs.ts`).
    blocks.push({ kind: "compare", id: "karsilastirma", title: "Özel ders mi, grup kursu mu?", rows });
  }
  blocks.push({ kind: "faq", id: "sss", title: "Sık sorulanlar", items: faqItems, updated: def.updated });

  const page: RichPage = {
    href: def.path,
    label: def.label,
    title,
    description,
    h1,
    crumbs: [{ label: "Anasayfa", href: "/" }, categoryCrumb, parent, { label: def.label }],
    parent,
    hero: {
      lead,
      photo: def.hero.photo,
      facts: def.hero.facts,
      secondary:
        featureBlock.kind === "levels"
          ? { label: "Seviyenizi seçin", href: `#${featureBlock.id}` }
          : { label: "Sınav formatı", href: `#${featureBlock.id}` },
    },
    blocks,
  };
  cache.set(def.path, page);
  return page;
}

/* ---------------------------------------------------------------
 * Dağıtıcı yardımcıları — üç route (`yabanci-dil-egitimleri/[kurs]/[sayfa]`,
 * `sinav-hazirlik-egitimleri/[kurs]/[sayfa]`, `proficiency-kursu/[sayfa]`)
 * zengin içerik sayfalarını aynı kuralla eklesin diye tek yerde.
 * ------------------------------------------------------------- */

/**
 * `prefix` altındaki özel ders sayfalarının kalan yol parçaları
 * (ör. "/yabanci-dil-egitimleri/" → ["almanca-kursu", "almanca-ozel-ders"]).
 * `excludeFolder`: kendi statik klasöründe dağıtılan alt ağaç (proficiency).
 */
export function richPathsUnder(prefix: string, excludeFolder?: string): string[][] {
  return PRIVATE_LESSONS.filter(
    (d) => d.path.startsWith(prefix) && !(excludeFolder && d.path.startsWith(`${prefix}${excludeFolder}/`)),
  ).map((d) => d.path.slice(prefix.length).split("/"));
}

/** Aynı segmentte iki tip aynı slug'ı üretirse build düşer (sessizce biri kazanmaz). */
export function assertNoSlugCollision(route: string, rich: string[], others: string[]): void {
  const taken = new Set(others);
  const hit = rich.find((k) => taken.has(k));
  if (hit) throw new ContentSectionsError(`[${route}] "${hit}" hem zengin içerik hem başka bir sayfa tipi.`);
}

/** Zengin içerik sayfasının metadata'sı (CLAUDE.md §6). */
export function richMetadata(def: PrivateLessonDef): Metadata {
  const page = getPrivateLessonPage(def);
  return { title: page.title, description: page.description, alternates: { canonical: absoluteUrl(page.href) } };
}
