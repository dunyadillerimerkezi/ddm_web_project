import styles from "@/styles/Illustration.module.css";

/**
 * Şablon illüstrasyonları.
 *
 * Şu an yalnız Şube şablonunun motifi var (takvim + saat, 200×150).
 * Dil kursunun 10 dili ve üniversitenin 3 motifi (200×200) Aşama 4-5'te
 * aynı kayda eklenecek — hepsi aynı üç katmanlı kurala uyuyor.
 */
export const ILLUSTRATIONS = {
  /** sube-illustrasyon: takvim + saat, tek motif */
  sube: {
    viewBox: "0 0 200 150",
    ratio: "4 / 3",
    primary: (
      <>
        <rect x="34" y="28" width="96" height="88" rx="8" />
        <path d="M34 50h96" />
        <path d="M56 28V18M108 28V18" />
        <path d="M50 64h14M74 64h14M98 64h14M50 82h14M74 82h14M50 100h14" />
      </>
    ),
    secondary: (
      <>
        <circle cx="132" cy="94" r="26" />
        <path d="M132 76v18l12 8" />
      </>
    ),
    ground: { x1: 24, y1: 128, x2: 176, y2: 128 },
  },
} as const;

export type IllustrationName = keyof typeof ILLUSTRATIONS;

export function Illustration({
  name,
  maxWidth = 340,
}: {
  name: IllustrationName;
  maxWidth?: number;
}) {
  const art = ILLUSTRATIONS[name];

  return (
    <div
      className={styles.wrap}
      aria-hidden="true"
      style={{ aspectRatio: art.ratio, maxWidth }}
    >
      <span className={styles.glow} />
      <svg viewBox={art.viewBox} className={styles.svg} aria-hidden="true">
        <g
          className={styles.layerPrimary}
          fill="none"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {art.primary}
        </g>
        <g
          className={styles.layerSecondary}
          fill="none"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {art.secondary}
        </g>
        <line {...art.ground} className={styles.ground} strokeWidth={1.6} />
      </svg>
    </div>
  );
}
