import type { Metadata } from "next";

import { BranchPromoPage } from "@/components/sections/BranchPromoPage";
import { getBranchPromoPage } from "@/lib/branchPromoContent";
import { absoluteUrl } from "@/lib/site";

/** P6 — statik tanıtım route'larının ortak gövdesi (şu an 4; Ümraniye bilgisi bekleniyor). Her şube kök dizinde kendi klasöründe (CLAUDE.md §3). */
export function branchPromoMetadata(path: string): Metadata {
  const page = getBranchPromoPage(path);
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: absoluteUrl(page.path) },
  };
}

export function BranchPromoRoute({ path }: { path: string }) {
  return <BranchPromoPage page={getBranchPromoPage(path)} />;
}
