import type { IconName } from "@/components/graphics/icons";
import type { LanguageKey } from "@/lib/languageContent";
import type { Faq, LevelGroup } from "@/lib/types";

/**
 * Dil Kursu sayfası — UI turu (2026-09-25) ekleri.
 *
 * İçerik kuralı (kullanıcı kararı, 2026-09-25):
 * - FİRMAYA ÖZEL bilgiye (kur sayısı/süresi, ders saati, sertifika, not
 *   barajı…) ekleme-çıkarma YOK. Bunlar sayfada zaten yazılıysa ancak aynı
 *   anlamda yeniden cümlelenebilir (bkz. `lib/languageFaq.ts`).
 * - DİLİN KENDİSİ hakkındaki evrensel bilgi yeni metin olarak eklenebilir —
 *   kaynakta "Neden … Öğrenmelisiniz?" bölümü olmayan 3 dilin metni burada.
 *
 * `benefits` etiketleri o dilin kaynak metnindeki ifadelerden kısaltılmıştır
 * (kaynakta metin yoksa buradaki eklenen metinden); "kariyer" kullanıcı
 * isteğiyle her dilde var.
 */

export type LanguageBenefit = { icon: IconName; label: string };

export type LanguageExtra = {
  /**
   * Fotoğraflar (2026-09-26, kullanıcı: "her dilden en az 2 fotoğraf var, tekrar etmesin"):
   * hero geniş ve yatay (metnin sağında, sola/aşağı erir; mobilde şerit) → yatay kompozisyon;
   * "Neden … Öğrenmelisiniz?" kutusu kareye yakın (4:3.5) → dik ya da ortası güçlü kare kompozisyon.
   */
  heroPhoto: { src: string; alt: string };
  benefitsPhoto: { src: string; alt: string };
  benefits: LanguageBenefit[];
  /** Kaynakta `whyLearn` yoksa eklenen evrensel metin (başlık + paragraflar). */
  whyLearnAdded: { heading: string; paragraphs: string[] } | null;
  /**
   * Kaynakta seviye grupları (G) yoksa eklenen GENEL seviye bilgisi: "bu seviyede genellikle neler öğrenilir" +
   * dilin uluslararası sınavındaki karşılığı. Firmanın müfredatı DEĞİLDİR, öyle yazılmaz.
   */
  levelsAdded?: { heading: string; groups: LevelGroup[] };
  /** Kaynakta uluslararası sınav paragrafı yoksa ikinci sertifika kutusunun genel bilgi metni. */
  certAdded?: string;
  /** Dile özgü genel bilgi soruları — SSS'nin sonuna, CEFR sorusundan önce eklenir. */
  faqAdded?: Faq[];
};

const IMG = "/assets/home_page_images";

export const LANGUAGE_EXTRAS: Record<LanguageKey, LanguageExtra> = {
  en: {
    heroPhoto: { src: `${IMG}/dil-ingilizce.jpg`, alt: "Londra'da Westminster Sarayı ve Thames Nehri" },
    benefitsPhoto: { src: `${IMG}/dil-ingilizce2.jpg`, alt: "Londra'da Big Ben, Thames Nehri ve London Eye, gün batımı" },
    benefits: [
      { icon: "kupa", label: "Kariyerinde yükselmek" },
      { icon: "mezuniyet", label: "Yurtdışında eğitim almak" },
      { icon: "dunya", label: "Uluslararası şirketlerde çalışmak" },
      { icon: "sohbet", label: "Günlük hayatta özgüvenle konuşmak" },
    ],
    whyLearnAdded: null,
  },
  de: {
    heroPhoto: { src: `${IMG}/dil-almanca3.jpg`, alt: "Berlin'de Spree Nehri, Televizyon Kulesi ve Berlin Katedrali, gün batımı" },
    benefitsPhoto: { src: `${IMG}/dil-almanca.jpg`, alt: "Köln Katedrali ve Hohenzollern Köprüsü" },
    benefits: [
      { icon: "kupa", label: "Kariyer fırsatları" },
      { icon: "mezuniyet", label: "Avrupa'da eğitim almak" },
      { icon: "konum", label: "Almanya'da çalışmak" },
      { icon: "sohbet", label: "Günlük yaşamda rahat iletişim" },
    ],
    whyLearnAdded: null,
  },
  fr: {
    heroPhoto: { src: `${IMG}/dil-fransizca3.jpg`, alt: "Paris'te balkonlu klasik bir bina ve arkada Eyfel Kulesi" },
    benefitsPhoto: { src: `${IMG}/dil-fransizca2.jpg`, alt: "Gece Paris'te Zafer Takı'ndan yayılan caddeler ve Eyfel Kulesi" },
    benefits: [
      { icon: "kupa", label: "Uluslararası kariyer" },
      { icon: "mezuniyet", label: "Fransa'da eğitim almak" },
      { icon: "ulasim", label: "Seyahatlerde rahat iletişim" },
      { icon: "dunya", label: "Diplomasi, sanat ve moda" },
    ],
    whyLearnAdded: null,
  },
  it: {
    heroPhoto: { src: `${IMG}/dil-italyanca.jpg`, alt: "Roma'da Pantheon önündeki meydan" },
    benefitsPhoto: { src: `${IMG}/dil-italyanca2.jpg`, alt: "Roma'da Kolezyum'un havadan görünümü" },
    benefits: [
      { icon: "kupa", label: "Kariyer fırsatları" },
      { icon: "mezuniyet", label: "İtalya'da eğitim almak" },
      { icon: "ulasim", label: "Seyahatlerde rahat iletişim" },
      { icon: "dunya", label: "Sanat, moda ve gastronomi" },
    ],
    whyLearnAdded: null,
  },
  es: {
    heroPhoto: { src: `${IMG}/dil-ispanyolca-2.jpg`, alt: "Madrid'de Metropolis Binası ve Gran Vía, gün batımı" },
    benefitsPhoto: { src: `${IMG}/dil-ispanyolca.jpg`, alt: "Barselona'da gotik katedral" },
    benefits: [
      { icon: "kupa", label: "Kariyer fırsatlarını artırmak" },
      { icon: "mezuniyet", label: "Yurtdışında eğitim almak" },
      { icon: "ulasim", label: "Seyahatlerde rahat iletişim" },
      { icon: "dunya", label: "Farklı kültürleri keşfetmek" },
    ],
    whyLearnAdded: null,
  },
  ru: {
    heroPhoto: { src: `${IMG}/dil-rusca2.jpg`, alt: "Moskova'da Aziz Vasil Katedrali" },
    benefitsPhoto: { src: `${IMG}/dil-rusca.jpg`, alt: "Moskova'da Kızıl Meydan'daki Devlet Tarih Müzesi" },
    benefits: [
      { icon: "kupa", label: "Kariyer fırsatlarını artırmak" },
      { icon: "ucret", label: "Ticaret ve turizm" },
      { icon: "dunya", label: "Farklı kültürleri keşfetmek" },
      { icon: "sohbet", label: "Uluslararası iletişim" },
    ],
    whyLearnAdded: null,
  },
  zh: {
    heroPhoto: { src: `${IMG}/dil-cince2.jpg`, alt: "Dağların üzerinde uzanan Çin Seddi, gün batımı" },
    benefitsPhoto: { src: `${IMG}/dil-cince.jpg`, alt: "Geleneksel Çin tapınak mimarisi" },
    benefits: [
      { icon: "kupa", label: "Kariyerinde yükselmek" },
      { icon: "grup", label: "Ana dili olarak en çok konuşulan dil" }, // Ethnologue: toplamda 1. İngilizce (2026-09-26)
      { icon: "ucret", label: "Güçlenen ekonomik ilişkiler" },
      { icon: "mezuniyet", label: "Geleceğe yatırım" },
    ],
    whyLearnAdded: null,
  },
  nl: {
    heroPhoto: { src: `${IMG}/dil-felemenkce.jpg`, alt: "Amsterdam'da kanal kenarı" },
    benefitsPhoto: { src: `${IMG}/dil-felemenkce2.jpg`, alt: "Amsterdam'da kanal kıyısındaki renkli evler" },
    benefits: [
      { icon: "kupa", label: "Kariyerinde yükselmek" },
      { icon: "konum", label: "Hollanda ve Belçika'da çalışmak" },
      { icon: "mezuniyet", label: "Hollanda'da eğitim almak" },
      { icon: "sohbet", label: "Günlük hayatta rahat iletişim" },
    ],
    whyLearnAdded: {
      heading: "Neden Hollandaca Öğrenmelisiniz?",
      paragraphs: [
        "Hollandaca (Felemenkçe); Hollanda'nın, Belçika'nın Flaman bölgesinin ve Surinam'ın resmi dilidir. Avrupa'nın önemli ticaret ve lojistik merkezlerinden Hollanda'da eğitim almak, çalışmak ya da yaşamak isteyenler için Hollandaca bilmek hem iş hayatında hem de günlük hayatta kapıları açar.",
        "Hollandaca, İngilizce ve Almanca ile aynı dil ailesindendir; bu dillerden birini bilenler kelime ve yapı benzerlikleri sayesinde Hollandacada daha hızlı ilerler.",
      ],
    },
  },
  tr: {
    heroPhoto: { src: `${IMG}/dil-turkce3.jpg`, alt: "İstanbul'da Tarihi Yarımada ve Boğaz'ın havadan görünümü, gün batımı" },
    benefitsPhoto: { src: `${IMG}/dil-turkce2.jpg`, alt: "Galata Kulesi ve Haliç'in havadan görünümü" },
    benefits: [
      { icon: "kupa", label: "Kariyerinde yükselmek" },
      { icon: "konum", label: "Türkiye'de iş hayatı" },
      { icon: "mezuniyet", label: "Türk üniversitelerinde eğitim" },
      { icon: "sohbet", label: "Günlük hayatta rahat iletişim" },
    ],
    whyLearnAdded: {
      heading: "Neden Türkçe Öğrenmelisiniz?",
      paragraphs: [
        "Türkiye'de yaşayan, çalışan ya da okuyan yabancılar için Türkçe; resmi işlemlerden alışverişe, iş hayatından komşuluk ilişkilerine kadar günlük hayatın her alanında iletişimi kolaylaştırır.",
        "Türkçe eğitim veren üniversite programları dil yeterliliği ister; Türkçe bilmek, Türkiye'de eğitim almak isteyenler için de önemli bir avantajdır. Türkiye'nin kültürünü ve insanlarını yakından tanımanın en kısa yolu da Türkçedir.",
      ],
    },
  },
  speak: {
    // Bu sayfa için tek fotoğraf var; ikincisi gelene kadar iki yerde aynı.
    heroPhoto: { src: `${IMG}/ingilizce-konusma.jpg`, alt: "Masa etrafında İngilizce sohbet eden bir grup" },
    benefitsPhoto: { src: `${IMG}/ingilizce-konusma.jpg`, alt: "Masa etrafında İngilizce sohbet eden bir grup" },
    benefits: [
      { icon: "kupa", label: "Kariyerinde yükselmek" },
      { icon: "konusma", label: "Akıcı ve özgüvenli konuşmak" },
      { icon: "grup", label: "İş görüşmeleri ve toplantılar" },
      { icon: "ulasim", label: "Seyahatte rahat iletişim" },
    ],
    whyLearnAdded: {
      heading: "Neden İngilizce Konuşma Pratiği Yapmalısınız?",
      paragraphs: [
        "Birçok kişi İngilizceyi okuyup anlayabildiği hâlde konuşurken zorlanır. Konuşma, düzenli pratikle gelişen bir beceridir: doğru telaffuz, akıcılık ve anında cevap verebilme özgüveni dili gerçek sohbetlerde kullandıkça kazanılır.",
        "İş görüşmelerinde, toplantılarda, seyahatte ve yurtdışı başvurularında fark yaratan da çoğu zaman konuşma becerisidir.",
      ],
    },
  },
  /*
   * Japonca (2026-10-01) — kurumun metni ddmcadde'den (`data/languages.ts`), aşağıdakiler GENEL bilgi. Kaynaklar:
   * - JLPT seviye tanımları, yılda iki sınav (temmuz / aralık): https://www.jlpt.jp/e/about/levelsummary.html
   * - JLPT ↔ CEFR (Aralık 2025'ten itibaren sonuç belgesinde; N5 ≥80 A1 · N4 ≥90 A2 · N3 ≥104 B1 · N2 ≥112 B2 ·
   *   N1 ≥142 C1; "C2 karşılığı yok"): https://www.jlpt.jp/e/about/cefr_reference.html
   * - Türkiye sınav merkezleri: Ankara Üniversitesi TÖMER (temmuz + aralık), İstanbul Japon Sanat Derneği (yalnız
   *   aralık) — https://www.jlpt.jp/e/application/overseas_list.html (2026-10-01'de kontrol edildi; her yıl değişebilir)
   * - Düzenleyen: yurt dışında Japonya Vakfı, Japonya'da JEES — https://www.jlpt.jp/e/about/index.html
   * - Jōyō kanji listesi 2.136 karakter (2010 Kabine Tebliği No. 2): https://www.bunka.go.jp/kokugo_nihongo/sisaku/joho/joho/kijun/naikaku/kanji/
   * - Ana dil konuşuru 120 milyonun üzerinde (Ethnologue 2026: 124 milyon): https://www.ethnologue.com/language/jpn/
   * - Söz dizimi SOV (Japonca + Türkçe): WALS 81A — https://wals.info/feature/81A
   * - Seviye adları 初級 / 中級 / 上級 (başlangıç / orta / ileri): Japonca öğretiminin yerleşik seviye adlandırması;
   *   diğer dillerde kaynağın kendi dildeki adı ("Livello Principiante") yerine geçer.
   */
  ja: {
    heroPhoto: { src: `${IMG}/dil-japonca.jpg`, alt: "Japonya'da kırmızı pagodası ve kiremit çatılarıyla geleneksel bir tapınak" },
    benefitsPhoto: { src: `${IMG}/dil-japonca2.jpg`, alt: "Japonya'da Japonca tabelalarla dolu kalabalık bir alışveriş caddesi" },
    benefits: [
      { icon: "kupa", label: "Japon şirketlerinde kariyer" },
      { icon: "mezuniyet", label: "Japonya'da eğitim ve burs" },
      { icon: "ulasim", label: "Japonya'yı gezmek" },
      { icon: "okuma", label: "Kültürü kaynağından takip etmek" },
    ],
    whyLearnAdded: {
      heading: "Neden Japonca Öğrenmelisiniz?",
      paragraphs: [
        "Japonca, 120 milyonu aşkın kişinin ana dilidir ve dünyanın en büyük ekonomilerinden birinin iş, teknoloji ve kültür dünyasına açılan kapıdır.",
        "Japonya'da eğitim, burs ve iş başvurularında Japonca bilgisi çoğunlukla JLPT belgesiyle gösterilir; bu sınava Türkiye'de de girilebilir.",
        "Dil bilgisi Türkçe konuşanlara tanıdık gelir: Japonca da eklemeli bir dildir ve yüklem cümlenin sonunda yer alır.",
      ],
    },
    levelsAdded: {
      heading: "Japonca seviyeleri ve JLPT karşılıkları",
      groups: [
        {
          name: "Shokyū 初級",
          range: "A1 – A2",
          intro: "Japon yazısının temelleri ve günlük iletişim. JLPT'de N5 ve N4'e karşılık gelir.",
          items: [
            "Hiragana ve katakana",
            "Temel kanjiler",
            "Kendini tanıtma ve günlük kalıplar",
            "Kibar konuşma biçimi (-desu / -masu)",
            "Yavaş ve net konuşmaları anlama",
          ],
        },
        {
          name: "Chūkyū 中級",
          range: "B1 – B2",
          intro: "Günlük ve iş hayatında Japonca. JLPT'de N3 ve N2'ye karşılık gelir.",
          items: [
            "Gazete başlıkları ve günlük metinler",
            "Doğal hıza yakın konuşmaları anlama",
            "Kanji ve kelime dağarcığını genişletme",
            "Saygı dili (keigo) ile resmî iletişim",
            "Görüş bildirme ve olay anlatma",
          ],
        },
        {
          name: "Jōkyū 上級",
          range: "C1 – C2",
          intro: "Akademik ve profesyonel düzeyde Japonca. JLPT'de N1'e karşılık gelir.",
          items: [
            "Karmaşık ve soyut metinleri okuma",
            "Doğal hızdaki konuşma, haber ve dersleri anlama",
            "Akademik ve iş Japoncası",
            "Tartışma ve sunumlarda akıcılık",
          ],
        },
      ],
    },
    certAdded:
      "Japonca bilginizi uluslararası düzeyde belgelemek için JLPT'ye (Japonca Yeterlilik Sınavı) girebilirsiniz. Sınav N5'ten N1'e beş seviyedir; Türkiye'de Ankara Üniversitesi TÖMER'de temmuz ve aralıkta, İstanbul'da Japon Sanat Derneği'nde aralıkta yapılır.",
    faqAdded: [
      {
        question: "Japonca öğrenmek zor mu?",
        answer: [
          "Dil bilgisi Türkçe konuşanlara tanıdık gelir: Japonca da eklemeli bir dildir ve cümle özne – nesne – yüklem sırasıyla kurulur. Beş ünlüsü ve basit hece yapısıyla telaffuzu da zorlayıcı değildir.",
          "En çok zaman alan kısım yazıdır; kanjileri öğrenmek düzenli tekrar ister.",
        ],
        icon: "soru",
      },
      {
        question: "Japoncada kaç yazı sistemi var?",
        answer: [
          "Üç yazı sistemi birlikte kullanılır: hiragana (ekler ve Japonca kökenli sözcükler), katakana (yabancı kökenli sözcükler) ve kanji (Çinceden gelen, anlam taşıyan karakterler). Hiragana ve katakananın her birinde 46 temel karakter vardır.",
          "Günlük yazı için resmî Jōyō kanji listesinde 2.136 karakter yer alır.",
        ],
        icon: "yazma",
      },
      {
        question: "JLPT nedir, hangi seviyeleri var?",
        answer: [
          "JLPT (Japanese-Language Proficiency Test), Japoncayı ana dili olarak konuşmayanlar için uluslararası yeterlilik sınavıdır. Yurt dışında Japonya Vakfı, Japonya'da JEES tarafından düzenlenir.",
          "N5'ten (temel) N1'e (ileri) beş seviyesi vardır. Aralık 2025 sınavından itibaren sonuç belgesinde puana göre CEFR karşılığı da gösterilir; en üst karşılık C1'dir.",
        ],
        icon: "belge",
      },
    ],
  },
  /*
   * Korece (2026-10-01) — kurumun metni ddmcadde'den, aşağıdakiler GENEL bilgi. Kaynaklar:
   * - TOPIK I (1–2. seviye) / TOPIK II (3–6. seviye), sonuç 2 yıl geçerli: https://www.topik.go.kr
   * - Türkiye'de sınav: İstanbul Başkonsolosluğu + Ankara Kore Kültür Merkezi (sınav yeri Ankara Üniversitesi) —
   *   105. TOPIK duyurusu (14.01.2026): https://www.mofa.go.kr/tr-istanbul-tr/brd/m_8764/view.do?seq=761746
   * - Hangıl: 1443'te Kral Sejong, 1446'da ilan (Hunminjeongeum); temel 14 ünsüz + 10 ünlü — National Institute of
   *   Korean Language: https://www.korean.go.kr
   * - Söz dizimi SOV (Korece + Türkçe): WALS 81A — https://wals.info/feature/81A
   */
  ko: {
    heroPhoto: { src: `${IMG}/dil-korece2.jpg`, alt: "Gece Seul'ün gökdelenleri ve şehir ışıkları" },
    benefitsPhoto: { src: `${IMG}/dil-korece.jpg`, alt: "Seul'de geleneksel Kore evleri (hanok) arasında yokuş bir sokak, arkada şehir" },
    benefits: [
      { icon: "kupa", label: "Koreli şirketlerde kariyer" },
      { icon: "mezuniyet", label: "Kore'de üniversite eğitimi" },
      { icon: "dunya", label: "Kore ve dünya pazarında fırsatlar" },
      { icon: "okuma", label: "Kore kültürünü kaynağından takip etmek" },
    ],
    whyLearnAdded: {
      heading: "Neden Korece Öğrenmelisiniz?",
      paragraphs: [
        "Korece, Güney ve Kuzey Kore'nin resmî dilidir. Teknoloji, otomotiv ve eğlence sektörlerinde dünyaya açılan Kore şirketleriyle çalışmanın, Kore'de okumanın ve yaşamanın anahtarıdır.",
        "Kore'de eğitim ve iş başvurularında Korece bilgisi çoğunlukla TOPIK belgesiyle gösterilir; bu sınava Türkiye'de de girilebilir.",
        "Dil bilgisi Türkçe konuşanlara tanıdık gelir: Korece de eklemeli bir dildir ve yüklem cümlenin sonunda yer alır.",
      ],
    },
    levelsAdded: {
      heading: "Korece seviyeleri ve TOPIK karşılıkları",
      groups: [
        {
          name: "Chogeup 초급",
          range: "A1 – A2",
          intro: "Hangıl alfabesi ve günlük iletişim. TOPIK I'in 1. ve 2. seviyesinin kapsadığı düzeydir.",
          items: [
            "Hangıl alfabesini okuma ve yazma",
            "Kendini tanıtma ve günlük kalıplar",
            "Kibar konuşma biçimi (-yo / -seumnida)",
            "Temel dil bilgisi ve sayı sistemleri",
            "Yavaş ve net konuşmaları anlama",
          ],
        },
        {
          name: "Junggeup 중급",
          range: "B1 – B2",
          intro: "Günlük ve iş hayatında Korece. TOPIK II'nin 3. ve 4. seviyesinin kapsadığı düzeydir.",
          items: [
            "Günlük metinleri ve haberleri anlama",
            "Kamusal ortamlarda ve iş yerinde iletişim",
            "Saygı dili ve resmî yazışma",
            "Görüş bildirme ve olay anlatma",
          ],
        },
        {
          name: "Gogeup 고급",
          range: "C1 – C2",
          intro: "Akademik ve profesyonel düzeyde Korece. TOPIK II'nin 5. ve 6. seviyesinin kapsadığı düzeydir.",
          items: [
            "Akademik ve uzmanlık metinlerini okuma",
            "Siyaset, ekonomi ve kültür konularında tartışma",
            "Akademik yazı ve sunum",
            "Doğal hızdaki konuşmaları anlama",
          ],
        },
      ],
    },
    certAdded:
      "Korece bilginizi uluslararası düzeyde belgelemek için TOPIK'e (Korece Yeterlilik Sınavı) girebilirsiniz. TOPIK I 1–2., TOPIK II 3–6. seviyeleri ölçer; sonuç iki yıl geçerlidir. Türkiye'de başvurular İstanbul'da Kore Başkonsolosluğu'na, Ankara'da Kore Kültür Merkezi'ne yapılır.",
    faqAdded: [
      {
        question: "Korece öğrenmek zor mu?",
        answer: [
          "Dil bilgisi Türkçe konuşanlara tanıdık gelir: Korece de eklemeli bir dildir ve cümle özne – nesne – yüklem sırasıyla kurulur. Ekler sözcüğün sonuna gelir.",
          "Alfabe hızlı öğrenilir; zaman alan kısım, konuşulan kişiye göre değişen saygı dili ve kelime dağarcığıdır.",
        ],
        icon: "soru",
      },
      {
        question: "Hangıl alfabesi nedir?",
        answer: [
          "Hangıl, Kral Sejong döneminde 1443'te yaratılan ve 1446'da ilan edilen Kore alfabesidir. Temelde 14 ünsüz ve 10 ünlüden oluşur; harfler hece blokları hâlinde bir araya getirilerek yazılır.",
        ],
        icon: "yazma",
      },
      {
        question: "TOPIK nedir, hangi seviyeleri var?",
        answer: [
          "TOPIK (Test of Proficiency in Korean), Koreceyi ana dili olarak konuşmayanlar için Kore hükümetinin düzenlediği yeterlilik sınavıdır. TOPIK I başlangıç (1–2. seviye), TOPIK II orta ve ileri (3–6. seviye) düzeyini ölçer.",
          "Sonuç, açıklandığı tarihten itibaren iki yıl geçerlidir.",
        ],
        icon: "belge",
      },
    ],
  },
  /*
   * Yunanca (2026-10-01) — GENEL bilgi kaynakları:
   * - Yunanca Yeterlilik Belgesi (Ellinomatheia), Yunan Dili Merkezi; A1–C2 altı seviye; her yıl Yunanistan'da ve yurt
   *   dışındaki sınav merkezlerinde: https://www.greek-language.gr/certification/index.html?lg=2
   *   (Türkiye'de sınav merkezi doğrulanamadı → yer yazılmadı)
   * - Yunanistan + Kıbrıs resmî dili, AB resmî dili: https://european-union.europa.eu/principles-countries-history/languages_en
   * - "liman" < Rumca limáni, "fener" < Rumca fanári: Nişanyan Sözlük — https://www.nisanyansozluk.com
   */
  el: {
    heroPhoto: { src: `${IMG}/dil-yunanca.jpg`, alt: "Atina'da Akropolis ve Parthenon, gün batımı" },
    benefitsPhoto: { src: `${IMG}/dil-yunanca2.jpg`, alt: "Santorini'de yamaca kurulu beyaz evler ve yel değirmeni, akşam ışıkları" },
    benefits: [
      { icon: "kupa", label: "Uluslararası kariyer" },
      { icon: "mezuniyet", label: "Yunanistan'da eğitim" },
      { icon: "ulasim", label: "Yunanistan ve adaları gezmek" },
      { icon: "okuma", label: "Kültürü kaynağından tanımak" },
    ],
    whyLearnAdded: {
      heading: "Neden Yunanca Öğrenmelisiniz?",
      paragraphs: [
        "Yunanca, Yunanistan ile Kıbrıs'ın resmî dili ve Avrupa Birliği'nin resmî dillerinden biridir. Komşu ülkeyle ticaret, turizm ve eğitimde doğrudan iletişim kurmanızı sağlar.",
        "Türkçeyle ortak sözcükleri boldur: \"liman\" ve \"fener\" gibi pek çok sözcük Türkçeye Rumcadan geçmiştir. Bu ortak hazine, kelime öğrenmeyi kolaylaştırır.",
        "Yunanca bilginizi, Yunan Dili Merkezi'nin verdiği Yunanca Yeterlilik Belgesi'yle A1'den C2'ye belgeleyebilirsiniz.",
      ],
    },
    levelsAdded: {
      heading: "Yunanca seviyeleri ve Yunanca Yeterlilik Belgesi",
      groups: [
        {
          name: "Αρχάριο επίπεδο",
          range: "A1 – A2",
          intro: "Yunan alfabesi ve günlük iletişim. Yunanca Yeterlilik Belgesi'nin A1 ve A2 seviyeleri.",
          items: [
            "Yunan alfabesini okuma ve yazma",
            "Vurgu ve telaffuz",
            "Kendini tanıtma ve günlük kalıplar",
            "Temel dil bilgisi: isim cinsiyetleri ve fiil çekimi",
            "Yavaş ve net konuşmaları anlama",
          ],
        },
        {
          name: "Μέσο επίπεδο",
          range: "B1 – B2",
          intro: "Günlük ve iş hayatında Yunanca. Belgenin B1 ve B2 seviyeleri.",
          items: [
            "Günlük metinleri ve haberleri anlama",
            "İş ve resmî yazışma",
            "Görüş bildirme ve olay anlatma",
            "Kelime bilgisini ve dil kullanımını genişletme",
          ],
        },
        {
          name: "Προχωρημένο επίπεδο",
          range: "C1 – C2",
          intro: "Akademik ve profesyonel düzeyde Yunanca. Belgenin C1 ve C2 seviyeleri.",
          items: [
            "Akademik ve edebi metinleri okuma",
            "Doğal hızdaki konuşmaları anlama",
            "Akademik yazı ve sunum",
            "Tartışmalarda akıcılık",
          ],
        },
      ],
    },
    certAdded:
      "Yunanca bilginizi uluslararası düzeyde belgelemek için Yunan Dili Merkezi'nin Yunanca Yeterlilik Belgesi (Ellinomatheia) sınavına girebilirsiniz. Belge A1'den C2'ye altı seviyede verilir; sınavlar her yıl Yunanistan'da ve yurt dışındaki sınav merkezlerinde yapılır.",
    faqAdded: [
      {
        question: "Yunanca öğrenmek zor mu?",
        answer: [
          "Alfabe ilk haftalarda öğrenilir; 24 harfin bir kısmı Latin harflerine benzer. Türkçeyle ortak sözcüklerin çokluğu kelime öğrenmeyi kolaylaştırır.",
          "Zaman alan kısım dil bilgisidir: isimlerin üç cinsiyeti ve hâl ekleri vardır, fiiller kişiye göre çekimlenir.",
        ],
        icon: "soru",
      },
      {
        question: "Yunan alfabesinde kaç harf var?",
        answer: [
          "24 harf vardır: Α (alfa) ile başlar, Ω (omega) ile biter. Latin ve Kiril alfabeleri Yunan alfabesinden türemiştir; matematik ve bilimde kullanılan π, Σ gibi semboller de buradan gelir.",
        ],
        icon: "yazma",
      },
      {
        question: "Yunanca Yeterlilik Belgesi nedir?",
        answer: [
          "Yunan Dili Merkezi'nin düzenlediği, Yunancayı yabancı dil olarak öğrenenlerin seviyesini A1'den C2'ye altı seviyede belgeleyen sınavdır (Ellinomatheia). Dinleme, okuma, yazma ve konuşma becerileri ölçülür.",
          "Sınavlar her yıl Yunanistan'da ve yurt dışındaki sınav merkezlerinde yapılır; güncel tarihler için Yunan Dili Merkezi'nin sitesine bakabilirsiniz.",
        ],
        icon: "belge",
      },
    ],
  },
  /*
   * Bulgarca (2026-10-01) — GENEL bilgi kaynakları:
   * - Sofya Üniversitesi standart Bulgarca sınavları A2–C2, konuşma + dinleme / okuma / yazma; çevrim içi platform,
   *   üniversitede ya da yurt dışında gözetimli: https://deo.uni-sofia.bg/en/standardized-tests-in-bulgarian-language-proficiency/
   * - Bulgaristan resmî dili, AB resmî dili; Kiril alfabesi 2007'den beri AB'nin üçüncü alfabesi:
   *   https://european-union.europa.eu/principles-countries-history/languages_en
   * - Bulgarca alfabe 30 harf; isim hâl çekimi büyük ölçüde yok (seslenme hâli kalır), belirli tanımlık sözcüğün sonuna gelir: Bulgar Bilimler Akademisi
   *   Bulgar Dili Enstitüsü — https://ibl.bas.bg
   */
  bg: {
    heroPhoto: { src: `${IMG}/dil-bulgarca2.jpg`, alt: "Bulgaristan'da tepelerle çevrili bir şehrin gün batımında panoraması" },
    benefitsPhoto: { src: `${IMG}/dil-bulgarca.jpg`, alt: "Sofya'da altın ve yeşil kubbeli Aleksandr Nevski Katedrali" },
    benefits: [
      { icon: "kupa", label: "Uluslararası kariyer" },
      { icon: "mezuniyet", label: "Bulgaristan'da eğitim" },
      { icon: "ulasim", label: "Bulgaristan'ı gezmek" },
      { icon: "dunya", label: "Avrupa Birliği'nde fırsatlar" },
    ],
    whyLearnAdded: {
      heading: "Neden Bulgarca Öğrenmelisiniz?",
      paragraphs: [
        "Bulgarca, komşumuz Bulgaristan'ın resmî dili ve Avrupa Birliği'nin resmî dillerinden biridir. Ticaret, turizm ve Bulgaristan'da eğitim için doğrudan iletişim kurmanızı sağlar.",
        "Türkçeden geçmiş pek çok sözcük barındırır; \"чорба\" (çorba) ve \"чанта\" (çanta) bunlardan yalnızca ikisi.",
        "Kiril alfabesini Bulgarcayla öğrenmek, Rusça ve Sırpça gibi diğer Slav dillerine de kapı aralar.",
      ],
    },
    levelsAdded: {
      heading: "Bulgarca seviyeleri ve uluslararası sınavlar",
      groups: [
        {
          name: "Начално ниво",
          range: "A1 – A2",
          intro: "Kiril alfabesi ve günlük iletişim. Sofya Üniversitesi'nin standart sınavı A2 seviyesinden başlar.",
          items: [
            "Kiril alfabesini okuma ve yazma",
            "Kendini tanıtma ve günlük kalıplar",
            "Temel dil bilgisi: belirli tanımlık ve fiil çekimi",
            "Yavaş ve net konuşmaları anlama",
          ],
        },
        {
          name: "Средно ниво",
          range: "B1 – B2",
          intro: "Günlük ve iş hayatında Bulgarca. Sınavın B1 ve B2 seviyeleri.",
          items: [
            "Günlük metinleri ve haberleri anlama",
            "İş ve resmî yazışma",
            "Fiil görünüşü ve zaman sistemi",
            "Görüş bildirme ve olay anlatma",
          ],
        },
        {
          name: "Напреднало ниво",
          range: "C1 – C2",
          intro: "Akademik ve profesyonel düzeyde Bulgarca. Sınavın C1 ve C2 seviyeleri.",
          items: [
            "Akademik ve edebi metinleri okuma",
            "Doğal hızdaki konuşmaları anlama",
            "Akademik yazı ve sunum",
            "Tartışmalarda akıcılık",
          ],
        },
      ],
    },
    certAdded:
      "Bulgarca bilginizi uluslararası düzeyde belgelemek için Sofya Üniversitesi'nin standart Bulgarca yeterlilik sınavlarına girebilirsiniz. Sınavlar A2'den C2'ye beş seviyededir; konuşma, dinleme, okuma ve yazma becerilerini ölçer ve çevrim içi platformda yapılır.",
    faqAdded: [
      {
        question: "Bulgarca öğrenmek zor mu?",
        answer: [
          "Bulgarcada, diğer Slav dillerinin çoğundan farklı olarak isimlerin hâl çekimi büyük ölçüde kaybolmuştur; bu, dil bilgisini Rusça gibi dillere göre sadeleştirir. Belirli tanımlık sözcüğün sonuna eklenir, Türkçedeki eklere benzer biçimde.",
          "Zaman alan kısım fiillerdir: görünüş (tamamlanmış / süren eylem) ve zengin bir zaman sistemi vardır.",
        ],
        icon: "soru",
      },
      {
        question: "Bulgarca hangi alfabeyle yazılır?",
        answer: [
          "Kiril alfabesiyle yazılır; Bulgarca alfabede 30 harf vardır. Kiril alfabesi, Bulgaristan'ın 2007'de üye olmasıyla Latin ve Yunan alfabelerinden sonra Avrupa Birliği'nin üçüncü resmî alfabesi olmuştur.",
        ],
        icon: "yazma",
      },
      {
        question: "Bulgarca seviyemi nasıl belgeleyebilirim?",
        answer: [
          "Sofya Üniversitesi'nin standart Bulgarca sınavlarıyla. Sınavlar A2, B1, B2, C1 ve C2 seviyelerinde yapılır; sözlü sınav konuşmayı, yazılı sınav dinleme, okuma ve yazmayı ölçer.",
        ],
        icon: "belge",
      },
    ],
  },
  /*
   * İsveççe (2026-10-01) — GENEL bilgi kaynakları:
   * - Swedex A2 / B1 / B2 / C1, dört beceri, Folkuniversitetet; İsveç'te ve yurt dışında:
   *   https://www.folkuniversitetet.se/in-english/swedex-swedish-examinations/about-swedex/
   * - Tisus: İsveç üniversitelerinin tanıdığı ileri düzey İsveççe yeterlilik sınavı (Stockholm, Lund, Uppsala…) —
   *   Folkuniversitetet dil sınavları sayfası: https://www.folkuniversitetet.se/in-english/language-examinations/
   * - İsveççe Finlandiya'da da resmî dil (Fince ile birlikte): https://finland.fi/life-society/swedish-in-finland/
   * - Alfabe 29 harf (Latin + å, ä, ö): Institutet för språk och folkminnen — https://www.isof.se
   */
  sv: {
    heroPhoto: { src: `${IMG}/dil-isvecce2.jpg`, alt: "Stockholm'de Gamla Stan'ın su kıyısındaki renkli binaları ve kilise kuleleri" },
    benefitsPhoto: { src: `${IMG}/dil-isvecce.jpg`, alt: "Stockholm'de Belediye Binası kulesi ve Riddarholmen Kilisesi, gün batımı" },
    benefits: [
      { icon: "kupa", label: "İsveç'te kariyer" },
      { icon: "mezuniyet", label: "İsveç'te üniversite eğitimi" },
      { icon: "konum", label: "İsveç'te yaşamak" },
      { icon: "dunya", label: "İskandinavya'da iletişim" },
    ],
    whyLearnAdded: {
      heading: "Neden İsveççe Öğrenmelisiniz?",
      paragraphs: [
        "İsveççe, İsveç'in resmî dilidir; Finlandiya'da da Fince ile birlikte resmî dildir. İsveç'te eğitim, iş ve günlük yaşam için en önemli anahtardır.",
        "Norveççe ve Danca ile yakın akrabadır; İsveççe bilen biri bu dillerde yazılanları büyük ölçüde anlayabilir.",
        "İngilizce ya da Almanca biliyorsanız işiniz kolaylaşır: aynı dil ailesinden oldukları için pek çok sözcük tanıdık gelir.",
      ],
    },
    levelsAdded: {
      heading: "İsveççe seviyeleri ve uluslararası sınavlar",
      groups: [
        {
          name: "Nybörjarnivå",
          range: "A1 – A2",
          intro: "Telaffuz ve günlük iletişim. Swedex A2 seviyesine karşılık gelir.",
          items: [
            "Å, ä, ö harfleri ve telaffuz",
            "Kendini tanıtma ve günlük kalıplar",
            "Temel dil bilgisi: en / ett ve fiil zamanları",
            "Yavaş ve net konuşmaları anlama",
          ],
        },
        {
          name: "Mellannivå",
          range: "B1 – B2",
          intro: "Günlük ve iş hayatında İsveççe. Swedex B1 ve B2 seviyeleri.",
          items: [
            "Günlük metinleri ve haberleri anlama",
            "İş ve resmî yazışma",
            "Görüş bildirme ve olay anlatma",
            "Kelime bilgisini genişletme",
          ],
        },
        {
          name: "Avancerad nivå",
          range: "C1 – C2",
          intro: "Akademik ve profesyonel düzeyde İsveççe. Swedex C1 ve üniversite başvurularında istenen Tisus.",
          items: [
            "Akademik metinleri okuma",
            "Doğal hızdaki konuşmaları anlama",
            "Akademik yazı ve sunum",
            "Tartışmalarda akıcılık",
          ],
        },
      ],
    },
    certAdded:
      "İsveççe bilginizi belgelemek için Folkuniversitetet'in Swedex sınavına girebilirsiniz; sınav A2, B1, B2 ve C1 seviyelerinde dört beceriyi ölçer. İsveç'te üniversite eğitimi için İsveççe yeterliliği Tisus sınavıyla gösterilir.",
    faqAdded: [
      {
        question: "İsveççe öğrenmek zor mu?",
        answer: [
          "Dil bilgisi sadedir: fiiller kişiye göre çekimlenmez, \"jag är\" (ben-im) ile \"vi är\" (biz-iz) aynı fiili kullanır. İngilizce ya da Almanca bilenler pek çok sözcüğü tanır.",
          "En çok çalışma gerektiren kısım telaffuz ve sözcük vurgusudur.",
        ],
        icon: "soru",
      },
      {
        question: "İsveç alfabesinde kaç harf var?",
        answer: [
          "29 harf vardır: Latin alfabesinin 26 harfine ek olarak sonda å, ä ve ö yer alır.",
        ],
        icon: "yazma",
      },
      {
        question: "Swedex ve Tisus nedir?",
        answer: [
          "Swedex, Folkuniversitetet'in hazırladığı ve İsveç'te ve yurt dışında yapılan İsveççe sınavıdır; A2, B1, B2 ve C1 seviyelerinde konuşma, okuma, dinleme ve yazmayı ölçer.",
          "Tisus ise İsveç üniversitelerine başvuranların İsveççe yeterliliğini gösterdiği ileri düzey sınavdır.",
        ],
        icon: "belge",
      },
    ],
  },
};
