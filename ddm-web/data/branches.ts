import type { Branch, BranchSlug } from "@/lib/types";

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
 * yani kaynak hatası değil (muhtemelen ortak bir hat). Etiler/Levent şubesinin
 * WhatsApp hattı yok (kaynakta "WhatsApp Hattı" satırı yalnız diğer 4 şubede var).
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
    name: "Levent / Etiler",
    kicker: "LEVENT / ETİLER ŞUBESİ",
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
