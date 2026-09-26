import Image from "next/image";

import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Icon } from "@/components/graphics/Icon";
import { ButtonLink } from "@/components/ui";
import type { RichPage } from "@/lib/richContent";
import type { NavLink } from "@/lib/types";
import styles from "@/styles/RichHero.module.css";

/**
 * P4 — Zengin İçerik hero'su (onaylanan "B · seviye merdiveni" yönü, 2026-09-24).
 * Lacivert zemin, sağda kenara taşan fotoğraf (dilin şehri) — soldan zemine
 * erir. Sayfanın ilk bölümü: header'ın arkasından başlar (globals.css), fotoğraf
 * da header payı kadar yukarı uzanır.
 *
 * LCP öğesi (başlık + fotoğraf) — burada animasyon yok.
 */
export function RichHero({
  page,
  primary,
  secondary,
}: {
  page: RichPage;
  primary: NavLink & { href: string };
  secondary: NavLink & { href: string };
}) {
  const { hero } = page;
  return (
    <section className={styles.section}>
      <div className={styles.photo}>
        <Image
          src={hero.photo.src}
          alt={hero.photo.alt}
          width={hero.photo.width}
          height={hero.photo.height}
          priority
          sizes="(max-width: 999px) 100vw, 60vw"
          className={styles.img}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.copy}>
          <Breadcrumb items={page.crumbs} tone="onDark" />
          <h1 className={styles.title}>{page.h1}</h1>
          <p className={styles.lead}>{hero.lead}</p>
          <div className={styles.actions}>
            <ButtonLink href={primary.href} variant="onDark" size="lg" arrow>
              {primary.label}
            </ButtonLink>
            <ButtonLink href={secondary.href} variant="outlineDark" size="lg">
              {secondary.label}
            </ButtonLink>
          </div>
          {hero.facts.length > 0 && (
            <ul className={styles.facts}>
              {hero.facts.map((f) => (
                <li key={f.label} className={styles.fact}>
                  <Icon name={f.icon} size={20} className={styles.factIcon} />
                  {f.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
