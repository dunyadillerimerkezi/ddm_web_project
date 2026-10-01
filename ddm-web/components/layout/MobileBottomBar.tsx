import { Icon } from "@/components/graphics/Icon";
import { PageLink } from "@/components/ui/PageLink";
import styles from "@/styles/MobileBottomBar.module.css";
import { FORM_HREF } from "@/lib/formAnchor";

/**
 * Mobilde ekranın altına sabitlenen tek düğme: telefon ikonlu "Biz Sizi Arayalım" — forma gider (kullanıcı, 2026-10-01).
 * Ara / WhatsApp düğmeleri şube sayfaları dahil her yerden kalktı; numaralar yalnız şube sayfalarının içinde.
 */
export function MobileBottomBar({ ctaHref = FORM_HREF }: { ctaHref?: string }) {
  return (
    <div className={styles.bar}>
      <PageLink className={styles.primary} href={ctaHref}>
        <Icon name="telefon" size={16} />
        Biz Sizi Arayalım
      </PageLink>
    </div>
  );
}
