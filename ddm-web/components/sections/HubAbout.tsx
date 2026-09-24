import type { ReactNode } from "react";
import styles from "@/styles/HubAbout.module.css";

/**
 * P3 — hub'ın kurum bölümü: lacivert zemin, solda kaynak metni + şablon
 * özellikleri (Deneyimli eğitmenler…), sağda beyaz kutu içinde `aside`
 * (SSS). Kaynak başlığı H2 olarak durur.
 */
export function HubAbout({
  id,
  title,
  paragraphs,
  features,
  aside,
  asideTitle,
  asideId,
}: {
  id: string;
  title: string;
  paragraphs: string[];
  features: { title: string; body: string }[];
  aside?: ReactNode;
  asideTitle?: string;
  asideId?: string;
}) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-baslik`}>
      <div className={styles.container}>
        <div className={styles.copy}>
          <h2 id={`${id}-baslik`} className={styles.title}>
            {title}
          </h2>
          {paragraphs.map((p) => (
            <p key={p} className={styles.p}>
              {p}
            </p>
          ))}
          {features.length > 0 && (
            <ul className={styles.features}>
              {features.map((f) => (
                <li key={f.title} className={styles.feature}>
                  <h3 className={styles.featureTitle}>{f.title}</h3>
                  <p className={styles.featureBody}>{f.body}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        {aside && (
          <div id={asideId} className={styles.aside}>
            {asideTitle && <h2 className={styles.asideTitle}>{asideTitle}</h2>}
            {aside}
          </div>
        )}
      </div>
    </section>
  );
}
