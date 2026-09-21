import type { NextConfig } from "next";

/**
 * Faz 6.5 — 21 üniversite proficiency slug'ı (`lib/universityContent.ts`
 * `UNIVERSITY_SLUGS` ile birebir aynı sırada tutulur). next.config.ts'in
 * kendi modül yükleyicisi `@/` takma adını çözmeyebileceği için burada
 * KASITLI OLARAK tekrar tanımlı — data/universities.ts'ten import edilmiyor.
 *
 * Her slug için İKİ 301 kaydı: kök `.html`'li ve `.html`siz eski URL,
 * ikisi de yeni nested URL'e yönlenir (bkz. plan §4 — Faz 8'in genel
 * `.html` → temiz URL kuralından ÖNCE, kullanıcı kararıyla şimdi eklendi;
 * içerik ve URL bakımından tek üniversite karşılığına indirgenmiş kayıt
 * — CLAUDE.md §3 "eski .html → yeni URL 301 zorunlu"). Henüz sayfası
 * üretilmemiş üniversiteler için de kural tanımlı; hedef sayfa Faz 6.5
 * tamamlanana kadar 404 döner (Dil Kursu'nun henüz üretilmemiş şube
 * sayfalarına link vermesiyle aynı emsal).
 */
const UNIVERSITY_SLUGS = [
  "bogazici-universitesi",
  "sabanci-universitesi",
  "ozyegin-universitesi",
  "istanbul-sehir-universitesi",
  "istanbul-teknik-universitesi",
  "yeditepe-universitesi",
  "isik-universitesi",
  "kocaeli-universitesi-hazirlik",
  "dogus-universitesi",
  "koc-universitesi",
  "acibadem-universitesi",
  "marmara-universitesi",
  "kadirhas-universitesi-hazirlik",
  "yildiz-teknik-universitesi",
  "bilgi-universitesi",
  "suleymansah-universitesi",
  "ortadogu-teknik-universitesi",
  "bahcesehir-universitesi",
  "okan-universitesi",
  "maltepe-universitesi",
  "beykent-universitesi",
];

const nextConfig: NextConfig = {
  // Trailing slash kararı: URL'lerin sonunda "/" YOK, tutarlı biçimde
  // uygulanıyor (bkz. CLAUDE.md). Next.js varsayılanı zaten bu; kararı
  // dosyada açık tutmak için burada da belirtiliyor.
  trailingSlash: false,

  // NOT: output: "export" (tam statik export) BİLİNÇLİ OLARAK kullanılmıyor.
  // Next.js'in statik export modu next.config'teki redirects()/rewrites()'i
  // desteklemiyor; PROGRESS.md Faz 8, eski .html URL'lerinden yeni temiz
  // URL'lere 301 yönlendirmeyi TAM OLARAK next.config redirects() ile
  // kuruyor. Bu yüzden App Router'ın varsayılan modu (sayfalar build sırasında
  // statik üretilir/SSG, ama redirects() ve gerektiğinde sunucu tarafı
  // özellikler kullanılabilir) korunuyor. Detay: CLAUDE.md "Statik Üretim
  // ve 301 Redirect" bölümü.

  // Faz 8'de eski .html -> yeni temiz URL 301 kuralları burada,
  // `redirects()` altında tanımlanacak. Şimdi (Faz 3) boş bırakılıyor —
  // TEK istisna: Faz 6.5 üniversite kök URL'leri (yukarı bkz).
  async redirects() {
    return UNIVERSITY_SLUGS.flatMap((slug) => {
      const destination = `/sinav-hazirlik-egitimleri/proficiency-kursu/${slug}`;
      return [
        { source: `/${slug}`, destination, permanent: true },
        { source: `/${slug}.html`, destination, permanent: true },
      ];
    });
  },
};

export default nextConfig;
