import Image from "next/image";
import Link from "next/link";

import { SiteChrome } from "@/components/layout";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Icon, UiIcon } from "@/components/graphics/Icon";
import { CtaBand } from "@/components/sections/CtaBand";
import { BranchMap } from "@/components/sections/BranchMap";
import { TransitList } from "@/components/sections/TransitList";
import { ButtonLink } from "@/components/ui";
import { telHref, waHref } from "@/data/branches";
import type { BranchPromoPage as PageData, PromoResolvedBlock, PromoTag } from "@/lib/branchPromoContent";
import styles from "@/styles/BranchPromoPage.module.css";

const COURSES_ID = "kurs-tarihleri";
const VISIT_ID = "ulasim";
/** Kaynakta "* " ile başlayan satırlar madde işaretli liste (Levent) — "Ayrıntılı bilgi"de liste olarak gösterilir. */
const BULLET = "* ";

/**
 * P6 — Şube tanıtım sayfası (kullanıcı, 2026-09-28: "B · şube künyesi"). Açık hero + sağda şubenin künye kartı
 * (semt fotoğrafı, adres / telefon `data/branches.ts`'ten, şubeye özgü iki satır, en yakın ulaşım); gövde şubenin
 * kendi blok dizisi (`blocks`: tanıtım kartları, program sütunları, madde panelleri, kurumsal, ders fotoğrafları) →
 * ulaşım + gömülü harita / şubenin kurs tarihi sayfaları → ortak 6 bağlantı → kaynak metnin tamamı "Ayrıntılı bilgi"de → CTA.
 * Tek hareket: künye kartı açılışta bir kez yükselir (reduced-motion'da yok). Zeminler sırayla gri/beyaz dönmez.
 * İletişim sayfasıyla (P1) bilinçli ayrım: burada form yok, adres/telefon yalnız künyede; iki sayfa birbirine bağlanır.
 */
export function BranchPromoPage({ page }: { page: PageData }) {
  const { branch, hero } = page;
  const tel = telHref(branch);
  const wa = waHref(branch);
  const nearest = page.visit.transit[0];

  return (
    <SiteChrome branch={branch} ctaLabel="Bilgi Al" ctaHref={page.contactHref}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.copy}>
            <Breadcrumb items={page.crumbs} tone="onLight" />
            <h1 className={styles.title}>{page.h1}</h1>
            <p className={styles.lead}>{hero.lead}</p>
            <div className={styles.actions}>
              <ButtonLink href={page.contactHref} variant="primary" size="lg" arrow>
                Bilgi Al
              </ButtonLink>
              <ButtonLink href={`#${COURSES_ID}`} variant="outlineLight" size="lg">
                Kurs tarihleri
              </ButtonLink>
            </div>
          </div>

          <article className={styles.card} aria-label={`${branch.name} şubesi künyesi`}>
            <div className={styles.cardPhoto}>
              <Image
                src={hero.photo.src}
                alt={hero.photo.alt}
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 999px) 100vw, 500px"
                className={styles.cover}
                style={hero.photo.position ? { objectPosition: hero.photo.position } : undefined}
              />
            </div>
            <div className={styles.cardHead}>
              <p className={styles.cardName}>{branch.name}</p>
              <span className={`${styles.cardBadge} ${styles.cap}`}>{hero.badge}</span>
            </div>
            <dl className={styles.cardRows}>
              <div className={styles.cardRow}>
                <dt>Adres</dt>
                <dd>{branch.address}</dd>
              </div>
              {branch.phone && (
                <div className={styles.cardRow}>
                  <dt>Telefon</dt>
                  <dd>{tel ? <a href={tel}>{branch.phone}</a> : branch.phone}</dd>
                </div>
              )}
              {page.card.map((row) => (
                <div key={row.label} className={styles.cardRow}>
                  <dt>{row.label}</dt>
                  <dd className={styles.cap}>{row.text}</dd>
                </div>
              ))}
              {nearest && (
                <div className={styles.cardRow}>
                  <dt>Ulaşım</dt>
                  <dd>
                    <a href={`#${VISIT_ID}`}>
                      {nearest.code ? `${nearest.code} · ` : ""}
                      {nearest.name}, {nearest.distance}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
            <div className={styles.cardFoot}>
              <a href={page.directionsHref} target="_blank" rel="noopener noreferrer">
                Yol tarifi al
              </a>
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              )}
              <Link href={page.contactHref}>İletişim</Link>
            </div>
          </article>
        </div>
      </section>

      <div className={styles.body}>
        {page.blocks.map((b) => (
          <Block key={b.id} block={b} />
        ))}

        <div className={styles.split}>
          <section id={VISIT_ID} className={styles.box} aria-labelledby="sube-ulasim">
            <h2 id="sube-ulasim" className={styles.boxTitle}>
              {branch.name} şubesine nasıl gelinir?
            </h2>
            {page.visit.place && (
              <div className={styles.place}>
                <h3 className={styles.placeTitle}>{page.visit.place.title}</h3>
                <p>{page.visit.place.text}</p>
              </div>
            )}
            <TransitList items={page.visit.transit} />
            <BranchMap query={page.mapQuery} directionsHref={page.directionsHref} label={`${branch.name} şubesi haritası`} />
          </section>

          <section id={COURSES_ID} className={styles.box} aria-labelledby="sube-kurslar">
            <h2 id="sube-kurslar" className={styles.boxTitle}>
              {branch.name} şubesi kurs tarihleri
            </h2>
            {page.courses.map((g) => (
              <div key={g.title} className={styles.courseGroup}>
                <h3 className={styles.courseTitle}>{g.title}</h3>
                <ul className={styles.courseList}>
                  {g.items.map((c) => (
                    <li key={c.href}>
                      <Link href={c.href} className={styles.courseLink}>
                        {c.label}
                        <UiIcon name="arrowRight" size={14} strokeWidth={2} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        </div>

        <section className={styles.section} aria-labelledby="sube-egitim">
          <h2 id="sube-egitim" className={styles.h2Small}>
            Dünya Dilleri Merkezi&apos;nde eğitim
          </h2>
          <ul className={styles.shared}>
            {page.shared.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className={styles.sharedLink}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="sube-ayrinti">
          <h2 id="sube-ayrinti" className={styles.h2Small}>
            Ayrıntılı bilgi
          </h2>
          <div className={styles.details}>
            {page.details.map((d) => (
              <details key={d.title} className={styles.detail} name="sube-ayrinti">
                <summary className={styles.detailSummary}>
                  {d.title}
                  <UiIcon name="caretDown" size={12} strokeWidth={1.8} className={styles.detailCaret} />
                </summary>
                <div className={styles.detailBody}>
                  <DetailParagraphs paragraphs={d.paragraphs} />
                </div>
              </details>
            ))}
          </div>
          <p className={styles.fine}>Son güncelleme: {page.updated.split("-").reverse().join(".")}</p>
        </section>
      </div>

      <CtaBand
        title={`${branch.name} şubemizle görüşün`}
        sub="Programlar, seviye ve kurs tarihleri için şubemize ulaşın."
        primary={{ label: "Bilgi Al", href: page.contactHref }}
        secondary={tel && branch.phone ? { label: branch.phone, href: tel } : undefined}
        ground="light"
      />
    </SiteChrome>
  );
}

function Tags({ tags, label, dark }: { tags: PromoTag[]; label: string; dark?: boolean }) {
  return (
    <ul className={dark ? styles.tagsDark : styles.tags} aria-label={label}>
      {tags.map((t) => (
        <li key={t.label}>
          {t.href ? (
            <Link href={t.href} className={styles.tagLink}>
              {t.label}
            </Link>
          ) : (
            <span className={styles.tag}>{t.label}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

function Block({ block: b }: { block: PromoResolvedBlock }) {
  const titleId = `${b.id}-baslik`;
  switch (b.kind) {
    case "intro":
      return (
        <section id={b.id} className={styles.section} aria-labelledby={titleId}>
          <h2 id={titleId} className={styles.h2}>
            {b.title}
          </h2>
          {b.sub && <p className={`${styles.sub} ${styles.cap}`}>{b.sub}</p>}
          <div className={styles.points}>
            {b.points.map((p) => (
              <article key={p.title} className={styles.point}>
                <span className={styles.pointIcon} aria-hidden="true">
                  <Icon name={p.icon} size={20} strokeWidth={1.7} />
                </span>
                <h3 className={styles.h3}>{p.title}</h3>
                <p className={styles.cap}>{p.text}</p>
              </article>
            ))}
          </div>
          {b.quote && (
            <figure className={b.quote.photo ? styles.quote : styles.quoteSolo}>
              {b.quote.photo && (
                <div className={styles.quotePhoto}>
                  <Image src={b.quote.photo.src} alt={b.quote.photo.alt} fill sizes="(max-width: 999px) 100vw, 320px" className={styles.cover} />
                </div>
              )}
              <blockquote className={styles.quoteText}>
                <p>“{b.quote.text}”</p>
                {b.quote.cite && <figcaption className={styles.quoteCite}>{b.quote.cite}</figcaption>}
              </blockquote>
            </figure>
          )}
        </section>
      );

    case "programs":
      return (
        <section id={b.id} className={styles.section} aria-labelledby={titleId}>
          <h2 id={titleId} className={styles.h2}>
            {b.title}
          </h2>
          {b.lead && <p className={`${styles.sub} ${styles.cap}`}>{b.lead}</p>}
          <div className={styles.columns}>
            {b.columns.map((c) => (
              <article key={c.title} className={styles.column}>
                <header className={styles.columnHead}>
                  <h3 className={styles.columnTitle}>{c.title}</h3>
                  {c.badge && <span className={`${styles.columnBadge} ${styles.cap}`}>{c.badge}</span>}
                </header>
                <dl className={styles.columnRows}>
                  {c.rows.map((row) => (
                    <div key={row.label} className={styles.columnRow}>
                      <dt>{row.label}</dt>
                      <dd className={styles.cap}>{row.text}</dd>
                    </div>
                  ))}
                </dl>
                <Tags tags={c.tags} label={`${c.title} kapsamı`} />
              </article>
            ))}
          </div>
          {b.approach && (
            <aside className={styles.approach}>
              {b.approach.title && <p className={styles.approachTitle}>{b.approach.title}</p>}
              <p className={styles.cap}>{b.approach.text}</p>
            </aside>
          )}
        </section>
      );

    case "highlights":
      return (
        <section id={b.id} className={b.tone === "navy" ? styles.panelNavy : styles.panelSky} aria-labelledby={titleId}>
          <div className={styles.panelHead}>
            <h2 id={titleId} className={styles.panelTitle}>
              {b.title}
            </h2>
            {b.lead && <p className={`${styles.panelLead} ${styles.cap}`}>{b.lead}</p>}
          </div>
          <ul className={styles.checks}>
            {b.items.map((it) => (
              <li key={it} className={styles.check}>
                {it}
              </li>
            ))}
          </ul>
          {b.byLanguage.length > 0 && (
            <dl className={styles.byLang}>
              {b.byLanguage.map((row) => (
                <div key={row.lang.label} className={styles.byLangRow}>
                  <dt>{row.lang.href ? <Link href={row.lang.href}>{row.lang.label}</Link> : row.lang.label}</dt>
                  <dd>
                    <Tags tags={row.exams} label={`${row.lang.label} sınavları`} dark />
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </section>
      );

    case "corporate":
      return (
        <section id={b.id} className={styles.corporate} aria-labelledby={titleId}>
          <div>
            <h2 id={titleId} className={styles.h2}>
              {b.title}
            </h2>
            <p className={styles.sub}>{b.text}</p>
          </div>
          {b.areas.length > 0 && (
            <ul className={styles.areas}>
              {b.areas.map((a) => (
                <li key={a} className={styles.area}>
                  {a}
                </li>
              ))}
            </ul>
          )}
          {b.clients.length > 0 && (
            <ul className={styles.clients} aria-label="Kurumsal eğitim verilen kurumlar">
              {b.clients.map((c) => (
                <li key={c} className={styles.client}>
                  {c}
                </li>
              ))}
            </ul>
          )}
        </section>
      );

    case "gallery":
      return (
        <section id={b.id} className={styles.section} aria-labelledby={titleId}>
          <h2 id={titleId} className={styles.h2}>
            Derslerimizden kareler
          </h2>
          <ul className={styles.strip}>
            {b.photos.map((p) => (
              <li key={p.src} className={styles.stripItem}>
                <Image src={p.src} alt={p.alt} fill sizes="(max-width: 999px) 78vw, 440px" className={styles.cover} />
              </li>
            ))}
          </ul>
        </section>
      );
  }
}

/** Ardışık "* " satırları tek listede; diğerleri paragraf. */
function DetailParagraphs({ paragraphs }: { paragraphs: string[] }) {
  const groups: (string | string[])[] = [];
  for (const p of paragraphs) {
    if (p.startsWith(BULLET)) {
      const last = groups[groups.length - 1];
      if (Array.isArray(last)) last.push(p.slice(BULLET.length));
      else groups.push([p.slice(BULLET.length)]);
    } else groups.push(p);
  }
  return groups.map((g, i) =>
    Array.isArray(g) ? (
      <ul key={i} className={styles.detailList}>
        {g.map((li) => (
          <li key={li}>{li}</li>
        ))}
      </ul>
    ) : (
      <p key={i}>{g}</p>
    ),
  );
}
