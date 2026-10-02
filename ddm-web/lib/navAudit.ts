import type { NavLink } from "@/lib/types";
import { NAV_ITEMS } from "@/lib/nav";
import { isProducedPage } from "@/lib/pageRegistry";
import { isHiddenPath } from "@/data/hiddenPages";

/**
 * `lib/nav.ts`'teki `soon: true` bayraklarını `lib/pageRegistry.ts`'e karşı
 * doğrular.
 *
 * NEDEN ELLE BAYRAK: menü ağacı istemci bileşeninde (`SiteHeader`) duruyor;
 * süzgeci orada çalıştırmak için üretilmiş sayfa listesine ihtiyaç var, ama
 * `pageRegistry` ~320 KB'lık `data/courseDates.ts`'i içeri alıyor — tarayıcı
 * paketine giremez. Ağacı sunucuda süzüp prop olarak geçmek de ağacı 126
 * sayfanın HER BİRİNİN RSC yüküne kopyalıyordu (sayfa başına ~36 KB).
 * Çözüm: bayrak `nav.ts`'te dursun, doğruluğu BUILD'de burada kanıtlansın.
 *
 * NE ZAMAN ÇALIŞIR: `SiteChrome` (sunucu bileşeni) her sayfa render'ında
 * çağırır, BAŞARILI ilk çağrıdan sonra bir daha koşmaz. Bayrak sapmışsa build
 * düşer — hata mesajı hangi satırın düzeltileceğini söyler.
 *
 * KAPSAM: yalnız `NAV_ITEMS`. `FOOTER_COLUMNS` bilinçli olarak dışarıda —
 * footer'daki ölü hedefler (ör. `/ogrenci-yorumlari`, `/diger-program/*`)
 * kullanıcı kararıyla duruyor ve P3/P4 kapsamında açılacak; `check-links`
 * onları zaten sayıyor.
 */

let checked = false;

function walk(): NavLink[] {
  const links: NavLink[] = [];
  for (const item of NAV_ITEMS) {
    links.push(item.promoLink);
    for (const column of item.columns) {
      for (const node of column.items) {
        links.push(node);
        for (const group of node.children ?? []) links.push(...group.items);
      }
    }
  }
  return links;
}

export function assertNavSoonFlags(): void {
  if (checked) return;

  const staleSoon: string[] = []; // sayfa üretildi ama bayrak duruyor
  const missingSoon: string[] = []; // sayfa yok ama bayrak konmamış
  const notInternal: string[] = []; // kök-göreli olmayan hedefe bayrak konmuş

  for (const link of walk()) {
    if (!link.href) continue;
    // Gizli sınavlar menü süzgecinde (`lib/navTree.ts`) düşer; kalemleri geri açmak için `nav.ts`te bekler.
    if (isHiddenPath(link.href)) continue;
    // `pageRegistry` yalnız kök-göreli iç sayfaları tanır (CLAUDE.md §4 zaten
    // menüde başkasına izin vermiyor). Dış/protokollü bir hedef sayfa kaydında
    // bulunamayacağı için "üretilmemiş" sanılıp soluklaştırılmamalı.
    if (!link.href.startsWith("/")) {
      if (link.soon) notInternal.push(`${link.label} → ${link.href}`);
      continue;
    }
    const produced = isProducedPage(link.href);
    if (produced && link.soon) staleSoon.push(`${link.label} → ${link.href}`);
    if (!produced && !link.soon) missingSoon.push(`${link.label} → ${link.href}`);
  }

  if (staleSoon.length === 0 && missingSoon.length === 0 && notInternal.length === 0) {
    // Yalnız DOĞRULAMA GEÇTİĞİNDE sustur: `next dev` içinde hatayı yutup
    // sonraki yenilemede temiz sayfa göstermesin.
    checked = true;
    return;
  }

  const parts = ["lib/nav.ts `soon` bayrakları lib/pageRegistry.ts ile uyuşmuyor."];
  if (staleSoon.length) {
    parts.push(
      `\nSayfa ARTIK ÜRETİLİYOR — bu kalemlerden \`soon: true\` SİLİN (${staleSoon.length}):`,
      ...staleSoon.map((s) => `  - ${s}`),
    );
  }
  if (missingSoon.length) {
    parts.push(
      `\nSayfa ÜRETİLMİYOR — bu kalemlere \`soon: true\` EKLEYİN (${missingSoon.length}):`,
      ...missingSoon.map((s) => `  - ${s}`),
    );
  }
  if (notInternal.length) {
    parts.push(
      `\nKÖK-GÖRELİ DEĞİL — \`soon\` bu hedeflerde anlamsız, SİLİN (${notInternal.length}):`,
      ...notInternal.map((s) => `  - ${s}`),
    );
  }
  throw new Error(parts.join("\n"));
}
