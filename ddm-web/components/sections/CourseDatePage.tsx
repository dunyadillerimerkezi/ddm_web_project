import { SiteChrome } from "@/components/layout";
import { PageHero } from "./PageHero";
import { CtaBand } from "./CtaBand";
import { WeekGrid } from "./WeekGrid";
import { ProgramCard } from "@/components/cards/ProgramCard";
import { SectionHeading, DataMissingNotice, ButtonLink } from "@/components/ui";
import { BRANCHES, telHref } from "@/data/branches";
import type { CourseDatePage as CourseDatePageData } from "@/lib/types";
import { weekGridRows } from "@/lib/courseDateContent";
import pageSection from "@/styles/PageSection.module.css";
import styles from "@/styles/CourseDatePage.module.css";

/**
 * Şube Kurs Tarihi sayfa gövdesi — 3 route dosyasının (dil kursu / sınav
 * kursu / proficiency dağıtıcısı) paylaştığı tek şablon.
 *
 * Kaynak: `DDM Şube Kurs Tarihi Sayfası.dc.html`. Bölüm sırası DOM'daki gibi
 * (kullanıcı kararı, plan §3 karar 4 — markup'a sadık kalınır, vaat edilen
 * ama markup'ta hiç olmayan sticky kayıt kartı EKLENMEZ, tek kolon düzen
 * korunur). SSS bölümü (şablon satır 418-442) bilinçli olarak koda GİRMEDİ
 * (kullanıcı kararı 1 — kaynakta karşılığı olmayan 6 soru, 6.5 emsali).
 * ÜCRETLENDİRME (fiyat + "bilgi alın" CTA'sı) bilinçli olarak render
 * EDİLMİYOR (kullanıcı kararı 2) — bkz. `ProgramCard`.
 *
 * Not (dürüstçe): "Diğer Şubeler"/"Bu Şubedeki Diğer Kurslar" burada
 * `LinkRow` ile İKİ AYRI tam genişlik bölüm olarak render ediliyor —
 * şablonun kendisi bunları TEK bölümde 2 kolon yan yana gösteriyordu
 * (satır 486-535). `LinkRow` zaten bu sayfa tipi için yazılmış paylaşılan
 * bir bileşen ve 6.5'te de STANDALONE (tek bölüm) kullanıldı; aynı deseni
 * koruyoruz. Kart yapısı/boşluklar birebir, yalnız bu iki bölümün yan yana
 * mı stacked mi duracağı şablon-dışı bir mimari tercih.
 */
export function CourseDatePage({ page }: { page: CourseDatePageData }) {
  const branch = BRANCHES[page.branch];
  const rows = weekGridRows(page);
  const hasPrograms = page.programs.length > 0;

  return (
    <SiteChrome branch={branch} ctaLabel="Bilgi Al" ctaHref={branch.href}>
      <PageHero
        crumbs={page.crumbs}
        code={null}
        branchBadge={`${branch.name} Şubesi`}
        showCertBadge={false}
        outlineBadge={`${page.courseName} Kursu`}
        groupBadge={page.groupSize ? `Maksimum ${page.groupSize} kişilik grup` : null}
        titleSize="sube"
        h1={page.h1}
        lead={null}
        primary={{ label: "Bilgi Al", href: branch.href }}
        secondary={{ label: "Programları Gör", href: "#programlar" }}
        art={{ mode: "sube", name: "sube" }}
        stats={page.quickFacts}
      />

      <section id="programlar" className={pageSection.sectionLight}>
        <div className={pageSection.container}>
          <div className={styles.stack}>
            {page.intro.map((p) => (
              <p className={styles.intro} key={p}>
                {p}
              </p>
            ))}

            {hasPrograms ? (
              <div className={styles.programsBlock}>
                <div className={styles.programsHead}>
                  <SectionHeading kicker="DERS PROGRAMLARI" title={page.programsTitle} as="h2" />
                </div>
                <div className={styles.programGrid}>
                  {page.programs.map((block) => (
                    <ProgramCard block={block} href={branch.href} key={block.kind} />
                  ))}
                </div>
              </div>
            ) : (
              <DataMissingNotice
                label="VERİ EKSİK — DERS PROGRAMI"
                action={
                  telHref(branch) && (
                    <ButtonLink href={telHref(branch)!} variant="primary" size="sm" arrow>
                      Şubeyi Arayın
                    </ButtonLink>
                  )
                }
              >
                {branch.name} şubesi {page.courseName} Kursu için gün, saat ve ücret bilgisi henüz
                tanımlı değil. Güncel grup açılış tarihleri ve program seçenekleri için şubemizle
                iletişime geçin.
              </DataMissingNotice>
            )}

            {rows.length > 0 && (
              <div className={styles.weekGridBlock}>
                <SectionHeading title="Haftalık Ders Programı" as="h2" size="sm" />
                <WeekGrid rows={rows} />
              </div>
            )}
          </div>
        </div>
      </section>

      <CtaBand
        id="kayit"
        ground="gray"
        title={`${page.courseName} Kursu ${branch.name} programı için güncel bilgi alın.`}
        sub={branch.phone ? `${branch.phone} · ${branch.mail}` : branch.mail}
        primary={{ label: "Bilgi Al", href: branch.href }}
      />
    </SiteChrome>
  );
}
