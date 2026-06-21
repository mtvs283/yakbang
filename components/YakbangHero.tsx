import Link from "next/link";

export default function YakbangHero() {
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
        <p className="absolute bottom-9 right-5 inline-flex items-baseline justify-end gap-3 whitespace-nowrap sm:bottom-8 sm:right-8 sm:gap-4">
          <span className="font-shilla text-xl font-medium text-yakbangPaper/95 sm:text-4xl">
            약 드시고 한국어에 밝아지시오~
          </span>
          <span className="inline-block rotate-[-12deg] font-sans text-4xl font-black text-white sm:text-6xl">
            엔터!!
          </span>
        </p>
      </section>
    </main>
  );
}
