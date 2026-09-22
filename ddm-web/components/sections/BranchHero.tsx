import { Breadcrumb } from "@/components/layout";
import { ButtonLink } from "@/components/ui";
import { Illustration } from "@/components/graphics/Illustration";
import type { Crumb, NavLink } from "@/lib/types";
import styles from "@/styles/PageHero.module.css";

/**
 * Şube İletişim hero'su (P1). `PageHero`nun aynı görsel dilini (lacivert
 * zemin, glow, kırıntı, "sube" ölçekli H1, illüstrasyon) `styles/PageHero.module.css`
 * SINIFLARINI DOĞRUDAN yeniden kullanarak üretir — ama `PageHero`nun kendisini
 * çağırmaz, çünkü o bileşen kurs sayfalarına özgü alanlar zorunlu kılıyor
 * (`stats: HomeStat[]` zorunlu, kod/rozet mantığı kurs odaklı). Bu sayfa
 * tipinde gerçek bir "sayaç" verisi yok — uydurmamak için ayrı, sade bir
 * bileşen (CLAUDE.md §9: tasarım turu kararı verilene kadar mevcut token/atom).
 */
export function BranchHero({
  crumbs,
  h1,
  lead,
  primary,
  secondary,
}: {
  crumbs: Crumb[];
  h1: string;
  lead?: string | null;
  primary?: NavLink;
  secondary?: NavLink;
}) {
  return (
    <section className={styles.section}>
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.crumbWrap}>
        <Breadcrumb items={crumbs} />
      </div>

      <div className={styles.grid}>
        <div className={styles.intro}>
          <h1 className={styles.titleSube}>{h1}</h1>
          {lead && <p className={styles.lead}>{lead}</p>}

          {(primary?.href || secondary?.href) && (
            <div className={styles.actions}>
              {primary?.href && (
                <ButtonLink href={primary.href} variant="onDark" size="lg" arrow>
                  {primary.label}
                </ButtonLink>
              )}
              {secondary?.href && (
                <ButtonLink href={secondary.href} variant="outlineDark" size="lg">
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
          )}
        </div>

        <div className={`${styles.art} ${styles.artSube}`} aria-hidden="true">
          <Illustration name="sube" glow="circle" maxWidth={340} />
        </div>
      </div>
    </section>
  );
}
