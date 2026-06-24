"use client";

import { useState } from "react";
import type { UserReceiptRow } from "../../lib/receiptTypes";
import { requestReceiptEmail } from "../../lib/sendReceiptEmail";
import { ReceiptEmailBadge } from "./ReceiptEmailBadge";

interface Props {
  row: UserReceiptRow;
  onSent?: () => void;
  compact?: boolean;
}

export default function ReceiptEmailActions({
  row,
  onSent,
  compact = false
}: Props) {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  if (!row.recipient_email) return null;

  async function send(force: boolean) {
    setSending(true);
    setMessage(null);
    const result = await requestReceiptEmail(row.id, { force });
    setSending(false);
    if (result.ok) {
      setMessage("서신을 보냈소. 스팸함도 살펴보시오.");
      onSent?.();
      return;
    }
    setMessage(result.message);
  }

  const btnClass = compact
    ? "rounded border border-[#7a4f28]/50 px-2 py-0.5 font-script text-xs font-bold text-[#7a4f28] transition hover:bg-[#7a4f28]/10 disabled:opacity-50"
    : "rounded-md border border-[#7a4f28]/50 px-3 py-1 font-script text-sm font-bold text-[#7a4f28] transition hover:bg-[#7a4f28]/10 disabled:opacity-50";

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-wrap items-center gap-2">
        <ReceiptEmailBadge row={row} />
        {!row.email_sent ? (
          <button
            className={btnClass}
            disabled={sending}
            onClick={(e) => {
              e.stopPropagation();
              void send(false);
            }}
            type="button"
          >
            {sending ? "보내는 중…" : "서신 보내기"}
          </button>
        ) : (
          <button
            className={btnClass}
            disabled={sending}
            onClick={(e) => {
              e.stopPropagation();
              void send(true);
            }}
            type="button"
          >
            {sending ? "보내는 중…" : "다시 보내기"}
          </button>
        )}
      </div>
      {message ? (
        <p
          className={`font-script text-xs leading-relaxed ${
            message.includes("보냈소") ? "text-[#7a4f28]" : "text-red-700"
          }`}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
