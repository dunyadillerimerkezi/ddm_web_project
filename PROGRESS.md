# Dünya Dilleri Merkezi — Web Sitesi Yenileme (Progress & Çalışma Dökümanı)

> **Nerede kaldık → [`docs/SESSION-HANDOFF.md`](docs/SESSION-HANDOFF.md) §A** (her chat önce onu okur, sonunda günceller).
> Kalan işlerin ayrıntılı planı → [`docs/remaining-pages-plan.md`](docs/remaining-pages-plan.md).
>
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
      **PM (2026-09-23) ile yenilendi:** `lib/nav.ts` canlı menünün tamamına
      çıktı (6 sekme, 201 hedef); üretilmemiş hedefler `soon: true` ile soluk
      düz metin (`lib/navTree.ts` süzer, `lib/navAudit.ts` build'de doğrular).
      Mega menü kalabalık sekmelerde iki bölmeli, mobil çekmece 3 katlı
      akordeon (kendi kaydırması + gövde kilidi + odak tuzağı). Bkz.
      `ddm-web/CLAUDE.md` §10 ve `docs/remaining-pages-plan.md` §5 PM.
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
      200, 12/12 redirect 308. **Sonradan bulunan açık (2026-09-21):** kaynakta 4
      Ataşehir Joomla URL'i daha vardı (`id=306/322/318/298:atasehir-kurs-tarihleri`,
      proficiency/gmat/sat/toeic) — P0'da eklendi (`7b68a73`), toplam 16/16. Bilinen: Türkçe kayıtlarında başlangıç tarihi
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

- [x] **6.7a · P0 Borç + altyapı** — tamam: madde 1–3 (`7b68a73`) + madde 4–5 (`4869cb6`): `lib/pageRegistry.ts`, `app/sitemap.ts`, `app/robots.ts` (`DDM_DISALLOW_INDEXING` anahtarı), `app/not-found.tsx`.
- [x] **6.8 · P1 Şube İletişim** — hub (`/ddm-iletisim`) + 5 şube sayfası (72 kurs-tarihi "Bilgi Al" CTA'sının hedefi artık canlı). `lib/branchContent.ts`, `components/sections/BranchHero.tsx`, `components/cards/BranchTile.tsx`. Aşama 0'da `branches.ts`'teki 3 eksik şube (Bağdat/Etiler/Ataşehir) adres/telefon/e-posta/WhatsApp kaynaktan (`/ddm-iletisim.html` hub kaydı) dolduruldu; Etiler'in yanlış e-postası (`etiler@`→`levent@`) ve Ümraniye title/meta'sındaki "Ataşehir" kopyala-yapıştır hatası düzeltildi. Gerçek bir kod hatası bulundu ve düzeltildi: `telHref()` önceden `branch.wa`'dan türüyordu, yani WhatsApp'ı olmayan ama telefonu olan bir şubede (Etiler) "Ara" butonu hiç çıkmıyordu — artık `branch.phone`'dan türüyor. 6 Joomla iletişim URL'i (`component/content/article/...`) → `next.config.ts`'e 301 eklendi. **Sona bırakılan (kullanıcı kararı):** form/KVKK gövdesi (kaynağın ~1300 kelimesinin ~%95'i) henüz render edilmiyor — form işiyle birlikte eklenecek; İş Başvurusu/Kariyer sayfası kapsam dışı bırakıldı. `lib/pageRegistry.ts` ve `app/sitemap.ts` güncellendi (110/110). `check-links` ölü hedef: 46 → 40.
- [x] **6.9 · P2 Sınav Hazırlık Kursu Ana** (16 sayfa) — `app/sinav-hazirlik-egitimleri/[kurs]/page.tsx` (15) + statik `proficiency-kursu/page.tsx` (1; kardeş statik klasör dinamik segmenti ezdiği için ayrı dosya). Yeni: `data/exams.ts`, `lib/examContent.ts` (blok tabanlı sözleşme + `assertCoverage`), `components/sections/{ExamCoursePage,BranchDateRows,FactCards,ProseSection}.tsx`. Genişletilenler: `BranchHero` (illüstrasyon + kod rozeti), `ExamStructure` (zemin seçimi), `ExamSectionCard` (boş parça başlığı basılmıyor). **İçerik kuralı değişti (kullanıcı kararı 2026-09-22/23):** kaynak başlıkları silinmez, gövde metni konudan sapmadan SEO için geliştirilebilir — her düzenleme `data/exams.ts`'te `edits` (orijinal → yeni satır) ve `additions` olarak izlenebilir durur; kaynakta karşılığı olmayan bir `edits` anahtarı build'i düşürür. Resmi kaynaktan doğrulanıp güncellenen bayat olgular: TOEFL 1–6 puan ölçeği (Ocak 2026) ve bölüm süreleri, GMAT Focus Edition, dijital SAT, kısaltılmış GRE, YDS/YÖKDİL takvimi + ücreti, PTE'nin "kâğıt üzerinde" çelişkisi, SAT hesap makinesi çelişkisi. "Kurs Programı" (`-kursu-2`) sayfaları yayınlanmıyor; kayda değer program seçenekleri ana sayfalara taşındı. `check-links` ölü hedef: 40 → 28. **126 statik sayfa.**
- [x] **6.10 · P3 Kategori Hub'ları** (7 sayfa) — `/sinav-hazirlik-egitimleri` (pilot), `/yabanci-dil`, `/diger-program/ozel-dersler`, `/diger-program`, `/ingilizce-kurslari`, `/yurtdisi-egitim` ("içerikli hub"), `/kurumsal-dil-egitim`. Her biri ayrı statik klasör. Tasarım referanssızdı → önce 3 görsel yön taslağı, kullanıcı "C (editoryal) + B'nin karşılaştırma tablosu"nu seçti; 7 sayfaya sistem olarak uygulandı, her birine ayrı karakter (sınav: amaç rehberi · yabancı dil: selam duvarı + dil kartları · özel ders: süreç + iki kolon · diğer: program dizini + kart ızgarası · İngilizce: A1→C2 seviye rayı · yurtdışı: partner okullar + ülke tablosu · kurumsal: lacivert B2B hero + süreç). Yeni: `data/hubs.ts`, `lib/hubContent.ts` (`assertCoverage` + edits/headingEdits denetimi + title≤60/description≤155 build kontrolü), `lib/hubLinks.ts`, `components/sections/{HubHero,HubGuide,HubToc,ComparisonTable,HubAbout,HubCards,HubLanguages,HubBlocks,RelatedLinks}.tsx`, `components/ui/Reveal.tsx`. P2'deki "başlık silinmez, gövde SEO için geliştirilebilir" kuralı hub'lara da uygulandı (kullanıcı onayı). Geçerlilik süreleri resmi kaynaktan doğrulandı. `PageKind` → `hub`. `check-links`: 28/957 → **22/742**. **133 statik sayfa.**
- [x] **6.11 · P4 Zengin İçerik Alt Sayfa** — tamam (2026-09-26): özel ders 18, online 8 + çatı, nedir 8, tekil 8, yurtdışı 9, diğer program / kurumsal 4; kopya / içeriksiz sayfalar 301
  - [x] **Özel ders (18)** — 9 dil + 9 sınav (2026-09-25). Tasarım "B · seviye merdiveni"; sınavlarda format kartları. `data/privateLessons*.ts`, `lib/richContent.ts`, `RichContentPage` + `LevelStairs`/`FormatCards`/`RichAbout`/`RichFaq`/`RichHero`. 21 Joomla + YDS Kurs Dönemi 301. **155 statik sayfa**, check-links 19/809.
  - [x] **Nedir (8)** — TOEFL, IELTS, TOEIC, YDS, Proficiency, GRE, SAT, GMAT (2026-09-26). Ayrı "rehber" tasarımı: açık hero + kısa cevap + "bir bakışta" kartı, yapışkan soru listesi, soru → kalın cevap → madde/tablo. Eskimiş genel bilgiler resmi kaynaklardan düzeltildi (P2 kuralı, `edits`). `data/examGuides.ts`, `lib/guideContent.ts`, `GuidePage`. 4 Joomla 301. **172 statik sayfa**, check-links 17/705.
  - [x] **Online (8 + çatı)** — 8 dil + `/diger-program/online-dil-egitimi` (2026-09-25). Baskın bölüm "nasıl işler" 4 adım (firma cümleleri) + derse hazırlık paneli; "sınav evden mi" kartları (resmi kaynaklı). `data/onlineLessons.ts`, `lib/onlineContent.ts`, `lib/richPages.ts` (tüm alt türler tek liste), `OnlineSteps`/`ExamModes`/`OnlineCatalog`/`CallCard`. 3 kopya meta description düzeltildi. **164 statik sayfa**, check-links 18/694.
  - [x] **Tekil (8)** — Hızlandırılmış Almanca, Almanca Konuşma, Almanca Eğitim Seviyeleri (Joomla `?id=67` → yeni temiz adres), Türkçe Eğitim Seviyeleri, İngilizce Eğitim Sistemi, Çince Öğrenmek Zor mu?, A1 Aile Birleşimi Sınav Örneği, Proficiency Örnek Sınav Soruları (2026-09-26). Tasarım "A · program panosu": açık hero + sağda sayfanın asıl bilgisi (haftalık takvim / kur basamakları / ders akışı / sınav kâğıdı / dosya rafı / kolay-zor), gövdede soru | içerik satırları, gri bantta şube kartları. `proficiency-sinavi` yayınlanmadı (Proficiency Kursu'ndaki üniversite listesinin kopyası → 301); `/ingilizce-kurslari/ingilizce-egitim-sistemi` → 301 kanonik. 22 örnek sınav dosyası eski siteden indirilip aynı yollarla `public/`e kondu. Çince Kursu sayfasındaki "iki milyar" / "en çok talep edilen" yanlışları düzeltildi. `data/singlePages.ts`, `lib/singleContent.ts`, `SinglePage`/`SingleBoards`/`WeekBoard`/`SingleBlocks`/`GuideBlock`/`SourcesFooter`. 6 Joomla + 2 temiz URL 301. **180 statik sayfa**, check-links 12/712.
  - [x] **Yurtdışı (9) + Diğer program / kurumsal (4)** (2026-09-26) — Work and Travel, Yetişkinler için İngilizce, Kanada Vancouver, İngiltere (yanlış adres `…/kanada-vancouver-2` → yeni `…/ingiltere`), Yüksek Öğrenim, Yurtdışı Sınav Hazırlık, Yaz Okulları, Pathway, İtalya'da Üniversite; Business English, Çocuklar İçin İngilizce, Tercüme Hizmetleri (yalnız DDM metni; iş ortağı Lavanda'nın İngilizce tanıtımı gösterilmiyor), Pegasus pilotları (İngilizce, `lang="en"`). Tasarım **"A · biniş kartı"** (yurtdışı: hero'da İstanbul → gidilecek yer kartı); diğer programlar tekil panoları (modül etiketleri, haftalık takvim, dil etiketleri, grup/özel ders karşılaştırması). Kullanıcı: "düz yazı değil, kart / tablo" → yeni bloklar `facets` (kaynak metinden kartlar + metnin kendisi açılır "Ayrıntılı bilgi"de, kart ifadesi kaynakta aranır) ve `topics`. Genel bilgi resmi kaynaktan düzeltildi (Work and Travel J-1 kuralları ve asgari ücret, Vancouver iklim/işgücü/Compass Card, English UK 2025, İngiltere vizesi, İtalya başvuru/harç, BEC'in kalkması, MEB ders saatleri); Kaplan rakamları kullanıcı kararıyla kaynaktaki gibi. `data/abroadPages.ts`, `data/otherPrograms.ts`, `app/yurtdisi-egitim/[...sayfa]`, `app/diger-program/[sayfa]`, `app/kurumsal-dil-egitim/[sayfa]`. 301: Yurtdışı Dil Eğitimi + Tercih Edilen Ülkeler → Yurtdışı Eğitim ana sayfası, `diger-program/yurtdisinda-egitim` → Work and Travel, 18 "-2" (Kurs Programı) sayfası → kendi kurs sayfası (menüdeki 18 "… Programı" kalemi kaldırıldı). **193 statik sayfa**, check-links **3/191** (yalnız P7 hedefleri).
- [x] **6.12 · P5 İngilizce Kursları** (9 sayfa; 2026-09-27/28) — seviye 5 (Elementary A1 → Advanced C1) + hedef kitle 4 (İlköğretim, Üniversite Hazırlık, YKS Dil, Yaz Okulu). İngilizce Konuşma Kursu Dil Kursu'nun konuşma sayfasına 301 (içerik aynı, saatler çelişkili); İngilizce Eğitim Sistemi P4'te (301). Tasarım: seviye "B · seviye kartı" (açık hero + B1 kartı + yapışkan merdiven + renkli A2·B1·B2 karşılaştırması), hedef kitle ayrı aile (lacivert fotoğraflı hero + program şeridi + baskın panel: kartlar / adımlar / soru dağılımı / rakamlar). Genel bilgi resmi kaynaklı (CEFR, IELTS, Cambridge, ÖSYM YDT, YÖK hazırlık, MEB). `data/englishLevels.ts`, `data/englishPrograms.ts`, `lib/englishLevelContent.ts`, `lib/englishProgramContent.ts`, `EnglishLevelPage`, `EnglishProgramPage`, `PageKind` `english-level`. **202 statik sayfa**, check-links 3/200. Commit'i kullanıcı yapacak.
- [~] **6.13 · P6 Şube Tanıtım** — 4/5 (2026-09-28: Kadıköy, Bağdat Caddesi, Levent / Etiler, Ataşehir; Ümraniye kullanıcı bilgisi bekliyor)
- [~] **6.14 · P7 Öğrenci Yorumu + Duyuru** — yorumlar ✅ (2026-09-29): tek sayfa `/ogrenci-yorumlari` ("C · portre duvarı"; 43 yorumdan 25'i yayında, 18'i `published: false`; 19'u fotoğraflı, program süzgeci, tam metin açılır pencerede), Ana Sayfa kaydırıcısı aynı veriden (6 yorum), 51 tekil adres + `.html` / `?start=` → 301 (yayındakiler kartına `#yorum-{id}`). **207 statik sayfa**, check-links **2** (`/duyurular`, `/aktivite-aktiviteler`). Duyurular ⏳ (ayrı oturum).
- [ ] **6.15 · P8 Faz 8 SEO taşıma + 6.7 Temizlik** (genel `.html` 301, 384 URL taraması, metadata denetimi)
- [ ] **6.16 · P9 Kesişen işler + Faz 9 QA** (JSON-LD, OG, analytics, a11y, CWV)

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
- [ ] Her tip sırayla üretildi ve gözden geçirildi *(5/17 tip tamam; sıra: Faz 6.8+ bölümü ve `docs/remaining-pages-plan.md`)*
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
