import { ButtonLink } from "@/components/ui";
import { PageSection } from "./PageSection";
import type { PricingBlock } from "@/lib/types";
import styles from "@/styles/PricingPanel.module.css";

/** Bölüm 8 · Fiyatlandırma (J) — 2 plan kartı + KDV/şube notları. */
export function PricingPanel({
  id,
  ground = "light",
  kicker,
  pricing,
  ctaLabel,
  ctaHref,
}: {
  id?: string;
  ground?: "light" | "gray";
  kicker: string;
  pricing: PricingBlock;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <PageSection id={id} ground={ground} kicker={kicker} title={pricing.title}>
      <div className={styles.plans}>
        {pricing.plans.map((plan) => (
          <div className={styles.plan} key={plan.label}>
            <p className={styles.label}>{plan.label}</p>
            <p className={styles.price}>{plan.price}</p>
            <ButtonLink href={ctaHref} variant="primary" size="sm" arrow block>
              {ctaLabel}
            </ButtonLink>
          </div>
        ))}
      </div>
      {pricing.notes.length > 0 && (
        <ul className={styles.notes}>
          {pricing.notes.map((note) => (
            <li className={styles.note} key={note}>
              {note}
            </li>
          ))}
        </ul>
      )}
    </PageSection>
  );
}
