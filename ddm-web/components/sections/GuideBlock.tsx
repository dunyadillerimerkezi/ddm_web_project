import Link from "next/link";

import { Icon } from "@/components/graphics/Icon";
import type { GuideResolvedBlock } from "@/lib/guideContent";
import { linkIfProduced } from "@/lib/hubLinks";
import styles from "@/styles/GuideBody.module.css";

/**
 * P4 nedir + tekil sayfaların ortak içerik bloğu: paragraf, madde, bölüm kartı, bağlantı çipi, tablo.
 * `stackTables`: ≥3 sütunlu tablo dar ekranda satır başına kart olur (hücre başlığı `data-label`).
 */
export function GuideBlock({ block, stackTables = false }: { block: GuideResolvedBlock; stackTables?: boolean }) {
  switch (block.kind) {
    case "text":
      return (
        <>
          {block.paragraphs.map((p) => (
            <p key={p} className={styles.text}>
              {p}
            </p>
          ))}
        </>
      );
    case "points":
      return (
        <ul className={styles.points}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "parts":
      return (
        <>
          <ul className={styles.parts}>
            {block.items.map((p) => (
              <li key={p.name} className={styles.part}>
                <span className={styles.partIcon}>
                  <Icon name={p.icon} size={20} />
                </span>
                <span className={styles.partBody}>
                  <span className={styles.partHead}>
                    <strong className={styles.partName}>{p.name}</strong>
                    <span className={styles.partMeta}>{p.meta}</span>
                  </span>
                  <span className={styles.partText}>{p.text}</span>
                </span>
              </li>
            ))}
          </ul>
          {block.note && <p className={styles.note}>{block.note}</p>}
        </>
      );
    case "links":
      return (
        <ul className={styles.links}>
          {block.items.map((l) => {
            const href = linkIfProduced(l.href);
            return (
              <li key={l.href}>
                {href ? (
                  <Link href={href} className={styles.linkChip}>
                    {l.label}
                  </Link>
                ) : (
                  <span className={styles.chip}>{l.label}</span>
                )}
              </li>
            );
          })}
        </ul>
      );
    case "table":
      return (
        <>
          {block.title && <h3 className={styles.tableTitle}>{block.title}</h3>}
          <div
            className={
              block.head.length > 2 ? `${styles.tableFrame} ${stackTables ? styles.stack : ""}` : styles.tableFrameNarrow
            }
          >
            <table className={block.head.length > 2 ? styles.table : styles.tableNarrow}>
              <thead>
                <tr>
                  {block.head.map((h, i) => (
                    <th key={h || i} scope="col">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, i) =>
                      i === 0 ? (
                        <th key={i} scope="row">
                          {cell}
                        </th>
                      ) : (
                        <td key={i} data-label={block.head[i]}>
                          {cell}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.note && <p className={styles.note}>{block.note}</p>}
        </>
      );
  }
}
