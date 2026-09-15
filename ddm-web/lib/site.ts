/**
 * Tek domain kaynağı. Absolute URL sadece sitemap/canonical/Open Graph gibi
 * yerlerde gerekir; oralarda da doğrudan `https://...` yazmak yerine bu
 * dosyadan geçilir. Domain değişirse yalnızca NEXT_PUBLIC_SITE_URL güncellenir.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

/** `/yabanci-dil-egitimleri/ingilizce-kursu` -> `https://.../yabanci-dil-egitimleri/ingilizce-kursu` */
export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
