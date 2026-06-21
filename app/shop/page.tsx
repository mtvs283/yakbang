import RemedyCatalog from "../../components/RemedyCatalog";
import ScrollCue from "../../components/ScrollCue";
import YakbangIllustration from "../../components/YakbangIllustration";

export default function ShopPage() {
  return (
    <>
      <div className="relative">
        <YakbangIllustration />
        <ScrollCue />
      </div>
      <RemedyCatalog />
    </>
  );
}
