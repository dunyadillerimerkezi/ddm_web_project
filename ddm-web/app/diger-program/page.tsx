import type { Metadata } from "next";

import { SiteChrome } from "@/components/layout";
import { Accordion } from "@/components/ui";
import { HubHero } from "@/components/sections/HubHero";
import { IndexCard } from "@/components/sections/HubBlocks";
import { HubCards, type HubCardItem } from "@/components/sections/HubCards";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { HubAbout } from "@/components/sections/HubAbout";
import { CtaBand } from "@/components/sections/CtaBand";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { OTHER_PROGRAMS_HUB, OTHER_PROGRAMS_HUB_ADDED } from "@/data/hubs";
import { getCategoryHubPage } from "@/lib/hubContent";
import { CONTACT_HREF, hubRelated, linkIfProduced } from "@/lib/hubLinks";
import { absoluteUrl } from "@/lib/site";

/**
 * P3 — Diğer Eğitim Programları hub'ı. Karakteri: hero'da görsel yerine
 * lacivert program dizini; gövdede iki geniş kartla başlayan program ızgarası.
 * Kurumsal Dil Eğitimi menüde bu sekmede (PM kararı) → kart olarak eklendi.
 */

const DP = "/diger-program";

export function generateMetadata(): Metadata {
  const page = getCategoryHubPage(OTHER_PROGRAMS_HUB);
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: absoluteUrl(OTHER_PROGRAMS_HUB.path) },
  };
}

export default function DigerProgramHubPage() {
  const page = getCategoryHubPage(OTHER_PROGRAMS_HUB);
  const added = OTHER_PROGRAMS_HUB_ADDED;
  const IMG = "/assets/home_page_images";

  const programs: (Omit<HubCardItem, "href"> & { target: string; sameTopic?: string })[] = [
    {
      title: page.heading("Yurt Dışı Eğitim"),
      target: `${DP}/yurtdisinda-egitim`,
      text: page.slots.abroad[0] ?? "",
      image: { src: `${IMG}/yurtdisi-egitim.jpg`, alt: "Yurtdışında kampüste öğrenciler" },
      feature: true,
      alt: { label: "Yurtdışı eğitim programları", href: "/yurtdisi-egitim" },
      // Aynı konunun üretilmiş hub'ı — dizinde hedef yokken buraya gidilir.
      sameTopic: "/yurtdisi-egitim",
    },
    {
      title: "Özel Dersler",
      target: `${DP}/ozel-dersler`,
      text: page.slots.private[0] ?? "",
      image: { src: `${IMG}/ozel-ders.jpg`, alt: "Birebir yabancı dil dersi" },
    },
    {
      title: "Business English",
      target: `${DP}/business-english`,
      text: page.slots.business[0] ?? "",
      image: { src: `${IMG}/is-ingilizcesi.jpg`, alt: "Toplantıda iş İngilizcesi" },
    },
    {
      title: "Kurumsal Dil Eğitimi",
      target: "/kurumsal-dil-egitim",
      text: added.kurumsalText,
      icon: "calisma",
    },
    {
      title: "Çocuklar İçin Dil Eğitimi",
      target: `${DP}/cocuklar-icin-ingilizce-kursu`,
      text: page.slots.kids[0] ?? "",
      image: { src: `${IMG}/ddm-kids.jpg`, alt: "Çocuklar için İngilizce sınıfı" },
      feature: true,
      alt: { label: "TOEFL Primary eğitimi", href: "/sinav-hazirlik-egitimleri/cocuklar-icin-toefl-primary-egitimi" },
    },
    {
      title: "Online Dil Eğitimi",
      target: `${DP}/online-dil-egitimi`,
      text: page.slots.online[0] ?? "",
      icon: "dunya",
      alt: { label: "Dil kurslarımız", href: "/yabanci-dil" },
    },
    {
      title: "Tercüme Hizmetleri",
      target: `${DP}/tercume-hizmetleri`,
      text: added.translationText,
      icon: "belge",
    },
  ];
  const cards: HubCardItem[] = programs.map((p) => ({
    title: p.title,
    text: p.text,
    image: p.image,
    icon: p.icon,
    feature: p.feature,
    href: linkIfProduced(p.target),
    alt: p.alt && linkIfProduced(p.alt.href) ? p.alt : undefined,
  }));

  // Kaynaktaki kısa liste + kaynağın "Yurt Dışı Eğitim" başlığı + menüdeki Kurumsal.
  // Hedef yoksa yalnız AYNI konunun üretilmiş sayfası (`sameTopic`) kullanılır;
  // kartlardaki `alt` önerileri (TOEFL Primary vb.) dizinde yanıltıcı olurdu.
  const indexTitles = [...page.slots.shortList, page.heading("Yurt Dışı Eğitim"), "Kurumsal Dil Eğitimi"];
  const index = indexTitles.map((title) => {
    const p = programs.find((x) => x.title === title);
    if (!p) throw new Error(`[diger-program] dizin başlığı kartlarda yok: "${title}"`);
    const href = linkIfProduced(p.target) ?? (p.sameTopic ? linkIfProduced(p.sameTopic) : null);
    return { label: p.title, href };
  });

  const rows = added.table.map((r) => {
    const p = programs.find((x) => x.title === r.name);
    return { name: r.name, href: p ? linkIfProduced(p.target) : null, cells: { who: r.who, how: r.how } };
  });

  return (
    <SiteChrome ctaLabel="Bilgi Al" ctaHref={CONTACT_HREF}>
      <HubHero
        crumbs={[{ label: "Anasayfa", href: "/" }, { label: OTHER_PROGRAMS_HUB.label }]}
        h1={page.h1}
        lead={page.slots.intro[0] ?? null}
        primary={{ label: "Programları incele", href: "#programlar" }}
        secondary={{ label: "Bilgi Al", href: CONTACT_HREF }}
        media={<IndexCard title="Programlarımız" items={index} />}
      />

      <HubCards
        id="programlar"
        title={page.heading("Dünya Dilleri Merkezi Şubelerimizde Diğer Eğitim Programalrımız")}
        columns={3}
        items={cards}
      />

      <ComparisonTable
        id="karsilastirma"
        title={added.tableTitle}
        lead={added.tableLead}
        firstLabel="Program"
        columns={[
          { key: "who", label: "Kimler için" },
          { key: "how", label: "Nasıl işler" },
        ]}
        rows={rows}
      />

      <HubAbout
        id="neden-ddm"
        title={added.aboutTitle}
        paragraphs={added.aboutParagraphs}
        features={page.features}
        asideId="sss"
        asideTitle="Sık sorulan sorular"
        aside={<Accordion items={added.faq} name="sss" />}
      />

      <CtaBand
        ground="light"
        title={page.slots.contact[0] ?? "Bizimle İletişime Geçin"}
        sub={added.ctaSub}
        primary={{ label: "Bilgi Al", href: CONTACT_HREF }}
      />

      <RelatedLinks
        title="İlgili sayfalar"
        groups={hubRelated(OTHER_PROGRAMS_HUB.path, {
          title: "Öne çıkanlar",
          links: [
            { label: "Özel Dersler", href: `${DP}/ozel-dersler` },
            { label: "Kurumsal Dil Eğitimi", href: "/kurumsal-dil-egitim" },
            { label: "İngilizce Konuşma Kursu", href: "/yabanci-dil-egitimleri/ingilizce-konusma-kursu" },
            { label: "TOEFL Primary eğitimi", href: "/sinav-hazirlik-egitimleri/cocuklar-icin-toefl-primary-egitimi" },
          ],
        })}
      />
    </SiteChrome>
  );
}
