import type { CSSProperties } from "react";
import Link from "next/link";

import { Icon } from "@/components/graphics/Icon";
import { GuideBlock } from "@/components/sections/GuideBlock";
import { linkIfProduced } from "@/lib/hubLinks";
import type { FileGroup, SingleResolvedBlock } from "@/lib/singleContent";
import styles from "@/styles/SingleBlocks.module.css";

/** Dış bağlantı: yeni sekmede. */
function External({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
      <span className={styles.srOnly}> (yeni sekmede açılır)</span>
    </a>
  );
}

function FileRow({ group }: { group: FileGroup }) {
  const uniHref = linkIfProduced(group.href);
  return (
    <li className={styles.fileRow}>
      <div className={styles.fileUni}>
        {uniHref ? (
          <Link href={uniHref} className={styles.fileUniName}>
            {group.name}
          </Link>
        ) : (
          <span className={styles.fileUniName}>{group.name}</span>
        )}
        <span className={styles.fileExam}>Sınavın güncel adı: {group.exam}</span>
      </div>
      <ul className={styles.fileList}>
        {group.files.map((f) => (
          <li key={f.href}>
            {f.type === "Resmi sayfa" ? (
              <External href={f.href} className={styles.fileChip}>
                <span className={styles.fileType}>{f.type}</span>
                {f.label}
              </External>
            ) : (
              <a href={f.href} className={styles.fileChip}>
                <span className={styles.fileType}>{f.type}</span>
                {f.label}
              </a>
            )}
          </li>
        ))}
      </ul>
      {group.official && !group.files.some((f) => f.href === group.official) && (
        <External href={group.official} className={styles.fileOfficial}>
          Güncel resmi örnekler
        </External>
      )}
      {group.note && <p className={styles.fileNote}>{group.note}</p>}
    </li>
  );
}

/** P4 tekil gövde blokları: tekile özgü türler burada, ortak türler `GuideBlock`ta. */
export function SingleBlock({ block }: { block: SingleResolvedBlock }) {
  switch (block.kind) {
    case "subhead":
      return <h3 className={styles.subhead}>{block.text}</h3>;
    case "cards":
      return (
        <ul className={styles.cards}>
          {block.items.map((c) => (
            <li key={c.title} className={styles.card}>
              <strong className={styles.cardTitle}>{c.title}</strong>
              <p className={styles.cardText}>{c.text}</p>
            </li>
          ))}
        </ul>
      );
    case "facets":
      return (
        <>
          <ul
            className={styles.facets}
            data-span-last={block.items.length % 3 !== 0 && block.items.length % 2 === 1 ? "" : undefined}
            style={{ "--cols": block.items.length % 3 === 0 ? 3 : 2 } as CSSProperties}
          >
            {block.items.map((c) => (
              <li key={c.title} className={styles.facet}>
                {c.icon && (
                  <span className={styles.facetIcon} aria-hidden="true">
                    <Icon name={c.icon} size={20} />
                  </span>
                )}
                <strong className={styles.cardTitle}>{c.title}</strong>
                <p className={styles.cardText}>{c.text}</p>
              </li>
            ))}
          </ul>
          <details className={styles.facetNote}>
            <summary className={styles.facetSummary} lang="tr">
              Ayrıntılı bilgi
            </summary>
            {block.note.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </details>
        </>
      );
    case "topics":
      return (
        <ul className={styles.topics}>
          {block.items.map((t) => (
            <li key={t.title} className={styles.topic}>
              {t.icon && (
                <span className={styles.facetIcon} aria-hidden="true">
                  <Icon name={t.icon} size={20} />
                </span>
              )}
              <h3 className={styles.topicTitle}>{t.title}</h3>
              <p className={styles.cardText}>{t.summary}</p>
              <details className={styles.facetNote}>
                <summary className={styles.facetSummary} lang="tr">
              Ayrıntılı bilgi
            </summary>
                {t.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </details>
            </li>
          ))}
        </ul>
      );
    case "tasks":
      return (
        <ol className={styles.tasks}>
          {block.items.map((t) => (
            <li key={t.label} className={styles.task}>
              <span className={styles.taskLabel}>{t.label}</span>
              <p lang="de" className={styles.taskPrompt}>
                {t.prompt}
              </p>
              <ul lang="de" className={styles.taskPoints}>
                {t.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <p className={styles.taskTr}>{t.tr}</p>
            </li>
          ))}
        </ol>
      );
    case "files":
      return (
        <ul className={styles.files}>
          {block.groups.map((g) => (
            <FileRow key={g.name} group={g} />
          ))}
        </ul>
      );
    default:
      return <GuideBlock block={block} stackTables />;
  }
}
