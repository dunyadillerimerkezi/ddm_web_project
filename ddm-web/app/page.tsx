import { SiteChrome } from "@/components/layout";

/**
 * Ana Sayfa — Faz 6 Aşama 6'da doldurulacak.
 * Şimdilik yalnız ortak çerçeveyi (üst bar, header, footer, mobil çubuk)
 * render ediyor; gövde Aşama 6'da HomeHero ve diğer bölümlerle gelecek.
 *
 * Ana Sayfa'nın header CTA'sı tasarımda "İletişim" → #iletisim.
 */
export default function Home() {
  return (
    <SiteChrome ctaLabel="İletişim" ctaHref="#iletisim">
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "64px 28px" }}>
        <p>Ana sayfa gövdesi Aşama 6&apos;da eklenecek.</p>
      </div>
    </SiteChrome>
  );
}
