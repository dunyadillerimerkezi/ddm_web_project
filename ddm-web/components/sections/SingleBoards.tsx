import type { CSSProperties } from "react";

import { Icon } from "@/components/graphics/Icon";
import { WeekBoard } from "@/components/sections/WeekBoard";
import type { SingleBoardResolved } from "@/lib/singleContent";
import styles from "@/styles/SingleBoards.module.css";

/** Dosya rafında gösterilen üniversite sayısı; kalanı "… daha" satırında. */
const SHELF_VISIBLE = 6;

type Board<K extends SingleBoardResolved["kind"]> = Extract<SingleBoardResolved, { kind: K }>;

function Head({ id, title, sub }: { id: string; title: string; sub: string }) {
  return (
    <>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      <p className={styles.sub}>{sub}</p>
    </>
  );
}

function Facts({ facts }: { facts: { value: string; label: string }[] }) {
  return (
    <dl className={styles.facts}>
      {facts.map((f) => (
        <div key={f.label} className={styles.fact}>
          <dt className={styles.factLabel}>{f.label}</dt>
          <dd className={styles.factValue}>{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Kur basamakları: DOM sırası alttan üste (A1 → C2), görünüşte en üst basamak en yüksek kur. */
function Ladder({ board }: { board: Board<"ladder"> }) {
  return (
    <aside className={styles.board} aria-labelledby="pano">
      <Head id="pano" title={board.title} sub={board.sub} />
      <ol className={styles.ladder}>
        {board.steps.map((s, i) => (
          <li key={s.id} className={styles.rung} style={{ "--i": i, "--n": board.steps.length } as CSSProperties}>
            <a href={`#${s.id}`} className={styles.rungLink}>
              <span className={styles.rungCode}>{s.code}</span>
              <span className={styles.rungName}>{s.name}</span>
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}

/** Sıralı ders akışı — numaralar gerçek sırayı gösterir. */
function Steps({ board }: { board: Board<"steps"> }) {
  return (
    <aside className={styles.board} aria-labelledby="pano">
      <Head id="pano" title={board.title} sub={board.sub} />
      <ol className={styles.steps}>
        {board.steps.map((s, i) => (
          <li key={s.name} className={styles.step} style={{ "--i": i } as CSSProperties}>
            <span className={styles.stepNo} aria-hidden="true">
              {i + 1}
            </span>
            <span className={styles.stepBody}>
              <strong className={styles.stepName}>{s.name}</strong>
              <span className={styles.stepText}>{s.text}</span>
            </span>
          </li>
        ))}
      </ol>
    </aside>
  );
}

/** Sınav kâğıdı: bölümler, süreler; bu sayfanın örneklediği bölüm vurgulu. */
function Sheet({ board }: { board: Board<"sheet"> }) {
  return (
    <aside className={`${styles.board} ${styles.sheet}`} aria-labelledby="pano">
      <Head id="pano" title={board.title} sub={board.sub} />
      <ol className={styles.sheetRows}>
        {board.rows.map((row) => (
          <li key={row.local} className={row.highlight ? styles.sheetRowOn : styles.sheetRow}>
            <span className={styles.sheetName}>
              {row.name}{" "}
              <span lang="de" className={styles.sheetLocal}>
                {row.local}
              </span>
            </span>
            <span className={styles.sheetTime}>{row.time}</span>
            {row.highlight && <span className={styles.sheetTag}>{row.highlight}</span>}
          </li>
        ))}
      </ol>
      <Facts facts={board.facts} />
    </aside>
  );
}

/** Dosya rafı: üniversite başına dosya sayısı. */
function Files({ board }: { board: Board<"files"> }) {
  const visible = board.groups.slice(0, SHELF_VISIBLE);
  const rest = board.groups.length - visible.length;
  return (
    <aside className={styles.board} aria-labelledby="pano">
      <Head id="pano" title={board.title} sub={board.sub} />
      <ul className={styles.shelf}>
        {visible.map((g, i) => (
          <li key={g.name} className={styles.folder} style={{ "--i": i } as CSSProperties}>
            <span className={styles.folderName}>{g.name}</span>
            <span className={styles.folderCount}>{g.count} dosya</span>
          </li>
        ))}
      </ul>
      {rest > 0 && <p className={styles.shelfMore}>ve {rest} üniversite daha</p>}
      <Facts
        facts={[
          { value: String(board.groups.length), label: "üniversite" },
          { value: String(board.total), label: "dosya ve bağlantı" },
        ]}
      />
    </aside>
  );
}

/** Kolay / zor yanlar. */
function Scale({ board }: { board: Board<"scale"> }) {
  return (
    <aside className={styles.board} aria-labelledby="pano">
      <Head id="pano" title={board.title} sub={board.sub} />
      <div className={styles.scale}>
        <div className={styles.pan}>
          <h3 className={styles.panTitle}>Kolay yanı</h3>
          <ul className={styles.panList}>
            {board.easy.map((t) => (
              <li key={t} className={styles.easy}>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className={`${styles.pan} ${styles.panHard}`}>
          <h3 className={styles.panTitle}>Zor yanı</h3>
          <ul className={styles.panList}>
            {board.hard.map((t) => (
              <li key={t} className={styles.hard}>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

/**
 * Biniş kartı (yurtdışı, kullanıcı 2026-09-26 "A"): İstanbul → gidilecek yer, dört alan, lacivert
 * koçan. Kart ilk görünüşte bir kez yerine oturur (reduced-motion'da sabit). Barkod dekoratif.
 */
function Pass({ board }: { board: Board<"pass"> }) {
  return (
    <aside className={styles.pass} aria-labelledby="pano">
      <div className={styles.passMain}>
        <p className={styles.passTop}>
          <span id="pano">{board.title}</span>
          <span>{board.tag}</span>
        </p>
        <p className={styles.route}>
          <span className={styles.port}>
            <span className={styles.portCode} aria-hidden="true">
              {board.from.code}
            </span>
            <span className={styles.portName}>{board.from.name}</span>
          </span>
          <span className={styles.flight} aria-hidden="true">
            <Icon name="ucak" size={18} />
          </span>
          <span className={`${styles.port} ${styles.portTo}`}>
            <span className={styles.portCode} aria-hidden="true">
              {board.to.code}
            </span>
            <span className={styles.portName}>{board.to.name}</span>
          </span>
        </p>
        <dl className={styles.passFields}>
          {board.fields.map((f) => (
            <div key={f.label}>
              <dt className={styles.passLabel}>{f.label}</dt>
              <dd className={styles.passValue}>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className={styles.stub}>
        <dl className={styles.stubInfo}>
          <dt className={styles.stubLabel}>{board.stub.label}</dt>
          <dd className={styles.stubValue}>{board.stub.value}</dd>
        </dl>
        <span className={styles.barcode} aria-hidden="true" />
      </div>
    </aside>
  );
}

/** Konu / dil etiketleri. */
function Chips({ board }: { board: Board<"chips"> }) {
  return (
    <aside className={styles.board} aria-labelledby="pano">
      <Head id="pano" title={board.title} sub={board.sub} />
      <ul className={styles.chips}>
        {board.items.map((t, i) => (
          <li key={t} className={styles.chip} style={{ "--i": i } as CSSProperties}>
            {t}
          </li>
        ))}
      </ul>
      {board.facts.length > 0 && <Facts facts={board.facts} />}
    </aside>
  );
}

/** Yan yana iki program seçeneği. */
function Compare({ board }: { board: Board<"compare"> }) {
  return (
    <aside className={styles.board} aria-labelledby="pano">
      <Head id="pano" title={board.title} sub={board.sub} />
      <div className={styles.compare}>
        {board.cols.map((c, i) => (
          <section key={c.name} className={i === 0 ? styles.pan : `${styles.pan} ${styles.panHard}`} aria-label={c.name}>
            <h3 className={styles.panTitle}>{c.name}</h3>
            <p className={styles.compareNote}>{c.note}</p>
            <dl className={styles.compareFacts}>
              {c.facts.map((f) => (
                <div key={`${f.label}-${f.value}`}>
                  <dt className={styles.compareLabel}>{f.label}</dt>
                  <dd className={styles.compareValue}>{f.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </aside>
  );
}

/** P4 tekil — hero'nun sağındaki pano (kullanıcı, 2026-09-26: "A · program panosu"). */
export function SingleBoard({ board }: { board: SingleBoardResolved }) {
  switch (board.kind) {
    case "week":
      return <WeekBoard board={board} />;
    case "ladder":
      return <Ladder board={board} />;
    case "steps":
      return <Steps board={board} />;
    case "sheet":
      return <Sheet board={board} />;
    case "files":
      return <Files board={board} />;
    case "scale":
      return <Scale board={board} />;
    case "pass":
      return <Pass board={board} />;
    case "chips":
      return <Chips board={board} />;
    case "compare":
      return <Compare board={board} />;
  }
}
