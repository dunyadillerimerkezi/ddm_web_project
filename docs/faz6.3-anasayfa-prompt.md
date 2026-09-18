# Faz 6.3 — Ana Sayfa'yı koda dök

Proje: `~/ddm_web_project`. Next.js projesi `ddm-web/` altında.
Önce `ddm-web/CLAUDE.md` ve `PROGRESS.md` (Faz 6 bölümü) oku — kurallar ve
tamamlanan aşamalar orada.

## Görev

`docs/design-refs/DDM_Tasarım_Sistemi_faz5/DDM Ana Sayfa.dc.html` tasarımını
`ddm-web/app/page.tsx` olarak hayata geçir. Şu an o dosyada sadece `<SiteChrome>`
var, gövde boş.

**Bu dosya `.dc.html` — Claude Design ara formatı, geçerli HTML DEĞİL.**
`<sc-for>`, `<sc-if>`, `{{ }}`, `style-hover`, `onClick="{{ }}"`,
`dangerouslySetInnerHTML="{{ }}"` hepsi çevrilecek. İçerik verisi dosyanın
sonundaki `<script data-dc-script>` bloğunda — `renderVals()` ve beslediği
metotlarda. Veriyi oradan al, elle yeniden yazma.

## Hazır olanlar — yeniden yazma, içe aktar

| | |
|---|---|
| `ddm-web/styles/tokens.css` | tüm renk/tipografi/boşluk/radius/gölge tokenları |
| `ddm-web/components/layout/` | SiteChrome, TopBar, SiteHeader+mega menü, SiteFooter, MobileBottomBar |
| `ddm-web/components/ui/` | Button/ButtonLink/ButtonAnchor, Kicker, SectionHeading, Badge, DayBadge, IconButton, ImageSlot, DataMissingNotice |
| `ddm-web/components/graphics/` | Icon + UiIcon (ok/caret/burger + 24×24 ikon kaydı), Illustration |
| `ddm-web/lib/nav.ts` | mega menü + footer link ağacı |
| `ddm-web/data/branches.ts` | 5 şube |

**Stil kuralı:** CSS Modules + token. Tailwind ve CSS-in-JS YOK. Ham hex/px
yazma, `var(--ddm-*)` kullan. Token'da karşılığı yoksa önce `tokens.css`'e ekle.
Yeni modüller `ddm-web/styles/<Bileşen>.module.css`.

## 12 bölüm

Şablondaki `<!-- N · ... -->` yorumları bölümleri işaretliyor:
hero · sayaç şeridi · sınav hazırlık carousel · yurtdışı · dil kursları ızgarası ·
şubeler · diğer programlar · tanıtım videosu · öğrenci yorumları carousel ·
mektuplar/aktiviteler/duyurular · alt CTA · footer (footer hazır, `SiteChrome`'dan geliyor).

Yeni yazılacak bileşenler: `HomeHero`, `MediaCard`, `FeatureCard`, `StatStrip`,
`Carousel` (scroll-snap + prev/next), `CourseChipCard`, `BranchCard`,
`TestimonialCard`, `CtaBand`, `Flag`.

`Carousel`, `TestimonialCard` ve `CtaBand` sonraki aşamalarda da kullanılacak —
`components/ui/` ve `components/sections/` altına, Ana Sayfa'ya gömme.

## Görseller — yuva ↔ dosya eşlemesi

Hepsi `ddm-web/public/assets/home_page_images/` altında.

**Dil kursları ızgarası (10 × 4:3)** — şablondaki motif ipuçlarına göre:

| Yuva ipucu | Dosya |
|---|---|
| Big Ben / Londra | `dil-ingilizce.jpg` |
| Brandenburg Kapısı / Berlin | `dil-almanca.jpg` |
| Eiffel Kulesi / Paris | `dil-fransızca.jpg` |
| Kızıl Meydan / Moskova | `dil-rusça.jpg` |
| Sagrada Família / Barcelona | `dil-ispanyolca.jpg` |
| Colosseo / Roma | `dil-italyanca.jpg` |
| Şanghay silueti | `dil-çince.jpg` |
| İstanbul silueti | `dil-türkçe.jpg` |
| Konuşma kulübü / sohbet masası | `ingilizce-konuşma.jpg` |
| Amsterdam kanalları | `dil-felemenkçe.jpg` |

**Diğer programlar (4 × 4:3 800×600)** — şablondaki `otherPrograms` sırası:

| # | Kart | Dosya |
|---|---|---|
| 01 | Özel Dersler | `özel-ders.jpg` |
| 02 | Business English | `iş-ingilizcesi.jpg` |
| 03 | DDM Kids | `ddm-kids.jpg` |
| 04 | Yurtdışı Dil Eğitimi | `yurtdışı-dil-eğitimi.jpg` |

**Yurtdışı eğitim bölümü (4:3 800×600):** `yurtdisi-egitim.jpg`
(`yurtdışı-dil-eğitimi2.jpg` yedek/alternatif.)

**Sınav hazırlık carousel (LOGO 240×80):** şablonda 12 sınav var, 8'i
`hasLogo: true`. Eşleşenler: TOEFL→`toefl-logo.png`, IELTS→`IELTS_logo.png`,
TOEIC→`toeic-logo.png`, SAT→`SAT_logo.png`, GMAT→`GMAT_logo.png`,
PTE→`pte-logo.png`, TESTDAF→`TestDaF-logo.png`.
**GRE logosu YOK** — `hasLogo: true` olmasına rağmen dosya gelmemiş; onu da
logosuzlar gibi metin rozetine düşür. Logosuz 4 sınav (PROFICIENCY, YDS,
YÖKDİL, Aile Birleşimi A1) zaten metin rozeti kullanıyor, şablonda `noLogo`
dalı hazır.

**Tanıtım videosu kapağı:** `ddm-web/public/assets/foto-5.jpg` (şablonda zaten bu).

**Görseli OLMAYAN yuvalar** — `<ImageSlot>` bileşeniyle kesikli yer tutucu kalsın,
uydurma görsel koyma:
- Hero: 16:9 880×495 "Çok dilli grup dersi / konuşan öğrenciler"
- Hero: 2 × 1:1 600×600 "Sınav/çalışma masası", "Pasaport / kampüs"
- Şubeler: 5 × 4:5 800×1000 (her şubenin bina/derslik fotoğrafı)

### Önce yap: dosya adlarını ASCII'ye çevir

10 dosyanın adında Türkçe karakter var (`dil-çince.jpg`, `iş-ingilizcesi.jpg`,
`yurtdışı-dil-eğitimi.jpg`, `özel-ders.jpg`, `ingilizce-konuşma.jpg`,
`dil-rusça.jpg`, `dil-türkçe.jpg`, `dil-felemenkçe.jpg`, `dil-fransızca.jpg`,
`yurtdışı-dil-eğitimi2.jpg`). URL'de yüzde-kodlanıyor, hataya açık.
`git mv` ile ASCII'ye çevir (`dil-cince.jpg`, `is-ingilizcesi.jpg`,
`yurtdisi-dil-egitimi.jpg` …) ve kodda yeni adları kullan.

## Kurallar (CLAUDE.md'den, ihlal etme)

- **§4** Tüm iç linkler kök-göreli + `next/link`. Mutlak domain YAZMA. Şablondaki
  `href="#"` placeholder'ları gerçek URL'lere bağla — hedefi `data/urls.csv`'den
  doğrula, karşılığı yoksa link üretme. (`lib/nav.ts` bunun örneği.)
- **§5** Gövde metinleri birebir korunur, yeniden yazılmaz/özetlenmez. Eksik veri
  uydurulmaz — `null` bırakılıp `DataMissingNotice`/`ImageSlot` ile işaretlenir.
- **§6** `metadata`: title / description / canonical / H1 → `data/site_content.json`
  içindeki `/` kaydından. `canonical` için `lib/site.ts`'teki `absoluteUrl()`.
- Görseller `next/image` ile, `width`/`height` verilerek.
- Ana Sayfa header CTA'sı **"İletişim" → `#iletisim`** (iç sayfalarda "Kayıt Ol").

## Koda GİRMEYECEKLER

Ana Sayfa'da şablon önizleme şeridi yok, ama şunlara dikkat:
- `data-reveal` / `data-reveal-delay` — ölü attribute, CSS'i tasarımda bilinçli
  kaldırılmış (102 kullanım). Taşıma.
- `data-count` / `data-count-from` — sayaç animasyonu kaldırılmış. Sayılar statik.
- `{{ navDisplay }}` / `{{ ctaDisplay }}` / `{{ burgerDisplay }}` ve `state.w` —
  Ana Sayfa breakpoint'leri `window.innerWidth` ölçüp state'e yazıyor. **Bu deseni
  taşıma**; breakpoint'ler CSS media query'sinde olacak (diğer üç şablon ve
  `SiteHeader.module.css` böyle yapıyor). Kırılım noktaları: 1459 / 1340 / 1339 /
  999 / 859 / 759 / 619.

## Bitirince

`npm run build`, `npm run lint`, `npx tsc --noEmit` üçü de temiz olmalı.
`npm run dev` ile açıp 1339px ve 999px altını kontrol et.
`PROGRESS.md`'de Faz 6.3 kutucuğunu işaretle.

Önce bölüm bölüm ilerle, her bölüm bitince kısa rapor ver — hepsini tek seferde
yazıp sonuna kadar gitme.
