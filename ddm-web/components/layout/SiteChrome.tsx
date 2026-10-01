import type { ReactNode } from "react";
import { assertNavSoonFlags } from "@/lib/navAudit";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { MobileBottomBar } from "./MobileBottomBar";

type SiteChromeProps = {
  children: ReactNode;
  /** Ana Sayfa "İletişim" kullanır; iç sayfalar "Kayıt Ol". */
  ctaLabel?: string;
  ctaHref?: string;
};

/**
 * Her sayfayı saran ortak çerçeve: header/mega menü + içerik + footer +
 * mobil alt çubuk. Lacivert üst bar (tagline + telefon/e-posta) UI turunda
 * (2026-09-24) kullanıcı kararıyla tüm siteden kaldırıldı. Footer'da ve mobil
 * çubukta telefon yok; numaralar yalnız şube sayfalarının içinde (kullanıcı, 2026-10-01).
 */
export function SiteChrome({ children, ctaLabel, ctaHref }: SiteChromeProps) {
  // Menü ağacını `SiteHeader` kendisi süzüyor (istemci); burada yalnız
  // `soon` bayraklarının üretilmiş sayfa listesiyle tutarlılığı doğrulanıyor.
  // Sapma varsa build düşer — bkz. lib/navAudit.ts.
  assertNavSoonFlags();

  return (
    <>
      <SiteHeader ctaLabel={ctaLabel} ctaHref={ctaHref} />
      <main>{children}</main>
      <SiteFooter />
      <MobileBottomBar ctaHref={ctaHref} />
    </>
  );
}
