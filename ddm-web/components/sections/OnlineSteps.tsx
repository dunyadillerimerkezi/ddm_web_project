import type { CSSProperties } from "react";

import { Icon } from "@/components/graphics/Icon";
import type { FlagCode } from "@/components/graphics/Flag";
import { CallCard } from "@/components/sections/CallCard";
import { Reveal } from "@/components/ui";
import type { IconName } from "@/components/graphics/icons";
import styles from "@/styles/OnlineSteps.module.css";

/**
 * P4 — online eğitim sayfalarının baskın bölümü (kullanıcı kararı, 2026-09-25):
 * "Online ders nasıl işler?" 4 adımlık akış + "Derse başlamadan önce" paneli
 * (liste + sağda dekoratif canlı ders penceresi, `CallCard`).
 *
 * Adım metinleri firma cümleleri (kaynaktan birebir, `lib/onlineContent.ts`);
 * adım başlıkları ve liste genel bilgi. Tek hareket: adımlar görünür alana girince
 * sırayla gelir ve her adım bir sonrakine giden çizgisini bir kez çizer (Reveal —
 * reduced-motion'da ve ekranda zaten görünen adımda hiçbir şey gizlenmez).
 */
export function OnlineSteps({
  id,
  title,
  lead,
  steps,
  checklist,
  call,
}: {
  id: string;
  title: string;
  lead: string;
  steps: { title: string; text: string; note: string | null }[];
  checklist: {
    title: string;
    items: { icon: IconName; label: string; text: string }[];
  };
  call: { flag: FlagCode | null; greeting: string };
}) {
  return (
    <section
      id={id}
      className={styles.section}
      aria-labelledby={`${id}-baslik`}
    >
      <div className={styles.container}>
        <h2 id={`${id}-baslik`} className={styles.title}>
          {title}
        </h2>
        <p className={styles.lead}>{lead}</p>

        <Reveal>
          <ol className={styles.track} style={{ "--steps": steps.length } as CSSProperties}>
            {steps.map((s, i) => (
              <li key={s.title} className={styles.step} data-reveal>
                <span className={styles.node} aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepText}>{s.text}</p>
                {s.note && <p className={styles.stepNote}>{s.note}</p>}
              </li>
            ))}
          </ol>
        </Reveal>

        <div className={styles.check}>
          <div className={styles.checkBody}>
            <h3 className={styles.checkTitle}>{checklist.title}</h3>
            <ul className={styles.checkList}>
              {checklist.items.map((item) => (
                <li key={item.label} className={styles.checkItem}>
                  <span className={styles.checkIcon}>
                    <Icon name={item.icon} size={22} />
                  </span>
                  <span>
                    <strong className={styles.checkLabel}>{item.label}</strong>
                    <span className={styles.checkText}>{item.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.checkCall}>
            <CallCard {...call} />
          </div>
        </div>
      </div>
    </section>
  );
}
