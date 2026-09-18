import type { Metadata } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Dünya Dilleri Merkezi",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${plusJakarta.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
