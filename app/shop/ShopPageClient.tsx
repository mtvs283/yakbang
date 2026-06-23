"use client";

import { ShopUiProvider } from "../../components/ShopUiProvider";
import PharmacyHeader from "../../components/membership/PharmacyHeader";
import ShopNav from "../../components/membership/ShopNav";
import PharmacyScene from "../../components/PharmacyScene";
import RemedyCatalog from "../../components/RemedyCatalog";

export default function ShopPageClient() {
  return (
    <ShopUiProvider>
      <ShopNav />
      <div className="relative">
        <PharmacyScene />
        <PharmacyHeader />
      </div>
      <RemedyCatalog />
    </ShopUiProvider>
  );
}
