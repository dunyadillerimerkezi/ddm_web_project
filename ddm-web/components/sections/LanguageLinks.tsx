import Link from "next/link";
import { PageSection } from "@/components/sections/PageSection";
import { Flag, type FlagCode } from "@/components/graphics/Flag";
import { Icon, UiIcon } from "@/components/graphics/Icon";
import styles from "@/styles/LanguageLinks.module.css";

export type LanguageLinkItem = {
  label: string;
  href: string;
  flag: FlagCode | null;
  /** O dilde selamlama ("Hallo", "Bonjour") — `data/languages.ts`ten. */
  greeting: string;
};

/**
 * Dil Kursu · Diğer diller — UI turu (2026-09-25, kullanıcı seçimi "B"):
 * 3 kolon kart; bayrak + dil adı + o dilde selamlama; üzerine gelince ok kayar.
 */
export function LanguageLinks({
  kicker,
  title,
  items,
}: {
  kicker: string;
  title: string;
  items: LanguageLinkItem[];
}) {
  return (
    <PageSection ground="light" kicker={kicker} title={title}>
      <ul className={styles.grid}>
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={styles.card}>
              <span className={styles.flag} aria-hidden="true">
                {item.flag ? (
                  <Flag code={item.flag} width={40} />
                ) : (
                  <Icon name="sohbet" size={24} strokeWidth={1.7} />
                )}
              </span>
              <span className={styles.text}>
                <span className={styles.name}>{item.label}</span>
                <span className={styles.greeting} aria-hidden="true">
                  {item.greeting}
                </span>
              </span>
              <span className={styles.go} aria-hidden="true">
                <UiIcon name="arrowRight" size={15} strokeWidth={1.7} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </PageSection>
  );
}
