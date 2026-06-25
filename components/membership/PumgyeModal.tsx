"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useLocale } from "../LocaleProvider";

interface Props {
  onClose: () => void;
}

interface Rank {
  stamp: string;
  desc: string;
  border: string;
  color: string;
  bg: string;
}

const RANKS: Rank[] = [
  {
    stamp: "환자",
    desc: "약방에 드시면 환자요.",
    border: "#6B6B6B",
    color: "#6B6B6B",
    bg: "rgba(107,107,107,0.08)"
  },
  {
    stamp: "단골",
    desc: "넉 주 중 석 주, 매주 세 번 이상 입원하시면 단골이오.",
    border: "#3E8E5A",
    color: "#3E8E5A",
    bg: "rgba(62,142,90,0.08)"
  },
  {
    stamp: "의관",
    desc: "단골을 넉 달 지키시고 중급 약방문 몇 첩을 익히시면 의관이오.",
    border: "#2C5F8D",
    color: "#2C5F8D",
    bg: "rgba(44,95,141,0.08)"
  },
  {
    stamp: "어의",
    desc: "고급 약방문을 모두 손에 쥐셔야 어의라 하오.",
    border: "#B91C2C",
    color: "#B91C2C",
    bg: "rgba(185,28,44,0.1)"
  }
];

export default function PumgyeModal({ onClose }: Props) {
  const { t } = useLocale();

  return createPortal(
    <div
      aria-labelledby="pumgye-title"
      aria-modal="true"
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/80 px-2 py-5 backdrop-blur-sm sm:px-4 sm:py-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
    >
      <div
        className="relative w-full max-w-[min(100vw-0.5rem,60rem)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label={t.closeAria}
          className="absolute right-2 top-2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-yakbangGold/60 bg-yakbangBlack/75 text-2xl leading-none text-yakbangGold shadow-lg transition hover:bg-yakbangGold hover:text-yakbangBlack sm:right-3 sm:top-3"
          onClick={onClose}
          type="button"
        >
          ×
        </button>

        <div className="relative overflow-hidden rounded-lg shadow-[0_0_42px_rgba(0,0,0,0.55)]">
          <Image
            alt=""
            aria-hidden
            className="h-auto w-full"
            height={558}
            priority
            sizes="(max-width: 768px) 98vw, 60rem"
            src="/images/moongchi-pumgye.png"
            width={1024}
          />

          {/* 흰 두루마리 위에 품계도 글을 얹음 (강아지를 피해 오른쪽 영역) */}
          <div
            className="pointer-events-auto absolute flex flex-col overflow-y-auto overscroll-y-contain font-script text-[#2a1810] [scrollbar-color:rgba(42,24,16,0.35)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#2a1810]/35"
            style={{
              left: "25%",
              top: "13%",
              width: "70%",
              height: "76%",
              fontSize: "clamp(0.72rem, 1.95vw, 1.18rem)",
              lineHeight: 1.45,
              WebkitOverflowScrolling: "touch"
            }}
          >
            <p
              className="mb-[0.55em] w-full shrink-0 border-b border-[#8B6F3A]/70 pb-[0.4em] text-center font-shilla font-bold tracking-[0.18em] text-[#3A2818]"
              id="pumgye-title"
              style={{ fontSize: "1.55em", lineHeight: 1.15 }}
            >
              약방 품계도
            </p>

            <ul className="m-0 flex w-full list-none flex-col gap-[0.7em] p-0">
              {RANKS.map((rank) => (
                <li className="flex items-start gap-[0.7em]" key={rank.stamp}>
                  <span
                    aria-hidden="true"
                    className="flex shrink-0 items-center justify-center rounded-[0.18em] font-shilla font-bold tracking-[0.08em]"
                    style={{
                      width: "3em",
                      height: "3em",
                      fontSize: "1.05em",
                      border: `0.16em solid ${rank.border}`,
                      color: rank.color,
                      background: rank.bg,
                      transform: "rotate(-3deg)",
                      boxShadow: "0.06em 0.06em 0 rgba(0,0,0,0.12)"
                    }}
                  >
                    {rank.stamp}
                  </span>
                  <span className="flex-1 self-center break-words font-bold text-[#2A1F12]">
                    {rank.desc}
                  </span>
                </li>
              ))}
            </ul>

            <div
              className="mt-[0.9em] w-full shrink-0 border-t border-dashed border-[#8B6F3A]/80 pt-[0.6em] font-semibold leading-relaxed text-[#5A4A30]"
              style={{ fontSize: "0.78em" }}
            >
              ※ 단골은 빠지시면 잠시 환자로 돌아가나, 다시 오시면 되돌아오오.
              <br />※ 의관과 어의는 한 번 오르시면 평생이오.
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
