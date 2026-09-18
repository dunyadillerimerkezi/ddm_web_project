import Link from "next/link";
import type { ElementType } from "react";
import type { ImageSlotData, NavLink } from "@/lib/types";
import type { IconName } from "@/components/graphics/icons";
import { Icon, UiIcon } from "@/components/graphics/Icon";
import { ImageSlot, ButtonLink } from "@/components/ui";
import styles from "@/styles/MediaCard.module.css";

/**
 * Görselli + başlıklı kart — iki görünüm paylaşır:
 *
 * - `variant="hero"`: kart tıklanabilir değil, altta ikon rozeti + açık bir
 *   CTA düğmesi var (Ana Sayfa hero büyük kartı).
 * - `variant="program"`: kartın tamamı `next/link`, görselde numara rozeti,
 *   alt satır "Keşfet" ipucu (Ana Sayfa "Diğer Programlar" kartları).
 *
 * Kaynak: `DDM Ana Sayfa.dc.html` bölüm 1 (hero) ve bölüm 7 (diğer programlar).
 */
type MediaCardProps = {
  variant: "hero" | "program";
  slot: ImageSlotData;
  title: string;
  text: string;
  cta: NavLink;
  icon?: IconName;
  num?: string;
  as?: ElementType;
  sizes?: string;
  priority?: boolean;
};

export function MediaCard({
  variant,
  slot,
  title,
  text,
  cta,
  icon,
  num,
  as: Tag = "h2",
  sizes,
  priority,
}: MediaCardProps) {
  if (variant === "program") {
    const body = (
      <>
        <div className={styles.media}>
          <ImageSlot slot={slot} radius="xl" sizes={sizes ?? "(min-width: 900px) 24vw, 92vw"} />
          {num && <span className={styles.num}>{num}</span>}
        </div>
        <div className={styles.body}>
          <Tag className={styles.progTitle}>{title}</Tag>
          <p className={styles.text}>{text}</p>
          <span className={styles.discover}>
            Keşfet
            <UiIcon name="arrowRight" size={14} strokeWidth={1.6} />
          </span>
        </div>
      </>
    );

    if (cta.href) {
      return (
        <Link href={cta.href} className={styles.cardProgram}>
          {body}
        </Link>
      );
    }
    return <span className={`${styles.cardProgram} ${styles.cardInert}`}>{body}</span>;
  }

  return (
    <article className={styles.cardHero}>
      <div className={styles.media}>
        <ImageSlot slot={slot} radius="2xl" sizes={sizes ?? "(min-width: 1180px) 45vw, 92vw"} priority={priority} />
      </div>
      <div className={styles.body}>
        {icon && (
          <span className={styles.iconBadge}>
            <Icon name={icon} size={25} strokeWidth={1.7} />
          </span>
        )}
        <Tag className={styles.heroTitle}>{title}</Tag>
        <p className={styles.text}>{text}</p>
        {cta.href ? (
          <ButtonLink href={cta.href} variant="primary" size="lg" arrow="chip" className={styles.cta}>
            {cta.label}
          </ButtonLink>
        ) : (
          <span className={styles.ctaInert}>{cta.label}</span>
        )}
      </div>
    </article>
  );
}
