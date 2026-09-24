import Image from "next/image";
import Link from "next/link";

import { Flag, type FlagCode } from "@/components/graphics/Flag";
import { Reveal } from "@/components/ui";
import styles from "@/styles/HubLanguages.module.css";

/**
 * P3 — hub'larda dil gösterimi, üç biçim:
 *   - `GreetingWall`  Yabancı Dil hero'sunun görseli: her dil kendi selamıyla.
 *   - `LanguageTiles` Yabancı Dil'in ana ızgarası: fotoğraf + bayrak + alt linkler.
 *   - `LanguageStrip` diğer hub'ların sonundaki "19 dilde eğitim" şeridi.
 * Selamlar ve bayraklar `data/languages.ts`ten (6.4'te onaylı), fotoğraflar
 * `data/home.ts`ten gelir; burada veri üretilmez.
 */

export type LanguageLink = {
  name: string;
  href: string;
  flag: FlagCode | null;
  code: string;
  greeting: string;
};

export function GreetingWall({ items }: { items: LanguageLink[] }) {
  return (
    <ul className={styles.wall} aria-label="Dil kurslarımız">
      {items.map((l, i) => (
        <li key={l.href} className={i === 0 ? styles.wallTileLead : styles.wallTile}>
          <Link href={l.href} className={styles.wallLink}>
            <span className={styles.wallGreeting} lang={l.code.toLowerCase()}>
              {l.greeting}
            </span>
            <span className={styles.wallName}>
              {l.flag && <Flag code={l.flag} width={22} className={styles.wallFlag} />}
              {l.name}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export type LanguageTileData = LanguageLink & {
  image: { src: string; alt: string };
  links: { label: string; href: string }[];
};

export function LanguageTiles({ items }: { items: LanguageTileData[] }) {
  return (
    <Reveal className={styles.tiles}>
      {items.map((l) => (
        <article key={l.href} className={styles.tile} data-reveal>
          <div className={styles.tileMedia}>
            <Image src={l.image.src} alt={l.image.alt} fill sizes="(max-width: 619px) 100vw, (max-width: 1099px) 50vw, 320px" className={styles.tileImg} />
            <span className={styles.tileGreeting} lang={l.code.toLowerCase()}>
              {l.greeting}
            </span>
          </div>
          <div className={styles.tileBody}>
            <h3 className={styles.tileTitle}>
              {l.flag && <Flag code={l.flag} width={26} className={styles.tileFlag} />}
              <Link href={l.href} className={styles.tileLink}>
                {l.name}
              </Link>
            </h3>
            {l.links.length > 0 && (
              <ul className={styles.tileLinks}>
                {l.links.map((s) => (
                  <li key={s.label}>
                    <Link href={s.href} className={styles.tileSub}>
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </article>
      ))}
    </Reveal>
  );
}

export function LanguageStrip({
  id,
  label,
  title,
  lead,
  items,
  cta,
}: {
  id: string;
  /** Kaynaktaki küçük üst satır ("Diğer Dil Eğitim Programları"). */
  label?: string;
  title: string;
  lead?: string;
  items: LanguageLink[];
  cta?: { label: string; href: string } | null;
}) {
  return (
    <section id={id} className={styles.strip} aria-labelledby={`${id}-baslik`}>
      <div className={styles.stripInner}>
        <div className={styles.stripHead}>
          {label && <p className={styles.stripLabel}>{label}</p>}
          <h2 id={`${id}-baslik`} className={styles.stripTitle}>
            {title}
          </h2>
          {lead && <p className={styles.stripLead}>{lead}</p>}
        </div>
        <ul className={styles.chips}>
          {items.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={styles.chip}>
                {l.flag && <Flag code={l.flag} width={22} />}
                {l.name}
              </Link>
            </li>
          ))}
        </ul>
        {cta && (
          <Link href={cta.href} className={styles.stripCta}>
            {cta.label}
          </Link>
        )}
      </div>
    </section>
  );
}
