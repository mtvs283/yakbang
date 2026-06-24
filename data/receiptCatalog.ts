/** 영수증함 카탈로그 — DB 약 분류 전 임시 상수 */

export const RECEIPT_CATALOG_SLUGS = ["h-pron"] as const;
export type ReceiptCatalogSlug = (typeof RECEIPT_CATALOG_SLUGS)[number];

/** 아직 처방 없는 실루엣 카드 수 (Coming Soon) */
export const COMING_SOON_SILHOUETTE_COUNT = 5;

/** slug 접두사 → 진척도 라벨 (h-* = 발음약만) */
export const CATEGORY_PREFIX_LABELS: Record<string, string> = {
  "h-": "발음약"
};

/** prescription_slug → remedies.ts id */
export const SLUG_TO_REMEDY_ID: Record<string, string> = {
  "h-pron": "h-pronunciation"
};

export function categoryLabelForSlug(slug: string): string | null {
  for (const [prefix, label] of Object.entries(CATEGORY_PREFIX_LABELS)) {
    if (slug.startsWith(prefix)) return label;
  }
  return null;
}

export function progressByCategory(receivedSlugs: string[]): string[] {
  const lines: string[] = [];
  for (const [prefix, label] of Object.entries(CATEGORY_PREFIX_LABELS)) {
    const total = RECEIPT_CATALOG_SLUGS.filter((s) => s.startsWith(prefix)).length;
    const done = receivedSlugs.filter((s) => s.startsWith(prefix)).length;
    if (total > 0) {
      lines.push(`${label} ${done}/${total}`);
    }
  }
  return lines;
}
