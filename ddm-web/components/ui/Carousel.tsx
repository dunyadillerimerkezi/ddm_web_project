"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { IconButton } from "@/components/ui/Primitives";
import { UiIcon } from "@/components/graphics/Icon";
import styles from "@/styles/Carousel.module.css";

/**
 * Yatay kaydırmalı kart şeridi — sınav hazırlık ve öğrenci yorumları
 * bölümlerinde kullanılıyor, Faz 6.4+'ta da yeniden kullanılacak.
 *
 * Kaynak: `DDM Ana Sayfa.dc.html` bölüm 3 ve 9. Şablondaki pointer-drag +
 * `setInterval` tween taşınmadı — native `scroll-snap` + dokunmatik kaydırma
 * ve `scrollBy({ behavior: "smooth" })` yeterli (Next 16: global
 * `scroll-behavior` override'ı kaldırıldığı için smooth davranış şeridin
 * kendi CSS'inde tanımlı).
 *
 * Slaytlar `children` olarak server'da render edilip geçiriliyor — istemci
 * sınırından fonksiyon prop geçirmek yerine JSX slot deseni (Next 16 dokümanı).
 */
type CarouselProps = {
  heading: ReactNode;
  actions?: ReactNode;
  /** Kaydırma bölgesinin erişilebilirlik etiketi. */
  label: string;
  children: ReactNode;
};

export function Carousel({ heading, actions, label, children }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const node = trackRef.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    setAtStart(node.scrollLeft <= 2);
    setAtEnd(node.scrollLeft >= max - 2);
  }, []);

  useEffect(() => {
    updateEdges();
    const node = trackRef.current;
    if (!node) return;
    node.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      node.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  const nudge = useCallback((dir: 1 | -1) => {
    const node = trackRef.current;
    if (!node) return;
    const first = node.firstElementChild as HTMLElement | null;
    const gap = 18;
    const cardWidth = first ? first.getBoundingClientRect().width : 300;
    const perStep = window.innerWidth < 700 ? 1 : 2;
    node.scrollBy({ left: dir * (cardWidth + gap) * perStep, behavior: "smooth" });
  }, []);

  return (
    <div>
      <div className={styles.head}>
        {heading}
        <div className={styles.controls}>
          <div className={styles.arrows}>
            <IconButton label="Önceki" onClick={() => nudge(-1)} disabled={atStart}>
              <UiIcon name="arrowLeft" size={17} strokeWidth={1.7} />
            </IconButton>
            <IconButton label="Sonraki" onClick={() => nudge(1)} disabled={atEnd}>
              <UiIcon name="arrowRight" size={17} strokeWidth={1.7} />
            </IconButton>
          </div>
          {actions}
        </div>
      </div>
      <div ref={trackRef} className={styles.track} role="region" aria-label={label}>
        {children}
      </div>
    </div>
  );
}
