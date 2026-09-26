import { Icon, UiIcon } from "@/components/graphics/Icon";
import type { Faq } from "@/lib/types";
import styles from "@/styles/Accordion.module.css";

/**
 * SSS akordiyonu — native `<details>`/`<summary>` + `name` (tek-açık
 * davranışı, JS'siz de çalışır — bkz. plan §7 `Accordion`).
 *
 * Kaynak: `DDM Dil Kursu Sayfası.dc.html` bölüm 9 "SSS" kart stili.
 */
export function Accordion({
  items,
  name,
  defaultOpenIndex = 0,
}: {
  items: Faq[];
  name: string;
  defaultOpenIndex?: number;
}) {
  return (
    <div className={styles.list}>
      {items.map((item, i) => (
        <details className={styles.item} name={name} open={i === defaultOpenIndex} key={item.question}>
          <summary className={styles.summary}>
            {item.icon && (
              <span className={styles.icon} aria-hidden="true">
                <Icon name={item.icon} size={20} strokeWidth={1.7} />
              </span>
            )}
            <span className={styles.question}>{item.question}</span>
            <span className={styles.caret}>
              <UiIcon name="caretDown" size={12} strokeWidth={1.8} />
            </span>
          </summary>
          <div className={styles.answer}>
            {item.format === "list" ? (
              <ul className={styles.answerList}>
                {item.answer.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            ) : (
              item.answer.map((line) => (
                <p className={styles.answerP} key={line}>
                  {line}
                </p>
              ))
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
