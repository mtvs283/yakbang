"use client";

import { useState } from "react";

export default function YakbangIllustration() {
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
    </main>
  );
}
