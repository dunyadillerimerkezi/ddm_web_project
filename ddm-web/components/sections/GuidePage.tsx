import Link from "next/link";

import { SiteChrome } from "@/components/layout";
import { Icon } from "@/components/graphics/Icon";
import { CtaBand } from "@/components/sections/CtaBand";
import { GuideHero } from "@/components/sections/GuideHero";
import { GuideToc } from "@/components/sections/GuideToc";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { BRANCH_LIST } from "@/data/branches";
import { byCourse } from "@/data/courseDates";
import { EXAM_GUIDES } from "@/data/examGuides";
import { PRIVATE_LESSONS } from "@/data/privateLessons";
import { CONTACT_HREF, linkIfProduced, onlyProduced } from "@/lib/hubLinks";
import type { GuidePage as GuidePageData, GuideResolvedBlock } from "@/lib/guideContent";
import styles from "@/styles/GuideBody.module.css";

const DATE_FORMAT = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/**
 * P4 — "{Sınav} Nedir?" rehber sayfası (kullanıcı, 2026-09-26): göz gezdirilerek
 * okunur. Her bölüm bir soru başlığı + kalın tek cümlelik cevap + madde / tablo;
 * uzun paragraf bloğu yok. Solda yapışkan soru listesi. Tek zemin (beyaz),
 * bölümleri ince çizgi ayırır.
 */
function Block({ block }: { block: GuideResolvedBlock }) {
  switch (block.kind) {
    case "text":
      return (
        <>
          {block.paragraphs.map((p) => (
            <p key={p} className={styles.text}>
              {p}
            </p>
          ))}
        </>
      );
    case "points":
      return (
        <ul className={styles.points}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "parts":
      return (
        <>
          <ul className={styles.parts}>
            {block.items.map((p) => (
              <li key={p.name} className={styles.part}>
                <span className={styles.partIcon}>
                  <Icon name={p.icon} size={20} />
                </span>
                <span className={styles.partBody}>
                  <span className={styles.partHead}>
                    <strong className={styles.partName}>{p.name}</strong>
                    <span className={styles.partMeta}>{p.meta}</span>
                  </span>
                  <span className={styles.partText}>{p.text}</span>
                </span>
              </li>
            ))}
          </ul>
          {block.note && <p className={styles.note}>{block.note}</p>}
        </>
      );
    case "links":
      return (
        <ul className={styles.links}>
          {block.items.map((l) => {
            const href = linkIfProduced(l.href);
            return (
              <li key={l.href}>
                {href ? (
                  <Link href={href} className={styles.linkChip}>
                    {l.label}
                  </Link>
                ) : (
                  <span className={styles.chip}>{l.label}</span>
                )}
              </li>
            );
          })}
        </ul>
      );
    case "table":
      return (
        <>
          {block.title && <h3 className={styles.tableTitle}>{block.title}</h3>}
          <div className={block.head.length > 2 ? styles.tableFrame : styles.tableFrameNarrow}>
            <table className={block.head.length > 2 ? styles.table : styles.tableNarrow}>
              <thead>
                <tr>
                  {block.head.map((h, i) => (
                    <th key={h || i} scope="col">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, i) =>
                      i === 0 ? (
                        <th key={i} scope="row">
                          {cell}
                        </th>
                      ) : (
                        <td key={i}>{cell}</td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.note && <p className={styles.note}>{block.note}</p>}
        </>
      );
  }
}

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
          label: `${e.branchLabel} şubesi kurs tarihi`,
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

export function GuidePage({ page }: { page: GuidePageData }) {
  return (
    <SiteChrome ctaLabel="Bilgi Al" ctaHref={CONTACT_HREF}>
      <GuideHero page={page} contactHref={CONTACT_HREF} />

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
                  <Block key={i} block={b} />
                ))}
              </section>
            ))}

            <footer className={styles.sources}>
              <p className={styles.sourcesTitle}>Kaynaklar</p>
              <ul className={styles.sourceList}>
                {page.sources.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <p className={styles.updated}>
                Son güncelleme: <time dateTime={page.updated}>{DATE_FORMAT.format(new Date(page.updated))}</time>
              </p>
            </footer>
          </article>
        </div>
      </div>

      <CtaBand
        ground="light"
        title={`${page.exam} hazırlığınızı birlikte planlayalım`}
        sub="Hedef puanınızı ve sınav tarihinizi size en yakın şubemizle konuşun."
        primary={{ label: "Bilgi Al", href: CONTACT_HREF }}
        secondary={{ label: page.course.label, href: page.course.href }}
      />
      <RelatedLinks title="İlgili sayfalar" groups={related(page)} />
    </SiteChrome>
  );
}
