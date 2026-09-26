/**
 * P4 — "{Sınav} Nedir?" rehber sayfalarının içerik çözücüsü (`data/examGuides.ts`).
 *
 * `lib/richContent.ts` ile aynı sözleşme: kaynağın her satırı bir slota tüketilir
 * ya da `ignored`de gerekçeyle durur (`assertCoverage`); kullanılmayan `edits` /
 * kaynakta başlık olmayan `headingEdits` anahtarı ve title >60 / description >155
 * build'i düşürür.
 */

import type { ExamGuideDef, GuideText } from "@/data/examGuides";
import type { IconName } from "@/components/graphics/icons";
import { EXAMS } from "@/data/exams";
import { ContentSectionsError, SectionResolver, parseRecord } from "@/lib/contentSections";
import { examHref } from "@/lib/examContent";
import { categoryCrumb, checkMeta, findRecord, norm } from "@/lib/richContent";
import type { Crumb } from "@/lib/types";

export type GuideResolvedBlock =
  | { kind: "text"; paragraphs: string[] }
  | { kind: "points"; items: string[] }
  | { kind: "parts"; items: { icon: IconName; name: string; text: string; meta: string }[]; note: string | null }
  | { kind: "table"; title?: string; head: string[]; rows: string[][]; note: string | null }
  | { kind: "links"; items: { label: string; href: string }[] };

export type GuidePage = {
  href: string;
  label: string;
  exam: string;
  title: string;
  description: string;
  h1: string;
  crumbs: Crumb[];
  /** Sınavın hazırlık kursu sayfası (CTA + ilgili sayfalar). */
  course: { label: string; href: string };
  hero: { answer: string; facts: { label: string; value: string }[] };
  sections: { id: string; title: string; answer: string; blocks: GuideResolvedBlock[] }[];
  sources: string[];
  updated: string;
};

const cache = new Map<string, GuidePage>();

export function getGuidePage(def: ExamGuideDef): GuidePage {
  const hit = cache.get(def.path);
  if (hit) return hit;

  const context = `nedir${def.path}`;
  const record = findRecord(def.path);
  const resolver = new SectionResolver(parseRecord(record));
  const sourceHeadings = new Set(record.headings.map((h) => norm(h.text)));

  const edits = new Map(Object.entries(def.edits ?? {}));
  const usedEdits = new Set<string>();
  const headingEdits = new Map(Object.entries(def.headingEdits ?? {}));
  const headingText = (h: string) => headingEdits.get(h) ?? h;

  const take = (ref: { heading: string | null; take?: Parameters<SectionResolver["take"]>[0]["take"] }, slot: string) =>
    (resolver.take({ heading: ref.heading, take: ref.take }, `${context}/${slot}`) ?? []).map((line) => {
      const edited = edits.get(line);
      if (edited === undefined) return line;
      usedEdits.add(line);
      return edited;
    });
  const text = (t: GuideText, slot: string): string[] => ("added" in t ? [t.added] : take(t.src, slot));
  const one = (t: GuideText, slot: string): string => {
    const lines = text(t, slot);
    if (lines.length !== 1) throw new ContentSectionsError(`${context}/${slot}: tek paragraf bekleniyordu (${lines.length}).`);
    return lines[0];
  };

  const answer = one({ src: def.hero.answer }, "hero.answer");

  const sections = def.sections.map((s, i) => {
    const slot = `sections[${i}]`;
    let title: string;
    if ("source" in s.title) {
      if (!sourceHeadings.has(s.title.source)) {
        throw new ContentSectionsError(`${context}/${slot}: kaynakta başlık değil — "${s.title.source}"`);
      }
      // Başlık bölüm başlığı olarak kullanıldı → kapsamada "tüketildi" sayılır (gövdesi bloklarda alınır).
      resolver.take({ heading: s.title.source, take: [], allowEmpty: true }, `${context}/${slot}.title`);
      title = headingText(s.title.source);
    } else {
      title = s.title.added;
    }
    const blocks: GuideResolvedBlock[] = s.blocks.map((b, j) => {
      const bslot = `${slot}.blocks[${j}]`;
      switch (b.kind) {
        case "text":
          return { kind: "text", paragraphs: text(b.text, bslot) };
        case "points":
          return { kind: "points", items: "added" in b.items ? b.items.added : take(b.items.src, bslot) };
        case "parts":
        case "links":
          return b;
        case "table": {
          if (Array.isArray(b.rows)) return { ...b, rows: b.rows };
          const rows = take(b.rows.src, bslot).map((line) => line.split(" | "));
          if (rows.some((r) => r.length !== b.head.length)) {
            throw new ContentSectionsError(`${context}/${bslot}: tablo satırı ${b.head.length} hücreye bölünmedi — edits'te " | " kullanın.`);
          }
          return { ...b, rows };
        }
      }
    });
    return { id: s.id, title, answer: one(s.answer, `${slot}.answer`), blocks };
  });

  for (const key of edits.keys()) {
    if (!usedEdits.has(key)) throw new ContentSectionsError(`${context}: kullanılmayan edits girdisi — "${key}"`);
  }
  for (const key of headingEdits.keys()) {
    if (!sourceHeadings.has(key)) throw new ContentSectionsError(`${context}: headingEdits anahtarı kaynakta başlık değil — "${key}"`);
  }
  resolver.assertCoverage(def.ignored.map((x) => x.line), context);

  const title = norm(def.meta.title ?? record.title);
  const description = norm(def.meta.description ?? record.meta_description);
  checkMeta(title, description, context);
  const sourceH1 = record.headings.find((h) => h.level === "h1");
  if (!sourceH1) throw new ContentSectionsError(`${context}: kaynakta h1 yok.`);
  const h1 = headingText(norm(sourceH1.text));

  const [, , courseSlug] = def.path.split("/");
  const exam = EXAMS.find((e) => e.slug === courseSlug);
  if (!exam) throw new ContentSectionsError(`${context}: sınav kursu bulunamadı — "${courseSlug}"`);
  const course = { label: exam.label, href: examHref(exam.slug) };

  const page: GuidePage = {
    href: def.path,
    label: def.label,
    exam: def.exam,
    title,
    description,
    h1,
    crumbs: [{ label: "Anasayfa", href: "/" }, categoryCrumb(def.path, context), course, { label: def.label }],
    course,
    hero: { answer, facts: def.hero.facts },
    sections,
    sources: def.sources,
    updated: def.updated,
  };
  cache.set(def.path, page);
  return page;
}
