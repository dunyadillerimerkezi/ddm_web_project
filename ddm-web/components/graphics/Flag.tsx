import type { ReactNode } from "react";

/**
 * Küçük ülke bayrakları — dil kartları ve dil küresi çipleri için.
 *
 * Kaynak: `DDM Ana Sayfa.dc.html` bölüm 5 (dil kartları) ve dil küresindeki
 * inline SVG'ler. Geometriler birebir taşındı, yalnız `<Icon>` ailesiyle
 * tutarlı olsun diye tek bileşene toplandı. jp / kr / gr / bg / se (2026-10-01) tasarım kaynağında yoktu —
 * resmi oranlardan 60×40'a sadeleştirildi.
 * Beyaz zeminli bayraklara (jp, kr) beyaz kartta kaybolmasınlar diye ince kenar çizgisi eklendi.
 *
 * 60×40 viewBox, fill tabanlı (bayrak — stroke ailesine girmiyor), dekoratif
 * → her zaman `aria-hidden`. Anlamı yanındaki kod rozeti/metin taşıyor.
 */
export const FLAG_CODES = ["gb", "de", "fr", "ru", "es", "it", "cn", "tr", "nl", "jp", "kr", "gr", "bg", "se"] as const;

export type FlagCode = (typeof FLAG_CODES)[number];

type FlagProps = {
  code: FlagCode;
  width?: number;
  className?: string;
};

export function Flag({ code, width = 40, className }: FlagProps) {
  const height = Math.round((width * 40) / 60);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 60 40"
      aria-hidden="true"
      className={className}
    >
      {FLAG_PATHS[code]}
    </svg>
  );
}

const FLAG_PATHS: Record<FlagCode, ReactNode> = {
  gb: (
    <>
      <rect width="60" height="40" fill="#012169" />
      <path d="M0 0l60 40M60 0L0 40" stroke="#FFF" strokeWidth="8" />
      <path d="M0 0l60 40M60 0L0 40" stroke="#C8102E" strokeWidth="4" />
      <path d="M30 0v40M0 20h60" stroke="#FFF" strokeWidth="13" />
      <path d="M30 0v40M0 20h60" stroke="#C8102E" strokeWidth="8" />
    </>
  ),
  de: (
    <>
      <rect width="60" height="13.34" fill="#000" />
      <rect y="13.34" width="60" height="13.33" fill="#DD0000" />
      <rect y="26.67" width="60" height="13.33" fill="#FFCE00" />
    </>
  ),
  fr: (
    <>
      <rect width="20" height="40" fill="#002395" />
      <rect x="20" width="20" height="40" fill="#FFFFFF" />
      <rect x="40" width="20" height="40" fill="#ED2939" />
    </>
  ),
  ru: (
    <>
      <rect width="60" height="13.34" fill="#FFFFFF" />
      <rect y="13.34" width="60" height="13.33" fill="#0039A6" />
      <rect y="26.67" width="60" height="13.33" fill="#D52B1E" />
    </>
  ),
  es: (
    <>
      <rect width="60" height="40" fill="#AA151B" />
      <rect y="10" width="60" height="20" fill="#F1BF00" />
    </>
  ),
  it: (
    <>
      <rect width="20" height="40" fill="#008C45" />
      <rect x="20" width="20" height="40" fill="#F4F5F0" />
      <rect x="40" width="20" height="40" fill="#CD212A" />
    </>
  ),
  cn: (
    <>
      <rect width="60" height="40" fill="#DE2910" />
      <circle cx="12" cy="10" r="5" fill="#FFDE00" />
      <circle cx="22" cy="5" r="1.8" fill="#FFDE00" />
      <circle cx="26" cy="10" r="1.8" fill="#FFDE00" />
      <circle cx="26" cy="16" r="1.8" fill="#FFDE00" />
      <circle cx="22" cy="20" r="1.8" fill="#FFDE00" />
    </>
  ),
  tr: (
    <>
      <rect width="60" height="40" fill="#E30A17" />
      <circle cx="24" cy="20" r="8.5" fill="#FFFFFF" />
      <circle cx="27" cy="20" r="6.8" fill="#E30A17" />
      <path d="M36 20l6.4-2.1-4 5.5v-6.8l4 5.5z" fill="#FFFFFF" />
    </>
  ),
  nl: (
    <>
      <rect width="60" height="13.34" fill="#AE1C28" />
      <rect y="13.34" width="60" height="13.33" fill="#FFFFFF" />
      <rect y="26.67" width="60" height="13.33" fill="#21468B" />
    </>
  ),
  jp: (
    <>
      <rect x="0.5" y="0.5" width="59" height="39" fill="#FFFFFF" stroke="#D5DAE3" />
      <circle cx="30" cy="20" r="12" fill="#BC002D" />
    </>
  ),
  kr: (
    <>
      <rect x="0.5" y="0.5" width="59" height="39" fill="#FFFFFF" stroke="#D5DAE3" />
      <g transform="rotate(33.69 30 20)">
        <circle cx="30" cy="20" r="10" fill="#CD2E3A" />
        <path d="M20 20a10 10 0 0 0 20 0a5 5 0 0 0-10 0a5 5 0 0 1-10 0z" fill="#0047A0" />
      </g>
      {/* Köşelerde dört trigram: sol üst ☰, sağ alt ☷, sağ üst ☵, sol alt ☲ (true = düz çizgi, false = kesik). */}
      {(
        [
          [15.9, 10.6, -56.31, [true, true, true]],
          [44.1, 29.4, -56.31, [false, false, false]],
          [44.1, 10.6, 56.31, [false, true, false]],
          [15.9, 29.4, 56.31, [true, false, true]],
        ] as [number, number, number, boolean[]][]
      ).map(([x, y, a, bars]) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${a})`} fill="#000">
          {bars.map((solid, i) =>
            solid ? (
              <rect key={i} x="-5" y={-3.4 + i * 2.6} width="10" height="1.6" />
            ) : (
              <g key={i}>
                <rect x="-5" y={-3.4 + i * 2.6} width="4.4" height="1.6" />
                <rect x="0.6" y={-3.4 + i * 2.6} width="4.4" height="1.6" />
              </g>
            ),
          )}
        </g>
      ))}
    </>
  ),
  gr: (
    <>
      <rect width="60" height="40" fill="#0D5EAF" />
      {[1, 3, 5, 7].map((i) => (
        <rect key={i} y={(i * 40) / 9} width="60" height={40 / 9} fill="#FFFFFF" />
      ))}
      <rect width={200 / 9} height={200 / 9} fill="#0D5EAF" />
      <rect x={80 / 9} width={40 / 9} height={200 / 9} fill="#FFFFFF" />
      <rect y={80 / 9} width={200 / 9} height={40 / 9} fill="#FFFFFF" />
    </>
  ),
  bg: (
    <>
      <rect width="60" height="13.34" fill="#FFFFFF" />
      <rect y="13.34" width="60" height="13.33" fill="#00966E" />
      <rect y="26.67" width="60" height="13.33" fill="#D62612" />
    </>
  ),
  se: (
    <>
      <rect width="60" height="40" fill="#006AA7" />
      <rect x="18.75" width="7.5" height="40" fill="#FECC00" />
      <rect y="16" width="60" height="8" fill="#FECC00" />
    </>
  ),
};
