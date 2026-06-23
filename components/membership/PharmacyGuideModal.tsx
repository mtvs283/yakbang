"use client";

import Image from "next/image";
import { createPortal } from "react-dom";

const STEPS = [
  "一. 매일 약방에 들러 입원하시오",
  "二. 약방문 목록에서 약을 고르시오",
  "三. 빈칸을 채워 약방문을 익히시오",
  "四. 약값을 내고 약을 받으시오"
] as const;

interface Props {
  onClose: () => void;
}

export default function PharmacyGuideModal({ onClose }: Props) {
  return createPortal(
    <div
      aria-labelledby="pharmacy-guide-title"
      aria-modal="true"
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/80 px-3 py-6 backdrop-blur-sm sm:px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
    >
      <div
        className="relative w-full max-w-[min(100vw-1rem,40rem)] sm:max-w-xl md:max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="닫기"
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-yakbangGold/60 bg-yakbangBlack/75 text-2xl leading-none text-yakbangGold shadow-lg transition hover:bg-yakbangGold hover:text-yakbangBlack"
          onClick={onClose}
          type="button"
        >
          ×
        </button>

        <div className="relative overflow-hidden rounded-lg shadow-[0_0_42px_rgba(0,0,0,0.55)]">
          <Image
            alt="뭉치가 두루마리를 들고 약방 이용법을 안내하오"
            className="h-auto w-full"
            height={1200}
            priority
            sizes="(max-width: 640px) 95vw, (max-width: 768px) 36rem, 42rem"
            src="/images/moongchi-pharmacy-guide.png"
            width={900}
          />

          {/* 두루마리 한지 영역 — 상단(막대 아래)부터 텍스트 시작 */}
          <div
            className="absolute flex flex-col justify-start overflow-hidden pt-[0.15em] font-script font-bold leading-[1.4] text-[#2a1810]"
            style={{
              top: "11.5%",
              right: "5%",
              width: "42%",
              height: "72%",
              fontSize: "clamp(0.78rem, 3.6vw, 1.12rem)"
            }}
          >
            <p
              className="mb-[0.45em] text-center"
              id="pharmacy-guide-title"
              style={{ fontSize: "clamp(0.95rem, 4.4vw, 1.38rem)" }}
            >
              약방 이용법
            </p>
            <ul className="m-0 flex list-none flex-col justify-start gap-[0.38em] p-0">
              {STEPS.map((step) => (
                <li className="break-keep" key={step}>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
