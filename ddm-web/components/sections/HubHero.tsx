import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ButtonLink } from "@/components/ui";
import type { Crumb, NavLink } from "@/lib/types";
import styles from "@/styles/HubHero.module.css";

/**
 * P3 — kategori hub hero'su: solda büyük başlık + giriş, sağda `media`
 * (fotoğraf, selam duvarı…). Tüm hub'lar aynı iskeleti paylaşır; karakteri
 * `media` ve `tone` verir. `tone="dark"` = lacivert zemin (Kurumsal — B2B).
 *
 * LCP öğesi başlık/görsel olduğu için burada animasyon YOK.
 * `links`: kaynaktaki kısa link listesi — yalnız ÜRETİLMİŞ hedefler gelir.
 */
export function HubHero({
  tone = "light",
  crumbs,
  h1,
  lead,
  primary,
  secondary,
  links,
  linksLabel,
  note,
  media,
}: {
  tone?: "light" | "dark";
  crumbs: Crumb[];
  h1: string;
  lead: string | null;
  primary: NavLink & { href: string };
  secondary?: NavLink & { href: string };
  links?: { label: string; href: string }[];
  linksLabel?: string;
  /** Butonların altında küçük ek (partner logoları vb.). */
  note?: ReactNode;
  media: ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <section className={dark ? styles.sectionDark : styles.section}>
      <div className={styles.container}>
        <div className={styles.copy}>
          <Breadcrumb items={crumbs} tone={dark ? "onDark" : "onLight"} />
          <h1 className={styles.title}>{h1}</h1>
          {lead && <p className={styles.lead}>{lead}</p>}
          <div className={styles.actions}>
            <ButtonLink href={primary.href} variant={dark ? "onDark" : "primary"} size="lg">
              {primary.label}
            </ButtonLink>
            {secondary && (
              <ButtonLink href={secondary.href} variant={dark ? "outlineDark" : "outlineLight"} size="lg">
                {secondary.label}
              </ButtonLink>
            )}
          </div>
          {note}
          {links && links.length > 0 && (
            <div className={styles.links}>
              {linksLabel && <span className={styles.linksLabel}>{linksLabel}</span>}
              <ul className={styles.linkList}>
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={styles.link}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className={styles.media}>{media}</div>
      </div>
    </section>
  );
}

/** Hero fotoğrafı — `priority` (LCP), üstte isteğe bağlı sayı rozetleri, altta alt yazı. */
export function HubPhoto({
  src,
  alt,
  caption,
  width,
  height,
  stats,
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  stats?: { value: string; label: string }[];
}) {
  return (
    <figure className={styles.figure}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority
        sizes="(max-width: 899px) 100vw, 640px"
        className={styles.photo}
      />
      {stats && stats.length > 0 && (
        <dl className={styles.stats}>
          {stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <dt className={styles.statLabel}>{s.label}</dt>
              <dd className={styles.statValue}>{s.value}</dd>
            </div>
          ))}
        </dl>
      )}
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
