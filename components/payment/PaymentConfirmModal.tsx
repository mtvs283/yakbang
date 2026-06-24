"use client";

import { createPortal } from "react-dom";
import RegisteredReceiptEmailNotice from "./RegisteredReceiptEmailNotice";

interface Props {
  balance: number;
  price: number;
  remedyName: string;
  paying: boolean;
  error?: string | null;
  onPay: () => void;
  onClose: () => void;
}

export default function PaymentConfirmModal({
  balance,
  price,
  remedyName,
  paying,
  error,
  onPay,
  onClose
}: Props) {
  return createPortal(
    <div
      aria-modal="true"
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto bg-black/75 px-4 py-6 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget && !paying) onClose();
      }}
      role="dialog"
    >
      <section
        className="relative w-full max-w-sm rounded-lg border-4 border-[#7a4f28] bg-[#f5e6c8] p-7 text-[#3d2b1a] shadow-[0_0_42px_rgba(0,0,0,0.55)]"
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(122,79,40,0.05) 0px, rgba(122,79,40,0.05) 1px, transparent 1px, transparent 22px)"
        }}
      >
        <h2 className="mb-4 text-center font-script text-2xl font-bold text-[#8a3a1a]">
          약값을 지불하시오
        </h2>
        <div className="mb-4 border-b border-dashed border-[#7a4f28]/40 pb-4">
          <p className="whitespace-pre-line text-center font-script text-lg leading-relaxed">
            {`${remedyName} 한 첩 — ${price.toLocaleString("ko-KR")}원\n그대의 잔액 — ${balance.toLocaleString("ko-KR")}원\n지불하시겠소?`}
          </p>
        </div>
        <RegisteredReceiptEmailNotice className="mb-4" />
        {error ? (
          <p className="mb-4 text-center font-script text-base font-bold text-red-700">
            {error}
          </p>
        ) : null}
        <div className="flex flex-col gap-2">
          <button
            className="w-full rounded-md border-2 border-[#7a4f28] bg-[#7a4f28] px-4 py-3 font-script text-lg font-bold text-[#f5e6c8] transition hover:bg-[#8a3a1a] disabled:opacity-60"
            disabled={paying}
            onClick={onPay}
            type="button"
          >
            {paying ? "지불 중…" : "지불하기"}
          </button>
          <button
            className="w-full rounded-md border border-[#7a4f28]/50 px-4 py-2 font-script text-base font-bold text-[#7a4f28] transition hover:bg-[#7a4f28]/10"
            disabled={paying}
            onClick={onClose}
            type="button"
          >
            닫기
          </button>
        </div>
      </section>
    </div>,
    document.body
  );
}
