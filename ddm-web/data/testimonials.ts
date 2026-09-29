/**
 * P7 — Öğrenci yorumları (tek liste sayfası `/ogrenci-yorumlari` + Ana Sayfa bölümü).
 *
 * Kaynak: `data/site_content.json` içindeki `/ogrenci-yorumlari/{id}-…` kayıtları. 51 kayıt = 43 ayrı yorum;
 * 8'i aynı yorumun ikinci adresi (yüzde kodlu / kodsuz, Dora'da ASCII çevirisi). Metin BURAYA YAZILMAZ —
 * `lib/testimonialContent.ts` kaynaktan okur (CLAUDE.md §5: öğrencinin sözü, yazım hatası dahil birebir).
 *
 * Kullanıcı kararları (2026-09-29):
 *  - 25 yorum yayında, 18'i `published: false` (metin silinmez, sonra açılabilir). Ölçüt: somut sonuç, ≥50 kelime,
 *    program dengesi, eşitlikte fotoğraf.
 *  - Tekil yorum sayfası yok; eski adresler bu sayfaya 301 (`next.config.ts`).
 *  - Kartta şube ve tarih etiketi YOK. İsimler kaynaktaki gibi ("Öykü HIZAL").
 *  - Etiketler yalnız yorumun kendi metninde geçen program adından (uydurma yok).
 *  - Ana Sayfa kaydırıcısı buradan beslenir (`home`, 6 yorum: fotoğraflı ve somut sonuçlu ağırlıklı; ilk görünen üçü tarihle açılmayanlar; Onur Saygın ve
 *    Çağla Yorulmaz eski Ana Sayfa'dan kaldı, Hülya Osmanoğlu seçim dışı kaldığı için çıktı). `data/home.ts`'te yorum yok.
 *
 * Fotoğraflar canlı sitenin liste sayfalarından (`/images/…`, yorum başlığının hemen altında); tekil sayfalardaki
 * Joomla stok görselleri (`rocketlauncher/pages/blog/img-0N.jpg`) KULLANILMADI. Dosya adları kişiye göre ASCII,
 * EXIF silinmiş, en fazla 640 px. İki fotoğraf yalnız liste sayfasındaki yerinden eşleşti (dosya adında isim yok):
 * `cemal-ucar.jpg` (eski `ddm-ogrenci.jpg`), `ece-erturk.jpg` (eski `ece-ogrenci.jpg`) — ikisi de yayında değil.
 */

export type TestimonialTag =
  | "IELTS"
  | "TOEFL"
  | "SAT"
  | "GRE"
  | "PTE"
  | "Proficiency"
  | "TestDaF"
  | "telc C1 Hochschule"
  | "YDS"
  | "LYS"
  | "Almanca"
  | "Fransızca"
  | "Rusça"
  | "İspanyolca"
  | "İngilizce"
  | "Özel ders";

export type TestimonialDef = {
  /** Joomla makale numarası — eski adresin başındaki sayı, kaydın anahtarı. */
  id: number;
  published: boolean;
  /** Metnin sonundaki imza satırı sayısı (ad, okul, puan satırı). Kartta gösterilmez, tam metinde durur. */
  signLines: number;
  /** Yorumun metninde geçen program adları — yalnız bunlar. */
  tags: TestimonialTag[];
  /** İmzadaki okul / kurum; ad satırının altında. İmza satırlarında birebir aranır, yoksa build düşer. */
  affiliation?: string;
  /** `public/assets/testimonials/{file}.jpg`. `focus`: küçük karede yüzün yeri (object-position). */
  photo?: { file: string; focus?: string };
  /** Yorum İngilizce yazılmış. */
  lang?: "en";
  /** Ana Sayfa kaydırıcısındaki sırası (1…). Yalnız yayındaki yorum; build denetler. */
  home?: number;
  /** Eski sitenin HTML'inden kalan çıkarma hatası (kelime ortasında satır kırılması). Öğrencinin yazımı değil.
   *  Anahtar kaynakta tam bir kez geçmezse build düşer. */
  edits?: Record<string, string>;
};

export const TESTIMONIALS: TestimonialDef[] = [
  // --- IELTS ---
  { id: 17, published: true, home: 4, signLines: 2, tags: ["IELTS", "Özel ders"], affiliation: "Royal Holloway, University of London" },
  { id: 19, published: true, home: 2, signLines: 2, tags: ["IELTS"], affiliation: "Yeditepe Üniversitesi" },
  { id: 387, published: true, signLines: 1, tags: ["IELTS", "Özel ders"], affiliation: "İstanbul Üniversitesi" },
  { id: 418, published: true, home: 3, signLines: 1, tags: ["IELTS", "Özel ders"], photo: { file: "mehmet-akif-dadaloglu" } },
  {
    id: 417, published: true, signLines: 4, tags: ["IELTS"], photo: { file: "ece-ozdemir" }, lang: "en",
    edits: { "When I applied to\nDDM": "When I applied to DDM" },
  },
  { id: 406, published: true, signLines: 1, tags: ["IELTS"], photo: { file: "tayfun-yildirim" } },
  // --- TOEFL ---
  { id: 15, published: true, signLines: 1, tags: ["TOEFL"] },
  { id: 402, published: true, signLines: 1, tags: ["TOEFL"], photo: { file: "irem-kurban" } },
  { id: 404, published: true, signLines: 2, tags: ["TOEFL", "IELTS"], photo: { file: "burcu-kolemenoglu" }, lang: "en" },
  { id: 420, published: true, signLines: 2, tags: ["TOEFL", "GRE"], photo: { file: "sahar-azamparsa" }, lang: "en" },
  // --- SAT ---
  {
    id: 407, published: true, signLines: 5, tags: ["SAT"], photo: { file: "salih-taysi" }, lang: "en",
    edits: { "Th\nank you again": "Thank you again" },
  },
  { id: 403, published: true, signLines: 4, tags: ["SAT", "Özel ders"], photo: { file: "ipek-yucel" }, lang: "en" },
  // --- Üniversite hazırlık atlama ---
  { id: 411, published: true, signLines: 1, tags: ["Proficiency"], affiliation: "Marmara Üniversitesi Öğrencisi", photo: { file: "irem-uludirik" } },
  { id: 415, published: true, home: 1, signLines: 2, tags: ["Proficiency"], affiliation: "Bilgi Üniversitesi Öğrencisi", photo: { file: "dora-sermin" } },
  { id: 408, published: true, signLines: 1, tags: ["Proficiency"], photo: { file: "ilke-emeksiz" } },
  // --- Diğer sınavlar ---
  { id: 410, published: true, home: 5, signLines: 1, tags: ["TestDaF", "Özel ders"], photo: { file: "oyku-hizal" } },
  { id: 449, published: true, signLines: 1, tags: ["telc C1 Hochschule"], photo: { file: "ece-kezlev" } },
  { id: 394, published: true, signLines: 1, tags: ["YDS", "Özel ders"], photo: { file: "sinem-savasan" } },
  // --- Yabancı dil ---
  { id: 422, published: true, signLines: 1, tags: ["Fransızca", "Özel ders"], photo: { file: "nil-bilgen" } },
  {
    id: 388, published: true, home: 6, signLines: 1, tags: ["Fransızca", "LYS"], affiliation: "İstanbul Üniversitesi",
    photo: { file: "tugce-ozdemir" }, // kaynakta boy fotoğrafı (DDM tabelası önünde) — yüze göre kare kırpıldı
    edits: { "bölümü\nne girerek": "bölümüne girerek" },
  },
  { id: 174, published: true, signLines: 2, tags: ["İspanyolca"], affiliation: "Maltepe Üniversitesi Öğrencisi" },
  { id: 397, published: true, signLines: 1, tags: ["Rusça", "Almanca"] },
  { id: 400, published: true, signLines: 1, tags: ["Almanca"], photo: { file: "bengisu-akin" } },
  { id: 445, published: true, signLines: 1, tags: ["Almanca"], photo: { file: "ahmet-kiremitci" } },
  { id: 401, published: true, signLines: 1, tags: ["Almanca", "IELTS"], photo: { file: "ayten-un" } },

  // --- Yayında değil (Aşama 0: kısa, sonuç yok ya da aynı programdan yeterince var) ---
  { id: 450, published: false, signLines: 2, tags: ["SAT"], lang: "en" },
  { id: 18, published: false, signLines: 2, tags: ["YDS"], affiliation: "Ziya Ünsel Ortaokulu, Özel Eğitim" },
  { id: 395, published: false, signLines: 1, tags: ["IELTS", "Özel ders"], photo: { file: "gonca-celik" } },
  { id: 396, published: false, signLines: 1, tags: ["IELTS", "Özel ders"], photo: { file: "ece-erturk" } },
  { id: 366, published: false, signLines: 2, tags: ["TOEFL"], affiliation: "President of the International Platform for Young Entrepreneurs" },
  { id: 390, published: false, signLines: 1, tags: ["Fransızca"] },
  { id: 405, published: false, signLines: 2, tags: ["Proficiency"], affiliation: "Sabancı Üniversitesi Öğrencisi" },
  { id: 393, published: false, signLines: 1, tags: ["IELTS"], photo: { file: "cemal-ucar" } },
  { id: 367, published: false, signLines: 2, tags: [], affiliation: "Garanti Bankası", photo: { file: "unal-ugur-cecener" } },
  { id: 398, published: false, signLines: 1, tags: ["Fransızca", "Özel ders"], photo: { file: "batuhan-yildiz" } },
  { id: 175, published: false, signLines: 2, tags: ["İngilizce"], affiliation: "Hukuk Öğrencisi" },
  { id: 414, published: false, signLines: 1, tags: ["PTE"], photo: { file: "seren-kahraman" } },
  { id: 399, published: false, signLines: 1, tags: ["TOEFL"], photo: { file: "kemal-sinan-tetikkurt" } },
  { id: 365, published: false, signLines: 1, tags: ["Proficiency", "Özel ders"], photo: { file: "pelin-tanverdi" } },
  { id: 16, published: false, signLines: 2, tags: [], affiliation: "İstanbul Teknik Üniversitesi" },
  { id: 447, published: false, signLines: 1, tags: ["Rusça"], photo: { file: "alihan-furkan-yoruk" } },
  { id: 386, published: false, signLines: 0, tags: ["Proficiency", "Özel ders"] },
  { id: 416, published: false, signLines: 1, tags: ["IELTS"], photo: { file: "taylan-odabasi" } },
];

/** Sayfadaki süzgeç düğmeleri. Bir yorum birden çok düğmede görünebilir (ör. Burcu: TOEFL + IELTS). */
export const TESTIMONIAL_FILTERS: { key: string; label: string; tags: TestimonialTag[] }[] = [
  { key: "ielts", label: "IELTS", tags: ["IELTS"] },
  { key: "toefl", label: "TOEFL", tags: ["TOEFL"] },
  { key: "sat", label: "SAT", tags: ["SAT"] },
  { key: "proficiency", label: "Proficiency", tags: ["Proficiency"] },
  { key: "sinav", label: "Diğer sınavlar", tags: ["GRE", "PTE", "TestDaF", "telc C1 Hochschule", "YDS", "LYS"] },
  { key: "dil", label: "Yabancı dil", tags: ["Almanca", "Fransızca", "Rusça", "İspanyolca", "İngilizce"] },
  { key: "ozel", label: "Özel ders", tags: ["Özel ders"] },
];

/** Sayfa metni. Kaynak liste kaydında h1 yok (başlıklar öğrenci adları, h2) → H1 kaydın `title`'ı (CLAUDE.md §6). */
export const TESTIMONIALS_PAGE = {
  path: "/ogrenci-yorumlari",
  h1: "Öğrenci Yorumları",
  lead: "Sınavlarına DDM'de hazırlanan ve yeni bir dil öğrenen öğrencilerimiz, deneyimlerini kendi sözleriyle anlatıyor.",
  meta: {
    title: "Öğrenci Yorumları | Dünya Dilleri Merkezi",
    description:
      "Dünya Dilleri Merkezi öğrencileri IELTS, TOEFL, SAT, Proficiency ve yabancı dil kurslarındaki deneyimlerini kendi sözleriyle anlatıyor.",
    reasons: {
      title: "Kaynak title yalnız \"Öğrenci Yorumları\" — marka adı eklendi (diğer sayfalarla tutarlı).",
      description:
        "Kaynak açıklama bir form çağrısı (\"…mail formunu kullanarak sitemize içerik yazınızı gönderebilirsiniz\"), sayfada form yok ve içeriği anlatmıyor.",
    },
  },
};
