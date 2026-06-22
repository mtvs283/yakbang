import PharmacyHeader from "../../components/membership/PharmacyHeader";
import PharmacyScene from "../../components/PharmacyScene";
import RemedyCatalog from "../../components/RemedyCatalog";
// 롤백 대비 보관 (뭉치 영상 → PharmacyScene 정적 장면으로 교체):
// import ScrollCue from "../../components/ScrollCue";
// import YakbangIllustration from "../../components/YakbangIllustration";

export default function ShopPage() {
  return (
    <>
      <div className="relative">
        <PharmacyScene />
        <PharmacyHeader />
      </div>
      {/* 기존 뭉치 영상 (AI가 엉터리 한글을 넣어 정적 장면으로 대체). 롤백 시 복원:
      <div className="relative">
        <YakbangIllustration />
        <ScrollCue />
      </div>
      */}
      <RemedyCatalog />
    </>
  );
}
