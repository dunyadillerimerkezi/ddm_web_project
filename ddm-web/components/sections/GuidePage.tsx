import { SiteChrome } from "@/components/layout";
import { ContactForm } from "@/components/sections/ContactForm";
import { FORM_HREF } from "@/lib/formAnchor";
import { GuideBlock } from "@/components/sections/GuideBlock";
import { GuideHero } from "@/components/sections/GuideHero";
import { GuideToc } from "@/components/sections/GuideToc";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { SourcesFooter } from "@/components/sections/SourcesFooter";
import { BRANCHES, BRANCH_LIST } from "@/data/branches";
import { byCourse } from "@/data/courseDates";
import { EXAM_GUIDES } from "@/data/examGuides";
import { PRIVATE_LESSONS } from "@/data/privateLessons";
import { CONTACT_HREF, onlyProduced } from "@/lib/hubLinks";
import type { GuidePage as GuidePageData } from "@/lib/guideContent";
import styles from "@/styles/GuideBody.module.css";

function related(page: GuidePageData) {
  const courseSlug = page.course.href.split("/").pop() ?? "";
  const privateLesson = PRIVATE_LESSONS.find((d) => d.path.startsWith(`${page.course.href}/`));
  return [
    {
      title: `${page.exam} hazırlığı`,
      links: onlyProduced([
        page.course,
        ...(privateLesson ? [{ label: privateLesson.label, href: privateLesson.path }] : []),
        ...byCourse(courseSlug).map((e) => ({
          label: `${BRANCHES[e.branch].name} şubesi kurs tarihi`,
          href: `/${e.category}/${e.courseSlug}/${e.pageSlug}`,
        })),
      ]),
    },
    {
      title: "Diğer sınav rehberleri",
      links: onlyProduced(EXAM_GUIDES.filter((g) => g.path !== page.href).map((g) => ({ label: g.label, href: g.path }))),
    },
    {
      title: "Şubelerimiz",
      links: onlyProduced([
        ...BRANCH_LIST.map((b) => ({ label: `${b.name} Şubesi`, href: b.href })),
        { label: "Tüm şubeler", href: CONTACT_HREF },
      ]),
    },
  ].filter((g) => g.links.length > 0);
}

/**
 * P4 — "{Sınav} Nedir?" rehber sayfası (kullanıcı, 2026-09-26): göz gezdirilerek
 * okunur. Her bölüm bir soru başlığı + kalın tek cümlelik cevap + madde / tablo;
 * uzun paragraf bloğu yok. Solda yapışkan soru listesi. Tek zemin (beyaz),
 * bölümleri ince çizgi ayırır.
 */
export function GuidePage({ page }: { page: GuidePageData }) {
  return (
    <SiteChrome ctaLabel="Bilgi Al">
      <GuideHero page={page} contactHref={FORM_HREF} />

      <div className={styles.body}>
        <div className={styles.container}>
          <GuideToc items={page.sections.map((s) => ({ id: s.id, label: s.title }))} />

          <article className={styles.article}>
            {page.sections.map((s) => (
              <section key={s.id} id={s.id} className={styles.section} aria-labelledby={`${s.id}-baslik`}>
                <h2 id={`${s.id}-baslik`} className={styles.question}>
                  {s.title}
                </h2>
                <p className={styles.answer}>{s.answer}</p>
                {s.blocks.map((b, i) => (
                  <GuideBlock key={i} block={b} />
                ))}
              </section>
            ))}

            <SourcesFooter sources={page.sources} updated={page.updated} className={styles.sources} />
          </article>
        </div>
      </div>

      <ContactForm
        ground="white"
        title={`${page.exam} hazırlığınızı birlikte planlayalım`}
        lead="Hedef puanınızı ve sınav tarihinizi size en yakın şubemizle konuşun."
        course={page.course.href}
        link={page.course}
      />
      <RelatedLinks title="İlgili sayfalar" groups={related(page)} />
    </SiteChrome>
  );
}
