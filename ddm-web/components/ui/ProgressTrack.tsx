import styles from "@/styles/ProgressTrack.module.css";

export type ProgressStep = { code: string; groupIndex: number; groupLabel: string };

/**
 * Seviye ilerleme çubuğu — 6 nokta / 3 grup (bkz. plan §3 "Bölüm 5" kararı).
 * Bileşenin kendisi durum tutmaz (`sunucu`): aktif grup ve tıklama davranışı
 * çağıran taraftan (`LevelExplorer`) gelir. `onSelect` verilmezse noktalar
 * salt-görsel (`<span>`) render edilir.
 *
 * Kaynak: `DDM Dil Kursu Sayfası.dc.html` bölüm 5 seviye çubuğu.
 */
export function ProgressTrack({
  steps,
  activeIndex,
  onSelect,
  idPrefix,
  label,
}: {
  steps: ProgressStep[];
  activeIndex: number;
  onSelect?: (index: number) => void;
  idPrefix: string;
  label: string;
}) {
  const active = Math.min(Math.max(activeIndex, 0), steps.length - 1);
  const activeGroup = steps[active].groupIndex;
  const groupCount = Math.max(...steps.map((s) => s.groupIndex)) + 1;
  const fillPercent = ((activeGroup + 1) / groupCount) * 100 - 50 / groupCount;

  return (
    <div className={styles.track} role="tablist" aria-label={label}>
      <div className={styles.rail} />
      <div className={styles.fill} style={{ width: `${fillPercent}%` }} />
      <div className={styles.dots}>
        {steps.map((step, i) => {
          const state = step.groupIndex < activeGroup ? "done" : step.groupIndex === activeGroup ? "active" : "upcoming";
          const dot = <span className={`${styles.dot} ${styles[`dot_${state}`]}`}>{step.code}</span>;
          return onSelect ? (
            <button
              key={`${idPrefix}-${i}`}
              type="button"
              role="tab"
              id={`${idPrefix}-tab-${step.groupIndex}`}
              aria-selected={state === "active"}
              aria-controls={`${idPrefix}-panel-${step.groupIndex}`}
              aria-label={`${step.code} — ${step.groupLabel}`}
              className={styles.step}
              onClick={() => onSelect(i)}
            >
              {dot}
            </button>
          ) : (
            <span key={`${idPrefix}-${i}`} className={styles.step}>
              {dot}
            </span>
          );
        })}
      </div>
    </div>
  );
}
