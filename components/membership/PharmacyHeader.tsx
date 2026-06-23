"use client";

import { useState } from "react";
import { tiers, type Tier } from "../../data/membership";
import { useDailyAttendance } from "../../lib/hooks/useDailyAttendance";
import { useUser } from "../../lib/hooks/useUser";
import { useShopUi } from "../ShopUiProvider";
import RegisterModal from "./RegisterModal";
import ReturnLoginModal from "./ReturnLoginModal";
import StageBadge from "./StageBadge";
import StageUpgradeNotification from "./StageUpgradeNotification";
import UpgradeModal from "./UpgradeModal";

export default function PharmacyHeader() {
  const { profile, refresh, isRegistered } = useUser();
  const { prescriptionOpen } = useShopUi();
  useDailyAttendance(); // 약방 진입 시 당일 자동 출석

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [notif, setNotif] = useState<{ from: Tier; to: Tier } | null>(null);

  const tier: Tier = profile?.tier ?? "visitor";
  const name = profile?.display_name ?? "";

  // 진료등록 클릭: 재방문(이 브라우저에서 등록 이력/로그인)이면 재진 입장, 아니면 신규 등록
  function handleEnter() {
    const returning =
      isRegistered ||
      (typeof window !== "undefined" &&
        localStorage.getItem("yakbang-has-account") === "1");
    if (returning) setShowLogin(true);
    else setShowRegister(true);
  }

  return (
    <>
      {/* 약방문 열리면 책상 버튼 숨김 (모달과 z-index 겹침 방지) */}
      {!prescriptionOpen ? (
      <div className="absolute left-1/2 top-[80%] z-30 -translate-x-1/2 -translate-y-1/2">
        <button
          className="rounded-full border-2 border-yakbangGold bg-yakbangGold px-10 py-4 font-script text-[42px] font-bold text-black shadow-[0_4px_16px_rgba(0,0,0,0.55)] transition hover:brightness-110"
          onClick={handleEnter}
          type="button"
        >
          진료 등록
        </button>
      </div>
      ) : null}

      {/* 우상단(다국어 토글 아래): 회원 상태 — 등록 시만 */}
      {isRegistered ? (
        <div className="fixed right-4 top-[68px] z-40 flex items-center gap-2 rounded-full border border-yakbangGold/40 bg-yakbangBlack/80 px-4 py-1.5 backdrop-blur">
          <StageBadge size={20} tier={tier} />
          <span className="font-script text-sm font-bold text-yakbangGold">
            {tiers[tier].ko}
            {profile?.daily_number != null ? ` ${profile.daily_number}` : ""} :{" "}
            {(profile?.points ?? 0).toLocaleString("ko-KR")}원
          </span>
          {tier === "patient" ? (
            <button
              className="rounded-full border border-yakbangGold/70 px-3 py-1 font-script text-xs font-bold text-yakbangGold transition hover:bg-yakbangGold hover:text-black"
              onClick={() => setShowUpgrade(true)}
              type="button"
            >
              광개토 회원 격상
            </button>
          ) : null}
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
        />
      ) : null}

      {showUpgrade ? (
        <UpgradeModal
          name={name}
          onClose={() => setShowUpgrade(false)}
          onDone={async () => {
            setShowUpgrade(false);
            await refresh();
            setNotif({ from: "patient", to: "nangdo" });
          }}
        />
      ) : null}

      {notif ? (
        <StageUpgradeNotification
          fromTier={notif.from}
          name={name}
          onDismiss={() => setNotif(null)}
          toTier={notif.to}
        />
      ) : null}
    </>
  );
}
