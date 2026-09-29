import type { Metadata } from "next";

import { TestimonialsPage } from "@/components/sections/TestimonialsPage";
import { TESTIMONIALS_PAGE } from "@/data/testimonials";
import { ContentSectionsError } from "@/lib/contentSections";
import { absoluteUrl } from "@/lib/site";

/** P7 — Öğrenci Yorumları: tek liste sayfası (tekil yorum sayfası yok; eski adresler buraya 301 — next.config.ts). */
export function generateMetadata(): Metadata {
  const { title, description } = TESTIMONIALS_PAGE.meta;
  if (title.length > 60 || description.length > 155) {
    throw new ContentSectionsError(`P7 metadata uzun: title ${title.length}/60, description ${description.length}/155`);
  }
  return { title, description, alternates: { canonical: absoluteUrl(TESTIMONIALS_PAGE.path) } };
}

export default function Page() {
  return <TestimonialsPage />;
}
