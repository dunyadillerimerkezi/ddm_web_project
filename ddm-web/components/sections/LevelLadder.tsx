"use client";

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { PageSection } from "@/components/sections/PageSection";
import { Reveal } from "@/components/ui";
import { CEFR_CAN, CEFR_NAMES, type CefrKey } from "@/data/privateLessonsShared";
import type { LevelGroup } from "@/lib/types";
import styles from "@/styles/LevelLadder.module.css";

const LEVELS = Object.keys(CEFR_NAMES) as CefrKey[];

/** "A1 – A2" → ["A1","A2"]; "B1 – C1" gibi aralıklar da ara seviyeleri kapsar. */
function levelsInRange(range: string): CefrKey[] {
  const [from, to] = range.split(/[–-]/).map((s) => s.trim() as CefrKey);
  const a = LEVELS.indexOf(from);
  const b = LEVELS.indexOf(to ?? from);
  return a < 0 || b < 0 ? [] : LEVELS.slice(a, b + 1);
}

/**
 * Dil Kursu · Seviyeler — UI turu (2026-09-25, kullanıcı seçimi "A").
 *
 * A1…C2 altı basamak; her basamak ayrı seçilir (eskiden A1 ile A2 aynı kutuda
 * duruyordu). Basamak paneli o seviyenin CEFR "neler yapabilirsiniz" cümlesini
 * (P4 ile ortak, `data/privateLessonsShared.ts`), altındaki blok seviyenin ait
 * olduğu kaynak grubunu (Beginner/Intermediate/Advanced — intro + maddeler)
 * gösterir. Grup metni bir kez basılır; seviye değişince yalnız görünürlük değişir.
 *
 * Erişilebilir sekme deseni (ok tuşları / Home / End). Altı panelin ve üç
 * grubun HEPSİ HTML'de — seçili olmayanlar `hidden`.
 */
export function LevelLadder({
  id,
  kicker,
  title,
  groups,
}: {
  id: string;
  kicker: string;
  title: string;
  groups: LevelGroup[];
}) {
  const uid = useId();
  const [active, setActive] = useState<CefrKey>("A1");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const groupOf = (level: CefrKey) => groups.findIndex((g) => levelsInRange(g.range).includes(level));
  const activeGroup = groupOf(active);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = LEVELS.indexOf(active);
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? (i + 1) % LEVELS.length
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? (i - 1 + LEVELS.length) % LEVELS.length
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? LEVELS.length - 1
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(LEVELS[next]);
    tabRefs.current[next]?.focus();
  };

  return (
    <PageSection id={id} ground="gray" kicker={kicker} title={title}>
      <Reveal>
        <div className={styles.stairs} role="tablist" aria-label="Seviyeler" onKeyDown={onKey}>
          {LEVELS.map((level, i) => (
            <button
              key={level}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${uid}-tab-${level}`}
              aria-selected={active === level}
              aria-controls={`${uid}-panel-${level}`}
              tabIndex={active === level ? 0 : -1}
              className={active === level ? `${styles.step} ${styles.stepActive}` : styles.step}
              style={{ "--step": i } as CSSProperties}
              onClick={() => setActive(level)}
              data-reveal
            >
              <span className={styles.stepKey}>{level}</span>
              <span className={styles.stepName}>{CEFR_NAMES[level]}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <div className={styles.panel}>
        {LEVELS.map((level) => (
          <div
            key={level}
            role="tabpanel"
            id={`${uid}-panel-${level}`}
            aria-labelledby={`${uid}-tab-${level}`}
            hidden={active !== level}
            className={styles.levelPanel}
          >
            <span className={styles.levelKicker}>
              {level} · {CEFR_NAMES[level]}
            </span>
            <p className={styles.can}>{CEFR_CAN[level]}</p>
          </div>
        ))}

        {groups.map((g, i) => (
          <div key={g.range} className={styles.group} hidden={i !== activeGroup}>
            <div className={styles.groupHead}>
              <h3 className={styles.groupTag}>
                {g.range} · {g.name}
              </h3>
              <p className={styles.groupIntro}>{g.intro}</p>
            </div>
            <ul className={styles.groupList}>
              {g.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </PageSection>
  );
}
