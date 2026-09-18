import Link from "next/link";
import Image from "next/image";
import { Flag } from "@/components/graphics/Flag";
import { UiIcon } from "@/components/graphics/Icon";
import type { LanguageCard as LanguageCardData } from "@/data/home";
import styles from "@/styles/LanguageCard.module.css";

/**
 * Dil kursları ızgarasındaki tek kart — görsel + bayrak çipi + başlık +
 * native `<details>/<summary>` akordiyonu (JS'siz açılır, ek state gerekmez).
 *
 * Kaynak: `DDM Ana Sayfa.dc.html` bölüm 5.
 */
export function LanguageCard({ card }: { card: LanguageCardData }) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Image
          src={card.image.src}
          alt={`${card.title} — ${card.image.hint}`}
          fill
          sizes="(min-width: 900px) 30vw, (min-width: 600px) 45vw, 92vw"
          style={{ objectFit: "cover" }}
        />
        {card.flag && (
          <span className={styles.flagChip}>
            <Flag code={card.flag} width={40} />
          </span>
        )}
      </div>
      <div className={styles.body}>
        <div className={styles.head}>
          <span className={styles.codeBadge}>{card.code}</span>
          <h3 className={styles.title}>{card.title}</h3>
        </div>
        <details className={styles.details}>
          <summary className={styles.summary}>
            Program detayları
            <UiIcon name="caretDown" size={11} strokeWidth={1.7} className={styles.caret} />
          </summary>
          <div className={styles.linkList}>
            {card.links.map((link) =>
              link.href ? (
                <Link href={link.href} className={styles.link} key={link.label}>
                  {link.label}
                </Link>
              ) : (
                <span className={styles.linkInert} key={link.label}>
                  {link.label}
                </span>
              ),
            )}
          </div>
        </details>
      </div>
    </article>
  );
}
