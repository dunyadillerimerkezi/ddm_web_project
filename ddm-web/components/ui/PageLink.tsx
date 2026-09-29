import Link from "next/link";
import type { ComponentProps } from "react";

type PageLinkProps = ComponentProps<typeof Link>;

/**
 * İç bağlantı: sayfa içi çapa (`#kayit`, `#kurs-takvimi`) düz `<a>`, gerisi `next/link`.
 *
 * Neden: `next/link` adres zaten aynı çapadayken (ör. "Bilgi Al"a bir kez basılmış, kullanıcı yukarı dönmüş) tıklamayı
 * yok sayar — sayfa kaymaz. Tarayıcının kendi çapa gezinmesi her tıklamada kaydırır ve `scroll-margin`'e uyar.
 */
export function PageLink({ href, prefetch, replace, scroll, shallow, ...rest }: PageLinkProps) {
  if (typeof href === "string" && href.startsWith("#")) return <a href={href} {...rest} />;
  return <Link href={href} prefetch={prefetch} replace={replace} scroll={scroll} shallow={shallow} {...rest} />;
}
