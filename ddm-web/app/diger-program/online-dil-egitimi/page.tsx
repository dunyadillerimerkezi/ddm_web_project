import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RichContentPage } from "@/components/sections/RichContentPage";
import { ONLINE_HUB } from "@/data/onlineLessons";
import { getRichPage, richMetadata } from "@/lib/richPages";

/**
 * P4 — Online Dil Eğitimi çatı sayfası (`data/onlineLessons.ts` → `ONLINE_HUB`).
 * Footer'da her sayfadan link alan ölü hedefti; 8 online dil sayfasının üstü.
 */

export function generateMetadata(): Metadata {
  const page = getRichPage(ONLINE_HUB.path);
  return page ? richMetadata(page) : {};
}

export default function OnlineDilEgitimiPage() {
  const page = getRichPage(ONLINE_HUB.path);
  if (!page) notFound();
  return <RichContentPage page={page} />;
}
