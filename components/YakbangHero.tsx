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
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/8 via-black/5 to-black/48" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

      <p className="animate-prescription-fade absolute left-1/2 top-5 z-10 -translate-x-1/2 whitespace-nowrap font-sans text-[11px] font-black uppercase tracking-[0.14em] text-black/80 sm:top-7 sm:text-4xl">
        Purchase a prescription
      </p>

      <section className="absolute inset-x-4 bottom-7 rounded-sm border border-yakbangGold/70 px-5 pb-6 pt-10 text-right shadow-[0_0_56px_rgba(212,175,55,0.18)] sm:inset-x-auto sm:bottom-auto sm:right-[3.2%] sm:top-1/2 sm:h-[82vh] sm:w-[45vw] sm:-translate-y-1/2 sm:px-8 sm:pb-10 sm:pt-16">
        <p className="mb-8 font-sans text-xs font-bold uppercase tracking-[0.22em] text-white/86 sm:text-2xl">
          YAKBANG GWANGGAETO
        </p>
        <h1 className="font-shilla text-6xl font-bold leading-none text-white drop-shadow-[0_0_24px_rgba(255,255,255,0.18)] sm:mt-[18vh] sm:text-8xl">
          집현전 약방
        </h1>
        <p className="mt-8 font-shilla text-2xl font-medium leading-8 text-yakbangPaper/95 sm:text-4xl">
          약드시고 한국어에 밝아지시오
        </p>
        <Link
          aria-label="약방으로 들어가기"
          className="mt-8 inline-flex rotate-[-12deg] items-center gap-3 font-sans text-5xl font-black text-white transition duration-200 ease-in-out hover:-translate-y-1 hover:text-yakbangGold focus:outline-none focus:ring-2 focus:ring-yakbangGold focus:ring-offset-2 focus:ring-offset-black sm:mt-12 sm:text-8xl"
          href="/shop"
        >
          <span aria-hidden="true" className="text-yakbangGold">
            ↓
          </span>
          <span>엔터!!</span>
        </Link>
      </section>
    </main>
  );
}
