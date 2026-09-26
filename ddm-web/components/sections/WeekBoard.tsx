import type { CSSProperties } from "react";

import type { SingleBoard, WeekSlot } from "@/data/singlePages";
import styles from "@/styles/WeekBoard.module.css";

type WeekBoardData = Extract<SingleBoard, { kind: "week" }>;

const DAYS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
const DAY_NAMES = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];

/** "19:30" → 19.5 */
function hours(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h + m / 60;
}

/**
 * P4 tekil — hero'daki haftalık ders programı panosu (kullanıcı, 2026-09-26: "A · program
 * panosu"). Masaüstünde 7 günlük ızgara (yarım saatlik satırlar, ders blokları ilk
 * görünüşte bir kez dolar), dar ekranda gün listesi. Veriler firma cümlelerinden
 * (`data/singlePages.ts`); iki seçenekli programlarda `tone` ile iki renk + açıklama.
 */
export function WeekBoard({ board }: { board: WeekBoardData }) {
  const start = Math.floor(Math.min(...board.slots.map((s) => hours(s.from)))) - 1;
  const end = Math.ceil(Math.max(...board.slots.map((s) => hours(s.to)))) + 1;
  const rows = (end - start) * 2;
  const row = (t: string) => Math.round((hours(t) - start) * 2) + 2;
  const busy = new Set(board.slots.flatMap((s) => s.days));
  const tones = [...new Map(board.slots.map((s) => [s.tone, s.label])).entries()];
  const blockClass = (s: WeekSlot) => (s.tone === "a" ? styles.blockA : styles.blockB);

  let order = 0;
  return (
    <aside className={styles.board} aria-labelledby="haftalik-program">
      <h2 id="haftalik-program" className={styles.title}>
        {board.title}
      </h2>
      <p className={styles.sub}>{board.sub}</p>

      <div className={styles.grid} style={{ "--week-rows": rows } as CSSProperties} aria-hidden="true">
        {DAYS.map((d, i) => (
          <span key={d} className={busy.has(i) ? styles.dayOn : styles.day} style={{ gridColumn: i + 2 }}>
            {d}
          </span>
        ))}
        {Array.from({ length: end - start + 1 }, (_, i) => (
          <span key={i} className={styles.hour} style={{ gridRow: 2 + i * 2 }}>
            {String(start + i).padStart(2, "0")}:00
          </span>
        ))}
        {DAYS.map((d, i) =>
          busy.has(i) ? null : <span key={d} className={styles.empty} style={{ gridColumn: i + 2, gridRow: `2 / span ${rows}` }} />,
        )}
        {board.slots.flatMap((s) =>
          s.days.map((day) => (
            <span
              key={`${s.label}-${day}`}
              className={blockClass(s)}
              style={{ gridColumn: day + 2, gridRow: `${row(s.from)} / ${row(s.to)}`, "--i": order++ } as CSSProperties}
            >
              {s.from}
              <small>{s.to}</small>
            </span>
          )),
        )}
      </div>

      <ul className={styles.list}>
        {DAY_NAMES.map((name, i) => {
          const daySlots = board.slots.filter((s) => s.days.includes(i));
          if (daySlots.length === 0) return null;
          return (
            <li key={name} className={styles.listDay}>
              <span className={styles.listName}>{name}</span>
              <span className={styles.listSlots}>
                {daySlots.map((s) => (
                  <span key={s.label} className={s.tone === "a" ? styles.barA : styles.barB}>
                    {s.from} – {s.to}
                  </span>
                ))}
              </span>
            </li>
          );
        })}
      </ul>

      {tones.length > 1 && (
        <ul className={styles.legend}>
          {tones.map(([tone, label]) => (
            <li key={tone}>
              <span className={tone === "a" ? styles.swatchA : styles.swatchB} aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      )}

      <dl className={styles.facts}>
        {board.facts.map((f) => (
          <div key={f.label} className={styles.fact}>
            <dt className={styles.factLabel}>{f.label}</dt>
            <dd className={styles.factValue}>{f.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
