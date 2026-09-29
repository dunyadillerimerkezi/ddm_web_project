import Link from "next/link";

import { SiteChrome } from "@/components/layout";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Icon } from "@/components/graphics/Icon";
import { ContactForm } from "@/components/sections/ContactForm";
import { FORM_HREF } from "@/lib/formAnchor";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { SourcesFooter } from "@/components/sections/SourcesFooter";
import { SingleBlock } from "@/components/sections/SingleBlocks";
import { SingleBoard } from "@/components/sections/SingleBoards";
import { ButtonLink } from "@/components/ui";
import { BRANCH_LIST } from "@/data/branches";
import { CONTACT_HREF, onlyProduced } from "@/lib/hubLinks";
import type { SinglePage as SinglePageData } from "@/lib/singleContent";
import guide from "@/styles/GuideBody.module.css";
import styles from "@/styles/SinglePage.module.css";

const BRANCHES_ID = "subeler";

/**
 * P4 — Tekil içerik sayfası (kullanıcı, 2026-09-26: "A · program panosu"). Açık hero,
 * sağda sayfanın asıl bilgisi (`board`); gövdede her bölüm bir satır — solda soru +
 * kalın cevap, sağda tablo / kart / bağlantı; gri bantta şube kartları; sonda kaynaklar
 * ve son güncelleme (beyaz gövdenin sonunda). Sınav rehberinden (GuidePage) farkı: soru listesi yok, bilgi
 * hero'da görsel olarak başlar.
 */
export function SinglePage({ page }: { page: SinglePageData }) {
  const lang = page.lang ?? undefined;
  return (
    <SiteChrome ctaLabel="Bilgi Al">
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.copy}>
            <Breadcrumb items={page.crumbs} tone="onLight" />
            <h1 className={styles.title} lang={lang}>
              {page.h1}
            </h1>
            <p className={styles.lead} lang={lang}>
              {page.hero.lead}
            </p>
            <div className={styles.actions}>
              <ButtonLink href={FORM_HREF} variant="primary" size="lg" arrow>
                Bilgi Al
              </ButtonLink>
              {page.branches ? (
                <ButtonLink href={`#${BRANCHES_ID}`} variant="outlineLight" size="lg">
                  Kurs tarihleri
                </ButtonLink>
              ) : (
                <ButtonLink href={page.course.href} variant="outlineLight" size="lg">
                  {page.course.label}
                </ButtonLink>
              )}
            </div>
          </div>
          {lang ? (
            <div lang={lang}>
              <SingleBoard board={page.hero.board} />
            </div>
          ) : (
            <SingleBoard board={page.hero.board} />
          )}
        </div>
      </section>

      <div className={styles.body}>
        {page.sections.map((s) => (
          <section key={s.id} id={s.id} className={styles.row} aria-labelledby={`${s.id}-baslik`} lang={lang}>
            <div className={styles.ask}>
              <h2 id={`${s.id}-baslik`} className={guide.question}>
                {s.title}
              </h2>
              <p className={guide.answer}>{s.answer}</p>
            </div>
            <div className={styles.blocks}>
              {s.blocks.map((b, i) => (
                <SingleBlock key={i} block={b} />
              ))}
            </div>
          </section>
        ))}
        <SourcesFooter sources={page.sources} updated={page.updated} className={styles.footnote} />
      </div>

      {page.branches && (
        <section id={BRANCHES_ID} className={styles.band} aria-labelledby={`${BRANCHES_ID}-baslik`}>
          <div className={styles.bandInner}>
            <h2 id={`${BRANCHES_ID}-baslik`} className={styles.bandTitle}>
              {page.branches.title}
            </h2>
            <p className={styles.bandAnswer}>{page.branches.answer}</p>
            <ul className={styles.branchGrid}>
              {page.branches.items.map((b) => (
                <li key={b.branch.slug}>
                  <Link href={b.href} className={styles.branchCard}>
                    <span className={styles.branchName}>{b.branch.name}</span>
                    {b.branch.address && (
                      <span className={styles.branchAddress}>
                        <Icon name="konum" size={16} />
                        {b.branch.address}
                      </span>
                    )}
                    <span className={styles.branchLink}>{b.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}


      <ContactForm
        ground="white"
        title={page.cta.title}
        lead={page.cta.sub}
        course={page.href}
        link={page.course}
      />
      <RelatedLinks
        title="İlgili sayfalar"
        groups={[
          ...page.related.map((g) => ({ title: g.title, links: onlyProduced(g.links.filter((l) => l.href !== page.href)) })),
          {
            title: "Şubelerimiz",
            links: onlyProduced([
              ...BRANCH_LIST.map((b) => ({ label: `${b.name} Şubesi`, href: b.href })),
              { label: "Tüm şubeler", href: CONTACT_HREF },
            ]),
          },
        ]}
      />
    </SiteChrome>
  );
}
