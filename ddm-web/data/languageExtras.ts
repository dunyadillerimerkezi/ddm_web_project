import type { IconName } from "@/components/graphics/icons";
import type { LanguageKey } from "@/lib/languageContent";

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
    heroPhoto: { src: `${IMG}/dil-fransızca3.jpg`, alt: "Paris'te balkonlu klasik bir bina ve arkada Eyfel Kulesi" },
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
    heroPhoto: { src: `${IMG}/dil-rusça2.jpg`, alt: "Moskova'da Aziz Vasil Katedrali" },
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
    heroPhoto: { src: `${IMG}/dil-çince2.jpg`, alt: "Dağların üzerinde uzanan Çin Seddi, gün batımı" },
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
    benefitsPhoto: { src: `${IMG}/dil-felemenkçe2.jpg`, alt: "Amsterdam'da kanal kıyısındaki renkli evler" },
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
    heroPhoto: { src: `${IMG}/dil-türkçe3.jpg`, alt: "İstanbul'da Tarihi Yarımada ve Boğaz'ın havadan görünümü, gün batımı" },
    benefitsPhoto: { src: `${IMG}/dil-türkçe2.jpg`, alt: "Galata Kulesi ve Haliç'in havadan görünümü" },
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
};
