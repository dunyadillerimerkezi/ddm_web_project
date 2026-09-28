import type { BranchSlug } from "@/lib/types";

/**
 * Şubelerin semt fotoğrafları — tek kaynak (Ana Sayfa şube kartları, P6 tanıtım künyesi, iletişim sayfaları).
 * Şubenin kendisi değil, bulunduğu semt; şube iç mekân fotoğrafları (`sube-1..5.jpeg`) kullanıcıdan eşleştirme
 * bekliyor (docs/bekleyen-sorular.md). Hafif modül: Ana Sayfa verisi istemci bileşenlerine de giriyor.
 */
export type BranchPhoto = { src: string; alt: string; width: number; height: number; position?: string };

export const BRANCH_PHOTOS: Record<BranchSlug, BranchPhoto> = {
  kadikoy: { src: "/assets/kadikoy.jpg", alt: "Kadıköy iskelesi ve vapur, gün batımı", width: 1200, height: 1493, position: "center 58%" },
  bagdat: { src: "/assets/bagdat-caddesi.jpg", alt: "Ağaçlı Bağdat Caddesi", width: 1400, height: 788 },
  etiler: { src: "/assets/levent.jpg", alt: "Levent gökdelenleri, gün batımı", width: 964, height: 1200, position: "center 45%" },
  atasehir: { src: "/assets/atasehir.jpg", alt: "Gece Ataşehir silueti", width: 735, height: 471 },
  umraniye: { src: "/assets/umraniye.jpg", alt: "Ümraniye saat kulesi", width: 900, height: 1200, position: "center 40%" },
};
