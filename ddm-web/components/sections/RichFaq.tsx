import { UpdatedDate } from "@/components/sections/SourcesFooter";
import { Accordion } from "@/components/ui";
import type { Faq } from "@/lib/types";
import styles from "@/styles/RichFaq.module.css";

/**
 * P4 — SSS + "son güncelleme" tarihi (genel bilgi bölümlerinin gözden
 * geçirildiği gün; sınav formatları değiştiği için okura gösterilir).
 */
export function RichFaq({ id, title, items, updated }: { id: string; title: string; items: Faq[]; updated: string }) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-baslik`}>
      <div className={styles.container}>
        <h2 id={`${id}-baslik`} className={styles.title}>
          {title}
        </h2>
        <Accordion items={items} name={id} />
        <p className={styles.updated}>
          <UpdatedDate updated={updated} />
        </p>
      </div>
    </section>
  );
}
