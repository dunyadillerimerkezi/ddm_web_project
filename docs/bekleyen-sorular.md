# Bekleyen sorular — kullanıcıya toplu sorulacak

> Kullanıcı (2026-09-28): "soruları not al, daha sonra hepsini toplu olarak soracağım."
> Cevap gelene kadar kaynak metin aynen kalır. Cevaplanan satır silinir, kararı ilgili veri dosyasına + SESSION-HANDOFF §D'ye yazılır.
> Sorarken URL değil menü yolu + sayfadan örnek metin (hafıza: questions-show-menu-path).

## ⚠ ÖNCELİKLİ — Ümraniye şubesi tanıtım sayfası

**P6 bunu bekliyor.** Diğer 4 şube tanıtım sayfası bitti ve commit'lendi (`462b5ce`);
Ümraniye'nin kaynakta tanıtım kaydı **yok**, sayfa sıfırdan yazılacak. Aşağıdaki bilgiler
gelmeden sayfa yayınlanmıyor — bu yüzden listenin en başında.

Kod tarafında hazır olan: `data/branches.ts`'te adres *(Şerifali Mah. Çetin Cad.
Kızkalesi Sok. Şua Elite Plaza No:1 A-Blok Kat:6 Ümraniye)*, telefon `0216 548 14 11`,
e-posta, WhatsApp. Ulaşım araştırıldı: **M8 Mevlana ~1,3 km** (yürüme mesafesinde metro
yok), M12 yapımda.

Kullanıcıdan beklenen:
- [ ] **Fotoğraflar** — dış cephe + 2–3 iç mekân
- [ ] **Kaç yıldır açık** (Ana Sayfa kartı "15 yıllık tecrübe" diyor — bu şube için mi,
      kurum geneli mi?)
- [ ] **Hangi diller / programlar açılıyor** (hepsi mi, bir kısmı mı)
- [ ] **Derslik sayısı / kapasite** gibi anlatılmaya değer bilgi
- [ ] **Otopark var mı**
- [ ] **Kurs takvimi yayınlanacak mı** — `data/courseDates.ts`'te Ümraniye'ye ait
      **0 kayıt** var (72 kurs tarihi sayfası diğer 4 şubeye ait). Yayınlanmayacaksa
      sayfada "şube kurs takvimi" bölümü hiç açılmayacak.

Ayrıca düzeltilecek kaynak hatası: Ümraniye iletişim kaydının başlığı ve meta'sı
**"Ataşehir Şubesi"** diyor.

*(Not: Ümraniye'nin telefonu Ataşehir'in ikinci hattıyla aynı — kaynak hatası değil,
`data/branches.ts` notunda açıklanmış, dokunulmayacak.)*

## P6 · Şube Tanıtım

1. **Dil listesi** — Kadıköy 9 dil ("… Japonca ve Korece"), Levent 15 (Arapça, Yunanca, İsveççe, Bulgarca dahil), Ataşehir 8,
   menü 10, footer "19 farklı dil". Her şube kendi listesini mi göstersin, tek doğru liste mi var? (`data/branchPromo.ts` `tags`)
2. **"25 yıl"** — Bağdat Caddesi başlığı "25 Yıllık Güven, …", Levent maddesi "25 yılı aşkın eğitim deneyimi"; site geneli
   "2003'ten bu yana". Hangisi?
3. **Levent mi Etiler mi** — metin "Etiler'de butik bir dil okulu"; adres Levent tarafında (Nispetiye Cad., M6 Nispetiye ~270 m).
4. **İç mekân fotoğrafları** — `public/assets/sube-1..5.jpeg` (bekleme alanı, dünya haritalı koridor, IELTS afişli ofis…)
   hangi şubenin? Şu an kullanılmıyor.
5. **"Öğrenme Garantisi" bağlantısı** — ayrı sayfa yok, şimdilik İngilizce Eğitim Sistemi sayfasına gidiyor. Kalsın mı?
6. **Ümraniye** — bu dosyanın **en başına** taşındı (⚠ ÖNCELİKLİ bölümü).
7. **JSON-LD `LocalBusiness`** (karar #6) — şube adres/telefonunu Google'ın okuyacağı biçimde eklemek (haritada / yerel aramada
   daha belirgin görünme). Şimdi mi, P9'da mı?
8. **Commit** — 4 sayfa şimdi mi commit'lensin (kod + döküman ayrı), Ümraniye bitince mi?

## UI turu · Sınav Hazırlık (2026-09-28) — firma metni, araştırmada çelişki çıktı

Kaynaklar `data/examGlance.ts` yorumlarında. Firmaya ait / kursu tanıtan cümleler olduğu için dokunulmadı.

1. **Fransızca Aile Birleşimi** (Sınav Hazırlık → Fransızca Aile Birleşimi) — sayfa "Türkiye Cumhuriyeti vatandaşları Fransız
   temsilciliklerinde Fransızcaya … ilişkin bilgileri sınanmaktadır … olumsuz olması halinde 2 ay dil ve uyum kursuna tabi
   tutulmaktadırlar" diyor. Bu sınav 2016'da kalktı (loi 2016-274 art. 20); 2024 yasasındaki geri getirme maddesi Anayasa
   Konseyi'nce iptal edildi. Bugün dil şartı Fransa'ya VARDIKTAN sonra: çok yıllık kart için A2, 10 yıllık kart için B1
   (TCF / TEF / DELF). Kurs A2/B1 hazırlığı olarak mı anlatılsın, sayfa yayından mı kalksın? "Kabul ve Uyum Kontratı",
   "15-65 yaş", "Aile Birleşimi sertifikası" ifadeleri de eskimiş. **Kullanıcı (2026-09-28): "not al" — karar bekliyor,
   metin aynen duruyor.**
2. **TOEFL Essentials** — "%50 akademik, %50 günlük" oranı ETS'de bulunamadı (sayfada kaldı).

> Çözüldü (2026-09-28, kullanıcı: "düzelt"): Almanca aile birleşimi (kurs zorunlu değil, Start Deutsch 1 / ÖSD, 12 ay, SGB II),
> TOEFL Primary (8 yaş+, kâğıt ya da dijital, konuşma / yazma testleri, puanlama), TestDaF (sonuç portalda) — `data/exams.ts` `edits`.

## UI turu · Proficiency üniversite (2026-09-28)

1. **Kullanılmayan bileşenler** `DetailSections`, `ContactFormCard`, `ScheduleTable` silinsin mi?

## P7 · Öğrenci Yorumları (2026-09-29)

> Çözüldü (kullanıcı): kartta şube ve tarih etiketi yok (Beşiktaş / Kurtköy sorusu kalktı) · isimler kaynaktaki gibi ·
> 25'lik seçim onaylı · tasarım "C · portre duvarı" · kullanılmayan `TestimonialsCarousel` silindi.

1. **Yorumların hepsi 2015–2018 arası** (metinde geçen tarihler: 2015, Kasım 2016, Mayıs 2016/2017, 14.06.2017, 2018).
   İçlerinde bugün kurumda olup olmadığı bilinmeyen çalışan adları var (Semra Hanım, Serdar Bey, Melike Hanım, İbrahim Bey;
   hocalar Sahand, Gülten, Bernadette, Cansu, Şebnem…). Metne dokunulmuyor — bilgi notu.
2. **Hülya Osmanoğlu** yorumunda üçüncü kişi adı geçiyor ("Dr. Sanem Başgül tavsiyesiyle"). Seçime alınmadı.
3. **Bilgi (sorulmayacak):** kaynak çıkarma hataları birleştirildi (`edits`): Salih Taysi "Th / ank you", Tuğçe Özdemir
   "bölümü / ne", Ece Özdemir "applied to / DDM". Sayfanın Google başlığı / açıklaması yeniden yazıldı (kaynak açıklama bir form
   çağrısıydı; gerekçe `TESTIMONIALS_PAGE.meta.reasons`). Tuğçe'nin boy fotoğrafı yüzüne göre kare kırpıldı.
4. **JSON-LD `Review` / `AggregateRating`** (karar #6) — eklenmedi; puan uydurma riski. P9'da mı?
5. **Ad yazımı çelişkisi (seçilmeyenler):** "Pelin Tanverdi" ↔ fotoğraf/URL "tanriverdi"; Çağla Yorulmaz'ın URL'i "cagla-yilmaz".

## Önceki fazlardan açık kalanlar

- İngilizce Kursları ana sayfasında B2 "İleri Seviye İngilizce" etiketi ("şimdilik kalsın" denmişti)
- `summer_school.jpg` 800×450 — daha büyüğü gelirse değişecek
- Çocuklar İçin İngilizce "Haftada 6 Saat" ↔ akşam programı 5 saat
- Kaplan ortaklığı sürüyor mu (Mayıs 2026 el değiştirdi) · Kaplan'ın eskimiş rakamları
- Yurtdışı ana sayfasındaki Enforex yanlışı
- Üniversite sayfalarında eski sınav adları + kapanmış 2 üniversite
- GMAT/GRE grup büyüklüğü · online çatı fotoğrafı
- #2 duyurular (yorumlar P7'de çözüldü) · #4 iletişim formu
