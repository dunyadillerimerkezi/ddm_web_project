import { Icon } from "@/components/graphics/Icon";
import { BRANCHES } from "@/data/branches";
import { COURSE_GROUPS, courseLabel, courseOption } from "@/data/courseOptions";
import { CONSENT_PARTS, KVKK_HREF, KVKK_ID } from "@/lib/kvkkConsent";
import type { BranchSlug } from "@/lib/types";
import { ContactFormFields } from "./ContactFormFields";

/**
 * PF (2026-09-29, "A · lacivert yan panel") — sitenin tek iletişim / ön bilgi formu.
 *
 * ⚠ GÖRSEL AŞAMA: form HİÇBİR YERE veri göndermez (arka uç yok, karar #4). "Ön bilgi iste"ye basınca sahte başarı
 * değil, "Form henüz açılmadı, bilgileriniz gönderilmedi" notu + seçilen şubenin telefonu / WhatsApp'ı çıkar.
 *
 * Sunucu bileşeni: kurs listesi (`data/courseOptions.ts` — dil / sınav veri dosyalarından türer, büyük) burada
 * hazırlanır; istemciye yalnız küçük dizi + düz metin gider (`ContactFormFields`). Paneldeki liste ve ikonlar da
 * burada basılır — ikon modülü istemci paketine girmez.
 *
 * Boylar: `wide` — sayfa sonunda tam genişlik, iki kolon (solda panel, sağda form); `narrow` — kenar sütunu kartı
 * (hazır; kullanıcı kararıyla şimdilik hiçbir sayfada yok). Çapa `lib/formAnchor.ts` (`#kayit`) — menü düğmesi oraya iner.
 * Ön seçim: `course` (sayfanın adresi — listede yoksa üst adreslere bakılır), `branch` (şube tanıtım / iletişim sayfaları).
 */

type ContactFormProps = {
  size?: "wide" | "narrow";
  /** Sayfanın kendi adresi — kurs listesinde (ya da bir üst adresi) varsa "Kurs tercihi" hazır seçili gelir. */
  course?: string;
  branch?: BranchSlug;
  /** Başlık; verilmezse ön seçime göre kurulur ("IELTS hakkında bilgi alın", "Kadıköy şubesinden bilgi alın"). */
  title?: string;
  /** Başlık altı cümle (yalnız `wide`) — yerini aldığı `CtaBand`'ın alt satırı sayfaya özgüyse o. */
  lead?: string;
  /** Yerini aldığı `CtaBand`'ın ikinci bağlantısı (ör. rehberden sınavın kurs sayfası) — iç bağlantı kaybolmasın. */
  link?: { label: string; href: string };
  /** KVKK metniyle aynı sayfadaysa (Şube İletişim ana sayfası) bağlantı sayfa içinde kalır, yeni sekme açılmaz. */
  kvkkInPage?: boolean;
  /** Bölüm zemini (yalnız `wide`) — sayfanın son bandıyla aynı olsun. */
  ground?: "gray" | "white";
};

const DEFAULT_LEAD = "Kurs günleri, başlangıç seviyesi ve size yakın şube için formu doldurun.";

function defaultTitle(course: string | null, branch: BranchSlug | undefined): string {
  if (branch) return `${BRANCHES[branch].name} şubesinden bilgi alın`;
  const label = course ? courseLabel(course) : undefined;
  return label ? `${label} hakkında bilgi alın` : "Ön bilgi alın";
}

export function ContactForm({
  size = "wide",
  course,
  branch,
  title,
  lead = DEFAULT_LEAD,
  link,
  kvkkInPage = false,
  ground = "gray",
}: ContactFormProps) {
  const selected = courseOption(course);
  return (
    <ContactFormFields
      size={size}
      ground={ground}
      heading={title ?? defaultTitle(selected, branch)}
      lead={lead}
      link={link ?? null}
      courses={COURSE_GROUPS}
      course={selected}
      branch={branch ?? null}
      consent={CONSENT_PARTS}
      kvkkHref={kvkkInPage ? `#${KVKK_ID}` : KVKK_HREF}
      asks={
        <ul>
          <li>
            <Icon name="takvim" size={18} />
            Kurs günleri ve saatleri
          </li>
          <li>
            <Icon name="puan" size={18} />
            Hangi seviyeden başlayacağınız
          </li>
          <li>
            <Icon name="grup" size={18} />
            Grup dersi ya da özel ders
          </li>
        </ul>
      }
    />
  );
}
