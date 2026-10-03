# Eski adres taraması — 2026-10-03 (son — P8 kapanış)

> `node scripts/check-redirects.mjs` çıktısı. Kaynak: `data/urls.csv` (384 adres) · sunucu: `next start` (http://localhost:3123) ·
> üretilen sayfa: 202 HTML · gizli sınav: 5 (`data/hiddenPages.ts`). Yönlendirmeler takip edilmeden istendi;
> zincir betik tarafından adım adım izlendi. Kurallar `statusCode: 301`; Next'in kendi sondaki-`/` kuralı 308 kalır.

## Özet

| Sonuç | Adet |
|---|---:|
| ✅ doğru (371 yeni adresinde açılıyor + 12 bilinçli 404) | **383** |
| ⏳ geçici yönlendirme (bilinçli, geri alınacak) | **1** |
| ⚠ açılıyor ama bakılmalı | **0** |
| ❌ kayıp (404 / döngü / hata) | **0** |
| **Toplam** | **384** |

Adım dağılımı: 0 adım → 12 · 1 adım → 372 · döngü: 0

## ⏳ Geçici yönlendirmeler (1)

> Kalıcı (301) DEĞİL. Kural `next.config.ts` `TEMPORARY_REDIRECTS`'te; hedef sayfa açılınca silinir.

| # | Eski adres | Beklenen hedef | İlk kod | Gerçek hedef | Adım | Sonuç |
|---:|---|---|---:|---|---:|---|
| 105 | `/ddm-iletisim/is-basvurusu-kariyer.html` | `/ddm-iletisim` | 307 | `/ddm-iletisim` → 200 | 1 | ⏳ GEÇİCİ yönlendirme (307) — kalıcı değil, geri alınacak |

## Sorunlu satırlar (0)

Yok.

## Ek kontroller (csv'de olmayan biçimler)

| Tür | İstenen | Durum | Hedef | Adım | Not |
|---|---|---:|---|---:|---|
| sondaki / | `/atasehir-tanitim-sayfasi/` | 200 | `/atasehir-tanitim-sayfasi` | 1 | ✅ tek adımda |
| sondaki / | `/cadde-tanitim-sayfasi/` | 200 | `/cadde-tanitim-sayfasi` | 1 | ✅ tek adımda |
| sondaki / | `/ddm-iletisim/` | 200 | `/ddm-iletisim` | 1 | ✅ tek adımda |
| sondaki / | `/ddm-iletisim/1-kadikoy/` | 200 | `/ddm-iletisim/1-kadikoy` | 1 | ✅ tek adımda |
| sondaki / | `/ddm-iletisim/3-levent/` | 200 | `/ddm-iletisim/3-levent` | 1 | ✅ tek adımda |
| sondaki / | `/ddm-iletisim/4-atasehir/` | 200 | `/ddm-iletisim/4-atasehir` | 1 | ✅ tek adımda |
| sondaki / | `/ddm-iletisim/iletisim-2-bagdat-caddesi/` | 200 | `/ddm-iletisim/iletisim-2-bagdat-caddesi` | 1 | ✅ tek adımda |
| sondaki / | `/ddm-iletisim/umraniye/` | 200 | `/ddm-iletisim/umraniye` | 1 | ✅ tek adımda |
| sondaki / | `/diger-program/` | 200 | `/diger-program` | 1 | ✅ tek adımda |
| sondaki / | `/diger-program/business-english/` | 200 | `/diger-program/business-english` | 1 | ✅ tek adımda |
| sondaki / | `/diger-program/cocuklar-icin-ingilizce-kursu/` | 200 | `/diger-program/cocuklar-icin-ingilizce-kursu` | 1 | ✅ tek adımda |
| sondaki / | `/diger-program/online-dil-egitimi/` | 200 | `/diger-program/online-dil-egitimi` | 1 | ✅ tek adımda |
| sondaki / | `/diger-program/ozel-dersler/` | 200 | `/diger-program/ozel-dersler` | 1 | ✅ tek adımda |
| sondaki / | `/diger-program/tercume-hizmetleri/` | 200 | `/diger-program/tercume-hizmetleri` | 1 | ✅ tek adımda |
| sondaki / | `/ingilizce-kurslari/` | 200 | `/ingilizce-kurslari` | 1 | ✅ tek adımda |
| sondaki / | `/ingilizce-kurslari/advanced-ingilizce-kursu/` | 200 | `/ingilizce-kurslari/advanced-ingilizce-kursu` | 1 | ✅ tek adımda |
| sondaki / | `/ingilizce-kurslari/elementary-ingilizce-kursu/` | 200 | `/ingilizce-kurslari/elementary-ingilizce-kursu` | 1 | ✅ tek adımda |
| sondaki / | `/ingilizce-kurslari/ilkogretim-ingilizce-kursu/` | 200 | `/ingilizce-kurslari/ilkogretim-ingilizce-kursu` | 1 | ✅ tek adımda |
| sondaki / | `/ingilizce-kurslari/intermediate-ingilizce-kursu/` | 200 | `/ingilizce-kurslari/intermediate-ingilizce-kursu` | 1 | ✅ tek adımda |
| sondaki / | `/ingilizce-kurslari/pre-intermediate-ingilizce-kursu/` | 200 | `/ingilizce-kurslari/pre-intermediate-ingilizce-kursu` | 1 | ✅ tek adımda |
| sondaki / | `/ingilizce-kurslari/universite-ingilizce-kursu/` | 200 | `/ingilizce-kurslari/universite-ingilizce-kursu` | 1 | ✅ tek adımda |
| sondaki / | `/ingilizce-kurslari/upper-intermediate-ingilizce-kursu/` | 200 | `/ingilizce-kurslari/upper-intermediate-ingilizce-kursu` | 1 | ✅ tek adımda |
| sondaki / | `/ingilizce-kurslari/yaz-okulu-ingilizce-kursu/` | 200 | `/ingilizce-kurslari/yaz-okulu-ingilizce-kursu` | 1 | ✅ tek adımda |
| sondaki / | `/ingilizce-kurslari/yks-dil-ingilizce/` | 200 | `/ingilizce-kurslari/yks-dil-ingilizce` | 1 | ✅ tek adımda |
| sondaki / | `/kadikoy-tanitim-sayfasi/` | 200 | `/kadikoy-tanitim-sayfasi` | 1 | ✅ tek adımda |
| sondaki / | `/kurumsal-dil-egitim/` | 200 | `/kurumsal-dil-egitim` | 1 | ✅ tek adımda |
| sondaki / | `/kurumsal-dil-egitim/turkish-course-pegasus-pilots/` | 200 | `/kurumsal-dil-egitim/turkish-course-pegasus-pilots` | 1 | ✅ tek adımda |
| sondaki / | `/levent-tanitim-sayfasi/` | 200 | `/levent-tanitim-sayfasi` | 1 | ✅ tek adımda |
| sondaki / | `/ogrenci-yorumlari/` | 200 | `/ogrenci-yorumlari` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/` | 200 | `/sinav-hazirlik-egitimleri` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/academic-pte/` | 200 | `/sinav-hazirlik-egitimleri/academic-pte` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/academic-pte/pte-akademik-ozel-ders/` | 200 | `/sinav-hazirlik-egitimleri/academic-pte/pte-akademik-ozel-ders` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi/` | 200 | `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi/a1-sinav-ornegi/` | 200 | `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi/a1-sinav-ornegi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi/atasehir-subesi-aile-birlesimi-kurs-tarihi/` | 200 | `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi/atasehir-subesi-aile-birlesimi-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi/bagdat-caddesi-subesi-aile-birlesimi-kurs-tarihi/` | 200 | `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi/bagdat-caddesi-subesi-aile-birlesimi-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi/besiktas-subesi-aile-birlesimi-kurs-tarihi/` | 200 | `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi/besiktas-subesi-aile-birlesimi-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi/kadikoy-subesi-aile-birlesimi-kurs-tarihi/` | 200 | `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi/kadikoy-subesi-aile-birlesimi-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/gmat-kursu/` | 200 | `/sinav-hazirlik-egitimleri/gmat-kursu` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/gmat-kursu/atasehir-subesi-gmat-kurs-tarihi/` | 200 | `/sinav-hazirlik-egitimleri/gmat-kursu/atasehir-subesi-gmat-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/gmat-kursu/bagdat-caddesi-gmat-subesi-kurs-tarihi/` | 200 | `/sinav-hazirlik-egitimleri/gmat-kursu/bagdat-caddesi-gmat-subesi-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/gmat-kursu/besiktas-subesi-gmat-kurs-tarihi/` | 200 | `/sinav-hazirlik-egitimleri/gmat-kursu/besiktas-subesi-gmat-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/gmat-kursu/gmat-nedir/` | 200 | `/sinav-hazirlik-egitimleri/gmat-kursu/gmat-nedir` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/gmat-kursu/gmat-ozel-ders/` | 200 | `/sinav-hazirlik-egitimleri/gmat-kursu/gmat-ozel-ders` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/gmat-kursu/kadikoy-subesi-gmat-kurs-tarihi/` | 200 | `/sinav-hazirlik-egitimleri/gmat-kursu/kadikoy-subesi-gmat-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/gre-kursu/` | 200 | `/sinav-hazirlik-egitimleri/gre-kursu` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/gre-kursu/atasehir-subesi-kurs-tarihi/` | 200 | `/sinav-hazirlik-egitimleri/gre-kursu/atasehir-subesi-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/gre-kursu/bagdat-caddesi-subesi-kurs-tarihi/` | 200 | `/sinav-hazirlik-egitimleri/gre-kursu/bagdat-caddesi-subesi-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/gre-kursu/besiktas-subesi-kurs-tarihi/` | 200 | `/sinav-hazirlik-egitimleri/gre-kursu/besiktas-subesi-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/gre-kursu/gre-nedir/` | 200 | `/sinav-hazirlik-egitimleri/gre-kursu/gre-nedir` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/gre-kursu/gre-ozel-ders/` | 200 | `/sinav-hazirlik-egitimleri/gre-kursu/gre-ozel-ders` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/gre-kursu/kadikoy-subesi-kurs-tarihi/` | 200 | `/sinav-hazirlik-egitimleri/gre-kursu/kadikoy-subesi-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/ielts-kursu/` | 200 | `/sinav-hazirlik-egitimleri/ielts-kursu` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/ielts-kursu/atasehir-subesi-kurs-tarihi/` | 200 | `/sinav-hazirlik-egitimleri/ielts-kursu/atasehir-subesi-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/ielts-kursu/bagdat-caddesi-subesi-kurs-tarihi/` | 200 | `/sinav-hazirlik-egitimleri/ielts-kursu/bagdat-caddesi-subesi-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/ielts-kursu/besiktas-subesi-kurs-tarihi/` | 200 | `/sinav-hazirlik-egitimleri/ielts-kursu/besiktas-subesi-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/ielts-kursu/ielts-nedir/` | 200 | `/sinav-hazirlik-egitimleri/ielts-kursu/ielts-nedir` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/ielts-kursu/ielts-ozel-ders/` | 200 | `/sinav-hazirlik-egitimleri/ielts-kursu/ielts-ozel-ders` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/ielts-kursu/kadikoy-subesi-kurs-tarihi/` | 200 | `/sinav-hazirlik-egitimleri/ielts-kursu/kadikoy-subesi-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/proficiency-kursu/` | 200 | `/sinav-hazirlik-egitimleri/proficiency-kursu` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/proficiency-kursu/acibadem-universitesi/` | 200 | `/sinav-hazirlik-egitimleri/proficiency-kursu/acibadem-universitesi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/proficiency-kursu/atasehir-subesi-proficiency-kurs-tarihi/` | 200 | `/sinav-hazirlik-egitimleri/proficiency-kursu/atasehir-subesi-proficiency-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/proficiency-kursu/bagdat-caddesi-proficiency-subesi-kurs-tarihi/` | 200 | `/sinav-hazirlik-egitimleri/proficiency-kursu/bagdat-caddesi-proficiency-subesi-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/proficiency-kursu/bahcesehir-universitesi/` | 200 | `/sinav-hazirlik-egitimleri/proficiency-kursu/bahcesehir-universitesi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/proficiency-kursu/besiktas-subesi-proficiency-kurs-tarihi/` | 200 | `/sinav-hazirlik-egitimleri/proficiency-kursu/besiktas-subesi-proficiency-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/proficiency-kursu/beykent-universitesi/` | 200 | `/sinav-hazirlik-egitimleri/proficiency-kursu/beykent-universitesi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/proficiency-kursu/bilgi-universitesi/` | 200 | `/sinav-hazirlik-egitimleri/proficiency-kursu/bilgi-universitesi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/proficiency-kursu/bogazici-universitesi/` | 200 | `/sinav-hazirlik-egitimleri/proficiency-kursu/bogazici-universitesi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/proficiency-kursu/dogus-universitesi/` | 200 | `/sinav-hazirlik-egitimleri/proficiency-kursu/dogus-universitesi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/proficiency-kursu/isik-universitesi/` | 200 | `/sinav-hazirlik-egitimleri/proficiency-kursu/isik-universitesi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/proficiency-kursu/istanbul-teknik-universitesi/` | 200 | `/sinav-hazirlik-egitimleri/proficiency-kursu/istanbul-teknik-universitesi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/proficiency-kursu/kadikoy-subesi-proficiency-kurs-tarihi/` | 200 | `/sinav-hazirlik-egitimleri/proficiency-kursu/kadikoy-subesi-proficiency-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/proficiency-kursu/kadirhas-universitesi-hazirlik/` | 200 | `/sinav-hazirlik-egitimleri/proficiency-kursu/kadirhas-universitesi-hazirlik` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/proficiency-kursu/koc-universitesi/` | 200 | `/sinav-hazirlik-egitimleri/proficiency-kursu/koc-universitesi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/proficiency-kursu/kocaeli-universitesi-hazirlik/` | 200 | `/sinav-hazirlik-egitimleri/proficiency-kursu/kocaeli-universitesi-hazirlik` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/proficiency-kursu/maltepe-universitesi/` | 200 | `/sinav-hazirlik-egitimleri/proficiency-kursu/maltepe-universitesi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/proficiency-kursu/marmara-universitesi/` | 200 | `/sinav-hazirlik-egitimleri/proficiency-kursu/marmara-universitesi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/proficiency-kursu/okan-universitesi/` | 200 | `/sinav-hazirlik-egitimleri/proficiency-kursu/okan-universitesi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/proficiency-kursu/ortadogu-teknik-universitesi/` | 200 | `/sinav-hazirlik-egitimleri/proficiency-kursu/ortadogu-teknik-universitesi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/proficiency-kursu/ozyegin-universitesi/` | 200 | `/sinav-hazirlik-egitimleri/proficiency-kursu/ozyegin-universitesi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-nedir/` | 200 | `/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-nedir` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-ornek-sinav-sorulari/` | 200 | `/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-ornek-sinav-sorulari` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-ozel-ders/` | 200 | `/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-ozel-ders` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/proficiency-kursu/sabanci-universitesi/` | 200 | `/sinav-hazirlik-egitimleri/proficiency-kursu/sabanci-universitesi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/proficiency-kursu/yeditepe-universitesi/` | 200 | `/sinav-hazirlik-egitimleri/proficiency-kursu/yeditepe-universitesi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/proficiency-kursu/yildiz-teknik-universitesi/` | 200 | `/sinav-hazirlik-egitimleri/proficiency-kursu/yildiz-teknik-universitesi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/sat-kursu/` | 200 | `/sinav-hazirlik-egitimleri/sat-kursu` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/sat-kursu/atasehir-subesi-sat-kurs-tarihi/` | 200 | `/sinav-hazirlik-egitimleri/sat-kursu/atasehir-subesi-sat-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/sat-kursu/bagdat-caddesi-subesi-sat-kurs-tarihi/` | 200 | `/sinav-hazirlik-egitimleri/sat-kursu/bagdat-caddesi-subesi-sat-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/sat-kursu/besiktas-subesi-sat-kurs-tarihi/` | 200 | `/sinav-hazirlik-egitimleri/sat-kursu/besiktas-subesi-sat-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/sat-kursu/kadikoy-subesi-sat-kurs-tarihi/` | 200 | `/sinav-hazirlik-egitimleri/sat-kursu/kadikoy-subesi-sat-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/sat-kursu/sat-nedir/` | 200 | `/sinav-hazirlik-egitimleri/sat-kursu/sat-nedir` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/sat-kursu/sat-ozel-ders/` | 200 | `/sinav-hazirlik-egitimleri/sat-kursu/sat-ozel-ders` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/testdaf-kursu/` | 200 | `/sinav-hazirlik-egitimleri/testdaf-kursu` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/toefl-kursu/` | 200 | `/sinav-hazirlik-egitimleri/toefl-kursu` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/toefl-kursu/atasehir-subesi-toefl-kurs-tarihi/` | 200 | `/sinav-hazirlik-egitimleri/toefl-kursu/atasehir-subesi-toefl-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/toefl-kursu/bagdat-caddesi-subesi-toefl-kurs-tarihi/` | 200 | `/sinav-hazirlik-egitimleri/toefl-kursu/bagdat-caddesi-subesi-toefl-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/toefl-kursu/besiktas-subesi-toefl-kurs-tarihi/` | 200 | `/sinav-hazirlik-egitimleri/toefl-kursu/besiktas-subesi-toefl-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/toefl-kursu/kadikoy-subesi-kurs-tarihi/` | 200 | `/sinav-hazirlik-egitimleri/toefl-kursu/kadikoy-subesi-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/toefl-kursu/toefl-nedir/` | 200 | `/sinav-hazirlik-egitimleri/toefl-kursu/toefl-nedir` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/toefl-kursu/toefl-ozel-ders/` | 200 | `/sinav-hazirlik-egitimleri/toefl-kursu/toefl-ozel-ders` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/yds-kursu/` | 200 | `/sinav-hazirlik-egitimleri/yds-kursu` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/yds-kursu/atasehir-subesi-kurs-tarihi/` | 200 | `/sinav-hazirlik-egitimleri/yds-kursu/atasehir-subesi-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/yds-kursu/bagdat-caddesi-subesi-kurs-tarihi/` | 200 | `/sinav-hazirlik-egitimleri/yds-kursu/bagdat-caddesi-subesi-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/yds-kursu/besiktas-subesi-kurs-tarihi/` | 200 | `/sinav-hazirlik-egitimleri/yds-kursu/besiktas-subesi-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/yds-kursu/kadikoy-subesi-kurs-tarihi/` | 200 | `/sinav-hazirlik-egitimleri/yds-kursu/kadikoy-subesi-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/yds-kursu/yds-nedir/` | 200 | `/sinav-hazirlik-egitimleri/yds-kursu/yds-nedir` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/yds-kursu/yds-ozel-ders/` | 200 | `/sinav-hazirlik-egitimleri/yds-kursu/yds-ozel-ders` | 1 | ✅ tek adımda |
| sondaki / | `/sinav-hazirlik-egitimleri/yokdil-sinavi-kursu/` | 200 | `/sinav-hazirlik-egitimleri/yokdil-sinavi-kursu` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil/` | 200 | `/yabanci-dil` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/almanca-kursu/` | 200 | `/yabanci-dil-egitimleri/almanca-kursu` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/almanca-kursu/almanca-egitim-seviyeleri/` | 200 | `/yabanci-dil-egitimleri/almanca-kursu/almanca-egitim-seviyeleri` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/almanca-kursu/almanca-konusma-kurslari/` | 200 | `/yabanci-dil-egitimleri/almanca-kursu/almanca-konusma-kurslari` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/almanca-kursu/almanca-ozel-ders/` | 200 | `/yabanci-dil-egitimleri/almanca-kursu/almanca-ozel-ders` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/almanca-kursu/atasehir-subesi-almanca-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/almanca-kursu/atasehir-subesi-almanca-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/almanca-kursu/bagdat-caddesi-subesi-almanca-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/almanca-kursu/bagdat-caddesi-subesi-almanca-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/almanca-kursu/besiktas-subesi-almanca-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/almanca-kursu/besiktas-subesi-almanca-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/almanca-kursu/hizlandirilmis-almanca-kursu/` | 200 | `/yabanci-dil-egitimleri/almanca-kursu/hizlandirilmis-almanca-kursu` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/almanca-kursu/kadikoy-subesi-almanca-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/almanca-kursu/kadikoy-subesi-almanca-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/almanca-kursu/online-almanca-egitimi/` | 200 | `/yabanci-dil-egitimleri/almanca-kursu/online-almanca-egitimi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/cince-kursu/` | 200 | `/yabanci-dil-egitimleri/cince-kursu` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/cince-kursu/atasehir-subesi-cince-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/cince-kursu/atasehir-subesi-cince-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/cince-kursu/bagdat-caddesi-subesi-cince-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/cince-kursu/bagdat-caddesi-subesi-cince-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/cince-kursu/besiktas-subesi-cince-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/cince-kursu/besiktas-subesi-cince-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/cince-kursu/cince-ogrenmek-zor-mu/` | 200 | `/yabanci-dil-egitimleri/cince-kursu/cince-ogrenmek-zor-mu` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/cince-kursu/cince-ozel-ders/` | 200 | `/yabanci-dil-egitimleri/cince-kursu/cince-ozel-ders` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/cince-kursu/kadikoy-subesi-cince-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/cince-kursu/kadikoy-subesi-cince-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/cince-kursu/online-cince-egitimi/` | 200 | `/yabanci-dil-egitimleri/cince-kursu/online-cince-egitimi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/flemenkce-kursu/` | 200 | `/yabanci-dil-egitimleri/flemenkce-kursu` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/fransizca-kursu/` | 200 | `/yabanci-dil-egitimleri/fransizca-kursu` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/fransizca-kursu/atasehir-subesi-fransizca-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/fransizca-kursu/atasehir-subesi-fransizca-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/fransizca-kursu/bagdat-caddesi-subesi-fransizca-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/fransizca-kursu/bagdat-caddesi-subesi-fransizca-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/fransizca-kursu/besiktas-subesi-fransizca-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/fransizca-kursu/besiktas-subesi-fransizca-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/fransizca-kursu/fransizca-ozel-ders/` | 200 | `/yabanci-dil-egitimleri/fransizca-kursu/fransizca-ozel-ders` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/fransizca-kursu/kadikoy-subesi-fransizca-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/fransizca-kursu/kadikoy-subesi-fransizca-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/fransizca-kursu/online-fransizca-egitimi/` | 200 | `/yabanci-dil-egitimleri/fransizca-kursu/online-fransizca-egitimi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu/` | 200 | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu/atasehir-subesi-ingilizce-konusma-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu/atasehir-subesi-ingilizce-konusma-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu/bagdat-caddesi-subesi-ingilizce-konusma-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu/bagdat-caddesi-subesi-ingilizce-konusma-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu/besiktas-subesi-ingilizce-konusma-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu/besiktas-subesi-ingilizce-konusma-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu/ingilizce-konusma-ozel-ders/` | 200 | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu/ingilizce-konusma-ozel-ders` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu/kadikoy-subesi-ingilizce-konusma-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu/kadikoy-subesi-ingilizce-konusma-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/ingilizce-kursu/` | 200 | `/yabanci-dil-egitimleri/ingilizce-kursu` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/ingilizce-kursu/atasehir-subesi-ingilizce-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/ingilizce-kursu/atasehir-subesi-ingilizce-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/ingilizce-kursu/bagdat-caddesi-subesi-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/ingilizce-kursu/bagdat-caddesi-subesi-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/ingilizce-kursu/besiktas-subesi-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/ingilizce-kursu/besiktas-subesi-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/ingilizce-kursu/ingilizce-egitim-sistemi/` | 200 | `/yabanci-dil-egitimleri/ingilizce-kursu/ingilizce-egitim-sistemi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/ingilizce-kursu/ingilizce-ozel-ders/` | 200 | `/yabanci-dil-egitimleri/ingilizce-kursu/ingilizce-ozel-ders` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/ingilizce-kursu/kadikoy-subesi-ingilizce-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/ingilizce-kursu/kadikoy-subesi-ingilizce-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/ingilizce-kursu/online-ingilizce-egitimi/` | 200 | `/yabanci-dil-egitimleri/ingilizce-kursu/online-ingilizce-egitimi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/ispanyolca-kursu/` | 200 | `/yabanci-dil-egitimleri/ispanyolca-kursu` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/ispanyolca-kursu/atasehir-subesi-ispanyolca-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/ispanyolca-kursu/atasehir-subesi-ispanyolca-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/ispanyolca-kursu/bagdat-caddesi-subesi-ispanyolca-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/ispanyolca-kursu/bagdat-caddesi-subesi-ispanyolca-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/ispanyolca-kursu/besiktas-subesi-ispanyolca-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/ispanyolca-kursu/besiktas-subesi-ispanyolca-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/ispanyolca-kursu/ispanyolca-ozel-ders/` | 200 | `/yabanci-dil-egitimleri/ispanyolca-kursu/ispanyolca-ozel-ders` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/ispanyolca-kursu/kadikoy-subesi-ispanyolca-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/ispanyolca-kursu/kadikoy-subesi-ispanyolca-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/ispanyolca-kursu/online-ispanyolca-egitimi/` | 200 | `/yabanci-dil-egitimleri/ispanyolca-kursu/online-ispanyolca-egitimi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/italyanca-kursu/` | 200 | `/yabanci-dil-egitimleri/italyanca-kursu` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/italyanca-kursu/atasehir-subesi-italyanca-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/italyanca-kursu/atasehir-subesi-italyanca-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/italyanca-kursu/bagdat-caddesi-subesi-italyanca-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/italyanca-kursu/bagdat-caddesi-subesi-italyanca-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/italyanca-kursu/besiktas-subesi-italyanca-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/italyanca-kursu/besiktas-subesi-italyanca-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/italyanca-kursu/italyanca-ozel-ders/` | 200 | `/yabanci-dil-egitimleri/italyanca-kursu/italyanca-ozel-ders` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/italyanca-kursu/kadikoy-subesi-italyanca-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/italyanca-kursu/kadikoy-subesi-italyanca-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/italyanca-kursu/online-italyanca-egitimi/` | 200 | `/yabanci-dil-egitimleri/italyanca-kursu/online-italyanca-egitimi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/rusca-kursu/` | 200 | `/yabanci-dil-egitimleri/rusca-kursu` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/rusca-kursu/atasehir-subesi-rusca-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/rusca-kursu/atasehir-subesi-rusca-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/rusca-kursu/bagdat-caddesi-subesi-rusca-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/rusca-kursu/bagdat-caddesi-subesi-rusca-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/rusca-kursu/besiktas-subesi-rusca-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/rusca-kursu/besiktas-subesi-rusca-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/rusca-kursu/kadikoy-subesi-rusca-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/rusca-kursu/kadikoy-subesi-rusca-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/rusca-kursu/online-rusca-egitimi/` | 200 | `/yabanci-dil-egitimleri/rusca-kursu/online-rusca-egitimi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/rusca-kursu/rusca-ozel-ders/` | 200 | `/yabanci-dil-egitimleri/rusca-kursu/rusca-ozel-ders` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/` | 200 | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/atasehir-subesi-turkce-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/atasehir-subesi-turkce-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/bagdat-caddesi-subesi-turkce-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/bagdat-caddesi-subesi-turkce-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/besiktas-subesi-turkce-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/besiktas-subesi-turkce-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/kadikoy-subesi-turkce-kurs-tarihi/` | 200 | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/kadikoy-subesi-turkce-kurs-tarihi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/online-turkce-egitimi/` | 200 | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/online-turkce-egitimi` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/turkce-egitim-seviyeleri/` | 200 | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/turkce-egitim-seviyeleri` | 1 | ✅ tek adımda |
| sondaki / | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/turkce-ozel-ders/` | 200 | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/turkce-ozel-ders` | 1 | ✅ tek adımda |
| sondaki / | `/yurtdisi-egitim/` | 200 | `/yurtdisi-egitim` | 1 | ✅ tek adımda |
| sondaki / | `/yurtdisi-egitim/pathway-programi/` | 200 | `/yurtdisi-egitim/pathway-programi` | 1 | ✅ tek adımda |
| sondaki / | `/yurtdisi-egitim/sinav-hazirlik/` | 200 | `/yurtdisi-egitim/sinav-hazirlik` | 1 | ✅ tek adımda |
| sondaki / | `/yurtdisi-egitim/tercih/italyadauniversite/` | 200 | `/yurtdisi-egitim/tercih/italyadauniversite` | 1 | ✅ tek adımda |
| sondaki / | `/yurtdisi-egitim/work-and-travel/` | 200 | `/yurtdisi-egitim/work-and-travel` | 1 | ✅ tek adımda |
| sondaki / | `/yurtdisi-egitim/yaz-okullari/` | 200 | `/yurtdisi-egitim/yaz-okullari` | 1 | ✅ tek adımda |
| sondaki / | `/yurtdisi-egitim/yuksek-ogrenim/` | 200 | `/yurtdisi-egitim/yuksek-ogrenim` | 1 | ✅ tek adımda |
| sondaki / | `/yurtdisi-egitim/yurtdisi-ingilizce-egitimi/` | 200 | `/yurtdisi-egitim/yurtdisi-ingilizce-egitimi` | 1 | ✅ tek adımda |
| sondaki / | `/yurtdisi-egitim/yurtdisi-ingilizce-egitimi/ingiltere/` | 200 | `/yurtdisi-egitim/yurtdisi-ingilizce-egitimi/ingiltere` | 1 | ✅ tek adımda |
| sondaki / | `/yurtdisi-egitim/yurtdisi-ingilizce-egitimi/kanada-vancouver/` | 200 | `/yurtdisi-egitim/yurtdisi-ingilizce-egitimi/kanada-vancouver` | 1 | ✅ tek adımda |
| büyük harf | `/SINAV-HAZIRLIK-EGITIMLERI/PROFICIENCY-KURSU.HTML` | 404 | `/SINAV-HAZIRLIK-EGITIMLERI/PROFICIENCY-KURSU` | 1 | ℹ büyük harfli adres 404 (Next büyük/küçük harfe duyarlı) |
| büyük harf | `/YABANCI-DIL-EGITIMLERI/INGILIZCE-KURSU.HTML` | 404 | `/YABANCI-DIL-EGITIMLERI/INGILIZCE-KURSU` | 1 | ℹ büyük harfli adres 404 (Next büyük/küçük harfe duyarlı) |
| büyük harf | `/YABANCI-DIL-EGITIMLERI/YABANCILA-ICIN-TURKCE-KURS/ATASEHIR-SUBESI-TURKCE-KURS-TARIHI.HTML` | 404 | `/YABANCI-DIL-EGITIMLERI/YABANCILA-ICIN-TURKCE-KURS/ATASEHIR-SUBESI-TURKCE-KURS-TARIHI` | 1 | ℹ büyük harfli adres 404 (Next büyük/küçük harfe duyarlı) |
| büyük harf | `/SINAV-HAZIRLIK-EGITIMLERI/GRE-KURSU/GRE-KURSU-2.HTML` | 200 | `/sinav-hazirlik-egitimleri/gre-kursu` | 1 | açılıyor |
| büyük harf | `/YABANCI-DIL-EGITIMLERI/YABANCILA-ICIN-TURKCE-KURS.HTML` | 404 | `/YABANCI-DIL-EGITIMLERI/YABANCILA-ICIN-TURKCE-KURS` | 1 | ℹ büyük harfli adres 404 (Next büyük/küçük harfe duyarlı) |
| büyük harf | `/DDM-ILETISIM/UMRANIYE.HTML` | 404 | `/DDM-ILETISIM/UMRANIYE` | 1 | ℹ büyük harfli adres 404 (Next büyük/küçük harfe duyarlı) |
| büyük harf | `/YABANCI-DIL-EGITIMLERI/ALMANCA-KURSU/ALMANCA-KURSU-2.HTML` | 200 | `/yabanci-dil-egitimleri/almanca-kursu` | 1 | açılıyor |
| büyük harf | `/INGILIZCE-KURSLARI/ELEMENTARY-INGILIZCE-KURSU.HTML` | 404 | `/INGILIZCE-KURSLARI/ELEMENTARY-INGILIZCE-KURSU` | 1 | ℹ büyük harfli adres 404 (Next büyük/küçük harfe duyarlı) |
| büyük harf | `/YABANCI-DIL-EGITIMLERI/INGILIZCE-KURSU/BESIKTAS-SUBESI-KURS-TARIHI.HTML` | 404 | `/YABANCI-DIL-EGITIMLERI/INGILIZCE-KURSU/BESIKTAS-SUBESI-KURS-TARIHI` | 1 | ℹ büyük harfli adres 404 (Next büyük/küçük harfe duyarlı) |
| büyük harf | `/SINAV-HAZIRLIK-EGITIMLERI/PROFICIENCY-KURSU/PROFICIENCY-OZEL-DERS.HTML` | 404 | `/SINAV-HAZIRLIK-EGITIMLERI/PROFICIENCY-KURSU/PROFICIENCY-OZEL-DERS` | 1 | ℹ büyük harfli adres 404 (Next büyük/küçük harfe duyarlı) |
| büyük harf | `/YABANCI-DIL-EGITIMLERI/INGILIZCE-KURSU/BAGDAT-CADDESI-SUBESI-KURS-TARIHI.HTML` | 404 | `/YABANCI-DIL-EGITIMLERI/INGILIZCE-KURSU/BAGDAT-CADDESI-SUBESI-KURS-TARIHI` | 1 | ℹ büyük harfli adres 404 (Next büyük/küçük harfe duyarlı) |
| büyük harf | `/DIGER-PROGRAM/TERCUME-HIZMETLERI.HTML` | 404 | `/DIGER-PROGRAM/TERCUME-HIZMETLERI` | 1 | ℹ büyük harfli adres 404 (Next büyük/küçük harfe duyarlı) |
| büyük harf | `/SINAV-HAZIRLIK-EGITIMLERI/GMAT-KURSU/BAGDAT-CADDESI-GMAT-SUBESI-KURS-TARIHI.HTML` | 404 | `/SINAV-HAZIRLIK-EGITIMLERI/GMAT-KURSU/BAGDAT-CADDESI-GMAT-SUBESI-KURS-TARIHI` | 1 | ℹ büyük harfli adres 404 (Next büyük/küçük harfe duyarlı) |
| büyük harf | `/SINAV-HAZIRLIK-EGITIMLERI/GRE-KURSU.HTML` | 404 | `/SINAV-HAZIRLIK-EGITIMLERI/GRE-KURSU` | 1 | ℹ büyük harfli adres 404 (Next büyük/küçük harfe duyarlı) |
| büyük harf | `/YABANCI-DIL-EGITIMLERI/CINCE-KURSU/ONLINE-CINCE-EGITIMI.HTML` | 404 | `/YABANCI-DIL-EGITIMLERI/CINCE-KURSU/ONLINE-CINCE-EGITIMI` | 1 | ℹ büyük harfli adres 404 (Next büyük/küçük harfe duyarlı) |
| küçük harf %-kodu | `/ogrenci-yorumlari/411-irem-uludirik-marmara-%c3%bcniversitesi-haz%c4%b1rl%c4%b1k-atlama-s%c4%b1nav%c4%b1-%c3%b6%c4%9frenci-yorumu.html` | 200 | `/ogrenci-yorumlari` | 1 | ✅ |
| küçük harf %-kodu | `/component/content/article/65-levent-subesi-on-kay%c4%b1t-formu.html` | 200 | `/ddm-iletisim/3-levent` | 1 | ✅ |
| küçük harf %-kodu | `/ogrenci-yorumlari/414-pte-akademik-s%c4%b1nav%c4%b1-kursu-%c3%b6%c4%9frencisi-yorumuu.html` | 200 | `/ogrenci-yorumlari` | 1 | ✅ |
| küçük harf %-kodu | `/ogrenci-yorumlari/415-bilgi-%c3%bcniversitesi-bilet-haz%c4%b1rl%c4%b1k-atlama-s%c4%b1nav%c4%b1-%c3%b6%c4%9frenci-yorumu-dora.html` | 200 | `/ogrenci-yorumlari` | 1 | ✅ |
| küçük harf %-kodu | `/ogrenci-yorumlari/367-%c3%bcnal-u%c4%9fur-%c3%a7e%c3%a7ener.html` | 200 | `/ogrenci-yorumlari` | 1 | ✅ |
| küçük harf %-kodu | `/ogrenci-yorumlari/387-u%c4%9fur-onar.html` | 200 | `/ogrenci-yorumlari` | 1 | ✅ |
| küçük harf %-kodu | `/ogrenci-yorumlari/416-ielts-%c3%b6%c4%9frenci-yorumlar%c4%b1-taylan-odaba%c5%9f%c4%b1.html` | 200 | `/ogrenci-yorumlari` | 1 | ✅ |
| küçük harf %-kodu | `/ogrenci-yorumlari/388-tu%c4%9f%c3%a7e-%c3%b6zdemir.html` | 200 | `/ogrenci-yorumlari` | 1 | ✅ |
| küçük harf %-kodu | `/ogrenci-yorumlari/410-testdaf-kursu-ogrenci-yorumlar%c4%b1.html` | 200 | `/ogrenci-yorumlari` | 1 | ✅ |
| küçük harf %-kodu | `/ogrenci-yorumlari/410-testdaf-kursu-ogrenci-yorumlar%c4%b1.html` | 200 | `/ogrenci-yorumlari` | 1 | ✅ |
| küçük harf %-kodu | `/ogrenci-yorumlari/416-ielts-%c3%b6%c4%9frenci-yorumlar%c4%b1-taylan-odaba%c5%9f%c4%b1.html` | 200 | `/ogrenci-yorumlari` | 1 | ✅ |
| küçük harf %-kodu | `/ogrenci-yorumlari/414-pte-akademik-s%c4%b1nav%c4%b1-kursu-%c3%b6%c4%9frencisi-yorumuu.html` | 200 | `/ogrenci-yorumlari` | 1 | ✅ |
| küçük harf %-kodu | `/ogrenci-yorumlari/411-irem-uludirik-marmara-%c3%bcniversitesi-haz%c4%b1rl%c4%b1k-atlama-s%c4%b1nav%c4%b1-%c3%b6%c4%9frenci-yorumu.html` | 200 | `/ogrenci-yorumlari` | 1 | ✅ |
| küçük harf %-kodu | `/component/content/article/65-levent-subesi-on-kay%c4%b1t-formu.html` | 200 | `/ddm-iletisim/3-levent` | 1 | ✅ |
| küçük harf %-kodu | `/ogrenci-yorumlari/367-%c3%bcnal-u%c4%9fur-%c3%a7e%c3%a7ener.html` | 200 | `/ogrenci-yorumlari` | 1 | ✅ |
| küçük harf %-kodu | `/ogrenci-yorumlari/388-tu%c4%9f%c3%a7e-%c3%b6zdemir.html` | 200 | `/ogrenci-yorumlari` | 1 | ✅ |
| küçük harf %-kodu | `/ogrenci-yorumlari/387-u%c4%9fur-onar.html` | 200 | `/ogrenci-yorumlari` | 1 | ✅ |

## Tam tablo (384)

| # | Eski adres | Beklenen hedef | İlk kod | Gerçek hedef | Adım | Sonuç |
|---:|---|---|---:|---|---:|---|
| 1 | `/sinav-hazirlik-egitimleri/proficiency-kursu.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu` → 200 | 1 | ✅  |
| 2 | `/yabanci-dil-egitimleri/ingilizce-kursu.html` | `/yabanci-dil-egitimleri/ingilizce-kursu` | 301 | `/yabanci-dil-egitimleri/ingilizce-kursu` → 200 | 1 | ✅  |
| 3 | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/atasehir-subesi-turkce-kurs-tarihi.html` | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/atasehir-subesi-turkce-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/atasehir-subesi-turkce-kurs-tarihi` → 200 | 1 | ✅  |
| 4 | `/sinav-hazirlik-egitimleri/gre-kursu/gre-kursu-2.html` | `/sinav-hazirlik-egitimleri/gre-kursu` | 301 | `/sinav-hazirlik-egitimleri/gre-kursu` → 200 | 1 | ✅  |
| 5 | `/diger-program/ozel-dersler.html?view=article&id=368:ingilizce-ozel-ders&catid=48` | `/yabanci-dil-egitimleri/ingilizce-kursu/ingilizce-ozel-ders` | 301 | `/yabanci-dil-egitimleri/ingilizce-kursu/ingilizce-ozel-ders?view=article&id=368%3Aingilizce-ozel-ders&catid=48` → 200 | 1 | ✅  |
| 6 | `/diger-program/ozel-dersler.html?view=article&id=374:cince-ozel-ders&catid=48` | `/yabanci-dil-egitimleri/cince-kursu/cince-ozel-ders` | 301 | `/yabanci-dil-egitimleri/cince-kursu/cince-ozel-ders?view=article&id=374%3Acince-ozel-ders&catid=48` → 200 | 1 | ✅  |
| 7 | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs.html` | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs` | 301 | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs` → 200 | 1 | ✅  |
| 8 | `/ddm-iletisim/umraniye.html` | `/ddm-iletisim/umraniye` | 301 | `/ddm-iletisim/umraniye` → 200 | 1 | ✅  |
| 9 | `/yabanci-dil-egitimleri/almanca-kursu/almanca-kursu-2.html` | `/yabanci-dil-egitimleri/almanca-kursu` | 301 | `/yabanci-dil-egitimleri/almanca-kursu` → 200 | 1 | ✅  |
| 10 | `/ingilizce-kurslari/elementary-ingilizce-kursu.html` | `/ingilizce-kurslari/elementary-ingilizce-kursu` | 301 | `/ingilizce-kurslari/elementary-ingilizce-kursu` → 200 | 1 | ✅  |
| 11 | `/yabanci-dil-egitimleri/ingilizce-kursu/besiktas-subesi-kurs-tarihi.html` | `/yabanci-dil-egitimleri/ingilizce-kursu/besiktas-subesi-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/ingilizce-kursu/besiktas-subesi-kurs-tarihi` → 200 | 1 | ✅  |
| 12 | `/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-ozel-ders.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-ozel-ders` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-ozel-ders` → 200 | 1 | ✅  |
| 13 | `/yabanci-dil-egitimleri/ingilizce-kursu/bagdat-caddesi-subesi-kurs-tarihi.html` | `/yabanci-dil-egitimleri/ingilizce-kursu/bagdat-caddesi-subesi-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/ingilizce-kursu/bagdat-caddesi-subesi-kurs-tarihi` → 200 | 1 | ✅  |
| 14 | `/component/content/article/338-iletisim-sayfasi-cadde.html?Itemid=403&catid=46` | `/ddm-iletisim/iletisim-2-bagdat-caddesi` | 301 | `/ddm-iletisim/iletisim-2-bagdat-caddesi?Itemid=403&catid=46` → 200 | 1 | ✅  |
| 15 | `/diger-program/tercume-hizmetleri.html` | `/diger-program/tercume-hizmetleri` | 301 | `/diger-program/tercume-hizmetleri` → 200 | 1 | ✅  |
| 16 | `/sinav-hazirlik-egitimleri/gmat-kursu/bagdat-caddesi-gmat-subesi-kurs-tarihi.html` | `/sinav-hazirlik-egitimleri/gmat-kursu/bagdat-caddesi-gmat-subesi-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/gmat-kursu/bagdat-caddesi-gmat-subesi-kurs-tarihi` → 200 | 1 | ✅  |
| 17 | `/sinav-hazirlik-egitimleri/proficiency-kursu.html?view=article&id=364:proficiency-sinavi&catid=35` | `/sinav-hazirlik-egitimleri/proficiency-kursu#universiteler` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu?view=article&id=364%3Aproficiency-sinavi&catid=35` → 200 | 1 | ✅  |
| 18 | `/sinav-hazirlik-egitimleri/gre-kursu.html` | `/sinav-hazirlik-egitimleri/gre-kursu` | 301 | `/sinav-hazirlik-egitimleri/gre-kursu` → 200 | 1 | ✅  |
| 19 | `/diger-program/ozel-dersler.html?view=article&id=382:gre-ozel-ders&catid=48` | `/sinav-hazirlik-egitimleri/gre-kursu/gre-ozel-ders` | 301 | `/sinav-hazirlik-egitimleri/gre-kursu/gre-ozel-ders?view=article&id=382%3Agre-ozel-ders&catid=48` → 200 | 1 | ✅  |
| 20 | `/yabanci-dil-egitimleri/cince-kursu/online-cince-egitimi.html` | `/yabanci-dil-egitimleri/cince-kursu/online-cince-egitimi` | 301 | `/yabanci-dil-egitimleri/cince-kursu/online-cince-egitimi` → 200 | 1 | ✅  |
| 21 | `/diger-program/ozel-dersler.html?view=article&id=379:pte-ozel-ders&catid=48` | `/sinav-hazirlik-egitimleri/academic-pte/pte-akademik-ozel-ders` | 301 | `/sinav-hazirlik-egitimleri/academic-pte/pte-akademik-ozel-ders?view=article&id=379%3Apte-ozel-ders&catid=48` → 200 | 1 | ✅  |
| 22 | `/ogrenci-yorumlari/411-irem-uludirik-marmara-üniversitesi-hazırlık-atlama-sınavı-öğrenci-yorumu.html` | `/ogrenci-yorumlari#yorum-411` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 23 | `/diger-program.html` | `/diger-program` | 301 | `/diger-program` → 200 | 1 | ✅  |
| 24 | `/yabanci-dil-egitimleri/rusca-kursu/bagdat-caddesi-subesi-rusca-kurs-tarihi.html` | `/yabanci-dil-egitimleri/rusca-kursu/bagdat-caddesi-subesi-rusca-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/rusca-kursu/bagdat-caddesi-subesi-rusca-kurs-tarihi` → 200 | 1 | ✅  |
| 25 | `/ogrenci-yorumlari/16-sibiya-sayeste.html` | `/ogrenci-yorumlari` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 26 | `/ogrenci-yorumlari/18-hulya-osmanoglu-ogrenci-yorumu.html` | `/ogrenci-yorumlari` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 27 | `/yabanci-dil-egitimleri/flemenkce-kursu.html` | `/yabanci-dil-egitimleri/flemenkce-kursu` | 301 | `/yabanci-dil-egitimleri/flemenkce-kursu` → 200 | 1 | ✅  |
| 28 | `/yabanci-dil-egitimleri/rusca-kursu/rusca-kursu-2.html` | `/yabanci-dil-egitimleri/rusca-kursu` | 301 | `/yabanci-dil-egitimleri/rusca-kursu` → 200 | 1 | ✅  |
| 29 | `/sinav-hazirlik-egitimleri/proficiency-kursu.html?view=article&id=304:bagdat-caddesi-kurs-tarihi&catid=35` | `/sinav-hazirlik-egitimleri/proficiency-kursu/bagdat-caddesi-proficiency-subesi-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/bagdat-caddesi-proficiency-subesi-kurs-tarihi?view=article&id=304%3Abagdat-caddesi-kurs-tarihi&catid=35` → 200 | 1 | ✅  |
| 30 | `/sinav-hazirlik-egitimleri/academic-pte.html` | `/sinav-hazirlik-egitimleri/academic-pte` | 301 | `/sinav-hazirlik-egitimleri/academic-pte` → 200 | 1 | ✅  |
| 31 | `/ogrenci-yorumlari/386-bensu-esin.html` | `/ogrenci-yorumlari` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 32 | `/yabanci-dil-egitimleri/fransizca-kursu/fransizca-ozel-ders.html` | `/yabanci-dil-egitimleri/fransizca-kursu/fransizca-ozel-ders` | 301 | `/yabanci-dil-egitimleri/fransizca-kursu/fransizca-ozel-ders` → 200 | 1 | ✅  |
| 33 | `/yabanci-dil-egitimleri/ispanyolca-kursu/besiktas-subesi-ispanyolca-kurs-tarihi.html` | `/yabanci-dil-egitimleri/ispanyolca-kursu/besiktas-subesi-ispanyolca-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/ispanyolca-kursu/besiktas-subesi-ispanyolca-kurs-tarihi` → 200 | 1 | ✅  |
| 34 | `/ogrenci-yorumlari/450-janset-nil-genc.html` | `/ogrenci-yorumlari` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 35 | `/marmara-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/marmara-universitesi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/marmara-universitesi` → 200 | 1 | ✅  |
| 36 | `/ogrenci-yorumlari/418-ielts-kurs-ogrenci-yorumu-mehmet-akif-dadaloglu.html` | `/ogrenci-yorumlari#yorum-418` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 37 | `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi.html` | `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi` | 301 | `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi` → 200 | 1 | ✅  |
| 38 | `/yabanci-dil-egitimleri/italyanca-kursu.html` | `/yabanci-dil-egitimleri/italyanca-kursu` | 301 | `/yabanci-dil-egitimleri/italyanca-kursu` → 200 | 1 | ✅  |
| 39 | `/ozyegin-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/ozyegin-universitesi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/ozyegin-universitesi` → 200 | 1 | ✅  |
| 40 | `/sinav-hazirlik-egitimleri/gmat-kursu.html?view=article&id=165:gmat-nedir&catid=39` | `/sinav-hazirlik-egitimleri/gmat-kursu/gmat-nedir` | 301 | `/sinav-hazirlik-egitimleri/gmat-kursu/gmat-nedir?view=article&id=165%3Agmat-nedir&catid=39` → 200 | 1 | ✅  |
| 41 | `/yildiz-teknik-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/yildiz-teknik-universitesi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/yildiz-teknik-universitesi` → 200 | 1 | ✅  |
| 42 | `/yabanci-dil-egitimleri/almanca-kursu.html?view=article&id=369:almanca-ozel-ders&catid=48` | `/yabanci-dil-egitimleri/almanca-kursu/almanca-ozel-ders` | 301 | `/yabanci-dil-egitimleri/almanca-kursu/almanca-ozel-ders?view=article&id=369%3Aalmanca-ozel-ders&catid=48` → 200 | 1 | ✅  |
| 43 | `/sinav-hazirlik-egitimleri/proficiency-kursu/sabanci-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/sabanci-universitesi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/sabanci-universitesi` → 200 | 1 | ✅  |
| 44 | `/sinav-hazirlik-egitimleri/sat-kursu/sat-nedir.html` | `/sinav-hazirlik-egitimleri/sat-kursu/sat-nedir` | 301 | `/sinav-hazirlik-egitimleri/sat-kursu/sat-nedir` → 200 | 1 | ✅  |
| 45 | `/yurtdisi-egitim/yaz-okullari.html` | `/yurtdisi-egitim/yaz-okullari` | 301 | `/yurtdisi-egitim/yaz-okullari` → 200 | 1 | ✅  |
| 46 | `/yabanci-dil-egitimleri/ispanyolca-kursu.html` | `/yabanci-dil-egitimleri/ispanyolca-kursu` | 301 | `/yabanci-dil-egitimleri/ispanyolca-kursu` → 200 | 1 | ✅  |
| 47 | `/diger-program/business-english.html` | `/diger-program/business-english` | 301 | `/diger-program/business-english` → 200 | 1 | ✅  |
| 48 | `/duyurular.html` | `/` | 301 | `/` → 200 | 1 | ✅ ana sayfa — onaylı karar (config yorumunda) |
| 49 | `/diger-program/ozel-dersler.html?view=article&id=377:ielts-ozel-ders&catid=48` | `/sinav-hazirlik-egitimleri/ielts-kursu/ielts-ozel-ders` | 301 | `/sinav-hazirlik-egitimleri/ielts-kursu/ielts-ozel-ders?view=article&id=377%3Aielts-ozel-ders&catid=48` → 200 | 1 | ✅  |
| 50 | `/yabanci-dil-egitimleri/italyanca-kursu/online-italyanca-egitimi.html` | `/yabanci-dil-egitimleri/italyanca-kursu/online-italyanca-egitimi` | 301 | `/yabanci-dil-egitimleri/italyanca-kursu/online-italyanca-egitimi` → 200 | 1 | ✅  |
| 51 | `/component/content/article/65-levent-subesi-on-kayıt-formu.html?Itemid=241&catid=26` | `/ddm-iletisim/3-levent` | 301 | `/ddm-iletisim/3-levent?Itemid=241&catid=26` → 200 | 1 | ✅  |
| 52 | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu.html` | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu` | 301 | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu` → 200 | 1 | ✅  |
| 53 | `/sinav-hazirlik-egitimleri/proficiency-kursu/istanbul-sehir-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu#universiteler` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu` → 200 | 1 | ✅  |
| 54 | `/sinav-hazirlik-egitimleri/proficiency-kursu.html?view=article&id=323:proficiency-sinav-sorulari&catid=35` | `/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-ornek-sinav-sorulari` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-ornek-sinav-sorulari?view=article&id=323%3Aproficiency-sinav-sorulari&catid=35` → 200 | 1 | ✅  |
| 55 | `/yabanci-dil-egitimleri/cince-kursu/cince-ozel-ders.html` | `/yabanci-dil-egitimleri/cince-kursu/cince-ozel-ders` | 301 | `/yabanci-dil-egitimleri/cince-kursu/cince-ozel-ders` → 200 | 1 | ✅  |
| 56 | `/yabanci-dil-egitimleri/cince-kursu/atasehir-subesi-cince-kurs-tarihi.html` | `/yabanci-dil-egitimleri/cince-kursu/atasehir-subesi-cince-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/cince-kursu/atasehir-subesi-cince-kurs-tarihi` → 200 | 1 | ✅  |
| 57 | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/kadikoy-subesi-turkce-kurs-tarihi.html` | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/kadikoy-subesi-turkce-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/kadikoy-subesi-turkce-kurs-tarihi` → 200 | 1 | ✅  |
| 58 | `/levent-tanitim-sayfasi.html` | `/levent-tanitim-sayfasi` | 301 | `/levent-tanitim-sayfasi` → 200 | 1 | ✅  |
| 59 | `/sinav-hazirlik-egitimleri/toefl-kursu/atasehir-subesi-toefl-kurs-tarihi.html` | `/sinav-hazirlik-egitimleri/toefl-kursu/atasehir-subesi-toefl-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/toefl-kursu/atasehir-subesi-toefl-kurs-tarihi` → 200 | 1 | ✅  |
| 60 | `/yabanci-dil-egitimleri/fransizca-kursu/besiktas-subesi-fransizca-kurs-tarihi.html` | `/yabanci-dil-egitimleri/fransizca-kursu/besiktas-subesi-fransizca-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/fransizca-kursu/besiktas-subesi-fransizca-kurs-tarihi` → 200 | 1 | ✅  |
| 61 | `/sinav-hazirlik-egitimleri/gre-kursu/besiktas-subesi-kurs-tarihi.html` | `/sinav-hazirlik-egitimleri/gre-kursu/besiktas-subesi-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/gre-kursu/besiktas-subesi-kurs-tarihi` → 200 | 1 | ✅  |
| 62 | `/sinav-hazirlik-egitimleri/proficiency-kursu/beykent-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/beykent-universitesi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/beykent-universitesi` → 200 | 1 | ✅  |
| 63 | `/yurtdisi-egitim.html` | `/yurtdisi-egitim` | 301 | `/yurtdisi-egitim` → 200 | 1 | ✅  |
| 64 | `/sinav-hazirlik-egitimleri/proficiency-kursu/bahcesehir-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/bahcesehir-universitesi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/bahcesehir-universitesi` → 200 | 1 | ✅  |
| 65 | `/ogrenci-yorumlari.html?start=12` | `/ogrenci-yorumlari` | 301 | `/ogrenci-yorumlari?start=12` → 200 | 1 | ✅  |
| 66 | `/duyurular/425-yks-dil-sinavi-basvuru-tarihleri.html` | `/ingilizce-kurslari/yks-dil-ingilizce` | 301 | `/ingilizce-kurslari/yks-dil-ingilizce` → 200 | 1 | ✅  |
| 67 | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/besiktas-subesi-turkce-kurs-tarihi.html` | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/besiktas-subesi-turkce-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/besiktas-subesi-turkce-kurs-tarihi` → 200 | 1 | ✅  |
| 68 | `/yurtdisi-egitim/yurtdisi-dil-egitimi.html` | `/yurtdisi-egitim` | 301 | `/yurtdisi-egitim` → 200 | 1 | ✅  |
| 69 | `/dogus-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/dogus-universitesi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/dogus-universitesi` → 200 | 1 | ✅  |
| 70 | `/duyurular/31-konusma-siniflari-speaking.html` | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu` | 301 | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu` → 200 | 1 | ✅  |
| 71 | `/sinav-hazirlik-egitimleri/yds-kursu/yds-kursu-2.html` | `/sinav-hazirlik-egitimleri/yds-kursu` | 301 | `/sinav-hazirlik-egitimleri/yds-kursu` → 200 | 1 | ✅  |
| 72 | `/sinav-hazirlik-egitimleri/yds-kursu.html` | `/sinav-hazirlik-egitimleri/yds-kursu` | 301 | `/sinav-hazirlik-egitimleri/yds-kursu` → 200 | 1 | ✅  |
| 73 | `/sinav-hazirlik-egitimleri/proficiency-kursu/bilgi-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/bilgi-universitesi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/bilgi-universitesi` → 200 | 1 | ✅  |
| 74 | `/yabanci-dil-egitimleri/rusca-kursu/online-rusca-egitimi.html` | `/yabanci-dil-egitimleri/rusca-kursu/online-rusca-egitimi` | 301 | `/yabanci-dil-egitimleri/rusca-kursu/online-rusca-egitimi` → 200 | 1 | ✅  |
| 75 | `/sinav-hazirlik-egitimleri/yds-kursu/atasehir-subesi-kurs-tarihi.html` | `/sinav-hazirlik-egitimleri/yds-kursu/atasehir-subesi-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/yds-kursu/atasehir-subesi-kurs-tarihi` → 200 | 1 | ✅  |
| 76 | `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi/atasehir-subesi-aile-birlesimi-kurs-tarihi.html` | `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi/atasehir-subesi-aile-birlesimi-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi/atasehir-subesi-aile-birlesimi-kurs-tarihi` → 200 | 1 | ✅  |
| 77 | `/sinav-hazirlik-egitimleri/sat-kursu.html?view=article&id=316:bagdat-caddesi-kurs-tarihi&catid=38` | `/sinav-hazirlik-egitimleri/sat-kursu/bagdat-caddesi-subesi-sat-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/sat-kursu/bagdat-caddesi-subesi-sat-kurs-tarihi?view=article&id=316%3Abagdat-caddesi-kurs-tarihi&catid=38` → 200 | 1 | ✅  |
| 78 | `/sinav-hazirlik-egitimleri/toeic-kursu/bagdat-caddesi-subesi-toeic-kurs-tarihi.html` | `404 (gizli)` | 404 | (aynı adres) → 404 | 0 | ✅ gizli — bilinçli 404 |
| 79 | `/sinav-hazirlik-egitimleri/proficiency-kursu.html?view=article&id=306:atasehir-kurs-tarihleri&catid=35` | `/sinav-hazirlik-egitimleri/proficiency-kursu/atasehir-subesi-proficiency-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/atasehir-subesi-proficiency-kurs-tarihi?view=article&id=306%3Aatasehir-kurs-tarihleri&catid=35` → 200 | 1 | ✅  |
| 80 | `/ogrenci-yorumlari/414-pte-akademik-sınavı-kursu-öğrencisi-yorumuu.html` | `/ogrenci-yorumlari` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 81 | `/sinav-hazirlik-egitimleri/proficiency-kursu/isik-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/isik-universitesi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/isik-universitesi` → 200 | 1 | ✅  |
| 82 | `/component/content/article/337-iletisim-sayfasi-kadikoy.html?Itemid=401&catid=46` | `/ddm-iletisim/1-kadikoy` | 301 | `/ddm-iletisim/1-kadikoy?Itemid=401&catid=46` → 200 | 1 | ✅  |
| 83 | `/component/content/article/61-iletisim-sayfasi.html?Itemid=405&catid=46` | `/ddm-iletisim/4-atasehir` | 301 | `/ddm-iletisim/4-atasehir?Itemid=405&catid=46` → 200 | 1 | ✅  |
| 84 | `/sinav-hazirlik-egitimleri/ielts-kursu/ielts-nedir.html` | `/sinav-hazirlik-egitimleri/ielts-kursu/ielts-nedir` | 301 | `/sinav-hazirlik-egitimleri/ielts-kursu/ielts-nedir` → 200 | 1 | ✅  |
| 85 | `/maltepe-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/maltepe-universitesi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/maltepe-universitesi` → 200 | 1 | ✅  |
| 86 | `/yurtdisi-egitim/yurtdisi-ingilizce-egitimi/kanada-vancouver-2.html` | `/yurtdisi-egitim/yurtdisi-ingilizce-egitimi/ingiltere` | 301 | `/yurtdisi-egitim/yurtdisi-ingilizce-egitimi/ingiltere` → 200 | 1 | ✅  |
| 87 | `/ingilizce-kurslari/ingilizce-egitim-sistemi.html` | `/yabanci-dil-egitimleri/ingilizce-kursu/ingilizce-egitim-sistemi` | 301 | `/yabanci-dil-egitimleri/ingilizce-kursu/ingilizce-egitim-sistemi` → 200 | 1 | ✅  |
| 88 | `/sinav-hazirlik-egitimleri/toeic-kursu/toeic-kursu-2.html` | `/sinav-hazirlik-egitimleri` | 301 | `/sinav-hazirlik-egitimleri` → 200 | 1 | ✅  |
| 89 | `/yurtdisi-egitim/yuksek-ogrenim.html` | `/yurtdisi-egitim/yuksek-ogrenim` | 301 | `/yurtdisi-egitim/yuksek-ogrenim` → 200 | 1 | ✅  |
| 90 | `/yurtdisi-egitim/yurtdisi-ingilizce-egitimi/kanada-vancouver.html` | `/yurtdisi-egitim/yurtdisi-ingilizce-egitimi/kanada-vancouver` | 301 | `/yurtdisi-egitim/yurtdisi-ingilizce-egitimi/kanada-vancouver` → 200 | 1 | ✅  |
| 91 | `/kurumsal-dil-egitim.html` | `/kurumsal-dil-egitim` | 301 | `/kurumsal-dil-egitim` → 200 | 1 | ✅  |
| 92 | `/sinav-hazirlik-egitimleri/proficiency-kursu/istanbul-teknik-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/istanbul-teknik-universitesi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/istanbul-teknik-universitesi` → 200 | 1 | ✅  |
| 93 | `/ddm-iletisim/1-kadikoy.html` | `/ddm-iletisim/1-kadikoy` | 301 | `/ddm-iletisim/1-kadikoy` → 200 | 1 | ✅  |
| 94 | `/sinav-hazirlik-egitimleri/yds-kursu/kadikoy-subesi-kurs-tarihi.html` | `/sinav-hazirlik-egitimleri/yds-kursu/kadikoy-subesi-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/yds-kursu/kadikoy-subesi-kurs-tarihi` → 200 | 1 | ✅  |
| 95 | `/sinav-hazirlik-egitimleri/sat-kursu/sat-kursu-2.html` | `/sinav-hazirlik-egitimleri/sat-kursu` | 301 | `/sinav-hazirlik-egitimleri/sat-kursu` → 200 | 1 | ✅  |
| 96 | `/ddm-iletisim.html` | `/ddm-iletisim` | 301 | `/ddm-iletisim` → 200 | 1 | ✅  |
| 97 | `/ogrenci-yorumlari.html?start=20` | `/ogrenci-yorumlari` | 301 | `/ogrenci-yorumlari?start=20` → 200 | 1 | ✅  |
| 98 | `/yabanci-dil-egitimleri/rusca-kursu/atasehir-subesi-rusca-kurs-tarihi.html` | `/yabanci-dil-egitimleri/rusca-kursu/atasehir-subesi-rusca-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/rusca-kursu/atasehir-subesi-rusca-kurs-tarihi` → 200 | 1 | ✅  |
| 99 | `/ogrenci-yorumlari/390-ozge-yasar.html` | `/ogrenci-yorumlari` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 100 | `/sinav-hazirlik-egitimleri/sat-kursu.html?view=article&id=317:levent-kurs-tarihi-4&catid=38` | `/sinav-hazirlik-egitimleri/sat-kursu/besiktas-subesi-sat-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/sat-kursu/besiktas-subesi-sat-kurs-tarihi?view=article&id=317%3Alevent-kurs-tarihi-4&catid=38` → 200 | 1 | ✅  |
| 101 | `/ortadogu-teknik-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/ortadogu-teknik-universitesi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/ortadogu-teknik-universitesi` → 200 | 1 | ✅  |
| 102 | `/sinav-hazirlik-egitimleri/gmat-kursu.html?view=article&id=321:levent-kurs-tarihi-4&catid=39` | `/sinav-hazirlik-egitimleri/gmat-kursu/besiktas-subesi-gmat-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/gmat-kursu/besiktas-subesi-gmat-kurs-tarihi?view=article&id=321%3Alevent-kurs-tarihi-4&catid=39` → 200 | 1 | ✅  |
| 103 | `/ogrenci-yorumlari/396-ece-erturk.html` | `/ogrenci-yorumlari` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 104 | `/ogrenci-yorumlari.html` | `/ogrenci-yorumlari` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 105 | `/ddm-iletisim/is-basvurusu-kariyer.html` | `/ddm-iletisim` | 307 | `/ddm-iletisim` → 200 | 1 | ⏳ GEÇİCİ yönlendirme (307) — kalıcı değil, geri alınacak |
| 106 | `/sinav-hazirlik-egitimleri/proficiency-kursu.html?view=article&id=303:kadikoy-merkez-kurs-tarihi&catid=35` | `/sinav-hazirlik-egitimleri/proficiency-kursu/kadikoy-subesi-proficiency-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/kadikoy-subesi-proficiency-kurs-tarihi?view=article&id=303%3Akadikoy-merkez-kurs-tarihi&catid=35` → 200 | 1 | ✅  |
| 107 | `/ogrenci-yorumlari.html?start=4` | `/ogrenci-yorumlari` | 301 | `/ogrenci-yorumlari?start=4` → 200 | 1 | ✅  |
| 108 | `/yabanci-dil-egitimleri/fransizca-kursu/fransizca-kursu-2.html` | `/yabanci-dil-egitimleri/fransizca-kursu` | 301 | `/yabanci-dil-egitimleri/fransizca-kursu` → 200 | 1 | ✅  |
| 109 | `/sinav-hazirlik-egitimleri/ielts-kursu/kadikoy-subesi-kurs-tarihi.html` | `/sinav-hazirlik-egitimleri/ielts-kursu/kadikoy-subesi-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/ielts-kursu/kadikoy-subesi-kurs-tarihi` → 200 | 1 | ✅  |
| 110 | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu/bagdat-caddesi-subesi-ingilizce-konusma-kurs-tarihi.html` | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu/bagdat-caddesi-subesi-ingilizce-konusma-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu/bagdat-caddesi-subesi-ingilizce-konusma-kurs-tarihi` → 200 | 1 | ✅  |
| 111 | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/turkce-ozel-ders.html` | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/turkce-ozel-ders` | 301 | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/turkce-ozel-ders` → 200 | 1 | ✅  |
| 112 | `/diger-program/yurtdisinda-egitim.html` | `/yurtdisi-egitim/work-and-travel` | 301 | `/yurtdisi-egitim/work-and-travel` → 200 | 1 | ✅  |
| 113 | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu/ingilizce-konusma-kursu-2.html` | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu` | 301 | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu` → 200 | 1 | ✅  |
| 114 | `/ogrenci-yorumlari/174-zeynep-yagmur-batikan.html` | `/ogrenci-yorumlari#yorum-174` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 115 | `/sinav-hazirlik-egitimleri/proficiency-kursu/yeditepe-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/yeditepe-universitesi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/yeditepe-universitesi` → 200 | 1 | ✅  |
| 116 | `/ogrenci-yorumlari/415-bilgi-üniversitesi-bilet-hazırlık-atlama-sınavı-öğrenci-yorumu-dora.html` | `/ogrenci-yorumlari#yorum-415` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 117 | `/yabanci-dil-egitimleri/cince-kursu/besiktas-subesi-cince-kurs-tarihi.html` | `/yabanci-dil-egitimleri/cince-kursu/besiktas-subesi-cince-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/cince-kursu/besiktas-subesi-cince-kurs-tarihi` → 200 | 1 | ✅  |
| 118 | `/ogrenci-yorumlari/367-ünal-uğur-çeçener.html` | `/ogrenci-yorumlari` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 119 | `/kadirhas-universitesi-hazirlik.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/kadirhas-universitesi-hazirlik` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/kadirhas-universitesi-hazirlik` → 200 | 1 | ✅  |
| 120 | `/duyurular/26-fransizca-kurslari.html` | `/yabanci-dil-egitimleri/fransizca-kursu` | 301 | `/yabanci-dil-egitimleri/fransizca-kursu` → 200 | 1 | ✅  |
| 121 | `/ingilizce-kurslari/intermediate-ingilizce-kursu.html` | `/ingilizce-kurslari/intermediate-ingilizce-kursu` | 301 | `/ingilizce-kurslari/intermediate-ingilizce-kursu` → 200 | 1 | ✅  |
| 122 | `/yabanci-dil-egitimleri/rusca-kursu/rusca-ozel-ders.html` | `/yabanci-dil-egitimleri/rusca-kursu/rusca-ozel-ders` | 301 | `/yabanci-dil-egitimleri/rusca-kursu/rusca-ozel-ders` → 200 | 1 | ✅  |
| 123 | `/yabanci-dil-egitimleri/italyanca-kursu/italyanca-ozel-ders.html` | `/yabanci-dil-egitimleri/italyanca-kursu/italyanca-ozel-ders` | 301 | `/yabanci-dil-egitimleri/italyanca-kursu/italyanca-ozel-ders` → 200 | 1 | ✅  |
| 124 | `/duyurular/23-aile-birlesimi-kurslar.html` | `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi` | 301 | `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi` → 200 | 1 | ✅  |
| 125 | `/ogrenci-yorumlari/402-irem-kurban.html` | `/ogrenci-yorumlari#yorum-402` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 126 | `/sinav-hazirlik-egitimleri/proficiency-kursu/ortadogu-teknik-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/ortadogu-teknik-universitesi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/ortadogu-teknik-universitesi` → 200 | 1 | ✅  |
| 127 | `/suleymansah-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu#universiteler` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu` → 200 | 1 | ✅  |
| 128 | `/sinav-hazirlik-egitimleri/yds-kursu/bagdat-caddesi-subesi-kurs-tarihi.html` | `/sinav-hazirlik-egitimleri/yds-kursu/bagdat-caddesi-subesi-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/yds-kursu/bagdat-caddesi-subesi-kurs-tarihi` → 200 | 1 | ✅  |
| 129 | `/yurtdisi-egitim/pathway-programi.html` | `/yurtdisi-egitim/pathway-programi` | 301 | `/yurtdisi-egitim/pathway-programi` → 200 | 1 | ✅  |
| 130 | `/ingilizce-kurslari/yks-dil-ingilizce.html` | `/ingilizce-kurslari/yks-dil-ingilizce` | 301 | `/ingilizce-kurslari/yks-dil-ingilizce` → 200 | 1 | ✅  |
| 131 | `/sinav-hazirlik-egitimleri/proficiency-kursu/okan-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/okan-universitesi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/okan-universitesi` → 200 | 1 | ✅  |
| 132 | `/sinav-hazirlik-egitimleri/proficiency-kursu/kocaeli-universitesi-hazirlik.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/kocaeli-universitesi-hazirlik` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/kocaeli-universitesi-hazirlik` → 200 | 1 | ✅  |
| 133 | `/ingilizce-kurslari/pre-intermediate-ingilizce-kursu.html` | `/ingilizce-kurslari/pre-intermediate-ingilizce-kursu` | 301 | `/ingilizce-kurslari/pre-intermediate-ingilizce-kursu` → 200 | 1 | ✅  |
| 134 | `/ogrenci-yorumlari/404-burcu-kolemanoglu.html` | `/ogrenci-yorumlari#yorum-404` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 135 | `/sinav-hazirlik-egitimleri/toefl-kursu/kadikoy-subesi-kurs-tarihi.html` | `/sinav-hazirlik-egitimleri/toefl-kursu/kadikoy-subesi-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/toefl-kursu/kadikoy-subesi-kurs-tarihi` → 200 | 1 | ✅  |
| 136 | `/aktivite-aktiviteler.html` | `/` | 301 | `/` → 200 | 1 | ✅ ana sayfa — onaylı karar (config yorumunda) |
| 137 | `/sinav-hazirlik-egitimleri/toeic-kursu/besiktas-subesi-toeic-kurs-tarihi.html` | `404 (gizli)` | 404 | (aynı adres) → 404 | 0 | ✅ gizli — bilinçli 404 |
| 138 | `/diger-program/ozel-dersler.html?view=article&id=371:ispanyolca-ozel-ders&catid=48` | `/yabanci-dil-egitimleri/ispanyolca-kursu/ispanyolca-ozel-ders` | 301 | `/yabanci-dil-egitimleri/ispanyolca-kursu/ispanyolca-ozel-ders?view=article&id=371%3Aispanyolca-ozel-ders&catid=48` → 200 | 1 | ✅  |
| 139 | `/ogrenci-yorumlari/15-tugba-seker.html` | `/ogrenci-yorumlari#yorum-15` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 140 | `/ddm-iletisim/3-levent.html` | `/ddm-iletisim/3-levent` | 301 | `/ddm-iletisim/3-levent` → 200 | 1 | ✅  |
| 141 | `/ddm-iletisim/iletisim-2-bagdat-caddesi.html` | `/ddm-iletisim/iletisim-2-bagdat-caddesi` | 301 | `/ddm-iletisim/iletisim-2-bagdat-caddesi` → 200 | 1 | ✅  |
| 142 | `/sinav-hazirlik-egitimleri/gre-kursu/gre-nedir.html` | `/sinav-hazirlik-egitimleri/gre-kursu/gre-nedir` | 301 | `/sinav-hazirlik-egitimleri/gre-kursu/gre-nedir` → 200 | 1 | ✅  |
| 143 | `/sinav-hazirlik-egitimleri/gmat-kursu/gmat-ozel-ders.html` | `/sinav-hazirlik-egitimleri/gmat-kursu/gmat-ozel-ders` | 301 | `/sinav-hazirlik-egitimleri/gmat-kursu/gmat-ozel-ders` → 200 | 1 | ✅  |
| 144 | `/ogrenci-yorumlari/406-ielts-ogrenci-yorumu-tayfun.html` | `/ogrenci-yorumlari#yorum-406` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 145 | `/kurumsal-dil-egitim/turkish-course-pegasus-pilots.html` | `/kurumsal-dil-egitim/turkish-course-pegasus-pilots` | 301 | `/kurumsal-dil-egitim/turkish-course-pegasus-pilots` → 200 | 1 | ✅  |
| 146 | `/sinav-hazirlik-egitimleri/proficiency-kursu/acibadem-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/acibadem-universitesi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/acibadem-universitesi` → 200 | 1 | ✅  |
| 147 | `/sinav-hazirlik-egitimleri/sat-kursu/bagdat-caddesi-subesi-sat-kurs-tarihi.html` | `/sinav-hazirlik-egitimleri/sat-kursu/bagdat-caddesi-subesi-sat-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/sat-kursu/bagdat-caddesi-subesi-sat-kurs-tarihi` → 200 | 1 | ✅  |
| 148 | `/ingilizce-kurslari/advanced-ingilizce-kursu.html` | `/ingilizce-kurslari/advanced-ingilizce-kursu` | 301 | `/ingilizce-kurslari/advanced-ingilizce-kursu` → 200 | 1 | ✅  |
| 149 | `/sinav-hazirlik-egitimleri/proficiency-kursu/yildiz-teknik-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/yildiz-teknik-universitesi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/yildiz-teknik-universitesi` → 200 | 1 | ✅  |
| 150 | `/sinav-hazirlik-egitimleri/sat-kursu.html?view=article&id=159:sat-nedir&catid=38` | `/sinav-hazirlik-egitimleri/sat-kursu/sat-nedir` | 301 | `/sinav-hazirlik-egitimleri/sat-kursu/sat-nedir?view=article&id=159%3Asat-nedir&catid=38` → 200 | 1 | ✅  |
| 151 | `/diger-program/ozel-dersler.html?view=article&id=381:sat-ozel-ders&catid=48` | `/sinav-hazirlik-egitimleri/sat-kursu/sat-ozel-ders` | 301 | `/sinav-hazirlik-egitimleri/sat-kursu/sat-ozel-ders?view=article&id=381%3Asat-ozel-ders&catid=48` → 200 | 1 | ✅  |
| 152 | `/sinav-hazirlik-egitimleri/yokdil-sinavi-kursu.html` | `/sinav-hazirlik-egitimleri/yokdil-sinavi-kursu` | 301 | `/sinav-hazirlik-egitimleri/yokdil-sinavi-kursu` → 200 | 1 | ✅  |
| 153 | `/istanbul-sehir-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu#universiteler` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu` → 200 | 1 | ✅  |
| 154 | `/ogrenci-yorumlari/387-uğur-onar.html` | `/ogrenci-yorumlari#yorum-387` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 155 | `/cadde-tanitim-sayfasi.html` | `/cadde-tanitim-sayfasi` | 301 | `/cadde-tanitim-sayfasi` → 200 | 1 | ✅  |
| 156 | `/sinav-hazirlik-egitimleri/toefl-kursu.html` | `/sinav-hazirlik-egitimleri/toefl-kursu` | 301 | `/sinav-hazirlik-egitimleri/toefl-kursu` → 200 | 1 | ✅  |
| 157 | `/sinav-hazirlik-egitimleri/toeic-kursu.html?view=article&id=128:toeic-nedir&catid=33` | `/sinav-hazirlik-egitimleri` | 301 | `/sinav-hazirlik-egitimleri?view=article&id=128%3Atoeic-nedir&catid=33` → 200 | 1 | ✅  |
| 158 | `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi/besiktas-subesi-aile-birlesimi-kurs-tarihi.html` | `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi/besiktas-subesi-aile-birlesimi-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi/besiktas-subesi-aile-birlesimi-kurs-tarihi` → 200 | 1 | ✅  |
| 159 | `/ogrenci-yorumlari/449-ece-kezlev.html` | `/ogrenci-yorumlari#yorum-449` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 160 | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu/ingilizce-konusma-ozel-ders.html` | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu/ingilizce-konusma-ozel-ders` | 301 | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu/ingilizce-konusma-ozel-ders` → 200 | 1 | ✅  |
| 161 | `/yabanci-dil-egitimleri/fransizca-kursu/bagdat-caddesi-subesi-fransizca-kurs-tarihi.html` | `/yabanci-dil-egitimleri/fransizca-kursu/bagdat-caddesi-subesi-fransizca-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/fransizca-kursu/bagdat-caddesi-subesi-fransizca-kurs-tarihi` → 200 | 1 | ✅  |
| 162 | `/yabanci-dil-egitimleri/italyanca-kursu/kadikoy-subesi-italyanca-kurs-tarihi.html` | `/yabanci-dil-egitimleri/italyanca-kursu/kadikoy-subesi-italyanca-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/italyanca-kursu/kadikoy-subesi-italyanca-kurs-tarihi` → 200 | 1 | ✅  |
| 163 | `/sinav-hazirlik-egitimleri/proficiency-kursu/kadirhas-universitesi-hazirlik.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/kadirhas-universitesi-hazirlik` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/kadirhas-universitesi-hazirlik` → 200 | 1 | ✅  |
| 164 | `/yabanci-dil-egitimleri/cince-kursu/kadikoy-subesi-cince-kurs-tarihi.html` | `/yabanci-dil-egitimleri/cince-kursu/kadikoy-subesi-cince-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/cince-kursu/kadikoy-subesi-cince-kurs-tarihi` → 200 | 1 | ✅  |
| 165 | `/yabanci-dil-egitimleri/italyanca-kursu/bagdat-caddesi-subesi-italyanca-kurs-tarihi.html` | `/yabanci-dil-egitimleri/italyanca-kursu/bagdat-caddesi-subesi-italyanca-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/italyanca-kursu/bagdat-caddesi-subesi-italyanca-kurs-tarihi` → 200 | 1 | ✅  |
| 166 | `/ogrenci-yorumlari.html?start=40` | `/ogrenci-yorumlari` | 301 | `/ogrenci-yorumlari?start=40` → 200 | 1 | ✅  |
| 167 | `/yabanci-dil-egitimleri/italyanca-kursu/italyanca-kursu-2.html` | `/yabanci-dil-egitimleri/italyanca-kursu` | 301 | `/yabanci-dil-egitimleri/italyanca-kursu` → 200 | 1 | ✅  |
| 168 | `/ingilizce-kurslari/universite-ingilizce-kursu.html` | `/ingilizce-kurslari/universite-ingilizce-kursu` | 301 | `/ingilizce-kurslari/universite-ingilizce-kursu` → 200 | 1 | ✅  |
| 169 | `/sinav-hazirlik-egitimleri/toefl-kursu/toefl-kursu-2.html` | `/sinav-hazirlik-egitimleri/toefl-kursu` | 301 | `/sinav-hazirlik-egitimleri/toefl-kursu` → 200 | 1 | ✅  |
| 170 | `/yabanci-dil-egitimleri/rusca-kursu/kadikoy-subesi-rusca-kurs-tarihi.html` | `/yabanci-dil-egitimleri/rusca-kursu/kadikoy-subesi-rusca-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/rusca-kursu/kadikoy-subesi-rusca-kurs-tarihi` → 200 | 1 | ✅  |
| 171 | `/yabanci-dil-egitimleri/almanca-kursu/almanca-ozel-ders.html` | `/yabanci-dil-egitimleri/almanca-kursu/almanca-ozel-ders` | 301 | `/yabanci-dil-egitimleri/almanca-kursu/almanca-ozel-ders` → 200 | 1 | ✅  |
| 172 | `/star-media.html` | `—` | 301 | `/star-media` → 404 | 1 | ✅ kaldırıldı — bilinçli 404: başka firmanın web tasarım reklamı (kullanıcı kararı 2026-10-02) |
| 173 | `/yabanci-dil-egitimleri/ingilizce-kursu/ingilizce-egitim-sistemi.html` | `/yabanci-dil-egitimleri/ingilizce-kursu/ingilizce-egitim-sistemi` | 301 | `/yabanci-dil-egitimleri/ingilizce-kursu/ingilizce-egitim-sistemi` → 200 | 1 | ✅  |
| 174 | `/ogrenci-yorumlari/407-sat-kursu-ogrenci-yorumlari-salih.html` | `/ogrenci-yorumlari#yorum-407` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 175 | `/sinav-hazirlik-egitimleri/gmat-kursu.html?view=article&id=320:bagdat-caddesi-kurs-tarihi&catid=39` | `/sinav-hazirlik-egitimleri/gmat-kursu/bagdat-caddesi-gmat-subesi-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/gmat-kursu/bagdat-caddesi-gmat-subesi-kurs-tarihi?view=article&id=320%3Abagdat-caddesi-kurs-tarihi&catid=39` → 200 | 1 | ✅  |
| 176 | `/sinav-hazirlik-egitimleri/testdaf-kursu.html` | `/sinav-hazirlik-egitimleri/testdaf-kursu` | 301 | `/sinav-hazirlik-egitimleri/testdaf-kursu` → 200 | 1 | ✅  |
| 177 | `/yabanci-dil-egitimleri/italyanca-kursu/besiktas-subesi-italyanca-kurs-tarihi.html` | `/yabanci-dil-egitimleri/italyanca-kursu/besiktas-subesi-italyanca-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/italyanca-kursu/besiktas-subesi-italyanca-kurs-tarihi` → 200 | 1 | ✅  |
| 178 | `/sinav-hazirlik-egitimleri/gmat-kursu.html?view=article&id=319:kadikoy-merkez-kurs-tarihi&catid=39` | `/sinav-hazirlik-egitimleri/gmat-kursu/kadikoy-subesi-gmat-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/gmat-kursu/kadikoy-subesi-gmat-kurs-tarihi?view=article&id=319%3Akadikoy-merkez-kurs-tarihi&catid=39` → 200 | 1 | ✅  |
| 179 | `/sinav-hazirlik-egitimleri/proficiency-kursu.html?view=article&id=305:levent-kurs-tarihi-4&catid=35` | `/sinav-hazirlik-egitimleri/proficiency-kursu/besiktas-subesi-proficiency-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/besiktas-subesi-proficiency-kurs-tarihi?view=article&id=305%3Alevent-kurs-tarihi-4&catid=35` → 200 | 1 | ✅  |
| 180 | `/ogrenci-yorumlari/397-gorkem-yaldiz.html` | `/ogrenci-yorumlari#yorum-397` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 181 | `/sinav-hazirlik-egitimleri/gmat-kursu/gmat-nedir.html` | `/sinav-hazirlik-egitimleri/gmat-kursu/gmat-nedir` | 301 | `/sinav-hazirlik-egitimleri/gmat-kursu/gmat-nedir` → 200 | 1 | ✅  |
| 182 | `/yabanci-dil-egitimleri/fransizca-kursu/atasehir-subesi-fransizca-kurs-tarihi.html` | `/yabanci-dil-egitimleri/fransizca-kursu/atasehir-subesi-fransizca-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/fransizca-kursu/atasehir-subesi-fransizca-kurs-tarihi` → 200 | 1 | ✅  |
| 183 | `/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-sinavi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu#universiteler` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu` → 200 | 1 | ✅  |
| 184 | `/yabanci-dil-egitimleri/ispanyolca-kursu/ispanyolca-ozel-ders.html` | `/yabanci-dil-egitimleri/ispanyolca-kursu/ispanyolca-ozel-ders` | 301 | `/yabanci-dil-egitimleri/ispanyolca-kursu/ispanyolca-ozel-ders` → 200 | 1 | ✅  |
| 185 | `/ddm-iletisim/4-atasehir.html` | `/ddm-iletisim/4-atasehir` | 301 | `/ddm-iletisim/4-atasehir` → 200 | 1 | ✅  |
| 186 | `/sinav-hazirlik-egitimleri/toeic-kursu/toeic-ozel-ders.html` | `404 (gizli)` | 404 | (aynı adres) → 404 | 0 | ✅ gizli — bilinçli 404 |
| 187 | `/component/tags/tag/almanca-kursu.html` | `/yabanci-dil-egitimleri/almanca-kursu` | 301 | `/yabanci-dil-egitimleri/almanca-kursu` → 200 | 1 | ✅  |
| 188 | `/sinav-hazirlik-egitimleri/gmat-kursu.html?view=article&id=322:atasehir-kurs-tarihleri&catid=39` | `/sinav-hazirlik-egitimleri/gmat-kursu/atasehir-subesi-gmat-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/gmat-kursu/atasehir-subesi-gmat-kurs-tarihi?view=article&id=322%3Aatasehir-kurs-tarihleri&catid=39` → 200 | 1 | ✅  |
| 189 | `/ogrenci-yorumlari/400-almanca-ogrencisi-bengisu-akin.html` | `/ogrenci-yorumlari#yorum-400` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 190 | `/sinav-hazirlik-egitimleri/sat-kursu/atasehir-subesi-sat-kurs-tarihi.html` | `/sinav-hazirlik-egitimleri/sat-kursu/atasehir-subesi-sat-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/sat-kursu/atasehir-subesi-sat-kurs-tarihi` → 200 | 1 | ✅  |
| 191 | `/ogrenci-yorumlari/416-ielts-öğrenci-yorumları-taylan-odabaşı.html` | `/ogrenci-yorumlari` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 192 | `/sinav-hazirlik-egitimleri/toeic-kursu/kadikoy-subesi-toeic-kurs-tarihi.html` | `404 (gizli)` | 404 | (aynı adres) → 404 | 0 | ✅ gizli — bilinçli 404 |
| 193 | `/ogrenci-yorumlari/366-serhat-kisakurek.html` | `/ogrenci-yorumlari` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 194 | `/sinav-hazirlik-egitimleri/gmat-kursu/atasehir-subesi-gmat-kurs-tarihi.html` | `/sinav-hazirlik-egitimleri/gmat-kursu/atasehir-subesi-gmat-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/gmat-kursu/atasehir-subesi-gmat-kurs-tarihi` → 200 | 1 | ✅  |
| 195 | `/yabanci-dil-egitimleri/ispanyolca-kursu/atasehir-subesi-ispanyolca-kurs-tarihi.html` | `/yabanci-dil-egitimleri/ispanyolca-kursu/atasehir-subesi-ispanyolca-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/ispanyolca-kursu/atasehir-subesi-ispanyolca-kurs-tarihi` → 200 | 1 | ✅  |
| 196 | `/diger-program/ozel-dersler.html?view=article&id=373:rusca-ozel-ders&catid=48` | `/yabanci-dil-egitimleri/rusca-kursu/rusca-ozel-ders` | 301 | `/yabanci-dil-egitimleri/rusca-kursu/rusca-ozel-ders?view=article&id=373%3Arusca-ozel-ders&catid=48` → 200 | 1 | ✅  |
| 197 | `/yabanci-dil-egitimleri/cince-kursu/cince-kursu-2.html` | `/yabanci-dil-egitimleri/cince-kursu` | 301 | `/yabanci-dil-egitimleri/cince-kursu` → 200 | 1 | ✅  |
| 198 | `/diger-program/ozel-dersler.html?view=article&id=376:toefl-ozel-ders&catid=48` | `/sinav-hazirlik-egitimleri/toefl-kursu/toefl-ozel-ders` | 301 | `/sinav-hazirlik-egitimleri/toefl-kursu/toefl-ozel-ders?view=article&id=376%3Atoefl-ozel-ders&catid=48` → 200 | 1 | ✅  |
| 199 | `/sinav-hazirlik-egitimleri/toeic-kursu.html` | `404 (gizli)` | 404 | (aynı adres) → 404 | 0 | ✅ gizli — bilinçli 404 |
| 200 | `/diger-program/online-dil-egitimi.html` | `/diger-program/online-dil-egitimi` | 301 | `/diger-program/online-dil-egitimi` → 200 | 1 | ✅  |
| 201 | `/sinav-hazirlik-egitimleri/toeic-kursu.html?view=article&id=298:atasehir-kurs-tarihleri&catid=33` | `/sinav-hazirlik-egitimleri` | 301 | `/sinav-hazirlik-egitimleri?view=article&id=298%3Aatasehir-kurs-tarihleri&catid=33` → 200 | 1 | ✅  |
| 202 | `/yabanci-dil-egitimleri/ispanyolca-kursu/online-ispanyolca-egitimi.html` | `/yabanci-dil-egitimleri/ispanyolca-kursu/online-ispanyolca-egitimi` | 301 | `/yabanci-dil-egitimleri/ispanyolca-kursu/online-ispanyolca-egitimi` → 200 | 1 | ✅  |
| 203 | `/sinav-hazirlik-egitimleri/toeic-kursu.html?view=article&id=297:levent-kurs-tarihi-4&catid=33` | `/sinav-hazirlik-egitimleri` | 301 | `/sinav-hazirlik-egitimleri?view=article&id=297%3Alevent-kurs-tarihi-4&catid=33` → 200 | 1 | ✅  |
| 204 | `/yabanci-dil-egitimleri/almanca-kursu/besiktas-subesi-almanca-kurs-tarihi.html` | `/yabanci-dil-egitimleri/almanca-kursu/besiktas-subesi-almanca-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/almanca-kursu/besiktas-subesi-almanca-kurs-tarihi` → 200 | 1 | ✅  |
| 205 | `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi/bagdat-caddesi-subesi-aile-birlesimi-kurs-tarihi.html` | `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi/bagdat-caddesi-subesi-aile-birlesimi-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi/bagdat-caddesi-subesi-aile-birlesimi-kurs-tarihi` → 200 | 1 | ✅  |
| 206 | `/ogrenci-yorumlari/365-pelin-tanriverdi.html` | `/ogrenci-yorumlari` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 207 | `/yabanci-dil-egitimleri/almanca-kursu/almanca-konusma-kurslari.html` | `/yabanci-dil-egitimleri/almanca-kursu/almanca-konusma-kurslari` | 301 | `/yabanci-dil-egitimleri/almanca-kursu/almanca-konusma-kurslari` → 200 | 1 | ✅  |
| 208 | `/sinav-hazirlik-egitimleri/proficiency-kursu/dogus-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/dogus-universitesi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/dogus-universitesi` → 200 | 1 | ✅  |
| 209 | `/duyurular/22-pearson-pte-kursu.html` | `/sinav-hazirlik-egitimleri/academic-pte` | 301 | `/sinav-hazirlik-egitimleri/academic-pte` → 200 | 1 | ✅  |
| 210 | `/sinav-hazirlik-egitimleri/academic-pte/pte-akademik-ozel-ders.html` | `/sinav-hazirlik-egitimleri/academic-pte/pte-akademik-ozel-ders` | 301 | `/sinav-hazirlik-egitimleri/academic-pte/pte-akademik-ozel-ders` → 200 | 1 | ✅  |
| 211 | `/ingilizce-kurslari/ingilizce-konusma-kursu.html` | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu` | 301 | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu` → 200 | 1 | ✅  |
| 212 | `/kadikoy-tanitim-sayfasi.html` | `/kadikoy-tanitim-sayfasi` | 301 | `/kadikoy-tanitim-sayfasi` → 200 | 1 | ✅  |
| 213 | `/yabanci-dil-egitimleri/rusca-kursu.html` | `/yabanci-dil-egitimleri/rusca-kursu` | 301 | `/yabanci-dil-egitimleri/rusca-kursu` → 200 | 1 | ✅  |
| 214 | `/sinav-hazirlik-egitimleri/proficiency-kursu/bagdat-caddesi-proficiency-subesi-kurs-tarihi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/bagdat-caddesi-proficiency-subesi-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/bagdat-caddesi-proficiency-subesi-kurs-tarihi` → 200 | 1 | ✅  |
| 215 | `/sinav-hazirlik-egitimleri/gmat-kursu/besiktas-subesi-gmat-kurs-tarihi.html` | `/sinav-hazirlik-egitimleri/gmat-kursu/besiktas-subesi-gmat-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/gmat-kursu/besiktas-subesi-gmat-kurs-tarihi` → 200 | 1 | ✅  |
| 216 | `/ogrenci-yorumlari/19-onur-saygin-ogrenci-yorum.html` | `/ogrenci-yorumlari#yorum-19` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 217 | `/ingilizce-kurslari/ilkogretim-ingilizce-kursu.html` | `/ingilizce-kurslari/ilkogretim-ingilizce-kursu` | 301 | `/ingilizce-kurslari/ilkogretim-ingilizce-kursu` → 200 | 1 | ✅  |
| 218 | `/ingilizce-kurslari/upper-intermediate-ingilizce-kursu.html` | `/ingilizce-kurslari/upper-intermediate-ingilizce-kursu` | 301 | `/ingilizce-kurslari/upper-intermediate-ingilizce-kursu` → 200 | 1 | ✅  |
| 219 | `/sinav-hazirlik-egitimleri/ielts-kursu.html` | `/sinav-hazirlik-egitimleri/ielts-kursu` | 301 | `/sinav-hazirlik-egitimleri/ielts-kursu` → 200 | 1 | ✅  |
| 220 | `/sinav-hazirlik-egitimleri/gre-kursu/gre-ozel-ders.html` | `/sinav-hazirlik-egitimleri/gre-kursu/gre-ozel-ders` | 301 | `/sinav-hazirlik-egitimleri/gre-kursu/gre-ozel-ders` → 200 | 1 | ✅  |
| 221 | `/yabanci-dil-egitimleri/almanca-kursu/almanca-konusma-kurslari.html?view=article&id=67:almanca-egitim-seviyeleri&catid=18` | `/yabanci-dil-egitimleri/almanca-kursu/almanca-egitim-seviyeleri` | 301 | `/yabanci-dil-egitimleri/almanca-kursu/almanca-egitim-seviyeleri?view=article&id=67%3Aalmanca-egitim-seviyeleri&catid=18` → 200 | 1 | ✅  |
| 222 | `/sinav-hazirlik-egitimleri/gmat-kursu.html?view=article&id=383:gmat-ozel-ders&catid=48` | `/sinav-hazirlik-egitimleri/gmat-kursu/gmat-ozel-ders` | 301 | `/sinav-hazirlik-egitimleri/gmat-kursu/gmat-ozel-ders?view=article&id=383%3Agmat-ozel-ders&catid=48` → 200 | 1 | ✅  |
| 223 | `/sinav-hazirlik-egitimleri/toeic-kursu.html?view=article&id=296:bagdat-caddesi-kurs-tarihi&catid=33` | `/sinav-hazirlik-egitimleri` | 301 | `/sinav-hazirlik-egitimleri?view=article&id=296%3Abagdat-caddesi-kurs-tarihi&catid=33` → 200 | 1 | ✅  |
| 224 | `/sinav-hazirlik-egitimleri/sat-kursu.html` | `/sinav-hazirlik-egitimleri/sat-kursu` | 301 | `/sinav-hazirlik-egitimleri/sat-kursu` → 200 | 1 | ✅  |
| 225 | `/diger-program/ozel-dersler.html?view=article&id=375:turkce-ozel-ders&catid=48` | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/turkce-ozel-ders` | 301 | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/turkce-ozel-ders?view=article&id=375%3Aturkce-ozel-ders&catid=48` → 200 | 1 | ✅  |
| 226 | `/yabanci-dil-egitimleri/cince-kursu/cince-ogrenmek-zor-mu.html` | `/yabanci-dil-egitimleri/cince-kursu/cince-ogrenmek-zor-mu` | 301 | `/yabanci-dil-egitimleri/cince-kursu/cince-ogrenmek-zor-mu` → 200 | 1 | ✅  |
| 227 | `/yabanci-dil-egitimleri/cince-kursu/bagdat-caddesi-subesi-cince-kurs-tarihi.html` | `/yabanci-dil-egitimleri/cince-kursu/bagdat-caddesi-subesi-cince-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/cince-kursu/bagdat-caddesi-subesi-cince-kurs-tarihi` → 200 | 1 | ✅  |
| 228 | `/sinav-hazirlik-egitimleri/proficiency-kursu/maltepe-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/maltepe-universitesi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/maltepe-universitesi` → 200 | 1 | ✅  |
| 229 | `/acibadem-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/acibadem-universitesi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/acibadem-universitesi` → 200 | 1 | ✅  |
| 230 | `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi/kadikoy-subesi-aile-birlesimi-kurs-tarihi.html` | `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi/kadikoy-subesi-aile-birlesimi-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi/kadikoy-subesi-aile-birlesimi-kurs-tarihi` → 200 | 1 | ✅  |
| 231 | `/yabanci-dil-egitimleri/fransizca-kursu/online-fransizca-egitimi.html` | `/yabanci-dil-egitimleri/fransizca-kursu/online-fransizca-egitimi` | 301 | `/yabanci-dil-egitimleri/fransizca-kursu/online-fransizca-egitimi` → 200 | 1 | ✅  |
| 232 | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/yabancila-icin-turkce-kurs-2.html` | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs` | 301 | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs` → 200 | 1 | ✅  |
| 233 | `/sinav-hazirlik-egitimleri/ielts-kursu/ielts-ozel-ders.html` | `/sinav-hazirlik-egitimleri/ielts-kursu/ielts-ozel-ders` | 301 | `/sinav-hazirlik-egitimleri/ielts-kursu/ielts-ozel-ders` → 200 | 1 | ✅  |
| 234 | `/atasehir-tanitim-sayfasi.html` | `/atasehir-tanitim-sayfasi` | 301 | `/atasehir-tanitim-sayfasi` → 200 | 1 | ✅  |
| 235 | `/yabanci-dil-egitimleri/ispanyolca-kursu/bagdat-caddesi-subesi-ispanyolca-kurs-tarihi.html` | `/yabanci-dil-egitimleri/ispanyolca-kursu/bagdat-caddesi-subesi-ispanyolca-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/ispanyolca-kursu/bagdat-caddesi-subesi-ispanyolca-kurs-tarihi` → 200 | 1 | ✅  |
| 236 | `/sinav-hazirlik-egitimleri/proficiency-kursu/suleymansah-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu#universiteler` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu` → 200 | 1 | ✅  |
| 237 | `/sinav-hazirlik-egitimleri/sat-kursu/besiktas-subesi-sat-kurs-tarihi.html` | `/sinav-hazirlik-egitimleri/sat-kursu/besiktas-subesi-sat-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/sat-kursu/besiktas-subesi-sat-kurs-tarihi` → 200 | 1 | ✅  |
| 238 | `/yabanci-dil-egitimleri/ingilizce-kursu/ingilizce-ozel-ders.html` | `/yabanci-dil-egitimleri/ingilizce-kursu/ingilizce-ozel-ders` | 301 | `/yabanci-dil-egitimleri/ingilizce-kursu/ingilizce-ozel-ders` → 200 | 1 | ✅  |
| 239 | `/yabanci-dil-egitimleri/ingilizce-kursu/online-ingilizce-egitimi.html` | `/yabanci-dil-egitimleri/ingilizce-kursu/online-ingilizce-egitimi` | 301 | `/yabanci-dil-egitimleri/ingilizce-kursu/online-ingilizce-egitimi` → 200 | 1 | ✅  |
| 240 | `/sinav-hazirlik-egitimleri/proficiency-kursu.html?view=article&id=136:proficiency-nedir&catid=35` | `/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-nedir` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-nedir?view=article&id=136%3Aproficiency-nedir&catid=35` → 200 | 1 | ✅  |
| 241 | `/ogrenci-yorumlari/447-alihan-yoruk.html` | `/ogrenci-yorumlari` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 242 | `/ogrenci-yorumlari/393-ogrenci-ielts.html` | `/ogrenci-yorumlari` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 243 | `/ingilizce-kurslari.html` | `/ingilizce-kurslari` | 301 | `/ingilizce-kurslari` → 200 | 1 | ✅  |
| 244 | `/sinav-hazirlik-egitimleri/sat-kursu.html?view=article&id=318:atasehir-kurs-tarihleri&catid=38` | `/sinav-hazirlik-egitimleri/sat-kursu/atasehir-subesi-sat-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/sat-kursu/atasehir-subesi-sat-kurs-tarihi?view=article&id=318%3Aatasehir-kurs-tarihleri&catid=38` → 200 | 1 | ✅  |
| 245 | `/sinav-hazirlik-egitimleri/sat-kursu.html?view=article&id=315:kadikoy-merkez-kurs-tarihi&catid=38` | `/sinav-hazirlik-egitimleri/sat-kursu/kadikoy-subesi-sat-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/sat-kursu/kadikoy-subesi-sat-kurs-tarihi?view=article&id=315%3Akadikoy-merkez-kurs-tarihi&catid=38` → 200 | 1 | ✅  |
| 246 | `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi/a1-sinav-ornegi.html` | `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi/a1-sinav-ornegi` | 301 | `/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi/a1-sinav-ornegi` → 200 | 1 | ✅  |
| 247 | `/sinav-hazirlik-egitimleri.html` | `/sinav-hazirlik-egitimleri` | 301 | `/sinav-hazirlik-egitimleri` → 200 | 1 | ✅  |
| 248 | `/sinav-hazirlik-egitimleri/proficiency-kursu.html?view=article&id=380:proficiency-ozel-ders&catid=48` | `/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-ozel-ders` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-ozel-ders?view=article&id=380%3Aproficiency-ozel-ders&catid=48` → 200 | 1 | ✅  |
| 249 | `/ogrenci-yorumlari.html?start=36` | `/ogrenci-yorumlari` | 301 | `/ogrenci-yorumlari?start=36` → 200 | 1 | ✅  |
| 250 | `/sinav-hazirlik-egitimleri/proficiency-kursu/koc-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/koc-universitesi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/koc-universitesi` → 200 | 1 | ✅  |
| 251 | `/sinav-hazirlik-egitimleri/gmat-kursu/kadikoy-subesi-gmat-kurs-tarihi.html` | `/sinav-hazirlik-egitimleri/gmat-kursu/kadikoy-subesi-gmat-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/gmat-kursu/kadikoy-subesi-gmat-kurs-tarihi` → 200 | 1 | ✅  |
| 252 | `/yabanci-dil-egitimleri/ispanyolca-kursu/kadikoy-subesi-ispanyolca-kurs-tarihi.html` | `/yabanci-dil-egitimleri/ispanyolca-kursu/kadikoy-subesi-ispanyolca-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/ispanyolca-kursu/kadikoy-subesi-ispanyolca-kurs-tarihi` → 200 | 1 | ✅  |
| 253 | `/duyurular/391-ddm-kar-tatili.html` | `/` | 301 | `/` → 200 | 1 | ✅ ana sayfa — onaylı karar (config yorumunda) |
| 254 | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/bagdat-caddesi-subesi-turkce-kurs-tarihi.html` | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/bagdat-caddesi-subesi-turkce-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/bagdat-caddesi-subesi-turkce-kurs-tarihi` → 200 | 1 | ✅  |
| 255 | `/yabanci-dil-egitimleri/almanca-kursu/atasehir-subesi-almanca-kurs-tarihi.html` | `/yabanci-dil-egitimleri/almanca-kursu/atasehir-subesi-almanca-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/almanca-kursu/atasehir-subesi-almanca-kurs-tarihi` → 200 | 1 | ✅  |
| 256 | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu/atasehir-subesi-ingilizce-konusma-kurs-tarihi.html` | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu/atasehir-subesi-ingilizce-konusma-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu/atasehir-subesi-ingilizce-konusma-kurs-tarihi` → 200 | 1 | ✅  |
| 257 | `/bogazici-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/bogazici-universitesi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/bogazici-universitesi` → 200 | 1 | ✅  |
| 258 | `/diger-program/ozel-dersler.html` | `/diger-program/ozel-dersler` | 301 | `/diger-program/ozel-dersler` → 200 | 1 | ✅  |
| 259 | `/ogrenci-yorumlari.html?start=32` | `/ogrenci-yorumlari` | 301 | `/ogrenci-yorumlari?start=32` → 200 | 1 | ✅  |
| 260 | `/sinav-hazirlik-egitimleri/toeic-kursu/toeic-nedir.html` | `404 (gizli)` | 404 | (aynı adres) → 404 | 0 | ✅ gizli — bilinçli 404 |
| 261 | `/sinav-hazirlik-egitimleri/gmat-kursu/gmat-kursu-2.html` | `/sinav-hazirlik-egitimleri/gmat-kursu` | 301 | `/sinav-hazirlik-egitimleri/gmat-kursu` → 200 | 1 | ✅  |
| 262 | `/duyurular/28-ispanyolca-kurslari.html` | `/yabanci-dil-egitimleri/ispanyolca-kursu` | 301 | `/yabanci-dil-egitimleri/ispanyolca-kursu` → 200 | 1 | ✅  |
| 263 | `/sinav-hazirlik-egitimleri/toefl-kursu/toefl-nedir.html` | `/sinav-hazirlik-egitimleri/toefl-kursu/toefl-nedir` | 301 | `/sinav-hazirlik-egitimleri/toefl-kursu/toefl-nedir` → 200 | 1 | ✅  |
| 264 | `/sinav-hazirlik-egitimleri/toefl-kursu/bagdat-caddesi-subesi-toefl-kurs-tarihi.html` | `/sinav-hazirlik-egitimleri/toefl-kursu/bagdat-caddesi-subesi-toefl-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/toefl-kursu/bagdat-caddesi-subesi-toefl-kurs-tarihi` → 200 | 1 | ✅  |
| 265 | `/sinav-hazirlik-egitimleri/gre-kursu/atasehir-subesi-kurs-tarihi.html` | `/sinav-hazirlik-egitimleri/gre-kursu/atasehir-subesi-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/gre-kursu/atasehir-subesi-kurs-tarihi` → 200 | 1 | ✅  |
| 266 | `/yabanci-dil-egitimleri/rusca-kursu/besiktas-subesi-rusca-kurs-tarihi.html` | `/yabanci-dil-egitimleri/rusca-kursu/besiktas-subesi-rusca-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/rusca-kursu/besiktas-subesi-rusca-kurs-tarihi` → 200 | 1 | ✅  |
| 267 | `/sinav-hazirlik-egitimleri/ingiltere-vize-sinavi-ingilizce-a1kursu.html` | `404 (gizli)` | 404 | (aynı adres) → 404 | 0 | ✅ gizli — bilinçli 404 |
| 268 | `/yabanci-dil-egitimleri/ingilizce-kursu/atasehir-subesi-ingilizce-kurs-tarihi.html` | `/yabanci-dil-egitimleri/ingilizce-kursu/atasehir-subesi-ingilizce-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/ingilizce-kursu/atasehir-subesi-ingilizce-kurs-tarihi` → 200 | 1 | ✅  |
| 269 | `/yabanci-dil-egitimleri/almanca-kursu/online-almanca-egitimi.html` | `/yabanci-dil-egitimleri/almanca-kursu/online-almanca-egitimi` | 301 | `/yabanci-dil-egitimleri/almanca-kursu/online-almanca-egitimi` → 200 | 1 | ✅  |
| 270 | `/diger-program/ozel-dersler.html?view=article&id=380:proficiency-ozel-ders&catid=48` | `/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-ozel-ders` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-ozel-ders?view=article&id=380%3Aproficiency-ozel-ders&catid=48` → 200 | 1 | ✅  |
| 271 | `/ogrenci-yorumlari/401-ayten-un.html` | `/ogrenci-yorumlari#yorum-401` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 272 | `/sinav-hazirlik-egitimleri/toeic-kursu.html?view=article&id=295:kadikoy-merkez-kurs-tarihi&catid=33` | `/sinav-hazirlik-egitimleri` | 301 | `/sinav-hazirlik-egitimleri?view=article&id=295%3Akadikoy-merkez-kurs-tarihi&catid=33` → 200 | 1 | ✅  |
| 273 | `/yabanci-dil-egitimleri/ingilizce-kursu/kadikoy-subesi-ingilizce-kurs-tarihi.html` | `/yabanci-dil-egitimleri/ingilizce-kursu/kadikoy-subesi-ingilizce-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/ingilizce-kursu/kadikoy-subesi-ingilizce-kurs-tarihi` → 200 | 1 | ✅  |
| 274 | `/sinav-hazirlik-egitimleri/yds-kursu/yds-nedir.html` | `/sinav-hazirlik-egitimleri/yds-kursu/yds-nedir` | 301 | `/sinav-hazirlik-egitimleri/yds-kursu/yds-nedir` → 200 | 1 | ✅  |
| 275 | `/component/content/article/339-iletisim-sayfasi-levent.html?Itemid=404&catid=46` | `/ddm-iletisim/3-levent` | 301 | `/ddm-iletisim/3-levent?Itemid=404&catid=46` → 200 | 1 | ✅  |
| 276 | `/ogrenci-yorumlari/403-ipek-yucel.html` | `/ogrenci-yorumlari#yorum-403` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 277 | `/istanbul-teknik-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/istanbul-teknik-universitesi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/istanbul-teknik-universitesi` → 200 | 1 | ✅  |
| 278 | `/sinav-hazirlik-egitimleri/yds-kursu/yds-ozel-ders.html` | `/sinav-hazirlik-egitimleri/yds-kursu/yds-ozel-ders` | 301 | `/sinav-hazirlik-egitimleri/yds-kursu/yds-ozel-ders` → 200 | 1 | ✅  |
| 279 | `/ogrenci-yorumlari.html?start=24` | `/ogrenci-yorumlari` | 301 | `/ogrenci-yorumlari?start=24` → 200 | 1 | ✅  |
| 280 | `/ogrenci-yorumlari/422-nil-bilgen-yorum.html` | `/ogrenci-yorumlari#yorum-422` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 281 | `/yurtdisi-egitim/tercih.html` | `/yurtdisi-egitim#ulkeler` | 301 | `/yurtdisi-egitim` → 200 | 1 | ✅  |
| 282 | `/sinav-hazirlik-egitimleri/cocuklar-icin-toefl-primary-egitimi.html` | `404 (gizli)` | 404 | (aynı adres) → 404 | 0 | ✅ gizli — bilinçli 404 |
| 283 | `/duyurular/30-toefl-ielts-hazirlik-kurslari.html` | `/sinav-hazirlik-egitimleri` | 301 | `/sinav-hazirlik-egitimleri` → 200 | 1 | ✅  |
| 284 | `/yurtdisi-egitim/yurtdisi-ingilizce-egitimi.html` | `/yurtdisi-egitim/yurtdisi-ingilizce-egitimi` | 301 | `/yurtdisi-egitim/yurtdisi-ingilizce-egitimi` → 200 | 1 | ✅  |
| 285 | `/yabanci-dil-egitimleri/cince-kursu.html` | `/yabanci-dil-egitimleri/cince-kursu` | 301 | `/yabanci-dil-egitimleri/cince-kursu` → 200 | 1 | ✅  |
| 286 | `/duyurular/27-rusca-kurslar.html` | `/yabanci-dil-egitimleri/rusca-kursu` | 301 | `/yabanci-dil-egitimleri/rusca-kursu` → 200 | 1 | ✅  |
| 287 | `/` | `/` | 200 | (aynı adres) → 200 | 0 | ✅  |
| 288 | `/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-nedir.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-nedir` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-nedir` → 200 | 1 | ✅  |
| 289 | `/sinav-hazirlik-egitimleri/sat-kursu.html?view=article&id=381:sat-ozel-ders&catid=48` | `/sinav-hazirlik-egitimleri/sat-kursu/sat-ozel-ders` | 301 | `/sinav-hazirlik-egitimleri/sat-kursu/sat-ozel-ders?view=article&id=381%3Asat-ozel-ders&catid=48` → 200 | 1 | ✅  |
| 290 | `/ogrenci-yorumlari/175-fatih-sumruk.html` | `/ogrenci-yorumlari` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 291 | `/sinav-hazirlik-egitimleri/proficiency-kursu/marmara-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/marmara-universitesi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/marmara-universitesi` → 200 | 1 | ✅  |
| 292 | `/sabanci-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/sabanci-universitesi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/sabanci-universitesi` → 200 | 1 | ✅  |
| 293 | `/ogrenci-yorumlari/395-gonca-celik.html` | `/ogrenci-yorumlari` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 294 | `/sinav-hazirlik-egitimleri/toeic-kursu/atasehir-subesi-toeic-kurs-tarihi.html` | `404 (gizli)` | 404 | (aynı adres) → 404 | 0 | ✅ gizli — bilinçli 404 |
| 295 | `/sinav-hazirlik-egitimleri/ielts-kursu/bagdat-caddesi-subesi-kurs-tarihi.html` | `/sinav-hazirlik-egitimleri/ielts-kursu/bagdat-caddesi-subesi-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/ielts-kursu/bagdat-caddesi-subesi-kurs-tarihi` → 200 | 1 | ✅  |
| 296 | `/bahcesehir-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/bahcesehir-universitesi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/bahcesehir-universitesi` → 200 | 1 | ✅  |
| 297 | `/sinav-hazirlik-egitimleri/yds-kursu/besiktas-subesi-kurs-tarihi.html` | `/sinav-hazirlik-egitimleri/yds-kursu/besiktas-subesi-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/yds-kursu/besiktas-subesi-kurs-tarihi` → 200 | 1 | ✅  |
| 298 | `/yabanci-dil-egitimleri/fransizca-kursu/kadikoy-subesi-fransizca-kurs-tarihi.html` | `/yabanci-dil-egitimleri/fransizca-kursu/kadikoy-subesi-fransizca-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/fransizca-kursu/kadikoy-subesi-fransizca-kurs-tarihi` → 200 | 1 | ✅  |
| 299 | `/ogrenci-yorumlari/417-ielts-hazirlik-ogrencisi-yorumu-ece-ozdemir.html` | `/ogrenci-yorumlari#yorum-417` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 300 | `/sinav-hazirlik-egitimleri/toefl-essentials-kursu.html` | `404 (gizli)` | 404 | (aynı adres) → 404 | 0 | ✅ gizli — bilinçli 404 |
| 301 | `/ogrenci-yorumlari/388-tuğçe-özdemir.html` | `/ogrenci-yorumlari#yorum-388` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 302 | `/yabanci-dil-egitimleri/almanca-kursu/kadikoy-subesi-almanca-kurs-tarihi.html` | `/yabanci-dil-egitimleri/almanca-kursu/kadikoy-subesi-almanca-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/almanca-kursu/kadikoy-subesi-almanca-kurs-tarihi` → 200 | 1 | ✅  |
| 303 | `/sinav-hazirlik-egitimleri/ielts-kursu/besiktas-subesi-kurs-tarihi.html` | `/sinav-hazirlik-egitimleri/ielts-kursu/besiktas-subesi-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/ielts-kursu/besiktas-subesi-kurs-tarihi` → 200 | 1 | ✅  |
| 304 | `/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-kursu-2.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu` → 200 | 1 | ✅  |
| 305 | `/yurtdisi-egitim/tercih/italyadauniversite.html` | `/yurtdisi-egitim/tercih/italyadauniversite` | 301 | `/yurtdisi-egitim/tercih/italyadauniversite` → 200 | 1 | ✅  |
| 306 | `/diger-program/cocuklar-icin-ingilizce-kursu.html` | `/diger-program/cocuklar-icin-ingilizce-kursu` | 301 | `/diger-program/cocuklar-icin-ingilizce-kursu` → 200 | 1 | ✅  |
| 307 | `/kocaeli-universitesi-hazirlik.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/kocaeli-universitesi-hazirlik` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/kocaeli-universitesi-hazirlik` → 200 | 1 | ✅  |
| 308 | `/yabanci-dil-egitimleri/almanca-kursu.html` | `/yabanci-dil-egitimleri/almanca-kursu` | 301 | `/yabanci-dil-egitimleri/almanca-kursu` → 200 | 1 | ✅  |
| 309 | `/sinav-hazirlik-egitimleri/toefl-kursu/besiktas-subesi-toefl-kurs-tarihi.html` | `/sinav-hazirlik-egitimleri/toefl-kursu/besiktas-subesi-toefl-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/toefl-kursu/besiktas-subesi-toefl-kurs-tarihi` → 200 | 1 | ✅  |
| 310 | `/sinav-hazirlik-egitimleri/ielts-kursu/ielts-kursu-2.html` | `/sinav-hazirlik-egitimleri/ielts-kursu` | 301 | `/sinav-hazirlik-egitimleri/ielts-kursu` → 200 | 1 | ✅  |
| 311 | `/yabanci-dil-egitimleri/ispanyolca-kursu/ispanyolca-kursu-2.html` | `/yabanci-dil-egitimleri/ispanyolca-kursu` | 301 | `/yabanci-dil-egitimleri/ispanyolca-kursu` → 200 | 1 | ✅  |
| 312 | `/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-ornek-sinav-sorulari.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-ornek-sinav-sorulari` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-ornek-sinav-sorulari` → 200 | 1 | ✅  |
| 313 | `/ogrenci-yorumlari.html?start=8` | `/ogrenci-yorumlari` | 301 | `/ogrenci-yorumlari?start=8` → 200 | 1 | ✅  |
| 314 | `/diger-program/ozel-dersler.html?view=article&id=369:almanca-ozel-ders&catid=48` | `/yabanci-dil-egitimleri/almanca-kursu/almanca-ozel-ders` | 301 | `/yabanci-dil-egitimleri/almanca-kursu/almanca-ozel-ders?view=article&id=369%3Aalmanca-ozel-ders&catid=48` → 200 | 1 | ✅  |
| 315 | `/ogrenci-yorumlari/445-ahmet-kiremitci.html` | `/ogrenci-yorumlari#yorum-445` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 316 | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu/besiktas-subesi-ingilizce-konusma-kurs-tarihi.html` | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu/besiktas-subesi-ingilizce-konusma-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu/besiktas-subesi-ingilizce-konusma-kurs-tarihi` → 200 | 1 | ✅  |
| 317 | `/ogrenci-yorumlari/394-sinem-savasan.html` | `/ogrenci-yorumlari#yorum-394` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 318 | `/ogrenci-yorumlari/399-kemal-sinan-tetikkurt.html` | `/ogrenci-yorumlari` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 319 | `/bilgi-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/bilgi-universitesi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/bilgi-universitesi` → 200 | 1 | ✅  |
| 320 | `/koc-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/koc-universitesi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/koc-universitesi` → 200 | 1 | ✅  |
| 321 | `/ogrenci-yorumlari/420-sahar-azamparsa.html` | `/ogrenci-yorumlari#yorum-420` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 322 | `/okan-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/okan-universitesi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/okan-universitesi` → 200 | 1 | ✅  |
| 323 | `/sinav-hazirlik-egitimleri/academic-pte/academic-pte-2.html` | `/sinav-hazirlik-egitimleri/academic-pte` | 301 | `/sinav-hazirlik-egitimleri/academic-pte` → 200 | 1 | ✅  |
| 324 | `/sinav-hazirlik-egitimleri/gmat-kursu.html` | `/sinav-hazirlik-egitimleri/gmat-kursu` | 301 | `/sinav-hazirlik-egitimleri/gmat-kursu` → 200 | 1 | ✅  |
| 325 | `/sinav-hazirlik-egitimleri/proficiency-kursu/kadikoy-subesi-proficiency-kurs-tarihi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/kadikoy-subesi-proficiency-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/kadikoy-subesi-proficiency-kurs-tarihi` → 200 | 1 | ✅  |
| 326 | `/diger-program/ozel-dersler.html?view=article&id=370:fransizca-ozel-ders&catid=48` | `/yabanci-dil-egitimleri/fransizca-kursu/fransizca-ozel-ders` | 301 | `/yabanci-dil-egitimleri/fransizca-kursu/fransizca-ozel-ders?view=article&id=370%3Afransizca-ozel-ders&catid=48` → 200 | 1 | ✅  |
| 327 | `/ogrenci-yorumlari/408-sabanci-elae-sinavi-hazirlik-kursu-ogrenci-yorumlari.html` | `/ogrenci-yorumlari#yorum-408` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 328 | `/diger-program/ozel-dersler.html?view=article&id=383:gmat-ozel-ders&catid=48` | `/sinav-hazirlik-egitimleri/gmat-kursu/gmat-ozel-ders` | 301 | `/sinav-hazirlik-egitimleri/gmat-kursu/gmat-ozel-ders?view=article&id=383%3Agmat-ozel-ders&catid=48` → 200 | 1 | ✅  |
| 329 | `/yabanci-dil-egitimleri/fransizca-kursu.html` | `/yabanci-dil-egitimleri/fransizca-kursu` | 301 | `/yabanci-dil-egitimleri/fransizca-kursu` → 200 | 1 | ✅  |
| 330 | `/ogrenci-yorumlari/17-cagla-yilmaz-ogrenci-yorumu.html` | `/ogrenci-yorumlari#yorum-17` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 331 | `/sinav-hazirlik-egitimleri/toefl-kursu/toefl-ozel-ders.html` | `/sinav-hazirlik-egitimleri/toefl-kursu/toefl-ozel-ders` | 301 | `/sinav-hazirlik-egitimleri/toefl-kursu/toefl-ozel-ders` → 200 | 1 | ✅  |
| 332 | `/beykent-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/beykent-universitesi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/beykent-universitesi` → 200 | 1 | ✅  |
| 333 | `/yeditepe-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/yeditepe-universitesi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/yeditepe-universitesi` → 200 | 1 | ✅  |
| 334 | `/sinav-hazirlik-egitimleri/proficiency-kursu/besiktas-subesi-proficiency-kurs-tarihi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/besiktas-subesi-proficiency-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/besiktas-subesi-proficiency-kurs-tarihi` → 200 | 1 | ✅  |
| 335 | `/sinav-hazirlik-egitimleri/proficiency-kursu/ozyegin-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/ozyegin-universitesi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/ozyegin-universitesi` → 200 | 1 | ✅  |
| 336 | `/yabanci-dil-egitimleri/almanca-kursu/bagdat-caddesi-subesi-almanca-kurs-tarihi.html` | `/yabanci-dil-egitimleri/almanca-kursu/bagdat-caddesi-subesi-almanca-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/almanca-kursu/bagdat-caddesi-subesi-almanca-kurs-tarihi` → 200 | 1 | ✅  |
| 337 | `/sinav-hazirlik-egitimleri/ielts-kursu/atasehir-subesi-kurs-tarihi.html` | `/sinav-hazirlik-egitimleri/ielts-kursu/atasehir-subesi-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/ielts-kursu/atasehir-subesi-kurs-tarihi` → 200 | 1 | ✅  |
| 338 | `/ogrenci-yorumlari/405-selin-golek.html` | `/ogrenci-yorumlari` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 339 | `/yurtdisi-egitim/sinav-hazirlik.html` | `/yurtdisi-egitim/sinav-hazirlik` | 301 | `/yurtdisi-egitim/sinav-hazirlik` → 200 | 1 | ✅  |
| 340 | `/component/tags/tag/toeic-kursu.html` | `/sinav-hazirlik-egitimleri` | 301 | `/sinav-hazirlik-egitimleri` → 200 | 1 | ✅  |
| 341 | `/sinav-hazirlik-egitimleri/yds-kursu/yds-ozel-ders-2.html` | `/sinav-hazirlik-egitimleri/yds-kursu` | 301 | `/sinav-hazirlik-egitimleri/yds-kursu` → 200 | 1 | ✅  |
| 342 | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/turkce-egitim-seviyeleri.html` | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/turkce-egitim-seviyeleri` | 301 | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/turkce-egitim-seviyeleri` → 200 | 1 | ✅  |
| 343 | `/diger-program/ozel-dersler.html?view=article&id=372:italyanca-ozel-ders&catid=48` | `/yabanci-dil-egitimleri/italyanca-kursu/italyanca-ozel-ders` | 301 | `/yabanci-dil-egitimleri/italyanca-kursu/italyanca-ozel-ders?view=article&id=372%3Aitalyanca-ozel-ders&catid=48` → 200 | 1 | ✅  |
| 344 | `/sinav-hazirlik-egitimleri/sat-kursu/kadikoy-subesi-sat-kurs-tarihi.html` | `/sinav-hazirlik-egitimleri/sat-kursu/kadikoy-subesi-sat-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/sat-kursu/kadikoy-subesi-sat-kurs-tarihi` → 200 | 1 | ✅  |
| 345 | `/sinav-hazirlik-egitimleri/gre-kursu/bagdat-caddesi-subesi-kurs-tarihi.html` | `/sinav-hazirlik-egitimleri/gre-kursu/bagdat-caddesi-subesi-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/gre-kursu/bagdat-caddesi-subesi-kurs-tarihi` → 200 | 1 | ✅  |
| 346 | `/diger-program/ozel-dersler.html?view=article&id=378:toeic-ozel-ders&catid=48` | `/sinav-hazirlik-egitimleri` | 301 | `/sinav-hazirlik-egitimleri?view=article&id=378%3Atoeic-ozel-ders&catid=48` → 200 | 1 | ✅  |
| 347 | `/yabanci-dil-egitimleri/ingilizce-kursu/ingilizce-kursu-2.html` | `/yabanci-dil-egitimleri/ingilizce-kursu` | 301 | `/yabanci-dil-egitimleri/ingilizce-kursu` → 200 | 1 | ✅  |
| 348 | `/ogrenci-yorumlari.html?start=16` | `/ogrenci-yorumlari` | 301 | `/ogrenci-yorumlari?start=16` → 200 | 1 | ✅  |
| 349 | `/duyurular/24-yds-kurslari.html` | `/sinav-hazirlik-egitimleri/yds-kursu` | 301 | `/sinav-hazirlik-egitimleri/yds-kursu` → 200 | 1 | ✅  |
| 350 | `/sinav-hazirlik-egitimleri/proficiency-kursu/atasehir-subesi-proficiency-kurs-tarihi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/atasehir-subesi-proficiency-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/atasehir-subesi-proficiency-kurs-tarihi` → 200 | 1 | ✅  |
| 351 | `/sinav-hazirlik-egitimleri/sat-kursu/sat-ozel-ders.html` | `/sinav-hazirlik-egitimleri/sat-kursu/sat-ozel-ders` | 301 | `/sinav-hazirlik-egitimleri/sat-kursu/sat-ozel-ders` → 200 | 1 | ✅  |
| 352 | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu/kadikoy-subesi-ingilizce-konusma-kurs-tarihi.html` | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu/kadikoy-subesi-ingilizce-konusma-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/ingilizce-konusma-kursu/kadikoy-subesi-ingilizce-konusma-kurs-tarihi` → 200 | 1 | ✅  |
| 353 | `/ogrenci-yorumlari/398-batuhan-yildiz.html` | `/ogrenci-yorumlari` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 354 | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/online-turkce-egitimi.html` | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/online-turkce-egitimi` | 301 | `/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/online-turkce-egitimi` → 200 | 1 | ✅  |
| 355 | `/isik-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/isik-universitesi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/isik-universitesi` → 200 | 1 | ✅  |
| 356 | `/ogrenci-yorumlari/410-testdaf-kursu-ogrenci-yorumları.html` | `/ogrenci-yorumlari#yorum-410` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 357 | `/sinav-hazirlik-egitimleri/toeic-kursu.html?view=article&id=378:toeic-ozel-ders&catid=48` | `/sinav-hazirlik-egitimleri` | 301 | `/sinav-hazirlik-egitimleri?view=article&id=378%3Atoeic-ozel-ders&catid=48` → 200 | 1 | ✅  |
| 358 | `/duyurular/25-proficiency-kurslari.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu` → 200 | 1 | ✅  |
| 359 | `/sinav-hazirlik-egitimleri/fransizca-aile-birlesimi-kursu.html` | `404 (gizli)` | 404 | (aynı adres) → 404 | 0 | ✅ gizli — bilinçli 404 |
| 360 | `/yurtdisi-egitim/work-and-travel.html` | `/yurtdisi-egitim/work-and-travel` | 301 | `/yurtdisi-egitim/work-and-travel` → 200 | 1 | ✅  |
| 361 | `/yabanci-dil-egitimleri/almanca-kursu/hizlandirilmis-almanca-kursu.html?view=article&id=67:almanca-egitim-seviyeleri&catid=18` | `/yabanci-dil-egitimleri/almanca-kursu/almanca-egitim-seviyeleri` | 301 | `/yabanci-dil-egitimleri/almanca-kursu/almanca-egitim-seviyeleri?view=article&id=67%3Aalmanca-egitim-seviyeleri&catid=18` → 200 | 1 | ✅  |
| 362 | `/yabanci-dil-egitimleri/almanca-kursu/hizlandirilmis-almanca-kursu.html` | `/yabanci-dil-egitimleri/almanca-kursu/hizlandirilmis-almanca-kursu` | 301 | `/yabanci-dil-egitimleri/almanca-kursu/hizlandirilmis-almanca-kursu` → 200 | 1 | ✅  |
| 363 | `/yabanci-dil-egitimleri/italyanca-kursu/atasehir-subesi-italyanca-kurs-tarihi.html` | `/yabanci-dil-egitimleri/italyanca-kursu/atasehir-subesi-italyanca-kurs-tarihi` | 301 | `/yabanci-dil-egitimleri/italyanca-kursu/atasehir-subesi-italyanca-kurs-tarihi` → 200 | 1 | ✅  |
| 364 | `/ogrenci-yorumlari.html?start=28` | `/ogrenci-yorumlari` | 301 | `/ogrenci-yorumlari?start=28` → 200 | 1 | ✅  |
| 365 | `/sinav-hazirlik-egitimleri/gre-kursu/kadikoy-subesi-kurs-tarihi.html` | `/sinav-hazirlik-egitimleri/gre-kursu/kadikoy-subesi-kurs-tarihi` | 301 | `/sinav-hazirlik-egitimleri/gre-kursu/kadikoy-subesi-kurs-tarihi` → 200 | 1 | ✅  |
| 366 | `/duyurular/29-ingilizce-kurslari.html` | `/yabanci-dil-egitimleri/ingilizce-kursu` | 301 | `/yabanci-dil-egitimleri/ingilizce-kursu` → 200 | 1 | ✅  |
| 367 | `/sinav-hazirlik-egitimleri/proficiency-kursu/bogazici-universitesi.html` | `/sinav-hazirlik-egitimleri/proficiency-kursu/bogazici-universitesi` | 301 | `/sinav-hazirlik-egitimleri/proficiency-kursu/bogazici-universitesi` → 200 | 1 | ✅  |
| 368 | `/ingilizce-kurslari/yaz-okulu-ingilizce-kursu.html` | `/ingilizce-kurslari/yaz-okulu-ingilizce-kursu` | 301 | `/ingilizce-kurslari/yaz-okulu-ingilizce-kursu` → 200 | 1 | ✅  |
| 369 | `/tanitim-icerik/10-sistem.html` | `/yabanci-dil-egitimleri/ingilizce-kursu/ingilizce-egitim-sistemi` | 301 | `/yabanci-dil-egitimleri/ingilizce-kursu/ingilizce-egitim-sistemi` → 200 | 1 | ✅  |
| 370 | `/tanitim-icerik/plan-10.html` | `/yabanci-dil` | 301 | `/yabanci-dil` → 200 | 1 | ✅  |
| 371 | `/tanitim-icerik/10-ozel.html` | `/diger-program/ozel-dersler` | 301 | `/diger-program/ozel-dersler` → 200 | 1 | ✅  |
| 372 | `/tanitim-icerik/8-dilde.html` | `/yabanci-dil` | 301 | `/yabanci-dil` → 200 | 1 | ✅  |
| 373 | `/tanitim-icerik/10-hazirlik.html` | `/sinav-hazirlik-egitimleri` | 301 | `/sinav-hazirlik-egitimleri` → 200 | 1 | ✅  |
| 374 | `/tanitim-icerik/10-ogrenme.html` | `/yabanci-dil` | 301 | `/yabanci-dil` → 200 | 1 | ✅  |
| 375 | `/yabanci-dil.html` | `/yabanci-dil` | 301 | `/yabanci-dil` → 200 | 1 | ✅  |
| 376 | `/ogrenci-yorumlari/410-testdaf-kursu-ogrenci-yorumları.html` | `/ogrenci-yorumlari#yorum-410` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 377 | `/ogrenci-yorumlari/416-ielts-öğrenci-yorumları-taylan-odabaşı.html` | `/ogrenci-yorumlari` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 378 | `/ogrenci-yorumlari/415-bilgi-ueniversitesi-bilet-hazirlik-atlama-sinavi-oegrenci-yorumu-dora.html` | `/ogrenci-yorumlari#yorum-415` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 379 | `/ogrenci-yorumlari/414-pte-akademik-sınavı-kursu-öğrencisi-yorumuu.html` | `/ogrenci-yorumlari` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 380 | `/ogrenci-yorumlari/411-irem-uludirik-marmara-üniversitesi-hazırlık-atlama-sınavı-öğrenci-yorumu.html` | `/ogrenci-yorumlari#yorum-411` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 381 | `/component/content/article/65-levent-subesi-on-kayıt-formu.html?Itemid=241&catid=26` | `/ddm-iletisim/3-levent` | 301 | `/ddm-iletisim/3-levent?Itemid=241&catid=26` → 200 | 1 | ✅  |
| 382 | `/ogrenci-yorumlari/367-ünal-uğur-çeçener.html` | `/ogrenci-yorumlari` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 383 | `/ogrenci-yorumlari/388-tuğçe-özdemir.html` | `/ogrenci-yorumlari#yorum-388` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |
| 384 | `/ogrenci-yorumlari/387-uğur-onar.html` | `/ogrenci-yorumlari#yorum-387` | 301 | `/ogrenci-yorumlari` → 200 | 1 | ✅  |

