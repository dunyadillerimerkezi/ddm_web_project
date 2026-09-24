import Image from "next/image";
import { Badge, ButtonLink } from "@/components/ui";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { HOME_HERO } from "@/data/home";
import styles from "@/styles/HomeHero.module.css";

/**
 * Ana Sayfa hero'su — lacivert zemin, rozet + tek h1 + lead + 3 kart.
 *
 * Kaynak: `DDM Ana Sayfa.dc.html` bölüm 1. H1 kararı (Faz 6.3 planı):
 * sayfada tek h1 burada; kaynaktaki dört ayrı h1 bilinçli olarak taşınmadı.
 *
 * UI turu (2026-09-24, kullanıcı seçimi "1B"): büyük kart tam fotoğraf +
 * alt katman üstünde yazı; sağda iki yatay kart (fotoğraf solda, kart
 * yüksekliğini doldurur). Bölüm header'ın arkasından başlar
 * (`--ddm-header-flow-h`) — menü lacivertin üstünde durur.
 */
export function HomeHero() {
  const { badge, h1, lead, primaryCard, featureCards } = HOME_HERO;
  const { slot } = primaryCard;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <Badge variant="accent">
            <span className={styles.dot} aria-hidden="true" />
            {badge}
          </Badge>
          <h1 className={styles.title}>{h1}</h1>
          <p className={styles.lead}>{lead}</p>
        </div>

        <div className={styles.grid}>
          <article className={styles.feature}>
            {slot.src && (
              <div className={styles.featureMedia}>
                <Image
                  src={slot.src}
                  alt={slot.alt}
                  fill
                  sizes="(min-width: 1000px) 52vw, 92vw"
                  priority
                  className={styles.featureImage}
                />
              </div>
            )}
            <div className={styles.featureBody}>
              <h2 className={styles.featureTitle}>{primaryCard.title}</h2>
              <p className={styles.featureText}>{primaryCard.text}</p>
              {primaryCard.cta.href && (
                <ButtonLink
                  href={primaryCard.cta.href}
                  variant="onDark"
                  size="lg"
                  arrow="chip"
                  className={styles.featureCta}
                >
                  {primaryCard.cta.label}
                </ButtonLink>
              )}
            </div>
          </article>

          <div className={styles.featureCol}>
            {featureCards.map((card) => (
              <FeatureCard
                key={card.title}
                slot={card.slot}
                title={card.title}
                text={card.text}
                cta={card.cta}
                as="h2"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
