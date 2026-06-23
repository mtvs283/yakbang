"use client";

import { createPortal } from "react-dom";

interface Props {
  remedyName: string;
  onConfirm: () => void;
  onClose: () => void;
  loading?: boolean;
}

export default function TreatmentConfirmModal({
  remedyName,
  onConfirm,
  onClose,
  loading = false
}: Props) {
  return createPortal(
    <div
      aria-modal="true"
      className="fixed inset-0 z-[90] flex items-end justify-center overflow-y-auto bg-black/45 px-4 py-8 backdrop-blur-[2px] sm:items-center sm:py-6"
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) onClose();
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
          처방을 확인하시오
        </h2>
        <p className="mb-6 whitespace-pre-line text-center font-script text-lg leading-relaxed">
          {`${remedyName} 처방을 모두 맞히셨소.\n위 답을 다시 보시고, 확인하시면\n약값을 청구하겠소.`}
        </p>
        <div className="flex flex-col gap-2">
          <button
            className="w-full rounded-md border-2 border-[#7a4f28] bg-[#7a4f28] px-4 py-3 font-script text-lg font-bold text-[#f5e6c8] transition hover:bg-[#8a3a1a] disabled:opacity-60"
            disabled={loading}
            onClick={onConfirm}
            type="button"
          >
            {loading ? "확인 중…" : "확인"}
          </button>
          <button
            className="w-full rounded-md border border-[#7a4f28]/50 px-4 py-2 font-script text-base font-bold text-[#7a4f28] transition hover:bg-[#7a4f28]/10"
            disabled={loading}
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
