"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { NavItem, NavLink as NavLinkData } from "@/lib/types";
import { NAV_ITEMS } from "@/lib/nav";
import { UiIcon } from "@/components/graphics/Icon";
import styles from "@/styles/SiteHeader.module.css";

type SiteHeaderProps = {
  /** Header CTA — Ana Sayfa "İletişim", iç sayfalar "Kayıt Ol". */
  ctaLabel?: string;
  ctaHref?: string;
};

/** `href` null ise link değil, düz metin döner (uydurma URL yok). */
function MegaLink({ link }: { link: NavLinkData }) {
  if (!link.href) {
    return <span className={styles.megaLinkInert}>{link.label}</span>;
  }
  return (
    <Link className={styles.megaLink} href={link.href}>
      {link.label}
    </Link>
  );
}

export function SiteHeader({ ctaLabel = "Kayıt Ol", ctaHref = "#kayit" }: SiteHeaderProps) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerGroup, setDrawerGroup] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenKey(null), 260);
  }, [cancelClose]);

  useEffect(() => () => cancelClose(), [cancelClose]);

  // Escape ile kapat — orijinal şablonda klavye desteği yoktu.
  useEffect(() => {
    if (!openKey && !drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenKey(null);
        setDrawerOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openKey, drawerOpen]);

  // Dışarı tıklayınca mega menü kapanır.
  useEffect(() => {
    if (!openKey) return;
    const onDown = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenKey(null);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [openKey]);

  const activeMenu: NavItem | undefined = NAV_ITEMS.find((m) => m.key === openKey);

  return (
    <div className={styles.sticky}>
      <header className={styles.header} ref={headerRef}>
        <div className={styles.bar}>
          <Link className={styles.logo} href="/" aria-label="Dünya Dilleri Merkezi — anasayfa">
            <Image
              src="/assets/ddm-logo-lacivert.png"
              alt="Dünya Dilleri Merkezi"
              width={220}
              height={58}
              priority
            />
          </Link>

          <nav
            className={styles.nav}
            aria-label="Ana menü"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                type="button"
                className={`${styles.navButton} ${openKey === item.key ? styles.navButtonOpen : ""}`}
                aria-expanded={openKey === item.key}
                aria-haspopup="true"
                onClick={() => {
                  cancelClose();
                  setOpenKey((k) => (k === item.key ? null : item.key));
                }}
                onMouseEnter={() => {
                  cancelClose();
                  setOpenKey(item.key);
                }}
              >
                {item.short}
                <UiIcon name="caretDown" size={10} strokeWidth={1.6} />
              </button>
            ))}
          </nav>

          <Link className={styles.cta} href={ctaHref}>
            {ctaLabel}
            <span className={styles.ctaChip}>
              <UiIcon name="arrowRight" size={12} strokeWidth={1.6} />
            </span>
          </Link>

          <button
            type="button"
            className={styles.burger}
            aria-label={drawerOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen((v) => !v)}
          >
            <UiIcon name="burger" size={20} strokeWidth={2} />
          </button>
        </div>

        {activeMenu && (
          <div className={styles.megaWrap} onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
            <div className={styles.mega}>
              {activeMenu.columns.map((col) => (
                <div className={styles.megaCol} key={col.title}>
                  <span className={styles.megaColTitle}>{col.title}</span>
                  <div className={styles.megaLinks}>
                    {col.items.map((link) => (
                      <MegaLink key={link.label} link={link} />
                    ))}
                  </div>
                </div>
              ))}

              <div className={styles.megaPromo}>
                <div className={styles.megaPromoHead}>
                  <span className={styles.megaColTitle}>{activeMenu.label}</span>
                  <p className={styles.megaPromoTitle}>{activeMenu.promoTitle}</p>
                </div>
                {activeMenu.promoLink.href && (
                  <Link className={styles.megaPromoLink} href={activeMenu.promoLink.href}>
                    {activeMenu.promoLink.label}
                    <UiIcon name="arrowRight" size={14} strokeWidth={1.6} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        {drawerOpen && (
          <div className={styles.drawer}>
            {/*
              Orijinal tasarımda çekmece yalnız üst başlıkları href="#" ile
              listeliyordu — üst başlıklar sayfa OLMADIĞI için mobil menü
              hiçbir yere gitmiyordu. Burada başlıklar açılır gruba dönüştü,
              gerçek linkler altlarından çıkıyor.
            */}
            {NAV_ITEMS.map((item) => {
              const open = drawerGroup === item.key;
              return (
                <div className={styles.drawerGroup} key={item.key}>
                  <button
                    type="button"
                    className={styles.drawerTop}
                    aria-expanded={open}
                    onClick={() => setDrawerGroup((k) => (k === item.key ? null : item.key))}
                  >
                    {item.short}
                    <span className={`${styles.drawerCaret} ${open ? styles.drawerCaretOpen : ""}`}>
                      <UiIcon name="caretDown" size={12} strokeWidth={1.8} />
                    </span>
                  </button>
                  {open && (
                    <div className={styles.drawerPanel}>
                      {item.columns.flatMap((col) =>
                        col.items.map((link) =>
                          link.href ? (
                            <Link
                              className={styles.drawerLink}
                              href={link.href}
                              key={`${col.title}-${link.label}`}
                              onClick={() => setDrawerOpen(false)}
                            >
                              {link.label}
                            </Link>
                          ) : (
                            <span
                              className={styles.drawerLinkInert}
                              key={`${col.title}-${link.label}`}
                            >
                              {link.label}
                            </span>
                          ),
                        ),
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            <Link className={styles.drawerCta} href={ctaHref} onClick={() => setDrawerOpen(false)}>
              {ctaLabel}
            </Link>
          </div>
        )}
      </header>
    </div>
  );
}
