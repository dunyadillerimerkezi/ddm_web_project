import { BRANCH_LIST } from "@/data/branches";
import { findRecord } from "./branchContent";
import { CONSENT_LABEL } from "./kvkkConsent";

/**
 * PF (2026-09-29) — KVKK aydınlatma metni + açık rıza beyanı. Kullanıcı kararı: "şu an var olan yazıyı al kullan".
 *
 * Kaynak: eski sitenin 5 şube iletişim kaydının gövdesi (form + KVKK bloğu; P1 / P6'da `ignored` — yayınlanmıyordu).
 * Metin 5 kayıtta birebir aynı (Levent'te yalnız form alanlarından sonra geliyor) — build denetler, biri değişirse düşer.
 * Metin buraya YAZILMAZ; build'de kaynaktan okunur (CLAUDE.md §5).
 *
 * Firma metni (hukuki): yalnız bariz yazım / eski HTML'in satır bölmesi `EDITS` ile düzeltilir; kullanılmayan anahtar
 * build'i düşürür. Canlı sitede de aynı hatalar var (2026-09-29 kontrol edildi). Düzeltilemeyen kusur: "Kişisel verilerinizin
 * ne / tarafımızdan işlenebilecektir." cümlesinin ortası kaynakta eksik — uydurulmadı, kullanıcıya soruldu (bekleyen-sorular.md).
 */

/** Her şubenin eski iletişim kaydı — yeni şube eklenirse denetime kendiliğinden girer. */
const SOURCES = BRANCH_LIST.map((b) => `${b.href}.html`);

/** Metnin ilk ve son satırı (kaynakta). Başlık satırı ("KVKK AYDINLATMA METNİ") dahil değil — sayfa kendi başlığını basar. */
const START = "KİŞİSEL VERİLERİ KORUMA KANUNU";
const END_MARK = "özgür irademle açık rıza vermeyi kabul ediyorum.";

/** [kaynaktaki parça, düzeltilmiş hâli] — her biri kaynakta tam bir kez geçmeli. */
const EDITS: [string, string][] = [
  // Eski HTML bir madde işaretini iki paragrafa bölmüş: "…Aracı Hizmet" / "• Sağlayıcılar Hakkında Yönetmelik…"
  ["Aracı Hizmet\n• Sağlayıcılar Hakkında", "Aracı Hizmet Sağlayıcılar Hakkında"],
  // Aynı bölünme: "…giriş yapılan" / "• sayfalardaki tercihleri…"
  ["giriş yapılan\n• sayfalardaki", "giriş yapılan sayfalardaki"],
  ["• atış ve pazarlama", "• Satış ve pazarlama"],
  ["Formu oldurmak", "Formu doldurmak"],
  ["Kişisel Veri Sahibi, ’ Dünya", "Kişisel Veri Sahibi, Dünya"],
  ["E.posta:\ninfo@", "E-posta: info@"],
  // Kaynakta ortası eksik cümle iki satıra bölünmüş; yalnız satır sonu kaldırılır, metin aynen kalır.
  ["Kişisel verilerinizin ne\ntarafımızdan", "Kişisel verilerinizin ne tarafımızdan"],
];

/** Kaynaktaki ara başlık satırları — her biri metinde tam bir satır olarak bulunmalı (build denetler). */
const HEADINGS = [
  "KİŞİSEL VERİLERİ KORUMA KANUNU",
  "YASAL BİLGİLENDİRME",
  "Veri sorumlusu sıfatıyla bilgilendirme;",
  "Kişisel verilerinizin işlenme amaçları ve hukuki sebepleri;",
  "Kişisel verilerinizin aktarılabileceği üçüncü kişi veya kuruluşlar hakkında bilgilendirme;",
  "Kişisel verilerinizin toplanma şekli",
  "KVK Kanunu yürürlüğe girmeden önce elde edilen kişisel verileriniz:",
  "Kişisel verilerin saklanması ve korunması:",
  "Kişisel verilerin güncel ve doğru tutulması:",
  "6698 sayılı KVK Kanunu uyarınca kişisel veri sahibinin hakları:",
  "Açık Rıza Beyan Metni",
];

export type KvkkBlock =
  | { kind: "heading"; text: string }
  | { kind: "p"; text: string }
  /** `numbered`: numara kaynak metinde ("1. …") — madde işareti basılmaz. */
  | { kind: "list"; numbered: boolean; items: string[] };

function slice(sourcePath: string): string {
  const rec = findRecord(sourcePath);
  const a = rec.text.indexOf(START);
  const b = rec.text.indexOf(END_MARK);
  if (a < 0 || b < a) throw new Error(`kvkkContent: ${sourcePath} içinde KVKK metni bulunamadı`);
  if (!rec.text.includes(CONSENT_LABEL)) throw new Error(`kvkkContent: ${sourcePath} içinde onay etiketi yok`);
  return rec.text.slice(a, b + END_MARK.length);
}

function build(): KvkkBlock[] {
  const texts = SOURCES.map(slice);
  const differs = SOURCES.filter((_, i) => texts[i] !== texts[0]);
  if (differs.length) throw new Error(`kvkkContent: KVKK metni şu kayıtlarda farklı: ${differs.join(", ")}`);

  let text = texts[0];
  for (const [from, to] of EDITS) {
    const n = text.split(from).length - 1;
    if (n !== 1) throw new Error(`kvkkContent: düzeltme anahtarı kaynakta ${n} kez geçiyor (1 olmalı): "${from}"`);
    text = text.replace(from, to);
  }

  const lines = text.split("\n").map((l) => l.trim());
  const lost = HEADINGS.filter((h) => !lines.includes(h));
  if (lost.length) throw new Error(`kvkkContent: başlık kaynakta satır olarak yok: ${lost.join(" | ")}`);

  const blocks: KvkkBlock[] = [];
  for (const line of lines) {
    if (!line) continue;
    const numbered = /^\d+\./.test(line);
    const last = blocks[blocks.length - 1];
    if (numbered || line.startsWith("•")) {
      // Madde işareti atılır (liste zaten gösteriyor); numara kaynaktaki gibi kalır — ilk satır giriş cümlesi.
      const clean = line.replace(/^•\s*/, "");
      if (last?.kind === "list" && last.numbered === numbered) last.items.push(clean);
      else blocks.push({ kind: "list", numbered, items: [clean] });
    } else {
      blocks.push({ kind: HEADINGS.includes(line) ? "heading" : "p", text: line });
    }
  }
  return blocks;
}

/** Yalnız `KvkkSection` import eder (Şube İletişim ana sayfası) — modül yüklenirken bir kez, build zamanında. */
export const KVKK_BLOCKS: KvkkBlock[] = build();
