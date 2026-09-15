@AGENTS.md

# ddm-web — Proje Kuralları

Bu proje, mevcut bir Joomla sitesinin (Dünya Dilleri Merkezi,
`dunyadillerimerkezi.com`) Next.js (App Router) ile yeniden yazımı. Üst
seviye plan ve faz durumu için repo kökündeki `../PROGRESS.md`'ye,
sayfa tipi haritası için `../docs/page-types.md`'ye, marka bağlamı için
`../docs/brand-context.md`'ye bakın.

**Bu dosya bir kurallar sözleşmesidir. Aşağıdaki kurallardan sapmadan önce
kullanıcıya danışın.**

---

## 1. Stack

- Next.js **App Router** + **TypeScript**, bileşen tabanlı.
- **Statik üretim (SSG) öncelikli**: sayfalar veri build zamanında belli
  olduğu için mümkün olduğunca statik olarak render edilmeli
  (`generateStaticParams`, sunucu bileşenlerinde build-time veri okuma).
- Tailwind YOK, CSS-in-JS YOK — Faz 4-5'te Claude Design'dan gelecek
  tasarım sistemine göre karar verilecek. Şu an sadece `app/globals.css`
  içinde minimal bir reset var.

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
  (`next.config.ts` → `redirects()`), ama bu eşleme **Faz 8'de** doldurulacak.
  Şimdi (Faz 3) boş.

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
├── app/            # Next.js route dosyaları — Faz 6-7'de sayfa tipi başına doldurulacak
├── components/     # Paylaşılan UI bileşenleri (header, footer, kurs kartı, yorum kartı...) — Faz 6'da
├── data/
│   ├── site_content.json   # Crawl edilmiş TÜM sayfa içeriği (384 kayıt) — salt okunur kaynak
│   └── urls.csv             # URL + title + meta + H1 + kelime sayısı (SEO referansı)
├── lib/
│   └── site.ts     # SITE_URL / absoluteUrl() — domain bağımsızlığı §4
├── public/         # Statik varlıklar (logo, favicon...) — Faz 4-5 sonrası dolacak
├── next.config.ts
├── .env.example
└── CLAUDE.md
```

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
6. `../PROGRESS.md`'deki ilgili faz kutucuğunu işaretle.

## 9. Tasarım

Tasarım **Claude Design**'da yapılır (Faz 4-5). Bu repo ve bu dosya sadece
onaylanmış tasarımı **koda uygular** — burada UI/görsel karar alınmaz. Bir
şablon/bileşen tasarlamadan önce ilgili Faz 5 handoff'unun onaylandığından
emin olun.
