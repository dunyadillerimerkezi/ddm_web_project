import type { ReactNode } from "react";
import type { Branch } from "@/lib/types";
import { assertNavSoonFlags } from "@/lib/navAudit";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { MobileBottomBar } from "./MobileBottomBar";

type SiteChromeProps = {
  children: ReactNode;
  /**
   * Sayfanın bağlı olduğu şube. Footer ve mobil çubuk buradan
   * beslenir. Verilmezse merkez (Kadıköy) kullanılır.
   */
  branch?: Branch;
  /** Ana Sayfa "İletişim" kullanır; iç sayfalar "Kayıt Ol". */
  ctaLabel?: string;
  ctaHref?: string;
};

/**
 * Her sayfayı saran ortak çerçeve: header/mega menü + içerik + footer +
 * mobil alt çubuk. Lacivert üst bar (tagline + telefon/e-posta) UI turunda
 * (2026-09-24) kullanıcı kararıyla tüm siteden kaldırıldı; telefon mobil alt
 * çubukta ve footer'da duruyor.
 */
export function SiteChrome({ children, branch, ctaLabel, ctaHref }: SiteChromeProps) {
  // Menü ağacını `SiteHeader` kendisi süzüyor (istemci); burada yalnız
  // `soon` bayraklarının üretilmiş sayfa listesiyle tutarlılığı doğrulanıyor.
  // Sapma varsa build düşer — bkz. lib/navAudit.ts.
  assertNavSoonFlags();

  return (
    <>
      <SiteHeader ctaLabel={ctaLabel} ctaHref={ctaHref} />
      <main>{children}</main>
      <SiteFooter branch={branch} />
      <MobileBottomBar branch={branch} ctaLabel={ctaLabel} ctaHref={ctaHref} />
    </>
  );
}
