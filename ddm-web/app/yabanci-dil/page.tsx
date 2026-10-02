import Link from "next/link";
import type { Metadata } from "next";

import { SiteChrome } from "@/components/layout";
import { Accordion } from "@/components/ui";
import { HubHero } from "@/components/sections/HubHero";
import { PageSection } from "@/components/sections/PageSection";
import { GreetingWall, LanguageTiles } from "@/components/sections/HubLanguages";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { HubAbout } from "@/components/sections/HubAbout";
import { ContactForm } from "@/components/sections/ContactForm";
import { FORM_HREF } from "@/lib/formAnchor";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { LANGUAGE_HUB, LANGUAGE_HUB_ADDED } from "@/data/hubs";
import { LANGUAGE_PAGES } from "@/data/languages";
import { getCategoryHubPage } from "@/lib/hubContent";
import { hubRelated, languageLinks, languageTiles, linkIfProduced } from "@/lib/hubLinks";
import { absoluteUrl } from "@/lib/site";
import blocks from "@/styles/HubBlocks.module.css";

/**
 * P3 — Yabancı Dil Programları hub'ı. Karakteri: her dil kendi selamıyla
 * (hero'da selam duvarı), ardından fotoğraflı dil kartları. Sistem pilotla
 * aynı (hero → baskın ızgara → tablo → lacivert kurum+SSS → CTA → ilgili).
 */

export function generateMetadata(): Metadata {
  const page = getCategoryHubPage(LANGUAGE_HUB);
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: absoluteUrl(LANGUAGE_HUB.path) },
  };
}

export default function YabanciDilHubPage() {
  const page = getCategoryHubPage(LANGUAGE_HUB);
  const added = LANGUAGE_HUB_ADDED;

  // Selam duvarı: 9 dil (İngilizce Konuşma ayrı bir dil değil — kartlarda duruyor).
  const wall = languageLinks("short", ["ingilizce-konusma-kursu"], "core");

  const rows = added.table.map((r) => {
    const lang = LANGUAGE_PAGES.find((l) => l.slug === r.slug);
    if (!lang) throw new Error(`[yabanci-dil] data/languages.ts'te "${r.slug}" yok.`);
    return {
      name: lang.label,
      href: linkIfProduced(`/yabanci-dil-egitimleri/${r.slug}`),
      cells: { duration: r.duration, group: r.group, exams: r.exams },
    };
  });

  return (
    <SiteChrome ctaLabel="Bilgi Al">
      <HubHero
        crumbs={[{ label: "Anasayfa", href: "/" }, { label: LANGUAGE_HUB.label }]}
        h1={page.h1}
        lead={page.slots.intro[0] ?? null}
        primary={{ label: "Dilini seç", href: "#diller" }}
        secondary={{ label: "Bilgi Al", href: FORM_HREF }}
        media={<GreetingWall items={wall} />}
      />

      <PageSection id="diller" title={LANGUAGE_HUB.slots.gridTitle.heading ?? ""} lead={added.gridLead}>
        <LanguageTiles items={languageTiles()} />
      </PageSection>

      <PageSection id="diger-diller" ground="gray" title={page.slots.otherTitle[0] ?? ""} lead={added.otherText} headingSize="sm">
        <ul className={blocks.otherLangs} aria-label="Diğer diller">
          {added.extraLanguages.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={blocks.otherLangLink}>
                {l.label}
              </Link>
            </li>
          ))}
          {added.otherLanguages.map((l) => (
            <li key={l} className={blocks.otherLang}>
              {l}
            </li>
          ))}
        </ul>
      </PageSection>

      <ComparisonTable
        id="karsilastirma"
        title={added.tableTitle}
        lead={added.tableLead}
        firstLabel="Dil"
        columns={[
          { key: "duration", label: "Bir kur" },
          { key: "group", label: "Sınıf" },
          { key: "exams", label: "Hazırlanabileceğiniz sınavlar" },
        ]}
        rows={rows}
        note={added.tableNote}
      />

      <HubAbout
        id="programlar"
        title={page.heading("Dünya Dilleri Merkezi Yabancı Dil Kursları")}
        paragraphs={added.aboutParagraphs}
        features={page.features}
        asideId="sss"
        asideTitle="Sık sorulan sorular"
        aside={<Accordion items={added.faq} name="sss" />}
      />

      <ContactForm
        ground="white"
        title={page.slots.contact[0] ?? "Bizimle İletişime Geçin"}
        lead={added.ctaSub}
      />

      <RelatedLinks
        title="İlgili sayfalar"
        groups={hubRelated(LANGUAGE_HUB.path, {
          title: "En çok aranan kurslar",
          links: [
            { label: "İngilizce Kursu", href: "/yabanci-dil-egitimleri/ingilizce-kursu" },
            { label: "Almanca Kursu", href: "/yabanci-dil-egitimleri/almanca-kursu" },
            { label: "İspanyolca Kursu", href: "/yabanci-dil-egitimleri/ispanyolca-kursu" },
            { label: "İngilizce Konuşma Kursu", href: "/yabanci-dil-egitimleri/ingilizce-konusma-kursu" },
            { label: "İngilizce seviyeleri", href: "/ingilizce-kurslari" },
          ],
        })}
      />
    </SiteChrome>
  );
}
