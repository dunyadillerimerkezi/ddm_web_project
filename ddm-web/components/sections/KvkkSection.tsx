import { UiIcon } from "@/components/graphics/Icon";
import { HashDetails } from "@/components/ui/HashDetails";
import { KVKK_BLOCKS } from "@/lib/kvkkContent";
import { KVKK_ID } from "@/lib/kvkkConsent";
import acc from "@/styles/Accordion.module.css";
import styles from "@/styles/KvkkSection.module.css";

/**
 * PF (2026-09-29) — KVKK aydınlatma metni + açık rıza beyanı; formdaki onay kutusunun bağlantısı buraya gelir
 * (`ContactForm` → `KVKK_HREF`). Metin sitede YALNIZ burada durur: 134 sayfanın her birine gömülse hem sayfa
 * ağırlaşır hem aynı hukuki metin her sayfada tekrar eder. Kaynaktan okunur (`lib/kvkkContent.ts`).
 * Kapalı gelir (sayfanın asıl işi şube kartları); formdaki bağlantıyla (`#kvkk-aydinlatma-metni`) gelinince açılır.
 */
export function KvkkSection() {
  return (
    <section className={styles.section} id={KVKK_ID} aria-labelledby="kvkk-baslik">
      <HashDetails id={KVKK_ID} className={acc.item}>
        <summary className={acc.summary}>
          <span className={acc.question} id="kvkk-baslik">
            KVKK Aydınlatma Metni
          </span>
          <span className={acc.caret}>
            <UiIcon name="caretDown" size={12} strokeWidth={1.8} />
          </span>
        </summary>
        <div className={styles.body}>
          {KVKK_BLOCKS.map((b, i) =>
            b.kind === "heading" ? (
              <h3 key={i} className={styles.heading}>
                {b.text}
              </h3>
            ) : b.kind === "list" ? (
              <ul key={i} className={b.numbered ? styles.numbered : styles.list}>
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            ) : (
              <p key={i}>{b.text}</p>
            ),
          )}
        </div>
      </HashDetails>
    </section>
  );
}
