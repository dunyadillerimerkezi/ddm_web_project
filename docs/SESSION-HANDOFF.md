# Nerede Kaldık — Oturum Devir Dökümanı

> **Her yeni chat İLK bu dosyayı okur, SON bu dosyayı günceller.**
> §A her oturum sonunda **üzerine yazılır** (tek doğru güncel durum).
> §D **yalnız eklenir** (en yeni üstte). Yol haritası: [`remaining-pages-plan.md`](remaining-pages-plan.md).
> Kurallar: [`../ddm-web/CLAUDE.md`](../ddm-web/CLAUDE.md). Faz durumu: [`../PROGRESS.md`](../PROGRESS.md).

---

## §A — Güncel durum  *(son güncelleme: 2026-09-25, P4 · Online alt türü — commit bekliyor)*

| Alan | Değer |
|---|---|
| **Son kod commit'i** | `b21aac7` (kullanıcı; P4 özel ders kod + döküman tek commit). **P4 online kodu çalışma ağacında, commit'lenmedi.** Aynı ağaçta paralel UI turu (Dil Kursu) değişiklikleri de var — commit'te ayrılmalı. |
| **Son döküman commit'i** | `b21aac7`; bu oturumun döküman güncellemeleri commit'lenmedi |
| **Build durumu** | `tsc --noEmit` ✅ · `lint` ✅ · `npm run build` ✅ (**164 statik sayfa**, 155'ten) · `check-links` **18 benzersiz / 694 çift** (19/809'dan) · 72/72 kurs tarihi üretiliyor · 9 online sayfa × 1440/390/360 px taşma ve konsol hatası yok, tek H1, 497–581 kelime |
| **Tamamlanan tipler** | Ana Sayfa · Dil Kursu 10 · Üniversite Proficiency 21 · Şube Kurs Tarihi 72 · Şube İletişim hub+5 (form hariç) · Sınav Hazırlık Ana 16 · Menü (PM) · Kategori Hub'ları 7 (P3) · Özel Ders 18 (P4-1) · **Online 8 + çatı (P4-2)** |
| **Aktif faz** | P4 Zengin İçerik — özel ders ✅, **online ✅** (8 dil + `/diger-program/online-dil-egitimi`). Sıradaki alt tür: **nedir (8)** |
| **Bir sonraki somut adım** | Kullanıcı onayı → P4 online commit'i (kod + döküman ayrı; UI turu dosyalarını karıştırmadan; `public/assets/online_education*.jpg` ve sınav hero fotoğrafları izlenmiyor ama kod onlara bağlı → kullanıcı ekler); sonra P4 "nedir" Aşama 0 |
| **Yarım kalan iş** | Yok. |
| **Engeller** | Kalan 18 ölü hedef: `/ogrenci-yorumlari` (footer) → P7 · proficiency `nedir/ornek-sinav-sorulari` (21'er) → P4 nedir/tekil · Almanca/Çince/Türkçe tekil ve yurtdışı alt sayfaları (1'er) → P4 · `/aktivite-aktiviteler`, `/duyurular` (1'er) → P7 |
| **Bekleyen kullanıcı kararları** | GMAT/GRE grup büyüklüğü çelişkisi (firma "2-3 kişilik", P3 tablosu "en fazla 2"; satır gizli) · #2 yorum/duyuru · #4 form · #5 şube fotoğrafları · #6 JSON-LD (özel ders + online SSS'leri FAQPage için hazır) · Search Console verisi (özel ders kalıcılığı) · dile özgü online fotoğraflar (isteğe bağlı; şimdi 7 dil aynı genel görseli kullanıyor) |
| **Bilinen veri notları** | Joomla `?id=` 301'leri sorgu dizesini hedefe taşıyor (Next.js davranışı; canonical temiz) · `.html` 301'leri Faz 8 · online sayfalarında "Skype" kaynakta kaldı (kullanıcı kararı; Skype Mayıs 2025'te kapandı) · HSK ve SIELE'nin evden sınav seçeneğinin Türkiye'de açık olduğu doğrulanamadı (sayfada not) · İtalyanca sınavlar için yalnız "merkezde" yazıldı (evden seçenek resmi sayfalarda yok ama "yoktur" da denmiyor) |
| **Kalıcı kurallar** | P4 içerik kuralı (CLAUDE.md §5) · P4 tasarım (CLAUDE.md §9 — online: "nasıl işler" akışı baskın, adım metinleri firma cümleleri) · UI turu: TopBar yok, ilk bölüm header'ın arkasından · `soon` bayrağı (§10) · hub linkleri `isProducedPage()` süzgecinden · zengin içerik sayfaları tek listeden: `lib/richPages.ts` |

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
