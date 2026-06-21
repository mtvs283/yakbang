import Link from "next/link";

export default function YakbangHero() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-yakbangPaper">
      <video
        autoPlay
        className="h-screen w-screen object-cover"
        loop
        muted
        playsInline
        src="/yakbang-hero.mp4"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />

      <Link
        aria-label="약방으로 들어가기"
        className="absolute bottom-[4%] left-1/2 h-[20%] w-[34%] -translate-x-1/2 rounded-2xl transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-[0_0_38px_rgba(212,175,55,0.42)] focus:outline-none focus:ring-2 focus:ring-yakbangGold focus:ring-offset-2 focus:ring-offset-black"
        href="/shop"
      >
        <span className="sr-only">Enter</span>
      </Link>
    </main>
  );
}
