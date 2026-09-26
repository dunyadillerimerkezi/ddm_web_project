import type { Faq } from "@/lib/types";
import type { LanguageDef, LanguagePage } from "@/lib/languageContent";

/**
 * Dil Kursu sayfası — takvim ayrıştırıcı + SSS üreticisi (UI turu, 2026-09-25).
 *
 * İÇERİK KURALI (kullanıcı kararı): firmaya özel bilgi (kur sayısı/süresi,
 * ders saati, not barajı, sertifika) EKLENMEZ, ÇIKARILMAZ — yalnız o dilin
 * sayfasında zaten yazılı olan olgular yeniden cümlelenir. Olgu kaynakta
 * yoksa o cümle (gerekirse soru) düşer; varsayılan değer uydurulmaz.
 * Dilden bağımsız evrensel bilgi (CEFR) yeni metin olarak eklenebilir.
 */

/* ---------------------------------------------------------------
 * Takvim — "Program > Günler | Saatler HH:MM - HH:MM"
 * 10 dilde de aynı biçim; "Saatler" kelimesinin yeri kaynakta oynuyor.
 * ------------------------------------------------------------- */

export const WEEK_DAYS = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"] as const;

export type ScheduleSlot = {
  program: string;
  /** Kaynaktaki gün metni birebir: "Cumartesi / Pazar". */
  daysLabel: string;
  /** `WEEK_DAYS` indeksleri. */
  days: number[];
  hours: string;
};

function stripSaatler(s: string): string {
  return s.replace(/Saatler\s*/i, "").trim();
}

/**
 * Hafta içi programlar önce, hafta sonu sonra (kullanıcı isteği, 2026-09-25) —
 * kaynakta bazı dillerde hafta sonu önde. Aynı grupta kaynak sırası korunur.
 */
export function parseSchedule(lines: string[], context: string): ScheduleSlot[] {
  const slots = lines.map((line) => {
    const [program, rest] = line.split(">").map((s) => s.trim());
    const [daysRaw, hoursRaw] = (rest ?? "").split("|").map((s) => s.trim());
    const daysLabel = stripSaatler(daysRaw ?? "");
    const days = daysLabel.split("/").map((d) => WEEK_DAYS.indexOf(d.trim() as (typeof WEEK_DAYS)[number]));
    if (!program || !hoursRaw || days.length === 0 || days.some((d) => d < 0)) {
      throw new Error(`${context}: takvim satırı çözülemedi — "${line}"`);
    }
    return { program, daysLabel, days, hours: stripSaatler(hoursRaw) };
  });
  const weekend = (slot: ScheduleSlot) => (Math.min(...slot.days) >= 5 ? 1 : 0);
  return [...slots].sort((a, b) => weekend(a) - weekend(b));
}

/* ---------------------------------------------------------------
 * Kaynaktaki olgular — hepsi o dilin kendi metninden okunur
 * ------------------------------------------------------------- */

export type CourseFacts = {
  kurCount: number | null;
  /** "10 hafta (2,5 ay)" · "2 ay" — kaynakta süre yoksa null. */
  kurDuration: string | null;
  /** "2,5" — kaynaktaki ay sayısı, virgül birebir. */
  kurMonths: string | null;
  kurHours: number | null;
  lessonMinutes: number | null;
};

export function courseFacts(def: LanguageDef, page: LanguagePage): CourseFacts {
  const text = page.about.join(" ");
  const weeks = text.match(/(\d+)\s*Hafta/i)?.[1] ?? null;
  const months = text.match(/(\d+(?:,\d+)?)\s*ay\b/i)?.[1] ?? null;
  const minutes = text.match(/(\d+)\s*dakika/i)?.[1] ?? null;
  const kurDuration = weeks && months ? `${weeks} hafta (${months} ay)` : months ? `${months} ay` : null;
  return {
    kurCount: def.kurCount,
    kurDuration,
    kurMonths: months,
    kurHours: def.kurHours,
    lessonMinutes: minutes ? Number(minutes) : null,
  };
}

/** Hakkında kutusundaki rakamlar — yalnız kaynakta yazılı olanlar, sırayla. */
export function factTiles(facts: CourseFacts): { value: string; label: string }[] {
  const tiles: { value: string; label: string }[] = [];
  if (facts.kurCount !== null) tiles.push({ value: String(facts.kurCount), label: "kur" });
  if (facts.kurMonths !== null) tiles.push({ value: facts.kurMonths, label: "ay / kur" });
  if (facts.kurHours !== null) tiles.push({ value: String(facts.kurHours), label: "saat / kur" });
  if (facts.lessonMinutes !== null) tiles.push({ value: String(facts.lessonMinutes), label: "dakika / ders" });
  return tiles;
}

/** "Neden DDM" kartındaki büyük rakam ("25 yıllık") — bölümün kaynak girişinden okunur. */
export function yearsOfExperience(intro: string | null): string | null {
  return intro?.match(/(\d+)\s*yıllık/)?.[1] ?? null;
}

/* ---------------------------------------------------------------
 * SSS
 * ------------------------------------------------------------- */

function durationFaq(def: LanguageDef, facts: CourseFacts): Faq | null {
  if (facts.kurCount === null || facts.kurHours === null) return null;
  const parts = [`${def.name} eğitimlerimiz toplam ${facts.kurCount} kurdan oluşur.`];
  parts.push(
    facts.kurDuration
      ? `Her bir kur ${facts.kurDuration} sürer ve toplam ${facts.kurHours} saattir.`
      : `Her bir kur toplam ${facts.kurHours} saattir.`,
  );
  if (facts.lessonMinutes !== null) parts.push(`Bir ders saati ${facts.lessonMinutes} dakikadır.`);
  return { question: "Bir kur ne kadar sürer?", answer: [parts.join(" ")], icon: "sure" };
}

function certificateFaq(def: LanguageDef, page: LanguagePage): Faq | null {
  const text = (page.certification ?? []).join(" ");
  if (!/kur bitirme sınavı/i.test(text)) return null;
  const pass = text.match(/en az (\d+)/)?.[1] ?? null;
  const meb = /Milli Eğitim Bakanlığı/.test(text);
  const erasmus = /ERASMUS/.test(text);
  const sentences = [
    pass
      ? `Evet. Her kur sonunda ${def.name} kur bitirme sınavı yapılır; bir sonraki kura devam edebilmek için başarı notunun en az ${pass} olması gerekir.`
      : `Evet. Her kur sonunda ${def.name} kur bitirme sınavı yapılır.`,
    `Başarılı olan öğrencilere, ulaştıkları seviyeyi belirten${meb ? ", Milli Eğitim Bakanlığı onaylı" : ""} bir sertifika verilir.`,
  ];
  if (erasmus) sentences.push("Sertifikalarımız ERASMUS programlarında da geçerlidir.");
  return { question: "Kurs sonunda sertifika veriliyor mu?", answer: [sentences.join(" ")], icon: "belge" };
}

function scheduleFaq(slots: ScheduleSlot[]): Faq | null {
  if (slots.length === 0) return null;
  return {
    question: "Dersler hangi gün ve saatlerde yapılıyor?",
    answer: slots.map((s) => `${s.program}: ${s.daysLabel}, ${s.hours}`),
    format: "list",
    icon: "takvim",
  };
}

/** Evrensel bilgi — dilden bağımsız CEFR tanımı (kullanıcı onayıyla yeni metin). */
function cefrFaq(def: LanguageDef): Faq {
  const lang = def.key === "speak" ? "İngilizce" : def.name;
  return {
    question: `${lang} seviyeleri (A1–C2) ne anlama geliyor?`,
    answer: [
      "Avrupa Dilleri Ortak Çerçeve Programı (CEFR), dil becerisini A1'den C2'ye altı seviyede tanımlayan uluslararası bir standarttır. A1 ve A2 temel kullanıcı, B1 ve B2 bağımsız kullanıcı, C1 ve C2 yetkin kullanıcı seviyeleridir.",
      `Seviyeler dilden bağımsızdır: ${lang} dilinde B1 seviyesinde olmak, dili işte, okulda ve seyahatte karşılaşılan durumların çoğunda kullanabilmek demektir.`,
    ],
    icon: "mezuniyet",
  };
}

/**
 * Sıra: kimler katılabilir (kaynak) → kur süresi → sertifika → gün/saat → CEFR.
 * "Neden … Öğrenmelisiniz?" UI turunda SSS'den çıkıp kendi bölümüne taşındı.
 */
export function buildLanguageFaqs(def: LanguageDef, page: LanguagePage, slots: ScheduleSlot[]): Faq[] {
  const facts = courseFacts(def, page);
  const faqs: (Faq | null)[] = [
    def.content.whoCanJoin && page.whoCanJoin
      ? { question: def.content.whoCanJoin.heading, answer: page.whoCanJoin.items, format: "list", icon: "grup" }
      : null,
    durationFaq(def, facts),
    certificateFaq(def, page),
    scheduleFaq(slots),
    cefrFaq(def),
  ];
  return faqs.filter((f): f is Faq => f !== null);
}
