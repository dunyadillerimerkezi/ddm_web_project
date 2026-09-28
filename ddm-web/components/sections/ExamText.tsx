import type { ReactNode } from "react";

import styles from "@/styles/ExamRows.module.css";

/**
 * Sınav sayfası metin yardımcıları (UI turu 2026-09-28, "A · optik form").
 * Hepsi SUNUM: kelime eklenmez, silinmez, sırası değişmez — yalnız vurgulanır
 * ya da parçalanmış kaynak satırları yeniden birleştirilir.
 */

/** "60-75 puan", "4 ay", "80 soru", "180 dakikadır" — sayı + birim. Birim ekleri
 *  tek tek yazılı: "4 ayrı" gibi bir kelimeyi yakalamasın. */
const UNIT =
  "(?:puan(?:ı|lık)?|ay(?:lık)?|hafta(?:lık)?|saat(?:lik)?|dakika(?:dır|lık)?|dk|soru(?:dan|luk)?|kişi(?:lik)?|yıl(?:lık)?|gün|bölüm(?:den)?|kelime|ders)";
const NUMBER = "\\d+(?:[.,]\\d+)?(?:\\s?[-–]\\s?\\d+(?:[.,]\\d+)?)?";
const FIGURE = new RegExp(`(?<![\\p{L}\\d])${NUMBER}\\s${UNIT}(?![\\p{L}])`, "gu");

/** Metindeki sayı + birim ifadelerini işaretler (metin aynen kalır). */
export function Marked({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(FIGURE)) {
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    out.push(
      <mark key={at} className={styles.mark}>
        {m[0]}
      </mark>,
    );
    last = at + m[0].length;
  }
  if (last === 0) return text;
  out.push(text.slice(last));
  return <>{out}</>;
}

/** Kaynakta satır sonunda bölünmüş cümleleri birleştirir: küçük harfle başlayan
 *  satır bir öncekinin devamıdır ("ais.osym.gov.tr" + "adresinde yayımlanır.").
 *  `colon`: iki noktayla biten kısa satırı da sonrakiyle birleştir (düz metinde). */
export function joinFragments(lines: string[], colon = false): string[] {
  const out: string[] = [];
  for (const line of lines) {
    const prev = out.at(-1);
    const continues = /^[a-zçğıöşü]/.test(line) || (colon && prev !== undefined && prev.endsWith(":"));
    if (prev !== undefined && continues) out[out.length - 1] = `${prev} ${line}`;
    else out.push(line);
  }
  return out;
}

/** Kaynakta paragraf olarak duran kısa soru satırı → alt başlık. */
export function isQuestion(line: string): boolean {
  return line.length <= 90 && line.endsWith("?");
}

/** "Dinleme: 4 bölüm, 40 soru" → etiket + değer. Etiket kısa olmalı (≤ 6 kelime). */
export function splitLabel(line: string): { label: string | null; text: string } {
  const at = line.indexOf(":");
  if (at < 3 || at > 45) return { label: null, text: line };
  const label = line.slice(0, at).trim();
  const text = line.slice(at + 1).trim();
  if (!text || label.split(/\s+/).length > 6 || /https?|www\./.test(label)) return { label: null, text: line };
  return { label, text };
}
