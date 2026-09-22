import Link from "next/link";
import { Icon, UiIcon } from "@/components/graphics/Icon";
import type { Branch } from "@/lib/types";
import styles from "@/styles/BranchTile.module.css";

/**
 * `/ddm-iletisim` hub grid kartı (P1) — şube adı + adres + telefon +
 * "Detaylı Bilgi" linki. `BranchInfoPanel`den daha hafif: hub'da 5 şube
 * yan yana durduğu için 2 görsel yuvası (foto/harita) burada TEKRARLANMIYOR,
 * onlar şubenin kendi sayfasında (`BranchInfoPanel`) zaten var.
 */
export function BranchTile({ branch }: { branch: Branch }) {
  return (
    <Link href={branch.href} className={styles.card}>
      <span className={styles.kicker}>{branch.kicker}</span>
      <h3 className={styles.name}>{branch.name}</h3>

      {branch.address && (
        <span className={styles.row}>
          <Icon name="konum" size={16} strokeWidth={1.7} className={styles.icon} />
          {branch.address}
        </span>
      )}
      {branch.phone && (
        <span className={styles.row}>
          <Icon name="telefon" size={16} strokeWidth={1.7} className={styles.icon} />
          {branch.phone}
        </span>
      )}

      <span className={styles.cta}>
        Detaylı Bilgi
        <UiIcon name="arrowRight" size={14} strokeWidth={1.6} />
      </span>
    </Link>
  );
}
