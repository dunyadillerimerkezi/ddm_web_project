/**
 * Şube İletişim içerik çözücüsü (P1, Faz 6.8).
 *
 * `lib/languageContent.ts` / `universityContent.ts` / `courseDateContent.ts`
 * ile aynı desen: kaynak `data/site_content.json`, `SiteContentRecord`
 * `lib/contentSections.ts`den geliyor. BU TİP FARKLI: kaynak sayfaların
 * gövdesi (~1300 kelime) neredeyse tamamen ortak form alanları + KVKK yasal
 * metni (Aşama 0 denetimi: iki şube arası %99,7 birebir aynı) — form işi
 * sona bırakıldığı için (kullanıcı kararı) o gövde HİÇ kullanılmıyor.
 * Kullanılan tek şey: `title` / `meta_description` (metadata) — gerçek
 * adres/telefon/e-posta `data/branches.ts`e Aşama 0'da taşındı.
 *
 * H1: kayıtların HİÇBİRİNDE `headings` yok (`headings: []`) — CLAUDE.md §6
 * kuralı gereği title'a düşülür, konsola loglanır.
 */

import { currentBranchName } from "@/data/branches";
import siteContent from "@/data/site_content.json";
import { checkMeta, metaTitle } from "@/lib/meta";
import type { SiteContentRecord } from "./contentSections";
import type { Branch, Crumb } from "./types";

const RECORDS = siteContent as SiteContentRecord[];

/**
 * Aşama 0'da bulunan bariz kopyala-yapıştır hatası: Ümraniye sayfasının
 * `title`/`meta_description`'ı "Ataşehir Şubesi" diyor. CLAUDE.md §5'in
 * "bariz metadata hatası düzeltilebilir, bildirilir" istisnası — burada
 * bildiriliyor: bu dosyayı okuyan/değiştiren biri bu düzeltmeyi görsün.
 */
const METADATA_FIXES: Record<string, { title?: string; metaDescription?: string }> = {
  "/ddm-iletisim/umraniye.html": {
    title: "Dünya Dilleri Merkezi Ümraniye Şubesi - İletişim - Adres - Yol Tarifi",
    metaDescription: "Dünya Dilleri Merkezi Ümraniye Şubesi İletişim Adres Bilgileri.",
  },
};

/** `site_content.json`'ta adresi `sourcePath` ile biten kayıt (yoksa build düşer). PF: KVKK metni de bunu kullanır. */
export function findRecord(sourcePath: string): SiteContentRecord {
  const rec = RECORDS.find((r) => r.url.endsWith(sourcePath));
  if (!rec) {
    throw new Error(`branchContent: kayıt bulunamadı — "${sourcePath}"`);
  }
  return rec;
}

export type BranchPage = {
  branch: Branch;
  title: string;
  metaDescription: string;
  h1: string;
  crumbs: Crumb[];
};

export function getBranchPage(branch: Branch): BranchPage {
  const sourcePath = `${branch.href}.html`;
  const record = findRecord(sourcePath);
  const fix = METADATA_FIXES[sourcePath];
  const title = fix?.title ?? record.title;
  const metaDescription = fix?.metaDescription ?? record.meta_description;

  if (record.headings.length === 0) {
    console.warn(`[h1-fallback] branchContent[${branch.slug}]: hiç başlık yok, title'a düşüldü`);
  }

  return {
    branch,
    title,
    metaDescription,
    h1: title,
    crumbs: [
      { label: "Ana Sayfa", href: "/" },
      { label: "İletişim", href: "/ddm-iletisim" },
      { label: branch.name },
    ],
  };
}

export const HUB_CRUMBS: Crumb[] = [{ label: "Ana Sayfa", href: "/" }, { label: "İletişim" }];

export type HubPage = {
  title: string;
  metaDescription: string;
  h1: string;
  lead: string;
};

/**
 * `/ddm-iletisim` hub sayfası. Kaydın ilk başlığı `h3` (h1 yok) — CLAUDE.md
 * §6 kuralıyla ona düşülür, loglanır. `lead` kaydın `meta_description`'ı —
 * kaynağın kendi metni, uydurulmadı (Ümraniye'yi saymaması kaynağın kendi
 * eksikliği, "bariz hata" değil — CLAUDE.md §5 istisnası burada uygulanmaz,
 * olduğu gibi bırakıldı). Tek düzeltme: kaynak "Levent, Etiler" diye aynı şubeyi iki
 * kez sayıyor → "Etiler" (`currentBranchName`, müşteri kararı 2026-09-30).
 */
export function getHubPage(): HubPage {
  const record = findRecord("/ddm-iletisim.html");
  const h1Heading = record.headings[0];
  if (!h1Heading) {
    throw new Error("branchContent: hub kaydında hiç başlık yok");
  }
  if (h1Heading.level !== "h1") {
    console.warn(`[h1-fallback] branchContent[hub]: h1 yok, ilk başlığa (${h1Heading.level}) düşüldü`);
  }
  // Kaynak başlık "İletişim" (8 karakter) — marka eki (P8, `data/company.ts` `BRAND_SUFFIX_REASON`).
  const title = metaTitle({ brandSuffix: true }, record.title, "branchContent[hub]");
  checkMeta(title, "", "branchContent[hub]");
  return {
    title,
    metaDescription: currentBranchName(record.meta_description),
    h1: h1Heading.text,
    lead: currentBranchName(record.meta_description),
  };
}
