/**
 * P5 — İngilizce seviye sayfalarının çözücüsü (`data/englishLevels.ts`).
 *
 * Nedir / tekil sayfalarla aynı kaynak sözleşmesi (`createGuideResolver`): her kaynak satırı bir
 * slota tüketilir ya da `ignored`de gerekçeyle durur; kullanılmayan `edits`, gösterilmeyen cümle,
 * şablon dışı satır ve title >60 / description >155 build'i düşürür. 9 sayfada ortak eski site
 * şablonu (şube satırları, program listesi, "kurs tarihlerini inceleyin" cümlesi) burada tek yerde
 * çözülür; sayfa tanımı yalnız kendi bölümlerini tarif eder.
 */

import { BRANCHES } from "@/data/branches";
import { byCourse } from "@/data/courseDates";
import {
  C2_HOURS,
  CEFR_EN,
  COURSE_RECORD,
  ENGLISH_LEVELS,
  IK,
  LEVEL_COPY,
  LEVEL_LADDER,
  levelHref,
  LEVEL_SOURCES,
  LEVEL_UPDATED,
  SKILLS,
  SYSTEM_HREF,
  TEMPLATE,
  TEMPLATE_BRANCHES,
  TEMPLATE_EDITS,
  TEMPLATE_PROGRAMS,
  type CefrInfo,
  type EnLevelCode,
  type EnglishLevelDef,
  type HeroFact,
} from "@/data/englishLevels";
import type { IconName } from "@/components/graphics/icons";
import { ContentSectionsError, parseRecord } from "@/lib/contentSections";
import { createGuideResolver, sentencesOf } from "@/lib/guideContent";

export { sentencesOf };
import { linkIfProduced } from "@/lib/hubLinks";
import { checkMeta, findRecord, norm } from "@/lib/richContent";
import type { Branch, Crumb, Faq } from "@/lib/types";

export type LadderStep = { code: EnLevelCode; name: string; href: string | null; current: boolean };

export type EnglishLevelPage = {
  href: string;
  code: EnLevelCode;
  title: string;
  description: string;
  /** H1 iki satır: " | " öncesi ana başlık, sonrası alt satır (tek `<h1>`). */
  h1: { main: string; sub: string | null };
  crumbs: Crumb[];
  hero: {
    caption: string;
    lead: string;
    card: { name: string; trName: string; cefr: CefrInfo; facts: HeroFact[] };
    prev: LadderStep | null;
    next: LadderStep | null;
  };
  ladder: LadderStep[];
  canDo: { answer: string; skills: { label: string; icon: IconName; text: string; photo: (typeof SKILLS)[number]["photo"] }[] };
  why: { id: string; title: string; answer: string; cards: { icon: IconName; text: string }[] } | null;
  techniques: {
    id: string;
    title: string;
    answer: string;
    items: string[];
    highlightsTitle: string;
    highlights: { icon: IconName; text: string }[];
    photo: NonNullable<EnglishLevelDef["panelPhoto"]>;
  };
  about: {
    id: string;
    title: string;
    answer: string;
    cards: { title: string; icon: IconName; text: string }[];
    points: { title: string; items: string[] } | null;
    /** Önceki · bu · sonraki seviye karşılaştırması (genel bilgi). */
    compare: { code: EnLevelCode; name: string; current: boolean; cefr: CefrInfo }[];
  };
  faq: Faq[];
  branches: { title: string; answer: string; items: { branch: Branch; label: string; href: string }[]; system: { label: string; href: string } };
  programs: { title: string; levels: ProgramLink[]; programs: ProgramLink[] };
  sources: string[];
  updated: string;
};

export type ProgramLink = { label: string; href: string | null; current: boolean };


/** Metindeki rakamlar (2.000, 4.0, 60, 7–22'nin iki ucu) — tam sayı olarak. */
function numbersOf(text: string): string[] {
  return text.match(/\d+(?:[.,]\d+)*/g) ?? [];
}

/**
 * Kart / cevap metnindeki her rakam kaynak metinde AYNEN (tam sayı olarak) geçmeli — "5",
 * kaynaktaki "15" ya da "2025"in içinde bulunarak geçemez.
 */
export function assertNumbers(text: string, source: string, context: string): void {
  const known = new Set(numbersOf(source));
  const missing = numbersOf(text).find((n) => !known.has(n));
  if (missing) throw new ContentSectionsError(`${context}: "${missing}" kaynak metinde yok.`);
}

function ladder(currentSlug: string): LadderStep[] {
  return LEVEL_LADDER.map((l) => {
    const current = l.slug === currentSlug;
    return { code: l.code, name: l.name, current, href: current ? null : linkIfProduced(levelHref(l.slug)) };
  });
}

type GuideResolver = ReturnType<typeof createGuideResolver>;
export type EnglishTemplate = { branches: EnglishLevelPage["branches"]; programs: EnglishLevelPage["programs"] };

/**
 * 9 sayfada ortak eski site şablonu: şube kurs tarihi satırları + "Eğitim Sistemi" linki + seviye /
 * program listesi. Satırlar birebir beklenen şablon değilse build düşer (sessiz sapma yok).
 */
export function resolveTemplate(r: GuideResolver, path: string, context: string, ctaLine: string | null): EnglishTemplate {
  const planLines = r.raw({ heading: TEMPLATE.plan }, "branches");
  const expected = [TEMPLATE.system, ...TEMPLATE_BRANCHES.map((b) => b.line)];
  if (planLines.join("\n") !== expected.join("\n")) {
    throw new ContentSectionsError(`${context}/branches: şablon satırları beklenenden farklı:\n  ${planLines.join("\n  ")}`);
  }
  const dates = byCourse("ingilizce-kursu");
  const branches = {
    title: r.heading({ source: TEMPLATE.plan }, "branches.title"),
    answer: ctaLine ?? LEVEL_COPY.branchesAnswer,
    system: { label: r.fix(TEMPLATE.system), href: SYSTEM_HREF },
    items: TEMPLATE_BRANCHES.map((b) => {
      const entry = dates.find((e) => e.branch === b.branch);
      if (!entry) throw new ContentSectionsError(`${context}/branches: ${b.branch} için İngilizce kurs tarihi yok.`);
      return { branch: BRANCHES[b.branch], label: r.fix(b.line), href: `/${entry.category}/${entry.courseSlug}/${entry.pageSlug}` };
    }),
  };

  const programLines = r.raw({ heading: TEMPLATE.programs }, "programs");
  // Listedeki bir satır sayfanın H1'iyle aynıysa (Üniversite Hazırlık İngilizcesi) ayrıştırıcı onu başlık sayar:
  // liste orada bölünür, kalanı H1 başlığının ikinci geçişine düşer — oradan aynı sırayla alınır.
  const split = TEMPLATE_PROGRAMS[programLines.length]?.line;
  if (split && r.record.headings.some((h) => norm(h.text) === split)) {
    const merged = parseRecord(r.record).filter((s) => s.heading === split).flatMap((s) => s.paragraphs);
    const rest = TEMPLATE_PROGRAMS.slice(programLines.length + 1).map((p) => p.line);
    const at = rest.map((line) => merged.indexOf(line));
    if (at.some((i) => i < 0)) throw new ContentSectionsError(`${context}/programs: bölünmüş listenin devamı bulunamadı.`);
    programLines.push(split, ...r.raw({ heading: split, take: at }, "programs.rest"));
  }
  if (programLines.join("\n") !== TEMPLATE_PROGRAMS.map((p) => p.line).join("\n")) {
    throw new ContentSectionsError(`${context}/programs: şablon satırları beklenenden farklı.`);
  }
  const toLink = (p: (typeof TEMPLATE_PROGRAMS)[number]): ProgramLink => {
    const current = p.href === path;
    return { label: r.fix(p.line), current, href: current ? null : linkIfProduced(p.href) };
  };
  const programs = {
    title: r.heading({ source: TEMPLATE.programs }, "programs.title"),
    // Kaynak C1 → A1 sıralı; listede merdivenle aynı yönde (A1 → C1) gösterilir.
    levels: TEMPLATE_PROGRAMS.filter((p) => p.group === "level").map(toLink).reverse(),
    programs: TEMPLATE_PROGRAMS.filter((p) => p.group === "program").map(toLink),
  };
  return { branches, programs };
}

/** Kaynağın her yerinde (giriş, "Nedir?" …) geçebilen şablon cümlesini bulur ve tüketir; yoksa null. */
export function takeTemplateCta(r: GuideResolver, context: string): string | null {
  // `take` aynı başlığın tüm geçişlerini birleştirir → indeks de birleşik listede aranır.
  const sections = parseRecord(r.record);
  const owner = sections.find((s) => s.paragraphs.includes(TEMPLATE.cta));
  if (!owner) return null;
  const merged = sections.filter((s) => s.heading === owner.heading).flatMap((s) => s.paragraphs);
  return r.take({ heading: owner.heading, take: [merged.indexOf(TEMPLATE.cta)] }, `${context}/cta`)[0];
}

const cache = new Map<string, EnglishLevelPage>();

export function getEnglishLevelPage(def: EnglishLevelDef): EnglishLevelPage {
  const path = levelHref(def.slug);
  const hit = cache.get(path);
  if (hit) return hit;

  const context = `ingilizce-seviye${path}`;
  const r = createGuideResolver(path, { ...def, edits: { ...TEMPLATE_EDITS, ...def.edits } }, context);
  const pageText = r.record.text;
  const courseText = findRecord(COURSE_RECORD).text;

  /* --- H1 --- */
  const sourceH1 = r.record.headings.find((h) => h.level === "h1");
  if (!sourceH1) throw new ContentSectionsError(`${context}: kaynakta h1 yok.`);
  const h1Text = r.heading({ source: norm(sourceH1.text) }, "h1");
  const [main, ...rest] = h1Text.split(" | ");
  const h1 = { main, sub: rest.length > 0 ? rest.join(" | ") : null };

  /* --- hero --- */
  const caption = r.one(def.hero.caption, "hero.caption");
  const lead = r.one(def.hero.lead, "hero.lead");
  const cefr = CEFR_EN[def.code];
  for (const f of def.hero.facts) {
    if (f.basis === "page") assertNumbers(f.value, pageText, `${context}/hero "${f.label}"`);
    if (f.basis === "course") assertNumbers(f.value, courseText, `${context}/hero "${f.label}"`);
    if (f.basis === "cefr") {
      const expected = cefr[f.field];
      if (!expected || !f.value.includes(expected)) {
        throw new ContentSectionsError(`${context}/hero "${f.label}": "${f.value}" CEFR_EN.${def.code}.${f.field} (${expected}) ile uyuşmuyor.`);
      }
    }
  }
  const steps = ladder(def.slug);
  const at = steps.findIndex((s) => s.current);

  /* --- neler yapabilirsiniz (genel bilgi) --- */
  const canDo = {
    answer: def.canDoAnswer,
    skills: SKILLS.map((s) => ({ label: s.label, icon: s.icon, text: cefr.skills[s.key], photo: s.photo })),
  };

  /* --- neden bu seviye (firma, yalnız B2 / C1) — şablon cümlesi ayrılır --- */
  const whyLines = def.why ? r.take({ heading: def.why.heading }, "why") : [];
  let why: EnglishLevelPage["why"] = null;
  if (def.why) {
    const lines = whyLines.filter((l) => l !== TEMPLATE.cta);
    if (lines.length !== def.why.icons.length) {
      throw new ContentSectionsError(`${context}/why: ${lines.length} satır ↔ ${def.why.icons.length} ikon.`);
    }
    why = {
      id: "neden-bu-seviye",
      title: r.heading({ source: def.why.heading }, "why.title"),
      answer: def.why.answer,
      cards: lines.map((text, i) => ({ icon: def.why!.icons[i], text })),
    };
  }

  /* --- çalışma teknikleri (firma) — kaynak satırları + şablon cümlesi ayrılır --- */
  const techLines = r.take({ heading: def.techniques.heading }, "techniques");
  const techniques = {
    id: "calisma-teknikleri",
    title: r.heading({ source: def.techniques.heading }, "techniques.title"),
    answer: def.techniques.answer,
    items: techLines.filter((l) => l !== TEMPLATE.cta).flatMap(sentencesOf),
    highlightsTitle: `Dünya Dilleri Merkezi'nde ${def.code}`,
    highlights: def.techniques.highlights.map((h, i) => ({ icon: h.icon, text: r.one(h.text, `techniques.highlights[${i}]`) })),
    photo: def.panelPhoto ?? LEVEL_COPY.panelPhoto,
  };
  // Şablon cümlesi sayfaya göre "Çalışma Teknikleri" ya da "Neden…" altında; A2'de hiç yok.
  const ctaLine = [...techLines, ...whyLines].includes(TEMPLATE.cta) ? TEMPLATE.cta : null;

  /* --- nedir (firma) + karşılaştırma (genel) --- */
  const aboutSentences = r.take({ heading: def.about.heading }, "about").flatMap(sentencesOf);
  const pointItems = aboutSentences.slice(def.about.cards.length);
  if (aboutSentences.length < def.about.cards.length || (pointItems.length > 0) !== Boolean(def.about.pointsTitle)) {
    throw new ContentSectionsError(
      `${context}/about: ${aboutSentences.length} cümle ↔ ${def.about.cards.length} kart (kalan cümleler için pointsTitle gerekli).`,
    );
  }
  const compare = LEVEL_LADDER.slice(Math.max(0, at - 1), at + 2).map((l) => ({
    code: l.code,
    name: l.name,
    current: l.slug === def.slug,
    cefr: CEFR_EN[l.code],
  }));
  const about = {
    id: "seviye-nedir",
    title: r.heading({ source: def.about.heading }, "about.title"),
    answer: def.about.answer,
    cards: def.about.cards.map((c, i) => ({ title: c.title, icon: c.icon, text: aboutSentences[i] })),
    points: def.about.pointsTitle ? { title: def.about.pointsTitle, items: pointItems } : null,
    compare,
  };

  const { branches, programs } = resolveTemplate(r, path, context, ctaLine);

  r.finish(def.ignored);

  /* --- SSS: rakamlar sayfa / İngilizce Kursu metninde ya da CEFR tablosunda olmalı --- */
  const cefrNumbers = [...Object.values(CEFR_EN).flatMap((c) => [c.ielts, c.hours]), C2_HOURS].filter(Boolean).join(" ");
  for (const f of def.faq) {
    assertNumbers(f.answer.join(" "), `${pageText} ${courseText} ${cefrNumbers}`, `${context}/faq "${f.question}"`);
  }

  const title = norm(def.meta.title ?? r.record.title);
  const description = norm(def.meta.description ?? r.record.meta_description);
  checkMeta(title, description, context);

  const page: EnglishLevelPage = {
    href: path,
    code: def.code,
    title,
    description,
    h1,
    crumbs: [{ label: "Anasayfa", href: "/" }, { label: "İngilizce Kursları", href: IK }, { label: def.label }],
    hero: {
      caption,
      lead,
      card: { name: def.name, trName: def.trName, cefr, facts: def.hero.facts },
      prev: at > 0 ? steps[at - 1] : null,
      next: at < steps.length - 1 ? steps[at + 1] : null,
    },
    ladder: steps,
    canDo,
    why,
    techniques,
    about,
    faq: def.faq,
    branches,
    programs,
    sources: LEVEL_SOURCES,
    updated: LEVEL_UPDATED,
  };
  cache.set(path, page);
  return page;
}

const BY_SLUG = new Map(ENGLISH_LEVELS.map((d) => [d.slug, d]));

export function getEnglishLevelBySlug(slug: string): EnglishLevelPage | undefined {
  const def = BY_SLUG.get(slug);
  return def ? getEnglishLevelPage(def) : undefined;
}
