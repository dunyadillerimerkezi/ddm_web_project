import { Kicker, ButtonLink } from "@/components/ui";
import { MediaCard } from "@/components/cards/MediaCard";
import { OTHER_PROGRAMS_SECTION } from "@/data/home";
import styles from "@/styles/OtherProgramsSection.module.css";

/**
 * Bölüm 7 · Diğer programlar.
 * Kaynak: `DDM Ana Sayfa.dc.html` bölüm 7.
 */
export function OtherProgramsSection() {
  const { kicker, title, cta, programs } = OTHER_PROGRAMS_SECTION;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <Kicker>{kicker}</Kicker>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <div className={styles.grid}>
          {programs.map((program) => (
            <MediaCard
              key={program.num}
              variant="program"
              num={program.num}
              title={program.title}
              text={program.sub}
              cta={{ label: "Keşfet", href: program.href }}
              slot={{
                src: program.image.src,
                alt: `${program.title} — ${program.image.hint}`,
                ratio: "4/3",
                width: 800,
                height: 600,
                hint: program.image.hint,
              }}
              as="h3"
            />
          ))}
        </div>
        <ButtonLink href={cta.href} variant="primary" size="lg" arrow="chip">
          {cta.label}
        </ButtonLink>
      </div>
    </section>
  );
}
