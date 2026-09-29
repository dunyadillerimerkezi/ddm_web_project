import Image from "next/image";
import Link from "next/link";

import { SiteChrome } from "@/components/layout";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { BRANCH_LIST, telHref } from "@/data/branches";
import { BRANCH_PHOTOS } from "@/data/branchPhotos";
import { PROMO_PATHS } from "@/data/branchPromoPaths";
import type { HubPage } from "@/lib/branchContent";
import type { Crumb } from "@/lib/types";
import { ContactForm } from "./ContactForm";
import { KvkkSection } from "./KvkkSection";
import hero from "@/styles/BranchContactPage.module.css";
import styles from "@/styles/BranchHub.module.css";

/**
 * `/ddm-iletisim` — şubeler iletişim ana sayfası (P1; UI turu 2026-09-28, iletişim "A" ailesi). Açık hero + 5 şube semt
 * fotoğraflı kartta (3 + 2): adres, telefon, "İletişim" ve (varsa) "Şubeyi tanıyın". Başlık / açıklama kaynaktan
 * (`getHubPage`). Header "Bilgi Al" → sayfadaki form (PF, varsayılan `FORM_HREF`); en sonda KVKK metni (`KvkkSection`).
 */
export function BranchHub({ page, crumbs }: { page: HubPage; crumbs: Crumb[] }) {
  return (
    <SiteChrome ctaLabel="Bilgi Al">
      <section className={hero.hero}>
        <div className={styles.heroInner}>
          <Breadcrumb items={crumbs} tone="onLight" />
          <h1 className={hero.title}>{page.h1}</h1>
          <p className={hero.lead}>{page.lead}</p>
        </div>
      </section>

      <div className={styles.body}>
        <ul className={styles.grid}>
          {BRANCH_LIST.map((b) => {
            const photo = BRANCH_PHOTOS[b.slug];
            const promo = PROMO_PATHS[b.slug];
            const tel = telHref(b);
            return (
              <li key={b.slug} className={styles.card}>
                <div className={styles.photo}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 999px) 100vw, 640px"
                    className={styles.cover}
                    style={photo.position ? { objectPosition: photo.position } : undefined}
                  />
                  <span className={styles.tag}>{b.kicker}</span>
                </div>
                <div className={styles.cardBody}>
                  <h2 className={styles.name}>{b.name}</h2>
                  {b.address && <p className={styles.address}>{b.address}</p>}
                  {b.phone && (tel ? <a href={tel} className={styles.phone}>{b.phone}</a> : <p className={styles.phone}>{b.phone}</p>)}
                </div>
                <div className={styles.links}>
                  <Link href={b.href}>İletişim</Link>
                  {promo && <Link href={promo}>Şubeyi tanıyın</Link>}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <ContactForm ground="white" kvkkInPage />
      <div className={styles.kvkk}>
        <KvkkSection />
      </div>
    </SiteChrome>
  );
}
