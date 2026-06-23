"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useLocale } from "../LocaleProvider";

interface Props {
  onClose: () => void;
}

export default function PharmacyGuideModal({ onClose }: Props) {
  const { locale, t } = useLocale();
  const g = t.pharmacyGuide;
  const isRtl = locale === "ar";

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
            height={1024}
            priority
            sizes="(max-width: 768px) 98vw, 56rem"
            src="/images/moongchi-pharmacy-guide.png"
            width={1536}
          />

          <div
            className="absolute flex flex-col items-start justify-start overflow-hidden px-[0.25em] pt-[0.1em] font-script font-bold text-[#2a1810]"
            dir={isRtl ? "rtl" : "ltr"}
            style={{
              left: "35.5%",
              top: "31.5%",
              width: "48%",
              height: "36%",
              fontSize: "clamp(1.12rem, 3.33vw, 1.84rem)",
              lineHeight: 1.22
            }}
          >
            <p
              className="mb-[0.2em] w-full text-center"
              id="pharmacy-guide-title"
              style={{
                fontSize: "clamp(1.4rem, 4.23vw, 2.2rem)",
                lineHeight: 1.15
              }}
            >
              {g.title}
            </p>
            <ul className="m-0 w-full list-none space-y-[0.08em] p-0">
              <li className="w-full break-keep text-start">
                {g.step1}
                <span
                  className="mt-[0.05em] block ps-[0.45em] text-[0.82em] font-semibold opacity-90"
                  style={{ lineHeight: 1.18 }}
                >
                  {g.step1Note}
                </span>
              </li>
              <li className="w-full break-keep text-start">{g.step2}</li>
              <li className="w-full break-keep text-start">{g.step3}</li>
              <li className="w-full break-keep text-start">{g.step4}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
