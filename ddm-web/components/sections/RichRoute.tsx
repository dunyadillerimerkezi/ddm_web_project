import { GuidePage } from "@/components/sections/GuidePage";
import { RichContentPage } from "@/components/sections/RichContentPage";
import type { RichEntry } from "@/lib/richPages";

/** P4 dağıtıcılarının tek çıkışı: alt türe göre sayfa bileşeni (`lib/richPages.ts`). */
export function RichRoute({ entry }: { entry: RichEntry }) {
  return entry.kind === "guide" ? <GuidePage page={entry.page} /> : <RichContentPage page={entry.page} />;
}
