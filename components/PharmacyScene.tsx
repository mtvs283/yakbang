"use client";

import { useEffect, useRef, useState } from "react";
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

  // dev 모드 드래그: 핫스팟을 마우스로 끌어 위치 조정 (좌표는 화면 라벨에 %로 표시)
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef<string | null>(null);
  const [overrides, setOverrides] = useState<
    Record<string, { x: string; y: string }>
  >({});

  function pctFromEvent(e: React.PointerEvent) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return null;
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 1000) / 10;
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 1000) / 10;
    return { x: `${x}%`, y: `${y}%` };
  }

  function onHotspotDown(e: React.PointerEvent, id: string) {
    if (!dev) return;
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    draggingRef.current = id;
  }

  function onHotspotMove(e: React.PointerEvent, id: string) {
    if (!dev || draggingRef.current !== id) return;
    const p = pctFromEvent(e);
    if (!p) return;
    setOverrides((o) => {
      const next = { ...o, [id]: p };
      try {
        localStorage.setItem("pharmacy-dev-overrides", JSON.stringify(next));
      } catch {
        /* noop */
      }
      return next;
    });
  }

  function onHotspotUp(e: React.PointerEvent, id: string) {
    if (!dev || draggingRef.current !== id) return;
    draggingRef.current = null;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    const p = overrides[id];
    if (p) {
      // eslint-disable-next-line no-console
      console.log(`[hotspot] ${id} → x:"${p.x}", y:"${p.y}"`);
    }
  }

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    const isDev =
      new URLSearchParams(window.location.search).get("dev") === "true";
    setDev(isDev);
    if (isDev) {
      // 드래그 위치를 localStorage에서 복원 (HMR/새로고침에도 유지)
      try {
        const saved = localStorage.getItem("pharmacy-dev-overrides");
        if (saved) setOverrides(JSON.parse(saved));
      } catch {
        /* noop */
      }
    }
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
    if (dev) return; // dev 모드에선 드래그 편집이 우선 (네비게이션 비활성)
    scrollToCatalog();
  }

  return (
    <section className="relative flex w-full justify-center overflow-hidden bg-[#100b07]">
      <div className="relative w-fit" ref={containerRef}>
        <img
          src={pharmacyScene.background}
          alt={t.catalogTitle}
          className="block h-[100dvh] w-auto max-w-none select-none"
          draggable={false}
        />

      {pharmacyScene.hotspots.map((h) => {
        const ov = overrides[h.id];
        const left = ov ? ov.x : isMobile ? h.mobileX ?? h.x : h.x;
        const top = ov ? ov.y : isMobile ? h.mobileY ?? h.y : h.y;
        const label = hotspotText(h);

        return (
          <div
            className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 ${
              dev ? "cursor-move touch-none" : ""
            }`}
            key={h.id}
            onPointerDown={dev ? (e) => onHotspotDown(e, h.id) : undefined}
            onPointerMove={dev ? (e) => onHotspotMove(e, h.id) : undefined}
            onPointerUp={dev ? (e) => onHotspotUp(e, h.id) : undefined}
            style={{ left, top }}
          >
            {dev ? (
              <div className="pointer-events-none absolute left-1/2 top-full z-30 mt-1 flex -translate-x-1/2 flex-col items-center gap-0.5 whitespace-nowrap rounded bg-black/85 px-2 py-1 text-center">
                <span className="text-[13px] font-bold text-red-300">
                  {h.id}
                </span>
                <span className="text-[14px] font-bold text-amber-200">
                  x:{left} y:{top}
                </span>
              </div>
            ) : null}

            {h.style === "calligraphy-gold" ? (
              // 집현전약방 간판: 검정 글씨, 기존 대비 20% 키움 (43px / 86px)
              <span
                className="whitespace-nowrap font-shilla text-[43px] font-bold sm:text-[86px]"
                style={{
                  color: "#111111",
                  WebkitTextStroke: "1px rgba(255,255,255,0.55)",
                  textShadow: "0 2px 8px rgba(255,255,255,0.5)"
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

      {dev ? (
        <div className="fixed left-2 top-24 z-50 rounded-lg bg-black/90 p-3 font-mono text-[14px] leading-6 text-amber-200 shadow-2xl">
          <div className="mb-1 font-bold text-amber-400">
            현재 좌표 (초록=옮김)
          </div>
          {pharmacyScene.hotspots.map((h) => {
            const ov = overrides[h.id];
            const x = ov ? ov.x : isMobile ? h.mobileX ?? h.x : h.x;
            const y = ov ? ov.y : isMobile ? h.mobileY ?? h.y : h.y;
            return (
              <div
                className={ov ? "text-lime-300" : "text-amber-200/60"}
                key={h.id}
              >
                {h.id}: {x} , {y}
              </div>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
