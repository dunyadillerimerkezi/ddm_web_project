import { Icon } from "@/components/graphics/Icon";
import type { IconName } from "@/components/graphics/icons";
import { SectionHeading } from "@/components/ui";
import { StickyToc, type TocItem } from "@/components/layout/StickyToc";
import { ContactFormCard } from "./ContactFormCard";
import styles from "@/styles/DetailSections.module.css";

export type DetailSection = {
  id: string;
  icon: IconName;
  title: string;
  paragraphs: string[];
};

/**
 * "BÖLÜM DETAYLARI" — sol sütunda kaynak başlıkların tam metni, sağ aside'da
 * sticky içindekiler + iletişim formu.
 *
 * Kaynak: `DDM Üniversite Proficiency Sayfası.dc.html` bölüm 7. Üniversitede
 * hiç detay bloğu yoksa (Koç, Acıbadem, Süleyman Şah) bu bölüm çağıran
 * sayfada hiç render edilmez — ama iletişim formu HTML'in kusurunun aksine
 * o durumda da kaybolmaz (plan §2 kusur #3), form her zaman `#iletisim`
 * altında ayrıca basılıdır.
 */
export function DetailSections({ details }: { details: DetailSection[] }) {
  const tocItems: TocItem[] = details.map((d) => ({ id: d.id, label: d.title }));

  return (
    <section id="bolum-detaylari" className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.left}>
          <SectionHeading kicker="BÖLÜM DETAYLARI" title="Sınav bölümleri nasıl işliyor" />

          {details.map((d) => (
            <div id={d.id} className={styles.block} key={d.id}>
              <div className={styles.blockHead}>
                <span className={styles.iconTile}>
                  <Icon name={d.icon} size={21} strokeWidth={1.7} />
                </span>
                <h3 className={styles.blockTitle}>{d.title}</h3>
              </div>
              {d.paragraphs.map((p) => (
                <p className={styles.paragraph} key={p}>
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.aside}>
          <StickyToc items={tocItems} />
          <ContactFormCard />
        </div>
      </div>
    </section>
  );
}
