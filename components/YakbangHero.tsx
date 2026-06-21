"use client";

import Link from "next/link";
import { heroStrings } from "../data/i18n/hero";
import { useLocale } from "./LocaleProvider";

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

      <section className="absolute inset-x-4 bottom-0 top-[54%] rounded-sm border border-yakbangGold/70 shadow-[0_0_56px_rgba(212,175,55,0.18)] sm:inset-x-auto sm:bottom-0 sm:right-[1.4%] sm:top-[8.5%] sm:w-[49vw]">
        <p className="absolute right-5 top-2 font-sans text-xs font-bold uppercase tracking-[0.22em] text-white/86 sm:right-8 sm:top-4 sm:text-2xl">
          YAKBANG GWANGGAETO
        </p>
        <Link
          aria-label="약방으로 들어가기"
          href="/shop"
          className="absolute right-5 top-1/2 z-10 -translate-y-1/2 text-right transition duration-200 ease-in-out hover:-translate-y-[calc(50%+0.25rem)] focus:outline-none focus:ring-2 focus:ring-yakbangGold focus:ring-offset-2 focus:ring-offset-black sm:right-8"
        >
          <span className="relative inline-block font-shilla text-6xl font-bold leading-none text-white drop-shadow-[0_0_24px_rgba(255,255,255,0.18)] sm:text-8xl">
            집현전 약방
            <span
              aria-hidden="true"
              className="absolute right-[0.18em] top-full mt-3 font-sans text-5xl font-black leading-none text-yakbangGold sm:text-7xl"
            >
              ↓
            </span>
          </span>
        </Link>
        <div className="absolute bottom-16 right-5 flex flex-col items-end gap-1 text-right sm:bottom-20 sm:right-8">
          <p className="font-shilla text-xl font-medium leading-snug text-yakbangPaper/95 sm:text-3xl">
            {taglineLine1}
          </p>
          {taglineLine2 ? (
            <p className="font-shilla text-xl font-medium leading-snug text-yakbangPaper/95 sm:text-3xl">
              {taglineLine2}
            </p>
          ) : null}
          <p className="mt-1 inline-flex whitespace-nowrap">
            <span className="animate-stamp-slam inline-block rounded-md border-2 border-[#e23b3b] px-2 py-0.5 font-sans text-4xl font-black text-[#e23b3b] drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] sm:text-6xl">
              {hero.enter}
            </span>
          </p>
        </div>
      </section>
    </main>
  );
}
