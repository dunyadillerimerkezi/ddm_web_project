import { Flag, type FlagCode } from "@/components/graphics/Flag";
import { Icon } from "@/components/graphics/Icon";
import styles from "@/styles/CallCard.module.css";

/**
 * P4 online — dekoratif "canlı ders" penceresi: öğretmen karesinde dilin
 * selamlaması, köşede sizin kareniz, altta araç çubuğu. Bilgi taşımaz →
 * `aria-hidden`; tek hareket yavaş süzülme (globals.css reduced-motion'da durur).
 */
export function CallCard({ flag, greeting }: { flag: FlagCode | null; greeting: string }) {
  return (
    <div className={styles.call} aria-hidden="true">
      <div className={styles.bar}>
        <span className={styles.live} />
        Canlı ders
        {flag && <Flag code={flag} width={22} className={styles.flag} />}
      </div>
      <div className={styles.stage}>
        <span className={styles.bubble}>{greeting}</span>
        <span className={styles.self}>Siz</span>
      </div>
      <div className={styles.tools}>
        <span className={styles.tool}>
          <Icon name="mikrofon" size={16} />
        </span>
        <span className={styles.tool}>
          <Icon name="kamera" size={16} />
        </span>
        <span className={styles.tool}>
          <Icon name="sohbet" size={16} />
        </span>
      </div>
    </div>
  );
}
