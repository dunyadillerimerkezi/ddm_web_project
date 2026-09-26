import styles from "@/styles/GuideBody.module.css";

const DATE_FORMAT = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** "Son güncelleme: 26 Eylül 2026" — P4 sayfalarında genel bilginin gözden geçirildiği gün. */
export function UpdatedDate({ updated }: { updated: string }) {
  return (
    <>
      Son güncelleme: <time dateTime={updated}>{DATE_FORMAT.format(new Date(updated))}</time>
    </>
  );
}

/** P4 nedir + tekil sayfaların sonundaki kaynak listesi ve son güncelleme tarihi. */
export function SourcesFooter({ sources, updated, className }: { sources: string[]; updated: string; className: string }) {
  return (
    <footer className={className}>
      {sources.length > 0 && (
        <>
          <p className={styles.sourcesTitle}>Kaynaklar</p>
          <ul className={styles.sourceList}>
            {sources.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </>
      )}
      <p className={styles.updated}>
        <UpdatedDate updated={updated} />
      </p>
    </footer>
  );
}
