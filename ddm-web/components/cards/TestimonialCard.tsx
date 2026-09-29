import Image from "next/image";

import type { StudentTestimonial, Testimonial } from "@/lib/types";
import styles from "@/styles/TestimonialCard.module.css";

/**
 * Öğrenci yorumu kartı — iki görünüm:
 *  - `slide` (varsayılan): Ana Sayfa kaydırıcısı (`DDM Ana Sayfa.dc.html` bölüm 9).
 *  - `wall` (P7, "C · portre duvarı"): `/ogrenci-yorumlari` ızgarası — başta fotoğraf / baş harf karesi, ad, okul ya da
 *    program; altında sabit satırda kesilen alıntı, etiketler, "Devamını oku".
 *
 * Kart büyümez: tam metin `popover` penceresinde açılır (tarayıcının kendi davranışı — JS yok; Esc ve dışarı tıklama
 * kapatır). Öğrencinin metni birebir; kesme yalnız CSS (`--ddm-review-lines`).
 */
export function TestimonialCard({
  item,
  variant = "slide",
}: {
  item: Testimonial | StudentTestimonial;
  variant?: "slide" | "wall";
}) {
  const full = "paragraphs" in item ? item : null;
  const popId = full ? `yorum-${full.id}-tam` : undefined;

  if (variant === "wall" && full) {
    return (
      <figure className={styles.wall} id={`yorum-${full.id}`} data-filters={full.filters.join(" ")} data-reveal="">
        <figcaption className={styles.wallHead}>
          <Avatar item={full} size="lg" />
          <span className={styles.who}>
            <span className={styles.name}>{full.name}</span>
            <span className={styles.role}>{full.role}</span>
          </span>
        </figcaption>
        <blockquote className={styles.wallQuote} lang={full.lang}>
          {full.quote}
        </blockquote>
        <div className={styles.wallFoot}>
          {full.tags.length > 0 && (
            <ul className={styles.tags} aria-label="Program">
              {full.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}
          <MoreButton target={popId!} name={full.name} />
        </div>
        <FullText item={full} id={popId!} />
      </figure>
    );
  }

  return (
    <figure className={styles.card}>
      <span className={styles.quoteMark} aria-hidden="true">
        “
      </span>
      <blockquote className={full ? `${styles.quote} ${styles.clamp}` : styles.quote} lang={full?.lang}>
        {item.quote}
      </blockquote>
      {full && <MoreButton target={popId!} name={full.name} />}
      {/* Pencere figcaption'dan önce: figcaption figure'ın son çocuğu kalmalı (HTML içerik modeli). */}
      {full && <FullText item={full} id={popId!} />}
      <figcaption className={styles.caption}>
        <Avatar item={item} size="sm" />
        <span className={styles.who}>
          <span className={styles.name}>{item.name}</span>
          <span className={styles.role}>{item.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/** next/image `sizes` — `--ddm-review-photo` / `--ddm-review-photo-sm` token'larıyla aynı tutulur (CSS değişkeni `sizes`'a girmez). */
const PHOTO_SIZES = { lg: "72px", sm: "56px" } as const;

function Avatar({ item, size }: { item: Testimonial; size: "sm" | "lg" }) {
  const box = size === "lg" ? styles.photoLg : styles.photoSm;
  if (!item.photo) {
    return (
      <span className={`${box} ${styles.initials}`} aria-hidden="true">
        {item.initials}
      </span>
    );
  }
  return (
    <span className={box}>
      <Image
        src={item.photo.src}
        alt=""
        fill
        sizes={PHOTO_SIZES[size]}
        className={styles.photoImg}
        style={item.photo.focus ? { objectPosition: item.photo.focus } : undefined}
      />
    </span>
  );
}

function MoreButton({ target, name }: { target: string; name: string }) {
  return (
    <button type="button" className={styles.more} popoverTarget={target} aria-label={`Devamını oku: ${name}`}>
      Devamını oku
      <span aria-hidden="true" className={styles.moreArrow}>
        ›
      </span>
    </button>
  );
}

function FullText({ item, id }: { item: StudentTestimonial; id: string }) {
  return (
    <div className={styles.pop} id={id} popover="auto" role="dialog" aria-label={`${item.name}, öğrenci yorumu`}>
      <button type="button" className={styles.close} popoverTarget={id} popoverTargetAction="hide" aria-label="Kapat">
        <span aria-hidden="true">×</span>
      </button>
      <div className={styles.popHead}>
        <Avatar item={item} size="sm" />
        <span className={styles.who}>
          <span className={styles.name}>{item.name}</span>
          <span className={styles.role}>{item.role}</span>
        </span>
      </div>
      <div className={styles.popBody} lang={item.lang}>
        {item.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {item.sign.length > 0 && (
          <p className={styles.sign}>
            {item.sign.map((line, i) => (
              <span key={i}>{line}</span>
            ))}
          </p>
        )}
      </div>
    </div>
  );
}
