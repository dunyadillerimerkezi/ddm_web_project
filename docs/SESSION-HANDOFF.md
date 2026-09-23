# Nerede Kaldık — Oturum Devir Dökümanı

> **Her yeni chat İLK bu dosyayı okur, SON bu dosyayı günceller.**
> §A her oturum sonunda **üzerine yazılır** (tek doğru güncel durum).
> §D **yalnız eklenir** (en yeni üstte). Yol haritası: [`remaining-pages-plan.md`](remaining-pages-plan.md).
> Kurallar: [`../ddm-web/CLAUDE.md`](../ddm-web/CLAUDE.md). Faz durumu: [`../PROGRESS.md`](../PROGRESS.md).

---

## §A — Güncel durum  *(son güncelleme: 2026-09-23, P2 sonrası — kod commit'lenmedi, kullanıcı inceleyecek)*

| Alan | Değer |
|---|---|
| **Son kod commit'i** | `6bf3786` — P1 Şube İletişim (kullanıcı commit'ledi). **P2 (Sınav Hazırlık Kursu Ana, 16 sayfa) çalışma ağacında, commit'lenmedi — kullanıcı "en son ben inceleyeceğim" dedi.** |
| **Son döküman commit'i** | `028f9aa` (P0 dökümanları); bu oturumun döküman değişiklikleri de commit'lenmedi |
| **Build durumu** | `tsc --noEmit` ✅ · `lint` ✅ · `npm run build` ✅ (**126 statik sayfa**, +16 sınav) · `check-links` **40 → 28 ölü hedef** · 16/16 sınav sayfası 200 ve tek H1 (curl) · regresyon: dil/üniversite/kurs-tarihi/iletişim sayfaları 200 · sitemap 126/126 |
| **Tamamlanan tipler** | Ana Sayfa (6.3) · Dil Kursu 10 (6.4) · Üniversite Proficiency 21 (6.5) · Şube Kurs Tarihi 72 (6.6) · Şube İletişim hub+5 (P1, form hariç) · **Sınav Hazırlık Kursu Ana 16 (P2)** |
| **Aktif faz** | P2 **tamam** (kod + döküman yazıldı, commit bekliyor). Sıradaki: **P3 Kategori Hub'ları** — `/sinav-hazirlik-egitimleri` ve `/yabanci-dil` kırıntıdan 74+47 kez link alıyor ve hâlâ ölü; `/diger-program/ozel-dersler` de (126 link) P4 kararıyla çatı sayfa olacak |
| **Bir sonraki somut adım** | Kullanıcı P2'yi onaylarsa commit (kod + döküman ayrı), sonra P3 Aşama 0: `/yabanci-dil`, `/sinav-hazirlik-egitimleri`, `/diger-program`, `/ingilizce-kurslari`, `/yurtdisi-egitim` hub kayıtlarını `site_content.json`'dan çıkar |
| **Yarım kalan iş** | Yok (P2 tamam). Kullanıcıdan bekleniyor: **güncel TOEFL sınav ücreti** (kaynaktaki "185 dolar" duruyor, yanına güncellik uyarısı kondu) ve Search Console'da sınav **özel ders** sayfalarının tıklanma listesi (P4 kararını kesinleştirmek için) |
| **Engeller** | P1'in FORM/KVKK kısmı karar #4'e bağlı (sona bırakıldı). Kalan 28 ölü hedef: `/diger-program/*` (5×126) ve `/ogrenci-yorumlari` (126×) → P7/P4 · `/sinav-hazirlik-egitimleri` (74×) ve `/yabanci-dil` (47×) → P3 · proficiency `nedir/ozel-ders/ornek-sinav-sorulari` (21'er) → P4 |
| **Bekleyen kullanıcı kararları** | #2 yorum/duyuru tekil mi · #4 form backend'i · #5 şube fotoğrafları/haritası (izlenmeyen şube foto'ları `public/assets/` altında duruyor, P6) · #6 JSON-LD (P2'de eklenmedi, P9'a bırakıldı) · sınav **özel ders** sayfalarının kalıcı olup olmayacağı (P4 sonunda) |
| **Bilinen veri notları** | Türkçe kurs tarihleri kaynakta 2022 (bayat, birebir basılıyor — yerel SEO için güncellenmeli) · TOEFL kaydında h1 yok, ilk başlığa düşülüyor (loglanıyor) · Fransızca aile birleşiminde 2 aynı h1, biri basılıyor · Proficiency başlığında kırılmayan boşluk var (eşleme normalleştiriliyor) · 17 üniversite ve aile birleşimi kayıtlarında H1 yok · 5 şube iletişim kaydında `headings` yok |

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
