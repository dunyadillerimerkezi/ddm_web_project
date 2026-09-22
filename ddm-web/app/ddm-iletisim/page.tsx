import type { Metadata } from "next";

import { SiteChrome } from "@/components/layout";
import { BranchHero } from "@/components/sections/BranchHero";
import { PageSection } from "@/components/sections/PageSection";
import { BranchTile } from "@/components/cards/BranchTile";
import { BRANCH_LIST } from "@/data/branches";
import { getHubPage, HUB_CRUMBS } from "@/lib/branchContent";
import { absoluteUrl } from "@/lib/site";
import styles from "@/styles/BranchTile.module.css";

/** Faz 6.8 (P1) — Şube İletişim hub'ı: 5 şubeye giden kart grid'i. */

export function generateMetadata(): Metadata {
  const page = getHubPage();
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: absoluteUrl("/ddm-iletisim") },
  };
}

export default function Page() {
  const page = getHubPage();

  return (
    <SiteChrome ctaLabel="Kayıt Ol" ctaHref="#kayit">
      <BranchHero crumbs={HUB_CRUMBS} h1={page.h1} lead={page.lead} />

      <PageSection kicker="ŞUBELER" title="Size En Yakın Şubeyi Seçin" ground="light">
        <div className={styles.grid}>
          {BRANCH_LIST.map((branch) => (
            <BranchTile branch={branch} key={branch.slug} />
          ))}
        </div>
      </PageSection>
    </SiteChrome>
  );
}
