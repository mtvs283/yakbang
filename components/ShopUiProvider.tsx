"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface ShopUiContextValue {
  prescriptionOpen: boolean;
  setPrescriptionOpen: (open: boolean) => void;
}

const ShopUiContext = createContext<ShopUiContextValue>({
  prescriptionOpen: false,
  setPrescriptionOpen: () => {}
});

export function ShopUiProvider({ children }: { children: ReactNode }) {
  const [prescriptionOpen, setPrescriptionOpen] = useState(false);
  return (
    <ShopUiContext.Provider value={{ prescriptionOpen, setPrescriptionOpen }}>
      {children}
    </ShopUiContext.Provider>
  );
}

export function useShopUi() {
  return useContext(ShopUiContext);
}
