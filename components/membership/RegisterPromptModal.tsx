"use client";

import { createPortal } from "react-dom";

// 가입 전환 모달. 잠긴 약 클릭(locked) / 무료약 완료 직후(completed) 두 시점에 사용.
interface Props {
  variant: "locked" | "completed";
  onRegister: () => void;
  onClose: () => void;
}

const COPY = {
  locked: {
    icon: "🔒",
    title: "환자 전용 약방문",
    body: "환자로 등록하시면 1,000원과 함께 모든 약방문이 열리오."
  },
  completed: {
    icon: "✅",
    title: "한 첩, 그대의 것이 되었소",
    body: "이 약, 그대의 것이 되었소. 더 깊은 처방을 받으시려면 환자로 등록하시오."
  }
} as const;

export default function RegisterPromptModal({
  variant,
  onRegister,
  onClose
}: Props) {
  const copy = COPY[variant];
  return createPortal(
    <div
      aria-modal="true"
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/75 px-4 py-6 backdrop-blur-sm"
      onMouseDown={onClose}
      role="dialog"
    >
      <section
        className="relative w-full max-w-sm rounded-lg border-4 border-[#7a4f28] bg-[#f5e6c8] p-7 text-center text-[#3d2b1a] shadow-[0_0_42px_rgba(0,0,0,0.55)]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div aria-hidden="true" className="mb-3 text-4xl">
          {copy.icon}
        </div>
        <h2 className="mb-3 font-script text-2xl font-bold text-[#8a3a1a]">
          {copy.title}
        </h2>
        <p className="mb-6 font-script text-lg leading-relaxed">{copy.body}</p>
        <div className="flex flex-col gap-2">
          <button
            className="w-full rounded-md border-2 border-[#7a4f28] bg-[#7a4f28] px-4 py-3 font-script text-lg font-bold text-[#f5e6c8] transition hover:bg-[#8a3a1a]"
            onClick={onRegister}
            type="button"
          >
            환자 등록하기
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
