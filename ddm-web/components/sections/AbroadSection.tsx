import Link from "next/link";
import Image from "next/image";
import { Kicker, ButtonLink } from "@/components/ui";
import { UiIcon } from "@/components/graphics/Icon";
import { ABROAD_SECTION } from "@/data/home";
import styles from "@/styles/AbroadSection.module.css";

/**
 * Bölüm 4 · Yurtdışı eğitim.
 * Kaynak: `DDM Ana Sayfa.dc.html` bölüm 4.
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
            <div className={styles.badges}>
              {accreditations.map((name) => (
                <span className={styles.badge} key={name}>
                  <span className={styles.dot} aria-hidden="true" />
                  {name}
                </span>
              ))}
              <span className={styles.note}>{accreditationNote}</span>
            </div>
          </div>
          <ButtonLink href={cta.href} variant="primary" size="lg" arrow="chip" className={styles.cta}>
            {cta.label}
          </ButtonLink>
        </div>

        <div className={styles.side}>
          <div className={styles.media}>
            <Image
              src={image.src}
              alt={image.hint}
              fill
              sizes="(min-width: 900px) 44vw, 92vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={styles.programs}>
            <Kicker tone="dark">{panelTitle}</Kicker>
            <div className={styles.programList}>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
