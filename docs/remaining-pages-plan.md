# Kalan Sayfa Tipleri — Öncelik Sırası ve Uygulama Planı

> Faz 6.7a+ / Faz 7'nin devamı. **Her oturum önce [`SESSION-HANDOFF.md`](SESSION-HANDOFF.md) §A'yı okur.**
> Kaynaklar: [`page-types.md`](page-types.md) (tip haritası), [`../PROGRESS.md`](../PROGRESS.md) (faz
> durumu), [`../ddm-web/CLAUDE.md`](../ddm-web/CLAUDE.md) (kurallar sözleşmesi).
> Adetler `data/site_content.json`'dan (384 kayıt) betikle çıkarıldı (2026-09-21). Yine de
> **her tip kendi "Aşama 0 denetimi"yle kesinleştirilir.** Faz 6.5'te keyword taraması
> gerçek katmanlamayı yanlış vermişti.

**İçindekiler:**
- §1 Durum
- §2 Önceliklendirme
- §3 Route mimarisi
- §4 Joomla query URL envanteri
- §5 P0–P9
- §6 Skill matrisi + "Yapma" listesi
- §7 Açık kararlar
- §8 Ortak Definition of Done

---

## 1. Şu an nerede duruyoruz

`npm run build` temiz, **106 statik sayfa** üretiliyor.

| Tip | Sayfa | Redirect | Faz | Route |
|---|---|---|---|---|
| Ana Sayfa | 1 | — | 6.3 | `app/page.tsx` |
| Dil Kursu Ana | 10 | — | 6.4 | `app/yabanci-dil-egitimleri/[kurs]/page.tsx` |
| Üniversite Proficiency | 21 | 42 (21 kök × `.html`/`.html`siz) | 6.5 | `app/sinav-hazirlik-egitimleri/proficiency-kursu/[sayfa]/page.tsx` |
| Şube Kurs Tarihi | 72 | 16 Joomla (12 in 6.6 + 4 in P0) | 6.6 | iki `[kurs]/[sayfa]` + proficiency dağıtıcısı |

**Paylaşılan altyapı (yeniden kullan, kopyalama):**
- Bileşenler: `PageHero` (modlar dil / uni / sube), `Breadcrumb`, `StickyToc`, `ScheduleTable`,
  `WeekGrid`, `Accordion`, `ProgressTrack`, `LevelExplorer`, `LinkRow`, `PricingPanel`, `CtaBand`,
  `ContactFormCard`, `BranchInfoPanel` (kodda var, kullanılmıyor), `UniversityGrid`, `LanguageGrid`,
  `TestimonialsCarousel`, `DetailSections`, `ProcessSteps`, `ExamStructure`, `BulletPanel`,
  `AboutCertification`, `PageSection`.
- Veri: `data/branches.ts`, `languages.ts`, `universities.ts`, `courseDates.ts`, `home.ts`.
- İçerik çözücüler: `lib/contentSections.ts` → `SectionResolver` + `assertCoverage` ("kaynağın
  her satırı ya tüketildi ya gerekçeli `ignored[]`'da" garantisi); `lib/languageContent.ts`,
  `universityContent.ts`, `courseDateContent.ts`.
- Veri çekme betiği: `scripts/pull-ddmcadde.mjs` (ddmcadde.com'dan gövde metni tazeleme, 6.4).

**Bugün ölü olan iç linkler (P0'daki `check-links` bunları sayacak):**
- 72 kurs-tarihi sayfasının "Bilgi Al" butonları → `/ddm-iletisim/*`
- sınav sayfalarına giden linkler → `/sinav-hazirlik-egitimleri/{sinav}-kursu`
- mega menüdeki hub'lar, nedir, özel ders, online sayfaları
- `/ogrenci-yorumlari`, `/duyurular`, `/aktivite-aktiviteler`

---

## 2. Önceliklendirme ölçütü

1. **Ölü link / bozuk CTA** üretiyor mu? (dönüşüm ve UX)
2. **SEO değeri:** eski sitede sıralaması olan, arama hacmi yüksek sayfalar
3. **Yeniden kullanım oranı:** hazır bileşen varsa efor düşük
4. **Adet / efor:** tek şablonla çok sayfa üretmek en yüksek getiriyi verir

| # | Tip | Temiz sayfa | + Redirect | Efor | Bağımlılık |
|---|---|---|---|---|---|
| **P0** | Borç + altyapı | — | 4 | S | — |
| **P1** | Şube İletişim | 6 + hub | 6 | M | ✅ tamam (form hariç) |
| **P2** | Sınav Hazırlık Kursu Ana | 16 | — (Faz 8 genel kural) | M | P1 (CTA), §3 |
| **PM** | Menü / gezinme düzeltmesi (`lib/nav.ts`) | — | — | S | ✅ tamam (2026-09-23) |
| **P3** | Kategori Hub'ları | 6–7 | — | S | P2 / P4 ile birlikte |
| **P4** | Zengin İçerik Alt Sayfa | ~78 | 29 (`has: query`) | L | §3 route işi, karar #1 |
| **P5** | İngilizce Seviye Kursu | 11 | — | S–M | Dil Kursu şablonu |
| **P6** | Şube Tanıtım | 4 | — | M | P1, karar #5 |
| **P7** | Öğrenci Yorumu + Duyuru | 51 + 12 + 2 liste | 10 (`?start=`) | M | Karar #2 |
| **P8** | Faz 8 SEO taşıma + 6.7 Temizlik | — | genel kural | L | Hepsi |
| **P9** | Kesişen işler (JSON-LD, OG, analytics, a11y, CWV) + Faz 9 QA | — | — | M | Karar #6 |

---

## 3. Route mimarisi — ÖNEMLİ (P2 ve P4'ten önce oku)

**Next.js kuralı:** statik segment dinamiği ezer. Mevcut ağaç:

```
app/
├── page.tsx                                       # Ana Sayfa
├── yabanci-dil-egitimleri/[kurs]/page.tsx         # Dil Kursu Ana (10)
├── yabanci-dil-egitimleri/[kurs]/[sayfa]/page.tsx # ŞU AN yalnız kurs-tarihi
├── sinav-hazirlik-egitimleri/[kurs]/[sayfa]/      # ŞU AN yalnız kurs-tarihi
└── sinav-hazirlik-egitimleri/proficiency-kursu/[sayfa]/  # üniversite + proficiency kurs-tarihi DAĞITICI
```

**Sonuçlar:**
1. **P2:** `/sinav-hazirlik-egitimleri/{sinav}-kursu` için `sinav-hazirlik-egitimleri/[kurs]/page.tsx`
   eklenir. Ama `proficiency-kursu` statik klasör olduğu için `/proficiency-kursu` ana sayfası
   ona düşmez. **Ayrı bir `proficiency-kursu/page.tsx` gerekir.** Bu dosya aynı bileşeni
   `slug="proficiency-kursu"` ile çağırır.
2. **P4:** alt sayfalar (`-nedir`, `-ozel-ders`, `online-*`, `-2`, …) aynı `[kurs]/[sayfa]`
   segmentine düşer. Mevcut iki `[sayfa]` route'u ile proficiency dağıtıcısı, **tür bazlı
   dağıtıcıya** genişletilir: slug kurs-tarihi ise `CourseDatePage`, zengin içerik ise
   `RichContentPage`. Proficiency tarafında 5 alt sayfa var: `proficiency-kursu-2`,
   `-ozel-ders`, `-nedir`, `-ornek-sinav-sorulari`, `-sinavi`.
3. **Önerilen `lib/pageRegistry.ts`** (karar #7): tüm üretilen sayfaların tek listesi, her
   biri `{ href, kind, sourceUrl, ... }`. Şunlar hep bu listeden beslenir:
   - her route'un `generateStaticParams`'ı
   - dağıtıcıların `kind` kararı
   - `app/sitemap.ts`
   - `scripts/check-links.mjs`

   Böylece "sayfa var ama sitemap'te yok" ya da "link var ama sayfa yok" durumları
   yapısal olarak önlenir.
4. Her route'ta `export const dynamicParams = false` kalır.
5. Kökte yaşayan tipler (şube tanıtım `/kadikoy-tanitim-sayfasi`, hub'lar `/yabanci-dil` vb.)
   **tek tek statik klasör** olarak açılır, kökte `[slug]` catch-all KULLANILMAZ. Kök
   catch-all, üniversite kök 301'leriyle ve gelecekteki genel `.html` kuralıyla çakışır.

---

## 4. Joomla `?view=article` / query URL envanteri (61)

Kaynakta query-string'li 61 URL var. Genel `.html → temiz` kuralı (Faz 8) query'ye bakmaz,
bu yüzden **hepsi açık `has: query` kuralı ister** (6.6'daki `JOOMLA_COURSE_DATES` deseni).

| Grup | Adet | Örnek | Hedef | Sahip | Durum |
|---|---|---|---|---|---|
| Kurs tarihi (Kadıköy/Bağdat/Levent) | 12 | `gmat-kursu.html?view=article&id=319:kadikoy-merkez-kurs-tarihi` | `.../{kurs}/{sube}-...-kurs-tarihi` | 6.6 | ✅ |
| Kurs tarihi **Ataşehir** | **4** | `proficiency\|gmat\|sat\|toeic-kursu.html?...id=306\|322\|318\|298:atasehir-kurs-tarihleri` | `.../atasehir-subesi-{kurs}-kurs-tarihi` | P0 | ✅ `7b68a73` |
| Özel ders (`diger-program/ozel-dersler.html?id=368..383`) | 16 | `...id=370:fransizca-ozel-ders&catid=48` | `/{kategori}/{kurs}/{kurs}-ozel-ders` | P4 | ⏳ |
| Özel ders (kurs sayfası üstünden) | 5 | `almanca-kursu.html?...id=369:almanca-ozel-ders`, `gmat/sat/toeic/proficiency-kursu.html?...ozel-ders` | aynı özel ders sayfası | P4 | ⏳ |
| Nedir / sınav / örnek soru | 6 | `gmat-kursu.html?...id=165:gmat-nedir`, `proficiency-kursu.html?...id=364:proficiency-sinavi`, `...id=323:proficiency-sinav-sorulari`, `...id=136:proficiency-nedir`, `sat-nedir`, `toeic-nedir` | ilgili P4 alt sayfası (`364:proficiency-sinavi` → Proficiency Kursu `#universiteler`) | P4 | ✅ 2026-09-26 |
| Almanca seviyeleri | 2 | `almanca-konusma-kurslari.html?...id=67:almanca-egitim-seviyeleri`, `hizlandirilmis-almanca-kursu.html?...id=67` | yeni `/yabanci-dil-egitimleri/almanca-kursu/almanca-egitim-seviyeleri` | P4 | ✅ 2026-09-26 |
| İletişim (`component/content/article/...`) | 6 | `337-iletisim-sayfasi-kadikoy.html?Itemid=401`, `65-levent-subesi-on-kayit-formu` (×2, URL-encoded varyant) | `/ddm-iletisim/{sube}` | P1 | ⏳ |
| Öğrenci yorumları sayfalama | 10 | `ogrenci-yorumlari.html?start=4..40` | `/ogrenci-yorumlari?page=N` ya da `/ogrenci-yorumlari` | P7 | ⏳ |
| **Toplam** | **61** | | | | 16 ✅ · 45 ⏳ |

> Not: `component/content/article/...` URL'lerinde query yalnız `Itemid`/`catid` bilgisi taşıyor.
> Yol kısmı ayırt edici, bu yüzden `has` gerekmeyebilir. Aşama 0'da test et.

---

## 5. Tip tip plan

Her P bölümünün formatı: Kapsam → Aşama 0 → Şablon/yeniden kullanım → Riskler → Redirect →
Kabul → **Başlangıç prompt'u** → **Skill hatırlatmaları**.

### P0 — Borç ve altyapı  🟡 madde 1–3 ✅ (`7b68a73`), madde 4–5 kullanıcı kararı bekliyor (S)
Küçük işler; P1'den önce yapılır çünkü her sonraki fazın kabul kriteri buna dayanıyor.

1. **4 Ataşehir Joomla 301'i:** `ddm-web/next.config.ts` → `JOOMLA_COURSE_DATES`'e ekle:
   - `["proficiency-kursu","306:atasehir-kurs-tarihleri","atasehir-subesi-proficiency-kurs-tarihi"]`
   - `["gmat-kursu","322:atasehir-kurs-tarihleri","atasehir-subesi-gmat-kurs-tarihi"]`
   - `["sat-kursu","318:atasehir-kurs-tarihleri","atasehir-subesi-sat-kurs-tarihi"]`
   - `["toeic-kursu","298:atasehir-kurs-tarihleri","atasehir-subesi-toeic-kurs-tarihi"]`

   Hedef slug'larını `data/courseDates.ts`'ten teyit et. Kaynak içeriğin temiz sayfayla
   aynı olduğunu diff'le.
2. **`ddm-web/scripts/check-links.mjs`:** `.next` build çıktısındaki (ya da
   `npm run start` + tarama) tüm iç `href`'leri topla. Her birini üretilen route'lar ve
   `redirects()` listesiyle karşılaştır. Çıktı: ölü link sayısı + kaynak sayfa → hedef
   listesi. `package.json`'a `"check-links"` script'i ekle. Bugünkü sayıyı SESSION-HANDOFF'a
   **baz çizgi** olarak yaz. Her P bu sayıyı düşürmeli.
3. **Bayat yorum:** `app/yabanci-dil-egitimleri/[kurs]/page.tsx` başındaki "kalan 9 dil için
   onay bekliyor" notunu sil (10 dil üretiliyor).
4. **(Karar #7 evet ise) `lib/pageRegistry.ts` iskeleti:** mevcut 4 tipi kaydet. Route'ların
   `generateStaticParams`'ını ona bağla. Davranış değişmemeli; build'de sayfa sayısı yine 106.
5. **(Opsiyonel) `app/not-found.tsx`** (SiteChrome ile) ve `app/sitemap.ts` + `app/robots.ts`
   iskeleti. Sitemap registry'den üretilir. `robots.ts` staging için `noindex` durumunu
   env'den okur (Faz 9 uyarısı).

- **Kabul:**
  - build'de 106 sayfa
  - 12 + 4 = 16 Joomla redirect → 308 (curl)
  - `npm run check-links` çalışıyor, baz çizgi yazıldı
- **Başlangıç prompt'u:**
  ```
  docs/SESSION-HANDOFF.md §A'yı ve ddm-web/CLAUDE.md'yi oku. docs/remaining-pages-plan.md
  §5 P0'ı uygula (madde 1-3 zorunlu, 4-5 için önce bana sor). Next.js API'si kullanmadan
  önce ddm-web/node_modules/next/dist/docs/ altını oku. Bitince tsc/lint/build +
  check-links çalıştır, 4 Ataşehir redirect'ini npm run start + curl ile doğrula,
  SESSION-HANDOFF'u güncelle, kod ve dökümanı ayrı commit'le.
  ```
- **Skill:** `code-review` (commit öncesi), `run` (redirect doğrulama).

### P1 — Şube İletişim  ✅ tamam (form gövdesi hariç, karar #4 bekliyor)
- **Kapsam (6 temiz + hub):**
  - `/ddm-iletisim` (hub, 119 kelime)
  - `/ddm-iletisim/1-kadikoy`, `/ddm-iletisim/3-levent`, `/ddm-iletisim/4-atasehir`,
    `/ddm-iletisim/iletisim-2-bagdat-caddesi`, `/ddm-iletisim/umraniye` (her biri ~1300 kelime)
  - `/ddm-iletisim/is-basvurusu-kariyer` (1652 kelime, **farklı varyant**: iş başvurusu)
  - 6 Joomla `component/content/article/...` → 301 (§4)
- **Neden ilk:** 72 kurs-tarihi sayfasının, footer'ın, TopBar'ın ve mega menü "İletişim"
  bölümünün hedefi. Dönüşümün kalbi.
- **Aşama 0:**
  1. 6 kaydın `text`'ini satır satır dök. ~1300 kelimenin ne olduğunu bul (5 sayfa aynı
     boyutta, büyük olasılıkla ortak bir blok var: tüm şubeler listesi, form metni).
     Şubeye özel ile ortak blokları ayır.
  2. **Adres, telefon ve çalışma saatlerini kaynaktan çıkar.** `data/branches.ts`'te Bağdat,
     Etiler ve Ataşehir için `null` duruyor. Kaynakta yazıyorsa oradan doldur (uydurma
     değil, taşıma). Yoksa `null` kalır, `DataMissingNotice` gösterilir.
  3. Şube slug eşlemesini doğrula: `3-levent` = Levent–Etiler (`etiler`), `cadde` = Bağdat.
- **Şablon:**
  - `PageHero` (sube modu), `BranchInfoPanel` (hazır), `ContactFormCard`, harita bloğu
  - harita: statik görsel ya da `iframe`. Harici domain CLAUDE.md §4'ün dışında bir
    istisna gerektirir, kullanıcıya sor.
  - hub için 5 şube kartı (`BranchCard` mevcut)
- **Riskler:**
  - form gönderimi (karar #4)
  - harita iframe'i CWV'yi kötüleştirebilir (lazy yükle)
  - Levent ön kayıt formu ayrı bir URL
- **Redirect:** 6 Joomla iletişim URL'i (§4).
- **Kabul:**
  - 7/7 sayfa 200, tek H1, `assertCoverage` geçer
  - 72 kurs-tarihi sayfasının "Bilgi Al" linkleri artık 200 dönüyor (check-links ölü sayısı düşer)
  - 6 redirect → 308
- **Başlangıç prompt'u:**
  ```
  SESSION-HANDOFF §A + CLAUDE.md oku. remaining-pages-plan §5 P1 (Şube İletişim).
  Karar #4 (form gönderimi) verilmediyse ÖNCE bana sor. Aşama 0: 6 /ddm-iletisim kaydını
  site_content.json'dan dök, ortak/şubeye özel blokları ve adres/telefon bilgisini çıkar,
  bana rapor et, kod yazma. Onaydan sonra pilot: 1-kadikoy. frontend-design skill'ini kullan,
  mevcut BranchInfoPanel/ContactFormCard/BranchCard'ı yeniden kullan.
  ```
- **Skill:** `frontend-design:frontend-design`, `schema` (LocalBusiness/EducationalOrganization,
  karar #6 evet ise), `run` (mobil/masaüstü görsel kontrol), `code-review`.

- **Sonuç (2026-09-22):** Hub + 5 şube sayfası üretildi (`app/ddm-iletisim/`,
  `app/ddm-iletisim/[sube]/`), `lib/branchContent.ts`, `components/sections/BranchHero.tsx`,
  `components/cards/BranchTile.tsx`. 6/6 Joomla redirect 308. `check-links` ölü hedef 46 → 40.
  **Plandan sapmalar (kullanıcı onayıyla):**
  - `ContactFormCard`/form/KVKK gövdesi **render edilmedi** — form işi sona bırakıldığı için.
    Aşama 0: sayfaların ~1300 kelimesinin %95'i (form alanları + KVKK metni) 5 şubede
    birebir aynı, gerçek şubeye özel içerik sadece adres/telefon/e-posta/WhatsApp — bunlar
    `branches.ts`'e taşındı, form kısmı boş bırakıldı.
  - `is-basvurusu-kariyer` **kapsam dışı** — şube sayfası değil, ayrı bir iş başvuru formu tipi.
  - Harita **eklenmedi** (görsel/iframe verisi yok, `ImageSlot` zaten `BranchInfoPanel`de var).
  - `PageHero` yerine yeni `BranchHero` yazıldı — `PageHero`nun `stats` (zorunlu) ve kurs-odaklı
    rozet alanları bu tipe uymuyordu, uydurma veri istemedik.
  - `BranchCard` (Ana Sayfa'ya özel, `HomeBranchCard` marka metni ister) yerine yeni,
    daha hafif `BranchTile` yazıldı.
  - Yatay eksik bilgi tamamlandı: Bağdat/Etiler/Ataşehir adres+telefon+e-posta+WhatsApp
    `/ddm-iletisim.html` hub kaydından (temiz, yapılandırılmış liste) çıkarıldı, şubenin
    kendi sayfasıyla çapraz doğrulandı. Etiler'in e-postası (`etiler@`→`levent@`) ve
    Ümraniye'nin title/meta'sındaki "Ataşehir" kopyala-yapıştır hatası düzeltildi.
  - **Kod hatası bulundu ve düzeltildi:** `telHref()` `branch.wa`'dan türüyordu — WhatsApp'ı
    olmayan ama telefonu olan bir şube (Etiler) "Ara" butonunu hiç gösteremiyordu. Artık
    `branch.phone`'dan türüyor (`data/branches.ts`).
  - H1: kayıtların hiçbirinde `headings` yok → CLAUDE.md §6 gereği `title`'a düşüldü
    (`[h1-fallback] branchContent[...]` loglanıyor).

### P2 — Sınav Hazırlık Kursu Ana  ✅ tamam (2026-09-23)
- **Kapsam (16 slug, kesin):**

  | slug | kelime | slug | kelime |
  |---|---|---|---|
  | `proficiency-kursu` ⚠️ statik klasör | 353 | `toeic-kursu` | 796 |
  | `gre-kursu` | 998 | `ielts-kursu` | 819 |
  | `gmat-kursu` | 1649 | `academic-pte` | 354 |
  | `sat-kursu` | 2595 | `aile-birlesimi-egitimi` | 1201 |
  | `yds-kursu` | 1327 | `fransizca-aile-birlesimi-kursu` | 661 |
  | `yokdil-sinavi-kursu` | 175 | `ingiltere-vize-sinavi-ingilizce-a1kursu` | 136 |
  | `toefl-kursu` | 513 | `testdaf-kursu` | 281 |
  | `toefl-essentials-kursu` | 110 | `cocuklar-icin-toefl-primary-egitimi` | 205 |

- **Route:** `app/sinav-hazirlik-egitimleri/[kurs]/page.tsx` (15 slug) +
  `app/sinav-hazirlik-egitimleri/proficiency-kursu/page.tsx` (1). Bkz. §3.
- **Aşama 0:** 16 kaydı bölüm bölüm dök. Hangi sınavda program, ücret, SSS ya da seviye
  bölümü var? Faz 6.5'teki gibi katmanlama tablosu çıkar (A zengin / B orta / C düz metin).
  SAT (2595) ve GMAT (1649) çok uzun; `StickyToc` gerekir mi bak.
- **Şablon:**
  - Dil Kursu şablonunun kardeşi: `lib/examContent.ts` + `data/exams.ts`, `getLanguagePage`
    desenini izle.
  - `PageHero`, `ScheduleTable`, `Accordion`, `LinkRow` (bu sınavın 4 şube kurs-tarihi
    sayfası), `CtaBand`.
  - Proficiency ana sayfası ayrıca `UniversityGrid`'i içerir (21 üniversiteye link).
- **Riskler:**
  - Heterojen yapı: tasarım yok (karar #1). Dil Kursu tasarımına en yakın tip, yeni tasarım
    gerekmeyebilir.
  - 6.6'daki fiyat kararı (ücret satırları yayınlanmıyor) burada da geçerli mi? Kaynakta
    ücret varsa kullanıcıya sor.
- **Redirect:** 6 `?id=` nedir/sınav URL'i P4 sayfalarına gider. P4'te eklenir, P2'de değil.
  (P2 sayfalarının kendi `.html` 301'i Faz 8 genel kuralında.)
- **Kabul:** 16/16 sayfa 200, tek H1, `assertCoverage`; kurs-tarihi ve üniversite
  sayfalarından gelen ölü linkler kapanır.
- **Başlangıç prompt'u:**
  ```
  SESSION-HANDOFF §A + CLAUDE.md oku. remaining-pages-plan §3 (route mimarisi) ve §5 P2.
  Aşama 0: 16 sınav kaydının bölüm yapısını site_content.json'dan çıkar, A/B/C katman
  tablosu yap, bana rapor et. Onaydan sonra pilot: toefl-kursu (orta uzunluk), sonra
  proficiency-kursu (statik klasör + UniversityGrid). Dil Kursu route'unu ve
  lib/languageContent.ts desenini örnek al. frontend-design skill'ini kullan.
  ```
- **Skill:** `frontend-design:frontend-design`, `programmatic-seo` (şablon × 16),
  `schema` (Course), `run`, `code-review`.
- **Sonuç (2026-09-23):** 16/16 sayfa üretildi, **126 statik sayfa**. `check-links` ölü
  hedef 40 → **28** (12 sınav hedefi kapandı, yeni ölü link yok). Plandan sapmalar:
  - **İçerik kuralı değişti (kullanıcı kararı):** kaynak başlıkları silinmez, ama gövde
    metni konudan sapmadan SEO için geliştirilebilir (CLAUDE.md §5'e onaylı sapma).
    Düzenlemeler `data/exams.ts`'te `edits` (orijinal → yeni satır) + `additions` olarak
    izlenebilir; kaynakta karşılığı kalmayan bir `edits` anahtarı build'i düşürür.
    Güncellenen bayat olgular resmi kaynaktan doğrulandı (TOEFL 1–6 ölçeği, GMAT Focus,
    dijital SAT, kısaltılmış GRE, YDS/YÖKDİL takvim+ücret, PTE ve SAT'taki iç çelişkiler).
  - **Hero:** yeni `ExamHero` yazılmadı; P1'in `BranchHero`'su `illustration` + `code`
    proplarıyla genişletildi (sayaç uydurma riski yok, `PageHero`'nun 103 sayfası riske
    girmedi). İllüstrasyon: akademik sınavlar `kampus`, TestDaF/Almanca aile `de`,
    Fransızca aile `fr`, İngiltere vize `en`.
  - **Şablon:** sabit rol alanları yerine SIRALI blok listesi (`prose`/`facts`/`structure`/
    `branchLinks`/`merged`/`stats`/`universities`/`headingList`/`faq`/`drop`) — 16 sınavın
    kaynak yapısı birbirine benzemiyor.
  - **Video bölümleri** (TOEFL, IELTS) yayınlanmıyor (kullanıcı kararı).
  - **`StickyToc` eklenmedi:** SAT ve Aile Birleşimi'nde tekrar eden bölümler akordiyona
    alınınca sayfa kısaldı; TOC gerekmedi (P8'de yeniden değerlendirilebilir).
  - **Redirect eklenmedi** (plan gereği): `.html` genel kuralı Faz 8, `?id=` URL'leri P4.
  - Kırıntıdaki `/sinav-hazirlik-egitimleri` hâlâ ölü — P3 hub'ı açacak (yeni bir ölü
    HEDEF değil, kurs-tarihi sayfaları zaten oraya link veriyordu).


### PM — Menü ve gezinme düzeltmesi  ✅ (S) — kullanıcı isteği 2026-09-23
Tek dosyalık iş: `ddm-web/lib/nav.ts` (+ gerekiyorsa `components/layout/SiteHeader.tsx`).
Yeni sayfa üretilmez. **Amaç:** üretilen sayfalara URL yazmadan, menüden gidilebilsin.

**Kaynak — canlı sitenin gerçek mega menüsü:** tam ağaç
[`live-menu-2026-09-23.md`](live-menu-2026-09-23.md)'de (2026-09-23'te
`dunyadillerimerkezi.com` ana sayfasının HTML'inden çıkarıldı). Özeti: 7 ana sekme →
1. **Yabancı Dil Kursları** — 10 dil; her dilin altında `{dil} Programı` (`-2`),
   `{dil} Özel Ders`, 4 şube kurs tarihi, `Online {dil} Eğitimi` (+ Almanca'da
   `Hızlandırılmış`/`Konuşma Kursları`, Çince'de `Öğrenmek Zor mu?`, Türkçe'de
   `Eğitim Seviyeleri`, İngilizce'de `Eğitim Sistemi`). Flemenkçe'nin alt kırılımı yok.
2. **İngilizce Kursları** — 11 kalem (5 seviye, Üniversite Hazırlık, YKS Dil, İlköğretim,
   Yaz Okulu, İngilizce Konuşma, İngilizce Eğitim Sistemi) → P5 kapsamı.
3. **Sınav Hazırlık** — 16 sınav; her birinin altında `Programı` (`-2`), `Özel Ders`,
   `Nedir`, 4 şube kurs tarihi. Proficiency'de ayrıca `Sınavı`, `Örnek Sınav Soruları`
   ve **21 üniversite** (aşağıdaki düzeltme 1'e bak).
4. **Yurtdışı Eğitim** — 11 kalem (Kanada Vancouver, İngiltere, Work and Travel,
   Tercih, İtalya'da Üniversite dahil).
5. **Kurumsal Dil Eğitimi** — + `Exclusive For Pegasus Pilots` (düzeltme 2).
6. **Diğer Programlar** — Yurtdışı Eğitim (`/diger-program/yurtdisinda-egitim`),
   Business English, Özel Dersler, Çocuklar İçin İngilizce, Online Dil Eğitimi,
   Tercüme Hizmetleri.
7. **İletişim** — 5 şube + `İş Başvurusu / Kariyer`.

> Canlı menüde **Öğrenci Yorumları sekmesi YOK**; bizim `nav.ts`'te var (düzeltme 3).

**Kullanıcının 3 düzeltmesi (karar verildi, tartışmaya kapalı):**
1. **21 üniversite proficiency sayfası menüden çıkar.** Menüde yalnız tek bir giriş kalır
   (ör. "Üniversite Proficiency Kursları" → `/sinav-hazirlik-egitimleri/proficiency-kursu`,
   gerekiyorsa `#universiteler` çapası). Üniversitelere **yalnız Proficiency kursu
   sayfasındaki listeden** gidilir (P2'de `UniversityGrid` bu sayfada).
2. **`Exclusive For Pegasus Pilots` → Diğer Programlar** sekmesine taşınır. Ayrı bir
   "Kurumsal Dil Eğitimi" sekmesi açılmaz; `/kurumsal-dil-egitim` hub linki de Diğer
   Programlar altında durur. *(Varsayım — kullanıcı aksini söylerse düzelt.)*
3. **Öğrenci Yorumları sekmesi tamamen kalkar**; içindeki `Mektuplar`, `Aktiviteler` ve
   `Duyurular` da menüde görünmez. Bu sayfalara ana sayfadan (ve footer'dan) gidilir.
   Footer'daki "Öğrenci Yorumları" linki **kalır**.

**Ölü link kuralı (en önemli teknik nokta):** canlı menüdeki kalemlerin büyük kısmı
(`-2`, `özel ders`, `nedir`, `online-*`) henüz üretilmedi — P4/P5 işi. `nav.ts` tam ağacı
tarif etsin, ama **link yalnız sayfa gerçekten üretilmişse basılsın**:
`lib/pageRegistry.ts`'teki href kümesine göre süzülür, olmayan hedef düz metin olur
(`href: null` deseni) ya da hiç render edilmez. Böylece her faz bittiğinde menü kendiliğinden
dolar, `check-links` ölü sayısı **artmaz**. Hangisi (düz metin mi, gizle mi) — pilot menüde
göster, kullanıcı seçsin.

**UI işi (kullanıcı isteği):** menü 3 kat büyüyor (10 dil × ~9 alt kalem, 16 sınav × ~8),
mevcut mega menü ve mobil çekmece bu hacme göre tasarlanmadı. Bu yüzden PM salt veri işi
değil, **arayüz işi**:
- Mega menü: kolon dengesi, taşma/kaydırma, uzun listelerde 2–3 kolona bölme, panel yüksekliği.
- Mobil çekmece (`SiteHeader.tsx` `drawer*`): şimdi 2 kat; canlı ağaç 3 kat (sekme → kurs →
  alt sayfa). Üçüncü katı akordeon olarak çöz, dokunma hedefi ≥44px, çekmece içi kaydırma,
  açıkken gövde kaydırmasını kilitle.
- `drawerLinkInert` (henüz üretilmemiş sayfa) görsel olarak tıklanamaz görünmeli.
- Kırılımlar mevcut düzene uysun: 1339 (nav→burger), 999, 619. Yeni kırılım gerekiyorsa
  `tokens.css` üzerinden, ham px yazmadan.
- Klavye ve a11y: Esc ile kapanma, `aria-expanded`, odak tuzağı — mevcut desen korunur.

- **Kabul:**
  - `npm run build` temiz, sayfa sayısı değişmez; `npm run check-links` ölü hedef sayısı
    **artmamış** olmalı
  - menü 1339 / 999 / 390px'te gerçekten açılıp gezilebiliyor; mobilde yatay kaydırma yok
  - menüden 126 üretilmiş sayfanın tamamına (üniversiteler hariç, düzeltme 1) erişilebiliyor
  - 21 üniversite linki menüde yok, proficiency sayfasında var
  - Öğrenci Yorumları sekmesi yok; mobil menü ve footer da kontrol edildi
- **Skill:** `site-architecture` (menü ağacı/iç link), `frontend-design:frontend-design`
  (mega menü kolon dengesi), `run` (1339 / 999 / 390px'te menüyü gerçekten aç), `code-review`.

#### Sonuç (2026-09-23, Opus 5)

**Ağaç.** `lib/nav.ts` canlı menünün TAMAMI oldu: 6 sekme, **201 hedef** (222 satırlık
canlı ağaçtan 7 sekme kökü çıktı, 21 üniversite tek girişe indi, Kurumsal sekmesi Diğer
Programlar'ın altına taşındı). Üç düzeltme de uygulandı. Ağaç `live-menu-2026-09-23.md`'den
betikle üretildi, elle yazılmadı — slug hatası riski yok.

**Süzme (kullanıcı kararı: "düz metin").** Üretilmemiş hedefler `nav.ts`'te `soon: true`
taşır; `lib/navTree.ts` (saf, istemci-güvenli) bunların href'ini düşürüp **soluk düz metin**
basar. 201 hedefin **104'ü link, 97'si düz metin**. `hide` modu da kodda duruyor ama
seçilmedi: hiçbir sayfası üretilmemiş üç sekme (İngilizce Kursları, Yurtdışı Eğitim, Diğer
Programlar) menüden tamamen düşüyordu.

**`soon` bayrağı neden elle?** Süzgecin `lib/pageRegistry.ts`'e ihtiyacı var, o da
`data/courseDates.ts`'i (~320 KB) içeri alıyor — istemci paketine giremez. Ağacı sunucuda
süzüp prop geçmek denendi: ağaç 126 sayfanın HER BİRİNİN HTML'ine **iki kez** kopyalandı
(sayfa başına +40 KB). Çözüm: bayrak `nav.ts`'te dursun, doğruluğu **build'de**
`lib/navAudit.ts` kanıtlasın. Bayrak sapınca build düşer ve hangi kalemin düzeltileceğini
tek tek yazar. **P3/P4/P5'i yapan:** sayfa üretince build sana `soon: true` silinecek
satırları söyleyecek, başka iş yok.

**UI.** Masaüstünde kalabalık sekmeler (Yabancı Dil 10 dil, Sınav Hazırlık 16 sınav) **iki
bölmeli panel**: solda kurs listesi (kendi içinde kayan), sağda seçili kursun alt sayfaları
en fazla 2 kolonda, aşağı doğru dizili. Diğer 4 sekme klasik kolonlu. Mobil çekmece **3 kat**
(sekme → kurs → alt sayfa), her katta tek dal açık; kendi kaydırma alanı var, gövde
kaydırması kilitli, tavanı açılışta ölçülüyor (üst bar mobilde 2 satıra düşüyor, CSS'te
sabitlenemiyor). ≤999px'te çekmecenin kendi CTA'sı basılmıyor (MobileBottomBar aynı düğmeyi
taşıyor), 620px+ sağa yaslı 440px panel.

**Doğrulama:** tsc ✅ · lint ✅ · build ✅ **126 sayfa (değişmedi)** · check-links **28 ölü
hedef (değişmedi)** — menü linkleri prerender HTML'ine girmiyor, panel yalnız açılınca
render ediliyor · 1440/1339/999/390/360px'te yatay taşma **yok** · odak tuzağı, Esc, perdeye
dokunma, kapat düğmesi, klavyeyle mega menü gezme gerçek tarayıcıda test edildi ·
sayfa HTML'i 175 KB → **135 KB** (ağaç artık paylaşılan JS parçasında).

**Menüden erişim:** üretilmiş 126 sayfanın 105'i menüde (21 üniversite kararla dışarıda,
ana sayfa logodan). `code-review` (high) iki tur çalıştı, 12 bulgunun 11'i düzeltildi;
düzeltilmeyen tek bulgu footer'ın `soon` denetimine girmemesi — footer'daki ölü hedefler
(`/ogrenci-yorumlari`, `/diger-program/*`) kullanıcı kararıyla duruyor, P3/P4 açacak.

### P3 — Kategori Hub'ları  ✅ tamam (2026-09-23)

> **Sonuç (2026-09-23):**
> - 7 hub üretildi (plan 6 + `/diger-program/ozel-dersler`); her biri ayrı statik klasör, kökte catch-all yok.
> - **Aşama 0:** gerçek özgün metin 0–488 kelimeydi (şablon blokları + kopyalar ayıklandı); hepsi ~650–1180 kelimeye çıktı.
>   Kaynak hataları düzeltildi ve `data/hubs.ts`'te izleniyor: yanlış/eksik H1'ler (İngilizce C1, Sınav, Kurumsal "Kurumsal"),
>   IT kartında "İspanyolca Kursu", "Programalrımız", "İ Kurumsal", bozuk/uzun meta'lar, bayat şubeler (Beşiktaş, Suadiye), 4→5 şube,
>   kapalı İstanbul Şehir Üniversitesi, "%30 indirim", "başarı garantisi", üstünlük iddiaları.
> - Özel ders listesi kaynakta 17 (plan 19): fark `ingilizce-konusma-ozel-ders` ve `yds-ozel-ders-2`.
> - `/yurtdisi-egitim` → **içerikli hub** (kullanıcı): Kaplan/Alpadia/Enforex blokları başlıklarıyla duruyor, rakamlar Kaplan'a atfedildi.
> - **Tasarım:** 3 yön taslağı → kullanıcı "C + B'nin tablosu"nu seçti; bkz. `ddm-web/CLAUDE.md` §9 P3 notu.
> - **Ölü link:** 28 benzersiz / 957 çift → **22 / 742** (beklenen: düşen 6 hedef 250 çift; yeni 7 sayfanın footer'ı hâlâ ölü 5 hedefe +35).
>   Hub'lardaki üretilmemiş hedefler (özel ders 17, İngilizce seviye 11, yurtdışı alt 6, diğer program 4, Pegasus) soluk "Yakında".
> - **133 statik sayfa.** `code-review` (high): 10 bulgunun 10'u düzeltildi.
> - P4/P5'te o sayfalar üretilince hub'larda ek iş yok: kartlar `isProducedPage()` ile kendiliğinden link olur
>   (yalnız `lib/nav.ts`'teki `soon: true` silinir).

- **Kapsam:**
  - `/yabanci-dil`, `/sinav-hazirlik-egitimleri`, `/ingilizce-kurslari` (715 kelime),
    `/yurtdisi-egitim` (1173 kelime, hub'dan çok içerik sayfası; Aşama 0'da bak),
    `/diger-program` (300), `/kurumsal-dil-egitim` (559)
  - `/diger-program/ozel-dersler` (330 kelime): 16 özel dersin hub'ı, P4 ile birlikte yapılır
  - `/ddm-iletisim` P1'de
- **Şablon:** `PageHero` + kart grid'i (`LanguageGrid` / `MediaCard` / `CourseChipCard`
  deseni). Alt linkler `lib/nav.ts`'ten gelir (tek kaynak). Metin birebir.
- **Sıra:** iskelet P2 ile aynı anda kurulabilir. Kart hedefleri var oldukça tamamlanır,
  ölü karta link verilmez.
- **Başlangıç prompt'u:**
  ```
  SESSION-HANDOFF §A + CLAUDE.md oku. remaining-pages-plan §5 P3. 6 hub kaydını dök,
  her hub'ın alt sayfa listesini lib/nav.ts ile karşılaştır (hangi kart hedefi henüz yok?).
  Kökte catch-all KULLANMA, her hub ayrı statik klasör (§3 madde 5).
  site-architecture ve frontend-design skill'lerini kullan.
  ```
- **Skill:** `site-architecture` (iç link ağı, breadcrumb), `frontend-design:frontend-design`.

### P4 — Zengin İçerik Alt Sayfa  🟡 özel ders ✅ · online ✅ · nedir ✅ · tekil ✅ (2026-09-26) · kalan: yurtdışı, diğer+kurumsal (online-dil-egitimi hariç), dil -2 301

> **Sonuç — Tekil (2026-09-26, Opus 5.5):** 8 sayfa. Kararlar (kullanıcı): `proficiency-sinavi` yayınlanmadı (21 üniversite
> linki, Proficiency Kursu'ndaki listenin kopyası → `#universiteler` 301, menü kalemi kaldırıldı) · Joomla "Almanca Eğitim
> Seviyeleri" (`?id=67` ×2) yeni `/almanca-kursu/almanca-egitim-seviyeleri` adresinde, "kaset / DVD" cümleleri çıkarıldı ·
> İngilizce Eğitim Sistemi kanonik `/yabanci-dil-egitimleri/…` (`/ingilizce-kurslari/…` 301) · 22 örnek sınav dosyası eski
> siteden indirilip aynı yollarla `public/images`, `public/ddm/indir` altına kondu · Çince Kursu'ndaki yanlışlar da düzeltildi.
> Tasarım "A · program panosu" (`SinglePage`): hero'nun sağında sayfanın asıl bilgisi (`WeekBoard` haftalık takvim, kur
> basamakları, ders akışı, sınav kâğıdı, dosya rafı, kolay/zor); gövdede soru | içerik satırları (soru yapışkan), gri bantta
> şube kartları (etiket kaynak satırı, adres `branches.ts`). Genel bilgi doğrulandı: Ethnologue, British Council, FSI, HSK
> (GF0025-2021, chinesetest.cn), Goethe (Start Deutsch 1 formatı, sınav yönetmeliği), telc, ÖSD, TestDaF, AufenthG §30,
> turkei.diplo.de (aile birleşiminde yalnız Goethe/ÖSD), Yunus Emre TYS, MEB CEFR çevirisi, 15 üniversitenin resmi sınav sayfası.
> Altyapı: `createGuideResolver` (nedir + tekil ortak; cümle bazında alma + gösterilmeyen cümle build'i düşürür), `splits`
> (iki içeriğin birleştiği kaynak satırı izlenerek bölünür), `check-links` artık `public/` dosyalarını tanıyor.

> **Sonuç — Nedir (2026-09-26, Opus 5.5):** 8 rehber. Metin genel sınav bilgisi → P2 kuralı (başlık kalır, eskimiş olgu
> resmi kaynaktan düzeltilir, `edits` izlenir). Ayrı tasarım (`GuidePage`): açık hero + kısa cevap + lacivert "bir bakışta"
> `<dl>`, yapışkan soru listesi, soru başlıklı bölümler (kalın cevap → madde / kart / tablo), kaynaklar + son güncelleme.
> Karşılaştırma tabloları (TOEFL/IELTS/PTE, GRE/GMAT, TOEIC/TOEFL/IELTS), TOEFL yeni/eski puan tabloları. 4 `?id=` 301.

> **Sonuç — Online (2026-09-25, Opus 5.5):** 8 dil + çatı `/diger-program/online-dil-egitimi` (diğer program alt türünden
> öne alındı, kullanıcı kararı). Kaynak tek şablon (5 cümle) → çözücü iskeleti doğrular, cümleler hero + 4 adıma dağılır.
> Baskın bölüm "nasıl işler" + derse hazırlık paneli (dekoratif canlı ders kartı); destek: "{dil} sınavlarına evden
> girilebilir mi?" (resmi kaynaklı), online/şube tablosu, SSS. Üç kopya meta description düzeltildi. "Skype" kaynakta kaldı.
> Zengin içerik sayfaları artık tek listeden: `lib/richPages.ts` (yeni alt tür = yeni `ENTRIES` satırı).

> **Sonuç — Özel ders (2026-09-25, Opus 5.5):** 18 sayfa. Tasarım turu: 3 yön (A alan mozaiği · B seviye merdiveni ·
> C rehber + özet kartı), kullanıcı **B**'yi seçti; sınav sayfalarında merdiven yerine **sınav formatı kartları**.
> Şablon: `RichContentPage` blok listesi (`levels | format | about | compare | faq`) — sonraki alt türler yeni blok
> türü ekler. İçerik kuralı: firma metni birebir (yalnız yazım düzeltmesi `edits`), genel bilgi `feature` / `faq.added`
> alanlarında, resmi kaynak yorumda, sayfada "Son güncelleme". YDS Kurs Dönemi yayınlanmadı (iki cümlesi YDS Kursu'na).
> Açık: GMAT/GRE "2-3 kişilik grup" ↔ P3 tablosu "en fazla 2" çelişkisi (satır gizli) · sınav hero fotoğrafları.

> **KAPSAM KARARI (kullanıcı, 2026-09-23) — aşağıdaki tabloyu ezer:**
> - **"-2" (Kurs Programı) sayfaları yayınlanmayacak** (18 sayfa düşer). Sınav tarafındaki
>   9'unun kayda değer içeriği (online grup / birebir / beceri sınıfları / sınav
>   stratejileri) P2'de ana sayfalara taşındı; alınmayanlar: şube satırları (zaten link
>   listesinde) ve "8 kişilik grup" satırı (ana sayfalar "en fazla 6 kişi" diyor, çelişki).
>   Proficiency'ninkinden kayda değer bir şey çıkmadı. Dil tarafındaki 9'u P4'te aynı
>   ölçütle değerlendirilecek. **301:** her `-2` URL'i kendi ana sayfasına (P4'te eklenir).
> - **Özel ders sayfaları KALIYOR** (19 sayfa). Sınav tarafındakiler 3 ayda 5-6 tıklama
>   alıyor ve 130-195 kelime; yine de kullanıcı şimdilik tutmayı seçti, P4'te metinleri
>   güçlendirilecek. Dil tarafındakiler (İspanyolca/İtalyanca başta) daha çok tıklanıyor —
>   500-700 kelimeye çıkarılacak. Karar P4 sonunda yeniden gözden geçirilecek.
> - **"Nedir" sayfaları GEO'nun ana yatırımı:** 8 sayfa, bugün 119-604 kelime; soru
>   başlıkları, tanım cümlesi, karşılaştırma tablosu ve güncelleme tarihiyle 600-900
>   kelimeye çıkarılacak.
> - **`/diger-program/ozel-dersler` çatı sayfası açılacak** (siteden 126 link alıyor,
>   şu an ölü): 9 dil özel ders sayfasına + sınav sayfalarına link.

**Kapsam (~78 temiz sayfa, kesin liste — yukarıdaki kararla "-2" satırı düşer):**

| Alt tür | Adet | Slug'lar |
|---|---|---|
| Özel ders | 19 | yab: `almanca/cince/fransizca/ingilizce/ispanyolca/italyanca/rusca-ozel-ders`, `ingilizce-konusma-ozel-ders`, `turkce-ozel-ders` · sin: `gmat/gre/ielts/proficiency/sat/toefl/toeic/yds-ozel-ders`, `yds-ozel-ders-2`, `academic-pte/pte-akademik-ozel-ders` |
| "-2" devam sayfası | 18 | her dil/sınav için `{kurs}-2` (yab 9, sin 9: academic-pte, gmat, gre, ielts, proficiency, sat, toefl, toeic, yds) |
| Online eğitim | 8 | `online-{almanca,cince,fransizca,ingilizce,ispanyolca,italyanca,rusca,turkce}-egitimi` |
| Nedir | 8 | `{gmat,gre,ielts,proficiency,sat,toefl,toeic,yds}-nedir` |
| Tekil içerik | 8 | `almanca-konusma-kurslari`, `hizlandirilmis-almanca-kursu`, `cince-ogrenmek-zor-mu`, `ingilizce-egitim-sistemi` (yab), `turkce-egitim-seviyeleri`, `proficiency-ornek-sinav-sorulari`, `proficiency-sinavi`, `aile-birlesimi-egitimi/a1-sinav-ornegi` |
| Yurtdışı alt | 11 | `pathway-programi`, `sinav-hazirlik`, `tercih`, `tercih/italyadauniversite`, `work-and-travel`, `yaz-okullari`, `yuksek-ogrenim`, `yurtdisi-dil-egitimi`, `yurtdisi-ingilizce-egitimi`, `.../kanada-vancouver`, `.../kanada-vancouver-2` |
| Diğer program alt | 5 | `business-english`, `cocuklar-icin-ingilizce-kursu`, `online-dil-egitimi`, `tercume-hizmetleri`, `yurtdisinda-egitim` |
| Kurumsal alt | 1 | `kurumsal-dil-egitim/turkish-course-pegasus-pilots` |

- **Route:** §3 madde 2. İki `[kurs]/[sayfa]` + proficiency dağıtıcısı tür bazlı hale gelir.
  `yurtdisi-egitim/`, `diger-program/`, `kurumsal-dil-egitim/` için yeni klasörler açılır
  (`[sayfa]` ya da 2 seviye için `[...sayfa]`, yalnız o prefix altında).
- **Aşama 0:**
  1. alt türlere göre ortak yapı var mı? (özel derslerin hepsi aynı iskelet mi?)
  2. "-2" sayfaları ne? Bir kısmı 74 kelime, ana sayfanın kopyası olabilir. Duplikasyon
     kontrolü yap, kopyaysa kullanıcıya 301 öner.
  3. Özel ders çift URL'leri (§4): hangi versiyon kanonik?
- **Şablon:** tek `RichContentPage` + `lib/richContent.ts` (`SectionResolver` omurga).
  Uzun sayfalarda `StickyToc`, sonda `CtaBand` ("Bilgi Al"). Alt türe göre küçük varyasyon
  (özel dersler için format rozetleri).
- **Riskler:**
  - **Birebir-metin kuralı en kolay burada bozulur.** `assertCoverage` zorunlu.
  - Bilinen meta hatası: "Online Çince Eğitimi" meta description'ı "Online İtalyanca..."
    diye başlıyor. Bu bariz bir hata, düzeltilebilir ama kullanıcıya bildirilir
    (CLAUDE.md §5). Online sayfaların hepsi ~91–93 kelime; kopyala-yapıştır izine bak.
- **Redirect:** 16 + 5 özel ders, 6 nedir/sınav, 2 Almanca seviye → toplam 29 `has: query`
  kuralı (§4).
- **Pilot sırası ve durum (2026-09-26):**
  1. ✅ özel ders (18; YDS Kurs Dönemi → 301)
  2. ✅ online (8 + çatı `/diger-program/online-dil-egitimi`)
  3. ✅ nedir (8)
  4. ✅ **tekil (8)** (2026-09-26) — `almanca-konusma-kurslari`, `hizlandirilmis-almanca-kursu`, `cince-ogrenmek-zor-mu`,
     `ingilizce-egitim-sistemi` (P5 ile çakışıyor mu Aşama 0'da bak), `turkce-egitim-seviyeleri`,
     `proficiency-ornek-sinav-sorulari` (21 üniversite sayfasından ölü link alıyor), `proficiency-sinavi`,
     `aile-birlesimi-egitimi/a1-sinav-ornegi`. `?id=` 301: `proficiency-kursu.html?id=364:proficiency-sinavi`,
     `…id=323:proficiency-sinav-sorulari`, 2 Almanca seviye (§4).
  5. ⏳ **yurtdışı (11)** — SIRADAKİ. `kanada-vancouver-2` için kullanıcıya sor (diğer "-2"ler 301).
  6. ⏳ diğer program + kurumsal (5): `business-english`, `cocuklar-icin-ingilizce-kursu`, `tercume-hizmetleri`,
     `yurtdisinda-egitim`, `kurumsal-dil-egitim/turkish-course-pegasus-pilots` (footer'dan ölü link alıyorlar).
  7. ⏳ dil tarafı 9 "-2" sayfası → kendi ana sayfasına 301 (içerik taşınacak bir şey var mı Aşama 0'da bak).

  Her alt tür: Aşama 0 → "bu tür neden farklı görünmeli" sorusu → 1 pilot → onay → toplu → code-review → döküman.
- **P4'te öğrenilenler (sonraki oturum bunlara uysun):**
  - **İçerik türünü ayır:** firma bilgisi (DDM'in cümlesi, şube/öğretmen/sınıf/iddia) birebir, yalnız yazım; genel
    bilgi (sınav, dil, mevzuat) resmi kaynaktan doğrulanır ve eskimişse düzeltilir (nedir sayfalarında kullanıcı P2
    kuralını onayladı). Doğrulamayı arka planda araştırma ajanlarına ver, kaynak URL'lerini veri dosyasında yoruma yaz.
  - **Altyapı hazır:** yeni alt tür = `data/<tür>.ts` + `lib/<tür>Content.ts` (SectionResolver + assertCoverage + edits
    denetimi + `checkMeta`) + `lib/richPages.ts` `ENTRIES` satırı. Sayfa bileşeni: blok listeli `RichContentPage`
    (özel ders/online) ya da `GuidePage` (nedir); `RichEntry` (rich | guide) yeni bir `kind` ile genişletilebilir.
    `[kurs]/[sayfa]` ve proficiency dağıtıcıları alt türü bilmez; yeni prefix (`yurtdisi-egitim/`, `diger-program/`,
    `kurumsal-dil-egitim/`) için statik klasör ya da `[sayfa]` açılır.
  - **Kontrol:** `npm run build` (sayfa sayısı), `npm run check-links` (ölü hedef sayısı düşmeli), 72/72 kurs tarihi,
    1440/390/360 px taşma + tek H1 (Playwright betiği scratchpad'de yoksa yeniden yaz). Açık dev sunucusu (3000)
    değişiklikleri bazen yüklemiyor → kontrolü production build ile `npx next start -p 3200`'de yap, sonra durdur.
  - **Tekil'den:** kararı soran seçeneklerde URL'i değil kullanıcının gördüğü yeri (menü yolu, sayfa metninden örnek)
    göster — kullanıcı ilk soruyu "hangi sayfa?" diye geri çevirdi. Tamamen kopya / içeriksiz sayfa için 301 önerisi kabul
    gördü. Eski sitedeki indirilebilir dosyalar taşınınca kaybolur: Aşama 0'da `ddm-crawl/site_content.json` `links`
    alanından dosya linklerini say.
  - **Kullanıcı:** Türkçe, kısa, teknik olmayan dil; seçenekleri görsel göster, az soru sor; tekrar eden bilgiden
    kaçma ama bilgiye boğma, göz gezdirilebilir format (soru başlığı → kalın cevap → madde/tablo). Commit'ten önce sor.
- **Başlangıç prompt'u (P4 kalan alt türler):** bkz. `docs/SESSION-HANDOFF.md` §A "Sonraki oturum prompt'u" — kullanıcıya
  verilen tam metin orada.
- **Skill:** `frontend-design:frontend-design`, `programmatic-seo`, `code-review`
  (dağıtıcı değişikliği riskli), `run`.

### P5 — İngilizce Seviye Kursu  ⏳ (S–M)
- **Kapsam (11):**
  - seviye: `elementary`, `pre-intermediate`, `intermediate`, `upper-intermediate`, `advanced`
    (`-ingilizce-kursu` ekiyle)
  - hedef kitle: `ilkogretim-`, `universite-`, `yaz-okulu-ingilizce-kursu`, `yks-dil-ingilizce`,
    `ingilizce-konusma-kursu`
  - `ingilizce-egitim-sistemi` (527 kelime, yapısı P4'e yakın)
  - hepsi `/ingilizce-kurslari/` altında
- **Şablon:** Dil Kursu bileşenleri (`PageHero`, `LevelExplorer`, `ProgressTrack`). Veri
  modeli ayrı: `data/englishLevels.ts`, seviye ekseni. `ProgressTrack` üzerinde aktif
  seviye vurgulanır.
- **Dikkat:** `/ingilizce-kurslari/ingilizce-konusma-kursu` ile
  `/yabanci-dil-egitimleri/ingilizce-konusma-kursu` farklı URL'ler. İçerik aynı mı? Aşama
  0'da diff'le. Aynıysa canonical kararı kullanıcıya bırakılır.
- **Başlangıç prompt'u:**
  ```
  SESSION-HANDOFF §A + CLAUDE.md oku. remaining-pages-plan §5 P5. 11 /ingilizce-kurslari
  kaydını dök; yabanci-dil-egitimleri/ingilizce-konusma-kursu ile duplikasyonu kontrol et.
  Dil Kursu bileşenlerini yeniden kullan, pilot: intermediate-ingilizce-kursu.
  frontend-design skill'ini kullan.
  ```
- **Skill:** `frontend-design:frontend-design`, `run`.

### P6 — Şube Tanıtım  ⏳ (M) — karar #5
- **Kapsam (4, kök dizin):** `/kadikoy-tanitim-sayfasi` (1912 kelime),
  `/atasehir-tanitim-sayfasi` (1582), `/cadde-tanitim-sayfasi` (1630),
  `/levent-tanitim-sayfasi` (1871). Her biri ayrı statik klasör (§3 madde 5).
- **Aşama 0:** kelime sayısının ne kadarı ortak blok (menü/footer/şube listesi kalıntısı),
  ne kadarı gerçek tanıtım metni?
- **Şablon:** uzun içerik + galeri + P1'in `BranchInfoPanel`'i. Galeri görseli yok:
  `ImageSlot` + `DataMissingNotice` kullanılır, görsel gelene kadar boş kalır.
- **Başlangıç prompt'u:**
  ```
  SESSION-HANDOFF §A + CLAUDE.md oku. remaining-pages-plan §5 P6. 4 tanıtım kaydını dök,
  ortak blok / gerçek metin ayrımını rapor et. Görsel yoksa ImageSlot+DataMissingNotice.
  frontend-design skill'ini kullan.
  ```
- **Skill:** `frontend-design:frontend-design`, `run`.

### P7 — Öğrenci Yorumu + Duyuru  ⏳ (M) — karar #2
- **Kapsam:**
  - `/ogrenci-yorumlari` liste + 10 `?start=N` sayfalama varyantı
  - 51 tekil `/ogrenci-yorumlari/{id}-{ad}`
  - `/duyurular` liste
  - 12 tekil `/duyurular/{id}-{slug}`, `id` 22–31, 391 ve 425
- **Şablon:** kart grid + sayfalama (`TestimonialCard` var) + basit detay kartı. Liste
  sayfalaması `/ogrenci-yorumlari?page=N` ya da statik `/ogrenci-yorumlari/sayfa/N`.
  SSG'de query okunamaz, **statik yol önerilir**.
- **Riskler:**
  - Yorumların meta description'ı çoğunlukla jenerik ve aynı. Faz 8 metadata denetiminde
    işaretlenir, metin uydurulmaz.
  - Duyuruların bazıları eskimiş olabilir (ör. `391-ddm-kar-tatili`). Yayından kaldırma
    kararı kullanıcıya ait.
- **Redirect:** 10 `?start=` URL'i → yeni sayfalama yolu.
- **Başlangıç prompt'u:**
  ```
  SESSION-HANDOFF §A + CLAUDE.md oku. remaining-pages-plan §5 P7. Karar #2 verildiyse uygula.
  51 yorum + 12 duyuru kaydını dök; ad/metin/tarih alanlarını çıkar. Mevcut TestimonialCard'ı
  yeniden kullan. Sayfalama statik yol olsun (SSG). programmatic-seo + frontend-design kullan.
  ```
- **Skill:** `programmatic-seo`, `frontend-design:frontend-design`, `schema` (Review, karar #6).

### P8 — Faz 8 SEO taşıma + 6.7 Temizlik  ⏳ (L)
- **Genel `.html → temiz` kuralı** (`/:path*.html → /:path*`). Sırası önemli: özel
  kurallardan (üniversite kök, Joomla) SONRA gelir. `urls.csv`'deki 384 URL'in her biri için
  bir betik "eski URL → beklenen hedef → gerçek HTTP sonucu" tablosunu çıkarır. Hedef: 0
  kayıp.
- **Taşınmayacaklar ve kararları:**
  - `component/tags/tag/{almanca,toeic}-kursu` → ilgili kursa 301
  - `star-media` → 410 ya da ana sayfaya 301 (kullanıcıya sor)
  - `tanitim-icerik/*` (6) → ana sayfaya 301 (ana sayfa bölümlerinde içerik kullanılmış mı teyit et)
  - `aktivite-aktiviteler` → karar
- **Metadata denetimi (CLAUDE.md §6):** tüm sayfalarda title, description, canonical ve tek
  H1 var mı? `h1-fallback` uyarı listesini çıkar ve kullanıcıya sun.
- **6.7 temizlik:**
  - ölü `data-reveal`/`data-count` temizliği
  - `next/image` geçişi (boyut, lazy)
  - (opsiyonel) IntersectionObserver ile reveal
- `app/sitemap.ts` (registry'den) + `app/robots.ts` son hali.
- **Başlangıç prompt'u:**
  ```
  SESSION-HANDOFF §A + CLAUDE.md oku. remaining-pages-plan §5 P8 ve PROGRESS.md Faz 8.
  urls.csv'deki 384 eski URL'i npm run start'a karşı tarayan bir betik yaz; her biri için
  beklenen/gerçek sonucu tabloya dök. Genel .html kuralını özel kurallardan SONRA ekle.
  seo-audit skill'ini kullan.
  ```
- **Skill:** `seo-audit`, `code-review`, `simplify` (temizlik).

### P9 — Kesişen işler + Faz 9 QA  ⏳ (M) — karar #6
- **JSON-LD** (metin değiştirmez, eklemedir):
  - `EducationalOrganization` (site geneli)
  - `LocalBusiness` (5 şube, adresler P1'den)
  - `Course` (dil ve sınav sayfaları)
  - `BreadcrumbList` (`Breadcrumb` bileşeninden)
- **OG/Twitter varsayılanları:** `app/layout.tsx` metadata'sı, OG görseli.
- **Analytics + Search Console** (PROGRESS Faz 9).
- **Erişilebilirlik:** klavye ile mega menü, kontrast, form etiketleri.
  **Core Web Vitals:** eski siteden kötü olmamalı.
- **Faz 9 kontrol listesi:** staging `noindex`'inin kaldırıldığını doğrula, canlıda 301
  testleri, eski ve yeni `urls.csv` diff'i.
- **Başlangıç prompt'u:**
  ```
  SESSION-HANDOFF §A + CLAUDE.md oku. remaining-pages-plan §5 P9. schema skill'iyle JSON-LD
  bileşenini kur (lib/site.ts absoluteUrl'den geç, domain yazma). Sonra PROGRESS Faz 9
  kontrol listesini sırayla uygula; seo-audit ile rapor çıkar.
  ```
- **Skill:** `schema`, `seo-audit`, `analytics`, `anthropic-skills:chrome-browser`
  (canlı eski siteyle karşılaştırma), `run`.

---

## 6. Skill matrisi ve "Yapma" listesi

| Skill | Ne zaman | Not |
|---|---|---|
| `frontend-design:frontend-design` | **Her** UI işi (P1–P7) | CLAUDE.md'nin kuralı. Mevcut token/atomlardan sapma |
| `ui-ux-pro-max` | Tasarımı olmayan yeni şablon kararı (karar #1 "kodda" çıkarsa) | Yalnız öneri; görsel dil `tokens.css`'te sabit |
| Claude Design / `DesignSync` | Karar #1 "Design turu" çıkarsa (P1, P4) | Gerçek içeriği ver: `docs/design-refs/faz5-icerik/0N-*.md` deseniyle yeni içerik dosyası hazırla |
| `run` | Her pilot sayfadan sonra, tarayıcıda gerçek sayfa (1339px ve <999px) | 6.3'teki elle doğrulama pratiği |
| `anthropic-skills:chrome-browser` | Eski canlı siteyle görsel/metin karşılaştırma | Metin birebir mi? |
| `code-review` | Her faz sonu, **commit öncesi** | Özellikle dağıtıcı ve redirect değişiklikleri |
| `simplify` | P8 temizlik; büyük faz sonrası | |
| `programmatic-seo` | P2, P4, P7 (şablon × çok sayfa) | |
| `site-architecture` | P3 hub'lar, iç link ağı, breadcrumb | |
| `seo-audit` | Her tip sonrası metadata; P8 | |
| `schema` | P1 (LocalBusiness), P2 (Course), P7 (Review), P9 | Karar #6 |
| `analytics` | P9 | |

**Yapma (CLAUDE.md'den özet; bu hataların hepsi yapılmaya çok yakındı):**
- Gövde metnini yeniden yazma, özetleme, "düzeltme" (§5). İstisna yalnız bariz metadata
  hatası ve o da bildirilir.
- `output: "export"` ekleme (§2). Tailwind veya CSS-in-JS kullanma. Ham hex/px yazma, token
  kullan (§1).
- Absolute domain yazma, `absoluteUrl()` kullan (§4). Slug'ı "iyileştirme" (§3).
- Tahmini adetle kod yazma. Önce Aşama 0.
- Kökte `[slug]` catch-all açma (§3 madde 5).
- Kaynakta karşılığı olmayan bölüm ekleme ("Neden DDM", SSS vb.; 6.5 emsali).
- Şube adresi, telefonu ya da tarihi uydurma. `null` + `DataMissingNotice`.
- Push etme, kod ve dökümanı aynı commit'e koyma.

---

## 7. Açık kararlar (kullanıcıya)

| # | Konu | Öneri | Engellediği |
|---|---|---|---|
| 1 | Yeni şablonların tasarım kaynağı: Claude Design turu mu, mevcut atomlarla doğrudan kod mu? | P1 ve P4 için kısa Design turu (gerçek içerikle); P2/P3/P5/P7 mevcut atomlarla kodda | P1, P4 |
| 2 | 51 yorum + 12 duyuru: tekil sayfa mı, liste sayfasına 301 mi? | Tekil sayfalar (URL/SEO korunur, şablon ucuz) | P7 |
| 3 | Kurs tarihi ücret satırları (~170) yayınlanmıyor. Kalıcı mı? | **Karar (2026-09-23):** DDM'nin kendi kurs ücretleri yayınlanmıyor; **sınavların resmî ücretleri** (TOEFL 185 USD, YÖKDİL 1.200 TL vb.) bilgi amaçlı yayınlanıyor, yanına güncellik uyarısı konuyor. TOEFL'un güncel tutarı kullanıcıdan bekleniyor | — |
| 4 | **İletişim/ön kayıt formu gönderimi:** `ContactFormCard` hiçbir yere göndermiyor. Seçenekler: Next.js Route Handler + e-posta servisi, harici form servisi, `mailto:`/WhatsApp | Route Handler + e-posta servisi (SSG'yi bozmaz) | P1'in adres/telefon kısmı formsuz tamamlandı (2026-09-22) — form/KVKK gövdesi hâlâ bu karara bağlı, sona bırakıldı |
| 5 | Şube galeri görselleri ve eksik adres/telefon verisini kim sağlayacak? | Önce P1 Aşama 0'da kaynaktan çıkar; kalanları kullanıcı sağlar | P1, P6 |
| 6 | JSON-LD yapısal veri eklensin mi? | Evet; metin değişmez, SEO artısı | P9 (ve P1/P2'de erken) |
| 7 | `lib/pageRegistry.ts` refactor'u ne zaman? | P0'da iskelet (davranış değişmeden) | P2, P4 |
| 8 | Harita: Google Maps iframe'i (harici domain) mi, statik görsel + "yol tarifi" linki mi? | Statik görsel + dış link (CWV ve §4 açısından temiz) | P1 |

Kararlar verildikçe bu tabloda **"Karar:"** sütunu gibi işaretle ve SESSION-HANDOFF §D'ye yaz.

---

## 8. Ortak Definition of Done (her P için)

1. Aşama 0 raporu kullanıcıya sunuldu ve onaylandı.
2. 1 pilot sayfa onaylandı, sonra toplu üretim yapıldı.
3. `generateStaticParams` + `dynamicParams = false`; `generateMetadata` §6'daki 4 alanı
   veriden dolduruyor.
4. Build'de `assertCoverage` geçiyor (sessiz satır kaybı yok).
5. `npx tsc --noEmit` + `npm run lint` + `npm run build` temiz. Build'in sayfa sayısı
   beklenen artışı gösteriyor.
6. N/N sayfa 200 ve tek H1 (`npm run start` + curl/betik). Yeni redirect'ler 308.
7. `npm run check-links`: ölü link sayısı önceki baz çizgiden düşük, yeni ölü link yok.
8. Mevcut tipler bozulmadı: 72 kurs-tarihi, 21 üniversite ve 10 dil hâlâ 200.
9. `code-review` skill'i çalıştırıldı ve bulgular çözüldü.
10. `PROGRESS.md`, `page-types.md` Durum kolonu ve `SESSION-HANDOFF.md` (§A + §D)
    güncellendi. Kod ve döküman ayrı commit'lendi.
