import Image from "next/image";
import { Kicker } from "@/components/ui";
import { VIDEO_SECTION } from "@/data/home";
import styles from "@/styles/VideoPromo.module.css";

/**
 * Bölüm 8 · Tanıtım videosu — YouTube'a dış link, hover'da kapak görseli
 * hafifçe büyür (saf CSS, JS gerekmez → server component).
 *
 * Kaynak: `DDM Ana Sayfa.dc.html` bölüm 8. CLAUDE.md §4 istisnası: bu bir
 * dış domain linki, `<a target="_blank" rel="noopener">` doğru kullanım.
 */
export function VideoPromo() {
  const { kicker, title, youtubeUrl, coverSrc, caption, sub } = VIDEO_SECTION;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <Kicker>{kicker}</Kicker>
          <h2 className={styles.title}>{title}</h2>
        </div>

        <a href={youtubeUrl} target="_blank" rel="noopener" className={styles.cover}>
          <Image
            src={coverSrc}
            alt="Dünya Dilleri Merkezi tanıtım videosu kapak görseli"
            fill
            sizes="(min-width: 1000px) 1000px, 92vw"
            className={styles.image}
          />
          <span className={styles.scrim} aria-hidden="true" />
          <span className={styles.playButton} aria-hidden="true">
            <svg width="25" height="29" viewBox="0 0 26 30" fill="currentColor">
              <path d="M25 15L0 30V0z" />
            </svg>
          </span>
          <span className={styles.pulseRing} aria-hidden="true" />
          <span className={styles.caption}>
            <span className={styles.captionTitle}>{caption}</span>
            <span className={styles.captionSub}>{sub}</span>
          </span>
        </a>
      </div>
    </section>
  );
}
