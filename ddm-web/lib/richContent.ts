/**
 * P4 — Zengin İçerik alt sayfaları içerik sözleşmesi (ilk alt tür: özel ders).
 *
 * `lib/hubContent.ts` ile aynı çekirdek (`SectionResolver` + `assertCoverage`):
 * kaynağın HER satırı ya bir slota tüketilir ya `ignored`de gerekçeyle durur.
 * Kaynakta karşılığı kalmayan `edits` / `headingEdits` girdisi build'i düşürür;
 * title >60 / description >155 karakter de (CLAUDE.md §6, sessizce kesilmez).
 *
 * Çıktı blok listesidir (`RichBlock`) — sonraki alt türler (online: `lib/onlineContent.ts`, nedir…)
 * aynı sayfa bileşenine yeni blok türleriyle eklenir.
 */

import siteContent from "@/data/site_content.json";
import { EXAMS } from "@/data/exams";
import { PRIVATE_HUB_ADDED } from "@/data/hubs";
import { LANGUAGES } from "@/data/languages";
import { PRIVATE_LESSONS } from "@/data/privateLessons";
import type { FlagCode } from "@/components/graphics/Flag";
import type { OnlineExam } from "@/data/onlineLessons";
import type { FormatPart, LevelItem, Photo, PrivateLessonDef, SlotRef } from "@/data/privateLessonsShared";
import type { IconName } from "@/components/graphics/icons";
import {
  ContentSectionsError,
  SectionResolver,
  parseRecord,
  type SiteContentRecord,
} from "@/lib/contentSections";
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
  | {
      kind: "compare";
      id: string;
      title: string;
      lead?: string;
      columns: { key: string; label: string }[];
      rows: { row: string; cells: Record<string, string> }[];
    }
  /** Online: "nasıl işler" akışı (adım metinleri firma cümleleri) + derse hazırlık listesi (genel bilgi). */
  | {
      kind: "steps";
      id: string;
      title: string;
      lead: string;
      steps: { title: string; text: string; note: string | null }[];
      checklist: { title: string; items: { icon: IconName; label: string; text: string }[] };
      /** Hazırlık panelindeki dekoratif "canlı ders" penceresi (dilin bayrağı ve selamlaması). */
      call: { flag: FlagCode | null; greeting: string };
    }
  /** Online: dilin sınavlarına evden girilebilir mi — genel bilgi, kaynak yorumda. */
  | { kind: "exams"; id: string; title: string; lead: string; items: OnlineExam[]; note: string }
  /** Online çatı: kaynak başlığı + cümlesi altında dil kartları ve sınav etiketleri (href üretilmişse link). */
  | {
      kind: "catalog";
      id: string;
      groups: {
        title: string;
        lead: string;
        cards: { label: string; href: string; flag: FlagCode | null; greeting: string }[];
        chipsLabel: string | null;
        chips: { label: string; href: string | null }[];
      }[];
    }
  | { kind: "faq"; id: string; title: string; items: Faq[]; updated: string };

export type RelatedGroup = { title: string; links: { label: string; href: string }[] };

export type RichPage = {
  href: string;
  /** Kırıntı etiketi ("Almanca Özel Ders"). */
  label: string;
  title: string;
  description: string;
  h1: string;
  crumbs: Crumb[];
  parent: { label: string; href: string };
  hero: {
    lead: string;
    photo: Photo;
    facts: { icon: IconName; label: string }[];
    secondary: { label: string; href: string };
  };
  blocks: RichBlock[];
  /** Alt türün kardeş sayfaları (ilgili sayfalar bölümünün ikinci grubu). */
  family: RelatedGroup;
  cta: { sub: string };
};

export function norm(s: string): string {
  return s.replace(/ /g, " ").replace(/\s+/g, " ").trim();
}

/** `path`: temiz yol (".html" eklenir) ya da eski sorgulu yol ("….html?view=article&id=…", olduğu gibi). */
export function findRecord(path: string): SiteContentRecord {
  const url = `https://www.dunyadillerimerkezi.com${path.includes(".html") ? path : `${path}.html`}`;
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
  "diger-program": { label: "Diğer Programlar", href: "/diger-program" },
  "yurtdisi-egitim": { label: "Yurtdışı Eğitim", href: "/yurtdisi-egitim" },
  "kurumsal-dil-egitim": { label: "Kurumsal Dil Eğitimi", href: "/kurumsal-dil-egitim" },
};

export function categoryCrumb(path: string, context: string): Crumb {
  const crumb = CATEGORY_CRUMB[path.split("/")[1]];
  if (!crumb) throw new ContentSectionsError(`${context}: kategori kırıntısı tanımsız.`);
  return crumb;
}

/** title / description uzunluk bekçisi (CLAUDE.md §6 — sessizce kesilmez). */
export function checkMeta(title: string, description: string, context: string): void {
  if (title.length > TITLE_MAX) throw new ContentSectionsError(`${context}: title ${title.length} karakter (≤${TITLE_MAX}).`);
  if (description.length > DESCRIPTION_MAX) {
    throw new ContentSectionsError(`${context}: description ${description.length} karakter (≤${DESCRIPTION_MAX}).`);
  }
}

/** Üst kurs: "/{kategori}/{kurs}/…" → dil ya da sınav kursunun etiketi. */
export function parentCourse(path: string, context: string): { label: string; href: string } {
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
  checkMeta(title, description, context);
  const sourceH1 = record.headings.find((h) => h.level === "h1");
  let h1 = def.meta.h1 ?? (sourceH1 ? headingText(norm(sourceH1.text)) : null);
  if (!h1) {
    h1 = norm(record.headings[0]?.text ?? record.title);
    console.warn(`[richContent] ${def.path}: kaynakta h1 yok — ilk başlığa düşüldü ("${h1}").`);
  }

  const category = categoryCrumb(def.path, context);
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
    blocks.push({
      kind: "compare",
      id: "karsilastirma",
      title: "Özel ders mi, grup kursu mu?",
      columns: [
        { key: "ozel", label: "Özel ders" },
        { key: "grup", label: "Grup kursu" },
      ],
      rows: rows.map((r) => ({ row: r.row, cells: { ozel: r.ozel, grup: r.grup } })),
    });
  }
  blocks.push({ kind: "faq", id: "sss", title: "Sık sorulanlar", items: faqItems, updated: def.updated });

  const page: RichPage = {
    href: def.path,
    label: def.label,
    title,
    description,
    h1,
    crumbs: [{ label: "Anasayfa", href: "/" }, category, parent, { label: def.label }],
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
    family: {
      title: "Özel dersler",
      links: [
        { label: "Tüm özel dersler", href: "/diger-program/ozel-dersler" },
        // Aynı kategorideki (dil / sınav) diğer özel dersler.
        ...PRIVATE_LESSONS.filter((d) => d.path !== def.path && d.path.split("/")[1] === def.path.split("/")[1]).map((d) => ({
          label: d.label,
          href: d.path,
        })),
      ],
    },
    cta: { sub: "Seviyenizi ve hedefinizi size en yakın şubemizle konuşun." },
  };
  cache.set(def.path, page);
  return page;
}
