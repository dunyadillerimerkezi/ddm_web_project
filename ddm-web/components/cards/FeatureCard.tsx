import Link from "next/link";
import Image from "next/image";
import type { ElementType } from "react";
import type { ImageSlotData, NavLink } from "@/lib/types";
import { UiIcon } from "@/components/graphics/Icon";
import { ImageSlot } from "@/components/ui";
import styles from "@/styles/FeatureCard.module.css";

/**
 * Yatay kart: solda görsel, sağda başlık + metin + link CTA.
 * Ana Sayfa hero'sunun iki küçük kartı.
 *
 * Kaynak: `DDM Ana Sayfa.dc.html` bölüm 1 (hero, ikinci kolon).
 * UI turu (2026-09-24): gerçek fotoğraf kartın sol kolonunu kenardan kenara,
 * tam yükseklikte doldurur; görsel yoksa eski kesikli yuva.
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
      <div className={slot.src ? styles.photo : styles.media}>
        {slot.src ? (
          <Image
            src={slot.src}
            alt={slot.alt}
            fill
            sizes="(min-width: 1000px) 18vw, 92vw"
            className={styles.photoImage}
          />
        ) : (
          <ImageSlot slot={slot} radius="xl" sizes="132px" />
        )}
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
