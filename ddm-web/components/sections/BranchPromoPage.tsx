import Image from "next/image";
import Link from "next/link";

import { SiteChrome } from "@/components/layout";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Icon, UiIcon } from "@/components/graphics/Icon";
import { ContactForm } from "@/components/sections/ContactForm";
import { FORM_HREF } from "@/lib/formAnchor";
import { BranchMap } from "@/components/sections/BranchMap";
import { TransitList } from "@/components/sections/TransitList";
import { ButtonLink } from "@/components/ui";
import { PageLink } from "@/components/ui/PageLink";
import { ALL_BRANCHES_LINE, ALL_BRANCHES_OFFER, telHref, waHref } from "@/data/branches";
import { SINCE_FOUNDING, yearsSinceFounding } from "@/data/company";
import { OFFER_IDS, type BranchPromoPage as PageData, type PromoResolvedBlock, type PromoTag } from "@/lib/branchPromoContent";
import styles from "@/styles/BranchPromoPage.module.css";

const COURSES_ID = "kurs-tarihleri";
const VISIT_ID = "ulasim";
/** Kaynakta "* " ile başlayan satırlar madde işaretli liste (Levent) — "Ayrıntılı bilgi"de liste olarak gösterilir. */
const BULLET = "* ";

/**
 * P6 — Şube tanıtım sayfası (kullanıcı, 2026-09-28: "B · şube künyesi"). Açık hero + sağda şubenin künye kartı
 * (semt fotoğrafı, adres / telefon `data/branches.ts`'ten, şubeye özgü iki satır, en yakın ulaşım); gövde şubenin
 * kendi blok dizisi (`blocks`: tanıtım kartları, program sütunları, madde panelleri, kurumsal, ders fotoğrafları) →
 * ulaşım + gömülü harita / şubenin kurs tarihi sayfaları → dört sayfada AYNI "Dünya Dilleri Merkezi'nde eğitim" bölümü
 * (19 dil + sınav hazırlık listesi, 6 ortak başlık — müşteri kararı 2026-09-30: liste şubeye göre değişmez, bu yüzden
 * şubeyi anlatan blokların içinde değil sonda) → kaynak metnin tamamı "Ayrıntılı bilgi"de → CTA.
 * Tek hareket: künye kartı açılışta bir kez yükselir (reduced-motion'da yok). Zeminler sırayla gri/beyaz dönmez.
 * İletişim sayfasıyla (P1) bilinçli ayrım: burada form yok, adres/telefon yalnız künyede; iki sayfa birbirine bağlanır.
 */
export function BranchPromoPage({ page }: { page: PageData }) {
  const { branch, hero } = page;
  const tel = telHref(branch);
  const wa = waHref(branch);
  const nearest = page.visit.transit[0];

  return (
    <SiteChrome branch={branch} ctaLabel="Bilgi Al">
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.copy}>
            <Breadcrumb items={page.crumbs} tone="onLight" />
            <h1 className={styles.title}>{page.h1}</h1>
            <p className={styles.lead}>{hero.lead}</p>
            <div className={styles.actions}>
              <ButtonLink href={FORM_HREF} variant="primary" size="lg" arrow>
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
              {/* Tüm şubelerde aynı iki bilgi (kullanıcı, 2026-10-01) — `data/branches.ts` / `data/company.ts`. */}
              <div className={styles.cardRow}>
                <dt>Eğitimler</dt>
                <dd>
                  <a href={`#${OFFER_IDS.languages}`}>{ALL_BRANCHES_OFFER}</a>
                </dd>
              </div>
              <div className={styles.cardRow}>
                <dt>Deneyim</dt>
                <dd>
                  {SINCE_FOUNDING} · {yearsSinceFounding()} yıl
                </dd>
              </div>
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
          <p className={styles.sub}>{ALL_BRANCHES_LINE}</p>
          <div className={styles.offer}>
            <div id={OFFER_IDS.languages} className={styles.offerGroup}>
              <h3 className={styles.offerTitle}>{page.offer.languages.length} dil</h3>
              <Tags tags={page.offer.languages} label="Eğitim verilen diller" />
            </div>
            <div id={OFFER_IDS.exams} className={styles.offerGroup}>
              <h3 className={styles.offerTitle}>Sınav hazırlık</h3>
              <Tags tags={page.offer.exams} label="Sınav hazırlık kursları" />
            </div>
          </div>
          <ul className={styles.shared}>
            {page.shared.map((l) => (
              <li key={l.label}>
                {l.href ? (
                  <Link href={l.href} className={styles.sharedLink}>
                    {l.label}
                  </Link>
                ) : (
                  <span className={styles.sharedText}>{l.label}</span>
                )}
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

      <ContactForm
        ground="white"
        title={`${branch.name} şubemizle görüşün`}
        lead="Programlar, seviye ve kurs tarihleri için şubemize ulaşın."
        branch={branch.slug}
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
                <PageLink href={c.more.href} className={styles.columnMore}>
                  {c.more.label}
                  <UiIcon name="arrowRight" size={14} strokeWidth={2} />
                </PageLink>
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
