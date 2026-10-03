/**
 * Sayfa metadata yardımcıları — tek kaynak (CLAUDE.md §6). Ağır içerik modüllerine bağlı değil: yalnız marka adı
 * ve hata tipi; şube / Ana Sayfa gibi hafif sayfalar da içe aktarabilir.
 */

import { BRAND_NAME } from "@/data/company";
import { ContentSectionsError } from "@/lib/contentSections";

const TITLE_MAX = 60;
const DESCRIPTION_MAX = 155;

export function norm(s: string): string {
  return s.replace(/ /g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Sayfa başlığı: `meta.title` ya da kaynak başlık; `meta.brandSuffix` varsa sonuna " | Dünya Dilleri Merkezi"
 * (`data/company.ts` `BRAND_SUFFIX_REASON`). Markası zaten geçen başlığa ek konmaz.
 */
export function metaTitle(meta: { title?: string; brandSuffix?: true } | undefined, sourceTitle: string, context: string): string {
  const base = norm(meta?.title ?? sourceTitle);
  if (!meta?.brandSuffix) return base;
  if (base.includes(BRAND_NAME)) throw new ContentSectionsError(`${context}: brandSuffix — başlıkta marka zaten var: "${base}"`);
  return `${base} | ${BRAND_NAME}`;
}

/** title / description uzunluk bekçisi (CLAUDE.md §6 — sessizce kesilmez). Boş dize = o alan denetlenmez. */
export function checkMeta(title: string, description: string, context: string): void {
  if (title.length > TITLE_MAX) throw new ContentSectionsError(`${context}: title ${title.length} karakter (≤${TITLE_MAX}).`);
  if (description.length > DESCRIPTION_MAX) {
    throw new ContentSectionsError(`${context}: description ${description.length} karakter (≤${DESCRIPTION_MAX}).`);
  }
}

/** Metadata düzeltmesi (`from` → `to`); `from` sayfada görünen değerle uyuşmazsa build düşer (`applyH1Edit` deseni). */
export function applyMetaEdit(value: string, edit: { from: string; to: string } | undefined, context: string): string {
  if (!edit) return value;
  if (value !== edit.from) throw new ContentSectionsError(`${context}: from sayfadaki değerle uyuşmuyor — sayfada "${value}".`);
  return edit.to;
}
