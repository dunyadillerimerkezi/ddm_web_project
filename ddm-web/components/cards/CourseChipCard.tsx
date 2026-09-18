import Link from "next/link";
import Image from "next/image";
import { UiIcon } from "@/components/graphics/Icon";
import type { ExamCourse } from "@/data/home";
import styles from "@/styles/CourseChipCard.module.css";

/**
 * Sınav hazırlık carousel'i slaytı — 240×80 logo kutusu (varsa gerçek logo,
 * yoksa metin rozeti) + ad + grup + "Keşfet".
 *
 * Kaynak: `DDM Ana Sayfa.dc.html` bölüm 3. Şablondaki `hasLogo`/`noLogo` iki
 * ayrı bool tek `logo: string | null` alanına indirgendi (bkz. data/home.ts).
 */
export function CourseChipCard({ course }: { course: ExamCourse }) {
  return (
    <Link href={course.href} className={styles.card}>
      <div className={course.logo ? styles.logoBox : styles.logoBoxText}>
        {course.logo ? (
          <div className={styles.logoImage}>
            <Image
              src={`/assets/home_page_images/${course.logo}`}
              alt={`${course.name} logosu`}
              fill
              sizes="200px"
              style={{ objectFit: "contain" }}
            />
          </div>
        ) : (
          <span className={styles.code}>{course.code}</span>
        )}
      </div>
      <div className={styles.body}>
        <span className={styles.name}>{course.name}</span>
        <span className={styles.group}>{course.group}</span>
      </div>
      <span className={styles.discover}>
        Keşfet
        <UiIcon name="arrowRight" size={14} strokeWidth={1.6} />
      </span>
    </Link>
  );
}
