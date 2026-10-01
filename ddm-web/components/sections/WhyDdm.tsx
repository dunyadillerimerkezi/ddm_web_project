import { PageSection } from "@/components/sections/PageSection";
import { Icon } from "@/components/graphics/Icon";
import type { IconName } from "@/components/graphics/icons";
import styles from "@/styles/WhyDdm.module.css";

/** Madde metninden ikon — ilk eşleşen kazanır; hiçbiri tutmazsa belge. */
const ICON_RULES: [RegExp, IconName][] = [
  [/avrupa/i, "dunya"],
  [/sertifika/i, "belge"],
  [/online|yüz yüze/i, "grup"],
  [/öğretmen|eğitmen/i, "ozelders"],
  [/dijital|materyal|kaynak/i, "okuma"],
  [/esnek|saat/i, "saat"],
  [/dinleme|beceri/i, "dinleme"],
  [/konuşma/i, "konusma"],
  [/seviye|a1|kapsamlı/i, "mezuniyet"],
];

function iconFor(text: string): IconName {
  return ICON_RULES.find(([re]) => re.test(text))?.[1] ?? "belge";
}

/**
 * Dil Kursu · "Neden Dünya Dilleri Merkezi'ni Tercih Etmelisiniz?" — UI turu
 * (2026-09-25, kullanıcı seçimi "A"): solda lacivert kart (kaynak girişi +
 * kuruluştan bugüne geçen yıl büyük rakamla), sağda maddeler — her biri metnine göre
 * kendi ikonuyla (eskiden hepsi aynı belge ikonuydu).
 */
export function WhyDdm({
  kicker,
  title,
  intro,
  items,
  years,
}: {
  kicker: string;
  title: string;
  intro: string | null;
  items: string[];
  /** Kuruluştan bugüne geçen yıl (`data/company.ts` — 2003'ten hesaplanır, metinden okunmaz). */
  years: number;
}) {
  return (
    <PageSection ground="light" kicker={kicker} title={title}>
      <div className={styles.grid}>
        {intro && (
          <div className={styles.card}>
            <p className={styles.years} aria-hidden="true">
              {years}
              <span className={styles.yearsLabel}>yıl</span>
            </p>
            <p className={styles.intro}>{intro}</p>
          </div>
        )}
        <ul className={styles.items}>
          {items.map((item) => (
            <li className={styles.item} key={item}>
              <span className={styles.icon} aria-hidden="true">
                <Icon name={iconFor(item)} size={22} strokeWidth={1.7} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </PageSection>
  );
}
