"use client";

import { useState } from "react";
import Image from "next/image";
import { Kicker } from "@/components/ui";
import { VIDEO_SECTION } from "@/data/home";
import styles from "@/styles/VideoPromo.module.css";

/**
 * Bölüm 8 · Tanıtım videosu.
 *
 * Kaynak: `DDM Ana Sayfa.dc.html` bölüm 8. UI turu (2026-09-24, "6A"):
 * fotoğraflı kapak kaldırıldı — lacivert kapak, arkada DDM'nin dillerinde
 * kayan "merhaba" şeridi. Tıklanınca YouTube oynatıcısı sayfanın içinde
 * açılır; iframe o ana kadar yüklenmez (açılış hızı etkilenmez). JS yoksa
 * bağlantı YouTube'a gider (CLAUDE.md §4 istisnası: dış domain linki).
 */
export function VideoPromo() {
  const { kicker, title, youtubeUrl, embedUrl, greetings, caption, sub } = VIDEO_SECTION;
  const [playing, setPlaying] = useState(false);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <Kicker>{kicker}</Kicker>
          <h2 className={styles.title}>{title}</h2>
        </div>

        <div className={styles.frame}>
          {playing ? (
            <iframe
              className={styles.player}
              src={embedUrl}
              title={caption}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : (
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener"
              className={styles.cover}
              onClick={(e) => {
                e.preventDefault();
                setPlaying(true);
              }}
            >
              <span className={styles.greetings} aria-hidden="true">
                {greetings.map((row, i) => (
                  <span className={styles.marquee} key={i}>
                    {/* İki kopya yan yana — %50 kayınca dikişsiz döner. */}
                    {[...row, ...row].join(" · ")} ·
                  </span>
                ))}
              </span>
              <Image
                src="/assets/ddm-logo-beyaz.png"
                alt=""
                width={1927}
                height={816}
                className={styles.logo}
              />
              <span className={styles.playButton} aria-hidden="true">
                <svg width="25" height="29" viewBox="0 0 26 30" fill="currentColor">
                  <path d="M25 15L0 30V0z" />
                </svg>
              </span>
              <span className={styles.pulseRing} aria-hidden="true" />
              <span className={styles.caption}>
                <span className={styles.captionTitle}>{caption}</span>
                <span className={styles.captionSub}>{sub}</span>
              </span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
