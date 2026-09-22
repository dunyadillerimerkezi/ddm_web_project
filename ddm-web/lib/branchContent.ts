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

import siteContent from "@/data/site_content.json";
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

function findRecord(sourcePath: string): SiteContentRecord {
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
 * olduğu gibi bırakıldı).
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
  return {
    title: record.title,
    metaDescription: record.meta_description,
    h1: h1Heading.text,
    lead: record.meta_description,
  };
}
