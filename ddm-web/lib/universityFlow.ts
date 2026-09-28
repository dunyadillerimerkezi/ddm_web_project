/**
 * Proficiency üniversite hero'sundaki "sınav akışı" kartının modeli (UI turu
 * 2026-09-28, kullanıcı: "A · sınav akışı"). Doğrulanmış güncel bilgi varsa
 * (`data/universityExams.ts`) ondan, yoksa sayfanın kendi sınav bölümü kartlarından
 * (`UniversityPage.sections`, kaynak metinden) türetilir — rakam uydurulmaz:
 * oran yalnız her bölümde aynı türden bir sayı (yüzde / puan / dakika) varsa çizilir.
 */

import type { ExamSection } from "@/components/cards/ExamSectionCard";
import type { ExamFact } from "@/data/examGlance";
import type { UniversityExamInfo } from "@/data/universityExams";

export type FlowStep = {
  name: string;
  note: string | null;
  /** 0–1 arası çubuk oranı (en büyük bölüm = 1). null → çubuk yok. */
  share: number | null;
  label: string | null;
};

export type UniversityFlow = {
  exam: string;
  steps: FlowStep[];
  facts: ExamFact[] | null;
  source: string | null;
  checked: string | null;
};

type Measure = { value: number; label: string };

/** Bir bölümün rozetlerinden tek bir ölçü: önce yüzde, sonra puan, sonra dakika. */
function measure(section: ExamSection, kind: "pct" | "pts" | "min"): Measure | null {
  const texts = section.parts.flatMap((p) => p.meta.filter((m) => !m.missing).map((m) => m.text));
  for (const t of texts) {
    const m =
      kind === "pct" ? t.match(/%\s?(\d+)/) : kind === "pts" ? t.match(/^(\d+)\s*puan$/) : t.match(/^(?:toplam\s)?~?(\d+)\s*dk$/);
    if (m) return { value: Number(m[1]), label: kind === "pct" ? `%${m[1]}` : kind === "pts" ? `${m[1]} puan` : `${m[1]} dk` };
  }
  return null;
}

function withShares(steps: (Omit<FlowStep, "share"> & { value: number | null })[]): FlowStep[] {
  const values = steps.map((s) => s.value);
  const complete = values.every((v): v is number => v !== null && v > 0);
  const max = complete ? Math.max(...values) : 0;
  return steps.map(({ value, ...s }) => ({ ...s, share: complete && value !== null ? value / max : null, label: complete ? s.label : null }));
}

function noteOf(section: ExamSection): string | null {
  const texts = section.parts.flatMap((p) => p.meta.filter((m) => !m.missing).map((m) => m.text));
  return section.skill ?? (texts.length > 0 ? texts.slice(0, 2).join(" · ") : null);
}

export function universityFlow(
  examName: string,
  sections: ExamSection[],
  info: UniversityExamInfo | null,
): UniversityFlow | null {
  if (info) {
    return {
      exam: info.exam,
      steps: withShares(info.parts.map((p) => ({ name: p.name, note: p.note, label: p.weightLabel, value: p.weight }))),
      facts: info.facts,
      source: info.source,
      checked: info.checked,
    };
  }
  if (sections.length === 0) return null;
  // Aynı türden ölçü tüm bölümlerde varsa oran çizilir; karışıksa yalnız liste.
  const kinds = ["pct", "pts", "min"] as const;
  const kind = kinds.find((k) => sections.every((s) => measure(s, k) !== null)) ?? null;
  return {
    exam: examName,
    steps: withShares(
      sections.map((s) => {
        const m = kind ? measure(s, kind) : null;
        return { name: s.name, note: noteOf(s), label: m?.label ?? null, value: m?.value ?? null };
      }),
    ),
    facts: null,
    source: null,
    checked: null,
  };
}
