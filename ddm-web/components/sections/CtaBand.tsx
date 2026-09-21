import Link from "next/link";
import type { NavLink } from "@/lib/types";
import { ButtonLink } from "@/components/ui";
import styles from "@/styles/CtaBand.module.css";

/**
 * Alt CTA şeridi — lacivert yuvarlak panel. Ana Sayfa'da doğdu, Dil Kursu
 * şablonunun 11. bölümüyle birebir örtüşüyor → Faz 6.4+'ta yeniden kullanılacak.
 *
 * Kaynak: `DDM Ana Sayfa.dc.html` bölüm 11.
 */
type CtaBandProps = {
  id?: string;
  title: string;
  sub?: string;
  primary: NavLink;
  secondary?: NavLink;
  /** Şeridin oturduğu zemin — Ana Sayfa'da açık gri, iç sayfalarda beyaz olabilir. */
  ground?: "light" | "gray";
};

export function CtaBand({ id, title, sub, primary, secondary, ground = "gray" }: CtaBandProps) {
  return (
    <section id={id} className={ground === "light" ? styles.sectionLight : styles.section}>
      <div className={styles.panel}>
        <div className={styles.copy}>
          <span className={styles.title}>{title}</span>
          {sub && <span className={styles.sub}>{sub}</span>}
        </div>
        <div className={styles.actions}>
          {primary.href && (
            <ButtonLink href={primary.href} variant="onDark" size="lg" arrow>
              {primary.label}
            </ButtonLink>
          )}
          {secondary &&
            (secondary.href ? (
              <Link href={secondary.href} className={styles.secondary}>
                {secondary.label}
              </Link>
            ) : (
              <span className={styles.secondaryInert}>{secondary.label}</span>
            ))}
        </div>
      </div>
    </section>
  );
}
