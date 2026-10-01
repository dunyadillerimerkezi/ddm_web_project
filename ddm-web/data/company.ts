/**
 * Kurum olguları — tek kaynak.
 *
 * MÜŞTERİ KARARI 2026-09-30 ("2003'ten bugüne - 23 yıl") + kullanıcı (2026-10-01): kurum 2003'te kuruldu; TÜM şubeler
 * için aynı ifade kullanılır — "2003’ten bu yana, 23 yıldır" (şubeler 2003'te açılmadı, ama kurucu 2003'ten beri bu işi
 * yapıyor). Kaynaktaki "25 yıllık", "25 yılı aşkın", "18 / 13 yıllık tecrübe", Ümraniye "15 yıllık", Bağdat Caddesi
 * "20 yıldır" ifadelerinin hepsi bu kalıba çevrildi. Yıl sayısı ELLE YAZILMAZ: kuruluş yılından hesaplanır (aşağıda).
 */
export const FOUNDED_YEAR = 2003;

/** Kuruluştan bugüne geçen yıl. Sayfalar statik üretildiği için değer build gününe aittir (2026 → 23). */
export function yearsSinceFounding(now: Date = new Date()): number {
  return now.getFullYear() - FOUNDED_YEAR;
}

/** "2003’ten bu yana" */
export const SINCE_FOUNDING = `${FOUNDED_YEAR}’ten bu yana`;
/** "2003’ten bu yana 23 yıllık" — "… deneyim / tecrübe" önüne. */
export const EXPERIENCE = `${SINCE_FOUNDING} ${yearsSinceFounding()} yıllık`;
/** "2003’ten bu yana 23 yıldır" — "… hizmet veriyor" önüne. */
export const SERVING = `${SINCE_FOUNDING} ${yearsSinceFounding()} yıldır`;

/**
 * Dil kursu sayfalarının "Neden DDM" giriş cümlesindeki ifade (10 sayfada aynı) → düzeltilmiş hâli.
 * `lib/languageContent.ts` uygular; ifade bir sayfada bulunmazsa ya da girişte başka bir "… yıllık" kalırsa build düşer.
 */
export const FOUNDING_EDIT = {
  from: "25 yıllık deneyim ve tecrübemiz",
  to: `${EXPERIENCE} deneyim ve tecrübemiz`,
} as const;
