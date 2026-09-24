import Image from "next/image";
import Link from "next/link";

import { Icon } from "@/components/graphics/Icon";
import type { IconName } from "@/components/graphics/icons";
import { Reveal } from "@/components/ui";
import { PageSection } from "./PageSection";
import styles from "@/styles/HubCards.module.css";

/**
 * P3 — hub kart ızgarası (Diğer Programlar, İngilizce hedef kitle, Yurtdışı
 * programları). Görselli ya da ikonlu kart; `feature: true` olan kart geniş
 * (iki kolon) durur — ızgara eşit ağırlıklı bir yığın olmasın.
 *
 * `href` null → hedef sayfa henüz üretilmedi: kart link DEĞİLDİR, soluk durur
 * ve "Yakında" etiketi taşır (menüdeki `soon` deseni, CLAUDE.md §10).
 * `alt`: hedef yokken okura yine de bir yol göstermek için ÜRETİLMİŞ ikinci link.
 */

export type HubCardItem = {
  title: string;
  text: string;
  href: string | null;
  image?: { src: string; alt: string };
  icon?: IconName;
  feature?: boolean;
  alt?: { label: string; href: string };
};

export function HubCards({
  id,
  title,
  lead,
  ground = "light",
  columns = 3,
  items,
}: {
  id: string;
  title: string;
  lead?: string | null;
  ground?: "light" | "gray";
  columns?: 2 | 3 | 4;
  items: HubCardItem[];
}) {
  const gridCls = columns === 2 ? styles.grid2 : columns === 4 ? styles.grid4 : styles.grid3;
  return (
    <PageSection id={id} ground={ground} title={title} lead={lead}>
      <Reveal className={gridCls}>
        {items.map((it) => (
          <HubCard key={it.title} item={it} />
        ))}
      </Reveal>
    </PageSection>
  );
}

function HubCard({ item }: { item: HubCardItem }) {
  const cls = [item.href ? styles.card : styles.cardSoon, item.feature ? styles.feature : ""].filter(Boolean).join(" ");
  return (
    <article className={cls} data-reveal>
      {item.image ? (
        <div className={styles.media}>
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes={item.feature ? "(max-width: 899px) 100vw, 640px" : "(max-width: 899px) 100vw, 420px"}
            className={styles.img}
          />
        </div>
      ) : item.icon ? (
        <span className={styles.iconBox} aria-hidden="true">
          <Icon name={item.icon} size={26} strokeWidth={1.7} />
        </span>
      ) : null}
      <div className={styles.body}>
        <h3 className={styles.title}>
          {item.href ? (
            <Link href={item.href} className={styles.link}>
              {item.title}
            </Link>
          ) : (
            item.title
          )}
        </h3>
        <p className={styles.text}>{item.text}</p>
        {!item.href && (
          <span className={styles.foot}>
            <span className={styles.soonTag}>Yakında</span>
            {item.alt && (
              <Link href={item.alt.href} className={styles.altLink}>
                {item.alt.label}
              </Link>
            )}
          </span>
        )}
      </div>
    </article>
  );
}
