import Link from "next/link";
import Image from "next/image";
import { UiIcon } from "@/components/graphics/Icon";
import type { ExamCourse } from "@/data/home";
import styles from "@/styles/CourseChipCard.module.css";

/**
 * Sınav hazırlık carousel'i slaytı.
 *
 * Kaynak: `DDM Ana Sayfa.dc.html` bölüm 3. UI turu (2026-09-24, kullanıcı
 * fikri "2A"): logo kartın tamamını kaplar, alt yarıdaki koyu katmanın
 * üstünde ad + grup + "Keşfet". Logosu olmayan sınavda kod büyük yazı
 * olarak logonun yerini alır.
 */
export function CourseChipCard({ course }: { course: ExamCourse }) {
  return (
    <Link href={course.href} className={course.logo ? styles.card : `${styles.card} ${styles.noLogo}`}>
      <div className={styles.logoArea}>
        {course.logo ? (
          <div className={styles.logoImage}>
            <Image
              src={`/assets/home_page_images/${course.logo}`}
              alt={`${course.name} logosu`}
              fill
              sizes="240px"
              style={{ objectFit: "contain" }}
            />
          </div>
        ) : (
          <span className={styles.code} aria-hidden="true">
            {course.code}
          </span>
        )}
      </div>
      <div className={styles.body}>
        <span className={styles.name}>{course.name}</span>
        <span className={styles.group}>{course.group}</span>
        <span className={styles.discover}>
          Keşfet
          <UiIcon name="arrowRight" size={14} strokeWidth={1.6} />
        </span>
      </div>
    </Link>
  );
}
