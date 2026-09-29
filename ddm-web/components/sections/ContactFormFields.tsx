"use client";

import Link from "next/link";
import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";

import { Button, ButtonAnchor } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { BRANCH_LIST, BRANCHES, contactBranch, telHref, waHref } from "@/data/branches";
import type { CourseGroup } from "@/data/courseOptions";
import { FORM_ID } from "@/lib/formAnchor";
import type { ConsentParts } from "@/lib/kvkkConsent";
import type { BranchSlug } from "@/lib/types";
import styles from "@/styles/ContactForm.module.css";

/**
 * `ContactForm`'un istemci parçası (PF, 2026-09-29). Tek iş: seçilen şubeyi izlemek (paneldeki telefon / WhatsApp ve
 * not o şubeye döner) ve "Ön bilgi iste"ye basınca notu açmak. VERİ GÖNDERMEZ — arka uç gelince `onSubmit` değişecek
 * ve ÖNCE doğrulama eklenecek (`form.reportValidity()`; `required` alanlar + KVKK onayı). Şimdi doğrulanmıyor: form
 * zaten hiçbir şey göndermiyor, not bunu söylüyor.
 *
 * Hata görünümü hazır (arka uç için): alana `aria-invalid="true"` + `aria-describedby` → altına `styles.error` satırı.
 */

type Props = {
  size: "wide" | "narrow";
  ground: "gray" | "white";
  heading: string;
  lead: string;
  link: { label: string; href: string } | null;
  courses: CourseGroup[];
  course: string | null;
  branch: BranchSlug | null;
  consent: ConsentParts;
  kvkkHref: string;
  icons: { phone: ReactNode; wa: ReactNode };
  asks: ReactNode;
};

function Req() {
  return (
    <span className={styles.req} aria-hidden="true">
      *
    </span>
  );
}

function Opt() {
  return <span className={styles.opt}>isteğe bağlı</span>;
}

export function ContactFormFields({ size, ground, heading, lead, link, courses, course, branch, consent, kvkkHref, icons, asks }: Props) {
  const uid = useId();
  const f = (name: string) => `${uid}-${name}`;
  const [slug, setSlug] = useState<BranchSlug | "">(branch ?? "");
  const [sent, setSent] = useState(false);
  const notice = useRef<HTMLDivElement>(null);

  // Şube seçilmediyse merkez şube (site geneli iletişim noktası — `contactBranch`).
  const b = contactBranch(slug ? BRANCHES[slug] : undefined);
  const tel = telHref(b);
  const wa = waHref(b);
  const wide = size === "wide";
  const titleId = `${FORM_ID}-baslik`;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    // Not zaten açıksa da odağı ona taşı — ekran okuyucu yeniden okusun.
    requestAnimationFrame(() => notice.current?.focus());
  }

  const reach = (
    <div className={styles.reachRow}>
      {tel && (
        <ButtonAnchor variant="onDark" size="md" className={styles.act} href={tel}>
          {icons.phone}
          {b.phone}
        </ButtonAnchor>
      )}
      {wa && (
        <ButtonAnchor variant="outlineDark" size="md" className={styles.act} href={wa} target="_blank" rel="noopener noreferrer">
          {icons.wa}
          WhatsApp
        </ButtonAnchor>
      )}
    </div>
  );

  const form = (
    <form className={styles.form} onSubmit={onSubmit} noValidate aria-labelledby={titleId}>
      <Reveal className={styles.grid}>
        <div className={`${styles.field} ${styles.full}`} data-reveal>
          <label htmlFor={f("ad")}>
            Ad Soyad <Req />
          </label>
          <input className={styles.input} id={f("ad")} name="ad" autoComplete="name" required />
        </div>
        <div className={styles.field} data-reveal>
          <label htmlFor={f("tel")}>
            Telefon <Req />
          </label>
          <input
            className={styles.input}
            id={f("tel")}
            name="telefon"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="05xx xxx xx xx"
            required
          />
        </div>
        <div className={styles.field} data-reveal>
          <label htmlFor={f("eposta")}>
            E-posta <Opt />
          </label>
          <input
            className={styles.input}
            id={f("eposta")}
            name="eposta"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="ornek@eposta.com"
          />
        </div>
        <div className={styles.field} data-reveal>
          <label htmlFor={f("kurs")}>
            Kurs tercihi <Req />
          </label>
          <select className={`${styles.input} ${styles.select}`} id={f("kurs")} name="kurs" defaultValue={course ?? ""} required>
            <option value="" disabled>
              Kurs seçin
            </option>
            {courses.map((g) => (
              <optgroup key={g.label} label={g.label}>
                {g.options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div className={styles.field} data-reveal>
          <label htmlFor={f("sube")}>
            Şube <Req />
          </label>
          <select
            className={`${styles.input} ${styles.select}`}
            id={f("sube")}
            name="sube"
            value={slug}
            onChange={(e) => setSlug(e.target.value as BranchSlug | "")}
            required
          >
            <option value="" disabled>
              Şube seçin
            </option>
            {BRANCH_LIST.map((x) => (
              <option key={x.slug} value={x.slug}>
                {x.name}
              </option>
            ))}
          </select>
        </div>
        <div className={`${styles.field} ${styles.full}`} data-reveal>
          <label htmlFor={f("mesaj")}>
            Mesajınız <Opt />
          </label>
          <textarea
            className={`${styles.input} ${styles.textarea}`}
            id={f("mesaj")}
            name="mesaj"
            rows={3}
            placeholder="Örneğin hedef puanınız ya da uygun olduğunuz günler"
          />
        </div>
        <label className={`${styles.check} ${styles.full}`} data-reveal>
          <input type="checkbox" name="kvkk" required />
          <span>
            {consent[0]}
            {kvkkHref.startsWith("#") ? (
              <a href={kvkkHref}>{consent[1]}</a>
            ) : (
              // Yeni sekme: doldurulan form kaybolmasın.
              <Link href={kvkkHref} target="_blank">
                {consent[1]}
                <span className={styles.sr}> (yeni sekmede açılır)</span>
              </Link>
            )}
            {consent[2]} <Req />
          </span>
        </label>
        <div className={`${styles.foot} ${styles.full}`} data-reveal>
          <span className={styles.legend}>
            <Req /> zorunlu alan
          </span>
          <Button variant="primary" size="lg" className={styles.submit} type="submit">
            Ön bilgi iste
          </Button>
        </div>
      </Reveal>

      <div ref={notice} className={styles.notice} role="status" tabIndex={-1} hidden={!sent}>
        <strong>Form henüz açılmadı, bilgileriniz gönderilmedi.</strong>
        <span>
          Şimdilik <b>{b.name}</b> şubemize {wa ? "telefonla ya da WhatsApp'tan" : "telefonla"} ulaşın.
        </span>
        <span className={styles.noticeRow}>
          {tel && (
            <ButtonAnchor variant="primary" size="md" className={styles.act} href={tel}>
              {icons.phone}
              Ara · {b.phone}
            </ButtonAnchor>
          )}
          {wa && (
            <ButtonAnchor variant="primary" size="md" className={`${styles.act} ${styles.wa}`} href={wa} target="_blank" rel="noopener noreferrer">
              {icons.wa}
              WhatsApp&apos;tan yaz
            </ButtonAnchor>
          )}
        </span>
      </div>
    </form>
  );

  if (!wide) {
    return (
      <div className={styles.narrow} id={FORM_ID}>
        <div className={styles.narrowTop}>
          <h2 id={titleId} className={styles.narrowTitle}>
            {heading}
          </h2>
          {reach}
        </div>
        {form}
      </div>
    );
  }

  return (
    <section className={ground === "white" ? styles.sectionWhite : styles.section}>
      <div className={styles.card} id={FORM_ID}>
        <div className={styles.side}>
          <h2 id={titleId} className={styles.title}>
            {heading}
          </h2>
          <p className={styles.lead}>{lead}</p>
          {link && (
            <Link className={styles.more} href={link.href}>
              {link.label}
            </Link>
          )}
          <div className={styles.asks}>{asks}</div>
          <div className={styles.reach}>
            <p className={styles.reachLabel}>
              Beklemeden konuşmak için <b>{b.name}</b> şubemiz
            </p>
            {reach}
          </div>
        </div>
        {form}
      </div>
    </section>
  );
}
