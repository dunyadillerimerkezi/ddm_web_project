import Image from "next/image";

import { Breadcrumb } from "@/components/layout";
import { ButtonLink, Badge } from "@/components/ui";
import { Icon } from "@/components/graphics/Icon";
import { Illustration, type IllustrationName } from "@/components/graphics/Illustration";
import { Flag, type FlagCode } from "@/components/graphics/Flag";
import { StatStrip } from "./StatStrip";
import type { Crumb, NavLink } from "@/lib/types";
import type { HomeStat } from "@/data/home";
import styles from "@/styles/PageHero.module.css";

export type PageHeroArt =
  | {
      mode?: "lang";
      name: IllustrationName;
      /** null → `speak` gibi bayrağı olmayan dil; sohbet ikonuna düşer. */
      flag: FlagCode | null;
      greeting: string;
      skill: string;
      /** "A1 → C2" — seviye ölçeği kaynakta geçmiyorsa null (çip düşer). */
      scale: string | null;
    }
  | {
      /** Faz 6.5 — üniversite illüstrasyonu: 2 motif çipi + sabit 3. çip
       *  ("Hazırlık atlama", tüm üniversitelerde aynı — uydurma değil,
       *  sayfanın kendi konusu). */
      mode: "uni";
      name: IllustrationName;
      chip1: string;
      chip2: string;
    }
  | {
      /** Faz 6.6 — şube kurs tarihi illüstrasyonu: tek motif (takvim+saat),
       *  hiç çip yok — şube/kurs/grup rozetleri zaten üstteki `badgeRow`da. */
      mode: "sube";
      name: IllustrationName;
    };

/**
 * İç sayfa hero'su — lacivert zemin, kırıntı + rozetler + H1 + CTA çifti +
 * dil illüstrasyonu + gömülü (inset) güven şeridi.
 *
 * Kaynak: `DDM Dil Kursu Sayfası.dc.html` bölüm 1+2+3. Faz 6.5/6.6 aynı
 * bileşeni (farklı `art`/`stats` ile) yeniden kullanacak — `.art` ≤619px'te
 * `Illustration`in kendi media query'siyle gizlenir, çipler onunla birlikte
 * (bkz. `styles/PageHero.module.css`).
 */
export function PageHero({
  crumbs,
  code,
  codeVariant = "square",
  branchBadge,
  showCertBadge,
  outlineBadge,
  groupBadge,
  titleSize = "lang",
  h1,
  lead,
  primary,
  secondary,
  art,
  photo,
  stats,
}: {
  crumbs: Crumb[];
  /** null → kaynakta sınav kodu yok (11/19 üniversite); rozet hiç basılmaz. */
  code: string | null;
  /** "square" = dil kursu 44×44 kare (varsayılan) · "pill" = Faz 6.5 yatay
   *  dolgulu rozet — 5-6 karakterli sınav kodları (BUEPT, DÜİYES) için. */
  codeVariant?: "square" | "pill";
  /** Nokta+etiket rozeti — o dilin GERÇEKTEN doğrulanmış şube sayısından
   *  türetilir (`page.branchLinks.branch.length`). null → şube plan tablosu
   *  olmayan dillerde (en, nl) rozet hiç basılmaz — uydurma sayı yok. */
  branchBadge: string | null;
  /** Kaynakta o dilin sertifikası M.E.B onaylı olarak GEÇMİYORSA (İngilizce
   *  Konuşma) rozet hiç basılmaz — uydurma iddia yok (CLAUDE.md §5). */
  showCertBadge: boolean;
  /** Faz 6.5 — üçüncü (outline) rozet için serbest metin, ör. "5 şubede".
   *  undefined → basılmaz (dil kursu sayfası bunu hiç geçmez). */
  outlineBadge?: string | null;
  /** Faz 6.6 — dördüncü (outline) rozet: "Maksimum 6 kişilik grup".
   *  null → basılmaz (kaynakta grup büyüklüğü çözülmediğinde uydurulmaz). */
  groupBadge?: string | null;
  /** "lang" = dil kursu H1 ölçeği (varsayılan) · "uni" = Faz 6.5 küçültülmüş
   *  ölçek · "sube" = Faz 6.6 şube kurs tarihi ölçeği. */
  titleSize?: "lang" | "uni" | "sube";
  h1: string;
  lead: string | null;
  primary: NavLink;
  secondary: NavLink;
  art: PageHeroArt;
  /** UI turu (2026-09-25, Dil Kursu): verilirse illüstrasyon yerine sağda
   *  kenara taşan fotoğraf (P4 özel ders hero'su gibi) — sola ve aşağı doğru
   *  lacivert zemine yumuşakça erir; ≤999px metnin altında şerit. */
  photo?: { src: string; alt: string };
  stats: HomeStat[];
}) {
  return (
    <section className={photo ? `${styles.section} ${styles.withPhoto}` : styles.section}>
      {!photo && <div className={styles.glow} aria-hidden="true" />}

      <div className={styles.stage}>
        <div className={styles.crumbWrap}>
          <Breadcrumb items={crumbs} />
        </div>

        <div className={styles.grid}>
          <div className={styles.intro}>
            <div className={styles.badgeRow}>
              {code &&
                (codeVariant === "pill" ? (
                  <span className={styles.codePill}>{code}</span>
                ) : (
                  <span className={styles.codeBadge}>{code}</span>
                ))}
              {branchBadge && (
                <Badge variant="accent">
                  <span className={styles.dot} aria-hidden="true" />
                  {branchBadge}
                </Badge>
              )}
              {showCertBadge && <Badge variant="outline">M.E.B onaylı sertifika</Badge>}
              {outlineBadge && <Badge variant="outline">{outlineBadge}</Badge>}
              {groupBadge && <Badge variant="outline">{groupBadge}</Badge>}
            </div>

            <h1
              className={titleSize === "uni" ? styles.titleUni : titleSize === "sube" ? styles.titleSube : styles.title}
            >
              {h1}
            </h1>
            {lead && <p className={styles.lead}>{lead}</p>}

            <div className={styles.actions}>
              {primary.href && (
                <ButtonLink href={primary.href} variant="onDark" size="lg" arrow>
                  {primary.label}
                </ButtonLink>
              )}
              {secondary.href && (
                <ButtonLink href={secondary.href} variant="outlineDark" size="lg">
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
          </div>

          {!photo && (
            <div className={art.mode === "sube" ? `${styles.art} ${styles.artSube}` : styles.art} aria-hidden="true">
              <Illustration name={art.name} glow="circle" maxWidth={art.mode === "sube" ? 340 : 430} />
              {art.mode === "uni" ? (
                <>
                  <span className={`${styles.chip} ${styles.chipGreeting}`}>{art.chip1}</span>
                  <span className={`${styles.chip} ${styles.chipSkill}`}>{art.chip2}</span>
                  <span className={`${styles.chip} ${styles.chipScale}`}>Hazırlık atlama</span>
                </>
              ) : art.mode === "sube" ? null : (
                <>
                  <span className={`${styles.chip} ${styles.chipGreeting}`}>
                    {art.flag ? (
                      <Flag code={art.flag} width={18} className={styles.chipFlag} />
                    ) : (
                      <Icon name="sohbet" size={16} strokeWidth={1.8} className={styles.chipBubble} />
                    )}
                    {art.greeting}
                  </span>
                  <span className={`${styles.chip} ${styles.chipSkill}`}>{art.skill}</span>
                  {art.scale && <span className={`${styles.chip} ${styles.chipScale}`}>{art.scale}</span>}
                </>
              )}
            </div>
          )}
        </div>

        {photo && (
          <div className={styles.photo}>
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              preload
              sizes="(max-width: 999px) 100vw, 60vw"
              className={styles.photoImg}
            />
          </div>
        )}
      </div>

      <StatStrip items={stats} variant="inset" />
    </section>
  );
}
