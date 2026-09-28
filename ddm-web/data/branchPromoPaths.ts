import type { BranchSlug } from "@/lib/types";

/**
 * P6 — yayında olan şube tanıtım sayfalarının adresleri. Hafif modül: Ana Sayfa verisi (`data/home.ts`, istemci
 * bileşenlerine de giriyor) ve iletişim sayfası buradan okur; ağır içerik tanımı `data/branchPromo.ts`'te.
 * Yeni şube sayfası yayına girince yalnız buraya satır eklenir (tanım `branchPromo.ts`'te bu adresle eşleşmek zorunda).
 * Ümraniye: kaynakta tanıtım kaydı yok — kullanıcıdan bilgi gelince eklenecek.
 */
export const PROMO_PATHS: Partial<Record<BranchSlug, string>> = {
  kadikoy: "/kadikoy-tanitim-sayfasi",
  bagdat: "/cadde-tanitim-sayfasi",
  etiler: "/levent-tanitim-sayfasi",
  atasehir: "/atasehir-tanitim-sayfasi",
};
