import Image from "next/image";
import Link from "next/link";

import { SiteChrome } from "@/components/layout";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Icon, UiIcon } from "@/components/graphics/Icon";
import type { IconName } from "@/components/graphics/icons";
import { BranchMap } from "@/components/sections/BranchMap";
import { ContactForm } from "@/components/sections/ContactForm";
import { TransitList } from "@/components/sections/TransitList";
import { BRANCH_LIST, directionsHref, mapQuery, telHref, waHref } from "@/data/branches";
import { BRANCH_PHOTOS } from "@/data/branchPhotos";
import { PROMO_PATHS } from "@/data/branchPromoPaths";
import { BRANCH_TRANSIT } from "@/data/branchTransit";
import type { BranchPage } from "@/lib/branchContent";
import styles from "@/styles/BranchContactPage.module.css";

type Action = { icon: IconName; label: string; value: string; href: string; external?: boolean; primary?: boolean };

/**
 * Şube İletişim sayfası (P1) — UI turu 2026-09-28, kullanıcı "A · hızlı iletişim". Açık hero (P6 tanıtım ailesi):
 * başlığın altında dokunmatik iletişim kutuları (ara / WhatsApp / e-posta / yol tarifi), sağda semt fotoğraflı şube kartı
 * + tanıtım sayfası bağlantısı; altta gömülü harita + ulaşım (`data/branchTransit.ts`), en altta diğer şubeler.
 * Form + KVKK gövdesi hâlâ yayınlanmıyor (karar #4). Başlık / açıklama P1'deki gibi (`lib/branchContent.ts`).
 */
export function BranchContactPage({ page, lead }: { page: BranchPage; lead: string }) {
  const { branch } = page;
  const photo = BRANCH_PHOTOS[branch.slug];
  const promo = PROMO_PATHS[branch.slug];
  const tel = telHref(branch);
  const wa = waHref(branch);
  const directions = directionsHref(branch);
  const query = mapQuery(branch);

  const candidates: (Action | null)[] = [
    tel && branch.phone ? { icon: "telefon", label: "Bizi arayın", value: branch.phone, href: tel, primary: true } : null,
    wa && branch.phone ? { icon: "whatsapp", label: "WhatsApp'tan yazın", value: branch.phone, href: wa, external: true } : null,
    { icon: "mail", label: "E-posta", value: branch.mail, href: `mailto:${branch.mail}` },
    directions ? { icon: "konum", label: "Yol tarifi al", value: "Google Haritalar'da açılır", href: directions, external: true } : null,
  ];
  const actions = candidates.filter((a): a is Action => a !== null);

  const others = BRANCH_LIST.filter((b) => b.slug !== branch.slug);

  return (
    <SiteChrome branch={branch} ctaLabel="Bilgi Al">
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div>
            <Breadcrumb items={page.crumbs} tone="onLight" />
            <h1 className={styles.title}>{page.h1}</h1>
            <p className={styles.lead}>{lead}</p>
            <ul className={styles.actions}>
              {actions.map((a) => (
                <li key={a.label}>
                  <a
                    href={a.href}
                    className={a.primary ? styles.actionPrimary : styles.action}
                    {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <span className={styles.actionIcon} aria-hidden="true">
                      <Icon name={a.icon} size={20} strokeWidth={1.7} />
                    </span>
                    <span className={styles.actionText}>
                      <span className={styles.actionLabel}>{a.label}</span>
                      <span className={styles.actionValue}>{a.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <article className={styles.card} aria-label={`${branch.name} şubesi`}>
            <div className={styles.cardPhoto}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 999px) 100vw, 420px"
                className={styles.cover}
                style={photo.position ? { objectPosition: photo.position } : undefined}
              />
            </div>
            <div className={styles.cardBody}>
              <p className={styles.cardName}>{branch.name}</p>
              {branch.address && <p className={styles.cardAddress}>{branch.address}</p>}
            </div>
            {promo && (
              <Link href={promo} className={styles.cardLink}>
                {branch.name} şubesini tanıyın
                <UiIcon name="arrowRight" size={14} strokeWidth={2} />
              </Link>
            )}
          </article>
        </div>
      </section>

      {/* PF: sayfanın asıl işi iletişim — form hero'nun hemen altında, şube hazır seçili. */}
      <ContactForm ground="white" branch={branch.slug} />

      <div className={styles.body}>
        {query && directions && (
          <section className={styles.section} aria-labelledby="sube-ulasim">
            <h2 id="sube-ulasim" className={styles.h2}>
              {branch.name} şubesine nasıl gelinir?
            </h2>
            <div className={styles.visit}>
              <BranchMap query={query} directionsHref={directions} label={`${branch.name} şubesi haritası`} />
              <div className={styles.transit}>
                <TransitList items={BRANCH_TRANSIT[branch.slug]} />
              </div>
            </div>
          </section>
        )}

        <section className={styles.section} aria-labelledby="diger-subeler">
          <h2 id="diger-subeler" className={styles.h2}>
            Diğer şubelerimiz
          </h2>
          <ul className={styles.others}>
            {others.map((b) => {
              const p = BRANCH_PHOTOS[b.slug];
              return (
                <li key={b.slug}>
                  <Link href={b.href} className={styles.other}>
                    <span className={styles.otherPhoto}>
                      <Image
                        src={p.src}
                        alt=""
                        fill
                        sizes="(max-width: 599px) 50vw, 300px"
                        className={styles.cover}
                        style={p.position ? { objectPosition: p.position } : undefined}
                      />
                    </span>
                    <span className={styles.otherName}>{b.name}</span>
                    {b.phone && <span className={styles.otherPhone}>{b.phone}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </SiteChrome>
  );
}
