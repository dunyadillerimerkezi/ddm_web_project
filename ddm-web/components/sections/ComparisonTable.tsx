import Link from "next/link";
import styles from "@/styles/ComparisonTable.module.css";

/**
 * P3 — karşılaştırma tablosu (onaylanan "B" yönünden). Gerçek `<table>`:
 * arama motorları ve yapay zekâ aramaları satır/sütun ilişkisini okuyabilsin.
 * ≤759px'te her satır bir karta dönüşür (hücre etiketleri `data-label`dan).
 * Hedef sayfa üretilmemişse ad düz metin kalır (ölü link yok).
 */

export type ComparisonColumn = { key: string; label: string };
export type ComparisonRow = {
  name: string;
  href: string | null;
  sub?: string;
  cells: Record<string, string>;
};

export function ComparisonTable({
  id,
  title,
  lead,
  firstLabel,
  columns,
  rows,
  note,
}: {
  id: string;
  title: string;
  lead?: string;
  firstLabel: string;
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  note?: string;
}) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-baslik`}>
      <div className={styles.container}>
        <div className={styles.head}>
          <h2 id={`${id}-baslik`} className={styles.title}>
            {title}
          </h2>
          {lead && <p className={styles.lead}>{lead}</p>}
        </div>
        <div className={styles.frame}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">{firstLabel}</th>
                {columns.map((c) => (
                  <th scope="col" key={c.key}>
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.name}>
                  <th scope="row" className={styles.rowHead}>
                    {r.href ? (
                      <Link href={r.href} className={styles.name}>
                        {r.name}
                      </Link>
                    ) : (
                      <span className={styles.name}>{r.name}</span>
                    )}
                    {r.sub && <span className={styles.sub}>{r.sub}</span>}
                  </th>
                  {columns.map((c) => (
                    <td key={c.key} data-label={c.label} className={styles.cell}>
                      {r.cells[c.key] ?? "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {note && <p className={styles.note}>{note}</p>}
        </div>
      </div>
    </section>
  );
}
