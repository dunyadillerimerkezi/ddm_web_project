import { Icon } from "@/components/graphics/Icon";
import type { HomeStat } from "@/data/home";
import styles from "@/styles/StatStrip.module.css";

/**
 * Sayaç şeridi — lacivert zemin, ikon + rakam + etiket, `repeat(auto-fit)`.
 *
 * Kaynak: `DDM Ana Sayfa.dc.html` bölüm 2 (`variant="section"`, varsayılan —
 * kendi zemini, üst çizgisi, boşluğu olan bağımsız bölüm) ve
 * `DDM Dil Kursu Sayfası.dc.html` bölüm 3 (`variant="inset"` — hero'nun
 * İÇİNE gömülü, daha küçük ikon/rakam, `PageHero` bunu sarmalıyor).
 * Rakamlar statik — `data-count` sayaç animasyonu tasarımda bilinçli
 * kaldırılmıştı (Faz 6.3 planı).
 */
export function StatStrip({
  items,
  variant = "section",
}: {
  items: HomeStat[];
  variant?: "section" | "inset";
}) {
  const content = (
    <div className={variant === "inset" ? styles.stripInset : styles.strip}>
      {items.map((item) => (
        <div className={variant === "inset" ? styles.itemInset : styles.item} key={item.label}>
          <span className={variant === "inset" ? styles.iconBoxInset : styles.iconBox}>
            <Icon name={item.icon} size={variant === "inset" ? 22 : 25} strokeWidth={1.6} />
          </span>
          <span className={styles.textCol}>
            <span className={variant === "inset" ? styles.valueInset : styles.value}>
              {item.value}
            </span>
            <span className={variant === "inset" ? styles.labelInset : styles.label}>
              {item.label}
            </span>
          </span>
        </div>
      ))}
    </div>
  );

  if (variant === "inset") return content;

  return <section className={styles.section}>{content}</section>;
}
