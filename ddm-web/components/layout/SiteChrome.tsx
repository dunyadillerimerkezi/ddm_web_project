import type { ReactNode } from "react";
import type { Branch } from "@/lib/types";
import { assertNavSoonFlags } from "@/lib/navAudit";
import { TopBar } from "./TopBar";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { MobileBottomBar } from "./MobileBottomBar";

type SiteChromeProps = {
  children: ReactNode;
  /**
   * Sayfanın bağlı olduğu şube. Üst bar, footer ve mobil çubuk buradan
   * beslenir. Verilmezse merkez (Kadıköy) kullanılır.
   */
  branch?: Branch;
  /** Ana Sayfa "İletişim" kullanır; iç sayfalar "Kayıt Ol". */
  ctaLabel?: string;
  ctaHref?: string;
};

/**
 * Her sayfayı saran ortak çerçeve: üst bar + header/mega menü +
 * içerik + footer + mobil alt çubuk.
 */
export function SiteChrome({ children, branch, ctaLabel, ctaHref }: SiteChromeProps) {
  // Menü ağacını `SiteHeader` kendisi süzüyor (istemci); burada yalnız
  // `soon` bayraklarının üretilmiş sayfa listesiyle tutarlılığı doğrulanıyor.
  // Sapma varsa build düşer — bkz. lib/navAudit.ts.
  assertNavSoonFlags();

  return (
    <>
      <TopBar branch={branch} />
      <SiteHeader ctaLabel={ctaLabel} ctaHref={ctaHref} />
      <main>{children}</main>
      <SiteFooter branch={branch} />
      <MobileBottomBar branch={branch} ctaLabel={ctaLabel} ctaHref={ctaHref} />
    </>
  );
}
