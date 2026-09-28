import type { ReactNode } from "react";

import { Icon, UiIcon } from "@/components/graphics/Icon";
import type { IconName } from "@/components/graphics/icons";
import { Accordion, Kicker } from "@/components/ui";
import { FactCardGrid } from "./FactCards";
import { ExamSectionGrid } from "./ExamStructure";
import { BranchDateList } from "./BranchDateRows";
import { ExamTabs, type ExamTabGroup } from "./ExamTabs";
import { Marked, isQuestion, joinFragments, splitLabel } from "./ExamText";
import type { ExamBlock, ListHint } from "@/lib/examContent";
import styles from "@/styles/ExamRows.module.css";

/**
 * Sınav Hazırlık sayfasının gövdesi (UI turu 2026-09-28, "A · optik form").
 * Her blok bir SATIR: solda yapışkan kicker + başlık, sağda içerik. İçerik
 * türüne göre biçim seçilir; metin kaynaktaki gibi kalır:
 *   - düz metin → ilk paragraf kalın "kısa cevap", 3 paragraftan fazlası
 *     "Ayrıntılı bilgi"de; metindeki soru satırları kart başlığı olur;
 *   - kısa maddeler → ikonlu seçenek kartları; uzun maddeler → bilgi kartları;
 *   - veride grup başlığı verilmişse → sekmeler ya da yan yana grup kartları.
 */

/** Bu kadar paragraf görünür kalır; fazlası (en az 2 ise) açılır kutuya girer. */
const VISIBLE_PARAGRAPHS = 3;
/** Kısa cevap olarak kalın basılacak ilk paragrafın üst sınırı. */
const ANSWER_MAX = 240;
/** Daha uzun ilk paragrafta yalnız ilk cümle kalın olur — bu uzunluğa kadar. */
const ANSWER_SENTENCE_MAX = 200;
/** Bu uzunluğa kadar tüm maddeler kısaysa ikonlu seçenek kartları. */
const CHIP_MAX = 60;

/** Seçenek kartı ikonu — madde metnindeki anahtar kelimeden (süsleme, aria-hidden). */
const OPTION_ICONS: [RegExp, IconName][] = [
  [/online.*grup/i, "ekran"],
  [/online/i, "kamera"],
  [/bire ?bir/i, "ozelders"],
  [/sesli|speaking|konuşma|tekrar/i, "konusma"],
  [/writing|yazma|özet/i, "yazma"],
  [/reading|okuma/i, "okuma"],
  [/listening|dinleme/i, "dinleme"],
  [/strateji|taktik/i, "puan"],
  [/sertifika/i, "mezuniyet"],
  [/koç|plan/i, "sohbet"],
  [/görüntü|fotoğraf/i, "foto"],
  [/tanıtım/i, "sohbet"],
  [/seviye|sınav|belge|nüfus|cüzdan|kağıt|pasaport|form/i, "belge"],
];

function optionIcon(text: string): IconName {
  return OPTION_ICONS.find(([re]) => re.test(text))?.[1] ?? "calisma";
}

/* ---------------------------------------------------------------
 * Parçalar
 * ------------------------------------------------------------- */

export function Answer({ text }: { text: string }) {
  return (
    <p className={styles.answer}>
      <Marked text={text} />
    </p>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return items.map((p) => (
    <p key={p} className={styles.text}>
      <Marked text={p} />
    </p>
  ));
}

function More({ children }: { children: ReactNode }) {
  return (
    <details className={styles.more}>
      <summary className={styles.moreSummary}>
        Ayrıntılı bilgi
        <UiIcon name="caretDown" size={12} className={styles.moreCaret} />
      </summary>
      <div className={styles.moreBody}>{children}</div>
    </details>
  );
}

/** İlk paragrafın ilk cümlesi — kalın kısa cevap olacak kadar kısaysa. Paragrafın
 *  kalanı hemen altında normal metin olarak devam eder (kelime değişmez). */
function leadSentence(first: string): [string, string | null] | null {
  const [sentence, ...rest] = first.split(/(?<=[.!?])\s+(?=\p{Lu})/u);
  if (sentence.length > ANSWER_SENTENCE_MAX) return null;
  return [sentence, rest.length > 0 ? rest.join(" ") : null];
}

/** Düz paragraf akışı: kısa ilk paragraf (ya da uzun paragrafın ilk cümlesi) kalın
 *  cevap, kalanı görünür / açılır. */
function Flow({ paragraphs, emphasis = true }: { paragraphs: string[]; emphasis?: boolean }) {
  const [first, ...rest] = paragraphs;
  if (first === undefined) return null;
  const split = !emphasis ? null : first.length <= ANSWER_MAX ? ([first, null] as const) : leadSentence(first);
  const lead = split ? <Answer text={split[0]} /> : null;
  const all = split ? (split[1] ? [split[1], ...rest] : rest) : paragraphs;
  const shown = VISIBLE_PARAGRAPHS - (lead ? 1 : 0);
  const hidden = all.length - shown >= 2 ? all.slice(shown) : [];
  const visible = hidden.length > 0 ? all.slice(0, shown) : all;
  return (
    <>
      {lead}
      <Paragraphs items={visible} />
      {hidden.length > 0 && (
        <More>
          <Paragraphs items={hidden} />
        </More>
      )}
    </>
  );
}

/** `emphasis: false` → ilk cümle kalın cevap olmaz (ör. eskimiş "önceki sınav biçimi" metni). */
export function ProseBody({ paragraphs, emphasis = true }: { paragraphs: string[]; emphasis?: boolean }) {
  const lines = joinFragments(paragraphs, true);
  // Metindeki soru satırları ("YÖKDİL sınavı ne zaman yapılır?") kart başlığı olur.
  const chunks: { head: string | null; paras: string[] }[] = [];
  for (const line of lines) {
    if (isQuestion(line)) chunks.push({ head: line, paras: [] });
    else if (chunks.length === 0) chunks.push({ head: null, paras: [line] });
    else chunks[chunks.length - 1].paras.push(line);
  }
  const headed = chunks.filter((c) => c.head !== null);
  if (headed.length < 2) return <Flow paragraphs={lines} emphasis={emphasis} />;
  const intro = chunks[0].head === null ? chunks[0].paras : [];
  return (
    <>
      {intro.length > 0 && <Flow paragraphs={intro} emphasis={emphasis} />}
      <div className={styles.cards}>
        {headed.map((c) => (
          <article key={c.head} className={styles.card}>
            <h3 className={styles.cardTitle}>{c.head}</h3>
            {c.paras.map((p) => (
              <p key={p} className={styles.cardText}>
                <Marked text={p} />
              </p>
            ))}
          </article>
        ))}
      </div>
    </>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className={styles.chips}>
      {items.map((item) => (
        <li key={item} className={styles.chip}>
          <span className={styles.chipIcon} aria-hidden="true">
            <Icon name={optionIcon(item)} size={20} strokeWidth={1.7} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Uzun maddeler: "Etiket: değer" olanlar başlıklı kart; değilse işaretli kart. */
function InfoCards({ items }: { items: string[] }) {
  const split = items.map(splitLabel);
  const labelled = split.filter((x) => x.label !== null).length;
  if (labelled * 2 >= split.length) {
    // Başlıklı kartlar; sondaki başlıksız satır(lar) kartın altında not olur.
    let end = split.length;
    while (end > 0 && split[end - 1].label === null) end--;
    return (
      <>
        <div className={styles.cards}>
          {split.slice(0, end).map((x) => (
            <article key={x.text} className={styles.card}>
              {x.label && <h3 className={styles.cardTitle}>{x.label}</h3>}
              {/* Kısa olgu kartında her rakam işaretlenirse vurgu anlamını yitirir. */}
              <p className={styles.cardText}>{x.text}</p>
            </article>
          ))}
        </div>
        {split.slice(end).map((x) => (
          <p key={x.text} className={styles.note}>
            <Marked text={x.text} />
          </p>
        ))}
      </>
    );
  }
  return (
    <ul className={styles.ticks}>
      {items.map((item) => (
        <li key={item} className={styles.tick}>
          <Marked text={item} />
        </li>
      ))}
    </ul>
  );
}

function toGroups(lines: string[], heads: string[]): { before: string[]; groups: ExamTabGroup[] } {
  const before: string[] = [];
  const groups: ExamTabGroup[] = [];
  for (const line of lines) {
    const head = heads.find((h) => line === h || line.startsWith(`${h} `));
    if (head) {
      const rest = line.slice(head.length).trim();
      groups.push({ title: head.replace(/:$/, ""), items: rest ? [rest] : [] });
    } else if (groups.length > 0) {
      groups[groups.length - 1].items.push(line);
    } else {
      before.push(line);
    }
  }
  return { before, groups };
}

function ListBody({ items, hint }: { items: string[]; hint: ListHint | null }) {
  // Kaynakta satır başına düşmüş iki nokta (": A grubu puanlar…") görünmez.
  const lines = joinFragments(items).map((l) => l.replace(/^:\s*/, ""));
  const leadCount = hint?.lead ?? 0;
  const lead = lines.slice(0, leadCount);
  const rest = lines.slice(leadCount);

  let body: ReactNode;
  if (hint?.groups) {
    const { before, groups } = toGroups(rest, hint.groups);
    body = (
      <>
        {before.length > 0 && <Paragraphs items={before} />}
        {hint.groupsAs === "tabs" ? (
          <ExamTabs groups={groups} />
        ) : (
          <div className={styles.cards}>
            {groups.map((g) => (
              <article key={g.title} className={styles.card}>
                <h3 className={styles.cardTitle}>{g.title}</h3>
                <ul className={styles.bullets}>
                  {g.items.map((item) => (
                    <li key={item}>
                      <Marked text={item} />
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}
      </>
    );
  } else if (rest.every((l) => l.length <= CHIP_MAX)) {
    body = <Chips items={rest} />;
  } else if (rest.length <= 3 && leadCount === 0) {
    // Birkaç uzun cümle madde değil, paragraftır ("4 ay önce başlayın…").
    return <Flow paragraphs={rest} />;
  } else {
    body = <InfoCards items={rest} />;
  }

  return (
    <>
      {lead.length > 0 && <Flow paragraphs={lead} />}
      {body}
    </>
  );
}

/* ---------------------------------------------------------------
 * Satır
 * ------------------------------------------------------------- */

/** Satır kabuğu — üniversite Proficiency sayfası da kullanır (`UniversityBody`). */
export function Row({
  id,
  kicker,
  title,
  lead,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  lead?: string | null;
  children: ReactNode;
}) {
  return (
    <section id={id} className={styles.row} aria-labelledby={`${id}-baslik`}>
      <div className={styles.ask}>
        <Kicker>{kicker}</Kicker>
        <h2 id={`${id}-baslik`} className={styles.title}>
          {title}
        </h2>
        {lead && <p className={styles.askLead}>{lead}</p>}
      </div>
      <div className={styles.content} data-reveal>
        {children}
      </div>
    </section>
  );
}

/** Tek bir blok → satır. `universities` ve `drop` burada basılmaz (çağıran ayırır). */
export function ExamRow({ block }: { block: ExamBlock }) {
  switch (block.kind) {
    case "prose":
      return (
        <Row id={block.id} kicker={block.kicker} title={block.title}>
          {block.format === "list" ? (
            <ListBody items={block.paragraphs} hint={block.list} />
          ) : (
            <ProseBody paragraphs={block.paragraphs} />
          )}
        </Row>
      );
    case "merged":
      return (
        <Row id={block.id} kicker={block.kicker} title={block.title}>
          <ListBody items={block.items} hint={block.list} />
        </Row>
      );
    case "headingList":
      return (
        <Row id={block.id} kicker={block.kicker} title={block.title}>
          <div className={styles.cards}>
            {block.items.map((it) => (
              <article key={it.label} className={styles.card}>
                <h3 className={styles.cardTitle}>{it.label.replace(/:$/, "")}</h3>
                {it.body && <ClampedText text={it.body} />}
              </article>
            ))}
          </div>
        </Row>
      );
    case "facts":
      return (
        <Row id={block.id} kicker={block.kicker} title={block.title}>
          {block.lead && <Answer text={block.lead} />}
          {block.cards ? <FactCardGrid cards={block.cards} /> : <InfoCards items={block.items} />}
        </Row>
      );
    case "stats":
      return (
        <Row id={block.id} kicker={block.kicker} title={block.title}>
          {block.lead && <Answer text={block.lead} />}
          <FactCardGrid cards={block.cards} />
        </Row>
      );
    case "structure":
      return (
        <Row id={block.id} kicker="SINAV YAPISI" title={block.title}>
          {block.lead && <Answer text={block.lead} />}
          <ExamSectionGrid sections={block.sections} detailIds={block.sections.map(() => block.detailAnchor)} />
        </Row>
      );
    case "branchLinks":
      return (
        <Row id={block.id} kicker="ŞUBE VE KURS TARİHLERİ" title={block.title} lead={block.lead}>
          <BranchDateList rows={block.rows} />
        </Row>
      );
    case "faq":
      return (
        <Row id={block.id} kicker={block.kicker} title={block.title}>
          <Accordion items={block.items} name={block.id} />
        </Row>
      );
    case "universities":
    case "drop":
      return null;
  }
}

/** Kart içindeki uzun gövde: ilk cümleler görünür, kalanı kartın içinde açılır. */
function ClampedText({ text }: { text: string }) {
  const sentences = text.split(/(?<=[.!?])\s+(?=\p{Lu})/u);
  if (text.length <= ANSWER_MAX || sentences.length < 3) {
    return (
      <p className={styles.cardText}>
        <Marked text={text} />
      </p>
    );
  }
  let cut = 0;
  let len = 0;
  while (cut < sentences.length - 1 && len + sentences[cut].length <= ANSWER_MAX * 0.75) len += sentences[cut++].length;
  cut = Math.max(cut, 1);
  return (
    <>
      <p className={styles.cardText}>
        <Marked text={sentences.slice(0, cut).join(" ")} />
      </p>
      <More>
        <p className={styles.cardText}>
          <Marked text={sentences.slice(cut).join(" ")} />
        </p>
      </More>
    </>
  );
}
