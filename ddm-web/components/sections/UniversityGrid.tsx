"use client";

import Link from "next/link";
import { useState } from "react";
import { PageSection } from "./PageSection";
import styles from "@/styles/UniversityGrid.module.css";

export type UniversityIndexEntry = {
  slug: string;
  name: string;
  /** Elle atanmış baş harfler ("BÜ") — türetilmez, İ/ı ve çok kelimeli
   *  adlarda otomatik türetme bozulur (plan §6). */
  initials: string;
  /** null → kaynakta sınav kodu yok, kart gri "Proficiency" rozetine düşer. */
  examCode: string | null;
};

/**
 * "DİĞER ÜNİVERSİTELER" — 21 kart + Türkçe-duyarlı arama.
 *
 * Kaynak: `DDM Üniversite Proficiency Sayfası.dc.html` bölüm 11. Üniversite
 * arması/logosu KULLANILMAZ — rozet baş harf + sınav kodu pill'iyle temsil
 * edilir (plan §6).
 */
export function UniversityGrid({
  items,
  current,
}: {
  items: UniversityIndexEntry[];
  current: string;
}) {
  const [query, setQuery] = useState("");

  const q = query.trim().toLocaleLowerCase("tr");
  const filtered = q
    ? items.filter((u) => `${u.name} ${u.examCode ?? ""}`.toLocaleLowerCase("tr").includes(q))
    : items;

  return (
    <PageSection
      id="universiteler"
      ground="light"
      kicker="DİĞER ÜNİVERSİTELER"
      title="Üniversite Hazırlık Atlama Sınavları"
      aside={
        <label className={styles.search}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Üniversite veya sınav kodu ara"
            aria-label="Üniversite ara"
            className={styles.searchInput}
          />
        </label>
      }
    >
      <div className={styles.grid}>
        {filtered.map((u) => {
          const isCurrent = u.slug === current;
          return (
            <Link
              key={u.slug}
              href={`/sinav-hazirlik-egitimleri/proficiency-kursu/${u.slug}`}
              className={isCurrent ? styles.cardCurrent : styles.card}
              aria-current={isCurrent ? "page" : undefined}
            >
              <span className={styles.cardTop}>
                <span className={isCurrent ? styles.badgeCurrent : styles.badge}>{u.initials}</span>
                <span className={u.examCode ? (isCurrent ? styles.codeCurrent : styles.code) : styles.codeMuted}>
                  {u.examCode ?? "Proficiency"}
                </span>
              </span>
              <span className={styles.name}>{u.name}</span>
            </Link>
          );
        })}
      </div>

      {q.length > 0 && filtered.length === 0 && (
        <p className={styles.noMatch}>
          “{query}” için sonuç bulunamadı. Aramayı temizleyip listeye göz atabilirsiniz.
        </p>
      )}
    </PageSection>
  );
}
