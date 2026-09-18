import Link from "next/link";
import { Icon, UiIcon } from "@/components/graphics/Icon";
import { LETTERS_SECTION } from "@/data/home";
import styles from "@/styles/LettersSection.module.css";

/**
 * Bölüm 10 · Mektuplar / Aktiviteler / Duyurular.
 * Kaynak: `DDM Ana Sayfa.dc.html` bölüm 10.
 */
export function LettersSection() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {LETTERS_SECTION.map((card) => (
          <div className={styles.card} key={card.title}>
            <span className={styles.iconBadge}>
              <Icon name={card.icon} size={28} strokeWidth={1.6} />
            </span>
            <h3 className={styles.title}>{card.title}</h3>
            <p className={styles.text}>{card.text}</p>
            <Link href={card.href} className={styles.link}>
              {card.cta}
              <UiIcon name="arrowRight" size={14} strokeWidth={1.6} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
