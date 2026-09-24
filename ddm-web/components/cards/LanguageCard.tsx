import Link from "next/link";
import Image from "next/image";
import { Flag } from "@/components/graphics/Flag";
import { UiIcon } from "@/components/graphics/Icon";
import type { LanguageCard as LanguageCardData } from "@/data/home";
import styles from "@/styles/LanguageCard.module.css";

/**
 * Dil kursları ızgarası — UI turu (2026-09-24, kullanıcı seçimi "4A").
 *
 * `LanguageTile`: tam fotoğraf kutusu; başlıktaki düğme kutunun tamamını
 * kaplar ve o dilin paneline bağlanır (disclosure: aria-expanded/controls).
 * `LanguagePanel`: seçili dilin "Program detayları" bağlantıları. Tüm
 * panellerin bağlantıları HTML'de durur (SEO), yalnız seçili olan görünür —
 * böylece aynı kalıptaki 10×5 bağlantı ekranda üst üste yığılmaz.
 *
 * Kaynak: `DDM Ana Sayfa.dc.html` bölüm 5.
 */
export function LanguageTile({
  card,
  panelId,
  active,
  onSelect,
  order,
}: {
  card: LanguageCardData;
  panelId: string;
  active: boolean;
  onSelect: () => void;
  order: number;
}) {
  return (
    <article className={active ? `${styles.tile} ${styles.tileActive}` : styles.tile} style={{ order }}>
      <div className={styles.media}>
        <Image
          src={card.image.src}
          alt={`${card.title} — ${card.image.hint}`}
          fill
          sizes="(min-width: 900px) 19vw, (min-width: 600px) 31vw, 46vw"
          className={styles.image}
        />
      </div>
      <div className={styles.body}>
        {card.flag && (
          <span className={styles.flag}>
            <Flag code={card.flag} width={30} />
          </span>
        )}
        <h3 className={styles.title}>
          <button
            type="button"
            className={styles.trigger}
            aria-expanded={active}
            aria-controls={panelId}
            onClick={onSelect}
          >
            {card.title}
          </button>
        </h3>
        <span className={styles.hint} aria-hidden="true">
          Program detayları
          <UiIcon name="caretDown" size={10} strokeWidth={1.8} className={styles.caret} />
        </span>
      </div>
    </article>
  );
}

export function LanguagePanel({
  card,
  id,
  active,
}: {
  card: LanguageCardData;
  id: string;
  active: boolean;
}) {
  return (
    <div id={id} className={styles.panel} hidden={!active}>
      <Link href={card.href} className={styles.panelTitle}>
        {card.flag && <Flag code={card.flag} width={30} className={styles.panelFlag} />}
        {card.title}
        <UiIcon name="arrowRight" size={16} strokeWidth={1.7} />
      </Link>
      <ul className={styles.linkList}>
        {card.links.map((link) => (
          <li key={link.label}>
            {link.href ? (
              <Link href={link.href} className={styles.link}>
                {link.label}
              </Link>
            ) : (
              <span className={styles.linkInert}>{link.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
