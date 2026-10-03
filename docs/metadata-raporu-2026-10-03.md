# Metadata denetimi — 2026-10-03

> `node scripts/check-metadata.mjs` çıktısı — yalnız ölçüm. `.next` build çıktısındaki **202 HTML sayfa** okundu
> (build'in saydığı 209 = bu sayfalar + 404 sayfası + sitemap.xml + robots.txt + 3 simge + iç kayıtlar).
> Eşikler: başlık 30–60 · açıklama 70–160 (proje kuralı ≤155).

## Sayfa türleri

| Tür | Sayfa |
|---|---:|
| Ana Sayfa | 1 |
| Dil kursu | 15 |
| Diğer program / kurumsal | 5 |
| Kategori hub'ı | 6 |
| Nedir rehberi | 7 |
| Online eğitim | 9 |
| Sınav hazırlık | 18 |
| Tekil sayfa | 8 |
| Yurtdışı | 9 |
| Özel ders | 17 |
| Öğrenci Yorumları | 1 |
| Üniversite proficiency | 19 |
| İngilizce kursları | 9 |
| Şube iletişim | 6 |
| Şube kurs tarihi | 68 |
| Şube tanıtım | 4 |

## Özet — sorun × tür

| Sorun | Toplam | Türlere göre |
|---|---:|---|
| Başlık çok uzun (>60 karakter) | 28 | Dil kursu 1/15 · Sınav hazırlık 2/18 · Üniversite proficiency 14/19 · Şube iletişim 5/6 · Şube kurs tarihi 6/68 |
| Başlık çok kısa (<30 karakter) | 2 | Şube kurs tarihi 2/68 |
| Açıklama çok uzun (>160) | 1 | Üniversite proficiency 1/19 |
| Açıklama 156–160 (Google'a göre sınırda, proje kuralı ≤155) | 12 | Dil kursu 3/15 · Sınav hazırlık 5/18 · Üniversite proficiency 2/19 · Şube kurs tarihi 2/68 |
| Açıklama çok kısa (<70) | 4 | Şube iletişim 4/6 |
| H1 ile başlık kopuk (H1'in sözcüklerinin yarısından azı başlıkta) | 14 | Ana Sayfa 1/1 · Diğer program / kurumsal 1/5 · Kategori hub'ı 1/6 · Sınav hazırlık 7/18 · Yurtdışı 2/9 · İngilizce kursları 1/9 · Şube iletişim 1/6 |
| Aynı başlığı paylaşan küme | 0 küme / 0 sayfa | |
| Aynı açıklamayı paylaşan küme | 0 küme / 0 sayfa | |

## Asıl adres, sitemap, robots

- Canonical kökü: `http://localhost:3000` — `NEXT_PUBLIC_SITE_URL` build anındaki değer.
- Sitemap: 202 adres · sayfası olmayan: 0 · sitemap'te olmayan sayfa: 0 · gizli sınav: 0
- robots.txt: `User-Agent: * · Allow: / ·  · Sitemap: http://localhost:3000/sitemap.xml`

## Başlık çok uzun (>60 karakter)

**Dil kursu** (1/15)

- `/yabanci-dil-egitimleri/ingilizce-konusma-kursu` — 74 kr · İngilizce Konuşma Kursu İstanbul (Speaking Course) \| Dünya Dilleri Merkezi

**Sınav hazırlık** (2/18)

- `/sinav-hazirlik-egitimleri/proficiency-kursu` — 69 kr · Proficiency Kursu \| Eğitim Programı hazırlık bitirme ve yüksek lisans
- `/sinav-hazirlik-egitimleri/toefl-kursu` — 71 kr · TOEFL Kursu İstanbul TOEFL IBT Hazırlık Eğitimi \| Dünya Dilleri Merkezi

**Üniversite proficiency** (14/19)

- `/sinav-hazirlik-egitimleri/proficiency-kursu/acibadem-universitesi` — 62 kr · Acıbadem Üniversitesi Proficiency Sınavı Hazırlık Atlama Kursu
- `/sinav-hazirlik-egitimleri/proficiency-kursu/bahcesehir-universitesi` — 64 kr · Bahçeşehir Üniversitesi Proficiency Hazırlık Atlama Sınavı Kursu
- `/sinav-hazirlik-egitimleri/proficiency-kursu/beykent-universitesi` — 61 kr · Beykent Üniversitesi Proficiency Hazırlık Atlama Sınavı Kursu
- `/sinav-hazirlik-egitimleri/proficiency-kursu/bilgi-universitesi` — 65 kr · Bilgi Üniversitesi BİLET Proficiency Sınavı Hazırlık Atlama Kursu
- `/sinav-hazirlik-egitimleri/proficiency-kursu/bogazici-universitesi` — 68 kr · Boğaziçi Üniversitesi BUEPT Proficiency Sınavı Hazırlık Atlama Kursu
- `/sinav-hazirlik-egitimleri/proficiency-kursu/dogus-universitesi` — 66 kr · Doğuş Üniversitesi DÜİYES Proficiency Hazırlık Atlama Sınavı Kursu
- `/sinav-hazirlik-egitimleri/proficiency-kursu/istanbul-teknik-universitesi` — 73 kr · İstanbul Teknik Üniversitesi İTÜ Proficiency Hazırlık Atlama Sınavı Kursu
- `/sinav-hazirlik-egitimleri/proficiency-kursu/kadirhas-universitesi-hazirlik` — 63 kr · Kadir Has Üniversitesi Proficiency Hazırlık Atlama Sınavı Kursu
- `/sinav-hazirlik-egitimleri/proficiency-kursu/koc-universitesi` — 63 kr · Koç Üniversitesi KUEPE Proficiency Hazırlık Atlama Sınavı Kursu
- `/sinav-hazirlik-egitimleri/proficiency-kursu/kocaeli-universitesi-hazirlik` — 61 kr · Kocaeli Üniversitesi Proficiency Hazırlık Atlama Sınavı Kursu
- `/sinav-hazirlik-egitimleri/proficiency-kursu/marmara-universitesi` — 61 kr · Marmara Üniversitesi Proficiency Hazırlık Atlama Sınavı Kursu
- `/sinav-hazirlik-egitimleri/proficiency-kursu/ortadogu-teknik-universitesi` — 75 kr · Orta Doğu Teknik Üniversitesi ODTÜ Proficiency Hazırlık Atlama Sınavı Kursu
- `/sinav-hazirlik-egitimleri/proficiency-kursu/yeditepe-universitesi` — 62 kr · Yeditepe Üniversitesi Proficiency Hazırlık Atlama Sınavı Kursu
- `/sinav-hazirlik-egitimleri/proficiency-kursu/yildiz-teknik-universitesi` — 71 kr · Yıldız Teknik Üniversitesi YTÜ Proficiency Hazırlık Atlama Sınavı Kursu

**Şube iletişim** (5/6)

- `/ddm-iletisim/1-kadikoy` — 68 kr · Dünya Dilleri Merkezi Kadıköy Şubesi - İletişim - Adres - Yol Tarifi
- `/ddm-iletisim/3-levent` — 67 kr · Dünya Dilleri Merkezi Etiler Şubesi - İletişim - Adres - Yol Tarifi
- `/ddm-iletisim/4-atasehir` — 69 kr · Dünya Dilleri Merkezi Ataşehir Şubesi - İletişim - Adres - Yol Tarifi
- `/ddm-iletisim/iletisim-2-bagdat-caddesi` — 75 kr · Dünya Dilleri Merkezi Bağdat Caddesi Şubesi - İletişim - Adres - Yol Tarifi
- `/ddm-iletisim/umraniye` — 69 kr · Dünya Dilleri Merkezi Ümraniye Şubesi - İletişim - Adres - Yol Tarifi

**Şube kurs tarihi** (6/68)

- `/sinav-hazirlik-egitimleri/gmat-kursu/bagdat-caddesi-gmat-subesi-kurs-tarihi` — 79 kr · Bağdat Caddesi GMAT Şubesi Kurs Tarihi - İstanbul - DDM / Dünya Dilleri Merkezi
- `/sinav-hazirlik-egitimleri/gmat-kursu/kadikoy-subesi-gmat-kurs-tarihi` — 72 kr · Kadıköy Şubesi GMAT Kurs Tarihi - İstanbul - DDM / Dünya Dilleri Merkezi
- `/sinav-hazirlik-egitimleri/sat-kursu/atasehir-subesi-sat-kurs-tarihi` — 61 kr · Ataşehir Şubesi SAT Kurs Tarihi - DDM / Dünya Dilleri Merkezi
- `/yabanci-dil-egitimleri/ingilizce-kursu/atasehir-subesi-ingilizce-kurs-tarihi` — 61 kr · İngilizce Kursu Ataşehir Ders Programı\| Dünya Dilleri Merkezi
- `/yabanci-dil-egitimleri/ingilizce-kursu/bagdat-caddesi-subesi-kurs-tarihi` — 68 kr · İngilizce Kursu Bağdat Caddesi Ders Programı \| Dünya Dilleri Merkezi
- `/yabanci-dil-egitimleri/ingilizce-kursu/kadikoy-subesi-ingilizce-kurs-tarihi` — 61 kr · İngilizce Kursu Kadıköy Ders Programı \| Dünya Dilleri Merkezi

## Başlık çok kısa (<30 karakter)

**Şube kurs tarihi** (2/68)

- `/sinav-hazirlik-egitimleri/gre-kursu/besiktas-subesi-kurs-tarihi` — 29 kr · Etiler Şubesi GRE Kurs Tarihi
- `/sinav-hazirlik-egitimleri/yds-kursu/besiktas-subesi-kurs-tarihi` — 29 kr · Etiler Şubesi YDS Kurs Tarihi

## Açıklama çok uzun (>160)

**Üniversite proficiency** (1/19)

- `/sinav-hazirlik-egitimleri/proficiency-kursu/istanbul-teknik-universitesi` — 162 kr

## Açıklama 156–160 (Google'a göre sınırda, proje kuralı ≤155)

**Dil kursu** (3/15)

- `/yabanci-dil-egitimleri/fransizca-kursu` — 157 kr
- `/yabanci-dil-egitimleri/italyanca-kursu` — 159 kr
- `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs` — 159 kr

**Sınav hazırlık** (5/18)

- `/sinav-hazirlik-egitimleri/gmat-kursu` — 159 kr
- `/sinav-hazirlik-egitimleri/gre-kursu` — 159 kr
- `/sinav-hazirlik-egitimleri/ielts-kursu` — 157 kr
- `/sinav-hazirlik-egitimleri/sat-kursu` — 157 kr
- `/sinav-hazirlik-egitimleri/yds-kursu` — 158 kr

**Üniversite proficiency** (2/19)

- `/sinav-hazirlik-egitimleri/proficiency-kursu/ozyegin-universitesi` — 157 kr
- `/sinav-hazirlik-egitimleri/proficiency-kursu/sabanci-universitesi` — 156 kr

**Şube kurs tarihi** (2/68)

- `/sinav-hazirlik-egitimleri/toefl-kursu/besiktas-subesi-toefl-kurs-tarihi` — 156 kr
- `/yabanci-dil-egitimleri/ingilizce-konusma-kursu/bagdat-caddesi-subesi-ingilizce-konusma-kurs-tarihi` — 159 kr

## Açıklama çok kısa (<70)

**Şube iletişim** (4/6)

- `/ddm-iletisim/1-kadikoy` — 62 kr · Dünya Dilleri Merkezi Kadıköy Şubesi İletişim Adres Bilgileri.
- `/ddm-iletisim/3-levent` — 59 kr · Dünya Dilleri Merkezi Etiler Şubesi İletişim Adres Bilgisi.
- `/ddm-iletisim/4-atasehir` — 63 kr · Dünya Dilleri Merkezi Ataşehir Şubesi İletişim Adres Bilgileri.
- `/ddm-iletisim/umraniye` — 63 kr · Dünya Dilleri Merkezi Ümraniye Şubesi İletişim Adres Bilgileri.

## H1 ile başlık kopuk (H1'in sözcüklerinin yarısından azı başlıkta)

**Ana Sayfa** (1/1)

- `/` — %11 ortak · H1: 19 dilde eğitim, 2003’ten bugüne Dünya Dilleri Merkezi farkıyla yabancı dil eğitimleri ‖ title: İstanbul Dil Kursu ve Sınav Hazırlık \| Dünya Dilleri Merkezi

**Diğer program / kurumsal** (1/5)

- `/kurumsal-dil-egitim/turkish-course-pegasus-pilots` — %0 ortak · H1: Fly to Success ‖ title: Turkish Course - Exclusive For Pegasus Pilots

**Kategori hub'ı** (1/6)

- `/yurtdisi-egitim` — %43 ortak · H1: Yurtdışı Dil Eğitimi, Hangi Dili Öğrenmek İstersiniz? ‖ title: Yurtdışı Dil Eğitimi \| İngilizce, Almanca, İspanyolca

**Sınav hazırlık** (7/18)

- `/sinav-hazirlik-egitimleri/academic-pte` — %40 ortak · H1: PTE Kursu Sınav Hazırlık Eğitimi ‖ title: PTE Kursu \| Dünya Dilleri Merkezi
- `/sinav-hazirlik-egitimleri/cils-celi-kursu` — %43 ortak · H1: İtalyanca CILS / CELI Kursu Sınav Hazırlık Eğitimi ‖ title: CILS CELI Kursu İstanbul \| Dünya Dilleri Merkezi
- `/sinav-hazirlik-egitimleri/dele-kursu` — %29 ortak · H1: DELE Kursu Sınav Hazırlık Dersi Eğitim Programı ‖ title: DELE Kursu İstanbul \| Dünya Dilleri Merkezi
- `/sinav-hazirlik-egitimleri/delf-dalf-kursu` — %43 ortak · H1: Fransızca DELF / DALF Kursu Sınav Hazırlık Eğitimi ‖ title: DELF DALF Kursu İstanbul \| Dünya Dilleri Merkezi
- `/sinav-hazirlik-egitimleri/oet-kursu` — %40 ortak · H1: OET Kursu Sınavı Hazırlık Eğitimi ‖ title: OET Kursu İstanbul \| Dünya Dilleri Merkezi
- `/sinav-hazirlik-egitimleri/sat-kursu` — %40 ortak · H1: SAT Kursu Sınav Hazırlık Dersleri ‖ title: SAT Kursu \| Dünya Dilleri Merkezi
- `/sinav-hazirlik-egitimleri/telc-kursu` — %40 ortak · H1: TELC Kursu Sınav Hazırlık Eğitimi ‖ title: TELC Kursu İstanbul \| Dünya Dilleri Merkezi

**Yurtdışı** (2/9)

- `/yurtdisi-egitim/work-and-travel` — %43 ortak · H1: Yurtdışında Dil Eğitimi Work and Travel (WAT) ‖ title: Work and Travel \| Dünya Dilleri Merkezi
- `/yurtdisi-egitim/yurtdisi-ingilizce-egitimi` — %25 ortak · H1: Yetişkinler için İngilizce Dil Kursları ‖ title: Yurtdışı İngilizce Eğitimi \| Dünya Dilleri Merkezi

**İngilizce kursları** (1/9)

- `/ingilizce-kurslari/ilkogretim-ingilizce-kursu` — %40 ortak · H1: İlköğretim İngilizcesi Kursu Ders Programı ‖ title: İlköğretim İngilizcesi \| Dünya Dilleri Merkezi

**Şube iletişim** (1/6)

- `/ddm-iletisim` — %33 ortak · H1: Dünya Dilleri Merkezi Şubeleri İletişim Bilgileri ‖ title: İletişim \| Dünya Dilleri Merkezi

## Aynı başlık (0 küme)


## Aynı açıklama (0 küme)


## Tüm sayfalar (202)

| Adres | Tür | Başlık (kr) | Açıklama (kr) | H1 |
|---|---|---:|---:|---:|
| `/` | Ana Sayfa | 60 | 152 | 1 |
| `/atasehir-tanitim-sayfasi` | Şube tanıtım | 51 | 147 | 1 |
| `/cadde-tanitim-sayfasi` | Şube tanıtım | 56 | 150 | 1 |
| `/ddm-iletisim` | Şube iletişim | 32 | 142 | 1 |
| `/ddm-iletisim/1-kadikoy` | Şube iletişim | 68 | 62 | 1 |
| `/ddm-iletisim/3-levent` | Şube iletişim | 67 | 59 | 1 |
| `/ddm-iletisim/4-atasehir` | Şube iletişim | 69 | 63 | 1 |
| `/ddm-iletisim/iletisim-2-bagdat-caddesi` | Şube iletişim | 75 | 78 | 1 |
| `/ddm-iletisim/umraniye` | Şube iletişim | 69 | 63 | 1 |
| `/diger-program` | Kategori hub'ı | 48 | 144 | 1 |
| `/diger-program/business-english` | Diğer program / kurumsal | 57 | 152 | 1 |
| `/diger-program/cocuklar-icin-ingilizce-kursu` | Diğer program / kurumsal | 53 | 129 | 1 |
| `/diger-program/online-dil-egitimi` | Online eğitim | 60 | 135 | 1 |
| `/diger-program/ozel-dersler` | Diğer program / kurumsal | 57 | 142 | 1 |
| `/diger-program/tercume-hizmetleri` | Diğer program / kurumsal | 42 | 145 | 1 |
| `/ingilizce-kurslari` | Kategori hub'ı | 58 | 133 | 1 |
| `/ingilizce-kurslari/advanced-ingilizce-kursu` | İngilizce kursları | 45 | 137 | 1 |
| `/ingilizce-kurslari/elementary-ingilizce-kursu` | İngilizce kursları | 50 | 133 | 1 |
| `/ingilizce-kurslari/ilkogretim-ingilizce-kursu` | İngilizce kursları | 46 | 133 | 1 |
| `/ingilizce-kurslari/intermediate-ingilizce-kursu` | İngilizce kursları | 52 | 133 | 1 |
| `/ingilizce-kurslari/pre-intermediate-ingilizce-kursu` | İngilizce kursları | 56 | 148 | 1 |
| `/ingilizce-kurslari/universite-ingilizce-kursu` | İngilizce kursları | 55 | 134 | 1 |
| `/ingilizce-kurslari/upper-intermediate-ingilizce-kursu` | İngilizce kursları | 58 | 145 | 1 |
| `/ingilizce-kurslari/yaz-okulu-ingilizce-kursu` | İngilizce kursları | 55 | 142 | 1 |
| `/ingilizce-kurslari/yks-dil-ingilizce` | İngilizce kursları | 41 | 129 | 1 |
| `/kadikoy-tanitim-sayfasi` | Şube tanıtım | 49 | 136 | 1 |
| `/kurumsal-dil-egitim` | Kategori hub'ı | 44 | 141 | 1 |
| `/kurumsal-dil-egitim/turkish-course-pegasus-pilots` | Diğer program / kurumsal | 45 | 145 | 1 |
| `/levent-tanitim-sayfasi` | Şube tanıtım | 56 | 148 | 1 |
| `/ogrenci-yorumlari` | Öğrenci Yorumları | 41 | 135 | 1 |
| `/sinav-hazirlik-egitimleri` | Kategori hub'ı | 47 | 140 | 1 |
| `/sinav-hazirlik-egitimleri/academic-pte` | Sınav hazırlık | 33 | 123 | 1 |
| `/sinav-hazirlik-egitimleri/academic-pte/pte-akademik-ozel-ders` | Özel ders | 46 | 126 | 1 |
| `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi` | Sınav hazırlık | 55 | 150 | 1 |
| `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi/a1-sinav-ornegi` | Tekil sayfa | 56 | 133 | 1 |
| `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi/atasehir-subesi-aile-birlesimi-kurs-tarihi` | Şube kurs tarihi | 50 | 115 | 1 |
| `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi/bagdat-caddesi-subesi-aile-birlesimi-kurs-tarihi` | Şube kurs tarihi | 56 | 137 | 1 |
| `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi/besiktas-subesi-aile-birlesimi-kurs-tarihi` | Şube kurs tarihi | 48 | 139 | 1 |
| `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi/kadikoy-subesi-aile-birlesimi-kurs-tarihi` | Şube kurs tarihi | 49 | 134 | 1 |
| `/sinav-hazirlik-egitimleri/cils-celi-kursu` | Sınav hazırlık | 48 | 152 | 1 |
| `/sinav-hazirlik-egitimleri/dele-kursu` | Sınav hazırlık | 43 | 146 | 1 |
| `/sinav-hazirlik-egitimleri/delf-dalf-kursu` | Sınav hazırlık | 48 | 146 | 1 |
| `/sinav-hazirlik-egitimleri/e-tep-kursu` | Sınav hazırlık | 44 | 134 | 1 |
| `/sinav-hazirlik-egitimleri/gmat-kursu` | Sınav hazırlık | 34 | 159 | 1 |
| `/sinav-hazirlik-egitimleri/gmat-kursu/atasehir-subesi-gmat-kurs-tarihi` | Şube kurs tarihi | 32 | 98 | 1 |
| `/sinav-hazirlik-egitimleri/gmat-kursu/bagdat-caddesi-gmat-subesi-kurs-tarihi` | Şube kurs tarihi | 79 | 118 | 1 |
| `/sinav-hazirlik-egitimleri/gmat-kursu/besiktas-subesi-gmat-kurs-tarihi` | Şube kurs tarihi | 30 | 122 | 1 |
| `/sinav-hazirlik-egitimleri/gmat-kursu/gmat-nedir` | Nedir rehberi | 35 | 154 | 1 |
| `/sinav-hazirlik-egitimleri/gmat-kursu/gmat-ozel-ders` | Özel ders | 55 | 138 | 1 |
| `/sinav-hazirlik-egitimleri/gmat-kursu/kadikoy-subesi-gmat-kurs-tarihi` | Şube kurs tarihi | 72 | 115 | 1 |
| `/sinav-hazirlik-egitimleri/gre-kursu` | Sınav hazırlık | 56 | 159 | 1 |
| `/sinav-hazirlik-egitimleri/gre-kursu/atasehir-subesi-kurs-tarihi` | Şube kurs tarihi | 31 | 96 | 1 |
| `/sinav-hazirlik-egitimleri/gre-kursu/bagdat-caddesi-subesi-kurs-tarihi` | Şube kurs tarihi | 37 | 118 | 1 |
| `/sinav-hazirlik-egitimleri/gre-kursu/besiktas-subesi-kurs-tarihi` | Şube kurs tarihi | 29 | 121 | 1 |
| `/sinav-hazirlik-egitimleri/gre-kursu/gre-nedir` | Nedir rehberi | 34 | 151 | 1 |
| `/sinav-hazirlik-egitimleri/gre-kursu/gre-ozel-ders` | Özel ders | 38 | 133 | 1 |
| `/sinav-hazirlik-egitimleri/gre-kursu/kadikoy-subesi-kurs-tarihi` | Şube kurs tarihi | 30 | 114 | 1 |
| `/sinav-hazirlik-egitimleri/ielts-kursu` | Sınav hazırlık | 59 | 157 | 1 |
| `/sinav-hazirlik-egitimleri/ielts-kursu/atasehir-subesi-kurs-tarihi` | Şube kurs tarihi | 33 | 99 | 1 |
| `/sinav-hazirlik-egitimleri/ielts-kursu/bagdat-caddesi-subesi-kurs-tarihi` | Şube kurs tarihi | 39 | 120 | 1 |
| `/sinav-hazirlik-egitimleri/ielts-kursu/besiktas-subesi-kurs-tarihi` | Şube kurs tarihi | 31 | 123 | 1 |
| `/sinav-hazirlik-egitimleri/ielts-kursu/ielts-nedir` | Nedir rehberi | 36 | 148 | 1 |
| `/sinav-hazirlik-egitimleri/ielts-kursu/ielts-ozel-ders` | Özel ders | 58 | 146 | 1 |
| `/sinav-hazirlik-egitimleri/ielts-kursu/kadikoy-subesi-kurs-tarihi` | Şube kurs tarihi | 32 | 116 | 1 |
| `/sinav-hazirlik-egitimleri/oet-kursu` | Sınav hazırlık | 42 | 144 | 1 |
| `/sinav-hazirlik-egitimleri/osd-kursu` | Sınav hazırlık | 42 | 146 | 1 |
| `/sinav-hazirlik-egitimleri/proficiency-kursu` | Sınav hazırlık | 69 | 129 | 1 |
| `/sinav-hazirlik-egitimleri/proficiency-kursu/acibadem-universitesi` | Üniversite proficiency | 62 | 131 | 1 |
| `/sinav-hazirlik-egitimleri/proficiency-kursu/atasehir-subesi-proficiency-kurs-tarihi` | Şube kurs tarihi | 39 | 105 | 1 |
| `/sinav-hazirlik-egitimleri/proficiency-kursu/bagdat-caddesi-proficiency-subesi-kurs-tarihi` | Şube kurs tarihi | 45 | 126 | 1 |
| `/sinav-hazirlik-egitimleri/proficiency-kursu/bahcesehir-universitesi` | Üniversite proficiency | 64 | 146 | 1 |
| `/sinav-hazirlik-egitimleri/proficiency-kursu/besiktas-subesi-proficiency-kurs-tarihi` | Şube kurs tarihi | 37 | 129 | 1 |
| `/sinav-hazirlik-egitimleri/proficiency-kursu/beykent-universitesi` | Üniversite proficiency | 61 | 151 | 1 |
| `/sinav-hazirlik-egitimleri/proficiency-kursu/bilgi-universitesi` | Üniversite proficiency | 65 | 154 | 1 |
| `/sinav-hazirlik-egitimleri/proficiency-kursu/bogazici-universitesi` | Üniversite proficiency | 68 | 153 | 1 |
| `/sinav-hazirlik-egitimleri/proficiency-kursu/dogus-universitesi` | Üniversite proficiency | 66 | 138 | 1 |
| `/sinav-hazirlik-egitimleri/proficiency-kursu/isik-universitesi` | Üniversite proficiency | 58 | 144 | 1 |
| `/sinav-hazirlik-egitimleri/proficiency-kursu/istanbul-teknik-universitesi` | Üniversite proficiency | 73 | 162 | 1 |
| `/sinav-hazirlik-egitimleri/proficiency-kursu/kadikoy-subesi-proficiency-kurs-tarihi` | Şube kurs tarihi | 38 | 123 | 1 |
| `/sinav-hazirlik-egitimleri/proficiency-kursu/kadirhas-universitesi-hazirlik` | Üniversite proficiency | 63 | 152 | 1 |
| `/sinav-hazirlik-egitimleri/proficiency-kursu/koc-universitesi` | Üniversite proficiency | 63 | 151 | 1 |
| `/sinav-hazirlik-egitimleri/proficiency-kursu/kocaeli-universitesi-hazirlik` | Üniversite proficiency | 61 | 140 | 1 |
| `/sinav-hazirlik-egitimleri/proficiency-kursu/maltepe-universitesi` | Üniversite proficiency | 49 | 153 | 1 |
| `/sinav-hazirlik-egitimleri/proficiency-kursu/marmara-universitesi` | Üniversite proficiency | 61 | 151 | 1 |
| `/sinav-hazirlik-egitimleri/proficiency-kursu/okan-universitesi` | Üniversite proficiency | 58 | 119 | 1 |
| `/sinav-hazirlik-egitimleri/proficiency-kursu/ortadogu-teknik-universitesi` | Üniversite proficiency | 75 | 147 | 1 |
| `/sinav-hazirlik-egitimleri/proficiency-kursu/ozyegin-universitesi` | Üniversite proficiency | 41 | 157 | 1 |
| `/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-nedir` | Nedir rehberi | 42 | 152 | 1 |
| `/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-ornek-sinav-sorulari` | Tekil sayfa | 56 | 145 | 1 |
| `/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-ozel-ders` | Özel ders | 46 | 150 | 1 |
| `/sinav-hazirlik-egitimleri/proficiency-kursu/sabanci-universitesi` | Üniversite proficiency | 40 | 156 | 1 |
| `/sinav-hazirlik-egitimleri/proficiency-kursu/yeditepe-universitesi` | Üniversite proficiency | 62 | 148 | 1 |
| `/sinav-hazirlik-egitimleri/proficiency-kursu/yildiz-teknik-universitesi` | Üniversite proficiency | 71 | 147 | 1 |
| `/sinav-hazirlik-egitimleri/sat-kursu` | Sınav hazırlık | 33 | 157 | 1 |
| `/sinav-hazirlik-egitimleri/sat-kursu/atasehir-subesi-sat-kurs-tarihi` | Şube kurs tarihi | 61 | 96 | 1 |
| `/sinav-hazirlik-egitimleri/sat-kursu/bagdat-caddesi-subesi-sat-kurs-tarihi` | Şube kurs tarihi | 54 | 118 | 1 |
| `/sinav-hazirlik-egitimleri/sat-kursu/besiktas-subesi-sat-kurs-tarihi` | Şube kurs tarihi | 59 | 121 | 1 |
| `/sinav-hazirlik-egitimleri/sat-kursu/kadikoy-subesi-sat-kurs-tarihi` | Şube kurs tarihi | 30 | 115 | 1 |
| `/sinav-hazirlik-egitimleri/sat-kursu/sat-nedir` | Nedir rehberi | 34 | 138 | 1 |
| `/sinav-hazirlik-egitimleri/sat-kursu/sat-ozel-ders` | Özel ders | 38 | 133 | 1 |
| `/sinav-hazirlik-egitimleri/telc-kursu` | Sınav hazırlık | 43 | 150 | 1 |
| `/sinav-hazirlik-egitimleri/testdaf-kursu` | Sınav hazırlık | 46 | 147 | 1 |
| `/sinav-hazirlik-egitimleri/toefl-kursu` | Sınav hazırlık | 71 | 152 | 1 |
| `/sinav-hazirlik-egitimleri/toefl-kursu/atasehir-subesi-toefl-kurs-tarihi` | Şube kurs tarihi | 33 | 131 | 1 |
| `/sinav-hazirlik-egitimleri/toefl-kursu/bagdat-caddesi-subesi-toefl-kurs-tarihi` | Şube kurs tarihi | 39 | 148 | 1 |
| `/sinav-hazirlik-egitimleri/toefl-kursu/besiktas-subesi-toefl-kurs-tarihi` | Şube kurs tarihi | 31 | 156 | 1 |
| `/sinav-hazirlik-egitimleri/toefl-kursu/kadikoy-subesi-kurs-tarihi` | Şube kurs tarihi | 32 | 145 | 1 |
| `/sinav-hazirlik-egitimleri/toefl-kursu/toefl-nedir` | Nedir rehberi | 36 | 138 | 1 |
| `/sinav-hazirlik-egitimleri/toefl-kursu/toefl-ozel-ders` | Özel ders | 58 | 147 | 1 |
| `/sinav-hazirlik-egitimleri/yds-kursu` | Sınav hazırlık | 56 | 158 | 1 |
| `/sinav-hazirlik-egitimleri/yds-kursu/atasehir-subesi-kurs-tarihi` | Şube kurs tarihi | 31 | 96 | 1 |
| `/sinav-hazirlik-egitimleri/yds-kursu/bagdat-caddesi-subesi-kurs-tarihi` | Şube kurs tarihi | 37 | 116 | 1 |
| `/sinav-hazirlik-egitimleri/yds-kursu/besiktas-subesi-kurs-tarihi` | Şube kurs tarihi | 29 | 121 | 1 |
| `/sinav-hazirlik-egitimleri/yds-kursu/kadikoy-subesi-kurs-tarihi` | Şube kurs tarihi | 30 | 115 | 1 |
| `/sinav-hazirlik-egitimleri/yds-kursu/yds-nedir` | Nedir rehberi | 34 | 155 | 1 |
| `/sinav-hazirlik-egitimleri/yds-kursu/yds-ozel-ders` | Özel ders | 56 | 140 | 1 |
| `/sinav-hazirlik-egitimleri/yokdil-sinavi-kursu` | Sınav hazırlık | 52 | 123 | 1 |
| `/yabanci-dil` | Kategori hub'ı | 47 | 143 | 1 |
| `/yabanci-dil-egitimleri/almanca-kursu` | Dil kursu | 52 | 155 | 1 |
| `/yabanci-dil-egitimleri/almanca-kursu/almanca-egitim-seviyeleri` | Tekil sayfa | 49 | 140 | 1 |
| `/yabanci-dil-egitimleri/almanca-kursu/almanca-konusma-kurslari` | Tekil sayfa | 58 | 139 | 1 |
| `/yabanci-dil-egitimleri/almanca-kursu/almanca-ozel-ders` | Özel ders | 60 | 145 | 1 |
| `/yabanci-dil-egitimleri/almanca-kursu/atasehir-subesi-almanca-kurs-tarihi` | Şube kurs tarihi | 35 | 125 | 1 |
| `/yabanci-dil-egitimleri/almanca-kursu/bagdat-caddesi-subesi-almanca-kurs-tarihi` | Şube kurs tarihi | 41 | 142 | 1 |
| `/yabanci-dil-egitimleri/almanca-kursu/besiktas-subesi-almanca-kurs-tarihi` | Şube kurs tarihi | 33 | 150 | 1 |
| `/yabanci-dil-egitimleri/almanca-kursu/hizlandirilmis-almanca-kursu` | Tekil sayfa | 55 | 137 | 1 |
| `/yabanci-dil-egitimleri/almanca-kursu/kadikoy-subesi-almanca-kurs-tarihi` | Şube kurs tarihi | 34 | 146 | 1 |
| `/yabanci-dil-egitimleri/almanca-kursu/online-almanca-egitimi` | Online eğitim | 56 | 130 | 1 |
| `/yabanci-dil-egitimleri/bulgarca-kursu` | Dil kursu | 47 | 147 | 1 |
| `/yabanci-dil-egitimleri/cince-kursu` | Dil kursu | 50 | 155 | 1 |
| `/yabanci-dil-egitimleri/cince-kursu/atasehir-subesi-cince-kurs-tarihi` | Şube kurs tarihi | 33 | 91 | 1 |
| `/yabanci-dil-egitimleri/cince-kursu/bagdat-caddesi-subesi-cince-kurs-tarihi` | Şube kurs tarihi | 39 | 118 | 1 |
| `/yabanci-dil-egitimleri/cince-kursu/besiktas-subesi-cince-kurs-tarihi` | Şube kurs tarihi | 31 | 115 | 1 |
| `/yabanci-dil-egitimleri/cince-kursu/cince-ogrenmek-zor-mu` | Tekil sayfa | 50 | 126 | 1 |
| `/yabanci-dil-egitimleri/cince-kursu/cince-ozel-ders` | Özel ders | 58 | 143 | 1 |
| `/yabanci-dil-egitimleri/cince-kursu/kadikoy-subesi-cince-kurs-tarihi` | Şube kurs tarihi | 32 | 117 | 1 |
| `/yabanci-dil-egitimleri/cince-kursu/online-cince-egitimi` | Online eğitim | 54 | 128 | 1 |
| `/yabanci-dil-egitimleri/flemenkce-kursu` | Dil kursu | 53 | 151 | 1 |
| `/yabanci-dil-egitimleri/fransizca-kursu` | Dil kursu | 54 | 157 | 1 |
| `/yabanci-dil-egitimleri/fransizca-kursu/atasehir-subesi-fransizca-kurs-tarihi` | Şube kurs tarihi | 37 | 93 | 1 |
| `/yabanci-dil-egitimleri/fransizca-kursu/bagdat-caddesi-subesi-fransizca-kurs-tarihi` | Şube kurs tarihi | 36 | 99 | 1 |
| `/yabanci-dil-egitimleri/fransizca-kursu/besiktas-subesi-fransizca-kurs-tarihi` | Şube kurs tarihi | 35 | 91 | 1 |
| `/yabanci-dil-egitimleri/fransizca-kursu/fransizca-ozel-ders` | Özel ders | 51 | 147 | 1 |
| `/yabanci-dil-egitimleri/fransizca-kursu/kadikoy-subesi-fransizca-kurs-tarihi` | Şube kurs tarihi | 36 | 92 | 1 |
| `/yabanci-dil-egitimleri/fransizca-kursu/online-fransizca-egitimi` | Online eğitim | 58 | 131 | 1 |
| `/yabanci-dil-egitimleri/ingilizce-konusma-kursu` | Dil kursu | 74 | 154 | 1 |
| `/yabanci-dil-egitimleri/ingilizce-konusma-kursu/atasehir-subesi-ingilizce-konusma-kurs-tarihi` | Şube kurs tarihi | 45 | 152 | 1 |
| `/yabanci-dil-egitimleri/ingilizce-konusma-kursu/bagdat-caddesi-subesi-ingilizce-konusma-kurs-tarihi` | Şube kurs tarihi | 52 | 159 | 1 |
| `/yabanci-dil-egitimleri/ingilizce-konusma-kursu/besiktas-subesi-ingilizce-konusma-kurs-tarihi` | Şube kurs tarihi | 43 | 153 | 1 |
| `/yabanci-dil-egitimleri/ingilizce-konusma-kursu/ingilizce-konusma-ozel-ders` | Özel ders | 51 | 140 | 1 |
| `/yabanci-dil-egitimleri/ingilizce-konusma-kursu/kadikoy-subesi-ingilizce-konusma-kurs-tarihi` | Şube kurs tarihi | 44 | 151 | 1 |
| `/yabanci-dil-egitimleri/ingilizce-kursu` | Dil kursu | 54 | 146 | 1 |
| `/yabanci-dil-egitimleri/ingilizce-kursu/atasehir-subesi-ingilizce-kurs-tarihi` | Şube kurs tarihi | 61 | 126 | 1 |
| `/yabanci-dil-egitimleri/ingilizce-kursu/bagdat-caddesi-subesi-kurs-tarihi` | Şube kurs tarihi | 68 | 145 | 1 |
| `/yabanci-dil-egitimleri/ingilizce-kursu/besiktas-subesi-kurs-tarihi` | Şube kurs tarihi | 59 | 152 | 1 |
| `/yabanci-dil-egitimleri/ingilizce-kursu/ingilizce-egitim-sistemi` | Tekil sayfa | 48 | 150 | 1 |
| `/yabanci-dil-egitimleri/ingilizce-kursu/ingilizce-ozel-ders` | Özel ders | 51 | 147 | 1 |
| `/yabanci-dil-egitimleri/ingilizce-kursu/kadikoy-subesi-ingilizce-kurs-tarihi` | Şube kurs tarihi | 61 | 148 | 1 |
| `/yabanci-dil-egitimleri/ingilizce-kursu/online-ingilizce-egitimi` | Online eğitim | 58 | 132 | 1 |
| `/yabanci-dil-egitimleri/ispanyolca-kursu` | Dil kursu | 55 | 151 | 1 |
| `/yabanci-dil-egitimleri/ispanyolca-kursu/atasehir-subesi-ispanyolca-kurs-tarihi` | Şube kurs tarihi | 38 | 127 | 1 |
| `/yabanci-dil-egitimleri/ispanyolca-kursu/bagdat-caddesi-subesi-ispanyolca-kurs-tarihi` | Şube kurs tarihi | 44 | 146 | 1 |
| `/yabanci-dil-egitimleri/ispanyolca-kursu/besiktas-subesi-ispanyolca-kurs-tarihi` | Şube kurs tarihi | 36 | 153 | 1 |
| `/yabanci-dil-egitimleri/ispanyolca-kursu/ispanyolca-ozel-ders` | Özel ders | 45 | 148 | 1 |
| `/yabanci-dil-egitimleri/ispanyolca-kursu/kadikoy-subesi-ispanyolca-kurs-tarihi` | Şube kurs tarihi | 37 | 149 | 1 |
| `/yabanci-dil-egitimleri/ispanyolca-kursu/online-ispanyolca-egitimi` | Online eğitim | 59 | 132 | 1 |
| `/yabanci-dil-egitimleri/isvecce-kursu` | Dil kursu | 46 | 139 | 1 |
| `/yabanci-dil-egitimleri/italyanca-kursu` | Dil kursu | 54 | 159 | 1 |
| `/yabanci-dil-egitimleri/italyanca-kursu/atasehir-subesi-italyanca-kurs-tarihi` | Şube kurs tarihi | 37 | 126 | 1 |
| `/yabanci-dil-egitimleri/italyanca-kursu/bagdat-caddesi-subesi-italyanca-kurs-tarihi` | Şube kurs tarihi | 43 | 145 | 1 |
| `/yabanci-dil-egitimleri/italyanca-kursu/besiktas-subesi-italyanca-kurs-tarihi` | Şube kurs tarihi | 35 | 152 | 1 |
| `/yabanci-dil-egitimleri/italyanca-kursu/italyanca-ozel-ders` | Özel ders | 51 | 147 | 1 |
| `/yabanci-dil-egitimleri/italyanca-kursu/kadikoy-subesi-italyanca-kurs-tarihi` | Şube kurs tarihi | 36 | 148 | 1 |
| `/yabanci-dil-egitimleri/italyanca-kursu/online-italyanca-egitimi` | Online eğitim | 58 | 132 | 1 |
| `/yabanci-dil-egitimleri/japonca-kursu` | Dil kursu | 46 | 153 | 1 |
| `/yabanci-dil-egitimleri/korece-kursu` | Dil kursu | 45 | 148 | 1 |
| `/yabanci-dil-egitimleri/rusca-kursu` | Dil kursu | 50 | 155 | 1 |
| `/yabanci-dil-egitimleri/rusca-kursu/atasehir-subesi-rusca-kurs-tarihi` | Şube kurs tarihi | 33 | 122 | 1 |
| `/yabanci-dil-egitimleri/rusca-kursu/bagdat-caddesi-subesi-rusca-kurs-tarihi` | Şube kurs tarihi | 39 | 141 | 1 |
| `/yabanci-dil-egitimleri/rusca-kursu/besiktas-subesi-rusca-kurs-tarihi` | Şube kurs tarihi | 31 | 148 | 1 |
| `/yabanci-dil-egitimleri/rusca-kursu/kadikoy-subesi-rusca-kurs-tarihi` | Şube kurs tarihi | 32 | 145 | 1 |
| `/yabanci-dil-egitimleri/rusca-kursu/online-rusca-egitimi` | Online eğitim | 54 | 128 | 1 |
| `/yabanci-dil-egitimleri/rusca-kursu/rusca-ozel-ders` | Özel ders | 58 | 143 | 1 |
| `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs` | Dil kursu | 51 | 159 | 1 |
| `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/atasehir-subesi-turkce-kurs-tarihi` | Şube kurs tarihi | 34 | 139 | 1 |
| `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/bagdat-caddesi-subesi-turkce-kurs-tarihi` | Şube kurs tarihi | 40 | 142 | 1 |
| `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/besiktas-subesi-turkce-kurs-tarihi` | Şube kurs tarihi | 32 | 146 | 1 |
| `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/kadikoy-subesi-turkce-kurs-tarihi` | Şube kurs tarihi | 33 | 151 | 1 |
| `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/online-turkce-egitimi` | Online eğitim | 55 | 129 | 1 |
| `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/turkce-egitim-seviyeleri` | Tekil sayfa | 48 | 140 | 1 |
| `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/turkce-ozel-ders` | Özel ders | 56 | 122 | 1 |
| `/yabanci-dil-egitimleri/yunanca-kursu` | Dil kursu | 46 | 149 | 1 |
| `/yurtdisi-egitim` | Kategori hub'ı | 53 | 153 | 1 |
| `/yurtdisi-egitim/pathway-programi` | Yurtdışı | 40 | 142 | 1 |
| `/yurtdisi-egitim/sinav-hazirlik` | Yurtdışı | 47 | 139 | 1 |
| `/yurtdisi-egitim/tercih/italyadauniversite` | Yurtdışı | 44 | 138 | 1 |
| `/yurtdisi-egitim/work-and-travel` | Yurtdışı | 39 | 144 | 1 |
| `/yurtdisi-egitim/yaz-okullari` | Yurtdışı | 56 | 131 | 1 |
| `/yurtdisi-egitim/yuksek-ogrenim` | Yurtdışı | 38 | 145 | 1 |
| `/yurtdisi-egitim/yurtdisi-ingilizce-egitimi` | Yurtdışı | 50 | 144 | 1 |
| `/yurtdisi-egitim/yurtdisi-ingilizce-egitimi/ingiltere` | Yurtdışı | 54 | 140 | 1 |
| `/yurtdisi-egitim/yurtdisi-ingilizce-egitimi/kanada-vancouver` | Yurtdışı | 50 | 147 | 1 |
