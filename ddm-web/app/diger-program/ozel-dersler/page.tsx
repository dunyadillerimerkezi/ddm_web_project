import type { Metadata } from "next";

import { SiteChrome } from "@/components/layout";
import { Accordion } from "@/components/ui";
import { HubHero, HubPhoto } from "@/components/sections/HubHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { SplitColumns, type SplitItem } from "@/components/sections/HubBlocks";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { HubAbout } from "@/components/sections/HubAbout";
import { CtaBand } from "@/components/sections/CtaBand";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { PRIVATE_HUB, PRIVATE_HUB_ADDED } from "@/data/hubs";
import { EXAMS } from "@/data/exams";
import { LANGUAGES } from "@/data/languages";
import { getCategoryHubPage } from "@/lib/hubContent";
import { CONTACT_HREF, hubRelated, linkIfProduced } from "@/lib/hubLinks";
import { absoluteUrl } from "@/lib/site";

/**
 * P3 — Yabancı Dil Özel Ders Programları hub'ı (siteden en çok link alan ölü
 * hedefti: 126×). Karakteri: "nasıl başlar" üç adımı + dil / sınav iki kolon.
 *
 * 17 özel ders sayfasının hiçbiri henüz yok (P4). Satır soluk durur; okur
 * ilgili KURS sayfasına (üretilmiş) yönlendirilir — ölü link basılmaz.
 */

export function generateMetadata(): Metadata {
  const page = getCategoryHubPage(PRIVATE_HUB);
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: absoluteUrl(PRIVATE_HUB.path) },
  };
}

/** "/yabanci-dil-egitimleri/almanca-kursu/almanca-ozel-ders" → Almanca Kursu (üretilmişse). */
function parentCourse(href: string): { label: string; href: string } | null {
  const [, category, slug] = href.split("/");
  const parentHref = `/${category}/${slug}`;
  if (!linkIfProduced(parentHref)) return null;
  const label = LANGUAGES.find((l) => l.slug === slug)?.label ?? EXAMS.find((e) => e.slug === slug)?.label;
  return label ? { label, href: parentHref } : null;
}

export default function OzelDerslerHubPage() {
  const page = getCategoryHubPage(PRIVATE_HUB);
  const added = PRIVATE_HUB_ADDED;

  const items: (SplitItem & { lang: boolean })[] = page.sourceLinks.map((l) => ({
    label: l.label,
    href: linkIfProduced(l.href),
    parent: parentCourse(l.href),
    lang: l.href.startsWith("/yabanci-dil-egitimleri/"),
  }));

  return (
    <SiteChrome ctaLabel="Bilgi Al" ctaHref={CONTACT_HREF}>
      <HubHero
        crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Diğer Programlar", href: "/diger-program" }, { label: PRIVATE_HUB.label }]}
        h1={page.h1}
        lead={page.slots.intro[0] ?? null}
        primary={{ label: "Özel dersleri incele", href: "#dersler" }}
        secondary={{ label: "Bilgi Al", href: CONTACT_HREF }}
        media={<HubPhoto {...added.photo} />}
      />

      <ProcessSteps
        id="nasil-baslar"
        kicker="ÖZEL DERS SÜRECİ"
        title={added.stepsTitle}
        lead={page.slots.pairs[0]}
        steps={added.steps.map((s) => ({ title: s.title, body: page.slots[s.slot][0] ?? "" }))}
      />

      <SplitColumns
        id="dersler"
        ground="gray"
        title={PRIVATE_HUB.slots.listTitle.heading ?? ""}
        lead={added.columnsLead}
        columns={[
          { ...added.languageColumn, items: items.filter((i) => i.lang) },
          { ...added.examColumn, items: items.filter((i) => !i.lang) },
        ]}
      />

      <ComparisonTable
        id="karsilastirma"
        title={added.compareTitle}
        lead={added.compareLead}
        firstLabel="Ölçüt"
        columns={[
          { key: "ozel", label: "Özel ders" },
          { key: "grup", label: "Grup dersi" },
        ]}
        rows={added.compare.map((c) => ({ name: c.row, href: null, cells: { ozel: c.ozel, grup: c.grup } }))}
      />

      <HubAbout
        id="yontem"
        title={page.heading("Özel Dil Eğitimi Yöntemi")}
        paragraphs={page.slots.method}
        features={[]}
        asideId="sss"
        asideTitle="Sık sorulan sorular"
        aside={<Accordion items={added.faq} name="sss" />}
      />

      <CtaBand
        ground="light"
        title={added.ctaTitle}
        sub={added.ctaSub}
        primary={{ label: "Bilgi Al", href: CONTACT_HREF }}
      />

      <RelatedLinks
        title="İlgili sayfalar"
        groups={hubRelated(PRIVATE_HUB.path, {
          title: "Grup kursları",
          links: [
            { label: "İngilizce Kursu", href: "/yabanci-dil-egitimleri/ingilizce-kursu" },
            { label: "İngilizce Konuşma Kursu", href: "/yabanci-dil-egitimleri/ingilizce-konusma-kursu" },
            { label: "TOEFL Kursu", href: "/sinav-hazirlik-egitimleri/toefl-kursu" },
            { label: "IELTS Kursu", href: "/sinav-hazirlik-egitimleri/ielts-kursu" },
            { label: "Proficiency Kursu", href: "/sinav-hazirlik-egitimleri/proficiency-kursu" },
          ],
        })}
      />
    </SiteChrome>
  );
}
