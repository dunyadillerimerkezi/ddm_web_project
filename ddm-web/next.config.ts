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

/**
 * Faz 6.6 — 16 eski Joomla kurs-tarihi URL'i (`{kurs}.html?view=article&id=...`).
 * İçerikleri temiz URL'lerin birebir kopyası, ayrı sayfa üretilmez; 301 ile
 * yeni nested sayfaya gider. Faz 8'in genel `.html` kuralı bunları kapsamaz
 * (query string'e bakar). [kurs, id, hedef pageSlug].
 */
const JOOMLA_COURSE_DATES: [string, string, string][] = [
  ["gmat-kursu", "319:kadikoy-merkez-kurs-tarihi", "kadikoy-subesi-gmat-kurs-tarihi"],
  ["gmat-kursu", "320:bagdat-caddesi-kurs-tarihi", "bagdat-caddesi-gmat-subesi-kurs-tarihi"],
  ["gmat-kursu", "321:levent-kurs-tarihi-4", "besiktas-subesi-gmat-kurs-tarihi"],
  ["proficiency-kursu", "303:kadikoy-merkez-kurs-tarihi", "kadikoy-subesi-proficiency-kurs-tarihi"],
  ["proficiency-kursu", "304:bagdat-caddesi-kurs-tarihi", "bagdat-caddesi-proficiency-subesi-kurs-tarihi"],
  ["proficiency-kursu", "305:levent-kurs-tarihi-4", "besiktas-subesi-proficiency-kurs-tarihi"],
  ["sat-kursu", "315:kadikoy-merkez-kurs-tarihi", "kadikoy-subesi-sat-kurs-tarihi"],
  ["sat-kursu", "316:bagdat-caddesi-kurs-tarihi", "bagdat-caddesi-subesi-sat-kurs-tarihi"],
  ["sat-kursu", "317:levent-kurs-tarihi-4", "besiktas-subesi-sat-kurs-tarihi"],
  ["toeic-kursu", "295:kadikoy-merkez-kurs-tarihi", "kadikoy-subesi-toeic-kurs-tarihi"],
  ["toeic-kursu", "296:bagdat-caddesi-kurs-tarihi", "bagdat-caddesi-subesi-toeic-kurs-tarihi"],
  ["toeic-kursu", "297:levent-kurs-tarihi-4", "besiktas-subesi-toeic-kurs-tarihi"],
  // P0 — Ataşehir'in 4 Joomla URL'i 6.6'da atlanmıştı (toplam 16). Gövde metinleri
  // temiz sayfalarla birebir aynı (site_content.json'da doğrulandı).
  ["proficiency-kursu", "306:atasehir-kurs-tarihleri", "atasehir-subesi-proficiency-kurs-tarihi"],
  ["gmat-kursu", "322:atasehir-kurs-tarihleri", "atasehir-subesi-gmat-kurs-tarihi"],
  ["sat-kursu", "318:atasehir-kurs-tarihleri", "atasehir-subesi-sat-kurs-tarihi"],
  ["toeic-kursu", "298:atasehir-kurs-tarihleri", "atasehir-subesi-toeic-kurs-tarihi"],
];

/**
 * P1 (Faz 6.8) — 6 eski Joomla iletişim URL'i. Kurs-tarihi'nin aksine her
 * biri KENDİ path'inde (aynı path'i paylaşan `?id=` varyantı yok), bu yüzden
 * `has: query` GEREKMİYOR — path'in kendisi zaten ayırt edici.
 * `65-levent-subesi-on-kayit-formu` iki farklı `%`-encode ile crawl'da
 * yakalanmış (aynı sayfa) — ikisi de aynı hedefe gider.
 */
const JOOMLA_CONTACT: [string, string][] = [
  ["/component/content/article/337-iletisim-sayfasi-kadikoy.html", "/ddm-iletisim/1-kadikoy"],
  ["/component/content/article/338-iletisim-sayfasi-cadde.html", "/ddm-iletisim/iletisim-2-bagdat-caddesi"],
  ["/component/content/article/339-iletisim-sayfasi-levent.html", "/ddm-iletisim/3-levent"],
  ["/component/content/article/61-iletisim-sayfasi.html", "/ddm-iletisim/4-atasehir"],
  ["/component/content/article/65-levent-subesi-on-kay%C4%B1t-formu.html", "/ddm-iletisim/3-levent"],
  ["/component/content/article/65-levent-subesi-on-kayıt-formu.html", "/ddm-iletisim/3-levent"],
];

/**
 * P4 — 21 özel ders sayfasının Joomla `?view=article&id=…` kopyası (16'sı
 * `/diger-program/ozel-dersler.html?id=…`, 5'i kurs sayfası üstünden
 * `/{kategori}/{kurs}.html?id=…`). Gövdeleri temiz sayfalarla birebir aynı
 * (site_content.json'da doğrulandı); kanonik adres temiz yol. [kaynak, id, hedef].
 */
const JOOMLA_PRIVATE_LESSONS: [string, string, string][] = [
  ["/diger-program/ozel-dersler.html", "368:ingilizce-ozel-ders", "/yabanci-dil-egitimleri/ingilizce-kursu/ingilizce-ozel-ders"],
  ["/diger-program/ozel-dersler.html", "369:almanca-ozel-ders", "/yabanci-dil-egitimleri/almanca-kursu/almanca-ozel-ders"],
  ["/diger-program/ozel-dersler.html", "370:fransizca-ozel-ders", "/yabanci-dil-egitimleri/fransizca-kursu/fransizca-ozel-ders"],
  ["/diger-program/ozel-dersler.html", "371:ispanyolca-ozel-ders", "/yabanci-dil-egitimleri/ispanyolca-kursu/ispanyolca-ozel-ders"],
  ["/diger-program/ozel-dersler.html", "372:italyanca-ozel-ders", "/yabanci-dil-egitimleri/italyanca-kursu/italyanca-ozel-ders"],
  ["/diger-program/ozel-dersler.html", "373:rusca-ozel-ders", "/yabanci-dil-egitimleri/rusca-kursu/rusca-ozel-ders"],
  ["/diger-program/ozel-dersler.html", "374:cince-ozel-ders", "/yabanci-dil-egitimleri/cince-kursu/cince-ozel-ders"],
  ["/diger-program/ozel-dersler.html", "375:turkce-ozel-ders", "/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/turkce-ozel-ders"],
  ["/diger-program/ozel-dersler.html", "376:toefl-ozel-ders", "/sinav-hazirlik-egitimleri/toefl-kursu/toefl-ozel-ders"],
  ["/diger-program/ozel-dersler.html", "377:ielts-ozel-ders", "/sinav-hazirlik-egitimleri/ielts-kursu/ielts-ozel-ders"],
  ["/diger-program/ozel-dersler.html", "378:toeic-ozel-ders", "/sinav-hazirlik-egitimleri/toeic-kursu/toeic-ozel-ders"],
  ["/diger-program/ozel-dersler.html", "379:pte-ozel-ders", "/sinav-hazirlik-egitimleri/academic-pte/pte-akademik-ozel-ders"],
  ["/diger-program/ozel-dersler.html", "380:proficiency-ozel-ders", "/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-ozel-ders"],
  ["/diger-program/ozel-dersler.html", "381:sat-ozel-ders", "/sinav-hazirlik-egitimleri/sat-kursu/sat-ozel-ders"],
  ["/diger-program/ozel-dersler.html", "382:gre-ozel-ders", "/sinav-hazirlik-egitimleri/gre-kursu/gre-ozel-ders"],
  ["/diger-program/ozel-dersler.html", "383:gmat-ozel-ders", "/sinav-hazirlik-egitimleri/gmat-kursu/gmat-ozel-ders"],
  ["/yabanci-dil-egitimleri/almanca-kursu.html", "369:almanca-ozel-ders", "/yabanci-dil-egitimleri/almanca-kursu/almanca-ozel-ders"],
  ["/sinav-hazirlik-egitimleri/gmat-kursu.html", "383:gmat-ozel-ders", "/sinav-hazirlik-egitimleri/gmat-kursu/gmat-ozel-ders"],
  ["/sinav-hazirlik-egitimleri/proficiency-kursu.html", "380:proficiency-ozel-ders", "/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-ozel-ders"],
  ["/sinav-hazirlik-egitimleri/sat-kursu.html", "381:sat-ozel-ders", "/sinav-hazirlik-egitimleri/sat-kursu/sat-ozel-ders"],
  ["/sinav-hazirlik-egitimleri/toeic-kursu.html", "378:toeic-ozel-ders", "/sinav-hazirlik-egitimleri/toeic-kursu/toeic-ozel-ders"],
];

/**
 * P4 — 4 "Nedir?" rehberinin Joomla `?view=article&id=…` kopyası (kurs sayfası
 * üstünden). Gövdeleri temiz sayfalarla birebir aynı (site_content.json'da
 * doğrulandı). [kaynak, id, hedef].
 */
const JOOMLA_GUIDES: [string, string, string][] = [
  ["/sinav-hazirlik-egitimleri/gmat-kursu.html", "165:gmat-nedir", "/sinav-hazirlik-egitimleri/gmat-kursu/gmat-nedir"],
  ["/sinav-hazirlik-egitimleri/sat-kursu.html", "159:sat-nedir", "/sinav-hazirlik-egitimleri/sat-kursu/sat-nedir"],
  ["/sinav-hazirlik-egitimleri/toeic-kursu.html", "128:toeic-nedir", "/sinav-hazirlik-egitimleri/toeic-kursu/toeic-nedir"],
  ["/sinav-hazirlik-egitimleri/proficiency-kursu.html", "136:proficiency-nedir", "/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-nedir"],
];

/**
 * P4 — yayınlanmayan sayfalar (kullanıcı kararı, 2026-09-25): "YDS Kurs Dönemi"
 * (`yds-ozel-ders-2`) — iki bilgisi YDS Kursu sayfasına taşındı.
 */
const RETIRED_PAGES: [string, string][] = [
  ["/sinav-hazirlik-egitimleri/yds-kursu/yds-ozel-ders-2", "/sinav-hazirlik-egitimleri/yds-kursu"],
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
    const university = UNIVERSITY_SLUGS.flatMap((slug) => {
      const destination = `/sinav-hazirlik-egitimleri/proficiency-kursu/${slug}`;
      return [
        { source: `/${slug}`, destination, permanent: true },
        { source: `/${slug}.html`, destination, permanent: true },
      ];
    });
    const courseDates = JOOMLA_COURSE_DATES.map(([kurs, id, pageSlug]) => ({
      source: `/sinav-hazirlik-egitimleri/${kurs}.html`,
      has: [{ type: "query" as const, key: "id", value: id }],
      destination: `/sinav-hazirlik-egitimleri/${kurs}/${pageSlug}`,
      permanent: true,
    }));
    const contact = JOOMLA_CONTACT.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
    const privateLessons = JOOMLA_PRIVATE_LESSONS.map(([source, id, destination]) => ({
      source,
      has: [{ type: "query" as const, key: "id", value: id }],
      destination,
      permanent: true,
    }));
    const guides = JOOMLA_GUIDES.map(([source, id, destination]) => ({
      source,
      has: [{ type: "query" as const, key: "id", value: id }],
      destination,
      permanent: true,
    }));
    const retired = RETIRED_PAGES.flatMap(([source, destination]) => [
      { source, destination, permanent: true },
      { source: `${source}.html`, destination, permanent: true },
    ]);
    return [...university, ...courseDates, ...contact, ...privateLessons, ...guides, ...retired];
  },
};

export default nextConfig;
