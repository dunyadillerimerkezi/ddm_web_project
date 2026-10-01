import Link from "next/link";

import { Icon, UiIcon } from "@/components/graphics/Icon";
import type { IconName } from "@/components/graphics/icons";
import { ButtonLink, Reveal } from "@/components/ui";
import type { ExamMeta, ExamSection } from "@/components/cards/ExamSectionCard";
import { ExamSectionGrid } from "./ExamStructure";
import { Answer, ProseBody, Row } from "./ExamRows";
import { Marked } from "./ExamText";
import { BRANCH_LIST } from "@/data/branches";
import type { UniversityExamInfo, UniversityExamPart } from "@/data/universityExams";
import type { UniversityDef, UniversityPage } from "@/lib/universityContent";
import rows from "@/styles/ExamRows.module.css";
import styles from "@/styles/UniversityBody.module.css";

/**
 * Proficiency üniversite sayfasının gövdesi (UI turu 2026-09-28, "A · sınav akışı").
 * Sınav sayfalarıyla aynı satır dili (`ExamRows`): tek beyaz zemin, solda yapışkan
 * başlık, sağda kısa cevap + kart. Sıra: sınav yapısı → sık sorulanlar (doğrulanmış
 * güncel bilgi, varsa) → sayfa metninin bölüm detayları (eskimiş satırlar
 * `data/universityExams.ts` `edits` ile güncel; doğrulanamayan ayrıntı kaldıysa başında
 * `caveat` notu) → kurs takvimi (şubeler + Bilgi Al; "tarih bekleniyor" tablosu yok).
 */

const PART_ICONS: [RegExp, IconName][] = [
  [/dinle|listening/i, "dinleme"],
  [/okuma|reading/i, "okuma"],
  [/yazma|writing|kompozisyon/i, "yazma"],
  [/konuşma|sözlü|speaking/i, "konusma"],
  [/kelime|vocab/i, "kelime"],
  [/dil ?bilgisi|dil kullanımı|grammar|use of/i, "dilbilgisi"],
  [/not alma/i, "yazma"],
];

function metaIcon(text: string): ExamMeta["icon"] {
  if (/dk|dakika/.test(text)) return "sure";
  if (/soru|madde/.test(text)) return "soru";
  if (/puan|%/.test(text)) return "puan";
  return "kisim";
}

/** Doğrulanmış güncel bölüm → sınav yapısı kartı. */
function partToSection(p: UniversityExamPart): ExamSection {
  const meta: ExamMeta[] = [
    ...(p.note ? p.note.split(" · ").map((t) => ({ icon: metaIcon(t), text: t })) : []),
    ...(p.weightLabel ? [{ icon: "puan" as const, text: p.weightLabel }] : []),
  ];
  return {
    name: p.name,
    skill: null,
    icon: PART_ICONS.find(([re]) => re.test(p.name))?.[1] ?? "belge",
    parts: meta.length > 0 ? [{ title: "", meta }] : [],
  };
}

/** Kaynak kartlarında "veri bekleniyor" rozeti basılmaz (kullanıcı, 2026-09-28). */
function withoutMissing(sections: ExamSection[]): ExamSection[] {
  return sections.map((s) => ({
    ...s,
    parts: s.parts
      .map((p) => ({ ...p, meta: p.meta.filter((m) => !m.missing) }))
      .filter((p) => p.meta.length > 0 || (p.title && p.title !== "Bölüm")),
  }));
}

export function UniversityBody({
  def,
  page,
  info,
}: {
  def: UniversityDef;
  page: UniversityPage;
  info: UniversityExamInfo | null;
}) {
  // Güncel bilgi varsa kartlar ondan; yoksa kaynak metnin kartları (+ bölüm detay çapaları).
  const sections = info ? info.parts.map(partToSection) : withoutMissing(page.sections);
  const detailIds = info ? sections.map(() => null) : page.sectionDetailIds;
  const structureTitle = page.structureTitle ?? `${def.name} İngilizce yeterlik sınavı`;
  const lead = info ? info.faq[0]?.answer ?? null : page.structureLead;

  return (
    <Reveal className={rows.body}>
      {sections.length > 0 && (
        <Row id="sinav-yapisi" kicker="SINAV YAPISI" title={structureTitle}>
          {lead && <Answer text={lead} />}
          {sections.every((s) => s.parts.length === 0) ? (
            // Yalnız bölüm adı biliniyorsa büyük boş kart yerine ikonlu kısa kutular.
            <ul className={rows.chips}>
              {sections.map((s) => (
                <li key={s.name} className={rows.chip}>
                  <span className={rows.chipIcon} aria-hidden="true">
                    <Icon name={s.icon} size={20} strokeWidth={1.7} />
                  </span>
                  {s.name}
                </li>
              ))}
            </ul>
          ) : (
            <ExamSectionGrid sections={sections} detailIds={detailIds} />
          )}
        </Row>
      )}

      {info && info.faq.length > 0 && (
        <Row id="sik-sorulanlar" kicker="SIK SORULANLAR" title={`${def.name} ${info.exam} hakkında`}>
          <div className={rows.cards}>
            {info.faq.map((f) => (
              <article key={f.question} className={rows.card}>
                <h3 className={rows.cardTitle}>{f.question}</h3>
                <p className={styles.qaAnswer}>
                  <Marked text={f.answer} />
                </p>
                {f.detail.map((d) => (
                  <p key={d} className={rows.cardText}>
                    {d}
                  </p>
                ))}
              </article>
            ))}
          </div>
          <p className={styles.source}>
            Kaynak: {info.source} (üniversitenin resmi sayfası ve sınav yönergesi) · {info.checked}
          </p>
        </Row>
      )}

      {page.details.map((d, i) => (
        <Row key={d.id} id={d.id} kicker="SINAV HAKKINDA" title={d.title}>
          {i === 0 && info?.caveat && <p className={styles.update}>{info.caveat}</p>}
          <ProseBody paragraphs={d.paragraphs} emphasis />
        </Row>
      ))}

      <Row id="kurs-takvimi" kicker="KURS TAKVİMİ" title={`${def.name} Proficiency Kursu Şube ve Takvimi`}>
        <Answer text="Bu eğitim aşağıdaki şubelerimizde sunulmaktadır. Size uygun şubeyi seçin; programı ve başlangıç tarihini birlikte planlayalım." />
        <ul className={styles.branches}>
          {BRANCH_LIST.map((b) => (
            <li key={b.slug}>
              <Link href={b.href} className={styles.branch}>
                <Icon name="konum" size={18} strokeWidth={1.7} />
                <span>{b.name}</span>
                <UiIcon name="arrowRight" size={12} className={styles.branchArrow} />
              </Link>
            </li>
          ))}
        </ul>
        <div>
          <ButtonLink href="/ddm-iletisim" variant="primary" size="lg" arrow>
            Bilgi Al
          </ButtonLink>
        </div>
      </Row>
    </Reveal>
  );
}
