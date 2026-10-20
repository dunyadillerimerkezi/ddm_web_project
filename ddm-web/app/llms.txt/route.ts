import { BRANCH_LIST, OPENING_HOURS } from "@/data/branches";
import { BRAND_NAME, SINCE_FOUNDING } from "@/data/company";
import { isHiddenPath } from "@/data/hiddenPages";
import { HUB_DIRECTORY } from "@/data/hubs";
import { TESTIMONIALS_PAGE } from "@/data/testimonials";
import { UNIVERSITY_INDEX } from "@/data/universities";
import { CORPORATE_MAIL } from "@/lib/nav";
import { getNavTree } from "@/lib/navTree";
import { isProducedPage } from "@/lib/pageRegistry";
import { absoluteUrl } from "@/lib/site";

/**
 * `/llms.txt` — yapay zekâ asistanları için sitenin özeti (llmstxt.org biçimi; P9, kullanıcı onayı 2026-10-19).
 *
 * Elle yazılmış dosya DEĞİL, build'de veriden üretilir: adresler `absoluteUrl()`'den (alan adı elle yazılmaz, CLAUDE.md §4),
 * bölümler menü ağacından (`getNavTree("hide")` — gizli sınavlar ve üretilmemiş sayfalar zaten düşer; yine de her adres
 * `isProducedPage` + `isHiddenPath` ile ikinci kez süzülür). Şube satırları `data/branches.ts`'ten.
 * Kurallar: dil SAYISI yazılmaz (diller tek tek listelenir), fiyat yok, şube kurs tarihi sayfaları listelenmez (şube
 * başına 70'ten fazla satır — şube sayfası yeter). Proficiency'nin altında 19 üniversitenin sınav sayfası tek tek.
 */
export const dynamic = "force-static";

const KURS_TARIHI_GROUP = "ŞUBE KURS TARİHLERİ";
const PROFICIENCY = "/sinav-hazirlik-egitimleri/proficiency-kursu";
/** Menüde çapayla (`#universiteler`) tek satır — burada üniversitelerin sayfaları tek tek. */
const UNIVERSITY_LINKS = UNIVERSITY_INDEX.map((u) => ({
  label: u.examCode ? `${u.name} (${u.examCode})` : u.name,
  href: `${PROFICIENCY}/${u.slug}`,
}));

function linkLine(label: string, href: string | null, indent = ""): string | null {
  if (!href || href.includes("#")) return null; // çapa (ör. `#universiteler`) üst sayfanın kendisi — tekrar yazılmaz
  if (isHiddenPath(href) || !isProducedPage(href)) return null;
  return `${indent}- [${label}](${absoluteUrl(href)})`;
}

function branchLines(): string[] {
  const hours = OPENING_HOURS.map((h) => `${h.label} ${h.opens}–${h.closes}`).join(", ");
  return [
    "## Şubeler",
    "",
    `Çalışma saatleri (tüm şubelerde aynı): ${hours}. Kurumsal e-posta: ${CORPORATE_MAIL}.`,
    "",
    ...BRANCH_LIST.map((b) => {
      const facts = [b.address, b.phone, b.mail].filter(Boolean).join(" · ");
      return `- [${b.name} Şubesi](${absoluteUrl(b.href)}): ${facts}`;
    }),
    `- [Tüm şubeler ve iletişim](${absoluteUrl("/ddm-iletisim")})`,
  ];
}

function navSections(seen: Set<string>): string[] {
  const out: string[] = [];
  for (const item of getNavTree("hide")) {
    const hub = HUB_DIRECTORY.find((h) => h.href === item.promoLink.href);
    const lines: string[] = [];
    const push = (label: string, href: string | null, indent = ""): boolean => {
      const line = linkLine(label, href, indent);
      if (!line || !href || seen.has(href)) return false;
      seen.add(href);
      lines.push(line);
      return true;
    };
    if (item.promoLink.href) push(hub?.label ?? item.short, item.promoLink.href);
    for (const column of item.columns) {
      for (const node of column.items) {
        // Kendisi yazılmayan kalemin (çapa) alt kalemleri girintisiz — başka bir kalemin altına düşmesin.
        const indent = push(node.label, node.href) ? "  " : "";
        for (const group of node.children ?? []) {
          if (group.title === KURS_TARIHI_GROUP) continue;
          for (const link of group.items) push(link.label, link.href, indent);
        }
        if (node.href === PROFICIENCY) for (const u of UNIVERSITY_LINKS) push(u.label, u.href, indent);
      }
    }
    if (lines.length > 0) out.push(`## ${hub?.label ?? item.short}`, "", ...lines, "");
  }
  return out;
}

export function GET(): Response {
  const branchNames = BRANCH_LIST.map((b) => b.name).join(", ");
  const body = [
    `# ${BRAND_NAME}`,
    "",
    `> İstanbul’da ${SINCE_FOUNDING} yabancı dil kursu, sınav hazırlık ve yurtdışı eğitim programları sunan dil okulu. Şubeler: ${branchNames}.`,
    "",
    `- [Ana Sayfa](${absoluteUrl("/")})`,
    `- [Öğrenci Yorumları](${absoluteUrl(TESTIMONIALS_PAGE.path)})`,
    "",
    ...branchLines(),
    "",
    // Şube ve iletişim sayfaları yukarıda — menünün İletişim sekmesi tekrar yazılmaz.
    ...navSections(new Set(["/", TESTIMONIALS_PAGE.path, "/ddm-iletisim", ...BRANCH_LIST.map((b) => b.href)])),
  ].join("\n");
  return new Response(`${body.trimEnd()}\n`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
