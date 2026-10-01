import { PageSection } from "./PageSection";
import { ExamSectionCard, type ExamSection } from "@/components/cards/ExamSectionCard";
import styles from "@/styles/ExamStructure.module.css";

/**
 * "SINAV YAPISI" bölümü — bölüm kartı ızgarası. Kart SAYISI `sections`
 * dizisinin uzunluğundan gelir, sabit 3 varsayımı yok (Boğaziçi 3, Özyeğin 4,
 * Yıldız Teknik 6, Koç/Acıbadem 0 — bu durumda bölüm hiç
 * render edilmez, bkz. çağıran sayfa).
 *
 * Kaynak: `DDM Üniversite Proficiency Sayfası.dc.html` bölüm 6.
 */
export function ExamStructure({
  title,
  lead,
  sections,
  detailIds,
  ground = "gray",
}: {
  title: string;
  /** "BÜYES/BUEPT üç bölümden oluşmaktadır." — kaynakta birebir geçiyorsa;
   *  yoksa null (uydurma özet yazılmaz). */
  lead: string | null;
  sections: ExamSection[];
  /** Her kartın "Bölüm detayını oku" linkinin hedefi — index'e göre eşlenir;
   *  o index'te detay bloğu yoksa null → `#iletisim`e düşer. */
  detailIds: (string | null)[];
  /** Varsayılan gri (6.5). P2 sınav sayfaları zemin ritmine göre verir. */
  ground?: "light" | "gray";
}) {
  return (
    <PageSection id="sinav-yapisi" ground={ground} kicker="SINAV YAPISI" title={title} lead={lead}>
      <ExamSectionGrid sections={sections} detailIds={detailIds} />
    </PageSection>
  );
}

/** Kart ızgarasının kendisi — sınav sayfası satırı (`ExamRows`) bölüm kabuğu olmadan kullanır. */
export function ExamSectionGrid({ sections, detailIds }: { sections: ExamSection[]; detailIds: (string | null)[] }) {
  return (
    <div className={styles.grid}>
      {sections.map((section, i) => (
        <ExamSectionCard
          key={section.name}
          num={i + 1}
          section={section}
          anchor={detailIds[i] ? `#${detailIds[i]}` : null}
        />
      ))}
    </div>
  );
}
