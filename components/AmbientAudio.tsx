"use client";

import { useEffect, useRef, useState } from "react";

type VolumeLevel = "off" | "low" | "medium" | "high";

const STORAGE_KEY = "yakbang-ambient-volume";
const LEVELS: VolumeLevel[] = ["low", "medium", "high", "off"];
const VOLUME: Record<VolumeLevel, number> = {
  off: 0,
  low: 0.28,
  medium: 0.55,
  high: 0.85
};
const LABEL: Record<VolumeLevel, string> = {
  off: "끔",
  low: "작게",
  medium: "보통",
  high: "크게"
};
const ICON: Record<VolumeLevel, string> = {
  off: "🔇",
  low: "🔈",
  medium: "🔉",
  high: "🔊"
};

function isVolumeLevel(value: string | null): value is VolumeLevel {
  return value !== null && ["off", "low", "medium", "high"].includes(value);
}

export default function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [level, setLevel] = useState<VolumeLevel>("low");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedLevel = window.localStorage.getItem(STORAGE_KEY);
    if (isVolumeLevel(savedLevel)) setLevel(savedLevel);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = VOLUME[level];
    window.localStorage.setItem(STORAGE_KEY, level);

    if (level === "off") {
      audio.pause();
      return;
    }

    const startAudio = () => {
      void audio.play().catch(() => undefined);
    };

    void audio.play().catch(() => {
      document.addEventListener("pointerdown", startAudio, { once: true });
      document.addEventListener("keydown", startAudio, { once: true });
    });

    return () => {
      document.removeEventListener("pointerdown", startAudio);
      document.removeEventListener("keydown", startAudio);
    };
  }, [level, ready]);

  function cycleVolume() {
    setLevel((current) => {
      const next = LEVELS[(LEVELS.indexOf(current) + 1) % LEVELS.length];
      return next;
    });
  }

  return (
    <>
      <audio ref={audioRef} loop preload="auto" src="/audio/yakbang-ambient.mp3" />
      <button
        aria-label={`배경음악 음량: ${LABEL[level]}. 눌러서 변경`}
        className="fixed bottom-[94px] right-3 z-40 flex min-w-[58px] flex-col items-center rounded-md border-2 border-[#b48a50] bg-gradient-to-b from-[#765031] to-[#321d11] px-2 py-1.5 font-script font-bold text-[#f4dfb0] shadow-[0_5px_18px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,235,181,0.22)] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-yakbangGold sm:bottom-[112px] sm:right-5 sm:min-w-[68px] sm:py-2"
        onClick={cycleVolume}
        title={`배경음악 · ${LABEL[level]}`}
        type="button"
      >
        <span aria-hidden="true" className="text-lg leading-none sm:text-xl">
          {ICON[level]}
        </span>
        <span className="mt-1 text-[11px] leading-none sm:text-xs">{LABEL[level]}</span>
      </button>
    </>
  );
}
