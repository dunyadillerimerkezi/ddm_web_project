# Dünya Dilleri Merkezi — Web Sitesi Yenileme (Progress & Çalışma Dökümanı)

> Bu döküman canlı bir yol haritasıdır. Her fazın altında amaç, çıktı, kontrol listesi
> (`- [ ]`) ve kullanılacak AI prompt'ları vardır. Prompt'larda ilgili **skill**'ler
> parantez içinde belirtilmiştir; o adımda Claude'a bu skill'i kullanmasını söyle.

---

## 0. Proje Kararları (sabit)

- **Stack:** Next.js (App Router, statik/SSG öncelikli). *Not: düz client-side React (CRA/Vite-React tek başına) SEO için uygun değil — sunucu render / statik üretim şart. Next.js bunu verir.*
- **URL kararı:** `.html` uzantısı kaldırılıyor, temiz URL'e geçiliyor.
  Örn: `/yabanci-dil-egitimleri/ingilizce-kursu.html` → `/yabanci-dil-egitimleri/ingilizce-kursu`
- **Slug'lar aynı kalıyor:** sadece uzantı düşüyor, path yapısı birebir korunuyor.
- **Tasarım dili:** Educore (Webflow) şablonu **görsel referans**. Bilgi mimarisi ondan ALINMAYACAK.
- **Ölçek:** ~300 sayfa → ~8-9 sayfa tipi.
- **İçerik:** crawler'dan gelecek, metinler **birebir korunacak** (yeniden yazılmayacak).

### Değişmez SEO ilkeleri (her fazda geçerli)
- [ ] Her eski `.html` URL'inden yeni temiz URL'e **301 redirect** kurulacak
- [ ] `title`, `meta description`, `canonical`, `H1` her sayfada eski siteden taşınacak
- [ ] Gövde metinleri **birebir** korunacak, özetlenmeyecek/yeniden yazılmayacak
- [ ] İç linkler kök-göreli (`/...`) yazılacak, absolute domain yazılmayacak
- [ ] Trailing slash kararı tek olacak (öneri: slash'sız) ve tutarlı uygulanacak

---

## Faz 0 — Envanter & İçerik Çıkarımı

**Amaç:** Sitenin tüm sayfalarını, metinlerini ve mevcut SEO verisini tek kaynağa toplamak.
**Çıktı:** `site_content.md`, `site_content.json`, `urls.csv`

- [ ] `site_crawler.py` çalıştırıldı (`pip install requests beautifulsoup4 lxml`)
- [ ] `site_content.json` içerik kaynağı olarak elde
- [ ] `urls.csv` (URL + title + meta + H1 + kelime sayısı) SEO referansı olarak elde
- [ ] Çıktılar `/data` klasörüne kondu

```bash
python site_crawler.py https://www.dunyadillerimerkezi.com --max-pages 500 --delay 0.5
```

---

## Faz 1 — Sayfa Tipi Haritası  ⬅️ SAYFA TİPLERİ BURADA BELİRLENİR

**Amaç:** 300 sayfayı ~8-9 tekrar eden tipe indirgemek. Bu harita tüm projeyi yönetir.
**Çıktı:** `page-types.md` (tip adı, URL deseni, hangi şablon, kaç sayfa, değişken alanlar)

- [x] `urls.csv` URL desenlerine göre gruplandı
- [x] Her tip için 1 temsili örnek URL seçildi
- [x] Her tipin "değişken alanları" (şablonda içerikle değişecek yerler) çıkarıldı
- [ ] `page-types.md` onaylandı ⬅️ **inceleyip onayını bekliyor** (bkz. `docs/page-types.md`)

### Başlangıç hipotezi (crawl'a göre — Faz 1'de doğrulanacak)

| # | Sayfa tipi | URL deseni (örnek) | ~Adet | Not |
|---|---|---|---|---|
| 1 | Ana sayfa | `/` | 1 | Zengin landing |
| 2 | Kategori/hub | `/sinav-hazirlik-egitimleri` | ~6 | Üst menü açılış sayfaları |
| 3 | Dil kursu sayfası | `/yabanci-dil-egitimleri/ingilizce-kursu` | ~10 | Diller arası aynı yapı |
| 4 | Kurs alt/içerik sayfası | `.../ingilizce-kursu/ingilizce-ozel-ders` | çok | Program, Özel Ders, Nedir, Sistem |
| 5 | Şube kurs tarihi | `.../kadikoy-subesi-...-kurs-tarihi` | çok | Neredeyse birebir tekrar |
| 6 | Sınav hazırlık kursu | `/sinav-hazirlik-egitimleri/toefl-kursu` | ~15 | + alt sayfalar |
| 7 | Üniversite proficiency | `.../proficiency-kursu/itu...` | ~30 | Aynı iskelet, farklı üniversite |
| 8 | Şube tanıtım / iletişim | `/kadikoy-tanitim-sayfasi`, `/ddm-iletisim/...` | ~10 | Adres/harita/iletişim |
| 9 | Liste sayfası | `/ogrenci-yorumlari`, `/duyurular` | ~birkaç | Kart listesi |

### Prompt — Sayfa tiplerini çıkar
```
Ekteki urls.csv ve site_content.md dosyalarını incele. (file-reading skill'ini kullan.)
Amacım ~300 sayfayı tekrar eden sayfa TİPLERİNE indirgemek.

Yap:
1. URL desenlerine göre sayfaları grupla, her grup bir "sayfa tipi" olsun.
2. Her tip için: tip adı, URL deseni, tahmini sayfa sayısı, 1 temsili örnek URL.
3. Her tipin "değişken alanları"nı çıkar (şablonda içerikle değişecek yerler:
   ör. dil adı, program listesi, şube adı/tarih, üniversite adı).
4. Sonucu page-types.md olarak tablo halinde üret.

Uydurma tip ekleme; sadece verideki gerçek URL'lere dayan. Türkçe yaz.
```

---

## Faz 2 — brand-context.md (Firma Kimliği)

**Amaç:** Marka kimliğini, tonu ve sayfa tiplerini tek referans dosyada toplamak.
**Çıktı:** `brand-context.md`

- [x] Firma dökümanı + `site_content.md` Claude'a verildi *(firma dökümanı yok, `site_content.json` kullanıldı)*
- [ ] `brand-context.md` üretildi ⬅️ **gözden geçirmeni bekliyor** (bkz. `docs/brand-context.md`)

### Prompt
```
Ekteki firma dökümanını ve site_content.md'yi kullanarak brand-context.md üret.
İçersin:
- Firma kimliği: ne yaptığı, kaç yıldır, şubeler, sunulan diller/sınavlar
- Hedef kitle ve marka tonu (akademik + sıcak/motive edici)
- Sayfa tipleri listesi (Faz 1'deki page-types.md ile uyumlu) ve her birinin amacı
- Tekrar eden bileşenler (header/mega menü, footer, kurs kartı, yorum kartı, akordeon)

Uydurma bilgi ekleme; sadece dökümanlarda geçenleri kullan. Türkçe yaz.
(Word/PDF isteniyorsa docx/pdf skill'ini kullan; md yeterli.)
```

---

## Faz 3 — Stack Kurulumu + CLAUDE.md

**Amaç:** Next.js iskeletini kurmak ve Claude Code'a operasyonel kuralları vermek.
**Çıktı:** Çalışan Next.js repo + `CLAUDE.md`

- [x] Next.js projesi kuruldu (App Router, TypeScript) — `ddm-web/`
- [x] `/data` yapısı belirlendi (`ddm-web/data/site_content.json` + `urls.csv`);
      ayrı bir `/content` klasörü açılmadı — içerik tek kaynaktan (`data/`) okunacak
- [x] `CLAUDE.md` yazıldı ve `ddm-web/` köküne kondu
- [x] `trailingSlash` kararı (`false`) `next.config.ts`'e işlendi

### Prompt — CLAUDE.md üret
```
Bu proje mevcut bir Joomla sitesinin (Dünya Dilleri Merkezi) Next.js (App Router)
ile yeniden yazımı. Bir CLAUDE.md üret; şu kurallar net ve maddeli olsun:

- Stack: Next.js App Router, statik/SSG öncelikli, bileşen tabanlı.
- URL kuralı: slug'lar eski siteyle birebir aynı, ama .html YOK (temiz URL).
  Örn dosya yolu: app/yabanci-dil-egitimleri/ingilizce-kursu/page.tsx
- Eski .html URL'lerinden yeni URL'lere 301 redirect zorunlu (next.config.js redirects).
- İç linkler kök-göreli (/...) ve <Link> ile; absolute domain YAZMA.
- İçerik: sayfa metinleri /data/*.json'dan gelecek; metinler ASLA yeniden
  yazılmayacak/özetlenmeyecek — birebir korunacak (SEO).
- Her sayfada metadata: title, meta description, canonical, H1 ilgili json'dan.
- Klasör düzeni, içerik json şeması ve "yeni sayfa nasıl eklenir" akışını tanımla.
- UI çalışırken frontend-design skill'i kullanılacak.
```

---

## Faz 4 — Design System (Claude Design Onboarding)

**Amaç:** Educore'un görsel dilinden DDM'ye özel bir tasarım sistemi kurmak.
**Çıktı:** Claude Design'da kurulu tasarım sistemi (renk, tipografi, bileşenler, header/footer)

- [ ] Educore kodu (satın alınıp export edildiyse) veya ekran görüntüleri hazırlandı
- [ ] DDM logosu ve varsa fontlar toplandı
- [ ] Ana renk / renk paleti belirlendi
- [ ] Claude Design onboarding ekranı dolduruldu (aşağıdaki notlarla)

### Onboarding "Any other notes" metni
```
- Görsel dil kaynağı: ekteki Educore Webflow şablonu (yuvarlak köşeli kartlar,
  pill butonlar, yıldız puanlı yorum grid'i, akordeon, güçlü hero). Renk paleti,
  tipografi, buton ve kart stilini buradan türet.
- ÖNEMLİ: Educore tek sayfalık kurs landing page'i; benim sitem ~300 sayfalık,
  çok kademeli menülü dizin sitesi. Bilgi mimarisini ALMA, sadece görsel dili al.
- Header'da çok seviyeli mega menü: 7 ana başlık (Yabancı Dil Kursları, İngilizce
  Kursları, Sınav Hazırlık, Yurtdışı Eğitim, Kurumsal, Diğer Programlar, İletişim),
  her biri dropdown alt menülü.
- Header ve footer tüm sayfalarda ortak; önce bunları ve tekrar eden kart/section
  bileşenlerini oturt.
- Site Türkçe. Metinler SEO için birebir korunacak.
- ~8-9 sayfa tipi üreteceğim (page-types.md).
```

> Renk/font için sabit değer yazma; Claude Design bunları koddan/görselden çıkaracak.

---

## Faz 5 — Şablon Tasarımı (Claude Design'da, GERÇEK içerikle)

**Amaç:** Ana sayfa + en çok tekrar eden 3-4 tipi tasarlamak. **İçeriği sen ver — Design uydurmasın.**
**Çıktı:** Onaylı tasarımlar (ana sayfa + seçili tipler)

- [x] Ana sayfa tasarlandı (gerçek içerikle)
- [x] Dil kursu sayfası tipi tasarlandı
- [x] Şube kurs tarihi sayfası tipi tasarlandı
- [x] Üniversite proficiency sayfası tipi tasarlandı
- [ ] (Gerekiyorsa) diğer tipler tasarlandı *(kalan tipler: `docs/remaining-pages-plan.md` karar #1)*

### Prompt — Ana sayfa
```
Kurduğumuz design system'i kullanarak Dünya Dilleri Merkezi ana sayfasını tasarla.
(frontend-design skill'ini kullan.)

İçeriği AŞAĞIDA veriyorum — bu metinleri BİREBİR kullan; metin uydurma, lorem ipsum
KOYMA:
[site_content.md'den ana sayfa bölümünü yapıştır: başlıklar, açıklamalar, CTA'lar,
19 dil kartları, şubeler bölümü, öğrenci yorumları]

Yapısal istekler:
- Üstte çok seviyeli mega menü (7 ana başlık, dropdown alt menüler)
- Educore'un görsel dili (kartlar, pill butonlar, section ritmi) ama içerik-yoğun
  ana sayfaya uyarlanmış
- Footer: dil kursları listesi, şube bilgileri, çalışma saatleri, sosyal linkler
```

### Prompt — Bir sayfa tipi şablonu (örnek: dil kursu)
```
Aynı design system'le "dil kursu sayfası" TİPİNİN şablonunu tasarla.
(frontend-design skill'ini kullan.)

Temsili içerik olarak İngilizce Kursu sayfasını kullan (metni ekte, birebir).
Bu bir ŞABLON: Almanca/Fransızca vb. aynı yapıya farklı içerikle dökülecek.
Değişken alanları net ayır (dil adı, açıklama, program listesi, şube tarihleri)
ki koda çevirince veri-tabanlı üretebileyim.
```

---

## Faz 6 — Koda Aktarım (Handoff) + İçerik Modeli

**Amaç:** Tasarımları repoya almak ve içeriği veriden besleyen yapı kurmak.
**Çıktı:** Şablonlar Next.js bileşeni; `/data/*.json` içerik şeması

- [x] Claude Design → export paketi alındı (`docs/design-refs/DDM_Tasarım_Sistemi_faz5/`)
- [x] Paket repoya entegre edildi + 4 şablon incelendi (rapor: bileşen/token/veri modeli)
- [x] Faz 5'te tasarlanan 4 şablon Next.js bileşenlerine çevrildi (6.3–6.6) → **alt aşamalar aşağıda**; tasarımı olmayan kalan tipler için bkz. Faz 6.8+
- [ ] İçerik json şeması kuruldu (`site_content.json`'dan beslenir)
- [ ] (Opsiyonel) `/design-sync` ile canvas ↔ repo iterasyonu kuruldu

### Faz 6 alt aşamaları

> Numaralandırma: **Faz 6.N**. "Faz" ile karıştırmamak için alt adımlara
> ayrı isim verilmiyor — hepsi Faz 6'nın içinde.
>
> **Stil kararı (alındı):** CSS Modules + `styles/tokens.css` token katmanı.
> Tailwind ve CSS-in-JS yok. Ayrıntı: `ddm-web/CLAUDE.md` §1.
>
> **Sayfa sırası kullanıcı tercihidir:** Ana Sayfa → Dil Kursu → Üniversite
> → Şube Kurs Tarihi. (Teknik öneri sayfa adedine göre tersiydi — Şube 88
> sayfayla en yüksek getirili ve en olgun şablondu — ama önce sitenin yüzünü
> görmek tercih edildi.)

- [x] **6.0 · Token + layout**
      `styles/tokens.css` (renk/tipografi/boşluk/radius/gölge), `app/layout.tsx`
      + `next/font` (latin-ext — Türkçe ğ ş ı İ için zorunlu), `globals.css`
      reset, `public/assets/` varlık normalizasyonu, CLAUDE.md §1/§7 güncellendi
- [x] **6.1 · Chrome**
      TopBar · SiteHeader + mega menü + mobil çekmece · SiteFooter ·
      MobileBottomBar · SiteChrome · `lib/nav.ts` (menü tek kaynak) ·
      `data/branches.ts`. Breakpoint'ler tamamen CSS'te.
- [x] **6.2 · UI atomları**
      Button ailesi (5 varyant × 4 ölçü) · Kicker · SectionHeading · Badge ·
      DayBadge · IconButton · ImageSlot · DataMissingNotice · Icon kaydı ·
      Illustration
- [x] **6.3 · Ana Sayfa** (1 sayfa)
      HomeHero · MediaCard · FeatureCard · StatStrip · Carousel ·
      CourseChipCard · BranchCard · TestimonialCard · VideoPromo ·
      LanguageGrid + LanguageGlobe + Flag seti (9 bayrak) · CtaBand.
      `npm run build` / `lint` / `tsc --noEmit` temiz; `npm run dev`'de
      1339px ve 999px altı elle doğrulandı.
      **Not — CLAUDE.md §6'dan bilinçli sapma:** kaynak `site_content.json`
      kaydında dört ayrı `h1` var ("Yabancı Dil Programları", "Sınav Hazırlık
      Kursları", "Yurtdışı Dil Eğitimi", "Yurtdışı Eğitim" — eski sitenin
      SEO kusuru). Tasarım tek h1 öngörüyordu; kullanıcı onayıyla hero'nun
      büyük başlığı ("19 dilde eğitim, 2003'ten bugüne...") tek h1 yapıldı,
      diğer dördü h2/h3'e indirgendi.
      **Diğer düzeltmeler:** `lib/nav.ts`'te Mektuplar linki `/ogrenci-yorumlari`'na
      bağlandı (kullanıcı onayı — canlı sitenin fiilî davranışı) ve "Yabancı
      Dil" mega menü promoLink'i `/yabanci-dil` hub'ına düzeltildi (önceki
      hedef `/yabanci-dil-egitimleri/...` bir sayfa değil, yalnız dizin öneki).
      10 görsel dosya adı ASCII'ye çevrildi (`git mv`). `tokens.css`'e Ana
      Sayfa'ya özel ~20 token, `globals.css`'e `ddmSpin`/`ddmChip` keyframe'leri,
      ikon kaydına 8 yeni ikon eklendi.
- [x] **6.4 · Dil Kursu Ana** (10 sayfa)
      `app/yabanci-dil-egitimleri/[kurs]/page.tsx` (tek dinamik route, 10 dil,
      `generateStaticParams`). PageHero · Breadcrumb · ProgressTrack (CEFR) ·
      ScheduleTable · AboutCertification · LevelExplorer (yalnız seviye bölümü
      olan dillerde) · BulletPanel · PricingPanel · LinkRow · TestimonialsCarousel ·
      Accordion (SSS) · CtaBand · `data/languages.ts` · `lib/languageContent.ts`.
      Pilot dil İtalyanca'ydı, sonra 10 dile genişletildi; `npm run build`'de
      10/10 dil üretiliyor. (Not: sayfa dosyasının üst yorumundaki "kalan 9 dil
      için onay bekliyor" notu bayat — bir sonraki dokunuşta silinecek.)
- [x] **6.5 · Üniversite Proficiency** (21 üniversite, 42 URL — 21 sayfa + 21 kök 301)
      `app/sinav-hazirlik-egitimleri/proficiency-kursu/[universite]/page.tsx` ·
      ExamSectionCard · ExamStructure · DetailSections · StickyToc (scroll-spy,
      gerçek IntersectionObserver) · ProcessSteps (3 adım, scroll ile dolan
      çizgi) · ContactFormCard · UniversityGrid (21 kart + TR-duyarlı arama) ·
      ScheduleTable `uni4` (yeniden kullanım) · `data/universities.ts` ·
      `lib/universityContent.ts`. `PageHero` genişletildi (`code: string|null`,
      `codeVariant="pill"`, `titleSize="uni"`, `art.mode="uni"`) — dil kursu
      çağrısı değişmedi. 3 yeni illüstrasyon motifi (`kampus`/`sinav-oturumu`/
      `dort-beceri`) + 9 yeni ikon (`sinav-ikon-*` ailesi + `soru`/`kisim`/`puan`).
      `next.config.ts`'te `redirects()` İLK KEZ dolduruldu — 21 üniversite kök
      URL'i (`.html`'li/`.html`siz) nested URL'e 301 (Faz 8'in genel kuralından
      önce, kullanıcı kararıyla).
      **Aşama 0 denetimi** ilk keyword-taramasını düzeltti: gerçek katmanlama
      A (6, ayrı başlıklı: Boğaziçi/Özyeğin/Bilgi/Doğuş/Sabancı/İstanbul Şehir),
      B-zengin (10, başlık yok ama kaynak cümlesinde sayısal olgu var: İTÜ/ODTÜ/
      YTÜ/Kadir Has/Işık/Kocaeli/Marmara/Bahçeşehir/Okan/Yeditepe), B-boş (2,
      gerçek "veri bekleniyor": Maltepe/Beykent), C (3, bölüm ayrımı hiç yok,
      SINAV YAPISI tamamen gizli: Koç/Acıbadem/Süleyman Şah).
      **Kullanıcı kararları:** (1) hero lead = kaydın `meta_description`'ı,
      3 adımlı şerit = giriş paragrafları (P1/P2/P3), hiçbir paragraf iki
      slotta tekrar etmiyor; (2) SINAV YAPISI yalnız kaynağın açıkça bölüm
      SAYDIĞI sayfalarda kart üretiyor; (3) 21 üniversite kök URL 301'i bu
      fazda eklendi. **"NEDEN DDM" ve "SSS" bölümleri kasıtlı olarak koda
      GİRMEDİ** — kaynak proficiency kayıtlarının hiçbirinde karşılığı yok,
      tasarımın kendi kart metinleri giriş paragraflarını tekrar ediyor ya da
      yeniden yazıyordu (§5 ihlali).
      **HTML referansının 3 kusuru düzeltilerek taşındı:** `syncToc()` yazılmış
      ama hiç çağrılmıyordu → gerçek scroll-spy kuruldu; `state.w` sabit
      kaldığı için sticky/ızgara kararları JS'te donmuştu → gerçek CSS media
      query (eşik 1000px); `hasDetails===false` iken iletişim formu da
      kayboluyordu → artık her zaman render ediliyor.
      **SEO düzeltmeleri:** 21 kaydın 17'sinde `h1` yok → kaydın İLK başlığına
      düşüldü (title'a değil — title SEO alanı, sayfa başlığı çoğu kayıtta
      ondan farklı), her düşüş `console.warn` ile loglanıyor; Okan'ın kaynakta
      birebir aynı iki başlığı (`h1`+`h2`) `SectionResolver`'ın occurrence
      birleştirmesiyle kendiliğinden tek noktaya toplandı.
      `npx tsc --noEmit` / `npm run lint` / `npm run build` temiz — build'de
      21 üniversitenin `SectionResolver.assertCoverage()` kontrolü de dahil
      (kaynağın HER satırı ya tüketildi ya gerekçeli `ignored[]`'da). Üretimde
      21/21 sayfa 200, 42/42 redirect 308 doğrulandı (`npm run start` + curl).
- [x] **6.6 · Şube Kurs Tarihi** (84 sayfa: 72 temiz URL + 12 Joomla 301)
      Sayı düzeltmesi: 88 değil 84; şube 4 (Ümraniye'nin bu tipte sayfası yok),
      kurs 18, matris 72/72 dolu. Bileşenler: ProgramCard · WeekGrid ·
      BranchInfoPanel (kodda duruyor, sayfada kullanılmıyor) · CourseDatePage;
      PageHero'ya `mode:"sube"`. Veri: `data/courseDates.ts` (72 kayıt, üretim
      betiğiyle çıkarıldı) + `lib/courseDateContent.ts` (`rawLines` round-trip
      + `assertCoverage`). Route: 2 yeni `[kurs]/[sayfa]` + `proficiency-kursu/[sayfa]`
      dağıtıcısı (21 üniversite sayfası etkilenmedi). Kullanıcı kararları:
      SSS yok; fiyat/ücret ve fiyat CTA'sı yok (CLAUDE.md §5'ten onaylı sapma —
      kaynaktaki ~170 ücret satırı yayınlanmıyor); "Şube Bilgileri", "Diğer
      Şubeler", "Bu Şubedeki Diğer Kurslar" bölümleri ve WhatsApp butonu yok;
      tüm butonlar "Bilgi Al" → şubenin `/ddm-iletisim/...` sayfası. 12 Joomla
      URL'i `next.config.ts`'te 308 (query string hedefe taşınıyor; canonical temiz).
      Doğrulama: tsc/lint/build temiz, 72/72 sayfa 200 + tek H1, 21/21 üniversite
      200, 12/12 redirect 308. Bilinen: Türkçe kayıtlarında başlangıç tarihi
      kaynakta 2022 (bayat, birebir basılıyor).
- [ ] **6.7 · Temizlik** *(artık P8 ile birlikte, tüm tipler bittikten sonra)*
      Ölü `data-reveal`/`data-count` atılır · metadata + canonical (§6) ·
      `next/image` · (opsiyonel) IntersectionObserver ile reveal

### Faz 6.8+ — Kalan sayfa tipleri (öncelik sırası)

> **Durum (2026-09-21):** 4 ana şablon bitti — Ana Sayfa (1) · Dil Kursu (10) ·
> Üniversite Proficiency (21 + 42 redirect) · Şube Kurs Tarihi (72 + 12 redirect)
> = **106 statik sayfa, build temiz**. Kalan ≈ 280 URL.
> **Ayrıntılı plan, gerekçe, kabul kriterleri ve açık kararlar:
> [`docs/remaining-pages-plan.md`](docs/remaining-pages-plan.md).**
>
> Sıra ölçütü: ölü link/CTA → SEO değeri → bileşen yeniden kullanımı → adet/efor.

- [ ] **6.8 · P1 Şube İletişim** (~13 kayıt → `/ddm-iletisim/*` + hub; 72 kurs-tarihi CTA'sının hedefi)
- [ ] **6.9 · P2 Sınav Hazırlık Kursu Ana** (~16; TOEFL/IELTS/GRE/GMAT/SAT/TOEIC/PTE…)
- [ ] **6.10 · P3 Kategori Hub'ları** (6–7; `/yabanci-dil`, `/ingilizce-kurslari`, `/yurtdisi-egitim`, `/diger-program`…)
- [ ] **6.11 · P4 Zengin İçerik Alt Sayfa** (~85–108; nedir/özel ders/online/yurtdışı/diğer program — en büyük kalan grup)
- [ ] **6.12 · P5 İngilizce Seviye Kursu** (11)
- [ ] **6.13 · P6 Şube Tanıtım** (4; galeri görselleri eksik)
- [ ] **6.14 · P7 Öğrenci Yorumu + Duyuru** (~75; karar #2 bekliyor)
- [ ] **6.15 · P8 Faz 8/9 + Temizlik** (genel `.html` 301, sitemap/robots, QA — aşağıdaki Faz 8–9)

**Açık kararlar (kullanıcıdan):** yeni şablonların tasarım kaynağı (Claude Design turu
mu, mevcut atomlarla kod mu) · yorum/duyuru tekil sayfa mı 301 mi · iletişim/ön kayıt formu
gönderim yöntemi · şube galeri görselleri ve eksik adres/telefon verisi. Detay: plan §5.

**Bağımlılık notu:** paylaşılan bileşenler ilk ihtiyaç duyulan aşamada doğar,
sonrakiler yeniden kullanır. Bu sırayla: Carousel + TestimonialCard 6.3'te,
ScheduleTable + Accordion + PageHero + Breadcrumb 6.4'te, ProgressTrack 6.4'te
doğup 6.5'te tekrar kullanılıyor. 6.3 en uzun aşama — Ana Sayfa tek sayfa ama
en çok kendine özel bileşeni içeriyor.

**Şablon önizleme şeritleri koda GİRMEYECEK:** `ŞABLON ÖNİZLEME` kontrol çubuğu
(dil/üniversite/şube seçici, uzun-kısa içerik toggle'ı, ücret göster-gizle) ve
`ŞABLON DOKÜMANTASYONU` galerileri. Ama altlarındaki davranış üretim mantığıdır:
ücret verisi yoksa "Güncel ücret için bilgi alın" gösterilir — bu bir toggle
değil, verinin varlığından türer.

### Prompt — Şablonu bileşene çevir
```
Handoff'tan gelen [sayfa tipi] tasarımını bir Next.js (App Router) bileşenine çevir.
(frontend-design skill'ini kullan.)

- İçeriği /data/[tip].json'dan alsın (props/veri ile).
- Değişken alanları şablon dışına çıkar (Faz 5'te belirlediğimiz alanlar).
- metadata (title, description, canonical, H1) json'dan gelsin.
- İç linkler <Link> ve kök-göreli olsun.
Önce sadece 1 örnek sayfa çalışsın; onaylayınca çoğaltacağız.
```

---

## Faz 7 — Sayfaları Tip Tip Üretme

**Amaç:** 300 sayfayı elle değil, şablon + veriden toplu üretmek.
**Çıktı:** Tüm sayfalar temiz URL'de yayına hazır

- [x] En kalabalık tip önce (şube kurs tarihi + üniversite proficiency ≈ sayfaların yarısı) — 6.5 + 6.6 ile yapıldı
- [ ] Her tip sırayla üretildi ve gözden geçirildi *(4/17 tip tamam; sıra: Faz 6.8+ bölümü ve `docs/remaining-pages-plan.md`)*
- [ ] Tüm URL'ler eski slug ile eşleşiyor (uzantısız)
- [ ] Her sayfada metadata + H1 doğru taşındı

### Prompt — Bir tipi toplu üret
```
[sayfa tipi] bileşenini kullanarak site_content.json'daki tüm [tip] sayfalarını üret.
(frontend-design skill'ini kullan.)

Her sayfa için:
- URL'yi eski path ile eşle ama .html OLMADAN
  (ör. /yabanci-dil-egitimleri/ingilizce-kursu)
- title / meta description / canonical / H1'i o sayfanın verisinden al
- gövde metnini BİREBİR koru, yeniden yazma
Önce 2-3 örnek üret, doğruluğunu kontrol edeyim, sonra kalanını toplu üret.
```

---

## Faz 8 — 301 Redirect Haritası + SEO Taşıma

**Amaç:** `.html` → temiz URL geçişinde SEO değerini korumak. **Bu fazın atlanması = trafik kaybı.**
**Çıktı:** Çalışan 301'ler, taşınmış metadata, güncel sitemap

- [ ] `next.config.js` içinde `.html` → temiz URL 301 kuralı eklendi
- [ ] `urls.csv`'deki tüm eski URL'ler yeni URL'e eşleşiyor (istisnalar kontrol edildi)
- [ ] title/meta/canonical/H1 taşındı ve doğrulandı
- [ ] `sitemap.xml` (yeni temiz URL'lerle) üretildi
- [ ] `robots.txt` doğru
- [ ] Search Console'a yeni sitemap gönderildi

### En elegan yol — tek kural (doğrula)
```js
// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/:path*.html',   // tüm .html'ler
        destination: '/:path*',    // uzantısız haline
        permanent: true,           // 301
      },
    ];
  },
};
```
> Bu tek kural slug'lar aynı kaldığı için çoğu URL'i kapsar. **Ama mutlaka test et**
> ve slug'ı değişen/istisna URL'ler için `urls.csv`'den açık bir eşleme listesi
> (old → new) tut. İstersen `urls.csv`'den otomatik redirect listesi üreten küçük
> bir script yazılabilir.

### Prompt — Redirect + metadata taşıma
```
Ekteki urls.csv'yi kullan. (file-reading skill'ini kullan.)
1. Her eski .html URL'i için yeni temiz URL'i hesapla (aynı path, .html'siz).
2. next.config.js için 301 redirect yapısını üret; genel kural + istisnalar ayrı.
3. Her sayfanın title/meta/canonical/H1 değerlerini yeni sayfalara eşleyen bir
   kontrol listesi çıkar (eksik/boş olanları işaretle).
Türkçe açıklama ekle.
```

---

## Faz 9 — Yayın Öncesi QA + Yayın + İzleme

**Amaç:** Güvenli yayın ve erken hata yakalama.
**Çıktı:** Canlı site + izleme

- [ ] Staging'de `noindex` / robots disallow **kaldırıldığı** doğrulandı (en sık ölümcül hata)
- [ ] Core Web Vitals eski siteden kötü değil (görsel boyutları, lazy-load)
- [ ] Yeni site crawl edildi; eski/yeni `urls.csv` diff'i yapıldı (kaybolan URL yok)
- [ ] 301'ler canlıda çalışıyor (birkaç eski `.html` linki elle test edildi)
- [ ] Analytics + Search Console kodları yeni sitede
- [ ] Yayın sonrası 2-4 hafta Search Console (Sayfalar + Performans) takibi

### Prompt — Yayın öncesi denetim
```
Yeni siteyi (staging URL) denetlemek için bir kontrol yap:
- noindex/robots durumunu kontrol et
- birkaç eski .html URL'inin 301 ile doğru yeni URL'e gittiğini doğrula
- title/meta/canonical/H1 örnek sayfalarda dolu mu bak
- eski urls.csv ile yeni site URL listesini karşılaştır, eksikleri raporla
Bulguları madde madde ver.
```

---

## Faz Bağımlılık Sırası (özet)

```
Faz 0 (crawl)
   └─> Faz 1 (sayfa tipleri)   ← tüm proje buna bağlı
          ├─> Faz 2 (brand-context.md)
          ├─> Faz 3 (stack + CLAUDE.md)
          └─> Faz 4 (design system)
                 └─> Faz 5 (şablon tasarımı, gerçek içerik)
                        └─> Faz 6 (handoff + içerik modeli)
                               └─> Faz 7 (sayfaları üret)
                                      └─> Faz 8 (301 + SEO)
                                             └─> Faz 9 (QA + yayın)
```

## En kritik 4 nokta (unutulursa iş bozulur)
1. **Sayfa tipleri Faz 1'de** — tasarımdan önce.
2. **İçeriği Claude Design'a uydurtma** — gerçek metni sen ver.
3. **Her tip ayrı şablon** — "ana sayfaya bakarak yap" deme.
4. **`.html` → temiz URL için 301 şart** — Faz 8 atlanamaz.
