import type { Metadata } from "next";

import { BranchHub } from "@/components/sections/BranchHub";
import { getHubPage, HUB_CRUMBS } from "@/lib/branchContent";
import { withSocial } from "@/lib/meta";
import { absoluteUrl } from "@/lib/site";

/** Faz 6.8 (P1) — Şube İletişim hub'ı: 5 şube (UI turu 2026-09-28: semt fotoğraflı kartlar, `BranchHub`). */

export function generateMetadata(): Metadata {
  const page = getHubPage();
  return withSocial({
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: absoluteUrl("/ddm-iletisim") },
  });
}

export default function Page() {
  return <BranchHub page={getHubPage()} crumbs={HUB_CRUMBS} />;
}
