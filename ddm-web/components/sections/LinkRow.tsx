import Link from "next/link";
import { PageSection } from "./PageSection";
import { Icon } from "@/components/graphics/Icon";
import type { IconName } from "@/components/graphics/icons";
import { Flag, type FlagCode } from "@/components/graphics/Flag";
import type { LinkRowItem } from "@/lib/types";
import styles from "@/styles/LinkRow.module.css";

/**
 * İç link satırı — şube/kurs tarihi sayfalarına (K, bölüm 9) veya kardeş dil
 * sayfalarına (bölüm 12) giden kısa kartlar. `href: null` → tıklanamaz düz
 * metin (bkz. `lib/nav.ts` deseni, CLAUDE.md §4 — uydurma URL üretilmez).
 *
 * Simge önceliği (öğe başına): `item.flag` (bayrak) → `item.icon` → paylaşılan
 * `icon` prop'u. Bölüm 9 (şube) tek paylaşılan ikon kullanır; bölüm 12
 * (diğer diller) her öğede kendi bayrağını taşır.
 */
export function LinkRow({
  id,
  ground = "light",
  kicker,
  title,
  lead,
  items,
  density = "compact",
  icon,
}: {
  id?: string;
  ground?: "light" | "gray";
  kicker: string;
  title: string;
  lead?: string | null;
  items: LinkRowItem[];
  density?: "compact" | "cards";
  icon?: IconName;
}) {
  return (
    <PageSection id={id} ground={ground} kicker={kicker} title={title} lead={lead}>
      <div className={density === "cards" ? styles.gridCards : styles.gridCompact}>
        {items.map((item) => {
          const itemIcon = item.icon as IconName | undefined;
          const inner = (
            <>
              {item.flag ? (
                <span className={styles.flagWrap}>
                  <Flag code={item.flag as FlagCode} width={34} />
                </span>
              ) : (
                (itemIcon ?? icon) && (
                  <span className={styles.iconWrap}>
                    <Icon name={itemIcon ?? (icon as IconName)} size={20} strokeWidth={1.7} />
                  </span>
                )
              )}
              <span className={styles.textWrap}>
                <span className={styles.label}>{item.label}</span>
                {item.sub && <span className={styles.sub}>{item.sub}</span>}
              </span>
            </>
          );
          return item.href ? (
            <Link
              href={item.href}
              className={styles.item}
              aria-current={item.current ? "page" : undefined}
              key={item.label}
            >
              {inner}
            </Link>
          ) : (
            <span className={styles.itemInert} key={item.label}>
              {inner}
            </span>
          );
        })}
      </div>
    </PageSection>
  );
}
