/**
 * P4 — Zengin İçerik sayfalarının tek listesi (tüm alt türler) + dağıtıcı
 * yardımcıları. Üç route (`yabanci-dil-egitimleri/[kurs]/[sayfa]`,
 * `sinav-hazirlik-egitimleri/[kurs]/[sayfa]`, `proficiency-kursu/[sayfa]`)
 * alt türü bilmeden buradan sorar; yeni alt tür yalnız `ENTRIES`e eklenir.
 */

import type { Metadata } from "next";

import { ONLINE_HUB, ONLINE_LESSONS } from "@/data/onlineLessons";
import { PRIVATE_LESSONS } from "@/data/privateLessons";
import { ContentSectionsError } from "@/lib/contentSections";
import { getOnlineHubPage, getOnlineLessonPage } from "@/lib/onlineContent";
import { getPrivateLessonPage, type RichPage } from "@/lib/richContent";
import { absoluteUrl } from "@/lib/site";

const ENTRIES: { path: string; build: () => RichPage }[] = [
  ...PRIVATE_LESSONS.map((d) => ({ path: d.path, build: () => getPrivateLessonPage(d) })),
  ...ONLINE_LESSONS.map((d) => ({ path: d.path, build: () => getOnlineLessonPage(d) })),
  { path: ONLINE_HUB.path, build: () => getOnlineHubPage(ONLINE_HUB) },
];

const BY_PATH = new Map<string, () => RichPage>();
for (const e of ENTRIES) {
  if (BY_PATH.has(e.path)) throw new ContentSectionsError(`[richPages] "${e.path}" iki alt türde birden tanımlı.`);
  BY_PATH.set(e.path, e.build);
}

export function getRichPage(path: string): RichPage | undefined {
  return BY_PATH.get(path)?.();
}

/**
 * `prefix` altındaki zengin içerik sayfalarının kalan yol parçaları
 * (ör. "/yabanci-dil-egitimleri/" → ["almanca-kursu", "almanca-ozel-ders"]).
 * `excludeFolder`: kendi statik klasöründe dağıtılan alt ağaç (proficiency).
 */
export function richPathsUnder(prefix: string, excludeFolder?: string): string[][] {
  return ENTRIES.filter(
    (e) => e.path.startsWith(prefix) && !(excludeFolder && e.path.startsWith(`${prefix}${excludeFolder}/`)),
  ).map((e) => e.path.slice(prefix.length).split("/"));
}

/** Aynı segmentte iki tip aynı slug'ı üretirse build düşer (sessizce biri kazanmaz). */
export function assertNoSlugCollision(route: string, rich: string[], others: string[]): void {
  const taken = new Set(others);
  const hit = rich.find((k) => taken.has(k));
  if (hit) throw new ContentSectionsError(`[${route}] "${hit}" hem zengin içerik hem başka bir sayfa tipi.`);
}

/** Zengin içerik sayfasının metadata'sı (CLAUDE.md §6). */
export function richMetadata(page: RichPage): Metadata {
  return { title: page.title, description: page.description, alternates: { canonical: absoluteUrl(page.href) } };
}

/** Üretilen tüm zengin içerik yolları (`lib/pageRegistry.ts`). */
export const RICH_PATHS: string[] = ENTRIES.map((e) => e.path);
