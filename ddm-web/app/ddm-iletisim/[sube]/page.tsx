import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteChrome } from "@/components/layout";
import { BranchHero } from "@/components/sections/BranchHero";
import { PageSection } from "@/components/sections/PageSection";
import { BranchInfoPanel } from "@/components/sections/BranchInfoPanel";
import { BRANCH_LIST, telHref, waHref } from "@/data/branches";
import { getBranchPage } from "@/lib/branchContent";
import { absoluteUrl } from "@/lib/site";

/**
 * Faz 6.8 (P1) — Şube İletişim sayfası, 5 şube için tek dinamik route.
 *
 * Kaynağın form + KVKK gövdesi kullanıcı kararıyla (form işi sona bırakıldı)
 * ŞİMDİLİK render EDİLMİYOR — bkz. `lib/branchContent.ts` dosya başlığı.
 * Sayfa yalnız adres/telefon/e-posta (`BranchInfoPanel`, Faz 6.6'da yazılmış,
 * o zaman kullanılmamıştı) + hızlı ara/WhatsApp aksiyonlarını gösteriyor.
 */

export const dynamicParams = false;

function paramOf(href: string): string {
  return href.split("/").pop()!;
}

export function generateStaticParams() {
  return BRANCH_LIST.map((b) => ({ sube: paramOf(b.href) }));
}

type Params = { sube: string };

function findBranch(sube: string) {
  return BRANCH_LIST.find((b) => paramOf(b.href) === sube);
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { sube } = await params;
  const branch = findBranch(sube);
  if (!branch) return {};
  const page = getBranchPage(branch);
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: absoluteUrl(branch.href) },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { sube } = await params;
  const branch = findBranch(sube);
  if (!branch) notFound();

  const page = getBranchPage(branch);
  const tel = telHref(branch);
  const wa = waHref(branch);
  // Etiler/Levent'in WhatsApp hattı yok (branches.ts) — cümle o şube için
  // olmayan bir kanalı vaat etmesin diye koşullu kuruluyor.
  const lead = wa
    ? `${branch.name} şubemizin adres, telefon ve WhatsApp bilgilerine aşağıdan ulaşabilirsiniz.`
    : `${branch.name} şubemizin adres ve telefon bilgilerine aşağıdan ulaşabilirsiniz.`;

  return (
    <SiteChrome branch={branch} ctaLabel="Bilgi Al" ctaHref={branch.href}>
      <BranchHero
        crumbs={page.crumbs}
        h1={page.h1}
        lead={lead}
        primary={{ label: "Bizi Arayın", href: tel }}
        secondary={wa ? { label: "WhatsApp'tan Yazın", href: wa } : undefined}
      />

      <PageSection kicker="İLETİŞİM" title={`${branch.name} Şubesi`} ground="light">
        <BranchInfoPanel branch={branch} />
      </PageSection>
    </SiteChrome>
  );
}
