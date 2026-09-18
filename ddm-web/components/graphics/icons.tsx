import type { ReactNode } from "react";

/**
 * İkon kaydı — 24×24 viewBox, stroke tabanlı, yuvarlatılmış uç.
 *
 * Kaynak: Şube şablonundaki `icons()` + Üniversite şablonundaki `examIcons()`.
 * Orijinalde bunlar HTML dizesi olarak tutulup `dangerouslySetInnerHTML` ile
 * enjekte ediliyordu (ve şablonun kendi yorumuna göre render fırtınası
 * yaratıyordu). Burada normal JSX — o sorun tamamen ortadan kalkıyor.
 *
 * Ölçü/çizgi kalınlığı `<Icon>` bileşeninden gelir; buradaki parçalar
 * yalnız geometri içerir.
 */
export const ICONS = {
  takvim: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 9.5h17M8 5V3M16 5V3" />
    </>
  ),
  saat: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3.5 2" />
    </>
  ),
  grup: (
    <>
      <circle cx="9" cy="9" r="3.4" />
      <path d="M3 19c0-3.3 2.7-5 6-5s6 1.7 6 5" />
      <path d="M16 6.2a3.4 3.4 0 010 5.6M18.5 14.4c1.6.9 2.5 2.4 2.5 4.6" />
    </>
  ),
  sure: (
    <>
      <path d="M7 3h10M7 21h10" />
      <path d="M8 3c0 4 8 5 8 9s-8 5-8 9" />
      <path d="M16 3c0 4-8 5-8 9s8 5 8 9" />
    </>
  ),
  ucret: (
    <>
      <path d="M8 6v10.5c0 1 .8 1.5 2 1.5h5" />
      <path d="M6 10.5l5-2.5M6 14l5-2.5" />
    </>
  ),
  konum: (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  telefon: (
    <>
      <path d="M5 3.5h3l1.6 4-2 1.4a12 12 0 006.5 6.5l1.4-2 4 1.6v3a2 2 0 01-2.2 2A16.5 16.5 0 013 5.7a2 2 0 012-2.2z" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M12 3a9 9 0 00-7.7 13.6L3 21l4.5-1.2A9 9 0 1012 3z" />
    </>
  ),
  ozelders: (
    <>
      <circle cx="8" cy="8.5" r="3.2" />
      <path d="M3 19c0-3.2 2.3-5 5-5s5 1.8 5 5" />
      <path d="M15 7h6M15 11h6M15 15h4" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </>
  ),
  calisma: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3.5 2" />
    </>
  ),
  ulasim: (
    <>
      <rect x="5" y="4" width="14" height="13" rx="2" />
      <path d="M5 10h14" />
      <path d="M8 17v3M16 17v3" />
      <circle cx="8.5" cy="13.5" r="1" />
      <circle cx="15.5" cy="13.5" r="1" />
    </>
  ),
  /* ---- Ana Sayfa (Faz 6.3) ekleri — geometriler kaynak şablondan birebir ---- */
  dunya: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" />
    </>
  ),
  foto: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <circle cx="8" cy="10" r="2" />
      <path d="M3 17l5-4 3.5 3 3-2.5 6 4.5" />
    </>
  ),
  belge: (
    <>
      <path d="M6 3h9l4 4v14H6z" strokeLinejoin="round" />
      <path d="M15 3v4h4M9.5 13.5l2 2 3.5-4" />
    </>
  ),
  sohbet: (
    <>
      <path d="M3 6a2 2 0 012-2h9a2 2 0 012 2v5a2 2 0 01-2 2H8l-4 4v-4H5a2 2 0 01-2-2V6z" />
      <path d="M19 8h1a2 2 0 012 2v5a2 2 0 01-2 2h-1v3l-3-3" />
    </>
  ),
  kupa: (
    <>
      <circle cx="12" cy="9" r="5.5" />
      <path d="M8.5 13.5L7 22l5-2.6L17 22l-1.5-8.5" strokeLinejoin="round" />
    </>
  ),
  mezuniyet: (
    <>
      <path d="M3 7l9-4 9 4-9 4-9-4z" strokeLinejoin="round" />
      <path d="M6 9.5v5c0 2 2.7 3.5 6 3.5s6-1.5 6-3.5v-5M21 7v6" />
    </>
  ),
  aktivite: (
    <>
      <rect x="2.5" y="4.5" width="19" height="16" rx="2.5" />
      <path d="M2.5 9.5h19M8 2.5v4M16 2.5v4" />
      <circle cx="9" cy="14" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="15" cy="14" r="1.4" fill="currentColor" stroke="none" />
      <path d="M7.5 17.5c1-.9 2.2-1.3 4.5-1.3s3.5.4 4.5 1.3" />
    </>
  ),
  duyuru: (
    <>
      <path d="M4 10v4a1 1 0 001 1h2.5l5.5 4V5L7.5 9H5a1 1 0 00-1 1z" strokeLinejoin="round" />
      <path d="M16.5 8.5a5 5 0 010 7M19 6a8.5 8.5 0 010 12" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof ICONS;

/**
 * Arayüz ikonları — 24×24 ailesinden AYRI, kendi viewBox'ları var.
 * Dört şablonda da birebir aynı geometriyle geçiyorlar.
 */
export const UI_ICONS = {
  /** Sağ ok — dört dosyada toplam 54 kullanım, en çok tekrar eden ikon. */
  arrowRight: { viewBox: "0 0 12 12", d: "M2 6h8M6.5 2.5L10 6l-3.5 3.5" },
  arrowLeft: { viewBox: "0 0 12 12", d: "M10 6H2M5.5 2.5L2 6l3.5 3.5" },
  /** Aşağı caret — nav, accordion, içindekiler. */
  caretDown: { viewBox: "0 0 10 6", d: "M1 1l4 4 4-4" },
  /** Hamburger — her sayfada bir kez. */
  burger: { viewBox: "0 0 20 14", d: "M1 1h18M1 7h18M1 13h18" },
} as const;

export type UiIconName = keyof typeof UI_ICONS;
