"use client";

import { useState } from "react";
import RoyalRemedyModal from "./RoyalRemedyModal";

const showDevTools = process.env.NODE_ENV === "development";

const titleHotspots = [
  {
    id: "h-pronunciation",
    label: "ㅎ 발음약",
    menu: "ㅎ 발음약 약방문",
    left: "40.5%",
    top: "58%",
    width: "10.5%",
    height: "8.5%"
  },
  {
    id: "batchim-random",
    label: "랜덤 7대표 받침음절",
    menu: "랜덤 7대표 받침음절 약방문",
    left: "49.5%",
    top: "58%",
    width: "15.5%",
    height: "8.5%"
  },
  {
    id: "royal-remedy",
    label: "왕실 비방",
    menu: "왕실 비방 약방문",
    left: "72.5%",
    top: "12.5%",
    width: "21%",
    height: "9%"
  }
];

export default function YakbangIllustration() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showHotspotGuide, setShowHotspotGuide] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  function replayIntro() {
    setVideoEnded(false);
    setReplayKey((currentKey) => currentKey + 1);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#100b07] text-yakbangPaper">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-1/2 aspect-[4/3] h-[100dvh] -translate-y-1/2 overflow-hidden bg-[#100b07] md:left-1/2 md:right-auto md:h-auto md:max-h-screen md:w-screen md:max-w-[133.333vh] md:-translate-x-1/2">
          {videoEnded ? (
            <img
              alt="약방광개토 일러스트"
              className="h-full w-full object-cover"
              draggable={false}
              src="/yakbang-bg.png"
            />
          ) : (
            <video
              autoPlay
              className="h-full w-full object-cover"
              key={replayKey}
              muted
              onEnded={() => setVideoEnded(true)}
              onError={() => setVideoEnded(true)}
              playsInline
              poster="/yakbang-bg.png"
              src="/yakbang-bg.mp4"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/24" />

          <button
            aria-label="왕실 비방 한정 진상품 열기"
            className={[
              "absolute rounded-md transition duration-200",
              "hover:shadow-royal focus:outline-none focus:ring-2 focus:ring-yakbangGold focus:ring-offset-2 focus:ring-offset-black",
              showHotspotGuide
                ? "border-2 border-dashed border-yakbangGold bg-yakbangGold/10"
                : "border border-transparent bg-transparent"
            ].join(" ")}
            onClick={() => setIsModalOpen(true)}
            style={{
              right: "5%",
              top: "8%",
              width: "22%",
              height: "55%"
            }}
            type="button"
          >
            <span className="sr-only">왕실 비방</span>
          </button>

          {titleHotspots.map((hotspot) => (
            <div
              className="group absolute z-10"
              key={hotspot.id}
              style={{
                left: hotspot.left,
                top: hotspot.top,
                width: hotspot.width,
                height: hotspot.height
              }}
            >
              <button
                aria-label={hotspot.label}
                className={[
                  "h-full w-full rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-yakbangGold focus:ring-offset-2 focus:ring-offset-black",
                  showHotspotGuide
                    ? "border-2 border-dashed border-yakbangGold bg-yakbangGold/10"
                    : "border border-transparent bg-transparent"
                ].join(" ")}
                onClick={
                  hotspot.id === "royal-remedy"
                    ? () => setIsModalOpen(true)
                    : undefined
                }
                type="button"
              />
              <div className="pointer-events-none absolute left-1/2 top-full mt-2 min-w-max -translate-x-1/2 translate-y-1 rounded-md border border-yakbangGold/70 bg-yakbangBlack/88 px-4 py-2 text-sm font-bold text-yakbangGold opacity-0 shadow-[0_0_22px_rgba(212,175,55,0.3)] backdrop-blur transition duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                {hotspot.menu}
              </div>
            </div>
          ))}
        </div>
      </div>

      {videoEnded ? (
        <button
          className="fixed bottom-5 right-5 z-20 rounded-full border border-yakbangGold/70 bg-yakbangBlack/75 px-5 py-3 text-sm font-bold text-yakbangGold shadow-[0_0_24px_rgba(212,175,55,0.22)] backdrop-blur transition duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-yakbangGold hover:text-yakbangBlack focus:outline-none focus:ring-2 focus:ring-yakbangGold focus:ring-offset-2 focus:ring-offset-black"
          onClick={replayIntro}
          type="button"
        >
          다시 보기
        </button>
      ) : null}

      {showDevTools ? (
        <label className="fixed bottom-4 left-4 z-10 flex select-none items-center gap-2 rounded-full border border-yakbangGold/50 bg-black/70 px-4 py-2 text-xs font-semibold text-yakbangPaper shadow-lg backdrop-blur">
          <input
            checked={showHotspotGuide}
            className="h-4 w-4 accent-yakbangGold"
            onChange={(event) => setShowHotspotGuide(event.target.checked)}
            type="checkbox"
          />
          hotspot guide
        </label>
      ) : null}

      <RoyalRemedyModal
        onClose={() => setIsModalOpen(false)}
        open={isModalOpen}
      />
    </main>
  );
}
