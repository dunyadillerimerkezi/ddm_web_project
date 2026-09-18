import { SectionHeading, ButtonLink, Carousel } from "@/components/ui";
import { CourseChipCard } from "@/components/cards/CourseChipCard";
import { EXAM_SECTION } from "@/data/home";
import styles from "@/styles/ExamSection.module.css";

/**
 * Bölüm 3 · Sınav hazırlık carousel'i.
 *
 * Kaynak: `DDM Ana Sayfa.dc.html` bölüm 3. Şablondaki alt satırdaki
 * "Logo yuvası 240×80 · ... " metni tasarım-zamanı belge notuydu (gerçek
 * içerik değil) — koda taşınmadı.
 */
export function ExamSection() {
  const { kicker, title, lead, cta, courses } = EXAM_SECTION;

  return (
    <section id="sinav-hazirlik" className={styles.section}>
      <div className={styles.inner}>
        <Carousel
          label="Sınav hazırlık kursları"
          heading={<SectionHeading kicker={kicker} title={title} lead={lead} />}
        >
          {courses.map((course) => (
            <CourseChipCard key={course.code} course={course} />
          ))}
        </Carousel>
        <div className={styles.footer}>
          <ButtonLink href={cta.href} variant="primary" size="lg" arrow="chip">
            {cta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
