import type { BranchSlug } from "@/lib/types";

/**
 * Şubelere toplu taşımayla ulaşım — GENEL BİLGİ (kaynak sitede yok). Tanıtım (P6) ve iletişim sayfaları ortak kullanır.
 *
 * Doğrulama (2026-09-28): metro.istanbul HatDetay (M2, M4, M5, M6, M8, T3), sehirhatlari.istanbul/tr/iskeleler,
 * Suadiye istasyonu (Marmaray), OpenStreetMap ölçümü. Mesafeler KUŞ UÇUŞU (sayfada böyle yazar); yürüme süresi yazılmaz.
 * Yazılmayanlar: otobüs / metrobüs hat numaraları (İETT'den doğrulanamadı), M12 Göztepe–Ümraniye (yapımda, 2026 sonu
 * hedefleniyor), Bağdat Caddesi'ne yürüme mesafesinde iskele (doğrulanamadı), Ataşehir Finans Merkezi (~2,4 km — "yakın" değil).
 * Ataşehir: kapı numarası haritada yok, ölçüm Girne Cad. noktasından (orta güven); eski sitenin harita işaretçisi yanlış
 * yeri (Maltepe) gösteriyordu — kullanılmadı.
 */
export type TransitMode = "metro" | "tramvay" | "vapur" | "marmaray";
/** `code`: yalnız resmi hat kodu (M4, T3); kodu olmayan ulaşımda (vapur, Marmaray) ikon gösterilir. */
export type TransitItem = { mode: TransitMode; code?: string; name: string; distance: string; note?: string };

export const BRANCH_TRANSIT: Record<BranchSlug, TransitItem[]> = {
  kadikoy: [
    { mode: "metro", code: "M4", name: "Kadıköy metro istasyonu", distance: "yaklaşık 200 m", note: "Kadıköy – Sabiha Gökçen Havalimanı hattı" },
    { mode: "tramvay", code: "T3", name: "Kadıköy İDO tramvay durağı", distance: "yaklaşık 140 m", note: "Kadıköy – Moda hattı" },
    { mode: "vapur", name: "Kadıköy iskelesi", distance: "yaklaşık 450 m", note: "Karaköy, Eminönü ve Beşiktaş seferleri" },
    { mode: "marmaray", name: "Söğütlüçeşme (Marmaray ve Metrobüs)", distance: "yaklaşık 1,25 km" },
  ],
  bagdat: [
    { mode: "marmaray", name: "Suadiye Marmaray istasyonu", distance: "yaklaşık 670 m" },
    { mode: "metro", code: "M8", name: "Ayşekadın metro istasyonu", distance: "yaklaşık 1 km", note: "Bostancı – Parseller hattı" },
    { mode: "marmaray", name: "Erenköy Marmaray istasyonu", distance: "yaklaşık 1,1 km" },
  ],
  etiler: [
    { mode: "metro", code: "M6", name: "Nispetiye metro istasyonu", distance: "yaklaşık 270 m", note: "Levent – Boğaziçi Ü. / Hisarüstü hattı" },
    { mode: "metro", code: "M2", name: "Levent metro istasyonu", distance: "yaklaşık 550 m", note: "M2 ve M6 aktarma istasyonu" },
  ],
  atasehir: [
    { mode: "metro", code: "M8", name: "Kayışdağı metro istasyonu", distance: "yaklaşık 450 m", note: "Bostancı – Parseller hattı" },
    { mode: "metro", code: "M8", name: "İçerenköy metro istasyonu", distance: "yaklaşık 1 km" },
  ],
  umraniye: [
    { mode: "metro", code: "M8", name: "Mevlana metro istasyonu", distance: "yaklaşık 1,3 km", note: "Bostancı – Parseller hattı" },
    { mode: "metro", code: "M8", name: "İMES metro istasyonu", distance: "yaklaşık 1,4 km" },
  ],
};
