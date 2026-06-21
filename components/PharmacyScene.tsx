"use client";

import { useEffect, useState } from "react";
import { pharmacyScene, type Hotspot } from "../data/pharmacy-scene";
import { useLocale } from "./LocaleProvider";

function scrollToCatalog() {
  document
    .getElementById("remedy-catalog")
    ?.scrollIntoView({ behavior: "smooth" });
}

export default function PharmacyScene() {
  const { locale, t } = useLocale();
  const [isMobile, setIsMobile] = useState(false);
  const [dev, setDev] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    setDev(
      new URLSearchParams(window.location.search).get("dev") === "true"
    );
    return () => mq.removeEventListener("change", update);
  }, []);

  function hotspotText(h: Hotspot): string {
    if (h.text) {
      return h.text[locale] ?? h.text.en ?? h.text.ko ?? "";
    }
    if (h.category) {
      return t.groups[h.category]?.title ?? "";
    }
    if (h.uiKey) {
      return t[h.uiKey];
    }
    return "";
  }

  // 카탈로그/모달은 DO NOT TOUCH이므로 현재 모든 액션은 카탈로그로 스크롤.
  // (카테고리 활성화·왕실 모달 열기는 카탈로그 수정이 필요해 추후 별도 처리)
  function handleAction(_h: Hotspot) {
    scrollToCatalog();
  }

  return (
    <section className="relative flex w-full justify-center overflow-hidden bg-[#100b07]">
      <div className="relative w-fit">
        <img
          src={pharmacyScene.background}
          alt={t.catalogTitle}
          className="block h-[100dvh] w-auto max-w-none select-none"
          draggable={false}
        />

      {pharmacyScene.hotspots.map((h) => {
        const left = isMobile ? h.mobileX ?? h.x : h.x;
        const top = isMobile ? h.mobileY ?? h.y : h.y;
        const label = hotspotText(h);

        return (
          <div
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            key={h.id}
            style={{ left, top }}
          >
            {dev ? (
              <div className="pointer-events-none absolute left-1/2 top-1/2 flex min-h-[44px] min-w-[88px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-0.5 rounded border-2 border-dashed border-red-500 bg-red-500/10 px-2 py-1 text-center">
                <span className="text-[11px] font-bold text-red-300">
                  {h.id}
                </span>
                <span className="text-[10px] text-red-300/90">
                  x:{left} y:{top}
                </span>
              </div>
            ) : null}

            {h.style === "calligraphy-gold" ? (
              <span
                className="whitespace-nowrap font-shilla text-4xl font-bold sm:text-7xl"
                style={{
                  color: "#D4AF37",
                  WebkitTextStroke: "1px rgba(0,0,0,0.65)",
                  textShadow: "0 2px 6px rgba(0,0,0,0.85)"
                }}
              >
                {label}
              </span>
            ) : null}

            {h.style === "speech-bubble" ? (
              <div className="relative">
                <div className="whitespace-nowrap rounded-2xl border-2 border-[#7a4f28] bg-white/95 px-4 py-2 font-script text-base text-[#3d2b1a] shadow-[0_4px_14px_rgba(0,0,0,0.45)] sm:text-2xl">
                  {label}
                </div>
                <div className="absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-[#7a4f28] bg-white/95" />
              </div>
            ) : null}

            {h.style === "category-marker" ? (
              <button
                aria-label={label}
                className="min-h-[44px] min-w-[44px] whitespace-nowrap rounded-lg border-2 border-[#7a4f28] bg-yakbangGold/95 px-5 py-3 font-script text-lg font-bold text-black shadow-[0_2px_12px_rgba(0,0,0,0.6)] transition duration-200 hover:scale-105 hover:bg-yakbangGold focus:outline-none focus:ring-2 focus:ring-yakbangGold sm:text-2xl"
                onClick={() => handleAction(h)}
                type="button"
              >
                {label}
              </button>
            ) : null}

            {h.style === "royal-marker" ? (
              <button
                aria-label={label}
                className="inline-flex min-h-[44px] animate-pulse items-center gap-2 whitespace-nowrap rounded-md border-2 border-yakbangGold bg-[#8a1a1a] px-4 py-2.5 font-script text-lg font-bold text-yakbangPaper shadow-[0_0_18px_rgba(212,175,55,0.7)] transition hover:bg-[#a52121] focus:outline-none focus:ring-2 focus:ring-yakbangGold sm:text-2xl"
                onClick={() => handleAction(h)}
                type="button"
              >
                <span
                  aria-hidden="true"
                  className="flex h-6 w-6 items-center justify-center rounded-sm bg-yakbangGold text-sm font-black text-[#8a1a1a]"
                >
                  印
                </span>
                {label}
              </button>
            ) : null}

            {h.style === "button-gold" ? (
              <button
                aria-label={label}
                className="min-h-[44px] whitespace-nowrap rounded-xl border-2 border-yakbangGold bg-black/85 px-6 py-3 font-script text-base font-bold text-yakbangGold shadow-[0_4px_20px_rgba(0,0,0,0.55)] backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:bg-yakbangGold hover:text-black focus:outline-none focus:ring-2 focus:ring-yakbangGold focus:ring-offset-2 focus:ring-offset-[#100b07] sm:text-2xl"
                onClick={() => handleAction(h)}
                type="button"
              >
                {label} ↓
              </button>
            ) : null}
          </div>
        );
      })}
      </div>
    </section>
  );
}
