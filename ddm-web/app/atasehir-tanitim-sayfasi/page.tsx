import { BranchPromoRoute, branchPromoMetadata } from "@/components/sections/BranchPromoRoute";

/** P6 — Ataşehir şube tanıtım sayfası (kök dizinde statik klasör; kökte catch-all yok — CLAUDE.md §3). */
const PATH = "/atasehir-tanitim-sayfasi";

export function generateMetadata() {
  return branchPromoMetadata(PATH);
}

export default function Page() {
  return <BranchPromoRoute path={PATH} />;
}
