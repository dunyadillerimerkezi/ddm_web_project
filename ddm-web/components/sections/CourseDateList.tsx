import Link from "next/link";
import { PageSection } from "@/components/sections/PageSection";
import { Icon, UiIcon } from "@/components/graphics/Icon";
import type { IconName } from "@/components/graphics/icons";
import type { LinkRowItem } from "@/lib/types";
import styles from "@/styles/CourseDateList.module.css";

/** Şube dışı bağlantılar metnine göre kendi ikonunu alır; şubeler konum ikonu. */
const EXTRA_ICONS: [RegExp, IconName][] = [
  [/özel ders/i, "ozelders"],
  [/konuşma/i, "konusma"],
  [/hızlandırılmış/i, "sure"],
  [/seviye/i, "mezuniyet"],
];

function extraIcon(label: string): IconName {
  return EXTRA_ICONS.find(([re]) => re.test(label))?.[1] ?? "takvim";
}

/**
 * Dil Kursu · "Şube ve kurs tarihleri" — UI turu (2026-09-25, kullanıcı
 * isteği): kartlar yerine alt alta tam genişlik satırlar; sağdaki ok ve
 * hover'da kayan satır tıklanabilir olduğunu belli eder. SSS'nin altında.
 * `href: null` → tıklanamaz düz satır, ok yok (CLAUDE.md §4).
 */
export function CourseDateList({
  id,
  kicker,
  title,
  branches,
  extras,
}: {
  id: string;
  kicker: string;
  title: string;
  branches: LinkRowItem[];
  extras: LinkRowItem[];
}) {
  const rows = [
    ...branches.map((item) => ({ item, icon: "konum" as IconName })),
    ...extras.map((item) => ({ item, icon: extraIcon(item.label) })),
  ];
  return (
    <PageSection id={id} ground="light" kicker={kicker} title={title}>
      <ul className={styles.list}>
        {rows.map(({ item, icon }) => {
          const inner = (
            <>
              <span className={styles.icon} aria-hidden="true">
                <Icon name={icon} size={20} strokeWidth={1.7} />
              </span>
              <span className={styles.label}>{item.label}</span>
              {item.href && (
                <span className={styles.go} aria-hidden="true">
                  <UiIcon name="arrowRight" size={15} strokeWidth={1.7} />
                </span>
              )}
            </>
          );
          return (
            <li key={item.label}>
              {item.href ? (
                <Link href={item.href} className={styles.row}>
                  {inner}
                </Link>
              ) : (
                <span className={`${styles.row} ${styles.inert}`}>{inner}</span>
              )}
            </li>
          );
        })}
      </ul>
    </PageSection>
  );
}
