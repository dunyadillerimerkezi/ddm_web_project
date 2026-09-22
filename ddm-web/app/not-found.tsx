import { SiteChrome } from "@/components/layout";
import { PageSection } from "@/components/sections/PageSection";
import { ButtonLink } from "@/components/ui";

/**
 * P0 madde 5. Var olmayan/henüz üretilmemiş bir sayfaya gelindiğinde Next'in
 * çıplak varsayılanı yerine site kabuğuyla (menü/footer) gösterilir — böylece
 * kullanıcı kaybolmuyor. Metin bu sayfaya özgü kısa bir UI metni; CLAUDE.md
 * §5'in "gövde metni kaynaktan birebir gelir" kuralı sayfa İÇERİĞİ için
 * geçerlidir, bu bir sistem/UI mesajıdır.
 */
export default function NotFound() {
  return (
    <SiteChrome>
      <PageSection kicker="404" title="Bu sayfayı bulamadık" ground="light">
        <p style={{ maxWidth: 560, color: "var(--ddm-gray-600)", marginBottom: 24 }}>
          Aradığınız sayfa taşınmış ya da henüz yayınlanmamış olabilir. Ana sayfaya
          dönüp aradığınız kursu veya şubeyi oradan bulabilirsiniz.
        </p>
        <ButtonLink href="/" variant="primary">
          Ana Sayfaya Dön
        </ButtonLink>
      </PageSection>
    </SiteChrome>
  );
}
