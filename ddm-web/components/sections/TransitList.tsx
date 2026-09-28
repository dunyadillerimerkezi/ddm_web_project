import { Icon } from "@/components/graphics/Icon";
import type { TransitItem } from "@/data/branchTransit";
import styles from "@/styles/TransitList.module.css";

/** Şubeye ulaşım satırları (P6) — tanıtım ve iletişim sayfaları ortak. Veri `data/branchTransit.ts` (genel bilgi, kaynaklı). */
export function TransitList({ items }: { items: TransitItem[] }) {
  return (
    <>
      <ul className={styles.stops}>
        {items.map((t) => (
          <li key={t.name} className={styles.stop}>
            <span className={styles.code} aria-hidden={t.code ? undefined : true}>
              {t.code ?? <Icon name="ulasim" size={20} strokeWidth={1.7} />}
            </span>
            <span className={styles.text}>
              <span className={styles.name}>{t.name}</span>
              {t.note && <span className={styles.note}>{t.note}</span>}
            </span>
            <span className={styles.dist}>{t.distance}</span>
          </li>
        ))}
      </ul>
      <p className={styles.fine}>Mesafeler şubeye kuş uçuşu uzaklıktır.</p>
    </>
  );
}
