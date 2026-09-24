import Link from "next/link";
import Image from "next/image";
import { ImageSlot } from "@/components/ui";
import { UiIcon } from "@/components/graphics/Icon";
import type { HomeBranchCard } from "@/data/home";
import styles from "@/styles/BranchCard.module.css";

/**
 * Şube kartı — kartı tamamen kaplayan semt fotoğrafı + alt katman +
 * tanıtım metni. Kaynak: `DDM Ana Sayfa.dc.html` bölüm 6.
 *
 * UI turu (2026-09-24): fotoğraf `ImageSlot`'un sabit oranına bağlı kalmadan
 * kartı doldurur (3+2 düzende kart oranları farklı); görsel yoksa yuva.
 */
export function BranchCard({ branch }: { branch: HomeBranchCard }) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        {branch.slot.src ? (
          <Image
            src={branch.slot.src}
            alt={branch.slot.alt}
            fill
            sizes="(min-width: 1000px) 46vw, (min-width: 600px) 48vw, 92vw"
            className={styles.image}
          />
        ) : (
          <ImageSlot slot={branch.slot} radius="2xl" sizes="(min-width: 900px) 20vw, 45vw" />
        )}
      </div>
      <div className={styles.scrim} aria-hidden="true" />
      <div className={styles.body}>
        <span className={styles.tag}>{branch.tag}</span>
        <h3 className={styles.title}>{branch.title}</h3>
        <p className={styles.short}>{branch.short}</p>
        <Link href={branch.href} className={styles.cta}>
          {branch.cta}
          <UiIcon name="arrowRight" size={14} strokeWidth={1.6} />
        </Link>
      </div>
    </article>
  );
}
