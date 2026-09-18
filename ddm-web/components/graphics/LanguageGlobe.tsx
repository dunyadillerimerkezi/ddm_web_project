import { Flag } from "@/components/graphics/Flag";
import styles from "@/styles/LanguageGlobe.module.css";

/**
 * Dil kursları bölümünün dekoratif küresi — halkalar, dönen meridyenler,
 * yüzen bayrak çipleri. Tamamen dekoratif → `aria-hidden`.
 *
 * Kaynak: `DDM Ana Sayfa.dc.html` bölüm 5. `639px` altında CSS ile gizlenir
 * (şablondaki `langGlobeDisplay` JS ölçümünün CSS karşılığı).
 */
const CHIPS = [
  { code: "gb", label: "EN", cls: "chipEn" },
  { code: "de", label: "DE", cls: "chipDe" },
  { code: "fr", label: "FR", cls: "chipFr" },
  { code: "ru", label: "RU", cls: "chipRu" },
  { code: "es", label: "ES", cls: "chipEs" },
  { code: "tr", label: "TR", cls: "chipTr" },
] as const;

export function LanguageGlobe() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <span className={styles.glow} />
      <span className={styles.ring} />
      <span className={`${styles.ring} ${styles.ringDelayed}`} />

      <svg viewBox="0 0 200 200" className={styles.svg}>
        <circle cx="100" cy="100" r="62" fill="var(--ddm-white)" stroke="var(--ddm-sky-200)" strokeWidth="1.4" />
        <g className={styles.spin}>
          <ellipse cx="100" cy="100" rx="62" ry="20" fill="none" stroke="var(--ddm-sky-slot-dash)" strokeWidth="1" />
          <ellipse cx="100" cy="100" rx="62" ry="42" fill="none" stroke="var(--ddm-sky-200)" strokeWidth="1" />
          <ellipse cx="100" cy="100" rx="20" ry="62" fill="none" stroke="var(--ddm-sky-slot-dash)" strokeWidth="1" />
          <ellipse cx="100" cy="100" rx="42" ry="62" fill="none" stroke="var(--ddm-sky-200)" strokeWidth="1" />
          <line x1="38" y1="100" x2="162" y2="100" stroke="var(--ddm-sky-line)" strokeWidth="1.1" />
        </g>
        <circle cx="100" cy="100" r="62" fill="none" stroke="var(--ddm-sky-base)" strokeWidth="1.6" strokeOpacity="0.35" />
        <circle cx="126" cy="72" r="4.2" fill="var(--ddm-navy-600)" />
        <circle cx="126" cy="72" r="9" fill="var(--ddm-sky-base)" fillOpacity="0.16" />
      </svg>

      {CHIPS.map((chip) => (
        <span className={`${styles.chip} ${styles[chip.cls]}`} key={chip.code}>
          <Flag code={chip.code} width={18} className={styles.chipFlag} />
          {chip.label}
        </span>
      ))}

      <span className={styles.center}>
        <span className={styles.centerValue}>19</span>
        <span className={styles.centerLabel}>DİL</span>
      </span>
    </div>
  );
}
