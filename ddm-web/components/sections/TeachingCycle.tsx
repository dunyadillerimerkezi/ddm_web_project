import type { CSSProperties } from "react";
import { SectionHeading } from "@/components/ui";
import { Icon } from "@/components/graphics/Icon";
import type { IconName } from "@/components/graphics/icons";
import styles from "@/styles/TeachingCycle.module.css";

const ICON_RULES: [RegExp, IconName][] = [
  [/kulüb/i, "aktivite"],
  [/ödev|tekrar/i, "yazma"],
  [/konuşma/i, "konusma"],
  [/geri bildirim/i, "sohbet"],
  [/gelişim|analiz/i, "puan"],
];

function iconFor(text: string): IconName {
  return ICON_RULES.find(([re]) => re.test(text))?.[1] ?? "calisma";
}

/**
 * Dil Kursu · "… Derslerinde Eğitim Modelimiz" — UI turu (2026-09-25,
 * kullanıcı seçimi "A"): maddeler bir çemberin üstünde; bir ışık çember
 * boyunca döner, her adım sırayla vurgulanır (yalnız transform/renk;
 * reduced-motion'da durur). Madde sayısı dile göre 4–5 — konumlar sayıdan
 * hesaplanır. Solda başlık, sağda çember; mobilde aynı liste dikey, kesik
 * çizgiyle bağlı.
 */
export function TeachingCycle({
  kicker,
  title,
  intro,
  items,
}: {
  kicker: string;
  title: string;
  intro: string;
  items: string[];
}) {
  const n = items.length;
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        <SectionHeading kicker={kicker} title={title} lead={intro} />
        <div className={styles.stage}>
          <div className={styles.ring} aria-hidden="true">
            <span className={styles.orbit} />
            <span className={styles.core}>
              <Icon name="konusma" size={40} strokeWidth={1.6} />
            </span>
          </div>
          <ol className={styles.steps} style={{ "--n": n } as CSSProperties}>
            {items.map((item, i) => {
              const angle = -90 + (360 / n) * i;
              const rad = (angle * Math.PI) / 180;
              return (
                <li
                  className={styles.step}
                  key={item}
                  style={
                    {
                      "--i": i,
                      "--x": `${(50 + 40 * Math.cos(rad)).toFixed(2)}%`,
                      "--y": `${(50 + 40 * Math.sin(rad)).toFixed(2)}%`,
                    } as CSSProperties
                  }
                >
                  <span className={styles.icon} aria-hidden="true">
                    <Icon name={iconFor(item)} size={24} strokeWidth={1.7} />
                  </span>
                  <span className={styles.label}>{item}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
