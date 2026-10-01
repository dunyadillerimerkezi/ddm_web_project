import { Kicker } from "@/components/ui";
import { BranchCard } from "@/components/cards/BranchCard";
import { BRANCH_SECTION } from "@/data/home";
import styles from "@/styles/BranchSection.module.css";

/**
 * Bölüm 6 · Şubeler.
 *
 * Kaynak: `DDM Ana Sayfa.dc.html` bölüm 6. Şablondaki başlık satırının
 * sağındaki "Kart görseli 4:5 · 800×1000 · ..." metni tasarım-zamanı belge
 * notuydu (gerçek içerik değil) — koda taşınmadı.
 */
export function BranchSection() {
  const { kicker, title, lead, cards } = BRANCH_SECTION;

  return (
    <section id="subeler" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <Kicker tone="dark">{kicker}</Kicker>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.lead}>{lead}</p>
        </div>
        <div className={styles.grid}>
          {cards.map((branch) => (
            <BranchCard branch={branch} key={branch.href} />
          ))}
        </div>
      </div>
    </section>
  );
}
