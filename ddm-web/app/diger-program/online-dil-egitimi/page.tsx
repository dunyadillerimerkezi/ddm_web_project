import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RichRoute } from "@/components/sections/RichRoute";
import { ONLINE_HUB } from "@/data/onlineLessons";
import { getRichPage, richMetadata } from "@/lib/richPages";

/**
 * P4 — Online Dil Eğitimi çatı sayfası (`data/onlineLessons.ts` → `ONLINE_HUB`).
 * Footer'da her sayfadan link alan ölü hedefti; 8 online dil sayfasının üstü.
 */

export function generateMetadata(): Metadata {
  const entry = getRichPage(ONLINE_HUB.path);
  return entry ? richMetadata(entry) : {};
}

export default function OnlineDilEgitimiPage() {
  const entry = getRichPage(ONLINE_HUB.path);
  if (!entry) notFound();
  return <RichRoute entry={entry} />;
}
