/**
 * Sayfa metadata yardımcıları — tek kaynak (CLAUDE.md §6). Ağır içerik modüllerine bağlı değil: yalnız marka adı
 * ve hata tipi; şube / Ana Sayfa gibi hafif sayfalar da içe aktarabilir.
 */

import type { Metadata } from "next";

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

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_ALT = `${BRAND_NAME} logosu ve sayfa başlığı`;

/**
 * Sayfanın paylaşım görseli — en yakın `opengraph-image` dosyasının adresi. Next dosya görselini yalnız o segmentin
 * KENDİ sayfasına basar; alt sayfa kendi `openGraph`ını verince üstteki görsel düşer (P9'da IELTS Nedir / kurs tarihi
 * görselsiz çıktı). Klasör haritası `app/` ile aynı olmalı — `scripts/check-metadata.mjs` her og:image dosyasını arar.
 */
export function ogImagePath(path: string): string {
  const [cat, seg, sub] = path.split("/").filter(Boolean);
  if ((cat === "yabanci-dil-egitimleri" || cat === "sinav-hazirlik-egitimleri") && seg) {
    // Proficiency: statik klasör + `[sayfa]` (üniversite, kurs tarihi, rehber — hepsinin kendi görseli var).
    if (seg === "proficiency-kursu") return `/${cat}/${seg}${sub ? `/${sub}` : ""}/opengraph-image`;
    return `/${cat}/${seg}/opengraph-image`;
  }
  if (cat === "ddm-iletisim" && seg) return `/${cat}/${seg}/opengraph-image`;
  if (cat === "yurtdisi-egitim") return "/yurtdisi-egitim/opengraph-image";
  return "/opengraph-image";
}

/**
 * P9 — paylaşım önizlemesi (Open Graph + X kartı). Next metadata'yı segmentler arasında SIĞ birleştirir: bir sayfa
 * `openGraph` vermezse layout'unkini olduğu gibi alır (başlığı dahil) — bu yüzden her sayfa kendi başlık / açıklama /
 * asıl adresini buradan paylaşım alanlarına da geçirir. Görsel dosya kuralıyla gelir (`app/…/opengraph-image.tsx`).
 */
export function withSocial(meta: { title: string; description: string; alternates: { canonical: string } }): Metadata {
  const { title, description } = meta;
  const url = meta.alternates.canonical;
  const images = [{ url: ogImagePath(new URL(url).pathname), ...OG_SIZE, alt: OG_ALT, type: "image/png" }];
  return {
    ...meta,
    openGraph: { type: "website", siteName: BRAND_NAME, locale: "tr_TR", title, description, url, images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}
