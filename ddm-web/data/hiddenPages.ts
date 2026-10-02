/**
 * Yayından kaldırılan sınav sayfaları — müşteri kararı (2026-10-02).
 *
 * Tanımlar ve içerik dosyalarda DURUR (`data/exams.ts`, `data/examGuides.ts`, `data/privateLessonsExam.ts`,
 * `data/courseDates.ts`); yalnız sayfa üretilmez (adres 404 verir), menüden, dizinlerden, tablolardan ve
 * form listesinden düşer. Geri açmak: slug'ı bu listeden çıkarın, elle yazılmış bağlantıları
 * (`git log -- data/hiddenPages.ts` commit'inde) geri koyun.
 *
 * Alt sayfalar da gizlenir: `/sinav-hazirlik-egitimleri/{slug}/…` (TOEIC'in nedir, özel ders, şube tarihleri).
 *
 * SAF modül — istemci bileşeni (`lib/navTree.ts` → `SiteHeader`) de içe aktarır; veri dosyası import ETMEZ.
 */

export const HIDDEN_EXAM_SLUGS: readonly string[] = [
  "toeic-kursu",
  "toefl-essentials-kursu",
  "cocuklar-icin-toefl-primary-egitimi",
  "ingiltere-vize-sinavi-ingilizce-a1kursu", // menüde "IELTS Life Skills A1"
  "fransizca-aile-birlesimi-kursu",
];

const EXAM_ROOT = "/sinav-hazirlik-egitimleri/";

export function isHiddenExam(slug: string): boolean {
  return HIDDEN_EXAM_SLUGS.includes(slug);
}

/** `href` gizli bir sınavın sayfası ya da alt sayfası mı? Çapa ve sorgu atılır. */
export function isHiddenPath(href: string | null | undefined): boolean {
  if (!href?.startsWith(EXAM_ROOT)) return false;
  const slug = href.split("#")[0].split("?")[0].slice(EXAM_ROOT.length).split("/")[0];
  return isHiddenExam(slug);
}
