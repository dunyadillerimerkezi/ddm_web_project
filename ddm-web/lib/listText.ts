/** "A, B, C ve D" — Türkçe liste cümlesi. Tek öğede yalnız o öğe, boş listede boş metin. */
export function joinTr(items: readonly string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} ve ${items[items.length - 1]}`;
}
