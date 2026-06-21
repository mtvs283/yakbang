"use client";

import { useEffect, useRef } from "react";
import { royalRemedies } from "../data/remedies";

interface RoyalRemedyModalProps {
  open: boolean;
  onClose: () => void;
}

export default function RoyalRemedyModal({
  open,
  onClose
}: RoyalRemedyModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/72 px-4 py-6 text-yakbangPaper backdrop-blur-sm"
      onMouseDown={onClose}
      role="dialog"
    >
      <section
        className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-lg border-2 border-yakbangGold bg-yakbangBlack p-5 shadow-[0_0_42px_rgba(212,175,55,0.28)] sm:p-7"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          aria-label="왕실 비방 닫기"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-yakbangGold/60 text-xl leading-none text-yakbangGold transition hover:bg-yakbangGold hover:text-yakbangBlack focus:outline-none focus:ring-2 focus:ring-yakbangGold"
          onClick={onClose}
          ref={closeButtonRef}
          type="button"
        >
          ×
        </button>

        <header className="mb-6 pr-11">
          <p className="mb-2 text-sm font-semibold tracking-[0.24em] text-yakbangGold">
            왕실 비방
          </p>
          <h1 className="text-3xl font-black leading-tight text-yakbangPaper sm:text-5xl">
            한정 진상품
          </h1>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {royalRemedies.map((remedy) => (
            <article
              className="rounded-md border border-yakbangGold/35 bg-[#241b12] p-4 shadow-inner shadow-black/30"
              key={remedy.id}
            >
              <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                <h2 className="text-xl font-black leading-snug text-yakbangPaper">
                  {remedy.name}
                </h2>
                <span className="rounded-full bg-zinc-700/80 px-3 py-1 text-xs font-semibold text-zinc-200">
                  {remedy.status}
                </span>
              </div>

              <p className="mb-3 text-lg font-black text-yakbangGold">
                {remedy.price}
              </p>
              <p className="mb-4 min-h-12 text-sm leading-7 text-yakbangPaper/88">
                {remedy.description}
              </p>
              <button
                className="w-full cursor-not-allowed rounded-md border border-yakbangGold/45 bg-zinc-900 px-4 py-2 text-sm font-bold text-zinc-500"
                disabled
                type="button"
              >
                구매 불가
              </button>
            </article>
          ))}
        </div>

        <button
          className="mt-6 w-full cursor-not-allowed rounded-md border border-yakbangGold/40 bg-yakbangGold/10 px-4 py-4 text-center text-sm font-bold leading-7 text-yakbangGold/75 sm:text-base"
          disabled
          type="button"
        >
          이 약이 욕심나시오? 일반 약방에서 차근차근 포인트를 모으시오 →
        </button>
      </section>
    </div>
  );
}
