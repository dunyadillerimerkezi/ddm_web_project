"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { NavChildGroup, NavItem, NavLink as NavLinkData, NavNode } from "@/lib/types";
import { getNavTree } from "@/lib/navTree";
import { UiIcon } from "@/components/graphics/Icon";
import { PageLink } from "@/components/ui/PageLink";
import styles from "@/styles/SiteHeader.module.css";
import { FORM_HREF } from "@/lib/formAnchor";

type SiteHeaderProps = {
  /** Header CTA — Ana Sayfa "İletişim", iç sayfalar "Kayıt Ol". */
  ctaLabel?: string;
  ctaHref?: string;
};

const INERT_TITLE = "Bu sayfa henüz yayında değil";

/** `href` null ise link değil, düz metin döner (uydurma URL yok). */
function MegaLink({ link, className }: { link: NavLinkData; className: string }) {
  if (!link.href) {
    return (
      <span className={`${className} ${styles.inert}`} title={INERT_TITLE}>
        {link.label}
      </span>
    );
  }
  return (
    <Link className={className} href={link.href}>
      {link.label}
    </Link>
  );
}

/** 3. kat öbeği — "PROGRAM" / "ŞUBE KURS TARİHLERİ". */
function ChildGroup({ group }: { group: NavChildGroup }) {
  return (
    <div className={styles.childGroup}>
      {group.title && <span className={styles.childGroupTitle}>{group.title}</span>}
      <div className={styles.childLinks}>
        {group.items.map((link) => (
          <MegaLink key={link.label} link={link} className={styles.childLink} />
        ))}
      </div>
    </div>
  );
}

/**
 * Şube kurs tarihi öbeği kısa etiketli ("Kadıköy", "Etiler"); çekmecede iki
 * kolona sığar. Uzun etiketli öbekler ("TOEFL Örnek Sınav Soruları") alt alta.
 */
const isDenseGroup = (group: NavChildGroup) => group.items.every((i) => i.label.length <= 16);

export function SiteHeader({ ctaLabel = "Kayıt Ol", ctaHref = FORM_HREF }: SiteHeaderProps) {
  /*
   * Ağaç burada süzülüyor (sunucuda değil): `lib/navTree.ts` saf, yalnız
   * `lib/nav.ts`'e bağlı. Sunucuda süzüp prop geçmek ~18 KB'lık ağacı 126
   * sayfanın her birinin RSC yüküne İKİ kez kopyalıyordu; böyle bir kez
   * paylaşılan JS parçasında duruyor. `soon` bayraklarının doğruluğu
   * build'de `lib/navAudit.ts` ile kanıtlanıyor.
   */
  const navItems = useMemo(() => getNavTree(), []);
  const [openKey, setOpenKey] = useState<string | null>(null);
  /**
   * Sağ bölmede hangi kurs duruyor. Sekme anahtarıyla birlikte tutuluyor ki
   * sekme değişince seçim bir efektle sıfırlanmak zorunda kalmasın (ilk
   * kursa kendiliğinden döner).
   */
  const [railSel, setRailSel] = useState<{ tab: string; index: number } | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState<string | null>(null);
  const [drawerNode, setDrawerNode] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const drawerCloseRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenKey(null), 260);
  }, [cancelClose]);

  useEffect(() => () => cancelClose(), [cancelClose]);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    burgerRef.current?.focus();
  }, []);

  // Escape ile kapat — orijinal şablonda klavye desteği yoktu.
  useEffect(() => {
    if (!openKey && !drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenKey(null);
      if (drawerOpen) closeDrawer();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openKey, drawerOpen, closeDrawer]);

  /*
   * Odak tuzağı. Çekmece `aria-modal="true"` ilan ediyor: ekran okuyucu arka
   * plandaki içeriği gizliyor, perde de fareyle erişimi kapatıyor. Tab'ın
   * oraya kaçmaması için sekme sırası çekmecede dönüyor.
   */
  useEffect(() => {
    if (!drawerOpen) return;
    const onTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const root = drawerRef.current;
      if (!root) return;
      // `offsetParent` süzgeci şart: çekmecenin CTA'sı ≤999px'te `display: none`
      // (MobileBottomBar aynı düğmeyi taşıyor). Gizli eleman odak alamadığı için
      // süzülmezse "son eleman" hiç eşleşmez ve Tab tuzaktan kaçar.
      const focusable = [...root.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")]
        .filter((el) => el.offsetParent !== null);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !root.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onTab);
    return () => document.removeEventListener("keydown", onTab);
  }, [drawerOpen]);

  /*
   * Masaüstü genişliğine dönülünce (tablet döndürme: 1024 → 1366) burger
   * `display: none` oluyor; çekmece açık kalsaydı perde masaüstü navigasyonunu
   * örterdi ve kapatma odağı görünmeyen burger'a giderdi.
   */
  useEffect(() => {
    if (!drawerOpen) return;
    const mq = window.matchMedia("(min-width: 1340px)");
    const onChange = () => mq.matches && setDrawerOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [drawerOpen]);

  // Dışarı tıklayınca mega menü kapanır.
  useEffect(() => {
    if (!openKey) return;
    const onDown = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenKey(null);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [openKey]);

  // Çekmece açıkken arkadaki gövde kaydırması kilitlenir, odak kapat düğmesine gider.
  useEffect(() => {
    if (!drawerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawerCloseRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [drawerOpen]);

  /*
   * Çekmecenin tavanı = ekranın altı − çekmecenin üst kenarı. Üst kenar sabit
   * değil: üst bar mobilde iki satıra düşüyor ve header yapışkan olduğu için
   * kaydırma durumuna göre değişiyor. CSS'te hesaplanamadığından açılışta bir
   * kez ölçülüp değişkene yazılıyor (gövde kaydırması zaten kilitli, açıkken
   * değişmez). Ölçüm yapılamazsa CSS'teki yedek değer geçerli.
   */
  useEffect(() => {
    if (!drawerOpen) return;
    const el = drawerRef.current;
    if (!el) return;
    const apply = () => el.style.setProperty("--drawer-top", `${Math.round(el.getBoundingClientRect().top)}px`);
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [drawerOpen]);

  const activeMenu: NavItem | undefined = navItems.find((m) => m.key === openKey);
  const railNodes: NavNode[] =
    activeMenu?.layout === "rail" ? activeMenu.columns.flatMap((c) => c.items) : [];
  const railIndex = railSel && railSel.tab === openKey ? railSel.index : 0;
  const railActive = railNodes[Math.min(railIndex, railNodes.length - 1)];

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
              preload
            />
          </Link>

          <nav
            className={styles.nav}
            aria-label="Ana menü"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            {navItems.map((item) => {
              const open = openKey === item.key;
              const toggle = () => {
                cancelClose();
                setOpenKey((k) => (k === item.key ? null : item.key));
              };
              const hover = () => {
                cancelClose();
                setOpenKey(item.key);
              };
              /*
               * Kullanıcı isteği (2026-09-28): başlığa basınca kategori sayfasına
               * gidilir (menüdeki "Keşfet" bağlantısıyla aynı hedef). Menü üzerine
               * gelince açılmaya devam eder; klavye ve dokunmatik için yanındaki
               * ok ayrı bir düğme. Sayfası henüz yoksa başlık eskisi gibi düğme.
               */
              const href = item.promoLink.href;
              return href ? (
                <div
                  key={item.key}
                  className={`${styles.navItem} ${open ? styles.navItemOpen : ""}`}
                  onMouseEnter={hover}
                >
                  <Link className={styles.navLink} href={href} onClick={() => setOpenKey(null)}>
                    {item.short}
                  </Link>
                  <button
                    type="button"
                    className={styles.navCaret}
                    aria-expanded={open}
                    aria-haspopup="true"
                    aria-label={`${item.short} menüsü`}
                    onClick={toggle}
                  >
                    <UiIcon name="caretDown" size={10} strokeWidth={1.6} />
                  </button>
                </div>
              ) : (
                <button
                  key={item.key}
                  type="button"
                  className={`${styles.navButton} ${open ? styles.navButtonOpen : ""}`}
                  aria-expanded={open}
                  aria-haspopup="true"
                  onClick={toggle}
                  onMouseEnter={hover}
                >
                  {item.short}
                  <UiIcon name="caretDown" size={10} strokeWidth={1.6} />
                </button>
              );
            })}
          </nav>

          <PageLink className={styles.cta} href={ctaHref}>
            {ctaLabel}
            <span className={styles.ctaChip}>
              <UiIcon name="arrowRight" size={12} strokeWidth={1.6} />
            </span>
          </PageLink>

          <button
            type="button"
            ref={burgerRef}
            className={styles.burger}
            aria-label={drawerOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={drawerOpen}
            onClick={() => (drawerOpen ? closeDrawer() : setDrawerOpen(true))}
          >
            <UiIcon name="burger" size={20} strokeWidth={2} />
          </button>
        </div>

        {activeMenu && (
          <div className={styles.megaWrap} onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
            <div className={activeMenu.layout === "rail" ? styles.megaRail : styles.mega}>
              {activeMenu.layout === "rail" ? (
                <>
                  {/*
                    İki bölmeli panel: 10 dil / 16 sınav × ~8 alt sayfa tek
                    listeye sığmıyor. Solda kurslar, sağda seçili kursun alt
                    sayfaları; seçim üzerine gelince (veya klavyeyle odaklanınca)
                    değişir, satırın kendisi kurs sayfasına gider.
                  */}
                  <div className={styles.rail}>
                    <span className={styles.megaColTitle}>{activeMenu.columns[0]?.title}</span>
                    <div className={styles.railList}>
                      {railNodes.map((node, i) => {
                        // Yalnız görsel önizleme durumu — aktif SAYFA değil, o
                        // yüzden `aria-current` YOK: sekmeyle gezen kullanıcıya
                        // her satır "buradasın" diye okunmasın.
                        const selected = node === railActive;
                        const cls = `${styles.railItem} ${selected ? styles.railItemOn : ""}`;
                        const onFocusLike = () => setRailSel({ tab: activeMenu.key, index: i });
                        return node.href ? (
                          <Link
                            key={node.label}
                            href={node.href}
                            className={cls}
                            onMouseEnter={onFocusLike}
                            onFocus={onFocusLike}
                          >
                            {node.label}
                            <UiIcon name="arrowRight" size={12} strokeWidth={1.7} />
                          </Link>
                        ) : (
                          <button
                            key={node.label}
                            type="button"
                            className={`${cls} ${styles.railItemInert}`}
                            onMouseEnter={onFocusLike}
                            onFocus={onFocusLike}
                            onClick={onFocusLike}
                          >
                            {node.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className={styles.railPanel}>
                    <div className={styles.railPanelHead}>
                      <span className={styles.railPanelTitle}>{railActive?.label}</span>
                      {railActive?.href && (
                        <Link className={styles.railPanelLink} href={railActive.href}>
                          Kurs sayfası
                          <UiIcon name="arrowRight" size={12} strokeWidth={1.7} />
                        </Link>
                      )}
                    </div>
                    {railActive?.children?.length ? (
                      railActive.children.map((group) => (
                        <ChildGroup key={group.title ?? "tek"} group={group} />
                      ))
                    ) : (
                      <p className={styles.railEmpty}>
                        Bu kursun ayrı bir alt sayfası yok; her şey kurs sayfasında.
                      </p>
                    )}
                  </div>
                </>
              ) : (
                activeMenu.columns.map((col) => (
                  <div className={styles.megaCol} key={col.title}>
                    <span className={styles.megaColTitle}>{col.title}</span>
                    <div className={styles.megaLinks}>
                      {col.items.map((node) => (
                        <div className={styles.megaNode} key={node.label}>
                          <MegaLink link={node} className={styles.megaLink} />
                          {node.children?.map((group) => (
                            <div className={styles.megaSub} key={group.title ?? "tek"}>
                              {group.items.map((link) => (
                                <MegaLink
                                  key={link.label}
                                  link={link}
                                  className={styles.megaSubLink}
                                />
                              ))}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}

              <div className={styles.megaPromo}>
                <div className={styles.megaPromoHead}>
                  <span className={styles.megaColTitle}>{activeMenu.label}</span>
                  <p className={styles.megaPromoTitle}>{activeMenu.promoTitle}</p>
                </div>
                {activeMenu.promoLink.href ? (
                  <Link className={styles.megaPromoLink} href={activeMenu.promoLink.href}>
                    {activeMenu.promoLink.label}
                    <UiIcon name="arrowRight" size={14} strokeWidth={1.6} />
                  </Link>
                ) : (
                  <span
                    className={`${styles.megaPromoLink} ${styles.inert}`}
                    title={INERT_TITLE}
                  >
                    {activeMenu.promoLink.label}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {drawerOpen && (
          <>
            <button
              type="button"
              className={styles.scrim}
              aria-label="Menüyü kapat"
              tabIndex={-1}
              onClick={closeDrawer}
            />
            <div
              className={styles.drawer}
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site menüsü"
            >
              <div className={styles.drawerHead}>
                <span className={styles.drawerHeadTitle}>Menü</span>
                <button
                  type="button"
                  ref={drawerCloseRef}
                  className={styles.drawerClose}
                  aria-label="Menüyü kapat"
                  onClick={closeDrawer}
                >
                  <UiIcon name="close" size={14} strokeWidth={2} />
                </button>
              </div>

              {/*
                3 kat: sekme → kurs → alt sayfa. Her katta tek bir dal açık
                kalır; ikincisi açılınca birincisi kapanır (canlı ağaç 16 sınav
                × 8 alt sayfa, hepsi açık kalırsa çekmece okunmaz olur).
              */}
              <div className={styles.drawerScroll}>
                {navItems.map((item) => {
                  const tabOpen = drawerTab === item.key;
                  const toggleTab = () => {
                    setDrawerTab((k) => (k === item.key ? null : item.key));
                    setDrawerNode(null);
                  };
                  return (
                    <div className={styles.drawerGroup} key={item.key}>
                      {item.promoLink.href ? (
                        // Başlık kategori sayfasına gider, sağdaki ok alt başlıkları açar.
                        <div className={styles.drawerTopRow}>
                          <Link className={styles.drawerTopLink} href={item.promoLink.href} onClick={closeDrawer}>
                            {item.short}
                          </Link>
                          <button
                            type="button"
                            className={styles.drawerTopToggle}
                            aria-expanded={tabOpen}
                            aria-label={`${item.short} alt başlıkları`}
                            onClick={toggleTab}
                          >
                            <span
                              className={`${styles.drawerCaret} ${tabOpen ? styles.drawerCaretOpen : ""}`}
                            >
                              <UiIcon name="caretDown" size={12} strokeWidth={1.8} />
                            </span>
                          </button>
                        </div>
                      ) : (
                        <button type="button" className={styles.drawerTop} aria-expanded={tabOpen} onClick={toggleTab}>
                          {item.short}
                          <span
                            className={`${styles.drawerCaret} ${tabOpen ? styles.drawerCaretOpen : ""}`}
                          >
                            <UiIcon name="caretDown" size={12} strokeWidth={1.8} />
                          </span>
                        </button>
                      )}

                      {tabOpen && (
                        <div className={styles.drawerPanel}>
                          {item.columns.map((col) => (
                            <div className={styles.drawerCol} key={col.title}>
                              <span className={styles.drawerColTitle}>{col.title}</span>
                              {col.items.map((node) => {
                                const nodeKey = `${item.key}:${node.label}`;
                                const nodeOpen = drawerNode === nodeKey;
                                const hasChildren = Boolean(node.children?.length);

                                if (!hasChildren) {
                                  return node.href ? (
                                    <Link
                                      className={styles.drawerLink}
                                      href={node.href}
                                      key={nodeKey}
                                      onClick={closeDrawer}
                                    >
                                      {node.label}
                                    </Link>
                                  ) : (
                                    <span
                                      className={`${styles.drawerLink} ${styles.inert}`}
                                      key={nodeKey}
                                      title={INERT_TITLE}
                                    >
                                      {node.label}
                                    </span>
                                  );
                                }

                                return (
                                  <div className={styles.drawerNode} key={nodeKey}>
                                    <div className={styles.drawerNodeRow}>
                                      {node.href ? (
                                        <Link
                                          className={styles.drawerNodeLink}
                                          href={node.href}
                                          onClick={closeDrawer}
                                        >
                                          {node.label}
                                        </Link>
                                      ) : (
                                        <span
                                          className={`${styles.drawerNodeLink} ${styles.inert}`}
                                          title={INERT_TITLE}
                                        >
                                          {node.label}
                                        </span>
                                      )}
                                      <button
                                        type="button"
                                        className={styles.drawerNodeToggle}
                                        aria-expanded={nodeOpen}
                                        aria-label={`${node.label} alt sayfaları`}
                                        onClick={() =>
                                          setDrawerNode((k) => (k === nodeKey ? null : nodeKey))
                                        }
                                      >
                                        <span
                                          className={`${styles.drawerCaret} ${nodeOpen ? styles.drawerCaretOpen : ""}`}
                                        >
                                          <UiIcon name="caretDown" size={12} strokeWidth={1.8} />
                                        </span>
                                      </button>
                                    </div>

                                    {nodeOpen && (
                                      <div className={styles.drawerSubPanel}>
                                        {node.children?.map((group) => (
                                          <div
                                            className={styles.drawerSubGroup}
                                            key={group.title ?? "tek"}
                                          >
                                            {group.title && (
                                              <span className={styles.drawerSubTitle}>
                                                {group.title}
                                              </span>
                                            )}
                                            <div
                                              className={
                                                isDenseGroup(group)
                                                  ? styles.drawerSubLinksDense
                                                  : styles.drawerSubLinks
                                              }
                                            >
                                              {group.items.map((link) =>
                                                link.href ? (
                                                  <Link
                                                    className={styles.drawerSubLink}
                                                    href={link.href}
                                                    key={link.label}
                                                    onClick={closeDrawer}
                                                  >
                                                    {link.label}
                                                  </Link>
                                                ) : (
                                                  <span
                                                    className={`${styles.drawerSubLink} ${styles.inert}`}
                                                    key={link.label}
                                                    title={INERT_TITLE}
                                                  >
                                                    {link.label}
                                                  </span>
                                                ),
                                              )}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className={styles.drawerFoot}>
                <PageLink className={styles.drawerCta} href={ctaHref} onClick={closeDrawer}>
                  {ctaLabel}
                </PageLink>
              </div>
            </div>
          </>
        )}
      </header>
    </div>
  );
}
