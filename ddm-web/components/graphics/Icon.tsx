import { ICONS, UI_ICONS, type IconName, type UiIconName } from "./icons";

type IconProps = {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
};

/**
 * 24×24 işlevsel ikon. Dekoratiftir — her zaman `aria-hidden`.
 * Anlam taşıyorsa yanına görünür metin veya `aria-label` koyun.
 */
export function Icon({ name, size = 24, strokeWidth = 1.8, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {ICONS[name]}
    </svg>
  );
}

type UiIconProps = {
  name: UiIconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
};

/** Ok / caret / hamburger — kendi viewBox'ları olan arayüz ikonları. */
export function UiIcon({ name, size = 14, strokeWidth = 1.7, className }: UiIconProps) {
  const icon = UI_ICONS[name];
  // caret 10×6 oranında; kare olmayan tek aile.
  const height = name === "caretDown" ? Math.round(size * 0.6) : name === "burger" ? Math.round(size * 0.7) : size;

  return (
    <svg
      width={size}
      height={height}
      viewBox={icon.viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={icon.d} />
    </svg>
  );
}
