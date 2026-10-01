/**
 * Proficiency üniversite sayfaları — sınavın GÜNCEL bilgisi (UI turu 2026-09-28,
 * kullanıcı: "bilgisi az olan üniversitelere SEO'ya uygun ekleme yap").
 *
 * GENEL SINAV BİLGİSİ (P2 kuralı): her olgu üniversitenin resmi sayfasından / yönergesinden
 * doğrulanır, kaynak `sources`ta ve yorumda; doğrulanamayan rakam yazılmaz.
 *
 * ESKİMİŞ KAYNAK METİN (müşteri kararı 2026-09-30: "Yenilerini güncelle"): sayfanın kaynak metnindeki
 * (`data/site_content.json`, salt okunur) eskimiş satırlar `edits` ile güncel karşılığına çevrilir — satır
 * satır, izlenebilir; her değerin resmi kaynağı üniversitenin yorum bloğunda. Doğrulanamayan rakam
 * DEĞİŞTİRİLMEZ; böyle bir satır sayfada kaldıysa bölümün başında `caveat` notu durur ve açık nokta
 * `docs/bekleyen-sorular.md`'ye yazılır. 19 üniversitenin hepsi 30.09.2026'da yeniden doğrulandı (eski
 * "Önceki sınav biçimi" başlığı ve `outdated` notu kalktı).
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
  /**
   * Sayfadaki kaynak metinde resmi kaynaktan doğrulanamayan ya da resmi kaynakların çeliştiği bir ayrıntı KALDIYSA
   * (o satır değiştirilmez) bölümün başında gösterilen not. Hepsi doğrulanmışsa null.
   */
  caveat: string | null;
  /**
   * Kaynak satırı (TAMAMI, birebir) → güncel satır. `null` = bugün karşılığı kalmayan satır gösterilmez (gerekçe
   * yorumda). Kullanılmayan anahtar build'i düşürür (`lib/universityContent.ts`).
   */
  edits?: Record<string, string | null>;
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
   * bilgisi ve kelime bilgisi bölümlerinden oluşur." Soru sayısı / süre doğrulanamadı → yazılmadı.
   *
   * KAYNAK METİN GÜNCELLEMESİ (müşteri kararı 2026-09-30: "Yenilerini güncelle"; yeniden doğrulama 30.09.2026) — `edits`:
   * [A] T.C. İstanbul Beykent Üniversitesi Yabancı Dil Hazırlık Sınıfı Eğitim-Öğretim ve Sınav Yönergesi (18.07.2025
   * Tarih ve 2025/17 Sayılı Senato Kararı) — PDF; ydyo.beykent.edu.tr/egitim-ogretim-ve-sinav-yonergesi sayfası
   * 30.09.2026'da hâlâ bu dosyaya bağlanıyor —
   * https://www.beykent.edu.tr/docs/default-source/yonergeler/yabanci-dil-hazirlik-sinifi-egitim-ogretim-ve-sinav-yonergesi.pdf?sfvrsn=c446f09c_14
   * (18.07.2025)
   * [B] Yabancı Diller Yüksekokulu — İngilizce Hazırlık Programı — Sınav Türleri —
   * https://ydyo.beykent.edu.tr/programlar/ingilizce-hazirlik-programi/sinav-turleri (tarihsiz)
   * [C] 2026-2027 Eğitim-Öğretim Yılı Yabancı Diller Yüksekokulu Öğrenci El Kitabı (PDF, 35 sayfa;
   * ydyo.beykent.edu.tr/ogrenci-el-kitapcigi sayfasından) —
   * https://ydyo.beykent.edu.tr/docs/default-source/ydyo/öğrenci-el-kitapları/ydyo-2026-tr.pdf?sfvrsn=c441c5ae_12
   * (02.09.2026 (PDF üst verisi))
   * - Hafif eskime. Eski cümle, üniversitenin bugün Modül/Dönem Sonu Sınavı için kullandığı kalıbı taşıyor ("yazılı
   * ve/veya sözlü ifade"). BULET'in güncel resmi tanımında (1) kelime bilgisi ayrı bir bölüm olarak sayılıyor, (2)
   * yazma ve konuşma "ve/veya" değil, ikisi birden var (yönerge: "yazılı ve sözlü ifade bölümlerinden oluşur").
   * İkinci cümle (akademik düzey, dört beceri + dil bilgisi) hâlâ doğru; yalnız kelime bilgisi eklendi. Sınavın
   * düzeyi B1+ (istenirse cümleye eklenebilir). "Sınav; okuma, dinleme, yazma, konuşma, dil bilgisi ve kelime
   * bilgisi bölümlerinden oluşur ve tüm dil becerilerini ölçmektedir." [B] */
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
        detail: ["Sınav dönemleri akademik yıl başı, güz ve bahar yarıyıllarının sonu ve yaz modülünün sonudur. 2026-27 takviminde yıl içi yeterlik sınavları 28 Aralık 2026, 15 Nisan 2027 ve 31 Mayıs 2027'dir."],
      },
      {
        question: "YDS ya da başka bir sınavla hazırlıktan muaf olunur mu?",
        answer: "Evet; ÖSYM dönüşüm tablosunda en az YDS 75 puana karşılık gelen bir belge kabul edilir.",
        detail: ["Belgelerin asılları kayıt süresi içinde Öğrenci Destek Hizmetleri üzerinden iletilir. 2026-27 Öğrenci El Kitabı'ndaki asgari puanlar: YDS / e-YDS 75, YÖKDİL 75, e-TEP 66, TOEFL iBT 90, PTE Academic 75, CAE A, CPE C. TOEFL iBT ve PTE Academic Türkiye'de alındıysa sınav merkezinin devlet üniversitesi olması gerekir."],
      },
    ],
    caveat: null,
    edits: {
      "Beykent Hazırlık Atlama Sınavı, dilbilgisi, okuma-anlama, dinleme-anlama ve yazılı ve/veya sözlü ifade bölümlerinden oluşmaktadır. Öğrencilerin akademik düzeyde okuma, yazma, konuşma, dinleme ve dilbilgisi becerilerini ölçen bir sınavdır.":
        "Beykent Hazırlık Atlama Sınavı (BULET), okuma, dinleme, yazma, konuşma, dil bilgisi ve kelime bilgisi bölümlerinden oluşmaktadır. Öğrencilerin akademik düzeyde okuma, yazma, konuşma, dinleme, dil bilgisi ve kelime bilgisi becerilerini ölçen bir sınavdır.",
    },
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
        detail: ["Hazırlık öğrencilerinden güz dönemi not ortalaması şartını sağlayanlar Ocak ayında yeterlilik sınavına girebilir; yıl sonunda ise Hazırlık Sınıfı Yılsonu Bitirme Sınavı yapılır ve başarı, yıl içi notlarla birlikte hesaplanan yılsonu başarı notuna göre belirlenir."],
      },
      {
        question: "TOEFL ya da PTE ile hazırlıktan muaf olunur mu?",
        answer: "Evet; çoğu bölüm için TOEFL iBT 72, PTE 55 ya da YDS / YÖKDİL 60 yeterlidir.",
        detail: [
          "Tıp ve Psikoloji gibi bölümlerde ve İngilizce Öğretmenliği'nde daha yüksek puan istenir. Belgeler yeterlik sınavından önce teslim edilmelidir.",
        ],
      },
    ],
    caveat: null,
    source: "maltepe.edu.tr",
    checked: CHECKED,
  },

  /* Okan — yeniden doğrulama 30.09.2026 (müşteri kararı: "Yenilerini güncelle"):
   *   - Yönerge YG.OKN.064 Rev.04 (Senato 30.04.2025), okan.edu.tr/uploads/pages/istanbul-okan-universitesi-yonergeleri/
   *     ygokn064-yabanci-diller-koordinatorlugu-egitim-usul-ve-esaslari-yonergesi-rev04-25062025.pdf — Md. 26/2:
   *     "Eğitim dili %100 İngilizce Programlar için 80, … %30 İngilizce Programlar için 60"; Md. 21/2: "yılda üç dönem";
   *     EK 1 (%100 İngilizce): YDS / e-YDS 75 · TOEFL iBT 72 · PTE Academic 67. (İngilizce PACE sayfasındaki ve eski
   *     SSS'lerdeki TOEFL 79 eski değer — 2026-09-28'de yanlışlıkla 79 yazılmıştı, düzeltildi.)
   *   - İşleyiş sayfası okan.edu.tr/sayfa/5044: "OPAE yeterlilik sınavının geçme notu 80'dir (B2 seviyesi)", ALAT 70+,
   *     "sınav tarihinden geriye doğru iki takvim yılı içinde". PACE sayfası okan.edu.tr/sayfa/7674 (içerik 2021-22):
   *     "OPAE consists of four parts (Listening, Reading, Writing, and speaking)", "held three times per academic year".
   *   - Resmi örnek sınav okan.edu.tr/sayfa/9049 (dosya 15.09.2025): "Listening : 10 questions / 15 points",
   *     "Reading Part 1 : 10 questions / 10 points", "Reading Part 2 : 10 questions / 10 points", "Use of English :
   *     20 questions / 20 points", "Writing : Paragraph / 15 points", "Speaking : Direct Question / 30 points".
   *   - Duyuru 21.08.2026 (okan.edu.tr/duyuru/13868): yazılı oturum ve konuşma sınavı ayrı günlerde.
   *   - "IELTS is not accepted in Turkey" (okan.edu.tr/en/internationalstudents/page/7164).
   * Kaynak metin (100 soru, %80 / %20, 165 dk, Mütercim-Tercümanlık 70 / diğer 60, "PART I: Structure 50 soru") sınavın
   * eski biçimi → `edits`. Bölüm yapısı üç resmi kaynakta farklı anlatılıyor (örnek sınav "Use of English" de sayıyor);
   * süre ve dil bölümlerine özel geçme notu resmi sitede YOK → yazılmadı (docs/bekleyen-sorular.md). */
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
        answer: "Evet; tamamı İngilizce programlar için TOEFL iBT 72, PTE Academic 67 ya da YDS 75 kabul edilir.",
        detail: ["Belgenin sınav tarihinden geriye doğru iki takvim yılı içinde alınmış olması gerekir. IELTS kabul edilmez."],
      },
    ],
    caveat: null,
    edits: {
      "Sınavda 100 adet çoktan seçmeli soru ile yazma bölümü olacaktır. Çoktan seçmeli sorular Dil yapısını, Kelime bilgisini, Dinleme ve Okuduğunu anlamayı ölçmeye yöneliktir ve sınavın %80’ini; yazma ise %20’sini oluşturmaktadır. Sınav geçme notu Mütercimtercümanlık öğrencileri için 70, diğer bölüm öğrencileri için 60’dır. Sınav süresi 165 dakikadır.":
        "Okan Üniversitesi'nin İngilizce yeterlik sınavı OPAE dinleme, okuma, yazma ve konuşma becerilerini ölçer; yazılı oturum ile konuşma sınavı ayrı günlerde yapılır. Üniversitenin yayımladığı örnek sınavda dinleme 10 soru (15 puan), okuma 20 soru (20 puan), dil kullanımı 20 soru (20 puan), yazma bir paragraf (15 puan) ve konuşma (30 puan) yer alır. Geçme notu eğitim dili tamamen İngilizce olan programlarda 80, %30 İngilizce olan programlarda 60'tır.",
      // Eski biçimin "PART I" bölümü; bugünkü sınavda bu adla bir bölüm yok (dil kullanımı yukarıdaki satırda).
      "PART I: STRUCTURE (1-50) – Dil yapısı: Toplam 50 adet çoktan seçmeli sorudan oluşmaktadır.": null,
    },
    source: "okan.edu.tr",
    checked: CHECKED,
  },

  /* Bahçeşehir — Hazırlık programı sayfası (bau.edu.tr/icerik/11503-ingilizce-hazirlik-programi-bau-prep; çıplak /icerik/4187 ESKİ içeriği gösteriyor), SSS (icerik/13551), örnek sınav
   * PDF'i (28.07.2026): yazılı 170 dk (kelime 10 + okuma/dil kullanımı 35 soru → 70 dk, dinleme 15 soru
   * 30 dk, yazma 300-350 kelime 70 dk), sözlü 4-6 dk; geçme 60 / 70 / 80; "Eylül, Ocak, Mayıs ve Temmuz
   * aylarında … 4 (dört) kez"; TOEFL iBT 72 · PTE 55 · YDS/YÖKDİL 60 (lisans). Yazılı / sözlü ağırlığı
   * TR ve EN sayfada çelişiyor (%20 / %25) → yazılmadı. Kaynak metindeki geçme oranları eskimiş.
   *
   * KAYNAK METİN GÜNCELLEMESİ (müşteri kararı 2026-09-30: "Yenilerini güncelle"; yeniden doğrulama 30.09.2026) — `edits`:
   * [A] Hazırlık Okulu Sıkça Sorulan Sorular (YDYO resmi SSS sayfası) —
   * https://bau.edu.tr/icerik/13551-hazirlik-okulu-sikca-sorulan-sorular (tarihsiz (30.09.2026'da açıldı))
   * [B] İngilizce Hazırlık Programı (BAU PREP) — YDYO menüsündeki güncel program sayfası —
   * https://bau.edu.tr/icerik/11503-ingilizce-hazirlik-programi-bau-prep (tarihsiz (30.09.2026'da açıldı))
   * [E] BAU PREP Öğrenci El Kitabı 2025–2026 (PDF, 70 sayfa; bau.edu.tr/icerik/12106-ogrenci-el-kitabi sayfasından
   * bağlantılı, 2026-27 sürümü henüz yayımlanmamış) —
   * https://cdn.bau.edu.tr/content/b9tj72k8ta6uf-BAU%20PREP%20%C3%96%C4%9Frenci%20El%20Kitab%C4%B1%20(25-26).pdf
   * (05.01.2026 (PDF oluşturma tarihi); sunucu Last-Modified 15.05.2026)
   * [G] İngilizce Hazırlık Programı — ESKİ sayfa (yalnız çıplak kimlikle açılıyor; slug'lı adresi 301 ile B
   * kaynağına yönleniyor, menüde bağlantısı yok) — https://bau.edu.tr/icerik/4187 (tarihsiz; B'den eski (yerine B
   * konmuş))
   * - Genel lisans barajı 60 aynı; ikinci cümle eskimiş. Bugün üç kademe var: 60 / 70 (Eczacılık, Diş Hekimliği) /
   * 80 (İngilizce Öğretmenliği, Mütercim ve Tercümanlık, Tıp). 'Amerikan Kültürü ve Edebiyatı' güncel kaynakların
   * hiçbirinde geçmiyor. DİKKAT: eski metnin birebir aynısı (60 / AKE + İng. Öğr. 80) hâlâ canlı duran eski sayfada
   * (G, İngilizcesi I) yazıyor; ancak bu sayfanın slug'lı adresi 301 ile güncel sayfaya (B) yönleniyor ve menüde
   * bağlantısı yok. SSS (A), güncel program sayfası (B), İngilizce SSS (H) ve 2025-26 el kitabı (E) birbirini
   * tutuyor → G/I eski kabul edildi. Kurala göre çelişkiyi 'CELISKILI' saymak isterseniz: daha yeni olan A/B/E/H
   * tarafıdır. "Lisans öğrencileri ve dikey geçiş düşünen ön lisans (MYO) öğrencilerinin İngilizce Yeterlik
   * Sınavından geçmeleri için 100 (yüz) üzerinden en az 60 (altmış) puan almaları " [A] */
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
        detail: ["Eczacılık ve Diş Hekimliği'nde TOEFL iBT 85, PTE Academic 71, YDS / YÖKDİL 70; Tıp, İngilizce Öğretmenliği ve Mütercim ve Tercümanlık'ta TOEFL iBT 96, PTE Academic 78, YDS / YÖKDİL 80 aranır. TOEFL ve PTE sonuçları 2 yıl geçerlidir; TOEFL Home Edition ve PTE Academic Online kabul edilmez. Sonuçların akademik yıl başlamadan teslim edilmesi gerekir."],
      },
    ],
    caveat: null,
    edits: {
      // Kurs tanıtımındaki sınav bölümleri bugünkü sınava göre (kullanıcı 2026-10-01: "eksik / yanlış bilgi varsa düzenle"); bölümler bu kaydın `parts`ında, kaynak yukarıda.
      "Bahçeşehir Üniversitesi Proficiency sınavı formatına yönelik teknikler ve katılımcıların muafiyet sınavının reading, writing ve listening bölümlerinden maksimum düzeyde skor almaları hedeflenmektedir.":
        "Bahçeşehir Üniversitesi Proficiency sınavı formatına yönelik teknikler ve katılımcıların muafiyet sınavının vocabulary, reading, use of English, listening, writing ve speaking (sözlü sınav) bölümlerinden maksimum düzeyde skor almaları hedeflenmektedir.",
      "Öğrencilerin İngilizce yeterlik sınavında başarılı olup hazırlık programından muaf olabilmeleri için yeterlik sınavından en az %60 puanlık başarı göstermeleri gerekmektedir. Bu oran Amerikan Kültürü ve Edebiyatı ile İngilizce Öğretmenliği öğrencileri için %80 olarak belirlenmiştir.":
        "Öğrencilerin İngilizce yeterlik sınavında başarılı olup hazırlık programından muaf olabilmeleri için yeterlik sınavından 100 üzerinden en az 60 puan almaları gerekmektedir. Bu puan Eczacılık ve Diş Hekimliği Fakültesi öğrencileri için 70; İngilizce Öğretmenliği, Mütercim ve Tercümanlık ve Tıp Fakültesi öğrencileri için 80 olarak belirlenmiştir.",
    },
    source: "bau.edu.tr",
    checked: CHECKED,
  },

  /* ODTÜ — METU EPE "Test Content and Scoring — October 2025" (dil.metu.edu.tr/epe), SSS (10-2025),
   * denklik tablosu (oidb.metu.edu.tr, 31.08.2026): iki gün / iki oturum; dinleme 16 madde 24 puan
   * ~25 dk, okuma 24 madde 32 puan 60 dk, not alma 6 madde 9 puan ~15 dk, yazma ~220 kelime 20 puan
   * 35 dk, konuşma 15 puan ~8 dk; muafiyet 60 (lisans) / 65 (SUNY) / 70 (Yabancı Dil Eğitimi); yılda
   * altı kez; TOEFL iBT 75 · PTE 65, 2 yıl. Kaynak metin (4 bölüm, 2 oturum aynı gün) eskimiş.
   *
   * KAYNAK METİN GÜNCELLEMESİ (müşteri kararı 2026-09-30: "Yenilerini güncelle"; yeniden doğrulama 30.09.2026) — `edits`:
   * [A] METU-SFL English Proficiency Examination – A Guide for Test-takers (İYS Kitapçığı -- Ekim 2025), ODTÜ YDYO,
   * 64 s. PDF — https://dil.metu.edu.tr/epe/Tr/2100-01-07-%C4%B0YS%20Kitapcigi%20--%20Ekim%202025.pdf (Ekim 2025
   * (PDF 23.10.2025))
   * [B] İYS Sıkça Sorulan Sorular (10-2025), ODTÜ YDYO PDF —
   * https://dil.metu.edu.tr/epe/Tr/2100-01-01-%20%C4%B0YS%20S%C4%B1k%C3%A7a%20Sorulan%20Sorular%20%2810-2025%29.pdf
   * (23.10.2025)
   * [C] Sınav İçeriği ve Puanlama -- Ekim 2025 (Test Content and Scoring infografiği), ODTÜ YDYO PDF —
   * https://dil.metu.edu.tr/epe/Tr/2100-01-08-S%C4%B1nav%20%C4%B0%C3%A7eri%C4%9Fi%20ve%20Puanlama%20--%20Ekim%202025.pdf
   * (13.11.2025)
   * [D] ODTÜ | İngilizce Yeterlik Sınavı ana sayfası – güncel duyuru (05-06 Ekim 2026 İYS) ve belge listesi —
   * https://epe.metu.edu.tr/ (duyuru: https://epe.metu.edu.tr/_announcements.php, belgeler:
   * https://epe.metu.edu.tr/_documents.php) (tarihsiz; 30.09.2026'da okundu, 05-06 Ekim 2026 sınavını duyuruyor)
   * - Oturumlar artık aynı günün sabah/öğleden sonrası değil, ardışık iki günde; bölüm sayısı 4 değil 5 (Dinleme,
   * Okuma, Not Alma, Bağımsız Yazma, Konuşma). Güncel duyuru (05-06 Ekim 2026) aynı düzeni uyguluyor. "Sınav 2
   * ardışık günde, 2 oturumda gerçekleşecektir:" [B]
   * - İlk oturum artık 2 değil 4 bölüm; 60 soru / 30+30 puan yerine dinleme 16 soru-24 puan, okuma 24 soru-32 puan
   * (20 anlama ×1,5 + 4 kelime ×0,5), not alma 6 soru-9 puan, yazma 1 görev-20 puan. "The first session lasts
   * approximately 135 minutes and includes the Listening Comprehension, Careful Reading, Note-taking, and
   * Independent Writing parts." [A]
   * - Süre yaklaşık 120 değil yaklaşık 135 dakika (dinleme ~25, okuma 60, not alma ~15, yazma 35). Oturum saat
   * 10.00'da başlıyor. "1. gün – 1. Oturum: yaklaşık 135 dakika" [B]
   * - Güncel sınavda Dilin Kullanımı bölümü yok; Not Alma (9 puan) ve Yazma (20 puan) ilk oturuma alınmış ve ayrı
   * bölümler. İkinci oturum yalnız Konuşma: 5 soru, 15 puan. "The second session includes the Speaking part and it
   * lasts about 8 minutes." [A]
   * - İkinci oturum artık yaklaşık 120 dakika değil, aday başına yaklaşık 8 dakikalık konuşma sınavı; saati bir gün
   * önce 16.00'ya kadar ilan ediliyor (öğleden sonra olduğu yazmıyor). "2. gün – 2. oturum: yaklaşık 8 dakika" [B] */
  "ortadogu-teknik-universitesi": {
    exam: "METU EPE",
    parts: [
      { name: "Dinleme", note: "16 soru · ~25 dk", weight: 24, weightLabel: "24 puan" },
      { name: "Okuma", note: "24 soru · 60 dk", weight: 32, weightLabel: "32 puan" },
      { name: "Not alma", note: "6 soru · ~15 dk", weight: 9, weightLabel: "9 puan" },
      { name: "Yazma", note: "~220 kelime · 35 dk", weight: 20, weightLabel: "20 puan" },
      { name: "Konuşma", note: "2. gün · 5 soru · ~8 dk", weight: 15, weightLabel: "15 puan" },
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
          "Birinci günkü yaklaşık 135 dakikalık oturumda dinleme, okuma, not alma ve yazma bölümleri yer alır; ikinci gün görüşmecinin sorduğu 5 soruya yanıt verilen yaklaşık 8 dakikalık konuşma sınavı yapılır.",
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
        detail: ["Yabancı Diller Eğitimi Bölümü'nde (İngilizce Öğretmenliği) 70, SUNY ortak lisans programlarında 65 aranır; 59,50 ve üzeri puan 60'a yuvarlanır."],
      },
      {
        question: "TOEFL ya da PTE ile hazırlıktan muaf olunur mu?",
        answer: "Evet; lisans programları için TOEFL iBT 75 ya da PTE Academic 65 yeterlidir.",
        detail: ["Sonuçlar 2 yıl geçerlidir; sınav Türkiye'de alınmışsa devlet üniversitesi binasında yapılmış olmalıdır. PTE Academic için 65 puan 12.11.2024 sonrasında girilen sınavlarda geçerlidir (öncesi için 55). 21 Ocak 2026'dan sonraki TOEFL iBT belgelerinde 120 üzerinden puan esas alınır."],
      },
      {
        question: "Sınav ne zaman yapılır?",
        answer: "ODTÜ İngilizce Yeterlik Sınavı yıl içinde birden çok kez, akademik takvimde ilan edilen tarihlerde yapılır.",
        detail: ["Her sınav belirli aday grupları içindir; kimlerin girebileceği ve başvuru tarihleri ODTÜ akademik takviminde, sınav yerleri sınavdan bir gün önce epe.metu.edu.tr'de duyurulur."],
      },
    ],
    caveat: null,
    edits: {
      // Kurs tanıtımındaki sınav bölümleri bugünkü sınava göre (kullanıcı 2026-10-01: "eksik / yanlış bilgi varsa düzenle"); bölümler bu kaydın `parts`ında, kaynak yukarıda.
      "Orta Doğu Teknik Üniversitesi Proficiency sınavı formatına yönelik teknikler ve katılımcıların muafiyet sınavının reading, writing ve listening bölümlerinden maksimum düzeyde skor almaları hedeflenmektedir.":
        "Orta Doğu Teknik Üniversitesi Proficiency sınavı formatına yönelik teknikler ve katılımcıların muafiyet sınavının listening, reading, note-taking, writing ve speaking bölümlerinden maksimum düzeyde skor almaları hedeflenmektedir.",
      "ODTÜ Hazırlık atlama sınavı sabah ve öğleden sonra olmak üzere 2 oturum şeklindedir. Sınav toplam dört bölümden oluşmaktadır.":
        "ODTÜ Hazırlık atlama sınavı art arda iki günde olmak üzere 2 oturum şeklindedir. Sınav toplam beş bölümden oluşmaktadır.",
      "Sınavın birinci sabah oturumu çoktan seçmeli 60 sorudan oluşmakta ve 2 bölüm içermektedir. Dinlediğini Anlama bölümü toplam 30 soru 30 puan değerinde, Okuma bölümü toplam 30 soru 30 puan değerindedir.":
        "Sınavın birinci gün yapılan ilk oturumu 4 bölüm içermektedir. Dinlediğini Anlama bölümü çoktan seçmeli toplam 16 soru 24 puan değerinde, Okuma bölümü çoktan seçmeli toplam 24 soru 32 puan değerinde, Not Alma bölümü çoktan seçmeli toplam 6 soru 9 puan değerinde, Yazma bölümü ise tek görev olup 20 puan değerindedir.",
      "Sınavın birinci bölümü olan sabah oturumunun süresi yaklaşık 120 dakikadır.":
        "Sınavın birinci gün yapılan ilk oturumunun süresi yaklaşık 135 dakikadır.",
      "Sınavın öğleden sonra oturumu 2 bölüm içermektedir. Birinci bölüm Dilin Kullanımı 20 puan değerinde, İkinci bölüm Not Tutma ve Yazma 20 puan değerindedir.":
        "Sınavın ikinci gün yapılan ikinci oturumu tek bölüm içermektedir. Konuşma bölümü toplam 5 soru olup 15 puan değerindedir.",
      "Sınavın ikinci bölümü olan öğleden sonra oturumunun süresi yaklaşık 120 dakikadır.":
        "Sınavın ikinci gün yapılan ikinci oturumunun süresi yaklaşık 8 dakikadır; her adaya 15 dakikalık bir zaman dilimi atanır.",
    },
    source: "metu.edu.tr",
    checked: CHECKED,
  },

  /* Bilgi — bilgi.edu.tr "İngilizce Dil Sınavı", "BİLET 2. Aşama", muafiyet şartları, SSS; 2026-2027
   * Hazırlık Programı kitapçığı (17.08.2026): 1. Aşama "20 okuma, 30 dilbilgisi sorusu ve iki kısa
   * paragraf yazma", 2. Aşama "Konuşma (%30), Okuma (%35), ve Yazma (%35)", konuşma 4-5 dk, ~350 kelime
   * kompozisyon, 2. Aşama için "70 üzerinden 45", muafiyet "60 ve üstü"; son 2 yıl: TOEFL iBT 4.5 ·
   * PTE 60 · YDS/YÖKDİL 65. Kaynak metin dinleme bölümü sayıyor → eskimiş.
   *
   * KAYNAK METİN GÜNCELLEMESİ (müşteri kararı 2026-09-30: "Yenilerini güncelle"; yeniden doğrulama 30.09.2026) — `edits`:
   * [A] İngilizce Hazırlık Programı › BİLET › 2. Aşama - Hazırlık Muafiyet Sınavı (web sayfası) —
   * https://www.bilgi.edu.tr/tr/akademik/ingilizce-hazirlik-programi/bilet/2-asama-hazirlik-muafiyet-sinavi/
   * (tarihsiz (2026-09-30 tarihinde açılıp okundu))
   * [B] İngilizce Hazırlık Programı › BİLET › Genel Bilgi (web sayfası) —
   * https://www.bilgi.edu.tr/tr/akademik/ingilizce-hazirlik-programi/bilet/genel-bilgi/ (tarihsiz (2026-09-30
   * tarihinde açılıp okundu))
   * [E] İngilizce Hazırlık Programı — Öğrenci El Kitabı 2026–2027 (resmi PDF, 38 sayfa) —
   * https://www.bilgi.edu.tr/media/uploads/2026/09/22/bilgielp-student-handbook-2026-27_turkce.pdf (22.09.2026 (PDF
   * son değişiklik ve yükleme tarihi))
   * [F] İngilizce Hazırlık Programı 2026-2027 kitapçığı (resmi PDF, 12 sayfa; metin katmanı yok — alıntılar sayfa
   * görüntüsünden okunarak aktarıldı) —
   * https://www.bilgi.edu.tr/media/uploads/2026/08/17/bilgi-ingilizcehazirlikprogrami-kitapcik-2026-2027.pdf
   * (05.08.2026 (PDF üretim) / 17.08.2026 (yükleme))
   * [G] Akademik Takvim — İngilizce Hazırlık Programı 2026-2027 (resmi takvim verisi; sayfa:
   * bilgi.edu.tr/tr/yasam/ogrenci/akademik-takvim/?type=elp#!?year=2026&type=ELS) —
   * https://tools.bilgi.edu.tr/api/academic-calendar/2026/ELS/ (2026-2027 akademik yılı)
   * - (1) Dinleme bölümü artık yok: resmi kaynaklar sınavı üç bölüm (Konuşma %30, Okuma %35, Yazma %35) olarak
   * tanımlıyor. (2) Gün sırası tersine dönmüş: 2026-2027 takviminde önce yazılı sınav (14 Eylül), ertesi gün konuşma
   * sınavı (15 Eylül) var; 2024-25 ve 2025-26 takvimlerinde de sıra aynıydı. Resmi metin "yazılı sınav"ın hangi
   * bölümleri kapsadığını ayrıca yazmadığı için yeni cümlede "okuma ve yazma" yerine takvimdeki "yazılı sınav"
   * ifadesi kullanıldı. "BİLET 2. Aşama, iki güne yayılmış olan ve öğrencilerin konuşma, okuma ve yazma becerilerini
   * ölçen bir yeterlilik sınavıdır." [B] */
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
    caveat: null,
    edits: {
      "BİLET 2. Aşama, iki güne yayılmış olan ve öğrencilerin konuşma, okuma, dinleme ve yazma becerilerini ölçen bir yeterlilik sınavıdır. Sınavın birinci gününde konuşma becerisi, ikinci gününde ise okuma, dinleme ve yazma becerileri test edilir.":
        "BİLET 2. Aşama, iki güne yayılmış olan ve öğrencilerin konuşma, okuma ve yazma becerilerini ölçen bir yeterlilik sınavıdır. Sınavın birinci gününde yazılı sınav, ikinci gününde ise konuşma sınavı yapılır.",
    },
    source: "bilgi.edu.tr",
    checked: CHECKED,
  },

  /* YTÜ — ybd.yildiz.edu.tr "Temel İngilizce / TİB öğrencileri için" (İngilizce Yeterlik Sınavı
   * Hakkında), SSS, sample-epe-writing.pdf (Aralık 2025, "Duration: 50 minutes"): Use of English &
   * Reading %60 (10 cloze + 10 closest meaning + 7 + 7 okuma + 6 paragraf tamamlama), Listening %20
   * (6 + 7 not alma), Writing %20 (4 konudan biri, en az 250 kelime); muafiyet 60, İleri İngilizce 70,
   * İngilizce Öğretmenliği 85; Eylül, Ocak, Haziran; TOEFL iBT 72 · PTE 55 · YDS 60. "1. aşama 50
   * üzerinden 25" eşiği bölüm puanlarıyla çelişiyor → yazılmadı. Kaynak metin (6 bölüm) eskimiş.
   *
   * KAYNAK METİN GÜNCELLEMESİ (müşteri kararı 2026-09-30: "Yenilerini güncelle"; yeniden doğrulama 30.09.2026) — `edits`:
   * [A] YTÜ YDYO – Temel İngilizce – TİB Öğrencileri İçin ("İngilizce Yeterlik Sınavı Hakkında" ve "Temel İngilizce
   * Bölümü Muafiyet Koşulları" başlıkları) — https://ybd.yildiz.edu.tr/temel-ingilizce/tib-ogrencileri-icin
   * (tarihsiz (2026-09-30'da okundu))
   * [C] YTÜ Yabancı Diller Yüksekokulu Öğretim ve Sınav Yönergesi (YÖ-010, Revizyon No:12; sitede 'GÜNCEL' olarak
   * listeleniyor) —
   * https://ybd.yildiz.edu.tr/sites/ybd.yildiz.edu.tr/files/ytu-ydyo-ogretim-ve-sinav-yonergesi-05.08.2026.pdf
   * (05.08.2026 (Senato 2026/07-17))
   * [D] Sample EPE Writing & Essay Writing Criteria (sample-epe-writing.pdf) —
   * https://ybd.yildiz.edu.tr/sites/ybd.yildiz.edu.tr/files/sample-epe-writing.pdf (PDF oluşturma tarihi 25.12.2025)
   * [E] Sample Proficiency Exam – Use of English & Reading (Session I) (session-i-sample-epe.pdf) —
   * https://ybd.yildiz.edu.tr/sites/ybd.yildiz.edu.tr/files/session-i-sample-epe.pdf (PDF oluşturma tarihi
   * 29.12.2025)
   * [G] Sample Proficiency Exam – Note-Taking Questions (Session II) —
   * https://ybd.yildiz.edu.tr/sites/ybd.yildiz.edu.tr/files/note-taking-questions-session-ii-sample-epe.pdf (PDF
   * oluşturma tarihi 29.12.2025)
   * - Resmi sayfa sınavı 6 değil 3 bölüm olarak tanımlıyor (Use of English & Reading, Listening, Writing); sınav iki
   * aşamada uygulanıyor. Eski metindeki altı 'bölüm' bugün bu üç bölümün alt kısımları. "1. İNGİLİZCENİN KULLANIMI &
   * OKUMA (READING & USE OF ENGLISH)" [A]
   * - Bugün 3 değil tek bir cloze metni var (10 soru); test yalnız dilbilgisini değil kelime bilgisini de ölçüyor
   * ('Grammar & Vocabulary Cloze Test'). Örnek sınavda da tek metin, 10 soru. "10 soruluk çoktan seçmeli bir boşluk
   * doldurma testi ve 10 adet anlamca en yakın cümleyi bulma sorusundan oluşur." [A]
   * - İçerik bugün de doğru (2 okuma metni, aynı beceriler); yalnız 'İkinci bölüm' numaralaması geçersiz: okuma
   * metinleri artık ayrı bir bölüm değil, ilk bölümün (Use of English & Reading) üçüncü kısmı. Soru sayısı (7+7)
   * eklendi. "İki farklı metnin olduğu bu bölümde her bir metinle ilgili yedi çoktan seçmeli soru sorulmaktadır."
   * [A]
   * - İçerik bugün de doğru; yalnız 'Üçüncü bölüm' numaralaması geçersiz: Closest Meaning artık ilk bölümün ikinci
   * kısmı (cloze testten hemen sonra, okuma metinlerinden önce). Soru sayısı (10) eklendi. "Anlamca En Yakın Cümleyi
   * Bulma (Closest Meaning): İngilizcenin Kullanımı bölümünün ikinci bölümü olan bu kısımda 10 soru bulunmaktadır.
   * Öğrencilerin verilen cümleye en ya" [A]
   * - İçerik bugün de doğru; yalnız 'Dördüncü bölüm' numaralaması geçersiz: Paragraph Completion artık okuma
   * bölümünün bir parçası. Soru sayısı (6) eklendi. "Okuma bölümünün bir parçası olan ve yine okuma ve okuduğunu
   * anlama becerisini ölçen 6 adet çoktan seçmeli paragraf tamamlama sorusundan oluşmaktadır." [A]
   * - Dinleme artık beşinci değil ikinci bölüm ve iki parçanın yalnız biri dinleme esnasında cevaplanıyor; ikincisi
   * not alma (note-taking): soru kâğıdı dinlemeden sonra dağıtılıyor. "Dinleme bölümü, dinlerken cevaplama ve not
   * aldıktan sonra cevaplama olarak iki ana bölümden oluşmaktadır. Toplam 13 sorunun bulunduğu dinleme bölümünün
   * İngilizce Yeterlil" [A]
   * - Yazma artık altıncı değil üçüncü bölüm; 2 değil 4 konu veriliyor; 'For & Against Essay' türü yok, yerine
   * cause, effect ve comparison & contrast türleri var; en az 250 kelime şartı eklendi. "Öğrencilere, bu kompozisyon
   * türlerinin her birinden birer adet olmak üzere toplam dört konu sunulmaktadır ve öğrencilerin bu konulardan
   * yalnızca birini seçerek kompozisyo" [A] */
  "yildiz-teknik-universitesi": {
    exam: "İYS (EPE)",
    parts: [
      { name: "Dil kullanımı ve okuma", note: "40 soru · 85 dk", weight: null, weightLabel: null },
      { name: "Dinleme", note: "13 soru · not alma", weight: null, weightLabel: null },
      { name: "Yazma", note: "250+ kelime · 50 dk", weight: null, weightLabel: null },
    ],
    facts: [
      { value: "60", label: "muafiyet notu" },
      { value: "3", label: "ana bölüm" },
      { value: "3", label: "dönem: güz başı, güz sonu, bahar sonu" },
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
        answer: "İYS iki aşamada yapılır; Eylül'de aşamalar ayrı günlerde uygulanır.",
        detail: ["Birinci aşama dil kullanımı ve okuma bölümlerini, ikinci aşama dinleme ve yazma bölümlerini kapsar; toplam puan 100 üzerinden hesaplanır. Eylül'deki sınavda ikinci aşamaya yalnız birinci aşamada barajı geçen öğrenciler alınır; beklemeli öğrencilerde ve diğer dönemlerdeki sınavlarda bu baraj aranmaz."],
      },
      {
        question: "YTÜ hazırlık atlama için geçme notu kaç?",
        answer: "İYS'den 100 üzerinden en az 60 alan öğrenciler zorunlu hazırlıktan muaf olur.",
        detail: ["İleri İngilizce I ve II derslerinden muafiyet için 70, İngilizce Öğretmenliği programında hazırlık muafiyeti için 85 gerekir."],
      },
      {
        question: "TOEFL ya da PTE ile muafiyet mümkün mü?",
        answer: "Evet; YDS / YÖKDİL 60, TOEFL iBT 72 ya da PTE Akademik 55 ile hazırlıktan muaf olunabilir.",
        detail: ["TOEFL ve PTE sonuçları 2 yıl, YDS ve YÖKDİL 5 yıl geçerlidir; TOEFL iBT Home Edition kabul edilmez. Cambridge Linguaskill General 140, Oxford Test of English 106, Oxford Test of English Advanced 111 ve e-TEP 50 puan da kabul edilir; Türkiye'de girilen uluslararası sınavların devlet üniversitesi binalarında yapılmış olması gerekir."],
      },
      {
        question: "İYS ne zaman yapılır?",
        answer: "İYS her akademik yılda güz yarıyılı başında, güz yarıyılı sonunda ve bahar yarıyılı sonunda olmak üzere üç kez yapılır; 2026-27 takviminde bu tarihler 8-10 Eylül 2026, 12 Ocak 2027 ve 24 Mayıs 2027'dir.",
        detail: ["Güz sonundaki sınava devam koşulunu sağlayıp P3 veya P4 programını başarıyla tamamlayan öğrenciler, bahar sonundaki sınava ise kayıtlı olduğu hazırlık programını ya da tamamlama programını başarıyla tamamlayan öğrenciler girebilir; beklemeli öğrenciler her iki sınava da girebilir."],
      },
    ],
    caveat: null,
    edits: {
      "YTÜ Yabancı Diller Yüksekokulu İngilizce Yeterlilik Sınavı (İYS) 6 bölümden oluşmaktadır.":
        "YTÜ Yabancı Diller Yüksekokulu İngilizce Yeterlik Sınavı (İYS) 3 ana bölümden oluşmaktadır: İngilizcenin kullanımı ve okuma, dinleme ve yazma.",
      "Birinci bölümde öğrencilerin dilbilgisi konusundaki yeterliklerini ölçmek için hazırlanmış olan çoktan seçmeli sorulardan oluşan 3 adet Cloze Test şeklindedir.":
        "İngilizcenin kullanımı bölümünün ilk kısmı, öğrencilerin dilbilgisi ve kelime bilgisi konusundaki yeterliklerini ölçmek için hazırlanmış olan 10 çoktan seçmeli sorudan oluşan 1 adet Cloze Test şeklindedir.",
      "İkinci bölüm 2 adet Reading parçasından oluşmaktadır. Bu bölümde öğrencilerin okuduğunu anlama, yorumlama ve sözcüklerin anlamını çıkarma becerileri ölçülür.":
        "Okuma kısmı 2 adet Reading parçasından oluşmaktadır ve her parçayla ilgili 7 çoktan seçmeli soru sorulur. Bu kısımda öğrencilerin okuduğunu anlama, yorumlama ve sözcüklerin anlamını çıkarma becerileri ölçülür.",
      "Üçüncü bölüm yakın anlamlı cümleyi bulma sorularından oluşur. Bu bölümde öğrencilerin soruda verilen cümleye anlamca en yakın olanını bulmaları istenir.":
        "İngilizcenin kullanımı bölümünün ikinci kısmı 10 adet yakın anlamlı cümleyi bulma sorusundan oluşur. Bu kısımda öğrencilerin soruda verilen cümleye anlamca en yakın olanını bulmaları istenir.",
      "Dördüncü bölüm verilen bir paragraftaki eksikliği uygun şekilde tamamlayan cümleyi bulma sorularından oluşmaktadır. Bu bölümde öğrencilerin verilen boşluğu seçeneklerden hangisinin dolduracağını temel okuma tekniklerini kullanarak bulmaları istenir.":
        "Okuma kısmının son parçası, verilen bir paragraftaki eksikliği uygun şekilde tamamlayan cümleyi bulma sorularından (6 soru) oluşmaktadır. Burada öğrencilerin verilen boşluğu seçeneklerden hangisinin dolduracağını temel okuma tekniklerini kullanarak bulmaları istenir.",
      "Beşinci bölüm Listening bölümüdür. Bu bölümde iki adet Listening parçası dinletilmektedir ve öğrencilerden verilen soruları dinleme esnasında cevaplamaları istenir.":
        "İkinci bölüm Listening bölümüdür. Bu bölümde iki adet Listening parçası dinletilmektedir; öğrencilerden ilk parçayla ilgili 6 soruyu dinleme esnasında, ikinci parçayla ilgili 7 soruyu ise dinlerken aldıkları notlara bakarak dinlemeden sonra cevaplamaları istenir.",
      "Altıncı ve son bölüm ise Writing bölümünden oluşmaktadır. Bu bölümde “Opinion Essay” ve “For & Against Essay” olmak üzere 2 faklı kompozisyon konusu verilir ve öğrencilerin aralarından 1 tanesini seçerek kompozisyon yazmaları istenir.":
        "Üçüncü ve son bölüm ise Writing bölümünden oluşmaktadır. Bu bölümde “Cause Essay”, “Effect Essay”, “Comparison & Contrast Essay” ve “Opinion Essay” olmak üzere 4 farklı kompozisyon konusu verilir ve öğrencilerin aralarından 1 tanesini seçerek en az 250 kelimelik bir kompozisyon yazmaları istenir.",
    },
    source: "yildiz.edu.tr",
    checked: CHECKED,
  },

  /* Kadir Has — khas.edu.tr "YDY KHAS İngilizce Seviye Tespit ve Yeterlilik Sınavı" (16.09.2026), 2026-27
   * öğrenci el kitabı, Proficiency Exam Strategies & Preparation Guide (2025): "okuma (%40), dinleme (%30)
   * ve yazma becerilerini (%30) ölçer", "toplamında 60 ve üzeri", "yılda dört kez"; yazma 250-300 kelime
   * (10 dk plan + 50 dk yazma); yeni TOEFL iBT 4 · PTE 59; en fazla 5 yıl. Kaynak metin (konuşma %15,
   * yılda 3 kez) eskimiş.
   *
   * KAYNAK METİN GÜNCELLEMESİ (müşteri kararı 2026-09-30: "Yenilerini güncelle"; yeniden doğrulama 30.09.2026) — `edits`:
   * [A] KHAS İngilizce Seviye Tespit ve Yeterlilik Sınavı (YDYO sayfası, TR) —
   * https://www.khas.edu.tr/ydy-khas-ingilizce-seviye-tespit-ve-yeterlilik-sinavi/ (2026-09-16 (sayfa son
   * güncelleme))
   * [B] Kadir Has Üniversitesi Yabancı Diller Yüksekokulu İngilizce Hazırlık Programı Yönergesi (9. sürüm; YDYO SSS
   * ve İHP sayfalarından bağlantılı güncel metin) —
   * https://my.khas.edu.tr/uploads/files/mevzuat/yabanci-diller-yuksekokulu-ingilizce-hazirlik-programi-yonergesi9.pdf
   * (son değişiklik Senato Kararı 12/03/2026-2026/04; PDF 2026-03-27)
   * [C] YDYO İngilizce Hazırlık Programı Öğrenci El Kitabı 2026-2027 (TR) —
   * https://www.khas.edu.tr/wp-content/uploads/2026/09/KHAS_YDYO_OgrenciElKitabi_2026_27_TURKCE-1.pdf (2026-09-11
   * (PDF))
   * [D] YDYO Sıkça Sorulan Sorular (TR) — https://www.khas.edu.tr/ydy-sikca-sorulan-sorular/ (2026-05-14 (sayfa son
   * güncelleme))
   * [E] Yabancı Diller Yüksekokulu İngilizce Hazırlık Programı Akademik Takvimi 2026-2027 (tablo: tarih + etkinlik)
   * — https://akademiktakvim.khas.edu.tr/sfl/2026-2027 (tarihsiz (2026-2027 takvimi))
   * [I] KHAS Level Placement and Proficiency Exam (KHAS-LPPE) (YDYO sayfası, EN) —
   * https://www.khas.edu.tr/en/ydy-khas-level-placement-and-proficiency-exam-khas-lppe/ (2026-09-16 (sayfa son
   * güncelleme))
   * [M] 2026-2027 Güz Yarıyılı İngilizce Seviye Tespit Sınavı – sınav programı (duyuru PDF'i) —
   * https://www.khas.edu.tr/wp-content/uploads/2026/08/13_6a9535ac2a52e1.pdf (2026-08-31)
   * [N] 2026–2027 Güz Yarıyılı İngilizce Yeterlilik Sınavı (duyuru) —
   * https://www.khas.edu.tr/2026-2027-guz-donemi-ingilizce-yeterlilik-sinavi/ (2026-08-28 (güncelleme 2026-08-31))
   * - Yılda 3 kez → 4 kez (yönerge Md. 5/1, Senato 19/06/2025). Bahar sonu sınavı Mayıs değil Haziran; ayrıca
   * Ağustos'ta yaz okulu sonu sınavı var (2025-26 takviminde de Ocak/Haziran/Ağustos). Bölüm sayısı 4 → 3 (konuşma
   * yok). Not: EN sayfa (I) hâlâ 'held at the beginning and end of the academic year' diyor; aynı gün güncellenen TR
   * sayfa, yönerge, el kitabı ve takvim 4 sınavı teyit ediyor, EN cümlesi güncellenmemiş çeviri. "Yeterlilik Sınavı
   * ise eğitim öğretim yılının başında, her yarıyılın ve yaz okulunun sonunda olmak üzere yılda dört kez yapılır."
   * [B]
   * - Okuma ağırlığı %30 → %40. "KHAS-İngilizce Yeterlilik Sınavı okuma (%40), dinleme (%30) ve yazma becerilerini
   * (%30) ölçer." [A]
   * - Dinleme ağırlığı %25 → %30. "KHAS-İngilizce Yeterlilik Sınavı okuma (%40), dinleme (%30) ve yazma becerilerini
   * (%30) ölçer." [A]
   * - Yeterlilik Sınavında artık konuşma bölümü yok; sınav yalnız okuma, dinleme ve yazmayı ölçüyor (ağırlıklar
   * toplamı %40+%30+%30=%100). "İngilizce Yeterlilik sınavı (YS) İngilizce okuma, dinleme ve yazma becerilerinin
   * yeterliliğini ölçer." [B]
   * - İçerik bugün de doğru (2026'da STS 8 Eylül, Yeterlilik 10 Eylül). Yalnız kısaltma eskimiş: yönergede KHAS-İYS
   * yerine KHAS-YS tanımlı, sınavın adı 'Yeterlilik Sınavı'. "h) (Değişik: Senato Kararı: 17/10/2024 - 2024/12)
   * KHAS-YS: Kadir Has Üniversitesi İngilizce Yeterlilik Sınavını ifade eder." [B]
   * - İçerik doğru; yalnız kısaltma KHAS-İYS → KHAS-YS (yönerge Md. 4/h). 11. satırla tutarlı olması için
   * değiştirildi. "h) (Değişik: Senato Kararı: 17/10/2024 - 2024/12) KHAS-YS: Kadir Has Üniversitesi İngilizce
   * Yeterlilik Sınavını ifade eder." [B]
   * - (1) 'En az B seviyesi' → Track 2/3/4 (orta, orta üstü, yüksek) ve düzeye özel not koşulu. (2) '%85 devam
   * şartı' kalktı: devam zorunluluğu %80 ve SSS'ye göre devamsızlık sınırı sınava girmeyi etkilemiyor, yalnız Yaz
   * Okulu hakkını etkiliyor. (3) Mayıs → Haziran; ayrıca Ağustos sınavı eklendi. (4) 'Kayıtlı öğrenci olma şartı'
   * tam doğru değil: kaydı silinen (2547/44-c) ve ikinci yılında kayıtsız kalan öğrenciler de girebiliyor. Düzeye
   * özel not aralıkları el kitabında şekil olarak veriliyor (metne rakam koymadım). "Güz ve Bahar Yarıyılı Hazırlık
   * Programına orta, orta üstü ve yüksek düzeylerde kayıtlı öğrencilerden bulundukları düzeyin özel yeterlilik
   * sınavına girme koşullarını yerin" [B]
   * DEĞİŞTİRİLMEDİ (doğrulanamadı / resmi kaynaklar çelişiyor — docs/bekleyen-sorular.md): Kayıt donduranların dönem
   * sonu sınavına giremeyeceği kuralı güncel kaynakların hiçbirinde açıkça geçmiyor: güncel yönergede (B) 'dondur'
   * kelimesi hiç ; Fakülte İngilizce derslerinden (EL 101-102-201-202) puana göre muafiyet 2019 yönergesindeki
   * tabloda vardı; güncel yönergedeki aynı tabloda (Tablo 1) y */
  "kadirhas-universitesi-hazirlik": {
    exam: "KHAS-LPPE",
    parts: [
      { name: "Okuma", note: "tarama + ayrıntılı okuma", weight: 40, weightLabel: "%40" },
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
    caveat: null,
    edits: {
      // Güncel yönergede (9. sürüm, Senato 12.03.2026) kayıt dondurma fıkrası ve puana göre ders muafiyeti tablosu YOK (2024 / 2019 sürümlerinde vardı) — kaldırılmış kurallar; tabloda yalnız harf notu–puan aralığı kaldı. Mayıs sınavı da bugün yok (Haziran / Ağustos).
      "Güz döneminde kayıt donduran öğrenciler Ocak ayında İngilizce Yeterlik Sınavı’na, Bahar döneminde kayıt donduranlar ise Mayıs ayında İngilizce Yeterlik Sınavı’ na giremezler.":
        null,
      "Öğrenciler İngilizce Yeterlik Sınavı başarı puanlarına göre bağlı bulundukları Fakülte / Bölümlerinin 1. ve 2. Sınıflarında alacakları Güz ve Bahar dönemi İngilizce derslerinden muafiyet alırlar.":
        "Öğrencilerin İngilizce Yeterlilik Sınavı başarı puanları harf notu olarak duyurulur (A+ 95-100, A 90-94, B 80-89, C 70-79, D 60-69); 100 üzerinden en az 60 puan alan öğrenciler kabul edildikleri lisans programlarına başlar.",
      // Kurs tanıtımındaki sınav bölümleri bugünkü sınava göre (kullanıcı 2026-10-01: "eksik / yanlış bilgi varsa düzenle"); bölümler bu kaydın `parts`ında, kaynak yukarıda. Kadir Has sınavında bugün konuşma bölümü yok.
      "Kadir Has Proficiency sınavı formatına yönelik teknikler ve katılımcıların muafiyet sınavının reading, writing, speaking ve listening bölümlerinden maksimum düzeyde skor almaları hedeflenmektedir.":
        "Kadir Has Proficiency sınavı formatına yönelik teknikler ve katılımcıların muafiyet sınavının reading, listening ve writing bölümlerinden maksimum düzeyde skor almaları hedeflenmektedir.",
      "İngilizce Yeterlik Sınavı Eylül, Ocak ve Mayıs aylarında yılda 3 kez yapılmaktadır. Sınav dört bölümden oluşmaktadır.":
        "İngilizce Yeterlilik Sınavı akademik yılın başında, her yarıyılın sonunda ve yaz okulunun sonunda olmak üzere yılda 4 kez yapılmaktadır (2026-27 takviminde Eylül, Ocak, Haziran ve Ağustos). Sınav üç bölümden oluşmaktadır.",
      "Okuma (Reading) Bölümü - %30":
        "Okuma (Reading) Bölümü - %40",
      "Dinleme (Listening) Bölümü - %25":
        "Dinleme (Listening) Bölümü - %30",
      "Konuşma (Speaking) Bölümü - %15":
        null,
      "Akademik yıl başında (Eylül ayında), İngilizce Seviye Tespit Sınavı (KHAS-STS) ve İngilizce Yeterlik Sınavı (KHAS-İYS) olmak üzere iki aşamalı uygulanmaktadır.":
        "Akademik yıl başında (Eylül ayında), İngilizce Seviye Tespit Sınavı (KHAS-STS) ve İngilizce Yeterlilik Sınavı (KHAS-YS) olmak üzere iki aşamalı uygulanmaktadır.",
      "KHAS-İYS: Bu sınav, öğrencilerin İngilizce yeterliklerini belirlemek için yapılır.":
        "KHAS-YS: Bu sınav, öğrencilerin İngilizce yeterliliklerini belirlemek için yapılır.",
      "İngilizce Yeterlik Sınavına girebilmek için öncelikle üniversitede kayıtlı öğrenci olma şartı aranır. Yıl içerisinde Ocak ve Mayıs aylarında yapılan sınavlar tek aşamalıdır ve en az B seviyesini başarı ile tamamlayan ve % 85 devam şartını yerine getirmiş olan öğrenciler bu sınavlara katılmaya hak kazanır.":
        "İngilizce Yeterlilik Sınavına Kadir Has Üniversitesi'ne kayıtlı öğrenciler ile azami süre sonunda kaydı silinip sınav hakkı bulunan öğrenciler girebilir. Yıl içerisinde Ocak, Haziran ve Ağustos aylarında yapılan sınavlar tek aşamalıdır; Güz ve Bahar yarıyıllarında Track 2, Track 3 ve Track 4 seviyelerinde kayıtlı olup bulunduğu düzeyin sınava girme koşulunu (dönem sonu başarı ortalaması) sağlayan öğrenciler ilgili yarıyılın sonundaki sınava katılmaya hak kazanır.",
    },
    source: "khas.edu.tr",
    checked: CHECKED,
  },

  /* Marmara — "Müyyes Güz Yönerge ING.pdf" (27.08.2026): "tek oturumda … Writing, Use of English, Reading
   * ve Listening bölümleri … ağırlığı birbirine eşittir", "Yanlış cevaplar doğru cevapları götürmez";
   * SSS "MÜYYES'ten geçme notu 60'tır"; yönerge Md.10 (Senato 01.09.2016 / 349-2) iki yıl geçerlilik; eşdeğer sınavlar
   * (22.08.2025): TOEFL iBT 72 · PTE 55 · CAE/CPE C, 2 yıl; 2026-27 takvimi (09.09.2026). Kaynak metin
   * (iki aşama, konuşma, 50/100) eskimiş.
   *
   * KAYNAK METİN GÜNCELLEMESİ (müşteri kararı 2026-09-30: "Yenilerini güncelle"; yeniden doğrulama 30.09.2026) — `edits`:
   * [A] İngilizce MÜYYES-Güz Sınav Yönergesi (Müyyes Güz Yönerge ING.pdf) — 2026-2027 öğrenci bilgilendirme metni —
   * https://ydil.marmara.edu.tr/dosya/ydyo/%C3%96%C4%9Frenci%20%C4%B0%C5%9Fleri/S%C4%B1nav%20Duyurular%C4%B1/2026-2027/M%C3%BCyyes%20G%C3%BCz%20Y%C3%B6nerge%20ING.pdf
   * (27.08.2026 (PDF oluşturma tarihi))
   * [B] Duyuru: 2026-2027 MÜYYES GÜZ SINAV YERLERİ —
   * https://ydil.marmara.edu.tr/notice/2026-2027-muyyes-guz-sinav-yerleri (27.08.2026)
   * [C] Sıkça Sorulan Sorular (Yabancı Diller Yüksekokulu) —
   * https://ydil.marmara.edu.tr/ogrenci/sikca-sorulan-sorular (sayfa damgası 18.04.2019 (içerik güncel eşdeğerlik
   * puanlarını içeriyor; 30.09.2026 tarihinde yayında))
   * [D] M.Ü. Yabancı Dil ve Türkçe Hazırlık Sınıfları Eğitim-Öğretim ve Sınav Yönergesi (Senato: 1 Eylül 2016 /
   * 349-2) — https://dosya.marmara.edu.tr/www/mevzuat/yeni5/mu_yabanci_dil_yonergesi_senato_v01.pdf (01.09.2016
   * (Senato kararı); aynı metnin taranmış kopyası:
   * https://dosya.marmara.edu.tr/www/mevzuat/2019/yabanc_dil_ve_t_rk_e_haz_rl_k_s_n_flar_e_itim_retim_ve_s_nav_y_nergesi.pdf
   * — YADYO ve üniversite mevzuat sayfalarında 30.09.2026 itibarıyla yürürlükteki yönerge olarak bağlantılı)
   * [E] Uluslararası Eşdeğer Yeterlilik Sınavları —
   * https://ydil.marmara.edu.tr/uluslararasi-esdeger-yeterlilik-sinavlari (22.08.2025)
   * [H] İngilizce MÜYYES Bahar Sınav Yönergesi (MUYYES_BAHAR_2026_ogrencibilgilendirme.pdf) —
   * https://ydil.marmara.edu.tr/dosya/ydyo/%C3%96%C4%9Frenci%20%C4%B0%C5%9Fleri/S%C4%B1nav%20Duyurular%C4%B1/MUYYES_BAHAR_2026_ogrencibilgilendirme.pdf
   * (duyuru 22.05.2026)
   * [J] İngilizce Hazırlık Birimi — Birim Bilgileri —
   * https://ydil.marmara.edu.tr/birimler/ingilizce-hazirlik-birimi/birim-bilgileri (02.11.2020)
   * [K] İngilizce MÜYYES-Güz sınav yerleri listesi (İNGİLİZCE MÜYYES GÜZ SINAV YERLERİv2 16 EYLÜL 2026.pdf) —
   * https://ydil.marmara.edu.tr/dosya/ydyo/%C3%96%C4%9Frenci%20%C4%B0%C5%9Fleri/S%C4%B1nav%20Yerleri/2026-2027/%C4%B0NG%C4%B0L%C4%B0ZCE%20M%C3%9CYYES%20G%C3%9CZ%20SINAV%20YERLER%C4%B0v2%2016%20EYL%C3%9CL%202026.pdf
   * (14.09.2026 (PDF oluşturma tarihi))
   * - İki aşamalı yapı yok: MÜYYES İngilizce tek oturumda, ara verilmeden yapılıyor (Güz 2026; Bahar 2026 ve Kış
   * 2026 metinleri de aynı). "Sınav ara verilmeden, tek oturumda yapılacaktır. Sınavda Writing, Use of English,
   * Reading ve Listening bölümleri bulunmaktadır. Her bölümden 100 üzerinden bir not alacaks" [A]
   * - "Birinci aşama" kalmadı; okuma ve dinleme artık Use of English ile birlikte tek kitapçıklı çoktan seçmeli
   * kısımda ölçülüyor. "30 dakikadan daha geç gelen öğrenciler Writing sınavına alınmayacak, yalnızca çoktan seçmeli
   * sınava (Use of English, Reading, Listening) alınacaklardır." [A]
   * - İlk aşama ve 50 üzerinden 30 barajı bugünkü sınavda yok; her bölüm 100 üzerinden, eşit ağırlıkla puanlanıyor
   * ve tek ölçüt genel geçme notu 60. "Sınav ara verilmeden, tek oturumda yapılacaktır. Sınavda Writing, Use of
   * English, Reading ve Listening bölümleri bulunmaktadır. Her bölümden 100 üzerinden bir not alacaks" [A]
   * - İlk aşama ve %30 programlar için 50 üzerinden 25 barajı bugünkü sınavda yok (aşama barajı hiçbir resmi
   * kaynakta geçmiyor). "Sınav ara verilmeden, tek oturumda yapılacaktır. Sınavda Writing, Use of English, Reading
   * ve Listening bölümleri bulunmaktadır. Her bölümden 100 üzerinden bir not alacaks" [A]
   * - "İkinci aşama" yok; resmi bölüm listesinde Konuşma (Speaking) bulunmuyor, yazma aynı oturumdaki Writing
   * bölümünde ölçülüyor. "Sınav ara verilmeden, tek oturumda yapılacaktır. Sınavda Writing, Use of English, Reading
   * ve Listening bölümleri bulunmaktadır. Her bölümden 100 üzerinden bir not alacaks" [A]
   * - "İkinci aşama" ifadesi geçersiz; geçme notu 60 resmi kaynaklarda program ayrımı yapılmadan tek not olarak
   * veriliyor (12. satırla birleştirildi). "MÜYYES'ten geçme notu 60'tır." [C]
   * - %30 programlar için ayrı 50 geçme notu resmi kaynaklarda yok: yönerge, SSS ve eşdeğerlik tablosu İngilizce
   * için tek asgari not (60) veriyor. İçerik 11. satırın yeni hâline taşındı. "(5) MÜYYES’te asgari başarı notu
   * altmış (60)’tır." [D]
   * - 1) Sınava girmek, dili hiç bilmeyenler için zorunlu değil. 2) "%100 ve %30 bölümlere farklı İngilizce
   * sınavları" iddiası doğrulanamadı ve cümleden çıkarıldı: 2026-27 duyurusu iki grubu tek MÜYYES-Güz altında
   * topluyor, tek bir İngilizce sınav yönergesi ve tek bir sınav yeri listesi (tüm adaylar 16.09.2026 10:00) var.
   * Yönerge Md.5(4) farklı gruplara farklı yeterlilik sınavı uygulanmasına izin veriyor ama uygulandığına dair
   * güncel bir resmi metin bulunamadı. "Yeni kayıt yaptıran öğrenciler akademik yılın başında yapılan MÜYYES - Güz’e
   * girerler. Eğitim alacağı dili hiç bilmeyen öğrencilerin bu sınava katılımı zorunlu değildir." [C] */
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
      { value: "4", label: "yıllık sınav (Yaz, yaz okulu açılırsa)" },
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
        detail: ["2026-2027 takvimine göre MÜYYES-Kış 15 Ocak 2027'de, MÜYYES-Bahar 26–28 Mayıs 2027 tarihleri arasında yapılacaktır; İngilizce sınavının günü sınav duyurusunda ilan edilir."],
      },
      {
        question: "MÜYYES'e kimler girer, mazeret sınavı var mı?",
        answer: "Tamamı ya da %30'u İngilizce eğitim veren bölümlere kayıtlı öğrenciler MÜYYES'e girer; mazeret sınavı yapılmaz.",
        detail: ["O yıl hazırlık okuyan öğrencilerin MÜYYES-Bahar'a girebilmesi için devam koşulunu sağlaması ve yıl içi ortalamasının en az 60 olması gerekir; önceki yıl hazırlığı tamamlayamamış öğrenciler bu koşul aranmadan girebilir."],
      },
    ],
    caveat: null,
    edits: {
      // Kurs tanıtımındaki sınav bölümleri bugünkü sınava göre (kullanıcı 2026-10-01: "eksik / yanlış bilgi varsa düzenle"); bölümler bu kaydın `parts`ında, kaynak yukarıda. Marmara sınavında bugün konuşma bölümü yok.
      "Marmara Üniversitesi Proficiency sınavı formatına yönelik teknikler ve katılımcıların muafiyet sınavının reading, writing, speaking ve listening bölümlerinden maksimum düzeyde skor almaları hedeflenmektedir.":
        "Marmara Üniversitesi Proficiency sınavı formatına yönelik teknikler ve katılımcıların muafiyet sınavının writing, use of English, reading ve listening bölümlerinden maksimum düzeyde skor almaları hedeflenmektedir.",
      "Hazırlık atlama sınavına girecek öğrencilerin İngilizce yeterliğini tespit etmek için iki aşamadan oluşan sınav düzenlenmektedir.":
        "Hazırlık atlama sınavına girecek öğrencilerin İngilizce yeterliğini tespit etmek için ara verilmeden, tek oturumda yapılan ve Writing, Use of English, Reading ve Listening bölümlerinden oluşan sınav düzenlenmektedir.",
      "Birinci aşama sınavında öğrencilerin Okuduğunu Anlama ve Duyduğunu Anlama yetisi belirlenir.":
        "Sınavın çoktan seçmeli kısmında öğrencilerin Dil Kullanımı (Use of English), Okuduğunu Anlama (Reading) ve Duyduğunu Anlama (Listening) yetisi belirlenir.",
      "İlk aşamada, %100 İngilizce eğitim veren bölümlerin öğrencileri 50 üzerinden en az 30 almaları gerekmektedir.":
        null,
      "%30 İngilizce eğitim veren bölümlerin öğrencileri ise 50 üzerinden en az 25 almak zorundadır.":
        null,
      "İkinci aşama sınavı ise öğrencilerin Yazma ve Konuşma becerilerini ölçer.":
        "Writing bölümü ise öğrencilerin Yazma becerisini ölçer.",
      "İkinci aşamada tamamlandıktan sonra %100 İngilizce eğitim veren bölümlerin öğrencilerinin sınavın bütününden 100 üzerinden en az 60, alması gerekir.":
        "Sınav tamamlandıktan sonra %100 ve %30 İngilizce eğitim veren bölümlerin öğrencilerinin sınavın bütününden 100 üzerinden en az 60 alması gerekir.",
      "%30 İngilizce eğitim veren bölümlerin öğrencilerinin ise 100 üzerinden en az 50 almaları gerekir.":
        null,
      "Yeni kayıt yaptıran öğrencilerin akademik yılın başında yapılan MÜYYES - Güz’e girmeleri gerekmektedir. %100 İngilizce eğitim yapan bölümlerin öğrencileri ile %30 İngilizce eğitim yapan bölümlerin öğrencilerine farklı İngilizce sınavları MÜYYES tarafından verilir.":
        "Yeni kayıt yaptıran öğrenciler akademik yılın başında yapılan MÜYYES - Güz’e girerler; eğitim alacağı dili hiç bilmeyen öğrencilerin bu sınava katılımı zorunlu değildir.",
    },
    source: "marmara.edu.tr",
    checked: CHECKED,
  },

  /* Doğuş — İngilizce Hazırlık Sınıfı Yönetmeliği (RG 29.11.2020, değ. 21.08.2024): "DÜİYES'te yeterlik
   * ölçütü 100 üzerinden en az 60'tır", 5 yıl geçerlilik; 2026-2027 öğrenci kitapçığı (PDF 13.09.2026):
   * "Sınav 2 oturumdan oluşur. 1.Oturum dinleme, okuma, dilbilgisi ve kelime kısımlarından, 2. Oturum ise
   * yazma kısmından oluşur", yılda 3 kez; resmi örnek sınav (10.08.2026): 1. oturum 110 dk (20+20+15+10
   * soru), yazma 60 dk; eşdeğerlik sayfası: TOEFL iBT 72 · PTE 55 · YDS/YÖKDİL 60. DÜİYES I / II ayrımı kalktı.
   *
   * KAYNAK METİN GÜNCELLEMESİ (müşteri kararı 2026-09-30: "Yenilerini güncelle"; yeniden doğrulama 30.09.2026) — `edits`:
   * [A] Doğuş Üniversitesi İngilizce Hazırlık Sınıfı Eğitim-Öğretim Yönetmeliği (PDF, ydb.dogus.edu.tr > Yönetmelik
   * ve Yönergeler) —
   * https://ydb.dogus.edu.tr/docs/librariesprovider8/default-document-library/do%C4%9Fu%C5%9F-%C3%BCniversitesi-ingilizce-hazirlik-sinifi-e%C4%9Fitim-%C3%B6%C4%9Fretim-y%C3%B6netmeli%C4%9Fi.pdf?sfvrsn=49094743_0
   * (RG 29.11.2020 (31319), değişiklik RG 21.08.2024 (32639))
   * [B] Yabancı Diller Birimi İngilizce Hazırlık Programı Öğrenci El Kitabı 2026-2027 Akademik Yılı (PDF) —
   * https://ydb.dogus.edu.tr/docs/librariesprovider8/default-document-library/ogrenci-kitapcigi/2024-2025-student-handbook.pdf?sfvrsn=664ae3d8_8
   * (2026-2027 (PDF üst verisi son değişiklik 13.09.2026))
   * [E] Duyuru: 01.09.2026 Tarihli İngilizce Yeterlik Sınavı (DÜİYES) Önemli Bilgilendirmesi —
   * https://www.dogus.edu.tr/duyurular/detay/01.09.2026-tarihli-ingilizce-yeterlik-sinavi-onemli-bilgilendirme
   * (31.08.2026)
   * [G] 2026-2027 Eğitim-Öğretim Yılı İngilizce Hazırlık Programı Akademik Takvimi (PDF) —
   * https://ydb.dogus.edu.tr/docs/librariesprovider8/academic-calendar-for-english-preparatory-school/2026-2027-akademik-y%C4%B1l%C4%B1-ingilizce-haz%C4%B1rl%C4%B1k-s%C4%B1n%C4%B1f%C4%B1-akademik-takvimi.pdf?sfvrsn=9eb16bf2_6
   * (31.08.2026 (PDF üst verisi))
   * [H] Duyuru: İngilizce Hazırlık Programı Düzey Belirleme Sınavı (DBS) Bilgilendirmesi —
   * https://www.dogus.edu.tr/duyurular/detay/ingilizce-hazirlik-programi-duzey-belirleme-sinavi-bilgilendirmesi
   * (19.08.2026)
   * [I] Midterm Exam Outline (PDF; Değerlendirme sayfasında dört düzey için de aynı dosya) —
   * https://ydb.dogus.edu.tr/docs/librariesprovider8/default-document-library/midterm-exam-outline-upper-intermediate.pdf?sfvrsn=66ecc56d_2
   * (belge başlığı '2024-2025 Midterm Exam Outline'; 30.09.2026'da hâlâ yayında)
   * - DÜİYES I / DÜİYES II ayrımı resmi kaynakların hiçbirinde yok. Bugün iki aşama: seviye tespit (düzey belirleme)
   * sınavı, ardından B1 ve üzeri çıkanlar için tek DÜİYES. "Üniversitenin eğitim-öğretim dili İngilizce olan bölüm
   * ve programlarına kabul edilen öğrencilerin İngilizce seviyesi seviye tespit sınavı ile İngilizce dil yeterliği
   * ise " [A]
   * - 'DÜİYES I' diye bir sınav artık yok; yerini Düzey Belirleme / Seviye Tespit Sınavı aldı. DÜİYES'e giriş koşulu
   * 'DÜİYES I'den başarılı not' değil, DBS'de B1 ve üzeri. '2 saat sürer' ve 'çoktan seçmeli genel İngilizce'
   * bilgileri DBS için resmi kaynakta yazmıyor (duyuruda yalnız saat başı oturum saatleri var), bu yüzden cümleden
   * çıkarıldı. "Eğitim dili İngilizce olan bölümlere kayıtlı ve İsteğe Bağlı İngilizce Hazırlık Programı eğitimi
   * almak isteyen öğrencilerimiz için sınava katılım zorunludur." [H]
   * - Sınavın adı artık yalnız 'DÜİYES' (II yok); 'aşama' yerine 'oturum'; birinci oturuma kelime bölümü eklenmiş;
   * geçme ölçütü (60/100) resmi olarak açık; başarısız öğrencilerin yerleştirilmesi DÜİYES sonucuna göre değil
   * seviye tespit sınavına göre, eski öğrenciler için ise ek yarıyıl kuralı var. "Sınav 2 oturumdan oluşur. 1.Oturum
   * dinleme, okuma, dilbilgisi ve kelime kısımlarından, 2. Oturum ise yazma kısmından oluşur." [B]
   * - Ara sınavda 'Use of English (Grammar)' bölümü duruyor, ancak resmi taslakta ve el kitabında kelime
   * (Vocabulary) ayrı bir bölüm; eski listede kelime yok. Not: yayındaki ara sınav taslağının başlığı 2024-2025;
   * 2026-2027 el kitabı bölümleri aynı şekilde sayıyor. "Sınavda, dinleme, okuma, dil bilgisi, kelime, yazma ve
   * konuşma becerilerini ölçen bölümler bulunmaktadır." [B]
   * - DÜİYES'te resmi bölüm adları 'Grammar' ve 'Vocabulary' (iki ayrı bölüm); 'İngilizce Kullanımı' adı DÜİYES
   * belgelerinde geçmiyor. 'Tüm Düzeylerde' ibaresi de geçersiz: DÜİYES tek sınav, B2 düzeyinde. "Sınav 2 oturumdan
   * oluşur. 1.Oturum dinleme, okuma, dilbilgisi ve kelime kısımlarından, 2. Oturum ise yazma kısmından oluşur." [B]
   * - Bölümün kendisi geçerli (DÜİYES'te okuma var). Değişen yalnız '(Bütün Düzeyler)' eki: DÜİYES düzeylere göre
   * yapılan bir sınav değil, tek ve B2 düzeyinde; yıl içinde yalnız orta-üstü düzeyi bitirenler giriyor. "DÜİYES
   * Doğuş Üniversitesi tarafından uygulanan CEFR B2 seviyesine eşdeğer bir yeterlik sınavıdır." [B]
   * - Bölüm geçerli (DÜİYES'te dinleme var); yalnız '(Bütün Düzeyler)' eki resmi bilgiyle bağdaşmıyor (tek sınav,
   * B2). "Sınav 2 oturumdan oluşur. 1.Oturum dinleme, okuma, dilbilgisi ve kelime kısımlarından, 2. Oturum ise yazma
   * kısmından oluşur." [B]
   * - Bölüm geçerli (2. oturum yazma); yalnız '(Bütün Düzeyler)' eki resmi bilgiyle bağdaşmıyor (tek sınav, B2).
   * "Sınav 2 oturumdan oluşur. 1.Oturum dinleme, okuma, dilbilgisi ve kelime kısımlarından, 2. Oturum ise yazma
   * kısmından oluşur." [B] */
  "dogus-universitesi": {
    exam: "DÜİYES",
    parts: [
      { name: "Dinleme", note: "20 soru · 1. oturum", weight: 25, weightLabel: "%25" },
      { name: "Okuma", note: "20 soru · 1. oturum", weight: 25, weightLabel: "%25" },
      { name: "Dil bilgisi", note: "15 soru · 1. oturum", weight: 15, weightLabel: "%15" },
      { name: "Kelime", note: "10 soru · 1. oturum", weight: 10, weightLabel: "%10" },
      { name: "Yazma", note: "2 konudan 1'i · 60 dk", weight: 25, weightLabel: "%25" },
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
          "Birinci oturumda dinleme, okuma, dil bilgisi ve kelime soruları, ikinci oturumda yazma bölümü yer alır. 2026-2027 resmi sınav taslağına göre birinci oturum 100 dakika, yazma oturumu 60 dakikadır.",
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
        answer: "Evet; TOEFL iBT 72, CAE (C1 Advanced) C, Cambridge Linguaskill General 140, Oxford Test of English 106, PTE Academic 55 ya da YDS / e-YDS / YÖKDİL / e-YÖKDİL 60 kabul edilir.",
        detail: ["Uluslararası sınava Türkiye'de giriliyorsa devlet üniversitesi binasında girilmiş olması gerekir."],
      },
    ],
    caveat: null,
    edits: {
      // Kurs tanıtımındaki sınav bölümleri bugünkü sınava göre (kullanıcı 2026-10-01: "eksik / yanlış bilgi varsa düzenle"); bölümler bu kaydın `parts`ında, kaynak yukarıda.
      "Eğitimlerimiz Doğuş Üniversitesi hazırlık atlama sınavına girecek öğrenciler için özel olarak hazırlanmaktadır. Doğuş Üniversitesi DÜİYES sınavı formatına yönelik teknikler ve katılımcıların muafiyet sınavının reading, writing ve listening bölümlerinden maksimum düzeyde skor almaları hedeflenmektedir.":
        "Eğitimlerimiz Doğuş Üniversitesi hazırlık atlama sınavına girecek öğrenciler için özel olarak hazırlanmaktadır. Doğuş Üniversitesi DÜİYES sınavı formatına yönelik teknikler ve katılımcıların muafiyet sınavının listening, reading, grammar, vocabulary ve writing bölümlerinden maksimum düzeyde skor almaları hedeflenmektedir.",
      "Hazırlık atlama muafiyet sınavı 2 aşamadan oluşmaktadır.":
        "Hazırlık atlama süreci 2 aşamadan oluşmaktadır: Düzey Belirleme Sınavı (DBS) ve DÜİYES.",
      "Akademik yılında yeni kayıt yaptırmış olan tüm öğrencilerin katılması zorunlu olan bir sınavdır. Sınav, 2 saat sürer ve öğrencilerin genel İngilizce bilgisini test eden çoktan seçmeli bir sınavdır. DÜİYES I'den başarılı not alan öğrenciler DÜİYES II sınavına girmeye hak kazanmış olurlar. Başarılı olamayan öğrenciler, sınav sonuçlarına göre hazırlık sınıfındaki uygun düzeye yerleştirilmektedir.":
        "Akademik yılında eğitim dili İngilizce olan bölümlere yeni kayıt yaptırmış olan öğrencilerin katılması zorunlu olan sınav, Düzey Belirleme Sınavıdır (DBS). DBS sonucu B1 ve üzeri düzeyde olan öğrenciler DÜİYES'e girmeye hak kazanmış olurlar. Diğer öğrenciler, sınav sonuçlarına göre hazırlık sınıfındaki uygun düzeye yerleştirilmektedir.",
      "Sınav 2 aşamadan oluşmaktadır ve birinci aşama Dinleme bilgisi, Okuma bilgisi ve Dilbilgisi ölçülürken, ikinci bölümde yazma bölümü yer alıyor. DÜİYES II sınavında başarılı olan öğrenciler, Fakültelerinde eğitime başlayabilirler. DÜİYES II sınavında başarısız olan yeni ve halen hazırlık sınıfına devam eden eski kayıtlı öğrenciler ise sınav sonuçlarına göre hazırlık sınıfındaki uygun düzeye yerleştiririlmektedir.":
        "Sınav 2 oturumdan oluşmaktadır ve birinci oturumda dinleme, okuma, dilbilgisi ve kelime bilgisi ölçülürken, ikinci oturumda yazma bölümü yer alıyor. DÜİYES'ten 100 üzerinden en az 60 alarak başarılı olan öğrenciler, bölümlerinde eğitime başlayabilirler. DÜİYES'te başarısız olan yeni öğrenciler hazırlık programına alınmakta ve seviye tespit sınavı sonuçlarına göre hazırlık sınıfındaki uygun düzeye yerleştirilmekte; halen hazırlık sınıfına devam eden eski kayıtlı öğrenciler ise ilave bir ya da iki yarıyıl daha hazırlık programına devam etmektedir.",
      // Satır kaynakta iki kez geçiyor (ara sınav ve DÜİYES listeleri); ikisinde de kelime bugün ayrı bölüm.
      "İngilizce Kullanımı-Tüm Düzeylerde":
        "İngilizce Kullanımı (Dil Bilgisi) ve Kelime-Tüm Düzeylerde",
    },
    source: "dogus.edu.tr",
    checked: CHECKED,
  },

  /* Koç — İngilizce Dil Merkezi sayfası (18.09.2026), ELC Program Student Handbook 2025-26 (02.07.2026), dış
   * sınav kabul koşulları (20.08.2026): KUEPE okuma 20 · dil kullanımı 20 · dinleme 15 · yazma 25 · konuşma
   * 20 (10 dk) = 100, "a total of 60 out of 100", yılda 4 kez; TOEFL iBT 4.5/6 · PTE 67 · YDS/e-YDS 80 ·
   * CAE/CPE C. Kaynak metin (kurumsal TOEFL ITP, KUEPE-S/W, TOEFL 550/537) eskimiş.
   *
   * KAYNAK METİN GÜNCELLEMESİ (müşteri kararı 2026-09-30: "Yenilerini güncelle"; yeniden doğrulama 30.09.2026) — `edits`:
   * [A] Koç Üniversitesi — İngilizce Dil Merkezi (ELC) sayfası (Program, Sınavlar, KUEPE tablosu, SSS) —
   * https://www.ku.edu.tr/akademik/ingilizce-dil-merkezi/ (2026-09-18 (sayfanın dateModified alanı))
   * [B] Kabul Edilen İngilizce Yeterlilik Sınavları Hakkında Duyuru (15.01.2026 tarihli, 1 sayılı Akademik Kurul
   * kararı) — PDF —
   * https://www.ku.edu.tr/wp-content/uploads/2026/01/Kabul-Edilen-Ingilizce-Yeterlilik-Sinavlari-Hakkinda-Duyuru.pdf
   * (2026-01-30 (PDF oluşturma); karar 15.01.2026)
   * [C] Dış Sınav Sonuçları Kabul Koşulları Güncellemesi (21.03.2025 günlü, 4 sayılı Akademik Kurul kararı) — PDF —
   * https://www.ku.edu.tr/wp-content/uploads/2026/08/dis-sinav-sonuclari-kabul-kosullari-guncellemesi.pdf
   * (2026-08-20 (PDF oluşturma))
   * - Seviye belirleme sınavı sürüyor ama sonrasında kurumsal TOEFL (ITP) değil KUEPE'ye giriliyor. '74' eşiği resmi
   * kaynaklarda yok (yalnızca 'yeterli puan' deniyor), bu yüzden rakam cümleden çıkarıldı. "Koç Üniversitesi’ne
   * kayıt hakkı olan ve kayıt sırasında üniversite tarafından kabul edilen, geçerli bir dış sınav sonucu sunamayan
   * öğrenciler ilk olarak İngilizce seviyel" [A]
   * - Geçiş ölçütü artık TOEFL/TWE 550/4 değil, KUEPE 60/100. Kabul edilen sınavlar listesinde TOEFL ITP ve TWE yok;
   * yalnızca TOEFL iBT var. "KUEPE sınavının tüm bölümlerinden toplamda 100 üzerinden 60 alan öğrenciler bölümlerine
   * geçiş yapmaktadır." [A]
   * - Ayrı KUEPE-S / KUEPE-W sınavları, TOEFL 537 ön koşulu, 2.00 ortalama ve '5 üzerinden 3' ölçütü bugün yok;
   * konuşma ve yazma tek KUEPE'nin bölümleri. Bugünkü karşılığı KUEPE'ye girme koşuludur (ikinci yıl öğrencileri
   * için koşul: bulunduğu seviyeyi 65 ile tamamlamak). Satırın tümüyle kaldırılması da savunulabilir. "KUEPE, Okuma
   * (Reading), Dil Kullanımı (Use of English), Dinleme (Listening), Yazma (Writing) ve Konuşma (Speaking) olmak
   * üzere beş bölümden oluşmaktadır." [A]
   * - TOEFL 537 + 2.00 ortalama ile KUEPE-S / KUEPE-W'ye girme düzeni kaldırılmış; bugün karşılığı yok. Dış sınavlar
   * yalnızca listedeki puanla ve geçerlilik süresi içinde kabul ediliyor. "Bu karar kapsamında, karar tarihinden
   * itibaren yalnızca Koç Üniversitesi tarafından belirlenen koşullara uygun ve geçerlilik süresi dolmamış sınav
   * sonuçları kabul edilece" [B]
   * - TOEFL 550 + TWE 4 ölçütü ve ayrı yazma sınavı (KUEPE-W) bugün yok; yazma, KUEPE'nin 25 puanlık bölümüdür ve
   * ayrıca girilemez. "KUEPE, Okuma (Reading), Dil Kullanımı (Use of English), Dinleme (Listening), Yazma (Writing)
   * ve Konuşma (Speaking) olmak üzere beş bölümden oluşmaktadır." [A]
   * - Resmi kaynaklarda artık adı verilen iki sınav merkezi yok; kural 'Türkiye'deki devlet üniversitelerine ait
   * binalar' olarak genelleşmiş. Home Edition ve My Best Scores kabul edilmiyor. "T.C. uyruklu öğrenci adayları ve
   * öğrencilerin Türkiye’deki devlet üniversitelerine ait binalarda sınava girmesi gerekmektedir. Lise öğrenimini
   * yurtdışında tamamlamış T.C." [C]
   * - Resmi kaynaklarda adı geçen bir sınav merkezi listesi yok; ölçüt devlet üniversitesi binası. TOBB ETÜ
   * merkezine ilişkin hiçbir ifade bulunamadı. "T.C. uyruklu öğrenci adayları ve öğrencilerin Türkiye’deki devlet
   * üniversitelerine ait binalarda sınava girmesi gerekmektedir. Lise öğrenimini yurtdışında tamamlamış T.C." [C]
   * - Resmi kaynaklarda adı geçen bir sınav merkezi listesi yok; 'yalnızca iki merkez' kuralı yerini genel devlet
   * üniversitesi binası şartına bırakmış. "T.C. uyruklu öğrenci adayları ve öğrencilerin Türkiye’deki devlet
   * üniversitelerine ait binalarda sınava girmesi gerekmektedir. Lise öğrenimini yurtdışında tamamlamış T.C." [C] */
  "koc-universitesi": {
    exam: "KUEPE",
    parts: [
      { name: "Okuma", note: "3 metin · 20 soru", weight: 20, weightLabel: "20 puan" },
      { name: "Dil kullanımı", note: "dil bilgisi + kelime · 20 soru", weight: 20, weightLabel: "20 puan" },
      { name: "Dinleme", note: "mülakat + not alma · 15 soru", weight: 15, weightLabel: "15 puan" },
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
        answer: "Evet; TOEFL iBT'den 6 üzerinden 4.5 (21 Ocak 2026'dan önce girilen sınavlarda toplam 80 ve yazma 20), PTE Academic'ten 67, YDS / e-YDS'den 80, CAE / CPE'den C, e-TEP'ten 120 üzerinden 74 ya da Oxford Test of English Advanced'dan 170 üzerinden 141-145 yeterlidir.",
        detail: ["Türk vatandaşlarının bu sınavlara Türkiye'de devlet üniversitesi binasında girmesi gerekir; liseyi yurt dışında bitirenler o ülkenin resmî sınav merkezinde de girebilir. TOEFL iBT Home Edition ve My Best Scores kabul edilmez."],
      },
    ],
    caveat: null,
    edits: {
      "Öğrenciler ilk üniversiteye kayıt yaptırdıklarında, seviye tespit sınavına girerler. Seviye tespit sınavının sonuçlarına göre sınıflarına yerleştirilirler. Seviye tespit sınavından 74 ve üzeri alan öğrenciler, bölümlerine başlayabilmek için ELC tarafından verilen kurumsal TOEFL (ITP)’a girebilirler. İngilizce Hazırlık Programından muaf olabilme şartları şöyledir:":
        "Öğrenciler üniversiteye ilk kayıt yaptırdıklarında, kabul edilen geçerli bir dış sınav sonucu sunamıyorlarsa Seviye Belirleme Sınavına girerler. Bu sınavın sonucuna göre ya KUEPE'ye girmeye hak kazanırlar ya da hazırlık programında uygun seviyedeki sınıflarına yerleştirilirler. İngilizce Hazırlık Programından muaf olabilme şartları şöyledir:",
      "TOEFL/TWE’den 550/4 ve üzeri puan alan öğrenciler doğrudan bölümlerinde eğitimlerine başlayabilirler.":
        "KUEPE'den 100 üzerinden en az 60 puan alan öğrenciler doğrudan bölümlerinde eğitimlerine başlayabilirler.",
      "TOEFL’dan 537 ve üzeri alıp genel not ortalaması 2.00 ve üzeri olan öğrenciler Konuşma (KUEPE-S) ve Yazma (KUEPE-W) sınavına çağırılırlar. Bu sınavlardan 5 üzerinden en az 3 alan öğrenciler de yine akademik programlarına başlama hakkı kazanmış olurlar.":
        "Hazırlık programındaki birinci yıl öğrencileri, Intermediate seviyesini 80 ya da Upper-Intermediate seviyesini 65 puanla tamamladıklarında KUEPE'ye girmeye hak kazanırlar. Bu sınavdan 100 üzerinden en az 60 alan öğrenciler de yine akademik programlarına başlama hakkı kazanmış olurlar.",
      "Daha önceki herhangi bir TOEFL’dan 537 ve üzeri puan almış olan öğrencilerin 2.00 ve üzeri ortalamaları olması halinde konuşma (KUEPE-S) ve yazma (KUEPE-W) sınavlarına girmek için ileriki tarihlerde tekrardan TOEFL’a girmelerine gerek yoktur.":
        null,
      "Yine aynı şekilde ELC genel not ortalaması 2.00 ve üzeri olan öğrenciler önceki herhangi bir TOEFL’dan 550 ve üzeri puan almış ancak TWE (Kompozisyon)’dan 4 alamamış ise yazma sınavına (KUEPE-W) girebilirler ve 5 üzerinden en az 3 almaları durumunda bölümlerinde eğitime başlayabilirler.":
        null,
      "Koç Üniversitesi İngilizce Dil Merkezi sadece aşağıdaki iki TOEFL IBT sınav merkezinin sonuç belgesini kabul etmektedir:":
        "Koç Üniversitesi İngilizce Dil Merkezi, T.C. uyruklu öğrencilerin TOEFL iBT sonuç belgesini yalnızca sınava Türkiye'deki devlet üniversitelerine ait binalarda girilmişse kabul etmektedir; lise öğrenimini yurt dışında tamamlayanlar o ülkenin resmî sınav merkezlerinde de sınava girebilir.",
      "TOBB Üniversitesi Yabancı Diller Bölümü TOEFL IBT Sınav Merkezi, Ankara":
        null,
      "Boğaziçi Üniversitesi Fen-Edebiyat Fakültesi Çeviribilim Bölümü TOEFL Sınav Merkezi":
        null,
    },
    source: "ku.edu.tr",
    checked: CHECKED,
  },

  /* Acıbadem — muafiyet sayfası + muafiyet koşulları PDF'i (10.08.2026), 2026-27 zorunlu hazırlık yazısı,
   * ACUPEP 2025-26 el kitabı: yeni öğrenci için "İngilizce Hazırlık Seviye Tespit ve Muafiyet Sınavı (ACUPEP
   * PPT)", üç aşama (çoktan seçmeli test → yazma 70 dk → konuşma 15 dk), her aşamada en az 70; ACEPT geçme 70
   * (Psikoloji, Hemşirelik, Beslenme ve Diyetetik 60); TOEFL iBT 80 / yeni ölçek 4,5 · PTE 67 · YDS/e-YDS 85
   * (+ yazma ve konuşma 70). "AYES" resmi ad değil; kaynak metin (tek APPT, YÖKDİL, TWE) eskimiş.
   *
   * KAYNAK METİN GÜNCELLEMESİ (müşteri kararı 2026-09-30: "Yenilerini güncelle"; yeniden doğrulama 30.09.2026) — `edits`:
   * [A] Muafiyet – İngilizce Hazırlık Programı (web sayfası) —
   * https://www.acibadem.edu.tr/akademik/rektorluge-bagli-bolumler/yabanci-diller/ingilizce-hazirlik-programi/muafiyet
   * (tarihsiz (30.09.2026'da açıldı))
   * [B] İngilizce Hazırlık Programı Muafiyet Koşulları (PDF) —
   * https://www.acibadem.edu.tr/sites/default/files/ingilizce-hazirlik-programi-muafiyet-kosullari.pdf (10.08.2026)
   * [C] 2026-27 Zorunlu Hazırlık Ön Kayıt Yazısı (PDF) —
   * https://www.acibadem.edu.tr/sites/default/files/2026-27-zorunlu-hazirlik-on-kayit-yazisi.pdf (10.08.2026)
   * [D] Duyuru: Acıbadem Üniversitesi Seviye Tespit ve Muafiyet Sınavı Hakkında Önemli Bilgilendirme —
   * https://www.acibadem.edu.tr/duyurular/acibadem-universitesi-seviye-tespit-ve-muafiyet-sinavi-hakkinda-onemli-bilgilendirme
   * (26.08.2026)
   * [E] ACUPEP 2025-2026 Öğrenci El Kitabı (PDF; sitede yayındaki en güncel el kitabı) —
   * https://www.acibadem.edu.tr/sites/default/files/document/acupep-2025-2026-ogrenci-el-kitabi.pdf (11.12.2025)
   * [I] Lisans APPT – Düzey Belirleme ve Muafiyet Sınavı Hakkında Bilgilendirme 2026-2027 (PDF, eğitim dili Türkçe
   * programlar) — https://www.acibadem.edu.tr/sites/default/files/2026-2027-lisans-appt-bilgilendirme.pdf
   * (14.09.2026)
   * [J] İngilizce Hazırlık Programı – Program Hakkında (web sayfası) —
   * https://www.acibadem.edu.tr/akademik/ortak-dersler-bolumleri/yabanci-diller/ingilizce-hazirlik-programi/program-hakkinda
   * (tarihsiz (30.09.2026'da açıldı))
   * [L] 2026-27 İsteğe Bağlı Hazırlık Ön Kayıt Yazısı (PDF) —
   * https://www.acibadem.edu.tr/sites/default/files/2026-27-istege-bagli-hazirlik-on-kayit-yazisi.pdf (10.08.2026)
   * - (1) Sınavın adı: İngilizce programlar için 'APPT (Acıbadem Yerleştirme ve Yeterlilik Sınavı)' değil 'ACUPEP
   * PPT'; 'APPT' bugün eğitim dili Türkçe programların İngilizce dersleri muafiyet sınavının adı. (2) Tek sınavdan
   * 70 yetmiyor: üç aşama (test → yazma → konuşma), her birinden en az 70. (3) 'Kayıt haftasında' değil: 2026'da
   * kayıt 24-28 Ağustos, sınav 07-10 Eylül. (4) 'En az 2 akademik dönem' yanlış: süre bir dönemden iki akademik yıla
   * kadar. "İngilizce Hazırlık Seviye tespit ve Muafiyet sınavı (ACUPEP PPT) 07-08-09-10 Eylül 2026 tarihleri
   * arasında verilecektir." [C]
   * - YÖKDİL, İngilizce programlar için Senato'nun tanıdığı sınavlar listesinde yok (yalnız Türkçe programların
   * tablosunda var); listeye e-YDS, e-TEP (2 yıl), Cambridge Linguaskill (5 yıl) ve Oxford Test of English (5 yıl)
   * eklenmiş; YDS/e-YDS tek başına yetmiyor. TOEFL/PTE 2 yıl, CAE 3 yıl, YDS 5 yıl süreleri değişmemiş. "YDS / e-YDS
   * * 85 5 yıl" [B]
   * - 85 puan ve 5 yıl doğru; ancak YÖKDİL İngilizce programların muafiyet listesinde yok (liste 'YDS / e-YDS'),
   * YÖKDİL yalnız Türkçe programların APPT tablosunda geçiyor. Ayrıca YDS/e-YDS sahibi yalnız 1. aşamadan muaf,
   * yazma ve konuşmaya girmek zorunda. "YDS / e-YDS * 85 5 yıl" [B]
   * - 'Muafiyet sınavına girmeksizin' ifadesi artık her sınav için doğru değil: YDS/e-YDS ve yurt dışında alınan
   * TOEFL iBT için yazma + konuşma sınavı (en az 70) şart; ayrıca devlet üniversitesi sınav merkezi ve kurumsal
   * TOEFL kısıtları var. Not: 9 numaralı başlığın altındaki listeye güncel tabloda olup eski metinde bulunmayan
   * satırlar eklenmeli: TOEFL iBT (yeni sınav) 4,5 – 2 yıl; Cambridge Linguaskill 180 – 5 yıl; Oxford Test of
   * English (OTE) 125 – 5 yıl; e-TEP 85 – 2 yıl. "* YDS ve/veya e-YDS sınavından 85 ve üzeri alan öğrencilerin
   * İngilizce Hazırlık Programından muaf olabilmeleri için ACUPEP PPT/ ACEPT speaking ve writing sınavlarına da g"
   * [B]
   * DEĞİŞTİRİLMEDİ (doğrulanamadı / resmi kaynaklar çelişiyor — docs/bekleyen-sorular.md): 80 puan ve 2 yıl tüm
   * kaynaklarda aynı; çelişki '20 TWE' şartında. DAHA YENİ kaynaklar (B: 10.08.2026 PDF, A: canlı muafiyet sayfası,
   * D: 26.08.2026 duy */
  "acibadem-universitesi": {
    exam: "ACUPEP PPT",
    parts: [
      { name: "Seviye tespit testi", note: "çoktan seçmeli · online", weight: null, weightLabel: null },
      { name: "Yazma", note: "görüş yazısı · 70 dk", weight: null, weightLabel: null },
      { name: "Konuşma", note: "bireysel · 15 dk", weight: null, weightLabel: null },
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
          "Testten 70 alan öğrenci yazma sınavına, yazmadan 70 alan konuşma sınavına geçer. Yazma sınavında 70 dakikada bir görüş yazısı yazılır; konuşma sınavı bireysel olarak yapılır ve 15 dakika sürer.",
        ],
      },
      {
        question: "ACEPT nedir, geçme notu kaç?",
        answer: "ACEPT, hazırlık öğrencilerinin dönem ya da yıl sonunda girdiği yeterlik sınavıdır; geçme notu 70'tir.",
        detail: ["Dil kullanımı, okuma, dinleme, yazma ve konuşma bölümlerinden oluşur. Psikoloji, Hemşirelik ile Beslenme ve Diyetetik bölümlerinde geçme notu 60'tır."],
      },
      {
        question: "Sınav ne zaman yapılır?",
        answer: "ACUPEP PPT her yıl akademik yıl başında, yalnız yeni kayıtlı öğrencilere yapılır; aşamaların tekrarı yoktur.",
        detail: ["ACEPT ise güz, bahar ve yaz dönemlerinin sonunda, ayrıca akademik yıl başında (Eylül) düzenlenir."],
      },
      {
        question: "TOEFL, PTE ya da YDS ile muafiyet mümkün mü?",
        answer: "Evet; TOEFL iBT 80 (yeni ölçekte 4,5), PTE Academic 67, CAE C, Cambridge Linguaskill 180, Oxford Test of English 125 ya da e-TEP 85 kabul edilir.",
        detail: ["YDS / e-YDS'den 85 alanların ayrıca yazma ve konuşma sınavlarından en az 70 alması gerekir; aynı koşul TOEFL iBT'ye yurt dışında girenler için de geçerlidir. TOEFL iBT, PTE ve CAE'de yalnız devlet üniversitelerindeki sınav merkezlerinden alınan sonuçlar geçerlidir."],
      },
    ],
    caveat: null,
    edits: {
      // Kurs tanıtımındaki sınav bölümleri bugünkü sınava göre (kullanıcı 2026-10-01: "eksik / yanlış bilgi varsa düzenle"); bölümler bu kaydın `parts`ında, kaynak yukarıda. TOEFL satırı: resmi kaynaklar çelişince EN YENİSİ esas alındı (muafiyet koşulları PDF 10.08.2026 ve muafiyet sayfası: "80" / "4,5", TWE yok; eski 2025-26 el kitabı "20 TWE").
      "Öğrencilerimizin Proficiency sınavının reading, writing, speaking ve listening bölümlerinden maksimum düzeyde skor almaları hedeflenmektedir.":
        "Öğrencilerimizin ACUPEP PPT sınavının çoktan seçmeli test, writing ve speaking aşamalarından maksimum düzeyde skor almaları hedeflenmektedir.",
      "TOEFL (IBT) 80 (Test) - 20 TWE - Geçerlilik Süresi - 2 Yıl":
        "TOEFL (IBT) 80 (yeni ölçekte 4,5) - Geçerlilik Süresi - 2 Yıl",
      "Acıbadem Üniversitesi lisans programı eğitim dili İngilizce olan bölümlere yeni kayıt yaptıran öğrenciler kayıt haftasında APPT’e ( Acıbadem Yerleştirme ve Yeterlilik Sınavı)'na girmekle yükümlüdürler. Bu sınavdan 70 ve üzerinde puan alan öğrenciler İngilizce Hazırlık programından muaf olup lisans eğitimlerine başlamaya hak kazanırlar. 70’in altında puan alan öğrenciler ise aldıkları puanlara göre İngilizce Hazırlık Programına yerleştirilirler ve en az 2 akademik dönem eğitim alarak başarılı olabilirler.":
        "Acıbadem Üniversitesi'nde eğitim dili %100 İngilizce olan bölümlere yeni kayıt yaptıran öğrenciler, akademik yılın başlangıcında yapılan ACUPEP PPT'ye (İngilizce Hazırlık Seviye Tespit ve Muafiyet Sınavı) girmekle yükümlüdürler. Üç aşamalı bu sınavın çoktan seçmeli ilk aşamasından, ardından yazma ve konuşma sınavlarının her birinden 70 ve üzerinde puan alan öğrenciler İngilizce Hazırlık Programından muaf olup lisans eğitimlerine başlamaya hak kazanırlar. İlk aşamada 70'in altında puan alan öğrenciler ise seviyelerine göre İngilizce Hazırlık Programına yerleştirilirler; programda eğitim süresi bir akademik dönemden iki akademik yıla kadar değişir.",
      "Acıbadem Üniversitesi İngilizce Yeterlik Sınavı Bu sınavda başarılı olan öğrenciler ile eşdeğerliliği Üniversite tarafından kabul edilen yerel ve uluslararası dil sınavlarından birinden son iki yıl içerisinde TOEFL veya Pearson PTE, üç yıl içerisinde CAE, beşyıl içerisinde ise YDS - YÖKDİL geçerli puan alan öğrenciler kendi bölümlerindeki lisans derslerine katılma hakkını kazanırlar.":
        "Acıbadem Üniversitesi İngilizce Yeterlik Sınavı: Bu sınavda başarılı olan öğrenciler ile eşdeğerliliği Üniversite tarafından kabul edilen yerel ve uluslararası dil sınavlarından birinden son iki yıl içerisinde TOEFL iBT, Pearson PTE Academic veya e-TEP, üç yıl içerisinde CAE, beş yıl içerisinde ise YDS / e-YDS, Cambridge Linguaskill veya Oxford Test of English'ten geçerli puan alan öğrenciler kendi bölümlerindeki lisans derslerine katılma hakkını kazanırlar (YDS / e-YDS sonucu sunanların ayrıca yazma ve konuşma sınavlarından en az 70 alması gerekir).",
      "YDS/YÖKDİL 85 - Geçerlilik Süresi - 5 Yıl​":
        "YDS / e-YDS 85 - Geçerlilik Süresi - 5 Yıl (ayrıca yazma ve konuşma sınavlarından en az 70)",
      "Yukarıda belirtilen sınavlardan kabul edilen puanı almış olan öğrenciler, İngilizce muafiyet sınavına girmeksizin İngilizce hazırlık eğitiminden muaf sayılırlar.​​​​​​​​":
        "Yukarıda belirtilen sınavlardan kabul edilen puanı almış olan öğrenciler İngilizce hazırlık eğitiminden muaf sayılırlar; ancak YDS / e-YDS sonucu sunan öğrenciler ile TOEFL iBT sınavına yurt dışında giren öğrencilerin ayrıca yazma ve konuşma sınavlarına girerek en az 70 almaları gerekir. TOEFL iBT, PTE ve CAE için yalnız devlet üniversitelerindeki sınav merkezlerinden alınan sonuçlar geçerlidir.",
    },
    source: "acibadem.edu.tr",
    checked: CHECKED,
  },

  /* Boğaziçi — yadyok.bogazici.edu.tr "Test content and scoring" (2443): dinleme %30 · okuma %40 · yazma %30,
   * "average of at least (56) in the Writing section"; "General information" (2441): "approximately 3.5 hours",
   * "valid for two years"; eşdeğer sınavlar (2446, 12.06.2026'dan itibaren): TOEFL iBT 4,5 (genel + her bölüm),
   * IELTS Academic 6,5 (yazma 6,5), son iki yıl; 2026-27 takvimi (24.08.2026). Kaynak metinde yalnız okuma
   * bölümü eski (iki metin, ~10'ar soru; süre açıklanmıyor).
   *
   * KAYNAK METİN GÜNCELLEMESİ (müşteri kararı 2026-09-30: "Yenilerini güncelle"; yeniden doğrulama 30.09.2026) — `edits`:
   * [A] YADYOK – Sınav İçeriği ve Notlandırma (TR) —
   * https://yadyok.bogazici.edu.tr/tr/pages/sinav-icerigi-ve-notlandirma/2342 (tarihsiz (30.09.2026'da okundu))
   * [B] YADYOK – Test Content and Scoring (EN) —
   * https://yadyok.bogazici.edu.tr/en/pages/test-content-and-scoring/2443 (tarihsiz (30.09.2026'da okundu))
   * [D] Örnek BUEPT/BÜYES sınavı (sample_buept 2026.docx; 'Sınav Örneği' sayfasından:
   * https://yadyok.bogazici.edu.tr/tr/pages/sinav-ornegi/2348) —
   * https://mediastore.cc.bogazici.edu.tr/web/userfiles/files/sample_buept%202026.docx (16.04.2026 (dosya değişiklik
   * tarihi / Last-Modified))
   * - 'Arayarak Okuma 8-10 soru, 30-35 dakika' bilgisi bugünkü resmi metinde yok. Güncel anlatım bu beceriyi ayrı
   * bir kısım olarak değil 'belirli sorular' için tarif ediyor; soru sayısı bölüm geneli için 'toplamda yaklaşık 20'
   * (EN: her metin için yaklaşık 10) olarak veriliyor; süre sınav içeriği sayfasında hiç belirtilmiyor.
   * Doğrulanamayan '8-10 soru' ve '30-35 dakika' cümleden çıkarıldı (toplam soru sayısı 17. satıra taşındı). Not:
   * resmi örnek sınavda birinci okuma için süre 45 dakika, soru sayısı 11 — ama bu yalnız örnek sınavın değeri.
   * "Belirli sorularda öğrencilerin soruda geçen anahtar kelime/kelimelerden yola çıkarak metinde konunun geçtiği
   * ilgili paragrafı bulmaları ve soruyu cevaplayabilmek için o p" [A]
   * - Satır eski 'Arayarak Okuma = yalnız kısa cevap' kurgusuna dayanıyor. Bugün okuma soruları kısa cevap, çoktan
   * seçmeli ve eşleştirme olabiliyor (örnek sınavın birinci okuma metninde 11 sorunun 9'u çoktan seçmeli),
   * dolayısıyla 'sorulara kısa cevap vermek gerekmektedir' genellemesi artık doğru değil. 'Sorular metindeki bilgi
   * sırasına göredir' ifadesi okuma bölümü için hiçbir güncel resmi metinde yok (örnek sınavda bu ifade yalnız
   * dinleme için geçiyor) → cümleden çıkarıldı. Kısa ve gereksiz bilgi içermeyen cevap tavsiyesi ise resmi örnek
   * sınavda aynen duruyor. İkinci cümle (kısa cevabın dilbilgisi ölçütü) zamansız teknik tavsiye; resmi kaynakta
   * karşılığı yok ama çelişen bir şey de yok, olduğu gibi bırakıldı. "Soru tipleri kısa cevap, çoktan seçmeli ve
   * eşleştirme şeklinde olabilir." [A]
   * - 'Ayrıntılı Okuma 9-11 soru, 40-50 dakika' bilgisi bugünkü resmi metinde yok. Beceri tarifi aynen duruyor ama
   * 'ikinci kısım' olarak değil 'belirli sorular' için; soru sayısı yalnız bölüm toplamı olarak ('yaklaşık 20'; EN:
   * her metin için yaklaşık 10) veriliyor; süre sayfada belirtilmiyor → '9-11 soru' ve '40-50 dakika' çıkarıldı.
   * Not: resmi örnek sınavda ikinci okuma için süre 50 dakika — yalnız örnek sınavın değeri. "Belirli sorularda ise
   * öğrencilerin metni ayrıntılara dikkat ederek okuyup anlaması ve sorulan bilgiyi ilgili paragrafta bulduktan
   * sonra hem paragrafın kendisi hem de önce" [A]
   * - Yalnız ilk cümle eskidi: 'Soru tipleri Arayarak Okuma bölümündeki soru tiplerinden farklıdır' cümlesi güncel
   * resmi metinden kalkmış; ölçülen beceriler ve soru tipleri artık okuma bölümünün tamamı için söyleniyor. Satırın
   * geri kalanı resmi metinle birebir aynı. "Bu sorular, metindeki ana fikirleri ve önemli detayları anlama,
   * yorumlama, paragrafta tartışılan düşüncelerarası ilişki kurabilme ve bu düşünceler öncesi ve sonrasındaki " [A]
   * DEĞİŞTİRİLMEDİ (doğrulanamadı / resmi kaynaklar çelişiyor — docs/bekleyen-sorular.md): 'İki kısım' doğrulanıyor,
   * ama kısımların ADI konusunda resmi kaynak kendi içinde tutarsız. Sınav içeriği paragrafı (TR) kısımları
   * adlandırmıyor ve bek */
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
        answer: "BUEPT'i geçmek için dinleme ve okuma bölümlerinin toplamında %60 başarı ve yazma bölümünde en az 56 ortalama gerekir; bu iki koşulu sağlayanların genel notu 60'a denk gelir.",
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
        detail: ["Başvuru bilgileri sınavdan yaklaşık iki hafta önce YADYOK duyurularında yayımlanır. Bu adayların parçalı geçme hakkı yoktur; sınavın tamamını geçmeleri gerekir. TOEFL iBT ya da IELTS Academic'te genel puanı tutturup yalnız yazma puanı eksik kalanlar sadece yazma (TWE) bölümüne girebilir."],
      },
    ],
    caveat: null,
    edits: {
      // yadyok.bogazici.edu.tr "Test content and scoring" (EN): "two reading texts", metin başına yaklaşık 10 soru — kısım adları güncel içerik paragrafında yok.
      "Okuduğunu Anlama bölümü, Arayarak Okuma (Search Reading) ve Ayrıntılı Okuma (Careful Reading) olarak iki kısımdan oluşmaktadır.":
        "Okuduğunu Anlama bölümü, her birinde yaklaşık 10 soru bulunan iki okuma metninden oluşmaktadır.",
      "Arayarak Okuma kısmında, öğrenciler önce soruyu okurlar. Ardından, soruda geçen anahtar kelime/kelimelerden yola çıkarak metinde konunun geçtiği ilgili paragrafı bulmalıdır. Soruyu cevaplayabilmek için o paragrafı dikkatlice okumaları gerekmektedir. Arayarak Okuma bölümü, 8-10 sorudan oluşur ve bu kısım için toplam süre 30-35 dakikadır.":
        "Belirli sorularda öğrenciler önce soruyu okurlar. Ardından, soruda geçen anahtar kelime/kelimelerden yola çıkarak metinde konunun geçtiği ilgili paragrafı bulmalıdır. Soruyu cevaplayabilmek için o paragrafı dikkatlice okumaları gerekmektedir.",
      "Sorular metindeki bilgi sırasına göredir ve sorulara kısa cevap vermek gerekmektedir. Kısa cevap verirken dikkat edilmesi gereken husus, soru neyi soruyorsa sadece onu yazmak, gereksiz bilgi eklememektir. Ayrıca, cevabın uzun versiyonu düşünüldüğünde, yani bütün bir cümle şeklinde cevaplandığında nasıl bir dilbilgisi yapısı ve anlam bütünlüğü içinde olması gerekiyorsa kısa cevap, bu kıstas gözönünde bulundurularak oluşturulmalıdır.":
        "Kısa cevap gerektiren sorularda dikkat edilmesi gereken husus, soru neyi soruyorsa sadece onu yazmak, gereksiz bilgi eklememektir. Ayrıca, cevabın uzun versiyonu düşünüldüğünde, yani bütün bir cümle şeklinde cevaplandığında nasıl bir dilbilgisi yapısı ve anlam bütünlüğü içinde olması gerekiyorsa kısa cevap, bu kıstas gözönünde bulundurularak oluşturulmalıdır.",
      "İkinci kısım olan Ayrıntılı Okuma'da, öğrencilerin metni ayrıntılara dikkat ederek okuyup anlaması ve sorulan bilgiyi ilgili paragrafta bulduktan sonra hem paragrafın kendisi hem de öncesi ve sonrasındaki paragrafların anlam bütünlüğü içinde değerlendirmesi yoluyla soruları cevaplandırmaları beklenmektedir. Ayrıntılı Okuma bölümü 9-11 sorudan oluşur ve bu kısım için toplam süresi 40-50 dakikadır.":
        "Belirli sorularda ise öğrencilerin metni ayrıntılara dikkat ederek okuyup anlaması ve sorulan bilgiyi ilgili paragrafta bulduktan sonra hem paragrafın kendisi hem de öncesi ve sonrasındaki paragrafların anlam bütünlüğü içinde değerlendirmesi yoluyla soruları cevaplandırmaları beklenmektedir. Okuduğunu Anlama bölümü toplamda yaklaşık 20 sorudan oluşur.",
      "Soru tipleri Arayarak Okuma bölümündeki soru tiplerinden farklıdır. Bu sorular, metindeki ana fikirleri ve önemli detayları anlama, yorumlama, paragrafta tartışılan düşüncelerarası ilişki kurabilme ve bu düşünceler öncesi ve sonrasındaki paragraflar, hatta metnin bütünü ile ilişkilendirebilme becerilerini ölçmektedir. Soru tipleri kısa cevap, çoktan seçmeli ve eşleştirme şeklinde olabilmektedir.":
        "Okuduğunu Anlama bölümündeki sorular, metindeki ana fikirleri ve önemli detayları anlama, yorumlama, paragrafta tartışılan düşüncelerarası ilişki kurabilme ve bu düşünceler öncesi ve sonrasındaki paragraflar, hatta metnin bütünü ile ilişkilendirebilme becerilerini ölçmektedir. Soru tipleri kısa cevap, çoktan seçmeli ve eşleştirme şeklinde olabilmektedir.",
    },
    source: "bogazici.edu.tr",
    checked: CHECKED,
  },

  /* Sabancı — sl.sabanciuniv.edu "ELAE face to face": "two stages administered on separate days", yazma %30 ·
   * dinleme %30 · okuma %40, "minimum grade of 70 out of 100", telafi yok; bölüm dökümü (resmi PDF, 05.09.2024):
   * skimming %15 (15-20 dk), ayrıntılı okuma %25 (50-60 dk, 5+5+6 soru); muafiyet (sabanciuniv.edu/en/exemption-fdy):
   * TOEFL iBT 85 / yeni ölçek 4,5 · PTE 71 (her bölüm 67) · CAE/CPE C · YDS 90.
   *
   * KAYNAK METİN GÜNCELLEMESİ (müşteri kararı 2026-09-30; yeniden doğrulama 30.09.2026) — `edits`:
   *   - ELAE sayfası https://sl.sabanciuniv.edu/en/elae-0 ("…/elae-face-to-face" artık 404): iki aşama, 70/100.
   *   - Bölüm dökümü PDF'i (05.09.2024) https://sl.sabanciuniv.edu/sites/sl.sabanciuniv.edu/files/inline-files/link-1-kisa-kutulu-bilgi-revised.pdf:
   *     dinleme öncesi "3-5 minutes before listening"; "Part 1 Skimming (15%)", "15-20 minutes."; ayrıntılı okuma
   *     (%25) "50-60 min.", "5 questions on Text A", "5 questions on Text B", "6 questions on synthesis, collation".
   *   - 1. Aşama yazma örneği https://sl.sabanciuniv.edu/sites/sl.sabanciuniv.edu/files/2022-12/section_3-writing.pdf:
   *     "30 minutes", "write a 200 word composition" (kaynaktaki 250-300 hiçbir resmi sayfada yok).
   *   - Muafiyet https://www.sabanciuniv.edu/en/exemption-fdy: TOEFL iBT "85 - 4,5*", "Examinations Taken After
   *     January 21, 2026: 4.5", "(MyBest scores are not accepted)"; "ELAE Stage 2 … 2 years 70".
   * Kaynak metindeki "okuma toplam 85 dk" ve "dinleme toplam 25 dk" yalnız 2006 tarihli örnek kâğıtlara dayanıyor ve
   * güncel bölüm süreleriyle (15-20 + 50-60 dk; kayıtlar 14-16 + 15-18 dk) bağdaşmıyor → toplam cümlesi çıkarıldı.
   * DEĞİŞTİRİLMEDİ (doğrulanamadı / resmi belgeler çelişiyor — docs/bekleyen-sorular.md): not alma bölümünde "cevap
   * için 15 dakika" (2024 PDF'i 5 dk, 2006 örnek kâğıdı 15 dk), "20-30 paragraf", "bir defa dinletilir", 1. Aşama
   * "Grammar 40 soru" (deneme sınavında 80 madde). */
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
    caveat: null,
    edits: {
      // Resmi kaynaklar çelişince EN YENİSİ (05.09.2024 bölüm dökümü: note-taking "1 minute before list to read headings", "5 minutes after listening to answer questions") esas alındı; 15 dk yalnız 2006 örnek kâğıdında.
      "Dinleme başlamadan önce, note-taking başlıklarını okumanız için bir dakika süre verilir. Dinleme sonunda kısa cevaplı ya da boşluk doldurmalı 8-12 soruya cevap verilir. Soruları cevaplamak için verilen süre 15 dakikadır. Bu bölümün sınavda ağırlığı % 17'dir.":
        "Dinleme başlamadan önce, note-taking başlıklarını okumanız için bir dakika süre verilir. Dinleme sonunda kısa cevaplı ya da boşluk doldurmalı 8-12 soruya cevap verilir. Soruları cevaplamak için verilen süre 5 dakikadır. Bu bölümün sınavda ağırlığı % 17'dir.",
      "Toplam süre 25 dakikadır. Bu bölümün sınavda ağırlığı % 30'dur. İki bölümden oluşur:": "Bu bölümün sınavda ağırlığı % 30'dur. İki bölümden oluşur:",
      "Listening'in bu bölümü bir üniversite öğrencisi ve öğretmeninin bir ödev konusu hakkında yaptıkları, 14-16 dakika süren karşılıklı konuşmalardan oluşmaktadır. Sadece bir defa dinletilir. Dinleme başlamadan önce öğrencilere soruları incelemeleri için 3 dakika süre verilir. Dinleme sonunda sorulan kısa cevaplı ya da boşluk doldurmalı 10-12 soruya cevap verilir. Bu bölümün sınavda ağırlığı % 13'tür.":
        "Listening'in bu bölümü bir üniversite öğrencisi ve öğretmeninin bir ödev konusu hakkında yaptıkları, 14-16 dakika süren karşılıklı konuşmalardan oluşmaktadır. Sadece bir defa dinletilir. Dinleme başlamadan önce öğrencilere soruları incelemeleri için 3-5 dakika süre verilir. Dinleme sonunda sorulan kısa cevaplı ya da boşluk doldurmalı 10-12 soruya cevap verilir. Bu bölümün sınavda ağırlığı % 13'tür.",
      "Toplam süre 85 dakikadır. Bu bölümün sınavda ağırlığı % 40'tır. İki bölümden oluşmaktadır:":
        "Bu bölümün sınavda ağırlığı % 40'tır. İki bölümden oluşmaktadır: hızlı okuma (skimming) 15-20 dakika, ayrıntılı okuma 50-60 dakika sürer.",
      "Metindeki paragrafları verilen başlıklarla eşleştirmeden oluşan 7-9 soru sorulur. Genellikle verilen metinler 20-30 paragraftan oluşur. Bu bölümde verilen süre 20 dakikadır. Bu bölümün sınavda ağırlığı % 25'tir.":
        "Metindeki paragrafları verilen başlıklarla eşleştirmeden oluşan 7-9 soru sorulur. Genellikle verilen metinler 20-30 paragraftan oluşur. Bu bölümde verilen süre 15-20 dakikadır. Bu bölümün sınavda ağırlığı % 15'tir.",
      "Bu bölümde verilen süre 65 dakikadır. Üç görevden (Task) oluşmaktadır: Task 1 ve 2 de verilen her bir metinle ilgili 3-5 soru sorulmaktadır. Task 3'te Text A ve B'deki bazı önemli bilgilerden yola çıkılarak hazırlanmış bir metni tamamlamanız istenir.":
        "Bu bölümde verilen süre 50-60 dakikadır; sınavdaki ağırlığı % 25'tir. Üç görevden (Task) oluşmaktadır: Task 1 ve 2'de verilen her bir metinle ilgili 5'er soru sorulmaktadır. Task 3'te Text A ve B'deki bilgileri bir araya getirmenizi isteyen 6 soru yer alır.",
      "Bu bölüm verilen konu ile ilgili 250-300 kelimelik bir kompozisyon yazma (essay writing) faaliyetinden oluşur.":
        "Bu bölüm verilen konu ile ilgili yaklaşık 200 kelimelik bir kompozisyon yazma (essay writing) faaliyetinden oluşur.",
      "Toplam süre 30 dakikadır. 250-300 kelimelik bir kompozisyon standart el yazısıyla yaklaşık bir sayfa yazılması istenir.":
        "Toplam süre 30 dakikadır. Yaklaşık 200 kelimelik bir kompozisyon yazılması istenir.",
      "TOEFL IBT / En az 80 Puan / 2 yıl süre / (MyBest Scores kabul edilememektedir)":
        "TOEFL IBT / En az 85 puan; 21 Ocak 2026'dan sonra girilen sınavlarda 1–6 ölçeğinde 4,5 / 2 yıl süre / (MyBest Scores kabul edilmemektedir)",
      "ELAE 2. Aşama / 70 Puan": "ELAE 2. Aşama / 70 Puan / 2 yıl süre",
    },
    source: "sabanciuniv.edu",
    checked: CHECKED,
  },

  /* Özyeğin — ozyegin.edu.tr "TRACE": "must score at least 65", okuma 60 dk 35 soru, dinleme ~35 dk 20 soru,
   * yazma ~250 kelime 50 dk; örnek sayfa: %30 / %30 / %40; dil yeterlik koşulu: düzey belirleme 60/100, iki yıl
   * geçerlilik, muafiyet tablosu (24.09.2026): TOEFL iBT 80 · PTE 62 · YDS 86 · CAE/CPE C · FCE B; 2026-27 takvimi.
   * Kaynak metin (4 bölüm, 400-450 kelime, bölüm alt puanları) eskimiş.
   *
   * KAYNAK METİN GÜNCELLEMESİ (müşteri kararı 2026-09-30: "Yenilerini güncelle"; yeniden doğrulama 30.09.2026) — `edits`:
   * [A] TRACE (İngilizce Hazırlık Programı > TRACE) — Türkçe sayfa —
   * https://www.ozyegin.edu.tr/tr/ingilizce-hazirlik-programi/trace (tarihsiz (30.09.2026'da açılıp okundu))
   * [B] TRACE — İngilizce sayfa — https://www.ozyegin.edu.tr/en/preparatory-english-program/trace (tarihsiz
   * (30.09.2026'da açılıp okundu))
   * [C] Practice Trace Example (örnek sınav sayfası; bölüm ağırlıkları ve süreleri) —
   * https://www.ozyegin.edu.tr/tr/ingilizce-hazirlik-programi/trace/practice-trace-example (tarihsiz; bağlı örnek
   * kitapçık PDF'leri 12.07.2025 tarihli)
   * [D] İngilizce Dil Yeterlik Koşulu (Öğrenci Hizmetleri > Başvuru - Kabul) —
   * https://www.ozyegin.edu.tr/tr/ogrenci-hizmetleri/basvuru-kabul/dil-yeterlik-kosulu (tarihsiz (30.09.2026'da
   * açılıp okundu))
   * [F] ScOLa İngilizce Hazırlık Programı 2026-2027 Akademik Yılı Öğrenci El Kitabı (PDF) —
   * https://www.ozyegin.edu.tr/sites/default/files/upload/Scola/scola_ogrenci_el_kitabi_2026-2027.pdf (14.09.2026
   * (PDF oluşturma tarihi))
   * [I] Yabancı Diller Yüksekokulu İngilizce Hazırlık Programı Eğitim ve Öğretim Yönetmeliği (ScOLa menüsünden bağlı
   * PDF) —
   * https://www.ozyegin.edu.tr/sites/default/files/upload/OgrenciHizmetleri/06.07.2020_yabanci_diller_yuksekokulu_yonetmeligi.pdf
   * (Resmi Gazete 06.07.2020)
   * [L] TRACE Sample — Reading booklet (örnek okuma kitapçığı) —
   * https://www.ozyegin.edu.tr/sites/default/files/upload/Scola/reading_booklet_website_sample_trace_new.pdf
   * (12.07.2025)
   * - 'İleri düzey' adlandırması kalktı; hazırlık programı artık dört düzey ve son düzeyin adı 'Düzey 4 (Akademik
   * Gelişim 2)'. 2025-26 el kitabında 'B2 düzeyi' yazıyordu, 2026-27 el kitabında 'Düzey 4' oldu. Not: 2020 tarihli
   * yönetmelik (I) hâlâ 'B2 (ileri)' diyor ama güncellenmemiş eski metin. "İngilizce Düzey Belirleme Sınavında
   * başarılı olan veya Düzey 4 (Akademik Gelişim 2) seviyesini başarıyla tamamlayan öğrenciler, TRACE sınavına
   * girmeye hak kazanırlar." [A]
   * - 'TRACE'e Hazırlık' bölümü güncel sınavda yok; bölüm listesi Okuma, Dinleme, Yazma. (Yalnız eski çevrimiçi
   * TRACE sayfasında — kaynak J — 'Giriş' bölümü hâlâ anlatılıyor; bkz. unresolved.) "Sınav üç bölümden
   * oluşmaktadır: 1. Bölüm: Okuma 2. Bölüm: Dinleme 3. Bölüm: Yazma" [A]
   * - Notlandırılmayan 'TRACE'e Hazırlık' bölümü güncel sınav tanımında (A, B, F) yer almıyor; karşılığı yok. "Sınav
   * üç bölümden oluşmaktadır: 1. Bölüm: Okuma 2. Bölüm: Dinleme 3. Bölüm: Yazma" [A]
   * - 18. satırın devamı; kaldırılmış bölümü anlatıyor. "Sınav üç bölümden oluşmaktadır:" [A]
   * - 'Dört alt bölüm' ifadesi kalktı; resmi tanım üç okuma metni (60 dk, toplam 35 soru). "Sınavın bu bölümünde üç
   * okuma metni bulunmaktadır." [A]
   * - Kısa metin sayısı ikiden bire indi (toplam 3 metin); uzunluk sınırı (en fazla 250 kelime) aynı. "Birincisi
   * kısa bir metindir (en fazla 250 kelime)." [A]
   * - Metinler arası karşılaştırma soruları hâlâ var (2026-27 el kitabı; örnek sınavda 33-35. sorular) ama ayrı bir
   * 'dördüncü bölüm' olarak tanımlanmıyor; yalnız 'Dördüncü bölüm' ifadesi çıkarıldı. "Okuma bölümü sorularının son
   * kısmında öğrencilerin okudukları tüm metinleri karşılaştırarak cevaplamaları gereken sorular bulunmaktadır." [F]
   * - Ders metninin süresi 14-15 dakikadan yaklaşık 10 dakikaya indi; işleyiş (önce dinle-not al, sonra soruları
   * gör) aynı. "Birinci kısım yaklaşık 10 dakikalık bir ders metnidir. Öğrencilerin metni dinlerken aynı zamanda not
   * tutmaları gerekmektedir." [A]
   * - 'Bir veya iki adet söyleşi' yerine artık tek söyleşi (yaklaşık 10 dk). Soruların önce görülmesi 2026-27 el
   * kitabında teyitli; not tutulmaması aynı. "İkinci kısım ise yaklaşık 10 dakikalık bir söyleşiyi içermektedir. Bu
   * bölümde öğrenciler söyleşiyi dinleyecekler ve aynı süre içerisinde söyleşi ile ilgili sınav soruları" [A]
   * - 400-450 kelimelik kompozisyon yerine yaklaşık 250 kelimelik akademik paragraf isteniyor (süre 50 dk).
   * "Öğrencilerin yaklaşık 250 kelimeden oluşan akademik bir paragraf* yazarak bu soruyu cevaplandırmaları
   * istenecektir. Yazma bölümü 50 dakikadır." [A]
   * - Şart sürüyor; yalnız üniversitenin atıf yaptığı fıkra numarası değişti (3. fıkra → 2. fıkra). ÖSYM
   * yönergesinin kendisi kapsam dışı olduğu için açılmadı; üniversite sayfasındaki atıf esas alındı. "ÖSYM'nin
   * Yabancı Dil Sınavları Eşdeğerliklerini Belirleme Yönergesi 6. madde 2. fıkra (d) bendi uyarınca, sınavın
   * Türkiye'de yapılması hâlinde devlet üniversitelerine ait" [D]
   * DEĞİŞTİRİLMEDİ (doğrulanamadı / resmi kaynaklar çelişiyor — docs/bekleyen-sorular.md): 550 toplam puan ve 2 yıl
   * her iki kaynakta aynı. Çelişki 'yazılı bölümden en az 4' alt şartında: daha YENİ olan Dil Yeterlik Koşulu
   * tablosu (E, 24.09.2; 80 toplam puan ve 2 yıl her iki kaynakta aynı. Çelişki 'her bölümden en az 20' alt
   * şartında: daha YENİ tablo (E, 24.09.2026) yazmıyor; K (17.08.2026) ; 62 puan ve 2 yıl her iki kaynakta aynı.
   * Çelişki 'her bölümden en az 59' alt şartında: daha YENİ tablo (E, 24.09.2026) yazmıyor; K (17.08.2026) hâlâ ya;
   * En az 86 puan her kaynakta aynı. Geçerlilik süresi çelişkili: daha YENİ tablo (E, 24.09.2026) bizim satırdaki
   * gibi 5 yıl diyor; K (17.08.2026) TOEFL/P */
  "ozyegin-universitesi": {
    exam: "TRACE",
    parts: [
      { name: "Okuma", note: "3 metin · 35 soru · 60 dk", weight: 30, weightLabel: "%30" },
      { name: "Dinleme", note: "ders + söyleşi · 20 soru · ~35 dk", weight: 30, weightLabel: "%30" },
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
        answer: "İngilizce düzey belirleme sınavından 100 üzerinden en az 60 alan ya da hazırlıkta Düzey 4'ü (Akademik Gelişim 2) başarıyla tamamlayan öğrenciler girebilir.",
        detail: ["Düzey belirleme sınavı 50 dakikada 70 çoktan seçmeli sorudan oluşur. Düzey 4'ü 80 ve üzeri ortalamayla bitiren öğrenciler TRACE'e girmeden lisans programına başlar."],
      },
      {
        question: "TOEFL, PTE ya da YDS ile Özyeğin hazırlık muafiyeti mümkün mü?",
        answer: "Evet; TOEFL iBT'den en az 80, PTE Academic'ten en az 62, YDS / e-YDS'den en az 86 ile muaf olunabilir.",
        detail: ["TOEFL ve PTE iki yıl, Cambridge sınavları üç yıl, YDS beş yıl geçerlidir. Sınav Türkiye'de yapıldıysa devlet üniversitelerine ait binalarda yapılmış olması şartı aranır."],
      },
      {
        question: "TRACE ne zaman yapılır?",
        answer: "TRACE akademik takvimde ilan edilen tarihlerde yapılır; 2026-2027 takviminde dört sınav tarihi vardır.",
        detail: ["2026-2027 takviminde sınav tarihleri 8 Eylül 2026, 11 Ocak 2027, 27 Mayıs 2027 ve 25 Ağustos 2027'dir."],
      },
    ],
    caveat: null,
    edits: {
      // Resmi kaynaklar çelişince EN YENİSİ esas alındı: Dil Yeterlik Koşulu muafiyet tablosu (24.09.2026) yalnız toplam puan yazıyor, bölüm alt puanı yok (17.08.2026 uluslararası öğrenci el kitabı eski alt puanları taşıyor).
      "TOEFL PBT / En az 550 toplam puan, yazılı bölümden en az 4 puan / 2 yıl süre":
        "TOEFL PBT / En az 550 toplam puan / 2 yıl süre",
      "TOEFL IBT / En az 80 toplam puan ve her bölümden en az 20 puan / 2 yıl süre":
        "TOEFL IBT / En az 80 toplam puan / 2 yıl süre",
      "Pearson PTE Academic / En az 62 puan ve her bölümden en az 59 puan / 2 yıl süre":
        "Pearson PTE Academic / En az 62 puan / 2 yıl süre",
      "İngilizce düzey belirleme sınavında başarılı olan veya ileri düzeyi tamamlayan öğrenciler, TRACE sınavına girmeye hak kazanmış olurlar.":
        "İngilizce düzey belirleme sınavında başarılı olan veya Düzey 4 (Akademik Gelişim 2) seviyesini başarıyla tamamlayan öğrenciler, TRACE sınavına girmeye hak kazanmış olurlar.",
      "Bölüm: TRACE'e Hazırlık":
        null,
      "Bu bölümün amacı öğrencilere sınavın içeriğini oluşturan konu başlığını tanıtmak ve öğrencilerin konu başlığı ile ilgili bilgi ve düşüncelerini gözden geçirmelerine fırsat vermektir. Bu bölümde öğrencilerden sınavın konu başlığı ile ilgili grafik, çizelge, veya resimlere bakarak not tutmaları istenecektir.":
        null,
      "Böylelikle öğrenciler, sınavın içeriğini oluşturan konu ile ilgili varolan bilgi ve düşüncelerini gözden geçirerek, sınavın sonraki bölümlerine hazırlanacaklardır. Bu bölüm notlandırılmayacaktır.":
        null,
      "Sınavın bu bölümü dört alt bölümden oluşmaktadır.":
        "Sınavın bu bölümünde üç okuma metni bulunmaktadır.",
      "Birinci alt bölüm iki adet kısa okuma parçasını içermektedir, her okuma parçası en fazla 250 kelimedir.":
        "Birinci alt bölüm kısa bir okuma parçasını içermektedir; okuma parçası en fazla 250 kelimedir.",
      "Dördüncü bölüm okuma bölümünün son kısmı ise öğrencilerin okudukları tüm okuma parçalarını karşılaştırarak cevaplandırmaları gereken sorulardan oluşmaktadır.":
        "Okuma bölümünün son kısmı ise öğrencilerin okudukları tüm okuma parçalarını karşılaştırarak cevaplandırmaları gereken sorulardan oluşmaktadır.",
      "Birinci kısım 14-15 dakikalık bir ders metnidir. Öğrencilerin metni dinlerken aynı zamanda not tutmaları gerekmektedir. Bu bölümde öğrenciler, önce metni dinleyecekler, sonra metin ile ilgili soruları göreceklerdir. Daha sonra ise metni dinlerken tuttukları notları kullanarak sınav sorularını cevaplandıracaklardır.":
        "Birinci kısım yaklaşık 10 dakikalık bir ders metnidir. Öğrencilerin metni dinlerken aynı zamanda not tutmaları gerekmektedir. Bu bölümde öğrenciler, önce metni dinleyecekler, sonra metin ile ilgili soruları göreceklerdir. Daha sonra ise metni dinlerken tuttukları notları kullanarak sınav sorularını cevaplandıracaklardır.",
      "İkinci kısım bir veya iki adet söyleşiyi içermektedir. Bu bölümde öğrenciler önce söyleşiler ile ilgili sınav sorularını göreceklerdir. Daha sonra da söyleşileri dinleyecekler ve aynı süre içerisinde söyleşiler ile ilgili sınav sorularını cevaplandıracaklardır. Bu bölümde öğrencilerin not tutmaları gerekmemektedir.":
        "İkinci kısım yaklaşık 10 dakikalık bir söyleşiyi içermektedir. Bu bölümde öğrenciler önce söyleşi ile ilgili sınav sorularını göreceklerdir. Daha sonra da söyleşiyi dinleyecekler ve aynı süre içerisinde söyleşi ile ilgili sınav sorularını cevaplandıracaklardır. Bu bölümde öğrencilerin not tutmaları gerekmemektedir.",
      "Sınavın son bölümünde öğrencilere sınav içeriğini oluşturan konu başlığı ile ilgili bir soru sorulacaktır. Öğrencilerin 400-450 kelimeden oluşan akademik bir kompozisyon yazarak bu soruyu cevaplandırmaları istenecektir.":
        "Sınavın son bölümünde öğrencilere sınav içeriğini oluşturan konu başlığı ile ilgili bir soru sorulacaktır. Öğrencilerin yaklaşık 250 kelimeden oluşan akademik bir paragraf yazarak bu soruyu cevaplandırmaları istenecektir.",
      "ÖSYM tarafından yayınlanan Yabancı Dil Sınavları Eşdeğerliklerini Belirleme Yönergesi 6. madde 3. fıkra d bendi uyarınca uluslararası bir yabancı dil sınavına eşdeğerlik verilmesinde ve sürdürülmesinde sınavın Türkiye’de yapılıyor olması halinde devlet üniversitelerine ait binalarda yapılması şartı bulunmaktadır.":
        "ÖSYM tarafından yayınlanan Yabancı Dil Sınavları Eşdeğerliklerini Belirleme Yönergesi 6. madde 2. fıkra d bendi uyarınca uluslararası bir yabancı dil sınavına eşdeğerlik verilmesinde ve sürdürülmesinde sınavın Türkiye’de yapılıyor olması halinde devlet üniversitelerine ait binalarda yapılması şartı bulunmaktadır.",
    },
    source: "ozyegin.edu.tr",
    checked: CHECKED,
  },

  /* İTÜ — ydy.itu.edu.tr "Yeterlik sınavı" (1. oturum 120 dk / 50 puan: dil kullanımı 14 + okuma 36; 2. oturum
   * 135 dk / 50 puan: yazma 30 + dinleme 20; "ikinci aşamaya yalnızca … 25/50"), sis.itu.edu.tr geçerli sınavlar
   * (Senato 22.01.2026): TOEFL iBT 4 (21.01.2026 sonrası) · PTE 59 (2026-27 güz'den) · OTE Advanced 111 · e-Tep 74,
   * 2 yıl; hazırlık akademik takvimi 2026-27. Kaynak metin (45 soru, 60/40 puan, 30/20 eşik, üç konu, ay listesi) eskimiş.
   *
   * KAYNAK METİN GÜNCELLEMESİ (müşteri kararı 2026-09-30: "Yenilerini güncelle"; yeniden doğrulama 30.09.2026) — `edits`:
   * [A] İTÜ Yabancı Diller Yüksekokulu — Lisans Hazırlık Programı > Yeterlik Sınavı —
   * https://ydy.itu.edu.tr/programlar/lisans-hazirlik-programi/yeterlik-sinavi (tarihsiz (30.09.2026'da açılıp
   * okundu))
   * [B] İTÜ Öğrenci İşleri Daire Başkanlığı — Geçerli İngilizce Sınavlar ve Minimum Puanları (Üniversite Senatosu,
   * Sayı 776) — https://www.sis.itu.edu.tr/TR/mevzuat/ingilizce-gecerli-sinavlar.php (08.07.2021 (sayfadaki en yeni
   * değişiklik notu: 22.01.2026 günlü ve 903 sayılı Senato kararı))
   * [C] İTÜ YDY — Hazırlık Sınıfları Akademik Takvimi (2026-2027; tablo satırları, hücreler ' | ' ile ayrılarak
   * alıntılandı) — https://ydy.itu.edu.tr/hazirlik-siniflari-akademik-takvimi (tarihsiz (2026-2027 takvimi;
   * 30.09.2026'da okundu))
   * [D] İTÜ ÖİDB — İngilizce Hazırlık Akademik Takvimi, 2026-2027 Eğitim-Öğretim Yılı —
   * https://www.takvim.sis.itu.edu.tr/AkademikTakvim/TR/akademik-takvim/index.php?takvimadi=18 (tarihsiz (2026-2027;
   * 30.09.2026'da okundu))
   * [G] İTÜ YDY — Örnek Sınav (sample-exam.zip: 'Session 1.pdf' ve 'Session 2.pdf'; 'Sınav Örneği ve Analizi'
   * sayfasından bağlantılı) —
   * https://ydy.itu.edu.tr/docs/librariesprovider95/default-document-library/sample-exam.zip?sfvrsn=dd1e5654_0
   * (31.10.2022 (PDF oluşturma tarihi))
   * - Yılda dört sınav hâlâ doğru; aylar değişti. 2026-27 takviminde oturumlar 9/11 Eylül 2026, 15/18 Ocak 2027,
   * 26/28 Mayıs 2027, 9/12 Ağustos 2027. Haziran ve Temmuz'da sınav yok (aylar yıldan yıla oynuyor: 2025-26'da
   * Haziran ve Ağustos'tu), bu yüzden cümle akademik yıla bağlandı. "09 Eylül 2026 : İngilizce Yeterlik Sınavı
   * (1.Oturum)" [D]
   * - Eski: 15 restatement + 30 okuma = 45 soru. Güncel: 10 metin tamamlama + 9 anlamca en yakın cümle + 24 okuma.
   * 43 toplamı resmi sayfada yazmıyor; 10+9+24'ün toplamıdır ve resmi örnek sınavda 1. oturumun son sorusu 43
   * numaradır. "Bu bölüm Metin Tamamlama ve Anlamca En Yakın Cümleyi Bulma başlıklı iki alt bölümden oluşur." [A]
   * - Süre (120 dk) aynı; birinci aşamanın toplam puanı 60'tan 50'ye indi (Dil Kullanımı 14 + Okuma 36). "İTÜ
   * İngilizce Yeterlik Sınavı 1. Aşama (120 dakika)" [A]
   * - Birinci aşama barajı 30/60'tan 25/50'ye değişti. Resmi sayfa lisans / yüksek lisans ayrımı yapmadan tek baraj
   * veriyor. "Sınav 2 aşamadan oluşur ve ikinci aşamaya yalnızca birinci aşamadan yeterli puanı (25/50) alan
   * öğrenciler girebilir." [A]
   * - 10 dinleme sorusu ve kompozisyon hâlâ var; yazma bölümüne Entegre Yazma alt bölümü eklendi (eski metinde yok).
   * "Sınavın bu bölümü Kompozisyon ve Entegre Yazma başlıklı iki alt bölümden oluşur." [A]
   * - İkinci aşama 90 dk / 40 puandan 135 dk / 50 puana çıktı (Yazma 30 + Dinleme 20). "İTÜ İngilizce Yeterlik
   * Sınavı 2. Aşama (135 dakika)" [A]
   * - İkinci aşama barajı 20/40'tan 25/50'ye değişti. Toplam puanlar (lisans 60, yüksek lisans 65) aynı; güncel
   * tabloda ikinci öğretim tezsiz yüksek lisans için ayrıca 55 puan var, doktora için İTÜ sınavı sütunu boş ('-').
   * "Öğrencilerin sınavda başarılı sayılabilmesi için ikinci aşama puanlarının da en az 25/50 olması gerekmektedir."
   * [A]
   * - Restatement artık 9 soru x 1 puan = 100 üzerinden 9 puan (eski: 15 soru / %15). %9 resmi sayfada yüzde olarak
   * yazmıyor, 9 puandan türetildi. İlk cümle ('bir sonraki sınavda birinci aşamadan başlar') için resmi kaynakta
   * açık bir hüküm bulunamadı: YDY sınav sayfası, SSS, yönetmelik ve Eylül 2026 duyuruları tarandı; birinci aşama
   * puanının sonraki sınava taşındığına dair de hiçbir ifade yok, her sınav takvimde 1. ve 2. oturum olarak ayrı
   * ilan ediliyor. Cümle değiştirilmeden bırakıldı. "Anlamca En Yakın Cümleyi Bulma alt bölümü her biri 1 puan
   * değerinde olan 9 çoktan seçmeli sorudan oluşur." [A]
   * - Okuma bölümünün ağırlığı 45 puandan (30 x 1,5) 36 puana (24 x 1,5) indi. "Bu bölüm 24 çoktan seçmeli sorudan
   * oluşur. Her soru 1,5 puan değerinde olup bu bölümün sınav içindeki toplam ağırlığı 36 puandır." [A]
   * - Eski: 3–5 parça, parça başına 7–10 soru. Güncel: tam 3 metin, toplam 24 soru. 'Çoğunluğu bilimsel' ifadesi ve
   * parça başına soru aralığı resmi sayfada yok, cümleden çıkarıldı (resmi örnek sınavda dağılım 7 + 8 + 9, ama bu
   * tek bir örnek; kural olarak yazılmadı). "Bu bölümde farklı uzunluklarda (500-900 sözcük) özgün/yarı-özgün 3
   * metin vardır." [A]
   * - Dinlemede soru başına 2 puan doğru. Yazma bölümü artık 30 puan: kompozisyon 20 (değişmedi) + yeni eklenen
   * entegre yazma 10. "Yazma bölümünün toplam ağırlığı 30 puandır." [A]
   * - 250–350 kelime aynı. Konu sayısı 3'ten 2'ye indi; 'Karşılaştırma' tipi artık sayılmıyor, yerine görüş bildirme
   * (argümana dair kişisel görüş) var. "Kompozisyon alt bölümünde öğrenciler verilen 2 sorudan birini seçerek
   * 250-350 kelimeden oluşan akademik bir kompozisyon* yazarlar. Öğrencilerden bir konunun nedenlerini y" [A] */
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
          "Her iki aşamadan da en az 25 / 50 almak şarttır. 60–74 arası alan öğrenciler bölümlerinde ayrıca ING 100 dersini alır; tezli ve birinci öğretim tezsiz yüksek lisans için gereken puan 65, ikinci öğretim tezsiz yüksek lisans için 55'tir.",
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
          "21 Ocak 2026 sonrası girilen TOEFL iBT sınavlarında en az 4 (daha önce girilenlerde 72), 2026-2027 güz döneminden itibaren PTE Akademik'te en az 59, OTE Advanced'da en az 111, e-Tep'te en az 74 aranır; sonuçlar 2 yıl geçerlidir. TOEFL iBT, PTE Akademik ve OTE Advanced sonuçları devlet üniversitelerindeki sınav merkezlerinden alınmış olmalıdır.",
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
    caveat: null,
    edits: {
      "İTÜ Proficiency sınavı yılda dört kere Eylül, Ocak, Haziran ve Temmuz aylarında yapılmaktadır.":
        "İTÜ Proficiency sınavı, 2026-2027 hazırlık akademik takvimine göre yılda dört kere Eylül, Ocak, Mayıs ve Ağustos aylarında yapılmaktadır.",
      "Sınavın birinci aşaması, 15 (Restatement) başka kelimelerle anlatım ve 30 (Reading Comprehension) okuduğunu anlama olmak üzere 45 çoktan seçmeli sorudan oluşur.":
        "Sınavın birinci aşaması, 10 (Cloze Test) metin tamamlama, 9 (Restatement) başka kelimelerle anlatım ve 24 (Reading Comprehension) okuduğunu anlama olmak üzere 43 çoktan seçmeli sorudan oluşur.",
      "Sınavın süresi 120 dakikadır. Sınavın toplam puanı 60’dır.":
        "Sınavın süresi 120 dakikadır. Sınavın toplam puanı 50’dir.",
      "Sınavın birinci aşamasından 30 puan ve üzerinde puan alan Lisans ve Yüksek Lisans öğrencileri ikinci aşamaya girmeye hak kazanmış olurlar.":
        "Sınavın birinci aşamasından 25 puan ve üzerinde puan alan Lisans ve Yüksek Lisans öğrencileri ikinci aşamaya girmeye hak kazanmış olurlar.",
      "Sınavın ikinci aşaması, 10 çoktan seçmeli (Listening Comprehension) dinlediğini anlama sorularından ve (Essay Writing) kompozisyon yazma bölümlerinden oluşur.":
        "Sınavın ikinci aşaması, 10 çoktan seçmeli (Listening Comprehension) dinlediğini anlama sorusundan ve (Academic Essay) akademik kompozisyon ile (Integrated Task) entegre yazma alt bölümlerini içeren yazma bölümünden oluşur.",
      "Sınav süresi 90 dakikadır. Sınavın toplam puanı 40’dır.":
        "Sınav süresi 135 dakikadır. Sınavın toplam puanı 50’dir.",
      "İkinci aşamadan en az 20 puan almış olan ve toplam puanı 60 ve üzerinde olan Lisans öğrencileri ve ikinci aşamadan en az 20 puan alan ve toplam puanı 65 ve üzerinde olan Yüksek Lisans öğrencileri sınavı geçmiş olur.":
        "İkinci aşamadan en az 25 puan almış olan ve toplam puanı 60 ve üzerinde olan Lisans öğrencileri ve ikinci aşamadan en az 25 puan alan ve toplam puanı 65 ve üzerinde olan Yüksek Lisans (tezli / birinci öğretim tezsiz) öğrencileri sınavı geçmiş olur; ikinci öğretim tezsiz yüksek lisans için toplam 55 puan yeterlidir.",
      "Bir sonraki sınavda da aynı sürece tabi olur ve birinci aşamadan başlarlar. Restatement soruları, imtihanın %15’ini oluşturur ve İngilizce bilgisini bütünce bazında ölçer.":
        "Bir sonraki sınavda da aynı sürece tabi olur ve birinci aşamadan başlarlar. Restatement soruları, imtihanın %9’unu oluşturur ve İngilizce bilgisini bütünce bazında ölçer.",
      "Reading comprehension soruları, sınavın %45’ini oluşturur ve öğrencilerin okuma- kavrama becerilerini ölçer.":
        "Reading comprehension soruları, sınavın %36’sını oluşturur ve öğrencilerin okuma- kavrama becerilerini ölçer.",
      "Çoğunluğu bilimsel olmak üzere, 3–5 okuma parçasından meydana gelir. Bu okuma parçaları, 7–10 çoktan seçmeli kavrama sorusu izler.":
        "Farklı uzunluklarda (500–900 sözcük) özgün ya da yarı özgün 3 okuma parçasından meydana gelir. Bu okuma parçalarını toplam 24 çoktan seçmeli kavrama sorusu izler.",
      "Bu bölümde, her soru iki puan değerindedir. (Essay Writing) yazma bölümü sınav puan ağırlığının %20’sini oluşturmaktadır.":
        "Bu bölümde, her soru iki puan değerindedir. Yazma bölümü sınav puan ağırlığının %30’unu oluşturmaktadır; bunun %20’si (Academic Essay) akademik kompozisyon, %10’u (Integrated Task) entegre yazma alt bölümüne aittir.",
      "Bu bölümde, katılımcılardan Karşılaştırma, Sebep ya da Sonuç tipinde 250–350 kelimelik bir kompozisyon yazmaları istenir, katılımcılara toplam üç konu verilir ve bir tanesini seçmeleri istenir.":
        "Bu bölümde, katılımcılardan Sebep, Sonuç ya da verilen bir argümana dair kişisel Görüş tipinde 250–350 kelimelik bir kompozisyon yazmaları istenir, katılımcılara toplam iki konu verilir ve bir tanesini seçmeleri istenir.",
    },
    source: "itu.edu.tr",
    checked: CHECKED,
  },

  /* Yeditepe — yabancidiller.yeditepe.edu.tr "İngilizce Hazırlık Programı": "Sınav, 80 soruluk çoktan seçmeli
   * bölüm ve 20 puanlık yazma bölümünden oluşur… 2 farklı konu verilir", "TOEFL iBT sınavından 79 (0-120) veya
   * 4 (1-6)… YDS / e-YDS / YÖKDİL / e-YÖKDİL… 66"; 2026-27 Güz öğrenci el kitabı (Eylül 2026): 80+ AFE muafiyeti,
   * "IELTS sınavı kurumumuzda geçerli değildir"; geçme 60 (Sanat ve Tasarım'da üç bölüm 50; dil bölümleri 65).
   * Süreler yayımlanmıyor. Biçim aynı, kaynak metindeki 3 konu / TOEFL 550-213 / bölüm listesi eskimiş → not.
   *
   * KAYNAK METİN GÜNCELLEMESİ (müşteri kararı 2026-09-30: "Yenilerini güncelle"; yeniden doğrulama 30.09.2026) — `edits`:
   * [A] Yabancı Diller Yüksekokulu – İngilizce Hazırlık Programı (TR sayfa) —
   * https://yabancidiller.yeditepe.edu.tr/tr/ingilizce-hazirlik-programi (tarihsiz (30.09.2026'da açıldı))
   * [B] Yabancı Diller Yüksekokulu İngilizce Hazırlık Programı 2026-2027 Güz Dönemi Öğrenci El Kitabı (PDF, s. 4, 8,
   * 9, 18) —
   * https://yabancidiller.yeditepe.edu.tr/sites/yabancidiller.yeditepe.edu.tr/files/2026-09/hazguzogrelkitabi-2627guz.pdf
   * (Eylül 2026 (dosya Last-Modified 25.09.2026))
   * [C] Yeditepe Üniversitesi Yabancı Dil Hazırlık Programları Eğitim-Öğretim ve Sınav Yönetmeliği (PDF, madde 5) —
   * https://yeditepe.edu.tr/sites/default/files/2025-10/yabanci_dil_hazirlik_yonetmeligi.pdf (RG 28/4/2018-30405;
   * son değişiklik RG 18/9/2025-33021)
   * [G] School of Foreign Languages – English Preparatory Program (EN sayfa) —
   * https://yabancidiller.yeditepe.edu.tr/en/english-preparatory-program (tarihsiz)
   * [H] Yeditepe Üniversitesi – Aday Öğrenci Sıkça Sorulan Sorular (İngilizce Hazırlık ve TOEFL bölümü) —
   * https://yeditepe.edu.tr/tr/aday-ogrenci/sss (tarihsiz (eski metni taşıyor))
   * - Tek değişen olgu: yazma bölümünde 3 değil 2 konu veriliyor. Geçme notu 60, 80 soru, 20 puanlık yazma ve ~300
   * kelime aynen geçerli (TR ve EN sayfa birbirini tutuyor; yönetmelik m.5(3) 60 puanı doğruluyor). "İngilizce
   * Yeterlik Sınavında 100 üzerinden en az 60 puan alan öğrenci başarılı sayılır. Sınav, 80 soruluk çoktan seçmeli
   * bölüm ve 20 puanlık yazma bölümünden oluşur. Yazm" [A]
   * - Parantezdeki 'TOEFL Bilgisayar Tabanlı 213; TOEFL Klasik Sınavı’nda 550' eskimiş: bilgisayar tabanlı 213 bugün
   * hiçbir resmi kaynakta yok; yönetmeliğin 18/9/2025'te değiştirilen m.5(6) fıkrası, hazırlık programı sayfası ve
   * Eylül 2026 el kitabı yalnız iBT 79'u sayıyor. Yeni eklenenler: iBT puanının 1-6 ölçeğindeki karşılığı (4) ve YDS
   * / e-YDS / YÖKDİL / e-YÖKDİL 66. DİKKAT – kısmi çelişki: üniversitenin genel 'Aday Öğrenci SSS' sayfası (H,
   * tarihsiz) hâlâ 'TOEFL PBT sınavında 550' yazıyor; daha yeni ve bağlayıcı kaynaklar (C 18/9/2025, B Eylül 2026)
   * PBT'yi anmadığı için 550 cümleden çıkarıldı. Cümlenin geri kalanı (eğitim dili, Rektörlükçe ilan, iki yıl,
   * merkez şartı) doğrulandı. Not: İngilizce Öğretmenliği / İngiliz Dili ve Edebiyatı / Çeviribilimi için eşik
   * farklı (iBT 90 veya 4.5; YDS 75 yalnız test etabından muaf tutar). "Yeditepe Üniversitesi’nde eğitim dili
   * İngilizcedir" [A]
   * - Geçerli merkez listesi artık 3 değil 4 merkez: 3. sıraya Boğaziçi Üniversitesi (STN20973A) eklenmiş, ODTÜ 4.
   * sıraya kaymış. Hazırlık programı sayfası (TR+EN) ve Eylül 2026 el kitabı dört merkezde hemfikir. DİKKAT:
   * tarihsiz Aday Öğrenci SSS sayfası (H) hâlâ üç merkezli eski listeyi gösteriyor (Boğaziçi yok); daha yeni kaynak
   * B. "1. YEDİTEPE ÜNİVERSİTESİ, İSTANBUL - Merkez Kodu: STN20056A 2. İSTANBUL TEKNİK ÜNİVERSİTESİ, İSTANBUL -
   * Merkez Kodu: ITTR153A 3. BOĞAZİÇİ ÜNİVERSİTESİ, İSTANBUL - Merkez " [B]
   * - Merkez ve kod (STN10463A) aynen geçerli; yalnız sıra numarası 3'ten 4'e kaydı (19. satırdaki Boğaziçi eklemesi
   * nedeniyle). 19. satır değiştirilmezse bu satır olduğu gibi kalabilir. "4. ORTADOĞU TEKNİK ÜNİVERSİTESİ, ANKARA -
   * Merkez Kodu: STN10463A" [B]
   * DEĞİŞTİRİLMEDİ (doğrulanamadı / resmi kaynaklar çelişiyor — docs/bekleyen-sorular.md): 50 puan barajı her
   * kaynakta aynı, ama hangi bölümler için geçerli olduğu resmi kaynaklar arasında çelişkili. En yeni tarihli kaynak
   * (B, Eylül 2026 el */
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
          "Sanat ve Tasarım Fakültesi'nin Tekstil ve Moda Tasarımı, Plastik Sanatlar ve Resim ile Tiyatro bölümlerinde 50 yeterlidir. İngilizce Öğretmenliği, İngiliz Dili ve Edebiyatı ve Çeviribilimi öğrencilerinin 65 alması ve yazma ile konuşmadan en az 60 alması gerekir.",
        ],
      },
      {
        question: "TOEFL ya da YDS ile muafiyet mümkün mü?",
        answer: "Evet; sınav tarihinden geriye doğru iki yıl içinde alınmış TOEFL iBT 79 (0-120) veya 4 (1-6) ya da YDS / e-YDS / YÖKDİL / e-YÖKDİL 66 ile muaf olunabilir. İngilizce Öğretmenliği, İngiliz Dili ve Edebiyatı ve Çeviribilimi öğrencileri için eşik TOEFL iBT 90 (0-120) veya 4.5 (1-6)'dır.",
        detail: ["TOEFL'da üniversitenin kurum kodunun (7050) işaretlenmesi, sınava kabul edilen dört merkezden birinde girilmesi ve sonucun TOEFL merkezi tarafından doğrudan İngilizce Hazırlık Programına gönderilmesi gerekir; TOEFL Home Edition ve IELTS kabul edilmez. Dil bölümlerinde YDS / YÖKDİL 75 yalnızca çoktan seçmeli etaptan muaf tutar."],
      },
      {
        question: "Sınav ne zaman yapılır?",
        answer: "Sınav her öğretim yılı başında, Rektörlükçe ilan edilen gün, saat ve yerde yapılır.",
        detail: ["Sınavda mazeret kabul edilmez; alınan sonuç iki yıl geçerlidir."],
      },
      {
        question: "Dil bölümleri için sınav farklı mı?",
        answer: "Evet; İngilizce Öğretmenliği, İngiliz Dili ve Edebiyatı ve Çeviribilimi için sınav dört bölümlüdür.",
        detail: ["Bu bölümler 80 soruluk test, 350–400 kelimelik yazma, 4 parça ve 40 soruluk dinleme ile öğrencilerin tek tek alındığı konuşmadır; test ve yazma ile dinleme ve konuşma iki ayrı günde yapılır."],
      },
    ],
    caveat: null,
    edits: {
      // Resmi kaynaklar çelişince EN YENİSİ esas alındı: Eylül 2026 öğrenci el kitabı ve hazırlık programı sayfası (TR) 50 puanı Sanat ve Tasarım Fakültesi'nin üç bölümü için sayıyor.
      "Güzel Sanatlar Fakültesi’nin Grafik Tasarımı, Moda ve Tekstil Tasarımı, Plastik Sanatlar ve Resim, Tiyatro Bölümleri ile Uygulamalı Bilimler Yüksekokulu öğrencilerinin Yabancı Dil Yeterlik Sınavı’ndan başarılı sayılabilmeleri için 100 üzerinden en az 50 puan almaları gerekir.":
        "Sanat ve Tasarım Fakültesi’nin Tekstil ve Moda Tasarımı, Plastik Sanatlar ve Resim ile Tiyatro bölümleri öğrencilerinin Yabancı Dil Yeterlik Sınavı’ndan başarılı sayılabilmeleri için 100 üzerinden en az 50 puan almaları gerekir.",
      "Yeterlik sınavı’nda 100 üzerinden en az 60 puan alan öğrenci başarılı sayılır. Sınav, 80 soruluk çoktan seçmeli bölüm ve 20 puanlık yazma bölümünden oluşur. Yazma bölümünde öğrencilere 3 farklı konu verilir ve konulardan birini seçip, yaklaşık 300 kelimelik bir kompozisyon yazmaları istenir.":
        "Yeterlik sınavı’nda 100 üzerinden en az 60 puan alan öğrenci başarılı sayılır. Sınav, 80 soruluk çoktan seçmeli bölüm ve 20 puanlık yazma bölümünden oluşur. Yazma bölümünde öğrencilere 2 farklı konu verilir ve konulardan birini seçip, yaklaşık 300 kelimelik bir kompozisyon yazmaları istenir.",
      "Yeditepe Üniversitesinde eğitim dili İngilizcedir. Her akademik yıl başında, Rektörlükçe ilan edilecek gün, saat ve yerde Yabancı Dil Yeterlik Sınavı (Proficiency) yapılır. Sınav tarihinden geriye doğru iki yıl içinde, TOEFL iBT sınavından 79 almış olduğunu (TOEFL Bilgisayar Tabanlı 213; TOEFL Klasik Sınavı’nda 550) belgeleyen öğrenci yabancı dil sınavından muaf tutulur. TOEFL iBT sınavı için geçerli sayılan sınav merkezleri aşağıda belirtilmiştir. Bu sınav merkezlerinin dışında girilen sınavlar geçerli değildir.":
        "Yeditepe Üniversitesinde eğitim dili İngilizcedir. Her akademik yıl başında, Rektörlükçe ilan edilecek gün, saat ve yerde Yabancı Dil Yeterlik Sınavı (Proficiency) yapılır. Sınav tarihinden geriye doğru iki yıl içinde, TOEFL iBT sınavından 79 (0-120) veya 4 (1-6) almış olduğunu ya da YDS / e-YDS / YÖKDİL / e-YÖKDİL sınavlarından birinden 66 ve üstü puan aldığını belgeleyen öğrenci yabancı dil sınavından muaf tutulur. TOEFL iBT sınavı için geçerli sayılan sınav merkezleri aşağıda belirtilmiştir. Bu sınav merkezlerinin dışında girilen sınavlar geçerli değildir.",
      "3.":
        "3. BOĞAZİÇİ ÜNİVERSİTESİ, İSTANBUL - Merkez Kodu: STN20973A",
      "ORTA DOĞU TEKNİK ÜNİVERSİTESİ,ANKARA - Merkez Kodu: STN10463A":
        "4. ORTA DOĞU TEKNİK ÜNİVERSİTESİ, ANKARA - Merkez Kodu: STN10463A",
    },
    source: "yabancidiller.yeditepe.edu.tr",
    checked: CHECKED,
  },

  /* Işık — isikun.edu.tr "Sınavlar" (TR + EN): "okuma (%25), dinleme (%25) yazma (%25) ve konuşma (%25)",
   * okuma 15-20 soru 60-75 dk, dinleme 16 soru, yazma 50-60 dk, konuşma 7-8 dk, geçme 70; yerleştirme 75 dk,
   * 55+ (öğrenci el kitabı); 2026 duyurusu (17.08.2026); TOEFL iBT 80 · PTE 65 · YDS/YÖKDİL 70 · e-TEP 80.
   * Dinlemenin hangi oturumda olduğu TR ve EN sayfada çelişiyor → yazılmadı. Kaynak metin (%25/%35/%40,
   * değerlendirilmeyen 1. bölüm, 90 dk yerleştirme) eskimiş.
   *
   * KAYNAK METİN GÜNCELLEMESİ (müşteri kararı 2026-09-30: "Yenilerini güncelle"; yeniden doğrulama 30.09.2026) — `edits`:
   * [A] Yabancı Diller Okulu – Sınavlar (TR) — https://www.isikun.edu.tr/akademik/sfl/sinavlar (tarihsiz (erişim
   * 2026-09-30))
   * [B] School of Foreign Languages – Exams (EN) — https://www.isikun.edu.tr/en/academic/sfl/exams (tarihsiz (erişim
   * 2026-09-30))
   * [D] Duyuru: 7-10 Eylül 2026 İngilizce Hazırlık Yerleştirme ve Yeterlik sınavları —
   * https://www.isikun.edu.tr/akademik/sfl/duyurular/7-10-eylul-2026-ingilizce-hazirlik-yerlestirme-ve-yeterlik-sinavlari
   * (17 Ağustos 2026)
   * [E] Örnek Çıkış/Yeterlik Sınavı – Dinleme: Outline & Vocabulary (PDF; Sınavlar sayfasındaki 'Örnek Yeterlik
   * Sınavı' bağlantısından) — https://www.isikun.edu.tr/sites/default/files/2024-10/outline-and-vocabulary.pdf
   * (tarihsiz (yükleme klasörü 2024-10))
   * [F] Örnek Çıkış/Yeterlik Sınavı – Yazma: Essay Writing Task (PDF) —
   * https://www.isikun.edu.tr/sites/default/files/2024-10/exit_essay_writing_task_sample.pdf (tarihsiz (yükleme
   * klasörü 2024-10))
   * [G] Prep Sıkça Sorulan Sorular (web sayfası) — https://www.isikun.edu.tr/akademik/sfl/prep-sikca-sorulan-sorular
   * (Ağustos 2026)
   * [H] Duyuru: 17-19 Ağustos 2026 İngilizce Hazırlık Exit Sınavı Hakkında —
   * https://www.isikun.edu.tr/akademik/sfl/duyurular/17-19-agustos-2026-ingilizce-hazirlik-exit-sinavi-hakkinda (11
   * Ağustos 2026)
   * [J] Announcement: 5-6 October 2026 English Exams For International Students —
   * https://www.isikun.edu.tr/en/akademik/sfl/announcements/5-6-october-2026-english-exams-international-students
   * (25 September 2026)
   * - Süre 90 dk değil 75 dk; ölçülen beceriler dilbilgisi + kelime bilgisi + okuduğunu anlama (yazma yok). Ekim
   * 2026 duyurusundaki saat aralığı da 75 dk. "Sınav 75 dakikadır ve İngilizce dilbilgisi, kelime bilgisi ve
   * okuduğunu anlama becerilerini ölçer." [A]
   * - Ağırlıklar %25/%35/%40 (3 beceri) değil; konuşma eklendi ve dört bölümün her biri %25. 'Yaklaşık 4 saat' ve
   * 'iki oturum' hâlâ geçerli. Eylül 2026'da yazılı kısım 8 Eylül'de yüz yüze, sözlü kısım 10 Eylül'de MS Teams
   * üzerinden yapıldı. "Yaklaşık 4 saat süren ve öğrencilerin İngilizce okuma (%25), dinleme (%25) yazma (%25) ve
   * konuşma (%25) becerilerini ölçen bir sınavdır. Sınav sabah ve öğleden sonra olma" [A]
   * - Değerlendirilmeyen 'konuya hazırlık' bölümü artık yok: ilk bölüm doğrudan okuma bölümü (%25). Satırın o kısmı
   * çıkarıldı. NOT: 'sabah oturumu 2 bölüm (okuma + dinleme)' TR sayfada ve 2026 Exit sınavı saat çizelgesinde
   * böyle; EN sayfa dinlemeyi 'Afternoon Session' altında veriyor (çelişki – bkz. unresolved). Riske girmek
   * istenmezse satır tümüyle silinebilir. "Sabah oturumu 2 bölümden oluşur. İlk bölümde çoklu mini okuma metinleri
   * verilir." [A]
   * - Okuma artık ikinci değil ilk bölüm; tek metin değil birden fazla kısa metin; '20 soru / 60 dk' yerine '15-20
   * soru / 60-75 dk'. 'Eşleştirmeli' ifadesi okuma için doğrulanamadı, çıkarıldı (SSS: çoktan seçmeli). "İlk bölümde
   * çoklu mini okuma metinleri verilir. Soru sayısı metinlerin uzunluğuna göre değişiklik gösterebilir. Okuma sınavı
   * süresi ortalama 60 ila 75 dakikadır." [A]
   * - Dinleme artık üçüncü değil ikinci bölüm; metin '2 bölüm × 10-12 dk' değil, tek parça ve ortalama 15-20 dk. Not
   * tutma ve önceden verilen sözcük listesi sürüyor (sözcük listesinin kanıtı resmi örnek sınav). "İkinci bölümde
   * dinleme becerisi ölçülür. Dinleme metni 1500-1600 kelimeden oluşan genel bilgi içeren bir metindir ve ortalama
   * 15-20 dakika sürer. Öğrencilerin metni dinle" [A]
   * - Cevaplama süresi 13 dk değil 15-20 dk; metin tek parça olduğu için 'metnin ikinci bölümüne geçilir' cümlesi
   * çıkarıldı. Soru sayısı EN sayfada 16 (istenirse eklenebilir). Kağıtların dağıtım sırası resmi sayfada ayrıca
   * anlatılmıyor; örnek sınav 'not kağıdı' ve 'dinlemeden sonra sorular' akışını doğruluyor. "Dinleme kısmı
   * bittikten sonra öğrencilerin tuttukları notları kullanarak 15-20 dakika içerisinde verilen soruları
   * cevaplamaları beklenir." [A]
   * - Yazma artık dördüncü değil üçüncü bölüm; 'sınavın konusu / okunan-dinlenen metinlerden yararlanma' kurgusu
   * güncel sayfada yok (konu/soru veriliyor, 3-4 paragraf); süre EN sayfada 50-60 dk (örnek sınavda 60 dk). EK
   * ÖNERİ: eski metinde konuşma bölümü hiç yok; bu satırdan sonra şu satır eklenebilir: 'Dördüncü bölüm konuşma
   * bölümüdür (%25); adaya bir fotoğraf gösterilir ve fotoğrafla ilgili sorular sorulur. Konuşma sınavı aynı gün
   * öğleden sonra, önceki gün veya ertesi gün verilebilir.' "Üçüncü bölüm yazma bölümüdür ve öğleden sonraki
   * oturumda verilir. Öğrencilere bir konu/soru verilir. Üç/dört paragraflık bir kompozisyon halinde cevap vermeleri
   * istenir." [A] */
  "isik-universitesi": {
    exam: "İngilizce Yeterlik Sınavı",
    parts: [
      { name: "Okuma", note: "15–20 soru · 60–75 dk", weight: 25, weightLabel: "%25" },
      { name: "Dinleme", note: "not alarak ders · 16 soru", weight: 25, weightLabel: "%25" },
      { name: "Yazma", note: "3–4 paragraf · 50–60 dk", weight: 25, weightLabel: "%25" },
      { name: "Konuşma", note: "fotoğraf üzerine soru-cevap", weight: 25, weightLabel: "%25" },
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
        answer: "Yeni öğrenciler önce 75 dakikalık yerleştirme sınavına girer; bu sınavdan geçer not alanlar yeterlik sınavına geçer.",
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
        answer: "Yeterlik sınavı her akademik yılın başında, Eylül ayında yapılır; DGS, yatay geçiş ve uluslararası öğrenciler için ayrı oturumlar da duyurulur.",
        detail: ["Hazırlık öğrencileri için Ocak, Haziran ve Ağustos'ta çıkış sınavı yapılır."],
      },
    ],
    caveat: null,
    edits: {
      "Seviye Belirleme Sınavı'nın amacı öncelikle öğrencilerin İngilizce seviyesini belirlemektir. Sınav süresi toplam 90 dakikadır. Sınav öğrencinin İngilizce dilbilgisi, okuma, ve yazma becerilerini ölçer.":
        "Seviye Belirleme Sınavı'nın amacı öncelikle öğrencilerin İngilizce seviyesini belirlemektir. Sınav süresi toplam 75 dakikadır. Sınav öğrencinin İngilizce dilbilgisi, kelime bilgisi ve okuduğunu anlama becerilerini ölçer.",
      "Sınav yaklaşık 4 saat süren ve öğrencilerin İngilizce okuma (%25), dinleme (%35) ve yazma (%40) becerilerini ölçer. Sınav sabah ve öğleden sonra olmak üzere iki oturumda yapılmaktadır.":
        "Sınav yaklaşık 4 saat sürer ve öğrencilerin İngilizce okuma (%25), dinleme (%25), yazma (%25) ve konuşma (%25) becerilerini ölçer. Sınav sabah ve öğleden sonra olmak üzere iki oturumda yapılmaktadır; konuşma sınavı aynı gün öğleden sonra, önceki gün veya ertesi gün verilebilir.",
      "Sabah oturumu 2 bölümden oluşur. Ancak birinci bölüm değerlendirilmez. Bu bölümün amacı öğrencileri sınavın konu başlığına hazırlama sürecidir. Çok kısa açıklamalar, resimler ve sorular ile öğrencilerin sınavın konusu hakkında düşünmeleri sağlanmaktadır.":
        "Sabah oturumu 2 bölümden oluşur.",
      "Sınavın ikinci bölümünde öğrencilere bir okuma metni verilir. Öğrencilerin toplam 20 çoktan seçmeli veya eşleştirmeli soruyu 60 dakika içinde cevaplandırmaları istenmektedir.":
        "Sınavın ilk bölümünde öğrencilere birden fazla kısa okuma metni verilir. Öğrencilerin, sayısı metinlerin uzunluğuna göre değişen (15-20) çoktan seçmeli soruyu ortalama 60 ila 75 dakika içinde cevaplandırmaları istenmektedir.",
      "Üçüncü bölümde öğrencilerin dinleme becerisi ölçülmektedir. Okunacak metin 2 bölümden oluşmaktadır. Her iki bölüm, yaklaşık 10-12 dakikalık metinlerden oluşur. Öğrencilerin metni dinlerken not tutmaları gerekmektedir. Öğrencilere önce dinleme metninde duyacakları anahtar sözcüklerin listesi verilir.":
        "İkinci bölümde öğrencilerin dinleme becerisi ölçülmektedir. Dinleme metni tek bölümden oluşur; 1500-1600 kelimelik, genel bilgi içeren bu metin ortalama 15-20 dakika sürer. Öğrencilerin metni dinlerken not tutmaları gerekmektedir. Öğrencilere önce dinleme metninde duyacakları anahtar sözcüklerin listesi verilir.",
      "Daha sonra, öğrencilere dinlerken not tutacakları boş kağıtlar verilir. Metnin dinlenmesinden sonra öğrencilere soru kağıtları dağıtılır. Öğrencilerden tuttukları notları kullanarak çoktan seçmeli soruları 13 dakika içinde cevaplamaları istenir. Daha sonra ise metnin ikinci bölümüne geçilir.":
        "Daha sonra, öğrencilere dinlerken not tutacakları boş kağıtlar verilir. Metnin dinlenmesinden sonra öğrencilere soru kağıtları dağıtılır. Öğrencilerden tuttukları notları kullanarak çoktan seçmeli soruları 15-20 dakika içinde cevaplamaları istenir.",
      "Dördüncü bölüm yazma bölümüdür ve öğleden sonraki oturumda verilir. Öğrencilere sınavın konusu ile ilgili, okudukları ve dinledikleri metinlerden de yararlanabilecekleri bir konu verilir. 60 dakika içinde akademik bir kompozisyon yazmaları beklenmektedir.":
        "Üçüncü bölüm yazma bölümüdür ve öğleden sonraki oturumda verilir. Öğrencilere bir konu/soru verilir. 50-60 dakika içinde üç/dört paragraflık bir kompozisyon yazmaları beklenmektedir.",
    },
    source: "isikun.edu.tr",
    checked: CHECKED,
  },

  /* Kocaeli — yeniden doğrulama 30.09.2026 (müşteri kararı: "Yenilerini güncelle"). Resmi kaynaklar:
   *   [A] "İngilizce Dil Yeterlik Koşulları" https://yabancidiller.kocaeli.edu.tr/sayfalar/ingilizce-dil-yeterlik-kosullari-c52:
   *       "KOU YDYO Yeterlik Sınavı | 5 | 60 | 70"; YDS 60 (5 yıl) · TOEFL iBT 72 · PTE Academic 55 · CAE C (2 yıl);
   *       "IELTS ve YÖKDİL … denklik/eşdeğerlik sağlamamaktadır"; "devlet üniversitelerine ait binalarda … Home Edition vb.
   *       … geçerli kabul edilmemektedir"; "ülkemiz sınırları içindeki başka bir üniversitede, son beş yıl içerisinde en az
   *       B1+ düzeyinde İngilizce hazırlık eğitimi…"; "Son üç yıl içinde … anadil olarak konuşulduğu bir ülkede …
   *       ortaöğrenimini … tamamladığını belgeleyen öğrenciler … muaftır".
   *   [B] YDYO Eğitim-Öğretim ve Sınav Yönergesi (son değişiklik 11.09.2024): Md. 10/i "100 üzerinden 60 ve üstü",
   *       Md. 10/iii "Yeterlik sınavlarının (İYS) telafisi yoktur", Md. 10/iv "dört farklı dönemde uygulanır".
   *   [C] Sınav rehberi ("2025-2026 Academic Year", siteye 20.08.2026'da yüklendi): 13 dinleme + 20 okuma + 10 dil
   *       kullanımı + 7 dil bilgisi, "at least 150 words". Rehberdeki "65" ve "ONE session … 120 minutes" güncel DEĞİL:
   *   [E] Duyurular (yabancidiller.kocaeli.edu.tr/duyurular): 13.08.2026 "50 soruluk test (dil bilgisi, okuma ve dinleme)
   *       ve yazma sınavından oluşmaktadır", "60 ve üzeri puan alan öğrenciler … muaf tutulur"; 11.09.2026 "iki oturum …
   *       yazma sınavına 30 dk ve Yeterlik sınavına … 75 dk."; 18.09.2026 sonuç duyurusu "60 ve üzeri".
   *   2026-27 takvimi: İYS-Kış 26.01.2027, İYS-Bahar 15.06.2027, İYS-Yaz 06.07.2027.
   * 2026-09-28'de yazılan "tek oturum, ~120 dk" ve "okuma 60 dk" bu doğrulamayla kaldırıldı (rehber tablosunda 60 dk okuma +
   * dil kullanımını birlikte kapsıyor; 2026 uygulaması iki oturum). Kaynak metin (1 dinleme + 7 okuma bölümü, 15 / 75 dk,
   * yılda bir kez, 65, TOEFL 75, IELTS 6, FCE, SAT 520, YDS 80 + ek şart, yurt dışı üniversite hazırlığı) eskimiş → `edits`.
   * Uluslararası sınavların geçerliliği yönergede (Md. 11/ii) 5 yıl, güncel web tablosunda [A] 2 yıl — daha yeni olan
   * [A] esas alındı (docs/bekleyen-sorular.md). Dinleme / okuma için ayrı süre resmi kaynakta yok → yazılmadı. */
  "kocaeli-universitesi-hazirlik": {
    exam: "İYS",
    parts: [
      { name: "Dinleme", note: "13 soru", weight: null, weightLabel: null },
      { name: "Okuma", note: "20 soru", weight: null, weightLabel: null },
      { name: "Dil kullanımı", note: "10 soru", weight: null, weightLabel: null },
      { name: "Dil bilgisi", note: "7 soru", weight: null, weightLabel: null },
      { name: "Yazma", note: "paragraf · 150+ kelime", weight: null, weightLabel: null },
    ],
    facts: [
      { value: "60", label: "muafiyet notu" },
      { value: "4", label: "sınav dönemi (yılda)" },
      { value: "50", label: "soru + yazma" },
    ],
    faq: [
      {
        question: "Kocaeli Üniversitesi İngilizce Yeterlik Sınavı (İYS) nasıl yapılır?",
        answer: "İYS, 50 soruluk çoktan seçmeli bir test ile yazma sınavından oluşan yazılı bir sınavdır.",
        detail: [
          "Üniversitenin sınav rehberine göre testte 13 dinleme, 20 okuma, 10 dil kullanımı ve 7 dil bilgisi sorusu vardır; yazma görevi en az 150 kelimelik bir paragraftır. Eylül 2026 sınavında yazmaya 30, teste 75 dakika verildi. Sözlük ve elektronik cihaz kullanılamaz.",
        ],
      },
      {
        question: "Kocaeli hazırlık atlama sınavında geçme notu kaç?",
        answer: "Genel İngilizce hazırlık için geçme notu 100 üzerinden 60'tır.",
        detail: ["İngiliz Dili ve Edebiyatı bölümünde önce yazılı sınav ve kompozisyondan, ardından sözlü sınavdan 70 almak gerekir."],
      },
      {
        question: "TOEFL ya da PTE ile muafiyet mümkün mü?",
        answer: "Evet; genel hazırlık için TOEFL iBT 72, PTE Academic 55, CAE C, YDS 60, Cambridge Linguaskill General 140-145 ya da Oxford Test of English 106-110 yeterlidir.",
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
    caveat: null,
    edits: {
      // Kurs tanıtımındaki sınav bölümleri bugünkü sınava göre (kullanıcı 2026-10-01: "eksik / yanlış bilgi varsa düzenle"); bölümler bu kaydın `parts`ında, kaynak yukarıda.
      "Kocaeli Üniversitesi hazırlık atlama Proficiency sınavı formatına yönelik teknikler ve katılımcıların muafiyet sınavının reading, writing, listening bölümlerinden maksimum düzeyde skor almaları hedeflenmektedir.":
        "Kocaeli Üniversitesi hazırlık atlama Proficiency sınavı formatına yönelik teknikler ve katılımcıların muafiyet sınavının listening, reading, use of English, grammar ve writing bölümlerinden maksimum düzeyde skor almaları hedeflenmektedir.",
      "Sınav öğrencilerin okuma ve dinleme beerisini belirlemektedir. Sınavda 1 Dinleme ve 7 Okuma bölümü bulunmaktadır. Dinleme bölümü 15 dakika okuma bölümü 75 sürmektedir. Toplam puan 100 üzerinden hesaplanmaktadır.":
        "Kocaeli Üniversitesi İngilizce Yeterlik Sınavı (İYS) 50 soruluk çoktan seçmeli bir test (dil bilgisi, okuma ve dinleme) ile yazma sınavından oluşmaktadır. Eylül 2026 sınavında yazma bölümüne 30, teste 75 dakika verilmiştir. Toplam puan 100 üzerinden hesaplanmaktadır.",
      "Muafiyet sınavı her eğitim-öğretim yılı başında bir kez düzenlenmektedir. Muafiyet sınavında başarısız olan ve sınava herhangi bir sebepten dolayı katılamayan öğrencilere yeni bir sınav açılmaz. Bu sınavda 100 üzerinden 65 ve daha yukarı puan alan öğrenci İngilizce hazırlık programından muaf tutulur. İngilizce hazırlık programından muaf tutulmanın diğer şartları ise aşağıda belirtilmiştir.":
        "Yeterlik sınavı yılda dört dönemde düzenlenmektedir: eğitim-öğretim yılı başında (İYS-Güz), güz yarıyılı sonunda (İYS-Kış), bahar yarıyılı sonunda (İYS-Bahar) ve yaz döneminde (İYS-Yaz). Sınavın telafisi yoktur; girmesi gereken tarihte sınava girmeyen öğrenciye başka bir sınav hakkı verilmez. Bu sınavda 100 üzerinden 60 ve daha yukarı puan alan öğrenci İngilizce hazırlık programından muaf tutulur. İngilizce hazırlık programından muaf tutulmanın diğer şartları ise aşağıda belirtilmiştir.",
      "Öğrencinin, Yükseköğretim Kurulu tarafından denkliği kabul edilen yurt dışındaki bir üniversitede İngilizce muafiyet nitelikli sınavdan muaf olmuş ya da İngilizce hazırlık eğitimi almış ve başarı ile tamamlamış olduğunu eğitim-öğretim yılının başında muafiyet sınavının uygulanma tarihinden önce belgelemesi ve ibraz etmesi gerekmektedir.":
        "Son üç yıl içinde, İngilizcenin ana dil olarak konuşulduğu bir ülkede, o ülke vatandaşlarının devam ettiği ortaöğretim kurumlarında eğitim görerek ortaöğrenimini tamamladığını belgeleyen öğrenci muaf tutulur.",
      "Öğrencinin, yurt içindeki bir üniversitede 4 yıllık İngilizce dil, edebiyat veya öğretmenlikle ilgili bir bölümün İngilizce muafiyet nitelikli sınavından muaf olmuş ya da İngilizce hazırlık eğitimi almış ve başarı ile tamamlamış olduğunu eğitim-öğretim yılının başında muafiyet sınavının uygulanma tarihinden önce belgelemesi ve ibraz etmesi gerekir.":
        "Kocaeli Üniversitesi'nde ya da yurt içindeki başka bir üniversitede son beş yıl içinde en az B1+ düzeyinde İngilizce hazırlık eğitimi görüp başarıyla tamamladığını belgeleyen öğrenci muaf tutulur.",
      "Öğrencinin, son iki yıl içerisinde aşağıdaki sınavlardan birine girmiş ve aşağıda belirtilen o sınava ait asgari puanı almış olduğunu eğitim-öğretim yılının başında muafiyet sınavının uygulanma tarihinden önce belgelemesi ve ibraz etmesi gerekir.":
        "Öğrencinin, aşağıdaki sınavlardan birine girmiş ve o sınava ait asgari puanı almış olduğunu belgelemesi gerekir. YDS sonucu beş yıl, diğer sınavların sonuçları iki yıl geçerlidir; Türkiye'de girilen sınavın devlet üniversitesi binasında yapılmış olması aranır, evden girilen (Home Edition) sınavlar kabul edilmez.",
      "TOEFL-internet-based testten 75 puan almış öğrenci muaf tutulur.": "TOEFL-internet-based testten 72 puan almış öğrenci muaf tutulur.",
      "IELTS’ten 6 puan almış öğrenci muaf tutulur.": "IELTS ve YÖKDİL muafiyet için denklik sağlamamaktadır.",
      // FCE üniversitenin denklik tablosunda yok; Cambridge sınavlarından C1 Advanced (CAE) "C" kabul ediliyor.
      "FCE sınavından “C” seviye notu almış öğrenci muaf tutulur.": "Cambridge C1 Advanced (CAE) sınavından “C” notu almış öğrenci muaf tutulur.",
      // SAT hiçbir resmi belgede geçmiyor; tablodaki diğer uluslararası sınav PTE Academic.
      "SAT sınavının herhangi bir bölümünden en az 520 puan almış öğrenci muaf tutulur.": "PTE Academic sınavından 55 puan almış öğrenci muaf tutulur.",
      // Güncel koşullarda YDS için ek yazma / konuşma şartı yok.
      "YDS’den 80 puan almış ve buna ek olarak girmek zorunda olunan İngilizce hazırlık muafiyet sınavının konuşma ve yazma bölümlerinden 50 üzerinden en az 30 puan almış olması gerekmektedir.":
        "YDS’den 60 puan almış öğrenci muaf tutulur.",
    },
    source: "kocaeli.edu.tr",
    checked: CHECKED,
  },
};

export function getUniversityExam(slug: string): UniversityExamInfo | null {
  return UNIVERSITY_EXAMS[slug] ?? null;
}
