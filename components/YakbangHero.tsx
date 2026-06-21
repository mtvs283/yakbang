import Link from "next/link";

export default function YakbangHero() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-yakbangPaper">
      <video
        autoPlay
        className="absolute inset-0 h-full w-full object-cover object-[42%_center]"
        loop
        muted
        playsInline
        poster="/yakbang-hero-poster.png"
        src="/yakbang-hero.mp4"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/15 via-black/10 to-black/62" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

      <section className="absolute inset-x-5 bottom-8 rounded-lg border border-yakbangGold/55 bg-black/34 px-5 py-6 text-right shadow-[0_0_48px_rgba(212,175,55,0.16)] backdrop-blur-[2px] sm:inset-x-auto sm:bottom-auto sm:right-[5%] sm:top-1/2 sm:w-[40rem] sm:max-w-[44vw] sm:-translate-y-1/2 sm:px-8 sm:py-10">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-yakbangGold/80 sm:text-sm">
          YAKBANG GWANGGAETO
        </p>
        <h1 className="text-5xl font-black leading-none text-white drop-shadow-[0_0_22px_rgba(255,255,255,0.14)] sm:text-7xl">
          집현전 약방
        </h1>
        <p className="mt-5 text-lg font-bold leading-8 text-yakbangPaper/90 sm:text-2xl">
          약 드시고 한국어에 밝아지시오
        </p>
        <Link
          aria-label="약방으로 들어가기"
          className="mt-7 inline-flex items-center gap-3 rounded-full border border-yakbangGold/70 bg-yakbangGold px-7 py-3 text-lg font-black text-yakbangBlack shadow-[0_0_30px_rgba(212,175,55,0.34)] transition duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-[#f0cf68] focus:outline-none focus:ring-2 focus:ring-yakbangGold focus:ring-offset-2 focus:ring-offset-black"
          href="/shop"
        >
          <span>약방문 받기</span>
          <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}
