"use client";

import { useState } from "react";
import { ProgressTrack, type ProgressStep } from "@/components/ui/ProgressTrack";
import { LevelPanel } from "./LevelPanel";
import type { LevelGroup } from "@/lib/types";
import styles from "@/styles/LevelExplorer.module.css";

/**
 * Bölüm 5 · Seviyeler — 6 nokta / 3 grup çubuk + aktif grup paneli.
 *
 * TEK istemci adası (`"use client"`, bkz. plan §7): yalnız aktif grup
 * durumu burada tutulur. Diğer bileşenler (`ProgressTrack`, `LevelPanel`)
 * kendileri "use client" değildir. TÜM grup panelleri her zaman DOM'dadır
 * (`hidden` ile gizlenir) — JS kapalıyken de 3 grubun metni HTML'de kalır.
 */
export function LevelExplorer({
  groups,
  idPrefix,
  label,
}: {
  groups: LevelGroup[];
  idPrefix: string;
  label: string;
}) {
  const [activeGroup, setActiveGroup] = useState(0);

  const steps: ProgressStep[] = groups.flatMap((g, gi) =>
    g.range.split("–").map((code) => ({ code: code.trim(), groupIndex: gi, groupLabel: g.name })),
  );

  return (
    <div className={styles.explorer}>
      <ProgressTrack
        steps={steps}
        activeIndex={steps.findIndex((s) => s.groupIndex === activeGroup)}
        onSelect={(i) => setActiveGroup(steps[i].groupIndex)}
        idPrefix={idPrefix}
        label={label}
      />
      {groups.map((g, gi) => (
        <LevelPanel
          key={g.name}
          id={`${idPrefix}-panel-${gi}`}
          labelledBy={`${idPrefix}-tab-${gi}`}
          hidden={gi !== activeGroup}
          range={g.range}
          group={g}
        />
      ))}
    </div>
  );
}
