import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RichRoute } from "@/components/sections/RichRoute";
import { getRichPage, richMetadata, richPathsUnder } from "@/lib/richPages";

/** P4 — Diğer Programlar alt sayfaları (`data/otherPrograms.ts`). `online-dil-egitimi` ve `ozel-dersler` kendi statik klasörlerinde. */

const PREFIX = "/diger-program/";

/** Kendi klasörü olan alt sayfalar (statik route önceliklidir; burada üretilmez). */
const OWN_FOLDER = new Set(["online-dil-egitimi", "ozel-dersler"]);

export const dynamicParams = false;

export function generateStaticParams() {
  return richPathsUnder(PREFIX)
    .filter((p) => p.length === 1 && !OWN_FOLDER.has(p[0]))
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
