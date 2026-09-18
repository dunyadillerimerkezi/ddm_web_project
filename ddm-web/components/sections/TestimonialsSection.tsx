import { Kicker, ButtonLink, Carousel } from "@/components/ui";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { TESTIMONIALS_SECTION } from "@/data/home";
import styles from "@/styles/TestimonialsSection.module.css";

/**
 * Bölüm 9 · Öğrenci yorumları carousel'i.
 * Kaynak: `DDM Ana Sayfa.dc.html` bölüm 9.
 */
export function TestimonialsSection() {
  const { kicker, title, cta, items } = TESTIMONIALS_SECTION;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Carousel
          label="Öğrenci yorumları"
          heading={
            <div className={styles.head}>
              <Kicker>{kicker}</Kicker>
              <h2 className={styles.title}>{title}</h2>
            </div>
          }
          actions={
            <ButtonLink href={cta.href} variant="outlineLight" size="lg" arrow>
              {cta.label}
            </ButtonLink>
          }
        >
          {items.map((item) => (
            <TestimonialCard item={item} key={item.name} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
