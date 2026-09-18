import { Icon } from "@/components/graphics/Icon";
import type { HomeStat } from "@/data/home";
import styles from "@/styles/StatStrip.module.css";

/**
 * Sayaç şeridi — lacivert zemin, ikon + rakam + etiket, `repeat(auto-fit)`.
 *
 * Kaynak: `DDM Ana Sayfa.dc.html` bölüm 2. Rakamlar statik — `data-count`
 * sayaç animasyonu tasarımda bilinçli kaldırılmıştı (Faz 6.3 planı).
 */
export function StatStrip({ items }: { items: HomeStat[] }) {
  return (
    <section className={styles.section}>
      <div className={styles.strip}>
        {items.map((item) => (
          <div className={styles.item} key={item.label}>
            <span className={styles.iconBox}>
              <Icon name={item.icon} size={25} strokeWidth={1.6} />
            </span>
            <span className={styles.textCol}>
              <span className={styles.value}>{item.value}</span>
              <span className={styles.label}>{item.label}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
