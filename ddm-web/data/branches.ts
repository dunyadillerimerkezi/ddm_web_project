import type { Branch, BranchSlug } from "@/lib/types";

/**
 * 5 İstanbul şubesi.
 *
 * Kaynak: Şube Kurs Tarihi şablonundaki `branchData()` +
 * eski sitenin /ddm-iletisim/* sayfaları.
 *
 * DİKKAT (CLAUDE.md §5): Ataşehir, Levent/Etiler ve Bağdat Caddesi için
 * adres ve telefon kaynak içerikte YOK. Tasarım şablonu bunları
 * "adres bekleniyor" / "telefon bekleniyor" olarak işaretlemişti.
 * Burada `null` olarak duruyorlar — uydurma değerle DOLDURMAYIN.
 */
export const BRANCHES: Record<BranchSlug, Branch> = {
  kadikoy: {
    slug: "kadikoy",
    name: "Kadıköy",
    kicker: "KADIKÖY MERKEZ",
    href: "/ddm-iletisim/1-kadikoy",
    address: "Mühürdar Cad. Akmar Çarşısı No:70 Kat:3, Kadıköy",
    phone: "0216 330 12 17",
    mail: "kadikoy@dunyadillerimerkezi.com",
    wa: "902163301217",
  },
  bagdat: {
    slug: "bagdat",
    name: "Bağdat Caddesi",
    kicker: "BAĞDAT CADDESİ ŞUBESİ",
    href: "/ddm-iletisim/iletisim-2-bagdat-caddesi",
    address: null,
    phone: null,
    mail: "bagdat@dunyadillerimerkezi.com",
    wa: null,
  },
  etiler: {
    slug: "etiler",
    name: "Levent / Etiler",
    kicker: "LEVENT / ETİLER ŞUBESİ",
    href: "/ddm-iletisim/3-levent",
    address: null,
    phone: null,
    mail: "etiler@dunyadillerimerkezi.com",
    wa: null,
  },
  atasehir: {
    slug: "atasehir",
    name: "Ataşehir",
    kicker: "ATAŞEHİR ŞUBESİ",
    href: "/ddm-iletisim/4-atasehir",
    address: null,
    phone: null,
    mail: "atasehir@dunyadillerimerkezi.com",
    wa: null,
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

/** `tel:` href'i — telefon yoksa null. */
export function telHref(branch: Branch): string | null {
  return branch.wa ? `tel:+${branch.wa}` : null;
}

/** WhatsApp href'i — numara yoksa null. */
export function waHref(branch: Branch): string | null {
  return branch.wa ? `https://wa.me/${branch.wa}` : null;
}

/**
 * İletişim gösterilecek şubeyi seçer.
 *
 * Ataşehir / Etiler / Bağdat şubelerinin telefonu kaynak içerikte yok.
 * Üst bar ve mobil çubuk gibi site geneli iletişim noktalarında
 * "telefon bekleniyor" göstermek yerine merkez şubeye düşülür.
 * Şubeye ÖZEL alanlarda (şube bilgi kartı) bu yedek KULLANILMAZ —
 * orada eksiklik olduğu gibi gösterilir (CLAUDE.md §5).
 */
export function contactBranch(branch: Branch = DEFAULT_BRANCH): Branch {
  return branch.phone ? branch : DEFAULT_BRANCH;
}
