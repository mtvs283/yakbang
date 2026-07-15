"use client";

import { useEffect, useState } from "react";
import type { Tier } from "../../data/membership";
import { useDailyAttendance } from "../../lib/hooks/useDailyAttendance";
import { hasStoredAccountHint, prepareNewPatientRegistration } from "../../lib/supabase/auth";
import { useUser } from "../../lib/hooks/useUser";
import { useShopUi } from "../ShopUiProvider";
import RegisterModal from "./RegisterModal";
import ReturnLoginModal from "./ReturnLoginModal";
import StageUpgradeNotification from "./StageUpgradeNotification";

export default function PharmacyHeader() {
  const { refresh, isRegistered } = useUser();
  const { prescriptionOpen } = useShopUi();
  const { checked } = useDailyAttendance(); // 약방 진입 시 당일 자동 출석

  useEffect(() => {
    if (checked) void refresh();
  }, [checked, refresh]);

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [notif, setNotif] = useState<{ from: Tier; to: Tier } | null>(null);

  // 진료등록 클릭: 재방문(이 브라우저에서 등록 이력/로그인)이면 재진 입장, 아니면 신규 등록
  function handleEnter() {
    const returning = isRegistered || hasStoredAccountHint();
    if (returning) setShowLogin(true);
    else setShowRegister(true);
  }

  async function handleNewRegister() {
    setShowLogin(false);
    await prepareNewPatientRegistration();
    setShowRegister(true);
  }

  return (
    <>
      {/* 약방문 열리면 책상 버튼 숨김 (모달과 z-index 겹침 방지) */}
      {!prescriptionOpen ? (
      <div className="absolute left-1/2 top-[80%] z-30 -translate-x-1/2 -translate-y-1/2">
        <button
          className="whitespace-nowrap rounded-full border-2 border-yakbangGold bg-yakbangGold px-6 py-2.5 font-script text-2xl font-bold text-black shadow-[0_4px_16px_rgba(0,0,0,0.55)] transition hover:brightness-110 sm:px-10 sm:py-4 sm:text-[42px]"
          onClick={handleEnter}
          type="button"
        >
          입원 안내
        </button>
      </div>
      ) : null}

      {showRegister ? (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onDone={async () => {
            setShowRegister(false);
            await refresh();
            setNotif({ from: "visitor", to: "patient" });
          }}
          onSwitchToLogin={(email) => {
            setShowRegister(false);
            setLoginEmail(email);
            setShowLogin(true);
          }}
        />
      ) : null}

      {showLogin ? (
        <ReturnLoginModal
          initialEmail={loginEmail}
          onClose={() => setShowLogin(false)}
          onNewRegister={() => void handleNewRegister()}
        />
      ) : null}

      {notif ? (
        <StageUpgradeNotification
          fromTier={notif.from}
          name=""
          onDismiss={() => setNotif(null)}
          toTier={notif.to}
        />
      ) : null}
    </>
  );
}
