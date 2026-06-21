import RemedyCatalog from "../../components/RemedyCatalog";
import YakbangIllustration from "../../components/YakbangIllustration";

export default function ShopPage() {
  return (
    <>
      <div className="relative">
        <YakbangIllustration />
        <a
          className="absolute bottom-6 left-1/2 z-30 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-yakbangGold/70 bg-yakbangBlack/75 px-5 py-3 text-sm font-bold text-yakbangGold shadow-[0_0_24px_rgba(212,175,55,0.22)] backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:bg-yakbangGold hover:text-yakbangBlack focus:outline-none focus:ring-2 focus:ring-yakbangGold focus:ring-offset-2 focus:ring-offset-black"
          href="#remedy-catalog"
        >
          처방 목록 보기
          <span aria-hidden="true" className="animate-bounce">
            ↓
          </span>
        </a>
      </div>
      <RemedyCatalog />
    </>
  );
}
