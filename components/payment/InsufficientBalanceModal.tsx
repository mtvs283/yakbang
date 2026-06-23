"use client";

import { createPortal } from "react-dom";

interface Props {
  balance: number;
  onGoAttendance: () => void;
  onClose: () => void;
}

export default function InsufficientBalanceModal({
  balance,
  onGoAttendance,
  onClose
}: Props) {
  return createPortal(
    <div
      aria-modal="true"
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/75 px-4 py-6 backdrop-blur-sm"
      onMouseDown={onClose}
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
          잔액이 부족하오
        </h2>
        <p className="mb-6 whitespace-pre-line text-center font-script text-lg leading-relaxed">
          {`그대의 잔액 ${balance.toLocaleString("ko-KR")}원으로는 이 약을 받을 수 없소.\n매일 출석하시면 환자는 300원이 쌓이오.\n내일 다시 오시오.`}
        </p>
        <div className="flex flex-col gap-2">
          <button
            className="w-full rounded-md border-2 border-[#7a4f28] bg-[#7a4f28] px-4 py-3 font-script text-lg font-bold text-[#f5e6c8] transition hover:bg-[#8a3a1a]"
            onClick={onGoAttendance}
            type="button"
          >
            출석 확인하러 가기
          </button>
          <button
            className="w-full rounded-md border border-[#7a4f28]/50 px-4 py-2 font-script text-base font-bold text-[#7a4f28] transition hover:bg-[#7a4f28]/10"
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
