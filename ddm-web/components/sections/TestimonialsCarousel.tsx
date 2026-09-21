import { SectionHeading, Carousel } from "@/components/ui";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { TESTIMONIALS_SECTION } from "@/data/home";
import styles from "@/styles/TestimonialsCarousel.module.css";

/**
 * Bölüm 10 · Öğrenci yorumları — site geneli `TESTIMONIALS_SECTION` verisiyle
 * (`data/home.ts`), Ana Sayfa'daki `Carousel`/`TestimonialCard` ikilisi
 * birebir yeniden kullanılıyor. Dile özgü metin YOK (plan §3 bölüm 10).
 *
 * `PageSection` kullanılmıyor: `Carousel` kendi başlık+ok-tuşları satırını
 * kendi içinde yönetiyor (bkz. `components/sections/ExamSection.tsx`'teki
 * aynı desen) — `PageSection`in tek satırlık başlık düzeniyle çakışır.
 */
export function TestimonialsCarousel({ ground = "light" }: { ground?: "light" | "gray" }) {
  const { kicker, title, items } = TESTIMONIALS_SECTION;

  return (
    <section className={ground === "gray" ? styles.sectionGray : styles.sectionLight}>
      <div className={styles.container}>
        <Carousel label="Öğrenci yorumları" heading={<SectionHeading kicker={kicker} title={title} />}>
          {items.map((item) => (
            <TestimonialCard item={item} key={item.name} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
