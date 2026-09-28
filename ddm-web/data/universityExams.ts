/**
 * Proficiency üniversite sayfaları — sınavın GÜNCEL bilgisi (UI turu 2026-09-28,
 * kullanıcı: "bilgisi az olan üniversitelere SEO'ya uygun ekleme yap").
 *
 * GENEL SINAV BİLGİSİ (P2 kuralı): her olgu üniversitenin resmi sayfasından / yönergesinden
 * doğrulanır, kaynak `sources`ta ve yorumda; doğrulanamayan rakam yazılmaz. Kaynak sayfa
 * metni (`data/site_content.json`) DEĞİŞMEZ; eskimişse `outdated` notu eski bölümlerin
 * başında durur (GMAT / SAT "Güncel durum" deseni).
 *
 * Kullanım: hero'daki sınav akışı (`parts` + `facts`), "Sınav yapısı" kartları ve
 * "Sık sorulanlar" kartları. Kaydı olmayan üniversitede akış sayfa metnindeki
 * bölümlerden türetilir (`lib/universityFlow.ts`).
 */

import type { ExamFact } from "@/data/examGlance";

export type UniversityExamPart = {
  name: string;
  /** Kısa ayrıntı: "16 soru · ~25 dk" — " · " ile bölünüp karttaki rozetlere döner. */
  note: string | null;
  /** Akış çubuğunun oranı (puan ya da yüzde) — bilinmiyorsa null, çubuk çizilmez. */
  weight: number | null;
  /** Çubuğun yanındaki etiket: "%25", "24 puan". */
  weightLabel: string | null;
};

export type UniversityFaq = { question: string; answer: string; detail: string[] };

export type UniversityExamInfo = {
  /** Sınavın güncel adı / kısaltması — hero rozeti ve kâğıt başlığı. */
  exam: string;
  parts: UniversityExamPart[];
  facts: [ExamFact, ExamFact, ExamFact];
  faq: UniversityFaq[];
  /** Sayfanın kaynak metni sınavın önceki biçimini anlatıyorsa gösterilen not. */
  outdated: string | null;
  /** Kaynak satırı (resmi site, düz metin). */
  source: string;
  checked: string;
};

const CHECKED = "Eylül 2026";

export const UNIVERSITY_EXAMS: Record<string, UniversityExamInfo> = {
  /* Beykent — Yabancı Dil Hazırlık Sınıfı Eğitim-Öğretim ve Sınav Yönergesi (Senato 18.07.2025,
   * 2025/17): "BULET, yazılı ve sözlü ifade bölümlerinden oluşur ve B1+ düzeyinin yeterliliğini
   * ölçecek düzeyde…", Madde 13/7 "100 üzerinden asgari 60 puan", "dört kereye kadar", "geçerlilik
   * süresi … 2 (iki) yıldır", YDS 75 eşdeğeri. YDYO sayfası: "okuma, dinleme, yazma, konuşma, dil
   * bilgisi ve kelime bilgisi bölümlerinden oluşur." Soru sayısı / süre doğrulanamadı → yazılmadı. */
  "beykent-universitesi": {
    exam: "BULET",
    parts: [
      { name: "Okuma", note: null, weight: null, weightLabel: null },
      { name: "Dinleme", note: null, weight: null, weightLabel: null },
      { name: "Yazma", note: null, weight: null, weightLabel: null },
      { name: "Konuşma", note: null, weight: null, weightLabel: null },
      { name: "Dil bilgisi", note: null, weight: null, weightLabel: null },
      { name: "Kelime bilgisi", note: null, weight: null, weightLabel: null },
    ],
    facts: [
      { value: "60", label: "geçme notu" },
      { value: "B1+", label: "sınav düzeyi" },
      { value: "4", label: "yıllık sınav hakkı" },
    ],
    faq: [
      {
        question: "Beykent Üniversitesi İngilizce yeterlik sınavı (BULET) nedir?",
        answer: "BULET, Beykent Üniversitesi'nin hazırlık atlama için uyguladığı İngilizce yeterlik sınavıdır.",
        detail: [
          "Sınav B1+ düzeyinde hazırlanır; yazılı ve sözlü bölümlerde okuma, dinleme, yazma, konuşma, dil bilgisi ve kelime bilgisi ölçülür.",
        ],
      },
      {
        question: "Beykent hazırlık atlama sınavının geçme notu kaç?",
        answer: "BULET'ten 100 üzerinden en az 60 puan almak gerekir.",
        detail: ["60 ve üzeri alan öğrenci doğrudan bölümüne başlar; BULET sonucu sınav tarihinden itibaren 2 yıl geçerlidir."],
      },
      {
        question: "Yeni öğrenciler BULET'e nasıl girer?",
        answer: "Önce akademik yıl başındaki Düzey Belirleme Sınavı'na (DBS) girilir.",
        detail: ["DBS'den B1+ düzeyine karşılık gelen puanı alan öğrenciler BULET'e girmeye hak kazanır."],
      },
      {
        question: "BULET ne zaman yapılır?",
        answer: "BULET bir akademik yılda en fazla dört kez yapılır.",
        detail: ["Sınav dönemleri akademik yıl başı, güz ve bahar yarıyıllarının sonu ve yaz modülünün sonudur."],
      },
      {
        question: "YDS ya da başka bir sınavla hazırlıktan muaf olunur mu?",
        answer: "Evet; ÖSYM dönüşüm tablosunda en az YDS 75 puana karşılık gelen bir belge kabul edilir.",
        detail: ["Belgeler kayıt süresi içinde üniversiteye teslim edilir."],
      },
    ],
    outdated: null,
    source: "beykent.edu.tr",
    checked: CHECKED,
  },

  /* Maltepe — 2026-2027 Student Booklet (23.09.2026): "B2 (Üst-Orta) seviyesindedir ve eşit ağırlıklı
   * 4 ana bölümden oluşur" (dinleme, okuma, dil kullanımı, yazma 300-350 kelime); geçme notları
   * 55 / 60 / 70; 2026-27 takvimi. Muafiyet tablosu (20.07.2026): TOEFL iBT 72 · PTE 55 · YDS/YÖKDİL 60
   * (çoğu program). Bölüm süreleri ve puanın geçerlilik süresi doğrulanamadı → yazılmadı. */
  "maltepe-universitesi": {
    exam: "İngilizce Yeterlilik Sınavı",
    parts: [
      { name: "Dinleme", note: "en az 2 dinleme metni", weight: 25, weightLabel: "%25" },
      { name: "Okuma", note: "en az 2 okuma metni", weight: 25, weightLabel: "%25" },
      { name: "Dil kullanımı", note: "çoktan seçmeli · yeniden yazma · sözcük türetme", weight: 25, weightLabel: "%25" },
      { name: "Yazma", note: "300–350 kelime kompozisyon", weight: 25, weightLabel: "%25" },
    ],
    facts: [
      { value: "B2", label: "sınav düzeyi" },
      { value: "4", label: "eşit bölüm" },
      { value: "55–70", label: "bölüme göre geçme notu" },
    ],
    faq: [
      {
        question: "Maltepe Üniversitesi İngilizce yeterlik sınavı nasıl yapılır?",
        answer: "Sınav B2 düzeyindedir ve eşit ağırlıklı dört bölümden oluşur.",
        detail: [
          "Bölümler dinleme, okuma, dil kullanımı (Use of English) ve yazmadır. Yazma bölümünde verilen konulardan biri seçilerek 300–350 kelimelik bir kompozisyon yazılır.",
        ],
      },
      {
        question: "Maltepe hazırlık atlama sınavında geçme notu kaç?",
        answer: "Geçme notu bölüme göre 100 üzerinden 55, 60 ya da 70'tir.",
        detail: [
          "Mühendislik ve mimarlıkta 55; Tıp, Psikoloji ve İşletme gibi bölümlerde 60; İngilizce Öğretmenliği'nde 70 puan aranır.",
        ],
      },
      {
        question: "Sınav ne zaman yapılır?",
        answer: "Yeni öğrenciler için sınav akademik yıl başında, Eylül'de yapılır.",
        detail: ["Hazırlık öğrencileri için güz dönemi sonunda (Ocak) ve yıl sonunda da yeterlik sınavı uygulanır."],
      },
      {
        question: "TOEFL ya da PTE ile hazırlıktan muaf olunur mu?",
        answer: "Evet; çoğu bölüm için TOEFL iBT 72, PTE Academic 55 ya da YDS / YÖKDİL 60 yeterlidir.",
        detail: [
          "Tıp ve Psikoloji gibi bölümlerde ve İngilizce Öğretmenliği'nde daha yüksek puan istenir. Belgeler yeterlik sınavından önce teslim edilmelidir.",
        ],
      },
    ],
    outdated: null,
    source: "maltepe.edu.tr",
    checked: CHECKED,
  },

  /* Okan — İşleyiş sayfası (okan.edu.tr/sayfa/5044): "OPAE consists of four parts (Listening, Reading,
   * Writing, and speaking)", "OPAE yeterlilik sınavının geçme notu 80'dir (B2 seviyesi)", "held three
   * times per academic year", ALAT 70+; PACE tablosu: %30 İngilizce programlarda 60; TOEFL iBT 79 ·
   * PTE 67 · YDS 75 (tamamı İngilizce), iki takvim yılı. Kaynak metin (100 soru, %80/%20, 165 dk,
   * 70/60) eskimiş → `outdated`. Soru sayısı / süre doğrulanamadı. */
  "okan-universitesi": {
    exam: "OPAE",
    parts: [
      { name: "Dinleme", note: null, weight: null, weightLabel: null },
      { name: "Okuma", note: null, weight: null, weightLabel: null },
      { name: "Yazma", note: null, weight: null, weightLabel: null },
      { name: "Konuşma", note: null, weight: null, weightLabel: null },
    ],
    facts: [
      { value: "80", label: "geçme notu (B2)" },
      { value: "4", label: "beceri bölümü" },
      { value: "3", label: "yıllık sınav dönemi" },
    ],
    faq: [
      {
        question: "Okan Üniversitesi İngilizce yeterlik sınavı (OPAE) nasıl yapılır?",
        answer: "OPAE; dinleme, okuma, yazma ve konuşma olmak üzere dört bölümden oluşur.",
        detail: ["Sınav akademik İngilizce becerilerini B2 düzeyinde ölçer ve yüz yüze uygulanır."],
      },
      {
        question: "Okan hazırlık atlama sınavının geçme notu kaç?",
        answer: "Tamamı İngilizce programlarda geçme notu 80'dir (B2).",
        detail: ["Eğitim dilinin %30'u İngilizce olan programlarda 60 puan yeterlidir."],
      },
      {
        question: "Yeni öğrenciler OPAE'ye nasıl girer?",
        answer: "Önce akademik yıl başındaki seviye tespit sınavına (ALAT) girilir.",
        detail: ["ALAT'tan 70 ve üzeri alan öğrenciler OPAE'ye girebilir; ALAT'a girmeyen öğrenci OPAE hakkını kaybeder."],
      },
      {
        question: "OPAE ne zaman yapılır?",
        answer: "OPAE bir akademik yılda üç dönemde yapılır: yıl başı, yıl ortası ve yıl sonu.",
        detail: ["Yaz okulu sonunda da ayrıca sınav yapılır; kesin tarihler üniversitenin duyurularında ilan edilir."],
      },
      {
        question: "TOEFL ya da YDS ile muafiyet mümkün mü?",
        answer: "Evet; tamamı İngilizce programlar için TOEFL iBT 79, PTE Academic 67 ya da YDS 75 kabul edilir.",
        detail: ["Belgenin sınav tarihinden geriye doğru iki takvim yılı içinde alınmış olması gerekir."],
      },
    ],
    outdated:
      "Güncel durum: Okan Üniversitesi'nin İngilizce yeterlik sınavı bugün OPAE adıyla dinleme, okuma, yazma ve konuşma olmak üzere dört bölümden oluşuyor; tamamı İngilizce programlarda geçme notu 80'dir (B2). Aşağıdaki açıklama sınavın önceki biçimini anlatmaktadır.",
    source: "okan.edu.tr",
    checked: CHECKED,
  },

  /* Bahçeşehir — Hazırlık programı sayfası (bau.edu.tr/icerik/4187), SSS (icerik/13551), örnek sınav
   * PDF'i (28.07.2026): yazılı 170 dk (kelime 10 + okuma/dil kullanımı 35 soru → 70 dk, dinleme 15 soru
   * 30 dk, yazma 300-350 kelime 70 dk), sözlü 4-6 dk; geçme 60 / 70 / 80; "Eylül, Ocak, Mayıs ve Temmuz
   * aylarında … 4 (dört) kez"; TOEFL iBT 72 · PTE 55 · YDS/YÖKDİL 60 (lisans). Yazılı / sözlü ağırlığı
   * TR ve EN sayfada çelişiyor (%20 / %25) → yazılmadı. Kaynak metindeki geçme oranları eskimiş. */
  "bahcesehir-universitesi": {
    exam: "BAU İngilizce Yeterlik Sınavı",
    parts: [
      { name: "Kelime bilgisi", note: "10 soru", weight: null, weightLabel: null },
      { name: "Okuma ve dil kullanımı", note: "35 soru", weight: null, weightLabel: null },
      { name: "Dinleme", note: "15 soru · 30 dk", weight: null, weightLabel: null },
      { name: "Yazma", note: "300–350 kelime · 70 dk", weight: null, weightLabel: null },
      { name: "Sözlü sınav", note: "4–6 dk", weight: null, weightLabel: null },
    ],
    facts: [
      { value: "60", label: "lisans geçme notu" },
      { value: "170", label: "dakika yazılı sınav" },
      { value: "4", label: "yıllık sınav" },
    ],
    faq: [
      {
        question: "Bahçeşehir Üniversitesi İngilizce yeterlik sınavı nasıl yapılır?",
        answer: "Sınav yazılı ve sözlü olmak üzere iki bölümden oluşur.",
        detail: [
          "Yazılı bölüm 170 dakikadır: 60 çoktan seçmeli soruda kelime bilgisi, okuma / dil kullanımı ve dinleme ölçülür, ardından 300–350 kelimelik bir kompozisyon yazılır. Sözlü bölüm öğrenci başına 4–6 dakika sürer.",
        ],
      },
      {
        question: "BAU hazırlık atlama sınavının geçme notu kaç?",
        answer: "Lisans öğrencileri için geçme notu 100 üzerinden 60'tır.",
        detail: ["Eczacılık ve Diş Hekimliği'nde 70; Tıp, İngilizce Öğretmenliği ve Mütercim ve Tercümanlık'ta 80 aranır."],
      },
      {
        question: "Yeterlik sınavına kimler girebilir?",
        answer: "Yeni öğrenciler önce Seviye Belirleme Sınavı'na girer.",
        detail: ["Bu sınavda 60 sorudan en az 30 net yapanlar yeterlik sınavına girmeye hak kazanır."],
      },
      {
        question: "Sınav ne zaman yapılır?",
        answer: "Yeterlik sınavı yılda dört kez yapılır: Eylül, Ocak, Mayıs ve Temmuz.",
        detail: ["Kesin tarihler üniversitenin akademik takviminde ilan edilir."],
      },
      {
        question: "TOEFL ya da PTE ile muafiyet mümkün mü?",
        answer: "Evet; lisans programları için TOEFL iBT 72, PTE Academic 55 ya da YDS / YÖKDİL 60 yeterlidir.",
        detail: ["TOEFL ve PTE sonuçları 2 yıl geçerlidir; sonuçların akademik yıl başlamadan teslim edilmesi gerekir."],
      },
    ],
    outdated:
      "Güncel durum: Bahçeşehir Üniversitesi'nde geçme notu bugün lisans programlarında 60, Eczacılık ve Diş Hekimliği'nde 70; Tıp, İngilizce Öğretmenliği ve Mütercim ve Tercümanlık'ta 80'dir. Aşağıdaki açıklama önceki yönergeye dayanmaktadır.",
    source: "bau.edu.tr",
    checked: CHECKED,
  },

  /* ODTÜ — METU EPE "Test Content and Scoring — October 2025" (dil.metu.edu.tr/epe), SSS (10-2025),
   * denklik tablosu (oidb.metu.edu.tr, 31.08.2026): iki gün / iki oturum; dinleme 16 madde 24 puan
   * ~25 dk, okuma 24 madde 32 puan 60 dk, not alma 6 madde 9 puan ~15 dk, yazma ~220 kelime 20 puan
   * 35 dk, konuşma 15 puan ~8 dk; muafiyet 60 (lisans) / 65 (SUNY) / 70 (Yabancı Dil Eğitimi); yılda
   * altı kez; TOEFL iBT 75 · PTE 65, 2 yıl. Kaynak metin (4 bölüm, 2 oturum aynı gün) eskimiş. */
  "ortadogu-teknik-universitesi": {
    exam: "METU EPE",
    parts: [
      { name: "Dinleme", note: "16 soru · ~25 dk", weight: 24, weightLabel: "24 puan" },
      { name: "Okuma", note: "24 soru · 60 dk", weight: 32, weightLabel: "32 puan" },
      { name: "Not alma", note: "6 soru · ~15 dk", weight: 9, weightLabel: "9 puan" },
      { name: "Yazma", note: "~220 kelime · 35 dk", weight: 20, weightLabel: "20 puan" },
      { name: "Konuşma", note: "2. gün · ~8 dk", weight: 15, weightLabel: "15 puan" },
    ],
    facts: [
      { value: "60", label: "lisans muafiyet puanı" },
      { value: "5", label: "sınav bölümü" },
      { value: "2", label: "gün, iki oturum" },
    ],
    faq: [
      {
        question: "ODTÜ İngilizce Yeterlik Sınavı (METU EPE) nasıl yapılır?",
        answer: "Sınav art arda iki günde, iki oturumda yapılır.",
        detail: [
          "Birinci günkü yaklaşık 135 dakikalık oturumda dinleme, okuma, not alma ve yazma bölümleri yer alır; ikinci gün yaklaşık 8 dakikalık birebir konuşma sınavı yapılır.",
        ],
      },
      {
        question: "Hangi bölüm kaç puan?",
        answer: "Toplam 100 puanın dağılımı: okuma 32, dinleme 24, yazma 20, konuşma 15, not alma 9.",
        detail: ["Okuma bölümünde 800–1000 kelimelik dört metin bulunur; yazma bölümünde yaklaşık 220 kelimelik bir metin yazılır."],
      },
      {
        question: "ODTÜ hazırlık atlama puanı kaç?",
        answer: "Lisans programları için muafiyet puanı 100 üzerinden 60'tır.",
        detail: ["Yabancı Dil Eğitimi bölümünde 70, SUNY ortak programlarında 65 aranır; 59,50 ve üzeri puan 60'a yuvarlanır."],
      },
      {
        question: "TOEFL ya da PTE ile hazırlıktan muaf olunur mu?",
        answer: "Evet; lisans programları için TOEFL iBT 75 ya da PTE Academic 65 yeterlidir.",
        detail: ["Sonuçlar 2 yıl geçerlidir; sınav Türkiye'de alınmışsa devlet üniversitesi binasında yapılmış olmalıdır."],
      },
      {
        question: "Sınav ne zaman yapılır?",
        answer: "ODTÜ İngilizce Yeterlik Sınavı yılda altı kez yapılır.",
        detail: ["Başvuru tarihleri ODTÜ akademik takviminde, sınav yerleri sınavdan bir gün önce epe.metu.edu.tr'de duyurulur."],
      },
    ],
    outdated:
      "Güncel durum: ODTÜ İngilizce Yeterlik Sınavı Ekim 2025'ten bu yana art arda iki günde yapılıyor ve beş bölümden oluşuyor: dinleme, okuma, not alma, yazma ve konuşma. Dilin Kullanımı bölümü kaldırıldı. Aşağıdaki açıklama sınavın önceki biçimini anlatmaktadır.",
    source: "metu.edu.tr",
    checked: CHECKED,
  },

  /* Bilgi — bilgi.edu.tr "İngilizce Dil Sınavı", "BİLET 2. Aşama", muafiyet şartları, SSS; 2026-2027
   * Hazırlık Programı kitapçığı (17.08.2026): 1. Aşama "20 okuma, 30 dilbilgisi sorusu ve iki kısa
   * paragraf yazma", 2. Aşama "Konuşma (%30), Okuma (%35), ve Yazma (%35)", konuşma 4-5 dk, ~350 kelime
   * kompozisyon, 2. Aşama için "70 üzerinden 45", muafiyet "60 ve üstü"; son 2 yıl: TOEFL iBT 4.5 ·
   * PTE 60 · YDS/YÖKDİL 65. Kaynak metin dinleme bölümü sayıyor → eskimiş. */
  "bilgi-universitesi": {
    exam: "BİLET",
    parts: [
      { name: "Konuşma", note: "birebir · ortalama 4–5 dk", weight: 30, weightLabel: "%30" },
      { name: "Okuma", note: "yarı akademik metinler", weight: 35, weightLabel: "%35" },
      { name: "Yazma", note: "~350 kelime kompozisyon", weight: 35, weightLabel: "%35" },
    ],
    facts: [
      { value: "60", label: "muafiyet notu" },
      { value: "2", label: "aşamalı sınav" },
      { value: "3", label: "beceri: konuşma, okuma, yazma" },
    ],
    faq: [
      {
        question: "Bilgi Üniversitesi İngilizce yeterlik sınavı (BİLET) nasıl yapılır?",
        answer: "BİLET, akademik yıl başında uygulanan iki aşamalı bir sınavdır: 1. Aşama seviye tespit, 2. Aşama hazırlık muafiyet sınavıdır.",
        detail: [
          "1. Aşama 20 okuma ve 30 dil bilgisi sorusu ile iki kısa paragraf yazma bölümünden oluşur; bu aşamadan 70 üzerinden 45 ve üzeri alan öğrenciler 2. Aşamaya girer.",
        ],
      },
      {
        question: "BİLET 2. Aşamada hangi bölümler var?",
        answer: "İki güne yayılan 2. Aşama; konuşma (%30), okuma (%35) ve yazma (%35) bölümlerinden oluşur.",
        detail: [
          "Konuşma bölümü birebir yapılır ve ortalama 4–5 dakika sürer; yazma bölümünde yaklaşık 350 kelimelik bir kompozisyon beklenir. Sınavda dinleme bölümü yoktur.",
        ],
      },
      {
        question: "Bilgi Üniversitesi hazırlık atlama için geçme notu kaç?",
        answer: "BİLET 2. Aşamadan 60 ve üzeri alan öğrenciler hazırlıktan muaf olur.",
        detail: ["60'ın altında kalanlar, 1. Aşama puanına göre belirlenen seviyeden İngilizce Hazırlık Programına başlar."],
      },
      {
        question: "TOEFL ya da PTE ile hazırlık muafiyeti mümkün mü?",
        answer: "Evet; son iki yıl içinde alınmış TOEFL iBT 4.5, PTE Academic 60 ya da YDS / YÖKDİL 65 ile muafiyet mümkündür.",
        detail: ["TOEFL Home Edition kabul edilmez; Türkiye'de girilen sınavlar yalnız devlet üniversitesi binalarında yapılmışsa geçerlidir."],
      },
      {
        question: "BİLET ne zaman yapılır?",
        answer: "BİLET her akademik yılın başında, Eylül ayında yapılır.",
        detail: ["Yaz okuluna devam etmeyen hazırlık öğrencileri yaz sonunda yapılan BİLET'ten en az 60 alarak da programı bitirebilir."],
      },
    ],
    outdated:
      "Güncel durum: BİLET 2. Aşama bugün konuşma (%30), okuma (%35) ve yazma (%35) bölümlerinden oluşuyor; sınavda dinleme bölümü bulunmuyor. Aşağıdaki açıklama sınavın önceki biçimini anlatmaktadır.",
    source: "bilgi.edu.tr",
    checked: CHECKED,
  },

  /* YTÜ — ybd.yildiz.edu.tr "Temel İngilizce / TİB öğrencileri için" (İngilizce Yeterlik Sınavı
   * Hakkında), SSS, sample-epe-writing.pdf (Aralık 2025, "Duration: 50 minutes"): Use of English &
   * Reading %60 (10 cloze + 10 closest meaning + 7 + 7 okuma + 6 paragraf tamamlama), Listening %20
   * (6 + 7 not alma), Writing %20 (4 konudan biri, en az 250 kelime); muafiyet 60, İleri İngilizce 70,
   * İngilizce Öğretmenliği 85; Eylül, Ocak, Haziran; TOEFL iBT 72 · PTE 55 · YDS 60. "1. aşama 50
   * üzerinden 25" eşiği bölüm puanlarıyla çelişiyor → yazılmadı. Kaynak metin (6 bölüm) eskimiş. */
  "yildiz-teknik-universitesi": {
    exam: "İYS (EPE)",
    parts: [
      { name: "Dil kullanımı ve okuma", note: "40 soru", weight: 60, weightLabel: "%60" },
      { name: "Dinleme", note: "13 soru · not alma", weight: 20, weightLabel: "%20" },
      { name: "Yazma", note: "250+ kelime · 50 dk", weight: 20, weightLabel: "%20" },
    ],
    facts: [
      { value: "60", label: "muafiyet notu" },
      { value: "3", label: "ana bölüm" },
      { value: "3", label: "dönem: Eylül, Ocak, Haziran" },
    ],
    faq: [
      {
        question: "Yıldız Teknik Üniversitesi İngilizce yeterlik sınavı (İYS) nasıl yapılır?",
        answer: "YTÜ İYS; dil kullanımı ve okuma (%60), dinleme (%20) ve yazma (%20) olmak üzere üç ana bölümden oluşur.",
        detail: [
          "İlk bölümde 10 boşluk doldurma, 10 anlamca en yakın cümle, iki okuma metninden 7'şer soru ve 6 paragraf tamamlama sorusu bulunur. Dinleme bölümünde 6 dinlerken cevaplama ve 7 not alma sorusu vardır; yazma bölümünde dört konudan biri seçilerek 50 dakikada en az 250 kelimelik bir kompozisyon yazılır.",
        ],
      },
      {
        question: "Eylül'deki YTÜ hazırlık atlama sınavı kaç aşamalı?",
        answer: "Eylül'deki İYS iki aşamada yapılır.",
        detail: ["Birinci aşama dil kullanımı ve okuma bölümlerini, ikinci aşama dinleme ve yazma bölümlerini kapsar; toplam puan 100 üzerinden hesaplanır."],
      },
      {
        question: "YTÜ hazırlık atlama için geçme notu kaç?",
        answer: "İYS'den 100 üzerinden en az 60 alan öğrenciler zorunlu hazırlıktan muaf olur.",
        detail: ["İleri İngilizce I ve II derslerinden muafiyet için 70, İngilizce Öğretmenliği programında hazırlık muafiyeti için 85 gerekir."],
      },
      {
        question: "TOEFL ya da PTE ile muafiyet mümkün mü?",
        answer: "Evet; YDS / YÖKDİL 60, TOEFL iBT 72 ya da PTE Akademik 55 ile hazırlıktan muaf olunabilir.",
        detail: ["TOEFL ve PTE sonuçları 2 yıl, YDS ve YÖKDİL 5 yıl geçerlidir; TOEFL iBT Home Edition kabul edilmez."],
      },
      {
        question: "İYS ne zaman yapılır?",
        answer: "İYS her akademik yılda Eylül, Ocak ve Haziran olmak üzere üç ana dönemde yapılır.",
        detail: ["Ocak ve Haziran sınavlarına devam ve dönem içi not koşulunu sağlayan öğrenciler girebilir."],
      },
    ],
    outdated:
      "Güncel durum: YTÜ İngilizce Yeterlik Sınavı bugün üç ana bölümden oluşuyor: dil kullanımı ve okuma (%60), dinleme (%20) ve yazma (%20). Aşağıdaki bölüm bölüm açıklama sınavın önceki biçimini anlatmaktadır.",
    source: "yildiz.edu.tr",
    checked: CHECKED,
  },

  /* Kadir Has — khas.edu.tr "YDY KHAS İngilizce Seviye Tespit ve Yeterlilik Sınavı" (16.09.2026), 2026-27
   * öğrenci el kitabı, Proficiency Exam Strategies & Preparation Guide (2025): "okuma (%40), dinleme (%30)
   * ve yazma becerilerini (%30) ölçer", "toplamında 60 ve üzeri", "yılda dört kez"; yazma 250-300 kelime
   * (10 dk plan + 50 dk yazma); yeni TOEFL iBT 4 · PTE 59; en fazla 5 yıl. Kaynak metin (konuşma %15,
   * yılda 3 kez) eskimiş. */
  "kadirhas-universitesi-hazirlik": {
    exam: "KHAS-LPPE",
    parts: [
      { name: "Okuma", note: "tarama + ayrıntılı okuma · ~60 dk", weight: 40, weightLabel: "%40" },
      { name: "Dinleme", note: "akademik konuşma + not alarak ders", weight: 30, weightLabel: "%30" },
      { name: "Yazma", note: "250–300 kelime · 50 dk", weight: 30, weightLabel: "%30" },
    ],
    facts: [
      { value: "60", label: "muafiyet notu" },
      { value: "3", label: "bölüm" },
      { value: "4", label: "yıllık sınav" },
    ],
    faq: [
      {
        question: "Kadir Has Üniversitesi hazırlık atlama sınavı nasıl yapılır?",
        answer: "Akademik yıl başında önce KHAS Seviye Tespit Sınavı yapılır; seviyesi B1 ve üzeri belirlenen öğrenciler İngilizce Yeterlilik Sınavına girer.",
        detail: ["Seviye tespit sınavı dil bilgisi ve kelime bilgisini ölçer; yeni kayıtlı öğrencilerin bu sınava girmesi zorunludur."],
      },
      {
        question: "Kadir Has İngilizce yeterlik sınavında hangi bölümler var?",
        answer: "Sınav okuma (%40), dinleme (%30) ve yazma (%30) becerilerini ölçer.",
        detail: [
          "Okuma bölümü tarama ve ayrıntılı okuma kısımlarından oluşur; dinleme bölümünde akademik bir konuşma ve not alarak dinlenen bir ders anlatımı yer alır. Yazma bölümünde görüş bildiren 250–300 kelimelik bir metin istenir.",
        ],
      },
      {
        question: "Geçme notu kaç?",
        answer: "Yeterlilik sınavından toplamda 60 ve üzeri alan öğrenciler hazırlıktan muaf olur.",
        detail: ["Hazırlık sürecinde bazı seviyelerdeki öğrenciler dönem sonu ortalamasıyla da programı tamamlayabilir."],
      },
      {
        question: "TOEFL ya da PTE ile muafiyet mümkün mü?",
        answer: "Evet; yeni sistem TOEFL iBT 4, PTE Academic 59 ya da Cambridge C1 Advanced C ile muaf olunabilir.",
        detail: [
          "21 Ocak 2026 öncesi eski sistem TOEFL iBT için 72 aranır. Türkiye'de girilen sınavlar yalnız devlet üniversitesi binalarında yapılmışsa kabul edilir; süresi belirtilmeyen sonuçlar en fazla 5 yıl geçerlidir.",
        ],
      },
      {
        question: "Sınav ne zaman yapılır?",
        answer: "Yeterlilik sınavı yılda dört kez yapılır: akademik yılın başında, her yarıyılın sonunda ve yaz okulunun sonunda.",
        detail: ["Tarihler YDYO akademik takviminde ilan edilir; sınava gelmeyen öğrenciler için mazeret sınavı yapılmaz."],
      },
    ],
    outdated:
      "Güncel durum: Kadir Has Üniversitesi İngilizce Yeterlilik Sınavı bugün okuma (%40), dinleme (%30) ve yazma (%30) bölümlerinden oluşuyor ve yılda dört kez yapılıyor; konuşma bölümü bulunmuyor. Aşağıdaki açıklama sınavın önceki biçimini anlatmaktadır.",
    source: "khas.edu.tr",
    checked: CHECKED,
  },

  /* Marmara — "Müyyes Güz Yönerge ING.pdf" (27.08.2026): "tek oturumda … Writing, Use of English, Reading
   * ve Listening bölümleri … ağırlığı birbirine eşittir", "Yanlış cevaplar doğru cevapları götürmez";
   * SSS "MÜYYES'ten geçme notu 60'tır"; yönerge Md.10 (2019) iki yıl geçerlilik; eşdeğer sınavlar
   * (22.08.2025): TOEFL iBT 72 · PTE 55 · CAE/CPE C, 2 yıl; 2026-27 takvimi (09.09.2026). Kaynak metin
   * (iki aşama, konuşma, 50/100) eskimiş. */
  "marmara-universitesi": {
    exam: "MÜYYES",
    parts: [
      { name: "Yazma", note: "Writing", weight: 25, weightLabel: "%25" },
      { name: "Dil kullanımı", note: "Use of English · çoktan seçmeli", weight: 25, weightLabel: "%25" },
      { name: "Okuma", note: "Reading · çoktan seçmeli", weight: 25, weightLabel: "%25" },
      { name: "Dinleme", note: "Listening · iki kez dinletilir", weight: 25, weightLabel: "%25" },
    ],
    facts: [
      { value: "60", label: "geçme notu" },
      { value: "1", label: "oturum, ara yok" },
      { value: "4", label: "yıllık sınav" },
    ],
    faq: [
      {
        question: "Marmara Üniversitesi İngilizce yeterlik sınavı (MÜYYES) nasıl yapılır?",
        answer: "MÜYYES İngilizce sınavı ara verilmeden tek oturumda yapılır ve yazma, dil kullanımı, okuma ve dinleme bölümlerinden oluşur.",
        detail: [
          "Her bölüm 100 üzerinden puanlanır ve bölümlerin ağırlığı eşittir. Çoktan seçmeli sorularda yanlış cevaplar doğruları götürmez; dinleme metinleri iki kez dinletilir.",
        ],
      },
      {
        question: "Marmara Üniversitesi hazırlık atlama sınavında geçme notu kaç?",
        answer: "MÜYYES'ten geçme notu 100 üzerinden 60'tır.",
        detail: ["Sınavı geçen öğrenciler hazırlık eğitiminden muaf olur; MÜYYES sonucu sınav tarihini izleyen iki yıl boyunca geçerlidir."],
      },
      {
        question: "TOEFL ya da PTE ile muafiyet mümkün mü?",
        answer: "Evet; son iki yıl içinde alınmış TOEFL iBT 72, PTE Academic 55 ya da CAE / CPE C sonucuyla hazırlıktan muaf olunabilir.",
        detail: ["Yalnız devlet üniversitelerindeki sınav merkezlerinden alınan belgeler kabul edilir."],
      },
      {
        question: "MÜYYES ne zaman yapılır?",
        answer: "MÜYYES yılda dört kez yapılır: MÜYYES-Güz, MÜYYES-Kış, MÜYYES-Bahar ve yaz okulu açılırsa MÜYYES-Yaz.",
        detail: ["2026-2027 takvimine göre MÜYYES-Kış 15 Ocak 2027'de, MÜYYES-Bahar 26–28 Mayıs 2027'de yapılacaktır."],
      },
      {
        question: "MÜYYES'e kimler girer, mazeret sınavı var mı?",
        answer: "Tamamı ya da %30'u İngilizce eğitim veren bölümlere kayıtlı öğrenciler MÜYYES'e girer; mazeret sınavı yapılmaz.",
        detail: ["MÜYYES-Bahar'a girebilmek için devam koşulunu sağlamak ve yıl içi ortalamanın en az 60 olması gerekir."],
      },
    ],
    outdated:
      "Güncel durum: MÜYYES İngilizce sınavı bugün tek oturumda yapılıyor; yazma, dil kullanımı, okuma ve dinleme bölümleri eşit ağırlıkta ve geçme notu 60. Konuşma bölümü ve aşama barajı bulunmuyor. Aşağıdaki açıklama sınavın önceki biçimini anlatmaktadır.",
    source: "marmara.edu.tr",
    checked: CHECKED,
  },

  /* Doğuş — İngilizce Hazırlık Sınıfı Yönetmeliği (RG 29.11.2020, değ. 21.08.2024): "DÜİYES'te yeterlik
   * ölçütü 100 üzerinden en az 60'tır", 5 yıl geçerlilik; 2026-2027 öğrenci kitapçığı (PDF 13.09.2026):
   * "Sınav 2 oturumdan oluşur. 1.Oturum dinleme, okuma, dilbilgisi ve kelime kısımlarından, 2. Oturum ise
   * yazma kısmından oluşur", yılda 3 kez; resmi örnek sınav (10.08.2026): 1. oturum 110 dk (20+20+15+10
   * soru), yazma 60 dk; eşdeğerlik sayfası: TOEFL iBT 72 · PTE 55 · YDS/YÖKDİL 60. DÜİYES I / II ayrımı kalktı. */
  "dogus-universitesi": {
    exam: "DÜİYES",
    parts: [
      { name: "Dinleme", note: "20 soru · 1. oturum", weight: null, weightLabel: null },
      { name: "Okuma", note: "20 soru · 1. oturum", weight: null, weightLabel: null },
      { name: "Dil bilgisi", note: "15 soru · 1. oturum", weight: null, weightLabel: null },
      { name: "Kelime", note: "10 soru · 1. oturum", weight: null, weightLabel: null },
      { name: "Yazma", note: "250–300 kelime · 60 dk", weight: null, weightLabel: null },
    ],
    facts: [
      { value: "60", label: "geçme notu" },
      { value: "2", label: "oturum: test + yazma" },
      { value: "3", label: "yıllık sınav" },
    ],
    faq: [
      {
        question: "Doğuş Üniversitesi İngilizce yeterlik sınavı (DÜİYES) nasıl yapılır?",
        answer: "DÜİYES iki oturumlu yazılı bir sınavdır.",
        detail: [
          "Birinci oturumda dinleme, okuma, dil bilgisi ve kelime soruları, ikinci oturumda yazma bölümü yer alır. Resmi örnek sınavda birinci oturum 110 dakika, yazma oturumu 60 dakikadır.",
        ],
      },
      {
        question: "DÜİYES'e kimler girebilir?",
        answer: "Yeni kayıtlı öğrenciler önce seviye tespit sınavına girer; B1 ve üzeri çıkanlar DÜİYES'e alınır.",
        detail: ["Hazırlıkta okuyan öğrenciler, orta-üstü (Upper-Intermediate) düzeyini başarıyla bitirince sınava girebilir."],
      },
      {
        question: "DÜİYES geçme notu kaç?",
        answer: "Geçme notu 100 üzerinden 60'tır.",
        detail: ["Sonuç başarılı ya da başarısız olarak açıklanır; DÜİYES sonucu beş yıl geçerlidir."],
      },
      {
        question: "DÜİYES ne zaman yapılır?",
        answer: "Sınav yılda üç kez yapılır: akademik yıl başında, güz dönemi sonunda ve akademik yıl sonunda.",
        detail: ["Tarihler akademik takvimde ilan edilir; sınavın mazeret sınavı yoktur."],
      },
      {
        question: "TOEFL, PTE ya da YDS ile muafiyet mümkün mü?",
        answer: "Evet; TOEFL iBT 72, PTE Academic 55, CAE C ya da YDS / YÖKDİL 60 kabul edilir.",
        detail: ["Uluslararası sınava Türkiye'de giriliyorsa devlet üniversitesi binasında girilmiş olması gerekir."],
      },
    ],
    outdated:
      "Güncel durum: DÜİYES artık DÜİYES I ve II diye iki ayrı sınav değildir; yeni öğrenciler önce seviye tespit sınavına girer, B1 ve üzeri çıkanlar iki oturumlu tek DÜİYES'e alınır ve 100 üzerinden 60 alan bölümüne geçer. Aşağıdaki açıklama sınavın önceki biçimini anlatmaktadır.",
    source: "dogus.edu.tr",
    checked: CHECKED,
  },

  /* Koç — İngilizce Dil Merkezi sayfası (18.09.2026), ELC Program Student Handbook 2025-26 (02.07.2026), dış
   * sınav kabul koşulları (20.08.2026): KUEPE okuma 20 · dil kullanımı 20 · dinleme 15 · yazma 25 · konuşma
   * 20 (10 dk) = 100, "a total of 60 out of 100", yılda 4 kez; TOEFL iBT 4.5/6 · PTE 67 · YDS/e-YDS 80 ·
   * CAE/CPE C. Kaynak metin (kurumsal TOEFL ITP, KUEPE-S/W, TOEFL 550/537) eskimiş. */
  "koc-universitesi": {
    exam: "KUEPE",
    parts: [
      { name: "Okuma", note: "3 metin · 20 soru", weight: 20, weightLabel: "20 puan" },
      { name: "Dil kullanımı", note: "dil bilgisi + kelime · 20 soru", weight: 20, weightLabel: "20 puan" },
      { name: "Dinleme", note: "not alarak · 15 soru", weight: 15, weightLabel: "15 puan" },
      { name: "Yazma", note: "~450 kelimelik makale", weight: 25, weightLabel: "25 puan" },
      { name: "Konuşma", note: "birebir · 10 dk", weight: 20, weightLabel: "20 puan" },
    ],
    facts: [
      { value: "60", label: "geçme notu" },
      { value: "5", label: "bölüm, konuşma dahil" },
      { value: "4", label: "yıllık sınav" },
    ],
    faq: [
      {
        question: "Koç Üniversitesi İngilizce yeterlik sınavı (KUEPE) nasıl yapılır?",
        answer: "KUEPE, Rumelifeneri Kampüsünde yüz yüze ve iki bölüm hâlinde yapılır.",
        detail: ["Birinci bölümde okuma, dil kullanımı, dinleme ve yazma; ikinci bölümde 10 dakikalık birebir konuşma sınavı vardır."],
      },
      {
        question: "KUEPE'de puanlar nasıl dağılıyor?",
        answer: "Sınav 100 puan üzerinden değerlendirilir: okuma 20, dil kullanımı 20, dinleme 15, yazma 25, konuşma 20 puandır.",
        detail: ["Çoktan seçmeli bölümlerde yanlış cevap doğruyu götürmez."],
      },
      {
        question: "KUEPE geçme notu kaç?",
        answer: "Tüm bölümlerin toplamından 100 üzerinden en az 60 alan öğrenci bölümüne geçer.",
        detail: ["60'ın altında kalan yeni öğrenciler sonuçlarına göre hazırlıkta uygun seviyeye yerleştirilir."],
      },
      {
        question: "KUEPE ne zaman yapılır?",
        answer: "Sınav yılda dört kez yapılır: kayıt döneminden sonra ve güz, bahar ve yaz dönemlerinin sonunda.",
        detail: ["Yeni öğrencilerin KUEPE'ye girebilmesi için önce seviye belirleme sınavında yeterli sonucu alması gerekir; sınavın telafisi yoktur."],
      },
      {
        question: "TOEFL ya da PTE ile muafiyet mümkün mü?",
        answer: "Evet; TOEFL iBT'den 6 üzerinden 4.5, PTE Academic'ten 67, YDS / e-YDS'den 80 ya da CAE / CPE'den C yeterlidir.",
        detail: ["Türk vatandaşlarının bu sınavlara Türkiye'de devlet üniversitesi binasında girmesi gerekir."],
      },
    ],
    outdated:
      "Güncel durum: Koç Üniversitesi'nde hazırlıktan geçiş artık kurumsal TOEFL ITP ve KUEPE-S / KUEPE-W sınavlarıyla değil; okuma, dil kullanımı, dinleme, yazma ve konuşmadan oluşan 100 puanlık KUEPE'den en az 60 alarak ya da kabul edilen dış sınavlarla sağlanır. Aşağıdaki açıklama sınavın önceki biçimini anlatmaktadır.",
    source: "ku.edu.tr",
    checked: CHECKED,
  },

  /* Acıbadem — muafiyet sayfası + muafiyet koşulları PDF'i (10.08.2026), 2026-27 zorunlu hazırlık yazısı,
   * ACUPEP 2025-26 el kitabı: yeni öğrenci için "İngilizce Hazırlık Seviye Tespit ve Muafiyet Sınavı (ACUPEP
   * PPT)", üç aşama (çoktan seçmeli test → yazma 70 dk → konuşma 15 dk), her aşamada en az 70; ACEPT geçme 70
   * (Psikoloji, Hemşirelik, Beslenme ve Diyetetik 60); TOEFL iBT 80 / yeni ölçek 4,5 · PTE 67 · YDS/e-YDS 85
   * (+ yazma ve konuşma 70). "AYES" resmi ad değil; kaynak metin (tek APPT, YÖKDİL, TWE) eskimiş. */
  "acibadem-universitesi": {
    exam: "ACUPEP PPT",
    parts: [
      { name: "Seviye tespit testi", note: "çoktan seçmeli · online", weight: null, weightLabel: null },
      { name: "Yazma", note: "görüş yazısı · 70 dk", weight: null, weightLabel: null },
      { name: "Konuşma", note: "bireysel · ~15 dk", weight: null, weightLabel: null },
    ],
    facts: [
      { value: "70", label: "her aşamada gereken puan" },
      { value: "3", label: "aşama" },
      { value: "4,5", label: "yeni TOEFL iBT eşiği" },
    ],
    faq: [
      {
        question: "Acıbadem Üniversitesi hazırlık muafiyet sınavı (ACUPEP PPT) nasıl yapılır?",
        answer: "Sınav üç aşamalıdır: önce çoktan seçmeli seviye tespit testi, ardından yazma ve konuşma sınavları yapılır.",
        detail: ["İlk aşama online, yazma ve konuşma aşamaları kampüste yüz yüzedir."],
      },
      {
        question: "Hazırlıktan muaf olmak için kaç puan gerekir?",
        answer: "Her aşamadan en az 70 almak gerekir.",
        detail: [
          "Testten 70 alan öğrenci yazma sınavına, yazmadan 70 alan konuşma sınavına geçer. Yazma sınavında 70 dakikada bir görüş yazısı yazılır; konuşma sınavı bireysel olarak yaklaşık 15 dakika sürer.",
        ],
      },
      {
        question: "ACEPT nedir, geçme notu kaç?",
        answer: "ACEPT, hazırlık öğrencilerinin dönem ya da yıl sonunda girdiği yeterlik sınavıdır; geçme notu 70'tir.",
        detail: ["Dil kullanımı, okuma, dinleme, yazma ve konuşma bölümlerinden oluşur. Psikoloji, Hemşirelik ile Beslenme ve Diyetetik bölümlerinde geçme notu 60'tır."],
      },
      {
        question: "Sınav ne zaman yapılır?",
        answer: "ACUPEP PPT her yıl akademik yıl başında, yalnız yeni kayıtlı öğrencilere bir kez yapılır.",
        detail: ["Aşamaların tekrarı yoktur. ACEPT ise güz, bahar ve yaz dönemlerinin sonunda düzenlenir."],
      },
      {
        question: "TOEFL, PTE ya da YDS ile muafiyet mümkün mü?",
        answer: "Evet; TOEFL iBT 80 (yeni ölçekte 4,5), PTE Academic 67 ya da CAE C kabul edilir.",
        detail: ["YDS / e-YDS'den 85 alanların ayrıca yazma ve konuşma sınavlarından en az 70 alması gerekir."],
      },
    ],
    outdated:
      "Güncel durum: Yeni öğrenciler için hazırlık muafiyet sınavının adı artık ACUPEP PPT'dir ve üç aşamalıdır; çoktan seçmeli testten 70 alan öğrencinin yazma ve konuşma sınavlarından da en az 70 alması gerekir. Kabul edilen dış sınavlar ve puanlar da güncellenmiştir. Aşağıdaki açıklama sınavın önceki biçimini anlatmaktadır.",
    source: "acibadem.edu.tr",
    checked: CHECKED,
  },

  /* Boğaziçi — yadyok.bogazici.edu.tr "Test content and scoring" (2443): dinleme %30 · okuma %40 · yazma %30,
   * "average of at least (56) in the Writing section"; "General information" (2441): "approximately 3.5 hours",
   * "valid for two years"; eşdeğer sınavlar (2446, 12.06.2026'dan itibaren): TOEFL iBT 4,5 (genel + her bölüm),
   * IELTS Academic 6,5 (yazma 6,5), son iki yıl; 2026-27 takvimi (24.08.2026). Kaynak metinde yalnız okuma
   * bölümü eski (iki metin, ~10'ar soru; süre açıklanmıyor). */
  "bogazici-universitesi": {
    exam: "BUEPT",
    parts: [
      { name: "Dinleme", note: "seçici + ayrıntılı dinleme", weight: 30, weightLabel: "%30" },
      { name: "Okuma", note: "2 metin · ~10'ar soru", weight: 40, weightLabel: "%40" },
      { name: "Yazma", note: "2 kompozisyon · 80 dk", weight: 30, weightLabel: "%30" },
    ],
    facts: [
      { value: "60", label: "genel geçme notu" },
      { value: "~3,5", label: "saat" },
      { value: "2", label: "yıl geçerli" },
    ],
    faq: [
      {
        question: "Boğaziçi Üniversitesi İngilizce yeterlik sınavı (BUEPT / BÜYES) nasıl yapılır?",
        answer: "BUEPT; dinleme, okuma ve yazma olmak üzere üç bölümden oluşur ve yaklaşık 3,5 saat sürer.",
        detail: [
          "Dinleme metinleri bir kez okunur. Okuma bölümünde iki metin ve her metin için yaklaşık 10 soru bulunur; yazma bölümünde 40'ar dakikalık iki kompozisyon yazılır.",
        ],
      },
      {
        question: "BUEPT geçme notu kaç?",
        answer: "Boğaziçi hazırlık atlama için genel ortalamanın 100 üzerinden en az 60 olması gerekir.",
        detail: [
          "Bölüm ağırlıkları dinleme %30, okuma %40, yazma %30'dur ve yazma ortalaması en az 56 olmalıdır. Sonuç A, B, C+ ya da C harf notuyla açıklanır ve iki yıl geçerlidir.",
        ],
      },
      {
        question: "TOEFL ya da IELTS ile Boğaziçi hazırlık atlama mümkün mü?",
        answer: "Evet; TOEFL iBT ve IELTS Academic BUEPT'e eşdeğer kabul edilir.",
        detail: [
          "TOEFL iBT'de genelde ve her bölümde en az 4,5; IELTS Academic'te genel 6,5 ve yazmada 6,5 aranır. Sonuç son iki yıl içinde alınmış olmalıdır; TOEFL Home Edition, TOEFL ITP ve IELTS Online kabul edilmez.",
        ],
      },
      {
        question: "BUEPT ne zaman yapılır?",
        answer: "Sınav güz, kış, bahar ve yaz dönemlerinde yılda dört kez yapılır.",
        detail: ["2026-2027 akademik takviminde tarihler 7 Eylül 2026, 24 Aralık 2026, 11 Mayıs 2027 ve 17 Ağustos 2027'dir."],
      },
      {
        question: "Boğaziçi dışından adaylar BUEPT'e girebilir mi?",
        answer: "Evet; başvuru yapıp sınav ücretini ödeyerek girebilirler.",
        detail: ["Başvuru bilgileri sınavdan yaklaşık iki hafta önce YADYOK duyurularında yayımlanır; bu adayların sınavın tamamını tek seferde geçmesi gerekir."],
      },
    ],
    outdated:
      "Güncel durum: Okuma bölümü artık her birinde yaklaşık 10 soru bulunan iki metinden oluşuyor ve bölüm süreleri ayrıca açıklanmıyor; dinleme ve yazma bölümlerinin anlatımı güncel. Aşağıdaki açıklama sınavın önceki biçimini anlatmaktadır.",
    source: "bogazici.edu.tr",
    checked: CHECKED,
  },

  /* Sabancı — sl.sabanciuniv.edu "ELAE face to face": "two stages administered on separate days", yazma %30 ·
   * dinleme %30 · okuma %40, "minimum grade of 70 out of 100", telafi yok; bölüm dökümü (resmi PDF, 05.09.2024):
   * skimming %15 (15-20 dk), ayrıntılı okuma %25 (50-60 dk, 5+5+6 soru); muafiyet (sabanciuniv.edu/en/exemption-fdy):
   * TOEFL iBT 85 / yeni ölçek 4,5 · PTE 71 (her bölüm 67) · CAE/CPE C · YDS 90. Biçim aynı, kaynak metindeki
   * süre / soru sayısı / TOEFL 80 eskimiş → not. */
  "sabanci-universitesi": {
    exam: "ELAE",
    parts: [
      { name: "Yazma", note: "300–350 kelime · 50 dk", weight: 30, weightLabel: "%30" },
      { name: "Dinleme", note: "görüşme + not alarak ders", weight: 30, weightLabel: "%30" },
      { name: "Okuma", note: "hızlı okuma + ayrıntılı okuma", weight: 40, weightLabel: "%40" },
    ],
    facts: [
      { value: "70", label: "2. aşama geçme notu" },
      { value: "2", label: "aşama, ayrı günlerde" },
      { value: "2", label: "yıl geçerli" },
    ],
    faq: [
      {
        question: "Sabancı Üniversitesi İngilizce yeterlik sınavı (ELAE) nasıl yapılır?",
        answer: "ELAE, farklı günlerde yapılan iki aşamalı bir sınavdır.",
        detail: [
          "1. Aşama dil bilgisi, kelime ve yazma bölümlerinden oluşan bir düzey belirleme sınavıdır; bu aşamada başarılı olanlar 2. Aşamaya girer. 2. Aşama yazma (%30), dinleme (%30) ve okuma (%40) bölümlerinden oluşur.",
        ],
      },
      {
        question: "ELAE geçme notu kaç?",
        answer: "Sabancı hazırlık atlama için 2. Aşamada 100 üzerinden en az 70 almak gerekir.",
        detail: ["Sonuçlar sayısal değil, başarılı (SL) ya da başarısız (UL) olarak açıklanır; 2. Aşama sonucu iki yıl geçerlidir ve mazeret sınavı yoktur."],
      },
      {
        question: "ELAE'de hangi bölümler var?",
        answer: "Yazma bölümünde 50 dakikada 300–350 kelimelik bir kompozisyon yazılır.",
        detail: [
          "Dinleme bölümü bir görüşme ile not alarak dinlenen bir dersten oluşur. Okuma bölümü hızlı okuma (skimming) ve aynı temadaki iki metne dayanan ayrıntılı okumadan oluşur.",
        ],
      },
      {
        question: "TOEFL, PTE ya da YDS ile Sabancı hazırlık atlama mümkün mü?",
        answer: "Evet; TOEFL iBT 85 (yeni ölçekte 4,5), PTE Academic 71, CAE / CPE C ya da YDS 90 ile muaf olunabilir.",
        detail: ["PTE'de her bölümden en az 67 aranır. Home edition ve online sınavlar kabul edilmez."],
      },
      {
        question: "ELAE ne zaman yapılır?",
        answer: "ELAE yılda birkaç kez; ocak, haziran / temmuz ve ağustos / eylül dönemlerinde yapılır.",
        detail: ["Üniversiteye yeni kabul edilen öğrenciler ağustos / eylül sınavına otomatik olarak kaydedilir."],
      },
    ],
    outdated:
      "Güncel durum: ELAE'nin bölümleri aynı, ancak bazı ayrıntılar değişti: hızlı okuma %15, ayrıntılı okuma %25 ağırlıkta; TOEFL iBT için bugün 85 (yeni ölçekte 4,5), PTE için 71 aranıyor. Aşağıdaki açıklama önceki yönergeye dayanmaktadır.",
    source: "sabanciuniv.edu",
    checked: CHECKED,
  },

  /* Özyeğin — ozyegin.edu.tr "TRACE": "must score at least 65", okuma 60 dk 35 soru, dinleme ~35 dk 20 soru,
   * yazma ~250 kelime 50 dk; örnek sayfa: %30 / %30 / %40; dil yeterlik koşulu: düzey belirleme 60/100, iki yıl
   * geçerlilik, muafiyet tablosu (24.09.2026): TOEFL iBT 80 · PTE 62 · YDS 86 · CAE/CPE C · FCE B; 2026-27 takvimi.
   * Kaynak metin (4 bölüm, 400-450 kelime, bölüm alt puanları) eskimiş. */
  "ozyegin-universitesi": {
    exam: "TRACE",
    parts: [
      { name: "Okuma", note: "3 metin · 35 soru · 60 dk", weight: 30, weightLabel: "%30" },
      { name: "Dinleme", note: "ders + söyleşi · 20 soru", weight: 30, weightLabel: "%30" },
      { name: "Yazma", note: "~250 kelime paragraf · 50 dk", weight: 40, weightLabel: "%40" },
    ],
    facts: [
      { value: "65", label: "geçme notu" },
      { value: "3", label: "bölüm" },
      { value: "2", label: "yıl geçerli" },
    ],
    faq: [
      {
        question: "Özyeğin Üniversitesi İngilizce yeterlik sınavı (TRACE) nasıl yapılır?",
        answer: "TRACE; okuma, dinleme ve yazma olmak üzere üç bölümden oluşur ve tüm bölümler aynı genel konu etrafında hazırlanır.",
        detail: [
          "Okuma bölümü 60 dakika ve 35 soru, dinleme bölümü yaklaşık 35 dakika ve 20 sorudur. Yazma bölümünde 50 dakikada yaklaşık 250 kelimelik akademik bir paragraf yazılır.",
        ],
      },
      {
        question: "TRACE geçme notu kaç?",
        answer: "Özyeğin hazırlık atlama için TRACE'ten 100 üzerinden en az 65 almak gerekir.",
        detail: ["Bölüm ağırlıkları okuma %30, dinleme %30 ve yazma %40'tır. Sonuç iki yıl geçerlidir; mazeret sınavı yapılmaz."],
      },
      {
        question: "TRACE'e kimler girebilir?",
        answer: "İngilizce düzey belirleme sınavından 100 üzerinden en az 60 alan ya da hazırlıkta Level 4 kurunu tamamlayan öğrenciler girebilir.",
        detail: ["Düzey belirleme sınavı 50 dakikada 70 çoktan seçmeli sorudan oluşur."],
      },
      {
        question: "TOEFL, PTE ya da YDS ile Özyeğin hazırlık muafiyeti mümkün mü?",
        answer: "Evet; TOEFL iBT'den en az 80, PTE Academic'ten en az 62, YDS / e-YDS'den en az 86 ile muaf olunabilir.",
        detail: ["TOEFL ve PTE iki yıl, Cambridge sınavları üç yıl, YDS beş yıl geçerlidir."],
      },
      {
        question: "TRACE ne zaman yapılır?",
        answer: "TRACE akademik takvimde ilan edilen tarihlerde yılda dört kez yapılır.",
        detail: ["2026-2027 takviminde sınav tarihleri 8 Eylül 2026, 11 Ocak 2027, 27 Mayıs 2027 ve 25 Ağustos 2027'dir."],
      },
    ],
    outdated:
      "Güncel durum: TRACE artık okuma (%30), dinleme (%30) ve yazma (%40) olmak üzere üç bölümden oluşuyor; yazma bölümünde yaklaşık 250 kelimelik bir paragraf isteniyor. Aşağıdaki açıklama sınavın önceki biçimini anlatmaktadır.",
    source: "ozyegin.edu.tr",
    checked: CHECKED,
  },

  /* İTÜ — ydy.itu.edu.tr "Yeterlik sınavı" (1. oturum 120 dk / 50 puan: dil kullanımı 14 + okuma 36; 2. oturum
   * 135 dk / 50 puan: yazma 30 + dinleme 20; "ikinci aşamaya yalnızca … 25/50"), sis.itu.edu.tr geçerli sınavlar
   * (Senato 22.01.2026): TOEFL iBT 4 (21.01.2026 sonrası) · PTE 59 (2026-27 güz'den) · OTE Advanced 111 · e-Tep 74,
   * 2 yıl; hazırlık akademik takvimi 2026-27. Kaynak metin (45 soru, 60/40 puan, 30/20 eşik, üç konu, ay listesi) eskimiş. */
  "istanbul-teknik-universitesi": {
    exam: "İTÜ İngilizce Yeterlik Sınavı",
    parts: [
      { name: "Dil kullanımı", note: "1. aşama · 19 soru", weight: 14, weightLabel: "14 puan" },
      { name: "Okuma", note: "1. aşama · 3 metin · 24 soru", weight: 36, weightLabel: "36 puan" },
      { name: "Yazma", note: "2. aşama · kompozisyon + entegre", weight: 30, weightLabel: "30 puan" },
      { name: "Dinleme", note: "2. aşama · 10 soru", weight: 20, weightLabel: "20 puan" },
    ],
    facts: [
      { value: "60", label: "lisans geçme notu" },
      { value: "25/50", label: "her aşamada en az" },
      { value: "2", label: "aşama: 120 + 135 dk" },
    ],
    faq: [
      {
        question: "İTÜ İngilizce yeterlik sınavı nasıl yapılır?",
        answer: "İTÜ İngilizce Yeterlik Sınavı farklı günlerde yapılan iki aşamadan oluşur.",
        detail: [
          "1. aşama dil kullanımı ve okuma bölümlerini içerir ve 120 dakika sürer. 2. aşama akademik kompozisyon, entegre yazma ve dinleme bölümlerinden oluşur ve 135 dakika sürer.",
        ],
      },
      {
        question: "İTÜ hazırlık atlama sınavının geçme notu kaç?",
        answer: "Lisans öğrencileri için toplam puanın 100 üzerinden en az 60 olması gerekir.",
        detail: [
          "Her iki aşamadan da en az 25 / 50 almak şarttır. 60–74 arası alan öğrenciler bölümlerinde ayrıca ING 100 dersini alır; tezli yüksek lisans için gereken puan 65'tir.",
        ],
      },
      {
        question: "Sınavda hangi bölümler ve puanlar var?",
        answer: "Dil kullanımı 14, okuma 36, yazma 30 ve dinleme 20 puan değerindedir.",
        detail: ["Okumada 3 metne ait 24 soru, dinlemede yaklaşık 10 dakikalık bir derse ait 10 soru bulunur."],
      },
      {
        question: "TOEFL ya da PTE ile İTÜ hazırlıktan muaf olunur mu?",
        answer: "Evet; TOEFL iBT, PTE Akademik, OTE Advanced ve e-Tep sonuçlarıyla lisans hazırlıktan muaf olunabilir.",
        detail: [
          "21 Ocak 2026 sonrası TOEFL iBT sınavlarında en az 4, 2026-2027 güz döneminden itibaren PTE Akademik'te en az 59 aranır. Sonuçlar devlet üniversitelerindeki sınav merkezlerinden alınmış olmalıdır.",
        ],
      },
      {
        question: "İTÜ İngilizce yeterlik sınavı ne zaman yapılır?",
        answer: "Sınav hazırlık akademik takvimindeki tarihlerde yılda dört dönemde yapılır.",
        detail: [
          "2026-2027'de oturumlar 9 / 11 Eylül 2026, 15 / 18 Ocak 2027, 26 / 28 Mayıs 2027 ve 9 / 12 Ağustos 2027 tarihlerindedir; İTÜ dışından adaylar da başvurabilir.",
        ],
      },
    ],
    outdated:
      "Güncel durum: Sınavın her aşaması artık 50 puan üzerinden değerlendiriliyor; 1. aşama dil kullanımı ve okumadan (120 dk), 2. aşama yazma ve dinlemeden (135 dk) oluşuyor ve her aşamada en az 25 puan gerekiyor. Aşağıdaki açıklama sınavın önceki biçimini anlatmaktadır.",
    source: "itu.edu.tr",
    checked: CHECKED,
  },

  /* Yeditepe — yabancidiller.yeditepe.edu.tr "İngilizce Hazırlık Programı": "Sınav, 80 soruluk çoktan seçmeli
   * bölüm ve 20 puanlık yazma bölümünden oluşur… 2 farklı konu verilir", "TOEFL iBT sınavından 79 (0-120) veya
   * 4 (1-6)… YDS / e-YDS / YÖKDİL / e-YÖKDİL… 66"; 2026-27 Güz öğrenci el kitabı (Eylül 2026): 80+ AFE muafiyeti,
   * "IELTS sınavı kurumumuzda geçerli değildir"; geçme 60 (Sanat ve Tasarım'da üç bölüm 50; dil bölümleri 65).
   * Süreler yayımlanmıyor. Biçim aynı, kaynak metindeki 3 konu / TOEFL 550-213 / bölüm listesi eskimiş → not. */
  "yeditepe-universitesi": {
    exam: "İngilizce Yeterlik Sınavı",
    parts: [
      { name: "Çoktan seçmeli test", note: "80 soru · dil bilgisi, kelime, okuma", weight: 80, weightLabel: "80 puan" },
      { name: "Yazma", note: "2 konudan biri · ~300 kelime", weight: 20, weightLabel: "20 puan" },
    ],
    facts: [
      { value: "60", label: "geçme notu" },
      { value: "80", label: "soruluk test" },
      { value: "2", label: "yıl geçerli" },
    ],
    faq: [
      {
        question: "Yeditepe Üniversitesi İngilizce yeterlik sınavı nasıl yapılır?",
        answer: "Sınav, 80 soruluk çoktan seçmeli bölüm ile 20 puanlık yazma bölümünden oluşur.",
        detail: ["Yazma bölümünde verilen iki konudan biri seçilir ve yaklaşık 300 kelimelik bir kompozisyon yazılır."],
      },
      {
        question: "Yeditepe hazırlık atlama sınavında geçme notu kaç?",
        answer: "Genel programlarda geçme notu 100 üzerinden 60'tır.",
        detail: [
          "Tekstil ve Moda Tasarımı, Plastik Sanatlar ve Resim ile Tiyatro bölümlerinde 50 yeterlidir. İngilizce Öğretmenliği, İngiliz Dili ve Edebiyatı ve Çeviribilimi öğrencilerinin 65 alması ve yazma ile konuşmadan en az 60 alması gerekir.",
        ],
      },
      {
        question: "TOEFL ya da YDS ile muafiyet mümkün mü?",
        answer: "Evet; son iki yıl içinde alınmış TOEFL iBT 79 (yeni ölçekte 4) ya da YDS / YÖKDİL 66 ile muaf olunabilir.",
        detail: ["TOEFL'da üniversitenin kurum kodunun işaretlenmesi ve sınava kabul edilen dört merkezden birinde girilmesi gerekir; TOEFL Home Edition kabul edilmez."],
      },
      {
        question: "Sınav ne zaman yapılır?",
        answer: "Sınav her öğretim yılı başında, Rektörlükçe ilan edilen gün, saat ve yerde yapılır.",
        detail: ["Sınavda mazeret kabul edilmez; alınan sonuç iki yıl geçerlidir."],
      },
      {
        question: "Dil bölümleri için sınav farklı mı?",
        answer: "Evet; İngilizce Öğretmenliği, İngiliz Dili ve Edebiyatı ve Çeviribilimi için sınav dört bölümlüdür.",
        detail: ["Bu bölümler 80 soruluk test, 350–400 kelimelik yazma, 40 soruluk dinleme ve birebir konuşmadır."],
      },
    ],
    outdated:
      "Güncel durum: Sınavın adı bugün İngilizce Yeterlik Sınavı; yazma bölümünde 3 değil 2 konu veriliyor ve TOEFL iBT için 79 (yeni ölçekte 4) ya da YDS / YÖKDİL 66 kabul ediliyor. Aşağıdaki açıklama önceki yönergeye dayanmaktadır.",
    source: "yeditepe.edu.tr",
    checked: CHECKED,
  },

  /* Işık — isikun.edu.tr "Sınavlar" (TR + EN): "okuma (%25), dinleme (%25) yazma (%25) ve konuşma (%25)",
   * okuma 15-20 soru 60-75 dk, dinleme 16 soru, yazma 50-60 dk, konuşma 7-8 dk, geçme 70; yerleştirme 75 dk,
   * 55+ (öğrenci el kitabı); 2026 duyurusu (17.08.2026); TOEFL iBT 80 · PTE 65 · YDS/YÖKDİL 70 · e-TEP 80.
   * Dinlemenin hangi oturumda olduğu TR ve EN sayfada çelişiyor → yazılmadı. Kaynak metin (%25/%35/%40,
   * değerlendirilmeyen 1. bölüm, 90 dk yerleştirme) eskimiş. */
  "isik-universitesi": {
    exam: "İngilizce Yeterlik Sınavı",
    parts: [
      { name: "Okuma", note: "15–20 soru · 60–75 dk", weight: 25, weightLabel: "%25" },
      { name: "Dinleme", note: "not alarak ders · 16 soru", weight: 25, weightLabel: "%25" },
      { name: "Yazma", note: "3–4 paragraf · 50–60 dk", weight: 25, weightLabel: "%25" },
      { name: "Konuşma", note: "fotoğraf üzerine · 7–8 dk", weight: 25, weightLabel: "%25" },
    ],
    facts: [
      { value: "70", label: "muafiyet notu" },
      { value: "~4", label: "saat" },
      { value: "4", label: "eşit bölüm" },
    ],
    faq: [
      {
        question: "Işık Üniversitesi İngilizce yeterlik sınavı nasıl yapılır?",
        answer: "Sınav okuma, dinleme, yazma ve konuşma olmak üzere dört bölümden oluşur ve her bölüm %25 ağırlık taşır.",
        detail: ["Yaklaşık 4 saat süren sınav sabah ve öğleden sonra iki oturumda yapılır; konuşma bölümü aynı gün ya da ayrı bir günde verilebilir."],
      },
      {
        question: "Yeterlik sınavına kimler girer?",
        answer: "Yeni öğrenciler önce 75 dakikalık yerleştirme sınavına girer; 55 ve üzeri alanlar yeterlik sınavına geçer.",
        detail: ["Yerleştirme sınavı dil bilgisi, kelime bilgisi ve okuduğunu anlama becerilerini ölçer."],
      },
      {
        question: "Işık hazırlık atlama sınavında geçme notu kaç?",
        answer: "Muafiyet için 100 üzerinden en az 70 almak gerekir.",
        detail: ["Bu puanı alan öğrenci hazırlık programından muaf olur ve fakülteye başlar."],
      },
      {
        question: "TOEFL ya da PTE ile muafiyet mümkün mü?",
        answer: "Evet; TOEFL iBT 80, PTE Academic 65, e-TEP 80 ya da YDS / YÖKDİL 70 kabul edilir.",
        detail: ["TOEFL, PTE ve e-TEP sonuçları 2 yıl, YDS ve YÖKDİL sonuçları 5 yıl geçerlidir; TOEFL ve PTE için yalnız üniversitelerdeki sınav merkezlerinden alınan sonuçlar geçerlidir."],
      },
      {
        question: "Sınav ne zaman yapılır?",
        answer: "Yeterlik sınavı her akademik yılın başında, Eylül ayında yapılır.",
        detail: ["Hazırlık öğrencileri için Ocak, Haziran ve Ağustos'ta çıkış sınavı yapılır."],
      },
    ],
    outdated:
      "Güncel durum: Işık Üniversitesi İngilizce Yeterlik Sınavı bugün okuma, dinleme, yazma ve konuşma olmak üzere her biri %25 ağırlıklı dört bölümden oluşuyor ve yerleştirme sınavı 75 dakika sürüyor. Aşağıdaki açıklama sınavın önceki biçimini anlatmaktadır.",
    source: "isikun.edu.tr",
    checked: CHECKED,
  },

  /* Kocaeli — yabancidiller.kocaeli.edu.tr: yeterlik sınavı rehberi (20.08.2026, "only ONE session… approximately
   * 120 minutes"; 13 dinleme + 20 okuma + 10 dil kullanımı + 7 dil bilgisi, 150+ kelime paragraf), yönerge (Eylül
   * 2024) Md.10 "100 üzerinden 60 ve üstü… muaf", "telafisi yoktur"; eşdeğerlik sayfası: TOEFL iBT 72 · PTE 55 ·
   * YDS 60 · CAE C, "IELTS ve YÖKDİL… denklik sağlamamaktadır"; 2026-27 takvimi. Rehberdeki "65" ve yazma puanı
   * çelişkili → 60 (yönerge + 2026 duyuruları), puan dağılımı yazılmadı. Kaynak metin (65, IELTS 6, SAT, FCE) eskimiş. */
  "kocaeli-universitesi-hazirlik": {
    exam: "İYS",
    parts: [
      { name: "Dinleme", note: "13 soru · ~15–20 dk", weight: null, weightLabel: null },
      { name: "Okuma", note: "20 soru · 60 dk", weight: null, weightLabel: null },
      { name: "Dil kullanımı", note: "10 soru", weight: null, weightLabel: null },
      { name: "Dil bilgisi", note: "7 soru", weight: null, weightLabel: null },
      { name: "Yazma", note: "paragraf · 150+ kelime", weight: null, weightLabel: null },
    ],
    facts: [
      { value: "60", label: "muafiyet notu" },
      { value: "~120", label: "dakika, tek oturum" },
      { value: "50", label: "soru + yazma" },
    ],
    faq: [
      {
        question: "Kocaeli Üniversitesi İngilizce Yeterlik Sınavı (İYS) nasıl yapılır?",
        answer: "İYS, yaklaşık 120 dakika süren ve kısa bir ara verilen tek oturumlu yazılı bir sınavdır.",
        detail: [
          "Sınavda 50 soruluk bir test (13 dinleme, 20 okuma, 10 dil kullanımı, 7 dil bilgisi) ve en az 150 kelimelik bir paragraf yazma görevi bulunur. Sözlük ve elektronik cihaz kullanılamaz.",
        ],
      },
      {
        question: "Kocaeli hazırlık atlama sınavında geçme notu kaç?",
        answer: "Genel İngilizce hazırlık için geçme notu 100 üzerinden 60'tır.",
        detail: ["İngiliz Dili ve Edebiyatı bölümünde önce yazılı sınav ve kompozisyondan, ardından sözlü sınavdan 70 almak gerekir."],
      },
      {
        question: "TOEFL ya da PTE ile muafiyet mümkün mü?",
        answer: "Evet; genel hazırlık için TOEFL iBT 72, PTE Academic 55, CAE C ya da YDS 60 yeterlidir.",
        detail: [
          "Uluslararası sınav sonuçları 2 yıl, YDS 5 yıl geçerlidir. Türkiye'de alınan sınavlar devlet üniversitesi binalarında yapılmış olmalıdır; YÖKDİL ve evden alınan sınavlar kabul edilmez.",
        ],
      },
      {
        question: "Sınav ne zaman yapılır?",
        answer: "Yeni öğrenciler için İYS-Güz Eylül ayında, seviye tespit sınavıyla aynı gün yapılır.",
        detail: ["Hazırlık öğrencileri için 2026-2027'de İYS-Kış 26 Ocak, İYS-Bahar 15 Haziran ve İYS-Yaz 6 Temmuz 2027'de yapılacaktır."],
      },
      {
        question: "Sınava kimler girer?",
        answer: "Eğitim dili tamamen ya da %30 İngilizce olan programlara yeni kayıt yaptıran ve geçerli bir denklik belgesi olmayan öğrenciler sınava girer.",
        detail: ["Yeterlik sınavlarının telafisi yoktur; isteğe bağlı hazırlık öğrencileri yalnız seviye tespit sınavına alınır."],
      },
    ],
    outdated:
      "Güncel durum: Kocaeli Üniversitesi İngilizce Yeterlik Sınavı (İYS) bugün dinleme, okuma, dil kullanımı, dil bilgisi ve yazma bölümlerinden oluşan yaklaşık 120 dakikalık tek oturumlu bir sınavdır; genel hazırlık için geçme notu 100 üzerinden 60'tır ve IELTS kabul edilmemektedir. Aşağıdaki açıklama sınavın önceki biçimini anlatmaktadır.",
    source: "kocaeli.edu.tr",
    checked: CHECKED,
  },
};

export function getUniversityExam(slug: string): UniversityExamInfo | null {
  return UNIVERSITY_EXAMS[slug] ?? null;
}
