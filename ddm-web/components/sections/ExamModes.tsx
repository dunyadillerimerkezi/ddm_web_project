import { Icon } from "@/components/graphics/Icon";
import { Reveal } from "@/components/ui";
import type { ExamMode, OnlineExam } from "@/data/onlineLessons";
import styles from "@/styles/ExamModes.module.css";

const MODE: Record<ExamMode, { label: string; className: string }> = {
  both: { label: "Evden ya da merkezde", className: styles.home },
  center: { label: "Sınav merkezinde", className: styles.center },
};

/**
 * P4 — online eğitim destek bölümü: "{dil} sınavlarına evden girilebilir mi?"
 * Genel bilgi; her olgunun resmi kaynağı `data/onlineLessons.ts`te yorumda,
 * doğrulanmayan ayrıntı yazılmaz (ör. İtalyanca sınavlarda yalnız "merkezde").
 */
export function ExamModes({
  id,
  title,
  lead,
  items,
  note,
}: {
  id: string;
  title: string;
  lead: string;
  items: OnlineExam[];
  note: string;
}) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-baslik`}>
      <div className={styles.container}>
        <h2 id={`${id}-baslik`} className={styles.title}>
          {title}
        </h2>
        <p className={styles.lead}>{lead}</p>

        <Reveal>
          <ul className={items.length === 1 ? styles.single : styles.grid}>
            {items.map((exam) => {
              const mode = MODE[exam.mode];
              return (
                <li key={exam.name} className={styles.card} data-reveal>
                  <span className={`${styles.badge} ${mode.className}`}>
                    <Icon name={exam.mode === "center" ? "konum" : "ekran"} size={16} />
                    {mode.label}
                  </span>
                  <h3 className={styles.name}>{exam.name}</h3>
                  <p className={styles.owner}>{exam.owner}</p>
                  <p className={styles.text}>{exam.text}</p>
                </li>
              );
            })}
          </ul>
        </Reveal>

        {note && <p className={styles.note}>{note}</p>}
      </div>
    </section>
  );
}
