import { PageSection } from "@/components/sections/PageSection";
import Link from "next/link";
import { Icon, UiIcon } from "@/components/graphics/Icon";
import type { IconName } from "@/components/graphics/icons";
import type { CertBox } from "@/components/sections/AboutCertification";
import styles from "@/styles/AboutBento.module.css";

type Span = "wide" | "half" | "full";

/**
 * Paragraf kutusu başlığı + ikonu (kullanıcı isteği, 2026-09-25: taslaktaki
 * gibi her kutu başlıklı ve ikonlu). Başlık paragrafın konusunu adlandıran
 * kısa etikettir — gövde metni kaynaktaki gibi kalır. İlk eşleşen kazanır;
 * hiçbiri tutmazsa build durur (yeni/değişen kaynak paragrafı fark edilsin).
 */
const TOPIC_RULES: [RegExp, string, IconName][] = [
  [/anlıyorsunuz ama konuşamıyorsunuz/i, "Anlıyor ama konuşamıyor musunuz?", "sohbet"],
  [/uzayıp giden kurlar/i, "Size özel program", "puan"],
  [/seviye tespit/i, "Seviye tespiti", "soru"],
  [/kitabı takip/i, "Günlük hayata göre program", "konusma"],
  [/yabancılar için Türkçe/i, "Türkiye'de yaşayanlar için", "konum"],
  [/orta seviye ve üzeri/i, "Program ve katılım", "grup"],
  [/kurdan oluş/i, "Program yapısı", "takvim"],
  [/kişilik özel gruplar/i, "Grup ya da birebir", "grup"],
  [/konuşma odaklı/i, "Konuşma odaklı eğitim", "konusma"],
  [/öğretmen|eğitmen/i, "Eğitmen kadromuz", "ozelders"],
  [/seviyelerinde .*açılmaktadır/i, "Açılan seviyeler", "mezuniyet"],
];

function topicFor(text: string): { title: string; icon: IconName } {
  const hit = TOPIC_RULES.find(([re]) => re.test(text));
  if (!hit) throw new Error(`AboutBento: paragraf için başlık kuralı yok — "${text.slice(0, 60)}…"`);
  return { title: hit[1], icon: hit[2] };
}

function Topic({ text }: { text: string }) {
  const { title, icon } = topicFor(text);
  return (
    <div className={styles.topic}>
      <span className={styles.topicIcon} aria-hidden="true">
        <Icon name={icon} size={22} strokeWidth={1.7} />
      </span>
      <h3 className={styles.topicTitle}>{title}</h3>
    </div>
  );
}

/**
 * Dil Kursu · "… Eğitim Programı Hakkında Bilgi" — UI turu (2026-09-25,
 * kullanıcı seçimi "B"): her kaynak paragraf kendi başlıklı-ikonlu kutusunda, kaynakta yazılı
 * rakamlar (kur · ay · saat · dakika) lacivert kutuda öne çıkar.
 *
 * Paragraf sayısı dile göre 2–4 arası değişir; yerleşim sayıdan türetilir:
 * ilk paragraf rakam kutusuyla aynı satırda geniş, kalanlar ikişer, tek kalan
 * tam satır. Sertifika kutuları (`#kur-sinavi`, `#sertifika` çapaları — Ana
 * Sayfa dil kartları bunlara bağlanır) en altta ikili.
 */
export function AboutBento({
  id,
  kicker,
  title,
  paragraphs,
  facts,
  boxes,
}: {
  /** Seviyeler bölümü olmayan dillerde `#seviyeler` çapası buraya taşınır. */
  id?: string;
  kicker: string;
  title: string;
  paragraphs: string[];
  facts: { value: string; label: string }[];
  boxes: CertBox[];
}) {
  const [first, ...rest] = paragraphs;
  const hasFacts = facts.length >= 2;
  const restSpan = (i: number): Span => (rest.length % 2 === 1 && i === rest.length - 1 ? "full" : "half");
  const boxSpan: Span = boxes.length === 1 ? "full" : "half";

  return (
    <PageSection id={id} ground="light" kicker={kicker} title={title}>
      <div className={styles.grid}>
        {first && (
          <div className={`${styles.box} ${hasFacts ? styles.wide : styles.full} ${styles.lead}`}>
            <Topic text={first} />
            <p className={styles.body}>{first}</p>
          </div>
        )}

        {hasFacts && (
          <dl className={`${styles.box} ${styles.narrow} ${styles.facts}`}>
            {facts.map((f) => (
              <div className={styles.fact} key={f.label}>
                <dt className={styles.factLabel}>{f.label}</dt>
                <dd className={styles.factValue}>{f.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {rest.map((p, i) => (
          <div className={`${styles.box} ${styles[restSpan(i)]}`} key={p}>
            <Topic text={p} />
            <p className={styles.body}>{p}</p>
          </div>
        ))}

        {boxes.map((box, i) => (
          <div id={box.id} className={`${styles.box} ${styles[boxSpan]} ${styles.cert}`} key={box.title}>
            <span className={styles.certIcon} aria-hidden="true">
              <Icon name={i === 0 ? "belge" : "mezuniyet"} size={22} strokeWidth={1.7} />
            </span>
            <h3 className={styles.certTitle}>{box.title}</h3>
            <p className={styles.certBody}>{box.body}</p>
            {box.links && box.links.length > 0 && (
              <ul className={styles.certLinks}>
                {box.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={styles.certLink}>
                      {l.label}
                      <UiIcon name="arrowRight" size={12} />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </PageSection>
  );
}
