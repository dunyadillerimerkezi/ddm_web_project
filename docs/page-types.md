# Sayfa Tipi Haritası — Dünya Dilleri Merkezi

> Faz 1 çıktısı. `ddm-crawl/urls.csv` içindeki **384 gerçek URL** desenlerine göre
> gruplanmıştır (`Read`/`csv` ile satır satır ayrıştırıldı). Uydurma tip yok; her
> satır aşağıdaki tiplerden birine düşecek şekilde sınıflandırıldı ve toplam 384'e
> tam oturuyor.
>
> `PROGRESS.md`'deki başlangıç hipotezi 8-9 tip öngörmüştü; gerçek veri biraz daha
> parçalı çıktı (**16 tip**, ama bunların **7 tanesi** sayfaların ~%85'ini
> kapsıyor). Aşağıda önce "Ana Şablonlar" (yüksek adetli, mutlaka şablonlanacak),
> sonra "İkincil Şablonlar", en sonda "Tekil/Özel Sayfalar" var.

---

## Özet Tablo

| # | Sayfa Tipi | URL Deseni (örnek) | ~Adet | Temsili Örnek URL | Durum |
|---|---|---|---|---|---|
| 1 | Şube Kurs Tarihi Sayfası | `/{kategori}/{kurs}/{sube}-subesi-kurs-tarihi.html` | **84** | `/yabanci-dil-egitimleri/ingilizce-kursu/besiktas-subesi-kurs-tarihi.html` | ✅ 6.6 — 72 sayfa + 16 Joomla 301 |
| 2 | Öğrenci Yorumu (Tekil) | `/ogrenci-yorumlari/{id}-{ad-soyad}.html` | **51** | `/ogrenci-yorumlari/16-sibiya-sayeste.html` | ✅ P7 (2026-09-29) — tekil sayfa yok; 51 adres (43 yorum) → `/ogrenci-yorumlari` 301, yayındaki 25'inin adresi doğrudan kartına (`#yorum-{id}`) |
| 3 | Üniversite Proficiency Sayfası | `/sinav-hazirlik-egitimleri/proficiency-kursu/{universite}.html` (+ kök dizin eş kopyası) | **42** (21 üniversite × 2 URL) | `/sinav-hazirlik-egitimleri/proficiency-kursu/bogazici-universitesi.html` | ✅ 6.5 — 21 sayfa + 42 redirect |
| 4 | Kurs Alt İçerik Sayfası (Nedir / Program / Seviye / Örnek Sınav) | `/{kategori}/{kurs}/{kurs}-nedir.html`, `.../{kurs}-2.html` | **42** | `/sinav-hazirlik-egitimleri/sat-kursu/sat-nedir.html` | ✅ P4 — 8 nedir + 8 tekil (2026-09-26: program, seviye, eğitim sistemi, "zor mu", A1 ve proficiency örnek sınav; `proficiency-sinavi` → 301); 18 "-2" sayfası yayınlanmadı → kendi kurs sayfasına 301 |
| 5 | Özel Ders Sayfası | `/{kategori}/{kurs}/{kurs}-ozel-ders.html` (+ eski Joomla `?id=` varyantı) | **39** | `/yabanci-dil-egitimleri/fransizca-kursu/fransizca-ozel-ders.html` | ✅ P4 — 18 sayfa (9 dil + 9 sınav) + 21 Joomla `?id=` 301; `yds-ozel-ders-2` yayınlanmadı → 301 YDS Kursu |
| 6 | Sınav Hazırlık Kursu Ana Sayfası | `/sinav-hazirlik-egitimleri/{sinav}-kursu.html` | **16** | `/sinav-hazirlik-egitimleri/toefl-kursu.html` | ✅ 6.9 (P2) |
| 7 | Şube İletişim Sayfası | `/ddm-iletisim/{sube}.html` (+ eski `/component/content/article/...`) | **13** | `/ddm-iletisim/1-kadikoy.html` | ✅ P1 — hub + 5 sayfa + 6 Joomla 301 (form gövdesi sona bırakıldı) |
| 8 | Liste Sayfası | `/ogrenci-yorumlari.html?start=N`, `/duyurular.html` | **12** | `/ogrenci-yorumlari.html?start=12` | ½ P7 — `/ogrenci-yorumlari` ✅ (tek sayfa, 25 kart + süzgeç; `.html` ve tüm `?start=` → 301); `/duyurular` ⏳ |
| 9 | Duyuru Detay Sayfası | `/duyurular/{id}-{slug}.html` | **12** | `/duyurular/31-konusma-siniflari-speaking.html` | ⏳ P7 |
| 10 | Dil Kursu Ana Sayfası | `/yabanci-dil-egitimleri/{dil}-kursu.html` | **10** | `/yabanci-dil-egitimleri/ingilizce-kursu.html` | ✅ 6.4 — 10 sayfa |
| 11 | İngilizce Seviye Kursu Sayfası | `/ingilizce-kurslari/{seviye}-ingilizce-kursu.html` | **11** | `/ingilizce-kurslari/elementary-ingilizce-kursu.html` | ✅ P5 (9 sayfa; konuşma + eğitim sistemi 301) |
| 12 | Yurtdışı Eğitim Alt Sayfası | `/yurtdisi-egitim/{konu}.html` | **11** | `/yurtdisi-egitim/yaz-okullari.html` | ✅ P4 (2026-09-26) — 9 sayfa ("biniş kartı"); Yurtdışı Dil Eğitimi + Tercih Edilen Ülkeler → ana sayfa 301; `…/kanada-vancouver-2` → yeni `…/ingiltere` |
| 13 | Online Eğitim Sayfası | `/yabanci-dil-egitimleri/{dil}-kursu/online-{dil}-egitimi.html` | **8** | `/yabanci-dil-egitimleri/rusca-kursu/online-rusca-egitimi.html` | ✅ P4 (2026-09-25, + çatı `/diger-program/online-dil-egitimi`) |
| 14 | Kategori Hub Sayfası | `/{kategori}.html` (alt sayfa yok, kart listesi) | **6** | `/diger-program.html` | ✅ P3 — 7 hub (özel dersler dahil), `data/hubs.ts` + `lib/hubContent.ts` |
| 15 | Diğer Program Alt Sayfası | `/diger-program/{konu}.html` | **6** | `/diger-program/tercume-hizmetleri.html` | ✅ P4 (2026-09-26) — Business English, Çocuklar İçin İngilizce, Tercüme; `yurtdisinda-egitim` Work and Travel kopyası → 301 (özel dersler + online çatı daha önce) |
| 16 | Şube Tanıtım Sayfası | `/{sube}-tanitim-sayfasi.html` | **4** (+ Ümraniye yeni) | `/kadikoy-tanitim-sayfasi.html` | 🟡 P6 4/5 (2026-09-28; Ümraniye bilgi bekliyor) |
| 17 | Ana Sayfa | `/` | **1** | `/` | ✅ 6.3 |
| — | Tanıtım İçerik Parçası (fragment) | `/tanitim-icerik/{id}-{slug}.html` | 6 | `/tanitim-icerik/10-sistem.html` | ⛔ P8 kararı — P6 Aşama 0: eski tanıtım sayfalarının 6 sekmesinin içerikleri (sayfada yalnız başlıkları bağlantı olarak var) |
| — | Kurumsal / Özel İçerik Sayfası | `/kurumsal-dil-egitim.html`, `.../turkish-course-pegasus-pilots.html` | 2 | `/kurumsal-dil-egitim.html` | ✅ P3 (hub) / ✅ P4 (Pegasus, İngilizce sayfa, 2026-09-26) |
| — | Etiket (Tag) Sayfası — muhtemelen taşınmayacak | `/component/tags/tag/{slug}.html` | 2 | `/component/tags/tag/almanca-kursu.html` | ⛔ Taşınmaz — 301 |
| — | Diğer / Tekil Sayfalar — şablon gerektirmez | — | 2 | `/aktivite-aktiviteler.html`, `/star-media.html` | ⛔ Taşınmaz / P8 kararı |

**Toplam: 384 / 384 URL sınıflandırıldı.**

> **Durum (2026-09-21):** ✅ 4 tip kodda (Ana Sayfa, Dil Kursu, Üniversite Proficiency, Şube Kurs Tarihi — 106 statik sayfa). Kalanın önceliği (P1–P8), gerekçesi ve kabul kriterleri: [`remaining-pages-plan.md`](remaining-pages-plan.md). Not: bu dosyadaki adetler Faz 1 tahminidir; her tipin kesin sayısı o tipin "Aşama 0 denetimi"nde çıkarılır.

## Tasarım Şablonu Eşleştirmesi (Faz 4-5 için)

> 17 veri tipi ≠ 17 tasarım şablonu. Çoğu tip aynı görsel şablonu paylaşır.
> Faz 4-5'te tasarlanacak asıl şablon sayısı ~9.

| # | Tasarım şablonu | Kapsadığı veri tipleri | ~Sayfa |
|---|---|---|---|
| 1 | Ana sayfa | 17 | 1 |
| 2 | Kategori / Hub (kart listesi) | 14 | 6 |
| 3 | Kurs / Program landing | 6, 10, 11 | ~37 |
| 4 | Zengin içerik alt sayfa (esnek gövde) | 4, 5, 12, 13, 15, kurumsal | ~108 |
| 5 | Kurs tarihi (tablo/kısa sayfa) | 1 | 84 |
| 6 | Şube iletişim | 7 | 13 |
| 7 | Şube tanıtım (galeri) | 16 | 4 |
| 8 | Liste / grid (sayfalamalı) | 8 + yorum/duyuru index | ~12 |
| 9 | Basit detay kartı | 2, 9 | ~63 |
| 10 | Üniversite proficiency (ayrı şablon olarak yapıldı) | 3 | 42 |

**Not:** Tip 3 (proficiency) sınırda — şablon 4'e opsiyonel "sınav bilgi bloğu"yla
girebilir VEYA 42 sayfa olduğu için ayrı şablon yapılabilir. **Karar verildi: ayrı şablon** (Faz 6.5, `proficiency-kursu/[sayfa]`).
---

## 1. Şube Kurs Tarihi Sayfası — 84 sayfa (72 temiz URL + 12 eski Joomla URL'i; 4 şube × 18 kurs)

**URL deseni:** `/yabanci-dil-egitimleri/{dil}-kursu/{sube}-subesi-kurs-tarihi.html`
ve aynı şablon sınav taraf: `/sinav-hazirlik-egitimleri/{sinav}-kursu/{sube}-subesi-kurs-tarihi.html`
(+ henüz path'e taşınmamış ~26 tanesi eski Joomla `?view=article&id=...&catid=...` formunda, ama aynı içerik/şablon).

**Temsili örnek:** `/yabanci-dil-egitimleri/ingilizce-kursu/besiktas-subesi-kurs-tarihi.html`

**Değişken alanlar:**
- Şube adı (Kadıköy, Ataşehir, Levent–Etiler, Bağdat Caddesi, Ümraniye)
- Kurs/dil/sınav adı (İngilizce, Almanca, Fransızca, Rusça, İspanyolca, İtalyanca, Çince, Türkçe, Proficiency, TOEFL, TOEIC, GMAT, SAT, YDS...)
- Kurs başlangıç/dönem tarihleri
- Title / meta description / H1 (şube+kurs kombinasyonuna göre üretilmiş)
- Kelime sayısı (çoğunlukla 190-270 arası, kısa sayfa)

**Not:** En kalabalık tip — sitenin ~%23'ü. Faz 7'de önce bu üretilmeli.

---

## 2. Öğrenci Yorumu (Tekil) — 51 sayfa

**URL deseni:** `/ogrenci-yorumlari/{id}-{ad-soyad-veya-slug}.html`

**Temsili örnek:** `/ogrenci-yorumlari/386-bensu-esin.html`

**Değişken alanlar:**
- Öğrenci adı/soyadı
- Yorum metni (çoğu çok kısa, 26-160 kelime arası kart içeriği)
- Bazılarında başlıkta ilgili kurs/üniversite/sınav geçiyor (ör. "Bilgi Üniversitesi BİLET" yorumu)
- Title bazen sadece isim, meta description çoğunlukla jenerik ("Öğrenci yorumları mail formunu kullanarak...")

**Not:** Meta description çoğu sayfada aynı/jenerik — SEO taşımada bu alan özel olarak gözden geçirilmeli.

---

## 3. Üniversite Proficiency Sayfası — 42 sayfa (21 üniversite × 2 URL)

**URL deseni A (yeni/nested):** `/sinav-hazirlik-egitimleri/proficiency-kursu/{universite-slug}.html`
**URL deseni B (eski/kök):** `/{universite-slug}.html`

**Temsili örnek:** `/sinav-hazirlik-egitimleri/proficiency-kursu/bogazici-universitesi.html`

**Değişken alanlar:**
- Üniversite adı (Marmara, Boğaziçi, İTÜ, ODTÜ, Sabancı, Koç, Yeditepe, Bilgi, Bahçeşehir, Beykent, Işık, Okan, Kadir Has, Kocaeli, Maltepe, Doğuş, Özyeğin, Süleyman Şah, Acıbadem, İstanbul Şehir...)
- Üniversitenin kendi sınavının özel adı (TRACE, STEP, DÜİYES, BİLET, KUEPE, ELAE, BUEPT vb.)
- Odaklanılan beceri listesi (reading/writing/speaking/listening — üniversiteye göre değişiyor, bazılarında sadece 2-3 tanesi)
- Kelime sayısı geniş aralıkta (86-1077) — bazı üniversite sayfaları çok daha zengin içerikli

**⚠️ Veri kalitesi notu:** Her üniversite için **aynı içerik iki farklı URL'de** yaşıyor
(`/bogazici-universitesi.html` ve `/sinav-hazirlik-egitimleri/proficiency-kursu/bogazici-universitesi.html`).
Yeni sitede tek URL'e indirgenip diğeri 301 ile ona yönlendirilmeli (Faz 8'de
karar verilecek: hangi path kalıcı URL olacak).

---

## 4. Kurs Alt İçerik Sayfası (Nedir / Program Detayı / Seviye / Örnek Sınav) — 42 sayfa

**URL deseni:** `/{kategori}/{kurs}/{kurs}-nedir.html`, `.../{kurs}-kursu-2.html`,
`.../{kurs}-egitim-sistemi.html`, `.../{kurs}-seviyeleri.html`, `.../ornek-sinav-sorulari.html` vb.

**Temsili örnek:** `/sinav-hazirlik-egitimleri/gre-kursu/gre-kursu-2.html`

**Değişken alanlar:**
- Konu adı (dil veya sınav)
- Alt sayfa türü (Nedir? / Program detayı / Seviye açıklaması / Örnek sınav sorusu / Eğitim sistemi)
- Serbest metin gövdesi (bu tipte gövde uzunluğu ve yapı en değişken olanı — tek bir katı şablon yerine "başlık + zengin metin" gibi esnek bir şablon gerekebilir)

**Not:** Bu tip aslında "kurs ana sayfasının" ek/destek içerikleri — en heterojen grup, Faz 5'te şablon tasarlarken en esnek content-block yapısı bu tipe verilmeli.

---

## 5. Özel Ders Sayfası — 39 sayfa

**URL deseni (yeni):** `/{kategori}/{kurs}/{kurs}-ozel-ders.html`
**URL deseni (eski/Joomla):** `/diger-program/ozel-dersler.html?view=article&id={id}:{slug}-ozel-ders&catid=48`

**Temsili örnek:** `/yabanci-dil-egitimleri/fransizca-kursu/fransizca-ozel-ders.html`

**Değişken alanlar:**
- Konu adı (16 farklı dil/sınav: İngilizce, Almanca, Fransızca, Rusça, İtalyanca, İspanyolca, Çince, Türkçe, Proficiency, GRE, GMAT, SAT, TOEFL, TOEIC, IELTS, PTE)
- Format açıklaması (birebir, online/yüz yüze seçenekleri)

**⚠️ Veri kalitesi notu:** 16 konunun tamamı hâlâ eski `?id=` sorgu URL'sinde
yaşıyor (`/diger-program/ozel-dersler.html?...`), bir kısmı ayrıca yeni path
formunda da var → içerik çakışması/duplikasyon var, Faz 8'de tekilleştirilmeli.

---

## 6. Sınav Hazırlık Kursu Ana Sayfası — 16 sayfa

**URL deseni:** `/sinav-hazirlik-egitimleri/{sinav}-kursu.html`

**Temsili örnek:** `/sinav-hazirlik-egitimleri/toefl-kursu.html`

**Değişken alanlar:**
- Sınav adı (Proficiency, GRE, GMAT, SAT, YDS, YÖKDİL, TOEFL, TOEFL Essentials, TOEFL Primary, TESTDAF, TOEIC, IELTS, PTE Akademik, Almanca Aile Birleşimi, Fransızca Aile Birleşimi, İngiltere Vize Sınavı/IELTS Life Skills)
- Sınav açıklaması / program içeriği
- Hangi şubelerde verildiği (şube listesi meta description'da tekrar ediyor)
- Kelime sayısı 86-1327 arası geniş

---

## 7. Şube İletişim Sayfası — 13 sayfa

**URL deseni (yeni):** `/ddm-iletisim/{sube}.html`
**URL deseni (eski/Joomla):** `/component/content/article/{id}-iletisim-sayfasi-{sube}.html?Itemid=...&catid=46`
(+ 1 adet "ön kayıt formu" varyantı: `/component/content/article/65-levent-subesi-on-kayit-formu.html`)

**Temsili örnek:** `/ddm-iletisim/1-kadikoy.html`

**Değişken alanlar:**
- Şube adı (Kadıköy, Ataşehir, Levent–Etiler, Bağdat Caddesi, Ümraniye)
- Adres, telefon, harita/yol tarifi bilgisi
- Bazılarında kelime sayısı çok yüksek (1300+) — muhtemelen gömülü harita/iframe metni

**⚠️ Veri kalitesi notu:** Aynı şube için hem yeni (`/ddm-iletisim/...`) hem eski
Joomla (`/component/content/article/...`) URL'i var → tekilleştirme gerekiyor.

---

## 8. Liste Sayfası — 12 sayfa

**URL deseni:** `/ogrenci-yorumlari.html?start={N}` (sayfalama), `/duyurular.html`

**Temsili örnek:** `/ogrenci-yorumlari.html?start=12`

**Değişken alanlar:**
- Sayfa numarası / offset (`?start=`)
- Listelenen kart sayısı ve içeriği (öğrenci yorumu veya duyuru özetleri)
- Title/meta description tüm sayfalama varyantlarında **aynı** ("Öğrenci Yorumları" / jenerik metin)

**P7 (2026-09-29):** öğrenci yorumları sayfalamasız tek sayfa oldu (`/ogrenci-yorumlari`, "C · portre duvarı": 25 kart,
program süzgeci, tam metin açılır pencerede). Aşağıdaki not eski öngörü.

**Not:** Yeni sitede bu tip muhtemelen query-param'lı sayfalama yerine tek bir
`/ogrenci-yorumlari` sayfasında client-side/infinite-scroll veya `/ogrenci-yorumlari?page=N`
App Router pattern'ine dönüşecek — tasarımda "kart grid + sayfalama" bileşeni olarak ele alınmalı.

---

## 9. Duyuru Detay Sayfası — 12 sayfa

**URL deseni:** `/duyurular/{id}-{slug}.html`

**Temsili örnek:** `/duyurular/425-yks-dil-sinavi-basvuru-tarihleri.html`

**Değişken alanlar:**
- Duyuru başlığı
- Duyuru metni (çoğu çok kısa: 27-208 kelime)
- Duyuru konusu (kampanya, tatil bilgisi, sınav başvuru tarihi, kurs kampanyası)

---

## 10. Dil Kursu Ana Sayfası — 10 sayfa

**URL deseni:** `/yabanci-dil-egitimleri/{dil}-kursu.html`

**Temsili örnek:** `/yabanci-dil-egitimleri/ingilizce-kursu.html`

**Değişken alanlar:**
- Dil adı (İngilizce, Almanca, Fransızca, İspanyolca, İtalyanca, Rusça, Çince, Flemenkçe, Türkçe/Yabancılar İçin, İngilizce Konuşma)
- Program/seviye açıklaması
- Kaç şubede verildiği (title/meta'da "5 şubemizde" gibi geçiyor)
- Kelime sayısı 74-941 arası

---

## 11. İngilizce Seviye Kursu Sayfası — 11 sayfa

**URL deseni:** `/ingilizce-kurslari/{seviye}-ingilizce-kursu.html`

**Temsili örnek:** `/ingilizce-kurslari/elementary-ingilizce-kursu.html`

**Değişken alanlar:**
- Seviye adı (Elementary, Pre-Intermediate, Intermediate, Upper-Intermediate, Advanced) veya hedef kitle (İlköğretim, Üniversite Hazırlık, YKS Dil, Yaz Okulu, Konuşma)
- Seviye/hedef kitle açıklaması

**Not:** "Dil Kursu Ana Sayfası" (tip 10) ile aynı ana kategori altında ama farklı
bir eksende (dil bazlı değil, İngilizce'ye özel seviye bazlı) kırılım — Faz 5'te
aynı görsel şablonu paylaşabilir, ayrı veri modeli gerekir.

**Durum (P5, 2026-09-27/28):** 9 sayfa üretildi — seviye 5 (`EnglishLevelPage`, `data/englishLevels.ts`) ve hedef kitle 4
(`EnglishProgramPage`, `data/englishPrograms.ts`), tek route `app/ingilizce-kurslari/[sayfa]`. `ingilizce-konusma-kursu` →
`/yabanci-dil-egitimleri/ingilizce-konusma-kursu` (301, kullanıcı kararı); `ingilizce-egitim-sistemi` → P4 kanonik (301).
9 sayfada ortak eski site şablonu (şube satırları + program listesi) `resolveTemplate` ile tek yerde çözülür.

---

## 12. Yurtdışı Eğitim Alt Sayfası — 11 sayfa

**URL deseni:** `/yurtdisi-egitim/{konu}.html` (bazıları 2 seviye derin: `/yurtdisi-egitim/tercih/{ulke}.html`)

**Temsili örnek:** `/yurtdisi-egitim/yaz-okullari.html`

**Değişken alanlar:**
- Konu/program adı (Yaz Okulları, Yurtdışı Dil Eğitimi, Yüksek Öğrenim, Pathway Programı, Work and Travel, Sınav Hazırlık) veya ülke/şehir adı (Kanada Vancouver, İtalya)
- İçerik uzunluğu ve yapısı en değişken tiplerden biri (144-1173 kelime)

**Not:** İçerik türü bakımından en heterojen ikincil tiplerden — bazıları kısa
program tanıtımı, bazıları uzun ülke rehberi. Tek katı şablon yerine esnek
içerik bloğu düşünülmeli.

---

## 13. Online Eğitim Sayfası — 8 sayfa

**URL deseni:** `/yabanci-dil-egitimleri/{dil}-kursu/online-{dil}-egitimi.html`

**Temsili örnek:** `/yabanci-dil-egitimleri/rusca-kursu/online-rusca-egitimi.html`

**Değişken alanlar:**
- Dil adı (Çince, İtalyanca, Rusça, İspanyolca, Fransızca ve diğerleri)
- Online eğitim formatı açıklaması

**Not:** İçeriklerde kopyala-yapıştır izleri var (ör. "Online Çince Eğitimi" başlıklı
sayfanın meta description'ı "Online İtalyanca eğitimi..." diye başlıyor) —
içerik taşınırken bu tutarsızlıklar olduğu gibi korunacak (görev gereği metin
birebir taşınacak) ama kullanıcıya not düşülmeli.

---

## 14. Kategori Hub Sayfası — 6 sayfa

**URL deseni:** `/{kategori}.html` (alt klasörü olan ama kendisi liste/tanıtım sayfası)

**Örnekler:** `/sinav-hazirlik-egitimleri.html`, `/ddm-iletisim.html`, `/diger-program.html`,
`/ingilizce-kurslari.html`, `/yurtdisi-egitim.html`, `/yabanci-dil.html`

**Değişken alanlar:**
- Kategori başlığı
- Tanıtım metni
- Alt kurs/kategori kartları listesi (link + başlık + kısa açıklama)

---

## 15. Diğer Program Alt Sayfası — 6 sayfa

**URL deseni:** `/diger-program/{konu}.html`

**Temsili örnek:** `/diger-program/tercume-hizmetleri.html`

**Değişken alanlar:**
- Program adı (Tercüme Hizmetleri, Business English, Yurtdışında Eğitim/WAT, Online Dil Eğitimi, Çocuklar İçin İngilizce)
- Program açıklaması

---

## 16. Şube Tanıtım Sayfası — 4 sayfa

**URL deseni:** `/{sube}-tanitim-sayfasi.html`

**Örnekler:** `/kadikoy-tanitim-sayfasi.html`, `/atasehir-tanitim-sayfasi.html`,
`/cadde-tanitim-sayfasi.html`, `/levent-tanitim-sayfasi.html`

**Değişken alanlar:**
- Şube adı
- Tanıtım metni
- Kelime sayısı çok yüksek (1800+ bazılarında) — muhtemelen görsel galeri/harita metni de dahil

**Not:** PROGRESS.md hipotezinde "Şube tanıtım / iletişim" tek tip varsayılmıştı;
gerçekte **Şube Tanıtım** (4 sayfa, uzun galeri/tanıtım içerikli) ile **Şube
İletişim** (13 sayfa, adres/telefon/harita odaklı) belirgin şekilde farklı
şablonlar — ayrı tutulmalı.

---

## 17. Ana Sayfa — 1 sayfa

**URL:** `/`

**Değişken alanlar:**
- Hero başlık/alt başlık, CTA metinleri
- Dil kursu kartları (yaklaşık 19 dil/program)
- Şube listesi
- Öğrenci yorumu vitrini (öne çıkan birkaç yorum)

---

## Şablon Gerektirmeyen / Düşük Öncelikli Sayfalar

Bu URL'ler ya tek seferlik ya da yeni sitede muhtemelen taşınmayacak içerikler —
Faz 5-7'de ayrı şablon tasarlamaya değmez:

- **Tanıtım İçerik Parçası** (6 sayfa, `/tanitim-icerik/{id}-{slug}.html`) — ana
  sayfadan parçalanmış kısa metin blokları gibi görünüyor (`10-sistem.html`,
  `plan-10.html`, `10-ozel.html`...). İçeriği muhtemelen Ana Sayfa şablonunun
  bir bölümüne (ör. "Neden DDM?" bölümü) besleme olarak kullanılabilir.
- **Kurumsal / Özel İçerik Sayfası** (2 sayfa) — `/kurumsal-dil-egitim.html`
  (kategori hub'a benzer) ve altındaki tek seferlik `turkish-course-pegasus-pilots.html`
  (Pegasus pilotlarına özel program — tekil sayfa).
- **Etiket (Tag) Sayfası** (2 sayfa, `/component/tags/tag/{slug}.html`) — Joomla'nın
  otomatik ürettiği etiket sayfaları, gerçek içerik değil; yeni sitede
  **taşınmasına gerek yok**, sadece eski URL'ler 301 ile ilgili kurs sayfasına
  yönlendirilebilir.
- **Diğer / Tekil Sayfalar** (2 sayfa) — `/aktivite-aktiviteler.html` (tek seferlik
  aktivite duyurusu) ve `/star-media.html` (site tasarımını yapan ajansın kredi
  sayfası — muhtemelen yeni sitede **hiç taşınmayacak**).

---

## Genel Notlar / Faz 8'e Taşınacak Bulgular

1. **Duplikasyon:** Üniversite Proficiency (tip 3), Özel Ders (tip 5) ve Şube
   İletişim (tip 7) sayfalarının önemli bir kısmı **aynı içerik için 2 farklı
   URL** barındırıyor (eski Joomla query/kök-path formatı vs. yeni path formatı).
   Faz 8'de tek kanonik URL seçilip diğeri 301 ile ona yönlendirilmeli.
2. **En kalabalık 3 tip** (Şube Kurs Tarihi, Öğrenci Yorumu, Üniversite
   Proficiency) tek başına sayfaların **~%47**'sini oluşturuyor — Faz 7'de üretim
   sırası bu üçüyle başlamalı (PROGRESS.md'deki öneriyle uyumlu).
3. **En heterojen tipler** (Kurs Alt İçerik Sayfası, Yurtdışı Eğitim Alt Sayfası)
   içerik uzunluğu/yapısı bakımından geniş varyasyon gösteriyor — bunlar için
   şablon tasarımında esnek content-block yaklaşımı (sabit alanlar yerine
   zengin metin alanı) düşünülmeli.
## İçerik Taşıma Kuralı
- Gövde metinleri BİREBİR korunur (SEO).
- İstisna — sadece BARİZ metadata hataları düzeltilir (bu bir iyileştirmedir):
  - yanlış dile/konuya atıf yapan meta description (ör. Online Çince → "İtalyanca")
- boş title / boş meta description
- Şüpheli / "içerik olabilir" hiçbir şeye dokunulmaz; sadece kesin hatalar.
