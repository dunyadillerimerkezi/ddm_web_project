import type { ComponentProps, ReactNode } from "react";
import { UiIcon } from "@/components/graphics/Icon";
import { PageLink } from "@/components/ui/PageLink";
import styles from "@/styles/Button.module.css";

export type ButtonVariant = "primary" | "onDark" | "outlineDark" | "outlineLight" | "link";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

type Common = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Sonuna ok ikonu ekler. "chip" = beyaz kare rozet içinde ok. */
  arrow?: boolean | "chip";
  block?: boolean;
  children: ReactNode;
  className?: string;
};

function classes({ variant = "primary", size = "md", block, className }: Common) {
  return [styles.base, styles[variant], styles[size], block ? styles.block : "", className ?? ""]
    .filter(Boolean)
    .join(" ");
}

function Tail({ arrow }: { arrow: Common["arrow"] }) {
  if (!arrow) return null;
  if (arrow === "chip") {
    return (
      <span className={styles.arrowChip}>
        <UiIcon name="arrowRight" size={13} />
      </span>
    );
  }
  return <UiIcon name="arrowRight" size={14} strokeWidth={1.6} />;
}

type ButtonLinkProps = Common & Omit<ComponentProps<typeof PageLink>, "className" | "children">;

/** İç bağlantı butonu — tüm iç linkler next/link üzerinden (CLAUDE.md §4); sayfa içi çapa düz `<a>` (`PageLink`). */
export function ButtonLink({ variant, size, arrow, block, children, className, ...rest }: ButtonLinkProps) {
  return (
    <PageLink className={classes({ variant, size, block, className, children })} {...rest}>
      {children}
      <Tail arrow={arrow} />
    </PageLink>
  );
}

type AnchorProps = Common & Omit<ComponentProps<"a">, "className" | "children">;

/** Dış/protokol bağlantısı (tel:, mailto:, wa.me). */
export function ButtonAnchor({ variant, size, arrow, block, children, className, ...rest }: AnchorProps) {
  return (
    <a className={classes({ variant, size, block, className, children })} {...rest}>
      {children}
      <Tail arrow={arrow} />
    </a>
  );
}

type NativeButtonProps = Common & Omit<ComponentProps<"button">, "className" | "children">;

export function Button({ variant, size, arrow, block, children, className, type = "button", ...rest }: NativeButtonProps) {
  return (
    <button type={type} className={classes({ variant, size, block, className, children })} {...rest}>
      {children}
      <Tail arrow={arrow} />
    </button>
  );
}
