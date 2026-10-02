/**
 * `site_content.json` gövde metnini `headings[]`e göre bölümlere ayıran
 * jenerik ayrıştırıcı — dile bağlı değildir.
 *
 * Faz 6.4 (Dil Kursu) burayı `lib/languageContent.ts` üstünden kullanıyor;
 * Faz 6.5 (Üniversite) ve 6.6 (Şube Kurs Tarihi) aynı çekirdeği kendi
 * sözleşmeleriyle yeniden kullanacak.
 *
 * TASARIM KURALI (CLAUDE.md §5): gövde metni asla yeniden yazılmaz. Bu dosya
 * satırları TAŞIR, üretmez. `data/languages.ts` gibi eşleme dosyaları yalnız
 * BAŞLIK METNİ taşır — gövde metnini repoya ikinci kez yazmaz (drift riski
 * yapısal olarak yok edilir).
 */

import type { SectionRef } from "@/lib/types";

export type SiteContentRecord = {
  url: string;
  status: number;
  title: string;
  meta_description: string;
  canonical: string;
  headings: { level: string; text: string }[];
  text: string;
};

export type Section = {
  /** null → ilk başlıktan önceki giriş bloğu. */
  heading: string | null;
  paragraphs: string[];
};

/** Build'i düşüren hata — parse kırılması / eşleme çürümesi / kapsama ihlali. */
export class ContentSectionsError extends Error {
  constructor(message: string) {
    super(`[içerik boru hattı] ${message}`);
    this.name = "ContentSectionsError";
  }
}

function normalize(s: string): string {
  return s.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Kaydı başlıklarına göre bölümlere ayırır; başlık sırası ve tekrarları
 * korunur. Aynı başlık metni metinde iki kez geçebilir (ör. Fransızca'nın
 * seviye "dizini" + seviye "detayı" aynı başlığı paylaşıyor) — bu durumda
 * iki ayrı `Section` girdisi üretilir, BİRLEŞTİRİLMEZ. Hangi satırın hangi
 * slota gittiğini paragraf METNİ üzerinden takip eden `SectionResolver`
 * bu yüzden başlık yerine paragraf bazında çalışır (aşağıya bakın).
 */
export function parseRecord(record: SiteContentRecord): Section[] {
  const headingSet = new Set(record.headings.map((h) => normalize(h.text)));
  const lines = record.text
    .split("\n")
    .map(normalize)
    .filter((l) => l.length > 0);

  const sections: Section[] = [{ heading: null, paragraphs: [] }];
  for (const line of lines) {
    if (headingSet.has(line)) {
      sections.push({ heading: line, paragraphs: [] });
    } else {
      sections[sections.length - 1].paragraphs.push(line);
    }
  }
  return sections;
}

function applyTake(paragraphs: string[], take: SectionRef["take"]): string[] {
  if (!take || take === "all") return paragraphs;
  if (take === "first") return paragraphs.slice(0, 1);
  if (take === "rest") return paragraphs.slice(1);
  return take.map((i) => paragraphs[i]).filter((p): p is string => p !== undefined);
}

/**
 * Bir kaydın bölümlenmiş halini tutar ve HER `take()` çağrısında hangi
 * başlığın / hangi paragraf METNİNİN gerçekten kullanıldığını izler.
 *
 * Kapsama iddiası paragraf METNİ üzerinden çalışır (indeks üzerinden değil):
 * aynı başlık metni iki kez geçtiğinde (fr'nin seviye dizini + detayı gibi)
 * bir occurrence'ın tamamı kullanılıp diğerinin bir kısmı `ignored`e
 * düşebilir — bu, "başlık kullanıldı" diye tüm gövdesinin sessizce
 * kapsandığını varsaymaktan çok daha güvenli.
 */
export class SectionResolver {
  private readonly sections: Section[];
  private readonly byHeading: Map<string | null, Section[]>;
  private readonly consumedHeadings = new Set<string | null>();
  private readonly consumedParagraphs = new Set<string>();

  constructor(sections: Section[]) {
    this.sections = sections;
    this.byHeading = new Map();
    for (const s of sections) {
      const list = this.byHeading.get(s.heading) ?? [];
      list.push(s);
      this.byHeading.set(s.heading, list);
    }
  }

  /**
   * Bir `SectionRef`i uygular.
   *
   * - Eşlenmiş başlık kayıtta hiç yoksa → `throw` (parse kırılması / eşleme çürümesi).
   * - `allowEmpty` yoksa (varsayılan) ve 0 paragraf çözerse → `throw` (sessiz boş bölüm YOK).
   * - `allowEmpty: true` ve 0 paragraf çözerse → `null` (ör. İngilizce A2).
   *
   * Aynı başlık birden çok `Section` occurrence'ına sahipse (tekrarlayan
   * başlık), occurrence'ların paragrafları BİRLEŞTİRİLEREK `take` bu
   * birleşik diziye uygulanır — occurrence'lar arasında sıra korunur.
   */
  take(ref: SectionRef, context: string): string[] | null {
    if (ref.heading !== null && !this.byHeading.has(ref.heading)) {
      throw new ContentSectionsError(
        `${context}: eşlenmiş başlık kaynakta bulunamadı — "${ref.heading}"`,
      );
    }
    this.consumedHeadings.add(ref.heading);

    const occurrences = this.byHeading.get(ref.heading) ?? [];
    const merged = occurrences.flatMap((s) => s.paragraphs);
    const paragraphs = applyTake(merged, ref.take);

    if (paragraphs.length === 0) {
      if (ref.allowEmpty) return null;
      throw new ContentSectionsError(
        `${context}: slot 0 paragraf çözdü ve allowEmpty işaretli değil — "${ref.heading ?? "(giriş)"}"`,
      );
    }
    for (const p of paragraphs) this.consumedParagraphs.add(p);
    return paragraphs;
  }

  /**
   * Kapsama iddiası: kaydın HER satırı ya `take()` ile gerçekten tüketilmiş
   * ya da `ignored[]`de açık gerekçeyle dışarıda bırakılmış olmalı. Aksi
   * halde `throw` — içerik sessizce kaybolamaz. Bir başlığın yalnız BİR
   * occurrence'ı kullanılıp diğeri kullanılmadıysa (tekrarlayan başlık),
   * kullanılmayan occurrence'ın paragrafları da bu kontrolden geçer.
   */
  assertCoverage(ignored: string[], context: string): void {
    const ignoredSet = new Set(ignored.map(normalize));
    const uncovered: string[] = [];

    for (const s of this.sections) {
      if (s.heading !== null && !this.consumedHeadings.has(s.heading) && !ignoredSet.has(s.heading)) {
        uncovered.push(`[başlık] ${s.heading}`);
      }
      for (const p of s.paragraphs) {
        if (!this.consumedParagraphs.has(p) && !ignoredSet.has(p)) {
          uncovered.push(p);
        }
      }
    }

    if (uncovered.length > 0) {
      throw new ContentSectionsError(
        `${context}: kapsanmayan satır(lar) var — data/languages.ts eşlemesine ekleyin ` +
          `veya "ignored" listesine gerekçeyle yazın:\n  - ${uncovered.join("\n  - ")}`,
      );
    }
  }
}

/* ---------------------------------------------------------------
 * ddmcadde kaynaklı sayfalar (2026-10-01) — dil + sınav çözücülerinin ortak parçaları
 * ------------------------------------------------------------- */

/** `data/ddmcadde_content.json` kaydı (eski sitede sayfası olmayan dil / sınav; `scripts/pull-ddmcadde.mjs --new`). */
export function findDdmcaddeRecord(slug: string, records: unknown): SiteContentRecord {
  const record = (records as (SiteContentRecord & { slug: string })[]).find((r) => r.slug === slug);
  if (!record) {
    throw new ContentSectionsError(`data/ddmcadde_content.json içinde "${slug}" kaydı yok — node scripts/pull-ddmcadde.mjs --new ${slug}`);
  }
  return record;
}

/** H1 düzeltmesi — kaynak H1 birebir `from` değilse build düşer (düzeltme izlenebilir kalsın). */
export function applyH1Edit(h1: string, edit: { from: string; to: string } | undefined, context: string): string {
  if (!edit) return h1;
  if (h1 !== edit.from) throw new ContentSectionsError(`${context}: h1Edit.from kaynak H1 ile uyuşmuyor — kaynak "${h1}".`);
  return edit.to;
}
