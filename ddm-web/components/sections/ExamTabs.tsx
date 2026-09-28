"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";

import { Marked } from "./ExamText";
import styles from "@/styles/ExamRows.module.css";

export type ExamTabGroup = { title: string; items: string[] };

/**
 * Uzun aday grubu listeleri için sekmeler (YDS "Kimler girmeli"). Tüm paneller
 * HTML'de durur (arama motoru ve JS'siz okuyucu hepsini görür); yalnız biri
 * açık. Klavye: ←/→, Home/End (WAI-ARIA sekme deseni).
 */
export function ExamTabs({ groups }: { groups: ExamTabGroup[] }) {
  const [active, setActive] = useState(0);
  const base = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const move = (to: number) => {
    const next = (to + groups.length) % groups.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowRight") move(active + 1);
    else if (e.key === "ArrowLeft") move(active - 1);
    else if (e.key === "Home") move(0);
    else if (e.key === "End") move(groups.length - 1);
    else return;
    e.preventDefault();
  };

  return (
    <div className={styles.tabs}>
      <div className={styles.tabList} role="tablist">
        {groups.map((g, i) => (
          <button
            key={g.title}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${base}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${base}-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            className={styles.tab}
            onClick={() => setActive(i)}
            onKeyDown={onKey}
          >
            {g.title}
          </button>
        ))}
      </div>
      {groups.map((g, i) => (
        <div
          key={g.title}
          role="tabpanel"
          id={`${base}-panel-${i}`}
          aria-labelledby={`${base}-tab-${i}`}
          hidden={i !== active}
          tabIndex={0}
          className={styles.tabPanel}
        >
          <ul className={styles.bullets}>
            {g.items.map((item) => (
              <li key={item}>
                <Marked text={item} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
