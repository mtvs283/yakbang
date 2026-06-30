import { remedies, type Remedy } from "./remedies";

/** DB prescription_slug — ㅎ 발음약만 legacy 축약 (기존 영수증 호환) */
const LEGACY_SLUG_BY_REMEDY_ID: Record<string, string> = {
  "h-pronunciation": "h-pron"
};

export function remedyIdToSlug(remedyId: string): string {
  return LEGACY_SLUG_BY_REMEDY_ID[remedyId] ?? remedyId;
}

export function slugToRemedyId(slug: string): string {
  for (const [id, legacySlug] of Object.entries(LEGACY_SLUG_BY_REMEDY_ID)) {
    if (legacySlug === slug) return id;
  }
  return slug;
}

/** 퀴즈 있고 구할 수 있는 약만 영수증 대상 */
export function receiptEligibleRemedies(): Remedy[] {
  return remedies.filter(
    (r) => r.status !== "unavailable" && r.prescription.quiz.length > 0
  );
}

export const RECEIPT_CATALOG_SLUGS: string[] = receiptEligibleRemedies().map(
  (r) => remedyIdToSlug(r.id)
);

export const SLUG_TO_REMEDY_ID: Record<string, string> = Object.fromEntries(
  RECEIPT_CATALOG_SLUGS.map((slug) => [slug, slugToRemedyId(slug)])
);

export function remedyPriceInWon(remedy: Remedy): number {
  return remedy.price.currency === "won" ? remedy.price.amount : 0;
}

const SLUG_CATEGORY_LABELS: Record<string, string> = {
  pronunciation: "발음약",
  "phonological-rule": "음운규칙",
  grammar: "문법약"
};

export function categoryLabelForSlug(slug: string): string | null {
  const remedy = remedies.find((r) => r.id === slugToRemedyId(slug));
  if (!remedy) return null;
  return SLUG_CATEGORY_LABELS[remedy.category] ?? null;
}

export function progressByCategory(receivedSlugs: string[]): string[] {
  const received = new Set(receivedSlugs);
  const totals = new Map<string, { done: number; total: number }>();

  for (const remedy of receiptEligibleRemedies()) {
    const label = SLUG_CATEGORY_LABELS[remedy.category];
    if (!label) continue;
    const slug = remedyIdToSlug(remedy.id);
    const entry = totals.get(label) ?? { done: 0, total: 0 };
    entry.total += 1;
    if (received.has(slug)) entry.done += 1;
    totals.set(label, entry);
  }

  return Array.from(totals.entries()).map(
    ([label, { done, total }]) => `${label} ${done}/${total}`
  );
}

/** @deprecated use remedyIdToSlug("h-pronunciation") */
export const H_PRON_RECEIPT_SLUG = "h-pron";
