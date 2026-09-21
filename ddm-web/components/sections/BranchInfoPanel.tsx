import { Icon } from "@/components/graphics/Icon";
import { ImageSlot } from "@/components/ui/Primitives";
import type { Branch } from "@/lib/types";
import styles from "@/styles/BranchInfoPanel.module.css";

/**
 * Şube bilgileri paneli — iletişim kartı + 2 görsel yuvası.
 *
 * Kaynak: `DDM Şube Kurs Tarihi Sayfası.dc.html` bölüm 7 (satır 444-483).
 * `ContactFormCard` bir FORM (Faz 6.5), bu bir BİLGİ paneli — ayrı bileşen.
 *
 * CLAUDE.md §5: eksik veri uydurulmaz. `branch.address`/`branch.phone`
 * `null` olduğunda "bekleniyor" gösterilir — `contactBranch()` yedeği
 * BİLİNÇLİ OLARAK kullanılmaz (branches.ts'in kendi notu: bu yedek şubeye
 * ÖZEL alanlarda yasak, yalnız site geneli iletişim noktalarında geçerli).
 * Şablonun uydurma "çalışma saatleri bekleniyor" / "ulaşım notu bekleniyor"
 * satırları (satır 1005-1006) — kaynakta hiç karşılığı yok, koda GİRMEDİ.
 */
export function BranchInfoPanel({ branch }: { branch: Branch }) {
  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <div className={styles.row}>
          <span className={styles.iconTile}>
            <Icon name="konum" size={19} strokeWidth={1.7} />
          </span>
          <span className={styles.textCol}>
            <span className={styles.label}>ADRES</span>
            <span className={branch.address ? styles.value : styles.valueMissing}>
              {branch.address ?? "adres bekleniyor"}
            </span>
          </span>
        </div>
        <div className={styles.row}>
          <span className={styles.iconTile}>
            <Icon name="telefon" size={19} strokeWidth={1.7} />
          </span>
          <span className={styles.textCol}>
            <span className={styles.label}>TELEFON</span>
            <span className={branch.phone ? styles.value : styles.valueMissing}>
              {branch.phone ?? "telefon bekleniyor"}
            </span>
          </span>
        </div>
        <div className={styles.row}>
          <span className={styles.iconTile}>
            <Icon name="mail" size={19} strokeWidth={1.7} />
          </span>
          <span className={styles.textCol}>
            <span className={styles.label}>E-POSTA</span>
            <span className={styles.value}>{branch.mail}</span>
          </span>
        </div>
      </div>

      <ImageSlot
        slot={{
          src: null,
          alt: `${branch.name} şubesi fotoğrafı`,
          ratio: "16/9",
          width: 1200,
          height: 675,
          hint: "opsiyonel",
        }}
        name="sube-foto"
        minHeight={240}
      />
      <ImageSlot
        slot={{
          src: null,
          alt: `${branch.name} şubesi konum haritası`,
          ratio: "16/9",
          width: 1200,
          height: 675,
          hint: "harita embed veya statik görsel",
        }}
        name="sube-harita"
        minHeight={240}
      />
    </div>
  );
}
