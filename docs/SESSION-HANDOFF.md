# Nerede Kaldık — Oturum Devir Dökümanı

> **Her yeni chat İLK bu dosyayı okur, SON bu dosyayı günceller.**
> §A her oturum sonunda **üzerine yazılır** (tek doğru güncel durum).
> §D **yalnız eklenir** (en yeni üstte). Yol haritası: [`remaining-pages-plan.md`](remaining-pages-plan.md).
> Kurallar: [`../ddm-web/CLAUDE.md`](../ddm-web/CLAUDE.md). Faz durumu: [`../PROGRESS.md`](../PROGRESS.md).

---

## §A — Güncel durum  *(son güncelleme: 2026-10-02, 5 sınav gizlendi + ÖSD sayfası + Sınav Hazırlık kataloğu — commit'lendi)*

> ⚠ **FORM GÖRSEL, ARKA UÇ YOK.** `ContactForm` sayfaların çoğunda duruyor ama HİÇBİR YERE veri göndermiyor; basınca "Form henüz
> açılmadı, bilgileriniz gönderilmedi" notu + seçilen şubenin telefonu / WhatsApp'ı çıkıyor. Gönderim = karar #4, açık.

| Alan | Değer |
|---|---|
| **Son kod commit'i** | `83f29b5` (5 dil + 7 sınav sayfası, ÖSD, 5 gizli sınav, Sınav Hazırlık kataloğu) · `5080ad1` (Ana Sayfa yurtdışı fotoğrafı — ayrı oturumun işi, ayrı commit). Çalışma ağacı temiz. |
| **Son döküman commit'i** | Bu dosya + `bekleyen-sorular.md`, `PROGRESS.md`, `page-types.md`, `remaining-pages-plan.md`, `ddm-web/CLAUDE.md` — koddan ayrı commit (2026-10-02). |
| **Build durumu** | `tsc --noEmit` ✅ · `lint` ✅ · `npm run build` ✅ (**209 statik sayfa**: 208 → +11 yeni → −11 gizli → +ÖSD) · `check-links` **0 ölü hedef** · gizli 11 adres 404, sitemap'te yok · 16 sayfa × 1440 / 390 / 360: taşma yok, tek H1, konsol hatası yok · `code-review` (high) 10 bulgu → hepsi düzeltildi |
| **Tamamlanan tipler** | Ana Sayfa · Dil Kursu **15** (10 + Japonca, Korece, Yunanca, Bulgarca, İsveççe) · Üniversite Proficiency 19 · Şube Kurs Tarihi 72 · Şube İletişim hub+5 · Sınav Hazırlık Ana **18 yayında** (16 + TELC, ÖSD, DELF \| DALF, DELE, CILS \| CELI, E-TEP, OET − 5 gizli: TOEIC, TOEFL Essentials, TOEFL Primary, İngiltere Vize / IELTS Life Skills A1, Fransızca Aile Birleşimi) · Menü (PM) · Kategori Hub'ları 7 · P4 · P5 · P6 · P7 · PF form (görsel) |
| **Aktif faz** | Eksik dil + sınav sayfaları (yeni istek, planda yoktu) **bitti**. Kalan: PF arka uç (karar #4) · P8 SEO taşıma + temizlik · P9 kesişen işler + QA. |
| **Bir sonraki somut adım** | **(1)** Push kullanıcıya bağlı · **(2)** `bekleyen-sorular.md` "Eksik dil / sınav sayfaları" sorularını müşteriye sor (fiyat kelimesi geçen eski başlıklar, İsveç Kültür Merkezi, E-TEP / OET grup şubesi, kalan 5 dil) · **(3)** PF arka uç · **(4)** P8. |
| **Yarım kalan iş** | Yok. |
| **Engeller** | Yok. PF arka ucu için e-posta adresleri bekleniyor. |
| **Bekleyen kullanıcı kararları** | **Tam liste: [`bekleyen-sorular.md`](bekleyen-sorular.md).** Yeni: eski 10 dil sayfasının başlığında "Ders Fiyatları" · İsveççe "İsveç Kültür Merkezi" cümlesi · E-TEP / OET grup derslerinin şubesi · Portekizce, Hırvatça, Boşnakça, Slovakça, Farsça sayfası. |
| **Bilinen veri notları** | **ddmcadde kaynağı:** eski sitede OLMAYAN 11 sayfanın firma metni Bağdat Caddesi sitesinden `node scripts/pull-ddmcadde.mjs --new` ile `ddm-web/data/ddmcadde_content.json`a çekildi (fiyat / "Ücreti:" / "TL" satırları ve "Kurs Başlama" tarihleri kaynağa ALINMAZ; `✅` süsü temizlenir). Yeniden çekmek bu dosyayı günceller — `site_content.json`a dokunmaz. TestDaF'ın ddmcadde kaydı bu sitenin TestDaF kaynağıyla aynı metin (yalnız arşiv). **Dil listesi:** `LANGUAGES` (10, Ana Sayfa ızgarası / hero balonları / Yabancı Dil selam duvarı) + `EXTRA_LANGUAGES` (5) = `LANGUAGE_PAGES` (route, menü, form, sitemap, "diğer diller"); `OTHER_LANGUAGE_NAMES` artık 5 dil (sayfası olmayan). **Sınav ↔ dil bağlantısı:** `data/exams.ts` `language` alanı → sınav hero'sunda dil bağlantısı + dil sayfasının "Uluslararası … Sertifikası" kutusunda ters bağlantı (+ kutunun metninde adı geçen sınavlar). Fotoğraflar: `public/assets/home_page_images/dil-{japonca,korece,yunanca,bulgarca,isvecce}{,2}.jpg` (İsveççe dosya adları ASCII'ye çevrildi — "ç" NFD kodlanmıştı, sunucu bulamıyordu). |
| **Gizli sınavlar (2026-10-02)** | Müşteri isteği: TOEIC (+ nedir, özel ders, 4 şube tarihi), TOEFL Essentials, TOEFL Primary, İngiltere Vize (IELTS Life Skills A1), Fransızca Aile Birleşimi **sitede görünmez, adresi 404**. Tanımlar dosyalarda DURUR; tek liste `ddm-web/data/hiddenPages.ts`. Geri açmak: slug'ı listeden çıkar + o commit'te elle silinen bağlantıları geri koy (ana sayfa TOEIC logosu, hub metinleri, kurumsal / diğer program / tekil sayfa bağlantıları). Bilgi amaçlı kalanlar: Business English sayfasındaki iş İngilizcesi sınav tablosu (TOEIC satırları), Çocuklar İçin İngilizce'deki çocuk sınavları tablosu (TOEFL Primary satırı), IELTS Nedir'deki "IELTS for UKVI Life Skills" — bağlantısız, olgu. |
| **Kalıcı kurallar** | CLAUDE.md §5 "ddmcadde kaynaklı sayfalar (2026-10-01)" (yeni) · §5 "Müşteri kararları 2026-09-30" · §9 PF notu · **sayfada düz yazı yok** · **içerik soruları iş bitince toplu sorulur** (hafıza) |


**Sonraki oturum prompt'u (kullanıcıya verilecek, 2026-10-01):**

```
PF devam · İletişim formunun arka ucu (karar #4) — ya da P8 SEO taşıma (hangisini istersen).

OTURUM BAŞI
- Oku: docs/SESSION-HANDOFF.md §A (FORM GÖRSEL, ARKA UÇ YOK), ddm-web/CLAUDE.md §2 (output export yok), §4, §5 "Müşteri
  kararları 2026-09-30" + "ddmcadde kaynaklı sayfalar", §9 PF notu, docs/bekleyen-sorular.md. git status / git log -5.
  AGENTS.md: Route Handler yazmadan önce node_modules/next/dist/docs/ altındaki rehberi oku. Türkçe ve kısa yaz.
- Başlangıç sayıları: npm run build (209 sayfa) · node scripts/check-links.mjs (0 ölü hedef).

BU OTURUMUN İŞİ (PF arka uç)
- Önce sor: başvurular hangi adrese (şubeye göre mi?), gönderim yöntemi (Route Handler + e-posta servisi / form servisi),
  spam koruması.
- ContactFormFields.tsx onSubmit: önce reportValidity, sonra gönderim; hata stilleri hazır (aria-invalid + .error).
  Başarı mesajı ANCAK gerçekten gönderildiğinde. Sayfa sayısı 209 kalsın, check-links 0 kalsın.

DOKUNULMAYACAKLAR (müşteri "kalsın" dedi): Enforex cümlesi · Kaplan metni ve rakamları ·
KVKK metni ve tek onay kutusu.

KAPANIŞ: SESSION-HANDOFF §A + §D, PROGRESS (PF satırı), plan karar #4. Commit'i kullanıcıya sor; kod ve döküman ayrı; push yok.
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

### 2026-10-02 (2) · Opus 5.5 · ÖSD Kursu + yeni sınavlar Sınav Hazırlık sayfasında — `83f29b5`
- **ÖSD:** firma metni almancakurslari.com/sinav/osd-kursu (aynı şubenin Almanca sitesi; aynı Joomla şablonu) — `pull-ddmcadde.mjs` girdisine `origin` alanı eklendi, kayıt `ddmcadde_content.json`da (`osd-kursu`). Kaynak 213 kelime → genel bilgi resmi kaynaklardan (osd.at Durchführungsbestimmungen B1 / B2, Prüfungsordnung 2026, oesterreich.gv.at, migration.gv.at, wien.gv.at, BAMF; adresler `data/exams.ts` yorumunda): ÖSD nedir, B1 yapısı, sınav türleri, puanlama, 6 SSS (geçerlilik, aile birleşimi, vatandaşlık — 2021 sonrası B1 sayılmıyor, üniversite, Goethe farkı, Türkiye'deki merkezler). Pazarlama kapanışı + "Kontenjanlar sınırlıdır / erken kayıt" `drop`. Kaynaktaki "Küçük gruplarda", "Online ve yüz yüze" firma cümlesi olarak kaldı. Menü (TELC'ten sonra), "Avrupa dillerinde sınavlar" grubu, `examGlance`, Almanca sayfasının sertifika kutusu (otomatik).
- **Sınav Hazırlık sayfası:** kataloğa TELC, ÖSD, DELF | DALF, DELE, CILS | CELI, E-TEP, OET (amaç grupları + karşılaştırma tablosu); grup girişleri güncellendi ("İş hayatı" → "Meslek ve iş hayatı", OET; vize girişinde Fransa / İngiltere çıktı; kamu girişine e-TEP; yurtdışı girişine Avrupa dilleri + ÖSD); "16 sınav" sayısı metinden çıktı.
- **Alt linkler:** sınav sayfalarının altındaki "Diğer sınavlar" dizini `EXAM_GROUPS`ten — yeniler var, gizliler yok. Footer "SINAV HAZIRLIK" sütunu (8 eski sınav) değişmedi.
- **Doğrulama:** tsc ✅ · lint ✅ · build **209** · check-links **0** · ÖSD + hub 1440 / 390 / 360: taşma yok, tek H1, konsol hatası yok.

### 2026-10-02 · Opus 5.5 · 5 sınav yayından kaldırıldı (sayfa silinmedi) — `83f29b5`
- **İstek:** TOEIC, TOEFL Primary, Fransızca Aile Birleşimi, TOEFL Essentials, IELTS Life Skills "her yerden kalksın, sayfa silinmesin, URL ile de gidilemesin".
- **Yapı:** `data/hiddenPages.ts` (`HIDDEN_EXAM_SLUGS`, `isHiddenExam`, `isHiddenPath` — alt ağaç dahil). Süzülen kaynaklar: `EXAMS` (`ALL_EXAMS` süzülür), `EXAM_GROUPS`, `EXAM_GUIDES`, `EXAM_PRIVATE_LESSONS`, `COURSE_DATES` (`ALL_COURSE_DATES`), sınav hub kataloğu (`hubs.ts`), menü (`lib/navTree.ts` her modda düşürür; `lib/navAudit.ts` atlar — `nav.ts` kalemleri geri açılış için durur), Özel Dersler hub listesi. Form listesi, dil sayfası sınav bağlantıları, sitemap otomatik.
- **Elle temizlenen:** ana sayfa TOEIC logosu · sınav hub metni + "geçerlilik" SSS · kurumsal hub (kaynak cümle `edits`, program kartı, SSS; ilgili bağlantıda TOEIC → Business English) · İngilizce Kursları "İlköğretim" alt önerisi · Diğer Programlar (TOEFL Primary önerisi + bağlantı) · tekil sayfa "TOEIC Nedir?" · Business English bağlantı bloğu · Çocuklar İçin İngilizce bağlantısı · Online Eğitim (TOEIC / IELTS Life Skills çipleri + kaynak cümle `fixes` + SSS). Ek: Online Eğitim'de DELE, DELF, CELI, CILS çipleri yeni sınav sayfalarına bağlandı.
- **Bilerek kalan (olgu, bağlantısız):** Business English iş İngilizcesi sınav tablosu (TOEIC), çocuk sınavları tablosu (TOEFL Primary), IELTS Nedir'de "UKVI Life Skills".
- **Doğrulama:** tsc ✅ · lint ✅ · build 219 → **208** · check-links **0** · 11 gizli adres `next start`ta 404, sitemap'te 0, ana sayfada 0 geçiş.

### 2026-10-01 (8) · Opus 5.5 · Eksik 5 dil + 6 sınav sayfası (ddmcadde kaynaklı) + TestDaF güçlendirmesi — `83f29b5`
- **İstek:** Bağdat Caddesi sitesinde (ddmcadde.com) olup bizde olmayan diller ve sınavlar; her biri tek sayfa, diğer sayfalar
  gibi görünsün. Aşama 0 → Japonca pilotu → 4 dil → DELE pilotu → 5 sınav; her pilotta kullanıcı onayı alındı.
- **Kullanıcı kararları:** adresler onaylandı (`/yabanci-dil-egitimleri/{japonca,korece,yunanca,bulgarca,isvecce}-kursu`,
  `/sinav-hazirlik-egitimleri/{telc,delf-dalf,dele,cils-celi,e-tep,oet}-kursu`) · **"firma hakkında bilgi varsa fiyat dışında
  koyabilirsin"** (ddmcadde firma metni kullanılır, fiyat asla) · fotoğrafları kullanıcı verdi (10 adet) · "TestDaF'ın yazısı az,
  ddmcadde'den eklemeler yapabilirsin".
- **Yapılanlar:**
  - `scripts/pull-ddmcadde.mjs --new` → `data/ddmcadde_content.json` (5 dil + 6 sınav + TestDaF arşivi). Fiyat bölümü, tek
    tek "Ücreti:" / "… TL" satırları ve "Kurs Başlama" tarihleri alınmıyor; bozuk JSON'da betik durur (kayıt silmez).
  - Dil: `LanguageContentMap` `source: "ddmcadde"`, `h1Edit` (H1'deki "Ders Fiyatları" çıkar), `aboutAlso`, `meta`; `pricing`
    artık isteğe bağlı. Genel bilgi `data/languageExtras.ts` (`whyLearnAdded`, `levelsAdded`, `certAdded`, `faqAdded`; resmi
    kaynaklar yorumda: JLPT, TOPIK, Ellinomatheia, Sofya Üniversitesi, Swedex / Tisus). Kaynaktan "25 yıllık" →
    `FOUNDING_EDIT` (otomatik). Bulgarca "İstanbul'daki en iyi" çıkarıldı (`edits`); İsveççe "İsveç Kültür Merkezi" cümlesi
    doğrulanamadı → `ignored` + soru.
  - Sınav: `ExamDef` `source`, `h1Edit`, `meta`, `language`; yeni bloklar `addedProse` / `addedStructure` / `addedFaq`, prose
    bloğunda `prepend` / `append`. Kaynaktaki olgu hataları `edits`te düzeltildi (DELE / DELF / CILS "Milli Eğitim Bakanlığı
    yönetmeliği" + CILS'te "İspanyolca"; OET not bantları 0–100 → resmi 0–500; e-TEP yazım). Yeni grup "Avrupa dillerinde
    sınavlar"; sınav kâğıdı bilgileri `data/examGlance.ts`.
  - TestDaF (428 → 843 kelime): kaynak metin ddmcadde'deki soru başlıklarına bölündü + dijital TestDaF yapısı, TDN, Türkiye
    merkezleri, SSS (testdaf.de) + Almanca Kursu kaynağındaki firma cümlesi ("TDN 4 ve TDN 5 eğitimleri birebir özel ders").
  - Menü (`lib/nav.ts`): 5 dil (ddmcadde sırası) + 6 sınav. `pageRegistry` / form / sitemap `LANGUAGE_PAGES`ten. Yabancı Dil
    sayfası: "diğer diller"de 5 yeni dil bağlantılı çip, karşılaştırma tablosunda 5 satır (süre kaynaktan türer).
  - Bağlantılar: sınav hero'sunda dil kursu; dil sayfasının sertifika kutusunda sınavlar (`language` + metinde adı geçen).
  - 5 bayrak (jp, kr, gr, bg, se). Fotoğraf yer tutucusu yazıldı, fotoğraflar gelince kaldırıldı.
- **code-review (high):** 10 bulgu → düzeltildi (betik ENOENT / li fiyat süzgeci, İngilizce kutusunun eksik bağlantıları,
  `languageLinks` 15 dil, Kore trigramları, meta uzunluk bekçisi, ortak `findDdmcaddeRecord` / `applyH1Edit`, `illustrationFor`,
  ölü yer tutucu, hub süresi türetme).
- **Doğrulama:** tsc ✅ · lint ✅ · build 208 → **219** · check-links **0** · 1440 / 390 / 360 taşma yok, tek H1, hata yok.
- **Açık kalanlar:** `bekleyen-sorular.md` "Eksik dil / sınav sayfaları (2026-10-01)". **Commit'ler:** henüz yok.

### 2026-10-01 (7) · Opus 5.5 · Ana Sayfa yurtdışı fotoğrafı — sağdaki öğrencinin yüzü kesikti — `5080ad1`
- **Neden:** fotoğraf 3:2, kutu 4:3,4 (masaüstü) → ortalı kırpma sağdan ~%11 kesiyordu; öğrenciler fotoğrafın sağ yarısında.
- **Yapılan:** `styles/AbroadSection.module.css` `.photo`: `object-position: 100% 50%` (kırpma sağa yaslı) + `transform-origin:
  80% 50%` (ddmKenBurns'ün -%2 kaydırması sağda boşluk açmasın; %81'in üstünde açılıyor).
- **Doğrulama:** build ✅ · 1440 / 1100 / 390: üç öğrenci tam, animasyonun uç karesinde de kenar boşluğu yok, taşma yok.

### 2026-10-01 (6) · Opus 5.5 · Haftalık ders programı panosu — kesik saatler düzeltildi — commit bekliyor
- **Sorun (kullanıcı ekran görüntüsü):** Çocuklar İçin İngilizce hero panosunda 19:00–21:30 bloklarının bitiş saati kesik.
  Neden: ızgara sabit yükseklikte, saat aralığı geniş (09–23 = 28 yarım saat satırı) → 2,5 saatlik blok ~43px, iki satır sığmıyor.
- **Yapılan:** `styles/WeekBoard.module.css` — satır `minmax(var(--ddm-week-row-min), 1fr)`, ızgara `height` → `min-height`;
  yeni token `--ddm-week-row-min: 10px`. Geniş aralıkta kart uzar (Çocuklar: 618px), dar aralıkta eski yükseklik korunur.
- **Doğrulama:** build ✅ (208) · panolu 3 sayfa (Çocuklar İçin İngilizce, Almanca Konuşma, Hızlandırılmış Almanca) × 1440 / 1100 /
  390: kesik blok 0, taşma yok, konsol hatası yok (390'da pano liste görünümünde, ızgara yok).

### 2026-10-01 (5) · Opus 5.5 · Menü — İngilizce seviyeleri düşükten yükseğe — commit bekliyor
- **Yapılan:** `lib/nav.ts` İngilizce menüsü "SEVİYELER": Elementary → Pre-Intermediate → Intermediate → Upper-Intermediate →
  Advanced (önce tersiydi). Masaüstü mega menü ve mobil çekmece aynı veriden okuyor.
- **Doğrulama:** tsc ✅ · lint ✅ · build ✅ (208) · 1440'ta menü açılıp sıra okundu.

### 2026-10-01 (4) · Opus 5.5 · Yurtdışı Eğitim — en alttaki dil şeridi kaldırıldı — commit bekliyor
- **İstek:** "Yurtdışı Eğitim kısmında en altta dil kısmı var, bunu kaldır."
- **Yapılan:** `app/yurtdisi-egitim/page.tsx`'ten `LanguageStrip` ("19 dilde eğitim…" + dil kartları + "Diğer Yabancı Dil
  Kursunu Keşfet") çıktı; sayfa artık form → "İlgili sayfalar" ile bitiyor. `data/hubs.ts` `ABROAD_HUB`: `otherLabel` /
  `stripTitle` / `stripCta` slotları silindi, 4 kaynak satırı (H19 başlığı dahil) gerekçeyle `ignored`'a; artık kullanılmayan
  `LANGUAGE_LIST_EDITS` bu hub'dan çıktı (Yabancı Dil + İngilizce Kursları'nda duruyor). Yabancı Dil sayfasındaki şerit aynen.
- **Doğrulama:** tsc ✅ · lint ✅ · build ✅ (208) · `/yurtdisi-egitim` 1440 / 390 / 360: şerit yok, taşma yok, tek H1, konsol hatası yok.

### 2026-10-01 (3) · Opus 5.5 · Sekme simgesi (favicon) — commit bekliyor
- **İstek:** "sekme logosu yok, koyar mısın".
- **Yapılan:** `app/favicon.ico` (16/32/48 PNG girdili ICO), `app/icon.png` (512×512, yuvarlak köşe), `app/apple-icon.png`
  (180×180, köşesiz — iOS kendisi yuvarlar). Lacivert #2a2d7c zemin, beyaz "DDM" (alt yazı küçük boyda okunmadığı için yok).
  Kaynak `public/assets/ddm-logo-lacivert.png`'nin saydamlık kanalı (beyaz logo dosyasında leke/gürültü var). sharp ile üretildi;
  kod değişmedi, yalnız 3 yeni dosya.
- **Doğrulama:** tsc ✅ · lint ✅ · build ✅ (208 = 205 sayfa + 3 simge yolu) · `<head>`'de favicon / icon / apple-touch-icon
  etiketleri var, üç dosya 200 dönüyor.

### 2026-10-01 (2) · Opus 5.5 · Numaralar yalnız şube sayfalarında + kurumsal mail + tek WhatsApp hattı — commit bekliyor
- **İstek:** hiçbir dil / sınav sayfasında Kadıköy numarası olmasın, numaralar yalnız şube sayfalarında; İngilizce kursu şube
  kurs tarihlerinde olabilir, "TOEFL sayfasında numara olmasın" · footer'a "kurumsal mail info@dunyadillerimerkezi.com" ·
  mobil çubuktaki üçlü düğme şube sayfalarından da kalksın · WhatsApp numarası 0537 370 87 18.
- **Yapılan:**
  - `CourseDatePage`: `showPhone = category === "yabanci-dil-egitimleri"` — sınav kursu şube sayfalarında (36) CTA alt yazısı
    yalnız e-posta, "Şubeyi Arayın" yerine şube iletişim sayfasına "Şubeyle İletişime Geçin". Dil kursu şube sayfaları (36) aynen.
  - `MobileBottomBar`: her sayfada yalnız "Biz Sizi Arayalım"; `branch` prop'u ve `SiteChrome`'un `branch` prop'u kalktı
    (3 çağıran güncellendi), CSS sadeleşti (`.action`, `.label` yok).
  - `data/branches.ts`: şube başına `wa` alanı (4'ü sabit hattın kendisiydi, Etiler'de yoktu) → tek `WHATSAPP` sabiti; `waHref()`
    argümansız. Şube iletişim kartı WhatsApp satırında artık bu numara yazıyor; Etiler'de de WhatsApp var; iletişim sayfası
    giriş cümlesi her şubede "adres, telefon ve WhatsApp".
  - Footer: logo + tanıtım altında "KURUMSAL MAİL · info@dunyadillerimerkezi.com" (`CORPORATE_MAIL`).
- **Tarama (205 HTML):** numara geçen sayfalar yalnız iletişim (6, hub dahil), tanıtım (4), dil kursu şube tarihi (36).
  Genel sayfa ve sınav kursu şube sayfası 0. (TOEIC sayfasındaki ETS sınav merkezi telefonları DDM'nin değil, kaldı.)
- **Doğrulama:** tsc ✅ · lint ✅ · build ✅ (205) · 6 sayfa × 1440 / 390 / 360 (`next start` :3400): taşma yok, tek H1,
  konsol hatası yok, mobil düğme 52px.
- **Ek (aynı gün, kullanıcı: "lacivert kartlarda numara e-mail yazmasın, direkt şubeye yönlendirsin, şube kurs sayfalarında da"):**
  `CourseDatePage` — `showPhone` kalktı; dil kursu şube sayfaları dahil 72 kurs tarihi sayfasında telefon / e-posta yok.
  Lacivert CTA kartı: alt yazı "Adres, telefon ve yol tarifi {Şube} şubemizin iletişim sayfasında.", düğme "{Şube} Şubesine
  Ulaşın" → şube iletişim sayfası; "veri eksik" kutusundaki "Şubeyi Arayın" (tel:) da aynı düğme oldu. Tarama: numara / şube
  e-postası / WhatsApp yalnız iletişim (6) + tanıtım (4) sayfalarında. Lacivert kartlarda başka numara / e-posta yoktu.
  build ✅ (205) · 2 sayfa × 1440 / 390 / 360 taşma yok, konsol hatası yok.

### 2026-10-01 · Opus 5.5 · Footer + Kadıköy "merkez" iletişimi kaldırıldı — commit bekliyor
- **İstek (kullanıcı):** (1) footer'da şube iletişim linkleri olmasın · (2) şubelerin kendi iletişim sayfaları dışında
  "Kadıköy Merkez" ve telefonu hiçbir yerde yazmasın; formdaki "Beklemeden konuşmak için Kadıköy şubemiz · 0216 330 12 17 ·
  WhatsApp" silinsin · (3) en alt satır "Dünya Dilleri Merkezi Yabancı Dil Okulları. Tüm hakları saklıdır." — şube adları ve
  "KAPLAN INTERNATIONAL ve ILSC resmi kayıt ofisi" kalksın.
- **Yapılan:**
  - `SiteFooter`: şube bloğu (KADIKÖY MERKEZ + adres + telefon + e-posta) ve `branch` prop'u silindi; `lib/nav.ts`
    `FOOTER_COLUMNS`'tan "ŞUBELER" kolonu çıktı; `FOOTER_LEGAL_LEFT/RIGHT` → tek `FOOTER_LEGAL`. CSS'te kullanılmayan sınıflar silindi.
  - `ContactFormFields`: paneldeki "Beklemeden konuşmak için…" + telefon / WhatsApp düğmeleri (geniş ve dar form) silindi;
    gönderim notu artık numara vermiyor → seçilen şubenin iletişim sayfasına, şube seçilmediyse `/ddm-iletisim`'e düğme.
    `icons` prop'u ve `.reach*`, `.act.wa` CSS'i kalktı.
  - `MobileBottomBar`: şubesi olmayan sayfada Kadıköy'e düşmüyor; şube sayfalarında o şubenin Ara / WhatsApp'ı. Ana düğme her
    sayfada telefon ikonlu "Biz Sizi Arayalım" (önce sayfaya göre "Kayıt Ol / Bilgi Al / İletişim"; `ctaLabel` artık yalnız header'da).
    Kısa süre eklenen "Şubeler" düğmesi kullanıcı isteğiyle kaldırıldı. ≤419px'te 3 düğme sığsın diye WhatsApp yalnız ikon
    (ad ekran okuyucuda); düğmeler tek satır, eşit boy (52px).
  - `data/branches.ts`: `DEFAULT_BRANCH` + `contactBranch` silindi; Kadıköy `kicker` "KADIKÖY ŞUBESİ".
  - Mega menü İletişim kutusu: "Kadıköy Merkez · adres · 0216 330 12 17" → "İstanbul'daki 5 şubemizden size en yakın olanı seçin."
  - Ana Sayfa şube kartı etiketi "KADIKÖY MERKEZ" → "KADIKÖY"; Kadıköy tanıtım rozeti + meta description "Kadıköy Merkez Şube" →
    "Kadıköy Şubesi" (`headingEdits`).
- **Dokunulmadı, kullanıcıya soruldu:** Kadıköy'ün kendi kurs tarihi sayfaları (9) ve tanıtım sayfası kendi telefonunu gösteriyor
  (diğer şubelerinkiler de öyle) · `/ddm-iletisim` şube listesi ve her şube iletişim sayfasındaki "diğer şubeler" listesi 5 şubenin
  telefonunu gösteriyor · KVKK aydınlatma metnindeki veri sorumlusu "Telefon: 0216 330 12 17" (yasal metin, 2026-09-30 kararı:
  olduğu gibi kalır) · Ana Sayfa ve Yurtdışı Eğitim gövdesindeki Kaplan / ILSC cümlesi (istek yalnız sayfa altı içindi).
- **Doğrulama:** tsc ✅ · lint ✅ · build ✅ (205) · 5 sayfa × 1440 / 390 / 360 (`next start` :3400): footer'da telefon / e-posta /
  Kadıköy yok, formda numara yok, mobil çubuk dokunma hedefleri ≥44px, taşma yok, tek H1, konsol hatası yok.

### 2026-10-01 · Opus 5.5 · Kullanıcı düzeltmesi: tek yıl kalıbı + üniversitelerde kalan yanlışlar — commit bekliyor
- **Kullanıcı:** "2003'te kuruldu dedim, bunca sayfada düzeltmedin mi" · "tüm şubeler için 2003'ten bu yana yani 23 yıldır
  hizmet veriliyor diye yaz" · "üniversitelerde eksik / yanlış bilgi varsa düzenle".
- **Eksik kalanlar (önceki tur):** yalnız "25 yıl" geçen yerler düzeltilmişti; Ümraniye "15 yıllık", Bağdat Caddesi "20 yıldır
  aynı adreste", Proficiency "18 yıllık", TOEIC "13 yıllık tecrübemiz" duruyordu ve şube sayfalarında yıl / 19 dil bilgisi
  görünür bir yerde yoktu. Üniversitelerde çelişen resmi kaynaklarda eski satır bırakılmış, kurs tanıtım cümlelerindeki yanlış
  bölüm adlarına "firma metni" diye dokunulmamıştı.
- **Yapılan:** `data/company.ts` `EXPERIENCE` / `SERVING` ("2003’ten bu yana 23 yıllık / yıldır") — Ana Sayfa rakam şeridi (23
  yıldır), Etiler ve Ümraniye kartları, footer, Bağdat Caddesi (başlık "23 Yıllık Güven…", "23 yıldır hizmette"), Etiler,
  Ataşehir (3 cümle), 10 dil kursu "Neden DDM", Proficiency ve TOEIC sınav sayfaları, YKS Dil ("23 yıldır 19 farklı dilde").
  `data/branches.ts` `ALL_BRANCHES_LINE` ("Tüm şubelerimizde 19 dilde eğitim ve sınav hazırlık kursları veriyoruz; 2003’ten
  bu yana 23 yıldır hizmetinizdeyiz.") → Ana Sayfa şube bölümü, 5 şube iletişim sayfası, 4 tanıtım sayfası; tanıtım künye
  kartına "Eğitimler" ve "Deneyim" satırları.
- **Üniversiteler:** kurs tanıtımında yanlış bölüm sayan 7 cümle (Bahçeşehir, ODTÜ, Kadir Has, Marmara, Doğuş, Kocaeli,
  Acıbadem) güncel bölümlere çevrildi; çelişkilerde en yeni resmi belge esas: Sabancı not alma 15 → 5 dk, Özyeğin TOEFL / PTE
  alt puanları kalktı, Acıbadem "20 TWE" kalktı, Yeditepe 50 puan bölümleri, Kadir Has kaldırılmış kayıt dondurma ve ders
  muafiyeti kuralları, Boğaziçi okuma kısımları; YTÜ'nün çelişen bölüm ağırlıkları kaldırıldı. Eksik bilgiler eklendi: Beykent
  asgari puanlar + 2026-27 sınav tarihleri, YTÜ ek kabul edilen sınavlar + 85 dk + Eylül barajı, Kocaeli Linguaskill / OTE,
  Özyeğin Düzey 4 muafiyeti + devlet üniversitesi binası şartı + dinleme ~35 dk, Işık ek oturumlar, Yeditepe dil bölümleri,
  Acıbadem konuşma 15 dk. Beş `caveat` notunun hepsi kalktı.
- **Doğrulama:** tsc ✅ · lint ✅ · build ✅ 205 · check-links 0 · Ana Sayfa, Bağdat Caddesi, Ümraniye, Kadir Has 1280 / 390 taşma yok.
- **Not:** scratchpad tarih değişiminde temizlendi; 16 üniversitenin doğrulama JSON'ları gitti — kaynak ve alıntılar
  `data/universityExams.ts` yorumlarında duruyor.

### 2026-09-30 · Opus 5.5 · Müşteri cevapları koda işlendi (8 madde) — commit bekliyor
- **Sonuç:** 207 → **205 sayfa** · check-links 2 → **0** · tsc / lint / build ✅ · 33 sayfa × 3 genişlik temiz.
- **Madde 1 · 19 dil, tek liste:** `data/languages.ts` `ALL_LANGUAGE_NAMES` = kursu olan 9 dil ("İngilizce Konuşma" sayılmaz) +
  `OTHER_LANGUAGE_NAMES` 10 dil = 19 (rakam tutmazsa build düşer; kullanıcı listeyi onayladı). Şube tanıtım sayfalarında
  şubeye özel dil / sınav etiketleri (`ProgramColumn.tags`) kalktı; dört sayfanın sonunda AYNI "Dünya Dilleri Merkezi'nde
  eğitim" bölümü (19 dil + `EXAMS` 16 sınav + 6 ortak başlık), program sütunlarının altında oraya inen tek satır. Şubenin
  dillerini sayarak sınırlayan iki kaynak cümlesi (Kadıköy, Etiler) aynı listeye çevrildi (`edits`); "başta olmak üzere"
  diyen cümleler aynen. "8 Dilde Eğitim" etiketi → "19 Dilde Eğitim".
- **Madde 2 · "25 yıl" → "2003'ten bugüne":** 3 değil **15 yerdeydi** (Ana Sayfa 1, Bağdat Caddesi 2, Etiler 2, 10 dil kursu
  sayfasının "Neden DDM" girişi). `data/company.ts` (yeni): `FOUNDED_YEAR`, `yearsSinceFounding()`, `FOUNDING_EDIT`. Büyük rakam
  artık metinden okunmuyor, 2003'ten hesaplanıyor (bugün 23; `lib/languageFaq.ts` `yearsOfExperience` silindi).
- **Madde 3 · şubenin adı "Etiler":** `data/branches.ts` ad + kicker; elle yazılmış kopyalar (Ana Sayfa kartı ve giriş cümlesi,
  footer alt satırı, P3 / P4 / P5 `edits`'leri) temizlendi. Kullanıcı onayıyla kaynaktaki "Beşiktaş Şubesi" de "Etiler":
  `currentBranchName()` (kurs sayfalarındaki şube satırları, kurs tarihi başlıkları, iletişim hub'ı, 8 meta açıklamasındaki
  "Levent, Etiler"), IELTS cümlesi (`edits`), menüde 2 etiket. Tanıtım sayfasının Google başlığı "Etiler Dil Kursu | Dünya
  Dilleri Merkezi Etiler (Levent)". Adres, telefon, e-posta ve sayfa adresleri değişmedi.
- **Madde 4 · "Öğrenme Garantisi":** bağlantı kalktı, düz metin (`SHARED_LINKS` `href` isteğe bağlı). Aynı desendeki "Gündüz,
  Akşam ve Hafta Sonu Dersleri" bağlantısı kullanıcı kararıyla kaldı.
- **Madde 5 · Duyurular + Aktiviteler + Mektuplar:** Ana Sayfa Bölüm 10 tümüyle kalktı (kullanıcı: "mektuplar ve duyuruları
  kaldır"; `LettersSection` + CSS silindi). `next.config.ts` `ANNOUNCEMENTS`: 9 kurs duyurusu kendi kurs / sınav sayfasına,
  Speaking Club → İngilizce Konuşma, YKS Dil → YKS Dil İngilizce, TOEFL-IELTS → Sınav Hazırlık hub'ı, Kar Tatili + iki liste
  sayfası → Ana Sayfa; her biri `.html`'li ve `.html`siz + `/duyurular/:rest*` güvenlik ağı (tablo kullanıcı onaylı).
- **Madde 6 · kapanmış 2 üniversite:** İstanbul Şehir ve Süleyman Şah `data/universities.ts`, `lib/universityContent.ts`,
  `next.config.ts`'ten çıktı (21 → 19). `CLOSED_UNIVERSITY_SLUGS`: kök + nested, `.html`'li ve `.html`siz 8 adres tek adımda
  Proficiency Kursu'nun `#universiteler` bölümüne. Menüde üniversite bağlantısı yok (teyit).
- **Madde 7 · eskimiş sınav bilgileri:** 19 üniversitenin hepsi resmi sitelerinden yeniden doğrulandı (her biri ayrı araştırma;
  alıntı + adres `data/universityExams.ts` yorumlarında). Yeni düzenek: `UniversityExamInfo.edits` (kaynak satırı → güncel
  satır, `null` = satır kalkar; kullanılmayan anahtar build'i düşürür, `lib/universityContent.ts`). ~100 satır güncellendi;
  "Önceki sınav biçimi" başlığı ve `outdated` notu kalktı, yerine yalnız doğrulanamayan ayrıntı kalan 5 sayfada `caveat`
  notu. Doğrulama 2 gün önceki kayıtta da hata buldu (Okan TOEFL 79 → 72, Kocaeli "tek oturum 120 dk", ODTÜ "yılda altı kez",
  Boğaziçi geçme koşulu, Doğuş ağırlıkları…). Sınavı değişen 8 üniversitede bölüm etiketleri yeniden adlandırıldı.
- **Madde 8 · Ümraniye:** tanıtım sayfası ve kurs takvimi YOK — karar (kod notları güncellendi, `source: string | null` kalktı).
  Ana Sayfa kartı iletişim sayfasına gidiyordu; düğme "Ümraniye Şubesi İletişim" oldu. "Ataşehir Şubesi" başlık hatası zaten
  düzeltilmişti (`lib/branchContent.ts` `METADATA_FIXES`).
- **Dokunulmadı (müşteri "kalsın"):** Enforex cümlesi · Kaplan metni ve rakamları · Fransızca Aile Birleşimi · KVKK metni +
  tek onay kutusu.
- **code-review (high):** 10 bulgu. Düzeltildi: doğrulanmamış satırların "güncel" gibi basılması (`caveat`), meta
  açıklamalarında "Levent, Etiler", sınav sayfası şube eşlemesi ("Etiler" eklendi), `edits`'in gizli blok / giriş
  paragraflarında da çalışması, ölü etiket eşlemeleri ve `.tagsFlat`, kullanılmayan `branchLabel` (72 kayıt), `joinTr`
  yardımcısı (`lib/listText.ts`), belge tutarlılığı. Bilinçli bırakıldı: yıl sayısının build gününe bağlı olması (kullanıcı
  isteği: sabit yazılmasın).
- **Onay sayfası (artifact):** değişen ekranlar + yönlendirme tablosu + üniversite pilotu kullanıcıya tek sayfada gösterildi.

### 2026-09-30 · Opus 5.5 · "Arapça" sözcüğü DDM'nin dil listelerinden çıkarıldı — `c77e031`
- **İstek:** kullanıcı "Yabancı Dil sayfasında Arapça yazıyor, Arapça kelimelerini kaldır" (önceki istek: "uygulama içinde
  Arapça olan ne varsa kaldır") → site genelinde DDM'nin KENDİ dil listeleri.
- **Yapılan (kaynak `site_content.json` değişmedi, hepsi `edits` / veri):**
  - `data/hubs.ts`: `LANGUAGE_LIST_EDITS` (yeni; "… Bulgarca, Arapça ve Farsça dil eğitimleri" → "… Bulgarca ve Farsça …") —
    Yabancı Dil, İngilizce Kursları, Yurtdışı Eğitim hub'larına eklendi · `OTHER_LANGUAGES` 11 → 10 (kutu + cümle) · SSS cevabı.
  - `data/home.ts`: hero kartı metni + dil kursları bölümünün girişi (aynı cümle, 2 yer).
  - `data/branchPromo.ts`: Levent / Etiler "Dil eğitimleri" cümlesi (`edits`) + etiket listesi (`tags.match`).
  - `data/otherPrograms.ts`: Tercüme — "Çeviri dilleri" kutuları 17 → 16 + kaynak cümle (`edits`).
  - `lib/hubContent.ts`: geliştirmede (`next dev`) sayfa önbelleği kullanılmıyor — `data/hubs.ts` değişince eski metin
    ekranda kalıyordu (üretimde önbellek aynen duruyor).
- **Dokunulmadı:** YDS Nedir ("YDS/1: Almanca, Arapça, …") ve YÖKDİL ("… Fransızca, Arapça olarak da düzenlenecektir") —
  ÖSYM'nin sınav dili bilgisi, DDM'nin kurs listesi değil.
- **AÇIK (bekleyen-sorular.md):** metinler hâlâ "19 farklı dil / 19 dilde" diyor, listelerde 18 ad kaldı (Tercüme'de 16).
  Rakam müşterinin onayladığı rakam olduğu için değiştirilmedi.
- **Doğrulama:** tsc ✅ · lint ✅ · build ✅ (207) · üretilen HTML'de "Arap" yalnız o 2 sınav sayfasında · 6 sayfa × 1440 / 390 /
  360: taşma yok, tek H1, konsol hatası yok.

### 2026-09-30 · Opus 5.5 · Ana Sayfa — dil kursları ↔ sınav hazırlık yer değiştirdi — `6ce4e9d`
- **Yapılan:** `app/page.tsx`te `<LanguageGrid />` ile `<ExamSection />` yer değiştirdi (kullanıcı isteği). Yeni sıra:
  hero → rakamlar → dil kursları → yurtdışı → sınav hazırlık → şubeler → … Zeminler aynı dizide kaldı (beyaz / gri / beyaz);
  hero kartlarının `#dil-kurslari` ve `#sinav-hazirlik` çapaları çalışıyor. Başka dosya değişmedi.
- **Karar:** sıra `CLAUDE.md` §9'a yazıldı.
- **Arap harfli yazı kaldırıldı** (kullanıcı: "arapça olan ne varsa kaldır"): tek yer video kapağındaki kayan selam şeridiydi —
  `data/home.ts` `VIDEO_SECTION.greetings` 2. satırından Arapça ve Farsça selam (Arap harfli iki söz) çıkarıldı. Şerit hâlâ
  dikişsiz dönüyor (yarı genişlik 2361px ≥ kapak 1000px). Üretilen 205 HTML'de Arap harfi yok.
  **Dokunulmadı, soruldu:** dil listelerindeki "Arapça" SÖZCÜĞÜ (Ana Sayfa, Yabancı Dil, İngilizce Kursları, Levent tanıtım,
  Tercüme, Yurtdışı; ayrıca YDS / YÖKDİL sınav dili listeleri) — çıkarsa müşterinin onayladığı "19 dil" 18'e iner.
- **Doğrulama:** tsc ✅ · lint ✅ · build ✅ (207) · 1440 / 390 / 360: taşma yok, tek H1, konsol hatası yok.

### 2026-09-29/30 · Opus 5.5 · Müşteri soru formu + cevapların not edilmesi — kod değişmedi, commit yok
- **Form:** `docs/musteri-sorulari-2026-09-29.docx` (A4, 21 soru, 5 bölüm; teknik terim yok, menü yolu + sitedeki alıntı).
  İlk sürüm 30 soruydu; kullanıcı isteğiyle şıklar, resim soruları, yazım / etiket soruları ve TOEFL Essentials, GMAT/GRE,
  çocuk kursu saati soruları çıkarıldı, Duyurular + Aktiviteler tek soruya indi. Sonda "Müşteriden alınacak dosyalar" ve
  "Müşteriye sorulmayacak — bizim kararımız" (9 madde) ekleri.
- **Cevaplar (2026-09-30):** kullanıcı formu Pages'te doldurdu (`docs/musteri-sorulari-2026-09-29.pages`); 14/21 cevap
  Word dosyasının "Cevap" sütununa ve `bekleyen-sorular.md`'ye (en başta tablo + ilgili maddelerin altında) işlendi.
  Özet: Ümraniye tanıtım sayfası **olmayacak** · tüm şubelerde **19 dil** + sınav hazırlık, tek liste · **2003'ten bugüne
  23 yıl** · şube adı **Etiler** · "Öğrenme Garantisi" bağlantısı kalkacak · **Duyurular + Aktiviteler kalkacak** · Kaplan
  metni ve rakamları şimdilik kalsın · Enforex "kalacak" · kapanmış 2 üniversite sayfası kaldırılacak · üniversite
  sayfalarında eski metinler güncellenecek · Fransızca Aile Birleşimi şimdilik kalsın.
- **Netleştirme (kullanıcı, 2026-09-30):** KVKK'de sorun yok → metin + tek onay kutusu olduğu gibi kalır (19–21 kapandı) ·
  Ümraniye'de tanıtım sayfası yok, **yalnız iletişim sayfası** (3–5 gereksiz, kurs takvimi yok) · Enforex cümlesi **kalsın** ·
  üniversite sayfalarında eskimiş bilgiler **güncellenecek**.
- **Tek açık soru:** form başvurularının gideceği e-posta adresleri (18) — kullanıcı sonra verecek.
- **Yapılmadı:** hiçbir cevap koda / veriye işlenmedi; build çalıştırılmadı (kod değişmedi).

### 2026-09-29 · Opus 5.5 · PF — İletişim / ön bilgi formu (GÖRSEL yarı; arka uç yok) — commit bekliyor
- **Adım 1:** `ContactFormCard` + `DetailSections` (+ CSS) silindi — hiçbir sayfada kullanılmıyordu (grep + tsc + build ile teyit, 207 sayfa
  değişmedi). `UniversityGrid` arama kutusuna dokunulmadı. Artık kullanılmayan: `StickyToc` (soruldu).
- **Adım 2 (tasarım):** 3 taslak scratchpad'de (A lacivert yan panel · B ön bilgi fişi + şube koçanı · C önce şube kartları + WhatsApp'tan
  gönder) → kullanıcı **A**. Zorunlu: Ad Soyad, Telefon, Kurs, Şube (+ KVKK onayı); E-posta, Mesaj isteğe bağlı. KVKK: "var olan yazıyı
  kullan". Kurs listesine sitedeki tüm kurslar (eski formun 23 kalemi + PTE, YÖKDİL, TOEFL Essentials / Primary, TestDaF, İngiltere Vize,
  Fransızca Aile Birleşimi, 4 İngilizce programı, Online, Kurumsal) = 36 seçenek / 4 grup.
- **Adım 3 (yerleşim, kullanıcı onaylı):** kurs tarihi (72) hariç her tipte geniş boy, `CtaBand`'ın yerinde (başlık / alt satır / ikinci
  bağlantı taşındı; dil kursunun kaynak kapanış cümlesi alt satırda); Şube İletişim'de hero altında, hub'da kartların altında. `CtaBand`
  yalnız kurs tarihinde. Menü / mobil çubuk / sayfa içi "Bilgi Al" düğmeleri forma iner. Dar boy hazır, kullanılmıyor.
- **Yeni:** `components/sections/ContactForm.tsx` (sunucu) + `ContactFormFields.tsx` (istemci: şube izleme, not), `KvkkSection.tsx`,
  `components/ui/HashDetails.tsx` (çapa gelince `<details>` açılır), `data/courseOptions.ts` (yayındaki sayfalardan türer; ön seçim üst
  adreslere çıkarak; `/ingilizce-kurslari` → İngilizce), `lib/kvkkContent.ts` (5 şube kaydında aynı metin denetimi, 7 `EDITS`, başlık listesi),
  `lib/kvkkConsent.ts`, `lib/formAnchor.ts`, `styles/ContactForm.module.css`, `KvkkSection.module.css`, `--ddm-form-*` tokenları.
  `lib/branchContent.ts` `findRecord` dışa açıldı. `data/home.ts` `HOME_CTA_BAND` kalktı.
- **Kullanıcı geri bildirimi (aynı gün):** (1) dil kursu hero'sundaki "Bilgi Al" takvime (`#kurs-takvimi`) gidiyordu → forma. (2) "Bilgi Al"a
  ikinci kez basınca (adres zaten `#kayit`) sayfa kaymıyordu — `next/link` aynı çapayı yok sayıyor. Yeni `components/ui/PageLink.tsx`:
  `#…` adresini düz `<a>` basar; `ButtonLink`, `SiteHeader`, `MobileBottomBar` kullanır. Playwright: 1440 header + hero, 390 alt çubuk,
  3 ardışık tıklama → her seferinde form başlığı header'ın altında.
- **Bulgu:** dil kursu sayfasındaki "Ön Bilgi Formu" ve menüdeki "Kayıt Ol" düğmeleri zaten `#kayit`'e gidiyordu (lacivert şerit) — artık
  gerçek forma iner. Üniversite hero'sundaki "Bilgi Al" `#iletisim`'e (footer) düşüyordu → forma. 404 sayfasının menü düğmesi ölü `#kayit`
  idi → `/ddm-iletisim`.
- **code-review (high):** 10 bulgu; düzeltildi: üniversite düğmesi, KVKK kapalı kutuya iniyordu (`HashDetails`), aynı adlı "Bilgi Al"
  düğmeleri farklı yere gidiyordu, dar boy kaydırma payı, ham px → token, onay etiketi, sr sınıfı. Bilinçli bırakıldı: boş form
  gönderilince de not çıkar (görsel aşama; arka uçla `reportValidity`), Ana Sayfa şeridindeki merkez e-posta / adres (footer'da var).
  **simplify:** çapa tek sabit + menü varsayılanı (18 tekrar silindi), düğmeler ortak `Button` / `ButtonAnchor`, uzun başlık eşiği
  kalktı, KVKK modülü sadeleşti. Bırakıldı: dar boy (kullanıcı kararı), hata stilleri (brief), kurs tarihi sayfalarına gelen +2 KB JS
  (`[sayfa]` rotası `RichRoute` ile paylaşılıyor, düşük öncelik).
- **Doğrulama:** tsc ✅ · lint ✅ · build ✅ 207 · check-links 2 · form 131 sayfa · ön seçimler denendi (IELTS, Proficiency, Almanca, Yurtdışı,
  İngilizce seviye, şube) · Levent'te WhatsApp gizleniyor · 1440 / 390 / 360 taşma yok · klavye sırası + odak.

### 2026-09-29 · Opus 5.5 · P7 — Öğrenci Yorumları (tek sayfa + Ana Sayfa bölümü) — commit bekliyor
- **Aşama 0:** 62 kayıt = 1 liste + 10 `?start=` + 51 tekil; 51 tekil = **43 yorum** (8'i aynı yorumun yüzde kodlu / ASCII ikinci
  adresi). Fotoğraf: brief 15 diyordu, canlı liste sayfalarında **29** gerçek öğrenci fotoğrafı (ara `?start=4,12,20,28,36`
  sayfaları gözden kaçmıştı; canlıda her sayfada yalnız ilk 4 yorumun içeriği açık). İki fotoğraf yalnız sayfadaki yerinden
  eşleşti (`ddm-ogrenci` → Cemal Uçar, `ece-ogrenci` → Ece Ertürk; ikisi de yayında değil). Yorumlarda geçen şubeler: Bağdat
  Caddesi, Kadıköy, Ataşehir, Beşiktaş, Kurtköy — Ümraniye ve Levent / Etiler yok. Tarihler 2015–2018.
- **Kararlar (kullanıcı):** 25'lik seçim onaylı (somut sonuç, ≥50 kelime, program dengesi, fotoğraf) · kartta şube ve tarih
  etiketi yok · isimler kaynaktaki gibi · tasarım **C · portre duvarı** (3 yön: sonuç kartları / program rafları / portre duvarı).
- **Yeni:** `data/testimonials.ts` (43 tanım, `published`, `signLines`, `tags`, `affiliation`, `photo`, `home`, `edits`;
  `TESTIMONIAL_FILTERS`, `TESTIMONIALS_PAGE`), `lib/testimonialContent.ts` (kaynaktan çözer; build denetimleri: kapsama, iki
  adreste aynı metin, ilk satır = başlık, kullanılmayan `edits`, imzada `affiliation`, diskte fotoğraf, Ana Sayfa sırası),
  `TestimonialsPage`, `TestimonialFilter` (istemci; gizli karta gidilirse süzgeç sıfırlanır ve kaydırır),
  `TestimonialCard` `wall` görünümü + fotoğraf + JS'siz `popover` tam metin, `app/ogrenci-yorumlari/page.tsx`
  (`generateMetadata`, ≤60 / ≤155 bekçisi), `PageKind` `testimonials`, P7 tokenları (`--ddm-review-*`),
  `public/assets/testimonials/` (29 dosya). Ana Sayfa kaydırıcısı `getHomeTestimonials()` (6: Dora, Onur, Mehmet Akif, Çağla,
  Öykü, Tuğçe) — `data/home.ts`'teki elle yazılmış ve "…" ile kesilmiş 3 yorum kalktı (Hülya seçim dışı).
- **301:** `next.config.ts` `testimonialRedirects()` adresleri `site_content.json`'dan üretir (her adresin yüzde kodlu + Türkçe
  karakterli biçimi); yayındaki yorum → `/ogrenci-yorumlari#yorum-{id}`, diğerleri → liste. `/ogrenci-yorumlari.html` tek kural
  tüm `?start=` varyantlarını kapsar (Next eşleşmede sorguya bakmaz; `has: query` gerekmedi).
- **Kaynak düzeltmeleri (`edits`, eski HTML'in kelime ortası kırılması):** Salih "Th / ank you", Tuğçe "bölümü / ne", Ece Özdemir
  "applied to / DDM". Title / description yeniden yazıldı (kaynak açıklama form çağrısıydı). Tuğçe'nin boy fotoğrafı yüzüne göre kırpıldı.
- **code-review (high):** 10 bulgunun 9'u düzeltildi — gizli karta portreden gidince kaydırma yoktu · yapışkan header kartı
  örtüyordu (`--ddm-sticky-top`) · Reveal geçişi hover geçişini eziyordu · Ana Sayfa kartında figcaption son çocuk değildi ·
  pencere açıkken arkadaki kart hover'da kıpırdıyordu · eski adres yalnız listeye gidiyordu (artık kartına) · yorumlar iki kez
  çözülüyordu · adres deseni iki yerde farklıydı · ham px token'a. Kullanılmayan `TestimonialsCarousel` (+ CSS) kullanıcı kararıyla silindi.
- **Doğrulama:** tsc ✅ · lint ✅ · build ✅ 207 · check-links 2 · 62 eski adres 0 hata · 3 genişlik taşma yok, tek H1, konsol temiz.

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
