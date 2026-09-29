import type { Branch } from "@/lib/types";
import { contactBranch, telHref, waHref } from "@/data/branches";
import { Icon } from "@/components/graphics/Icon";
import { PageLink } from "@/components/ui/PageLink";
import styles from "@/styles/MobileBottomBar.module.css";
import { FORM_HREF } from "@/lib/formAnchor";

/**
 * Mobilde ekranın altına sabitlenen Ara / WhatsApp / Kayıt çubuğu.
 * Şubenin telefonu yoksa merkez şubeye düşer — site geneli iletişim noktası.
 */
export function MobileBottomBar({
  branch,
  ctaLabel = "Kayıt Ol",
  ctaHref = FORM_HREF,
}: {
  branch?: Branch;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  const contact = contactBranch(branch);
  const tel = telHref(contact);
  const wa = waHref(contact);

  return (
    <div className={styles.bar}>
      {tel && (
        <a className={styles.action} href={tel}>
          <Icon name="telefon" size={16} />
          Ara
        </a>
      )}
      {wa && (
        <a className={styles.action} href={wa} target="_blank" rel="noopener noreferrer">
          <Icon name="whatsapp" size={16} />
          WhatsApp
        </a>
      )}
      <PageLink className={styles.primary} href={ctaHref}>
        {ctaLabel}
      </PageLink>
    </div>
  );
}
