import type { Metadata } from "next";

import { SiteChrome } from "@/components/layout";
import { Accordion } from "@/components/ui";
import { BranchHero } from "./BranchHero";
import { PageSection } from "./PageSection";
import { ProseSection } from "./ProseSection";
import { BulletPanel } from "./BulletPanel";
import { FactCards } from "./FactCards";
import { LinkRow } from "./LinkRow";
import { UniversityGrid } from "./UniversityGrid";
import { UNIVERSITY_INDEX } from "@/data/universities";
import { BranchDateRows } from "./BranchDateRows";
import { ExamStructure } from "./ExamStructure";
import { CtaBand } from "./CtaBand";
import { EXAMS } from "@/data/exams";
import { examHref, getExamPage, type ExamBlock, type ExamDef } from "@/lib/examContent";
import { absoluteUrl } from "@/lib/site";
import type { Crumb, LinkRowItem } from "@/lib/types";

/**
 * P2 — Sınav Hazırlık Kursu Ana sayfası (16 sınav). İki route bunu çağırır:
 * `app/sinav-hazirlik-egitimleri/[kurs]/page.tsx` (15 sınav) ve statik
 * `app/sinav-hazirlik-egitimleri/proficiency-kursu/page.tsx` (statik klasör
 * dinamik segmenti ezdiği için ayrı dosya — plan §3).
 *
 * Bölüm sırası `data/exams.ts`teki blok sırasıdır; zemin açık/gri dönüşümlü.
 * CTA'lar 6.6 kararı: fiyat CTA'sı yok, "Bilgi Al" → `/ddm-iletisim`.
 */

const CONTACT_HREF = "/ddm-iletisim";

export function examMetadata(def: ExamDef): Metadata {
  const page = getExamPage(def);
  return {
    title: page.record.title,
    description: page.record.meta_description,
    alternates: { canonical: absoluteUrl(examHref(def.slug)) },
  };
}

function otherExamItems(current: ExamDef): LinkRowItem[] {
  return EXAMS.filter((e) => e.slug !== current.slug).map((e) => ({
    label: e.label,
    href: examHref(e.slug),
    icon: "belge",
  }));
}

/** Zemin ritmi: hero'dan sonra gri ile başlayıp açık/gri dönüşümlü. Görünmez
 *  `drop` blokları sayılmaz — yoksa ritim kayıp iki gri bölüm yan yana gelir. */
function blockGrounds(blocks: ExamBlock[]): ("light" | "gray")[] {
  let visible = 0;
  return blocks.map((b) => (b.kind === "drop" ? "light" : visible++ % 2 === 0 ? "gray" : "light"));
}

function renderBlock(block: ExamBlock, ground: "light" | "gray") {
  switch (block.kind) {
    case "prose":
      return (
        <ProseSection
          key={block.id}
          id={block.id}
          ground={ground}
          kicker={block.kicker}
          title={block.title}
          paragraphs={block.paragraphs}
          format={block.format}
        />
      );
    case "facts":
      return block.cards ? (
        <FactCards
          key={block.id}
          id={block.id}
          ground={ground}
          kicker={block.kicker}
          title={block.title}
          lead={block.lead}
          cards={block.cards}
        />
      ) : (
        <BulletPanel
          key={block.id}
          id={block.id}
          ground={ground}
          kicker={block.kicker}
          title={block.title}
          lead={block.lead}
          icon={block.icon}
          items={block.items}
        />
      );
    case "branchLinks":
      return (
        <BranchDateRows
          key={block.id}
          id={block.id}
          ground={ground}
          kicker="ŞUBE VE KURS TARİHLERİ"
          title={block.title}
          lead={block.lead}
          rows={block.rows}
        />
      );
    case "structure":
      // ExamStructure `#sinav-yapisi` çapasını kendisi taşır.
      return (
        <ExamStructure
          key={block.id}
          ground={ground}
          title={block.title}
          lead={block.lead}
          sections={block.sections}
          detailIds={block.sections.map(() => block.detailAnchor)}
        />
      );
    case "merged":
      return (
        <ProseSection
          key={block.id}
          id={block.id}
          ground={ground}
          kicker={block.kicker}
          title={block.title}
          paragraphs={block.items}
          format="list"
        />
      );
    case "stats":
      return (
        <FactCards
          key={block.id}
          id={block.id}
          ground={ground}
          kicker={block.kicker}
          title={block.title}
          lead={block.lead}
          cards={block.cards}
        />
      );
    case "universities":
      // Kendi başlığını ve `#universiteler` çapasını bileşen taşıyor.
      return <UniversityGrid key={block.id} items={UNIVERSITY_INDEX} current="" />;
    case "drop":
      return null;
    case "headingList":
      return (
        <ProseSection
          key={block.id}
          id={block.id}
          ground={ground}
          kicker={block.kicker}
          title={block.title}
          paragraphs={block.items.map((i) => (i.body ? `${i.label} — ${i.body}` : i.label))}
          format="list"
        />
      );
    case "faq":
      return (
        <PageSection key={block.id} id={block.id} ground={ground} kicker={block.kicker} title={block.title}>
          <Accordion items={block.items} name={block.id} />
        </PageSection>
      );
  }
}

export function ExamCoursePage({ def }: { def: ExamDef }) {
  const page = getExamPage(def);
  const hasDates = page.blocks.some((b) => b.kind === "branchLinks");

  const crumbs: Crumb[] = [
    { label: "Anasayfa", href: "/" },
    { label: "Sınav Hazırlık", href: "/sinav-hazirlik-egitimleri" },
    { label: def.label },
  ];

  const grounds = blockGrounds(page.blocks);
  const blocks = page.blocks.map((b, i) => renderBlock(b, grounds[i]));
  const lastVisible = [...page.blocks].map((b, i) => ({ b, g: grounds[i] })).filter((x) => x.b.kind !== "drop").pop();
  const gray = lastVisible?.g === "gray";
  const others = otherExamItems(def);

  return (
    <SiteChrome ctaLabel="Bilgi Al" ctaHref={CONTACT_HREF}>
      <BranchHero
        crumbs={crumbs}
        code={def.code}
        illustration={def.illustration}
        h1={page.h1}
        lead={page.heroLead}
        primary={{ label: "Bilgi Al", href: CONTACT_HREF }}
        secondary={hasDates ? { label: "Kurs tarihleri", href: "#kurs-tarihleri" } : undefined}
      />

      {blocks}

      {others.length > 0 && (
        <LinkRow
          ground={gray ? "light" : "gray"}
          kicker="DİĞER SINAVLAR"
          title="Sınav hazırlık kursları"
          items={others}
          density="cards"
        />
      )}

      <CtaBand
        id="kayit"
        ground={others.length > 0 ? (gray ? "gray" : "light") : gray ? "light" : "gray"}
        title={`${def.name} kursu hakkında bilgi alın`}
        sub="Size en yakın şubemizi seçin, eğitim danışmanlarımız program ve kurs tarihleri hakkında bilgi versin."
        primary={{ label: "Bilgi Al", href: CONTACT_HREF }}
      />
    </SiteChrome>
  );
}
