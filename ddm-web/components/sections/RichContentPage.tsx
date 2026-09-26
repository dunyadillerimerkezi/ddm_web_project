import { SiteChrome } from "@/components/layout";
import { RichHero } from "@/components/sections/RichHero";
import { LevelStairs } from "@/components/sections/LevelStairs";
import { FormatCards } from "@/components/sections/FormatCards";
import { OnlineSteps } from "@/components/sections/OnlineSteps";
import { ExamModes } from "@/components/sections/ExamModes";
import { OnlineCatalog } from "@/components/sections/OnlineCatalog";
import { RichAbout } from "@/components/sections/RichAbout";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { RichFaq } from "@/components/sections/RichFaq";
import { CtaBand } from "@/components/sections/CtaBand";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { BRANCH_LIST } from "@/data/branches";
import { byCourse } from "@/data/courseDates";
import { CONTACT_HREF, linkIfProduced, onlyProduced } from "@/lib/hubLinks";
import type { RichBlock, RichPage } from "@/lib/richContent";

/**
 * P4 — Zengin İçerik sayfası (onaylanan "B · seviye merdiveni" yönü, 2026-09-24).
 *
 * Ritim: lacivert hero → 1 baskın bölüm (dilde seviye merdiveni, sınavda format
 * kartları, online'da "nasıl işler" akışı) → 2 destek (firma metni + alanlar /
 * sınavlar, karşılaştırma) → kısa SSS → CTA → ilgili sayfalar.
 * Zeminler bilinçli olarak sırayla gri/beyaz DÖNMÜYOR (P2 `blockGrounds()`
 * hatası tekrarlanmadı): gövde tek beyaz zemin, vurguyu bölümün kendisi taşır.
 */
function Block({ block }: { block: RichBlock }) {
  switch (block.kind) {
    case "levels":
      return <LevelStairs {...block} />;
    case "format":
      return <FormatCards {...block} />;
    case "about":
      return <RichAbout {...block} />;
    case "compare":
      return (
        <ComparisonTable
          id={block.id}
          title={block.title}
          lead={block.lead}
          firstLabel="Ölçüt"
          columns={block.columns}
          rows={block.rows.map((r) => ({ name: r.row, href: null, cells: r.cells }))}
        />
      );
    case "steps":
      return <OnlineSteps {...block} />;
    case "exams":
      return <ExamModes {...block} />;
    case "catalog":
      // Üretilmemiş hedef düz metin kalır (ölü link basılmaz).
      return (
        <OnlineCatalog
          id={block.id}
          groups={block.groups.map((g) => ({
            ...g,
            cards: g.cards.map((c) => ({ ...c, href: linkIfProduced(c.href) })),
            chips: g.chips.map((c) => ({ ...c, href: c.href && linkIfProduced(c.href) })),
          }))}
        />
      );
    case "faq":
      return <RichFaq {...block} />;
  }
}

function related(page: RichPage) {
  const courseSlug = page.parent.href.split("/").pop() ?? "";
  return [
    {
      title: page.parent.label,
      links: onlyProduced([
        { label: page.parent.label, href: page.parent.href },
        ...byCourse(courseSlug).map((e) => ({ label: `${e.branchLabel} şubesi kurs tarihi`, href: `/${e.category}/${e.courseSlug}/${e.pageSlug}` })),
      ]),
    },
    { title: page.family.title, links: onlyProduced(page.family.links) },
    {
      title: "Şubelerimiz",
      links: onlyProduced([
        ...BRANCH_LIST.map((b) => ({ label: `${b.name} Şubesi`, href: b.href })),
        { label: "Tüm şubeler", href: CONTACT_HREF },
      ]),
    },
  ];
}

export function RichContentPage({ page }: { page: RichPage }) {
  return (
    <SiteChrome ctaLabel="Bilgi Al" ctaHref={CONTACT_HREF}>
      <RichHero
        page={page}
        primary={{ label: "Bilgi Al", href: CONTACT_HREF }}
        secondary={page.hero.secondary}
      />
      {page.blocks.map((b) => (
        <Block key={b.id} block={b} />
      ))}
      <CtaBand
        ground="light"
        title={`${page.label} programınızı birlikte planlayalım`}
        sub={page.cta.sub}
        primary={{ label: "Bilgi Al", href: CONTACT_HREF }}
      />
      <RelatedLinks title="İlgili sayfalar" groups={related(page)} />
    </SiteChrome>
  );
}
