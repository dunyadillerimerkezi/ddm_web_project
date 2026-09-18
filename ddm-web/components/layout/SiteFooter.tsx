import Link from "next/link";
import Image from "next/image";
import type { Branch } from "@/lib/types";
import { DEFAULT_BRANCH, telHref } from "@/data/branches";
import {
  BRAND_BLURB,
  FOOTER_COLUMNS,
  FOOTER_LEGAL_LEFT,
  FOOTER_LEGAL_RIGHT,
} from "@/lib/nav";
import styles from "@/styles/SiteFooter.module.css";

/**
 * Footer — dört şablonda da aynı.
 *
 * Tek fark: Ana Sayfa şube bloğunu ÜMRANİYE olarak sabitlemişti, Şube
 * şablonu sayfanın şubesinden alıyordu. Burada prop; verilmezse merkez.
 *
 * Şubenin adresi/telefonu kaynak içerikte yoksa BURADA yedeğe düşülmez —
 * eksiklik olduğu gibi gösterilir (CLAUDE.md §5).
 */
export function SiteFooter({ branch = DEFAULT_BRANCH }: { branch?: Branch }) {
  const tel = telHref(branch);

  return (
    <footer className={styles.footer} id="iletisim">
      <div className={styles.inner}>
        <div className={styles.cols}>
          <div className={styles.brand}>
            <Image
              src="/assets/ddm-logo-beyaz.png"
              alt="Dünya Dilleri Merkezi"
              width={175}
              height={46}
            />
            <p className={styles.blurb}>{BRAND_BLURB}</p>

            <div className={styles.branchBlock}>
              <span className={styles.kicker}>{branch.kicker}</span>
              {branch.address ? (
                <span className={styles.address}>{branch.address}</span>
              ) : (
                <span className={styles.pending}>adres bekleniyor</span>
              )}
              {branch.phone && tel ? (
                <a className={styles.phone} href={tel}>
                  {branch.phone}
                </a>
              ) : (
                <span className={styles.pending}>telefon bekleniyor</span>
              )}
              <a className={styles.mail} href={`mailto:${branch.mail}`}>
                {branch.mail}
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
          <span className={styles.legalText}>{FOOTER_LEGAL_LEFT}</span>
          <span className={styles.legalText}>{FOOTER_LEGAL_RIGHT}</span>
        </div>
      </div>
    </footer>
  );
}
