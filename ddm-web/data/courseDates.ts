/**
 * Faz 6.6 — Şube Kurs Tarihi eşleme tablosu.
 *
 * `data/languages.ts` / `data/universities.ts` ile aynı desen: gövde metni
 * BURADA taşınmaz (drift riski yapısal olarak yok) — yalnız başlık metinleri,
 * slug'lar ve serbest metnin elle sınıflandırılmış hâli (`lib/courseDateContent.ts`
 * dosya başlığındaki gerekçeyle). Kaynak `data/site_content.json`.
 *
 * Tüm 72 temiz-URL kaydı (18 kurs × 4 şube). Aşama 2: kayıtlar
 * `site_content.json`dan üretim betiğiyle çıkarıldı, ardından gözle doğrulandı;
 * `rawLines` round-trip doğrulaması (`lib/courseDateContent.ts`) kaynak
 * sapmasında build'i düşürür.
 */

import type { CourseDateEntry } from "@/lib/courseDateContent";

export const COURSE_DATES: CourseDateEntry[] = [
  {
    "branch": "atasehir",
    "branchLabel": "Ataşehir",
    "courseSlug": "yabancila-icin-turkce-kurs",
    "courseName": "Türkçe",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "atasehir-subesi-turkce-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/atasehir-subesi-turkce-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "Türkçe Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs",
    "groupSize": 6,
    "months": 2.0,
    "hours": 48,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Ataşehir Şubesi Hafta İçi Türkçe Kurs Tarihi",
        "rawLines": [
          "Başlangıç Tarihi: 19 Eylül 2022",
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - 1 Kur Program Süresi 2 Ay - 48 Saat",
          "3 Kur Türkçe Eğitimi Alan Herkese +1 Kur Hediye Toplam 192 Saat"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "48 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": "3 Kur Türkçe Eğitimi Alan Herkese +1 Kur Hediye Toplam 192 Saat",
        "startDate": "19 Eylül 2022"
      },
      {
        "kind": "haftasonu",
        "heading": "Ataşehir Şubesi Hafta Sonu Türkçe Kurs Tarihi",
        "rawLines": [
          "Başlangıç Tarihi: 17 Eylül 2022",
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - 1 Kur Program Süresi 2 Ay - 48 Saat",
          "3 Kur Türkçe Eğitimi Alan Herkese +1 Kur Hediye Toplam 192 Saat"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "48 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": "3 Kur Türkçe Eğitimi Alan Herkese +1 Kur Hediye Toplam 192 Saat",
        "startDate": "17 Eylül 2022"
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir Türkçe Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde Türkçe özel ders alabilirsiniz.",
          "Program Detayları: Başlangıç Seviyesi A1 / Başlangıç Üzeri A2 / Orta Seviye B1 / Orta Seviye Üzeri B2 / İleri Düzey",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde Türkçe özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Başlangıç Seviyesi A1",
          "Başlangıç Üzeri A2",
          "Orta Seviye B1",
          "Orta Seviye Üzeri B2",
          "İleri Düzey"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "etiler",
    "branchLabel": "Etiler",
    "courseSlug": "ingilizce-kursu",
    "courseName": "İngilizce",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "besiktas-subesi-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/ingilizce-kursu/besiktas-subesi-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "İngilizce Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/ingilizce-kursu",
    "groupSize": 4,
    "months": null,
    "hours": null,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Etiler Şubesi Hafta İçi İngilizce Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: Maksimum 4 Kişilik Butik Gruplar - A1 Kur Programı 36+36 Toplam 72 Saat",
          "6 Kurluk CEFR İngilizce Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 4 Kişilik Butik Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "A1 Kur Programı 36+36 Toplam 72 Saat",
            "icon": "sure"
          }
        ],
        "study": [],
        "note": "6 Kurluk CEFR İngilizce Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2",
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Etiler Şubesi Hafta Sonu İngilizce Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: Maksimum 4 Kişilik Butik Gruplar - A1 Kur Programı 36+36 Toplam 72 Saat",
          "6 Kurluk CEFR İngilizce Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 4 Kişilik Butik Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "A1 Kur Programı 36+36 Toplam 72 Saat",
            "icon": "sure"
          }
        ],
        "study": [],
        "note": "6 Kurluk CEFR İngilizce Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2",
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir İngilizce Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde İngilizce özel ders alabilirsiniz.",
          "Program Detayları: Başlangıç Seviyesi A1 / Başlangıç Üzeri A2 / Orta Seviye B1 / Orta Seviye Üzeri B2 / İleri Düzey Advanced",
          "Toplam Ders Saati Üzerinden Ücretlendirilir. 1 Ders Süresi 50 Dakikadır."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde İngilizce özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Başlangıç Seviyesi A1",
          "Başlangıç Üzeri A2",
          "Orta Seviye B1",
          "Orta Seviye Üzeri B2",
          "İleri Düzey Advanced"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "bagdat",
    "branchLabel": "Bağdat Caddesi",
    "courseSlug": "ingilizce-kursu",
    "courseName": "İngilizce",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "bagdat-caddesi-subesi-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/ingilizce-kursu/bagdat-caddesi-subesi-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "İngilizce Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/ingilizce-kursu",
    "groupSize": 6,
    "months": 2.5,
    "hours": 60,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Bağdat Caddesi Şubesi Hafta İçi İngilizce Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba veya Salı - Perşembe Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: Maksimum 6 Kişilik Özel Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat - Speaking - Listening - Writing - Reading Etütleri",
          "3 Kur İngilizce Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat"
        ],
        "days": [
          "pzt",
          "car",
          "sal",
          "per"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [
          "Speaking",
          "Listening",
          "Writing",
          "Reading Etütleri"
        ],
        "note": "3 Kur İngilizce Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat",
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Bağdat Caddesi Şubesi Hafta Sonu İngilizce Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: Maksimum 6 Kişilik Özel Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat - Speaking - Listening - Writing - Reading Etütleri",
          "3 Kur İngilizce Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [
          "Speaking",
          "Listening",
          "Writing",
          "Reading Etütleri"
        ],
        "note": "3 Kur İngilizce Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat",
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir İngilizce Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde İngilizce özel ders alabilirsiniz.",
          "Program Detayları: Başlangıç Seviyesi A1 / Başlangıç Üzeri A2 / Orta Seviye B1 / Orta Seviye Üzeri B2 / İleri Düzey Advanced",
          "Toplam Ders Saati Üzerinden Ücretlendirilir. 1 Ders Süresi 50 Dakikadır."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde İngilizce özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Başlangıç Seviyesi A1",
          "Başlangıç Üzeri A2",
          "Orta Seviye B1",
          "Orta Seviye Üzeri B2",
          "İleri Düzey Advanced"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "bagdat",
    "branchLabel": "Bağdat Caddesi",
    "courseSlug": "gmat-kursu",
    "courseName": "GMAT",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "bagdat-caddesi-gmat-subesi-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/gmat-kursu/bagdat-caddesi-gmat-subesi-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "GMAT Kursu",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/gmat-kursu",
    "groupSize": 6,
    "months": 2.0,
    "hours": 50,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Bağdat Caddesi Şubesi Hafta İçi GMAT Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba veya Salı - Perşembe Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2 Ay - 50 Saat",
          "Ücretlendirme: Program Ücreti 80.000 TL"
        ],
        "days": [
          "pzt",
          "car",
          "sal",
          "per"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "50 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Bağdat Caddesi Şubesi Hafta Sonu GMAT Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:00 / 16:00",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2 Ay - 50 Saat",
          "Ücretlendirme: Program Ücreti 80.000 TL"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:00",
            "end": "16:00"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "50 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir GMAT Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde özel ders alabilirsiniz.",
          "Program Detayları: Sözel, Sayısal ve Analitik Okuma, Yazma, Soru Çözümleme Etütleri - Sınav Tekniği",
          "Toplam ders saati üzerinden ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Sözel, Sayısal ve Analitik Okuma, Yazma, Soru Çözümleme Etütleri",
          "Sınav Tekniği"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "bagdat",
    "branchLabel": "Bağdat Caddesi",
    "courseSlug": "rusca-kursu",
    "courseName": "Rusça",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "bagdat-caddesi-subesi-rusca-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/rusca-kursu/bagdat-caddesi-subesi-rusca-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "Rusça Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/rusca-kursu",
    "groupSize": 6,
    "months": 2.5,
    "hours": 60,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Bağdat Caddesi Şubesi Hafta İçi Rusça Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba veya Salı - Perşembe Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: Maksimum 6 Kişilik Özel Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat",
          "3 Kur Rusça Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat"
        ],
        "days": [
          "pzt",
          "car",
          "sal",
          "per"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": "3 Kur Rusça Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat",
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Bağdat Caddesi Şubesi Hafta Sonu Rusça Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: Maksimum 6 Kişilik Özel Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat",
          "3 Kur Rusça Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": "3 Kur Rusça Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat",
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir Rusça Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde Rusça özel ders alabilirsiniz.",
          "Program Detayları: Başlangıç Seviyesi A1 / Başlangıç Üzeri A2 / Orta Seviye B1 / Orta Seviye Üzeri B2 / İleri Düzey",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde Rusça özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Başlangıç Seviyesi A1",
          "Başlangıç Üzeri A2",
          "Orta Seviye B1",
          "Orta Seviye Üzeri B2",
          "İleri Düzey"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "etiler",
    "branchLabel": "Etiler",
    "courseSlug": "ispanyolca-kursu",
    "courseName": "İspanyolca",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "besiktas-subesi-ispanyolca-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/ispanyolca-kursu/besiktas-subesi-ispanyolca-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "İspanyolca Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/ispanyolca-kursu",
    "groupSize": 6,
    "months": null,
    "hours": null,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Etiler Şubesi Hafta İçi İspanyolca Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: Maksimum 6 Kişilik Butik Gruplar - A1 Kur Programı 36+36 Toplam 72 Saat",
          "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 6 Kişilik Butik Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "A1 Kur Programı 36+36 Toplam 72 Saat",
            "icon": "sure"
          }
        ],
        "study": [],
        "note": "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2",
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Etiler Şubesi Hafta Sonu İspanyolca Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: Maksimum 6 Kişilik Butik Gruplar - A1 Kur Programı 36+36 Toplam 72 Saat",
          "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 6 Kişilik Butik Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "A1 Kur Programı 36+36 Toplam 72 Saat",
            "icon": "sure"
          }
        ],
        "study": [],
        "note": "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2",
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir İspanyolca Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde İspanyolca özel ders alabilirsiniz.",
          "Program Detayları: Başlangıç Seviyesi A1 / Başlangıç Üzeri A2 / Orta Seviye B1 / Orta Seviye Üzeri B2 / İleri Düzey",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde İspanyolca özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Başlangıç Seviyesi A1",
          "Başlangıç Üzeri A2",
          "Orta Seviye B1",
          "Orta Seviye Üzeri B2",
          "İleri Düzey"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "atasehir",
    "branchLabel": "Ataşehir",
    "courseSlug": "cince-kursu",
    "courseName": "Çince",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "atasehir-subesi-cince-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/cince-kursu/atasehir-subesi-cince-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "Çince Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/cince-kursu",
    "groupSize": 6,
    "months": 2.5,
    "hours": 60,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Ataşehir Şubesi Hafta İçi Çince Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat",
          "3 Kur Çince Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": "3 Kur Çince Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat",
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Ataşehir Şubesi Hafta Sonu Çince Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat",
          "3 Kur Çince Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": "3 Kur Çince Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat",
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir Çince Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde Çince özel ders alabilirsiniz.",
          "Program Detayları: Başlangıç Seviyesi A1 / Başlangıç Üzeri A2 / Orta Seviye B1 / Orta Seviye Üzeri B2 / İleri Düzey",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde Çince özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Başlangıç Seviyesi A1",
          "Başlangıç Üzeri A2",
          "Orta Seviye B1",
          "Orta Seviye Üzeri B2",
          "İleri Düzey"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "kadikoy",
    "branchLabel": "Kadıköy",
    "courseSlug": "yabancila-icin-turkce-kurs",
    "courseName": "Türkçe",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "kadikoy-subesi-turkce-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/kadikoy-subesi-turkce-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "Türkçe Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs",
    "groupSize": 6,
    "months": null,
    "hours": null,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Kadıköy Şubesi Hafta İçi Türkçe Kurs Tarihi",
        "rawLines": [
          "Başlangıç Tarihi: 19 Eylül 2022",
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - 1 Kur Program Süresi 2 Ay - 48 Saat",
          "3 Kur Türkçe Eğitimi Alan Herkese +1 Kur Hediye Toplam 192 Saat"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "48 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": "3 Kur Türkçe Eğitimi Alan Herkese +1 Kur Hediye Toplam 192 Saat",
        "startDate": "19 Eylül 2022"
      },
      {
        "kind": "haftasonu",
        "heading": "Kadıköy Şubesi Hafta Sonu Türkçe Kurs Tarihi",
        "rawLines": [
          "Başlangıç Tarihi: 17 Eylül 2022",
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat",
          "3 Kur Türkçe Eğitimi Alan Herkese +1 Kur Hediye Toplam 192 Saat"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": "3 Kur Türkçe Eğitimi Alan Herkese +1 Kur Hediye Toplam 192 Saat",
        "startDate": "17 Eylül 2022"
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir Türkçe Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde Türkçe özel ders alabilirsiniz.",
          "Program Detayları: Başlangıç Seviyesi A1 / Başlangıç Üzeri A2 / Orta Seviye B1 / Orta Seviye Üzeri B2 / İleri Düzey",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde Türkçe özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Başlangıç Seviyesi A1",
          "Başlangıç Üzeri A2",
          "Orta Seviye B1",
          "Orta Seviye Üzeri B2",
          "İleri Düzey"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "atasehir",
    "branchLabel": "Ataşehir",
    "courseSlug": "toefl-kursu",
    "courseName": "TOEFL",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "atasehir-subesi-toefl-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/toefl-kursu/atasehir-subesi-toefl-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "TOEFL Kursu",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/toefl-kursu",
    "groupSize": 6,
    "months": 2.5,
    "hours": null,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Ataşehir Şubesi Hafta İçi TOEFL Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2,5 Ay - Toplam 60 Ders - 1 Ders 50 Dakika",
          "TOEFL Kurs Detayları: Sınav Tekniği, Speaking Club, Listening, Writing, Reading Etütleri, Interactive Vocabulary Exercises"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "Toplam 60 Ders",
            "icon": "saat"
          },
          {
            "key": "toplamSaat",
            "text": "1 Ders 50 Dakika",
            "icon": "saat"
          }
        ],
        "study": [
          "Sınav Tekniği",
          "Speaking Club",
          "Listening",
          "Writing",
          "Reading Etütleri",
          "Interactive Vocabulary Exercises"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Ataşehir Şubesi Hafta Sonu TOEFL Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2,5 Ay - Toplam 60 Ders - 1 Ders 50 Dakika",
          "TOEFL Kurs Detayları: Sınav Tekniği, Speaking Club, Listening, Writing, Reading Etütleri, Interactive Vocabulary Exercises"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "Toplam 60 Ders",
            "icon": "saat"
          },
          {
            "key": "toplamSaat",
            "text": "1 Ders 50 Dakika",
            "icon": "saat"
          }
        ],
        "study": [
          "Sınav Tekniği",
          "Speaking Club",
          "Listening",
          "Writing",
          "Reading Etütleri",
          "Interactive Vocabulary Exercises"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "Ataşehir Şubesi TOEFL Özel Ders Programları",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde TOEFL özel ders alabilirsiniz.",
          "Program Detayları: Writing - Reading - Listening - Speaking Etütleri - TOEFL Tekniği - Sınav Formatı Bilgilendirme",
          "Toplam Ders Saati Üzerinden Ücretlendirilir. 1 Ders Saati 50 Dakikadır."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde TOEFL özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Writing",
          "Reading",
          "Listening",
          "Speaking Etütleri",
          "TOEFL Tekniği",
          "Sınav Formatı Bilgilendirme"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "etiler",
    "branchLabel": "Etiler",
    "courseSlug": "fransizca-kursu",
    "courseName": "Fransızca",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "besiktas-subesi-fransizca-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/fransizca-kursu/besiktas-subesi-fransizca-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "Fransızca Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/fransizca-kursu",
    "groupSize": 4,
    "months": null,
    "hours": null,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Etiler Şubesi Hafta İçi Fransızca Kurs Tarihleri",
        "rawLines": [
          "Başlangıç Tarihi: 27 Haziran 2022",
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: Maksimum 4 Kişilik Butik Gruplar - A1 Kur Programı 36+36 Toplam 72 Saat",
          "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 4 Kişilik Butik Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "A1 Kur Programı 36+36 Toplam 72 Saat",
            "icon": "sure"
          }
        ],
        "study": [],
        "note": "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2",
        "startDate": "27 Haziran 2022"
      },
      {
        "kind": "haftasonu",
        "heading": "Etiler Şubesi Hafta Sonu Fransızca Kurs Tarihleri",
        "rawLines": [
          "Başlangıç Tarihi: 25 Haziran 2022",
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: Maksimum 4 Kişilik Butik Gruplar - A1 Kur Programı 36+36 Toplam 72 Saatt",
          "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 4 Kişilik Butik Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "A1 Kur Programı 36+36 Toplam 72 Saatt",
            "icon": "sure"
          }
        ],
        "study": [],
        "note": "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2",
        "startDate": "25 Haziran 2022"
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir Fransızca Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde Fransızca özel ders alabilirsiniz.",
          "Program Detayları: Başlangıç Seviyesi A1 / Başlangıç Üzeri A2 / Orta Seviye B1 / Orta Seviye Üzeri B2 / İleri Düzey",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde Fransızca özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Başlangıç Seviyesi A1",
          "Başlangıç Üzeri A2",
          "Orta Seviye B1",
          "Orta Seviye Üzeri B2",
          "İleri Düzey"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "etiler",
    "branchLabel": "Etiler",
    "courseSlug": "gre-kursu",
    "courseName": "GRE",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "besiktas-subesi-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/gre-kursu/besiktas-subesi-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "GRE Kursu",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/gre-kursu",
    "groupSize": 6,
    "months": 2.0,
    "hours": 48,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Etiler Şubesi Hafta İçi GRE Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2 Ay - 48 Saat",
          "Ücretlendirme: Program Ücreti 3.500 TL"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "48 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Etiler Şubesi Hafta Sonu GRE Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:00 / 16:00",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2 Ay - 48 Saat",
          "Ücretlendirme: Program Ücreti 3.500 TL"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:00",
            "end": "16:00"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "48 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir GRE Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde özel ders alabilirsiniz.",
          "Program Detayları: Sözel, Sayısal, Analitik Kompozisyon Yazma - Analiz ve Sonuç Çıkarma, Kelime, Cümle Anlam Kavrama Etütleri - Sınav Tekniği",
          "Toplam ders saati üzerinden ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Sözel, Sayısal, Analitik Kompozisyon Yazma",
          "Analiz ve Sonuç Çıkarma, Kelime, Cümle Anlam Kavrama Etütleri",
          "Sınav Tekniği"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "etiler",
    "branchLabel": "Etiler",
    "courseSlug": "yabancila-icin-turkce-kurs",
    "courseName": "Türkçe",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "besiktas-subesi-turkce-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/besiktas-subesi-turkce-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "Türkçe Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs",
    "groupSize": 6,
    "months": 2.5,
    "hours": 60,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Etiler Şubesi Hafta İçi Türkçe Kurs Tarihi",
        "rawLines": [
          "Başlangıç Tarihi: 19 Eylül 2022",
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat",
          "3 Kur Türkçe Eğitimi Alan Herkese +1 Kur Hediye Toplam 192 Saat"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": "3 Kur Türkçe Eğitimi Alan Herkese +1 Kur Hediye Toplam 192 Saat",
        "startDate": "19 Eylül 2022"
      },
      {
        "kind": "haftasonu",
        "heading": "Etiler Şubesi Hafta Sonu Türkçe Kurs Tarihi",
        "rawLines": [
          "Başlangıç Tarihi: 17 Eylül 2022",
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat",
          "3 Kur Türkçe Eğitimi Alan Herkese +1 Kur Hediye Toplam 192 Saat"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": "3 Kur Türkçe Eğitimi Alan Herkese +1 Kur Hediye Toplam 192 Saat",
        "startDate": "17 Eylül 2022"
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir Türkçe Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde Türkçe özel ders alabilirsiniz.",
          "Program Detayları: Başlangıç Seviyesi A1 / Başlangıç Üzeri A2 / Orta Seviye B1 / Orta Seviye Üzeri B2 / İleri Düzey",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde Türkçe özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Başlangıç Seviyesi A1",
          "Başlangıç Üzeri A2",
          "Orta Seviye B1",
          "Orta Seviye Üzeri B2",
          "İleri Düzey"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "atasehir",
    "branchLabel": "Ataşehir",
    "courseSlug": "yds-kursu",
    "courseName": "YDS",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "atasehir-subesi-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/yds-kursu/atasehir-subesi-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "YDS Kursu",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/yds-kursu",
    "groupSize": null,
    "months": 3.0,
    "hours": 100,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Ataşehir Şubesi Hafta İçi YDS Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 14:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: Özel Gruplar - Program Süresi 3 Ay 100 Saat - Gramer Dil Bilgisi - Kelime ve Okuma Etütleri - Sınav Tekniği ve Soru Çözme Stratejileri",
          "Ücretlendirme: Program Ücreti 2.000 TL 6 Taksit"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "14:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 3 Ay 100 Saat",
            "icon": "sure"
          }
        ],
        "study": [
          "Gramer Dil Bilgisi",
          "Kelime ve Okuma Etütleri",
          "Sınav Tekniği ve Soru Çözme Stratejileri"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Ataşehir Şubesi Hafta Sonu YDS Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 14:00 - Öğlen Programı 14:00 / 18:00",
          "Program Detayları: Özel Gruplar - Program Süresi 3 Ay 100 Saat - Gramer Dil Bilgisi - Kelime ve Okuma Etütleri - Sınav Tekniği ve Soru Çözme Stratejileri",
          "Ücretlendirme: Program Ücreti 2.000 TL 6 Taksit"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "14:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "14:00",
            "end": "18:00"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 3 Ay 100 Saat",
            "icon": "sure"
          }
        ],
        "study": [
          "Gramer Dil Bilgisi",
          "Kelime ve Okuma Etütleri",
          "Sınav Tekniği ve Soru Çözme Stratejileri"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir YDS Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde YDS özel ders alabilirsiniz.",
          "Program Detayları: Gramer, Dil Bilgisi, Sınav Tekniği, Kelime ve Test Çözme Etütleri",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde YDS özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Gramer, Dil Bilgisi, Sınav Tekniği, Kelime ve Test Çözme Etütleri"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "atasehir",
    "branchLabel": "Ataşehir",
    "courseSlug": "aile-birlesimi-egitimi",
    "courseName": "Aile Birleşimi",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "atasehir-subesi-aile-birlesimi-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi/atasehir-subesi-aile-birlesimi-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "Aile Birleşimi Eğitimi",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi",
    "groupSize": 6,
    "months": 2.0,
    "hours": 48,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Ataşehir Şubesi Hafta İçi Aile Birleşimi Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2 Ay - 48 Saat",
          "Ücretlendirme: Program Ücreti 2.000 TL / 6 Taksit"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "48 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Ataşehir Şubesi Hafta Sonu Aile Birleşimi Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:00 / 16:00",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2 Ay - 48 Saat",
          "Ücretlendirme: Program Ücreti 2.000 TL / 6 Taksit"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:00",
            "end": "16:00"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "48 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir Aile Birleşimi Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde özel ders alabilirsiniz.",
          "Program Detayları: Okuma, Yazma, Konuşma ve Dinleme Etütleri, A1 Sınav Tekniği Dersleri",
          "Toplam ders saati üzerinden ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Okuma, Yazma, Konuşma ve Dinleme Etütleri, A1 Sınav Tekniği Dersleri"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "bagdat",
    "branchLabel": "Bağdat Caddesi",
    "courseSlug": "toeic-kursu",
    "courseName": "TOEIC",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "bagdat-caddesi-subesi-toeic-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/toeic-kursu/bagdat-caddesi-subesi-toeic-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "TOEIC Kursu",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/toeic-kursu",
    "groupSize": 6,
    "months": 2.0,
    "hours": 50,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Bağdat Caddesi Şubesi Hafta İçi TOEIC Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Sabah Programı: 10:00 / 13:00 - Akşam Programı: 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2 Ay - 50 Saat",
          "Ücretlendirme: Program Ücreti 80.000 TL 6 Taksit"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "50 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Bağdat Caddesi Şubesi Hafta Sonu TOEIC Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Sabah Programı: 10:00 / 13:00 - Öğlen Programı: 13:30 / 16:00",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2 Ay - 50 Saat",
          "Ücretlendirme: Program Ücreti 80.000 TL 6 Taksit"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:00"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "50 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir TOEIC Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde TOEIC özel ders alabilirsiniz.",
          "Program Detayları: Okuma, Anlama, Kelime Bilgisi ve Sınav Tekniği Etütleri",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde TOEIC özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Okuma, Anlama, Kelime Bilgisi ve Sınav Tekniği Etütleri"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "kadikoy",
    "branchLabel": "Kadıköy",
    "courseSlug": "yds-kursu",
    "courseName": "YDS",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "kadikoy-subesi-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/yds-kursu/kadikoy-subesi-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "YDS Kursu",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/yds-kursu",
    "groupSize": null,
    "months": 3.0,
    "hours": 100,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Kadıköy Şubesi Hafta İçi YDS Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 14:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: Özel Gruplar - Program Süresi 3 Ay 100 Saat - Gramer Dil Bilgisi - Kelime ve Okuma Etütleri - Sınav Tekniği ve Soru Çözme Stratejileri",
          "Ücretlendirme: Program Ücreti 2.000 TL 6 Taksit"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "14:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 3 Ay 100 Saat",
            "icon": "sure"
          }
        ],
        "study": [
          "Gramer Dil Bilgisi",
          "Kelime ve Okuma Etütleri",
          "Sınav Tekniği ve Soru Çözme Stratejileri"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Kadıköy Şubesi Hafta Sonu YDS Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 14:00 - Öğlen Programı 14:00 / 18:00",
          "Program Detayları: Özel Gruplar - Program Süresi 3 Ay 100 Saat - Gramer Dil Bilgisi - Kelime ve Okuma Etütleri - Sınav Tekniği ve Soru Çözme Stratejileri",
          "Ücretlendirme: Program Ücreti 2.000 TL 6 Taksit"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "14:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "14:00",
            "end": "18:00"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 3 Ay 100 Saat",
            "icon": "sure"
          }
        ],
        "study": [
          "Gramer Dil Bilgisi",
          "Kelime ve Okuma Etütleri",
          "Sınav Tekniği ve Soru Çözme Stratejileri"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir YDS Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde YDS özel ders alabilirsiniz.",
          "Program Detayları: Gramer, Dil Bilgisi, Sınav Tekniği, Kelime ve Test Çözme Etütleri",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde YDS özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Gramer, Dil Bilgisi, Sınav Tekniği, Kelime ve Test Çözme Etütleri"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "atasehir",
    "branchLabel": "Ataşehir",
    "courseSlug": "rusca-kursu",
    "courseName": "Rusça",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "atasehir-subesi-rusca-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/rusca-kursu/atasehir-subesi-rusca-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "Rusça Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/rusca-kursu",
    "groupSize": 6,
    "months": null,
    "hours": null,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Ataşehir Şubesi Hafta İçi Rusça Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - A1 Kur Programı 36+36 Toplam 72 Saat",
          "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "A1 Kur Programı 36+36 Toplam 72 Saat",
            "icon": "sure"
          }
        ],
        "study": [],
        "note": "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2",
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Ataşehir Şubesi Hafta Sonu Rusça Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - A1 Kur Programı 36+36 Toplam 72 Saat",
          "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "A1 Kur Programı 36+36 Toplam 72 Saat",
            "icon": "sure"
          }
        ],
        "study": [],
        "note": "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2",
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir Rusça Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde Rusça özel ders alabilirsiniz.",
          "Program Detayları: Başlangıç Seviyesi A1 / Başlangıç Üzeri A2 / Orta Seviye B1 / Orta Seviye Üzeri B2 / İleri Düzey",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde Rusça özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Başlangıç Seviyesi A1",
          "Başlangıç Üzeri A2",
          "Orta Seviye B1",
          "Orta Seviye Üzeri B2",
          "İleri Düzey"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "kadikoy",
    "branchLabel": "Kadıköy",
    "courseSlug": "ielts-kursu",
    "courseName": "IELTS",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "kadikoy-subesi-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/ielts-kursu/kadikoy-subesi-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "IELTS Kursu",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/ielts-kursu",
    "groupSize": 6,
    "months": 2.5,
    "hours": null,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Kadıköy Şubesi Hafta İçi IELTS Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2,5 Ay - Toplam 60 Ders - 1 Ders 50 Dakika",
          "IELTS Kurs Detayları: Sınav Tekniği, Speaking Club, Listening, Writing, Reading Etütleri, Interactive Vocabulary Exercises"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "Toplam 60 Ders",
            "icon": "saat"
          },
          {
            "key": "toplamSaat",
            "text": "1 Ders 50 Dakika",
            "icon": "saat"
          }
        ],
        "study": [
          "Sınav Tekniği",
          "Speaking Club",
          "Listening",
          "Writing",
          "Reading Etütleri",
          "Interactive Vocabulary Exercises"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Kadıköy Şubesi Hafta Sonu IELTS Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2,5 Ay - Toplam 60 Ders - 1 Ders 50 Dakika",
          "IELTS Kurs Detayları: Sınav Tekniği, Speaking Club, Listening, Writing, Reading Etütleri, Interactive Vocabulary Exercises"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "Toplam 60 Ders",
            "icon": "saat"
          },
          {
            "key": "toplamSaat",
            "text": "1 Ders 50 Dakika",
            "icon": "saat"
          }
        ],
        "study": [
          "Sınav Tekniği",
          "Speaking Club",
          "Listening",
          "Writing",
          "Reading Etütleri",
          "Interactive Vocabulary Exercises"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir IELTS Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde IELTS özel ders alabilirsiniz.",
          "Program Detayları: Reading, Writing, Listening, Speaking Etütleri, Sınav Tekniği",
          "Toplam Ders Saati Üzerinden Ücretlendirilir. 1 Ders Saati 50 Dakikadır."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde IELTS özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Reading, Writing, Listening, Speaking Etütleri, Sınav Tekniği"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "bagdat",
    "branchLabel": "Bağdat Caddesi",
    "courseSlug": "ingilizce-konusma-kursu",
    "courseName": "İngilizce Konuşma",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "bagdat-caddesi-subesi-ingilizce-konusma-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/ingilizce-konusma-kursu/bagdat-caddesi-subesi-ingilizce-konusma-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "İngilizce Konuşma Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/ingilizce-konusma-kursu",
    "groupSize": 6,
    "months": 2.5,
    "hours": 60,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Bağdat Caddesi Şubesi Hafta İçi İngilizce Konuşma Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba veya Salı - Perşembe Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: Maksimum 6 Kişilik Özel Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat - Speaking - Listening",
          "Ücretlendirme: Program Ücreti 6.500 TL"
        ],
        "days": [
          "pzt",
          "car",
          "sal",
          "per"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [
          "Speaking",
          "Listening"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Bağdat Caddesi Şubesi Hafta Sonu İngilizce Konuşma Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: Maksimum 6 Kişilik Özel Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat - Speaking - Listening",
          "Ücretlendirme: Program Ücreti 6.500 TL"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [
          "Speaking",
          "Listening"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir Speaking Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde Speaking dersleri alabilirsiniz.",
          "Program Detayları: İngilizce Akıcı Konuşma Teknikleri - Pratik İngilizce Diyalogları - Speaking - Conversation Club",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde Speaking dersleri alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "İngilizce Akıcı Konuşma Teknikleri",
          "Pratik İngilizce Diyalogları",
          "Speaking",
          "Conversation Club"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "etiler",
    "branchLabel": "Etiler",
    "courseSlug": "cince-kursu",
    "courseName": "Çince",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "besiktas-subesi-cince-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/cince-kursu/besiktas-subesi-cince-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "Çince Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/cince-kursu",
    "groupSize": 6,
    "months": 2.5,
    "hours": 60,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Etiler Şubesi Hafta İçi Çince Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat",
          "3 Kur Çince Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": "3 Kur Çince Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat",
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Etiler Şubesi Hafta Sonu Çince Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:00 / 16:00",
          "Program Detayları: 6 Kişilik Özel Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat",
          "3 Kur Çince Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:00",
            "end": "16:00"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": "3 Kur Çince Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat",
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir Çince Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde Çince özel ders alabilirsiniz.",
          "Program Detayları: Başlangıç Seviyesi A1 / Başlangıç Üzeri A2 / Orta Seviye B1 / Orta Seviye Üzeri B2 / İleri Düzey",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde Çince özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Başlangıç Seviyesi A1",
          "Başlangıç Üzeri A2",
          "Orta Seviye B1",
          "Orta Seviye Üzeri B2",
          "İleri Düzey"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "bagdat",
    "branchLabel": "Bağdat Caddesi",
    "courseSlug": "yds-kursu",
    "courseName": "YDS",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "bagdat-caddesi-subesi-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/yds-kursu/bagdat-caddesi-subesi-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "YDS Kursu",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/yds-kursu",
    "groupSize": null,
    "months": 3.0,
    "hours": 100,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Bağdat Caddesi Şubesi Hafta İçi YDS Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba veya Salı - Perşembe Günleri Sabah Programı 10:00 / 14:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: Özel Gruplar - Program Süresi 3 Ay 100 Saat - Gramer Dil Bilgisi - Kelime ve Okuma Etütleri - Sınav Tekniği ve Soru Çözme Stratejileri",
          "Ücretlendirme: Program Ücreti 6.500 TL 6 Taksit"
        ],
        "days": [
          "pzt",
          "car",
          "sal",
          "per"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "14:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 3 Ay 100 Saat",
            "icon": "sure"
          }
        ],
        "study": [
          "Gramer Dil Bilgisi",
          "Kelime ve Okuma Etütleri",
          "Sınav Tekniği ve Soru Çözme Stratejileri"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Bağdat Caddesi Şubesi Hafta Sonu YDS Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 14:00 - Öğlen Programı 14:00 / 18:00",
          "Program Detayları: Özel Gruplar - Program Süresi 3 Ay 100 Saat - Gramer Dil Bilgisi - Kelime ve Okuma Etütleri - Sınav Tekniği ve Soru Çözme Stratejileri",
          "Ücretlendirme: Program Ücreti 45.000 TL 6 Taksit"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "14:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "14:00",
            "end": "18:00"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 3 Ay 100 Saat",
            "icon": "sure"
          }
        ],
        "study": [
          "Gramer Dil Bilgisi",
          "Kelime ve Okuma Etütleri",
          "Sınav Tekniği ve Soru Çözme Stratejileri"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir YDS Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde YDS özel ders alabilirsiniz.",
          "Program Detayları: Gramer, Dil Bilgisi, Sınav Tekniği, Kelime ve Test Çözme Etütleri",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde YDS özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Gramer, Dil Bilgisi, Sınav Tekniği, Kelime ve Test Çözme Etütleri"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "kadikoy",
    "branchLabel": "Kadıköy",
    "courseSlug": "toefl-kursu",
    "courseName": "TOEFL",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "kadikoy-subesi-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/toefl-kursu/kadikoy-subesi-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "TOEFL Kursu",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/toefl-kursu",
    "groupSize": 6,
    "months": 2.5,
    "hours": null,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Kadıköy Şubesi Hafta İçi TOEFL Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2,5 Ay - Toplam 60 Ders - 1 Ders 50 Dakika",
          "TOEFL Kurs Detayları: Sınav Tekniği, Speaking Club, Listening, Writing, Reading Etütleri, Interactive Vocabulary Exercises"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "Toplam 60 Ders",
            "icon": "saat"
          },
          {
            "key": "toplamSaat",
            "text": "1 Ders 50 Dakika",
            "icon": "saat"
          }
        ],
        "study": [
          "Sınav Tekniği",
          "Speaking Club",
          "Listening",
          "Writing",
          "Reading Etütleri",
          "Interactive Vocabulary Exercises"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Kadıköy Şubesi Hafta Sonu TOEFL Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2,5 Ay - Toplam 60 Ders - 1 Ders 50 Dakika",
          "TOEFL Kurs Detayları: Sınav Tekniği, Speaking Club, Listening, Writing, Reading Etütleri, Interactive Vocabulary Exercises"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "Toplam 60 Ders",
            "icon": "saat"
          },
          {
            "key": "toplamSaat",
            "text": "1 Ders 50 Dakika",
            "icon": "saat"
          }
        ],
        "study": [
          "Sınav Tekniği",
          "Speaking Club",
          "Listening",
          "Writing",
          "Reading Etütleri",
          "Interactive Vocabulary Exercises"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "Kadıköy Şubesi TOEFL Özel Ders Programları",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde TOEFL özel ders alabilirsiniz.",
          "Program Detayları: Writing - Reading - Listening - Speaking Etütleri - TOEFL Tekniği - Sınav Formatı Bilgilendirme",
          "Toplam Ders Saati Üzerinden Ücretlendirilir. 1 Ders Saati 50 Dakikadır."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde TOEFL özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Writing",
          "Reading",
          "Listening",
          "Speaking Etütleri",
          "TOEFL Tekniği",
          "Sınav Formatı Bilgilendirme"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "etiler",
    "branchLabel": "Etiler",
    "courseSlug": "toeic-kursu",
    "courseName": "TOEIC",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "besiktas-subesi-toeic-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/toeic-kursu/besiktas-subesi-toeic-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "TOEIC Kursu",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/toeic-kursu",
    "groupSize": 6,
    "months": 2.5,
    "hours": 60,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Etiler Şubesi Hafta İçi TOEIC Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Sabah Programı: 10:00 / 13:00 - Akşam Programı: 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2,5 Ay - 60 Saat",
          "Ücretlendirme: Program Ücreti 4.500 TL 6 Taksit"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Etiler Şubesi Hafta Sonu TOEIC Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Sabah Programı: 10:00 / 13:00 - Öğlen Programı: 13:30 / 16:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat",
          "Ücretlendirme: Program Ücreti 4.500 TL 6 Taksit"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir TOEIC Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde TOEIC özel ders alabilirsiniz.",
          "Program Detayları: Okuma, Anlama, Kelime Bilgisi ve Sınav Tekniği Etütleri",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde TOEIC özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Okuma, Anlama, Kelime Bilgisi ve Sınav Tekniği Etütleri"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "bagdat",
    "branchLabel": "Bağdat Caddesi",
    "courseSlug": "sat-kursu",
    "courseName": "SAT",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "bagdat-caddesi-subesi-sat-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/sat-kursu/bagdat-caddesi-subesi-sat-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "SAT Kursu",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/sat-kursu",
    "groupSize": 6,
    "months": 2.0,
    "hours": 50,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Bağdat Caddesi Şubesi Hafta İçi SAT Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba veya Salı - Perşembe Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2 Ay - 50 Saat",
          "Ücretlendirme: 80.000 TL"
        ],
        "days": [
          "pzt",
          "car",
          "sal",
          "per"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "50 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Bağdat Caddesi Şubesi Hafta Sonu SAT Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2 Ay - 50 Saat",
          "Ücretlendirme: 80.000 TL"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "50 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir SAT Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatler özel ders alabilirsiniz.",
          "Program Detayları: Aritmetik ve Geometri - Okuma, Anlama, Gramer ve Analitik Yazma Etütleri - Sınav Tekniği",
          "Program Ders Saati Ücreti: 3.500 TL'dir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatler özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Aritmetik ve Geometri",
          "Okuma, Anlama, Gramer ve Analitik Yazma Etütleri",
          "Sınav Tekniği"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "etiler",
    "branchLabel": "Beşiktaş",
    "courseSlug": "aile-birlesimi-egitimi",
    "courseName": "Aile Birleşimi",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "besiktas-subesi-aile-birlesimi-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi/besiktas-subesi-aile-birlesimi-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "Aile Birleşimi Eğitimi",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi",
    "groupSize": null,
    "months": 2.0,
    "hours": 48,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Beşiktaş Şubesi Hafta İçi Aile Birleşimi Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2 Ay - 48 Saat",
          "Ücretlendirme: Program Ücreti 2.000 TL / 6 Taksit"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "48 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Beşiktaş Şubesi Hafta Sonu Aile Birleşimi Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:00 / 16:00",
          "Program Detayları: 6-12 Kişilik Özel Gruplar - Program Süresi 2 Ay - 48 Saat",
          "Ücretlendirme: Program Ücreti 2.000 TL / 6 Taksit"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:00",
            "end": "16:00"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6-12 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "48 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir Aile Birleşimi Özel Ders",
        "rawLines": [
          "Program Süresi: 1-3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde özel ders alabilirsiniz.",
          "Program Detayları: Okuma, Yazma, Konuşma ve Dinleme Etütleri, A1 Sınav Tekniği Dersleri",
          "Toplam ders saati üzerinden ücretlendirilir.",
          "Ön Bilgi Formu"
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1-3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Okuma, Yazma, Konuşma ve Dinleme Etütleri, A1 Sınav Tekniği Dersleri"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "bagdat",
    "branchLabel": "Bağdat Caddesi",
    "courseSlug": "fransizca-kursu",
    "courseName": "Fransızca",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "bagdat-caddesi-subesi-fransizca-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/fransizca-kursu/bagdat-caddesi-subesi-fransizca-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "Fransızca Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/fransizca-kursu",
    "groupSize": 6,
    "months": 2.5,
    "hours": 60,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Bağdat Caddesi Şubesi Hafta İçi Fransızca Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba veya Salı - Perşembe Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: Maksimum 6 Kişilik Özel Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat",
          "3 Kur Fransızca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat"
        ],
        "days": [
          "pzt",
          "car",
          "sal",
          "per"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": "3 Kur Fransızca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat",
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Bağdat Caddesi Şubesi Hafta Sonu Fransızca Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: Maksimum 6 Kişilik Özel Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat",
          "3 Kur Fransızca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": "3 Kur Fransızca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat",
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir Fransızca Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde Fransızca özel ders alabilirsiniz.",
          "Program Detayları: Başlangıç Seviyesi A1 / Başlangıç Üzeri A2 / Orta Seviye B1 / Orta Seviye Üzeri B2 / İleri Seviye",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde Fransızca özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Başlangıç Seviyesi A1",
          "Başlangıç Üzeri A2",
          "Orta Seviye B1",
          "Orta Seviye Üzeri B2",
          "İleri Seviye"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "kadikoy",
    "branchLabel": "Kadıköy",
    "courseSlug": "italyanca-kursu",
    "courseName": "İtalyanca",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "kadikoy-subesi-italyanca-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/italyanca-kursu/kadikoy-subesi-italyanca-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "İtalyanca Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/italyanca-kursu",
    "groupSize": 6,
    "months": 2.5,
    "hours": 60,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Kadıköy Şubesi Hafta İçi İtalyanca Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: Maksimum 6 Kişilik Butik Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat",
          "3 Kur İtalyanca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 6 Kişilik Butik Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": "3 Kur İtalyanca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat",
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Kadıköy Şubesi Hafta Sonu İtalyanca Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: Maksimum 6 Kişilik Butik Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat",
          "3 Kur İtalyanca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 6 Kişilik Butik Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": "3 Kur İtalyanca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat",
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir İtalyanca Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde İtalyanca özel ders alabilirsiniz.",
          "Program Detayları: Başlangıç Seviyesi A1 / Başlangıç Üzeri A2 / Orta Seviye B1 / Orta Seviye Üzeri B2 / İleri Düzey",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde İtalyanca özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Başlangıç Seviyesi A1",
          "Başlangıç Üzeri A2",
          "Orta Seviye B1",
          "Orta Seviye Üzeri B2",
          "İleri Düzey"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "kadikoy",
    "branchLabel": "Kadıköy",
    "courseSlug": "cince-kursu",
    "courseName": "Çince",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "kadikoy-subesi-cince-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/cince-kursu/kadikoy-subesi-cince-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "Çince Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/cince-kursu",
    "groupSize": 6,
    "months": 2.5,
    "hours": 60,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Kadıköy Şubesi Hafta İçi Çince Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat",
          "3 Kur Çince Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": "3 Kur Çince Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat",
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Kadıköy Şubesi Hafta Sonu Çince Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat",
          "3 Kur Çince Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": "3 Kur Çince Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat",
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir Çince Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde Çince özel ders alabilirsiniz.",
          "Program Detayları: Başlangıç Seviyesi A1 / Başlangıç Üzeri A2 / Orta Seviye B1 / Orta Seviye Üzeri B2 / İleri Düzey",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde Çince özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Başlangıç Seviyesi A1",
          "Başlangıç Üzeri A2",
          "Orta Seviye B1",
          "Orta Seviye Üzeri B2",
          "İleri Düzey"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "bagdat",
    "branchLabel": "Bağdat Caddesi",
    "courseSlug": "italyanca-kursu",
    "courseName": "İtalyanca",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "bagdat-caddesi-subesi-italyanca-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/italyanca-kursu/bagdat-caddesi-subesi-italyanca-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "İtalyanca Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/italyanca-kursu",
    "groupSize": 6,
    "months": 2.5,
    "hours": 60,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Bağdat Caddesi Şubesi Hafta İçi İtalyanca Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba veya Salı - Perşembe Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: Maksimum 6 Kişilik Özel Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat",
          "3 Kur İtalyanca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat"
        ],
        "days": [
          "pzt",
          "car",
          "sal",
          "per"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": "3 Kur İtalyanca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat",
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Bağdat Caddesi Hafta Sonu İtalyanca Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: Maksimum 6 Kişilik Özel Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat",
          "3 Kur İtalyanca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": "3 Kur İtalyanca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat",
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde İtalyanca özel ders alabilirsiniz.",
          "Program Detayları: Başlangıç Seviyesi A1 / Başlangıç Üzeri A2 / Orta Seviye B1 / Orta Seviye Üzeri B2 / İleri Düzey",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde İtalyanca özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Başlangıç Seviyesi A1",
          "Başlangıç Üzeri A2",
          "Orta Seviye B1",
          "Orta Seviye Üzeri B2",
          "İleri Düzey"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "kadikoy",
    "branchLabel": "Kadıköy",
    "courseSlug": "rusca-kursu",
    "courseName": "Rusça",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "kadikoy-subesi-rusca-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/rusca-kursu/kadikoy-subesi-rusca-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "Rusça Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/rusca-kursu",
    "groupSize": 6,
    "months": 2.5,
    "hours": 60,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Kadıköy Şubesi Hafta İçi Rusça Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: Maksimum 6 Kişilik Butik Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat",
          "3 Kur Rusça Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 6 Kişilik Butik Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": "3 Kur Rusça Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat",
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Kadıköy Şubesi Hafta Sonu Rusça Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: Maksimum 6 Kişilik Butik Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat",
          "3 Kur Rusça Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 6 Kişilik Butik Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": "3 Kur Rusça Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat",
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir Rusça Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde Rusça özel ders alabilirsiniz.",
          "Program Detayları: Başlangıç Seviyesi A1 / Başlangıç Üzeri A2 / Orta Seviye B1 / Orta Seviye Üzeri B2 / İleri Düzey",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde Rusça özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Başlangıç Seviyesi A1",
          "Başlangıç Üzeri A2",
          "Orta Seviye B1",
          "Orta Seviye Üzeri B2",
          "İleri Düzey"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "etiler",
    "branchLabel": "Etiler",
    "courseSlug": "italyanca-kursu",
    "courseName": "İtalyanca",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "besiktas-subesi-italyanca-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/italyanca-kursu/besiktas-subesi-italyanca-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "İtalyanca Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/italyanca-kursu",
    "groupSize": 5,
    "months": null,
    "hours": null,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Etiler Şubesi Hafta İçi İtalyanca Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: Maksimum 5 Kişilik Butik Gruplar - A1 Kur Programı 36+36 Toplam 72 Saat",
          "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 5 Kişilik Butik Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "A1 Kur Programı 36+36 Toplam 72 Saat",
            "icon": "sure"
          }
        ],
        "study": [],
        "note": "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2",
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Etiler Şubesi Hafta Sonu İtalyanca Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: Maksimum 5 Kişilik Butik Gruplar - A1 Kur Programı 36+36 Toplam 72 Saat",
          "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 5 Kişilik Butik Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "A1 Kur Programı 36+36 Toplam 72 Saat",
            "icon": "sure"
          }
        ],
        "study": [],
        "note": "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2",
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir İtalyanca Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde İtalyanca özel ders alabilirsiniz.",
          "Program Detayları: Başlangıç Seviyesi A1 / Başlangıç Üzeri A2 / Orta Seviye B1 / Orta Seviye Üzeri B2 / İleri Düzey",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde İtalyanca özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Başlangıç Seviyesi A1",
          "Başlangıç Üzeri A2",
          "Orta Seviye B1",
          "Orta Seviye Üzeri B2",
          "İleri Düzey"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "atasehir",
    "branchLabel": "Ataşehir",
    "courseSlug": "fransizca-kursu",
    "courseName": "Fransızca",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "atasehir-subesi-fransizca-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/fransizca-kursu/atasehir-subesi-fransizca-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "Fransızca Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/fransizca-kursu",
    "groupSize": 6,
    "months": null,
    "hours": null,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Ataşehir Şubesi Hafta İçi Fransızca Kurs Tarihleri",
        "rawLines": [
          "Başlangıç Tarihi: 27 Haziran 2022",
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - A1 Kur Programı 36+36 Toplam 72 Saat",
          "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "A1 Kur Programı 36+36 Toplam 72 Saat",
            "icon": "sure"
          }
        ],
        "study": [],
        "note": "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2",
        "startDate": "27 Haziran 2022"
      },
      {
        "kind": "haftasonu",
        "heading": "Ataşehir Şubesi Hafta Sonu Fransızca Kurs Tarihleri",
        "rawLines": [
          "Başlangıç Tarihi: 25 Haziran 2022",
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - A1 Kur Programı 36+36 Toplam 72 Saat",
          "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "A1 Kur Programı 36+36 Toplam 72 Saat",
            "icon": "sure"
          }
        ],
        "study": [],
        "note": "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2",
        "startDate": "25 Haziran 2022"
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir Fransızca Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde Fransızca özel ders alabilirsiniz.",
          "Program Detayları: Başlangıç Seviyesi A1 / Başlangıç Üzeri A2 / Orta Seviye B1 / Orta Seviye Üzeri B2 / İleri Düzey",
          "Toplam Ders Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde Fransızca özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Başlangıç Seviyesi A1",
          "Başlangıç Üzeri A2",
          "Orta Seviye B1",
          "Orta Seviye Üzeri B2",
          "İleri Düzey"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "atasehir",
    "branchLabel": "Ataşehir",
    "courseSlug": "sat-kursu",
    "courseName": "SAT",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "atasehir-subesi-sat-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/sat-kursu/atasehir-subesi-sat-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "SAT Kursu",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/sat-kursu",
    "groupSize": 6,
    "months": 2.5,
    "hours": 60,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Ataşehir Şubesi Hafta İçi SAT Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2,5 Ay - 60 Saat",
          "Ücretlendirme: 2.500 TL"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Ataşehir Şubesi Hafta Sonu SAT Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:00 / 16:00",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2,5 Ay - 60 Saat",
          "Ücretlendirme: 2.500 TL"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:00",
            "end": "16:00"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir SAT Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde özel ders alabilirsiniz.",
          "Program Detayları: Aritmetik ve Geometri - Okuma, Anlama, Gramer ve Analitik Yazma Etütleri - Sınav Tekniği",
          "Program Ders Saati Ücreti: 200 TL'dir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Aritmetik ve Geometri",
          "Okuma, Anlama, Gramer ve Analitik Yazma Etütleri",
          "Sınav Tekniği"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "kadikoy",
    "branchLabel": "Kadıköy",
    "courseSlug": "toeic-kursu",
    "courseName": "TOEIC",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "kadikoy-subesi-toeic-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/toeic-kursu/kadikoy-subesi-toeic-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "TOEIC Kursu",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/toeic-kursu",
    "groupSize": 6,
    "months": 2.5,
    "hours": 60,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Kadıköy Şubesi Hafta İçi TOEIC Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Sabah Programı: 10:00 / 13:00 - Akşam Programı: 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2,5 Ay - 60 Saat",
          "Ücretlendirme: Program Ücreti 4.500 TL 6 Taksit"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Kadıköy Şubesi Hafta Sonu TOEIC Eğitim Programı",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Sabah Programı: 10:00 / 13:00 - Öğlen Programı: 13:30 / 16:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2,5 Ay - 60 Saat",
          "Ücretlendirme: Program Ücreti 4.500 TL 6 Taksit"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir TOEIC Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde TOEIC özel ders alabilirsiniz.",
          "Program Detayları: Okuma, Anlama, Kelime Bilgisi ve Sınav Tekniği",
          "Toplam Ders Saati Üzerinden Ücretlendirilir. 1 Ders Saati 50 Dakikadır."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde TOEIC özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Okuma, Anlama, Kelime Bilgisi ve Sınav Tekniği"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "atasehir",
    "branchLabel": "Ataşehir",
    "courseSlug": "gmat-kursu",
    "courseName": "GMAT",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "atasehir-subesi-gmat-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/gmat-kursu/atasehir-subesi-gmat-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "GMAT Kursu",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/gmat-kursu",
    "groupSize": 6,
    "months": 2.0,
    "hours": 48,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Ataşehir Şubesi Hafta İçi GMAT Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2 Ay - 48 Saat",
          "Ücretlendirme: Program Ücreti 2.500 TL"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "48 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Ataşehir Şubesi Hafta Sonu GMAT Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:00 / 16:00",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2 Ay - 48 Saat",
          "Ücretlendirme: Program Ücreti 2.500 TL"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:00",
            "end": "16:00"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "48 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir GMAT Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde özel ders alabilirsiniz.",
          "Program Detayları: Sözel, Sayısal ve Analitik Okuma, Yazma, Soru Çözümleme Etütleri - Sınav Tekniği",
          "Toplam ders saati üzerinden ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Sözel, Sayısal ve Analitik Okuma, Yazma, Soru Çözümleme Etütleri",
          "Sınav Tekniği"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "atasehir",
    "branchLabel": "Ataşehir",
    "courseSlug": "ispanyolca-kursu",
    "courseName": "İspanyolca",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "atasehir-subesi-ispanyolca-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/ispanyolca-kursu/atasehir-subesi-ispanyolca-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "İspanyolca Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/ispanyolca-kursu",
    "groupSize": 6,
    "months": null,
    "hours": null,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Ataşehir Şubesi Hafta İçi İspanyolca Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - A1 Kur Programı 36+36 Toplam 72 Saat",
          "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "A1 Kur Programı 36+36 Toplam 72 Saat",
            "icon": "sure"
          }
        ],
        "study": [],
        "note": "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2",
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Ataşehir Şubesi Hafta Sonu İspanyolca Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - A1 Kur Programı 36+36 Toplam 72 Saat",
          "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "A1 Kur Programı 36+36 Toplam 72 Saat",
            "icon": "sure"
          }
        ],
        "study": [],
        "note": "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2",
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir İspanyolca Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde İspanyolca özel ders alabilirsiniz.",
          "Program Detayları: Başlangıç Seviyesi A1 / Başlangıç Üzeri A2 / Orta Seviye B1 / Orta Seviye Üzeri B2 / İleri Düzey",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde İspanyolca özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Başlangıç Seviyesi A1",
          "Başlangıç Üzeri A2",
          "Orta Seviye B1",
          "Orta Seviye Üzeri B2",
          "İleri Düzey"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "etiler",
    "branchLabel": "Etiler",
    "courseSlug": "almanca-kursu",
    "courseName": "Almanca",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "besiktas-subesi-almanca-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/almanca-kursu/besiktas-subesi-almanca-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "Almanca Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/almanca-kursu",
    "groupSize": 4,
    "months": null,
    "hours": null,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Etiler Şubesi Hafta İçi Almanca Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: Maksimum 4 Kişilik Butik Gruplar - A1 Kur Programı 36+36 Toplam 72 Saat",
          "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 4 Kişilik Butik Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "A1 Kur Programı 36+36 Toplam 72 Saat",
            "icon": "sure"
          }
        ],
        "study": [],
        "note": "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2",
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Etiler Şubesi Hafta Sonu Almanca Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: Maksimum 4 Kişilik Butik Gruplar - A1 Kur Programı 36+36 Toplam 72 Saat",
          "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 4 Kişilik Butik Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "A1 Kur Programı 36+36 Toplam 72 Saat",
            "icon": "sure"
          }
        ],
        "study": [],
        "note": "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2",
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir Almanca Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde Almanca özel ders alabilirsiniz.",
          "Program Detayları: Başlangıç Seviyesi A1 / Başlangıç Üzeri A2 / Orta Seviye B1 / Orta Seviye Üzeri B2 / İleri Düzey",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde Almanca özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Başlangıç Seviyesi A1",
          "Başlangıç Üzeri A2",
          "Orta Seviye B1",
          "Orta Seviye Üzeri B2",
          "İleri Düzey"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "bagdat",
    "branchLabel": "Bağdat Caddesi",
    "courseSlug": "aile-birlesimi-egitimi",
    "courseName": "Aile Birleşimi",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "bagdat-caddesi-subesi-aile-birlesimi-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi/bagdat-caddesi-subesi-aile-birlesimi-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "Aile Birleşimi Eğitimi",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi",
    "groupSize": 6,
    "months": 2.0,
    "hours": 50,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Bağdat Caddesi Şubesi Hafta İçi Aile Birleşimi Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba veya Salı - Perşembe Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2 Ay - 50 Saat",
          "Ücretlendirme: Program Ücreti 45.000 TL / 6 Taksit"
        ],
        "days": [
          "pzt",
          "car",
          "sal",
          "per"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "50 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Bağdat Caddesi Şubesi Hafta Sonu Aile Birleşimi Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:00 / 16:00",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2 Ay - 50 Saat",
          "Ücretlendirme: Program Ücreti 45.000 TL / 6 Taksit"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:00",
            "end": "16:00"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "50 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir Aile Birleşimi Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde özel ders alabilirsiniz.",
          "Program Detayları: Okuma, Yazma, Konuşma ve Dinleme Etütleri, A1 Sınav Tekniği Dersleri",
          "Toplam ders saati üzerinden ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Okuma, Yazma, Konuşma ve Dinleme Etütleri, A1 Sınav Tekniği Dersleri"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "bagdat",
    "branchLabel": "Bağdat Caddesi",
    "courseSlug": "proficiency-kursu",
    "courseName": "PROFICIENCY",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "bagdat-caddesi-proficiency-subesi-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/proficiency-kursu/bagdat-caddesi-proficiency-subesi-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "Proficiency Kursu",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/proficiency-kursu",
    "groupSize": 6,
    "months": 2.0,
    "hours": 50,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Bağdat Caddesi Şubesi Hafta İçi PROFICIENCY Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba veya Salı - Perşembe Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 18:30 / 21:00",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2 Ay - 50 Saat - Yoğun Program - Speaking - Listening & Writing - Reading Etütleri",
          "Ücretlendirme: Program Ücreti 80.000 TL"
        ],
        "days": [
          "pzt",
          "car",
          "sal",
          "per"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "18:30",
            "end": "21:00"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "50 Saat",
            "icon": "saat"
          },
          {
            "key": "yogunluk",
            "text": "Yoğun Program",
            "icon": "takvim"
          }
        ],
        "study": [
          "Speaking",
          "Listening & Writing",
          "Reading Etütleri"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Bağdat Caddesi Şubesi Hafta Sonu PROFICIENCY Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 14:00 / 17:00",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2 Ay - 50 Saat - Yoğun Program - Speaking - Listening & Writing - Reading Etütleri",
          "Ücretlendirme: Program Ücreti 80.000 TL"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "14:00",
            "end": "17:00"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "50 Saat",
            "icon": "saat"
          },
          {
            "key": "yogunluk",
            "text": "Yoğun Program",
            "icon": "takvim"
          }
        ],
        "study": [
          "Speaking",
          "Listening & Writing",
          "Reading Etütleri"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir Hazırlık Atlama Özel Ders",
        "rawLines": [
          "Program Süresi: Kişiye Özel Program Süresi Hazırlanmaktadır",
          "Günler ve Saatler: Eğitim hayatınıza uygun gün ve saatlerde Proficiency özel ders alabilirsiniz.",
          "Program Detayları: Speaking - Listening & Writing - Reading Etütleri - Üniversite'nin Sınav Formatına Yönelik Soru Çözme Teknikleri",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "Eğitim hayatınıza uygun gün ve saatlerde Proficiency özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "Kişiye Özel Program Süresi Hazırlanmaktadır",
            "icon": "sure"
          }
        ],
        "study": [
          "Speaking",
          "Listening & Writing",
          "Reading Etütleri",
          "Üniversite'nin Sınav Formatına Yönelik Soru Çözme Teknikleri"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "etiler",
    "branchLabel": "Etiler",
    "courseSlug": "gmat-kursu",
    "courseName": "GMAT",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "besiktas-subesi-gmat-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/gmat-kursu/besiktas-subesi-gmat-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "GMAT Kursu",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/gmat-kursu",
    "groupSize": 6,
    "months": 2.0,
    "hours": 48,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Etiler Şubesi Hafta İçi GMAT Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2 Ay - 48 Saat",
          "Ücretlendirme: Program Ücreti 2.500 TL"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "48 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Etiler Şubesi Hafta Sonu GMAT Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:00 / 16:00",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2 Ay - 48 Saat",
          "Ücretlendirme: Program Ücreti 2.500 TL"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:00",
            "end": "16:00"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "48 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir GMAT Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde özel ders alabilirsiniz.",
          "Program Detayları: Sözel, Sayısal ve Analitik Okuma, Yazma, Soru Çözümleme Etütleri - Sınav Tekniği",
          "Toplam ders saati üzerinden ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Sözel, Sayısal ve Analitik Okuma, Yazma, Soru Çözümleme Etütleri",
          "Sınav Tekniği"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "bagdat",
    "branchLabel": "Bağdat Caddesi",
    "courseSlug": "cince-kursu",
    "courseName": "Çince",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "bagdat-caddesi-subesi-cince-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/cince-kursu/bagdat-caddesi-subesi-cince-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "Çince Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/cince-kursu",
    "groupSize": 6,
    "months": 2.5,
    "hours": 60,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Bağdat Caddesi Şubesi Hafta İçi Çince Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: Maksimum 6 Kişilik Özel Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat",
          "3 Kur Çince Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": "3 Kur Çince Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat",
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Bağdat Caddesi Hafta Sonu Çince Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:00",
          "Program Detayları: Maksimum 6 Kişilik Özel Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat",
          "3 Kur Çince Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:00"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": "3 Kur Çince Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat",
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir Çince Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde Çince özel ders alabilirsiniz.",
          "Program Detayları: Başlangıç Seviyesi A1 / Başlangıç Üzeri A2 / Orta Seviye B1 / Orta Seviye Üzeri B2 / İleri Düzey",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde Çince özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Başlangıç Seviyesi A1",
          "Başlangıç Üzeri A2",
          "Orta Seviye B1",
          "Orta Seviye Üzeri B2",
          "İleri Düzey"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "kadikoy",
    "branchLabel": "Kadıköy",
    "courseSlug": "aile-birlesimi-egitimi",
    "courseName": "Aile Birleşimi",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "kadikoy-subesi-aile-birlesimi-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi/kadikoy-subesi-aile-birlesimi-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "Aile Birleşimi Eğitimi",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/aile-birlesimi-egitimi",
    "groupSize": 6,
    "months": 2.0,
    "hours": 48,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Kadıköy Şubesi Hafta İçi Aile Birleşimi Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2 Ay - 48 Saat",
          "Ücretlendirme: Program Ücreti 2.000 TL / 6 Taksit"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "48 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Kadıköy Şubesi Hafta Sonu Aile Birleşimi Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:00 / 16:00",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2 Ay - 48 Saat",
          "Ücretlendirme: Program Ücreti 2.000 TL / 6 Taksit"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:00",
            "end": "16:00"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "48 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir Aile Birleşimi Özel Ders",
        "rawLines": [
          "Program Süresi: 1-3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde Aile Birleşimi özel ders alabilirsiniz.",
          "Program Detayları: Okuma, Yazma, Konuşma ve Dinleme Etütleri, A1 Sınav Tekniği Dersleri",
          "Toplam ders saati üzerinden ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde Aile Birleşimi özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1-3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Okuma, Yazma, Konuşma ve Dinleme Etütleri, A1 Sınav Tekniği Dersleri"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "bagdat",
    "branchLabel": "Bağdat Caddesi",
    "courseSlug": "ispanyolca-kursu",
    "courseName": "İspanyolca",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "bagdat-caddesi-subesi-ispanyolca-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/ispanyolca-kursu/bagdat-caddesi-subesi-ispanyolca-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "İspanyolca Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/ispanyolca-kursu",
    "groupSize": 6,
    "months": 2.5,
    "hours": 60,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Bağdat Caddesi Şubesi Hafta İçi İspanyolca Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba veya Salı - Perşembe Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: Maksimum 6 Kişilik Özel Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat",
          "3 Kur İspanyolca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat"
        ],
        "days": [
          "pzt",
          "car",
          "sal",
          "per"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": "3 Kur İspanyolca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat",
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Bağdat Caddesi Şubesi Hafta Sonu İspanyolca Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: Maksimum 6 Kişilik Özel Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat",
          "3 Kur İspanyolca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": "3 Kur İspanyolca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat",
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir İspanyolca Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde İspanyolca özel ders alabilirsiniz.",
          "Program Detayları: Başlangıç Seviyesi A1 / Başlangıç Üzeri A2 / Orta Seviye B1 / Orta Seviye Üzeri B2 / İleri Düzey",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde İspanyolca özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Başlangıç Seviyesi A1",
          "Başlangıç Üzeri A2",
          "Orta Seviye B1",
          "Orta Seviye Üzeri B2",
          "İleri Düzey"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "etiler",
    "branchLabel": "Etiler",
    "courseSlug": "sat-kursu",
    "courseName": "SAT",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "besiktas-subesi-sat-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/sat-kursu/besiktas-subesi-sat-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "SAT Kursu",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/sat-kursu",
    "groupSize": 6,
    "months": 2.5,
    "hours": 60,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Etiler Şubesi Hafta İçi SAT Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2,5 Ay - 60 Saat",
          "Ücretlendirme: 2.500 TL"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Etiler Şubesi Hafta Sonu SAT Eğitim Programı",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:00 / 16:00",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2,5 Ay - 60 Saat",
          "Ücretlendirme: 2.500 TL"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:00",
            "end": "16:00"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir SAT Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde özel ders alabilirsiniz.",
          "Program Detayları: Aritmetik ve Geometri - Okuma, Anlama, Gramer ve Analitik Yazma Etütleri - Sınav Tekniği",
          "Program Ders Saati Ücreti: 200 TL'dir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Aritmetik ve Geometri",
          "Okuma, Anlama, Gramer ve Analitik Yazma Etütleri",
          "Sınav Tekniği"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "kadikoy",
    "branchLabel": "Kadıköy",
    "courseSlug": "gmat-kursu",
    "courseName": "GMAT",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "kadikoy-subesi-gmat-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/gmat-kursu/kadikoy-subesi-gmat-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "GMAT Kursu",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/gmat-kursu",
    "groupSize": 6,
    "months": 2.0,
    "hours": 48,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Kadıköy Şubesi Hafta İçi GMAT Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2 Ay - 48 Saat",
          "Ücretlendirme: Program Ücreti 2.500 TL"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "48 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Kadıköy Şubesi Hafta Sonu GMAT Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:00 / 16:00",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2 Ay - 48 Saat",
          "Ücretlendirme: Program Ücreti 2.500 TL"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:00",
            "end": "16:00"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "48 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir GMAT Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde özel ders alabilirsiniz.",
          "Program Detayları: Sözel, Sayısal ve Analitik Okuma, Yazma, Soru Çözümleme Etütleri - Sınav Tekniği",
          "Toplam ders saati üzerinden ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Sözel, Sayısal ve Analitik Okuma, Yazma, Soru Çözümleme Etütleri",
          "Sınav Tekniği"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "kadikoy",
    "branchLabel": "Kadıköy",
    "courseSlug": "ispanyolca-kursu",
    "courseName": "İspanyolca",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "kadikoy-subesi-ispanyolca-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/ispanyolca-kursu/kadikoy-subesi-ispanyolca-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "İspanyolca Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/ispanyolca-kursu",
    "groupSize": 6,
    "months": 2.5,
    "hours": 60,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Kadıköy Şubesi Hafta İçi İspanyolca Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: Maksimum 6 Kişilik Butik Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat",
          "3 Kur İspanyolca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 6 Kişilik Butik Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": "3 Kur İspanyolca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat",
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Kadıköy Şubesi Hafta Sonu İspanyolca Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: Maksimum 6 Kişilik Butik Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat",
          "3 Kur İspanyolca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 6 Kişilik Butik Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": "3 Kur İspanyolca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat",
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir İspanyolca Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde İspanyolca özel ders alabilirsiniz.",
          "Program Detayları: Başlangıç Seviyesi A1 / Başlangıç Üzeri A2 / Orta Seviye B1 / Orta Seviye Üzeri B2 / İleri Düzey",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde İspanyolca özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Başlangıç Seviyesi A1",
          "Başlangıç Üzeri A2",
          "Orta Seviye B1",
          "Orta Seviye Üzeri B2",
          "İleri Düzey"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "bagdat",
    "branchLabel": "Bağdat Caddesi",
    "courseSlug": "yabancila-icin-turkce-kurs",
    "courseName": "Türkçe",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "bagdat-caddesi-subesi-turkce-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs/bagdat-caddesi-subesi-turkce-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "Türkçe Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/yabancila-icin-turkce-kurs",
    "groupSize": 8,
    "months": 2.0,
    "hours": 48,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Bağdat Caddesi Şubesi Hafta İçi Türkçe Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba veya Salı - Perşembe Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: Maksimum 8 Kişilik Özel Gruplar - 1 Kur Program Süresi 2 Ay - 48 Saat",
          "3 Kur Türkçe Eğitimi Alan Herkese +1 Kur Hediye Toplam 192 Saat"
        ],
        "days": [
          "pzt",
          "car",
          "sal",
          "per"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 8 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "48 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": "3 Kur Türkçe Eğitimi Alan Herkese +1 Kur Hediye Toplam 192 Saat",
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Bağdat Caddesi Hafta Sonu Türkçe Kurs Tarihleri",
        "rawLines": [
          "Başlangıç Tarihi: 10 Eylül 2022",
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: Maksimum 8 Kişilik Özel Gruplar - 1 Kur Program Süresi 2 Ay - 48 Saat",
          "3 Kur Türkçe Eğitimi Alan Herkese +1 Kur Hediye Toplam 192 Saat"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 8 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "48 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": "3 Kur Türkçe Eğitimi Alan Herkese +1 Kur Hediye Toplam 192 Saat",
        "startDate": "10 Eylül 2022"
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir Türkçe Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde Türkçe özel ders alabilirsiniz.",
          "Program Detayları: Başlangıç Seviyesi A1 / Başlangıç Üzeri A2 / Orta Seviye B1 / Orta Seviye Üzeri B2 / İleri Düzey",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde Türkçe özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Başlangıç Seviyesi A1",
          "Başlangıç Üzeri A2",
          "Orta Seviye B1",
          "Orta Seviye Üzeri B2",
          "İleri Düzey"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "atasehir",
    "branchLabel": "Ataşehir",
    "courseSlug": "almanca-kursu",
    "courseName": "Almanca",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "atasehir-subesi-almanca-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/almanca-kursu/atasehir-subesi-almanca-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "Almanca Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/almanca-kursu",
    "groupSize": 6,
    "months": 2.5,
    "hours": 60,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Ataşehir Şubesi Hafta İçi Almanca Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - 1 Kur Program Süresi 2,5 ay 60 Saat",
          "3 Kur Almanca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 ay 60 Saat",
            "icon": "sure"
          }
        ],
        "study": [],
        "note": "3 Kur Almanca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat",
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Ataşehir Şubesi Hafta Sonu Almanca Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar: Sabah Günleri Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - 1 Kur Program Süresi 2,5 ay 60 Saat",
          "3 Kur Almanca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Günleri Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 ay 60 Saat",
            "icon": "sure"
          }
        ],
        "study": [],
        "note": "3 Kur Almanca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat",
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir Almanca Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde Almanca özel ders alabilirsiniz.",
          "Program Detayları: Başlangıç Seviyesi A1 / Başlangıç Üzeri A2 / Orta Seviye B1 / Orta Seviye Üzeri B2 / İleri Düzey",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde Almanca özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Başlangıç Seviyesi A1",
          "Başlangıç Üzeri A2",
          "Orta Seviye B1",
          "Orta Seviye Üzeri B2",
          "İleri Düzey"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "atasehir",
    "branchLabel": "Ataşehir",
    "courseSlug": "ingilizce-konusma-kursu",
    "courseName": "İngilizce Konuşma",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "atasehir-subesi-ingilizce-konusma-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/ingilizce-konusma-kursu/atasehir-subesi-ingilizce-konusma-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "İngilizce Konuşma Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/ingilizce-konusma-kursu",
    "groupSize": 6,
    "months": 2.5,
    "hours": 60,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Ataşehir Şubesi Hafta İçi İngilizce Konuşma Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat - Speaking - Listening",
          "Ücretlendirme: Program Ücreti 3.500 TL"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [
          "Speaking",
          "Listening"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Ataşehir Şubesi Hafta Sonu İngilizce Konuşma Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat - Speaking - Listening",
          "Ücretlendirme: Program Ücreti 3.500 TL"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [
          "Speaking",
          "Listening"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir Speaking Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde Speaking dersleri alabilirsiniz.",
          "Program Detayları: İngilizce Akıcı Konuşma Teknikleri - Pratik İngilizce Diyalogları - Speaking - Conversation Club",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde Speaking dersleri alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "İngilizce Akıcı Konuşma Teknikleri",
          "Pratik İngilizce Diyalogları",
          "Speaking",
          "Conversation Club"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "bagdat",
    "branchLabel": "Bağdat Caddesi",
    "courseSlug": "toefl-kursu",
    "courseName": "TOEFL",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "bagdat-caddesi-subesi-toefl-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/toefl-kursu/bagdat-caddesi-subesi-toefl-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "TOEFL Kursu",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/toefl-kursu",
    "groupSize": 6,
    "months": 2.5,
    "hours": null,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Bağdat Caddesi Şubesi Hafta İçi TOEFL Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba veya Salı - Perşembe Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2,5 Ay - Toplam 60 Ders - 1 Ders 50 Dakika",
          "TOEFL Kurs Detayları: Sınav Tekniği, Speaking Club, Listening, Writing, Reading Etütleri, Interactive Vocabulary Exercises"
        ],
        "days": [
          "pzt",
          "car",
          "sal",
          "per"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "Toplam 60 Ders",
            "icon": "saat"
          },
          {
            "key": "toplamSaat",
            "text": "1 Ders 50 Dakika",
            "icon": "saat"
          }
        ],
        "study": [
          "Sınav Tekniği",
          "Speaking Club",
          "Listening",
          "Writing",
          "Reading Etütleri",
          "Interactive Vocabulary Exercises"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Bağdat Caddesi Şubesi Hafta Sonu TOEFL Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2,5 Ay - Toplam 60 Ders - 1 Ders 50 Dakika",
          "TOEFL Kurs Detayları: Sınav Tekniği, Speaking Club, Listening, Writing, Reading Etütleri, Interactive Vocabulary Exercises"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "Toplam 60 Ders",
            "icon": "saat"
          },
          {
            "key": "toplamSaat",
            "text": "1 Ders 50 Dakika",
            "icon": "saat"
          }
        ],
        "study": [
          "Sınav Tekniği",
          "Speaking Club",
          "Listening",
          "Writing",
          "Reading Etütleri",
          "Interactive Vocabulary Exercises"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "Bağdat Caddesi Şubesi TOEFL Özel Ders Programları",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde birebir TOEFL özel ders alabilirsiniz.",
          "Program Detayları: Writing - Reading - Listening - Speaking Etütleri - TOEFL Tekniği - Sınav Formatı Bilgilendirme",
          "Toplam Ders Saati Üzerinden Ücretlendirilir. 1 Ders Saati 50 Dakikadır."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde birebir TOEFL özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Writing",
          "Reading",
          "Listening",
          "Speaking Etütleri",
          "TOEFL Tekniği",
          "Sınav Formatı Bilgilendirme"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "atasehir",
    "branchLabel": "Ataşehir",
    "courseSlug": "gre-kursu",
    "courseName": "GRE",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "atasehir-subesi-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/gre-kursu/atasehir-subesi-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "GRE Kursu",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/gre-kursu",
    "groupSize": 6,
    "months": 2.0,
    "hours": 48,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Ataşehir Şubesi Hafta İçi GRE Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2 Ay - 48 Saat",
          "Ücretlendirme: Program Ücreti 3.500 TL"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "48 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Ataşehir Şubesi Hafta Sonu GRE Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:00 / 16:00",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2 Ay - 48 Saat",
          "Ücretlendirme: Program Ücreti 3.500 TL"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:00",
            "end": "16:00"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "48 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir GRE Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde özel ders alabilirsiniz.",
          "Program Detayları: Sözel, Sayısal, Analitik Kompozisyon Yazma - Analiz ve Sonuç Çıkarma, Kelime, Cümle Anlam Kavrama Etütleri - Sınav Tekniği",
          "Toplam ders saati üzerinden ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Sözel, Sayısal, Analitik Kompozisyon Yazma",
          "Analiz ve Sonuç Çıkarma, Kelime, Cümle Anlam Kavrama Etütleri",
          "Sınav Tekniği"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "etiler",
    "branchLabel": "Etiler",
    "courseSlug": "rusca-kursu",
    "courseName": "Rusça",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "besiktas-subesi-rusca-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/rusca-kursu/besiktas-subesi-rusca-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "Rusça Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/rusca-kursu",
    "groupSize": 4,
    "months": null,
    "hours": null,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Etiler Şubesi Hafta İçi Rusça Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: Maksimum 4 Kişilik Butik Gruplar - A1 Kur Programı 36+36 Toplam 72 Saat",
          "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 4 Kişilik Butik Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "A1 Kur Programı 36+36 Toplam 72 Saat",
            "icon": "sure"
          }
        ],
        "study": [],
        "note": "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2",
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Etiler Şubesi Hafta Sonu Rusça Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: Maksimum 4 Kişilik Butik Gruplar - A1 Kur Programı 36+36 Toplam 72 Saat",
          "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 4 Kişilik Butik Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "A1 Kur Programı 36+36 Toplam 72 Saat",
            "icon": "sure"
          }
        ],
        "study": [],
        "note": "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2",
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir Rusça Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde Rusça özel ders alabilirsiniz.",
          "Program Detayları: Başlangıç Seviyesi A1 / Başlangıç Üzeri A2 / Orta Seviye B1 / Orta Seviye Üzeri B2 / İleri Düzey",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde Rusça özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Başlangıç Seviyesi A1",
          "Başlangıç Üzeri A2",
          "Orta Seviye B1",
          "Orta Seviye Üzeri B2",
          "İleri Düzey"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "atasehir",
    "branchLabel": "Ataşehir",
    "courseSlug": "ingilizce-kursu",
    "courseName": "İngilizce",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "atasehir-subesi-ingilizce-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/ingilizce-kursu/atasehir-subesi-ingilizce-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "İngilizce Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/ingilizce-kursu",
    "groupSize": 6,
    "months": null,
    "hours": null,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Ataşehir Şubesi Hafta İçi İngilizce Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - A1 Kur Programı 36+36 Toplam 72 Saat",
          "6 Kurluk CEFR İngilizce Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "A1 Kur Programı 36+36 Toplam 72 Saat",
            "icon": "sure"
          }
        ],
        "study": [],
        "note": "6 Kurluk CEFR İngilizce Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2",
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Ataşehir Şubesi Hafta Sonu İngilizce Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - A1 Kur Programı 36+36 Toplam 72 Saat",
          "6 Kurluk CEFR İngilizce Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "A1 Kur Programı 36+36 Toplam 72 Saat",
            "icon": "sure"
          }
        ],
        "study": [],
        "note": "6 Kurluk CEFR İngilizce Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2",
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir İngilizce Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde İngilizce özel ders alabilirsiniz.",
          "Program Detayları: Başlangıç Seviyesi A1 / Başlangıç Üzeri A2 / Orta Seviye B1 / Orta Seviye Üzeri B2 / İleri Düzey Advanced",
          "Toplam Ders Saati Üzerinden Ücretlendirilir. 1 Ders Süresi 50 Dakikadır."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde İngilizce özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Başlangıç Seviyesi A1",
          "Başlangıç Üzeri A2",
          "Orta Seviye B1",
          "Orta Seviye Üzeri B2",
          "İleri Düzey Advanced"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "kadikoy",
    "branchLabel": "Kadıköy",
    "courseSlug": "ingilizce-kursu",
    "courseName": "İngilizce",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "kadikoy-subesi-ingilizce-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/ingilizce-kursu/kadikoy-subesi-ingilizce-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "İngilizce Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/ingilizce-kursu",
    "groupSize": 6,
    "months": null,
    "hours": null,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Kadıköy Şubesi Hafta İçi İngilizce Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Salı - Perşembe Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: Maksimum 6 Kişilik Butik Gruplar - A1 Kur Programı 36+36 Toplam 72 Saat",
          "6 Kurluk CEFR İngilizce Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2"
        ],
        "days": [
          "sal",
          "per"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 6 Kişilik Butik Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "A1 Kur Programı 36+36 Toplam 72 Saat",
            "icon": "sure"
          }
        ],
        "study": [],
        "note": "6 Kurluk CEFR İngilizce Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2",
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Kadıköy Şubesi Hafta Sonu İngilizce Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: Maksimum 6 Kişilik Butik Gruplar - A1 Kur Programı 36+36 Toplam 72 Saat",
          "6 Kurluk CEFR İngilizce Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 6 Kişilik Butik Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "A1 Kur Programı 36+36 Toplam 72 Saat",
            "icon": "sure"
          }
        ],
        "study": [],
        "note": "6 Kurluk CEFR İngilizce Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2",
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir İngilizce",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde İngilizce özel ders alabilirsiniz.",
          "Program Detayları: Başlangıç Seviyesi A1 / Başlangıç Üzeri A2 / Orta Seviye B1 / Orta Seviye Üzeri B2 / İleri Düzey C1 / Advanced Düzey C2",
          "Toplam Ders Saati Üzerinden Ücretlendirilir. 1 Ders Saati 50 Dakikadır."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde İngilizce özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Başlangıç Seviyesi A1",
          "Başlangıç Üzeri A2",
          "Orta Seviye B1",
          "Orta Seviye Üzeri B2",
          "İleri Düzey C1",
          "Advanced Düzey C2"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "atasehir",
    "branchLabel": "Ataşehir",
    "courseSlug": "toeic-kursu",
    "courseName": "TOEIC",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "atasehir-subesi-toeic-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/toeic-kursu/atasehir-subesi-toeic-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "TOEIC Kursu",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/toeic-kursu",
    "groupSize": 6,
    "months": 2.5,
    "hours": 60,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Ataşehir Şubesi Hafta İçi TOEIC Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Sabah Programı: 10:00 / 13:00 - Akşam Programı: 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2,5 Ay - 60 Saat",
          "Ücretlendirme: Program Ücreti 4.500 TL 6 Taksit"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Ataşehir Şubesi Hafta Sonu TOEIC Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Sabah Programı: 10:00 / 13:00 - Öğlen Programı: 13:30 / 16:00",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2,5 Ay - 60 Saat",
          "Ücretlendirme: Program Ücreti 4.500 TL 6 Taksit"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:00"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir TOEIC Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde TOEIC özel ders alabilirsiniz.",
          "Program Detayları: Okuma, Anlama, Kelime Bilgisi ve Sınav Tekniği Etütleri",
          "Toplam Ders Saati Üzerinden Ücretlendirilir. 1 Ders Saati 50 Dakikadır."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde TOEIC özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Okuma, Anlama, Kelime Bilgisi ve Sınav Tekniği Etütleri"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "bagdat",
    "branchLabel": "Bağdat Caddesi",
    "courseSlug": "ielts-kursu",
    "courseName": "IELTS",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "bagdat-caddesi-subesi-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/ielts-kursu/bagdat-caddesi-subesi-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "IELTS Kursu",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/ielts-kursu",
    "groupSize": 6,
    "months": 2.5,
    "hours": null,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Bağdat Caddesi Şubesi Hafta İçi IELTS Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba veya Salı - Perşembe Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2,5 Ay - Toplam 60 Ders - 1 Ders 50 Dakika",
          "IELTS Kurs Detayları: Sınav Tekniği, Speaking Club, Listening, Writing, Reading Etütleri, Interactive Vocabulary Exercises"
        ],
        "days": [
          "pzt",
          "car",
          "sal",
          "per"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "Toplam 60 Ders",
            "icon": "saat"
          },
          {
            "key": "toplamSaat",
            "text": "1 Ders 50 Dakika",
            "icon": "saat"
          }
        ],
        "study": [
          "Sınav Tekniği",
          "Speaking Club",
          "Listening",
          "Writing",
          "Reading Etütleri",
          "Interactive Vocabulary Exercises"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Bağdat Caddesi Şubesi Hafta Sonu IELTS Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2,5 Ay - Toplam 60 Ders - 1 Ders 50 Dakika",
          "IELTS Kurs Detayları: Sınav Tekniği, Speaking Club, Listening, Writing, Reading Etütleri, Interactive Vocabulary Exercises"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "Toplam 60 Ders",
            "icon": "saat"
          },
          {
            "key": "toplamSaat",
            "text": "1 Ders 50 Dakika",
            "icon": "saat"
          }
        ],
        "study": [
          "Sınav Tekniği",
          "Speaking Club",
          "Listening",
          "Writing",
          "Reading Etütleri",
          "Interactive Vocabulary Exercises"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir IELTS Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde IELTS özel ders alabilirsiniz.",
          "Program Detayları: Reading, Writing, Listening, Speaking Etütleri, Sınav Tekniği",
          "Toplam Ders Saati Üzerinden Ücretlendirilir. 1 Ders Saati 50 Dakikadır."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde IELTS özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Reading, Writing, Listening, Speaking Etütleri, Sınav Tekniği"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "etiler",
    "branchLabel": "Etiler",
    "courseSlug": "yds-kursu",
    "courseName": "YDS",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "besiktas-subesi-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/yds-kursu/besiktas-subesi-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "YDS Kursu",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/yds-kursu",
    "groupSize": null,
    "months": 3.0,
    "hours": 100,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Etiler Şubesi Hafta İçi YDS Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 14:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: Özel Gruplar - Program Süresi 3 Ay 100 Saat - Gramer Dil Bilgisi - Kelime ve Okuma Etütleri - Sınav Tekniği ve Soru Çözme Stratejileri",
          "Ücretlendirme: Program Ücreti 2.000 TL 6 Taksit"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "14:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 3 Ay 100 Saat",
            "icon": "sure"
          }
        ],
        "study": [
          "Gramer Dil Bilgisi",
          "Kelime ve Okuma Etütleri",
          "Sınav Tekniği ve Soru Çözme Stratejileri"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Etiler Şubesi Hafta Sonu YDS Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 14:00 - Öğlen Programı 14:00 / 18:00",
          "Program Detayları: Özel Gruplar - Program Süresi 3 Ay 100 Saat - Gramer Dil Bilgisi - Kelime ve Okuma Etütleri - Sınav Tekniği ve Soru Çözme Stratejileri",
          "Ücretlendirme: Program Ücreti 2.000 TL 6 Taksit"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "14:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "14:00",
            "end": "18:00"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 3 Ay 100 Saat",
            "icon": "sure"
          }
        ],
        "study": [
          "Gramer Dil Bilgisi",
          "Kelime ve Okuma Etütleri",
          "Sınav Tekniği ve Soru Çözme Stratejileri"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir YDS Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde YDS özel ders alabilirsiniz.",
          "Program Detayları: Gramer, Dil Bilgisi, Sınav Tekniği, Kelime ve Test Çözme Etütleri",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde YDS özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Gramer, Dil Bilgisi, Sınav Tekniği, Kelime ve Test Çözme Etütleri"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "kadikoy",
    "branchLabel": "Kadıköy",
    "courseSlug": "fransizca-kursu",
    "courseName": "Fransızca",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "kadikoy-subesi-fransizca-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/fransizca-kursu/kadikoy-subesi-fransizca-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "Fransızca Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/fransizca-kursu",
    "groupSize": 6,
    "months": 2.5,
    "hours": 60,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Kadıköy Şubesi Hafta İçi Fransızca Kurs Tarihleri",
        "rawLines": [
          "Başlangıç Tarihi: 27 Haziran 2022",
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: Maksimum 6 Kişilik Butik Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat",
          "3 Kur Fransızca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 6 Kişilik Butik Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": "3 Kur Fransızca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat",
        "startDate": "27 Haziran 2022"
      },
      {
        "kind": "haftasonu",
        "heading": "Kadıköy Şubesi Hafta Sonu Fransızca Kurs Tarihleri",
        "rawLines": [
          "Başlangıç Tarihi: 25 Haziran 2022",
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: Maksimum 6 Kişilik Butik Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat",
          "3 Kur Fransızca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 6 Kişilik Butik Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": "3 Kur Fransızca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat",
        "startDate": "25 Haziran 2022"
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir Fransızca Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde Fransızca özel ders alabilirsiniz.",
          "Program Detayları: Başlangıç Seviyesi A1 / Başlangıç Üzeri A2 / Orta Seviye B1 / Orta Seviye Üzeri B2 / İleri Düzey",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde Fransızca özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Başlangıç Seviyesi A1",
          "Başlangıç Üzeri A2",
          "Orta Seviye B1",
          "Orta Seviye Üzeri B2",
          "İleri Düzey"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "kadikoy",
    "branchLabel": "Kadıköy",
    "courseSlug": "almanca-kursu",
    "courseName": "Almanca",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "kadikoy-subesi-almanca-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/almanca-kursu/kadikoy-subesi-almanca-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "Almanca Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/almanca-kursu",
    "groupSize": 6,
    "months": 2.5,
    "hours": 60,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Kadıköy Şubesi Hafta İçi Almanca Kurs Tariheri",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: Maksimum 6 Kişilik Butik Gruplar - 1 Kur Program Süresi 2,5 Ay 60 Saat",
          "3 Kur Almanca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 6 Kişilik Butik Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay 60 Saat",
            "icon": "sure"
          }
        ],
        "study": [],
        "note": "3 Kur Almanca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat",
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Kadıköy Şubesi Hafta Sonu Almanca Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: Maksimum 6 Kişilik Butik Gruplar - 1 Kur Program Süresi 2,5 Ay 60 Saat",
          "3 Kur Almanca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 6 Kişilik Butik Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay 60 Saat",
            "icon": "sure"
          }
        ],
        "study": [],
        "note": "3 Kur Almanca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat",
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir Almanca Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde Almanca özel ders alabilirsiniz.",
          "Program Detayları: Başlangıç Seviyesi A1 / Başlangıç Üzeri A2 / Orta Seviye B1 / Orta Seviye Üzeri B2 / İleri Düzey",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde Almanca özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Başlangıç Seviyesi A1",
          "Başlangıç Üzeri A2",
          "Orta Seviye B1",
          "Orta Seviye Üzeri B2",
          "İleri Düzey"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "etiler",
    "branchLabel": "Etiler",
    "courseSlug": "ielts-kursu",
    "courseName": "IELTS",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "besiktas-subesi-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/ielts-kursu/besiktas-subesi-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "IELTS Kursu",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/ielts-kursu",
    "groupSize": 6,
    "months": 2.5,
    "hours": null,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Etiler Şubesi Hafta İçi IELTS Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2,5 Ay - Toplam 60 Ders - 1 Ders 50 Dakika",
          "IELTS Kurs Detayları: Sınav Tekniği, Speaking Club, Listening, Writing, Reading Etütleri, Interactive Vocabulary Exercises"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "Toplam 60 Ders",
            "icon": "saat"
          },
          {
            "key": "toplamSaat",
            "text": "1 Ders 50 Dakika",
            "icon": "saat"
          }
        ],
        "study": [
          "Sınav Tekniği",
          "Speaking Club",
          "Listening",
          "Writing",
          "Reading Etütleri",
          "Interactive Vocabulary Exercises"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Etiler Şubesi Hafta Sonu IELTS Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2,5 Ay - Toplam 60 Ders - 1 Ders 50 Dakika",
          "IELTS Kurs Detayları: Sınav Tekniği, Speaking Club, Listening, Writing, Reading Etütleri, Interactive Vocabulary Exercises"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "Toplam 60 Ders",
            "icon": "saat"
          },
          {
            "key": "toplamSaat",
            "text": "1 Ders 50 Dakika",
            "icon": "saat"
          }
        ],
        "study": [
          "Sınav Tekniği",
          "Speaking Club",
          "Listening",
          "Writing",
          "Reading Etütleri",
          "Interactive Vocabulary Exercises"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir IELTS Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde IELTS özel ders alabilirsiniz.",
          "Program Detayları: Reading, Writing, Listening, Speaking Etütleri, Sınav Tekniği",
          "Toplam Ders Saati Üzerinden Ücretlendirilir. 1 Ders Saati 50 Dakikadır."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde IELTS özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Reading, Writing, Listening, Speaking Etütleri, Sınav Tekniği"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "etiler",
    "branchLabel": "Etiler",
    "courseSlug": "toefl-kursu",
    "courseName": "TOEFL",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "besiktas-subesi-toefl-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/toefl-kursu/besiktas-subesi-toefl-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "TOEFL Kursu",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/toefl-kursu",
    "groupSize": 6,
    "months": 2.5,
    "hours": null,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Etiler Şubesi Hafta İçi TOEFL Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2,5 Ay - Toplam 60 Ders - 1 Ders 50 Dakika",
          "TOEFL Kurs Detayları: Sınav Tekniği, Speaking Club, Listening, Writing, Reading Etütleri, Interactive Vocabulary Exercises"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "Toplam 60 Ders",
            "icon": "saat"
          },
          {
            "key": "toplamSaat",
            "text": "1 Ders 50 Dakika",
            "icon": "saat"
          }
        ],
        "study": [
          "Sınav Tekniği",
          "Speaking Club",
          "Listening",
          "Writing",
          "Reading Etütleri",
          "Interactive Vocabulary Exercises"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Etiler Şubesi Hafta Sonu TOEFL Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2,5 Ay - Toplam 60 Ders - 1 Ders 50 Dakika",
          "TOEFL Kurs Detayları: Sınav Tekniği, Speaking Club, Listening, Writing, Readin Etütleri, Interactive Vocabulary Exercises"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "Toplam 60 Ders",
            "icon": "saat"
          },
          {
            "key": "toplamSaat",
            "text": "1 Ders 50 Dakika",
            "icon": "saat"
          }
        ],
        "study": [
          "Sınav Tekniği",
          "Speaking Club",
          "Listening",
          "Writing",
          "Readin Etütleri",
          "Interactive Vocabulary Exercises"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "Etiler Şubesi TOEFL Özel Ders Programları",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde TOEFL özel ders alabilirsiniz.",
          "Program Detayları: Writing - Reading - Listening - Speaking Etütleri - TOEFL Tekniği - Sınav Formatı Bilgilendirme",
          "Toplam Ders Saati Üzerinden Ücretlendirilir. 1 Ders Saati 50 Dakikadır."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde TOEFL özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Writing",
          "Reading",
          "Listening",
          "Speaking Etütleri",
          "TOEFL Tekniği",
          "Sınav Formatı Bilgilendirme"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "etiler",
    "branchLabel": "Etiler",
    "courseSlug": "ingilizce-konusma-kursu",
    "courseName": "İngilizce Konuşma",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "besiktas-subesi-ingilizce-konusma-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/ingilizce-konusma-kursu/besiktas-subesi-ingilizce-konusma-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "İngilizce Konuşma Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/ingilizce-konusma-kursu",
    "groupSize": 5,
    "months": 2.5,
    "hours": 60,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Etiler Şubesi Hafta İçi İngilizce Konuşma Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: Maksimum 5 Kişilik Özel Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat - Speaking",
          "Ücretlendirme: Program Ücreti 3.500 TL"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 5 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [
          "Speaking"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Etiler Şubesi Hafta Sonu İngilizce Konuşma Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: Maksimum 5 Kişilik Özel Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat - Speaking",
          "Ücretlendirme: Program Ücreti 3.500 TL"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 5 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [
          "Speaking"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir Speaking Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde Speaking özel ders alabilirsiniz.",
          "Program Detayları: İngilizce Akıcı Konuşma Teknikleri - Pratik İngilizce Diyalogları - Speaking - Conversation Club",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde Speaking özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "İngilizce Akıcı Konuşma Teknikleri",
          "Pratik İngilizce Diyalogları",
          "Speaking",
          "Conversation Club"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "kadikoy",
    "branchLabel": "Kadıköy",
    "courseSlug": "proficiency-kursu",
    "courseName": "PROFICIENCY",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "kadikoy-subesi-proficiency-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/proficiency-kursu/kadikoy-subesi-proficiency-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "Proficiency Kursu",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/proficiency-kursu",
    "groupSize": 6,
    "months": 2.0,
    "hours": 48,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Kadıköy Şubesi Hafta İçi PROFICIENCY Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Salı - Perşembe Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 17:00 / 19:00",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2 Ay - 48 Saat - Yoğun Program Speaking - Listening & Writing - Reading Etütleri",
          "Ücretlendirme: Program Ücreti 3.500 TL"
        ],
        "days": [
          "pzt",
          "sal",
          "per"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "17:00",
            "end": "19:00"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "48 Saat",
            "icon": "saat"
          },
          {
            "key": "yogunluk",
            "text": "Yoğun Program",
            "icon": "takvim"
          }
        ],
        "study": [
          "Speaking",
          "Listening & Writing",
          "Reading Etütleri"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Kadıköy Şubesi Hafta Sonu PROFICIENCY Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 14:00 / 18:00",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2 Ay - 48 Saat - Yoğun Program - Speaking - Listening & Writing - Reading Etütleri",
          "Ücretlendirme: Program Ücreti 3.500 TL"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "14:00",
            "end": "18:00"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "48 Saat",
            "icon": "saat"
          },
          {
            "key": "yogunluk",
            "text": "Yoğun Program",
            "icon": "takvim"
          }
        ],
        "study": [
          "Speaking",
          "Listening & Writing",
          "Reading Etütleri"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir PROFICIENCY Özel Ders",
        "rawLines": [
          "Program Süresi: Kişiye Özel Program Süresi Hazırlanmaktadır",
          "Günler ve Saatler: Eğitim hayatınıza uygun gün ve saatlerde Proficiency özel ders alabilirsiniz.",
          "Program Detayları: Speaking - Listening & Writing - Reading Etütleri - Üniversite'nin Sınav Formatına Yönelik Soru Çözme Teknikleri",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "Eğitim hayatınıza uygun gün ve saatlerde Proficiency özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "Kişiye Özel Program Süresi Hazırlanmaktadır",
            "icon": "sure"
          }
        ],
        "study": [
          "Speaking",
          "Listening & Writing",
          "Reading Etütleri",
          "Üniversite'nin Sınav Formatına Yönelik Soru Çözme Teknikleri"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "etiler",
    "branchLabel": "Etiler",
    "courseSlug": "proficiency-kursu",
    "courseName": "PROFICIENCY",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "besiktas-subesi-proficiency-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/proficiency-kursu/besiktas-subesi-proficiency-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "Proficiency Kursu",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/proficiency-kursu",
    "groupSize": 6,
    "months": 2.0,
    "hours": 48,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Etiler Şubesi Hafta İçi PROFICIENCY Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Salı - Perşembe Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 17:00 / 19:00",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2 Ay - 48 Saat - Yoğun Program - Speaking - Listening & Writing - Reading Etütleri",
          "Ücretlendirme: Program Ücreti 3.500 TL"
        ],
        "days": [
          "pzt",
          "sal",
          "per"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "17:00",
            "end": "19:00"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "48 Saat",
            "icon": "saat"
          },
          {
            "key": "yogunluk",
            "text": "Yoğun Program",
            "icon": "takvim"
          }
        ],
        "study": [
          "Speaking",
          "Listening & Writing",
          "Reading Etütleri"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Etiler Şubesi Hafta Sonu PROFICIENCY Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 14:00 / 18:00",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2 Ay - 48 Saat - Yoğun Program - Speaking - Listening & Writing - Reading Etütleri",
          "Ücretlendirme: Program Ücreti 3.500 TL"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "14:00",
            "end": "18:00"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "48 Saat",
            "icon": "saat"
          },
          {
            "key": "yogunluk",
            "text": "Yoğun Program",
            "icon": "takvim"
          }
        ],
        "study": [
          "Speaking",
          "Listening & Writing",
          "Reading Etütleri"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir PROFICIENCY Özel Ders",
        "rawLines": [
          "Program Süresi: Kişiye Özel Program Süresi Hazırlanmaktadır",
          "Günler ve Saatler: Eğitim hayatınıza uygun gün ve saatlerde Proficiency özel ders alabilirsiniz.",
          "Program Detayları: Speaking - Listening & Writing - Reading Etütleri - Üniversite'nin Sınav Formatına Yönelik Soru Çözme Teknikleri",
          "Toplam ders saati üzerinden ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "Eğitim hayatınıza uygun gün ve saatlerde Proficiency özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "Kişiye Özel Program Süresi Hazırlanmaktadır",
            "icon": "sure"
          }
        ],
        "study": [
          "Speaking",
          "Listening & Writing",
          "Reading Etütleri",
          "Üniversite'nin Sınav Formatına Yönelik Soru Çözme Teknikleri"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "bagdat",
    "branchLabel": "Bağdat Caddesi",
    "courseSlug": "almanca-kursu",
    "courseName": "Almanca",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "bagdat-caddesi-subesi-almanca-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/almanca-kursu/bagdat-caddesi-subesi-almanca-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "Almanca Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/almanca-kursu",
    "groupSize": 6,
    "months": 2.5,
    "hours": 60,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Bağdat Caddesi Şubesi Hafta İçi Almanca Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba veya Salı - Perşembe Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: Maksimum 6 Kişilik Özel Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat",
          "3 Kur Almanca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat"
        ],
        "days": [
          "pzt",
          "car",
          "sal",
          "per"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": "3 Kur Almanca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat",
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Bağdat Caddesi Şubesi Hafta Sonu Almanca Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: Maksimum 6 Kişilik Özel Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat",
          "3 Kur Almanca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": "3 Kur Almanca Eğitimi Alan Herkese +1 Kur Hediye Toplam 240 Saat",
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir Almanca Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde Almanca özel ders alabilirsiniz.",
          "Program Detayları: Başlangıç Seviyesi A1 / Başlangıç Üzeri A2 / Orta Seviye B1 / Orta Seviye Üzeri B2 / İleri Düzey",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde Almanca özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Başlangıç Seviyesi A1",
          "Başlangıç Üzeri A2",
          "Orta Seviye B1",
          "Orta Seviye Üzeri B2",
          "İleri Düzey"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "atasehir",
    "branchLabel": "Ataşehir",
    "courseSlug": "ielts-kursu",
    "courseName": "IELTS",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "atasehir-subesi-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/ielts-kursu/atasehir-subesi-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "IELTS Kursu",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/ielts-kursu",
    "groupSize": 6,
    "months": 2.5,
    "hours": null,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Ataşehir Şubesi Hafta İçi IELTS Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2,5 Ay - Toplam 60 Ders - 1 Ders 50 Dakika",
          "IELTS Kurs Detayları: Sınav Tekniği, Speaking Club, Listening, Writing, Reading Etütleri, Interactive Vocabulary Exercises"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "Toplam 60 Ders",
            "icon": "saat"
          },
          {
            "key": "toplamSaat",
            "text": "1 Ders 50 Dakika",
            "icon": "saat"
          }
        ],
        "study": [
          "Sınav Tekniği",
          "Speaking Club",
          "Listening",
          "Writing",
          "Reading Etütleri",
          "Interactive Vocabulary Exercises"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Ataşehir Şubesi Hafta Sonu IELTS Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2,5 Ay - Toplam 60 Ders - 1 Ders 50 Dakika",
          "IELTS Kurs Detayları: Sınav Tekniği, Speaking Club, Listening, Writing, Reading Etütleri, Interactive Vocabulary Exercises"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "Toplam 60 Ders",
            "icon": "saat"
          },
          {
            "key": "toplamSaat",
            "text": "1 Ders 50 Dakika",
            "icon": "saat"
          }
        ],
        "study": [
          "Sınav Tekniği",
          "Speaking Club",
          "Listening",
          "Writing",
          "Reading Etütleri",
          "Interactive Vocabulary Exercises"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir IELTS Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde IELTS özel ders alabilirsiniz.",
          "Program Detayları: Reading, Writing, Listening, Speaking, IELTS Sınav Tekniği",
          "Toplam Ders Saati Üzerinden Ücretlendirilir. 1 Ders Saati 50 Dakikadır."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde IELTS özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Reading, Writing, Listening, Speaking, IELTS Sınav Tekniği"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "kadikoy",
    "branchLabel": "Kadıköy",
    "courseSlug": "sat-kursu",
    "courseName": "SAT",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "kadikoy-subesi-sat-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/sat-kursu/kadikoy-subesi-sat-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "SAT Kursu",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/sat-kursu",
    "groupSize": 6,
    "months": 2.5,
    "hours": 60,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Kadıköy Şubesi Hafta İçi SAT Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2,5 Ay - 60 Saat",
          "Ücretlendirme: 3.500 TL"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Kadıköy Şubesi Hafta Sonu SAT Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:00 / 16:00",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2,5 Ay - 60 Saat",
          "Ücretlendirme: 3.500 TL"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:00",
            "end": "16:00"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir SAT Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde özel ders alabilirsiniz.",
          "Program Detayları: Aritmetik ve Geometri - Okuma, Anlama, Gramer ve Analitik Yazma Etütleri - Sınav Tekniği",
          "Program Ders Saati Ücreti: 200 TL'dir",
          "."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Aritmetik ve Geometri",
          "Okuma, Anlama, Gramer ve Analitik Yazma Etütleri",
          "Sınav Tekniği"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "bagdat",
    "branchLabel": "Bağdat Caddesi",
    "courseSlug": "gre-kursu",
    "courseName": "GRE",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "bagdat-caddesi-subesi-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/gre-kursu/bagdat-caddesi-subesi-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "GRE Kursu",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/gre-kursu",
    "groupSize": 6,
    "months": 2.0,
    "hours": 50,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Bağdat Caddesi Şubesi Hafta İçi GRE Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba veya Salı - Perşembe Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2 Ay - 50 Saat",
          "Ücretlendirme: Program Ücreti 80.000 TL"
        ],
        "days": [
          "pzt",
          "car",
          "sal",
          "per"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "50 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Bağdat Caddesi Şubesi Hafta Sonu GRE Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2 Ay - 50 Saat",
          "Ücretlendirme: Program Ücreti 80.000 TL"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "50 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir GRE Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde özel ders alabilirsiniz.",
          "Program Detayları: Sözel, Sayısal, Analitik Kompozisyon Yazma - Analiz ve Sonuç Çıkarma, Kelime, Cümle Anlam Kavrama Etütleri - Sınav Tekniği",
          "Toplam ders saati üzerinden ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Sözel, Sayısal, Analitik Kompozisyon Yazma",
          "Analiz ve Sonuç Çıkarma, Kelime, Cümle Anlam Kavrama Etütleri",
          "Sınav Tekniği"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "atasehir",
    "branchLabel": "Ataşehir",
    "courseSlug": "proficiency-kursu",
    "courseName": "PROFICIENCY",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "atasehir-subesi-proficiency-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/proficiency-kursu/atasehir-subesi-proficiency-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "Proficiency Kursu",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/proficiency-kursu",
    "groupSize": 6,
    "months": 1.5,
    "hours": 48,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Ataşehir Şubesi Hafta İçi PROFICIENCY Eğitim Programı",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Salı - Perşembe Günleri: Sabah Programı: 10:00 / 13:00 - Akşam Programı: 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 1,5 Ay - 48 Saat - Yoğun Program - Speaking - Listening & Writing - Reading Etütleri",
          "Ücretlendirme: Program Ücreti 3.500 TL"
        ],
        "days": [
          "pzt",
          "sal",
          "per"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 1,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "48 Saat",
            "icon": "saat"
          },
          {
            "key": "yogunluk",
            "text": "Yoğun Program",
            "icon": "takvim"
          }
        ],
        "study": [
          "Speaking",
          "Listening & Writing",
          "Reading Etütleri"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Ataşehir Şubesi Hafta Sonu PROFICIENCY Eğitim Programı",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar: Sabah Programı: 10:00 / 14:00 - Öğlen Programı: 14:00 / 18:00",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 1,5 Ay - 48 Saat - Yoğun Program - Speaking - Listening & Writing - Reading Etütleri",
          "Ücretlendirme: Program Ücreti 3.500 TL"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "14:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "14:00",
            "end": "18:00"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 1,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "48 Saat",
            "icon": "saat"
          },
          {
            "key": "yogunluk",
            "text": "Yoğun Program",
            "icon": "takvim"
          }
        ],
        "study": [
          "Speaking",
          "Listening & Writing",
          "Reading Etütleri"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir PROFICIENCY Özel Ders",
        "rawLines": [
          "Program Süresi: Kişiye Özel Program Süresi Hazırlanmaktadır",
          "Günler ve Saatler: Eğitim hayatınıza uygun gün ve saatlerde Proficiency özel ders alabilirsiniz.",
          "Program Detayları: Speaking - Listening & Writing - Reading Etütleri - Üniversite'nin Sınav Formatına Yönelik Soru Çözme Teknikleri",
          "Toplam ders saati üzerinden ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "Eğitim hayatınıza uygun gün ve saatlerde Proficiency özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "Kişiye Özel Program Süresi Hazırlanmaktadır",
            "icon": "sure"
          }
        ],
        "study": [
          "Speaking",
          "Listening & Writing",
          "Reading Etütleri",
          "Üniversite'nin Sınav Formatına Yönelik Soru Çözme Teknikleri"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "kadikoy",
    "branchLabel": "Kadıköy",
    "courseSlug": "ingilizce-konusma-kursu",
    "courseName": "İngilizce Konuşma",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "kadikoy-subesi-ingilizce-konusma-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/ingilizce-konusma-kursu/kadikoy-subesi-ingilizce-konusma-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "İngilizce Konuşma Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/ingilizce-konusma-kursu",
    "groupSize": 6,
    "months": 2.5,
    "hours": 60,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Kadıköy Şubesi Hafta İçi İngilizce Konuşma Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: Maksimum 6 Kişilik Özel Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat - Speaking - Listening",
          "Ücretlendirme: Program Ücreti 3.500 TL / 6 Taksit"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [
          "Speaking",
          "Listening"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Kadıköy Şubesi Hafta Sonu İngilizce Konuşma Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: Maksimum 6 Kişilik Özel Gruplar - 1 Kur Program Süresi 2,5 Ay - 60 Saat - Speaking - Listening",
          "Ücretlendirme: Program Ücreti 3.500 TL / 6 Taksit"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "Maksimum 6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "1 Kur Program Süresi 2,5 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "60 Saat",
            "icon": "saat"
          }
        ],
        "study": [
          "Speaking",
          "Listening"
        ],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir Speaking Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde Speaking dersleri alabilirsiniz.",
          "Program Detayları: İngilizce Akıcı Konuşma Teknikleri - Pratik İngilizce Diyalogları - Speaking - Conversation Club",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde Speaking dersleri alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "İngilizce Akıcı Konuşma Teknikleri",
          "Pratik İngilizce Diyalogları",
          "Speaking",
          "Conversation Club"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "atasehir",
    "branchLabel": "Ataşehir",
    "courseSlug": "italyanca-kursu",
    "courseName": "İtalyanca",
    "category": "yabanci-dil-egitimleri",
    "pageSlug": "atasehir-subesi-italyanca-kurs-tarihi",
    "sourcePath": "/yabanci-dil-egitimleri/italyanca-kursu/atasehir-subesi-italyanca-kurs-tarihi.html",
    "crumbRoot": "Yabancı Dil",
    "crumbRootHref": "/yabanci-dil",
    "crumbCourse": "İtalyanca Kursu",
    "crumbCourseHref": "/yabanci-dil-egitimleri/italyanca-kursu",
    "groupSize": 6,
    "months": null,
    "hours": null,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Ataşehir Şubesi Hafta İçi İtalyanca Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - A1 Kur Programı 36+36 Toplam 72 Saat",
          "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "A1 Kur Programı 36+36 Toplam 72 Saat",
            "icon": "sure"
          }
        ],
        "study": [],
        "note": "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2",
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Ataşehir Şubesi Hafta Sonu İtalyanca Kurs Tarihleri",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:30 / 16:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - A1 Kur Programı 36+36 Toplam 72 Saat",
          "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:30",
            "end": "16:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "A1 Kur Programı 36+36 Toplam 72 Saat",
            "icon": "sure"
          }
        ],
        "study": [],
        "note": "6 Kurluk CEFR Eğitim Sistemi: A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2.1 / B2.2 / C1.1 / C1.2 / C2.1 / C2.2",
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir İtalyanca Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde İtalyanca özel ders alabilirsiniz.",
          "Program Detayları: Başlangıç Seviyesi A1 / Başlangıç Üzeri A2 / Orta Seviye B1 / Orta Seviye Üzeri B2 / İleri Düzey",
          "Toplam Ders Saati Üzerinden Ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde İtalyanca özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Başlangıç Seviyesi A1",
          "Başlangıç Üzeri A2",
          "Orta Seviye B1",
          "Orta Seviye Üzeri B2",
          "İleri Düzey"
        ],
        "note": null,
        "startDate": null
      }
    ]
  },
  {
    "branch": "kadikoy",
    "branchLabel": "Kadıköy",
    "courseSlug": "gre-kursu",
    "courseName": "GRE",
    "category": "sinav-hazirlik-egitimleri",
    "pageSlug": "kadikoy-subesi-kurs-tarihi",
    "sourcePath": "/sinav-hazirlik-egitimleri/gre-kursu/kadikoy-subesi-kurs-tarihi.html",
    "crumbRoot": "Sınav Hazırlık",
    "crumbRootHref": "/sinav-hazirlik-egitimleri",
    "crumbCourse": "GRE Kursu",
    "crumbCourseHref": "/sinav-hazirlik-egitimleri/gre-kursu",
    "groupSize": 6,
    "months": 2.0,
    "hours": 48,
    "programs": [
      {
        "kind": "haftaici",
        "heading": "Kadıköy Şubesi Hafta İçi GRE Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Pazartesi - Çarşamba Günleri Sabah Programı 10:00 / 13:00 - Akşam Programı 19:00 / 21:30",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2 Ay - 48 Saat",
          "Ücretlendirme: Program Ücreti 3.500 TL"
        ],
        "days": [
          "pzt",
          "car"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Akşam Programı",
            "start": "19:00",
            "end": "21:30"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "48 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "haftasonu",
        "heading": "Kadıköy Şubesi Hafta Sonu GRE Kurs Programı",
        "rawLines": [
          "Günler ve Saatler: Cumartesi - Pazar Günleri Sabah Programı 10:00 / 13:00 - Öğlen Programı 13:00 / 16:00",
          "Program Detayları: 6 Kişilik Özel Gruplar - Program Süresi 2 Ay - 48 Saat",
          "Ücretlendirme: Program Ücreti 3.500 TL"
        ],
        "days": [
          "cmt",
          "paz"
        ],
        "slots": [
          {
            "name": "Sabah Programı",
            "start": "10:00",
            "end": "13:00"
          },
          {
            "name": "Öğlen Programı",
            "start": "13:00",
            "end": "16:00"
          }
        ],
        "hoursNote": null,
        "specs": [
          {
            "key": "grupBuyuklugu",
            "text": "6 Kişilik Özel Gruplar",
            "icon": "grup"
          },
          {
            "key": "programSuresi",
            "text": "Program Süresi 2 Ay",
            "icon": "sure"
          },
          {
            "key": "toplamSaat",
            "text": "48 Saat",
            "icon": "saat"
          }
        ],
        "study": [],
        "note": null,
        "startDate": null
      },
      {
        "kind": "birebir",
        "heading": "İstediğiniz Gün ve Saatlerde Birebir GRE Özel Ders",
        "rawLines": [
          "Program Süresi: 1 - 3 Ay",
          "Günler ve Saatler: İş ya da eğitim hayatınıza uygun gün ve saatlerde özel ders alabilirsiniz.",
          "Program Detayları: Sözel, Sayısal, Analitik Kompozisyon Yazma - Analiz ve Sonuç Çıkarma, Kelime, Cümle Anlam Kavrama Etütleri - Sınav Tekniği",
          "Toplam ders saati üzerinden ücretlendirilir."
        ],
        "days": [],
        "slots": [],
        "hoursNote": "İş ya da eğitim hayatınıza uygun gün ve saatlerde özel ders alabilirsiniz.",
        "specs": [
          {
            "key": "programSuresi",
            "text": "1 - 3 Ay",
            "icon": "sure"
          }
        ],
        "study": [
          "Sözel, Sayısal, Analitik Kompozisyon Yazma",
          "Analiz ve Sonuç Çıkarma, Kelime, Cümle Anlam Kavrama Etütleri",
          "Sınav Tekniği"
        ],
        "note": null,
        "startDate": null
      }
    ]
  }
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
