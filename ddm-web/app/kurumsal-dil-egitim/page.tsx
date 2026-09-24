import type { Metadata } from "next";

import { SiteChrome } from "@/components/layout";
import { Accordion } from "@/components/ui";
import { HubHero, HubPhoto } from "@/components/sections/HubHero";
import { CheckList, StatementRow, SubList } from "@/components/sections/HubBlocks";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { PageSection } from "@/components/sections/PageSection";
import { HubCards } from "@/components/sections/HubCards";
import { HubAbout } from "@/components/sections/HubAbout";
import { CtaBand } from "@/components/sections/CtaBand";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { CORPORATE_HUB, CORPORATE_HUB_ADDED } from "@/data/hubs";
import { getCategoryHubPage } from "@/lib/hubContent";
import { CONTACT_HREF, hubRelated, linkIfProduced } from "@/lib/hubLinks";
import { absoluteUrl } from "@/lib/site";

/**
 * P3 — Kurumsal Dil Eğitimi (B2B). Diğer hub'lardan BİLİNÇLİ olarak farklı:
 * lacivert hero, "kurumsal teklif" CTA'sı, dört adımlı süreç, hizmet
 * maddeleri ve raporlama vurgusu. Menüde Diğer Programlar sekmesi altında.
 */

export function generateMetadata(): Metadata {
  const page = getCategoryHubPage(CORPORATE_HUB);
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: absoluteUrl(CORPORATE_HUB.path) },
  };
}

export default function KurumsalHubPage() {
  const page = getCategoryHubPage(CORPORATE_HUB);
  const added = CORPORATE_HUB_ADDED;
  const s = page.slots;

  const steps = added.steps.map((st) => ({
    title: st.title,
    body: "body" in st && st.body ? st.body : "slot" in st && st.slot ? (s[st.slot][0] ?? "") : "",
  }));

  return (
    <SiteChrome ctaLabel="Teklif Al" ctaHref={CONTACT_HREF}>
      <HubHero
        tone="dark"
        crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Diğer Programlar", href: "/diger-program" }, { label: CORPORATE_HUB.label }]}
        h1={page.h1}
        lead={s.lead[0] ?? null}
        primary={{ label: "Kurumsal teklif alın", href: CONTACT_HREF }}
        secondary={{ label: "Süreci inceleyin", href: "#surec" }}
        media={<HubPhoto {...added.photo} />}
      />

      <StatementRow
        items={[
          { title: page.heading("İşlevsel Yabancı Dil Ustalığı"), text: s.functional[0] ?? "" },
          { title: page.heading("Deneyim ve Şubelerimiz"), text: s.experience[0] ?? "" },
        ]}
      />

      <ProcessSteps id="surec" kicker="SÜREÇ" title={added.stepsTitle} lead={added.stepsLead} ground="gray" steps={steps} />

      <PageSection id="hizmetler" title={s.serviceTitle[0] ?? ""}>
        <CheckList items={s.services} columns={2} />
        <SubList as="h3" title={s.oppTitle[0] ?? ""} items={s.opps} columns={2} />
      </PageSection>

      <HubCards
        id="programlar"
        ground="gray"
        title={added.programsTitle}
        lead={added.programsLead}
        columns={4}
        items={added.programs.map((p) => ({ title: p.title, text: p.text, href: linkIfProduced(p.href) }))}
      />

      <HubAbout
        id="raporlama"
        title={page.heading("Dünya Dilleri Merkezi İ Kurumsal Dil Eğitimi")}
        paragraphs={[...s.roi, ...s.support, ...s.philosophy]}
        features={page.features}
        asideId="sss"
        asideTitle="Sık sorulan sorular"
        aside={<Accordion items={added.faq} name="sss" />}
      />

      <CtaBand
        ground="light"
        title={s.contact[0] ?? "Bizimle İletişime Geçin"}
        sub={s.closing[0]}
        primary={{ label: "Kurumsal teklif alın", href: CONTACT_HREF }}
      />

      <RelatedLinks
        title="İlgili sayfalar"
        groups={hubRelated(CORPORATE_HUB.path, {
          title: "Kurumlar için",
          links: [
            { label: "Özel Dersler", href: "/diger-program/ozel-dersler" },
            { label: "TOEIC Kursu", href: "/sinav-hazirlik-egitimleri/toeic-kursu" },
            { label: "İngilizce Kursu", href: "/yabanci-dil-egitimleri/ingilizce-kursu" },
            { label: "Yabancılar için Türkçe", href: "/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs" },
          ],
        })}
      />
    </SiteChrome>
  );
}
