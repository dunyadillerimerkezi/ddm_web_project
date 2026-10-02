/**
 * Faz 6.4 — Dil Kursu sayfası içerik sözleşmesi.
 *
 * `lib/contentSections.ts`in jenerik ayrıştırıcısını `data/languages.ts`teki
 * başlık eşlemesine uygulayıp sayfanın render edeceği `LanguagePage` modelini
 * üretir. Gövde metni burada YOKTUR — yalnız `data/languages.ts`teki başlık
 * referansları ve `site_content.json`daki gerçek metin arasında köprü kurar.
 *
 * 2026-09 içerik yeniden yazımından sonra 10 dilin de metni ortak bir bölüm
 * iskeletine oturdu (bkz. plan §1, roller A–K). Bu dosya o rolleri çözer:
 *
 *   A heroLead        — H1'in kendi giriş cümlesi
 *   B about           — "… Eğitim Programı Hakkında Bilgi" (2 paragraf)
 *   C programSchedule — "Size Uygun … Ders Programını Seçin" (5 satır, her zaman var)
 *   D certification   — "… Sertifika(ları) ve Uluslararası Sınavlar" (opsiyonel)
 *   E whyLearn        — "Neden … Öğrenmelisiniz?" (opsiyonel)
 *   F whyChooseDDM    — "Neden Dünya Dilleri Merkezi'ni Tercih Et…" (her zaman var)
 *   G levelGroups     — 3×h3 CEFR grubu (opsiyonel, yalnız 6 dilde)
 *   H whoCanJoin      — "… Kurslarımıza Kimler Katılabilir?" (opsiyonel)
 *   I teachingModel   — "… Derslerinde Eğitim Modelimiz" (her zaman var; kapanış
 *                        CTA cümlesi son satır — alt CTA bandında ayrıca kullanılır)
 *   J pricing         — "… Kurs ve Özel Ders Fiyatları" (eski sitenin 10 dilinde var; basılmaz)
 *   K branchLinks     — "… Eğitim Plan Tablosu ve Kurs Tarihleri" (opsiyonel;
 *                        şube satırları + varsa kardeş sayfa linkleri)
 *
 * TASARIM KURALI (CLAUDE.md §5): her `getLanguagePage()` çağrısı build
 * zamanında çalışır; eşleme çürümüşse veya bir satır sessizce kayboluyorsa
 * `throw` ile build'i düşürür (bkz. `SectionResolver.assertCoverage`).
 */

import siteContent from "@/data/site_content.json";
import ddmcaddeContent from "@/data/ddmcadde_content.json";
import {
  SectionResolver,
  ContentSectionsError,
  applyH1Edit,
  findDdmcaddeRecord,
  parseRecord,
  type SiteContentRecord,
} from "@/lib/contentSections";
import type {
  BulletBlock,
  LevelGroup,
  LinkRowItem,
  PricingBlock,
  SectionRef,
} from "@/lib/types";
import type { FlagCode } from "@/components/graphics/Flag";
import { currentBranchName } from "@/data/branches";
import { FOUNDING_EDIT, yearsSinceFounding } from "@/data/company";

/* ---------------------------------------------------------------
 * Dil sözleşmesi
 * ------------------------------------------------------------- */

export const LANGUAGE_SLUGS = [
  "ingilizce-kursu",
  "almanca-kursu",
  "fransizca-kursu",
  "italyanca-kursu",
  "ispanyolca-kursu",
  "rusca-kursu",
  "cince-kursu",
  "flemenkce-kursu",
  "yabancila-icin-turkce-kurs",
  "ingilizce-konusma-kursu",
  // Eski sitede sayfası olmayan diller (2026-10-01) — kaynak `data/ddmcadde_content.json`.
  "japonca-kursu",
  "korece-kursu",
  "yunanca-kursu",
  "bulgarca-kursu",
  "isvecce-kursu",
] as const;

export type LanguageSlug = (typeof LANGUAGE_SLUGS)[number];

/**
 * İllüstrasyon motifi anahtarı — `.dc.html`in `illoDefs()` kaydındaki 10 dil
 * anahtarı. `components/graphics/Illustration.tsx`in `ILLUSTRATIONS` kaydı
 * Adım 1'de bu birlik ile hizalanacak (bkz. plan §7).
 */
export const LANGUAGE_KEYS = ["en", "de", "fr", "it", "es", "ru", "zh", "nl", "tr", "speak", "ja", "ko", "el", "bg", "sv"] as const;
export type LanguageKey = (typeof LANGUAGE_KEYS)[number];

/* ---------------------------------------------------------------
 * Rol referansları (A–K)
 * ------------------------------------------------------------- */

export type LevelGroupRef = {
  /** "Beginner" · "Anfängerniveau" · "Livello Principiante" — kaynaktan birebir. */
  name: string;
  /** "A1 – A2" */
  range: string;
  /** h3 başlığının TAM metni: "Beginner (A1 – A2)" gibi — SectionResolver bunu arar. */
  heading: string;
};

/** Giriş cümlesi + madde listesi bloğu (F/H). */
export type BulletRefBlock = {
  heading: string;
  /** null → başlığın TÜM satırları madde (H — giriş cümlesi yok).
   *  Varsayılan `[0]` → ilk satır giriş, geri kalanı `itemsTake` ile (F). */
  introTake?: SectionRef["take"] | null;
  /** Varsayılan: introTake null ise "all", değilse "rest". */
  itemsTake?: SectionRef["take"];
};

/** Eğitim modeli (I) — TÜM satırlar sırayla: [giriş, ...maddeler, kapanış CTA].
 *  Madde sayısı dile göre değişiyor (4 veya 5) → sabit indeks yerine dizinin
 *  baş/son elemanları kullanılır. */
export type TeachingModelRef = { heading: string };

export type PricingRefBlock = {
  heading: string;
  /** Fiyat satırlarının indeksleri — 10 dilde de [0, 1]. */
  planIndexes: number[];
  /** KDV/şube notu satırlarının indeksleri — 10 dilde de [2, 3]. */
  noteIndexes: number[];
};

/** Kardeş sayfa linki — K başlığı altında şube adı GEÇMEYEN satırlar
 *  (ör. "Hızlandırılmış Almanca Kursu"). Href elle doğrulanmış, uydurulmaz. */
export type ExtraLinkRef = { label: string; href: string | null };

/**
 * Şube kurs takvimi bloğu (K). Kaynak satırındaki şube adı dile göre baştaki/
 * ortadaki konumda değişir — bu yüzden konuma değil BRANCH_LABELS eşleşmesine
 * bakılır (bkz. `extractBranchLabel`). `branchHrefs` bulunan şube satırlarıyla
 * AYNI SIRADA olmalı; `extraLinks` şube-dışı satırlarla aynı sırada.
 */
export type BranchBlockRef = {
  heading: string;
  branchHrefs: (string | null)[];
  extraLinks?: ExtraLinkRef[];
};

/** Bir dilin `site_content.json` başlıklarına giden TÜM eşlemesi. */
export type LanguageContentMap = {
  heroLead: SectionRef; // A
  about: SectionRef; // B
  programSchedule: { heading: string }; // C — her zaman var
  certification: SectionRef | null; // D
  whyLearn: SectionRef | null; // E
  whyChooseDDM: BulletRefBlock; // F — her zaman var
  levelGroups: LevelGroupRef[]; // G — [] → bölüm düşer
  /** G'nin kendi giriş başlığı ("… Kur Program(ı) İçeriği Nedir?") — kaynakta
   *  gerçek bir başlık ama altında gövde yok (hemen h3 grupları başlıyor).
   *  Bölüm 5 kicker/title'ı için birebir kullanılır, uydurulmaz. G yoksa null. */
  levelGroupsHeading: string | null;
  whoCanJoin: BulletRefBlock | null; // H
  teachingModel: TeachingModelRef; // I — her zaman var
  /** J — eski sitenin 10 dilinde var; ddmcadde kaynaklı dillerde fiyat bölümü kaynağa hiç alınmadı → null. */
  pricing: PricingRefBlock | null;
  branchLinks: BranchBlockRef | null; // K

  /**
   * Metnin kaynağı. Varsayılan: eski sitenin crawl'ı (`site_content.json`). "ddmcadde": eski sitede sayfası
   * olmayan dil — Bağdat Caddesi şubesinin sitesinden `scripts/pull-ddmcadde.mjs --new` ile çekilen
   * `data/ddmcadde_content.json` (kullanıcı, 2026-10-01: "firma hakkında bilgi varsa fiyat dışında koyabilirsin").
   * Kapsama denetimi (`assertCoverage`) bu kaynakta da aynen çalışır.
   */
  source?: "ddmcadde";
  /** H1 düzeltmesi (kaynak H1 birebir `from` olmalı, yoksa build düşer). */
  h1Edit?: { from: string; to: string; reason: string };
  /** `about`a eklenen başka bölümden satırlar (ör. sertifika başlığı altındaki "Konuşma odaklı…" paragrafı). */
  aboutAlso?: SectionRef;
  /** Kaynağı olmayan ya da kaynaktaki zayıf başlık/açıklama yerine yazılan metadata (gerekçe `reasons`). */
  meta?: { title: string; description: string; reasons: string[] };

  /** Kapsama iddiası için: bilinçli olarak sayfaya alınmayan satırlar + gerekçe
   *  (ör. İngilizce kaydındaki ara-hal artıkları — bkz. data/languages.ts). */
  ignored: string[];
  /**
   * Bariz kopyala-yapıştır hatalarının düzeltmesi — kaynak satırın TAMAMI →
   * düzeltilmiş hali (kullanıcı onayıyla; CLAUDE.md §5). Kaynakta karşılığı
   * kalmayan anahtar build'i düşürür, düzeltme izlenebilir kalır.
   */
  edits?: Record<string, string>;
};

export type LanguageDef = {
  slug: LanguageSlug;
  /** Illüstrasyon + illoDefs() motif anahtarı. */
  key: LanguageKey;
  /** "İtalyanca" — başlık kalıplarında kullanılır. */
  name: string;
  /** "İtalyanca Kursu" — kırıntı/kart başlığı. */
  label: string;
  /** Hero rozeti: "IT". */
  code: string;
  /** en→"gb", zh→"cn", speak→null — TÜRETİLMEZ, elle atanır. */
  flag: FlagCode | null;
  greeting: string;
  skill: string;
  /** "A1 → C2" — kaynakta CEFR ölçeği geçmiyorsa null. */
  scaleChip: string | null;
  /** Kaynakta yazılı "toplam N kurdan" — yoksa null (§5, uydurulmaz). */
  kurCount: number | null;
  /** Kaynakta yazılı "N saat sürmektedir" — yoksa null. */
  kurHours: number | null;
  /** Kaynakta yazılı grup büyüklüğü — yoksa null. */
  groupSize: number | null;
  content: LanguageContentMap;
};

/* ---------------------------------------------------------------
 * Sayfa modeli (parse edilmiş hali)
 * ------------------------------------------------------------- */

export type LanguagePageDiagnostic = {
  kind: "h1-fallback";
  detail: string;
};

export type TeachingModel = {
  intro: string;
  items: string[];
  closingCta: string;
};

export type BranchLinks = {
  branch: LinkRowItem[];
  extra: LinkRowItem[];
};

export type LanguagePage = {
  def: LanguageDef;
  record: SiteContentRecord;
  h1: string;
  heroLead: string[];
  about: string[];
  programSchedule: string[];
  certification: string[] | null;
  whyLearn: string[] | null;
  whyChooseDDM: BulletBlock;
  levelGroups: LevelGroup[];
  levelGroupsHeading: string | null;
  whoCanJoin: BulletBlock | null;
  teachingModel: TeachingModel;
  pricing: PricingBlock | null;
  branchLinks: BranchLinks | null;
  diagnostics: LanguagePageDiagnostic[];
};

/* ---------------------------------------------------------------
 * Yardımcılar
 * ------------------------------------------------------------- */

const BRANCH_LABELS = ["Kadıköy", "Bağdat Caddesi", "Beşiktaş", "Etiler", "Ataşehir", "Ümraniye"];

function isBranchLine(line: string): boolean {
  return BRANCH_LABELS.some((b) => line.includes(b));
}

function findRecord(def: LanguageDef): SiteContentRecord {
  if (def.content.source === "ddmcadde") return findDdmcaddeRecord(def.slug, ddmcaddeContent);
  const url = `https://www.dunyadillerimerkezi.com/yabanci-dil-egitimleri/${def.slug}.html`;
  const record = (siteContent as SiteContentRecord[]).find((r) => r.url === url);
  if (!record) {
    throw new ContentSectionsError(`data/site_content.json içinde "${url}" kaydı bulunamadı.`);
  }
  return record;
}

function resolveBulletBlock(
  resolver: SectionResolver,
  ref: BulletRefBlock,
  context: string,
): BulletBlock {
  if (ref.introTake === null) {
    const items = resolver.take({ heading: ref.heading, take: ref.itemsTake ?? "all" }, `${context}.items`) ?? [];
    return { title: ref.heading, intro: null, items };
  }
  const introTake = ref.introTake ?? [0];
  const itemsTake = ref.itemsTake ?? "rest";
  const introLines = resolver.take({ heading: ref.heading, take: introTake }, `${context}.intro`) ?? [];
  const items = resolver.take({ heading: ref.heading, take: itemsTake }, `${context}.items`) ?? [];
  return { title: ref.heading, intro: introLines.join(" "), items };
}

/* ---------------------------------------------------------------
 * Ana giriş noktası
 * ------------------------------------------------------------- */

export function getLanguagePage(def: LanguageDef): LanguagePage {
  const record = findRecord(def);
  const context = def.slug;
  const sections = parseRecord(record);
  const resolver = new SectionResolver(sections);
  const c = def.content;

  const diagnostics: LanguagePageDiagnostic[] = [];

  // H1 — CLAUDE.md §6: yoksa title'a düş, sessizce atlama.
  const h1Heading = record.headings.find((h) => h.level === "h1");
  const h1 = applyH1Edit(h1Heading?.text ?? record.title, c.h1Edit, def.slug);
  if (!h1Heading) {
    diagnostics.push({ kind: "h1-fallback", detail: `${def.slug}: h1 kaynakta yok, title'a düşüldü` });
    console.warn(`[Faz 6.4] ${def.slug}: H1 eksik — title'a düşüldü.`);
  }

  // A
  const heroLead = resolver.take(c.heroLead, `${context}/heroLead`) ?? [];

  // B (+ başka bölümden eklenen satırlar)
  const about = [
    ...(resolver.take(c.about, `${context}/about`) ?? []),
    ...(c.aboutAlso ? (resolver.take(c.aboutAlso, `${context}/aboutAlso`) ?? []) : []),
  ];

  // C — her zaman var
  const programSchedule =
    resolver.take({ heading: c.programSchedule.heading }, `${context}/programSchedule`) ?? [];

  // D
  const certification = c.certification ? resolver.take(c.certification, `${context}/certification`) : null;

  // E
  const whyLearn = c.whyLearn ? resolver.take(c.whyLearn, `${context}/whyLearn`) : null;

  // F — her zaman var
  const whyChooseDDM = resolveBulletBlock(resolver, c.whyChooseDDM, `${context}/whyChooseDDM`);

  // G
  const levelGroups: LevelGroup[] = c.levelGroups.map((lg, i) => {
    const lines = resolver.take({ heading: lg.heading }, `${context}/levelGroups[${i}]`) ?? [];
    if (lines.length < 2) {
      throw new ContentSectionsError(
        `${context}/levelGroups[${i}]: "${lg.heading}" en az 1 giriş + 1 madde bekliyor, ${lines.length} satır bulundu.`,
      );
    }
    return { name: lg.name, range: lg.range, intro: lines[0], items: lines.slice(1) };
  });
  if (c.levelGroupsHeading) {
    resolver.take({ heading: c.levelGroupsHeading, allowEmpty: true }, `${context}/levelGroupsHeading`);
  }

  // H
  const whoCanJoin = c.whoCanJoin ? resolveBulletBlock(resolver, c.whoCanJoin, `${context}/whoCanJoin`) : null;

  // I — her zaman var: [giriş, ...maddeler, kapanış CTA]
  const teachingModelLines =
    resolver.take({ heading: c.teachingModel.heading }, `${context}/teachingModel`) ?? [];
  if (teachingModelLines.length < 3) {
    throw new ContentSectionsError(
      `${context}/teachingModel: en az giriş+1 madde+kapanış (3 satır) bekleniyor, ${teachingModelLines.length} bulundu.`,
    );
  }
  const teachingModel: TeachingModel = {
    intro: teachingModelLines[0],
    items: teachingModelLines.slice(1, -1),
    closingCta: teachingModelLines[teachingModelLines.length - 1],
  };

  // J — sayfada basılmaz (kullanıcı kararı 2026-09-24); kapsama için okunur. ddmcadde kaynaklı dillerde yok.
  let pricing: PricingBlock | null = null;
  if (c.pricing) {
    const planLines =
      resolver.take({ heading: c.pricing.heading, take: c.pricing.planIndexes }, `${context}/pricing.plans`) ?? [];
    const noteLines =
      resolver.take({ heading: c.pricing.heading, take: c.pricing.noteIndexes }, `${context}/pricing.notes`) ?? [];
    pricing = {
      title: c.pricing.heading,
      plans: planLines.map((line) => {
        const at = line.lastIndexOf(":");
        return at === -1 ? { label: line, price: "" } : { label: line.slice(0, at).trim(), price: line.slice(at + 1).trim() };
      }),
      notes: noteLines,
    };
  }

  // K
  let branchLinks: BranchLinks | null = null;
  if (c.branchLinks) {
    const bl = c.branchLinks;
    const allLines = resolver.take({ heading: bl.heading }, `${context}/branchLinks`) ?? [];
    const branchLines = allLines.filter(isBranchLine);
    const extraLines = allLines.filter((l) => !isBranchLine(l));

    if (branchLines.length !== bl.branchHrefs.length) {
      throw new ContentSectionsError(
        `${context}/branchLinks: ${branchLines.length} şube satırı bulundu, branchHrefs ${bl.branchHrefs.length} girdi taşıyor.`,
      );
    }
    const extraRefs = bl.extraLinks ?? [];
    if (extraLines.length !== extraRefs.length) {
      throw new ContentSectionsError(
        `${context}/branchLinks: ${extraLines.length} şube-dışı satır bulundu (${extraLines.join(" | ")}), ` +
          `extraLinks eşlemesi ${extraRefs.length} girdi taşıyor — data/languages.ts'i güncelleyin.`,
      );
    }
    extraLines.forEach((line, i) => {
      if (line !== extraRefs[i].label) {
        throw new ContentSectionsError(
          `${context}/branchLinks: extraLinks[${i}] etiketi kaynakla uyuşmuyor — beklenen "${line}", eşlemede "${extraRefs[i].label}".`,
        );
      }
    });

    branchLinks = {
      // Etiket kaynaktan; bayat şube adı ("Beşiktaş Şubesi") bugünkü adına çevrilir (`data/branches.ts`).
      branch: branchLines.map((line, i) => ({ label: currentBranchName(line), href: bl.branchHrefs[i] })),
      extra: extraRefs.map((ref) => ({ label: ref.label, href: ref.href })),
    };
  }

  resolver.assertCoverage(c.ignored, context);

  // Onaylı düzeltmeler — yalnız birebir eşleşen satıra uygulanır.
  const edits = c.edits ?? {};
  const used = new Set<string>();
  const fix = (line: string): string => {
    if (line in edits) {
      used.add(line);
      return edits[line];
    }
    return line;
  };
  whyChooseDDM.items = whyChooseDDM.items.map(fix);
  // Müşteri kararı 2026-09-30 + kullanıcı 2026-10-01: "25 yıllık" → "2003’ten bu yana 23 yıllık" (`data/company.ts`).
  if (whyChooseDDM.intro !== null) {
    if (!whyChooseDDM.intro.includes(FOUNDING_EDIT.from)) {
      throw new ContentSectionsError(`${context}/whyChooseDDM: girişte "${FOUNDING_EDIT.from}" yok — data/company.ts FOUNDING_EDIT'i güncelleyin.`);
    }
    whyChooseDDM.intro = whyChooseDDM.intro.replace(FOUNDING_EDIT.from, FOUNDING_EDIT.to);
    const stale = [...whyChooseDDM.intro.matchAll(/(\d+)\s*yıl(?:lık|ı aşkın)/g)].find((m) => Number(m[1]) !== yearsSinceFounding());
    if (stale) {
      throw new ContentSectionsError(`${context}/whyChooseDDM: girişte kuruluş yılıyla uyuşmayan yıl sayısı var — "${stale[0]}"`);
    }
  }
  const fixedAbout = about.map(fix);
  const fixedCertification = certification?.map(fix) ?? null;
  const fixedWhyLearn = whyLearn?.map(fix) ?? null;
  teachingModel.items = teachingModel.items.map(fix);
  teachingModel.closingCta = fix(teachingModel.closingCta);
  const unused = Object.keys(edits).filter((k) => !used.has(k));
  if (unused.length > 0) {
    throw new ContentSectionsError(
      `${context}: edits anahtarı kaynakta bulunamadı — ${unused.map((k) => `"${k}"`).join(", ")}. data/languages.ts'i güncelleyin.`,
    );
  }

  return {
    def,
    record,
    h1,
    heroLead,
    about: fixedAbout,
    programSchedule,
    certification: fixedCertification,
    whyLearn: fixedWhyLearn,
    whyChooseDDM,
    levelGroups,
    levelGroupsHeading: c.levelGroupsHeading,
    whoCanJoin,
    teachingModel,
    pricing,
    branchLinks,
    diagnostics,
  };
}
