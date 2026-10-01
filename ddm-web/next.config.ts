import { readFileSync } from "node:fs";
import { join } from "node:path";

import type { NextConfig } from "next";

// Göreli yol: config yükleyicisi `@/` takma adını çözmeyebilir. data/testimonials.ts içe aktarma yapmıyor (saf veri).
import { TESTIMONIALS } from "./data/testimonials";

/**
 * Faz 6.5 — 19 üniversite proficiency slug'ı (`lib/universityContent.ts`
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
  "ortadogu-teknik-universitesi",
  "bahcesehir-universitesi",
  "okan-universitesi",
  "maltepe-universitesi",
  "beykent-universitesi",
];

/**
 * Kapanmış iki üniversite (İstanbul Şehir 2020, Süleyman Şah 2016) — sayfaları kaldırıldı (müşteri kararı 2026-09-30).
 * Dört eski adresin hepsi (nested + kök, `.html`'li ve `.html`siz) TEK ADIMDA Proficiency Kursu'nun üniversiteler
 * bölümüne gider; kök adres önce nested adrese uğramaz (zincir yok).
 */
const CLOSED_UNIVERSITY_SLUGS = ["istanbul-sehir-universitesi", "suleymansah-universitesi"];
const PROFICIENCY_PATH = "/sinav-hazirlik-egitimleri/proficiency-kursu";
const UNIVERSITY_LIST_PATH = `${PROFICIENCY_PATH}#universiteler`;

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
 * P4 — "Nedir?" rehberleri ve tekil sayfaların Joomla `?view=article&id=…` kopyaları
 * (kurs sayfası üstünden). Gövdeleri hedef sayfalarla birebir aynı (site_content.json'da
 * doğrulandı). [kaynak, id, hedef].
 */
const JOOMLA_GUIDES: [string, string, string][] = [
  ["/sinav-hazirlik-egitimleri/gmat-kursu.html", "165:gmat-nedir", "/sinav-hazirlik-egitimleri/gmat-kursu/gmat-nedir"],
  ["/sinav-hazirlik-egitimleri/sat-kursu.html", "159:sat-nedir", "/sinav-hazirlik-egitimleri/sat-kursu/sat-nedir"],
  ["/sinav-hazirlik-egitimleri/toeic-kursu.html", "128:toeic-nedir", "/sinav-hazirlik-egitimleri/toeic-kursu/toeic-nedir"],
  ["/sinav-hazirlik-egitimleri/proficiency-kursu.html", "136:proficiency-nedir", "/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-nedir"],
  // P4 tekil (2026-09-26): örnek sınav soruları; "Proficiency Sınavı" yayınlanmıyor (21 üniversite listesi
  // Proficiency Kursu sayfasında) → üniversiteler bölümü; "Almanca Eğitim Seviyeleri" yeni temiz adresine.
  ["/sinav-hazirlik-egitimleri/proficiency-kursu.html", "323:proficiency-sinav-sorulari", "/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-ornek-sinav-sorulari"],
  ["/sinav-hazirlik-egitimleri/proficiency-kursu.html", "364:proficiency-sinavi", "/sinav-hazirlik-egitimleri/proficiency-kursu#universiteler"],
  ["/yabanci-dil-egitimleri/almanca-kursu/almanca-konusma-kurslari.html", "67:almanca-egitim-seviyeleri", "/yabanci-dil-egitimleri/almanca-kursu/almanca-egitim-seviyeleri"],
  ["/yabanci-dil-egitimleri/almanca-kursu/hizlandirilmis-almanca-kursu.html", "67:almanca-egitim-seviyeleri", "/yabanci-dil-egitimleri/almanca-kursu/almanca-egitim-seviyeleri"],
];

/**
 * P7 — Öğrenci yorumları. Tekil yorum sayfası üretilmiyor (kullanıcı kararı, 2026-09-29): kaynaktaki 51 tekil adres
 * (43 yorum; 8'i aynı yorumun yüzde kodlu / kodsuz ikinci adresi) liste sayfasına 301. Adresler ELLE YAZILMAZ —
 * `data/site_content.json`'dan okunur (eklenen / silinen kayıt kendiliğinden kurala yansır). Her adresin hem yüzde
 * kodlu hem Türkçe karakterli biçimi kurala girer (tarayıcılar ikisini de gönderebilir; JOOMLA_CONTACT emsali).
 * Yayındaki yorumun eski adresi doğrudan kartına iner (`#yorum-{id}`); yayında olmayanınki listenin başına.
 *
 * `?start=N` sayfalama varyantları (kaynakta 4…40, canlıda 0…40) ayrı kural istemiyor: Next eşleşmede sorguya bakmaz,
 * `/ogrenci-yorumlari.html` kuralı hepsini yakalar (sorgu hedefe taşınır; sayfa aynı, canonical sorgusuz).
 */
const TESTIMONIALS_PATH = "/ogrenci-yorumlari";
/** `lib/testimonialContent.ts` `RECORD_RE` ile AYNI desen. */
const TESTIMONIAL_URL_RE = /^\/ogrenci-yorumlari\/(\d+)-[^/?]+\.html$/;
const PUBLISHED_TESTIMONIALS = new Set(TESTIMONIALS.filter((t) => t.published).map((t) => t.id));

function testimonialRedirects(): { source: string; destination: string; permanent: true }[] {
  const records = JSON.parse(readFileSync(join(process.cwd(), "data", "site_content.json"), "utf8")) as { url: string }[];
  const raw = records
    .map((r) => r.url.replace(/^https?:\/\/[^/]+/, ""))
    .filter((path) => TESTIMONIAL_URL_RE.test(path));
  if (raw.length === 0) throw new Error("next.config: site_content.json içinde tekil öğrenci yorumu adresi bulunamadı.");
  const bySource = new Map<string, string>();
  for (const path of raw) {
    const id = Number(TESTIMONIAL_URL_RE.exec(path)![1]);
    const destination = PUBLISHED_TESTIMONIALS.has(id) ? `${TESTIMONIALS_PATH}#yorum-${id}` : TESTIMONIALS_PATH;
    const decoded = decodeURI(path);
    for (const source of [path, decoded, encodeURI(decoded)]) bySource.set(source, destination);
  }
  return [...bySource].map(([source, destination]) => ({ source, destination, permanent: true }));
}

/**
 * P4 — yayınlanmayan sayfalar (kullanıcı kararı, 2026-09-25): "YDS Kurs Dönemi"
 * (`yds-ozel-ders-2`) — iki bilgisi YDS Kursu sayfasına taşındı.
 */
const RETIRED_PAGES: [string, string][] = [
  ["/sinav-hazirlik-egitimleri/yds-kursu/yds-ozel-ders-2", "/sinav-hazirlik-egitimleri/yds-kursu"],
  // P4 tekil (kullanıcı kararı, 2026-09-26): içeriği yalnız 21 üniversite listesi → Proficiency Kursu'nun üniversiteler bölümü.
  ["/sinav-hazirlik-egitimleri/proficiency-kursu/proficiency-sinavi", UNIVERSITY_LIST_PATH],
  // P4 tekil (kullanıcı kararı, 2026-09-26): aynı metin iki adreste — kanonik /yabanci-dil-egitimleri/… .
  ["/ingilizce-kurslari/ingilizce-egitim-sistemi", "/yabanci-dil-egitimleri/ingilizce-kursu/ingilizce-egitim-sistemi"],
  // P5 (kullanıcı kararı, 2026-09-27): ilk paragraf ve gün/saat tablosu Dil Kursu sayfasıyla aynı, saatler çelişiyor → tek sayfa.
  ["/ingilizce-kurslari/ingilizce-konusma-kursu", "/yabanci-dil-egitimleri/ingilizce-konusma-kursu"],
  // P4 yurtdışı + diğer program (kullanıcı kararları, 2026-09-26): içeriği ana sayfada olan ya da kopya sayfalar;
  // "İngiltere'de Dil Okulları" yanlış adresinden (…/kanada-vancouver-2) doğru adresine.
  ["/yurtdisi-egitim/yurtdisi-ingilizce-egitimi/kanada-vancouver-2", "/yurtdisi-egitim/yurtdisi-ingilizce-egitimi/ingiltere"],
  ["/yurtdisi-egitim/yurtdisi-dil-egitimi", "/yurtdisi-egitim"],
  ["/yurtdisi-egitim/tercih", "/yurtdisi-egitim#ulkeler"],
  ["/diger-program/yurtdisinda-egitim", "/yurtdisi-egitim/work-and-travel"],
  // "-2" (Kurs Programı) sayfaları yayınlanmıyor (kullanıcı kararı, 2026-09-23): içerik ana sayfanın başlık listesi.
  ...[
    "almanca-kursu", "cince-kursu", "fransizca-kursu", "ingilizce-konusma-kursu", "ingilizce-kursu",
    "ispanyolca-kursu", "italyanca-kursu", "rusca-kursu", "yabancila-icin-turkce-kurs",
  ].map((k): [string, string] => [`/yabanci-dil-egitimleri/${k}/${k}-2`, `/yabanci-dil-egitimleri/${k}`]),
  ...["academic-pte", "gmat-kursu", "gre-kursu", "ielts-kursu", "proficiency-kursu", "sat-kursu", "toefl-kursu", "toeic-kursu", "yds-kursu"].map(
    (k): [string, string] => [`/sinav-hazirlik-egitimleri/${k}/${k}-2`, `/sinav-hazirlik-egitimleri/${k}`],
  ),
];

/**
 * Duyurular + Aktiviteler — sayfalar kaldırıldı (müşteri kararı 2026-09-30: "Duyurular aktiviteler kalkacak"; eşleştirme
 * tablosu kullanıcı onaylı). Kurs tanıtımı olan duyuru kendi kurs / sınav sayfasına, tarihi geçmiş tek seferlik duyuru
 * ve iki liste sayfası Ana Sayfa'ya. [eski yol (`.html`siz), hedef] — her biri `.html`'li ve `.html`siz yazılır;
 * `?start=` sayfalama varyantları ayrı kural istemez (Next eşleşmede sorguya bakmaz).
 */
const ANNOUNCEMENTS: [string, string][] = [
  ["/duyurular/26-fransizca-kurslari", "/yabanci-dil-egitimleri/fransizca-kursu"],
  ["/duyurular/27-rusca-kurslar", "/yabanci-dil-egitimleri/rusca-kursu"],
  ["/duyurular/28-ispanyolca-kurslari", "/yabanci-dil-egitimleri/ispanyolca-kursu"],
  ["/duyurular/29-ingilizce-kurslari", "/yabanci-dil-egitimleri/ingilizce-kursu"],
  ["/duyurular/24-yds-kurslari", "/sinav-hazirlik-egitimleri/yds-kursu"],
  ["/duyurular/25-proficiency-kurslari", PROFICIENCY_PATH],
  ["/duyurular/22-pearson-pte-kursu", "/sinav-hazirlik-egitimleri/academic-pte"],
  // Duyuru "Aile Birleşimi Almanca A1 Eğitimi" diyor.
  ["/duyurular/23-aile-birlesimi-kurslar", "/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi"],
  // İki sınavı karşılaştırıyor; ikisi de hub'da.
  ["/duyurular/30-toefl-ielts-hazirlik-kurslari", "/sinav-hazirlik-egitimleri"],
  ["/duyurular/31-konusma-siniflari-speaking", "/yabanci-dil-egitimleri/ingilizce-konusma-kursu"],
  ["/duyurular/425-yks-dil-sinavi-basvuru-tarihleri", "/ingilizce-kurslari/yks-dil-ingilizce"],
  // 2017 tarihli tek seferlik duyuru — karşılığı yok.
  ["/duyurular/391-ddm-kar-tatili", "/"],
  ["/duyurular", "/"],
  ["/aktivite-aktiviteler", "/"],
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
      const destination = `${PROFICIENCY_PATH}/${slug}`;
      return [
        { source: `/${slug}`, destination, permanent: true },
        { source: `/${slug}.html`, destination, permanent: true },
      ];
    });
    const closedUniversity = CLOSED_UNIVERSITY_SLUGS.flatMap((slug) =>
      [`/${slug}`, `/${slug}.html`, `${PROFICIENCY_PATH}/${slug}`, `${PROFICIENCY_PATH}/${slug}.html`].map((source) => ({
        source,
        destination: UNIVERSITY_LIST_PATH,
        permanent: true,
      })),
    );
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
    const testimonials = [
      { source: `${TESTIMONIALS_PATH}.html`, destination: TESTIMONIALS_PATH, permanent: true },
      ...testimonialRedirects(),
    ];
    const announcements = [
      ...ANNOUNCEMENTS.flatMap(([source, destination]) => [
        { source, destination, permanent: true },
        { source: `${source}.html`, destination, permanent: true },
      ]),
      // Güvenlik ağı: crawl'da yakalanmamış başka bir duyuru adresi (liste 13 başlık sayıyor, 12'sinin adresi var).
      // Yukarıdaki özel kurallardan SONRA gelmeli — ilk eşleşen kural kazanır.
      { source: "/duyurular/:rest*", destination: "/", permanent: true },
    ];
    return [...university, ...closedUniversity, ...announcements, ...courseDates, ...contact, ...privateLessons, ...guides, ...retired, ...testimonials];
  },
};

export default nextConfig;
