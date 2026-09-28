import { Icon } from "@/components/graphics/Icon";
import type { IconName } from "@/components/graphics/icons";
import { PageSection } from "./PageSection";
import styles from "@/styles/FactCards.module.css";

export type FactCard = {
  icon: IconName;
  /** Kaynak satırının iki nokta öncesi: "TOEFL Belgesinin Geçerliliği". */
  label: string;
  /** İki nokta sonrası — kaynak metin birebir. */
  value: string;
};

/**
 * "Etiket: değer" biçimindeki kaynak satırlarını ikonlu bilgi kartlarına
 * ayırır (P2). `BulletPanel`den farkı: madde tek cümle değil, bir OLGU —
 * etiket kartın başlığı, değer gövdesi olur; böylece taranabilir olur.
 * Metin bölünür, YENİDEN YAZILMAZ.
 */
export function FactCards({
  id,
  ground = "light",
  kicker,
  title,
  lead,
  cards,
}: {
  id?: string;
  ground?: "light" | "gray";
  kicker: string;
  title: string;
  lead?: string | null;
  cards: FactCard[];
}) {
  return (
    <PageSection id={id} ground={ground} kicker={kicker} title={title} lead={lead}>
      <FactCardGrid cards={cards} />
    </PageSection>
  );
}

/** Kart ızgarasının kendisi — sınav sayfası satırı (`ExamRows`) bölüm kabuğu olmadan kullanır. */
export function FactCardGrid({ cards }: { cards: FactCard[] }) {
  return (
    <div className={styles.grid}>
      {cards.map((c) => (
        <article className={styles.card} key={c.label}>
          <span className={styles.iconTile}>
            <Icon name={c.icon} size={22} strokeWidth={1.7} />
          </span>
          <h3 className={styles.label}>{c.label}</h3>
          <p className={styles.value}>{c.value}</p>
        </article>
      ))}
    </div>
  );
}
