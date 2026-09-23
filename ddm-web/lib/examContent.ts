/**
 * P2 — Sınav Hazırlık Kursu Ana sayfası içerik sözleşmesi (16 sınav).
 *
 * `lib/languageContent.ts` / `lib/universityContent.ts` ile aynı çekirdek
 * (`SectionResolver` + `assertCoverage`), kendi sözleşmesiyle. 16 sınavın
 * kaynak yapısı birbirine benzemediği için (bkz. Aşama 0 katman tablosu) sabit
 * rol alanları yerine SIRALI bir blok listesi kullanılır: her blok bir kaynak
 * başlığına bağlanır ve hangi bileşenle basılacağını (`kind`) söyler.
 *
 * İÇERİK KURALI (P2 kullanıcı kararı, 2026-09-22 — CLAUDE.md §5'e onaylı sapma):
 *   - Kaynaktaki başlıklar ÇIKARILMAZ; her başlık bir bloğa bağlıdır.
 *   - Gövde metni konudan sapmadan SEO için geliştirilebilir. Her değişiklik
 *     `data/exams.ts`te İZLENEBİLİR tutulur: `edits` (orijinal satır → yeni
 *     satır) ve `additions` (başlığın sonuna eklenen paragraflar). Orijinal
 *     satır yine `take()` ile tüketilir, yani `assertCoverage` hâlâ her kaynak
 *     satırının hesabını sorar; kullanılmayan bir `edits` girdisi (kaynak
 *     değişmiş/eşleme çürümüş) build'i düşürür.
 */

import siteContent from "@/data/site_content.json";
import {
  SectionResolver,
  ContentSectionsError,
  parseRecord,
  type SiteContentRecord,
} from "@/lib/contentSections";
import { COURSE_DATES } from "@/data/courseDates";
import type { Faq, SectionRef } from "@/lib/types";
import type { IconName } from "@/components/graphics/icons";
import type { IllustrationName } from "@/components/graphics/Illustration";
import type { ExamMeta, ExamSection } from "@/components/cards/ExamSectionCard";
import type { FactCard } from "@/components/sections/FactCards";
import type { BranchDateRow } from "@/components/sections/BranchDateRows";

/* ---------------------------------------------------------------
 * Sözleşme (data/exams.ts bunu doldurur)
 * ------------------------------------------------------------- */

type Take = SectionRef["take"];

/** Düz metin bölümü — başlık + paragraflar (ya da madde listesi). */
export type ProseBlockRef = {
  kind: "prose";
  heading: string;
  kicker: string;
  /** Bölüm başlığı kaynak başlığından farklı olacaksa (ör. gövdenin kalanı
   *  H1'in altında kaldığında). Kaynak başlığı SİLİNMEZ, H1 olarak durur. */
  title?: string;
  take?: Take;
  format?: "prose" | "list";
};

/**
 * Giriş cümlesi + olgu satırları. Satırların HEPSİ "Etiket: değer" biçimindeyse
 * ve `icons` verilmişse ikonlu `FactCards`, aksi halde tek ikonlu `BulletPanel`
 * olarak basılır.
 */
export type FactsBlockRef = {
  kind: "facts";
  heading: string;
  kicker: string;
  icon: IconName;
  /** Satır başına ikon — satır sayısıyla aynı uzunlukta olmalı. */
  icons?: IconName[];
  /** Giriş paragraf(lar)ı — varsayılan `[0]`; null → giriş yok. */
  leadTake?: Take | null;
  /** Maddeler — varsayılan "rest" (leadTake null ise "all"). */
  itemsTake?: Take;
};

/**
 * Şube kurs tarihi link listesi ("… Plan Tablosu ve Kurs Tarihleri").
 * Şube satırlarının href'i `data/courseDates.ts`ten TÜRETİLİR (elle yazılmaz);
 * şube-dışı satırlar (Nedir / Özel Ders / Örnek Sorular…) `extraHrefs`te
 * yoksa link üretilmez (P4'te gelecek — yeni ölü link yasak).
 */
export type BranchLinksBlockRef = {
  kind: "branchLinks";
  heading: string;
  /** Başlığın altında link listesinden BAŞKA içerik de varsa (Proficiency'nin
   *  başarı tablosu) yalnız link satırları alınır. Varsayılan "all". */
  take?: Take;
  /** Şube-dışı satır etiketi → href (ör. sayfa içi çapa). Yoksa null. */
  extraHrefs?: Record<string, string>;
};

/**
 * Sınav yapısı kartları (`ExamStructure`). Kart adı/beceri satırı kaynak
 * satırından " – " ile bölünerek türetilir; `cards[i].meta` kaynakta (ya da
 * doğrulanmış `additions`ta) geçen sayısal olgulardır.
 */
export type StructureBlockRef = {
  kind: "structure";
  heading: string;
  /** Giriş satırı ("… 4 bölümden oluşur:") — varsayılan `[0]`. */
  leadTake?: Take | null;
  /** Kart satırları — varsayılan "rest". */
  cardsTake?: Take;
  cards: { icon: IconName; meta: ExamMeta[] }[];
  /** "Bölüm detayını oku" linkinin hedef çapası (ör. "sss"). */
  detailAnchor: string | null;
};

/**
 * KALDIRILAN sayfadan taşınan içerik (kullanıcı kararı, 2026-09-23: "Kurs
 * Programı" / `-kursu-2` sayfaları yayınlanmıyor). Metin repoya KOPYALANMAZ:
 * `lines` yalnız SEÇİCİdir, gövde kaldırılan sayfanın kaydından okunur ve
 * satır kaynakta yoksa build düşer.
 */
export type MergedBlockRef = {
  kind: "merged";
  /** Kaldırılan sayfanın slug'ı: "toefl-kursu/toefl-kursu-2". */
  sourcePath: string;
  kicker: string;
  title: string;
  lines: string[];
};

/**
 * İkişerli sütun düzeninden gelen istatistik satırları (Proficiency'nin 2018
 * başarı tablosu: iki üniversite adı, ardından iki sonuç satırı). Kaynak
 * SIRASI korunur, yalnız ad ↔ sonuç eşlemesi yapılır.
 */
export type StatsBlockRef = {
  kind: "stats";
  heading: string;
  kicker: string;
  /** Başlık satır(lar)ı — bölüm girişinde basılır. */
  leadTake: Take;
  /** Ad/sonuç satırları: [ad1, ad2, sonuç1, sonuç2] düzeninde. */
  take: Take;
  icon: IconName;
};

/** 21 üniversite ızgarası (kaynaktaki "… Hazırladığımız Üniversiteler"
 *  satırının hedefi). Kaynak satır tüketmez, gezinme bölümüdür. */
export type UniversitiesBlockRef = { kind: "universities" };

/**
 * Sayfada BASILMAYAN ama kapsama için tüketilen satırlar — `ignored[]`in
 * indeksli hâli (uzun tablo hücresi dizileri için). `reason` zorunlu:
 * neden basılmadığı veride yazılı kalır.
 */
export type DropBlockRef = {
  kind: "drop";
  heading: string;
  take: Take;
  reason: string;
};

/**
 * Kaynakta BAŞLIK olarak işaretlenmiş ama aslında bir belge/madde listesinin
 * öğesi olan satırlar (Almanca aile birleşiminde "Pasaport", "Nüfus cüzdanı"…).
 * Başlık metni liste maddesi olarak basılır, varsa gövdesi açıklaması olur —
 * yani hiçbir şey düşmez.
 */
export type HeadingListBlockRef = {
  kind: "headingList";
  kicker: string;
  title: string;
  headings: string[];
};

/** Soru biçimli başlıklar → SSS akordiyonu (soru = kaynak başlığı birebir). */
export type FaqBlockRef = {
  kind: "faq";
  title: string;
  /** Varsayılan "sss". Sayfada birden çok akordiyon varsa ayırt eder. */
  id?: string;
  /** Varsayılan "SIKÇA SORULAN SORULAR". */
  kicker?: string;
  items: { heading: string; format?: "prose" | "list"; question?: string }[];
};

export type ExamBlockRef =
  | ProseBlockRef
  | FactsBlockRef
  | BranchLinksBlockRef
  | StructureBlockRef
  | MergedBlockRef
  | StatsBlockRef
  | UniversitiesBlockRef
  | DropBlockRef
  | HeadingListBlockRef
  | FaqBlockRef;

export type ExamDef = {
  /** Eski sitedeki slug, birebir (CLAUDE.md §3). */
  slug: string;
  /** Kısa ad — kırıntı, "diğer sınavlar" kartı: "TOEFL". */
  name: string;
  /** Kırıntı/kart etiketi: "TOEFL Kursu". */
  label: string;
  /** Hero rozeti — null → basılmaz. */
  code: string | null;
  illustration: IllustrationName;
  /** Hero lead'i hangi başlığın ilk paragrafından gelir (null → H1 başlığı). */
  hero: { heading: string | null; take?: Take };
  blocks: ExamBlockRef[];
  /** SEO geliştirmesi: orijinal satır (normalize edilmiş) → yeni metin. */
  edits?: Record<string, string>;
  /** SEO geliştirmesi: başlığın bloğunun SONUNA eklenen paragraflar. */
  additions?: Record<string, string[]>;
  /** Bilinçli olarak basılmayan satırlar — her biri gerekçeli (yorumla). */
  ignored: string[];
};

/* ---------------------------------------------------------------
 * Sayfa modeli
 * ------------------------------------------------------------- */

export type ExamBlock =
  | { kind: "prose"; id: string; kicker: string; title: string; paragraphs: string[]; format: "prose" | "list" }
  | {
      kind: "facts";
      id: string;
      kicker: string;
      title: string;
      lead: string | null;
      items: string[];
      icon: IconName;
      /** null → satırlar "Etiket: değer" değil; BulletPanel'e düşülür. */
      cards: FactCard[] | null;
    }
  | { kind: "branchLinks"; id: string; title: string; lead: string | null; rows: BranchDateRow[] }
  | { kind: "structure"; id: string; title: string; lead: string | null; sections: ExamSection[]; detailAnchor: string | null }
  | { kind: "merged"; id: string; kicker: string; title: string; items: string[] }
  | { kind: "stats"; id: string; kicker: string; title: string; lead: string | null; cards: FactCard[] }
  | { kind: "universities"; id: string }
  | { kind: "drop" }
  | { kind: "headingList"; id: string; kicker: string; title: string; items: { label: string; body: string | null }[] }
  | { kind: "faq"; id: string; kicker: string; title: string; items: Faq[] };

export type ExamPageDiagnostic = { kind: "h1-fallback" | "h1-duplicate"; detail: string };

export type ExamPage = {
  def: ExamDef;
  record: SiteContentRecord;
  h1: string;
  heroLead: string | null;
  blocks: ExamBlock[];
  diagnostics: ExamPageDiagnostic[];
};

/* ---------------------------------------------------------------
 * Yardımcılar
 * ------------------------------------------------------------- */

const CATEGORY = "sinav-hazirlik-egitimleri";

/** Kaynak etiketindeki şube adı → `courseDates.ts` şube anahtarı. Etiket
 *  metni birebir korunur ("Beşiktaş Şubesi"), yalnız hedef bulunur. */
/** Kurs-tarihi sayfasındaki program bloğu → satır altı bilgisi. */
const PROGRAM_LABELS: Record<string, string> = {
  haftaici: "Hafta içi",
  haftasonu: "Hafta sonu",
  birebir: "Birebir",
};

const BRANCH_KEYS: [string, string][] = [
  ["Kadıköy", "kadikoy"],
  ["Bağdat Caddesi", "bagdat"],
  ["Beşiktaş", "etiler"],
  ["Ataşehir", "atasehir"],
];

/** Kaynakta başlık metniyle gövde satırı aynı olmayabilir: başlıkta kırılmayan
 *  boşluk (\u00a0) geçiyor (ör. Proficiency H1). `parseRecord` gövdeyi
 *  normalleştirdiği için eşleme de aynı normalleştirmeden geçmeli. */
function norm(s: string): string {
  return s.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
}

/** Kaynakta görünmez yön karakterleri var ("TOEFL Nedir?\u200f"). */
function clean(s: string): string {
  return s.replace(/[\u200e\u200f]/g, "").trim();
}

function slugifyId(s: string): string {
  return clean(s)
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

export function examHref(slug: string): string {
  return `/${CATEGORY}/${slug}`;
}

function findRecord(slug: string): SiteContentRecord {
  const url = `https://www.dunyadillerimerkezi.com/${CATEGORY}/${slug}.html`;
  const record = (siteContent as SiteContentRecord[]).find((r) => r.url === url);
  if (!record) {
    throw new ContentSectionsError(`data/site_content.json içinde "${url}" kaydı bulunamadı.`);
  }
  return record;
}

/* ---------------------------------------------------------------
 * Çözücü
 * ------------------------------------------------------------- */

export function getExamPage(def: ExamDef): ExamPage {
  const context = `exam/${def.slug}`;
  const record = findRecord(def.slug);
  const resolver = new SectionResolver(parseRecord(record));
  const diagnostics: ExamPageDiagnostic[] = [];

  const edits = new Map(Object.entries(def.edits ?? {}));
  const usedEdits = new Set<string>();
  const additions = def.additions ?? {};
  const usedAdditions = new Set<string>();

  /** Kaynak satırlarını al → `edits` uygula → başlığın `additions`ını ekle. */
  const take = (
    headingRaw: string | null,
    t: Take,
    slot: string,
    withAdditions = true,
    /** Yalnız `headingList`: kaynakta gövdesiz olan başlıklar için. Diğer
     *  bloklarda 0 paragraf çözen slot HATA (sessiz boş bölüm olmasın). */
    allowEmpty = false,
  ): string[] => {
    const heading = headingRaw === null ? null : norm(headingRaw);
    const lines = resolver.take({ heading, take: t, allowEmpty }, `${context}/${slot}`) ?? [];
    const out = lines.map((l) => {
      const edited = edits.get(l);
      if (edited === undefined) return l;
      usedEdits.add(l);
      return edited;
    });
    const addKey = headingRaw === null ? null : headingRaw;
    if (withAdditions && addKey !== null && additions[addKey]) {
      usedAdditions.add(addKey);
      out.push(...additions[addKey]);
    }
    return out;
  };

  // H1 (CLAUDE.md §6): kaynak h1 → yoksa ilk başlık (loglanır).
  const h1s = record.headings.filter((h) => h.level === "h1").map((h) => norm(h.text));
  let h1: string;
  if (h1s.length === 0) {
    h1 = norm(record.headings[0]?.text ?? record.title);
    const detail = `${def.slug}: kaynakta h1 yok — ilk başlığa düşüldü ("${h1}").`;
    console.warn(`[examContent] ${detail}`);
    diagnostics.push({ kind: "h1-fallback", detail });
  } else {
    h1 = h1s[0];
    if (h1s.length > 1) {
      // Aynı metinli tekrar h1 tek H1 olarak basılır (SEO: sayfada tek H1).
      const detail = `${def.slug}: kaynakta ${h1s.length} h1 var — ilki kullanıldı.`;
      console.warn(`[examContent] ${detail}`);
      diagnostics.push({ kind: "h1-duplicate", detail });
    }
  }

  const heroHeading = def.hero.heading ?? h1;
  const heroLines = take(heroHeading, def.hero.take ?? "first", "hero", false);
  const heroLead = heroLines.join(" ") || null;

  const blocks: ExamBlock[] = def.blocks.map((b, i): ExamBlock => {
    const slot = `blocks[${i}]`;
    switch (b.kind) {
      case "prose": {
        const paragraphs = take(b.heading, b.take ?? "all", slot);
        return {
          kind: "prose",
          id: slugifyId(b.title ?? b.heading),
          kicker: b.kicker,
          title: b.title ?? clean(b.heading),
          paragraphs,
          format: b.format ?? "prose",
        };
      }
      case "facts": {
        const leadTake = b.leadTake === undefined ? [0] : b.leadTake;
        const lead = leadTake === null ? [] : take(b.heading, leadTake, `${slot}/lead`, false);
        const items = take(b.heading, b.itemsTake ?? (leadTake === null ? "all" : "rest"), `${slot}/items`);
        let cards: FactCard[] | null = null;
        if (b.icons) {
          if (b.icons.length !== items.length) {
            throw new ContentSectionsError(
              `${context}/${slot}: ${items.length} olgu satırı var, icons ${b.icons.length} girdi taşıyor.`,
            );
          }
          const split = items.map((line) => {
            const at = line.indexOf(":");
            return at > 0 ? { label: line.slice(0, at).trim(), value: line.slice(at + 1).trim() } : null;
          });
          if (split.every((x) => x !== null)) {
            cards = split.map((x, k) => ({ icon: b.icons![k], label: x!.label, value: x!.value }));
          } else {
            throw new ContentSectionsError(
              `${context}/${slot}: icons verildi ama satırlar "Etiket: değer" biçiminde değil.`,
            );
          }
        }
        return {
          kind: "facts",
          id: slugifyId(b.heading),
          kicker: b.kicker,
          title: clean(b.heading),
          lead: lead.join(" ") || null,
          items,
          icon: b.icon,
          cards,
        };
      }
      case "branchLinks": {
        const lines = take(b.heading, b.take ?? "all", slot, false);
        type Row = BranchDateRow & { groupSize: number | null; months: number | null };
        const rows: Row[] = lines.map((line): Row => {
          const branch = BRANCH_KEYS.find(([label]) => line.includes(label));
          if (!branch) {
            return {
              label: clean(line),
              href: b.extraHrefs?.[line] ?? null,
              meta: [],
              kind: "link",
              groupSize: null,
              months: null,
            };
          }
          const entry = COURSE_DATES.find(
            (e) => e.category === CATEGORY && e.courseSlug === def.slug && e.branch === branch[1],
          );
          if (!entry) {
            throw new ContentSectionsError(
              `${context}/${slot}: "${line}" için data/courseDates.ts'te kurs-tarihi kaydı yok.`,
            );
          }
          // Satır altı bilgisi hedef sayfanın GERÇEK verisinden gelir (uydurma yok).
          const meta = entry.programs.map((pr) => PROGRAM_LABELS[pr.kind]).filter(Boolean);
          return {
            label: clean(line),
            href: `/${entry.category}/${entry.courseSlug}/${entry.pageSlug}`,
            meta,
            kind: "branch",
            groupSize: entry.groupSize,
            months: entry.months,
          };
        });

        // Grup büyüklüğü/süre tüm şubelerde aynıysa satır satır tekrar etmez,
        // bölüm girişinde BİR kez yazılır (aksi halde satırda kalır).
        const linked = rows.filter((r) => r.kind === "branch");
        const sameGroup = linked.length > 0 && linked.every((r) => r.groupSize === linked[0].groupSize);
        const sameMonths = linked.length > 0 && linked.every((r) => r.months === linked[0].months);
        const leadParts: string[] = [];
        if (sameGroup && linked[0].groupSize !== null) leadParts.push(`${linked[0].groupSize} kişilik gruplar`);
        if (sameMonths && linked[0].months !== null) {
          leadParts.push(`${String(linked[0].months).replace(".", ",")} ay program`);
        }
        for (const r of rows) {
          if (!sameGroup && r.groupSize !== null) r.meta.push(`${r.groupSize} kişilik grup`);
          if (!sameMonths && r.months !== null) r.meta.push(`${String(r.months).replace(".", ",")} ay`);
        }
        return {
          kind: "branchLinks",
          id: "kurs-tarihleri",
          title: clean(b.heading),
          lead: leadParts.join(" · ") || null,
          rows: rows.map(({ label, href, meta, kind }) => ({ label, href, meta, kind })),
        };
      }
      case "structure": {
        const leadTake = b.leadTake === undefined ? [0] : b.leadTake;
        const lead = leadTake === null ? [] : take(b.heading, leadTake, `${slot}/lead`, false);
        const lines = take(b.heading, b.cardsTake ?? "rest", `${slot}/cards`, false);
        if (lines.length !== b.cards.length) {
          throw new ContentSectionsError(
            `${context}/${slot}: ${lines.length} kart satırı var, eşlemede ${b.cards.length} kart.`,
          );
        }
        const sections: ExamSection[] = lines.map((line, j) => {
          const [name, skill] = line.split(/\s+[–-]\s+/, 2);
          const meta = b.cards[j].meta;
          return {
            name: name.trim(),
            skill: skill?.trim() ?? null,
            icon: b.cards[j].icon,
            parts: meta.length > 0 ? [{ title: "", meta }] : [],
          };
        });
        return {
          kind: "structure",
          id: "sinav-yapisi",
          title: clean(b.heading),
          lead: lead.join(" ") || null,
          sections,
          detailAnchor: b.detailAnchor,
        };
      }
      case "merged": {
        const url = `https://www.dunyadillerimerkezi.com/${CATEGORY}/${b.sourcePath}.html`;
        const rec = (siteContent as SiteContentRecord[]).find((r) => r.url === url);
        if (!rec) {
          throw new ContentSectionsError(`${context}/${slot}: kaldırılan sayfa kaydı bulunamadı — ${url}`);
        }
        const pool = new Set(
          rec.text
            .split("\n")
            .map((l) => l.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim())
            .filter(Boolean),
        );
        for (const line of b.lines) {
          if (!pool.has(line)) {
            throw new ContentSectionsError(`${context}/${slot}: satır kaynakta yok — "${line}" (${b.sourcePath})`);
          }
        }
        return { kind: "merged", id: slugifyId(b.title), kicker: b.kicker, title: b.title, items: [...b.lines] };
      }
      case "stats": {
        const lead = take(b.heading, b.leadTake, `${slot}/lead`, false);
        const lines = take(b.heading, b.take, `${slot}/cards`, false);
        if (lines.length % 4 !== 0) {
          throw new ContentSectionsError(
            `${context}/${slot}: istatistik satırları 4'ün katı olmalı (ad, ad, sonuç, sonuç) — ${lines.length} satır.`,
          );
        }
        const cards: FactCard[] = [];
        for (let k = 0; k < lines.length; k += 4) {
          cards.push({ icon: b.icon, label: lines[k], value: lines[k + 2] });
          cards.push({ icon: b.icon, label: lines[k + 1], value: lines[k + 3] });
        }
        return { kind: "stats", id: slugifyId(b.heading), kicker: b.kicker, title: clean(b.heading), lead: lead.join(" ") || null, cards };
      }
      case "universities":
        return { kind: "universities", id: "universiteler" };
      case "drop":
        take(b.heading, b.take, `${slot} (basılmıyor: ${b.reason})`, false);
        return { kind: "drop" };
      case "headingList": {
        const items = b.headings.map((h) => {
          const body = take(h, "all", `${slot}/${h}`, false, true);
          return { label: clean(h), body: body.join(" ") || null };
        });
        return { kind: "headingList", id: slugifyId(b.title), kicker: b.kicker, title: b.title, items };
      }
      case "faq": {
        const items: Faq[] = b.items.map((it, j) => ({
          question: it.question ?? clean(it.heading),
          answer: take(it.heading, "all", `${slot}/items[${j}]`),
          format: it.format ?? "prose",
        }));
        return { kind: "faq", id: b.id ?? "sss", kicker: b.kicker ?? "SIKÇA SORULAN SORULAR", title: b.title, items };
      }
    }
  });

  for (const key of edits.keys()) {
    if (!usedEdits.has(key)) {
      throw new ContentSectionsError(`${context}: kullanılmayan edits girdisi (kaynakta yok ya da tüketilmedi) — "${key}"`);
    }
  }
  for (const key of Object.keys(additions)) {
    if (!usedAdditions.has(key)) {
      throw new ContentSectionsError(`${context}: kullanılmayan additions başlığı — "${key}"`);
    }
  }

  resolver.assertCoverage(def.ignored, context);

  return { def, record, h1, heroLead, blocks, diagnostics };
}
