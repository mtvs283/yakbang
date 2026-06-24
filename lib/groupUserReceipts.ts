import type { UserReceiptRow } from "./receiptTypes";

export interface ReceiptGroup {
  prescriptionSlug: string;
  remedyName: string;
  count: number;
  latestIssuedAt: string;
  totalAmount: number;
  receipts: UserReceiptRow[];
}

/** prescription_slug별로 영수증 카드 그룹 (최신 발급일 내림차순) */
export function groupReceiptsBySlug(rows: UserReceiptRow[]): ReceiptGroup[] {
  const map = new Map<string, UserReceiptRow[]>();

  for (const row of rows) {
    const list = map.get(row.prescription_slug) ?? [];
    list.push(row);
    map.set(row.prescription_slug, list);
  }

  const groups: ReceiptGroup[] = [];

  for (const [prescriptionSlug, receipts] of Array.from(map.entries())) {
    const sorted = [...receipts].sort(
      (a, b) =>
        new Date(b.issued_at).getTime() - new Date(a.issued_at).getTime()
    );
    const latest = sorted[0];
    groups.push({
      prescriptionSlug,
      remedyName: latest.receipt_data.remedyName,
      count: sorted.length,
      latestIssuedAt: latest.issued_at,
      totalAmount: sorted.reduce((sum, r) => sum + r.receipt_data.amount, 0),
      receipts: sorted
    });
  }

  return groups.sort(
    (a, b) =>
      new Date(b.latestIssuedAt).getTime() - new Date(a.latestIssuedAt).getTime()
  );
}
