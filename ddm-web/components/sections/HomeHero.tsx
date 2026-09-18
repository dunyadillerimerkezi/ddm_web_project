import { Badge } from "@/components/ui";
import { MediaCard } from "@/components/cards/MediaCard";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { HOME_HERO } from "@/data/home";
import styles from "@/styles/HomeHero.module.css";

/**
 * Ana Sayfa hero'su — lacivert zemin, rozet + tek h1 + lead + 3 kart.
 *
 * Kaynak: `DDM Ana Sayfa.dc.html` bölüm 1. H1 kararı (Faz 6.3 planı):
 * sayfada tek h1 burada; kaynaktaki dört ayrı h1 bilinçli olarak taşınmadı.
 */
export function HomeHero() {
  const { badge, h1, lead, primaryCard, featureCards } = HOME_HERO;

  return (
    <section className={styles.section}>
      <div className={styles.glow} aria-hidden="true" />
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
          <MediaCard
            variant="hero"
            slot={primaryCard.slot}
            icon={primaryCard.icon}
            title={primaryCard.title}
            text={primaryCard.text}
            cta={primaryCard.cta}
            as="h2"
            priority
          />
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
