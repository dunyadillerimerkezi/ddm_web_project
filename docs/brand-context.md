# Marka Bağlamı — Dünya Dilleri Merkezi (DDM)

> Faz 2 çıktısı. Kaynak: `ddm-crawl/site_content.json` (384 sayfanın crawl edilmiş
> metni/başlıkları) ve `docs/page-types.md`. Sadece crawl verisinde gerçekten
> geçen ifadeler kullanıldı; emin olunamayan noktalar **[doğrula]** ile
> işaretlendi — bunlar tahmin değil, dosyada birbiriyle çelişen veya tek
> kaynaklı bilgiler.

---

## 1. Firma Kimliği

**Ne yapıyor:** Dünya Dilleri Merkezi (DDM), İstanbul'da şubeleri olan bir dil
okulu. Yabancı dil kursları, akademik sınav hazırlık kursları (üniversite
hazırlık atlama sınavları dahil), yurtdışı dil eğitimi danışmanlığı ve kurumsal
dil eğitimi hizmeti veriyor.

> "Türkiye'de 19 farklı dil eğitimi veren tek dil okuluyuz." — anasayfa H1 altı metni

**Faaliyet süresi:** Anasayfa ve 40'tan fazla sayfada tutarlı biçimde tekrar eden
ifade: **"2003 yılından bugüne"**. Bu, en sık geçen ve en güvenilir referans.

> ⚠️ **[doğrula] — deneyim süresi ifadeleri tutarsız:**
> - Anasayfa / çoğu sayfa: *"2003 yılından bugüne"* (40+ sayfa)
> - Proficiency Kursu sayfası: *"18 yıllık tecrübemiz"*
> - Etiler/Levent şubesi tanıtım sayfası: *"25 yılı aşkın eğitim deneyimi"* (2 kez tekrarlanıyor)
> Üç ifade birbiriyle tam örtüşmüyor (site crawl edildiği tarihe göre 2003'ten
> bugüne süre ile "18 yıl" ve "25 yılı aşkın" farklı sonuçlar veriyor). Yeni
> sitede tek ve güncel bir "kaç yıldır faaliyette" ifadesi netleştirilmeli.

**Şubeler:** `ddm-iletisim.html` (iletişim hub sayfası) üzerinden doğrulanan
5 şube ve adresleri:

| Şube | Adres | Telefon | E-posta |
|---|---|---|---|
| Kadıköy Merkez | Mühürdar Cad. Akmar Çarşısı No:70 Kat:3, Kadıköy | 0216 330 12 17 / 0216 330 12 19 | kadikoy@dunyadillerimerkezi.com |
| Bağdat Caddesi | Bağdat Caddesi, Zümrüt Apt. No:386/7, Suadiye | 0216 368 07 03 / 0216 368 03 09 | cadde@dunyadillerimerkezi.com |
| Etiler | Nispetiye Cad. No:32/12, Beşiktaş | 0212 283 19 14 / 0212 283 19 15 | levent@dunyadillerimerkezi.com |
| Ataşehir | Atatürk Mah. Girne Cad. No:9, Ataşehir | 0216 548 14 10 / 0216 548 14 11 | atasehir@dunyadillerimerkezi.com |
| Ümraniye | Şerifali Mah. Çetin Cad. Kızkalesi Sok. Şua Elite Plaza No:1 A-Blok Kat:6, Ümraniye | 0216 548 14 11 | umraniye@dunyadillerimerkezi.com |

> ⚠️ **[doğrula] — aynı şube için 4 farklı isim kullanılıyor:** Nispetiye Cad./
> Beşiktaş adresindeki şube; iletişim hub'ında "**Etiler Şubesi**", anasayfa
> h3'ünde "**Beşiktaş Şubesi**", URL'de `levent-tanitim-sayfasi.html`, sayfa
> title'ında "**Beşiktaş Şubesi Tanıtım Sayfası**" ama içerikte "**Dünya Dilleri
> Merkezi Etiler**" ve e-posta önekinde `levent@...` olarak geçiyor. `urls.csv`
> genelinde de "Levent–Etiler" birlikte kullanılıyor. Yeni sitede bu şube için
> **tek bir kanonik isim** seçilmeli (Faz 3-4 öncesi karar gerektirir).
>
> Ayrıca `kurumsal-dil-egitim.html` sayfası şubeleri "Kadıköy, Suadiye, Beşiktaş
> ve Ataşehir" olarak 4 şube sayıyor (Ümraniye'yi saymıyor) — Ümraniye şubesi
> muhtemelen sonradan açılmış olabilir, teyit gerekir.

**Sunulan diller (anasayfada sayılan 19 dil):** İngilizce, Almanca, Fransızca,
İspanyolca, İtalyanca, Rusça, Çince, Japonca, Flemenkçe, Yunanca, Korece,
İsveççe, Portekizce, Hırvatça, Boşnakça, Slovakça, Bulgarca, Arapça, Farsça.

> Not: `urls.csv`'de kendi kurs sayfası bulunan diller bunların bir alt kümesi:
> İngilizce, Almanca, Fransızca, İspanyolca, İtalyanca, Rusça, Çince,
> Flemenkçe, Türkçe (yabancılar için). Diğer diller (Japonca, Yunanca, Korece
> vb.) anasayfada listelense de ayrı bir kurs sayfası crawl'da bulunamadı.

**Sunulan sınav hazırlık programları** (`urls.csv` + anasayfa metninden):
Proficiency (üniversite hazırlık atlama), TOEFL, TOEFL Essentials, TOEFL
Primary (çocuklar için), IELTS, YDS, YÖKDİL, GRE, GMAT, SAT, TOEIC, TESTDAF,
PTE Akademik, Almanca Aile Birleşimi (A1), Fransızca Aile Birleşimi, İngiltere
Vize Sınavı / IELTS Life Skills A1.

**Üniversite hazırlık atlama ortaklıkları:** 21 farklı üniversitenin kendi
yeterlik sınavına özel sayfalar var — Marmara, Boğaziçi (BUEPT), İTÜ, ODTÜ,
Sabancı (ELAE), Koç (KUEPE), Yeditepe, Bilgi (BİLET), Bahçeşehir, Beykent,
Işık, Okan, Kadir Has, Kocaeli, Maltepe, Doğuş (DÜİYES), Özyeğin (TRACE),
Süleyman Şah, Acıbadem, İstanbul Şehir (STEP).

**Diğer programlar / iş ortaklıkları:**
- Özel Dersler, Business English (İş İngilizcesi), DDM Kids, Yurtdışı Dil Eğitimi (anasayfa "Yurt dışı eğitimden iş İngilizcesine..." bölümü)
- Tercüme Hizmetleri, Online Dil Eğitimi, Çocuklar İçin İngilizce (`diger-program/*`)
- Kurumsal dil eğitimi (şirketlere özel programlar)
- *"Dünya Dilleri Merkezi, KAPLAN INTERNATIONAL ve ILSC dil okullarının resmi kayıt ofisidir."* (yurtdışı eğitim ortaklığı — anasayfa)
- Pegasus pilotlarına özel Türkçe kursu (`kurumsal-dil-egitim/turkish-course-pegasus-pilots.html`)

---

## 2. Hedef Kitle ve Marka Tonu

**Gözlemlenen hedef kitle:**
- Üniversite hazırlık/hazırlık atlama sınavına girecek öğrenciler (21 üniversite sayfası + Proficiency içeriğinin hacmi bunu en büyük odak yapıyor)
- Akademik/uluslararası sınav adayları (TOEFL, IELTS, GRE, GMAT, SAT, YDS)
- Yurtdışında yaşamak/okumak/vize almak isteyenler (Almanca/Fransızca Aile Birleşimi, İngiltere vize sınavı, Work and Travel, yurtdışı yaz okulları)
- Kurumsal müşteriler / şirket çalışanları (kurumsal dil eğitimi sayfası)
- Genel yetişkin ve çocuk dil öğrencileri (DDM Kids, İngilizce seviye sayfaları: Elementary → Advanced)

**Marka tonu — içerikten doğrudan alınan örnek ifadeler:**
- *"Bireysel gelişim ve uluslararası kaliteyi esas alan kurum"* — akademik/kurumsal ton
- *"Kurulduğumuz günden bu yana dil öğrenimini yalnızca bir eğitim süreci olarak değil; akademik başarıya, uluslararası kariyer fırsatlarına ve küresel bir geleceğe açılan önemli bir yatırım olarak görüyoruz."*
- *"Eğitim felsefemiz; disiplinli çalışma, ölçülebilir gelişim ve sürdürülebilir başarı üzerine kuruludur."*
- *"Dil öğrenmenin herkes için farklı bir yolculuk olduğuna inanıyoruz."* — kişiselleştirilmiş/sıcak ton
- *"Maksimum 6 kişilik özel gruplarda ... öğrencilerimizle birebir ilgilenme olanağı yaratmaktayız. Bu nedenle kesinlikle kalabalık gruplar oluşturmamaktayız."* — güven/özen vurgusu
- Öğrenci yorumları samimi, birinci ağızdan, kişisel hikâye anlatımı içeriyor (ör. Hülya Osmanoğlu yorumu: *"...âdeta küsmüştüm İngilizce'ye... DDM'ye gelişim ve yabancı dil öğrenme süreciyle ilgili kaderim değişti."*)

**Sonuç:** PROGRESS.md'deki "akademik + sıcak/motive edici" hipotezi crawl
verisiyle doğrulanıyor — kurumsal/disiplinli bir akademik söylem ile bireysel,
motive edici, hikâye anlatımına dayalı bir ton bir arada kullanılıyor. Kurs/sınav
sayfalarında ton daha resmi-bilgilendirici; öğrenci yorumu ve şube tanıtım
sayfalarında ton daha kişisel-sıcak.

---

## 3. Sayfa Tipleri Özeti

> Ayrıntılı tablo, URL desenleri ve değişken alanlar için: `docs/page-types.md`.
> Burada sadece marka bağlamı açısından önemli kısa özet var.

| Sayfa tipi | ~Adet | Marka açısından rolü |
|---|---|---|
| Şube Kurs Tarihi Sayfası | 88 | Şube + kurs kombinasyonu, en çok tekrar eden SEO yüzeyi |
| Öğrenci Yorumu (Tekil) | 51 | Sosyal kanıt, samimi/kişisel ton örnekleri |
| Üniversite Proficiency Sayfası | 42 | Akademik otorite, "hazırlık atlama" uzmanlığı |
| Kurs Alt İçerik Sayfası (Nedir/Program/Seviye) | 42 | Bilgilendirici, SSS/açıklama tonu |
| Özel Ders Sayfası | 39 | Birebir/kişiselleştirilmiş eğitim vurgusu |
| Sınav Hazırlık Kursu Ana Sayfası | 16 | Sınav bazlı otorite/uzmanlık anlatımı |
| Şube İletişim Sayfası | 13 | Adres/telefon/harita — kurumsal güven unsuru |
| Liste + Duyuru Sayfaları | 24 | Güncellik, kampanya/etkinlik iletişimi |
| Dil Kursu Ana Sayfası | 10 | Dil bazlı program tanıtımı |
| İngilizce Seviye Kursu Sayfası | 11 | Seviye bazlı kişiselleştirme (Elementary→Advanced) |
| Yurtdışı Eğitim Alt Sayfası | 11 | Uluslararası ortaklıklar (Kaplan, ILSC), ülke rehberleri |
| Online Eğitim Sayfası | 8 | Esneklik/erişilebilirlik vurgusu |
| Kategori Hub + Şube Tanıtım + diğer | ~19 | Navigasyon ve şube kimliği |
| Ana Sayfa | 1 | Tüm marka mesajlarının özeti |

**Toplam: 384 sayfa, 17 ana tip** (bkz. `docs/page-types.md` için tam kırılım ve
Faz 4-5 tasarım şablonu eşleştirmesi).

---

## 4. Tekrar Eden Bileşenler

> Not: `site_content.json` sadece **metin + başlık** çıktısı; DOM/CSS yapısını
> içermiyor. Aşağıdaki bileşenler metinde tekrar eden **kalıplardan** çıkarıldı;
> görsel/etkileşimli davranış (ör. gerçekten akordeon mu, tab mı) **[doğrula]**
> olarak işaretlendi ve Faz 4'te ekran görüntüleriyle teyit edilmeli.

### Header / Mega Menü
`urls.csv`'deki üst düzey URL segmentleri (kategori hub sayfaları) ile
`PROGRESS.md`'nin Faz 4 notundaki mega menü listesi birebir örtüşüyor — 7 ana
başlık, her biri kendi alt sayfalarına açılıyor:

1. Yabancı Dil Kursları (`/yabanci-dil-egitimleri/...`, 10 dil)
2. İngilizce Kursları (`/ingilizce-kurslari/...`, seviye bazlı)
3. Sınav Hazırlık (`/sinav-hazirlik-egitimleri/...`, 16 sınav + üniversiteler)
4. Yurtdışı Eğitim (`/yurtdisi-egitim/...`)
5. Kurumsal (`/kurumsal-dil-egitim.html`)
6. Diğer Programlar (`/diger-program/...`)
7. İletişim (`/ddm-iletisim/...`, 5 şube)

### Footer
`ddm-iletisim.html` verisinden: her şube için ayrı adres/telefon/WhatsApp/
e-posta bloğu + "e-mail formu" linki tekrar ediyor — bu footer'da (veya
iletişim sayfasında) şube kartı olarak kullanılabilecek bir kalıp.
Anasayfa altbilgi bölgesinde tekrar eden linkler: Mektuplar, Aktiviteler,
Duyurular [doğrula — bunların footer mı yoksa ayrı bir anasayfa bölümü mü olduğu netleştirilmeli].

### Kurs/Dil Kartı
Anasayfada 10 dil için birebir aynı kalıpla tekrarlanan kart yapısı:
**[dil kodu (EN/DE/FR/RU/ES/IT/ZH/TR/NL)] + [Dil Kursu başlığı] + 5 maddelik
alt liste** (Eğitim Programı Seviyeleri / Programı Gün ve Saatleri / Kur
Sınavları / Dil Seviyeleri / Sertifikaları ve Uluslararası Sınavlar). Bu, dil
kursu ana sayfalarına (page-types.md tip 10) giden kart bileşeni.

### Şube Kartı / Tanıtım Bloğu
Şube tanıtım sayfalarında (`*-tanitim-sayfasi.html`) tekrar eden yapı: 5 yıldız
ikonu (`fas fa-star` × 5 — Font Awesome ikon adı ham metinde sızmış, gerçek bir
puanlama/rating bileşeni olduğunun kanıtı), ardından şube adı başlığı, tanıtım
paragrafı, madde işaretli "Eğitim Yapısı" listesi ve bir iletişim formu.

### Öğrenci Yorumu Kartı
`ogrenci-yorumlari/*` sayfalarının tamamı aynı kalıp: öğrenci adı (başlık) +
kısa/uzun serbest metin yorum. Liste sayfasında (`ogrenci-yorumlari.html`)
bunlar kart grid'i olarak sayfalanarak (`?start=N`) listeleniyor.

### SSS / Akordeon [doğrula]
Sadece 1 sayfada (`sinav-hazirlik-egitimleri/aile-birlesimi-egitimi.html`) net
bir "Sıkça Sorulan Sorular" bloğu (soru başlıkları + cevap metinleri)
bulundu. Bu, akordeon bileşeninin sitede var olduğuna işaret ediyor ama
crawl'da yalnızca 1 örnek olduğu için **genele yaygın bir tekrarlayan bileşen
olduğu teyit edilemedi** — Faz 4'te ekran görüntüsüyle doğrulanmalı.

---

## [doğrula] İşaretli Alanların Özeti

1. Kuruluştan bu yana geçen süre: "2003'ten bugüne" (40+ sayfa) vs "18 yıllık
   tecrübe" (1 sayfa) vs "25 yılı aşkın" (1 sayfa, 2 tekrar) — tutarsız.
2. Etiler/Levent/Beşiktaş şubesinin kanonik adı — 4 farklı isimle anılıyor.
3. Şube sayısı: iletişim sayfası 5 şube listeliyor (Ümraniye dahil), kurumsal
   sayfa 4 şube sayıyor (Ümraniye hariç) — Ümraniye şubesinin açılış zamanı/
   güncel aktifliği teyit edilmeli.
4. Anasayfa altbilgisindeki "Mektuplar / Aktiviteler / Duyurular" linklerinin
   footer mı yoksa ayrı bir anasayfa bölümü mü olduğu netleştirilmeli.
5. SSS/akordeon bileşeninin sitede genel olarak kullanılıp kullanılmadığı
   (crawl'da yalnızca 1 sayfada tespit edildi) — görsel/DOM teyidi gerekiyor.
6. Anasayfada listelenen 19 dilin 10 tanesi dışındakiler (Japonca, Yunanca,
   Korece, İsveççe, Portekizce, Hırvatça, Boşnakça, Slovakça, Bulgarca, Arapça,
   Farsça) için ayrı kurs sayfası crawl'da bulunamadı — bu diller gerçekten
   aktif mi sunuluyor yoksa sadece anasayfada mı anılıyor, teyit edilmeli.
