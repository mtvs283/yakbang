"use client";

import { createPortal } from "react-dom";
import { useLocale } from "../LocaleProvider";

// 가입 전환 모달. 잠긴 약 클릭(locked) / 무료약 완료 직후(completed) 두 시점에 사용.
interface Props {
  variant: "locked" | "completed";
  onRegister: () => void;
  onClose: () => void;
}

export default function RegisterPromptModal({
  variant,
  onRegister,
  onClose
}: Props) {
  const { t } = useLocale();
  const copy = t.auth.registerPrompt;
  const content =
    variant === "locked"
      ? { icon: copy.lockedIcon, title: copy.lockedTitle, body: copy.lockedBody }
      : {
          icon: copy.completedIcon,
          title: copy.completedTitle,
          body: copy.completedBody
        };

  return createPortal(
    <div
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 px-4 py-6 backdrop-blur-sm"
      onMouseDown={onClose}
      role="dialog"
    >
      <section
        className="relative w-full max-w-sm rounded-lg border-4 border-[#7a4f28] bg-[#f5e6c8] p-7 text-center text-[#3d2b1a] shadow-[0_0_42px_rgba(0,0,0,0.55)]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div aria-hidden="true" className="mb-3 text-4xl">
          {content.icon}
        </div>
        <h2 className="mb-3 font-script text-2xl font-bold text-[#8a3a1a]">
          {content.title}
        </h2>
        <p className="mb-6 font-script text-lg leading-relaxed">
          {content.body}
        </p>
        <div className="flex flex-col gap-2">
          <button
            className="w-full rounded-md border-2 border-[#7a4f28] bg-[#7a4f28] px-4 py-3 font-script text-lg font-bold text-[#f5e6c8] transition hover:bg-[#8a3a1a]"
            onClick={onRegister}
            type="button"
          >
            {copy.registerCta}
          </button>
          <button
            className="w-full rounded-md border border-[#7a4f28]/50 px-4 py-2 font-script text-base font-bold text-[#7a4f28] transition hover:bg-[#7a4f28]/10"
            onClick={onClose}
            type="button"
          >
            {copy.closeCta}
          </button>
        </div>
      </section>
    </div>,
    document.body
  );
}
