import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EnglishLevelPage } from "@/components/sections/EnglishLevelPage";
import { EnglishProgramPage } from "@/components/sections/EnglishProgramPage";
import { ENGLISH_LEVELS } from "@/data/englishLevels";
import { ENGLISH_PROGRAMS } from "@/data/englishPrograms";
import { ContentSectionsError } from "@/lib/contentSections";
import { getEnglishLevelBySlug } from "@/lib/englishLevelContent";
import { getEnglishProgramBySlug } from "@/lib/englishProgramContent";
import { absoluteUrl } from "@/lib/site";

/**
 * P5 — İngilizce Kursları alt sayfaları: seviye (`data/englishLevels.ts`, A1–C1) ve hedef kitle
 * programları (`data/englishPrograms.ts`). Hub `/ingilizce-kurslari` kendi `page.tsx`'inde (P3).
 */

const LEVEL_SLUGS = ENGLISH_LEVELS.map((d) => d.slug);
const PROGRAM_SLUGS = ENGLISH_PROGRAMS.map((d) => d.slug);
const clash = LEVEL_SLUGS.find((s) => PROGRAM_SLUGS.includes(s));
if (clash) throw new ContentSectionsError(`[ingilizce-kurslari] "${clash}" hem seviye hem program.`);

export const dynamicParams = false;

export function generateStaticParams() {
  return [...LEVEL_SLUGS, ...PROGRAM_SLUGS].map((sayfa) => ({ sayfa }));
}

type Params = { sayfa: string };

function find(slug: string) {
  const level = getEnglishLevelBySlug(slug);
  if (level) return { kind: "level" as const, page: level };
  const program = getEnglishProgramBySlug(slug);
  if (program) return { kind: "program" as const, page: program };
  return null;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { sayfa } = await params;
  const hit = find(sayfa);
  if (!hit) return {};
  const { page } = hit;
  return { title: page.title, description: page.description, alternates: { canonical: absoluteUrl(page.href) } };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { sayfa } = await params;
  const hit = find(sayfa);
  if (!hit) notFound();
  return hit.kind === "level" ? <EnglishLevelPage page={hit.page} /> : <EnglishProgramPage page={hit.page} />;
}
