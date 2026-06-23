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
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/80 px-2 py-5 backdrop-blur-sm sm:px-4 sm:py-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
    >
      <div
        className="relative w-full max-w-[min(100vw-0.5rem,56rem)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="닫기"
          className="absolute right-2 top-2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-yakbangGold/60 bg-yakbangBlack/75 text-2xl leading-none text-yakbangGold shadow-lg transition hover:bg-yakbangGold hover:text-yakbangBlack sm:right-3 sm:top-3"
          onClick={onClose}
          type="button"
        >
          ×
        </button>

        <div className="relative overflow-hidden rounded-lg shadow-[0_0_42px_rgba(0,0,0,0.55)]">
          <Image
            alt="뭉치가 가로 두루마리로 약방 이용법을 안내하오"
            className="h-auto w-full"
            height={1024}
            priority
            sizes="(max-width: 768px) 98vw, 56rem"
            src="/images/moongchi-pharmacy-guide.png"
            width={1536}
          />

          {/* 가로 두루마리 한지 — 좌측 막대 끝(지편 시작)부터 */}
          <div
            className="absolute flex flex-col items-start justify-start overflow-hidden px-[0.35em] pt-[0.2em] font-script font-bold text-[#2a1810]"
            style={{
              left: "49%",
              top: "33.5%",
              width: "47.5%",
              height: "30%",
              fontSize: "clamp(0.62rem, 1.85vw, 1.02rem)",
              lineHeight: 1.28
            }}
          >
            <p
              className="mb-[0.25em] w-full text-center"
              id="pharmacy-guide-title"
              style={{
                fontSize: "clamp(0.78rem, 2.35vw, 1.22rem)",
                lineHeight: 1.2
              }}
            >
              약방 이용법
            </p>
            <ul className="m-0 w-full list-none space-y-[0.12em] p-0">
              {STEPS.map((step) => (
                <li className="w-full break-keep text-left" key={step}>
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
