import styles from "@/styles/Illustration.module.css";

/**
 * Şablon illüstrasyonları.
 *
 * Şube şablonunun motifi (takvim + saat, 200×150, iki katman) ve Dil Kursu'nun
 * 10 dil motifi (200×200, üç katman) burada. Üniversite'nin 3 motifi (Faz 6.5)
 * aynı kayda aynı kurala uyarak eklenecek.
 *
 * Üç katmanlı kural (Tasarım Sistemi dokümantasyonu, `DDM Dil Kursu Sayfası.dc.html`
 * `illoLayers()`): L1 ana motif (sky-300, ddmFloatSlow 7s) · L2 sol yardımcı
 * (navy-400, ddmFloat 6s .6s) · L3 sağ yardımcı (sky-300, ddmFloat 5.4s 1.2s) ·
 * ortak zemin çizgisi. `tertiary` opsiyonel — yalnız üç katmanlı motiflerde var;
 * `sube` iki katmanlı kaldığı için bu alanı hiç taşımaz (geriye dönük uyumlu).
 *
 * 10 dil motifinin SVG verisi ELLE KOPYALANMADI — `illoDefs()` gövdesinden
 * programatik regex ile çıkarılıp üretildi, sonra kaynakla diff'lenerek
 * doğrulandı (plan §7). `d`/`cx`/`cy`/`r` değerleri birebir.
 */
export const ILLUSTRATIONS = {
  /** sube-illustrasyon: takvim + saat, tek motif (iki katman, tertiary yok) */
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

  /** İngilizce — Big Ben · çift katlı otobüs · çay fincanı */
  en: {
    viewBox: "0 0 200 200",
    ratio: "1 / 1",
    primary: (
      <>
        <path d="M96 168V78h18v90" />
        <path d="M93 78h24l-3-8H96z" />
        <path d="M97.5 70V48h15v22" />
        <path d="M105 34l9 12H96z" />
        <circle cx="105" cy="58" r="5.6" />
        <path d="M105 55v3.4l2.4 1.6" />
      </>
    ),
    secondary: (
      <>
        <path d="M36 168v-34c0-3 2-5 5-5h32c3 0 5 2 5 5v34" />
        <path d="M36 146h42M46 129v17M62 129v17" />
        <circle cx="48" cy="164" r="5" />
        <circle cx="68" cy="164" r="5" />
      </>
    ),
    tertiary: (
      <>
        <path d="M132 150h26l-3 16h-20z" />
        <path d="M158 154h6a5 5 0 010 9h-7" />
        <path d="M136 144c0-3 3-3 3-6s-3-3-3-6M146 144c0-3 3-3 3-6s-3-3-3-6" />
      </>
    ),
    ground: { x1: 30, y1: 168, x2: 172, y2: 168 },
  },
  /** Almanca — Brandenburg Kapısı · guguklu saat · bira maşrapası */
  de: {
    viewBox: "0 0 200 200",
    ratio: "1 / 1",
    primary: (
      <>
        <path d="M80 168V88h44v80" />
        <path d="M76 88h52l-4-10H80z" />
        <path d="M90 168v-56h10v56M116 168v-56h-10" />
        <path d="M90 78c0-6 4-10 12-10s12 4 12 10" />
        <path d="M95 68v-8h14v8" />
        <circle cx="102" cy="52" r="4" />
      </>
    ),
    secondary: (
      <>
        <path d="M43 124h28v28H43z" />
        <path d="M41 124l16-13 16 13" />
        <circle cx="57" cy="138" r="8" />
        <path d="M57 134v4l3 2" />
        <path d="M50 152v9M64 152v9" />
        <circle cx="50" cy="164" r="3.4" />
        <circle cx="64" cy="164" r="3.4" />
      </>
    ),
    tertiary: (
      <>
        <path d="M136 124h24v42h-24z" />
        <path d="M136 136h24" />
        <path d="M160 130h7a6 6 0 010 12h-7" />
        <path d="M134 124l4-8h20l4 8" />
        <path d="M144 146v12M152 146v12" />
      </>
    ),
    ground: { x1: 30, y1: 168, x2: 172, y2: 168 },
  },
  /** Fransızca — Eyfel Kulesi · kruvasan · kadeh */
  fr: {
    viewBox: "0 0 200 200",
    ratio: "1 / 1",
    primary: (
      <>
        <path d="M76 168L101 40l25 128" />
        <path d="M84 128h34M89 98h24M94 74h14" />
        <path d="M80 148h42" />
        <path d="M101 40V28" />
        <path d="M88 168c4-14 8-20 13-20s9 6 13 20" />
      </>
    ),
    secondary: (
      <>
        <path d="M38 160c0-13 9-23 22-23s22 10 22 23" />
        <path d="M38 160l-5 6M82 160l5 6" />
        <path d="M49 142l4 18M60 137v23M71 142l-4 18" />
      </>
    ),
    tertiary: (
      <>
        <path d="M134 126h30c0 13-7 20-15 20s-15-7-15-20z" />
        <path d="M149 146v18M138 164h22" />
        <path d="M140 118c0-4 3-5 3-8M155 118c0-4 3-5 3-8" />
      </>
    ),
    ground: { x1: 30, y1: 168, x2: 172, y2: 168 },
  },
  /** İtalyanca — Pisa Kulesi · espresso · Vespa */
  it: {
    viewBox: "0 0 200 200",
    ratio: "1 / 1",
    primary: (
      <>
        <path d="M94 166l6-92M118 166l-4-92" />
        <path d="M98 74h18" />
        <path d="M97 92h20M96 110h21M95 128h22M94 146h23" />
        <path d="M101 74l1-10h10l1 10" />
      </>
    ),
    secondary: (
      <>
        <path d="M40 130h26l-3 22H43z" />
        <path d="M66 134h6a5 5 0 010 10h-7" />
        <path d="M36 158h34" />
        <path d="M48 124c0-3 3-3 3-6s-3-3-3-6M58 124c0-3 3-3 3-6s-3-3-3-6" />
      </>
    ),
    tertiary: (
      <>
        <path d="M136 152v-13h10l9 13" />
        <path d="M146 139l-4-9h-8" />
        <circle cx="138" cy="158" r="8" />
        <circle cx="164" cy="158" r="8" />
        <path d="M146 158h10M155 150l9-5v13" />
      </>
    ),
    ground: { x1: 30, y1: 168, x2: 172, y2: 168 },
  },
  /** İspanyolca — Gitar · güneş · mozaik karo */
  es: {
    viewBox: "0 0 200 200",
    ratio: "1 / 1",
    primary: (
      <>
        <path d="M105 74v42" />
        <path d="M97 72h16" />
        <path d="M101 116c-10 3-17 12-17 23 0 14 9 24 21 24s21-10 21-24c0-11-7-20-17-23" />
        <circle cx="105" cy="140" r="7" />
        <path d="M84 134h42" />
        <path d="M100 72v-8h10v8" />
      </>
    ),
    secondary: (
      <>
        <circle cx="56" cy="128" r="14" />
        <path d="M56 104v-8M56 158v-8M32 128h-8M88 128h-8" />
        <path d="M39 111l-6-6M79 151l6 6M39 145l-6 6M79 105l6-6" />
      </>
    ),
    tertiary: (
      <>
        <path d="M150 118l16 16-16 16-16-16z" />
        <path d="M150 128l6 6-6 6-6-6z" />
        <path d="M134 152l16 14 16-14" />
      </>
    ),
    ground: { x1: 30, y1: 168, x2: 172, y2: 168 },
  },
  /** Rusça — Soğan kubbe · matruşka · çay bardağı */
  ru: {
    viewBox: "0 0 200 200",
    ratio: "1 / 1",
    primary: (
      <>
        <path d="M88 168v-62h34v62" />
        <path d="M105 64c11 11 17 19 17 28 0 9-8 14-17 14s-17-5-17-14c0-9 6-17 17-28z" />
        <path d="M105 64V52" />
        <path d="M99 58h12" />
        <path d="M88 106h34" />
        <path d="M99 168v-30h12v30" />
      </>
    ),
    secondary: (
      <>
        <path d="M57 116c8 0 13 7 13 16 0 6-2 10-2 16 0 8 3 12 3 20H43c0-8 3-12 3-20 0-6-2-10-2-16 0-9 5-16 13-16z" />
        <path d="M46 142h22" />
        <circle cx="52" cy="128" r="2" />
        <circle cx="62" cy="128" r="2" />
        <path d="M51 160c3-6 9-6 12 0" />
      </>
    ),
    tertiary: (
      <>
        <path d="M138 128h24l-3 30h-18z" />
        <path d="M162 134h6a6 6 0 010 12h-7" />
        <path d="M134 164h32" />
        <path d="M146 122c0-3 3-4 3-7M155 122c0-3 3-4 3-7" />
      </>
    ),
    ground: { x1: 30, y1: 168, x2: 172, y2: 168 },
  },
  /** Çince — Pagoda · fener · kaligrafi fırçası */
  zh: {
    viewBox: "0 0 200 200",
    ratio: "1 / 1",
    primary: (
      <>
        <path d="M105 46l-24 16h48z" />
        <path d="M85 62l20-6 20 6" />
        <path d="M91 72v14M119 72v14" />
        <path d="M83 86l22-8 22 8" />
        <path d="M93 96v12M117 96v12" />
        <path d="M87 108l18-6 18 6" />
        <path d="M95 118v50h20v-50" />
        <path d="M101 168v-26h8v26" />
      </>
    ),
    secondary: (
      <>
        <path d="M57 112v-8" />
        <path d="M57 112c-12 0-19 8-19 18s7 18 19 18 19-8 19-18-7-18-19-18z" />
        <path d="M44 118h26M44 142h26" />
        <path d="M57 148v10M51 158h12" />
      </>
    ),
    tertiary: (
      <>
        <path d="M155 104v26" />
        <path d="M149 130h12l-1 9c0 5-2 9-5 9s-5-4-5-9z" />
        <path d="M147 102h16" />
        <path d="M155 148c-3 8-9 14-19 18" />
        <path d="M162 156c4 4 7 7 8 12" />
      </>
    ),
    ground: { x1: 30, y1: 168, x2: 172, y2: 168 },
  },
  /** Flemenkçe — Yel değirmeni · bisiklet · kanal köprüsü */
  nl: {
    viewBox: "0 0 200 200",
    ratio: "1 / 1",
    primary: (
      <>
        <path d="M92 168v-62h26v62" />
        <path d="M88 106l17-14 17 14" />
        <path d="M105 92v-6" />
        <path d="M105 78l-21-13M105 78l21 13M105 78l-13 21M105 78l13-21" />
        <circle cx="105" cy="78" r="4" />
        <path d="M100 168v-22h10v22" />
      </>
    ),
    secondary: (
      <>
        <circle cx="44" cy="152" r="12" />
        <circle cx="72" cy="152" r="12" />
        <path d="M44 152l10-22h12l10 22M54 130h16M58 152l8-22" />
        <path d="M64 124h8" />
      </>
    ),
    tertiary: (
      <>
        <path d="M132 156c0-12 8-21 18-21s18 9 18 21" />
        <path d="M128 156h44" />
        <path d="M136 156v10M150 152v14M164 156v10" />
      </>
    ),
    ground: { x1: 30, y1: 168, x2: 172, y2: 168 },
  },
  /** Türkçe — Kız Kulesi · çay bardağı · lale */
  tr: {
    viewBox: "0 0 200 200",
    ratio: "1 / 1",
    primary: (
      <>
        <path d="M90 168v-44h30v44" />
        <path d="M86 124h38" />
        <path d="M96 124V88h18v36" />
        <path d="M105 88V76" />
        <path d="M105 58l11 18H94z" />
        <path d="M105 58V48" />
        <path d="M100 150v18M110 150v18" />
      </>
    ),
    secondary: (
      <>
        <path d="M56 118c-9 0-11 9-11 18 0 13 5 24 13 24s13-11 13-24c0-9-3-18-11-18z" />
        <path d="M45 160h26" />
        <path d="M50 112c0-3 3-4 3-7M62 112c0-3 3-4 3-7" />
      </>
    ),
    tertiary: (
      <>
        <path d="M152 168v-30" />
        <path d="M152 138c-11 0-17-8-17-19 4 4 9 4 12 0 2 4 4 7 5 7s3-3 5-7c3 4 8 4 12 0 0 11-6 19-17 19z" />
        <path d="M152 152c-8 0-13-4-15-10M152 158c8 0 13-5 15-11" />
      </>
    ),
    ground: { x1: 30, y1: 168, x2: 172, y2: 168 },
  },
  /** Faz 6.5 — Kampüs (varsayılan üniversite motifi): jenerik akademik bina ·
   *  kep · yükselen seviye grafiği. Üniversite arması KULLANILMAZ (plan §6). */
  kampus: {
    viewBox: "0 0 200 200",
    ratio: "1 / 1",
    primary: (
      <>
        <path d="M82 168v-50h36v50" />
        <path d="M76 118h48l-24-14z" strokeLinejoin="round" />
        <path d="M86 168v-30h10v30M104 168v-30h10v30" />
        <path d="M70 168h60" />
      </>
    ),
    secondary: (
      <>
        <path d="M38 138l10-4 10 4v6l4 2v22H34v-22l4-2z" strokeLinejoin="round" />
        <path d="M48 134v-8M42 128h12" />
      </>
    ),
    tertiary: (
      <>
        <path d="M132 168v-14M144 168v-24M156 168v-34M168 168v-44" />
        <path d="M132 154l12-10 12-10 12-10" />
      </>
    ),
    ground: { x1: 30, y1: 168, x2: 172, y2: 168 },
  },
  /** Faz 6.5 — Sınav oturumu: optik form + kalem · kronometre · kulaklık. */
  "sinav-oturumu": {
    viewBox: "0 0 200 200",
    ratio: "1 / 1",
    primary: (
      <>
        <path d="M78 168V56h44v112z" strokeLinejoin="round" />
        <path d="M88 72h24M88 84h24M88 96h24" />
        <circle cx="90" cy="110" r="2.4" fill="currentColor" stroke="none" />
        <circle cx="98" cy="110" r="2.4" fill="currentColor" stroke="none" />
        <circle cx="106" cy="110" r="2.4" fill="currentColor" stroke="none" />
        <circle cx="90" cy="120" r="2.4" fill="currentColor" stroke="none" />
        <circle cx="98" cy="120" r="2.4" fill="currentColor" stroke="none" />
        <path d="M116 130l12-30 5 2-12 30z" strokeLinejoin="round" />
      </>
    ),
    secondary: (
      <>
        <circle cx="54" cy="138" r="20" />
        <path d="M54 126v12l9 6" />
        <path d="M48 114l12 0M54 114v-6" />
      </>
    ),
    tertiary: (
      <>
        <path d="M132 118a18 18 0 0136 0v18" />
        <rect x="128" y="130" width="10" height="16" rx="4" />
        <rect x="164" y="130" width="10" height="16" rx="4" />
      </>
    ),
    ground: { x1: 30, y1: 168, x2: 172, y2: 168 },
  },
  /** Faz 6.5 — Dört beceri: açık kitap · kompozisyon kâğıdı · ses dalgası. */
  "dort-beceri": {
    viewBox: "0 0 200 200",
    ratio: "1 / 1",
    primary: (
      <>
        <path d="M100 66c-9-6-22-8-34-6v54c12-2 25 0 34 6c9-6 22-8 34-6V60c-12-2-25 0-34 6z" strokeLinejoin="round" />
        <path d="M100 66v54" />
      </>
    ),
    secondary: (
      <>
        <path d="M136 118h28v34h-28z" strokeLinejoin="round" />
        <path d="M142 128h16M142 136h16M142 144h10" />
      </>
    ),
    tertiary: <path d="M46 150v-10M56 154v-20M66 150v-14M76 156v-26M86 150v-10" />,
    ground: { x1: 30, y1: 168, x2: 172, y2: 168 },
  },
  /** İngilizce Konuşma — İç içe konuşma balonları · mikrofon · dalga formu */
  speak: {
    viewBox: "0 0 200 200",
    ratio: "1 / 1",
    primary: (
      <>
        <path d="M70 58h58a9 9 0 019 9v34a9 9 0 01-9 9H98l-17 17v-17h-11a9 9 0 01-9-9V67a9 9 0 019-9z" />
        <path d="M87 78h26M87 91h17" />
        <path d="M117 122h26a8 8 0 018 8v16a8 8 0 01-8 8h-9l-11 11v-11h-6a8 8 0 01-8-8v-16a8 8 0 018-8z" />
      </>
    ),
    secondary: (
      <>
        <path d="M48 112h18v32H48z" />
        <path d="M48 121a9 9 0 0118 0v14a9 9 0 01-18 0z" />
        <path d="M40 134a17 17 0 0034 0" />
        <path d="M57 151v13M46 164h22" />
      </>
    ),
    tertiary: <path d="M128 150v-14M138 156v-26M148 152v-18M158 158v-30M168 150v-14" />,
    ground: { x1: 30, y1: 168, x2: 172, y2: 168 },
  },
} as const;

export type IllustrationName = keyof typeof ILLUSTRATIONS;

export function Illustration({
  name,
  maxWidth = 340,
  /** "panel" (varsayılan) — `sube`'nin köşeli panel arkaplanı. "circle" —
   *  Dil Kursu hero'sundaki dairesel glow (bkz. PageHero). */
  glow = "panel",
}: {
  name: IllustrationName;
  maxWidth?: number;
  glow?: "panel" | "circle";
}) {
  const art = ILLUSTRATIONS[name];
  const tertiary = "tertiary" in art ? art.tertiary : null;

  return (
    <div
      className={styles.wrap}
      aria-hidden="true"
      style={{ aspectRatio: art.ratio, maxWidth }}
    >
      <span className={glow === "circle" ? styles.glowCircle : styles.glow} />
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
        {tertiary && (
          <g
            className={styles.layerTertiary}
            fill="none"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {tertiary}
          </g>
        )}
        <line {...art.ground} className={styles.ground} strokeWidth={1.6} />
      </svg>
    </div>
  );
}
