/**
 * P4 — "{Sınav} Nedir?" rehber sayfalarının içerik çözücüsü (`data/examGuides.ts`).
 *
 * `lib/richContent.ts` ile aynı sözleşme: kaynağın her satırı bir slota tüketilir
 * ya da `ignored`de gerekçeyle durur (`assertCoverage`); kullanılmayan `edits` /
 * kaynakta başlık olmayan `headingEdits` anahtarı ve title >60 / description >155
 * build'i düşürür.
 */

import type { ExamGuideDef, GuideBlock, GuideSection, GuideText } from "@/data/examGuides";
import type { SlotRef } from "@/data/privateLessonsShared";
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

export type GuideSectionResolved = GuidePage["sections"][number];

/** Cümle sonu: ". " + büyük harf ya da rakam. */
function sentencesOf(line: string): string[] {
  return line.split(/(?<=[.!?])\s+(?=[A-ZÇĞİÖŞÜ0-9])/u);
}

/**
 * Nedir ve tekil sayfaların ortak kaynak sözleşmesi: satırlar `SectionResolver` ile
 * tüketilir, `edits` satır bazında uygulanır; `finish()` kullanılmayan `edits` /
 * kaynakta başlık olmayan `headingEdits` anahtarını ve kapsanmayan satırı build'de düşürür.
 */
export function createGuideResolver(
  path: string,
  def: { edits?: Record<string, string>; headingEdits?: Record<string, string> },
  context: string,
) {
  const record = findRecord(path);
  const resolver = new SectionResolver(parseRecord(record));
  const sourceHeadings = new Set(record.headings.map((h) => norm(h.text)));

  const edits = new Map(Object.entries(def.edits ?? {}));
  const usedEdits = new Set<string>();
  const headingEdits = new Map(Object.entries(def.headingEdits ?? {}));
  const headingText = (h: string) => headingEdits.get(h) ?? h;
  const fix = (line: string) => {
    const edited = edits.get(line);
    if (edited === undefined) return line;
    usedEdits.add(line);
    return edited;
  };

  /** Ham kaynak satırları (edits uygulanmadan) — `srcLinks` hedefi orijinal satıra göre bulunur. */
  const raw = (ref: SlotRef, slot: string) => resolver.take({ heading: ref.heading, take: ref.take }, `${context}/${slot}`) ?? [];
  const take = (ref: SlotRef, slot: string) => raw(ref, slot).map(fix);
  /**
   * Cümle bazında alınan paragraflar: `resolver.take` satırın tamamını "tüketildi" sayar, bu
   * yüzden hangi cümlelerin gösterildiği ayrıca izlenir; `finish()` gösterilmeyen cümle bırakan
   * paragrafı build'de düşürür (kaynaktan sessizce cümle kaybolmaz).
   */
  const sentenceUse = new Map<string, { count: number; used: Set<number> }>();
  const fullyUsed = new Set<string>();
  const text = (t: GuideText, slot: string): string[] => {
    if ("added" in t) return [t.added];
    const lines = take(t.src, slot);
    if (!("sentence" in t)) {
      lines.forEach((l) => fullyUsed.add(l));
      return lines;
    }
    if (lines.length !== 1) throw new ContentSectionsError(`${context}/${slot}: cümle için tek paragraf bekleniyordu (${lines.length}).`);
    const all = sentencesOf(lines[0]);
    const [a, rawB] = Array.isArray(t.sentence) ? t.sentence : [t.sentence, t.sentence];
    const b = rawB < 0 ? all.length + rawB : rawB;
    if (b >= all.length || a > b) {
      throw new ContentSectionsError(`${context}/${slot}: ${a}–${b}. cümle yok (${all.length} cümle) — "${lines[0].slice(0, 60)}…"`);
    }
    const use = sentenceUse.get(lines[0]) ?? { count: all.length, used: new Set<number>() };
    for (let i = a; i <= b; i++) use.used.add(i);
    sentenceUse.set(lines[0], use);
    return [all.slice(a, b + 1).join(" ")];
  };
  const one = (t: GuideText, slot: string): string => {
    const lines = text(t, slot);
    if (lines.length !== 1) throw new ContentSectionsError(`${context}/${slot}: tek paragraf bekleniyordu (${lines.length}).`);
    return lines[0];
  };
  const heading = (title: GuideSection["title"], slot: string): string => {
    if (!("source" in title)) return title.added;
    if (!sourceHeadings.has(title.source)) {
      throw new ContentSectionsError(`${context}/${slot}: kaynakta başlık değil — "${title.source}"`);
    }
    // Başlık bölüm başlığı olarak kullanıldı → kapsamada "tüketildi" sayılır (gövdesi bloklarda alınır).
    resolver.take({ heading: title.source, take: [], allowEmpty: true }, `${context}/${slot}.title`);
    return headingText(title.source);
  };

  const block = (b: GuideBlock, bslot: string): GuideResolvedBlock => {
    switch (b.kind) {
      case "text":
        return { kind: "text", paragraphs: text(b.text, bslot) };
      case "points":
        return { kind: "points", items: "added" in b.items ? b.items.added : take(b.items.src, bslot) };
      case "parts":
      case "links":
        return b;
      case "srcLinks":
        return {
          kind: "links",
          items: raw(b.src, bslot).map((line) => {
            const href = b.hrefs[line];
            if (!href) throw new ContentSectionsError(`${context}/${bslot}: link hedefi yok — "${line}"`);
            return { label: fix(line), href };
          }),
        };
      case "table": {
        if (Array.isArray(b.rows)) return { ...b, rows: b.rows };
        const rows = take(b.rows.src, bslot).map((line) => line.split(" | "));
        if (rows.some((r) => r.length !== b.head.length)) {
          throw new ContentSectionsError(`${context}/${bslot}: tablo satırı ${b.head.length} hücreye bölünmedi — edits'te " | " kullanın.`);
        }
        return { ...b, rows };
      }
    }
  };

  const sections = (list: GuideSection[]): GuideSectionResolved[] =>
    list.map((s, i) => {
      const slot = `sections[${i}]`;
      const title = heading(s.title, slot);
      const blocks = s.blocks.map((b, j) => block(b, `${slot}.blocks[${j}]`));
      return { id: s.id, title, answer: one(s.answer, `${slot}.answer`), blocks };
    });

  const finish = (ignored: { line: string }[]) => {
    for (const key of edits.keys()) {
      if (!usedEdits.has(key)) throw new ContentSectionsError(`${context}: kullanılmayan edits girdisi — "${key}"`);
    }
    for (const key of headingEdits.keys()) {
      if (!sourceHeadings.has(key)) throw new ContentSectionsError(`${context}: headingEdits anahtarı kaynakta başlık değil — "${key}"`);
    }
    for (const [line, use] of sentenceUse) {
      if (fullyUsed.has(line) || use.used.size === use.count) continue;
      const missing = Array.from({ length: use.count }, (_, i) => i).filter((i) => !use.used.has(i));
      throw new ContentSectionsError(`${context}: paragrafın ${missing.join(", ")}. cümlesi gösterilmiyor — "${line.slice(0, 60)}…"`);
    }
    resolver.assertCoverage(ignored.map((x) => x.line), context);
  };

  return { record, raw, take, text, one, heading, headingText, block, sections, finish, fix };
}

const cache = new Map<string, GuidePage>();

export function getGuidePage(def: ExamGuideDef): GuidePage {
  const hit = cache.get(def.path);
  if (hit) return hit;

  const context = `nedir${def.path}`;
  const r = createGuideResolver(def.path, def, context);
  const { record, headingText } = r;

  const answer = r.one({ src: def.hero.answer }, "hero.answer");
  const sections = r.sections(def.sections);
  r.finish(def.ignored);

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
