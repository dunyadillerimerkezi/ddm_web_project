/**
 * Faz 6.5 — 21 üniversite proficiency sayfasının TEK kaynağı.
 *
 * Gövde metni burada YOKTUR (CLAUDE.md §5) — yalnız `site_content.json`daki
 * başlıklara giden referanslar ve kaynakta birebir geçen sayısal olgular
 * (bölüm kartlarındaki süre/soru/puan rozetleri). `lib/universityContent.ts`
 * teki `getUniversityPage()` bu eşlemeyi build zamanında gerçek metinle
 * birleştirir; bir satır kaybolursa veya bir başlık artık kaynakta yoksa
 * `throw` ile build düşer (bkz. `SectionResolver.assertCoverage`).
 *
 * Kaynak: `ddm-web/data/site_content.json` (proficiency-kursu/ altındaki 21
 * üniversite kaydı — kök `/{slug}.html` kopyaları içerik olarak birebir
 * aynı, ayrıca okunmaz, yalnız 301 kaynağıdır). Href doğrulaması yok — bu
 * sayfa tipinde iç link ağı henüz kapsam dışı (hub/ilgili sayfalar Faz 6.5
 * sonrasına bırakıldı, bkz. plan §4).
 *
 * KAPSAM DURUMU (plan §12 Aşama sırası): şu an yalnız Boğaziçi (pilot) dolu.
 * Kalan 20 üniversite onay sonrası katman sırasıyla eklenecek — A (Özyeğin →
 * Bilgi → Doğuş → Sabancı → İstanbul Şehir), B (Maltepe, ODTÜ, Beykent, Koç,
 * Acıbadem, Yeditepe, Işık, İTÜ, YTÜ, Kadir Has, Kocaeli, Marmara, Bahçeşehir,
 * Okan), C (Koç, Acıbadem, Süleyman Şah — bkz. Aşama 0 denetim raporu).
 */

import type { UniversityContentMap, UniversityDef } from "@/lib/universityContent";

/* ---------------------------------------------------------------
 * Izgara/hero indeksi — 21 üniversitenin TEMEL kimliği (Aşama 0 denetiminde
 * doğrulanmış: ad, baş harf, sınav kodu). "DİĞER ÜNİVERSİTELER" ızgarası ve
 * hero rozeti bu alanları kullanır; henüz `content` dolu olmayan
 * üniversiteler de burada listelenir (ızgara linki verir, kendi sayfası
 * Aşama 3'te eklenene kadar 404 döner — Dil Kursu'nun henüz üretilmemiş
 * şube sayfalarına link vermesiyle aynı emsal).
 * ------------------------------------------------------------- */
export type UniversityIndexEntry = {
  slug: string;
  name: string;
  initials: string;
  examCode: string | null;
};

export const UNIVERSITY_INDEX: UniversityIndexEntry[] = [
  { slug: "bogazici-universitesi", name: "Boğaziçi Üniversitesi", initials: "BÜ", examCode: "BUEPT" },
  { slug: "sabanci-universitesi", name: "Sabancı Üniversitesi", initials: "SÜ", examCode: "ELAE" },
  { slug: "ozyegin-universitesi", name: "Özyeğin Üniversitesi", initials: "ÖÜ", examCode: "TRACE" },
  { slug: "istanbul-sehir-universitesi", name: "İstanbul Şehir Üniversitesi", initials: "İŞ", examCode: "STEP" },
  { slug: "istanbul-teknik-universitesi", name: "İstanbul Teknik Üniversitesi", initials: "İT", examCode: null },
  { slug: "yeditepe-universitesi", name: "Yeditepe Üniversitesi", initials: "YÜ", examCode: null },
  { slug: "isik-universitesi", name: "Işık Üniversitesi", initials: "IÜ", examCode: null },
  { slug: "kocaeli-universitesi-hazirlik", name: "Kocaeli Üniversitesi", initials: "KÜ", examCode: null },
  { slug: "dogus-universitesi", name: "Doğuş Üniversitesi", initials: "DÜ", examCode: "DÜİYES" },
  { slug: "koc-universitesi", name: "Koç Üniversitesi", initials: "KÜ", examCode: "KUEPE" },
  { slug: "acibadem-universitesi", name: "Acıbadem Üniversitesi", initials: "AÜ", examCode: "AYES" },
  { slug: "marmara-universitesi", name: "Marmara Üniversitesi", initials: "MÜ", examCode: null },
  { slug: "kadirhas-universitesi-hazirlik", name: "Kadir Has Üniversitesi", initials: "KH", examCode: null },
  { slug: "yildiz-teknik-universitesi", name: "Yıldız Teknik Üniversitesi", initials: "YT", examCode: null },
  { slug: "bilgi-universitesi", name: "Bilgi Üniversitesi", initials: "BÜ", examCode: "BİLET" },
  { slug: "suleymansah-universitesi", name: "Süleyman Şah Üniversitesi", initials: "SŞ", examCode: null },
  { slug: "ortadogu-teknik-universitesi", name: "Orta Doğu Teknik Üniversitesi", initials: "OD", examCode: null },
  { slug: "bahcesehir-universitesi", name: "Bahçeşehir Üniversitesi", initials: "BÜ", examCode: null },
  { slug: "okan-universitesi", name: "Okan Üniversitesi", initials: "OÜ", examCode: null },
  { slug: "maltepe-universitesi", name: "Maltepe Üniversitesi", initials: "MÜ", examCode: null },
  { slug: "beykent-universitesi", name: "Beykent Üniversitesi", initials: "BÜ", examCode: null },
];

/* ---------------------------------------------------------------
 * Boğaziçi — bogazici-universitesi (pilot, 543 kelime, Katman A)
 *
 * Kaynak yapısı (Aşama 0 denetimi): 3 giriş paragrafı → titleHeading'in
 * gövdesi. "...İçeriği:" başlığı gövdesiz (crawl artığı, allowEmpty).
 * "BÜYES/BUEPT üç bölümden oluşmaktadır." AYRI bir başlık — gövdesi 3 çıplak
 * beceri adı satırı (kart verisiyle birebir örtüşür, ayrıca tüketilir). 3
 * gerçek bölüm başlığı (Duyduğunu Anlama/Okuduğunu Anlama/Yazma), her biri
 * kendi gövdesiyle BÖLÜM DETAYLARI'nda tam metin render edilir.
 * ------------------------------------------------------------- */
const bogaziciContent: UniversityContentMap = {
  titleHeading: "Boğaziçi Üniversitesi BUEPT Proficiency Sınavı Hazırlık Atlama Kursu",
  steps: [[0], [1], [2]],
  details: [
    {
      id: "icerik-basligi",
      label: "",
      icon: "belge",
      heading: "Boğaziçi Üniversitesi BUEPT Sınavının İçeriği:",
      allowEmpty: true,
      hidden: true,
    },
    {
      id: "bolum-sayaci",
      label: "",
      icon: "belge",
      heading: "BÜYES/BUEPT üç bölümden oluşmaktadır.",
      hidden: true,
    },
    {
      id: "detay-dinleme",
      label: "Duyduğunu Anlama",
      icon: "dinleme",
      heading: "Duyduğunu Anlama Bölümü:",
    },
    {
      id: "detay-okuma",
      label: "Okuduğunu Anlama",
      icon: "okuma",
      heading: "Okuduğunu Anlama Bölümü:",
    },
    {
      id: "detay-yazma",
      label: "Yazılı İfade",
      icon: "yazma",
      heading: "Yazma Bölümü:",
    },
  ],
  structureTitle: "Boğaziçi Üniversitesi BUEPT Sınavının İçeriği",
  structureLead: "BÜYES/BUEPT üç bölümden oluşmaktadır.",
  sections: [
    {
      name: "Duyduğunu Anlama",
      skill: "Dinleme",
      icon: "dinleme",
      parts: [
        {
          title: "Seçici Dinleme (Selective Listening)",
          meta: [
            { icon: "sure", text: "3 dk inceleme" },
            { icon: "sure", text: "3 dk kontrol" },
          ],
        },
        {
          title: "Ayrıntılı Dinleme (Careful Listening)",
          meta: [
            { icon: "sure", text: "15 dk cevaplama" },
            { icon: "kisim", text: "not alma serbest" },
          ],
        },
      ],
    },
    {
      name: "Okuduğunu Anlama",
      skill: "Okuma",
      icon: "okuma",
      parts: [
        {
          title: "Arayarak Okuma (Search Reading)",
          meta: [
            { icon: "soru", text: "8–10 soru" },
            { icon: "sure", text: "30–35 dk" },
          ],
        },
        {
          title: "Ayrıntılı Okuma (Careful Reading)",
          meta: [
            { icon: "soru", text: "9–11 soru" },
            { icon: "sure", text: "40–50 dk" },
          ],
        },
      ],
    },
    {
      name: "Yazılı İfade",
      skill: "Yazma",
      icon: "yazma",
      parts: [
        {
          title: "İki kompozisyon",
          meta: [
            { icon: "soru", text: "2 kompozisyon" },
            { icon: "kisim", text: "~1 A4 sayfa / kompozisyon" },
          ],
        },
        {
          title: "Süre kullanımı",
          meta: [
            { icon: "sure", text: "40 dk / kompozisyon" },
            { icon: "sure", text: "toplam 80 dk" },
          ],
        },
      ],
    },
  ],
  sectionDetailIds: ["detay-dinleme", "detay-okuma", "detay-yazma"],
  ignored: [],
};

/* ---------------------------------------------------------------
 * Özyeğin — ozyegin-universitesi (662 kelime, Katman A, TRACE)
 *
 * "Sınav dört bölümden oluşmaktadır. Ancak birinci bölüm değerlendirilmez."
 * AYRI bir başlık (Boğaziçi'nin sayaç başlığı deseniyle aynı) — 4 çıplak
 * bölüm adı satırı taşıyor, hidden detay olarak tüketiliyor. "TRACE'e
 * Hazırlık" bölümü notlandırılmıyor (kaynakta açıkça belirtiliyor).
 * ------------------------------------------------------------- */
const ozyeginContent: UniversityContentMap = {
  titleHeading: "TRACE Kursu",
  steps: [[0], [1], [2]],
  details: [
    {
      id: "trace-hakkinda",
      label: "TRACE Sınavı Hakkında",
      icon: "belge",
      heading: "Özyeğin Üniversitesi TRACE Sınavının İçeriği:",
    },
    {
      id: "bolum-sayaci",
      label: "",
      icon: "belge",
      heading: "Sınav dört bölümden oluşmaktadır. Ancak birinci bölüm değerlendirilmez.",
      hidden: true,
    },
    {
      id: "trace-hazirlik",
      label: "TRACE'e Hazırlık",
      icon: "belge",
      heading: "1. Bölüm: TRACE'e Hazırlık",
    },
    { id: "trace-okuma", label: "Okuma", icon: "okuma", heading: "2. Bölüm: Okuma" },
    { id: "trace-dinleme", label: "Dinleme", icon: "dinleme", heading: "3. Bölüm: Dinleme" },
    { id: "trace-yazma", label: "Yazma", icon: "yazma", heading: "4. Bölüm: Yazma" },
    {
      id: "muafiyet",
      label: "İngilizce Hazırlık Programından Muafiyet",
      icon: "belge",
      heading: "İngilizce Hazırlık Programından Muafiyet",
    },
  ],
  structureTitle: "Özyeğin Üniversitesi TRACE Sınavının İçeriği",
  structureLead: "Sınav dört bölümden oluşmaktadır. Ancak birinci bölüm değerlendirilmez.",
  sections: [
    {
      name: "TRACE'e Hazırlık",
      skill: "Notlandırılmaz",
      icon: "belge",
      parts: [{ title: "Konu başlığına giriş", meta: [{ icon: "kisim", text: "puana dahil değil" }] }],
    },
    {
      name: "Okuma",
      skill: null,
      icon: "okuma",
      parts: [{ title: "4 alt bölüm", meta: [{ icon: "kisim", text: "250–1000 kelime / parça" }] }],
    },
    {
      name: "Dinleme",
      skill: null,
      icon: "dinleme",
      parts: [{ title: "2 kısım", meta: [{ icon: "sure", text: "14–15 dk ders metni" }] }],
    },
    {
      name: "Yazma",
      skill: null,
      icon: "yazma",
      parts: [{ title: "Akademik kompozisyon", meta: [{ icon: "soru", text: "400–450 kelime" }] }],
    },
  ],
  sectionDetailIds: ["trace-hazirlik", "trace-okuma", "trace-dinleme", "trace-yazma"],
  ignored: [],
};

/* ---------------------------------------------------------------
 * Bilgi — bilgi-universitesi (239 kelime, Katman A, BİLET)
 *
 * "Bilgi Bilet (...İçeriği)" başlığı gövdesiz (Boğaziçi deseni) — iki aşama
 * başlığı doğrudan ardından geliyor.
 * ------------------------------------------------------------- */
const bilgiContent: UniversityContentMap = {
  titleHeading: "Bilgi Üniversitesi BİLET Kursu",
  steps: [[0], [1], [2]],
  details: [
    {
      id: "icerik-basligi",
      label: "",
      icon: "belge",
      heading: "Bilgi Bilet (Bilgi Üniversitesi İngilizce Dil Sınavlarının İçeriği)",
      allowEmpty: true,
      hidden: true,
    },
    {
      id: "bilet-1",
      label: "BİLET 1. Aşama (Seviye Tespit)",
      icon: "dilbilgisi",
      heading: "BİLET 1. Aşama Sınavı (Seviye Tespit Sınavı)",
    },
    {
      id: "bilet-2",
      label: "BİLET 2. Aşama (Hazırlık Muafiyet)",
      icon: "konusma",
      heading: "BİLET 2. Aşama Sınavı (Hazırlık Muafiyet Sınavı)",
    },
  ],
  structureTitle: "Bilgi Üniversitesi BİLET Sınavının İçeriği",
  structureLead: null,
  sections: [
    {
      name: "BİLET 1. Aşama",
      skill: "Seviye Tespit Sınavı",
      icon: "dilbilgisi",
      parts: [
        {
          title: "Çoktan seçmeli sınav",
          meta: [
            { icon: "soru", text: "20 okuma + 30 dilbilgisi sorusu" },
            { icon: "puan", text: "45+ puan → 2. Aşama" },
          ],
        },
      ],
    },
    {
      name: "BİLET 2. Aşama",
      skill: "Hazırlık Muafiyet Sınavı",
      icon: "konusma",
      parts: [
        {
          title: "İki günlük yeterlilik sınavı",
          meta: [
            { icon: "kisim", text: "1. gün konuşma" },
            { icon: "puan", text: "60+ puan → lisans" },
          ],
        },
      ],
    },
  ],
  sectionDetailIds: ["bilet-1", "bilet-2"],
  ignored: [],
};

/* ---------------------------------------------------------------
 * Doğuş — dogus-universitesi (347 kelime, Katman A, DÜİYES)
 *
 * "Ara Sınav" ve "Yılsonu Yeterlik Sınavı Soru Tipleri" başlıkları DÜİYES
 * I/II'nin bölüm KARTLARI değil — ikisini de kapsayan soru-tipi listeleri;
 * bu yüzden yalnız BÖLÜM DETAYLARI'nda render edilir, kart üretilmez.
 * ------------------------------------------------------------- */
const dogusContent: UniversityContentMap = {
  titleHeading: "Doğuş Üniversitesi DÜİYES Kursu",
  steps: [[0], [1], [2]],
  details: [
    {
      id: "icerik-ozet",
      label: "",
      icon: "belge",
      heading: "Doğuş Üniversitesi Hazırlık Atlama DÜİYES Sınavlarının İçeriği:",
      hidden: true,
    },
    { id: "duiyes-1", label: "DÜİYES I", icon: "dilbilgisi", heading: "Birinci Aşama DÜİYES I" },
    { id: "duiyes-2", label: "DÜİYES II", icon: "yazma", heading: "İkinci Aşama ise DÜİYES II" },
    {
      id: "ara-sinav-tipleri",
      label: "Ara Sınav Soru Tipleri",
      icon: "kullanim",
      heading: "Doğuş Üniversitesi Ara Sınav Soru Tipleri",
    },
    {
      id: "yilsonu-tipleri",
      label: "Yılsonu Yeterlik Sınavı Soru Tipleri",
      icon: "kullanim",
      heading: "Yılsonu Yeterlik Sınavı Soru Tipleri",
    },
    {
      id: "muafiyet",
      label: "Muafiyet Sınavı Eşdeğerlik ve Puanları",
      icon: "belge",
      heading: "İngilizce Muafiyet Sınavı Eşdeğerlik ve Muafiyet Puanları",
    },
  ],
  structureTitle: "Doğuş Üniversitesi Hazırlık Atlama DÜİYES Sınavlarının İçeriği",
  structureLead: "Hazırlık atlama muafiyet sınavı 2 aşamadan oluşmaktadır.",
  sections: [
    {
      name: "DÜİYES I",
      skill: "Zorunlu genel sınav",
      icon: "dilbilgisi",
      parts: [{ title: "Yeni kayıtlı tüm öğrenciler", meta: [{ icon: "sure", text: "2 saat" }] }],
    },
    {
      name: "DÜİYES II",
      skill: null,
      icon: "yazma",
      parts: [
        {
          title: "2 aşamalı sınav",
          meta: [
            { icon: "kisim", text: "1. bölüm: dinleme, okuma, dilbilgisi" },
            { icon: "kisim", text: "2. bölüm: yazma" },
          ],
        },
      ],
    },
  ],
  sectionDetailIds: ["duiyes-1", "duiyes-2"],
  ignored: [],
};

/* ---------------------------------------------------------------
 * Sabancı — sabanci-universitesi (718 kelime, Katman A, ELAE — en karmaşık)
 *
 * İKİ ayrı sınav bir sayfada: ana ELAE (devam eden öğrenciler, 3 beceri) +
 * ELAE Stage 1 (yeni kayıtlı öğrenciler, seviye tespit). "...Grammar
 * Bölümü:" ve "...Vocabulary Bölümü:" başlıkları gövdesiz (Boğaziçi
 * deseni) — gerçek içerik hemen ardından gelen sayaç cümlesi başlığında.
 * ------------------------------------------------------------- */
const sabanciContent: UniversityContentMap = {
  titleHeading: "ELAE Kursu",
  steps: [[0], [1], [2]],
  details: [
    {
      id: "elae-hakkinda",
      label: "ELAE Sınavı Hakkında",
      icon: "belge",
      heading: "Sabancı Üniversitesi ELAE Sınavının İçeriği:",
    },
    { id: "elae-writing", label: "ELAE Writing", icon: "yazma", heading: "ELAE Writing:" },
    { id: "elae-listening", label: "ELAE Listening", icon: "dinleme", heading: "ELAE Listening:" },
    { id: "elae-while-listening", label: "While Listening", icon: "dinleme", heading: "While Listening:" },
    { id: "elae-note-taking", label: "Note-taking", icon: "dinleme", heading: "Note - taking:" },
    { id: "elae-reading", label: "ELAE Reading", icon: "okuma", heading: "ELAE Reading:" },
    { id: "elae-detailed-reading", label: "Detailed Reading", icon: "okuma", heading: "Detailed Reading:" },
    {
      id: "elae-stage1-hakkinda",
      label: "ELAE Stage 1 Sınav İçeriği",
      icon: "belge",
      heading: "Sabancı - ELAE Stage 1 Sınav İçeriği",
    },
    {
      id: "stage1-grammar-empty",
      label: "",
      icon: "belge",
      heading: "ELAE Stage 1 Grammar Bölümü:",
      allowEmpty: true,
      hidden: true,
    },
    {
      id: "elae-stage1-grammar",
      label: "ELAE Stage 1 — Grammar Bölümü",
      icon: "dilbilgisi",
      heading: "Toplam 40 soru sorulur. Toplam süre 40 dakikadır. 3 bölümden oluşur.",
    },
    {
      id: "stage1-vocab-empty",
      label: "",
      icon: "belge",
      heading: "ELAE Stage 1 Vocabulary Bölümü:",
      allowEmpty: true,
      hidden: true,
    },
    {
      id: "elae-stage1-vocab",
      label: "ELAE Stage 1 — Vocabulary Bölümü",
      icon: "kelime",
      heading: "Toplam süre 20 dakikadır. 2 bölümden oluşur:",
    },
    {
      id: "elae-stage1-writing",
      label: "ELAE Stage 1 — Writing Bölümü",
      icon: "yazma",
      heading: "ELAE Stage 1 Writing Bölümü:",
    },
    {
      id: "muafiyet",
      label: "İngilizce Hazırlık Programından Muafiyet",
      icon: "belge",
      heading: "İngilizce Hazırlık Programından Muafiyet",
    },
  ],
  structureTitle: "Sabancı Üniversitesi ELAE Sınavının İçeriği",
  structureLead:
    "ELAE sınavı Üç bölümden oluşmaktadır. Öğrencilerin bu sınavda başarılı sayılabilmeleri için 70 puan almaları gerekir.",
  sections: [
    {
      name: "ELAE Writing",
      skill: "Kompozisyon",
      icon: "yazma",
      parts: [
        {
          title: "300–350 kelime kompozisyon",
          meta: [
            { icon: "sure", text: "50 dk" },
            { icon: "puan", text: "%30 ağırlık" },
          ],
        },
      ],
    },
    {
      name: "ELAE Listening",
      skill: "While Listening + Note-taking",
      icon: "dinleme",
      parts: [
        {
          title: "İki bölüm",
          meta: [
            { icon: "sure", text: "toplam 25 dk" },
            { icon: "puan", text: "%30 ağırlık" },
          ],
        },
      ],
    },
    {
      name: "ELAE Reading",
      skill: "Skimming + Detailed Reading",
      icon: "okuma",
      parts: [
        {
          title: "İki bölüm",
          meta: [
            { icon: "sure", text: "toplam 85 dk" },
            { icon: "puan", text: "%40 ağırlık" },
          ],
        },
      ],
    },
    {
      name: "ELAE Stage 1",
      skill: "Yeni kayıtlı öğrenciler — seviye tespit",
      icon: "dilbilgisi",
      parts: [
        {
          title: "3 bölüm: Grammar / Vocabulary / Writing",
          meta: [{ icon: "sure", text: "90 dk toplam" }],
        },
      ],
    },
  ],
  sectionDetailIds: ["elae-writing", "elae-listening", "elae-reading", "elae-stage1-hakkinda"],
  ignored: [],
};

/* ---------------------------------------------------------------
 * İstanbul Şehir — istanbul-sehir-universitesi (1077 kelime, Katman A,
 * en zengin sayfa — DBS + STEP, iki ayrı sınav)
 *
 * "İngilizce Düzey Belirleme Sınavı (DBS)" başlığı kaynakta İKİ kez geçiyor:
 * ilk geçiş yalnız 1 satırlık bir dizin öğesi ("İngilizce Yeterlilik Sınavı
 * (STEP...)"), ikinci geçiş DBS'in gerçek gövdesi. `SectionResolver.take()`
 * her çağrıda başlığın TÜM occurrence'larını birleştirip KENDİ `take`
 * seçicisini uyguladığı için aynı başlığa iki ayrı `take` indeksiyle iki
 * kez başvurulabiliyor (dizin satırı `take:[0]` ile gizli tüketilir, gerçek
 * gövde `take:"rest"` ile görünür bloğa gider) — bkz. `lib/universityContent.ts`
 * `SectionResolver.take()` davranışı. Aynı teknik, tek geçişli "Konuşma
 * Bölümü % 20" başlığının gövdesini (konuşma özeti + ödeme/kimlik bilgisi
 * karışık) iki ayrı bloğa bölmek için de kullanıldı.
 * ------------------------------------------------------------- */
const istanbulSehirContent: UniversityContentMap = {
  titleHeading: "İstanbul Şehir Üniversitesi DBS ve STEP Hazırlık Atlama Sınavı Kursu",
  steps: [[0, 1], [2], [3]],
  details: [
    {
      id: "icerik-genel",
      label: "Sınavın Genel İçeriği",
      icon: "belge",
      heading: "İstanbul Şehir Üniversitesi Hazırlık Atlama Sınavının İçeriği:",
    },
    {
      id: "dbs-index",
      label: "",
      icon: "belge",
      heading: "İngilizce Düzey Belirleme Sınavı (DBS)",
      take: [0],
      hidden: true,
    },
    {
      id: "dbs-detay",
      label: "İngilizce Düzey Belirleme Sınavı (DBS)",
      icon: "dilbilgisi",
      heading: "İngilizce Düzey Belirleme Sınavı (DBS)",
      take: "rest",
    },
    {
      id: "step-genel",
      label: "STEP Genel Bilgi",
      icon: "belge",
      heading: "İstanbul Şehir Üniversitesi İngilizce Yeterlilik Sınavı (STEP)",
    },
    {
      id: "step-okuma",
      label: "STEP — Okuma Bölümü",
      icon: "okuma",
      heading: "Okuma bölümü, yüzde 35 ağırlığa sahip olup 80 dakika sürecektir. Bu bölüm üç okuma parçasından oluşmaktadır.",
    },
    {
      id: "step-dinleme-yazma",
      label: "STEP — Dinleme ve Yazma Bölümleri",
      icon: "dinleme",
      heading:
        "Dinleme bölümü, yüzde 25 ağırlığa sahip olup yaklaşık 35 dakika sürecektir. Bu bölüm iki dinleme parçasından oluşmaktadır.",
    },
    {
      id: "step-konusma",
      label: "STEP — Konuşma Bölümü (Sözlü)",
      icon: "konusma",
      heading: "Konuşma bölümü, üç kısımdan oluşup, yüzde 20 ağırlığa sahiptir. Her aday için 15-20 dakika sürecektir.",
    },
    { id: "step-okuma-ozet", label: "STEP — Okuma Özeti", icon: "okuma", heading: "Okuma Bölümü: % 35" },
    { id: "step-dinleme-ozet", label: "STEP — Dinleme Özeti", icon: "dinleme", heading: "Dinleme Bölümü % 25" },
    { id: "step-yazma-ozet", label: "STEP — Yazma Özeti", icon: "yazma", heading: "Yazma Bölümü % 20" },
    {
      id: "step-konusma-ozet",
      label: "STEP — Konuşma Özeti",
      icon: "konusma",
      heading: "Konuşma Bölümü % 20",
      take: [0, 1, 2, 3],
    },
    {
      id: "step-odeme",
      label: "STEP — Sınav Ücreti ve Kimlik Bilgisi",
      icon: "belge",
      heading: "Konuşma Bölümü % 20",
      take: [4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
  ],
  structureTitle: "İstanbul Şehir Üniversitesi Hazırlık Atlama Sınavının İçeriği",
  structureLead: null,
  sections: [
    {
      name: "Düzey Belirleme Sınavı (DBS)",
      skill: "Ücretsiz ön eleme",
      icon: "dilbilgisi",
      parts: [{ title: "Tek oturum", meta: [{ icon: "sure", text: "50 dk" }] }],
    },
    {
      name: "Okuma",
      skill: "STEP — Yazılı",
      icon: "okuma",
      parts: [
        {
          title: "3 okuma parçası",
          meta: [
            { icon: "puan", text: "%35 ağırlık" },
            { icon: "sure", text: "80 dk" },
          ],
        },
      ],
    },
    {
      name: "Dinleme",
      skill: "STEP — Yazılı",
      icon: "dinleme",
      parts: [
        {
          title: "2 dinleme parçası",
          meta: [
            { icon: "puan", text: "%25 ağırlık" },
            { icon: "sure", text: "~35 dk" },
          ],
        },
      ],
    },
    {
      name: "Yazma",
      skill: "STEP — Yazılı",
      icon: "yazma",
      parts: [
        {
          title: "Kompozisyon",
          meta: [
            { icon: "puan", text: "%20 ağırlık" },
            { icon: "sure", text: "70 dk" },
            { icon: "soru", text: "350+ kelime" },
          ],
        },
      ],
    },
    {
      name: "Konuşma",
      skill: "STEP — Sözlü",
      icon: "konusma",
      parts: [
        {
          title: "3 kısım",
          meta: [
            { icon: "puan", text: "%20 ağırlık" },
            { icon: "sure", text: "15–20 dk" },
          ],
        },
      ],
    },
  ],
  sectionDetailIds: [
    "dbs-detay",
    "step-okuma-ozet",
    "step-dinleme-ozet",
    "step-yazma-ozet",
    "step-konusma-ozet",
  ],
  ignored: [],
};

/* ---------------------------------------------------------------
 * İTÜ — istanbul-teknik-universitesi (408 kelime, Katman B — zengin veri)
 *
 * Kaynakta bölüm başına AYRI başlık yok — tek "...İçeriği:" başlığı altında
 * 19 paragraf. `SectionResolver.take()`in her çağrıda başlığın TÜM
 * gövdesini yeniden birleştirip KENDİ `take` indeks seçicisini uyguladığı
 * özelliği kullanılarak (bkz. İstanbul Şehir yorum notu) bu 19 satır 7 ayrı
 * detay bloğuna bölündü — hepsi AYNI başlığa farklı indeks dizileriyle
 * başvuruyor.
 * ------------------------------------------------------------- */
const ituContent: UniversityContentMap = {
  titleHeading: "İTÜ PROFICIENCY Kursu",
  steps: [[0], [1], [2, 3]],
  details: [
    {
      id: "itu-genel",
      label: "İTÜ Sınavı Genel Bilgi",
      icon: "belge",
      heading: "İstanbul Teknik Üniversitesi Hazırlık Atlama Sınavının İçeriği:",
      take: [0, 1],
    },
    {
      id: "itu-asama1",
      label: "Birinci Aşama — Restatement + Reading",
      icon: "dilbilgisi",
      heading: "İstanbul Teknik Üniversitesi Hazırlık Atlama Sınavının İçeriği:",
      take: [2, 3, 4],
    },
    {
      id: "itu-asama2",
      label: "İkinci Aşama — Listening + Writing",
      icon: "dinleme",
      heading: "İstanbul Teknik Üniversitesi Hazırlık Atlama Sınavının İçeriği:",
      take: [5, 6, 7, 8],
    },
    {
      id: "itu-restatement",
      label: "Restatement Bölümü Detayı",
      icon: "dilbilgisi",
      heading: "İstanbul Teknik Üniversitesi Hazırlık Atlama Sınavının İçeriği:",
      take: [9, 10],
    },
    {
      id: "itu-reading",
      label: "Reading Comprehension Detayı",
      icon: "okuma",
      heading: "İstanbul Teknik Üniversitesi Hazırlık Atlama Sınavının İçeriği:",
      take: [11, 12, 13],
    },
    {
      id: "itu-listening",
      label: "Listening Comprehension Detayı",
      icon: "dinleme",
      heading: "İstanbul Teknik Üniversitesi Hazırlık Atlama Sınavının İçeriği:",
      take: [14, 15, 16],
    },
    {
      id: "itu-writing",
      label: "Essay Writing Detayı",
      icon: "yazma",
      heading: "İstanbul Teknik Üniversitesi Hazırlık Atlama Sınavının İçeriği:",
      take: [17, 18],
    },
  ],
  structureTitle: "İstanbul Teknik Üniversitesi Hazırlık Atlama Sınavının İçeriği",
  structureLead: "İTÜ yeterlilik sınavı toplam 2 bölümden oluşmaktadır.",
  sections: [
    {
      name: "Restatement",
      skill: "Birinci Aşama",
      icon: "dilbilgisi",
      parts: [
        {
          title: "Başka kelimelerle anlatım",
          meta: [
            { icon: "soru", text: "15 soru" },
            { icon: "puan", text: "%15 ağırlık" },
          ],
        },
      ],
    },
    {
      name: "Reading Comprehension",
      skill: "Birinci Aşama",
      icon: "okuma",
      parts: [
        {
          title: "3–5 okuma parçası",
          meta: [
            { icon: "soru", text: "30 soru, 7–10 / parça" },
            { icon: "puan", text: "%45 ağırlık" },
          ],
        },
      ],
    },
    {
      name: "Listening Comprehension",
      skill: "İkinci Aşama",
      icon: "dinleme",
      parts: [
        {
          title: "Tek dinleme, not alarak",
          meta: [
            { icon: "soru", text: "10 soru" },
            { icon: "puan", text: "%20 ağırlık" },
          ],
        },
      ],
    },
    {
      name: "Essay Writing",
      skill: "İkinci Aşama",
      icon: "yazma",
      parts: [{ title: "250–350 kelime kompozisyon", meta: [{ icon: "puan", text: "%20 ağırlık" }] }],
    },
  ],
  sectionDetailIds: ["itu-restatement", "itu-reading", "itu-listening", "itu-writing"],
  ignored: [],
};

/* ---------------------------------------------------------------
 * ODTÜ — ortadogu-teknik-universitesi (194 kelime, Katman B — zengin veri)
 * ------------------------------------------------------------- */
const odtuContent: UniversityContentMap = {
  titleHeading: "Orta Doğu Teknik Üniversitesi ODTÜ Proficiency Hazırlık Atlama Sınavı Kursu",
  steps: [[0], [1], [2, 3]],
  details: [
    {
      id: "odtu-sabah",
      label: "Sabah Oturumu — Dinlediğini Anlama + Okuma",
      icon: "dinleme",
      heading: "Orta Doğu Teknik Üniversitesi ODTÜ Hazırlık Atlama Sınavının İçeriği:",
      take: [0, 1, 2],
    },
    {
      id: "odtu-oglen",
      label: "Öğleden Sonra Oturumu — Dilin Kullanımı + Not Tutma ve Yazma",
      icon: "kullanim",
      heading: "Orta Doğu Teknik Üniversitesi ODTÜ Hazırlık Atlama Sınavının İçeriği:",
      take: [3, 4],
    },
  ],
  structureTitle: "Orta Doğu Teknik Üniversitesi ODTÜ Hazırlık Atlama Sınavının İçeriği",
  structureLead:
    "ODTÜ Hazırlık atlama sınavı sabah ve öğleden sonra olmak üzere 2 oturum şeklindedir. Sınav toplam dört bölümden oluşmaktadır.",
  sections: [
    {
      name: "Dinlediğini Anlama",
      skill: "Sabah oturumu",
      icon: "dinleme",
      parts: [{ title: "Çoktan seçmeli", meta: [{ icon: "soru", text: "30 soru" }, { icon: "puan", text: "30 puan" }] }],
    },
    {
      name: "Okuma",
      skill: "Sabah oturumu",
      icon: "okuma",
      parts: [{ title: "Çoktan seçmeli", meta: [{ icon: "soru", text: "30 soru" }, { icon: "puan", text: "30 puan" }] }],
    },
    {
      name: "Dilin Kullanımı",
      skill: "Öğleden sonra oturumu",
      icon: "kullanim",
      parts: [{ title: "Use of English", meta: [{ icon: "puan", text: "20 puan" }] }],
    },
    {
      name: "Not Tutma ve Yazma",
      skill: "Öğleden sonra oturumu",
      icon: "yazma",
      parts: [{ title: "Not alarak yazma", meta: [{ icon: "puan", text: "20 puan" }] }],
    },
  ],
  sectionDetailIds: ["odtu-sabah", "odtu-sabah", "odtu-oglen", "odtu-oglen"],
  ignored: [],
};

/* ---------------------------------------------------------------
 * YTÜ — yildiz-teknik-universitesi (243 kelime, Katman B — zengin veri, 6 bölüm)
 * ------------------------------------------------------------- */
const ytuContent: UniversityContentMap = {
  titleHeading: "YTÜ Proficiency Kursu",
  steps: [[0], [1], [2]],
  details: [
    {
      id: "ytu-genel",
      label: "İYS Genel Bilgi",
      icon: "belge",
      heading: "YTÜ Hazırlık Atlama Sınavının İçeriği:",
      take: [0],
    },
    {
      id: "ytu-1",
      label: "1. Bölüm — Dilbilgisi (Cloze Test)",
      icon: "dilbilgisi",
      heading: "YTÜ Hazırlık Atlama Sınavının İçeriği:",
      take: [1],
    },
    {
      id: "ytu-2",
      label: "2. Bölüm — Reading",
      icon: "okuma",
      heading: "YTÜ Hazırlık Atlama Sınavının İçeriği:",
      take: [2],
    },
    {
      id: "ytu-3",
      label: "3. Bölüm — Yakın Anlamlı Cümle",
      icon: "dilbilgisi",
      heading: "YTÜ Hazırlık Atlama Sınavının İçeriği:",
      take: [3],
    },
    {
      id: "ytu-4",
      label: "4. Bölüm — Paragraf Tamamlama",
      icon: "okuma",
      heading: "YTÜ Hazırlık Atlama Sınavının İçeriği:",
      take: [4],
    },
    {
      id: "ytu-5",
      label: "5. Bölüm — Listening",
      icon: "dinleme",
      heading: "YTÜ Hazırlık Atlama Sınavının İçeriği:",
      take: [5],
    },
    {
      id: "ytu-6",
      label: "6. Bölüm — Writing",
      icon: "yazma",
      heading: "YTÜ Hazırlık Atlama Sınavının İçeriği:",
      take: [6],
    },
  ],
  structureTitle: "YTÜ Hazırlık Atlama Sınavının İçeriği",
  structureLead: "YTÜ Yabancı Diller Yüksekokulu İngilizce Yeterlilik Sınavı (İYS) 6 bölümden oluşmaktadır.",
  sections: [
    {
      name: "Dilbilgisi (Cloze Test)",
      skill: "1. Bölüm",
      icon: "dilbilgisi",
      parts: [{ title: "Çoktan seçmeli", meta: [{ icon: "kisim", text: "3 adet Cloze Test" }] }],
    },
    {
      name: "Reading",
      skill: "2. Bölüm",
      icon: "okuma",
      parts: [{ title: "Okuduğunu anlama", meta: [{ icon: "kisim", text: "2 adet Reading parçası" }] }],
    },
    {
      name: "Yakın Anlamlı Cümle",
      skill: "3. Bölüm",
      icon: "dilbilgisi",
      parts: [{ title: "Paraphrase soruları", meta: [{ icon: "kisim", text: "cümle eşleştirme" }] }],
    },
    {
      name: "Paragraf Tamamlama",
      skill: "4. Bölüm",
      icon: "okuma",
      parts: [{ title: "Boşluk doldurma", meta: [{ icon: "kisim", text: "cümle seçimi" }] }],
    },
    {
      name: "Listening",
      skill: "5. Bölüm",
      icon: "dinleme",
      parts: [{ title: "Dinleme esnasında cevaplama", meta: [{ icon: "kisim", text: "2 adet Listening parçası" }] }],
    },
    {
      name: "Writing",
      skill: "6. Bölüm",
      icon: "yazma",
      parts: [{ title: "Kompozisyon", meta: [{ icon: "kisim", text: "2 konudan 1 seçim" }] }],
    },
  ],
  sectionDetailIds: ["ytu-1", "ytu-2", "ytu-3", "ytu-4", "ytu-5", "ytu-6"],
  ignored: [],
};

/* ---------------------------------------------------------------
 * Kadir Has — kadirhas-universitesi-hazirlik (265 kelime, Katman B — %ağırlık)
 * ------------------------------------------------------------- */
const kadirhasContent: UniversityContentMap = {
  titleHeading: "Kadir Has Üniversitesi Hazırlık Atlama Sınavı Kursu",
  steps: [[0], [1], [2, 3]],
  details: [
    {
      id: "kh-genel",
      label: "Sınav Takvimi ve Genel Bilgi",
      icon: "belge",
      heading: "Kadir Has Üniversitesi Hazırlık Atlama Sınavının İçeriği:",
      take: [0],
    },
    {
      id: "kh-agirliklar",
      label: "Bölüm Ağırlıkları",
      icon: "puan",
      heading: "Kadir Has Üniversitesi Hazırlık Atlama Sınavının İçeriği:",
      take: [1, 2, 3, 4],
    },
    {
      id: "kh-asamalar",
      label: "KHAS-STS ve KHAS-İYS Aşamaları",
      icon: "dilbilgisi",
      heading: "Kadir Has Üniversitesi Hazırlık Atlama Sınavının İçeriği:",
      take: [5, 6, 7],
    },
    {
      id: "kh-kosullar",
      label: "Katılım Şartları ve Muafiyet",
      icon: "belge",
      heading: "Kadir Has Üniversitesi Hazırlık Atlama Sınavının İçeriği:",
      take: [8, 9, 10],
    },
  ],
  structureTitle: "Kadir Has Üniversitesi Hazırlık Atlama Sınavının İçeriği",
  structureLead:
    "İngilizce Yeterlik Sınavı Eylül, Ocak ve Mayıs aylarında yılda 3 kez yapılmaktadır. Sınav dört bölümden oluşmaktadır.",
  sections: [
    {
      name: "Yazma",
      skill: "Writing",
      icon: "yazma",
      parts: [{ title: "Bölüm ağırlığı", meta: [{ icon: "puan", text: "%30" }] }],
    },
    {
      name: "Okuma",
      skill: "Reading",
      icon: "okuma",
      parts: [{ title: "Bölüm ağırlığı", meta: [{ icon: "puan", text: "%30" }] }],
    },
    {
      name: "Dinleme",
      skill: "Listening",
      icon: "dinleme",
      parts: [{ title: "Bölüm ağırlığı", meta: [{ icon: "puan", text: "%25" }] }],
    },
    {
      name: "Konuşma",
      skill: "Speaking",
      icon: "konusma",
      parts: [{ title: "Bölüm ağırlığı", meta: [{ icon: "puan", text: "%15" }] }],
    },
  ],
  sectionDetailIds: ["kh-agirliklar", "kh-agirliklar", "kh-agirliklar", "kh-agirliklar"],
  ignored: [],
};

/* ---------------------------------------------------------------
 * Işık — isik-universitesi (361 kelime, Katman B — zengin veri)
 *
 * "...İçeriği:" başlığı gövdesiz (Boğaziçi deseni). Gerçek içerik
 * "Işık Üniversitesi İngilizce Yerleştirme Sınavı" başlığı altında TEK
 * blok — "Işık Üniversitesi İngilizce Yeterlik Sınavı" alt-görünümlü
 * cümle kaynakta GERÇEK bir başlık DEĞİL (crawl'da h-seviyesi almamış,
 * düz metin), bu yüzden ayrı bir bölüm sınırı sayılmadı — İTÜ deseniyle
 * aynı indeks-bölme tekniğiyle 5 detay bloğuna ayrıldı.
 * ------------------------------------------------------------- */
const isikContent: UniversityContentMap = {
  titleHeading: "Işık Üniversitesi PROFICIENCY Kursu",
  steps: [[0], [1], [2, 3]],
  details: [
    {
      id: "icerik-basligi-empty",
      label: "",
      icon: "belge",
      heading: "Işık Üniversitesi Hazırlık Atlama Sınavının İçeriği:",
      allowEmpty: true,
      hidden: true,
    },
    {
      id: "isik-seviye",
      label: "Seviye Belirleme Sınavı (Giriş)",
      icon: "dilbilgisi",
      heading: "Işık Üniversitesi İngilizce Yerleştirme Sınavı",
      take: [0, 1],
    },
    {
      id: "isik-yeterlik-genel",
      label: "İngilizce Yeterlik Sınavı Genel Bilgi",
      icon: "belge",
      heading: "Işık Üniversitesi İngilizce Yerleştirme Sınavı",
      take: [2, 3],
    },
    {
      id: "isik-bolum2-okuma",
      label: "2. Bölüm — Okuma",
      icon: "okuma",
      heading: "Işık Üniversitesi İngilizce Yerleştirme Sınavı",
      take: [4, 5],
    },
    {
      id: "isik-bolum3-dinleme",
      label: "3. Bölüm — Dinleme",
      icon: "dinleme",
      heading: "Işık Üniversitesi İngilizce Yerleştirme Sınavı",
      take: [6, 7, 8],
    },
    {
      id: "isik-bolum4-yazma",
      label: "4. Bölüm — Yazma",
      icon: "yazma",
      heading: "Işık Üniversitesi İngilizce Yerleştirme Sınavı",
      take: [9],
    },
  ],
  structureTitle: "Işık Üniversitesi Hazırlık Atlama Sınavının İçeriği",
  structureLead:
    "Sınav yaklaşık 4 saat süren ve öğrencilerin İngilizce okuma (%25), dinleme (%35) ve yazma (%40) becerilerini ölçer. Sınav sabah ve öğleden sonra olmak üzere iki oturumda yapılmaktadır.",
  sections: [
    {
      name: "Okuma",
      skill: "2. Bölüm",
      icon: "okuma",
      parts: [
        {
          title: "Okuma metni + sorular",
          meta: [
            { icon: "puan", text: "%25 ağırlık" },
            { icon: "soru", text: "20 soru" },
            { icon: "sure", text: "60 dk" },
          ],
        },
      ],
    },
    {
      name: "Dinleme",
      skill: "3. Bölüm",
      icon: "dinleme",
      parts: [
        {
          title: "Not alarak dinleme",
          meta: [
            { icon: "puan", text: "%35 ağırlık" },
            { icon: "sure", text: "10–12 dk / parça" },
          ],
        },
      ],
    },
    {
      name: "Yazma",
      skill: "4. Bölüm",
      icon: "yazma",
      parts: [
        {
          title: "Akademik kompozisyon",
          meta: [
            { icon: "puan", text: "%40 ağırlık" },
            { icon: "sure", text: "60 dk" },
          ],
        },
      ],
    },
  ],
  sectionDetailIds: ["isik-bolum2-okuma", "isik-bolum3-dinleme", "isik-bolum4-yazma"],
  ignored: [],
};

/* ---------------------------------------------------------------
 * Kocaeli — kocaeli-universitesi-hazirlik (359 kelime, Katman B — zengin veri)
 * ------------------------------------------------------------- */
const kocaeliContent: UniversityContentMap = {
  titleHeading: "Kocaeli Üniversitesi Hazırlık Atlama Sınavı Kursu",
  steps: [[0], [1], [2, 3]],
  details: [
    {
      id: "kocaeli-sinav-yapisi",
      label: "Sınav Yapısı",
      icon: "belge",
      heading: "Kocaeli Üniversitesi Hazırlık Atlama Sınavının İçeriği:",
      take: [0],
    },
    {
      id: "kocaeli-muafiyet-sartlari",
      label: "Muafiyet Sınavı Şartları",
      icon: "belge",
      heading: "Kocaeli Üniversitesi Hazırlık Atlama Sınavının İçeriği:",
      take: [1, 2, 3, 4],
    },
    {
      id: "kocaeli-esdeger-sinavlar",
      label: "Eşdeğer Sınav Puanları",
      icon: "belge",
      heading: "Kocaeli Üniversitesi Hazırlık Atlama Sınavının İçeriği:",
      take: [5, 6, 7, 8, 9],
    },
  ],
  structureTitle: "Kocaeli Üniversitesi Hazırlık Atlama Sınavının İçeriği",
  structureLead:
    "Sınav öğrencilerin okuma ve dinleme beerisini belirlemektedir. Sınavda 1 Dinleme ve 7 Okuma bölümü bulunmaktadır. Dinleme bölümü 15 dakika okuma bölümü 75 sürmektedir. Toplam puan 100 üzerinden hesaplanmaktadır.",
  sections: [
    {
      name: "Dinleme",
      skill: null,
      icon: "dinleme",
      parts: [{ title: "1 bölüm", meta: [{ icon: "sure", text: "15 dk" }] }],
    },
    {
      name: "Okuma",
      skill: null,
      icon: "okuma",
      parts: [{ title: "7 bölüm", meta: [{ icon: "sure", text: "75 dk" }] }],
    },
  ],
  sectionDetailIds: ["kocaeli-sinav-yapisi", "kocaeli-sinav-yapisi"],
  ignored: [],
};

/* ---------------------------------------------------------------
 * Marmara — marmara-universitesi (268 kelime, Katman B — zengin veri)
 * ------------------------------------------------------------- */
const marmaraContent: UniversityContentMap = {
  titleHeading: "Marmara Üniversitesi Proficiency Sınavı Hazırlık Atlama Kursu",
  steps: [[0], [1], [2, 3]],
  details: [
    {
      id: "marmara-asama1",
      label: "Birinci Aşama — Okuduğunu / Duyduğunu Anlama",
      icon: "okuma",
      heading: "Marmara Üniversitesi Hazırlık Atlama Sınavının İçeriği:",
      take: [0, 1, 2, 3],
    },
    {
      id: "marmara-asama2",
      label: "İkinci Aşama — Yazma ve Konuşma",
      icon: "yazma",
      heading: "Marmara Üniversitesi Hazırlık Atlama Sınavının İçeriği:",
      take: [4, 5, 6],
    },
    {
      id: "marmara-takvim",
      label: "MÜYYES Sınav Takvimi",
      icon: "belge",
      heading: "Marmara Üniversitesi Hazırlık Atlama Sınavının İçeriği:",
      take: [7, 8, 9],
    },
  ],
  structureTitle: "Marmara Üniversitesi Hazırlık Atlama Sınavının İçeriği",
  structureLead:
    "Hazırlık atlama sınavına girecek öğrencilerin İngilizce yeterliğini tespit etmek için iki aşamadan oluşan sınav düzenlenmektedir.",
  sections: [
    {
      name: "Okuduğunu Anlama",
      skill: "Birinci Aşama",
      icon: "okuma",
      parts: [
        {
          title: "Geçme puanı",
          meta: [
            { icon: "puan", text: "30/50 (%100 İngilizce)" },
            { icon: "puan", text: "25/50 (%30 İngilizce)" },
          ],
        },
      ],
    },
    {
      name: "Duyduğunu Anlama",
      skill: "Birinci Aşama",
      icon: "dinleme",
      parts: [
        {
          title: "Geçme puanı",
          meta: [
            { icon: "puan", text: "30/50 (%100 İngilizce)" },
            { icon: "puan", text: "25/50 (%30 İngilizce)" },
          ],
        },
      ],
    },
    {
      name: "Yazma",
      skill: "İkinci Aşama",
      icon: "yazma",
      parts: [
        {
          title: "Toplam geçme puanı",
          meta: [
            { icon: "puan", text: "60/100 (%100 İngilizce)" },
            { icon: "puan", text: "50/100 (%30 İngilizce)" },
          ],
        },
      ],
    },
    {
      name: "Konuşma",
      skill: "İkinci Aşama",
      icon: "konusma",
      parts: [
        {
          title: "Toplam geçme puanı",
          meta: [
            { icon: "puan", text: "60/100 (%100 İngilizce)" },
            { icon: "puan", text: "50/100 (%30 İngilizce)" },
          ],
        },
      ],
    },
  ],
  sectionDetailIds: ["marmara-asama1", "marmara-asama1", "marmara-asama2", "marmara-asama2"],
  ignored: [],
};

/* ---------------------------------------------------------------
 * Bahçeşehir — bahcesehir-universitesi (170 kelime, Katman B — zengin veri)
 * ------------------------------------------------------------- */
const bahcesehirContent: UniversityContentMap = {
  titleHeading: "Bahçeşehir Proficiency Kursu",
  steps: [[0], [1], [2, 3]],
  details: [
    {
      id: "bahcesehir-sinav-yapisi",
      label: "Sınav Yapısı ve Geçme Şartları",
      icon: "belge",
      heading: "Bahçeşehir Üniversitesi Hazırlık Atlama Sınavının İçeriği:",
    },
  ],
  structureTitle: "Bahçeşehir Üniversitesi Hazırlık Atlama Sınavının İçeriği",
  structureLead: "Bahçeşehir Üniversitesi İngilizce Yeterlik Sınavı “Yazılı” ve “Sözlü” olmak üzere iki bölümden oluşmaktadır.",
  sections: [
    {
      name: "Yazılı Sınav",
      skill: "Okuma · Dinleme · Dilbilgisi · Kelime · Yazma",
      icon: "yazma",
      parts: [{ title: "Geçme puanı", meta: [{ icon: "puan", text: "%60 (%80 bazı bölümlerde)" }] }],
    },
    {
      name: "Sözlü Sınav",
      skill: "Konuşma",
      icon: "konusma",
      parts: [{ title: "Geçme puanı", meta: [{ icon: "puan", text: "%60 (%80 bazı bölümlerde)" }] }],
    },
  ],
  sectionDetailIds: ["bahcesehir-sinav-yapisi", "bahcesehir-sinav-yapisi"],
  ignored: [],
};

/* ---------------------------------------------------------------
 * Okan — okan-universitesi (163 kelime, Katman B — kaynak İÇERİK EKSİK:
 * "PART I: STRUCTURE" sonrası kesik, Part II+ hiç yok — uydurulmadı)
 * ------------------------------------------------------------- */
const okanContent: UniversityContentMap = {
  titleHeading: "Okan Üniversitesi Hazırlık Atlama Sınavı Kursu",
  steps: [[0], [1], [2, 3]],
  details: [
    {
      id: "okan-genel",
      label: "Genel Sınav Yapısı",
      icon: "dilbilgisi",
      heading: "Okan Üniversitesi Hazırlık Atlama Sınavının İçeriği:",
      take: [0],
    },
    {
      id: "okan-part1",
      label: "PART I — Dil Yapısı (Structure)",
      icon: "dilbilgisi",
      heading: "Okan Üniversitesi Hazırlık Atlama Sınavının İçeriği:",
      take: [1],
    },
  ],
  structureTitle: "Okan Üniversitesi Hazırlık Atlama Sınavının İçeriği",
  structureLead:
    "Sınavda 100 adet çoktan seçmeli soru ile yazma bölümü olacaktır. Çoktan seçmeli sorular Dil yapısını, Kelime bilgisini, Dinleme ve Okuduğunu anlamayı ölçmeye yöneliktir ve sınavın %80’ini; yazma ise %20’sini oluşturmaktadır. Sınav geçme notu Mütercimtercümanlık öğrencileri için 70, diğer bölüm öğrencileri için 60’dır. Sınav süresi 165 dakikadır.",
  sections: [
    {
      name: "Çoktan Seçmeli Bölüm",
      skill: "Dil yapısı · Kelime · Dinleme · Okuma",
      icon: "dilbilgisi",
      parts: [
        { title: "100 soru", meta: [{ icon: "puan", text: "%80 ağırlık" }] },
        { title: "PART I: Structure", meta: [{ icon: "soru", text: "50 soru" }] },
      ],
    },
    {
      name: "Yazma Bölümü",
      skill: null,
      icon: "yazma",
      parts: [{ title: "Kompozisyon", meta: [{ icon: "puan", text: "%20 ağırlık" }] }],
    },
  ],
  sectionDetailIds: ["okan-genel", "okan-genel"],
  ignored: [],
};

/* ---------------------------------------------------------------
 * Yeditepe — yeditepe-universitesi (398 kelime, Katman B — zengin veri)
 *
 * Muafiyet bölümündeki TOEFL sınav merkezi listesi kaynakta bozuk
 * numaralandırmayla geldi ("1" / ".YEDİTEPE ÜNİVERSİTESİ..." gibi ayrı
 * satırlara bölünmüş) — bu bir crawl artığı, İYİLEŞTİRİLMEDİ (§5),
 * olduğu gibi ayrı paragraflar olarak render edilir.
 * ------------------------------------------------------------- */
const yeditepeContent: UniversityContentMap = {
  titleHeading: "Yeditepe Üniversitesi Proficiency Kursu",
  steps: [[0], [1], [2]],
  details: [
    {
      id: "yeditepe-icerik",
      label: "Sınav Yapısı ve Geçme Notları",
      icon: "yazma",
      heading: "Yeditepe Üniversitesi Hazırlık Atlama Proficiency Sınavının İçeriği:",
    },
    {
      id: "yeditepe-muafiyet",
      label: "Muafiyet Koşulları",
      icon: "belge",
      heading: "Yeditepe Üniversitesi Hazırlık Atlama Muaffiyet Koşulları",
    },
  ],
  structureTitle: "Yeditepe Üniversitesi Hazırlık Atlama Proficiency Sınavının İçeriği",
  structureLead:
    "Yeterlik sınavı’nda 100 üzerinden en az 60 puan alan öğrenci başarılı sayılır. Sınav, 80 soruluk çoktan seçmeli bölüm ve 20 puanlık yazma bölümünden oluşur. Yazma bölümünde öğrencilere 3 farklı konu verilir ve konulardan birini seçip, yaklaşık 300 kelimelik bir kompozisyon yazmaları istenir.",
  sections: [
    {
      name: "Çoktan Seçmeli Bölüm",
      skill: null,
      icon: "dilbilgisi",
      parts: [{ title: "80 soru", meta: [{ icon: "puan", text: "sınavın 80 puanlık kısmı" }] }],
    },
    {
      name: "Yazma Bölümü",
      skill: null,
      icon: "yazma",
      parts: [{ title: "~300 kelime kompozisyon", meta: [{ icon: "puan", text: "20 puan" }] }],
    },
  ],
  sectionDetailIds: ["yeditepe-icerik", "yeditepe-icerik"],
  ignored: [],
};

/* ---------------------------------------------------------------
 * Maltepe — maltepe-universitesi (136 kelime, Katman B — veri bekleniyor)
 * ------------------------------------------------------------- */
const maltepeContent: UniversityContentMap = {
  titleHeading: "Maltepe Üniversitesi Hazırlık Atlama Sınavı Kursu",
  steps: [[0], [1], [2]],
  details: [
    {
      id: "maltepe-icerik",
      label: "Sınav Yapısı ve Değerlendirme",
      icon: "belge",
      heading: "Maltepe Üniversitesi Hazırlık Atlama Sınavının İçeriği:",
    },
  ],
  structureTitle: "Maltepe Üniversitesi Hazırlık Atlama Sınavının İçeriği",
  structureLead:
    "Sınav dört bölümden (dinleme, okuma, dilbilgisi ve yazma) oluşmakta olup dil kullanımı düzeyini ölçmek üzere hazırlanmıştır.",
  sections: [
    {
      name: "Dinleme",
      skill: null,
      icon: "dinleme",
      parts: [{ title: "Bölüm", meta: [{ icon: "kisim", text: "veri bekleniyor", missing: true }] }],
    },
    {
      name: "Okuma",
      skill: null,
      icon: "okuma",
      parts: [{ title: "Bölüm", meta: [{ icon: "kisim", text: "veri bekleniyor", missing: true }] }],
    },
    {
      name: "Dilbilgisi",
      skill: null,
      icon: "dilbilgisi",
      parts: [{ title: "Bölüm", meta: [{ icon: "kisim", text: "veri bekleniyor", missing: true }] }],
    },
    {
      name: "Yazma",
      skill: null,
      icon: "yazma",
      parts: [{ title: "Bölüm", meta: [{ icon: "kisim", text: "veri bekleniyor", missing: true }] }],
    },
  ],
  sectionDetailIds: ["maltepe-icerik", "maltepe-icerik", "maltepe-icerik", "maltepe-icerik"],
  ignored: [],
};

/* ---------------------------------------------------------------
 * Beykent — beykent-universitesi (115 kelime, Katman B — veri bekleniyor)
 * ------------------------------------------------------------- */
const beykentContent: UniversityContentMap = {
  titleHeading: "Beykent Üniversitesi Proficiency Kursu",
  steps: [[0], [1], [2]],
  details: [
    {
      id: "beykent-icerik",
      label: "Sınav Yapısı",
      icon: "belge",
      heading: "Beykent Üniversitesi Hazırlık Atlama Sınavının İçeriği:",
    },
  ],
  structureTitle: "Beykent Üniversitesi Hazırlık Atlama Sınavının İçeriği",
  structureLead:
    "Beykent Hazırlık Atlama Sınavı, dilbilgisi, okuma-anlama, dinleme-anlama ve yazılı ve/veya sözlü ifade bölümlerinden oluşmaktadır.",
  sections: [
    {
      name: "Dilbilgisi",
      skill: null,
      icon: "dilbilgisi",
      parts: [{ title: "Bölüm", meta: [{ icon: "kisim", text: "veri bekleniyor", missing: true }] }],
    },
    {
      name: "Okuma-Anlama",
      skill: null,
      icon: "okuma",
      parts: [{ title: "Bölüm", meta: [{ icon: "kisim", text: "veri bekleniyor", missing: true }] }],
    },
    {
      name: "Dinleme-Anlama",
      skill: null,
      icon: "dinleme",
      parts: [{ title: "Bölüm", meta: [{ icon: "kisim", text: "veri bekleniyor", missing: true }] }],
    },
    {
      name: "Yazılı ve/veya Sözlü İfade",
      skill: null,
      icon: "yazma",
      parts: [{ title: "Bölüm", meta: [{ icon: "kisim", text: "veri bekleniyor", missing: true }] }],
    },
  ],
  sectionDetailIds: ["beykent-icerik", "beykent-icerik", "beykent-icerik", "beykent-icerik"],
  ignored: [],
};

/* ---------------------------------------------------------------
 * Koç — koc-universitesi (293 kelime, Katman C — bölüm ayrımı yok)
 *
 * Kaynak yalnız KUEPE'ye giriş SÜRECİNİ (seviye tespit → geçme şartları)
 * anlatıyor, sınavın kendi bölümlerini (KUEPE-S/KUEPE-W bile birer geçme
 * ŞARTI olarak geçiyor, ayrı sınav bölümü olarak tanımlanmıyor) hiç
 * saymıyor. SINAV YAPISI bölümü render edilmez.
 * ------------------------------------------------------------- */
const kocContent: UniversityContentMap = {
  titleHeading: "Koç Üniversitesi KUEPE Kursu",
  steps: [[0], [1], [2]],
  details: [
    {
      id: "koc-seviye-tespit",
      label: "Seviye Tespit Sınavı",
      icon: "dilbilgisi",
      heading: "Hazırlık Geçme Seviye Tespit KUEPE Sınavının İçeriği:",
    },
    {
      id: "koc-gecme-sartlari",
      label: "Hazırlık Sınıfı Geçme Şartları",
      icon: "belge",
      heading: "Hazırlık Sınıfı Geçme Şartları",
    },
  ],
  structureTitle: null,
  structureLead: null,
  sections: [],
  sectionDetailIds: [],
  ignored: [],
};

/* ---------------------------------------------------------------
 * Acıbadem — acibadem-universitesi (290 kelime, Katman C — bölüm ayrımı yok)
 * ------------------------------------------------------------- */
const acibademContent: UniversityContentMap = {
  titleHeading: "Acıbadem Üniversitesi AYES Kursu",
  steps: [[0], [1], [2, 3]],
  details: [
    {
      id: "acibadem-icerik",
      label: "APPT Sınavı Hakkında",
      icon: "belge",
      heading: "Acıbadem Üniversitesi Sınavının İçeriği:",
    },
    {
      id: "acibadem-denklik",
      label: "Eşdeğer Puan Denklikleri",
      icon: "belge",
      heading: "AYES Sınavına Eşdeğer Kabul Edilen Puan Denklikleri:",
    },
  ],
  structureTitle: null,
  structureLead: null,
  sections: [],
  sectionDetailIds: [],
  ignored: [],
};

/* ---------------------------------------------------------------
 * Süleyman Şah — suleymansah-universitesi (207 kelime, Katman C — bölüm
 * ayrımı yok)
 * ------------------------------------------------------------- */
const suleymansahContent: UniversityContentMap = {
  titleHeading: "Süleyman Şah Üniversitesi Hazırlık Atlama Sınavı Kursu",
  steps: [[0], [1], [2, 3]],
  details: [
    {
      id: "suleymansah-icerik",
      label: "Seviye Tespit ve Yeterlilik Süreci",
      icon: "dilbilgisi",
      heading: "Süleyman Şah Üniversitesi Hazırlık Atlama Sınavının İçeriği:",
    },
  ],
  structureTitle: null,
  structureLead: null,
  sections: [],
  sectionDetailIds: [],
  ignored: [],
};

export const UNIVERSITIES: UniversityDef[] = [
  {
    slug: "bogazici-universitesi",
    name: "Boğaziçi Üniversitesi",
    initials: "BÜ",
    examCode: "BUEPT",
    examLabel: "BÜYES/BUEPT",
    illo: "sinav-oturumu",
    illoChip1: "3 bölüm",
    illoChip2: "Sınav formatı",
    content: bogaziciContent,
  },
  {
    slug: "ozyegin-universitesi",
    name: "Özyeğin Üniversitesi",
    initials: "ÖÜ",
    examCode: "TRACE",
    examLabel: "TRACE",
    illo: "kampus",
    illoChip1: "Seviye tespiti",
    illoChip2: "Sınav tekniği",
    content: ozyeginContent,
  },
  {
    slug: "bilgi-universitesi",
    name: "Bilgi Üniversitesi",
    initials: "BÜ",
    examCode: "BİLET",
    examLabel: "BİLET",
    illo: "dort-beceri",
    illoChip1: "Okuma · Yazma",
    illoChip2: "Dinleme",
    content: bilgiContent,
  },
  {
    slug: "dogus-universitesi",
    name: "Doğuş Üniversitesi",
    initials: "DÜ",
    examCode: "DÜİYES",
    examLabel: "DÜİYES",
    illo: "sinav-oturumu",
    illoChip1: "3 bölüm",
    illoChip2: "Sınav formatı",
    content: dogusContent,
  },
  {
    slug: "sabanci-universitesi",
    name: "Sabancı Üniversitesi",
    initials: "SÜ",
    examCode: "ELAE",
    examLabel: "ELAE",
    illo: "kampus",
    illoChip1: "Seviye tespiti",
    illoChip2: "Sınav tekniği",
    content: sabanciContent,
  },
  {
    slug: "istanbul-sehir-universitesi",
    name: "İstanbul Şehir Üniversitesi",
    initials: "İŞ",
    examCode: "STEP",
    examLabel: "DBS/STEP",
    illo: "dort-beceri",
    illoChip1: "Okuma · Yazma",
    illoChip2: "Dinleme",
    content: istanbulSehirContent,
  },
  {
    slug: "istanbul-teknik-universitesi",
    name: "İstanbul Teknik Üniversitesi",
    initials: "İT",
    examCode: null,
    examLabel: null,
    illo: "sinav-oturumu",
    illoChip1: "3 bölüm",
    illoChip2: "Sınav formatı",
    content: ituContent,
  },
  {
    slug: "ortadogu-teknik-universitesi",
    name: "Orta Doğu Teknik Üniversitesi",
    initials: "OD",
    examCode: null,
    examLabel: null,
    illo: "kampus",
    illoChip1: "Seviye tespiti",
    illoChip2: "Sınav tekniği",
    content: odtuContent,
  },
  {
    slug: "yildiz-teknik-universitesi",
    name: "Yıldız Teknik Üniversitesi",
    initials: "YT",
    examCode: null,
    examLabel: null,
    illo: "dort-beceri",
    illoChip1: "Okuma · Yazma",
    illoChip2: "Dinleme",
    content: ytuContent,
  },
  {
    slug: "kadirhas-universitesi-hazirlik",
    name: "Kadir Has Üniversitesi",
    initials: "KH",
    examCode: null,
    examLabel: null,
    illo: "sinav-oturumu",
    illoChip1: "3 bölüm",
    illoChip2: "Sınav formatı",
    content: kadirhasContent,
  },
  {
    slug: "isik-universitesi",
    name: "Işık Üniversitesi",
    initials: "IÜ",
    examCode: null,
    examLabel: null,
    illo: "kampus",
    illoChip1: "Seviye tespiti",
    illoChip2: "Sınav tekniği",
    content: isikContent,
  },
  {
    slug: "kocaeli-universitesi-hazirlik",
    name: "Kocaeli Üniversitesi",
    initials: "KÜ",
    examCode: null,
    examLabel: null,
    illo: "dort-beceri",
    illoChip1: "Okuma · Yazma",
    illoChip2: "Dinleme",
    content: kocaeliContent,
  },
  {
    slug: "marmara-universitesi",
    name: "Marmara Üniversitesi",
    initials: "MÜ",
    examCode: null,
    examLabel: null,
    illo: "sinav-oturumu",
    illoChip1: "3 bölüm",
    illoChip2: "Sınav formatı",
    content: marmaraContent,
  },
  {
    slug: "bahcesehir-universitesi",
    name: "Bahçeşehir Üniversitesi",
    initials: "BÜ",
    examCode: null,
    examLabel: null,
    illo: "kampus",
    illoChip1: "Seviye tespiti",
    illoChip2: "Sınav tekniği",
    content: bahcesehirContent,
  },
  {
    slug: "okan-universitesi",
    name: "Okan Üniversitesi",
    initials: "OÜ",
    examCode: null,
    examLabel: null,
    illo: "sinav-oturumu",
    illoChip1: "3 bölüm",
    illoChip2: "Sınav formatı",
    content: okanContent,
  },
  {
    slug: "yeditepe-universitesi",
    name: "Yeditepe Üniversitesi",
    initials: "YÜ",
    examCode: null,
    examLabel: null,
    illo: "dort-beceri",
    illoChip1: "Okuma · Yazma",
    illoChip2: "Dinleme",
    content: yeditepeContent,
  },
  {
    slug: "maltepe-universitesi",
    name: "Maltepe Üniversitesi",
    initials: "MÜ",
    examCode: null,
    examLabel: null,
    illo: "sinav-oturumu",
    illoChip1: "3 bölüm",
    illoChip2: "Sınav formatı",
    content: maltepeContent,
  },
  {
    slug: "beykent-universitesi",
    name: "Beykent Üniversitesi",
    initials: "BÜ",
    examCode: null,
    examLabel: null,
    illo: "kampus",
    illoChip1: "Seviye tespiti",
    illoChip2: "Sınav tekniği",
    content: beykentContent,
  },
  {
    slug: "koc-universitesi",
    name: "Koç Üniversitesi",
    initials: "KÜ",
    examCode: "KUEPE",
    examLabel: "KUEPE",
    illo: "dort-beceri",
    illoChip1: "Okuma · Yazma",
    illoChip2: "Dinleme",
    content: kocContent,
  },
  {
    slug: "acibadem-universitesi",
    name: "Acıbadem Üniversitesi",
    initials: "AÜ",
    examCode: "AYES",
    examLabel: "AYES",
    illo: "sinav-oturumu",
    illoChip1: "3 bölüm",
    illoChip2: "Sınav formatı",
    content: acibademContent,
  },
  {
    slug: "suleymansah-universitesi",
    name: "Süleyman Şah Üniversitesi",
    initials: "SŞ",
    examCode: null,
    examLabel: null,
    illo: "kampus",
    illoChip1: "Seviye tespiti",
    illoChip2: "Sınav tekniği",
    content: suleymansahContent,
  },
];

export function getUniversityDef(slug: string): UniversityDef | undefined {
  return UNIVERSITIES.find((u) => u.slug === slug);
}
