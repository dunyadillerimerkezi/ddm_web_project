/**
 * P5 — İngilizce hedef kitle programları (`/ingilizce-kurslari/*`): İlköğretim, Üniversite Hazırlık,
 * YKS Dil, Yaz Okulu. Konuşma kursu yayınlanmıyor (kullanıcı kararı, 2026-09-27: Dil Kursu
 * sayfasına 301).
 *
 * Seviye sayfalarıyla aynı içerik sözleşmesi (`data/englishLevels.ts` başlığı): firma metni kaynaktan,
 * yalnız yazım düzeltmesi `edits`; genel bilgi (MEB ders saatleri, YÖK hazırlık yönetmeliği, ÖSYM YDT
 * kuralları) `added` alanlarında, kaynak yorumda. Tasarım: seviye kartından ayrı aile — lacivert fotoğraflı
 * hero + program şeridi + sayfaya özgü tek baskın blok (kartlar / adımlar / soru dağılımı / rakamlar).
 */

import type { GuideText } from "@/data/examGuides";
import type { SlotRef } from "@/data/privateLessonsShared";
import type { IconName } from "@/components/graphics/icons";
import { IK } from "@/data/englishLevels";
import type { Faq } from "@/lib/types";

type Photo = { src: string; alt: string; width: number; height: number };

export type ProgramBlock =
  /** Kaynak cümleleri sırayla ikonlu kartlara (başlık arayüz etiketi). */
  | { kind: "cards"; src: SlotRef; items: { title: string; icon: IconName }[] }
  /** Genel bilgi kartları (kaynakta yok; kaynak yorumda). */
  | { kind: "info"; items: { title: string; icon: IconName; text: string }[] }
  /** Kaynak cümleleri numaralı adımlara (gerçek bir sıra olduğunda). */
  | { kind: "steps"; src: SlotRef; titles: string[] }
  /** Büyük rakam kutuları — her rakam `from` satırlarında geçmeli; satırlar altta küçük gösterilir. */
  | { kind: "facts"; items: { value: string; label: string }[]; from: SlotRef }
  /** "Ad (N Soru) (ayrıntı)" satırları → çubuk listesi; toplam `total`e eşit olmalı. */
  | { kind: "distribution"; heading: string; src: SlotRef; note: GuideText; total: number }
  /** Genel bilgi tablosu. */
  | { kind: "table"; caption: string; head: string[]; rows: string[][]; note: string }
  /** Firma cümleleri — ikonlu liste (+ isteğe bağlı fotoğraf). */
  | { kind: "highlights"; photo: Photo | null; items: { icon: IconName; text: GuideText }[] }
  /** Konu etiketleri — her etiket sayfa metninde geçmeli. */
  | { kind: "chips"; title: string; items: string[] }
  /** Sitedeki ilgili sayfalar (üretilmemişse düz metin). */
  | { kind: "links"; items: { label: string; href: string; icon: IconName }[] };

export type ProgramSection = {
  id: string;
  title: { source: string } | { added: string };
  answer: GuideText;
  blocks: ProgramBlock[];
};

export type EnglishProgramDef = {
  slug: string;
  /** Kırıntı ve program şeridi etiketi. */
  label: string;
  meta: { title?: string; description?: string; reasons?: string[] };
  hero: {
    lead: GuideText;
    photo: Photo;
    /** Hero'daki kısa etiketler — `basis: "page"` rakamları kaynak metinde geçmeli. */
    facts: { label: string; icon: IconName; basis: "page" | "general" }[];
  };
  /** İlk bölüm sayfanın baskın bölümüdür (açık mavi panel). */
  sections: ProgramSection[];
  faq: Faq[];
  sources: string[];
  edits?: Record<string, string>;
  headingEdits?: Record<string, string>;
  ignored: { line: string; reason: string }[];
};

const FAQ_START: Faq = {
  question: "Hangi kurdan başlayacağımı nasıl bilirim?",
  icon: "soru",
  answer: ["Ücretsiz seviye tespit sınavıyla. Sınav için size en yakın şubemizle görüşebilirsiniz."],
};

/* ---------------------------------------------------------------
 * İlköğretim İngilizcesi
 *
 * Genel bilgi (doğrulama 2026-09-27):
 * - Haftalık ders saatleri: MEB TTKB 23.05.2024 / 21 sayılı karar çizelgesi —
 *   https://ttkb.meb.gov.tr/meb_iys_dosyalar/2025_02/10103210_ilkogretimkurumlari_hdc_2024_21.pdf
 *   (2–4. sınıf 2, 5–6. sınıf 3, 7–8. sınıf 4 saat; İngilizce 2. sınıfta başlar)
 * - Hedef seviyeler: Türkiye Yüzyılı Maarif Modeli İngilizce programı (2–8) —
 *   https://tymm.meb.gov.tr/assets/pdf/ingilizce-dersi-2-8.pdf (2–4 A1.1–A1.3, 5–8 A2.1–A2.4, 9–12 B1)
 * ------------------------------------------------------------- */

const IO_H1 = "İlköğretim İngilizcesi Kursu Ders Programı";
const IO_WHAT = "İlköğretim İngilizcesi Nedir?";

const ILKOGRETIM: EnglishProgramDef = {
  slug: "ilkogretim-ingilizce-kursu",
  label: "İlköğretim İngilizcesi",
  meta: {},
  hero: {
    lead: { src: { heading: IO_H1, take: [0] }, sentence: 0 },
    photo: { src: "/assets/home_page_images/ddm-kids.jpg", alt: "Öğretmeniyle İngilizce çalışan ilkokul öğrencisi", width: 7008, height: 4672 },
    facts: [
      { label: "Konuşma, yazma, okuma, dinleme ve drama", icon: "konusma", basis: "page" },
      { label: "Her ay yazılı gelişim raporu", icon: "belge", basis: "page" },
      { label: "Toplam 4 yazılı değerlendirme", icon: "yazma", basis: "page" },
    ],
  },
  sections: [
    {
      id: "program",
      title: { source: IO_WHAT },
      answer: { added: "Program beş dersi, düzenli raporlamayı ve veliyle birlikte çalışmayı bir araya getirir." },
      blocks: [
        {
          kind: "cards",
          src: { heading: IO_WHAT },
          items: [
            { title: "Beş ders", icon: "okuma" },
            { title: "Aylık rapor", icon: "belge" },
            { title: "Yıl sonu dosyası", icon: "mezuniyet" },
            { title: "Yazılı değerlendirme", icon: "yazma" },
            { title: "Veli kitapçığı", icon: "grup" },
          ],
        },
      ],
    },
    {
      id: "yaklasim",
      title: { added: "Dünya Dilleri Merkezi'nde ilköğretim İngilizcesi" },
      answer: { added: "Yoğun ve sürükleyici bir sınıf ortamı, düzenli kilometre taşlarıyla ilerleme." },
      blocks: [
        {
          kind: "highlights",
          photo: { src: "/assets/home_page_images/yabancı-dil2.jpg", alt: "Masada bayraklarla dil çalışan çocuklar", width: 735, height: 490 },
          items: [
            // "2. Dil" cümle sonu gibi bölünüyor → 1–3 aralığı iki gerçek cümleyi birlikte alır.
            { icon: "konusma", text: { src: { heading: IO_H1, take: [0] }, sentence: [1, 3] } },
            { icon: "kupa", text: { src: { heading: IO_H1, take: [1] } } },
            { icon: "takvim", text: { src: { heading: IO_H1, take: [2] } } },
            { icon: "kelime", text: { src: { heading: IO_H1, take: [3] } } },
            { icon: "dinleme", text: { src: { heading: IO_H1, take: [4] } } },
          ],
        },
      ],
    },
    {
      id: "okulda-ingilizce",
      title: { added: "Okulda İngilizce: hangi sınıfta kaç saat?" },
      answer: { added: "MEB programında İngilizce 2. sınıfta başlar; haftalık ders saati sınıf ilerledikçe artar." },
      blocks: [
        {
          kind: "table",
          caption: "Ortaokula kadar okul İngilizcesi",
          head: ["Sınıf", "Haftalık ders", "Hedef seviye (CEFR)"],
          rows: [
            ["2 – 4. sınıf", "2 saat", "A1"],
            ["5 – 6. sınıf", "3 saat", "A2"],
            ["7 – 8. sınıf", "4 saat", "A2"],
          ],
          note: "Lise programı B1'e uzanır. Kaynak: MEB 2024/21 haftalık ders çizelgesi ve Türkiye Yüzyılı Maarif Modeli İngilizce öğretim programı.",
        },
      ],
    },
  ],
  faq: [
    {
      question: "Veliler çocuğun gelişimini nasıl takip eder?",
      icon: "belge",
      answer: [
        "Her ayın sonunda yazılı bir gelişim raporu iletilir; düzenli raporlamanın yanı sıra toplam 4 yazılı değerlendirme yapılır. Velilere, çocuklarıyla evde birlikte çalışmaları için bilgilendirme kitapçığı verilir.",
      ],
    },
    {
      question: "Okulda İngilizce kaç saat okutuluyor?",
      icon: "takvim",
      answer: ["MEB programında İngilizce 2. sınıfta başlar: 2–4. sınıflarda haftada 2, 5–6. sınıflarda 3, 7–8. sınıflarda 4 saat."],
    },
    {
      question: "Kurs okul İngilizcesine destek olur mu?",
      icon: "kupa",
      answer: ["Kurslar, öğrencilerin ortaokula ve liseye hazırlanırken ihtiyaç duyduğu temel kelime, telaffuz ve dilbilgisi yapılarını tanıtıp uygulatmak için tasarlanmıştır."],
    },
    FAQ_START,
  ],
  sources: [
    "MEB Talim ve Terbiye Kurulu — İlköğretim kurumları haftalık ders çizelgesi (2024/21)",
    "MEB — Türkiye Yüzyılı Maarif Modeli İngilizce öğretim programı (2–8. sınıf)",
  ],
  edits: {
    // Köşeli parantez ve boşluk.
    "Konuşma, Yazma, Okuma [ Hikaye anlatımı], Dinleme ve Drama derslerinden seviyesine uygun gruplarda yararlanır.":
      "Konuşma, Yazma, Okuma (Hikaye anlatımı), Dinleme ve Drama derslerinden seviyesine uygun gruplarda yararlanır.",
    // Yazım: "kayıtarı".
    "Sene sonunda öğrencinin yaptığı projeler, sunumlar, çalışmalar ve ses kayıtarı gibi tüm ürünler bir dosyada toplanır ve öğrenciye teslim edilir.":
      "Sene sonunda öğrencinin yaptığı projeler, sunumlar, çalışmalar ve ses kayıtları gibi tüm ürünler bir dosyada toplanır ve öğrenciye teslim edilir.",
  },
  ignored: [],
};

/* ---------------------------------------------------------------
 * Üniversite Hazırlık İngilizcesi
 *
 * Genel bilgi (doğrulama 2026-09-27): YÖK "Yükseköğretim Kurumlarında Yabancı Dil Öğretimi ve Yabancı
 * Dille Öğretim Yapılmasında Uyulacak Esaslara İlişkin Yönetmelik" (RG 23.03.2016/29662) —
 * https://resmigazete.gov.tr/eskiler/2016/03/20160323-6.htm
 * md. 6 muafiyet (kurum sınavı · YÖK'ün kabul ettiği merkezi / eşdeğer uluslararası sınavda senatonun
 * belirlediği puan · son 3 yıl ortaöğretimi anadil ülkesinde); md. 8/1, 8/4-a zorunlu hazırlık;
 * md. 8/4-c, 8/15 iki yılda başaramayan öğrencinin ilişiği; md. 8/2 Türkçe programlarda isteğe bağlı.
 * Ulusal asgari puan YOK (senato belirler). Eşdeğerlik: https://www.osym.gov.tr/uluslararasi-yabanci-dil-sinavlari-esdegerlikleri
 * ------------------------------------------------------------- */

const UNI_H1 = "Üniversite Hazırlık İngilizcesi";
const UNI_WHAT = "Üniversite Hazırlık İngilizcesi Nedir?";

const UNIVERSITE: EnglishProgramDef = {
  slug: "universite-ingilizce-kursu",
  label: "Üniversite Hazırlık İngilizcesi",
  meta: {},
  hero: {
    lead: { src: { heading: UNI_H1, take: [0] }, sentence: 0 },
    photo: { src: "/assets/university3.jpg", alt: "Kampüste çimlerde ders çalışan üniversite öğrencileri", width: 1024, height: 1024 },
    facts: [
      { label: "Akademik İngilizce", icon: "mezuniyet", basis: "page" },
      { label: "Sınav koordinatörleri", icon: "belge", basis: "page" },
      { label: "Tek çatı altında planlama", icon: "calisma", basis: "page" },
    ],
  },
  sections: [
    {
      id: "hazirlik-sureci",
      title: { source: UNI_WHAT },
      answer: { added: "Tercihten derse başlamaya kadar hazırlık sınıfı sorusu altı adımda karşınıza çıkar." },
      blocks: [
        {
          kind: "steps",
          src: { heading: UNI_WHAT, take: [0, 1, 2, 3, 4, 5] },
          titles: ["Tercih", "Kayıt", "Zorunlu hazırlık", "Eğitim dili", "Seviye tespit sınavı", "Karar"],
        },
      ],
    },
    {
      id: "muafiyet",
      title: { added: "Hazırlık sınıfından muaf olmanın yolları" },
      answer: { added: "YÖK yönetmeliği üç yol tanır; geçme puanını her üniversite kendisi belirler." },
      blocks: [
        {
          kind: "info",
          items: [
            { title: "Üniversitenin sınavı", icon: "belge", text: "Üniversitenin yaptığı seviye tespit ya da yeterlik (proficiency) sınavında başarılı olmak." },
            {
              title: "Eşdeğer sınav puanı",
              icon: "puan",
              text: "YÖK'ün kabul ettiği merkezi sınavlardan ya da ÖSYM'nin eşdeğer saydığı uluslararası sınavlardan, üniversite senatosunun belirlediği puanı almak.",
            },
            { title: "Yurt dışında lise", icon: "dunya", text: "Ortaöğretimin son en az üç yılını dilin anadil olarak konuşulduğu bir ülkede okumuş olmak." },
            { title: "Süre sınırı", icon: "sure", text: "Hazırlık sınıfını iki yıl içinde başaramayan öğrencinin, yabancı dille öğretim yapan programla ilişiği kesilir." },
            { title: "Türkçe programlar", icon: "kelime", text: "Türkçe öğretim yapan programlarda hazırlık sınıfı zorunlu değildir; isteğe bağlı açılabilir." },
          ],
        },
      ],
    },
    {
      id: "ddm",
      title: { added: "Dünya Dilleri Merkezi'nde üniversite hazırlık İngilizcesi" },
      answer: { added: "Akademik İngilizcede uzmanlaşmış öğretmenler ve sınav koordinatörleriyle." },
      blocks: [
        {
          kind: "highlights",
          photo: null,
          items: [
            { icon: "calisma", text: { src: { heading: UNI_H1, take: [0] }, sentence: 1 } },
            { icon: "grup", text: { src: { heading: UNI_H1, take: [0] }, sentence: 2 } },
          ],
        },
        {
          kind: "links",
          items: [
            { label: "Proficiency Kursu", href: "/sinav-hazirlik-egitimleri/proficiency-kursu", icon: "mezuniyet" },
            { label: "Proficiency Nedir?", href: "/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-nedir", icon: "soru" },
            { label: "YDS Kursu", href: "/sinav-hazirlik-egitimleri/yds-kursu", icon: "belge" },
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: "Hazırlık sınıfı zorunlu mu?",
      icon: "soru",
      answer: ["Kısmen ya da tamamen İngilizce öğretim yapan programlarda zorunludur. Türkçe öğretim yapan programlarda hazırlık sınıfı isteğe bağlıdır."],
    },
    {
      question: "Hazırlıktan muaf olmak için kaç puan gerekir?",
      icon: "puan",
      answer: ["Ulusal tek bir puan yoktur; geçme puanını her üniversitenin senatosu belirler. Hedeflediğiniz üniversitenin yeterlik sınavı yönergesine bakın."],
    },
    {
      question: "Hazırlık sınıfı en fazla kaç yıl sürer?",
      icon: "sure",
      answer: ["Yönetmeliğe göre iki yıl içinde başarılı olamayan öğrencinin yabancı dille öğretim yapan programla ilişiği kesilir."],
    },
    FAQ_START,
  ],
  sources: [
    "YÖK — Yükseköğretim Kurumlarında Yabancı Dil Öğretimi ve Yabancı Dille Öğretim Yapılmasında Uyulacak Esaslara İlişkin Yönetmelik (Resmî Gazete, 23.03.2016)",
    "ÖSYM — Uluslararası yabancı dil sınavları eşdeğerlikleri",
  ],
  edits: {
    // Eksik nokta.
    "Dünya Dilleri Merkezi Akademik İngilizce kurslarımız, sınav koordinatörlerimiz ve Üniversite hazırlık düzeyindeki öğrenciler için gerekli bilgi ve donanıma sahip her biri akademik amaçlar için İngilizce dilinde uzmanlaşmış öğretmenler tarafından düzenlenmektedir. Öğrencilerin üniversiteye giden yollarını tek çatı altında planlamaları için yabancı dil eğitimi gereksinimlerinin farkındayız. Bu sebeple gereken tüm destek ve birikimlerimizi değerli öğrencilerimizle paylaşmaktayız":
      "Dünya Dilleri Merkezi Akademik İngilizce kurslarımız, sınav koordinatörlerimiz ve Üniversite hazırlık düzeyindeki öğrenciler için gerekli bilgi ve donanıma sahip her biri akademik amaçlar için İngilizce dilinde uzmanlaşmış öğretmenler tarafından düzenlenmektedir. Öğrencilerin üniversiteye giden yollarını tek çatı altında planlamaları için yabancı dil eğitimi gereksinimlerinin farkındayız. Bu sebeple gereken tüm destek ve birikimlerimizi değerli öğrencilerimizle paylaşmaktayız.",
    // Yazım: "dönemin", "Hangi üniversite ?".
    "Yeni eğitim dönemin yakınlaşması ile öğrenciler yaşamlarını etkileyecek kararı veriyorlar; Hangi üniversite ?":
      "Yeni eğitim döneminin yakınlaşması ile öğrenciler yaşamlarını etkileyecek kararı veriyorlar: Hangi üniversite?",
    // Yazım: "bir çok".
    "Hem devlet üniversitelerinde hem de vakıf üniversitelerinde İngilizce hazırlık sınıfı bir çok bölüm için zorunlu olmaya başladı.":
      "Hem devlet üniversitelerinde hem de vakıf üniversitelerinde İngilizce hazırlık sınıfı birçok bölüm için zorunlu olmaya başladı.",
  },
  ignored: [],
};

/* ---------------------------------------------------------------
 * YKS Dil İngilizce
 *
 * Genel bilgi (doğrulama 2026-09-27): ÖSYM 2026 YKS kılavuzu —
 * https://dokuman.osym.gov.tr/pdfdokuman/2026/YKS/basvuru_kilavuz06022026.pdf
 * (YDT = YKS 3. oturum, 80 soru, 120 dakika; puan türü DİL = TYT %40 + YDT %60; 4 yanlış 1 doğruyu götürür).
 * Soru dağılımı: ÖSYM ayrıca yayımlamıyor; 2025 ve 2026 YDT İngilizce temel kitapçıklarında kaynaktaki
 * dağılımla aynı (boşluk doldurma 15 = kelime 5 + dilbilgisi 10; cloze 5; cümle tamamlama 8; okuma 15;
 * diyalog 5; anlamca yakın 5; durum 5; paragraf tamamlama 5; çeviri 6 + 6; anlam bütünlüğünü bozan 5) —
 * https://dokuman.osym.gov.tr/pdfdokuman/2026/YKS/TSK/ydt_ing_2026_kitapcik_Di55.pdf ,
 * https://dokuman.osym.gov.tr/pdfdokuman/2025/YKS/TSK/yks_ydt_ing_2025_kitapcik_Si42.pdf
 * ------------------------------------------------------------- */

const YKS_H1 = "YKS Dil İngilizce Kursu Ders Programı";
const YKS_TOPICS = "YKS adaylarının beklediği YKS İngilizce Konuları ve Soru Dağılımı";
const YKS_LIST = "YKS İngilizce Konuları Nedir?";
const YKS_INTRO =
  "Dünya Dilleri Merkezi 2003 yılından bugüne 8 farklı dilde yabancı dil eğitimi vermekle birlikte yabancı dil sınav sistemlerinde kullandığı özel öğretim metotları ile öğrencilerini dil sınavlarına hazırlamaktadır. YÖK ün açıkladığı yeni sınav sistemi YKS Dil konuları, MEB in yayınladığı müfredata uygun olarak YKS Dil İngilizce hazırlık eğitim programlarını uygulamaktayız.";

const YKS: EnglishProgramDef = {
  slug: "yks-dil-ingilizce",
  label: "YKS Dil İngilizce",
  meta: {},
  hero: {
    lead: { src: { heading: YKS_H1, take: [0] }, sentence: 1 },
    photo: { src: "/assets/study_exam.jpg", alt: "Sınava hazırlık masası: notlar, kitaplar ve saat", width: 735, height: 581 },
    facts: [
      { label: "80 soru · 120 dakika", icon: "sure", basis: "general" },
      { label: "YKS'nin 3. oturumu (YDT)", icon: "takvim", basis: "general" },
      { label: "DİL puan türü", icon: "puan", basis: "general" },
    ],
  },
  sections: [
    {
      id: "soru-dagilimi",
      title: { source: YKS_TOPICS },
      answer: { added: "Soruların en büyük payı paragraf (15), dilbilgisi (10) ve cümle tamamlama (8) sorularında." },
      blocks: [
        {
          kind: "distribution",
          heading: YKS_LIST,
          src: { heading: YKS_LIST, take: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
          note: { src: { heading: YKS_LIST, take: [12] } },
          total: 80,
        },
      ],
    },
    {
      id: "sinav",
      title: { added: "YDT İngilizce bir bakışta" },
      answer: { added: "YDT, YKS'nin üçüncü oturumudur; İngilizce testi 80 soru ve 120 dakikadır." },
      blocks: [
        {
          kind: "info",
          items: [
            { title: "Oturum", icon: "takvim", text: "YKS'nin 3. oturumu Yabancı Dil Testi'dir (YDT); TYT'den sonra aynı sınav döneminde yapılır." },
            { title: "Soru ve süre", icon: "sure", text: "İngilizce testi 80 sorudan oluşur, süresi 120 dakikadır." },
            { title: "Puan türü", icon: "puan", text: "DİL puanı, TYT'nin %40'ı ve YDT'nin %60'ı alınarak hesaplanır." },
            { title: "Net hesabı", icon: "soru", text: "Dört yanlış cevap bir doğru cevabı götürür." },
            { title: "Soru türleri", icon: "belge", text: "2025 ve 2026 YDT İngilizce kitapçıklarında soru türlerinin dağılımı yukarıdaki tabloyla aynıydı." },
          ],
        },
      ],
    },
    {
      id: "ddm",
      title: { added: "Dünya Dilleri Merkezi'nde YKS Dil hazırlığı" },
      answer: { added: "Dil sınavlarına özel öğretim yöntemleriyle." },
      blocks: [
        {
          kind: "highlights",
          photo: null,
          items: [{ icon: "kupa", text: { src: { heading: YKS_H1, take: [0] }, sentence: 0 } }],
        },
        {
          kind: "links",
          items: [
            { label: "YDS Kursu", href: "/sinav-hazirlik-egitimleri/yds-kursu", icon: "belge" },
            { label: "YDS Nedir?", href: "/sinav-hazirlik-egitimleri/yds-kursu/yds-nedir", icon: "soru" },
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: "YDT İngilizce kaç soru, kaç dakika?",
      icon: "sure",
      answer: ["80 soru, 120 dakika. YDT, YKS'nin üçüncü oturumudur."],
    },
    {
      question: "DİL puanı nasıl hesaplanır?",
      icon: "puan",
      answer: ["TYT'nin %40'ı ve YDT'nin %60'ı alınarak hesaplanır."],
    },
    {
      question: "Yanlış cevaplar doğruyu götürür mü?",
      icon: "soru",
      answer: ["Evet. Dört yanlış cevap bir doğru cevabı götürür."],
    },
    FAQ_START,
  ],
  sources: [
    "ÖSYM — 2026 Yükseköğretim Kurumları Sınavı (YKS) kılavuzu",
    "ÖSYM — 2025 ve 2026 YDT İngilizce temel soru kitapçıkları",
  ],
  edits: {
    // Yazım: kesme işaretleri.
    [YKS_INTRO]: YKS_INTRO.replace("YÖK ün", "YÖK'ün").replace("MEB in", "MEB'in"),
    // Yazım: virgülden sonra boşluk.
    "Dilbilgisi (10 Soru) (4 Soru Zamanlar,2 Soru Preposition, 3 Soru Conjunction, 1 Soru Quantifiers)":
      "Dilbilgisi (10 Soru) (4 Soru Zamanlar, 2 Soru Preposition, 3 Soru Conjunction, 1 Soru Quantifiers)",
  },
  ignored: [],
};

/* ---------------------------------------------------------------
 * Yaz Okulu İngilizce Programları — yalnız firma bilgisi (doğrulanacak genel olgu yok).
 * ------------------------------------------------------------- */

const YO_H1 = "Yaz Okulu İngilizce Kursu Ders Programları";
const YO_WHAT = "Yaz Okulu İngilizce Programları Nedir?";

const YAZ_OKULU: EnglishProgramDef = {
  slug: "yaz-okulu-ingilizce-kursu",
  label: "Yaz Okulu İngilizce Programları",
  meta: {
    description:
      "Dünya Dilleri Merkezi yaz okulu İngilizce programları: 7-22 yaş, 10-12 kişilik sınıflar, haftada 15-20 ders ve derslerin ardından aktiviteler.",
    reasons: [
      "description: kaynak Levent ve Etiler'i iki şube sayıyor, İngilizce kurs tarihi olmayan Ümraniye'yi ve gövdede geçmeyen 'online' programı anıyor — gövdedeki olgularla yeniden.",
    ],
  },
  hero: {
    lead: { src: { heading: YO_H1, take: [0] }, sentence: 1 },
    photo: { src: "/assets/summer_school.jpg", alt: "Yazın kampüste çimlerde ders yapan gençler", width: 800, height: 450 },
    facts: [
      { label: "7–22 yaş", icon: "grup", basis: "page" },
      { label: "10–12 kişilik sınıflar", icon: "calisma", basis: "page" },
      { label: "Haftada 15–20 ders", icon: "takvim", basis: "page" },
    ],
  },
  sections: [
    {
      id: "program",
      title: { source: YO_WHAT },
      answer: { added: "İngilizce derslerinin ardından sportif ve sosyal aktiviteler: tek programda." },
      blocks: [
        {
          kind: "facts",
          items: [
            { value: "7–22", label: "yaş arası öğrenciler" },
            { value: "10–12", label: "kişilik sınıflar" },
            { value: "15–20", label: "ders / hafta" },
          ],
          from: { heading: YO_WHAT, take: [0, 1] },
        },
        {
          kind: "cards",
          src: { heading: YO_WHAT, take: [2, 3, 4] },
          items: [
            { title: "Konuşma odaklı", icon: "konusma" },
            { title: "Oyunla öğrenme", icon: "aktivite" },
            { title: "Sınıf dersleri", icon: "dilbilgisi" },
            { title: "Verimli bir yaz", icon: "takvim" },
          ],
        },
      ],
    },
    {
      id: "ddm",
      title: { added: "Dünya Dilleri Merkezi'nde yaz okulu" },
      answer: { added: "Yurt içinde ve yurt dışında, uygulamalı ve katılımcı programlar." },
      blocks: [
        {
          kind: "highlights",
          photo: null,
          items: [
            { icon: "dunya", text: { src: { heading: YO_H1, take: [0] }, sentence: 0 } },
            { icon: "aktivite", text: { src: { heading: YO_H1, take: [0] }, sentence: 2 } },
            { icon: "grup", text: { src: { heading: YO_H1, take: [1] } } },
          ],
        },
        { kind: "chips", title: "Programdaki konulardan", items: ["bilim", "tarih", "sinema", "sanat ve zanaat", "meslek"] },
        {
          kind: "links",
          items: [{ label: "Yurtdışı Yaz Okulları", href: "/yurtdisi-egitim/yaz-okullari", icon: "ucak" }],
        },
      ],
    },
  ],
  faq: [
    {
      question: "Yaz okulu hangi yaşlar için?",
      icon: "grup",
      answer: ["7–22 yaş arasındaki öğrenciler için; İngilizce dersleri ile sportif ve sosyal aktiviteleri bir arada sunar."],
    },
    {
      question: "Sınıflar kaç kişilik, haftada kaç ders var?",
      icon: "takvim",
      answer: ["Sınıflar 10–12 kişiliktir; öğrenciler haftada 15–20 ders alır, derslerin ardından aktivite programları yapılır."],
    },
    {
      question: "Yurt dışında yaz okulu seçeneği var mı?",
      icon: "ucak",
      answer: ["Evet. Yurt dışı yaz okulu programları için Yurtdışı Eğitim menüsündeki Yaz Okulları sayfasına bakabilirsiniz."],
    },
    FAQ_START,
  ],
  sources: [],
  ignored: [],
};

export const ENGLISH_PROGRAMS: EnglishProgramDef[] = [UNIVERSITE, YKS, ILKOGRETIM, YAZ_OKULU];

/** Program şeridinin sırası (menüyle aynı). */
export const PROGRAM_STRIP = ENGLISH_PROGRAMS.map((p) => ({ label: p.label, slug: p.slug }));

export const ENGLISH_PROGRAM_PATHS: string[] = ENGLISH_PROGRAMS.map((d) => `${IK}/${d.slug}`);
