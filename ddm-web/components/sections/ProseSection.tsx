import { PageSection } from "./PageSection";
import styles from "@/styles/ProseSection.module.css";

/**
 * Başlık + düz metin bölümü (P2). `AboutCertification`ın paragraf ritmini
 * (72ch satır, body-l) kutusuz ve zemin seçilebilir hâlde verir; `format:
 * "list"` → kaynak satırları madde listesi olarak basılır.
 */
export function ProseSection({
  id,
  ground = "light",
  kicker,
  title,
  paragraphs,
  format = "prose",
}: {
  id?: string;
  ground?: "light" | "gray";
  kicker?: string;
  title: string;
  paragraphs: string[];
  format?: "prose" | "list";
}) {
  return (
    <PageSection id={id} ground={ground} kicker={kicker} title={title}>
      {format === "list" ? (
        <ul className={styles.list}>
          {paragraphs.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      ) : (
        <div className={styles.paragraphs}>
          {paragraphs.map((p) => (
            <p className={styles.paragraph} key={p}>
              {p}
            </p>
          ))}
        </div>
      )}
    </PageSection>
  );
}
