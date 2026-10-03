/**
 * P4 — Yurtdışı Eğitim alt sayfaları (Zengin İçerik alt türü 5, 2026-09-26).
 *
 * Tasarım (kullanıcı, 2026-09-26 — "A · biniş kartı"): tekil sayfa sistemi (`SinglePage`), hero'nun
 * sağında biniş kartı (`board.kind: "pass"`): İstanbul → gidilecek yer, dört alan, koçan. Gövde
 * soru → kalın cevap → kart / madde / tablo satırları. Şube bandı yok (kurs tarihi yok).
 *
 * İçerik kuralı (tekil ile aynı, CLAUDE.md §5): FİRMA metni birebir (yalnız yazım `edits`); GENEL bilgi
 * (vize, program kuralları, ülke bilgisi) ve İŞ ORTAĞI rakamları (Kaplan vb.) resmi kaynaktan doğrulanır,
 * eskimişse `edits` ile düzeltilir — kaynak URL yorumda, kaynak adı `sources`ta. Emin olunmayan rakam yazılmaz.
 *
 * Kapsam kararları (kullanıcı, 2026-09-26): "Yurtdışı Dil Eğitimi" ve "Tercih Edilen Ülkeler" içeriği
 * Yurtdışı Eğitim ana sayfasında zaten var → 301; `diger-program/yurtdisinda-egitim` Work and Travel'ın
 * birebir kopyası → 301; "İngiltere'de Dil Okulları" yanlış adresinden (`…/kanada-vancouver-2`) doğru
 * adrese (`…/ingiltere`) taşınır, eski adres 301.
 */

import { BRAND_SUFFIX_REASON } from "@/data/company";
import type { SinglePageDef } from "@/data/singlePages";

const YE = "/yurtdisi-egitim";
const UPDATED = "2026-09-26";

const ABROAD_PARENT = { label: "Yurtdışı Eğitim", href: YE };

/** Her yurtdışı kaydının gövdesine karışmış eski yan menü (h2 "Yurtdışı Eğitim" + 7 bağlantı). */
const ABROAD_MENU_REASON = "Eski sitenin yan menüsü (bağlantı listesi), içerik değil — menü ve ilgili sayfalar bölümü karşılıyor.";
const ABROAD_MENU = [
  "Yurtdışı Eğitim",
  "Yetişkinler için İngilizce Dil Kursları",
  "Yüksek Öğrenim",
  "Yurtdışı Sınav Hazırlık",
  "Yaz Okulları Gençler için Yurtdışı İngilizce Programları",
  "Pathway Programı",
  "Yurtdışı Dil Eğitim",
  "Kanada Vancouver’da yaşamak",
].map((line) => ({ line, reason: ABROAD_MENU_REASON }));

const ABROAD_RELATED = {
  title: "Yurtdışı eğitim programları",
  links: [
    { label: "Yurtdışı Eğitim", href: YE },
    { label: "Yetişkinler için İngilizce Dil Kursları", href: `${YE}/yurtdisi-ingilizce-egitimi` },
    { label: "Kanada Vancouver'da Yaşamak", href: `${YE}/yurtdisi-ingilizce-egitimi/kanada-vancouver` },
    { label: "İngiltere'de Dil Okulları", href: `${YE}/yurtdisi-ingilizce-egitimi/ingiltere` },
    { label: "Yüksek Öğrenim", href: `${YE}/yuksek-ogrenim` },
    { label: "Yurtdışı Sınav Hazırlık", href: `${YE}/sinav-hazirlik` },
    { label: "Yaz Okulları", href: `${YE}/yaz-okullari` },
    { label: "Pathway Programı", href: `${YE}/pathway-programi` },
    { label: "Work and Travel", href: `${YE}/work-and-travel` },
    { label: "İtalya'da Üniversite", href: `${YE}/tercih/italyadauniversite` },
  ],
};

/* ---------------------------------------------------------------
 * 1 · Work and Travel (pilot)
 *
 * GENEL bilgi — ABD J-1 Summer Work Travel (doğrulandı 2026-09-26):
 * Program, uygunluk (tam zamanlı, en az 1 dönem), en fazla 4 ay, ön yerleştirme, yasak işler:
 *   https://j1visa.state.gov/programs/summer-work-travel · 22 CFR 62.32 https://www.law.cornell.edu/cfr/text/22/62.32
 * 30 günlük "grace period" (çalışılamaz): https://j1visa.state.gov/participants/common-questions/
 * Ücret: federal / eyalet / yerel asgari ücretin yükseği (22 CFR 62.32); federal 7,25 $:
 *   https://www.dol.gov/general/topic/wages/minimumwage — haftalık asgari saat şartı mevzuatta yok
 *   (2017 taslağı yürürlüğe girmedi) → "30 ya da 40 saat" rakamı çıkarıldı.
 * Konaklama: işveren sağlamıyorsa sponsor bulmaya yardım etmekle yükümlü (22 CFR 62.32).
 * SEVIS I-901 SWT 35 $: https://www.ice.gov/sevis/i901/faq · MRV 185 $: travel.state.gov (fees)
 * Başvuru yeri Ankara / İstanbul: https://tr.usembassy.gov/visas-2/
 * Sosyal medya hesapları herkese açık (F, M, J — 19.06.2025): state.gov duyurusu.
 * ------------------------------------------------------------- */

const WAT_H1 = "Yurtdışında Dil Eğitimi Work and Travel (WAT)";
const WAT_JOBS = "Work And Travel'da Nerelerde Çalışabilirim ?";
const WAT_PAY = "Work And Travel İle Ne Kadar Para Kazanabilirim ?";
const WAT_STAY = "Work And Travel’da Nerede Konaklayacağız ?";

const WORK_AND_TRAVEL: SinglePageDef = {
  path: `${YE}/work-and-travel`,
  label: "Work and Travel",
  parent: ABROAD_PARENT,
  meta: { brandSuffix: true, reasons: [BRAND_SUFFIX_REASON] },
  hero: {
    lead: { src: { heading: WAT_H1, take: [0] }, sentence: 0 },
    board: {
      kind: "pass",
      title: "Work and Travel",
      tag: "Yaz tatili",
      from: { code: "IST", name: "İstanbul" },
      to: { code: "USA", name: "Amerika" },
      // Alanlar düzeltilmiş kaynak paragrafının kısaltması: "en fazla 4 ay", "30 gün … seyahat",
      // "asgari ücretin altında olamaz"; uygunluk j1visa.state.gov.
      fields: [
        { label: "Kimler katılır", value: "Üniversite öğrencileri" },
        { label: "Çalışma süresi", value: "En fazla 4 ay" },
        { label: "Program sonrası", value: "30 gün seyahat" },
        { label: "Saat ücreti", value: "En az asgari ücret" },
      ],
      stub: { label: "Vize", value: "J-1 değişim vizesi" },
    },
  },
  sections: [
    {
      id: "kimler-katilabilir",
      title: { added: "Work and Travel'a kimler katılabilir?" },
      answer: { added: "Türkiye'de tam zamanlı okuyan üniversite öğrencileri." },
      blocks: [
        {
          kind: "parts",
          items: [
            { icon: "mezuniyet", name: "Tam zamanlı öğrenci", text: "Üniversite ya da meslek yüksekokulu; son sınıflar da katılabilir", meta: "" },
            { icon: "takvim", name: "En az bir dönem", text: "Okulda en az bir dönemi tamamlamış olmak", meta: "" },
            { icon: "konusma", name: "İngilizce", text: "Mülakatta anlaşılabilecek düzeyde", meta: "" },
            { icon: "belge", name: "İş teklifi", text: "Türkiye'den katılanlar ABD'ye işini bulmuş olarak gider", meta: "" },
          ],
          note: null,
        },
      ],
    },
    {
      id: "takvim",
      title: { added: "Program ne kadar sürer?" },
      answer: { added: "Yaz tatilinde en fazla 4 ay çalışma, ardından 30 gün seyahat." },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: WAT_H1, take: [0] }, sentence: [1, 2] },
          items: [
            { icon: "takvim", title: "Ne zaman", text: "Yaz tatilinde", match: "yaz tatillerinde" },
            { icon: "calisma", title: "Çalışma", text: "En fazla 4 ay, mevsimlik işlerde", match: "en fazla 4 ay" },
            { icon: "dunya", title: "Sonrası", text: "İsteğe bağlı 30 gün seyahat; bu sürede çalışılmaz", match: "30 gün" },
          ],
        },
      ],
    },
    {
      id: "kazanimlar",
      title: { added: "Work and Travel size ne kazandırır?" },
      answer: { added: "Kültür, yaşayarak İngilizce ve yurtdışı tecrübesi." },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: WAT_H1, take: [1] } },
          items: [
            { icon: "dunya", title: "Kültür", text: "Kendi kültürünü tanıtma, farklı kültürleri tanıma" },
            { icon: "konusma", title: "İngilizce", text: "Dilin konuşulduğu ülkede yaşayarak öğrenme", match: "yaşayarak öğrenme" },
            { icon: "kupa", title: "Tecrübe", text: "Kendi masraflarını karşılayarak Amerika'da yaşamak", match: "kendi masraflarınızı karşılayarak" },
          ],
        },
      ],
    },
    {
      id: "isler",
      title: { source: WAT_JOBS },
      answer: { src: { heading: WAT_JOBS, take: [0] }, sentence: 0 },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: WAT_JOBS, take: [0] }, sentence: 1 },
          items: [
            { title: "Oteller", text: "Bellboy, oda temizlik görevlisi" },
            { title: "Alışveriş merkezleri", text: "Kasa veya raf görevlisi" },
            { title: "Eğlence parkları", text: "Bilet satış, temizlik görevlisi" },
            { title: "Restoran ve kafeler", text: "Servis elemanı, bulaşıkçı, aşçı" },
          ],
        },
        {
          kind: "table",
          title: "Programda yapılamayan işler",
          head: ["İş türü", "Örnek"],
          rows: [
            ["Lisans gerektiren işler", "Sertifika ya da meslek lisansı isteyen işler"],
            ["Ev ve bakım işleri", "Ev içi yardımcılık, şoförlük, klinik bakım"],
            ["Gece işleri", "Ağırlıkla 22:00 – 06:00 arasına düşen işler"],
            ["Üretim işleri", "Tarım, madencilik, inşaat, imalat"],
            ["Yalnız komisyonlu işler", "Garantili ücreti olmayan satış işleri"],
          ],
          note: null,
        },
      ],
    },
    {
      id: "ucret",
      title: { source: WAT_PAY },
      answer: { added: "Saat başına ücret alırsınız; en az asgari ücret." },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: WAT_PAY, take: [0] } },
          items: [
            { icon: "ucret", title: "Ücret", text: "Çalıştığınız saat başına", match: "saat başına ücret" },
            { icon: "grup", title: "Masraflar", text: "Konaklama, yeme ve içme bu ücretten karşılanır", match: "konaklama, yeme ve içme" },
          ],
        },
        { kind: "table", head: ["Konu", "Bilgi"], rows: { src: { heading: WAT_PAY, take: [1, 2, 3] } }, note: null },
      ],
    },
    {
      id: "konaklama",
      title: { source: WAT_STAY },
      answer: { src: { heading: WAT_STAY, take: [0] } },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: WAT_STAY, take: [1, 2] } },
          items: [
            { icon: "calisma", title: "İş adresi", text: "Gitmeden yanınızda olsun", match: "iş adresleri" },
            { icon: "konum", title: "Konaklama adresi", text: "Gitmeden yanınızda olsun", match: "konaklama adreslerinin" },
            { icon: "ulasim", title: "Havaalanından ulaşım", text: "Konaklamaya nasıl gideceğinizi bilin", match: "havaalanından konaklamalarına" },
            { icon: "takvim", title: "Ön hazırlık", text: "Gerekirse ayarlamaları Türkiye'deyken yapın", match: "Türkiye’de iken" },
          ],
        },
        {
          kind: "table",
          title: "Sponsor kuruluşun sorumluluğu",
          head: ["Durum", "Ne olur"],
          rows: [
            ["İşveren konaklama sağlamıyorsa", "Sponsor, uygun konaklama bulmanıza yardım etmekle yükümlüdür"],
            ["İş onaylanırken", "Sponsor, bölgede makul fiyatlı konaklama olup olmadığına bakar"],
          ],
          note: null,
        },
      ],
    },
    {
      id: "basvuru",
      title: { added: "Başvuru adım adım nasıl ilerler?" },
      answer: { added: "Başvuru, ABD Dışişleri Bakanlığı'nın yetkilendirdiği bir sponsor kuruluş üzerinden yürür." },
      blocks: [
        {
          kind: "table",
          head: ["Adım", "Ne yapılır"],
          rows: [
            ["1. Sponsor", "Yetkili bir sponsor kuruluşa ya da Türkiye'deki temsilcisine başvurulur."],
            ["2. İş teklifi", "Gitmeden önce işveren bulunur ve iş teklifi alınır."],
            ["3. DS-2019", "Sponsor, J-1 vizesi için gereken DS-2019 belgesini düzenler."],
            ["4. SEVIS ücreti", "I-901 SEVIS ücreti ödenir (Work and Travel için 35 dolar)."],
            ["5. Vize formu", "DS-160 formu doldurulur, vize başvuru ücreti (185 dolar) ödenir."],
            ["6. Mülakat", "ABD Büyükelçiliği Ankara'da ya da Başkonsolosluk İstanbul'da mülakata girilir."],
          ],
          note: "Ücretler 26 Eylül 2026 itibarıyla ABD resmi kaynaklarından alınmıştır; başvurmadan önce güncel tutarı kontrol edin. J-1 başvuranlarından sosyal medya hesaplarını herkese açık yapmaları istenmektedir.",
        },
      ],
    },
    {
      id: "dil-okullari",
      title: { source: "Yurtdışı Dil Okulları" },
      answer: { added: "Work and Travel dışında, İngilizce konuşulan bir ülkede dil okuluna da gidebilirsiniz." },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: "Yurtdışı Dil Okulları" } },
          items: [
            { icon: "mezuniyet", title: "Eğitim ve kariyer", text: "Başarı ve iyi bir kariyer için İngilizce", match: "iyi bir kariyer" },
            { icon: "dunya", title: "Ortak dil", text: "Uluslararası iletişimin dili", match: "uluslararası iletişim dili" },
          ],
        },
        { kind: "subhead", source: "Genel İngilizce" },
        {
          kind: "facets",
          from: { src: { heading: "Genel İngilizce" } },
          items: [
            { icon: "grup", title: "Kimler katılır", text: "Hiç bilmeyen ya da geliştirmek isteyen herkes", match: "Hiç İngilizce bilmeyen veya geliştirmek isteyen" },
            { icon: "takvim", title: "Ne zaman", text: "Yılın herhangi bir zamanında", match: "yılın herhangi bir zamanında" },
            { icon: "kelime", title: "Ne öğrenilir", text: "Dilbilgisi, okuma yazma, anlama ve konuşma" },
            { icon: "sohbet", title: "Derste ve dışarıda", text: "Öğrendiğinizi günlük hayatta kullanırsınız", match: "günlük hayatta İngilizce konuşulması" },
          ],
        },
        { kind: "subhead", source: "Genel İngilizce Programlarında Öğrenciler" },
        {
          kind: "facets",
          from: { src: { heading: "Genel İngilizce Programlarında Öğrenciler" } },
          items: [
            { icon: "soru", title: "Seviye tespiti", text: "Kurstan önce sınıfınız belirlenir", match: "seviye tespit sınavına" },
            { icon: "puan", title: "Aylık değerlendirme", text: "Genellikle ayda bir kez sınav", match: "ayda bir kez" },
            { icon: "grup", title: "Çok kültürlü sınıf", text: "Farklı kültürlerden arkadaşlar", match: "Çok kültürlü bir ortamda" },
          ],
        },
      ],
    },
  ],
  branches: null,
  related: [ABROAD_RELATED],
  cta: { title: "Work and Travel planınızı birlikte yapalım", sub: "Program, başvuru adımları ve belgeler için size en yakın şubemizle konuşun." },
  sources: [
    "ABD Dışişleri Bakanlığı — J-1 Summer Work Travel (j1visa.state.gov)",
    "22 CFR 62.32 — Summer Work Travel mevzuatı",
    "ABD Çalışma Bakanlığı — Federal asgari ücret (dol.gov)",
    "ABD Göç ve Gümrük — SEVIS I-901 ücretleri (ice.gov)",
    "ABD Türkiye Büyükelçiliği — Vize başvurusu (tr.usembassy.gov)",
  ],
  updated: UPDATED,
  headingEdits: {
    // Yazım: soru işaretinden önce boşluk, "And" büyük harf.
    [WAT_JOBS]: "Work and Travel'da nerelerde çalışabilirim?",
    [WAT_PAY]: "Work and Travel ile ne kadar para kazanabilirim?",
    [WAT_STAY]: "Work and Travel'da nerede konaklayacağız?",
  },
  edits: {
    // GENEL bilgi düzeltmesi: "4 yıllık" şartı yok (tam zamanlı, en az 1 dönem, ön lisans dahil); süre en fazla
    // 4 ay; "1 ay tatil" = DS-2019 bitişinden sonraki 30 gün (j1visa.state.gov, 22 CFR 62.32). "imkanı" → "imkânı".
    "Work and travel programı, ABD tarafından hazırlanmış dünyanın çeşitli bölgelerinden ve kültürlerinden binlerce öğrenciye Amerika’da yasal olarak barınma ve çalışma imkanı sağlayan bir kültür değişim programıdır. Bu program sayesinde 4 yıllık üniversite öğrencileri yaz tatillerinde yaklaşık 3 ay basit işlerde yasal olarak çalışabilir. Bu 3 aylık sürecin sonunda da isteğe bağlı olarak 1 ay tatil yapma hakkı kazanırlar.":
      "Work and travel programı, ABD Dışişleri Bakanlığı'nın J-1 değişim vizesi kapsamında yürüttüğü, dünyanın çeşitli bölgelerinden ve kültürlerinden binlerce öğrenciye Amerika’da yasal olarak barınma ve çalışma imkânı sağlayan bir kültür değişim programıdır. Bu program sayesinde üniversite öğrencileri yaz tatillerinde en fazla 4 ay boyunca mevsimlik işlerde yasal olarak çalışabilir. Çalışma süresinin sonunda isteğe bağlı olarak 30 gün Amerika’da kalıp seyahat etme hakkı kazanırlar.",
    // GENEL: mevzuat "kalifiye olmayan" demez — mevsimlik / geçici işler (22 CFR 62.32). Noktalama: iş yeri → iş listesi.
    "Çalışma olanağı sadece kalifiye olmayan işlerde sağlanmaktadır. Örnek vermek gerekirse otellerde, bellboy, oda temizlik görevlisi, alış veriş merkezlerinde, kasa veya raf görevlisi, eğlence parklarında, bilet satış, temizlik görevlisi, restoran ve kafelerde, servis elemanı, temizlik görevlisi, bulaşıkçı, aşçı gibi işlerde çalışma olanağı vardır.":
      "Çalışma olanağı mevsimlik ya da geçici, çoğunlukla uzmanlık gerektirmeyen işlerde sağlanmaktadır. Örnek vermek gerekirse otellerde bellboy, oda temizlik görevlisi; alışveriş merkezlerinde kasa veya raf görevlisi; eğlence parklarında bilet satış, temizlik görevlisi; restoran ve kafelerde servis elemanı, temizlik görevlisi, bulaşıkçı, aşçı gibi işlerde çalışma olanağı vardır.",
    // Yazım: "para ücret".
    "Öğrenciler çalıştıkları saat başına para ücret alarak, Amerika’da kaldıkları süre boyunca konaklama, yeme ve içme gibi masraflarını karşılayabilirler.":
      "Öğrenciler çalıştıkları saat başına ücret alarak, Amerika’da kaldıkları süre boyunca konaklama, yeme ve içme gibi masraflarını karşılayabilirler.",
    // GENEL: 6 $ yasal olarak mümkün değil; federal asgari 7,25 $, eyalet/yerel asgari daha yüksekse o (dol.gov, 22 CFR 62.32).
    // Ücret satırları tablo hücresine (" | ") bölündü — olgu aynı.
    "Saat ücretleri 6-9 dolar arasında değişebilimektedir.":
      "Saat ücreti | Federal, eyalet ya da yerel asgari ücretten yüksek olanın altında olamaz; federal asgari ücret saatte 7,25 dolardır, birçok eyalette daha yüksektir.",
    "Saat ücreti genelde yapılan işin yoğunluğuna, işyerinin bulunduğu bölgeye ve koşullarına bağlı olarak değişmektedir.":
      "Neye göre değişir | Saat ücreti genelde yapılan işin yoğunluğuna, işyerinin bulunduğu bölgeye ve koşullarına bağlı olarak değişmektedir.",
    // GENEL: mevzuatta haftalık asgari saat yok; rakam doğrulanamadı → saat iş teklifinde yazar.
    "Genelde öğrenciler haftada 30 yada 40 saat çalışabilmektedir.": "Haftalık saat | Haftalık çalışma saati iş teklifinde belirtilir.",
    // Yazım: "basarı", "surede".
    "Kursa başlamadan önce seviye tespit sınavına tabi tutulur ve hangi sınıfa gidecekleri belirlenir. Kursun başlangıcından itibaren genellikle ayda bir kez yapılan değerlendirme sınavlarında öğrencilerin basarı seyri incelenir.":
      "Kursa başlamadan önce seviye tespit sınavına tabi tutulur ve hangi sınıfa gidecekleri belirlenir. Kursun başlangıcından itibaren genellikle ayda bir kez yapılan değerlendirme sınavlarında öğrencilerin başarı seyri incelenir.",
    "Çok kültürlü bir ortamda alınan eğitim kısa surede basarının yanı sıra farklı kültürleri tanıma ve o kültürlerden kişilerle arkadaşlık kurma fırsatı da sunar.":
      "Çok kültürlü bir ortamda alınan eğitim kısa sürede başarının yanı sıra farklı kültürleri tanıma ve o kültürlerden kişilerle arkadaşlık kurma fırsatı da sunar.",
  },
  ignored: ABROAD_MENU,
};

/* ---------------------------------------------------------------
 * 2 · Yetişkinler için İngilizce Dil Kursları (Kaplan)
 *
 * Kaplan'a ait rakamlar (80 yıl, 37 okul, 50 millet, %97) kaynaktaki gibi — kullanıcı kararı
 * 2026-09-26: "olduğu gibi bırak" (araştırma: 1938'den beri, 4 ülkede 18 İngilizce okulu, 150+ millet,
 * %96 tavsiye — kaplaninternational.com; Kaplan dil okulları 1 Mayıs 2026'da Inspirit Capital'e geçti).
 * ------------------------------------------------------------- */

const ADULT_H1 = "Yetişkinler için İngilizce Dil Kursları";
const ADULT_WHY = "Neden Kaplan Dil Okulları’nda İngilizce Öğrenmelisiniz?";
const ADULT_PATH = `${YE}/yurtdisi-ingilizce-egitimi`;

const ADULT_ENGLISH: SinglePageDef = {
  path: ADULT_PATH,
  label: "Yetişkinler için İngilizce",
  parent: ABROAD_PARENT,
  meta: { brandSuffix: true, reasons: [BRAND_SUFFIX_REASON] },
  hero: {
    lead: { src: { heading: ADULT_H1, take: [0] }, sentence: 0 },
    board: {
      kind: "pass",
      title: "Yetişkinler için İngilizce",
      tag: "Kaplan dil okulları",
      from: { code: "IST", name: "İstanbul" },
      to: { code: "LON", name: "Londra, New York…" },
      // "Genel İngilizce Kursları, Sınav Hazırlık …, İş İngilizcesi …, Uzun Dönem" · "farklı başlangıç tarihleri" ·
      // "Londra, Sydney, New York veya Los Angeles" · "18 yaş altı kurslar … genç öğrenciler" · "37 dil okulumuzdan"
      fields: [
        { label: "Kurslar", value: "Genel, sınav, iş, uzun dönem" },
        { label: "Başlangıç", value: "Farklı tarihler" },
        { label: "Şehirler", value: "Londra, Sydney, New York, Los Angeles" },
        { label: "Kimler için", value: "18 yaş üstü" },
      ],
      stub: { label: "Okullar", value: "37 dil okulu" },
    },
  },
  sections: [
    {
      id: "kurslar",
      title: { added: "Hangi kursları seçebilirsiniz?" },
      answer: { added: "Genel İngilizce, sınav hazırlık, iş İngilizcesi ya da uzun dönem." },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: ADULT_H1, take: [0] }, sentence: 1 },
          items: [
            { icon: "sohbet", title: "Genel İngilizce", text: "Her seviyeye günlük İngilizce", match: "Genel İngilizce Kursları" },
            { icon: "puan", title: "Sınav hazırlık", text: "Uluslararası sınavlara hazırlık", match: "Sınav Hazırlık Kursları" },
            { icon: "calisma", title: "İş İngilizcesi", text: "İş hayatında İngilizce", match: "İş İngilizcesi Kursları" },
            { icon: "takvim", title: "Uzun dönem", text: "Uzun süreli, yoğun ilerleme", match: "Uzun Dönem kurslar" },
          ],
        },
      ],
    },
    {
      id: "nerede-ne-zaman",
      title: { added: "Nerede ve ne zaman başlayabilirsiniz?" },
      answer: { added: "Dünya çapındaki okullardan birinde, size uygun bir tarihte." },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: ADULT_H1, take: [1] } },
          items: [
            { icon: "konum", title: "Şehirler", text: "Londra, Sydney, New York, Los Angeles" },
            { icon: "takvim", title: "Başlangıç", text: "Farklı başlangıç tarihleri" },
            { icon: "saat", title: "Süre", text: "Amacınıza göre ayarlanır", match: "farklı sürelerde ayarlanabilir" },
            { icon: "ekran", title: "K+ yöntemi", text: "Teknoloji destekli eğitim", match: "K+ eğitim metodu" },
          ],
        },
      ],
    },
    {
      id: "kimler-icin",
      title: { added: "Bu kurslar kimler için?" },
      answer: { added: "18 yaş üstü yetişkinler; gençler için ayrı programlar var." },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: ADULT_H1, take: [8] } },
          items: [
            { icon: "calisma", title: "Kariyer", text: "İş hayatındaki fırsatlar için", match: "iş hayatındaki fırsatları" },
            { icon: "dunya", title: "Deneyim", text: "Dünyayı gezerek öğrenmek", match: "dünyayı gezerek" },
            { icon: "grup", title: "18 yaş altı", text: "Genç öğrenci kursları ayrı", match: "18 yaş altı" },
          ],
        },
        {
          kind: "links",
          items: [
            { label: "Yaz Okulları (12–17 yaş)", href: `${YE}/yaz-okullari` },
            { label: "Kanada Vancouver'da Yaşamak", href: `${ADULT_PATH}/kanada-vancouver` },
            { label: "İngiltere'de Dil Okulları", href: `${ADULT_PATH}/ingiltere` },
          ],
        },
      ],
    },
    {
      id: "neden-kaplan",
      title: { source: ADULT_WHY },
      answer: { added: "Kaplan'ın kendi verileriyle:" },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: ADULT_WHY } },
          items: [
            { title: "80 yıl", text: "Eğitim tecrübesi", match: "80 yıllık" },
            { title: "37 okul", text: "Amerika, İngiltere, Avustralya, Kanada, İrlanda, Yeni Zelanda" },
            { title: "50 millet", text: "Uluslararası öğrenci topluluğu", match: "50 farklı milletten" },
            { title: "%97", text: "Öğrenci memnuniyeti", match: "%97 öğrenci memnuniyet" },
          ],
        },
      ],
    },
  ],
  branches: null,
  related: [ABROAD_RELATED],
  cta: { title: "Yurtdışında İngilizce planınızı birlikte yapalım", sub: "Şehir, kurs türü ve başlangıç tarihi için size en yakın şubemizle konuşun." },
  sources: [],
  updated: UPDATED,
  edits: {
    // Yazım: "alman isteyen".
    "İngilizce konuşulan bir ülkede dil eğitimi alman isteyen öğrenciler için geniş çapta İngilizce dil kursları sunuyoruz. Uluslararası eğitim kurumları tarafından akredite edilmiş Genel İngilizce Kursları, Sınav Hazırlık Kursları, İş İngilizcesi Kursları veya Uzun Dönem kurslar arasından seçim yapabilirsiniz.":
      "İngilizce konuşulan bir ülkede dil eğitimi almak isteyen öğrenciler için geniş çapta İngilizce dil kursları sunuyoruz. Uluslararası eğitim kurumları tarafından akredite edilmiş Genel İngilizce Kursları, Sınav Hazırlık Kursları, İş İngilizcesi Kursları veya Uzun Dönem kurslar arasından seçim yapabilirsiniz.",
    // Yazım: dipnot kalıntısı "1".
    "Amerika, İngiltere, Avustralya, Kanada, İrlanda, Yeni Zelanda'da 37 İngilizce dil okulu1": "Amerika, İngiltere, Avustralya, Kanada, İrlanda, Yeni Zelanda'da 37 İngilizce dil okulu",
  },
  ignored: ABROAD_MENU,
};

/* ---------------------------------------------------------------
 * 3 · Kanada Vancouver'da yaşamak
 *
 * GENEL bilgi (doğrulandı 2026-09-26):
 * İklim — YVR normalleri 1981-2010 (ECCC): 8,7 karlı gün, 168,9 yağışlı gün, Temmuz ort. en yüksek 22,2 °C,
 *   Ocak ort. 4,1 °C; rekor 34,4 °C → "35 dereceye ulaşabiliyor" düzeltildi. https://api.weather.gc.ca/collections/climate-normals
 * Compass Card yalnız TransLink (Metro Vancouver); BC Ferries ve Seattle ayrı bilet: https://www.translink.ca/transit-fares/compass-card
 * Göçmen nüfusu — 2021 Sayımı BC 2. (1,43 milyon); yeni göçmenlerin %64,2'si 25-54 yaş:
 *   https://www150.statcan.gc.ca/n1/daily-quotidien/221026/dq221026a-eng.htm
 * İşgücü — Ağustos 2026 LFS: BC işsizlik %6,5, istihdam %60,9; Kanada %6,4 / %60,8 → "en yüksek istihdam, %4
 *   en düşük" düzeltildi: https://www150.statcan.gc.ca/n1/daily-quotidien/260904/mc-a001-eng.htm
 * "Şehrin yarısından fazlası göçmen" doğrulanmadı → oran çıkarıldı.
 * 6 aya kadar kurs için öğrenci izni gerekmez (IRCC, 09.09.2026); Türk vatandaşı ziyaretçi vizesi alır, eTA yok:
 *   https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/eligibility/study-without-permit.html
 * Whytecliff Park (yazım; Kanada'nın ilk deniz koruma alanı, 1993): https://westvancouver.ca/parks-recreation/parks-trails/whytecliff-park
 * ------------------------------------------------------------- */

const VAN_H1 = "Kanada Vancouver’da yaşamak";
const VAN_CLIMATE = "İklim koşulları";
const VAN_TRANSIT = "Gelişmiş toplu taşıma sistemi ve Güvenlik";
const VAN_FOOD = "Sağlıklı yiyecek seçenekleri";
const VAN_JOBS = "Kolay iş bulma olanağı";
const VAN_FUN = "Çok sayıda gezilecek görülecek yer ve eğlenceli aktiviteler";

const VANCOUVER: SinglePageDef = {
  path: `${ADULT_PATH}/kanada-vancouver`,
  label: "Kanada Vancouver",
  parent: { label: "Yetişkinler için İngilizce", href: ADULT_PATH },
  meta: {
    title: "Kanada Vancouver'da Yaşamak | Yurtdışı Dil Eğitimi",
    description:
      "Kanada Vancouver’da yaşamak; dil eğitimi, üniversite hazırlık, kültürel yaşam, konaklama ve öğrencilere yönelik danışmanlık hizmetleriyle rehberlik",
    reasons: [
      "title: kaynak 163 karakterlik anahtar kelime listesi (tüm yurtdışı sayfalarında aynı) — sayfanın konusuyla yeniden yazıldı.",
      "description: 156 karakter (≤155) — \"kapsamlı\" çıkarıldı.",
    ],
  },
  hero: {
    lead: { src: { heading: VAN_H1, take: [0] }, sentence: 0 },
    board: {
      kind: "pass",
      title: "Vancouver'da yaşamak",
      tag: "British Columbia",
      from: { code: "IST", name: "İstanbul" },
      to: { code: "YVR", name: "Vancouver" },
      fields: [
        { label: "İklim", value: "Ilıman, bol yağmurlu" },
        { label: "Temmuz ort. en yüksek", value: "22 °C civarı" },
        { label: "Ulaşım", value: "Compass Card" },
        { label: "Vize", value: "Ziyaretçi vizesi" },
      ],
      stub: { label: "6 aya kadar kurs", value: "Öğrenci izni gerekmez" },
    },
  },
  sections: [
    {
      id: "iklim",
      title: { source: VAN_CLIMATE },
      answer: { src: { heading: VAN_H1, take: [0] }, sentence: 1 },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: VAN_CLIMATE } },
          items: [
            { icon: "dunya", title: "Yağmur", text: "Bol yağmur; adı Raincouver", match: "Raincouver" },
            { icon: "saat", title: "Yaz", text: "Ortalama en yüksek 22 °C", match: "22 derece" },
            { icon: "takvim", title: "Kış", text: "Dondurucu soğuk olmaz", match: "dondurucu seviyelere düşmüyor" },
            { icon: "aktivite", title: "Doğa", text: "Plaj, bisiklet, kayak, snowboard", match: "kayak ya da snowboard" },
          ],
        },
        {
          kind: "table",
          title: "Vancouver'ın iklimi (havalimanı ölçümleri)",
          head: ["Ölçüm", "Değer"],
          rows: [
            ["Yağışlı gün", "Yılda yaklaşık 169 gün"],
            ["Karlı gün", "Yılda yaklaşık 9 gün"],
            ["Temmuz ortalama en yüksek", "22,2 °C"],
            ["Ocak ortalaması", "4,1 °C"],
          ],
          note: "Kanada Çevre Bakanlığı (ECCC) iklim normalleri.",
        },
      ],
    },
    {
      id: "ulasim",
      title: { source: VAN_TRANSIT },
      answer: { added: "Güvenli bir şehir; Compass Card ile Metro Vancouver'ın her yerine ulaşılır." },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: VAN_TRANSIT } },
          items: [
            { icon: "konum", title: "Güvenlik", text: "Suç oranı düşük", match: "Suç oranı oldukça düşük" },
            { icon: "belge", title: "Compass Card", text: "SkyTrain istasyonlarından alınır", match: "Skytrain istasyonlarından" },
            { icon: "ulasim", title: "Kapsam", text: "Tren, otobüs ve SeaBus", match: "SeaBus" },
            { icon: "dunya", title: "Şehir dışı", text: "Vancouver Adası ve Seattle için ayrı bilet", match: "ayrı bilet" },
          ],
        },
      ],
    },
    {
      id: "yemek",
      title: { source: VAN_FOOD },
      answer: { added: "Brunch kültürü ve dünya mutfakları." },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: VAN_FOOD } },
          items: [
            { icon: "grup", title: "Brunch", text: "Arkadaşlarla buluşmanın adresi", match: "Brunch buluşmalarına" },
            { icon: "kupa", title: "Kahve", text: "Çoğu zaman sınırsız", match: "kahve çoğu zaman sınırsız" },
            { icon: "dunya", title: "Dünya mutfağı", text: "Aradığınız her türlü yiyecek", match: "her türlü yiyeceği" },
          ],
        },
      ],
    },
    {
      id: "is",
      title: { source: VAN_JOBS },
      answer: { added: "Göçmenlere ve uluslararası öğrencilere açık bir şehir." },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: VAN_JOBS } },
          items: [
            { icon: "grup", title: "Göçmen nüfusu", text: "Kanada'da ikinci sırada", match: "ikinci en büyük göçmen nüfusuna" },
            { icon: "mezuniyet", title: "Üniversite", text: "Dil öğrencileri kolayca kabul alabiliyor", match: "kabul alabiliyor" },
            { icon: "calisma", title: "İşsizlik", text: "%6,5 (Ağustos 2026)", match: "yüzde 6,5" },
            { icon: "puan", title: "İstihdam oranı", text: "%60,9 (Ağustos 2026)", match: "yüzde 60,9" },
          ],
        },
      ],
    },
    {
      id: "gezilecek-yerler",
      title: { source: VAN_FUN },
      answer: { src: { heading: VAN_FUN, take: [0] }, sentence: 0 },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: VAN_FUN, take: [0, 1] } },
          items: [
            { title: "Stanley Park", text: "Şehrin ünlü parkı", match: "Stanley Park" },
            { title: "Granville Island", text: "Çarşı ve pazar yeri", match: "Granville Island" },
            { title: "Grouse Mountain", text: "Kayak ve yürüyüş", match: "Grouse Mountain" },
            { title: "Lynn Canyon", text: "Asma köprüsüyle kanyon", match: "Lynn Canyon" },
            { title: "Whytecliff Park", text: "Kanada'nın ilk deniz koruma alanı", match: "Whytecliff Park" },
            { title: "Şehir merkezi", text: "Alışveriş ve hareketli şehir hayatı", match: "alışveriş merkezlerinden" },
          ],
        },
      ],
    },
    {
      id: "vize",
      title: { added: "Vancouver'da dil okulu için vize gerekir mi?" },
      answer: { added: "Türk vatandaşları ziyaretçi vizesi alır; 6 aya kadar kurs için öğrenci izni gerekmez." },
      blocks: [
        {
          kind: "table",
          head: ["Kurs süresi", "Gereken belge"],
          rows: [
            ["6 aya kadar", "Öğrenci izni gerekmez; ziyaretçi vizesi (TRV)"],
            ["6 aydan uzun", "Öğrenci izni (study permit); Kanada'nın öğrenci kotası ve eyalet onay mektubu kuralları geçerli"],
          ],
          note: "Türk vatandaşları Kanada'ya eTA ile giremez; ziyaretçi vizesinde biyometri genelde zorunludur (IRCC, Eylül 2026).",
        },
      ],
    },
  ],
  branches: null,
  related: [ABROAD_RELATED],
  cta: { title: "Vancouver'da dil okulu planınızı birlikte yapalım", sub: "Okul, konaklama ve vize adımları için size en yakın şubemizle konuşun." },
  sources: [
    "Kanada Çevre ve İklim Değişikliği Bakanlığı — Vancouver iklim normalleri (ECCC)",
    "TransLink — Compass Card (translink.ca)",
    "Statistics Canada — 2021 Nüfus Sayımı, İşgücü Anketi Ağustos 2026",
    "Kanada Göç Bakanlığı (IRCC) — Öğrenci izni olmadan eğitim, giriş şartları",
    "West Vancouver Belediyesi — Whytecliff Park",
  ],
  updated: UPDATED,
  headingEdits: {
    [VAN_TRANSIT]: "Gelişmiş toplu taşıma sistemi ve güvenlik",
  },
  edits: {
    // Kopyala-yapıştır: paragrafın ikinci yarısı ilk cümlenin tekrarı (ikinci paragraf da aynı tekrar → ignored).
    "Vancouver’da yaşamak benzersiz bir deneyimdir ve ister öğrenci olarak ister çalışmak için olsun, bu şehrin buraya gelen herkese sunacağı bir şey vardır. Yılda sadece birkaç gün kar yağışı gören ve Kanada’nın en ılıman bölgesi olan British Columbia’da yer alan Vancouver’da öğrenci olmanın avantajlarını sizler için sıraladık; Vancouver’da yaşamak benzersiz bir deneyimdir ve ister öğrenci olarak ister çalışmak için olsun.":
      "Vancouver’da yaşamak benzersiz bir deneyimdir ve ister öğrenci olarak ister çalışmak için olsun, bu şehrin buraya gelen herkese sunacağı bir şey vardır. Yılda sadece birkaç gün kar yağışı gören ve Kanada’nın en ılıman bölgesi olan British Columbia’da yer alan Vancouver’da öğrenci olmanın avantajlarını sizler için sıraladık.",
    // GENEL: rekor 34,4 °C, Temmuz ort. en yüksek 22,2 °C (ECCC); yılda ~9 karlı gün → "Kar yağmıyor" → "pek yağmıyor".
    // Yazım: "Kanada’lıların da çoğu da".
    "Tamam yalan söylemeyeceğiz. Kar yağmıyor ama bol miktarda yağmur yağıyor. Hatta insanlar bazen Raincouver diye adlandırıyorlar şehirlerini. Öte yandan yağmur bir sorun olmaktan ziyade şehrin doğal güzelliğini daha da gözler önüne seriyor. Yazın sıcaklık 35 dereceye ulaşabiliyor. Vancouver’ın güzel plajlarından birinde kendinizi okyanus sularına atmak için ya da bisiklet turuna çıkmak için mükemmel bir fırsat. Yılın en soğuk aylarında bile sıcaklık dondurucu seviyelere düşmüyor. Yakınlardaki dağlarda kayak ya da snowboard yapabilirsiniz. Kanada’lıların da çoğu da dört mevsimi yaşamak için burayı tercih ediyor.":
      "Tamam yalan söylemeyeceğiz. Kar pek yağmıyor ama bol miktarda yağmur yağıyor. Hatta insanlar bazen Raincouver diye adlandırıyorlar şehirlerini. Öte yandan yağmur bir sorun olmaktan ziyade şehrin doğal güzelliğini daha da gözler önüne seriyor. Yazın ortalama en yüksek sıcaklık 22 derece civarındadır, sıcak günlerde 30 dereceyi geçebilir. Vancouver’ın güzel plajlarından birinde kendinizi okyanus sularına atmak için ya da bisiklet turuna çıkmak için mükemmel bir fırsat. Yılın en soğuk aylarında bile sıcaklık dondurucu seviyelere düşmüyor. Yakınlardaki dağlarda kayak ya da snowboard yapabilirsiniz. Kanadalıların çoğu da dört mevsimi yaşamak için burayı tercih ediyor.",
    // GENEL: Compass Card BC Ferries'te ve Seattle'a geçmez (TransLink). Yazım: "Metro Vancouver ın".
    "Vancouver’a geldiğinizde, dünyanın seyahat etmek, eğitim almak, çalışmak ya da yaşamak için en güvenli şehirlerinden birinde olduğunuzu hemen anlayacaksınız. Suç oranı oldukça düşük ve dolayısıyla özellikle de tek başına gelenler için çok doğru bir tercih. Burada yaşamaya başladığınızda toplu taşımanın ne kadar efektif ve güvenli olduğunu fark edeceksiniz. Skytrain istasyonlarından birinde edinebileceğiniz Compass Card ile tren ya da otobüs ile Metro Vancouver ın her köşesine ulaşabilirsiniz, hatta Vancouver Adası ve Seattle’a bile.":
      "Vancouver’a geldiğinizde, dünyanın seyahat etmek, eğitim almak, çalışmak ya da yaşamak için en güvenli şehirlerinden birinde olduğunuzu hemen anlayacaksınız. Suç oranı oldukça düşük ve dolayısıyla özellikle de tek başına gelenler için çok doğru bir tercih. Burada yaşamaya başladığınızda toplu taşımanın ne kadar efektif ve güvenli olduğunu fark edeceksiniz. Skytrain istasyonlarından birinde edinebileceğiniz Compass Card ile tren, otobüs ya da SeaBus ile Metro Vancouver’ın her köşesine ulaşabilirsiniz; Vancouver Adası ve Seattle için ise ayrı bilet gerekir.",
    // GENEL: "yarısından fazlası göçmen" doğrulanmadı → oran çıkarıldı.
    "Vancouver’da yaşayacaksanız Brunch buluşmalarına hazır olun. Cafe ve restaurantların önünde göreceğiniz uzun kuyruklar büyük ihtimal brunch için olacak. Arkadaşlarınızla buluşup güzel vakit geçirmek için eşsiz bir fırsat. Güzel haber; kahve çoğu zaman sınırsız! Bu şehrin yarısından fazlası dünyanın farklı yerlerinden gelen göçmenler olduğu için aradığınız her türlü yiyeceği bulacağınızdan emin olabilirsiniz.":
      "Vancouver’da yaşayacaksanız Brunch buluşmalarına hazır olun. Kafe ve restoranların önünde göreceğiniz uzun kuyruklar büyük ihtimal brunch için olacak. Arkadaşlarınızla buluşup güzel vakit geçirmek için eşsiz bir fırsat. Güzel haber; kahve çoğu zaman sınırsız! Şehirde dünyanın farklı yerlerinden gelen çok sayıda göçmen yaşadığı için aradığınız her türlü yiyeceği bulacağınızdan emin olabilirsiniz.",
    // GENEL: yaş aralığı 25-44 doğrulanmadı (resmi: yeni göçmenlerin %64,2'si 25-54); "en yüksek istihdam, %4 en düşük
    // işsizlik" eskimiş → Ağustos 2026 LFS. Yazım: "uluslar arası", "biyo çeşitliliği".
    "Burayı bir cazibe merkezi yapan etmenlerden birisi de şehrin göçmenlere ve uluslar arası öğrencilere açık olması. Doğal güzelliği biyo çeşitliliği ve hareketli şehir yaşamı ile buraya geleni yerleşmeye ikna ediyor. British Columbia Kanada’nın ikinci en büyük göçmen nüfusuna sahip eyaleti ve yeni gelenlerin yaş aralığı 25 ile 44. Buraya İngilizce öğrenmek için gelen öğrenciler kolaylıkla bir üniversiteden kabul alabiliyor. British Columbia aynı zamanda Kanada’nın en yüksek istihdam oranına sahip eyaleti. İşsizlik oranı sadece yüzde 4 ile tüm ülkedeki en düşük oran. Profesyonel geçmişiniz ne olursa olsun Vancouver’da iş bulabileceğinizden emin olun.":
      "Burayı bir cazibe merkezi yapan etmenlerden birisi de şehrin göçmenlere ve uluslararası öğrencilere açık olması. Doğal güzelliği, biyoçeşitliliği ve hareketli şehir yaşamı ile buraya geleni yerleşmeye ikna ediyor. British Columbia Kanada’nın ikinci en büyük göçmen nüfusuna sahip eyaleti; Kanada'ya yeni gelen göçmenlerin çoğu 25 ile 54 yaş arasında. Buraya İngilizce öğrenmek için gelen öğrenciler kolaylıkla bir üniversiteden kabul alabiliyor. Ağustos 2026 itibarıyla British Columbia'da işsizlik oranı yüzde 6,5, istihdam oranı yüzde 60,9 (Kanada geneli: yüzde 6,4 ve yüzde 60,8). Profesyonel geçmişiniz ne olursa olsun Vancouver’da iş bulabileceğinizden emin olun.",
    // Yazım: "snowborad".
    "Burada herkese göre bir eğlence var. İster hiking yapın ister snowborad yapın isterseniz de şehir merkezindeki çok sayıda alışveriş merkezlerinden birinde vakit geçirin. Vancouver’da eğitim görürken çok sayıda arkadaş edineceksiniz. Onlarla birlikte görebileceğiniz yerlerden bazıları şöyle:":
      "Burada herkese göre bir eğlence var. İster hiking yapın ister snowboard yapın isterseniz de şehir merkezindeki çok sayıda alışveriş merkezlerinden birinde vakit geçirin. Vancouver’da eğitim görürken çok sayıda arkadaş edineceksiniz. Onlarla birlikte görebileceğiniz yerlerden bazıları şöyle:",
    // Yazım: "Whytcliff" → Whytecliff; Lynn Canyon'un asma köprüsü ayrı yer değil.
    "Stanley Park, Granville Island, Grouse Mountain, Lynn Canyon, Suspension Bridge, Whytcliff Park":
      "Stanley Park, Granville Island, Grouse Mountain, Lynn Canyon (Suspension Bridge), Whytecliff Park",
  },
  ignored: [
    ...ABROAD_MENU,
    {
      line: "Bu şehrin buraya gelen herkese sunacağı bir şeyi vardır. Yılda sadece birkaç gün kar yağışı gören ve Kanada’nın en ılıman bölgesi olan British Columbia’da yer alan Vancouver’da öğrenci olmanın avantajlarını sizler için sıraladık;",
      reason: "Önceki paragrafın kopyala-yapıştır tekrarı (aynı iki cümle).",
    },
  ],
};

/* ---------------------------------------------------------------
 * 4 · İngiltere'de Dil Okulları (eski adres …/kanada-vancouver-2 → 301, kullanıcı kararı 2026-09-26)
 *
 * GENEL bilgi (doğrulandı 2026-09-26):
 * English UK 2026 raporu (2025): 287 merkezde 327.883 öğrenci, Türkiye 3. kaynak pazar → "50 binden fazla" düzeltildi:
 *   https://www.englishuk.com/facts-figures
 * Accreditation UK (British Council) denetim raporları kamuya açık:
 *   https://www.britishcouncil.org/education/accreditation/centres
 * "Equals" → Eaquals (https://www.eaquals.org/accreditation/); English UK akredite okulların birliği; IALC; Quality English.
 * Okullar (resmi siteler, 09/2026): Stafford House — Londra, Cambridge, Canterbury (Brighton yok); Oxford International —
 *   Edinburgh da var; Kings ve LSI doğru. "%15 ile %35 indirim" doğrulanamadı → oran çıkarıldı.
 * Vize: 6 aya kadar Standard Visitor 135 £ (https://www.gov.uk/standard-visitor/visit-to-study); 6-11 ay Short-term
 *   study visa 228 £ + IHS, 16+ (https://www.gov.uk/visa-to-study-english); Türk vatandaşı ETA alamaz.
 * ------------------------------------------------------------- */

const UK_H1 = "İngiltere'de Dil Okulları";
const UK_SCHOOLS = "İngiltere'de hangi okullar ingilizce dil eğitimi veriyor ?";

const ENGLAND: SinglePageDef = {
  path: `${ADULT_PATH}/ingiltere`,
  source: `${ADULT_PATH}/kanada-vancouver-2`,
  label: "İngiltere",
  parent: { label: "Yetişkinler için İngilizce", href: ADULT_PATH },
  meta: {
    title: "İngiltere'de Dil Okulları | Yurtdışı İngilizce Eğitimi",
    description:
      "İngiltere’de yurtdışı eğitim; İngilizce kursları, sınav hazırlık, yaz okulları ve üniversiteye hazırlık programlarıyla kapsamlı dil eğitimi.",
    reasons: [
      "title: kaynak 163 karakterlik anahtar kelime listesi (tüm yurtdışı sayfalarında aynı) — sayfanın konusuyla yeniden yazıldı.",
      "description: ilk harf eksik (\"ngiltere’de\") — düzeltildi.",
    ],
  },
  hero: {
    lead: { src: { heading: UK_H1, take: [0] }, sentence: 0 },
    board: {
      kind: "pass",
      title: "İngiltere'de dil okulu",
      tag: "Aile yanı ya da yurt",
      from: { code: "IST", name: "İstanbul" },
      to: { code: "LON", name: "Londra, Oxford, Brighton…" },
      fields: [
        { label: "Öğrenci sayısı", value: "2025'te 327 bin+" },
        { label: "Denetim", value: "Accreditation UK" },
        { label: "6 aya kadar", value: "Ziyaretçi vizesi" },
        { label: "Konaklama", value: "Aile yanı, yurt, öğrenci evi" },
      ],
      stub: { label: "Türkiye", value: "En çok öğrenci gönderen 3. ülke" },
    },
  },
  sections: [
    {
      id: "neden-ingiltere",
      title: { added: "İngiltere'deki dil okulları neden tercih ediliyor?" },
      answer: { added: "Köklü deneyim ve düzenli, herkese açık denetim." },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: UK_H1, take: [0] } },
          items: [
            { icon: "grup", title: "327 bin+ öğrenci", text: "2025'te (English UK)", match: "327 binden fazla" },
            { icon: "kupa", title: "Deneyim", text: "Yaklaşık yüzyıllık", match: "yüzyıllık deneyimi" },
            { icon: "belge", title: "Denetim", text: "Eğitim, konaklama, sosyal olanaklar", match: "konaklama, fiziksel koşullar" },
            { icon: "okuma", title: "Açık raporlar", text: "Denetim raporları herkese açık", match: "kamuya açık" },
          ],
        },
      ],
    },
    {
      id: "akreditasyon",
      title: { added: "Okulun akredite olması neden önemli?" },
      answer: { added: "Vizeyle gelen öğrenci yalnız akredite okula kabul edilir." },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: UK_H1, take: [2] } },
          items: [
            { title: "British Council", text: "Accreditation UK programını yürütür", match: "British Council" },
            { title: "English UK", text: "Akredite okulların ulusal birliği", match: "English UK" },
            { title: "IALC", text: "Bağımsız dil okulları birliği", match: "IALC" },
            { title: "Quality English", text: "Bağımsız okullar birliği", match: "Quality English" },
            { title: "Eaquals", text: "Uluslararası akreditasyon kuruluşu", match: "Eaquals" },
          ],
        },
      ],
    },
    {
      id: "sehirler-programlar",
      title: { added: "Hangi şehirlerde, hangi programlar var?" },
      answer: { added: "Londra, Oxford, Brighton, Bournemouth ve Cambridge başta olmak üzere birçok şehirde." },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: UK_H1, take: [3] } },
          items: [
            { icon: "sohbet", title: "Genel ve yoğun", text: "Genel İngilizce, Yoğun İngilizce" },
            { icon: "mezuniyet", title: "Akademik dönem", text: "Akademik Dönem Programları" },
            { icon: "puan", title: "Sınav hazırlık", text: "TOEFL, IELTS" },
            { icon: "calisma", title: "İş İngilizcesi", text: "İş İngilizcesi Kursları" },
            { icon: "takvim", title: "Yaz okulları", text: "Yaz Okulları" },
            { icon: "konum", title: "Zincir ya da butik", text: "Çok merkezli zincirler, bağımsız okullar", match: "çok merkezlidir" },
          ],
        },
      ],
    },
    {
      id: "okullar",
      title: { source: UK_SCHOOLS },
      answer: { added: "Örnek zincir okullar ve şehirleri:" },
      blocks: [
        {
          kind: "table",
          head: ["Okul", "Şehirler"],
          rows: { src: { heading: UK_SCHOOLS } },
          note: "Örnek liste; şehirler 26 Eylül 2026'da okulların resmi sitelerinden kontrol edildi, okulların başka merkezleri de olabilir.",
        },
      ],
    },
    {
      id: "konaklama",
      title: { added: "Konaklama seçenekleri neler?" },
      answer: { src: { heading: UK_H1, take: [4] }, sentence: 0 },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: UK_H1, take: [4] }, sentence: [1, 4] },
          items: [
            { icon: "grup", title: "Aile yanı", text: "En çok tercih edilen; pratik ve kültür", match: "Aile Yanı Konaklama" },
            { icon: "konum", title: "Yurt", text: "Daha özgür ve konforlu", match: "Yurt Konaklamalar" },
            { icon: "sohbet", title: "Öğrenci evi", text: "5–6 öğrenci birlikte", match: "5-6 öğrencinin" },
          ],
        },
      ],
    },
    {
      id: "yasam",
      title: { added: "İngiltere'de öğrenci hayatı nasıl?" },
      answer: { src: { heading: UK_H1, take: [5] }, sentence: 0 },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: UK_H1, take: [5] }, sentence: [1, 2] },
          items: [
            { icon: "ulasim", title: "Toplu taşıma", text: "Şehrin ve ülkenin her yerine", match: "toplu taşıma araçları" },
            { icon: "aktivite", title: "Bisiklet", text: "Yaygın ulaşım yolu", match: "bisikletle" },
          ],
        },
      ],
    },
    {
      id: "fiyatlar",
      title: { added: "Dil okulu fiyatları neye göre değişir?" },
      answer: { src: { heading: UK_H1, take: [6] }, sentence: 0 },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: UK_H1, take: [6] }, sentence: [1, 3] },
          items: [
            { icon: "ucret", title: "Ekonomik okullar", text: "Uygun fiyatlı seçenekler", match: "Ekonomik Dil Okulu" },
            { icon: "takvim", title: "Kampanyalar", text: "Yılın değişik dönemlerinde", match: "Kampanyaları" },
            { icon: "puan", title: "Dönemlik indirim", text: "Birçok okulda", match: "dönemlik indirimler" },
          ],
        },
      ],
    },
    {
      id: "teklif",
      title: { added: "DDM'den nasıl fiyat teklifi alırım?" },
      answer: { src: { heading: UK_H1, take: [1] }, sentence: 0 },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: UK_H1, take: [1] }, sentence: [1, 2] },
          items: [
            { icon: "telefon", title: "Arayın", text: "Şubelerimizi arayın", match: "bizi arayın" },
            { icon: "saat", title: "Arama talebi", text: "Biz sizi arayalım", match: "arama talebinde" },
            { icon: "belge", title: "Bilgi formu", text: "En yakın şube dönüş yapar", match: "bilgi istek formunu" },
          ],
        },
      ],
    },
    {
      id: "vize",
      title: { added: "İngiltere'de dil okulu için vize gerekir mi?" },
      answer: { added: "Evet; Türk vatandaşları kısa kurslar için de vize alır." },
      blocks: [
        {
          kind: "table",
          head: ["Kurs süresi", "Vize", "Ücret"],
          rows: [
            ["6 aya kadar", "Standard Visitor (ziyaretçi vizesi)", "135 £"],
            ["6 – 11 ay", "Short-term study visa (16 yaş ve üstü)", "228 £ + sağlık katkı payı"],
          ],
          note: "Her iki vizede okulun akredite olması gerekir; Türk vatandaşları ETA ile giremez. Ücretler gov.uk, Eylül 2026.",
        },
      ],
    },
  ],
  branches: null,
  related: [ABROAD_RELATED],
  cta: { title: "İngiltere'de dil okulu için fiyat teklifi alın", sub: "Okul, şehir ve konaklama seçenekleri için size en yakın şubemizle konuşun." },
  sources: [
    "English UK — Student Statistics Report 2026 (englishuk.com)",
    "British Council — Accreditation UK",
    "Eaquals, IALC, Quality English — kurum sayfaları",
    "Kings Education, Stafford House, Oxford International, LSI — okul sayfaları",
    "GOV.UK — Standard Visitor, Short-term study visa",
  ],
  updated: UPDATED,
  headingEdits: {
    [UK_SCHOOLS]: "İngiltere'de hangi okullar İngilizce dil eğitimi veriyor?",
  },
  edits: {
    // GENEL: English UK 2025 → 327.883 öğrenci; denetleyen British Council (Accreditation UK) ve bağımsız kuruluşlar. Yazım: "yutdışından".
    "İngiltere Dil Okulları, son verilere göre geçen yıl 50 binden fazla yutdışından öğrenciyi ağırlamıştır. İngiltere Dil Okulları’nın bu kadar çok tercih edilmesinin sebebi ise İngiltere’nin, İngilizce Dil Eğitimi’nde hemen hemen yüzyıllık deneyimi ve İngiltere’de Dil Eğitimi Sektörünün kurumsal yapısı. İngiltere Dil Okulları kamu ve özerk akreditasyon kurumları tarafından eğitim, konaklama, fiziksel koşullar, sosyal olanaklar ve daha birçok konuda düzenli olarak denetlenmekte ve bu raporlar kamuya açık bir şekilde yayınlanmaktadır.":
      "İngiltere Dil Okulları, English UK verilerine göre 2025 yılında 327 binden fazla yurtdışından öğrenciyi ağırlamıştır. İngiltere Dil Okulları’nın bu kadar çok tercih edilmesinin sebebi ise İngiltere’nin, İngilizce Dil Eğitimi’nde hemen hemen yüzyıllık deneyimi ve İngiltere’de Dil Eğitimi Sektörünün kurumsal yapısı. İngiltere Dil Okulları, British Council'in Accreditation UK programı gibi akreditasyon kurumları tarafından eğitim, konaklama, fiziksel koşullar, sosyal olanaklar ve daha birçok konuda düzenli olarak denetlenmekte ve bu raporlar kamuya açık bir şekilde yayınlanmaktadır.",
    // Yazım: "yada".
    "Dünya Dilleri Merkezi İngiltere’de bulunan dil okullarında İngilizce öğrenmek ve eğitim almak isteyen öğrencilere en uygun fiyatı sunuyoruz. İngiltere Dil Okulları hakkında daha fazla bilgi edinmek, fiyat teklifi almak için lütfen bizi arayın yada arama talebinde bulunun ve ayrıca bilgi istek formunu doldurabilirsiniz. Size en yakın şubemiz sizi en kısa sürede arayacaktır ve bilgi verecektir.":
      "Dünya Dilleri Merkezi İngiltere’de bulunan dil okullarında İngilizce öğrenmek ve eğitim almak isteyen öğrencilere en uygun fiyatı sunuyoruz. İngiltere Dil Okulları hakkında daha fazla bilgi edinmek, fiyat teklifi almak için lütfen bizi arayın ya da arama talebinde bulunun ve ayrıca bilgi istek formunu doldurabilirsiniz. Size en yakın şubemiz sizi en kısa sürede arayacaktır ve bilgi verecektir.",
    // Yazım: "olamayan", "Equals" → Eaquals (kurum adı).
    "Akredite olamayan, gerekli yeterlilikleri sağlayamayan okullara vizeye tabi öğrenciler kabul edilmemektedir. Bu sebeple British Council, English UK, IALC, Quality English, Equals vb. kurumlarca denetlenen okullar öğrencilerin eğitim deneyimlerini sürekli iyileştirme çabasındadırlar.":
      "Akredite olmayan, gerekli yeterlilikleri sağlayamayan okullara vizeye tabi öğrenciler kabul edilmemektedir. Bu sebeple British Council, English UK, IALC, Quality English, Eaquals vb. kurumlarca denetlenen okullar öğrencilerin eğitim deneyimlerini sürekli iyileştirme çabasındadırlar.",
    // Yazım: "İngiltere’de ki", "Bazıları ile", "TEOFL".
    "İngiltere Dil Okulları, Londra, Oxford, Brighton, Bournemouth, Cambridge başta olmak üzere birçok şehirde bulunmaktadır. İngiltere’de ki dil okullarının bazıları zincir yani çok merkezlidir. Bazıları ile önemli bir geçmişe sahip, butik eğitim veren bağımsız okullardır. İngiltere Dil Okulları’nda birçok farklı program seçeneği sunulmaktadır. Genel İngilizce, Yoğun İngilizce, Akademik Dönem Programları, TEOFL, IELTS Sınav Hazırlık Programları, İş İngilizcesi Kursları, Yaz Okulları en çok tercih edilen programlardır.":
      "İngiltere Dil Okulları, Londra, Oxford, Brighton, Bournemouth, Cambridge başta olmak üzere birçok şehirde bulunmaktadır. İngiltere’deki dil okullarının bazıları zincir yani çok merkezlidir. Bazıları ise önemli bir geçmişe sahip, butik eğitim veren bağımsız okullardır. İngiltere Dil Okulları’nda birçok farklı program seçeneği sunulmaktadır. Genel İngilizce, Yoğun İngilizce, Akademik Dönem Programları, TOEFL, IELTS Sınav Hazırlık Programları, İş İngilizcesi Kursları, Yaz Okulları en çok tercih edilen programlardır.",
    // Yazım: "İngiltere’ de ki".
    "İngiltere Dil Kursları birçok farklı konaklama opsiyonu sunmaktadır. Aile Yanı Konaklama öğrencilere hem ana dili İngilizce olan ailelerle pratik yapma olanağı hem de İngiliz kültürünü yakından tanıma fırsatı sunar. Bu açıdan aile yanı konaklama İngiltere Dil Eğitimi Konaklama Alternatiflerinden en çok tercih edilenidir. Yurt Konaklamalar ise daha özgür ve daha konforlu konaklama biçimleridir. İngiltere’ de ki birçok dil okulu 5-6 öğrencinin birlikte konaklayabilecekleri öğrenci evi seçeneği de sunmaktadır.":
      "İngiltere Dil Kursları birçok farklı konaklama opsiyonu sunmaktadır. Aile Yanı Konaklama öğrencilere hem ana dili İngilizce olan ailelerle pratik yapma olanağı hem de İngiliz kültürünü yakından tanıma fırsatı sunar. Bu açıdan aile yanı konaklama İngiltere Dil Eğitimi Konaklama Alternatiflerinden en çok tercih edilenidir. Yurt Konaklamalar ise daha özgür ve daha konforlu konaklama biçimleridir. İngiltere’deki birçok dil okulu 5-6 öğrencinin birlikte konaklayabilecekleri öğrenci evi seçeneği de sunmaktadır.",
    // GENEL: "%15 ile %35" doğrulanamadı → oran çıkarıldı.
    "İngiltere Dil Okulu Fiyatları okula, okulun bulunduğu bölgeye ve eğitim kalitesine göre farklılık göstermektedir. İngiltere’de Ekonomik Dil Okulu opsiyonları bulunmaktadır. İngiltere Dil Okulu Kampanyaları da yılın değişik dönemlerinde yapılmaktadır. Birçok okul %15 ile %35 arasında değişen dönemlik indirimler sunmaktadır.":
      "İngiltere Dil Okulu Fiyatları okula, okulun bulunduğu bölgeye ve eğitim kalitesine göre farklılık göstermektedir. İngiltere’de Ekonomik Dil Okulu opsiyonları bulunmaktadır. İngiltere Dil Okulu Kampanyaları da yılın değişik dönemlerinde yapılmaktadır. Birçok okul dönemlik indirimler sunmaktadır.",
    // Tablo satırları (" | ") + GENEL: okulların güncel şehirleri (resmi siteler, 09/2026).
    "Kings Education; Londra, Brighton, Bournemouth, Oxford": "Kings Education | Londra, Brighton, Bournemouth, Oxford",
    "Stafford House International; Cambridge, Canterbury, Brighton, Londra": "Stafford House International | Londra, Cambridge, Canterbury",
    "Oxford International; Brighton, Londra, Oxford": "Oxford International | Brighton, Londra, Oxford, Edinburgh",
    "LSI; Brighton, Londra, Cambridge": "LSI | Brighton, Londra, Cambridge",
  },
  ignored: [],
};

/* ---------------------------------------------------------------
 * 5 · Yüksek Öğrenim (Kaplan — rakamlar kaynaktaki gibi, kullanıcı kararı 2026-09-26)
 * ------------------------------------------------------------- */

const HIGHER_H1 = "Yurtdışında Yüksek Öğrenim İçin İngilizce";
const HIGHER_WHY = "Neden Kaplan Dil Okulları?";

const HIGHER_EDUCATION: SinglePageDef = {
  path: `${YE}/yuksek-ogrenim`,
  label: "Yüksek Öğrenim",
  parent: ABROAD_PARENT,
  meta: { brandSuffix: true, reasons: [BRAND_SUFFIX_REASON] },
  hero: {
    lead: { src: { heading: HIGHER_H1, take: [0] }, sentence: 0 },
    board: {
      kind: "pass",
      title: "Yüksek öğrenim için İngilizce",
      tag: "DDM & Kaplan",
      from: { code: "IST", name: "İstanbul" },
      to: { code: "UNI", name: "Yurtdışında üniversite" },
      // "Akademik kurslarımızda…" · "TOEFL gibi sınav hazırlık" · "uzun dönem" · "yoğun İngilizce" · "K+ metodolojimiz"
      fields: [
        { label: "Kurslar", value: "Akademik, uzun dönem, yoğun" },
        { label: "Sınav", value: "TOEFL gibi sınavlara hazırlık" },
        { label: "Yöntem", value: "K+ metodolojisi" },
        { label: "Öğrenciler", value: "150 farklı milletten" },
      ],
      stub: { label: "Kaplan", value: "80 yıllık tecrübe" },
    },
  },
  sections: [
    {
      id: "kurslar",
      title: { added: "Hangi kurslar var?" },
      answer: { added: "Akademik, sınav hazırlık, uzun dönem ve yoğun İngilizce kursları." },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: HIGHER_H1, take: [1] } },
          items: [
            { icon: "mezuniyet", title: "Akademik kurslar", text: "İngilizce ve genel kültür", match: "Akademik kurslarımızda" },
            { icon: "puan", title: "Sınav hazırlık", text: "TOEFL gibi sınavlara", match: "TOEFL gibi" },
            { icon: "takvim", title: "Uzun dönem", text: "Hızlı ilerleme", match: "uzun dönem kurslar" },
            { icon: "sohbet", title: "Yoğun İngilizce", text: "Genel dil becerileri", match: "yoğun İngilizce kursları" },
          ],
        },
      ],
    },
    {
      id: "k-arti",
      title: { added: "DDM ve Kaplan birlikte ne sunuyor?" },
      answer: { added: "Partner olarak yurtdışında İngilizce kursları ve K+ yöntemi." },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: HIGHER_H1, take: [0] } },
          items: [
            { icon: "grup", title: "Partner", text: "DDM & Kaplan Dil Okulları", match: "DDM & Kaplan" },
            { icon: "ekran", title: "K+ metodolojisi", text: "Teknolojiyi eğitim aracı olarak kullanır", match: "Teknolojiyi eğitim aracı" },
          ],
        },
      ],
    },
    {
      id: "neden-kaplan",
      title: { source: HIGHER_WHY },
      answer: { added: "Kaplan'ın kendi verileriyle:" },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: HIGHER_WHY } },
          items: [
            { title: "80 yıl", text: "Eğitim tecrübesi", match: "80 yıllık" },
            { title: "37 okul", text: "Dünya çapında İngilizce dil okulu", match: "37 İngilizce dil okulunda" },
            { title: "150 millet", text: "Uluslararası öğrenci topluluğu", match: "150 farklı milletten" },
            { title: "%97", text: "Öğrenci memnuniyeti", match: "%97 öğrenci memnuniyet" },
          ],
        },
      ],
    },
    {
      id: "universite-yolu",
      title: { added: "Üniversiteye başvururken İngilizcenizi nasıl belgelersiniz?" },
      answer: { added: "TOEFL ya da IELTS gibi bir sınavla veya bir pathway programıyla." },
      blocks: [
        {
          kind: "links",
          items: [
            { label: "Pathway Programı", href: `${YE}/pathway-programi` },
            { label: "Yurtdışı Sınav Hazırlık", href: `${YE}/sinav-hazirlik` },
            { label: "TOEFL Nedir?", href: "/sinav-hazirlik-egitimleri/toefl-kursu/toefl-nedir" },
            { label: "IELTS Nedir?", href: "/sinav-hazirlik-egitimleri/ielts-kursu/ielts-nedir" },
          ],
        },
      ],
    },
  ],
  branches: null,
  related: [ABROAD_RELATED],
  cta: { title: "Yurtdışında üniversite hedefinizi birlikte planlayalım", sub: "Kurs, sınav ve başvuru adımları için size en yakın şubemizle konuşun." },
  sources: [],
  updated: UPDATED,
  edits: {
    // Yazım: aynı ifade iki kez yapışmış.
    "80 yıllık eğitim tecrübesi80 yıllık eğitim tecrübesi": "80 yıllık eğitim tecrübesi",
  },
  ignored: ABROAD_MENU,
};

/* ---------------------------------------------------------------
 * 6 · Yurtdışı Sınav Hazırlık (Kaplan kursları — kaynaktaki gibi, kullanıcı kararı 2026-09-26)
 * ------------------------------------------------------------- */

const EXAM_H2 = "Yurtdışı İngilizce Sınav Hazırlık Kursları";
const EXAM_ALL = "TOEFL, IELTS, GRE, GMAT, CAMBRIDGE Sınavlarına Yönelik Özel İngilizce Kursları";
const SH = "/sinav-hazirlik-egitimleri";

const EXAM_PREP: SinglePageDef = {
  path: `${YE}/sinav-hazirlik`,
  label: "Sınav Hazırlık",
  parent: ABROAD_PARENT,
  meta: { brandSuffix: true, reasons: [BRAND_SUFFIX_REASON] },
  hero: {
    lead: { src: { heading: EXAM_ALL } },
    board: {
      kind: "pass",
      title: "Yurtdışı sınav hazırlık",
      tag: "Kaplan okulları",
      from: { code: "IST", name: "İstanbul" },
      to: { code: "SKOR", name: "Hedef puan" },
      // Süreler kaynak paragraflarından: TOEFL "1 ila 16 hafta", IELTS "1 ila 24 hafta", GRE / GMAT "12 hafta".
      fields: [
        { label: "TOEFL", value: "1–16 hafta" },
        { label: "IELTS", value: "1–24 hafta" },
        { label: "GRE / GMAT", value: "12 hafta" },
        { label: "Cambridge", value: "Deneme sınavlarıyla" },
      ],
      stub: { label: "Sınavlar", value: "5 sınava hazırlık" },
    },
  },
  sections: [
    {
      id: "kurslar",
      title: { source: EXAM_H2 },
      answer: { src: { heading: EXAM_H2 } },
      blocks: [
        {
          kind: "topics",
          items: [
            { source: "TOEFL Sınavı: TOEFL® Yoğun Hazırlık", icon: "puan", summary: "1–16 hafta; 10.000'den fazla kurum kabul ediyor." },
            { source: "IELTS Sınavı: IELTS Hazırlık", icon: "dunya", summary: "Şehre göre 1–24 hafta; üniversite, devlet ve şirketler kabul ediyor." },
            { source: "CAMBRIDGE Sınavı: Cambridge Sınavına Hazırlık", icon: "belge", summary: "Pratik, deneme sınavları ve sınav teknikleri." },
            { source: "GRE Sınavı: GRE® Sınavına Hazırlık", icon: "mezuniyet", summary: "12 hafta; master ya da doktora başvurusu için, Higher Intermediate ve üzeri." },
            { source: "GMAT Sınavı: GMAT® Sınavına Hazırlık", icon: "calisma", summary: "12 hafta; Amerika'da MBA için, Higher Intermediate ve üzeri." },
          ],
        },
      ],
    },
    {
      id: "turkiyede-hazirlik",
      title: { added: "Gitmeden önce Türkiye'de hazırlanabilir misiniz?" },
      answer: { added: "Evet; bu sınavların hazırlık kursları DDM şubelerinde de var." },
      blocks: [
        {
          kind: "links",
          items: [
            { label: "TOEFL Kursu", href: `${SH}/toefl-kursu` },
            { label: "IELTS Kursu", href: `${SH}/ielts-kursu` },
            { label: "GRE Kursu", href: `${SH}/gre-kursu` },
            { label: "GMAT Kursu", href: `${SH}/gmat-kursu` },
            { label: "TOEFL Nedir?", href: `${SH}/toefl-kursu/toefl-nedir` },
            { label: "IELTS Nedir?", href: `${SH}/ielts-kursu/ielts-nedir` },
          ],
        },
      ],
    },
  ],
  branches: null,
  related: [ABROAD_RELATED],
  cta: { title: "Hedef puanınız için doğru kursu birlikte seçelim", sub: "Sınav, süre ve okul için size en yakın şubemizle konuşun." },
  sources: [],
  updated: UPDATED,
  headingEdits: {
    [EXAM_ALL]: "TOEFL, IELTS, GRE, GMAT ve Cambridge sınavlarına yönelik özel İngilizce kursları",
  },
  edits: {
    // Yazım: "dünyaçapındaki".
    "Üniversiteler, devlet kurumları ve dünyaçapındaki şirketler tarafından kabul gören IELTS sınavına özel olarak tasarlanmış Kaplan kursları ile hazırlanın. Kurs süresi seçilen lokasyona bağlı olarak 1 ila 24 hafta arasında değişmektedir.":
      "Üniversiteler, devlet kurumları ve dünya çapındaki şirketler tarafından kabul gören IELTS sınavına özel olarak tasarlanmış Kaplan kursları ile hazırlanın. Kurs süresi seçilen lokasyona bağlı olarak 1 ila 24 hafta arasında değişmektedir.",
    // Yazım: "hali hazırda".
    "İngilizce dil yeteneklerinizi parlatın ve bir master ya da doktora programına başvururken uygunluğunuzu kanıtlayın. 12 hafta süren bu kursa hali hazırda Higher Intermediate veya üzeri seviyede olan öğrenciler katılabilir.":
      "İngilizce dil yeteneklerinizi parlatın ve bir master ya da doktora programına başvururken uygunluğunuzu kanıtlayın. 12 hafta süren bu kursa halihazırda Higher Intermediate veya üzeri seviyede olan öğrenciler katılabilir.",
    "Amerika'da MBA programlarına katılabilmek için gerekli olan GMAT sınavına hazırlanın. 12 hafta süren bu kursa hali hazırda Higher Intermediate veya üzeri seviyede olan öğrenciler katılabilir.":
      "Amerika'da MBA programlarına katılabilmek için gerekli olan GMAT sınavına hazırlanın. 12 hafta süren bu kursa halihazırda Higher Intermediate veya üzeri seviyede olan öğrenciler katılabilir.",
  },
  ignored: ABROAD_MENU.filter((m) => m.line !== "Yurtdışı Sınav Hazırlık"),
};

/* ---------------------------------------------------------------
 * 7 · Yaz Okulları (Kaplan Juniors — kaynaktaki gibi, kullanıcı kararı 2026-09-26)
 * ------------------------------------------------------------- */

const SUMMER_H1 = "Yaz Okulları Gençler için Yurtdışı İngilizce Programları";
const SUMMER_WHERE = "Yurtdışında Yaz Okulları hangileridir?";

const SUMMER_SCHOOLS: SinglePageDef = {
  path: `${YE}/yaz-okullari`,
  label: "Yaz Okulları",
  parent: ABROAD_PARENT,
  meta: { reasons: [] },
  hero: {
    lead: { src: { heading: SUMMER_H1, take: [0] } },
    board: {
      kind: "pass",
      title: "Kaplan Juniors",
      tag: "Yaz okulu",
      from: { code: "IST", name: "İstanbul" },
      to: { code: "UK/US", name: "Torquay, Bath, San Diego" },
      // "12-17 yaş arası" · "San Diego, Torquay ve Bath" · "yılın hemen hemen her döneminde … gruplarına" · "paket fiyatlarını"
      fields: [
        { label: "Yaş", value: "12–17" },
        { label: "Yaz okulları", value: "San Diego, Torquay, Bath" },
        { label: "Grup programları", value: "Yılın her döneminde" },
        { label: "Fiyat", value: "Paket fiyat için arayın" },
      ],
      stub: { label: "Program", value: "Ders + etkinlik" },
    },
  },
  sections: [
    {
      id: "kimler-icin",
      title: { added: "Yaz okulu kimler için?" },
      answer: { src: { heading: SUMMER_H1, take: [1] } },
      blocks: [],
    },
    {
      id: "etkinlikler",
      title: { added: "Yaz okulunda neler yapılır?" },
      answer: { added: "Derslerin yanında projeler, geziler ve yeni arkadaşlar." },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: SUMMER_H1, take: [2, 3] } },
          items: [
            { icon: "yazma", title: "Çizgi roman", text: "Kendi süper kahramanınızı yazın", match: "süper kahraman çizgi romanınızı" },
            { icon: "aktivite", title: "Moda şovu", text: "Kendi şovunuzu düzenleyin", match: "moda şovunuzu" },
            { icon: "konum", title: "Tarihi geziler", text: "Kadim kaleleri gezin", match: "kadim bir kaleyi" },
            { icon: "mezuniyet", title: "Uzman öğretmenler", text: "Projeler öğretmen rehberliğinde", match: "Uzman öğretmenlerimizin" },
            { icon: "grup", title: "Yeni arkadaşlar", text: "Dünyanın her yerinden", match: "dünyanın her yerinden" },
            { icon: "konusma", title: "İngilizce", text: "Konuşabildiğinizi fark edin", match: "İngilizce konuşabildiğinizin" },
          ],
        },
      ],
    },
    {
      id: "nerede",
      title: { added: "Yaz okulları nerede?" },
      answer: { added: "San Diego, Torquay ve Bath; gruplar için tüm Kaplan şehirleri." },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: SUMMER_H1, take: [4] } },
          items: [
            { icon: "konum", title: "San Diego", text: "Yaz okulu", match: "San Diego" },
            { icon: "konum", title: "Torquay", text: "Yaz okulu", match: "Torquay" },
            { icon: "konum", title: "Bath", text: "Yaz okulu", match: "Bath" },
            { icon: "grup", title: "Grup programları", text: "Yıl boyu, talebe bağlı, 12–17 yaş", match: "talebe bağlı" },
          ],
        },
      ],
    },
    {
      id: "ulkeler",
      title: { source: SUMMER_WHERE },
      answer: { src: { heading: SUMMER_WHERE } },
      blocks: [],
    },
    {
      id: "fiyat",
      title: { added: "Paket fiyatlarını nasıl öğrenirim?" },
      answer: { src: { heading: SUMMER_H1, take: [8] } },
      blocks: [{ kind: "links", items: [{ label: "Şubelerimiz ve iletişim", href: "/ddm-iletisim" }] }],
    },
  ],
  branches: null,
  related: [ABROAD_RELATED],
  cta: { title: "Çocuğunuz için doğru yaz okulunu birlikte seçelim", sub: "Şehir, tarih ve paket fiyatları için size en yakın şubemizle konuşun." },
  sources: [],
  updated: UPDATED,
  headingEdits: {
    [SUMMER_WHERE]: "Yurtdışında yaz okulları hangileridir?",
  },
  edits: {
    // Biçim: ülke listesi " | " ile ayrılmıştı (eski menü düzeni) — cümleye çevrildi, ülkeler aynı.
    "En çok tercih edilen Yaz Okulları Almanya | İngiltere | Amerika | Kanada | İrlanda | Malta | İspanya | Fransa":
      "En çok tercih edilen yaz okulları Almanya, İngiltere, Amerika, Kanada, İrlanda, Malta, İspanya ve Fransa'da.",
  },
  ignored: ABROAD_MENU.filter((m) => m.line !== SUMMER_H1),
};

/* ---------------------------------------------------------------
 * 8 · Pathway Programı
 *
 * GENEL bilgi (doğrulandı 2026-09-26): pathway türleri — Foundation (lisans öncesi 1 yıl), International Year One
 * (lisansın 1. yılı + akademik İngilizce → 2. yıl), Pre-Master's: UCAS (foundation year / IFP) ve
 * https://www.kaplanpathways.com/ program türleri. DDM'in "B2 / C1 ile IELTS-TOEFL'siz başlama" cümlesi firma
 * bilgisi — birebir (Kaplan University Placement Service: partnerlerin çoğu Kaplan seviyelerini kabul ediyor).
 * ------------------------------------------------------------- */

const PATHWAY_H1 = "Pathway Programı Nedir?";

const PATHWAY: SinglePageDef = {
  path: `${YE}/pathway-programi`,
  label: "Pathway Programı",
  parent: ABROAD_PARENT,
  meta: { brandSuffix: true, reasons: [BRAND_SUFFIX_REASON] },
  hero: {
    lead: { src: { heading: PATHWAY_H1, take: [4] }, sentence: 0 },
    board: {
      kind: "pass",
      title: "Pathway programı",
      tag: "Dil okulundan üniversiteye",
      from: { code: "IST", name: "İstanbul" },
      to: { code: "UNI", name: "Yurtdışında üniversite" },
      // "en az B2 veya C1" · "herhangi bir IELTS ya da TOEFL puanı gerekmeksizin" · "Amerika, İngiltere, Kanada" · lise sonrası
      fields: [
        { label: "Kimler için", value: "Liseyi bitirenler" },
        { label: "Hedef seviye", value: "En az B2 ya da C1" },
        { label: "Sınav", value: "IELTS / TOEFL gerekmeden" },
        { label: "Ülkeler", value: "Amerika, İngiltere, Kanada" },
      ],
      stub: { label: "Yol", value: "Dil okulu → üniversite" },
    },
  },
  sections: [
    {
      id: "neden",
      title: { added: "Öğrenciler neden pathway programına yöneliyor?" },
      answer: { src: { heading: PATHWAY_H1, take: [2] } },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: PATHWAY_H1, take: [0, 1] } },
          items: [
            { icon: "mezuniyet", title: "Hedef", text: "Tercih edilen üniversitede okumak", match: "tercih edeceği üniversitede" },
            { icon: "puan", title: "Sınav maratonu", text: "Yüksek puan bile bazen yetmiyor", match: "tatmin edici" },
            { icon: "dunya", title: "Yurtdışı", text: "Gözler yurtdışı eğitime çevriliyor", match: "yurtdışı eğitime" },
            { icon: "belge", title: "Kriterler", text: "Üniversiteler farklı donanım bekliyor", match: "farklı donanım ve kriterlere" },
          ],
        },
      ],
    },
    {
      id: "ddm-ile",
      title: { added: "DDM ile dil okulundan üniversiteye nasıl geçilir?" },
      answer: { added: "Dil okulunda B2 ya da C1'e ulaşan öğrenci, anlaşmalı üniversiteye IELTS ya da TOEFL puanı olmadan başlayabilir." },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: PATHWAY_H1, take: [3] } },
          items: [
            { icon: "konum", title: "1. Dil okulu", text: "DDM aracılığıyla yurtdışında kayıt", match: "yurtdışında kayıt olacağınız bir dil okulu" },
            { icon: "puan", title: "2. Seviye", text: "En az B2 ya da C1", match: "en az B2 veya C1" },
            { icon: "mezuniyet", title: "3. Üniversite", text: "Anlaşmalı üniversitede, sınav puanı olmadan", match: "anlaşmalı olduğu üniversitelerde" },
            { icon: "dunya", title: "Ülkeler", text: "Amerika, İngiltere, Kanada" },
          ],
        },
      ],
    },
    {
      id: "amac",
      title: { added: "Pathway programının amacı ne?" },
      answer: { added: "Gideceğiniz ülkenin dilini ve kültürünü öğrenip sınavsız üniversiteye geçmek." },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: PATHWAY_H1, take: [4] } },
          items: [
            { icon: "sohbet", title: "Dil ve kültür", text: "Ülkenin dilini ve kültürünü öğrenmek", match: "dilini ve kültürünü" },
            { icon: "yazma", title: "Akademik ifade", text: "Akademik anlamda kendinizi ifade etmek", match: "Akademik anlamda kendinizi ifade" },
            { icon: "belge", title: "Sınavsız geçiş", text: "Dil yeterlilik sınavına girmeden", match: "dil yeterlilik sınavına girmeksizin" },
          ],
        },
      ],
    },
    {
      id: "turler",
      title: { added: "Hangi pathway programları var?" },
      answer: { added: "Üniversitenin hangi aşamasına geçeceğinize göre üç tür." },
      blocks: [
        {
          kind: "table",
          head: ["Program", "Kimler için", "Sonrası"],
          rows: [
            ["Foundation (hazırlık yılı)", "Lise diploması doğrudan kabul edilmeyen öğrenciler", "Lisansın 1. yılı"],
            ["International Year One", "Lisansın ilk yılını akademik İngilizceyle okuyanlar", "Lisansın 2. yılı"],
            ["Pre-Master's", "Yüksek lisans öncesi hazırlık", "Yüksek lisans"],
          ],
          note: "Süre ve giriş şartı üniversiteye ve ülkeye göre değişir.",
        },
      ],
    },
  ],
  branches: null,
  related: [ABROAD_RELATED],
  cta: { title: "Yurtdışında üniversite yolunuzu birlikte planlayalım", sub: "Dil okulu, hedef seviye ve anlaşmalı üniversiteler için size en yakın şubemizle konuşun." },
  sources: ["UCAS — Foundation year ve International Foundation Programme", "Kaplan International Pathways — program türleri"],
  updated: UPDATED,
  edits: {
    // Yazım: "Lise" (cümle ortası), "olamayabiliyor".
    "Öğrencilerin Lise eğitimlerini tamamladıktan sonra tercih edeceği üniversitede eğitimlerine başlaması en büyük idealidir. Yoğun ve zorlu bir sınav maratonunun ardından elde edilen yüksek puanlar bile bazen tatmin edici olamayabiliyor. Bu noktada gözler genelde yurtdışı eğitime çevrilmektedir.":
      "Öğrencilerin lise eğitimlerini tamamladıktan sonra tercih edeceği üniversitede eğitimlerine başlaması en büyük idealidir. Yoğun ve zorlu bir sınav maratonunun ardından elde edilen yüksek puanlar bile bazen tatmin edici olmayabiliyor. Bu noktada gözler genelde yurtdışı eğitime çevrilmektedir.",
    // Yazım: "pek çok üniversiteler".
    "Eğitim ve kariyer hedeflerini Türkiye dışında başka bir ülkede devam ettirmeyi planlayan öğrencilerin yurtdışındaki pek çok üniversiteler tarafından farklı donanım ve kriterlere sahip olmaları beklenmektedir.":
      "Eğitim ve kariyer hedeflerini Türkiye dışında başka bir ülkede devam ettirmeyi planlayan öğrencilerin yurtdışındaki pek çok üniversite tarafından farklı donanım ve kriterlere sahip olmaları beklenmektedir.",
    // Yazım: "yüksek ingilizce".
    "DDM dil okulları aracılığıyla yurtdışında kayıt olacağınız bir dil okulu sonrasında, en az B2 veya C1 seviyesine ulaşmanız durumunda, dil okulunun anlaşmalı olduğu üniversitelerde, herhangi bir IELTS ya da TOEFL puanı gerekmeksizin üniversite eğitimine başlamanızı sağlamaktayız. Amerika, İngiltere, Kanada gibi yüksek ingilizce dil puanı talep edilen ülkelerde tamamlayacağınız dil eğitimi, akademik İngilizce sınavlarından muaf olarak üniversiteye kabul edilme sürecinizde sizlere yardımcı olmaktadır.":
      "DDM dil okulları aracılığıyla yurtdışında kayıt olacağınız bir dil okulu sonrasında, en az B2 veya C1 seviyesine ulaşmanız durumunda, dil okulunun anlaşmalı olduğu üniversitelerde, herhangi bir IELTS ya da TOEFL puanı gerekmeksizin üniversite eğitimine başlamanızı sağlamaktayız. Amerika, İngiltere, Kanada gibi yüksek İngilizce dil puanı talep edilen ülkelerde tamamlayacağınız dil eğitimi, akademik İngilizce sınavlarından muaf olarak üniversiteye kabul edilme sürecinizde sizlere yardımcı olmaktadır.",
  },
  ignored: ABROAD_MENU,
};

/* ---------------------------------------------------------------
 * 9 · İtalya'da Üniversite (üst sayfa "Tercih Edilen Ülkeler" ana sayfaya 301 → kırıntıda Yurtdışı Eğitim)
 *
 * GENEL bilgi (doğrulandı 2026-09-26):
 * Ön kayıt Universitaly, D tipi öğrenci vizesi; 2026/27 vize son başvuru 30 Kasım 2026; geçim şartı yılda €10.179,85;
 *   dil B2 (foundation B1): MUR genelgesi 2026-2028 / https://consbuenosaires.esteri.it/… (studenti internazionali 2026-2028)
 * Oturma izni girişten 8 gün içinde; harç yılda yaklaşık €900–4.000 (gelire göre); Laurea 3 yıl, Magistrale 2 yıl:
 *   https://education.ec.europa.eu/country-profiles/italy (24.03.2026)
 * DSU bölgesel bursları her milletten öğrenciye açık: https://www.unipi.it/…/borsa-di-studio-del-dsu/
 * İtalyanca sertifikaları (CLIQ): CILS, CELI, CERT.IT, PLIDA — https://www.esteri.it/…/certificazioni-linguistiche/
 * "Diğer Avrupa ülkeleriyle kıyaslandığında en doğru adreslerden biri" DDM'in görüşü — birebir (resmi karşılaştırma yok).
 * ------------------------------------------------------------- */

const ITALY_H1 = "İtalya'da Üniversite Okumak";

const ITALY: SinglePageDef = {
  path: `${YE}/tercih/italyadauniversite`,
  label: "İtalya'da Üniversite",
  parent: ABROAD_PARENT,
  meta: {
    title: "İtalya'da Üniversite Okumak - Başvuru Süreci",
    reasons: ["title: 67 karakter (≤60) — \"İtalyan Üniversiteleri\" tekrarı kısaltıldı."],
  },
  hero: {
    lead: { src: { heading: ITALY_H1, take: [0] }, sentence: 0 },
    board: {
      kind: "pass",
      title: "İtalya'da üniversite",
      tag: "Lisans ve yüksek lisans",
      from: { code: "IST", name: "İstanbul" },
      to: { code: "ITA", name: "İtalya" },
      fields: [
        { label: "Ön kayıt", value: "Universitaly portalı" },
        { label: "Vize", value: "D tipi öğrenci vizesi" },
        { label: "Devlet üniversitesi harcı", value: "Yılda ~€900–4.000" },
        { label: "Dil şartı", value: "En az B2" },
      ],
      stub: { label: "Bilgi için", value: "Bağdat Caddesi ofisi" },
    },
  },
  sections: [
    {
      id: "neden-italya",
      title: { added: "İtalya'da üniversite okumayı düşünürken nelere bakmalı?" },
      answer: { added: "Akademik ve kişisel faydaya, bütçeye ve yaşam koşullarına." },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: ITALY_H1, take: [0, 1] } },
          items: [
            { icon: "mezuniyet", title: "Seçenek", text: "Lisans, master ya da doktora", match: "master eğitimi almak veya doktoranızı" },
            { icon: "grup", title: "Fayda", text: "Akademik, sosyal ve kişisel gelişim", match: "kişisel gelişiminize" },
            { icon: "ucret", title: "Bütçe", text: "Bütçe ve yaşam koşulları baştan planlanmalı", match: "bütçenizi ve yaşam koşullarınızı" },
            { icon: "dunya", title: "Avrupa ile kıyas", text: "Diğer Avrupa ülkelerine göre doğru adreslerden biri", match: "diğer Avrupa ülkeleriyle" },
          ],
        },
        {
          kind: "table",
          title: "İtalya'da üniversite dereceleri",
          head: ["Derece", "Süre"],
          rows: [
            ["Laurea (lisans)", "3 yıl"],
            ["Laurea Magistrale (yüksek lisans)", "2 yıl"],
            ["Dottorato (doktora)", "Genellikle 3 yıl"],
          ],
          note: null,
        },
      ],
    },
    {
      id: "basvuru",
      title: { added: "Başvuru adım adım nasıl ilerler?" },
      answer: { added: "Ön kayıt Universitaly'den yapılır, ardından öğrenci vizesi alınır." },
      blocks: [
        {
          kind: "table",
          head: ["Adım", "Ne yapılır"],
          rows: [
            ["1. Program seçimi", "İtalyanca ya da İngilizce eğitim veren program seçilir."],
            ["2. Ön kayıt", "Universitaly portalından ön kayıt yapılır; takvim üniversiteye göre değişir, genelde ilkbahar ve yaz."],
            ["3. Öğrenci vizesi", "Üniversite onayından sonra D tipi öğrenci vizesine başvurulur (2026/27 için son gün 30 Kasım 2026)."],
            ["4. Oturma izni", "İtalya'ya girişten sonra 8 gün içinde oturma izni için başvurulur."],
          ],
          note: "Kabul almak vize garantisi değildir; vize kararı konsolosluğa aittir.",
        },
      ],
    },
    {
      id: "maliyet",
      title: { added: "İtalya'da okumanın maliyeti ne kadar?" },
      answer: { added: "Devlet üniversitelerinde harç aile gelirine göre değişir; bölgesel burslar var." },
      blocks: [
        {
          kind: "table",
          head: ["Kalem", "Bilgi"],
          rows: [
            ["Devlet üniversitesi harcı", "Yılda yaklaşık €900 – 4.000, aile gelirine göre"],
            ["Geçim şartı (vize)", "Yılda en az €10.179,85 gösterilmeli"],
            ["Bölgesel burs (DSU)", "Her milletten öğrenci başvurabilir; harç muafiyeti, yurt ve yemek desteği"],
          ],
          note: "Geçim şartı 2026/27 ve 2027/28 vize başvuruları içindir; harç ve burs eşikleri bölgeye ve üniversiteye göre değişir.",
        },
      ],
    },
    {
      id: "dil",
      title: { added: "Hangi dil seviyesi gerekir?" },
      answer: { added: "Eğitim dilinde en az B2; hazırlık (foundation) programlarında B1." },
      blocks: [
        {
          kind: "table",
          head: ["Program dili", "Belge"],
          rows: [
            ["İtalyanca", "CILS, CELI, CERT.IT ya da PLIDA sertifikası"],
            ["İngilizce", "Üniversitenin kabul ettiği İngilizce yeterlilik belgesi"],
          ],
          note: "Hangi belgenin kabul edileceğine üniversite karar verir.",
        },
      ],
    },
    {
      id: "bilgi",
      title: { added: "Başvurunuz için nereden destek alabilirsiniz?" },
      answer: { src: { heading: ITALY_H1, take: [2] } },
      blocks: [{ kind: "links", items: [{ label: "Bağdat Caddesi Şubesi", href: "/ddm-iletisim/iletisim-2-bagdat-caddesi" }] }],
    },
  ],
  branches: null,
  related: [ABROAD_RELATED, { title: "İtalyanca", links: [{ label: "İtalyanca Kursu", href: "/yabanci-dil-egitimleri/italyanca-kursu" }] }],
  cta: { title: "İtalya'da üniversite başvurunuzu birlikte planlayalım", sub: "Kayıt, vize, oturma izni ve konaklama için Bağdat Caddesi ofisimizle konuşun." },
  sources: [
    "İtalya Üniversite ve Araştırma Bakanlığı (MUR) — Uluslararası öğrenciler genelgesi 2026-2028",
    "Avrupa Komisyonu — European Education Area, İtalya ülke profili",
    "İtalya Dışişleri Bakanlığı — İtalyanca dil sertifikaları (CLIQ)",
    "Pisa Üniversitesi — DSU bursu",
  ],
  updated: UPDATED,
  edits: {
    // Yazım: "Bir diğer gerçekte şu ki", "İtalya ‘da".
    "Bir diğer gerçekte şu ki İtalya’da eğitim hayatınıza başlarken bütçenizi ve yaşam koşullarınızı da bu yönde şekillendirmeniz gerekmektedir. İtalya ‘da eğitim almak diğer Avrupa ülkeleriyle kıyaslandığında sizin için en doğru adreslerden biridir.":
      "Bir diğer gerçek şu ki İtalya’da eğitim hayatınıza başlarken bütçenizi ve yaşam koşullarınızı da bu yönde şekillendirmeniz gerekmektedir. İtalya’da eğitim almak diğer Avrupa ülkeleriyle kıyaslandığında sizin için en doğru adreslerden biridir.",
  },
  ignored: [],
};

export const ABROAD_PAGES: SinglePageDef[] = [
  WORK_AND_TRAVEL,
  ADULT_ENGLISH,
  VANCOUVER,
  ENGLAND,
  HIGHER_EDUCATION,
  EXAM_PREP,
  SUMMER_SCHOOLS,
  PATHWAY,
  ITALY,
];
