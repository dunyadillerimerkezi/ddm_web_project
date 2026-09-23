@AGENTS.md

# ddm-web — Proje Kuralları

Bu proje, mevcut bir Joomla sitesinin (Dünya Dilleri Merkezi,
`dunyadillerimerkezi.com`) Next.js (App Router) ile yeniden yazımı. Üst
seviye plan ve faz durumu için repo kökündeki `../PROGRESS.md`'ye,
sayfa tipi haritası için `../docs/page-types.md`'ye, marka bağlamı için
`../docs/brand-context.md`'ye bakın.

**Bu dosya bir kurallar sözleşmesidir. Aşağıdaki kurallardan sapmadan önce
kullanıcıya danışın.**

## 0. Oturum Protokolü (her chat)

- **Başlarken:** önce `../docs/SESSION-HANDOFF.md` §A'yı (nerede kaldık), sonra bu
  dosyayı, sonra `../docs/remaining-pages-plan.md`'deki aktif P bölümünü oku.
  `git status` / `git log -5` ile §A'yı teyit et.
- **Bitirirken:** `../docs/SESSION-HANDOFF.md` §C kapanış protokolünü uygula (§A'yı üzerine
  yaz, §D'ye günlük kaydı ekle, PROGRESS/page-types'ı güncelle). Kod ve döküman **ayrı
  commit**; push yok.
- Her aktif P bölümünde o fazın **başlangıç prompt'u** ve **skill hatırlatmaları** var —
  UI işinde `frontend-design:frontend-design`, commit öncesi `code-review` her zaman.

---

## 1. Stack

- Next.js **App Router** + **TypeScript**, bileşen tabanlı.
- **Statik üretim (SSG) öncelikli**: sayfalar veri build zamanında belli
  olduğu için mümkün olduğunca statik olarak render edilmeli
  (`generateStaticParams`, sunucu bileşenlerinde build-time veri okuma).
- **Tailwind YOK, CSS-in-JS YOK.** Stil katmanı **CSS Modules + token
  katmanı** (Faz 5 sonunda karar verildi, kullanıcı onayı alındı):
  - `styles/tokens.css` — tüm tasarım tokenları `:root` değişkeni olarak
    (renk / tipografi / boşluk / radius / gölge). Tek kaynak.
    Karşılığı: `../docs/design-refs/DDM_Tasarım_Sistemi_faz5/DDM Tasarım Sistemi.dc.html`
  - `styles/<Bileşen>.module.css` — bileşen başına bir modül.
  - `app/globals.css` — yalnız reset, temel eleman stilleri, keyframe'ler.
  - **Ham hex/px değerini bileşene yazmayın**, tokendan geçirin. Token'da
    karşılığı yoksa önce `tokens.css`'e ekleyin.
  - Koyu tema YOK — site tek temalı. Koyu/açık ayrımı `prefers-color-scheme`
    ile değil, bölüm ZEMİNİYLE yapılır (lacivert hero/footer vs beyaz gövde).

## 2. Statik Üretim ve 301 Redirect — ÖNEMLİ KARAR

`next.config.ts`'te **`output: "export"` bilinçli olarak KULLANILMIYOR.**
Next.js'in tam statik export modu `next.config` içindeki `redirects()` /
`rewrites()` / `headers()` özelliklerini **desteklemiyor**. Faz 8'in tüm
`.html` → temiz URL 301 planı `next.config.ts`'teki `redirects()` fonksiyonuna
dayanıyor (bkz. `../PROGRESS.md` Faz 8). Bu yüzden:

- `output: "export"` **eklemeyin**. Varsayılan Next.js modu korunacak: sayfalar
  yine build zamanında statik üretilir (SSG), ama `redirects()` çalışmaya
  devam eder.
- Eğer ileride gerçekten dosya tabanlı statik hosting (ör. S3/Nginx, sunucusuz
  bir ortam) gerekirse, bu kısıtlama nedeniyle 301'leri **hosting katmanında**
  (Nginx/Cloudflare/Vercel yönlendirme kuralları) kurmak gerekir — bu durumda
  önce kullanıcıya danışın, tek taraflı karar vermeyin.

## 3. URL Kuralı

- Eski site `.html` uzantılı Joomla URL'leri kullanıyordu. Yeni sitede
  **`.html` YOK** — temiz URL'e geçiliyor.
  Örnek: `/yabanci-dil-egitimleri/ingilizce-kursu.html` → `/yabanci-dil-egitimleri/ingilizce-kursu`
- **Slug'lar birebir korunuyor** — sadece `.html` uzantısı düşüyor, path
  yapısı değişmiyor. Slug'ı "iyileştirmek" için değiştirmeyin.
- `trailingSlash: false` — URL sonunda `/` OLMAYACAK, tutarlı uygulanacak
  (`next.config.ts`'te ayarlı).
- Eski `.html` URL'lerinden yeni URL'lere **301 redirect zorunlu**
  (`next.config.ts` → `redirects()`). Genel `.html` → temiz URL kuralı **Faz 8'de**
  gelecek; ondan önce her tip kendi özel redirect'lerini **o tipin fazında**
  ekler (şu an dolu: 6.5 → 21 üniversite kök URL'i × `.html`/`.html`siz = 42;
  6.6 + P0 → 16 Joomla `?id=` kurs-tarihi URL'i, `has: query` kuralıyla; kaynaktaki 61 query'li URL'in tam envanteri:
  `../docs/remaining-pages-plan.md` §4). Yeni tip
  eklerken kalıp: tip fazında ilgili eski URL'leri `redirects()`'e ekle, Faz 8'de
  genel kurala bırakma.

## 4. Domain Bağımsızlığı — Mutlak Kural

- **Hiçbir yerde `https://...` (absolute domain) yazmayın.** Tüm iç linkler
  kök-göreli (`/...`) ve `next/link`'in `<Link>` bileşeniyle yazılır.
  ```tsx
  // DOĞRU
  <Link href="/sinav-hazirlik-egitimleri/toefl-kursu">TOEFL Kursu</Link>
  // YANLIŞ
  <a href="https://www.dunyadillerimerkezi.com/sinav-hazirlik-egitimleri/toefl-kursu">...</a>
  ```
- Absolute URL **sadece** şu üç yerde gerekir: `sitemap.xml`, `canonical`
  meta etiketi, Open Graph (`og:url` vb.). Bu üç yer bile domaini elle
  yazmaz — `lib/site.ts` içindeki `absoluteUrl()` / `SITE_URL`'den geçer.
- Domain **tek bir env değişkeninde** tutulur: `NEXT_PUBLIC_SITE_URL`
  (bkz. `.env.example`). Domain değişirse **sadece bu değer** güncellenir,
  kodda başka hiçbir yer dokunulmaz.

## 5. İçerik Kuralı — Metinler Birebir Korunur (SEO)

- Sayfa içerikleri `data/site_content.json`'dan gelir (bkz. §7 şema).
  **Gövde metinleri asla yeniden yazılmaz, özetlenmez, "iyileştirilmez".**
  Bu bir SEO kararı: mevcut sıralamaları korumak için eski metinler birebir
  taşınıyor.
- **Tek istisna:** bariz metadata hataları. Örnek (`../docs/page-types.md`'de
  belgelendi): "Online Çince Eğitimi" sayfasının `meta_description`'ı yanlışlıkla
  "Online İtalyanca eğitimi..." diye başlıyor — böyle kopyala-yapıştır
  hatalarını düzeltmek serbest, ama **her düzeltme kullanıcıya bildirilir**
  ve hangi alanın neden değiştirildiği not edilir. Gövde metni (`text` alanı)
  bu istisnaya girmez, o her zaman birebir kalır.
- **Onaylı sapmalar (kullanıcı kararıyla, tekrar sormaya gerek yok):**
  - Ana Sayfa tek H1: kaynakta 4 ayrı `h1` var (eski sitenin SEO kusuru); hero başlığı
    tek H1 yapıldı, diğerleri h2/h3'e indi (Faz 6.3).
  - Şube Kurs Tarihi sayfalarında kaynaktaki ~170 **ücret satırı yayınlanmıyor**;
    fiyat CTA'sı yok, tüm butonlar "Bilgi Al" → şube iletişim sayfası (Faz 6.6).
  - Üniversite proficiency'de "NEDEN DDM" ve "SSS" bölümleri kaynakta karşılığı
    olmadığı için koda girmedi (Faz 6.5).
  - **Sınav Hazırlık sayfaları (P2, 2026-09-22/23):** kaynak **başlıkları silinmez**,
    ama gövde metni **konudan sapmadan SEO için geliştirilebilir** — bu tip için
    "birebir" kuralının yerini alır. Şart: her düzenleme `data/exams.ts`'te
    `edits` (orijinal satır → yeni satır) ve `additions` olarak İZLENEBİLİR durur,
    kaynakta karşılığı kalmayan bir `edits` anahtarı build'i düşürür; sayısal/güncel
    olgular resmi kaynaktan doğrulanmadan yazılmaz. "Kurs Programı" (`-kursu-2`)
    sayfaları yayınlanmıyor, kayda değer içerikleri ana sayfaya taşındı.
  Bunların dışında yeni bir sapma gerekirse önce kullanıcıya danış.
- Belirsiz/çelişkili firma bilgisi (ör. "kaç yıldır faaliyette" — bkz.
  `../docs/brand-context.md` [doğrula] bölümü) sayfa içeriğine **uydurma bir
  değerle** yazılmaz; kaynağında ne yazıyorsa o taşınır.

## 6. Sayfa Metadata Kuralı

Her sayfada aşağıdaki 4 alan ilgili veriden (bkz. §7) doldurulur, elle
yazılmaz:
- `title` ← `site_content.json[].title`
- `meta description` ← `site_content.json[].meta_description`
- `canonical` ← `absoluteUrl(temiz-url)` (`lib/site.ts`)
- `H1` ← `site_content.json[].headings` içindeki `h1` (yoksa `title`'a
  düşülür, bu durum loglanır/işaretlenir — sessizce atlanmaz)

## 7. Klasör Düzeni ve Veri Şeması

```
ddm-web/
├── app/            # Next.js route dosyaları (tip başına dinamik segment)
│   ├── layout.tsx  # <html lang="tr">, next/font (latin-ext!), globals.css
│   ├── globals.css # reset + temel eleman stilleri + keyframe'ler
│   ├── page.tsx                                   # Ana Sayfa (6.3)
│   ├── yabanci-dil-egitimleri/[kurs]/page.tsx     # Dil Kursu Ana, 10 dil (6.4)
│   ├── yabanci-dil-egitimleri/[kurs]/[sayfa]/     # Şube Kurs Tarihi — dil tarafı (6.6)
│   ├── sinav-hazirlik-egitimleri/[kurs]/[sayfa]/  # Şube Kurs Tarihi — sınav tarafı (6.6)
│   └── sinav-hazirlik-egitimleri/proficiency-kursu/[sayfa]/  # 21 üniversite + tarih dağıtıcısı (6.5/6.6)
├── components/     # Paylaşılan UI bileşenleri — Faz 6'da doluyor
│   ├── layout/     # TopBar, SiteHeader, MobileBottomBar, SiteFooter, SiteChrome,
│   │               # Breadcrumb, StickyToc
│   ├── ui/         # Button, Primitives (Kicker/Badge/…), Accordion, Carousel,
│   │               # ProgressTrack (barrel: index.ts)
│   ├── cards/      # BranchCard, CourseChipCard, ExamSectionCard, FeatureCard,
│   │               # LanguageCard, MediaCard, ProgramCard, TestimonialCard
│   ├── sections/   # Sayfa bölümleri: PageHero (modlar dil/uni/sube), ScheduleTable,
│   │               # WeekGrid, CourseDatePage, DetailSections, ProcessSteps,
│   │               # ContactFormCard, BranchInfoPanel, UniversityGrid, LanguageGrid,
│   │               # LevelExplorer, PricingPanel, CtaBand, TestimonialsCarousel…
│   └── graphics/   # Icon + ikon kaydı, Illustration (200×200 set), Flag, LanguageGlobe
├── styles/
│   ├── tokens.css  # TÜM tasarım tokenları (§1) — tek kaynak
│   └── *.module.css # bileşen başına CSS Module
├── data/
│   ├── site_content.json   # Crawl edilmiş TÜM sayfa içeriği (384 kayıt) — salt okunur kaynak
│   ├── urls.csv             # URL + title + meta + H1 + kelime sayısı (SEO referansı)
│   ├── branches.ts          # 5 şube — adres/telefon eksikse null (§5)
│   ├── universities.ts      # 21 üniversite (proficiency şablonu)
│   ├── languages.ts         # 10 dil — illüstrasyon + bayrak eşlemesi
│   ├── courseDates.ts       # 72 şube×kurs kaydı (üretim betiğiyle çıkarıldı)
│   └── home.ts              # Ana Sayfa verisi
├── lib/
│   ├── site.ts     # SITE_URL / absoluteUrl() — domain bağımsızlığı §4
│   ├── nav.ts      # mega menü / footer link ağacı — tek kaynak
│   ├── types.ts    # paylaşılan sayfa ve bileşen tipleri
│   ├── contentSections.ts   # SectionResolver — kaynağı başlık-tabanlı bölümler; assertCoverage
│   └── languageContent.ts / universityContent.ts / courseDateContent.ts   # tip başına içerik çözücü
├── scripts/        # pull-ddmcadde.mjs (içerik tazeleme), check-links.mjs (`npm run check-links`: build sonrası ölü iç link sayımı — her faz sayıyı düşürmeli)
├── public/assets/  # ddm-logo-{lacivert,beyaz}.png, foto-1..12.jpg
├── next.config.ts
├── .env.example
└── CLAUDE.md
```

> Tasarım şablonlarının kaynağı `../docs/design-refs/DDM_Tasarım_Sistemi_faz5/`
> (`.dc.html` — Claude Design ara formatı, geçerli HTML DEĞİL). Bir bileşeni
> değiştirmeden önce ilgili şablona bakın. İçerik genişliği **1320px**
> (`--ddm-container`); tasarım sistemi dokümanındaki 1280 eskidir.

`data/site_content.json` — her eleman:
```ts
{
  url: string;              // eski TAM URL, https://www.dunyadillerimerkezi.com/... dahil
  status: number;           // crawl HTTP durumu
  title: string;
  meta_description: string;
  canonical: string;        // çoğu kayıtta boş — eski sitede canonical eksikti
  headings: { level: "h1" | "h2" | ...; text: string }[];
  text: string;             // sayfanın DÜZ METİN gövdesi (HTML/DOM yapısı YOK)
}
```

`data/urls.csv` kolonları: `url,status,title,meta_description,h1,word_count`
— hızlı filtreleme/rapor için `site_content.json`'ın özet hali, kaynak olarak
`site_content.json` esas alınır.

> `site_content.json` sadece metin + başlık içeriyor; orijinal HTML/DOM
> yapısını (görsel bileşenler, akordeon, mega menü vb.) İÇERMİYOR. Görsel
> yapı kararları Faz 4-5'te Claude Design'da, ekran görüntüleri/gerçek site
> incelemesiyle alınır — bu veriden UI yapısı çıkarılamaz.

## 8. Yeni Bir Sayfa Nasıl Eklenir (Faz 6-7 için akış)

1. `data/site_content.json`'da eski `url` alanından ilgili kaydı bul (domain'i
   ve `.html`'i at → yeni temiz URL bu).
2. `app/` altında o path'e karşılık gelen route dosyasını oluştur
   (ör. `/yabanci-dil-egitimleri/ingilizce-kursu` → `app/yabanci-dil-egitimleri/ingilizce-kursu/page.tsx`).
   Tekrar eden sayfa TİPLERİ için (bkz. `../docs/page-types.md`) tekil
   `page.tsx` yerine `generateStaticParams` ile dinamik segment kullanın
   (ör. `app/ogrenci-yorumlari/[slug]/page.tsx`).
3. Metadata'yı §6'daki 4 alanla doldur.
4. Gövdeyi ilgili `components/` bileşenine (Faz 5'te tasarlanan şablona göre)
   veri olarak geçir — JSX içine metni elle yapıştırma.
5. Tüm iç linkleri `<Link href="/...">` ile, kök-göreli yaz (§4).
6. **Birebir-metin garantisi:** yeni tipin içerik çözücüsü (`lib/*Content.ts`)
   `SectionResolver` kullanır ve build'de `assertCoverage()` ile kaynağın HER
   satırının ya tüketildiğini ya gerekçeli `ignored[]`'da olduğunu doğrular.
   Hiçbir satır sessizce atılmaz. H1 yoksa ilk başlığa düşülür ve `console.warn` ile loglanır.
7. **Dinamik route deseni:** `generateStaticParams` + `export const dynamicParams = false`;
   `generateMetadata` içinde §6'daki 4 alan. Aynı segmentte iki tip yan yana
   yaşayacaksa (ör. `proficiency-kursu/[sayfa]` hem üniversite hem kurs-tarihi) tek
   `[sayfa]` route'u dağıtıcı olarak çalışır.
8. **Önce 1 pilot sayfa, onay, sonra toplu** (Faz 6.4/6.5 pratiği). Tipin "Aşama 0
   denetimi" ile kesin adet/yapı çıkarılmadan kod yazılmaz.
9. `../PROGRESS.md`'deki ilgili faz kutucuğunu ve `../docs/page-types.md` Durum
   kolonunu güncelle. **Kalan tiplerin sırası ve ayrıntısı:**
   `../docs/remaining-pages-plan.md`.

## 9. Tasarım

Tasarım **Claude Design**'da yapılır (Faz 4-5). Bu repo ve bu dosya sadece
onaylanmış tasarımı **koda uygular** — burada UI/görsel karar alınmaz. Bir
şablon/bileşen tasarlamadan önce ilgili Faz 5 handoff'unun onaylandığından
emin olun.

**Kalan tipler (Şube İletişim, Sınav Hazırlık Ana, Hub, Zengin İçerik, Seviye,
Şube Tanıtım, Yorum/Duyuru):** Faz 5'te tasarlanmadılar. Tasarım kaynağı (Claude
Design turu mu, mevcut atomlarla doğrudan kod mu) **kullanıcı kararı bekliyor** —
bkz. `../docs/remaining-pages-plan.md` §5 karar #1. O karar verilene kadar bu
tipler için yeni görsel dil icat etme; mevcut `components/` atomlarını ve
`tokens.css`'i kullan.
