# Nerede Kaldık — Oturum Devir Dökümanı

> **Her yeni chat İLK bu dosyayı okur, SON bu dosyayı günceller.**
> §A her oturum sonunda **üzerine yazılır** (tek doğru güncel durum).
> §D **yalnız eklenir** (en yeni üstte). Yol haritası: [`remaining-pages-plan.md`](remaining-pages-plan.md).
> Kurallar: [`../ddm-web/CLAUDE.md`](../ddm-web/CLAUDE.md). Faz durumu: [`../PROGRESS.md`](../PROGRESS.md).

---

## §A — Güncel durum  *(son güncelleme: 2026-09-28, P6 · Şube Tanıtım — 4 sayfa bitti, Ümraniye bilgi bekliyor; commit kullanıcı onayında)*

| Alan | Değer |
|---|---|
| **Son kod commit'i** | `0e81888` (kullanıcı; P5 dahil). **P6 kodu çalışma ağacında, commit'lenmedi** — kullanıcıya sorulacak. |
| **Son döküman commit'i** | `0e81888`; P6 döküman güncellemeleri commit'lenmedi |
| **Build durumu** | `tsc --noEmit` ✅ · `lint` ✅ · `npm run build` ✅ (**206 statik sayfa**, 202'den; Ümraniye gelince 207) · `check-links` **3 benzersiz / 204 çift** (değişmedi; yalnız P7) · sitemap'te 4 tanıtım adresi · 4 sayfa × 1440/390/360 taşma yok, tek H1, konsol temiz · 478–537 görünen / 547–864 toplam kelime |
| **Tamamlanan tipler** | Ana Sayfa · Dil Kursu 10 · Üniversite Proficiency 21 · Şube Kurs Tarihi 72 · Şube İletişim hub+5 (form hariç; 2026-09-28 yeni görünüm "A · hızlı iletişim") · Sınav Hazırlık Ana 16 · Menü (PM) · Kategori Hub'ları 7 (P3) · P4 · P5 İngilizce Kursları 9 · **P6 Şube Tanıtım 4/5** (Kadıköy, Bağdat Caddesi, Levent / Etiler, Ataşehir) |
| **Aktif faz** | P6 — Ümraniye kaldı (kaynakta tanıtım kaydı yok, bilgi kullanıcıdan) |
| **Bir sonraki somut adım** | Kullanıcının toplu cevaplarını al (aşağıda "Bekleyen kullanıcı kararları") → `data/branchPromo.ts`'e Ümraniye tanımı (`source: null`, kapsama muaf — `lib/branchPromoContent.ts` `resolve()` şu an kaynaksız tanımı reddediyor, o dal yazılacak) + `data/branchPromoPaths.ts` satırı + `app/umraniye-tanitim-sayfasi/page.tsx`. |
| **Yarım kalan iş** | **Ümraniye tanıtım sayfası** — kod yazılmadı (yarım kod yok). Beklenen: fotoğraflar (dış cephe + 2–3 iç mekân), açılış yılı (Ana Sayfa kaynağı "15 yıllık tecrübe" diyor), açılan diller / programlar, derslik/kapasite, otopark, kurs takvimi yayınlanacak mı. Ulaşım araştırıldı: M8 Mevlana ~1,3 km (yürüme mesafesinde metro yok), M12 yapımda. |
| **Engeller** | Kalan 3 ölü hedef: `/ogrenci-yorumlari` (footer), `/aktivite-aktiviteler`, `/duyurular` → P7 |
| **Bekleyen kullanıcı kararları** | **Tam liste: [`bekleyen-sorular.md`](bekleyen-sorular.md)** (kullanıcı toplu soracak). Özet — **P6:** dil listesi çelişkisi (Kadıköy 9 dil, Ataşehir 8, Levent 15, menü 10, footer "19 farklı dil") · "25 yıl" (Bağdat Caddesi başlığı + Levent maddesi) ↔ "2003'ten bu yana" · Levent metni "Etiler" diyor, adres Levent tarafında (Nispetiye Cad., PK 34330) · `sube-1..5.jpeg` iç mekân fotoğraflarının şubesi (şu an kullanılmıyor) · "Öğrenme Garantisi" bağlantısı (ayrı sayfa yok, Eğitim Sistemi'ne gidiyor) · Ümraniye bilgileri · JSON-LD `LocalBusiness` (#6) · **Önceki fazlardan:** İngilizce Kursları hub B2 etiketi · `summer_school.jpg` 800×450 · Çocuklar İçin İngilizce 6/5 saat · Kaplan ortaklığı / rakamları · Yurtdışı Enforex · üniversite sayfalarında eski sınav adları · GMAT/GRE grup büyüklüğü · online çatı fotoğrafı · #2 yorum/duyuru · #4 form |
| **Bilinen veri notları** | P6: form + KVKK (1249 kelime) 4 kayıtta birebir — %75 benzerliğin kaynağı; gerçek tanıtım metinleri %3–10 benzer. Kaynakta h1 yok → şube adını taşıyan satır H1 (Levent'te "Etiler Şubesi" → "Levent / Etiler Şubesi" `edits`). Kurs tarihi sayfalarındaki tarihler 2022'den (P6 yalnız bağlantı veriyor). Eski sitede Ataşehir harita işaretçisi Maltepe'yi gösteriyor — kullanılmadı; harita sorgusu `data/branches.ts` adresinden (posta kodu atılarak). `kadikoy.jpg`'de "@bildrone" filigranı (kullanıcı: "boşver"). 6 `tanitim-icerik/*` kaydı = eski tanıtım sayfalarının 6 sekmesinin içerikleri (Faz 8). İzlenmeyen: `public/assets/summer_school.jpg`, kök ve `ddm-web/` altında `r3/` |
| **Kalıcı kurallar** | P4/P5/P6 içerik kuralı (CLAUDE.md §5; P6: firma metni birebir "Ayrıntılı bilgi"de, üstteki kısa metinler kaynak parçası `match`) · P6 tasarım (CLAUDE.md §9, "B · şube künyesi") · `soon` bayrağı (§10) · **sayfada düz yazı yok** · **içerik soruları iş bitince toplu sorulur** (hafıza) |


**Sonraki oturum prompt'u (kullanıcıya verilecek, 2026-09-28):**

```
P6 devam · Ümraniye tanıtım sayfası (/umraniye-tanitim-sayfasi) + P6 toplu soruların cevapları.

OTURUM BAŞI
- Oku: docs/SESSION-HANDOFF.md §A (Bekleyen kararlar + Yarım kalan iş), ddm-web/CLAUDE.md §5 (P6), §9 (P6 notu),
  docs/remaining-pages-plan.md §5 P6. git status / git log -5. Türkçe ve kısa yaz.

YAPILANLAR (örnek al)
- data/branchPromo.ts (4 tanım, blok listesi: intro / programs / highlights / corporate / gallery), lib/branchPromoContent.ts
  (createGuideResolver + Excerpt.match bekçisi + kapsama), BranchPromoPage + BranchMap, 4 kök klasör, data/branchPromoPaths.ts.

BU OTURUMUN İŞİ
- Kullanıcının cevaplarını uygula (dil listesi, 25 yıl, Etiler/Levent adı, sube-1..5 fotoğrafları, Öğrenme Garantisi).
- Ümraniye: kaynak kaydı yok → source: null dalı (assertCoverage muaf, metin kullanıcıdan; uydurma yok). Fotoğraf yoksa ImageSlot.
  Kurs tarihi verisi yok → bölüm gösterilmez. Build 206 → 207, check-links 3'te kalmalı.
- İletişim → Ümraniye sayfasından ve Ana Sayfa kartından bağlantı (data/branchPromoPaths.ts'e satır eklemek yeterli).

KAPANIŞ: SESSION-HANDOFF §A + §D, PROGRESS, page-types, plan P6. Commit'i kullanıcıya sor; kod ve döküman ayrı; push yok.
```

---

## §B — Oturum BAŞLANGIÇ protokolü

1. **Oku (bu sırayla):**
   1. bu dosyanın §A'sı
   2. `ddm-web/CLAUDE.md` (kurallar sözleşmesi)
   3. `docs/remaining-pages-plan.md` → aktif P bölümü
   4. varsa o fazın `docs/faz6.X-*-prompt.md` dosyası
2. **Teyit et:** `git status`, `git log --oneline -5`. §A'daki commit'le uyuşmuyorsa
   önce kullanıcıya söyle.
3. **Next.js uyarısı** (`ddm-web/AGENTS.md`): bu sürüm eğitim verisinden farklı. API
   kullanmadan önce `ddm-web/node_modules/next/dist/docs/` altındaki ilgili rehberi oku.
4. **Skill'leri yükle:** aktif P bölümündeki "Skill hatırlatmaları"na bak. UI yazılacaksa
   `frontend-design:frontend-design` her zaman.
5. **Aşama 0 denetimi yapılmadan kod yazılmaz.** Kesin adet ve yapı `site_content.json`'dan
   betikle çıkarılır; tahmine güvenilmez.
6. Kullanıcıya kısa bir özet ver: "§A'ya göre şuradayız, şimdi şunu yapacağım."

## §C — Oturum KAPANIŞ protokolü (atlanmaz)

1. **Doğrula:** `cd ddm-web && npx tsc --noEmit && npm run lint && npm run build`.
   `scripts/check-links.mjs` varsa onu da çalıştır. Sonuçları §A "Build durumu"na yaz.
2. **§A'yı üzerine yaz.** Her alan dolu olmalı; "Bir sonraki somut adım" tek cümle ve
   uygulanabilir olsun (dosya adı + ne yapılacak).
3. **§D'ye kayıt ekle** (şablon aşağıda, en yeni en üstte).
4. `PROGRESS.md` kutucuklarını ve `docs/page-types.md` Durum kolonunu güncelle.
   Yeni bir kalıcı kural varsa `ddm-web/CLAUDE.md`'ye işle.
5. **Commit:** kod ve döküman **ayrı commit'ler** (kullanıcı tercihi). Önce kod, sonra
   döküman. Push **yok** (kullanıcı ayrıca istemedikçe).
6. Yarım iş kaldıysa §A "Yarım kalan iş"e dosya, satır ve ne eksik olduğunu yaz. Yarım
   kodu commit'leme; kullanıcıya sor.

---

## §D — Oturum günlüğü  *(en yeni üstte, yalnız eklenir)*

### 2026-09-28 · Opus 5.5 · UI turu — Proficiency üniversite sayfaları (21, "A · sınav akışı") — commit bekliyor
- **Sorun (kullanıcı + teşhis):** hero çizimi her sayfada aynı ve 7 sayfada yanlış ("3 bölüm" ↔ 2), "tarih bekleniyor"
  tablosu + VERİ EKSİK kutusu, gönderilemeyen "Ön Bilgi Formu", 9 üniversitede çok az içerik, gri/beyaz bant + düz yazı.
- **Karar (kullanıcı):** 3 yön (A sınav akışı / B cevap kâğıdı / C üniversite rozeti) → **A**.
- **Yeni:** `UniversityHero`, `UniversityBody`, `lib/universityFlow.ts`, `data/universityExams.ts` (9 üniversite: Beykent,
  Maltepe, Okan, Bahçeşehir, ODTÜ, Bilgi, YTÜ, Kadir Has, Marmara — resmi sayfa / yönerge, kaynak yorumda; güncel ad,
  bölümler, 3 bilgi, 4–5 soru-cevap). `ExamRows`'tan `Row` / `ProseBody` / `Answer` dışa açıldı (`ProseBody emphasis`).
  `ExamSectionCard`: detay çapası yoksa "Bölüm detayını oku" basılmaz (eskiden `#iletisim`e gidiyordu). Izgarada güncel
  kısa ad rozeti. `PROF_UNIVERSITIES` dışa açıldı; ODTÜ ve Kadir Has resmi örnek bağlantıları eklendi.
- **Bulgu:** araştırılan 9 sayfanın 7'sinde kaynak metin sınavın ESKİ biçimini anlatıyor (Okan, BAU, ODTÜ, Bilgi, YTÜ,
  Kadir Has, Marmara; Beykent ve Maltepe güncel) → metne dokunulmadı, "Güncel durum" notu + güncel kartlar.
- **Kullanılmayan:** `DetailSections`, `ContactFormCard`, `ScheduleTable` (silme kararı kullanıcıda).
- **Devamı (kullanıcı: "araştırmaları yap"):** kalan 10 üniversite de eklendi → `data/universityExams.ts` 19 kayıt (kapanan
  İstanbul Şehir ve Süleyman Şah hariç). 10'unun da kaynak metninde eskimiş bilgi var (Sabancı ve Yeditepe'de biçim aynı,
  ayrıntılar eski). Boğaziçi tek IELTS kabul eden üniversite (Academic 6,5). Acıbadem'in güncel adı ACUPEP PPT ("AYES" resmi değil).
- **Doğrulama:** tsc ✅ · lint ✅ · build ✅ 206 · 21 sayfa × 1440/390/360: taşma yok, tek H1, "bekleniyor" / form yok, konsol temiz.

### 2026-09-28 · Opus 5.5 · UI turu — Sınav Hazırlık (16 sayfa, "A · optik form") — commit bekliyor
- **Sorun (kullanıcı):** "başlık ve yazı hep tek düze, hareket yok, okuyası gelmiyor". Teşhis: metin sol yarıda, 11 bölüm aynı
  kalıp + gri/beyaz bant, madde duvarları, önemli rakamlar paragrafta gömülü, her sınavda aynı bina çizimi.
- **Karar (kullanıcı):** 3 yön (A optik form / B hedef puan yolu / C sınav panosu) → **A**. "Bilgi yetersizse internetten araştır;
  firmayı etkileyen içeriği bozma."
- **Yeni:** `ExamHero` (+ `data/examGlance.ts`, 14 sınav; 7'si bu turda resmi kaynaktan doğrulandı: YÖKDİL, TOEFL Essentials,
  IELTS Life Skills A1, TestDaF, TOEFL Primary, Start Deutsch 1), `ExamRows` / `ExamText` / `ExamTabs`; `FactCardGrid`,
  `ExamSectionGrid`, `BranchDateList` ilgili bileşenlerden ayrıldı (dış görünüm aynı). `ListHint` (`lead` / `groups` / `groupsAs`).
  Token: `--ddm-exam-*`, `--ddm-touch-min`, `--duration-bubble`, `--delay-bubble-*`, `--kf-bubble` (+ `ddmBubble`).
- **Düzeltilen hatalar:** IELTS "Sınav günü" bölümü bölüm bilgilerini ikinci kez basıyordu · TOEIC'te Joomla e-posta uyarısı
  sayfadaydı · 14 "Nedir / Özel Ders / Örnek Sorular" satırı "Sayfa hazırlanıyor" diyordu (P4'te yayınlanmışlardı) →
  `extraHrefs` + kullanılmayan anahtar build'i düşürür · YDS "150 dakika" → 180 (ÖSYM 2026, `edits`).
- **Devamı (kullanıcı):** "Diğer sınavlar" kartları → `ExamDirectory` (4 grup, `EXAM_GROUPS`; `LinkRow` sınav sayfasından çıktı).
  Almanca aile birleşimi (kurs zorunlu değil · Start Deutsch 1 / ÖSD · 12 ay · SGB II), TOEFL Primary (8 yaş+, kâğıt ya da
  dijital, konuşma / yazma testleri, puanlama), TestDaF (sonuç portalda) `edits` ile düzeltildi.
- **Açık:** Fransızca aile birleşimi (başvuru öncesi sınav 2016'da kalktı — kullanıcı "not al") · TOEFL Essentials "%50/%50"
  → `bekleyen-sorular.md`.
- **Doğrulama:** tsc ✅ · lint ✅ · build ✅ 206 · 16 sayfa × 1440/390/360: taşma yok, tek H1, konsol / 4xx yok.

### 2026-09-28 · Opus 5.5 · UI turu — Şube İletişim (hub + 5 şube) — commit bekliyor
- **Sorun:** şube sayfalarında boş "sube-foto" / "sube-harita" yer tutucuları, şubeyle ilgisiz takvim çizimi, harita / ulaşım /
  WhatsApp numarası yok; hub'da fotoğrafsız kartlar, Ümraniye tek başına alt satırda, "Kayıt Ol" → `#kayit` ölü çapa.
- **Karar (kullanıcı):** 2 yön (A hızlı iletişim / B harita önde) → **A**. Hub önerisi (semt fotoğraflı 3 + 2 kart) birlikte.
- **Yeni:** `BranchContactPage` (açık hero, ara / WhatsApp / e-posta / yol tarifi kutuları, semt fotoğraflı kart + "şubeyi tanıyın",
  harita + `TransitList`, diğer şubeler), `BranchHub`; ortak veri `data/branchPhotos.ts` (Ana Sayfa + tanıtım + iletişim),
  `data/branchTransit.ts` (Ümraniye dahil 5 şube; tanıtımdaki `visit.transit` buraya taşındı), `mapQuery` / `directionsHref`
  (`data/branches.ts`). Silinen (artık kullanılmıyor): `BranchInfoPanel`, `BranchTile` (+ CSS). Metinler (H1 / açıklama) P1'deki gibi.
- **Doğrulama:** tsc ✅ · lint ✅ · build ✅ 206 · check-links 3/204 · 6 sayfa × 1440/390/360 taşma yok, tek H1, konsol temiz.

### 2026-09-28 · Opus 5.5 · P6 — Şube Tanıtım (4/5 sayfa) — commit bekliyor, Ümraniye bilgi bekliyor
- **Aşama 0:** 4 kayıt 1582–1912 kelime; ~1250 kelimesi form + KVKK (4'ünde birebir, P1 kararıyla yayınlanmıyor) → ölçülen
  %65–82 benzerliğin kaynağı bu; gerçek tanıtım metni Kadıköy ~590, Levent ~555, Cadde ~315, Ataşehir ~270 kelime, aralarında
  %3–10 benzerlik. Ortak tek blok eski sitenin 6 sekme başlığı (içerikleri `tanitim-icerik/*`). Kaynakta h1 yok, h5 paragraf.
  Yeni bulgular: Levent'te de "25 yılı aşkın", Levent 15 dil sayıyor, Ana Sayfa kartında "Levent Beşiktaş", `ümraniye.jpg` var
  (saat kulesi), kurs tarihleri 2022'den, eski sitede Ataşehir harita işaretçisi Maltepe'de.
- **Kararlar (kullanıcı):** menüye dokunulmaz; Ana Sayfa "…Şubemizi Keşfet" kartları tanıtım sayfasına + iletişim ↔ tanıtım çift
  yönlü · 6 ortak başlık metinsiz bağlantı · harita önce "tıklanınca yüklensin" seçildi, sonra kullanıcı "açık gelsin, buton olmasın, yol tarifi kalsın" dedi · başlıklar yerel arama için
  ("Kadıköy Dil Kursu | …") · Ümraniye adresi `/umraniye-tanitim-sayfasi` · tasarım **B · şube künyesi** (3 yön: semt kartpostalı /
  künye / kapıdan içeri) · ders fotoğrafları alttaki alanlarda · filigran "boşver" · içerik soruları en sonda toplu.
- **Yeni:** `data/branchPromo.ts` (blok listesi; `Excerpt.match`, `PromoTitle` line/split/added, `DetailPara` heading/join,
  `ignoredBlocks`), `data/branchPromoPaths.ts` (hafif, Ana Sayfa + iletişim), `lib/branchPromoContent.ts`, `BranchPromoPage`,
  `BranchPromoRoute`, `BranchMap` (+ CSS), 4 kök klasör, `PageKind` `branch-promo` (+ klasör var mı bekçisi), P6 tokenları.
  Görseller ASCII adlara (`git mv`): `kadikoy.jpg`, `atasehir.jpg`, `bagdat-caddesi.jpg`, `umraniye.jpg`, `sube-1..5.jpeg`.
  Kaynak düzeltmeleri (`edits`/`headingEdits`): "Dil | Eğitimi", "Ataşehirde'de", "TOEFL,YDS", Levent h5 "Kadıköy'de" → "Etiler'de",
  Levent H1 "Etiler Şubesi" → "Levent / Etiler Şubesi", "Atmosferi”"; yanlış "Kadıköy Şubesi" üst yazıları ve `fas fa-*` gösterilmez.
- **Doğrulama (genel bilgi, 2026-09-28):** metro.istanbul (M2, M4, M6, M8, T3 hat sayfaları), sehirhatlari.istanbul iskeleleri,
  OpenStreetMap ölçümü (kuş uçuşu; yürüme süresi yazılmadı), M12 yapımda (Cumhuriyet haberi + Wikipedia, orta güven — yazılmadı),
  otobüs hatları doğrulanamadı (yazılmadı).
- **Doğrulama (teknik):** tsc ✅ · lint ✅ · build ✅ 206 · check-links 3/204 · 4 × 3 genişlik temiz, tek H1 · harita + yol tarifi test edildi.
- **code-review (high):** 10 bulgunun 8'i düzeltildi — harita açılınca yol tarifi bağlantısı ve odak kayboluyordu (sonra harita açık gelen sürüme geçti) · h1 uyarısı kaynağa
  bakmadan basılıyordu (artık kaynakta h1 varsa build düşer) · klasörü olmayan tanıtım adresi sitemap'e girebilirdi (bekçi) ·
  harita sorgusunda posta kodu / arayüz adı · `priority` (Next 16'da eski) → `loading="eager"` + `fetchPriority` · çapa kimliği ·
  iki yorum. Bırakılan: başlık sapması (kullanıcı onaylı — CLAUDE.md §5'e yazıldı) · kullanılmayan `sube-1..5` (kullanıcıya soruldu).

### 2026-09-27/28 · Opus 5.5 · P5 — İngilizce Kursları (9 sayfa) — commit bekliyor (kullanıcı commit'leyecek)
- **Aşama 0:** 10 kayıt (eğitim sistemi P4'te çözülmüştü: kanonik `/yabanci-dil-egitimleri/…`, 301 vardı). 18 satırlık eski site
  şablonu 9 sayfada birebir (şube satırları, program listesi, "kurs tarihlerini inceleyin"); özgün metin 126–309 kelime. Başlık
  hiyerarşisi bozuk (bölümler şablon h2'sinin altına h3/h4). Program listesindeki "İngilizce Konuşma Kursu" linki Eğitim
  Sistemi'ne gidiyordu. IK konuşma sayfası Dil Kursu'nun konuşma sayfasıyla %27 benzer ama ilk paragraf + gün/saat tablosu aynı,
  saatler çelişiyor (10:00 ↔ 11:00). DDM İngilizce Kursu sayfası "5 kur, A1–C2, Advanced (C1 – C2)" diyor → C2 ayrı kur değil.
- **Kararlar (kullanıcı):** konuşma → Dil Kursu sayfasına 301 (menü + hub kartı da) · C2 sayfası yok (merdivende "Advanced
  kapsamında") · B2 H1 "Orta İleri Seviye" · yanlış genel bilgiler düzeltilir (B2 IELTS 7.0 → 6.5; FCE/CAE → B2 First / C1
  Advanced; makine çevirisi dilbilgisi terimleri) · tasarım **B · seviye kartı** (3 yön: cetvel / kart / önce-şimdi-sonra) ·
  pilot geri bildirimi: hero mavisi header'ın arkasına kadar, karşılaştırma tablosu renkli · hedef kitle ayrı aile · yaz okulu
  görseli kullanıcıdan (`summer_school.jpg`) · hub B2 etiketi "şimdilik kalsın" · commit'i kullanıcı yapacak.
- **Yeni:** `data/englishLevels.ts` (`CEFR_EN` genel bilgi, 5 seviye, şablon satırları + `TEMPLATE_EDITS`, `LEVEL_COPY`),
  `data/englishPrograms.ts` (4 program, blok listesi: cards/info/steps/facts/distribution/table/highlights/chips/links),
  `lib/englishLevelContent.ts` (`createGuideResolver` üstünde; `resolveTemplate`, `takeTemplateCta`, tam sayı rakam bekçisi,
  CEFR alanı bekçisi), `lib/englishProgramContent.ts`, `EnglishLevelPage` (+ ortak `EnglishBand`), `EnglishProgramPage` (hero
  `RichHero.module.css`), 2 CSS modülü, route `app/ingilizce-kurslari/[sayfa]` (seviye | program dağıtıcı, slug çakışma bekçisi),
  `PageKind` `english-level`, keyframe `ddmLiftIn` (`--kf-lift-in`), P5 tokenları. `guideContent.sentencesOf` export edildi.
  Menü: İngilizce Kursları'nın 10 `soon`'u kalktı. 301: IK konuşma. Hub (P3) yalnız konuşma hedefi + yorum satırı.
- **Doğrulama (resmi kaynak, 2026-09-27):** Avrupa Konseyi CEFR (MEB Türkçe çevirisi), ielts.org CEFR eşlemesi, Cambridge GLH ve
  yeni sınav adları, ÖSYM 2026 YKS kılavuzu + 2025/2026 YDT İngilizce kitapçıkları (kaynaktaki soru dağılımı birebir), YÖK hazırlık
  yönetmeliği (RG 23.03.2016), MEB 2024/21 ders çizelgesi, Maarif Modeli İngilizce programı.
- **Doğrulama (teknik):** tsc ✅ · lint ✅ · build ✅ 202 · check-links 3/200 · sitemap 198/198 200 · 9 × 3 genişlik temiz, tek H1.
- **code-review (high):** 10 bulgunun 6'sı düzeltildi — şablon cümlesi indeksi başlık tekrarında yanlış paragrafı alabiliyordu ·
  İlköğretim "Yılda 4" → "Toplam 4" (kaynakta yıl yok) · rakam bekçisi alt dize yerine tam sayı · CEFR bilgisi `field` ile eşleşiyor ·
  program SSS rakamları denetimde · `sentencesOf` kopyası kaldırıldı · binlik ayraçlı saat. Bırakılan: hub B2 etiketi (kullanıcı),
  A2 "IELTS 4.0" firma cümlesi (çelişki değil), hub `TARGETS` / `programAlt` tekrarı (P3 dosyası, ayrı temizlik).


### 2026-09-26 · Opus 5.5 · P4 — Yurtdışı (9) + Diğer program / kurumsal (4) + "-2" 301 — commit bekliyor
- **Aşama 0:** 16 kayıt. Kopyalar: `yurtdisi-dil-egitimi` (3'te 2'si hub'da), `tercih` (yalnız ülke/şehir listesi = hub tablosu),
  `diger-program/yurtdisinda-egitim` (Work and Travel'ın birebir kopyası). `kanada-vancouver-2` aslında "İngiltere'de Dil
  Okulları". Tercüme'nin yarısı Lavanda'nın İngilizce tanıtımı. Pegasus 43 kelime, İngilizce. Kaynak fotoğraf yok.
- **Kararlar (kullanıcı):** tasarım **A · biniş kartı** (3 yön: biniş kartı / rota şeridi / fotoğraflı kapak) · 3 kopya → 301 ·
  Tercüme yalnız DDM metni · İngiltere yeni doğru adres (`…/ingiltere`, eski 301) · pilot "çok fazla yazı var, kart tablo" → yeniden
  düzenlendi, onaylandı · Kaplan rakamları "olduğu gibi bırak" · Kaplan ortaklığını kullanıcı teyit edecek.
- **Yeni:** `data/abroadPages.ts`, `data/otherPrograms.ts`; panolar `pass` / `chips` / `compare`; bloklar `facets` (kart ifadesi
  kaynakta aranır, metin açılır ayrıntıda) ve `topics`; tablo `{ src, cells }` (hücre hücre kaynak tablo); `SinglePageDef.parent`
  ve `lang`; `ucak` ikonu; route'lar `yurtdisi-egitim/[...sayfa]`, `diger-program/[sayfa]`, `kurumsal-dil-egitim/[sayfa]`; kırıntıda
  yurtdışı / kurumsal kategorileri. 301: 4 kopya/yanlış adres + 18 "-2". Menü: 11 `soon` kalktı, 18 "… Programı" kalemi silindi,
  İngiltere / Tercih / Yurtdışı Dil Eğitimi / Diğer › Yurtdışı Eğitim kalemleri yeni hedeflere. Ana sayfanın 2 bağlantısı hub'a.
- **Doğrulama (resmi kaynak, 2026-09-26):** J-1 SWT (j1visa.state.gov, 22 CFR 62.32, dol.gov asgari ücret, ice.gov SEVIS 35 $),
  ECCC iklim normalleri, StatCan (2021 sayımı, Ağustos 2026 LFS), TransLink, IRCC, English UK 2026 raporu, British Council, Eaquals,
  gov.uk vizeleri, okul siteleri; MUR 2026-28 genelgesi, EC İtalya profili, CLIQ; Cambridge (BEC kalktı, Linguaskill, YLE), ETS,
  MEB TTK 2025; Noterlik Kanunu, MFA tasdik, AIIC. Kaplan: 1938, 4 ülkede 18 okul, %96 tavsiye, Inspirit Capital satışı (uygulanmadı).
- **Doğrulama (teknik):** tsc ✅ · lint ✅ · build ✅ 193 · check-links 3/191 · sitemap 189 × 200 · 13 × 3 genişlik temiz · 301'ler 308.
- **Kod incelemesi (bağımsız ajan, high):** 12 bulgunun hepsi düzeltildi — karşılaştırma panosunda yinelenen React anahtarı,
  `lang="en"` artık yalnız içerik satırlarında (Türkçe "Ayrıntılı bilgi" / tarih / CTA dışarıda), `facets` artık `added`
  kaynağı reddediyor + en az 4 harflik eşleşme + kart / konu özetindeki her rakam kaynakta aranıyor (sıra numarası hariç),
  Vancouver "yaz ortalaması" → Temmuz ort. en yüksek, yaz okulu kodu UK/US, İngiltere okul notu yumuşatıldı, İtalya ve
  Business English ekleri araştırmanın ötesine geçmiyor, koçan `dl` yapısı geçerli HTML, ham px/rem token'a taşındı.
  Çocuklar sayfasında kaynak "Haftada 6 Saat" hafta içi akşam (19:00–21:30 × 2 = 5 saat) için tutmuyor → eklenen metinde
  tekrarlanmadı, kullanıcıya soruldu.
### 2026-09-26 · Opus 5.5 · P4 — Tekil sayfalar (8) — commit bekliyor
- **Aşama 0:** 8 kayıt + 4 Joomla kopyası (hepsi birebir). `proficiency-sinavi` yalnız 21 üniversite linki (H1 yok,
  Proficiency Kursu'ndaki ızgaranın kopyası); İngilizce Eğitim Sistemi iki adreste birebir; "Almanca Eğitim Seviyeleri"
  (592 kelime firma metni) yalnız `?id=67` adresinde; örnek sorular sayfası 27 link (22 dosya eski sunucuda, 2 dış link ölü);
  A1 başlığı 189 karakter, görevler iç içe; Çince'de "iki milyar" ve "en çok talep edilen" yanlış (Çince Kursu'nda da).
- **Kararlar (kullanıcı):** İngilizce sistem kanonik `/yabanci-dil-egitimleri/…` · Proficiency Sınavı → 301 · dosyalar indirilip
  aynı adreste · Almanca seviyeler yeni sayfa, "kaset/DVD" gizli · tasarım **A · program panosu** · "düzeltmeleri yap" (Çince Kursu da).
  İlk karar sorusu anlaşılmadı ("hangi sayfa?") → menü yolu + örnek metinle yeniden soruldu.
- **Yeni:** `data/singlePages.ts`, `lib/singleContent.ts`, `SinglePage`, `WeekBoard`, `SingleBoards` (basamak, akış, sınav kâğıdı,
  dosya rafı, kolay/zor), `SingleBlocks` (alt başlık, kart, görev kâğıdı, dosya listesi), `GuideBlock` (nedir'den ayrıldı; mobilde
  tablo → satır kartı), `SourcesFooter` (nedir/tekil/özel ders ortak tarih). `createGuideResolver` (nedir + tekil ortak; cümle
  aralığı, cümle kapsaması), `splits`, `findRecord` sorgulu kayıt. `RichEntry` + `single`. 22 dosya `public/images`, `public/ddm/indir`.
  `check-links` `public/` dosyalarını ve `#` hedefli yönlendirmeyi tanıyor. Menü: 7 `soon` kalktı, "Almanca Eğitim Seviyeleri"
  eklendi, "Proficiency Sınavı" kalemi kaldırıldı.
- **Doğrulama (resmi kaynak, 2026-09-26):** Ethnologue, MLA 2021, gov.uk GCSE 2025, British Council, Çin Eğitim Bakanlığı (pinyin,
  GF0025-2021), WALS, FSI (88 hafta / 2200 saat), chinesetest.cn; Goethe (Start Deutsch 1 süre/puan, Schreiben, sınav yönetmeliği),
  telc, ÖSD, TestDaF, DAAD, AufenthG §30, turkei.diplo.de (Goethe/ÖSD, 12 ay); Yunus Emre TYS; MEB CEFR çevirisi; 15 üniversitenin
  güncel sınav adı ve resmi örnek sayfası (Acıbadem/Kadir Has/Okan/Beykent adları değişmiş, Şehir ve Süleyman Şah kapalı).
- **Doğrulama (teknik):** tsc ✅ · lint ✅ · build ✅ 180 · check-links 12/712 · 72/72 · 8 × 3 genişlik temiz · 301'ler ve dosyalar 200.
- **code-review (high):** 10 bulgunun 9'u düzeltildi — cümle bazlı alınan paragrafın gösterilmeyen cümlesi artık build'i düşürüyor ·
  şube kartı etiketi şube adıyla doğrulanıyor · İngilizce sayfasında kaynaksız "en çok istenen sınav" iddiası kaldırıldı · A1 görevleri
  elle kopya yerine kaynak satırı + `edits`/`splits` · H1 yükseltmesi build'de loglanıyor · menüdeki yinelenen kalem · adres null ·
  ortak `SourcesFooter` · `check-links` klasörü dosya saymıyor. Ertelendi: kaynak çözücüyü `contentSections`'a taşıyıp özel ders
  çözücüsünü de ona bağlamak (davranış değişmez, ayrı temizlik işi).

### 2026-09-26 · Opus 5.5 · UI turu — Ana Sayfa hero'su (canlı zemin + selam bulutu) — commit bekliyor
- **Sorun (kullanıcı):** sağ yarı boş, düz lacivert ağır. 3 yön sunuldu (yörünge / selam bulutu / karma);
  kullanıcı **B · Selam Bulutu** + mobilde **yalnız zemin** seçti.
- **Zemin:** `HeroBackdrop` — gradient (`--ddm-home-hero-bg`, navy-950→600), 3 radial ışık (blur yok, 18/23 sn kayma),
  8 alfabeden %6'lık yüzen harf (16/20 sn), sağda nokta dokusu. Header payını da kaplar (section `overflow-x: clip`).
- **Sağ:** `HeroLanguageArt` — 8 cam balon (bayrak + selam, `LANGUAGES`'tan; "Hallo" tekrarı düşer), 12 sn'de sırayla
  belirip söner; 40 sn dönen kesikli yörünge; 2 cam kart (rakamlar `HOME_STATS`'tan). `Parallax` (ui) yalnız fareli
  masaüstünde, reduced-motion'da kapalı. ≤1279 son 2 balon düşer, ≤999 kompozisyon gizli.
- **Animasyon hatası (site geneli) — DÜZELTİLDİ (kullanıcı isteği):** CSS Modules modüldeki animasyon adını yerelleştiriyordu
  (`AbroadSection-module__…__ddmFloatSoft`) → globals.css'teki 11 keyframe'e yapılan 19 çağrının HİÇBİRİ çalışmıyordu
  (yurtdışı Ken Burns, logo süzülmesi, dil küresi, video şeridi, eğitim çemberi, seviye paneli açılışı, illüstrasyonlar,
  hero çipleri). `:global()` ve tırnaklı ad derleyicide çalışmadı; çözüm: `tokens.css` `--kf-*` ad tokenları, modüller
  `animation: var(--kf-spin) …`. Hero keyframe'leri de globals.css'e taşındı (`ddmDrift/GlyphRise/Greet`). Build çıktısında
  yerelleşmiş ad 0; ana sayfa, dil kursu, özel ders, online, sınav, üniversite sayfalarında `getAnimations()` > 0,
  reduced-motion'da 0. build ✅ 180. Kural CLAUDE.md §1'e yazıldı.
- build ✅ 172, lint/tsc temiz; 1440/1100/390/360 + reduced-motion kontrol edildi, yatay taşma yok.

### 2026-09-26 · Opus 5.5 · P4 — Nedir rehberleri (8 sayfa) — commit bekliyor
- **Aşama 0:** 8 sayfa, 119–604 kelime; metin firma bilgisi değil GENEL sınav bilgisi ve büyük kısmı eskimiş (SAT I/II,
  GMAT'i "ETS yapar", GRE 2023 öncesi format, TOEIC 2006 öncesi dağılım, YDS 150 dk, tazminat rakamları TL gibi,
  Proficiency'de TOEFL CBT/FCE). 4 Joomla `?id=` kopyası birebir → 301. Meta description'ların 7'si >155 + bayat şube listesi.
- **Kararlar (kullanıcı):** içerik düzenlenip geliştirilebilir, eskimiş bilgi düzeltilir, firma bilgisi değişmez · ayrı
  tasarım (sınav ana sayfaları beğenilmedi, sonra ele alınacak) · göz gezdirilerek okunan format, bilgiye boğmadan ·
  TOEFL'da eski 0–120 ölçeği de ayrı tablo olarak.
- **Yeni:** `data/examGuides.ts` (8 tanım; `edits`/`headingEdits`/gerekçeli `ignored`; kaynak satırlı tablo `rows: { src }`,
  `links` bloğu), `lib/guideContent.ts` (SectionResolver + assertCoverage; kaynak başlığı bölüm başlığı olunca tüketilmiş
  sayılır), `GuidePage`/`GuideHero`/`GuideToc`/`RichRoute` (+ CSS). `lib/richPages.ts` artık `RichEntry` (rich | guide).
  `next.config.ts` `JOOMLA_GUIDES` (4). Menüde 8 satır açıldı ("GMAT Nedir ?" etiketi düzeltildi).
- **Doğrulama (resmi kaynak, 2026-09-26):** ETS (TOEFL bant↔CEFR↔0–120, 3 gün, MyBest, 40M+, 13.500+ kurum; GRE 21 gün/5,
  8–10 gün, 40 $, ScoreSelect; TOEIC dağılım, CEFR, 7 milyon), IELTS (kâğıt 2026 ortası kalkıyor, Writing on Paper, One Skill
  Retake, bant adları), GMAC (Pearson VUE, 16 gün/5/8, 7.700+ program), College Board (dijital SAT, 2–4 hafta, 8 tarih,
  sınav günü), ÖSYM (180 dk, diller, e-YDS 12 oturum, eşdeğerlik; IELTS yok), 375 s. KHK, YÖK yönetmeliği, Atılım 2025.
- **Doğrulama (teknik):** tsc ✅ · lint ✅ · build ✅ 172 · check-links 17/705 · 72/72 · 8 × 3 genişlik temiz.
- **code-review (high):** 12 bulgunun 10'u düzeltildi — SAT süre cümlesi (molayla 2 sa 14 dk yanlıştı) · GMAT "her bölümde"
  en fazla 3 cevap · TOEFL süresi ETS ifadesiyle ("yaklaşık 2 saat ayırın", net ~90 dk) · YDS "çoğu dilde çoktan seçmeli" ·
  3px/2px çizgiler token · TOEFL tablosu ortak `EN_COMPARE_ROWS` · GRE uyarlamalı paragraf puan bölümüne · IELTS/GMAT tekrarları ·
  SAT açıklama büyük harf · Proficiency firma cümlesinde "biraz speaking çalışıp" geri geldi · eski yorumlar. Açık: `?id=` sorgu
  taşınması (tüm Joomla kurallarında ortak, Faz 8).

### 2026-09-25 · Opus 5.5 · P4 — Online eğitim (8 sayfa + çatı) — commit bekliyor
- **Aşama 0:** 8 sayfa aynı şablon (h1 + 3 paragraf / 5 cümle, 91–93 kelime); yalnız dil adı ve öğretmen uyruğu değişiyor.
  Üç meta description başka dilden kopya (Çince→"İtalyanca", İtalyanca→"Rusça", Rusça→"İspanyolca") → düzeltildi, build
  bekçisi eklendi (açıklamada dil adı yoksa düşer). Yazım: "Profosyonel", "hazırlanmaktayız", "öğretmen üyelerimiz"
  (Rusça/Türkçe) — kelime düzeyinde `fixes`. "8 kişilik grup" çelişki DEĞİL (dil kursu sınıfları da 8). `?id=` kopyası yok.
- **Kararlar (kullanıcı):** "Skype" kalsın · çatı sayfası `/diger-program/online-dil-egitimi` bu turda · tasarım: baskın bölüm
  "nasıl işler" 4 adım (adım metinleri firma cümleleri) + "sınav online mı" destek bölümü · "içeriği biraz açabilirsin ama
  değiştirme" · hero'da kullanıcının online eğitim fotoğrafları, "canlı ders" kartı alttaki bölümde.
- **Yeni:** `data/onlineLessons.ts` (8 dil + `ONLINE_HUB`), `lib/onlineContent.ts` (iskeleti doğrulayan çözücü: P1.1 hero,
  P3/P1.2/P1.3/P2 adımlar), `lib/richPages.ts` (tüm zengin içerik alt türleri tek liste; dağıtıcılar buradan sorar),
  bileşenler `OnlineSteps`, `ExamModes`, `OnlineCatalog`, `CallCard` (+ CSS), 5 ikon (wifi, kamera, mikrofon, klavye,
  ekran). `RichBlock.compare` artık serbest sütunlu; `RichPage.family` / `cta` alt türe göre.
- **Genel bilgi:** sınavların evden/merkezde yapılışı resmi kaynaklardan doğrulandı (ETS, IELTS, Pearson, Cambridge, ÖSYM,
  Goethe, TestDaF, telc, ÖSD, FEI, CCI Paris, Cervantes/SIELE, Siena/Perugia/Dante, Puşkin Enstitüsü, CTI, YEE).
  Evden: TOEFL, IELTS Academic, SIELE, HSK, TORFL (bazı merkezler). Kaynak URL'leri veri dosyasında yorumda.
- **Fotoğraf:** İngilizce `online_education2`, çatı `online_education3`, diğer 7 dil genel `online_education` (2 ve 3 İngilizceye
  özgü). Sınav özel ders hero'ları da kullanıcının yeni fotoğraflarıyla ayrıştı (`study_exam*` ikisi kırpılınca bozuk yazı
  gösterdiği için kullanılmadı).
- **Doğrulama:** tsc ✅ · lint ✅ · build ✅ 164 · check-links 18/694 · 72/72 kurs tarihi · 9 sayfa × 3 genişlik temiz.
- **code-review (high):** 8 bulgunun 6'sı düzeltildi — "hazırlanmaktayız" → "hazırlanmaktadır" (edilgen cümle; ilk
  düzeltme yanlıştı) · çatıda şube sınıf mevcudu satırı kaldırıldı (dile göre değişiyor) · çatı h2'lerine tek paragraf
  bekçisi · `pageRegistry` zengin sayfaları `RICH_PATHS`ten alır (tek liste) · ölü kod · SSS'de "görüntülü" çıkarımı
  kaldırıldı. Açık: çatı hero fotoğrafı 735 px (düşük) · 2 sınavlı dilde ızgara `auto-fit`.

### 2026-09-25 · Opus 5.5 · UI turu — Dil Kursu sayfası (10 dil)
- **Seçimler:** sıra yeni · Neden-dil A · Hakkında B · Takvim B · Seviyeler A · Neden DDM A · Model A · SSS A · Diğer diller B.
- **Yeni:** `data/languageExtras.ts` (fayda kartları, fotoğraf, nl/tr/speak için evrensel "Neden…" metni),
  `lib/languageFaq.ts` (takvim ayrıştırıcı + olgulardan SSS), bileşenler `LanguageBenefits`, `AboutBento`,
  `LevelLadder`, `WeekSchedule`, `WhyDdm`, `TeachingCycle`, `FaqAside`, `LanguageLinks` (+ CSS). `Faq.icon`
  opsiyonel, `Accordion` ikon basar. Hero rakam şeridi 1320px kapsayıcıya hizalandı (tüm PageHero'lar).
- **Silinen:** `LevelExplorer`, `LevelPanel`, `ProgressTrack` (+ CSS) — başka kullanan yoktu.
- **Bağımlılık:** `LevelLadder`, P4'ün `data/privateLessonsShared.ts`'indeki `CEFR_NAMES/CEFR_CAN`'i kullanır
  (iki sabit `export` yapıldı) — bu dosya commit'lenmeden dil kursu kodu derlenmez.
- **Kaynak hatası (kullanıcı onayıyla düzeltildi):** Türkçe "Neden DDM" listesinde "Yüz yüze Korece eğitimleri" →
  "Türkçe". Yeni mekanizma: `LanguageContentMap.edits` (satır → düzeltme), `getLanguagePage` uygular, kullanılmayan anahtar build'i düşürür.
- **Doğrulama:** tsc ✅ · lint ✅ · build ✅ (155, P4 dahil) · 10 dil × 1440/390/360 taşma yok, tek H1, konsol temiz ·
  seviye sekmeleri tık + klavye test edildi.
- **Düzeltme turu (kullanıcı geri bildirimi):** Hakkında kutularına başlık + ikon (`AboutBento` `TOPIC_RULES`,
  eşleşmeyen paragraf build'i düşürür) · takvimde hafta içi önce (`parseSchedule` sıralar) · şube tarihleri yeni
  `CourseDateList` ile alt alta satır, SSS'nin altında · öğrenci yorumları kalktı (`TestimonialsCarousel` artık
  hiçbir sayfada kullanılmıyor, dosya duruyor) · hero'da illüstrasyon yerine dil fotoğrafı (`PageHero` yeni `photo`
  prop'u, mask-image ile yumuşak geçiş; yeni fotoğraflar gelince `LANGUAGE_EXTRAS.photo` yerine hero'ya ayrı alan açılacak).
  tsc ✅ · lint ✅ · build ✅ 155 · 10 dil × 3 genişlik taşma yok.
- **Hero geçişi (kullanıcı: "resim daha çok görünsün"):** `--ddm-photo-fade-x/-y/-strip` yalnız kenarlarda ince
  smoothstep erime; fotoğrafın üstünde lacivert katman yok. Aynı maske P4 `RichHero`'ya da uygulandı (özel ders +
  online sayfaları; eski `::after` lacivert degrade kalktı). Dil özel ders hero'ları (9) şehir fotoğrafı yerine
  kullanıcının eklediği `private_lesson{,2,3}.jpg` (sırayla dağıtılır, `data/privateLessonsLanguage.ts` `HERO_PHOTOS`);
  sınav özel ders fotoğrafları aynen. Görseller küçük (620–735px) — retina'da hafif yumuşak. build ✅ 164.
- **Fotoğraf genişliği (2026-09-26, kullanıcı: "resimler yarım görünüyor"):** her iki hero'da fotoğraf `--ddm-hero-photo-w`
  (55%; 1000–1279px'te 46%). Kullanıcı "laciverti azalt" dedi: erime yalnız ince kenarlarda — fade-x 0→14%, fade-y son %10.
- **İki fotoğraf (2026-09-26, kullanıcı: "fotoğraflar tekrar ediyor, her dilden en az 2 var"):** `LanguageExtra.photo` →
  `heroPhoto` (yatay kompozisyon) + `benefitsPhoto` (kareye yakın kutu, dik/ortası güçlü). Yeni görseller
  `home_page_images/dil-*2/3.jpg` — **izlenmiyor, kod bunlara bağlı** (commit'i kullanıcı yapar). Yedekte kalan:
  `dil-almanca2` (Köln, benefits'teki Köln'le aynı konu), `dil-fransizca` (Eyfel dik), `dil-turkce`. İngilizce Konuşma'nın
  tek fotoğrafı var → iki yerde aynı, ikincisi kullanıcıdan. Yeni görseller 640–1200px — hero'da retina'da hafif yumuşak.
- **Online hero fotoğrafları (2026-09-26, kullanıcı yeni `online_education4/5/6.jpg` ekledi — izlenmiyor, kod bağlı):**
  `data/onlineLessons.ts` `ONLINE_PHOTO` → `ONLINE_PHOTOS` (4 genel görsel). 7 dil: Almanca/Türkçe 4, Fransızca/Rusça 5,
  İspanyolca/Çince 6, İtalyanca eski görsel; İngilizce (2) ve çatı (3) aynen. Her görsel en fazla 2 sayfada.
- **İngilizce Kursları seviye rayı (2026-09-28, kullanıcı: "bar kaymış"):** `/ingilizce-kurslari` `LevelRail` çizgisi
  sabit `top: 11px` ile noktaların ~4px üstünden ve yazıların üzerinden geçiyordu. Başlık satırı sabit yükseklik
  (`--ddm-rail-head-h`), çizgi onun ortasında (`--ddm-rail-dot/-line` tokenları); başlığın arkası beyaz → çizgi yazıda
  kesilir. Mobil dikey rayda da merkez eşleşiyor (ölçüldü: 1440/1100/390/360). build ✅ 202.
- **Menü başlıkları tıklanabilir (2026-09-28, kullanıcı isteği):** header'da başlık yazısı artık kategori sayfasına gider
  (hedef = menüdeki "Keşfet" `promoLink.href`); yanındaki ok ayrı düğme (klavye/dokunmatik için menüyü açar), fareyle
  üzerine gelince menü yine açılır. Mobil çekmecede aynısı: yazı sayfaya gider (çekmece kapanır), sağdaki 52×52 ok alt
  başlıkları açar. Hedefi olmayan (`soon`) sekme eski düğme davranışında kalır. Görünüm değişmedi. Playwright ile test
  edildi (hover, ok+Enter, tıkla→/yabanci-dil, mobil ok ve bağlantı). build ✅ 202.

### 2026-09-25 · Opus 5.5 · P4 — Özel Ders (18 sayfa) — commit bekliyor
- **Aşama 0:** 19 temiz + 21 Joomla `?id=` kaydı; kopyaların gövdesi temizlerle birebir. Şablon artığı yok (özgün metin 91–253
  kelime). Aileler: dil (7 aynı iskelet), sınav A (TOEFL/TOEIC/PTE), B (GMAT=GRE %100), C (IELTS~Proficiency %81).
  `yds-ozel-ders-2` aslında "YDS Kurs Dönemi" duyurusu. İngilizce Konuşma meta'sı Ataşehir ön kayıt formundan kopya.
- **Kararlar (kullanıcı):** YDS Kurs Dönemi yayınlanmaz → iki bilgisi YDS Kursu'na taşındı + 301 · bariz yazım/kopya
  hataları düzeltilir (`edits`) · PTE "2 ayda 80-90" → **"60-70"** (TOEFL 80-90 ≈ B2 [ETS] → PTE B2 59–75 [Pearson]) ·
  üstünlük iddialarına dokunulmaz · tasarım **B (seviye merdiveni)**, sınav sayfalarında **sınav formatı kartları** ·
  header değişikliği (TopBar yok, yüzen header) taslağa yansıtıldı. Pilot (Almanca) onaylandı.
- **Yapılanlar:** `data/privateLessons{,Shared,Language,Exam}.ts` · `lib/richContent.ts` (SectionResolver +
  assertCoverage + edits/headingEdits denetimi + title≤60/desc≤155 + dağıtıcı yardımcıları) · bileşenler
  `RichContentPage, RichHero, LevelStairs (client, erişilebilir sekmeler), FormatCards, RichAbout, RichFaq` + CSS ·
  3 dağıtıcı genişledi (yabancı dil / sınav `[kurs]/[sayfa]`, proficiency `[sayfa]` — slug çakışma denetimli) ·
  `pageRegistry` → `rich` · 17+1 `soon` silindi, "YDS Kurs Dönemi" menü satırı kaldırıldı · 21 Joomla + 2 emekli 301 ·
  `examContent` merged seçicisi satır içi tam cümleyi de kabul ediyor.
- **Genel bilgi doğrulaması:** iki araştırma ajanı resmi kaynaklardan (ETS, IELTS, GMAC, College Board, Pearson, ÖSYM
  kılavuzları, Cervantes, Perugia/Siena, MUR genelgesi, TestDaF, BAMF, SPbGU/RUDN, chinesetest.cn, YEE). Önemli:
  TOEFL 2026 1–6 ölçeği (0–120 Ocak 2028'e kadar) · IELTS kâğıt sınav kalkıyor · YDS geçerliliği kurum mevzuatına bağlı ·
  SAT resmi geçerlilik yok · **HSK'nın resmi CEFR karşılığı yok** (Çince merdiveni HSK 1–6) · TYS yalnız B2/C1 belgesi.
- **`code-review` (high):** 10 bulgu → 8 düzeltildi (HSK boşluklu ARIA id · tarih UTC · merged seçici tam cümle ·
  proficiency çakışma denetimi · dağıtıcı yardımcıları ortaklaştırıldı · yerel keyframe → `ddmPanelIn` · RichHero ham
  px → token · pageRegistry yorumu). Bilinçli bırakılan 2: `.html` 301'leri (Faz 8, kullanıcı talimatı) · 301'de sorgu
  dizesinin taşınması (Next.js davranışı, mevcut 16 kuralla aynı).
- **Doğrulama:** tsc ✅ · lint ✅ · build ✅ (155) · check-links 22 → 19 · 72/72 kurs tarihi · 18 sayfa 490–790 kelime,
  tek H1 · 72 sayfa×genişlik taşmasız · merdiven klavye/tıklama/reduced-motion tarayıcıda test edildi.
- **Commit'ler:** henüz yok.

### 2026-09-24 · Opus 5.5 · UI turu — Ana Sayfa + site geneli header
- **Akış:** 1440/390 ekran görüntüsü → teşhis → 6 bölüm için scratchpad taslakları (A/B/C) → kullanıcı seçimi
  "1B 2A 3A(logolar CTA üstünde) 4A 5B 6A" → kod → tekrar ekran görüntüsü.
- **Yapılanlar:** TopBar tüm siteden kalktı (dosyası silindi, `BRAND_TAGLINE` kaldırıldı, menü yükseklik tokenları
  üst barsız hesaplandı) · hero parlaması kalktı, hero kartları gerçek fotoğraflı · sınav kartı logo-tam-kart ·
  yurtdışı hap programlar + Kaplan/ILSC logoları + ken-burns · dil kursları 5×2 kutu + tek panel (eski `<details>`
  satır uzaması hatası giderildi; tüm bağlantılar HTML'de) · şubeler 3+2 semt fotoğraflı · video fotoğrafsız kapak,
  sayfa içi `youtube-nocookie` oynatıcı (tıklayınca yüklenir) · footer logosu oranı düzeltildi · header altındaki
  beyaz şerit tüm siteden kalktı (`globals.css` `main > :first-child`) · TOEIC/GRE logoları yenilendi, YDS/YÖKDİL'e
  ÖSYM logosu. `MediaCard` hero varyantı kaldırıldı; `FeatureCard` tam-boy fotoğraf destekliyor.
- **Yeni tokenlar:** `--ddm-header-flow-h`, `--duration-kenburns/-float/-marquee(-alt)/-zoom`, `--float-shift`,
  `--ddm-scrim-photo/-logo`, `--ddm-greet-ink(-sky)`, `--ddm-panel-chip(-line)`.
- **Bekleyen (kullanıcı):** video başlığı "tanıtım filmi" ama video Londra Aktüel haberi — "şimdilik kalsın" dedi.
- **Doğrulama:** tsc ✅ · lint ✅ · build ✅ (137) · check-links 22/742 (değişmedi) · 1440/390 yatay taşma yok ·
  dil paneli ve video oynatıcı tıklanarak test edildi.
- **Commit'ler:** 1. kısım kullanıcı tarafından `507e3e4`; kalanını kullanıcı atacak.

### 2026-09-23 · Opus 5.5 · P3 — Kategori Hub'ları (7 sayfa) — commit bekliyor
- **Yapılanlar:**
  - **Aşama 0:** 7 kaydın gerçek özgün metni ölçüldü (şablon blokları/kopyalar hariç 0–488 kelime), kaynak hataları
    doğrulandı + yenileri bulundu (Suadiye, 4 şube, İstanbul Şehir Üni., uzun Kurumsal title), özel ders farkı 17 vs 19,
    hub başına `soon` kart sayıları çıkarıldı. §A'daki "PM commit'lenmedi" bilgisinin yanlış olduğu görüldü (`7a737c0`).
  - **Tasarım:** 3 tek dosyalık taslak (A hedef seçici · B karşılaştırma önce · C editoryal) 1440/390 ekran görüntüsüyle
    sunuldu; kullanıcı "C + B'nin tablosu"nu seçti. Pilot onaylandı, sistem 6 hub'a uygulandı.
  - Yeni: `data/hubs.ts`, `lib/hubContent.ts`, `lib/hubLinks.ts`, `components/sections/{HubHero,HubGuide,HubToc,
    ComparisonTable,HubAbout,HubCards,HubLanguages,HubBlocks,RelatedLinks}.tsx`, `components/ui/Reveal.tsx` + CSS modülleri.
    Genişletilen: `Breadcrumb` (açık ton), `ProcessSteps` (başlık/çapa parametreli), `PageSection` (çapa payı).
    `tokens.css`: hub H1 ölçeği, yapışkan header payı (ölçüldü), kademeli görünme süresi, bayrak köşesi vb.
  - `PageKind` → `hub`; `lib/nav.ts`'te 7 satırdan `soon: true` silindi.
  - Geçerlilik süreleri resmi kaynaklardan doğrulandı (ETS, mba.com, Pearson, IELTS; YDS/YÖKDİL ÖSYM kuralı).
- **Alınan kararlar (kullanıcı):** `/yurtdisi-egitim` içerikli hub · Kaplan rakamları Kaplan adıyla, Kaplan/ILSC logoları
  kullanılabilir · "başarı garantisi" yumuşatılır · örnek site yok · tasarım C + B tablosu · yanıtlar Türkçe.
- **Kendi kararlarım (kullanıcıya bildirildi):** İstanbul Şehir Üniversitesi (kapalı) listeden çıkarıldı · "%30 indirim" ve
  üstünlük iddiaları çıkarıldı · üretilmemiş kart "Yakında" etiketiyle soluk (gizlenmedi).
- **Doğrulama:** tsc ✅ · lint ✅ · build ✅ (133) · check-links 28/957 → 22/742 · 7 hub × 4 genişlik taşma yok, tek H1 ·
  çapa hedefleri header altında kalmıyor (ölçüldü).
- **`code-review` (high):** 10 bulgu, 10'u düzeltildi — sessizce tüketilen 6 satır gerekçeli `ignored`'a · çapa payı ·
  ilgili linklerde tekrar · dizin kartında sihirli indeks · pilotun ortak yardımcıya geçmesi · Reveal stilleri modüle ·
  JSX'teki gövde metni veriye · CLAUDE.md §5'e hub kuralı · yinelenen sabitler · `getHubPage` ad çakışması
  (`lib/branchContent.ts` ile) → `getCategoryHubPage`.
- **Ek (2026-09-24, kullanıcı isteği):** 10 dil kursu sayfasından (6.4) Fiyatlandırma bölümü kaldırıldı; alttaki
  bölümlerin zemin sırası yeniden hesaplanıyor. `/yabanci-dil` tablosunun hücreleri tek tek kaynakla doğrulandı.
  §A'da kalmış eski PM tablosu artığı silindi.
- **Commit'ler:** henüz yok.

### 2026-09-23 · Opus 5 · PM — Menü ağacı + mega menü / mobil menü UI — commit bekliyor
- **Yapılanlar:**
  - **Aşama 0:** `live-menu-2026-09-23.md` (222 satır) ile `lib/pageRegistry.ts` (126 sayfa)
    karşılaştırıldı: canlı menü üretilmiş 126 sayfanın TAMAMINI kapsıyor, 96'sı henüz yok.
  - `lib/nav.ts` canlı ağacın tamamına çıktı (6 sekme, 201 hedef) — betikle üretildi.
    Üç düzeltme: 21 üniversite tek girişe indi (`proficiency-kursu#universiteler`),
    Kurumsal Dil Eğitimi + Pegasus → Diğer Programlar altına, Öğrenci Yorumları sekmesi
    (Mektuplar/Aktiviteler/Duyurular dahil) kalktı. Footer'daki link duruyor.
  - Şube kurs tarihi etiketleri menüde şube adına kısaltıldı ("Kadıköy Şubesi TOEFL Kurs
    Tarihi" → "Kadıköy"); bağlamı öbek başlığı veriyor, 360px'te taşma yok. Arayüz
    etiketi olduğu için CLAUDE.md §5 kapsamı dışında.
  - **Süzme:** `lib/navTree.ts` (saf, istemci-güvenli) + `lib/navAudit.ts` (sunucu, build
    doğrulaması) + `lib/pageRegistry.ts`'e `isProducedPage()`. Üretilmemiş hedef
    `nav.ts`'te `soon: true` taşır → menüde soluk düz metin.
  - **UI:** `SiteHeader.tsx` yeniden yazıldı. Masaüstünde kalabalık sekmeler için iki
    bölmeli panel (`layout: "rail"`), mobilde 3 katlı akordeon, çekmece içi kaydırma +
    gövde kilidi + odak tuzağı + Esc/perde/kapat düğmesi, ≥1340px'e dönünce çekmece
    kapanıyor. `tokens.css`'e menü yükseklik tokenları, ikon kaydına `close`.
- **Alınan kararlar (kullanıcı):**
  - Üretilmemiş hedefler **gizlenmez, düz metin gösterilir** ("hide" modu kodda duruyor
    ama seçilmedi — seçilseydi hiç sayfası olmayan 3 sekme menüden tümüyle düşüyordu).
  - Mega menü düzeni "kullanımı en rahat olan" olsun; panel ne boş ne karmaşık görünsün,
    **doluluk aşağı doğru dizilsin** → alt sayfalar en fazla 2 kolon.
- **Açık kalanlar / sonraki adım:** kullanıcı onayı → commit (kod + döküman ayrı) → P3.
- **Doğrulama:** tsc ✅ · lint ✅ · build ✅ (126 sayfa, değişmedi) · check-links 28 ölü
  (değişmedi) · yatay taşma yok (1440/1339/999/390/360) · klavye/odak/kapatma yolları
  gerçek tarayıcıda test edildi · sayfa HTML'i 175 KB → 135 KB.
- **`code-review` (high, 2 tur):** 12 bulgunun 11'i düzeltildi. En önemlisi: ağaç sunucuda
  süzülüp prop geçilince 126 sayfanın her birine iki kez kopyalanıyordu (+40 KB/sayfa) →
  `soon` bayrağı + build doğrulaması desenine geçildi. Ayrıca: odak tuzağı gizli elemanı
  "son" sanıyordu, `assertNavSoonFlags` hatadan sonra kendini susturuyordu, `aria-current`
  hover önizlemesini "aktif sayfa" diye okutuyordu, `.inert` CSS'i kaynak sırası yüzünden
  promo linkinde ezilmişti. Düzeltilmeyen tek bulgu: footer `soon` denetimine girmiyor —
  footer'daki ölü hedefler kullanıcı kararıyla duruyor, P3/P4 açacak.
- **Commit'ler:** henüz yok.


### 2026-09-22 · Sonnet 5 · P1 Şube İletişim (form hariç) — commit bekliyor
- **Yapılanlar:**
  - Aşama 0: 6 `/ddm-iletisim/*` kaydı + hub kaydı incelendi. ~1300 kelimelik sayfaların
    %95'i form alanı + KVKK yasal metni (5 şube arası %99,7 birebir aynı — yalnız şube adı
    değişiyor); gerçek şubeye özel içerik yalnız adres/telefon/e-posta/WhatsApp, hub
    kaydından (temiz liste) çıkarıldı.
  - 3 kullanıcı kararı alındı: Etiler e-postası kaynağa göre düzeltilsin · Kariyer sayfası
    P1 dışı · form/KVKK metni şimdilik hiç render edilmesin.
  - `data/branches.ts`: Bağdat/Etiler/Ataşehir adres+telefon+e-posta+WhatsApp dolduruldu;
    Etiler e-postası düzeltildi. **Kod hatası bulundu+düzeltildi:** `telHref()` `wa`
    yerine `phone`'dan türüyor artık (önceden WhatsApp'ı olmayan Etiler'de "Ara" butonu
    hiç çıkmıyordu).
  - Yeni: `lib/branchContent.ts` (title/meta/H1 çözücü, Ümraniye title/meta kopyala-yapıştır
    hatası düzeltildi), `components/sections/BranchHero.tsx`, `components/cards/BranchTile.tsx`
    + CSS, `app/ddm-iletisim/page.tsx` (hub), `app/ddm-iletisim/[sube]/page.tsx` (5 şube).
  - `next.config.ts`: 6 Joomla iletişim redirect'i (`component/content/article/...`).
  - `lib/pageRegistry.ts` + sitemap: 104 → 110.
- **Doğrulama:** tsc ✅ · lint ✅ · build ✅ (110 sayfa) · check-links 46→40 ölü hedef ·
  6/6 Joomla redirect 308→200 (curl) · Ümraniye title/H1 düzeltmesi canlıda doğrulandı ·
  Etiler'de artık "Ara" butonu var, "WhatsApp" butonu yok (gerçek render kontrol edildi,
  RSC flight payload'daki yanıltıcı "WhatsApp" eşleşmesi false positive çıktı).
- **Açık kalanlar / sonraki adım:** kullanıcı onayı → commit (kod+döküman ayrı) → P2.
- **Commit'ler:** henüz yok (bu oturumun kodu commit'lenmeyi bekliyor).


### 2026-09-23 · Opus 5 · P2 Sınav Hazırlık Kursu Ana (16 sayfa) — commit bekliyor
- **Yapılanlar:**
  - Aşama 0: 16 kaydın A/B/C katman tablosu çıkarıldı (A 9 / B 2 / C 5), kurs-tarihi
    eşlemesi (9 sınav × 4 şube = 36) ve ölü link etkisi ölçüldü.
  - `data/exams.ts` + `lib/examContent.ts`: sabit rol alanları yerine SIRALI blok listesi
    (`prose`/`facts`/`structure`/`branchLinks`/`merged`/`stats`/`universities`/
    `headingList`/`faq`/`drop`). `SectionResolver` + `assertCoverage` korunuyor.
  - Route: `[kurs]/page.tsx` (15) + statik `proficiency-kursu/page.tsx` (1).
    `lib/pageRegistry.ts`'e `exam` kind'ı eklendi → sitemap 126.
  - Yeni bileşenler: `ExamCoursePage`, `BranchDateRows` (alt alta, tam satır link,
    kalıcı "Tarihleri gör" düğmesi + hover/odak ipuçları), `FactCards`, `ProseSection`.
    Genişletilenler: `BranchHero` (illüstrasyon + kod rozeti), `ExamStructure` (zemin),
    `ExamSectionCard` (boş parça başlığı basılmıyor).
  - `code-review` (high) çalıştırıldı, 6 bulgunun 4'ü düzeltildi (zemin ritmi `drop`
    bloklarını sayıyordu · PTE'de görev listesi sınav bölümü kartı olarak basılıyordu ·
    şube satırı ortak bilgisi `extraHrefs` satırları yüzünden satırda tekrar ediyordu ·
    `CtaBand id="iletisim"` footer'la çakışıyordu). Kalan 2'si bilinçli plan kararı
    (`.html` 301'leri Faz 8, `/sinav-hazirlik-egitimleri` hub'ı P3).
- **Alınan kararlar (kullanıcı):**
  - Kaynak **başlıkları silinmez**; gövde metni konudan sapmadan **SEO için
    geliştirilebilir** (CLAUDE.md §5'e onaylı sapma). Düzenlemeler `edits`/`additions`
    ile izlenebilir; kaynakta karşılığı olmayan `edits` anahtarı build'i düşürür.
  - Video bölümleri (TOEFL, IELTS) yayınlanmıyor.
  - **"Kurs Programı" (`-kursu-2`) sayfaları yayınlanmayacak**; kayda değer program
    seçenekleri ana sayfaya taşındı (çelişen "8 kişilik grup" satırı alınmadı).
  - **Özel ders sayfaları şimdilik kalıyor** (3 ayda 5-6 tıklama almalarına rağmen);
    P4'te metinleri güçlendirilecek, karar sonra kesinleşecek.
  - Ana sayfaya katma yok; "nedir" sayfaları kalıcı ve GEO yatırımının merkezi.
- **Açık kalanlar / sonraki adım:** kullanıcı onayı → commit (kod + döküman ayrı) → P3.
  Kullanıcıdan: güncel TOEFL sınav ücreti, özel ders sayfalarının Search Console verisi.
- **Doğrulama:** tsc ✅ · lint ✅ · build ✅ (126 sayfa) · 16/16 sayfa 200 + tek H1 ·
  check-links 40 → 28 · 1339/759/390 px'te yatay taşma yok · regresyon 200.
- **Commit'ler:** henüz yok.

### Şablon
```
### YYYY-MM-DD · <model> · <faz/P>
- Yapılanlar:
- Alınan kararlar (kullanıcı):
- Açık kalanlar / sonraki adım:
- Doğrulama: tsc ✅/❌ · lint · build (N sayfa) · check-links (N ölü)
- Commit'ler:
```

### 2026-09-21 · Sonnet 5 · P0 Borç + altyapı (madde 1–3)
- **Yapılanlar:**
  - `next.config.ts` `JOOMLA_COURSE_DATES`'e 4 Ataşehir satırı eklendi (id 306/322/318/298).
    Gövde metinleri temiz sayfalarla `site_content.json`'da birebir aynı doğrulandı. Toplam 16
    Joomla redirect; `npm run start` + curl ile **16/16 → 308 → 200**.
  - `scripts/check-links.mjs` + `npm run check-links` (`--list`, `--strict`): `.next/server/app`
    prerender HTML'lerinden iç `href`'leri toplar, üretilen sayfalar + `routes-manifest.json`
    redirect kaynaklarıyla karşılaştırır.
  - Dil Kursu sayfa başlığındaki bayat "kalan 9 dil onay bekliyor" yorumu silindi.
- **Baz çizgi (check-links):** 46 ölü hedef / 2194 çift. En kalabalık: `/ddm-iletisim/*` (5 şube),
  `/diger-program/*`, `/sinav-hazirlik-egitimleri/{gmat,gre,ielts,proficiency,sat,testdaf,toefl,yds}-kursu`,
  `/ogrenci-yorumlari` (her biri 104×), `/sinav-hazirlik-egitimleri` (58×), `/yabanci-dil` (47×).
  Her faz bu sayıyı düşürmeli; yeni ölü link eklememeli.
- **Alınan kararlar:** yok (P0-4/5 opsiyonel, kullanıcıya sorulmadı: `pageRegistry`, `not-found`, `sitemap`/`robots`).
- **Açık kalanlar / sonraki adım:** P0-4/5 kararı; karar #4 (form) → P1.
- **Doğrulama:** tsc ✅ · lint ✅ · build ✅ (106) · check-links 46 hedef · redirect 16/16.
- **Commit'ler:** `7b68a73` (kod) · + bu oturumun döküman commit'i.

### 2026-09-21 · Sonnet 5 → Opus 5 · Döküman turu + plan gözden geçirme
- **Yapılanlar:**
  - 4 ana şablonun durumu dökümanlara işlendi (PROGRESS 6.4 `[x]`, page-types Durum
    kolonu, CLAUDE.md §3/§5/§7/§8/§9).
  - `remaining-pages-plan.md` yazıldı (P1–P8), sonra genişletildi: P0, route mimarisi,
    Joomla envanteri (61), kesin slug listeleri, başlangıç prompt'ları, skill matrisi.
  - Bu devir dökümanı kuruldu.
- **Bulunan açık:**
  - 4 Ataşehir Joomla kurs-tarihi URL'inin 301'i eksik (id 306/322/318/298) → P0-1.
  - 6.6'daki "12 Joomla" sayısı aslında 16.
- **Alınan kararlar:** kod ve döküman commit'leri ayrı; push yok.
- **Açık kalanlar:** P0 · karar #4 (form) P1 için engelleyici.
- **Doğrulama:** tsc ✅ · build ✅ (106 sayfa) · check-links (betik yok).
- **Commit'ler:** `4d1d92a` (6.6 kod) · `2069dc5` (dökümanlar) · + bu oturumun döküman commit'i.
