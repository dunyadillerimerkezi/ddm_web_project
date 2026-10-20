import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { SINCE_FOUNDING } from "@/data/company";
import { OG_ALT as ALT, OG_SIZE as SIZE } from "@/lib/meta";

/**
 * P9 — paylaşım görseli (Open Graph, 1200×630). Kullanıcı seçimi "A · lacivert + selam balonları" (2026-10-19):
 * sitenin hero'su gibi degrade lacivert zemin, beyaz logo, üstte kategori, büyük başlık, sağda selam balonları
 * (Ana Sayfa hero'sunun "selam bulutu"). Bütün yazılar sitede zaten var; dil SAYISI yazılmaz (açık müşteri sorusu).
 *
 * Satori yalnız ttf / otf / woff okur; `next/font`un dosyası kullanılamaz. Türkçe harfler (İ ş ğ) için Plus Jakarta
 * Sans'ın TAM (alt kümesiz) statik ttf'leri `assets/fonts/` altında — iki alt küme dosyası birlikte verilince "İs"
 * yedek yazı tipiyle basılıyordu. Beyaz logo `ddm-logo-lacivert.png`'nin saydamlık kanalından üretildi
 * (`assets/og-logo-beyaz.png`; `public/assets/ddm-logo-beyaz.png` lekeli — favicon notu, CLAUDE.md §9).
 * Renkler `styles/tokens.css` ile aynı (Satori CSS değişkeni okumaz).
 */

export const OG_SIZE = SIZE;
export const OG_ALT = ALT;
export const OG_CONTENT_TYPE = "image/png";

const C = {
  navy900: "#16184a", // --ddm-navy-900
  navy600: "#2a2d7c", // --ddm-navy-600
  navy200: "#bfc1e7", // --ddm-navy-200
  sky400: "#5db4e2", // --ddm-sky-400
  white: "#ffffff",
};

/** Yalnız Latin harfli selamlar — yazı tipinde Kiril / Çin / Japon harfi yok (`data/languages.ts` greeting). */
const GREETINGS = ["Hello", "Bonjour", "Hallo", "¡Hola!", "Ciao!", "Merhaba!"];
const FOOT = `${SINCE_FOUNDING} · İstanbul’da 5 şube`;

const root = process.cwd();
let assets: Promise<{ bold: Buffer; semi: Buffer; logo: string }> | null = null;
function loadAssets() {
  assets ??= Promise.all([
    readFile(join(root, "assets/fonts/PlusJakartaSans-800.ttf")),
    readFile(join(root, "assets/fonts/PlusJakartaSans-600.ttf")),
    readFile(join(root, "assets/og-logo-beyaz.png")),
  ]).then(([bold, semi, logo]) => ({ bold, semi, logo: `data:image/png;base64,${logo.toString("base64")}` }));
  return assets;
}

/** Başlık uzadıkça küçülür — telefon önizlemesinde (~300px) en çok 3 satır. */
function titleSize(title: string): number {
  if (title.length <= 14) return 104;
  if (title.length <= 22) return 88;
  if (title.length <= 32) return 76;
  return 64;
}

export async function ogImage({ kicker, title }: { kicker: string | null; title: string }): Promise<ImageResponse> {
  const { bold, semi, logo } = await loadAssets();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 72,
          fontFamily: "Jakarta",
          background: `linear-gradient(135deg, ${C.navy900} 0%, ${C.navy600} 100%)`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 720 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori (next/og) next/image'ı çizemez; görsel PNG'ye gömülür */}
          <img src={logo} width={220} height={88} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {kicker && <div style={{ fontSize: 30, fontWeight: 600, color: C.sky400 }}>{kicker}</div>}
            <div
              style={{
                marginTop: kicker ? 12 : 0,
                fontSize: titleSize(title),
                fontWeight: 800,
                lineHeight: 1.04,
                letterSpacing: -2,
                color: C.white,
              }}
            >
              {title}
            </div>
          </div>
          <div style={{ fontSize: 26, fontWeight: 600, color: C.navy200 }}>{FOOT}</div>
        </div>
        <div style={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "flex-end", gap: 18 }}>
          {GREETINGS.map((g, i) => {
            const last = i === GREETINGS.length - 1;
            return (
              <div
                key={g}
                style={{
                  display: "flex",
                  marginRight: (i % 2) * 60,
                  padding: "12px 24px",
                  borderRadius: 999,
                  fontSize: 30,
                  fontWeight: 600,
                  color: last ? C.navy900 : C.white,
                  background: last ? C.sky400 : "rgba(255,255,255,0.10)",
                  border: `1px solid ${last ? C.sky400 : "rgba(255,255,255,0.22)"}`,
                }}
              >
                {g}
              </div>
            );
          })}
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Jakarta", data: bold, weight: 800, style: "normal" },
        { name: "Jakarta", data: semi, weight: 600, style: "normal" },
      ],
    },
  );
}
