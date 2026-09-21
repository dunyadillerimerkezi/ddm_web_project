import { PageSection } from "./PageSection";
import styles from "@/styles/AboutCertification.module.css";

export type CertBox = { id?: string; title: string; body: string };

/**
 * Bölüm 4 · Hakkında + sertifika kutuları.
 *
 * Kaynak: `DDM Dil Kursu Sayfası.dc.html` "6 · METODOLOJİ" bölümünün alt
 * yarısı (`aboutP1..4` + üç bilgi kutusu) — yöntem kartları (F rolü) Adım
 * 4'te ayrı bir bölüme taşındığı için burada yalnız hakkında metni (B) ve
 * sertifika kutuları (D) kalıyor. Kutu başlıkları template'teki gibi
 * `{{ dilAdi }}` enterpolasyonlu SABİT etiketler — gövde metni değil.
 *
 * `id` — G (seviyeler) bölümü olmayan dillerde `#seviyeler` çıpası buraya
 * taşınır (bkz. plan §3 "Anchor sözleşmesi").
 */
export function AboutCertification({
  id,
  kicker,
  title,
  paragraphs,
  boxes,
}: {
  id?: string;
  kicker: string;
  title: string;
  paragraphs: string[];
  boxes: CertBox[];
}) {
  return (
    <PageSection id={id} ground="light" kicker={kicker} title={title}>
      <div className={styles.paragraphs}>
        {paragraphs.map((p) => (
          <p className={styles.paragraph} key={p}>
            {p}
          </p>
        ))}
      </div>

      {boxes.length > 0 && (
        <div className={styles.boxes}>
          {boxes.map((box) => (
            <div id={box.id} className={styles.box} key={box.title}>
              <h3 className={styles.boxTitle}>{box.title}</h3>
              <p className={styles.boxBody}>{box.body}</p>
            </div>
          ))}
        </div>
      )}
    </PageSection>
  );
}
