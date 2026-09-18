import Link from "next/link";
import { ImageSlot } from "@/components/ui";
import { UiIcon } from "@/components/graphics/Icon";
import type { HomeBranchCard } from "@/data/home";
import styles from "@/styles/BranchCard.module.css";

/**
 * Şube kartı — 4:5, tam kaplayan görsel/yuva + alt gradyan + tanıtım metni.
 * Kaynak: `DDM Ana Sayfa.dc.html` bölüm 6. Görsel yok → `ImageSlot`.
 */
export function BranchCard({ branch }: { branch: HomeBranchCard }) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <ImageSlot slot={branch.slot} radius="2xl" sizes="(min-width: 900px) 20vw, 45vw" />
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
