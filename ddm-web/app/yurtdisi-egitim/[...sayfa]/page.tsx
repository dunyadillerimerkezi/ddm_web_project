import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RichRoute } from "@/components/sections/RichRoute";
import { getRichPage, richMetadata, richPathsUnder } from "@/lib/richPages";

/**
 * P4 — Yurtdışı Eğitim alt sayfaları (`data/abroadPages.ts`, biniş kartı tasarımı). Bir ya da iki
 * seviye (`/yurtdisi-egitim/work-and-travel`, `/yurtdisi-egitim/tercih/italyadauniversite`); catch-all
 * yalnız bu prefix altında (plan §3 madde 5 — kökte catch-all yok).
 */

const PREFIX = "/yurtdisi-egitim/";

export const dynamicParams = false;

export function generateStaticParams() {
  return richPathsUnder(PREFIX).map((sayfa) => ({ sayfa }));
}

type Params = { sayfa: string[] };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { sayfa } = await params;
  const entry = getRichPage(`${PREFIX}${sayfa.join("/")}`);
  return entry ? richMetadata(entry) : {};
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { sayfa } = await params;
  const entry = getRichPage(`${PREFIX}${sayfa.join("/")}`);
  if (!entry) notFound();
  return <RichRoute entry={entry} />;
}
