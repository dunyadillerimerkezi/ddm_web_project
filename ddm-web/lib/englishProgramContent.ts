/**
 * P5 — İngilizce hedef kitle programlarının çözücüsü (`data/englishPrograms.ts`).
 *
 * Seviye sayfalarıyla aynı kaynak sözleşmesi (`createGuideResolver` + ortak şablon çözümü
 * `resolveTemplate`): her kaynak satırı / cümlesi bir bloğa tüketilir ya da `ignored`de gerekçeyle
 * durur; kart / adım sayısı kaynak cümle sayısıyla, soru dağılımının toplamı `total` ile, rakam
 * kutuları kaynak metinle tutmazsa build düşer.
 */

import { IK, TEMPLATE_EDITS } from "@/data/englishLevels";
import { ENGLISH_PROGRAMS, PROGRAM_STRIP, type EnglishProgramDef, type ProgramBlock } from "@/data/englishPrograms";
import type { IconName } from "@/components/graphics/icons";
import { ContentSectionsError } from "@/lib/contentSections";
import { assertNumbers, resolveTemplate, sentencesOf, takeTemplateCta, type EnglishTemplate } from "@/lib/englishLevelContent";
import { createGuideResolver } from "@/lib/guideContent";
import { linkIfProduced } from "@/lib/hubLinks";
import { checkMeta, metaTitle, norm } from "@/lib/richContent";
import type { Crumb, Faq } from "@/lib/types";

type Photo = { src: string; alt: string; width: number; height: number };

export type ProgramResolvedBlock =
  | { kind: "cards"; items: { title: string; icon: IconName; text: string }[] }
  | { kind: "steps"; items: { title: string; text: string }[] }
  | { kind: "facts"; items: { value: string; label: string }[]; note: string[] }
  | { kind: "distribution"; heading: string; items: { label: string; count: number; detail: string | null }[]; total: number; note: string }
  | { kind: "table"; caption: string; head: string[]; rows: string[][]; note: string }
  | { kind: "highlights"; photo: Photo | null; items: { icon: IconName; text: string }[] }
  | { kind: "chips"; title: string; items: string[] }
  | { kind: "links"; items: { label: string; href: string | null; icon: IconName }[] };

export type EnglishProgramPage = {
  href: string;
  title: string;
  description: string;
  h1: string;
  crumbs: Crumb[];
  hero: { lead: string; photo: Photo; facts: { label: string; icon: IconName }[] };
  /** Program şeridi: 4 program + seviyeler (hub). */
  strip: { label: string; href: string | null; current: boolean }[];
  sections: { id: string; title: string; answer: string; blocks: ProgramResolvedBlock[] }[];
  faq: Faq[];
  sources: string[];
  updated: string;
} & EnglishTemplate;

const UPDATED = "2026-09-27";

/** "Paragraf (15 Soru)" · "Dilbilgisi (10 Soru) (4 Soru Zamanlar, …)" */
const DISTRIBUTION_LINE = /^(.+?) \((\d+) Soru\)(?: \((.+)\))?$/u;

const cache = new Map<string, EnglishProgramPage>();

export function getEnglishProgramPage(def: EnglishProgramDef): EnglishProgramPage {
  const path = `${IK}/${def.slug}`;
  const hit = cache.get(path);
  if (hit) return hit;

  const context = `ingilizce-program${path}`;
  const r = createGuideResolver(path, { ...def, edits: { ...TEMPLATE_EDITS, ...def.edits } }, context);
  const pageText = r.record.text;

  const sourceH1 = r.record.headings.find((h) => h.level === "h1");
  if (!sourceH1) throw new ContentSectionsError(`${context}: kaynakta h1 yok.`);
  const h1 = r.heading({ source: norm(sourceH1.text) }, "h1");

  const lead = r.one(def.hero.lead, "hero.lead");
  for (const f of def.hero.facts) {
    if (f.basis === "page") assertNumbers(f.label, pageText, `${context}/hero "${f.label}"`);
  }

  const block = (b: ProgramBlock, slot: string): ProgramResolvedBlock => {
    switch (b.kind) {
      case "cards": {
        const sentences = r.take(b.src, slot).flatMap(sentencesOf);
        if (sentences.length !== b.items.length) {
          throw new ContentSectionsError(`${context}/${slot}: ${sentences.length} cümle ↔ ${b.items.length} kart.`);
        }
        return { kind: "cards", items: b.items.map((c, i) => ({ ...c, text: sentences[i] })) };
      }
      case "info":
        return { kind: "cards", items: b.items };
      case "steps": {
        const lines = r.take(b.src, slot);
        if (lines.length !== b.titles.length) throw new ContentSectionsError(`${context}/${slot}: ${lines.length} satır ↔ ${b.titles.length} adım.`);
        return { kind: "steps", items: lines.map((text, i) => ({ title: b.titles[i], text })) };
      }
      case "facts": {
        const note = r.take(b.from, slot);
        for (const f of b.items) assertNumbers(f.value, note.join(" "), `${context}/${slot} "${f.label}"`);
        return { kind: "facts", items: b.items, note };
      }
      case "distribution": {
        const heading = r.heading({ source: b.heading }, `${slot}.heading`);
        const items = r.take(b.src, slot).map((line) => {
          const m = DISTRIBUTION_LINE.exec(line);
          if (!m) throw new ContentSectionsError(`${context}/${slot}: soru satırı çözülemedi — "${line}"`);
          return { label: m[1], count: Number(m[2]), detail: m[3] ?? null };
        });
        const sum = items.reduce((n, x) => n + x.count, 0);
        if (sum !== b.total) throw new ContentSectionsError(`${context}/${slot}: soru toplamı ${sum} ≠ ${b.total}.`);
        return { kind: "distribution", heading, items, total: b.total, note: r.one(b.note, `${slot}.note`) };
      }
      case "table":
        return b;
      case "highlights":
        return { kind: "highlights", photo: b.photo, items: b.items.map((h, i) => ({ icon: h.icon, text: r.one(h.text, `${slot}.items[${i}]`) })) };
      case "chips": {
        const lower = pageText.toLocaleLowerCase("tr");
        const missing = b.items.find((c) => !lower.includes(c.toLocaleLowerCase("tr")));
        if (missing) throw new ContentSectionsError(`${context}/${slot}: etiket kaynak metinde yok — "${missing}"`);
        return b;
      }
      case "links":
        return { kind: "links", items: b.items.map((l) => ({ ...l, href: linkIfProduced(l.href) })) };
    }
  };

  const sections = def.sections.map((s, i) => {
    const slot = `sections[${i}]`;
    const title = r.heading(s.title, slot);
    const blocks = s.blocks.map((b, j) => block(b, `${slot}.blocks[${j}]`));
    // Cevaptaki rakamlar ("paragraf (15)") kaynakta geçmeli — genel bilgi cümleleri ayrı bloklarda.
    const answer = r.one(s.answer, `${slot}.answer`);
    if (s.id === "soru-dagilimi") assertNumbers(answer, pageText, `${context}/${slot}.answer`);
    return { id: s.id, title, answer, blocks };
  });

  // SSS rakamları: kaynak metinde ya da sayfanın kendi genel bilgi bloklarında (kaynakları yorumda) geçmeli.
  const general = def.sections
    .flatMap((s) => s.blocks)
    .flatMap((b) => (b.kind === "info" ? b.items.map((i) => i.text) : b.kind === "table" ? [...b.rows.flat(), b.note] : []))
    .concat(def.hero.facts.filter((f) => f.basis === "general").map((f) => f.label))
    .join(" ");
  for (const f of def.faq) {
    assertNumbers(f.answer.join(" "), `${pageText} ${general}`, `${context}/faq "${f.question}"`);
  }

  const cta = takeTemplateCta(r, context);
  const template = resolveTemplate(r, path, context, cta);
  r.finish(def.ignored);

  const title = metaTitle(def.meta, r.record.title, context);
  const description = norm(def.meta.description ?? r.record.meta_description);
  checkMeta(title, description, context);

  const page: EnglishProgramPage = {
    href: path,
    title,
    description,
    h1,
    crumbs: [{ label: "Anasayfa", href: "/" }, { label: "İngilizce Kursları", href: IK }, { label: def.label }],
    hero: { lead, photo: def.hero.photo, facts: def.hero.facts.map(({ label, icon }) => ({ label, icon })) },
    strip: PROGRAM_STRIP.map((p) => {
      const href = `${IK}/${p.slug}`;
      const current = href === path;
      return { label: p.label, current, href: current ? null : linkIfProduced(href) };
    }),
    sections,
    faq: def.faq,
    sources: def.sources,
    updated: UPDATED,
    ...template,
  };
  cache.set(path, page);
  return page;
}

const BY_SLUG = new Map(ENGLISH_PROGRAMS.map((d) => [d.slug, d]));

export function getEnglishProgramBySlug(slug: string): EnglishProgramPage | undefined {
  const def = BY_SLUG.get(slug);
  return def ? getEnglishProgramPage(def) : undefined;
}
