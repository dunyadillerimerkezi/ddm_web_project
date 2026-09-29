import type { Metadata } from "next";
import Link from "next/link";

import { SiteChrome } from "@/components/layout";
import { Accordion } from "@/components/ui";
import { HubHero, HubPhoto } from "@/components/sections/HubHero";
import { HubGuide, type HubGuideGroup } from "@/components/sections/HubGuide";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { HubAbout } from "@/components/sections/HubAbout";
import { ContactForm } from "@/components/sections/ContactForm";
import { FORM_HREF } from "@/lib/formAnchor";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { EXAM_HUB, EXAM_HUB_ADDED } from "@/data/hubs";
import { EXAMS, getExamDef } from "@/data/exams";
import { BRANCH_LIST } from "@/data/branches";
import { UNIVERSITY_INDEX } from "@/data/universities";
import { examHref } from "@/lib/examContent";
import { getCategoryHubPage } from "@/lib/hubContent";
import { hubRelated, linkIfProduced, onlyProduced } from "@/lib/hubLinks";
import { absoluteUrl } from "@/lib/site";
import uniStyles from "@/styles/HubUniversities.module.css";

/**
 * P3 PİLOT — Sınav Hazırlık Kursları kategori hub'ı.
 *
 * Onaylanan tasarım: "C (editoryal rehber) + B'nin karşılaştırma tablosu"
 * (kullanıcı, 2026-09-23). Bölüm ağırlığı: hero + amaç rehberi baskın;
 * tablo ve kurum/SSS destekleyici; CTA ve ilgili sayfalar kısa.
 *
 * Kaynak metin `lib/hubContent.ts` üzerinden (kapsama + izlenebilir edits);
 * eklenen içerik `EXAM_HUB_ADDED`. Bütün linkler `isProducedPage()` süzgecinden
 * geçer — üretilmemiş hedefe link basılmaz.
 */

export function generateMetadata(): Metadata {
  const page = getCategoryHubPage(EXAM_HUB);
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: absoluteUrl(EXAM_HUB.path) },
  };
}

function buildGroups(): HubGuideGroup[] {
  const added = EXAM_HUB_ADDED;
  return added.groups
    .map((g) => {
      const items = added.catalog
        .filter((c) => c.goals[0] === g.key)
        .map((c) => {
          const def = getExamDef(c.slug);
          if (!def) throw new Error(`[hub] data/exams.ts'te "${c.slug}" yok (EXAM_HUB_ADDED.catalog).`);
          return {
            title: def.label,
            href: linkIfProduced(examHref(def.slug)),
            mark: { code: def.code ?? def.name, logo: c.logo },
            text: c.use,
            side: { value: c.validity, label: "geçerlilik" },
            badge: c.online ? "Online" : undefined,
          };
        });
      return { id: g.key, label: g.label, intro: g.intro, items, footer: g.key === "hazirlik" ? <UniversityChips /> : undefined };
    })
    .filter((g) => g.items.length > 0);
}

/** Kaynak listesindeki üniversitelerin proficiency sayfaları + tümü. */
function UniversityChips() {
  const unis = EXAM_HUB_ADDED.universities
    .map((slug) => UNIVERSITY_INDEX.find((u) => u.slug === slug))
    .filter((u) => u !== undefined)
    .map((u) => ({
      label: u.examCode ? `${u.name} ${u.examCode}` : u.name,
      href: linkIfProduced(`/sinav-hazirlik-egitimleri/proficiency-kursu/${u.slug}`),
    }))
    .filter((u): u is { label: string; href: string } => u.href !== null);
  const all = linkIfProduced("/sinav-hazirlik-egitimleri/proficiency-kursu#universiteler");

  return (
    <ul className={uniStyles.list} aria-label="Üniversite proficiency sayfaları">
      {unis.map((u) => (
        <li key={u.href}>
          <Link href={u.href} className={uniStyles.chip}>
            {u.label}
          </Link>
        </li>
      ))}
      {all && (
        <li>
          <Link href={all} className={uniStyles.chipAll}>
            Tüm üniversiteler ({UNIVERSITY_INDEX.length})
          </Link>
        </li>
      )}
    </ul>
  );
}

export default function SinavHazirlikHubPage() {
  const page = getCategoryHubPage(EXAM_HUB);
  const added = EXAM_HUB_ADDED;

  const heroLinks = onlyProduced(page.sourceLinks);

  // "Ne için kullanılır" cümlesi rehber listesinde zaten var; tabloda tekrar
  // etmesin diye amaç grupları (birden çok olabilir) listelenir.
  const goalLabel = new Map(added.groups.map((g) => [g.key, g.label]));
  const rows = added.catalog.map((c) => {
    const def = getExamDef(c.slug)!;
    return {
      name: def.code ?? def.name,
      href: linkIfProduced(examHref(def.slug)),
      sub: def.label,
      cells: {
        goals: c.goals.map((k) => goalLabel.get(k)).join(", "),
        measures: c.measures,
        validity: c.validity,
      },
    };
  });

  const related = hubRelated(EXAM_HUB.path, {
    title: "En çok aranan kurslar",
    links: [
      { label: "TOEFL Kursu", href: examHref("toefl-kursu") },
      { label: "IELTS Kursu", href: examHref("ielts-kursu") },
      { label: "YDS Kursu", href: examHref("yds-kursu") },
      { label: "Proficiency Kursu", href: examHref("proficiency-kursu") },
      { label: "Üniversite proficiency sınavları", href: "/sinav-hazirlik-egitimleri/proficiency-kursu#universiteler" },
    ],
  });

  return (
    <SiteChrome ctaLabel="Bilgi Al">
      <HubHero
        crumbs={[{ label: "Anasayfa", href: "/" }, { label: EXAM_HUB.label }]}
        h1={page.h1}
        lead={page.slots.lead[0] ?? null}
        primary={{ label: "Sınavları incele", href: "#amaca-gore" }}
        secondary={{ label: "Bilgi Al", href: FORM_HREF }}
        links={heroLinks}
        linksLabel="Öne çıkan kurslar"
        media={
          <HubPhoto
            {...added.photo}
            width={1080}
            height={810}
            stats={[
              { value: String(EXAMS.length), label: "sınav programı" },
              { value: String(BRANCH_LIST.length), label: "İstanbul şubesi" },
            ]}
          />
        }
      />

      <HubGuide
        id="amaca-gore"
        title={added.guideTitle}
        lead={[added.definition, added.guideLead]}
        tocLabel="Amacınıza göre"
        groups={buildGroups()}
        tocExtra={[
          { id: "karsilastirma", label: "Karşılaştırma tablosu" },
          { id: "sss", label: "Sık sorulan sorular" },
        ]}
      />

      <ComparisonTable
        id="karsilastirma"
        title={added.tableTitle}
        lead={added.tableLead}
        firstLabel="Sınav"
        columns={[
          { key: "goals", label: "Kullanım amacı" },
          { key: "measures", label: "Ne ölçer" },
          { key: "validity", label: "Geçerlilik" },
        ]}
        rows={rows}
        note={added.tableNote}
      />

      <HubAbout
        id="programlar"
        title={EXAM_HUB.slots.programs.heading ?? ""}
        paragraphs={page.slots.programs}
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

      <RelatedLinks title="İlgili sayfalar" groups={related} />
    </SiteChrome>
  );
}
