/**
 * P6 — Şube tanıtım sayfası çözücüsü (`data/branchPromo.ts`).
 *
 * Sözleşme (`createGuideResolver` üstünde, P4/P5 ile aynı):
 *   - `details` kaynağın firma metnini birebir taşır; kapsama `assertCoverage` ile — her satır ya tüketilir ya
 *     gerekçeli `ignored` / `ignoredBlocks` / ortak 6 sekme başlığı (`SHARED_LINKS`) içindedir.
 *   - Sayfanın üstündeki her kısa metin (`Excerpt.match`) düzeltilmiş `details` metninde birebir aranır.
 *   - Dil / sınav listesi DÖRT SAYFADA AYNI (müşteri kararı 2026-09-30: "Hepsinde 19 dil ve sınava hazırlık kursları"):
 *     diller `data/languages.ts` `ALL_LANGUAGE_NAMES`, sınavlar `data/exams.ts` `EXAMS`; yalnız sitede sayfası olanlar
 *     bağlantı alır (`isProducedPage`). "Dile göre sınavlar" (Bağdat Caddesi) kaynak cümlesinden bölünmeye devam eder.
 *   - H1 şubenin `data/branches.ts` adını taşımak zorunda (bayat "Beşiktaş" gibi adlar build'i düşürür).
 *   - title >60 / description >155, kullanılmayan `edits`, kaynakta başlık olmayan anahtar build'i düşürür.
 * Ümraniye'nin tanıtım sayfası yok ve olmayacak (müşteri kararı 2026-09-30) — yalnız iletişim sayfası.
 */

import { BRANCHES, directionsHref, mapQuery } from "@/data/branches";
import { BRANCH_PHOTOS, type BranchPhoto } from "@/data/branchPhotos";
import { BRANCH_TRANSIT, type TransitItem } from "@/data/branchTransit";
import { BRANCH_PROMOS, SHARED_LINKS, type BranchPromoDef, type Excerpt, type PromoBlock, type PromoTitle } from "@/data/branchPromo";
import { COURSE_DATES } from "@/data/courseDates";
import { EXAMS } from "@/data/exams";
import { ALL_LANGUAGE_NAMES, LANGUAGE_PAGES } from "@/data/languages";
import type { Photo } from "@/data/privateLessonsShared";
import type { IconName } from "@/components/graphics/icons";
import { ContentSectionsError } from "@/lib/contentSections";
import { examHref } from "@/lib/examContent";
import { createGuideResolver } from "@/lib/guideContent";
import { isProducedPage } from "@/lib/pageRegistry";
import { checkMeta, norm } from "@/lib/richContent";
import type { Branch, Crumb } from "@/lib/types";

export type PromoTag = { label: string; href?: string };

export type PromoResolvedBlock =
  | {
      kind: "intro";
      id: string;
      title: string;
      sub: string | null;
      points: { title: string; icon: IconName; text: string }[];
      quote: { text: string; cite: string | null; photo: Photo | null } | null;
    }
  | {
      kind: "programs";
      id: string;
      title: string;
      lead: string | null;
      approach: { title: string | null; text: string } | null;
      columns: { title: string; badge: string | null; rows: { label: string; text: string }[]; more: { label: string; href: string } }[];
    }
  | {
      kind: "highlights";
      id: string;
      tone: "sky" | "navy";
      title: string;
      lead: string | null;
      items: string[];
      byLanguage: { lang: PromoTag; exams: PromoTag[] }[];
    }
  | { kind: "corporate"; id: string; title: string; text: string; areas: string[]; clients: string[] }
  | { kind: "gallery"; id: string; photos: Photo[] };

export type BranchPromoPage = {
  path: string;
  branch: Branch;
  title: string;
  description: string;
  h1: string;
  crumbs: Crumb[];
  hero: { lead: string; badge: string; photo: BranchPhoto };
  card: { label: string; text: string }[];
  blocks: PromoResolvedBlock[];
  visit: { place: { title: string; text: string } | null; transit: TransitItem[] };
  courses: { title: string; items: { label: string; href: string }[] }[];
  /** Dört sayfada aynı: 19 dil + sınav hazırlık listesi ve 6 ortak başlık (`href` yoksa düz metin). */
  offer: { languages: PromoTag[]; exams: PromoTag[] };
  shared: { label: string; href?: string }[];
  /** "Ayrıntılı bilgi": kaynak metnin tamamı; "* " ile başlayan kaynak satırları madde olarak gösterilir. */
  details: { title: string; paragraphs: string[] }[];
  contactHref: string;
  directionsHref: string;
  mapQuery: string;
  updated: string;
};

/** "Dile göre sınavlar" satırlarındaki sınav etiketi → sitedeki sayfa (yalnız sayfası olanlar; TELC, CELI… düz metin kalır). */
const TAG_SLUG: Record<string, string> = {
  IELTS: "ielts-kursu",
  TOEFL: "toefl-kursu",
  TESTDAF: "testdaf-kursu",
  YÖKDİL: "yokdil-sinavi-kursu",
};

function tag(label: string, context: string): PromoTag {
  const lang = LANGUAGE_PAGES.find((l) => l.name === label);
  const href = lang ? `/yabanci-dil-egitimleri/${lang.slug}` : TAG_SLUG[label] ? examHref(TAG_SLUG[label]) : undefined;
  if (href && !isProducedPage(href)) throw new ContentSectionsError(`${context}: etiket hedefi üretilmemiş — "${href}"`);
  return href ? { label, href } : { label };
}

/** Ortak listelerin sayfadaki çapaları (program sütunlarının altındaki bağlantı buraya iner). */
export const OFFER_IDS = { languages: "diller", exams: "sinavlar" } as const;
const OFFER_MORE = {
  languages: { label: `${ALL_LANGUAGE_NAMES.length} dilin tamamı`, href: `#${OFFER_IDS.languages}` },
  exams: { label: "Tüm sınav hazırlık kursları", href: `#${OFFER_IDS.exams}` },
};

/** "A, B, C ve D" / "CELI / CILS" → ayrı etiketler. */
function splitList(list: string): string[] {
  return list
    .split(/,\s*|\s+ve\s+|\s+\/\s+/u)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Kaynak kaydında `from` satırından `to` ile başlayan satıra kadar (dahil) normalize satırlar. */
function blockLines(text: string, from: string, to: string, context: string): string[] {
  const lines = text.split("\n").map(norm).filter(Boolean);
  const a = lines.indexOf(from);
  const b = a < 0 ? -1 : lines.findIndex((l, i) => i > a && l.startsWith(to));
  if (a < 0 || b < 0) throw new ContentSectionsError(`${context}: ignoredBlocks sınırı kaynakta yok — "${a < 0 ? from : to}"`);
  return lines.slice(a, b + 1);
}

/** Kurs sırası sitenin geri kalanıyla aynı: diller `LANGUAGE_PAGES`, sınavlar `EXAMS` sırasında. */
function courseOrder(slug: string): number {
  const lang = LANGUAGE_PAGES.findIndex((l) => l.slug === slug);
  if (lang >= 0) return lang;
  const exam = EXAMS.findIndex((e) => e.slug === slug);
  return exam >= 0 ? 100 + exam : 999;
}

/** Başlıktan bölüm çapası: "Kurumsal Eğitimler" → "kurumsal-egitimler". */
function slugify(s: string): string {
  return s
    .toLocaleLowerCase("tr")
    .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .slice(0, 48)
    .replace(/^-+|-+$/g, "");
}

function resolve(def: BranchPromoDef): BranchPromoPage {
  const context = `tanitim${def.path}`;
  const branch = BRANCHES[def.branch];
  const r = createGuideResolver(def.source, def, context);

  /** Başlık çözümü — `split` başlığın arkasındaki paragrafı da döndürür. */
  const title = (t: PromoTitle, slot: string): { title: string; rest: string | null } => {
    if ("added" in t) return { title: t.added, rest: null };
    if ("source" in t) return { title: r.heading({ source: t.source }, slot), rest: null };
    if ("line" in t) return { title: r.one({ src: t.line }, slot), rest: null };
    const full = r.heading({ source: t.split }, slot);
    const i = full.indexOf(t.at);
    if (i <= 0) throw new ContentSectionsError(`${context}/${slot}: "${t.at}" ile bölünemedi — "${full.slice(0, 50)}…"`);
    return { title: full.slice(0, i), rest: full.slice(i + t.at.length) };
  };
  const heading = (t: PromoTitle, slot: string) => {
    if ("added" in t) throw new ContentSectionsError(`${context}/${slot}: sayfa başlığı kaynaktan gelmeli ("added" yalnız Ayrıntılı bilgi için).`);
    return title(t, slot).title;
  };

  const details = def.details.map((s, i) => {
    const slot = `details[${i}]`;
    const head = title(s.title, `${slot}.title`);
    const paragraphs = s.paras.map((p, j) => {
      if ("heading" in p) return r.heading({ source: p.heading }, `${slot}.paras[${j}]`);
      const lines = r.take(p.src, `${slot}.paras[${j}]`);
      return p.join ? norm(lines.join(" ")) : lines.join("\n");
    });
    return { title: head.title, paragraphs: head.rest ? [head.rest, ...paragraphs] : paragraphs };
  });

  // Kısa parçaların arandığı metin: "Ayrıntılı bilgi"nin başlıkları + paragrafları (edits uygulanmış).
  const corpus = details.flatMap((d) => [d.title, ...d.paragraphs]).join("\n");
  const ex = (e: Excerpt, slot: string): string => {
    if (!corpus.includes(e.match)) throw new ContentSectionsError(`${context}/${slot}: parça kaynak metinde yok — "${e.match.slice(0, 60)}…"`);
    return e.match;
  };
  const opt = (e: Excerpt | undefined, slot: string) => (e ? ex(e, slot) : null);

  // CLAUDE.md §6: kaynakta h1 varsa o kullanılır — tanım güncellenmeden sessizce ezilmesin.
  const sourceH1 = r.record.headings.find((h) => h.level === "h1");
  if (sourceH1) throw new ContentSectionsError(`${context}: kaynakta artık h1 var ("${sourceH1.text}") — def.h1'i ona çevirin.`);
  const h1 = heading(def.h1, "h1");
  if (!h1.includes(branch.name)) throw new ContentSectionsError(`${context}: H1 şube adını ("${branch.name}") taşımıyor — "${h1}"`);
  console.warn(`[h1-fallback] ${context}: kaynakta h1 yok, "${h1}" H1'e yükseltildi`);
  const badge = "source" in def.hero.badge ? heading(def.hero.badge, "hero.badge") : ex(def.hero.badge, "hero.badge");

  const usedIds = new Set<string>();
  const blockId = (t: string) => {
    const base = slugify(t);
    let id = base;
    for (let n = 2; usedIds.has(id); n++) id = `${base}-${n}`;
    usedIds.add(id);
    return id;
  };

  const block = (b: PromoBlock, slot: string): PromoResolvedBlock => {
    switch (b.kind) {
      case "intro": {
        const t = heading(b.title, `${slot}.title`);
        return {
          kind: "intro",
          id: blockId(t),
          title: t,
          sub: opt(b.sub, `${slot}.sub`),
          points: b.points.map((p, i) => ({ title: p.title, icon: p.icon, text: ex(p.text, `${slot}.points[${i}]`) })),
          quote: b.quote
            ? { text: ex(b.quote.text, `${slot}.quote`), cite: opt(b.quote.cite, `${slot}.cite`), photo: b.quote.photo ?? null }
            : null,
        };
      }
      case "programs": {
        const t = heading(b.title, `${slot}.title`);
        return {
          kind: "programs",
          id: blockId(t),
          title: t,
          lead: opt(b.lead, `${slot}.lead`),
          approach: b.approach ? { title: opt(b.approach.title, `${slot}.approach.title`), text: ex(b.approach.text, `${slot}.approach`) } : null,
          columns: b.columns.map((c, i) => ({
            title: c.title,
            badge: opt(c.badge, `${slot}.columns[${i}].badge`),
            rows: c.rows.map((row, j) => ({ label: row.label, text: ex(row.text, `${slot}.columns[${i}].rows[${j}]`) })),
            more: OFFER_MORE[c.list],
          })),
        };
      }
      case "highlights": {
        const t = heading(b.title, `${slot}.title`);
        return {
          kind: "highlights",
          id: blockId(t),
          tone: b.tone,
          title: t,
          lead: opt(b.lead, `${slot}.lead`),
          items: b.items.map((it, i) => ex(it, `${slot}.items[${i}]`)),
          byLanguage: (b.byLanguage ?? []).map((row, i) => {
            // Dil adı ve sınavları kaynakta yan yana geçmeli ("Almanca TELC, TESTDAF").
            ex({ match: `${row.lang} ${row.exams.match}` }, `${slot}.byLanguage[${i}]`);
            return { lang: tag(row.lang, slot), exams: splitList(row.exams.match).map((l) => tag(l, slot)) };
          }),
        };
      }
      case "corporate": {
        const t = heading(b.title, `${slot}.title`);
        return {
          kind: "corporate",
          id: blockId(t),
          title: t,
          text: ex(b.text, `${slot}.text`),
          areas: (b.areas ?? []).map((a, i) => ex(a, `${slot}.areas[${i}]`)),
          clients: b.clients ? splitList(ex(b.clients, `${slot}.clients`)) : [],
        };
      }
      case "gallery":
        if (def.gallery.length === 0) throw new ContentSectionsError(`${context}/${slot}: galeri bloğu var ama fotoğraf yok.`);
        return { kind: "gallery", id: blockId("derslerimizden-kareler"), photos: def.gallery };
    }
  };
  const blocks = def.blocks.map((b, i) => block(b, `blocks[${i}]`));

  const place = def.visit.place
    ? {
        title: def.visit.place.title ? heading(def.visit.place.title, "visit.place.title") : `${branch.name} şubesinin konumu`,
        text: ex(def.visit.place.text, "visit.place"),
      }
    : null;

  // Ortak 6 sekme başlığı + form/KVKK bloğu + gürültü satırları kapsamadan düşer.
  const recordLines = r.record.text.split("\n").map(norm);
  const sharedLines = SHARED_LINKS.flatMap((l) => {
    const found = recordLines.filter((line) => line.replace(/‏/g, "").trim() === l.line);
    if (found.length === 0) throw new ContentSectionsError(`${context}: ortak sekme başlığı kaynakta yok — "${l.line}"`);
    return found.map((line) => ({ line }));
  });
  const ignoredBlocks = def.ignoredBlocks.flatMap((b) => blockLines(r.record.text, b.from, b.to, context).map((line) => ({ line })));
  r.finish([...def.ignored, ...sharedLines, ...ignoredBlocks]);

  const pageTitle = norm(def.meta.title);
  const description = norm(def.meta.description);
  checkMeta(pageTitle, description, context);
  for (const l of SHARED_LINKS) {
    if (l.href && !isProducedPage(l.href)) throw new ContentSectionsError(`${context}: ortak bağlantı hedefi üretilmemiş — "${l.href}"`);
  }

  const branchDates = COURSE_DATES.filter((c) => c.branch === def.branch);
  const courses = [
    { title: "Dil kursları", category: "yabanci-dil-egitimleri" },
    { title: "Sınav hazırlık", category: "sinav-hazirlik-egitimleri" },
  ]
    .map((g) => ({
      title: g.title,
      items: branchDates
        .filter((c) => c.category === g.category)
        .sort((a, b) => courseOrder(a.courseSlug) - courseOrder(b.courseSlug))
        .map((c) => ({ label: c.crumbCourse, href: `/${c.category}/${c.courseSlug}/${c.pageSlug}` })),
    }))
    .filter((g) => g.items.length > 0);
  if (courses.reduce((n, g) => n + g.items.length, 0) !== branchDates.length) {
    throw new ContentSectionsError(`${context}: kurs tarihi sayfalarının bir kısmı gruplara düşmedi.`);
  }

  const query = mapQuery(branch);
  const directions = directionsHref(branch);
  if (!query || !directions) throw new ContentSectionsError(`${context}: şube adresi yok (data/branches.ts).`);

  return {
    path: def.path,
    branch,
    title: pageTitle,
    description,
    h1,
    crumbs: [{ label: "Ana Sayfa", href: "/" }, { label: "Şubelerimiz", href: "/ddm-iletisim" }, { label: branch.name }],
    hero: { lead: ex(def.hero.lead, "hero.lead"), badge, photo: BRANCH_PHOTOS[def.branch] },
    card: def.card.map((c, i) => ({ label: c.label, text: ex(c.text, `card[${i}]`) })),
    blocks,
    visit: { place, transit: BRANCH_TRANSIT[def.branch] },
    courses,
    offer: {
      languages: ALL_LANGUAGE_NAMES.map((name) => tag(name, "offer.languages")),
      exams: EXAMS.map((e) => {
        const href = examHref(e.slug);
        if (!isProducedPage(href)) throw new ContentSectionsError(`${context}: sınav etiketi hedefi üretilmemiş — "${href}"`);
        return { label: e.name, href };
      }),
    },
    shared: SHARED_LINKS.map(({ label, href }) => ({ label, href })),
    details,
    contactHref: branch.href,
    directionsHref: directions,
    mapQuery: query,
    updated: def.updated,
  };
}

const cache = new Map<string, BranchPromoPage>();

export function getBranchPromoPage(path: string): BranchPromoPage {
  const hit = cache.get(path);
  if (hit) return hit;
  const def = BRANCH_PROMOS.find((p) => p.path === path);
  if (!def) throw new ContentSectionsError(`tanıtım sayfası tanımsız — "${path}"`);
  const page = resolve(def);
  cache.set(path, page);
  return page;
}
