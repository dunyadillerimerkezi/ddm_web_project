import type { Metadata } from "next";

import { SiteChrome } from "@/components/layout";
import { Accordion } from "@/components/ui";
import { HubHero, HubPhoto } from "@/components/sections/HubHero";
import { LevelRail } from "@/components/sections/HubBlocks";
import { BranchDateRows, type BranchDateRow } from "@/components/sections/BranchDateRows";
import { HubCards } from "@/components/sections/HubCards";
import { HubAbout } from "@/components/sections/HubAbout";
import { LanguageStrip } from "@/components/sections/HubLanguages";
import { ContactForm } from "@/components/sections/ContactForm";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { ENGLISH_HUB, ENGLISH_HUB_ADDED, IK_H1 } from "@/data/hubs";
import { COURSE_DATES } from "@/data/courseDates";
import { getCategoryHubPage, stripArrow } from "@/lib/hubContent";
import { hubRelated, languageLinks, linkIfProduced } from "@/lib/hubLinks";
import { absoluteUrl } from "@/lib/site";

/**
 * P3 — İngilizce Kursları hub'ı. Karakteri: A1 → C2 seviye rayı (sayfanın
 * görsel omurgası), altında şube kurs tarihleri ve hedef kitle programları.
 *
 * Seviye ve program sayfaları P5'te üretildi (2026-09-27; Konuşma kursu Dil Kursu
 * sayfasına bağlanır); şube kurs tarihi sayfaları (6.6) üretilmiş → hepsi gerçek link.
 */

const IK = "/ingilizce-kurslari";

/** Kaynak satırı → hedef (lib/nav.ts ile aynı adresler). */
const TARGETS: Record<string, string> = {
  // Kanonik adres /yabanci-dil-egitimleri/… (P4, 2026-09-26; /ingilizce-kurslari/… 301).
  "→ Dünya Dilleri Merkezi İngilizce Eğitim Sistemi": "/yabanci-dil-egitimleri/ingilizce-kursu/ingilizce-egitim-sistemi",
  "→ Advanced İngilizce C1 Kursu | İleri Seviye C1 İngilizce": `${IK}/advanced-ingilizce-kursu`,
  "→ Upper-Intermediate İngilizce Kursu | İleri Seviye İngilizce": `${IK}/upper-intermediate-ingilizce-kursu`,
  "→ Intermediate İngilizce Kursu | Orta Seviye İngilizce": `${IK}/intermediate-ingilizce-kursu`,
  "→ Pre-Intermediate İngilizce Kursu | Orta Alt Seviye İngilizce Eğitimi": `${IK}/pre-intermediate-ingilizce-kursu`,
  "→ Elementary İngilizce Kursu | Beginner Yeni Başlayanlar İçin İngilizce Kursu": `${IK}/elementary-ingilizce-kursu`,
  "→ Üniversite Hazırlık İngilizcesi": `${IK}/universite-ingilizce-kursu`,
  "→ YKS Dil İngilizce": `${IK}/yks-dil-ingilizce`,
  "→ İlköğretim İngilizcesi": `${IK}/ilkogretim-ingilizce-kursu`,
  "→ Yaz Okulu İngilizce Programları": `${IK}/yaz-okulu-ingilizce-kursu`,
  // P5 (kullanıcı, 2026-09-27): IK konuşma sayfası Dil Kursu sayfasına 301.
  "→ İngilizce Konuşma Kursu | Eğitim Programı İngilizce Konuşma Öğrenme English Speaking": "/yabanci-dil-egitimleri/ingilizce-konusma-kursu",
};

/** Kaynak şube etiketindeki ad → courseDates şube anahtarı. */
const BRANCH_KEYS: [string, string][] = [
  ["Kadıköy", "kadikoy"],
  ["Bağdat Caddesi", "bagdat"],
  ["Etiler", "etiler"],
  ["Ataşehir", "atasehir"],
];

const PROGRAM_LABELS: Record<string, string> = { haftaici: "Hafta içi", haftasonu: "Hafta sonu", birebir: "Birebir" };

function target(line: string): string | null {
  const href = TARGETS[line];
  if (!href) throw new Error(`[ingilizce-kurslari] "${line}" için hedef eşlemesi yok.`);
  return linkIfProduced(href);
}

export function generateMetadata(): Metadata {
  const page = getCategoryHubPage(ENGLISH_HUB);
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: absoluteUrl(ENGLISH_HUB.path) },
  };
}

export default function IngilizceKurslariHubPage() {
  const page = getCategoryHubPage(ENGLISH_HUB);
  const added = ENGLISH_HUB_ADDED;

  const groups = added.railGroups.map((g) => ({
    label: g.label,
    range: g.range,
    levels: g.levels.map((line) => {
      if (!page.slots.levels.includes(line)) throw new Error(`[ingilizce-kurslari] seviye satırı kaynakta yok: "${line}"`);
      // C1: kaynağın (yanlışlıkla H1 olan) başlığı ve C1 metni burada durur.
      const isC1 = line.startsWith("→ Advanced");
      return {
        title: isC1 ? IK_H1 : stripArrow(line),
        text: isC1 ? page.slots.c1.join(" ") : added.levelTexts[line] ?? "",
        href: target(line),
      };
    }),
  }));

  const branchRows: BranchDateRow[] = page.slots.branches.map((line) => {
    const key = BRANCH_KEYS.find(([name]) => line.includes(name));
    const entry = key
      ? COURSE_DATES.find((e) => e.category === "yabanci-dil-egitimleri" && e.courseSlug === "ingilizce-kursu" && e.branch === key[1])
      : undefined;
    if (!entry) throw new Error(`[ingilizce-kurslari] "${line}" için data/courseDates.ts kaydı yok.`);
    const href = `/${entry.category}/${entry.courseSlug}/${entry.pageSlug}`;
    return {
      label: stripArrow(line),
      href: linkIfProduced(href),
      meta: entry.programs.map((p) => PROGRAM_LABELS[p.kind]).filter(Boolean),
      kind: "branch",
    };
  });
  const systemLine = page.slots.system[0] ?? "";
  branchRows.push({ label: stripArrow(systemLine), href: target(systemLine), meta: [], kind: "link" });

  const programs = page.slots.programs.map((line) => {
    const alt = added.programAlt[line];
    return {
      title: stripArrow(line),
      text: added.programTexts[line] ?? "",
      href: target(line),
      alt: alt && linkIfProduced(alt.href) ? alt : undefined,
    };
  });

  return (
    <SiteChrome ctaLabel="Bilgi Al">
      <HubHero
        crumbs={[{ label: "Anasayfa", href: "/" }, { label: ENGLISH_HUB.label }]}
        h1={page.h1}
        lead={page.slots.lead[0] ?? null}
        primary={{ label: "Seviyeni bul", href: "#seviyeler" }}
        secondary={{ label: "Kurs tarihleri", href: "#kurs-tarihleri" }}
        media={
          <HubPhoto
            {...added.photo}
            stats={[
              { value: "60 saat", label: "bir kur" },
              { value: "8 kişi", label: "sınıf" },
            ]}
          />
        }
      />

      <LevelRail id="seviyeler" title={page.slots.levelTitle[0] ?? ""} lead={added.levelsLead} groups={groups} />

      <BranchDateRows
        id="kurs-tarihleri"
        ground="gray"
        kicker="ŞUBE VE KURS TARİHLERİ"
        title={page.slots.branchTitle[0] ?? ""}
        rows={branchRows}
      />

      <HubCards
        id="programlar"
        title={page.heading("Dünya Dilleri Merkezi İngilizce Kursları")}
        lead={added.programsLead}
        columns={3}
        items={programs}
      />

      <HubAbout
        id="egitim-plani"
        title={page.heading("Dünya Dilleri Merkezi İngilizce Kursu Eğitim Planı, Şubeler ve Eğitim Seviyeleri")}
        paragraphs={page.slots.about}
        features={page.features}
        asideId="sss"
        asideTitle="Sık sorulan sorular"
        aside={<Accordion items={added.faq} name="sss" />}
      />

      <ContactForm
        ground="white"
        title={page.slots.contact[0] ?? "Bizimle İletişime Geçin"}
        lead={added.ctaSub}
        course="/ingilizce-kurslari"
      />

      <LanguageStrip
        id="diger-diller"
        label={page.slots.otherLabel[0]}
        title={page.heading("19 dilde eğitim, 2003’ten bugüne Dünya Dilleri Merkezi farkıyla yabancı dil eğitimleri")}
        lead={page.slots.stripTitle[0]}
        items={languageLinks("course", ["ingilizce-kursu"])}
        cta={linkIfProduced("/yabanci-dil") ? { label: page.slots.stripCta[0] ?? "", href: "/yabanci-dil" } : null}
      />

      <RelatedLinks
        title="İlgili sayfalar"
        groups={hubRelated(ENGLISH_HUB.path, {
          title: "İngilizce",
          links: [
            { label: "İngilizce Kursu", href: "/yabanci-dil-egitimleri/ingilizce-kursu" },
            { label: "İngilizce Konuşma Kursu", href: "/yabanci-dil-egitimleri/ingilizce-konusma-kursu" },
            { label: "TOEFL Kursu", href: "/sinav-hazirlik-egitimleri/toefl-kursu" },
            { label: "IELTS Kursu", href: "/sinav-hazirlik-egitimleri/ielts-kursu" },
            { label: "Özel Dersler", href: "/diger-program/ozel-dersler" },
          ],
        })}
      />
    </SiteChrome>
  );
}
