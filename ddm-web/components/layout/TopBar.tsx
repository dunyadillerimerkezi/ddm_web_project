import type { Branch } from "@/lib/types";
import { contactBranch, telHref } from "@/data/branches";
import { BRAND_TAGLINE } from "@/lib/nav";
import styles from "@/styles/TopBar.module.css";

/**
 * Lacivert üst bar — dört şablonun da en üstünde, birebir aynı.
 * Ana Sayfa telefonu sabit yazıyordu; burada sayfa bağlamından gelir.
 */
export function TopBar({ branch }: { branch?: Branch }) {
  const contact = contactBranch(branch);
  const tel = telHref(contact);

  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        <span className={styles.tagline}>{BRAND_TAGLINE}</span>
        <div className={styles.contact}>
          {tel && contact.phone && (
            <a className={styles.link} href={tel}>
              {contact.phone}
            </a>
          )}
          <a className={styles.link} href={`mailto:${contact.mail}`}>
            {contact.mail}
          </a>
        </div>
      </div>
    </div>
  );
}
