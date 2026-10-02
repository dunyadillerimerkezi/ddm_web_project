/**
 * P3 — hub sayfalarının ortak link yardımcıları (SUNUCU tarafı: `pageRegistry`
 * ağır veri içe aktarır, istemci bileşenine girmemeli).
 *
 * Kural (CLAUDE.md §10 + P3 ölü link kuralı): hub'larda basılan HER iç link
 * `isProducedPage()` süzgecinden geçer; üretilmemiş hedef ya hiç basılmaz ya
 * soluk düz metin olur.
 */

import { BRANCH_LIST } from "@/data/branches";
import { LANGUAGE_SECTION } from "@/data/home";
import { HUB_DIRECTORY } from "@/data/hubs";
import { LANGUAGES, LANGUAGE_PAGES } from "@/data/languages";
import type { LanguageLink, LanguageTileData } from "@/components/sections/HubLanguages";
import { isProducedPage } from "@/lib/pageRegistry";

export const CONTACT_HREF = "/ddm-iletisim";

/** Hedef üretilmişse href, değilse null. */
export function linkIfProduced(href: string): string | null {
  return isProducedPage(href) ? href : null;
}

export function onlyProduced<T extends { href: string }>(links: T[]): T[] {
  return links.filter((l) => isProducedPage(l.href));
}

/**
 * Sayfa sonu "İlgili sayfalar" öbekleri: kardeş hub'lar · sayfaya özgü
 * popüler hedefler · şube iletişim sayfaları.
 */
export function hubRelated(
  currentPath: string,
  popular: { title: string; links: { label: string; href: string }[] },
) {
  const siblings = onlyProduced(HUB_DIRECTORY.filter((h) => h.href !== currentPath));
  const taken = new Set(siblings.map((l) => l.href));
  return [
    { title: "Diğer kategoriler", links: siblings },
    // Kardeş hub'larda zaten olan hedef ikinci kez basılmaz.
    { title: popular.title, links: onlyProduced(popular.links.filter((l) => !taken.has(l.href))) },
    {
      title: "Şubelerimiz",
      links: onlyProduced([
        ...BRANCH_LIST.map((b) => ({ label: `${b.name} Şubesi`, href: b.href })),
        { label: "Tüm şubeler", href: CONTACT_HREF },
      ]),
    },
  ];
}

const languageHref = (slug: string) => `/yabanci-dil-egitimleri/${slug}`;

/**
 * 10 dil (6.4 sayfaları) — bayrak, kod ve selam `data/languages.ts`ten.
 * `label: "short"` → "İngilizce", `"course"` → "İngilizce Kursu".
 */
export function languageLinks(
  label: "short" | "course",
  exclude: string[] = [],
  /** "core": Yabancı Dil hero'sundaki selam duvarı 10 dile göre tasarlandı; "all": sayfası olan tüm diller. */
  set: "all" | "core" = "all",
): LanguageLink[] {
  return (set === "core" ? LANGUAGES : LANGUAGE_PAGES).filter((l) => !exclude.includes(l.slug) && isProducedPage(languageHref(l.slug))).map((l) => ({
    name: label === "short" ? l.name : l.label,
    href: languageHref(l.slug),
    flag: l.flag,
    code: l.code,
    greeting: l.greeting,
  }));
}

/** Dil kartları: `data/languages.ts` + Ana Sayfa dil kartının fotoğrafı ve alt linkleri. */
export function languageTiles(): LanguageTileData[] {
  return LANGUAGES.filter((l) => isProducedPage(languageHref(l.slug))).map((l) => {
    const card = LANGUAGE_SECTION.cards.find((c) => c.href === languageHref(l.slug));
    if (!card) throw new Error(`[hubLinks] data/home.ts LANGUAGE_SECTION'da "${l.slug}" kartı yok.`);
    return {
      name: l.label,
      href: languageHref(l.slug),
      flag: l.flag,
      code: l.code,
      greeting: l.greeting,
      image: { src: card.image.src, alt: `${l.label} — ${card.image.hint}` },
      links: card.links.flatMap((s) => (s.href !== null && isProducedPage(s.href) ? [{ label: s.label, href: s.href }] : [])),
    };
  });
}
