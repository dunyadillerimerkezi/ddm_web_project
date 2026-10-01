import Link from "next/link";
import Image from "next/image";
import { BRAND_BLURB, CORPORATE_MAIL, FOOTER_COLUMNS, FOOTER_LEGAL } from "@/lib/nav";
import styles from "@/styles/SiteFooter.module.css";

/**
 * Footer — her sayfada aynı. Şube adresi / telefonu / e-postası ve "Şubeler" kolonu YOK (kullanıcı, 2026-10-01):
 * şube iletişimi yalnız şubelerin kendi iletişim sayfalarında. Yalnız kurumsal mail (info@) ve tek cümlelik alt satır.
 */
export function SiteFooter() {
  return (
    <footer className={styles.footer} id="iletisim">
      <div className={styles.inner}>
        <div className={styles.cols}>
          <div className={styles.brand}>
            {/* Oran dosyanınkiyle aynı olmalı (1927×816 ≈ 2.36:1) — eski
                175×46 logoyu yana geriyordu (UI turu 2026-09-24). */}
            <Image
              src="/assets/ddm-logo-beyaz.png"
              alt="Dünya Dilleri Merkezi"
              width={1927}
              height={816}
              className={styles.logo}
            />
            <p className={styles.blurb}>{BRAND_BLURB}</p>
            <div className={styles.contact}>
              <span className={styles.kicker}>KURUMSAL İLETİŞİM</span>
              <a className={styles.mail} href={`mailto:${CORPORATE_MAIL}`}>
                {CORPORATE_MAIL}
              </a>
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div className={styles.col} key={col.title}>
              <span className={styles.kicker}>{col.title}</span>
              <div className={styles.colLinks}>
                {col.items.map((link) =>
                  link.href ? (
                    <Link className={styles.colLink} href={link.href} key={link.label}>
                      {link.label}
                    </Link>
                  ) : (
                    <span className={styles.colLinkInert} key={link.label}>
                      {link.label}
                    </span>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.legal}>
          <span className={styles.legalText}>{FOOTER_LEGAL}</span>
        </div>
      </div>
    </footer>
  );
}
