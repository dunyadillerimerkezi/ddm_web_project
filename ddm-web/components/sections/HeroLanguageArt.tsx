import type { CSSProperties } from "react";
import { Flag } from "@/components/graphics/Flag";
import { Parallax } from "@/components/ui";
import { HOME_STATS } from "@/data/home";
import { LANGUAGES } from "@/data/languages";
import styles from "@/styles/HeroLanguageArt.module.css";

/**
 * Ana Sayfa hero'sunun sağı — "selam bulutu" (kullanıcı seçimi B, 2026-09-26).
 *
 * Cam konuşma balonları (bayrak + o dilde selam) sırayla belirip söner; arkada
 * ince, yavaş dönen yörünge; önde iki cam bilgi kartı. Tamamen dekoratif →
 * `aria-hidden` (Parallax). ≤999px'te CSS ile gizlenir, yalnız zemin kalır.
 *
 * Veri uydurulmaz: selamlar ve bayraklar `LANGUAGES`'tan, rakamlar Ana Sayfa
 * sayaç şeridinden (`HOME_STATS`) okunur.
 */
const MAX_BUBBLES = 8;

const normalize = (s: string) => s.toLocaleLowerCase("tr").replace(/[^\p{L}]/gu, "");

/** Bayraklı diller; aynı selamı tekrar eden ("Hallo"/"Hallo!") ikincisi düşer. */
const BUBBLES = LANGUAGES.filter((l) => l.flag)
  .filter((l, i, all) => all.findIndex((o) => normalize(o.greeting) === normalize(l.greeting)) === i)
  .slice(0, MAX_BUBBLES);

function stat(icon: (typeof HOME_STATS)[number]["icon"]) {
  const found = HOME_STATS.find((s) => s.icon === icon);
  if (!found) throw new Error(`HeroLanguageArt: HOME_STATS içinde "${icon}" yok`);
  return found;
}

export function HeroLanguageArt() {
  const languages = stat("sohbet");
  const branches = stat("konum");
  const since = stat("takvim");

  return (
    <Parallax className={styles.art}>
      <div className={styles.layerBack}>
        <span className={styles.halo} />
        <svg viewBox="0 0 200 200" className={styles.orbit}>
          <circle cx="100" cy="100" r="98" className={styles.orbitDash} />
          <circle cx="100" cy="100" r="66" className={styles.orbitLine} />
          <circle cx="100" cy="2" r="2.6" className={styles.orbitDot} />
        </svg>
      </div>

      <div className={styles.layerMid}>
        {BUBBLES.map((lang, i) => (
          <span
            key={lang.slug}
            className={styles.bubble}
            // Sıra konumdan bağımsız (3 adım atlayarak) → belirmeler bulutun her yerine dağılır.
            style={{ "--i": (i * 3) % BUBBLES.length, "--n": BUBBLES.length } as CSSProperties}
          >
            {lang.flag && <Flag code={lang.flag} width={22} className={styles.flag} />}
            <span lang={lang.key}>{lang.greeting}</span>
          </span>
        ))}
      </div>

      <div className={styles.layerFront}>
        <span className={`${styles.card} ${styles.cardTop}`}>
          <span className={styles.value}>{languages.value}</span>
          <span className={styles.label}>{languages.label}</span>
        </span>
        <span className={`${styles.card} ${styles.cardBottom}`}>
          <span className={styles.pair}>
            <span className={styles.value}>{branches.value}</span>
            <span className={styles.label}>{branches.label}</span>
          </span>
          <span className={styles.divider} />
          <span className={styles.pair}>
            <span className={styles.value}>{since.value}</span>
            <span className={styles.label}>{since.label}</span>
          </span>
        </span>
      </div>
    </Parallax>
  );
}
