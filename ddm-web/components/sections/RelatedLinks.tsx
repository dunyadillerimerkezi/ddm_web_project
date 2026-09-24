import Link from "next/link";
import styles from "@/styles/RelatedLinks.module.css";

/**
 * P3 — sayfa sonu iç link ağı ("İlgili sayfalar"): kardeş hub'lar, en çok
 * aranan alt sayfalar, şube iletişim sayfaları.
 *
 * Yalnız ÜRETİLMİŞ hedefler gelmeli — çağıran `isProducedPage()` ile süzer;
 * boşalan öbek basılmaz. Bu bileşen link'siz satır basmaz (ölü link yok).
 */
export function RelatedLinks({
  title,
  groups,
}: {
  title: string;
  groups: { title: string; links: { label: string; href: string }[] }[];
}) {
  const visible = groups.filter((g) => g.links.length > 0);
  if (visible.length === 0) return null;

  return (
    <nav className={styles.section} aria-labelledby="ilgili-sayfalar">
      <div className={styles.container}>
        <h2 id="ilgili-sayfalar" className={styles.title}>
          {title}
        </h2>
        <div className={styles.groups}>
          {visible.map((g) => (
            <div key={g.title}>
              <h3 className={styles.groupTitle}>{g.title}</h3>
              <ul className={styles.list}>
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={styles.link}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
