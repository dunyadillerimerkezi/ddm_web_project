# Bekleyen sorular — kullanıcıya toplu sorulacak

> Kullanıcı (2026-09-28): "soruları not al, daha sonra hepsini toplu olarak soracağım."
> Cevap gelene kadar kaynak metin aynen kalır. Cevaplanan satır silinir, kararı ilgili veri dosyasına + SESSION-HANDOFF §D'ye yazılır.
> Sorarken URL değil menü yolu + sayfadan örnek metin (hafıza: questions-show-menu-path).

**2026-09-30:** müşterinin 21 soruluk formundaki 20 cevap koda işlendi ve bu dosyadan silindi (kararlar:
`SESSION-HANDOFF.md` §D, kalıcı olanlar `ddm-web/CLAUDE.md` §5 / §9). Formdan açık kalan tek soru aşağıda (#1).

## Müşteriden beklenen

1. **Form başvuruları hangi e-postaya gidecek** (form #18) — kullanıcı: "mailleri alacağım sonra". Adresler gelince PF arka ucu
   yazılır (aşağıda PF #2).

## Müşteri cevapları işlenirken çıkanlar (2026-09-30 / 10-01)

> Çözüldü (kullanıcı, 2026-10-01): tüm şubeler için "2003’ten bu yana 23 yıl" (Ümraniye "15 yıllık", Bağdat Caddesi "20 yıldır",
> sınav sayfalarındaki "18 / 13 yıllık" dahil) · "8 farklı dilde" → 19 · üniversite sayfalarındaki kurs tanıtım cümlelerinin
> yanlış bölüm adları düzeltildi · üniversitelerde resmi kaynaklar çelişince en yeni resmi belge esas alındı.

Sorulmadı; bir sonraki toplu soruda sorulabilir:

1. **"19 farklı dil" cümlesi 18 ad sayıyor** (Ana Sayfa üst alan, Yabancı Dil, İngilizce Kursları, Yurtdışı Eğitim) — 19'luk
   liste belli (`data/languages.ts` `ALL_LANGUAGE_NAMES`: kursu olan 9 dil + diğer 10 dil); cümlede Türkçe yok. Cümleye
   "Türkçe" eklensin mi? Tercüme sayfası "19 dilde çeviri" deyip 16 kutu gösteriyor.
2. **Meta açıklamalarında "Levent–Etiler"** — Etiler şubesinin 17 kurs tarihi sayfasının Google açıklaması "Levent–Etiler …
   kursu tarihleri" diye başlıyor (sayfada görünmez). Yerel arama için bırakıldı; "Etiler" yapılsın mı?
3. **Acıbadem "AYES"** (Proficiency → üniversiteler ızgarası rozeti + sayfa başlığı) — bu ad üniversitenin hiçbir resmi
   kaynağında geçmiyor (sınavlar ACUPEP PPT ve ACEPT). Başlık kaynak başlığı olduğu için dokunulmadı.

### Üniversite sayfaları — resmi kaynakta YAZMAYAN ayrıntılar (sayfaya eklenmedi)

Sayfada yanlış bilgi kalmadı; aşağıdakiler resmi kaynakta bulunmadığı için sayfaya hiç yazılmadı. Kaynaklar
`data/universityExams.ts` yorumlarında.

| Üniversite | Yazılmayan ayrıntı |
|---|---|
| Okan | Sınav süresi; dil bölümlerine özel geçme notu |
| Kocaeli | Dinleme / okuma için ayrı süre; uluslararası sınav geçerliliği yönergede 5, web tablosunda 2 yıl (tablo yazıldı) |
| Işık | Yerleştirme eşiği (55 ↔ 70) |
| YTÜ | Bölüm puan ağırlıkları (yönerge "her aşama 50" ↔ sayfa 60 / 40) ve 1. aşama barajı |
| Doğuş | 1. oturumun kesin süresi (sınavdan sınava 100 / 110 / 120 dk), yazma kelime sayısı |
| Maltepe | Toplam süre ve puanın geçerlilik süresi |
| Bahçeşehir | Yazılı / sözlü ağırlığı (%20 ↔ %25) |
| Marmara | Bölüm süreleri ve soru sayıları |
| Koç | Seviye belirleme sınavından KUEPE'ye geçiş eşiği |
| İTÜ | Sınav ayları her akademik yıl değişiyor — her yıl güncellenmeli |

## PF · İletişim / ön bilgi formu (2026-09-29) — form GÖRSEL, arka uç yok

> Çözüldü (kullanıcı): tasarım "A · lacivert yan panel" · zorunlu alanlar Ad Soyad, Telefon, Kurs, Şube (E-posta ve Mesaj
> isteğe bağlı) · KVKK için eski sitenin metni; metin ve tek onay kutusu olduğu gibi kalır (kullanıcı, 2026-09-30: "KVKK ile
> ilgili bir sorun yok") · kurs listesine sitedeki tüm kurslar (36) · yerleşim tablosu · lacivert şerit (`CtaBand`) yalnız kurs
> tarihi sayfalarında kalır · "Bilgi Al" düğmeleri sayfadaki forma iner · dar boy şimdilik kullanılmaz.

1. **"Flemenkçe" → "Felemenkçe"** — sitenin veri dosyasında dilin adı "Flemenkçe" (menü, kartlar, 19 dil listesi); kaynak
   başlıklar ve eski form "Felemenkçe" (TDK yazımı). Formda "Felemenkçe" kullanıldı. Site genelinde de düzeltilsin mi?
2. **Arka uç (karar #4)** — form şu an hiçbir yere göndermiyor; basınca "Form henüz açılmadı" notu + şube telefonu çıkıyor.
   Gönderim yöntemi bizim karar; başvuruların gideceği adresler kullanıcıdan bekleniyor (yukarıda #1).
3. **Bilgi (sorulmayacak):** Ana Sayfa ve üniversite sayfalarının alt şeridindeki merkez e-posta / adres satırı form ile
   kalktı; bu bilgiler footer'da duruyor. Kullanılmayan `StickyToc` bileşeni kaldı (silinsin mi — `ScheduleTable` ile birlikte).
   Dil özel ders sayfalarında (ör. Yabancı Dil → Almanca → Almanca Özel Ders) formda hazır seçili gelen kurs "Özel Dersler"
   değil o dil (Almanca) — sayfa dilin adresi altında duruyor; sınav özel derslerinde de o sınav (IELTS).

## P6 · Şube Tanıtım — kapandı (4 sayfa; Ümraniye'nin tanıtım sayfası yok)

1. **İç mekân fotoğrafları** — `public/assets/sube-1..5.jpeg` (bekleme alanı, dünya haritalı koridor, IELTS afişli ofis…)
   hangi şubenin? Şu an kullanılmıyor.
2. **JSON-LD `LocalBusiness`** (karar #6) — şube adres/telefonunu Google'ın okuyacağı biçimde eklemek (haritada / yerel aramada
   daha belirgin görünme). Şimdi mi, P9'da mı?

## UI turu · Sınav Hazırlık (2026-09-28)

1. **TOEFL Essentials** — "%50 akademik, %50 günlük" oranı ETS'de bulunamadı (sayfada kaldı).

> Fransızca Aile Birleşimi: müşteri (2026-09-30) "Kalsın şimdilik" — sayfa ve metin aynen kalır (sınav 2016'da kalkmış olsa da).
> Çözüldü (2026-09-28, kullanıcı: "düzelt"): Almanca aile birleşimi, TOEFL Primary, TestDaF — `data/exams.ts` `edits`.

## UI turu · Proficiency üniversite (2026-09-28)

1. **Kullanılmayan bileşen** `ScheduleTable` silinsin mi? *(`DetailSections` + `ContactFormCard` PF'de kullanıcı brief'iyle silindi.)*

## P7 · Öğrenci Yorumları (2026-09-29)

> Çözüldü (kullanıcı): kartta şube ve tarih etiketi yok · isimler kaynaktaki gibi · 25'lik seçim onaylı · tasarım
> "C · portre duvarı" · kullanılmayan `TestimonialsCarousel` silindi. Duyurular + Aktiviteler kalktı (2026-09-30).

1. **Yorumların hepsi 2015–2018 arası** (metinde geçen tarihler: 2015, Kasım 2016, Mayıs 2016/2017, 14.06.2017, 2018).
   İçlerinde bugün kurumda olup olmadığı bilinmeyen çalışan adları var (Semra Hanım, Serdar Bey, Melike Hanım, İbrahim Bey;
   hocalar Sahand, Gülten, Bernadette, Cansu, Şebnem…). Bir yorum "Beşiktaş şubesinde" diyor (öğrencinin sözü, dokunulmaz).
   Metne dokunulmuyor — bilgi notu.
2. **Hülya Osmanoğlu** yorumunda üçüncü kişi adı geçiyor ("Dr. Sanem Başgül tavsiyesiyle"). Seçime alınmadı.
3. **Bilgi (sorulmayacak):** kaynak çıkarma hataları birleştirildi (`edits`): Salih Taysi "Th / ank you", Tuğçe Özdemir
   "bölümü / ne", Ece Özdemir "applied to / DDM". Sayfanın Google başlığı / açıklaması yeniden yazıldı (kaynak açıklama bir form
   çağrısıydı; gerekçe `TESTIMONIALS_PAGE.meta.reasons`). Tuğçe'nin boy fotoğrafı yüzüne göre kare kırpıldı.
4. **JSON-LD `Review` / `AggregateRating`** (karar #6) — eklenmedi; puan uydurma riski. P9'da mı?
5. **Ad yazımı çelişkisi (seçilmeyenler):** "Pelin Tanverdi" ↔ fotoğraf/URL "tanriverdi"; Çağla Yorulmaz'ın URL'i "cagla-yilmaz".

## Önceki fazlardan açık kalanlar

- İngilizce Kursları ana sayfasında B2 "İleri Seviye İngilizce" etiketi ("şimdilik kalsın" denmişti)
- `summer_school.jpg` 800×450 — daha büyüğü gelirse değişecek · online çatı fotoğrafı · Ümraniye fotoğrafı
- Çocuklar İçin İngilizce "Haftada 6 Saat" ↔ akşam programı 5 saat
- GMAT/GRE grup büyüklüğü
- Kaplan ortaklığı (Mayıs 2026 el değiştirdi), Kaplan rakamları ve Enforex cümlesi: müşteri "kalsın" dedi (2026-09-30) —
  metin kaynaktaki gibi; ortaklığın sürüp sürmediği yanıtlanmadı.
