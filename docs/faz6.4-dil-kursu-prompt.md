# Faz 6.4 — Dil Kursu Ana Sayfası'nı koda dök (10 sayfa)

Proje: `~/ddm_web_project`. Next.js projesi `ddm-web/` altında.
Önce `ddm-web/CLAUDE.md` ve `PROGRESS.md` (Faz 6 bölümü) oku — kurallar ve
tamamlanan aşamalar orada. Faz 6.0–6.3 bitti; bu aşama 6.4.

## Görev

`docs/design-refs/DDM_Tasarım_Sistemi_faz5/DDM Dil Kursu Sayfası.dc.html`
tasarımını **tek bir dinamik route** olarak hayata geçir:

```
ddm-web/app/yabanci-dil-egitimleri/[kurs]/page.tsx
```

`generateStaticParams` ile 10 sayfa üretilecek (SSG). Slug'lar eski siteden
birebir gelir (CLAUDE.md §3), "iyileştirme" yapma:

| slug | dil | illüstrasyon anahtarı | kelime |
|---|---|---|---|
| `ingilizce-kursu` | İngilizce | `en` | 941 |
| `almanca-kursu` | Almanca | `de` | 1010 |
| `fransizca-kursu` | Fransızca | `fr` | 751 |
| `italyanca-kursu` | İtalyanca | `it` | 710 |
| `ispanyolca-kursu` | İspanyolca | `es` | 702 |
| `rusca-kursu` | Rusça | `ru` | 623 |
| `cince-kursu` | Çince | `zh` | 283 |
| `flemenkce-kursu` | Flemenkçe | `nl` | 275 |
| `yabancila-icin-turkce-kurs` | Türkçe (yabancılar için) | `tr` | 315 |
| `ingilizce-konusma-kursu` | İngilizce Konuşma | `speak` | 272 |

**`.dc.html` geçerli HTML DEĞİL** — Claude Design ara formatı. `<sc-for>`,
`<sc-if>`, `{{ }}`, `style-hover`, `onClick="{{ }}"`,
`dangerouslySetInnerHTML="{{ }}"`, `ref="{{ }}"` hepsi çevrilecek. İçerik verisi
dosyanın sonundaki `<script data-dc-script>` bloğunda — `renderVals()`,
`levelData()`, `illoDefs()`, `menus()` metotlarında. Veriyi oradan al, elle
yeniden yazma.

## Hazır olanlar — YENİDEN YAZMA, içe aktar

Faz 6.0–6.3'te kuruldu:

| | |
|---|---|
| `styles/tokens.css` | tüm renk/tipografi/boşluk/radius/gölge tokenları |
| `components/layout/` | **SiteChrome** (üst bar + header + mega menü + footer + mobil çubuk) |
| `components/ui/` | Button/ButtonLink/ButtonAnchor, Kicker, SectionHeading, Badge, DayBadge, DataMissingNotice, ImageSlot, IconButton, **Carousel** |
| `components/cards/` | TestimonialCard, FeatureCard, MediaCard, BranchCard, CourseChipCard, LanguageCard |
| `components/sections/` | **CtaBand**, StatStrip, TestimonialsSection, VideoPromo, … |
| `components/graphics/` | Icon + UiIcon (ok/caret/burger + 24×24 ikon kaydı), **Illustration**, Flag |
| `lib/nav.ts` · `lib/types.ts` · `data/branches.ts` | menü ağacı, paylaşılan tipler, 5 şube |

Sayfayı `<SiteChrome>` ile sar. İç sayfa olduğu için CTA **"Kayıt Ol" → `#kayit`**
(varsayılan; Ana Sayfa'daki "İletişim" bu sayfada kullanılmaz).

Mevcut `Carousel`, `TestimonialCard`, `CtaBand`, `StatStrip` bu sayfada
**yeniden kullanılacak** — benzerini sıfırdan yazma. API'leri uymuyorsa
genişlet, kopyalama.

**Stil kuralı:** CSS Modules + token. Tailwind ve CSS-in-JS YOK. Ham hex/px
yazma, `var(--ddm-*)` kullan; token'da karşılığı yoksa önce `tokens.css`'e ekle
(6.3'te eklenen `--ddm-sky-slot-dash` gibi, mevcut değerleri değiştirmeden).
Yeni modüller `styles/<Bileşen>.module.css`.

## Bölümler

Şablondaki `<!-- N · ... -->` yorumları bölümleri işaretliyor:

1. **1+2 · Breadcrumb & Hero** (lacivert zemin) — kırıntı + rozetler + H1 + CTA + illüstrasyon
2. **3 · Güven şeridi** — 4 sayı (şube / kur / saat / grup büyüklüğü)
3. **4 · Program türleri** — 5 kart
4. **5 · Seviyeler** — CEFR ilerleme çubuğu (A1→C2) + tıklanınca açılan detay paneli
5. **6 · Metodoloji** — 4 kart + serbest paragraflar + 3 bilgi kutusu (kur sınavı / MEB / sertifika)
6. **7 · Kurs takvimi & şube tablosu** — şube filtresi + 5 kolonlu tablo
7. **8 · Öğrenci yorumları** — carousel (MEVCUT bileşen)
8. **9 · SSS** — accordion
9. **10 · Diğer diller** — iç link ağı
10. **11 · Alt CTA** — MEVCUT `CtaBand`

### Yeni yazılacak bileşenler

`Breadcrumb` · `PageHero` (lacivert iç sayfa hero'su — 6.5 ve 6.6'da da
kullanılacak) · `ProgressTrack` (CEFR noktaları + dolan çizgi) · `LevelPanel` ·
`FilterPills` · `ScheduleTable` · `Accordion` · `LinkRow`

`PageHero`, `ScheduleTable`, `Accordion`, `Breadcrumb` ve `ProgressTrack`
**sonraki aşamalarda tekrar kullanılacak** — sayfaya gömme, `components/sections/`
ve `components/ui/` altına genel yaz.

## Kritik ayrıntılar

### Tablo responsive davranışı
`data-ddm-thead` / `data-ddm-row` / `data-ddm-rowlabel` mekanizması:
**≤759px'te tablo başlığı gizlenir, her satır karta dönüşür** ve gizli
`rowlabel`'lar görünür olur. Masaüstü kolonları `1.4fr 1fr 1fr 1fr auto`.
(Faz 6.5'teki Üniversite şablonu aynı mekanizmayı 4 kolonla kullanıyor —
`ScheduleTable`'ı `columns` şemasıyla genel yaz.)

### Breakpoint'ler
`1339` (nav→burger, SiteHeader'da hazır) · `759` (tablo→kart) · `619`
(illüstrasyon gizlenir). Hepsi **CSS media query** — JS ile genişlik ÖLÇME.
Şablonun `state.w` alanı ölü, taşıma.

### İllüstrasyonlar
`components/graphics/Illustration.tsx` şu an yalnız `sube` motifini içeriyor.
**10 dil motifini ekle** — şablonun `illoDefs()` metodunda duruyorlar
(200×200 viewBox, üç katman: ana motif · yardımcı motif · zemin çizgisi,
stroke 1.6/1.5, `ddmFloatSlow`/`ddmFloat`). SVG'leri elle kopyalama —
`illoDefs()` çıktısından programatik çıkar, JSX'e çevir.
Motifler: Big Ben/otobüs/çay (en) · Brandenburg (de) · Eiffel (fr) ·
Sagrada (es) · Colosseo (it) · Kızıl Meydan (ru) · Şanghay (zh) ·
Amsterdam (nl) · İstanbul (tr) · konuşma balonları (speak).

### Seviye paneli — savunmasız indeks
Şablonda aktif seviye state'i yalnız 0..5 alıyor ama `faq` alanı bilinçli
olarak `-1`'e düşüyor. Aynı desen seviyeye sızarsa `activeLevel.cefr` patlar.
Aktif seviye indeksini sınırla (`clamp`), accordion mantığını seviyeye taşıma.

### İçerik boşlukları — UYDURMA (CLAUDE.md §5)
- `levelData()`'daki **A2 seviyesinin gövde metni BOŞ** → `DataMissingNotice`
  ile "İÇERİK EKSİK" göster, metin yazma.
- Kurs takvimi tablosunda **tarih / gün / saat üçü de kaynak içerikte YOK** →
  hepsi `null`, tabloda "bekleniyor" durumu + altta "VERİ EKSİK" şeridi.
- CEFR seviye içerikleri ve metodoloji metinleri şablonda **İngilizce'ye özel**.
  Diğer 9 dilin kaynak metni `data/site_content.json` içindeki kendi kaydından
  gelir. Bir dilde karşılık yoksa o bölüm düşer veya eksik işaretlenir —
  İngilizce metnini başka dile kopyalama.

### Uzun/kısa içerik
Şablondaki "Uzun (941 kelime) / Kısa (74 kelime)" toggle'ı **koda girmeyecek**
(aşağı bak). Gerçek karşılığı: 10 dilin kelime sayısı 272 ile 1010 arasında
değişiyor. `about` paragrafları, `seviyeGiris` gibi alanlar **veride varsa**
render edilir, yoksa o blok düşer. Yani bu bir prop değil, **verinin
varlığından türeyen durum**.

## Koda GİRMEYECEKLER

- **`<!-- ŞABLON ÖNİZLEME KONTROLÜ (yayında olmayacak) -->` şeridi** (satır ~65-82)
  ve onu besleyen her şey: `state.variant`, `isLong`, `setLong`, `setShort`,
  `longBg/longColor/shortBg/shortColor`, `state.illo`, `illoOptions`.
- **`<!-- 11b · İLLÜSTRASYON SETİ (şablon dokümantasyonu) -->` galerisi**
  (satır ~577-608). Galeri gitmeli; **içindeki 10 SVG üretim varlığıdır**,
  `Illustration.tsx` kaydına taşınacak.
- `data-reveal` / `data-reveal-delay` — ölü attribute (CSS'i bilinçli
  kaldırılmış). `data-count` — sayaç animasyonu kaldırılmış, sayılar statik.
- `state.w` + resize dinleyicisi + scroll dinleyicisi.

## Kurallar (CLAUDE.md — ihlal etme)

- **§3** Slug'lar birebir korunur, `.html` düşer. `trailingSlash: false`.
- **§4** Tüm iç linkler kök-göreli + `next/link`. Mutlak domain YAZMA.
  Şablondaki `href="#"` placeholder'larını gerçek URL'lere bağla; hedefi
  `data/urls.csv`'den doğrula, karşılığı yoksa link üretme
  (`lib/nav.ts` bunun örneği — `href: null` deseni).
- **§5** Gövde metinleri birebir korunur, yeniden yazılmaz/özetlenmez.
- **§6** `generateMetadata` ile title / description / canonical / H1 →
  `data/site_content.json`'daki ilgili kayıttan. `canonical` için
  `lib/site.ts`'teki `absoluteUrl()`. H1 yoksa `title`'a düş ve bunu **logla**,
  sessizce atlama.
- Görseller `next/image` ile, `width`/`height` verilerek.

## Veri modeli

`data/languages.ts` oluştur: slug · ad · kod · bayrak · illüstrasyon anahtarı.
Sayfa gövdesi `data/site_content.json`'dan beslenmeli; şablonun sabit
metinleri (program türü kartları, metodoloji başlıkları gibi tasarım kopyası)
`data/` altında ayrı dursun. Tipleri `lib/types.ts`'e ekle
(`ScheduleRow`, `Faq`, `Testimonial` zaten var — yeniden tanımlama).

## Bitirince

`npm run build` (10 sayfa üretilmeli), `npm run lint`, `npx tsc --noEmit`
üçü de temiz olmalı. `npm run dev` ile en az 3 dili aç (İngilizce = en uzun,
İngilizce Konuşma = en kısa, Çince = orta) ve 1339 / 759 / 619 px'i kontrol et.
`PROGRESS.md`'de Faz 6.4 kutucuğunu işaretle.

Bölüm bölüm ilerle, her bölüm bitince kısa rapor ver — 10 bölümü tek seferde
yazıp sonuna kadar gitme.
