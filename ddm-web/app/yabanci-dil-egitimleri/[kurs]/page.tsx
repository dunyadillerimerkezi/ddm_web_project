import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteChrome } from "@/components/layout";
import { PageHero } from "@/components/sections/PageHero";
import { PageSection } from "@/components/sections/PageSection";
import { ScheduleTable } from "@/components/sections/ScheduleTable";
import { AboutCertification, type CertBox } from "@/components/sections/AboutCertification";
import { LevelExplorer } from "@/components/sections/LevelExplorer";
import { BulletPanel } from "@/components/sections/BulletPanel";
import { PricingPanel } from "@/components/sections/PricingPanel";
import { LinkRow } from "@/components/sections/LinkRow";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { CtaBand } from "@/components/sections/CtaBand";
import { Accordion } from "@/components/ui";
import { LANGUAGES, getLanguageDef } from "@/data/languages";
import type { HomeStat } from "@/data/home";
import { DEFAULT_BRANCH } from "@/data/branches";
import { getLanguagePage, type LanguageDef, type LanguagePage } from "@/lib/languageContent";
import { absoluteUrl } from "@/lib/site";
import type { Crumb, Faq, LinkRowItem, ScheduleColumn, ScheduleTableRow } from "@/lib/types";

/**
 * Faz 6.4 — Dil Kursu sayfası (10 dil, tek dinamik route).
 *
 * ADIM 1: Bölüm 1+2+3 (Breadcrumb + PageHero + gömülü güven şeridi) dolduruldu.
 * ADIM 2: Bölüm 3 (ders programı tablosu, `#kurs-takvimi`) + Bölüm 4
 * (hakkında + sertifika kutuları, `#kur-sinavi` `#sertifika`) dolduruldu.
 * ADIM 3: Bölüm 5 (seviyeler, `#seviyeler`) dolduruldu — yalnız G bölümü
 * olan 6 dilde render edilir.
 * ADIM 4: Bölüm 6 (Neden DDM/F) + Bölüm 7 (Eğitim Modelimiz/I) + Bölüm 8
 * (Fiyatlandırma/J) dolduruldu.
 * ADIM 5: Bölüm 9 (şube/kurs tarihleri LinkRow, K) + Bölüm 10 (öğrenci
 * yorumları carousel, site geneli) + Bölüm 11 (SSS Accordion, E+H) dolduruldu.
 * ADIM 6: Bölüm 12 (diğer diller LinkRow) + Bölüm 13 (alt CTA `#kayit`)
 * dolduruldu — İTALYANCA pilot dil olarak tamamlandı, sonra 10 dile genişletildi.
 */

/**
 * C (programSchedule) satırları 10 dilde de birebir aynı, biçimi sabit:
 * "Program > Günler | Saatler HH:MM - HH:MM" ya da "Program > Günler
 * Saatler | HH:MM - HH:MM" (kaynağın kendi iç tutarsızlığı — "Saatler"
 * kelimesinin pipe'a göre konumu değişiyor). Metin YENİDEN YAZILMIYOR,
 * yalnız tabloya bölünüyor.
 */
const SCHEDULE_COLUMNS: ScheduleColumn[] = [
  { key: "program", head: "PROGRAM", rowLabel: null },
  { key: "days", head: "GÜNLER", rowLabel: "GÜNLER" },
  { key: "hours", head: "SAAT", rowLabel: "SAAT" },
  { key: "cta", head: "", rowLabel: null },
];

function stripSaatler(s: string): string {
  return s.replace(/Saatler\s*/i, "").trim();
}

function scheduleRows(lines: string[]): ScheduleTableRow[] {
  return lines.map((line, i) => {
    const [program, rest] = line.split(">").map((s) => s.trim());
    const [daysRaw, hoursRaw] = rest.split("|").map((s) => s.trim());
    return {
      key: `${i}`,
      group: null,
      cells: [
        { kind: "title", title: program, note: null },
        { kind: "text", value: stripSaatler(daysRaw), pending: "gün bilgisi bekleniyor" },
        { kind: "text", value: stripSaatler(hoursRaw), pending: "saat bilgisi bekleniyor" },
        { kind: "cta", label: "Ön Bilgi Formu", href: "#kayit" },
      ],
    };
  });
}

/**
 * D (certification) her zaman tam 2 paragraf: [0] kur sınavı + yerel
 * sertifika, [1] uluslararası sınav/sertifika. Kutu başlıkları template'in
 * kendi `{{ dilAdi }}` enterpolasyon deseniyle aynı — sabit etiket, gövde
 * metni değil (bkz. AboutCertification yorum notu).
 */
function certBoxes(def: LanguageDef, certification: string[] | null): CertBox[] {
  if (!certification) return [];
  return [
    { id: "kur-sinavi", title: `${def.name} Düzeyi Seviye Kur Sınavları`, body: certification[0] },
    { id: "sertifika", title: `Uluslararası ${def.name} Dil Sertifikası Sınav Programları`, body: certification[1] },
  ];
}

/**
 * Bölüm 11 SSS — kaynakta soru-cevap bloğu yok, ama E ve H başlıkları zaten
 * soru formunda (bkz. plan §3 karar gerekçesi). Soru = kaynak başlığın
 * birebir kendisi; cevap = kaynak paragrafları/maddeleri. Bu satırlar
 * BAŞKA HİÇBİR yerde tekrar render edilmiyor — metin tekrarı yok.
 */
function buildFaqs(def: LanguageDef, page: LanguagePage): Faq[] {
  const faqs: Faq[] = [];
  const whyLearnRef = def.content.whyLearn;
  if (whyLearnRef && page.whyLearn) {
    faqs.push({ question: whyLearnRef.heading ?? page.h1, answer: page.whyLearn });
  }
  const whoCanJoinRef = def.content.whoCanJoin;
  if (whoCanJoinRef && page.whoCanJoin) {
    faqs.push({ question: whoCanJoinRef.heading, answer: page.whoCanJoin.items, format: "list" });
  }
  return faqs;
}

/** Bölüm 12 · Diğer diller — bayrağı olmayan `speak` için sohbet-balonu ikonu. */
function otherLanguageItems(current: LanguageDef): LinkRowItem[] {
  return LANGUAGES.filter((l) => l.slug !== current.slug).map((l) => ({
    label: l.name,
    href: `/yabanci-dil-egitimleri/${l.slug}`,
    sub: l.code,
    flag: l.flag,
    icon: l.flag ? null : "sohbet",
  }));
}

/** Güven şeridi olguları — kaynakta yoksa (null) öğe DÜŞER, uydurulmaz (§5). */
function trustStats(def: LanguageDef): HomeStat[] {
  const stats: HomeStat[] = [{ icon: "konum", value: "5", label: "İstanbul şubesi" }];
  if (def.kurCount !== null) {
    stats.push({ icon: "takvim", value: String(def.kurCount), label: "kurdan oluşan program" });
  }
  if (def.kurHours !== null) {
    stats.push({ icon: "saat", value: String(def.kurHours), label: "saat / kur" });
  }
  if (def.groupSize !== null) {
    stats.push({ icon: "grup", value: String(def.groupSize), label: "kişilik akademik gruplar" });
  }
  return stats;
}

export const dynamicParams = false;


export function generateStaticParams() {
  return LANGUAGES.map((l) => ({ kurs: l.slug }));
}

type Params = { kurs: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { kurs } = await params;
  const def = getLanguageDef(kurs);
  if (!def) return {};
  const page = getLanguagePage(def);
  return {
    title: page.record.title,
    description: page.record.meta_description,
    alternates: { canonical: absoluteUrl(`/yabanci-dil-egitimleri/${kurs}`) },
  };
}

export default async function DilKursuPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { kurs } = await params;
  const def = getLanguageDef(kurs);
  if (!def) notFound();
  const page = getLanguagePage(def);
  const faqs = buildFaqs(def, page);

  const crumbs: Crumb[] = [
    { label: "Anasayfa", href: "/" },
    { label: "Yabancı Dil Kursları", href: "/yabanci-dil" },
    { label: def.label },
  ];

  return (
    <SiteChrome ctaLabel="Kayıt Ol" ctaHref="#kayit">
      <PageHero
        crumbs={crumbs}
        code={def.code}
        branchBadge={page.branchLinks ? `${page.branchLinks.branch.length} şubede eğitim` : null}
        showCertBadge={page.certification !== null}
        h1={page.h1}
        lead={page.heroLead.join(" ") || null}
        primary={{ label: "Ücretsiz Seviye Testi", href: "#kayit" }}
        secondary={{ label: "Bilgi Al", href: "#kurs-takvimi" }}
        art={{
          name: def.key,
          flag: def.flag,
          greeting: def.greeting,
          skill: def.skill,
          scale: def.scaleChip,
        }}
        stats={trustStats(def)}
      />

      <PageSection id="kurs-takvimi" ground="gray" kicker="KURS TAKVİMİ" title={def.content.programSchedule.heading}>
        <ScheduleTable columns={SCHEDULE_COLUMNS} rows={scheduleRows(page.programSchedule)} layout="prog4" />
      </PageSection>

      <AboutCertification
        // G (seviyeler) bölümü olmayan dillerde #seviyeler çıpası buraya taşınır (plan §3).
        id={page.levelGroups.length === 0 ? "seviyeler" : undefined}
        kicker="HAKKINDA"
        title={def.content.about.heading ?? page.h1}
        paragraphs={page.about}
        boxes={certBoxes(def, page.certification)}
      />

      {page.levelGroups.length > 0 && (
        <PageSection id="seviyeler" ground="gray" kicker="SEVİYELER" title={page.levelGroupsHeading ?? page.h1}>
          <LevelExplorer groups={page.levelGroups} idPrefix="seviyeler" label="Seviye grupları" />
        </PageSection>
      )}

      <BulletPanel
        ground="light"
        kicker="NEDEN DDM"
        title={page.whyChooseDDM.title}
        lead={page.whyChooseDDM.intro}
        icon="belge"
        items={page.whyChooseDDM.items}
      />

      <BulletPanel
        ground="gray"
        kicker="EĞİTİM MODELİMİZ"
        title={def.content.teachingModel.heading}
        lead={page.teachingModel.intro}
        icon="sohbet"
        items={page.teachingModel.items}
      />

      <PricingPanel
        ground="light"
        kicker="FİYATLANDIRMA"
        pricing={page.pricing}
        ctaLabel="Kayıt Ol"
        ctaHref="#kayit"
      />

      {page.branchLinks && (
        <LinkRow
          id="sube-kurs-tarihleri"
          ground="gray"
          kicker="ŞUBE VE KURS TARİHLERİ"
          title={def.content.branchLinks?.heading ?? page.h1}
          items={[...page.branchLinks.branch, ...page.branchLinks.extra]}
          density="compact"
          icon="konum"
        />
      )}

      <TestimonialsCarousel ground="light" />

      {faqs.length > 0 && (
        <PageSection
          id="sss"
          ground="gray"
          kicker="SIKÇA SORULAN SORULAR"
          title={`${def.name} kursu hakkında sık sorulanlar`}
        >
          <Accordion items={faqs} name="sss" />
        </PageSection>
      )}

      <LinkRow
        ground="light"
        kicker="DİĞER DİLLER"
        title="Yabancı Dil Kursları"
        items={otherLanguageItems(def)}
        density="cards"
      />

      <CtaBand
        id="kayit"
        ground="gray"
        title={page.teachingModel.closingCta}
        sub={[DEFAULT_BRANCH.phone, DEFAULT_BRANCH.mail].filter(Boolean).join(" · ")}
        primary={{ label: "İletişime Geçin", href: DEFAULT_BRANCH.href }}
      />
    </SiteChrome>
  );
}
