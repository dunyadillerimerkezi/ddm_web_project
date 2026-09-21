import Link from "next/link";
import type { Crumb } from "@/lib/types";
import styles from "@/styles/Breadcrumb.module.css";

/**
 * Kırıntı yolu — son öğe her zaman aktif sayfadır (`href` yok, `aria-current`).
 *
 * Kaynak: `DDM Dil Kursu Sayfası.dc.html` bölüm 1+2. Faz 6.5/6.6 aynı
 * bileşeni kullanacak (§7 — sunucu bileşeni, tek varyant: koyu zemin).
 */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      <ol className={styles.list}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li className={styles.item} key={item.label}>
              {item.href && !isLast ? (
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              ) : (
                <span className={styles.current} aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span className={styles.sep} aria-hidden="true">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
