/**
 * Faz 6.6 — Şube Kurs Tarihi eşleme tablosu.
 *
 * `data/languages.ts` / `data/universities.ts` ile aynı desen: gövde metni
 * BURADA taşınmaz (drift riski yapısal olarak yok) — yalnız başlık metinleri,
 * slug'lar ve serbest metnin elle sınıflandırılmış hâli (`lib/courseDateContent.ts`
 * dosya başlığındaki gerekçeyle). Kaynak `data/site_content.json`.
 *
 * AŞAMA 1 (pilot): yalnız Kadıköy Proficiency. Aşama 2'de kalan 71 pretty
 * URL eklenecek — 18 kurs × 4 şube matrisi tamamen dolu (plan §2), bu yüzden
 * `byCourse`/`byBranch` tablo dolunca hiçbir ölü link üretmeyecek. Şimdilik
 * tek kayıt olduğu için "Diğer Şubeler"/"Bu Şubedeki Diğer Kurslar"
 * bölümleri neredeyse boş görünür — bu, eksik veri UYDURMAMANIN (CLAUDE.md
 * §5) doğal sonucu, Aşama 2'de dolacak.
 */

import type { CourseDateEntry } from "@/lib/courseDateContent";

export const COURSE_DATES: CourseDateEntry[] = [
  {
    branch: "kadikoy",
    branchLabel: "Kadıköy",
    courseSlug: "proficiency-kursu",
    courseName: "PROFICIENCY",
    category: "sinav-hazirlik-egitimleri",
    pageSlug: "kadikoy-subesi-proficiency-kurs-tarihi",
    sourcePath: "/sinav-hazirlik-egitimleri/proficiency-kursu/kadikoy-subesi-proficiency-kurs-tarihi.html",
    crumbRoot: "Sınav Hazırlık",
    crumbRootHref: "/sinav-hazirlik-egitimleri",
    crumbCourse: "Proficiency Kursu",
    crumbCourseHref: "/sinav-hazirlik-egitimleri/proficiency-kursu",
    groupSize: 6,
    months: 2,
    hours: 48,
    programs: [
      {
        kind: "haftaici",
        heading: "Kadıköy Şubesi Hafta İçi PROFICIENCY Kurs Programı",
        rawLines: [
          "Günler ve Saatler: Pazartesi - Salı - Perşembe Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 17:00 / 19:00",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2 Ay - 48 Saat - Yoğun Program Speaking - Listening & Writing - Reading Etütleri",
          "Ücretlendirme: Program Ücreti 3.500 TL",
        ],
        days: ["pzt", "sal", "per"],
        slots: [
          { name: "Sabah Programı", start: "10:00", end: "13:00" },
          { name: "Akşam Programı", start: "17:00", end: "19:00" },
        ],
        hoursNote: null,
        specs: [
          { key: "grupBuyuklugu", text: "6 Kişilik Özel Gruplar", icon: "grup" },
          { key: "programSuresi", text: "Program Süresi 2 Ay", icon: "sure" },
          { key: "toplamSaat", text: "48 Saat", icon: "saat" },
          { key: "yogunluk", text: "Yoğun Program", icon: "takvim" },
        ],
        study: ["Speaking", "Listening & Writing", "Reading Etütleri"],
        note: null,
        startDate: null,
      },
      {
        kind: "haftasonu",
        heading: "Kadıköy Şubesi Hafta Sonu PROFICIENCY Kurs Programı",
        rawLines: [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 14:00 / 18:00",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2 Ay - 48 Saat - Yoğun Program - Speaking - Listening & Writing - Reading Etütleri",
          "Ücretlendirme: Program Ücreti 3.500 TL",
        ],
        days: ["cmt", "paz"],
        slots: [
          { name: "Sabah Programı", start: "10:00", end: "13:00" },
          { name: "Öğlen Programı", start: "14:00", end: "18:00" },
        ],
        hoursNote: null,
        specs: [
          { key: "grupBuyuklugu", text: "6 Kişilik Özel Gruplar", icon: "grup" },
          { key: "programSuresi", text: "Program Süresi 2 Ay", icon: "sure" },
          { key: "toplamSaat", text: "48 Saat", icon: "saat" },
          { key: "yogunluk", text: "Yoğun Program", icon: "takvim" },
        ],
        study: ["Speaking", "Listening & Writing", "Reading Etütleri"],
        note: null,
        startDate: null,
      },
      {
        kind: "birebir",
        heading: "İstediğiniz Gün ve Saatlerde Birebir PROFICIENCY Özel Ders",
        rawLines: [
          "Program Süresi: Kişiye Özel Program Süresi Hazırlanmaktadır",
          "Günler ve Saatler: Eğitim hayatınıza uygun gün ve saatlerde Proficiency özel ders alabilirsiniz.",
          "Program Detayları: Speaking - Listening & Writing - Reading Etütleri - Üniversite'nin Sınav Formatına Yönelik Soru Çözme Teknikleri",
          "Toplam Ders Saati Üzerinden Ücretlendirilir.",
        ],
        days: [],
        slots: [],
        hoursNote: "Eğitim hayatınıza uygun gün ve saatlerde Proficiency özel ders alabilirsiniz.",
        specs: [{ key: "programSuresi", text: "Kişiye Özel Program Süresi Hazırlanmaktadır", icon: "sure" }],
        study: [
          "Speaking",
          "Listening & Writing",
          "Reading Etütleri",
          "Üniversite'nin Sınav Formatına Yönelik Soru Çözme Teknikleri",
        ],
        note: null,
        startDate: null,
      },
    ],
  },
];

export function findCourseDateEntry(
  category: CourseDateEntry["category"],
  courseSlug: string,
  pageSlug: string,
): CourseDateEntry | undefined {
  return COURSE_DATES.find(
    (e) => e.category === category && e.courseSlug === courseSlug && e.pageSlug === pageSlug,
  );
}

/** Aynı kursun diğer şubeleri — `LinkRow` (density="compact") girdisi. */
export function byCourse(courseSlug: string): CourseDateEntry[] {
  return COURSE_DATES.filter((e) => e.courseSlug === courseSlug);
}

/** Aynı şubenin diğer kursları — `LinkRow` (density="cards") girdisi. */
export function byBranch(branch: CourseDateEntry["branch"]): CourseDateEntry[] {
  return COURSE_DATES.filter((e) => e.branch === branch);
}
