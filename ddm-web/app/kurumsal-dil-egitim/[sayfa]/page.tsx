import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RichRoute } from "@/components/sections/RichRoute";
import { getRichPage, richMetadata, richPathsUnder } from "@/lib/richPages";

/** P4 — Kurumsal Dil Eğitimi alt sayfaları (`data/otherPrograms.ts`). */

const PREFIX = "/kurumsal-dil-egitim/";

export const dynamicParams = false;

export function generateStaticParams() {
  return richPathsUnder(PREFIX)
    .filter((p) => p.length === 1)
    .map(([sayfa]) => ({ sayfa }));
}

type Params = { sayfa: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { sayfa } = await params;
  const entry = getRichPage(`${PREFIX}${sayfa}`);
  return entry ? richMetadata(entry) : {};
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { sayfa } = await params;
  const entry = getRichPage(`${PREFIX}${sayfa}`);
  if (!entry) notFound();
  return <RichRoute entry={entry} />;
}
