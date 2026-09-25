import Image from "next/image";

import { Icon } from "@/components/graphics/Icon";
import { Reveal } from "@/components/ui";
import type { Photo } from "@/data/privateLessonsShared";
import type { RichAboutPart } from "@/lib/richContent";
import styles from "@/styles/RichAbout.module.css";

/**
 * P4 — firma metni (paragraflar, kaynak alt başlıkları, alan listesi), solda
 * fotoğraf. Metinler kaynaktan birebir (düzeltmeler `edits`te); ikonlar yalnız süs.
 */
export function RichAbout({
  id,
  title,
  parts,
  photo,
}: {
  id: string;
  title: string;
  parts: RichAboutPart[];
  photo: Photo;
}) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-baslik`}>
      <Reveal className={styles.container}>
        <div className={styles.media} data-reveal>
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="(max-width: 999px) 100vw, 600px"
            className={styles.photo}
          />
        </div>
        <div className={styles.copy}>
          <h2 id={`${id}-baslik`} className={styles.title}>
            {title}
          </h2>
          {parts.map((part, i) => {
            switch (part.kind) {
              case "p":
                return (
                  <p key={i} className={styles.p}>
                    {part.text}
                  </p>
                );
              case "h3":
                return (
                  <h3 key={i} className={styles.h3}>
                    {part.text}
                  </h3>
                );
              case "areas":
                return (
                  <ul key={i} className={styles.areas}>
                    {part.items.map((a) => (
                      <li key={a.label} className={a.children.length > 0 ? styles.areaWide : styles.area} data-reveal>
                        <span className={styles.areaIcon}>
                          <Icon name={a.icon} size={20} />
                        </span>
                        <span className={styles.areaBody}>
                          {a.label}
                          {a.children.length > 0 && (
                            <span className={styles.children}>
                              {a.children.map((c) => (
                                <span key={c} className={styles.child}>
                                  {c}
                                </span>
                              ))}
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                );
            }
          })}
        </div>
      </Reveal>
    </section>
  );
}
