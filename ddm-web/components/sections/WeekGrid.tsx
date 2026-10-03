import { DAYS } from "@/components/ui/Primitives";
import type { WeekGridRow } from "@/lib/types";
import styles from "@/styles/WeekGrid.module.css";

/**
 * Haftalık ders programı ızgarası — 7 gün × slot satırları + lejant.
 *
 * Kaynak: `DDM Şube Kurs Tarihi Sayfası.dc.html` bölüm 6 (satır 381-412).
 * Satır tabanlı bir tablo değil, bir matris (gün × slot). `overflow-x: auto` yalnız kendi kabında (ui-ux-pro-max
 * `horizontal-scroll`) — sayfa gövdesi yatay kaymıyor.
 */
export function WeekGrid({ rows }: { rows: WeekGridRow[] }) {
  const hasWeekday = rows.some((r) => r.kind !== "haftasonu");
  const hasWeekend = rows.some((r) => r.kind === "haftasonu");

  return (
    <div className={styles.wrap}>
      <div className={styles.scroller}>
        <div className={styles.grid}>
          <div className={styles.headerRow}>
            <span />
            {DAYS.map((d) => {
              const active = rows.some((r) => r.days.includes(d.key));
              return (
                <span key={d.key} className={active ? styles.dayHeadActive : styles.dayHead}>
                  {d.short}
                </span>
              );
            })}
          </div>

          {rows.map((row) => (
            <div className={styles.row} key={`${row.name}-${row.range}`}>
              <span className={styles.rowLabel}>
                <span className={styles.rowName}>{row.name}</span>
                <span className={styles.rowRange}>{row.range}</span>
              </span>
              {DAYS.map((d) => {
                const on = row.days.includes(d.key);
                const cls = !on ? styles.cellOff : row.kind === "haftasonu" ? styles.cellWeekend : styles.cellWeekday;
                const label = on ? `${d.long}: ${row.range}` : `${d.long}: ders yok`;
                return (
                  <span key={d.key} className={cls} title={label} aria-label={label} role="img">
                    {on ? "●" : ""}
                  </span>
                );
              })}
            </div>
          ))}

          <div className={styles.legend}>
            {hasWeekday && (
              <span className={styles.legendItem}>
                <span className={styles.legendDotWeekday} />
                Hafta içi grubu
              </span>
            )}
            {hasWeekend && (
              <span className={styles.legendItem}>
                <span className={styles.legendDotWeekend} />
                Hafta sonu grubu
              </span>
            )}
            <span className={styles.legendItem}>
              <span className={styles.legendDotOff} />
              Ders yok
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
