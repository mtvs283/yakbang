"use client";

import Link from "next/link";
import { heroStrings } from "../data/i18n/hero";
import { useLocale } from "./LocaleProvider";

const PHARMACY_TITLE = "광개토약방";

export default function YakbangHero() {
  const { locale } = useLocale();
  const hero = heroStrings[locale];

  // 첫 물음표 기준으로 두 줄로 나눔 (?, ？, ؟ 모두 처리)
  const qIndex = hero.tagline.search(/[?？؟]/);
  const taglineLine1 =
    qIndex >= 0 ? hero.tagline.slice(0, qIndex + 1) : hero.tagline;
  const taglineLine2 =
    qIndex >= 0 ? hero.tagline.slice(qIndex + 1).trim() : "";

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-yakbangPaper">
      <video
        autoPlay
        className="absolute inset-0 h-full w-full object-cover object-[42%_center] sm:object-[42%_top]"
        loop
        muted
        playsInline
        poster="/yakbang-hero-poster.png"
        src="/yakbang-hero.mp4"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/8 via-black/5 to-black/48" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

      {/* 왼쪽 태그라인 — 윗줄을 노란 박스 상단에 맞춤 */}
      <div className="absolute left-4 top-[54%] z-20 max-w-[min(88vw,28rem)] sm:left-8 sm:top-[19%]">
        <p className="font-shilla text-xl font-medium leading-snug text-yakbangPaper/95 sm:text-3xl">
          {taglineLine1}
        </p>
        {taglineLine2 ? (
          <p className="font-shilla text-xl font-medium leading-snug text-yakbangPaper/95 sm:text-3xl">
            {taglineLine2}
          </p>
        ) : null}
      </div>

      {/* 오른쪽 금색 박스 — 상단 테두리가 제목 글자 윗줄과 맞음 */}
      <section className="absolute inset-x-4 bottom-0 top-[54%] rounded-sm border border-yakbangGold/70 shadow-[0_0_56px_rgba(212,175,55,0.18)] sm:inset-x-auto sm:bottom-0 sm:right-[1.4%] sm:top-[19%] sm:w-[49vw]">
        <p className="absolute right-5 top-2 font-sans text-xs font-bold uppercase tracking-[0.22em] text-white/86 sm:right-8 sm:top-3 sm:text-2xl">
          YAKBANG GWANGGAETO
        </p>
        {/* 제목 → 화살표 → 엔터를 하단에 모아, 화살표 끝이 엔터에 가깝게 */}
        <div className="absolute bottom-12 right-5 z-10 flex flex-col items-end sm:bottom-16 sm:right-8">
          <Link
            aria-label="약방으로 들어가기"
            href="/shop"
            className="text-right transition duration-200 ease-in-out hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-yakbangGold focus:ring-offset-2 focus:ring-offset-black"
          >
            <span className="inline-block font-shilla text-6xl font-bold leading-none text-white drop-shadow-[0_0_24px_rgba(255,255,255,0.18)] sm:text-8xl">
              {PHARMACY_TITLE}
            </span>
          </Link>
          <span
            aria-hidden="true"
            className="mr-[0.18em] mt-2 font-sans text-5xl font-black leading-none text-yakbangGold sm:mt-3 sm:text-7xl"
          >
            ↓
          </span>
          <Link
            aria-label="약방으로 들어가기"
            className="mt-2 inline-flex whitespace-nowrap transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yakbangGold focus:ring-offset-2 focus:ring-offset-black sm:mt-3"
            href="/shop"
          >
            <span className="animate-stamp-slam inline-block rounded-md border-2 border-[#e23b3b] px-2 py-0.5 font-sans text-4xl font-black text-[#e23b3b] drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] sm:text-6xl">
              {hero.enter}
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
