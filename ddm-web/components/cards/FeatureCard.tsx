import Link from "next/link";
import type { ElementType } from "react";
import type { ImageSlotData, NavLink } from "@/lib/types";
import { UiIcon } from "@/components/graphics/Icon";
import { ImageSlot } from "@/components/ui";
import styles from "@/styles/FeatureCard.module.css";

/**
 * Yatay kart: solda kare görsel/yuva, sağda başlık + metin + link CTA.
 * Ana Sayfa hero'sunun iki küçük kartı.
 *
 * Kaynak: `DDM Ana Sayfa.dc.html` bölüm 1 (hero, ikinci kolon).
 */
type FeatureCardProps = {
  slot: ImageSlotData;
  title: string;
  text: string;
  cta: NavLink;
  as?: ElementType;
};

export function FeatureCard({ slot, title, text, cta, as: Tag = "h2" }: FeatureCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <ImageSlot slot={slot} radius="xl" sizes="132px" />
      </div>
      <div className={styles.body}>
        <Tag className={styles.title}>{title}</Tag>
        <p className={styles.text}>{text}</p>
        {cta.href ? (
          <Link href={cta.href} className={styles.link}>
            {cta.label}
            <UiIcon name="arrowRight" size={15} strokeWidth={1.7} />
          </Link>
        ) : (
          <span className={styles.linkInert}>{cta.label}</span>
        )}
      </div>
    </article>
  );
}
