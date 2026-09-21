import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui";
import styles from "@/styles/PageSection.module.css";

/**
 * İç sayfa bölüm iskeleti — zemin (beyaz/gri) + 1320px kapsayıcı + başlık
 * bloğu (`SectionHeading` ile birebir aynı) + isteğe bağlı sağ üst `aside`
 * (ör. filtre çipleri) + gövde.
 *
 * Kaynak: `DDM Dil Kursu Sayfası.dc.html`nin TÜM bölümleri aynı iskeleti
 * paylaşıyor (bkz. plan §7). Faz 6.5/6.6 aynı bileşeni kullanacak.
 */
export function PageSection({
  id,
  ground = "light",
  kicker,
  title,
  lead,
  headingSize = "md",
  aside,
  children,
}: {
  id?: string;
  /** "light" = beyaz zemin · "gray" = açık gri zemin — bölümler arası ritim. */
  ground?: "light" | "gray";
  kicker?: string;
  title: string;
  lead?: string | null;
  headingSize?: "md" | "sm" | "xs";
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className={ground === "gray" ? styles.sectionGray : styles.sectionLight}>
      <div className={styles.container}>
        <div className={styles.headRow}>
          <SectionHeading kicker={kicker} title={title} lead={lead} size={headingSize} />
          {aside && <div className={styles.aside}>{aside}</div>}
        </div>
        {children}
      </div>
    </section>
  );
}
