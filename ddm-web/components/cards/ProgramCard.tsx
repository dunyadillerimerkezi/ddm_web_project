import { Icon } from "@/components/graphics/Icon";
import { ButtonLink } from "@/components/ui/Button";
import { DayBadge, DAYS } from "@/components/ui/Primitives";
import type { ProgramBlock } from "@/lib/types";
import styles from "@/styles/ProgramCard.module.css";

/**
 * Program kartı — hafta içi / hafta sonu / birebir özel ders bloğu.
 *
 * Kaynak: `DDM Şube Kurs Tarihi Sayfası.dc.html` bölüm 5 (satır 251-368).
 * `kind` zemin/aksanı belirler ("birebir" açık mavi, diğerleri lacivert
 * aksanlı gri) — `DayBadge`nin `kind` prop'uyla birebir aynı sözleşme.
 *
 * KARAR (kullanıcı onayı): ücret satırı (şablonun 336-363. satırları)
 * bilinçli olarak render EDİLMİYOR — "Güncel ücret için bilgi alın" CTA'sı
 * da yok. Kartın kendi kayıt CTA'sı (`block.ctaLabel`) bu karardan ayrı,
 * yerinde kalıyor (o fiyat CTA'sı değil, kartın eylemi).
 */
export function ProgramCard({ block }: { block: ProgramBlock }) {
  const special = block.kind === "birebir";

  return (
    <article className={`${styles.card} ${special ? styles.cardBirebir : styles.cardGroup}`}>
      <div className={styles.head}>
        <div className={styles.titleBlock}>
          <span className={special ? styles.kickerBirebir : styles.kicker}>{block.kicker}</span>
          <h3 className={styles.title}>{block.title}</h3>
        </div>
        <span className={special ? styles.iconTileBirebir : styles.iconTile}>
          <Icon name={block.icon} size={22} strokeWidth={1.8} />
        </span>
      </div>

      {block.days.length > 0 && (
        <div className={styles.field}>
          <span className={styles.fieldLabel}>GÜNLER</span>
          <div className={styles.dayRow}>
            {DAYS.map((d) => (
              <DayBadge key={d.key} day={d} active={block.days.includes(d.key)} kind={block.kind} />
            ))}
          </div>
        </div>
      )}

      {block.slots.length > 0 && (
        <div className={styles.field}>
          <span className={styles.fieldLabel}>SAATLER</span>
          <div className={styles.slotList}>
            {block.slots.map((s) => (
              <div className={styles.slot} key={s.name}>
                <span className={styles.slotName}>
                  <Icon name="saat" size={15} strokeWidth={1.8} className={styles.slotIcon} />
                  {s.name}
                </span>
                <span className={styles.slotRange}>
                  {s.start} – {s.end}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {block.hoursNote && (
        <div className={styles.field}>
          <span className={styles.fieldLabel}>GÜNLER VE SAATLER</span>
          <p className={styles.hoursNote}>{block.hoursNote}</p>
        </div>
      )}

      {block.startDate && (
        <div className={styles.field}>
          <span className={styles.fieldLabel}>BAŞLANGIÇ TARİHİ</span>
          <p className={styles.hoursNote}>{block.startDate}</p>
        </div>
      )}

      {block.specs.length > 0 && (
        <div className={styles.field}>
          <span className={styles.fieldLabel}>PROGRAM DETAYLARI</span>
          <div className={styles.chipRow}>
            {block.specs.map((sp) => (
              <span className={styles.chip} key={sp.text}>
                <Icon name={sp.icon} size={13} strokeWidth={1.8} />
                {sp.text}
              </span>
            ))}
          </div>
        </div>
      )}

      {block.study.length > 0 && (
        <div className={styles.field}>
          <span className={styles.fieldLabel}>ETÜTLER</span>
          <div className={styles.studyRow}>
            {block.study.map((s) => (
              <span className={styles.studyTag} key={s}>
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {block.note && <p className={styles.note}>{block.note}</p>}

      <div className={styles.footer}>
        <ButtonLink href="#kayit" variant="primary" size="sm" arrow>
          {block.ctaLabel}
        </ButtonLink>
      </div>
    </article>
  );
}
