import Image from "next/image";
import { Kicker } from "@/components/ui";
import { Icon } from "@/components/graphics/Icon";
import type { LanguageBenefit } from "@/data/languageExtras";
import styles from "@/styles/LanguageBenefits.module.css";

/**
 * Dil Kursu · "Neden … Öğrenmelisiniz?" — hero'dan hemen sonraki bölüm.
 *
 * UI turu (2026-09-25, kullanıcı seçimi "A"): solda kaynak metin, sağda o dilin
 * şehir fotoğrafı (yavaş yakınlaşır) ve etrafında süzülen 4 fayda kartı.
 * Metin daha önce SSS'nin ilk sorusuydu; buraya taşındı (tekrar basılmaz).
 */
export function LanguageBenefits({
  kicker,
  title,
  paragraphs,
  photo,
  benefits,
}: {
  kicker: string;
  title: string;
  paragraphs: string[];
  photo: { src: string; alt: string };
  benefits: LanguageBenefit[];
}) {
  return (
    <section className={styles.section} id="neden">
      <div className={styles.grid}>
        <div className={styles.copy}>
          <Kicker>{kicker}</Kicker>
          <h2 className={styles.title}>{title}</h2>
          {paragraphs.map((p) => (
            <p className={styles.text} key={p}>
              {p}
            </p>
          ))}
        </div>

        <div className={styles.visual}>
          <div className={styles.media}>
            <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 900px) 46vw, 92vw" className={styles.photo} />
          </div>
          <ul className={styles.chips}>
            {benefits.map((b) => (
              <li className={styles.chip} key={b.label}>
                <span className={styles.chipIcon} aria-hidden="true">
                  <Icon name={b.icon} size={20} strokeWidth={1.7} />
                </span>
                {b.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
