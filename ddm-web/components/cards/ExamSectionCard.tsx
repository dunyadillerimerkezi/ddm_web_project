import Link from "next/link";
import { Icon } from "@/components/graphics/Icon";
import type { IconName } from "@/components/graphics/icons";
import styles from "@/styles/ExamSectionCard.module.css";

export type ExamMeta = {
  /** "sure" · "soru" · "kisim" · "puan" — rozet ikonu. */
  icon: "sure" | "soru" | "kisim" | "puan";
  /** Rozet metni, kaynaktan birebir (en-dash: "8–10 soru"). */
  text: string;
  /** true → sayısal olgu kaynakta yok, amber "veri bekleniyor" rozeti. */
  missing?: boolean;
};

/** `title: ""` → parça başlığı basılmaz, yalnız rozetler (P2 sınav kartları). */
export type ExamPart = { title: string; meta: ExamMeta[] };

export type ExamSection = {
  name: string;
  /** Alt satır — kaynakta geçen beceri adı; yoksa null (satır basılmaz). */
  skill: string | null;
  icon: IconName;
  parts: ExamPart[];
};

/**
 * "SINAV YAPISI" bölüm kartı — `BÖLÜM n` kicker + ad + beceri alt satırı +
 * parça listesi (rozetli) + "Bölüm detayını oku" linki.
 *
 * Kaynak: `DDM Üniversite Proficiency Sayfası.dc.html` bölüm 6. Sayı ve ad
 * üniversiteye göre değişir — bu yüzden `num`/`section` her zaman dışarıdan
 * gelir, sabit "3 bölüm" varsayımı yok (bkz. plan §6 "SINAV YAPISI").
 */
export function ExamSectionCard({
  num,
  section,
  anchor,
}: {
  num: number;
  section: ExamSection;
  /** null → detay bloğu yok, link basılmaz. */
  anchor: string | null;
}) {
  return (
    <article className={styles.card}>
      <div className={styles.headRow}>
        <span className={styles.iconTile}>
          <Icon name={section.icon} size={26} strokeWidth={1.7} />
        </span>
      </div>

      <div className={styles.titleBlock}>
        <span className={styles.kicker}>{`BÖLÜM ${num}`}</span>
        <h3 className={styles.name}>{section.name}</h3>
        {section.skill && <span className={styles.skill}>{section.skill}</span>}
      </div>

      <div className={styles.parts}>
        {section.parts.map((part, i) => (
          <div className={styles.part} key={part.title || i}>
            {part.title && <span className={styles.partTitle}>{part.title}</span>}
            <div className={styles.metaRow}>
              {part.meta.map((m) => (
                <span
                  className={m.missing ? styles.metaChipMissing : styles.metaChip}
                  key={`${part.title}-${m.text}`}
                >
                  <Icon name={m.icon} size={12} strokeWidth={1.8} />
                  {m.text}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Detay bloğu olmayan kart link taşımaz — "Bölüm detayını oku" iletişime gitmesin (UI turu 2026-09-28). */}
      {anchor && (
        <Link href={anchor} className={styles.footerLink}>
          Bölüm detayını oku
        </Link>
      )}
    </article>
  );
}
