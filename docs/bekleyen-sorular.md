# Bekleyen sorular — kullanıcıya toplu sorulacak

> Kullanıcı (2026-09-28): "soruları not al, daha sonra hepsini toplu olarak soracağım."
> Cevap gelene kadar kaynak metin aynen kalır. Cevaplanan satır silinir, kararı ilgili veri dosyasına + SESSION-HANDOFF §D'ye yazılır.
> Sorarken URL değil menü yolu + sayfadan örnek metin (hafıza: questions-show-menu-path).

## P6 · Şube Tanıtım

1. **Dil listesi** — Kadıköy 9 dil ("… Japonca ve Korece"), Levent 15 (Arapça, Yunanca, İsveççe, Bulgarca dahil), Ataşehir 8,
   menü 10, footer "19 farklı dil". Her şube kendi listesini mi göstersin, tek doğru liste mi var? (`data/branchPromo.ts` `tags`)
2. **"25 yıl"** — Bağdat Caddesi başlığı "25 Yıllık Güven, …", Levent maddesi "25 yılı aşkın eğitim deneyimi"; site geneli
   "2003'ten bu yana". Hangisi?
3. **Levent mi Etiler mi** — metin "Etiler'de butik bir dil okulu"; adres Levent tarafında (Nispetiye Cad., M6 Nispetiye ~270 m).
4. **İç mekân fotoğrafları** — `public/assets/sube-1..5.jpeg` (bekleme alanı, dünya haritalı koridor, IELTS afişli ofis…)
   hangi şubenin? Şu an kullanılmıyor.
5. **"Öğrenme Garantisi" bağlantısı** — ayrı sayfa yok, şimdilik İngilizce Eğitim Sistemi sayfasına gidiyor. Kalsın mı?
6. **Ümraniye** (sayfa bu bilgiler olmadan yayınlanmaz):
   - dış cephe + 2–3 iç mekân fotoğrafı
   - kaç yıldır açık (Ana Sayfa kartı "15 yıllık tecrübe" diyor)
   - hangi diller / programlar açılıyor
   - derslik sayısı, kapasite gibi anlatılmaya değer bilgi
   - otopark var mı (en yakın metro M8 Mevlana ~1,3 km)
   - Ümraniye kurs takvimi yayınlanacak mı
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

## Önceki fazlardan açık kalanlar

- İngilizce Kursları ana sayfasında B2 "İleri Seviye İngilizce" etiketi ("şimdilik kalsın" denmişti)
- `summer_school.jpg` 800×450 — daha büyüğü gelirse değişecek
- Çocuklar İçin İngilizce "Haftada 6 Saat" ↔ akşam programı 5 saat
- Kaplan ortaklığı sürüyor mu (Mayıs 2026 el değiştirdi) · Kaplan'ın eskimiş rakamları
- Yurtdışı ana sayfasındaki Enforex yanlışı
- Üniversite sayfalarında eski sınav adları + kapanmış 2 üniversite
- GMAT/GRE grup büyüklüğü · online çatı fotoğrafı
- #2 öğrenci yorumu / duyuru · #4 iletişim formu
