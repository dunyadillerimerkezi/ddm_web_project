import styles from "@/styles/BranchMap.module.css";

/**
 * P6 — şube haritası (kullanıcı, 2026-09-28: "harita açık gelsin, haritayı aç butonu olmasın, yol tarifi kalsın").
 * Google Haritalar gömmesi `loading="lazy"`: tarayıcı haritayı ancak kullanıcı bölüme yaklaşınca yükler, sayfa açılışını
 * yavaşlatmaz. "Yol tarifi al" bağlantısı haritanın altında durur. Dış domain CLAUDE.md §4 kapsamı dışında.
 */
export function BranchMap({ query, directionsHref, label }: { query: string; directionsHref: string; label: string }) {
  return (
    <div className={styles.map}>
      <div className={styles.frame}>
        <iframe
          className={styles.iframe}
          title={label}
          src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <a className={styles.directions} href={directionsHref} target="_blank" rel="noopener noreferrer">
        Yol tarifi al
      </a>
    </div>
  );
}
