import { Icon } from "@/components/graphics/Icon";
import { Reveal } from "@/components/ui";
import type { FormatPart } from "@/data/privateLessonsShared";
import styles from "@/styles/FormatCards.module.css";

/**
 * P4 — sınav özel ders sayfalarının baskın bölümü: "sınav formatı kartları"
 * (kullanıcı kararı, 2026-09-25 — dil sayfalarındaki seviye merdiveninin sınav
 * karşılığı). Solda lacivert özet paneli (süre, puan, geçerlilik…), sağda
 * sınavın her bölümü için bir kart. Tüm olgular genel bilgidir; resmi kaynağı
 * `data/privateLessonsExam.ts`te yorumda.
 *
 * Özet bir `<dl>` — arama motorları ve yapay zekâ aramaları "etiket: değer"
 * ilişkisini doğrudan okur. Tek hareket: kartlar görünür alana girince sırayla.
 */
export function FormatCards({
  id,
  title,
  lead,
  parts,
  facts,
  note,
}: {
  id: string;
  title: string;
  lead: string;
  parts: FormatPart[];
  facts: { label: string; value: string }[];
  note: string | null;
}) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-baslik`}>
      <div className={styles.container}>
        <h2 id={`${id}-baslik`} className={styles.title}>
          {title}
        </h2>
        <p className={styles.lead}>{lead}</p>

        <Reveal className={styles.stage}>
          <dl className={styles.facts}>
            {facts.map((f) => (
              <div key={f.label} className={styles.fact}>
                <dt className={styles.factLabel}>{f.label}</dt>
                <dd className={styles.factValue}>{f.value}</dd>
              </div>
            ))}
          </dl>
          <ul className={parts.length === 3 ? styles.partsThree : styles.parts}>
            {parts.map((p) => (
              <li key={p.name} className={styles.part} data-reveal>
                <span className={styles.partIcon}>
                  <Icon name={p.icon} size={22} />
                </span>
                <h3 className={styles.partName}>{p.name}</h3>
                <p className={styles.partMeasures}>{p.measures}</p>
                {p.detail && <p className={styles.partDetail}>{p.detail}</p>}
              </li>
            ))}
          </ul>
        </Reveal>

        {note && <p className={styles.note}>{note}</p>}
      </div>
    </section>
  );
}
