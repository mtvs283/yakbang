import type { UserReceiptRow } from "../../lib/receiptTypes";

/** recipient_email 있을 때만 서신 발송 상태 뱃지 */
export function ReceiptEmailBadge({ row }: { row: UserReceiptRow }) {
  if (!row.recipient_email) return null;
  if (row.email_sent) {
    return (
      <span className="inline-flex rounded-full bg-[#7a4f28]/10 px-2 py-0.5 font-script text-xs font-bold text-[#7a4f28]/80">
        ✉ 서신 발송됨
      </span>
    );
  }
  return (
    <span className="inline-flex rounded-full bg-zinc-200/80 px-2 py-0.5 font-script text-xs font-bold text-zinc-500">
      ✉ 서신 미발송
    </span>
  );
}

/** 그룹 카드용 — 최신 영수증 기준 */
export function ReceiptEmailBadgeForLatest({
  rows
}: {
  rows: UserReceiptRow[];
}) {
  if (rows.length === 0) return null;
  return <ReceiptEmailBadge row={rows[0]} />;
}
