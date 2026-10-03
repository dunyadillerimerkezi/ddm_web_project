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

import { BRAND_SUFFIX_REASON, EXPERIENCE } from "@/data/company";
import { isHiddenExam } from "@/data/hiddenPages";
import type { ExamDef } from "@/lib/examContent";

/** P4'te yayınlanan alt sayfalar (Nedir / Özel Ders / Örnek Sorular) — `extraHrefs` hedefleri. */
const SH = "/sinav-hazirlik-egitimleri";

/** P8 metadata denetimi (kullanıcı onayı, 2026-10-02) — dil sayfalarındaki `H1_PRICE_REASON` ile aynı karar. */
const EXAM_PRICE_REASON = "\"Fiyatları\" çıkarıldı — sitede fiyat yok (kullanıcı kararı, P8 2026-10-02); başka sözcük değişmedi";
/** P8 metadata denetimi — açıklama 155 karakteri aşıyordu; yalnız dolgu sözcükler çıktı, bilgi değişmedi. */
const DESC_TRIM_REASON = "description: >155 karakter — \"hakkında detaylı bilgi\" ve dolgu sözcükler çıkarıldı, bilgi aynı (kullanıcı onayı, P8 2026-10-02)";

/* ---------------------------------------------------------------
 * TOEFL (pilot)
 * ------------------------------------------------------------- */

const TOEFL: ExamDef = {
  slug: "toefl-kursu",
  meta: {
    description:
      "TOEFL kursu: Kadıköy, Bağdat Caddesi, Levent–Etiler ve Ataşehir şubelerinde Türk ve yabancı öğretmenlerle küçük grup, birebir, yüz yüze ve online eğitim",
    reasons: [DESC_TRIM_REASON],
  },
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
  meta: { brandSuffix: true, reasons: [BRAND_SUFFIX_REASON] },
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

/*
 * TestDaF — kullanıcı (2026-10-01): "yazısı çok az, ddmcadde'den bilgi alarak eklemeler yapabilirsin". ddmcadde'nin
 * TestDaF sayfası (data/ddmcadde_content.json `testdaf-kursu`) bu sayfanın kaynağıyla AYNI metin; yalnız paragrafları soru
 * başlıkları altında tekrar ediyor ("TDN 4 veya TDN 5 Puanı Nedir?", "Nerede Girilir?", "Kaç Kere Girilir?"). Yeni firma
 * bilgisi yok → kaynak metin o soru başlıklarına göre bölündü (başlıklar arayüz etiketi), genel bilgi resmi kaynaktan
 * `prepend` / `append` / `added*` ile eklendi. Kaynaklar (2026-10-01):
 * - Dijital TestDaF bölümleri: https://www.testdaf.de/de/teilnehmende/der-digitale-testdaf/aufbau-des-digitalen-testdaf/
 *   (Lesen 7 Aufgaben · 34 Items · ca. 55 Min; Hören 7 · 30 · ca. 40; Schreiben 2 · ca. 60; Sprechen 7 · ca. 35)
 * - "reine Prüfungszeit 3 Stunden und 15 Minuten"; kâğıt + dijital iki sürüm:
 *   https://www.testdaf.de/de/teilnehmende/mein-testdaf/faq/faq-allgemein/ — dijital 22.10.2020'den beri (testdaf.de Neuigkeiten)
 * - TDN 3–5 ↔ GER B2 ve C1; sonuç dijital ~3, kâğıt ~6 hafta; "unbegrenzt gültig":
 *   https://www.testdaf.de/de/teilnehmende/mein-testdaf/faq/faq-ergebnisse-und-zertifikat/
 * - Tüm bölümlerde TDN 4 = tüm programlara kabul (RO-DT § 4 Abs. 5); bazı programlar bir bölümde TDN 3 kabul eder:
 *   https://www.testdaf.de/de/hochschulen/der-testdaf-und-hochschulen/nachweis-der-deutschkenntnisse-fuer-das-studium/
 * - Türkiye sınav merkezleri (g.a.s.t. merkez araması, TR): Ankara, İstanbul, İzmir, Antalya, Adana, Bursa, Erzurum, Eskişehir
 *   — https://www.testdaf.de/de/teilnehmende/mein-testdaf/testzentrum-finden/
 * - Firma cümlesi "Almanca TESTDAF TDN 4 ve TDN 5 eğitimleri birebir özel dersler şeklinde verilmektedir." — bu sitenin
 *   Almanca Kursu kaynağından (site_content.json, almanca-kursu, sertifika bölümü), birebir.
 */
const TESTDAF: ExamDef = {
  slug: "testdaf-kursu",
  name: "TestDaF",
  label: "TestDaF Kursu",
  code: "TestDaF",
  illustration: "de",
  language: { label: "Almanca Kursu", href: "/yabanci-dil-egitimleri/almanca-kursu" },
  meta: {
    title: "TestDaF Kursu İstanbul | Dünya Dilleri Merkezi",
    description:
      "TestDaF sınavına hazırlık: TDN 4 ve TDN 5 için birebir özel dersler. Dijital TestDaF'ın bölümleri, TDN seviyeleri ve Türkiye'deki sınav merkezleri.",
    reasons: [
      "title: kaynak \"TESTDAF Kursu\" (13 karakter) — kullanıcı sayfanın güçlendirilmesini istedi (2026-10-01); diğer kurs sayfalarıyla aynı kalıp",
      "description: kaynak açıklama genel bir cümleydi; sayfanın firma cümlesi (birebir özel ders) + genel bilgi bloklarından yeniden yazıldı",
    ],
  },
  hero: { heading: null },
  blocks: [
    {
      kind: "addedStructure",
      title: "Dijital TestDaF'ın bölümleri",
      lead: "TestDaF okuma, dinleme, yazma ve konuşmayı dört ayrı bölümde ölçer; dijital sınavın saf süresi 3 saat 15 dakikadır.",
      sections: [
        { name: "Okuma", skill: "Lesen", icon: "okuma", parts: [{ title: "", meta: [{ icon: "sure", text: "~55 dk" }, { icon: "kisim", text: "7 görev" }, { icon: "soru", text: "34 soru" }] }] },
        { name: "Dinleme", skill: "Hören", icon: "dinleme", parts: [{ title: "", meta: [{ icon: "sure", text: "~40 dk" }, { icon: "kisim", text: "7 görev" }, { icon: "soru", text: "30 soru" }] }] },
        { name: "Yazma", skill: "Schreiben", icon: "yazma", parts: [{ title: "", meta: [{ icon: "sure", text: "~60 dk" }, { icon: "kisim", text: "2 görev" }] }] },
        { name: "Konuşma", skill: "Sprechen", icon: "konusma", parts: [{ title: "", meta: [{ icon: "sure", text: "~35 dk" }, { icon: "kisim", text: "7 görev" }] }] },
      ],
    },
    // Kaynakta tek başlık var; gövde ddmcadde'deki soru başlıklarına göre bölündü (başlık silinmiyor, H1 olarak duruyor).
    { kind: "prose", heading: "TESTDAF Kursu", kicker: "SINAV HAKKINDA", title: "TestDaF neyi ölçer?", take: [2, 3, 4] },
    {
      kind: "prose",
      heading: "TESTDAF Kursu",
      kicker: "PUANLAMA",
      title: "TDN 4 ve TDN 5 ne anlama gelir?",
      take: [1],
      prepend: [
        "Sonuçlar her bölüm için ayrı ayrı TDN 3, TDN 4 ya da TDN 5 olarak verilir; bu seviyeler Avrupa Ortak Dil Çerçevesi'nin B2 ve C1 seviyelerine karşılık gelir.",
        "Dört bölümün hepsinde en az TDN 4 alan aday, Almanya'daki tüm bölüm ve programlara kayıt için gereken dil yeterliliğini kanıtlamış sayılır; bazı programlar bir bölümde TDN 3'ü de kabul eder.",
      ],
    },
    {
      kind: "prose",
      heading: "TESTDAF Kursu",
      kicker: "SINAV YERİ",
      title: "TestDaF'a nerede girilir?",
      take: [5, 6, 8, 9],
      append: [
        "Türkiye'de TestDaF sınav merkezleri Ankara, İstanbul, İzmir, Antalya, Adana, Bursa, Erzurum ve Eskişehir'de; aralarında Goethe-Institut'lar ve üniversiteler var. Güncel merkezler ve tarihler için testdaf.de'deki sınav merkezi aramasını kullanabilirsiniz.",
        "Sınav dijital olarak ve kâğıt üzerinde yapılır; dijital TestDaF 2020'den beri sunuluyor.",
      ],
    },
    { kind: "prose", heading: "TESTDAF Kursu", kicker: "HAZIRLIK", title: "Nasıl hazırlanılır, kaç kez girilir?", take: [7, 10] },
    {
      kind: "prose",
      heading: "TESTDAF Kursu",
      kicker: "EĞİTİM PROGRAMI",
      title: "Dünya Dilleri Merkezi'nde TestDaF hazırlığı",
      take: [11],
      append: ["Almanca TESTDAF TDN 4 ve TDN 5 eğitimleri birebir özel dersler şeklinde verilmektedir."],
    },
    {
      kind: "addedFaq",
      title: "TestDaF hakkında sık sorulanlar",
      items: [
        {
          question: "Dijital ve kâğıt TestDaF arasında fark var mı?",
          answer: [
            "İki sürüm de okuma, dinleme, yazma ve konuşmayı ölçer ve sonuç TDN 3–5 olarak verilir. Dijital sınavda sonuçlar yaklaşık üç haftada, kâğıt sınavda yaklaşık altı haftada açıklanır.",
          ],
        },
        {
          question: "TestDaF'a hangi seviyede girilmeli?",
          answer: [
            "TestDaF, B2 ve C1 aralığını ölçer; sonuç bu aralıkta TDN 3, 4 ya da 5 olarak verilir. Bu aralığın altında kalan bölüm \"TDN 3 altı\" olarak gösterilir.",
          ],
        },
      ],
    },
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
  meta: { brandSuffix: true, reasons: [BRAND_SUFFIX_REASON] },
  h1Edit: { from: "PTE Kursu Sınav Hazırlık Eğitimi Ders Fiyatları", to: "PTE Kursu Sınav Hazırlık Eğitimi", reason: EXAM_PRICE_REASON },
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
  h1Edit: { from: "GRE Kursu Sınav Hazırlık Eğitimi ve Fiyatları", to: "GRE Kursu Sınav Hazırlık Eğitimi", reason: EXAM_PRICE_REASON },
  meta: { title: "GRE Kursu Sınav Hazırlık Eğitimi", brandSuffix: true, reasons: [`title: ${EXAM_PRICE_REASON}`, BRAND_SUFFIX_REASON] },
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
  meta: { brandSuffix: true, reasons: [BRAND_SUFFIX_REASON] },
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
  meta: { brandSuffix: true, reasons: [BRAND_SUFFIX_REASON] },
  h1Edit: { from: "SAT Kursu Sınav Hazırlık Dersleri Eğitim Fiyatları", to: "SAT Kursu Sınav Hazırlık Dersleri", reason: EXAM_PRICE_REASON },
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
  h1Edit: { from: "YDS Kursu Sınav Hazırlık Eğitimi ve Fiyatları", to: "YDS Kursu Sınav Hazırlık Eğitimi", reason: EXAM_PRICE_REASON },
  meta: { title: "YDS Kursu Sınav Hazırlık Eğitimi", brandSuffix: true, reasons: [`title: ${EXAM_PRICE_REASON}`, BRAND_SUFFIX_REASON] },
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
  h1Edit: { from: "IELTS Kursu Sınav Hazırlık Dersleri Eğitim Fiyatları", to: "IELTS Kursu Sınav Hazırlık Dersleri", reason: EXAM_PRICE_REASON },
  meta: { title: "IELTS Kursu Sınav Hazırlık Dersleri", brandSuffix: true, reasons: [`title: ${EXAM_PRICE_REASON}`, BRAND_SUFFIX_REASON] },
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
  meta: {
    brandSuffix: true,
    description:
      "Almanca Aile Birleşimi A1 kursu: Kadıköy, Bağdat Caddesi, Levent–Etiler ve Ataşehir şubelerinde SD1 sertifikası için kurs tarihleri ve kayıt koşulları",
    reasons: [BRAND_SUFFIX_REASON, DESC_TRIM_REASON],
  },
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
/* ---------------------------------------------------------------
 * Eski sitede sayfası OLMAYAN sınavlar (kullanıcı isteği, 2026-10-01)
 *
 * Firma metni (hazırlık içeriği, kurs sistemi) Bağdat Caddesi şubesinin sitesinden (ddmcadde.com/sinav/…)
 * `scripts/pull-ddmcadde.mjs --new` ile `data/ddmcadde_content.json`a çekildi — kullanıcı: "firma hakkında bilgi varsa
 * fiyat dışında koyabilirsin". Ücret satırları ve kurs başlangıç tarihleri kaynağa alınmadı. Kaynak sayfalar çok kısa
 * (~200 kelime) → sınavın yapısı / puanlaması / SSS'si genel bilgi olarak `added*` bloklarında, resmi kaynak yorumda.
 * Kaynaktaki olgu hatası P2 kuralıyla `edits`te düzeltilir.
 * ------------------------------------------------------------- */

const ES = "/yabanci-dil-egitimleri/ispanyolca-kursu";

/*
 * DELE — resmi kaynaklar (2026-10-01'de kontrol edildi):
 * - Ne olduğu, kim verdiği, süresiz geçerlilik: https://examenes.cervantes.es/es/dele/que-es ("otorga el Instituto
 *   Cervantes en nombre del Ministerio de Educación, Formación Profesional y Deportes de España" · "validez oficial,
 *   vigencia indefinida y reconocimiento internacional")
 * - B2 yapısı: https://examenes.cervantes.es/es/dele/examenes/b2 (lectura 70 min · 4 tareas · 36 ítems · 25 p;
 *   auditiva 40 min · 5 tareas · 30 ítems · 25 p; escritas 80 min · 2 tareas · 25 p; orales 20 min + 20 prep · 3 tareas · 25 p)
 * - Puanlama: B2 sınav rehberi (guia_examen_dele_b2) — APTO için 60 / 100 ve iki grubun her birinde en az 30
 *   (grup 1 okuma + yazma, grup 2 dinleme + konuşma): https://examenes.cervantes.es/sites/default/files/guia_examen_dele_b2_0.pdf
 * - Sonuç süresi (~2 ay; mayıs ve kasım ~3 ay), diploma e-postayla dijital: https://examenes.cervantes.es/es/dele/calificaciones
 * - İstanbul sınav merkezi + okul çağı (11–17) A1 ve A2/B1 sınavları: https://clicestambul.cervantes.es/es/convocatorias
 */
const DELE: ExamDef = {
  slug: "dele-kursu",
  name: "DELE",
  label: "DELE Kursu",
  code: "DELE",
  illustration: "es",
  source: "ddmcadde",
  language: { label: "İspanyolca Kursu", href: ES },
  meta: {
    title: "DELE Kursu İstanbul | Dünya Dilleri Merkezi",
    description:
      "DELE sınavına hazırlık: hedef seviyenize göre birebir özel dersler, Türk ve İspanyol öğretmenler. DELE'nin bölümleri, puanlaması ve sınav merkezi.",
    reasons: [
      "title: kaynak başlık \"DELE Kursu | Dünya Dilleri Merkezi\" — yerel arama için \"İstanbul\" eklendi (diğer kurs sayfalarıyla aynı kalıp)",
      "description: kaynak açıklama başka sitenin metni; kaynaktaki olgulardan (birebir ders, Türk ve İspanyol öğretmen) + sayfanın genel bilgi bloklarından yeniden yazıldı",
    ],
  },
  hero: { heading: null },
  blocks: [
    {
      kind: "addedStructure",
      title: "DELE sınavının bölümleri",
      lead: "DELE her seviyede okuma, dinleme, yazma ve konuşma becerilerini ölçer. Örnek olarak B2 seviyesinin yapısı:",
      sections: [
        {
          name: "Okuma",
          skill: "Comprensión de lectura",
          icon: "okuma",
          parts: [{ title: "", meta: [{ icon: "sure", text: "70 dk" }, { icon: "soru", text: "36 soru" }, { icon: "puan", text: "25 puan" }] }],
        },
        {
          name: "Dinleme",
          skill: "Comprensión auditiva",
          icon: "dinleme",
          parts: [{ title: "", meta: [{ icon: "sure", text: "40 dk" }, { icon: "soru", text: "30 soru" }, { icon: "puan", text: "25 puan" }] }],
        },
        {
          name: "Yazma",
          skill: "Expresión e interacción escritas",
          icon: "yazma",
          parts: [{ title: "", meta: [{ icon: "sure", text: "80 dk" }, { icon: "kisim", text: "2 görev" }, { icon: "puan", text: "25 puan" }] }],
        },
        {
          name: "Konuşma",
          skill: "Expresión e interacción orales",
          icon: "konusma",
          parts: [
            { title: "", meta: [{ icon: "sure", text: "20 dk + 20 dk hazırlık" }, { icon: "kisim", text: "3 görev" }, { icon: "puan", text: "25 puan" }] },
          ],
        },
      ],
    },
    { kind: "prose", heading: "DELE Sınavı Hazırlık Kursunun İçeriği", kicker: "EĞİTİM PROGRAMI" },
    { kind: "prose", heading: "DELE Kurs Sistemi Hakkında Bilgi", kicker: "KURS SİSTEMİ" },
    {
      kind: "addedProse",
      kicker: "PUANLAMA",
      title: "DELE nasıl puanlanır?",
      paragraphs: [
        "DELE'de sonuç \"APTO\" (başarılı) ya da \"NO APTO\" (başarısız) olarak verilir. B2 sınavında her bölüm 25, toplam 100 puandır; başarılı sayılmak için toplam 60 puan ve iki grubun her birinde en az 30 puan gerekir.",
        "Birinci grup okuma ve yazma, ikinci grup dinleme ve konuşma bölümlerinden oluşur.",
        "Sonuçlar sınavdan yaklaşık iki ay sonra, mayıs ve kasım dönemlerinde yaklaşık üç ay sonra açıklanır. Diploma dijital olarak e-postayla gönderilir.",
      ],
    },
    {
      kind: "addedFaq",
      title: "DELE hakkında sık sorulanlar",
      items: [
        {
          question: "DELE diploması ne kadar geçerli?",
          answer: [
            "Süresiz. DELE diplomaları resmî geçerliliğe sahiptir, süresi dolmaz ve uluslararası alanda tanınır.",
          ],
        },
        {
          question: "DELE'ye Türkiye'de nerede girebilirim?",
          answer: [
            "İstanbul'daki Instituto Cervantes bir DELE sınav merkezidir. Sınav dönemleri ve hangi dönemde hangi seviyenin yapılacağı her yıl ilan edilir; kayıt Instituto Cervantes'in sitesinden yapılır.",
            "Sözlü sınav, yazılı sınavdan farklı bir günde olabilir.",
          ],
        },
        {
          question: "Hangi seviyeye girmeliyim?",
          answer: [
            "Her seviye ayrı bir sınavdır; hangi seviyeye gireceğinizi kayıtta siz seçersiniz. Başvuracağınız okulun ya da kurumun istediği seviyeyi kontrol edin; hazırlık öncesindeki seviye belirleme sınavı da size uygun seviyeyi gösterir.",
          ],
        },
        {
          question: "Okul çağındaki öğrenciler için DELE var mı?",
          answer: [
            "Evet. 11–17 yaş arası öğrenciler için okul sürümü (DELE para escolares) A1 ve A2/B1 seviyelerinde yapılır; diplomalar genel DELE ile aynı geçerliliğe sahiptir.",
          ],
        },
      ],
    },
  ],
  edits: {
    // Kaynakta olgu hatası: DELE yalnız İspanya'da yüksek öğrenim için değil; düzenleyen "Milli Eğitim Bakanlığı
    // yönetmeliği" değil, İspanya Eğitim Bakanlığı adına Instituto Cervantes (examenes.cervantes.es/es/dele/que-es).
    "DELE, İspanya’da üniversite veya yüksek öğrenim, Master düzeyinde eğitimini devam ettirmek isteyen öğrencilerin girmesi gereken İspanyolca dil sınavıdır. DELE sertifikasının İspanya’nın yanı sıra tüm dünyada geçerliliği kabul edilmiş İspanya Milli Eğitim Bakanlığı yönetmeliklerine göre düzenlenmiş İspanyolca dil seviyesini belirtmektedir.":
      "DELE (Diplomas de Español como Lengua Extranjera), İspanyolca seviyenizi A1'den C2'ye belgeleyen resmî diplomadır; İspanya Eğitim Bakanlığı adına Instituto Cervantes tarafından verilir. İspanya'da üniversite ya da yüksek lisans eğitimi planlayanların İspanyolca seviyesini belgelediği sınavdır; diploma süresiz geçerlidir ve uluslararası alanda tanınır.",
  },
  ignored: [],
};

const DE = "/yabanci-dil-egitimleri/almanca-kursu";

/*
 * TELC — resmi kaynaklar (2026-10-01):
 * - telc gGmbH, DVV'nin yan kuruluşu: https://www.telc.net/wir-sind-telc/die-zukunft-spricht-telc/
 * - Almanca sınav listesi: https://www.telc.net/sprachpruefungen/zertifikatspruefung/deutsch/
 * - telc Deutsch B1 yapısı (Lesen 3 + Sprachbausteine 2 = 90 dk, Hören 3 · ca. 30, Schreiben 1 · 30; Sprechen 3 · ca. 15 +
 *   20 dk hazırlık): https://www.telc.net/sprachpruefungen/deutsch/zertifikat-deutsch-telc-deutsch-b1/
 * - Yazılı 150 dk; 300 puan (sözlü 75); geçme yazılı 135 + sözlü 45 (%60): telc Deutsch B1 Übungstest 1, s. 29 / 40 —
 *   https://shop.telc.net/media/catalog/product/file/telc_deutsch_b1_zd_uebungstest_1.pdf
 * - Sözlü aynı gün ya da 7 gün içinde; sertifikada geçerlilik süresi yazmaz: Prüfungsordnung —
 *   https://www.telc.net/fileadmin/user_upload/pdfs/AGB_Pruefungsordnung/9994-P00-150010.pdf
 * - Sonuç 4–6 hafta: https://www.telc.net/sprachpruefungen/sprachpruefungen-support-faqs/
 * - C1 Hochschule (üniversiteye giriş sınavı): https://www.telc.net/sprachpruefungen/zertifikatspruefung/deutsch/telc-deutsch-c1-hochschule/
 * - Türkiye'de lisanslı merkezler (Ankara, İstanbul, İzmir, Adana, Antalya): https://www.telc.net/sprachpruefungen/pruefungszentrum-finden/
 */
const TELC: ExamDef = {
  slug: "telc-kursu",
  name: "TELC",
  label: "TELC Kursu",
  code: "telc",
  illustration: "de",
  source: "ddmcadde",
  language: { label: "Almanca Kursu", href: DE },
  h1Edit: { from: "TELC Kursu Sınav Hazırlık Eğitimi ve Ders Fiyatları", to: "TELC Kursu Sınav Hazırlık Eğitimi", reason: "H1'deki \"ve Ders Fiyatları\" çıkarıldı — sitede fiyat yok (kullanıcı kararı)" },
  meta: {
    title: "TELC Kursu İstanbul | Dünya Dilleri Merkezi",
    description:
      "telc Almanca sınavına hazırlık: hedef seviyenize göre birebir özel dersler. telc Deutsch B1'in bölümleri, puanlaması ve Türkiye'deki sınav merkezleri.",
    reasons: [
      "title: kaynak başlık \"TELC Kursu İstanbul | TELC Sınavına Hazırlık Eğitimi Özel Ders\" 60 karakteri aşıyor — diğer kurs sayfalarıyla aynı kalıp",
      "description: kaynak açıklama başka sitenin metni; kaynaktaki olgulardan (birebir özel ders) + genel bilgi bloklarından yeniden yazıldı",
    ],
  },
  hero: { heading: null },
  blocks: [
    {
      kind: "addedStructure",
      title: "telc Deutsch B1 sınavının bölümleri",
      lead: "telc sınavları yazılı ve sözlü iki kısımdan oluşur. Örnek olarak telc Deutsch B1 (Zertifikat Deutsch):",
      sections: [
        { name: "Okuma ve dil yapıları", skill: "Lesen · Sprachbausteine", icon: "okuma", parts: [{ title: "", meta: [{ icon: "sure", text: "90 dk" }, { icon: "kisim", text: "5 bölüm" }] }] },
        { name: "Dinleme", skill: "Hören", icon: "dinleme", parts: [{ title: "", meta: [{ icon: "sure", text: "~30 dk" }, { icon: "kisim", text: "3 bölüm" }] }] },
        { name: "Yazma", skill: "Schreiben", icon: "yazma", parts: [{ title: "", meta: [{ icon: "sure", text: "30 dk" }, { icon: "kisim", text: "1 görev" }] }] },
        { name: "Konuşma", skill: "Sprechen", icon: "konusma", parts: [{ title: "", meta: [{ icon: "sure", text: "~15 dk + 20 dk hazırlık" }, { icon: "kisim", text: "3 bölüm" }] }] },
      ],
    },
    { kind: "prose", heading: "TELC Sınavı Hazırlık Eğitimi İçeriği", kicker: "EĞİTİM PROGRAMI" },
    { kind: "prose", heading: "Almanca TELC Kurs Sistemi", kicker: "KURS SİSTEMİ" },
    {
      kind: "addedProse",
      kicker: "PUANLAMA",
      title: "telc nasıl puanlanır?",
      paragraphs: [
        "telc Deutsch B1'de toplam 300 puan vardır: yazılı sınav 225, sözlü sınav 75 puan. Geçmek için yazılı ve sözlü sınavın her birinde ayrı ayrı en az %60 (135 ve 45 puan) gerekir.",
        "Sonuçlar sınavdan 4–6 hafta sonra açıklanır. Sertifikanın üzerinde geçerlilik süresi yazmaz; eski bir sertifikanın kabul edilip edilmediğine onu isteyen kurum karar verir.",
      ],
    },
    {
      kind: "addedProse",
      kicker: "SINAV TÜRLERİ",
      title: "Hangi telc sınavına girmeliyim?",
      format: "list",
      paragraphs: [
        "Genel Almanca: Start Deutsch 1 (A1), A2, Zertifikat Deutsch (B1), B2, C1 ve C2",
        "Üniversiteye giriş: telc Deutsch C1 Hochschule",
        "İş hayatı: A2'den C1'e Beruf sınavları",
        "Sağlık: B1·B2 Pflege ve B2·C1 Medizin",
        "Okul çağı: A1 Junior, A2 Schule ve B1 Schule",
      ],
    },
    {
      kind: "addedFaq",
      title: "TELC hakkında sık sorulanlar",
      items: [
        {
          question: "telc sınavına Türkiye'de nerede girebilirim?",
          answer: [
            "telc'in Türkiye'de Ankara, İstanbul, İzmir, Adana ve Antalya'da lisanslı sınav merkezleri var. Hangi merkezde hangi sınavın yapıldığını telc.net'teki sınav merkezi aramasından kontrol edebilirsiniz.",
          ],
        },
        {
          question: "Sözlü sınav yazılıyla aynı gün mü?",
          answer: ["Sözlü sınav, yazılı sınavla aynı gün ya da en geç yedi takvim günü sonra yapılabilir."],
        },
        {
          question: "telc Deutsch C1 Hochschule ne işe yarar?",
          answer: [
            "Almanya'da üniversiteye girişte dil yeterliliğini göstermek için hazırlanmış telc sınavıdır; okuma, dinleme, yazma ve konuşmayı akademik konularla ölçer.",
          ],
        },
      ],
    },
  ],
  edits: {
    // Kaynaktaki süreler yalnız B1 için doğru (telc.net) — hangi sınavı anlattığı ve sözlünün tarih sınırı netleştirildi.
    "Almanca TELC sınavı yazılı ve sözlü olmak üzere iki kısımdan oluşmaktadır. Yazılı bölüm 2 saat 30 dakikadır. Sözlü sınav başlamadan önce 20 dakika hazırlık süresi vardır. Sözlü sınav, yazılı sınavla aynı günde veya başka bir günde yapılabilmektedir.":
      "Almanca telc sınavları yazılı ve sözlü olmak üzere iki kısımdan oluşur. telc Deutsch B1 sınavında yazılı bölüm 2 saat 30 dakikadır; sözlü sınav başlamadan önce 20 dakika hazırlık süresi vardır. Sözlü sınav, yazılı sınavla aynı günde ya da en geç yedi gün sonra yapılabilir.",
  },
  ignored: [],
};

const FR = "/yabanci-dil-egitimleri/fransizca-kursu";
const IT = "/yabanci-dil-egitimleri/italyanca-kursu";

/*
 * ÖSD — resmi kaynaklar (2026-10-02; firma metni almancakurslari.com/sinav/osd-kursu, aynı şubenin Almanca sitesi):
 * - Kurum: "Verein Österreichisches Sprachdiplom Deutsch", Viyana; 1 Aralık 1994; "state-approved examination and
 *   assessment system", BMEIA + BMBWF kurullarda: https://osd.at/en/about-us/ · https://www.osd.at/impressum/
 * - Sınav listesi (ZA1–ZC2, ZDÖ B1, C2 / Wirtschaftssprache Deutsch, B2 · C1 Pflege und medizinische Berufe, KID A1 · A2,
 *   B1–C1 Jugendliche; B1 "gemeinsam mit GI"): https://www.osd.at/die-pruefungen/osd-prufungen/
 * - Zertifikat B1 (Goethe-Institut, ÖSD ve Fribourg Üniversitesi ortak): Lesen 65, Hören ~40, Schreiben 60 dk; Sprechen
 *   çift ~15 / tek ~10 dk + 15 dk hazırlık; 4 modül "einzeln oder in jeder Kombination"; her modül en az 60 / %60;
 *   100–90 sehr gut · 89–80 gut · 79–70 befriedigend · 69–60 ausreichend; 2024'ten beri dijital de:
 *   https://www.osd.at/wp-content/uploads/2023/09/ZB1-Durchfuhrungsbestimmungen_10_2023.pdf
 * - Zertifikat B2: yazılı (70 puan, en az 42) + sözlü (30 puan, en az 18) iki modül; "Jedes Modul kann beliebig oft
 *   abgelegt bzw. wiederholt werden": https://www.osd.at/wp-content/uploads/2023/09/ZB2-Durchfuhrungsbestimmungen_10_2023.pdf
 * - Geçerlilik: "Auf dem Zertifikat wird keine Gültigkeitsdauer angegeben" (Prüfungsordnung 01.08.2026) ·
 *   "Grundsätzlich sind ÖSD-Zertifikate unbefristet gültig": https://osd.at/faq/
 * - Avusturya "Deutsch vor Zuzug" A1 — ÖSD, Goethe, telc, ÖIF; belge 1 yıldan eski olmamalı:
 *   https://www.oesterreich.gv.at/en/themen/menschen_aus_anderen_staaten/aufenthalt/3/Seite.120260
 * - Avusturya üniversiteleri: başvuruda A2, öğrenimde "B1 to C1, depending on the university": https://osd.at/en/worldwide-recognition/
 * - Modul 2 / Daueraufenthalt: ÖSD B1 yalnız 30.05.2021'den önce; artık yalnız ÖIF:
 *   https://www.migration.gv.at/de/leben-und-arbeiten-in-oesterreich/rahmenbedingungen-der-integration/integrationsvereinbarung/
 * - Vatandaşlık: B1 yalnız 29.05.2018–30.05.2021 arası; B2 ve üstü ÖSD kabul: https://www.wien.gv.at/zusammenleben/staatsbuergerschaft-deutschkenntnisse
 * - Almanya eş birleşimi: BAMF listesinde "„Grundstufe Deutsch 1" des Österreichischen Sprachdiploms (ÖSD)" (ÖSD A1'in eski
 *   adı); karar "ausschließlich die deutsche Auslandsvertretung":
 *   https://www.bamf.de/SharedDocs/Anlagen/DE/MigrationAufenthalt/Ehegattennachzug/ehegattennachzug.pdf?__blob=publicationFile&v=9
 * - Türkiye'deki merkezler (İstanbul 4, Ankara 2, Bursa, İzmir, Adana, Antalya): https://osd.at/pruefungszentren/?country=177
 * - Sonuç süresi resmi kaynakta yok — yazılmadı.
 */
const OSD: ExamDef = {
  slug: "osd-kursu",
  name: "ÖSD",
  label: "ÖSD Kursu",
  code: "ÖSD",
  illustration: "de",
  source: "ddmcadde",
  language: { label: "Almanca Kursu", href: DE },
  h1Edit: { from: "ÖSD Kursu Sınav Sistemi ve Ders Fiyatları", to: "ÖSD Kursu Sınav Sistemi", reason: "H1'deki \"ve Ders Fiyatları\" çıkarıldı — sitede fiyat yok (kullanıcı kararı)" },
  meta: {
    title: "ÖSD Kursu İstanbul | Dünya Dilleri Merkezi",
    description:
      "Avusturya'nın Almanca sınavı ÖSD'ye hazırlık: A1–C1 seviyeleri, online ve yüz yüze eğitim. ÖSD'nin bölümleri, puanlaması ve geçerli olduğu yerler.",
    reasons: [
      "title: kaynak başlık \"ÖSD Kursu - Almanca ÖSD Sınavına Hazırlık Eğitimi\" — diğer kurs sayfalarıyla aynı kalıp",
      "description: kaynak açıklama şube adı taşıyor (şube bilgisi o siteden alınmaz); kaynaktaki olgulardan (A1–C1, online / yüz yüze) + genel bilgi bloklarından yeniden yazıldı",
    ],
  },
  hero: { heading: null },
  blocks: [
    {
      kind: "prose",
      heading: "ÖSD Kursu Sınav Sistemi ve Ders Fiyatları",
      kicker: "SINAV HAKKINDA",
      title: "ÖSD nedir?",
      take: "rest",
      prepend: [
        "ÖSD (Österreichisches Sprachdiplom Deutsch), Avusturya'nın devlet onaylı Almanca sınav sistemidir. Merkezi Viyana'da olan kâr amacı gütmeyen ÖSD derneği tarafından 1994'ten beri düzenlenir; Avusturya Dışişleri ve Eğitim bakanlıkları derneğin kurullarında yer alır.",
      ],
    },
    {
      kind: "addedStructure",
      title: "ÖSD Zertifikat B1 sınavının bölümleri",
      lead: "ÖSD her seviyede okuma, dinleme, yazma ve konuşmayı ölçer. Örnek olarak Goethe-Institut ve Fribourg Üniversitesi ile ortak geliştirilen Zertifikat B1:",
      sections: [
        { name: "Okuma", skill: "Lesen", icon: "okuma", parts: [{ title: "", meta: [{ icon: "sure", text: "65 dk" }] }] },
        { name: "Dinleme", skill: "Hören", icon: "dinleme", parts: [{ title: "", meta: [{ icon: "sure", text: "~40 dk" }] }] },
        { name: "Yazma", skill: "Schreiben", icon: "yazma", parts: [{ title: "", meta: [{ icon: "sure", text: "60 dk" }] }] },
        { name: "Konuşma", skill: "Sprechen", icon: "konusma", parts: [{ title: "", meta: [{ icon: "sure", text: "~15 dk + 15 dk hazırlık" }, { icon: "kisim", text: "çift sınav" }] }] },
      ],
    },
    { kind: "prose", heading: "ÖSD Kursları Program İçeriği", kicker: "EĞİTİM PROGRAMI", format: "list" },
    { kind: "prose", heading: "ÖSD Sınavı Hazırlık Seviyeleri", kicker: "SEVİYELER", format: "list" },
    {
      kind: "addedProse",
      kicker: "SINAV TÜRLERİ",
      title: "Hangi ÖSD sınavına girmeliyim?",
      format: "list",
      paragraphs: [
        "Genel Almanca: ÖSD Zertifikat A1, A2, B1, B2, C1 ve C2",
        "Avusturya'ya özgü: Zertifikat Deutsch Österreich B1 (ZDÖ B1)",
        "Gençler için: KID A1, KID A2 ve B1, B2, C1 Jugendliche",
        "Sağlık meslekleri: B2 ve C1 Pflege und medizinische Berufe",
        "İş Almancası: C2 / Wirtschaftssprache Deutsch",
      ],
    },
    {
      kind: "addedProse",
      kicker: "PUANLAMA",
      title: "ÖSD nasıl puanlanır?",
      paragraphs: [
        "Zertifikat B1 dört modülden oluşur: okuma, dinleme, yazma ve konuşma. Modüller tek tek ya da birlikte alınabilir; her modülü geçmek için en az 60 puan (%60) gerekir. B1 sınavı 2024'ten beri dijital olarak da yapılabilir.",
        "B1'de notlar: 90–100 çok iyi (sehr gut), 80–89 iyi (gut), 70–79 orta (befriedigend), 60–69 yeterli (ausreichend); 60'ın altı başarısızdır.",
        "Zertifikat B2 yazılı ve sözlü iki modüldür: yazılıda 70 puandan en az 42, sözlüde 30 puandan en az 18 puan gerekir. Her modül istendiği kadar tekrarlanabilir.",
      ],
    },
    { kind: "prose", heading: "Neden Dünya Dilleri Merkezi ÖSD Kursları?", kicker: "NEDEN DDM", title: "ÖSD hazırlığında neden DDM?", format: "list" },
    { kind: "prose", heading: "ÖSD Kurslarına Kimler Katılabilir?", kicker: "KİMLER İÇİN", take: [0, 1, 2, 3, 4], format: "list" },
    {
      kind: "drop",
      heading: "ÖSD Kurslarına Kimler Katılabilir?",
      take: [5, 6],
      reason: "pazarlama kapanışı + doğrulanamayan kampanya (\"Kontenjanlar sınırlıdır. Erken kayıt avantajları\") — sayfa sonundaki form aynı işi görüyor",
    },
    {
      kind: "addedFaq",
      title: "ÖSD hakkında sık sorulanlar",
      items: [
        {
          question: "ÖSD belgesi ne kadar geçerli?",
          answer: [
            "ÖSD sertifikalarının süresi dolmaz; sertifikanın üzerinde geçerlilik süresi yazmaz. Eski bir belgenin kabul edilip edilmediğine onu isteyen kurum karar verir.",
            "Avusturya'ya oturum başvurusunda istenen A1 belgesi (Deutsch vor Zuzug) ise bir yıldan eski olmamalıdır.",
          ],
        },
        {
          question: "ÖSD aile birleşiminde geçerli mi?",
          answer: [
            "Avusturya'ya gelmeden önce istenen A1 belgesi (Deutsch vor Zuzug) için ÖSD kabul edilir. Almanya'da eş birleşiminde ÖSD A1 belgesi (eski adıyla Grundstufe Deutsch 1) BAMF'ın kabul edilen sınavlar listesindedir; son kararı Alman temsilciliği verir.",
          ],
        },
        {
          question: "ÖSD B1, Avusturya vatandaşlığı için yeterli mi?",
          answer: [
            "30 Mayıs 2021'den sonra alınan ÖSD B1 belgesi Avusturya vatandaşlığı ve uzun süreli oturum (Integrationsvereinbarung Modul 2) için kabul edilmez; bu sınavlar artık yalnız ÖIF tarafından yapılır. Vatandaşlık başvurusunda B2 ve üstü ÖSD belgesi kabul edilir.",
          ],
        },
        {
          question: "Avusturya'da üniversite için hangi seviye gerekir?",
          answer: [
            "Başvuruda genellikle A2 düzeyinde Almanca belgesi istenir; öğrenime başlamak için üniversiteye göre B1 ile C1 arası bir seviye gerekir.",
          ],
        },
        {
          question: "ÖSD mi, Goethe mi?",
          answer: [
            "ÖSD Avusturya'nın, Goethe-Institut Almanya'nın sınavıdır; Zertifikat B1 ise iki kurumun Fribourg Üniversitesi ile birlikte geliştirdiği ortak sınavdır. Başvuracağınız kurumun hangi belgeyi kabul ettiğini kontrol edin.",
          ],
        },
        {
          question: "ÖSD'ye Türkiye'de nerede girebilirim?",
          answer: [
            "ÖSD'nin resmi sitesindeki merkez listesinde İstanbul, Ankara, İzmir, Bursa, Adana ve Antalya'da sınav merkezleri var. Güncel merkezleri ve sınav tarihlerini osd.at'teki merkez aramasından kontrol edin.",
          ],
        },
      ],
    },
  ],
  edits: {},
  ignored: [],
};

/*
 * DELF | DALF — resmi kaynaklar (2026-10-01; france-education-international.fr bot koruması → aynı resmi sayfaların
 * web.archive.org kopyaları, 2026-04/06/08):
 * - DELF A1–B2 "diplôme officiel délivré par le ministère de l'éducation nationale", "valable à vie"; DELF B2 ve giderek
 *   DALF C1 üniversiteye giriş; Prim / junior sürümleri: https://www.france-education-international.fr/diplome/delf-tout-public
 * - DALF C1 + C2: https://www.france-education-international.fr/diplome/dalf
 * - DELF B2 yapısı (oral 30 dk · 2 alıştırma; écrits 1 sa · 2; production écrite 1 sa · en az 250 kelime; production orale
 *   20 dk + 30 dk hazırlık; her bölüm 25; en az 50/100, bölümde 5/25 altı eleyici):
 *   https://www.france-education-international.fr/diplome/delf-tout-public/niveau-b2
 * - Türkiye: Institut français İstanbul / Ankara / İzmir — https://www.ifturquie.org/istanbul/sinav-ve-diplomalar/delf-dalf-2/
 */
const DELF_DALF: ExamDef = {
  slug: "delf-dalf-kursu",
  name: "DELF | DALF",
  label: "DELF | DALF Kursu",
  code: "DELF · DALF",
  illustration: "fr",
  source: "ddmcadde",
  language: { label: "Fransızca Kursu", href: FR },
  meta: {
    title: "DELF DALF Kursu İstanbul | Dünya Dilleri Merkezi",
    description:
      "DELF ve DALF sınavlarına hazırlık: hedef seviyenize göre birebir özel dersler. DELF B2'nin bölümleri, puanlaması ve Türkiye'deki sınav merkezleri.",
    reasons: [
      "title: kaynak \"DELF - DALF Kursu | Dünya Dilleri Merkezi\" — yerel arama için \"İstanbul\" eklendi",
      "description: kaynak açıklama başka sitenin metni; kaynaktaki olgulardan (birebir özel ders) + genel bilgi bloklarından yeniden yazıldı",
    ],
  },
  hero: { heading: null },
  blocks: [
    {
      kind: "addedStructure",
      title: "DELF B2 sınavının bölümleri",
      lead: "Her seviyede dört beceri ölçülür; her bölüm 25, toplam 100 puandır. Örnek olarak DELF B2:",
      sections: [
        { name: "Dinleme", skill: "Compréhension de l'oral", icon: "dinleme", parts: [{ title: "", meta: [{ icon: "sure", text: "30 dk" }, { icon: "kisim", text: "2 alıştırma" }, { icon: "puan", text: "25 puan" }] }] },
        { name: "Okuma", skill: "Compréhension des écrits", icon: "okuma", parts: [{ title: "", meta: [{ icon: "sure", text: "60 dk" }, { icon: "kisim", text: "2 alıştırma" }, { icon: "puan", text: "25 puan" }] }] },
        { name: "Yazma", skill: "Production écrite", icon: "yazma", parts: [{ title: "", meta: [{ icon: "sure", text: "60 dk" }, { icon: "kisim", text: "en az 250 kelime" }, { icon: "puan", text: "25 puan" }] }] },
        { name: "Konuşma", skill: "Production orale", icon: "konusma", parts: [{ title: "", meta: [{ icon: "sure", text: "20 dk + 30 dk hazırlık" }, { icon: "kisim", text: "2 bölüm" }, { icon: "puan", text: "25 puan" }] }] },
      ],
    },
    { kind: "prose", heading: "DELF Sınavı Hazırlık Kursunun İçeriği", kicker: "EĞİTİM PROGRAMI" },
    { kind: "prose", heading: "DELF Kurs Sistemi Hakkında Bilgi", kicker: "KURS SİSTEMİ" },
    {
      kind: "addedProse",
      kicker: "PUANLAMA",
      title: "DELF ve DALF nasıl puanlanır?",
      paragraphs: [
        "Her bölüm 25 puandır. Diploma için toplam 100 üzerinden en az 50 puan ve her bölümde en az 5 puan gerekir; bir bölümde 5 puanın altında kalmak sınavı kaybettirir.",
        "DELF A1, A2, B1 ve B2; DALF C1 ve C2 seviyelerinden oluşur. Her seviye ayrı bir diplomadır ve ömür boyu geçerlidir.",
      ],
    },
    {
      kind: "addedFaq",
      title: "DELF ve DALF hakkında sık sorulanlar",
      items: [
        {
          question: "DELF ve DALF'a Türkiye'de nerede girebilirim?",
          answer: [
            "İstanbul, Ankara ve İzmir'deki Institut français merkezlerinde. Sınav takvimi her yıl Institut français Türkiye'nin sitesinde yayımlanır.",
          ],
        },
        {
          question: "Üniversite için hangi seviye gerekir?",
          answer: [
            "DELF B2 ve giderek daha çok DALF C1, Fransa'daki, Avrupa'daki ve Fransızca eğitim veren üniversitelere ve bazı grandes écoles'e girişte kullanılır. Başvuracağınız okulun şartını kontrol edin.",
          ],
        },
        {
          question: "Çocuklar ve gençler için DELF var mı?",
          answer: ["Evet. Çocuklar için DELF Prim, gençler için DELF junior / scolaire sürümleri vardır."],
        },
      ],
    },
  ],
  edits: {
    // Kaynakta olgu hatası: yalnız Fransa'da yüksek öğrenim için değil; "Milli Eğitim Bakanlığı yönetmeliği" değil, Fransa
    // Milli Eğitim Bakanlığı'nın verdiği diploma; DALF hiç anılmıyordu (france-education-international.fr).
    "DELF, Fransa’da üniversite veya yüksek öğrenim, Master düzeyinde eğitimini devam ettirmek isteyen öğrencilerin girmesi gereken Fransızca dil sınavıdır. DELF sertifikasının Fransa’nın yanı sıra tüm dünyada geçerliliği kabul edilmiş Fransa Milli Eğitim Bakanlığı yönetmeliklerine göre düzenlenmiş Fransızca dil seviyesini belirtmektedir.":
      "DELF ve DALF, Fransa Milli Eğitim Bakanlığı'nın verdiği resmî Fransızca diplomalarıdır: DELF A1'den B2'ye, DALF C1 ve C2 seviyelerini belgeler. Diplomalar dünya genelinde tanınır ve ömür boyu geçerlidir; DELF B2 ve DALF C1, Fransız ve Fransızca eğitim veren üniversitelere başvuruda kullanılır.",
  },
  ignored: [],
};

/*
 * CILS | CELI — resmi kaynaklar (2026-10-01):
 * - CILS seviyeleri (A1, A2, UNO-B1, DUE-B2, TRE-C1, QUATTRO-C2): https://cils.unistrasi.it/1/79/73/Livello-CILS-UNO-B1.htm
 * - CILS beş beceri: https://cils.unistrasi.it/1/83/15/Le_prove.htm ; her beceri ayrı geçilir, geçilen bölümler 18 ay
 *   saklanır: https://cils.unistrasi.it/1/117/83/La_valutazione.htm ; "non ha scadenza", B1–C2 mayıs/haziran + aralık:
 *   https://cils.unistrasi.it/public/articoli/204/Istruzioni%20per%20le%20sedi%20di%20esame.pdf
 * - DUE-B2 "livello minimo … per l'accesso al sistema universitario italiano": https://cils.unistrasi.it/1/79/74/Livello__CILS_DUE-B2.htm
 * - CELI seviyeleri + CELI 3 üniversiteye kayıt (MIUR): https://cvcl.unistrapg.it/pagine/esami-celi-generici ;
 *   "non hanno scadenza": https://cvcl.unistrapg.it/pagine/esami-celi-lingua-italiana ; yazılı + sözlü ayrı en düşük puan,
 *   kısmi başarı 1 yıl, A/B/C notları, haziran + kasım (mart yalnız A1–B2):
 *   https://www.unistrapg.it/sites/default/files/docs/certificazioni/regolamento-esami-celi-parte-pubblica.pdf
 * - Türkiye: İstanbul İtalyan Kültür Merkezi "ente certificatore CILS e CELI" + Ankara / İstanbul / İzmir'de diğer merkezler —
 *   https://ambankara.esteri.it/it/italia-e-turchia/diplomazia-culturale/lingua-e-cultura-italiana/corsi/
 */
const CILS_CELI: ExamDef = {
  slug: "cils-celi-kursu",
  name: "CILS | CELI",
  label: "CILS | CELI Kursu",
  code: "CILS · CELI",
  illustration: "it",
  source: "ddmcadde",
  language: { label: "İtalyanca Kursu", href: IT },
  meta: {
    title: "CILS CELI Kursu İstanbul | Dünya Dilleri Merkezi",
    description:
      "CILS ve CELI sınavlarına hazırlık: İtalyan öğretmenlerle birebir özel dersler. İki sınavın seviyeleri, değerlendirmesi ve Türkiye'deki sınav merkezleri.",
    reasons: [
      "title: kaynak \"CELI - CILS Kursu | Dünya Dilleri Merkezi\" — sayfa adıyla aynı sıra + \"İstanbul\"",
      "description: kaynak açıklama başka sitenin metni; kaynaktaki olgulardan (birebir özel ders, Türk ve İtalyan öğretmen) yeniden yazıldı",
    ],
  },
  hero: { heading: null },
  blocks: [
    {
      kind: "addedProse",
      kicker: "SEVİYELER",
      title: "CILS ve CELI seviyeleri",
      format: "list",
      paragraphs: [
        "CILS (Siena Yabancılar Üniversitesi): A1, A2, UNO-B1, DUE-B2, TRE-C1 ve QUATTRO-C2",
        "CELI (Perugia Yabancılar Üniversitesi): CELI Impatto (A1), CELI 1 (A2), CELI 2 (B1), CELI 3 (B2), CELI 4 (C1) ve CELI 5 (C2)",
        "İtalyan üniversitelerine kayıt için B2 seviyesi (CILS DUE-B2 ya da CELI 3) istenir.",
      ],
    },
    { kind: "prose", heading: "CILS ve CELI Sınavı Hazırlık Kursunun İçeriği", kicker: "EĞİTİM PROGRAMI" },
    { kind: "prose", heading: "CILS ve CELI Kurs Sistemi", kicker: "KURS SİSTEMİ" },
    {
      kind: "addedProse",
      kicker: "DEĞERLENDİRME",
      title: "Sınavlar nasıl değerlendirilir?",
      paragraphs: [
        "CILS'te dinleme, okuma, dil yapıları, yazma ve konuşma ayrı ayrı değerlendirilir ve her becerinin geçilmesi gerekir. Geçilen bölümler 18 ay saklanır; bu sürede yalnız geçilemeyen bölümlere yeniden girilebilir.",
        "CELI'de yazılı ve sözlü bölümün her birinde en düşük puan aranır; kısmi başarı bir yıl saklanır. Notlar A (çok iyi), B (iyi) ve C (yeterli) olarak verilir.",
        "İki sertifikanın da süresi dolmaz.",
      ],
    },
    {
      kind: "addedFaq",
      title: "CILS ve CELI hakkında sık sorulanlar",
      items: [
        {
          question: "CILS ve CELI'ye Türkiye'de nerede girebilirim?",
          answer: [
            "İstanbul'daki İtalyan Kültür Merkezi hem CILS hem CELI sınav merkezidir. İtalya'nın Ankara Büyükelçiliği'nin listesinde Ankara, İstanbul ve İzmir'de başka merkezler de yer alır.",
          ],
        },
        {
          question: "Sınavlar ne zaman yapılıyor?",
          answer: [
            "CILS'te B1–C2 sınavları yılda iki kez, mayıs/haziran ve aralıkta yapılır. CELI'de tüm seviyeler haziran ve kasımda, A1–B2 seviyeleri ayrıca martta yapılır.",
          ],
        },
        {
          question: "CILS mi, CELI mi?",
          answer: [
            "İkisi de A1'den C2'ye seviye belgeleyen, süresi dolmayan resmî İtalyanca sertifikalarıdır ve B2 seviyeleri üniversiteye kayıtta kabul edilir. Seçimi çoğunlukla sınav tarihine ve merkeze göre yapabilirsiniz; başvuracağınız kurumun özel bir şartı olup olmadığını kontrol edin.",
          ],
        },
      ],
    },
  ],
  edits: {
    // Kaynakta kopyala-yapıştır hatası ("İspanyolca dil sınavı", "İspanyolca dil seviyesi") ve yanlış kurum ("İtalya Milli
    // Eğitim Bakanlığı yönetmelikleri") — CILS Siena, CELI Perugia Yabancılar Üniversitesi (cils.unistrasi.it, cvcl.unistrapg.it).
    "CILS / CELI, İtalya’da üniversite veya yüksek öğrenim, Master düzeyinde eğitimini devam ettirmek isteyen öğrencilerin girmesi gereken İspanyolca dil sınavıdır. CILS / CELI sertifikasının İtalya’nın yanı sıra tüm dünyada geçerliliği kabul edilmiş İtalya Milli Eğitim Bakanlığı yönetmeliklerine göre düzenlenmiş İspanyolca dil seviyesini belirtmektedir.":
      "CILS (Siena Yabancılar Üniversitesi) ve CELI (Perugia Yabancılar Üniversitesi), İtalyanca seviyenizi A1'den C2'ye belgeleyen resmî sertifikalardır. Sertifikaların süresi dolmaz; İtalya'da üniversite ya da yüksek lisans eğitimi için B2 seviyesi istenir.",
    // Yazım: "içermektedrr".
    "CILS veya CELI sınavına yönelik eğitimlerimiz gireceğiniz A1, A2, B1, B2, C1, C2 seviyelerine uygun olarak hazırlanmaktadır. CILS ve CELI özel derslerin içeriği Genel İtalyanca, dil bilgisi, gramer tekrarı, kelime bilgisi, okuma, yazma, konuşma ve dinleme etütleri bu eğitimlerin yanı sıra sınav tekniği içermektedrr. Eğitimler Türk ve İtalyan öğretmenlerimiz tarafından düzenlenmektedir.":
      "CILS veya CELI sınavına yönelik eğitimlerimiz gireceğiniz A1, A2, B1, B2, C1, C2 seviyelerine uygun olarak hazırlanmaktadır. CILS ve CELI özel derslerin içeriği Genel İtalyanca, dil bilgisi, gramer tekrarı, kelime bilgisi, okuma, yazma, konuşma ve dinleme etütleri bu eğitimlerin yanı sıra sınav tekniği içermektedir. Eğitimler Türk ve İtalyan öğretmenlerimiz tarafından düzenlenmektedir.",
  },
  ignored: [],
};

const EN = "/yabanci-dil-egitimleri/ingilizce-kursu";

/*
 * e-TEP — resmi kaynaklar (2026-10-01):
 * - 2026 e-TEP Kılavuzu: https://dokuman.osym.gov.tr/pdfdokuman/2026/e-TEP/kilavuz_tepd07042026.pdf ("iki oturum ve dört
 *   bölüm"; okuma 30 soru 60 dk, dinleme 30 soru 30-33 dk, konuşma 4 görev 11-13 dk, yazma 2 görev 45-50 dk; her bölüm 30,
 *   "120 üzerinden"; sonuç "en geç 30 gün"; merkezler Adana, Ankara, İstanbul, İzmir e-Sınav Merkezleri; geçerlilik "2 yıl
 *   … önerilmektedir", akademik atama / doçentlikte "sürekli geçerlilik")
 * - YÖK kararı (haber 11.07.2025): https://www.yok.gov.tr/tr/news/elektronik-ingilizce-yeterlik-sinavi-e-tep-yuksekogretim-kurulu-tarafindan-kabul-edilen-merkezi-yabanci-dil-sinavlari-arasina-girdi-8JUht
 * - YDS eşdeğerliği, tek yönlü; 66 → 75: https://dokuman.osym.gov.tr/pdfdokuman/2025/e-TEP/esdegerlik_21082025.pdf
 */
const ETEP: ExamDef = {
  slug: "e-tep-kursu",
  name: "e-TEP",
  label: "E-TEP Kursu",
  code: "e-TEP",
  illustration: "dort-beceri",
  source: "ddmcadde",
  language: { label: "İngilizce Kursu", href: EN },
  h1Edit: { from: "E-TEP Kursu Eğitim Sistemi ve Ders Fiyatları", to: "E-TEP Kursu Eğitim Sistemi", reason: "H1'deki \"Ders Fiyatları\" çıkarıldı — sitede fiyat yok (kullanıcı kararı)" },
  meta: {
    title: "E-TEP Kursu İstanbul | Dünya Dilleri Merkezi",
    description:
      "E-TEP hazırlık kursu: hafta sonu 8 kişilik gruplar, 60 ders / 2,5 ay. ÖSYM e-TEP sınavının dört bölümü, puanlaması ve YDS eşdeğerliği.",
    reasons: [
      "title: kaynak başlık \"E-TEP Kursu | Dünya Dilleri Merkezi\" — yerel arama için \"İstanbul\" eklendi",
      "description: kaynaktaki olgulardan (8 kişilik grup, 60 ders / 2,5 ay) + sayfanın genel bilgi bloklarından yeniden yazıldı",
    ],
  },
  hero: { heading: null },
  blocks: [
    {
      kind: "addedStructure",
      title: "e-TEP sınavının bölümleri",
      lead: "ÖSYM'nin e-TEP sınavı bilgisayar ortamında, iki oturumda dört bölümden oluşur; her bölüm 30, toplam 120 puandır.",
      sections: [
        { name: "Okuma", skill: "1. oturum", icon: "okuma", parts: [{ title: "", meta: [{ icon: "sure", text: "60 dk" }, { icon: "soru", text: "30 soru" }] }] },
        { name: "Dinleme", skill: "1. oturum", icon: "dinleme", parts: [{ title: "", meta: [{ icon: "sure", text: "30–33 dk" }, { icon: "soru", text: "30 soru" }] }] },
        { name: "Konuşma", skill: "2. oturum", icon: "konusma", parts: [{ title: "", meta: [{ icon: "sure", text: "11–13 dk" }, { icon: "kisim", text: "4 görev" }] }] },
        { name: "Yazma", skill: "2. oturum", icon: "yazma", parts: [{ title: "", meta: [{ icon: "sure", text: "45–50 dk" }, { icon: "kisim", text: "2 görev" }] }] },
      ],
    },
    { kind: "prose", heading: "E-TEP Kursu Eğitim Sistemi ve Ders Fiyatları", kicker: "PROGRAM HAKKINDA", title: "E-TEP hazırlık programı", take: "rest" },
    {
      kind: "prose",
      heading: "E-TEP Sınav Hazırlık Program İçeriği",
      kicker: "EĞİTİM PROGRAMI",
      format: "list",
      list: {
        groups: [
          "Diagnostic & Level Analysis",
          "Academic Reading Skills",
          "Listening & Note-Taking",
          "Academic Writing",
          "Speaking & Pronunciation",
          "Integrated Exam Practice",
        ],
        groupsAs: "columns",
      },
    },
    {
      kind: "facts",
      heading: "E-TEP Sınavı Hazırlık Program Detayları",
      kicker: "KURS DÜZENİ",
      icon: "takvim",
      leadTake: null,
      icons: ["takvim", "saat", "sure", "sure", "grup"],
    },
    {
      kind: "addedProse",
      kicker: "PUANLAMA",
      title: "e-TEP nasıl puanlanır, nerede geçerlidir?",
      paragraphs: [
        "Her bölüm 30, toplam 120 puan üzerinden değerlendirilir. Sonuç belgesinde her bölümün puanı ve karşılık gelen dil düzeyi ile genel dil düzeyiniz (B1, B2 ya da C1) ayrı ayrı gösterilir; sonuçlar en geç 30 gün içinde açıklanır.",
        "YÖK, e-TEP'i Temmuz 2025'te kabul edilen merkezî yabancı dil sınavları arasına aldı: öğretim elemanı atamaları, doçentlik başvuruları, yabancı dille eğitim yapılan programlar ve lisansüstü başvurularında kullanılabilir.",
        "e-TEP puanına YDS eşdeğerliği verilir; eşdeğerlik tek yönlüdür, YDS puanına e-TEP eşdeğerliği verilmez. Örneğin e-TEP'te 66 puan, YDS'de 75 puana karşılık gelir.",
        "Sonuçların sınav tarihinden itibaren 2 yıl geçerli sayılması önerilir; öğretim elemanı atamaları ve doçentlik başvurularında ise sonuç süresiz geçerlidir.",
      ],
    },
    {
      kind: "addedFaq",
      title: "e-TEP hakkında sık sorulanlar",
      items: [
        {
          question: "e-TEP'e nerede girilir?",
          answer: [
            "Adana, Ankara, İstanbul ve İzmir'deki ÖSYM Elektronik Sınav Merkezlerinde, bilgisayar başında. Sınav yılda birkaç dönem yapılır (2026'da dört dönem); güncel tarihler için ÖSYM'nin sınav takvimine bakın.",
          ],
        },
        {
          question: "e-TEP ile YDS arasındaki fark nedir?",
          answer: [
            "YDS çoktan seçmeli sorularla okuma, dil bilgisi ve kelime bilgisini ölçer. e-TEP ise okuma, dinleme, konuşma ve yazma becerilerinin dördünü de bilgisayar ortamında ölçer.",
          ],
        },
        {
          question: "Kaç puan almam gerekir?",
          answer: [
            "Gereken puan başvurduğunuz kurumun ya da programın şartına bağlıdır. Akademik başvurularda çoğunlukla YDS karşılığı istenir; ÖSYM'nin eşdeğerlik tablosu e-TEP puanınızın YDS karşılığını gösterir.",
          ],
        },
      ],
    },
  ],
  edits: {
    // Yazım: hitap tutarsızlığı ("geliştirmezsiniz … hazırlanırsın").
    "Bu programda sadece İngilizcenizi geliştirmezsiniz, doğrudan E-TEP sınavına hazırlanırsın. Her ders gerçek sınav formatında çalışır, performansınız detaylı analiz edilir ve tamamen skor hedefli özel bir gelişim planı uygulanır.":
      "Bu programda sadece İngilizcenizi geliştirmezsiniz, doğrudan E-TEP sınavına hazırlanırsınız. Her ders gerçek sınav formatında çalışır, performansınız detaylı analiz edilir ve tamamen skor hedefli özel bir gelişim planı uygulanır.",
  },
  ignored: [],
};

/*
 * OET — resmi kaynaklar (2026-10-01; occupationalenglishtest.org → oet.com):
 * - OET Test Handbook 2026: https://cdn-aus.aglty.io/oet/pdf-files/OET%20Test%20Handbook%202026.pdf (CBLA; 12 meslek;
 *   Listening ~40 dk · 3 bölüm · 42 soru, Reading 60 dk · 3 bölüm · 42 soru, Writing 45 dk (5 dk okuma) · 1 görev, Speaking
 *   ~20 dk · 2 rol oyunu; Listening + Reading tüm meslekler için aynı; 0–500, 10'luk; A 450-500 · B 350-440 · C+ 300-340 ·
 *   C 200-290 · D 100–190 · E 0–90; bilgisayar / evden sonuç çoğunlukla 6 gün, kâğıt ~13 gün)
 * - Üç biçim (kâğıt, bilgisayar, OET@Home): https://oet.com/en-us/test/test-overview
 * - NMC: Yazma C+ + diğerleri B — https://oet.com/en-us/post/nmc-amends-oet-writing-to-c ; ECFMG: her bölümde 350 (B) —
 *   https://oet.com/en-us/post/oet-accepted-in-the-us-for-both-doctors-and-nurses
 * - Türkiye'deki sınav merkezleri DOĞRULANAMADI → yazılmadı.
 */
const OET: ExamDef = {
  slug: "oet-kursu",
  name: "OET",
  label: "OET Kursu",
  code: "OET",
  illustration: "dort-beceri",
  source: "ddmcadde",
  language: { label: "İngilizce Kursu", href: EN },
  h1Edit: { from: "OET Kursu Sınavı Hazırlık Eğitimi ve Fiyatları", to: "OET Kursu Sınavı Hazırlık Eğitimi", reason: "H1'deki \"ve Fiyatları\" çıkarıldı — sitede fiyat yok (kullanıcı kararı)" },
  meta: {
    title: "OET Kursu İstanbul | Dünya Dilleri Merkezi",
    description:
      "Sağlık profesyonelleri için OET hazırlık kursu: hafta sonu 12 kişilik gruplar, 72 ders / 3 ay. OET'nin bölümleri, not sistemi ve istenen notlar.",
    reasons: [
      "title: kaynak başlık \"OET Kursu | Dünya Dilleri Merkezi\" — yerel arama için \"İstanbul\" eklendi",
      "description: kaynaktaki olgulardan (12 kişilik grup, 72 ders / 3 ay) + sayfanın genel bilgi bloklarından yeniden yazıldı",
    ],
  },
  hero: { heading: null },
  blocks: [
    {
      kind: "prose",
      heading: "OET Kursu Sınavı Hazırlık Eğitimi ve Fiyatları",
      kicker: "SINAV HAKKINDA",
      title: "OET kimler için, nerede geçerli?",
      take: "rest",
      append: [
        "OET 12 sağlık mesleği için yapılır: diş hekimliği, diyetetik, tıp, hemşirelik, ergoterapi, optometri, eczacılık, fizyoterapi, podiatri, radyografi, dil ve konuşma terapisi ve veteriner hekimlik.",
      ],
    },
    {
      kind: "addedStructure",
      title: "OET sınavının bölümleri",
      lead: "Dinleme ve Okuma tüm meslekler için aynıdır; Yazma ve Konuşma adayın mesleğine göre hazırlanır.",
      sections: [
        { name: "Dinleme", skill: "Listening", icon: "dinleme", parts: [{ title: "", meta: [{ icon: "sure", text: "~40 dk" }, { icon: "kisim", text: "3 bölüm" }, { icon: "soru", text: "42 soru" }] }] },
        { name: "Okuma", skill: "Reading", icon: "okuma", parts: [{ title: "", meta: [{ icon: "sure", text: "60 dk" }, { icon: "kisim", text: "3 bölüm" }, { icon: "soru", text: "42 soru" }] }] },
        { name: "Yazma", skill: "Writing", icon: "yazma", parts: [{ title: "", meta: [{ icon: "sure", text: "45 dk" }, { icon: "kisim", text: "1 mektup" }] }] },
        { name: "Konuşma", skill: "Speaking", icon: "konusma", parts: [{ title: "", meta: [{ icon: "sure", text: "~20 dk" }, { icon: "kisim", text: "2 rol oyunu" }] }] },
      ],
    },
    {
      kind: "prose",
      heading: "OET Sınavının Bölümleri",
      kicker: "BÖLÜM İÇERİKLERİ",
      title: "Bölümlerde neler çıkar?",
      format: "list",
      list: { lead: 1, groups: ["Listening (Dinleme)", "Reading (Okuma)", "Writing (Yazma)", "Speaking (Konuşma)"] },
    },
    { kind: "prose", heading: "OET Kursu Kimler İçin Uygundur?", kicker: "KİMLER İÇİN", format: "list" },
    { kind: "prose", heading: "OET Sınavının Avantajları", kicker: "AVANTAJLAR", format: "list" },
    { kind: "prose", heading: "OET Skor Sistemi", kicker: "PUANLAMA", title: "OET not sistemi", take: [0, 1, 2, 3, 4], format: "list" },
    {
      kind: "prose",
      heading: "OET Skor Sistemi",
      kicker: "GEREKEN NOT",
      title: "Hangi not isteniyor?",
      take: [5],
      append: [
        "OET 0–500 ölçeğinde, 10 puanlık aralıklarla puanlanır; dört bölümün her biri ayrı not alır.",
        "Sonuçlar bilgisayarda ve evden yapılan sınavda çoğunlukla 6 gün içinde, kâğıt sınavda yaklaşık iki hafta sonra açıklanır.",
      ],
    },
    {
      kind: "drop",
      heading: "OET Skor Sistemi",
      take: [6],
      reason: "pazarlama çağrısı (\"doğru yerdesiniz!\") — sayfa sonundaki form aynı işi görüyor; kurum iddiası taşınmaz",
    },
    { kind: "prose", heading: "OET Sınav Hazırlık İçin Neden DDM?", kicker: "NEDEN DDM", title: "OET hazırlığında neden DDM?", take: [0, 1, 2, 3, 4], format: "list" },
    {
      kind: "prose",
      heading: "OET Sınav Hazırlık İçin Neden DDM?",
      kicker: "EĞİTİM SİSTEMİ",
      // Kaynak satırı "Size Özel Eğitim Sistemi" bu bloğun başlığı (aşağıda ignored).
      title: "Size özel eğitim sistemi",
      take: [6, 7, 8, 9],
      format: "list",
      list: { lead: 1 },
    },
    {
      kind: "facts",
      heading: "OET Grup Eğitimi Program Detayları",
      kicker: "KURS DÜZENİ",
      icon: "takvim",
      leadTake: null,
      icons: ["takvim", "saat", "sure", "sure", "grup"],
    },
    {
      kind: "addedFaq",
      title: "OET hakkında sık sorulanlar",
      items: [
        {
          question: "OET'ye nasıl girilir?",
          answer: [
            "Üç biçimde: kâğıt üzerinde, sınav merkezinde bilgisayarda ya da evden (OET@Home). Sınav tarihleri ve merkezler OET'nin resmi sitesinden (oet.com) seçilir.",
          ],
        },
        {
          question: "OET mi, IELTS mi?",
          answer: [
            "IELTS genel ve akademik İngilizceyi, OET ise sağlık ortamında kullanılan mesleki İngilizceyi ölçer. Birçok sağlık kurumu ikisini de kabul eder; hangisinin ve hangi notun istendiğini başvuracağınız kurumdan kontrol edin.",
          ],
        },
        {
          question: "Her bölümde B notu şart mı?",
          answer: [
            "Kuruma göre değişir. Örneğin İngiltere'de hemşire kaydı (NMC) Dinleme, Okuma ve Konuşmada en az B, Yazmada en az C+ kabul eder; ABD'de ECFMG her bölümde en az 350 puan (B) ister.",
          ],
        },
      ],
    },
  ],
  edits: {
    // Ülke adları Türkçe.
    "Doktorlar, hemşireler, diş hekimleri, eczacılar ve diğer sağlık çalışanlarının mesleki İngilizce becerilerini ölçer. Özellikle United Kingdom, Australia, New Zealand ve Ireland gibi ülkelerde kabul görmektedir.":
      "Doktorlar, hemşireler, diş hekimleri, eczacılar ve diğer sağlık çalışanlarının mesleki İngilizce becerilerini ölçer. Özellikle Birleşik Krallık, Avustralya, Yeni Zelanda ve İrlanda gibi ülkelerde kabul görmektedir.",
    // Kaynaktaki not bantları 0–100 ölçeğinde ve yanlış — resmi ölçek 0–500 (OET Test Handbook 2026).
    "A (90–100)": "A (450–500)",
    "B (80–89)": "B (350–440)",
    "C+ (70–79)": "C+ (300–340)",
    "C (60–69)": "C (200–290)",
    "D / E (60 altı)": "D (100–190) / E (0–90)",
    // "Genellikle en az B" kurumdan kuruma değişiyor (NMC Yazma'da C+ kabul ediyor).
    "Genellikle sağlık kurumları en az B seviyesi talep eder.":
      "Sağlık kurumlarının çoğu bölümlerde en az B (350) notu ister; bazı kurumlar tek bir bölümde C+ kabul eder.",
  },
  ignored: [
    "Size Özel Eğitim Sistemi", // "Size özel eğitim sistemi" bloğunun başlığı olarak basılıyor.
    // "Kimler İçin Uygundur?" bölümünün tekrarı + pazarlama kapanışı.
    "OET Sınavına Kimler Katılmalı?",
    "Yurtdışında çalışmak isteyen sağlık profesyonelleri",
    "OET sınavından yüksek skor hedefleyenler",
    "IELTS yerine mesleki sınav tercih edenler",
    "OET odaklı profesyonel eğitimimiz ile daha hızlı öğrenin, daha yüksek skor alın, yurtdışı mesleki yaşam fırsatlarından yararlanın.",
  ],
};

/** Yayındaki sınavlar — gizlenenler (`data/hiddenPages.ts`) tanımlarıyla dosyada durur, burada süzülür. */
const ALL_EXAMS: ExamDef[] = [TOEFL, IELTS, PROFICIENCY, GRE, GMAT, SAT, YDS, TOEIC, AILE_BIRLESIMI, PTE, FRANSIZCA_AILE, YOKDIL, TOEFL_ESSENTIALS, INGILTERE_VIZE, TESTDAF, TOEFL_PRIMARY, DELE, ETEP, OET, TELC, OSD, DELF_DALF, CILS_CELI];

export const EXAMS: ExamDef[] = ALL_EXAMS.filter((e) => !isHiddenExam(e.slug));

/**
 * "Diğer sınavlar" dizininin grupları (UI turu 2026-09-28). Başlıklar arayüz etiketi;
 * her sınav tam bir grupta olmalı — eksik / fazla slug `ExamDirectory`de build'i düşürür.
 */
export const EXAM_GROUPS: { title: string; slugs: string[] }[] = [
  {
    title: "Uluslararası İngilizce sınavları",
    slugs: ["toefl-kursu", "ielts-kursu", "academic-pte", "toeic-kursu", "toefl-essentials-kursu", "cocuklar-icin-toefl-primary-egitimi", "oet-kursu"],
  },
  { title: "Türkiye'deki sınavlar", slugs: ["yds-kursu", "yokdil-sinavi-kursu", "e-tep-kursu", "proficiency-kursu"] },
  { title: "Yurt dışında üniversite", slugs: ["sat-kursu", "gre-kursu", "gmat-kursu", "testdaf-kursu"] },
  // 2026-10-01: eski sitede olmayan, ddmcadde kaynaklı Avrupa dili sınavları.
  { title: "Avrupa dillerinde sınavlar", slugs: ["telc-kursu", "osd-kursu", "delf-dalf-kursu", "dele-kursu", "cils-celi-kursu"] },
  {
    title: "Vize ve aile birleşimi",
    slugs: ["ingiltere-vize-sinavi-ingilizce-a1kursu", "aile-birlesimi-egitimi", "fransizca-aile-birlesimi-kursu"],
  },
]
  .map((g) => ({ ...g, slugs: g.slugs.filter((s) => !isHiddenExam(s)) }))
  .filter((g) => g.slugs.length > 0);

export function getExamDef(slug: string): ExamDef | undefined {
  return EXAMS.find((e) => e.slug === slug);
}
