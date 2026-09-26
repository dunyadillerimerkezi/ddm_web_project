import { ButtonLink } from "@/components/ui";
import { WEEK_DAYS, type ScheduleSlot } from "@/lib/languageFaq";
import type { NavLink } from "@/lib/types";
import styles from "@/styles/WeekSchedule.module.css";

const SHORT = ["PZT", "SAL", "ÇAR", "PER", "CUM", "CMT", "PAZ"];
const WEEKEND_FROM = 5;

/**
 * Dil Kursu · Kurs takvimi — UI turu (2026-09-25, kullanıcı seçimi "B").
 *
 * Haftalık takvim: satır = program, kolon = gün; ders olan gün dolu hücre.
 * Tek `<table>` — mobilde CSS ile her satır bir karta döner (program adı +
 * saat üstte, 7 günlük şerit altta). Kaynaktaki gün metni ("Cumartesi /
 * Pazar") satır başlığında birebir durur. Satır başına buton yok (kullanıcı
 * isteği); tek "Ön Bilgi Formu" butonu tablonun altında.
 */
export function WeekSchedule({ slots, cta }: { slots: ScheduleSlot[]; cta: NavLink }) {
  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <caption className={styles.srOnly}>Haftalık ders programı</caption>
        <thead>
          <tr>
            <th scope="col" className={styles.corner}>
              <span className={styles.srOnly}>Program</span>
            </th>
            {WEEK_DAYS.map((day, i) => (
              <th scope="col" key={day} className={i >= WEEKEND_FROM ? `${styles.day} ${styles.weekend}` : styles.day}>
                <abbr title={day}>{SHORT[i]}</abbr>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {slots.map((slot, r) => (
            <tr key={`${slot.program}-${r}`} className={styles.row}>
              <th scope="row" className={styles.program}>
                <span className={styles.programName}>{slot.program}</span>
                <span className={styles.programMeta}>
                  {slot.daysLabel} · <b>{slot.hours}</b>
                </span>
              </th>
              {WEEK_DAYS.map((day, i) => {
                const on = slot.days.includes(i);
                const cls = [styles.cell, on ? styles.on : "", on && i >= WEEKEND_FROM ? styles.onWeekend : ""]
                  .filter(Boolean)
                  .join(" ");
                return (
                  <td key={day} className={cls} data-day={SHORT[i]}>
                    {on ? (
                      <span className={styles.slot}>{slot.hours}</span>
                    ) : (
                      <span className={styles.srOnly}>ders yok</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {cta.href && (
        <div className={styles.footer}>
          <ButtonLink href={cta.href} variant="primary" size="lg" arrow="chip">
            {cta.label}
          </ButtonLink>
        </div>
      )}
    </div>
  );
}
