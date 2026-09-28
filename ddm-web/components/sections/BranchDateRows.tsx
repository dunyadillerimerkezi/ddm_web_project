import Link from "next/link";
import { Icon, UiIcon } from "@/components/graphics/Icon";
import { PageSection } from "./PageSection";
import styles from "@/styles/BranchDateRows.module.css";

export type BranchDateRow = {
  /** Kaynak satırı birebir: "Kadıköy Şubesi TOEFL Eğitim Plan Tablosu ve Kurs Tarihi". */
  label: string;
  /** null → hedef sayfa henüz yok (P4); satır tıklanabilir GÖRÜNMEZ. */
  href: string | null;
  /** Hedef sayfadaki gerçek program bilgisi: "Hafta içi · Hafta sonu · Birebir" vb. */
  meta: string[];
  /** "branch" → kurs takvimi sayfası; "link" → sayfa içi çapa / başka hedef. */
  kind?: "branch" | "link";
};

/**
 * Şube kurs tarihi satırları (P2) — `LinkRow`un ızgarasının aksine ALT ALTA,
 * tam genişlikte ve satırın tamamı link. Tıklanabilirlik tek bir ipucuna
 * (renk) değil dört ipucuna dayanır: kalıcı "Tarihleri gör" düğmesi, imleç,
 * hover/odakta sol aksan çizgisi + zemin tonu + başlık altı çizgisi, ve
 * `:focus-visible` halkası (globals.css). Satır yüksekliği ≥ 72px (dokunma
 * hedefi); hover'da hiçbir kutu boyutu değişmez (düzen kaymaz).
 *
 * Sol ikon kutusundaki takvim motifi hedefi anlatır: satır bir KURS TAKVİMİ
 * sayfasına gider. Hedefi olmayan satır (ör. "TOEFL Nedir?" — sayfası P4'te
 * gelecek) kesikli çerçeveli, soluk ve düğmesiz basılır.
 */
export function BranchDateRows({
  id,
  ground = "light",
  kicker,
  title,
  lead,
  rows,
}: {
  id?: string;
  ground?: "light" | "gray";
  kicker: string;
  title: string;
  /** Tüm şubelerde ORTAK olan program bilgisi — satırlarda tekrar etmesin diye. */
  lead?: string | null;
  rows: BranchDateRow[];
}) {
  return (
    <PageSection id={id} ground={ground} kicker={kicker} title={title} lead={lead}>
      <BranchDateList rows={rows} />
    </PageSection>
  );
}

/** Satır listesinin kendisi — sınav sayfası satırı (`ExamRows`) bölüm kabuğu olmadan kullanır. */
export function BranchDateList({ rows }: { rows: BranchDateRow[] }) {
  // Linkli satırlar önce; hedefi olmayanlar listenin sonunda bekler.
  const ordered = [...rows].sort((a, b) => Number(b.href !== null) - Number(a.href !== null));

  return (
    <ul className={styles.list}>
      {ordered.map((row) =>
        row.href ? (
          <li key={row.label}>
            <Link href={row.href} className={styles.row}>
              <span className={styles.rail} aria-hidden="true" />
              <span className={styles.iconTile} aria-hidden="true">
                <Icon name={row.kind === "link" ? "belge" : "takvim"} size={22} strokeWidth={1.7} />
              </span>
              <span className={styles.text}>
                <span className={styles.label}>{row.label}</span>
                {row.meta.length > 0 && <span className={styles.meta}>{row.meta.join(" · ")}</span>}
              </span>
              <span className={styles.action}>
                {row.kind === "link" ? "İncele" : "Tarihleri gör"}
                <UiIcon name="arrowRight" size={16} />
              </span>
            </Link>
          </li>
        ) : (
          <li key={row.label}>
            <div className={styles.rowPending}>
              <span className={styles.label}>{row.label}</span>
              <span className={styles.pendingNote}>Sayfa hazırlanıyor</span>
            </div>
          </li>
        ),
      )}
    </ul>
  );
}
