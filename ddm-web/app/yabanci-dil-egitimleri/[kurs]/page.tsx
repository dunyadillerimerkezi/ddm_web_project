import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteChrome } from "@/components/layout";
import { PageHero } from "@/components/sections/PageHero";
import { illustrationFor } from "@/components/graphics/Illustration";
import { PageSection } from "@/components/sections/PageSection";
import { LanguageBenefits } from "@/components/sections/LanguageBenefits";
import { AboutBento } from "@/components/sections/AboutBento";
import type { CertBox } from "@/components/sections/AboutCertification";
import { LevelLadder } from "@/components/sections/LevelLadder";
import { WeekSchedule } from "@/components/sections/WeekSchedule";
import { WhyDdm } from "@/components/sections/WhyDdm";
import { TeachingCycle } from "@/components/sections/TeachingCycle";
import { FaqAside } from "@/components/sections/FaqAside";
import { CourseDateList } from "@/components/sections/CourseDateList";
import { LanguageLinks, type LanguageLinkItem } from "@/components/sections/LanguageLinks";
import { ContactForm } from "@/components/sections/ContactForm";
import { FORM_HREF } from "@/lib/formAnchor";
import { yearsSinceFounding } from "@/data/company";
import { LANGUAGE_PAGES, getLanguageDef } from "@/data/languages";
import { EXAMS } from "@/data/exams";
import { examHref } from "@/lib/examContent";
import { LANGUAGE_EXTRAS, type LanguageExtra } from "@/data/languageExtras";
import type { HomeStat } from "@/data/home";
import { getLanguagePage, type LanguageDef } from "@/lib/languageContent";
import { buildLanguageFaqs, courseFacts, factTiles, parseSchedule } from "@/lib/languageFaq";
import { absoluteUrl } from "@/lib/site";
import { checkMeta } from "@/lib/richContent";
import type { Crumb } from "@/lib/types";

/**
 * Faz 6.4 — Dil Kursu sayfası (10 dil, tek dinamik route).
 *
 * İçerik rolleri (A–K) `lib/languageContent.ts`te çözülür. Fiyatlandırma
 * (J) kullanıcı kararıyla (2026-09-24) basılmaz; satırlar kapsam denetimi
 * için okunmaya devam eder.
 *
 * UI turu (2026-09-25, kullanıcı seçimleri): bölüm sırası yeniden kuruldu —
 * hero → Neden {dil} öğrenmelisiniz (E, SSS'den taşındı; kaynakta yoksa
 * `data/languageExtras.ts`teki evrensel metin) → Hakkında (kutular) →
 * Seviyeler (6 basamak) → Kurs takvimi (haftalık, hafta içi önce) → Neden
 * DDM → Eğitim modeli (çember) → SSS → şube ve kurs tarihleri (satırlar) →
 * diğer diller → iletişim. Öğrenci yorumları kullanıcı isteğiyle kalktı; hero
 * illüstrasyon yerine dilin fotoğrafını taşır (özel ders hero'su gibi).
 * "Ücretsiz Seviye Testi" butonu kalktı (böyle bir sınav yok); alt iletişim
 * kartında telefon/e-posta yok, buton tüm şubeleri listeleyen sayfaya gider.
 */

/**
 * D (certification) her zaman tam 2 paragraf: [0] kur sınavı + yerel
 * sertifika, [1] uluslararası sınav/sertifika. Kutu başlıkları template'in
 * kendi `{{ dilAdi }}` enterpolasyon deseniyle aynı — sabit etiket, gövde
 * metni değil (bkz. AboutCertification yorum notu).
 */
function certBoxes(def: LanguageDef, certification: string[] | null, extra: LanguageExtra): CertBox[] {
  if (!certification) return [];
  // ddmcadde kaynaklı dillerde kaynakta yalnız kur sınavı paragrafı var; ikinci kutu genel bilgi (`certAdded`).
  const international = certification[1] ?? extra.certAdded;
  if (!international) throw new Error(`${def.slug}: uluslararası sertifika paragrafı yok — languageExtras.certAdded ekleyin.`);
  return [
    { id: "kur-sinavi", title: `${def.name} Düzeyi Seviye Kur Sınavları`, body: certification[0] },
    { id: "sertifika", title: `Uluslararası ${def.name} Dil Sertifikası Sınav Programları`, body: international, links: examLinks(def, international) },
  ];
}

/**
 * Bu dilin sınav hazırlık sayfaları: kaydında `language` bu dili gösteren sınavlar (DELE → İspanyolca; tek kaynak
 * `data/exams.ts`) + kutunun metninde ADI geçen sınavlar (İngilizce: "TOEFL, IELTS, YDS, YÖKDİL…"). Kaynak sırası korunur.
 */
function examLinks(def: LanguageDef, text: string) {
  const href = `/yabanci-dil-egitimleri/${def.slug}`;
  const lower = text.toLocaleLowerCase("tr");
  const escape = (t: string) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const named = (name: string) =>
    new RegExp(`(^|[^\\p{L}])${escape(name.toLocaleLowerCase("tr"))}($|[^\\p{L}])`, "u").test(lower);
  return EXAMS.filter((e) => e.slug !== "proficiency-kursu" && (e.language?.href === href || named(e.name))).map((e) => ({
    label: e.label,
    href: examHref(e.slug),
  }));
}

/** Diğer diller — bayrağı olmayan `speak` sohbet-balonu ikonuyla. */
function otherLanguageItems(current: LanguageDef): LanguageLinkItem[] {
  return LANGUAGE_PAGES.filter((l) => l.slug !== current.slug).map((l) => ({
    label: l.name,
    href: `/yabanci-dil-egitimleri/${l.slug}`,
    flag: l.flag,
    greeting: l.greeting,
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
  return LANGUAGE_PAGES.map((l) => ({ kurs: l.slug }));
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
  // ddmcadde kaynaklı dillerde yeniden yazılan başlık / açıklama (gerekçe `data/languages.ts` `meta.reasons`).
  const meta = def.content.meta;
  if (meta) checkMeta(meta.title, meta.description, def.slug);
  // H1'den çıkarılan "Ders Fiyatları" (`h1Edit`) kaynak başlıkta da var → aynı düzeltme <title>'a (sitede fiyat yok).
  const h1Edit = def.content.h1Edit;
  const sourceTitle = h1Edit ? page.record.title.replace(h1Edit.from, h1Edit.to) : page.record.title;
  return {
    title: meta?.title ?? sourceTitle,
    description: meta?.description ?? page.record.meta_description,
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
  const extra = LANGUAGE_EXTRAS[def.key];
  const slots = parseSchedule(page.programSchedule, `${def.slug}/programSchedule`);
  const faqs = buildLanguageFaqs(def, page, slots, extra.faqAdded ?? []);
  // Seviyeler: kaynağın kendi grupları; yoksa dilin genel seviye bilgisi (`languageExtras.levelsAdded`).
  const levels =
    page.levelGroups.length > 0
      ? { title: page.levelGroupsHeading ?? page.h1, groups: page.levelGroups }
      : extra.levelsAdded
        ? { title: extra.levelsAdded.heading, groups: extra.levelsAdded.groups }
        : null;

  // "Neden … Öğrenmelisiniz?" — kaynak metin (E) varsa o, yoksa eklenen evrensel metin.
  const whyLearn =
    page.whyLearn && page.whyLearn.length > 0
      ? { title: def.content.whyLearn?.heading ?? page.h1, paragraphs: page.whyLearn }
      : extra.whyLearnAdded
        ? { title: extra.whyLearnAdded.heading, paragraphs: extra.whyLearnAdded.paragraphs }
        : null;

  const crumbs: Crumb[] = [
    { label: "Anasayfa", href: "/" },
    { label: "Yabancı Dil Kursları", href: "/yabanci-dil" },
    { label: def.label },
  ];

  return (
    <SiteChrome ctaLabel="Kayıt Ol">
      <PageHero
        crumbs={crumbs}
        code={def.code}
        branchBadge={page.branchLinks ? `${page.branchLinks.branch.length} şubede eğitim` : null}
        showCertBadge={page.certification !== null}
        h1={page.h1}
        lead={page.heroLead.join(" ") || null}
        primary={{ label: "Bilgi Al", href: FORM_HREF }}
        secondary={{ label: "", href: null }}
        art={{
          name: illustrationFor(def.key),
          flag: def.flag,
          greeting: def.greeting,
          skill: def.skill,
          scale: def.scaleChip,
        }}
        photo={extra.heroPhoto}
        stats={trustStats(def)}
      />

      {whyLearn && (
        <LanguageBenefits
          kicker={`NEDEN ${def.name.toLocaleUpperCase("tr")}`}
          title={whyLearn.title}
          paragraphs={whyLearn.paragraphs}
          photo={extra.benefitsPhoto}
          benefits={extra.benefits}
        />
      )}

      <AboutBento
        // G (seviyeler) bölümü olmayan dillerde #seviyeler çıpası buraya taşınır (plan §3).
        id={levels === null ? "seviyeler" : undefined}
        kicker="HAKKINDA"
        title={def.content.about.heading ?? page.h1}
        paragraphs={page.about}
        facts={factTiles(courseFacts(def, page))}
        boxes={certBoxes(def, page.certification, extra)}
      />

      {levels && <LevelLadder id="seviyeler" kicker="SEVİYELER" title={levels.title} groups={levels.groups} />}

      <PageSection id="kurs-takvimi" ground="light" kicker="KURS TAKVİMİ" title={def.content.programSchedule.heading}>
        <WeekSchedule slots={slots} cta={{ label: "Ön Bilgi Formu", href: FORM_HREF }} />
      </PageSection>

      <WhyDdm
        kicker="NEDEN DDM"
        title={page.whyChooseDDM.title}
        intro={page.whyChooseDDM.intro}
        items={page.whyChooseDDM.items}
        years={yearsSinceFounding()}
      />

      <TeachingCycle
        kicker="EĞİTİM MODELİMİZ"
        title={def.content.teachingModel.heading}
        intro={page.teachingModel.intro}
        items={page.teachingModel.items}
      />

      {faqs.length > 0 && (
        <FaqAside
          id="sss"
          kicker="SIKÇA SORULAN SORULAR"
          title={`${def.name} kursu hakkında sık sorulanlar`}
          items={faqs}
          cta={{ label: "İletişime Geçin", href: "/ddm-iletisim" }}
        />
      )}

      {page.branchLinks && (
        <CourseDateList
          id="sube-kurs-tarihleri"
          kicker="ŞUBE VE KURS TARİHLERİ"
          title={def.content.branchLinks?.heading ?? page.h1}
          branches={page.branchLinks.branch}
          extras={page.branchLinks.extra}
        />
      )}

      <LanguageLinks kicker="DİĞER DİLLER" title="Yabancı Dil Kursları" items={otherLanguageItems(def)} />

      {/* Kaynağın kapanış çağrısı (eski şeridin başlığıydı) — uzun cümle, başlık değil alt satır. */}
      <ContactForm lead={page.teachingModel.closingCta} course={`/yabanci-dil-egitimleri/${def.slug}`} />
    </SiteChrome>
  );
}
