import type { CSSProperties } from "react";
import Image from "next/image";

import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { SiteChrome } from "@/components/layout";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CtaBand } from "@/components/sections/CtaBand";
import { TestimonialFilter } from "@/components/sections/TestimonialFilter";
import { Reveal } from "@/components/ui/Reveal";
import { TESTIMONIALS_PAGE } from "@/data/testimonials";
import { CONTACT_HREF } from "@/lib/hubLinks";
import { getPublishedTestimonials, getTestimonialFilters } from "@/lib/testimonialContent";
import hero from "@/styles/PageHero.module.css";
import styles from "@/styles/TestimonialsPage.module.css";

/** Portre duvarındaki kare sayısı (6 × 3; mobilde 5 × 3 = ilk 15). */
const WALL_TILES = 18;

/**
 * P7 — Öğrenci Yorumları ("C · portre duvarı", kullanıcı seçimi 2026-09-29).
 * Lacivert degrade hero (sınav sayfalarıyla aynı zemin) + sağda öğrencilerin kendi fotoğraflarından duvar; her kare
 * o kişinin kartına iner. Tek baskın bölüm: süzgeçli kart ızgarası. Sonda kısa iletişim şeridi.
 */
export function TestimonialsPage() {
  const items = getPublishedTestimonials();
  const faces = items.filter((t) => t.photo).slice(0, WALL_TILES);

  return (
    <SiteChrome ctaLabel="Bilgi Al" ctaHref={CONTACT_HREF}>
      <section className={`${hero.section} ${styles.hero}`}>
        <div className={hero.glow} aria-hidden="true" />
        <div className={hero.crumbWrap}>
          <Breadcrumb items={[{ label: "Anasayfa", href: "/" }, { label: TESTIMONIALS_PAGE.h1 }]} />
        </div>
        <div className={`${hero.grid} ${styles.heroGrid}`}>
          <div className={hero.intro}>
            <h1 className={hero.title}>{TESTIMONIALS_PAGE.h1}</h1>
            <p className={hero.lead}>{TESTIMONIALS_PAGE.lead}</p>
          </div>
          <ul className={styles.faces} aria-label="Yorumu olan öğrenciler">
            {faces.map((t, i) => (
              <li key={t.id} style={{ "--i": i } as CSSProperties}>
                <a href={`#yorum-${t.id}`} className={styles.face} aria-label={`${t.name}, yorumuna git`}>
                  <Image
                    src={t.photo!.src}
                    alt=""
                    fill
                    sizes="(max-width: 680px) 18vw, (max-width: 999px) 15vw, 110px"
                    loading="eager"
                    style={t.photo!.focus ? { objectPosition: t.photo!.focus } : undefined}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.body} aria-label="Yorumlar">
        <div className={styles.inner}>
          <Reveal>
            <TestimonialFilter filters={getTestimonialFilters()} total={items.length}>
              {items.map((t) => (
                <TestimonialCard key={t.id} item={t} variant="wall" />
              ))}
            </TestimonialFilter>
          </Reveal>
        </div>
      </section>

      <CtaBand
        ground="gray"
        title="Hedefinizi birlikte planlayalım"
        sub="Sınavınızı ya da öğrenmek istediğiniz dili size en yakın şubemizle konuşun."
        primary={{ label: "Bilgi Al", href: CONTACT_HREF }}
      />
    </SiteChrome>
  );
}
