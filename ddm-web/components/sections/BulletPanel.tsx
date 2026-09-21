import { Icon } from "@/components/graphics/Icon";
import type { IconName } from "@/components/graphics/icons";
import { PageSection } from "./PageSection";
import styles from "@/styles/BulletPanel.module.css";

/**
 * İkon + metin kart ızgarası (F/I blokları — "Neden DDM" ve "Eğitim
 * Modelimiz"). Kaynak: `DDM Dil Kursu Sayfası.dc.html` bölüm 6 "METODOLOJİ"
 * kart ızgarası (`method` listesi) — kartlar orada başlık+gövde taşıyor,
 * gerçek içerikte (F/I) her madde TEK cümle olduğu için başlıksız, yalnız
 * ikon + metin olarak render ediliyor.
 *
 * `icon` tüm kartlarda SABİT tek ikon — maddeler arasında anlam bazlı ikon
 * eşlemesi kaynakta yok, uydurulmaz; ikon salt dekoratif çerçeve (aria-hidden).
 */
export function BulletPanel({
  id,
  ground = "light",
  kicker,
  title,
  lead,
  icon,
  items,
}: {
  id?: string;
  ground?: "light" | "gray";
  kicker: string;
  title: string;
  lead?: string | null;
  icon: IconName;
  items: string[];
}) {
  return (
    <PageSection id={id} ground={ground} kicker={kicker} title={title} lead={lead}>
      <div className={ground === "gray" ? styles.gridOnGray : styles.gridOnLight}>
        {items.map((item) => (
          <div className={styles.card} key={item}>
            <span className={styles.iconWrap}>
              <Icon name={icon} size={25} strokeWidth={1.7} />
            </span>
            <p className={styles.text}>{item}</p>
          </div>
        ))}
      </div>
    </PageSection>
  );
}
