/**
 * P4 — Tekil içerik sayfalarının çözücüsü (`data/singlePages.ts`).
 *
 * Nedir rehberleriyle aynı kaynak sözleşmesi (`createGuideResolver`): her kaynak satırı
 * bir slota tüketilir ya da `ignored`de gerekçeyle durur; kullanılmayan `edits`, kaynakta
 * başlık olmayan `headingEdits` anahtarı, eşlenmemiş dosya satırı ve title >60 /
 * description >155 build'i düşürür.
 */

import { BRANCHES } from "@/data/branches";
import { byCourse } from "@/data/courseDates";
import type { SingleBlock, SingleBoard, SinglePageDef, TaskRef } from "@/data/singlePages";
import { ContentSectionsError } from "@/lib/contentSections";
import { createGuideResolver, type GuideResolvedBlock } from "@/lib/guideContent";
import { categoryCrumb, checkMeta, norm, parentCourse } from "@/lib/richContent";
import type { Branch, Crumb } from "@/lib/types";

export type FileGroup = {
  name: string;
  /** Sitedeki üniversite proficiency sayfası. */
  href: string;
  exam: string;
  official: string | null;
  note: string | null;
  files: { label: string; href: string; type: "PDF" | "Word" | "Resmi sayfa" }[];
};

export type SingleResolvedBlock =
  | GuideResolvedBlock
  | { kind: "subhead"; text: string }
  | { kind: "cards"; items: { title: string; text: string }[] }
  | { kind: "tasks"; items: { label: string; prompt: string; tr: string; points: string[] }[] }
  | { kind: "files"; groups: FileGroup[] };

export type SingleBoardResolved =
  | Exclude<SingleBoard, { kind: "files" }>
  | { kind: "files"; title: string; sub: string; groups: { name: string; count: number }[]; total: number };

export type SinglePage = {
  href: string;
  title: string;
  description: string;
  h1: string;
  crumbs: Crumb[];
  course: { label: string; href: string };
  hero: { lead: string; board: SingleBoardResolved };
  sections: { id: string; title: string; answer: string; blocks: SingleResolvedBlock[] }[];
  branches: { title: string; answer: string; items: { branch: Branch; label: string; href: string }[] } | null;
  related: SinglePageDef["related"];
  cta: SinglePageDef["cta"];
  sources: string[];
  updated: string;
};

const PROFICIENCY_UNI = "/sinav-hazirlik-egitimleri/proficiency-kursu";

function fileType(href: string): FileGroup["files"][number]["type"] {
  if (href.startsWith("http")) return "Resmi sayfa";
  if (href.endsWith(".doc")) return "Word";
  return "PDF";
}

const cache = new Map<string, SinglePage>();

export function getSinglePage(def: SinglePageDef): SinglePage {
  const hit = cache.get(def.path);
  if (hit) return hit;

  const context = `tekil${def.path}`;
  const r = createGuideResolver(def.source ?? def.path, def, context);

  /** `splits` parçalarının kullanımı — her parça bir kez gösterilmeli (sessiz kayıp yok). */
  const usedParts = new Set<string>();
  const block = (b: SingleBlock, slot: string): SingleResolvedBlock => {
    switch (b.kind) {
      case "subhead":
        return { kind: "subhead", text: r.heading({ source: b.source }, slot) };
      case "cards":
        return { kind: "cards", items: b.items.map((c, i) => ({ title: c.title, text: r.one(c.text, `${slot}.items[${i}]`) })) };
      case "tasks": {
        const lines = new Set(b.from.flatMap((ref, i) => r.raw(ref, `${slot}.from[${i}]`)));
        const usedLines = new Set<string>();
        const render = (ref: TaskRef, s: string): string => {
          if ("h" in ref) return r.heading({ source: ref.h }, s);
          if (!lines.has(ref.l)) throw new ContentSectionsError(`${context}/${s}: satır "from" bölümünde yok — "${ref.l}"`);
          usedLines.add(ref.l);
          if (ref.part === undefined) return r.fix(ref.l);
          const part = def.splits?.[ref.l]?.[ref.part];
          if (part === undefined) throw new ContentSectionsError(`${context}/${s}: splits parçası yok — "${ref.l}" [${ref.part}]`);
          usedParts.add(`${ref.l}\u0000${ref.part}`);
          return part;
        };
        const items = b.items.map((t, i) => ({
          label: render(t.label, `${slot}.items[${i}].label`),
          prompt: render(t.prompt, `${slot}.items[${i}].prompt`),
          tr: t.tr,
          points: t.points.map((p, j) => render(p, `${slot}.items[${i}].points[${j}]`)),
        }));
        const unusedLine = [...lines].find((l) => !usedLines.has(l));
        if (unusedLine) throw new ContentSectionsError(`${context}/${slot}: görevde kullanılmayan satır — "${unusedLine}"`);
        return { kind: "tasks", items };
      }
      case "files": {
        const groups = new Map<string, FileGroup>();
        const used = new Set<string>();
        for (const line of r.raw(b.src, slot)) {
          const target = b.files[line];
          if (!target) throw new ContentSectionsError(`${context}/${slot}: dosya satırı eşlenmedi — "${line}"`);
          used.add(line);
          if ("dup" in target) continue;
          const uni = b.universities.find((u) => u.key === target.uni);
          if (!uni) throw new ContentSectionsError(`${context}/${slot}: üniversite tanımsız — "${target.uni}"`);
          const group = groups.get(uni.key) ?? {
            name: uni.name,
            href: `${PROFICIENCY_UNI}/${uni.slug}`,
            exam: uni.exam,
            official: uni.official,
            note: uni.note ?? null,
            files: [],
          };
          if (!group.files.some((f) => f.href === target.href)) {
            group.files.push({ label: r.fix(line), href: target.href, type: fileType(target.href) });
          }
          groups.set(uni.key, group);
        }
        const unused = Object.keys(b.files).filter((k) => !used.has(k));
        if (unused.length > 0) throw new ContentSectionsError(`${context}/${slot}: kaynakta olmayan dosya satırı — "${unused[0]}"`);
        const missing = b.universities.filter((u) => !groups.has(u.key));
        if (missing.length > 0) throw new ContentSectionsError(`${context}/${slot}: dosyası olmayan üniversite — "${missing[0].name}"`);
        return { kind: "files", groups: b.universities.map((u) => groups.get(u.key) as FileGroup) };
      }
      default:
        return r.block(b, slot);
    }
  };

  const sourceH1 = def.h1Heading ?? r.record.headings.find((h) => h.level === "h1")?.text;
  if (!sourceH1) throw new ContentSectionsError(`${context}: kaynakta h1 yok (h1Heading verin).`);
  if (def.h1Heading) console.warn(`[tekil] ${def.path}: kaynakta h1 yok — "${def.h1Heading}" H1'e yükseltildi (CLAUDE.md §6).`);
  const h1 = r.heading({ source: norm(sourceH1) }, "h1");

  const lead = r.one(def.hero.lead, "hero.lead");
  const sections = def.sections.map((s, i) => {
    const slot = `sections[${i}]`;
    const title = r.heading(s.title, slot);
    const blocks = s.blocks.map((b, j) => block(b, `${slot}.blocks[${j}]`));
    return { id: s.id, title, answer: r.one(s.answer, `${slot}.answer`), blocks };
  });

  let branches: SinglePage["branches"] = null;
  if (def.branches) {
    const b = def.branches;
    const labels = r.take(b.links, "branches.links");
    if (labels.length !== b.branches.length) {
      throw new ContentSectionsError(`${context}/branches: ${labels.length} satır ↔ ${b.branches.length} şube.`);
    }
    const dates = byCourse(b.course);
    branches = {
      title: r.heading(b.title, "branches"),
      answer: r.one(b.answer, "branches.answer"),
      items: b.branches.map((slug, i) => {
        if (!labels[i].startsWith(BRANCHES[slug].name)) {
          throw new ContentSectionsError(`${context}/branches: "${labels[i]}" satırı ${BRANCHES[slug].name} şubesine ait değil (sıra?).`);
        }
        const entry = dates.find((e) => e.branch === slug);
        if (!entry) throw new ContentSectionsError(`${context}/branches: "${b.course}" için ${slug} kurs tarihi yok.`);
        return { branch: BRANCHES[slug], label: labels[i], href: `/${entry.category}/${entry.courseSlug}/${entry.pageSlug}` };
      }),
    };
  }

  for (const [line, parts] of Object.entries(def.splits ?? {})) {
    parts.forEach((_, i) => {
      if (!usedParts.has(`${line}\u0000${i}`)) throw new ContentSectionsError(`${context}: kullanılmayan splits parçası — "${line}" [${i}]`);
    });
  }
  r.finish(def.ignored);

  let board: SingleBoardResolved;
  if (def.hero.board.kind === "files") {
    const files = sections.flatMap((s) => s.blocks).find((b) => b.kind === "files");
    if (!files || files.kind !== "files") throw new ContentSectionsError(`${context}: "files" panosu için files bloğu yok.`);
    const groups = files.groups.map((g) => ({ name: g.name, count: g.files.length }));
    board = { ...def.hero.board, groups, total: groups.reduce((n, g) => n + g.count, 0) };
  } else {
    board = def.hero.board;
  }

  const title = norm(def.meta.title ?? r.record.title);
  const description = norm(def.meta.description ?? r.record.meta_description);
  checkMeta(title, description, context);

  const course = parentCourse(def.path, context);
  const page: SinglePage = {
    href: def.path,
    title,
    description,
    h1,
    crumbs: [{ label: "Anasayfa", href: "/" }, categoryCrumb(def.path, context), course, { label: def.label }],
    course,
    hero: { lead, board },
    sections,
    branches,
    related: def.related,
    cta: def.cta,
    sources: def.sources,
    updated: def.updated,
  };
  cache.set(def.path, page);
  return page;
}
