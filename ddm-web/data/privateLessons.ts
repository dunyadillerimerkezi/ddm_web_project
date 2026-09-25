/**
 * P4 — Özel Ders sayfalarının birleşik listesi. Tipler ve kurallar:
 * `data/privateLessonsShared.ts`. Tanımlar: `data/privateLessonsLanguage.ts`
 * (dil, seviye merdiveni) ve `data/privateLessonsExam.ts` (sınav, format kartları).
 */

import { LANGUAGE_PRIVATE_LESSONS } from "@/data/privateLessonsLanguage";
import { EXAM_PRIVATE_LESSONS } from "@/data/privateLessonsExam";
import type { PrivateLessonDef } from "@/data/privateLessonsShared";

export type { PrivateLessonDef } from "@/data/privateLessonsShared";

export const PRIVATE_LESSONS: PrivateLessonDef[] = [...LANGUAGE_PRIVATE_LESSONS, ...EXAM_PRIVATE_LESSONS];

export function getPrivateLessonDef(path: string): PrivateLessonDef | undefined {
  return PRIVATE_LESSONS.find((d) => d.path === path);
}
