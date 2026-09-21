import { BRANCH_LIST } from "@/data/branches";
import styles from "@/styles/ContactFormCard.module.css";

/**
 * "BÖLÜM DETAYLARI" aside'ındaki lacivert iletişim formu kartı.
 *
 * Kaynak: `DDM Üniversite Proficiency Sayfası.dc.html` bölüm 7, ikinci aside
 * kartı. Orijinalde `hasDetails === false` iken sticky TOC ile BİRLİKTE
 * kayboluyordu — bilinçli düzeltme: bu kart detay bloğu olmayan
 * üniversitelerde de HER ZAMAN render edilir (plan §2 kusur #3).
 */
export function ContactFormCard() {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Bizimle İletişime Geçin</h3>
      <p className={styles.lead}>
        Size uygun şubenin ön bilgi formundan yazın, eğitim danışmanlarımız sorularınızı cevaplasın.
      </p>
      <form className={styles.fields}>
        <input className={styles.input} type="text" name="ad-soyad" placeholder="Ad Soyad" />
        <input className={styles.input} type="tel" name="telefon" placeholder="Telefon" />
        <select className={styles.input} name="sube" aria-label="Şube">
          {BRANCH_LIST.map((b) => (
            <option key={b.slug} value={b.slug}>
              {b.name}
            </option>
          ))}
        </select>
        <button type="submit" className={styles.submit}>
          Ön Bilgi Formu Gönder
        </button>
      </form>
    </div>
  );
}
