# Kalan Sayfa Tipleri — Öncelik Sırası ve Uygulama Planı

> Faz 6.8+ / Faz 7'nin devamı. Kaynak: `docs/page-types.md` (tip haritası),
> `PROGRESS.md` (faz durumu), `ddm-web/CLAUDE.md` (kurallar).
> Adetler `site_content.json`'daki 384 kayda ve `page-types.md`'ye dayanır; **kesin
> sayı her tipin "Aşama 0 denetimi"nde çıkarılır** (Faz 6.5'te keyword taraması
> gerçek katmanlamayı yanlış vermişti — tahmine güvenilmez).

---

## 1. Şu an nerede duruyoruz

`npm run build` temiz, **106 statik sayfa** üretiliyor. Tamamlananlar:

| Tip | Sayfa | Redirect | Faz |
|---|---|---|---|
| Ana Sayfa | 1 | — | 6.3 |
| Dil Kursu Ana | 10 | — | 6.4 |
| Üniversite Proficiency | 21 | 42 (21 kök × `.html`/`.html`siz) | 6.5 |
| Şube Kurs Tarihi | 72 | 12 (Joomla `?id=`) | 6.6 |

**Paylaşılan altyapı (yeniden kullanılacak):** `PageHero` (modlar: dil / uni / sube),
`Breadcrumb`, `StickyToc`, `ScheduleTable`, `WeekGrid`, `Accordion`, `ProgressTrack`,
`LevelExplorer`, `LinkRow`, `PricingPanel`, `CtaBand`, `ContactFormCard`,
`BranchInfoPanel` (kodda var, henüz hiçbir sayfada kullanılmıyor), `UniversityGrid`,
`LanguageGrid`, `TestimonialsCarousel`, `DetailSections`, `ProcessSteps`;
veri: `data/branches.ts`, `languages.ts`, `universities.ts`, `courseDates.ts`;
içerik çözücüler: `lib/languageContent.ts`, `universityContent.ts`,
`courseDateContent.ts` (`SectionResolver` + `assertCoverage` = "kaynağın her satırı
ya tüketildi ya gerekçeli `ignored[]`'da" garantisi).

**Bilinen açık uçlar (bugün canlı sitede ölü olacak linkler):**
- 72 kurs-tarihi sayfasındaki **tüm "Bilgi Al" butonları** → `/ddm-iletisim/...` (yok).
- Kurs tarihi ve üniversite sayfaları → `/sinav-hazirlik-egitimleri/{sinav}-kursu` (yok).
- Dil kursu sayfalarının alt linkleri (özel ders / online / nedir) → yok.
- Mega menü ve footer'daki hub'lar (`/yabanci-dil`, `/ingilizce-kurslari`, `/yurtdisi-egitim`,
  `/diger-program`, `/kurumsal-dil-egitim`, `/ddm-iletisim`) → yok.

---

## 2. Önceliklendirme ölçütü

1. **Ölü link / bozuk CTA** üretiyor mu? (dönüşüm ve UX)
2. **SEO değeri** (eski sitede sıralaması olan, arama hacmi yüksek sayfalar)
3. **Yeniden kullanım oranı** (hazır bileşen → düşük efor)
4. **Adet / efor** (tek şablon çok sayfa = yüksek getiri)

---

## 3. Sıralı plan

| # | Tip | ~Sayfa | Efor | Bağımlılık |
|---|---|---|---|---|
| **P1** | Şube İletişim | ~13 → ~7 sayfa + 6 Joomla 301 | M | — |
| **P2** | Sınav Hazırlık Kursu Ana | ~16 | M | P1 (CTA hedefi) |
| **P3** | Kategori Hub'ları | 6–7 | S | P2, P4 ile birlikte anlamlı |
| **P4** | Zengin İçerik Alt Sayfa | ~85–108 | L | Karar #1 |
| **P5** | İngilizce Seviye Kursu | 11 | S–M | Dil Kursu şablonu |
| **P6** | Şube Tanıtım | 4 | M | P1 (şube verisi) |
| **P7** | Öğrenci Yorumu + Duyuru (tekil + liste) | ~75 | M | Karar #2 |
| **P8** | Faz 8/9 + 6.7 Temizlik | — | L | Hepsi |

### P1 — Şube İletişim  ⏳
- **URL:** `/ddm-iletisim/{sube}` — `1-kadikoy`, `4-atasehir`, `3-levent`,
  `iletisim-2-bagdat-caddesi`, `umraniye`, `is-basvurusu-kariyer` + hub `/ddm-iletisim`.
  Eski Joomla: `/component/content/article/{id}-iletisim-sayfasi-{sube}` (6 kayıt, ~30 kelime,
  yalnız yönlendirme hedefi) + `65-levent-subesi-on-kayit-formu`.
- **Neden ilk:** 72 kurs-tarihi sayfasının ve footer/TopBar'ın CTA hedefi. Dönüşümün kalbi.
- **Şablon:** `PageHero` (sube modu) + `BranchInfoPanel` + `ContactFormCard` + harita bloğu +
  `data/branches.ts`. Şube sayfalarının kelime sayısı ~1300 — büyük olasılıkla gömülü
  harita/yol tarifi metni; **Aşama 0'da gövdenin gerçek yapısı çıkarılmalı**.
- **Veri riski:** adres/telefon eksikse `null` (CLAUDE.md §5) — uydurulmaz,
  `DataMissingNotice` gösterilir. Ön kayıt formu (Levent) ayrı karar: form backend'i yok.
- **Redirect:** 6 Joomla `component/content/article/...` → yeni `/ddm-iletisim/...`.
- **Kabul:** N/N sayfa 200, tek H1, `assertCoverage`, 72 kurs-tarihi sayfasındaki "Bilgi Al"
  linkleri artık 200'e gidiyor (link denetimi betiği).

### P2 — Sınav Hazırlık Kursu Ana  ⏳
- **URL:** `/sinav-hazirlik-egitimleri/{sinav}-kursu` — Proficiency, GRE, GMAT, SAT, YDS,
  YÖKDİL, TOEFL (+ Essentials, Primary), TESTDAF, TOEIC, IELTS, PTE Akademik, Almanca/Fransızca
  Aile Birleşimi, İngiltere Vize/IELTS Life Skills (≈16; `[kurs]` route'u `[sayfa]` ile
  yan yana yaşayacak — `app/sinav-hazirlik-egitimleri/[kurs]/page.tsx`).
- **Şablon:** Dil Kursu şablonunun kardeşi (`getLanguagePage` deseni → `lib/examContent.ts`
  + `data/exams.ts`). Proficiency ana sayfası, üniversite grid'ini (`UniversityGrid`) içerecek.
- **Dikkat:** kaynak kelime sayısı 86–1327, yapı heterojen → önce **Aşama 0 denetimi**
  (hangi sınavda hangi bölüm var), sonra tek pilot (TOEFL), onay, toplu.
- **Bağlantılar:** her sınav sayfası kendi kurs-tarihi sayfalarına (`LinkRow`) çıkar
  (72 sayfa bu tipe zaten link veriyor).

### P3 — Kategori Hub'ları  ⏳
- **URL:** `/yabanci-dil`, `/sinav-hazirlik-egitimleri`, `/ingilizce-kurslari`,
  `/yurtdisi-egitim`, `/diger-program`, `/kurumsal-dil-egitim` (+ `/ddm-iletisim` P1'de).
- **Şablon:** `PageHero` + kart grid'i (`LanguageGrid` / `MediaCard` deseni), alt sayfa
  linkleri `lib/nav.ts`'ten (tek kaynak). Metin birebir.
- **Sıra:** hub, alt sayfaları var olduktan sonra tamamlanır; iskelet P2 ile aynı anda
  kurulabilir.

### P4 — Zengin İçerik Alt Sayfa  ⏳ (en büyük kalan grup)
- **Kapsam:** Kurs alt içerik (`nedir`, `-2`, `egitim-sistemi`, `seviyeleri`, `ornek-sinav-sorulari`;
  ≈32–42), Özel Ders (16 konu; hepsi eski `?id=` Joomla + kısmen yeni path — çift URL),
  Online Eğitim (8), Yurtdışı Eğitim alt (11), Diğer Program alt (5), Kurumsal alt (Pegasus, 1).
- **Neden tek şablon:** yapı sabit değil, gövde "başlık + zengin metin". Faz 6.5'te
  kurulan başlık-tabanlı `SectionResolver` bu tipin omurgası olacak → `RichContentPage`
  + `lib/richContent.ts`; sağ/üst `StickyToc` (uzun sayfalar), `CtaBand` (bilgi al).
- **En riskli tip:** birebir-metin kuralı (CLAUDE.md §5) burada en kolay bozulur.
  `assertCoverage` zorunlu; hiçbir satır sessizce atılmaz.
- **Veri riskleri (belgeli):** "Online Çince Eğitimi" meta description'ı "İtalyanca..." diye
  başlıyor (bariz hata → düzeltilebilir, kullanıcıya bildirilir); Özel Ders'te aynı içerik
  iki URL'de → tek kanonik + 301 (Faz 8 kuralına girmeden tip fazında karar).
- **Redirect:** Özel Ders `?id=` 301'leri (query'li → tekil `has` kuralı, 6.6'daki
  `JOMLA_COURSE_DATES` deseni).

### P5 — İngilizce Seviye Kursu  ⏳
- **URL:** `/ingilizce-kurslari/{seviye}-ingilizce-kursu` (Elementary, Pre-Intermediate,
  Intermediate, Upper-Intermediate, Advanced; İlköğretim, Üniversite, YKS Dil, Yaz Okulu,
  Konuşma) + `ingilizce-egitim-sistemi` (yapı: P4 tipine daha yakın).
- **Şablon:** Dil Kursu bileşenleri (`PageHero`, `LevelExplorer`, `ProgressTrack`) — görsel şablon
  aynı, **veri modeli ayrı** (seviye ekseni): `data/englishLevels.ts`.

### P6 — Şube Tanıtım  ⏳
- **URL:** `/kadikoy-tanitim-sayfasi`, `/atasehir-tanitim-sayfasi`,
  `/cadde-tanitim-sayfasi`, `/levent-tanitim-sayfasi` (kök dizin; eski `.html` → temiz
  URL tekil 301 tip fazında).
- **Şablon:** uzun içerik (1500–1900 kelime) + galeri. **Görsel verisi yok**
  (`ImageSlot` + `DataMissingNotice`); galeri alanı kullanıcıdan görsel gelene kadar boş kalır.

### P7 — Öğrenci Yorumu + Duyuru  ⏳
- **URL:** `/ogrenci-yorumlari` (+ `?start=N` sayfalama → 301), `/ogrenci-yorumlari/{id}-{ad}`
  (51), `/duyurular` (+ 12 tekil `/duyurular/{id}-{slug}`).
- **Şablon:** kart grid + sayfalama (`TestimonialCard` var) + basit detay kartı.
- **Not:** meta description çoğu yorumda jenerik/aynı — metadata denetimi gerekir (Faz 8).
- **Karar #2** (aşağıda).

### P8 — Faz 8/9 + 6.7 Temizlik  ⏳
- Genel `.html → temiz URL` 301 kuralı + `urls.csv` ile kalan eşleme (istisnalar açık liste).
- Taşınmayacaklar: `component/tags/*` (2, ilgili kursa 301), `star-media` (ajans kredisi),
  `tanitim-icerik/*` (6 parça, ana sayfa bölümlerine zaten beslenmiş mi kontrol),
  `aktivite-aktiviteler` (tek seferlik — karar bekliyor).
- `sitemap.xml`, `robots.txt`, `next/image`, ölü `data-reveal`/`data-count` temizliği,
  metadata + canonical denetimi (CLAUDE.md §6), `h1-fallback` uyarılarının kapatılması
  (17 üniversite + aile birleşimi kayıtlarında kaynakta H1 yok — şu an ilk başlığa düşülüyor),
  Core Web Vitals, Search Console.

---

## 4. Çalışma kuralları (her tip için)

1. **Aşama 0 — denetim:** `site_content.json` kayıtlarını çıkar, gerçek yapı/katmanı çıkar,
   tahmini sayıyı kesinleştir. (Keyword taramasına güvenme.)
2. **1 pilot sayfa → kullanıcı onayı → toplu üretim.**
3. Route: `generateStaticParams` + `dynamicParams = false`; `metadata` 4 alanı veriden.
4. `assertCoverage` build'de geçmeli (kaynağın her satırı tüketildi / gerekçeli ignore).
5. Redirect'ler o tipin fazında `next.config.ts`'e girer.
6. Kabul: `tsc --noEmit` + `lint` + `build` temiz, N/N sayfa 200, tek H1,
   redirect'ler 308, bir link denetimi (ölü iç link yok).
7. `PROGRESS.md` kutucuğu + `page-types.md` Durum kolonu güncellenir.

---

## 5. Açık kararlar (kullanıcıya)

| # | Konu | Öneri |
|---|---|---|
| 1 | P1/P3/P4/P6/P7 şablonları için tasarım kaynağı: Claude Design turu mu (CLAUDE.md §9'un mevcut kuralı), yoksa mevcut atomlarla doğrudan kodda mı? | P1 ve P4 için kısa Design turu (gerçek içerikle); P3/P5/P7 mevcut atomlarla kodda |
| 2 | 51 yorum + 12 duyuru: tekil sayfa üretilsin mi, yoksa liste sayfasına 301 mi? | Tekil sayfalar üretilir (URL/SEO korunur, şablon ucuz) |
| 3 | Kurs tarihi sayfalarında ~170 ücret satırı yayınlanmıyor (6.6 kararı) — kalıcı mı? | Faz 9 öncesi bir kez daha teyit |
| 4 | Ön kayıt formu / iletişim formu: gönderim backend'i yok. Statik form mu, `mailto`/WhatsApp/harici form servisi mi? | P1 başlamadan karar |
| 5 | Şube galeri görselleri (P6) ve şube adres/telefon eksikleri kim sağlayacak? | Kullanıcı; gelene kadar `DataMissingNotice` |
