/**
 * P2 — Sınav Hazırlık Kursu Ana sayfaları eşleme tablosu.
 *
 * `data/languages.ts` / `data/universities.ts` deseni: gövde metni burada
 * taşınmaz, yalnız başlık referansları + blok türü. İstisna (P2 kullanıcı
 * kararı, 2026-09-22): SEO geliştirmeleri `edits` (orijinal satır → yeni) ve
 * `additions` (eklenen paragraf) olarak BURADA, izlenebilir biçimde durur.
 * Sayısal/güncel olgular yazılmadan önce resmi kaynaktan doğrulanır; kaynak
 * her girdinin yanındaki yorumda.
 *
 * `proficiency-kursu` statik klasörde yaşar (`app/.../proficiency-kursu/page.tsx`),
 * diğerleri `app/sinav-hazirlik-egitimleri/[kurs]/page.tsx` üzerinden üretilir.
 */

import { EXPERIENCE } from "@/data/company";
import type { ExamDef } from "@/lib/examContent";

/** P4'te yayınlanan alt sayfalar (Nedir / Özel Ders / Örnek Sorular) — `extraHrefs` hedefleri. */
const SH = "/sinav-hazirlik-egitimleri";

/* ---------------------------------------------------------------
 * TOEFL (pilot)
 * ------------------------------------------------------------- */

const TOEFL: ExamDef = {
  slug: "toefl-kursu",
  name: "TOEFL",
  label: "TOEFL Kursu",
  code: "TOEFL iBT",
  illustration: "kampus",
  // Kaynakta h1 yok → H1 ilk başlığa düşer (examContent loglar).
  hero: { heading: "TOEFL Kursu İstanbul | TOEFL IBT Hazırlık Eğitimi" },
  blocks: [
    { kind: "prose", heading: "TOEFL özel ders ve grup dersleri", kicker: "EĞİTİM PROGRAMI" },
    {
      kind: "facts",
      heading: "TOEFL IBT sınavı hakkında bilgi ve test içeriği",
      kicker: "SINAV HAKKINDA",
      icon: "belge",
      // Satır sırası: amaç · geçerlilik · kullanım alanı.
      icons: ["kupa", "takvim", "mezuniyet"],
    },
    {
      kind: "structure",
      heading: "TOEFL IBT sınavının test bölümleri Nedir?",
      // Süre/soru sayıları: ETS "TOEFL iBT Test Content" sayfası, "Approx. Base
      // Time" ve madde sayısı (ets.org/toefl/test-takers/ibt/about/content.html,
      // 2026-09-22'de kontrol edildi). Adaptif testte süre/madde değişebilir → "~".
      cards: [
        { icon: "okuma", meta: [{ icon: "sure", text: "~30 dk" }, { icon: "soru", text: "50 soru" }] },
        { icon: "dinleme", meta: [{ icon: "sure", text: "~29 dk" }, { icon: "soru", text: "47 soru" }] },
        { icon: "konusma", meta: [{ icon: "sure", text: "~8 dk" }, { icon: "soru", text: "11 soru" }] },
        { icon: "yazma", meta: [{ icon: "sure", text: "~23 dk" }, { icon: "soru", text: "12 soru" }] },
      ],
      detailAnchor: "sss",
    },
    {
      // Kaldırılan "TOEFL Kurs Programı" sayfasından taşındı. Şube satırları
      // (zaten link listesinde) ve "8 Kişilik Özel Gruplarda" satırı alınmadı:
      // ana sayfa "en fazla 6 kişi" diyor, çelişki yaratırdı.
      kind: "merged",
      sourcePath: "toefl-kursu/toefl-kursu-2",
      kicker: "PROGRAM SEÇENEKLERİ",
      title: "TOEFL hazırlık program seçenekleri",
      lines: [
        "Bire Bir Yüz Yüze TOEFL Eğitimi",
        "Online TOEFL Grup Eğitimi",
        "Online Bire Bir TOEFL Sınav Hazırlık Eğitimi",
        "TOEFL Writing Sınıfları",
        "TOEFL Speaking Sınıfları",
        "TOEFL Reading Sınıfları",
        "TOEFL Listening Sınıfları",
        "TOEFL Sınav Stratejileri",
      ],
    },
    {
      kind: "branchLinks",
      heading: "TOEFL eğitim programı ve kurs tarihlerini inceleyin",
      extraHrefs: { "TOEFL Nedir?": `${SH}/toefl-kursu/toefl-nedir` },
    },
    {
      kind: "faq",
      title: "TOEFL IBT sınavı hakkında sık sorulanlar",
      items: [
        { heading: "TOEFL IBT kursu için hangi seviyede İngilizce gerekir?" },
        { heading: "TOEFL IBT sınavının süresi ve puanlaması nedir?" },
        { heading: "TOEFL IBT sınavının ücreti nedir?" },
        { heading: "TOEFL IBT sınavı testine Türkiye'de nerede girebilirim?" },
        { heading: "TOEFL IBT test sınavına nasıl kayıt olunur?" },
      ],
    },
  ],
  edits: {
    // ETS: "Please allow approximately two hours" — 2 saat hâlâ doğru; net bölüm
    // süresi (30+29+23+8 ≈ 90 dk) eklendi.
    "Toplam sınav süresi yaklaşık 2 saat sürer.":
      "Toplam sınav süresi, giriş işlemleriyle birlikte yaklaşık 2 saat sürer; dört bölümün net süresi yaklaşık 90 dakikadır.",
    // 21 Ocak 2026'dan itibaren 1–6 ölçeği (ETS "Understanding Your Scores").
    "TOEFL sınavının her bir bölümü 0–30 puan olup toplamda 120 puan üzerinden değerlendirilir.":
      "21 Ocak 2026'dan itibaren TOEFL iBT puanları 1–6 ölçeğinde, yarım puanlık aralıklarla verilir. Her bölüm ayrı puanlanır; genel puan dört bölümün ortalamasıdır ve Avrupa Ortak Dil Çerçevesi (CEFR) seviyeleriyle eşleşir.",
    // Tutar ETS'nin etkileşimli tablosunda; resmi olarak doğrulanamadı → tutar
    // korunur, güncellik uyarısı eklenir (kullanıcıdan güncel tutar istendi).
    "TOEFL IBT sınavının Türkiye'deki ücreti 185 dolardır.":
      "TOEFL IBT sınavının Türkiye'deki ücreti 185 dolardır. Ücret ETS tarafından ABD doları cinsinden belirlenir ve dönem dönem güncellenir; kayıt olmadan önce güncel tutarı ets.org/toefl üzerinden kontrol etmenizi öneririz.",
    // toefl.org artık ETS'ye yönleniyor; dış adres düz metin (tıklanır link değil).
    "Dünyanın pek çok ülkesinde olduğu gibi Türkiye'de de TOEFL test merkezleri bulunmaktadır. Size en yakın sınav merkezi için toefl.org adresini ziyaret edebilirsiniz.":
      "Dünyanın pek çok ülkesinde olduğu gibi Türkiye'de de TOEFL test merkezleri bulunmaktadır. Kayıt, ETS'nin resmi sitesi ets.org/toefl üzerinden oluşturacağınız hesapla yapılır; size en yakın sınav merkezini ve uygun tarihleri kayıt sırasında seçebilirsiniz.",
  },
  additions: {
    "TOEFL IBT sınavının süresi ve puanlaması nedir?": [
      // ETS: 2026–2028 geçiş döneminde sonuç belgesinde iki ölçek birlikte.
      "2028'e kadar sonuç belgelerinde eski 0–120 ölçeğindeki karşılık da gösterilir. Başvuracağınız üniversitenin ya da kurumun hangi ölçekte puan istediğini kontrol etmenizi öneririz.",
      // ETS: "As the test adapts, test time and items may vary."
      "Reading ve Listening bölümleri adaptiftir; sorular performansınıza göre zorlaşır ya da kolaylaşır.",
    ],
    "TOEFL IBT sınavı testine Türkiye'de nerede girebilirim?": [
      "Test merkezine gitmek yerine sınava evden girmek isterseniz TOEFL iBT Home Edition seçeneğini de kullanabilirsiniz.",
    ],
  },
  // Kullanıcı kararı (2026-09-22): video bölümü yayınlanmıyor — kaynakta da
  // gövdesi boştu (video gömülüydü, metin yok).
  ignored: ["TOEFL Hakkında Detaylı Video Anlatım Bilgi"],
};


/* ---------------------------------------------------------------
 * Kısa sayfalar (C katmanı) — kaynakta tek/iki başlık, link listesi yok
 * ------------------------------------------------------------- */

const YOKDIL: ExamDef = {
  slug: "yokdil-sinavi-kursu",
  name: "YÖKDİL",
  label: "YÖKDİL Kursu",
  code: "YÖKDİL",
  illustration: "kampus",
  hero: { heading: null },
  blocks: [{ kind: "prose", heading: "YÖKDİL Nedir?", kicker: "SINAV HAKKINDA" }],
  edits: {
    // Şube listesi düzeltmesi: kaynakta "Pendik" geçiyor ama bugünkü şubeler
    // data/branches.ts'te (Pendik yok, Ümraniye var).
    "YÖKDİL sınav hazırlık eğitimlerimiz maksimum 12 kişilik özel gruplarda ya da istediğiniz gün ve saatlerde birebir özel dersler şeklinde düzenlenmektedir. Programı yürüten hocalarımız Türkiye çapında bilinen akademik başarısı tescilli öğretim üyelerinden oluşmaktadır. YÖKDİL sınavına İstanbul'da Kadıköy, Bağdat Caddesi, Beşiktaş, Pendik ve Ataşehir şubelerimizde hazırlanabilirsiniz.":
      "YÖKDİL sınav hazırlık eğitimlerimiz maksimum 12 kişilik özel gruplarda ya da istediğiniz gün ve saatlerde birebir özel dersler şeklinde düzenlenmektedir. Programı yürüten hocalarımız Türkiye çapında bilinen akademik başarısı tescilli öğretim üyelerinden oluşmaktadır. YÖKDİL sınavına İstanbul'da Kadıköy, Bağdat Caddesi, Etiler, Ataşehir ve Ümraniye şubelerimizde hazırlanabilirsiniz.",
    // 2020 takvimi bayat; YÖKDİL artık ÖSYM tarafından yılda iki kez yapılıyor
    // (2026: 8 Mart ve 9 Ağustos). Tarih blokları evergreen metne çevrildi.
    "YÖKDİL 1 Sınav Tarihleri 2020": "YÖKDİL sınavı ne zaman yapılır?",
    "YÖKDİL sınavı 01 Mart 2020 Pazar günü gerçekleştirilecektir.":
      "YÖKDİL, ÖSYM tarafından yılda iki kez düzenlenir. 2026 yılında YÖKDİL/1 8 Mart'ta, YÖKDİL/2 9 Ağustos'ta yapılmaktadır.",
    "Başvurular 08-16 Ocak 2020 tarihleri arasında yapılacak. Geç başvuru tarihi 28 Ocak 2020 olarak belirlendi. Sonuçlar 26 Mart 2020 tarihinde açıklanacak.":
      "Başvurular sınavdan yaklaşık altı hafta önce alınır; geç başvuru günü ek ücretlidir. Güncel takvim ÖSYM'nin sınav kılavuzunda duyurulur.",
    "YÖKDİL 2 Sınav Tarihleri 2020": "YÖKDİL başvurusu nereden yapılır?",
    "YÖKDİL sınavı 13 Eylül 2020 Pazar günü gerçekleştirilecektir.":
      "Başvurular ÖSYM'nin aday işlemleri sistemi (ais.osym.gov.tr) üzerinden yapılır.",
    "Başvurular 17-27 Temmuz 2020 tarihleri arasında yapılacak. Geç başvuru tarihi 11 Ağustos 2020 olarak belirlendi. Sonuçlar 08 Ekim 2020 tarihinde açıklanacak.":
      "Sonuçlar sınavdan yaklaşık üç hafta sonra ÖSYM sonuç ekranında açıklanır.",
    "Sınava başvurularınızı": "Sınav kılavuzu ve başvuru ekranı:",
    "www.yokdil.yok.gov.tr": "ais.osym.gov.tr",
    "adresinden yapabilirsiniz.": "adresinde yayımlanır.",
    // 85 TL 2020 ücreti; 2026 ücreti 1.200 TL (geç başvuruda 1.800 TL).
    "YÖKDİL sınav başvuru ücreti, başvuru işleminin son adımında kredi/banka kartı ile ödenecektir. Sınav":
      "YÖKDİL sınav başvuru ücreti, başvuru işleminin son adımında kredi/banka kartı ile ödenir.",
    "başvuru ücreti 85 (seksen beş) TL’dir.":
      "2026 yılı başvuru ücreti 1.200 TL, geç başvuru döneminde 1.800 TL'dir. Ücret her dönem güncellendiği için başvurudan önce ÖSYM kılavuzunu kontrol etmenizi öneririz.",
  },
  ignored: [],
};

const TOEFL_ESSENTIALS: ExamDef = {
  slug: "toefl-essentials-kursu",
  name: "TOEFL Essentials",
  label: "TOEFL Essentials Kursu",
  code: "TOEFL Essentials",
  illustration: "kampus",
  hero: { heading: null },
  blocks: [
    { kind: "prose", heading: "TOEFL Essentials Kursu Sınav Sistemi ve Fiyatları", kicker: "SINAV HAKKINDA", take: "rest" },
    { kind: "prose", heading: "TOEFL Essentials Sınavı Eğitim Programı", kicker: "EĞİTİM PROGRAMI" },
  ],
  ignored: [],
};

const INGILTERE_VIZE: ExamDef = {
  slug: "ingiltere-vize-sinavi-ingilizce-a1kursu",
  name: "İngiltere Vize Kursu",
  label: "İngiltere Vize Kursu",
  code: "IELTS Life Skills A1",
  illustration: "en",
  hero: { heading: null },
  blocks: [{ kind: "prose", heading: "IELTS Life Skills A1 Nedir?", kicker: "SINAV HAKKINDA" }],
  ignored: [],
};

const TESTDAF: ExamDef = {
  slug: "testdaf-kursu",
  name: "TestDaF",
  label: "TestDaF Kursu",
  code: "TestDaF",
  illustration: "de",
  hero: { heading: null },
  blocks: [
    // Kaynakta tek başlık var; gövdenin kalanı kendi bölüm başlığıyla basılır
    // (başlık silinmiyor, H1 olarak duruyor — bu yalnız bölüm etiketi).
    { kind: "prose", heading: "TESTDAF Kursu", kicker: "SINAV HAKKINDA", title: "TestDaF sertifikası ve sınav yapısı", take: "rest" },
  ],
  // UI turu (2026-09-28, kullanıcı: "düzelt"): sonuç bildirimi resmi TestDaF sayfasından.
  edits: {
    // testdaf.de FAQ: "Ihre TestDaF-Ergebnisse können Sie im g.a.s.t.-Teilnehmenden-Portal abrufen"
    // (dijital ~3 hafta, kâğıt ~6 hafta). Belgenin postalandığı doğrulanamadı.
    "TestDaF belgeniz size postalanacaktır, böylece Almanya seyahatinizden önce üniversite başvurusu için gerekli olan evraklarınızı da hazırlayabilir ve hem zamandan, hemde paradan tasarruf etmiş olursunuz.":
      "TestDaF sonuçlarınızı sınavdan yaklaşık üç hafta sonra (kâğıt sınavda yaklaşık altı hafta) g.a.s.t. aday portalından görebilirsiniz; böylece Almanya seyahatinizden önce üniversite başvurusu için gerekli olan evraklarınızı da hazırlayabilir ve hem zamandan hem de paradan tasarruf etmiş olursunuz.",
  },
  ignored: [],
};

const TOEFL_PRIMARY: ExamDef = {
  slug: "cocuklar-icin-toefl-primary-egitimi",
  name: "TOEFL Primary",
  label: "TOEFL Primary Eğitimi",
  code: "TOEFL Primary",
  illustration: "kampus",
  hero: { heading: null },
  blocks: [
    { kind: "prose", heading: "Neden TOEFL Primary", kicker: "KİMLER İÇİN" },
    { kind: "prose", heading: "TOEFL Primary Nedir?", kicker: "SINAV HAKKINDA", format: "list" },
  ],
  // UI turu (2026-09-28, kullanıcı: "düzelt"): eskimiş sınav bilgisi resmi ETS sayfalarından.
  edits: {
    // ETS (ets.org/toefl/primary): "ages 8+" — üst yaş sınırı yok.
    "TOEFL Primary, Educational Testing Service’in uzun süredir üzerinde çalıştığı, 8-12 yaşları arasındaki ilkokul öğrencilerinin algı düzeylerine göre hazırlanmış olan bir sınav sistemidir.":
      "TOEFL Primary, Educational Testing Service’in uzun süredir üzerinde çalıştığı, 8 yaş ve üzerindeki ilkokul öğrencilerinin algı düzeylerine göre hazırlanmış olan bir sınav sistemidir.",
    "İlkokul 1.sınıftan 6. sınıfa kadar okuyan öğrencilere yönelik hazırlanmış olan İngilizce sınavıdır.":
      "Başta ilkokul öğrencileri olmak üzere 8 yaş ve üzerindeki çocuklara yönelik hazırlanmış olan İngilizce sınavıdır.",
    // ETS test-content: okuma ve dinleme (Step 1 / Step 2) + ayrı konuşma ve yazma testleri.
    "TOEFL Primary testinde, öğrencilerin okuma, anlama ve dinleme alanlarındaki İngilizce dil yeterlilikleri ölçülmektedir.":
      "TOEFL Primary testinde, öğrencilerin okuma ve dinleme alanlarındaki İngilizce dil yeterlilikleri ölçülmektedir; konuşma ve yazma becerileri için ayrı testler de bulunmaktadır.",
    // ETS: okuma ve dinleme "paper or digitally delivered".
    "Dinleme ve Okuma bölümleri kağıt üzerinde test edilmektedir.":
      "Dinleme ve Okuma bölümleri kâğıt üzerinde ya da dijital olarak uygulanmaktadır.",
    // ETS scoring-reporting: okuma/dinleme "scored locally by ETS Preferred Network offices",
    // konuşma "scored at ETS by human raters", yazma otomatik puanlama.
    "Sonuçlar, ETS tarafından eğitilmiş uzmanlar tarafından merkezi puanlama sistemiyle yapılmaktadır.":
      "Okuma ve dinleme bölümleri ETS’nin yetkili temsilcilikleri tarafından, konuşma bölümü ETS’de eğitimli değerlendiriciler tarafından puanlanmaktadır.",
  },
  ignored: [],
};


/* ---------------------------------------------------------------
 * Proficiency — statik klasörde yaşar (app/.../proficiency-kursu/page.tsx)
 * ------------------------------------------------------------- */

const PROFICIENCY: ExamDef = {
  slug: "proficiency-kursu",
  name: "Proficiency",
  label: "Proficiency Kursu",
  code: "Proficiency",
  illustration: "kampus",
  hero: { heading: null },
  edits: {
    // Kurum tecrübesi: kaynak "18 yıllık" → "2003’ten bu yana 23 yıllık" (kullanıcı 2026-10-01, `data/company.ts`).
    "18 yıllık tecrübemiz ve akademik başarısı tescilli eğitmenlerimiz ile sizleri istediğiniz skora götürecek programı hazırlamaktayız.":
      `${EXPERIENCE} tecrübemiz ve akademik başarısı tescilli eğitmenlerimiz ile sizleri istediğiniz skora götürecek programı hazırlamaktayız.`,
  },
  blocks: [
    {
      kind: "prose",
      heading: "Proficiency Kursu | Eğitim Programı hazırlık bitirme ve yüksek lisans",
      kicker: "EĞİTİM PROGRAMI",
      title: "Proficiency hazırlık programımız nasıl işliyor?",
      take: "rest",
    },
    {
      kind: "branchLinks",
      heading:
        "Proficiency Kursu Eğitim Programı Plan Tablosu ve Dünya Dilleri Merkezi Şubeleri Kurs Tarihleri",
      // Bölümün ilk 8 satırı link listesi; kalanı 2018 başarı tablosu (aşağıda).
      take: [0, 1, 2, 3, 4, 5, 6, 7],
      extraHrefs: {
        "Proficiency Sınavına Hazırladığımız Üniversiteler": "#universiteler",
        "Proficiency Nedir ?": `${SH}/proficiency-kursu/proficiency-nedir`,
        "Proficiency Özel Ders Birebir Kurs Programları": `${SH}/proficiency-kursu/proficiency-ozel-ders`,
        "Proficiency Örnek Sınav Soruları": `${SH}/proficiency-kursu/proficiency-ornek-sinav-sorulari`,
      },
    },
    {
      kind: "stats",
      heading:
        "Proficiency Kursu Eğitim Programı Plan Tablosu ve Dünya Dilleri Merkezi Şubeleri Kurs Tarihleri",
      kicker: "BAŞARI TABLOSU",
      leadTake: [8, 9],
      // Kaynak iki sütunlu: [ad, ad, sonuç, sonuç] sırası korunur.
      take: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
      icon: "kupa",
    },
    { kind: "universities" },
  ],
  // "Kurs Programı" sayfasından taşınacak kayda değer bilgi çıkmadı: tek özgün
  // cümlesi "8 kişilik özel gruplar" diyor, bu sayfa ise "en fazla 6 katılımcı"
  // (çelişki), gerisi diğer sınavlarla birebir aynı pazarlama metni.
  ignored: [],
};

/* ---------------------------------------------------------------
 * PTE · Fransızca Aile Birleşimi
 * ------------------------------------------------------------- */

const PTE: ExamDef = {
  slug: "academic-pte",
  name: "PTE",
  label: "PTE Kursu",
  code: "PTE Academic",
  illustration: "kampus",
  hero: { heading: null },
  blocks: [
    { kind: "prose", heading: "PTE Akademik Eğitim Programı Hakkında Bilgi", kicker: "EĞİTİM PROGRAMI" },
    {
      kind: "merged",
      sourcePath: "academic-pte/academic-pte-2",
      kicker: "PROGRAM SEÇENEKLERİ",
      title: "PTE hazırlık program seçenekleri",
      lines: [
        "Bire Bir Yüz Yüze PTE Eğitimi",
        "Online PTE Grup Eğitimi",
        "Online Bire Bir PTE Sınav Hazırlık Eğitimi",
        "PTE Writing Sınıfları",
        "PTE Speaking Sınıfları",
        "PTE Reading Sınıfları",
        "PTE Listening Sınıfları",
        "PTE Sınav Stratejileri",
      ],
    },
    {
      // Kaynakta bu satırlar sınavın BÖLÜMLERİ değil, 1. bölümdeki görev
      // tipleri; sınav yapısı kartı olarak basmak yanlış olurdu.
      kind: "prose",
      heading: "PTE Sınavı Bölüm 1: Konuşma ve Yazma (77-93 dakika)",
      kicker: "BÖLÜM 1 GÖREVLERİ",
      take: "rest",
      format: "list",
    },
    {
      kind: "drop",
      heading: "PTE Sınavı Bölüm 1: Konuşma ve Yazma (77-93 dakika)",
      take: [0],
      reason: "\"Bu bölümde\" — başlığın devamı olan yarım cümle, liste başında anlamsız",
    },
    {
      kind: "faq",
      title: "PTE sınavı hakkında sık sorulanlar",
      items: [
        { heading: "Pearson Test of English Academic (PTE Academic) Nedir?" },
        { heading: "PTE Sınavına Kimler Katılabilir?" },
        { heading: "PTE Sınav Sonucu Nerede Kullanılır?" },
        { heading: "PTE Sınav Formatı Nasıldır?" },
        { heading: "PTE Sınav Süresi Nedir?" },
        { heading: "PTE Sınavı Bölüm 2: Okuma ( 32-41 dakika)", format: "list" },
        { heading: "PTE Sınav Sonucu Kaç Sene Geçerlidir?" },
        { heading: "PTE Sınavına Kayıt Nasıl Yapılır?" },
        { heading: "PTE Sınav Merkezleri Nerededir?" },
      ],
    },
  ],
  edits: {
    // Kaynak kendisiyle çelişiyor: aynı sayfa PTE'yi "bilgisayar tabanlı"
    // diye tanımlıyor. PTE Academic bilgisayarda, test merkezinde yapılır.
    "IELTS sınavı gibi tamamen kağıt üzerinde uygulanan bir sınavdır. Sınav Listening (Dinleme), Reading (Okuma), Writing (Yazma) ve Speaking (Konuşma) olmak üzere 4 bölümden oluşmaktadır.":
      "PTE Academic, test merkezlerinde bilgisayar başında uygulanan bir sınavdır. Sınav Listening (Dinleme), Reading (Okuma), Writing (Yazma) ve Speaking (Konuşma) olmak üzere dört beceriyi ölçer.",
  },
  ignored: [],
};

const FRANSIZCA_AILE: ExamDef = {
  slug: "fransizca-aile-birlesimi-kursu",
  name: "Fransızca Aile Birleşimi",
  label: "Fransızca Aile Birleşimi Kursu",
  code: "Fransızca A1",
  illustration: "fr",
  hero: { heading: null },
  blocks: [
    {
      kind: "prose",
      heading: "Fransızca Aile Birleşimi Kursu",
      kicker: "EĞİTİM PROGRAMI",
      title: "Fransızca aile birleşimi kursumuz",
      take: "rest",
    },
    { kind: "prose", heading: "Fransızca Aile Birleşimi Hakkında Bilgi", kicker: "AİLE BİRLEŞİMİ NEDİR" },
    { kind: "prose", heading: "OFII’nin İstediği Gerekli Belgeler Nelerdir?", kicker: "GEREKLİ BELGELER", format: "list" },
    {
      kind: "prose",
      heading: "Eş Durumundan Dolayı Talep Edilen Oturum İzni İçin Gerekli Belgeler",
      kicker: "OTURUM İZNİ",
      format: "list",
    },
  ],
  ignored: [],
};


/* ---------------------------------------------------------------
 * GRE · GMAT · TOEIC
 * ------------------------------------------------------------- */

const GRE: ExamDef = {
  slug: "gre-kursu",
  name: "GRE",
  label: "GRE Kursu",
  code: "GRE",
  illustration: "kampus",
  hero: { heading: null },
  blocks: [
    {
      kind: "prose",
      heading: "GRE Kursu Sınav Hazırlık Eğitimi ve Fiyatları",
      kicker: "EĞİTİM PROGRAMI",
      title: "GRE hazırlık programımız",
      take: "rest",
    },
    {
      kind: "merged",
      sourcePath: "gre-kursu/gre-kursu-2",
      kicker: "PROGRAM SEÇENEKLERİ",
      title: "GRE hazırlık program seçenekleri",
      lines: [
        "Bire Bir Yüz Yüze GRE Eğitimi",
        "Online GRE Grup Eğitimi",
        "Online Bire Bir GRE Sınav Hazırlık Eğitimi",
        "GRE Writing Sınıfları",
        "GRE Reading Sınıfları",
        "GRE Sınav Stratejileri",
      ],
    },
    { kind: "prose", heading: "Değiştirilmiş GRE® Genel Testi Hakkında Bilgi", kicker: "SINAV HAKKINDA", take: [0, 1, 2, 3] },
    {
      kind: "structure",
      heading: "Değiştirilmiş GRE® Genel Testi Hakkında Bilgi",
      leadTake: null,
      cardsTake: [4, 5, 6],
      // Bölüm sayıları/süre: kısaltılmış GRE (2023'ten beri) — toplam 1 saat
      // 58 dakika, 2 Sözlü + 2 Nicel bölüm, 1 Analitik Yazma görevi.
      cards: [
        { icon: "okuma", meta: [{ icon: "kisim", text: "2 bölüm" }, { icon: "soru", text: "27 soru" }] },
        { icon: "kelime", meta: [{ icon: "kisim", text: "2 bölüm" }, { icon: "soru", text: "27 soru" }] },
        { icon: "yazma", meta: [{ icon: "sure", text: "30 dk" }, { icon: "soru", text: "1 görev" }] },
      ],
      detailAnchor: "sss",
    },
    { kind: "prose", heading: "GRE Test İçeriğinin Yapısı Nedir?", kicker: "SINAV YAPISI" },
    { kind: "prose", heading: "Sözlü Akıl Yürütme Bölümünde Şu Beceriler Ölçülür:", kicker: "SÖZLÜ AKIL YÜRÜTME", format: "list" },
    { kind: "prose", heading: "Nicel Akıl Yürütme Bölümünde Şu Beceriler Ölçülür:", kicker: "NİCEL AKIL YÜRÜTME", format: "list" },
    { kind: "prose", heading: "Analitik Yazma Bölümünde Şu Beceriler Ölçülür", kicker: "ANALİTİK YAZMA", format: "list" },
    {
      kind: "prose",
      heading: "Sözlü Akıl Yürütme ve Nicel Akıl Yürütme Sorularının Değiştirilmiş Versiyonları",
      kicker: "SORU HAVUZU",
    },
    {
      kind: "branchLinks",
      heading: "GRE Eğitim Programı Plan Tablosu ve Kurs Tarihleri",
      extraHrefs: { "GRE Nedir?": `${SH}/gre-kursu/gre-nedir` },
    },
    {
      kind: "faq",
      title: "GRE sınavı hakkında sık sorulanlar",
      items: [
        { heading: "GRE Sınavına Kimler Girmelidir?" },
        { heading: "GRE Sınavına Ne Zaman ve Nerede Girebilirim?" },
        { heading: "GRE Sınavını Hangi Kurumlar Kabul Ediyor?" },
      ],
    },
    // Üç "Soru Tiplerine Hızlı Bakış" bloğu eski ETS sayfasındaki linklerin
    // metniydi ("… daha yakından bakın"); hedef sayfa yok, tek başına anlamsız.
    { kind: "drop", heading: "Sözlü Akıl Yürütme Soru Tiplerine Hızlı Bakış", take: "all", reason: "hedefi olmayan link metni" },
    { kind: "drop", heading: "Nicel Akıl Yürütme Soru Tiplerine Hızlı Bakış", take: "all", reason: "hedefi olmayan link metni" },
    { kind: "drop", heading: "Analitik Yazma Soru Tiplerine Hızlı Bakış", take: "all", reason: "hedefi olmayan link metni" },
  ],
  edits: {
    // Kâğıt formatlı GRE kaldırıldı; sınav bilgisayarda, merkezde ya da evde.
    "Çin Hong Kong, Tayvan ve Kore'de, bilgisayar ortamındaki teste ayda bir ila üç kez girebilirsiniz. Bilgisayar ortamındaki testin sunulmadığı bölgelerse ise, kâğıt formatlı teste Ekim, Kasım ve Şubat aylarında bir ila üç kez girebilirler.":
      "GRE bugün dünya genelinde yalnız bilgisayar ortamında uygulanır: dilerseniz test merkezinde, dilerseniz evinizden (GRE at Home) girebilirsiniz.",
  },
  additions: {
    "GRE Test İçeriğinin Yapısı Nedir?": [
      // 2023'te kısaltılan GRE: 1 sa 58 dk, 5 bölüm, deneme bölümü yok.
      "GRE 2023'te kısaltıldı: sınav bugün toplam 1 saat 58 dakika sürüyor ve beş bölümden oluşuyor — bir Analitik Yazma görevi, iki Sözlü Akıl Yürütme ve iki Nicel Akıl Yürütme bölümü. Puanlanmayan deneme bölümü artık yok.",
    ],
  },
  // "Sözlü Akıl Yürütme" / "Nicel Akıl Yürütme" / "Analitik Yazma" başlıklarının
  // kaynakta gövdesi yok; aynı metin sınav yapısı kartlarında adları olarak var.
  ignored: ["Sözlü Akıl Yürütme", "Nicel Akıl Yürütme", "Analitik Yazma"],
};

const GMAT: ExamDef = {
  slug: "gmat-kursu",
  name: "GMAT",
  label: "GMAT Kursu",
  code: "GMAT",
  illustration: "kampus",
  hero: { heading: null },
  blocks: [
    { kind: "prose", heading: "GMAT Kursu", kicker: "EĞİTİM PROGRAMI", title: "GMAT hazırlık programımız", take: "rest" },
    {
      kind: "merged",
      sourcePath: "gmat-kursu/gmat-kursu-2",
      kicker: "PROGRAM SEÇENEKLERİ",
      title: "GMAT hazırlık program seçenekleri",
      lines: [
        "Bire Bir Yüz Yüze GMAT Eğitimi",
        "Online GMAT Grup Eğitimi",
        "Online Bire Bir GMAT Sınav Hazırlık Eğitimi",
        "GMAT Writing Sınıfları",
        "GMAT Reading Sınıfları",
        "GMAT Sınav Stratejileri",
      ],
    },
    { kind: "prose", heading: "GMAT (Graduate Management Admission Test)", kicker: "SINAV HAKKINDA" },
    { kind: "prose", heading: "GMAT Sınavı Dört Bölümden Oluşur", kicker: "SINAV YAPISI" },
    { kind: "prose", heading: "Analitik Yazma Değerlendirmesi (AYD)", kicker: "ANALİTİK YAZMA" },
    { kind: "prose", heading: "Bütünleşik Akıl Yürütme", kicker: "BÜTÜNLEŞİK AKIL YÜRÜTME", take: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] },
    { kind: "prose", heading: "Nicel bölüm", kicker: "NİCEL BÖLÜM" },
    { kind: "prose", heading: "İki tür nicel sorusu vardır, problem çözme ve veri yeterliliği.", kicker: "NİCEL SORU TİPLERİ" },
    { kind: "prose", heading: "Sözel bölüm", kicker: "SÖZEL BÖLÜM" },
    { kind: "prose", heading: "GMAT Puanlama Sistemi", kicker: "PUANLAMA", take: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
    {
      kind: "branchLinks",
      heading: "GMAT Eğitim Programı Plan Tablosu ve Kurs Tarihleri",
      extraHrefs: {
        "GMAT Nedir ?": `${SH}/gmat-kursu/gmat-nedir`,
        "GMAT Özel Ders Birebir Kurs Programları": `${SH}/gmat-kursu/gmat-ozel-ders`,
      },
    },
    // Kaynaktaki sınav günü tablosu düz metne dönüşünce tek tek hücrelere
    // ayrılmış ("12", "Soru", "30 Dakika"…); aynı sayılar "GMAT Sınavı Dört
    // Bölümden Oluşur" bölümünde zaten cümle hâlinde var.
    { kind: "drop", heading: "GMAT Puanlama Sistemi", take: "rest", reason: "tablo hücreleri, aynı bilgi metinde var" },
    { kind: "drop", heading: "Bütünleşik Akıl Yürütme", take: "rest", reason: "tablo hücreleri, aynı bilgi metinde var" },
  ],
  additions: {
    "GMAT Sınavı Dört Bölümden Oluşur": [
      // GMAT Focus Edition (2023 sonu): 3 bölüm, 2 sa 15 dk, 205–805 puan.
      "Güncel durum: GMAT, 2023 sonunda GMAT Focus Edition'a geçti. Sınav bugün üç bölümden oluşuyor — Nicel Akıl Yürütme, Sözel Akıl Yürütme ve Veri İçgörüleri (Data Insights) — toplam süre 2 saat 15 dakika. Analitik Yazma Değerlendirmesi kaldırıldı, Bütünleşik Akıl Yürütmenin yerini Veri İçgörüleri aldı ve toplam puan 205–805 aralığında veriliyor. Aşağıdaki bölüm açıklamaları sınavın önceki sürümünü anlatmaktadır.",
    ],
  },
  // Gövdesiz başlıklar: "Makale Puanı Açıklama" ve altındaki puan etiketleri
  // satırı — kaynakta da altında metin yok.
  ignored: ["Makale Puanı Açıklama", "Eksik yazı, Hatalı yazı, Sınırlı yazı, Yeterli yazı, Güçlü yazı, Çok iyi yazı"],
};

const TOEIC: ExamDef = {
  slug: "toeic-kursu",
  name: "TOEIC",
  label: "TOEIC Kursu",
  code: "TOEIC",
  illustration: "kampus",
  hero: { heading: null },
  blocks: [
    {
      kind: "prose",
      heading: "TOEIC Kursu Sınav Hazırlık Eğitimi Fiyatları",
      kicker: "EĞİTİM PROGRAMI",
      title: "TOEIC hazırlık programımız",
      take: "rest",
    },
    {
      kind: "merged",
      sourcePath: "toeic-kursu/toeic-kursu-2",
      kicker: "PROGRAM SEÇENEKLERİ",
      title: "TOEIC hazırlık program seçenekleri",
      lines: [
        "Bire Bir Yüz Yüze TOEIC Eğitimi",
        "Online Bire Bir TOEIC Sınav Hazırlık Eğitimi",
        "TOEIC Reading Sınıfları",
        "TOEIC Listening Sınıfları",
        "TOEIC Sınav Stratejileri",
      ],
    },
    {
      kind: "prose",
      heading: "TOEIC Sınavı’nın İçeriği Nedir?",
      kicker: "SINAV YAPISI",
      format: "list",
      list: { groups: ["1. Bölüm: Dinleme", "2. Bölüm: Okuma"] },
    },
    {
      kind: "prose",
      heading: "TOEIC Nerede Kullanılır?",
      kicker: "KULLANIM ALANLARI",
      format: "list",
      list: { groups: ["Kurumsal", "Dil okulları, üniversiteler", "Bireysel"] },
    },
    { kind: "prose", heading: "TOEIC Test Formatı", kicker: "TEST FORMATI" },
    {
      kind: "branchLinks",
      heading: "TOEIC Eğitim Programı Plan Tablosu ve Kurs Tarihleri",
      extraHrefs: {
        "TOEIC Nedir ?": `${SH}/toeic-kursu/toeic-nedir`,
        "TOEIC Özel Ders Birebir Kurs Programları": `${SH}/toeic-kursu/toeic-ozel-ders`,
      },
    },
    {
      kind: "prose",
      heading: "Türkiye’de TOEIC Sınavını Gerekli Gören Başlıca Kurumlar",
      kicker: "KURUMLAR",
    },
    {
      kind: "prose",
      heading: "TOEIC Sınav Merkezleri - Sınav Düzenleyen Kurumlar",
      kicker: "SINAV MERKEZLERİ",
      // [1] eski sitenin e-posta gizleme uyarısı (`ignored`) — sayfaya düşüyordu.
      take: [0, 2, 3, 4, 5, 6, 7, 8, 9],
      format: "list",
    },
  ],
  edits: {
    // Kurum tecrübesi: kaynak "13 yıllık" → "2003’ten bu yana 23 yıllık" (kullanıcı 2026-10-01, `data/company.ts`).
    "13 yıllık tecrübemiz ve akademik başarısı tescilli eğitmenlerimiz ile sizleri istediğiniz skora götürecek programı hazırlamaktayız. Programda kullanılacak materyaller DDM tarafından katılımcılara ücretsiz temin edilir.":
      `${EXPERIENCE} tecrübemiz ve akademik başarısı tescilli eğitmenlerimiz ile sizleri istediğiniz skora götürecek programı hazırlamaktayız. Programda kullanılacak materyaller DDM tarafından katılımcılara ücretsiz temin edilir.`,
    "Toplam 100 sorudan oluşur, yaklaşık 45 dk sürer ve dinleme cd üzerinden yapılır.":
      "Toplam 100 sorudan oluşur, yaklaşık 45 dakika sürer ve dinleme bölümü ses kaydı üzerinden yapılır.",
  },
  additions: {
    "TOEIC Sınav Merkezleri - Sınav Düzenleyen Kurumlar": [
      "Sınav merkezleri ve iletişim bilgileri zamanla değişebilir; başvurudan önce güncel merkez listesini ets.org üzerinden kontrol etmenizi öneririz.",
    ],
  },
  // Joomla'nın e-posta gizleme uyarısı — içerik değil, sistem metni.
  ignored: [
    "Bu e-Posta adresi istenmeyen posta engelleyicileri tarafından korunuyor. Görüntülemek için JavaScript etkinleştirilmelidir.",
    "toeic kursu",
  ],
};


/* ---------------------------------------------------------------
 * SAT · YDS · IELTS · Almanca Aile Birleşimi
 * ------------------------------------------------------------- */

const SAT: ExamDef = {
  slug: "sat-kursu",
  name: "SAT",
  label: "SAT Kursu",
  code: "SAT",
  illustration: "kampus",
  hero: { heading: null },
  blocks: [
    { kind: "prose", heading: "SAT Hazırlık Eğitim Programı Hakkında Bilgi", kicker: "EĞİTİM PROGRAMI" },
    {
      kind: "merged",
      sourcePath: "sat-kursu/sat-kursu-2",
      kicker: "PROGRAM SEÇENEKLERİ",
      title: "SAT hazırlık program seçenekleri",
      lines: [
        "Ücretsiz seviye belirleme sınavı",
        "Eğitim koçluğu ve kişisel gelişim planı",
        "Sınav stratejileri ve taktikleri",
        "Sertifika programları",
      ],
    },
    { kind: "prose", heading: "SAT Sınavının Yapısı Hakkında Bilgi", kicker: "SINAV YAPISI" },
    { kind: "prose", heading: "SAT - Eleştirel Okuma", kicker: "ELEŞTİREL OKUMA" },
    { kind: "prose", heading: "SAT - Matematik", kicker: "MATEMATİK" },
    { kind: "prose", heading: "SAT - Yazma", kicker: "YAZMA" },
    { kind: "prose", heading: "SAT - Soru Stilleri", kicker: "SORU STİLLERİ" },
    {
      // Kaynakta bu yedi bölüm tek bir konunun (2016 yenilemesi) alt başlıkları;
      // arka arkaya düz metin olarak basıldığında sayfa okunmaz hâle geliyordu.
      kind: "faq",
      id: "2016-yenilemesi",
      title: "SAT'ın 2016 yenilemesinde neler değişti?",
      kicker: "SINAVIN GEÇMİŞİ",
      items: [
        { heading: "SAT Sınavının 2016 Yılındaki Değişiklikleri" },
        { heading: "Önemli İçerik Değişiklikleri" },
        { heading: "Bağlam İçerisinde Sözcükler" },
        { heading: "Kanıtlar ile Çözüm" },
        { heading: "Makale, Bir Kaynağı Analiz Etme" },
        { heading: "Matematiğin Kilit Noktaları" },
        { heading: "Konusunu Gerçek Hayattan Alan Sorular" },
        { heading: "Bilim, Tarih ve Toplum Bilimleri Metinleri ile Analiz Uygulamaları" },
        { heading: "Birleşik Devletler Kuruluş Belgeleri ve Küresel Diyalog" },
      ],
    },
    { kind: "prose", heading: "SAT SınavındaTahminde Bulunmanın Cezası Yok", kicker: "PUANLAMA" },
    {
      kind: "branchLinks",
      heading: "SAT Eğitim Programı Plan Tablosu ve Kurs Tarihleri",
      extraHrefs: {
        "SAT Nedir?": `${SH}/sat-kursu/sat-nedir`,
        "SAT Özel Ders Birebir Kurs Programları": `${SH}/sat-kursu/sat-ozel-ders`,
      },
    },
    {
      kind: "faq",
      title: "SAT sınavı hakkında sık sorulanlar",
      items: [{ heading: "SAT Sınavında Hesap Makinesi Kullanımı Serbest mi?" }],
    },
  ],
  edits: {
    // Kaynak cümlesi kendi içinde çelişiyordu ("izin verilirken … izin verilmez").
    // Dijital SAT'ta matematik bölümünün tamamında hesap makinesi serbest;
    // sınav yazılımının içinde Desmos hesap makinesi gömülü geliyor.
    "SAT matematik bölümünde dört fonksiyonlu, bilimsel, grafik görüntüleme ve Bilgisayar Cebir Sistemi (CAS) hesap makinelerinin kullanılmasına izin verilirken, bölümlerin hiçbirinde hesap makinesi kullanımına izin verilmez. QWERTY klavyeli hesap makinelerine, cep telefonu hesap makinelerine, taşınabilir bilgisayarlara ve kişisel organizatörlere izin verilmez.":
      "Dijital SAT'ta matematik bölümünün tamamında hesap makinesi serbesttir: sınav uygulamasının içinde Desmos grafik hesap makinesi gömülü gelir, isterseniz kendi onaylı hesap makinenizi de kullanabilirsiniz. QWERTY klavyeli hesap makineleri, cep telefonu hesap makineleri, taşınabilir bilgisayarlar ve kişisel organizatörler kabul edilmez.",
  },
  additions: {
    "SAT Sınavının Yapısı Hakkında Bilgi": [
      // Dijital SAT (2024'ten beri): 2 bölüm, 2 sa 14 dk, uyarlanabilir modüller.
      "Güncel durum: SAT 2024'ten beri tamamen dijital uygulanıyor ve iki bölümden oluşuyor — Okuma ve Yazma (64 dakika, 54 soru) ile Matematik (70 dakika, 44 soru). Toplam süre 2 saat 14 dakika; her bölüm ikişer modüle ayrılıyor ve ikinci modülün zorluğu ilk moduldeki performansa göre belirleniyor. Toplam puan yine 400–1600 aralığında. Aşağıdaki bölüm açıklamaları sınavın kâğıt üzerindeki önceki sürümünü anlatmaktadır.",
    ],
    "Makale, Bir Kaynağı Analiz Etme": [
      "Not: SAT'ın makale (essay) bölümü 2021'de kaldırıldı; dijital SAT'ta makale yazma görevi bulunmuyor.",
    ],
  },
  ignored: [],
};

const YDS: ExamDef = {
  slug: "yds-kursu",
  name: "YDS",
  label: "YDS Kursu",
  code: "YDS",
  illustration: "kampus",
  hero: { heading: null },
  blocks: [
    { kind: "prose", heading: "YDS Kursu Sınav Hazırlık Eğitimi ve Fiyatları", kicker: "EĞİTİM PROGRAMI", title: "YDS hazırlık programımız", take: "rest" },
    { kind: "prose", heading: "Dünya Dilleri Merkezi Farkıyla YDS Hazırlık Kursu", kicker: "NEDEN DDM" },
    {
      kind: "merged",
      sourcePath: "yds-kursu/yds-kursu-2",
      kicker: "PROGRAM SEÇENEKLERİ",
      title: "YDS hazırlık program seçenekleri",
      lines: [
        "Bire Bir Yüz Yüze YDS Eğitimi",
        "Online YDS Grup Eğitimi",
        "Online Bire Bir YDS Sınav Hazırlık Eğitimi",
        "YDS Writing Sınıfları",
        "YDS Reading Sınıfları",
        "YDS Sınav Stratejileri",
      ],
    },
    {
      // P4 (kullanıcı kararı, 2026-09-25): "YDS Kurs Dönemi" (`yds-ozel-ders-2`) yayınlanmıyor,
      // 301 ile buraya gelir. Ana sayfada olmayan iki bilgisi taşındı; bayat "kayıtlar
      // başlamıştır" duyurusu alınmadı.
      kind: "merged",
      sourcePath: "yds-kursu/yds-ozel-ders-2",
      kicker: "KURS DÖNEMİ",
      title: "YDS hazırlığına ne zaman başlamalı?",
      lines: [
        "YDS eğitimlerine sınavdan en az 4 ay önce başlamanızı tavsiye ederiz.",
        "Eğitimler hafta sonu sabah, hafta sonu öğlen, ve hafta içi akşam programları olarak düzenlenecektir.",
      ],
    },
    { kind: "prose", heading: "YDS Hakkında Genel Bilgi?", kicker: "SINAV HAKKINDA" },
    {
      kind: "prose",
      heading: "YDS'ye Kimler Girmelidir?",
      kicker: "KİMLER GİRMELİ",
      format: "list",
      // Kaynakta aday grubu başlıkları sıradan madde gibi duruyordu; sekme başlığı olur.
      list: {
        groups: [
          "KPSS Lise Adayları:",
          "KPSS Ön Lisans Adayları:",
          "Üniversite 3 veya 4’üncü Sınıfta Okuyanlar:",
          "KPSS Lisans Adayları:",
          "KPSS A Grubu Adayları",
        ],
        groupsAs: "tabs",
      },
    },
    {
      kind: "headingList",
      kicker: "ADAY GRUPLARI",
      title: "Hangi adaylar için YDS puanı gerekiyor?",
      headings: [
        "Kamu Personeli:",
        "Yüksek Lisans Adayları:",
        "Araştırma Görevlisi Olmak İsteyenler:",
        "Doktora Adayları:",
        "Doçent Adayları:",
        "Tıpta ve Diş Hekimliğinde Uzmanlık Eğitimi Yönetmeliği:",
        "Yurt Dışında Bir Yükseköğretim Programını Bitirenler:",
      ],
    },
    {
      kind: "branchLinks",
      heading: "YDS Eğitim Plan Tablosu ve Kurs Tarihleri",
      extraHrefs: { "YDS Nedir?": `${SH}/yds-kursu/yds-nedir` },
    },
    {
      kind: "faq",
      title: "YDS hakkında sık sorulanlar",
      items: [
        { heading: "YDS Sınavında Çıkan Soruların Dağılımı Nasıldır?", format: "list" },
        { heading: "Diyalog Tamamlama:", question: "Diyalog tamamlama ve okuma bölümleri nasıl?", format: "list" },
        { heading: "YDS Puanı Değerlendirme İşlemi Nasıl Yapılıyor?" },
        {
          heading: "Yabancı Dil Seviyesi Tüm Adaylar İçin Geçerli Olmak Üzere 100 Tam Puan Üzerinden Hesaplanır:",
          question: "YDS puanı hangi seviyeye karşılık geliyor?",
          format: "list",
        },
        { heading: "YDS Sınav Sonucumu Nasıl Öğrenebilirim?" },
        { heading: "Sınav Sonucunun Tekrar Değerlendirilmesi İçin Ne Yapmam Gerekir?" },
        { heading: "Yatırdığım Sınav Ücretinin İadesini Hangi Durumlarda Yapılmaz?", format: "list" },
        {
          heading: "2020 İlkbahar Dönemi YDS 1 Sınav ve Başvuru Tarihleri Ne Zaman?",
          question: "YDS yılda kaç kez yapılıyor?",
        },
        {
          heading: "2020 Sonbahar Dönemi YDS 2 Sınav ve Başvuru Tarihleri Ne Zaman?",
          question: "e-YDS nedir, klasik YDS'den farkı var mı?",
        },
      ],
    },
  ],
  edits: {
    // Süre bayat: ÖSYM 2026 YDS ve e-YDS kılavuzları §1.12 "180 dakika" (bkz.
    // data/examGuides.ts YDS kaynak yorumu). Hero'daki "bir bakışta" kâğıdı da 180 diyor.
    "Sınav 80 sorudan oluşmaktadır. Yanlışlar doğruları götürmez ve soruları cevaplandırmanız için size tanınan süre 150 dakikadır. Her doğru cevap 1.25’lik bir puan seviyesine karşılık gelmektedir. Sınava herkes başvuru yapabilir.":
      "Sınav 80 sorudan oluşmaktadır. Yanlışlar doğruları götürmez ve soruları cevaplandırmanız için size tanınan süre 180 dakikadır. Her doğru cevap 1.25’lik bir puan seviyesine karşılık gelmektedir. Sınava herkes başvuru yapabilir.",
    // 2020 takvimi bayat. Klasik YDS yılda iki kez (ilkbahar/sonbahar),
    // e-YDS ise yıl içinde aylık oturumlarla yapılıyor.
    "2020 yılı Yabancı Dil Bilgisi Seviye Tespit Sınavı İlkbahar Dönem12 Nisan 2020 tarihinde yapılacaktır.":
      "Klasik YDS, ÖSYM tarafından yılda iki kez yapılır: ilkbahar dönemi (YDS/1) ve sonbahar dönemi (YDS/2).",
    "İlkbahar YDS sınavına başvurular 19 Şubat 2020 / 26 Şubat 2020 tarihleri arasında yapılacaktır. Adaylar, başvuru işlemini yaptıktan sonra başvuru süresi içersinde sınav ücretini ödeyerek başvurularını tamamlayabilirler.":
      "Başvurular sınavdan yaklaşık iki ay önce alınır; başvuru işlemi ücret ödendiğinde tamamlanmış olur. Güncel tarihler ÖSYM sınav takviminde duyurulur.",
    "İlkbahar Dönemi Geç Başvuru Tarihi:": "Geç başvuru:",
    "10 Mart 2020": "Her dönem için ek ücretli bir geç başvuru günü açılır.",
    "YDS İlkbahar Dönemi Sınav Sonuçları Açıklanma Tarihi:": "Sonuçlar:",
    "07 Mayıs 2020": "Klasik YDS sonuçları sınavdan yaklaşık üç dört hafta sonra açıklanır.",
    "2020 yılı Sonbahar dönemi YDS (yabancı dil bilgisi seviye tespit sınavı) 25 Ekim 2020 tarihinde yapılacaktır.":
      "e-YDS, aynı kapsamdaki sınavın bilgisayar ortamında yapılan hâlidir ve yıl içinde çok sayıda oturumla düzenlenir.",
    "Sonbahar YDS sınavına başvurular 04 Eylül 2020 / 14 Eylül 2020 tarihleri arasında yapılacaktır. Adaylar, başvuru işlemini yaptıktan sonra başvuru süresi içersinde sınav ücretini ödeyerek başvurularını tamamlayabilirler.":
      "Puan geçerliliği açısından e-YDS ile klasik YDS eşdeğerdir; aradaki temel fark sonuçların açıklanma hızıdır.",
    "Sonbahar Dönemi Geç Başvuru Tarihi:": "Sonuç süresi:",
    "24 Eylül 2020": "e-YDS sonuçları genellikle sınavın yapıldığı gün açıklanır.",
    "YDS Sonbahar Dönemi Sınav Sonuçları Açıklanma Tarihi:": "Takvim:",
    "19 Kasım 2020": "Sınav ve başvuru tarihleri her yıl ÖSYM'nin yayımladığı sınav takviminde yer alır.",
  },
  ignored: [],
};

const IELTS: ExamDef = {
  slug: "ielts-kursu",
  name: "IELTS",
  label: "IELTS Kursu",
  code: "IELTS",
  illustration: "kampus",
  hero: { heading: null },
  edits: {
    // Bayat şube adı: Beşiktaş → Etiler (müşteri kararı 2026-09-30).
    "Eğitimler hafta sonu ve hafta içi programları şeklinde olup dersler İstanbul'da Kadıköy, Bağdat Caddesi, Beşiktaş ve Ataşehir şubelerimizde düzenlenmektedir. Gruplardaki katılımcıların dil beceri düzeyinin homojen olması esastır. Seviye tespit sınavı sonucuna göre hafta içi günleri ders alacak öğrenciler ve hafta sonu ders alacak öğrenciler belirlenerek gruplar oluşturulur. Her katılımcı ayrı ayrı yazılı ve sözlü sınava tabi tutulmaktadır. Toplam 10 hafta süren ve 60 dersten oluşan, her ders saatinin 50 dakika olduğu eğitim sistemiyle İngilizcenizi geliştirmeniz ve IELTS sınavına hazırlanmanız için dil okulumuz mükemmel bir fırsat sunmaktadır.":
      "Eğitimler hafta sonu ve hafta içi programları şeklinde olup dersler İstanbul'da Kadıköy, Bağdat Caddesi, Etiler ve Ataşehir şubelerimizde düzenlenmektedir. Gruplardaki katılımcıların dil beceri düzeyinin homojen olması esastır. Seviye tespit sınavı sonucuna göre hafta içi günleri ders alacak öğrenciler ve hafta sonu ders alacak öğrenciler belirlenerek gruplar oluşturulur. Her katılımcı ayrı ayrı yazılı ve sözlü sınava tabi tutulmaktadır. Toplam 10 hafta süren ve 60 dersten oluşan, her ders saatinin 50 dakika olduğu eğitim sistemiyle İngilizcenizi geliştirmeniz ve IELTS sınavına hazırlanmanız için dil okulumuz mükemmel bir fırsat sunmaktadır.",
  },
  blocks: [
    { kind: "prose", heading: "IELTS Kursu Sınav Hazırlık Dersleri Eğitim Fiyatları", kicker: "EĞİTİM PROGRAMI", title: "IELTS hazırlık programımız", take: "rest" },
    { kind: "prose", heading: "IELTS Hazırlık Eğitimi İçeriği", kicker: "EĞİTİM İÇERİĞİ", format: "list" },
    {
      kind: "merged",
      sourcePath: "ielts-kursu/ielts-kursu-2",
      kicker: "PROGRAM SEÇENEKLERİ",
      title: "IELTS hazırlık program seçenekleri",
      lines: [
        "Bire Bir Yüz Yüze IELTS Eğitimi",
        "Online IELTS Grup Eğitimi",
        "Online Bire Bir IELTS Sınav Hazırlık Eğitimi",
        "IELTS Writing Sınıfları",
        "IELTS Speaking Sınıfları",
        "IELTS Reading Sınıfları",
        "IELTS Listening Sınıfları",
        "IELTS Sınav Stratejileri",
      ],
    },
    { kind: "prose", heading: "IELTS Eğitim Günleri ve Kurs Süresi", kicker: "EĞİTİM GÜNLERİ" },
    { kind: "prose", heading: "IELTS (International English Language Testing System)", kicker: "SINAV HAKKINDA" },
    { kind: "prose", heading: "Akademik IELTS", kicker: "AKADEMİK IELTS" },
    { kind: "prose", heading: "Genel IELTS", kicker: "GENEL IELTS", take: [0] },
    {
      kind: "prose",
      heading: "Genel IELTS",
      kicker: "SINAV BÖLÜMLERİ",
      title: "IELTS bölümleri, süreleri ve soru sayıları",
      take: [1, 2, 3, 4, 5, 6, 7, 8],
      format: "list",
      list: { lead: 1 },
    },
    {
      // UI turu (2026-09-28): önceden `take: "rest"` idi ve yukarıdaki 8 satırı
      // (bölümler) burada İKİNCİ kez basıyordu.
      kind: "prose",
      heading: "Genel IELTS",
      kicker: "SINAV GÜNÜ",
      title: "Sınav günü ve fotoğraf kuralları",
      take: [9, 10, 11, 12, 13, 14, 15, 16, 17],
      format: "list",
      list: { lead: 4 },
    },
    {
      kind: "branchLinks",
      heading: "IELTS Eğitim Programı ve Kurs Tarihleri Hakkında Bilgi",
      extraHrefs: { "IELTS Nedir?": `${SH}/ielts-kursu/ielts-nedir` },
    },
    {
      kind: "faq",
      title: "IELTS hakkında sık sorulanlar",
      items: [{ heading: "IELTS Kursları Katılımcı Sayısı ve Şartları Nedir?" }],
    },
  ],
  // Video bölümü yayınlanmıyor (TOEFL'daki kullanıcı kararıyla aynı).
  ignored: ["IELTS Hakkında Detaylı Video Anlatım Bilgi"],
};

const AILE_BIRLESIMI: ExamDef = {
  slug: "aile-birlesimi-egitimi",
  name: "Almanca Aile Birleşimi",
  label: "Almanca Aile Birleşimi A1 Kursu",
  code: "Start Deutsch 1",
  illustration: "de",
  hero: { heading: null },
  blocks: [
    { kind: "prose", heading: "Almanca Aile Birleşimi A1 Kursu", kicker: "EĞİTİM PROGRAMI", title: "Aile birleşimi A1 kursumuz", take: "rest" },
    {
      kind: "prose",
      heading: "Konuşma | Okuduğunu anlama | Yazma | Dinleme",
      kicker: "KURS SONUNDA",
      title: "Kurs sonunda neler yapabileceksiniz?",
      format: "list",
      list: { lead: 1 },
    },
    {
      kind: "prose",
      heading: "Almanca Aile Birleşimi A1 Sınavı Hakkında Sıkça Sorulan Sorular?",
      kicker: "MERAK EDİLENLER",
      format: "list",
    },
    {
      // Kaynakta arka arkaya sekiz belge bölümü var; hepsi soru başlıklı
      // olduğu için tek akordiyonda toplanıyor (metin aynen, sayfa taranabilir).
      kind: "faq",
      id: "belgeler",
      title: "Aile birleşimi başvurusunda gerekli belgeler",
      kicker: "GEREKLİ BELGELER",
      items: [
        { heading: "Aile Birleşimi İçin Gereken Belgeler Nelerdir?", format: "list" },
        {
          heading: "Türkiye'de Evlenenlerin Aile Birleşimi Vizesi Başvurusu İçin Gerekli Belgeler Nelerdir?",
          format: "list",
        },
        {
          heading: "Almanya’da Evlenenlerin Aile Birleşimi Vizesi Başvurusu İçin Gerekli Belgeler Nelerdir?",
        },
        {
          heading: "Başvuru Esnasında Türk Vatandaşları İçin Gerekli Olan Belgeler Nelerdir?",
          format: "list",
        },
        {
          heading: "Başvuru Esnasında Alman Vatandaşları İçin Gerekli Belgeler Nelerdir?",
          format: "list",
        },
        {
          heading: "Türk Vatandaşı ile Türk Vatandaşının Evliliği İçin Gerekli Belgeler Nelerdir?",
        },
        {
          heading: "Çifte Vatandaş Olan (Alman ve Türk) Kişilerin Evliliğinde Gerekli Olan Belgeler Nelerdir?",
        },
      ],
    },
    { kind: "prose", heading: "Aile Birleşimi'nin Hukuki Dayanağı Nedir?", kicker: "HUKUKİ DAYANAK" },
    {
      kind: "headingList",
      kicker: "KONSOLOSLUĞA GÖTÜRÜLECEKLER",
      title: "Başvuruda yanınızda götüreceğiniz belgeler",
      headings: [
        "Pasaport",
        "Vukuatlı nüfus kaydı",
        "Nüfus cüzdanı",
        "Evlenme cüzdanı ve fotokopisi",
        "Almanya’daki evin kira sözleşmesi",
      ],
    },
    {
      kind: "branchLinks",
      heading: "Almanca Aile Birleşimi A1 Kursu Eğitim Plan Tablosu ve Kurs Tarihleri",
      take: [0, 1, 2, 3, 4],
      extraHrefs: { "A1 Sınav Örneği": `${SH}/aile-birlesimi-egitimi/a1-sinav-ornegi` },
    },
    {
      kind: "prose",
      heading: "Almanca Aile Birleşimi A1 Kursu Eğitim Plan Tablosu ve Kurs Tarihleri",
      kicker: "SINAV YAPISI",
      title: "Start Deutsch 1 sınavı nasıl işliyor?",
      take: [5],
    },
    {
      kind: "faq",
      title: "Aile birleşimi hakkında sık sorulanlar",
      items: [
        { heading: "Almanya Vizesi Aile Birleşimi A1 Sınavı Nedir?" },
        { heading: "Almanca Uyum Kursu Nedir?" },
      ],
    },
  ],
  edits: {
    // Goethe (Prüfungsziele A1 SD1, 2022): "Die Teilnahme ist nicht an den Besuch eines Sprachkurses gebunden."
    // Uyum Yasası 2007'de çıktı ("yeni" değil). Kullanıcı kararı 2026-09-28: sınav bilgisi düzeltilir.
    "Almanya’da veya Hollanda’da yaşayan biriyle (Türk, Alman ya da Hollanda vatandaşı olması fark etmiyor) evlenen her Türk vatandaşı yeni çıkan ‘Uyum Yasası’ gereği Almanya’ya veya Hollanda’ya gitmeden önce bir başlangıç (A1) seviyesinde Almanca / Hollandaca aile birleşimi kursuna gitmek zorundadır.":
      "Almanya’da veya Hollanda’da yaşayan biriyle (Türk, Alman ya da Hollanda vatandaşı olması fark etmiyor) evlenen her Türk vatandaşı, 2007'de yürürlüğe giren ‘Uyum Yasası’ gereği Almanya’ya veya Hollanda’ya gitmeden önce başlangıç (A1) seviyesinde Almanca / Hollandaca bildiğini belgelemek zorundadır. Bunun için bir kursa katılmak şart değildir; belge, dil sınavı geçilerek alınır.",
    // Almanya temsilcilikleri (tuerkei.diplo.de, aile birleşimi vizesi): Goethe "Start Deutsch 1" ve ÖSD
    // "Grundstufe Deutsch 1" kabul, belge başvuruda 12 aydan eski olmamalı. "Yalnız 3 şehir" doğrulanamadı.
    "Kursu bitirdikten sonra sadece İstanbul, Ankara ve İzmir’de merkezi sistem yapılan Almanca / Hollandaca dil yeterlilik sınavına girerek 100 üzerinden 60 puan almak zorundadır. Ancak bu sınavı geçen kişiler konsolosluğa aile birleşimi vize başvurusunda bulunabilirler.":
      "Almanca için geçerli belgeler Goethe-Institut’un Start Deutsch 1 ve ÖSD’nin Grundstufe Deutsch 1 sınavlarıdır; sınavı geçmek için 100 üzerinden en az 60 puan gerekir ve belge, vize başvurusu sırasında 12 aydan eski olmamalıdır. Ancak bu sınavı geçen kişiler konsolosluğa aile birleşimi vize başvurusunda bulunabilirler.",
    // ALG II 2023'te kalktı; yaptırım bugün SGB II § 31a: kademeli 10 / 20 / 30, toplamda en fazla %30.
    "Devamsızlık durumunda belli bir yaptırım uygulanması konusunda da tek tip uygulama yolu seçilmiştir. Dolayısıyla kursa, \"öngörülen şekilde\" katılmama durumunda işsizlik parası (ALG II) yüzde 30 oranında kesilebilir.":
      "Devamsızlık durumunda belli bir yaptırım uygulanması konusunda da tek tip uygulama yolu seçilmiştir. Dolayısıyla kursa, \"öngörülen şekilde\" katılmama durumunda iş arayanlara verilen temel gelir desteği (SGB II) kademeli olarak, en fazla yüzde 30 oranında kesilebilir.",
    // 25 DM: Alman Markı 2002'de kalktı; güncel harç tutarı konsoloslukta.
    "Boşanmış ise boşanma kararının (Rechtsfähiges Scheidungsurteil) tercümesi (Bu belge için su anda 25,- DM harç parası alınmaktadır.) ve Apostille":
      "Boşanmış ise boşanma kararının (Rechtskräftiges Scheidungsurteil) tercümesi ve apostili. Bu belge için alınan harç tutarını ilgili konsolosluktan teyit etmeniz gerekir.",
  },
  ignored: [],
};

/** Üretilen sınav sayfaları — sıra "diğer sınavlar" ızgarasının sırasıdır. */
export const EXAMS: ExamDef[] = [TOEFL, IELTS, PROFICIENCY, GRE, GMAT, SAT, YDS, TOEIC, AILE_BIRLESIMI, PTE, FRANSIZCA_AILE, YOKDIL, TOEFL_ESSENTIALS, INGILTERE_VIZE, TESTDAF, TOEFL_PRIMARY];

/**
 * "Diğer sınavlar" dizininin grupları (UI turu 2026-09-28). Başlıklar arayüz etiketi;
 * her sınav tam bir grupta olmalı — eksik / fazla slug `ExamDirectory`de build'i düşürür.
 */
export const EXAM_GROUPS: { title: string; slugs: string[] }[] = [
  {
    title: "Uluslararası İngilizce sınavları",
    slugs: ["toefl-kursu", "ielts-kursu", "academic-pte", "toeic-kursu", "toefl-essentials-kursu", "cocuklar-icin-toefl-primary-egitimi"],
  },
  { title: "Türkiye'deki sınavlar", slugs: ["yds-kursu", "yokdil-sinavi-kursu", "proficiency-kursu"] },
  { title: "Yurt dışında üniversite", slugs: ["sat-kursu", "gre-kursu", "gmat-kursu", "testdaf-kursu"] },
  {
    title: "Vize ve aile birleşimi",
    slugs: ["ingiltere-vize-sinavi-ingilizce-a1kursu", "aile-birlesimi-egitimi", "fransizca-aile-birlesimi-kursu"],
  },
];

export function getExamDef(slug: string): ExamDef | undefined {
  return EXAMS.find((e) => e.slug === slug);
}
