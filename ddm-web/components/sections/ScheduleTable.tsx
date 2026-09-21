import Link from "next/link";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui";
import type { ScheduleCell, ScheduleColumn, ScheduleTableRow } from "@/lib/types";
import styles from "@/styles/ScheduleTable.module.css";

export type ScheduleLayout = "prog4" | "uni4" | "sube5";

const layoutClass: Record<ScheduleLayout, string> = {
  prog4: styles.prog4,
  uni4: styles.uni4,
  sube5: styles.sube5,
};

function CellView({ column, cell }: { column: ScheduleColumn; cell: ScheduleCell }) {
  if (cell.kind === "title") {
    return (
      <span className={styles.cellTitle}>
        <span className={styles.cellTitleMain}>{cell.title}</span>
        {cell.note && <span className={styles.cellTitleNote}>{cell.note}</span>}
      </span>
    );
  }

  if (cell.kind === "text") {
    return (
      <span className={styles.cellText}>
        {column.rowLabel && <span className={styles.rowLabel}>{column.rowLabel}</span>}
        <span className={styles.cellTextValue}>{cell.value ?? cell.pending}</span>
      </span>
    );
  }

  if (cell.kind === "link") {
    return cell.href ? (
      <Link href={cell.href} className={styles.cellLink}>
        {cell.label}
      </Link>
    ) : (
      <span className={styles.cellLinkInert}>{cell.label}</span>
    );
  }

  return (
    <span className={styles.ctaWrap}>
      <ButtonLink href={cell.href} variant="primary" size="sm" arrow>
        {cell.label}
      </ButtonLink>
    </span>
  );
}

/**
 * Kurs/program takvimi tablosu — masaüstünde grid satırlar, ≤759px'te
 * kart görünümüne döner (satır etiketleri belirir, başlık satırı gizlenir).
 *
 * Kaynak: `DDM Dil Kursu Sayfası.dc.html` bölüm 7 tablo iskeleti — tasarımın
 * kendi `data-ddm-*` responsive sözleşmesi burada eşdeğer CSS Module
 * sınıflarıyla uygulanıyor (bkz. `ScheduleTable.module.css`).
 *
 * `layout` masaüstü kolon genişliklerini belirler — Faz 6.5 (`uni4`) ve
 * 6.6 (`sube5`) aynı bileşeni kendi kolon setleriyle kullanacak.
 */
export function ScheduleTable({
  columns,
  rows,
  layout,
  caption,
  missingNotice,
}: {
  columns: ScheduleColumn[];
  rows: ScheduleTableRow[];
  layout: ScheduleLayout;
  caption?: string;
  missingNotice?: ReactNode;
}) {
  return (
    <div className={`${styles.table} ${layoutClass[layout]}`}>
      {caption && <span className={styles.caption}>{caption}</span>}
      <div className={styles.thead}>
        {columns.map((col) => (
          <span key={col.key} className={styles.theadCell}>
            {col.head}
          </span>
        ))}
      </div>
      {rows.map((row) => (
        <div className={styles.row} key={row.key}>
          {row.cells.map((cell, i) => (
            <CellView key={columns[i].key} column={columns[i]} cell={cell} />
          ))}
        </div>
      ))}
      {missingNotice}
    </div>
  );
}
