import type { Branch, BranchSlug } from "@/lib/types";
import { SERVING } from "@/data/company";
import { LANGUAGE_COUNT } from "@/data/languages";

/**
 * 5 İstanbul şubesi.
 *
 * Kaynak: Şube Kurs Tarihi şablonundaki `branchData()` +
 * eski sitenin /ddm-iletisim/* sayfaları.
 *
 * P1 Aşama 0 (2026-09-22): adres/telefon/e-posta/WhatsApp `/ddm-iletisim.html`
 * hub kaydından (temiz, yapılandırılmış liste) çıkarıldı ve her şubenin kendi
 * sayfasıyla (`/ddm-iletisim/{slug}.html`) çapraz doğrulandı — ikisi birebir
 * eşleşiyor. Daha önce Bağdat/Etiler/Ataşehir için `null` duruyordu; artık
 * hepsi kaynaktan taşındı (CLAUDE.md §5 — uydurma değil, kaynaktan taşıma).
 *
 * DÜZELTME (kullanıcı onayı): Etiler'in e-postası burada `etiler@...` yazıyordu,
 * kaynak `levent@dunyadillerimerkezi.com` diyor — kaynağa göre düzeltildi.
 *
 * NOT: Ümraniye'nin telefonu (0216 548 14 11) Ataşehir'in İKİNCİ hattıyla
 * birebir aynı — hem hub listesinde hem Ümraniye'nin kendi sayfasında tutarlı,
 * yani kaynak hatası değil (muhtemelen ortak bir hat). Etiler şubesinin
 * WhatsApp hattı yok (kaynakta "WhatsApp Hattı" satırı yalnız diğer 4 şubede var).
 *
 * ÜMRANİYE (müşteri kararı 2026-09-30): yalnız İLETİŞİM sayfası var. Tanıtım sayfası yapılmayacak
 * (`data/branchPromoPaths.ts`), kurs takvimi de yok ve olmayacak (`data/courseDates.ts`'te 0 kayıt) —
 * ikisi de eksik değil, karar.
 */
export const BRANCHES: Record<BranchSlug, Branch> = {
  kadikoy: {
    slug: "kadikoy",
    name: "Kadıköy",
    kicker: "KADIKÖY MERKEZ",
    href: "/ddm-iletisim/1-kadikoy",
    address: "Mühürdar Cad. Akmar Çarşısı No:70 Kat:3 Pk.34710 Kadıköy",
    phone: "0216 330 12 17",
    mail: "kadikoy@dunyadillerimerkezi.com",
    wa: "902163301217",
  },
  bagdat: {
    slug: "bagdat",
    name: "Bağdat Caddesi",
    kicker: "BAĞDAT CADDESİ ŞUBESİ",
    href: "/ddm-iletisim/iletisim-2-bagdat-caddesi",
    address: "Bağdat Caddesi, Zümrüt Apt. No:386/7 Pk.34740 Suadiye",
    phone: "0216 368 07 03",
    mail: "cadde@dunyadillerimerkezi.com",
    wa: "902163680703",
  },
  etiler: {
    slug: "etiler",
    // Müşteri kararı 2026-09-30: şubenin adı "Etiler" (önce "Levent / Etiler"). Adres Levent tarafında (Nispetiye Cad.);
    // adres, telefon ve sayfa adresleri (`/ddm-iletisim/3-levent`, `/levent-tanitim-sayfasi`) DEĞİŞMEDİ.
    name: "Etiler",
    kicker: "ETİLER ŞUBESİ",
    href: "/ddm-iletisim/3-levent",
    address: "Nispetiye Cad. No:32/12 Pk.34330 Beşiktaş",
    phone: "0212 283 19 14",
    mail: "levent@dunyadillerimerkezi.com",
    /** Kaynakta bu şube için "WhatsApp Hattı" satırı yok (diğer 4 şubede var) — uydurulmadı. */
    wa: null,
  },
  atasehir: {
    slug: "atasehir",
    name: "Ataşehir",
    kicker: "ATAŞEHİR ŞUBESİ",
    href: "/ddm-iletisim/4-atasehir",
    address: "Atatürk Mah. Girne Cad. No:9 Pk.34758 Ataşehir",
    phone: "0216 548 14 10",
    mail: "atasehir@dunyadillerimerkezi.com",
    wa: "902165481410",
  },
  umraniye: {
    slug: "umraniye",
    name: "Ümraniye",
    kicker: "ÜMRANİYE ŞUBESİ",
    href: "/ddm-iletisim/umraniye",
    address:
      "Şerifali Mah. Çetin Cad. Kızkalesi Sok. Şua Elite Plaza. No:1 A - Blok. Kat: 6 Ümraniye",
    phone: "0216 548 14 11",
    mail: "umraniye@dunyadillerimerkezi.com",
    wa: "902165481411",
  },
};

/**
 * Kaynak metinde şubenin ESKİ adı → bugünkü adı. Müşteri kararı 2026-09-30: şubenin adı "Etiler"; kullanıcı onayı (aynı gün):
 * kaynakta "Beşiktaş Şubesi" diye geçen yerler de "Etiler" olur. YALNIZ şube adı kalıpları değişir:
 *   "Beşiktaş Şubesi …" / "Beşiktaş Levent şubesi" → "Etiler Şubesi …" · şube listesinde "Levent, Etiler" → "Etiler".
 * Semt adı olarak "Beşiktaş" / "Levent" (adres, ulaşım, öğrenci yorumu, "Levent, Akatlar, Ulus…") DEĞİŞMEZ.
 * Kullananlar: kurs sayfalarındaki şube satırları (`lib/languageContent.ts`, `lib/examContent.ts`), kurs tarihi sayfalarının
 * başlıkları (`lib/courseDateContent.ts`), iletişim hub'ı (`lib/branchContent.ts`). Sayfa ADRESLERİ değişmez
 * (`…/besiktas-subesi-…-kurs-tarihi`).
 */
export function currentBranchName(text: string): string {
  const name = BRANCHES.etiler.name;
  return text.replace(/Beşiktaş(?: Levent)?(?= [Şş]ube)/g, name).replace(/Levent, Etiler/g, name);
}

/**
 * Tüm şubeler için aynı (müşteri: "Hepsinde 19 dil ve sınava hazırlık kursları"; kullanıcı 2026-10-01: "tüm şubelerde tüm
 * diller … 2003'ten bu yana yani 23 yıldır hizmet veriliyor diye yaz"). Ana Sayfa şube bölümü, şube iletişim ve tanıtım
 * sayfaları buradan okur.
 */
export const ALL_BRANCHES_OFFER = `${LANGUAGE_COUNT} dilde eğitim ve sınav hazırlık kursları`;
export const ALL_BRANCHES_LINE = `Tüm şubelerimizde ${ALL_BRANCHES_OFFER} veriyoruz; ${SERVING} hizmetinizdeyiz.`;

/** Menü/footer sırası — tasarımdaki sıra. */
export const BRANCH_ORDER: BranchSlug[] = [
  "kadikoy",
  "bagdat",
  "etiler",
  "atasehir",
  "umraniye",
];

export const BRANCH_LIST: Branch[] = BRANCH_ORDER.map((s) => BRANCHES[s]);

/** Şubesi belli olmayan sayfalarda gösterilecek varsayılan iletişim. */
export const DEFAULT_BRANCH = BRANCHES.kadikoy;

/**
 * `tel:` href'i — telefon yoksa null.
 *
 * P1 Aşama 0'da bulunan hata: önceden `branch.wa`'dan türetiliyordu, yani
 * WhatsApp hattı olmayan bir şubenin telefonu olsa bile "Ara" butonu hiç
 * çıkmıyordu (Etiler/Levent: gerçek telefonu var, WhatsApp'ı yok — düzeltilmeden
 * önce aranamıyordu). Artık doğrudan `branch.phone`'dan türetiliyor.
 */
export function telHref(branch: Branch): string | null {
  if (!branch.phone) return null;
  const digits = branch.phone.replace(/\D/g, "").replace(/^0/, "");
  return `tel:+90${digits}`;
}

/** WhatsApp href'i — numara yoksa null. */
export function waHref(branch: Branch): string | null {
  return branch.wa ? `https://wa.me/${branch.wa}` : null;
}

/**
 * İletişim gösterilecek şubeyi seçer.
 *
 * `branch.phone` `null` olduğunda (şu an hiçbir şubede değil, ama gelecekte
 * yeni bir şube eklenip verisi eksik gelirse) üst bar ve mobil çubuk gibi
 * site geneli iletişim noktalarında "telefon bekleniyor" göstermek yerine
 * merkez şubeye düşülür. Şubeye ÖZEL alanlarda (şube bilgi kartı) bu yedek
 * KULLANILMAZ — orada eksiklik olduğu gibi gösterilir (CLAUDE.md §5).
 */
export function contactBranch(branch: Branch = DEFAULT_BRANCH): Branch {
  return branch.phone ? branch : DEFAULT_BRANCH;
}

/**
 * Harita / yol tarifi sorgusu — yalnız sokak adresi: posta kodu ("Pk.34330") ve arayüz adı ("Etiler")
 * geocoding'i şaşırtıyor (P6 code-review). Adres yoksa null.
 */
export function mapQuery(branch: Branch): string | null {
  return branch.address ? `${branch.address.replace(/\s*Pk\.?\s*\d{5}/gi, "")}, İstanbul` : null;
}

/** Google Haritalar yol tarifi bağlantısı (dış domain — CLAUDE.md §4 kapsamı dışında). */
export function directionsHref(branch: Branch): string | null {
  const q = mapQuery(branch);
  return q ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}` : null;
}
