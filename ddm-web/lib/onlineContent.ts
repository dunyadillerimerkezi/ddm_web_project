/**
 * P4 — Online eğitim sayfalarının içerik çözücüsü (Zengin İçerik alt türü 2).
 *
 * Kaynağın 8 sayfası tek şablon (h1 + 3 paragraf, 1.si 3 cümle). Çözücü bu
 * iskeleti build'de DOĞRULAR — yapı değişirse sessizce yanlış yere metin
 * basmak yerine düşer — ve 5 cümlenin her birini tam bir kez yerleştirir:
 *
 *   P1.1 → hero girişi
 *   P3   → adım 1 "Online başvuru"
 *   P1.2 → adım 2 "Size özel program"
 *   P1.3 → adım 3 "Birebir ya da grup"
 *   P2   → adım 4 "Canlı ders"
 *
 * Yazım düzeltmeleri kelime düzeyinde (`def.fixes`); kaynakta hiç geçmeyen
 * düzeltme build'i düşürür. `assertCoverage` her satırın tüketildiğini kanıtlar.
 */

import { LANGUAGES } from "@/data/languages";
import { examHref } from "@/lib/examContent";
import {
  ONLINE_CHECKLIST,
  ONLINE_HUB,
  ONLINE_LESSONS,
  type OnlineHubDef,
  type OnlineLessonDef,
} from "@/data/onlineLessons";
import { ContentSectionsError, SectionResolver, parseRecord } from "@/lib/contentSections";
import { categoryCrumb, checkMeta, findRecord, norm, parentCourse, type RichPage } from "@/lib/richContent";

/** Cümle sonu: nokta/ünlem/soru + boşluk + büyük harf. */
function sentences(paragraph: string): string[] {
  return paragraph.split(/(?<=[.!?])\s+(?=[A-ZÇĞİÖŞÜ])/u);
}

/** Kaynak iskeleti: paragraf başına beklenen cümle sayısı. */
const SHAPE = [3, 1, 1];

const cache = new Map<string, RichPage>();

/** Kelime düzeyinde yazım düzeltmesi — kullanılmayan düzeltme `assertFixesUsed`de build'i düşürür. */
function fixer(fixes: [string, string][]) {
  const used = new Set<string>();
  const apply = (line: string) =>
    fixes.reduce((acc, [from, to]) => {
      if (!acc.includes(from)) return acc;
      used.add(from);
      return acc.split(from).join(to);
    }, line);
  const assertUsed = (context: string) => {
    for (const [from] of fixes) {
      if (!used.has(from)) throw new ContentSectionsError(`${context}: kaynakta geçmeyen yazım düzeltmesi — "${from}"`);
    }
  };
  return { apply, assertUsed };
}

/** Karşılaştırma tablosu — hücreler firma cümlelerinin kısa hâli (online sayfaları + dil sayfaları). */
function compareBlock(branchGroup: string | null): RichPage["blocks"][number] {
  return {
    kind: "compare",
    id: "karsilastirma",
    title: "Online mı, şubede mi?",
    columns: [
      { key: "online", label: "Online eğitim" },
      { key: "sube", label: "Şubede" },
    ],
    rows: [
      { row: "Nerede", cells: { online: "Evinizden veya ofisinizden", sube: "Şubelerimizin sınıflarında" } },
      // Çatı sayfasında şube sınıf mevcudu yok (dile göre değişir: Türkçe 6) → satır basılmaz.
      ...(branchGroup
        ? [{ row: "Kişi sayısı", cells: { online: "Birebir ya da en fazla 8 kişilik online grup", sube: branchGroup } }]
        : []),
      {
        row: "Gün ve saat",
        cells: { online: "Size özel; haftalık olarak yeniden düzenlenebilir", sube: "Şubenin kurs takvimindeki gün ve saatler" },
      },
    ],
  };
}

export function getOnlineLessonPage(def: OnlineLessonDef): RichPage {
  const hit = cache.get(def.path);
  if (hit) return hit;

  const context = `online${def.path}`;
  const record = findRecord(def.path);
  const resolver = new SectionResolver(parseRecord(record));

  const sourceH1 = record.headings.find((h) => h.level === "h1");
  if (!sourceH1 || record.headings.length !== 1) {
    throw new ContentSectionsError(`${context}: tek h1'li şablon bekleniyordu (${record.headings.length} başlık).`);
  }
  const h1 = norm(sourceH1.text);

  const fix = fixer(def.fixes);
  const paragraphs = (resolver.take({ heading: h1 }, `${context}/govde`) ?? []).map(fix.apply);
  const split = paragraphs.map(sentences);
  if (split.length !== SHAPE.length || split.some((s, i) => s.length !== SHAPE[i])) {
    throw new ContentSectionsError(
      `${context}: kaynak iskeleti değişmiş — beklenen ${SHAPE.join("/")} cümle, bulunan ${split.map((s) => s.length).join("/")}.`,
    );
  }
  const [[lead, program, group], [live], [apply]] = split;

  fix.assertUsed(context);
  resolver.assertCoverage([], context);

  const language = LANGUAGES.find((l) => l.slug === def.languageSlug);
  if (!language) throw new ContentSectionsError(`${context}: dil tanımı yok — "${def.languageSlug}"`);

  // Metadata (CLAUDE.md §6)
  const title = norm(def.meta.title ?? record.title);
  const description = norm(def.meta.description ?? record.meta_description);
  checkMeta(title, description, context);
  if (!description.includes(def.language)) {
    // Kaynakta 3 sayfanın açıklaması başka dilden kopyalanmıştı — tekrarı build'de yakalanır.
    throw new ContentSectionsError(`${context}: description "${def.language}" geçmiyor — kopyala-yapıştır hatası mı?`);
  }

  const parent = parentCourse(def.path, context);
  const checklist = def.keyboard
    ? [...ONLINE_CHECKLIST, { icon: "klavye" as const, ...def.keyboard }]
    : ONLINE_CHECKLIST;

  const page: RichPage = {
    href: def.path,
    label: def.label,
    title,
    description,
    h1,
    crumbs: [{ label: "Anasayfa", href: "/" }, categoryCrumb(def.path, context), parent, { label: def.label }],
    parent,
    hero: {
      lead,
      photo: def.photo,
      // Firma cümlelerinin arayüz kısaltmaları: P1.3, P1.2, P3.
      facts: [
        { icon: "grup", label: "Birebir ya da en fazla 8 kişilik grup" },
        { icon: "takvim", label: "Size özel gün ve saat" },
        { icon: "konum", label: "Evden ya da ofisten" },
      ],
      secondary: { label: "Nasıl işler?", href: "#nasil-isler" },
    },
    blocks: [
      {
        kind: "steps",
        id: "nasil-isler",
        title: `Online ${def.language} dersi nasıl işler?`,
        lead: "Başvurudan ilk canlı derse dört adım; programınız ilk günden sizin takviminize göre kurulur.",
        steps: [
          { title: "Online başvuru", text: apply, note: null },
          { title: "Size özel program", text: program, note: null },
          { title: "Birebir ya da grup", text: group, note: null },
          {
            title: "Canlı ders",
            text: live,
            note: "Bu platformlara bilgisayardan, tabletten ya da telefondan bağlanabilirsiniz.",
          },
        ],
        checklist: { title: "Derse başlamadan önce", items: checklist },
        call: { flag: language.flag, greeting: language.greeting },
      },
      {
        kind: "exams",
        id: "sinavlar",
        title: `${def.language} sınavlarına evden girilebilir mi?`,
        lead: `Online hazırlanmak sınavın da online olduğu anlamına gelmez. ${def.language} yeterlik sınavlarının hangisine evden, hangisine sınav merkezinde girildiği:`,
        items: def.exams.items,
        note: def.exams.note,
      },
      compareBlock(def.branchGroup),
      { kind: "faq", id: "sss", title: "Sık sorulanlar", items: def.faq, updated: def.updated },
    ],
    family: {
      title: "Online eğitimler",
      links: [
        { label: "Tüm online eğitimler", href: ONLINE_HUB.path },
        ...ONLINE_LESSONS.filter((d) => d.path !== def.path).map((d) => ({ label: d.label, href: d.path })),
      ],
    },
    cta: { sub: "Uygun gün ve saatlerinizi, hedefinizle birlikte konuşalım." },
  };
  cache.set(def.path, page);
  return page;
}

/* ---------------------------------------------------------------
 * Çatı sayfası — kaynak: h1 + 3 paragraf, "Online Dil Eğitimlerimiz" ve
 * "Online Sınav Hazırlık Eğitimlerimiz" başlıkları (her biri tek cümle).
 *   P1 → hero · P3 → adım 1 · P2 → adım 2 · iki h2 + cümleleri → katalog.
 * ------------------------------------------------------------- */
const HUB_LANGUAGES = "Online Dil Eğitimlerimiz";
const HUB_EXAMS = "Online Sınav Hazırlık Eğitimlerimiz";

export function getOnlineHubPage(def: OnlineHubDef): RichPage {
  const hit = cache.get(def.path);
  if (hit) return hit;

  const context = `online${def.path}`;
  const record = findRecord(def.path);
  const resolver = new SectionResolver(parseRecord(record));
  const sourceH1 = record.headings.find((h) => h.level === "h1");
  if (!sourceH1) throw new ContentSectionsError(`${context}: kaynakta h1 yok.`);
  const h1 = norm(sourceH1.text);

  const fix = fixer(def.fixes);
  const take = (heading: string, slot: string) => (resolver.take({ heading }, `${context}/${slot}`) ?? []).map(fix.apply);
  const intro = take(h1, "giris");
  if (intro.length !== 3) throw new ContentSectionsError(`${context}: giriş 3 paragraf bekleniyordu (${intro.length}).`);
  const [lead, live, apply] = intro;
  const single = (heading: string, slot: string) => {
    const lines = take(heading, slot);
    if (lines.length !== 1) throw new ContentSectionsError(`${context}/${slot}: tek paragraf bekleniyordu (${lines.length}).`);
    return lines[0];
  };
  const languagesLead = single(HUB_LANGUAGES, "diller");
  const examsLead = single(HUB_EXAMS, "sinavlar");

  fix.assertUsed(context);
  resolver.assertCoverage([], context);

  // Katalog: kaynak cümlesinde adı geçmeyen dil / sınav basılmaz (UI kısaltması cümleye dayanır).
  for (const name of [...ONLINE_LESSONS.map((d) => d.language), ...def.extraLanguages]) {
    if (!languagesLead.includes(name)) throw new ContentSectionsError(`${context}: "${name}" dil cümlesinde geçmiyor.`);
  }
  for (const e of def.exams) {
    const token = e.label === "TestDaF" ? "TESTDAF" : e.label;
    if (!examsLead.includes(token)) throw new ContentSectionsError(`${context}: "${e.label}" sınav cümlesinde geçmiyor.`);
  }

  const title = norm(def.meta.title ?? record.title);
  const description = norm(def.meta.description ?? record.meta_description);
  checkMeta(title, description, context);

  const parent = categoryCrumb(def.path, context) as { label: string; href: string };

  const page: RichPage = {
    href: def.path,
    label: def.label,
    title,
    description,
    h1,
    crumbs: [{ label: "Anasayfa", href: "/" }, parent, { label: def.label }],
    parent,
    hero: {
      lead,
      photo: def.photo,
      facts: [
        { icon: "grup", label: "Birebir ya da en fazla 8 kişilik grup" },
        // Dil sayısı kaynak cümlesinden (8 online sayfa + 5 sayfasız dil).
        { icon: "dunya", label: `${ONLINE_LESSONS.length + def.extraLanguages.length} dil ve sınav hazırlık` },
        { icon: "konum", label: "Evden ya da ofisten" },
      ],
      secondary: { label: "Diller ve sınavlar", href: "#programlar" },
    },
    blocks: [
      {
        kind: "catalog",
        id: "programlar",
        groups: [
          {
            title: HUB_LANGUAGES,
            lead: languagesLead,
            cards: ONLINE_LESSONS.map((d) => {
              const language = LANGUAGES.find((l) => l.slug === d.languageSlug);
              return { label: d.language, href: d.path, flag: language?.flag ?? null, greeting: language?.greeting ?? "" };
            }),
            chipsLabel: "Ayrıca online",
            chips: def.extraLanguages.map((label) => ({ label, href: null })),
          },
          {
            title: HUB_EXAMS,
            lead: examsLead,
            cards: [],
            chipsLabel: null,
            chips: def.exams.map((e) => ({ label: e.label, href: e.slug ? examHref(e.slug) : null })),
          },
        ],
      },
      {
        kind: "steps",
        id: "nasil-isler",
        title: "Online ders nasıl işler?",
        lead: "Başvurunuzu online yapın, derslere evinizden ya da ofisinizden bağlanın.",
        steps: [
          { title: "Online başvuru", text: apply, note: null },
          {
            title: "Canlı ders",
            text: live,
            note: "Bu platformlara bilgisayardan, tabletten ya da telefondan bağlanabilirsiniz.",
          },
        ],
        checklist: { title: "Derse başlamadan önce", items: ONLINE_CHECKLIST },
        call: { flag: null, greeting: "Hello! · Hallo!" },
      },
      compareBlock(null),
      { kind: "faq", id: "sss", title: "Sık sorulanlar", items: def.faq, updated: def.updated },
    ],
    family: {
      title: "Online eğitimler",
      links: ONLINE_LESSONS.map((d) => ({ label: d.label, href: d.path })),
    },
    cta: { sub: "Diliniz, hedefiniz ve uygun saatleriniz için programı birlikte kuralım." },
  };
  cache.set(def.path, page);
  return page;
}
