"use client";

import { useLocale } from "./LocaleProvider";

export default function ScrollCue() {
  const { t } = useLocale();

  return (
    <a
      aria-label={t.scrollCue}
      className="group absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 items-stretch drop-shadow-[0_10px_28px_rgba(0,0,0,0.6)] transition duration-200 hover:-translate-y-0.5"
      href="#remedy-catalog"
    >
      <span
        aria-hidden="true"
        className="w-5 rounded-full bg-gradient-to-b from-[#9a6a33] via-[#6f4824] to-[#4a2f17] shadow-[inset_0_0_6px_rgba(0,0,0,0.5)]"
      />
      <span className="flex items-center gap-3 border-y-2 border-[#7a4f28] bg-[#f5e6c8] px-9 py-5 font-sanskr text-xl font-bold text-[#3d2b1a] sm:text-2xl">
        {t.scrollCue}
        <span aria-hidden="true" className="animate-bounce text-[#8a3a1a]">
          ↓
        </span>
      </span>
      <span
        aria-hidden="true"
        className="w-5 rounded-full bg-gradient-to-b from-[#9a6a33] via-[#6f4824] to-[#4a2f17] shadow-[inset_0_0_6px_rgba(0,0,0,0.5)]"
      />
    </a>
  );
}
