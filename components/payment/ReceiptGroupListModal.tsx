"use client";

import { createPortal } from "react-dom";
import type { ReceiptGroup } from "../../lib/groupUserReceipts";
import type { UserReceiptRow } from "../../lib/receiptTypes";

interface Props {
  group: ReceiptGroup;
  onClose: () => void;
  onSelectReceipt: (row: UserReceiptRow) => void;
  formatIssuedAt: (iso: string) => string;
  formatAmount: (amount: number) => string;
}

export default function ReceiptGroupListModal({
  group,
  onClose,
  onSelectReceipt,
  formatIssuedAt,
  formatAmount
}: Props) {
  return createPortal(
    <div
      aria-modal="true"
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto bg-black/75 px-4 py-6 backdrop-blur-sm"
      onMouseDown={onClose}
      role="dialog"
    >
      <section
        className="relative w-full max-w-md rounded-lg border-4 border-[#7a4f28] bg-[#f5e6c8] p-6 text-[#3d2b1a] shadow-[0_0_42px_rgba(0,0,0,0.55)] sm:p-8"
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(122,79,40,0.05) 0px, rgba(122,79,40,0.05) 1px, transparent 1px, transparent 22px)"
        }}
      >
        <button
          aria-label="닫기"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#7a4f28]/60 text-xl leading-none text-[#7a4f28] transition hover:bg-[#7a4f28] hover:text-[#f5e6c8]"
          onClick={onClose}
          type="button"
        >
          ×
        </button>

        <header className="mb-5 border-b-2 border-dashed border-[#7a4f28]/40 pb-4 pr-10">
          <p className="mb-1 text-sm font-bold tracking-[0.2em] text-[#7a4f28]">
            영수증 목록
          </p>
          <h2 className="font-sanskr text-2xl font-bold text-[#8a3a1a]">
            {group.remedyName}
            <span className="ml-2 inline-flex rounded-full border border-[#7a4f28]/50 bg-[#7a4f28]/10 px-2 py-0.5 align-middle font-script text-base font-bold text-[#7a4f28]">
              {group.count}
            </span>
          </h2>
          <p className="mt-2 font-script text-sm text-[#7a4f28]">
            총 {group.count}장 · 누적 {formatAmount(group.totalAmount)}
          </p>
        </header>

        <ul className="space-y-2">
          {group.receipts.map((row, index) => (
            <li key={row.id}>
              <button
                className="flex w-full items-center justify-between gap-3 rounded-md border border-[#7a4f28]/40 bg-white/40 px-4 py-3 text-left transition hover:border-[#7a4f28] hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-[#7a4f28]"
                onClick={() => onSelectReceipt(row)}
                type="button"
              >
                <span className="font-script text-sm text-[#7a4f28]">
                  {group.count - index}번째
                </span>
                <span className="flex-1 font-script text-base text-[#3d2b1a]">
                  {formatIssuedAt(row.issued_at)}
                </span>
                <span className="font-script text-base font-bold text-[#8a3a1a]">
                  {formatAmount(row.receipt_data.amount)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>,
    document.body
  );
}
