import Link from "next/link";

export default function YakbangHero() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-yakbangPaper">
      <div className="absolute right-0 top-1/2 aspect-video h-[100dvh] -translate-y-1/2 sm:left-1/2 sm:right-auto sm:h-auto sm:max-h-screen sm:w-screen sm:max-w-[177.777vh] sm:-translate-x-1/2">
        <video
          autoPlay
          className="absolute inset-0 h-full w-full object-cover"
          loop
          muted
          playsInline
          poster="/yakbang-hero-poster.png"
          src="/yakbang-hero.mp4"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />

        <Link
          aria-label="약방으로 들어가기"
          className="absolute left-[72%] top-[68%] z-10 block h-[22%] w-[24%] rounded-2xl focus:outline-none focus:ring-2 focus:ring-yakbangGold focus:ring-offset-2 focus:ring-offset-black"
          href="/shop"
        >
          <span className="sr-only">Enter</span>
        </Link>
      </div>
    </main>
  );
}
