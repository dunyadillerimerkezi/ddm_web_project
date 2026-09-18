import type { ComponentProps, ReactNode } from "react";
import type { ImageSlotData } from "@/lib/types";
import { Icon } from "@/components/graphics/Icon";
import styles from "@/styles/Primitives.module.css";

/* ---------------------------------------------------------------
 * Kicker
 * ------------------------------------------------------------- */
export function Kicker({
  children,
  tone = "light",
}: {
  children: ReactNode;
  /** "light" = açık zemin · "dark" = koyu zemin/kart · "muted" = küçük gri etiket */
  tone?: "light" | "dark" | "muted";
}) {
  const cls =
    tone === "dark" ? styles.kickerOnDark : tone === "muted" ? styles.kickerMuted : styles.kicker;
  return <span className={cls}>{children}</span>;
}

/* ---------------------------------------------------------------
 * SectionHeading
 * ------------------------------------------------------------- */
export function SectionHeading({
  kicker,
  title,
  lead,
  size = "md",
  tone = "light",
  as: Tag = "h2",
}: {
  kicker?: string;
  title: string;
  lead?: string | null;
  size?: "md" | "sm" | "xs";
  tone?: "light" | "dark";
  as?: "h1" | "h2" | "h3";
}) {
  const titleCls = [
    size === "sm" ? styles.titleSm : size === "xs" ? styles.titleXs : styles.title,
    tone === "dark" ? styles.titleOnDark : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.heading}>
      {kicker && <Kicker tone={tone === "dark" ? "dark" : "light"}>{kicker}</Kicker>}
      <Tag className={titleCls}>{title}</Tag>
      {lead && (
        <p className={`${styles.lead} ${tone === "dark" ? styles.leadOnDark : ""}`}>{lead}</p>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------
 * Badge
 * ------------------------------------------------------------- */
export type BadgeVariant = "accent" | "outline" | "soft" | "solid" | "neutral";

const badgeClass: Record<BadgeVariant, string> = {
  accent: styles.badgeAccent,
  outline: styles.badgeOutline,
  soft: styles.badgeSoft,
  solid: styles.badgeSolid,
  neutral: styles.badgeNeutral,
};

export function Badge({
  variant = "soft",
  children,
}: {
  variant?: BadgeVariant;
  children: ReactNode;
}) {
  return <span className={badgeClass[variant]}>{children}</span>;
}

/* ---------------------------------------------------------------
 * DataMissingNotice
 *
 * CLAUDE.md §5: eksik veri uydurulmaz, açıkça işaretlenir.
 * ------------------------------------------------------------- */
export function DataMissingNotice({
  label = "VERİ EKSİK",
  children,
  compact = false,
  action,
}: {
  label?: string;
  children: ReactNode;
  compact?: boolean;
  action?: ReactNode;
}) {
  return (
    <div className={compact ? styles.missingCompact : styles.missing}>
      <span className={styles.missingLabel}>{label}</span>
      <p className={styles.missingText}>{children}</p>
      {action}
    </div>
  );
}

/* ---------------------------------------------------------------
 * ImageSlot
 * ------------------------------------------------------------- */
export function ImageSlot({
  slot,
  name,
  minHeight,
}: {
  slot: ImageSlotData;
  /** Yuvanın kod adı: "sube-foto", "sube-harita"... */
  name?: string;
  minHeight?: number;
}) {
  // Gerçek görsel geldiğinde burada next/image render edilecek (Aşama 7).
  return (
    <div
      className={styles.slot}
      style={{ aspectRatio: slot.ratio.replace("/", " / "), minHeight }}
      role="img"
      aria-label={slot.alt}
    >
      <Icon name="konum" size={30} strokeWidth={1.7} />
      {name && <span className={styles.slotName}>{name}</span>}
      <span className={styles.slotSpec}>
        {slot.ratio.replace("/", ":")} · {slot.width}×{slot.height}
      </span>
      <span className={styles.slotSpec}>{slot.hint}</span>
    </div>
  );
}

/* ---------------------------------------------------------------
 * IconButton
 * ------------------------------------------------------------- */
export function IconButton({
  label,
  children,
  size = "md",
  ...rest
}: {
  /** Görünür metni olmadığı için zorunlu. */
  label: string;
  children: ReactNode;
  size?: "md" | "sm";
} & Omit<ComponentProps<"button">, "children" | "className" | "aria-label">) {
  return (
    <button
      type="button"
      className={size === "sm" ? styles.iconButtonSm : styles.iconButton}
      aria-label={label}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ---------------------------------------------------------------
 * DayBadge
 * ------------------------------------------------------------- */
export type DayKey = "pzt" | "sal" | "car" | "per" | "cum" | "cmt" | "paz";

export const DAYS: { key: DayKey; short: string; long: string; weekend: boolean }[] = [
  { key: "pzt", short: "Pzt", long: "Pazartesi", weekend: false },
  { key: "sal", short: "Sal", long: "Salı", weekend: false },
  { key: "car", short: "Çar", long: "Çarşamba", weekend: false },
  { key: "per", short: "Per", long: "Perşembe", weekend: false },
  { key: "cum", short: "Cum", long: "Cuma", weekend: false },
  { key: "cmt", short: "Cmt", long: "Cumartesi", weekend: true },
  { key: "paz", short: "Paz", long: "Pazar", weekend: true },
];

export function DayBadge({
  day,
  active,
  kind = "haftaici",
}: {
  day: (typeof DAYS)[number];
  active: boolean;
  /** Aktif rengin hangi gruba ait olduğu: hafta içi lacivert, hafta sonu aksan. */
  kind?: "haftaici" | "haftasonu" | "birebir";
}) {
  const cls = !active
    ? styles.day
    : kind === "haftasonu"
      ? styles.dayOnWeekend
      : styles.dayOnWeekday;

  return (
    <span className={cls} title={day.long}>
      {day.short}
    </span>
  );
}
