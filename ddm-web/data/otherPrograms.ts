/**
 * P4 — Diğer Programlar ve Kurumsal alt sayfaları (Zengin İçerik alt türü 6, 2026-09-26).
 *
 * Tasarım: tekil sayfa sistemi (`SinglePage`, kullanıcı onaylı "A · program panosu"): hero'nun sağında
 * sayfanın asıl bilgisi (iş İngilizcesi modülleri, çocuk programı haftalık takvimi, çeviri dilleri,
 * grup / özel ders karşılaştırması); gövde kart / tablo ağırlıklı (kullanıcı, 2026-09-26: "düz yazı
 * değil"). İçerik kuralı `data/singlePages.ts` ile aynı; genel bilgi resmi kaynaktan, kaynak yorumda.
 *
 * Kararlar (kullanıcı, 2026-09-26): Tercüme Hizmetleri'nde yalnız DDM metni (iş ortağı Lavanda'nın
 * İngilizce tanıtımı gösterilmez); `diger-program/yurtdisinda-egitim` Work and Travel'ın kopyası → 301
 * (`data/abroadPages.ts`). Pegasus sayfası kaynakta İngilizce → `lang: "en"`.
 */

import type { SinglePageDef } from "@/data/singlePages";

const DP = "/diger-program";
const KD = "/kurumsal-dil-egitim";
const YD = "/yabanci-dil-egitimleri";
const UPDATED = "2026-09-26";

const OTHER_PARENT = { label: "Diğer Programlar", href: DP };

/* ---------------------------------------------------------------
 * 1 · İş İngilizcesi — Business English
 *
 * GENEL bilgi (doğrulandı 2026-09-26):
 * BEC (B1 Business Preliminary / B2 Vantage / C1 Higher) Çin dışında kaldırıldı:
 *   https://www.cambridgeenglish.org/exams-and-tests/qualifications/business/
 * Linguaskill Business B1–C2, çevrim içi, modüler:
 *   https://www.cambridgeenglish.org/exams-and-tests/linguaskill/information-about-the-exam/linguaskill-business/
 * TOEIC L&R 10–990, S&W 0–200 + 0–200 (ETS): https://www.eu.ets.org/toeic/about/listening-reading.html
 * LCCI English for Business 31.12.2021'de kaldırıldı (Pearson).
 * ------------------------------------------------------------- */

const BE_H1 = "İş İngilizcesi - Business English";
const BE_PROGRAM = "İş İngilizcesi Programı";

const BUSINESS_ENGLISH: SinglePageDef = {
  path: `${DP}/business-english`,
  label: "Business English",
  parent: OTHER_PARENT,
  meta: { reasons: [] },
  hero: {
    lead: { src: { heading: BE_PROGRAM, take: [1] }, sentence: 0 },
    board: {
      kind: "chips",
      title: "Program modülleri",
      sub: "İhtiyaca göre seçilir, şirkete özel şekillenir",
      // Modül adları kaynak başlıklarının kısaltması.
      items: [
        "İş Yazışmaları",
        "Ofis İngilizcesi",
        "Telefonda İngilizce",
        "Pazarlama ve Reklamcılık",
        "Bankacılık ve Finans",
        "Uluslararası Ticaret ve Yatırım",
        "İş Sunumları",
        "İş Konuları",
        "İş Dünyasından Gerçek Örnekler",
      ],
      // "Bu kurs öğrencilerin ihtiyaçlarına göre de şekillendirilebilir." · "her şirket için özel olarak da şekillendirilir"
      facts: [
        { value: "9", label: "modül" },
        { value: "Şirkete özel", label: "program" },
      ],
    },
  },
  sections: [
    {
      id: "neden",
      title: { added: "İş İngilizcesi neden gerekli?" },
      answer: { added: "Uluslararası iş ortamında yöneticiler ve çalışanlar için İngilizce artık temel beceri." },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: BE_H1 } },
          items: [
            { icon: "calisma", title: "Değişen ofis", text: "Günlük işlerde daha fazla İngilizce", match: "İngilizce desteğine" },
            { icon: "dunya", title: "Uluslararası yöneticilik", text: "İngilizce en iyi düzeyde olmalı", match: "en iyi düzeyde" },
            { icon: "kupa", title: "Kariyer", text: "Belli noktalara gelmek ve orada kalmak", match: "geldikleri noktalarda kalabilmeleri" },
          ],
        },
      ],
    },
    {
      id: "program",
      title: { source: BE_PROGRAM },
      answer: { added: "Üst düzey yöneticilerden ofis çalışanlarına, şirketin tüm kademelerine." },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: BE_PROGRAM } },
          items: [
            { icon: "grup", title: "Kimler için", text: "Üst düzey yöneticiler, müdürler, bölüm yöneticileri, çalışanlar", match: "üst düzey yöneticilerine" },
            { icon: "kelime", title: "Odak", text: "Sözcükler, dil yapısı, şirketler arası yazışmalar", match: "şirketler arası yazışmalara" },
            { icon: "sohbet", title: "İş ifadeleri", text: "İş dünyasında kullanılan İngilizce", match: "İş dünyasında kullanılan İngilizce ifadeler" },
            { icon: "belge", title: "Kişiye özel", text: "İhtiyaca göre şekillenir", match: "ihtiyaçlarına göre" },
          ],
        },
      ],
    },
    {
      id: "moduller",
      title: { added: "Programda hangi modüller var?" },
      answer: { added: "Dokuz modül; her biri bir iş becerisine odaklanır." },
      blocks: [
        {
          kind: "topics",
          // Özetler her modülün kaynak paragrafının kısaltması (paragraf kartın "Ayrıntılı bilgi"sinde).
          items: [
            { source: "İş Yazışmaları", icon: "yazma", summary: "İngilizce iş mektubu ve yazışma; İngiliz ve Amerikan teknikleri." },
            { source: "Ofis İngilizcesi", icon: "calisma", summary: "Ofis personeli ve sekreterler için; her şirkete özel şekillenir." },
            { source: "Telefonda İngilizce", icon: "telefon", summary: "Telefonda dinleme ve konuşma becerisi." },
            { source: "Pazarlama ve Reklâmcılık İngilizcesi", icon: "duyuru", summary: "Pazarlama terimleri, pazar araştırması, reklam kampanyaları." },
            { source: "Bankacılık ve Finans İngilizcesi", icon: "ucret", summary: "Finansman, kredi ve yatırım piyasaları dili." },
            { source: "Uluslararası Ticaret ve Yatırım", icon: "dunya", summary: "Ticaret kuralları, iş anlaşmaları, ithalat ve ihracat." },
            { source: "İngilizce İş Sunumları", icon: "konusma", summary: "İngilizce sunum teknikleri, hitabet, kültürlerarası bilinç." },
            { source: "İngilizce İş Konuları", icon: "kelime", summary: "Proje yönetimi, sunuş ve ileriye yönelik tahminler." },
            { source: "İş Dünyasından Gerçek Örnekler", icon: "kupa", summary: "Pazarlama, finans, insan kaynakları ve üretim vakaları." },
          ],
        },
      ],
    },
    {
      id: "sertifikalar",
      title: { added: "İş İngilizcesini hangi sınavla belgelersiniz?" },
      answer: { added: "Bugün başlıca seçenekler ETS'nin TOEIC'i ve Cambridge'in Linguaskill Business sınavı." },
      blocks: [
        {
          kind: "table",
          head: ["Sınav", "Kurum", "Ne ölçer"],
          rows: [
            ["TOEIC Listening & Reading", "ETS", "İş yerinde dinleme ve okuma; 10–990 puan"],
            ["TOEIC Speaking & Writing", "ETS", "İş yerinde konuşma ve yazma; ayrı ayrı 0–200 puan"],
            ["Linguaskill Business", "Cambridge", "B1–C2 arası iş İngilizcesi; çevrim içi, modüler"],
          ],
          note: "Cambridge'in BEC sınavları (B1 / B2 / C1 Business) Çin dışında kaldırıldı; LCCI English for Business 2021 sonunda sona erdi.",
        },
      ],
    },
  ],
  branches: null,
  related: [
    {
      title: "İlgili programlar",
      links: [
        { label: "Kurumsal Dil Eğitimi", href: KD },
        { label: "İngilizce Kursu", href: `${YD}/ingilizce-kursu` },
        { label: "İngilizce Özel Ders", href: `${YD}/ingilizce-kursu/ingilizce-ozel-ders` },
        { label: "Online İngilizce Eğitimi", href: `${YD}/ingilizce-kursu/online-ingilizce-egitimi` },
      ],
    },
  ],
  cta: { title: "Şirketinize özel iş İngilizcesi programı planlayalım", sub: "Modüller, seviye ve ders saatleri için size en yakın şubemizle konuşun." },
  sources: ["Cambridge English — Business Certificates, Linguaskill Business", "ETS — TOEIC", "Pearson — LCCI duyurusu"],
  updated: UPDATED,
  edits: {
    // Yazım: "vaka’larıdır".
    "DDM İş İngilizcesi bilgisini geliştirmek için pek çok aracı bir araya getirir. Bu araçlardan biri; son derece değerli eğitim aracı olan çeşitli vaka’larıdır. İş Dünyasından Gerçek Örnekler programımız şu dört ana konuyu ele almaktadır; Pazarlama, Finans, İnsan Kaynakları ve Üretim. Hem Avrupa hem de Kuzey Amerika ile iş yapan yöneticiler için İngiliz İngilizcesi ve Amerikan İngilizcesi arasındaki farklar da ayrıntılı bir şekilde gösterilmektedir.":
      "DDM İş İngilizcesi bilgisini geliştirmek için pek çok aracı bir araya getirir. Bu araçlardan biri; son derece değerli eğitim aracı olan çeşitli vakalardır. İş Dünyasından Gerçek Örnekler programımız şu dört ana konuyu ele almaktadır; Pazarlama, Finans, İnsan Kaynakları ve Üretim. Hem Avrupa hem de Kuzey Amerika ile iş yapan yöneticiler için İngiliz İngilizcesi ve Amerikan İngilizcesi arasındaki farklar da ayrıntılı bir şekilde gösterilmektedir.",
  },
  ignored: [],
};

/* ---------------------------------------------------------------
 * 2 · Çocuklar İçin İngilizce Kursu
 *
 * GENEL bilgi (doğrulandı 2026-09-26):
 * Cambridge Pre A1 Starters / A1 Movers / A2 Flyers, 6–12 yaş, geçme-kalma yok, bölüm başına en fazla 5 kalkan:
 *   https://www.cambridgeenglish.org/exams-and-tests/qualifications/young-learners/
 * A2 Key for Schools (kâğıt + dijital sürüyor), B1 Preliminary for Schools: cambridgeenglish.org
 * TOEFL Primary 8+, TOEFL Junior 11+ (ETS): https://www.ets.org/toefl/primary.html · /junior.html
 * MEB: İngilizce 2. sınıfta başlar; zorunlu ders 2–4. sınıf 2, 5–6. sınıf 3, 7–8. sınıf 4 saat; 5–8'de 2 saat seçmeli
 *   (TTK Kararı 09.05.2025, 2025-2026'dan itibaren): https://tegm.meb.gov.tr/
 * ------------------------------------------------------------- */

const KIDS_H1 = "Çocuklar İçin İngilizce Kursu";
const KIDS_TABLE = "ÇOCUKLAR İÇİN İNGİLİZCE EĞİTİMİ PROGRAMI GÜN VE SAATLERİ";

const KIDS_ENGLISH: SinglePageDef = {
  path: `${DP}/cocuklar-icin-ingilizce-kursu`,
  label: "Çocuklar İçin İngilizce",
  parent: OTHER_PARENT,
  meta: { reasons: [] },
  hero: {
    lead: { src: { heading: KIDS_H1, take: [0] }, sentence: 0 },
    board: {
      kind: "week",
      title: "Haftalık ders programı",
      sub: "Beş seçenek: hafta sonu ya da hafta içi, haftada iki gün",
      // Kaynak tablo: hafta sonu sabah Cmt/Paz 10:00-13:00 · öğlen Cmt/Paz 13:30-16:30 · hafta içi akşam Pzt/Çar ve
      // Sal/Per 19:00-21:30 · hafta içi sabah Pzt/Çar 10:00-13:00 · hepsi "Haftada 6 Saat".
      slots: [
        { days: [5, 6], from: "10:00", to: "13:00", tone: "a", label: "Hafta sonu" },
        { days: [5, 6], from: "13:30", to: "16:30", tone: "a", label: "Hafta sonu" },
        { days: [0, 2], from: "10:00", to: "13:00", tone: "b", label: "Hafta içi" },
        { days: [0, 2], from: "19:00", to: "21:30", tone: "b", label: "Hafta içi" },
        { days: [1, 3], from: "19:00", to: "21:30", tone: "b", label: "Hafta içi" },
      ],
      // Her seçenek haftada iki gün (kaynak tablo). Kaynaktaki "Haftada 6 Saat" hafta içi akşam (19:00-21:30 × 2 = 5 saat)
      // için tutmuyor — firma bilgisi, tabloda birebir; burada tekrarlanmadı (kullanıcıya soruldu, 2026-09-26).
      // "tüm ders araç gereçleri … ücretsiz"
      facts: [
        { value: "2 gün", label: "haftada ders" },
        { value: "5", label: "gün-saat seçeneği" },
        { value: "Ücretsiz", label: "ders materyali" },
      ],
    },
  },
  sections: [
    {
      id: "kimler-icin",
      title: { added: "Program kimler için?" },
      answer: { added: "İlkokul ve ortaokul öğrencileri için." },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: KIDS_H1, take: [0] } },
          items: [
            { icon: "mezuniyet", title: "İlkokul ve ortaokul", text: "Bu yaş grubuna özel program", match: "ilkokul ve ortaokulda" },
            { icon: "okuma", title: "Dört beceri", text: "Okuma, yazma, konuşma, dinleme", match: "okuma, yazma, konuşma ve dinleme" },
            { icon: "konusma", title: "Hedef", text: "Kısa sürede akıcı konuşma", match: "akıcı düzeyde" },
          ],
        },
      ],
    },
    {
      id: "dersler",
      title: { added: "Dersler nasıl işleniyor?" },
      answer: { added: "Drama, müzik, video ve konuşma etkinlikleriyle." },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: KIDS_H1, take: [1] } },
          items: [
            { icon: "aktivite", title: "Drama", text: "Rol yaparak öğrenme", match: "drama" },
            { icon: "dinleme", title: "Müzik ve video", text: "Dinleyerek ve izleyerek", match: "müzik, video" },
            { icon: "sohbet", title: "Konuşma etkinlikleri", text: "Derste bol pratik", match: "konuşma aktiviteleriyle" },
            { icon: "grup", title: "Sosyalleşme", text: "Arkadaşlarıyla birlikte öğrenme", match: "sosyalleşmelerindeki" },
          ],
        },
      ],
    },
    {
      id: "gun-ve-saatler",
      title: { source: KIDS_TABLE },
      answer: { added: "Hafta sonu ya da hafta içi, haftada iki gün." },
      blocks: [
        {
          kind: "table",
          head: ["Program", "Günler", "Saatler", "Toplam"],
          rows: { src: { heading: KIDS_TABLE, take: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22] }, cells: 4 },
          note: null,
        },
      ],
    },
    {
      id: "sinavlar",
      title: { added: "Program sınavlara da hazırlıyor mu?" },
      answer: { src: { heading: KIDS_H1, take: [2] } },
      blocks: [
        {
          kind: "table",
          head: ["Sınav", "Yaş", "Seviye"],
          rows: [
            ["Cambridge Pre A1 Starters", "6–12", "Pre A1"],
            ["Cambridge A1 Movers", "6–12", "A1"],
            ["Cambridge A2 Flyers", "6–12", "A2"],
            ["A2 Key for Schools", "Okul çağı", "A2"],
            ["B1 Preliminary for Schools", "Okul çağı", "B1"],
            ["TOEFL Primary", "8 yaş ve üstü", "CEFR'e göre raporlanır"],
            ["TOEFL Junior", "11 yaş ve üstü", "A2 altı – B2"],
          ],
          note: "Cambridge çocuk sınavlarında geçme-kalma yoktur; her bölümde en fazla 5 kalkan alınır.",
        },
      ],
    },
    {
      id: "okulda-ingilizce",
      title: { added: "Okulda İngilizce kaçıncı sınıfta başlıyor?" },
      answer: { added: "2. sınıfta, haftada 2 saatle." },
      blocks: [
        {
          kind: "table",
          head: ["Sınıf", "Haftalık zorunlu İngilizce"],
          rows: [
            ["2 – 4. sınıf", "2 saat"],
            ["5 – 6. sınıf", "3 saat"],
            ["7 – 8. sınıf", "4 saat"],
          ],
          note: "5–8. sınıflarda ayrıca haftada 2 saatlik seçmeli yabancı dil dersi alınabilir (MEB, 2025-2026'dan itibaren).",
        },
      ],
    },
    {
      id: "materyal",
      title: { added: "Ders materyali ücretli mi?" },
      answer: { src: { heading: KIDS_H1, take: [3] } },
      blocks: [],
    },
  ],
  branches: null,
  related: [
    {
      title: "İlgili programlar",
      links: [
        { label: "İngilizce Kursu", href: `${YD}/ingilizce-kursu` },
        { label: "İlköğretim İngilizcesi", href: "/ingilizce-kurslari/ilkogretim-ingilizce-kursu" },
        { label: "Yaz Okulları (12–17 yaş)", href: "/yurtdisi-egitim/yaz-okullari" },
      ],
    },
  ],
  cta: { title: "Çocuğunuz için doğru grubu birlikte seçelim", sub: "Seviye, gün ve saat için size en yakın şubemizle konuşun." },
  sources: ["Cambridge English — Young Learners, Key / Preliminary for Schools", "ETS — TOEFL Primary, TOEFL Junior", "MEB Talim ve Terbiye Kurulu — Haftalık ders çizelgesi (2025)"],
  updated: UPDATED,
  headingEdits: {
    [KIDS_TABLE]: "Çocuklar için İngilizce eğitimi programı gün ve saatleri",
  },
  edits: {
    // Yazım: "sosyalleşmelerindeki öneminde".
    "Öğrencilerimizin dil eğitimlerini alırken aynı zamanda sosyalleşmelerindeki öneminde farkındayız. Hem daha eğlenceli ders yapılabilmesi, hem de edinilen dilin sosyal aktiviteler aracılığı ile geliştirilebilmesi için, derslerimizi drama, müzik, video ve konuşma aktiviteleriyle desteklemekteyiz.":
      "Öğrencilerimizin dil eğitimlerini alırken aynı zamanda sosyalleşmelerindeki önemin de farkındayız. Hem daha eğlenceli ders yapılabilmesi, hem de edinilen dilin sosyal aktiviteler aracılığı ile geliştirilebilmesi için, derslerimizi drama, müzik, video ve konuşma aktiviteleriyle desteklemekteyiz.",
  },
  ignored: [
    { line: "Günler", reason: "Kaynak tablonun başlık hücresi — tablonun `head` satırı karşılıyor." },
    { line: "Saatler", reason: "Kaynak tablonun başlık hücresi — tablonun `head` satırı karşılıyor." },
    { line: "Toplam Saat", reason: "Kaynak tablonun başlık hücresi — tablonun `head` satırı karşılıyor." },
  ],
};

/* ---------------------------------------------------------------
 * 3 · Tercüme Hizmetleri
 *
 * GENEL bilgi (doğrulandı 2026-09-26):
 * Yeminli tercüman belirli bir noterlikte yemin eder; noter çevirinin içeriğini değil tercümanın kimlik ve imzasını
 *   onaylar: 1512 sayılı Noterlik Kanunu md. 75, 103 (https://www.mevzuat.gov.tr/MevzuatMetin/1.5.1512.pdf),
 *   Noterlik Kanunu Yönetmeliği md. 96.
 * Apostil: 1961 Lahey Sözleşmesi, Türkiye için 29.09.1985; idari belgede valilik / kaymakamlık, adli belgede adalet
 *   komisyonu başkanlığı; taraf olmayan ülkeler için Dışişleri Bakanlığı tasdiki (mfa.gov.tr tasdik bilgilendirme).
 * Simultane / ardıl / fısıltı çeviri tanımları: AIIC https://aiic.org/site/us/interpreting
 * ------------------------------------------------------------- */

const TR_H1 = "Tercüme Hizmetleri";

/** İş ortağı Lavanda'nın İngilizce tanıtımı — kullanıcı kararı (2026-09-26): gösterilmez. */
const LAVANDA_REASON = "İş ortağı Lavanda'nın İngilizce tanıtım metni — kullanıcı kararı (2026-09-26): sayfada yalnız DDM metni.";
const LAVANDA_LINES = [
  "WELCOME",
  "TRANSFORMING LANGUAGE INTO GLOBAL CONNECTIONS",
  "For two decades, Lavanda has been the bridge that connects cultures, business and knowledge through the magic of translation. We are proud to present ourselves as a leader in the translation and language services industry, providing exceptional solutions to global clients.",
  "Our Expertise",
  "With a team of highly qualified linguistic experts, we are able to offer a wide range of services, including:",
  "Book Translation:",
  "We transform literary and academic works into multiple languages, keeping the essence and message intact, enabling authors and publishers to reach global audiences.",
  "Interpreting:",
  "We facilitate real-time communication at international meetings, conferences and events, ensuring that every word and expression is conveyed accurately and clearly.",
  "Simultaneous Translation:",
  "Our highly trained interpreters work in real time, providing a seamless experience at conferences and live broadcasts, connecting multilingual audiences.",
  "Languages:",
  "We help companies adapt their online presence to reach global markets, ensuring their message is culturally relevant and effective in 20 different languages.",
  "OUR CORPORATE PRINCIPLES:",
  "1. The satisfaction of our partners remains our top priority.",
  "2. We are dedicated to providing continuous, high-quality professional solutions to our partners.",
  "3. Our services are delivered by experienced and expert translators.",
  "4. We are committed to swiftly addressing any issues that may arise.",
  "5. We keep a close eye on new technological developments and aim to introduce innovations that benefit our customers.",
  "OUR CORPORATE VALUES:",
  "When you choose us as your corporate solution partner, you can expect:",
  "- A professional approach",
  "- Quality service",
  "- Reliability",
  "- A strong commitment to privacy",
  "- Respect for the value of time",
  "- Uninterrupted consultancy services",
  "We understand that you seek corporate values and a professional service approach, and we are here to meet those expectations.",
  "OUR COMMITMENT",
  "Our mission is to build bridges between words and the world. We value authenticity, accuracy and timely delivery in every project we tackle. Our dedication to excellence in communication is what has kept us a trusted partner to international companies for two decades.",
  "JOIN US",
  "Whether you're looking to expand your global reach, bring your content to new audiences or ensure seamless communication at international events. Let us help you overcome language barriers and connect with the world.",
  "Contact us today and find out how we can transform your words into global connections."
];

const TRANSLATION: SinglePageDef = {
  path: `${DP}/tercume-hizmetleri`,
  label: "Tercüme Hizmetleri",
  parent: OTHER_PARENT,
  meta: { reasons: [] },
  hero: {
    lead: { src: { heading: TR_H1, take: [34] }, sentence: 0 },
    board: {
      kind: "chips",
      title: "Çeviri dilleri",
      sub: "İhtiyacınıza göre çeviri ve tercüme",
      // Kaynaktaki dil listesi (sırası korunarak; "Arapça" çıkarıldı — kullanıcı, 2026-09-30).
      items: [
        "İngilizce", "Almanca", "İspanyolca", "Fransızca", "Rusça", "Çince", "Japonca", "Korece", "Yunanca",
        "Bulgarca", "İsveççe", "Portekizce", "Hırvatça", "Boşnakça", "Farsça", "Slovakça",
      ],
      // "2003 yılından bugüne 19 dilde"
      facts: [
        { value: "19", label: "dilde çeviri" },
        { value: "2003", label: "yılından beri" },
      ],
    },
  },
  sections: [
    {
      id: "hizmetler",
      title: { added: "Hangi çeviri hizmetlerini veriyoruz?" },
      answer: { src: { heading: TR_H1, take: [0] } },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: TR_H1, take: [0] } },
          items: [
            { icon: "mikrofon", title: "Simultane", text: "Toplantı ve konferansta eşzamanlı çeviri", match: "simultane" },
            { icon: "yazma", title: "Yazılı çeviri", text: "Belge ve metin çevirisi", match: "yazılı" },
            { icon: "belge", title: "Noter onaylı", text: "Resmi işlemler için yeminli tercüme", match: "noter onaylı" },
          ],
        },
      ],
    },
    {
      id: "alanlar",
      title: { added: "Hangi alanlarda çeviri yapıyoruz?" },
      answer: { added: "Sağlık sektörü başta olmak üzere, kurumsal ve bireysel." },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: TR_H1, take: [34] } },
          items: [
            { icon: "grup", title: "Sağlık sektörü", text: "Öncelikli alanımız", match: "Sağlık sektörü" },
            { icon: "calisma", title: "Kurumsal", text: "Şirketler ve kurumlar", match: "kurumsal" },
            { icon: "sohbet", title: "Bireysel", text: "Kişisel belge ve işlemler", match: "bireysel" },
            { icon: "kupa", title: "2003'ten beri", text: "19 dilde çeviri", match: "2003 yılından" },
          ],
        },
      ],
    },
    {
      id: "diller",
      title: { added: "Hangi dillerde çeviri yapıyoruz?" },
      answer: { src: { heading: TR_H1, take: [35] } },
      blocks: [],
    },
    {
      id: "noter-onayli",
      title: { added: "Noter onaylı tercüme nasıl yapılır?" },
      answer: { added: "Yeminli tercüman çevirir, noter tercümanın imzasını onaylar." },
      blocks: [
        {
          kind: "table",
          head: ["Adım", "Ne olur"],
          rows: [
            ["1. Yeminli tercüme", "Çeviriyi, bir noterlikte yemin etmiş tercüman yapar."],
            ["2. Noter onayı", "Noter, çevirinin içeriğini değil tercümanın kimliğini ve imzasını onaylar."],
            ["3. Apostil", "Belge yurt dışında kullanılacaksa: idari belgede valilik ya da kaymakamlık, adli belgede adalet komisyonu başkanlığı."],
          ],
          note: "Apostil, 1961 Lahey Sözleşmesi'ne taraf ülkelerde geçerlidir; taraf olmayan ülkeler için Dışişleri Bakanlığı tasdiki gerekir.",
        },
      ],
    },
    {
      id: "sozlu-ceviri",
      title: { added: "Simultane ile ardıl çeviri arasındaki fark ne?" },
      answer: { added: "Simultane konuşmayla aynı anda, ardıl konuşmacı durunca yapılır." },
      blocks: [
        {
          kind: "table",
          head: ["Tür", "Nasıl yapılır", "Nerede"],
          rows: [
            ["Simultane", "Tercüman kabinde kulaklıkla dinler, neredeyse aynı anda çevirir", "Konferans, canlı yayın"],
            ["Ardıl", "Konuşmacı bir bölümü bitirince tercüman not alarak çevirir", "Toplantı, görüşme"],
            ["Fısıltı", "Kabinsiz simultane; tercüman dinleyicinin yanında", "Küçük gruplar"],
          ],
          note: null,
        },
      ],
    },
  ],
  branches: null,
  related: [{ title: "İlgili programlar", links: [{ label: "Kurumsal Dil Eğitimi", href: KD }, { label: "Business English", href: `${DP}/business-english` }] }],
  cta: { title: "Çeviri ihtiyacınız için teklif alın", sub: "Dil, belge türü ve teslim süresi için size en yakın şubemizle konuşun." },
  sources: ["1512 sayılı Noterlik Kanunu ve Noterlik Kanunu Yönetmeliği", "T.C. Dışişleri Bakanlığı — Tasdik bilgilendirme", "AIIC — Interpreting"],
  updated: UPDATED,
  edits: {
    // Yazım: Türkçe karakterler ve büyük harf ("HER DILDE … CEVIRI VE TERCUME").
    "HER DILDE SIMULTANE, YAZILI VE NOTER ONAYLI CEVIRI VE TERCUME": "Her dilde simultane, yazılı ve noter onaylı çeviri ve tercüme.",
    // Yazım: "bir çok".
    "Dünya Dilleri Merkezi olarak 2003 yılından bugüne 19 dilde çeviri ve tercüme hizmeti vermekteyiz. Sağlık sektörü başta olmak üzere bir çok alanda kurumsal ve bireysel olarak hizmetlerimizden faydalanabilirsiniz.":
      "Dünya Dilleri Merkezi olarak 2003 yılından bugüne 19 dilde çeviri ve tercüme hizmeti vermekteyiz. Sağlık sektörü başta olmak üzere birçok alanda kurumsal ve bireysel olarak hizmetlerimizden faydalanabilirsiniz.",
    // Dil listesinden "Arapça" çıkarıldı (kullanıcı, 2026-09-30).
    "İngilizce, Almanca, İspanyolca, Fransızca, Rusça, Çince, Japonca, Korece, Yunanca, Bulgarca, İsveççe, Portekizce, Hırvatça, Boşnakça, Farsça, Slovakça, Arapça dillerinde ihtiyaç ve beklentilerinize yönelik çeviri ve tercüme süreçlerinizi başlatabilirsiniz.":
      "İngilizce, Almanca, İspanyolca, Fransızca, Rusça, Çince, Japonca, Korece, Yunanca, Bulgarca, İsveççe, Portekizce, Hırvatça, Boşnakça, Farsça ve Slovakça dillerinde ihtiyaç ve beklentilerinize yönelik çeviri ve tercüme süreçlerinizi başlatabilirsiniz.",
  },
  ignored: LAVANDA_LINES.map((line) => ({ line, reason: LAVANDA_REASON })),
};

/* ---------------------------------------------------------------
 * 4 · Turkish Course — Exclusive For Pegasus Pilots (kaynak İngilizce → `lang: "en"`)
 * ------------------------------------------------------------- */

const PEGASUS: SinglePageDef = {
  path: `${KD}/turkish-course-pegasus-pilots`,
  label: "Pegasus Pilots",
  parent: { label: "Kurumsal Dil Eğitimi", href: KD },
  lang: "en",
  meta: { reasons: [] },
  hero: {
    lead: { added: "Turkish lessons exclusively for Pegasus pilots — in small groups or private lessons." },
    board: {
      kind: "compare",
      title: "Choose your format",
      sub: "One level at a time",
      cols: [
        { name: "Group Classes", note: "Maximum 8 people", facts: [{ value: "3 months", label: "per level" }, { value: "72 hours", label: "per level" }] },
        { name: "Private Lessons", note: "One to one or max 3 people", facts: [{ value: "2.5 months", label: "per level" }, { value: "60 hours", label: "per level" }] },
      ],
    },
  },
  sections: [
    {
      id: "group",
      title: { source: "Group Classes" },
      answer: { src: { heading: "Group Classes", take: [0] } },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: "Group Classes", take: [1, 2] } },
          items: [
            { icon: "takvim", title: "Duration", text: "One level in 3 months", match: "1 Level - 3 Months" },
            { icon: "saat", title: "Hours", text: "72 hours per level", match: "72 Hours" },
          ],
        },
      ],
    },
    {
      id: "private",
      title: { source: "Private Lessons" },
      answer: { src: { heading: "Private Lessons", take: [0] } },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: "Private Lessons", take: [1, 2] } },
          items: [
            { icon: "takvim", title: "Duration", text: "One level in 2.5 months", match: "1 Level - 2.5 Months" },
            { icon: "saat", title: "Hours", text: "60 hours per level", match: "60 Hours" },
          ],
        },
      ],
    },
    {
      id: "flexible",
      title: { source: "Flexible Study Hours" },
      answer: { added: "Three ways to fit lessons around your schedule." },
      blocks: [
        {
          kind: "facets",
          from: { src: { heading: "Flexible Study Hours" } },
          items: [
            { icon: "ozelders", title: "Private Programs", text: "A program planned for you", match: "Private Programs" },
            { icon: "saat", title: "Make-Up Lessons", text: "Catch up on missed classes", match: "Make-Up Lessons" },
            { icon: "takvim", title: "Weekend Schedule", text: "Classes at the weekend", match: "Weekend Schedule" },
          ],
        },
      ],
    },
  ],
  branches: null,
  related: [{ title: "Kurumsal", links: [{ label: "Kurumsal Dil Eğitimi", href: KD }, { label: "Türkçe Kursu", href: `${YD}/yabancila-icin-turkce-kurs` }] }],
  cta: { title: "Pegasus pilotlarına özel Türkçe kursu", sub: "Grup ya da özel ders seçenekleri için bizimle görüşün." },
  sources: [],
  updated: UPDATED,
  headingEdits: {
    // Yazım: "FLY To Success" (büyük harf karışıklığı).
    "FLY To Success": "Fly to Success",
  },
  edits: {
    // Biçim: parantez içindeki kısa not → cümle (olgu aynı).
    "(Maximum 8 People)": "Maximum 8 people per class.",
    "(One to One or Max 3 People)": "One to one or up to 3 people.",
  },
  ignored: [{ line: "Şimdi İletişime Geç", reason: "Eski sayfanın buton metni — CTA bandı ve Bilgi Al butonu karşılıyor." }],
};

export const OTHER_PROGRAM_PAGES: SinglePageDef[] = [BUSINESS_ENGLISH, KIDS_ENGLISH, TRANSLATION, PEGASUS];
