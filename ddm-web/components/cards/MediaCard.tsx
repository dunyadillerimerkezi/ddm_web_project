import Link from "next/link";
import type { ElementType } from "react";
import type { ImageSlotData, NavLink } from "@/lib/types";
import { UiIcon } from "@/components/graphics/Icon";
import { ImageSlot } from "@/components/ui";
import styles from "@/styles/MediaCard.module.css";

/**
 * Görselli + başlıklı kart — kartın tamamı `next/link`, görselde numara
 * rozeti, alt satır "Keşfet" ipucu (Ana Sayfa "Diğer Programlar" kartları).
 *
 * Kaynak: `DDM Ana Sayfa.dc.html` bölüm 7. Eski `variant="hero"` görünümü UI
 * turunda (2026-09-24) hero kendi fotoğraflı kartına geçince kaldırıldı;
 * `variant` prop'u çağıranları bozmamak için tek değerle duruyor.
 */
type MediaCardProps = {
  variant: "program";
  slot: ImageSlotData;
  title: string;
  text: string;
  cta: NavLink;
  num?: string;
  as?: ElementType;
  sizes?: string;
};

export function MediaCard({ slot, title, text, cta, num, as: Tag = "h2", sizes }: MediaCardProps) {
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
