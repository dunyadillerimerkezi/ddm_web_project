import type { Metadata } from "next";

import { SiteChrome } from "@/components/layout";
import { Accordion } from "@/components/ui";
import { HubHero, HubPhoto } from "@/components/sections/HubHero";
import { AttributedFacts, PartnerLogos, StatementRow, SubList } from "@/components/sections/HubBlocks";
import { HubGuide } from "@/components/sections/HubGuide";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { HubCards } from "@/components/sections/HubCards";
import { HubAbout } from "@/components/sections/HubAbout";
import { ContactForm } from "@/components/sections/ContactForm";
import { FORM_HREF } from "@/lib/formAnchor";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { ABROAD_HUB, ABROAD_HUB_ADDED } from "@/data/hubs";
import { ABROAD_SECTION } from "@/data/home";
import { getCategoryHubPage, stripArrow } from "@/lib/hubContent";
import { hubRelated, linkIfProduced } from "@/lib/hubLinks";
import { absoluteUrl } from "@/lib/site";

/**
 * P3 — Yurtdışı Eğitim, "içerikli hub" (kullanıcı kararı 2026-09-23).
 * Karakteri: partner okullar (Kaplan / ILSC) + dile göre okul blokları +
 * ülke tablosu. Kaplan'a ait rakamlar Kaplan adıyla atfedilir.
 * 11 alt sayfanın tamamı P4'te → program kartları soluk.
 */

export function generateMetadata(): Metadata {
  const page = getCategoryHubPage(ABROAD_HUB);
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: absoluteUrl(ABROAD_HUB.path) },
  };
}

export default function YurtdisiEgitimHubPage() {
  const page = getCategoryHubPage(ABROAD_HUB);
  const added = ABROAD_HUB_ADDED;
  const s = page.slots;

  // Ülke/şehir satırları kaynakta çift çift: ["Kanada", ": Toronto, …", …]
  const countryRows = [];
  for (let i = 0; i < s.countries.length; i += 2) {
    const country = s.countries[i];
    countryRows.push({
      name: country,
      href: null,
      cells: { cities: s.countries[i + 1].replace(/^:\s*/, ""), lang: added.countryLanguage[country] ?? "—" },
    });
  }

  const programs = s.programLinks.map((line) => {
    const href = added.programTargets[line];
    if (!href) throw new Error(`[yurtdisi-egitim] "${line}" için hedef yok.`);
    return { title: stripArrow(line), text: added.programTexts[line] ?? "", href: linkIfProduced(href) };
  });

  return (
    <SiteChrome ctaLabel="Bilgi Al">
      <HubHero
        crumbs={[{ label: "Anasayfa", href: "/" }, { label: ABROAD_HUB.label }]}
        h1={page.h1}
        lead={ABROAD_SECTION.panelText}
        primary={{ label: "Dile göre okullar", href: "#diller" }}
        secondary={{ label: "Bilgi Al", href: FORM_HREF }}
        note={<PartnerLogos logos={added.logos} note="resmi kayıt ofisi" />}
        media={<HubPhoto {...added.photo} />}
      />

      <StatementRow
        tone="gray"
        items={[
          { title: page.heading("Dil Kurslarımız"), text: s.langs[0] ?? "" },
          { title: page.heading("Uluslararası Deneyim"), text: s.experience[0] ?? "" },
          { title: page.heading("En Çok Tercih Edilen Ülkeler"), text: s.countriesIntro[0] ?? "" },
        ]}
      />

      <HubGuide
        id="diller"
        title={added.guideTitle}
        lead={added.guideLead}
        tocLabel="Dile göre"
        groups={[
          {
            id: "ingilizce",
            label: s.enTitle[0] ?? "",
            tocLabel: "İngilizce",
            intro: s.en,
            body: <AttributedFacts source={added.factsSource} facts={s.kaplanFacts} />,
          },
          {
            id: "almanca",
            label: s.deTitle[0] ?? "",
            tocLabel: "Almanca",
            intro: s.deIntro,
            body: <SubList title={page.heading("YETİŞKİNLER İÇİN ALMANCA KURSLARIMIZ")} items={s.de} />,
          },
          {
            id: "fransizca",
            label: s.frTitle[0] ?? "",
            tocLabel: "Fransızca",
            intro: s.frIntro,
            body: <SubList title={page.heading("YETİŞKİNLER İÇİN FRANSIZCA KURSLARIMIZ")} items={s.fr} />,
          },
          {
            id: "ispanyolca",
            label: s.esTitle[0] ?? "",
            tocLabel: "İspanyolca",
            intro: s.esIntro,
            body: <SubList title={page.heading("YETİŞKİNLER İÇİN İSPANYOLCA KURSLARI")} items={s.es} />,
          },
        ]}
        tocExtra={[
          { id: "ulkeler", label: "Ülkeler" },
          { id: "programlar", label: "Programlar" },
          { id: "sss", label: "Sık sorulan sorular" },
        ]}
      />

      <ComparisonTable
        id="ulkeler"
        title={page.heading("Yurtdışı dil Eğitiminde en çok tercih edilen ülkeler Hangileri ?")}
        lead={added.countriesLead}
        firstLabel="Ülke"
        columns={[
          { key: "cities", label: "Öne çıkan şehirler" },
          { key: "lang", label: "Eğitim dili" },
        ]}
        rows={countryRows}
      />

      <HubCards
        id="programlar"
        title={s.consulting[0] ?? ""}
        lead={added.programsLead}
        columns={3}
        items={programs}
      />

      <HubAbout
        id="danismanlik"
        title={page.heading("Dünya Dilleri Merkezi Yurtdışı Dil Eğitimi")}
        paragraphs={added.aboutParagraphs}
        features={page.features}
        asideId="sss"
        asideTitle="Sık sorulan sorular"
        aside={<Accordion items={added.faq} name="sss" />}
      />

      <ContactForm
        ground="white"
        title={s.contact[0] ?? "Bizimle İletişime Geçin"}
        lead={added.ctaSub}
        course="/yurtdisi-egitim"
      />

      <RelatedLinks
        title="İlgili sayfalar"
        groups={hubRelated(ABROAD_HUB.path, {
          title: "Yurtdışı öncesi hazırlık",
          links: [
            { label: "TOEFL Kursu", href: "/sinav-hazirlik-egitimleri/toefl-kursu" },
            { label: "IELTS Kursu", href: "/sinav-hazirlik-egitimleri/ielts-kursu" },
            { label: "TestDaF Kursu", href: "/sinav-hazirlik-egitimleri/testdaf-kursu" },
            { label: "Almanca Kursu", href: "/yabanci-dil-egitimleri/almanca-kursu" },
            { label: "İngilizce Kursu", href: "/yabanci-dil-egitimleri/ingilizce-kursu" },
          ],
        })}
      />
    </SiteChrome>
  );
}
