import type { NavChildGroup, NavColumn, NavItem, NavLink, NavNode } from "@/lib/types";
import { NAV_ITEMS } from "@/lib/nav";

/**
 * Menü süzgeci — `lib/nav.ts`'teki TAM ağacı, ÜRETİLMİŞ sayfalara göre süzer.
 *
 * NEDEN: `nav.ts` canlı sitenin tüm mega menüsünü tarif eder; kalemlerin
 * yarısının sayfası henüz üretilmedi (P4/P5). Menü o hedeflere link basarsa
 * `npm run check-links` ölü sayısı artar ve kullanıcı 404'e düşer.
 *
 * NASIL: üretilmemiş kalemler `nav.ts`'te `soon: true` taşır; burada href'leri
 * `null`'a iner (düz metin) ya da kalem hiç basılmaz. Bayrağın kaynakla
 * tutarlılığını `lib/navAudit.ts` build sırasında `lib/pageRegistry.ts`'e karşı
 * doğrular — yanlış bayrak build'i düşürür, sessizce ölü link doğmaz.
 *
 * BU MODÜL SAF: yalnız `nav.ts`'e bağlı, `pageRegistry`'ye (ve dolayısıyla
 * ~320 KB'lık `data/courseDates.ts`'e) DEĞİL. Bu yüzden `SiteHeader` istemci
 * bileşeni onu doğrudan import edebiliyor; ağaç her sayfanın RSC yüküne
 * kopyalanmak yerine bir kez paylaşılan JS parçasında duruyor.
 */

/** Üretilmemiş hedef ne olsun? */
export type NavRenderMode =
  /** Düz metin olarak kalır (tıklanamaz görünür) — menü tam ağacı gösterir. */
  | "inert"
  /** Hiç render edilmez — menüde yalnız gidilebilen yerler görünür. */
  | "hide";

/**
 * Kullanıcı kararı (2026-09-23): tam ağaç görünsün, üretilmemiş kalemler düz
 * metin olsun. "hide" seçilseydi hiçbir sayfası üretilmemiş üç sekme
 * (İngilizce Kursları, Yurtdışı Eğitim, Diğer Programlar) menüden tümüyle
 * düşerdi; kullanıcı bunları görünür tutmayı tercih etti.
 */
export const DEFAULT_NAV_MODE: NavRenderMode = "inert";

function resolveLinks(items: NavLink[], mode: NavRenderMode): NavLink[] {
  const out: NavLink[] = [];
  for (const item of items) {
    if (item.soon && mode === "hide") continue;
    out.push({ label: item.label, href: item.soon ? null : item.href });
  }
  return out;
}

function resolveGroups(groups: NavChildGroup[], mode: NavRenderMode): NavChildGroup[] {
  const out: NavChildGroup[] = [];
  for (const group of groups) {
    const items = resolveLinks(group.items, mode);
    if (items.length === 0) continue;
    out.push({ title: group.title, items });
  }
  return out;
}

function resolveNodes(items: NavNode[], mode: NavRenderMode): NavNode[] {
  const out: NavNode[] = [];
  for (const node of items) {
    const href = node.soon ? null : node.href;
    const children = node.children ? resolveGroups(node.children, mode) : undefined;
    // Ne kendisi gidilebilir ne de altında gidilebilir bir şey kaldıysa kalem düşer.
    if (!href && (!children || children.length === 0) && mode === "hide") continue;
    out.push(
      children && children.length > 0
        ? { label: node.label, href, children }
        : { label: node.label, href },
    );
  }
  return out;
}

function resolveColumns(columns: NavColumn[], mode: NavRenderMode): NavColumn[] {
  const out: NavColumn[] = [];
  for (const column of columns) {
    const items = resolveNodes(column.items, mode);
    if (items.length === 0) continue;
    out.push({ title: column.title, items });
  }
  return out;
}

/**
 * Süzülmüş menü ağacı.
 *
 * "hide" modunda hiçbir sayfası üretilmemiş sekme tümüyle düşer. "inert"
 * modunda (varsayılan) sekme kalır: paneli yalnız düz metin gösterse bile
 * ziyaretçiye "bu programlar var" bilgisini verir — kullanıcı kararı.
 */
export function getNavTree(mode: NavRenderMode = DEFAULT_NAV_MODE): NavItem[] {
  const out: NavItem[] = [];
  for (const item of NAV_ITEMS) {
    const columns = resolveColumns(item.columns, mode);
    if (columns.length === 0) continue;
    const [promo] = resolveLinks([item.promoLink], mode);
    out.push({
      ...item,
      columns,
      // "hide" modunda promo linki tamamen düşebilir; o zaman panelde başlık
      // kalır, CTA basılmaz.
      promoLink: promo ?? { label: item.promoLink.label, href: null },
    });
  }
  return out;
}
