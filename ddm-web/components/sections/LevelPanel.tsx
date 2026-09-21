import type { LevelGroup } from "@/lib/types";
import styles from "@/styles/LevelPanel.module.css";

/**
 * Tek bir seviye grubu paneli (G bölümü) — CEFR aralığı rozeti + yerel ad +
 * giriş cümlesi + 5 madde. `hidden` ile aktif olmayan gruplar DOM'dan
 * kaldırılmaz (yalnız görsel olarak gizlenir) — JS kapalıyken de tüm
 * gruplar HTML'de bulunsun diye (bkz. plan §7 `LevelExplorer` notu).
 */
export function LevelPanel({
  id,
  labelledBy,
  hidden,
  range,
  group,
}: {
  id: string;
  labelledBy: string;
  hidden: boolean;
  range: string;
  group: LevelGroup;
}) {
  return (
    <div id={id} role="tabpanel" aria-labelledby={labelledBy} className={styles.panel} hidden={hidden}>
      <div className={styles.head}>
        <span className={styles.badge}>{range}</span>
        <h3 className={styles.title}>{group.name}</h3>
      </div>
      <p className={styles.intro}>{group.intro}</p>
      <ul className={styles.items}>
        {group.items.map((item) => (
          <li className={styles.item} key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
