import Link from "next/link";
import Image from "next/image";
import { Kicker, ButtonLink } from "@/components/ui";
import { UiIcon } from "@/components/graphics/Icon";
import { ABROAD_SECTION } from "@/data/home";
import styles from "@/styles/AbroadSection.module.css";

/**
 * Bölüm 4 · Yurtdışı eğitim.
 * Kaynak: `DDM Ana Sayfa.dc.html` bölüm 4.
 *
 * UI turu (2026-09-24, kullanıcı seçimi "3A" + logolar butonun üstünde):
 * programlar hap bağlantı; Kaplan/ILSC logoları CTA'nın hemen üstünde,
 * hafifçe süzülür; fotoğraf yavaşça yakınlaşır (reduced-motion'da durur).
 */
export function AbroadSection() {
  const { kicker, title, panelText, accreditations, accreditationNote, cta, image, panelTitle, items } =
    ABROAD_SECTION;

  return (
    <section id="yurtdisi" className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.copy}>
          <Kicker>{kicker}</Kicker>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.panel}>
            <p className={styles.panelText}>{panelText}</p>
          </div>

          <nav className={styles.programs} aria-label={panelTitle}>
            {items.map((item) =>
              item.href ? (
                <Link href={item.href} className={styles.programLink} key={item.label}>
                  {item.label}
                  <UiIcon name="arrowRight" size={14} strokeWidth={1.6} />
                </Link>
              ) : (
                <span className={styles.programLinkInert} key={item.label}>
                  {item.label}
                </span>
              ),
            )}
          </nav>

          <div className={styles.partners}>
            <div className={styles.logos}>
              {accreditations.map((partner) => (
                <span className={styles.logoTile} key={partner.name}>
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    sizes="180px"
                    className={partner.crop ? styles.logoCrop : styles.logoFit}
                  />
                </span>
              ))}
            </div>
            <span className={styles.note}>{accreditationNote}</span>
          </div>

          <ButtonLink href={cta.href} variant="primary" size="lg" arrow="chip" className={styles.cta}>
            {cta.label}
          </ButtonLink>
        </div>

        <div className={styles.media}>
          <Image
            src={image.src}
            alt={image.hint}
            fill
            sizes="(min-width: 900px) 46vw, 92vw"
            className={styles.photo}
          />
        </div>
      </div>
    </section>
  );
}
