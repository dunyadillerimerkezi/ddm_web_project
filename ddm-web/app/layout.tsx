import type { Metadata } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { BRAND_NAME } from "@/data/company";
import { SITE_URL } from "@/lib/site";

/*
 * Fontlar self-host ediliyor (CDN <link> değil): şablonlar Google Fonts'a
 * <link> atıyordu, burada next/font ile pakete gömülüyor — CLS yok, Google'a
 * istek yok.
 *
 * latin-ext ZORUNLU: Türkçe ğ ü ş ı İ ö ç bu alt kümede. Tasarım sistemi
 * her iki aileyi de "tam Latin-Extended kapsamı" gerekçesiyle seçmişti.
 */
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
});

/**
 * P9: `metadataBase` paylaşım görselinin adresini mutlak yapar (alan adı `lib/site.ts` SITE_URL'den — CLAUDE.md §4).
 * Sayfalar kendi başlık / açıklamasını `withSocial()` (`lib/meta.ts`) ile paylaşım alanlarına da geçirir; buradaki
 * yalnız sayfa ayarı olmayan yerler (404) için varsayılan. Görsel `app/opengraph-image.tsx` (+ kategori klasörleri).
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: BRAND_NAME,
  openGraph: { type: "website", siteName: BRAND_NAME, locale: "tr_TR" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${plusJakarta.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
