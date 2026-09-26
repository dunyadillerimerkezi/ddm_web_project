import { GuidePage } from "@/components/sections/GuidePage";
import { RichContentPage } from "@/components/sections/RichContentPage";
import { SinglePage } from "@/components/sections/SinglePage";
import type { RichEntry } from "@/lib/richPages";

/** P4 dağıtıcılarının tek çıkışı: alt türe göre sayfa bileşeni (`lib/richPages.ts`). */
export function RichRoute({ entry }: { entry: RichEntry }) {
  switch (entry.kind) {
    case "guide":
      return <GuidePage page={entry.page} />;
    case "single":
      return <SinglePage page={entry.page} />;
    case "rich":
      return <RichContentPage page={entry.page} />;
  }
}
