"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * `<details>` — adres çubuğundaki çapa (`#id`) bu kutuyu gösteriyorsa kendiliğinden açılır (PF: formdaki KVKK
 * bağlantısı `/ddm-iletisim#kvkk-aydinlatma-metni` kapalı bir başlığa inmesin). JS yoksa sıradan kapalı `<details>`.
 */
export function HashDetails({ id, className, children }: { id: string; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const sync = () => {
      if (window.location.hash === `#${id}` && ref.current) ref.current.open = true;
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [id]);

  return (
    <details ref={ref} className={className}>
      {children}
    </details>
  );
}
