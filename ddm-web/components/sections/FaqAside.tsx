import { Accordion, ButtonLink } from "@/components/ui";
import type { Faq, NavLink } from "@/lib/types";
import styles from "@/styles/FaqAside.module.css";

/**
 * SSS — solda yapışkan lacivert başlık kartı (+ iletişim butonu), sağda
 * ikonlu akordiyon. UI turu (2026-09-25, Dil Kursu, kullanıcı seçimi "A").
 */
export function FaqAside({
  id,
  kicker,
  title,
  items,
  cta,
}: {
  id: string;
  kicker: string;
  title: string;
  items: Faq[];
  cta: NavLink;
}) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-baslik`}>
      <div className={styles.grid}>
        <div className={styles.aside}>
          <span className={styles.kicker}>{kicker}</span>
          <h2 id={`${id}-baslik`} className={styles.title}>
            {title}
          </h2>
          {cta.href && (
            <ButtonLink href={cta.href} variant="onDark" size="md" arrow="chip" className={styles.cta}>
              {cta.label}
            </ButtonLink>
          )}
        </div>
        <Accordion items={items} name={id} />
      </div>
    </section>
  );
}
