/**
 * Sınav Hazırlık hero'sundaki cevap kâğıdı — sınavın "bir bakışta" üç bilgisi
 * (UI turu 2026-09-28, "A · optik form"). GENEL SINAV BİLGİSİ (P2 kuralı):
 * her olgu resmi kaynaktan doğrulanır, kaynak yorumda yazar; emin olunmayan
 * rakam yazılmaz — o sınavın kaydı hiç açılmaz, kâğıt yalnız balonlarla durur.
 *
 * Doğrulanmış olguların çoğu sitede zaten var: `data/examGuides.ts` (Nedir
 * rehberleri, hero `facts`) ve `data/privateLessonsExam.ts` (format kartları).
 * Burası onların kâğıda sığan kısa hâlidir; rakamlar onlarla aynı kalmalı.
 */

export type ExamGlance = {
  /** Sınavı düzenleyen kurum — kâğıdın sağ üstü. */
  issuer: string;
  /** Kâğıdın altındaki kaynak satırı (resmi site, düz metin). */
  source: string;
  /** Kaynağın kontrol edildiği ay. */
  checked: string;
  /** Tam 3 bilgi: büyük değer + kısa etiket. */
  facts: [ExamFact, ExamFact, ExamFact];
};

export type ExamFact = { value: string; label: string };

const CHECKED = "Eylül 2026";

/** Anahtar: `data/exams.ts` slug'ı. */
export const EXAM_GLANCE: Record<string, ExamGlance> = {
  // France Éducation international — DELF A1–B2 + DALF C1–C2, 4 beceri, geçme 50/100. 2026-10-01.
  "delf-dalf-kursu": {
    issuer: "France Éducation international",
    source: "france-education-international.fr",
    checked: "Ekim 2026",
    facts: [
      { value: "6", label: "seviye · A1–C2" },
      { value: "4", label: "beceri" },
      { value: "50", label: "geçme puanı / 100" },
    ],
  },
  // Siena (CILS) + Perugia (CELI) — 6 seviye, CILS 5 beceri, üniversite için B2. 2026-10-01.
  "cils-celi-kursu": {
    issuer: "Siena · Perugia",
    source: "unistrasi.it · unistrapg.it",
    checked: "Ekim 2026",
    facts: [
      { value: "6", label: "seviye · A1–C2" },
      { value: "5", label: "beceri · CILS" },
      { value: "B2", label: "üniversite için" },
    ],
  },
  // osd.at — ÖSD Zertifikat A1–C2; Zertifikat B1 dört modül, her modül en az %60 (ZB1 Durchführungsbestimmungen 10/2023). 2026-10-02.
  "osd-kursu": {
    issuer: "ÖSD · Viyana",
    source: "osd.at",
    checked: "Ekim 2026",
    facts: [
      { value: "6", label: "seviye · A1–C2" },
      { value: "4", label: "modül · B1" },
      { value: "60", label: "% geçme notu" },
    ],
  },
  // telc.net — telc Deutsch B1: yazılı 150 dk, sözlü ~15 dk, geçme %60 (yazılı + sözlü ayrı). 2026-10-01.
  "telc-kursu": {
    issuer: "telc gGmbH",
    source: "telc.net",
    checked: "Ekim 2026",
    facts: [
      { value: "150", label: "dk yazılı · B1" },
      { value: "~15", label: "dk sözlü · B1" },
      { value: "60", label: "% geçme notu" },
    ],
  },
  // ÖSYM 2026 e-TEP Kılavuzu — 4 bölüm, 2 oturum, 120 puan. 2026-10-01.
  "e-tep-kursu": {
    issuer: "ÖSYM",
    source: "osym.gov.tr",
    checked: "Ekim 2026",
    facts: [
      { value: "4", label: "bölüm" },
      { value: "2", label: "oturum" },
      { value: "120", label: "toplam puan" },
    ],
  },
  // OET Test Handbook 2026 — 4 bölüm, 12 meslek, 0–500. 2026-10-01.
  "oet-kursu": {
    issuer: "CBLA",
    source: "oet.com",
    checked: "Ekim 2026",
    facts: [
      { value: "4", label: "bölüm" },
      { value: "12", label: "sağlık mesleği" },
      { value: "500", label: "en yüksek puan" },
    ],
  },
  // Instituto Cervantes — examenes.cervantes.es/es/dele/que-es (A1–C2 altı seviye, dört beceri); geçme: B2 sınav
  // rehberi, 100 üzerinden 60 (+ her grupta 30). Kâğıt hücresi kısa sayı ister ("A1–C2" / "Süresiz" kırılıyordu). 2026-10-01.
  "dele-kursu": {
    issuer: "Instituto Cervantes",
    source: "examenes.cervantes.es",
    checked: "Ekim 2026",
    facts: [
      { value: "6", label: "seviye · A1–C2" },
      { value: "4", label: "beceri" },
      { value: "60", label: "geçme puanı / 100" },
    ],
  },
  // ETS — examGuides TOEFL (Ocak 2026 formatı: 4 bölüm, ~2 saat, 1–6 bant).
  "toefl-kursu": {
    issuer: "ETS",
    source: "ets.org",
    checked: CHECKED,
    facts: [
      { value: "4", label: "bölüm" },
      { value: "~2", label: "saat" },
      { value: "1–6", label: "puan bandı" },
    ],
  },
  // IELTS — examGuides IELTS (4 bölüm, 2 saat 45 dk = 165 dk, 0–9 bant).
  "ielts-kursu": {
    issuer: "British Council · IDP",
    source: "ielts.org",
    checked: CHECKED,
    facts: [
      { value: "4", label: "bölüm" },
      { value: "165", label: "dakika" },
      { value: "0–9", label: "puan bandı" },
    ],
  },
  // Proficiency: kayıt YOK — tek bir soru / süre / puan formatı bulunmuyor, her
  // üniversite kendi sınavını belirliyor (examGuides Proficiency). Kâğıt balonlarla durur.
  // ETS — examGuides GRE (kısaltılmış GRE: ~1 sa 58 dk = 118 dk, 5 bölüm, 130–170).
  "gre-kursu": {
    issuer: "ETS",
    source: "ets.org",
    checked: CHECKED,
    facts: [
      { value: "5", label: "bölüm" },
      { value: "118", label: "dakika" },
      { value: "130–170", label: "bölüm puanı" },
    ],
  },
  // GMAC — examGuides GMAT (Focus Edition: 3 bölüm, 2 sa 15 dk = 135 dk, 205–805).
  "gmat-kursu": {
    issuer: "GMAC",
    source: "mba.com",
    checked: CHECKED,
    facts: [
      { value: "3", label: "bölüm" },
      { value: "135", label: "dakika" },
      { value: "205–805", label: "toplam puan" },
    ],
  },
  // College Board — examGuides SAT (dijital SAT: 98 soru, 2 sa 14 dk = 134 dk, 400–1600).
  "sat-kursu": {
    issuer: "College Board",
    source: "collegeboard.org",
    checked: CHECKED,
    facts: [
      { value: "98", label: "soru" },
      { value: "134", label: "dakika" },
      { value: "400–1600", label: "toplam puan" },
    ],
  },
  // ÖSYM — examGuides YDS (2026 YDS / e-YDS kılavuzları: 80 soru, 180 dk, 100 puan).
  "yds-kursu": {
    issuer: "ÖSYM",
    source: "osym.gov.tr",
    checked: CHECKED,
    facts: [
      { value: "80", label: "soru" },
      { value: "180", label: "dakika" },
      { value: "100", label: "puan üzerinden" },
    ],
  },
  // ETS — examGuides TOEIC (Listening & Reading: 200 soru, 2 saat, 10–990).
  "toeic-kursu": {
    issuer: "ETS",
    source: "ets.org",
    checked: CHECKED,
    facts: [
      { value: "200", label: "soru" },
      { value: "~2", label: "saat" },
      { value: "10–990", label: "toplam puan" },
    ],
  },
  // Pearson — privateLessonsExam PTE (3 bölüm, ~2 saat, 10–90).
  "academic-pte": {
    issuer: "Pearson",
    source: "pearsonpte.com",
    checked: CHECKED,
    facts: [
      { value: "3", label: "bölüm" },
      { value: "~2", label: "saat" },
      { value: "10–90", label: "puan aralığı" },
    ],
  },
  // ÖSYM — 2026 YÖKDİL/1 kılavuzu (dokuman.osym.gov.tr … kilavuz_ykdl1d21012026.pdf):
  // "Sınavda soru sayısı 80, sınav süresi 180 dakika olacaktır." · "100 üzerinden".
  "yokdil-sinavi-kursu": {
    issuer: "ÖSYM",
    source: "osym.gov.tr",
    checked: CHECKED,
    facts: [
      { value: "80", label: "soru" },
      { value: "180", label: "dakika" },
      { value: "100", label: "puan üzerinden" },
    ],
  },
  // ETS — ets.org/toefl/test-takers/essentials/content.html ("about 1.5 hours";
  // Listening, Reading, Writing, Speaking) ve …/scores.html ("Overall Score: 1–12").
  // Sınav sürüyor: 2026-2027 TOEFL Essentials Information Bulletin (Temmuz 2026–Haziran 2027).
  "toefl-essentials-kursu": {
    issuer: "ETS",
    source: "ets.org",
    checked: CHECKED,
    facts: [
      { value: "4", label: "bölüm" },
      { value: "~1,5", label: "saat" },
      { value: "1–12", label: "puan ölçeği" },
    ],
  },
  // IELTS Life Skills A1 — ielts.idp.com/about/life-skills-a1 ("The combined speaking and
  // listening test lasts between 16 and 18 minutes"; sonuç geçti / kaldı) ve
  // gov.uk/uk-family-visa/knowledge-of-english ("at least level A1").
  "ingiltere-vize-sinavi-ingilizce-a1kursu": {
    issuer: "IELTS · UKVI",
    source: "ielts.org · gov.uk",
    checked: CHECKED,
    facts: [
      { value: "A1", label: "seviye" },
      { value: "2", label: "beceri" },
      { value: "16–18", label: "dakika" },
    ],
  },
  // TestDaF-Institut — testdaf.de "Aufbau des digitalen TestDaF": Lesen ca. 55, Hören
  // ca. 40, Schreiben ca. 60, Sprechen ca. 35 dk (toplam ≈ 190, resmi toplam yok →
  // "~"); "Auswertung": her bölüm TDN 3, 4 ya da 5.
  "testdaf-kursu": {
    issuer: "TestDaF-Institut",
    source: "testdaf.de",
    checked: CHECKED,
    facts: [
      { value: "4", label: "bölüm" },
      { value: "~190", label: "dakika" },
      { value: "3–5", label: "TDN seviyesi" },
    ],
  },
  // ETS — ets.org/toefl/primary/test-content.html (Step 1 / Step 2: okuma 36 soru 30 dk,
  // dinleme 36 soru 30 dk) ve toefl-steps-reading-scores.pdf ("TOEFL Primary® (100–115)").
  "cocuklar-icin-toefl-primary-egitimi": {
    issuer: "ETS",
    source: "ets.org",
    checked: CHECKED,
    facts: [
      { value: "72", label: "soru" },
      { value: "60", label: "dakika" },
      { value: "100–115", label: "puan aralığı" },
    ],
  },
  // Goethe-Institut — Prüfungsziele / Testbeschreibung A1 SD1 (2022): "Total ca. 80" dk,
  // dört bölüm (Hören, Lesen, Schreiben, Sprechen), "mindestens 60 Punkte" / 100.
  "aile-birlesimi-egitimi": {
    issuer: "Goethe-Institut",
    source: "goethe.de",
    checked: CHECKED,
    facts: [
      { value: "4", label: "bölüm" },
      { value: "~80", label: "dakika" },
      { value: "60/100", label: "geçme puanı" },
    ],
  },
  // Fransızca aile birleşimi: kayıt YOK — Türkiye'de başvuru öncesi dil sınavı 2016'da
  // kalktı (loi n° 2016-274 art. 20); 2024 yasasındaki madde Anayasa Konseyi'nce iptal
  // edildi (2023-863 DC). Sayfa metni hâlâ sınavdan söz ediyor → kullanıcıya soruldu.
};

export function getExamGlance(slug: string): ExamGlance | null {
  return EXAM_GLANCE[slug] ?? null;
}
