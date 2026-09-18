import type { Testimonial } from "@/lib/types";
import styles from "@/styles/TestimonialCard.module.css";

/**
 * Öğrenci yorumu kartı — Ana Sayfa'da doğdu, Faz 6.4+'ta da kullanılacak
 * (bkz. `lib/types.ts` `Testimonial`).
 *
 * Kaynak: `DDM Ana Sayfa.dc.html` bölüm 9.
 */
export function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className={styles.card}>
      <span className={styles.quoteMark} aria-hidden="true">
        “
      </span>
      <blockquote className={styles.quote}>{item.quote}</blockquote>
      <figcaption className={styles.caption}>
        <span className={styles.initials} aria-hidden="true">
          {item.initials}
        </span>
        <span className={styles.who}>
          <span className={styles.name}>{item.name}</span>
          <span className={styles.role}>{item.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
