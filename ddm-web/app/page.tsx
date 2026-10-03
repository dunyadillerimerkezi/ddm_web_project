import type { Metadata } from "next";
import { SiteChrome } from "@/components/layout";
import { HomeHero } from "@/components/sections/HomeHero";
import { StatStrip } from "@/components/sections/StatStrip";
import { ExamSection } from "@/components/sections/ExamSection";
import { AbroadSection } from "@/components/sections/AbroadSection";
import { LanguageGrid } from "@/components/sections/LanguageGrid";
import { BranchSection } from "@/components/sections/BranchSection";
import { OtherProgramsSection } from "@/components/sections/OtherProgramsSection";
import { VideoPromo } from "@/components/sections/VideoPromo";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactForm } from "@/components/sections/ContactForm";
import { currentBranchName } from "@/data/branches";
import { HOME_META_TITLE, HOME_STATS } from "@/data/home";
import { checkMeta } from "@/lib/meta";
import { absoluteUrl } from "@/lib/site";
import siteContent from "@/data/site_content.json";

/**
 * CLAUDE.md §6: description `data/site_content.json`'daki "/" kaydından; title kullanıcının metni (`HOME_META_TITLE`,
 * gerekçe orada). Kayıtta `canonical` boş (eski sitede yoktu) → `absoluteUrl("/")` üretir.
 */
const HOME_RECORD = siteContent.find(
  (record) => record.url.replace(/\/$/, "") === "https://www.dunyadillerimerkezi.com",
);

if (!HOME_RECORD) {
  throw new Error("site_content.json içinde Ana Sayfa (\"/\") kaydı bulunamadı.");
}

checkMeta(HOME_META_TITLE, "", "home");

export const metadata: Metadata = {
  title: HOME_META_TITLE,
  // Kaynak açıklama aynı şubeyi "Levent, Etiler" diye iki kez sayıyor → `currentBranchName` (müşteri kararı 2026-09-30).
  description: currentBranchName(HOME_RECORD.meta_description),
  alternates: { canonical: absoluteUrl("/") },
};

/**
 * Ana Sayfa — Faz 6.3.
 *
 * Kaynak: `docs/design-refs/DDM_Tasarım_Sistemi_faz5/DDM Ana Sayfa.dc.html`.
 *
 * H1 kararı: sayfada tek h1 (`HomeHero`), metni tasarımın hero başlığı.
 * `HOME_RECORD.headings`'teki dört ayrı h1 ("Yabancı Dil Programları",
 * "Sınav Hazırlık Kursları", "Yurtdışı Dil Eğitimi", "Yurtdışı Eğitim")
 * bilinçli olarak taşınmadı — CLAUDE.md §6'dan bu sapma PROGRESS.md'de not.
 *
 * Ana Sayfa'nın header CTA'sı tasarımda "İletişim" → #iletisim.
 */
export default function Home() {
  return (
    <SiteChrome ctaLabel="İletişim">
      <HomeHero />
      <StatStrip items={HOME_STATS} />
      <LanguageGrid />
      <AbroadSection />
      <ExamSection />
      <BranchSection />
      <OtherProgramsSection />
      <VideoPromo />
      <TestimonialsSection />
      <ContactForm />
    </SiteChrome>
  );
}
